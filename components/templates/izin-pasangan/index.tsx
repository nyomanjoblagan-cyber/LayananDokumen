'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: IzinPasanganPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Surat Izin Pasangan (Suami/Istri) untuk Dokumen Legal (Bank / Luar Negeri)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, ShieldCheck, FileSignature, Briefcase, Landmark
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PartnerData {
  city: string;
  date: string;
  
  // Pemberi Izin (Pasangan)
  partnerRelation: 'SUAMI' | 'ISTRI'; 
  partnerName: string;
  partnerNik: string;
  partnerBirthPlace: string;
  partnerBirthDate: string;
  partnerReligion: string;
  partnerJob: string;
  partnerAddress: string;
  partnerPhone: string;

  // Penerima Izin
  userName: string;
  userNik: string;
  userBirthPlace: string;
  userBirthDate: string;
  userReligion: string;
  userJob: string;
  userAddress: string;
  userPhone: string;

  // Keperluan
  purposeType: 'KERJA_LUAR_NEGERI' | 'PINJAMAN_BANK' | 'CUSTOM';
  destinationCountry: string; // Khusus luar negeri
  agencyName: string; // Nama PT/PJTKI
  bankName: string; // Khusus Bank
  customPurpose: string;
  
  // Pengesahan
  includeVillageSign: boolean;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PartnerData = {
  city: 'JAKARTA',
  date: '',
  
  partnerRelation: 'SUAMI',
  partnerName: 'BUDI SANTOSO',
  partnerNik: '3171234567890001',
  partnerBirthPlace: 'SURABAYA',
  partnerBirthDate: '1985-05-15',
  partnerReligion: 'ISLAM',
  partnerJob: 'KARYAWAN SWASTA',
  partnerAddress: 'JL. MERDEKA NO. 45, KELURAHAN MENTENG, KECAMATAN MENTENG, JAKARTA PUSAT',
  partnerPhone: '081234567890',

  userName: 'SITI AMINAH',
  userNik: '3171234567890002',
  userBirthPlace: 'JAKARTA',
  userBirthDate: '1988-08-20',
  userReligion: 'ISLAM',
  userJob: 'IBU RUMAH TANGGA',
  userAddress: 'JL. MERDEKA NO. 45, KELURAHAN MENTENG, KECAMATAN MENTENG, JAKARTA PUSAT',
  userPhone: '081987654321',

  purposeType: 'KERJA_LUAR_NEGERI',
  destinationCountry: 'TAIWAN',
  agencyName: 'PT. MAJU BERSAMA TKI',
  bankName: 'PT. BANK RAKYAT INDONESIA (PERSERO) TBK',
  customPurpose: 'MENGIKUTI PROGRAM PELATIHAN DAN SERTIFIKASI PROFESI SELAMA 6 BULAN DI JAKARTA.',
  
  includeVillageSign: true
};

const RELIGION_OPTIONS = ['ISLAM', 'KRISTEN', 'KATHOLIK', 'HINDU', 'BUDHA', 'KONGHUCU'];

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function IzinPasanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PartnerConsentBuilder />
    </Suspense>
  );
}

function PartnerConsentBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PartnerData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PartnerData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-8 border-b-2 border-black pb-2">
          <h1 className="font-bold text-xl uppercase tracking-wider underline">SURAT IZIN {data.partnerRelation}</h1>
        </div>

        <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini:</p>

        <div className="mb-6 space-y-4">
          <div className="">
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Nama Lengkap</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-bold uppercase">{data.partnerName}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Nomor Induk Kependudukan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-mono">{data.partnerNik}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Tempat, Tgl Lahir</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.partnerBirthPlace}, {formatDateSafe(data.partnerBirthDate)}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Agama</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.partnerReligion}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Pekerjaan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.partnerJob}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold align-top">Alamat Lengkap</div>
                  <div className="w-4 align-top">:</div>
                  <div className="flex-1 text-justify uppercase">{data.partnerAddress}</div>
              </div>
          </div>
        </div>

        <p className="mb-4 text-justify">
          Dalam hal ini bertindak sebagai <strong>{data.partnerRelation}</strong> yang sah dari:
        </p>

        <div className="mb-6 space-y-4">
          <div className="">
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Nama Lengkap</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-bold uppercase">{data.userName}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Nomor Induk Kependudukan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-mono">{data.userNik}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Tempat, Tgl Lahir</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.userBirthPlace}, {formatDateSafe(data.userBirthDate)}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Agama</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.userReligion}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold">Pekerjaan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 uppercase">{data.userJob}</div>
              </div>
              <div className="flex mb-1">
                  <div className="w-48 font-semibold align-top">Alamat Lengkap</div>
                  <div className="w-4 align-top">:</div>
                  <div className="flex-1 text-justify uppercase">{data.userAddress}</div>
              </div>
          </div>
        </div>

        <div className="mb-8 text-justify leading-relaxed">
          <p>
            Dengan ini menyatakan dengan sesungguhnya bahwa saya <strong>MEMBERIKAN IZIN / PERSETUJUAN</strong> sepenuhnya kepada {data.partnerRelation === 'SUAMI' ? 'Istri' : 'Suami'} saya tersebut di atas untuk:
          </p>
          
          <div className="mt-4 p-4 border border-black bg-slate-50 font-semibold uppercase text-center">
            {data.purposeType === 'KERJA_LUAR_NEGERI' && (
               <span>Bekerja di luar negeri tujuan {data.destinationCountry} melalui Perusahaan Penyalur Pekerja Migran Indonesia (P3MI) {data.agencyName}.</span>
            )}
            {data.purposeType === 'PINJAMAN_BANK' && (
               <span>Mengajukan pinjaman / fasilitas kredit dan menjaminkan aset bersama pada {data.bankName}.</span>
            )}
            {data.purposeType === 'CUSTOM' && (
               <span>{data.customPurpose}</span>
            )}
          </div>
        </div>

        <p className="mb-12 text-justify leading-relaxed">
          Demikian Surat Izin {data.partnerRelation} ini saya buat dengan sadar, tanpa ada paksaan dari pihak manapun, agar dapat dipergunakan sebagaimana mestinya oleh pihak-pihak yang berkepentingan.
        </p>

        {/* TANDA TANGAN */}
        <div className="">
            <div className="text-right mb-4">
              <p>{data.city}, {formatDateSafe(data.date)}</p>
            </div>
            
            <div className="flex justify-between text-center mb-16">
              <div className="w-[45%]">
                <p>Yang Diberi Izin,</p>
                <p className="mb-2 uppercase">{data.partnerRelation === 'SUAMI' ? 'Istri' : 'Suami'}</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.userName}</p>
              </div>
              <div className="w-[45%]">
                <p>Yang Memberi Izin,</p>
                <p className="mb-2 uppercase">{data.partnerRelation}</p>
                <div className="h-4"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.partnerName}</p>
              </div>
            </div>

            {data.includeVillageSign && (
              <div className="mt-8 text-center border-t border-black pt-8">
                <p>Mengetahui,</p>
                <p className="mb-2">Kepala Desa / Lurah Setempat</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">____________________________</p>
              </div>
            )}
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
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Izin Pasangan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-sky-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {/* METADATA SURAT */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <FileSignature size={14} className="text-blue-600"/> Info Dokumen
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Tanda Tangan</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pihak Pemberi Izin</label>
                        <select className="w-full bg-blue-50 p-3 border border-blue-200 rounded-xl text-sm font-bold text-blue-700 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={data.partnerRelation} onChange={e => handleDataChange('partnerRelation', e.target.value)}>
                            <option value="SUAMI">Suami (Memberi izin ke Istri)</option>
                            <option value="ISTRI">Istri (Memberi izin ke Suami)</option>
                        </select>
                    </div>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" checked={data.includeVillageSign} onChange={e => handleDataChange('includeVillageSign', e.target.checked)} />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide group-hover:text-blue-600">Tambahkan Kolom Ttd Kepala Desa</span>
                    </label>
                 </div>
              </div>

              {/* DATA PEMBERI IZIN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <ShieldCheck size={14} className="text-emerald-600"/> Data {data.partnerRelation} (Pemberi Izin)
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.partnerName} onChange={e => handleDataChange('partnerName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (No. KTP)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.partnerNik} onChange={e => handleDataChange('partnerNik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.partnerBirthPlace} onChange={e => handleDataChange('partnerBirthPlace', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.partnerBirthDate} onChange={e => handleDataChange('partnerBirthDate', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                          <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.partnerReligion} onChange={e => handleDataChange('partnerReligion', e.target.value)}>
                            {RELIGION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.partnerJob} onChange={e => handleDataChange('partnerJob', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.partnerPhone} onChange={e => handleDataChange('partnerPhone', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase leading-relaxed" value={data.partnerAddress} onChange={e => handleDataChange('partnerAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA PENERIMA IZIN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-rose-600"/> Data {data.partnerRelation === 'SUAMI' ? 'Istri' : 'Suami'} (Penerima Izin)
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.userName} onChange={e => handleDataChange('userName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (No. KTP)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.userNik} onChange={e => handleDataChange('userNik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.userBirthPlace} onChange={e => handleDataChange('userBirthPlace', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.userBirthDate} onChange={e => handleDataChange('userBirthDate', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                          <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.userReligion} onChange={e => handleDataChange('userReligion', e.target.value)}>
                            {RELIGION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.userJob} onChange={e => handleDataChange('userJob', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.userPhone} onChange={e => handleDataChange('userPhone', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase leading-relaxed" value={data.userAddress} onChange={e => handleDataChange('userAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* KEPERLUAN IZIN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Briefcase size={14} className="text-purple-600"/> Keperluan Izin
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan / Keperluan Utama</label>
                      <select className="w-full bg-purple-50 p-3 border border-purple-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-purple-500" value={data.purposeType} onChange={e => handleDataChange('purposeType', e.target.value)}>
                        <option value="KERJA_LUAR_NEGERI">Kerja Ke Luar Negeri (TKI/PMI)</option>
                        <option value="PINJAMAN_BANK">Pengajuan Pinjaman / Kredit Bank</option>
                        <option value="CUSTOM">Lainnya (Tulis Manual)</option>
                      </select>
                    </div>

                    {data.purposeType === 'KERJA_LUAR_NEGERI' && (
                      <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Negara Tujuan</label>
                          <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none uppercase" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Contoh: TAIWAN" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama PJTKI / Agensi (PT)</label>
                          <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none uppercase" value={data.agencyName} onChange={e => handleDataChange('agencyName', e.target.value)} placeholder="Contoh: PT. MAJU BERSAMA" />
                        </div>
                      </div>
                    )}

                    {data.purposeType === 'PINJAMAN_BANK' && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none uppercase" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} placeholder="Contoh: BANK BRI" />
                      </div>
                    )}

                    {data.purposeType === 'CUSTOM' && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ketik Keperluan Lengkap</label>
                        <textarea className="w-full bg-white p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-purple-500 outline-none uppercase" value={data.customPurpose} onChange={e => handleDataChange('customPurpose', e.target.value)} placeholder="Mengikuti pelatihan..." />
                      </div>
                    )}
                 </div>
              </div>

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat_Izin_Pasangan" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
