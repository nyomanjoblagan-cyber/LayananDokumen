'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Heart, Droplets, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Activity, CalendarDays, ClipboardCheck
} from 'lucide-react';
import Link from 'next/link';

export default function DonorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Donor...</div>}>
      <DonorBuilder />
    </Suspense>
  );
}

function DonorBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'DONOR/PMI-DPS/2026/01/442',
    
    // INSTANSI (PMI / RS)
    institutionName: 'PALANG MERAH INDONESIA (PMI) KOTA DENPASAR',
    institutionAddress: 'Jl. Imam Bonjol No. 182, Denpasar, Bali',
    
    // DATA DONOR
    donorName: 'BAGUS RAMADHAN',
    donorNik: '5171010101990001',
    bloodType: 'O (Positif)',
    rhesus: 'Rh+',

    // DETAIL KEGIATAN
    donorType: 'Donor Darah Sukarela', // atau 'Donor Organ Pasca-Mangkat'
    donorTime: '09:00 WITA',
    location: 'Unit Transfusi Darah (UTD) PMI Denpasar',
    
    // PERNYATAAN / KETERANGAN
    statement: 'Telah mendonorkan darahnya secara sukarela untuk kepentingan kemanusiaan. Yang bersangkutan disarankan untuk beristirahat dari aktivitas fisik berat selama 24 jam ke depan.',

    // PETUGAS / DOKTER
    officerName: 'dr. I MADE WIRA',
    officerId: 'NIP. 19850101 201001 1 004'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const DonorContent = () => (
    <div className="bg-white mx-auto box-border p-[20mm] text-slate-900 font-serif border border-slate-100 print:border-none shadow-sm print:shadow-none" 
         style={{ width: '210mm', minHeight: '148mm' }}>
      
      {/* KOP PMI / RS */}
      <div className="flex items-center border-b-4 border-double border-red-600 pb-3 mb-6">
        <div className="bg-red-600 text-white p-3 rounded-full mr-4">
          <Droplets size={28} />
        </div>
        <div className="flex-grow">
          <h1 className="text-[12pt] font-black uppercase tracking-tighter text-red-600">{data.institutionName}</h1>
          <p className="text-[8pt] font-sans italic text-slate-500">{data.institutionAddress}</p>
        </div>
        <div className="text-right border-l pl-4 border-slate-200">
           <p className="text-[14pt] font-black text-red-600 leading-none">{data.bloodType}</p>
           <p className="text-[7pt] font-sans uppercase font-bold tracking-widest">Gol. Darah</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-black underline uppercase tracking-[0.2em] leading-none">SURAT KETERANGAN DONOR</h2>
        <p className="text-[9pt] font-sans mt-2 italic text-slate-500">No: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="text-[11pt] leading-relaxed space-y-6">
        <p>Pihak <b>{data.institutionName}</b> menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-red-100 pl-6 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Donor</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.donorName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.donorNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Donor</span><span>:</span><span className="font-bold text-red-600 uppercase">{data.donorType}</span></div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-2">
            <p>Telah melakukan pengambilan {data.donorType.toLowerCase()} pada:</p>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari, Tanggal</span><span>:</span><span className="font-bold">{new Date(data.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu / Lokasi</span><span>:</span><span>{data.donorTime} / {data.location}</span></div>
        </div>

        <p className="text-justify indent-8 leading-relaxed">
          {data.statement}
        </p>

        <p>Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya, termasuk sebagai bukti ijin istirahat bagi instansi/tempat bekerja.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-12 flex justify-between items-end">
        <div className="w-32 h-32 border-2 border-dashed border-slate-200 flex items-center justify-center text-center p-2 rounded">
           <p className="text-[7pt] text-slate-300 font-sans uppercase">Stempel<br/>Resmi Instansi</p>
        </div>
        <div className="text-center w-72">
          <p className="text-[10pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
          <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Petugas Unit Transfusi,</p>
          <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.officerName}</p>
          <p className="text-[8pt] font-sans mt-1">{data.officerId}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-400 italic flex items-center gap-2">
               <Heart size={18} /> Donor <span className="text-white not-italic opacity-40 font-normal italic">Certificate</span>
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
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Unit Transfusi</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs font-black text-red-600" value={data.bloodType} onChange={e => handleDataChange('bloodType', e.target.value)} placeholder="Gol. Darah" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.donorTime} onChange={e => handleDataChange('donorTime', e.target.value)} placeholder="Waktu" />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Identitas Donor</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.donorName} onChange={e => handleDataChange('donorName', e.target.value)} />
                <select className="w-full p-3 border rounded-xl text-xs" value={data.donorType} onChange={e => handleDataChange('donorType', e.target.value)}>
                    <option>Donor Darah Sukarela</option>
                    <option>Donor Darah Apheresis</option>
                    <option>Donor Organ Pasca-Mangkat</option>
                </select>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ClipboardCheck size={12}/> Narasi & Petugas</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed italic" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.officerName} onChange={e => handleDataChange('officerName', e.target.value)} placeholder="Nama Petugas/Dokter" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <DonorContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <DonorContent />
      </div>
    </div>
  );
}