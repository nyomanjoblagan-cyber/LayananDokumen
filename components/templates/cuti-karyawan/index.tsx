'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, User, Calendar, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface CutiData {
  namaKaryawan: string;
  nik: string;
  jabatan: string;
  departemen: string;
  
  jenisCuti: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lamaCuti: string;
  alasanCuti: string;
  
  namaPengganti: string; // Orang yang menggantikan tugas sementara (Handover)
  
  namaAtasan: string;
  jabatanAtasan: string;
  namaHRD: string;
  
  tempatTtd: string;
  tanggalTtd: string;
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: CutiData = {
  namaKaryawan: 'Andi Pratama, S.Kom.',
  nik: 'EMP-2023-0145',
  jabatan: 'Software Engineer',
  departemen: 'Information Technology (IT)',
  
  jenisCuti: 'Cuti Tahunan',
  tanggalMulai: '',
  tanggalSelesai: '',
  lamaCuti: '3 Hari Kerja',
  alasanCuti: 'Menyelesaikan urusan keluarga di kampung halaman.',
  
  namaPengganti: 'Budi Santoso',
  
  namaAtasan: 'Sarah Wijaya',
  jabatanAtasan: 'IT Manager',
  namaHRD: 'Bpk. Ahmad Faisal',
  
  tempatTtd: 'Jakarta',
  tanggalTtd: '',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-sans leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratIzinCutiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Cuti...</div>}>
      <CutiBuilder />
    </Suspense>
  );
}

function CutiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'karyawan' | 'cuti' | 'approval'>('karyawan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<CutiData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextThreeDays = new Date();
    nextThreeDays.setDate(nextThreeDays.getDate() + 3);

    setData(prev => ({ 
      ...prev, 
      tanggalTtd: today.toISOString().split("T")[0],
      tanggalMulai: tomorrow.toISOString().split("T")[0],
      tanggalSelesai: nextThreeDays.toISOString().split("T")[0],
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextThreeDays = new Date();
        nextThreeDays.setDate(nextThreeDays.getDate() + 3);

        setData({ 
          ...DEFAULT_DATA,
          tanggalTtd: today.toISOString().split("T")[0],
          tanggalMulai: tomorrow.toISOString().split("T")[0],
          tanggalSelesai: nextThreeDays.toISOString().split("T")[0],
        });
    }
  };

  const handleInputChange = (field: keyof CutiData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '......';
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const DocumentContent = () => (
    <Kertas>
      <style dangerouslySetInnerHTML={{__html: `
        .cuti-table td { padding: 6px 8px 6px 0; vertical-align: top; font-size: 11pt; border-bottom: 1px solid #e2e8f0; }
        .cuti-table tr:last-child td { border-bottom: none; }
        .cuti-table td:nth-child(1) { width: 35%; font-weight: bold; }
        .cuti-table td:nth-child(2) { width: 2%; text-align: center; }
        .cuti-table td:nth-child(3) { width: 63%; }
      `}} />

      {/* Judul Surat */}
      <div className="text-center mb-10 border-b-2 border-black pb-4 break-inside-avoid">
        <h1 className="text-xl font-bold uppercase tracking-widest mb-1">FORMULIR PENGAJUAN CUTI KARYAWAN</h1>
      </div>

      {/* Pembuka */}
      <div className="mb-6 break-inside-avoid">
        <p>Saya yang bertanda tangan di bawah ini:</p>
      </div>

      {/* Identitas Karyawan */}
      <div className="mb-8 pl-4 pr-4 break-inside-avoid">
        <table className="w-full cuti-table border border-slate-200 px-4 py-2 rounded-lg bg-slate-50/50 block">
          <tbody>
            <tr>
              <td>Nama Karyawan</td>
              <td>:</td>
              <td className="uppercase">{data.namaKaryawan}</td>
            </tr>
            <tr>
              <td>NIK / ID Karyawan</td>
              <td>:</td>
              <td>{data.nik}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>:</td>
              <td>{data.jabatan}</td>
            </tr>
            <tr>
              <td>Departemen / Divisi</td>
              <td>:</td>
              <td>{data.departemen}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 break-inside-avoid">
        <p>Bermaksud untuk mengajukan izin cuti kerja dengan rincian sebagai berikut:</p>
      </div>

      {/* Detail Cuti */}
      <div className="mb-8 pl-4 pr-4 break-inside-avoid">
        <table className="w-full cuti-table border border-slate-200 px-4 py-2 rounded-lg bg-slate-50/50 block">
          <tbody>
            <tr>
              <td>Jenis Cuti</td>
              <td>:</td>
              <td className="font-bold">{data.jenisCuti}</td>
            </tr>
            <tr>
              <td>Tanggal Pelaksanaan Cuti</td>
              <td>:</td>
              <td>{formatDate(data.tanggalMulai)} <strong>s/d</strong> {formatDate(data.tanggalSelesai)}</td>
            </tr>
            <tr>
              <td>Total Lama Cuti</td>
              <td>:</td>
              <td className="font-bold">{data.lamaCuti}</td>
            </tr>
            <tr>
              <td>Alasan Pengajuan Cuti</td>
              <td>:</td>
              <td className="text-justify">{data.alasanCuti}</td>
            </tr>
            <tr>
              <td>Delegasi Tugas (Handover)</td>
              <td>:</td>
              <td>Diserahkan sementara kepada rekan kerja: <strong>{data.namaPengganti || '..........................'}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Penutup */}
      <div className="mb-12 break-inside-avoid text-justify">
        <p>
          Selama masa cuti, saya bertanggung jawab penuh untuk memastikan seluruh pekerjaan telah diserahterimakan dengan baik. Jika terdapat urusan yang sangat mendesak terkait pekerjaan, saya dapat dihubungi melalui kontak pribadi saya.
        </p>
        <p className="mt-4">
          Demikian permohonan izin cuti ini saya sampaikan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.
        </p>
      </div>

      {/* Pengesahan */}
      <div className="break-inside-avoid">
        <div className="mb-6 text-right pr-4">
          <p>{data.tempatTtd}, {formatDate(data.tanggalTtd)}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center text-sm border-t-2 border-black pt-8">
          <div>
            <p className="mb-20">Hormat Saya,<br/>Pemohon,</p>
            <p className="font-bold underline uppercase">{data.namaKaryawan}</p>
            <p>{data.jabatan}</p>
          </div>
          <div>
            <p className="mb-20">Disetujui Oleh,<br/>Atasan Langsung,</p>
            <p className="font-bold underline uppercase">{data.namaAtasan || '.......................'}</p>
            <p>{data.jabatanAtasan || 'Atasan'}</p>
          </div>
          <div>
            <p className="mb-20">Mengetahui,<br/>HRD / Personalia,</p>
            <p className="font-bold underline uppercase">{data.namaHRD || '.......................'}</p>
            <p>HRD Department</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Izin Cuti Karyawan</h1>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Leave Application</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans shrink-0">
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
                  <Calendar size={18} className="text-amber-600" /> Pengajuan Cuti
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('cuti')} className={`flex-1 py-3 border-r ${activeTab === 'cuti' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Detail Cuti</button>
              <button onClick={() => setActiveTab('approval')} className={`flex-1 py-3 ${activeTab === 'approval' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Approval</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-32">
                
                {activeTab === 'karyawan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><User size={14}/> Identitas Pemohon</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input type="text" value={data.namaKaryawan} onChange={(e) => handleInputChange('namaKaryawan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                    <input type="text" value={data.nik} onChange={(e) => handleInputChange('nik', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input type="text" value={data.jabatan} onChange={(e) => handleInputChange('jabatan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                      <input type="text" value={data.departemen} onChange={(e) => handleInputChange('departemen', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'cuti' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><Calendar size={14}/> Jadwal & Rincian Cuti</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Cuti</label>
                    <select value={data.jenisCuti} onChange={(e) => handleInputChange('jenisCuti', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none font-bold text-amber-700 bg-amber-50">
                      <option value="Cuti Tahunan">Cuti Tahunan</option>
                      <option value="Cuti Melahirkan">Cuti Melahirkan</option>
                      <option value="Cuti Sakit">Cuti Sakit</option>
                      <option value="Cuti Menikah">Cuti Menikah</option>
                      <option value="Cuti Alasan Penting / Urgent">Cuti Alasan Penting / Urgent</option>
                      <option value="Cuti Besar">Cuti Besar</option>
                      <option value="Cuti Di Luar Tanggungan Perusahaan (Unpaid Leave)">Cuti Di Luar Tanggungan Perusahaan (Unpaid Leave)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai Cuti</label>
                      <input type="date" value={data.tanggalMulai} onChange={(e) => handleInputChange('tanggalMulai', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Berakhir Cuti</label>
                      <input type="date" value={data.tanggalSelesai} onChange={(e) => handleInputChange('tanggalSelesai', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Total Lama Cuti</label>
                    <input type="text" value={data.lamaCuti} onChange={(e) => handleInputChange('lamaCuti', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none font-bold" placeholder="Cth: 3 Hari Kerja" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Cuti / Keterangan Tambahan</label>
                    <textarea value={data.alasanCuti} onChange={(e) => handleInputChange('alasanCuti', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none"></textarea>
                  </div>
                  <div className="pt-2 border-t">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Delegasi Pekerjaan (Nama Pengganti)</label>
                    <input type="text" value={data.namaPengganti} onChange={(e) => handleInputChange('namaPengganti', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Cth: Budi Santoso" />
                  </div>
                </div>
                )}

                {activeTab === 'approval' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 flex items-center gap-2"><Briefcase size={14}/> Validasi & Pengesahan</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat TTD</label>
                      <input type="text" value={data.tempatTtd} onChange={(e) => handleInputChange('tempatTtd', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Pengajuan</label>
                      <input type="date" value={data.tanggalTtd} onChange={(e) => handleInputChange('tanggalTtd', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Atasan Langsung</label>
                        <input type="text" value={data.namaAtasan} onChange={(e) => handleInputChange('namaAtasan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Atasan</label>
                        <input type="text" value={data.jabatanAtasan} onChange={(e) => handleInputChange('jabatanAtasan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama HRD / Personalia</label>
                        <input type="text" value={data.namaHRD} onChange={(e) => handleInputChange('namaHRD', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
                      </div>
                  </div>
                </div>
                )}

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
         <PrintWrapper documentName="Surat_Izin_Cuti" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
