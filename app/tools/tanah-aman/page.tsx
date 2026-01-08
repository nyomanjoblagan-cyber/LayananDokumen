'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Map, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Navigation, Users
} from 'lucide-react';
import Link from 'next/link';

export default function TanahAmanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Tanah...</div>}>
      <LandSafetyBuilder />
    </Suspense>
  );
}

function LandSafetyBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '590/042/PEM/I/2026',
    
    // PEMERINTAH WILAYAH
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
    villageHead: 'I NYOMAN GEDE, S.E.',
    villageJob: 'Perbekel Pemecutan Kaja',

    // DATA PEMILIK / PENYATA
    ownerName: 'BAGUS RAMADHAN',
    ownerNik: '5171010101990001',
    ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // DATA TANAH
    landLocation: 'Jl. Ahmad Yani Gg. VII, Pemecutan Kaja',
    landSize: '200 m2',
    landStatus: 'Tanah Milik Adat (Pipil/Kikit) No. 1234',
    
    // BATAS-BATAS
    borderNorth: 'Tanah Milik Bapak Wayan',
    borderSouth: 'Jalan Desa / Gang VII',
    borderEast: 'Tanah Milik Ibu Sari',
    borderWest: 'Saluran Irigasi / Parit',

    // SAKSI-SAKSI
    witness1: 'I KETUT SUDARSANA (Ketua RT)',
    witness2: 'MADE WIRA (Tokoh Masyarakat)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const LandContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP DESA */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center text-[11pt] font-black uppercase leading-tight whitespace-pre-line italic">
           {data.issuerOffice}
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT PERNYATAAN TIDAK SENGKETA</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-3">Yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-4 space-y-1 font-sans text-[9.5pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.ownerNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.ownerAddress}</span></div>
        </div>

        <p className="mb-3">Dengan ini menyatakan bahwa saya menguasai sebidang tanah yang terletak di:</p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-[9.5pt] mb-4 space-y-1">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Lokasi Tanah</span><span>:</span><span className="font-bold">{data.landLocation}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Luas ±</span><span>:</span><span>{data.landSize}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Status/Bukti</span><span>:</span><span className="italic">{data.landStatus}</span></div>
        </div>

        <p className="mb-2 font-bold underline">Batas-batas tanah tersebut adalah sebagai berikut:</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-4 font-sans text-[9.5pt] ml-4">
            <div className="flex gap-2"><span>- Utara:</span><span className="font-medium">{data.borderNorth}</span></div>
            <div className="flex gap-2"><span>- Selatan:</span><span className="font-medium">{data.borderSouth}</span></div>
            <div className="flex gap-2"><span>- Timur:</span><span className="font-medium">{data.borderEast}</span></div>
            <div className="flex gap-2"><span>- Barat:</span><span className="font-medium">{data.borderWest}</span></div>
        </div>

        <p className="mb-4">
          Saya menyatakan dengan sebenarnya bahwa tanah tersebut di atas adalah benar milik saya, <b>TIDAK DALAM SENGKETA</b> baik batas maupun kepemilikannya dengan pihak lain, tidak sedang dijaminkan kepada pihak manapun, dan tidak sedang dalam sitaan hukum.
        </p>

        <p className="mb-4">
          Apabila pernyataan ini tidak benar, saya bersedia dituntut di muka pengadilan dan segala izin/hak yang terbit atas surat ini dinyatakan batal demi hukum.
        </p>
      </div>

      {/* TANDA TANGAN KOMPLEKS */}
      <div className="shrink-0 mt-4 border-t pt-4">
        <table className="w-full table-fixed text-[9.5pt]">
          <tbody>
            <tr>
              <td className="text-center pb-16">
                 <p className="font-bold mb-16 uppercase text-[8pt] text-slate-400">Saksi I (RT/RW),</p>
                 <p className="underline font-bold uppercase">{data.witness1}</p>
              </td>
              <td className="text-center pb-16">
                 <p className="font-bold mb-16 uppercase text-[8pt] text-slate-400">Saksi II (Tokoh),</p>
                 <p className="underline font-bold uppercase">{data.witness2}</p>
              </td>
              <td className="text-center pb-16">
                 <p className="mb-1 font-bold">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                 <p className="font-bold mb-8 uppercase text-[8pt] text-slate-400">Yang Membuat Pernyataan,</p>
                 <div className="h-8 mb-4 flex justify-center items-center"><span className="border px-2 py-1 text-[7pt] text-slate-300 italic">Materai 10.000</span></div>
                 <p className="underline font-bold uppercase">{data.ownerName}</p>
              </td>
            </tr>
            <tr>
               <td colSpan={3} className="text-center pt-8 border-t-2 border-dotted border-slate-200">
                  <p className="text-[9pt] font-black uppercase mb-20 leading-none">Mengetahui,<br/>{data.villageJob}</p>
                  <p className="underline font-bold uppercase text-[10pt]">{data.villageHead}</p>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic flex items-center gap-2">
               <Map size={18} /> Land <span className="text-white not-italic opacity-40 font-normal italic">Safety Statement</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Pengesah</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none font-bold uppercase" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pemilik</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Status Tanah (SHM/Pipil/AJB)" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Navigation size={12}/> Batas Wilayah</h3>
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.borderNorth} onChange={e => handleDataChange('borderNorth', e.target.value)} placeholder="Utara" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.borderSouth} onChange={e => handleDataChange('borderSouth', e.target.value)} placeholder="Selatan" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.borderEast} onChange={e => handleDataChange('borderEast', e.target.value)} placeholder="Timur" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.borderWest} onChange={e => handleDataChange('borderWest', e.target.value)} placeholder="Barat" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Users size={12}/> Saksi-Saksi</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I (RT/RW)" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II (Tokoh)" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <LandContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <LandContent />
      </div>
    </div>
  );
}