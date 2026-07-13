'use client';

/**
 * FILE: LabelPengirimanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Label Pengiriman / Resi (Ukuran A6)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  Package, Truck, AlertTriangle, Video, MapPin, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LabelData {
  courier: string;
  service: string;
  resi: string;
  weight: string;
  date: string;
  
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  
  content: string;
  note: string;
  
  isCod: boolean;
  codAmount: number;
  isFragile: boolean;
  isUnboxing: boolean;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LabelData = {
  courier: 'JNE', 
  service: 'REG (Reguler)',
  resi: 'JP1234567890',
  weight: '1 Kg',
  date: '', 
  
  senderName: 'Tokoku Gadget Official',
  senderPhone: '0812-3456-7890',
  senderAddress: 'Mangga Dua Mall Lt. 3 No. 45, Jakarta Pusat',
  
  receiverName: 'BUDI SANTOSO',
  receiverPhone: '0813-9999-8888',
  receiverAddress: 'Jl. Merdeka No. 10, RT 01 RW 02, Kec. Sukmajaya, Kota Depok, Jawa Barat, 16412',
  
  content: '1x HP Android, 1x Casing, 1x Charger',
  note: 'Warna Hitam, Jangan dibanting!',
  
  isCod: false,
  codAmount: 150000,
  isFragile: false,
  isUnboxing: true
};

// --- 3. KOMPONEN UTAMA ---
export default function LabelPengirimanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Logistik...</div>}>
      <ShippingLabelBuilder />
    </Suspense>
  );
}

function ShippingLabelBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LabelData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleDataChange = (field: keyof LabelData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'olshop' | 'pribadi' | 'dokumen') => {
    if (type === 'olshop') {
      setData(prev => ({
        ...prev,
        senderName: 'Fashion Store ID',
        content: 'Baju Kaos Pria (L), Celana Jeans (32)',
        isUnboxing: true,
        isFragile: false
      }));
    } else if (type === 'pribadi') {
      setData(prev => ({
        ...prev,
        senderName: 'Agus (Personal)',
        content: 'Oleh-oleh Makanan Kering',
        isUnboxing: false,
        isFragile: true,
        note: 'Makanan, jangan ditumpuk berat'
      }));
    } else if (type === 'dokumen') {
      setData(prev => ({
        ...prev,
        senderName: 'HRD PT. Maju Mundur',
        content: 'Dokumen Kontrak Asli',
        isUnboxing: false,
        isFragile: false,
        note: 'DOKUMEN PENTING - JANGAN DILIPAT'
      }));
    }
  };

  const activeTemplateName = templateId === 1 ? 'Standard Marketplace' : 'Warning / Fragile';

  // --- KOMPONEN ISI LABEL ---
  const LabelContent = () => (
    <div className={`bg-white shadow-2xl w-[105mm] min-h-[148mm] flex flex-col text-[#1e293b] box-border relative transition-all border-2 border-black print:absolute print:top-0 print:left-0 print:w-[105mm] print:h-[148mm] print:overflow-hidden print:shadow-none print:border-none print:m-0 mx-auto`}>
      
      {templateId === 1 && (
        <div className="font-sans text-xs h-full flex flex-col">
            <div className="flex border-b-2 border-black shrink-0">
              <div className="w-[40%] border-r-2 border-black p-3 flex flex-col justify-center items-center">
                  <h2 className="text-xl font-black uppercase italic tracking-tighter leading-none">{data.courier}</h2>
                  <div className="text-[10px] font-bold mt-2 bg-black text-white px-2 py-0.5 rounded print:text-black print:border print:border-black print:bg-transparent">{data.service}</div>
              </div>
              <div className="w-[60%] p-2 flex flex-col justify-center items-center">
                  <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_4px)] mb-1"></div>
                  <div className="font-mono text-sm font-bold tracking-widest">{data.resi}</div>
              </div>
            </div>

            {data.isCod ? (
              <div className="bg-black text-white p-2 text-center border-b-2 border-black shrink-0 print:text-black print:bg-transparent">
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-80 print:opacity-100">COD (Bayar di Tempat)</div>
                  <div className="text-2xl font-black leading-none mt-1">{formatRupiah(data.codAmount)}</div>
              </div>
            ) : (
              <div className="bg-slate-50 p-1 text-center border-b-2 border-black text-[9px] font-bold text-slate-400 uppercase shrink-0 print:text-black">LUNAS (NON-COD)</div>
            )}

            <div className="p-4 flex-grow overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                  <div className="text-[9px] font-bold bg-black text-white px-2 py-0.5 rounded uppercase print:text-black print:border print:border-black print:bg-transparent">Penerima</div>
                  <div className="text-[10px] text-slate-400 font-bold print:text-black">{data.weight}</div>
              </div>
              <div className="text-xl font-black uppercase leading-tight mb-1">{data.receiverName}</div>
              <div className="text-sm font-black mb-2">{data.receiverPhone}</div>
              <div className="text-[11pt] leading-snug font-medium text-slate-800 print:text-black">{data.receiverAddress}</div>
            </div>

            <div className="p-3 border-t-2 border-dashed border-black bg-slate-50 shrink-0 print:bg-transparent">
              <div className="text-[9px] font-bold text-slate-400 uppercase mb-1 print:text-black">Pengirim:</div>
              <div className="flex justify-between items-start">
                  <div className="w-[65%]">
                    <div className="font-bold uppercase text-[10px] leading-tight">{data.senderName}</div>
                    <div className="text-[9px] text-slate-500 print:text-black mt-0.5">{data.senderAddress}</div>
                  </div>
                  <div className="font-bold text-[10px]">{data.senderPhone}</div>
              </div>
            </div>

            <div className="p-3 border-t-2 border-black text-[9px] shrink-0">
              <div className="flex gap-1 mb-1">
                  <span className="font-bold uppercase text-slate-400">Isi:</span>
                  <span className="font-bold">{data.content}</span>
              </div>
              {data.note && <div className="italic text-slate-500 print:text-black font-medium">Note: {data.note}</div>}
            </div>

            {(data.isFragile || data.isUnboxing) && (
              <div className="flex border-t-2 border-black shrink-0 font-bold">
                  {data.isFragile && (
                    <div className="flex-1 bg-red-600 text-white p-2 flex items-center justify-center gap-2 print:bg-transparent print:text-black print:border-r print:border-black">
                        <AlertTriangle size={16} /> <span className="text-xs uppercase font-black">Fragile</span>
                    </div>
                  )}
                  {data.isUnboxing && (
                    <div className="flex-1 bg-blue-600 text-white p-2 flex items-center justify-center gap-2 print:bg-transparent print:text-black">
                        <Video size={16} /> <span className="text-[10px] uppercase font-black">Video Unboxing</span>
                    </div>
                  )}
              </div>
            )}
        </div>
      )}

      {templateId === 2 && (
        <div className="font-sans text-xs h-full flex flex-col bg-white">
            <div className="bg-red-600 text-white text-center p-3 border-b-2 border-black shrink-0 print:bg-transparent print:text-black print:border-b-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">FRAGILE</h2>
              <div className="text-[10px] font-black mt-1 uppercase tracking-widest">Jangan Dibanting / Pecah Belah</div>
            </div>
            <div className="flex border-b-2 border-black p-3 justify-between items-center bg-slate-50 shrink-0 print:bg-transparent">
              <div className="font-black text-2xl italic tracking-tighter">{data.courier}</div>
              <div className="text-right">
                  <div className="font-mono font-bold text-sm tracking-tighter">{data.resi}</div>
                  <div className="text-[10px] font-bold text-slate-400 print:text-black uppercase">{data.service} • {data.weight}</div>
              </div>
            </div>
            <div className="p-5 flex-grow overflow-hidden">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 print:text-black">Penerima:</div>
              <div className="text-2xl font-black uppercase leading-none mb-2 tracking-tighter">{data.receiverName}</div>
              <div className="font-mono text-sm font-bold bg-yellow-300 inline-block px-2 mb-4 print:bg-transparent print:border print:border-black">{data.receiverPhone}</div>
              <div className="text-[12pt] border-l-4 border-red-600 pl-4 py-1 font-medium leading-snug print:border-black">{data.receiverAddress}</div>
            </div>
            <div className="px-5 py-3 border-t border-dashed border-slate-300 shrink-0 print:border-black">
              <div className="text-[9px] font-bold text-slate-400 uppercase print:text-black">Konten Paket:</div>
              <div className="font-bold text-xs mt-1">{data.content}</div>
            </div>
            <div className="p-4 bg-black text-white text-xs flex justify-between items-center shrink-0 print:bg-transparent print:text-black print:border-t-2 print:border-black font-bold">
              <div className="uppercase tracking-tight"><span className="opacity-60 print:opacity-100 mr-2 font-normal">Dari:</span>{data.senderName}</div>
              <div className="font-mono">{data.senderPhone}</div>
            </div>
        </div>
      )}
    </div>
  );

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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Package size={16} className="text-blue-400" /> <span className="uppercase tracking-tighter">Shipping Label Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {templateId === 1 ? 'Marketplace' : 'Fragile'} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Marketplace Style {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Fragile Warning {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Label</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('olshop')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Olshop</button>
                <button onClick={() => applyPreset('pribadi')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Pribadi</button>
                <button onClick={() => applyPreset('dokumen')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Dokumen</button>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Tujuan (Penerima)</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverPhone} onChange={e => handleDataChange('receiverPhone', e.target.value)} placeholder="No. HP" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Detail Ekspedisi</h3>
                <div className="grid grid-cols-2 gap-2">
                  <select className="w-full p-2 border rounded-lg text-xs font-bold" value={data.courier} onChange={e => handleDataChange('courier', e.target.value)}><option value="JNE">JNE</option><option value="J&T">J&T</option><option value="SiCepat">SiCepat</option><option value="Shopee Xpress">Shopee Xpress</option></select>
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.service} onChange={e => handleDataChange('service', e.target.value)} placeholder="Layanan" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs font-mono uppercase" value={data.resi} onChange={e => handleDataChange('resi', e.target.value)} placeholder="No Resi" />
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.weight} onChange={e => handleDataChange('weight', e.target.value)} placeholder="Berat" />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Opsi Tambahan</h3>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 border rounded-lg text-[10px] font-bold cursor-pointer hover:bg-slate-50"><input type="checkbox" checked={data.isCod} onChange={e => handleDataChange('isCod', e.target.checked)} /> COD</label>
                  <label className="flex items-center gap-2 p-2 border rounded-lg text-[10px] font-bold cursor-pointer hover:bg-slate-50"><input type="checkbox" checked={data.isFragile} onChange={e => handleDataChange('isFragile', e.target.checked)} /> FRAGILE</label>
                </div>
                {data.isCod && <input type="number" className="w-full p-2 border rounded-lg text-xs font-black text-emerald-600 bg-emerald-50" value={data.codAmount} onChange={e => handleDataChange('codAmount', parseInt(e.target.value))} placeholder="Nominal COD" />}
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none" value={data.content} onChange={e => handleDataChange('content', e.target.value)} placeholder="Isi Paket" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.50] sm:scale-[0.70] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-100mm] sm:mb-[-60mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <LabelContent />
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

      <div id="print-only-root" className="hidden print:h-auto print:static"><LabelContent /></div>
    </div>
  );
}