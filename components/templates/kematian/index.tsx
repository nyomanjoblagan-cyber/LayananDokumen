'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KematianPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan / Kesepakatan Kematian
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, FileText, HeartHandshake, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KematianData {
  city: string;
  dateStr: string;
  
  // Pihak Pertama (Ahli Waris 1 / Pihak Utama)
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Job: string;
  pihak1Address: string;
  pihak1Relation: string;

  // Pihak Kedua (Ahli Waris 2 / Pihak Terkait)
  pihak2Name: string;
  pihak2Nik: string;
  pihak2Pob: string;
  pihak2Dob: string;
  pihak2Job: string;
  pihak2Address: string;
  pihak2Relation: string;

  // Almarhum
  aName: string; 
  aNik: string; 
  aPob: string; 
  aDob: string; 
  aGender: string;
  aReligion: string; 
  aJob: string; 
  aAddress: string;
  aDateOfDeath: string;
  aPlaceOfDeath: string;
  aCauseOfDeath: string;

  // Opsi Dinamis
  warisanMetode: string;
  hutangTanggungan: string;
  sengketaDomisili: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KematianData = {
  city: 'Sleman',
  dateStr: '2026-07-13',

  pihak1Name: 'SITI AMINAH',
  pihak1Nik: '3404010101800002',
  pihak1Pob: 'Bantul',
  pihak1Dob: '1980-08-20',
  pihak1Job: 'Wiraswasta',
  pihak1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',
  pihak1Relation: 'Istri Kandung',

  pihak2Name: 'AHMAD FAUZI',
  pihak2Nik: '3404010101900003',
  pihak2Pob: 'Sleman',
  pihak2Dob: '1990-12-05',
  pihak2Job: 'Pegawai Negeri Sipil',
  pihak2Address: 'Jl. Gejayan No. 45, Sleman, Yogyakarta',
  pihak2Relation: 'Anak Kandung',

  aName: 'BUDI SANTOSO', 
  aNik: '3404010101740001', 
  aPob: 'Sleman', 
  aDob: '1974-05-12', 
  aGender: 'Laki-laki', 
  aReligion: 'Islam', 
  aJob: 'Pensiunan', 
  aAddress: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',
  aDateOfDeath: '2026-07-11',
  aPlaceOfDeath: 'RSUP Dr. Sardjito, Yogyakarta',
  aCauseOfDeath: 'Sakit',

  warisanMetode: 'Diselesaikan secara Kekeluargaan dan Pembagian Aset Sesuai Hukum Waris',
  hutangTanggungan: 'Ditanggung Bersama oleh Seluruh Ahli Waris secara Proporsional',
  sengketaDomisili: 'Pengadilan Negeri / Agama Sleman'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KematianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <KematianBuilder />
    </Suspense>
  );
}

function KematianBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<KematianData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'almarhum' | 'pihak1' | 'pihak2' | 'opsi'>('almarhum');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, dateStr: today }));
  }, []);

  const handleDataChange = (field: keyof KematianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, dateStr: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-6 break-inside-avoid">
            <h1 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERNYATAAN BERSAMA KEMATIAN DAN KESEPAKATAN AHLI WARIS</h1>
        </div>

        <p className="mb-4 text-justify">
            Pada hari ini, tanggal <strong>{formatDateSafe(data.dateStr)}</strong> bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4 break-inside-avoid">
            <p className="font-bold mb-2">PIHAK PERTAMA (Ahli Waris I)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pihak1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak1Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Pob}, {formatDateSafe(data.pihak1Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Job}</div></div>
                <div className="flex"><div className="w-40">Hubungan Keluarga</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak1Relation}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.pihak1Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 ml-4 break-inside-avoid">
            <p className="font-bold mb-2">PIHAK KEDUA (Ahli Waris II)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pihak2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak2Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Pob}, {formatDateSafe(data.pihak2Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Job}</div></div>
                <div className="flex"><div className="w-40">Hubungan Keluarga</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak2Relation}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.pihak2Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
        </div>

        <p className="mb-4 text-justify">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>"Para Pihak"</strong>. Para Pihak dengan ini menerangkan dan menyatakan dengan sebenar-benarnya bahwa:
        </p>

        {/* ALMARHUM */}
        <div className="mb-4 text-justify space-y-4">
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1">Pasal 1</h3>
                <h3 className="font-bold text-center mb-2">KETERANGAN KEMATIAN</h3>
                <p>Bahwa pada tanggal <strong>{formatDateSafe(data.aDateOfDeath)}</strong>, telah meninggal dunia anggota keluarga kami, dengan rincian identitas sebagai berikut:</p>
                <div className="ml-8 mt-2 space-y-1">
                    <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.aName}</div></div>
                    <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.aNik}</div></div>
                    <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.aPob}, {formatDateSafe(data.aDob)}</div></div>
                    <div className="flex"><div className="w-40">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.aGender}</div></div>
                    <div className="flex"><div className="w-40">Agama</div><div className="w-4">:</div><div className="flex-1">{data.aReligion}</div></div>
                    <div className="flex"><div className="w-40">Tempat Meninggal</div><div className="w-4">:</div><div className="flex-1">{data.aPlaceOfDeath}</div></div>
                    <div className="flex"><div className="w-40">Sebab Kematian</div><div className="w-4">:</div><div className="flex-1">{data.aCauseOfDeath}</div></div>
                </div>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 2</h3>
                <h3 className="font-bold text-center mb-2">HARTA PENINGGALAN (WARISAN)</h3>
                <p>Bahwa terkait seluruh harta benda yang ditinggalkan oleh Almarhum/Almarhumah (baik berupa harta bergerak, tidak bergerak, maupun simpanan di Bank), Para Pihak sepakat bahwa penyelesaiannya adalah: <strong>{data.warisanMetode}</strong>.</p>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 3</h3>
                <h3 className="font-bold text-center mb-2">HUTANG PIUTANG</h3>
                <p>Apabila di kemudian hari diketahui bahwa Almarhum/Almarhumah masih memiliki kewajiban/hutang kepada pihak lain (baik Perorangan, Bank, maupun Lembaga Pembiayaan lainnya), maka Para Pihak sepakat bahwa kewajiban tersebut: <strong>{data.hutangTanggungan}</strong>.</p>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 4</h3>
                <h3 className="font-bold text-center mb-2">DOMISILI HUKUM</h3>
                <p>Surat Pernyataan ini dibuat dengan itikad baik dan tanpa adanya paksaan dari pihak manapun. Apabila di kemudian hari timbul perselisihan yang tidak dapat diselesaikan secara musyawarah mufakat, maka Para Pihak sepakat untuk memilih domisili hukum yang tetap di <strong>{data.sengketaDomisili}</strong>.</p>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 5</h3>
                <h3 className="font-bold text-center mb-2">PENUTUP</h3>
                <p>Demikian Surat Pernyataan Bersama ini dibuat untuk dapat dipergunakan sebagaimana mestinya, baik sebagai dokumen administrasi, pencairan dana, balik nama, maupun keperluan perbankan dan instansi pemerintah lainnya.</p>
            </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="break-inside-avoid pt-8">
            <div className="flex justify-between items-start text-center mb-8">
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK PERTAMA (Ahli Waris I)</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.pihak1Name}</p>
              </div>
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK KEDUA (Ahli Waris II)</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.pihak2Name}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center border-t border-gray-400 pt-8">
              <p className="mb-6">Mengetahui & Mengesahkan,<br/>Kepala Desa / Lurah / Pejabat Berwenang</p>
              <div className="h-24"></div>
              <p className="font-bold underline uppercase">(...................................................)</p>
              <p className="text-sm">NIP/Jabatan</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Kematian & Kesepakatan Waris</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Editor Kesepakatan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('almarhum')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'almarhum' ? 'bg-white border-t-2 border-slate-700 text-slate-800' : 'text-slate-500 hover:bg-slate-200'}`}>1. Almarhum</button>
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Ahli Waris I</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Ahli Waris II</button>
                <button onClick={() => setActiveTab('opsi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'opsi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Kesepakatan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'almarhum' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Kop & Tanggal
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.dateStr} onChange={e => handleDataChange('dateStr', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-600">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Almarhum / Almarhumah
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.aName} onChange={e => handleDataChange('aName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.aNik} onChange={e => handleDataChange('aNik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.aPob} onChange={e => handleDataChange('aPob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.aDob} onChange={e => handleDataChange('aDob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.aGender} onChange={e => handleDataChange('aGender', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.aReligion} onChange={e => handleDataChange('aReligion', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Meninggal</label>
                                    <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.aDateOfDeath} onChange={e => handleDataChange('aDateOfDeath', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sebab Kematian</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.aCauseOfDeath} onChange={e => handleDataChange('aCauseOfDeath', e.target.value)} placeholder="Misal: Sakit" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Meninggal</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.aPlaceOfDeath} onChange={e => handleDataChange('aPlaceOfDeath', e.target.value)} placeholder="Misal: RSUD Harapan" />
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> PIHAK PERTAMA (Ahli Waris I)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.pihak1Pob} onChange={e => handleDataChange('pihak1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Dob} onChange={e => handleDataChange('pihak1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.pihak1Job} onChange={e => handleDataChange('pihak1Job', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan ke Almarhum</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.pihak1Relation} onChange={e => handleDataChange('pihak1Relation', e.target.value)} placeholder="Misal: Istri Kandung" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-amber-600"/> PIHAK KEDUA (Ahli Waris II)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.pihak2Name} onChange={e => handleDataChange('pihak2Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.pihak2Pob} onChange={e => handleDataChange('pihak2Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.pihak2Dob} onChange={e => handleDataChange('pihak2Dob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.pihak2Job} onChange={e => handleDataChange('pihak2Job', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan ke Almarhum</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.pihak2Relation} onChange={e => handleDataChange('pihak2Relation', e.target.value)} placeholder="Misal: Anak Kandung" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.pihak2Address} onChange={e => handleDataChange('pihak2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'opsi' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <HeartHandshake size={14} className="text-emerald-600"/> Kesepakatan Hak Waris & Tanggungan
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Penyelesaian Warisan</label>
                          <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.warisanMetode} onChange={e => handleDataChange('warisanMetode', e.target.value)} />
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Hutang Piutang</label>
                          <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.hutangTanggungan} onChange={e => handleDataChange('hutangTanggungan', e.target.value)} />
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <ShieldCheck size={14} className="text-slate-600"/> Legal & Sengketa
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pilihan Pengadilan Domisili Sengketa</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.sengketaDomisili} onChange={e => handleDataChange('sengketaDomisili', e.target.value)} />
                      </div>
                   </div>
                 </>
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
              <PrintWrapper documentName="Kematian_Kesepakatan" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
