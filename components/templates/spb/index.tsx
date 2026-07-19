'use client';

/**
 * FILE: SPBPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perintah Bayar (SPB) / Payment Order
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Banknote, Building2, UserCircle2, ShieldCheck, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PaymentData {
  city: string;
  date: string;
  docNo: string;
  companyName: string;
  companyAddress: string;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  amount: number;
  amountText: string;
  purpose: string;
  approverName: string;
  approverJob: string;
  treasurerName: string;
  treasurerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaymentData = {
  city: 'JAKARTA',
  date: '2026-07-13',
  docNo: 'SPB/FIN/001/I/2026',
  companyName: 'PT. DINAMIKA CIPTA MANDIRI',
  companyAddress: 'Gedung Office 8, Lantai 12, Senopati, Jakarta Selatan',
  recipientName: 'RIZKY RAMADHAN',
  recipientBank: 'Bank Central Asia (BCA)',
  recipientAccount: '123-456-7890',
  amount: 15500000,
  amountText: 'Lima Belas Juta Lima Ratus Ribu Rupiah',
  purpose: 'Pembayaran tagihan invoice vendor IT support periode bulan Desember 2025.',
  approverName: 'HENDRA KUSUMA',
  approverJob: 'Direktur Operasional',
  treasurerName: 'SITI AMINAH',
  treasurerJob: 'Bendahara Keuangan'
};

// --- HELPER FUNCTION UNTUK TERBILANG ---
function terbilang(angka: number): string {
    const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let hasil = "";
    if (angka < 12) {
        hasil = huruf[angka];
    } else if (angka < 20) {
        hasil = terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        hasil = terbilang(Math.floor(angka / 10)) + " Puluh " + huruf[angka % 10];
    } else if (angka < 200) {
        hasil = "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        hasil = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        hasil = "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        hasil = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        hasil = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000)) + " Milyar " + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000000)) + " Trilyun " + terbilang(angka % 1000000000000);
    }
    return hasil.trim();
}

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Perintah Bayar...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'penerima' | 'transaksi'>('perusahaan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof PaymentData, val: any) => {
    setData(prev => {
        const newData = { ...prev, [field]: val };
        // Auto update terbilang if amount changes
        if(field === 'amount') {
            const amountNum = Number(val) || 0;
            if(amountNum > 0) {
                newData.amountText = terbilang(amountNum) + ' Rupiah';
            } else {
                newData.amountText = '';
            }
        }
        return newData;
    });
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-[3px] border-black pb-4 mb-8">
        <h1 className="text-2xl font-black uppercase tracking-widest">{data.companyName}</h1>
        <p className="text-sm mt-1 text-center px-8">{data.companyAddress}</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">SURAT PERINTAH BAYAR</h2>
        <p className="font-bold mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Bersama surat ini, kami memberikan instruksi dan perintah kepada Bagian Keuangan / Bendahara Perusahaan untuk segera melakukan pencairan dana / pembayaran kepada pihak di bawah ini:</p>
      </div>

      {/* DATA PENERIMA & TRANSAKSI */}
      <div className="mb-6 break-inside-avoid pl-4 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-48 font-bold">Nama Penerima / Vendor</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase text-[12pt]">{data.recipientName}</div></div>
        <div className="flex mb-1"><div className="w-48">Bank Tujuan</div><div className="w-4">:</div><div className="flex-1">{data.recipientBank}</div></div>
        <div className="flex mb-1"><div className="w-48">Nomor Rekening</div><div className="w-4">:</div><div className="flex-1 font-mono font-bold">{data.recipientAccount}</div></div>
        <div className="flex mb-1 mt-4"><div className="w-48 font-bold text-lg">Nominal Pembayaran</div><div className="w-4">:</div><div className="flex-1 font-bold text-lg">{formatRupiah(data.amount)}</div></div>
        <div className="flex mb-1"><div className="w-48 italic">Terbilang</div><div className="w-4">:</div><div className="flex-1 italic">"{data.amountText}"</div></div>
      </div>

      <div className="mb-8 text-justify break-inside-avoid">
        <p className="mb-2">Pembayaran tersebut merupakan pelunasan / penyelesaian atas:</p>
        <p className="font-bold uppercase text-center bg-gray-100 p-2 border border-gray-300 rounded mb-4">"{data.purpose}"</p>
        <p>Pembayaran ini harus diproses paling lambat 1 (satu) hari kerja setelah Surat Perintah Bayar ini ditandatangani. Segala bukti transfer atau tanda terima pembayaran harap dilampirkan bersama dokumen ini sebagai bukti kas keluar perusahaan.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-16">
        <div className="text-center w-64">
            <p className="mb-1 uppercase font-bold text-white selection:text-transparent">SPACER</p>
            <p className="mb-2 font-bold uppercase">Penerima Perintah<br/>(Keuangan / Bendahara)</p>
            <div className="h-24 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.treasurerName}</p>
            <p className="text-sm">{data.treasurerJob}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-1">{data.city}, {formatDateDisplay(data.date)}</p>
            <p className="mb-2 font-bold uppercase">Pemberi Perintah<br/>(Direksi / Otorisator)</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Perusahaan)</span>
            </div>
            <p className="font-bold underline uppercase">{data.approverName}</p>
            <p className="text-sm">{data.approverJob}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SPB Keuangan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SPB</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Banknote size={18} className="text-emerald-600" /> Editor Pembayaran</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Internal Corp</button>
                <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima/Vendor</button>
                <button onClick={() => setActiveTab('transaksi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'transaksi' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Transaksi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Landmark size={14} className="text-slate-600"/> Data Perusahaan & Otorisator
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Pembayar)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyName} onChange={e => handleChange('companyName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyAddress} onChange={e => handleChange('companyAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Tanda Tangan Otorisator & Eksekutor</h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pemberi Perintah (Direktur)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.approverName} onChange={e => handleChange('approverName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Direktur)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.approverJob} onChange={e => handleChange('approverJob', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penerima Perintah (Finance)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.treasurerName} onChange={e => handleChange('treasurerName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Finance/Bendahara)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.treasurerJob} onChange={e => handleChange('treasurerJob', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-emerald-600"/> Data Penerima Dana
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Rekening Penerima / Vendor</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientName} onChange={e => handleChange('recipientName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientBank} onChange={e => handleChange('recipientBank', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rekening Bank</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientAccount} onChange={e => handleChange('recipientAccount', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'transaksi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Banknote size={14} className="text-amber-600"/> Detail Transaksi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nominal Pembayaran (Rp)</label>
                            <input type="number" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.amount} onChange={e => handleChange('amount', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Otomatis)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.amountText} onChange={e => handleChange('amountText', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uraian / Tujuan Pembayaran</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.purpose} onChange={e => handleChange('purpose', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat (SPB)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`SPB_${data.docNo.split('/').join('_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
