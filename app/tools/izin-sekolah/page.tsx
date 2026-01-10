'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Calendar, Stethoscope, MessageCircle, Check, ChevronDown, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Sekolah...</div>}>
      <SchoolPermitBuilder />
    </Suspense>
  );
}

function SchoolPermitBuilder() {
  // --- STATE SYSTEM (SAMA DENGAN FILE SEBELUMNYA) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    schoolName: 'SMP Negeri 1 Jakarta',
    teacherName: 'Bapak/Ibu Wali Kelas 7A',
    studentName: 'Muhammad Rizky',
    studentClass: '7A',
    studentNis: '12345',
    reasonType: 'Sakit',
    reasonDetail: 'sedang sakit demam tinggi dan flu',
    startDate: '',
    endDate: '',
    duration: '1 (Satu)',
    parentName: 'Budi Santoso',
    parentPhone: '0812-3456-7890'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today,
        startDate: today,
        endDate: today 
    }));
  }, []);

  // HELPER DATE
  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '...';
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  // PRESETS
  const applyPreset = (type: 'sakit' | 'acara' | 'duka') => {
    if (type === 'sakit') {
      setData(prev => ({
        ...prev,
        reasonType: 'Sakit',
        reasonDetail: 'sedang dalam kondisi kurang sehat (Demam/Flu) dan disarankan istirahat.'
      }));
    } else if (type === 'acara') {
      setData(prev => ({
        ...prev,
        reasonType: 'Izin',
        reasonDetail: 'ada kepentingan keluarga (Pernikahan Saudara Kandung) di luar kota.'
      }));
    } else if (type === 'duka') {
      setData(prev => ({
        ...prev,
        reasonType: 'Izin',
        reasonDetail: 'sedang berduka cita atas meninggalnya Kakek/Nenek kami.'
      }));
    }
  };

  // COPY WA FUNCTION
  const copyToWhatsApp = () => {
    const text = `Assalamu’alaikum Wr. Wb.

Yth. ${data.teacherName}
${data.schoolName}

Dengan ini kami selaku orang tua/wali murid memberitahukan bahwa anak kami:

Nama: ${data.studentName}
Kelas: ${data.studentClass}

Hari ini, ${formatDateIndo(data.startDate)}, tidak dapat mengikuti kegiatan belajar mengajar dikarenakan ${data.reasonDetail}.

Mohon kiranya Bapak/Ibu dapat memberikan izin. Atas perhatiannya kami ucapkan terima kasih.

Wassalamu’alaikum Wr. Wb.

Hormat kami,
${data.parentName}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TEMPLATES = [
    { id: 1, name: "Format Surat Resmi (PDF)", desc: "Standar surat izin sekolah formal" },
    { id: 2, name: "Format Surat Dokter (Lampiran)", desc: "Layout khusus jika melampirkan surat dokter" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {/* TEMPLATE 1: SURAT RESMI */}
        {templateId === 1 && (
            <>
                <div className="text-right mb-8 shrink-0">
                   {data.city}, {formatDateIndo(data.date)}
                </div>

                <div className="mb-8 leading-snug shrink-0">
                   <div>Yth. {data.teacherName}</div>
                   <div className="font-bold">{data.schoolName}</div>
                   <div>di Tempat</div>
                </div>

                <div className="space-y-4 flex-grow">
                   <p>Dengan hormat,</p>
                   <p>Yang bertanda tangan di bawah ini, saya orang tua/wali murid dari:</p>

                   <div className="ml-8 mb-4">
                      <table className="w-full leading-relaxed">
                         <tbody>
                            <tr><td className="w-32">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                            <tr><td>Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                            {data.studentNis && <tr><td>NIS</td><td>:</td><td>{data.studentNis}</td></tr>}
                         </tbody>
                      </table>
                   </div>

                   <p className="text-justify leading-relaxed">
                      Dengan ini memberitahukan bahwa anak kami tersebut di atas tidak dapat mengikuti kegiatan belajar mengajar di sekolah seperti biasa, terhitung mulai hari <strong>{formatDateIndo(data.startDate)}</strong> sampai dengan <strong>{formatDateIndo(data.endDate)}</strong> ({data.duration} hari).
                   </p>

                   <p className="text-justify leading-relaxed">
                      Hal tersebut dikarenakan anak kami {data.reasonDetail}.
                   </p>

                   <p>Demikian surat izin ini kami sampaikan. Atas perhatian dan izin yang diberikan Bapak/Ibu Guru, kami ucapkan terima kasih.</p>
                </div>

                <div className="flex justify-end text-center mt-8 mb-4" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-64">
                      <p className="mb-24">Hormat kami,</p>
                      <p className="font-bold underline uppercase">{data.parentName}</p>
                      <p className="text-sm">{data.parentPhone}</p>
                   </div>
                </div>
            </>
        )}

        {/* TEMPLATE 2: DENGAN SURAT DOKTER */}
        {templateId === 2 && (
            <>
                <div className="text-right mb-8 shrink-0">
                   {data.city}, {formatDateIndo(data.date)}
                </div>

                <div className="mb-8 leading-snug shrink-0">
                   <div>Kepada Yth,</div>
                   <div className="font-bold">{data.teacherName}</div>
                   <div>{data.schoolName}</div>
                   <div>di Tempat</div>
                </div>

                <div className="space-y-4 flex-grow">
                   <p>Dengan hormat,</p>
                   <p>Saya yang bertanda tangan di bawah ini selaku orang tua/wali dari siswa:</p>

                   <div className="ml-8 mb-4">
                      <table className="w-full leading-relaxed">
                         <tbody>
                            <tr><td className="w-32">Nama Lengkap</td><td className="w-4">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                            <tr><td>Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                         </tbody>
                      </table>
                   </div>

                   <p className="text-justify leading-relaxed">
                      Memberitahukan bahwa siswa tersebut tidak dapat masuk sekolah dan mengikuti pelajaran sebagaimana mestinya pada tanggal <strong>{formatDateIndo(data.startDate)}</strong> dikarenakan <strong>SAKIT</strong>.
                   </p>

                   <div className="my-6 p-4 border border-black bg-slate-50 print:bg-transparent italic text-sm text-center">
                      (Bersama surat ini, kami lampirkan Surat Keterangan Sakit dari Dokter)
                   </div>

                   <p>
                      Kami memohon permakluman dan izin dari Bapak/Ibu Guru Wali Kelas. Demikian surat ini kami buat dengan sebenar-benarnya. Atas perhatiannya kami ucapkan terima kasih.
                   </p>
                </div>

                <div className="flex justify-end text-center mt-8 mb-4" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-64">
                      <p className="mb-24">Hormat kami,<br/>Orang Tua / Wali Murid</p>
                      <p className="font-bold border-b border-black inline-block px-4 uppercase">{data.parentName}</p>
                   </div>
                </div>
            </>
        )}
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
               <User size={16} className="text-emerald-500" /> <span>SCHOOL PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={copyToWhatsApp} className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg border border-green-500 text-xs font-bold transition-colors">
               {copied ? <Check size={16}/> : <MessageCircle size={16}/>} 
               {copied ? 'Tersalin!' : 'Copy WA'}
            </button>
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
        {/* LOGIC: Jika Mobile & Preview aktif, Sidebar HIDDEN total. */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              {/* Quick Preset */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <Stethoscope size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Alasan</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyPreset('sakit')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <Stethoscope size={14}/> Sakit
                    </button>
                    <button onClick={() => applyPreset('acara')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <Calendar size={14}/> Acara
                    </button>
                    <button onClick={() => applyPreset('duka')} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <User size={14}/> Duka
                    </button>
                 </div>
              </div>

              {/* Data Surat */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <LayoutTemplate size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Data Surat</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Buat</label>
                          <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Sekolah</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.schoolName} onChange={e => handleDataChange('schoolName', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan (Kepada)</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.teacherName} onChange={e => handleDataChange('teacherName', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* Siswa & Alasan */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <User size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Siswa & Alasan</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Siswa</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kelas</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.studentClass} onChange={e => handleDataChange('studentClass', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">NIS (Opsional)</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.studentNis} onChange={e => handleDataChange('studentNis', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan (Detail)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.reasonDetail} onChange={e => handleDataChange('reasonDetail', e.target.value)} />
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                       <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                             <label className="text-[10px] font-bold text-blue-700 uppercase">Mulai Tanggal</label>
                             <input type="date" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                          </div>
                          <div>
                             <label className="text-[10px] font-bold text-blue-700 uppercase">Sampai Tanggal</label>
                             <input type="date" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                          </div>
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-blue-700 uppercase">Lama Izin (Hari)</label>
                          <input type="text" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Orang Tua */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <User size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Orang Tua / Wali</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Orang Tua</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP (Opsional)</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentPhone} onChange={e => handleDataChange('parentPhone', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA (RESPONSIVE TOGGLE) */}
        {/* LOGIC: Jika Mobile & Editor aktif, Preview HIDDEN total. */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               
               {/* LOGIKA SKALA:
                  - Mobile: scale-[0.55] dan margin bawah negatif besar (-130mm) agar pas.
                  - Tablet: scale-[0.85].
                  - PC: scale-100.
               */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <DocumentContent />
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
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}