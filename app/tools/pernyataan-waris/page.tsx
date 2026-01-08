'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Users, UserPlus, Trash2, 
  MapPin, CalendarDays, FileText, LayoutTemplate, 
  ChevronDown, ImagePlus, X, PenTool, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function PernyataanWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Waris...</div>}>
      <HeirStatementBuilder />
    </Suspense>
  );
}

function HeirStatementBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // DATA ALMARHUM / ALMARHUMAH
    deceasedName: 'H. AHMAD JAYADI',
    deceasedNik: '3171000000000001',
    deceasedDeathDate: '2025-11-20',
    deceasedAddress: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',

    // DATA PEMBUAT PERNYATAAN (Biasanya Anak Tertua/Istri)
    declarantName: 'BUDI SETIAWAN',
    declarantNik: '3171000000000002',
    declarantAddress: 'Jl. Merdeka No. 45, Jakarta Pusat',

    // DAFTAR AHLI WARIS (DYNAMIC)
    heirs: [
      { name: 'SITI AMINAH', age: '55', relation: 'Istri/Janda' },
      { name: 'BUDI SETIAWAN', age: '32', relation: 'Anak Kandung' },
      { name: 'ANI MARYANI', age: '28', relation: 'Anak Kandung' }
    ],

    // SAKSI & PENGESAHAN
    witness1: 'Ketua RT 001',
    witness2: 'Ketua RW 002',
    villageHead: 'Lurah Menteng'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addHeir = () => {
    setData({ ...data, heirs: [...data.heirs, { name: '', age: '', relation: '' }] });
  };

  const removeHeir = (index: number) => {
    const newHeirs = [...data.heirs];
    newHeirs.splice(index, 1);
    setData({ ...data, heirs: newHeirs });
  };

  const updateHeir = (index: number, field: string, val: string) => {
    const newHeirs = [...data.heirs];
    // @ts-ignore
    newHeirs[index][field] = val;
    setData({ ...data, heirs: newHeirs });
  };

  const WarisContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-4 tracking-tighter leading-none mb-2">SURAT PERNYATAAN AHLI WARIS</h1>
      </div>

      <div className="space-y-4 flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p>Kami yang bertanda tangan di bawah ini, para Ahli Waris dari almarhum/almarhumah:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt]">
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Almarhum</span><span>:</span><span className="font-bold uppercase">{data.deceasedName}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.deceasedNik}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Meninggal Pada</span><span>:</span><span>{new Date(data.deceasedDeathDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span>{data.deceasedAddress}</span></div>
        </div>

        <p>Dengan ini menyatakan dengan sebenarnya bahwa kami adalah benar Ahli Waris yang sah dari almarhum/almarhumah tersebut di atas, dengan rincian sebagai berikut:</p>

        <table className="w-full border-collapse border border-slate-900 font-sans text-[9.5pt]">
           <thead>
              <tr className="bg-slate-100 uppercase">
                 <th className="border border-slate-900 p-2 w-10">No</th>
                 <th className="border border-slate-900 p-2 text-left">Nama Ahli Waris</th>
                 <th className="border border-slate-900 p-2 w-20">Umur</th>
                 <th className="border border-slate-900 p-2 text-left">Hubungan</th>
              </tr>
           </thead>
           <tbody>
              {data.heirs.map((heir, i) => (
                 <tr key={i}>
                    <td className="border border-slate-900 p-2 text-center">{i + 1}</td>
                    <td className="border border-slate-900 p-2 font-bold">{heir.name}</td>
                    <td className="border border-slate-900 p-2 text-center">{heir.age} Thn</td>
                    <td className="border border-slate-900 p-2">{heir.relation}</td>
                 </tr>
              ))}
           </tbody>
        </table>

        <p>Pernyataan ini kami buat dengan sebenarnya tanpa ada paksaan dari pihak manapun. Apabila di kemudian hari terbukti pernyataan ini tidak benar, maka kami bersedia dituntut sesuai dengan ketentuan hukum yang berlaku.</p>
      </div>

      {/* TANDA TANGAN KOMPLEKS (SEJAJAR) */}
      <div className="shrink-0 mt-auto pt-4">
         <div className="text-right text-[10pt] mb-4">
            {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}
         </div>
         
         {/* BARIS AHLI WARIS & MATERAI */}
         <div className="grid grid-cols-2 gap-10 text-center text-[10pt]">
            <div className="space-y-16">
               <p className="uppercase font-bold text-slate-400 text-[8pt]">Saksi-Saksi:</p>
               <div className="flex justify-around">
                  <div className="underline">({data.witness1})</div>
                  <div className="underline">({data.witness2})</div>
               </div>
            </div>
            <div className="space-y-12">
               <p className="font-bold uppercase text-[9pt]">Yang Membuat Pernyataan,</p>
               <div className="border border-slate-300 w-24 h-14 mx-auto flex items-center justify-center text-[8pt] text-slate-400 italic">MATERAI 10.000</div>
               <p className="font-bold underline uppercase">{data.declarantName}</p>
            </div>
         </div>

         {/* PENGESAHAN BAWAH */}
         <div className="mt-8 border-t-2 border-slate-100 pt-4 text-center">
            <p className="text-[8pt] font-sans font-bold uppercase text-slate-400 mb-10 tracking-widest">Mengetahui/Mengesahkan:</p>
            <p className="font-bold underline uppercase">{data.villageHead}</p>
         </div>
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
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
              Inheritance <span className="text-white not-italic opacity-50 font-normal">Legal Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Surat Waris
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR EDITOR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             
             {/* DATA ALMARHUM */}
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-2 tracking-widest flex items-center gap-2">Data Almarhum/ah</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK" />
                   <input type="date" className="w-full p-3 border rounded-xl text-xs" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} />
                </div>
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed italic" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} placeholder="Alamat Terakhir..." />
             </div>

             {/* DATA AHLI WARIS (DYNAMIC ROWS) */}
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                   <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-2"><Users size={12}/> Daftar Ahli Waris</h3>
                   <button onClick={addHeir} className="bg-blue-100 text-blue-700 p-1 rounded-md hover:bg-blue-200 transition-colors"><UserPlus size={14}/></button>
                </div>
                {data.heirs.map((heir, idx) => (
                   <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 relative group">
                      <button onClick={() => removeHeir(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                      <input className="w-full p-2 border-b bg-transparent text-xs font-bold" value={heir.name} onChange={e => updateHeir(idx, 'name', e.target.value)} placeholder="Nama Lengkap" />
                      <div className="grid grid-cols-2 gap-2">
                         <input className="w-full p-2 border rounded text-[10px]" value={heir.age} onChange={e => updateHeir(idx, 'age', e.target.value)} placeholder="Umur" />
                         <input className="w-full p-2 border rounded text-[10px]" value={heir.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} placeholder="Hubungan" />
                      </div>
                   </div>
                ))}
             </div>

             {/* SAKSI & PENGESAHAN */}
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Saksi & Pejabat</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.declarantName} onChange={e => handleDataChange('declarantName', e.target.value)} placeholder="Nama Ahli Waris Utama" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-black uppercase" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Jabatan Pengesah (Lurah)" />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <WarisContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <WarisContent />
      </div>
    </div>
  );
}