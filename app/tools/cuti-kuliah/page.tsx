'use client';

/**
 * FILE: CutiKuliahPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Permohonan Cuti Akademik (Kuliah)
 * FEATURES:
 * - Dual Template (Surat Resmi vs Formulir)
 * - Auto Academic Year Format
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarClock, FileText, MapPin, 
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface LeaveData {
  city: string;
  date: string;
  
  // Instansi
  university: string;
  faculty: string;
  department: string;

  // Data Mahasiswa
  studentName: string;
  studentId: string;
  semester: string;
  ipk: string;
  address: string;
  phone: string;
  
  // Detail Cuti
  leaveDuration: string;
  academicYear: string;
  semesterType: string;
  reason: string;

  // Penandatangan
  advisorName: string;
  advisorNIP: string;
  deanName: string;
  deanNIP: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LeaveData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  
  university: 'UNIVERSITAS UDAYANA (UNUD)',
  faculty: 'Fakultas Teknik',
  department: 'Teknologi Informasi',

  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  semester: '4 (Empat)',
  ipk: '3.75',
  address: 'Jl. Kampus Unud, Jimbaran',
  phone: '081234567890',
  
  leaveDuration: '1 (Satu) Semester',
  academicYear: '2025/2026',
  semesterType: 'Genap', 
  reason: 'Fokus pada pemulihan kesehatan pasca operasi dan memerlukan waktu istirahat intensif sesuai anjuran dokter (Surat Keterangan Medis terlampir).',

  advisorName: 'DR. I MADE WIRA, S.T., M.T.',
  advisorNIP: '19800101 200501 1 001',
  deanName: 'PROF. DR. IR. NYOMAN GEDE, M.T.',
  deanNIP: '19700505 199503 1 002',
};

// --- 3. KOMPONEN UTAMA ---
export default function CutiKuliahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Cuti...</div>}>
      <LeaveBuilder />
    </Suspense>
  );
}

function LeaveBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<LeaveData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof LeaveData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Surat (Resmi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formulir (Modern)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL LETTER (Standard) ---
      return (
        <div className="font-serif text-[11pt] text-black leading-[1.6]">
           
           {/* HEADER TANGGAL */}
           <div className="flex justify-between items-start mb-8">
              <div>
                 <p>Perihal: <b>Permohonan Cuti Akademik</b></p>
                 <p>Lampiran: 1 (Satu) Berkas</p>
              </div>
              <div className="text-right">
                 <p>{data.city}, {formatDate(data.date)}</p>
              </div>
           </div>

           {/* TUJUAN */}
           <div className="mb-8">
              <p>Yth. <b>Bapak/Ibu Dekan {data.faculty}</b></p>
              <p>{data.university}</p>
              <p>Di Tempat</p>
           </div>

           <div className="space-y-4 text-justify px-1">
              <p>Dengan hormat,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-6 space-y-1">
                 <table className="w-full text-[11pt]">
                    <tbody>
                       <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td className="font-bold uppercase align-top">{data.studentName}</td></tr>
                       <tr><td className="align-top">NIM</td><td className="align-top">:</td><td className="align-top">{data.studentId}</td></tr>
                       <tr><td className="align-top">Prodi / Jurusan</td><td className="align-top">:</td><td className="align-top">{data.department}</td></tr>
                       <tr><td className="align-top">Semester</td><td className="align-top">:</td><td className="align-top">{data.semester}</td></tr>
                       <tr><td className="align-top">IPK Terakhir</td><td className="align-top">:</td><td className="font-bold align-top">{data.ipk}</td></tr>
                       <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                       <tr><td className="align-top">No. HP</td><td className="align-top">:</td><td className="align-top">{data.phone}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>
                 Dengan ini mengajukan permohonan Cuti Akademik selama <b>{data.leaveDuration}</b> pada Semester <b>{data.semesterType}</b> Tahun Akademik <b>{data.academicYear}</b>.
              </p>
              
              <p>Adapun alasan saya mengajukan cuti akademik ini adalah:</p>
              <div className="bg-slate-50/50 p-4 border-l-4 border-slate-400 italic text-justify rounded ml-4">
                 "{data.reason}"
              </div>

              <p>
                 Sebagai bahan pertimbangan, saya lampirkan dokumen pendukung (KRS terakhir, Bukti Pembayaran UKT, dan Surat Keterangan Dokter/Pendukung lainnya). Saya berjanji akan aktif kuliah kembali setelah masa cuti berakhir.
              </p>

              <p className="indent-12">Demikian surat permohonan ini saya sampaikan. Atas perhatian dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
              <table className="w-full table-fixed text-[10pt]">
                 <tbody>
                    <tr className="text-center align-top">
                       <td className="pb-24">Menyetujui,<br/>Dosen Pembimbing Akademik</td>
                       <td className="pb-24">Hormat Saya,<br/>Mahasiswa Pemohon</td>
                    </tr>
                    <tr className="text-center font-bold align-bottom">
                       <td>
                          <p className="underline uppercase">{data.advisorName}</p>
                          <p className="text-[9pt] font-normal">NIP. {data.advisorNIP}</p>
                       </td>
                       <td>
                          <p className="underline uppercase">{data.studentName}</p>
                          <p className="text-[9pt] font-normal">NIM. {data.studentId}</p>
                       </td>
                    </tr>
                    <tr>
                       <td colSpan={2} className="text-center pt-12">
                          <p className="mb-24">Mengetahui,<br/>Dekan {data.faculty}</p>
                          <p className="underline font-bold uppercase">{data.deanName}</p>
                          <p className="text-[9pt]">NIP. {data.deanNIP}</p>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: FORMULIR (Modern) ---
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-snug">
           <div className="text-center border-b-2 border-emerald-500 pb-4 mb-8">
              <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">FORMULIR PERMOHONAN CUTI AKADEMIK</h1>
              <p className="text-sm font-bold text-emerald-600 uppercase mt-1">{data.university}</p>
           </div>

           <div className="space-y-6">
              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-4 tracking-widest">A. Data Mahasiswa</h3>
                 <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm px-2">
                    <div className="space-y-2">
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>NIM</span><span>:</span><span className="font-mono">{data.studentId}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>Fakultas</span><span>:</span><span>{data.faculty}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>Jurusan</span><span>:</span><span>{data.department}</span></div>
                    </div>
                    <div className="space-y-2">
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>Semester</span><span>:</span><span>{data.semester}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>IPK</span><span>:</span><span className="font-bold text-emerald-600">{data.ipk}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>No. HP</span><span>:</span><span>{data.phone}</span></div>
                       <div className="grid grid-cols-[80px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-4 tracking-widest">B. Detail Permohonan</h3>
                 <div className="px-2 space-y-4">
                    <p className="text-sm">Saya mengajukan permohonan cuti akademik pada:</p>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="border border-slate-300 p-3 rounded text-center bg-slate-50">
                          <span className="text-xs text-slate-500 uppercase block font-bold mb-1">Tahun Akademik</span>
                          <span className="font-black text-lg">{data.academicYear}</span>
                       </div>
                       <div className="border border-slate-300 p-3 rounded text-center bg-slate-50">
                          <span className="text-xs text-slate-500 uppercase block font-bold mb-1">Semester</span>
                          <span className="font-black text-lg uppercase">{data.semesterType}</span>
                       </div>
                    </div>
                    
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1 uppercase text-[9pt]">Alasan Pengajuan:</p>
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg italic text-sm text-justify text-slate-700">
                           "{data.reason}"
                        </div>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-4 tracking-widest">C. Pernyataan</h3>
                 <p className="px-2 text-justify text-sm italic text-slate-500 border-l-2 border-slate-300 pl-4">
                    Saya menyatakan bahwa data di atas adalah benar. Saya bersedia menanggung segala konsekuensi akademik akibat cuti ini, termasuk perubahan masa studi saya di Universitas.
                 </p>
              </div>
           </div>

           <div className="mt-12 pt-6 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between text-center text-sm">
                 <div className="w-1/3">
                    <p className="mb-20 font-bold text-slate-500 uppercase text-[9pt]">Menyetujui,<br/>Dosen Wali</p>
                    <p className="font-bold underline uppercase">{data.advisorName}</p>
                    <p className="text-[10px] text-slate-400">NIP. {data.advisorNIP}</p>
                 </div>
                 <div className="w-1/3">
                    <p className="mb-20 font-bold text-slate-500 uppercase text-[9pt]">Mengetahui,<br/>Dekan/Kaprodi</p>
                    <p className="font-bold underline uppercase">{data.deanName}</p>
                    <p className="text-[10px] text-slate-400">NIP. {data.deanNIP}</p>
                 </div>
                 <div className="w-1/3">
                    <p className="mb-20 font-bold text-slate-500 uppercase text-[9pt]">{data.city}, {formatDate(data.date)}<br/>Mahasiswa</p>
                    <p className="font-bold underline uppercase">{data.studentName}</p>
                    <p className="text-[10px] text-slate-400">NIM. {data.studentId}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Cuti Kuliah <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Surat' : 'Format Formulir'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Formulir</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. INSTANSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Kampus</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Universitas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.university} onChange={e => handleDataChange('university', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Fakultas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Prodi/Jurusan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

               {/* 2. MAHASISWA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">IPK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester (cth: 4)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. HP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. DETAIL CUTI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><CalendarClock size={12}/> Detail Cuti</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tahun Akademik</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.academicYear} onChange={e => handleDataChange('academicYear', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester (Ganjil/Genap)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.semesterType} onChange={e => handleDataChange('semesterType', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Durasi Cuti</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.leaveDuration} onChange={e => handleDataChange('leaveDuration', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alasan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                  </div>
               </div>

               {/* 4. PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Dosen & Dekan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Dosen Wali</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.advisorName} onChange={e => handleDataChange('advisorName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Dosen Wali</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.advisorNIP} onChange={e => handleDataChange('advisorNIP', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Dekan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Dekan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deanNIP} onChange={e => handleDataChange('deanNIP', e.target.value)} /></div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
