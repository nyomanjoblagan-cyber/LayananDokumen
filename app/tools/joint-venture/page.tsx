'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Briefcase, Building2, UserCircle2, 
  Handshake, LayoutTemplate, X, ShieldCheck, PenTool, Scale, Coins
} from 'lucide-react';
import Link from 'next/link';

export default function JointVenturePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perjanjian JV...</div>}>
      <JointVentureBuilder />
    </Suspense>
  );
}

function JointVentureBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Surabaya',
    date: new Date().toISOString().split('T')[0],
    docNo: 'JV/DIR-OPS/V/2026/089',
    
    // PIHAK PERTAMA (INVESTOR/OWNER)
    p1Name: 'HENDRA KUSUMAH',
    p1Company: 'PT. MAJU MUNDUR SEJAHTERA',
    p1Role: 'Investor Modal',
    p1Share: '60%',

    // PIHAK KEDUA (OPERATOR/PARTNER)
    p2Name: 'REZA ADRIAN',
    p2Company: 'CV. KREATIF MUDA KARYA',
    p2Role: 'Pengelola Operasional',
    p2Share: '40%',

    // DETAIL PROYEK
    projectName: 'Pengembangan Aplikasi E-Commerce "WargaHub"',
    investmentAmount: 'Rp 500.000.000,-',
    duration: '24 Bulan',
    
    // SAKSI
    witness1: 'SITI AMINAH, S.H.',
    witness2: 'BUDI SANTOSO'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const JVContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">PERJANJIAN KERJA SAMA (JOINT VENTURE)</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-[0.2em]">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4 text-center italic">"Kesepakatan Usaha Bersama Pengembangan {data.projectName}"</p>
        
        <p className="mb-4">Pada hari ini, tanggal <b>{new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</b>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>
        
        <div className="space-y-4 mb-6">
            <div className="grid grid-cols-[30px_1fr] gap-2">
                <span className="font-bold">I.</span>
                <p><b>{data.p1Name}</b>, mewakili <b>{data.p1Company}</b>, bertindak selaku <b>{data.p1Role}</b>, selanjutnya disebut sebagai <b>PIHAK PERTAMA</b>.</p>
            </div>
            <div className="grid grid-cols-[30px_1fr] gap-2">
                <span className="font-bold">II.</span>
                <p><b>{data.p2Name}</b>, mewakili <b>{data.p2Company}</b>, bertindak selaku <b>{data.p2Role}</b>, selanjutnya disebut sebagai <b>PIHAK KEDUA</b>.</p>
            </div>
        </div>

        <p className="mb-6">Kedua belah pihak bersepakat untuk mengadakan kerja sama usaha (Joint Venture) dengan ketentuan sebagai berikut:</p>

        <div className="space-y-4 mb-6 text-[10pt]">
            <p><b>PASAL 1 (OBJEK):</b> Pihak I dan Pihak II sepakat menjalankan proyek <b>{data.projectName}</b> dengan nilai investasi sebesar <b>{data.investmentAmount}</b>.</p>
            <p><b>PASAL 2 (PEMBAGIAN):</b> Pembagian keuntungan (Profit Sharing) disepakati sebesar <b>{data.p1Share}</b> untuk Pihak I dan <b>{data.p2Share}</b> untuk Pihak II dari laba bersih operasional.</p>
            <p><b>PASAL 3 (DURASI):</b> Perjanjian ini berlaku selama <b>{data.duration}</b> dan dapat diperpanjang melalui kesepakatan tertulis kedua belah pihak.</p>
        </div>

        <p className="italic font-bold border-t pt-4 border-slate-100">
          Demikian perjanjian ini dibuat dalam rangkap 2 (dua) yang masing-masing mempunyai kekuatan hukum yang sama.
        </p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
      <div className="shrink-0 mt-8 pt-4">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td colSpan={2} className="text-right font-bold text-[10pt] pb-6">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            {/* HEADER TTD */}
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">PIHAK PERTAMA</td>
              <td className="pb-4">PIHAK KEDUA</td>
            </tr>
            {/* AREA TTD UTAMA */}
            <tr>
              <td className="text-center align-bottom pb-2">
                <div className="h-24 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-16 h-8 flex items-center justify-center text-[5pt] text-slate-300 italic mb-2">MATERAI</div>
                   <p className="font-bold underline uppercase leading-none">{data.p1Name}</p>
                   <p className="text-[8pt] text-slate-500 mt-1">{data.p1Company}</p>
                </div>
              </td>
              <td className="text-center align-bottom pb-2">
                <div className="h-24 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-16 h-8 flex items-center justify-center text-[5pt] text-slate-300 italic mb-2">MATERAI</div>
                   <p className="font-bold underline uppercase leading-none">{data.p2Name}</p>
                   <p className="text-[8pt] text-slate-500 mt-1">{data.p2Company}</p>
                </div>
              </td>
            </tr>
            {/* HEADER SAKSI */}
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pt-10 pb-4">SAKSI I</td>
              <td className="pt-10 pb-4">SAKSI II</td>
            </tr>
            {/* AREA TTD SAKSI */}
            <tr>
              <td className="text-center align-bottom">
                <div className="h-16 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase leading-none">({data.witness1})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-16 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase leading-none">({data.witness2})</p>
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

      {/* EDITOR UI */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">JV <span className="text-white not-italic opacity-40">Contract Builder</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Kontrak
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Scale size={12}/> Pihak Pertama (Investor)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs font-black text-blue-600" value={data.p1Share} onChange={e => handleDataChange('p1Share', e.target.value)} placeholder="Persen Bagi Hasil" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Role} onChange={e => handleDataChange('p1Role', e.target.value)} placeholder="Peran" />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Pihak Kedua (Operator)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p2Company} onChange={e => handleDataChange('p2Company', e.target.value)} placeholder="Nama Perusahaan" />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs font-black text-emerald-600" value={data.p2Share} onChange={e => handleDataChange('p2Share', e.target.value)} placeholder="Persen Bagi Hasil" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.p2Role} onChange={e => handleDataChange('p2Role', e.target.value)} placeholder="Peran" />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Coins size={12}/> Nilai Investasi & Proyek</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} placeholder="Nama Proyek" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.investmentAmount} onChange={e => handleDataChange('investmentAmount', e.target.value)} placeholder="Total Investasi" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Otoritas & Saksi</h3>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <JVContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <JVContent />
      </div>
    </div>
  );
}