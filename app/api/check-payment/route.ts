import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get('order_id');
    const verify_token = searchParams.get('verify_token');

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: 'Server key is missing' }, { status: 500 });
    }

    // 1. Verifikasi cryptographic session token (Anti localStorage tampering)
    if (verify_token && order_id) {
      const parts = verify_token.split('.');
      if (parts.length === 2) {
        const [expiresAtStr, sig] = parts;
        const expiresAt = parseInt(expiresAtStr, 10);
        if (!isNaN(expiresAt) && expiresAt > Date.now()) {
          const expectedSig = crypto
            .createHmac('sha256', serverKey)
            .update(`${order_id}:${expiresAtStr}`)
            .digest('hex');
          
          if (sig.length === expectedSig.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
            return NextResponse.json({ status: 'success', verified: true, expiresAt });
          }
        }
      }
      return NextResponse.json({ status: 'invalid', verified: false }, { status: 401 });
    }

    // 2. Cek status order langsung ke Midtrans API
    if (!order_id) {
      return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
    }

    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || !serverKey.startsWith('SB-');
    const midtransApiUrl = isProduction 
      ? `https://api.midtrans.com/v2/${order_id}/status` 
      : `https://api.sandbox.midtrans.com/v2/${order_id}/status`;

    const authString = Buffer.from(`${serverKey}:`).toString('base64');
    
    const response = await fetch(midtransApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ status: 'not_found' });
      }
      return NextResponse.json({ error: 'Failed to fetch Midtrans status' }, { status: response.status });
    }

    const transactionStatus = data.transaction_status;

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 jam
      const signature = crypto
        .createHmac('sha256', serverKey)
        .update(`${order_id}:${expiresAt}`)
        .digest('hex');

      return NextResponse.json({ 
        status: 'success',
        order_id,
        expiresAt,
        token: `${expiresAt}.${signature}`
      });
    } else if (transactionStatus === 'pending') {
      return NextResponse.json({ status: 'pending' });
    } else {
      return NextResponse.json({ status: 'failed', transaction_status: transactionStatus });
    }
  } catch (error: any) {
    console.error('Check payment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
