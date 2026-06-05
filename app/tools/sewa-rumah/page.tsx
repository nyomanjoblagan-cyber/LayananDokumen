'use client';

/**
 * FILE: SewaPropertiPage.tsx
 * STATUS: PRODUCTION READY (FIXED TS ERRORS)
 * DESC: Generator Surat Perjanjian Sewa Properti
 * FIX: Memperbaiki scope TEMPLATES dan activeTemplateName (TS 2304, 2552, 7006)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Home, Store, Hotel, 
  BadgeDollarSign, Users, Key, ChevronDown, Check, Edit3, Eye, RotateCcw, MapPin, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  ownerName: string;
  ownerNik: string;
  ownerPhone: string;
  ownerAddress: string;
  tenantName: string;
  tenantNik: string;
  tenantPhone: string;
  tenantAddress: string;
  type: string;
  addressProp: string;
  facilities: string;
  purpose: string;
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
  priceText: string;
  deposit: number;
  witness: string;
}

interface TemplateOption {
  id: number;
  name: string;
  desc: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'SURABAYA',
  date: '', 
  ownerName: 'H. ABDUL ROFIQ',
  ownerNik: '3578010101700001',
  ownerPhone: '0811-2222-3333',
  ownerAddress: 'Jl. Darmo Permai No. 10, Surabaya',
  tenantName: 'BUDI SANTOSO',
  tenantNik: '3578010101850005',
  tenantPhone: '0812-3456-7890',
  tenantAddress: 'Jl. Ahmad Yani No. 5, Sidoarjo',
  type: 'RUMAH TINGGAL',
  addressProp: 'Perumahan Graha Famili Blok B-10, Surabaya',
  facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit, Pompa Air, Gordyn',
  purpose: 'Tempat Tinggal Keluarga',
  duration: '2 (Dua) Tahun',
  startDate: '2026-03-01',
  endDate: '2028-03-01',
  price: 75000000,
  priceText: 'Tujuh Puluh Lima Juta Rupiah',
  deposit: 5000000,
  witness: 'Ketua RT Setempat'
};

export default function SewaPropertiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Loading...</div>}>
      <RentalAgreementBuilder />
    </Suspense>
  );
}

function RentalAgreementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);
  // --- FIX: DEFINISI TEMPLATES & LOGIKA NAMA (Mencegah TS 2304 & 2552) ---
  const TEMPLATES: TemplateOption[] = [
    { id: 1, name: "Legal Formal", desc: "Pasal lengkap (2 Halaman)" },
    { id: 2, name: "Ringkas / Kost", desc: "Simple & Padat (1 Halaman)" }
  ];
  
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name || "Pilih Template";

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'rumah' | 'ruko' | 'kost') => {
    if (type === 'rumah') {
      setData(prev => ({ ...prev, type: 'Rumah Tinggal', purpose: 'Tempat Tinggal Keluarga', duration: '1 (Satu) Tahun', price: 35000000, priceText: 'Tiga Puluh Lima Juta Rupiah' }));
      setTemplateId(1);
    } else if (type === 'ruko') {
      setData(prev => ({ ...prev, type: 'Ruko 2 Lantai', purpose: 'Kantor / Tempat Usaha', duration: '2 (Dua) Tahun', price: 80000000, priceText: 'Delapan Puluh Juta Rupiah' }));
      setTemplateId(1);
    } else if (type === 'kost') {
      setData(prev => ({ ...prev, type: 'Kamar Kost No. 05', purpose: 'Hunian Mahasiswa', duration: '6 (Enam) Bulan', price: 1500000, priceText: 'Satu Juta Lima Ratus Ribu Rupiah' }));
      setTemplateId(2);
    }
  };

  // --- KOMPONEN HALAMAN ---
  const SinglePage = ({ children, pageNum, totalPages }: { children: React.ReactNode, pageNum?: number, totalPages?: number }) => (
    <div className="bg-white block box-border text-slate-900 leading-normal p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-[297mm] print:w-[210mm] print:p-[20mm] relative print:break-after-page mb-10 print:mb-0">
      {children}
      {pageNum && (
        <div className="absolute bottom-8 right-10 text-[8pt] text-slate-300 italic">
          Halaman {pageNum} dari {totalPages}
        </div>
      )}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'long'}); } catch { return dateString; }
    };

    return (
      <div className={`flex flex-col items-center font-serif text-[10.5pt]`}>
        {templateId === 1 ? (
          <>
            <SinglePage pageNum={1} totalPages={2}>
              <div className="text-center mb-10 border-b-4 border-double border-black pb-2">
                <h1 className="text-xl font-black uppercase underline tracking-[0.2em]">SURAT PERJANJIAN SEWA MENYEWA</h1>
              </div>
              <div className="space-y-6 text-justify">
                <p>Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, kami yang bertanda tangan di bawah ini:</p>
                <div className="ml-4 space-y-5">
                  <div className="flex gap-4">
                    <span className="font-bold">I.</span>
                    <div className="flex-grow border-l-4 border-slate-100 pl-4 py-1">
                      <p className="font-black uppercase text-slate-900">{data.ownerName}</p>
                      <p className="text-[9pt] font-sans">NIK: {data.ownerNik} | Alamat: {data.ownerAddress}</p>
                      <p className="font-black text-[8px] uppercase tracking-widest text-blue-600 mt-2">Pihak Pertama (Pemilik)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold">II.</span>
                    <div className="flex-grow border-l-4 border-slate-100 pl-4 py-1">
                      <p className="font-black uppercase text-slate-900">{data.tenantName}</p>
                      <p className="text-[9pt] font-sans">NIK: {data.tenantNik} | Alamat: {data.tenantAddress}</p>
                      <p className="font-black text-[8px] uppercase tracking-widest text-emerald-600 mt-2">Pihak Kedua (Penyewa)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <p>PIHAK PERTAMA menyewakan properti <strong>{data.type}</strong> yang terletak di {data.addressProp} dengan fasilitas: <em>{data.facilities}</em>.</p>
                  <p>Masa sewa berlaku selama <strong>{data.duration}</strong>, mulai <strong>{formatDateSafe(data.startDate)}</strong> s/d <strong>{formatDateSafe(data.endDate)}</strong>.</p>
                  <p>Biaya sewa yang disepakati adalah sebesar <strong>Rp {data.price.toLocaleString('id-ID')}</strong> ({data.priceText}).</p>
                </div>
              </div>
            </SinglePage>
            <SinglePage pageNum={2} totalPages={2}>
              <div className="space-y-6 text-justify">
                  <p>Penyewa wajib menyerahkan deposit jaminan sebesar <strong>Rp {data.deposit.toLocaleString('id-ID')}</strong> yang akan dikembalikan di akhir masa sewa.</p>
                  <p>Biaya operasional bulanan (Listrik, Air, Keamanan) menjadi tanggung jawab penuh PIHAK KEDUA.</p>
                  <p className="pt-10">Demikian perjanjian ini dibuat dalam 2 (dua) rangkap asli bermaterai cukup.</p>
              </div>
              <div className="mt-24 grid grid-cols-2 gap-10 text-center font-sans">
                  <div className="flex flex-col h-44">
                      <p className="font-black uppercase text-[8pt] text-slate-300 tracking-widest mb-16">Penyewa</p>
                      <p className="font-black underline uppercase text-slate-900">{data.tenantName}</p>
                  </div>
                  <div className="flex flex-col h-44">
                      <p className="font-black uppercase text-[8pt] text-slate-300 tracking-widest mb-2">Pemilik</p>
                      <div className="border border-slate-200 w-24 h-14 mx-auto flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 uppercase">Materai</div>
                      <p className="font-black underline uppercase text-slate-900">{data.ownerName}</p>
                  </div>
              </div>
            </SinglePage>
          </>
        ) : (
          <SinglePage>
              <div className="text-center mb-8 border-b-2 border-slate-900 pb-2">
                <h1 className="text-xl font-black uppercase underline">PERJANJIAN SEWA RINGKAS</h1>
              </div>
              <div className="space-y-6 font-sans text-[10pt]">
                  <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                      <div><p className="text-[8pt] font-black text-slate-300 uppercase mb-1">Pemilik</p><p className="font-black uppercase">{data.ownerName}</p></div>
                      <div><p className="text-[8pt] font-black text-slate-300 uppercase mb-1">Penyewa</p><p className="font-black uppercase">{data.tenantName}</p></div>
                  </div>
                  <div className="p-6 border-l-8 border-emerald-500 bg-emerald-50/30 space-y-2 italic font-medium">
                      <p>Objek: {data.type} - {data.addressProp}</p>
                      <p>Durasi: {data.duration} ({data.startDate} s/d {data.endDate})</p>
                      <p>Total: Rp {data.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="mt-32 grid grid-cols-2 gap-20 text-center">
                      <div><p className="mb-24 font-black uppercase text-[8pt] text-slate-300">Penyewa</p><p className="font-black underline uppercase">{data.tenantName}</p></div>
                      <div><p className="mb-24 font-black uppercase text-[8pt] text-slate-300">Pemilik</p><p className="font-black underline uppercase">{data.ownerName}</p></div>
                  </div>
              </div>
          </SinglePage>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Home size={16} /> <span>Property Agreement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900 font-sans">
                  {TEMPLATES.map((t: TemplateOption) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Sewa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                 <button onClick={() => applyPreset('rumah')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-emerald-600 hover:text-white transition-all"><Home size={14}/> RUMAH</button>
                 <button onClick={() => applyPreset('ruko')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-blue-600 hover:text-white transition-all"><Store size={14}/> RUKO</button>
                 <button onClick={() => applyPreset('kost')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-amber-600 hover:text-white transition-all"><Hotel size={14}/> KOST</button>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Users size={12}/> Identitas Pihak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.tenantName} onChange={e => handleDataChange('tenantName', e.target.value)} placeholder="Nama Penyewa" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Lokasi Properti</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Jenis (Cth: Ruko 2 Lantai)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.addressProp} onChange={e => handleDataChange('addressProp', e.target.value)} placeholder="Alamat Lengkap Unit..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><BadgeDollarSign size={12}/> Ketentuan Sewa</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-400">MULAI</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-400">BERAKHIR</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-black text-slate-900" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} type="number" placeholder="Harga Sewa" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness} onChange={e => handleDataChange('witness', e.target.value)} placeholder="Saksi (Cth: Ketua RT)" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold text-xs uppercase">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE