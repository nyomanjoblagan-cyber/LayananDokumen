'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, CalendarDays
} from 'lucide-react';
import Link from 'next/link';

export default function PengantarNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Pengantar Nikah...</div>}>
      <MarriageNoticeBuilder />
    </Suspense>
  );
}

function MarriageNoticeBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '474.2/08/I/2026',
    
    // PEMERINTAH DESA
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
    villageHead: 'I NYOMAN GEDE, S.E.',
    villageJob: 'Perbekel Pemecutan Kaja',

    // DATA CALON PENGANTIN
    name: 'BAGUS RAMADHAN',
    nik: '5171010101990001',
    gender: 'Laki-laki',
    placeBirth: 'Denpasar',
    dateBirth: '1999-12-25',
    religion: 'Islam',
    job: 'Karyawan Swasta',
    status: 'Jejaka (Belum Kawin)',
    address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // KETERANGAN
    destination: 'Kepala KUA Kecamatan Denpasar Utara'
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

  const MarriageContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP SURAT DESA */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           {logo ? (
              <img src={logo} alt="Logo" className="w-18 h-18 object-contain shrink-0" />
           ) : (
              <div className="w-18 h-18 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 no-print">
                 <Building2 size={24} />
              </div>
           )}
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT PENGANTAR NIKAH</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.gender}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Agama</span><span>:</span><span>{data.religion}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Perkawinan</span><span>:</span><span className="font-bold">{data.status}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
        </div>

        <p className="mb-6">
          Orang tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk melengkapi persyaratan pernikahan yang akan didaftarkan pada <b>{data.destination}</b>.
        </p>

        <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-8">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr>
              <td className="text-center align-top">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Tanda Tangan Pemegang,</p>
                <p className="font-bold underline uppercase text-[10pt] tracking-tight">({data.name})</p>
              </td>
              <td className="text-center align-top">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">{data.villageJob},</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[10pt] tracking-tight">{data.villageHead}</p>
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
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">Marriage <span className="text-white not-italic opacity-40 font-normal">Notice Builder</span></h1>
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
                <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><Heart size={12}/> Data Calon Pengantin</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)} placeholder="Agama" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Kota Lahir" />
                   <input type="date" className="w-full p-3 border rounded-xl text-xs font-bold" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-bold text-blue-600" value={data.status} onChange={e => handleDataChange('status', e.target.value)} placeholder="Status (Jejaka/Perawan)" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Penandatangan</h3>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.destination} onChange={e => handleDataChange('destination', e.target.value)} placeholder="Tujuan KUA" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <MarriageContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <MarriageContent />
      </div>
    </div>
  );
}