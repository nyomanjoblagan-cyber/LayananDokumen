'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  ShieldAlert, Calendar, User, Building2, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SPPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem HRD...</div>}>
      <SPToolBuilder />
    </Suspense>
  );
}

function SPToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [spLevel, setSpLevel] = useState<1 | 2 | 3>(1);

  // Helper Dates
  const today = new Date();
  const sixMonthsLater = new Date(new Date().setMonth(today.getMonth() + 6));

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `SP-001/HRD/${new Date().getFullYear()}`,
    date: new Date().toISOString().split('T')[0],
    validUntil: sixMonthsLater.toISOString().split('T')[0],
    
    // PERUSAHAAN
    compName: 'PT. MAJU MUNDUR SEJAHTERA',
    compInfo: 'Jl. Jend. Sudirman Kav. 1, Jakarta Selatan\nEmail: hrd@majumundur.com',
    
    // KARYAWAN
    empName: 'Budi Santoso',
    empId: 'NIK-2023005',
    empDiv: 'Sales & Marketing',
    empTitle: 'Sales Executive',
    
    // PELANGGARAN
    violationTitle: 'Ketidakhadiran Tanpa Keterangan (Alpha)',
    violationDesc: 'Saudara Budi Santoso tidak masuk kerja tanpa keterangan (Alpha) selama 3 (tiga) hari berturut-turut pada tanggal 10, 11, dan 12 Januari 2026, serta tidak dapat dihubungi oleh atasan.',
    
    // SANKSI
    sanction: 'Selama masa berlaku Surat Peringatan ini, Saudara tidak berhak mendapatkan bonus bulanan. Apabila Saudara mengulangi kesalahan yang sama atau melakukan pelanggaran lain, maka Perusahaan akan menerbitkan SP tingkat lanjut.',
    
    signer: 'Siska Amelia',
    signerJob: 'HRD Manager'
  });

  // LOGIC AUTO TEXT SP LEVEL
  const applySPLevel = (level: 1 | 2 | 3) => {
    setSpLevel(level);
    let newSanction = '';
    
    if (level === 1) {
      newSanction = 'Selama masa berlaku SP 1 ini (6 bulan), Perusahaan akan memantau kinerja Saudara. Tunjangan tidak tetap akan dipotong sesuai kebijakan.';
    } else if (level === 2) {
      newSanction = 'SP 2 ini diterbitkan karena Saudara mengulangi kesalahan saat masa SP 1 masih berlaku. Sanksi administratif berupa penundaan kenaikan gaji akan diberlakukan.';
    } else {
      newSanction = 'INI ADALAH PERINGATAN TERAKHIR (SP 3). Jika Saudara melakukan pelanggaran sekali lagi dalam bentuk apapun, Perusahaan akan melakukan Pemutusan Hubungan Kerja (PHK).';
    }

    setData(prev => ({
      ...prev,
      no: `SP-00${level}/HRD/${new Date().getFullYear()}`,
      sanction: newSanction
    }));
  };

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const TEMPLATES = [
    { id: 1, name: "Format SK (Formal)", desc: "Gaya Menimbang/Mengingat/Memutuskan (Standar Pabrik/PT)" },
    { id: 2, name: "Surat Dinas (Modern)", desc: "Gaya surat teguran langsung (Standar Startup/Kantor)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SCALING AMAN */
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT - TOTAL RESET */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* HILANGKAN SCROLL DI BODY */
          }

          /* HILANGKAN VISUAL SCROLLBAR */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* WARNA TEXT JELAS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Peringatan (SP)</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Level Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Tingkat Pelanggaran</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applySPLevel(1)} className={`p-2 border rounded flex flex-col items-center gap-1 transition-all ${spLevel === 1 ? 'bg-amber-50 border-amber-500 text-amber-800' : 'hover:bg-slate-50'}`}>
                   <span className="font-black text-lg">SP 1</span>
                   <span className="text-[9px] uppercase">Teguran</span>
                </button>
                <button onClick={() => applySPLevel(2)} className={`p-2 border rounded flex flex-col items-center gap-1 transition-all ${spLevel === 2 ? 'bg-orange-50 border-orange-500 text-orange-800' : 'hover:bg-slate-50'}`}>
                   <span className="font-black text-lg">SP 2</span>
                   <span className="text-[9px] uppercase">Keras</span>
                </button>
                <button onClick={() => applySPLevel(3)} className={`p-2 border rounded flex flex-col items-center gap-1 transition-all ${spLevel === 3 ? 'bg-red-50 border-red-500 text-red-800' : 'hover:bg-slate-50'}`}>
                   <span className="font-black text-lg">SP 3</span>
                   <span className="text-[9px] uppercase">Terakhir</span>
                </button>
             </div>
          </div>

          {/* Perusahaan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Perusahaan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo Kop</button>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                  </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.compInfo} onChange={e => setData({...data, compInfo: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Karyawan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Karyawan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.empName} onChange={e => setData({...data, empName: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.empId} onChange={e => setData({...data, empId: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Divisi</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.empDiv} onChange={e => setData({...data, empDiv: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.empTitle} onChange={e => setData({...data, empTitle: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Detail SP */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <ShieldAlert size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Pelanggaran & Sanksi</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Pelanggaran</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.violationTitle} onChange={e => setData({...data, violationTitle: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kronologi / Deskripsi</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.violationDesc} onChange={e => setData({...data, violationDesc: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Konsekuensi / Sanksi</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none bg-red-50 border-red-200 text-red-900" value={data.sanction} onChange={e => setData({...data, sanction: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Terbit</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Berlaku Sampai</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.validUntil} onChange={e => setData({...data, validUntil: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penanda Tangan (HRD/Atasan)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs mb-1" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs placeholder:text-slate-300" placeholder="Jabatan" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full print:block">
          
          <Kertas>
            
            {/* TEMPLATE 1: FORMAL SK (COMPACT VERSION) */}
            {templateId === 1 && (
              <div className="font-serif text-[10pt] leading-normal h-full flex flex-col">
                 {/* Header / Kop - Jarak dirapatkan */}
                 <div className="flex items-center gap-4 border-b-4 border-double border-slate-800 pb-3 mb-6">
                    <div className="w-16 h-16 flex items-center justify-center shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold rounded">LOGO</div>}
                    </div>
                    <div className="flex-1 text-center">
                       <h1 className="text-xl font-black uppercase text-slate-900 tracking-wide mb-1">{data.compName}</h1>
                       <div className="text-xs text-slate-600 whitespace-pre-line leading-tight">{data.compInfo}</div>
                    </div>
                 </div>

                 {/* Judul SK */}
                 <div className="text-center mb-6">
                    <h2 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERINGATAN {spLevel}</h2>
                    <div className="text-sm font-bold">Nomor: {data.no}</div>
                 </div>

                 <p className="mb-2">Diberikan kepada:</p>
                 
                 <div className="ml-4 mb-4">
                    <table className="w-full">
                       <tbody>
                          <tr><td className="w-24 font-bold py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5">{data.empName}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.empId}</td></tr>
                          <tr><td className="py-0.5">Divisi</td><td className="py-0.5">:</td><td className="py-0.5">{data.empDiv}</td></tr>
                          <tr><td className="py-0.5">Jabatan</td><td className="py-0.5">:</td><td className="py-0.5">{data.empTitle}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <div className="mb-4">
                    <div className="font-bold uppercase mb-1 text-sm border-b border-slate-300 w-fit pb-0.5">1. Menimbang (Dasar Pelanggaran):</div>
                    <div className="text-justify ml-4 text-slate-800">
                       Bahwa Saudara <strong>{data.empName}</strong> telah melakukan tindakan indisipliner / pelanggaran tata tertib perusahaan berupa: <strong>{data.violationTitle}</strong>.
                       <div className="mt-1 text-slate-700 italic">"{data.violationDesc}"</div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <div className="font-bold uppercase mb-1 text-sm border-b border-slate-300 w-fit pb-0.5">2. Mengingat (Peraturan):</div>
                    <div className="text-justify ml-4 text-slate-800">
                       Ketentuan yang tertuang dalam Peraturan Perusahaan (PP) / Perjanjian Kerja Bersama (PKB) yang berlaku di {data.compName} mengenai kedisiplinan dan tanggung jawab karyawan.
                    </div>
                 </div>

                 <div className="mb-6">
                    <div className="font-bold uppercase mb-1 text-sm border-b border-slate-300 w-fit pb-0.5">3. Memutuskan (Sanksi):</div>
                    <div className="text-justify ml-4 space-y-1 text-slate-800">
                       <div className="flex gap-2"><span className="shrink-0">a.</span><span>Memberikan <strong>SURAT PERINGATAN {spLevel}</strong> kepada Saudara.</span></div>
                       <div className="flex gap-2"><span className="shrink-0">b.</span><span>{data.sanction}</span></div>
                       <div className="flex gap-2"><span className="shrink-0">c.</span><span>Surat Peringatan ini berlaku terhitung mulai tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID')}</strong> sampai dengan <strong>{new Date(data.validUntil).toLocaleDateString('id-ID')}</strong>.</span></div>
                    </div>
                 </div>

                 <p className="text-justify mb-8">
                    Demikian Surat Peringatan ini diterbitkan agar dapat menjadi perhatian dan bahan evaluasi diri bagi Saudara untuk kembali bekerja dengan baik sesuai standar Perusahaan.
                 </p>

                 {/* TTD Box */}
                 <div className="flex justify-between text-center mt-auto">
                    <div className="w-1/2 px-2">
                       <p className="mb-1">Diterbitkan Oleh,</p>
                       <p className="text-xs mb-16 font-bold text-slate-500">{data.compName}</p>
                       <p className="font-bold underline uppercase">{data.signer}</p>
                       <p className="text-xs">{data.signerJob}</p>
                    </div>
                    <div className="w-1/2 px-2">
                       <p className="mb-1">Diterima & Disetujui Oleh,</p>
                       <p className="text-xs mb-16 font-bold text-slate-500">Karyawan</p>
                       <p className="font-bold underline uppercase">{data.empName}</p>
                       <p className="text-xs">{data.empTitle}</p>
                    </div>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: SURAT DINAS (MODERN SIMPLE) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-relaxed h-full flex flex-col">
                 <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 pb-3">
                    <div className="flex items-center gap-3">
                       {logo && <img src={logo} className="h-10 w-auto" />}
                       <div className="font-bold text-lg text-slate-700">{data.compName}</div>
                    </div>
                    <div className="text-right text-xs text-slate-500 whitespace-pre-line">{data.compInfo}</div>
                 </div>

                 <div className="mb-6">
                    <h1 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tight">SURAT PERINGATAN {spLevel}</h1>
                    <div className="text-sm text-slate-500 font-medium">{data.no}</div>
                 </div>

                 <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="grid grid-cols-[80px_10px_1fr] gap-1 mb-1">
                       <span className="font-bold text-slate-600">Nama</span><span>:</span><span className="font-bold">{data.empName}</span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] gap-1 mb-1">
                       <span className="font-bold text-slate-600">ID / NIK</span><span>:</span><span>{data.empId}</span>
                    </div>
                    <div className="grid grid-cols-[80px_10px_1fr] gap-1">
                       <span className="font-bold text-slate-600">Posisi</span><span>:</span><span>{data.empTitle} - {data.empDiv}</span>
                    </div>
                 </div>

                 <div className="mb-6">
                    <p className="mb-2">Surat ini diterbitkan sebagai teguran resmi sehubungan dengan pelanggaran yang Saudara lakukan, yaitu:</p>
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r text-slate-800">
                       <div className="font-bold mb-1">{data.violationTitle}</div>
                       <div className="text-sm text-slate-600">{data.violationDesc}</div>
                    </div>
                 </div>

                 <div className="mb-6">
                    <p className="mb-1 font-bold text-slate-700 uppercase text-xs tracking-wider">KONSEKUENSI & SANKSI:</p>
                    <p className="text-justify mb-2 text-sm">{data.sanction}</p>
                    <p className="text-justify text-sm">Surat Peringatan ini berlaku efektif mulai <strong>{data.date}</strong> hingga <strong>{data.validUntil}</strong>. Jika dalam periode tersebut Saudara menunjukkan perbaikan kinerja, maka status SP ini akan dicabut setelah masa berlaku habis.</p>
                 </div>

                 <div className="flex justify-between items-end mt-auto pt-6 border-t border-slate-200">
                    <div>
                       <div className="text-xs text-slate-400 mb-12">Penerima (Karyawan),</div>
                       <div className="font-bold text-slate-800">{data.empName}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs text-slate-400 mb-12">Mengetahui (Manajemen),</div>
                       <div className="font-bold text-slate-800">{data.signer}</div>
                       <div className="text-xs uppercase text-slate-500">{data.signerJob}</div>
                    </div>
                 </div>
              </div>
            )}

          </Kertas>

        </div>
      </div>
    </div>
  );
}