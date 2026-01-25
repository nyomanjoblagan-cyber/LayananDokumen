'use client';

/**
 * FILE: BASTPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Berita Acara Serah Terima (BAST)
 * FEATURES:
 * - Dual Template (Tabel & Narasi)
 * - Smart Presets (Barang, Pekerjaan, Aset)
 * - Strict A4 Print Layout
 * - Mobile Menu Fixed
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ChevronDown, LayoutTemplate, 
  Box, Briefcase, Key, Plus, Trash2, CalendarDays, 
  FileText, User, ArrowLeftCircle, Edit3, Eye, PackageCheck, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface BastItem {
  id: number;
  name: string;
  qty: string;
  condition: string;
}

interface BastData {
  no: string;
  date: string;
  city: string;
  
  // Pihak 1 (Yang Menyerahkan)
  p1Name: string;
  p1Title: string;
  p1Dept: string;
  
  // Pihak 2 (Yang Menerima)
  p2Name: string;
  p2Title: string;
  p2Dept: string;
  
  // Konten
  type: string; // 'Barang', 'Pekerjaan', 'Aset'
  items: BastItem[]; // Untuk Template Tabel
  desc: string;      // Untuk Template Narasi
  
  // Footer
  witness: string;
  additionalNote: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BastData = {
  no: '001/BAST/LOG/I/2026',
  date: '', // Diisi useEffect
  city: 'JAKARTA',
  
  p1Name: 'BUDI SANTOSO', 
  p1Title: 'Staff Gudang', 
  p1Dept: 'Divisi Logistik',
  
  p2Name: 'SISKA AMELIA', 
  p2Title: 'Staff IT', 
  p2Dept: 'IT Support',
  
  type: 'Barang',
  items: [
    { id: 1, name: 'Laptop Dell Latitude 7420 (SN: 88291)', qty: '1 Unit', condition: 'Baru' },
    { id: 2, name: 'Mouse Wireless Logitech', qty: '1 Pcs', condition: 'Baru' },
    { id: 3, name: 'Charger Original 65W', qty: '1 Pcs', condition: 'Baru' },
  ],
  desc: 'Telah diserahterimakan kunci ruang server dan akses card level 3 sehubungan dengan libur panjang lebaran. Kondisi ruangan terkunci rapat dan aman.',
  
  witness: 'PAK RAHMAT (Kepala GA)',
  additionalNote: 'Barang telah diperiksa fungsinya dan diterima dalam kondisi baik.' 
};

// --- 3. KOMPONEN UTAMA ---
export default function BASTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Logistik...</div>}>
      <BASTBuilder />
    </Suspense>
  );
}

function BASTBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1); // 1: Tabel, 2: Narasi
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<BastData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
      ...prev, 
      date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof BastData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', qty: '', condition: '' }]
    }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const updateItem = (idx: number, field: keyof BastItem, val: string) => {
    const newItems = [...data.items];
    newItems[idx] = { ...newItems[idx], [field]: val };
    setData(prev => ({ ...prev, items: newItems }));
  };

  // SMART PRESETS
  const applyPreset = (type: 'goods' | 'job' | 'key') => {
    if (confirm('Ganti preset akan mereset isi data. Lanjutkan?')) {
        if (type === 'goods') {
          setTemplateId(1);
          setData(prev => ({ 
              ...prev, 
              type: 'Barang', 
              additionalNote: 'Barang telah diperiksa dan berfungsi baik.',
              items: [{ id: Date.now(), name: 'Laptop Kantor', qty: '1 Unit', condition: 'Baik' }] 
          }));
        } else if (type === 'job') {
          setTemplateId(2); // Narasi lebih cocok untuk pekerjaan
          setData(prev => ({ 
              ...prev, 
              type: 'Pekerjaan', 
              desc: 'Telah diselesaikan pekerjaan pembuatan Website Company Profile v1.0 sesuai dengan SPK No. 123/SPK/IT/2026. Source code telah diupload ke repository git.',
              additionalNote: 'Masa garansi bug fixing berlaku 3 bulan.'
          }));
        } else if (type === 'key') {
          setTemplateId(2); // Narasi lebih cocok untuk kunci
          setData(prev => ({ 
              ...prev, 
              type: 'Kunci / Aset', 
              desc: 'Menyerahkan Kunci Kendaraan Operasional Toyota Avanza B 1234 CD beserta STNK Asli dan Kartu Tol (Saldo Rp 50.000). Kondisi mobil bersih dan bensin full.',
              additionalNote: 'Dikembalikan paling lambat hari Senin.'
          }));
        }
    }
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT (FIX MOBILE) ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Tabel (Aset/Barang)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Narasi (Jasa/Kunci)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    // Date Formatter
    const getFormattedDate = (dateString: string) => {
        if(!dateString) return { dayName: '...', fullDate: '...' };
        const date = new Date(dateString);
        return {
          dayName: date.toLocaleDateString('id-ID', { weekday: 'long' }),
          fullDate: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        };
    };
    const { dayName, fullDate } = getFormattedDate(data.date);

    // Common Footer (Signature)
    const SignatureSection = () => (
        <div className="mt-8 pt-4" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-between text-center mb-10">
                <div className="w-48 flex flex-col items-center">
                    <p className="mb-1 text-[9pt] font-bold text-slate-500 uppercase">Pihak Kedua (Menerima)</p>
                    <p className="mb-16 font-bold uppercase text-[10pt]">{data.p2Dept}</p>
                    <p className="font-bold border-b border-black w-full uppercase text-[10pt]">{data.p2Name}</p>
                    <p className="text-[9pt]">{data.p2Title}</p>
                </div>
                <div className="w-48 flex flex-col items-center">
                    <p className="mb-1 text-[9pt] font-bold text-slate-500 uppercase">Pihak Pertama (Menyerahkan)</p>
                    <p className="mb-16 font-bold uppercase text-[10pt]">{data.p1Dept}</p>
                    <p className="font-bold border-b border-black w-full uppercase text-[10pt]">{data.p1Name}</p>
                    <p className="text-[9pt]">{data.p1Title}</p>
                </div>
            </div>

            {data.witness && (
                <div className="text-center flex flex-col items-center">
                    <p className="mb-16 text-[10pt] font-bold uppercase">Mengetahui (Saksi)</p>
                    <p className="font-bold underline uppercase text-[10pt]">{data.witness}</p>
                </div>
            )}
        </div>
    );

    // TEMPLATE 1: TABEL (Formal & Compact)
    if (templateId === 1) {
      return (
        <div className="font-serif text-[11pt] text-black leading-snug">
           {/* JUDUL */}
           <div className="text-center mb-8 pb-2 border-b-2 border-black">
              <h1 className="text-lg font-black uppercase tracking-wide">BERITA ACARA SERAH TERIMA {data.type.toUpperCase()}</h1>
              <div className="text-sm font-bold mt-1">Nomor: {data.no}</div>
           </div>

           <p className="mb-4 text-justify">
              Pada hari ini <strong>{dayName}</strong>, tanggal <strong>{fullDate}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
           </p>

           {/* PIHAK 1 & 2 (GRID) */}
           <div className="mb-6 border border-black grid grid-cols-2">
              {/* KIRI: PIHAK 1 */}
              <div className="p-4 border-r border-black">
                 <div className="font-bold text-[9pt] uppercase text-slate-500 mb-2 border-b border-slate-300 pb-1">PIHAK PERTAMA (Menyerahkan)</div>
                 <table className="w-full text-[10pt]">
                    <tbody>
                       <tr><td className="w-16 font-bold py-0.5">Nama</td><td className="w-2">:</td><td className="uppercase">{data.p1Name}</td></tr>
                       <tr><td className="font-bold py-0.5">Jabatan</td><td>:</td><td>{data.p1Title}</td></tr>
                       <tr><td className="font-bold py-0.5">Divisi</td><td>:</td><td>{data.p1Dept}</td></tr>
                    </tbody>
                 </table>
              </div>

              {/* KANAN: PIHAK 2 */}
              <div className="p-4">
                 <div className="font-bold text-[9pt] uppercase text-slate-500 mb-2 border-b border-slate-300 pb-1">PIHAK KEDUA (Menerima)</div>
                 <table className="w-full text-[10pt]">
                    <tbody>
                       <tr><td className="w-16 font-bold py-0.5">Nama</td><td className="w-2">:</td><td className="uppercase">{data.p2Name}</td></tr>
                       <tr><td className="font-bold py-0.5">Jabatan</td><td>:</td><td>{data.p2Title}</td></tr>
                       <tr><td className="font-bold py-0.5">Divisi</td><td>:</td><td>{data.p2Dept}</td></tr>
                    </tbody>
                 </table>
              </div>
           </div>

           <p className="mb-4 text-justify">
              PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menyatakan telah menerima dari PIHAK PERTAMA, {data.type.toLowerCase()} dengan rincian sebagai berikut:
           </p>

           {/* TABEL BARANG */}
           <div className="mb-4">
              <table className="w-full text-[10pt] border-collapse border border-black">
                 <thead className="bg-slate-100 uppercase font-bold text-center">
                    <tr>
                       <th className="p-2 border border-black w-10">No</th>
                       <th className="p-2 border border-black text-left">Nama Barang / Deskripsi</th>
                       <th className="p-2 border border-black w-24">Jumlah</th>
                       <th className="p-2 border border-black w-32">Kondisi</th>
                    </tr>
                 </thead>
                 <tbody>
                    {(data.items || []).map((item, idx) => (
                       <tr key={item.id} style={{ pageBreakInside: 'avoid' }}>
                          <td className="p-2 border border-black text-center">{idx + 1}</td>
                          <td className="p-2 border border-black font-bold">{item.name}</td>
                          <td className="p-2 border border-black text-center">{item.qty}</td>
                          <td className="p-2 border border-black text-center">{item.condition}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {data.additionalNote && (
              <div className="mb-6 text-[10pt] italic bg-slate-50 p-3 border border-slate-300 rounded text-justify">
                 <strong>Catatan:</strong> {data.additionalNote}
              </div>
           )}

           <p className="mb-6 text-justify">
              Sejak ditandatanganinya Berita Acara ini, maka tanggung jawab atas {data.type.toLowerCase()} tersebut beralih sepenuhnya dari PIHAK PERTAMA kepada PIHAK KEDUA.
           </p>

           <SignatureSection />
        </div>
      );
    } 
    // TEMPLATE 2: NARASI (Untuk Pekerjaan/Jasa)
    else {
      return (
        <div className="font-serif text-[11pt] text-black leading-normal">
           <div className="text-center mb-10">
              <h1 className="font-bold text-xl uppercase underline decoration-double decoration-2 underline-offset-4">BERITA ACARA SERAH TERIMA</h1>
              <div className="text-sm font-bold mt-1">No: {data.no}</div>
           </div>

           <p className="mb-6 text-justify indent-12">
              Pada hari ini <strong>{dayName}</strong>, tanggal <strong>{fullDate}</strong>, kami yang bertanda tangan di bawah ini:
           </p>

           {/* PIHAK LIST */}
           <div className="ml-4 mb-6">
              <table className="w-full leading-snug mb-2">
                 <tbody>
                    <tr><td className="w-6 font-bold align-top">1.</td><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p1Name}</td></tr>
                    <tr><td></td><td className="align-top">Jabatan</td><td className="align-top">:</td><td>{data.p1Title} - {data.p1Dept}</td></tr>
                 </tbody>
              </table>
              <div className="pl-[140px] italic mb-4">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</div>

              <table className="w-full leading-snug mb-2">
                 <tbody>
                    <tr><td className="w-6 font-bold align-top">2.</td><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p2Name}</td></tr>
                    <tr><td></td><td className="align-top">Jabatan</td><td className="align-top">:</td><td>{data.p2Title} - {data.p2Dept}</td></tr>
                 </tbody>
              </table>
              <div className="pl-[140px] italic">Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</div>
           </div>

           <p className="mb-4 text-justify indent-12">
              PIHAK PERTAMA dengan ini menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA menerima dari PIHAK PERTAMA hasil {data.type.toLowerCase()} dengan rincian sebagai berikut:
           </p>

           <div className="bg-slate-50 p-6 border-l-4 border-black mb-6 italic text-justify leading-relaxed">
              "{data.desc}"
           </div>

           {data.additionalNote && (
              <p className="mb-6 text-[10pt] italic bg-slate-50 p-3 border border-dashed border-slate-300 rounded">
                 <strong>Catatan:</strong> {data.additionalNote}
              </p>
           )}

           <p className="mb-10 text-justify indent-12">
              Demikian Berita Acara Serah Terima ini dibuat dengan sebenar-benarnya dalam rangkap 2 (dua) untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           <SignatureSection />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- CSS PRINT FIXED --- */}
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
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Tabel (Aset)' : 'Format Narasi (Jasa)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER (FIXED) */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Data BAST</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* PRESET BUTTONS */}
               <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-2 overflow-x-auto no-scrollbar">
                  <button onClick={() => applyPreset('goods')} className="flex-1 bg-white border border-emerald-200 text-emerald-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors whitespace-nowrap"><Box size={14}/> Barang</button>
                  <button onClick={() => applyPreset('job')} className="flex-1 bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-blue-50 transition-colors whitespace-nowrap"><Briefcase size={14}/> Pekerjaan</button>
                  <button onClick={() => applyPreset('key')} className="flex-1 bg-white border border-amber-200 text-amber-700 py-2 px-3 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 hover:bg-amber-50 transition-colors whitespace-nowrap"><Key size={14}/> Kunci/Aset</button>
               </div>

               {/* META DATA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><CalendarDays size={12}/> Waktu & Tempat</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.no} onChange={e => handleDataChange('no', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                      </div>
                   </div>
               </div>

               {/* PARA PIHAK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Para Pihak</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      {/* Pihak 1 */}
                      <div className="border-l-4 border-slate-500 pl-3 space-y-2">
                         <h4 className="text-[10px] font-bold text-slate-700 uppercase">Pihak 1 (Menyerahkan)</h4>
                         <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                         <div className="grid grid-cols-2 gap-2">
                            <input className="w-full p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jabatan" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} />
                            <input className="w-full p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Divisi" value={data.p1Dept} onChange={e => handleDataChange('p1Dept', e.target.value)} />
                         </div>
                      </div>
                      {/* Pihak 2 */}
                      <div className="border-l-4 border-slate-800 pl-3 space-y-2">
                         <h4 className="text-[10px] font-bold text-slate-700 uppercase">Pihak 2 (Menerima)</h4>
                         <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                         <div className="grid grid-cols-2 gap-2">
                            <input className="w-full p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jabatan" value={data.p2Title} onChange={e => handleDataChange('p2Title', e.target.value)} />
                            <input className="w-full p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Divisi" value={data.p2Dept} onChange={e => handleDataChange('p2Dept', e.target.value)} />
                         </div>
                      </div>
                   </div>
               </div>

               {/* OBJEK (DYNAMIC BASED ON TEMPLATE) */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><PackageCheck size={12}/> Objek Serah Terima</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      {templateId === 1 ? (
                         // MODE TABEL
                         <div className="space-y-3">
                            <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold text-slate-500">Daftar Barang</span><button onClick={addItem} className="text-[10px] font-bold text-blue-600 hover:underline">+ Tambah Item</button></div>
                            {(data.items || []).map((item, idx) => (
                               <div key={item.id} className="flex gap-2 items-start border-b border-slate-100 pb-2 relative group">
                                  <div className="w-5 pt-2 text-[10px] text-center font-bold text-slate-400">{idx+1}.</div>
                                  <div className="flex-1 space-y-1">
                                     <input className="w-full p-1.5 border border-slate-200 rounded text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Barang" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                                     <div className="grid grid-cols-2 gap-2">
                                        <input className="w-full p-1.5 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jumlah" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} />
                                        <input className="w-full p-1.5 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Kondisi" value={item.condition} onChange={e => updateItem(idx, 'condition', e.target.value)} />
                                     </div>
                                  </div>
                                  <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-red-500 mt-2"><Trash2 size={14}/></button>
                               </div>
                            ))}
                         </div>
                      ) : (
                         // MODE NARASI
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500">Deskripsi Pekerjaan / Aset</label>
                            <textarea className="w-full p-3 border border-slate-200 rounded-lg text-sm h-32 resize-none leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none" value={data.desc} onChange={e => handleDataChange('desc', e.target.value)} placeholder="Tuliskan deskripsi lengkap pekerjaan atau aset yang diserahterimakan..." />
                         </div>
                      )}
                  </div>
               </div>

               {/* PENUTUP */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Penutup</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Catatan Tambahan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.additionalNote} onChange={e => handleDataChange('additionalNote', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi (Opsional)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness} onChange={e => handleDataChange('witness', e.target.value)} /></div>
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
