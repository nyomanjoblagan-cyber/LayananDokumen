import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/data/templates';

// Daftar dokumen kategori premium dengan harga resmi Rp 10.000 (fallback jika docKey tidak langsung cocok)
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
    // Tentukan harga resmi mutlak di SERVER dari master data TEMPLATES
    let authoritativePrice = 5000;
    if (docKey && TEMPLATES[docKey] && typeof TEMPLATES[docKey].price === 'number') {
      authoritativePrice = TEMPLATES[docKey].price;
    } else {
      const normalizedKey = (docKey || documentName || '').toLowerCase().trim();
      const isPremiumDoc = Array.from(PREMIUM_DOCS).some(k => normalizedKey.includes(k));
      authoritativePrice = isPremiumDoc ? 10000 : 5000;
    }

    // Tentukan Environment secara dinamis (Sandbox vs Production)
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || !serverKey.startsWith('SB-');
    const midtransApiUrl = isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions' 
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    // Prefix 'LD-' + Timestamp + Random 5 digit agar tidak bentrok
    const secureOrderId = `LD-${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`;

    // Midtrans Snap API batasan ketat: item_details[].name MAKSIMAL 50 karakter!
    let safeItemName = 'Cetak Dokumen Bebas Watermark';
    if (documentName && typeof documentName === 'string') {
      const clean = documentName.replace(/[\r\n\t]/g, ' ').trim();
      safeItemName = clean.length > 50 ? clean.slice(0, 47) + '...' : clean;
    }

    const payload = {
      transaction_details: {
        order_id: secureOrderId,
        gross_amount: authoritativePrice,
      },
      item_details: [
        {
          id: (authoritativePrice >= 10000 ? 'DOC-PREMIUM' : 'DOC-STANDARD').slice(0, 50),
          price: authoritativePrice,
          quantity: 1,
          name: safeItemName,
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
      return NextResponse.json({ 
        error: 'Gerbang pembayaran sedang sibuk atau mengalami antrean. Silakan coba klik tombol bayar sekali lagi.', 
        details: data 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      token: data.token, 
      order_id: secureOrderId,
      price: authoritativePrice 
    });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ 
      error: 'Terjadi kendala pada server transaksi. Silakan coba klik tombol bayar sekali lagi.' 
    }, { status: 500 });
  }
}
