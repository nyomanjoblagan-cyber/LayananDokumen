'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  Scale, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool
} from 'lucide-react';
import Link from 'next/link';

export default function SuratPHKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat PHK Profesional...</div>}>
      <TerminationLetterBuilder />
    </Suspense>
  );
}

function TerminationLetterBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    docNo: 'SK-PHK/MKT/2026/012',
    companyName: 'PT. SINAR JAYA TEKNOLOGI',
    companyAddress: 'Gedung Grha Mandiri Lt. 15, Menteng\nJakarta Pusat, 10310\nTelp: (021) 555-1234',
    authorityName: 'HENDRA KUSUMA, S.H.',
    authorityJob: 'Human Resources Manager',
    employeeName: 'AHMAD SUBARDI',
    employeeId: 'EMP-2022-045',
    position: 'Senior Marketing Executive',
    lastWorkDate: '2026-01-31',
    reason: 'Efisiensi Perusahaan dikarenakan perubahan strategi bisnis dan kondisi ekonomi yang terdampak secara global, sehingga diperlukan reorganisasi struktur organisasi.',
    compensationInfo: 'Uang Pesangon, Uang Penghargaan Masa Kerja, dan Uang Penggantian Hak sesuai dengan ketentuan PP No. 35 Tahun 2021.'
  });

  const TEMPLATES = [
    { id: 1, name: "Formal Korporat", desc: "Bahasa Hukum & Lugas" },
    { id: 2, name: "Modern Clean", desc: "Desain Minimalis & Modern" }
  ];

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name || TEMPLATES[0].name;
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const PHKContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 ${templateId === 1 ? 'font-serif' : 'font-sans'}`} 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP SURAT */}
      <div className="flex items-start gap-6 border-b-2 border-slate-900 pb-6 mb-8 shrink-0">
        {logo ? (
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
        ) : (
          <div className="w-20 h-20 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 shrink-0 no-print">
            <Building2 size={32} />
          </div>
        )}
        <div className="flex-grow">
           <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">{data.companyName}</h1>
           <div className="text-[9pt] font-sans text-slate-600 whitespace-pre-line leading-relaxed italic">
              {data.companyAddress}
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT PEMBERITAHUAN PHK</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-6 flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p>Kepada Yth,<br/><b>Bapak/Ibu {data.employeeName}</b><br/>Di Tempat</p>
        <p>Dengan hormat,</p>
        <p>Manajemen <b>{data.companyName}</b> menyampaikan apresiasi atas segala dedikasi dan kontribusi yang telah Saudara berikan selama ini bagi perusahaan.</p>
        <p>Namun, setelah melalui evaluasi mendalam, kami memberitahukan bahwa dikarenakan <b>{data.reason}</b>, maka Perusahaan memutuskan untuk mengakhiri hubungan kerja dengan Saudara:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 font-sans text-sm">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>ID Karyawan</span><span>:</span><span className="font-bold">{data.employeeId}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Akhir</span><span>:</span><span>{data.position}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Efektif Terakhir</span><span>:</span><span className="font-bold text-red-600 underline">{new Date(data.lastWorkDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
        </div>

        <p>Perusahaan berkomitmen memberikan dana kompensasi berupa <b>{data.compensationInfo}</b> sesuai peraturan yang berlaku.</p>
        <p>Demikian surat ini kami sampaikan. Terima kasih.</p>
      </div>

      {/* TANDA TANGAN SEJAJAR SEMPURNA */}
      <div className="shrink-0 mt-auto pt-10 border-t border-slate-100">
         <div className="grid grid-cols-2 gap-10">
            {/* KOLOM KIRI (PERUSAHAAN) */}
            <div className="flex flex-col h-44 text-center">
               {/* Spacer setinggi tanggal di kolom kanan */}
               <div className="h-6 mb-2"></div> 
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Pihak Perusahaan,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.authorityName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">{data.authorityJob}</p>
               </div>
            </div>

            {/* KOLOM KANAN (KARYAWAN) */}
            <div className="flex flex-col h-44 text-center">
               <p className="text-[10pt] font-bold h-6 mb-2">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Diterima Oleh,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.employeeName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">Karyawan</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans">
      {/* ... bagian CSS tetap sama ... */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      <div id="ui-root" className="flex flex-col h-screen no-print">
        {/* ... bagian Header tetap sama ... */}
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-500 italic">Termination <span className="text-white not-italic opacity-50">Editor Pro</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print PHK
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900">
             {/* ... bagian input sidebar tetap sama ... */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop & Logo</h3>
                <div className="flex items-center gap-4 mb-4">
                   {logo ? (
                      <div className="relative w-16 h-16 border rounded overflow-hidden group">
                         <img src={logo} className="w-full h-full object-contain" />
                         <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                      </div>
                   ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all"><ImagePlus size={20} /></button>
                   )}
                   <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><PenTool size={12}/> Penandatangan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.authorityName} onChange={e => handleDataChange('authorityName', e.target.value)} placeholder="Nama Penandatangan" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.authorityJob} onChange={e => handleDataChange('authorityJob', e.target.value)} placeholder="Jabatan" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Terbit" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Karyawan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Jabatan" />
             </div>
             
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-2 tracking-widest flex items-center gap-2"><Scale size={12}/> Detail PHK</h3>
                <input type="date" className="w-full p-3 border rounded-xl text-xs font-black" value={data.lastWorkDate} onChange={e => handleDataChange('lastWorkDate', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <PHKContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <PHKContent />
      </div>
    </div>
  );
}