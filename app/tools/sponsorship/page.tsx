'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Target, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Briefcase, Zap, Banknote
} from 'lucide-react';
import Link from 'next/link';

export default function SponsorshipPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Proposal...</div>}>
      <SponsorshipBuilder />
    </Suspense>
  );
}

function SponsorshipBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '04/SPONSOR/HIMATIKA/I/2026',
    
    // DATA PENYELENGGARA
    orgName: 'HIMPUNAN MAHASISWA TEKNOLOGI INFORMASI',
    orgAddress: 'Kampus Sudirman, Jl. PB Sudirman, Denpasar, Bali',
    contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',

    // DATA EVENT
    eventName: 'TECHFEST 2026: INNOVATION FOR BALI',
    eventDate: '25 - 27 Maret 2026',
    eventLocation: 'Gedung Ksirarnawa, Art Center Denpasar',
    targetAudience: '1.500 Mahasiswa & Pelaku Industri Kreatif',

    // PENERIMA SPONSOR
    targetCompany: 'Marketing Manager PT. TELKOM INDONESIA',
    companyAddress: 'Jl. Teuku Umar No. 10, Denpasar',

    // BENEFIT & PAKET
    packageSelected: 'PLATINUM SPONSORSHIP',
    benefitSummary: 'Pemasangan Logo Utama di Backdrop acara, Ad-Lips oleh MC setiap 30 menit, Space Stand 3x3m di area utama, dan publikasi media sosial.',
    investmentValue: 'Rp 15.000.000,-'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const SponsorshipContent = () => (
    <div className="bg-white mx-auto box-border p-[20mm] print:p-[15mm] text-slate-900 font-serif shadow-sm print:shadow-none" 
         style={{ width: '210mm' }}>
      
      {/* HEADER SURAT - FORMAL */}
      <div className="flex justify-between items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex-grow">
           <h1 className="text-[13pt] font-black uppercase tracking-tighter text-blue-900 leading-none">{data.orgName}</h1>
           <p className="text-[8.5pt] font-sans mt-1 italic text-slate-600">{data.orgAddress}</p>
        </div>
        <div className="text-right border-l-2 border-slate-200 pl-6 ml-6">
           <p className="text-[10pt] font-bold uppercase tracking-widest text-slate-800">Proposal</p>
           <p className="text-[8pt] font-mono text-slate-500 italic">No: {data.docNo}</p>
        </div>
      </div>

      {/* TUJUAN */}
      <div className="mb-8 text-[11pt] leading-normal">
        <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
        <p>Hal: <b>Permohonan Sponsorship & Kerja Sama</b></p>
        <div className="mt-6 leading-snug">
          <p>Yth. <b>{data.targetCompany}</b></p>
          <p>{data.companyAddress}</p>
          <p>Di Tempat</p>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="text-[11pt] leading-relaxed text-justify space-y-5">
        <p>Dengan hormat,</p>
        <p>
          Sehubungan dengan penyelenggaraan kegiatan <b>{data.eventName}</b>, kami menawarkan kemitraan strategis kepada perusahaan Bapak/Ibu yang akan dilaksanakan pada:
        </p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[9.5pt] border-l-4 border-blue-800 pl-6 py-1 bg-slate-50/50">
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Waktu</span><span>:</span><span className="font-bold">{data.eventDate}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Tempat</span><span>:</span><span>{data.eventLocation}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Target</span><span>:</span><span>{data.targetAudience}</span></div>
        </div>

        <p>
          Kami menawarkan paket <b>{data.packageSelected}</b> dengan nilai investasi <b>{data.investmentValue}</b>. Adapun benefit utama yang akan diterima adalah:
        </p>

        <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 italic text-[10.5pt] leading-relaxed">
           "{data.benefitSummary}"
        </div>

        <p>
          Besar harapan kami agar Bapak/Ibu dapat bergabung. Kami siap untuk mendiskusikan detail teknis kerja sama ini lebih lanjut.
        </p>
      </div>

      {/* TANDA TANGAN - KUNCI AGAR TIDAK TERPISAH */}
      <div className="mt-10 pt-6 break-inside-avoid">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-20 tracking-[0.2em]">Ketua Panitia,</p>
                <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.contactPerson.split(' (')[0]}</p>
              </td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-20 tracking-[0.2em]">Sekretaris,</p>
                <p className="font-bold underline uppercase text-[11pt]">(...........................)</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-8 text-[8.5pt] text-slate-400 text-center font-sans italic border-t pt-4">
           Informasi Konfirmasi: {data.contactPerson}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
          .break-inside-avoid { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
               <Zap size={18} /> Sponsor <span className="text-white not-italic opacity-40 font-normal italic">Pitcher</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Proposal
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Penyelenggara</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.orgName} onChange={e => handleDataChange('orgName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.contactPerson} onChange={e => handleDataChange('contactPerson', e.target.value)} />
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Target Sponsor</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Jabatan & Perusahaan" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Sponsor" />
             </div>
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Banknote size={12}/> Penawaran</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed italic" value={data.benefitSummary} onChange={e => handleDataChange('benefitSummary', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs font-black text-emerald-700" value={data.investmentValue} onChange={e => handleDataChange('investmentValue', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-95 transition-transform shadow-2xl">
                <SponsorshipContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <SponsorshipContent />
      </div>
    </div>
  );
}