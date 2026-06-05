'use client';

/**
 * FILE: JualBeliKendaraanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Jual Beli Kendaraan (Legal Formal & Kwitansi)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import PrintWrapper from '@/components/PrintWrapper';
import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Car, 
  Bike, Users, FileCheck, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SaleData {
  day: string; date: string; city: string;
  p1Name: string; p1Nik: string; p1Job: string; p1Address: string;
  p2Name: string; p2Nik: string; p2Job: string; p2Address: string;
  brand: string; type: string; year: string; color: string; nopol: string;
  frameNo: string; engineNo: string; bpkbNo: string;
  price: number; priceText: string; paymentMethod: string;
  witness1: string; witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SaleData = {
  day: 'Senin', date: '', city: 'JAKARTA SELATAN',
  p1Name: 'AGUS SETIAWAN', p1Nik: '3174010101850001', p1Job: 'Karyawan Swasta', p1Address: 'Jl. Fatmawati No. 10, Cilandak, Jakarta Selatan',
  p2Name: 'DONI PRATAMA', p2Nik: '3674010101900002', p2Job: 'Wiraswasta', p2Address: 'Jl. Bintaro Utama Sektor 5, Tangerang Selatan',
  brand: 'Toyota', type: 'Avanza Veloz 1.5 AT', year: '2019', color: 'Putih Metalik', nopol: 'B 1234 ABC',
  frameNo: 'MHF1234567890', engineNo: '1NR-FE-123456', bpkbNo: 'N-12345678',
  price: 185000000, priceText: 'Seratus Delapan Puluh Lima Juta Rupiah', paymentMethod: 'Transfer BCA a.n Agus Setiawan',
  witness1: 'Iwan (Teman Penjual)', witness2: 'Santi (Istri Pembeli)'
};

export default function JualBeliKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Transaksi...</div>}>
      <VehicleSaleBuilder />
    </Suspense>
  );
}

function VehicleSaleBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SaleData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: keyof SaleData, val: any) => setData(prev => ({ ...prev, [field]: val }));
  
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'motor' | 'mobil') => {
    if (type === 'motor') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Vario 150 CBS ISS', year: '2021', color: 'Hitam Doff', nopol: 'B 4567 TZY', price: 18500000, priceText: 'Delapan Belas Juta Lima Ratus Ribu Rupiah' }));
    } else if (type === 'mobil') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Brio Satya E CVT', year: '2020', color: 'Kuning (Carnival Yellow)', nopol: 'D 1888 AA', price: 145000000, priceText: 'Seratus Empat Puluh Lima Juta Rupiah' }));
    }
  }

  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Kwitansi Besar';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="font-serif text-slate-900 leading-tight text-[10pt] text-justify w-full h-full bg-white">
          {templateId === 1 && (
              <div className="flex flex-col h-full w-full">
                  <div className="text-center mb-6 border-b-2 border-black pb-2 shrink-0">
                     <h1 className="font-black text-lg uppercase underline tracking-wide text-black">SURAT PERJANJIAN JUAL BELI KENDARAAN</h1>
                  </div>

                  <div className="flex-grow">
                      <p className="mb-4 text-black leading-relaxed">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

                      <div className="ml-2 mb-4 break-inside-avoid">
                         <div className="font-bold underline text-xs uppercase mb-1 text-black">I. PIHAK PERTAMA (PENJUAL)</div>
                         <table className="w-full leading-snug">
                            <tbody>
                               <tr><td className="w-24 py-0.5 text-black align-top font-bold">Nama</td><td className="w-3 text-black align-top">:</td><td className="font-bold uppercase text-black align-top">{data.p1Name}</td></tr>
                               <tr><td className="text-black align-top">NIK</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p1Nik}</td></tr>
                               <tr><td className="text-black align-top">Alamat</td><td className="text-black align-top">:</td><td className="align-top text-black">{data.p1Address}</td></tr>
                            </tbody>
                         </table>
                      </div>

                      <div className="ml-2 mb-6 break-inside-avoid">
                         <div className="font-bold underline text-xs uppercase mb-1 text-black">II. PIHAK KEDUA (PEMBELI)</div>
                         <table className="w-full leading-snug">
                            <tbody>
                               <tr><td className="w-24 font-bold text-black align-top">Nama</td><td className="w-3 text-black align-top">:</td><td className="font-bold uppercase text-black align-top">{data.p2Name}</td></tr>
                               <tr><td className="text-black align-top">NIK</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p2Nik}</td></tr>
                               <tr><td className="text-black align-top">Alamat</td><td className="text-black align-top">:</td><td className="align-top text-black">{data.p2Address}</td></tr>
                            </tbody>
                         </table>
                      </div>

                      <div className="mb-6 border border-black p-3 bg-slate-50 print:bg-transparent break-inside-avoid">
                         <table className="w-full leading-snug">
                            <tbody>
                               <tr><td className="w-24 font-bold text-black">Merk / Type</td><td className="w-3 text-black">:</td><td className="text-black">{data.brand} / {data.type}</td><td className="w-20 font-bold text-black pl-2">No. Polisi</td><td className="w-3 text-black">:</td><td className="font-bold text-black">{data.nopol}</td></tr>
                               <tr><td className="font-bold text-black">Thn/Warna</td><td className="text-black">:</td><td className="text-black">{data.year} / {data.color}</td><td className="font-bold text-black pl-2">No. Rangka</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.frameNo}</td></tr>
                               <tr><td className="font-bold text-black">No. BPKB</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.bpkbNo}</td><td className="font-bold text-black pl-2">No. Mesin</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.engineNo}</td></tr>
                            </tbody>
                         </table>
                      </div>

                      <div className="space-y-4">
                         <div className="break-inside-avoid">
                            <div className="font-bold underline mb-1 text-black text-xs uppercase">PASAL 1: HARGA & PEMBAYARAN</div>
                            <p className="text-black leading-relaxed">Disepakati harga kendaraan tersebut sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{data.priceText}</em>) secara <strong>{data.paymentMethod}</strong>.</p>
                         </div>
                         <div className="break-inside-avoid">
                            <div className="font-bold underline mb-1 text-black text-xs uppercase">PASAL 2: PENYERAHAN & JAMINAN</div>
                            <p className="text-black leading-relaxed">Penjual menjamin kendaraan tersebut adalah milik sah dan bebas dari segala tuntutan hukum atau sitaan pihak ketiga.</p>
                         </div>
                      </div>
                  </div>

                  <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
                      <div className="grid grid-cols-2 gap-8 text-center mb-10">
                         <div><p className="mb-20 font-bold text-xs uppercase tracking-widest">Pembeli</p><p className="font-bold underline uppercase">{data.p2Name}</p></div>
                         <div>
                           <p className="mb-4 font-bold text-xs uppercase tracking-widest">Penjual</p>
                           <div className="border border-black w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400">MATERAI</div>
                           <p className="font-bold underline uppercase">{data.p1Name}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-center text-[10pt]">
                         <div><p className="mb-14 font-bold text-slate-400">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
                         <div><p className="mb-14 font-bold text-slate-400">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
                      </div>
                  </div>
              </div>
          )}

          {templateId === 2 && (
              <div className="border-4 double border-black p-6 h-full flex flex-col w-full">
                  <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                      <div>
                          <h1 className="text-3xl font-black uppercase tracking-wider text-black">KWITANSI</h1>
                          <div className="text-sm font-bold text-black uppercase">Jual Beli Kendaraan</div>
                      </div>
                      <div className="text-right">
                          <div className="text-xs text-slate-400 uppercase font-bold">Tanggal</div>
                          <div className="font-bold text-black">{formatDateSafe(data.date)}</div>
                      </div>
                  </div>

                  <div className="grid grid-cols-[120px_10px_1fr] gap-y-3 mb-8 text-sm">
                      <div className="font-bold">SUDAH TERIMA DARI</div><div>:</div><div className="font-bold uppercase border-b border-black">{data.p2Name}</div>
                      <div className="font-bold">BANYAKNYA UANG</div><div>:</div><div className="italic bg-slate-50 p-1 border border-slate-200">{data.priceText}</div>
                      <div className="font-bold">UNTUK PEMBAYARAN</div><div>:</div><div className="uppercase">1 UNIT {data.brand} {data.type} ({data.nopol})</div>
                  </div>

                  <div className="bg-slate-50 p-4 border border-black mb-8 rounded-lg">
                      <div className="text-3xl font-black">{formatRupiah(data.price)}</div>
                  </div>

                  <div className="flex justify-between items-end mt-auto break-inside-avoid">
                      <div className="text-center w-40"><p className="mb-20 text-xs font-bold uppercase">Pembeli</p><p className="font-bold underline">{data.p2Name}</p></div>
                      <div className="text-center w-40">
                         <p className="mb-2 text-xs font-bold uppercase">Penjual</p>
                         <div className="border border-black text-[8px] h-16 flex items-center justify-center mb-2 mx-auto w-24">MATERAI</div>
                         <p className="font-bold underline uppercase">{data.p1Name}</p>
                      </div>
                  </div>
              </div>
          )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0mm; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          .print-table { width: 100%; border-collapse: collapse; }
          .print-header-space { height: 15mm; } 
          .print-footer-space { height: 15mm; } 
          .print-content-wrapper { padding: 0 15mm; width: 100%; box-sizing: border-box; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Car size={16} className="text-blue-400" /> <span className="uppercase tracking-tighter">Vehicle Sale Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Legal Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Kwitansi Besar {templateId === 2 && <Check size={14}/>}</button>
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
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-2 gap-2">
                <button onClick={() => applyPreset('mobil')} className="bg-white p-2 rounded text-[10px] font-bold shadow-sm flex items-center justify-center gap-1"><Car size={14}/> MOBIL</button>
                <button onClick={() => applyPreset('motor')} className="bg-white p-2 rounded text-[10px] font-bold shadow-sm flex items-center justify-center gap-1"><Bike size={14}/> MOTOR</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1">Data Penjual</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Penjual" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Penjual" />
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 pt-2">Data Pembeli</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Pembeli" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Pembeli" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Detail Kendaraan</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.brand} onChange={e => handleDataChange('brand', e.target.value)} placeholder="Merk" />
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Tipe" />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs font-mono font-bold uppercase" value={data.nopol} onChange={e => handleDataChange('nopol', e.target.value)} placeholder="No Polisi" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.frameNo} onChange={e => handleDataChange('frameNo', e.target.value)} placeholder="No Rangka" />
                  <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.engineNo} onChange={e => handleDataChange('engineNo', e.target.value)} placeholder="No Mesin" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Harga & Lokasi</h3>
                <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} placeholder="Harga" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                  <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col p-[20mm]">
                  <DocumentContent />
                </div>
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div className="print-header-space"></div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><DocumentContent /></div></td></tr></tbody>
            <tfoot><tr><td><div className="print-footer-space"></div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}