'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, MessageSquareWarning, UserCircle2, Building2, 
  ShoppingBag, AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function PengaduanKonsumenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pengaduan...</div>}>
      <ComplaintBuilder />
    </Suspense>
  );
}

function ComplaintBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    customerName: 'BUDI SETIAWAN',
    customerPhone: '0812-9988-7766',
    customerAddress: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
    companyName: 'PT. ELEKTRONIK MAJU JAYA',
    companyDepartment: 'Customer Service / Manager Operasional',
    companyAddress: 'Kawasan Industri Pulogadung, Jakarta Timur',
    orderId: 'ORD-2026-X123',
    purchaseDate: '2026-01-02',
    productName: 'Smart TV 55 Inch - Model Ultra HD',
    complaintDetail: 'Layar televisi mengalami kerusakan (dead pixel) di bagian tengah setelah 2 hari pemakaian. Saya sudah mencoba menghubungi call center namun tidak mendapatkan respon yang memuaskan.',
    demand: 'Saya menuntut penggantian unit baru (replacement) atau pengembalian dana penuh (refund) sesuai dengan kartu garansi yang berlaku.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ComplaintContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-serif text-[10.5pt] leading-normal text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm', position: 'relative' }}>
      
      <div className="text-right mb-6 shrink-0 font-sans text-[9pt]">
         {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}
      </div>

      <div className="mb-6 space-y-0.5 shrink-0">
         <p>Kepada Yth,</p>
         <p className="font-bold">{data.companyDepartment}</p>
         <p className="font-bold uppercase">{data.companyName}</p>
         <p className="italic text-[10pt]">{data.companyAddress}</p>
      </div>

      <div className="mb-6 shrink-0">
         <p>Perihal: <span className="font-bold underline uppercase">Surat Pengaduan Konsumen</span></p>
      </div>

      <div className="space-y-4 overflow-hidden flex-grow">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-6 space-y-1 text-[10pt] font-sans">
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.customerName}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.customerPhone}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.customerAddress}</span></div>
        </div>

        <p className="text-justify">Menyampaikan keluhan resmi terkait transaksi dengan detail:</p>
        
        <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1 text-[9pt] font-sans italic shrink-0">
           <div className="grid grid-cols-[130px_10px_1fr]"><span>ID Pesanan</span><span>:</span><span>{data.orderId}</span></div>
           <div className="grid grid-cols-[130px_10px_1fr]"><span>Produk</span><span>:</span><span className="font-bold">{data.productName}</span></div>
        </div>

        <div className="space-y-3">
           <div>
              <h4 className="font-bold text-[10pt] uppercase flex items-center gap-2 mb-1"><AlertCircle size={12}/> Detail Keluhan:</h4>
              <p className="text-justify leading-relaxed">{data.complaintDetail}</p>
           </div>
           <div className="bg-emerald-50/50 p-3 border-l-4 border-emerald-500">
              <h4 className="font-bold text-[10pt] uppercase text-emerald-800 mb-1">Tuntutan Saya:</h4>
              <p className="font-bold italic text-emerald-900">{data.demand}</p>
           </div>
        </div>

        <p className="text-justify pt-2">Demikian surat ini saya sampaikan dengan harapan mendapatkan solusi segera. Atas perhatiannya, saya ucapkan terima kasih.</p>
      </div>

      <div className="shrink-0 mt-4 flex justify-end text-center">
         <div className="w-56">
            <p className="mb-14 text-[9pt] uppercase font-bold text-slate-400">Hormat Saya,</p>
            <p className="font-bold underline uppercase text-[10.5pt]">{data.customerName}</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { 
            height: 297mm !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            overflow: hidden !important;
            background: white !important;
          }
          #ui-root { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
          }
        }
      `}</style>

      {/* EDITOR UI */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-400 flex items-center gap-2">
              <MessageSquareWarning size={18} /> Complaint Center
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[380px] bg-white border-r overflow-y-auto p-5 space-y-5 text-slate-900">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Data Pengadu</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.customerName} onChange={e => handleDataChange('customerName', e.target.value)} placeholder="Nama Anda" />
                <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.customerAddress} onChange={e => handleDataChange('customerAddress', e.target.value)} placeholder="Alamat" />
             </div>
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Tujuan</h3>
                <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama PT" />
             </div>
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Masalah</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Produk" />
                <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" value={data.complaintDetail} onChange={e => handleDataChange('complaintDetail', e.target.value)} placeholder="Detail keluhan..." />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none border-emerald-200 bg-emerald-50" value={data.demand} onChange={e => handleDataChange('demand', e.target.value)} placeholder="Tuntutan..." />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ComplaintContent />
             </div>
          </div>
        </div>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <ComplaintContent />
      </div>

    </div>
  );
}