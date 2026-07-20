'use client';
import { useFormSync } from '@/lib/useFormSync';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, User, Users, GraduationCap, MapPin, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface ParentData {
  city: string;
  date: string;
  
  parentName: string;
  parentNik: string;
  parentBirthPlace: string;
  parentBirthDate: string;
  parentJob: string;
  parentAddress: string;
  parentRelation: string; 

  childName: string;
  childNik: string; 
  childBirthPlace: string;
  childBirthDate: string;
  childInstitution: string;
  childAddress: string;
  
  activityName: string;
  activityLocation: string;
  activityStartDate: string;
  activityEndDate: string;
  activityOrganizer: string;
  
  medicalCoverage: string; 
  riskAcknowledgment: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ParentData = {
  city: 'JAKARTA',
  date: '2026-08-01', 
  
  parentName: 'BAMBANG SUGIONO',
  parentNik: '3171234567890001',
  parentBirthPlace: 'Surabaya',
  parentBirthDate: '1975-08-17',
  parentJob: 'Wiraswasta',
  parentAddress: 'Jl. Merdeka Raya No. 45, RT 001 RW 002, Kel. Kebayoran, Kec. Kebayoran Baru, Jakarta Selatan',
  parentRelation: 'Ayah Kandung',
  
  childName: 'ADITYA PRATAMA',
  childNik: '3171234567890002',
  childBirthPlace: 'Jakarta',
  childBirthDate: '2008-05-12',
  childInstitution: 'SMA NEGERI 1 JAKARTA',
  childAddress: 'Jl. Merdeka Raya No. 45, RT 001 RW 002, Kel. Kebayoran, Kec. Kebayoran Baru, Jakarta Selatan',
  
  activityName: 'Ekspedisi Pendakian Gunung Gede Pangrango',
  activityLocation: 'Taman Nasional Gunung Gede Pangrango, Jawa Barat',
  activityStartDate: '2026-08-15',
  activityEndDate: '2026-08-17',
  activityOrganizer: 'Klub Pecinta Alam SMA NEGERI 1 JAKARTA',
  
  medicalCoverage: 'Biaya Pribadi secara Mandiri',
  riskAcknowledgment: 'Sepenuhnya'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PernyataanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <ParentStatementBuilder />
    </Suspense>
  );
}

function ParentStatementBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<ParentData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'ortu' | 'anak' | 'kegiatan' | 'klausul'>('ortu');

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = (field: keyof ParentData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split("T")[0] });
    }
  };

  const formatDateSafe = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Judul Surat */}
      <div className="text-center mb-8">
        <h1 className="text-lg font-bold uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">SURAT PERNYATAAN IZIN ORANG TUA / WALI</h1>
      </div>

      <div className="mb-6 text-justify">
        <p>Yang bertanda tangan di bawah ini:</p>
        <div className="ml-8 mt-4 space-y-2">
            <div className="flex"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.parentName}</div></div>
            <div className="flex"><div className="w-48 align-top">Nomor Induk Kependudukan (NIK)</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono tracking-wider align-top">{data.parentNik}</div></div>
            <div className="flex"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.parentBirthPlace}, {formatDateSafe(data.parentBirthDate)}</div></div>
            <div className="flex"><div className="w-48 align-top">Pekerjaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.parentJob}</div></div>
            <div className="flex"><div className="w-48 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.parentAddress}</div></div>
            <div className="flex"><div className="w-48 align-top">Hubungan Keluarga</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.parentRelation}</div></div>
        </div>
      </div>

      <div className="mb-6 text-justify">
        <p>Dengan ini menyatakan dengan sesungguhnya bahwa saya <strong>MEMBERIKAN IZIN / PERSETUJUAN PENUH</strong> kepada anak/anggota keluarga saya yang berada di bawah perwalian saya:</p>
        <div className="ml-8 mt-4 space-y-2 p-3 border border-slate-300 bg-slate-50">
            <div className="flex"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.childName}</div></div>
            <div className="flex"><div className="w-48 align-top">Nomor Induk Kependudukan (NIK)</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono tracking-wider align-top">{data.childNik}</div></div>
            <div className="flex"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.childBirthPlace}, {formatDateSafe(data.childBirthDate)}</div></div>
            <div className="flex"><div className="w-48 align-top">Instansi / Asal Sekolah</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.childInstitution}</div></div>
            <div className="flex"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.childAddress}</div></div>
        </div>
      </div>

      <div className="mb-6 text-justify">
        <p>Untuk mengikuti dan berpartisipasi dalam kegiatan dengan rincian sebagai berikut:</p>
        <div className="ml-8 mt-4 space-y-2">
            <div className="flex"><div className="w-48 align-top">Nama Kegiatan</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.activityName}</div></div>
            <div className="flex"><div className="w-48 align-top">Lokasi Pelaksanaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.activityLocation}</div></div>
            <div className="flex"><div className="w-48 align-top">Waktu Pelaksanaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{formatDateSafe(data.activityStartDate)} s.d. {formatDateSafe(data.activityEndDate)}</div></div>
            <div className="flex"><div className="w-48 align-top">Penyelenggara</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.activityOrganizer}</div></div>
        </div>
      </div>

      <div className="mb-8 text-justify">
        <p className="font-bold border-b border-black inline-block mb-2">KLAUSUL INDEMNIFIKASI (PELEPASAN TUNTUTAN):</p>
        <ol className="list-decimal pl-8 space-y-3 mt-2">
          <li>Bahwa saya mengetahui dan menyadari sepenuhnya segala risiko dan konsekuensi yang mungkin timbul dari keikutsertaan anak/anggota keluarga saya dalam kegiatan tersebut di atas.</li>
          <li>Apabila selama pelaksanaan kegiatan terjadi hal-hal di luar dugaan seperti kecelakaan, sakit, atau keadaan kahar (force majeure) lainnya, maka saya <strong>{data.riskAcknowledgment}</strong> bertanggung jawab atas kejadian tersebut dan <strong>TIDAK AKAN MELAKUKAN TUNTUTAN HUKUM</strong> baik secara perdata maupun pidana kepada Panitia Penyelenggara atau Instansi Terkait.</li>
          <li>Untuk penanganan medis darurat pertama, apabila diperlukan rujukan lanjutan maka biaya rumah sakit sepenuhnya akan menjadi tanggung jawab: <strong>{data.medicalCoverage}</strong>.</li>
        </ol>
      </div>

      <div className="mb-10 text-justify">
        <p>Demikian surat pernyataan izin dan kesepakatan ini saya buat dengan sadar, sehat jasmani dan rohani, serta tanpa adanya unsur paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end text-center break-inside-avoid pr-4">
        <div className="w-64">
          <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
          <p className="font-bold mb-2 uppercase">Yang Membuat Pernyataan,<br/>(Orang Tua / Wali)</p>
          <div className="h-4"></div>
          <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
          <div className="h-4"></div>
          <p className="font-bold underline uppercase">{data.parentName}</p>
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
              <ArrowLeftCircle size={20} className="text-violet-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Izin Orang Tua</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-violet-600" /> Form Pernyataan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('ortu')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ortu' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Orang Tua</button>
                <button onClick={() => setActiveTab('anak')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'anak' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Anak</button>
                <button onClick={() => setActiveTab('kegiatan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kegiatan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Kegiatan</button>
                <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klausul' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Klausul Tuntutan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'ortu' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-slate-600"/> Identitas Orang Tua / Wali
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Orang Tua</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentName} onChange={e => handleChange('parentName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentNik} onChange={e => handleChange('parentNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentJob} onChange={e => handleChange('parentJob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentBirthPlace} onChange={e => handleChange('parentBirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentBirthDate} onChange={e => handleChange('parentBirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan dengan Anak</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentRelation} onChange={e => handleChange('parentRelation', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.parentAddress} onChange={e => handleChange('parentAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'anak' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <GraduationCap size={14} className="text-blue-600"/> Identitas Anak / Anggota Keluarga
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Anak</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childName} onChange={e => handleChange('childName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (Bila Ada)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childNik} onChange={e => handleChange('childNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Asal Sekolah / Instansi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childInstitution} onChange={e => handleChange('childInstitution', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childBirthPlace} onChange={e => handleChange('childBirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childBirthDate} onChange={e => handleChange('childBirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.childAddress} onChange={e => handleChange('childAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kegiatan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-amber-600"/> Informasi Kegiatan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kegiatan</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityName} onChange={e => handleChange('activityName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pihak Penyelenggara / Panitia</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityOrganizer} onChange={e => handleChange('activityOrganizer', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Pelaksanaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityLocation} onChange={e => handleChange('activityLocation', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityStartDate} onChange={e => handleChange('activityStartDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityEndDate} onChange={e => handleChange('activityEndDate', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'klausul' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle size={14} className="text-rose-600"/> Klausul Pelepasan Hak Tuntutan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pengakuan Risiko & Penolakan Tuntutan Hukum</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.riskAcknowledgment} onChange={e => handleChange('riskAcknowledgment', e.target.value)}>
                                <option value="Sepenuhnya">Pernyataan Bahwa Sepenuhnya Menerima Risiko (Tanpa Tuntutan Apa Pun)</option>
                                <option value="Sebagian">Sebagian Tanggung Jawab Panitia (Harus Ada Klausul Asuransi)</option>
                            </select>
                            <p className="text-[10px] text-slate-500 mt-1 italic">*Biasanya untuk kegiatan ekstrem seperti pendakian alam, bela diri, atau kegiatan yang berisiko tinggi.</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pertanggungjawaban Biaya Medis (Bila Darurat)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-justify" value={data.medicalCoverage} onChange={e => handleChange('medicalCoverage', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
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
              <PrintWrapper documentName={`Pernyataan_Izin_Ortu_${data.childName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
