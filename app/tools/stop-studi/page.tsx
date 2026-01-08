'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, UserCircle2, X, PenTool, 
  ShieldCheck, FileWarning, MapPin, GraduationCap, Ban
} from 'lucide-react';
import Link from 'next/link';

export default function TidakStudiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <NoStudyBuilder />
    </Suspense>
  );
}

function NoStudyBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    
    // DATA DIRI
    name: 'BAGUS RAMADHAN',
    nik: '5171010101990001',
    placeBirth: 'Denpasar',
    dateBirth: '1999-12-25',
    address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // TUJUAN
    purpose: 'Melamar Pekerjaan di PT. Teknologi Indonesia Makmur',
    
    // PERNYATAAN KUNCI
    statementBody: 'Menyatakan dengan sebenarnya bahwa pada saat ini saya TIDAK SEDANG MENEMPUH PENDIDIKAN FORMAL (sekolah/kuliah) di instansi manapun baik negeri maupun swasta.',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const NoStudyContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-12 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERNYATAAN</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-[0.2em] text-slate-500">Tidak Sedang Menempuh Pendidikan</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.name}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Sesuai KTP</span><span>:</span><span>{data.address}</span></div>
        </div>

        <p className="mb-6 indent-8">
          {data.statementBody}
        </p>

        <p className="mb-8">
          Surat pernyataan ini saya buat dengan penuh kesadaran sebagai salah satu syarat untuk: <b>{data.purpose}</b>.
        </p>

        <p className="mb-4">
          Demikian pernyataan ini saya buat dengan sebenar-benarnya. Apabila di kemudian hari ditemukan bahwa data atau pernyataan ini tidak benar, maka saya bersedia menerima sanksi sesuai dengan ketentuan hukum yang berlaku.
        </p>
      </div>

      {/* TANDA TANGAN (SINGLE RIGHT) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[11pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-2 uppercase">Yang Membuat Pernyataan,</p>
                <div className="flex flex-col items-center justify-center h-32">
                   <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.name}</p>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-amber-400 italic flex items-center gap-2">
               <Ban size={18} /> No-Study <span className="text-white not-italic opacity-40 font-normal italic">Statement</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Identitas Diri</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><GraduationCap size={12}/> Pernyataan & Tujuan</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-28 resize-none leading-relaxed font-serif" value={data.statementBody} onChange={e => handleDataChange('statementBody', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan Surat" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   <input type="date" className="w-full p-3 border rounded-xl text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <NoStudyContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <NoStudyContent />
      </div>
    </div>
  );
}