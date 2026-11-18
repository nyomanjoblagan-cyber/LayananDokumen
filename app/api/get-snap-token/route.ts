import { NextResponse } from 'next/server';

// Daftar dokumen kategori premium dengan harga resmi Rp 10.000
const PREMIUM_DOCS = new Set([
  'wasiat', 'kontrak-kerja', 'joint-venture', 'mou', 'franchise', 
  'jual-beli-tanah', 'jual-beli-kendaraan', 'sewa-rumah', 'sewa-kendaraan', 
  'business-plan', 'perjanjian-damai', 'nda', 'hibah', 'hutang',
  'bagi-hasil', 'hutang-piutang', 'pra-nikah', 'somasi'
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { docKey, documentName } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: 'Server key is missing' }, { status: 500 });
    }

    // PENGAMANAN HARGA (Anti Price-Tampering):
    // Tentukan harga resmi mutlak di SERVER, abaikan harga yang dikirim dari browser
    const normalizedKey = (docKey || documentName || '').toLowerCase().trim();
    const isPremiumDoc = Array.from(PREMIUM_DOCS).some(k => normalizedKey.includes(k));
    
    // Standar resmi: Dokumen Premium = Rp 10.000, Dokumen Standar = Rp 5.000
    const authoritativePrice = isPremiumDoc ? 10000 : 5000;

    // Tentukan Environment secara dinamis (Sandbox vs Production)
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || !serverKey.startsWith('SB-');
    const midtransApiUrl = isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions' 
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    // Prefix 'LD-' + Timestamp + Random 5 digit agar tidak bentrok
    const secureOrderId = `LD-${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`;

    const payload = {
      transaction_details: {
        order_id: secureOrderId,
        gross_amount: authoritativePrice,
      },
      item_details: [
        {
          id: isPremiumDoc ? 'DOC-PREMIUM' : 'DOC-STANDARD',
          price: authoritativePrice,
          quantity: 1,
          name: documentName ? `${documentName.slice(0, 45)} (Resmi)` : 'Cetak Dokumen Bebas Watermark',
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

    return NextResponse.json({ 
      token: data.token, 
      order_id: secureOrderId,
      price: authoritativePrice 
    });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
