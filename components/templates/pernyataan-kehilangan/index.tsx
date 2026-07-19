'use client';
import { useFormSync } from '@/lib/useFormSync';

import PrintWrapper from '@/components/PrintWrapper';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  User, Search, AlertCircle, FileText
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface LossReportData {
  // Identitas Pihak Pertama (Yang Menyatakan)
  name: string;
  nik: string;
  pob: string;
  dob: string;
  job: string;
  address: string;
  phone: string;

  // Detail Barang Hilang
  itemName: string;
  itemSerialNo: string;
  itemFeatures: string;

  // Waktu & Lokasi
  lossDate: string;
  lossTime: string;
  lossLocation: string;
  lossChronology: string;

  // Upaya Pencarian & Tujuan
  searchEfforts: string;
  purpose: string;

  // Metadata
  city: string;
  date: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LossReportData = {
  name: 'BAMBANG SUDARSO',
  nik: '3404010101800001',
  pob: 'Sleman',
  dob: '1980-05-12',
  job: 'Karyawan Swasta',
  address: 'Jl. Kaliurang KM 10, Kel. Sinduharjo, Kec. Ngaglik, Kab. Sleman, Daerah Istimewa Yogyakarta',
  phone: '081234567890',
  
  itemName: 'Buku Tabungan Bank Central Asia (BCA)',
  itemSerialNo: 'No. Rekening: 846392019',
  itemFeatures: 'Buku tabungan berwarna biru dengan sampul plastik bening, atas nama Bambang Sudarso.',
  
  lossDate: '2026-07-10',
  lossTime: '14:30',
  lossLocation: 'Sekitar Jalan Raya Tajem, Maguwoharjo, Sleman',
  lossChronology: 'Pada waktu tersebut, saya mengendarai sepeda motor dari arah utara menuju selatan. Sesampainya di tempat kejadian, resleting tas selempang yang saya kenakan terlepas dan terbuka tanpa saya sadari, sehingga dompet dan buku tabungan yang berada di dalamnya terjatuh dan hilang.',
  
  searchEfforts: 'Telah melakukan pencarian dengan menyusuri kembali rute perjalanan sebanyak tiga kali dan menanyakan kepada warga serta pedagang di sekitar lokasi kejadian, namun barang tersebut tidak ditemukan.',
  purpose: 'Untuk keperluan pelaporan kehilangan kepada pihak Kepolisian Republik Indonesia (Polri) dan pengurusan penerbitan buku tabungan pengganti di Bank BCA Cabang Sleman.',
  
  city: 'Sleman',
  date: '2026-07-13',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PernyataanKehilanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <LossReportBuilder />
    </Suspense>
  );
}

function LossReportBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<LossReportData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pelapor' | 'barang' | 'kejadian' | 'lainnya'>('pelapor');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof LossReportData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-8 break-inside-avoid">
            <h1 className="font-bold text-xl tracking-wide uppercase border-b-[3px] border-black inline-block pb-1">SURAT PERNYATAAN KEHILANGAN</h1>
        </div>

        <div className="mb-6 break-inside-avoid text-justify">
            <p>Yang bertanda tangan di bawah ini:</p>
            <div className="ml-4 mt-2">
                <table className="w-full text-justify">
                    <tbody>
                        <tr><td className="w-48 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                        <tr><td className="w-48 align-top">Nomor Induk Kependudukan (NIK)</td><td className="w-4 align-top">:</td><td className="align-top font-mono tracking-wider">{data.nik}</td></tr>
                        <tr><td className="w-48 align-top">Tempat, Tanggal Lahir</td><td className="w-4 align-top">:</td><td className="align-top">{data.pob}, {formatDateSafe(data.dob)}</td></tr>
                        <tr><td className="w-48 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td className="align-top">{data.job}</td></tr>
                        <tr><td className="w-48 align-top">No. Telepon / HP</td><td className="w-4 align-top">:</td><td className="align-top">{data.phone}</td></tr>
                        <tr><td className="w-48 align-top">Alamat Sesuai KTP</td><td className="w-4 align-top">:</td><td className="align-top">{data.address}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mb-4 text-justify break-inside-avoid">
            <p>
                Dengan ini menyatakan dengan sebenar-benarnya bahwa saya telah <strong>KEHILANGAN</strong> barang/dokumen penting dengan rincian sebagai berikut:
            </p>
            <div className="ml-4 mt-2 p-3 border border-slate-300 bg-slate-50">
                <table className="w-full">
                    <tbody>
                        <tr><td className="w-48 font-bold align-top">Nama Barang/Dokumen</td><td className="w-4 align-top font-bold">:</td><td className="font-bold uppercase align-top text-red-700 print:text-black">{data.itemName}</td></tr>
                        <tr><td className="w-48 align-top">Nomor/Identitas Barang</td><td className="w-4 align-top">:</td><td className="align-top">{data.itemSerialNo}</td></tr>
                        <tr><td className="w-48 align-top">Ciri-Ciri Barang</td><td className="w-4 align-top">:</td><td className="align-top">{data.itemFeatures}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mb-4 text-justify break-inside-avoid">
            <p>Barang/dokumen tersebut diperkirakan hilang pada:</p>
            <div className="ml-4 mt-2 mb-2">
                <table className="w-full">
                    <tbody>
                        <tr><td className="w-48 align-top">Hari, Tanggal</td><td className="w-4 align-top">:</td><td className="font-bold align-top">{formatDateSafe(data.lossDate)}</td></tr>
                        <tr><td className="w-48 align-top">Perkiraan Waktu (Jam)</td><td className="w-4 align-top">:</td><td className="font-bold align-top">{data.lossTime} WIB/WITA/WIT</td></tr>
                        <tr><td className="w-48 align-top">Lokasi Kejadian</td><td className="w-4 align-top">:</td><td className="font-bold align-top">{data.lossLocation}</td></tr>
                    </tbody>
                </table>
            </div>
            <p>Dengan rincian kronologi kejadian sebagai berikut:</p>
            <p className="indent-8 mt-1 italic">"{data.lossChronology}"</p>
        </div>

        <div className="mb-8 text-justify break-inside-avoid">
            <p className="mb-2">Adapun upaya pencarian yang telah dilakukan adalah: <em>"{data.searchEfforts}"</em>.</p>
            <p className="mb-2">Surat pernyataan ini dibuat dengan tujuan: <strong>{data.purpose}</strong>.</p>
            <p className="mt-4 font-bold border-l-4 border-slate-900 pl-3 py-1 bg-slate-100 italic">
                Apabila di kemudian hari barang/dokumen tersebut ditemukan, atau ternyata pernyataan ini terbukti tidak benar/palsu, maka saya bersedia dituntut sesuai dengan hukum yang berlaku tanpa melibatkan pihak Kepolisian maupun Instansi terkait lainnya.
            </p>
        </div>

        <div className="flex justify-end text-center break-inside-avoid mt-12 pr-4">
            <div className="w-64">
                <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="font-bold mb-2 uppercase">Yang Membuat Pernyataan,</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.name}</p>
                <p className="text-sm">NIK: {data.nik}</p>
            </div>
        </div>
      </Kertas>
    );
  };

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
              <ArrowLeftCircle size={20} className="text-red-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Pernyataan Kehilangan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-red-600" /> Form Kehilangan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pelapor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pelapor' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pelapor</button>
                <button onClick={() => setActiveTab('barang')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'barang' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Barang</button>
                <button onClick={() => setActiveTab('kejadian')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kejadian' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Kejadian</button>
                <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'lainnya' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Lainnya</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pelapor' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-slate-600"/> Identitas Pelapor
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pob} onChange={e => handleDataChange('pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.dob} onChange={e => handleDataChange('dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'barang' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-blue-600"/> Detail Barang/Dokumen
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Barang (Contoh: BPKB/KTP/Buku Tabungan)</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.itemName} onChange={e => handleDataChange('itemName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Seri / Identitas Barang (Jika Ada)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.itemSerialNo} onChange={e => handleDataChange('itemSerialNo', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ciri-Ciri Barang</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.itemFeatures} onChange={e => handleDataChange('itemFeatures', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kejadian' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <AlertCircle size={14} className="text-amber-600"/> Waktu & Kronologi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Hilang</label>
                                <input type="date" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.lossDate} onChange={e => handleDataChange('lossDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Perkiraan Waktu (Jam)</label>
                                <input type="time" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.lossTime} onChange={e => handleDataChange('lossTime', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Hilang</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.lossLocation} onChange={e => handleDataChange('lossLocation', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kronologi Kejadian Secara Singkat</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-justify" value={data.lossChronology} onChange={e => handleDataChange('lossChronology', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'lainnya' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Search size={14} className="text-emerald-600"/> Tambahan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upaya Pencarian yang Dilakukan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-justify" value={data.searchEfforts} onChange={e => handleDataChange('searchEfforts', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Surat</label>
                            <textarea className="w-full bg-emerald-50 p-3 border border-emerald-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-justify" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                            </div>
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
              <PrintWrapper documentName={`Pernyataan_Kehilangan_${data.name.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
