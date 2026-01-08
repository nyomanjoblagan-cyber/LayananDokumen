'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Calendar, Stethoscope, MessageCircle, Check, ChevronDown, Copy
} from 'lucide-react';
import Link from 'next/link';

export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Sekolah...</div>}>
      <SchoolPermitBuilder />
    </Suspense>
  );
}

function SchoolPermitBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0], // Tanggal tulis surat
    
    // TUJUAN
    schoolName: 'SMP Negeri 1 Jakarta',
    teacherName: 'Bapak/Ibu Wali Kelas 7A',
    
    // SISWA
    studentName: 'Muhammad Rizky',
    studentClass: '7A',
    studentNis: '12345',
    
    // ALASAN
    reasonType: 'Sakit', // Sakit / Izin
    reasonDetail: 'sedang sakit demam tinggi dan flu',
    
    // WAKTU
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    duration: '1 (Satu)',
    
    // ORTU
    parentName: 'Budi Santoso',
    parentPhone: '0812-3456-7890'
  });

  // HELPER DATE
  const formatDateIndo = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // HANDLERS
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

  // --- KOMPONEN KERTAS A4 (STABIL) ---
  const KertasA4 = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white shadow-xl w-[210mm] min-h-[297mm] p-[25mm] text-[#1e293b] font-serif text-[11pt] leading-relaxed text-justify relative box-border mx-auto mb-10 print:mb-0 print:shadow-none print:w-full print:min-h-0 print:h-auto print:p-[20mm]">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { background: white; margin: 0; padding: 0; }
          header, nav, footer, .no-print, .sidebar-control { display: none !important; }
          .preview-container { 
             display: block !important; 
             overflow: visible !important; 
             height: auto !important; 
             padding: 0 !important;
             background: white !important;
          }
          table, th, td { border-color: #000 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Izin Sekolah</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={copyToWhatsApp} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg border border-green-500 text-xs font-bold transition-colors">
              {copied ? <Check size={16}/> : <MessageCircle size={16}/>} 
              {copied ? 'Tersalin!' : 'Copy WA'}
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
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
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 sidebar-control">
          
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

          {/* Data Siswa & Alasan */}
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

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto preview-container">
          
          <div className="flex flex-col items-center gap-8 print:block print:gap-0">
            
            {/* TEMPLATE 1: SURAT RESMI */}
            {templateId === 1 && (
              <KertasA4>
                 <div className="text-right mb-8">
                    {data.city}, {formatDateIndo(data.date)}
                 </div>

                 <div className="mb-8 leading-snug">
                    <div>Yth. {data.teacherName}</div>
                    <div className="font-bold">{data.schoolName}</div>
                    <div>di Tempat</div>
                 </div>

                 <p className="mb-4">Dengan hormat,</p>

                 <p className="mb-4">
                    Yang bertanda tangan di bawah ini, saya orang tua/wali murid dari:
                 </p>

                 <div className="ml-8 mb-6">
                    <table className="w-full leading-relaxed">
                       <tbody>
                          <tr><td className="w-32">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                          <tr><td>Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                          {data.studentNis && <tr><td>NIS</td><td>:</td><td>{data.studentNis}</td></tr>}
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4">
                    Dengan ini memberitahukan bahwa anak kami tersebut di atas tidak dapat mengikuti kegiatan belajar mengajar di sekolah seperti biasa, terhitung mulai hari <strong>{formatDateIndo(data.startDate)}</strong> sampai dengan <strong>{formatDateIndo(data.endDate)}</strong> ({data.duration} hari).
                 </p>

                 <p className="mb-4">
                    Hal tersebut dikarenakan anak kami {data.reasonDetail}.
                 </p>

                 <p className="mb-12">
                    Demikian surat izin ini kami sampaikan. Atas perhatian dan izin yang diberikan Bapak/Ibu Guru, kami ucapkan terima kasih.
                 </p>

                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-64">
                       <p className="mb-24">Hormat kami,</p>
                       <p className="font-bold underline uppercase">{data.parentName}</p>
                       <p className="text-sm">{data.parentPhone}</p>
                    </div>
                 </div>
              </KertasA4>
            )}

            {/* TEMPLATE 2: DENGAN SURAT DOKTER */}
            {templateId === 2 && (
              <KertasA4>
                 <div className="text-right mb-8">
                    {data.city}, {formatDateIndo(data.date)}
                 </div>

                 <div className="mb-8 leading-snug">
                    <div>Kepada Yth,</div>
                    <div className="font-bold">{data.teacherName}</div>
                    <div>{data.schoolName}</div>
                    <div>di Tempat</div>
                 </div>

                 <p className="mb-4">Dengan hormat,</p>

                 <p className="mb-4">
                    Saya yang bertanda tangan di bawah ini selaku orang tua/wali dari siswa:
                 </p>

                 <div className="ml-8 mb-6">
                    <table className="w-full leading-relaxed">
                       <tbody>
                          <tr><td className="w-32">Nama Lengkap</td><td className="w-4">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                          <tr><td>Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4">
                    Memberitahukan bahwa siswa tersebut tidak dapat masuk sekolah dan mengikuti pelajaran sebagaimana mestinya pada tanggal <strong>{formatDateIndo(data.startDate)}</strong> dikarenakan <strong>SAKIT</strong>.
                 </p>

                 <div className="mb-4 p-4 border border-black bg-slate-50 print:bg-transparent italic text-sm text-center">
                    (Bersama surat ini, kami lampirkan Surat Keterangan Sakit dari Dokter)
                 </div>

                 <p className="mb-12">
                    Kami memohon permakluman dan izin dari Bapak/Ibu Guru Wali Kelas. Demikian surat ini kami buat dengan sebenar-benarnya. Atas perhatiannya kami ucapkan terima kasih.
                 </p>

                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-64">
                       <p className="mb-24">Hormat kami,<br/>Orang Tua / Wali Murid</p>
                       <p className="font-bold border-b border-black inline-block px-4 uppercase">{data.parentName}</p>
                    </div>
                 </div>
              </KertasA4>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}