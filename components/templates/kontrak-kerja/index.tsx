'use client';

/**
 * FILE: KontrakKerjaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Dokumen Perjanjian Kerja (PKWT/PKWTT)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, UserCircle2, Briefcase, CalendarDays, 
  Wallet, FileText, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ContractData {
  contractType: 'PKWT' | 'PKWTT';
  docDate: string;
  docCity: string;
  docNumber: string;
  
  compName: string;
  compAddress: string;
  compRep: string;
  compRepKtp: string;
  compRepTitle: string;
  
  empName: string;
  empKtp: string;
  empPob: string;
  empDob: string;
  empJob: string;
  empAddress: string;
  
  jobTitle: string;
  department: string;
  startDate: string;
  endDate: string;
  probation: string;
  salary: number;
  workDays: string;
  workHours: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ContractData = {
  contractType: 'PKWT',
  docDate: '2026-08-01',
  docCity: 'Jakarta',
  docNumber: '001/HRD-PKWT/2026',
  
  compName: 'PT NAGA LAUT KORPORATAMA',
  compAddress: 'Gedung Cyber 2, Lt. 10, Jl. H.R. Rasuna Said Blok X-5, Kuningan, Jakarta Selatan 12950',
  compRep: 'Budi Santoso, S.E., M.B.A.',
  compRepKtp: '3174001234560001',
  compRepTitle: 'Direktur Utama',
  
  empName: 'Ahmad Fauzi',
  empKtp: '3271009876540002',
  empPob: 'Bandung',
  empDob: '1995-08-17',
  empJob: 'Karyawan Swasta',
  empAddress: 'Jl. Merpati Putih No. 12, RT 04/RW 02, Kebon Jeruk, Jakarta Barat',
  
  jobTitle: 'Senior Software Engineer',
  department: 'Engineering & IT',
  startDate: '2026-08-01',
  endDate: '2027-08-01',
  probation: '3',
  salary: 15000000,
  workDays: 'Senin s/d Jumat',
  workHours: '09:00 - 18:00 WIB'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KontrakKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <ContractBuilder />
    </Suspense>
  );
}

function ContractBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ContractData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'doc' | 'comp' | 'emp' | 'job'>('doc');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    setData(prev => ({ 
        ...prev, 
        docDate: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextYear.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof ContractData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir kontrak ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, docDate: today, startDate: today });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };
    
    const isPKWT = data.contractType === 'PKWT';

    return (
      <Kertas>
        {/* KOP / JUDUL */}
        <div className="text-center mb-8 break-inside-avoid">
            <h1 className="font-bold text-lg uppercase tracking-wider underline">PERJANJIAN KERJA {isPKWT ? 'WAKTU TERTENTU (PKWT)' : 'WAKTU TIDAK TERTENTU (PKWTT)'}</h1>
            <p className="mt-1">Nomor: {data.docNumber}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                Pada hari ini, tanggal <strong>{formatDateSafe(data.docDate)}</strong>, bertempat di <strong>{data.docCity}</strong>, telah dibuat dan disepakati Perjanjian Kerja {isPKWT ? 'Waktu Tertentu' : 'Waktu Tidak Tertentu'} (selanjutnya disebut "Perjanjian") oleh dan antara:
            </p>
        </div>

        {/* PIHAK PERTAMA */}
        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-6 font-bold">I.</div><div className="w-36">Nama Perusahaan</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.compName}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.compAddress}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Diwakili Oleh</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.compRep}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Nomor KTP</div><div className="w-4">:</div><div className="flex-1">{data.compRepKtp}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Jabatan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.compRepTitle}</div></div>
            <div className="mt-2 text-justify">
                Dalam hal ini bertindak untuk dan atas nama <strong>{data.compName}</strong>, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong> (Perusahaan).
            </div>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-6 font-bold">II.</div><div className="w-36">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.empName}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Nomor KTP</div><div className="w-4">:</div><div className="flex-1">{data.empKtp}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.empPob}, {formatDateSafe(data.empDob)}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36">Pekerjaan Saat Ini</div><div className="w-4">:</div><div className="flex-1">{data.empJob}</div></div>
            <div className="flex mb-1"><div className="w-6"></div><div className="w-36 align-top">Alamat KTP/Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.empAddress}</div></div>
            <div className="mt-2 text-justify">
                Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong> (Karyawan).
            </div>
        </div>

        {/* KLAUSUL */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut "Para Pihak". Para Pihak dengan ini sepakat untuk mengikatkan diri dalam Perjanjian Kerja dengan ketentuan dan syarat-syarat sebagai berikut:
            </p>
        </div>

        {/* PASAL 1 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <div className="text-center font-bold mb-2">
                PASAL 1<br/>
                JABATAN DAN PENEMPATAN
            </div>
            <ol className="list-decimal pl-5 space-y-1">
                <li>PIHAK PERTAMA menerima PIHAK KEDUA sebagai Karyawan dengan rincian:</li>
                <ul className="list-disc pl-5 mt-1 space-y-1 font-bold">
                    <li>Jabatan: {data.jobTitle}</li>
                    <li>Departemen/Divisi: {data.department}</li>
                </ul>
                <li className="mt-2">PIHAK KEDUA bersedia menerima dan mematuhi tugas serta tanggung jawab yang diberikan oleh PIHAK PERTAMA sesuai dengan jabatan tersebut.</li>
                <li>PIHAK PERTAMA berhak memindahkan, menugaskan, atau menempatkan PIHAK KEDUA di bagian atau lokasi lain sesuai dengan kebutuhan operasional perusahaan.</li>
            </ol>
        </div>

        {/* PASAL 2 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <div className="text-center font-bold mb-2">
                PASAL 2<br/>
                JANGKA WAKTU {isPKWT ? 'DAN MASA PERCOBAAN' : 'PERJANJIAN'}
            </div>
            <ol className="list-decimal pl-5 space-y-1">
                {isPKWT ? (
                    <>
                        <li>Perjanjian ini berlaku untuk jangka waktu tertentu terhitung mulai tanggal <strong>{formatDateSafe(data.startDate)}</strong> dan akan berakhir pada tanggal <strong>{formatDateSafe(data.endDate)}</strong>.</li>
                        <li>Perjanjian ini tidak mensyaratkan masa percobaan (Probation) sesuai dengan ketentuan Undang-Undang Ketenagakerjaan yang berlaku untuk PKWT.</li>
                        <li>Perpanjangan Perjanjian PKWT akan diatur kemudian berdasarkan evaluasi kinerja PIHAK KEDUA dan kesepakatan tertulis Para Pihak.</li>
                    </>
                ) : (
                    <>
                        <li>Perjanjian ini berlaku untuk waktu yang tidak tertentu (Karyawan Tetap) terhitung mulai tanggal <strong>{formatDateSafe(data.startDate)}</strong>.</li>
                        <li>PIHAK KEDUA wajib menjalani masa percobaan (Probation) selama <strong>{data.probation} (Tiga) bulan</strong> pertama sejak tanggal mulai bekerja.</li>
                        <li>Selama masa percobaan, PIHAK PERTAMA berhak melakukan pemutusan hubungan kerja setiap saat tanpa kewajiban memberikan pesangon atau ganti rugi dalam bentuk apapun kepada PIHAK KEDUA.</li>
                    </>
                )}
            </ol>
        </div>

        {/* PASAL 3 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <div className="text-center font-bold mb-2">
                PASAL 3<br/>
                WAKTU KERJA DAN REMUNERASI (PENGHASILAN)
            </div>
            <ol className="list-decimal pl-5 space-y-1">
                <li>Hari dan jam kerja PIHAK KEDUA adalah <strong>{data.workDays}</strong>, jam <strong>{data.workHours}</strong>, tidak termasuk jam istirahat. PIHAK KEDUA bersedia melakukan kerja lembur jika dibutuhkan oleh Perusahaan.</li>
                <li>PIHAK PERTAMA akan memberikan upah/gaji pokok bulanan kotor (gross) kepada PIHAK KEDUA sebesar <strong>{formatCurrency(data.salary)}</strong>.</li>
                <li>Pembayaran gaji akan dilakukan setiap akhir bulan kerja berjalan, setelah dipotong Pajak Penghasilan (PPh 21), iuran BPJS Kesehatan, BPJS Ketenagakerjaan, dan potongan sah lainnya sesuai peraturan perusahaan.</li>
                <li>Pemberian Tunjangan Hari Raya (THR) Keagamaan, bonus tahunan, atau tunjangan lainnya (jika ada) akan merujuk pada Peraturan Perusahaan dan perundang-undangan yang berlaku.</li>
            </ol>
        </div>

        {/* PASAL 4 (B2B Enterprise Level Clauses) */}
        <div className="mb-4 text-justify break-inside-avoid">
            <div className="text-center font-bold mb-2">
                PASAL 4<br/>
                TATA TERTIB, KEMAHASIAAN (NDA), DAN HAK KEKAYAAN INTELEKTUAL
            </div>
            <ol className="list-decimal pl-5 space-y-1">
                <li>PIHAK KEDUA wajib tunduk dan patuh pada seluruh Peraturan Perusahaan (PP), Standard Operating Procedure (SOP), dan tata tertib yang berlaku.</li>
                <li>PIHAK KEDUA dilarang keras, baik selama bekerja maupun setelah berakhirnya hubungan kerja, membocorkan rahasia dagang, data finansial, strategi bisnis, daftar klien, kode sumber (source code), dan/atau informasi rahasia lainnya milik PIHAK PERTAMA kepada pihak ketiga manapun (Non-Disclosure Agreement / NDA).</li>
                <li>Pelanggaran terhadap kerahasiaan data (Pasal 4.2) dapat dikenakan sanksi berupa Pemutusan Hubungan Kerja (PHK) secara sepihak dan PIHAK PERTAMA berhak menuntut ganti rugi material serta menempuh jalur hukum perdata maupun pidana.</li>
                <li>Seluruh hasil karya, penemuan, sistem, dan inovasi yang diciptakan atau dikembangkan oleh PIHAK KEDUA selama masa kerjanya di bawah Perjanjian ini sepenuhnya merupakan Hak Kekayaan Intelektual mutlak milik PIHAK PERTAMA.</li>
                <li>PIHAK KEDUA dilarang memiliki ikatan kerja, rangkap jabatan, atau berbisnis yang menimbulkan benturan kepentingan (Conflict of Interest) dengan bisnis PIHAK PERTAMA tanpa persetujuan tertulis sebelumnya.</li>
            </ol>
        </div>

        {/* PASAL 5 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <div className="text-center font-bold mb-2">
                PASAL 5<br/>
                PENYELESAIAN PERSELISIHAN DAN PENUTUP
            </div>
            <ol className="list-decimal pl-5 space-y-1">
                <li>Segala perselisihan yang timbul dari atau terkait dengan Perjanjian ini akan diselesaikan secara musyawarah untuk mufakat (Bipartit).</li>
                <li>Apabila musyawarah tidak tercapai, Para Pihak sepakat untuk menyelesaikan perselisihan tersebut melalui prosedur hukum ketenagakerjaan yang berlaku, dengan memilih domisili hukum di Pengadilan Hubungan Industrial (PHI) pada Pengadilan Negeri setempat.</li>
                <li>Hal-hal yang belum atau belum cukup diatur dalam Perjanjian ini akan merujuk pada Peraturan Perusahaan dan Undang-Undang Ketenagakerjaan yang berlaku di Negara Kesatuan Republik Indonesia.</li>
            </ol>
        </div>
        
        <p className="mb-8 text-justify break-inside-avoid">
            Demikian Perjanjian ini dibuat, dipahami, dan ditandatangani secara sadar oleh Para Pihak tanpa paksaan dari pihak manapun, dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai secukupnya dan memiliki kekuatan hukum pembuktian yang sama.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid pt-4">
            <div className="w-64">
                <p className="mb-2 font-bold uppercase text-xs">PIHAK PERTAMA<br/>(Perusahaan)</p>
                <div className="h-6"></div>
                <div className="w-24 h-12 mx-auto"></div>
                <div className="h-2"></div>
                <p className="font-bold underline uppercase">{data.compRep}</p>
                <p className="text-xs">{data.compRepTitle}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold uppercase text-xs">PIHAK KEDUA<br/>(Karyawan)</p>
                <div className="h-6"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-2"></div>
                <p className="font-bold underline uppercase">{data.empName}</p>
                <p className="text-xs">{data.empJob}</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">HRD - Kontrak Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Legal</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Draft Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('doc')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'doc' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Dokumen</button>
                <button onClick={() => setActiveTab('comp')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'comp' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pihak 1</button>
                <button onClick={() => setActiveTab('emp')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'emp' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pihak 2</button>
                <button onClick={() => setActiveTab('job')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'job' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Pekerjaan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'doc' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Setup Perjanjian
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipe Kontrak Karyawan</label>
                            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                                <button onClick={() => handleDataChange('contractType', 'PKWT')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${data.contractType === 'PKWT' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>PKWT (Kontrak)</button>
                                <button onClick={() => handleDataChange('contractType', 'PKWTT')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${data.contractType === 'PKWTT' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>PKWTT (Tetap)</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Perjanjian</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.docNumber} onChange={e => handleDataChange('docNumber', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Perjanjian</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docDate} onChange={e => handleDataChange('docDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penandatanganan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docCity} onChange={e => handleDataChange('docCity', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'comp' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-blue-600"/> Pihak Pertama (Perusahaan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Lengkap</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kantor / Domisili Hukum</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.compAddress} onChange={e => handleDataChange('compAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Diwakili Oleh (Nama Pimpinan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.compRep} onChange={e => handleDataChange('compRep', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP Pimpinan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.compRepKtp} onChange={e => handleDataChange('compRepKtp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pimpinan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.compRepTitle} onChange={e => handleDataChange('compRepTitle', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'emp' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-amber-600"/> Pihak Kedua (Karyawan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Sesuai KTP</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Induk Kependudukan (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.empKtp} onChange={e => handleDataChange('empKtp', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.empPob} onChange={e => handleDataChange('empPob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.empDob} onChange={e => handleDataChange('empDob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan Saat Ini</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.empJob} onChange={e => handleDataChange('empJob', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Sesuai KTP / Domisili</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.empAddress} onChange={e => handleDataChange('empAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'job' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-emerald-600"/> Detail Pekerjaan & Remunerasi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi / Jabatan</label>
                                <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jobTitle} onChange={e => handleDataChange('jobTitle', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen / Divisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai (Join)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                            </div>
                            {data.contractType === 'PKWT' ? (
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai PKWT</label>
                                    <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm text-rose-700 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Probation (Bulan)</label>
                                    <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.probation} onChange={e => handleDataChange('probation', e.target.value)} />
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-100 pt-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gaji / Remunerasi per Bulan (Rp)</label>
                            <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-800" value={data.salary} onChange={e => handleDataChange('salary', Number(e.target.value))} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari Kerja</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.workDays} onChange={e => handleDataChange('workDays', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jam Kerja</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.workHours} onChange={e => handleDataChange('workHours', e.target.value)} />
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
              <PrintWrapper documentName={`Kontrak_Kerja_${data.contractType}_${data.empName.replace(/\s+/g, '_')}`} price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
