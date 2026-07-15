'use client';

/**
 * FILE: IzinPasanganPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Surat Izin Pasangan (Suami/Istri) untuk Dokumen Legal (Bank / Luar Negeri)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Briefcase, Landmark, Edit3, RotateCcw, ArrowLeftCircle,
  ShieldCheck, FileSignature
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

export default function IzinPasanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <PartnerConsentBuilder />
    </Suspense>
  );
}

function PartnerConsentBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PartnerData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PartnerData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke data awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Standar Legal' : 'Tanpa Pengesahan Desa';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return dateString;
        return dateObj.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    // Fungsi Render Paragraf Tujuan
    const renderPurpose = () => {
      if (data.purposeType === 'KERJA_LUAR_NEGERI') {
        return (
          <>
            <span className="font-bold">Mendaftar dan bekerja ke luar negeri</span> dengan negara tujuan <span className="font-bold uppercase">{data.destinationCountry}</span> melalui Pelaksana Penempatan Tenaga Kerja Indonesia Swasta (PPTKIS) / Perusahaan <span className="font-bold uppercase">{data.agencyName}</span>.
          </>
        );
      } else if (data.purposeType === 'PINJAMAN_BANK') {
        return (
          <>
            <span className="font-bold">Mengajukan fasilitas pinjaman/kredit</span> pada <span className="font-bold uppercase">{data.bankName}</span>, serta menjaminkan aset yang terdaftar atas nama bersama (bila ada) sesuai dengan ketentuan yang berlaku pada Bank tersebut.
          </>
        );
      } else {
        return (
          <span className="uppercase font-bold">{data.customPurpose}</span>
        );
      }
    };

    const renderConsequences = () => {
      if (data.purposeType === 'KERJA_LUAR_NEGERI') {
        return "Saya menyetujui segala ketentuan yang berlaku dan tidak akan menuntut pihak Perusahaan/PPTKIS atau Instansi terkait apabila terjadi hal-hal yang tidak diinginkan di kemudian hari yang disebabkan oleh kelalaian istri/suami saya sendiri.";
      } else if (data.purposeType === 'PINJAMAN_BANK') {
        return "Saya mengetahui dan menyetujui seluruh persyaratan pinjaman tersebut dan turut bertanggung jawab atas kelancaran pembayaran angsuran kredit hingga dinyatakan lunas oleh pihak Bank.";
      } else {
        return "Saya mendukung penuh dan tidak akan melakukan tuntutan apapun di kemudian hari kepada pihak terkait selama kegiatan tersebut tidak melanggar hukum dan norma yang berlaku.";
      }
    }

    return (
      <div className="bg-white flex flex-col box-border font-serif text-black leading-snug text-[11pt] p-[25mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0">
          
          <div className="text-center mb-8 shrink-0">
            <h1 className="font-bold text-xl uppercase tracking-wide underline underline-offset-4 leading-none mb-1">
              SURAT IZIN {data.partnerRelation}
            </h1>
          </div>

          <div className="space-y-4 flex-grow text-justify">
            <p>Yang bertanda tangan di bawah ini:</p>
            
            <div className="ml-4 space-y-1.5 text-[11pt] break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.partnerName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl. Lahir</span><span>:</span><span className="capitalize">{data.partnerBirthPlace}, {formatDateSafe(data.partnerBirthDate)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor KTP (NIK)</span><span>:</span><span>{data.partnerNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Agama</span><span>:</span><span className="capitalize">{data.partnerReligion.toLowerCase()}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span className="capitalize">{data.partnerJob.toLowerCase()}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>No. Telepon / HP</span><span>:</span><span>{data.partnerPhone}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Lengkap</span><span>:</span><span className="capitalize">{data.partnerAddress.toLowerCase()}</span></div>
            </div>

            <p className="mt-4 break-inside-avoid">Adalah {data.partnerRelation.toLowerCase()} sah dari, dan dengan ini memberikan <strong>IZIN / PERSETUJUAN SEPENUHNYA</strong> kepada:</p>

            <div className="ml-4 space-y-1.5 text-[11pt] break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.userName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl. Lahir</span><span>:</span><span className="capitalize">{data.userBirthPlace}, {formatDateSafe(data.userBirthDate)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor KTP (NIK)</span><span>:</span><span>{data.userNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Agama</span><span>:</span><span className="capitalize">{data.userReligion.toLowerCase()}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span className="capitalize">{data.userJob.toLowerCase()}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>No. Telepon / HP</span><span>:</span><span>{data.userPhone}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Lengkap</span><span>:</span><span className="capitalize">{data.userAddress.toLowerCase()}</span></div>
            </div>

            <div className="space-y-3 mt-4">
              <p className="break-inside-avoid">
                Izin ini saya berikan kepada {data.partnerRelation === 'SUAMI' ? 'Istri' : 'Suami'} saya tersebut untuk keperluan: <br/>
                {renderPurpose()}
              </p>
              
              <p className="break-inside-avoid">
                {renderConsequences()}
              </p>
              
              <p className="break-inside-avoid">
                Demikian Surat Izin {data.partnerRelation} ini saya buat dengan sebenarnya, dalam keadaan sehat jasmani dan rohani, serta tanpa ada unsur paksaan dari pihak manapun agar dapat dipergunakan sebagaimana mestinya.
              </p>
            </div>
          </div>

          {/* SIGNATURE AREA */}
          <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-between text-[11pt] mb-24">
                <div className="text-center w-56 flex flex-col justify-end">
                  <p className="mb-20">Yang Diberi Izin,</p>
                  <p className="font-bold underline uppercase leading-none">{data.userName}</p>
                </div>
                
                <div className="text-center w-64">
                  <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="mb-4">Pemberi Izin / {data.partnerRelation},</p>
                  <div className="border border-slate-300 w-24 h-14 mx-auto mb-2 flex flex-col items-center justify-center text-[8px] text-slate-400 italic font-sans leading-tight">
                    <span>MATERAI</span>
                    <span>Rp. 10.000</span>
                  </div>
                  <p className="font-bold underline uppercase leading-none">{data.partnerName}</p>
                </div>
            </div>
            
            {/* PENGESAHAN DESA */}
            {(templateId === 1 && data.includeVillageSign) && (
              <div className="mt-8 pt-6 border-t-2 border-black border-dashed break-inside-avoid">
                <p className="text-center uppercase font-bold mb-16 tracking-widest text-sm">Mengetahui / Mengesahkan</p>
                <div className="flex justify-between text-[11pt]">
                  <div className="text-center w-56">
                    <p className="mb-20 font-bold uppercase text-xs">Ketua RT / RW</p>
                    <p className="font-bold uppercase leading-none">(______________________)</p>
                  </div>
                  
                  <div className="text-center w-56">
                    <p className="mb-20 font-bold uppercase text-xs">Kepala Desa / Lurah</p>
                    <p className="font-bold uppercase leading-none">(______________________)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldCheck size={18} className="text-emerald-500" /> <span className="uppercase tracking-wide">Legal Document Creator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
                <LayoutTemplate size={14} className="text-blue-400" /> <span className="hidden sm:inline">{activeTemplateName}</span> <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-2xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); handleDataChange('includeVillageSign', true); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-blue-700 bg-blue-50' : ''}`}>Standar Legal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); handleDataChange('includeVillageSign', false); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-blue-700 bg-blue-50' : ''}`}>Tanpa Pengesahan Desa {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-transform">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[480px] lg:w-[500px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2">
               <Edit3 size={16} className="text-blue-600" /> Data Dokumen Legal
             </h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-600 transition-colors p-1" title="Reset Formulir">
               <RotateCcw size={16}/>
             </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {/* SECTION: KEPERLUAN */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase text-blue-700 tracking-widest border-b pb-2 flex items-center gap-2">
                  <FileSignature size={14}/> Tujuan Izin
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button onClick={() => handleDataChange('purposeType', 'KERJA_LUAR_NEGERI')} className={`py-2 px-2 rounded-lg text-[10px] font-bold border transition-all flex flex-col items-center justify-center gap-1 ${data.purposeType === 'KERJA_LUAR_NEGERI' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                    <Briefcase size={14}/> Kerja Luar Negeri
                  </button>
                  <button onClick={() => handleDataChange('purposeType', 'PINJAMAN_BANK')} className={`py-2 px-2 rounded-lg text-[10px] font-bold border transition-all flex flex-col items-center justify-center gap-1 ${data.purposeType === 'PINJAMAN_BANK' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                    <Landmark size={14}/> Pinjaman Bank
                  </button>
                  <button onClick={() => handleDataChange('purposeType', 'CUSTOM')} className={`py-2 px-2 rounded-lg text-[10px] font-bold border transition-all flex flex-col items-center justify-center gap-1 ${data.purposeType === 'CUSTOM' ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                    <Edit3 size={14}/> Lainnya
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  {data.purposeType === 'KERJA_LUAR_NEGERI' && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Negara Tujuan</label>
                        <input className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Contoh: TAIWAN" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama PT / PPTKIS</label>
                        <input className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={data.agencyName} onChange={e => handleDataChange('agencyName', e.target.value)} placeholder="Contoh: PT. MAJU BERSAMA" />
                      </div>
                    </>
                  )}
                  {data.purposeType === 'PINJAMAN_BANK' && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Bank</label>
                      <input className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold uppercase focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} placeholder="Contoh: BANK RAKYAT INDONESIA" />
                    </div>
                  )}
                  {data.purposeType === 'CUSTOM' && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Deskripsi Keperluan (Ditulis Lengkap)</label>
                      <textarea className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold uppercase focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all min-h-[80px]" value={data.customPurpose} onChange={e => handleDataChange('customPurpose', e.target.value)} placeholder="Contoh: MENJADI PENJAMIN PADA PROSES SEWA MENYEWA..." />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION: DATA PEMBERI IZIN (PASANGAN) */}
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b pb-2">
                  <h3 className="text-[11px] font-black uppercase text-pink-600 tracking-widest">Data Pemberi Izin</h3>
                  <div className="flex bg-slate-100 rounded-md p-1 gap-1">
                    <button onClick={() => handleDataChange('partnerRelation', 'SUAMI')} className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${data.partnerRelation === 'SUAMI' ? 'bg-pink-600 text-white shadow' : 'text-slate-500 hover:bg-slate-200'}`}>SUAMI</button>
                    <button onClick={() => handleDataChange('partnerRelation', 'ISTRI')} className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${data.partnerRelation === 'ISTRI' ? 'bg-pink-600 text-white shadow' : 'text-slate-500 hover:bg-slate-200'}`}>ISTRI</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Lengkap Sesuai KTP</label>
                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerName} onChange={e => handleDataChange('partnerName', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nomor KTP (NIK)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerNik} onChange={e => handleDataChange('partnerNik', e.target.value)} maxLength={16} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Pekerjaan</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerJob} onChange={e => handleDataChange('partnerJob', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tempat Lahir</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerBirthPlace} onChange={e => handleDataChange('partnerBirthPlace', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tanggal Lahir</label>
                      <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerBirthDate} onChange={e => handleDataChange('partnerBirthDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Agama</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerReligion} onChange={e => handleDataChange('partnerReligion', e.target.value)}>
                        {RELIGION_OPTIONS.map(rel => <option key={rel} value={rel}>{rel}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">No Telepon/HP</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerPhone} onChange={e => handleDataChange('partnerPhone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Alamat Lengkap</label>
                    <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase h-20 resize-none focus:ring-2 focus:ring-pink-500 outline-none transition-all" value={data.partnerAddress} onChange={e => handleDataChange('partnerAddress', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* SECTION: DATA PENERIMA IZIN (YANG DIBERI IZIN) */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase text-teal-600 tracking-widest border-b pb-2">
                  Data Penerima Izin ({data.partnerRelation === 'SUAMI' ? 'Istri' : 'Suami'})
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Lengkap Sesuai KTP</label>
                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userName} onChange={e => handleDataChange('userName', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nomor KTP (NIK)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userNik} onChange={e => handleDataChange('userNik', e.target.value)} maxLength={16} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Pekerjaan</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userJob} onChange={e => handleDataChange('userJob', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tempat Lahir</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userBirthPlace} onChange={e => handleDataChange('userBirthPlace', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tanggal Lahir</label>
                      <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userBirthDate} onChange={e => handleDataChange('userBirthDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Agama</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userReligion} onChange={e => handleDataChange('userReligion', e.target.value)}>
                        {RELIGION_OPTIONS.map(rel => <option key={rel} value={rel}>{rel}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">No Telepon/HP</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userPhone} onChange={e => handleDataChange('userPhone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Alamat Lengkap</label>
                    <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase h-20 resize-none focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={data.userAddress} onChange={e => handleDataChange('userAddress', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* SECTION: TANGGAL & LOKASI */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Kota / Tempat</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: JAKARTA" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tanggal Pembuatan</label>
                      <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                </div>
              </div>

           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/60 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative custom-scrollbar ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static print:p-0`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-100 mb-[-150mm] sm:mb-[-100mm] md:mb-[-50mm] xl:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block print:shadow-none">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl font-sans gap-1">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg scale-100' : 'text-slate-400 scale-95 hover:bg-slate-800'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-600 text-white shadow-lg scale-100' : 'text-slate-400 scale-95 hover:bg-slate-800'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10 md:mb-4">
         <PrintWrapper documentName="Surat Izin Pasangan" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
