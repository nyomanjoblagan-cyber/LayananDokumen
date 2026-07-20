'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: label-pengiriman.tsx (B2B Logistics)
 * STATUS: PRODUCTION READY
 * DESC: Generator Label Pengiriman / Resi B2B (Ukuran A6/100x150mm)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, LayoutTemplate, 
  Package, Truck, Ship, Plane, MapPin, 
  ChevronDown, Check, Edit3, RotateCcw, 
  QrCode, ClipboardList, Briefcase,
  AlertOctagon, Scale, Ruler, FileText,
  Globe2, ShieldCheck, Zap
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface B2BLabelData {
  carrier: string;
  carrierMode: 'AIR' | 'SEA' | 'LAND';
  serviceType: string;
  trackingNumber: string;
  poNumber: string;
  incoterms: string;
  date: string;
  
  shipperCompany: string;
  shipperContact: string;
  shipperAddress: string;
  
  consigneeCompany: string;
  consigneeContact: string;
  consigneeAddress: string;
  
  description: string;
  handlingInstructions: string;
  
  packageCount: string;
  grossWeight: string;
  dimensions: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: B2BLabelData = {
  carrier: 'GLOBAL FREIGHT LOGISTICS', 
  carrierMode: 'AIR',
  serviceType: 'PRIORITY AIR FREIGHT',
  trackingNumber: 'AWB-882-9910-221',
  poNumber: 'PO-2026-X778',
  incoterms: 'DDP',
  date: '', 
  
  shipperCompany: 'PT. JAYA MANUFAKTUR INTERNASIONAL',
  shipperContact: 'Bpk. Ahmad (+62 812-5555-7777)',
  shipperAddress: 'Kawasan Industri Cikarang Blok C2, Bekasi, Jawa Barat, 17530, Indonesia',
  
  consigneeCompany: 'MECHATECH GMBH',
  consigneeContact: 'Mr. Klaus Weber (+49 30 123456)',
  consigneeAddress: 'Industriestraße 45, 10115 Berlin, Germany',
  
  description: 'Industrial Servo Motors (Model: SM-800)',
  handlingInstructions: 'DO NOT DOUBLE STACK. KEEP DRY.',
  
  packageCount: '2 Pallets',
  grossWeight: '850 KG',
  dimensions: '120x100x150 cm'
};

// --- 3. KOMPONEN UTAMA ---
export default function B2BLabelPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-950 text-emerald-400 font-mono tracking-widest">
        INITIALIZING B2B LOGISTICS SYSTEM...
      </div>
    }>
      <B2BShippingLabelBuilder />
    </Suspense>
  );
}

