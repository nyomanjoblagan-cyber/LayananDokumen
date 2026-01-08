'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Percent, ShoppingBag, 
  Calculator, Tag, Receipt, RefreshCcw, 
  AlertCircle, TicketPercent
} from 'lucide-react';
import Link from 'next/link';

export default function DiskonPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- HEADER NAVIGASI --- */}
      <div className="bg-slate-900 text-white shadow-md sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <div className="bg-slate-800 p-1.5 rounded-full group-hover:bg-slate-700 transition-colors">
                 <ArrowLeft size={16} /> 
              </div>
              <span className="text-sm font-medium">Kembali ke Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase hidden md:flex items-center gap-2">
              <Calculator size={16}/> Kalkulator Diskon
            </h1>
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 font-medium">
            Hitung hematnya, belanja cerdas.
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
         <DiscountCalculator />
      </div>
    </div>
  );
}

function DiscountCalculator() {
  // --- STATE ---
  const [mode, setMode] = useState<'percent' | 'promo'>('percent');
  
  // Mode Percent
  const [price, setPrice] = useState<number>(0);
  const [disc1, setDisc1] = useState<number>(0);
  const [disc2, setDisc2] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  
  // Mode Promo
  const [buyQty, setBuyQty] = useState<number>(2);
  const [getQty, setGetQty] = useState<number>(1);

  // Output
  const [result, setResult] = useState({
    finalPrice: 0,
    totalSave: 0,
    effectiveDisc: 0,
    taxAmount: 0, // Di mode promo, ini dipakai untuk "Harga Per Item"
    itemCount: 0  // Total barang didapat
  });

  // HELPER FORMAT RUPIAH
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // LOGIC PERHITUNGAN
  useEffect(() => {
    if (mode === 'percent') {
      // Logic Diskon Bertingkat: Harga -> Diskon 1 -> Diskon 2 -> Pajak
      const priceAfterD1 = price * (1 - disc1 / 100);
      const priceAfterD2 = priceAfterD1 * (1 - disc2 / 100);
      
      const taxAmt = priceAfterD2 * (tax / 100);
      const final = priceAfterD2 + taxAmt;
      
      const save = price - priceAfterD2; // Hemat real (sebelum pajak, karena pajak itu extra cost)
      const effDisc = price > 0 ? ((price - priceAfterD2) / price) * 100 : 0;

      setResult({
        finalPrice: final,
        totalSave: save,
        effectiveDisc: effDisc,
        taxAmount: taxAmt,
        itemCount: 1
      });
    } else {
      // Logic Buy X Get Y
      const totalItems = buyQty + getQty;
      if (totalItems === 0 || price === 0) {
          setResult({ finalPrice: 0, totalSave: 0, effectiveDisc: 0, taxAmount: 0, itemCount: 0 });
          return;
      }

      const itemsPaid = buyQty;
      const totalPricePaid = price * itemsPaid; // Total bayar
      const totalPriceNormal = price * totalItems; // Harga normal kalau beli semua tanpa promo
      
      const save = totalPriceNormal - totalPricePaid;
      const effectiveDisc = (save / totalPriceNormal) * 100;
      const finalPerItem = totalPricePaid / totalItems; // Harga jatuhnya satuan

      setResult({
        finalPrice: totalPricePaid,
        totalSave: save,
        effectiveDisc: effectiveDisc,
        taxAmount: finalPerItem, // HACK: field taxAmount dipakai untuk harga satuan
        itemCount: totalItems
      });
    }
  }, [price, disc1, disc2, tax, buyQty, getQty, mode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* --- KOLOM KIRI: INPUT FORM --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100">
           <button 
             onClick={() => setMode('percent')}
             className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${mode === 'percent' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/30' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
           >
             <Percent size={16}/> Diskon Persen (%)
           </button>
           <button 
             onClick={() => setMode('promo')}
             className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${mode === 'promo' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/30' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
           >
             <ShoppingBag size={16}/> Promo Buy X Get Y
           </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
           
           {/* Input Harga Utama */}
           <div>
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Harga Awal / Satuan</label>
             <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xl font-bold group-focus-within:text-emerald-500 transition-colors">Rp</span>
                <input 
                  type="number" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-2xl font-black text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-200"
                  placeholder="0"
                  value={price || ''}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  autoFocus
                />
             </div>
           </div>

           {/* KONTEN BERDASARKAN MODE */}
           {mode === 'percent' ? (
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Diskon Utama</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           className="w-full pl-4 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-lg font-bold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                           placeholder="0"
                           value={disc1 || ''}
                           onChange={(e) => setDisc1(Number(e.target.value))}
                         />
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                   </div>
                   <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-1">
                         + Diskon Ke-2 <span className="bg-orange-100 text-orange-600 text-[9px] px-1 rounded">Bertingkat</span>
                      </label>
                      <div className="relative">
                         <input 
                           type="number" 
                           className="w-full pl-4 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-lg font-bold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                           placeholder="0"
                           value={disc2 || ''}
                           onChange={(e) => setDisc2(Number(e.target.value))}
                         />
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                   </div>
                </div>

                {/* PPN Selection */}
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Pajak Pertambahan Nilai (PPN)</label>
                   <div className="flex gap-3">
                      <button onClick={() => setTax(0)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold border-2 transition-all ${tax === 0 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}>
                         Tanpa Pajak (0%)
                      </button>
                      <button onClick={() => setTax(11)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold border-2 transition-all ${tax === 11 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}>
                         PPN 11%
                      </button>
                      <button onClick={() => setTax(12)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold border-2 transition-all ${tax === 12 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}>
                         PPN 12%
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             /* MODE PROMO BUY X GET Y */
             <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                <h3 className="text-sm font-bold text-orange-800 uppercase mb-4 flex items-center gap-2">
                   <TicketPercent size={18}/> Atur Skema Promo
                </h3>
                <div className="flex items-center justify-center gap-4 text-center">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-orange-200 w-full">
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Beli (Bayar)</label>
                      <input type="number" className="w-full py-1 text-center text-3xl font-black text-orange-600 bg-transparent border-none focus:outline-none" value={buyQty} onChange={(e) => setBuyQty(Number(e.target.value))}/>
                   </div>
                   <div className="text-orange-300 font-black text-2xl">+</div>
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-orange-200 w-full">
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Dapat Gratis</label>
                      <input type="number" className="w-full py-1 text-center text-3xl font-black text-orange-600 bg-transparent border-none focus:outline-none" value={getQty} onChange={(e) => setGetQty(Number(e.target.value))}/>
                   </div>
                </div>
                <div className="mt-4 text-center">
                   <p className="text-xs font-medium text-orange-700 bg-white/50 inline-block px-3 py-1 rounded-full">
                      Anda Pulang Bawa: <strong>{buyQty + getQty} Barang</strong>
                   </p>
                </div>
             </div>
           )}

           <div className="pt-4 flex justify-end">
              <button onClick={() => {setPrice(0); setDisc1(0); setDisc2(0);}} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 font-medium transition-colors">
                 <RefreshCcw size={12}/> Reset Form
              </button>
           </div>
        </div>
      </div>

      {/* --- KOLOM KANAN: HASIL / STRUK --- */}
      <div className="relative">
         
         <div className="bg-slate-900 rounded-2xl text-white shadow-2xl p-6 md:p-10 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -ml-10 -mb-10"></div>
            
            <div className="relative z-10">
               <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-700 pb-4">Rincian Perhitungan</h2>
               
               <div className="space-y-6">
                  {/* Final Price Big */}
                  <div>
                     <p className="text-sm text-slate-400 mb-1">Total yang harus dibayar</p>
                     <p className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        {formatRupiah(result.finalPrice)}
                     </p>
                  </div>

                  {/* Hemat */}
                  {(result.totalSave > 0 || result.effectiveDisc > 0) && (
                     <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-emerald-500 text-white p-2 rounded-lg shadow-lg shadow-emerald-500/20 hidden sm:block">
                           <Tag size={24} />
                        </div>
                        <div>
                           <p className="text-xs text-emerald-300 font-bold uppercase">Anda Hemat (Profit)</p>
                           <p className="text-xl font-bold text-white">{formatRupiah(result.totalSave)}</p>
                           <p className="text-xs text-slate-300 mt-0.5">Diskon Efektif: <strong className="text-white">{result.effectiveDisc.toFixed(1)}%</strong></p>
                        </div>
                     </div>
                  )}

                  {/* Detail List */}
                  <div className="space-y-3 text-sm pt-4">
                     <div className="flex justify-between text-slate-400">
                        <span>Harga Normal (Awal)</span>
                        <span className="line-through">{formatRupiah(mode === 'percent' ? price : price * (buyQty + getQty))}</span>
                     </div>
                     
                     {mode === 'percent' && tax > 0 && (
                        <div className="flex justify-between text-slate-300">
                           <span>+ Pajak PPN ({tax}%)</span>
                           <span>{formatRupiah(result.taxAmount)}</span>
                        </div>
                     )}

                     {mode === 'promo' && (
                        <div className="flex justify-between text-emerald-300 bg-emerald-900/30 p-2 rounded">
                           <span>Harga Jatuhnya / Pcs</span>
                           <span className="font-bold">{formatRupiah(result.taxAmount)}</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Footer Struk */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-700 border-dashed">
               <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <Receipt size={14}/>
                  <span>Simulasi Struk Belanja</span>
               </div>
            </div>
         </div>

         {/* Info Card */}
         <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800 leading-relaxed">
               <strong>Tips Belanja:</strong> {mode === 'percent' ? 'Diskon bertingkat (contoh 50% + 20%) tidak sama dengan diskon 70%. Kenyataannya itu setara diskon 60%. Selalu cek harga akhir!' : `Promo "Buy ${buyQty} Get ${getQty}" setara dengan diskon ${result.effectiveDisc.toFixed(0)}%.`}
            </div>
         </div>

      </div>

    </div>
  );
}