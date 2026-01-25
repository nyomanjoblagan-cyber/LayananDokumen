'use client';

/**
 * FILE: AhliWarisPage.tsx
 * STATUS: STABILIZED & CRASH PROOF
 * DESC: Generator Surat Pernyataan Ahli Waris dengan Safety Check
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, Plus, Trash2, Users, Gavel, 
  ScrollText, ChevronDown, LayoutTemplate, 
  Edit3, Eye, ArrowLeftCircle, UserCheck, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface Heir {
  name: string;
  age: string;
  relation: string;
}

interface Witness {
  name: string;
  title: string;
}

interface HeirData {
  city: string;
  date: string;
  
  // Data Pewaris
  deceasedName: string;
  deceasedDate: string;
  deceasedLocation: string;
  deceasedAddr: string;
  deceasedReligion: string;
  
  // Aset (Array String)
  assets: string[];
  
  // Data Array
  heirs: Heir[];
  witnesses: Witness[];
  
  // Pejabat (Opsional)
  officialName: string;
  officialTitle: string;
  officialNip: string;
}

// --- 2. DATA DEFAULT (Fresh State) ---
const INITIAL_DATA: HeirData = {
  city: 'JAKARTA SELATAN',
  date: '', 
  
  deceasedName: 'H. SUDIRMAN BIN KARTOPRAWIRO',
  deceasedDate: '2025-05-20',
  deceasedLocation: 'RS. Cipto Mangunkusumo',
  deceasedAddr: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
  deceasedReligion: 'Islam',
  
  // Default Assets
  assets: [
    'Sebidang tanah dan bangunan SHM No. 1234/Tebet seluas 250 m2 yang terletak di Jl. Mawar No. 45, Jakarta Selatan.',
    'Saldo Tabungan Bank Mandiri Rekening No: 123-000-xxx a.n Sudirman.'
  ],
  
  heirs: [
    { name: 'SITI AMINAH', age: '52', relation: 'Istri / Janda' },
    { name: 'BUDI SANTOSO', age: '30', relation: 'Anak Kandung' },
    { name: 'LESTARI PUTRI', age: '27', relation: 'Anak Kandung' },
  ],
  
  witnesses: [
      { name: 'BAMBANG S.', title: 'Ketua RT 005' },
      { name: 'SUHARTO', title: 'Ketua RW 02' }
  ],
  
  officialName: '',
  officialTitle: 'LURAH / KEPALA DESA',
  officialNip: ''
};

// --- 3. KOMPONEN UTAMA ---
export default function AhliWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Ahli Waris...</div>}>
      <AhliWarisToolBuilder />
    </Suspense>
  );
}

function AhliWarisToolBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  // Menggunakan Initial Data yang aman
  const [data, setData] = useState<HeirData>(INITIAL_DATA);

  // SELF-HEALING EFFECT: Memastikan struktur data lengkap saat dimuat
  useEffect(() => {
    setData(prev => ({
      ...INITIAL_DATA, // Base structure
      ...prev, // Merge existing data
      // Pastikan array tidak undefined
      assets: prev?.assets || INITIAL_DATA.assets,
      heirs: prev?.heirs || INITIAL_DATA.heirs,
      witnesses: prev?.witnesses || INITIAL_DATA.witnesses,
      date: new Date().toISOString().split('T')[0] // Update tanggal
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof HeirData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const updateHeir = (idx: number, field: keyof Heir, val: string) => {
    const newHeirs = [...(data.heirs || [])]; // Safety check
    newHeirs[idx] = { ...newHeirs[idx], [field]: val };
    setData(prev => ({ ...prev, heirs: newHeirs }));
  };
  const addHeir = () => setData(prev => ({ ...prev, heirs: [...(prev.heirs || []), { name: '', age: '', relation: '' }] }));
  const removeHeir = (idx: number) => {
    const arr = [...(data.heirs || [])]; arr.splice(idx, 1); setData(prev => ({ ...prev, heirs: arr }));
  };

  const updateAsset = (idx: number, val: string) => {
    const newAssets = [...(data.assets || [])];
    newAssets[idx] = val;
    setData(prev => ({ ...prev, assets: newAssets }));
  };
  const addAsset = () => setData(prev => ({ ...prev, assets: [...(prev.assets || []), ''] }));
  const removeAsset = (idx: number) => {
    const arr = [...(data.assets || [])]; arr.splice(idx, 1); setData(prev => ({ ...prev, assets: arr }));
  };

  const updateWitness = (idx: number, field: keyof Witness, val: string) => {
    const newWits = [...(data.witnesses || [])];
    newWits[idx] = { ...newWits[idx], [field]: val };
    setData(prev => ({ ...prev, witnesses: newWits }));
  };
  const addWitness = () => setData(prev => ({ ...prev, witnesses: [...(prev.witnesses || []), { name: '', title: '' }] }));
  const removeWitness = (idx: number) => {
    const arr = [...(data.witnesses || [])]; arr.splice(idx, 1); setData(prev => ({ ...prev, witnesses: arr }));
  };

  const handleReset = () => {
    if(confirm('Reset semua data ke default?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    // SAFETY VARS: Mencegah crash jika data.assets/heirs undefined
    const safeAssets = data.assets || [];
    const safeHeirs = data.heirs || [];
    const safeWitnesses = data.witnesses || [];

    if (templateId === 1) {
      // === TEMPLATE 1: FORMAL LEGAL ===
      return (
        <div className="font-serif text-[11pt] text-black leading-[1.6]">
           
           <div className="text-center mb-8">
              <h1 className="text-[13pt] font-bold uppercase underline decoration-2 underline-offset-4 tracking-wider">SURAT PERNYATAAN AHLI WARIS</h1>
           </div>

           <div className="text-justify px-1">
              <p className="mb-4">Kami yang bertanda tangan di bawah ini, para Ahli Waris dari Almarhum/Almarhumah <strong>{data.deceasedName}</strong>, dengan ini menyatakan dengan sesungguhnya dan berani angkat sumpah:</p>
              
              <div className="pl-4 mb-4">
                 <p className="mb-1">Bahwa pada tanggal <strong>{formatDate(data.deceasedDate)}</strong> telah meninggal dunia di <strong>{data.deceasedLocation}</strong> seorang laki-laki/perempuan bernama:</p>
                 <table className="w-full mt-2 text-[11pt] ml-4">
                    <tbody>
                       <tr><td className="w-[140px] align-top">Nama</td><td className="align-top px-2">:</td><td className="font-bold uppercase align-top">{data.deceasedName}</td></tr>
                       <tr><td className="align-top">Agama</td><td className="align-top px-2">:</td><td className="align-top">{data.deceasedReligion}</td></tr>
                       <tr><td className="align-top">Alamat Terakhir</td><td className="align-top px-2">:</td><td className="align-top">{data.deceasedAddr}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4">Bahwa Almarhum/Almarhumah semasa hidupnya pernah menikah sah dan menurunkan Ahli Waris yang sah sebagai berikut:</p>
              
              <table className="w-full mb-6 border-collapse text-[10pt] border border-black font-sans">
                <thead className="bg-slate-100 uppercase font-bold text-center">
                   <tr>
                      <th className="border border-black p-2 w-10">No</th>
                      <th className="border border-black p-2 text-left">Nama Lengkap</th>
                      <th className="border border-black p-2 w-16">Umur</th>
                      <th className="border border-black p-2 text-left">Hubungan Keluarga</th>
                   </tr>
                </thead>
                <tbody>
                   {safeHeirs.map((heir, idx) => (
                     <tr key={idx} style={{ pageBreakInside: 'avoid' }}>
                        <td className="border border-black p-2 text-center">{idx + 1}.</td>
                        <td className="border border-black p-2 font-bold uppercase">{heir.name}</td>
                        <td className="border border-black p-2 text-center">{heir.age}</td>
                        <td className="border border-black p-2">{heir.relation}</td>
                     </tr>
                   ))}
                </tbody>
              </table>

              <p className="mb-2">Bahwa Almarhum/Almarhumah meninggalkan harta warisan (Tirkah) berupa:</p>
              
              {/* RENDERING LIST ASET (SAFETY) */}
              <div className="mb-6 ml-4">
                 {safeAssets.length === 0 ? (
                    <p className="italic text-slate-400 text-sm">[Belum ada aset yang ditambahkan]</p>
                 ) : safeAssets.length === 1 ? (
                    <p className="italic text-justify font-bold">"{safeAssets[0]}"</p>
                 ) : (
                    <ol className="list-decimal pl-5 space-y-1 text-justify">
                        {safeAssets.map((item, i) => (
                            <li key={i} className="pl-1">{item}</li>
                        ))}
                    </ol>
                 )}
              </div>
              
              <p className="indent-12">Demikian Surat Pernyataan ini kami buat dengan sebenarnya dalam keadaan sadar tanpa paksaan dari pihak manapun, dan apabila dikemudian hari ternyata pernyataan ini tidak benar, maka kami bersedia dituntut sesuai dengan ketentuan hukum yang berlaku (Pasal 263 KUHP tentang Pemalsuan Surat).</p>
           </div>

           {/* AREA TTD */}
           <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-center mb-6">{data.city}, {formatDate(data.date)}</p>
              
              <div className="mb-10">
                 <p className="font-bold underline mb-6 text-center text-[10pt] uppercase">PARA AHLI WARIS:</p>
                 <div className="grid grid-cols-3 gap-y-12 gap-x-4 justify-items-center">
                    {safeHeirs.map((heir, idx) => (
                       <div key={idx} className="flex flex-col items-center min-w-[120px]">
                          <div className="h-20 flex items-center justify-center w-full mb-1 relative">
                             {idx === 0 && (
                                <div className="border border-slate-400 text-[8pt] text-slate-400 w-16 h-8 flex items-center justify-center absolute bottom-0">
                                   MATERAI
                                </div>
                             )}
                          </div>
                          <p className="font-bold underline uppercase text-[10pt] text-center">{heir.name}</p>
                          <p className="text-[8pt] italic text-center">({heir.relation})</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="border-t border-black/20 pt-8">
                 <div className="flex justify-between items-start">
                     <div className="w-[45%] text-center">
                        <p className="font-bold underline mb-6 text-[10pt]">SAKSI-SAKSI:</p>
                        <div className="space-y-8 text-left pl-8">
                           {safeWitnesses.map((w, i) => (
                              <div key={i}>
                                 <div className="flex items-end gap-2 mb-1">
                                    <span className="font-bold text-[10pt]">{i+1}. {w.name}</span>
                                 </div>
                                 <div className="border-b border-black w-[80%] mb-1"></div>
                                 <p className="text-[9pt] italic">({w.title})</p>
                              </div>
                           ))}
                        </div>
                     </div>
                     
                     {data.officialName && (
                        <div className="w-[45%] text-center">
                           <p className="mb-20 text-[10pt]">Mengetahui / Mencatatkan,<br/><span className="font-bold uppercase">{data.officialTitle}</span></p>
                           <p className="font-bold underline uppercase text-[11pt]">{data.officialName}</p>
                           {data.officialNip && <p className="text-[10pt]">NIP. {data.officialNip}</p>}
                        </div>
                     )}
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // === TEMPLATE 2: MODERN CLEAN ===
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-relaxed">
           <div className="border-b-2 border-emerald-500 pb-4 mb-6">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Surat Pernyataan Waris</h1>
              <p className="text-emerald-600 font-bold">Keluarga Besar Alm. {data.deceasedName}</p>
           </div>

           <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Pewaris</p>
              <div className="grid grid-cols-[80px_1fr] gap-1 text-[10pt]">
                 <span className="text-slate-500">Nama</span><span className="font-bold uppercase">{data.deceasedName}</span>
                 <span className="text-slate-500">Wafat</span><span>{formatDate(data.deceasedDate)} di {data.deceasedLocation}</span>
              </div>
           </div>

           <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Daftar Ahli Waris</p>
              <div className="space-y-2">
                 {safeHeirs.map((heir, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
                       <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9pt]">{idx+1}</div>
                          <div><p className="font-bold uppercase text-sm">{heir.name}</p><p className="text-[9pt] text-slate-500">{heir.relation}</p></div>
                       </div>
                       <div className="text-right text-[10pt] font-mono">{heir.age} Thn</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Objek Waris (Tirkah)</p>
              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  {safeAssets.length === 0 ? (
                      <p className="italic text-slate-400 text-sm">Belum ada aset.</p>
                  ) : safeAssets.length === 1 ? (
                      <p className="italic text-slate-700">"{safeAssets[0]}"</p>
                  ) : (
                      <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                          {safeAssets.map((item, i) => <li key={i}>{item}</li>)}
                      </ol>
                  )}
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-center text-xs text-slate-400 mb-8">{data.city}, {formatDate(data.date)}</p>
              <div className="grid grid-cols-3 gap-8 text-center mb-12">
                 {safeHeirs.map((h, i) => (
                    <div key={i}>
                       <div className="h-12 w-full"></div>
                       <p className="font-bold border-b border-slate-300 pb-1 text-[10pt] uppercase">{h.name}</p>
                       <p className="text-[8pt] text-slate-400 mt-0.5">Ahli Waris</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
        }
      `}</style>

      {/* HEADER */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Ahli Waris <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Formal Legal' : 'Modern Clean'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Formal Legal</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Modern Clean</button>
                     </div>
                  )}
               </div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Data Waris</h2>
                <button onClick={handleReset} title="Reset" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. DATA PEWARIS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Gavel size={12} /> Data Pewaris</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap (Alm/Almh)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Wafat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedDate} onChange={e => handleDataChange('deceasedDate', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedReligion} onChange={e => handleDataChange('deceasedReligion', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Lokasi Wafat (RS/Rumah)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedLocation} onChange={e => handleDataChange('deceasedLocation', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Terakhir</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.deceasedAddr} onChange={e => handleDataChange('deceasedAddr', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. AHLI WARIS */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Users size={12}/> Ahli Waris</h3><button onClick={addHeir} className="text-[10px] font-bold bg-white border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 shadow-sm transition-all active:scale-95">+ Tambah</button></div>
                  <div className="space-y-3">
                     {(data.heirs || []).map((h, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group hover:border-emerald-400 transition-all">
                           <button onClick={() => removeHeir(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                           <input className="w-full p-1.5 border-b border-slate-200 text-xs font-bold bg-transparent mb-2 uppercase focus:outline-none focus:border-emerald-500" placeholder="Nama Lengkap..." value={h.name} onChange={e => updateHeir(idx, 'name', e.target.value)} />
                           <div className="grid grid-cols-[80px_1fr] gap-3">
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent focus:outline-none focus:border-emerald-500" placeholder="Umur..." value={h.age} onChange={e => updateHeir(idx, 'age', e.target.value)} />
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent focus:outline-none focus:border-emerald-500" placeholder="Hubungan..." value={h.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 3. ASET (FITUR BARU) */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><ScrollText size={12} /> Aset & Lokasi</h3><button onClick={addAsset} className="text-[10px] font-bold bg-white border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 shadow-sm transition-all active:scale-95">+ Tambah Aset</button></div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500">Daftar Harta Warisan</label>
                        {(data.assets || []).map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start group">
                                <span className="text-xs font-bold text-slate-300 py-2">{idx+1}.</span>
                                <textarea className="flex-1 p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-16" placeholder={`Deskripsi Aset ke-${idx+1}`} value={item} onChange={e => updateAsset(idx, e.target.value)} />
                                <button onClick={() => removeAsset(idx)} className="text-slate-300 hover:text-red-500 pt-2"><Trash2 size={14}/></button>
                            </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Kota Tempat Pembuatan Surat</label>
                          <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. LEGALITAS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCheck size={12} /> Legalitas</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-2">
                         <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-500">Daftar Saksi (RT/RW/Tokoh)</label><button onClick={addWitness} className="text-[9px] text-blue-600 font-bold hover:underline">+ Tambah</button></div>
                         {(data.witnesses || []).map((w, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Saksi" value={w.name} onChange={e => updateWitness(idx, 'name', e.target.value)} />
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jabatan" value={w.title} onChange={e => updateWitness(idx, 'title', e.target.value)} />
                               <button onClick={() => removeWitness(idx)} className="text-slate-300 hover:text-red-500"><Trash2 size={14}/></button>
                            </div>
                         ))}
                      </div>
                      <div className="pt-3 border-t border-dashed border-slate-200 space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 block">Pejabat (Lurah/Kades) - Opsional</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Pejabat" value={data.officialName} onChange={e => handleDataChange('officialName', e.target.value)} />
                         <div className="grid grid-cols-2 gap-2">
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jabatan (Lurah/Kades)" value={data.officialTitle} onChange={e => handleDataChange('officialTitle', e.target.value)} />
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="NIP (Jika Ada)" value={data.officialNip} onChange={e => handleDataChange('officialNip', e.target.value)} />
                         </div>
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
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT ONLY PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '15mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '15mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
