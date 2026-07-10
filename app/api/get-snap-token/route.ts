import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { price, documentName } = await request.json();

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: 'Server key is missing' }, { status: 500 });
    }

    // Tentukan Environment secara dinamis (Sandbox vs Production)
    // Server key sandbox biasanya berawalan 'SB-Mid-server-'
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || !serverKey.startsWith('SB-');
    const midtransApiUrl = isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions' 
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    // Prepare Midtrans payload dengan pengamanan Order ID
    // Prefix 'LD-' + Timestamp presisi tinggi + Random 5 digit agar tidak bentrok
    const secureOrderId = `LD-${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`;

    const payload = {
      transaction_details: {
        order_id: secureOrderId,
        gross_amount: price || 3000,
      },
      item_details: [
        {
          id: 'DOC-PRINT',
          price: price || 3000,
          quantity: 1,
          name: documentName || 'Cetak Dokumen Tanpa Watermark',
        }
      ],
      customer_details: {
        first_name: 'Pengguna',
        last_name: 'LayananDokumen',
        email: 'user@layanandokumen.com',
        phone: '08123456789'
      }
    };

    // Basic Auth needs base64(serverKey + ":")
    const authString = Buffer.from(`${serverKey}:`).toString('base64');
    
    const response = await fetch(midtransApiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Midtrans API Error:', data);
      return NextResponse.json({ error: 'Failed to fetch Midtrans token', details: data }, { status: response.status });
    }

    return NextResponse.json({ token: data.token, order_id: secureOrderId });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
