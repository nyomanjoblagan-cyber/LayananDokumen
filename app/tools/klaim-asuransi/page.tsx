'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, ShieldAlert, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, ClipboardList, PackageX, Coins, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function KlaimAsuransiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Klaim Asuransi...</div>}>
      <InsuranceClaimBuilder />
    </Suspense>
  );
}

function InsuranceClaimBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '2026-01-08',
    docNo: 'CLAIMS/EXP-001/I/2026',
    
    // DATA ASURANSI & EKSPEDISI
    insuranceName: 'PT. ASURANSI JIWA BERSAMA',
    courierName: 'JNE Express / Logistik ABC',
    awbNumber: 'AWB-123456789XYZ',

    // DATA PEMOHON
    claimantName: 'BUDI SETIAWAN',
    claimantPhone: '0812-3456-7890',
    claimantAddress: 'Jl. Melati No. 45, Jakarta Selatan',

    // DETAIL KLAIM
    incidentDate: '2026-01-05',
    incidentType: 'Barang Rusak Total (Total Loss)',
    itemDescription: '1 Unit Laptop MacBook Pro M3 14 Inch',
    claimAmount: 'Rp 28.500.000,-',
    
    // KRONOLOGI
    chronology: 'Paket diterima dalam kondisi box penyok parah dan basah. Setelah dibuka, layar laptop pecah dan perangkat tidak dapat menyala (mati total). Sudah dikonfirmasi oleh kurir saat serah terima.',

    // PETUGAS/SAKSI
    witnessName: 'ANDRI (Kurir/Staff Cargo)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ClaimContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERNYATAAN KLAIM ASURANSI</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Logistik & Pengiriman Barang</p>
        <p className="text-[9pt] font-sans">Nomor Pengajuan: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Kepada Yth,<br/><b>Bagian Klaim {data.insuranceName}</b><br/>Di Tempat</p>
        
        <p className="mb-4">Saya yang bertanda tangan di bawah ini mengajukan permohonan klaim atas kerusakan/kehilangan barang pengiriman dengan rincian:</p>
        
        <div className="ml-6 mb-6 space-y-1 font-sans text-[9.5pt] border-l-4 border-red-100 pl-4 italic">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Pemohon</span><span>:</span><span className="font-bold uppercase">{data.claimantName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Ekspedisi</span><span>:</span><span>{data.courierName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Tanggal Kejadian</span><span>:</span><span>{new Date(data.incidentDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6">
            <p className="font-black text-red-600 uppercase text-[8pt] mb-2 tracking-widest">Detail Objek Klaim:</p>
            <div className="grid grid-cols-[150px_10px_1fr] mb-1"><span>Jenis Kerugian</span><span>:</span><span className="font-bold">{data.incidentType}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] mb-1"><span>Nama Barang</span><span>:</span><span>{data.itemDescription}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] text-blue-700"><span>Nilai Klaim</span><span>:</span><span className="font-black text-[11pt]">{data.claimAmount}</span></div>
        </div>

        <div className="mb-6">
            <p className="font-bold underline mb-1">Kronologi Kejadian:</p>
            <p className="text-slate-700 italic bg-white p-3 border rounded-lg">"{data.chronology}"</p>
        </div>

        <p>Bersama ini saya lampirkan bukti foto kerusakan, faktur pembelian barang, dan dokumen pendukung lainnya. Demikian permohonan ini saya buat dengan sebenar-benarnya untuk diproses lebih lanjut.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS */}
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
              <td className="pb-4">Saksi / Petugas Lapangan,</td>
              <td className="pb-4">Pemohon Klaim,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witnessName})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-28 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-20 h-10 flex items-center justify-center text-[6pt] text-slate-300 italic mb-2">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt]">{data.claimantName}</p>
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

      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-400 italic flex items-center gap-2">
               <ShieldAlert size={18} /> Claims <span className="text-white not-italic opacity-40 font-normal italic">Assistance</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat Klaim
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><ClipboardList size={12}/> Data Pengiriman</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.insuranceName} onChange={e => handleDataChange('insuranceName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi / AWB" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} placeholder="Nama Ekspedisi" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><AlertCircle size={12}/> Detail Kejadian</h3>
                <select className="w-full p-3 border rounded-xl text-xs" value={data.incidentType} onChange={e => handleDataChange('incidentType', e.target.value)}>
                    <option>Barang Rusak Total (Total Loss)</option>
                    <option>Barang Rusak Sebagian</option>
                    <option>Barang Hilang / Tidak Sampai</option>
                </select>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.itemDescription} onChange={e => handleDataChange('itemDescription', e.target.value)} placeholder="Deskripsi Barang" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Nilai & Otoritas</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50" value={data.claimAmount} onChange={e => handleDataChange('claimAmount', e.target.value)} placeholder="Total Nilai Klaim" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.claimantName} onChange={e => handleDataChange('claimantName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ClaimContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ClaimContent />
      </div>
    </div>
  );
}