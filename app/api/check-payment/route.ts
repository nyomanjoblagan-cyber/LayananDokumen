import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get('order_id');

    if (!order_id) {
      return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: 'Server key is missing' }, { status: 500 });
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
      // Jangan pakai cache agar statusnya selalu real-time
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      // 404 dari Midtrans berarti transaksi tidak ditemukan
      if (response.status === 404) {
        return NextResponse.json({ status: 'not_found' });
      }
      return NextResponse.json({ error: 'Failed to fetch Midtrans status' }, { status: response.status });
    }

    // Ekstrak status transaksi dengan aman (Sanitasi Respon - JANGAN DUMP SEMUA DATA)
    const transactionStatus = data.transaction_status;

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
        return NextResponse.json({ status: 'success' });
    } else if (transactionStatus === 'pending') {
        return NextResponse.json({ status: 'pending' });
    } else {
        return NextResponse.json({ status: 'failed' });
    }

  } catch (error: any) {
    console.error('Error checking payment status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
