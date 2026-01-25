'use client';

/**
 * FILE: HilangKirimPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Kehilangan Paket / Barang
 * FEATURES:
 * - Dual Template (Logistics Formal vs Incident Report)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, PackageX, Building2, UserCircle2, 
  LayoutTemplate, ChevronDown, Check, AlertTriangle, FileSearch, Edit3, Eye, FileWarning, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface LostData {
  city: string;
  date: string;
  docNo: string;
  
  // Data Ekspedisi & Barang
  courierName: string;
  awbNumber: string;
  itemName: string;
  itemValue: string;
  sendDate: string;
  
  // Data Pelapor
  declarantName: string;
  declarantNik: string;
  declarantPhone: string;
  declarantAddress: string;
  
  // Kronologi & Saksi
  chronology: string;
  witnessName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LostData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: 'SK-HILANG/BWC/I/2026',
  
  courierName: 'JNE Express / PT. Jalur Nugraha Ekakurir',
  awbNumber: '882100992233445',
  itemName: '1 Unit Handphone Samsung Galaxy S24 Ultra',
  itemValue: 'Rp 18.500.000,-',
  sendDate: '', // Diisi useEffect
  
  declarantName: 'BAGUS RAMADHAN',
  declarantNik: '5171010101990001',
  declarantPhone: '0812-3456-7890',
  declarantAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  chronology: 'Berdasarkan data tracking resmi, paket seharusnya tiba pada tanggal 30 Desember 2025. Namun, hingga saat surat ini dibuat, paket belum diterima. Pihak ekspedisi telah mengonfirmasi bahwa status paket dinyatakan hilang (Lost in Transit) di pusat sortir Bekasi.',
  
  witnessName: 'I MADE WIRA (Petugas Logistik)'
};

// --- 3. KOMPONEN UTAMA ---
export default function HilangKirimPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kehilangan...</div>}>
      <LostPackageBuilder />
    </Suspense>
  );
}

function LostPackageBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LostData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 10);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        sendDate: lastWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof LostData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 10);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            sendDate: lastWeek.toISOString().split('T')[0] 
        });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Resmi Logistik (Serif)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Berita Acara (Sans)
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const LostContent = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: RESMI LOGISTIK ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-justify text-black">
          {/* JUDUL */}
          <div className="text-center mb-6 shrink-0">
            <h1 className="text-lg font-black underline uppercase decoration-2 underline-offset-4">SURAT PERNYATAAN KEHILANGAN</h1>
            <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
          </div>

          <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-6 mb-4 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-200 pl-4">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.declarantName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.declarantNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.declarantPhone}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.declarantAddress}</span></div>
          </div>

          <p className="mb-4">Dengan ini menyatakan dengan sesungguhnya bahwa saya telah mengalami kehilangan/kendala pengiriman barang melalui <b>{data.courierName}</b> dengan detail:</p>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-[10.5pt] mb-4 space-y-1">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold text-red-600 tracking-wider">{data.awbNumber}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Isi Paket</span><span>:</span><span>{data.itemName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Tgl Kirim</span><span>:</span><span>{isClient && data.sendDate ? new Date(data.sendDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] text-blue-700"><span>Estimasi Nilai</span><span>:</span><span className="font-black">{data.itemValue}</span></div>
          </div>

          <div className="mb-6">
              <p className="font-bold underline mb-1 text-sm">Kronologi Kejadian:</p>
              <p className="text-slate-700 italic text-[10.5pt] bg-white p-3 border border-dashed rounded leading-snug">"{data.chronology}"</p>
          </div>

          <p className="mb-8">
            Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagai syarat pengajuan klaim asuransi atau proses investigasi lebih lanjut.
          </p>

          {/* TANDA TANGAN */}
          <div className="mt-auto pt-4 border-t border-slate-100 break-inside-avoid">
            <table className="w-full table-fixed">
              <tbody>
                <tr>
                  <td className="w-1/2"></td>
                  <td className="text-center font-bold text-[10.5pt] pb-6">
                    {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
                  </td>
                </tr>
                <tr className="text-[9pt] font-black text-slate-400 uppercase tracking-widest text-center">
                  <td className="pb-4">Mengetahui (Saksi),</td>
                  <td className="pb-4">Pembuat Pernyataan,</td>
                </tr>
                <tr>
                  <td className="text-center align-bottom h-24">
                    <p className="font-bold underline uppercase">({data.witnessName})</p>
                  </td>
                  <td className="text-center align-bottom h-24">
                      <div className="border border-slate-300 w-20 h-10 flex items-center justify-center text-[7pt] text-slate-400 italic mb-2 mx-auto bg-white">MATERAI</div>
                      <p className="font-bold underline uppercase text-[11pt]">{data.declarantName}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: BERITA ACARA ---
      return (
        <div className="font-sans text-[10pt] leading-snug text-slate-800 h-full flex flex-col">
            <div className="flex justify-between items-center border-b-4 border-red-600 pb-4 mb-8">
               <div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Berita Acara Kehilangan</h1>
                  <p className="text-red-600 font-bold tracking-wide">LOGISTIK & PENGIRIMAN</p>
               </div>
               <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-bold">Nomor Dokumen</p>
                  <p className="font-mono font-bold">{data.docNo}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-slate-50 rounded border border-slate-200 break-inside-avoid">
                   <h3 className="font-black text-xs uppercase text-slate-400 mb-3 border-b pb-1">Identitas Pelapor</h3>
                   <div className="space-y-1 text-sm">
                      <p className="font-bold uppercase">{data.declarantName}</p>
                      <p className="font-mono text-xs">{data.declarantNik}</p>
                      <p>{data.declarantPhone}</p>
                      <p className="text-xs text-slate-500 mt-1">{data.declarantAddress}</p>
                   </div>
                </div>
                <div className="p-4 bg-red-50 rounded border border-red-100 break-inside-avoid">
                   <h3 className="font-black text-xs uppercase text-red-400 mb-3 border-b border-red-200 pb-1">Objek Hilang</h3>
                   <div className="space-y-1 text-sm">
                      <p className="font-bold">{data.itemName}</p>
                      <p className="font-mono text-red-600 font-bold">{data.awbNumber}</p>
                      <p className="text-xs text-slate-500">{data.courierName}</p>
                      <p className="font-bold mt-1">{data.itemValue}</p>
                   </div>
                </div>
            </div>

            <div className="mb-6">
               <h3 className="font-bold uppercase text-xs text-slate-500 mb-2">Kronologi / Keterangan</h3>
               <p className="text-justify bg-white p-4 border rounded text-sm leading-relaxed">
                 {data.chronology}
               </p>
            </div>

            <p className="text-sm text-justify mb-8">
               Demikian Berita Acara ini dibuat dengan sesungguhnya berdasarkan fakta yang ada, untuk digunakan sebagai kelengkapan administrasi klaim atau pelaporan.
            </p>

            <div className="mt-auto border-t-2 border-slate-900 pt-6 flex justify-between items-end break-inside-avoid">
               <div className="text-center w-48">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-20">Saksi / Petugas</p>
                  <p className="font-bold border-b border-slate-400 pb-1">{data.witnessName}</p>
               </div>
               <div className="text-center w-48">
                  <p className="text-xs mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-4">Yang Menyatakan</p>
                  <div className="h-16 w-24 border border-dashed border-slate-300 mx-auto mb-2 flex items-center justify-center text-[9px] text-slate-300">TANDA TANGAN</div>
                  <p className="font-bold border-b border-slate-900 pb-1">{data.declarantName}</p>
               </div>
            </div>
        </div>
      );
    }
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
          .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .print-table thead { height: 25mm; display: table-header-group; } 
          .print-table tfoot { height: 25mm; display: table-footer-group; } 
          .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
          tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <FileWarning size={16} /> <span>LOST PACKAGE EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{templateId === 1 ? 'Resmi Logistik' : 'Berita Acara'}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-1"><FileSearch size={14}/><h3 className="text-xs font-bold uppercase">Info Pengiriman</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs text-red-600 font-bold" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi" />
              <input className="w-full p-2 border rounded text-xs" value={data.itemName} onChange={e => handleDataChange('itemName', e.target.value)} placeholder="Nama Barang" />
              <input type="date" className="w-full p-2 border rounded text-xs" value={data.sendDate} onChange={e => handleDataChange('sendDate', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-1"><UserCircle2 size={14}/><h3 className="text-xs font-bold uppercase">Data Pembuat</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.declarantName} onChange={e => handleDataChange('declarantName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.declarantNik} onChange={e => handleDataChange('declarantNik', e.target.value)} placeholder="NIK" />
              <input className="w-full p-2 border rounded text-xs" value={data.declarantPhone} onChange={e => handleDataChange('declarantPhone', e.target.value)} placeholder="No. HP" />
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.declarantAddress} onChange={e => handleDataChange('declarantAddress', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-1"><AlertTriangle size={14}/><h3 className="text-xs font-bold uppercase">Kronologi & Nilai</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-28 resize-none leading-relaxed font-serif" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Tulis kronologi kehilangan..." />
              <input className="w-full p-2 border rounded text-xs font-black text-blue-700 bg-blue-50" value={data.itemValue} onChange={e => handleDataChange('itemValue', e.target.value)} placeholder="Nilai Barang" />
              <input className="w-full p-2 border rounded text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} placeholder="Nama Saksi/Petugas" />
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <LostContent />
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <LostContent />
         </div>
      </div>

    </div>
  );
}
