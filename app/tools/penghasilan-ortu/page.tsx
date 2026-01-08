'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Wallet, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Coins, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function PenghasilanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Penghasilan...</div>}>
      <IncomeStatementBuilder />
    </Suspense>
  );
}

function IncomeStatementBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Surabaya',
    date: '2026-01-08',
    docNo: '400/12/RT.03/2026',
    
    // DATA ORANG TUA (PEMBUAT PERNYATAAN)
    parentName: 'SLAMET MULYONO',
    parentNik: '3578000000000001',
    parentJob: 'Wiraswasta / Pedagang',
    parentAddress: 'Jl. Gubeng Kertajaya No. 15, RT 003/RW 005, Surabaya',

    // DATA ANAK (UNTUK KEPERLUAN APA)
    childName: 'RIZKY ADITYA',
    childSchool: 'Universitas Airlangga (UNAIR)',
    purpose: 'Persyaratan Pendaftaran Beasiswa KIP-Kuliah',

    // RINCIAN PENGHASILAN
    baseIncome: 'Rp 2.500.000,-',
    otherIncome: 'Rp 500.000,-',
    totalIncome: 'Rp 3.000.000,-',

    // PENGESAHAN
    issuerJob: 'Ketua RT 003',
    issuerName: 'BAMBANG HERMANTO'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const IncomeContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KETERANGAN PENGHASILAN</h1>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.parentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.parentNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.parentJob}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.parentAddress}</span></div>
        </div>

        <p className="mb-4">Menyatakan dengan sebenarnya bahwa saat ini saya memiliki penghasilan rata-rata per bulan sebesar:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6">
            <div className="grid grid-cols-[180px_10px_1fr] mb-1"><span>Penghasilan Pokok</span><span>:</span><span className="font-bold">{data.baseIncome}</span></div>
            <div className="grid grid-cols-[180px_10px_1fr] mb-2 border-b pb-2"><span>Penghasilan Tambahan</span><span>:</span><span>{data.otherIncome}</span></div>
            <div className="grid grid-cols-[180px_10px_1fr] text-blue-700"><span>Total Penghasilan</span><span>:</span><span className="font-black text-[12pt]">{data.totalIncome}</span></div>
        </div>

        <p className="mb-4">Pernyataan ini dibuat sebagai kelengkapan administrasi bagi anak saya:</p>
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt]">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Anak</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.childName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Instansi/Sekolah</span><span>:</span><span>{data.childSchool}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Keperluan</span><span>:</span><span className="italic">{data.purpose}</span></div>
        </div>

        <p>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun, dan saya bersedia dituntut sesuai hukum jika data di atas tidak benar.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
      <div className="shrink-0 mt-8">
        <table className="w-full table-fixed border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-8">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">Mengetahui,</td>
              <td className="pb-4">Hormat Saya,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.issuerName})</p>
                   <p className="text-[9pt] leading-tight mt-1">{data.issuerJob}</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight leading-none">{data.parentName}</p>
                   <p className="text-[9pt] mt-1 text-slate-500 italic uppercase tracking-tighter">Orang Tua / Wali</p>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-emerald-400 italic flex items-center gap-2">
               <Wallet size={18} /> Income <span className="text-white not-italic opacity-40 font-normal">Statement Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner text-slate-900">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Orang Tua</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} placeholder="Pekerjaan" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat Domisili" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Detail Penghasilan</h3>
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.baseIncome} onChange={e => handleDataChange('baseIncome', e.target.value)} placeholder="Gaji Pokok" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.otherIncome} onChange={e => handleDataChange('otherIncome', e.target.value)} placeholder="Tunjangan/Lainnya" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-black text-blue-700 bg-blue-50" value={data.totalIncome} onChange={e => handleDataChange('totalIncome', e.target.value)} placeholder="Total Sebulan" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Untuk Anak & Keperluan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Sekolah / Univ" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Pengesahan RT/RW</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Nama Ketua RT/RW" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.issuerJob} onChange={e => handleDataChange('issuerJob', e.target.value)} placeholder="Jabatan" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <IncomeContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <IncomeContent />
      </div>
    </div>
  );
}