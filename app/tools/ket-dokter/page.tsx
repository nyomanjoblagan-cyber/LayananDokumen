'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Activity, CalendarDays, Pill
} from 'lucide-react';
import Link from 'next/link';

export default function KetDokterSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <MedicalNoteBuilder />
    </Suspense>
  );
}

function MedicalNoteBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    
    // FASILITAS KESEHATAN
    clinicName: 'KLINIK PRATAMA SEHAT BERSAMA',
    clinicAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
    
    // DATA PASIEN
    patientName: 'BAGUS RAMADHAN',
    patientJob: 'Karyawan Swasta',
    patientAge: '27 Tahun',

    // DATA MEDIS
    restingDays: '3 (Tiga)',
    startDate: '2026-01-08',
    endDate: '2026-01-10',
    diagnosis: 'Common Cold / Febris (Demam)',
    vitalSigns: 'TD: 110/80 mmHg | Temp: 38.2°C',

    // DOKTER
    doctorName: 'dr. I MADE WIRA, S.Ked',
    sipNumber: 'SIP. 445/088/DINKES/2024'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const NoteContent = () => (
    <div className="bg-white mx-auto box-border p-[15mm] text-slate-900 font-serif border border-slate-100 print:border-none shadow-sm print:shadow-none" 
         style={{ width: '210mm', minHeight: '148mm' }}>
      
      {/* KOP KLINIK */}
      <div className="flex items-center border-b-2 border-slate-900 pb-3 mb-6">
        <div className="bg-slate-900 text-white p-2 rounded mr-4">
          <Stethoscope size={24} />
        </div>
        <div className="flex-grow">
          <h1 className="text-[12pt] font-black uppercase tracking-tight">{data.clinicName}</h1>
          <p className="text-[8pt] font-sans italic">{data.clinicAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-6">
        <h2 className="text-md font-black underline uppercase tracking-widest leading-none">SURAT KETERANGAN SAKIT</h2>
      </div>

      {/* BODY SURAT */}
      <div className="text-[10.5pt] leading-relaxed space-y-4">
        <p>Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-6 space-y-1 font-sans text-[9.5pt] italic border-l-2 border-slate-100 pl-4">
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Nama Pasien</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Umur / Pekerjaan</span><span>:</span><span>{data.patientAge} / {data.patientJob}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Tanda Vital</span><span>:</span><span className="font-mono font-bold text-blue-700">{data.vitalSigns}</span></div>
        </div>

        <p>Berdasarkan hasil pemeriksaan medis, pasien tersebut dalam kondisi <b>kurang sehat (Sakit)</b> sehingga memerlukan istirahat selama:</p>

        <div className="text-center py-2 bg-slate-50 border-y border-dashed border-slate-300">
           <p className="text-[11pt] font-black">
             {data.restingDays} Hari
           </p>
           <p className="text-[9pt] font-sans">
             Terhitung mulai tanggal {new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle: 'long'})} s/d {new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}
           </p>
        </div>

        <p className="italic text-[9.5pt]">
          Diagnosis: <b>{data.diagnosis}</b>
        </p>

        <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagai ijin beristirahat/sakit.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-8 flex justify-end">
        <div className="text-center w-64">
          <p className="text-[10pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
          <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-16">Dokter Pemeriksa,</p>
          <p className="font-bold underline uppercase text-[10.5pt] leading-none">{data.doctorName}</p>
          <p className="text-[8pt] font-sans mt-1">SIP. {data.sipNumber}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
        }
      `}</style>

      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400">Medical <span className="text-white opacity-40">Note</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg">
            <Printer size={16} /> Print SKS
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[400px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Klinik</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="Tanda Vital (TD, Suhu)" />
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Pasien</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Pekerjaan" />
             </div>
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Durasi Istirahat</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-black" value={data.restingDays} onChange={e => handleDataChange('restingDays', e.target.value)} placeholder="Jumlah Hari" />
                <div className="grid grid-cols-2 gap-2">
                   <input type="date" className="w-full p-2.5 border rounded-xl text-[10px]" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                   <input type="date" className="w-full p-2.5 border rounded-xl text-[10px]" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                </div>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.9] xl:scale-100 transition-transform">
                <NoteContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <NoteContent />
      </div>
    </div>
  );
}