'use client';

/**
 * FILE: JualBeliKendaraanPage.tsx
 * STATUS: FIXED PRINT LAYOUT
 * DESC: Generator Surat Jual Beli Kendaraan (Mobil/Motor)
 * FEATURES:
 * - Print-safe Container (Absolute Positioning)
 * - Dual Template (Legal Formal & Kwitansi)
 * - Auto Date & Presets
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Car, 
  Bike, Users, FileCheck, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SaleData {
  day: string;
  date: string;
  city: string;
  
  // Penjual
  p1Name: string;
  p1Nik: string;
  p1Job: string;
  p1Address: string;

  // Pembeli
  p2Name: string;
  p2Nik: string;
  p2Job: string;
  p2Address: string;

  // Kendaraan
  brand: string;
  type: string;
  year: string;
  color: string;
  nopol: string;
  frameNo: string;
  engineNo: string;
  bpkbNo: string;
  
  // Transaksi
  price: number;
  priceText: string;
  paymentMethod: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SaleData = {
  day: 'Senin',
  date: '', 
  city: 'JAKARTA SELATAN',
  
  p1Name: 'AGUS SETIAWAN',
  p1Nik: '3174010101850001',
  p1Job: 'Karyawan Swasta',
  p1Address: 'Jl. Fatmawati No. 10, Cilandak, Jakarta Selatan',
  
  p2Name: 'DONI PRATAMA',
  p2Nik: '3674010101900002',
  p2Job: 'Wiraswasta',
  p2Address: 'Jl. Bintaro Utama Sektor 5, Tangerang Selatan',
  
  brand: 'Toyota',
  type: 'Avanza Veloz 1.5 AT',
  year: '2019',
  color: 'Putih Metalik',
  nopol: 'B 1234 XXX',
  frameNo: 'MHF1234567890',
  engineNo: '1NR-FE-123456',
  bpkbNo: 'N-12345678',
  
  price: 185000000,
  priceText: 'Seratus Delapan Puluh Lima Juta Rupiah',
  paymentMethod: 'Transfer BCA a.n Agus Setiawan',
  
  witness1: 'Iwan (Teman Penjual)',
  witness2: 'Santi (Istri Pembeli)'
};

export default function JualBeliKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Transaksi...</div>}>
      <VehicleSaleBuilder />
    </Suspense>
  );
}

function VehicleSaleBuilder() {
  // --- STATE ---
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

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleDataChange = (field: keyof SaleData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };
  
  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'motor' | 'mobil') => {
    if (type === 'motor') {
      setData(prev => ({
        ...prev,
        brand: 'Honda',
        type: 'Vario 150 CBS ISS',
        year: '2021',
        color: 'Hitam Doff',
        nopol: 'B 4567 TZY',
        price: 18500000,
        priceText: 'Delapan Belas Juta Lima Ratus Ribu Rupiah'
      }));
    } else if (type === 'mobil') {
      setData(prev => ({
        ...prev,
        brand: 'Honda',
        type: 'Brio Satya E CVT',
        year: '2020',
        color: 'Kuning (Carnival Yellow)',
        nopol: 'D 1888 AA',
        price: 145000000,
        priceText: 'Seratus Empat Puluh Lima Juta Rupiah'
      }));
    }
  }

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Legal Formal (1 Halaman)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Kwitansi Besar
        </button>
    </div>
  );
  
  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Kwitansi Besar';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding & Dimensions
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-tight text-[10pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* TEMPLATE 1: LEGAL FORMAL */}
        {templateId === 1 && (
            <>
                <div className="text-center mb-6 border-b-2 border-black pb-2 shrink-0">
                   <h1 className="font-black text-lg uppercase underline tracking-wide text-black">SURAT PERJANJIAN JUAL BELI KENDARAAN</h1>
                </div>

                <div className="flex-grow">
                    <p className="mb-4 text-justify text-black leading-relaxed">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

                    <div className="ml-2 mb-4">
                       <div className="font-bold underline text-xs uppercase mb-1 text-black">I. PIHAK PERTAMA (PENJUAL)</div>
                       <table className="w-full leading-snug">
                          <tbody>
                             <tr><td className="w-24 font-bold text-black align-top">Nama</td><td className="w-3 text-black align-top">:</td><td className="font-bold uppercase text-black align-top">{data.p1Name}</td></tr>
                             <tr><td className="text-black align-top">NIK</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p1Nik}</td></tr>
                             <tr><td className="text-black align-top">Pekerjaan</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p1Job}</td></tr>
                             <tr><td className="text-black align-top">Alamat</td><td className="text-black align-top">:</td><td className="align-top text-black">{data.p1Address}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <div className="ml-2 mb-6">
                       <div className="font-bold underline text-xs uppercase mb-1 text-black">II. PIHAK KEDUA (PEMBELI)</div>
                       <table className="w-full leading-snug">
                          <tbody>
                             <tr><td className="w-24 font-bold text-black align-top">Nama</td><td className="w-3 text-black align-top">:</td><td className="font-bold uppercase text-black align-top">{data.p2Name}</td></tr>
                             <tr><td className="text-black align-top">NIK</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p2Nik}</td></tr>
                             <tr><td className="text-black align-top">Pekerjaan</td><td className="text-black align-top">:</td><td className="text-black align-top">{data.p2Job}</td></tr>
                             <tr><td className="text-black align-top">Alamat</td><td className="text-black align-top">:</td><td className="align-top text-black">{data.p2Address}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <p className="mb-4 text-black text-justify">Kedua belah pihak sepakat melakukan transaksi jual beli kendaraan dengan spesifikasi sebagai berikut:</p>

                    <div className="mb-6 border border-black p-3 bg-slate-50 print:bg-transparent">
                       <table className="w-full leading-snug">
                          <tbody>
                             <tr><td className="w-24 font-bold text-black">Merk / Type</td><td className="w-3 text-black">:</td><td className="text-black">{data.brand} / {data.type}</td><td className="w-20 font-bold text-black pl-2">No. Polisi</td><td className="w-3 text-black">:</td><td className="font-bold text-black">{data.nopol}</td></tr>
                             <tr><td className="font-bold text-black">Thn/Warna</td><td className="text-black">:</td><td className="text-black">{data.year} / {data.color}</td><td className="font-bold text-black pl-2">No. Rangka</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.frameNo}</td></tr>
                             <tr><td className="font-bold text-black">No. BPKB</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.bpkbNo}</td><td className="font-bold text-black pl-2">No. Mesin</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.engineNo}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <div className="space-y-4 text-justify">
                       <div>
                          <div className="font-bold underline mb-1 text-black text-xs uppercase">PASAL 1: HARGA & PEMBAYARAN</div>
                          <p className="text-black leading-relaxed">Disepakati harga kendaraan tersebut sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{data.priceText}</em>) yang dibayarkan tunai/transfer oleh Pihak Kedua kepada Pihak Pertama secara <strong>{data.paymentMethod}</strong>.</p>
                       </div>
                       <div>
                          <div className="font-bold underline mb-1 text-black text-xs uppercase">PASAL 2: PENYERAHAN & JAMINAN</div>
                          <p className="text-black leading-relaxed">Kendaraan diserahkan dalam kondisi "as is" (apa adanya). Pihak Pertama menjamin bahwa kendaraan tersebut adalah milik sah, tidak dalam sengketa, dan bebas dari sitaan pihak manapun.</p>
                       </div>
                       <div>
                          <div className="font-bold underline mb-1 text-black text-xs uppercase">PASAL 3: BALIK NAMA & PAJAK</div>
                          <p className="text-black leading-relaxed">Segala biaya balik nama menjadi tanggung jawab Pihak Kedua. Pajak/E-Tilang yang terjadi <strong>SEBELUM</strong> tanggal transaksi ini adalah tanggung jawab Pihak Pertama.</p>
                       </div>
                    </div>

                    <p className="mt-6 text-justify text-[10pt] italic text-black">Demikian surat perjanjian ini dibuat rangkap dua bermaterai cukup dan memiliki kekuatan hukum yang sama.</p>
                </div>

                <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between text-center mb-8">
                       <div className="w-48">
                          <p className="mb-20 font-bold text-black text-xs uppercase tracking-widest">PIHAK KEDUA (Pembeli)</p>
                          <p className="font-bold underline uppercase text-black">{data.p2Name}</p>
                       </div>
                       <div className="w-48">
                          <p className="mb-4 font-bold text-black text-xs uppercase tracking-widest">PIHAK PERTAMA (Penjual)</p>
                          <div className="border border-black w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-black bg-slate-50 print:bg-transparent">MATERAI 10.000</div>
                          <p className="font-bold underline uppercase text-black">{data.p1Name}</p>
                       </div>
                    </div>

                    <div className="text-center text-xs">
                       <p className="mb-4 font-bold underline text-black">SAKSI-SAKSI</p>
                       <div className="flex justify-center gap-16">
                          <div className="text-center w-40">
                             <div className="border-b border-black text-black pb-1 mb-1">{data.witness1}</div>
                             <div className="text-[8pt] text-black">( Saksi Pihak I )</div>
                          </div>
                          <div className="text-center w-40">
                             <div className="border-b border-black text-black pb-1 mb-1">{data.witness2}</div>
                             <div className="text-[8pt] text-black">( Saksi Pihak II )</div>
                          </div>
                       </div>
                    </div>
                </div>
            </>
        )}

        {/* TEMPLATE 2: KWITANSI BESAR */}
        {templateId === 2 && (
            <div className="border-4 double border-black p-6 h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-wider text-black">BUKTI JUAL BELI</h1>
                            <div className="text-sm font-bold text-black uppercase tracking-[0.3em]">Kendaraan Bermotor</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-black uppercase font-bold">Tanggal Transaksi</div>
                            <div className="font-bold text-lg text-black">{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[100px_10px_1fr] gap-2 mb-6 text-sm">
                        <div className="font-bold text-black py-1">PENJUAL</div><div className="py-1 text-black">:</div><div className="font-bold uppercase py-1 border-b border-black text-black">{data.p1Name}</div>
                        <div className="text-black">Alamat</div><div className="text-black">:</div><div className="text-xs text-black">{data.p1Address}</div>
                        <div className="h-4 col-span-3"></div>
                        <div className="font-bold text-black py-1">PEMBELI</div><div className="py-1 text-black">:</div><div className="font-bold uppercase py-1 border-b border-black text-black">{data.p2Name}</div>
                        <div className="text-black">Alamat</div><div className="text-black">:</div><div className="text-xs text-black">{data.p2Address}</div>
                    </div>

                    <div className="bg-slate-50 print:bg-transparent p-6 rounded-xl mb-6 border border-black">
                        <h3 className="font-bold text-xs mb-3 border-b border-black pb-2 text-black uppercase tracking-widest">DATA KENDARAAN</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div className="flex justify-between"><span className="text-black">Merk/Type</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.brand} {data.type}</div>
                            <div className="flex justify-between"><span className="text-black">Thn/Warna</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.year} / {data.color}</div>
                            <div className="flex justify-between"><span className="text-black">No. Polisi</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.nopol}</div>
                            <div className="flex justify-between"><span className="text-black">No. Rangka</span><span className="text-black">:</span></div><div className="font-mono text-xs text-black">{data.frameNo}</div>
                            <div className="flex justify-between"><span className="text-black">No. Mesin</span><span className="text-black">:</span></div><div className="font-mono text-xs text-black">{data.engineNo}</div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="text-xs font-bold text-black uppercase tracking-widest mb-1">TOTAL HARGA</div>
                        <div className="text-3xl font-black text-black mb-2">{formatRupiah(data.price)}</div>
                        <div className="text-sm italic text-black bg-slate-50 print:bg-transparent p-2 border-l-4 border-black">"{data.priceText}"</div>
                    </div>
                </div>

                <div className="flex justify-between mt-auto pt-8 border-t-2 border-dashed border-black">
                    <div className="text-center w-40">
                        <div className="mb-24 text-xs font-bold uppercase tracking-wider text-black">Pembeli</div>
                        <div className="font-bold uppercase border-b border-black text-sm text-black">{data.p2Name}</div>
                    </div>
                    <div className="text-center w-40">
                        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-black">Penjual</div>
                        <div className="border border-black text-[8px] text-black h-16 flex items-center justify-center mb-2 mx-auto w-24 bg-slate-50 print:bg-transparent">Materai</div>
                        <div className="font-bold uppercase border-b border-black text-sm text-black">{data.p1Name}</div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* KUNCI PERBAIKAN: Padding Absolut saat Print */
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%;
            z-index: 9999; 
            background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Car size={16} className="text-emerald-500" /> <span>VEHICLE SALE BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Barang</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              {/* Quick Preset */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                   <Car size={14} className="text-emerald-600" />
                   <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-2">
                   <button onClick={() => applyPreset('mobil')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold flex items-center justify-center gap-1">
                      <Car size={12}/> Contoh Mobil
                   </button>
                   <button onClick={() => applyPreset('motor')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex items-center justify-center gap-1">
                      <Bike size={12}/> Contoh Motor
                   </button>
                </div>
              </div>

              {/* Para Pihak */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Users size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Data Pihak</h3>
                 </div>
                 <div className="p-4 space-y-6">
                    <div className="border-l-2 border-red-500 pl-3">
                       <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Penjual (Pihak 1)</h4>
                       <div className="space-y-2">
                          <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                          <div className="grid grid-cols-2 gap-2">
                             <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                             <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                          </div>
                          <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                       </div>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-3">
                       <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase">Pembeli (Pihak 2)</h4>
                       <div className="space-y-2">
                          <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                          <div className="grid grid-cols-2 gap-2">
                             <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                             <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                          </div>
                          <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Kendaraan & Harga */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <FileCheck size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Detail Kendaraan</h3>
                 </div>
                 <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.brand} onChange={e => handleDataChange('brand', e.target.value)} placeholder="Merk" />
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Tipe" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.year} onChange={e => handleDataChange('year', e.target.value)} placeholder="Tahun" />
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.color} onChange={e => handleDataChange('color', e.target.value)} placeholder="Warna" />
                    </div>
                    <input type="text" className="w-full p-2 border rounded text-sm font-bold bg-slate-50" value={data.nopol} onChange={e => handleDataChange('nopol', e.target.value)} placeholder="No Polisi" />
                    <div className="grid grid-cols-2 gap-3">
                       <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.frameNo} onChange={e => handleDataChange('frameNo', e.target.value)} placeholder="No Rangka" />
                       <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.engineNo} onChange={e => handleDataChange('engineNo', e.target.value)} placeholder="No Mesin" />
                    </div>
                    <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.bpkbNo} onChange={e => handleDataChange('bpkbNo', e.target.value)} placeholder="No BPKB" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Harga & Pembayaran</label>
                       <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} />
                       <div className="text-[10px] text-emerald-600 mt-1">{formatRupiah(data.price)}</div>
                    </div>
                    <textarea className="w-full p-2 border rounded text-xs h-12" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} placeholder="Terbilang" />
                    <input type="text" className="w-full p-2 border rounded text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} placeholder="Metode Bayar" />
                    <div className="grid grid-cols-2 gap-3">
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                       <input type="text" className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                    </div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                   <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA (HIDDEN) */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: 'auto' }} className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
