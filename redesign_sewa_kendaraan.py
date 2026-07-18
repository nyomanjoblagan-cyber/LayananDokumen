import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\sewa-kendaraan\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SewaKendaraanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Sewa Kendaraan (Rental Agreement)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Car, Building2, UserCircle2, 
  MapPin, ShieldCheck, Key, FileWarning
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  docNo: string;
  
  ownerName: string;
  ownerNik: string;
  ownerAddress: string;
  ownerCompany: string; 
  
  renterName: string;
  renterNik: string;
  renterAddress: string;
  renterPhone: string;
  
  vehicleModel: string;
  plateNumber: string;
  frameNumber: string;
  engineNumber: string;
  
  rentalDuration: string;
  startDate: string;
  endDate: string;
  rentalPrice: string;
  totalPrice: string;
  insuranceType: string;
  deductible: string;
  overtimePenalty: string;
  usageArea: string;
  courtJurisdiction: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'DENPASAR',
  date: '2026-01-08', 
  docNo: 'RENT/2026/01/007',
  
  ownerName: 'I MADE WIGUNA',
  ownerNik: '5171010101880001',
  ownerAddress: 'Jl. Sunset Road No. 88, Kuta, Bali',
  ownerCompany: 'WIGUNA RENT CAR',
  
  renterName: 'JOHN DOE',
  renterNik: '3172020202950003',
  renterAddress: 'Villa Seminyak, No. 12A, Badung, Bali',
  renterPhone: '081234567890',
  
  vehicleModel: 'TOYOTA AVANZA VELOZ 2024',
  plateNumber: 'DK 1234 AB',
  frameNumber: 'MHFW123456789',
  engineNumber: '1NR-FE12345',
  
  rentalDuration: '3 (Tiga) Hari',
  startDate: '2026-01-10',
  endDate: '2026-01-13',
  
  rentalPrice: 'Rp 450.000,-',
  totalPrice: 'Rp 1.350.000,-',
  insuranceType: 'All Risk (Comprehensive)',
  deductible: 'Rp 3.000.000,- (Tiga Juta Rupiah)',
  overtimePenalty: 'Rp 50.000,- / Jam',
  usageArea: 'Pulau Bali',
  courtJurisdiction: 'Pengadilan Negeri Denpasar'
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
export default function SewaKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <VehicleRentalBuilder />
    </Suspense>
  );
}

function VehicleRentalBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'kendaraan' | 'ketentuan'>('pihak1');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form sewa kendaraan ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="font-bold text-lg underline uppercase tracking-wider">PERJANJIAN SEWA KENDARAAN</h1>
        <p className="font-bold uppercase mt-1">Nomor: {data.docNo}</p>
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
            <div className="flex"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.ownerName}</div></div>
            <div className="flex"><div className="w-32">NIK KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.ownerNik}</div></div>
            <div className="flex"><div className="w-32">Perusahaan</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.ownerCompany}</div></div>
            <div className="flex"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.ownerAddress}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (PEMILIK/YANG MENYEWAKAN)</strong>.</p>
        </div>
      </div>

      {/* PIHAK 2 (Penyewa) */}
      <div className="mb-6 break-inside-avoid">
        <div className="flex mb-1">
          <div className="w-8 font-bold">II.</div>
          <div className="flex-1">
            <div className="flex"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.renterName}</div></div>
            <div className="flex"><div className="w-32">NIK KTP / Paspor</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.renterNik}</div></div>
            <div className="flex"><div className="w-32">No. Telp / HP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.renterPhone}</div></div>
            <div className="flex"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.renterAddress}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA (PENYEWA)</strong>.</p>
        </div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Sewa Kendaraan dengan ketentuan dan syarat-syarat sebagai berikut:</p>
      </div>

      {/* PASAL-PASAL */}
      <div className="mb-4 text-justify break-inside-avoid">
        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 1: Objek Sewa</h3>
        <p>PIHAK PERTAMA menyewakan kepada PIHAK KEDUA berupa 1 (satu) unit kendaraan bermotor dengan spesifikasi:</p>
        <div className="ml-4 mt-2">
            <div className="flex"><div className="w-40">Merek / Tipe</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.vehicleModel}</div></div>
            <div className="flex"><div className="w-40">Nomor Polisi</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.plateNumber}</div></div>
            <div className="flex"><div className="w-40">Nomor Rangka</div><div className="w-4">:</div><div className="flex-1">{data.frameNumber}</div></div>
            <div className="flex"><div className="w-40">Nomor Mesin</div><div className="w-4">:</div><div className="flex-1">{data.engineNumber}</div></div>
        </div>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 2: Jangka Waktu & Harga Sewa</h3>
        <ol className="list-decimal pl-5 space-y-1">
            <li>Lama sewa kendaraan adalah selama <strong>{data.rentalDuration}</strong> terhitung sejak tanggal <strong>{formatDateDisplay(data.startDate)}</strong> hingga <strong>{formatDateDisplay(data.endDate)}</strong>.</li>
            <li>Harga sewa disepakati sebesar <strong>{data.rentalPrice} per hari</strong>, dengan total pembayaran sebesar <strong>{data.totalPrice}</strong>.</li>
            <li>Keterlambatan pengembalian dikenakan denda *overtime* sebesar <strong>{data.overtimePenalty}</strong>.</li>
        </ol>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 3: Penggunaan Kendaraan</h3>
        <p>Kendaraan hanya boleh digunakan di dalam wilayah operasional <strong>{data.usageArea}</strong>. PIHAK KEDUA dilarang menyewakan kembali (sub-lease), memindahtangankan, atau menggunakan kendaraan untuk tindakan melanggar hukum.</p>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 4: Asuransi & Risiko Kecelakaan</h3>
        <ol className="list-decimal pl-5 space-y-1">
            <li>Kendaraan dilindungi oleh asuransi <strong>{data.insuranceType}</strong>.</li>
            <li>Apabila terjadi kecelakaan atau kerusakan selama masa sewa, PIHAK KEDUA wajib membayar biaya risiko sendiri (*Own Risk / Deductible*) sebesar <strong>{data.deductible}</strong> per kejadian, serta menanggung biaya sewa berjalan selama kendaraan diperbaiki di bengkel.</li>
            <li>Kehilangan kendaraan menjadi tanggung jawab penuh PIHAK KEDUA jika terbukti akibat kelalaian (kunci tertinggal, dll).</li>
        </ol>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 5: Penyelesaian Sengketa</h3>
        <p>Apabila terjadi perselisihan, PARA PIHAK sepakat menyelesaikan secara kekeluargaan. Jika tidak tercapai mufakat, maka diselesaikan melalui jalur hukum di Kepaniteraan <strong>{data.courtJurisdiction}</strong>.</p>
      </div>

      <div className="text-justify mb-8 break-inside-avoid mt-6">
        <p>Demikian perjanjian ini dibuat rangkap 2 (dua) bermeterai cukup dan mempunyai kekuatan hukum yang sama, ditandatangani tanpa ada paksaan dari pihak mana pun.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">PIHAK PERTAMA<br/>(Pemilik Kendaraan)</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(TTD & Stempel)</span>
            </div>
            <p className="font-bold underline uppercase">{data.ownerName}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">{data.city}, {formatDateDisplay(data.date)}<br/>PIHAK KEDUA<br/>(Penyewa)</p>
            <div className="h-20 flex justify-center items-center relative">
                <div className="border border-dashed border-gray-400 text-gray-400 text-[10px] w-24 h-12 flex items-center justify-center print:hidden absolute left-1/2 transform -translate-x-1/2 mt-4 z-0">Meterai 10000</div>
            </div>
            <p className="font-bold underline uppercase relative z-10">{data.renterName}</p>
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
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Sewa Kendaraan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Perjanjian</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Key size={18} className="text-indigo-600" /> Editor Sewa</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-indigo-500 text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2</button>
                <button onClick={() => setActiveTab('kendaraan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kendaraan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Kendaraan</button>
                <button onClick={() => setActiveTab('ketentuan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ketentuan' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Ketentuan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Pihak 1 (Pemilik Kendaraan / Rental)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemilik/Perwakilan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerName} onChange={e => handleChange('ownerName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerNik} onChange={e => handleChange('ownerNik', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Opsional)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerCompany} onChange={e => handleChange('ownerCompany', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ownerAddress} onChange={e => handleChange('ownerAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-indigo-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-indigo-600"/> Pihak 2 (Penyewa)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penyewa</label>
                            <input className="w-full bg-indigo-50 p-2.5 border border-indigo-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.renterName} onChange={e => handleChange('renterName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP / Paspor</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.renterNik} onChange={e => handleChange('renterNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telp / WA</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.renterPhone} onChange={e => handleChange('renterPhone', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Tempat Tinggal / Hotel</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.renterAddress} onChange={e => handleChange('renterAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kendaraan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Car size={14} className="text-amber-600"/> Detail Kendaraan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Merek / Tipe / Tahun Kendaraan</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.vehicleModel} onChange={e => handleChange('vehicleModel', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Polisi (Plat)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.plateNumber} onChange={e => handleChange('plateNumber', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Batas Area Penggunaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.usageArea} onChange={e => handleChange('usageArea', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rangka</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.frameNumber} onChange={e => handleChange('frameNumber', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Mesin</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.engineNumber} onChange={e => handleChange('engineNumber', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ketentuan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-red-600"/> Ketentuan, Harga, Asuransi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lama Sewa</label>
                                <input className="w-full bg-red-50 p-2.5 border border-red-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.rentalDuration} onChange={e => handleChange('rentalDuration', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Mulai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.startDate} onChange={e => handleChange('startDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Selesai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.endDate} onChange={e => handleChange('endDate', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Sewa / Hari</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.rentalPrice} onChange={e => handleChange('rentalPrice', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Bayar</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.totalPrice} onChange={e => handleChange('totalPrice', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Asuransi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.insuranceType} onChange={e => handleChange('insuranceType', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Overtime / Jam</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.overtimePenalty} onChange={e => handleChange('overtimePenalty', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Own Risk / Kejadian (Kecelakaan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.deductible} onChange={e => handleChange('deductible', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Domisili Hukum Sengketa</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.courtJurisdiction} onChange={e => handleChange('courtJurisdiction', e.target.value)} />
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
              <PrintWrapper documentName={`Sewa_Kendaraan_${data.plateNumber.replace(/\\s+/g, '_')}`} price={45000} />
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
