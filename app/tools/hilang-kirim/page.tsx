'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, PackageX, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, ClipboardList, AlertTriangle, FileSearch
} from 'lucide-react';
import Link from 'next/link';

export default function HilangKirimPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kehilangan...</div>}>
      <LostPackageBuilder />
    </Suspense>
  );
}

function LostPackageBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'SK-HILANG/BWC/I/2026',
    
    // DATA EKSPEDISI & BARANG
    courierName: 'JNE Express / PT. Jalur Nugraha Ekakurir',
    awbNumber: '882100992233445',
    itemName: '1 Unit Handphone Samsung Galaxy S24 Ultra',
    itemValue: 'Rp 18.500.000,-',
    sendDate: '2025-12-28',

    // DATA PEMBUAT PERNYATAAN (PENGIRIM/PENERIMA)
    declarantName: 'BAGUS RAMADHAN',
    declarantNik: '5171010101990001',
    declarantPhone: '0812-3456-7890',
    declarantAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // KRONOLOGI
    chronology: 'Berdasarkan data tracking resmi, paket seharusnya tiba pada tanggal 30 Desember 2025. Namun, hingga saat surat ini dibuat, paket belum diterima. Pihak ekspedisi telah mengonfirmasi bahwa status paket dinyatakan hilang (Lost in Transit) di pusat sortir Bekasi.',

    // SAKSI
    witnessName: 'I MADE WIRA (Petugas Logistik / Saksi)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const LostContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERNYATAAN KEHILANGAN BARANG KIRIMAN</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Logistik & Klaim Asuransi Pengiriman</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.declarantName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.declarantNik}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.declarantPhone}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.declarantAddress}</span></div>
        </div>

        <p className="mb-4">Dengan ini menyatakan dengan sebenarnya bahwa barang kiriman saya melalui jasa ekspedisi <b>{data.courierName}</b> dengan rincian sebagai berikut:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6">
            <div className="grid grid-cols-[150px_10px_1fr] mb-1"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold text-red-600">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] mb-1"><span>Nama Barang</span><span>:</span><span>{data.itemName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] mb-1"><span>Tanggal Kirim</span><span>:</span><span>{new Date(data.sendDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] text-blue-700"><span>Estimasi Nilai</span><span>:</span><span className="font-black">{data.itemValue}</span></div>
        </div>

        <div className="mb-6">
            <p className="font-bold underline mb-1">Kronologi Kehilangan:</p>
            <p className="text-slate-700 italic bg-white p-4 border border-dashed rounded-lg">"{data.chronology}"</p>
        </div>

        <p className="mb-4">
          Demikian pernyataan ini saya buat dengan sadar dan sebenar-benarnya tanpa ada paksaan. Saya bersedia mempertanggungjawabkan secara hukum apabila di kemudian hari ditemukan unsur penipuan dalam pernyataan ini.
        </p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE) */}
      <div className="shrink-0 mt-6 pt-4 border-t border-slate-100">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">Saksi / Petugas,</td>
              <td className="pb-4">Pembuat Pernyataan,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witnessName})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt]">{data.declarantName}</p>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-500 italic flex items-center gap-2">
               <PackageX size={18} /> Lost <span className="text-white not-italic opacity-40 font-normal italic">Package Statement</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><FileSearch size={12}/> Info Pengiriman</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs text-red-600 font-bold" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.itemName} onChange={e => handleDataChange('itemName', e.target.value)} placeholder="Nama Barang" />
                <input type="date" className="w-full p-3 border rounded-xl text-xs" value={data.sendDate} onChange={e => handleDataChange('sendDate', e.target.value)} />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pembuat</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.declarantName} onChange={e => handleDataChange('declarantName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.declarantAddress} onChange={e => handleDataChange('declarantAddress', e.target.value)} />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><AlertTriangle size={12}/> Kronologi & Nilai</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-28 resize-none leading-relaxed font-serif" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Tulis kronologi kehilangan..." />
                <input className="w-full p-3 border rounded-xl text-xs font-black text-blue-700 bg-blue-50" value={data.itemValue} onChange={e => handleDataChange('itemValue', e.target.value)} placeholder="Nilai Barang" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} placeholder="Nama Saksi/Petugas" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <LostContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <LostContent />
      </div>
    </div>
  );
}