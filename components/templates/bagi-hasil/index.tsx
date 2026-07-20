'use client';
import { useFormSync } from '@/lib/useFormSync';
import React, { useState, Suspense } from 'react';
import { Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, UserCircle2, Briefcase, Banknote, Percent } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  city: 'Surabaya',
  date: new Date().toISOString().split('T')[0],
  day: 'Kamis',
  
  // PIHAK PERTAMA (Pemodal)
  p1Name: 'H. Abdul Rasyid',
  p1Nik: '3571234567890001',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Pemuda No. 10, Surabaya',

  // PIHAK KEDUA (Pengelola)
  p2Name: 'Ahmad Faisal',
  p2Nik: '3579876543210002',
  p2Job: 'Mahasiswa / Karyawan',
  p2Address: 'Jl. Rungkut No. 5, Surabaya',

  // DETAIL USAHA & BAGI HASIL
  businessName: 'Kedai Kopi Senja',
  businessType: 'F&B (Food and Beverage)',
  capitalAmount: 100000000,
  capitalAmountText: 'Seratus Juta Rupiah',
  shareP1: 40,
  shareP2: 60,
  durationMonths: 12,
  profitPeriod: 'Bulan', // Bulan / Tahun
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

export default function BagiHasilPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <BagiHasilBuilder />
    </Suspense>
  );
}

function BagiHasilBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState('pihak');
  
  const [data, setData] = useFormSync(INITIAL_DATA);
  const handleDataChange = (field: string, val: any) => setData((prev: any) => ({ ...prev, [field]: val }));
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } 
        catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-6">
            <h1 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERJANJIAN KERJASAMA BAGI HASIL<br/>(SYIRKAH / MUDHARABAH)</h1>
        </div>

        <p className="mb-4 text-justify">
            Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK PERTAMA (PEMODAL / SHAHIBUL MAAL)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak selaku Pemberi Modal, dan selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK KEDUA (PENGELOLA / MUDHARIB)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak selaku Pengelola Usaha, dan selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
        </div>

        <p className="mb-4 text-justify">
            PARA PIHAK dengan ini sepakat untuk mengikatkan diri dalam Perjanjian Kerjasama Bagi Hasil Usaha dengan ketentuan dan syarat-syarat yang diatur dalam pasal-pasal berikut:
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 1<br/>OBJEK KERJASAMA DAN MODAL</div>
        <p className="text-justify mb-2">
            1. PIHAK KEDUA akan mengelola usaha milik bersama yang bergerak di bidang <strong>{data.businessType}</strong> dengan nama usaha <strong>"{data.businessName}"</strong>.
        </p>
        <p className="text-justify mb-4">
            2. PIHAK PERTAMA menyertakan modal usaha (Investasi) sebesar <strong>Rp {data.capitalAmount.toLocaleString('id-ID')} ({data.capitalAmountText})</strong> yang diserahkan sepenuhnya kepada PIHAK KEDUA untuk dipergunakan sebagai modal kerja/operasional usaha tersebut.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 2<br/>TANGGUNG JAWAB PARA PIHAK</div>
        <p className="text-justify mb-2">
            1. PIHAK PERTAMA bertanggung jawab penuh atas penyediaan modal investasi dan berhak untuk melakukan pengawasan terhadap pembukuan atau jalannya usaha tanpa mengganggu jalannya operasional sehari-hari.
        </p>
        <p className="text-justify mb-4">
            2. PIHAK KEDUA bertanggung jawab penuh atas pengelolaan operasional usaha sehari-hari, wajib menjalankan usaha secara profesional, amanah, serta wajib memberikan laporan keuangan (Laba/Rugi) kepada PIHAK PERTAMA setiap akhir {data.profitPeriod}.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 3<br/>SISTEM BAGI HASIL DAN KERUGIAN</div>
        <p className="text-justify mb-2">
            1. Keuntungan bersih (Net Profit) setelah dikurangi seluruh biaya operasional akan dibagi dengan persentase sebagai berikut:
            <br/> - PIHAK PERTAMA (Pemodal) : <strong>{data.shareP1}%</strong>
            <br/> - PIHAK KEDUA (Pengelola) : <strong>{data.shareP2}%</strong>
        </p>
        <p className="text-justify mb-2">
            2. Pembagian keuntungan (Bagi Hasil) dilakukan setiap akhir <strong>{data.profitPeriod}</strong> terhitung sejak usaha mulai beroperasi.
        </p>
        <p className="text-justify mb-4">
            3. Apabila terjadi kerugian usaha yang disebabkan oleh kondisi pasar (Force Majeure) dan bukan karena kelalaian PIHAK KEDUA, maka kerugian finansial ditanggung oleh PIHAK PERTAMA selaku Pemodal, sedangkan PIHAK KEDUA rugi atas tenaga dan waktu yang telah dikeluarkan (Prinsip Mudharabah). Namun apabila kerugian disebabkan oleh kecurangan/kelalaian PIHAK KEDUA, maka PIHAK KEDUA wajib mengganti seluruh kerugian tersebut.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 4<br/>JANGKA WAKTU PERJANJIAN</div>
        <p className="text-justify mb-4">
            Perjanjian kerjasama ini berlaku untuk jangka waktu <strong>{data.durationMonths} bulan</strong> sejak ditandatangani, dan dapat diperpanjang atas kesepakatan PARA PIHAK. Setelah masa perjanjian berakhir, PIHAK KEDUA wajib mengembalikan modal awal secara utuh kepada PIHAK PERTAMA (kecuali disepakati lain).
        </p>

        <p className="mb-8 text-justify mt-8">
            Demikian Surat Perjanjian Kerjasama ini dibuat rangkap 2 (dua) yang masing-masing bermeterai cukup dan mempunyai kekuatan hukum yang sama, ditandatangani dalam keadaan sadar tanpa paksaan dari pihak manapun.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between mt-12 mb-20 text-center break-inside-avoid">
            <div className="w-1/2">
                <p className="mb-24">PIHAK PERTAMA<br/><span className="text-[10px]">(Pemodal)</span></p>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            <div className="w-1/2">
                <p className="mb-24">PIHAK KEDUA<br/><span className="text-[10px]">(Pengelola)</span></p>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
            </div>
        </div>

      </Kertas>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm z-50 no-print">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeftCircle size={24} /></Link>
            <h1 className="font-black text-slate-800 text-sm md:text-lg tracking-tight flex items-center gap-2">BAGI HASIL (SYIRKAH)</h1>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all text-white">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setActiveTab('pihak')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'pihak' ? 'bg-white shadow-sm text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}>Pihak</button>
                  <button onClick={() => setActiveTab('bisnis')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'bisnis' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>Bisnis & Modal</button>
                </div>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              {activeTab === 'pihak' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><UserCircle2 size={14} className="text-sky-600"/> Pihak Pemodal</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} /></div>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Briefcase size={14} className="text-rose-600"/> Pihak Pengelola</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} /></div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'bisnis' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Banknote size={14} className="text-emerald-600"/> Usaha & Modal</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Usaha / Bisnis</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Bidang Usaha</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} /></div>
                          
                          <div className="border-t border-slate-100 pt-4"></div>

                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Modal Investasi (Rp)</label><input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 outline-none" value={data.capitalAmount} onChange={e => handleDataChange('capitalAmount', Number(e.target.value))} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Terbilang (Modal)</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 outline-none" value={data.capitalAmountText} onChange={e => handleDataChange('capitalAmountText', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Jangka Waktu Kerjasama (Bulan)</label><input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.durationMonths} onChange={e => handleDataChange('durationMonths', Number(e.target.value))} /></div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Percent size={14} className="text-indigo-600"/> Pembagian Keuntungan</h3>
                      <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pemodal (%)</label><input type="number" className="w-full bg-indigo-50 p-2.5 border border-indigo-200 rounded-xl text-sm font-bold text-indigo-700 focus:bg-white focus:ring-2 outline-none" value={data.shareP1} onChange={e => handleDataChange('shareP1', Number(e.target.value))} /></div>
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pengelola (%)</label><input type="number" className="w-full bg-indigo-50 p-2.5 border border-indigo-200 rounded-xl text-sm font-bold text-indigo-700 focus:bg-white focus:ring-2 outline-none" value={data.shareP2} onChange={e => handleDataChange('shareP2', Number(e.target.value))} /></div>
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Periode Bagi Hasil</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.profitPeriod} onChange={e => handleDataChange('profitPeriod', e.target.value)}>
                                  <option value="Bulan">Setiap Bulan</option>
                                  <option value="Kuartal (3 Bulan)">Setiap Kuartal</option>
                                  <option value="Semester (6 Bulan)">Setiap Semester</option>
                                  <option value="Tahun">Setiap Tahun</option>
                              </select>
                          </div>
                      </div>
                   </div>
                 </>
              )}
            </div>
        </aside>

        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Bagi Hasil" price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
