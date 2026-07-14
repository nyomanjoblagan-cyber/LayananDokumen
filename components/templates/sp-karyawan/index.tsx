'use client';

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
  sanctionType: 'SP1' | 'SP2' | 'SP3' | 'SKORSING' | 'PHK';
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

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-snug text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
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
  const [activeTab, setActiveTab] = useState<'admin' | 'karyawan' | 'pasal'>('admin');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SanctionData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, issueDate: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData({ ...INITIAL_DATA, issueDate: new Date().toISOString().split('T')[0] });
    }
  };

  const handleDataChange = (field: keyof SanctionData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleCorporateChange = (field: keyof CorporateIdentity, val: string) => {
    setData(prev => ({ ...prev, corporate: { ...prev.corporate, [field]: val } }));
  };

  const handleEmployeeChange = (field: keyof EmployeeData, val: string) => {
    setData(prev => ({ ...prev, employee: { ...prev.employee, [field]: val } }));
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

  const DocumentContent = () => (
    <Kertas>
      {/* CSS KHUSUS PASAL */}
      <style dangerouslySetInnerHTML={{__html: `
        .pasal-table { width: 100%; font-size: 11pt; line-height: 1.5; }
        .pasal-table td { padding-bottom: 8px; vertical-align: top; }
        .pasal-title { font-weight: bold; width: 22%; padding-right: 8px; }
        .pasal-colon { width: 2%; text-align: center; }
        .pasal-content { width: 76%; text-align: justify; white-space: pre-line; }
      `}}/>

      {/* KOP SURAT */}
      <div className="border-b-[3px] print-border-black border-double border-black pb-4 mb-8 break-inside-avoid text-center">
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-widest">{data.corporate.companyName}</h1>
        <p className="text-sm md:text-[11pt] mt-1">{data.corporate.companyAddress}</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 break-inside-avoid">
        <h2 className="text-lg md:text-xl font-bold uppercase underline underline-offset-4 tracking-wide">{getSanctionTitle()}</h2>
        <p className="text-[11pt] mt-2">Nomor: {data.referenceNumber}</p>
      </div>

      {/* KONSIDERANS */}
      <div className="mb-8 break-inside-avoid">
        <p className="mb-4">Direksi {data.corporate.companyName},</p>
        
        <table className="pasal-table">
          <tbody>
            <tr>
              <td className="pasal-title">MEMBACA</td>
              <td className="pasal-colon">:</td>
              <td className="pasal-content">
                Laporan tertulis dari Departemen {data.employee.department} dan hasil pemeriksaan atas indisipliner yang dilakukan oleh Karyawan yang namanya tercantum di bawah ini.
              </td>
            </tr>
            <tr>
              <td className="pasal-title">MENIMBANG</td>
              <td className="pasal-colon">:</td>
              <td className="pasal-content">{data.menimbang}</td>
            </tr>
            <tr>
              <td className="pasal-title">MENGINGAT</td>
              <td className="pasal-colon">:</td>
              <td className="pasal-content">{data.mengingat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center font-bold tracking-widest my-8 break-inside-avoid text-lg uppercase">
        MEMUTUSKAN
      </div>

      <div className="mb-8 break-inside-avoid">
        <table className="pasal-table">
          <tbody>
            <tr>
              <td className="pasal-title">MENETAPKAN</td>
              <td className="pasal-colon">:</td>
              <td className="pasal-content">{data.menetapkan}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DATA KARYAWAN */}
      <div className="mb-8 break-inside-avoid">
        <p className="mb-3">Keputusan ini diberikan dan berlaku mengikat kepada:</p>
        <table className="w-full md:w-3/4 ml-4">
          <tbody>
            <tr>
              <td className="w-1/3 py-1 align-top">Nama</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="font-bold py-1 align-top">{data.employee.fullName}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">ID Karyawan / NIK</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.employee.employeeId}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Jabatan</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.employee.position}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Departemen</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.employee.department}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PENUTUP */}
      <div className="mb-12 text-justify break-inside-avoid">
        <p className="indent-8">
          Demikian surat keputusan ini dibuat agar dapat diperhatikan dan dilaksanakan dengan penuh rasa tanggung jawab. Perusahaan berharap agar pembinaan ini dapat memberikan efek perbaikan bagi Saudara/i di masa yang akan datang.
        </p>
      </div>

      {/* TTD */}
      <div className="flex justify-between items-end mt-16 break-inside-avoid shrink-0">
        <div className="text-center w-1/3 text-[11pt]">
          <p className="mb-24">Penerima Sanksi,</p>
          <p className="font-bold underline">{data.employee.fullName}</p>
          <p>{data.employee.employeeId}</p>
        </div>
        <div className="text-center w-1/3 text-[11pt]">
          <p className="mb-1">Dikeluarkan di {data.issueCity}</p>
          <p className="mb-24">Pada tanggal {formatDate(data.issueDate)}</p>
          <p className="font-bold underline">{data.corporate.directorName}</p>
          <p>{data.corporate.directorTitle}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Peringatan & Sanksi</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Corporate Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <AlertOctagon size={18} className="text-blue-600" /> Editor Sanksi HRD
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('admin')} className={`flex-1 py-3 border-r ${activeTab === 'admin' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Administrasi</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('pasal')} className={`flex-1 py-3 ${activeTab === 'pasal' ? 'bg-white text-rose-600 border-b-2 border-b-rose-600' : 'text-slate-500 hover:bg-slate-200'}`}>Ketetapan (Pasal)</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {activeTab === 'admin' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-3">
                      <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tingkat / Jenis Sanksi</label>
                          <select 
                            className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={data.sanctionType}
                            onChange={(e) => handleDataChange('sanctionType', e.target.value)}
                          >
                            <option value="SP1">SP1 - Surat Peringatan I</option>
                            <option value="SP2">SP2 - Surat Peringatan II</option>
                            <option value="SP3">SP3 - Surat Peringatan III (Terakhir)</option>
                            <option value="SKORSING">SKORSING - Pemberhentian Sementara</option>
                            <option value="PHK">PHK - Pemutusan Hubungan Kerja</option>
                          </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                            <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.referenceNumber} onChange={(e) => handleDataChange('referenceNumber', e.target.value)}/>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Berlaku</label>
                            <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.validityPeriodMonths} onChange={(e) => handleDataChange('validityPeriodMonths', e.target.value)} placeholder="Cth: 6 (Enam) Bulan"/>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Terbit</label>
                            <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.issueDate} onChange={(e) => handleDataChange('issueDate', e.target.value)}/>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Terbit</label>
                            <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.issueCity} onChange={(e) => handleDataChange('issueCity', e.target.value)}/>
                          </div>
                      </div>
                  </div>

                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mt-6 mb-4 flex items-center gap-2"><Landmark size={14}/> Profil Perusahaan</h3>
                  <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                        <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.corporate.companyName} onChange={(e) => handleCorporateChange('companyName', e.target.value)}/>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor Pusat</label>
                        <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16 focus:ring-2 focus:ring-blue-500 outline-none" value={data.corporate.companyAddress} onChange={(e) => handleCorporateChange('companyAddress', e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pimpinan / HRD</label>
                            <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.corporate.directorName} onChange={(e) => handleCorporateChange('directorName', e.target.value)}/>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Pimpinan</label>
                            <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.corporate.directorTitle} onChange={(e) => handleCorporateChange('directorTitle', e.target.value)}/>
                          </div>
                      </div>
                  </div>
                </div>
                )}

                {activeTab === 'karyawan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><Briefcase size={14}/> Identitas Karyawan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.employee.fullName} onChange={(e) => handleEmployeeChange('fullName', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">ID Karyawan / NIK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none font-mono uppercase" value={data.employee.employeeId} onChange={(e) => handleEmployeeChange('employeeId', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Saat Ini</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.employee.position} onChange={(e) => handleEmployeeChange('position', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen / Divisi</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.employee.department} onChange={(e) => handleEmployeeChange('department', e.target.value)} />
                  </div>
                </div>
                )}

                {activeTab === 'pasal' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-rose-600 border-b pb-1 mb-4 flex items-center gap-2"><Scale size={14}/> Konstruksi Hukum & Sanksi</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">MENIMBANG (Latar Belakang Kasus)</label>
                    <div className="text-[10px] text-slate-400 mb-2 leading-tight">Uraikan kronologi pelanggaran indisipliner, tanggal kejadian, kerugian perusahaan, dan hasil BAP (Berita Acara Pemeriksaan). Gunakan penomoran huruf (a, b, c).</div>
                    <textarea className="w-full p-3 border rounded-lg text-sm mt-1 h-36 focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.menimbang} onChange={(e) => handleDataChange('menimbang', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">MENGINGAT (Dasar Hukum / Peraturan)</label>
                    <div className="text-[10px] text-slate-400 mb-2 leading-tight">Cantumkan pasal UU Ketenagakerjaan, Peraturan Perusahaan (PP), Perjanjian Kerja Bersama (PKB), atau Kode Etik yang dilanggar. Gunakan penomoran angka (1, 2, 3).</div>
                    <textarea className="w-full p-3 border rounded-lg text-sm mt-1 h-32 focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.mengingat} onChange={(e) => handleDataChange('mengingat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">MENETAPKAN (Diktum Sanksi)</label>
                    <div className="text-[10px] text-slate-400 mb-2 leading-tight">Uraikan secara spesifik jenis sanksi, akibat hukum (misal pemotongan insentif), dan peringatan jika mengulangi kesalahan (misal berujung PHK).</div>
                    <textarea className="w-full p-3 border rounded-lg text-sm mt-1 h-32 focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed font-bold" value={data.menetapkan} onChange={(e) => handleDataChange('menetapkan', e.target.value)} />
                  </div>
                </div>
                )}

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat_Sanksi_Karyawan" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
