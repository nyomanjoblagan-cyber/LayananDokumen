'use client';

/**
 * FILE: PajakTanahPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Keterangan PBB (Tingkat Desa/Kelurahan)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Map, CalendarDays, Receipt, FileText, BadgeCheck, Edit3, Eye, RotateCcw, ArrowLeftCircle, UserCircle2, Landmark, Building
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DesaTaxData {
  village: string;
  district: string;
  regency: string;
  province: string;
  
  letterNumber: string;
  date: string;
  
  wpName: string;
  wpNik: string;
  wpAddress: string;
  wpJob: string;
  
  nop: string;
  taxYear: string;
  landArea: string;
  buildingArea: string;
  objLocation: string;
  
  taxAmount: number;
  paymentStatus: string;
  
  villageHead: string;
  villageHeadNip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DesaTaxData = {
  village: 'SARDONOHARJO',
  district: 'NGAGLIK',
  regency: 'SLEMAN',
  province: 'DAERAH ISTIMEWA YOGYAKARTA',
  
  letterNumber: '973/045/VIII/2025',
  date: '', 
  
  wpName: 'BAMBANG SUDARSO',
  wpNik: '3404010101740001',
  wpAddress: 'Dusun Tegalrejo RT 02 RW 05, Sardonoharjo',
  wpJob: 'Wiraswasta',
  
  nop: '34.04.050.001.012-0345.0',
  taxYear: '2025',
  landArea: '500',
  buildingArea: '150',
  objLocation: 'Jalan Kaliurang KM 10, Tegalrejo',
  
  taxAmount: 1250000,
  paymentStatus: 'LUNAS',
  
  villageHead: 'SUGIYANTO, S.E.',
  villageHeadNip: '19700101 199903 1 005'
};

// --- 3. KOMPONEN UTAMA ---
export default function PajakTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <TaxBuilder />
    </Suspense>
  );
}

function TaxBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DesaTaxData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof DesaTaxData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Keterangan Lunas PBB' : 'Pengantar Balik Nama PBB';

  const SuratKonten = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto relative">
        
        {/* KOP SURAT DESA (Standard for both templates) */}
        <div className="flex items-center justify-center border-b-[3px] border-double border-black pb-4 mb-6 shrink-0 text-center">
            <div className="absolute left-[20mm] print:left-0 top-[20mm] print:top-0 w-[20mm]">
                {/* Garuda/Logo placeholder */}
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto text-xs font-bold bg-white">LOGO</div>
            </div>
            <div className="px-[25mm]">
                <h2 className="font-bold text-lg uppercase leading-tight">PEMERINTAH KABUPATEN {data.regency}</h2>
                <h2 className="font-bold text-lg uppercase leading-tight">KECAMATAN {data.district}</h2>
                <h1 className="font-black text-2xl uppercase leading-tight tracking-wide">KANTOR KEPALA DESA {data.village}</h1>
                <p className="text-xs mt-1">Alamat: Kantor Kepala Desa {data.village}, Kec. {data.district}, Kab. {data.regency}</p>
            </div>
        </div>

        {/* TEMPLATE 1: SURAT KETERANGAN LUNAS PBB */}
        {templateId === 1 && (
          <div className="flex flex-col h-full flex-grow">
              <div className="text-center mb-8 shrink-0">
                 <h1 className="font-bold text-lg uppercase underline decoration-2 underline-offset-4">SURAT KETERANGAN LUNAS PBB</h1>
                 <p className="text-sm font-sans mt-1">Nomor: {data.letterNumber}</p>
              </div>

              <div className="space-y-4 flex-grow text-justify">
                 <p>Yang bertanda tangan di bawah ini Kepala Desa {data.village}, Kecamatan {data.district}, Kabupaten {data.regency}, menerangkan dengan sesungguhnya bahwa:</p>
                 
                 <div className="pl-8 space-y-1 my-4">
                    <div className="grid grid-cols-[160px_10px_1fr]">
                       <span>Nama Lengkap</span><span>:</span><span className="font-bold">{data.wpName}</span>
                       <span>NIK</span><span>:</span><span>{data.wpNik}</span>
                       <span>Pekerjaan</span><span>:</span><span>{data.wpJob}</span>
                       <span>Alamat</span><span>:</span><span>{data.wpAddress}</span>
                    </div>
                 </div>

                 <p>Adalah benar nama tersebut di atas memiliki Objek Pajak Bumi dan Bangunan (PBB) yang terletak di wilayah Desa {data.village} dengan rincian sebagai berikut:</p>
                 
                 <div className="pl-8 space-y-1 my-4">
                    <div className="grid grid-cols-[160px_10px_1fr]">
                       <span>Nomor Objek Pajak (NOP)</span><span>:</span><span className="font-bold">{data.nop}</span>
                       <span>Letak Objek Pajak</span><span>:</span><span>{data.objLocation}</span>
                       <span>Luas Bumi</span><span>:</span><span>{data.landArea} m²</span>
                       <span>Luas Bangunan</span><span>:</span><span>{data.buildingArea} m²</span>
                    </div>
                 </div>

                 <p>Berdasarkan catatan register pajak di Kantor Desa {data.village}, objek pajak tersebut di atas untuk Tahun Pajak <strong>{data.taxYear}</strong> dinyatakan <strong>TELAH LUNAS</strong> (Ketetapan sebesar {formatRupiah(data.taxAmount)}).</p>

                 <p>Demikian Surat Keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagai kelengkapan persyaratan administrasi sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12 flex justify-end shrink-0 break-inside-avoid">
                 <div className="text-center w-64">
                    <p className="mb-1 text-sm">{data.village}, {formatDateSafe(data.date)}</p>
                    <p className="font-bold text-sm">Kepala Desa {data.village}</p>
                    <div className="h-24"></div>
                    <p className="font-bold underline uppercase">{data.villageHead}</p>
                    {data.villageHeadNip && <p className="text-sm">NIP. {data.villageHeadNip}</p>}
                 </div>
              </div>
          </div>
        )}

        {/* TEMPLATE 2: SURAT PENGANTAR BALIK NAMA */}
        {templateId === 2 && (
          <div className="flex flex-col h-full flex-grow">
              <div className="text-center mb-8 shrink-0">
                 <h1 className="font-bold text-lg uppercase underline decoration-2 underline-offset-4">SURAT PENGANTAR MUTASI / BALIK NAMA PBB</h1>
                 <p className="text-sm font-sans mt-1">Nomor: {data.letterNumber}</p>
              </div>

              <div className="space-y-4 flex-grow text-justify">
                 <p>Kepala Desa {data.village}, Kecamatan {data.district}, Kabupaten {data.regency}, dengan ini menerangkan bahwa:</p>
                 
                 <div className="pl-8 space-y-1 my-4">
                    <div className="grid grid-cols-[160px_10px_1fr]">
                       <span>Nama Pemohon</span><span>:</span><span className="font-bold">{data.wpName}</span>
                       <span>NIK</span><span>:</span><span>{data.wpNik}</span>
                       <span>Pekerjaan</span><span>:</span><span>{data.wpJob}</span>
                       <span>Alamat</span><span>:</span><span>{data.wpAddress}</span>
                    </div>
                 </div>

                 <p>Bahwa nama tersebut bermaksud mengajukan Mutasi/Balik Nama Objek Pajak Bumi dan Bangunan (PBB-P2) yang terletak di wilayah Desa {data.village}, dengan data asal (lama) sebagai berikut:</p>
                 
                 <div className="pl-8 space-y-1 my-4">
                    <div className="grid grid-cols-[160px_10px_1fr]">
                       <span>Nomor Objek Pajak (NOP)</span><span>:</span><span className="font-bold">{data.nop}</span>
                       <span>Alamat Objek Pajak</span><span>:</span><span>{data.objLocation}</span>
                       <span>Luas Bumi</span><span>:</span><span>{data.landArea} m²</span>
                       <span>Luas Bangunan</span><span>:</span><span>{data.buildingArea} m²</span>
                    </div>
                 </div>

                 <p>Sebagai persyaratan tambahan, kami sampaikan bahwa tagihan PBB-P2 tahun <strong>{data.taxYear}</strong> untuk NOP tersebut statusnya adalah <strong>{data.paymentStatus}</strong>.</p>
                 <p>Surat pengantar ini diberikan untuk keperluan kelengkapan pengajuan administrasi di Kantor BPKAD/Bapenda Kabupaten {data.regency}. Demikian surat pengantar ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12 flex justify-end shrink-0 break-inside-avoid">
                 <div className="text-center w-64">
                    <p className="mb-1 text-sm">{data.village}, {formatDateSafe(data.date)}</p>
                    <p className="font-bold text-sm">Kepala Desa {data.village}</p>
                    <div className="h-24"></div>
                    <p className="font-bold underline uppercase">{data.villageHead}</p>
                    {data.villageHeadNip && <p className="text-sm">NIP. {data.villageHeadNip}</p>}
                 </div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Receipt size={16} className="text-emerald-500" /> <span>Sistem PBB Desa</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Surat Keterangan Lunas {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Pengantar Balik Nama {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:overflow-visible print:bg-white">
              
              {/* WILAYAH DESA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building size={14}/> Identitas Desa</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Nama Desa/Kelurahan" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.regency} onChange={e => handleDataChange('regency', e.target.value)} placeholder="Kabupaten/Kota" />
              </div>

              {/* SURAT */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={14}/> Dokumen</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.letterNumber} onChange={e => handleDataChange('letterNumber', e.target.value)} placeholder="Nomor Surat" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>

              {/* PEMOHON/WP */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Wajib Pajak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.wpName} onChange={e => handleDataChange('wpName', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wpNik} onChange={e => handleDataChange('wpNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wpJob} onChange={e => handleDataChange('wpJob', e.target.value)} placeholder="Pekerjaan" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wpAddress} onChange={e => handleDataChange('wpAddress', e.target.value)} placeholder="Alamat WP" />
              </div>

              {/* OBJEK PAJAK */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Map size={14}/> Objek Pajak (PBB)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.nop} onChange={e => handleDataChange('nop', e.target.value)} placeholder="Nomor Objek Pajak (NOP)" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Bumi (m²)" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bngn (m²)" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.objLocation} onChange={e => handleDataChange('objLocation', e.target.value)} placeholder="Lokasi Objek" />
              </div>

              {/* PEMBAYARAN */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Receipt size={14}/> Ketetapan Pajak</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Tahun Pajak" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none uppercase font-bold" value={data.paymentStatus} onChange={e => handleDataChange('paymentStatus', e.target.value)} placeholder="Status" />
                 </div>
                 <input type="number" className="w-full p-2 border rounded-lg text-xs font-black text-amber-600 focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxAmount} onChange={e => handleDataChange('taxAmount', parseInt(e.target.value) || 0)} placeholder="Tagihan Pokok (Rp)" />
              </div>

              {/* KADES */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Landmark size={14}/> Pejabat Pengesah</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kepala Desa" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.villageHeadNip} onChange={e => handleDataChange('villageHeadNip', e.target.value)} placeholder="NIP (Kosongkan jika bukan PNS)" />
              </div>

           </div>
        </div>

        {/* PREVIEW */}
 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <SuratKonten />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Keterangan_PBB" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><SuratKonten /></div></div>
    </div>
  );
}
