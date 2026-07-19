'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: BuktiPotongPPh21Page.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Bukti Pemotongan PPh Pasal 21 (Form 1721-A1)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, User, FileText, Calculator, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PPhData {
  // Header
  nomorBuktiPotong: string;
  masaAwal: string;
  masaAkhir: string;
  tahunPajak: string;
  kodeObjekPajak: string;

  // Bagian A – Pemotong
  npwpPemotong: string;
  namaPemotong: string;
  alamatPemotong: string;

  // Bagian B – Penerima
  npwpPenerima: string;
  nikPenerima: string;
  namaPenerima: string;
  alamatPenerima: string;
  jenisKelamin: 'L' | 'P';
  statusPtkp: string;
  jabatanPenerima: string;
  masaKerjaAwal: string;
  masaKerjaAkhir: string;

  // Bagian C – Rincian Penghasilan (Rupiah Penuh)
  gajiPensiun: number;
  tunjanganPph: number;
  tunjanganLainnya: number;
  honorarium: number;
  premiAsuransi: number;
  naturaKenikmatan: number;
  tantiem: number;

  biayaJabatan: number;
  iuranPensiun: number;

  penghasilanNetoPrevious: number;
  pphPrevious: number;

  ptkp: number;

  // Bagian D – Tanggal & Penandatangan
  tanggalTtd: string;
  namaPenandatangan: string;
  jabatanPenandatangan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PPhData = {
  nomorBuktiPotong: '1.1-12-26-0000001',
  masaAwal: '01',
  masaAkhir: '12',
  tahunPajak: '2026',
  kodeObjekPajak: '21-100-01',

  npwpPemotong: '01.234.567.8-901.000',
  namaPemotong: 'PT TECH INNOVATION NUSANTARA',
  alamatPemotong: 'Jl. Sudirman Kav. 52-53, Jakarta Selatan 12190',

  npwpPenerima: '87.654.321.0-123.000',
  nikPenerima: '3174012345678901',
  namaPenerima: 'BUDI SANTOSO',
  alamatPenerima: 'Jl. Kebon Jeruk No. 12, Jakarta Barat 11530',
  jenisKelamin: 'L',
  statusPtkp: 'K/1',
  jabatanPenerima: 'SOFTWARE ENGINEER',
  masaKerjaAwal: '01',
  masaKerjaAkhir: '12',

  gajiPensiun: 120000000,
  tunjanganPph: 0,
  tunjanganLainnya: 20000000,
  honorarium: 0,
  premiAsuransi: 5000000,
  naturaKenikmatan: 0,
  tantiem: 10000000,

  biayaJabatan: 6000000,
  iuranPensiun: 3000000,

  penghasilanNetoPrevious: 0,
  pphPrevious: 0,

  ptkp: 63000000, // K/1

  tanggalTtd: '2026-12-31',
  namaPenandatangan: 'ANDIKA PRASETYO',
  jabatanPenandatangan: 'HR DIRECTOR',
};

// --- HELPERS ---
function formatCurrency(n: number): string {
  if (n === 0) return '0';
  return n.toLocaleString('id-ID');
}

// Menghitung Tarif Progresif PPh 21
function hitungTarifProgresif(pkp: number) {
  const layers = [
    { label: '5% (s/d 60 Jt)', batasAtas: 60000000, tarif: 0.05 },
    { label: '15% (>60 - 250 Jt)', batasAtas: 250000000, tarif: 0.15 },
    { label: '25% (>250 - 500 Jt)', batasAtas: 500000000, tarif: 0.25 },
    { label: '30% (>500 Jt - 5 M)', batasAtas: 5000000000, tarif: 0.30 },
    { label: '35% (>5 M)', batasAtas: Infinity, tarif: 0.35 },
  ];

  let sisa = pkp > 0 ? pkp : 0;
  let prev = 0;
  let totalPph = 0;

  for (const layer of layers) {
    if (sisa <= 0) break;
    const batas = layer.batasAtas === Infinity ? sisa : Math.min(layer.batasAtas - prev, sisa);
    const pphLayer = batas * layer.tarif;
    totalPph += pphLayer;
    sisa -= batas;
    prev = layer.batasAtas;
  }

  return totalPph;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] print:p-[5mm] text-slate-900 leading-snug box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[8.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BuktiPotongPPh21Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor PPh 21...</div>}>
      <PPh21Builder />
    </Suspense>
  );
}

