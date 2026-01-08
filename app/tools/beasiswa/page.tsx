'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Box, Briefcase, Key, Plus, Trash2, CalendarDays, FileText, User
} from 'lucide-react';
import Link from 'next/link';

export default function BASTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Logistik...</div>}>
      <BASTBuilder />
    </Suspense>
  );
}

function BASTBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // META
    no: '001/BAST/LOG/I/2026',
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta',
    
    // PIHAK 1 (YANG MENYERAHKAN)
    p1Name: 'BUDI SANTOSO', p1Title: 'Staff Gudang', p1Dept: 'Logistik',
    
    // PIHAK 2 (YANG MENERIMA)
    p2Name: 'SISKA AMELIA', p2Title: 'Staff IT', p2Dept: 'Information Technology',
    
    // JENIS & ISI
    type: 'Barang', // Barang / Pekerjaan
    items: [
      { id: 1, name: 'Laptop Dell Latitude 7420', qty: '1 Unit', condition: 'Baik / Baru' },
      { id: 2, name: 'Mouse Wireless Logitech', qty: '1 Pcs', condition: 'Baik' },
      { id: 3, name: 'Tas Laptop Original', qty: '1 Pcs', condition: 'Baik' },
    ],
    desc: 'Telah diserahterimakan kunci ruang server dan akses card level 3 sehubungan dengan libur panjang lebaran.',
    
    // TAMBAHAN
    witness: 'Pak Rahmat (Kepala GA)',
    additionalNote: '' // Catatan tambahan opsional
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

  // PRESETS (TOMBOL CEPAT)
  const applyPreset = (type: 'goods' | 'job' | 'key') => {
    if (type === 'goods') {
      setTemplateId(1);
      setData(prev => ({
        ...prev, type: 'Barang',
        items: [{ id: Date.now(), name: 'Laptop Kantor', qty: '1 Unit', condition: 'Baik' }]
      }));
    } else if (type === 'job') {
      setTemplateId(1);
      setData(prev => ({
        ...prev, type: 'Pekerjaan',
        items: [{ id: Date.now(), name: 'Source Code Aplikasi POS', qty: '1 Flashdisk', condition: 'Final v1.0' }]
      }));
    } else if (type === 'key') {
      setTemplateId(2);
      setData(prev => ({
        ...prev, type: 'Aset/Kunci',
        desc: 'Serah terima kunci kendaraan operasional Toyota Avanza B 1234 CD beserta STNK asli.'
      }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Tabel (Barang/Jasa)", desc: "Cocok untuk list inventory banyak" },
    { id: 2, name: "Format Narasi (Simple)", desc: "Cocok untuk serah terima kunci/dokumen tunggal" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ALL-IN-ONE) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] h-[296mm] 
      bg-white shadow-2xl print:shadow-none 
      p-[20mm] mx-auto 
      text-slate-900 font-sans leading-relaxed text-[10pt]
      overflow-hidden relative
      mb-8 print:mb-0 print:mt-0 
      ${className}
    `}>
      {children}
    </div>
  );

  // --- ISI DOKUMEN (PREVIEW & PRINT SAMA) ---
  const DocumentContent = (
    <Kertas>
        {/* TEMPLATE 1: TABEL FORMAL */}
        {templateId === 1 && (
          <div className="h-full flex flex-col">
             <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="text-xl font-black uppercase tracking-tight">BERITA ACARA SERAH TERIMA {data.type.toUpperCase()}</h1>
                <div className="text-sm font-bold text-slate-500">No: {data.no}</div>
             </div>

             <p className="mb-4 text-justify">
                Pada hari ini <strong>{data.day}</strong>, tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
             </p>

             <div className="mb-6 grid gap-4">
                <div className="bg-slate-50 print:bg-transparent p-3 border border-slate-200 print:border-slate-300">
                   <div className="font-bold text-xs uppercase text-slate-500 mb-1">PIHAK PERTAMA (Yang Menyerahkan)</div>
                   <table className="w-full text-sm">
                      <tbody>
                         <tr><td className="w-20 font-bold">Nama</td><td className="w-3">:</td><td>{data.p1Name}</td></tr>
                         <tr><td className="font-bold">Jabatan</td><td>:</td><td>{data.p1Title}</td></tr>
                         <tr><td className="font-bold">Divisi</td><td>:</td><td>{data.p1Dept}</td></tr>
                      </tbody>
                   </table>
                </div>

                <div className="bg-slate-50 print:bg-transparent p-3 border border-slate-200 print:border-slate-300">
                   <div className="font-bold text-xs uppercase text-slate-500 mb-1">PIHAK KEDUA (Yang Menerima)</div>
                   <table className="w-full text-sm">
                      <tbody>
                         <tr><td className="w-20 font-bold">Nama</td><td className="w-3">:</td><td>{data.p2Name}</td></tr>
                         <tr><td className="font-bold">Jabatan</td><td>:</td><td>{data.p2Title}</td></tr>
                         <tr><td className="font-bold">Divisi</td><td>:</td><td>{data.p2Dept}</td></tr>
                      </tbody>
                   </table>
                </div>
             </div>

             <p className="mb-4 text-justify">
                PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menyatakan telah menerima dari PIHAK PERTAMA, barang/pekerjaan dengan rincian sebagai berikut:
             </p>

             <div className="mb-4 border border-black">
                <table className="w-full text-sm">
                   <thead className="bg-slate-100 print:bg-slate-200 text-xs font-bold uppercase">
                      <tr>
                         <th className="py-2 px-3 border-b border-r border-black text-center w-10">No</th>
                         <th className="py-2 px-3 border-b border-r border-black text-left">Nama Barang / Deskripsi</th>
                         <th className="py-2 px-3 border-b border-r border-black text-center w-24">Jumlah</th>
                         <th className="py-2 px-3 border-b border-black text-center w-32">Kondisi</th>
                      </tr>
                   </thead>
                   <tbody>
                      {data.items.map((item, idx) => (
                         <tr key={item.id}>
                            <td className="py-2 px-3 border-r border-black text-center border-b last:border-b-0">{idx + 1}</td>
                            <td className="py-2 px-3 border-r border-black font-bold border-b last:border-b-0">{item.name}</td>
                            <td className="py-2 px-3 border-r border-black text-center border-b last:border-b-0">{item.qty}</td>
                            <td className="py-2 px-3 border-black text-center border-b last:border-b-0">{item.condition}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {data.additionalNote && (
                <div className="mb-4 text-sm italic">
                   <strong>Catatan:</strong> {data.additionalNote}
                </div>
             )}

             <p className="mb-8 text-justify text-sm">
                Sejak ditandatanganinya Berita Acara ini, maka tanggung jawab atas barang/pekerjaan tersebut beralih dari PIHAK PERTAMA kepada PIHAK KEDUA.
             </p>

             <div className="flex justify-between text-center mt-auto mb-8">
                <div className="w-48">
                   <p className="mb-1 text-xs font-bold text-slate-500">YANG MENERIMA</p>
                   <p className="mb-20 font-bold">PIHAK KEDUA</p>
                   <p className="font-bold border-b border-black inline-block px-4">{data.p2Name}</p>
                </div>
                <div className="w-48">
                   <p className="mb-1 text-xs font-bold text-slate-500">YANG MENYERAHKAN</p>
                   <p className="mb-20 font-bold">PIHAK PERTAMA</p>
                   <p className="font-bold border-b border-black inline-block px-4">{data.p1Name}</p>
                </div>
             </div>

             {data.witness && (
                <div className="text-center">
                   <p className="mb-16 text-xs font-bold">MENGETAHUI (SAKSI)</p>
                   <p className="border-b border-black inline-block px-4">{data.witness}</p>
                </div>
             )}
          </div>
        )}

        {/* TEMPLATE 2: NARASI SIMPLE */}
        {templateId === 2 && (
          <div className="font-serif text-[11pt] leading-loose">
             <div className="text-center mb-8">
                <h1 className="font-bold text-xl uppercase underline">BERITA ACARA SERAH TERIMA</h1>
                <div className="text-sm font-bold mt-1">No: {data.no}</div>
             </div>

             <p className="mb-4 text-justify">
                Pada hari ini <strong>{data.day}</strong>, tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, kami yang bertanda tangan di bawah ini:
             </p>

             <div className="ml-4 mb-4">
                <table className="w-full leading-snug">
                   <tbody>
                      <tr><td className="w-24 font-bold">1. Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>Jabatan</td><td>:</td><td>{data.p1Title} ({data.p1Dept})</td></tr>
                   </tbody>
                </table>
                <div className="mt-1">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</div>
             </div>

             <div className="ml-4 mb-6">
                <table className="w-full leading-snug">
                   <tbody>
                      <tr><td className="w-24 font-bold">2. Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>Jabatan</td><td>:</td><td>{data.p2Title} ({data.p2Dept})</td></tr>
                   </tbody>
                </table>
                <div className="mt-1">Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</div>
             </div>

             <p className="mb-4 text-justify">
                PIHAK PERTAMA dengan ini menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menerima dari PIHAK PERTAMA hal sebagai berikut:
             </p>

             <div className="bg-slate-50 print:bg-transparent p-6 border-l-4 border-black mb-8 italic text-justify leading-relaxed">
                "{data.desc}"
             </div>

             {data.additionalNote && (
                <p className="mb-4 text-sm italic">
                   Catatan Tambahan: {data.additionalNote}
                </p>
             )}

             <p className="mb-8 text-justify">
                Demikian Berita Acara Serah Terima ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
             </p>

             <div className="flex justify-between text-center mt-12">
                <div className="w-48">
                   <p className="mb-24 font-bold">PIHAK KEDUA</p>
                   <p className="font-bold border-b border-black">{data.p2Name}</p>
                </div>
                <div className="w-48">
                   <p className="mb-24 font-bold">PIHAK PERTAMA</p>
                   <p className="font-bold border-b border-black">{data.p1Name}</p>
                </div>
             </div>
          </div>
        )}
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg print:hidden sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Berita Acara Serah Terima</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">Pilih Gaya Dokumen</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
          
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Box size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('goods')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Box size={14}/> Barang
                </button>
                <button onClick={() => applyPreset('job')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Briefcase size={14}/> Pekerjaan
                </button>
                <button onClick={() => applyPreset('key')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Key size={14}/> Kunci/Aset
                </button>
             </div>
          </div>

          {/* 1. WAKTU & NOMOR SURAT */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2">
               <CalendarDays size={14} className="text-slate-600"/>
               <h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3>
             </div>
             <div className="space-y-3">
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Nomor Surat</label>
                    <input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Hari</label>
                        <input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal</label>
                        <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Kota</label>
                    <input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 </div>
             </div>
          </div>

          {/* 2. PARA PIHAK */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Briefcase size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Pihak 1 & Pihak 2</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="border-l-2 border-red-500 pl-3">
                   <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Yang Menyerahkan (Pihak 1)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Jabatan" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} />
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Divisi/Dept" value={data.p1Dept} onChange={e => handleDataChange('p1Dept', e.target.value)} />
                      </div>
                   </div>
                </div>

                <div className="border-l-2 border-emerald-500 pl-3">
                   <h4 className="text-xs font-bold text-emerald-600 mb-2 uppercase">Yang Menerima (Pihak 2)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Jabatan" value={data.p2Title} onChange={e => handleDataChange('p2Title', e.target.value)} />
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Divisi/Dept" value={data.p2Dept} onChange={e => handleDataChange('p2Dept', e.target.value)} />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* 3. ISI (BARANG / DESKRIPSI) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Box size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Objek Serah Terima</h3>
             </div>
             
             {templateId === 1 ? (
                <div className="p-4 space-y-2">
                   {data.items.map((item, idx) => (
                      <div key={item.id} className="flex gap-2 items-start group">
                         <div className="w-6 text-center pt-2 text-xs text-slate-400 font-bold">{idx + 1}.</div>
                         <div className="flex-1 space-y-1">
                            <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Barang" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                            <div className="grid grid-cols-2 gap-1">
                               <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Jumlah (Qty)" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} />
                               <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Kondisi" value={item.condition} onChange={e => updateItem(idx, 'condition', e.target.value)} />
                            </div>
                         </div>
                         <button onClick={() => removeItem(idx)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors mt-1"><Trash2 size={12} /></button>
                      </div>
                   ))}
                   <button onClick={addItem} className="w-full py-2 border border-dashed border-slate-300 rounded text-xs text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 mt-2">
                      <Plus size={12}/> Tambah Barang
                   </button>
                </div>
             ) : (
                <div className="p-4">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi Serah Terima</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-sm h-32 resize-none leading-relaxed" value={data.desc} onChange={e => handleDataChange('desc', e.target.value)} />
                </div>
             )}
          </div>

          {/* 4. PENUTUP & SAKSI */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2">
               <User size={14} className="text-slate-600"/>
               <h3 className="text-xs font-bold uppercase">Penutup & Saksi</h3>
             </div>
             <div className="space-y-3">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Saksi (Opsional)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.witness} onChange={e => handleDataChange('witness', e.target.value)} placeholder="Nama Saksi" />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Catatan Tambahan</label>
                   <div className="flex items-center gap-2">
                        <FileText size={14} className="text-slate-400"/>
                        <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.additionalNote} onChange={e => handleDataChange('additionalNote', e.target.value)} placeholder="Contoh: Barang diterima dalam keadaan baik" />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW (ALL-IN-ONE) --- */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20">
             <div className="w-[210mm] origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform">
                {DocumentContent}
             </div>
        </div>

      </div>

      {/* PRINT AREA (Hidden in view, visible in print) */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
          {DocumentContent}
      </div>

    </div>
  );
}