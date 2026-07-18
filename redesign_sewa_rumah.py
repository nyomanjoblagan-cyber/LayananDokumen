import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\sewa-rumah\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SewaRumahPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Sewa Rumah / Properti dengan Standar Notaris/Legal Formal
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Home, Building2, UserCircle2, 
  MapPin, ShieldCheck, Key, FileWarning, BadgeDollarSign
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  
  ownerName: string;
  ownerNik: string;
  ownerPob: string;
  ownerDob: string;
  ownerOccupation: string;
  ownerAddress: string;

  tenantName: string;
  tenantNik: string;
  tenantPob: string;
  tenantDob: string;
  tenantOccupation: string;
  tenantAddress: string;

  type: string;
  addressProp: string;
  facilities: string;
  purpose: string;
  
  startDate: string;
  endDate: string;
  duration: string;
  
  price: string;
  paymentMethod: string;
  paymentTerms: string;
  deposit: string;

  latePenalty: string;
  evictionDaysLimit: string;
  
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'SURABAYA',
  date: '2026-03-01', 
  
  ownerName: 'H. ABDUL ROFIQ',
  ownerNik: '3578010101700001',
  ownerPob: 'Surabaya',
  ownerDob: '1970-01-01',
  ownerOccupation: 'Wiraswasta',
  ownerAddress: 'Jl. Darmo Permai No. 10, RT 001/RW 002, Kelurahan Darmo, Kecamatan Dukuh Pakis, Kota Surabaya',
  
  tenantName: 'BUDI SANTOSO',
  tenantNik: '3578010101850005',
  tenantPob: 'Sidoarjo',
  tenantDob: '1985-05-15',
  tenantOccupation: 'Karyawan Swasta',
  tenantAddress: 'Jl. Ahmad Yani No. 5, RT 003/RW 004, Kelurahan Gedangan, Kecamatan Gedangan, Kabupaten Sidoarjo',
  
  type: 'RUMAH TINGGAL',
  addressProp: 'Perumahan Graha Famili Blok B-10, Surabaya',
  facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit, Pompa Air, Gordyn',
  purpose: 'Tempat Tinggal Keluarga',
  
  startDate: '2026-03-01',
  endDate: '2028-03-01',
  duration: '2 (Dua) Tahun',
  
  price: 'Rp 65.000.000,- / Tahun (Enam Puluh Lima Juta Rupiah)',
  paymentMethod: 'Transfer Bank BCA Rek. 1234567890 a.n H. Abdul Rofiq',
  paymentTerms: 'Lunas di awal (100%)',
  deposit: 'Rp 5.000.000,- (Lima Juta Rupiah)',

  latePenalty: 'Rp 100.000,- / Hari',
  evictionDaysLimit: '14 (Empat Belas) Hari',
  
  witness1: 'Ketua RT Setempat (Bpk. Joko)',
  witness2: 'Istri Penyewa (Ibu Siti)'
};

// --- HELPERS ---
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SewaRumahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <HouseRentalBuilder />
    </Suspense>
  );
}

function HouseRentalBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak' | 'properti' | 'harga' | 'sanksi'>('pihak');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form sewa properti ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="font-bold text-lg underline uppercase tracking-wider">PERJANJIAN SEWA MENYEWA PROPERTI</h1>
      </div>

      {/* MUKADIMAH */}
      <div className="text-justify mb-4 break-inside-avoid">
        <p>Pada hari ini, bertempat di <strong>{data.city}</strong> tanggal <strong>{formatDateDisplay(data.date)}</strong>, yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK 1 (Pemilik) */}
      <div className="mb-4 break-inside-avoid">
        <div className="flex mb-1">
          <div className="w-8 font-bold">I.</div>
          <div className="flex-1">
            <div className="flex"><div className="w-32">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.ownerName}</div></div>
            <div className="flex"><div className="w-32">NIK KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.ownerNik}</div></div>
            <div className="flex"><div className="w-32">TTL</div><div className="w-4">:</div><div className="flex-1">{data.ownerPob}, {formatDateDisplay(data.ownerDob)}</div></div>
            <div className="flex"><div className="w-32">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.ownerOccupation}</div></div>
            <div className="flex"><div className="w-32">Alamat KTP</div><div className="w-4">:</div><div className="flex-1">{data.ownerAddress}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri, selaku pemilik properti, selanjutnya disebut <strong>PIHAK PERTAMA (YANG MENYEWAKAN)</strong>.</p>
        </div>
      </div>

      {/* PIHAK 2 (Penyewa) */}
      <div className="mb-6 break-inside-avoid">
        <div className="flex mb-1">
          <div className="w-8 font-bold">II.</div>
          <div className="flex-1">
            <div className="flex"><div className="w-32">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.tenantName}</div></div>
            <div className="flex"><div className="w-32">NIK KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.tenantNik}</div></div>
            <div className="flex"><div className="w-32">TTL</div><div className="w-4">:</div><div className="flex-1">{data.tenantPob}, {formatDateDisplay(data.tenantDob)}</div></div>
            <div className="flex"><div className="w-32">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.tenantOccupation}</div></div>
            <div className="flex"><div className="w-32">Alamat KTP</div><div className="w-4">:</div><div className="flex-1">{data.tenantAddress}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya disebut <strong>PIHAK KEDUA (PENYEWA)</strong>.</p>
        </div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>PARA PIHAK sepakat mengikatkan diri dalam Perjanjian Sewa Menyewa dengan ketentuan pasal-pasal berikut:</p>
      </div>

      {/* PASAL-PASAL */}
      <div className="mb-4 text-justify break-inside-avoid">
        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 1: Objek Sewa</h3>
        <p>PIHAK PERTAMA menyewakan kepada PIHAK KEDUA berupa <strong>{data.type}</strong> yang terletak di <strong>{data.addressProp}</strong> beserta fasilitas pendukung berupa: {data.facilities}.</p>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 2: Jangka Waktu & Harga Sewa</h3>
        <ol className="list-decimal pl-5 space-y-1">
            <li>Sewa berlangsung selama <strong>{data.duration}</strong> terhitung sejak tanggal <strong>{formatDateDisplay(data.startDate)}</strong> hingga <strong>{formatDateDisplay(data.endDate)}</strong>.</li>
            <li>Harga sewa adalah <strong>{data.price}</strong>, dibayarkan dengan sistem <strong>{data.paymentTerms}</strong> melalui <strong>{data.paymentMethod}</strong>.</li>
            <li>Uang Jaminan (Deposit) sebesar <strong>{data.deposit}</strong> diserahkan oleh PIHAK KEDUA dan akan dikembalikan pada akhir masa sewa setelah dipotong biaya perbaikan kerusakan atau tunggakan tagihan (jika ada).</li>
        </ol>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 3: Penggunaan & Perawatan</h3>
        <ol className="list-decimal pl-5 space-y-1">
            <li>Objek sewa hanya digunakan untuk keperluan <strong>{data.purpose}</strong>.</li>
            <li>PIHAK KEDUA dilarang menyewakan kembali (sub-lease) kepada pihak ketiga tanpa izin tertulis dari PIHAK PERTAMA.</li>
            <li>Biaya operasional (listrik, air, iuran lingkungan/keamanan) sepenuhnya menjadi tanggung jawab PIHAK KEDUA selama masa sewa.</li>
        </ol>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 4: Denda & Pengosongan Paksa</h3>
        <ol className="list-decimal pl-5 space-y-1">
            <li>Keterlambatan pembayaran sewa / perpanjangan dikenakan denda sebesar <strong>{data.latePenalty}</strong>.</li>
            <li>Apabila masa sewa berakhir dan tidak diperpanjang, PIHAK KEDUA wajib mengosongkan objek sewa paling lambat <strong>{data.evictionDaysLimit}</strong> setelah masa sewa berakhir.</li>
            <li>Jika lewat batas waktu tersebut belum dikosongkan, PIHAK PERTAMA berhak mengeluarkan barang secara sepihak dan memutuskan utilitas tanpa ganti rugi.</li>
        </ol>
      </div>

      <div className="text-justify mb-8 break-inside-avoid mt-6">
        <p>Demikian perjanjian ini dibuat rangkap 2 (dua) bermeterai cukup, ditandatangani dalam keadaan sehat jasmani dan rohani tanpa paksaan.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8 mb-8">
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">PIHAK PERTAMA<br/>(Pemilik Properti)</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(TTD)</span>
            </div>
            <p className="font-bold underline uppercase">{data.ownerName}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">{data.city}, {formatDateDisplay(data.date)}<br/>PIHAK KEDUA<br/>(Penyewa)</p>
            <div className="h-20 flex justify-center items-center relative">
                <div className="border border-dashed border-gray-400 text-gray-400 text-[10px] w-24 h-12 flex items-center justify-center print:hidden absolute left-1/2 transform -translate-x-1/2 mt-4 z-0">Meterai 10000</div>
            </div>
            <p className="font-bold underline uppercase relative z-10">{data.tenantName}</p>
        </div>
      </div>
      
      {/* SAKSI */}
      <div className="flex justify-center px-4 break-inside-avoid">
        <div className="text-center w-64 mr-8">
            <p className="mb-2 uppercase font-bold">SAKSI 1</p>
            <div className="h-16 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.witness1}</p>
        </div>
        <div className="text-center w-64 ml-8">
            <p className="mb-2 uppercase font-bold">SAKSI 2</p>
            <div className="h-16 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.witness2}</p>
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
              <ArrowLeftCircle size={20} className="text-teal-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Sewa Properti/Rumah</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Perjanjian</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Key size={18} className="text-teal-600" /> Editor Sewa</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1 & 2</button>
                <button onClick={() => setActiveTab('properti')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'properti' ? 'bg-white border-t-2 border-teal-500 text-teal-700' : 'text-slate-500 hover:bg-slate-200'}`}>Properti</button>
                <button onClick={() => setActiveTab('harga')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'harga' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Harga & Durasi</button>
                <button onClick={() => setActiveTab('sanksi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'sanksi' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Sanksi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Pihak 1 (Pemilik Properti)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerName} onChange={e => handleChange('ownerName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerNik} onChange={e => handleChange('ownerNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerOccupation} onChange={e => handleChange('ownerOccupation', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerPob} onChange={e => handleChange('ownerPob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerDob} onChange={e => handleChange('ownerDob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerAddress} onChange={e => handleChange('ownerAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-teal-500 mt-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-teal-600"/> Pihak 2 (Penyewa)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-teal-50 p-2.5 border border-teal-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantName} onChange={e => handleChange('tenantName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantNik} onChange={e => handleChange('tenantNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantOccupation} onChange={e => handleChange('tenantOccupation', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantPob} onChange={e => handleChange('tenantPob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantDob} onChange={e => handleChange('tenantDob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.tenantAddress} onChange={e => handleChange('tenantAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'properti' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-teal-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Home size={14} className="text-teal-600"/> Detail Properti
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Properti</label>
                                <input className="w-full bg-teal-50 p-2.5 border border-teal-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.type} onChange={e => handleChange('type', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Sewa</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.purpose} onChange={e => handleChange('purpose', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Properti yang Disewa</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.addressProp} onChange={e => handleChange('addressProp', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fasilitas Tersedia</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.facilities} onChange={e => handleChange('facilities', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'harga' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BadgeDollarSign size={14} className="text-amber-600"/> Harga & Durasi Sewa
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lama Sewa</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.duration} onChange={e => handleChange('duration', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Mulai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.startDate} onChange={e => handleChange('startDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Selesai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.endDate} onChange={e => handleChange('endDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Harga Sewa / Periode</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.price} onChange={e => handleChange('price', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.paymentMethod} onChange={e => handleChange('paymentMethod', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Termin Pembayaran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.paymentTerms} onChange={e => handleChange('paymentTerms', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Jaminan / Deposit</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.deposit} onChange={e => handleChange('deposit', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'sanksi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-red-600"/> Sanksi, Pengosongan & Saksi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Keterlambatan Sewa</label>
                                <input className="w-full bg-red-50 p-2.5 border border-red-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.latePenalty} onChange={e => handleChange('latePenalty', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Pengosongan Pasca Sewa</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.evictionDaysLimit} onChange={e => handleChange('evictionDaysLimit', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 1 (Opsional)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.witness1} onChange={e => handleChange('witness1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 2 (Opsional)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.witness2} onChange={e => handleChange('witness2', e.target.value)} />
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
              <PrintWrapper documentName={`Sewa_Properti_${data.tenantName.replace(/\\s+/g, '_')}`} price={50000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
