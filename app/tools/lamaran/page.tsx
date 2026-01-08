'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, FileText, Sparkles, Mail, Phone, MapPin, 
  ChevronDown, Check, GraduationCap, Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function CoverLetterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <CoverLetterBuilder />
    </Suspense>
  );
}

function CoverLetterBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // PELAMAR
    senderName: 'ANDI PRATAMA, S.Kom',
    senderPhone: '0812-3456-7890',
    senderEmail: 'andi.pratama@email.com',
    senderAddress: 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan',
    
    // TUJUAN
    receiverName: 'Bapak/Ibu HRD Manager',
    receiverCompany: 'PT. TEKNOLOGI NUSANTARA',
    receiverAddress: 'Gedung Cyber Lt. 5, Jl. Rasuna Said, Jakarta',
    
    // POSISI
    position: 'Digital Marketing Specialist',
    
    // ISI SURAT
    opening: 'Berdasarkan informasi lowongan pekerjaan yang saya dapatkan di LinkedIn, saya bermaksud untuk melamar pekerjaan sebagai Digital Marketing Specialist di perusahaan yang Bapak/Ibu pimpin.',
    
    body: 'Saya adalah lulusan S1 Ilmu Komunikasi dengan pengalaman kerja selama 2 tahun di bidang pemasaran digital. Saya memiliki keahlian dalam mengelola media sosial, SEO, dan iklan berbayar (Facebook/Google Ads). Di perusahaan sebelumnya, saya berhasil meningkatkan engagement rate sebesar 30% dalam waktu 6 bulan.\n\nSaya adalah pribadi yang disiplin, kreatif, dan mampu bekerja dalam tim maupun individu. Saya sangat antusias untuk dapat berkontribusi bagi kemajuan PT. Teknologi Nusantara.',
    
    closing: 'Bersama surat ini saya lampirkan Curriculum Vitae (CV) dan dokumen pendukung lainnya sebagai bahan pertimbangan. Saya sangat berharap dapat diberikan kesempatan wawancara untuk menjelaskan potensi diri saya lebih rinci.\n\nAtas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.',
  });

  // --- LOGIC AUTO TEXT ---
  const applyTextPreset = (type: 'fresh' | 'pro' | 'intern') => {
    if (type === 'fresh') {
      setData(prev => ({
        ...prev,
        opening: `Berdasarkan informasi yang saya peroleh, ${prev.receiverCompany} sedang membuka lowongan pekerjaan. Melalui surat ini, saya bermaksud melamar sebagai ${prev.position}.`,
        body: `Saya adalah lulusan baru (Fresh Graduate) dari Universitas Indonesia jurusan Manajemen. Selama kuliah, saya aktif dalam organisasi himpunan mahasiswa dan memiliki pengalaman magang di perusahaan startup.\n\nMeskipun saya lulusan baru, saya memiliki semangat belajar yang tinggi, cepat beradaptasi, dan siap bekerja keras. Saya yakin bekal ilmu yang saya miliki dapat memberikan kontribusi positif bagi perusahaan.`,
        closing: `Sebagai bahan pertimbangan, saya lampirkan CV dan dokumen pendukung. Besar harapan saya untuk dapat mengikuti tahap seleksi selanjutnya.\n\nAtas perhatian Bapak/Ibu, saya ucapkan terima kasih.`
      }));
    } else if (type === 'pro') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat,\n\nSehubungan dengan informasi lowongan kerja sebagai ${prev.position} di ${prev.receiverCompany}, saya mengajukan diri untuk mengisi posisi tersebut.`,
        body: `Saya memiliki pengalaman profesional selama 5 tahun di bidang terkait. Saya terbiasa memimpin tim, menyusun strategi, dan mencapai target perusahaan. Keahlian utama saya meliputi manajemen proyek, analisis data, dan negosiasi.\n\nSaya mencari tantangan baru di mana saya dapat menerapkan pengalaman saya untuk mendorong pertumbuhan bisnis perusahaan Bapak/Ibu.`,
        closing: `Saya telah melampirkan resume lengkap yang merinci riwayat karir saya. Saya menantikan kesempatan untuk berdiskusi tentang bagaimana saya dapat memberikan nilai tambah bagi ${prev.receiverCompany}.\n\nTerima kasih atas waktu dan pertimbangan Bapak/Ibu.`
      }));
    } else if (type === 'intern') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, mahasiswa semester akhir jurusan Teknik Informatika, bermaksud mengajukan permohonan Magang / Internship sebagai ${prev.position}.`,
        body: `Saya memiliki ketertarikan besar pada industri ini dan ingin mempraktikkan ilmu yang telah saya pelajari di bangku kuliah. Saya menguasai dasar-dasar pemrograman dan desain grafis, serta memiliki etos kerja yang baik.\n\nSaya bersedia mengikuti segala peraturan dan ketentuan magang yang berlaku di ${prev.receiverCompany} untuk menimba ilmu dan pengalaman.`,
        closing: `Besar harapan saya agar permohonan magang ini dapat diterima. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.`
      }));
    }
  };

  // HANDLERS
  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Resmi (Formal)", desc: "Format standar Indonesia (Perihal, Yth...)" },
    { id: 2, name: "Modern Letter", desc: "Header tebal, tanpa 'Perihal', langsung to-the-point" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (STABIL A4) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-xl 
      p-[25mm] mx-auto 
      text-black
      relative box-border mb-10

      /* TAMPILAN PRINT (FIXED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 
      print:p-[25mm]
      print:overflow-hidden
      print:z-[9999]
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS KHUSUS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white; }
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Lamaran Kerja</h1>
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
                <Sparkles size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Auto-Text)</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyTextPreset('fresh')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <GraduationCap size={14}/> Fresh Grad
                </button>
                <button onClick={() => applyTextPreset('pro')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Briefcase size={14}/> Pro
                </button>
                <button onClick={() => applyTextPreset('intern')} className="bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <User size={14}/> Magang
                </button>
             </div>
          </div>

          {/* Data Pelamar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Pelamar</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP / WA</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.senderPhone} onChange={e => handleDataChange('senderPhone', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.senderEmail} onChange={e => handleDataChange('senderEmail', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.senderAddress} onChange={e => handleDataChange('senderAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Tujuan & Posisi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Tujuan & Posisi</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota & Tanggal</label>
                      <div className="flex gap-1">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                         <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Melamar Sebagai</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.position} onChange={e => handleDataChange('position', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penerima (Yth.)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Yth. Bapak/Ibu HRD..." value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan Tujuan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan (Opsional)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Isi Surat */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileText size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Isi Surat</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pembuka (Alasan Melamar)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Isi Utama (Promosi Diri)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-32 resize-none" value={data.body} onChange={e => handleDataChange('body', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penutup (Harapan)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <div className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] flex flex-col text-[#1e293b] box-border relative transition-all">
            
            {/* TEMPLATE 1: FORMAL INDONESIA */}
            {templateId === 1 && (
              <Kertas className="font-serif text-[12pt] leading-relaxed">
                 {/* Tanggal */}
                 <div className="text-right mb-8">
                    {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                 </div>

                 {/* Tujuan */}
                 <div className="mb-8">
                    <div className="mb-4">
                       <div className="flex"><span className="w-24">Perihal</span><span>: Lamaran Pekerjaan</span></div>
                       <div className="flex"><span className="w-24">Lampiran</span><span>: 1 (Satu) Berkas</span></div>
                    </div>
                    
                    <div>
                       Kepada Yth,<br/>
                       <strong>{data.receiverName}</strong><br/>
                       {data.receiverCompany}<br/>
                       <span className="text-slate-600">{data.receiverAddress}</span>
                    </div>
                 </div>

                 {/* Isi */}
                 <div className="mb-4">
                    Dengan hormat,
                 </div>

                 <div className="mb-4 whitespace-pre-line text-justify">
                    {data.opening}
                 </div>

                 <div className="mb-4 whitespace-pre-line text-justify">
                    {data.body}
                 </div>

                 <div className="mb-8 whitespace-pre-line text-justify">
                    {data.closing}
                 </div>

                 {/* TTD */}
                 <div className="mt-auto">
                    <p className="mb-24">Hormat saya,</p>
                    <p className="font-bold underline uppercase">{data.senderName}</p>
                 </div>
              </Kertas>
            )}

            {/* TEMPLATE 2: MODERN CREATIVE */}
            {templateId === 2 && (
              <Kertas className="font-sans text-[10pt] leading-relaxed">
                 {/* Modern Header */}
                 <div className="border-b-4 border-slate-800 pb-6 mb-10 flex justify-between items-end">
                    <div>
                       {/* DIUBAH: text-3xl jadi text-2xl */}
                       <h1 className="text-2xl font-black uppercase tracking-wide text-slate-800 mb-1">{data.senderName}</h1>
                       <div className="text-sm font-bold text-blue-600 uppercase tracking-widest">{data.position}</div>
                    </div>
                    <div className="text-right text-xs text-slate-500 space-y-1">
                       <div className="flex justify-end items-center gap-2"><Phone size={12}/> {data.senderPhone}</div>
                       <div className="flex justify-end items-center gap-2"><Mail size={12}/> {data.senderEmail}</div>
                       <div className="flex justify-end items-center gap-2 text-right w-64"><MapPin size={12} className="shrink-0"/> {data.senderAddress}</div>
                    </div>
                 </div>

                 <div className="mb-10">
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</div>
                    <div className="font-bold text-lg">{data.receiverName}</div>
                    <div className="font-bold text-slate-600">{data.receiverCompany}</div>
                    <div className="text-slate-500 text-xs w-2/3">{data.receiverAddress}</div>
                 </div>

                 <div className="space-y-6 text-justify text-slate-700 text-sm">
                    <div className="font-bold text-slate-800">Dengan hormat,</div>
                    <div className="whitespace-pre-line">{data.opening}</div>
                    <div className="whitespace-pre-line pl-4 border-l-2 border-slate-200 italic text-slate-600">{data.body}</div>
                    <div className="whitespace-pre-line">{data.closing}</div>
                 </div>

                 <div className="mt-16">
                    <div className="font-serif italic text-xl text-slate-500 mb-2">Hormat Saya,</div>
                    <div className="font-bold text-lg text-slate-800 uppercase">{data.senderName}</div>
                 </div>
                 
                 {/* Footer Decoration */}
                 <div className="absolute bottom-10 left-0 w-full text-center">
                    <div className="border-t border-slate-100 w-2/3 mx-auto pt-4 text-[9px] text-slate-400 uppercase tracking-widest">
                       Application for {data.position} at {data.receiverCompany}
                    </div>
                 </div>
              </Kertas>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}