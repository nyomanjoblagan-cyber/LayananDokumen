'use client';

/**
 * FILE: AhliWarisDesaPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Keterangan Waris dengan standar Tata Naskah Dinas (TND).
 * FITUR: 
 * - Layout Tanda Tangan Hierarki (Saksi -> Kades -> Camat)
 * - Dynamic Form (Add/Remove Ahli Waris)
 * - Print Scaling Fix (A4 Locked)
 * - Type Safety (TypeScript)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, Users, Trash2, ShieldCheck, 
  Landmark, LayoutTemplate, ChevronDown, Edit3, 
  Eye, ArrowLeftCircle, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika komponen iklan sudah ada, uncomment baris di bawah:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS (Agar sistem stabil & tidak error saat build) ---
interface Heir {
  name: string;
  age: string;
  relation: string;
}

interface Witness {
  name: string;
  title: string;
}

interface VillageData {
  district: string;
  village: string;
  city: string;
  villageAddress: string;
  date: string;
  docNo: string;
  regKecamatan: string;
  deceasedName: string;
  deceasedNik: string;
  deceasedDeathDate: string;
  deceasedAge: string;
  deceasedReligion: string;
  deceasedAddress: string;
  heirs: Heir[];
  witnesses: Witness[];
  villageHead: string;
  villageHeadNip: string;
  subDistrictHead: string;
  subDistrictHeadNip: string;
}

// --- 2. DATA DEFAULT (Placeholder Awal) ---
const INITIAL_DATA: VillageData = {
  district: 'KECAMATAN MENTENG',
  village: 'KELURAHAN MENTENG',
  city: 'JAKARTA PUSAT',
  villageAddress: 'Jl. Pegangsaan Barat No. 12, Jakarta Pusat, 10310',
  date: '', // Akan diisi otomatis oleh useEffect
  
  // Nomor Surat
  docNo: '470 / 125 / 41.10.2 / 2026',
  regKecamatan: '590 / 02 / I / 2026',
  
  // Data Almarhum
  deceasedName: 'H. AHMAD JAYADI',
  deceasedNik: '3171010101700001',
  deceasedDeathDate: '2025-11-20',
  deceasedAge: '65',
  deceasedReligion: 'Islam',
  deceasedAddress: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng',

  // Ahli Waris Default
  heirs: [
    { name: 'SITI AMINAH', age: '60', relation: 'Istri/Janda' },
    { name: 'BUDI SETIAWAN', age: '35', relation: 'Anak Kandung' },
    { name: 'ANI MARYANI', age: '30', relation: 'Anak Kandung' }
  ],

  // Saksi Default
  witnesses: [
      { name: 'BAPAK RT 001', title: 'Ketua RT 001' },
      { name: 'BAPAK RW 002', title: 'Ketua RW 002' }
  ],

  // Pejabat
  villageHead: 'I WAYAN SUDIRTA, S.Sos',
  villageHeadNip: '19700101 199003 1 005',
  subDistrictHead: 'Drs. H. MULYONO, M.Si',
  subDistrictHeadNip: '19680505 198803 1 002'
};

// --- 3. KOMPONEN UTAMA ---
export default function AhliWarisDesaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Desa...</div>}>
      <VillageHeirBuilder />
    </Suspense>
  );
}

function VillageHeirBuilder() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  // Data State dengan Type Safety
  const [data, setData] = useState<VillageData>(INITIAL_DATA);

  // Effect: Set tanggal hari ini saat halaman dibuka (Client Side Only)
  useEffect(() => {
    setData(prev => ({
      ...prev,
      date: new Date().toISOString().split('T')[0]
    }));
  }, []);

  // --- HANDLERS (LOGIKA APLIKASI) ---
  
  // Upload Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  // Update Data Teks Biasa
  const handleDataChange = (field: keyof VillageData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  // Update Data Array (Ahli Waris)
  const updateHeir = (idx: number, field: keyof Heir, val: string) => {
    const newHeirs = [...data.heirs];
    newHeirs[idx] = { ...newHeirs[idx], [field]: val };
    setData(prev => ({ ...prev, heirs: newHeirs }));
  };

  // Tambah Baris Ahli Waris
  const addHeir = () => {
    setData(prev => ({ ...prev, heirs: [...prev.heirs, { name: '', age: '', relation: '' }] }));
  };
  
  // Hapus Baris Ahli Waris
  const removeHeir = (idx: number) => {
    const arr = [...data.heirs]; 
    arr.splice(idx, 1); 
    setData(prev => ({ ...prev, heirs: arr }));
  };

  // Update Saksi
  const updateWitness = (idx: number, field: keyof Witness, val: string) => {
    const newWits = [...data.witnesses];
    newWits[idx] = { ...newWits[idx], [field]: val };
    setData(prev => ({ ...prev, witnesses: newWits }));
  };

  // Reset Form
  const handleReset = () => {
    if(confirm('Apakah Anda yakin ingin mereset semua data ke awal? Data yang sudah diketik akan hilang.')) {
        setData({
            ...INITIAL_DATA, 
            date: new Date().toISOString().split('T')[0]
        });
        setLogo(null);
    }
  };

  // --- KONTEN SURAT (INTERNAL COMPONENT) ---
  // Bagian ini dirender ulang saat preview & print
  const ContentInside = () => {
    // Helper Format Tanggal Indonesia
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'long', year: 'numeric' 
            });
        } catch (e) {
            return dateString;
        }
    };

    if (templateId === 1) {
      // ============================================
      // TEMPLATE 1: DINAS RESMI (STANDAR PEMERINTAH)
      // ============================================
      return (
        <div className="font-serif text-[11pt] text-black leading-[1.5]">
           
           {/* 1. KOP SURAT */}
           <div className="flex items-center border-b-[3px] border-double border-black pb-4 mb-6 text-center relative">
              {logo ? <img src={logo} className="w-24 h-24 object-contain absolute left-0 top-0 grayscale" alt="Logo" /> : null}
              <div className="flex-grow px-12">
                 <h3 className="text-[12pt] font-bold uppercase tracking-wide">PEMERINTAH KABUPATEN/KOTA {data.city}</h3>
                 <h2 className="text-[14pt] font-black uppercase tracking-wider">{data.district}</h2>
                 <h1 className="text-[16pt] font-black uppercase underline tracking-widest">{data.village}</h1>
                 <p className="text-[9pt] font-sans mt-1 italic">{data.villageAddress}</p>
              </div>
           </div>

           {/* 2. JUDUL SURAT */}
           <div className="text-center mb-8">
              <h2 className="text-[13pt] font-bold underline uppercase">SURAT KETERANGAN AHLI WARIS</h2>
              <p className="text-[11pt]">Nomor: {data.docNo}</p>
           </div>

           {/* 3. ISI SURAT (BODY) */}
           <div className="text-justify px-1">
              <p className="mb-4 indent-12">Yang bertanda tangan di bawah ini Lurah/Kepala Desa <strong>{data.village}</strong>, Kecamatan {data.district}, {data.city}, dengan ini menerangkan bahwa pada tanggal <strong>{formatDate(data.deceasedDeathDate)}</strong> telah meninggal dunia:</p>
              
              {/* Data Almarhum */}
              <div className="ml-8 mb-6 font-sans text-[11pt]">
                 <table className="w-full">
                    <tbody>
                       <tr><td className="w-[150px] align-top py-1">Nama Almarhum</td><td className="align-top py-1 px-2">:</td><td className="font-bold uppercase align-top py-1">{data.deceasedName}</td></tr>
                       <tr><td className="align-top py-1">NIK</td><td className="align-top py-1 px-2">:</td><td className="align-top py-1">{data.deceasedNik}</td></tr>
                       <tr><td className="align-top py-1">Umur / Agama</td><td className="align-top py-1 px-2">:</td><td className="align-top py-1">{data.deceasedAge} Tahun / {data.deceasedReligion}</td></tr>
                       <tr><td className="align-top py-1">Alamat Terakhir</td><td className="align-top py-1 px-2">:</td><td className="align-top py-1">{data.deceasedAddress}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4 indent-12">Berdasarkan Surat Keterangan Kematian dan data kependudukan yang ada, Almarhum/ah meninggalkan Ahli Waris yang sah sebagai berikut:</p>

              {/* Tabel Ahli Waris (Dengan Page Break Avoid) */}
              <table className="w-full border-collapse border border-black mb-6 font-sans text-[10pt]">
                 <thead className="bg-slate-100 uppercase font-bold text-center">
                    <tr>
                       <th className="border border-black p-2 w-10">No</th>
                       <th className="border border-black p-2 text-left">Nama Lengkap</th>
                       <th className="border border-black p-2 w-16">Umur</th>
                       <th className="border border-black p-2 w-32">Hubungan</th>
                       <th className="border border-black p-2 w-40">Tanda Tangan</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.heirs.map((heir, i) => (
                       <tr key={i} style={{ pageBreakInside: 'avoid' }}>
                          <td className="border border-black p-2 text-center">{i + 1}.</td>
                          <td className="border border-black p-2 font-bold uppercase">{heir.name}</td>
                          <td className="border border-black p-2 text-center">{heir.age} Thn</td>
                          <td className="border border-black p-2 text-center">{heir.relation}</td>
                          <td className="border border-black p-2 relative text-[9pt] italic align-middle">
                             <div className="h-8 flex items-center text-slate-400">
                               <span className={i % 2 === 0 ? "mr-auto pl-2" : "ml-auto pr-2"}>{i + 1}. ...........</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>

              <p className="indent-12 mb-4">Demikian Surat Keterangan Waris ini dibuat dengan sebenarnya dan apabila dikemudian hari keterangan ini tidak benar, maka kami para ahli waris dan saksi bersedia dituntut sesuai hukum yang berlaku.</p>
           </div>

           {/* 4. TANDA TANGAN (LAYOUT PIRAMIDA / SEGITIGA) */}
           {/* Ini Layout Paling Benar secara Administrasi: Kiri Saksi, Kanan Kades, Bawah Camat */}
           <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
              
              {/* BARIS ATAS: SAKSI (KIRI) & LURAH (KANAN) */}
              <div className="flex justify-between items-start mb-8">
                 
                 {/* KIRI: SAKSI-SAKSI */}
                 <div className="w-[45%] text-center">
                    <p className="font-bold underline mb-4 text-[10pt]">SAKSI - SAKSI :</p>
                    <div className="space-y-8 text-left pl-8">
                        {data.witnesses.map((w, i) => (
                            <div key={i}>
                                <div className="flex items-end gap-2 mb-1">
                                    <span className="font-bold">{i+1}. {w.name}</span>
                                </div>
                                <div className="border-b border-black w-[80%] mb-1"></div>
                                <p className="text-[9pt] italic">({w.title})</p>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* KANAN: LURAH / KADES */}
                 <div className="w-[45%] text-center">
                    <p className="mb-2">{data.city.split(' ').pop()}, {formatDate(data.date)}</p>
                    <p className="font-bold uppercase mb-20">LURAH / KEPALA DESA</p>
                    <p className="font-bold underline uppercase text-[11pt]">{data.villageHead}</p>
                    <p className="text-[10pt]">NIP. {data.villageHeadNip}</p>
                 </div>
              </div>

              {/* BARIS BAWAH: CAMAT (MENGETAHUI - TENGAH) */}
              <div className="flex justify-center mt-4">
                  <div className="text-center w-[50%] relative">
                      <p className="mb-1">Mengetahui,</p>
                      <p className="font-bold uppercase mb-20">CAMAT {data.district}</p>
                      <p className="font-bold underline uppercase text-[11pt]">{data.subDistrictHead}</p>
                      <p className="text-[10pt]">NIP. {data.subDistrictHeadNip}</p>
                      
                      {/* Nomor Register Camat (Penting untuk legalitas) */}
                      <div className="mt-2 text-[9pt] italic text-slate-600">
                          No. Reg Kecamatan: <strong>{data.regKecamatan}</strong>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      );
    } else {
      // ============================================
      // TEMPLATE 2: MODERN CLEAN (OPSIONAL)
      // ============================================
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-relaxed">
           {/* Header Modern */}
           <div className="border-b-2 border-emerald-600 pb-4 mb-8 flex justify-between items-end">
              <div>
                 <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">SURAT KETERANGAN WARIS</h1>
                 <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Pemerintah {data.village}</p>
              </div>
              <div className="text-right"><p className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">No: {data.docNo}</p></div>
           </div>
           
           {/* Body Modern */}
           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Data Almarhum</h3>
              <div className="grid grid-cols-[120px_1fr] gap-1.5">
                 <span className="text-slate-500">Nama</span><span className="font-bold uppercase">{data.deceasedName}</span>
                 <span className="text-slate-500">Tgl Wafat</span><span>{formatDate(data.deceasedDeathDate)}</span>
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
                          <div><p className="font-bold uppercase text-sm">{heir.name}</p><p className="text-xs text-slate-500">{heir.age} Tahun</p></div>
                       </div>
                       <div className="text-right"><span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{heir.relation}</span></div>
                    </div>
                 ))}
              </div>
           </div>
           
           {/* Footer Modern */}
           <div className="mt-12 pt-8 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
               <div className="grid grid-cols-3 gap-4 text-center items-end">
                   <div>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-8">Saksi - Saksi</p>
                       <div className="space-y-4">
                           {data.witnesses.map((w,i) => (
                               <div key={i} className="border-b border-slate-200 pb-1"><p className="text-xs font-bold">{w.name}</p></div>
                           ))}
                       </div>
                   </div>
                   <div>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-20">Mengetahui (Camat)</p>
                       <p className="font-bold underline uppercase">{data.subDistrictHead}</p>
                   </div>
                   <div>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-20">Lurah / Kades</p>
                       <p className="font-bold underline uppercase">{data.villageHead}</p>
                   </div>
               </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* === CSS KHUSUS PRINT (JURUS RAHASIA) ===
        Ini mengunci ukuran kertas ke A4 dan mencegah browser mengecilkan konten.
      */}
      <style jsx global>{`
        @media print {
            @page { 
                size: A4 portrait; 
                margin: 0; 
            }
            
            /* Sembunyikan elemen UI (tombol, sidebar) */
            .no-print { display: none !important; }
            
            /* Reset Body */
            body { 
                background: white; 
                margin: 0; 
                padding: 0; 
                min-width: 210mm; /* KUNCI LEBAR AGAR TIDAK MENGECIL */
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            /* Container Print Utama (Root) */
            #print-only-root {
                display: block !important;
                position: absolute;
                top: 0;
                left: 0;
                width: 210mm; /* HARUS 210mm FIX */
                min-height: 297mm;
                z-index: 9999;
                background: white;
                font-size: 12pt;
            }

            /* Table Wrapper (Header Berulang di Halaman Berikutnya) */
            .print-table { 
                width: 100%; 
                border-collapse: collapse; 
                table-layout: fixed;
            }
            
            /* Margin Atas Halaman (Header Space) */
            .print-table thead { 
                height: 15mm; 
                display: table-header-group;
            } 
            
            /* Margin Bawah Halaman (Footer Space) */
            .print-table tfoot { 
                height: 15mm; 
                display: table-footer-group;
            } 
            
            /* Margin Kiri-Kanan Konten */
            .print-content-wrapper { 
                padding: 0 20mm; /* Standar Margin Surat 2cm */
                width: 100%;
                box-sizing: border-box;
            }
            
            /* Mencegah pemotongan baris tabel/paragraf di tengah */
            tr, .keep-together { 
                page-break-inside: avoid !important; 
                break-inside: avoid;
            }
        }
      `}</style>

      {/* HEADER NAVY (UI ATAS) */}
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
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Dinas (Resmi)</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Modern (Simpel)</button>
                     </div>
                  )}
               </div>
               {/* TOMBOL CETAK */}
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak / PDF</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         
         {/* SIDEBAR EDITOR (KIRI) */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            
            {/* Toolbar Sidebar */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Surat</h2>
                <button onClick={handleReset} title="Reset Data" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               
               {/* 1. KOP SURAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Landmark size={12}/> Kop Pemerintah Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="flex gap-4 items-center">
                        <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0 relative overflow-hidden group">
                           {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[8px] font-bold">UBAH</div>
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                        </div>
                        <div className="flex-1 space-y-2">
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan..." />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Desa/Kelurahan..." />
                        </div>
                     </div>
                     <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kabupaten/Kota..." />
                     <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.villageAddress} onChange={e => handleDataChange('villageAddress', e.target.value)} placeholder="Alamat Kantor..." />
                  </div>
               </div>

               {/* 2. DATA ALMARHUM */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Data Almarhum</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Wafat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Umur (Thn)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedAge} onChange={e => handleDataChange('deceasedAge', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedReligion} onChange={e => handleDataChange('deceasedReligion', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Terakhir</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. AHLI WARIS */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Users size={12}/> Ahli Waris</h3><button onClick={addHeir} className="text-[10px] font-bold bg-white border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 shadow-sm transition-all active:scale-95">+ Tambah</button></div>
                  <div className="space-y-3">
                     {data.heirs.map((h, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group hover:border-emerald-400 transition-all">
                           <button onClick={() => removeHeir(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                           <input className="w-full p-1.5 border-b border-slate-200 text-xs font-bold bg-transparent mb-2 focus:outline-none focus:border-emerald-500 uppercase" placeholder="Nama Lengkap..." value={h.name} onChange={e => updateHeir(idx, 'name', e.target.value)} />
                           <div className="grid grid-cols-[80px_1fr] gap-3">
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent focus:outline-none focus:border-emerald-500" placeholder="Umur..." value={h.age} onChange={e => updateHeir(idx, 'age', e.target.value)} />
                              <input className="w-full p-1.5 border-b border-slate-200 text-xs bg-transparent focus:outline-none focus:border-emerald-500" placeholder="Hubungan..." value={h.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 4. LEGALITAS (PEJABAT) */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><LayoutTemplate size={12}/> Legalitas & Pejabat</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      {/* Nomor Surat */}
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. Surat Desa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Reg. Kecamatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.regKecamatan} onChange={e => handleDataChange('regKecamatan', e.target.value)} /></div>
                      </div>
                      
                      {/* Lurah */}
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lurah/Kades</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Lurah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.villageHeadNip} onChange={e => handleDataChange('villageHeadNip', e.target.value)} /></div>
                      </div>

                      {/* Camat */}
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Camat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.subDistrictHead} onChange={e => handleDataChange('subDistrictHead', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP Camat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.subDistrictHeadNip} onChange={e => handleDataChange('subDistrictHeadNip', e.target.value)} /></div>
                      </div>
                      
                      {/* Saksi */}
                      <div className="pt-2 border-t border-dashed border-slate-200 space-y-2">
                         <label className="text-[10px] font-bold text-slate-500">Saksi (RT/RW)</label>
                         {data.witnesses.map((w, idx) => (
                            <div key={idx} className="flex gap-2">
                               <input className="flex-1 p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={w.name} onChange={e => updateWitness(idx, 'name', e.target.value)} placeholder="Nama Saksi" />
                               <input className="w-24 p-2 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={w.title} onChange={e => updateWitness(idx, 'title', e.target.value)} placeholder="Jabatan" />
                            </div>
                         ))}
                      </div>
                  </div>
               </div>
               
               {/* Spacer Bawah untuk Mobile */}
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* AREA PREVIEW (KANAN) */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                {/* Scale Transform untuk Preview (Bukan untuk Print) */}
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>
      
      {/* TOMBOL NAVIGASI MOBILE */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* === PRINT PORTAL ===
         Ini adalah elemen yang AKAN DICETAK.
         Elemen ini tersembunyi di layar biasa (hidden), tapi muncul saat Print karena CSS @media print.
      */}
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
