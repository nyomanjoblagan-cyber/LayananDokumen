'use client';

/**
 * FILE: JualBeliTanahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Jual Beli Tanah
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  BadgeDollarSign, Users, GripHorizontal, CreditCard, CalendarDays, FileText, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LandSaleData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Penjual)
  p1Name: string; p1Age: string; p1Job: string; p1Address: string; p1Nik: string; 
  p1Spouse: string; 

  // Pihak 2 (Pembeli)
  p2Name: string; p2Age: string; p2Job: string; p2Address: string; p2Nik: string;
  
  // Detail Tanah
  landCertType: string; landCertNo: string; landArea: string; landAddress: string;
  bNorth: string; bSouth: string; bEast: string; bWest: string;
  
  // Transaksi
  price: number; priceText: string; dp: number; paymentMethod: string;
  
  // Saksi & Tambahan
  witness1: string; 
  witness2: string;
  additionalClause: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LandSaleData = {
  day: 'Senin',
  date: '', // Diisi useEffect
  city: 'SLEMAN',
  
  p1Name: 'BAMBANG SUDARSO', p1Age: '52', p1Job: 'Pensiunan PNS', p1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta', p1Nik: '3404010101740001', 
  p1Spouse: 'Siti Aminah', 
  
  p2Name: 'ANDI PRATAMA', p2Age: '30', p2Job: 'Wiraswasta', p2Address: 'Jl. Gejayan No. 15, Depok, Sleman', p2Nik: '3471010101960002',
  
  landCertType: 'SHM', landCertNo: '01234/Sardonoharjo', landArea: '500', landAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  bNorth: 'Tanah Bapak Joko', bSouth: 'Jalan Desa (Aspal)', bEast: 'Selokan Mataram', bWest: 'Rumah Ibu Ani',
  
  price: 1500000000, priceText: 'Satu Milyar Lima Ratus Juta Rupiah', dp: 500000000, paymentMethod: 'Transfer Bank BCA',
  
  witness1: 'Ketua RT 05 (Pak Rahmat)', 
  witness2: 'Adik Kandung Penjual',
  additionalClause: '' 
};

// --- 3. KOMPONEN UTAMA ---
export default function JualBeliTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <LandSaleBuilder />
    </Suspense>
  );
}

function LandSaleBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LandSaleData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof LandSaleData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] min-h-[296mm] h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
        {templateId === 1 && (
          <>
            <Kertas>
                <div className="text-center mb-8 pb-4 border-b-2 border-black">
                  <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN JUAL BELI TANAH</h1>
                </div>
                <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>
                <div className="ml-4 mb-4 text-sm break-inside-avoid">
                  <table className="w-full leading-snug">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                        <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                        <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                      </tbody>
                  </table>
                  <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA (PENJUAL)</strong>.</div>
                </div>
                <div className="ml-4 mb-6 text-sm break-inside-avoid">
                  <table className="w-full leading-snug">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                        <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                        <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                      </tbody>
                  </table>
                  <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA (PEMBELI)</strong>.</div>
                </div>
                <div className="mb-4 break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 1: OBJEK JUAL BELI</div>
                  <p>PIHAK PERTAMA menjual kepada PIHAK KEDUA sebidang tanah:</p>
                  <div className="ml-4 mt-2 text-sm">
                      <p>Sertifikat: <b>{data.landCertType} No. {data.landCertNo}</b></p>
                      <p>Luas: <b>{data.landArea} m²</b></p>
                      <p>Lokasi: <b>{data.landAddress}</b></p>
                      <div className="mt-2 text-xs italic">Batas: U: {data.bNorth}, S: {data.bSouth}, T: {data.bEast}, B: {data.bWest}</div>
                  </div>
                </div>
                <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
            </Kertas>
            <Kertas>
                <div className="space-y-6 text-justify pt-4">
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold uppercase mb-2">PASAL 2: HARGA & PEMBAYARAN</div>
                      <p className="text-sm">Harga disepakati <strong>{formatRupiah(data.price)}</strong>. DP sebesar <strong>{formatRupiah(data.dp)}</strong> dibayar tunai, sisa dibayar via {data.paymentMethod}.</p>
                  </div>
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold uppercase mb-2">PASAL 3: JAMINAN</div>
                      <p className="text-sm">PIHAK PERTAMA menjamin objek tanah bebas sengketa dan sitaan pihak manapun.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 text-center text-sm mt-20 break-inside-avoid">
                  <div><p className="mb-20 font-bold">PEMBELI</p><p className="font-bold underline uppercase">{data.p2Name}</p></div>
                  <div><p className="mb-4 font-bold">PENJUAL</p><div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic">MATERAI</div><p className="font-bold underline uppercase">{data.p1Name}</p></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-xs mt-12 break-inside-avoid">
                  <div><p className="border-t border-black pt-1">{data.witness1}</p></div>
                  <div><p className="border-t border-black pt-1">{data.p1Spouse} (Penyetuju)</p></div>
                  <div><p className="border-t border-black pt-1">{data.witness2}</p></div>
                </div>
                <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
            </Kertas>
          </>
        )}
        {templateId === 2 && (
          <Kertas>
              <div className="text-center mb-6 border-b-2 border-black pb-2">
                <h1 className="font-bold text-xl uppercase underline">PERJANJIAN JUAL BELI TANAH</h1>
              </div>
              <p className="mb-4 text-sm">Pada {data.day}, {formatDateSafe(data.date)}, bertempat di {data.city}, kami sepakat melakukan transaksi jual beli tanah {data.landCertType} No. {data.landCertNo} luas {data.landArea} m² di {data.landAddress}.</p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                <div className="border p-2"><b>PENJUAL:</b><br/>{data.p1Name}<br/>{data.p1Nik}</div>
                <div className="border p-2"><b>PEMBELI:</b><br/>{data.p2Name}<br/>{data.p2Nik}</div>
              </div>
              <div className="mb-6 text-sm">
                <b>HARGA: {formatRupiah(data.price)}</b><br/>
                <i>({data.priceText})</i><br/>
                Pembayaran: DP {formatRupiah(data.dp)}, Sisa via {data.paymentMethod}.
              </div>
              <div className="flex justify-between text-center mt-20 break-inside-avoid">
                <div className="w-40"><p className="mb-16 font-bold">PEMBELI</p><p className="font-bold underline">{data.p2Name}</p></div>
                <div className="w-40"><p className="mb-4 font-bold">PENJUAL</p><div className="border border-slate-300 h-12 flex items-center justify-center text-[8px] text-slate-400 italic mb-2">MATERAI</div><p className="font-bold underline">{data.p1Name}</p></div>
              </div>
          </Kertas>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Map size={16} className="text-emerald-500" /> <span>Land Sale Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Legal Formal (2 Hal) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Compact Rapi (1 Hal) {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kontrak</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1">Identitas Penjual</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Penjual" />
                <input className="w-full p-2 border rounded text-xs" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="NIK Penjual" />
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Penjual" />
                <input className="w-full p-2 border rounded text-xs" value={data.p1Spouse} onChange={e => handleDataChange('p1Spouse', e.target.value)} placeholder="Nama Suami/Istri (Penyetuju)" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Identitas Pembeli</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Pembeli" />
                <input className="w-full p-2 border rounded text-xs" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK Pembeli" />
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Pembeli" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1">Objek Tanah</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded text-xs" value={data.landCertType} onChange={e => handleDataChange('landCertType', e.target.value)} placeholder="Tipe (SHM/AJB)" />
                  <input className="w-full p-2 border rounded text-xs" value={data.landCertNo} onChange={e => handleDataChange('landCertNo', e.target.value)} placeholder="No Sertifikat" />
                </div>
                <input className="w-full p-2 border rounded text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas m2" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded text-[10px]" value={data.bNorth} onChange={e => handleDataChange('bNorth', e.target.value)} placeholder="Batas Utara" />
                  <input className="w-full p-2 border rounded text-[10px]" value={data.bSouth} onChange={e => handleDataChange('bSouth', e.target.value)} placeholder="Batas Selatan" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1">Harga & DP</h3>
                <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} placeholder="Harga Total" />
                <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.dp} onChange={e => handleDataChange('dp', parseInt(e.target.value))} placeholder="Uang Muka (DP)" />
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Pasal Tambahan (Opsional)..." />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}