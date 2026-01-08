'use client';

import { useState, Suspense, useMemo } from 'react';
import { 
  Printer, ArrowLeft, Calculator, Wallet, 
  CalendarDays, Briefcase, Info, AlertTriangle, Scale
} from 'lucide-react';
import Link from 'next/link';

export default function PesangonPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Kalkulator...</div>}>
      <PesangonCalculatorBuilder />
    </Suspense>
  );
}

function PesangonCalculatorBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // DATA KARYAWAN
    name: 'BUDI SANTOSO',
    joinDate: '2015-01-01',
    phkDate: '2026-01-08',
    salary: 8000000, // Gaji Pokok + Tunjangan Tetap
    
    // ALASAN PHK (Mempengaruhi Koefisien Pesangon)
    // Berdasarkan PP 35/2021
    reason: 'efisiensi', // efisiensi, pensiun, pelanggaran, meninggal, dll
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- LOGIKA PERHITUNGAN (PP 35/2021) ---
  const calculation = useMemo(() => {
    const start = new Date(data.joinDate);
    const end = new Date(data.phkDate);
    
    // 1. Hitung Masa Kerja dalam Tahun
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const roundedYears = Math.floor(diffYears);

    // 2. Tentukan Uang Pesangon (UP) - Pasal 40 (2)
    let upMultiplier = 0;
    if (diffYears < 1) upMultiplier = 1;
    else if (diffYears < 2) upMultiplier = 2;
    else if (diffYears < 3) upMultiplier = 3;
    else if (diffYears < 4) upMultiplier = 4;
    else if (diffYears < 5) upMultiplier = 5;
    else if (diffYears < 6) upMultiplier = 6;
    else if (diffYears < 7) upMultiplier = 7;
    else if (diffYears < 8) upMultiplier = 8;
    else upMultiplier = 9;

    // 3. Tentukan UPMK (Uang Penghargaan Masa Kerja) - Pasal 40 (3)
    let upmkMultiplier = 0;
    if (diffYears >= 3 && diffYears < 6) upmkMultiplier = 2;
    else if (diffYears < 9) upmkMultiplier = 3;
    else if (diffYears < 12) upmkMultiplier = 4;
    else if (diffYears < 15) upmkMultiplier = 5;
    else if (diffYears < 18) upmkMultiplier = 6;
    else if (diffYears < 21) upmkMultiplier = 7;
    else if (diffYears < 24) upmkMultiplier = 8;
    else if (diffYears >= 24) upmkMultiplier = 10;

    // 4. Tentukan Koefisien berdasarkan Alasan PHK
    let reasonCoefficient = 1.0;
    if (data.reason === 'efisiensi') reasonCoefficient = 1.0;
    else if (data.reason === 'pelanggaran') reasonCoefficient = 0.5;
    else if (data.reason === 'pensiun') reasonCoefficient = 1.75;
    else if (data.reason === 'meninggal') reasonCoefficient = 2.0;
    else if (data.reason === 'tutup_kerugian') reasonCoefficient = 0.5;

    const totalUP = upMultiplier * data.salary * reasonCoefficient;
    const totalUPMK = upmkMultiplier * data.salary;
    const totalUPH = (totalUP + totalUPMK) * 0.15; // Contoh UPH 15% (Penggantian Perumahan & Pengobatan)

    return {
      years: roundedYears,
      months: Math.floor((diffYears - roundedYears) * 12),
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

  // --- KOMPONEN CETAK ---
  const SuratKonten = () => (
    <div className="bg-white mx-auto flex flex-col font-serif p-[20mm] text-[11pt] leading-normal text-slate-900 border print:border-none print:p-[15mm]" 
         style={{ width: '210mm', height: '296mm', boxSizing: 'border-box' }}>
      
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="font-black text-xl uppercase tracking-tighter underline">RINCIAN PERHITUNGAN PESANGON</h1>
        <p className="text-sm mt-1 font-sans">Berdasarkan PP No. 35 Tahun 2021</p>
      </div>

      <div className="space-y-6 flex-grow font-sans">
        <section className="grid grid-cols-2 gap-8 text-sm bg-slate-50 p-4 rounded-lg border">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Nama Karyawan</p>
            <p className="font-bold">{data.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Gaji Terakhir (Pokok + Tun. Tetap)</p>
            <p className="font-bold text-emerald-700">{formatRupiah(data.salary)}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Masa Kerja</p>
            <p className="font-bold">{calculation.years} Tahun {calculation.months} Bulan</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Alasan PHK</p>
            <p className="font-bold uppercase text-red-600">{data.reason.replace('_', ' ')} (x{calculation.reasonCoefficient})</p>
          </div>
        </section>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-3 text-left text-xs uppercase">Komponen Hak</th>
              <th className="p-3 text-right text-xs uppercase">Perhitungan</th>
              <th className="p-3 text-right text-xs uppercase">Subtotal</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="p-3 font-bold">Uang Pesangon (UP)</td>
              <td className="p-3 text-right">{calculation.upMultiplier} x {formatRupiah(data.salary)} x {calculation.reasonCoefficient}</td>
              <td className="p-3 text-right font-bold">{formatRupiah(calculation.totalUP)}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-bold">Penghargaan Masa Kerja (UPMK)</td>
              <td className="p-3 text-right">{calculation.upmkMultiplier} x {formatRupiah(data.salary)}</td>
              <td className="p-3 text-right font-bold">{formatRupiah(calculation.totalUPMK)}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-bold">Penggantian Hak (UPH 15%)</td>
              <td className="p-3 text-right">15% x (UP + UPMK)</td>
              <td className="p-3 text-right font-bold">{formatRupiah(calculation.totalUPH)}</td>
            </tr>
            <tr className="bg-emerald-50 text-emerald-900">
              <td colSpan={2} className="p-4 text-lg font-black uppercase text-right tracking-tight">Total Terima (Bruto)</td>
              <td className="p-4 text-lg font-black text-right">{formatRupiah(calculation.grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 items-start">
           <Info size={18} className="text-amber-600 shrink-0" />
           <p className="text-[10px] text-amber-800 leading-relaxed italic">
             *Perhitungan ini bersifat estimasi berdasarkan PP 35/2021. Hasil akhir dapat berbeda tergantung pada kebijakan perusahaan atau Perjanjian Kerja Bersama (PKB) yang berlaku. Pajak Penghasilan (PPh 21) atas pesangon belum diperhitungkan.
           </p>
        </div>
      </div>

      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8">
         <div className="text-center">
            <p className="text-[10px] text-slate-400 mb-10 uppercase tracking-widest font-bold font-sans">Diverifikasi Oleh</p>
            <div className="w-40 border-b border-slate-300"></div>
            <p className="text-[10px] mt-1 font-sans">HRD / Management</p>
         </div>
         <div className="text-right">
            <p className="text-xs mb-10 font-sans">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
            <p className="font-bold underline uppercase text-sm font-sans">{data.name}</p>
            <p className="text-[10px] text-slate-400 font-sans">Penerima Manfaat</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body, html { margin: 0 !important; padding: 0 !important; height: 297mm !important; overflow: hidden !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; }
        }
      `}</style>

      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-emerald-400 uppercase tracking-widest text-sm flex items-center gap-2">
              <Calculator size={16} /> Kalkulator Pesangon Pro
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2">
            <Printer size={16} /> Print Rincian
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR INPUT */}
          <div className="w-[400px] bg-white border-r overflow-y-auto p-6 space-y-6 font-sans">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Briefcase size={14}/> Identitas & Gaji</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                <div>
                   <label className="text-[9px] font-bold text-slate-400 uppercase">Gaji Pokok + Tun. Tetap</label>
                   <input type="number" className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.salary} onChange={e => handleDataChange('salary', parseInt(e.target.value))} />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><CalendarDays size={14}/> Masa Kerja</h3>
                <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Masuk</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" value={data.joinDate} onChange={e => handleDataChange('joinDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl PHK</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" value={data.phkDate} onChange={e => handleDataChange('phkDate', e.target.value)} />
                   </div>
                </div>
             </div>

             <div className="space-y-4 text-slate-900">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-2 tracking-widest flex items-center gap-2 "><Scale size={14}/> Alasan PHK</h3>
                <select className="w-full p-2 border rounded text-xs font-bold bg-slate-50 " value={data.reason} onChange={e => handleDataChange('reason', e.target.value)}>
                   <option value="efisiensi">Efisiensi / Perusahaan Tutup (1.0x)</option>
                   <option value="pensiun">Mencapai Usia Pensiun (1.75x)</option>
                   <option value="meninggal">Meninggal Dunia (2.0x)</option>
                   <option value="pelanggaran">Pelanggaran Aturan (0.5x)</option>
                   <option value="tutup_kerugian">Tutup Karena Rugi (0.5x)</option>
                </select>
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <SuratKonten />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <SuratKonten />
      </div>
    </div>
  );
}