'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Store, ShieldCheck, UserPlus, 
  Trash2, FileText, BadgeCheck, Coins, MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function FranchisePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perjanjian Franchise...</div>}>
      <FranchiseBuilder />
    </Suspense>
  );
}

function FranchiseBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    docNo: 'FRA/LGL/2026/012',
    
    // FRANCHISOR (PEMILIK MEREK)
    p1Name: 'DODI PRASETYO',
    p1Company: 'PT. KULINER NUSANTARA JAYA',
    p1Brand: 'Kopi Kenangan Rakyat',
    p1Address: 'Menara Bisnis Lt. 12, Kuningan, Jakarta Selatan',

    // FRANCHISEE (PENERIMA WARALABA)
    p2Name: 'IWAN SETIAWAN',
    p2Address: 'Jl. Merdeka No. 88, Bandung',
    p2Location: 'Cihampelas Walk, Bandung (G-05)',

    // DETAIL BISNIS
    franchiseFee: 'Rp 150.000.000,-',
    royaltyFee: '5% dari Omzet Bulanan',
    contractDuration: '5 (Lima) Tahun',
    
    // SAKSI
    witness1: 'SITI RAHMAWATI, S.H.',
    witness2: 'ANDI WIJAYA'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const FranchiseContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP / JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">PERJANJIAN WARALABA (FRANCHISE)</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Merek Dagang: "{data.p1Brand}"</p>
        <p className="text-[9pt] font-sans italic">Nomor: {data.docNo}</p>
      </div>

      {/* ISI PERJANJIAN */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Pada hari ini, <b>{new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</b>, kami yang bertanda tangan di bawah ini:</p>
        
        <div className="space-y-4 mb-6 ml-6">
            <div className="flex gap-4">
                <span className="font-bold">1.</span>
                <p><b>{data.p1Name}</b>, selaku Direktur <b>{data.p1Company}</b>, selanjutnya disebut sebagai <b>FRANCHISOR</b>.</p>
            </div>
            <div className="flex gap-4">
                <span className="font-bold">2.</span>
                <p><b>{data.p2Name}</b>, bertindak untuk dan atas nama pribadi/badan usaha sendiri, selanjutnya disebut sebagai <b>FRANCHISEE</b>.</p>
            </div>
        </div>

        <p className="mb-4">Para Pihak sepakat untuk menjalin kerja sama waralaba dengan ketentuan sebagai berikut:</p>

        <div className="space-y-4 text-[10pt]">
            <p><b>PASAL 1 (HAK MEREK):</b> Franchisor memberikan hak penggunaan merek <b>{data.p1Brand}</b> dan sistem operasionalnya untuk lokasi di <b>{data.p2Location}</b>.</p>
            <p><b>PASAL 2 (BIAYA):</b> Franchisee wajib membayar Franchise Fee sebesar <b>{data.franchiseFee}</b> dan Royalty Fee sebesar <b>{data.royaltyFee}</b>.</p>
            <p><b>PASAL 3 (JANGKA WAKTU):</b> Perjanjian ini berlaku selama <b>{data.contractDuration}</b> terhitung sejak tanggal penandatanganan.</p>
            <p><b>PASAL 4 (STANDAR):</b> Franchisee wajib mengikuti seluruh Standar Operasional Prosedur (SOP) yang ditetapkan oleh Franchisor demi menjaga reputasi merek.</p>
        </div>

        <p className="mt-8 font-bold italic border-t pt-4">
          Demikian perjanjian ini dibuat dalam 2 (dua) rangkap asli bermaterai cukup untuk dipergunakan sebagaimana mestinya.
        </p>
      </div>

      {/* TANDA TANGAN (TABEL STATIS) */}
      <div className="shrink-0 mt-6">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td colSpan={2} className="text-right font-bold text-[10.5pt] pb-8">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">FRANCHISOR</td>
              <td className="pb-4">FRANCHISEE</td>
            </tr>
            <tr>
              <td className="text-center align-bottom pb-2">
                <div className="h-28 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-20 h-12 flex items-center justify-center text-[6pt] text-slate-300 italic mb-2">MATERAI</div>
                   <p className="font-bold underline uppercase">({data.p1Name})</p>
                </div>
              </td>
              <td className="text-center align-bottom pb-2">
                <div className="h-28 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-20 h-12 flex items-center justify-center text-[6pt] text-slate-300 italic mb-2">MATERAI</div>
                   <p className="font-bold underline uppercase">({data.p2Name})</p>
                </div>
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pt-8 pb-4">SAKSI I</td>
              <td className="pt-8 pb-4">SAKSI II</td>
            </tr>
            <tr>
              <td className="text-center">
                <p className="font-bold underline uppercase text-[9pt]">({data.witness1})</p>
              </td>
              <td className="text-center">
                <p className="font-bold underline uppercase text-[9pt]">({data.witness2})</p>
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
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-amber-500">Franchise <span className="text-white opacity-40">Agreement</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Perjanjian
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 flex items-center gap-2"><BadgeCheck size={12}/> Franchisor (Pemilik Merek)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Direktur" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Brand} onChange={e => handleDataChange('p1Brand', e.target.value)} placeholder="Nama Brand/Merek" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama PT" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 flex items-center gap-2"><Store size={12}/> Franchisee (Penerima)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Penerima" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.p2Location} onChange={e => handleDataChange('p2Location', e.target.value)} placeholder="Lokasi Outlet" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 flex items-center gap-2"><Coins size={12}/> Biaya & Durasi</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.franchiseFee} onChange={e => handleDataChange('franchiseFee', e.target.value)} placeholder="Franchise Fee" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.royaltyFee} onChange={e => handleDataChange('royaltyFee', e.target.value)} placeholder="Royalty Fee" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Durasi Kontrak" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 flex items-center gap-2"><ShieldCheck size={12}/> Otoritas</h3>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <FranchiseContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <FranchiseContent />
      </div>
    </div>
  );
}