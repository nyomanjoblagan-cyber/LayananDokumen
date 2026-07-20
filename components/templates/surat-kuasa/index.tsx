'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SuratKuasaPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Kuasa (Power of Attorney) Multi-Purpose Enterprise Grade
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  UserCheck, User, Scroll, FileText, Scale, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KuasaData {
  city: string;
  date: string;
  
  pemberiName: string;
  pemberiNik: string;
  pemberiTempatLahir: string;
  pemberiTglLahir: string;
  pemberiJob: string;
  pemberiAddress: string;

  penerimaName: string;
  penerimaNik: string;
  penerimaTempatLahir: string;
  penerimaTglLahir: string;
  penerimaJob: string;
  penerimaAddress: string;

  jenisKuasa: string; // 'UMUM' | 'KHUSUS'
  purposeTitle: string;
  purposeDetail: string;
  
  hakSubstitusi: string; // 'DENGAN HAK SUBSTITUSI' | 'TANPA HAK SUBSTITUSI'
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KuasaData = {
  city: 'Jakarta',
  date: '2026-07-13',
  
  pemberiName: 'BUDI SANTOSO',
  pemberiNik: '3171010101800001',
  pemberiTempatLahir: 'Jakarta',
  pemberiTglLahir: '1980-01-01',
  pemberiJob: 'Wiraswasta',
  pemberiAddress: 'Jl. Merdeka No. 45, Kel. Gambir, Kec. Gambir, Jakarta Pusat',
  
  penerimaName: 'ANDI SAPUTRA',
  penerimaNik: '3201010101950002',
  penerimaTempatLahir: 'Bekasi',
  penerimaTglLahir: '1995-02-15',
  penerimaJob: 'Karyawan Swasta',
  penerimaAddress: 'Jl. Kemenangan No. 10, Kel. Margahayu, Kec. Bekasi Timur, Bekasi',
  
  jenisKuasa: 'KHUSUS',
  purposeTitle: 'PENGAMBILAN BPKB KENDARAAN BERMOTOR',
  purposeDetail: 'Mengambil Buku Pemilik Kendaraan Bermotor (BPKB) pada instansi terkait dengan rincian:\n- Merk/Type: Honda Vario 125\n- No. Polisi: B 1234 XXX\n- No. Rangka: MH1JM123456789\n- Atas Nama: Budi Santoso',
  
  hakSubstitusi: 'TANPA HAK SUBSTITUSI',
};

// --- HELPER FUNCTION ---
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
export default function SuratKuasaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Kuasa...</div>}>
      <KuasaToolBuilder />
    </Suspense>
  );
}

function KuasaToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pemberi' | 'penerima' | 'kuasa'>('pemberi');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<KuasaData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof KuasaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-8 break-inside-avoid mt-8">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">SURAT KUASA {data.jenisKuasa}</h2>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PEMBERI KUASA */}
      <div className="mb-4 break-inside-avoid pl-4">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pemberiName}</div></div>
        <div className="flex mb-1"><div className="w-40">NIK / No. KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pemberiNik}</div></div>
        <div className="flex mb-1"><div className="w-40">Tempat, Tgl. Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pemberiTempatLahir}, {formatDateDisplay(data.pemberiTglLahir)}</div></div>
        <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pemberiJob}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.pemberiAddress}</div></div>
        <p className="mt-2 text-justify">Selanjutnya dalam Surat Kuasa ini disebut sebagai <strong>PEMBERI KUASA</strong>.</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Dengan ini memberikan kuasa penuh dengan hak substitusi sebagaimana disebutkan di bawah ini, kepada:</p>
      </div>

      {/* PENERIMA KUASA */}
      <div className="mb-6 break-inside-avoid pl-4">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.penerimaName}</div></div>
        <div className="flex mb-1"><div className="w-40">NIK / No. KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.penerimaNik}</div></div>
        <div className="flex mb-1"><div className="w-40">Tempat, Tgl. Lahir</div><div className="w-4">:</div><div className="flex-1">{data.penerimaTempatLahir}, {formatDateDisplay(data.penerimaTglLahir)}</div></div>
        <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.penerimaJob}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.penerimaAddress}</div></div>
        <p className="mt-2 text-justify">Selanjutnya dalam Surat Kuasa ini disebut sebagai <strong>PENERIMA KUASA</strong>.</p>
      </div>

      <div className="mb-6 text-center break-inside-avoid">
        <h3 className="font-bold underline text-lg tracking-widest uppercase">--- KHUSUS UNTUK ---</h3>
      </div>

      {/* ISI KUASA */}
      <div className="mb-8 text-justify break-inside-avoid">
        <p className="font-bold uppercase text-center mb-4">"{data.purposeTitle}"</p>
        <div className="whitespace-pre-line leading-relaxed">{data.purposeDetail}</div>
        <p className="mt-4">
            Untuk keperluan tersebut di atas, Penerima Kuasa berhak untuk menghadap instansi terkait, pejabat berwenang, serta pihak-pihak lain yang berkepentingan; memberikan keterangan-keterangan, membuat, menandatangani, dan menyerahkan surat-surat, dokumen-dokumen atau kwitansi-kwitansi, serta melakukan segala tindakan yang dipandang perlu dan berguna untuk mencapai maksud Surat Kuasa ini tanpa ada yang dikecualikan.
        </p>
        <p className="mt-4 font-bold text-center underline uppercase">
            {data.hakSubstitusi}
        </p>
      </div>

      <div className="text-justify mb-8 break-inside-avoid">
        <p>Demikian Surat Kuasa ini dibuat dengan sebenar-benarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun, untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <div className="mb-1 h-6"></div>
            <p className="mb-2 font-bold uppercase">PENERIMA KUASA</p>
            <div className="h-24 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.penerimaName}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-1">{data.city}, {formatDateDisplay(data.date)}</p>
            <p className="mb-2 font-bold uppercase">PEMBERI KUASA</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pemberiName}</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Kuasa Resmi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Scale size={18} className="text-blue-600" /> Editor Kuasa</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pemberi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemberi' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemberi Kuasa</button>
                <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima Kuasa</button>
                <button onClick={() => setActiveTab('kuasa')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kuasa' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Isi & Hak Kuasa</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pemberi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-slate-600"/> Data Pemberi Kuasa
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiName} onChange={e => handleChange('pemberiName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiNik} onChange={e => handleChange('pemberiNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiJob} onChange={e => handleChange('pemberiJob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTempatLahir} onChange={e => handleChange('pemberiTempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTglLahir} onChange={e => handleChange('pemberiTglLahir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiAddress} onChange={e => handleChange('pemberiAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCheck size={14} className="text-emerald-600"/> Data Penerima Kuasa (Yang Dikuasakan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaName} onChange={e => handleChange('penerimaName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaNik} onChange={e => handleChange('penerimaNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaJob} onChange={e => handleChange('penerimaJob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTempatLahir} onChange={e => handleChange('penerimaTempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTglLahir} onChange={e => handleChange('penerimaTglLahir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaAddress} onChange={e => handleChange('penerimaAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kuasa' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scroll size={14} className="text-amber-600"/> Ruang Lingkup & Hak Kuasa
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kuasa</label>
                                <select className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jenisKuasa} onChange={e => handleChange('jenisKuasa', e.target.value)}>
                                    <option value="UMUM">Kuasa Umum</option>
                                    <option value="KHUSUS">Kuasa Khusus</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hak Substitusi (Pengalihan)</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.hakSubstitusi} onChange={e => handleChange('hakSubstitusi', e.target.value)}>
                                    <option value="DENGAN HAK SUBSTITUSI">Dengan Hak Substitusi</option>
                                    <option value="TANPA HAK SUBSTITUSI">Tanpa Hak Substitusi</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul Tujuan Kuasa</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.purposeTitle} onChange={e => handleChange('purposeTitle', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rincian Tujuan (Gunakan bullet/dash)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.purposeDetail} onChange={e => handleChange('purposeDetail', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dokumen</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
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
              <PrintWrapper documentName={`SuratKuasa_${data.penerimaName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
