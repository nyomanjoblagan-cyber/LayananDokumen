'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  User, Users, GraduationCap, Tent, Briefcase, FileWarning, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function PernyataanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Sekolah...</div>}>
      <ParentStatementBuilder />
    </Suspense>
  );
}

function ParentStatementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Surabaya',
    date: new Date().toISOString().split('T')[0],
    
    // ORANG TUA (PIHAK I)
    parentName: 'Bambang Sugiono',
    parentNik: '3578010101750001',
    parentJob: 'Wiraswasta',
    parentAddress: 'Jl. Ahmad Yani No. 88, Surabaya',
    parentPhone: '0811-2345-6789',
    
    // ANAK (PIHAK II)
    childName: 'Aditya Pratama',
    childId: '12345678', // NIS / NIM
    childSchool: 'SMK Negeri 1 Surabaya',
    childClass: 'XI - Teknik Mesin',
    
    // ISI PERNYATAAN
    title: 'SURAT IZIN ORANG TUA',
    context: 'Mengikuti Kegiatan Kunjungan Industri (Study Tour) ke Bali',
    statement: 'Memberikan izin sepenuhnya kepada anak saya tersebut di atas untuk mengikuti kegiatan yang diselenggarakan oleh sekolah pada tanggal 20-23 Juni 2026.',
    disclaimer: 'Saya menyadari segala resiko yang mungkin terjadi dan tidak akan menuntut pihak sekolah apabila terjadi hal-hal di luar kewenangan panitia, selama panitia telah menjalankan tugas sesuai prosedur.'
  });

  // HELPER DATE
  const formatDateIndo = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  // PRESETS
  const applyPreset = (type: 'tour' | 'magang' | 'tatib') => {
    if (type === 'tour') {
      setData(prev => ({
        ...prev,
        title: 'SURAT IZIN ORANG TUA',
        context: 'Mengikuti Kegiatan Study Tour / Camping',
        statement: 'Memberikan izin kepada anak saya untuk mengikuti kegiatan tersebut yang akan dilaksanakan pada tanggal [Isi Tanggal]. Saya bersedia menanggung biaya yang diperlukan.',
        disclaimer: 'Saya tidak akan menuntut pihak sekolah atas kejadian di luar kendali manusia (Force Majeure) selama kegiatan berlangsung.',
      }));
      setTemplateId(1);
    } else if (type === 'magang') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN IZIN KERJA / MAGANG',
        context: 'Melaksanakan Program Magang / Praktik Kerja Lapangan (PKL)',
        statement: 'Menyetujui dan mengizinkan anak saya untuk melaksanakan praktik kerja di perusahaan yang Bapak/Ibu pimpin selama [Durasi] bulan.',
        disclaimer: 'Saya menjamin anak saya akan mematuhi segala peraturan perusahaan dan menjaga nama baik sekolah serta keluarga.',
      }));
      setTemplateId(1);
    } else if (type === 'tatib') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN KESANGGUPAN',
        context: 'Pematuhan Tata Tertib Sekolah & Disiplin Siswa',
        statement: 'Menyatakan bahwa saya selaku orang tua akan membimbing dan mengawasi anak saya agar mematuhi segala tata tertib yang berlaku di sekolah.',
        disclaimer: 'Apabila dikemudian hari anak saya melakukan pelanggaran berat, saya bersedia menerima sanksi akademik sesuai ketentuan sekolah (termasuk dikembalikan kepada orang tua).',
      }));
      setTemplateId(2); // Pakai Materai
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar (Izin)", desc: "Untuk kegiatan sekolah, kemah, atau izin biasa" },
    { id: 2, name: "Format Materai (Pernyataan)", desc: "Untuk tata tertib, pelanggaran, atau magang resmi" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (STABIL) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[25mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* PRINT STYLES - ANTI SCROLLBAR */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[25mm] 
      print:overflow-hidden print:z-[9999]
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT */}
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Pernyataan Orang Tua</h1>
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
          
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Users size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('tour')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Tent size={14}/> Tour/Kemah
                </button>
                <button onClick={() => applyPreset('magang')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Briefcase size={14}/> Izin Magang
                </button>
                <button onClick={() => applyPreset('tatib')} className="bg-white hover:bg-red-100 border border-red-200 text-red-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <FileWarning size={14}/> Tata Tertib
                </button>
             </div>
          </div>

          {/* Data Orang Tua */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Orang Tua / Wali</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP / WA</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentPhone} onChange={e => handleDataChange('parentPhone', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Domisili</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Data Anak */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <GraduationCap size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Anak</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Anak</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIS / NIM</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childId} onChange={e => handleDataChange('childId', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kelas / Jurusan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childClass} onChange={e => handleDataChange('childClass', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Sekolah / Kampus</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Isi Pernyataan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Isi Pernyataan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Surat (Header)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold uppercase" value={data.title} onChange={e => handleDataChange('title', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Konteks / Perihal</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.context} onChange={e => handleDataChange('context', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pernyataan Inti</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Disclaimer (Tanggung Jawab)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.disclaimer} onChange={e => handleDataChange('disclaimer', e.target.value)} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1 & 2 (COMPACT 10.5pt) */}
            <div className="text-[10.5pt] leading-snug">
               
               <div className="text-center mb-10 border-b-4 border-double border-black pb-2">
                  <h1 className="font-black text-xl uppercase tracking-widest underline">{data.title}</h1>
               </div>

               <p className="mb-4 text-justify">Saya yang bertanda tangan di bawah ini:</p>

               {/* DATA ORTU */}
               <div className="ml-4 mb-6">
                  <table className="w-full leading-none">
                     <tbody>
                        <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold uppercase py-0.5">{data.parentName}</td></tr>
                        <tr><td className="py-0.5">NIK (KTP)</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentNik}</td></tr>
                        <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentJob}</td></tr>
                        <tr><td className="py-0.5">No. HP</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentPhone}</td></tr>
                        <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.parentAddress}</td></tr>
                     </tbody>
                  </table>
                  <div className="mt-1 font-bold text-xs italic">Selaku Orang Tua / Wali dari:</div>
               </div>

               {/* DATA ANAK */}
               <div className="ml-4 mb-6">
                  <table className="w-full leading-none">
                     <tbody>
                        <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold uppercase py-0.5">{data.childName}</td></tr>
                        <tr><td className="py-0.5">NIS / NIM</td><td className="py-0.5">:</td><td className="py-0.5">{data.childId}</td></tr>
                        <tr><td className="py-0.5">Kelas / Jurusan</td><td className="py-0.5">:</td><td className="py-0.5">{data.childClass}</td></tr>
                        <tr><td className="py-0.5">Sekolah / Kampus</td><td className="py-0.5">:</td><td className="py-0.5">{data.childSchool}</td></tr>
                     </tbody>
                  </table>
               </div>

               <p className="mb-2 text-justify">
                  Sehubungan dengan <strong>{data.context}</strong>, dengan ini saya menyatakan:
               </p>

               <div className="ml-4 mb-4 p-3 border-l-4 border-slate-300 italic bg-slate-50/50 text-justify">
                  "{data.statement}"
               </div>

               <p className="mb-4 text-justify">
                  Dan selanjutnya saya menyatakan bahwa:
               </p>

               <div className="ml-4 mb-8 text-justify">
                  {data.disclaimer}
               </div>

               <p className="mb-8 text-justify">
                  Demikian surat pernyataan/izin ini saya buat dengan sadar dan tanpa paksaan dari pihak manapun, untuk dipergunakan sebagaimana mestinya.
               </p>

               <div className="text-right mr-10">
                  <p className="mb-2">{data.city}, {formatDateIndo(data.date)}</p>
                  <p className="mb-20">Yang Membuat Pernyataan,</p>
                  
                  {templateId === 2 && (
                     <div className="inline-block border border-slate-300 px-4 py-2 text-[8px] text-slate-400 mb-2 mr-10">
                        MATERAI<br/>10.000
                     </div>
                  )}
                  
                  <p className="font-bold underline uppercase">{data.parentName}</p>
               </div>
            </div>

          </Kertas>

        </div>
      </div>
    </div>
  );
}