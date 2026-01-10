'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, MessageSquareWarning, UserCircle2, Building2, 
  ShoppingBag, AlertCircle, Edit3, Eye, X
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PengaduanKonsumenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
      <ComplaintBuilder />
    </Suspense>
  );
}

function ComplaintBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    customerName: 'BUDI SETIAWAN',
    customerPhone: '0812-9988-7766',
    customerAddress: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
    companyName: 'PT. ELEKTRONIK MAJU JAYA',
    companyDepartment: 'Customer Service Manager',
    companyAddress: 'Kawasan Industri Pulogadung, Jakarta Timur',
    orderId: 'ORD-2026-X123',
    purchaseDate: '2026-01-02',
    productName: 'Smart TV 55 Inch - Model Ultra HD',
    complaintDetail: 'Layar televisi mengalami kerusakan (dead pixel) di bagian tengah setelah 2 hari pemakaian. Saya sudah mencoba menghubungi call center namun tidak mendapatkan respon yang memuaskan.',
    demand: 'Saya menuntut penggantian unit baru (replacement) atau pengembalian dana penuh (refund) sesuai dengan kartu garansi yang berlaku.'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ComplaintContent = () => (
    <div className="bg-white box-border font-serif text-slate-900 text-[11pt] p-[20mm] w-[210mm] shadow-2xl print:shadow-none print:m-0 print:p-[15mm] print:w-full min-h-[296mm] print:min-h-0">
      
      {/* HEADER TANGGAL */}
      <div className="text-right mb-8 font-sans text-[10pt]">
         {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}
      </div>

      {/* TUJUAN */}
      <div className="mb-8 leading-tight">
         <p>Kepada Yth,</p>
         <p className="font-bold">{data.companyDepartment}</p>
         <p className="font-bold uppercase">{data.companyName}</p>
         <p className="italic text-slate-600 print:text-black text-[10pt]">{data.companyAddress}</p>
      </div>

      {/* PERIHAL */}
      <div className="mb-8">
         <p className="font-bold uppercase border-b-2 border-black inline-block">Surat Pengaduan Konsumen</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-5 leading-relaxed">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 py-1">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.customerName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.customerPhone}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.customerAddress}</span></div>
        </div>

        <p className="text-justify">Menyampaikan keluhan resmi terkait pembelian produk dengan rincian:</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-[9.5pt] print:bg-transparent print:border-black">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>ID Pesanan</span><span>:</span><span className="font-mono">{data.orderId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Produk</span><span>:</span><span className="font-bold">{data.productName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Tgl Pembelian</span><span>:</span><span>{isClient && data.purchaseDate ? new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
        </div>

        <div className="space-y-4">
            <div>
              <h4 className="font-bold text-[10pt] uppercase flex items-center gap-2 mb-1">Detail Permasalahan:</h4>
              <p className="text-justify italic text-slate-700 print:text-black">"{data.complaintDetail}"</p>
            </div>
            
            <div className="bg-emerald-50/50 p-4 border-l-4 border-emerald-500 print:bg-transparent print:border-black">
              <h4 className="font-bold text-[10pt] uppercase text-emerald-800 mb-1 print:text-black">Tuntutan Saya:</h4>
              <p className="font-bold text-emerald-900 print:text-black leading-snug">{data.demand}</p>
            </div>
        </div>

        <p className="text-justify pt-2">Demikian surat ini saya sampaikan dengan harapan mendapatkan solusi terbaik. Atas perhatiannya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (Flow Normal) */}
      <div className="mt-12 flex justify-end">
         <div className="text-center w-64">
            <p className="mb-20 text-[10pt] uppercase font-bold text-slate-400 print:text-black">Hormat Saya,</p>
            <p className="font-bold underline uppercase text-[11pt]">{data.customerName}</p>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* NAV */}
      <div className="no-print bg-slate-900 text-white h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={18} /></Link>
          <div className="text-sm font-bold uppercase tracking-widest text-red-400">Complaint Builder</div>
        </div>
        <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase flex items-center gap-2">
          <Printer size={16} /> Print
        </button>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-5 space-y-6 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Data Pengadu</h3>
              <input className="w-full p-2 border rounded text-xs" value={data.customerName} onChange={e => handleDataChange('customerName', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.customerAddress} onChange={e => handleDataChange('customerAddress', e.target.value)} />
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1">Perusahaan Tujuan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1">Keluhan</h3>
              <textarea className="w-full p-2 border rounded text-xs h-24" value={data.complaintDetail} onChange={e => handleDataChange('complaintDetail', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-16 border-emerald-200 bg-emerald-50" value={data.demand} onChange={e => handleDataChange('demand', e.target.value)} />
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 bg-slate-200/50 flex justify-center p-4 md:p-8 overflow-y-auto ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="origin-top scale-[0.55] md:scale-[0.85] lg:scale-100 shadow-2xl mb-20">
              <ComplaintContent />
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 rounded-2xl flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <ComplaintContent />
      </div>
    </div>
  );
}