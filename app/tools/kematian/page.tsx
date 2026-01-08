'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  FileWarning, LayoutTemplate, X, ShieldCheck, PenTool, CalendarDays, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function KematianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kematian...</div>}>
      <DeathNoticeBuilder />
    </Suspense>
  );
}

function DeathNoticeBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'SKM/RT02/I/2026',
    
    // PEMBUAT SURAT (RT/RW/KELURAHAN/RS)
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR BARAT\nKELURAHAN DAUH PURI',
    issuerName: 'I WAYAN SUDIRTA, S.Sos',
    issuerJob: 'Lurah Dauh Puri',

    // DATA ALMARHUM / ALMARHUMAH
    deceasedName: 'H. AHMAD JAYADI',
    deceasedNik: '5171010101700001',
    deceasedAge: '65',
    deceasedGender: 'Laki-laki',
    deceasedAddress: 'Jl. Diponegoro No. 45, Denpasar, Bali',
    
    // DETAIL KEMATIAN
    deathDate: '2026-01-07',
    deathTime: '04:30 WITA',
    deathPlace: 'RSUP Prof. Dr. I.G.N.G. Ngoerah',
    deathReason: 'Sakit (Henti Jantung)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const DeathContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP SURAT PEMERINTAH / RS */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
           ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 no-print">
                 <Building2 size={32} />
              </div>
           )}
           <div className="text-center flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase italic tracking-tighter">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN KEMATIAN</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini, menerangkan bahwa pada hari ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari</span><span>:</span><span className="capitalize">{new Date(data.deathDate).toLocaleDateString('id-ID', {weekday: 'long'})}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Tanggal</span><span>:</span><span>{new Date(data.deathDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu</span><span>:</span><span>Pukul {data.deathTime}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Tempat</span><span>:</span><span>{data.deathPlace}</span></div>
        </div>

        <p className="mb-4 font-bold underline italic">Telah meninggal dunia seorang:</p>

        <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.deceasedName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.deceasedNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.deceasedGender}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Umur</span><span>:</span><span>{data.deceasedAge} Tahun</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span>{data.deceasedAddress}</span></div>
        </div>

        <p className="mb-6">Berdasarkan hasil diagnosa/keterangan medis, yang bersangkutan meninggal dunia disebabkan oleh <b>{data.deathReason}</b>.</p>

        <p>Demikian Surat Keterangan Kematian ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.</p>
      </div>

      {/* TANDA TANGAN (TABLE BASED) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-16 uppercase">{data.issuerJob},</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.issuerName}</p>
                </div>
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
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">Death Notice <span className="text-white opacity-40">Builder</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Penerbit</h3>
                <div className="flex items-center gap-4">
                   {logo ? (
                      <div className="relative w-16 h-16 border rounded overflow-hidden group">
                         <img src={logo} className="w-full h-full object-contain" />
                         <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                      </div>
                   ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all"><X size={20} /></button>
                   )}
                   <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                </div>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed font-bold uppercase" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Jenazah</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.deceasedAge} onChange={e => handleDataChange('deceasedAge', e.target.value)} placeholder="Umur" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Clock size={12}/> Detail Kejadian</h3>
                <div className="grid grid-cols-2 gap-2">
                   <input type="date" className="w-full p-3 border rounded-xl text-xs" value={data.deathDate} onChange={e => handleDataChange('deathDate', e.target.value)} />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.deathTime} onChange={e => handleDataChange('deathTime', e.target.value)} placeholder="Jam (cth: 08:00)" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.deathReason} onChange={e => handleDataChange('deathReason', e.target.value)} placeholder="Penyebab" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Nama Penandatangan" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <DeathContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <DeathContent />
      </div>
    </div>
  );
}