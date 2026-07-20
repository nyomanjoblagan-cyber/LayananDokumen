'use client';
import { useFormSync } from '@/lib/useFormSync';
import React, { useState, Suspense } from 'react';
import { Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, UserCircle2, ShieldAlert, TextQuote } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  city: 'Jakarta',
  date: new Date().toISOString().split('T')[0],
  
  // PENGIRIM
  senderName: 'Andi Pratama, S.H.',
  senderTitle: 'Kuasa Hukum / Pribadi',
  senderAddress: 'Jl. Sudirman No. 10, Jakarta Selatan',
  senderContact: '0812-3456-7890',

  // PENERIMA
  receiverName: 'Budi Santoso',
  receiverAddress: 'Jl. Merdeka No. 5, Jakarta Pusat',

  // DETAIL SOMASI
  somasiType: 'SOMASI PERTAMA DAN TERAKHIR',
  subject: 'Teguran Hukum Atas Keterlambatan Pembayaran Hutang',
  chronology: 'Berdasarkan Surat Perjanjian Hutang Piutang tertanggal 10 Januari 2026, Saudara telah meminjam dana sebesar Rp 50.000.000 (Lima Puluh Juta Rupiah) dan berjanji akan mengembalikan pada tanggal 10 April 2026. Namun hingga surat ini diterbitkan, Saudara belum melakukan iktikad baik untuk melunasi hutang tersebut.',
  demandAmount: 50000000,
  demandAmountText: 'Lima Puluh Juta Rupiah',
  deadlineDays: 7,
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

export default function SomasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <SomasiBuilder />
    </Suspense>
  );
}

function SomasiBuilder() {
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
        <div className="flex justify-between items-start mb-6">
            <div>
                <p>{data.city}, {formatDateSafe(data.date)}</p>
                <div className="mt-4">
                    <p>Nomor : Istimewa</p>
                    <p>Lampiran : -</p>
                    <p>Perihal : <strong>{data.subject} ({data.somasiType})</strong></p>
                </div>
            </div>
        </div>

        <div className="mb-6">
            <p>Kepada Yth,</p>
            <p className="font-bold uppercase">{data.receiverName}</p>
            <p className="w-1/2">{data.receiverAddress}</p>
        </div>

        <p className="mb-4">Dengan hormat,</p>
        
        <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini, <strong>{data.senderName}</strong>, bertindak selaku {data.senderTitle}, beralamat di {data.senderAddress}, dengan ini menyampaikan <strong>{data.somasiType}</strong> kepada Saudara/i.
        </p>

        <p className="mb-2 text-justify">
            Bahwa Somasi / Teguran Hukum ini kami sampaikan berdasarkan fakta-fakta sebagai berikut:
        </p>
        
        <div className="pl-4 mb-4 text-justify">
            <p className="mb-2">1. {data.chronology}</p>
            <p className="mb-2">2. Bahwa akibat tindakan Saudara/i, klien kami / pihak kami telah dirugikan secara materiil sebesar <strong>Rp {data.demandAmount.toLocaleString('id-ID')} ({data.demandAmountText})</strong>.</p>
            <p>3. Bahwa tindakan Saudara/i dapat dikualifikasikan sebagai perbuatan Wanprestasi (Ingkar Janji) maupun dugaan tindak pidana Penipuan/Penggelapan sesuai KUHP.</p>
        </div>

        <p className="mb-4 text-justify">
            Oleh karena itu, melalui surat ini kami memberikan <strong>Peringatan Keras / SOMASI</strong> kepada Saudara/i agar segera menyelesaikan kewajiban tersebut dan melakukan pembayaran selambat-lambatnya dalam waktu <strong>{data.deadlineDays} ({(data.deadlineDays.toString())}) hari</strong> sejak surat ini diterima.
        </p>

        <p className="mb-6 text-justify">
            Apabila sampai dengan batas waktu tersebut Saudara/i tetap tidak menunjukkan iktikad baik untuk menyelesaikan kewajiban, maka kami akan menempuh jalur hukum secara tegas, baik hukum Perdata (Gugatan Wanprestasi) maupun Pidana (Laporan Kepolisian).
        </p>

        <p className="mb-12">
            Demikian surat Somasi / Teguran Hukum ini kami sampaikan untuk menjadi perhatian dan segera dilaksanakan.
        </p>

        {/* TANDA TANGAN */}
        <div className="break-inside-avoid">
            <p className="mb-24">Hormat Kami,</p>
            <p className="font-bold underline uppercase">{data.senderName}</p>
            <p className="text-sm">{data.senderContact}</p>
        </div>
      </Kertas>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm z-50 no-print">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeftCircle size={24} /></Link>
            <h1 className="font-black text-slate-800 text-sm md:text-lg tracking-tight flex items-center gap-2">SOMASI / TEGURAN HUKUM</h1>
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
                  <button onClick={() => setActiveTab('kasus')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'kasus' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}>Kasus</button>
                </div>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              {activeTab === 'pihak' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><UserCircle2 size={14} className="text-sky-600"/> Pengirim Somasi</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama / Kuasa Hukum</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 outline-none" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Kapasitas (Jabatan)</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.senderTitle} onChange={e => handleDataChange('senderTitle', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Kontak / No HP</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.senderContact} onChange={e => handleDataChange('senderContact', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat Pengirim</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.senderAddress} onChange={e => handleDataChange('senderAddress', e.target.value)} /></div>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><ShieldAlert size={14} className="text-rose-600"/> Pihak Tujuan (Yang Disomasi)</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Tujuan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 outline-none" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat Tujuan</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} /></div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'kasus' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><TextQuote size={14} className="text-amber-600"/> Detail Kasus & Tuntutan</h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Jenis Somasi</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.somasiType} onChange={e => handleDataChange('somasiType', e.target.value)}>
                                  <option value="SOMASI PERTAMA">SOMASI PERTAMA</option>
                                  <option value="SOMASI KEDUA">SOMASI KEDUA</option>
                                  <option value="SOMASI KETIGA (TERAKHIR)">SOMASI KETIGA (TERAKHIR)</option>
                                  <option value="SOMASI PERTAMA DAN TERAKHIR">SOMASI PERTAMA DAN TERAKHIR</option>
                              </select>
                          </div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Perihal Surat</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.subject} onChange={e => handleDataChange('subject', e.target.value)} /></div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Kronologi & Pelanggaran</label>
                              <textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-32 focus:bg-white focus:ring-2 outline-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} />
                          </div>
                          
                          <div className="border-t border-slate-100 pt-4"></div>

                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Total Kerugian / Tuntutan (Rp)</label><input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 outline-none" value={data.demandAmount} onChange={e => handleDataChange('demandAmount', Number(e.target.value))} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Terbilang (Tuntutan)</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 outline-none" value={data.demandAmountText} onChange={e => handleDataChange('demandAmountText', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Batas Waktu (Hari)</label><input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.deadlineDays} onChange={e => handleDataChange('deadlineDays', Number(e.target.value))} /></div>
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
              <PrintWrapper documentName="Surat Somasi" price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
