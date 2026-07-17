import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\penawaran\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: PenawaranPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Penawaran Barang / Jasa (Quotation) B2B
 */

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, Briefcase, 
  FileText, Calendar, Plus, Trash2, Tag, Percent
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface QuoteItem {
  id: number;
  name: string;
  description: string;
  qty: number;
  price: number;
}

interface QuoteData {
  no: string;
  date: string;
  validUntil: string;
  subject: string;
  
  senderName: string;
  senderInfo: string;
  
  receiverName: string;
  receiverTitle: string;
  receiverCompany: string;
  receiverAddress: string;
  
  executiveSummary: string;
  items: QuoteItem[];
  taxRate: number; // Persentase PPN
  discount: number; // Nominal Diskon
  terms: string;
  acceptanceProcedure: string;
  
  city: string;
  signer: string;
  signerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: QuoteData = {
  no: `B2B-QUO/${new Date().getFullYear()}/001`,
  date: '2026-08-01', 
  validUntil: '2026-08-31', 
  subject: 'Proposal Pengadaan & Implementasi Sistem Enterprise',
  
  senderName: 'PT. TEKNOLOGI ENTERPRISE NUSANTARA',
  senderInfo: 'Enterprise Tower, Lt. 15, SCBD Jakarta\\nEmail: enterprise@teknologi.com | Telp: (021) 888-9999',
  
  receiverName: 'BAPAK DIREKTUR UTAMA',
  receiverTitle: 'Chief Executive Officer',
  receiverCompany: 'PT. KORPORAT BESAR INDONESIA',
  receiverAddress: 'Gedung Korporat Lt. 8, Jl. Sudirman Kav. 50, Jakarta Selatan',
  
  executiveSummary: 'Merujuk pada diskusi sebelumnya, kami mengajukan proposal solusi komprehensif yang dirancang khusus untuk meningkatkan efisiensi operasional dan skalabilitas sistem di perusahaan Bapak/Ibu. Solusi ini mencakup pengadaan perangkat keras kelas enterprise, lisensi perangkat lunak, serta layanan implementasi profesional.',
  
  items: [
    { id: 1, name: 'Enterprise Server Node', description: 'Dual Intel Xeon Gold, 256GB RAM, 4TB NVMe SSD', qty: 3, price: 150000000 },
    { id: 2, name: 'Professional Services', description: 'Instalasi, Konfigurasi, dan Migrasi Data (Lumpsum)', qty: 1, price: 75000000 },
    { id: 3, name: 'Annual Maintenance Support', description: '24/7 SLA 4 Hours On-Site Support (1 Tahun)', qty: 1, price: 50000000 },
  ],
  
  taxRate: 11,
  discount: 0,
  terms: '1. Termin Pembayaran: 40% Down Payment, 40% User Acceptance Test (UAT), 20% Go-Live.\\n2. Waktu Pekerjaan: 45 Hari Kerja terhitung sejak PO diterbitkan.\\n3. Harga sudah termasuk biaya pengiriman dan asuransi (Franco Jakarta).\\n4. Segala pajak yang timbul akibat transaksi ini menjadi tanggung jawab masing-masing pihak sesuai ketentuan yang berlaku.',
  acceptanceProcedure: 'Untuk menyetujui penawaran ini, mohon tandatangani dokumen ini pada kolom yang telah disediakan dan kirimkan kembali beserta Purchase Order (PO) resmi.',
  
  city: 'JAKARTA',
  signer: 'HENDRA WIJAYA, M.T.',
  signerJob: 'Enterprise Account Director'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PenawaranPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor B2B Quotation...</div>}>
      <PenawaranBuilder />
    </Suspense>
  );
}

function PenawaranBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'klien' | 'item' | 'syarat'>('info');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const valid = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, validUntil: valid }));
  }, []);

  const handleChange = (field: keyof QuoteData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, val: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: val };
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newItem: QuoteItem = { id: Date.now(), name: '', description: '', qty: 1, price: 0 };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset penawaran ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const valid = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, validUntil: valid });
    }
  };

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  // Kalkulasi
  const subTotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountVal = data.discount;
  const dpp = subTotal - discountVal;
  const taxVal = (dpp * data.taxRate) / 100;
  const grandTotal = dpp + taxVal;

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* HEADER / KOP */}
        <div className="flex justify-between items-center border-b-[3px] border-double border-slate-900 pb-4 mb-8 break-inside-avoid">
            <div className="flex-1">
                <h1 className="font-black uppercase text-2xl tracking-widest text-slate-900">{data.senderName}</h1>
                <p className="text-[9pt] mt-1 whitespace-pre-line font-sans">{data.senderInfo}</p>
            </div>
            <div className="text-right ml-4 shrink-0">
                <h2 className="font-black uppercase text-3xl tracking-widest text-slate-300 print:text-slate-400">QUOTATION</h2>
                <p className="font-mono text-sm mt-1">{data.no}</p>
            </div>
        </div>

        {/* METADATA & TUJUAN */}
        <div className="flex justify-between mb-8 text-[10pt] break-inside-avoid">
            <div className="w-1/2 pr-4">
                <p className="text-slate-500 font-bold mb-1 uppercase tracking-wider text-[8pt]">Ditujukan Kepada:</p>
                <p className="font-bold uppercase text-lg">{data.receiverCompany}</p>
                <p className="font-bold underline">U.P: {data.receiverTitle} - {data.receiverName}</p>
                <p className="mt-1 leading-snug">{data.receiverAddress}</p>
            </div>
            <div className="w-1/2 pl-4 border-l border-slate-300">
                <table className="w-full">
                    <tbody>
                        <tr><td className="w-24 text-slate-500 pb-1">Tanggal Surat</td><td className="w-4 pb-1">:</td><td className="pb-1 font-bold">{formatDateSafe(data.date)}</td></tr>
                        <tr><td className="w-24 text-slate-500 pb-1">Berlaku S.D</td><td className="w-4 pb-1">:</td><td className="pb-1 font-bold text-rose-700 print:text-black">{formatDateSafe(data.validUntil)}</td></tr>
                        <tr><td className="w-24 text-slate-500 align-top">Perihal</td><td className="w-4 align-top">:</td><td className="font-bold uppercase align-top">{data.subject}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* PEMBUKA */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p>Dengan hormat,</p>
            <p className="mt-2">{data.executiveSummary}</p>
            <p className="mt-2 font-bold">Berikut adalah rincian penawaran harga yang kami ajukan:</p>
        </div>

        {/* TABEL ITEM */}
        <div className="mb-6 break-inside-avoid">
            <table className="w-full border-collapse border border-slate-900 text-[9pt]">
                <thead>
                    <tr className="bg-slate-100 print:bg-slate-200 uppercase font-bold tracking-wider">
                        <th className="border border-slate-900 py-2 px-3 text-center w-12">No</th>
                        <th className="border border-slate-900 py-2 px-3 text-left">Deskripsi Barang / Jasa</th>
                        <th className="border border-slate-900 py-2 px-3 text-center w-16">Qty</th>
                        <th className="border border-slate-900 py-2 px-3 text-right w-32">Harga Satuan</th>
                        <th className="border border-slate-900 py-2 px-3 text-right w-36">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, idx) => (
                        <tr key={item.id}>
                            <td className="border border-slate-900 py-2 px-3 text-center align-top">{idx + 1}</td>
                            <td className="border border-slate-900 py-2 px-3 align-top">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-[8pt] text-slate-600 print:text-black mt-1 leading-tight">{item.description}</div>
                            </td>
                            <td className="border border-slate-900 py-2 px-3 text-center align-top">{item.qty}</td>
                            <td className="border border-slate-900 py-2 px-3 text-right align-top font-mono">{formatRupiah(item.price)}</td>
                            <td className="border border-slate-900 py-2 px-3 text-right align-top font-mono font-bold">{formatRupiah(item.qty * item.price)}</td>
                        </tr>
                    ))}
                    
                    {/* KALKULASI */}
                    <tr>
                        <td colSpan={4} className="border border-slate-900 py-2 px-3 text-right font-bold bg-slate-50">SUBTOTAL</td>
                        <td className="border border-slate-900 py-2 px-3 text-right font-mono font-bold bg-slate-50">{formatRupiah(subTotal)}</td>
                    </tr>
                    {data.discount > 0 && (
                        <tr>
                            <td colSpan={4} className="border border-slate-900 py-2 px-3 text-right font-bold text-rose-700 print:text-black">DISCOUNT (POTONGAN)</td>
                            <td className="border border-slate-900 py-2 px-3 text-right font-mono font-bold text-rose-700 print:text-black">- {formatRupiah(data.discount)}</td>
                        </tr>
                    )}
                    {data.taxRate > 0 && (
                        <tr>
                            <td colSpan={4} className="border border-slate-900 py-2 px-3 text-right font-bold">PAJAK (PPN {data.taxRate}%)</td>
                            <td className="border border-slate-900 py-2 px-3 text-right font-mono font-bold">{formatRupiah(taxVal)}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={4} className="border border-slate-900 py-3 px-3 text-right font-black uppercase text-lg bg-slate-800 text-white print:bg-slate-200 print:text-black">GRAND TOTAL</td>
                        <td className="border border-slate-900 py-3 px-3 text-right font-mono font-black text-lg bg-slate-800 text-white print:bg-slate-200 print:text-black">{formatRupiah(grandTotal)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* SYARAT DAN KETENTUAN */}
        <div className="mb-8 break-inside-avoid">
            <h4 className="font-bold uppercase border-b-2 border-slate-900 inline-block mb-2">Syarat & Ketentuan (Terms & Conditions)</h4>
            <div className="text-justify whitespace-pre-line text-[9pt] leading-relaxed">
                {data.terms}
            </div>
            <p className="mt-3 text-[9pt] italic">{data.acceptanceProcedure}</p>
        </div>

        {/* TANDA TANGAN (SIDE BY SIDE) */}
        <div className="flex justify-between text-center break-inside-avoid mt-12 px-4">
            <div className="w-64">
                <p className="mb-1 text-slate-500 text-[8pt] uppercase">Disetujui & Diterima Oleh Klien:</p>
                <p className="font-bold uppercase h-10">{data.receiverCompany}</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.receiverName}</p>
                <p className="text-sm">{data.receiverTitle}</p>
                <p className="text-[8pt] text-slate-400 mt-1">Tanggal: .......................................</p>
            </div>
            
            <div className="w-64">
                <p className="mb-1 text-slate-500 text-[8pt] uppercase">Diajukan & Ditandatangani Oleh:</p>
                <p className="font-bold uppercase h-10">{data.senderName}</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.signer}</p>
                <p className="text-sm">{data.signerJob}</p>
                <p className="text-[8pt] font-bold mt-1">{data.city}, {formatDateSafe(data.date)}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Quotation / Penawaran</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[500px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Form Penawaran</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pengirim</button>
                <button onClick={() => setActiveTab('klien')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klien' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Tujuan</button>
                <button onClick={() => setActiveTab('item')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'item' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Daftar Item</button>
                <button onClick={() => setActiveTab('syarat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'syarat' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Syarat/Ketentuan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Identitas Pengirim & Surat
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Pengirim</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.senderName} onChange={e => handleChange('senderName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat & Kontak Pengirim (Gunakan Enter)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.senderInfo} onChange={e => handleChange('senderInfo', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Penawaran (Quotation No)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.no} onChange={e => handleChange('no', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota & Tanggal Terbit</label>
                                <div className="flex gap-2">
                                    <input className="w-1/3 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} placeholder="Kota" />
                                    <input type="date" className="w-2/3 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Perihal / Judul Proposal</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.subject} onChange={e => handleChange('subject', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'klien' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-blue-600"/> Data Tujuan Klien
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Tujuan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverCompany} onChange={e => handleChange('receiverCompany', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">U.P (Nama Penerima)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.receiverName} onChange={e => handleChange('receiverName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penerima</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverTitle} onChange={e => handleChange('receiverTitle', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Perusahaan Tujuan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverAddress} onChange={e => handleChange('receiverAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'item' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6 border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                            <Tag size={14} className="text-emerald-600"/> Rincian Penawaran
                        </h3>
                        <button onClick={addItem} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1"><Plus size={14}/> Tambah Item</button>
                    </div>

                    <div className="space-y-4 mt-4">
                        {data.items.map((item, index) => (
                            <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all relative">
                                <button onClick={() => removeItem(index)} className="absolute top-2 right-2 p-1.5 text-rose-400 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                                <div className="space-y-2 pr-8">
                                    <input 
                                        className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500" 
                                        placeholder="Nama Barang / Jasa" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)}
                                    />
                                    <input 
                                        className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-500 text-slate-600" 
                                        placeholder="Spesifikasi teknis / Deskripsi detail" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <div className="w-1/4">
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Qty</label>
                                            <input type="number" min="1" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm text-center outline-none focus:border-emerald-500" value={item.qty} onChange={e => handleItemChange(index, 'qty', Number(e.target.value))} />
                                        </div>
                                        <div className="w-3/4">
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Harga Satuan (Rp)</label>
                                            <input type="number" min="0" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm font-mono outline-none focus:border-emerald-500" value={item.price} onChange={e => handleItemChange(index, 'price', Number(e.target.value))} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 my-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Potongan / Diskon (Rp)</label>
                                <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.discount} onChange={e => handleChange('discount', Number(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pajak / PPN (%)</label>
                                <input type="number" step="0.1" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.taxRate} onChange={e => handleChange('taxRate', Number(e.target.value))} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'syarat' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-amber-600"/> Terms & Conditions (T&C)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Berlaku Sampai Dengan</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-bold text-rose-600" value={data.validUntil} onChange={e => handleChange('validUntil', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ringkasan Eksekutif (Pembuka Surat)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-justify" value={data.executiveSummary} onChange={e => handleChange('executiveSummary', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Syarat & Ketentuan Pembayaran / Proyek</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.terms} onChange={e => handleChange('terms', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanda Tangan Pengirim (Nama)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.signer} onChange={e => handleChange('signer', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pengirim</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.signerJob} onChange={e => handleChange('signerJob', e.target.value)} />
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
              <PrintWrapper documentName={`Quotation_${data.receiverCompany.replace(/\\s+/g, '_')}`} price={85000} />
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
