'use client';

/**
 * FILE: PajakTanahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Lunas PBB / Pajak
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Landmark, UserCircle2, Map, CalendarDays, Receipt, FileText, BadgeCheck, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface TaxData {
  city: string;
  date: string;
  
  wpName: string;
  wpAddress: string;
  wpNik: string;
  
  nop: string;
  taxYear: string;
  landArea: string;
  buildingArea: string;
  objLocation: string;
  
  taxAmount: number;
  paymentStatus: string;
  bankName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: TaxData = {
  city: 'SLEMAN',
  date: '', 
  
  wpName: 'BAMBANG SUDARSO',
  wpAddress: 'Jl. Kaliurang KM 10, Sardonoharjo, Ngaglik, Sleman',
  wpNik: '3404010101740001',
  
  nop: '34.04.050.001.012-0345.0',
  taxYear: '2025',
  landArea: '500',
  buildingArea: '150',
  objLocation: 'Desa Sardonoharjo, Ngaglik, Sleman',
  
  taxAmount: 1250000,
  paymentStatus: 'LUNAS / PAID',
  bankName: 'BPD DIY / Bank Mandiri'
};

// --- 3. KOMPONEN UTAMA ---
export default function PajakTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Perpajakan...</div>}>
      <TaxBuilder />
    </Suspense>
  );
}

function TaxBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<TaxData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof TaxData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal (Surat)' : 'Slip Bayar';

  const SuratKonten = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <div className="flex flex-col h-full">
              <div className="flex justify-between items-start border-b-4 border-double border-black pb-4 mb-8 shrink-0">
                 <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center border-2 border-slate-300 print:border-black print:bg-transparent">
                       <Landmark size={32} className="text-slate-400 print:text-black" />
                    </div>
                    <div className="font-sans">
                       <h2 className="font-black text-lg leading-tight uppercase text-slate-900">Pemerintah Kabupaten {data.city}</h2>
                       <p className="text-xs font-bold uppercase tracking-widest text-slate-500 print:text-black">Badan Pengelolaan Keuangan dan Aset Daerah</p>
                    </div>
                 </div>
                 <div className="text-right font-sans">
                    <div className="bg-emerald-600 text-white px-3 py-1 text-[10px] font-black rounded uppercase print:text-black print:border print:border-black print:bg-transparent">PBB-P2 LUNAS</div>
                    <p className="text-[10px] mt-1 font-mono">NOP: {data.nop.substring(0,10)}...</p>
                 </div>
              </div>

              <div className="text-center mb-8 shrink-0">
                 <h1 className="font-black text-lg uppercase underline decoration-2 underline-offset-4">SURAT KETERANGAN PELUNASAN PAJAK</h1>
                 <p className="text-xs mt-1 font-sans">Nomor: REG/PBB/{data.taxYear}/{(Math.random()*1000).toFixed(0)}</p>
              </div>

              <div className="space-y-6 flex-grow">
                 <p className="text-justify">Menerangkan bahwa Wajib Pajak di bawah ini telah melakukan pelunasan Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB-P2) sesuai data pada sistem kami:</p>
                 
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 print:bg-transparent print:border-black break-inside-avoid">
                    <div>
                        <h3 className="font-bold border-b border-slate-300 pb-1 text-xs uppercase text-slate-500 print:text-black font-sans mb-2">A. Identitas Wajib Pajak</h3>
                        <div className="grid grid-cols-[160px_10px_1fr] text-sm gap-y-1">
                           <span>Nama Wajib Pajak</span><span>:</span><span className="font-bold uppercase">{data.wpName}</span>
                           <span>Alamat WP</span><span>:</span><span>{data.wpAddress}</span>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-bold border-b border-slate-300 pb-1 text-xs uppercase text-slate-500 print:text-black font-sans mb-2">B. Objek Pajak</h3>
                        <div className="grid grid-cols-[160px_10px_1fr] text-sm font-mono gap-y-1">
                           <span>Nomor Objek (NOP)</span><span>:</span><span className="font-bold">{data.nop}</span>
                           <span className="font-serif">Lokasi Objek</span><span className="font-serif">:</span><span className="font-serif italic">{data.objLocation}</span>
                           <span className="font-serif">Tahun Pajak</span><span className="font-serif">:</span><span className="font-serif font-bold">{data.taxYear}</span>
                           <span className="font-serif">Luas Bumi/Bngn</span><span className="font-serif">:</span><span className="font-serif">{data.landArea} m² / {data.buildingArea} m²</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold border-b border-slate-300 pb-1 text-xs uppercase text-slate-500 print:text-black font-sans mb-2">C. Status Pembayaran</h3>
                        <div className="grid grid-cols-[160px_10px_1fr] text-sm gap-y-1">
                           <span>Total Bayar</span><span>:</span><span className="font-bold">{formatRupiah(data.taxAmount)}</span>
                           <span>Status</span><span>:</span><span className="font-black text-emerald-700 print:text-black uppercase">{data.paymentStatus}</span>
                        </div>
                    </div>
                 </div>

                 <p className="text-justify text-sm">Surat keterangan ini diterbitkan secara sistem untuk dipergunakan sebagai bukti pemenuhan kewajiban perpajakan atau kelengkapan administrasi lainnya yang sah.</p>
              </div>

              <div className="mt-12 flex justify-between items-end border-t border-slate-100 pt-8 print:border-black break-inside-avoid">
                 <div className="text-center w-48 font-sans">
                    <div className="p-2 border-2 border-dashed border-slate-200 rounded mb-2 print:border-black">
                       <BadgeCheck size={32} className="mx-auto text-slate-300 print:text-black" />
                       <p className="text-[8px] text-slate-400 uppercase font-bold">Verified Document</p>
                    </div>
                 </div>
                 <div className="text-center w-64 font-sans">
                    <p className="text-xs mb-14">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="font-bold underline uppercase text-sm leading-none">Kepala BPKAD</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Kabupaten {data.city}</p>
                 </div>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="flex flex-col h-full font-sans text-sm p-4 border-4 border-double border-slate-200 print:border-black">
              <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 mb-6 print:border-black shrink-0">
                 <h2 className="font-black text-xl uppercase tracking-tighter">BUKTI PEMBAYARAN PBB-P2</h2>
                 <p className="text-[10px] font-bold text-slate-500 uppercase">{data.bankName}</p>
              </div>

              <div className="space-y-4 flex-grow">
                 <div className="grid grid-cols-[120px_10px_1fr] gap-y-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Nomor NOP</span><span>:</span><span className="font-mono font-bold text-lg">{data.nop}</span>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Tahun Pajak</span><span>:</span><span className="font-bold">{data.taxYear}</span>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Nama WP</span><span>:</span><span className="font-bold uppercase">{data.wpName}</span>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Lokasi</span><span>:</span><span className="text-xs">{data.objLocation}</span>
                 </div>
                 
                 <div className="border-t border-dashed border-slate-300 my-6 print:border-black"></div>
                 
                 <div className="space-y-1">
                    <div className="flex justify-between"><span>Tagihan Pokok</span><span>{formatRupiah(data.taxAmount)}</span></div>
                    <div className="flex justify-between"><span>Denda / Admin</span><span>Rp 0</span></div>
                    <div className="flex justify-between font-black text-xl border-t-2 border-slate-900 pt-2 mt-2">
                       <span>TOTAL BAYAR</span>
                       <span>{formatRupiah(data.taxAmount)}</span>
                    </div>
                 </div>

                 <div className="mt-16 text-center">
                    <div className="inline-block border-4 border-emerald-600 text-emerald-600 px-8 py-2 font-black text-3xl uppercase rotate-[-5deg] rounded-lg opacity-80 print:text-black print:border-black">LUNAS</div>
                 </div>
              </div>

              <div className="text-center text-[10px] mt-auto pt-6 border-t border-slate-100 print:border-black italic text-slate-400">
                 <p>Dokumen ini adalah struk bukti pembayaran yang sah sesuai data transaksi perbankan.</p>
                 <p className="font-mono mt-1 uppercase">{new Date().toLocaleString('id-ID')}</p>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Receipt size={16} className="text-emerald-500" /> <span>Tax Payment Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Surat {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Slip {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Wajib Pajak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.wpName} onChange={e => handleDataChange('wpName', e.target.value)} placeholder="Nama Lengkap" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wpAddress} onChange={e => handleDataChange('wpAddress', e.target.value)} placeholder="Alamat WP" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Map size={14}/> Objek Pajak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.nop} onChange={e => handleDataChange('nop', e.target.value)} placeholder="NOP" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Bumi" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bangunan" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.objLocation} onChange={e => handleDataChange('objLocation', e.target.value)} placeholder="Lokasi Objek" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Receipt size={14}/> Pembayaran</h3>
                 <input type="number" className="w-full p-2 border rounded-lg text-xs font-black text-amber-600 focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxAmount} onChange={e => handleDataChange('taxAmount', parseInt(e.target.value) || 0)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none uppercase font-bold" value={data.paymentStatus} onChange={e => handleDataChange('paymentStatus', e.target.value)} />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <SuratKonten />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><SuratKonten /></div></div>
    </div>
  );
}