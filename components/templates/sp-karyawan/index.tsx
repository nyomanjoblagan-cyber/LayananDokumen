'use client';

/**
 * FILE: sp-karyawan.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE LEGAL DRAFTING)
 * DESC: Generator Dokumen Sanksi Indisipliner HRD Korporat
 * FEATURES:
 * - Enterprise Legal Drafting Standard
 * - Dynamic Form for Sanction Types (SP1, SP2, SP3, Skorsing, PHK)
 * - Format Surat Keputusan (Konsiderans: Menimbang, Mengingat, Menetapkan)
 * - Print-Safe CSS (A4 Format)
 * - No Truncation
 */

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  AlertOctagon, Briefcase, FileText, Scale, Landmark, ShieldAlert
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
  sanctionType: 'SP1' | 'SP2' | 'SP3' | 'SKORSING' | 'PHK';
  validityPeriodMonths: string;
  
  corporate: CorporateIdentity;
  employee: EmployeeData;
  
  menimbang: string; // Latar belakang pelanggaran
  mengingat: string; // Pasal PP/PKB yang berlaku
  menetapkan: string; // Ketetapan sanksi
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SanctionData = {
  issueCity: 'JAKARTA SELATAN',
  issueDate: '', 
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
  
  menimbang: 'a. Bahwa Sdr. Reza Aditya Pratama telah terbukti melakukan pelanggaran disiplin kerja berupa manipulasi data kehadiran dan mangkir tanpa keterangan yang sah selama 3 (tiga) hari berturut-turut pada tanggal 1, 2, dan 3 Juli 2026.\nb. Bahwa tindakan tersebut merupakan bentuk ketidakdisiplinan yang mengganggu kelancaran operasional perusahaan dan bertentangan dengan nilai-nilai integritas.\nc. Bahwa berdasarkan evaluasi dan pemeriksaan oleh Departemen HRD pada tanggal 8 Juli 2026, perlu diambil tindakan tegas sebagai bentuk pembinaan karyawan.',
  mengingat: '1. Undang-Undang No. 13 Tahun 2003 tentang Ketenagakerjaan beserta peraturan perubahannya.\n2. Peraturan Perusahaan (PP) PT. Korporat Global Nusantara Pasal 24 Ayat (3) huruf (a) dan (b) mengenai Kehadiran dan Waktu Kerja.\n3. Kode Etik dan Perilaku Karyawan (Code of Conduct) terkait integritas profesional.',
  menetapkan: '1. Memberikan SURAT PERINGATAN I (PERTAMA) kepada Sdr. Reza Aditya Pratama.\n2. Surat Peringatan ini berlaku selama masa waktu yang telah ditentukan.\n3. Apabila di kemudian hari Saudara kembali melakukan pelanggaran disiplin atau tata tertib perusahaan, maka Perusahaan berhak untuk menjatuhkan sanksi yang lebih berat hingga Pemutusan Hubungan Kerja (PHK).'
};

// --- 3. KOMPONEN UTAMA ---
export default function CorporateSanctionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Dokumen Sanksi HRD...</div>}>
      <SanctionToolBuilder />
    </Suspense>
  );
}

