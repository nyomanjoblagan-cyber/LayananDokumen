'use client';

/**
 * FILE: PesangonPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Kalkulator & Generator Surat Perhitungan Pesangon (PP 35/2021)
 * FEATURES:
 * - Auto Calculation (Years of Service, UP, UPMK, UPH 15%)
 * - Dismissal Reason Multiplier Logic
 * - Dual Template (Detailed Table vs Simple Summary)
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Calculator, Wallet, 
  CalendarDays, Briefcase, Info, AlertTriangle, Scale, Edit3, Eye,
  LayoutTemplate, ChevronDown, Check, MapPin, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PesangonData {
  city: string;
  date: string;
  name: string;
  joinDate: string;
  phkDate: string;
  salary: number; 
  reason: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PesangonData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  name: 'BUDI SANTOSO',
  joinDate: '2015-01-01',
  phkDate: '2026-01-08',
  salary: 8000000, 
  reason: 'efisiensi', 
};

// --- 3. KOMPONEN UTAMA ---
export default function PesangonPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Calculator...</div>}>
      <PesangonCalculatorBuilder />
    </Suspense>
  );
}

function PesangonCalculatorBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState<PesangonData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PesangonData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- LOGIC PERHITUNGAN (PP 35/2021) ---
  const calculation = useMemo(() => {
    const start = new Date(data.joinDate);
    const end = new Date(data.phkDate);
    
    // Hitung Masa Kerja
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
        years--;
        months += 12;
    }
    // Adjust month calculation if day is earlier
    if (end.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
            months += 12;
            // years already adjusted above if months was < 0 initially, 
            // but if months became < 0 here, we don't adjust years again 
            // because standard logic usually covers year/month diff.
            // Simplified logic: Just rely on years for UP/UPMK
        }
    }
    
    // Masa Kerja (Float untuk logika multiplier jika diperlukan, tapi PP 35 pakai range)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYearsExact = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    // 1. Uang Pesangon (UP) - Pasal 40 ayat (2)
    let upMultiplier = 0;
    if (diffYearsExact < 1) upMultiplier = 1;
    else if (diffYearsExact < 2) upMultiplier = 2;
    else if (diffYearsExact < 3) upMultiplier = 3;
    else if (diffYearsExact < 4) upMultiplier = 4;
    else if (diffYearsExact < 5) upMultiplier = 5;
    else if (diffYearsExact < 6) upMultiplier = 6;
    else if (diffYearsExact < 7) upMultiplier = 7;
    else if (diffYearsExact < 8) upMultiplier = 8;
    else upMultiplier = 9; // Max 9 bulan

    // 2. Uang Penghargaan Masa Kerja (UPMK) - Pasal 40 ayat (3)
    let upmkMultiplier = 0;
    if (years >= 3 && years < 6) upmkMultiplier = 2;
    else if (years >= 6 && years < 9) upmkMultiplier = 3;
    else if (years >= 9 && years < 12) upmkMultiplier = 4;
    else if (years >= 12 && years < 15) upmkMultiplier = 5;
    else if (years >= 15 && years < 18) upmkMultiplier = 6;
    else if (years >= 18 && years < 21) upmkMultiplier = 7;
    else if (years >= 21 && years < 24) upmkMultiplier = 8;
    else if (years >= 24) upmkMultiplier = 10; // Max 10 bulan

    // 3. Faktor Pengali Alasan PHK
    let reasonCoefficient = 1.0;
    if (data.reason === 'efisiensi') reasonCoefficient = 1.0; // Efisiensi (bisa 0.5 jika rugi, default 1)
    else if (data.reason === 'pelanggaran') reasonCoefficient = 0.5; // Surat Peringatan
    else if (data.reason === 'pensiun') reasonCoefficient = 1.75;
    else if (data.reason === 'meninggal') reasonCoefficient = 2.0;
    else if (data.reason === 'tutup_kerugian') reasonCoefficient = 0.5;

    // HITUNG NOMINAL
    const totalUP = upMultiplier * data.salary * reasonCoefficient;
    const totalUPMK = upmkMultiplier * data.salary; // UPMK usually 1x unless specific agreement
    
    // 4. Uang Penggantian Hak (UPH) - Biasanya 15% dari (UP + UPMK)
    // *Catatan: UPH aslinya meliputi cuti, ongkos pulang, dll. 
    // Namun dalam kalkulator umum sering diestimasi 15% jika tidak ada data cuti.
    const totalUPH = (totalUP + totalUPMK) * 0.15; 

    return {
      years: years,
      months: months < 0 ? 0 : months,
      upMultiplier,
      upmkMultiplier,
      reasonCoefficient,
      totalUP,
      totalUPMK,
      totalUPH,
      grandTotal: totalUP + totalUPMK + totalUPH
    };
  }, [data]);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Rincian (Tabel)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas (Memo)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Rincian' : 'Format Ringkas';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding & Layout
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      <div className="text-center mb-8 border-b-4 border-double border-black pb-4 shrink-0">
        <h1 className="font-black text-xl uppercase tracking-tighter">RINCIAN PERHITUNGAN PESANGON</h1>
        <p className="text-sm mt-1 font-sans font-bold text-slate-500 uppercase tracking-widest print:text-black">Berdasarkan Peraturan Pemerintah No. 35 Tahun 2021</p>
      </div>

      <div className="flex-grow space-y-6">
        <section className="grid grid-cols-2 gap-4 md:gap-6 text-[10pt] font-sans bg-slate-50 p-5 rounded-xl border border-slate-200 print:bg-transparent print:border-black">
          <div className="space-y-3">
            <div><p className="text-[9px] font-black text-slate-400 uppercase print:text-black">Nama Karyawan</p><p className="font-bold text-base uppercase">{data.name}</p></div>
            <div><p className="text-[9px] font-black text-slate-400 uppercase print:text-black">Masa Kerja</p><p className="font-bold">{calculation.years} Thn {calculation.months} Bln</p></div>
          </div>
          <div className="space-y-3">
            <div><p className="text-[9px] font-black text-slate-400 uppercase print:text-black">Upah Terakhir</p><p className="font-bold text-emerald-700 text-base print:text-black">{formatRupiah(data.salary)}</p></div>
            <div><p className="text-[9px] font-black text-slate-400 uppercase print:text-black">Alasan PHK</p><p className="font-bold uppercase text-red-600 italic print:text-black">PHK {data.reason.replace('_', ' ')}</p></div>
          </div>
        </section>

        {templateId === 1 ? (
          <div className="overflow-hidden border border-black rounded-sm shrink-0">
              <table className="w-full border-collapse font-sans">
              <thead>
                  <tr className="bg-slate-900 text-white print:bg-transparent print:text-black border-b border-black">
                  <th className="p-3 text-left text-[10px] uppercase">Komponen Hak</th>
                  <th className="p-3 text-right text-[10px] uppercase">Subtotal</th>
                  </tr>
              </thead>
              <tbody className="text-[10pt]">
                  <tr className="border-b border-slate-100 print:border-black">
                  <td className="p-4 font-bold">
                    Uang Pesangon (UP)
                    <div className="text-[9px] font-normal opacity-70">
                        {calculation.upMultiplier} x Upah x {calculation.reasonCoefficient} (Multiplier)
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold">{formatRupiah(calculation.totalUP)}</td>
                  </tr>
                  <tr className="border-b border-slate-100 print:border-black">
                  <td className="p-4 font-bold">
                    Penghargaan Masa Kerja (UPMK)
                    <div className="text-[9px] font-normal opacity-70">
                        {calculation.upmkMultiplier} x Upah
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold">{formatRupiah(calculation.totalUPMK)}</td>
                  </tr>
                  <tr className="border-b border-slate-100 print:border-black">
                  <td className="p-4 font-bold">
                    Penggantian Hak (UPH)
                    <div className="text-[9px] font-normal opacity-70">
                        15% x (UP + UPMK)
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold">{formatRupiah(calculation.totalUPH)}</td>
                  </tr>
                  <tr className="bg-emerald-50 text-emerald-900 print:bg-transparent print:text-black">
                  <td className="p-5 text-lg font-black uppercase text-right">Total Terima</td>
                  <td className="p-5 text-xl font-black text-right border-l border-emerald-100 print:border-black">{formatRupiah(calculation.grandTotal)}</td>
                  </tr>
              </tbody>
              </table>
          </div>
        ) : (
          <div className="space-y-4 font-sans px-4">
             <div className="flex justify-between border-b pb-2 print:border-black"><span>Uang Pesangon</span><span className="font-bold">{formatRupiah(calculation.totalUP)}</span></div>
             <div className="flex justify-between border-b pb-2 print:border-black"><span>Uang Penghargaan Masa Kerja</span><span className="font-bold">{formatRupiah(calculation.totalUPMK)}</span></div>
             <div className="flex justify-between border-b pb-2 print:border-black"><span>Uang Penggantian Hak</span><span className="font-bold">{formatRupiah(calculation.totalUPH)}</span></div>
             <div className="flex justify-between text-xl font-black pt-4 border-t-2 border-black"><span>GRAND TOTAL</span><span>{formatRupiah(calculation.grandTotal)}</span></div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start print:bg-transparent print:border-black shrink-0">
            <Info size={20} className="text-amber-600 shrink-0 mt-0.5 print:text-black" />
            <p className="text-[9px] text-amber-800 leading-relaxed italic print:text-black">
              *Estimasi PP 35/2021. Hasil akhir dapat berbeda sesuai Perjanjian Kerja Bersama (PKB) masing-masing perusahaan. Angka merupakan bruto (sebelum pajak PPh 21).
            </p>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end print:border-black shrink-0" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-center w-40 md:w-48 font-sans">
            <p className="text-[9px] text-slate-400 mb-12 uppercase font-bold print:text-black">Diverifikasi</p>
            <div className="w-full border-b-2 border-slate-900 mb-1"></div>
            <p className="text-[10px] font-bold uppercase">HRD / MANAGEMENT</p>
          </div>
          <div className="text-right w-48 md:w-64 font-sans">
            <p className="text-[10px] mb-12 uppercase">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
            <p className="font-black underline uppercase text-sm">{data.name}</p>
            <p className="text-[9px] text-slate-400 uppercase font-bold print:text-black">Karyawan</p>
          </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400 uppercase tracking-widest text-xs">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Calculator size={16} className="text-emerald-500" /> <span>Severance Calculator</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Karyawan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Info Kerja</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Karyawan" />
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Gaji Pokok + Tun. Tetap</label>
                    <input type="number" className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.salary} onChange={e => handleDataChange('salary', parseInt(e.target.value) || 0)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Periode Kerja</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">TGL MASUK</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.joinDate} onChange={e => handleDataChange('joinDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">TGL PHK</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.phkDate} onChange={e => handleDataChange('phkDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Alasan PHK</h3>
                 <select className="w-full p-2 border rounded text-xs font-bold bg-slate-50" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)}>
                    <option value="efisiensi">Efisiensi / Perusahaan Tutup (1.0x)</option>
                    <option value="pensiun">Mencapai Usia Pensiun (1.75x)</option>
                    <option value="meninggal">Meninggal Dunia (2.0x)</option>
                    <option value="pelanggaran">Pelanggaran Aturan (0.5x)</option>
                    <option value="tutup_kerugian">Tutup Karena Rugi (0.5x)</option>
                 </select>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
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

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
