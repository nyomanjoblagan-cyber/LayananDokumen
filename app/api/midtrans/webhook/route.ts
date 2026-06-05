import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Pastikan ini adalah transaksi dari LayananDokumen (awalan LD-)
    if (data.order_id && data.order_id.startsWith('LD-')) {
      console.log('✅ Webhook Midtrans (LayananDokumen):', data.order_id, 'Status:', data.transaction_status);
      
      // Catatan: Karena LayananDokumen memproses dokumen secara langsung di browser pengguna
      // setelah pembayaran berhasil (melalui callback onSuccess di frontend), 
      // kita tidak perlu melakukan update database di backend.
      // Cukup berikan response 200 OK agar server Midtrans tenang dan tidak terus mencoba mengirim ulang.
      
      return NextResponse.json({ status: 'success', message: 'Notification acknowledged' }, { status: 200 });
    }

    // Jika masuk transaksi dari web lain (karena dicampur di dashboard Midtrans)
    return NextResponse.json({ status: 'ignored', message: 'Order ID is not for LayananDokumen' }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Webhook Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
