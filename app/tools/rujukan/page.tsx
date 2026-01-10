'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, HeartPulse, Activity,
  ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function RujukanMedisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <ReferralBuilder />
    </Suspense>
  );
}

function ReferralBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    docNo: 'REF/MED/BPJS/I/2026/012',
    faskesName: 'KLINIK PRATAMA WARGA SEHAT',
    faskesAddress: 'Jl. Teuku Umar No. 101, Denpasar, Bali',
    faskesPhone: '(0361) 998877',
    targetHospital: 'RSUP Prof. Dr. I.G.N.G. Ngoerah (Sanglah)',
    targetSpecialist: 'Spesialis Penyakit Dalam / Kardiologi',
    patientName: 'BAGUS RAMADHAN',
    patientNik: '5171010101990001',
    patientAge: '27 Tahun',
    patientGender: 'Laki-laki',
    bpjsNumber: '0001234567890',
    diagnosis: 'Suspect Coronary Artery Disease (CAD) / Angina Pektoris Tidak Stabil',
    medicalHistory: 'Nyeri dada kiri menjalar ke lengan kiri sejak 2 hari, sesak napas saat aktivitas berat. Riwayat hipertensi terkontrol.',
    vitalSigns: 'TD: 150/90 mmHg, HR: 98x/mnt, Temp: 36.5°C',
    doctorName: 'dr. I MADE WIRA, S.Ked',
    sipNumber: 'SIP. 445/088/DINKES/2024'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format Formal", desc: "Layout standar klinik/RS" },
    { id: 2, name: "Format Ringkas", desc: "Layout hemat ruang & lugas" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP KLINIK / FASKES */}
      <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0 text-center">
        <div className="flex-grow">
           <h1 className="text-[16pt] font-black leading-tight uppercase tracking-tighter italic">{data.faskesName}</h1>
           <p className="text-[9pt] font-sans mt-1 italic leading-tight text-slate-600 print:text-black">{data.faskesAddress} | Telp: {data.faskesPhone}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT RUJUKAN PASIEN</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow space-y-6 overflow-hidden text-left">
        <div className="leading-relaxed">
          <p>Yth. Sejawat Dokter,</p>
          <p>Bagian <b>{data.targetSpecialist}</b></p>
          <p>Di <b>{data.targetHospital}</b></p>
        </div>

        <p>Mohon pemeriksaan dan penanganan lebih lanjut terhadap pasien:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-blue-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Pasien</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. BPJS</span><span>:</span><span>{data.patientNik} / {data.bpjsNumber}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Umur / Kelamin</span><span>:</span><span>{data.patientAge} / {data.patientGender}</span></div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-transparent print:border-black">
             <p className="font-bold text-[9pt] uppercase text-blue-700 print:text-black mb-1 tracking-widest">Diagnosis Sementara:</p>
             <p className="italic font-bold">"{data.diagnosis}"</p>
          </div>

          <div className="grid grid-cols-1 gap-4 font-sans text-[10pt]">
             <div>
                <p className="font-bold underline mb-1 italic">Anamnesa & Pemeriksaan Fisik:</p>
                <p className="text-slate-700 print:text-black leading-relaxed text-justify">{data.medicalHistory}</p>
             </div>
             <div>
                <p className="font-bold underline mb-1 italic">Tanda Vital (Vital Signs):</p>
                <p className="bg-white border p-2 rounded inline-block font-mono text-blue-800 print:text-black border-slate-300">{data.vitalSigns}</p>
             </div>
          </div>
        </div>

        <p className="mt-4">Demikian rujukan ini kami sampaikan, atas kerja sama dan bantuannya kami ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="flex justify-end text-center">
            <div className="w-72 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Dokter Pemeriksa,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.doctorName}</p>
                  <p className="text-[9pt] font-sans mt-1">SIP. {data.sipNumber}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-tighter italic">
               <HeartPulse size={16} /> <span>Medical Referral Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 font-sans overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative font-sans">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
              <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Faskes Pengirim</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.faskesName} onChange={e => handleDataChange('faskesName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Surat" />
              <input className="w-full p-2 border rounded text-xs" value={data.targetHospital} onChange={e => handleDataChange('targetHospital', e.target.value)} placeholder="RS Tujuan" />
              <input className="w-full p-2 border rounded text-xs" value={data.targetSpecialist} onChange={e => handleDataChange('targetSpecialist', e.target.value)} placeholder="Spesialis Tujuan" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left font-sans">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pasien</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.patientNik} onChange={e => handleDataChange('patientNik', e.target.value)} placeholder="NIK" />
                 <input className="w-full p-2 border rounded text-xs" value={data.bpjsNumber} onChange={e => handleDataChange('bpjsNumber', e.target.value)} placeholder="No. BPJS" />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Activity size={12}/> Medis</h3>
              <input className="w-full p-2 border rounded text-xs font-bold text-rose-600" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosis" />
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.medicalHistory} onChange={e => handleDataChange('medicalHistory', e.target.value)} placeholder="Keterangan Klinis" />
              <input className="w-full p-2 border rounded text-xs font-mono" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="Tanda Vital" />
              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}