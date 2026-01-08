'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, HandHelping, Coins, MessageSquareQuote
} from 'lucide-react';
import Link from 'next/link';

export default function PermohonanDonasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Donasi...</div>}>
      <DonationBuilder />
    </Suspense>
  );
}

function DonationBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '012/PAN-SOSIAL/I/2026',
    
    // PENYELENGGARA
    orgName: 'YAYASAN BAKTI SOSIAL BALI',
    orgAddress: 'Jl. Raya Puputan No. 22, Renon, Denpasar',
    contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',

    // DETAIL KEGIATAN
    activityName: 'PROGRAM SEMBAKO UNTUK LANSIA & YATIM PIATU',
    targetAudience: '100 Kepala Keluarga di wilayah Denpasar Timur',
    executionDate: '25 Januari 2026',

    // PENERIMA SURAT
    targetName: 'Bapak/Ibu Donatur / Pimpinan Perusahaan',
    targetLocation: 'Di Tempat',

    // DETAIL DONASI
    totalNeed: 'Rp 25.000.000,-',
    bankInfo: 'Bank BCA No. Rek: 123-456-7890 a.n Yayasan Bakti Sosial',
    closingWord: 'Setiap kontribusi Anda, sekecil apapun, akan memberikan senyum dan harapan baru bagi mereka yang membutuhkan.',

    // OTORITAS
    chairmanName: 'BAGUS RAMADHAN',
    treasurerName: 'MADE WIRA KUSUMA'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const DonationContent = () => (
    <div className="bg-white mx-auto box-border p-[20mm] print:p-[15mm] text-slate-900 font-serif shadow-sm print:shadow-none" 
         style={{ width: '210mm' }}>
      
      {/* HEADER SURAT - FORMAL SOSIAL */}
      <div className="flex flex-col items-center border-b-4 border-double border-emerald-700 pb-4 mb-8 text-center shrink-0">
        <h1 className="text-[14pt] font-black uppercase leading-tight tracking-tighter text-emerald-800">{data.orgName}</h1>
        <p className="text-[9pt] font-sans mt-1 italic text-slate-600">{data.orgAddress}</p>
      </div>

      {/* JUDUL & NOMOR */}
      <div className="mb-8 text-[11pt] leading-normal">
        <div className="flex justify-between mb-4">
           <div>
              <p>Nomor : {data.docNo}</p>
              <p>Hal : <b>Permohonan Donasi & Bantuan Sosial</b></p>
           </div>
           <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
        </div>
        <div className="mt-6 leading-snug">
          <p>Yth. <b>{data.targetName}</b></p>
          <p>{data.targetLocation}</p>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="text-[11pt] leading-relaxed text-justify space-y-5">
        <p>Dengan hormat, sehubungan dengan rencana pelaksanaan kegiatan <b>{data.activityName}</b> yang akan dilaksanakan pada tanggal {data.executionDate}, kami bermaksud memohon dukungan Bapak/Ibu.</p>
        
        <p>Kegiatan ini bertujuan untuk membantu <b>{data.targetAudience}</b> yang saat ini sangat membutuhkan uluran tangan kita bersama. Adapun estimasi total dana yang dibutuhkan adalah sebesar <b>{data.totalNeed}</b>.</p>

        <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-dashed border-emerald-200 font-sans text-[10.5pt] italic text-center text-emerald-900 leading-relaxed shadow-inner">
           <MessageSquareQuote size={20} className="mx-auto mb-2 opacity-30" />
           "{data.closingWord}"
        </div>

        <p>Bagi Bapak/Ibu yang berkenan memberikan donasi, bantuan dapat disalurkan melalui:</p>
        <div className="p-4 border-l-4 border-emerald-600 bg-slate-50 font-mono text-[10pt] tracking-tight">
            {data.bankInfo}
        </div>

        <p>Demikian permohonan ini kami sampaikan. Atas keikhlasan dan partisipasi Bapak/Ibu, kami ucapkan terima kasih yang sebesar-besarnya. Semoga Tuhan Yang Maha Esa membalas kebaikan Anda.</p>
      </div>

      {/* TANDA TANGAN - DOUBLE VERIFICATION */}
      <div className="mt-12 pt-6 border-t border-slate-100 break-inside-avoid">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-20 tracking-widest">Ketua Panitia,</p>
                <p className="font-bold underline uppercase text-[11pt]">{data.chairmanName}</p>
              </td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-20 tracking-widest">Bendahara,</p>
                <p className="font-bold underline uppercase text-[11pt]">{data.treasurerName}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-8 text-[8.5pt] text-slate-400 text-center font-sans italic border-t pt-4">
           Konfirmasi & Dokumentasi: {data.contactPerson}
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
          .break-inside-avoid { break-inside: avoid !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-emerald-400 flex items-center gap-2 italic">
               <Heart size={18} /> Charity <span className="text-white not-italic opacity-40 font-normal italic">Fundraiser</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat Donasi
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
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><HandHelping size={12}/> Target & Tujuan</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.activityName} onChange={e => handleDataChange('activityName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.targetAudience} onChange={e => handleDataChange('targetAudience', e.target.value)} placeholder="Target Penerima Bantuan" />
             </div>
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Detail Dana</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50" value={data.totalNeed} onChange={e => handleDataChange('totalNeed', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none font-mono" value={data.bankInfo} onChange={e => handleDataChange('bankInfo', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.chairmanName} onChange={e => handleDataChange('chairmanName', e.target.value)} placeholder="Nama Ketua" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} placeholder="Nama Bendahara" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-95 transition-transform shadow-2xl">
                <DonationContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <DonationContent />
      </div>
    </div>
  );
}