function PPh21Builder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PPhData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'header' | 'pemotong' | 'penerima' | 'penghasilan' | 'ttd'>('header');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof PPhData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form PPh 21 ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  // --- CALCULATION LOGIC ---
  const bruto = data.gajiPensiun + data.tunjanganPph + data.tunjanganLainnya + data.honorarium + data.premiAsuransi + data.naturaKenikmatan + data.tantiem;
  const pengurang = data.biayaJabatan + data.iuranPensiun;
  const netoMasa = bruto - pengurang;
  const netoSetahun = netoMasa + data.penghasilanNetoPrevious; // Asumsi disetahunkan (simplifikasi untuk form 1721-A1 standard)
  const pkp = Math.max(0, netoSetahun - data.ptkp);
  // Pembulatan PKP ke bawah ribuan penuh
  const pkpBulat = Math.floor(pkp / 1000) * 1000;
  
  const pphSetahun = hitungTarifProgresif(pkpBulat);
  const pphTerutang = pphSetahun - data.pphPrevious;

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER 1721-A1 */}
      <div className="flex justify-between items-start border-b-[3px] border-black pb-2 mb-2 break-inside-avoid">
        <div className="w-1/4">
            <div className="border border-black p-1 text-center font-bold text-lg mb-1">
                FORMULIR 1721 - A1
            </div>
            <p className="text-[7pt] text-center">Lembar ke-1 : untuk Penerima Penghasilan</p>
        </div>
        <div className="w-2/4 text-center">
            <h1 className="font-bold text-sm uppercase">BUKTI PEMOTONGAN PAJAK PENGHASILAN PASAL 21</h1>
            <p className="text-[8pt] uppercase">BAGI PEGAWAI TETAP ATAU PENERIMA PENSIUN ATAU TUNJANGAN HARI TUA/JAMINAN HARI TUA BERKALA</p>
        </div>
        <div className="w-1/4 text-right">
            <p className="font-bold">KEMENTERIAN KEUANGAN RI</p>
            <p>DIREKTORAT JENDERAL PAJAK</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2 font-bold text-[9pt]">
          <div>NOMOR: {data.nomorBuktiPotong}</div>
          <div className="flex gap-4">
              <div>MASA PEROLEHAN: {data.masaAwal} - {data.masaAkhir}</div>
              <div>TAHUN PAJAK: {data.tahunPajak}</div>
          </div>
      </div>

      {/* A. IDENTITAS PEMOTONG */}
      <div className="mb-2">
          <div className="bg-black text-white font-bold p-1 px-2 uppercase text-[9pt]">A. IDENTITAS PEMOTONG</div>
          <div className="border border-black p-2 flex gap-4">
              <div className="w-1/2">
                  <div className="flex"><span className="w-20 font-bold">1. NPWP</span><span>: {data.npwpPemotong}</span></div>
                  <div className="flex"><span className="w-20 font-bold">2. NAMA</span><span>: {data.namaPemotong}</span></div>
              </div>
              <div className="w-1/2">
                  <div className="flex"><span className="w-20 font-bold">3. ALAMAT</span><span>: {data.alamatPemotong}</span></div>
              </div>
          </div>
      </div>

      {/* B. IDENTITAS PENERIMA */}
      <div className="mb-2">
          <div className="bg-black text-white font-bold p-1 px-2 uppercase text-[9pt]">B. IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG</div>
          <div className="border border-black p-2 flex flex-col gap-1">
              <div className="flex"><span className="w-48 font-bold">1. NPWP</span><span>: {data.npwpPenerima}</span></div>
              <div className="flex"><span className="w-48 font-bold">2. NIK / NO. PASPOR</span><span>: {data.nikPenerima}</span></div>
              <div className="flex"><span className="w-48 font-bold">3. NAMA LENGKAP</span><span>: {data.namaPenerima}</span></div>
              <div className="flex"><span className="w-48 font-bold">4. ALAMAT</span><span>: {data.alamatPenerima}</span></div>
              <div className="flex"><span className="w-48 font-bold">5. JENIS KELAMIN</span><span>: {data.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</span></div>
              <div className="flex"><span className="w-48 font-bold">6. STATUS PTKP</span><span>: {data.statusPtkp}</span></div>
              <div className="flex"><span className="w-48 font-bold">7. NAMA JABATAN</span><span>: {data.jabatanPenerima}</span></div>
              <div className="flex"><span className="w-48 font-bold">8. KODE OBJEK PAJAK</span><span>: {data.kodeObjekPajak}</span></div>
          </div>
      </div>

      {/* C. RINCIAN PENGHASILAN */}
      <div className="mb-2">
          <div className="bg-black text-white font-bold p-1 px-2 uppercase text-[9pt]">C. RINCIAN PENGHASILAN DAN PENGHITUNGAN PPh PASAL 21</div>
          <table className="w-full border-collapse border border-black text-[8.5pt]">
              <tbody>
                  <tr className="font-bold bg-slate-100"><td colSpan={2} className="border border-black p-1 px-2">PENGHASILAN BRUTO</td><td className="border border-black p-1 text-center w-32">RUPIAH</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">1.</td><td className="p-1">Gaji/Pensiun atau THT/JHT</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.gajiPensiun)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">2.</td><td className="p-1">Tunjangan PPh</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.tunjanganPph)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">3.</td><td className="p-1">Tunjangan Lainnya, Uang Lembur dsb</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.tunjanganLainnya)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">4.</td><td className="p-1">Honorarium dan Imbalan Lain Sejenisnya</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.honorarium)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">5.</td><td className="p-1">Premi Asuransi yang Dibayar Pemberi Kerja</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.premiAsuransi)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">6.</td><td className="p-1">Penerimaan dalam bentuk Natura/Kenikmatan</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.naturaKenikmatan)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">7.</td><td className="p-1">Tantiem, Bonus, Gratifikasi, Jasa Produksi, THR</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.tantiem)}</td></tr>
                  <tr className="font-bold bg-slate-50"><td className="border-r border-black p-1 px-2 w-8 text-center">8.</td><td className="p-1">JUMLAH PENGHASILAN BRUTO (1 s.d. 7)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(bruto)}</td></tr>
                  
                  <tr className="font-bold bg-slate-100"><td colSpan={3} className="border border-black p-1 px-2">PENGURANGAN</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">9.</td><td className="p-1">Biaya Jabatan / Biaya Pensiun</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.biayaJabatan)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">10.</td><td className="p-1">Iuran Pensiun atau Iuran THT/JHT</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.iuranPensiun)}</td></tr>
                  <tr className="font-bold bg-slate-50"><td className="border-r border-black p-1 px-2 w-8 text-center">11.</td><td className="p-1">JUMLAH PENGURANGAN (9 + 10)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(pengurang)}</td></tr>

                  <tr className="font-bold bg-slate-100"><td colSpan={3} className="border border-black p-1 px-2">PENGHITUNGAN PPh PASAL 21</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">12.</td><td className="p-1">Jumlah Penghasilan Neto (8 - 11)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(netoMasa)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">13.</td><td className="p-1">Penghasilan Neto Masa Sebelumnya</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.penghasilanNetoPrevious)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">14.</td><td className="p-1">Jumlah Penghasilan Neto untuk PPh 21 (Setahun)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(netoSetahun)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">15.</td><td className="p-1">Penghasilan Tidak Kena Pajak (PTKP)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.ptkp)}</td></tr>
                  <tr className="font-bold"><td className="border-r border-black p-1 px-2 w-8 text-center">16.</td><td className="p-1">Penghasilan Kena Pajak Setahun / Disedetahunkan (14 - 15)</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(pkpBulat)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">17.</td><td className="p-1">PPh Pasal 21 atas Penghasilan Kena Pajak Setahun/Disetahunkan</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(pphSetahun)}</td></tr>
                  <tr><td className="border-r border-black p-1 px-2 w-8 text-center">18.</td><td className="p-1">PPh Pasal 21 yang telah dipotong Masa Sebelumnya</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(data.pphPrevious)}</td></tr>
                  <tr className="font-bold bg-slate-200"><td className="border-r border-black p-1 px-2 w-8 text-center">19.</td><td className="p-1">PPh PASAL 21 YANG TERUTANG</td><td className="border-l border-black p-1 px-2 text-right">{formatCurrency(pphTerutang)}</td></tr>
              </tbody>
          </table>
      </div>

      {/* D. IDENTITAS & TTD PEMOTONG */}
      <div className="mb-2 break-inside-avoid border border-black p-2 flex justify-between">
          <div className="w-1/2">
              <h3 className="font-bold uppercase text-[9pt] underline mb-1">D. IDENTITAS PEMOTONG PAJAK</h3>
              <div className="flex"><span className="w-24 font-bold">NPWP</span><span>: {data.npwpPemotong}</span></div>
              <div className="flex"><span className="w-24 font-bold">NAMA</span><span>: {data.namaPemotong}</span></div>
              <div className="flex"><span className="w-24 font-bold">TANGGAL</span><span>: {data.tanggalTtd}</span></div>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
              <p className="font-bold uppercase mb-8">Pemotong Pajak / Pimpinan</p>
              <p className="font-bold underline uppercase">{data.namaPenandatangan}</p>
              <p>{data.jabatanPenandatangan}</p>
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
              <ArrowLeftCircle size={20} className="text-cyan-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Bukti Potong PPh 21</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Formulir</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Calculator size={18} className="text-cyan-600" /> Form 1721-A1</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('header')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'header' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Umum</button>
                <button onClick={() => setActiveTab('pemotong')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemotong' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pemotong</button>
                <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pegawai</button>
                <button onClick={() => setActiveTab('penghasilan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penghasilan' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Hitung</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'header' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Data Formulir Umum
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Bukti Potong (1721-A1)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorBuktiPotong} onChange={e => handleChange('nomorBuktiPotong', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Awal (Bulan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.masaAwal} onChange={e => handleChange('masaAwal', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Akhir (Bulan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.masaAkhir} onChange={e => handleChange('masaAkhir', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun Pajak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tahunPajak} onChange={e => handleChange('tahunPajak', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kode Objek Pajak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kodeObjekPajak} onChange={e => handleChange('kodeObjekPajak', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pemotong' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-blue-600"/> Data Pemotong (Perusahaan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Perusahaan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.npwpPemotong} onChange={e => handleChange('npwpPemotong', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan / Pemotong</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaPemotong} onChange={e => handleChange('namaPemotong', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatPemotong} onChange={e => handleChange('alamatPemotong', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penandatangan Bukti Potong</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaPenandatangan} onChange={e => handleChange('namaPenandatangan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.jabatanPenandatangan} onChange={e => handleChange('jabatanPenandatangan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalTtd} onChange={e => handleChange('tanggalTtd', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-amber-600"/> Data Penerima (Karyawan)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Karyawan</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.npwpPenerima} onChange={e => handleChange('npwpPenerima', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nikPenerima} onChange={e => handleChange('nikPenerima', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaPenerima} onChange={e => handleChange('namaPenerima', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Karyawan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alamatPenerima} onChange={e => handleChange('alamatPenerima', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jenisKelamin} onChange={e => handleChange('jenisKelamin', e.target.value)}>
                                    <option value="L">Laki-Laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status PTKP (Cth: K/1)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.statusPtkp} onChange={e => handleChange('statusPtkp', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Nama Posisi)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jabatanPenerima} onChange={e => handleChange('jabatanPenerima', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penghasilan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Landmark size={14} className="text-emerald-600"/> Rincian Penghasilan & Pajak (Rp)
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                            <h4 className="font-bold text-xs mb-2">Penghasilan Bruto</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center"><label className="text-[10px]">1. Gaji / Pensiun</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.gajiPensiun} onChange={e => handleChange('gajiPensiun', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">2. Tunj. PPh</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.tunjanganPph} onChange={e => handleChange('tunjanganPph', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">3. Tunj. Lainnya (Lembur dll)</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.tunjanganLainnya} onChange={e => handleChange('tunjanganLainnya', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">4. Honorarium</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.honorarium} onChange={e => handleChange('honorarium', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">5. Premi Asuransi dr Pemberi Kerja</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.premiAsuransi} onChange={e => handleChange('premiAsuransi', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">6. Natura</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.naturaKenikmatan} onChange={e => handleChange('naturaKenikmatan', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">7. THR, Bonus, Tantiem</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.tantiem} onChange={e => handleChange('tantiem', parseFloat(e.target.value) || 0)} /></div>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <h4 className="font-bold text-xs mb-2">Pengurangan</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center"><label className="text-[10px]">9. Biaya Jabatan/Pensiun (Maks 6Jt)</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right text-orange-700 font-bold" value={data.biayaJabatan} onChange={e => handleChange('biayaJabatan', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">10. Iuran Pensiun / JHT</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right text-orange-700 font-bold" value={data.iuranPensiun} onChange={e => handleChange('iuranPensiun', parseFloat(e.target.value) || 0)} /></div>
                            </div>
                        </div>

                        <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                            <h4 className="font-bold text-xs mb-2">PTKP & Riwayat Sebelumnya</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center"><label className="text-[10px]">13. Penghasilan Neto Sebelumnya</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.penghasilanNetoPrevious} onChange={e => handleChange('penghasilanNetoPrevious', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px] font-bold">15. Nominal PTKP (Sesuai Status)</label><input type="number" className="w-32 bg-white p-1 border border-slate-400 rounded text-xs text-right font-bold" value={data.ptkp} onChange={e => handleChange('ptkp', parseFloat(e.target.value) || 0)} /></div>
                                <div className="flex justify-between items-center"><label className="text-[10px]">18. PPh 21 Dipotong Sebelumnya</label><input type="number" className="w-32 bg-white p-1 border rounded text-xs text-right" value={data.pphPrevious} onChange={e => handleChange('pphPrevious', parseFloat(e.target.value) || 0)} /></div>
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
              <PrintWrapper documentName={`Bukti_Potong_1721_A1_${data.namaPenerima.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
