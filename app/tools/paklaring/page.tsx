'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Briefcase, 
  User, Building2, Medal, ChevronDown, Check, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function PaklaringPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem HRD...</div>}>
      <PaklaringToolBuilder />
    </Suspense>
  );
}

function PaklaringToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT (Sudah ditambah properti 'city')
  const [data, setData] = useState({
    no: `SKK/HRD/${new Date().getFullYear()}/045`,
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta', // Perbaikan error Property 'city' does not exist
    
    // PERUSAHAAN
    compName: 'PT. TEKNOLOGI MAJU BERSAMA',
    compInfo: 'Gedung Cyber 2, Lt. 15\nJl. H.R. Rasuna Said, Jakarta Selatan',
    
    // PENANDA TANGAN
    signerName: 'Siska Amelia',
    signerJob: 'HRD Manager',

    // KARYAWAN
    empName: 'Ahmad Fauzi',
    empNik: '20200512',
    empAddress: 'Jl. Merpati No. 10, Tebet, Jakarta Selatan',
    
    // DETIL KERJA
    empPosition: 'Senior Graphic Designer',
    startDate: '2023-01-15',
    endDate: '2026-01-15',
    
    // PENILAIAN
    evaluation: 'Selama bekerja, Saudara Ahmad Fauzi telah menunjukkan dedikasi, loyalitas, dan integritas yang tinggi terhadap perusahaan serta tidak pernah melakukan tindakan yang merugikan. Yang bersangkutan mengundurkan diri atas kemauan sendiri (Resign).',
    
    closing: 'Kami mengucapkan terima kasih atas kontribusi yang telah diberikan dan berharap kesuksesan menyertai langkah karir Saudara di masa depan.'
  });

  // LOGIC DURASI
  const [durationStr, setDurationStr] = useState('');

  useEffect(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    let str = '';
    if (years > 0) str += `${years} Tahun `;
    if (months > 0) str += `${months} Bulan`;
    if (str === '') str = 'Kurang dari 1 bulan';
    
    setDurationStr(str);
  }, [data.startDate, data.endDate]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const TEMPLATES = [
    { id: 1, name: "Standar HRD (Compact)", desc: "Format baku, satu halaman" },
    { id: 2, name: "Modern Certificate", desc: "Desain sertifikat (Bilingual)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (FIX KEPOTONG & SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* Tampilan Preview di Browser */
      w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] mx-auto text-[#1e293b] font-serif leading-relaxed text-[11pt] relative box-border mb-8 
      /* Pengaturan Cetak (Print) */
      print:w-[210mm] print:h-auto print:min-h-0 print:shadow-none print:mb-0 print:p-[15mm] print:overflow-visible print:block print:static
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT UNTUK FIX KEPOTONG & SCROLLBAR */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body, html { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
            overflow: visible !important; 
            height: auto !important; 
          }
          header, nav, aside, button, .no-print { display: none !important; }
          #main-content { padding: 0 !important; margin: 0 !important; display: block !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER NAV (NON-PRINTABLE) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Surat Keterangan Kerja</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 overflow-hidden text-slate-700 font-sans">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b last:border-0">
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> Cetak
            </button>
          </div>
        </div>
      </div>

      <div id="main-content" className="max-w-[1600px] mx-auto p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <div className="flex items-center gap-4 border-b pb-4 font-sans">
                <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden">
                   {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <div className="flex-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase">Kop Perusahaan</label>
                   <input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
                </div>
             </div>
             <div className="font-sans">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Alamat & Info</label>
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.compInfo} onChange={e => setData({...data, compInfo: e.target.value})} />
             </div>
             <div className="grid grid-cols-2 gap-3 font-sans">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Kota Terbit</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Tanggal Terbit</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} /></div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2"><User size={14}/> Identitas Karyawan</h3>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.empName} onChange={e => setData({...data, empName: e.target.value})} /></div>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">NIK / ID</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.empNik} onChange={e => setData({...data, empNik: e.target.value})} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => setData({...data, empPosition: e.target.value})} /></div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Mulai Kerja</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Akhir Kerja</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} /></div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2"><Medal size={14}/> Penilaian & Penanda Tangan</h3>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Isi Penilaian</label><textarea className="w-full p-2 border rounded text-xs h-24" value={data.evaluation} onChange={e => setData({...data, evaluation: e.target.value})} /></div>
             <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nama HRD</label><input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => setData({...data, signerName: e.target.value})} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} /></div>
             </div>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          {templateId === 1 ? (
            <Kertas>
              <div className="flex items-center gap-4 border-b-4 border-double border-slate-800 pb-3 mb-6">
                 <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="font-bold text-slate-300 uppercase text-xs">LOGO</div>}
                 </div>
                 <div className="flex-1 text-center">
                    <h1 className="text-xl font-black uppercase text-slate-900 leading-tight">{data.compName}</h1>
                    <div className="text-xs text-slate-600 whitespace-pre-line leading-tight">{data.compInfo}</div>
                 </div>
              </div>
              <div className="text-center mb-8">
                 <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN KERJA</h2>
                 <div className="text-sm font-bold mt-1">Nomor: {data.no}</div>
              </div>
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              <div className="ml-4 mb-4">
                 <table className="w-full leading-snug">
                    <tbody>
                       <tr><td className="w-32 py-0.5">Nama</td><td>:</td><td className="font-bold">{data.signerName}</td></tr>
                       <tr><td className="py-0.5">Jabatan</td><td>:</td><td>{data.signerJob}</td></tr>
                    </tbody>
                 </table>
              </div>
              <p className="mb-4 text-justify">Menerangkan dengan sesungguhnya bahwa:</p>
              <div className="ml-4 mb-6">
                 <table className="w-full leading-snug">
                    <tbody>
                       <tr><td className="w-32 py-0.5 uppercase">Nama</td><td>:</td><td className="font-bold uppercase">{data.empName}</td></tr>
                       <tr><td className="py-0.5">NIK</td><td>:</td><td>{data.empNik}</td></tr>
                       <tr><td className="py-0.5">Jabatan</td><td>:</td><td>{data.empPosition}</td></tr>
                       <tr><td className="py-0.5 uppercase">Masa Kerja</td><td>:</td><td>{new Date(data.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})} s/d {new Date(data.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})} ({durationStr})</td></tr>
                    </tbody>
                 </table>
              </div>
              <p className="mb-4 text-justify leading-relaxed">{data.evaluation}</p>
              <p className="mb-8 text-justify leading-relaxed">{data.closing}</p>
              <div className="flex justify-end text-center mt-20">
                 <div className="w-64">
                    <p className="mb-1 text-sm">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                    <p className="mb-20 font-bold uppercase">{data.compName}</p>
                    <p className="font-bold underline uppercase">{data.signerName}</p>
                    <p className="text-sm font-sans">{data.signerJob}</p>
                 </div>
              </div>
            </Kertas>
          ) : (
            <Kertas className="font-sans text-[10pt]">
               <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8 border-b-2 border-slate-100 pb-4">
                     {logo ? <img src={logo} className="h-10 w-auto" /> : <div className="font-black text-xl text-slate-300 uppercase">LOGO</div>}
                     <div className="text-right">
                        <div className="font-bold text-slate-800 text-lg uppercase tracking-tight">{data.compName}</div>
                        <div className="text-xs text-slate-400">{data.city}</div>
                     </div>
                  </div>
                  <div className="text-center mb-12">
                     <h1 className="text-2xl font-light text-slate-800 uppercase tracking-[0.2em] mb-1">To Whom It May Concern</h1>
                     <div className="text-[10px] text-slate-400 font-bold tracking-[0.5em] mb-4 uppercase">Certificate of Employment</div>
                     <div className="text-xs text-slate-400 font-mono">No: {data.no}</div>
                  </div>
                  <div className="mb-12 text-center px-12">
                     <p className="mb-4 text-slate-500">This is to certify that:</p>
                     <h2 className="text-2xl font-bold text-slate-900 uppercase mb-1">{data.empName}</h2>
                     <div className="text-sm text-slate-500 mb-8 tracking-widest">NIK: {data.empNik}</div>
                     <p className="mb-6 text-slate-600 leading-relaxed italic text-justify">
                        Has been employed with <strong>{data.compName}</strong> as <strong>{data.empPosition}</strong> during the period from {new Date(data.startDate).toLocaleDateString('en-US', {month:'long', year:'numeric'})} to {new Date(data.endDate).toLocaleDateString('en-US', {month:'long', year:'numeric'})}.
                     </p>
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600 text-sm leading-relaxed text-justify">
                        {data.evaluation}
                     </div>
                  </div>
                  <div className="mt-auto flex justify-center text-center">
                     <div className="w-64">
                        <div className="text-xs text-slate-400 mb-16">{data.city}, {new Date(data.date).toLocaleDateString('en-US', {day:'numeric', month:'long', year:'numeric'})}</div>
                        <div className="border-t border-slate-300 pt-2">
                           <div className="font-bold text-slate-900 uppercase tracking-tighter text-lg leading-none mb-1">{data.signerName}</div>
                           <div className="text-xs uppercase text-slate-400 tracking-widest">{data.signerJob}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </Kertas>
          )}
        </div>
      </div>
    </div>
  );
}