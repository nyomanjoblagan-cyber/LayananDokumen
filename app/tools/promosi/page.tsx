'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, Building2, UserCircle2, 
  Award, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, CheckCircle2, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function PromosiJabatanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Rekomendasi...</div>}>
      <PromotionBuilder />
    </Suspense>
  );
}

function PromotionBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    docNo: 'REK-PROM/HRD/2026/005',
    
    // PERUSAHAAN
    companyName: 'PT. INOVASI TEKNOLOGI NEGERI',
    companyAddress: 'Cyber Tower Lt. 10, Kuningan\nJakarta Selatan, 12950\nTelp: (021) 222-3333',
    
    // DATA KARYAWAN
    employeeName: 'DIAN SASTRAWIDJAYA',
    employeeId: 'EMP-2023-882',
    currentPosition: 'Senior Graphic Designer',
    newPosition: 'Art Director',
    department: 'Creative & Branding',

    // PENULIS REKOMENDASI (KANAN)
    refName: 'SETIAWAN BUDI, M.BA.',
    refJob: 'Chief Creative Officer',

    // VERIFIKATOR (KIRI - YANG MAS MINTA)
    verifierName: 'BAGIAN HRD',
    verifierJob: 'Human Resources Dept.',

    // DETAIL PERFORMA
    performance: 'Sangat Baik (A)',
    strengths: 'Memiliki kemampuan kepemimpinan yang kuat dan manajemen proyek yang luar biasa.',
    achievement: 'Meningkatkan efisiensi alur kerja sebesar 30% dalam 12 bulan terakhir.'
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

  const PromotionContent = () => (
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

      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT REKOMENDASI PROMOSI JABATAN</h2>
        <p className="text-[10pt] font-sans mt-1 italic">Nomor: {data.docNo}</p>
      </div>

      <div className="space-y-6 flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        <div className="ml-8 space-y-1 text-sm font-sans italic border-l-2 border-slate-200 pl-4">
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.refName}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.refJob}</span></div>
        </div>

        <p>Dengan ini bermaksud memberikan rekomendasi promosi jabatan kepada:</p>
        <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-sm">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.employeeName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Saat Ini</span><span>:</span><span>{data.currentPosition}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Rekomendasi Jabatan</span><span>:</span><span className="font-bold text-blue-700 underline underline-offset-2">{data.newPosition}</span></div>
        </div>

        <p className="text-justify">
          Berdasarkan evaluasi kinerja, Saudara <b>{data.employeeName}</b> memiliki predikat <b>{data.performance}</b>. Pencapaian yang bersangkutan meliputi: <i>{data.achievement}</i>. 
          Serta didukung oleh kompetensi utama: <b>{data.strengths}</b>.
        </p>
        
        <p>Demikian rekomendasi ini saya sampaikan untuk dapat dipergunakan sebagai bahan pertimbangan bagi pihak Manajemen.</p>
      </div>

      {/* TANDA TANGAN SEJAJAR SEMPURNA */}
      <div className="shrink-0 mt-auto pt-10 border-t border-slate-100">
         <div className="grid grid-cols-2 gap-10">
            {/* VERIFIKATOR (KIRI) */}
            <div className="flex flex-col h-44 text-center">
               <div className="h-6 mb-2"></div> 
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest uppercase">Diverifikasi Oleh,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-slate-900">{data.verifierName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">{data.verifierJob}</p>
               </div>
            </div>

            {/* PEMBERI REKOMENDASI (KANAN) */}
            <div className="flex flex-col h-44 text-center">
               <p className="text-[10pt] font-bold h-6 mb-2">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest uppercase">Hormat Saya,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.refName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">{data.refJob}</p>
               </div>
            </div>
         </div>
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

      {/* UI ROOT */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">Promotion <span className="text-white not-italic opacity-50">Builder</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             
             {/* 1. KOP & LOGO */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                <div className="flex items-center gap-4">
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
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
             </div>

             {/* 2. VERIFIKATOR (EDITOR BARU) */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Verifikator (Tanda Tangan Kiri)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.verifierName} onChange={e => handleDataChange('verifierName', e.target.value)} placeholder="cth: BAGIAN HRD" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.verifierJob} onChange={e => handleDataChange('verifierJob', e.target.value)} placeholder="cth: Human Resources Dept." />
             </div>

             {/* 3. PEMBERI REKOMENDASI */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><PenTool size={12}/> Atasan (Tanda Tangan Kanan)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.refName} onChange={e => handleDataChange('refName', e.target.value)} placeholder="Nama Atasan" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.refJob} onChange={e => handleDataChange('refJob', e.target.value)} placeholder="Jabatan Atasan" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
             </div>

             {/* 4. DATA KARYAWAN & JUSTIFIKASI */}
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Detail Promosi</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.newPosition} onChange={e => handleDataChange('newPosition', e.target.value)} placeholder="Rekomendasi Jabatan Baru" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <PromotionContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <PromotionContent />
      </div>
    </div>
  );
}