'use client';

/**
 * FILE: KprPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Formulir Aplikasi KPR
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, UserCircle2, Briefcase, Wallet, Home,
  FileText, CreditCard
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KprData {
  noReferensi: string;
  tanggalKpr: string;
  cabang: string;
  kodeSales: string;
  
  jenisFasilitas: 'Primary' | 'Secondary' | 'Renovasi' | 'Take Over' | 'Multiguna';
  jumlahKredit: number;
  tenorBulan: number;
  tujuanPenggunaan: string;
  
  namaLengkap: string;
  noKtp: string;
  npwp: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Janda/Duda';
  jumlahTanggungan: number;
  
  alamatKtp: string;
  alamatDomisili: string;
  statusTempatTinggal: 'Milik Sendiri' | 'Sewa / Kontrak' | 'Rumah Dinas' | 'Keluarga';
  lamaMenetap: number;
  noHp: string;
  email: string;
  
  namaIbuKandung: string;
  namaPasangan: string;
  
  pekerjaan: 'Karyawan Swasta' | 'PNS/TNI/POLRI' | 'Wiraswasta' | 'Profesional';
  namaInstansi: string;
  jabatan: string;
  lamaBekerja: number;
  penghasilanBulanan: number;
  
  hargaProperti: number;
  uangMuka: number;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KprData = {
  noReferensi: 'KPR/2026/08/9981',
  tanggalKpr: '2026-08-01',
  cabang: 'Jakarta Sudirman',
  kodeSales: 'SLS-001/A',
  
  jenisFasilitas: 'Primary',
  jumlahKredit: 800000000,
  tenorBulan: 180,
  tujuanPenggunaan: 'Pembelian Rumah di Citra Indah City',
  
  namaLengkap: 'Budi Santoso',
  noKtp: '3171234567890001',
  npwp: '01.234.567.8-091.000',
  tempatLahir: 'Jakarta',
  tanggalLahir: '1985-05-15',
  jenisKelamin: 'Laki-laki',
  statusPernikahan: 'Menikah',
  jumlahTanggungan: 2,
  
  alamatKtp: 'Jl. Merpati Putih No. 12, RT 04/RW 02, Kebon Jeruk, Jakarta Barat 11530',
  alamatDomisili: 'Sama dengan KTP',
  statusTempatTinggal: 'Sewa / Kontrak',
  lamaMenetap: 5,
  noHp: '081234567890',
  email: 'budi.santoso@email.com',
  
  namaIbuKandung: 'Siti Aminah',
  namaPasangan: 'Ani Yudhoyono',
  
  pekerjaan: 'Karyawan Swasta',
  namaInstansi: 'PT Teknologi Nusantara',
  jabatan: 'IT Manager',
  lamaBekerja: 7,
  penghasilanBulanan: 25000000,
  
  hargaProperti: 1000000000,
  uangMuka: 200000000,
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KprPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <KprBuilder />
    </Suspense>
  );
}

function KprBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KprData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'admin' | 'fasilitas' | 'pemohon' | 'pekerjaan'>('admin');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalKpr: today }));
  }, []);

  const handleDataChange = (field: keyof KprData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir KPR ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalKpr: today });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
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
        {/* KOP SURAT */}
        <div className="flex justify-between items-start border-b-[3px] border-slate-900 pb-4 mb-6 break-inside-avoid">
            <div>
                <h1 className="m-0 text-2xl uppercase tracking-widest font-black text-slate-900">BANK NUSANTARA</h1>
                <p className="mt-1 text-xs font-bold text-slate-700 tracking-wider">DIVISI KREDIT KONSUMER - LAYANAN KPR</p>
                <p className="mt-0.5 text-[10px] text-slate-500">Gedung Sentral Nusantara, Jl. Jend. Sudirman Kav. 1, Jakarta 12190</p>
            </div>
            <div className="text-left text-[10px] border border-slate-300 p-2 min-w-[200px] bg-slate-50 rounded-lg">
                <table className="w-full">
                    <tbody>
                        <tr><td className="w-20 font-bold text-slate-600">No. Ref</td><td className="w-2">:</td><td className="font-mono font-bold text-slate-900">{data.noReferensi}</td></tr>
                        <tr><td className="w-20 font-bold text-slate-600">Tanggal</td><td className="w-2">:</td><td className="text-slate-900">{formatDateSafe(data.tanggalKpr)}</td></tr>
                        <tr><td className="w-20 font-bold text-slate-600">Cabang</td><td className="w-2">:</td><td className="text-slate-900">{data.cabang}</td></tr>
                        <tr><td className="w-20 font-bold text-slate-600">Kode Sales</td><td className="w-2">:</td><td className="text-slate-900">{data.kodeSales}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-6 break-inside-avoid">
            <h2 className="text-lg underline font-black tracking-widest uppercase">FORMULIR APLIKASI KREDIT PEMILIKAN RUMAH (KPR)</h2>
            <p className="italic text-[10px] font-semibold text-slate-600 mt-1">*Mohon diisi dengan huruf cetak dengan sebenar-benarnya</p>
        </div>

        {/* I. FASILITAS KREDIT */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="text-[11px] bg-slate-900 text-white px-3 py-1 font-bold uppercase mb-3 rounded-sm flex items-center gap-2"><Home size={14}/> I. FASILITAS KREDIT YANG DIMOHON</h3>
            <div className="px-2">
                <table className="w-full text-xs">
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="w-48 py-2 font-bold text-slate-700">Jenis Fasilitas KPR</td>
                            <td className="w-4">:</td>
                            <td className="py-2">
                                <div className="flex gap-4 font-bold text-slate-900">
                                    <span className="flex items-center gap-1">{data.jenisFasilitas === 'Primary' ? '☑' : '☐'} Primary</span>
                                    <span className="flex items-center gap-1">{data.jenisFasilitas === 'Secondary' ? '☑' : '☐'} Secondary</span>
                                    <span className="flex items-center gap-1">{data.jenisFasilitas === 'Renovasi' ? '☑' : '☐'} Renovasi</span>
                                    <span className="flex items-center gap-1">{data.jenisFasilitas === 'Take Over' ? '☑' : '☐'} Take Over</span>
                                    <span className="flex items-center gap-1">{data.jenisFasilitas === 'Multiguna' ? '☑' : '☐'} Multiguna</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Jumlah Kredit (Plafon)</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-mono font-bold text-sm bg-slate-50 px-2 rounded">{formatCurrency(data.jumlahKredit)}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Jangka Waktu (Tenor)</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-bold">{data.tenorBulan} Bulan ( {(data.tenorBulan / 12).toFixed(1)} Tahun )</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Tujuan Penggunaan</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.tujuanPenggunaan}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* II. DATA PRIBADI */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="text-[11px] bg-slate-900 text-white px-3 py-1 font-bold uppercase mb-3 rounded-sm flex items-center gap-2"><UserCircle2 size={14}/> II. DATA PRIBADI PEMOHON</h3>
            <div className="px-2">
                <table className="w-full text-xs">
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="w-48 py-2 font-bold text-slate-700">Nama Lengkap (Sesuai KTP)</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-bold uppercase" colSpan={4}>{data.namaLengkap}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Nomor KTP / NIK</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-mono">{data.noKtp}</td>
                            <td className="w-24 py-2 font-bold text-slate-700 pl-4 border-l border-slate-200">NPWP</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-mono">{data.npwp}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Tempat, Tanggal Lahir</td>
                            <td className="w-4">:</td>
                            <td className="py-2" colSpan={4}>{data.tempatLahir}, {formatDateSafe(data.tanggalLahir)}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Jenis Kelamin</td>
                            <td className="w-4">:</td>
                            <td className="py-2">
                                <span className="mr-4">{data.jenisKelamin === 'Laki-laki' ? '☑' : '☐'} Laki-laki</span>
                                <span>{data.jenisKelamin === 'Perempuan' ? '☑' : '☐'} Perempuan</span>
                            </td>
                            <td className="py-2 font-bold text-slate-700 pl-4 border-l border-slate-200">Status Nikah</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.statusPernikahan}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700 align-top pt-3">Alamat Sesuai KTP</td>
                            <td className="w-4 align-top pt-3">:</td>
                            <td className="py-2 align-top" colSpan={4}>{data.alamatKtp}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700 align-top pt-3">Alamat Domisili</td>
                            <td className="w-4 align-top pt-3">:</td>
                            <td className="py-2 align-top" colSpan={4}>{data.alamatDomisili}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Status Tempat Tinggal</td>
                            <td className="w-4">:</td>
                            <td className="py-2" colSpan={4}>
                                <span className="mr-4">{data.statusTempatTinggal === 'Milik Sendiri' ? '☑' : '☐'} Milik Sendiri</span>
                                <span className="mr-4">{data.statusTempatTinggal === 'Sewa / Kontrak' ? '☑' : '☐'} Sewa/Kontrak</span>
                                <span className="mr-4">{data.statusTempatTinggal === 'Keluarga' ? '☑' : '☐'} Keluarga</span>
                                <span className="mr-4">Lama Menetap: {data.lamaMenetap} Tahun</span>
                            </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">No. Handphone / WhatsApp</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.noHp}</td>
                            <td className="py-2 font-bold text-slate-700 pl-4 border-l border-slate-200">Email</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.email}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Nama Gadis Ibu Kandung</td>
                            <td className="w-4">:</td>
                            <td className="py-2 uppercase font-semibold text-rose-700" colSpan={4}>{data.namaIbuKandung}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* III. DATA PEKERJAAN */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="text-[11px] bg-slate-900 text-white px-3 py-1 font-bold uppercase mb-3 rounded-sm flex items-center gap-2"><Briefcase size={14}/> III. DATA PEKERJAAN & PENGHASILAN</h3>
            <div className="px-2">
                <table className="w-full text-xs">
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="w-48 py-2 font-bold text-slate-700">Pekerjaan</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-bold" colSpan={4}>{data.pekerjaan}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Nama Instansi / Perusahaan</td>
                            <td className="w-4">:</td>
                            <td className="py-2 uppercase font-bold text-slate-900" colSpan={4}>{data.namaInstansi}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Jabatan / Posisi</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.jabatan}</td>
                            <td className="w-24 py-2 font-bold text-slate-700 pl-4 border-l border-slate-200">Lama Bekerja</td>
                            <td className="w-4">:</td>
                            <td className="py-2">{data.lamaBekerja} Tahun</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-700">Penghasilan Bersih Bulanan</td>
                            <td className="w-4">:</td>
                            <td className="py-2 font-mono font-bold text-sm bg-emerald-50 px-2 rounded text-emerald-800" colSpan={4}>{formatCurrency(data.penghasilanBulanan)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* IV. DATA PEMBELIAN */}
        <div className="mb-8 break-inside-avoid">
            <h3 className="text-[11px] bg-slate-900 text-white px-3 py-1 font-bold uppercase mb-3 rounded-sm flex items-center gap-2"><Wallet size={14}/> IV. INFORMASI KEUANGAN PROPERTI</h3>
            <div className="px-2 flex gap-8">
                <div className="w-1/2">
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td className="py-1 font-bold text-slate-700">Harga Properti (Sesuai PPJB/AJB)</td><td className="w-4">:</td><td className="py-1 font-mono">{formatCurrency(data.hargaProperti)}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-700">Uang Muka (Down Payment)</td><td className="w-4">:</td><td className="py-1 font-mono text-rose-700">({formatCurrency(data.uangMuka)})</td></tr>
                            <tr className="border-t-2 border-slate-900"><td className="py-2 font-black text-slate-900">Total Plafon KPR</td><td className="w-4 font-bold">:</td><td className="py-2 font-mono font-black text-[13px]">{formatCurrency(data.jumlahKredit)}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* PERNYATAAN */}
        <div className="mb-12 text-justify text-[10px] text-slate-700 leading-relaxed break-inside-avoid px-2">
            <p className="font-bold mb-2">PERNYATAAN PEMOHON:</p>
            <ol className="list-decimal pl-5 space-y-1">
                <li>Dengan ini saya menyatakan bahwa semua informasi yang saya berikan dalam formulir aplikasi ini beserta seluruh dokumen lampirannya adalah benar, lengkap, dan sah.</li>
                <li>Saya memberikan persetujuan kepada Bank Nusantara untuk melakukan verifikasi, pemeriksaan, atau meminta referensi dari pihak manapun sehubungan dengan data yang saya berikan sesuai dengan ketentuan yang berlaku.</li>
                <li>Bank Nusantara berhak menolak atau menyetujui aplikasi ini sepenuhnya, serta tidak berkewajiban untuk mengembalikan dokumen aplikasi yang telah diserahkan.</li>
            </ol>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid px-8">
            <div className="w-64">
                <p className="mb-2 font-bold text-[10px]">Pemohon,</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[8px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-2"></div>
                <p className="font-bold underline uppercase">{data.namaLengkap}</p>
                <p className="text-[10px] text-slate-500">Tanda Tangan & Nama Terang</p>
            </div>
            <div className="w-64">
                <p className="mb-2 font-bold text-[10px]">Pasangan (Suami/Istri),</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 mx-auto"></div>
                <div className="h-2"></div>
                <p className="font-bold underline uppercase">{data.statusPernikahan === 'Menikah' ? data.namaPasangan : '________________________'}</p>
                <p className="text-[10px] text-slate-500">Tanda Tangan & Nama Terang</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Formulir KPR Bank</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Form</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Data Pemohon</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('admin')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'admin' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Admin</button>
                <button onClick={() => setActiveTab('fasilitas')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'fasilitas' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Kredit</button>
                <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemohon' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pribadi</button>
                <button onClick={() => setActiveTab('pekerjaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pekerjaan' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Finansial</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'admin' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Data Administrasi Bank
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Referensi / Aplikasi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.noReferensi} onChange={e => handleDataChange('noReferensi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Input</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalKpr} onChange={e => handleDataChange('tanggalKpr', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cabang / Capem</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.cabang} onChange={e => handleDataChange('cabang', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kode AO / Sales</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-mono" value={data.kodeSales} onChange={e => handleDataChange('kodeSales', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'fasilitas' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Home size={14} className="text-blue-600"/> Fasilitas Kredit Yang Diminta
                    </h3>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Jenis Fasilitas</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Primary', 'Secondary', 'Renovasi', 'Take Over', 'Multiguna'].map(opt => (
                                <button key={opt} onClick={() => handleDataChange('jenisFasilitas', opt)} className={`py-2 px-3 border rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2 ${data.jenisFasilitas === opt ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${data.jenisFasilitas === opt ? 'border-white' : 'border-slate-400'}`}>
                                        {data.jenisFasilitas === opt && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Kredit / Plafon (Rp)</label>
                            <input type="number" className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-blue-900" value={data.jumlahKredit} onChange={e => handleDataChange('jumlahKredit', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tenor (Bulan)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tenorBulan} onChange={e => handleDataChange('tenorBulan', Number(e.target.value))} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Penggunaan Khusus</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tujuanPenggunaan} onChange={e => handleDataChange('tujuanPenggunaan', e.target.value)} />
                    </div>
                  </div>
              )}

              {activeTab === 'pemohon' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-amber-600"/> Biodata Pemohon Utama
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap (Sesuai KTP)</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.namaLengkap} onChange={e => handleDataChange('namaLengkap', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.noKtp} onChange={e => handleDataChange('noKtp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Pribadi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.npwp} onChange={e => handleDataChange('npwp', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.tempatLahir} onChange={e => handleDataChange('tempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalLahir} onChange={e => handleDataChange('tanggalLahir', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Pernikahan</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-semibold" value={data.statusPernikahan} onChange={e => handleDataChange('statusPernikahan', e.target.value)}>
                                    <option value="Belum Menikah">Belum Menikah</option>
                                    <option value="Menikah">Menikah</option>
                                    <option value="Janda/Duda">Janda / Duda</option>
                                </select>
                            </div>
                            {data.statusPernikahan === 'Menikah' && (
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pasangan (Suami/Istri)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.namaPasangan} onChange={e => handleDataChange('namaPasangan', e.target.value)} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Gadis Ibu Kandung (Penting untuk Bank)</label>
                            <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase text-rose-800" value={data.namaIbuKandung} onChange={e => handleDataChange('namaIbuKandung', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Home size={14} className="text-slate-600"/> Alamat & Kontak
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.alamatKtp} onChange={e => handleDataChange('alamatKtp', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili / Tempat Tinggal Sekarang</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.alamatDomisili} onChange={e => handleDataChange('alamatDomisili', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Tempat Tinggal</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.statusTempatTinggal} onChange={e => handleDataChange('statusTempatTinggal', e.target.value)}>
                                    <option value="Milik Sendiri">Milik Sendiri</option>
                                    <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                                    <option value="Keluarga">Ikut Keluarga</option>
                                    <option value="Rumah Dinas">Rumah Dinas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Handphone (Aktif)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.noHp} onChange={e => handleDataChange('noHp', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'pekerjaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-emerald-600"/> Pekerjaan & Penghasilan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Pekerjaan Utama</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pekerjaan} onChange={e => handleDataChange('pekerjaan', e.target.value)}>
                                <option value="Karyawan Swasta">Karyawan Swasta</option>
                                <option value="PNS/TNI/POLRI">PNS / TNI / POLRI</option>
                                <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                                <option value="Profesional">Profesional (Dokter/Lawyer dll)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Perusahaan Tempat Bekerja</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.namaInstansi} onChange={e => handleDataChange('namaInstansi', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan / Posisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jabatan} onChange={e => handleDataChange('jabatan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lama Bekerja (Tahun)</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.lamaBekerja} onChange={e => handleDataChange('lamaBekerja', Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-4 mt-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penghasilan Bersih Per Bulan (Take Home Pay)</label>
                            <input type="number" className="w-full bg-emerald-50 p-3 border border-emerald-200 rounded-xl text-lg font-black font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-800" value={data.penghasilanBulanan} onChange={e => handleDataChange('penghasilanBulanan', Number(e.target.value))} />
                            <p className="text-[9px] text-slate-400 mt-1 italic">*Nilai ini akan menjadi dasar perhitungan Debt Burden Ratio (DBR) / Limit Kredit</p>
                        </div>
                        
                        <div className="border-t border-slate-100 pt-4 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                             <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1"><Wallet size={12}/> Info Properti Dasar</h4>
                             <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Harga Pembelian</label>
                                    <input type="number" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.hargaProperti} onChange={e => handleDataChange('hargaProperti', Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Uang Muka (DP)</label>
                                    <input type="number" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-rose-600" value={data.uangMuka} onChange={e => handleDataChange('uangMuka', Number(e.target.value))} />
                                </div>
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
              <PrintWrapper documentName={`Aplikasi_KPR_${data.namaLengkap.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
