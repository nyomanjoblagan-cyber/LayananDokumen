'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, 
  LayoutTemplate, GraduationCap, Building2, 
  Briefcase, User, Eye, Edit3
} from 'lucide-react';
import Link from 'next/link';

export default function MagangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
      <InternshipBuilder />
    </Suspense>
  );
}

function InternshipBuilder() {
  // --- STATE VIEW (KHUSUS MOBILE) ---
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // --- STATE DATA ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    hrdName: 'HRD Manager',
    companyName: 'PT. Teknologi Masa Depan',
    companyAddress: 'Jl. Sudirman Kav. 50, Jakarta Selatan',
    name: 'Rian Pratama',
    idNumber: '2110114005', 
    institution: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    semester: '6 (Enam)',
    phone: '0812-3456-7890',
    email: 'rian.pratama@email.com',
    address: 'Jl. Margonda Raya No. 100, Depok',
    subject: 'Permohonan Kerja Praktik (KP)',
    position: 'IT Support / Web Developer',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    duration: '3 (Tiga) Bulan',
    skills: 'HTML, CSS, JavaScript (React.js), dan Basic SQL Database.',
    reason: 'Saya ingin menerapkan ilmu yang telah saya pelajari di bangku kuliah ke dalam dunia kerja nyata.'
  });

  const formatDateIndo = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const applyPreset = (type: 'kuliah' | 'smk' | 'fresh') => {
    if (type === 'kuliah') {
      setData(prev => ({
        ...prev, subject: 'Permohonan Kerja Praktik (KP)', institution: 'Universitas Gadjah Mada', major: 'Manajemen', idNumber: '19/123456/EK/12345', semester: '6 (Enam)', position: 'Marketing Intern', skills: 'Digital Marketing, SEO Basic, Copywriting.', reason: 'Untuk memenuhi syarat kelulusan mata kuliah Kerja Praktik.'
      }));
    } else if (type === 'smk') {
      setData(prev => ({
        ...prev, subject: 'Permohonan PKL', institution: 'SMK Negeri 1 Surabaya', major: 'Teknik Mesin', idNumber: '12345678', semester: '4 (Empat)', position: 'Mekanik Magang', skills: 'Service Rutin, Ganti Oli, Tune Up.', reason: 'Sebagai syarat wajib kurikulum sekolah kejuruan (PKL).'
      }));
    } else if (type === 'fresh') {
      setData(prev => ({
        ...prev, subject: 'Lamaran Magang (Internship)', institution: 'Lulusan UB', major: 'Ilmu Komunikasi', idNumber: '-', semester: 'Alumni 2025', position: 'PR Intern', skills: 'Public Speaking, Social Media.', reason: 'Mencari pengalaman kerja profesional.'
      }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Formal (Kampus/SMK)", desc: "Format standar KP/PKL" },
    { id: 2, name: "Profesional (Fresh)", desc: "Menonjolkan skill" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS ---
  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-xl 
      p-[25mm] mx-auto 
      text-black font-serif
      relative box-border mb-10

      /* TAMPILAN PRINT (RESET) */
      print:w-full print:h-auto 
      print:shadow-none print:m-0 
      print:p-[20mm]
      print:static
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white pb-24 lg:pb-0">
      
      {/* GLOBAL CSS PRINT - ISOLASI TOTAL */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          /* 1. SEMBUNYIKAN SEMUA elemen dengan class 'no-print' */
          .no-print { 
            display: none !important; 
            height: 0 !important; 
            width: 0 !important; 
            opacity: 0 !important; 
            overflow: hidden !important;
          }

          /* 2. RESET Container Utama agar tidak flex/grid */
          body, html, #__next, .main-layout {
            background: white !important;
            height: auto !important;
            overflow: visible !important;
            display: block !important;
          }

          /* 3. PAKSA TAMPILKAN hanya area dengan ID 'print-area' */
          #print-area {
            display: block !important;
            visibility: visible !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            z-index: 9999 !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Fix warna text */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER (NO PRINT) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Permohonan Magang</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative hidden md:block">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span>{activeTemplateName}</span>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="main-layout max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT (NO PRINT) --- */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 ${mobileTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          
          <div className="lg:hidden bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-xs flex items-start gap-2 mb-4">
             <Edit3 size={16} className="mt-0.5 shrink-0"/>
             <div><strong>Mode Edit:</strong> Isi data di sini. Klik "Lihat Surat" di bawah untuk preview.</div>
          </div>

          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <GraduationCap size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Preset)</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('kuliah')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1"><GraduationCap size={14}/> Mahasiswa</button>
                <button onClick={() => applyPreset('smk')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1"><Briefcase size={14}/> SMK</button>
                <button onClick={() => applyPreset('fresh')} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1"><User size={14}/> Fresh Grad</button>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Tujuan</div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Yth (HRD/Pimpinan)</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.hrdName} onChange={e => handleDataChange('hrdName', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Nama Perusahaan</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Alamat</label><textarea className="w-full p-2 border rounded text-xs h-16" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} /></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Data Diri</div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Nama Lengkap</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
             <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Institusi</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Jurusan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.major} onChange={e => handleDataChange('major', e.target.value)} /></div>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase text-slate-500">NIM/NIS</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.idNumber} onChange={e => handleDataChange('idNumber', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Semester</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase text-slate-500">No. HP</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Email</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.email} onChange={e => handleDataChange('email', e.target.value)} /></div>
             </div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Alamat Rumah</label><textarea className="w-full p-2 border rounded text-xs h-12" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Detail</div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Perihal</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.subject} onChange={e => handleDataChange('subject', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Posisi</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} /></div>
             <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Mulai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Selesai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
             </div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Durasi (Teks)</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Skill</label><textarea className="w-full p-2 border rounded text-xs h-16" value={data.skills} onChange={e => handleDataChange('skills', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold uppercase text-slate-500">Alasan</label><textarea className="w-full p-2 border rounded text-xs h-20" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
             <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Kota</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold uppercase text-slate-500">Tanggal Surat</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
             </div>
          </div>
        </div>

        {/* --- RIGHT PREVIEW (ID PRINT-AREA) --- */}
        <div 
          id="print-area"
          className={`flex-1 h-full bg-slate-200/50 lg:rounded-xl flex justify-center p-4 lg:p-8 overflow-y-auto ${mobileTab === 'preview' ? 'block' : 'hidden lg:flex'}`}
        >
          
          <Kertas>
            {/* SURAT CONTENT */}
            <div className="text-[10.5pt] leading-snug">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <div className="mb-1">Perihal : <strong>{data.subject}</strong></div>
                     <div>Lampiran : 1 (Satu) Berkas</div>
                  </div>
                  <div className="text-right">{data.city}, {formatDateIndo(data.date)}</div>
               </div>

               <div className="mb-6">
                  <div>Yth. {data.hrdName}</div>
                  <div className="font-bold">{data.companyName}</div>
                  <div className="w-64 leading-tight">{data.companyAddress}</div>
               </div>

               <p className="mb-2">Dengan hormat,</p>
               <p className="mb-2 text-justify">Sehubungan dengan informasi program magang / kerja praktik yang tersedia di perusahaan Bapak/Ibu, saya yang bertanda tangan di bawah ini mengajukan permohonan untuk menempati posisi sebagai <strong>{data.position}</strong>.</p>
               <p className="mb-2 text-justify">Berikut adalah data diri saya:</p>

               <div className="ml-4 mb-4">
                  <table className="w-full leading-none">
                     <tbody>
                        <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold uppercase py-0.5">{data.name}</td></tr>
                        <tr><td className="py-0.5">Asal Institusi</td><td className="py-0.5">:</td><td className="py-0.5">{data.institution}</td></tr>
                        <tr><td className="py-0.5">Jurusan</td><td className="py-0.5">:</td><td className="py-0.5">{data.major}</td></tr>
                        <tr><td className="py-0.5">NIM/NIS</td><td className="py-0.5">:</td><td className="py-0.5">{data.idNumber}</td></tr>
                        <tr><td className="py-0.5">Semester</td><td className="py-0.5">:</td><td className="py-0.5">{data.semester}</td></tr>
                        <tr><td className="py-0.5">No. HP/WA</td><td className="py-0.5">:</td><td className="py-0.5">{data.phone}</td></tr>
                        <tr><td className="py-0.5">Email</td><td className="py-0.5">:</td><td className="py-0.5">{data.email}</td></tr>
                        <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                     </tbody>
                  </table>
               </div>

               <p className="mb-2 text-justify">Adapun waktu pelaksanaan magang yang saya ajukan adalah selama <strong>{data.duration}</strong>, terhitung mulai tanggal <strong>{formatDateIndo(data.startDate)}</strong> sampai dengan <strong>{formatDateIndo(data.endDate)}</strong> (atau menyesuaikan kebijakan perusahaan).</p>
               <p className="mb-2 text-justify">{data.reason} Saat ini saya memiliki kemampuan/skill di bidang: <strong>{data.skills}</strong> yang saya harap dapat berkontribusi bagi perusahaan.</p>
               <p className="mb-2 text-justify">Sebagai bahan pertimbangan, bersama surat ini saya lampirkan dokumen pendukung sebagai berikut:</p>
               <div className="ml-4 mb-6 text-sm">
                  <ol className="list-decimal ml-4 space-y-0.5">
                     <li>Curriculum Vitae (CV) Terbaru</li>
                     <li>Proposal Permohonan Magang</li>
                     <li>Transkrip Nilai Terakhir</li>
                     <li>Fotokopi Kartu Tanda Mahasiswa/Pelajar</li>
                     <li>Pas Foto Terbaru</li>
                  </ol>
               </div>
               <p className="mb-8 text-justify">Demikian surat permohonan ini saya buat. Besar harapan saya untuk dapat diterima dan belajar di perusahaan yang Bapak/Ibu pimpin. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.</p>
               <div className="text-right mr-10">
                  <p className="mb-20">Hormat saya,</p>
                  <p className="font-bold underline uppercase">{data.name}</p>
                  <p className="text-xs">{data.idNumber !== '-' ? `NIM/NIS. ${data.idNumber}` : ''}</p>
               </div>
            </div>
          </Kertas>
        </div>

      </div>

      {/* --- MOBILE NAV (NO PRINT) --- */}
      <div className="no-print lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
         <div className="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-slate-700 flex items-center gap-1">
            <button 
               onClick={() => setMobileTab('form')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${mobileTab === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
               <Edit3 size={16}/> Isi Data
            </button>
            <button 
               onClick={() => setMobileTab('preview')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${mobileTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
            >
               <Eye size={16}/> Lihat Surat
            </button>
         </div>
      </div>

    </div>
  );
}