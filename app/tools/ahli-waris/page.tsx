'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Plus, Trash2, 
  Users, Gavel, ScrollText, ChevronDown, Check, LayoutTemplate,
  Edit3, Eye, ArrowLeftCircle, UserCheck, Building2, FileText
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function AhliWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Ahli Waris...</div>}>
      <AhliWarisToolBuilder />
    </Suspense>
  );
}

function AhliWarisToolBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    deceasedName: 'H. Sudirman bin Kartoprawiro',
    deceasedDate: '2025-05-20',
    deceasedLocation: 'RS. Cipto Mangunkusumo, Jakarta',
    deceasedAddr: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
    deceasedReligion: 'Islam',
    assetDescription: 'Sebidang tanah dan bangunan SHM No. 1234/Tebet seluas 250 m2 di Jl. Mawar No. 45, serta Saldo Tabungan Bank Mandiri Rek: 123-000-xxx a.n Sudirman.',
    heirs: [
      { name: 'Siti Aminah', age: '52', relation: 'Istri / Janda' },
      { name: 'Budi Santoso', age: '30', relation: 'Anak Kandung' },
      { name: 'Lestari Putri', age: '27', relation: 'Anak Kandung' },
    ],
    agreement: 'Sepakat menunjuk Sdr. BUDI SANTOSO sebagai kuasa waris untuk mengurus balik nama sertifikat tanah dan pencairan dana bank tersebut untuk kemudian dibagikan kepada seluruh ahli waris sesuai hukum Faraid.',
    witnesses: [
        { name: 'Bambang S.', title: 'Ketua RT 005' },
        { name: 'Suharto', title: 'Ketua RW 02' }
    ],
    officialName: '',
    officialTitle: 'Lurah / Kepala Desa'
  });

  // HANDLERS
  const handleHeirChange = (idx: number, field: string, val: string) => {
    const newHeirs = [...data.heirs];
    // @ts-ignore
    newHeirs[idx][field] = val;
    setData({ ...data, heirs: newHeirs });
  };
  const addHeir = () => setData({ ...data, heirs: [...data.heirs, { name: '', age: '', relation: '' }] });
  const removeHeir = (idx: number) => {
    const newHeirs = [...data.heirs];
    newHeirs.splice(idx, 1);
    setData({ ...data, heirs: newHeirs });
  };

  const handleWitnessChange = (idx: number, field: string, val: string) => {
    const newWits = [...data.witnesses];
    // @ts-ignore
    newWits[idx][field] = val;
    setData({ ...data, witnesses: newWits });
  };
  const addWitness = () => setData({ ...data, witnesses: [...data.witnesses, { name: '', title: '' }] });
  const removeWitness = (idx: number) => {
    const newWits = [...data.witnesses];
    newWits.splice(idx, 1);
    setData({ ...data, witnesses: newWits });
  };

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // FORMAL LEGAL
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           <div className="text-center mb-6">
              <h1 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4 tracking-wider">SURAT PERNYATAAN & KESEPAKATAN AHLI WARIS</h1>
           </div>

           <div className="text-justify">
              <p className="mb-3">Kami yang bertanda tangan di bawah ini, para Ahli Waris dari Almarhum/Almarhumah <strong>{data.deceasedName}</strong>, dengan ini menyatakan dengan sesungguhnya:</p>
              
              <div className="pl-6 mb-3">
                 <p>Bahwa pada tanggal <strong>{new Date(data.deceasedDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong> telah meninggal dunia di <strong>{data.deceasedLocation}</strong>:</p>
                 <table className="w-full mt-1 text-[11pt]">
                    <tbody>
                        <tr><td className="w-[130px]">Nama</td><td>:</td><td className="font-bold uppercase">{data.deceasedName}</td></tr>
                        <tr><td>Agama</td><td>:</td><td>{data.deceasedReligion}</td></tr>
                        <tr><td className="align-top">Alamat Terakhir</td><td className="align-top">:</td><td>{data.deceasedAddr}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-2">Bahwa Almarhum/Almarhumah meninggalkan Ahli Waris yang sah sebagai berikut:</p>
              
              {/* TABEL AHLI WARIS */}
              <table className="w-full mb-4 border-collapse text-[10pt] border border-slate-900">
                <thead>
                   <tr className="bg-slate-100">
                      <th className="border border-slate-900 p-1.5 text-center w-8">No</th>
                      <th className="border border-slate-900 p-1.5 text-left">Nama Lengkap</th>
                      <th className="border border-slate-900 p-1.5 text-center w-14">Umur</th>
                      <th className="border border-slate-900 p-1.5 text-left">Hubungan Keluarga</th>
                   </tr>
                </thead>
                <tbody>
                   {data.heirs.map((heir, idx) => (
                     <tr key={idx} style={{ pageBreakInside: 'avoid' }}>
                        <td className="border border-slate-900 p-1.5 text-center">{idx + 1}</td>
                        <td className="border border-slate-900 p-1.5 font-bold uppercase">{heir.name}</td>
                        <td className="border border-slate-900 p-1.5 text-center">{heir.age}</td>
                        <td className="border border-slate-900 p-1.5">{heir.relation}</td>
                     </tr>
                   ))}
                </tbody>
              </table>

              <p className="mb-1">Bahwa Almarhum/Almarhumah meninggalkan harta warisan (Tirkah) berupa:</p>
              <div className="bg-slate-50 p-2 border border-slate-300 italic mb-3 text-[11pt] rounded">
                 "{data.assetDescription}"
              </div>

              <p className="mb-1">Berdasarkan musyawarah kekeluargaan, kami menyepakati hal-hal sebagai berikut:</p>
              <div className="bg-slate-50 p-3 border border-slate-300 mb-4 font-medium text-[11pt] rounded text-justify">
                 {data.agreement}
              </div>
              
              <p>Demikian Surat Pernyataan ini kami buat dengan sebenarnya tanpa paksaan, dan kami bersedia dituntut sesuai hukum apabila ada keterangan yang tidak benar.</p>
           </div>

           {/* AREA TTD (Break Avoid agar tidak putus) */}
           <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-center mb-4">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
              
              <div className="text-center mb-8">
                 <p className="font-bold underline mb-4 text-[10pt]">PARA AHLI WARIS:</p>
                 <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
                    {data.heirs.map((heir, idx) => (
                       <div key={idx} className="flex flex-col items-center min-w-[120px]">
                          <div className="h-16 flex items-end justify-center w-full mb-1">
                             {idx === 0 && <div className="border border-slate-400 text-[7px] p-1 text-slate-400 w-14 h-8 flex items-center justify-center">MATERAI</div>}
                          </div>
                          <p className="font-bold underline uppercase text-[10pt]">{heir.name}</p>
                          <p className="text-[8pt] italic">({heir.relation})</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div>
                     <p className="font-bold underline mb-4 text-center text-[10pt]">SAKSI-SAKSI:</p>
                     <div className="space-y-6">
                        {data.witnesses.map((w, i) => (
                           <div key={i} className="flex justify-between items-end border-b border-dotted border-slate-400 pb-1 text-[10pt]">
                              <span>{i+1}. {w.name} ({w.title})</span>
                              <span className="text-slate-400 italic">(.................)</span>
                           </div>
                        ))}
                     </div>
                 </div>
                 
                 <div className="text-center">
                     {data.officialName ? (
                        <>
                           <p className="mb-16 text-[10pt]">Mengetahui/Mencatatkan,<br/><strong>{data.officialTitle}</strong></p>
                           <p className="font-bold underline uppercase">{data.officialName}</p>
                           <p className="text-[9pt]">NIP. ..........................</p>
                        </>
                     ) : null}
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // MODERN CLEAN
      return (
        <div className="font-sans text-[10pt] text-slate-800 leading-relaxed">
           <div className="border-b-2 border-emerald-500 pb-4 mb-6">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Kesepakatan Waris</h1>
              <p className="text-emerald-600 font-bold">Keluarga Besar Alm. {data.deceasedName}</p>
           </div>

           <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Pewaris</p>
              <div className="grid grid-cols-[80px_1fr] gap-1 text-[10pt]">
                 <span className="text-slate-500">Nama</span><span className="font-bold">{data.deceasedName}</span>
                 <span className="text-slate-500">Wafat</span><span>{new Date(data.deceasedDate).toLocaleDateString('id-ID')} di {data.deceasedLocation}</span>
                 <span className="text-slate-500">Alamat</span><span>{data.deceasedAddr}</span>
              </div>
           </div>

           <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Daftar Ahli Waris</p>
              <div className="space-y-2">
                 {data.heirs.map((heir, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
                       <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9pt]">{idx+1}</div>
                          <span className="font-bold">{heir.name}</span>
                       </div>
                       <div className="text-right">
                          <span className="text-[9pt] bg-slate-100 px-2 py-0.5 rounded text-slate-600">{heir.relation}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Objek Waris & Kesepakatan</p>
              <p className="mb-2 italic text-slate-600 bg-slate-50 p-2 rounded border border-dashed border-slate-200">"{data.assetDescription}"</p>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-justify font-medium">{data.agreement}</div>
           </div>

           <div className="mt-4 pt-4 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-right text-xs text-slate-400 mb-6">{data.city}, {new Date(data.date).toLocaleDateString('id-ID')}</p>
              <div className="flex flex-wrap justify-center gap-8 text-center mb-8">
                 {data.heirs.map((h, i) => (
                    <div key={i} className="min-w-[100px]">
                       <div className="h-10 w-full"></div>
                       <p className="font-bold border-b border-slate-300 pb-1">{h.name}</p>
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
      
      {/* --- JURUS RAHASIA CSS PRINT --- */}
      <style jsx global>{`
        @media print {
          /* 1. HAPUS SEMUA FORMAT BAWAAN BROWSER */
          @page { 
            size: A4; 
            margin: 0; /* Hapus Text LayananOnline.com */
          }
          
          /* 2. RESET BODY: Pastikan block display untuk mencegah halaman kosong */
          body { 
            background: white; 
            margin: 0; 
            padding: 0; 
            display: block !important; 
          }

          /* 3. SEMBUNYIKAN UI WEB */
          .no-print, header, nav { display: none !important; }

          /* 4. CONTAINER PRINT */
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

          /* 5. STRATEGI TABLE WRAPPER (Agar Margin Halaman 2,3 dst Aman) */
          /* Kita pakai thead kosong untuk memaksa margin atas di tiap halaman */
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } /* Tinggi Margin Atas */
          .print-table tfoot { height: 20mm; } /* Tinggi Margin Bawah */
          
          /* Isi surat masuk di tbody */
          .print-content-wrapper { padding: 0 20mm; } /* Margin Kiri Kanan */
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
               {/* FORM (Sama seperti sebelumnya) */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Gavel size={12} /> Data Pewaris</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.deceasedName} onChange={e => setData({...data, deceasedName: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Wafat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedDate} onChange={e => setData({...data, deceasedDate: e.target.value})} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedReligion} onChange={e => setData({...data, deceasedReligion: e.target.value})} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Lokasi Wafat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.deceasedLocation} onChange={e => setData({...data, deceasedLocation: e.target.value})} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Terakhir</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.deceasedAddr} onChange={e => setData({...data, deceasedAddr: e.target.value})} /></div>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Users size={12}/> Ahli Waris</h3><button onClick={addHeir} className="text-[10px] font-bold bg-white border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 shadow-sm">+ Tambah</button></div>
                  <div className="space-y-3">
                     {data.heirs.map((h, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group hover:border-emerald-400 transition-all">
                           <button onClick={() => removeHeir(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                           <input className="w-full p-1.5 border-b border-slate-200 text-xs font-bold bg-transparent mb-2" placeholder="Nama Lengkap..." value={h.name} onChange={e => handleHeirChange(idx, 'name', e.target.value)} />
                           <div className="grid grid-cols-[80px_1fr] gap-3">
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent" placeholder="Umur..." value={h.age} onChange={e => handleHeirChange(idx, 'age', e.target.value)} />
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent" placeholder="Hubungan..." value={h.relation} onChange={e => handleHeirChange(idx, 'relation', e.target.value)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ScrollText size={12} /> Aset & Kesepakatan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Deskripsi Aset</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.assetDescription} onChange={e => setData({...data, assetDescription: e.target.value})} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Isi Kesepakatan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-24 resize-none bg-emerald-50/50" value={data.agreement} onChange={e => setData({...data, agreement: e.target.value})} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat & Tanggal Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} /></div>
                  </div>
               </div>
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCheck size={12} /> Legalitas</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-2">
                         <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-500">Daftar Saksi</label><button onClick={addWitness} className="text-[9px] text-blue-600 font-bold">+ Tambah</button></div>
                         {data.witnesses.map((w, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs" placeholder="Nama Saksi" value={w.name} onChange={e => handleWitnessChange(idx, 'name', e.target.value)} />
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs" placeholder="Jabatan" value={w.title} onChange={e => handleWitnessChange(idx, 'title', e.target.value)} />
                               <button onClick={() => removeWitness(idx)} className="text-slate-300 hover:text-red-500"><Trash2 size={14}/></button>
                            </div>
                         ))}
                      </div>
                      <div className="pt-3 border-t border-dashed border-slate-200 space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 block">Mengetahui (Pejabat) - Opsional</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" placeholder="Nama Pejabat" value={data.officialName} onChange={e => setData({...data, officialName: e.target.value})} />
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" placeholder="Jabatan" value={data.officialTitle} onChange={e => setData({...data, officialTitle: e.target.value})} />
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
                   {/* Preview di layar (simulasi) */}
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

      {/* --- PRINT ONLY PORTAL (TABLE WRAPPER STRATEGY) --- */}
      <div id="print-only-root" className="hidden">
         {/* Table Hack: Memaksa margin atas (thead) dan bawah (tfoot) di SETIAP halaman */}
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