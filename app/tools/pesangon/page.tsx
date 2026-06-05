'use client';

/**
 * FILE: PesangonPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Kalkulator & Generator Surat Perhitungan Pesangon (PP 35/2021)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Calculator, Wallet, 
  CalendarDays, Briefcase, Info, AlertTriangle, Scale, Edit3, Eye,
  LayoutTemplate, ChevronDown, Check, MapPin, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
  name: 'BUDI SANTOSO',
  joinDate: '2015-01-01',
  phkDate: '2026-01-08',
  salary: 8000000, 
  reason: 'efisiensi', 
};

export default function PesangonPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading Calculator...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- LOGIC PERHITUNGAN (PP 35/2021) ---
  const calculation = useMemo(() => {
    const start = new Date(data.joinDate);
    const end = new Date(data.phkDate);
    
    // Hitung Masa Kerja (Tahun & Bulan)
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
        years--;
        months += 12;
    }
    
    // Masa Kerja (Exact Years untuk logic UP)
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
    else upMultiplier = 9; 

    // 2. Uang Penghargaan Masa Kerja (UPMK) - Pasal 40 ayat (3)
    let upmkMultiplier = 0;
    if (years >= 3 && years < 6) upmkMultiplier = 2;
    else if (years >= 6 && years < 9) upmkMultiplier = 3;
    else if (years >= 9 && years < 12) upmkMultiplier = 4;
    else if (years >= 12 && years < 15) upmkMultiplier = 5;
    else if (years >= 15 && years < 18) upmkMultiplier = 6;
    else if (years >= 18 && years < 21) upmkMultiplier = 7;
    else if (years >= 21 && years < 24) upmkMultiplier = 8;
    else if (years >= 24) upmkMultiplier = 10;

    // 3. Faktor Pengali Alasan PHK
    let reasonCoefficient = 1.0;
    if (data.reason === 'efisiensi') reasonCoefficient = 1.0; 
    else if (data.reason === 'pelanggaran') reasonCoefficient = 0.5; 
    else if (data.reason === 'pensiun') reasonCoefficient = 1.75;
    else if (data.reason === 'meninggal') reasonCoefficient = 2.0;
    else if (data.reason === 'tutup_kerugian') reasonCoefficient = 0.5;

    // HITUNG NOMINAL
    const totalUP = upMultiplier * data.salary * reasonCoefficient;
    const totalUPMK = upmkMultiplier * data.salary; 
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

  const activeTemplateName = templateId === 1 ? 'Format Rincian' : 'Format Ringkas';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        <div className="text-center mb-8 border-b-4 border-double border-black pb-4 shrink-0">
          <h1 className="font-black text-xl uppercase tracking-tighter">RINCIAN PERHITUNGAN PESANGON</h1>
          <p className="text-sm mt-1 font-sans font-bold text-slate-500 uppercase tracking-widest print:text-black">Berdasarkan Peraturan Pemerintah No. 35 Tahun 2021</p>
        </div>

        <div className="flex-grow space-y-6">
          <section className="grid grid-cols-2 gap-4 md:gap-6 text-[10pt] font-sans bg-slate-50 p-5 rounded-xl border border-slate-200 print:bg-transparent print:border-black break-inside-avoid">
            <div className="space-y-3">
              <div><p className="text-[9px] font-black text-slate-400 uppercase">Nama Karyawan</p><p className="font-bold text-base uppercase">{data.name}</p></div>
              <div><p className="text-[9px] font-black text-slate-400 uppercase">Masa Kerja</p><p className="font-bold">{calculation.years} Tahun {calculation.months} Bulan</p></div>
            </div>
            <div className="space-y-3 text-right md:text-left">
              <div><p className="text-[9px] font-black text-slate-400 uppercase">Upah Terakhir</p><p className="font-bold text-emerald-700 text-base print:text-black">{formatRupiah(data.salary)}</p></div>
              <div><p className="text-[9px] font-black text-slate-400 uppercase">Alasan PHK</p><p className="font-bold uppercase text-red-600 italic">PHK {data.reason.replace('_', ' ')}</p></div>
            </div>
          </section>

          {templateId === 1 ? (
            <div className="overflow-hidden border-2 border-black rounded-sm shrink-0 break-inside-avoid">
                <table className="w-full border-collapse font-sans">
                <thead>
                    <tr className="bg-slate-900 text-white print:bg-transparent print:text-black border-b-2 border-black">
                    <th className="p-3 text-left text-[10px] uppercase tracking-widest">Komponen Hak</th>
                    <th className="p-3 text-right text-[10px] uppercase tracking-widest">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="text-[10pt]">
                    <tr className="border-b border-slate-100 print:border-black">
                    <td className="p-4">
                      <div className="font-black uppercase text-slate-900">Uang Pesangon (UP)</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">
                          Formula: {calculation.upMultiplier} x Upah x {calculation.reasonCoefficient} (Multiplier)
                      </div>
                    </td>
                    <td className="p-4 text-right font-black text-slate-900">{formatRupiah(calculation.totalUP)}</td>
                    </tr>
                    <tr className="border-b border-slate-100 print:border-black">
                    <td className="p-4">
                      <div className="font-black uppercase text-slate-900">Penghargaan Masa Kerja (UPMK)</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">
                          Formula: {calculation.upmkMultiplier} x Upah
                      </div>
                    </td>
                    <td className="p-4 text-right font-black text-slate-900">{formatRupiah(calculation.totalUPMK)}</td>
                    </tr>
                    <tr className="border-b border-slate-100 print:border-black">
                    <td className="p-4">
                      <div className="font-black uppercase text-slate-900">Uang Penggantian Hak (UPH)</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">
                          Estimasi: 15% x (UP + UPMK)
                      </div>
                    </td>
                    <td className="p-4 text-right font-black text-slate-900">{formatRupiah(calculation.totalUPH)}</td>
                    </tr>
                    <tr className="bg-slate-900 text-white print:bg-transparent print:text-black">
                    <td className="p-5 text-xl font-black uppercase text-right">Grand Total Bruto</td>
                    <td className="p-5 text-2xl font-black text-right border-l border-white/20 print:border-black">{formatRupiah(calculation.grandTotal)}</td>
                    </tr>
                </tbody>
                </table>
            </div>
          ) : (
            <div className="space-y-6 font-sans px-4 break-inside-avoid">
               <div className="flex justify-between border-b-2 border-slate-100 pb-3 print:border-black uppercase text-xs font-bold text-slate-400"><span>Uang Pesangon</span><span className="text-slate-900 font-black">{formatRupiah(calculation.totalUP)}</span></div>
               <div className="flex justify-between border-b-2 border-slate-100 pb-3 print:border-black uppercase text-xs font-bold text-slate-400"><span>Uang Penghargaan Masa Kerja</span><span className="text-slate-900 font-black">{formatRupiah(calculation.totalUPMK)}</span></div>
               <div className="flex justify-between border-b-2 border-slate-100 pb-3 print:border-black uppercase text-xs font-bold text-slate-400"><span>Uang Penggantian Hak</span><span className="text-slate-900 font-black">{formatRupiah(calculation.totalUPH)}</span></div>
               <div className="flex justify-between text-2xl font-black pt-6 border-t-4 border-slate-900 text-slate-900"><span>GRAND TOTAL</span><span>{formatRupiah(calculation.grandTotal)}</span></div>
            </div>
          )}

          <div className="bg-amber-50 border-2 border-dashed border-amber-200 p-5 rounded-2xl flex gap-4 items-start print:bg-transparent print:border-black shrink-0 break-inside-avoid">
              <Info size={24} className="text-amber-600 shrink-0 mt-0.5 print:text-black" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-amber-900 uppercase print:text-black">Catatan Penting:</p>
                <p className="text-[9pt] text-amber-800 leading-relaxed italic print:text-black">
                  Perhitungan ini merupakan estimasi berdasarkan standar PP 35/2021. Nilai akhir dapat bervariasi sesuai Perjanjian Kerja Bersama (PKB) atau kebijakan internal perusahaan. Angka di atas adalah nilai bruto sebelum dipotong pajak penghasilan (PPh 21).
                </p>
              </div>
          </div>
        </div>

        <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-end print:border-black shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="text-center w-48 font-sans">
              <p className="text-[9px] font-black text-slate-300 mb-16 uppercase tracking-[0.3em]">Management</p>
              <div className="w-full border-b-2 border-slate-900 mb-1"></div>
              <p className="text-[10px] font-black uppercase">HRD DEPARTMENT</p>
            </div>
            <div className="text-right w-64 font-sans">
              <p className="text-[10px] font-black text-slate-300 mb-16 uppercase tracking-widest">{data.city}, {formatDateSafe(data.date)}</p>
              <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900">{data.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Karyawan Bersangkutan</p>
            </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Calculator size={16} className="text-blue-500" /> <span>Severance Calculator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Tabel {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Memo {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Karyawan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Upah (Gaji + Tunjangan Tetap)</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-xs font-black text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.salary} onChange={e => handleDataChange('salary', parseInt(e.target.value) || 0)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Masa Kerja</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TGL MASUK</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.joinDate} onChange={e => handleDataChange('joinDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TGL PHK</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.phkDate} onChange={e => handleDataChange('phkDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Kondisi PHK</h3>
                 <select className="w-full p-2 border rounded-lg text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-red-500 outline-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)}>
                    <option value="efisiensi">Efisiensi / Perusahaan Tutup (1.0x)</option>
                    <option value="pensiun">Mencapai Usia Pensiun (1.75x)</option>
                    <option value="meninggal">Meninggal Dunia (2.0x)</option>
                    <option value="pelanggaran">Pelanggaran Aturan / SP (0.5x)</option>
                    <option value="tutup_kerugian">Tutup Karena Rugi (0.5x)</option>
                 </select>
                 <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-[10px] text-red-700 italic">"Faktor pengali (multiplier) pesangon disesuaikan secara otomatis menurut Pasal 42-52 PP 35/2021."</p>
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
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
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE