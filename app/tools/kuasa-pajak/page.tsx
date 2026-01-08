'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, FileText, Building2, UserCircle2, 
  ShieldCheck, LayoutTemplate, X, PenTool, Scale, Fingerprint
} from 'lucide-react';
import Link from 'next/link';

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kuasa Pajak...</div>}>
      <TaxProxyBuilder />
    </Suspense>
  );
}

function TaxProxyBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: new Date().toISOString().split('T')[0],
    docNo: 'SK.PAJAK/001/I/2026',
    
    // PEMBERI KUASA (WAJIB PAJAK / DIREKTUR)
    p1Name: 'AGUS SETIAWAN',
    p1Nik: '5171010101880001',
    p1Npwp: '01.234.567.8-901.000',
    p1Job: 'Direktur Utama',
    p1Company: 'PT. BALI MAJU SEJAHTERA',
    p1Address: 'Jl. Teuku Umar No. 10, Denpasar, Bali',

    // PENERIMA KUASA (STAF/KONSULTAN)
    p2Name: 'MADE ARYAWAN',
    p2Nik: '5171010202900005',
    p2Address: 'Jl. Gatot Subroto No. 45, Denpasar',
    p2Job: 'Tax Consultant / Staf Keuangan',

    // DETAIL URUSAN PAJAK
    taxType: 'Pajak Penghasilan (PPh) Pasal 21 & PPN',
    taxYear: 'Masa Januari s/d Desember 2025',
    kppName: 'KPP Pratama Denpasar Barat'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ProxyContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KUASA KHUSUS</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
        
        {/* PEMBERI KUASA */}
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p1Name}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NPWP</span><span>:</span><span>{data.p1Npwp}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.p1Job} {data.p1Company}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p1Address}</span></div>
        </div>

        <p className="mb-4">Selanjutnya disebut sebagai <b>PEMBERI KUASA</b>. Dengan ini memberi kuasa khusus kepada:</p>

        {/* PENERIMA KUASA */}
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p2Name}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.p2Nik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.p2Job}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p2Address}</span></div>
        </div>

        <p className="mb-6 text-center font-bold tracking-widest uppercase text-sm">--- K H U S U S ---</p>

        <p className="mb-6">
          Untuk mewakili Pemberi Kuasa dalam melaksanakan hak dan/atau memenuhi kewajiban perpajakan berupa <b>{data.taxType}</b> untuk <b>{data.taxYear}</b> pada <b>{data.kppName}</b>.
        </p>

        <p>
          Penerima Kuasa diberi wewenang untuk menandatangani surat-surat, memberikan keterangan, serta melakukan tindakan lain yang diperlukan sehubungan dengan maksud pemberian kuasa ini sesuai peraturan perundang-undangan perpajakan yang berlaku.
        </p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
      <div className="shrink-0 mt-8">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td colSpan={2} className="text-right font-bold text-[10.5pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
              <td className="pb-4">Penerima Kuasa,</td>
              <td className="pb-4">Pemberi Kuasa,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.p2Name})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt]">{data.p1Name}</p>
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

      {/* UI ROOT */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">Tax Proxy <span className="text-white not-italic opacity-50">Builder</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Surat Kuasa
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Fingerprint size={12}/> Pemberi Kuasa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Direktur/WP" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Npwp} onChange={e => handleDataChange('p1Npwp', e.target.value)} placeholder="NPWP Wajib Pajak" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Penerima Kuasa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Staf/Konsultan" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Ruang Lingkup Kuasa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} placeholder="Jenis Pajak" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Masa/Tahun Pajak" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <ProxyContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ProxyContent />
      </div>
    </div>
  );
}