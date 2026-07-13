'use client';

/**
 * FILE: PphPage.tsx
 * STATUS: PRODUCTION READY (UU HPP 2022 COMPLIANT)
 * DESC: Kalkulator PPh 21 Berdasarkan UU HPP & PMK Terbaru
 */

import { useState, useEffect, Suspense } from 'react';
import { 
  ArrowLeft, Calculator, Banknote, 
  Wallet, Info, TrendingDown, Building2,
  PieChart, DollarSign, Briefcase, Check, Edit3, Eye, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface TaxResult {
  grossYear: number;
  biayaJabatan: number;
  iuranPensiun: number;
  nettoYear: number;
  ptkpAmount: number;
  pkp: number;
  taxYear: number;
  taxMonth: number;
  takeHomePay: number;
  topBracket: number;
}

// --- 2. DATA DEFAULT ---
const PTKP_LIST: Record<string, number> = {
  'TK/0': 54000000, 'TK/1': 58500000, 'TK/2': 63000000, 'TK/3': 67500000,
  'K/0': 58500000, 'K/1': 63000000, 'K/2': 67500000, 'K/3': 72000000,
};

// --- 3. KOMPONEN UTAMA ---
export default function PphPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Kalkulator Pajak...</div>}>
      <PphCalculatorBuilder />
    </Suspense>
  );
}

function PphCalculatorBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  // --- STATE INPUT ---
  const [salary, setSalary] = useState<number>(10000000); 
  const [allowance, setAllowance] = useState<number>(500000); 
  const [thr, setThr] = useState<number>(0); 
  const [ptkpStatus, setPtkpStatus] = useState<string>('TK/0');
  const [hasNpwp, setHasNpwp] = useState<boolean>(true);
  const [includeBPJS, setIncludeBPJS] = useState<boolean>(true); 

  // --- STATE OUTPUT ---
  const [result, setResult] = useState<TaxResult>({
    grossYear: 0, biayaJabatan: 0, iuranPensiun: 0, nettoYear: 0,
    ptkpAmount: 0, pkp: 0, taxYear: 0, taxMonth: 0, takeHomePay: 0, topBracket: 0 
  });

  useEffect(() => {
    setIsClient(true);
    
    // 1. PENGHASILAN BRUTO
    const grossMonth = salary + allowance;
    const grossYear = (grossMonth * 12) + thr;

    // 2. PENGURANG: BIAYA JABATAN (5% Max 6jt/thn)
    let bJabatan = grossYear * 0.05;
    if (bJabatan > 6000000) bJabatan = 6000000;

    // JHT (2%) + JP (1%) = 3% dari Gaji Pokok
    let iPensiun = 0;
    if (includeBPJS) {
       iPensiun = (salary * 0.03) * 12;
    }

    // 3. PENGHASILAN NETTO
    const netto = grossYear - bJabatan - iPensiun;
    
    // 4. PTKP & PKP
    const ptkpVal = PTKP_LIST[ptkpStatus] || 54000000;
    let pkpCalc = netto - ptkpVal;
    if (pkpCalc < 0) pkpCalc = 0;
    pkpCalc = Math.floor(pkpCalc / 1000) * 1000; // Pembulatan PKP ke ribuan bawah

    // 5. PERHITUNGAN TARIF PROGRESIF (UU HPP 2022)
    let tax = 0;
    let remainingPKP = pkpCalc;
    let bracket = 0;

    // Tier 1: 0 - 60jt (5%)
    const t1 = Math.min(remainingPKP, 60000000);
    if (t1 > 0) { tax += t1 * 0.05; remainingPKP -= t1; bracket = 5; }
    
    // Tier 2: 60jt - 250jt (15%)
    const t2 = Math.min(remainingPKP, 190000000);
    if (t2 > 0) { tax += t2 * 0.15; remainingPKP -= t2; bracket = 15; }
    
    // Tier 3: 250jt - 500jt (25%)
    const t3 = Math.min(remainingPKP, 250000000);
    if (t3 > 0) { tax += t3 * 0.25; remainingPKP -= t3; bracket = 25; }
    
    // Tier 4: 500jt - 5M (30%)
    const t4 = Math.min(remainingPKP, 4500000000);
    if (t4 > 0) { tax += t4 * 0.30; remainingPKP -= t4; bracket = 30; }
    
    // Tier 5: > 5M (35%)
    if (remainingPKP > 0) { tax += remainingPKP * 0.35; bracket = 35; }

    // PENALTY NO NPWP (20% Higher)
    if (!hasNpwp) tax = tax * 1.2;

    const monthlyTax = tax / 12;
    const monthlyBPJS = includeBPJS ? (salary * 0.03) : 0;
    const thp = grossMonth - monthlyTax - monthlyBPJS;

    setResult({
      grossYear, biayaJabatan: bJabatan, iuranPensiun: iPensiun,
      nettoYear: netto, ptkpAmount: ptkpVal, pkp: pkpCalc,
      taxYear: tax, taxMonth: monthlyTax, takeHomePay: thp, topBracket: bracket
    });
  }, [salary, allowance, thr, ptkpStatus, hasNpwp, includeBPJS]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* NAVBAR */}
      <div className="bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Calculator size={16} className="text-blue-500" /> <span className="uppercase tracking-tighter">PPh 21 Calculator (UU HPP)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
            <TrendingDown size={14} className="text-blue-400" />
            <span className="text-[10px] font-black text-blue-200 uppercase">Tahun Pajak 2026</span>
          </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:block print:h-auto print:overflow-visible">
        {/* INPUT SIDEBAR */}
        <div className={`w-full md:w-[400px] bg-white border-r overflow-y-auto p-6 space-y-8 z-20 ${mobileView === 'preview' ? 'hidden md:block' : 'block'}`}>
           <div>
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 mb-4 tracking-widest flex items-center gap-2"><DollarSign size={14}/> Komponen Gaji</h3>
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Gaji Pokok / Bulan</label>
                    <input type="number" className="w-full p-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl font-black text-blue-700 outline-none transition-all" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Tunjangan Tetap</label>
                    <input type="number" className="w-full p-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl font-bold outline-none transition-all" value={allowance} onChange={(e) => setAllowance(Number(e.target.value))} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Bonus / THR (Tahunan)</label>
                    <input type="number" className="w-full p-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl font-bold outline-none transition-all" value={thr} onChange={(e) => setThr(Number(e.target.value))} />
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 mb-4 tracking-widest flex items-center gap-2"><Briefcase size={14}/> Parameter Pajak</h3>
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Status PTKP</label>
                    <select className="w-full p-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl font-bold outline-none transition-all" value={ptkpStatus} onChange={(e) => setPtkpStatus(e.target.value)}>
                      <option value="TK/0">TK/0 (Single)</option>
                      <option value="TK/1">TK/1 (1 Tanggungan)</option>
                      <option value="TK/2">TK/2 (2 Tanggungan)</option>
                      <option value="TK/3">TK/3 (3 Tanggungan)</option>
                      <option value="K/0">K/0 (Menikah)</option>
                      <option value="K/1">K/1 (1 Anak)</option>
                      <option value="K/2">K/2 (2 Anak)</option>
                      <option value="K/3">K/3 (3 Anak)</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" checked={hasNpwp} onChange={e => setHasNpwp(e.target.checked)} className="w-5 h-5 rounded-lg text-blue-600 border-slate-200" />
                       <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Memiliki NPWP</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" checked={includeBPJS} onChange={e => setIncludeBPJS(e.target.checked)} className="w-5 h-5 rounded-lg text-blue-600 border-slate-200" />
                       <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Potong BPJS TK (3%)</span>
                    </label>
                 </div>
              </div>
           </div>
        </div>

        {/* OUTPUT DISPLAY */}
        <div className={`flex-1 bg-slate-200/50 p-4 md:p-8 overflow-y-auto h-full relative ${mobileView === 'editor' ? 'hidden md:flex md:flex-col' : 'flex flex-col'} print:block print:overflow-visible print:bg-white print:static`}>
           <div className="max-w-3xl w-full mx-auto space-y-6">
              
              {/* MAIN RESULT CARD */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                 <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Estimate Take Home Pay</p>
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{formatRupiah(result.takeHomePay)}<span className="text-xl text-slate-500 font-normal ml-2 italic">/bln</span></h2>
                 
                 <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
                    <div>
                       <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Pajak (PPh 21)</p>
                       <p className="text-xl font-bold text-red-400">{formatRupiah(result.taxMonth)}</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">BPJS Karyawan</p>
                       <p className="text-xl font-bold text-orange-400">{formatRupiah(includeBPJS ? salary * 0.03 : 0)}</p>
                    </div>
                    <div className="hidden md:block">
                       <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Tax Bracket</p>
                       <div className="bg-blue-600 inline-block px-3 py-1 rounded-full text-sm font-black italic">{result.topBracket}% Layer</div>
                    </div>
                 </div>
              </div>

              {/* BREAKDOWN BOX */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                 <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2"><PieChart size={14}/> Tax Breakdown</h3>
                    {!hasNpwp && <span className="bg-red-100 text-red-600 text-[8px] font-black px-2 py-1 rounded uppercase">Tanpa NPWP (+20%)</span>}
                 </div>
                 <div className="p-8 space-y-6">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-400 font-bold uppercase text-[10px]">Bruto Tahunan</span>
                       <span className="font-black text-slate-800">{formatRupiah(result.grossYear)}</span>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs text-red-500 italic">
                          <span>Biaya Jabatan & Pensiun</span>
                          <span>- {formatRupiah(result.biayaJabatan + result.iuranPensiun)}</span>
                       </div>
                       <div className="flex justify-between text-xs text-green-600 italic">
                          <span>PTKP ({ptkpStatus})</span>
                          <span>- {formatRupiah(result.ptkpAmount)}</span>
                       </div>
                    </div>
                    <div className="pt-6 border-t-2 border-dashed border-slate-100 flex justify-between items-center">
                       <span className="font-black text-blue-600 uppercase text-xs tracking-widest">Penghasilan Kena Pajak (PKP)</span>
                       <span className="text-2xl font-black text-blue-800">{formatRupiah(result.pkp)}</span>
                    </div>
                 </div>
              </div>

              {/* LAYER PROGRESS */}
              <div className="grid grid-cols-5 gap-3">
                 {[5, 15, 25, 30, 35].map((rate) => (
                    <div key={rate} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${result.topBracket >= rate ? 'bg-blue-600 border-blue-400 shadow-lg -translate-y-1' : 'bg-white border-slate-100 opacity-30'}`}>
                       <span className={`text-lg font-black ${result.topBracket >= rate ? 'text-white' : 'text-slate-300'}`}>{rate}%</span>
                       <span className={`text-[7px] font-black uppercase tracking-tighter ${result.topBracket >= rate ? 'text-blue-100' : 'text-slate-300'}`}>Layer {rate === 5 ? '1' : rate === 15 ? '2' : '3+'}</span>
                    </div>
                 ))}
              </div>

              <div className="bg-blue-50 border-2 border-dashed border-blue-200 p-6 rounded-[2rem] flex gap-4 items-start">
                 <Info size={24} className="text-blue-500 shrink-0" />
                 <p className="text-[10px] text-blue-800 leading-relaxed italic">
                    Perhitungan ini bersifat estimasi berdasarkan UU HPP No. 7 Tahun 2021. Hasil akhir dapat bervariasi tergantung pada tunjangan tidak tetap lainnya atau status keanggotaan BPJS yang lebih spesifik.
                 </p>
              </div>

              </div>
           <div className="h-20"></div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl flex p-1.5 z-50 border border-white/10 font-black text-xs">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>INPUT</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>HASIL</button>
      </div>
    </div>
  );
}