'use client';

/**
 * FILE: HilangKirimPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Pernyataan Kehilangan Paket / Barang
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, PackageX, Truck, CalendarDays, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LostData {
  city: string;
  date: string;
  docNo: string;
  
  // Data Ekspedisi & Barang
  courierName: string;
  awbNumber: string;
  itemName: string;
  itemValue: string;
  sendDate: string;
  
  // Data Pelapor
  declarantName: string;
  declarantNik: string;
  declarantPhone: string;
  declarantAddress: string;
  
  // Kronologi & Saksi
  chronology: string;
  witnessName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LostData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: 'SK-HILANG/BWC/I/2026',
  
  courierName: 'JNE Express / PT. Jalur Nugraha Ekakurir',
  awbNumber: '882100992233445',
  itemName: '1 Unit Handphone Samsung Galaxy S24 Ultra',
  itemValue: 'Rp 18.500.000,-',
  sendDate: '', // Diisi useEffect
  
  declarantName: 'BAGUS RAMADHAN',
  declarantNik: '5171010101990001',
  declarantPhone: '0812-3456-7890',
  declarantAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  chronology: 'Berdasarkan data tracking resmi, paket seharusnya tiba pada tanggal 30 Desember 2025. Namun, hingga saat surat ini dibuat, paket belum diterima. Pihak ekspedisi telah mengonfirmasi bahwa status paket dinyatakan hilang (Lost in Transit) di pusat sortir Bekasi.',
  
  witnessName: 'I MADE WIRA (Petugas Logistik)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function HilangKirimPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <LostPackageBuilder />
    </Suspense>
  );
}

function LostPackageBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LostData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pelapor' | 'paket' | 'kronologi'>('pelapor');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 10);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        sendDate: lastWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof LostData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 10);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0],
            sendDate: lastWeek.toISOString().split('T')[0]
        });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-8 border-b-2 border-black pb-4 break-inside-avoid">
            <h1 className="font-bold text-xl uppercase tracking-widest underline">SURAT PERNYATAAN KEHILANGAN BARANG</h1>
            <p className="text-sm mt-2">Nomor: {data.docNo}</p>
        </div>

        <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini:
        </p>

        {/* DATA PELAPOR */}
        <div className="mb-6 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.declarantName}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Identitas (NIK)</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.declarantNik}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor HP/Telepon</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.declarantPhone}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.declarantAddress}</div></div>
        </div>

        <p className="mb-4 text-justify">
            Dengan ini menyatakan dengan sesungguhnya bahwa saya telah mengalami kehilangan barang kiriman/paket yang dikirimkan melalui jasa ekspedisi. Adapun rincian barang dan pengiriman adalah sebagai berikut:
        </p>

        {/* DATA PAKET */}
        <div className="mb-6 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Perusahaan Ekspedisi</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.courierName}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Resi (AWB)</div><div className="w-4">:</div><div className="flex-1 font-bold underline font-mono">{data.awbNumber}</div></div>
            <div className="flex mb-1"><div className="w-40">Tanggal Pengiriman</div><div className="w-4">:</div><div className="flex-1">{formatDateSafe(data.sendDate)}</div></div>
            <div className="flex mb-1"><div className="w-40">Nama/Isi Barang</div><div className="w-4">:</div><div className="flex-1">{data.itemName}</div></div>
            <div className="flex mb-1"><div className="w-40">Estimasi Nilai/Harga</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.itemValue}</div></div>
        </div>

        {/* KRONOLOGI */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p className="font-bold mb-2">Kronologi / Keterangan Tambahan:</p>
            <p className="ml-8">{data.chronology}</p>
        </div>

        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Surat pernyataan ini dibuat sebagai syarat kelengkapan administrasi untuk mengajukan proses klaim ganti rugi (asuransi/investigasi) kepada pihak {data.courierName}. Saya bertanggung jawab penuh secara hukum apabila di kemudian hari terdapat keterangan palsu dalam pernyataan ini.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="break-inside-avoid">
            <div className="flex justify-between items-start text-center mb-8">
              <div className="w-[45%]">
                <p className="mb-2">Mengetahui / Saksi,</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.witnessName}</p>
              </div>
              <div className="w-[45%]">
                <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.declarantName}</p>
                <p className="text-sm">Pelapor / Pembuat Pernyataan</p>
              </div>
            </div>
        </div>
      </Kertas>
    );
  };

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
              <ArrowLeftCircle size={20} className="text-orange-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Laporan Hilang Paket</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-orange-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pelapor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pelapor' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pelapor</button>
                <button onClick={() => setActiveTab('paket')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'paket' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Ekspedisi</button>
                <button onClick={() => setActiveTab('kronologi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kronologi' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Kronologi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pelapor' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Kop Surat
                    </h3>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Referensi / Dokumen</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Laporan</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Pelapor (Pemilik Barang)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.declarantName} onChange={e => handleDataChange('declarantName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.declarantNik} onChange={e => handleDataChange('declarantNik', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Handphone (Aktif)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.declarantPhone} onChange={e => handleDataChange('declarantPhone', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.declarantAddress} onChange={e => handleDataChange('declarantAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'paket' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Truck size={14} className="text-amber-600"/> Data Ekspedisi & Barang
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kurir / Ekspedisi</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} placeholder="Contoh: JNE / Sicepat" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Resi / AWB</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold text-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dikirim</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.sendDate} onChange={e => handleDataChange('sendDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama / Jenis Barang</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.itemName} onChange={e => handleDataChange('itemName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Estimasi Nilai Barang (Rp)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.itemValue} onChange={e => handleDataChange('itemValue', e.target.value)} />
                        </div>
                    </div>
                 </div>
              )}

              {activeTab === 'kronologi' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <PackageX size={14} className="text-rose-600"/> Kronologi Hilang
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ceritakan Detail Kejadian</label>
                          <textarea className="w-full bg-rose-50 p-3 border border-rose-200 rounded-xl text-sm h-40 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Tuliskan kronologi berdasarkan tracking atau info dari kurir..." />
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <UserCircle2 size={14} className="text-slate-600"/> Saksi / Mengetahui
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi / CS Ekspedisi</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} />
                      </div>
                   </div>
                 </>
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
              <PrintWrapper documentName="Kehilangan_Barang" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
