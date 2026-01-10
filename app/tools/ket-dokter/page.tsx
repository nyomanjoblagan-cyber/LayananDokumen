'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  CalendarDays, Check, ChevronDown, LayoutTemplate, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function KetDokterSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <MedicalNoteBuilder />
    </Suspense>
  );
}

function MedicalNoteBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    clinicName: 'KLINIK PRATAMA SEHAT BERSAMA',
    clinicAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
    patientName: 'BAGUS RAMADHAN',
    patientJob: 'Karyawan Swasta',
    patientAge: '27 Tahun',
    restingDays: '3 (Tiga)',
    startDate: '',
    endDate: '',
    diagnosis: 'Common Cold / Febris (Demam)',
    vitalSigns: 'TD: 110/80 mmHg | Temp: 38.2°C',
    doctorName: 'dr. I MADE WIRA, S.Ked',
    sipNumber: 'SIP. 445/088/DINKES/2024'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 2);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: threeDaysLater.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format Klinik (A5)", desc: "Ukuran kecil (14.8cm x 21cm)" },
    { id: 2, name: "Format RS (A4)", desc: "Ukuran standar (21cm x 29.7cm)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const NoteContent = () => {
    // TENTUKAN UKURAN BERDASARKAN TEMPLATE
    // Template 1 (A5): Width 148mm, Height 210mm
    // Template 2 (A4): Width 210mm, Height 297mm
    const paperClass = templateId === 1 
        ? "w-[148mm] min-h-[210mm] p-[10mm] text-[10pt]" // A5 lebih compact
        : "w-[210mm] min-h-[297mm] p-[20mm] text-[11pt]"; // A4 standar

    return (
      <div className={`bg-white mx-auto flex flex-col box-border font-serif text-slate-900 leading-snug shadow-2xl print:shadow-none print:m-0 ${paperClass}`}>
        
        {/* KOP KLINIK */}
        <div className="flex items-center border-b-2 border-slate-900 pb-2 mb-4 shrink-0">
          <div className="bg-slate-900 text-white p-1.5 rounded mr-3 print:text-black print:border print:border-black print:bg-transparent">
            <Stethoscope size={20} />
          </div>
          <div className="flex-grow">
            <h1 className="text-[11pt] font-black uppercase tracking-tight leading-none mb-1">{data.clinicName}</h1>
            <p className="text-[8pt] font-sans italic text-slate-600 print:text-black leading-none">{data.clinicAddress}</p>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-4 shrink-0">
          <h2 className="text-[12pt] font-black underline uppercase tracking-widest leading-none">SURAT KETERANGAN SAKIT</h2>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow">
          <p className="mb-2">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-2 mb-3 space-y-0.5 font-sans text-[9pt] italic border-l-2 border-slate-200 pl-3 py-1">
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Umur</span><span>:</span><span>{data.patientAge}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.patientJob}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Tanda Vital</span><span>:</span><span className="font-mono font-bold text-blue-700 print:text-black">{data.vitalSigns}</span></div>
          </div>

          <p className="mb-3 text-justify">Berdasarkan hasil pemeriksaan medis, pasien tersebut dalam kondisi <b>kurang sehat (Sakit)</b> sehingga memerlukan istirahat selama:</p>

          <div className="text-center py-2 mb-3 bg-slate-50 border border-slate-300 rounded print:bg-transparent print:border-black">
             <p className="text-[12pt] font-black">
               {data.restingDays} Hari
             </p>
             <p className="text-[9pt] font-sans">
               {isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '...'} s/d {isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '...'}
             </p>
          </div>

          <p className="italic text-[9pt] mb-2">
            Diagnosis: <b>{data.diagnosis}</b>
          </p>

          <p className="text-justify">Demikian surat keterangan ini dibuat untuk dipergunakan sebagai ijin beristirahat/sakit.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-6 flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-center w-40">
            <p className="text-[9pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
            <p className="text-[8pt] font-bold text-slate-500 uppercase tracking-widest mb-12 print:text-black">Dokter Pemeriksa,</p>
            <p className="font-bold underline uppercase text-[10pt] leading-none">{data.doctorName}</p>
            <p className="text-[7pt] font-sans mt-0.5 font-bold">SIP. {data.sipNumber}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { 
            size: ${templateId === 1 ? 'A5' : 'A4'}; 
            margin: 0; 
          }
          html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
          }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
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
               <Stethoscope size={16} className="text-blue-500" /> <span>MEDICAL NOTE BUILDER</span>
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

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={12}/> Klinik</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} placeholder="Alamat Klinik" />
                 <input className="w-full p-2 border rounded text-xs" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="Tanda Vital (TD, Suhu)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pasien</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Umur" />
                    <input className="w-full p-2 border rounded text-xs" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Pekerjaan" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Durasi Istirahat</h3>
                 <input className="w-full p-2 border rounded text-xs font-black" value={data.restingDays} onChange={e => handleDataChange('restingDays', e.target.value)} placeholder="Jumlah Hari" />
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosa" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                 <input className="w-full p-2 border rounded text-xs" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="No SIP" />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Praktek" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               {/* LOGIKA SKALA:
                  - Mobile: scale-[0.55] dan margin negatif untuk A5 yang lebih pendek.
               */}
               <div className={`origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 shadow-2xl flex flex-col items-center ${templateId === 1 ? 'mb-[-90mm] md:mb-[-40mm] lg:mb-0' : 'mb-[-130mm] md:mb-[-20mm] lg:mb-0'}`}>
                 <div style={{ width: templateId === 1 ? '148mm' : '210mm' }}>
                    <NoteContent />
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
            <NoteContent />
         </div>
      </div>

    </div>
  );
}