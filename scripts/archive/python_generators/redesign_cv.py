import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\cv\index.tsx"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    start_tag = "  const DocumentContent = () => (\n    <Kertas templateId={templateId}>"
    end_tag = "    </Kertas>\n  );"
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find DocumentContent block")
        return

    new_document_content = """  const DocumentContent = () => (
    <Kertas templateId={templateId} className={templateId === 2 ? '!p-0' : ''}>
      {templateId === 1 ? (
        /* FORMAT 1: CLASSIC ATS-FRIENDLY (HARVARD STYLE) */
        <div className="text-black font-serif text-[10.5pt] leading-relaxed max-w-[800px] mx-auto">
          {/* Header */}
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

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6 break-inside-avoid">
              <p className="text-justify indent-8">{personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
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

          {/* Education */}
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

          {/* Skills */}
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
        /* FORMAT 2: MODERN CREATIVE SANS-SERIF */
        <div className="flex flex-col h-full bg-white text-slate-800 font-sans text-[10pt]">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-[15mm] flex flex-col justify-center break-inside-avoid h-[60mm]">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{personalInfo.fullName}</h1>
            <h2 className="text-xl font-medium text-emerald-400 uppercase tracking-widest mb-4">{personalInfo.jobTitle}</h2>
            <div className="flex flex-wrap gap-5 text-[9pt] text-slate-300 font-medium">
              {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> {personalInfo.phone}</div>}
              {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {personalInfo.location}</div>}
            </div>
          </div>

          <div className="flex-1 flex flex-row">
            {/* Left Column: Sidebar (Skills, Education) */}
            <div className="w-[70mm] bg-slate-50 p-[10mm] border-r border-slate-100 flex flex-col gap-8">
              
              {/* Education */}
              {educations.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-slate-900 mb-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center"><GraduationCap size={14} className="text-emerald-700"/></div>
                    Edukasi
                  </h3>
                  <div className="space-y-5">
                    {educations.map((edu) => (
                      <div key={edu.id} className="relative pl-3 border-l-2 border-emerald-200">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400 border-[1.5px] border-white"></div>
                        <h4 className="font-bold text-slate-800 text-[10pt] leading-tight mb-1">{edu.degree}</h4>
                        <div className="text-[9pt] text-slate-600 font-medium mb-1">{edu.school}</div>
                        <div className="text-[8pt] font-bold text-slate-400 uppercase">{edu.startDate} - {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-slate-900 mb-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center"><Code size={14} className="text-emerald-700"/></div>
                    Keahlian
                  </h3>
                  <div className="flex flex-col gap-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[9pt] font-bold shadow-sm flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Main Content (Summary, Experience) */}
            <div className="flex-1 p-[10mm] pl-[12mm] flex flex-col gap-8 bg-white">
              
              {/* Summary */}
              {personalInfo.summary && (
                <div className="break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center"><User size={14} className="text-emerald-700"/></div>
                    Profil Singkat
                  </h3>
                  <p className="leading-relaxed text-justify text-[10pt] text-slate-600 font-medium">{personalInfo.summary}</p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div>
                  <h3 className="text-[11pt] font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2 break-inside-avoid">
                    <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center"><Briefcase size={14} className="text-emerald-700"/></div>
                    Pengalaman Kerja
                  </h3>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[11pt] text-slate-900">{exp.position}</h4>
                          <span className="text-[8pt] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="font-bold text-slate-500 text-[10pt] mb-3">{exp.company}</div>
                        <p className="leading-relaxed text-[10pt] text-justify text-slate-600 whitespace-pre-line pl-3 border-l-2 border-slate-100">{exp.description}</p>
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
  );"""
    
    new_content = content[:start_idx] + new_document_content + content[end_idx:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
