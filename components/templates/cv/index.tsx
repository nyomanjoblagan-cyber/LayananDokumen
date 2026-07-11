"use client";

import React, { useState } from "react";
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw, Plus, Trash2 
} from 'lucide-react';
import Link from 'next/link';

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
}

const Kertas = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="bg-white text-black shadow-lg mx-auto overflow-hidden print:shadow-none print:m-0 print:w-full print:min-w-0 print:min-h-0 print:p-0" 
      style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}
    >
      <style>{`
        @media print {
          @page { margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}</style>
      {children}
    </div>
  );
};

const INITIAL_PERSONAL_INFO = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+62 812-3456-7890",
  address: "Jakarta, Indonesia",
  summary: "Seorang profesional yang berdedikasi dengan pengalaman dalam mengelola proyek dan memecahkan masalah kompleks. Memiliki kemampuan komunikasi yang baik dan mampu bekerja dalam tim maupun secara mandiri."
};

const INITIAL_EDUCATIONS = [
  { id: "1", institution: "Universitas Indonesia", degree: "S1 Sistem Informasi", year: "2015 - 2019" }
];

const INITIAL_EXPERIENCES = [
  { id: "1", company: "PT Teknologi Nusantara", position: "Software Engineer", duration: "Jan 2020 - Sekarang", description: "- Mengembangkan fitur-fitur baru untuk aplikasi web perusahaan.\n- Bekerja sama dengan tim desain untuk memastikan antarmuka yang ramah pengguna.\n- Melakukan pengujian dan pemeliharaan kode untuk meningkatkan performa aplikasi." }
];

const INITIAL_SKILLS = [
  { id: "1", name: "JavaScript" },
  { id: "2", name: "TypeScript" },
  { id: "3", name: "React JS" },
  { id: "4", name: "Node JS" }
];

export default function CVTemplate() {
  const [personalInfo, setPersonalInfo] = useState(INITIAL_PERSONAL_INFO);
  const [educations, setEducations] = useState<Education[]>(INITIAL_EDUCATIONS);
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  const [activeTab, setActiveTab] = useState<'diri' | 'pengalaman' | 'pendidikan' | 'keahlian'>('diri');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setPersonalInfo(INITIAL_PERSONAL_INFO);
        setEducations(INITIAL_EDUCATIONS);
        setExperiences(INITIAL_EXPERIENCES);
        setSkills(INITIAL_SKILLS);
    }
  };

  const addEducation = () => setEducations([...educations, { id: Date.now().toString(), institution: "", degree: "", year: "" }]);
  const updateEducation = (id: string, field: keyof Education, value: string) => setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  const removeEducation = (id: string) => setEducations(educations.filter(edu => edu.id !== id));

  const addExperience = () => setExperiences([...experiences, { id: Date.now().toString(), company: "", position: "", duration: "", description: "" }]);
  const updateExperience = (id: string, field: keyof Experience, value: string) => setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  const removeExperience = (id: string) => setExperiences(experiences.filter(exp => exp.id !== id));

  const addSkill = () => setSkills([...skills, { id: Date.now().toString(), name: "" }]);
  const updateSkill = (id: string, value: string) => setSkills(skills.map(skill => skill.id === id ? { ...skill, name: value } : skill));
  const removeSkill = (id: string) => setSkills(skills.filter(skill => skill.id !== id));

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* TOP NAV BAR - STICKY - EXACTLY LIKE JUAL BELI TANAH */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>CV Editor (ATS Friendly)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('diri')} className={`flex-1 py-3 border-r ${activeTab === 'diri' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Data Diri</button>
              <button onClick={() => setActiveTab('pengalaman')} className={`flex-1 py-3 border-r ${activeTab === 'pengalaman' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pengalaman</button>
              <button onClick={() => setActiveTab('pendidikan')} className={`flex-1 py-3 border-r ${activeTab === 'pendidikan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pendidikan</button>
              <button onClick={() => setActiveTab('keahlian')} className={`flex-1 py-3 ${activeTab === 'keahlian' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Keahlian</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'diri' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Pribadi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={personalInfo.fullName} onChange={e => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} placeholder="Contoh: John Doe" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                  <input type="email" className="w-full p-2 border rounded-lg text-sm mt-1" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} placeholder="email@contoh.com" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No. Telepon</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} placeholder="+62 8..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={personalInfo.address} onChange={e => setPersonalInfo({ ...personalInfo, address: e.target.value })} placeholder="Kota, Negara" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Ringkasan Profesional</label>
                  <textarea rows={4} className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={personalInfo.summary} onChange={e => setPersonalInfo({ ...personalInfo, summary: e.target.value })} placeholder="Tuliskan ringkasan singkat profil profesional Anda..." />
                </div>
              </div>
              )}

              {activeTab === 'pengalaman' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center border-b pb-1 mb-4">
                  <h3 className="text-xs font-black uppercase text-emerald-600">Pengalaman Kerja</h3>
                  <button onClick={addExperience} className="text-[10px] bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                    <Plus size={12} /> Tambah
                  </button>
                </div>
                
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 border rounded-xl bg-slate-50 relative group">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => removeExperience(exp.id)} className="text-slate-400 hover:text-red-500" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Posisi / Jabatan</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} placeholder="Contoh: Software Engineer" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Contoh: PT Teknologi Maju" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Durasi Waktu</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Contoh: Jan 2020 - Sekarang" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi & Pencapaian</label>
                        <textarea rows={3} className="w-full p-2 border rounded-lg text-sm mt-1" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} placeholder="- Mengerjakan project X..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {activeTab === 'pendidikan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center border-b pb-1 mb-4">
                  <h3 className="text-xs font-black uppercase text-amber-600">Pendidikan</h3>
                  <button onClick={addEducation} className="text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                    <Plus size={12} /> Tambah
                  </button>
                </div>
                
                {educations.map((edu, index) => (
                  <div key={edu.id} className="p-4 border rounded-xl bg-slate-50 relative group">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => removeEducation(edu.id)} className="text-slate-400 hover:text-red-500" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Gelar / Jurusan</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Contoh: S1 Teknik Informatika" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Institusi</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Contoh: Universitas Indonesia" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tahun Lulus</label>
                        <input className="w-full p-2 border rounded-lg text-sm mt-1" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} placeholder="Contoh: 2015 - 2019" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {activeTab === 'keahlian' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center border-b pb-1 mb-4">
                  <h3 className="text-xs font-black uppercase text-purple-600">Keahlian (Skills)</h3>
                  <button onClick={addSkill} className="text-[10px] bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                    <Plus size={12} /> Tambah
                  </button>
                </div>
                
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center gap-2 group">
                      <input className="flex-1 p-2 border rounded-lg text-sm" value={skill.name} onChange={e => updateSkill(skill.id, e.target.value)} placeholder="Contoh: JavaScript" />
                      <button onClick={() => removeSkill(skill.id)} className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
              )}
           </div>
        </div>

        {/* RIGHT PANEL: Live Preview */}
        <div className="flex-1 bg-gray-500 p-4 lg:p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible custom-scrollbar">
          <Kertas>
            <div className="max-w-3xl mx-auto text-black">
              {/* Header: Name and Contact */}
              <header className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{personalInfo.fullName || "NAMA LENGKAP"}</h1>
                <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-800">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                  {personalInfo.address && <span>• {personalInfo.address}</span>}
                </div>
              </header>

              {/* Professional Summary */}
              {personalInfo.summary && (
                <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">Ringkasan Profil</h2>
                  <p className="text-sm leading-relaxed text-justify whitespace-pre-wrap">{personalInfo.summary}</p>
                </section>
              )}

              {/* Work Experience */}
              {experiences.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">Pengalaman Kerja</h2>
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-base font-bold text-gray-900">{exp.position || "Posisi / Jabatan"}</h3>
                          <span className="text-sm font-semibold text-gray-700">{exp.duration || "Durasi Waktu"}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800 mb-1">{exp.company || "Nama Perusahaan"}</div>
                        <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                          {exp.description || "Deskripsi pekerjaan dan pencapaian."}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">Pendidikan</h2>
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{edu.institution || "Nama Institusi"}</h3>
                          <div className="text-sm text-gray-800">{edu.degree || "Gelar / Jurusan"}</div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{edu.year || "Tahun Lulus"}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">Keahlian (Skills)</h2>
                  <div className="text-sm leading-relaxed text-gray-800">
                    <ul className="list-disc list-inside flex flex-wrap gap-x-6 gap-y-1">
                      {skills.map((skill) => skill.name ? <li key={skill.id}>{skill.name}</li> : null)}
                    </ul>
                  </div>
                </section>
              )}
            </div>
          </Kertas>
        </div>

      </main>
    </div>
  );
}