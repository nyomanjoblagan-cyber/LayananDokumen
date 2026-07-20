'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SPKaryawanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Peringatan Karyawan (SP1, SP2, SP3)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  AlertOctagon, Briefcase, FileText, Scale, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface CorporateIdentity {
  companyName: string;
  companyAddress: string;
  directorName: string;
  directorTitle: string;
}

interface EmployeeData {
  fullName: string;
  employeeId: string;
  position: string;
  department: string;
}

interface SanctionData {
  issueCity: string;
  issueDate: string;
  referenceNumber: string;
  sanctionType: string; // 'SP1' | 'SP2' | 'SP3' | 'SKORSING' | 'PHK'
  validityPeriodMonths: string;
  
  corporate: CorporateIdentity;
  employee: EmployeeData;
  
  menimbang: string; 
  mengingat: string; 
  menetapkan: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SanctionData = {
  issueCity: 'JAKARTA SELATAN',
  issueDate: '2026-07-08', 
  referenceNumber: '045/HRD-DIR/SANK/VII/2026',
  sanctionType: 'SP1',
  validityPeriodMonths: '6 (Enam) Bulan',
  
  corporate: {
    companyName: 'PT. KORPORAT GLOBAL NUSANTARA',
    companyAddress: 'Sudirman Central Business District (SCBD) Lot 28, Gedung Global Tower Lt. 42, Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan, 12190',
    directorName: 'ALEXANDER WIRAWAN, S.H., M.H.',
    directorTitle: 'Chief Human Resources Officer'
  },
  
  employee: {
    fullName: 'REZA ADITYA PRATAMA',
    employeeId: 'EMP-2023-0145',
    position: 'Senior Data Analyst',
    department: 'Data & Analytics'
  },
  
  menimbang: 'a. Bahwa Sdr. Reza Aditya Pratama telah terbukti melakukan pelanggaran disiplin kerja berupa manipulasi data kehadiran dan mangkir tanpa keterangan yang sah selama 3 (tiga) hari berturut-turut pada tanggal 1, 2, dan 3 Juli 2026.\n\nb. Bahwa tindakan tersebut merupakan bentuk ketidakdisiplinan yang mengganggu kelancaran operasional perusahaan dan bertentangan dengan nilai-nilai integritas.\n\nc. Bahwa berdasarkan evaluasi dan pemeriksaan oleh Departemen HRD pada tanggal 8 Juli 2026, perlu diambil tindakan tegas sebagai bentuk pembinaan karyawan.',
  mengingat: '1. Undang-Undang No. 13 Tahun 2003 tentang Ketenagakerjaan beserta peraturan perubahannya.\n2. Peraturan Perusahaan (PP) PT. Korporat Global Nusantara Pasal 24 Ayat (3) huruf (a) dan (b) mengenai Kehadiran dan Waktu Kerja.\n3. Kode Etik dan Perilaku Karyawan (Code of Conduct) terkait integritas profesional.',
  menetapkan: '1. Memberikan SURAT PERINGATAN kepada Sdr. Reza Aditya Pratama.\n2. Surat Peringatan ini berlaku selama masa waktu yang telah ditentukan.\n3. Apabila di kemudian hari Saudara kembali melakukan pelanggaran disiplin atau tata tertib perusahaan, maka Perusahaan berhak untuk menjatuhkan sanksi yang lebih berat hingga Pemutusan Hubungan Kerja (PHK).'
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SPKaryawanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Peringatan...</div>}>
      <SPKaryawanBuilder />
    </Suspense>
  );
}

function SPKaryawanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'klausul'>('perusahaan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SanctionData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SanctionData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleNestedChange = (category: 'corporate' | 'employee', field: string, val: any) => {
    setData(prev => ({
        ...prev,
        [category]: {
            ...prev[category],
            [field]: val
        }
    }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const getSuratTitle = () => {
      switch(data.sanctionType) {
          case 'SP1': return 'SURAT PERINGATAN I (PERTAMA)';
          case 'SP2': return 'SURAT PERINGATAN II (KEDUA)';
          case 'SP3': return 'SURAT PERINGATAN III (KETIGA)';
          case 'SKORSING': return 'SURAT KEPUTUSAN SKORSING';
          case 'PHK': return 'SURAT PEMUTUSAN HUBUNGAN KERJA (PHK)';
          default: return 'SURAT PERINGATAN';
      }
  }

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-[3px] border-black pb-4 mb-8">
        <h1 className="text-2xl font-black uppercase tracking-widest">{data.corporate.companyName}</h1>
        <p className="text-sm mt-1 text-center px-8">{data.corporate.companyAddress}</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">{getSuratTitle()}</h2>
        <p className="font-bold mt-1">Nomor: {data.referenceNumber}</p>
      </div>

      <div className="mb-6 break-inside-avoid">
        <p className="mb-2">Surat ini ditujukan dan diberikan kepada:</p>
        <div className="pl-4 border-l-2 border-black ml-4">
            <div className="flex"><div className="w-32 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.employee.fullName}</div></div>
            <div className="flex"><div className="w-32">ID Karyawan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.employee.employeeId}</div></div>
            <div className="flex"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.employee.position}</div></div>
            <div className="flex"><div className="w-32">Departemen</div><div className="w-4">:</div><div className="flex-1">{data.employee.department}</div></div>
        </div>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold underline mb-2">MENIMBANG:</h3>
        <div className="whitespace-pre-line pl-4">{data.menimbang}</div>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold underline mb-2">MENGINGAT:</h3>
        <div className="whitespace-pre-line pl-4">{data.mengingat}</div>
      </div>

      <div className="mb-8 text-justify break-inside-avoid">
        <h3 className="font-bold underline mb-2">MEMUTUSKAN / MENETAPKAN:</h3>
        <div className="whitespace-pre-line pl-4">{data.menetapkan}</div>
        <div className="mt-4 p-4 border border-gray-400 bg-gray-50 text-center">
            Masa Berlaku Sanksi / Peringatan: <br/>
            <span className="font-bold text-lg">{data.validityPeriodMonths}</span>
        </div>
      </div>

      <div className="text-justify mb-8 break-inside-avoid">
        <p>Demikian surat ini dibuat dan disampaikan agar menjadi perhatian dan untuk dapat dilaksanakan dengan sebaik-baiknya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <div className="mb-2 h-6"></div>
            <div className="h-24 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.employee.fullName}</p>
            <p className="text-sm">Karyawan Ybs</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-1">{data.issueCity}, {formatDateDisplay(data.issueDate)}</p>
            <p className="mb-2 font-bold uppercase">{data.corporate.companyName}</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel HRD)</span>
            </div>
            <p className="font-bold underline uppercase">{data.corporate.directorName}</p>
            <p className="text-sm">{data.corporate.directorTitle}</p>
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
              <ArrowLeftCircle size={20} className="text-rose-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SP Karyawan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SP</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><AlertOctagon size={18} className="text-rose-600" /> Editor SP</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>HRD/Corp</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
                <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klausul' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul & Sanksi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Landmark size={14} className="text-slate-600"/> Data Perusahaan & Pengesah
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (PT/CV)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.corporate.companyName} onChange={e => handleNestedChange('corporate', 'companyName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.corporate.companyAddress} onChange={e => handleNestedChange('corporate', 'companyAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Pejabat Berwenang (HRD/Direksi)</h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.corporate.directorName} onChange={e => handleNestedChange('corporate', 'directorName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.corporate.directorTitle} onChange={e => handleNestedChange('corporate', 'directorTitle', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issueCity} onChange={e => handleChange('issueCity', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Pengesahan</label>
                                    <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issueDate} onChange={e => handleChange('issueDate', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-rose-600"/> Data Karyawan Pelanggar
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Karyawan</label>
                            <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.employee.fullName} onChange={e => handleNestedChange('employee', 'fullName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">ID Karyawan / NIK Pegawai</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.employee.employeeId} onChange={e => handleNestedChange('employee', 'employeeId', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Position)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.employee.position} onChange={e => handleNestedChange('employee', 'position', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen/Divisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.employee.department} onChange={e => handleNestedChange('employee', 'department', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'klausul' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-amber-600"/> Tingkat Sanksi & Klausul
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tingkat SP / Sanksi</label>
                                <select className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.sanctionType} onChange={e => handleChange('sanctionType', e.target.value)}>
                                    <option value="SP1">SP 1 (Pertama)</option>
                                    <option value="SP2">SP 2 (Kedua)</option>
                                    <option value="SP3">SP 3 (Ketiga)</option>
                                    <option value="SKORSING">Skorsing</option>
                                    <option value="PHK">PHK</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Berlaku Sanksi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.validityPeriodMonths} onChange={e => handleChange('validityPeriodMonths', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Referensi Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.referenceNumber} onChange={e => handleChange('referenceNumber', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">MENIMBANG (Uraian Pelanggaran)</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-xs h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.menimbang} onChange={e => handleChange('menimbang', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">MENGINGAT (Dasar Hukum / Peraturan)</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-xs h-28 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.mengingat} onChange={e => handleChange('mengingat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">MENETAPKAN (Keputusan Akhir)</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-xs h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.menetapkan} onChange={e => handleChange('menetapkan', e.target.value)} />
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
              <PrintWrapper documentName={`SP_Karyawan_${data.sanctionType}_${data.employee.fullName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
