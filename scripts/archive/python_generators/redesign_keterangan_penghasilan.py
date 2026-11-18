import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\keterangan-penghasilan\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: KeteranganPenghasilanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Penghasilan (Slip Gaji/Income Statement)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Building2, Wallet, Calculator
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IncomeData {
  p1Name: string;
  p1Jabatan: string;
  p1Perusahaan: string;
  p1Alamat: string;
  
  p2Name: string;
  p2Nik: string;
  p2TTL: string;
  p2Pekerjaan: string;
  p2Alamat: string;
  
  gajiPokok: number;
  tunjanganJabatan: number;
  tunjanganTransport: number;
  tunjanganMakan: number;
  
  bpjsKesehatan: number;
  bpjsTK: number;
  pph21: number;
  potonganLain: number;
  
  metodePembayaran: string;
  kota: string;
  tanggal: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IncomeData = {
  p1Name: 'BUDI SANTOSO',
  p1Jabatan: 'Direktur HRD',
  p1Perusahaan: 'PT MAKMUR SEJAHTERA ABADI',
  p1Alamat: 'Gedung Sudirman Tower Lt. 10, Jakarta Selatan',
  
  p2Name: 'AHMAD FAUZI',
  p2Nik: '3171010101800001',
  p2TTL: 'Jakarta, 15 Agustus 1990',
  p2Pekerjaan: 'Senior Software Engineer',
  p2Alamat: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
  
  gajiPokok: 15000000,
  tunjanganJabatan: 3000000,
  tunjanganTransport: 1000000,
  tunjanganMakan: 1000000,
  
  bpjsKesehatan: 150000,
  bpjsTK: 300000,
  pph21: 750000,
  potonganLain: 0,
  
  metodePembayaran: 'Transfer Bank BCA',
  kota: 'Jakarta',
  tanggal: '2026-07-13'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KeteranganPenghasilanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Slip Gaji...</div>}>
      <IncomeBuilder />
    </Suspense>
  );
}

function IncomeBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'penghasilan'>('perusahaan');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggal: today }));
  }, []);

  const handleDataChange = (field: keyof IncomeData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggal: today });
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

    const totalPenerimaan = data.gajiPokok + data.tunjanganJabatan + data.tunjanganTransport + data.tunjanganMakan;
    const totalPotongan = data.bpjsKesehatan + data.bpjsTK + data.pph21 + data.potonganLain;
    const takeHomePay = totalPenerimaan - totalPotongan;

    return (
      <Kertas>
        {/* KOP SURAT */}
        <div className="text-center border-b-[3px] border-double border-slate-800 pb-4 mb-6 break-inside-avoid">
            <h1 className="font-black text-2xl uppercase tracking-widest text-slate-900">{data.p1Perusahaan}</h1>
            <p className="text-sm font-medium text-slate-700">{data.p1Alamat}</p>
        </div>

        <div className="text-center mb-8 break-inside-avoid">
            <h2 className="font-bold text-lg uppercase underline tracking-wider">SURAT KETERANGAN PENGHASILAN</h2>
            <p className="text-sm">Nomor: SKP/{new Date(data.tanggal).getFullYear()}/{new Date(data.tanggal).getMonth()+1}/001</p>
        </div>

        <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini:
        </p>

        {/* DATA HRD / PERUSAHAAN */}
        <div className="mb-4 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
            <div className="flex mb-1"><div className="w-40">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.p1Jabatan}</div></div>
            <div className="flex mb-1"><div className="w-40">Perusahaan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p1Perusahaan}</div></div>
        </div>

        <p className="mb-4 text-justify">
            Menerangkan dengan sesungguhnya bahwa:
        </p>

        {/* DATA KARYAWAN */}
        <div className="mb-6 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
            <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
            <div className="flex mb-1"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2TTL}</div></div>
            <div className="flex mb-1"><div className="w-40">Jabatan / Pekerjaan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p2Pekerjaan}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Alamat}</div></div>
        </div>

        <p className="mb-4 text-justify">
            Adalah benar karyawan aktif di perusahaan kami, dan memiliki rincian penghasilan per bulan (saat surat ini diterbitkan) sebagai berikut:
        </p>

        {/* RINCIAN GAJI */}
        <div className="mb-6 break-inside-avoid">
            <table className="w-full border-collapse">
                <tbody>
                    {/* PENERIMAAN */}
                    <tr className="border-t border-b border-slate-300 bg-slate-50"><td colSpan={3} className="py-2 px-2 font-bold uppercase text-slate-800">A. PENERIMAAN</td></tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">Gaji Pokok</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono">{formatCurrency(data.gajiPokok)}</td>
                    </tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">Tunjangan Jabatan</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono">{formatCurrency(data.tunjanganJabatan)}</td>
                    </tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">Tunjangan Transportasi</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono">{formatCurrency(data.tunjanganTransport)}</td>
                    </tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">Tunjangan Makan</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono">{formatCurrency(data.tunjanganMakan)}</td>
                    </tr>
                    <tr className="border-t border-slate-300 border-dashed">
                        <td className="py-2 px-2 w-1/2 font-bold italic">Total Penerimaan Kotor</td>
                        <td className="py-2 px-2 w-8 text-right font-bold italic">:</td>
                        <td className="py-2 px-2 text-right font-bold font-mono">{formatCurrency(totalPenerimaan)}</td>
                    </tr>

                    {/* POTONGAN */}
                    <tr className="border-t border-b border-slate-300 bg-slate-50"><td colSpan={3} className="py-2 px-2 font-bold uppercase text-slate-800">B. POTONGAN</td></tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">BPJS Kesehatan</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono text-rose-600">({formatCurrency(data.bpjsKesehatan)})</td>
                    </tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">BPJS Ketenagakerjaan</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono text-rose-600">({formatCurrency(data.bpjsTK)})</td>
                    </tr>
                    <tr>
                        <td className="py-1 px-2 w-1/2">PPh 21</td>
                        <td className="py-1 px-2 w-8 text-right">:</td>
                        <td className="py-1 px-2 text-right font-mono text-rose-600">({formatCurrency(data.pph21)})</td>
                    </tr>
                    {data.potonganLain > 0 && (
                        <tr>
                            <td className="py-1 px-2 w-1/2">Potongan Lain-lain</td>
                            <td className="py-1 px-2 w-8 text-right">:</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-600">({formatCurrency(data.potonganLain)})</td>
                        </tr>
                    )}
                    <tr className="border-t border-slate-300 border-dashed">
                        <td className="py-2 px-2 w-1/2 font-bold italic text-rose-700">Total Potongan</td>
                        <td className="py-2 px-2 w-8 text-right font-bold italic text-rose-700">:</td>
                        <td className="py-2 px-2 text-right font-bold font-mono text-rose-700">({formatCurrency(totalPotongan)})</td>
                    </tr>

                    {/* TAKE HOME PAY */}
                    <tr className="border-y-2 border-slate-800 bg-emerald-50"><td colSpan={3} className="py-3 px-2"></td></tr>
                    <tr className="border-b-4 border-slate-800 bg-emerald-50">
                        <td className="py-4 px-2 w-1/2 font-black text-emerald-900 uppercase text-lg">PENGHASILAN BERSIH (Take Home Pay)</td>
                        <td className="py-4 px-2 w-8 text-right font-black text-emerald-900 text-lg">:</td>
                        <td className="py-4 px-2 text-right font-black font-mono text-emerald-900 text-lg">{formatCurrency(takeHomePay)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p className="mb-8 text-justify">
            Penghasilan tersebut dibayarkan setiap bulannya melalui <strong>{data.metodePembayaran}</strong>. Demikian Surat Keterangan Penghasilan ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya (seperti persyaratan KPR, Kredit Kendaraan, atau keperluan administrasi lainnya).
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid pt-4">
            <div className="w-64">
                <p className="mb-2">{data.kota}, {formatDateSafe(data.tanggal)}</p>
                <p className="font-bold mb-2">{data.p1Perusahaan}</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
                <p className="text-sm">{data.p1Jabatan}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Penghasilan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Editor Slip Gaji</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. HRD / PT</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Karyawan</button>
                <button onClick={() => setActiveTab('penghasilan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penghasilan' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Nominal Gaji</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-emerald-600"/> Data Perusahaan & Penanda Tangan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop)</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.p1Perusahaan} onChange={e => handleDataChange('p1Perusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Alamat} onChange={e => handleDataChange('p1Alamat', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat Penanda Tangan (HRD/Direktur)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Jabatan} onChange={e => handleDataChange('p1Jabatan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.kota} onChange={e => handleDataChange('kota', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Terbit</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggal} onChange={e => handleDataChange('tanggal', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Karyawan (Penerima)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP/Karyawan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan / Posisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Pekerjaan} onChange={e => handleDataChange('p2Pekerjaan', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tgl Lahir</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2TTL} onChange={e => handleDataChange('p2TTL', e.target.value)} placeholder="Misal: Jakarta, 15 Agustus 1990" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Alamat} onChange={e => handleDataChange('p2Alamat', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penghasilan' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Wallet size={14} className="text-amber-600"/> Rincian Penerimaan (Pendapatan)
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gaji Pokok (Rp)</label>
                              <input type="number" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold text-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.gajiPokok} onChange={e => handleDataChange('gajiPokok', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tunjangan Jabatan (Rp)</label>
                              <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tunjanganJabatan} onChange={e => handleDataChange('tunjanganJabatan', Number(e.target.value))} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tunj. Transport (Rp)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tunjanganTransport} onChange={e => handleDataChange('tunjanganTransport', Number(e.target.value))} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tunj. Makan (Rp)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tunjanganMakan} onChange={e => handleDataChange('tunjanganMakan', Number(e.target.value))} />
                              </div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Calculator size={14} className="text-rose-600"/> Rincian Potongan
                      </h3>
                      <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">BPJS Kesehatan (Rp)</label>
                                  <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.bpjsKesehatan} onChange={e => handleDataChange('bpjsKesehatan', Number(e.target.value))} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">BPJS TK (Rp)</label>
                                  <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.bpjsTK} onChange={e => handleDataChange('bpjsTK', Number(e.target.value))} />
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PPh 21 (Rp)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.pph21} onChange={e => handleDataChange('pph21', Number(e.target.value))} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Potongan Lain (Rp)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.potonganLain} onChange={e => handleDataChange('potonganLain', Number(e.target.value))} />
                              </div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Wallet size={14} className="text-emerald-600"/> Penyaluran
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran / Transfer Ke</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.metodePembayaran} onChange={e => handleDataChange('metodePembayaran', e.target.value)} placeholder="Contoh: Transfer Bank Mandiri" />
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
              <PrintWrapper documentName="Keterangan_Penghasilan" price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
