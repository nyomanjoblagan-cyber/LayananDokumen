'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: RekomendasiAkademikPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Rekomendasi Akademik Standar Legal/Enterprise
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, UserCircle2, 
  PenTool, Award, ChevronDown, FileText, Scale, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface RecommendationData {
  city: string;
  date: string;
  docNo: string;
  university: string;
  
  party1Name: string;
  party1Nik: string;
  party1Birth: string;
  party1Occupation: string;
  party1Address: string;

  party2Name: string;
  party2Nik: string;
  party2Birth: string;
  party2Occupation: string;
  party2Address: string;
  studentId: string;
  studentGpa: string;

  recommendationPurpose: string;
  academicRelation: string;
  recommendationLevel: string;
  validityPeriod: string;
  evaluationPoint1: string;
  evaluationPoint2: string;
  disputeResolution: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RecommendationData = {
  city: 'Denpasar',
  date: '2026-01-20', 
  docNo: 'REF/088/UNUD/FT/I/2026',
  university: 'UNIVERSITAS UDAYANA (UNUD)',
  
  party1Name: 'DR. I MADE WIRA, S.T., M.T.',
  party1Nik: '3501010101800001',
  party1Birth: 'Denpasar, 10 Agustus 1980',
  party1Occupation: 'Dosen / Lektor Kepala',
  party1Address: 'Jl. Kampus Bukit Jimbaran, Badung, Bali',

  party2Name: 'BAGUS RAMADHAN',
  party2Nik: '3501010101000002',
  party2Birth: 'Denpasar, 15 Maret 2002',
  party2Occupation: 'Mahasiswa',
  party2Address: 'Jl. Tukad Pakerisan No. 45, Denpasar Selatan',
  studentId: '2208561001',
  studentGpa: '3.85 / 4.00',

  recommendationPurpose: 'Pendaftaran Beasiswa LPDP Tahap I 2026',
  academicRelation: 'Dosen Pembimbing Utama',
  recommendationLevel: 'SANGAT DIREKOMENDASIKAN',
  validityPeriod: '6 (Enam) Bulan',
  evaluationPoint1: 'Memiliki kemampuan analisis logis yang sangat tajam, pemahaman teori yang mendalam pada disiplin ilmu teknologi informasi, serta mampu mengimplementasikan riset secara praktis dan terukur.',
  evaluationPoint2: 'Memiliki integritas tinggi, kepemimpinan yang adaptif, kemampuan bekerja sama dalam tim lintas disiplin, dan menunjukkan etos kerja serta kedisiplinan yang konsisten.',
  disputeResolution: 'Musyawarah Kekeluargaan dan Peraturan Akademik'
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function RekomendasiDosenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Rekomendasi...</div>}>
      <RecommendationBuilder />
    </Suspense>
  );
}

function RecommendationBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'substansi' | 'legal'>('pihak1');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<RecommendationData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RecommendationData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form surat rekomendasi ke pengaturan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL SURAT */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg underline uppercase tracking-wider">SURAT PERNYATAAN DAN REKOMENDASI AKADEMIK</h1>
        <p className="font-bold uppercase mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="text-justify mb-4">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 pl-8">
        <div className="flex mb-1"><div className="w-48 font-bold">Nama Lengkap & Gelar</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.party1Name}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">NIK / NIP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.party1Nik}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.party1Birth}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Jabatan Akademik</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.party1Occupation}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Instansi / Universitas</div><div className="w-4">:</div><div className="flex-1 uppercase font-bold">{data.university}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Alamat Instansi</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.party1Address}</div></div>
      </div>
      <div className="text-justify mb-6">
        <p>Dalam kapasitas kewenangan akademik dan/atau jabatan sebagaimana disebutkan di atas, selanjutnya disebut sebagai <strong>PEMBERI REKOMENDASI</strong>.</p>
      </div>

      <div className="text-justify mb-4">
        <p>Dengan ini memberikan Pernyataan, Kesaksian Akademik, dan Rekomendasi kepada:</p>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-4 pl-8">
        <div className="flex mb-1"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.party2Name}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.party2Nik}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">NIM / Nomor Mahasiswa</div><div className="w-4">:</div><div className="flex-1 font-bold font-mono">{data.studentId}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.party2Birth}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Pekerjaan / Status</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.party2Occupation}</div></div>
        <div className="flex mb-1"><div className="w-48 font-bold">Alamat Sesuai KTP</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.party2Address}</div></div>
      </div>
      <div className="text-justify mb-6">
        <p>Dalam hal ini bertindak untuk dan atas nama dirinya sendiri, untuk selanjutnya disebut sebagai <strong>YANG DIREKOMENDASIKAN</strong>.</p>
      </div>

      <div className="text-justify mb-2">
        <p>Adapun Pernyataan dan Rekomendasi ini diberikan dengan syarat dan ketentuan mengikat sebagai berikut:</p>
      </div>

      {/* PASAL 1 & 2 */}
      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 1: Hubungan Akademik</h3>
        <p>PEMBERI REKOMENDASI menyatakan dengan sebenar-benarnya bahwa mengenal YANG DIREKOMENDASIKAN dalam kapasitas hubungan akademik sebagai <strong>{data.academicRelation}</strong> selama masa studinya di {data.university}.</p>
      </div>

      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 2: Evaluasi Prestasi dan Integritas</h3>
        <p className="mb-2">Berdasarkan hasil pengamatan akademik dan interaksi langsung, PEMBERI REKOMENDASI memberikan kesaksian bahwa YANG DIREKOMENDASIKAN:</p>
        <ol className="list-decimal pl-5 space-y-1 ml-4">
          <li>Meraih pencapaian Indeks Prestasi Kumulatif (IPK) sebesar <strong>{data.studentGpa}</strong>.</li>
          <li>{data.evaluationPoint1}</li>
          <li>{data.evaluationPoint2}</li>
        </ol>
      </div>

      {/* PASAL 3 */}
      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 3: Penetapan Rekomendasi dan Tujuan</h3>
        <p className="mb-2">Berdasarkan Pasal 1 dan Pasal 2 di atas, PEMBERI REKOMENDASI menyatakan <strong>{data.recommendationLevel}</strong> kepada YANG DIREKOMENDASIKAN untuk keperluan:</p>
        <div className="text-center font-bold uppercase border border-black p-2 mx-8 bg-slate-50 print:bg-transparent">"{data.recommendationPurpose}"</div>
      </div>

      {/* PASAL 4 & 5 */}
      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 4: Jangka Waktu Berlaku</h3>
        <p>Surat Rekomendasi ini bersifat sah dan mengikat serta berlaku selama jangka waktu <strong>{data.validityPeriod}</strong> terhitung sejak tanggal diterbitkannya surat ini.</p>
      </div>

      <div className="mb-6 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 5: Pernyataan Pertanggungjawaban Mutlak</h3>
        <p>
            Surat Pernyataan dan Rekomendasi Akademik ini dibuat dengan itikad baik (<em>good faith</em>), dalam keadaan sadar dan tanpa paksaan dari pihak mana pun. Segala konsekuensi hukum yang timbul di kemudian hari terkait penyalahgunaan surat ini oleh YANG DIREKOMENDASIKAN sepenuhnya berada di luar tanggung jawab PEMBERI REKOMENDASI.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end text-center break-inside-avoid px-4">
        <div className="w-64">
            <p className="mb-2">{data.city}, {formatDateDisplay(data.date)}<br/><strong>Pemberi Rekomendasi</strong></p>
            <div className="h-24 flex items-center justify-center">
                <div className="w-24 h-12 border border-dashed border-gray-400 text-[10px] text-gray-400 flex items-center justify-center print:hidden">Tanda Tangan</div>
            </div>
            <p className="font-bold underline uppercase">{data.party1Name}</p>
            <p className="text-sm">NIP/NIK: {data.party1Nik}</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Rekomendasi Akademik</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Award size={18} className="text-blue-600" /> Editor Akademik</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemberi (Dosen)</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Mahasiswa</button>
                <button onClick={() => setActiveTab('substansi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'substansi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Substansi</button>
                <button onClick={() => setActiveTab('legal')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'legal' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Legalitas</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Pemberi Rekomendasi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.party1Name} onChange={e => handleChange('party1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP / NIK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.party1Nik} onChange={e => handleChange('party1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Akademik</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.party1Occupation} onChange={e => handleChange('party1Occupation', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.party1Birth} onChange={e => handleChange('party1Birth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Asal Universitas / Instansi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.university} onChange={e => handleChange('university', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.party1Address} onChange={e => handleChange('party1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <GraduationCap size={14} className="text-blue-600"/> Data Yang Direkomendasikan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap (Siswa/Mahasiswa)</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2Name} onChange={e => handleChange('party2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIM / Nomor Mahasiswa</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentId} onChange={e => handleChange('studentId', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">IPK (GPA)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentGpa} onChange={e => handleChange('studentGpa', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2Nik} onChange={e => handleChange('party2Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2Occupation} onChange={e => handleChange('party2Occupation', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2Birth} onChange={e => handleChange('party2Birth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2Address} onChange={e => handleChange('party2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'substansi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <PenTool size={14} className="text-emerald-600"/> Evaluasi & Substansi Rekomendasi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Rekomendasi (Keperluan)</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recommendationPurpose} onChange={e => handleChange('recommendationPurpose', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan Akademik</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.academicRelation} onChange={e => handleChange('academicRelation', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tingkat Rekomendasi</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recommendationLevel} onChange={e => handleChange('recommendationLevel', e.target.value)}>
                                    <option value="SANGAT DIREKOMENDASIKAN">SANGAT DIREKOMENDASIKAN</option>
                                    <option value="DIREKOMENDASIKAN">DIREKOMENDASIKAN</option>
                                    <option value="DIREKOMENDASIKAN DENGAN CATATAN">DIREKOMENDASIKAN DENGAN CATATAN</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Evaluasi Akademik (Poin 1)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.evaluationPoint1} onChange={e => handleChange('evaluationPoint1', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Evaluasi Karakter/Integritas (Poin 2)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.evaluationPoint2} onChange={e => handleChange('evaluationPoint2', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'legal' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-amber-600"/> Pengesahan & Legalitas
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat Referensi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Berlaku Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.validityPeriod} onChange={e => handleChange('validityPeriod', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penetapan Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
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
              <PrintWrapper documentName={`Rekomendasi_Akademik_${data.party2Name.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
