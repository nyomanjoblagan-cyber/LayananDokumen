'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Banknote, Building2, UserCircle2, 
  CalendarDays, Wallet, Receipt, CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor SPB...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    docNo: 'SPB/001/I/2026',
    
    // PENERBIT (INSTANSI/PERUSAHAAN)
    companyName: 'PT. DINAMIKA CIPTA MANDIRI',
    companyAddress: 'Gedung Office 8, Lantai 12, Senopati, Jakarta Selatan',

    // PENERIMA DANA
    recipientName: 'RIZKY RAMADHAN',
    recipientBank: 'Bank Central Asia (BCA)',
    recipientAccount: '123-456-7890',
    
    // DETAIL PEMBAYARAN
    amount: 15500000,
    amountText: 'Lima Belas Juta Lima Ratus Ribu Rupiah',
    purpose: 'Pembayaran tagihan invoice vendor IT support periode bulan Desember 2025.',
    
    // OTORISASI
    approverName: 'HENDRA KUSUMA',
    approverJob: 'Direktur Operasional',
    treasurerName: 'SITI AMINAH',
    treasurerJob: 'Bendahara Keuangan'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const SPBContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-serif text-[11pt] leading-normal text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm', position: 'relative' }}>
      
      {/* HEADER KOP */}
      <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="p-3 bg-slate-900 text-white rounded shrink-0">
           <Building2 size={32} />
        </div>
        <div>
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.companyName}</h1>
           <p className="text-[9pt] font-sans mt-1 text-slate-500">{data.companyAddress}</p>
        </div>
      </div>

      <div className="text-center mb-8 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT PERINTAH BAYAR (SPB)</h2>
        <p className="text-[10pt] font-sans mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="space-y-6 flex-grow font-serif">
        <p>Kepada Yth. <b>{data.treasurerName} ({data.treasurerJob})</b>,</p>
        <p className="text-justify">Harap melakukan pembayaran dana dengan rincian sebagai berikut:</p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 shadow-inner">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Diberikan Kepada</span><span>:</span><span className="font-bold uppercase">{data.recipientName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Jumlah Dana</span><span>:</span><span className="font-bold text-lg text-emerald-700">{formatRupiah(data.amount)}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr] italic text-sm"><span>Terbilang</span><span>:</span><span># {data.amountText} #</span></div>
           
           <div className="border-t border-slate-200 pt-4 space-y-2">
              <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest">Detail Rekening Tujuan:</h4>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Bank</span><span>:</span><span>{data.recipientBank}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Rekening</span><span>:</span><span className="font-mono font-bold tracking-wider">{data.recipientAccount}</span></div>
           </div>
        </div>

        <div className="space-y-2">
           <h4 className="font-bold text-sm uppercase">Untuk Keperluan:</h4>
           <p className="text-sm bg-amber-50 p-4 rounded border-l-4 border-amber-400 italic leading-relaxed">
             {data.purpose}
           </p>
        </div>

        <p className="text-sm">Demikian perintah ini diberikan untuk dilaksanakan dan dipertanggungjawabkan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN 3 PIHAK */}
      <div className="shrink-0 mt-8 grid grid-cols-2 gap-10 text-center">
         <div>
            <p className="mb-14 font-bold uppercase text-[10pt]">Menyetujui,</p>
            <p className="font-bold underline uppercase">{data.approverName}</p>
            <p className="text-[9pt] italic">{data.approverJob}</p>
         </div>
         <div className="space-y-14">
            <p className="text-xs">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
            <div>
               <p className="font-bold underline uppercase">{data.treasurerName}</p>
               <p className="text-[9pt] italic">Penerima Perintah</p>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* EDITOR UI */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all active:scale-95"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-emerald-400 flex items-center gap-2">
              <Banknote size={18} /> Payment Order
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95">
            <Printer size={16} /> Print SPB
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[380px] bg-white border-r overflow-y-auto p-5 space-y-6 text-slate-900 scrollbar-thin">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Nomor & Perusahaan</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
             </div>
             
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Tujuan Pembayaran</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} placeholder="Nama Penerima" />
                <input type="number" className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                <input className="w-full p-2 border rounded text-[10px] italic" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} placeholder="Terbilang..." />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded text-xs" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} placeholder="Nama Bank" />
                   <input className="w-full p-2 border rounded text-xs" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} placeholder="No. Rekening" />
                </div>
             </div>

             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Deskripsi & Otorisasi</h3>
                <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Bayar..." />
                <input className="w-full p-2 border rounded text-xs" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} placeholder="Nama Penyetuju" />
                <input className="w-full p-2 border rounded text-xs" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} placeholder="Nama Bendahara" />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <SPBContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <SPBContent />
      </div>
    </div>
  );
}