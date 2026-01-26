'use client';

/**
 * FILE: PajakTanahPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Lunas PBB / Pajak
 * FEATURES:
 * - Dual Template (Formal Government Letter vs Payment Slip)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Landmark, UserCircle2, Map, CalendarDays, Receipt, FileText, BadgeCheck, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  date: '', // Diisi useEffect
  
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Perpajakan...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formal (Surat)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Slip Bayar
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal (Surat)' : 'Slip Bayar';

  // --- KOMPONEN ISI SURAT ---
  const SuratKonten = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* TEMPLATE 1: FORMAL */}
      {templateId === 1 && (
        <div className="flex flex-col">
            <div className="flex justify-between items-start border-b-4 border-double border-black pb-4 mb-8 shrink-0">
               <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center border-2 border-slate-300 print:border-black print:bg-transparent">
                     <Landmark size={32} className="text-slate-400 print:text-black" />
                  </div>
                  <div>
                     <h2 className="font-black text-lg leading-tight uppercase text-slate-900">Pemerintah Kabupaten {data.city}</h2>
                     <p className="text-xs font-bold uppercase tracking-widest text-slate-500 print:text-black">Badan Pengelolaan Keuangan dan Aset Daerah</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="bg-emerald-600 text-white px-3 py-1 text-[10px] font-black rounded uppercase print:text-black print:border print:border-black print:bg-transparent">PBB-P2 LUNAS</div>
                  <p className="text-[10px] mt-1 font-mono">ID: {data.nop.replace(/\D/g,'')}</p>
               </div>
            </div>

            <div className="text-center mb-8 shrink-0">
               <h1 className="font-black text-lg uppercase underline decoration-2 underline-offset-4">SURAT KETERANGAN PELUNASAN PAJAK</h1>
               <p className="text-xs mt-1">Nomor: REG/PBB/{data.taxYear}/{(Math.random()*1000).toFixed(0)}</p>
            </div>

            <div className="space-y-6 flex-grow">
               <p className="text-justify">Yang bertanda tangan di bawah ini menerangkan bahwa Wajib Pajak tersebut di bawah ini telah melakukan pelunasan Pajak Bumi dan Bangunan (PBB-P2) sebagai berikut:</p>
               
               <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 print:bg-transparent print:border-black">
                  <h3 className="font-bold border-b border-slate-300 pb-1 text-xs uppercase text-slate-500 print:text-black print:border-black">A. Identitas Wajib Pajak</h3>
                  <div className="grid grid-cols-[160px_10px_1fr] text-sm gap-y-1">
                     <span>Nama Wajib Pajak</span><span>:</span><span className="font-bold uppercase">{data.wpName}</span>
                     <span>Alamat WP</span><span>:</span><span>{data.wpAddress}</span>
                  </div>
                  
                  <h3 className="font-bold border-b border-slate-300 pb-1 pt-3 text-xs uppercase text-slate-500 print:text-black print:border-black">B. Objek Pajak</h3>
                  <div className="grid grid-cols-[160px_10px_1fr] text-sm font-mono gap-y-1">
                     <span>Nomor Objek Pajak</span><span>:</span><span className="font-bold">{data.nop}</span>
                     <span>Lokasi Objek</span><span>:</span><span className="font-serif italic">{data.objLocation}</span>
                     <span>Tahun Pajak</span><span>:</span><span className="font-bold font-serif">{data.taxYear}</span>
                     <span>Luas Tnh / Bngn</span><span>:</span><span className="font-serif">{data.landArea} m² / {data.buildingArea} m²</span>
                  </div>

                  <h3 className="font-bold border-b border-slate-300 pb-1 pt-3 text-xs uppercase text-slate-500 print:text-black print:border-black">C. Status Pembayaran</h3>
                  <div className="grid grid-cols-[160px_10px_1fr] text-sm gap-y-1">
                     <span>Jumlah Bayar</span><span>:</span><span className="font-bold">{formatRupiah(data.taxAmount)}</span>
                     <span>Status</span><span>:</span><span className="font-black text-emerald-700 print:text-black">{data.paymentStatus}</span>
                  </div>
               </div>

               <p className="text-justify text-sm">Demikian Surat Keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagai kelengkapan administrasi pengurusan aset tanah/bangunan atau keperluan lainnya yang sah menurut hukum.</p>
            </div>

            <div className="mt-12 flex justify-between items-end border-t border-slate-100 pt-8 print:border-black" style={{ pageBreakInside: 'avoid' }}>
               <div className="text-center w-48">
                  <div className="p-2 border-2 border-dashed border-slate-300 rounded mb-2 print:border-black">
                     <BadgeCheck size={32} className="mx-auto text-slate-300 print:text-black" />
                     <p className="text-[8px] text-slate-400 uppercase print:text-black font-bold">E-Verification System</p>
                  </div>
               </div>
               <div className="text-center w-64">
                  <p className="text-xs mb-14">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                  <p className="font-bold underline uppercase text-sm leading-none">Kepala BPKAD</p>
                  <p className="text-[10px] text-slate-500 mt-1 print:text-black">Kabupaten {data.city}</p>
               </div>
            </div>
        </div>
      )}

      {/* TEMPLATE 2: SLIP BUKTI BAYAR */}
      {templateId === 2 && (
        <div className="flex flex-col h-full font-sans text-sm">
            <div className="text-center border-b-2 border-dashed border-slate-400 pb-4 mb-6 print:border-black shrink-0">
               <h2 className="font-bold text-xl uppercase">BUKTI PEMBAYARAN PBB</h2>
               <p className="text-xs">{data.bankName}</p>
            </div>

            <div className="space-y-4 flex-grow">
               <div className="grid grid-cols-[140px_10px_1fr]"><span>NOP</span><span>:</span><span className="font-mono font-bold">{data.nop}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Tahun Pajak</span><span>:</span><span className="font-bold">{data.taxYear}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama WP</span><span>:</span><span className="uppercase">{data.wpName}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Lokasi</span><span>:</span><span>{data.objLocation}</span></div>
               <div className="border-t border-dashed border-slate-300 my-4 print:border-black"></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Tagihan Pokok</span><span>:</span><span>{formatRupiah(data.taxAmount)}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Denda</span><span>:</span><span>Rp 0</span></div>
               <div className="grid grid-cols-[140px_10px_1fr] font-black text-lg mt-2"><span>TOTAL BAYAR</span><span>:</span><span>{formatRupiah(data.taxAmount)}</span></div>
               <div className="mt-10 text-center border-2 border-slate-800 p-2 w-32 mx-auto font-black text-xl uppercase rotate-[-10deg] opacity-80 print:text-black print:border-black">LUNAS</div>
            </div>

            <div className="text-center text-xs mt-auto pt-6 border-t border-slate-200 print:border-black shrink-0">
               <p>Simpan struk ini sebagai bukti pembayaran yang sah.</p>
               <p className="font-mono mt-1 italic opacity-60">{new Date().toLocaleString('id-ID')}</p>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* FORCE COLORS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
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
               <Receipt size={16} className="text-emerald-500" /> <span>TAX PAYMENT BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pajak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Wajib Pajak</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.wpName} onChange={e => handleDataChange('wpName', e.target.value)} placeholder="Nama WP" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.wpAddress} onChange={e => handleDataChange('wpAddress', e.target.value)} placeholder="Alamat WP" />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Map size={14}/> Objek Pajak</h3>
                 <input className="w-full p-2 border rounded text-xs font-mono font-bold" value={data.nop} onChange={e => handleDataChange('nop', e.target.value)} placeholder="Nomor NOP" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Tanah" />
                    <input className="w-full p-2 border rounded text-xs" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bangunan" />
                    <input className="w-full p-2 border rounded text-xs" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Tahun" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.objLocation} onChange={e => handleDataChange('objLocation', e.target.value)} placeholder="Lokasi Objek" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Receipt size={14}/> Pembayaran</h3>
                 <input type="number" className="w-full p-2 border rounded text-xs font-bold" value={data.taxAmount} onChange={e => handleDataChange('taxAmount', parseInt(e.target.value))} />
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600 uppercase" value={data.paymentStatus} onChange={e => handleDataChange('paymentStatus', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} placeholder="Nama Bank/Lembaga" />
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <div>
                       <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Kota Terbit</label>
                       <input className="w-full p-2 border rounded text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Tgl Terbit</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <SuratKonten />
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

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <SuratKonten />
         </div>
      </div>

    </div>
  );
}
