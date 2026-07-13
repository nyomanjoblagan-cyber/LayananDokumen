'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Bed, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarRange, FileText,
  LayoutTemplate, ChevronDown, Edit3, RotateCcw,
  Stethoscope, Activity, MapPin, Phone
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN PRINT
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface InpatientData {
  // Kop Surat
  hospitalName: string;
  hospitalAddress: string;
  hospitalContact: string;
  
  // Dokumen
  docNo: string;
  
  // Data Pasien
  patientName: string;
  patientRm: string;
  patientDobAge: string;
  patientGender: string;
  patientJob: string;
  patientAddress: string;
  
  // Detail Perawatan
  admissionDate: string;
  dischargeDate: string;
  roomName: string;
  diagnosis: string;
  purpose: string;
  
  // Tanda Tangan
  doctorName: string;
  sipNumber: string;
  city: string;
  date: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InpatientData = {
  hospitalName: 'RSUD BALI MANDARA',
  hospitalAddress: 'Jl. Bypass Ngurah Rai No. 548, Sanur Kauh, Denpasar Selatan, Kota Denpasar, Bali 80227',
  hospitalContact: 'Telp: (0361) 4490566 | Email: info@rsbm.baliprov.go.id',
  
  docNo: 'SKRI/RSBM/2026/01/088',
  
  patientName: 'BAGUS RAMADHAN',
  patientRm: 'RM-889201',
  patientDobAge: 'Denpasar, 15 Mei 1999 / 27 Tahun',
  patientGender: 'Laki-laki',
  patientJob: 'Wiraswasta',
  patientAddress: 'Jl. Ahmad Yani Utara No. 100, Peguyangan, Denpasar Utara',
  
  admissionDate: '2026-01-05',
  dischargeDate: '2026-01-08',
  roomName: 'Ruang Amerta - Kamar 302',
  diagnosis: 'Demam Berdarah Dengue (DBD) derajat II',
  purpose: 'Klaim Asuransi Kesehatan dan Izin Istirahat Kerja',
  
  doctorName: 'dr. I MADE WIRA, Sp.PD',
  sipNumber: 'SIP. 445/112/DINKES/2024',
  city: 'Denpasar',
  date: '' 
};

export default function RawatInapPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <InpatientBuilder />
    </Suspense>
  );
}

function InpatientBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<InpatientData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof InpatientData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke data awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Medis Standar
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Sederhana
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Medis Standar' : 'Format Sederhana';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[11pt]'}`}>
        
        {/* KOP SURAT RUMAH SAKIT */}
        <div className="flex flex-col items-center border-b-[3px] border-black pb-4 mb-1 text-center shrink-0">
          <h1 className="text-[18pt] font-black uppercase leading-tight tracking-wide font-sans">{data.hospitalName}</h1>
          <p className="text-[10pt] mt-1 font-sans">{data.hospitalAddress}</p>
          <p className="text-[10pt] mt-0.5 font-sans">{data.hospitalContact}</p>
        </div>
        <div className="border-b-[1px] border-black w-full mb-8 shrink-0"></div>

        {/* JUDUL SURAT */}
        <div className="text-center mb-8 shrink-0 leading-tight">
          <h2 className="text-[14pt] font-bold underline uppercase tracking-wide">SURAT KETERANGAN RAWAT INAP</h2>
          <p className="text-[11pt] mt-1">Nomor: {data.docNo}</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-4 text-justify">
          <p>Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa:</p>
          
          <div className="ml-8 space-y-1.5 break-inside-avoid">
              <div className="flex">
                <span className="w-48 inline-block">Nama Pasien</span>
                <span className="w-4 inline-block">:</span>
                <span className="font-bold flex-1">{data.patientName}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">No. Rekam Medis</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.patientRm}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">Tempat/Tanggal Lahir / Umur</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.patientDobAge}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">Jenis Kelamin</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.patientGender}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">Pekerjaan</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.patientJob}</span>
              </div>
              <div className="flex align-top">
                <span className="w-48 inline-block shrink-0">Alamat</span>
                <span className="w-4 inline-block shrink-0">:</span>
                <span className="flex-1 leading-snug">{data.patientAddress}</span>
              </div>
          </div>

          <p className="pt-2">Adalah benar pasien tersebut telah dirawat inap di {data.hospitalName} dengan rincian sebagai berikut:</p>

          <div className="ml-8 space-y-1.5 break-inside-avoid">
              <div className="flex">
                <span className="w-48 inline-block">Tanggal Masuk</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{formatDateSafe(data.admissionDate)}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">Tanggal Keluar</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.dischargeDate ? formatDateSafe(data.dischargeDate) : 'Masih dalam perawatan'}</span>
              </div>
              <div className="flex">
                <span className="w-48 inline-block">Ruang Perawatan</span>
                <span className="w-4 inline-block">:</span>
                <span className="flex-1">{data.roomName}</span>
              </div>
              <div className="flex align-top">
                <span className="w-48 inline-block shrink-0">Diagnosa Medis Utama</span>
                <span className="w-4 inline-block shrink-0">:</span>
                <span className="flex-1 font-bold">{data.diagnosis}</span>
              </div>
          </div>

          <p className="pt-2">Surat keterangan rawat inap ini diberikan kepada yang bersangkutan untuk keperluan <strong>{data.purpose}</strong>.</p>
          <p>Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <div className="flex justify-end text-center">
              <div className="w-72 flex flex-col">
                 <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="mb-24">Dokter Penanggung Jawab Pelayanan (DPJP),</p>
                 <div>
                    <p className="font-bold underline">{data.doctorName}</p>
                    <p className="mt-1">SIP. {data.sipNumber}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Activity size={16} /> <span>Medical Certificate Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* EDITOR PANEL */}
        <div className={`no-print w-full md:w-[480px] bg-slate-50 border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-white font-sans">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-emerald-500" /> Form Input Medis</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 tooltip-trigger" title="Reset Data"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              
              {/* SECTION: RUMAH SAKIT */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={12}/> Informasi Instansi</h3>
                 
                 <div className="space-y-3">
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Rumah Sakit</label>
                     <input className="w-full p-2.5 border rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.hospitalName} onChange={e => handleDataChange('hospitalName', e.target.value)} />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                     <textarea className="w-full p-2.5 border rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.hospitalAddress} onChange={e => handleDataChange('hospitalAddress', e.target.value)} />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak (Telp/Email)</label>
                     <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.hospitalContact} onChange={e => handleDataChange('hospitalContact', e.target.value)} />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                     <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                   </div>
                 </div>
              </div>

              {/* SECTION: DATA PASIEN */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas Pasien</h3>
                 
                 <div className="space-y-3">
                   <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                        <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">No. Rekam Medis</label>
                        <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.patientRm} onChange={e => handleDataChange('patientRm', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                        <select className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.patientGender} onChange={e => handleDataChange('patientGender', e.target.value)}>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat/Tgl Lahir & Umur</label>
                     <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientDobAge} onChange={e => handleDataChange('patientDobAge', e.target.value)} />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                     <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                     <textarea className="w-full p-2.5 border rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} />
                   </div>
                 </div>
              </div>

              {/* SECTION: DATA RAWAT INAP */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-2 tracking-widest flex items-center gap-2"><Bed size={12}/> Data Perawatan</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Masuk</label>
                       <input type="date" className="w-full p-2.5 border rounded-lg text-sm" value={data.admissionDate} onChange={e => handleDataChange('admissionDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Keluar (Bisa Kosong)</label>
                       <input type="date" className="w-full p-2.5 border rounded-lg text-sm" value={data.dischargeDate} onChange={e => handleDataChange('dischargeDate', e.target.value)} />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Ruang Perawatan</label>
                    <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.roomName} onChange={e => handleDataChange('roomName', e.target.value)} />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Diagnosa Medis Utama</label>
                    <textarea className="w-full p-2.5 border rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-rose-500 outline-none font-medium" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Surat</label>
                    <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                 </div>
              </div>

              {/* SECTION: PENANDATANGAN */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Stethoscope size={12}/> DPJP & TTD</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penetapan</label>
                       <input className="w-full p-2.5 border rounded-lg text-sm" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                       <input type="date" className="w-full p-2.5 border rounded-lg text-sm" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Dokter (DPJP)</label>
                    <input className="w-full p-2.5 border rounded-lg text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. SIP</label>
                    <input className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className={`flex-1 h-full bg-slate-400 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV BUTTONS */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA CETAK & MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:block print:h-auto print:static w-full">
         <div className="bg-white w-full"><DocumentContent /></div>
      </div>
    </div>
  );
}