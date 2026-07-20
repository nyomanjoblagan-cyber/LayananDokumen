'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    User, Briefcase, Calendar, CheckSquare, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

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
const INITIAL_DATA: CutiData = {
  namaKaryawan: 'Andi Pratama, S.Kom.',
  nik: 'EMP-2023-0145',
  jabatan: 'Software Engineer',
  departemen: 'Information Technology (IT)',
  
  jenisCuti: 'Cuti Tahunan',
  tanggalMulai: '2026-09-10',
  tanggalSelesai: '2026-09-12',
  lamaCuti: '3 Hari Kerja',
  alasanCuti: 'Menyelesaikan urusan keluarga di kampung halaman.',
  
  namaPengganti: 'Budi Santoso',
  
  namaAtasan: 'Sarah Wijaya',
  jabatanAtasan: 'IT Manager',
  namaHRD: 'Ahmad Faisal',
  
  tempatTtd: 'Jakarta',
  tanggalTtd: '2026-08-20',
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-56 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold">{value}</div>
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
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<CutiData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL SURAT */}
      <div className="text-center mb-6">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">FORMULIR PENGAJUAN CUTI KARYAWAN</h1>
      </div>
      
      {/* PEMBUKAAN */}
      <div className="mb-4 text-justify">
          <p>
              Saya yang bertanda tangan di bawah ini:
          </p>
      </div>

      {/* IDENTITAS */}
      <div className="pl-4 space-y-3 mb-6">
          <IdentityRow label="Nama Karyawan" value={data.namaKaryawan} />
          <IdentityRow label="NIK / ID Karyawan" value={data.nik} />
          <IdentityRow label="Jabatan" value={data.jabatan} />
          <IdentityRow label="Departemen" value={data.departemen} />
      </div>

      <div className="mb-6 text-justify">
          <p className="mb-3">
              Dengan ini bermaksud mengajukan permohonan <strong>{data.jenisCuti}</strong> dengan rincian sebagai berikut:
          </p>
      </div>

      {/* RINCIAN CUTI */}
      <div className="pl-4 space-y-3 mb-6">
          <IdentityRow label="Tanggal Mulai Cuti" value={formatDateSafe(data.tanggalMulai)} />
          <IdentityRow label="Tanggal Selesai Cuti" value={formatDateSafe(data.tanggalSelesai)} />
          <IdentityRow label="Lama Cuti" value={data.lamaCuti} />
          <IdentityRow label="Keperluan / Alasan" value={data.alasanCuti} />
      </div>

      <div className="mb-8 text-justify">
          <p className="leading-relaxed">
              Selama masa cuti tersebut, tugas dan tanggung jawab pekerjaan saya akan diserahterimakan (handover) sementara kepada <strong>Sdr/i. {data.namaPengganti}</strong>.
          </p>
          <p className="leading-relaxed mt-2">
              Demikian surat permohonan cuti ini saya ajukan untuk dapat dipertimbangkan sebagaimana mestinya. Atas perhatian dan persetujuan yang diberikan, saya ucapkan terima kasih.
          </p>
      </div>

      {/* PENGESAHAN (TANDA TANGAN) */}
      <div className="mt-4">
         <div className="flex justify-between text-center items-stretch mb-4">
            <div className="w-[45%] flex flex-col justify-between">
               <p className="mb-2">&nbsp;</p>
               <p className="font-bold mb-4 uppercase">Pemohon,</p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.namaKaryawan}</p>
            </div>
            <div className="w-[45%] flex flex-col justify-between">
               <p className="mb-2">{data.tempatTtd}, {formatDateSafe(data.tanggalTtd)}</p>
               <p className="font-bold mb-4 uppercase">Menyetujui,<br/>{data.jabatanAtasan}</p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.namaAtasan}</p>
            </div>
         </div>
         <div className="flex justify-center text-center items-stretch pt-2">
            <div className="w-[45%] flex flex-col justify-between">
               <p className="font-bold mb-4 uppercase">Mengetahui,<br/>HR Department</p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.namaHRD}</p>
            </div>
         </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Formulir Pengajuan Cuti</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Formulir Cuti
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL TTD */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Tgl Pengajuan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota</label>
                      <input type="text" name="tempatTtd" value={data.tempatTtd} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Pengajuan</label>
                      <input type="date" name="tanggalTtd" value={data.tanggalTtd} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS KARYAWAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Data Karyawan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="namaKaryawan" value={data.namaKaryawan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK / ID Karyawan</label>
                      <input type="text" name="nik" value={data.nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                        <input type="text" name="jabatan" value={data.jabatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen</label>
                        <input type="text" name="departemen" value={data.departemen} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. RINCIAN CUTI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Calendar size={14} className="text-purple-600"/> Rincian Cuti
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Cuti</label>
                      <select name="jenisCuti" value={data.jenisCuti} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                        <option value="Cuti Tahunan">Cuti Tahunan</option>
                        <option value="Cuti Sakit">Cuti Sakit</option>
                        <option value="Cuti Melahirkan">Cuti Melahirkan</option>
                        <option value="Cuti Alasan Penting">Cuti Alasan Penting / Menikah</option>
                        <option value="Cuti Besar">Cuti Besar</option>
                        <option value="Cuti di Luar Tanggungan (Unpaid)">Cuti di Luar Tanggungan (Unpaid Leave)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
                        <input type="date" name="tanggalMulai" value={data.tanggalMulai} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
                        <input type="date" name="tanggalSelesai" value={data.tanggalSelesai} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lama Cuti (Contoh: 3 Hari Kerja)</label>
                      <input type="text" name="lamaCuti" value={data.lamaCuti} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan / Keperluan Cuti</label>
                      <textarea name="alasanCuti" value={data.alasanCuti} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. HANDOVER & APPROVAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <CheckSquare size={14} className="text-amber-600"/> Handover & Approval
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Karyawan Pengganti (Handover Task)</label>
                      <input type="text" name="namaPengganti" value={data.namaPengganti} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Atasan (Manager)</label>
                        <input type="text" name="namaAtasan" value={data.namaAtasan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Atasan</label>
                        <input type="text" name="jabatanAtasan" value={data.jabatanAtasan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama HRD Manager</label>
                      <input type="text" name="namaHRD" value={data.namaHRD} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Formulir Pengajuan Cuti Karyawan" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
