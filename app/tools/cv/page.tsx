'use client';

/**
 * FILE: CVMakerPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator CV (Curriculum Vitae)
 * FEATURES:
 * - Dual Template (ATS vs Visual Sidebar)
 * - Dynamic Experience & Education List
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, LayoutTemplate, Plus, Trash2,
  User, Briefcase, GraduationCap, Mail, Phone, MapPin, Linkedin, Globe, Sparkles, ChevronDown, Check,
  ArrowLeftCircle, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  desc: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  date: string;
  note: string;
}

interface CVData {
  fullName: string;
  jobTitle: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: CVData = {
  fullName: 'ANDI PRATAMA, S.Kom',
  jobTitle: 'Senior Digital Marketer',
  summary: 'Profesional pemasaran digital dengan pengalaman 5 tahun dalam mengelola kampanye iklan, SEO, dan media sosial. Memiliki rekam jejak terbukti dalam meningkatkan konversi penjualan hingga 150%. Terbiasa bekerja dengan data dan tools analitik.',
  email: 'andi.pratama@email.com',
  phone: '0812-3456-7890',
  location: 'Jakarta Selatan, Indonesia',
  linkedin: 'linkedin.com/in/andipratama',
  website: 'andipratama.com',

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

  education: [
    {
      id: 1,
      degree: 'S1 Sistem Informasi',
      school: 'Universitas Indonesia',
      date: '2016 - 2020',
      note: 'IPK: 3.85 / 4.00 (Cum Laude)'
    }
  ],

  skills: ['SEO / SEM', 'Google Analytics', 'Copywriting', 'Facebook Ads', 'Team Leadership', 'Data Analysis'],
  languages: ['Bahasa Indonesia (Native)', 'English (Professional)']
};

// --- 3. KOMPONEN UTAMA ---
export default function CVMakerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Studio CV...</div>}>
      <CVToolBuilder />
    </Suspense>
  );
}

function CVToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [data, setData] = useState<CVData>(INITIAL_DATA);

  // --- HANDLERS ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handlePersonalChange = (field: keyof CVData, val: string) => {
    // @ts-ignore
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = (section: 'experience' | 'education') => {
    const newId = Date.now();
    if (section === 'experience') {
      setData(prev => ({ ...prev, experience: [...prev.experience, { id: newId, role: '', company: '', date: '', desc: '' }] }));
    } else {
      setData(prev => ({ ...prev, education: [...prev.education, { id: newId, degree: '', school: '', date: '', note: '' }] }));
    }
  };

  const removeItem = (section: 'experience' | 'education', idx: number) => {
    if (section === 'experience') {
        const newItems = [...data.experience];
        newItems.splice(idx, 1);
        setData(prev => ({ ...prev, experience: newItems }));
    } else {
        const newItems = [...data.education];
        newItems.splice(idx, 1);
        setData(prev => ({ ...prev, education: newItems }));
    }
  };

  const updateItem = (section: 'experience' | 'education', idx: number, field: string, val: string) => {
    if (section === 'experience') {
        const newItems = [...data.experience];
        // @ts-ignore
        newItems[idx][field] = val;
        setData(prev => ({ ...prev, experience: newItems }));
    } else {
        const newItems = [...data.education];
        // @ts-ignore
        newItems[idx][field] = val;
        setData(prev => ({ ...prev, education: newItems }));
    }
  };

  const handleSkillsChange = (val: string) => {
    setData(prev => ({ ...prev, skills: val.split(',').map(s => s.trim()) }));
  };
  const handleLangsChange = (val: string) => {
    setData(prev => ({ ...prev, languages: val.split(',').map(s => s.trim()) }));
  };

  const handleReset = () => {
    if(confirm('Reset CV ke awal?')) {
        setData(INITIAL_DATA);
        setPhoto(null);
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            ATS Friendly (Clean)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Sidebar (Visual)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: ATS FRIENDLY ---
      return (
        <div className="font-sans text-[#1e293b] leading-relaxed p-[20mm]">
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
      );
    } else {
      // --- TEMPLATE 2: MODERN SIDEBAR ---
      return (
        <div className="font-sans text-slate-800 leading-snug flex flex-row items-stretch min-h-[297mm]">
           {/* Sidebar Kiri */}
           <div className="w-[35%] bg-slate-900 print:bg-slate-900 text-white p-6 print:p-6 flex flex-col gap-6 shrink-0">
              <div className="flex flex-col items-center text-center">
                 <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-700 mb-4 bg-slate-800 print:bg-slate-800 shrink-0">
                    {photo ? <img src={photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-500"><User size={40}/></div>}
                 </div>
                 <h1 className="text-lg font-bold uppercase tracking-wide mb-1 text-white">{data.fullName}</h1>
                 <div className="text-xs text-blue-300 font-medium">{data.jobTitle}</div>
              </div>

              <div className="space-y-6 text-xs text-slate-300">
                 <div>
                    <h3 className="text-white font-bold uppercase border-b border-slate-700 pb-2 mb-3">Contact</h3>
                    <div className="space-y-2">
                       {data.email && <div className="flex items-center gap-2"><Mail size={12}/> <span className="truncate">{data.email}</span></div>}
                       {data.phone && <div className="flex items-center gap-2"><Phone size={12}/> {data.phone}</div>}
                       {data.location && <div className="flex items-center gap-2"><MapPin size={12}/> {data.location}</div>}
                       {data.linkedin && <div className="flex items-center gap-2"><Linkedin size={12}/> <span className="truncate">{data.linkedin.replace('https://','')}</span></div>}
                       {data.website && <div className="flex items-center gap-2"><Globe size={12}/> <span className="truncate">{data.website.replace('https://','')}</span></div>}
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
           <div className="w-[65%] p-8 bg-white text-slate-800 flex flex-col gap-8">
              {/* Summary */}
              <div>
                 <h2 className="text-lg font-bold uppercase text-blue-800 border-b-2 border-blue-100 mb-3 pb-1">Profile</h2>
                 <p className="text-sm text-justify leading-relaxed text-slate-600">{data.summary}</p>
              </div>

              {/* Experience */}
              <div>
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
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 0mm; } 
            .print-table tfoot { height: 0mm; } 
            .print-content-wrapper { padding: 0; width: 100%; box-sizing: border-box; }
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">CV Maker <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'ATS Friendly' : 'Modern Sidebar'}</span><ChevronDown size={14} className="text-slate-500"/>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi CV Anda</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               
               {/* 1. PROFILE */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Profil Diri</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden relative group" onClick={() => fileInputRef.current?.click()}>
                            {photo ? <img src={photo} className="w-full h-full object-cover" /> : <Upload size={20} className="text-slate-300" />}
                            {photo && <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} className="text-white" onClick={(e) => { e.stopPropagation(); setPhoto(null); }} /></div>}
                         </div>
                         <div className="flex-1">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                            <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Foto</button>
                            <div className="text-[10px] text-slate-400 mt-1">Disarankan rasio 1:1</div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label>
                         <input className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.fullName} onChange={e => handlePersonalChange('fullName', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500">Job Title</label>
                         <input className="w-full p-2 border border-slate-300 rounded text-sm" value={data.jobTitle} onChange={e => handlePersonalChange('jobTitle', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500">Ringkasan</label>
                         <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.summary} onChange={e => handlePersonalChange('summary', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 2. KONTAK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Phone size={12}/> Kontak</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold text-slate-500">Email</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.email} onChange={e => handlePersonalChange('email', e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold text-slate-500">No. HP</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.phone} onChange={e => handlePersonalChange('phone', e.target.value)} /></div>
                      <div className="col-span-2"><label className="text-[10px] font-bold text-slate-500">Lokasi</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.location} onChange={e => handlePersonalChange('location', e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold text-slate-500">LinkedIn</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.linkedin} onChange={e => handlePersonalChange('linkedin', e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold text-slate-500">Website</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.website} onChange={e => handlePersonalChange('website', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. PENGALAMAN */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Pengalaman</h3><button onClick={() => addItem('experience')} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"><Plus size={10}/> Tambah</button></div>
                  <div className="space-y-3">
                      {data.experience.map((exp, idx) => (
                         <div key={exp.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group">
                            <div className="grid grid-cols-2 gap-2 mb-2">
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold" placeholder="Posisi" value={exp.role} onChange={e => updateItem('experience', idx, 'role', e.target.value)} />
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Perusahaan" value={exp.company} onChange={e => updateItem('experience', idx, 'company', e.target.value)} />
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Durasi" value={exp.date} onChange={e => updateItem('experience', idx, 'date', e.target.value)} />
                            </div>
                            <textarea className="w-full p-1.5 border border-slate-300 rounded text-xs h-20 resize-none" placeholder="Deskripsi" value={exp.desc} onChange={e => updateItem('experience', idx, 'desc', e.target.value)} />
                            <button onClick={() => removeItem('experience', idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><Trash2 size={12}/></button>
                         </div>
                      ))}
                  </div>
               </div>

               {/* 4. PENDIDIKAN */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Pendidikan</h3><button onClick={() => addItem('education')} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"><Plus size={10}/> Tambah</button></div>
                  <div className="space-y-3">
                      {data.education.map((edu, idx) => (
                         <div key={edu.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group">
                            <div className="grid grid-cols-2 gap-2 mb-2">
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold" placeholder="Gelar" value={edu.degree} onChange={e => updateItem('education', idx, 'degree', e.target.value)} />
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Sekolah" value={edu.school} onChange={e => updateItem('education', idx, 'school', e.target.value)} />
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Tahun" value={edu.date} onChange={e => updateItem('education', idx, 'date', e.target.value)} />
                               <input className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Nilai" value={edu.note} onChange={e => updateItem('education', idx, 'note', e.target.value)} />
                            </div>
                            <button onClick={() => removeItem('education', idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><Trash2 size={12}/></button>
                         </div>
                      ))}
                  </div>
               </div>

               {/* 5. SKILL */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Sparkles size={12}/> Skill & Bahasa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div><label className="text-[10px] font-bold text-slate-500">Skills (Pisahkan Koma)</label><textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.skills.join(', ')} onChange={e => handleSkillsChange(e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold text-slate-500">Bahasa</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.languages.join(', ')} onChange={e => handleLangsChange(e.target.value)} /></div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '0mm' }}>
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

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '0mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper" style={{ padding: '0' }}><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '0mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
