'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, HeartPulse, Activity
} from 'lucide-react';
import Link from 'next/link';

export default function RujukanMedisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Rujukan...</div>}>
      <ReferralBuilder />
    </Suspense>
  );
}

function ReferralBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'REF/MED/BPJS/I/2026/012',
    
    // FASILITAS KESEHATAN (PENGIRIM)
    faskesName: 'KLINIK PRATAMA WARGA SEHAT',
    faskesAddress: 'Jl. Teuku Umar No. 101, Denpasar, Bali',
    faskesPhone: '(0361) 998877',

    // TUJUAN RUJUKAN
    targetHospital: 'RSUP Prof. Dr. I.G.N.G. Ngoerah (Sanglah)',
    targetSpecialist: 'Spesialis Penyakit Dalam / Kardiologi',

    // DATA PASIEN
    patientName: 'BAGUS RAMADHAN',
    patientNik: '5171010101990001',
    patientAge: '27 Tahun',
    patientGender: 'Laki-laki',
    bpjsNumber: '0001234567890',

    // DATA MEDIS
    diagnosis: 'Suspect Coronary Artery Disease (CAD) / Angina Pektoris Tidak Stabil',
    medicalHistory: 'Nyeri dada kiri menjalar ke lengan kiri sejak 2 hari, sesak napas saat aktivitas berat. Riwayat hipertensi terkontrol.',
    vitalSigns: 'TD: 150/90 mmHg, HR: 98x/mnt, Temp: 36.5°C',
    
    // DOKTER
    doctorName: 'dr. I MADE WIRA, S.Ked',
    sipNumber: 'SIP. 445/088/DINKES/2024'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ReferralContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP KLINIK / FASKES */}
      <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           <div className="flex-grow">
              <h1 className="text-[14pt] font-black leading-tight uppercase tracking-tighter italic">{data.faskesName}</h1>
              <p className="text-[9pt] font-sans mt-1 italic leading-tight">{data.faskesAddress} | Telp: {data.faskesPhone}</p>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT RUJUKAN PASIEN</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <div className="mb-6">
          <p>Yth. Sejawat Dokter,</p>
          <p>Bagian <b>{data.targetSpecialist}</b></p>
          <p>Di <b>{data.targetHospital}</b></p>
        </div>

        <p className="mb-4">Mohon pemeriksaan dan penanganan lebih lanjut terhadap pasien:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[9.5pt] border-l-4 border-blue-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Pasien</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. BPJS</span><span>:</span><span>{data.patientNik} / {data.bpjsNumber}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Umur / Kelamin</span><span>:</span><span>{data.patientAge} / {data.patientGender}</span></div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <p className="font-bold text-[9pt] uppercase text-blue-700 mb-1 tracking-widest">Diagnosis Sementara:</p>
             <p className="italic font-bold">"{data.diagnosis}"</p>
          </div>

          <div className="grid grid-cols-1 gap-4 font-sans text-[9.5pt]">
             <div>
                <p className="font-bold underline mb-1 italic">Anamnesa & Pemeriksaan Fisik:</p>
                <p className="text-slate-700 leading-relaxed">{data.medicalHistory}</p>
             </div>
             <div>
                <p className="font-bold underline mb-1 italic">Tanda Vital (Vital Signs):</p>
                <p className="bg-white border p-2 rounded inline-block font-mono text-blue-800">{data.vitalSigns}</p>
             </div>
          </div>
        </div>

        <p className="mt-8">
          Demikian rujukan ini kami sampaikan, atas kerja sama dan bantuannya kami ucapkan terima kasih.
        </p>
      </div>

      {/* TANDA TANGAN (TABLE BASED) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="text-[10pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20">Dokter Pemeriksa,</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[10.5pt]">{data.doctorName}</p>
                   <p className="text-[8pt] font-sans text-slate-500">{data.sipNumber}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-rose-400 italic flex items-center gap-2">
               <HeartPulse size={18} /> Med-Referral <span className="text-white not-italic opacity-40 font-normal italic">Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Rujukan
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Faskes Pengirim</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.faskesName} onChange={e => handleDataChange('faskesName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.targetHospital} onChange={e => handleDataChange('targetHospital', e.target.value)} placeholder="RS Tujuan" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pasien</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.bpjsNumber} onChange={e => handleDataChange('bpjsNumber', e.target.value)} placeholder="No. Kartu BPJS" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Activity size={12}/> Diagnosis & Vital Signs</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold text-rose-600" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosis" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.medicalHistory} onChange={e => handleDataChange('medicalHistory', e.target.value)} placeholder="Anamnesa..." />
                <input className="w-full p-3 border rounded-xl text-xs font-mono" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="TD / HR / Temp" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <ReferralContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ReferralContent />
      </div>
    </div>
  );
}