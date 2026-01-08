'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Home, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Ruler
} from 'lucide-react';
import Link from 'next/link';

export default function IMBSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat IMB...</div>}>
      <IMBBuilder />
    </Suspense>
  );
}

function IMBBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '640/021/DPP/I/2026',
    
    // INSTANSI (DESA/KECAMATAN)
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
    villageHead: 'I NYOMAN GEDE, S.E.',
    villageJob: 'Perbekel Pemecutan Kaja',

    // DATA PEMILIK
    ownerName: 'BAGUS RAMADHAN',
    ownerNik: '5171010101990001',
    ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // DATA BANGUNAN
    buildingType: 'Rumah Tinggal (Permanen)',
    buildingLocation: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
    landArea: '150 m2',
    buildingArea: '80 m2',
    landStatus: 'Sertifikat Hak Milik (SHM) No. 442',
    
    purpose: 'Sebagai syarat administrasi permohonan PBG/IMB Hunian Sederhana.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const IMBContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter italic">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT KETERANGAN IJIN BANGUNAN</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.ownerName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.ownerNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Pemilik</span><span>:</span><span>{data.ownerAddress}</span></div>
        </div>

        <p className="mb-4">Bahwa yang bersangkutan berencana membangun/merenovasi bangunan dengan spesifikasi sebagai berikut:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 space-y-1">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Bangunan</span><span>:</span><span className="font-bold">{data.buildingType}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Lokasi Bangunan</span><span>:</span><span>{data.buildingLocation}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Tanah</span><span>:</span><span>{data.landArea}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Bangunan</span><span>:</span><span>{data.buildingArea}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Tanah</span><span>:</span><span className="italic">{data.landStatus}</span></div>
        </div>

        <p className="mb-6">
          Berdasarkan tinjauan kami, lokasi tersebut tidak dalam sengketa dan pembangunannya tidak mengganggu ketertiban umum. Surat keterangan ini diberikan untuk digunakan sebagai <b>{data.purpose}</b>.
        </p>

        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="text-center align-top">
                <div className="h-6 mb-2"></div>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Pemilik Bangunan,</p>
                <p className="font-bold underline uppercase text-[10.5pt]">({data.ownerName})</p>
              </td>
              <td className="text-center align-top">
                <p className="text-[10.5pt] font-bold h-6 mb-2">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">{data.villageJob},</p>
                <p className="font-bold underline uppercase text-[10.5pt]">{data.villageHead}</p>
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
               <Home size={18} /> IMB <span className="text-white not-italic opacity-40 font-normal italic">Simple Builder</span>
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
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Desa</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed font-bold uppercase bg-slate-50" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pemilik</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Ruler size={12}/> Spesifikasi Bangunan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.buildingType} onChange={e => handleDataChange('buildingType', e.target.value)} placeholder="Jenis Bangunan" />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Tanah" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bangunan" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Status Tanah" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades/Lurah" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <IMBContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <IMBContent />
      </div>
    </div>
  );
}