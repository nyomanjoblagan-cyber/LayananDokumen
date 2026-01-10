'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarClock, FileText, MapPin, 
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function CutiKuliahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Cuti...</div>}>
      <LeaveBuilder />
    </Suspense>
  );
}

function LeaveBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: new Date().toISOString().split('T')[0],
    
    // INSTANSI
    university: 'UNIVERSITAS UDAYANA (UNUD)',
    faculty: 'Fakultas Teknik',
    department: 'Teknologi Informasi',

    // DATA MAHASISWA
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    semester: '4 (Empat)',
    ipk: '3.75',
    address: 'Jl. Kampus Unud, Jimbaran',
    phone: '081234567890',
    
    // DETAIL CUTI
    leaveDuration: '1 (Satu) Semester',
    academicYear: '2025/2026',
    semesterType: 'Genap', // Ganjil/Genap
    reason: 'Fokus pada pemulihan kesehatan pasca operasi dan memerlukan waktu istirahat intensif sesuai anjuran dokter (Surat Keterangan Medis terlampir).',

    // PENANDATANGAN
    advisorName: 'DR. I MADE WIRA, S.T., M.T.',
    advisorNIP: '19800101 200501 1 001',
    deanName: 'PROF. DR. IR. NYOMAN GEDE, M.T.',
    deanNIP: '19700505 199503 1 002',
  });

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL LETTER (Standard) ---
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           
           {/* HEADER TANGGAL */}
           <div className="flex justify-between items-start mb-8">
              <div>
                 <p>Hal: <b>Permohonan Cuti Akademik</b></p>
                 <p>Lampiran: 1 (Satu) Berkas</p>
              </div>
              <div className="text-right">
                 <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
              </div>
           </div>

           {/* TUJUAN */}
           <div className="mb-8">
              <p>Yth. <b>Bapak/Ibu Dekan {data.faculty}</b></p>
              <p>{data.university}</p>
              <p>Di Tempat</p>
           </div>

           <div className="space-y-4 text-justify flex-grow">
              <p>Dengan hormat,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-1 bg-slate-50 p-3 border border-slate-200 rounded text-[10.5pt]">
                 <table className="w-full">
                    <tbody>
                        <tr><td className="w-36">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                        <tr><td>NIM</td><td>:</td><td>{data.studentId}</td></tr>
                        <tr><td>Prodi / Jurusan</td><td>:</td><td>{data.department}</td></tr>
                        <tr><td>Semester</td><td>:</td><td>{data.semester}</td></tr>
                        <tr><td>IPK Terakhir</td><td>:</td><td>{data.ipk}</td></tr>
                        <tr><td>Alamat</td><td>:</td><td>{data.address}</td></tr>
                        <tr><td>No. HP</td><td>:</td><td>{data.phone}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>
                 Dengan ini mengajukan permohonan Cuti Akademik selama <b>{data.leaveDuration}</b> pada Semester <b>{data.semesterType}</b> Tahun Akademik <b>{data.academicYear}</b>.
              </p>
              
              <p>Adapun alasan saya mengajukan cuti akademik ini adalah:</p>
              <div className="bg-slate-50 p-3 border-l-4 border-blue-400 italic text-[10.5pt] text-justify rounded-r">
                 "{data.reason}"
              </div>

              <p>
                 Sebagai bahan pertimbangan, saya lampirkan dokumen pendukung (KRS terakhir, Bukti Pembayaran UKT, dan Surat Keterangan Dokter/Pendukung lainnya). Saya berjanji akan aktif kuliah kembali setelah masa cuti berakhir.
              </p>

              <p>Demikian surat permohonan ini saya sampaikan. Atas perhatian dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
              <table className="w-full table-fixed text-[10pt]">
                 <tbody>
                    <tr className="text-center">
                       <td className="pb-20">Menyetujui,<br/>Dosen Pembimbing Akademik</td>
                       <td className="pb-20">Hormat Saya,<br/>Mahasiswa Pemohon</td>
                    </tr>
                    <tr className="text-center font-bold">
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
                       <td colSpan={2} className="text-center pt-8">
                          <p className="mb-20">Mengetahui,<br/>Dekan {data.faculty}</p>
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
        <div className="font-sans text-[10.5pt] text-slate-800 leading-snug">
           <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
              <h1 className="text-xl font-black uppercase tracking-tight">FORMULIR PERMOHONAN CUTI AKADEMIK</h1>
              <p className="text-sm font-bold text-slate-500 uppercase">{data.university}</p>
           </div>

           <div className="space-y-6">
              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-2">A. Data Mahasiswa</h3>
                 <div className="grid grid-cols-2 gap-4 text-sm px-2">
                    <div className="space-y-2">
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>Fakultas</span><span>:</span><span>{data.faculty}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>Jurusan</span><span>:</span><span>{data.department}</span></div>
                    </div>
                    <div className="space-y-2">
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>Semester</span><span>:</span><span>{data.semester}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>IPK</span><span>:</span><span>{data.ipk}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>No. HP</span><span>:</span><span>{data.phone}</span></div>
                       <div className="grid grid-cols-[100px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-2">B. Detail Permohonan</h3>
                 <div className="px-2 space-y-3">
                    <p className="text-sm">Saya mengajukan permohonan cuti akademik pada:</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="border p-2 rounded text-center bg-slate-50">
                          <span className="text-xs text-slate-500 uppercase block">Tahun Akademik</span>
                          <span className="font-bold">{data.academicYear}</span>
                       </div>
                       <div className="border p-2 rounded text-center bg-slate-50">
                          <span className="text-xs text-slate-500 uppercase block">Semester</span>
                          <span className="font-bold uppercase">{data.semesterType}</span>
                       </div>
                    </div>
                    <p className="text-sm mt-2">Alasan Pengajuan:</p>
                    <div className="border border-slate-300 p-3 rounded min-h-[80px] italic text-sm text-justify">
                       {data.reason}
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-xs font-black uppercase bg-slate-100 p-2 border-l-4 border-slate-900 mb-2">C. Pernyataan</h3>
                 <p className="px-2 text-justify text-sm italic">
                    Saya menyatakan bahwa data di atas adalah benar. Saya bersedia menanggung segala konsekuensi akademik akibat cuti ini, termasuk perubahan masa studi.
                 </p>
              </div>
           </div>

           <div className="mt-8 pt-4 border-t border-slate-900" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between text-center text-sm">
                 <div className="w-1/3">
                    <p className="mb-16 font-bold">Menyetujui,<br/>Dosen Wali</p>
                    <p className="font-bold underline uppercase">{data.advisorName}</p>
                    <p className="text-xs">NIP. {data.advisorNIP}</p>
                 </div>
                 <div className="w-1/3">
                    <p className="mb-16 font-bold">Mengetahui,<br/>Dekan/Kaprodi</p>
                    <p className="font-bold underline uppercase">{data.deanName}</p>
                    <p className="text-xs">NIP. {data.deanNIP}</p>
                 </div>
                 <div className="w-1/3">
                    <p className="mb-16 font-bold">{data.city}, {new Date(data.date).toLocaleDateString('id-ID')}<br/>Mahasiswa</p>
                    <p className="font-bold underline uppercase">{data.studentName}</p>
                    <p className="text-xs">NIM. {data.studentId}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } 
          .print-table tfoot { height: 20mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
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
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Surat' : 'Format Formulir'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Surat</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Formulir</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* INSTANSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Kampus</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Universitas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.university} onChange={e => handleDataChange('university', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Fakultas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Prodi/Jurusan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* MAHASISWA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">IPK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester (cth: 4)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. HP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* CUTI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><CalendarClock size={12}/> Detail Cuti</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tahun Akademik</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.academicYear} onChange={e => handleDataChange('academicYear', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester (Ganjil/Genap)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.semesterType} onChange={e => handleDataChange('semesterType', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Durasi Cuti</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.leaveDuration} onChange={e => handleDataChange('leaveDuration', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alasan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                  </div>
               </div>

               {/* PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Dosen & Dekan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Dosen Wali</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.advisorName} onChange={e => handleDataChange('advisorName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Dosen Wali</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.advisorNIP} onChange={e => handleDataChange('advisorNIP', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Dekan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Dekan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deanNIP} onChange={e => handleDataChange('deanNIP', e.target.value)} /></div>
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
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}