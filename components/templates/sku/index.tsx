'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: sku.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Usaha (SKU)
 */

import React, { useState, Suspense, useEffect } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, Store, UserCircle2, ShieldCheck, BadgeDollarSign
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SkuData {
  letterNumber: string;
  issueDate: string;
  villageName: string;
  subDistrictName: string;
  districtName: string;
  
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Gender: string;
  pihak1Religion: string;
  pihak1Job: string;
  pihak1Address: string;

  pihak2Name: string;
  pihak2Nik: string;
  pihak2Position: string;

  businessName: string;
  businessType: string;
  businessAddress: string;
  businessYear: string;
  monthlyIncome: number;

  tujuanPembuatan: string;
  statusTempat: string;
  skalaUsaha: string;
  kewajibanRetribusi: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SkuData = {
  letterNumber: '400/012/SKU/2026',
  issueDate: '2026-07-13',
  villageName: 'Sardonoharjo',
  subDistrictName: 'Ngaglik',
  districtName: 'Sleman',
  
  pihak1Name: 'BAMBANG SUDARSO',
  pihak1Nik: '3404010101740001',
  pihak1Pob: 'Sleman',
  pihak1Dob: '1974-05-12',
  pihak1Gender: 'Laki-laki',
  pihak1Religion: 'Islam',
  pihak1Job: 'Wiraswasta',
  pihak1Address: 'Jl. Kaliurang KM 10, RT 05 RW 02, Sardonoharjo, Ngaglik, Sleman',

  pihak2Name: 'H. AHMAD FAISAL, S.E.',
  pihak2Nik: '19700101 199803 1 005',
  pihak2Position: 'Kepala Desa',

  businessName: 'Toko Kelontong Berkah',
  businessType: 'Perdagangan / Sembako',
  businessAddress: 'Pasar Gentan Blok A No. 12, Sardonoharjo, Ngaglik, Sleman',
  businessYear: '2015',
  monthlyIncome: 15000000,

  tujuanPembuatan: 'Pengajuan Kredit Perbankan',
  statusTempat: 'Sewa / Kontrak',
  skalaUsaha: 'Mikro (UMKM)',
  kewajibanRetribusi: 'Ditanggung Sepenuhnya Oleh Pihak Pertama',
};

// --- HELPER FUNCTION UNTUK TERBILANG ---
function terbilang(angka: number): string {
    const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let hasil = "";
    if (angka < 12) {
        hasil = huruf[angka];
    } else if (angka < 20) {
        hasil = terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        hasil = terbilang(Math.floor(angka / 10)) + " Puluh " + huruf[angka % 10];
    } else if (angka < 200) {
        hasil = "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        hasil = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        hasil = "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        hasil = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        hasil = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000)) + " Milyar " + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000000)) + " Trilyun " + terbilang(angka % 1000000000000);
    }
    return hasil.trim();
}

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
export default function SkuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor SKU...</div>}>
      <SkuBuilder />
    </Suspense>
  );
}

function SkuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SkuData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'desa' | 'pemohon' | 'usaha' | 'legal'>('desa');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SkuData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset data formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-4 border-double border-black pb-4 mb-6 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider">PEMERINTAH KABUPATEN {data.districtName}</h2>
        <h2 className="text-xl font-bold uppercase tracking-wider">KECAMATAN {data.subDistrictName}</h2>
        <h1 className="text-2xl font-black uppercase tracking-widest my-1">DESA {data.villageName}</h1>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-lg underline uppercase tracking-widest">SURAT KETERANGAN USAHA (SKU)</h2>
        <p className="font-bold mt-1">Nomor: {data.letterNumber}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini Kepala Desa <strong>{data.villageName}</strong>, Kecamatan <strong>{data.subDistrictName}</strong>, Kabupaten <strong>{data.districtName}</strong>, menerangkan dengan sebenarnya bahwa:</p>
      </div>

      {/* PIHAK 1 (Pemohon) */}
      <div className="mb-6 break-inside-avoid pl-8">
        <div className="flex"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pihak1Name}</div></div>
        <div className="flex"><div className="w-48">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak1Nik}</div></div>
        <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Pob}, {formatDateDisplay(data.pihak1Dob)}</div></div>
        <div className="flex"><div className="w-48">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Gender}</div></div>
        <div className="flex"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Job}</div></div>
        <div className="flex"><div className="w-48">Alamat Domisili</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Address}</div></div>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Berdasarkan pengamatan kami dan keterangan dari RT/RW setempat, nama tersebut di atas benar-benar memiliki dan menjalankan usaha di wilayah kami, dengan rincian sebagai berikut:</p>
      </div>

      {/* DETAIL USAHA */}
      <div className="mb-6 break-inside-avoid pl-8 bg-gray-50 border border-gray-200 p-4 rounded-md">
        <div className="flex mb-1"><div className="w-44">Nama Usaha</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.businessName}</div></div>
        <div className="flex mb-1"><div className="w-44">Bidang/Jenis Usaha</div><div className="w-4">:</div><div className="flex-1">{data.businessType}</div></div>
        <div className="flex mb-1"><div className="w-44">Alamat Tempat Usaha</div><div className="w-4">:</div><div className="flex-1">{data.businessAddress}</div></div>
        <div className="flex mb-1"><div className="w-44">Tahun Berdiri</div><div className="w-4">:</div><div className="flex-1">{data.businessYear}</div></div>
        <div className="flex mb-1"><div className="w-44">Status Tempat Usaha</div><div className="w-4">:</div><div className="flex-1">{data.statusTempat}</div></div>
        <div className="flex mb-1"><div className="w-44">Omset Rata-rata/Bulan</div><div className="w-4">:</div><div className="flex-1 font-bold text-gray-800">Rp {data.monthlyIncome.toLocaleString('id-ID')} ({terbilang(data.monthlyIncome)} Rupiah)</div></div>
        <div className="flex mb-1"><div className="w-44">Skala Usaha</div><div className="w-4">:</div><div className="flex-1">{data.skalaUsaha}</div></div>
      </div>

      <div className="mb-8 text-justify break-inside-avoid leading-relaxed">
        <p className="mb-2">Surat Keterangan Usaha ini diterbitkan sebagai kelengkapan administrasi untuk:</p>
        <p className="font-bold uppercase text-center border-b-2 border-black inline-block px-4 mx-auto block mb-4 w-fit">"{data.tujuanPembuatan}"</p>
        <p>Demikian Surat Keterangan Usaha ini dibuat dengan sebenar-benarnya agar dapat dipergunakan sebagaimana mestinya. Kami tidak bertanggung jawab secara materil maupun hukum atas resiko yang timbul dari penyalahgunaan surat keterangan ini, termasuk gagal bayar dan/atau resiko finansial lainnya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-12">
        <div className="text-center w-64">
            <div className="mb-1 h-6"></div>
            <div className="h-24 flex justify-center items-center text-xs text-gray-400">
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Name}</p>
            <p className="text-sm">Pemilik Usaha</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-1">{data.villageName}, {formatDateDisplay(data.issueDate)}</p>
            <p className="mb-2 font-bold uppercase">{data.pihak2Position} {data.villageName}</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Kelurahan/Desa)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Name}</p>
            <p className="text-sm">NIP. {data.pihak2Nik}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SKU UMKM</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Store size={18} className="text-blue-600" /> Editor SKU</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('desa')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'desa' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Desa/Lurah</button>
                <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemohon' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pemilik</button>
                <button onClick={() => setActiveTab('usaha')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'usaha' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Data Usaha</button>
                <button onClick={() => setActiveTab('legal')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'legal' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Keterangan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'desa' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Desa & Pejabat
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kabupaten / Kota</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.districtName} onChange={e => handleChange('districtName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kecamatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.subDistrictName} onChange={e => handleChange('subDistrictName', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Desa / Kelurahan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageName} onChange={e => handleChange('villageName', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kades / Lurah</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak2Name} onChange={e => handleChange('pihak2Name', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak2Position} onChange={e => handleChange('pihak2Position', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP Pejabat</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak2Nik} onChange={e => handleChange('pihak2Nik', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat (SKU)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.letterNumber} onChange={e => handleChange('letterNumber', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issueDate} onChange={e => handleChange('issueDate', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pemohon' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Pemilik Usaha
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemilik Usaha</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Name} onChange={e => handleChange('pihak1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP Pemilik</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Nik} onChange={e => handleChange('pihak1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan di KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Job} onChange={e => handleChange('pihak1Job', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Pob} onChange={e => handleChange('pihak1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Dob} onChange={e => handleChange('pihak1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Gender} onChange={e => handleChange('pihak1Gender', e.target.value)}>
                                    <option>Laki-laki</option>
                                    <option>Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Religion} onChange={e => handleChange('pihak1Religion', e.target.value)}>
                                    <option>Islam</option>
                                    <option>Kristen</option>
                                    <option>Katolik</option>
                                    <option>Hindu</option>
                                    <option>Buddha</option>
                                    <option>Konghucu</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Address} onChange={e => handleChange('pihak1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'usaha' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Store size={14} className="text-amber-600"/> Data Usaha UMKM
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Usaha / Toko</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.businessName} onChange={e => handleChange('businessName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bidang Usaha</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.businessType} onChange={e => handleChange('businessType', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun Berdiri Usaha</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.businessYear} onChange={e => handleChange('businessYear', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Omset Rata-rata per Bulan (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.monthlyIncome} onChange={e => handleChange('monthlyIncome', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Tempat Usaha</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.businessAddress} onChange={e => handleChange('businessAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'legal' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-red-600"/> Legalitas Usaha
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Pembuatan SKU</label>
                            <input className="w-full bg-red-50 p-2.5 border border-red-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.tujuanPembuatan} onChange={e => handleChange('tujuanPembuatan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Tempat Usaha</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.statusTempat} onChange={e => handleChange('statusTempat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Skala Usaha</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.skalaUsaha} onChange={e => handleChange('skalaUsaha', e.target.value)} />
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
              <PrintWrapper documentName={`SKU_${data.pihak1Name.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
