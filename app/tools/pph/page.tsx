'use client';

/**
 * FILE: PphPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Kalkulator PPh 21 (Pajak Penghasilan) sesuai UU HPP Terbaru
 * FEATURES:
 * - Real-time Calculation
 * - Progressive Tax Brackets (UU HPP 2022)
 * - PTKP Settings
 * - BPJS & NPWP Options
 * - Mobile Menu Fixed
 */

import { useState, useEffect, Suspense } from 'react';
import { 
  ArrowLeft, Calculator, Banknote, 
  Wallet, Info, TrendingDown, Building2,
  PieChart, DollarSign, Briefcase, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Kalkulator Pajak...</div>}>
      <PphCalculatorBuilder />
    </Suspense>
  );
}

function PphCalculatorBuilder() {
  // --- STATE SYSTEM ---
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
    grossYear: 0,
    biayaJabatan: 0,
    iuranPensiun: 0,
    nettoYear: 0,
    ptkpAmount: 0,
    pkp: 0, 
    taxYear: 0,
    taxMonth: 0,
    takeHomePay: 0,
    topBracket: 0 
  });

  useEffect(() => {
    setIsClient(true);
    
    // 1. PENGHASILAN BRUTO
    const grossMonth = salary + allowance;
    const grossYear = (grossMonth * 12) + thr;

    // 2. PENGURANG
    let bJabatan = grossYear * 0.05;
    if (bJabatan > 6000000) bJabatan = 6000000; // Max 6jt/tahun atau 500rb/bulan

    let iPensiun = 0;
    if (includeBPJS) {
       iPensiun = (salary * 0.03) * 12; // Estimasi JHT (2%) + JP (1%)
    }

    // 3. PENGHASILAN NETTO
    const netto = grossYear - bJabatan - iPensiun;
    
    // 4. PTKP & PKP
    const ptkpVal = PTKP_LIST[ptkpStatus] || 54000000;
    let pkpCalc = netto - ptkpVal;
    if (pkpCalc < 0) pkpCalc = 0;
    pkpCalc = Math.floor(pkpCalc / 1000) * 1000; // Pembulatan ke ribuan ke bawah

    // 5. PERHITUNGAN PAJAK PROGRESIF (UU HPP)
    let tax = 0;
    let remainingPKP = pkpCalc;
    let bracket = 0;

    // Tier 1: 0 - 60 Juta (5%)
    if (remainingPKP > 0) {
       const tier1 = Math.min(remainingPKP, 60000000);
       tax += tier1 * 0.05;
       remainingPKP -= tier1;
       bracket = 5;
    }
    // Tier 2: 60 - 250 Juta (15%)
    if (remainingPKP > 0) {
       const tier2 = Math.min(remainingPKP, 190000000); // 250 - 60 = 190
       tax += tier2 * 0.15;
       remainingPKP -= tier2;
       bracket = 15;
    }
    // Tier 3: 250 - 500 Juta (25%)
    if (remainingPKP > 0) {
       const tier3 = Math.min(remainingPKP, 250000000); // 500 - 250 = 250
       tax += tier3 * 0.25;
       remainingPKP -= tier3;
       bracket = 25;
    }
    // Tier 4: 500 Juta - 5 Miliar (30%)
    if (remainingPKP > 0) {
       const tier4 = Math.min(remainingPKP, 4500000000); // 5M - 500jt
       tax += tier4 * 0.30;
       remainingPKP -= tier4;
       bracket = 30;
    }
    // Tier 5: > 5 Miliar (35%)
    if (remainingPKP > 0) {
       tax += remainingPKP * 0.35;
       bracket = 35;
    }

    // Denda NPWP (20% lebih tinggi)
    if (!hasNpwp) tax = tax * 1.2;

    const monthlyTax = tax / 12;
    // THP = Gross - Pajak - BPJS (jika ada)
    const thp = grossMonth - monthlyTax - (includeBPJS ? (salary * 0.03) : 0);

    setResult({
      grossYear, biayaJabatan: bJabatan, iuranPensiun: iPensiun,
      nettoYear: netto, ptkpAmount: ptkpVal, pkp: pkpCalc,
      taxYear: tax, taxMonth: monthlyTax, takeHomePay: thp, topBracket: bracket
    });
  }, [salary, allowance, thr, ptkpStatus, hasNpwp, includeBPJS]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* HEADER NAV */}
      <div className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter">
               <Calculator size={16} /> <span>PPh 21 Calculator (UU HPP)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-600/20 px-3 py-1 rounded-lg border border-blue-500/30">
            <TrendingDown size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Tax Year 2026</span>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* SIDEBAR INPUT */}
        <div className={`w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b border-blue-200 pb-1 flex items-center gap-2"><DollarSign size={12}/> Pendapatan Bulanan</h3>
              <div className="space-y-3">
                <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Tetap</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={allowance} onChange={(e) => setAllowance(Number(e.target.value))} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Parameter Lainnya</h3>
              <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bonus / THR (Tahunan)</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={thr} onChange={(e) => setThr(Number(e.target.value))} />
              </div>
              <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Status PTKP</label>
                  <select className="w-full p-2 border rounded-lg text-sm font-bold mt-1 bg-slate-50" value={ptkpStatus} onChange={(e) => setPtkpStatus(e.target.value)}>
                    <option value="TK/0">TK/0 (Lajang)</option>
                    <option value="TK/1">TK/1 (1 Tanggungan)</option>
                    <option value="TK/2">TK/2 (2 Tanggungan)</option>
                    <option value="TK/3">TK/3 (3 Tanggungan)</option>
                    <option value="K/0">K/0 (Menikah)</option>
                    <option value="K/1">K/1 (Menikah, 1 Anak)</option>
                    <option value="K/2">K/2 (Menikah, 2 Anak)</option>
                    <option value="K/3">K/3 (Menikah, 3 Anak)</option>
                  </select>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={hasNpwp} onChange={e => setHasNpwp(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600">Memiliki NPWP</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={includeBPJS} onChange={e => setIncludeBPJS(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600">Potong BPJS TK (3%)</span>
                </label>
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 flex flex-col items-center overflow-hidden h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 md:p-8 h-full custom-scrollbar">
              
              <div className="origin-top transition-transform duration-300 transform scale-[0.9] sm:scale-[1] w-full max-w-2xl space-y-6">
                
                {/* TAKE HOME PAY CARD */}
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Estimasi Gaji Bersih</p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{formatRupiah(result.takeHomePay)}</h2>
                  <div className="mt-6 flex items-center gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold">Pajak / Bulan</p>
                      <p className="text-red-400 font-bold">{formatRupiah(result.taxMonth)}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold">BPJS / Bulan</p>
                      <p className="text-orange-400 font-bold">{formatRupiah(includeBPJS ? salary * 0.03 : 0)}</p>
                    </div>
                  </div>
                </div>

                {/* BREAKDOWN DETAIL */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><PieChart size={14}/> Rincian Perhitungan</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${result.topBracket > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {result.topBracket > 0 ? `Tarif ${result.topBracket}%` : 'Bebas Pajak'}
                    </span>
                  </div>
                  <div className="p-6 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Penghasilan Bruto (Tahun)</span>
                      <span className="font-bold">{formatRupiah(result.grossYear)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-red-500 pl-4 border-l-2 border-red-100">
                      <span>Biaya Jabatan & Pensiun</span>
                      <span>- {formatRupiah(result.biayaJabatan + result.iuranPensiun)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-green-600 pl-4 border-l-2 border-green-100">
                      <span>PTKP ({ptkpStatus})</span>
                      <span>- {formatRupiah(result.ptkpAmount)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t border-dashed font-bold text-blue-700">
                      <span>Penghasilan Kena Pajak (PKP)</span>
                      <span>{formatRupiah(result.pkp)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2 border-t">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total PPh 21 Terutang</div>
                      <div className="text-2xl font-black text-slate-900">{formatRupiah(result.taxYear)}<span className="text-xs font-normal text-slate-400"> / tahun</span></div>
                    </div>
                  </div>
                </div>

                {/* PROGRESSIVE BRACKETS VISUAL */}
                <div className="grid grid-cols-4 gap-2">
                  {[5, 15, 25, 35].map((t) => (
                    <div key={t} className={`p-3 rounded-xl border text-center transition-all ${result.topBracket >= t ? 'bg-blue-600 border-blue-600 shadow-lg -translate-y-1' : 'bg-white border-slate-200 opacity-40'}`}>
                      <div className={`text-sm font-black ${result.topBracket >= t ? 'text-white' : 'text-slate-400'}`}>{t}%</div>
                      <div className={`text-[8px] font-bold uppercase ${result.topBracket >= t ? 'text-blue-100' : 'text-slate-300'}`}>{t === 5 ? 'Tier 1' : t === 15 ? 'Tier 2' : 'Tier 3+'}</div>
                    </div>
                  ))}
                </div>

              </div>
              <div className="h-12"></div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Input</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Hasil</button>
      </div>

    </div>
  );
}
