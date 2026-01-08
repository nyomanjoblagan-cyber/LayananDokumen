'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  User, Building2, Calendar, PenTool, HeartHandshake, Briefcase, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function ResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <ResignToolBuilder />
    </Suspense>
  );
}

function ResignToolBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // Helper Dates
  const today = new Date();
  const oneMonthNotice = new Date(new Date().setDate(today.getDate() + 30));

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    signDate: new Date().toISOString().split('T')[0], // Tgl Tanda Tangan
    lastDate: oneMonthNotice.toISOString().split('T')[0], // Tgl Terakhir Kerja
    
    // KARYAWAN
    empName: 'Ahmad Fauzi',
    empPosition: 'Senior Marketing Executive',
    empDept: 'Divisi Pemasaran',
    
    // TUJUAN (ATASAN/HRD)
    managerName: 'Bapak Budi Santoso',
    managerTitle: 'HRD Manager',
    companyName: 'PT. MAJU MUNDUR SEJAHTERA',
    companyAddress: 'Gedung Cyber, Jl. Rasuna Said, Jakarta',
    
    // ISI SURAT (Auto-Generated)
    opening: 'Melalui surat ini, saya bermaksud untuk menyampaikan permohonan pengunduran diri saya dari jabatan Senior Marketing Executive di PT. Maju Mundur Sejahtera.',
    
    reason: 'Keputusan ini saya ambil setelah pertimbangan matang untuk melanjutkan pengembangan karir saya di tempat yang baru. Saya ingin mengucapkan terima kasih yang sebesar-besarnya atas kesempatan dan kepercayaan yang telah diberikan selama saya bekerja di sini.',
    
    handover: 'Saya akan tetap melaksanakan tugas dan tanggung jawab saya hingga hari terakhir bekerja. Saya juga berkomitmen untuk membantu proses transisi dan serah terima pekerjaan kepada rekan yang menggantikan agar operasional tetap berjalan lancar.',
    
    closing: 'Saya memohon maaf jika ada kesalahan yang pernah saya perbuat selama bekerja. Semoga PT. Maju Mundur Sejahtera semakin sukses dan berkembang di masa depan.'
  });

  // HELPER DATE
  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // LOGIC AUTO TEXT (ALASAN RESIGN)
  const applyReason = (type: 'standard' | 'career' | 'personal') => {
    if (type === 'standard') {
      setData(prev => ({
        ...prev,
        opening: `Melalui surat ini, saya bermaksud menyampaikan pengunduran diri saya sebagai ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Saya mengucapkan terima kasih yang tulus atas kesempatan kerja yang telah diberikan kepada saya selama ini. Saya telah belajar banyak hal dan bangga bisa menjadi bagian dari perusahaan ini.`,
        handover: `Sesuai ketentuan One Month Notice, saya akan tetap bekerja secara profesional hingga tanggal efektif pengunduran diri saya.`
      }));
    } else if (type === 'career') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat, bersama surat ini saya mengajukan pengunduran diri dari posisi ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Keputusan berat ini saya ambil karena saya telah menerima penawaran kesempatan karir baru yang sejalan dengan rencana pengembangan profesional saya kedepan. Terima kasih atas bimbingan Bapak/Ibu selama ini yang sangat berharga bagi karir saya.`,
        handover: `Saya berkomitmen penuh untuk menyelesaikan seluruh tanggungan pekerjaan dan membantu proses handover kepada pengganti saya sebelum hari terakhir saya bekerja.`
      }));
    } else if (type === 'personal') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, ${prev.empName}, bermaksud mengajukan pengunduran diri dari ${prev.companyName}.`,
        reason: `Adapun alasan pengunduran diri ini dikarenakan adanya urusan pribadi/keluarga yang mengharuskan saya untuk tidak lagi dapat bekerja secara penuh waktu. Saya sangat berterima kasih atas pengertian dan dukungan perusahaan selama ini.`,
        handover: `Saya akan memastikan seluruh tugas saya diserahterimakan dengan baik agar tidak mengganggu kinerja tim yang saya tinggalkan.`
      }));
    }
  };

  // HANDLERS
  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Formal Sopan (Standard)", desc: "Format baku, aman untuk semua perusahaan" },
    { id: 2, name: "Modern Heartfelt", desc: "Lebih personal, cocok untuk atasan dekat" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[25mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[25mm] 
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
            overflow: hidden !important; 
          }

          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Resign</h1>
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
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Quick Generator */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <HeartHandshake size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Alasan Resign)</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyReason('standard')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors">
                   Standar (1 Month)
                </button>
                <button onClick={() => applyReason('career')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors">
                   Pindah Kerja
                </button>
                <button onClick={() => applyReason('personal')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors">
                   Alasan Pribadi
                </button>
             </div>
          </div>

          {/* Data Karyawan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Anda</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Divisi/Departemen</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.empDept} onChange={e => handleDataChange('empDept', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Tujuan & Tanggal */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Tujuan & Waktu</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota & Tgl Surat</label>
                      <div className="flex gap-1">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                         <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signDate} onChange={e => handleDataChange('signDate', e.target.value)} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase text-red-600">Hari Terakhir Kerja</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.lastDate} onChange={e => handleDataChange('lastDate', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Atasan / HRD</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Yth. Bapak..." value={data.managerName} onChange={e => handleDataChange('managerName', e.target.value)} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs mt-1" placeholder="Jabatan Atasan" value={data.managerTitle} onChange={e => handleDataChange('managerTitle', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor (Opsional)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Isi Surat */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <PenTool size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Isi Surat</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pembuka (Maksud)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan & Ucapan Terima Kasih</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Komitmen Handover</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.handover} onChange={e => handleDataChange('handover', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penutup (Doa)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: FORMAL SOPAN (Standard Corporate) */}
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-loose text-justify">
                 {/* Tanggal */}
                 <div className="text-right mb-8">
                    {data.city}, {formatDateIndo(data.signDate)}
                 </div>

                 {/* Tujuan */}
                 <div className="mb-8">
                    <div className="mb-2">Perihal: <strong>Pengunduran Diri</strong></div>
                    
                    <div className="leading-normal">
                       Kepada Yth,<br/>
                       <strong>{data.managerName}</strong><br/>
                       {data.managerTitle} {data.companyName}<br/>
                       <span className="text-slate-600 text-sm">{data.companyAddress}</span>
                    </div>
                 </div>

                 {/* Isi */}
                 <div className="mb-6">
                    Dengan hormat,
                 </div>

                 <div className="mb-6 whitespace-pre-line">
                    {data.opening}
                 </div>

                 <div className="mb-6">
                    Adapun hari terakhir saya bekerja adalah tanggal <strong>{formatDateIndo(data.lastDate)}</strong>.
                 </div>

                 <div className="mb-6 whitespace-pre-line">
                    {data.reason}
                 </div>

                 <div className="mb-6 whitespace-pre-line">
                    {data.handover}
                 </div>

                 <div className="mb-6 whitespace-pre-line">
                    {data.closing}
                 </div>

                 {/* TTD */}
                 <div className="mt-16 text-right mr-10">
                    <p className="mb-20">Hormat saya,</p>
                    <p className="font-bold underline uppercase">{data.empName}</p>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: MODERN HEARTFELT (Clean & Direct) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-relaxed h-full flex flex-col">
                 {/* Header */}
                 <div className="border-b-2 border-slate-100 pb-6 mb-8 flex justify-between items-start">
                    <div>
                       <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">Surat Pengunduran Diri</h1>
                       <div className="text-slate-500 mt-1">{data.empName} — {data.empPosition}</div>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                       {formatDateIndo(data.signDate)}
                    </div>
                 </div>

                 <div className="mb-8 text-sm">
                    <div className="text-slate-500 uppercase text-[10px] tracking-widest mb-1">Kepada Yth.</div>
                    <div className="font-bold text-lg">{data.managerName}</div>
                    <div className="text-slate-600">{data.managerTitle}, {data.companyName}</div>
                 </div>

                 <div className="space-y-6 text-justify text-slate-700 text-sm">
                    <div className="whitespace-pre-line">{data.opening}</div>
                    
                    <div className="bg-slate-50 p-4 border-l-4 border-slate-800">
                       Saya mengajukan pengunduran diri ini dengan pemberitahuan efektif hingga tanggal terakhir kerja saya pada <strong>{formatDateIndo(data.lastDate)}</strong>.
                    </div>

                    <div className="whitespace-pre-line">{data.reason}</div>
                    <div className="whitespace-pre-line">{data.handover}</div>
                    <div className="whitespace-pre-line">{data.closing}</div>
                 </div>

                 <div className="mt-16 text-right">
                    <div className="font-['Caveat',cursive] text-2xl text-slate-500 mb-2">Salam,</div>
                    <div className="font-bold text-lg text-slate-800 uppercase">{data.empName}</div>
                 </div>
              </div>
            )}

          </Kertas>

        </div>
      </div>
    </div>
  );
}