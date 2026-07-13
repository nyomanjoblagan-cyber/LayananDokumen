'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Printer } from 'lucide-react';

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

export default function CVBuilder() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+62 812 3456 7890',
    location: 'Jakarta, Indonesia',
    summary: 'Professional Software Engineer with 5+ years of experience in developing scalable web applications. Strong problem-solving skills and a passion for learning new technologies.',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Led the frontend team in developing a high-traffic e-commerce platform using Next.js and Tailwind CSS. Improved page load speed by 40%.',
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2015',
      endDate: '2019',
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React.js' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Tailwind CSS' },
    { id: '4', name: 'Node.js' },
  ]);

  // Handle Input Changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '' }]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleSkillChange = (id: string, value: string) => {
    setSkills(skills.map(skill => skill.id === id ? { ...skill, name: value } : skill));
  };

  const addSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: '' }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 items-start">
        
        {/* FORM SECTION - Hidden when printing */}
        <div className="w-full xl:w-1/3 bg-white p-6 rounded-xl shadow-lg h-[calc(100vh-4rem)] overflow-y-auto print:hidden sticky top-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">CV Builder</h2>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Printer size={18} />
              <span className="font-medium">Print / PDF</span>
            </button>
          </div>

          {/* Personal Info Form */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input type="text" name="fullName" value={personalInfo.fullName} onChange={handlePersonalInfoChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                <input type="text" name="jobTitle" value={personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Professional Summary</label>
                <textarea name="summary" value={personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </section>

          {/* Experience Form */}
          <section className="mb-8">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
              <button onClick={addExperience} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-gray-50 p-4 rounded-lg relative border border-gray-200 shadow-sm">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition">
                    <Trash2 size={18} />
                  </button>
                  <div className="space-y-4 pr-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                      <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Position</label>
                      <input type="text" value={exp.position} onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                        <input type="text" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} placeholder="e.g. Jan 2020" className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                        <input type="text" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} placeholder="e.g. Present" className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                      <textarea value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Form */}
          <section className="mb-8">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Education</h3>
              <button onClick={addEducation} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="space-y-6">
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg relative border border-gray-200 shadow-sm">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition">
                    <Trash2 size={18} />
                  </button>
                  <div className="space-y-4 pr-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">School / University</label>
                      <input type="text" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Degree / Field of Study</label>
                      <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Start Year</label>
                        <input type="text" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">End Year</label>
                        <input type="text" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Form */}
          <section className="mb-8">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
              <button onClick={addSkill} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <input 
                    type="text" 
                    value={skill.name} 
                    onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                    className="bg-transparent outline-none w-28 text-sm"
                    placeholder="Skill name"
                  />
                  <button onClick={() => removeSkill(skill.id)} className="text-gray-400 hover:text-red-500 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* PREVIEW SECTION - Actual CV */}
        <div className="w-full xl:w-2/3 flex justify-center print:w-full print:block overflow-x-auto pb-8 print:pb-0">
          {/* A4 Paper Container */}
          <div className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[15mm] sm:p-[20mm] print:p-0 print:w-full shrink-0 relative">
            
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight uppercase">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-xl text-gray-600 mb-4 font-medium">{personalInfo.jobTitle || 'Your Job Title'}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
              <section className="mb-8 break-inside-avoid">
                <p className="text-gray-700 leading-relaxed text-sm text-justify">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Main Grid Layout for ATS + Print Friendly */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3 print:gap-8">
              
              {/* Left Column: Experience & Education (2/3 width) */}
              <div className="md:col-span-2 print:col-span-2 space-y-8">
                
                {/* Experience */}
                {experiences.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Briefcase size={18} className="text-gray-700" /> Experience
                    </h2>
                    <div className="space-y-6">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="break-inside-avoid">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-base font-bold text-gray-800">{exp.position}</h3>
                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap pl-4">
                              {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-gray-600 mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {educations.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap size={18} className="text-gray-700" /> Education
                    </h2>
                    <div className="space-y-4">
                      {educations.map((edu) => (
                        <div key={edu.id} className="break-inside-avoid">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-base font-bold text-gray-800">{edu.school}</h3>
                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap pl-4">
                              {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{edu.degree}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Right Column: Skills (1/3 width) */}
              <div className="md:col-span-1 print:col-span-1 space-y-8">
                
                {/* Skills */}
                {skills.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Code size={18} className="text-gray-700" /> Skills
                    </h2>
                    <div className="flex flex-col gap-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="text-sm text-gray-700 break-inside-avoid py-1.5 border-b border-gray-100 last:border-0 font-medium">
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Print Styles for Hiding non-printable areas and configuring page */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          html, body {
            width: 210mm;
            height: 297mm;
          }
          .break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}} />
    </div>
  );
}
