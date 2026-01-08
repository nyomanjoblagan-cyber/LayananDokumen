'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, Building2, UserCircle2, 
  CalendarDays, ClipboardCheck, Info
} from 'lucide-react';
import Link from 'next/link';

export default function PernyataanPenyelenggaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <StatementBuilder />
    </Suspense>
  );
}

function StatementBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '02/SPP/EVENT/I/2026',
    
    organizerName: 'PT. KREATIF ANAK BANGSA',
    picName: 'BAGUS RAMADHAN',
    picPosition: 'Ketua Panitia Pelaksana',
    picNik: '5171010101990001',
    picAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara, Bali',

    eventName: 'FESTIVAL MUSIK AKHIR PEKAN 2026',
    eventDate: '15 Februari 2026',
    eventLocation: 'Lapangan Niti Mandala Renon, Denpasar',
    
    clauses: [
      'Menjamin keamanan, ketertiban, dan kebersihan di lokasi selama acara berlangsung.',
      'Bertanggung jawab penuh atas segala risiko yang timbul akibat penyelenggaraan acara tersebut.',
      'Mematuhi seluruh regulasi dan peraturan perundang-undangan yang berlaku di wilayah setempat.',
      'Tidak akan melakukan kegiatan yang melanggar norma kesusilaan atau ketertiban umum.'
    ]
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const StatementContent = () => (
    <div className="bg-white mx-auto box-border p-[20mm] print:p-[15mm] text-slate-900 font-serif relative overflow-hidden" 
         style={{ width: '210mm', height: '285mm' }}>
      
      {/* JUDUL UTAMA */}
      <div className="text-center mb-10">
        <h1 className="text-[18pt] font-black underline uppercase decoration-2 underline-offset-8 leading-tight">SURAT PERNYATAAN</h1>
        <p className="text-[10pt] font-sans mt-4 italic uppercase tracking-[0.2em] text-slate-500">Tanggung Jawab Penyelenggaraan Kegiatan</p>
      </div>

      {/* ISI SURAT */}
      <div className="text-[11pt] leading-relaxed text-justify space-y-6">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-2 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.picName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.picPosition}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Instansi/Organisasi</span><span>:</span><span className="font-bold">{data.organizerName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.picNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.picAddress}</span></div>
        </div>

        <p>Menyatakan dengan sadar dan penuh tanggung jawab selaku penyelenggara kegiatan <b>{data.eventName}</b>, bahwa kami akan:</p>

        <ul className="ml-8 space-y-3">
            {data.clauses.map((clause, idx) => (
                <li key={idx} className="flex gap-4">
                    <span className="font-bold text-slate-400">{idx + 1}.</span>
                    <span>{clause}</span>
                </li>
            ))}
        </ul>

        <p className="indent-10">
            Pernyataan ini dibuat sebagai syarat administrasi perizinan. Apabila di kemudian hari terjadi pelanggaran, saya bersedia menerima sanksi sesuai hukum yang berlaku di Negara Kesatuan Republik Indonesia.
        </p>

        <p>Demikian surat pernyataan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN - DIKUNCI DI POSISI ABSOLUT BAWAH */}
      <div className="absolute bottom-[20mm] left-[20mm] right-[20mm]">
        <table className="w-full table-fixed border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="text-[11pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-2 tracking-[0.2em] uppercase">Pembuat Pernyataan,</p>
                <div className="flex flex-col items-center justify-center h-32">
                   <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.picName}</p>
                   <p className="text-[9pt] font-sans opacity-60 leading-tight">{data.picPosition}</p>
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
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: hidden !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
               <ShieldCheck size={18} /> Event <span className="text-white not-italic opacity-40 font-normal italic">Guarantor</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Pernyataan
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Penanggung Jawab</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.picName} onChange={e => handleDataChange('picName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.picPosition} onChange={e => handleDataChange('picPosition', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.organizerName} onChange={e => handleDataChange('organizerName', e.target.value)} placeholder="Instansi" />
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Info Acara</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} />
             </div>
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ClipboardCheck size={12}/> Legitimasi</h3>
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   <input type="date" className="w-full p-3 border rounded-xl text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-700 italic leading-relaxed">Penting: Matikan "Headers & Footers" dan set Margins ke "None" pada setelan printer Anda.</p>
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-95 transition-transform shadow-2xl">
                <StatementContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <StatementContent />
      </div>
    </div>
  );
}