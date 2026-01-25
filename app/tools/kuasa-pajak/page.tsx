'use client';

/**
 * FILE: KuasaPajakPage.tsx
 * STATUS: FINAL FIXED (TEMPLATE SWITCHING & PREVIEW)
 * DESC: Generator Surat Kuasa Khusus Pajak
 * FIXES: 
 * - Memisahkan layout Template 1 (Standar) & Template 2 (Korporat).
 * - Menghapus double background di preview.
 * - Print margin 0mm (bersih dari URL browser).
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, FileText, Building2, UserCircle2, 
  ShieldCheck, LayoutTemplate, X, PenTool, Scale, Fingerprint, Edit3, Eye, Check, ChevronDown, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface ProxyData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMBERI KUASA
  p1Name: string;
  p1Nik: string;
  p1Npwp: string;
  p1Job: string;
  p1Company: string;
  p1Address: string;

  // PENERIMA KUASA
  p2Name: string;
  p2Nik: string;
  p2Address: string;
  p2Job: string;

  // DETAIL URUSAN PAJAK
  taxType: string;
  taxYear: string;
  kppName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ProxyData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'SK.PAJAK/001/I/2026',
  
  p1Name: 'AGUS SETIAWAN',
  p1Nik: '5171010101880001',
  p1Npwp: '01.234.567.8-901.000',
  p1Job: 'Direktur Utama',
  p1Company: 'PT. BALI MAJU SEJAHTERA',
  p1Address: 'Jl. Teuku Umar No. 10, Denpasar, Bali',

  p2Name: 'MADE ARYAWAN',
  p2Nik: '5171010202900005',
  p2Address: 'Jl. Gatot Subroto No. 45, Denpasar',
  p2Job: 'Tax Consultant / Staf Keuangan',

  taxType: 'Pajak Penghasilan (PPh) Pasal 21 & PPN',
  taxYear: 'Masa Januari s/d Desember 2025',
  kppName: 'KPP Pratama Denpasar Barat'
};

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
      <TaxProxyBuilder />
    </Suspense>
  );
}

function TaxProxyBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<ProxyData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ProxyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Standar (Umum)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Perusahaan (Korporat)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Perusahaan';

  // --- KOMPONEN ISI SURAT ---
  const ProxyContent = () => (
    // FIX: Wrapper tunggal dengan shadow dan padding internal. Parent preview tidak boleh punya shadow.
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] p-[25mm] shadow-2xl print:shadow-none print:m-0 print:p-[25mm] print:w-full mx-auto">
      
      {/* ---------------- TEMPLATE 1: STANDAR UMUM ---------------- */}
      {templateId === 1 && (
        <>
          {/* JUDUL */}
          <div className="text-center mb-10 shrink-0">
            <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KUASA KHUSUS</h2>
            <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
          </div>

          <div className="flex-grow text-[11pt] leading-relaxed text-justify">
            <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
            
            <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p1Name}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>NPWP</span><span>:</span><span>{data.p1Npwp}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.p1Nik}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p1Address}</span></div>
            </div>

            <p className="mb-4">Selanjutnya disebut sebagai <b>PEMBERI KUASA</b>. Dengan ini memberi kuasa khusus kepada:</p>

            <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p2Name}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK/NPWP</span><span>:</span><span>{data.p2Nik}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.p2Job}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p2Address}</span></div>
            </div>

            <p className="mb-6 text-center font-bold tracking-widest uppercase text-sm">--- K H U S U S ---</p>

            <p className="mb-4">
              Untuk mewakili Pemberi Kuasa dalam melaksanakan hak dan/atau memenuhi kewajiban perpajakan berupa <b>{data.taxType}</b> untuk <b>{data.taxYear}</b> pada <b>{data.kppName}</b>.
            </p>

            <p>
              Penerima Kuasa diberi wewenang penuh untuk menghadap pejabat berwenang, menandatangani surat-surat, memberikan keterangan, serta melakukan tindakan lain yang diperlukan sehubungan dengan peraturan perpajakan yang berlaku.
            </p>
          </div>
        </>
      )}

      {/* ---------------- TEMPLATE 2: PERUSAHAAN (KORPORAT) ---------------- */}
      {templateId === 2 && (
        <>
          {/* KOP SEDERHANA */}
          <div className="border-b-4 border-double border-black pb-4 mb-8 text-center shrink-0">
             {logo && <img src={logo} className="h-16 w-auto mx-auto mb-2 block print:block" />}
             <h1 className="text-xl font-black uppercase tracking-widest">{data.p1Company}</h1>
             <p className="text-[9pt] font-sans">{data.p1Address}</p>
          </div>

          <div className="text-center mb-8 shrink-0">
            <h2 className="text-lg font-black underline uppercase">SURAT KUASA KHUSUS PAJAK</h2>
            <p className="text-[10pt] font-bold">No: {data.docNo}</p>
          </div>

          <div className="flex-grow text-[11pt] leading-relaxed text-justify">
            <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
            
            <div className="ml-4 mb-6">
                <table className="w-full">
                   <tbody>
                      <tr><td className="w-32 py-1">Nama</td><td>:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td className="py-1">Jabatan</td><td>:</td><td>{data.p1Job}</td></tr>
                      <tr><td className="py-1">Bertindak untuk</td><td>:</td><td className="font-bold uppercase">{data.p1Company}</td></tr>
                      <tr><td className="py-1">NPWP Badan</td><td>:</td><td className="font-mono font-bold">{data.p1Npwp}</td></tr>
                      <tr><td className="py-1 align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                   </tbody>
                </table>
            </div>

            <p className="mb-4 text-center italic">--- Memberikan Kuasa Penuh Kepada ---</p>

            <div className="ml-4 mb-6">
                <table className="w-full">
                   <tbody>
                      <tr><td className="w-32 py-1">Nama</td><td>:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td className="py-1">NIK/NPWP</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td className="py-1">Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                      <tr><td className="py-1 align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                   </tbody>
                </table>
            </div>

            <div className="border p-4 mb-6 text-sm text-justify">
               <strong>UNTUK:</strong><br/>
               Melakukan pengurusan, perhitungan, pelaporan, dan penandatanganan dokumen perpajakan terkait <u>{data.taxType}</u> masa pajak <u>{data.taxYear}</u> di Kantor Pelayanan Pajak <u>{data.kppName}</u>.
            </div>

            <p>
              Segala akibat yang timbul dari pemberian kuasa ini menjadi tanggung jawab Pemberi Kuasa sepenuhnya sesuai ketentuan Undang-Undang Perpajakan yang berlaku.
            </p>
          </div>
        </>
      )}

      {/* TANDA TANGAN (SAMA UNTUK KEDUA TEMPLATE) */}
      <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td colSpan={2} className="text-right font-bold text-[10.5pt] pb-10">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
              <td className="pb-4">Penerima Kuasa,</td>
              <td className="pb-4">Pemberi Kuasa,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.p2Name})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4 print:border-black print:text-black">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt]">{data.p1Name}</p>
                   {templateId === 2 && <p className="text-[9pt]">{data.p1Job}</p>}
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
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
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
               <FileText size={16} className="text-blue-500" /> <span>TAX PROXY BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pajak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Fingerprint size={12}/> Pemberi Kuasa</h3>
                 <div className="flex items-center gap-4">
                    {templateId === 2 && (
                        <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                            {logo ? <img src={logo} className="w-full h-full object-contain" /> : <PenTool size={20} className="text-slate-300" />}
                        </div>
                    )}
                    <div className="flex-1">
                        {templateId === 2 && (
                            <>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline mb-2 block">Upload Logo Kop</button>
                            </>
                        )}
                        <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Direktur/WP" />
                    </div>
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.p1Npwp} onChange={e => handleDataChange('p1Npwp', e.target.value)} placeholder="NPWP Wajib Pajak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Jabatan" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Penerima Kuasa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Staf/Konsultan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK Penerima" />
                 <input className="w-full p-2 border rounded text-xs" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Ruang Lingkup Kuasa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} placeholder="Jenis Pajak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Masa/Tahun Pajak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.kppName} onChange={e => handleDataChange('kppName', e.target.value)} placeholder="Kantor Pajak (KPP)" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               {/* WRAPPER PREVIEW TANPA BG PUTIH LAGI (Agar tidak double) */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 flex flex-col items-center">
                  <ProxyContent />
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
         <div className="flex flex-col">
            <ProxyContent />
         </div>
      </div>

    </div>
  );
}
