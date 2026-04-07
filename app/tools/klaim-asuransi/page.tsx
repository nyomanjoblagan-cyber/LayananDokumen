'use client';

/**
 * FILE: KlaimAsuransiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Klaim Asuransi Logistik
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldAlert, Building2, UserCircle2, 
  LayoutTemplate, X, ShieldCheck, ClipboardList, PackageX, Coins, AlertCircle, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Klaim Asuransi...</div>}>
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
  const [showDonation, setShowDonation] = useState(false);

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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
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

  const activeTemplateName = templateId === 1 ? 'Format Logistik' : 'Format Umum';

  const ClaimContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-snug text-[10pt] w-[210mm] min-h-[296mm] p-[20mm] print:p-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* JUDUL */}
        <div className="text-center mb-6 shrink-0">
          <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERNYATAAN KLAIM ASURANSI</h1>
          <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500 print:text-black">Logistik & Pengiriman Barang</p>
          <p className="text-[9pt] font-sans font-bold mt-1">Nomor Pengajuan: {data.docNo}</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow leading-relaxed">
          <div className="mb-4">
             <p>Kepada Yth,</p>
             <p><b>Bagian Klaim {data.insuranceName}</b></p>
             <p>Di Tempat</p>
          </div>
          
          <p className="mb-3">Dengan hormat,</p>
          <p className="mb-3 text-justify">Saya yang bertanda tangan di bawah ini mengajukan permohonan klaim atas kerusakan/kehilangan barang pengiriman dengan rincian data sebagai berikut:</p>
          
          {/* DATA PEMOHON */}
          <div className="ml-4 mb-4 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic break-inside-avoid">
              <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Pemohon</span><span>:</span><span className="font-bold uppercase">{data.claimantName}</span></div>
              <div className="grid grid-cols-[130px_10px_1fr]"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
              <div className="grid grid-cols-[130px_10px_1fr]"><span>Ekspedisi</span><span>:</span><span>{data.courierName}</span></div>
              <div className="grid grid-cols-[130px_10px_1fr]"><span>Tgl Kejadian</span><span>:</span><span>{formatDateSafe(data.incidentDate)}</span></div>
          </div>

          {/* DETAIL OBJEK */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-[10pt] mb-4 print:bg-transparent print:border-black break-inside-avoid">
              <p className="font-black text-red-600 uppercase text-[9pt] mb-2 tracking-widest print:text-black border-b border-slate-300 pb-1 print:border-black">Detail Objek Klaim</p>
              <div className="space-y-1">
                 <div className="grid grid-cols-[130px_10px_1fr]"><span>Jenis Kerugian</span><span>:</span><span className="font-bold">{data.incidentType}</span></div>
                 <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Barang</span><span>:</span><span>{data.itemDescription}</span></div>
                 <div className="grid grid-cols-[130px_10px_1fr] text-blue-700 print:text-black"><span>Nilai Klaim</span><span>:</span><span className="font-black text-[11pt]">{data.claimAmount}</span></div>
              </div>
          </div>

          <div className="mb-4 break-inside-avoid">
              <p className="font-bold underline mb-1 text-[10pt]">Kronologi Kejadian:</p>
              <p className="text-slate-800 bg-white p-1 italic leading-relaxed text-justify">"{data.chronology}"</p>
          </div>

          <p className="text-justify mb-2 break-inside-avoid">Demikian permohonan ini saya buat dengan sebenar-benarnya untuk diproses sesuai ketentuan asuransi yang berlaku.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-4" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed border-none">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center font-bold text-[10.5pt] pb-6 font-sans">
                  {data.city}, {isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
                </td>
              </tr>
              <tr className="text-[9pt] font-black text-slate-500 uppercase tracking-widest text-center print:text-black font-sans">
                <td className="pb-4">Saksi / Petugas,</td>
                <td className="pb-4">Pemohon Klaim,</td>
              </tr>
              <tr>
                <td className="text-center align-bottom font-sans">
                   <p className="font-bold underline uppercase">({data.witnessName})</p>
                </td>
                <td className="text-center align-bottom font-sans">
                   <div className="border border-slate-300 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-400 italic mb-2 mx-auto uppercase">Materai</div>
                   <p className="font-bold underline uppercase text-[10.5pt]">{data.claimantName}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0mm !important; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} className="text-red-500" /> <span className="uppercase tracking-tighter">Insurance Claim Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Logistik {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Umum {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><ClipboardList size={12}/> Pengiriman</h3>
                 <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.insuranceName} onChange={e => handleDataChange('insuranceName', e.target.value)} placeholder="Tujuan Asuransi" />
                 <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="No Resi / AWB" />
                 <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} placeholder="Ekspedisi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><AlertCircle size={12}/> Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" value={data.claimAmount} onChange={e => handleDataChange('claimAmount', e.target.value)} placeholder="Nilai Klaim" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.itemDescription} onChange={e => handleDataChange('itemDescription', e.target.value)} placeholder="Nama Barang" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none focus:ring-2 focus:ring-red-500 outline-none" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Kronologi..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Otoritas</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.claimantName} onChange={e => handleDataChange('claimantName', e.target.value)} placeholder="Nama Pemohon" />
                 <input className="w-full p-2 border rounded text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} placeholder="Nama Saksi" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ClaimContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ClaimContent /></div></div>
    </div>
  );
}