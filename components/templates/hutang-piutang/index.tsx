'use client';
import { useFormSync } from '@/lib/useFormSync';
import React, { useState, Suspense } from 'react';
import { Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, UserCircle2, Banknote, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  city: 'Jakarta',
  date: new Date().toISOString().split('T')[0],
  day: 'Senin',
  
  // PIHAK PERTAMA (Kreditur)
  p1Name: 'Budi Santoso',
  p1Nik: '3171234567890001',
  p1Address: 'Jl. Merdeka No. 1, Jakarta Pusat',
  p1Job: 'Wiraswasta',

  // PIHAK KEDUA (Debitur)
  p2Name: 'Andi Pratama',
  p2Nik: '3179876543210002',
  p2Address: 'Jl. Sudirman No. 2, Jakarta Selatan',
  p2Job: 'Karyawan Swasta',

  // DETAIL HUTANG
  amount: 50000000,
  amountText: 'Lima Puluh Juta Rupiah',
  purpose: 'Tambahan modal usaha',
  transferDate: new Date().toISOString().split('T')[0],
  dueDate: '2026-12-31',
  interestRate: 0, // 0 if none
  latePenalty: 100000,
  latePenaltyText: 'Seratus Ribu Rupiah',

  // JAMINAN
  hasCollateral: true,
  collateralType: 'BPKB Motor Honda Vario 150',
  collateralValue: 15000000,
  collateralValueText: 'Lima Belas Juta Rupiah',

  // SAKSI
  witness1: 'Siti Aminah', witness2: 'Bambang'
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

export default function HutangPiutangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <HutangPiutangBuilder />
    </Suspense>
  );
}

function HutangPiutangBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState('pihak');
  
  const { data, handleDataChange, handleReset } = useFormSync(
    'layanandokumen_hutang_piutang_v1', 
    INITIAL_DATA
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } 
        catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-6">
            <h1 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERJANJIAN HUTANG PIUTANG</h1>
        </div>

        <p className="mb-4 text-justify">
            Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK PERTAMA (KREDITUR / PEMBERI PINJAMAN)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak untuk diri sendiri, dan selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK KEDUA (DEBITUR / PENERIMA PINJAMAN)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak untuk diri sendiri, dan selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
        </div>

        <p className="mb-4 text-justify">
            PARA PIHAK dengan ini menerangkan bahwa PIHAK PERTAMA sepakat untuk meminjamkan sejumlah uang kepada PIHAK KEDUA, dan PIHAK KEDUA sepakat untuk menerima pinjaman tersebut dengan syarat dan ketentuan sebagai berikut:
        </p>

        <div className="text-center font-bold mb-2 mt-6">Pasal 1<br/>JUMLAH PINJAMAN DAN TUJUAN</div>
        <p className="text-justify mb-2">
            1. PIHAK PERTAMA memberikan pinjaman uang kepada PIHAK KEDUA sebesar <strong>Rp {data.amount.toLocaleString('id-ID')} ({data.amountText})</strong>.
        </p>
        <p className="text-justify mb-2">
            2. Pinjaman tersebut diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA pada tanggal <strong>{formatDateSafe(data.transferDate)}</strong> secara tunai / transfer bank.
        </p>
        <p className="text-justify mb-4">
            3. PIHAK KEDUA menyatakan bahwa pinjaman tersebut akan digunakan untuk keperluan <strong>{data.purpose}</strong>.
        </p>

        <div className="text-center font-bold mb-2 mt-6">Pasal 2<br/>JANGKA WAKTU DAN PEMBAYARAN</div>
        <p className="text-justify mb-2">
            1. PIHAK KEDUA wajib mengembalikan seluruh pinjaman tersebut kepada PIHAK PERTAMA selambat-lambatnya pada tanggal <strong>{formatDateSafe(data.dueDate)}</strong> (Jatuh Tempo).
        </p>
        <p className="text-justify mb-4">
            2. {data.interestRate > 0 ? `Pinjaman ini dikenakan bunga sebesar ${data.interestRate}% per bulan/tahun yang harus dibayarkan bersamaan dengan pokok pinjaman.` : 'Pinjaman ini tidak dikenakan bunga (bunga 0%).'}
        </p>

        {data.hasCollateral && (
            <>
                <div className="text-center font-bold mb-2 mt-6">Pasal 3<br/>JAMINAN PINJAMAN</div>
                <p className="text-justify mb-2">
                    1. Untuk menjamin pembayaran kembali pinjaman, PIHAK KEDUA menyerahkan barang jaminan kepada PIHAK PERTAMA berupa: <strong>{data.collateralType}</strong> yang ditaksir memiliki nilai sebesar <strong>Rp {data.collateralValue.toLocaleString('id-ID')} ({data.collateralValueText})</strong>.
                </p>
                <p className="text-justify mb-4">
                    2. Barang jaminan tersebut akan dikembalikan secara utuh kepada PIHAK KEDUA seketika setelah PIHAK KEDUA melunasi seluruh hutangnya kepada PIHAK PERTAMA.
                </p>
            </>
        )}

        <div className="text-center font-bold mb-2 mt-6">Pasal {data.hasCollateral ? '4' : '3'}<br/>DENDA KETERLAMBATAN DAN SANKSI HUKUM</div>
        <p className="text-justify mb-2">
            1. Apabila PIHAK KEDUA terlambat melakukan pembayaran dari tanggal jatuh tempo, maka PIHAK KEDUA dikenakan denda keterlambatan sebesar <strong>Rp {data.latePenalty.toLocaleString('id-ID')} ({data.latePenaltyText})</strong> per hari keterlambatan.
        </p>
        <p className="text-justify mb-2">
            2. Apabila PIHAK KEDUA tidak dapat melunasi hutangnya setelah melewati batas waktu yang ditentukan, maka PIHAK PERTAMA berhak penuh atas barang jaminan (jika ada) untuk dilelang/dijual guna menutupi sisa hutang.
        </p>
        <p className="text-justify mb-4">
            3. Apabila nilai jaminan tidak mencukupi atau tidak ada jaminan, PIHAK PERTAMA berhak menempuh jalur hukum perdata maupun pidana sesuai peraturan perundang-undangan yang berlaku di Indonesia.
        </p>

        <p className="mb-8 text-justify mt-8">
            Demikian Surat Perjanjian ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun, dibuat rangkap 2 (dua) bermeterai cukup yang masing-masing memiliki kekuatan hukum yang sama.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between mt-12 mb-20 text-center break-inside-avoid">
            <div className="w-1/2">
                <p className="mb-24">PIHAK PERTAMA<br/><span className="text-[10px]">(Kreditur)</span></p>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            <div className="w-1/2">
                <p className="mb-24">PIHAK KEDUA<br/><span className="text-[10px]">(Debitur)</span></p>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
            </div>
        </div>

        <div className="mt-8 mb-4 text-center font-bold underline break-inside-avoid">SAKSI-SAKSI</div>
        <div className="flex justify-between text-center break-inside-avoid mb-10">
            <div className="w-1/2">
                <p className="mb-24">Saksi 1</p>
                <p className="font-bold underline uppercase">{data.witness1}</p>
            </div>
            <div className="w-1/2">
                <p className="mb-24">Saksi 2</p>
                <p className="font-bold underline uppercase">{data.witness2}</p>
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
            <h1 className="font-black text-slate-800 text-sm md:text-lg tracking-tight flex items-center gap-2">HUTANG PIUTANG</h1>
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
                  <button onClick={() => setActiveTab('dana')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'dana' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>Dana</button>
                </div>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              {activeTab === 'pihak' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><UserCircle2 size={14} className="text-sky-600"/> Pihak Pertama (Kreditur)</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} /></div>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Users size={14} className="text-rose-600"/> Pihak Kedua (Debitur)</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} /></div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'dana' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Banknote size={14} className="text-emerald-600"/> Pinjaman & Denda</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Jumlah Pinjaman (Rp)</label><input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 outline-none" value={data.amount} onChange={e => handleDataChange('amount', Number(e.target.value))} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Terbilang (Pinjaman)</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 outline-none" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} /></div>
                          <div className="grid grid-cols-2 gap-3">
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Tanggal Diberikan</label><input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.transferDate} onChange={e => handleDataChange('transferDate', e.target.value)} /></div>
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Jatuh Tempo</label><input type="date" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm text-rose-700 font-bold focus:bg-white focus:ring-2 outline-none" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Denda Keterlambatan/Hari</label><input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.latePenalty} onChange={e => handleDataChange('latePenalty', Number(e.target.value))} /></div>
                              <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Bunga (%) per bulan/tahun</label><input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.interestRate} onChange={e => handleDataChange('interestRate', Number(e.target.value))} /></div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><ShieldCheck size={14} className="text-indigo-600"/> Jaminan</h3>
                      <div className="space-y-4">
                          <label className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl border border-indigo-100 cursor-pointer">
                              <input type="checkbox" className="w-5 h-5 text-indigo-600" checked={data.hasCollateral} onChange={e => handleDataChange('hasCollateral', e.target.checked)} />
                              <span className="text-sm font-bold text-indigo-900">Gunakan Jaminan</span>
                          </label>
                          {data.hasCollateral && (
                              <>
                                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Deskripsi Barang Jaminan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.collateralType} onChange={e => handleDataChange('collateralType', e.target.value)} /></div>
                                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Taksiran Nilai Jaminan (Rp)</label><input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.collateralValue} onChange={e => handleDataChange('collateralValue', Number(e.target.value))} /></div>
                              </>
                          )}
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
              <PrintWrapper documentName="Surat Hutang Piutang" price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
