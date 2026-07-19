'use client';

/**
 * FILE: CVPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE UI & BULLETPROOF PRINT)
 * DESC: Generator Curriculum Vitae (ATS & Modern)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Plus, Trash2, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, User, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
type Experience = { id: string; company: string; position: string; startDate: string; endDate: string; description: string; };
type Education = { id: string; school: string; degree: string; startDate: string; endDate: string; };
type Skill = { id: string; name: string; };
type PersonalInfo = { fullName: string; jobTitle: string; email: string; phone: string; location: string; summary: string; };

// --- 2. DATA DEFAULT ---
const INITIAL_PERSONAL_INFO: PersonalInfo = {
  fullName: 'Budi Hartanto, S.Kom.',
  jobTitle: 'Senior Frontend Developer',
  email: 'budi.hartanto@email.com',
  phone: '0812-3456-7890',
  location: 'Bandung, Jawa Barat',
  summary: 'Saya memiliki pengalaman selama 3 tahun bekerja sebagai Frontend Engineer dengan fokus pada ekosistem React, Next.js, dan Tailwind CSS. Selama bekerja, saya telah berhasil memimpin tim dalam migrasi sistem legacy ke arsitektur modern yang meningkatkan performa aplikasi hingga 40%.',
};

const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'PT. Teknologi Masa Depan',
    position: 'Frontend Engineer',
    startDate: 'Jan 2023',
    endDate: 'Sekarang',
    description: 'Memimpin pengembangan web app e-commerce skala besar menggunakan Next.js dan Tailwind.\nMengoptimalkan page load time (LCP) dari 4s menjadi 1.2s.',
  },
];

const INITIAL_EDUCATIONS: Education[] = [
  { id: '1', school: 'Institut Teknologi Bandung (ITB)', degree: 'S1 Teknik Informatika (IPK: 3.85)', startDate: '2016', endDate: '2020' },
];

const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React.js / Next.js' }, { id: '2', name: 'TypeScript' }, { id: '3', name: 'Tailwind CSS' }, { id: '4', name: 'Node.js' },
];

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, className = '', templateId = 1 }: { children: React.ReactNode, className?: string, templateId?: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-normal box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'} ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function CVPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor CV...</div>}>
      <CVBuilder />
    </Suspense>
  );
}

function CVBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [templateId, setTemplateId] = useState<number>(2); // Default ke Modern agar wow
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const activeTemplateName = templateId === 1 ? 'Classic ATS (Harvard)' : 'Modern Premium';

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(INITIAL_PERSONAL_INFO);
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [educations, setEducations] = useState<Education[]>(INITIAL_EDUCATIONS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir CV ke setelan awal?')) {
        setPersonalInfo(INITIAL_PERSONAL_INFO); setExperiences(INITIAL_EXPERIENCES); setEducations(INITIAL_EDUCATIONS); setSkills(INITIAL_SKILLS);
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  
  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  const addExperience = () => setExperiences([...experiences, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
  const removeExperience = (id: string) => setExperiences(experiences.filter(exp => exp.id !== id));

  const handleEducationChange = (id: string, field: keyof Education, value: string) => setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  const addEducation = () => setEducations([...educations, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '' }]);
  const removeEducation = (id: string) => setEducations(educations.filter(edu => edu.id !== id));

  const handleSkillChange = (id: string, value: string) => setSkills(skills.map(skill => skill.id === id ? { ...skill, name: value } : skill));
  const addSkill = () => setSkills([...skills, { id: Date.now().toString(), name: '' }]);
  const removeSkill = (id: string) => setSkills(skills.filter(skill => skill.id !== id));

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-2xl shadow-xl p-2 z-[9999]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-purple-50 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-purple-600' : 'bg-slate-300'}`}></div> Classic ATS (Serif)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-purple-50 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-purple-600' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
        </button>
    </div>
  );

  const DocumentContent = () => (
    <Kertas templateId={templateId} className={templateId === 2 ? '!p-0' : ''}>
      {templateId === 1 ? (
        /* FORMAT 1: CLASSIC ATS-FRIENDLY (HARVARD STYLE) */
        <div className="text-black font-serif text-[10.5pt] leading-relaxed max-w-[800px] mx-auto">
          <div className="text-center border-b-[1.5px] border-black pb-4 mb-5 break-inside-avoid">
            <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{ letterSpacing: '0.05em' }}>{personalInfo.fullName}</h1>
            <p className="text-[11pt] italic mb-2">{personalInfo.jobTitle}</p>
            <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-[10pt]">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.location && (personalInfo.phone || personalInfo.email) && <span className="text-gray-400">•</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.phone && personalInfo.email && <span className="text-gray-400">•</span>}
              {personalInfo.email && <span>{personalInfo.email}</span>}
            </div>
          </div>
          {personalInfo.summary && (
            <div className="mb-6 break-inside-avoid">
              <p className="text-justify indent-8">{personalInfo.summary}</p>
            </div>
          )}
          {experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1px] border-black pb-1 mb-3 text-center break-inside-avoid">Professional Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-end mb-0.5">
                      <h3 className="font-bold text-[11pt]">{exp.company}</h3>
                      <span className="text-[10pt] italic">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="italic text-[10.5pt]">{exp.position}</p>
                    </div>
                    <p className="text-justify whitespace-pre-line pl-4 relative before:content-['•'] before:absolute before:left-0">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {educations.length > 0 && (
            <div className="mb-6 break-inside-avoid">
              <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1px] border-black pb-1 mb-3 text-center">Education</h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-end mb-0.5">
                      <h3 className="font-bold text-[11pt]">{edu.school}</h3>
                      <span className="text-[10pt] italic">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="italic text-[10.5pt]">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div className="mb-6 break-inside-avoid">
              <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1px] border-black pb-1 mb-3 text-center">Core Competencies</h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center">
                {skills.map((skill, idx) => (
                  <span key={skill.id} className="text-[10.5pt]">
                    {skill.name}{idx < skills.length - 1 ? <span className="mx-2 text-gray-400">|</span> : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FORMAT 2: MODERN CREATIVE (DEEP PURPLE, EMERALD, AMBER) */
        <div className="flex flex-col h-full bg-white text-slate-800 font-sans text-[10pt]">
          
          {/* Header Banner */}
          <div className="bg-purple-900 text-white p-[15mm] flex flex-col justify-center break-inside-avoid h-[60mm] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
            <div className="relative z-10">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{personalInfo.fullName}</h1>
                <h2 className="text-xl font-bold text-amber-400 uppercase tracking-widest mb-4">{personalInfo.jobTitle}</h2>
                <div className="flex flex-wrap gap-5 text-[9.5pt] text-purple-100 font-medium mt-2">
                {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={14} className="text-amber-400" /> {personalInfo.email}</div>}
                {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={14} className="text-amber-400" /> {personalInfo.phone}</div>}
                {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={14} className="text-amber-400" /> {personalInfo.location}</div>}
                </div>
            </div>
          </div>

          <div className="flex-1 flex flex-row">
            {/* Left Column: Sidebar */}
            <div className="w-[75mm] bg-slate-50 p-[12mm] border-r border-slate-100 flex flex-col gap-10">
              {educations.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-purple-900 mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center"><GraduationCap size={16} className="text-emerald-700"/></div>
                    Edukasi
                  </h3>
                  <div className="space-y-6">
                    {educations.map((edu) => (
                      <div key={edu.id} className="relative pl-4 border-l-2 border-emerald-200">
                        <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                        <h4 className="font-bold text-slate-800 text-[10pt] leading-tight mb-1">{edu.degree}</h4>
                        <div className="text-[9pt] text-slate-600 font-medium mb-1">{edu.school}</div>
                        <div className="text-[8pt] font-bold text-emerald-600 uppercase bg-emerald-50 inline-block px-2 py-0.5 rounded-md mt-1">{edu.startDate} - {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {skills.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-purple-900 mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center"><Code size={16} className="text-amber-600"/></div>
                    Keahlian
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-[9.5pt] font-bold shadow-sm flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Main Content */}
            <div className="flex-1 p-[12mm] flex flex-col gap-10 bg-white">
              {personalInfo.summary && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-purple-900 mb-4 flex items-center gap-2 border-b-2 border-slate-100 pb-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center"><User size={16} className="text-purple-700"/></div>
                    Profil Singkat
                  </h3>
                  <p className="leading-relaxed text-justify text-[10pt] text-slate-600 font-medium">{personalInfo.summary}</p>
                </div>
              )}
              {experiences.length > 0 && (
                <div>
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-purple-900 mb-6 flex items-center gap-2 border-b-2 border-slate-100 pb-3 break-inside-avoid">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center"><Briefcase size={16} className="text-purple-700"/></div>
                    Pengalaman Kerja
                  </h3>
                  <div className="space-y-8">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[12pt] text-slate-900">{exp.position}</h4>
                          <span className="text-[8.5pt] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="font-bold text-amber-600 text-[10pt] mb-3">{exp.company}</div>
                        <p className="leading-relaxed text-[10pt] text-justify text-slate-600 whitespace-pre-line pl-4 border-l-2 border-slate-200">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Curriculum Vitae</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-purple-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <User size={18} className="text-purple-600" /> Editor Konten
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. DATA PRIBADI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Profil Pribadi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi / Jabatan Pekerjaan</label>
                      <input type="text" name="jobTitle" value={personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                        <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telp</label>
                        <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Domisili</label>
                      <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tentang Saya (Summary)</label>
                      <textarea name="summary" value={personalInfo.summary} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-28 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none leading-relaxed transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 2. PENGALAMAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} className="text-purple-600"/> Pengalaman Kerja
                    </h3>
                    <button onClick={addExperience} className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-4">
                    {experiences.map((exp, idx) => (
                      <div key={exp.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                          <button onClick={() => removeExperience(exp.id)} className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                        <div className="space-y-3 pr-10">
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Perusahaan</label>
                            <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Posisi / Jabatan</label>
                            <input type="text" value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mulai</label>
                               <input type="text" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Jan 2020" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Selesai</label>
                               <input type="text" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Sekarang" />
                             </div>
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi Pekerjaan</label>
                            <textarea value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 h-24 resize-none focus:ring-2 focus:ring-purple-500 outline-none leading-relaxed"></textarea>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. PENDIDIKAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={14} className="text-emerald-600" /> Pendidikan
                    </h3>
                    <button onClick={addEducation} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-4">
                    {educations.map((edu, idx) => (
                      <div key={edu.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                          <button onClick={() => removeEducation(edu.id)} className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                        <div className="space-y-3 pr-10">
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Institusi / Universitas</label>
                            <input type="text" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gelar / Jurusan</label>
                            <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun Mulai</label>
                               <input type="text" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun Lulus</label>
                               <input type="text" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. KEAHLIAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Code size={14} className="text-amber-500"/> Keahlian / Skills
                    </h3>
                    <button onClick={addSkill} className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex gap-2">
                        <input type="text" value={skill.name} onChange={(e) => handleSkillChange(skill.id, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ex: Microsoft Office" />
                        <button onClick={() => removeSkill(skill.id)} className="bg-rose-50 text-rose-500 hover:text-white hover:bg-rose-500 px-3 rounded-lg transition-colors">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Curriculum Vitae" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
