'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, LayoutTemplate, Plus, Trash2,
  User, Briefcase, GraduationCap, Mail, Phone, MapPin, Linkedin, Globe, Sparkles, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function CVMakerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Studio CV...</div>}>
      <CVToolBuilder />
    </Suspense>
  );
}

function CVToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    // PERSONAL
    fullName: 'ANDI PRATAMA, S.Kom',
    jobTitle: 'Senior Digital Marketer',
    summary: 'Profesional pemasaran digital dengan pengalaman 5 tahun dalam mengelola kampanye iklan, SEO, dan media sosial. Memiliki rekam jejak terbukti dalam meningkatkan konversi penjualan hingga 150%. Terbiasa bekerja dengan data dan tools analitik.',
    email: 'andi.pratama@email.com',
    phone: '0812-3456-7890',
    location: 'Jakarta Selatan, Indonesia',
    linkedin: 'linkedin.com/in/andipratama',
    website: 'andipratama.com',

    // EXPERIENCE
    experience: [
      {
        id: 1,
        role: 'Digital Marketing Manager',
        company: 'PT. Teknologi Nusantara',
        date: 'Jan 2023 - Sekarang',
        desc: '• Memimpin tim pemasaran beranggotakan 5 orang.\n• Mengelola budget iklan Rp 500jt/bulan dengan ROI positif.\n• Meningkatkan traffic website organik sebesar 200% dalam 1 tahun.'
      },
      {
        id: 2,
        role: 'SEO Specialist',
        company: 'Startup Maju Jalan',
        date: 'Jun 2020 - Des 2022',
        desc: '• Melakukan audit SEO teknis dan optimasi konten.\n• Berhasil menempatkan 50+ keyword di halaman 1 Google.\n• Bekerjasama dengan tim developer untuk optimasi kecepatan web.'
      }
    ],

    // EDUCATION
    education: [
      {
        id: 1,
        degree: 'S1 Sistem Informasi',
        school: 'Universitas Indonesia',
        date: '2016 - 2020',
        note: 'IPK: 3.85 / 4.00 (Cum Laude)'
      }
    ],

    // SKILLS (Array of strings)
    skills: ['SEO / SEM', 'Google Analytics', 'Copywriting', 'Facebook Ads', 'Team Leadership', 'Data Analysis'],
    
    // LANGUAGES
    languages: ['Bahasa Indonesia (Native)', 'English (Professional)']
  });

  // --- HANDLERS ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handlePersonalChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  // GENERIC LIST HANDLERS (EXP & EDU) - FIXED TYPESCRIPT ERROR
  const addItem = (section: 'experience' | 'education') => {
    const newId = Date.now();
    if (section === 'experience') {
      setData({ ...data, experience: [...data.experience, { id: newId, role: '', company: '', date: '', desc: '' }] });
    } else {
      setData({ ...data, education: [...data.education, { id: newId, degree: '', school: '', date: '', note: '' }] });
    }
  };

  const removeItem = (section: 'experience' | 'education', idx: number) => {
    if (section === 'experience') {
        const newItems = [...data.experience];
        newItems.splice(idx, 1);
        setData({ ...data, experience: newItems });
    } else {
        const newItems = [...data.education];
        newItems.splice(idx, 1);
        setData({ ...data, education: newItems });
    }
  };

  const updateItem = (section: 'experience' | 'education', idx: number, field: string, val: string) => {
    if (section === 'experience') {
        const newItems = [...data.experience];
        // Menggunakan (as any) untuk mengatasi error index signature 'string'
        (newItems[idx] as any)[field] = val;
        setData({ ...data, experience: newItems });
    } else {
        const newItems = [...data.education];
        (newItems[idx] as any)[field] = val;
        setData({ ...data, education: newItems });
    }
  };

  // SKILL HANDLER (COMMA SEPARATED)
  const handleSkillsChange = (val: string) => {
    setData({ ...data, skills: val.split(',').map(s => s.trim()) });
  };
  const handleLangsChange = (val: string) => {
    setData({ ...data, languages: val.split(',').map(s => s.trim()) });
  };

  const TEMPLATES = [
    { id: 1, name: "ATS Friendly (Clean)", desc: "Minimalis, mudah dibaca sistem HRD" },
    { id: 2, name: "Modern Sidebar (Visual)", desc: "Tampilan kreatif dengan foto & aksen" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN DOKUMEN (Digunakan untuk Preview & Print) ---
  const DocumentContent = (
    <div className={`
      w-[210mm] min-h-[296mm] /* A4 Size Fix */
      bg-white shadow-2xl print:shadow-none 
      text-[#1e293b] box-border relative 
      mx-auto overflow-hidden
      print:m-0 print:p-0
    `}>
        
        {/* TEMPLATE 1: ATS FRIENDLY (CLEAN & SIMPLE) */}
        {templateId === 1 && (
          <div className="p-[20mm]">
             {/* Header */}
             <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{data.fullName}</h1>
                <div className="text-lg text-slate-600 font-medium mb-2">{data.jobTitle}</div>
                <div className="flex justify-center gap-4 text-xs text-slate-500 flex-wrap">
                   {data.email && <div className="flex items-center gap-1"><Mail size={12}/> {data.email}</div>}
                   {data.phone && <div className="flex items-center gap-1"><Phone size={12}/> {data.phone}</div>}
                   {data.location && <div className="flex items-center gap-1"><MapPin size={12}/> {data.location}</div>}
                   {data.linkedin && <div className="flex items-center gap-1"><Linkedin size={12}/> {data.linkedin}</div>}
                </div>
             </div>

             {/* Summary */}
             <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 pb-1 tracking-wider">Professional Summary</h2>
                <p className="text-sm text-justify leading-relaxed">{data.summary}</p>
             </div>

             {/* Experience */}
             <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider">Work Experience</h2>
                <div className="space-y-4">
                   {data.experience.map(exp => (
                      <div key={exp.id}>
                         <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-sm">{exp.role}</h3>
                            <span className="text-xs font-medium text-slate-500">{exp.date}</span>
                         </div>
                         <div className="text-xs font-semibold text-slate-600 mb-1">{exp.company}</div>
                         <div className="text-sm whitespace-pre-line leading-relaxed pl-3 border-l-2 border-slate-100">{exp.desc}</div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Education */}
             <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider">Education</h2>
                <div className="space-y-3">
                   {data.education.map(edu => (
                      <div key={edu.id}>
                         <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-sm">{edu.school}</h3>
                            <span className="text-xs font-medium text-slate-500">{edu.date}</span>
                         </div>
                         <div className="text-sm text-slate-700">{edu.degree}</div>
                         {edu.note && <div className="text-xs text-slate-500 italic">{edu.note}</div>}
                      </div>
                   ))}
                </div>
             </div>

             {/* Skills */}
             <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 pb-1 tracking-wider">Skills & Languages</h2>
                <div className="text-sm">
                   <div className="mb-2"><span className="font-bold">Hard Skills:</span> {data.skills.join(', ')}</div>
                   <div><span className="font-bold">Languages:</span> {data.languages.join(', ')}</div>
                </div>
             </div>
          </div>
        )}

        {/* TEMPLATE 2: MODERN SIDEBAR (VISUAL) */}
        {templateId === 2 && (
          <div className="flex h-full min-h-[296mm]">
             {/* Sidebar Kiri */}
             <div className="w-[35%] bg-slate-900 print:bg-slate-900 text-white p-8 print:p-6">
                <div className="flex flex-col items-center text-center mb-8">
                   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 mb-4 bg-slate-800 print:bg-slate-800">
                      {photo ? <img src={photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-500"><User size={48}/></div>}
                   </div>
                   <h1 className="text-xl font-bold uppercase tracking-wide mb-1 text-white">{data.fullName}</h1>
                   <div className="text-xs text-blue-300 font-medium">{data.jobTitle}</div>
                </div>

                <div className="space-y-6 text-xs text-slate-300">
                   <div>
                      <h3 className="text-white font-bold uppercase border-b border-slate-700 pb-2 mb-3">Contact</h3>
                      <div className="space-y-2">
                         {data.email && <div className="flex items-center gap-2"><Mail size={12}/> {data.email}</div>}
                         {data.phone && <div className="flex items-center gap-2"><Phone size={12}/> {data.phone}</div>}
                         {data.location && <div className="flex items-center gap-2"><MapPin size={12}/> {data.location}</div>}
                         {data.linkedin && <div className="flex items-center gap-2"><Linkedin size={12}/> {data.linkedin.replace('https://','')}</div>}
                         {data.website && <div className="flex items-center gap-2"><Globe size={12}/> {data.website.replace('https://','')}</div>}
                      </div>
                   </div>

                   <div>
                      <h3 className="text-white font-bold uppercase border-b border-slate-700 pb-2 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2 text-white">
                         {data.skills.map((skill, idx) => (
                            <span key={idx} className="bg-slate-800 print:bg-slate-800 border border-slate-700 px-2 py-1 rounded text-[10px]">{skill}</span>
                         ))}
                      </div>
                   </div>

                   <div>
                      <h3 className="text-white font-bold uppercase border-b border-slate-700 pb-2 mb-3">Languages</h3>
                      <ul className="space-y-1">
                         {data.languages.map((lang, idx) => (
                            <li key={idx}>• {lang}</li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>

             {/* Main Content Kanan */}
             <div className="w-[65%] p-8 bg-white text-slate-800">
                {/* Summary */}
                <div className="mb-8">
                   <h2 className="text-lg font-bold uppercase text-blue-800 border-b-2 border-blue-100 mb-3 pb-1">Profile</h2>
                   <p className="text-sm text-justify leading-relaxed text-slate-600">{data.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                   <h2 className="text-lg font-bold uppercase text-blue-800 border-b-2 border-blue-100 mb-4 pb-1">Experience</h2>
                   <div className="space-y-5">
                      {data.experience.map(exp => (
                         <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 print:bg-blue-500"></div>
                            <h3 className="font-bold text-sm text-slate-900">{exp.role}</h3>
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                               <span className="font-semibold text-blue-600">{exp.company}</span>
                               <span>{exp.date}</span>
                            </div>
                            <div className="text-xs whitespace-pre-line leading-relaxed text-slate-600">{exp.desc}</div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Education */}
                <div>
                   <h2 className="text-lg font-bold uppercase text-blue-800 border-b-2 border-blue-100 mb-4 pb-1">Education</h2>
                   <div className="space-y-4">
                      {data.education.map(edu => (
                         <div key={edu.id} className="bg-slate-50 print:bg-slate-50 p-3 rounded border-l-4 border-blue-500 print:border-blue-500">
                            <h3 className="font-bold text-sm text-slate-900">{edu.school}</h3>
                            <div className="text-xs text-slate-600 mb-1">{edu.degree}</div>
                            <div className="flex justify-between text-[10px] text-slate-500">
                               <span>{edu.date}</span>
                               <span>{edu.note}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg print:hidden sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">CV Maker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
          
          {/* Foto & Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Profil Diri</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden relative group" onClick={() => fileInputRef.current?.click()}>
                      {photo ? <img src={photo} className="w-full h-full object-cover" /> : <Upload size={20} className="text-slate-300" />}
                      {photo && <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} className="text-white" onClick={(e) => { e.stopPropagation(); setPhoto(null); }} /></div>}
                   </div>
                   <div className="flex-1">
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Foto</button>
                      <div className="text-[10px] text-slate-400 mt-1">Disarankan rasio 1:1 (Kotak/Bulat)</div>
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.fullName} onChange={e => handlePersonalChange('fullName', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Profesi (Job Title)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" value={data.jobTitle} onChange={e => handlePersonalChange('jobTitle', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Ringkasan Profesional (Summary)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.summary} onChange={e => handlePersonalChange('summary', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Kontak */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Phone size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Kontak & Sosmed</h3>
             </div>
             <div className="p-4 grid grid-cols-2 gap-3">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.email} onChange={e => handlePersonalChange('email', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.phone} onChange={e => handlePersonalChange('phone', e.target.value)} />
                </div>
                <div className="col-span-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi (Kota)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.location} onChange={e => handlePersonalChange('location', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">LinkedIn</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.linkedin} onChange={e => handlePersonalChange('linkedin', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Website</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.website} onChange={e => handlePersonalChange('website', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Pengalaman Kerja */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Briefcase size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Pengalaman Kerja</h3>
                </div>
                <button onClick={() => addItem('experience')} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10}/> Tambah</button>
             </div>
             <div className="p-4 space-y-4">
                {data.experience.map((exp, idx) => (
                   <div key={exp.id} className="bg-slate-50 p-3 rounded border border-slate-200 relative group">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold" placeholder="Posisi" value={exp.role} onChange={e => updateItem('experience', idx, 'role', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Perusahaan" value={exp.company} onChange={e => updateItem('experience', idx, 'company', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Durasi" value={exp.date} onChange={e => updateItem('experience', idx, 'date', e.target.value)} />
                      </div>
                      <textarea className="w-full p-1.5 border border-slate-300 rounded text-xs h-20 resize-none" placeholder="Deskripsi" value={exp.desc} onChange={e => updateItem('experience', idx, 'desc', e.target.value)} />
                      <button onClick={() => removeItem('experience', idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                   </div>
                ))}
             </div>
          </div>

          {/* Pendidikan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <GraduationCap size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Pendidikan</h3>
                </div>
                <button onClick={() => addItem('education')} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10}/> Tambah</button>
             </div>
             <div className="p-4 space-y-3">
                {data.education.map((edu, idx) => (
                   <div key={edu.id} className="bg-slate-50 p-3 rounded border border-slate-200 relative group">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold" placeholder="Gelar" value={edu.degree} onChange={e => updateItem('education', idx, 'degree', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Sekolah" value={edu.school} onChange={e => updateItem('education', idx, 'school', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Tahun" value={edu.date} onChange={e => updateItem('education', idx, 'date', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Nilai (Opsional)" value={edu.note} onChange={e => updateItem('education', idx, 'note', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem('education', idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                   </div>
                ))}
             </div>
          </div>

          {/* Skill & Bahasa */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Keahlian (Skill)</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Hard & Soft Skills (Koma)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.skills.join(', ')} onChange={e => handleSkillsChange(e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Bahasa (Koma)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.languages.join(', ')} onChange={e => handleLangsChange(e.target.value)} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW (ALL-IN-ONE) --- */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20">
             <div className="w-[210mm] origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform">
                {DocumentContent}
             </div>
        </div>

      </div>

      {/* PRINT AREA (Hidden in view, visible in print) */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
          {DocumentContent}
      </div>

    </div>
  );
}