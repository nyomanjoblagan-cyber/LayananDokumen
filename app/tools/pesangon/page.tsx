'use client';

import { useState, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Calculator, Wallet, 
  CalendarDays, Briefcase, Info, AlertTriangle, Scale, Edit3, Eye,
  LayoutTemplate, ChevronDown, Check, MapPin
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PesangonPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Calculator...</div>}>
      <PesangonCalculatorBuilder />
    </Suspense>
  );
}

function PesangonCalculatorBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    name: 'BUDI SANTOSO',
    joinDate: '2015-01-01',
    phkDate: '2026-01-08',
    salary: 8000000, 
    reason: 'efisiensi', 
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const calculation = useMemo(() => {
    const start = new Date(data.joinDate);
    const end = new Date(data.phkDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const roundedYears = Math.floor(diffYears);

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

    let upmkMultiplier = 0;
    if (diffYears >= 3 && diffYears < 6) upmkMultiplier = 2;
    else if (diffYears >= 6 && diffYears < 9) upmkMultiplier = 3;
    else if (diffYears >= 9 && diffYears < 12) upmkMultiplier = 4;
    else if (diffYears >= 12 && diffYears < 15) upmkMultiplier = 5;
    else if (diffYears >= 15 && diffYears < 18) upmkMultiplier = 6;
    else if (diffYears >= 18 && diffYears < 21) upmkMultiplier = 7;
    else if (diffYears >= 21 && diffYears < 24) upmkMultiplier = 8;
    else if (diffYears >= 24) upmkMultiplier = 10;

    let reasonCoefficient = 1.0;
    if (data.reason === 'efisiensi') reasonCoefficient = 1.0;
    else if (data.reason === 'pelanggaran') reasonCoefficient = 0.5;
    else if (data.reason === 'pensiun') reasonCoefficient = 1.75;
    else if (data.reason === 'meninggal') reasonCoefficient = 2.0;
    else if (data.reason === 'tutup_kerugian') reasonCoefficient = 0.5;

    const totalUP = upMultiplier * data.salary * reasonCoefficient;
    const totalUPMK = upmkMultiplier * data.salary;
    const totalUPH = (totalUP + totalUPMK) * 0.15; 

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

  const TEMPLATES = [
    { id: 1, name: "Format Rincian", desc: "Tabel perhitungan detail" },
    { id: 2, name: "Format Ringkas", desc: "Poin-poin utama saja" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:w-full">
      <div className="text-center mb-8 border-b-4 border-double border-black pb-4 shrink-0">
        <h1 className="font-black text-xl uppercase tracking-tighter">RINCIAN PERHITUNGAN PESANGON</h1>
        <p className="text-sm mt-1 font-sans font-bold text-slate-500 uppercase tracking-widest">Berdasarkan Peraturan Pemerintah No. 35 Tahun 2021</p>
      </div>

      <div className="flex-grow space-y-6">
        <section className="grid grid-cols-2 gap-4 md:gap-6 text-[10pt] font-sans bg-slate-50 p-5 rounded-xl border border-slate-200 print:bg-transparent print:border-black">
          <div className="space-y-3">
            <div><p className="text-[9px] font-black text-slate-400 uppercase">Nama Karyawan</p><p className="font-bold text-base uppercase">{data.name}</p></div>
            <div><p className="text-[9px] font-black text-slate-400 uppercase">Masa Kerja</p><p className="font-bold">{calculation.years} Thn {calculation.months} Bln</p></div>
          </div>
          <div className="space-y-3">
            <div><p className="text-[9px] font-black text-slate-400 uppercase">Upah Terakhir</p><p className="font-bold text-emerald-700 text-base">{formatRupiah(data.salary)}</p></div>
            <div><p className="text-[9px] font-black text-slate-400 uppercase">Alasan PHK</p><p className="font-bold uppercase text-red-600 italic">PHK {data.reason.replace('_', ' ')}</p></div>
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
                  <td className="p-4 font-bold">Uang Pesangon (UP)</td>
                  <td className="p-4 text-right font-bold">{formatRupiah(calculation.totalUP)}</td>
                  </tr>
                  <tr className="border-b border-slate-100 print:border-black">
                  <td className="p-4 font-bold">Penghargaan Masa Kerja (UPMK)</td>
                  <td className="p-4 text-right font-bold">{formatRupiah(calculation.totalUPMK)}</td>
                  </tr>
                  <tr className="border-b border-slate-100 print:border-black">
                  <td className="p-4 font-bold">Penggantian Hak (UPH 15%)</td>
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
             <div className="flex justify-between border-b pb-2"><span>Uang Pesangon</span><span className="font-bold">{formatRupiah(calculation.totalUP)}</span></div>
             <div className="flex justify-between border-b pb-2"><span>Uang Penghargaan Masa Kerja</span><span className="font-bold">{formatRupiah(calculation.totalUPMK)}</span></div>
             <div className="flex justify-between border-b pb-2"><span>Uang Penggantian Hak</span><span className="font-bold">{formatRupiah(calculation.totalUPH)}</span></div>
             <div className="flex justify-between text-xl font-black pt-4 border-t-2 border-black"><span>GRAND TOTAL</span><span>{formatRupiah(calculation.grandTotal)}</span></div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start print:bg-transparent print:border-black shrink-0">
            <Info size={20} className="text-amber-600 shrink-0 mt-0.5 print:text-black" />
            <p className="text-[9px] text-amber-800 leading-relaxed italic print:text-black">
              *Estimasi PP 35/2021. Hasil akhir dapat berbeda sesuai Perjanjian Kerja Bersama (PKB) masing-masing perusahaan. Angka merupakan bruto (sebelum pajak).
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

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Calculator size={16} /> <span>Severance Calculator</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Rincian</div>
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase flex items-center gap-2 active:scale-95 shadow-lg">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>
           
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Karyawan & Gaji</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
              <div className="space-y-1">
                 <label className="text-[9px] font-bold text-slate-400 uppercase">Gaji Pokok + Tun. Tetap</label>
                 <input type="number" className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.salary} onChange={e => handleDataChange('salary', parseInt(e.target.value) || 0)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Masa Kerja</h3>
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

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
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

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 flex flex-col items-center overflow-hidden h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full overflow-y-auto overflow-x-hidden flex justify-center p-4 md:p-12 custom-scrollbar min-h-0 h-full">
              <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-4 md:mb-12">
                 <DocumentContent />
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}