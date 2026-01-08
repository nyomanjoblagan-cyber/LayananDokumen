'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calculator, Banknote, 
  Wallet, Info, TrendingDown, Building2,
  PieChart, DollarSign, Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function PphPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <PphCalculator />
    </div>
  );
}

function PphCalculator() {
  // --- STATE INPUT ---
  const [salary, setSalary] = useState<number>(10000000); // Gaji Pokok
  const [allowance, setAllowance] = useState<number>(500000); // Tunjangan
  const [thr, setThr] = useState<number>(0); // Bonus/THR Tahunan
  const [ptkpStatus, setPtkpStatus] = useState<string>('TK/0');
  const [hasNpwp, setHasNpwp] = useState<boolean>(true);
  const [includeBPJS, setIncludeBPJS] = useState<boolean>(true); // Asumsi JHT 2% + JP 1%

  // --- STATE OUTPUT ---
  const [result, setResult] = useState({
    grossYear: 0,
    biayaJabatan: 0,
    iuranPensiun: 0,
    nettoYear: 0,
    ptkpAmount: 0,
    pkp: 0, // Penghasilan Kena Pajak
    taxYear: 0,
    taxMonth: 0,
    takeHomePay: 0,
    topBracket: 0 // Tarif tertinggi yang kena
  });

  // HELPER FORMAT
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // PTKP RATES
  const PTKP_LIST: Record<string, number> = {
    'TK/0': 54000000,
    'TK/1': 58500000,
    'TK/2': 63000000,
    'TK/3': 67500000,
    'K/0': 58500000,
    'K/1': 63000000,
    'K/2': 67500000,
    'K/3': 72000000,
  };

  // CALCULATION LOGIC (UU HPP Harmonisasi Peraturan Perpajakan)
  useEffect(() => {
    // 1. Penghasilan Bruto Setahun
    const grossMonth = salary + allowance;
    const grossYear = (grossMonth * 12) + thr;

    // 2. Pengurang (Deductions)
    // Biaya Jabatan: 5% dari Bruto, Max 6jt/tahun (500rb/bulan)
    let bJabatan = grossYear * 0.05;
    if (bJabatan > 6000000) bJabatan = 6000000;

    // Iuran Pensiun / JHT (Tanggungan Karyawan)
    // Asumsi standar: JHT 2% + JP 1% = 3% dari Gaji Pokok (bukan bruto total)
    let iPensiun = 0;
    if (includeBPJS) {
       iPensiun = (salary * 0.03) * 12;
    }

    // 3. Netto Setahun
    const netto = grossYear - bJabatan - iPensiun;

    // 4. PKP (Penghasilan Kena Pajak)
    const ptkpVal = PTKP_LIST[ptkpStatus] || 54000000;
    let pkpCalc = netto - ptkpVal;
    if (pkpCalc < 0) pkpCalc = 0;
    
    // Pembulatan PKP ke ribuan ke bawah (aturan pajak)
    pkpCalc = Math.floor(pkpCalc / 1000) * 1000;

    // 5. Hitung Pajak Progresif (Tarif Pasal 17 UU HPP)
    let tax = 0;
    let remainingPKP = pkpCalc;
    let bracket = 0;

    // Tier 1: 0 - 60jt (5%)
    if (remainingPKP > 0) {
       const tier1 = Math.min(remainingPKP, 60000000);
       tax += tier1 * 0.05;
       remainingPKP -= tier1;
       bracket = 5;
    }
    // Tier 2: 60jt - 250jt (15%)
    if (remainingPKP > 0) {
       const tier2 = Math.min(remainingPKP, 190000000); // 250 - 60 = 190
       tax += tier2 * 0.15;
       remainingPKP -= tier2;
       bracket = 15;
    }
    // Tier 3: 250jt - 500jt (25%)
    if (remainingPKP > 0) {
       const tier3 = Math.min(remainingPKP, 250000000); // 500 - 250 = 250
       tax += tier3 * 0.25;
       remainingPKP -= tier3;
       bracket = 25;
    }
    // Tier 4: 500jt - 5M (30%)
    if (remainingPKP > 0) {
       const tier4 = Math.min(remainingPKP, 4500000000); // 5M - 500jt
       tax += tier4 * 0.30;
       remainingPKP -= tier4;
       bracket = 30;
    }
    // Tier 5: > 5M (35%)
    if (remainingPKP > 0) {
       tax += remainingPKP * 0.35;
       bracket = 35;
    }

    // Denda Non-NPWP (120% tarif normal)
    if (!hasNpwp) {
       tax = tax * 1.2;
    }

    const monthlyTax = tax / 12;
    const thp = grossMonth - monthlyTax - (includeBPJS ? (salary * 0.03) : 0);

    setResult({
      grossYear,
      biayaJabatan: bJabatan,
      iuranPensiun: iPensiun,
      nettoYear: netto,
      ptkpAmount: ptkpVal,
      pkp: pkpCalc,
      taxYear: tax,
      taxMonth: monthlyTax,
      takeHomePay: thp,
      topBracket: bracket
    });

  }, [salary, allowance, thr, ptkpStatus, hasNpwp, includeBPJS]);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-slate-600 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Kalkulator PPh 21 <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">UU HPP</span>
          </h1>
          <p className="text-sm text-slate-500">Hitung pajak penghasilan & gaji bersih.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: INPUT --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Komponen Gaji</h3>
            
            <div className="space-y-5">
              {/* Gaji Pokok */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1 block">Gaji Pokok (Sebulan)</label>
                <div className="relative group">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs group-focus-within:text-blue-500">Rp</span>
                   <input type="number" className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                     value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                </div>
              </div>

              {/* Tunjangan */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1 block">Tunjangan Tetap (Sebulan)</label>
                <div className="relative group">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs group-focus-within:text-blue-500">Rp</span>
                   <input type="number" className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                     value={allowance} onChange={(e) => setAllowance(Number(e.target.value))} />
                </div>
              </div>

              {/* Bonus / THR */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1 block">Bonus / THR (Setahun)</label>
                <div className="relative group">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs group-focus-within:text-blue-500">Rp</span>
                   <input type="number" className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                     value={thr} onChange={(e) => setThr(Number(e.target.value))} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                 {/* PTKP */}
                 <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Status PTKP</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={ptkpStatus}
                      onChange={(e) => setPtkpStatus(e.target.value)}
                    >
                       <option value="TK/0">TK/0 (Lajang)</option>
                       <option value="TK/1">TK/1 (1 Tanggungan)</option>
                       <option value="TK/2">TK/2 (2 Tanggungan)</option>
                       <option value="TK/3">TK/3 (3 Tanggungan)</option>
                       <option value="K/0">K/0 (Nikah, 0 Anak)</option>
                       <option value="K/1">K/1 (Nikah, 1 Anak)</option>
                       <option value="K/2">K/2 (Nikah, 2 Anak)</option>
                       <option value="K/3">K/3 (Nikah, 3 Anak)</option>
                    </select>
                 </div>
                 
                 {/* OPTIONS */}
                 <div className="flex flex-col gap-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={hasNpwp} onChange={e => setHasNpwp(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                       <span className="text-xs font-medium text-slate-600">Punya NPWP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={includeBPJS} onChange={e => setIncludeBPJS(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                       <span className="text-xs font-medium text-slate-600">Hitung JHT (2%) & JP (1%)</span>
                    </label>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: RESULT --- */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* MAIN CARD: TAKE HOME PAY */}
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                 <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Estimasi Gaji Bersih (Bulanan)</p>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight">{formatRupiah(result.takeHomePay).replace(',00','')}</h2>
                    <p className="text-xs text-slate-500 mt-2">
                       *Setelah dipotong PPh 21 {includeBPJS ? '& Iuran BPJS (3%)' : ''}
                    </p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 min-w-[180px]">
                    <div className="text-xs text-slate-300 mb-1 flex items-center gap-1">
                       <Building2 size={12}/> Pajak Disetor Negara
                    </div>
                    <div className="text-xl font-bold text-red-400">{formatRupiah(result.taxMonth)}</div>
                    <div className="text-[10px] text-slate-400 mt-1">per bulan</div>
                 </div>
              </div>
           </div>

           {/* BREAKDOWN CARD */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <PieChart size={18} className="text-blue-600"/> Analisis Pajak Tahunan
                 </h3>
                 {result.topBracket > 0 ? (
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                       Lapisan Tarif Tertinggi: {result.topBracket}%
                    </span>
                 ) : (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                       Nihil Pajak (Di Bawah PTKP)
                    </span>
                 )}
              </div>
              
              <div className="p-6 space-y-3 text-sm">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500">Penghasilan Bruto Setahun</span>
                    <span className="font-bold text-slate-800">{formatRupiah(result.grossYear)}</span>
                 </div>
                 
                 <div className="pl-4 border-l-2 border-slate-200 space-y-2 my-2">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400 flex items-center gap-1">(-) Biaya Jabatan (Max 6jt)</span>
                       <span className="text-red-500">-{formatRupiah(result.biayaJabatan)}</span>
                    </div>
                    {includeBPJS && (
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 flex items-center gap-1">(-) Iuran Pensiun/JHT (3%)</span>
                          <span className="text-red-500">-{formatRupiah(result.iuranPensiun)}</span>
                       </div>
                    )}
                 </div>

                 <div className="flex justify-between items-center pt-2 border-t border-slate-100 border-dashed">
                    <span className="text-slate-500 font-medium">Penghasilan Netto</span>
                    <span className="font-bold text-slate-800">{formatRupiah(result.nettoYear)}</span>
                 </div>

                 <div className="flex justify-between items-center text-emerald-600">
                    <span className="flex items-center gap-1">(-) PTKP ({ptkpStatus}) <Info size={12}/></span>
                    <span className="font-bold">-{formatRupiah(result.ptkpAmount)}</span>
                 </div>

                 <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center mt-2 border border-blue-100">
                    <span className="text-blue-800 font-bold text-xs uppercase">PKP (Penghasilan Kena Pajak)</span>
                    <span className="text-blue-800 font-black text-lg">{formatRupiah(result.pkp)}</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-700 font-bold">Total PPh 21 Terutang (Tahun)</span>
                    <span className="text-red-600 font-black text-lg">{formatRupiah(result.taxYear)}</span>
                 </div>
              </div>
           </div>

           {/* INFO BRACKET */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-center">
              {[5, 15, 25, 30].map((rate) => (
                 <div key={rate} className={`p-2 rounded border ${result.topBracket >= rate ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' : 'bg-white text-slate-300 border-slate-100'}`}>
                    <div className="font-bold text-lg">{rate}%</div>
                    <div>{rate===5 ? '0-60jt' : rate===15 ? '60-250jt' : rate===25 ? '250-500jt' : '>500jt'}</div>
                 </div>
              ))}
           </div>

        </div>

      </div>
    </div>
  );
}