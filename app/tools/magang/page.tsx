'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, 
  LayoutTemplate, GraduationCap, Building2, 
  Briefcase, User, Eye, Edit3
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function MagangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
      <InternshipBuilder />
    </Suspense>
  );
}

function InternshipBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // --- STATE DATA ---
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    hrdName: 'HRD Manager',
    companyName: 'PT. Teknologi Masa Depan',
    companyAddress: 'Jl. Sudirman Kav. 50, Jakarta Selatan',
    name: 'Rian Pratama',
    idNumber: '2110114005', 
    institution: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    semester: '6 (Enam)',
    phone: '0812-3456-7890',
    email: 'rian.pratama@email.com',
    address: 'Jl. Margonda Raya No. 100, Depok',
    subject: 'Permohonan Kerja Praktik (KP)',
    position: 'IT Support / Web Developer',
    startDate: '',
    endDate: '',
    duration: '3 (Tiga) Bulan',
    skills: 'HTML, CSS, JavaScript (React.js), dan Basic SQL Database.',
    reason: 'Saya ingin menerapkan ilmu yang telah saya pelajari di bangku kuliah ke dalam dunia kerja nyata.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const threeMonthsLater = new Date(nextMonth);
    threeMonthsLater.setMonth(nextMonth.getMonth() + 3);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: nextMonth.toISOString().split('T')[0],
        endDate: threeMonthsLater.toISOString().split('T')[0]
    }));
  }, []);

  const formatDateIndo = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const applyPreset = (type: 'kuliah' | 'smk' | 'fresh') => {
    if (type === 'kuliah') {
      setData(prev => ({
        ...prev, subject: 'Permohonan Kerja Praktik (KP)', institution: 'Universitas Gadjah Mada', major: 'Manajemen', idNumber: '19/123456/EK/12345', semester: '6 (Enam)', position: 'Marketing Intern', skills: 'Digital Marketing, SEO Basic, Copywriting.', reason: 'Untuk memenuhi syarat kelulusan mata kuliah Kerja Praktik.'
      }));
    } else if (type === 'smk') {
      setData(prev => ({
        ...prev, subject: 'Permohonan PKL', institution: 'SMK Negeri 1 Surabaya', major: 'Teknik Mesin', idNumber: '12345678', semester: '4 (Empat)', position: 'Mekanik Magang', skills: 'Service Rutin, Ganti Oli, Tune Up.', reason: 'Sebagai syarat wajib kurikulum sekolah kejuruan (PKL).'
      }));
    } else if (type === 'fresh') {
      setData(prev => ({
        ...prev, subject: 'Lamaran Magang (Internship)', institution: 'Lulusan UB', major: 'Ilmu Komunikasi', idNumber: '-', semester: 'Alumni 2025', position: 'PR Intern', skills: 'Public Speaking, Social Media.', reason: 'Mencari pengalaman kerja profesional.'
      }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Formal (Kampus/SMK)", desc: "Format standar KP/PKL" },
    { id: 2, name: "Profesional (Fresh)", desc: "Menonjolkan skill" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const LetterContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-black text-[11pt] leading-normal p-[25mm] w-[210mm] min-h-[296mm] shadow-xl print:shadow-none print:m-0 print:p-[20mm]">
        <div className="text-[10.5pt] leading-snug flex flex-col h-full">
            <div className="flex justify-between items-start mb-6 shrink-0">
                <div>
                    <div className="mb-1">Perihal : <strong>{data.subject}</strong></div>
                    <div>Lampiran : 1 (Satu) Berkas</div>
                </div>
                <div className="text-right">{data.city}, {isClient && data.date ? formatDateIndo(data.date) : '...'}</div>
            </div>

            <div className="mb-6 shrink-0">
                <div>Yth. {data.hrdName}</div>
                <div className="font-bold">{data.companyName}</div>
                <div className="w-64 leading-tight">{data.companyAddress}</div>
            </div>

            <p className="mb-2">Dengan hormat,</p>
            <p className="mb-2 text-justify">Sehubungan dengan informasi program magang / kerja praktik yang tersedia di perusahaan Bapak/Ibu, saya yang bertanda tangan di bawah ini mengajukan permohonan untuk menempati posisi sebagai <strong>{data.position}</strong>.</p>
            <p className="mb-2 text-justify">Berikut adalah data diri saya:</p>

            <div className="ml-4 mb-4 shrink-0">
                <table className="w-full leading-none">
                    <tbody>
                        <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold uppercase py-0.5">{data.name}</td></tr>
                        <tr><td className="py-0.5">Asal Institusi</td><td className="py-0.5">:</td><td className="py-0.5">{data.institution}</td></tr>
                        <tr><td className="py-0.5">Jurusan</td><td className="py-0.5">:</td><td className="py-0.5">{data.major}</td></tr>
                        <tr><td className="py-0.5">NIM/NIS</td><td className="py-0.5">:</td><td className="py-0.5">{data.idNumber}</td></tr>
                        <tr><td className="py-0.5">Semester</td><td className="py-0.5">:</td><td className="py-0.5">{data.semester}</td></tr>
                        <tr><td className="py-0.5">No. HP/WA</td><td className="py-0.5">:</td><td className="py-0.5">{data.phone}</td></tr>
                        <tr><td className="py-0.5">Email</td><td className="py-0.5">:</td><td className="py-0.5">{data.email}</td></tr>
                        <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="flex-grow">
                <p className="mb-2 text-justify">Adapun waktu pelaksanaan magang yang saya ajukan adalah selama <strong>{data.duration}</strong>, terhitung mulai tanggal <strong>{isClient && data.startDate ? formatDateIndo(data.startDate) : '...'}</strong> sampai dengan <strong>{isClient && data.endDate ? formatDateIndo(data.endDate) : '...'}</strong> (atau menyesuaikan kebijakan perusahaan).</p>
                <p className="mb-2 text-justify">{data.reason} Saat ini saya memiliki kemampuan/skill di bidang: <strong>{data.skills}</strong> yang saya harap dapat berkontribusi bagi perusahaan.</p>
                <p className="mb-2 text-justify">Sebagai bahan pertimbangan, bersama surat ini saya lampirkan dokumen pendukung sebagai berikut:</p>
                <div className="ml-4 mb-6 text-sm">
                    <ol className="list-decimal ml-4 space-y-0.5">
                        <li>Curriculum Vitae (CV) Terbaru</li>
                        <li>Proposal Permohonan Magang</li>
                        <li>Transkrip Nilai Terakhir</li>
                        <li>Fotokopi Kartu Tanda Mahasiswa/Pelajar</li>
                        <li>Pas Foto Terbaru</li>
                    </ol>
                </div>
                <p className="mb-8 text-justify">Demikian surat permohonan ini saya buat. Besar harapan saya untuk dapat diterima dan belajar di perusahaan yang Bapak/Ibu pimpin. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.</p>
            </div>

            <div className="text-right mr-10 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                <p className="mb-20">Hormat saya,</p>
                <p className="font-bold underline uppercase">{data.name}</p>
                <p className="text-xs">{data.idNumber !== '-' ? `NIM/NIS. ${data.idNumber}` : ''}</p>
            </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <GraduationCap size={16} className="text-emerald-500" /> <span>INTERNSHIP LETTER BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              {/* Quick Generator */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <GraduationCap size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Preset)</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyPreset('kuliah')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><GraduationCap size={14}/> Mahasiswa</button>
                    <button onClick={() => applyPreset('smk')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><Briefcase size={14}/> SMK</button>
                    <button onClick={() => applyPreset('fresh')} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><User size={14}/> Fresh Grad</button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Tujuan</div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Yth (HRD/Pimpinan)</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.hrdName} onChange={e => handleDataChange('hrdName', e.target.value)} /></div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Nama Perusahaan</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} /></div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Alamat</label><textarea className="w-full p-2 border rounded text-xs h-16" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} /></div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Data Diri</div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Nama Lengkap</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Institusi</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Jurusan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.major} onChange={e => handleDataChange('major', e.target.value)} /></div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">NIM/NIS</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.idNumber} onChange={e => handleDataChange('idNumber', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Semester</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">No. HP</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Email</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.email} onChange={e => handleDataChange('email', e.target.value)} /></div>
                 </div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Alamat Rumah</label><textarea className="w-full p-2 border rounded text-xs h-12" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">Detail</div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Perihal</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.subject} onChange={e => handleDataChange('subject', e.target.value)} /></div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Posisi</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} /></div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Mulai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Selesai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Durasi (Teks)</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Skill</label><textarea className="w-full p-2 border rounded text-xs h-16" value={data.skills} onChange={e => handleDataChange('skills', e.target.value)} /></div>
                 <div><label className="text-[10px] font-bold uppercase text-slate-500">Alasan</label><textarea className="w-full p-2 border rounded text-xs h-20" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Kota</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold uppercase text-slate-500">Tanggal Surat</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               {/* LOGIKA SKALA */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <LetterContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <LetterContent />
         </div>
      </div>

    </div>
  );
}