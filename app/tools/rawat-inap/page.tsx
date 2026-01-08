'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Bed, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarRange, Thermometer, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function RawatInapPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <InpatientBuilder />
    </Suspense>
  );
}

function InpatientBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'SKRI/RSBM/2026/01/088',
    
    // FASILITAS KESEHATAN
    hospitalName: 'RSUD BALI MANDARA',
    hospitalAddress: 'Jl. Bypass Ngurah Rai No. 548, Sanur, Denpasar Selatan',
    
    // DATA PASIEN
    patientName: 'BAGUS RAMADHAN',
    patientNik: '5171010101990001',
    patientAge: '27 Tahun',
    patientAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // DATA RAWAT INAP
    admissionDate: '2026-01-05',
    dischargeDate: '2026-01-08',
    roomName: 'Ruang Amerta - Kamar 302',
    diagnosis: 'Demam Berdarah Dengue (DBD) dengan Trombositopenia berat, membutuhkan observasi cairan dan monitoring trombosit secara berkala selama masa perawatan.',

    // PENANDATANGAN
    doctorName: 'dr. I MADE WIRA, Sp.PD',
    sipNumber: 'SIP. 445/112/DINKES/2024'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const InpatientContent = () => (
    <div className="bg-white mx-auto box-border p-[20mm] print:p-[15mm] text-slate-900 font-serif shadow-sm print:shadow-none min-h-[100px]" 
         style={{ width: '210mm' }}>
      
      {/* KOP RUMAH SAKIT */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
        <h1 className="text-[14pt] font-black uppercase leading-tight tracking-tighter">{data.hospitalName}</h1>
        <p className="text-[9pt] font-sans mt-1 italic leading-relaxed">{data.hospitalAddress}</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-black underline uppercase tracking-widest leading-none">SURAT KETERANGAN RAWAT INAP</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="text-[11pt] leading-relaxed text-justify space-y-5">
        <p>Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pasien</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.patientName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Umur</span><span>:</span><span>{data.patientAge}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.patientAddress}</span></div>
        </div>

        <p>Telah menjalani perawatan intensif (Rawat Inap) di <b>{data.hospitalName}</b> terhitung sejak:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-1.5">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Tanggal Masuk</span><span>:</span><span className="font-bold">{new Date(data.admissionDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Tanggal Keluar</span><span>:</span><span className="font-bold">{new Date(data.dischargeDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Ruangan</span><span>:</span><span>{data.roomName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] text-rose-700"><span>Diagnosis</span><span>:</span><span className="font-black italic">"{data.diagnosis}"</span></div>
        </div>

        <p>
          Surat keterangan ini diberikan atas permintaan yang bersangkutan untuk dipergunakan sebagai kelengkapan administrasi, klaim asuransi, bukti ijin sakit, atau keperluan lainnya yang sah secara hukum.
        </p>

        <p>Demikian surat keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* AREA TANDA TANGAN - MENGGUNAKAN break-inside-avoid AGAR TIDAK TERPISAH KE HALAMAN 2 JIKA MASIH ADA RUANG */}
      <div className="mt-10 pt-4 break-inside-avoid">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="text-[11pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-24">Dokter Penanggung Jawab,</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.doctorName}</p>
                   <p className="text-[9pt] font-sans mt-0.5">SIP/NIP. {data.sipNumber}</p>
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
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-rose-400 italic">Inpatient <span className="text-white not-italic opacity-40">Certificate</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Fasilitas Kesehatan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.hospitalName} onChange={e => handleDataChange('hospitalName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Pasien</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><CalendarRange size={12}/> Detail Perawatan</h3>
                <div className="grid grid-cols-2 gap-2">
                   <input type="date" className="w-full p-3 border rounded-xl text-xs font-bold" value={data.admissionDate} onChange={e => handleDataChange('admissionDate', e.target.value)} />
                   <input type="date" className="w-full p-3 border rounded-xl text-xs font-bold" value={data.dischargeDate} onChange={e => handleDataChange('dischargeDate', e.target.value)} />
                </div>
                <textarea className="w-full p-3 border rounded-xl text-xs h-28 resize-none leading-relaxed italic" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Tuliskan diagnosis medis..." />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="NIP/SIP" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <InpatientContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <InpatientContent />
      </div>
    </div>
  );
}