function SanctionToolBuilder() {
  const [data, setData] = useState<SanctionData>(INITIAL_DATA);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  useEffect(() => {
    setData(prev => ({
      ...INITIAL_DATA,
      issueDate: new Date().toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof SanctionData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleCorporateChange = (field: keyof CorporateIdentity, val: string) => {
    setData(prev => ({ ...prev, corporate: { ...prev.corporate, [field]: val } }));
  };

  const handleEmployeeChange = (field: keyof EmployeeData, val: string) => {
    setData(prev => ({ ...prev, employee: { ...prev.employee, [field]: val } }));
  };

  const handleReset = () => {
    if(window.confirm('Reset seluruh data ke format korporat default?')) {
        setData({ ...INITIAL_DATA, issueDate: new Date().toISOString().split('T')[0] });
    }
  };

  const formatDate = (dateString: string) => {
    if(!dateString) return '...';
    try {
        const safeDate = new Date(dateString + 'T00:00:00');
        return safeDate.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
    } catch { return dateString; }
  };

  const getSanctionTitle = () => {
    switch (data.sanctionType) {
      case 'SP1': return 'SURAT PERINGATAN I (PERTAMA)';
      case 'SP2': return 'SURAT PERINGATAN II (KEDUA)';
      case 'SP3': return 'SURAT PERINGATAN III (KETIGA / TERAKHIR)';
      case 'SKORSING': return 'SURAT KEPUTUSAN SKORSING KARYAWAN';
      case 'PHK': return 'SURAT KEPUTUSAN PEMUTUSAN HUBUNGAN KERJA (PHK)';
      default: return 'SURAT PERINGATAN';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col print:block font-sans text-slate-800">
      
      {/* CSS PRINT PARITY - NO GRID/FLEX FOR PASAL CONTENT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static; width: 100%; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .print-border-black { border-color: black !important; }
          .print-text-black { color: black !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Dokumen Sanksi <span className="text-blue-400">Korporat</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsMobilePreview(!isMobilePreview)}
                 className="md:hidden bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm font-bold"
               >
                 {isMobilePreview ? 'Edit Data' : 'Lihat Hasil'}
               </button>
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row print:hidden print:h-auto print:overflow-visible overflow-hidden h-[calc(100vh-64px)] relative">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[480px] lg:w-[540px] bg-white border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${isMobilePreview ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
                <h2 className="font-bold text-slate-800 flex items-center gap-2"><Edit3 size={18} className="text-blue-600" /> Editor Sanksi HRD</h2>
                <button onClick={handleReset} title="Reset Data" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:hidden print:overflow-visible print:bg-white">
               
               {/* 1. ADMINISTRASI SURAT */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><FileText size={14} className="text-blue-600"/> Administrasi Surat</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tingkat / Jenis Sanksi</label>
                          <select 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={data.sanctionType}
                            onChange={(e) => handleDataChange('sanctionType', e.target.value)}
                          >
                             <option value="SP1">Surat Peringatan I (Pertama)</option>
                             <option value="SP2">Surat Peringatan II (Kedua)</option>
                             <option value="SP3">Surat Peringatan III (Ketiga / Terakhir)</option>
                             <option value="SKORSING">Skorsing Karyawan</option>
                             <option value="PHK">Pemutusan Hubungan Kerja (PHK)</option>
                          </select>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nomor Dokumen</label><input className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={data.referenceNumber} onChange={e => handleDataChange('referenceNumber', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kota Terbit</label><input className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white" value={data.issueCity} onChange={e => handleDataChange('issueCity', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tanggal Terbit</label><input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white" value={data.issueDate} onChange={e => handleDataChange('issueDate', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

               {/* 2. IDENTITAS KARYAWAN */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><Briefcase size={14} className="text-emerald-600"/> Data Karyawan (Tersanksi)</h3>
                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap Karyawan</label><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none bg-white" placeholder="Nama Lengkap Karyawan" value={data.employee.fullName} onChange={e => handleEmployeeChange('fullName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">NIK / Employee ID</label><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" placeholder="ID Karyawan / NIK" value={data.employee.employeeId} onChange={e => handleEmployeeChange('employeeId', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Departemen</label><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" placeholder="Departemen" value={data.employee.department} onChange={e => handleEmployeeChange('department', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Posisi / Jabatan</label><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" placeholder="Jabatan" value={data.employee.position} onChange={e => handleEmployeeChange('position', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. KONSIDERANS SURAT KEPUTUSAN */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><AlertOctagon size={14} className="text-red-600"/> Konsiderans (Pertimbangan Hukum)</h3>
                  <div className="bg-red-50/50 p-4 rounded-2xl border border-red-200 shadow-sm space-y-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-red-700 uppercase tracking-wide">MENIMBANG (Fakta Pelanggaran)</label>
                          <p className="text-[10px] text-red-500 mb-1 leading-tight">Uraikan kronologis dan deskripsi pelanggaran secara rinci. Gunakan format a, b, c jika lebih dari satu poin.</p>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-28 resize-none focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.menimbang} onChange={e => handleDataChange('menimbang', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-red-700 uppercase tracking-wide">MENGINGAT (Dasar Hukum / Pasal)</label>
                          <p className="text-[10px] text-red-500 mb-1 leading-tight">Sebutkan dasar hukum UU, Peraturan Perusahaan, atau Kode Etik yang dilanggar.</p>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.mengingat} onChange={e => handleDataChange('mengingat', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-red-700 uppercase tracking-wide">MENETAPKAN (Ketetapan Sanksi)</label>
                          <p className="text-[10px] text-red-500 mb-1 leading-tight">Keputusan akhir dan instruksi perbaikan yang harus dilakukan karyawan.</p>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.menetapkan} onChange={e => handleDataChange('menetapkan', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-red-700 uppercase tracking-wide">Masa Berlaku Sanksi (Opsional)</label>
                          <input className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none bg-white" placeholder="Contoh: 6 (Enam) Bulan" value={data.validityPeriodMonths} onChange={e => handleDataChange('validityPeriodMonths', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. IDENTITAS PERUSAHAAN / PENERBIT */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><Landmark size={14} className="text-slate-600"/> Otoritas Perusahaan</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Korporasi</label><input className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none bg-white" placeholder="Nama Perusahaan (PT...)" value={data.corporate.companyName} onChange={e => handleCorporateChange('companyName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Alamat Lengkap (Headquarters)</label><textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-slate-500 outline-none bg-white" placeholder="Alamat Perusahaan" value={data.corporate.companyAddress} onChange={e => handleCorporateChange('companyAddress', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pejabat HRD / Direksi</label><input className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none bg-white" placeholder="Nama Pejabat Penandatangan" value={data.corporate.directorName} onChange={e => handleCorporateChange('directorName', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Jabatan Pejabat</label><input className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none bg-white" placeholder="Jabatan Penandatangan" value={data.corporate.directorTitle} onChange={e => handleCorporateChange('directorTitle', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

            </div>
         </div>

         {/* LIVE PREVIEW AREA */}
         <div className="flex-1 bg-slate-200 print:bg-white print:overflow-visible print:static print:hidden relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto print:overflow-visible print:w-full print:hidden w-full flex justify-center p-4 md:p-8 custom-scrollbar print:bg-white">
               
               {/* Document Scaling Container */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 print:scale-100 print:transform-none print:w-full print:m-0 print:block w-full flex flex-col items-center">
                  
                  {/* A4 Paper Root */}
                  <div id="print-only-root" className="bg-white shadow-2xl relative print:static flex-shrink-0 h-max print:shadow-none print:w-full print:min-w-0 print:min-h-0 print:h-auto font-serif" style={{ width: '210mm', minHeight: '297mm' }}>
                     
                     <div className="p-[15mm] text-black text-[11pt] leading-[1.6]">
                  
                        {/* 1. KOP SURAT (CORPORATE LETTERHEAD) */}
                        <div className="border-b-[4px] print-border-black border-black pb-4 mb-6 flex flex-col items-center text-center break-inside-avoid relative">
                           <h1 className="text-[18pt] font-black uppercase tracking-widest text-slate-900 print-text-black">{data.corporate.companyName}</h1>
                           <p className="text-[9pt] mt-1 text-slate-700 print-text-black max-w-[80%] mx-auto">{data.corporate.companyAddress}</p>
                           {/* Decorative dual line */}
                           <div className="absolute -bottom-[2px] w-full h-[1px] bg-black print:bg-black"></div>
                        </div>

                        {/* 2. JUDUL DOKUMEN & NOMOR */}
                        <div className="text-center mb-8 break-inside-avoid">
                           <h2 className="text-[14pt] font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 mb-1">
                             {getSanctionTitle()}
                           </h2>
                           <p className="font-bold text-[10pt]">Nomor: {data.referenceNumber}</p>
                        </div>

                        <div className="text-justify space-y-5 text-[10.5pt]">
                           
                           {/* 3. PEMBUKA & DATA KARYAWAN */}
                           <div className="break-inside-avoid">
                               <p className="mb-3">Berdasarkan hasil evaluasi dan investigasi internal yang dilakukan oleh pihak Manajemen, maka melalui surat ini Perusahaan memberikan Sanksi Indisipliner kepada:</p>
                               <div className="ml-10 space-y-1">
                                   <table className="w-full border-collapse">
                                      <tbody>
                                        <tr>
                                          <td className="w-40 align-top">Nama Lengkap</td>
                                          <td className="w-4 align-top">:</td>
                                          <td className="font-bold">{data.employee.fullName}</td>
                                        </tr>
                                        <tr>
                                          <td className="w-40 align-top">Nomor Induk (NIK)</td>
                                          <td className="w-4 align-top">:</td>
                                          <td>{data.employee.employeeId}</td>
                                        </tr>
                                        <tr>
                                          <td className="w-40 align-top">Jabatan</td>
                                          <td className="w-4 align-top">:</td>
                                          <td>{data.employee.position}</td>
                                        </tr>
                                        <tr>
                                          <td className="w-40 align-top">Departemen</td>
                                          <td className="w-4 align-top">:</td>
                                          <td>{data.employee.department}</td>
                                        </tr>
                                      </tbody>
                                   </table>
                               </div>
                           </div>

                           {/* 4. KONSIDERANS: MENIMBANG */}
                           <div className="break-inside-avoid mt-6">
                               <p className="font-bold mb-1">MENIMBANG :</p>
                               <div className="ml-8 whitespace-pre-wrap">
                                  {data.menimbang}
                               </div>
                           </div>

                           {/* 5. KONSIDERANS: MENGINGAT */}
                           <div className="break-inside-avoid">
                               <p className="font-bold mb-1">MENGINGAT :</p>
                               <div className="ml-8 whitespace-pre-wrap">
                                  {data.mengingat}
                               </div>
                           </div>

                           {/* 6. KONSIDERANS: MENETAPKAN */}
                           <div className="break-inside-avoid bg-slate-50/30 print:bg-transparent p-4 border border-slate-200 print-border-black mt-4">
                               <p className="font-bold mb-2 uppercase text-center text-[11pt] tracking-widest border-b border-black pb-2 mb-4">M E N E T A P K A N</p>
                               <div className="ml-4 whitespace-pre-wrap">
                                  {data.menetapkan}
                               </div>
                               {data.validityPeriodMonths && data.sanctionType.startsWith('SP') && (
                                 <p className="ml-4 mt-3">
                                   Masa berlaku sanksi ini adalah selama <strong>{data.validityPeriodMonths}</strong> terhitung sejak surat ini ditandatangani.
                                 </p>
                               )}
                           </div>

                           {/* 7. PENUTUP */}
                           <div className="break-inside-avoid pt-4">
                               <p>Demikian Surat Keputusan ini dibuat untuk dilaksanakan dengan penuh tanggung jawab. Salinan surat ini akan dimasukkan ke dalam arsip personalia karyawan yang bersangkutan.</p>
                           </div>
                        </div>

                        {/* 8. BAGIAN TANDA TANGAN (SIGNATURE BLOCK) */}
                        <div className="mt-12 break-inside-avoid">
                           <p className="text-right mb-6">
                              Ditetapkan di: <strong>{data.issueCity}</strong><br/>
                              Pada tanggal: <strong>{formatDate(data.issueDate)}</strong>
                           </p>

                           <div className="flex justify-between items-start mt-8 w-full">
                              <div className="w-[45%] text-center border-t-4 border-transparent">
                                 <p className="mb-24 uppercase font-semibold h-12 flex flex-col justify-end">Karyawan Yang Bersangkutan,<br/>(Telah Menerima & Membaca)</p>
                                 <p className="font-bold underline uppercase">{data.employee.fullName}</p>
                                 <p className="text-[10pt] mt-1">NIK: {data.employee.employeeId}</p>
                              </div>
                              <div className="w-[45%] text-center border-t-4 border-transparent">
                                 <p className="mb-24 uppercase font-semibold h-12 flex flex-col justify-end">Atas Nama Perusahaan,<br/>{data.corporate.companyName}</p>
                                 <p className="font-bold underline uppercase">{data.corporate.directorName}</p>
                                 <p className="text-[10pt] mt-1">{data.corporate.directorTitle}</p>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>

            {/* PRINT WRAPPER / PAYWALL */}
            <div className="mt-8 w-full max-w-[210mm] mx-auto z-10 relative">
               <PrintWrapper documentName={getSanctionTitle().replace(/\s+/g, '_')} price={15000} />
            </div>

            <div className="h-24 md:hidden"></div>
         </div>
      </main>
    </div>
  );
}
