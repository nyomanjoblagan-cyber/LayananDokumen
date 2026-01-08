'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Home, Percent, Calendar, 
  Banknote, Info, ChevronDown, ChevronUp,
  Wallet, ShieldCheck, FileText, PieChart
} from 'lucide-react';
import Link from 'next/link';

export default function KPRPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <KPRCalculator />
    </div>
  );
}

function KPRCalculator() {
  // --- STATE INPUT ---
  const [price, setPrice] = useState<number>(850000000);
  const [dpPercent, setDpPercent] = useState<number>(15);
  const [fixRate, setFixRate] = useState<number>(4.99);
  const [fixYears, setFixYears] = useState<number>(3);
  const [floatRate, setFloatRate] = useState<number>(11.5);
  const [tenor, setTenor] = useState<number>(20);
  const [income, setIncome] = useState<number>(15000000); // Gaji bulanan
  const [showDetails, setShowDetails] = useState(false);

  // --- STATE OUTPUT ---
  const [result, setResult] = useState({
    loanAmount: 0,
    dpAmount: 0,
    fixMonthly: 0,
    floatMonthly: 0,
    // Biaya Awal
    provisonFee: 0,
    adminFee: 0,
    appraisalFee: 0,
    insuranceFee: 0,
    notaryFee: 0,
    bphtb: 0,
    totalUpfront: 0,
    // Analisa
    dsr: 0, // Debt Service Ratio
    status: 'safe' // safe, warning, danger
  });

  // HELPER FORMAT
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // CALCULATE LOGIC (Realistis Indonesia)
  useEffect(() => {
    const dp = price * (dpPercent / 100);
    const loan = price - dp;
    const totalMonths = tenor * 12;
    const fixMonths = fixYears * 12;

    // 1. CICILAN FIX (Anuitas)
    const iFix = (fixRate / 100) / 12;
    let pmtFix = 0;
    if (iFix > 0) {
      pmtFix = (loan * iFix) / (1 - Math.pow(1 + iFix, -totalMonths));
    } else {
      pmtFix = loan / totalMonths;
    }

    // 2. SISA POKOK (setelah masa fix)
    const remainingMonths = totalMonths - fixMonths;
    let remainingPrincipal = 0;
    if (iFix > 0) {
        // Rumus sisa pokok anuitas
        remainingPrincipal = (pmtFix / iFix) * (1 - Math.pow(1 + iFix, -remainingMonths));
    } else {
        remainingPrincipal = loan - (pmtFix * fixMonths);
    }

    // 3. CICILAN FLOATING
    const iFloat = (floatRate / 100) / 12;
    let pmtFloat = 0;
    if (remainingMonths > 0) {
        if (iFloat > 0) {
            pmtFloat = (remainingPrincipal * iFloat) / (1 - Math.pow(1 + iFloat, -remainingMonths));
        } else {
            pmtFloat = remainingPrincipal / remainingMonths;
        }
    }

    // 4. BIAYA AWAL (Estimasi Pasar)
    const provisi = loan * 0.01; // 1% dari Plafon
    const admin = 500000; // Flat rata-rata
    const appraisal = 1000000; // Flat rata-rata
    const asuransi = loan * 0.025; // Jiwa + Kebakaran (Estimasi 2.5% single premium)
    const notaris = price * 0.01; // Estimasi 1% harga jual (AJB, BN, Cek Sertifikat)
    
    // BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan)
    // Rumus: 5% x (Harga Transaksi - NPOPTKP). NPOPTKP beda tiap daerah (misal Jkt 80jt, rata2 60jt).
    // Kita asumsi NPOPTKP = 60.000.000
    const npoptkp = 60000000;
    const taxableValue = price - npoptkp;
    const bphtb = taxableValue > 0 ? taxableValue * 0.05 : 0;

    const upfront = dp + provisi + admin + appraisal + asuransi + notaris + bphtb;

    // 5. ANALISA GAJI (DSR)
    const ratio = (pmtFix / income) * 100;
    let stat = 'safe';
    if (ratio > 35) stat = 'danger';
    else if (ratio > 30) stat = 'warning';

    setResult({
      loanAmount: loan,
      dpAmount: dp,
      fixMonthly: pmtFix,
      floatMonthly: pmtFloat,
      provisonFee: provisi,
      adminFee: admin,
      appraisalFee: appraisal,
      insuranceFee: asuransi,
      notaryFee: notaris,
      bphtb: bphtb,
      totalUpfront: upfront,
      dsr: ratio,
      status: stat
    });

  }, [price, dpPercent, fixRate, fixYears, floatRate, tenor, income]);

  // PIE CHART DATA HELPER
  const dpPercentage = (result.dpAmount / result.totalUpfront) * 100 || 0;
  const bphtbPercentage = (result.bphtb / result.totalUpfront) * 100 || 0;
  const bankFeesPercentage = 100 - dpPercentage - bphtbPercentage;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-slate-600 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            KPR Calculator <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">Expert</span>
          </h1>
          <p className="text-sm text-slate-500">Simulasi cicilan, biaya pajak (BPHTB), dan notaris.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: INPUT --- */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Parameter KPR</h3>
            
            <div className="space-y-5">
              {/* Harga & DP */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1 block">Harga Properti</label>
                <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">Rp</span>
                   <input type="number" className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" 
                     value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                   <label className="font-semibold text-slate-700">Uang Muka (DP)</label>
                   <span className="font-bold text-emerald-600">{dpPercent}%</span>
                </div>
                <input type="range" min="0" max="50" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))} />
                <div className="text-right text-xs text-slate-400 mt-1">{formatRupiah(result.dpAmount)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Bunga Fix (%)</label>
                    <input type="number" step="0.1" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                      value={fixRate} onChange={(e) => setFixRate(Number(e.target.value))} />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Masa Fix (Thn)</label>
                    <input type="number" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                      value={fixYears} onChange={(e) => setFixYears(Number(e.target.value))} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Bunga Floating (%)</label>
                    <input type="number" step="0.1" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                      value={floatRate} onChange={(e) => setFloatRate(Number(e.target.value))} />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Tenor (Thn)</label>
                    <input type="number" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                      value={tenor} onChange={(e) => setTenor(Number(e.target.value))} />
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <label className="text-sm font-semibold text-slate-700 mb-1 block">Penghasilan Bulanan (Gabungan)</label>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">Rp</span>
                   <input type="number" className="w-full pl-8 pr-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-bold text-blue-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                     value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Digunakan untuk analisis kemampuan bayar.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- MIDDLE COLUMN: RESULT VISUAL --- */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* 1. STATUS CARD */}
           <div className={`p-6 rounded-2xl border-l-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
              result.status === 'safe' ? 'bg-emerald-50 border-emerald-500' : 
              result.status === 'warning' ? 'bg-amber-50 border-amber-500' : 
              'bg-red-50 border-red-500'
           }`}>
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-full ${
                    result.status === 'safe' ? 'bg-emerald-200 text-emerald-700' : 
                    result.status === 'warning' ? 'bg-amber-200 text-amber-700' : 
                    'bg-red-200 text-red-700'
                 }`}>
                    {result.status === 'safe' ? <ShieldCheck size={32}/> : <Info size={32}/>}
                 </div>
                 <div>
                    <h2 className={`text-xl font-bold ${
                       result.status === 'safe' ? 'text-emerald-800' : 
                       result.status === 'warning' ? 'text-amber-800' : 
                       'text-red-800'
                    }`}>
                       {result.status === 'safe' ? 'Keuangan Aman (Disetujui)' : 
                        result.status === 'warning' ? 'Waspada (Agak Berat)' : 
                        'Berisiko Ditolak Bank'}
                    </h2>
                    <p className="text-sm opacity-80">
                       Rasio cicilan: <strong>{result.dsr.toFixed(1)}%</strong> dari gaji (Ideal &lt; 30%)
                    </p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-xs uppercase font-bold opacity-60 mb-1">Angsuran Mulai</p>
                 <p className={`text-3xl font-black ${
                    result.status === 'safe' ? 'text-emerald-700' : 
                    result.status === 'warning' ? 'text-amber-700' : 
                    'text-red-700'
                 }`}>{formatRupiah(result.fixMonthly).replace(',00','')}</p>
              </div>
           </div>

           {/* 2. TIMELINE ANGSURAN */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white p-4 text-sm font-bold flex justify-between">
                 <span>Timeline Angsuran</span>
                 <span>Plafon: {formatRupiah(result.loanAmount)}</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                 
                 {/* Masa Fix */}
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Masa Fix ({fixYears} Thn)</span>
                       <span className="text-xs text-slate-400">Bunga {fixRate}%</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">{formatRupiah(result.fixMonthly).replace(',00','')}</div>
                    <p className="text-xs text-slate-500">Angsuran stabil selama {fixYears} tahun pertama.</p>
                 </div>

                 {/* Masa Floating */}
                 <div className="relative z-10 md:border-l md:border-dashed md:border-slate-300 md:pl-8">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Masa Floating (Est.)</span>
                       <span className="text-xs text-slate-400">Bunga {floatRate}%</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">{formatRupiah(result.floatMonthly).replace(',00','')}</div>
                    <p className="text-xs text-slate-500">
                       Naik sebesar <strong className="text-red-500">+{formatRupiah(result.floatMonthly - result.fixMonthly)}</strong> setelah promo berakhir.
                    </p>
                 </div>

              </div>
           </div>

           {/* 3. RINCIAN BIAYA AWAL (TOTAL COST) */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
              >
                 <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                       <Wallet size={20} />
                    </div>
                    <div className="text-left">
                       <h3 className="font-bold text-slate-800">Total Modal Awal (Estimasi)</h3>
                       <p className="text-xs text-slate-500">Uang yang harus disiapkan Tunai saat akad.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-slate-800">{formatRupiah(result.totalUpfront).replace(',00','')}</span>
                    {showDetails ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
                 </div>
              </button>

              {showDetails && (
                 <div className="border-t border-slate-100 bg-slate-50/50 p-5 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                       
                       {/* PIE CHART VISUALIZATION (CSS Conic Gradient) */}
                       <div className="md:col-span-2 mb-6 flex flex-col items-center">
                          <div className="relative w-32 h-32 rounded-full shadow-inner mb-4" 
                               style={{
                                 background: `conic-gradient(
                                   #10b981 0% ${dpPercentage}%, 
                                   #3b82f6 ${dpPercentage}% ${dpPercentage + bphtbPercentage}%, 
                                   #f59e0b ${dpPercentage + bphtbPercentage}% 100%
                                 )`
                               }}
                          >
                             <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center flex-col">
                                <span className="text-[10px] text-slate-400">Total Biaya</span>
                                <span className="font-bold text-xs">Rp { (result.totalUpfront / 1000000).toFixed(1) } Jt</span>
                             </div>
                          </div>
                          
                          {/* Legend */}
                          <div className="flex gap-4 text-xs">
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>DP ({dpPercentage.toFixed(0)}%)</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Pajak ({bphtbPercentage.toFixed(0)}%)</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Lainnya ({bankFeesPercentage.toFixed(0)}%)</div>
                          </div>
                       </div>

                       <div className="flex justify-between font-bold text-slate-700 pb-2 border-b border-slate-200 md:col-span-2 mb-2">
                          <span>Komponen Biaya</span>
                          <span>Estimasi</span>
                       </div>
                       
                       <div className="flex justify-between">
                          <span className="text-slate-600">1. Uang Muka (DP) ke Developer</span>
                          <span className="font-semibold">{formatRupiah(result.dpAmount)}</span>
                       </div>
                       <div className="flex justify-between">
                          {/* FIX: Use span wrapper for title/tooltip */}
                          <span className="text-slate-600 flex items-center gap-1" title="5% x (Harga - NPOPTKP 60jt)">
                             2. BPHTB (Pajak Pembeli) <Info size={12} className="text-slate-400 cursor-help" />
                          </span>
                          <span className="font-semibold">{formatRupiah(result.bphtb)}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-600">3. Provisi Bank (1%)</span>
                          <span className="font-semibold">{formatRupiah(result.provisonFee)}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-600">4. Biaya Notaris (Est. 1%)</span>
                          <span className="font-semibold">{formatRupiah(result.notaryFee)}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-600">5. Asuransi (Jiwa + Kebakaran)</span>
                          <span className="font-semibold">{formatRupiah(result.insuranceFee)}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-600">6. Administrasi & Appraisal</span>
                          <span className="font-semibold">{formatRupiah(result.adminFee + result.appraisalFee)}</span>
                       </div>
                    </div>
                    <div className="mt-4 text-[10px] text-slate-400 text-right italic">
                       *Angka di atas adalah estimasi umum. Biaya Notaris & Asuransi bisa bervariasi tergantung rekanan bank dan usia pemohon.
                    </div>
                 </div>
              )}
           </div>

        </div>

      </div>
    </div>
  );
}