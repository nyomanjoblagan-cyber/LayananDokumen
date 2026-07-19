'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: TanahAmanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pernyataan Fisik & Tidak Sengketa Tanah
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  MapPin, ShieldCheck, Navigation, Users, Map
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LandData {
  city: string;
  date: string;
  docNo: string;
  issuerOffice: string;
  villageHead: string;
  villageJob: string;
  
  ownerName: string;
  ownerNik: string;
  ownerAddress: string;
  
  landLocation: string;
  landSize: string;
  landStatus: string;
  
  borderNorth: string;
  borderSouth: string;
  borderEast: string;
  borderWest: string;
  
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LandData = {
  city: 'Denpasar',
  date: '2026-07-13', 
  docNo: '590/042/PEM/I/2026',
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
  villageHead: 'I NYOMAN GEDE, S.E.',
  villageJob: 'Perbekel Pemecutan Kaja',
  
  ownerName: 'BAGUS RAMADHAN',
  ownerNik: '5171010101990001',
  ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  landLocation: 'Jl. Ahmad Yani Gg. VII, Pemecutan Kaja',
  landSize: '200 m2',
  landStatus: 'Tanah Milik Adat (Pipil/Kikit) No. 1234',
  
  borderNorth: 'Tanah Milik Bapak Wayan',
  borderSouth: 'Jalan Desa / Gang VII',
  borderEast: 'Tanah Milik Ibu Sari',
  borderWest: 'Saluran Irigasi / Parit',
  
  witness1: 'I KETUT SUDARSANA',
  witness2: 'MADE WIRA'
};

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function TanahAmanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Tanah...</div>}>
      <LandSafetyBuilder />
    </Suspense>
  );
}

function LandSafetyBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'kop' | 'pemilik' | 'objek' | 'batas' | 'saksi'>('kop');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<LandData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof LandData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="border-b-[3px] border-black pb-2 mb-6 text-center">
        <h1 className="text-xl font-bold uppercase whitespace-pre-line leading-tight">{data.issuerOffice}</h1>
      </div>

      <div className="text-center mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold underline uppercase tracking-wide">Surat Pernyataan Penguasaan Fisik Bidang Tanah (Sporadik)</h2>
        <p className="mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      <div className="mb-4 pl-4 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.ownerName}</div></div>
        <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.ownerNik}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.ownerAddress}</div></div>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Dengan ini menyatakan dengan sesungguhnya serta dengan itikad baik bahwa saya menguasai sebidang tanah yang terletak di:</p>
      </div>

      <div className="mb-4 pl-4 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Jalan/Lokasi</div><div className="w-4">:</div><div className="flex-1 uppercase font-bold">{data.landLocation}</div></div>
        <div className="flex mb-1"><div className="w-40">Luas Tanah</div><div className="w-4">:</div><div className="flex-1 font-bold">± {data.landSize}</div></div>
        <div className="flex mb-1"><div className="w-40">Status Tanah</div><div className="w-4">:</div><div className="flex-1">{data.landStatus}</div></div>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Dengan batas-batas sempadan sebagai berikut:</p>
      </div>

      <div className="mb-6 pl-4 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40">Sebelah Utara</div><div className="w-4">:</div><div className="flex-1">{data.borderNorth}</div></div>
        <div className="flex mb-1"><div className="w-40">Sebelah Timur</div><div className="w-4">:</div><div className="flex-1">{data.borderEast}</div></div>
        <div className="flex mb-1"><div className="w-40">Sebelah Selatan</div><div className="w-4">:</div><div className="flex-1">{data.borderSouth}</div></div>
        <div className="flex mb-1"><div className="w-40">Sebelah Barat</div><div className="w-4">:</div><div className="flex-1">{data.borderWest}</div></div>
      </div>

      <div className="text-justify mb-8 break-inside-avoid leading-relaxed">
        <p className="mb-3 font-bold">Selanjutnya saya menyatakan bahwa:</p>
        <ol className="list-decimal pl-5 mb-4">
            <li className="mb-2">Bidang tanah tersebut adalah benar-benar milik saya sendiri / saya kuasai secara fisik.</li>
            <li className="mb-2">Tidak dalam sengketa, baik batas-batasnya maupun kepemilikannya dengan pihak manapun.</li>
            <li className="mb-2">Tidak sedang dijadikan jaminan hutang (di-agunkan) pada pihak Bank atau lembaga keuangan manapun.</li>
            <li className="mb-2">Tidak dalam sitaan pihak berwajib atau pengadilan.</li>
        </ol>
        <p>Apabila di kemudian hari ternyata pernyataan ini tidak benar, saya bersedia dituntut di hadapan hukum baik secara perdata maupun pidana sesuai peraturan perundang-undangan yang berlaku, dan tidak akan melibatkan pejabat yang mengesahkan surat pernyataan ini.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mb-6">
        <div className="text-center w-64">
        </div>
        <div className="text-center w-64">
            <p className="mb-2">{data.city}, {formatDateDisplay(data.date)}<br/>Yang Membuat Pernyataan,</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000 & TTD)</span>
            </div>
            <p className="font-bold underline uppercase">{data.ownerName}</p>
        </div>
      </div>

      <div className="flex justify-between px-4 break-inside-avoid mb-8">
        <div className="text-center w-64">
            <p className="mb-2">Saksi I,</p>
            <div className="h-16 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.witness1}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2">Saksi II,</p>
            <div className="h-16 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.witness2}</p>
        </div>
      </div>

      <div className="flex justify-center px-4 break-inside-avoid text-center">
        <div className="w-72">
            <p className="mb-2">Mengetahui/Mengesahkan,<br/><span className="uppercase font-bold">{data.villageJob}</span></p>
            <div className="h-24 flex justify-center items-center">
                 <span className="text-gray-300 text-[10px] print:hidden">(TTD & Stempel Kepala Desa)</span>
            </div>
            <p className="font-bold underline uppercase">{data.villageHead}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Tanah Tidak Sengketa</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Map size={18} className="text-amber-600" /> Editor Tanah</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('kop')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kop' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Desa/Lurah</button>
                <button onClick={() => setActiveTab('pemilik')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemilik' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pemilik</button>
                <button onClick={() => setActiveTab('objek')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'objek' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Objek</button>
                <button onClick={() => setActiveTab('batas')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'batas' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Batas</button>
                <button onClick={() => setActiveTab('saksi')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'saksi' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>Saksi</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kop' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-slate-600"/> Instansi Pengesahan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kop Pemerintah (Pemda/Kec/Desa)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold text-center" value={data.issuerOffice} onChange={e => handleChange('issuerOffice', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Registrasi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat (Kades/Lurah)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageHead} onChange={e => handleChange('villageHead', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageJob} onChange={e => handleChange('villageJob', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pemilik' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Users size={14} className="text-blue-600"/> Data Pemilik
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pemilik</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerName} onChange={e => handleChange('ownerName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (Nomor Induk Kependudukan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerNik} onChange={e => handleChange('ownerNik', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerAddress} onChange={e => handleChange('ownerAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'objek' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-emerald-600"/> Objek Tanah
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Bidang Tanah</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.landLocation} onChange={e => handleChange('landLocation', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Bidang Tanah (m2 / Ha)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.landSize} onChange={e => handleChange('landSize', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Penguasaan / Bukti (Mis: Pipil, Girik, SKT)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.landStatus} onChange={e => handleChange('landStatus', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'batas' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Navigation size={14} className="text-amber-600"/> Batas-Batas Sempadan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Utara</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.borderNorth} onChange={e => handleChange('borderNorth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Selatan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.borderSouth} onChange={e => handleChange('borderSouth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Timur</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.borderEast} onChange={e => handleChange('borderEast', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Barat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.borderWest} onChange={e => handleChange('borderWest', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'saksi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-rose-600"/> Saksi-Saksi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 1</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness1} onChange={e => handleChange('witness1', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 2</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness2} onChange={e => handleChange('witness2', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`TanahAman_${data.ownerName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
