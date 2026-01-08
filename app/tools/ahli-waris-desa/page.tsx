'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, Users, UserPlus, 
  Trash2, ShieldCheck, MapPin, Landmark, X, PenTool
} from 'lucide-react';
import Link from 'next/link';

export default function AhliWarisDesaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Waris Desa...</div>}>
      <VillageHeirBuilder />
    </Suspense>
  );
}

function VillageHeirBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  const [data, setData] = useState({
    district: 'KECAMATAN MENTENG',
    village: 'KELURAHAN MENTENG',
    city: 'JAKARTA PUSAT',
    villageAddress: 'Jl. Merdeka No. 12, Jakarta Pusat, 10310',
    date: '2026-01-08',
    docNo: '470/123/411.602.10/2026',
    
    // DATA ALMARHUM
    deceasedName: 'H. AHMAD JAYADI',
    deceasedNik: '3171010101700001',
    deceasedDeathDate: '2025-11-20',
    deceasedAddress: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng',

    // DAFTAR AHLI WARIS (DYNAMIC)
    heirs: [
      { name: 'SITI AMINAH', relation: 'Istri/Janda' },
      { name: 'BUDI SETIAWAN', relation: 'Anak Kandung' },
      { name: 'ANI MARYANI', relation: 'Anak Kandung' }
    ],

    // PEJABAT PENGESAH
    villageHead: 'I WAYAN SUDIRTA, S.Sos',
    subDistrictHead: 'Drs. H. MULYONO, M.Si'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addHeir = () => {
    setData({ ...data, heirs: [...data.heirs, { name: '', relation: '' }] });
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

  const VillageHeirContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP DESA */}
      <div className="flex items-center border-b-4 border-double border-black pb-4 mb-6 shrink-0 text-center">
        {logo && <img src={logo} className="w-20 h-20 object-contain mr-4" alt="Logo" />}
        <div className="flex-grow">
          <h2 className="text-[12pt] font-bold leading-tight">PEMERINTAH KABUPATEN/KOTA {data.city}</h2>
          <h2 className="text-[14pt] font-black leading-tight uppercase tracking-tight">{data.district}</h2>
          <h1 className="text-[16pt] font-black leading-tight uppercase underline">{data.village}</h1>
          <p className="text-[9pt] font-sans mt-1 italic">{data.villageAddress}</p>
        </div>
      </div>

      <div className="text-center mb-6 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4">SURAT KETERANGAN AHLI WARIS</h2>
        <p className="text-[10pt] font-sans mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Kami yang bertanda tangan di bawah ini, Lurah/Kepala Desa {data.village}, menerangkan bahwa pada tanggal {new Date(data.deceasedDeathDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}, telah meninggal dunia:</p>
        
        <div className="ml-10 mb-4 space-y-1 font-sans text-[10pt] border-l-2 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Almarhum</span><span>:</span><span className="font-bold uppercase">{data.deceasedName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.deceasedNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span>{data.deceasedAddress}</span></div>
        </div>

        <p className="mb-4">Berdasarkan data yang ada, almarhum/ah meninggalkan Ahli Waris yang sah sebagai berikut:</p>

        <table className="w-full border-collapse border border-black mb-6 font-sans text-[9pt]">
           <thead className="bg-slate-50 uppercase font-bold">
              <tr>
                 <th className="border border-black p-2 w-10">No</th>
                 <th className="border border-black p-2 text-left">Nama Lengkap</th>
                 <th className="border border-black p-2 text-left">Hubungan Keluarga</th>
                 <th className="border border-black p-2 w-32">Tanda Tangan</th>
              </tr>
           </thead>
           <tbody>
              {data.heirs.map((heir, i) => (
                 <tr key={i} className="h-10">
                    <td className="border border-black p-2 text-center">{i + 1}.</td>
                    <td className="border border-black p-2 font-bold">{heir.name}</td>
                    <td className="border border-black p-2">{heir.relation}</td>
                    <td className="border border-black p-2 relative italic text-slate-300 text-[7pt]">
                       <span className={i % 2 === 0 ? "float-left" : "float-right"}>{i + 1}. ...........</span>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
        <p>Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* PENGESAHAN MULTI-LEVEL */}
      <div className="shrink-0 mt-4 border-t-2 border-slate-100 pt-6">
        <table className="w-full table-fixed text-[10pt]">
          <tbody>
            <tr className="text-center font-bold">
              <td>Mengetahui,<br/>CAMAT {data.district}</td>
              <td>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}<br/>LURAH/KEPALA DESA</td>
            </tr>
            <tr className="h-24">
              <td></td>
              <td></td>
            </tr>
            <tr className="text-center">
              <td className="font-bold underline uppercase">({data.subDistrictHead})</td>
              <td className="font-bold underline uppercase">({data.villageHead})</td>
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
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400">Village <span className="text-white opacity-40 italic">Heir Registry</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all">
            <Printer size={16} /> Print Surat Desa
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-6 scrollbar-thin">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Landmark size={12}/> Kop Pemerintah Desa</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Nama Kecamatan" />
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Nama Desa/Kelurahan" />
                <textarea className="w-full p-2.5 border rounded-xl text-xs h-16 resize-none" value={data.villageAddress} onChange={e => handleDataChange('villageAddress', e.target.value)} placeholder="Alamat Kantor Desa" />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1">
                   <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><Users size={12}/> Ahli Waris</h3>
                   <button onClick={addHeir} className="bg-emerald-100 text-emerald-700 p-1 rounded-md"><UserPlus size={16}/></button>
                </div>
                {data.heirs.map((heir, idx) => (
                   <div key={idx} className="p-3 bg-slate-50 rounded-xl border relative group">
                      <button onClick={() => removeHeir(idx)} className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                      <input className="w-full p-2 border-b bg-transparent text-xs font-bold mb-1" value={heir.name} onChange={e => updateHeir(idx, 'name', e.target.value)} placeholder="Nama" />
                      <input className="w-full p-2 border-b bg-transparent text-[10px]" value={heir.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} placeholder="Hubungan" />
                   </div>
                ))}
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Pejabat Berwenang</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades/Lurah" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.subDistrictHead} onChange={e => handleDataChange('subDistrictHead', e.target.value)} placeholder="Nama Camat" />
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <VillageHeirContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <VillageHeirContent />
      </div>
    </div>
  );
}