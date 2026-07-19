'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: PernyataanWarisPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pernyataan Kesepakatan Pembagian Waris Dinamis
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Users, CheckCircle, Plus, Trash2, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface Heirloom {
  type: string;
  description: string;
}

interface PartyData {
  name: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  job: string;
  address: string;
  relation: string;
}

interface WarisData {
  city: string;
  date: string;
  deceasedName: string;
  deceasedNik: string;
  deceasedDeathDate: string;
  deceasedDeathPlace: string;
  party1: PartyData;
  party2: PartyData;
  objects: Heirloom[];
  divisionMethod: 'jual_bagi_hasil' | 'bagi_fisik';
  taxBearers: 'proporsional' | 'pihak_1' | 'pihak_2';
  disputeResolution: 'musyawarah' | 'pengadilan';
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WarisData = {
  city: 'JAKARTA',
  date: '2026-08-01', 
  deceasedName: 'H. AHMAD JAYADI',
  deceasedNik: '3171000000000001',
  deceasedDeathDate: '2025-11-20',
  deceasedDeathPlace: 'RS Cipto Mangunkusumo, Jakarta',
  party1: {
    name: 'SITI AMINAH',
    nik: '3171000000000011',
    birthPlace: 'Jakarta',
    birthDate: '1970-05-14',
    job: 'Ibu Rumah Tangga',
    address: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
    relation: 'Istri Pewaris'
  },
  party2: {
    name: 'BUDI SETIAWAN',
    nik: '3171000000000012',
    birthPlace: 'Jakarta',
    birthDate: '1995-08-20',
    job: 'Pegawai Swasta',
    address: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
    relation: 'Anak Kandung Pewaris'
  },
  objects: [
    { type: 'Sebidang Tanah dan Bangunan', description: 'Sertifikat Hak Milik (SHM) No. 12345 seluas 500 m2 yang terletak di Kelurahan Menteng, Kecamatan Menteng, Kota Jakarta Pusat, Provinsi DKI Jakarta' },
    { type: 'Kendaraan Roda Empat', description: '1 Unit Mobil Toyota Kijang Innova Tahun 2020, Nopol B 1234 ABC, BPKB No. 987654321 atas nama H. Ahmad Jayadi' }
  ],
  divisionMethod: 'bagi_fisik',
  taxBearers: 'proporsional',
  disputeResolution: 'musyawarah',
  witness1: 'Ketua RT 001',
  witness2: 'Ketua RW 002'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PernyataanWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Waris...</div>}>
      <HeirStatementBuilder />
    </Suspense>
  );
}

function HeirStatementBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<WarisData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pewaris' | 'ahliwaris' | 'objek' | 'klausul'>('pewaris');

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = (field: keyof WarisData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handlePartyChange = (partyKey: 'party1' | 'party2', field: keyof PartyData, val: string) => {
    setData(prev => ({
      ...prev,
      [partyKey]: { ...prev[partyKey], [field]: val }
    }));
  };

  const handleObjectChange = (index: number, field: keyof Heirloom, val: string) => {
    const newObjects = [...data.objects];
    newObjects[index] = { ...newObjects[index], [field]: val };
    setData(prev => ({ ...prev, objects: newObjects }));
  };

  const addObject = () => {
    setData(prev => ({ ...prev, objects: [...prev.objects, { type: '', description: '' }] }));
  };

  const removeObject = (index: number) => {
    const newObjects = [...data.objects];
    newObjects.splice(index, 1);
    setData(prev => ({ ...prev, objects: newObjects }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat pernyataan waris ke awal?')) {
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
      {/* HEADER */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="font-bold text-lg tracking-wider uppercase underline">SURAT PERNYATAAN KESEPAKATAN PEMBAGIAN WARIS</h1>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Pada hari ini tanggal <strong>{formatDateSafe(data.date)}</strong> di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 break-inside-avoid">
        <h3 className="font-bold mb-1">I. PIHAK PERTAMA</h3>
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.party1.name}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.party1.nik}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.party1.birthPlace}, {formatDateSafe(data.party1.birthDate)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Pekerjaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.party1.job}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Hubungan dengan Pewaris</div><div className="w-4 align-top">:</div><div className="flex-1 align-top font-bold">{data.party1.relation}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.party1.address}</div></div>
        </div>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-6 break-inside-avoid">
        <h3 className="font-bold mb-1">II. PIHAK KEDUA</h3>
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.party2.name}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.party2.nik}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.party2.birthPlace}, {formatDateSafe(data.party2.birthDate)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Pekerjaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.party2.job}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Hubungan dengan Pewaris</div><div className="w-4 align-top">:</div><div className="flex-1 align-top font-bold">{data.party2.relation}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.party2.address}</div></div>
        </div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>
            Pihak Pertama dan Pihak Kedua secara bersama-sama selanjutnya disebut sebagai <strong>"Para Pihak"</strong> selaku Ahli Waris yang sah. 
            Bahwa Para Pihak dengan ini menerangkan dan menyatakan secara bersama-sama terkait pewaris yang telah meninggal dunia, yaitu:
        </p>
      </div>

      {/* PEWARIS */}
      <div className="mb-6 break-inside-avoid">
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama Pewaris (Almarhum)</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.deceasedName}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.deceasedNik}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tanggal Meninggal Dunia</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{formatDateSafe(data.deceasedDeathDate)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tempat Meninggal Dunia</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.deceasedDeathPlace}</div></div>
        </div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Bahwa semasa hidupnya, Pewaris meninggalkan Harta Warisan/Tirkah (Harta Peninggalan) yang belum dibagikan dengan rincian sebagai berikut:</p>
      </div>

      {/* OBJEK WARIS */}
      <div className="mb-6 break-inside-avoid px-6">
        <table className="w-full border-collapse border border-slate-900 text-[10pt]">
            <thead>
                <tr>
                    <th className="border border-slate-900 py-1 px-2 w-10">NO</th>
                    <th className="border border-slate-900 py-1 px-2 w-48">JENIS HARTA WARISAN</th>
                    <th className="border border-slate-900 py-1 px-2">DESKRIPSI / SPESIFIKASI / LEGALITAS (NO. SHM/BPKB/DSB)</th>
                </tr>
            </thead>
            <tbody>
                {data.objects.map((obj, idx) => (
                    <tr key={idx}>
                        <td className="border border-slate-900 py-2 px-2 text-center align-top">{idx + 1}</td>
                        <td className="border border-slate-900 py-2 px-2 align-top font-bold">{obj.type}</td>
                        <td className="border border-slate-900 py-2 px-2 align-top text-justify">{obj.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <p>
            Atas Harta Peninggalan tersebut di atas, Para Pihak dengan iktikad baik, secara kekeluargaan, tanpa ada paksaan maupun tekanan dari pihak mana pun telah sepakat dan mufakat 
            untuk melakukan pembagian Harta Warisan dengan ketentuan dan syarat-syarat sebagai berikut:
        </p>
      </div>

      {/* KLAUSUL PASAL-PASAL */}
      <div className="mb-6 break-inside-avoid text-justify space-y-4">
        <div>
            <h3 className="font-bold text-center mb-1">Pasal 1<br/>METODE PEMBAGIAN WARIS</h3>
            <p>
                Para Pihak sepakat bahwa seluruh Harta Peninggalan pewaris sebagaimana diuraikan di atas akan dibagi dengan mekanisme: 
                {data.divisionMethod === 'bagi_fisik' ? 
                ' Dibagikan secara fisik/natura secara adil berdasarkan kesepakatan keluarga tanpa perselisihan.' : 
                ' Dijual seluruhnya kepada pihak ketiga, dan hasil penjualannya (setelah dikurangi biaya-biaya) akan dibagi secara proporsional sesuai kesepakatan.'}
            </p>
        </div>
        
        <div>
            <h3 className="font-bold text-center mb-1">Pasal 2<br/>PEMBEBANAN BIAYA DAN PAJAK (BPHTB / PPH / BALIK NAMA)</h3>
            <p>
                Bahwa segala biaya yang timbul terkait dengan pengurusan hukum pembagian waris, balik nama sertifikat, pajak-pajak terkait (seperti Pajak Bumi dan Bangunan, BPHTB, PPh Waris), 
                maupun biaya jasa Pejabat Pembuat Akta Tanah (PPAT) / Notaris, seluruhnya akan 
                {data.taxBearers === 'proporsional' ? ' ditanggung secara tanggung renteng/proporsional oleh Para Pihak.' : 
                 data.taxBearers === 'pihak_1' ? ' ditanggung sepenuhnya oleh PIHAK PERTAMA.' : ' ditanggung sepenuhnya oleh PIHAK KEDUA.'}
            </p>
        </div>

        <div>
            <h3 className="font-bold text-center mb-1">Pasal 3<br/>PELEPASAN HAK GUGAT (WAIVER OF CLAIMS)</h3>
            <p>
                Setelah ditandatanganinya Surat Pernyataan Kesepakatan Pembagian Waris ini, Para Pihak menyatakan saling melepaskan hak untuk saling menuntut atau menggugat secara perdata maupun pidana kepada pihak lainnya atas harta yang telah dibagi tersebut di kemudian hari.
            </p>
        </div>

        <div>
            <h3 className="font-bold text-center mb-1">Pasal 4<br/>PENYELESAIAN PERSELISIHAN</h3>
            <p>
                Apabila di kemudian hari timbul perselisihan dalam pelaksanaan kesepakatan ini, Para Pihak sepakat akan menyelesaikannya secara 
                {data.disputeResolution === 'musyawarah' ? ' musyawarah untuk mufakat secara kekeluargaan.' : ' hukum melalui Pengadilan Negeri sesuai wilayah yurisdiksi domisili.'}
            </p>
        </div>
      </div>

      <div className="mb-10 text-justify break-inside-avoid">
        <p>Demikian Surat Pernyataan Kesepakatan Pembagian Waris ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, bermeterai cukup dan memiliki kekuatan hukum yang mengikat Para Pihak dan/atau para ahli warisnya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between text-center break-inside-avoid px-4">
        <div className="w-56">
            <p className="mb-2 font-bold uppercase">PIHAK PERTAMA</p>
            <div className="h-4"></div>
            <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
            <div className="h-4"></div>
            <p className="font-bold underline uppercase">{data.party1.name}</p>
        </div>
        
        <div className="w-56">
            <p className="mb-2 font-bold uppercase">PIHAK KEDUA</p>
            <div className="h-4"></div>
            <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
            <div className="h-4"></div>
            <p className="font-bold underline uppercase">{data.party2.name}</p>
        </div>
      </div>

      {/* SAKSI */}
      <div className="mt-12 break-inside-avoid text-center">
        <p className="font-bold uppercase mb-8">SAKSI - SAKSI:</p>
        <div className="flex justify-around px-12">
            <div className="w-48">
                <p className="mb-16">Saksi 1</p>
                <p className="font-bold underline uppercase">{data.witness1}</p>
            </div>
            <div className="w-48">
                <p className="mb-16">Saksi 2</p>
                <p className="font-bold underline uppercase">{data.witness2}</p>
            </div>
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
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Kesepakatan Waris</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-purple-600" /> Form Pembagian Waris</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pewaris')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pewaris' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pewaris</button>
                <button onClick={() => setActiveTab('ahliwaris')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ahliwaris' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Ahli Waris</button>
                <button onClick={() => setActiveTab('objek')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'objek' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Harta Waris</button>
                <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klausul' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Klausul Legal</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pewaris' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldAlert size={14} className="text-slate-600"/> Data Pewaris (Almarhum)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pewaris</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deceasedName} onChange={e => handleChange('deceasedName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP (Pewaris)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deceasedNik} onChange={e => handleChange('deceasedNik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Meninggal</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deceasedDeathDate} onChange={e => handleChange('deceasedDeathDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Meninggal (RS/Rumah)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.deceasedDeathPlace} onChange={e => handleChange('deceasedDeathPlace', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ahliwaris' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6 border-l-4 border-l-blue-500">
                    
                    {/* PIHAK 1 */}
                    <div>
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100 mb-4">
                        <Users size={14} className="text-blue-600"/> Pihak Pertama
                        </h3>
                        <div className="space-y-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.name} onChange={e => handlePartyChange('party1', 'name', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.nik} onChange={e => handlePartyChange('party1', 'nik', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.job} onChange={e => handlePartyChange('party1', 'job', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.birthPlace} onChange={e => handlePartyChange('party1', 'birthPlace', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                    <input type="date" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.birthDate} onChange={e => handlePartyChange('party1', 'birthDate', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan (Cth: Istri/Anak/Adik)</label>
                                <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.relation} onChange={e => handlePartyChange('party1', 'relation', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP</label>
                                <textarea className="w-full bg-white p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.address} onChange={e => handlePartyChange('party1', 'address', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* PIHAK 2 */}
                    <div>
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100 mb-4 mt-6">
                        <Users size={14} className="text-blue-600"/> Pihak Kedua
                        </h3>
                        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.name} onChange={e => handlePartyChange('party2', 'name', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.nik} onChange={e => handlePartyChange('party2', 'nik', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.job} onChange={e => handlePartyChange('party2', 'job', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.birthPlace} onChange={e => handlePartyChange('party2', 'birthPlace', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                    <input type="date" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.birthDate} onChange={e => handlePartyChange('party2', 'birthDate', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan (Cth: Istri/Anak/Adik)</label>
                                <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.relation} onChange={e => handlePartyChange('party2', 'relation', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP</label>
                                <textarea className="w-full bg-white p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.party2.address} onChange={e => handlePartyChange('party2', 'address', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'objek' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                            <ShieldAlert size={14} className="text-emerald-600"/> Daftar Harta Waris
                        </h3>
                        <button onClick={addObject} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1"><Plus size={14}/> Tambah Objek</button>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                        {data.objects.map((obj, index) => (
                            <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
                                <button onClick={() => removeObject(index)} className="absolute top-2 right-2 p-1.5 text-rose-400 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                                <div className="space-y-3 pr-8">
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Jenis Harta (Tanah/Mobil/Emas)</label>
                                        <input 
                                            className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500" 
                                            value={obj.type} onChange={e => handleObjectChange(index, 'type', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Detail/Nomor Sertifikat/BPKB</label>
                                        <textarea 
                                            className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-500 h-16 resize-none" 
                                            value={obj.description} onChange={e => handleObjectChange(index, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
              )}

              {activeTab === 'klausul' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle size={14} className="text-rose-600"/> Klausul Hukum (Pasal-Pasal)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembagian Waris (Pasal 1)</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.divisionMethod} onChange={e => handleChange('divisionMethod', e.target.value)}>
                                <option value="bagi_fisik">Dibagi Secara Fisik / Natura (Sertifikat Pecah dll)</option>
                                <option value="jual_bagi_hasil">Dijual & Uangnya Dibagi (Jual Bagi Hasil)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan Biaya & Pajak / BPHTB (Pasal 2)</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.taxBearers} onChange={e => handleChange('taxBearers', e.target.value)}>
                                <option value="proporsional">Tanggung Renteng / Dibagi Proporsional Bersama</option>
                                <option value="pihak_1">Ditanggung Penuh oleh Pihak Pertama</option>
                                <option value="pihak_2">Ditanggung Penuh oleh Pihak Kedua</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Perselisihan (Pasal 4)</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.disputeResolution} onChange={e => handleChange('disputeResolution', e.target.value)}>
                                <option value="musyawarah">Musyawarah untuk Mufakat Kekeluargaan</option>
                                <option value="pengadilan">Hukum Jalur Pengadilan Negeri</option>
                            </select>
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 1</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness1} onChange={e => handleChange('witness1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 2</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness2} onChange={e => handleChange('witness2', e.target.value)} />
                            </div>
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
              <PrintWrapper documentName={`Kesepakatan_Waris_${data.deceasedName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
