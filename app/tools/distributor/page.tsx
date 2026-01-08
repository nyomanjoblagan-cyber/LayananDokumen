'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Handshake, Building2, UserCircle2, 
  MapPin, ShoppingCart, CalendarRange, Scale
} from 'lucide-react';
import Link from 'next/link';

export default function PerjanjianResellerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perjanjian...</div>}>
      <ContractBuilder />
    </Suspense>
  );
}

function ContractBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    contractNo: 'SPK/RES/2026/088',
    
    // PIHAK PERTAMA (SUPPLIER)
    providerName: 'CV. PANGAN MAJU JAYA',
    providerOwner: 'Andi Wijaya',
    providerAddress: 'Kawasan Niaga Sudirman Blok C5, Jakarta Pusat',

    // PIHAK KEDUA (RESELLER)
    resellerName: 'SITI AMINAH',
    resellerStore: 'Toko Berkah Utama',
    resellerAddress: 'Jl. Raya Bogor KM 24, Ciracas, Jakarta Timur',
    
    // KETENTUAN
    region: 'Jabodetabek',
    target: 'Minimal 100 unit per bulan',
    paymentTerms: 'Cash Before Delivery (CBD) atau Transfer Bank',
    duration: '12 (Dua Belas) Bulan'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ContractContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-serif text-[10.5pt] leading-relaxed text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm', position: 'relative' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-lg font-black underline uppercase decoration-2 underline-offset-4">SURAT PERJANJIAN KERJASAMA DISTRIBUTOR</h1>
        <p className="text-[10pt] font-sans mt-1">Nomor: {data.contractNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-4 overflow-hidden flex-grow text-justify">
        <p>Pada hari ini, tanggal <b>{new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</b>, yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-4 space-y-4">
           <div>
              <p>1. <b>{data.providerOwner}</b>, bertindak atas nama <b>{data.providerName}</b>, berkedudukan di {data.providerAddress}. Selanjutnya disebut sebagai <b>PIHAK PERTAMA (Supplier)</b>.</p>
           </div>
           <div>
              <p>2. <b>{data.resellerName}</b>, pemilik <b>{data.resellerStore}</b>, beralamat di {data.resellerAddress}. Selanjutnya disebut sebagai <b>PIHAK KEDUA (Reseller)</b>.</p>
           </div>
        </div>

        <p>Kedua belah pihak sepakat untuk mengikatkan diri dalam perjanjian kerjasama dengan ketentuan sebagai berikut:</p>

        <div className="space-y-4">
           <div>
              <p className="font-bold">PASAL 1: WILAYAH DAN HAK JUAL</p>
              <p>Pihak Pertama memberikan hak kepada Pihak Kedua untuk mendistribusikan produk di wilayah <b>{data.region}</b>. Pihak Kedua wajib menjaga nama baik produk dan perusahaan Pihak Pertama.</p>
           </div>
           <div>
              <p className="font-bold">PASAL 2: HARGA DAN PEMBAYARAN</p>
              <p>Pihak Kedua wajib mengikuti kebijakan harga yang ditetapkan oleh Pihak Pertama. Sistem pembayaran dilakukan secara <b>{data.paymentTerms}</b> sebelum barang dikirimkan.</p>
           </div>
           <div>
              <p className="font-bold">PASAL 3: TARGET PENJUALAN</p>
              <p>Pihak Kedua berkomitmen untuk mencapai target penjualan sebesar <b>{data.target}</b> sebagai syarat evaluasi perpanjangan kontrak.</p>
           </div>
           <div>
              <p className="font-bold">PASAL 4: MASA BERLAKU</p>
              <p>Perjanjian ini berlaku untuk jangka waktu <b>{data.duration}</b> dan dapat diperpanjang melalui kesepakatan tertulis kedua belah pihak selambat-lambatnya 30 hari sebelum kontrak berakhir.</p>
           </div>
        </div>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-8 grid grid-cols-2 gap-10 text-center">
         <div>
            <p className="mb-16 font-bold uppercase">Pihak Pertama (Supplier)</p>
            <p className="font-bold underline uppercase">{data.providerOwner}</p>
            <p className="text-[9pt] italic">Authorized Signatory</p>
         </div>
         <div>
            <p className="mb-16 font-bold uppercase">Pihak Kedua (Reseller)</p>
            <p className="font-bold underline uppercase">{data.resellerName}</p>
            <p className="text-[9pt] italic">{data.resellerStore}</p>
         </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30 pointer-events-none">
         <p className="text-[8pt] font-sans">Dokumen ini diterbitkan melalui BantuWarga Legal Generator</p>
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

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2">
              <Handshake size={18} /> Reseller Agreement
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95">
            <Printer size={16} /> Print Perjanjian
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[380px] bg-white border-r overflow-y-auto p-5 space-y-6 text-slate-900">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Pihak Pertama (Supplier)</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.providerName} onChange={e => handleDataChange('providerName', e.target.value)} placeholder="Nama PT/CV" />
                <input className="w-full p-2 border rounded text-xs" value={data.providerOwner} onChange={e => handleDataChange('providerOwner', e.target.value)} placeholder="Nama Pemilik" />
             </div>
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Pihak Kedua (Reseller)</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.resellerName} onChange={e => handleDataChange('resellerName', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-2 border rounded text-xs" value={data.resellerStore} onChange={e => handleDataChange('resellerStore', e.target.value)} placeholder="Nama Toko" />
             </div>
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Ketentuan Kerjasama</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.region} onChange={e => handleDataChange('region', e.target.value)} placeholder="Wilayah Distribusi" />
                <input className="w-full p-2 border rounded text-xs" value={data.target} onChange={e => handleDataChange('target', e.target.value)} placeholder="Target Penjualan" />
                <input className="w-full p-2 border rounded text-xs" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} placeholder="Sistem Pembayaran" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ContractContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ContractContent />
      </div>
    </div>
  );
}