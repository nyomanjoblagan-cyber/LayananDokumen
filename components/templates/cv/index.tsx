'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Plus, Trash2, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, User
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type Skill = {
  id: string;
  name: string;
};

type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
};

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
    description: 'Memimpin pengembangan web app e-commerce skala besar menggunakan Next.js dan Tailwind. Mengoptimalkan page load time (LCP) dari 4s menjadi 1.2s.',
  },
];

const INITIAL_EDUCATIONS: Education[] = [
  {
    id: '1',
    school: 'Institut Teknologi Bandung (ITB)',
    degree: 'S1 Teknik Informatika (IPK: 3.85)',
    startDate: '2016',
    endDate: '2020',
  },
];

const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React.js / Next.js' },
  { id: '2', name: 'TypeScript' },
  { id: '3', name: 'Tailwind CSS' },
  { id: '4', name: 'Node.js' },
];

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '', templateId = 1 }: { children: React.ReactNode, className?: string, templateId?: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-normal relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'} ${className}`}>
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
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
              Format Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
              Format Compact Rapi (Sans)
          </button>
      </div>
  );
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(INITIAL_PERSONAL_INFO);
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [educations, setEducations] = useState<Education[]>(INITIAL_EDUCATIONS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir CV ke setelan awal?')) {
        setPersonalInfo(INITIAL_PERSONAL_INFO);
        setExperiences(INITIAL_EXPERIENCES);
        setEducations(INITIAL_EDUCATIONS);
        setSkills(INITIAL_SKILLS);
    }
  };

  // Handlers
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };
  const addExperience = () => setExperiences([...experiences, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
  const removeExperience = (id: string) => setExperiences(experiences.filter(exp => exp.id !== id));

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };
  const addEducation = () => setEducations([...educations, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '' }]);
  const removeEducation = (id: string) => setEducations(educations.filter(edu => edu.id !== id));

  const handleSkillChange = (id: string, value: string) => {
    setSkills(skills.map(skill => skill.id === id ? { ...skill, name: value } : skill));
  };
  const addSkill = () => setSkills([...skills, { id: Date.now().toString(), name: '' }]);
  const removeSkill = (id: string) => setSkills(skills.filter(skill => skill.id !== id));

  const DocumentContent = () => (
    <Kertas templateId={templateId}>
      {/* Header Profile */}
      <div className="border-b-4 border-slate-800 pb-6 mb-6 break-inside-avoid">
        <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-2">{personalInfo.fullName}</h1>
        <h2 className="text-xl font-bold text-slate-500 uppercase tracking-widest">{personalInfo.jobTitle}</h2>
        
        <div className="flex flex-wrap gap-4 mt-4 text-[10pt] font-medium text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1"><Mail size={14} className="text-slate-800" /> {personalInfo.email}</div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1"><Phone size={14} className="text-slate-800" /> {personalInfo.phone}</div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1"><MapPin size={14} className="text-slate-800" /> {personalInfo.location}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        
        {/* Kolom Kiri: Summary & Pengalaman */}
        <div>
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 mb-3 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                <User size={18} /> Profil
              </h3>
              <p className="leading-relaxed text-justify text-[10.5pt]">{personalInfo.summary}</p>
            </div>
          )}

          {/* Pengalaman Kerja */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 mb-4 border-b-2 border-slate-200 pb-1 flex items-center gap-2 break-inside-avoid">
                <Briefcase size={18} /> Pengalaman Kerja
              </h3>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[12pt] text-slate-800">{exp.position}</h4>
                      <span className="text-[9pt] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="font-bold text-slate-600 text-[10pt] mb-2">{exp.company}</div>
                    <p className="leading-relaxed text-[10pt] text-justify whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Kolom Kanan: Pendidikan & Keahlian */}
        <div>
          {/* Pendidikan */}
          {educations.length > 0 && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 mb-4 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                <GraduationCap size={18} /> Pendidikan
              </h3>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-800 text-[11pt] leading-tight mb-1">{edu.degree}</h4>
                    <div className="text-[10pt] text-slate-600 font-medium mb-1">{edu.school}</div>
                    <div className="text-[9pt] font-bold text-slate-500 uppercase">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keahlian / Skills */}
          {skills.length > 0 && (
            <div className="mb-8 break-inside-avoid">
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 mb-4 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                <Code size={18} /> Keahlian
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1 rounded text-[9.5pt] font-bold">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Curriculum Vitae</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Career Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <span className="text-blue-400">❖</span> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <User size={18} className="text-blue-600" /> Editor CV
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {/* 1. DATA PRIBADI */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-blue-50 p-2 rounded border-l-4 border-blue-600 text-sm flex items-center gap-2">
                    <User size={14}/> Profil Pribadi
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Nama Lengkap</label>
                      <input type="text" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Posisi / Jabatan Pekerjaan</label>
                      <input type="text" name="jobTitle" value={personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Email</label>
                        <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">No. Telp</label>
                        <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Lokasi Domisili</label>
                      <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Tentang Saya (Summary)</label>
                      <textarea name="summary" value={personalInfo.summary} onChange={handlePersonalInfoChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"></textarea>
                    </div>
                  </div>
                </div>

                {/* 2. PENGALAMAN */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-100 p-2 rounded border-l-4 border-slate-600">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Briefcase size={14}/> Pengalaman Kerja
                    </h3>
                    <button onClick={addExperience} className="text-xs bg-slate-800 text-white px-2 py-1 rounded font-bold hover:bg-slate-700 flex items-center gap-1">
                      <Plus size={12}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 bg-rose-50 p-1 rounded">
                          <Trash2 size={14}/>
                        </button>
                        <div className="space-y-3 pr-6">
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Perusahaan</label>
                            <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Posisi / Jabatan</label>
                            <input type="text" value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mulai</label>
                               <input type="text" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Jan 2020" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Selesai</label>
                               <input type="text" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Sekarang" />
                             </div>
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi Pekerjaan</label>
                            <textarea value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 h-20 resize-none focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed"></textarea>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. PENDIDIKAN */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-indigo-50 p-2 rounded border-l-4 border-indigo-500">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <GraduationCap size={14} className="text-indigo-600" /> Pendidikan
                    </h3>
                    <button onClick={addEducation} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded font-bold hover:bg-indigo-500 flex items-center gap-1">
                      <Plus size={12}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-4">
                    {educations.map((edu) => (
                      <div key={edu.id} className="relative bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 bg-rose-50 p-1 rounded">
                          <Trash2 size={14}/>
                        </button>
                        <div className="space-y-3 pr-6">
                           <div>
                            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Institusi / Universitas</label>
                            <input type="text" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Gelar / Jurusan</label>
                            <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Tahun Mulai</label>
                               <input type="text" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Tahun Lulus</label>
                               <input type="text" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                             </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. KEAHLIAN */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-amber-50 p-2 rounded border-l-4 border-amber-500">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Code size={14} className="text-amber-600"/> Keahlian / Skills
                    </h3>
                    <button onClick={addSkill} className="text-xs bg-amber-500 text-white px-2 py-1 rounded font-bold hover:bg-amber-400 flex items-center gap-1">
                      <Plus size={12}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex gap-2">
                        <input type="text" value={skill.name} onChange={(e) => handleSkillChange(skill.id, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ex: Microsoft Office" />
                        <button onClick={() => removeSkill(skill.id)} className="bg-rose-50 text-rose-500 hover:text-white hover:bg-rose-500 px-3 rounded transition-colors">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide print:hidden`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Curriculum_Vitae" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
