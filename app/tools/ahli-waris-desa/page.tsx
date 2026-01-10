'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Building2, Users, UserPlus, 
  Trash2, ShieldCheck, MapPin, Landmark, LayoutTemplate, 
  ChevronDown, Edit3, Eye, ArrowLeftCircle, FileText
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function AhliWarisDesaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Desa...</div>}>
      <VillageHeirBuilder />
    </Suspense>
  );
}

function VillageHeirBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    district: 'KECAMATAN MENTENG',
    village: 'KELURAHAN MENTENG',
    city: 'JAKARTA PUSAT',
    villageAddress: 'Jl. Pegangsaan Barat No. 12, Jakarta Pusat, 10310',
    date: new Date().toISOString().split('T')[0],
    
    // Nomor Surat
    docNo: '470 / 125 / 41.10.2 / 2026',
    regKecamatan: '590 / 02 / I / 2026',
    
    // Almarhum
    deceasedName: 'H. AHMAD JAYADI',
    deceasedNik: '3171010101700001',
    deceasedDeathDate: '2025-11-20',
    deceasedAge: '65',
    deceasedReligion: 'Islam',
    deceasedAddress: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng',

    // Ahli Waris
    heirs: [
      { name: 'SITI AMINAH', age: '60', relation: 'Istri/Janda' },
      { name: 'BUDI SETIAWAN', age: '35', relation: 'Anak Kandung' },
      { name: 'ANI MARYANI', age: '30', relation: 'Anak Kandung' }
    ],

    // Saksi
    witnesses: [
        { name: 'BAPAK RT 001', title: 'Ketua RT 001' },
        { name: 'BAPAK RW 002', title: 'Ketua RW 002' }
    ],

    // Pejabat
    villageHead: 'I WAYAN SUDIRTA, S.Sos',
    villageHeadNip: '19700101 199003 1 005',
    subDistrictHead: 'Drs. H. MULYONO, M.Si',
    subDistrictHeadNip: '19680505 198803 1 002'
  });

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const updateHeir = (idx: number, field: string, val: string) => {
    const newHeirs = [...data.heirs];
    // @ts-ignore
    newHeirs[idx][field] = val;
    setData({ ...data, heirs: newHeirs });
  };
  const addHeir = () => setData({ ...data, heirs: [...data.heirs, { name: '', age: '', relation: '' }] });
  const removeHeir = (idx: number) => {
    const arr = [...data.heirs]; arr.splice(idx, 1); setData({ ...data, heirs: arr });
  };

  const updateWitness = (idx: number, field: string, val: string) => {
    const newWits = [...data.witnesses];
    // @ts-ignore
    newWits[idx][field] = val;
    setData({ ...data, witnesses: newWits });
  };

  // --- KONTEN SURAT (Komponen Internal) ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: DINAS RESMI (Kop Desa) ---
      return (
        <div className="font-serif text-[10.5pt] text-slate-900 leading-relaxed">
           {/* KOP SURAT */}
           <div className="flex items-center border-b-4 border-double border-black pb-4 mb-6 text-center relative">
              {logo ? <img src={logo} className="w-24 h-24 object-contain absolute left-0 top-0" alt="Logo" /> : null}
              <div className="flex-grow px-20">
                 <h3 className="text-[12pt] font-bold uppercase">PEMERINTAH KABUPATEN/KOTA {data.city}</h3>
                 <h2 className="text-[14pt] font-black uppercase">{data.district}</h2>
                 <h1 className="text-[16pt] font-black uppercase underline">{data.village}</h1>
                 <p className="text-[9pt] font-sans mt-1 italic">{data.villageAddress}</p>
              </div>
           </div>

           {/* JUDUL */}
           <div className="text-center mb-6">
              <h2 className="text-lg font-bold underline uppercase">SURAT KETERANGAN AHLI WARIS</h2>
              <p className="text-[10pt] font-sans">Nomor: {data.docNo}</p>
           </div>

           {/* BODY */}
           <div className="text-justify">
              <p className="mb-4">Yang bertanda tangan di bawah ini Lurah/Kepala Desa <strong>{data.village}</strong>, Kecamatan {data.district}, {data.city}, menerangkan dengan sebenarnya bahwa pada tanggal <strong>{new Date(data.deceasedDeathDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</strong> telah meninggal dunia:</p>
              
              <div className="ml-4 mb-4 space-y-1 font-sans text-[10pt] border-l-2 border-slate-300 pl-4">
                 <table className="w-full">
                    <tbody>
                        <tr><td className="w-[140px]">Nama Almarhum</td><td>:</td><td className="font-bold uppercase">{data.deceasedName}</td></tr>
                        <tr><td>NIK</td><td>:</td><td>{data.deceasedNik}</td></tr>
                        <tr><td>Umur / Agama</td><td>:</td><td>{data.deceasedAge} Tahun / {data.deceasedReligion}</td></tr>
                        <tr><td className="align-top">Alamat Terakhir</td><td className="align-top">:</td><td>{data.deceasedAddress}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4">Berdasarkan Surat Keterangan Kematian dan data kependudukan yang ada, Almarhum/ah meninggalkan Ahli Waris yang sah sebagai berikut:</p>

              {/* TABEL AHLI WARIS (Break Avoid) */}
              <table className="w-full border-collapse border border-black mb-6 font-sans text-[9pt]">
                 <thead className="bg-slate-100 uppercase font-bold text-center">
                    <tr>
                       <th className="border border-black p-2 w-8">No</th>
                       <th className="border border-black p-2 text-left">Nama Lengkap</th>
                       <th className="border border-black p-2 w-16">Umur</th>
                       <th className="border border-black p-2">Hubungan</th>
                       <th className="border border-black p-2 w-32">Tanda Tangan</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.heirs.map((heir, i) => (
                       <tr key={i} style={{ pageBreakInside: 'avoid' }}>
                          <td className="border border-black p-2 text-center">{i + 1}.</td>
                          <td className="border border-black p-2 font-bold uppercase">{heir.name}</td>
                          <td className="border border-black p-2 text-center">{heir.age}</td>
                          <td className="border border-black p-2">{heir.relation}</td>
                          <td className="border border-black p-2 relative text-[8pt] text-slate-400 italic">
                             <span className={i % 2 === 0 ? "float-left" : "float-right"}>{i + 1}. ...........</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              <p>Demikian Surat Keterangan Waris ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
           </div>

           {/* PENGESAHAN (Break Avoid) */}
           <div className="mt-4 pt-4 border-t border-slate-900" style={{ pageBreakInside: 'avoid' }}>
              <table className="w-full text-[10pt]">
                 <tbody>
                    <tr className="text-center align-top">
                       <td className="w-1/3">
                          <p className="mb-16">Mengetahui,<br/><strong>CAMAT {data.district}</strong></p>
                          <p className="font-bold underline uppercase">{data.subDistrictHead}</p>
                          <p>NIP. {data.subDistrictHeadNip}</p>
                       </td>
                       <td className="w-1/3">
                          <p className="mb-16">Saksi-Saksi:<br/><br/></p>
                          <div className="space-y-4 text-left pl-8">
                             {data.witnesses.map((w, i) => (
                                <div key={i}>
                                   <span className="font-bold">{i+1}. {w.name}</span><br/>
                                   <span className="italic text-[9pt]">({w.title})</span>
                                </div>
                             ))}
                          </div>
                       </td>
                       <td className="w-1/3">
                          <p className="mb-16">{data.city.split(' ').pop()}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}<br/><strong>LURAH/KEPALA DESA</strong></p>
                          <p className="font-bold underline uppercase">{data.villageHead}</p>
                          <p>NIP. {data.villageHeadNip}</p>
                       </td>
                    </tr>
                    <tr className="text-center text-[9pt] italic text-slate-500">
                        <td><br/>No. Reg: {data.regKecamatan}</td>
                        <td></td>
                        <td><br/>No. Reg: {data.docNo}</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: MODERN CLEAN ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-800 leading-relaxed">
           <div className="border-b-2 border-emerald-600 pb-4 mb-8 flex justify-between items-end">
              <div>
                 <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">SURAT KETERANGAN WARIS</h1>
                 <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Pemerintah {data.village}</p>
              </div>
              <div className="text-right">
                 <p className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">No: {data.docNo}</p>
              </div>
           </div>

           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Data Almarhum</h3>
              <div className="grid grid-cols-[120px_1fr] gap-1.5">
                 <span className="text-slate-500">Nama</span><span className="font-bold uppercase">{data.deceasedName}</span>
                 <span className="text-slate-500">Tanggal Wafat</span><span>{new Date(data.deceasedDeathDate).toLocaleDateString('id-ID', {dateStyle: 'full'})}</span>
                 <span className="text-slate-500">Alamat</span><span>{data.deceasedAddress}</span>
              </div>
           </div>

           <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Ahli Waris Sah</h3>
              <div className="space-y-3">
                 {data.heirs.map((heir, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">{idx+1}</div>
                          <div>
                             <p className="font-bold uppercase text-sm">{heir.name}</p>
                             <p className="text-xs text-slate-500">{heir.age} Tahun</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{heir.relation}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mt-8 pt-8 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
              <div className="grid grid-cols-2 gap-10">
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4 text-center">Diketahui & Disahkan Oleh</p>
                    <div className="text-center space-y-12">
                       <div>
                          <p className="font-bold underline uppercase text-sm">{data.villageHead}</p>
                          <p className="text-xs text-emerald-600 font-bold">Kepala Desa / Lurah</p>
                       </div>
                       <div>
                          <p className="font-bold underline uppercase text-sm">{data.subDistrictHead}</p>
                          <p className="text-xs text-emerald-600 font-bold">Camat {data.district}</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase mb-4">Saksi - Saksi</p>
                    <div className="space-y-6">
                       {data.witnesses.map((w, i) => (
                          <div key={i} className="flex justify-between items-end border-b border-slate-200 pb-1">
                             <span className="text-sm font-bold">{w.name}</span>
                             <span className="text-xs text-slate-500">{w.title}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS RAHASIA: TABLE WRAPPER STRATEGY --- */}
      {/* Ini adalah fix untuk masalah halaman 1 kosong & margin halaman 2 */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          
          body { 
            background: white; 
            margin: 0; 
            padding: 0; 
            display: block !important; 
          }

          /* Container Utama Print */
          #print-only-root {
            display: block !important;
            width: 100%;
            height: auto;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9999;
            background: white;
          }

          /* Table Wrapper Logic */
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } /* Jarak Atas Halaman 1, 2, dst */
          .print-table tfoot { height: 20mm; } /* Jarak Bawah Halaman */
          
          .print-content-wrapper { padding: 0 20mm; } /* Jarak Kiri Kanan */
          
          tr, .keep-together { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Desa <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Dinas' : 'Format Modern'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Dinas</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Modern</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Landmark size={12}/> Kop Pemerintah Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="flex gap-4 items-center">
                        <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0">
                           {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                        </div>
                        <div className="flex-1 space-y-2">
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan..." />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Desa/Kelurahan..." />
                        </div>
                     </div>
                     <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kabupaten/Kota..." />
                     <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.villageAddress} onChange={e => handleDataChange('villageAddress', e.target.value)} placeholder="Alamat Kantor..." />
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Data Almarhum</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Wafat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Umur (Thn)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedAge} onChange={e => handleDataChange('deceasedAge', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedReligion} onChange={e => handleDataChange('deceasedReligion', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Terakhir</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} /></div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Users size={12}/> Ahli Waris</h3><button onClick={addHeir} className="text-[10px] font-bold bg-white border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 shadow-sm">+ Tambah</button></div>
                  <div className="space-y-3">
                     {data.heirs.map((h, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group hover:border-emerald-400 transition-all">
                           <button onClick={() => removeHeir(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                           <input className="w-full p-1.5 border-b border-slate-200 text-xs font-bold bg-transparent mb-2" placeholder="Nama Lengkap..." value={h.name} onChange={e => updateHeir(idx, 'name', e.target.value)} />
                           <div className="grid grid-cols-[80px_1fr] gap-3">
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent" placeholder="Umur..." value={h.age} onChange={e => updateHeir(idx, 'age', e.target.value)} />
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent" placeholder="Hubungan..." value={h.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><LayoutTemplate size={12}/> Legalitas & Pejabat</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. Surat Desa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Reg. Kecamatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.regKecamatan} onChange={e => handleDataChange('regKecamatan', e.target.value)} /></div>
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lurah/Kades</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Lurah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.villageHeadNip} onChange={e => handleDataChange('villageHeadNip', e.target.value)} /></div>
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Camat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.subDistrictHead} onChange={e => handleDataChange('subDistrictHead', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Camat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.subDistrictHeadNip} onChange={e => handleDataChange('subDistrictHeadNip', e.target.value)} /></div>
                      </div>
                      
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-2">
                         <label className="text-[10px] font-bold text-slate-500">Saksi (RT/RW)</label>
                         {data.witnesses.map((w, idx) => (
                            <div key={idx} className="flex gap-2">
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs" value={w.name} onChange={e => updateWitness(idx, 'name', e.target.value)} placeholder="Nama Saksi" />
                               <input className="w-24 p-2 border border-slate-200 rounded text-xs" value={w.title} onChange={e => updateWitness(idx, 'title', e.target.value)} placeholder="Jabatan" />
                            </div>
                         ))}
                      </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}