'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: IjazahSementaraPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Lulus (SKL) / Ijazah Sementara Tingkat Kampus / Universitas
 */

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, GraduationCap, Building2, UserCircle2, 
  Award, ShieldCheck, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SKLData {
  city: string;
  date: string;
  docNo: string;
  
  universityHeader: string;
  universityName: string;
  facultyName: string;
  universityAddress: string;
  universityContact: string;
  
  deanName: string;
  deanNip: string;
  
  studentName: string;
  nim: string;
  placeBirth: string;
  dateBirth: string;
  program: string;
  department: string; 
  
  yudisiumDate: string;
  ipk: string;
  predicate: string; 
  title: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SKLData = {
  city: 'JAKARTA',
  date: '2026-06-25', 
  docNo: '123/UN.10/FASILKOM/PP/2026',
  
  universityHeader: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI',
  universityName: 'UNIVERSITAS TEKNOLOGI NUSANTARA',
  facultyName: 'FAKULTAS ILMU KOMPUTER',
  universityAddress: 'Jl. Pendidikan No. 1, Jakarta Selatan 12345',
  universityContact: 'Telp: (021) 1234567 | Email: info@utn.ac.id | Web: www.utn.ac.id',
  
  studentName: 'BIMA ARYA WICAKSANA',
  nim: '19051010023',
  placeBirth: 'Jakarta',
  dateBirth: '2001-08-15',
  program: 'Strata Satu (S1)',
  department: 'Teknik Informatika',
  
  yudisiumDate: '2026-06-20',
  ipk: '3.85',
  predicate: 'Dengan Pujian (Cum Laude)',
  title: 'Sarjana Komputer (S.Kom.)',
  
  deanName: 'PROF. DR. IR. BAMBANG SUTEDJO, M.SC.',
  deanNip: '19650312 199002 1 001'
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
export default function IjazahSementaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor SKL...</div>}>
      <SKLBuilder />
    </Suspense>
  );
}

function SKLBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'kampus' | 'mahasiswa' | 'lulus'>('kampus');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SKLData>(INITIAL_DATA);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SKLData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset SKL ke default?')) {
        setData(INITIAL_DATA);
        setLogo(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex items-center border-b-[3px] border-double border-black pb-4 mb-8">
        <div className="w-24 h-24 flex items-center justify-center relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
            {logo ? (
                <img src={logo} alt="Logo Kampus" className="max-w-full max-h-full object-contain" />
            ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors print:hidden">
                    <Building2 size={24} />
                    <span className="text-[8px] mt-1 text-center font-sans leading-tight">Klik Upload<br/>Logo</span>
                </div>
            )}
            {logo && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity print:hidden text-white text-[10px] text-center font-sans">
                    Ubah Logo
                </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
        
        <div className="flex-1 text-center px-4">
            <h2 className="text-sm font-bold tracking-widest">{data.universityHeader}</h2>
            <h1 className="text-2xl font-black uppercase tracking-wide my-1">{data.universityName}</h1>
            <h2 className="text-lg font-bold uppercase tracking-widest">{data.facultyName}</h2>
            <p className="text-xs mt-1">{data.universityAddress}</p>
            <p className="text-xs">{data.universityContact}</p>
        </div>
      </div>

      {/* JUDUL SKL */}
      <div className="text-center mb-8">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">SURAT KETERANGAN LULUS</h2>
        <p className="font-bold mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="text-justify mb-6">
        <p>Dekan {data.facultyName} {data.universityName} menerangkan dengan sesungguhnya bahwa:</p>
      </div>

      {/* DATA MAHASISWA */}
      <div className="mb-8 pl-8 text-[12pt]">
        <div className="flex mb-1.5"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase text-[13pt]">{data.studentName}</div></div>
        <div className="flex mb-1.5"><div className="w-48 font-bold">NIM</div><div className="w-4">:</div><div className="flex-1 font-mono font-bold text-[12pt]">{data.nim}</div></div>
        <div className="flex mb-1.5"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.placeBirth}, {formatDateDisplay(data.dateBirth)}</div></div>
        <div className="flex mb-1.5"><div className="w-48">Program / Jenjang</div><div className="w-4">:</div><div className="flex-1">{data.program}</div></div>
        <div className="flex mb-1.5"><div className="w-48">Program Studi</div><div className="w-4">:</div><div className="flex-1">{data.department}</div></div>
      </div>

      {/* HASIL KELULUSAN */}
      <div className="text-justify mb-8 leading-loose">
        <p>Berdasarkan hasil Rapat Yudisium {data.facultyName} pada tanggal <strong>{formatDateDisplay(data.yudisiumDate)}</strong>, mahasiswa tersebut di atas dinyatakan <strong>LULUS</strong> dengan Indeks Prestasi Kumulatif (IPK) <strong>{data.ipk}</strong>, predikat kelulusan <strong>"{data.predicate}"</strong>.</p>
        
        <p className="mt-4">Kepadanya berhak diberikan gelar akademik <strong>{data.title}</strong> beserta segala hak dan kewajiban yang melekat pada gelar tersebut.</p>

        <p className="mt-4">Surat Keterangan Lulus (SKL) ini berfungsi sebagai Ijazah Sementara dan berlaku hingga Ijazah Asli diterbitkan. Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end px-4 break-inside-avoid mt-16">
        <div className="text-left w-72">
            <p className="mb-1">{data.city}, {formatDateDisplay(data.date)}</p>
            <p className="mb-2 font-bold uppercase">Dekan {data.facultyName}</p>
            <div className="h-24 flex justify-start items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Universitas/Fakultas)</span>
            </div>
            <p className="font-bold underline uppercase text-[12pt]">{data.deanName}</p>
            <p className="text-sm">NIP. {data.deanNip}</p>
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
              <ArrowLeftCircle size={20} className="text-fuchsia-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Lulus (SKL)</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-fuchsia-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SKL</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Award size={18} className="text-fuchsia-600" /> Editor Akademik</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('kampus')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kampus' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Kop & Kampus</button>
                <button onClick={() => setActiveTab('mahasiswa')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'mahasiswa' ? 'bg-white border-t-2 border-fuchsia-500 text-fuchsia-700' : 'text-slate-500 hover:bg-slate-200'}`}>Mahasiswa</button>
                <button onClick={() => setActiveTab('lulus')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'lulus' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Kelulusan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kampus' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Landmark size={14} className="text-slate-600"/> Kop Universitas / Fakultas
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Header (Kementerian/Yayasan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.universityHeader} onChange={e => handleChange('universityHeader', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Universitas / Institut / Sekolah Tinggi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.universityName} onChange={e => handleChange('universityName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Fakultas / Sekolah</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.facultyName} onChange={e => handleChange('facultyName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kampus</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.universityAddress} onChange={e => handleChange('universityAddress', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak (Telp/Email/Web)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.universityContact} onChange={e => handleChange('universityContact', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Tanda Tangan Pejabat Pengesah (Dekan/Rektor)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama & Gelar Pejabat</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deanName} onChange={e => handleChange('deanName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP / NIDN</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deanNip} onChange={e => handleChange('deanNip', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'mahasiswa' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-fuchsia-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-fuchsia-600"/> Data Identitas Lulusan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Mahasiswa</label>
                            <input className="w-full bg-fuchsia-50 p-2.5 border border-fuchsia-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.studentName} onChange={e => handleChange('studentName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Induk Mahasiswa (NIM/NPM)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.nim} onChange={e => handleChange('nim', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.placeBirth} onChange={e => handleChange('placeBirth', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.dateBirth} onChange={e => handleChange('dateBirth', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenjang Pendidikan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.program} onChange={e => handleChange('program', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program Studi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.department} onChange={e => handleChange('department', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'lulus' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <GraduationCap size={14} className="text-amber-600"/> Data Kelulusan & Nilai
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Yudisium / Lulus</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.yudisiumDate} onChange={e => handleChange('yudisiumDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">IPK Terakhir</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.ipk} onChange={e => handleChange('ipk', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Predikat Kelulusan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.predicate} onChange={e => handleChange('predicate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gelar Akademik yang Diberikan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.title} onChange={e => handleChange('title', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat Diterbitkan</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Referensi SKL</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
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
              <PrintWrapper documentName={`SKL_${data.nim}_${data.studentName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
