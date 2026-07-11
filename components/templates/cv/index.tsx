"use client";

import React, { useState } from "react";

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

export default function CVTemplate() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
    summary: "Seorang profesional yang berdedikasi dengan pengalaman dalam mengelola proyek dan memecahkan masalah kompleks. Memiliki kemampuan komunikasi yang baik dan mampu bekerja dalam tim maupun secara mandiri."
  });

  const [educations, setEducations] = useState<Education[]>([
    { id: "1", institution: "Universitas Indonesia", degree: "S1 Sistem Informasi", year: "2015 - 2019" }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "PT Teknologi Nusantara", position: "Software Engineer", duration: "Jan 2020 - Sekarang", description: "- Mengembangkan fitur-fitur baru untuk aplikasi web perusahaan.\n- Bekerja sama dengan tim desain untuk memastikan antarmuka yang ramah pengguna.\n- Melakukan pengujian dan pemeliharaan kode untuk meningkatkan performa aplikasi." }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "JavaScript" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "React JS" },
    { id: "4", name: "Node JS" }
  ]);

  const handlePrint = () => {
    window.print();
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans">
      {/* LEFT PANEL: Form Inputs (no-print) */}
      <div className="w-full lg:w-1/3 bg-white p-6 border-r border-gray-200 overflow-y-auto no-print h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editor CV (ATS Friendly)</h2>
          <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Cetak
          </button>
        </div>

        {/* Data Diri */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Data Diri</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nama Lengkap</label>
              <input type="text" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">No. Telepon</label>
              <input type="text" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Alamat</label>
              <input type="text" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Ringkasan Profesional</label>
              <textarea rows={4} value={personalInfo.summary} onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
        </div>

        {/* Pengalaman Kerja */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Pengalaman Kerja</h3>
            <button onClick={addExperience} className="text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">+ Tambah</button>
          </div>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded relative bg-gray-50">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700" title="Hapus">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <div className="space-y-3 mt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Posisi</label>
                    <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Nama Perusahaan</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: PT Teknologi Maju" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Durasi (Tahun - Tahun)</label>
                    <input type="text" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: Jan 2020 - Sekarang" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Deskripsi / Pencapaian</label>
                    <textarea rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="- Mengerjakan project X..."></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pendidikan */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Pendidikan</h3>
            <button onClick={addEducation} className="text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">+ Tambah</button>
          </div>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded relative bg-gray-50">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700" title="Hapus">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <div className="space-y-3 mt-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Gelar / Jurusan</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: S1 Teknik Informatika" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Institusi</label>
                    <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: Universitas Indonesia" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Tahun Lulus</label>
                    <input type="text" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: 2015 - 2019" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keahlian */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Keahlian (Skills)</h3>
            <button onClick={addSkill} className="text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">+ Tambah</button>
          </div>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, e.target.value)} className="flex-1 p-2 border border-gray-300 rounded text-sm" placeholder="Contoh: JavaScript" />
                <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="w-full lg:w-2/3 bg-gray-500 p-4 lg:p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
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
    </div>
  );
}