function B2BShippingLabelBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<B2BLabelData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'routing' | 'shipper' | 'consignee' | 'cargo'>('routing');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof B2BLabelData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset B2B document to default?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'air' | 'sea' | 'land') => {
    if (type === 'air') {
      setData(prev => ({ ...INITIAL_DATA, carrierMode: 'AIR', serviceType: 'PRIORITY AIR FREIGHT', trackingNumber: 'AWB-' + Math.floor(Math.random()*100000000), date: prev.date }));
    } else if (type === 'sea') {
      setData(prev => ({ ...INITIAL_DATA, carrierMode: 'SEA', carrier: 'OCEANIC SHIPPING LINE', serviceType: 'FCL (FULL CONTAINER LOAD)', trackingNumber: 'BL-OCN-' + Math.floor(Math.random()*1000000), packageCount: '1x 40ft HC', grossWeight: '18,500 KG', dimensions: 'Standard 40ft', date: prev.date }));
    } else if (type === 'land') {
      setData(prev => ({ ...INITIAL_DATA, carrierMode: 'LAND', carrier: 'TRANS-EURO TRUCKING', serviceType: 'FTL (FULL TRUCK LOAD)', trackingNumber: 'CMR-' + Math.floor(Math.random()*100000), packageCount: '24 Pallets', grossWeight: '22,000 KG', dimensions: 'Standard Trailer', date: prev.date }));
    }
  };

  const QRPattern = () => {
    // Deterministic 5x5 pattern for a fake QR
    const pattern = [1,1,0,1,1, 1,0,1,0,1, 0,1,1,1,0, 1,0,1,0,1, 1,1,0,1,1];
    return (
      <div className="w-16 h-16 border-2 border-black p-1 flex flex-wrap gap-[1px] bg-white print:border-black shrink-0">
        {pattern.map((p, i) => (
          <div key={i} className={`w-[calc(20%-0.8px)] h-[calc(20%-0.8px)] ${p ? 'bg-black' : 'bg-transparent'}`} />
        ))}
      </div>
    );
  };

  const BarcodeStrips = () => (
    <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_5px,black_5px,black_8px,white_8px,white_10px)] mb-1"></div>
  );

  // --- KOMPONEN ISI LABEL ---
  const LabelContent = () => (
    <div className={`bg-white text-black w-[105mm] min-h-[148mm] flex flex-col box-border relative transition-all border border-black shadow-[0_0_40px_rgba(0,0,0,0.5)] print:absolute print:top-0 print:left-0 print:w-[105mm] print:h-[148mm] print:overflow-hidden print:shadow-none print:border-none print:m-0 mx-auto`}>
      
      {templateId === 1 && (
        <div className="font-sans text-[10px] leading-tight h-full flex flex-col">
            {/* HEADER LOGISTICS */}
            <div className="flex border-b-[3px] border-black shrink-0 items-stretch">
              <div className="w-[65%] border-r-[3px] border-black p-3 flex flex-col justify-between bg-black text-white print:bg-transparent print:text-black">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight leading-none mb-1">{data.carrier}</h2>
                    <div className="text-[9px] font-bold tracking-widest opacity-80 print:opacity-100">{data.serviceType}</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {data.carrierMode === 'AIR' && <Plane size={18} className="print:text-black" />}
                    {data.carrierMode === 'SEA' && <Ship size={18} className="print:text-black" />}
                    {data.carrierMode === 'LAND' && <Truck size={18} className="print:text-black" />}
                    <span className="font-mono text-xs tracking-widest border border-white/30 print:border-black px-1 py-0.5">{data.carrierMode} FREIGHT</span>
                  </div>
              </div>
              <div className="w-[35%] p-2 flex flex-col justify-center items-center bg-white print:bg-transparent text-black">
                  <QRPattern />
                  <div className="text-[8px] font-bold mt-1 text-center">B2B LOGISTICS<br/>SECURE SCAN</div>
              </div>
            </div>

            {/* BARCODE AREA */}
            <div className="p-3 border-b-2 border-black flex flex-col justify-center shrink-0">
               <BarcodeStrips />
               <div className="font-mono text-lg font-black tracking-widest text-center mt-1">{data.trackingNumber}</div>
            </div>

            {/* ROUTING INFO */}
            <div className="flex border-b-2 border-black shrink-0 bg-gray-100 print:bg-transparent">
               <div className="w-1/3 p-2 border-r-2 border-black">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">Date</div>
                  <div className="font-bold text-xs">{data.date}</div>
               </div>
               <div className="w-1/3 p-2 border-r-2 border-black">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">PO Number</div>
                  <div className="font-mono font-bold text-xs">{data.poNumber}</div>
               </div>
               <div className="w-1/3 p-2">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">Incoterms</div>
                  <div className="font-black text-sm">{data.incoterms}</div>
               </div>
            </div>

            {/* ADDRESSES */}
            <div className="flex-grow flex flex-col border-b-2 border-black">
              {/* SHIPPER */}
              <div className="p-3 flex-1 border-b border-dashed border-black">
                 <div className="flex items-center gap-1 mb-1">
                    <span className="bg-black text-white text-[8px] px-1.5 py-0.5 font-bold uppercase print:bg-transparent print:text-black print:border print:border-black">Shipper</span>
                 </div>
                 <div className="text-sm font-black uppercase leading-tight mb-1">{data.shipperCompany}</div>
                 <div className="font-bold text-[9px] mb-1">{data.shipperContact}</div>
                 <div className="text-[10px] font-medium leading-snug">{data.shipperAddress}</div>
              </div>

              {/* CONSIGNEE */}
              <div className="p-3 flex-1 relative bg-yellow-50 print:bg-transparent">
                 <div className="absolute top-2 right-2 border-2 border-black w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">TO</div>
                 <div className="flex items-center gap-1 mb-1">
                    <span className="bg-black text-white text-[8px] px-1.5 py-0.5 font-bold uppercase print:bg-transparent print:text-black print:border print:border-black">Consignee</span>
                 </div>
                 <div className="text-lg font-black uppercase leading-tight mb-1">{data.consigneeCompany}</div>
                 <div className="font-bold text-[10px] mb-1">{data.consigneeContact}</div>
                 <div className="text-[11px] font-bold leading-snug">{data.consigneeAddress}</div>
              </div>
            </div>

            {/* CARGO DETAILS */}
            <div className="flex border-b-2 border-black shrink-0">
               <div className="w-1/3 p-2 border-r-2 border-black text-center">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">Pieces / Type</div>
                  <div className="font-black text-sm">{data.packageCount}</div>
               </div>
               <div className="w-1/3 p-2 border-r-2 border-black text-center">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">Gross Weight</div>
                  <div className="font-black text-sm">{data.grossWeight}</div>
               </div>
               <div className="w-1/3 p-2 text-center">
                  <div className="text-[7px] uppercase font-bold text-gray-500 print:text-black">Dimensions</div>
                  <div className="font-bold text-[10px] mt-0.5">{data.dimensions}</div>
               </div>
            </div>

            {/* DESC & HANDLING */}
            <div className="p-2 shrink-0 h-20 overflow-hidden flex flex-col justify-between">
               <div>
                  <span className="text-[8px] font-bold uppercase mr-1 border border-black px-1">Desc</span>
                  <span className="font-bold text-[10px]">{data.description}</span>
               </div>
               {data.handlingInstructions && (
                 <div className="mt-1 border-t border-black pt-1">
                    <span className="text-[8px] font-bold uppercase mr-1 bg-red-600 text-white px-1 print:bg-transparent print:text-black print:border print:border-black">Handling</span>
                    <span className="font-black text-[10px] uppercase">{data.handlingInstructions}</span>
                 </div>
               )}
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 overflow-hidden relative">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-black z-0 "></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full z-0 "></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white !important; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .{ page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; color: black !important; }
        }
        /* Custom Scrollbar for dark theme */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      ` }} />

      {/* HEADER */}
      <header className="no-print relative z-50 h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-800 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-200">
               <Globe2 size={16} className="text-indigo-400" /> <span className="uppercase tracking-widest">B2B Logistics Matrix</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-2 transition-all border border-emerald-400/20 text-white">
              <Printer size={16} /> <span className="hidden md:inline">Generate BOL</span>
            </button>
          </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] relative z-10 print:block print:h-auto print:overflow-visible">
        
        {/* EDITOR SIDEBAR */}
        <div className={`no-print w-full md:w-[480px] bg-slate-900/60 backdrop-blur-xl border-r border-white/10 flex flex-col h-full absolute md:relative z-20 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-5 border-b border-white/10 flex justify-between items-center shrink-0">
               <h2 className="font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
                 <ShieldCheck size={16} className="text-indigo-400" /> Freight Parameters
               </h2>
               <button onClick={handleReset} className="text-slate-400 hover:text-red-400 transition-colors p-1" title="Reset Data">
                 <RotateCcw size={16}/>
               </button>
           </div>
           
           <div className="flex border-b border-white/10 text-xs font-bold shrink-0">
             <button onClick={() => setActiveTab('routing')} className={`flex-1 p-3 text-center transition-colors border-b-2 ${activeTab === 'routing' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>Routing</button>
             <button onClick={() => setActiveTab('shipper')} className={`flex-1 p-3 text-center transition-colors border-b-2 ${activeTab === 'shipper' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>Shipper</button>
             <button onClick={() => setActiveTab('consignee')} className={`flex-1 p-3 text-center transition-colors border-b-2 ${activeTab === 'consignee' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>Consignee</button>
             <button onClick={() => setActiveTab('cargo')} className={`flex-1 p-3 text-center transition-colors border-b-2 ${activeTab === 'cargo' ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>Cargo</button>
           </div>

 <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:flex print:overflow-visible print:bg-white">
              
              {/* PRESETS */}
              <div className="mb-6 p-1 bg-slate-950/50 rounded-xl border border-white/5 flex gap-1">
                <button onClick={() => applyPreset('air')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase flex flex-col items-center gap-1 transition-colors ${data.carrierMode === 'AIR' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}><Plane size={14}/> AIR</button>
                <button onClick={() => applyPreset('sea')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase flex flex-col items-center gap-1 transition-colors ${data.carrierMode === 'SEA' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}><Ship size={14}/> SEA</button>
                <button onClick={() => applyPreset('land')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase flex flex-col items-center gap-1 transition-colors ${data.carrierMode === 'LAND' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}><Truck size={14}/> LAND</button>
              </div>

              <div className="space-y-4">
                {activeTab === 'routing' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                      <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Carrier Name</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all uppercase" value={data.carrier} onChange={e => handleDataChange('carrier', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Service Type</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all uppercase" value={data.serviceType} onChange={e => handleDataChange('serviceType', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Tracking / AWB / BOL</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all uppercase" value={data.trackingNumber} onChange={e => handleDataChange('trackingNumber', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">PO Number</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all uppercase" value={data.poNumber} onChange={e => handleDataChange('poNumber', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Date</label>
                        <input type="date" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all [color-scheme:dark]" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Incoterms</label>
                        <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={data.incoterms} onChange={e => handleDataChange('incoterms', e.target.value)}>
                          <option value="DDP">DDP (Delivered Duty Paid)</option>
                          <option value="DAP">DAP (Delivered at Place)</option>
                          <option value="EXW">EXW (Ex Works)</option>
                          <option value="FOB">FOB (Free on Board)</option>
                          <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shipper' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                      <label className="block text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Shipper Company</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all uppercase" value={data.shipperCompany} onChange={e => handleDataChange('shipperCompany', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Contact Person / Phone</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" value={data.shipperContact} onChange={e => handleDataChange('shipperContact', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Full Address</label>
                      <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white h-24 resize-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" value={data.shipperAddress} onChange={e => handleDataChange('shipperAddress', e.target.value)} />
                    </div>
                  </div>
                )}

                {activeTab === 'consignee' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                      <label className="block text-[9px] font-bold text-orange-400 uppercase tracking-widest mb-1.5">Consignee Company</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all uppercase" value={data.consigneeCompany} onChange={e => handleDataChange('consigneeCompany', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-orange-400 uppercase tracking-widest mb-1.5">Contact Person / Phone</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" value={data.consigneeContact} onChange={e => handleDataChange('consigneeContact', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-orange-400 uppercase tracking-widest mb-1.5">Full Address</label>
                      <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white h-24 resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" value={data.consigneeAddress} onChange={e => handleDataChange('consigneeAddress', e.target.value)} />
                    </div>
                  </div>
                )}

                {activeTab === 'cargo' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Package size={12}/> Pieces</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" value={data.packageCount} onChange={e => handleDataChange('packageCount', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Scale size={12}/> Gross Weight</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" value={data.grossWeight} onChange={e => handleDataChange('grossWeight', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Ruler size={12}/> Dimensions (L x W x H)</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" value={data.dimensions} onChange={e => handleDataChange('dimensions', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><FileText size={12}/> Description of Goods</label>
                      <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white h-16 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" value={data.description} onChange={e => handleDataChange('description', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><AlertOctagon size={12}/> Handling Instructions</label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all uppercase" value={data.handlingInstructions} onChange={e => handleDataChange('handlingInstructions', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* PREVIEW CANVAS */}
 <div className={`flex-1 h-full flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-2 no-print shadow-xl">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               LIVE PREVIEW: A6 (105x148mm)
            </div>

            <div className="origin-center transition-transform duration-300 transform scale-[0.6] sm:scale-[0.70] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <LabelContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-800/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl font-sans border border-white/10">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print">
         {/* Hidden in UI but present for logic if needed */}
         <PrintWrapper documentName="B2B Logistics BOL" price={5000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><LabelContent /></div>
    </div>
  );
}
