'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Truck, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, MapPin, Navigation, RefreshCcw, Phone
} from 'lucide-react';
import Link from 'next/link';

export default function RedeliveryPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Permohonan...</div>}>
      <RedeliveryBuilder />
    </Suspense>
  );
}

function RedeliveryBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'REQ/REDELIVERY/004/I/2026',
    
    // DATA EKSPEDISI
    courierBranch: 'J&T Express Cargo - DC Denpasar',
    awbNumber: 'JT1234567890',
    failedReason: 'Rumah Kosong / Alamat Tidak Ditemukan',

    // DATA PENERIMA
    receiverName: 'MADE WIRA KUSUMA',
    receiverPhone: '0812-3456-7890',
    receiverAddress: 'Jl. Teuku Umar No. 88, Banjar Dauh Puri, Denpasar Barat',
    landmark: 'Gerbang Putih, sebelah warung makan Padang.',

    // INSTRUKSI
    deliveryTime: 'Pukul 09:00 - 17:00 WITA',
    specialNote: 'Mohon hubungi nomor telepon di atas sebelum kurir berangkat menuju lokasi. Jika tidak ada di tempat, paket bisa dititipkan ke security/satpam kompleks.',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const RedeliveryContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERMOHONAN PENGIRIMAN ULANG (REDELIVERY)</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Logistik & Distribusi Paket</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Kepada Yth,<br/><b>Bagian Operasional / Admin {data.courierBranch}</b><br/>Di Tempat</p>
        
        <p className="mb-4">Melalui surat ini, saya bermaksud mengajukan permohonan pengiriman ulang (redelivery) atas kiriman paket dengan rincian sebagai berikut:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-blue-100 pl-4 italic">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nomor Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Penerima</span><span>:</span><span className="font-bold uppercase">{data.receiverName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Status Terakhir</span><span>:</span><span className="text-red-600 font-bold">{data.failedReason}</span></div>
        </div>

        <p className="mb-4 font-bold underline">Detail Alamat Pengiriman Ulang:</p>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6">
            <p className="mb-1 leading-relaxed"><b>Alamat Lengkap:</b><br/>{data.receiverAddress}</p>
            <p className="mb-3 text-blue-700 italic"><b>Patokan (Landmark):</b> {data.landmark}</p>
            <div className="grid grid-cols-[150px_10px_1fr] text-slate-700"><span>No. Kontak</span><span>:</span><span className="font-bold">{data.receiverPhone}</span></div>
        </div>

        <div className="mb-6">
            <p className="font-bold underline mb-1">Instruksi Khusus Kurir:</p>
            <div className="text-slate-800 italic bg-white p-4 border-2 border-dashed rounded-lg">
                <p>Waktu Pengiriman: <b>{data.deliveryTime}</b></p>
                <p className="mt-2 text-[9.5pt]">"{data.specialNote}"</p>
            </div>
        </div>

        <p>Demikian permohonan ini saya sampaikan dengan harapan agar paket tersebut dapat segera dikirimkan kembali ke alamat tujuan. Atas kerja samanya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (TABLE) */}
      <div className="shrink-0 mt-8 pt-4">
        <table className="w-full table-fixed border-none">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">Menyetujui (Admin/CS),</td>
              <td className="pb-4">Pemohon / Penerima,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase italic opacity-30 text-[8pt]">(Stempel Ekspeditur)</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase text-[11pt]">{data.receiverName}</p>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic flex items-center gap-2">
               <RefreshCcw size={18} /> Redelivery <span className="text-white not-italic opacity-40 font-normal italic">Request</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Permohonan
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Info Ekspedisi</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.courierBranch} onChange={e => handleDataChange('courierBranch', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi" />
                <input className="w-full p-3 border rounded-xl text-xs text-red-600 font-bold" value={data.failedReason} onChange={e => handleDataChange('failedReason', e.target.value)} placeholder="Alasan Gagal Kirim" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><MapPin size={12}/> Detail Alamat Ulang</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs italic text-blue-600" value={data.landmark} onChange={e => handleDataChange('landmark', e.target.value)} placeholder="Patokan Rumah" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Navigation size={12}/> Instruksi Kurir</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.deliveryTime} onChange={e => handleDataChange('deliveryTime', e.target.value)} placeholder="Waktu (cth: 09:00 - 17:00)" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.specialNote} onChange={e => handleDataChange('specialNote', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <RedeliveryContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <RedeliveryContent />
      </div>
    </div>
  );
}