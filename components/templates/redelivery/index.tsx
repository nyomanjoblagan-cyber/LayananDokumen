'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: RedeliveryTemplate.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Permintaan Pengiriman Ulang (Redelivery Request)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Ship, Anchor, MapPin, FileText, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// --- 1. TYPE DEFINITIONS ---
interface RedeliveryData {
  nomorSurat: string;
  tanggal: string;
  
  // Shipping Line
  shippingLine: string;
  alamatShipping: string;
  
  // Shipment Details
  vessel: string;
  blNumber: string;
  portOfLoading: string;
  portOfDischarge: string;
  eta: string;
  containerType: string;
  
  // Container List
  containers: string;
  cargoDescription: string;
  
  // Old & New Details
  oldConsignee: string;
  oldDestination: string;
  newConsignee: string;
  newDestination: string;
  
  // Reason
  alasan: string;
  
  // Signatures
  namaPemohon: string;
  jabatanPemohon: string;
  perusahaanPemohon: string;
  
  // Indemnity
  indemnityClause: boolean;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RedeliveryData = {
  nomorSurat: 'RDL/2026/08-001',
  tanggal: '2026-07-13',
  
  shippingLine: 'PT. SAMUDERA GLOBAL LOGISTICS',
  alamatShipping: 'Graha Samudera Lt. 5, Jl. Yos Sudarso No. 12, Tanjung Priok, Jakarta Utara',
  
  vessel: 'MSC ORION / VOY. 045E',
  blNumber: 'SGL-JKT-9988776',
  portOfLoading: 'Singapore (SGSIN)',
  portOfDischarge: 'Jakarta (IDJKT)',
  eta: '2026-07-10',
  containerType: '2x40HC, 1x20DC',
  
  containers: 'MSCU1234567, MSCU7654321, MSCU1122334',
  cargoDescription: 'Electronic Spare Parts & Accessories',
  
  oldConsignee: 'PT. LAMA SEJAHTERA',
  oldDestination: 'Gudang Cikarang Dry Port Blok A1',
  newConsignee: 'PT. BARU SUKSES MAKMUR',
  newDestination: 'Kawasan Industri MM2100 Blok H-5, Cibitung',
  
  alasan: 'Perubahan lokasi gudang penerima akhir atas instruksi dari Shipper (Pihak Pengirim) sesuai dengan dokumen/email terlampir.',
  
  namaPemohon: 'Ahmad Yani',
  jabatanPemohon: 'Logistics Manager',
  perusahaanPemohon: 'PT. IMPORTIR MAJU INDONESIA',
  
  indemnityClause: true
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function RedeliveryTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Redelivery...</div>}>
      <RedeliveryBuilder />
    </Suspense>
  );
}

function RedeliveryBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'surat' | 'shipment' | 'perubahan' | 'ttd'>('surat');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<RedeliveryData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RedeliveryData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat permohonan ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT (Disediakan oleh user / Perusahaan Pemohon) */}
      <div className="text-center mb-6 border-b-2 border-slate-900 pb-4">
        <h1 className="font-bold text-2xl uppercase tracking-wider text-slate-900">{data.perusahaanPemohon}</h1>
      </div>

      {/* HEADER SURAT */}
      <div className="flex justify-between items-start mb-6 break-inside-avoid">
        <div>
          <p>Nomor : {data.nomorSurat}</p>
          <p>Tanggal : {formatDateDisplay(data.tanggal)}</p>
        </div>
        <div className="text-right">
          <p>Kepada Yth,</p>
          <p className="font-bold uppercase">{data.shippingLine}</p>
          <p className="whitespace-pre-line">{data.alamatShipping}</p>
        </div>
      </div>

      <div className="mb-4 text-center">
        <h2 className="font-bold text-lg underline uppercase">PERMOHONAN REDELIVERY / PERUBAHAN TUJUAN</h2>
      </div>

      <div className="mb-4 text-justify">
        <p>Dengan hormat,</p>
        <p>Sehubungan dengan kedatangan kapal dan peti kemas di bawah pengawasan perusahaan pelayaran Bapak/Ibu, kami selaku pihak terkait memohon bantuan untuk melakukan perubahan rute/tujuan akhir (Redelivery) dengan rincian data sebagai berikut:</p>
      </div>

      {/* DATA SHIPMENT */}
      <div className="mb-4">
        <h3 className="font-bold uppercase text-xs mb-1">A. Data Pengiriman (Shipment Details)</h3>
        <div className="ml-4 border border-slate-400 p-2 text-sm bg-slate-50 print:bg-transparent print:border-black">
            <div className="flex"><div className="w-48 font-bold">Vessel / Voyage</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.vessel}</div></div>
            <div className="flex"><div className="w-48 font-bold">Bill of Lading (B/L) No</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.blNumber}</div></div>
            <div className="flex"><div className="w-48 font-bold">Port of Loading</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.portOfLoading}</div></div>
            <div className="flex"><div className="w-48 font-bold">Port of Discharge</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.portOfDischarge}</div></div>
            <div className="flex"><div className="w-48 font-bold">ETA</div><div className="w-4">:</div><div className="flex-1 uppercase">{formatDateDisplay(data.eta)}</div></div>
            <div className="flex"><div className="w-48 font-bold">Container Qty & Type</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.containerType}</div></div>
            <div className="flex"><div className="w-48 font-bold">Container Number(s)</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.containers}</div></div>
            <div className="flex"><div className="w-48 font-bold">Cargo Description</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.cargoDescription}</div></div>
        </div>
      </div>

      {/* PERUBAHAN TUJUAN */}
      <div className="mb-4">
        <h3 className="font-bold uppercase text-xs mb-1">B. Rincian Perubahan (Redelivery Details)</h3>
        <div className="flex ml-4 border border-slate-400 print:border-black text-sm">
            <div className="flex-1 p-2 border-r border-slate-400 print:border-black bg-rose-50 print:bg-transparent">
                <p className="font-bold text-center border-b border-slate-400 print:border-black pb-1 mb-1 uppercase">DATA LAMA (AWAL)</p>
                <div className="mb-1"><span className="font-bold">Consignee:</span><br/><span className="uppercase">{data.oldConsignee}</span></div>
                <div><span className="font-bold">Destination / Alamat:</span><br/><span className="uppercase">{data.oldDestination}</span></div>
            </div>
            <div className="flex-1 p-2 bg-emerald-50 print:bg-transparent">
                <p className="font-bold text-center border-b border-slate-400 print:border-black pb-1 mb-1 uppercase">DATA BARU (REDELIVERY)</p>
                <div className="mb-1"><span className="font-bold">Consignee:</span><br/><span className="uppercase font-bold">{data.newConsignee}</span></div>
                <div><span className="font-bold">Destination / Alamat:</span><br/><span className="uppercase font-bold">{data.newDestination}</span></div>
            </div>
        </div>
      </div>

      <div className="mb-4 text-justify">
        <p>Alasan dilakukannya perubahan/redelivery ini adalah: <strong>{data.alasan}</strong></p>
      </div>

      {/* INDEMNITY CLAUSE */}
      {data.indemnityClause && (
        <div className="mb-6 text-justify border border-slate-400 print:border-black p-3 text-sm italic">
            <strong>LETTER OF INDEMNITY (Klausul Ganti Rugi):</strong><br/>
            Dengan disetujuinya permohonan perubahan ini, kami membebaskan pihak {data.shippingLine} dari segala tuntutan hukum, klaim kerugian material maupun imaterial dari pihak manapun di kemudian hari atas perubahan tujuan penyerahan barang ini. Kami bersedia menanggung seluruh biaya tambahan yang timbul akibat proses redelivery ini.
        </div>
      )}

      <div className="mb-10 text-justify">
        <p>Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end text-center break-inside-avoid px-4">
        <div className="w-64">
            <p className="mb-2 font-bold uppercase text-sm">Hormat Kami,<br/>{data.perusahaanPemohon}</p>
            <div className="h-20 flex items-center justify-center">
                <div className="w-24 h-10 border border-dashed border-gray-400 text-[9px] text-gray-400 flex items-center justify-center">Meterai / Stempel</div>
            </div>
            <p className="font-bold underline uppercase">{data.namaPemohon}</p>
            <p className="text-xs uppercase">{data.jabatanPemohon}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Redelivery Request</h1>
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
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Ship size={18} className="text-blue-600" /> Form Redelivery</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'surat' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Surat</button>
                <button onClick={() => setActiveTab('shipment')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'shipment' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Shipment</button>
                <button onClick={() => setActiveTab('perubahan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perubahan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Redelivery</button>
                <button onClick={() => setActiveTab('ttd')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Pemohon</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'surat' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Data Surat & Penerima
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggal} onChange={e => handleChange('tanggal', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pelayaran (Shipping Line / NVOCC)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.shippingLine} onChange={e => handleChange('shippingLine', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Shipping Line</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatShipping} onChange={e => handleChange('alamatShipping', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'shipment' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Anchor size={14} className="text-blue-600"/> Detail Shipment (B/L)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vessel / Voyage</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.vessel} onChange={e => handleChange('vessel', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor B/L (Bill of Lading)</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.blNumber} onChange={e => handleChange('blNumber', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Port of Loading</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.portOfLoading} onChange={e => handleChange('portOfLoading', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Port of Discharge</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.portOfDischarge} onChange={e => handleChange('portOfDischarge', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">ETA (Estimasi Tiba)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.eta} onChange={e => handleChange('eta', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Container Qty & Type</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.containerType} onChange={e => handleChange('containerType', e.target.value)} placeholder="Contoh: 1x40HC" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Container (Gunakan Koma)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 font-mono resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.containers} onChange={e => handleChange('containers', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cargo Description (Sesuai BL)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.cargoDescription} onChange={e => handleChange('cargoDescription', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'perubahan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-amber-600"/> Detail Perubahan / Redelivery
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                            <h4 className="font-bold text-xs uppercase mb-2 text-rose-800">DATA AWAL LAMA</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Consignee Lama</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-lg text-sm uppercase focus:ring-2 focus:ring-rose-500 outline-none" value={data.oldConsignee} onChange={e => handleChange('oldConsignee', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tujuan / Alamat Lama</label>
                                    <textarea className="w-full bg-white p-2.5 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-rose-500 outline-none" value={data.oldDestination} onChange={e => handleChange('oldDestination', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                            <h4 className="font-bold text-xs uppercase mb-2 text-emerald-800">DATA BARU (REDELIVERY)</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Consignee Baru</label>
                                    <input className="w-full bg-white p-2.5 border border-emerald-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.newConsignee} onChange={e => handleChange('newConsignee', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Tujuan / Alamat Baru</label>
                                    <textarea className="w-full bg-white p-2.5 border border-emerald-200 rounded-lg text-sm font-bold h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.newDestination} onChange={e => handleChange('newDestination', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Perubahan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alasan} onChange={e => handleChange('alasan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-600"/> Pemohon & Indemnity
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Pemohon</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.perusahaanPemohon} onChange={e => handleChange('perusahaanPemohon', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penandatangan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaPemohon} onChange={e => handleChange('namaPemohon', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jabatanPemohon} onChange={e => handleChange('jabatanPemohon', e.target.value)} />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 mt-4 pt-4">
                            <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                <input 
                                    type="checkbox" 
                                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" 
                                    checked={data.indemnityClause} 
                                    onChange={e => handleChange('indemnityClause', e.target.checked)} 
                                />
                                <div>
                                    <span className="block font-bold text-sm text-slate-700">Sertakan Klausul Indemnity (Ganti Rugi)</span>
                                    <span className="block text-xs text-slate-500">Wajib disertakan untuk melindungi pelayaran dari tuntutan hukum akibat redelivery ini.</span>
                                </div>
                            </label>
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
              <PrintWrapper documentName={`Redelivery_Request_${data.blNumber}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
