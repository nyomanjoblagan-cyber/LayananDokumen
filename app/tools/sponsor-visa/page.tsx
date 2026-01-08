'use client';

import { useState, Suspense } from 'react';
import { Printer, ArrowLeft, Plane, UserCircle2, Globe2, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Visa...</div>}>
      <VisaSponsorBuilder />
    </Suspense>
  );
}

function VisaSponsorBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    sponsorName: 'HENDRA KUSUMA',
    sponsorJob: 'Direktur Utama PT. Maju Jaya',
    sponsorAddress: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
    relation: 'Ayah Kandung / Father', 
    applicantName: 'RIZKY KUSUMA',
    passportNo: 'X1234567',
    destinationCountry: 'Jepang / Japan',
    visitPurpose: 'Liburan Keluarga / Family Holiday',
    duration: '14 Hari / Days',
    travelDate: '2026-03-15',
    embassyName: 'Embassy of Japan',
    embassyAddress: 'Jakarta, Indonesia'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // KOMPONEN ISI SURAT
  const SuratKonten = () => (
    <div className="bg-white mx-auto flex flex-col font-serif p-[20mm] text-[11pt] leading-normal text-slate-900 print:p-[15mm] print:m-0" 
         style={{ width: '210mm', height: '296mm', boxSizing: 'border-box', pageBreakAfter: 'avoid', pageBreakBefore: 'avoid' }}>
        
        <div className="mb-8 shrink-0 text-right font-sans text-xs">
           {data.city}, {new Date(data.date).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'})}
        </div>

        <div className="mb-6 space-y-1 text-sm">
           <p className="font-bold">To: Visa Section</p>
           <p className="font-bold">{data.embassyName}</p>
           <p>{data.embassyAddress}</p>
        </div>

        <div className="text-center mb-8 pb-1 border-b-2 border-black shrink-0">
          <h1 className="font-black text-lg uppercase underline decoration-1 underline-offset-4">SPONSORSHIP LETTER</h1>
        </div>

        <div className="space-y-5 flex-grow text-justify text-[10.5pt]">
          <p>Dear Sir/Madam,</p>
          <p>I, the undersigned below / <i>Saya yang bertanda tangan di bawah ini</i>:</p>
          <div className="ml-6 space-y-1.5">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold">{data.sponsorName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Occupation</span><span>:</span><span>{data.sponsorJob}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
          </div>

          <p>Hereby declare that I am the <b>{data.relation}</b> of / <i>Dengan ini menyatakan bahwa saya adalah <b>{data.relation}</b> dari</i>:</p>
          <div className="ml-6 space-y-1.5">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase">{data.applicantName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Passport No.</span><span>:</span><span className="font-mono">{data.passportNo}</span></div>
          </div>

          <p>I would like to guarantee that my <b>{data.relation}</b> is going to <b>{data.destinationCountry}</b> for <b>{data.visitPurpose}</b> for about <b>{data.duration}</b> starting from <b>{data.travelDate ? new Date(data.travelDate).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : '...'}</b>.</p>

          <p className="italic text-slate-700 bg-slate-50 p-4 border rounded-lg text-[10pt]">
            I guarantee that I will be responsible for all of his/her expenses during the trip and stay in your country, and I also guarantee that he/she will return to Indonesia after the trip is over.
          </p>
          <p>Thank you for your kind attention.</p>
        </div>

        <div className="shrink-0 mt-6 flex justify-end">
           <div className="text-center w-56">
              <p className="mb-2 font-bold uppercase text-[9px]">Sincerely Yours,</p>
              <div className="border border-slate-200 w-20 h-14 mx-auto mb-1 flex items-center justify-center text-[7px] text-slate-300 italic">MATERAI 10.000</div>
              <p className="font-bold underline uppercase text-sm leading-none">{data.sponsorName}</p>
           </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0 !important; 
          }
          body, html { 
            margin: 0 !important; 
            padding: 0 !important;
            height: 297mm !important;
            width: 210mm !important;
            overflow: hidden !important;
          }
          #ui-root { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-blue-400 uppercase tracking-widest text-sm">Sponsor Visa</h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2">
            <Printer size={16} /> Cetak
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[380px] bg-white border-r overflow-y-auto p-6 space-y-6 font-sans">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest">Penjamin</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} />
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.sponsorAddress} onChange={e => handleDataChange('sponsorAddress', e.target.value)} />
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest">Pemohon</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs" placeholder="Paspor" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.6] lg:scale-[0.8] xl:scale-100 shadow-2xl">
                <SuratKonten />
             </div>
          </div>
        </div>
      </div>

      {/* AREA PRINT MURNI */}
      <div id="print-only-root" className="hidden">
         <SuratKonten />
      </div>

    </div>
  );
}