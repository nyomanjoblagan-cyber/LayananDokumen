'use client';

/**
 * FILE: KlaimAsuransiPage.tsx
 * STATUS: FINAL COMPACT (FIT 1 PAGE)
 * DESC: Generator Surat Klaim Asuransi Logistik
 * FIXES: 
 * - Menghapus Table Wrapper agar hemat tempat vertikal.
 * - Menggunakan @page margin 20mm standar.
 * - Memadatkan spasi (leading-snug, text-10pt) agar muat 1 halaman.
 * - print:p-0 untuk menghindari margin ganda.
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldAlert, Building2, UserCircle2, 
  LayoutTemplate, X, ShieldCheck, ClipboardList, PackageX, Coins, AlertCircle, Edit3, Eye, Check, ChevronDown, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface ClaimData {
  city: string;
  date: string;
  docNo: string;
  insuranceName: string;
  courierName: string;
  awbNumber: string;
  claimantName: string;
  claimantPhone: string;
  claimantAddress: string;
  incidentDate: string;
  incidentType: string;
  itemDescription: string;
  claimAmount: string;
  chronology: string;
  witnessName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ClaimData = {
  city: 'JAKARTA',
  date: '', 
  docNo: 'CLAIMS/EXP-001/I/2026',
  
  insuranceName: 'PT. ASURANSI JIWA BERSAMA',
  courierName: 'JNE Express / Logistik ABC',
  awbNumber: 'AWB-123456789XYZ',
  
  claimantName: 'BUDI SETIAWAN',
  claimantPhone: '0812-3456-7890',
  claimantAddress: 'Jl. Melati No. 45, Jakarta Selatan',
  
  incidentDate: '', 
  incidentType: 'Barang Rusak Total (Total Loss)',
  itemDescription: '1 Unit Laptop MacBook Pro M3 14 Inch',
  claimAmount: 'Rp 28.500.000,-',
  chronology: 'Paket diterima dalam kondisi box penyok parah dan basah. Setelah dibuka, layar laptop pecah dan perangkat tidak dapat menyala (mati total). Sudah dikonfirmasi oleh kurir saat serah terima.',
  
  witnessName: 'ANDRI (Kurir/Staff Cargo)'
};

export default function KlaimAsuransiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Klaim Asuransi...</div>}>
      <InsuranceClaimBuilder />
    </Suspense>
  );
}

function InsuranceClaimBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ClaimData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const incident = new Date();
    incident.setDate(today.getDate() - 3);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        incidentDate: incident.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof ClaimData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const incident = new Date();
        incident.setDate(today.getDate() - 3);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            incidentDate: incident.toISOString().split('T')[0] 
        });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Standar Logistik
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Umum
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Logistik' : 'Format Umum';

  // --- KOMPONEN ISI SURAT ---
  const ClaimContent = () => (
    // FIX: print:p-0 agar tidak ada padding ganda dengan @page margin
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-snug text-[10pt] w-[210mm] min-h-[296mm] p-[20mm] print:p-0 print:w-full print:min-h-0 print:shadow-none shadow-2xl mx-auto">
      
      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-lg font-black underline uppercase decoration-2 underline-offset-4">SURAT PERNYATAAN KLAIM ASURANSI</h1>
        <p className="text-[9pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500 print:text-black">Logistik & Pengiriman Barang</p>
        <p className="text-[9pt] font-sans font-bold mt-1">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow">
        <div className="mb-4">
           <p>Kepada Yth,</p>
           <p><b>Bagian Klaim {data.insuranceName}</b></p>
           <p>Di Tempat</p>
        </div>
        
        <p className="mb-3">Dengan hormat,</p>
        <p className="mb-3 text-justify">Saya yang bertanda tangan di bawah ini mengajukan permohonan klaim atas kerusakan/kehilangan barang pengiriman dengan rincian data sebagai berikut:</p>
        
        {/* DATA PEMOHON */}
        <div className="ml-4 mb-4 space-y-1 font-sans text-[10pt] border-l-4 border-red-200 pl-4 italic">
            <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Pemohon</span><span>:</span><span className="font-bold uppercase">{data.claimantName}</span></div>
            <div className="grid grid-cols-[130px_10px_1fr]"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[130px_10px_1fr]"><span>Ekspedisi</span><span>:</span><span>{data.courierName}</span></div>
            <div className="grid grid-cols-[130px_10px_1fr]"><span>Tgl Kejadian</span><span>:</span><span>{isClient && data.incidentDate ? new Date(data.incidentDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
        </div>

        {/* DETAIL OBJEK */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-[10pt] mb-4 print:bg-transparent print:border-black">
            <p className="font-black text-red-600 uppercase text-[9pt] mb-2 tracking-widest print:text-black border-b border-slate-300 pb-1 print:border-black">Detail Objek Klaim</p>
            <div className="space-y-1">
               <div className="grid grid-cols-[130px_10px_1fr]"><span>Jenis Kerugian</span><span>:</span><span className="font-bold">{data.incidentType}</span></div>
               <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Barang</span><span>:</span><span>{data.itemDescription}</span></div>
               <div className="grid grid-cols-[130px_10px_1fr] text-blue-700 print:text-black"><span>Nilai Klaim</span><span>:</span><span className="font-black text-[11pt]">{data.claimAmount}</span></div>
            </div>
        </div>

        <div className="mb-4">
            <p className="font-bold underline mb-1 text-[10pt]">Kronologi Kejadian:</p>
            <p className="text-slate-800 bg-white p-1 italic leading-relaxed text-justify">"{data.chronology}"</p>
        </div>

        <p className="text-justify mb-2">Bersama ini saya lampirkan bukti foto kerusakan, faktur pembelian barang, dan dokumen pendukung lainnya. Demikian permohonan ini saya buat dengan sebenar-benarnya untuk diproses lebih lanjut.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS */}
      <div className="shrink-0 mt-4" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed border-none">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10pt] pb-6">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr className="text-[9pt] font-black text-slate-500 uppercase tracking-widest text-center print:text-black">
              <td className="pb-4">Saksi / Petugas,</td>
              <td className="pb-4">Pemohon Klaim,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-20 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witnessName})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-20 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-20 h-10 flex items-center justify-center text-[7pt] text-slate-400 italic mb-2 print:border-black print:text-black">MATERAI</div>
                   <p className="font-bold underline uppercase text-[10pt]">{data.claimantName}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          /* ATUR MARGIN DI SINI: 20mm */
          @page { size: A4 portrait; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} className="text-red-500" /> <span>INSURANCE CLAIM BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
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

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Klaim</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><ClipboardList size={12}/> Data Pengiriman</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.insuranceName} onChange={e => handleDataChange('insuranceName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi / AWB" />
                 <input className="w-full p-2 border rounded text-xs" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} placeholder="Nama Ekspedisi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><AlertCircle size={12}/> Detail Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
                    <select className="w-full p-2 border rounded text-xs" value={data.incidentType} onChange={e => handleDataChange('incidentType', e.target.value)}>
                        <option>Barang Rusak Total (Total Loss)</option>
                        <option>Barang Rusak Sebagian</option>
                        <option>Barang Hilang / Tidak Sampai</option>
                    </select>
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.itemDescription} onChange={e => handleDataChange('itemDescription', e.target.value)} placeholder="Deskripsi Barang" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Nilai & Otoritas</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-700 bg-emerald-50" value={data.claimAmount} onChange={e => handleDataChange('claimAmount', e.target.value)} placeholder="Total Nilai Klaim" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.claimantName} onChange={e => handleDataChange('claimantName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                   <div style={{ padding: '20mm' }}>
                      <ClaimContent />
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col w-full h-auto">
            <ClaimContent />
         </div>
      </div>

    </div>
  );
}
