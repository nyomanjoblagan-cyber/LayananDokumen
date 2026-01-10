'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Box, Briefcase, Key, Plus, Trash2, CalendarDays, FileText, User, 
  ArrowLeftCircle, Edit3, Eye, PackageCheck
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BASTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Logistik...</div>}>
      <BASTBuilder />
    </Suspense>
  );
}

function BASTBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: '001/BAST/LOG/I/2026',
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta',
    
    // PIHAK 1 (YANG MENYERAHKAN)
    p1Name: 'BUDI SANTOSO', p1Title: 'Staff Gudang', p1Dept: 'Divisi Logistik',
    
    // PIHAK 2 (YANG MENERIMA)
    p2Name: 'SISKA AMELIA', p2Title: 'Staff IT', p2Dept: 'IT Support',
    
    // CONTENT
    type: 'Barang', 
    items: [
      { id: 1, name: 'Laptop Dell Latitude 7420 (SN: 88291)', qty: '1 Unit', condition: 'Baru' },
      { id: 2, name: 'Mouse Wireless Logitech', qty: '1 Pcs', condition: 'Baru' },
      { id: 3, name: 'Tas Laptop Original Dell', qty: '1 Pcs', condition: 'Baru' },
      { id: 4, name: 'Charger Original 65W', qty: '1 Pcs', condition: 'Baru' },
    ],
    desc: 'Telah diserahterimakan kunci ruang server dan akses card level 3 sehubungan dengan libur panjang lebaran. Kondisi ruangan terkunci rapat dan aman.',
    
    // FOOTER
    witness: 'Pak Rahmat (Kepala GA)',
    additionalNote: 'Barang telah diperiksa fungsinya.' 
  });

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const addItem = () => {
    setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: '', condition: '' }] });
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };
  
  const updateItem = (idx: number, field: string, val: string) => {
    const newItems:any = [...data.items];
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  // PRESETS
  const applyPreset = (type: 'goods' | 'job' | 'key') => {
    if (type === 'goods') {
      setTemplateId(1);
      setData(prev => ({ ...prev, type: 'Barang', items: [{ id: Date.now(), name: 'Laptop Kantor', qty: '1 Unit', condition: 'Baik' }] }));
    } else if (type === 'job') {
      setTemplateId(1);
      setData(prev => ({ ...prev, type: 'Pekerjaan', items: [{ id: Date.now(), name: 'Source Code Aplikasi v1.0', qty: '1 Flashdisk', condition: 'Final' }] }));
    } else if (type === 'key') {
      setTemplateId(2);
      setData(prev => ({ ...prev, type: 'Kunci / Aset', desc: 'Serah terima kunci kendaraan operasional Toyota Avanza B 1234 CD beserta STNK asli.' }));
    }
  };

  // DATE FORMATTER
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      dayName: date.toLocaleDateString('id-ID', { weekday: 'long' }),
      fullDate: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    const { dayName, fullDate } = getFormattedDate(data.date);

    // TEMPLATE 1: TABEL (Formal & Compact)
    if (templateId === 1) {
      return (
        <div className="font-serif text-[10pt] text-slate-900 leading-snug">
           {/* JUDUL */}
           <div className="text-center mb-6 pb-2 border-b-2 border-slate-900">
              <h1 className="text-lg font-black uppercase tracking-wide">BERITA ACARA SERAH TERIMA {data.type.toUpperCase()}</h1>
              <div className="text-xs font-bold text-slate-600">Nomor: {data.no}</div>
           </div>

           <p className="mb-3 text-justify">
              Pada hari ini <strong>{dayName}</strong>, tanggal <strong>{fullDate}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
           </p>

           {/* PIHAK 1 & 2 (GRID COMPACT) */}
           <div className="mb-4 border border-slate-300 grid grid-cols-2">
              {/* KIRI: PIHAK 1 */}
              <div className="p-3 border-r border-slate-300">
                 <div className="font-bold text-[9pt] uppercase text-slate-500 mb-2">PIHAK PERTAMA (Yang Menyerahkan)</div>
                 <table className="w-full text-[10pt]">
                    <tbody>
                       <tr><td className="w-16 font-bold">Nama</td><td className="w-2">:</td><td>{data.p1Name}</td></tr>
                       <tr><td className="font-bold">Jabatan</td><td>:</td><td>{data.p1Title}</td></tr>
                       <tr><td className="font-bold">Divisi</td><td>:</td><td>{data.p1Dept}</td></tr>
                    </tbody>
                 </table>
              </div>

              {/* KANAN: PIHAK 2 */}
              <div className="p-3">
                 <div className="font-bold text-[9pt] uppercase text-slate-500 mb-2">PIHAK KEDUA (Yang Menerima)</div>
                 <table className="w-full text-[10pt]">
                    <tbody>
                       <tr><td className="w-16 font-bold">Nama</td><td className="w-2">:</td><td>{data.p2Name}</td></tr>
                       <tr><td className="font-bold">Jabatan</td><td>:</td><td>{data.p2Title}</td></tr>
                       <tr><td className="font-bold">Divisi</td><td>:</td><td>{data.p2Dept}</td></tr>
                    </tbody>
                 </table>
              </div>
           </div>

           <p className="mb-3 text-justify">
              PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menyatakan telah menerima dari PIHAK PERTAMA, {data.type.toLowerCase()} dengan rincian sebagai berikut:
           </p>

           {/* TABEL BARANG */}
           <div className="mb-4">
              <table className="w-full text-[10pt] border-collapse border border-slate-900">
                 <thead className="bg-slate-100 uppercase font-bold text-center">
                    <tr>
                       <th className="p-1.5 border border-slate-900 w-8">No</th>
                       <th className="p-1.5 border border-slate-900 text-left">Nama Barang / Deskripsi</th>
                       <th className="p-1.5 border border-slate-900 w-20">Qty</th>
                       <th className="p-1.5 border border-slate-900 w-24">Kondisi</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.items.map((item, idx) => (
                       <tr key={item.id} style={{ pageBreakInside: 'avoid' }}>
                          <td className="p-1.5 border border-slate-900 text-center">{idx + 1}</td>
                          <td className="p-1.5 border border-slate-900 font-bold">{item.name}</td>
                          <td className="p-1.5 border border-slate-900 text-center">{item.qty}</td>
                          <td className="p-1.5 border border-slate-900 text-center">{item.condition}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {data.additionalNote && (
              <div className="mb-4 text-[9pt] italic bg-slate-50 p-2 border border-slate-200 rounded">
                 <strong>Catatan:</strong> {data.additionalNote}
              </div>
           )}

           <p className="mb-6 text-justify">
              Sejak ditandatanganinya Berita Acara ini, maka tanggung jawab atas {data.type.toLowerCase()} tersebut beralih sepenuhnya dari PIHAK PERTAMA kepada PIHAK KEDUA.
           </p>

           {/* TANDA TANGAN (GROUPED: ANTI POTONG) */}
           <div className="mt-auto pt-4" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between text-center mb-10">
                 <div className="w-40 flex flex-col items-center">
                    <p className="mb-1 text-[9pt] font-bold text-slate-500">YANG MENERIMA</p>
                    <p className="mb-16 font-bold">PIHAK KEDUA</p>
                    <p className="font-bold border-b border-slate-900 w-full uppercase">{data.p2Name}</p>
                 </div>
                 <div className="w-40 flex flex-col items-center">
                    <p className="mb-1 text-[9pt] font-bold text-slate-500">YANG MENYERAHKAN</p>
                    <p className="mb-16 font-bold">PIHAK PERTAMA</p>
                    <p className="font-bold border-b border-slate-900 w-full uppercase">{data.p1Name}</p>
                 </div>
              </div>

              {data.witness && (
                 <div className="text-center">
                    <p className="mb-16 text-[10pt] font-bold">MENGETAHUI (SAKSI)</p>
                    <p className="font-bold underline uppercase">{data.witness}</p>
                 </div>
              )}
           </div>
        </div>
      );
    } 
    // TEMPLATE 2: NARASI
    else {
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-normal">
           <div className="text-center mb-8">
              <h1 className="font-bold text-xl uppercase underline decoration-double decoration-2 underline-offset-4">BERITA ACARA SERAH TERIMA</h1>
              <div className="text-sm font-bold mt-1">No: {data.no}</div>
           </div>

           <p className="mb-4 text-justify">
              Pada hari ini <strong>{dayName}</strong>, tanggal <strong>{fullDate}</strong>, kami yang bertanda tangan di bawah ini:
           </p>

           <div className="ml-4 mb-4">
              <table className="w-full leading-snug">
                 <tbody>
                    <tr><td className="w-24 font-bold">1. Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                    <tr><td>Jabatan</td><td>:</td><td>{data.p1Title} ({data.p1Dept})</td></tr>
                 </tbody>
              </table>
              <div className="mt-1 pl-28 italic">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</div>
           </div>

           <div className="ml-4 mb-6">
              <table className="w-full leading-snug">
                 <tbody>
                    <tr><td className="w-24 font-bold">2. Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                    <tr><td>Jabatan</td><td>:</td><td>{data.p2Title} ({data.p2Dept})</td></tr>
                 </tbody>
              </table>
              <div className="mt-1 pl-28 italic">Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</div>
           </div>

           <p className="mb-4 text-justify">
              PIHAK PERTAMA dengan ini menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menerima dari PIHAK PERTAMA hal sebagai berikut:
           </p>

           <div className="bg-slate-50 p-4 border-l-4 border-slate-800 mb-6 italic text-justify leading-relaxed">
              "{data.desc}"
           </div>

           {data.additionalNote && (
              <p className="mb-6 text-[10pt] italic bg-slate-50 p-2 border border-dashed border-slate-300 rounded">
                 <strong>Catatan:</strong> {data.additionalNote}
              </p>
           )}

           <p className="mb-8 text-justify">
              Demikian Berita Acara Serah Terima ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           {/* TTD GROUPED */}
           <div className="mt-auto pt-4" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between text-center mb-8">
                 <div className="w-48">
                    <p className="mb-20 font-bold">PIHAK KEDUA</p>
                    <p className="font-bold border-b border-slate-900 uppercase">{data.p2Name}</p>
                 </div>
                 <div className="w-48">
                    <p className="mb-20 font-bold">PIHAK PERTAMA</p>
                    <p className="font-bold border-b border-slate-900 uppercase">{data.p1Name}</p>
                 </div>
              </div>
              {data.witness && (
                 <div className="text-center">
                    <p className="mb-20 font-bold">SAKSI</p>
                    <p className="font-bold underline uppercase">{data.witness}</p>
                 </div>
              )}
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          /* Table Wrapper Logic */
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } /* Margin Atas */
          .print-table tfoot { height: 20mm; } /* Margin Bawah */
          .print-content-wrapper { padding: 0 20mm; } /* Margin Kiri Kanan */
          
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">BAST <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Tabel' : 'Format Narasi'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Tabel</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Narasi</button>
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

               {/* PRESET */}
               <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-2 overflow-x-auto no-scrollbar">
                  <button onClick={() => applyPreset('goods')} className="flex-1 bg-white border border-emerald-200 text-emerald-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors whitespace-nowrap"><Box size={14}/> Barang</button>
                  <button onClick={() => applyPreset('job')} className="flex-1 bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-blue-50 transition-colors whitespace-nowrap"><Briefcase size={14}/> Pekerjaan</button>
                  <button onClick={() => applyPreset('key')} className="flex-1 bg-white border border-amber-200 text-amber-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-amber-50 transition-colors whitespace-nowrap"><Key size={14}/> Kunci/Aset</button>
               </div>

               {/* META */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><CalendarDays size={12}/> Waktu & Tempat</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* PARA PIHAK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Para Pihak</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                     <div className="border-l-2 border-red-400 pl-3 space-y-2">
                        <h4 className="text-[10px] font-bold text-red-500 uppercase">Pihak 1 (Menyerahkan)</h4>
                        <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2">
                           <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Jabatan" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} />
                           <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Divisi" value={data.p1Dept} onChange={e => handleDataChange('p1Dept', e.target.value)} />
                        </div>
                     </div>
                     <div className="border-l-2 border-emerald-400 pl-3 space-y-2">
                        <h4 className="text-[10px] font-bold text-emerald-500 uppercase">Pihak 2 (Menerima)</h4>
                        <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2">
                           <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Jabatan" value={data.p2Title} onChange={e => handleDataChange('p2Title', e.target.value)} />
                           <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Divisi" value={data.p2Dept} onChange={e => handleDataChange('p2Dept', e.target.value)} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* OBJEK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><PackageCheck size={12}/> Objek Serah Terima</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                     {templateId === 1 ? (
                        <div className="space-y-3">
                           {data.items.map((item, idx) => (
                              <div key={item.id} className="flex gap-2 items-start border-b border-slate-100 pb-2">
                                 <div className="w-5 pt-2 text-[10px] text-center font-bold text-slate-400">{idx+1}.</div>
                                 <div className="flex-1 space-y-1">
                                    <input className="w-full p-1.5 border border-slate-200 rounded text-xs font-bold" placeholder="Nama Barang" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2">
                                       <input className="w-full p-1.5 border border-slate-200 rounded text-xs" placeholder="Jumlah" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} />
                                       <input className="w-full p-1.5 border border-slate-200 rounded text-xs" placeholder="Kondisi" value={item.condition} onChange={e => updateItem(idx, 'condition', e.target.value)} />
                                    </div>
                                 </div>
                                 <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-red-500 mt-2"><Trash2 size={14}/></button>
                              </div>
                           ))}
                           <button onClick={addItem} className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-xs text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"><Plus size={12}/> Tambah Barang</button>
                        </div>
                     ) : (
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-slate-500">Deskripsi</label>
                           <textarea className="w-full p-2 border border-slate-200 rounded text-sm h-32 resize-none leading-relaxed" value={data.desc} onChange={e => handleDataChange('desc', e.target.value)} />
                        </div>
                     )}
                  </div>
               </div>

               {/* PENUTUP */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Penutup</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Catatan Tambahan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.additionalNote} onChange={e => handleDataChange('additionalNote', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi (Opsional)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.witness} onChange={e => handleDataChange('witness', e.target.value)} /></div>
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
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}