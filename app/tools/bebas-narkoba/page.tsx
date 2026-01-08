'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, UserCircle2, 
  FlaskConical, CalendarDays, ClipboardCheck, Landmark, Search
} from 'lucide-react';
import Link from 'next/link';

export default function BebasNarkobaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Laboratorium...</div>}>
      <DrugTestBuilder />
    </Suspense>
  );
}

function DrugTestBuilder() {
  const [data, setData] = useState({
    city: 'Surabaya',
    date: new Date().toISOString().split('T')[0],
    docNo: 'LAK/BN/2026/01/055',
    
    // PEMERIKSA (LAB/KLINIK)
    clinicName: 'KLINIK MEDIKA PRATAMA',
    clinicAddress: 'Jl. Raya Darmo No. 120, Surabaya, Jawa Timur',
    examinerName: 'dr. Hendra Setiawan, Sp.PK',
    examinerNip: '19850412 201503 1 002',

    // PASIEN
    patientName: 'RIZKY RAMADHAN',
    patientNik: '3578010101980005',
    patientAddress: 'Jl. Gubeng Kertajaya V No. 10, Surabaya',
    patientJob: 'Mahasiswa / Calon Karyawan',
    
    // HASIL TES (6 PARAMETER STANDAR)
    results: [
      { parameter: 'Amphetamine (AMP)', result: 'NEGATIF' },
      { parameter: 'Methamphetamine (MET)', result: 'NEGATIF' },
      { parameter: 'Cocaine (COC)', result: 'NEGATIF' },
      { parameter: 'Morphine (MOP)', result: 'NEGATIF' },
      { parameter: 'Marijuana (THC)', result: 'NEGATIF' },
      { parameter: 'Benzodiazepines (BZO)', result: 'NEGATIF' },
    ],
    
    purpose: 'Persyaratan Melamar Pekerjaan / Pendaftaran Studi.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ReportContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-serif text-[11pt] leading-normal text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP KLINIK */}
      <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="p-3 bg-blue-600 text-white rounded-full shrink-0">
           <FlaskConical size={32} />
        </div>
        <div className="flex-grow">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.clinicName}</h1>
           <p className="text-[9pt] font-sans mt-1 text-slate-500 font-bold uppercase tracking-widest">Laboratorium & Medical Check Up Center</p>
           <p className="text-[8pt] font-sans text-slate-400">{data.clinicAddress}</p>
        </div>
      </div>

      <div className="text-center mb-8 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT KETERANGAN BEBAS NARKOBA</h2>
        <p className="text-[10pt] font-sans mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="space-y-6 flex-grow">
        <p className="text-justify italic">Berdasarkan pemeriksaan laboratorium urin yang telah dilakukan secara teliti terhadap:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-sm">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.patientNik}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.patientJob}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.patientAddress}</span></div>
        </div>

        <div className="mt-6">
           <h4 className="text-center font-bold font-sans text-xs uppercase mb-3 tracking-widest bg-slate-100 py-1">Hasil Pemeriksaan Laboratorium</h4>
           <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
              <thead>
                 <tr className="bg-slate-50 uppercase">
                    <th className="border border-slate-300 p-2 text-left">Parameter Tes</th>
                    <th className="border border-slate-300 p-2 text-center w-32">Metode</th>
                    <th className="border border-slate-300 p-2 text-center w-32">Hasil</th>
                 </tr>
              </thead>
              <tbody>
                 {data.results.map((r, i) => (
                    <tr key={i}>
                       <td className="border border-slate-300 p-2">{r.parameter}</td>
                       <td className="border border-slate-300 p-2 text-center text-slate-400 uppercase text-[9px]">Rapid Test Kit</td>
                       <td className="border border-slate-300 p-2 text-center font-black text-emerald-600">{r.result}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="space-y-4 pt-4">
           <p className="text-justify font-sans text-[10pt] leading-relaxed">
              Menerangkan bahwa pada saat dilakukan pemeriksaan, yang bersangkutan dinyatakan <b>BEBAS / NEGATIF</b> dari penyalahgunaan Narkotika, Psikotropika, dan Zat Adiktif lainnya.
           </p>
           <p className="text-sm italic">Surat keterangan ini dipergunakan untuk: <b>{data.purpose}</b></p>
        </div>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-8 flex justify-between items-end">
         <div className="text-center w-48">
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-3 opacity-30">
               <ShieldCheck size={32} className="mx-auto text-slate-400" />
               <p className="text-[7px] font-black uppercase mt-1">Authentic Lab Report</p>
            </div>
         </div>
         <div className="text-center w-64 font-sans">
            <p className="text-xs mb-14">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
            <p className="font-bold underline uppercase text-sm leading-none">{data.examinerName}</p>
            <p className="text-[9pt] text-slate-500 mt-1 uppercase">SIP: {data.examinerNip}</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2">
              <FlaskConical size={18} /> Lab Result Builder
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg">
            <Printer size={16} /> Print Hasil Lab
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[400px] bg-white border-r overflow-y-auto p-5 space-y-6 text-slate-900 scrollbar-thin">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Klinik & Pemeriksa</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs" value={data.examinerName} onChange={e => handleDataChange('examinerName', e.target.value)} placeholder="Nama Dokter" />
             </div>
             
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Data Pasien</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs" value={data.patientNik} onChange={e => handleDataChange('patientNik', e.target.value)} placeholder="NIK" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} placeholder="Alamat" />
             </div>

             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Tujuan Surat</h3>
                <textarea className="w-full p-2 border rounded text-xs h-20 resize-none font-sans" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Contoh: Melamar Kerja..." />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ReportContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ReportContent />
      </div>
    </div>
  );
}