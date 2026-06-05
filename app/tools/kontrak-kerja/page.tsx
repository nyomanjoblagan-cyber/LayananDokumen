'use client';

/**
 * FILE: ContractPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Perjanjian Kerja (PKWT) dengan Dual Template
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Briefcase, User, 
  Scale, Plus, Trash2, DollarSign, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

export default function ContractPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <ContractToolBuilder />
    </Suspense>
  );
}

function ContractToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  // DATA DEFAULT
  const [data, setData] = useState({
    no: `PKWT/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: '',
    city: 'Jakarta',
    compName: 'PT. MAJU BERSAMA',
    compAddress: 'Jl. Sudirman Kav. 50, Jakarta Selatan',
    compRep: 'Budi Santoso',
    compRepJob: 'Direktur Utama',
    empName: 'Ahmad Fauzi',
    empKtp: '3171234567890001',
    empAddress: 'Jl. Kebon Jeruk No. 12, Jakarta Barat',
    jobTitle: 'Staff Administrasi',
    startDate: '',
    endDate: '',
    salary: 4500000,
    allowances: [
      { id: 1, name: 'Tunjangan Transport', amount: 'Rp 500.000 / bulan' },
      { id: 2, name: 'Uang Makan', amount: 'Rp 25.000 / hari kehadiran' },
    ],
    duties: '1. Mengelola administrasi harian kantor.\n2. Membuat laporan keuangan sederhana.\n3. Melayani kebutuhan administrasi klien.',
    workHours: 'Senin - Jumat, 08.00 - 17.00 WIB',
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextYear.toISOString().split('T')[0]
    }));
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const addAllowance = () => setData({ ...data, allowances: [...data.allowances, { id: Date.now(), name: '', amount: '' }] });
  
  const removeAllowance = (idx: number) => {
    const newItems = [...data.allowances];
    newItems.splice(idx, 1);
    setData({ ...data, allowances: newItems });
  };
  
  const handleAllowanceChange = (idx: number, field: 'name' | 'amount', val: string) => {
    const newItems = [...data.allowances];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, allowances: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Pasal (2 Halaman)", desc: "Legal formal, indentasi rapi & justify" },
    { id: 2, name: "Format Ringkas (1 Halaman)", desc: "Poin-poin padat untuk UMKM" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;
  const salaryFormatted = data.salary.toLocaleString('id-ID');

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl p-[20mm] mx-auto text-[#1e293b] font-serif leading-relaxed text-[11pt] relative box-border mb-8 w-[210mm] min-h-[297mm] print:w-[210mm] print:h-[297mm] print:shadow-none print:mb-0 print:p-[20mm] print:text-black print:block ${className}`}>
      {children}
    </div>
  );

  const ContentPage1 = () => (
    <div className="flex flex-col justify-between h-full">
        <div>
            <div className="text-center mb-8">
                {logo && <img src={logo} className="h-16 w-auto mx-auto mb-2" alt="Logo" />}
                <h1 className="font-bold text-xl uppercase underline tracking-wide">PERJANJIAN KERJA WAKTU TERTENTU</h1>
                <div className="text-sm font-bold mt-1">Nomor: {data.no}</div>
            </div>
            <p className="mb-6 text-justify">Pada hari ini, tanggal <strong>{isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}</strong>, bertempat di <strong>{data.city}</strong>, para pihak sepakat mengikatkan diri:</p>
            <div className="ml-4 mb-8 space-y-6">
                <div className="flex gap-4">
                    <span className="font-bold">1.</span>
                    <div className="flex-1">
                        <p className="font-bold uppercase">{data.compName}</p>
                        <p className="text-sm">{data.compAddress}</p>
                        <p className="mt-1 italic text-xs">Diwakili oleh {data.compRep} ({data.compRepJob}) - <strong>PIHAK PERTAMA</strong>.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="font-bold">2.</span>
                    <div className="flex-1">
                        <p className="font-bold uppercase">{data.empName}</p>
                        <p className="text-sm">NIK: {data.empKtp}</p>
                        <p className="text-sm">{data.empAddress}</p>
                        <p className="mt-1 italic text-xs">Bertindak untuk diri sendiri - <strong>PIHAK KEDUA</strong>.</p>
                    </div>
                </div>
            </div>
            <div className="space-y-6 text-justify">
                <div>
                    <div className="text-center font-bold mb-2 uppercase">PASAL 1: MASA KERJA</div>
                    <p>Bekerja sebagai <strong>{data.jobTitle}</strong> mulai <strong>{isClient && data.startDate ? new Date(data.startDate + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong> hingga <strong>{isClient && data.endDate ? new Date(data.endDate + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong>.</p>
                </div>
                <div>
                    <div className="text-center font-bold mb-2 uppercase">PASAL 2: TUGAS</div>
                    <p className="whitespace-pre-line text-sm pl-4 border-l-2 border-slate-200">{data.duties}</p>
                </div>
            </div>
        </div>
        <div className="text-right text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
    </div>
  );

  const ContentPage2 = () => (
    <div className="flex flex-col justify-between h-full pt-4">
        <div className="space-y-8">
            <div>
                <div className="text-center font-bold mb-3 uppercase">PASAL 3: UPAH & JAM KERJA</div>
                <div className="space-y-2">
                    <p>1. Gaji Pokok: <strong>Rp {salaryFormatted} / bulan</strong>.</p>
                    <p>2. Tunjangan:</p>
                    <ul className="list-disc ml-8 text-sm">
                        {data.allowances.map((a, idx) => (<li key={idx}>{a.name}: {a.amount}</li>))}
                    </ul>
                    <p>3. Jam Kerja: {data.workHours}.</p>
                </div>
            </div>
            <div>
                <div className="text-center font-bold mb-3 uppercase">PASAL 4: PENUTUP</div>
                <p className="text-justify text-sm">Perjanjian ini tunduk pada hukum ketenagakerjaan Republik Indonesia. Segala perselisihan akan diselesaikan secara musyawarah.</p>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-center mt-20 break-inside-avoid">
                <div className="w-1/2">
                    <p className="mb-24 font-bold">PIHAK PERTAMA</p>
                    <p className="font-bold underline uppercase">{data.compRep}</p>
                </div>
                <div className="w-1/2">
                    <p className="mb-24 font-bold">PIHAK KEDUA</p>
                    <p className="font-bold underline uppercase">{data.empName}</p>
                </div>
            </div>
            <div className="text-right text-[10px] text-slate-400 italic mt-8">Halaman 2 dari 2</div>
        </div>
    </div>
  );

  const ContentSimple = () => (
    <div className="font-sans text-sm text-justify h-full flex flex-col">
        <div className="text-center border-b-2 border-slate-800 pb-4 mb-8">
            <h1 className="font-black text-2xl uppercase tracking-wide">KONTRAK KERJA</h1>
            <div className="text-slate-500 font-bold uppercase">{data.compName}</div>
        </div>
        <div className="space-y-4 mb-8">
            <div className="grid grid-cols-[100px_10px_1fr] gap-1 pl-4">
                <div className="font-bold uppercase text-[10px] text-slate-400">Pemberi Kerja</div><div>:</div><div>{data.compRep} ({data.compName})</div>
                <div className="font-bold uppercase text-[10px] text-slate-400">Pekerja</div><div>:</div><div className="font-bold uppercase">{data.empName}</div>
                <div className="font-bold uppercase text-[10px] text-slate-400">Jabatan</div><div>:</div><div>{data.jobTitle}</div>
                <div className="font-bold uppercase text-[10px] text-slate-400">Gaji</div><div>:</div><div className="font-bold text-emerald-700">Rp {salaryFormatted}</div>
                <div className="font-bold uppercase text-[10px] text-slate-400">Masa Kerja</div><div>:</div><div>{isClient && data.startDate ? new Date(data.startDate + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'medium'}) : '...'} s/d {isClient && data.endDate ? new Date(data.endDate + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'medium'}) : '...'}</div>
            </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border mb-8 flex-grow">
            <h3 className="font-bold mb-2 uppercase text-[10px] text-slate-500 tracking-widest">Tugas Utama:</h3>
            <p className="whitespace-pre-line leading-relaxed text-slate-700">{data.duties}</p>
        </div>
        <div className="flex justify-between text-center mt-auto break-inside-avoid">
            <div className="w-1/2 border-t pt-2 font-bold uppercase text-xs">Pemberi Kerja</div>
            <div className="w-1/2 border-t pt-2 font-bold uppercase text-xs">Pekerja</div>
        </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white h-16 flex items-center px-4 justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} className="text-blue-500" /> <span>CONTRACT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 text-slate-900 overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex justify-between items-center ${templateId === t.id ? 'bg-blue-50 text-blue-700' : ''}`}>
                      <span className="text-xs font-bold">{t.name}</span>
                      {templateId === t.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kontrak</h2><button onClick={() => window.location.reload()} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Pengusaha</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.compRep} onChange={e => setData({...data, compRep: e.target.value})} placeholder="Nama Pimpinan" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Karyawan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empName} onChange={e => setData({...data, empName: e.target.value})} placeholder="Nama Karyawan" />
                 <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jobTitle} onChange={e => setData({...data, jobTitle: e.target.value})} placeholder="Jabatan" />
                 <input className="w-full p-2 border rounded text-xs font-black text-emerald-600 bg-emerald-50" type="number" value={data.salary} onChange={e => setData({...data, salary: parseInt(e.target.value) || 0})} />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center"><label className="text-[10px] font-black uppercase text-slate-400">Tunjangan</label><button onClick={addAllowance} className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">+ Baru</button></div>
                 {data.allowances.map((a, idx) => (
                    <div key={a.id} className="flex gap-2 group animate-in slide-in-from-right-2">
                       <input className="flex-1 p-1.5 border rounded text-xs" value={a.name} onChange={e => handleAllowanceChange(idx, 'name', e.target.value)} placeholder="Tunjangan" />
                       <input className="flex-1 p-1.5 border rounded text-xs" value={a.amount} onChange={e => handleAllowanceChange(idx, 'amount', e.target.value)} placeholder="Rp" />
                       <button onClick={() => removeAllowance(idx)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
               {templateId === 1 ? (
                 <div className="flex flex-col gap-8">
                    <Kertas><ContentPage1 /></Kertas>
                    <Kertas><ContentPage2 /></Kertas>
                 </div>
               ) : (
                 <Kertas><ContentSimple /></Kertas>
               )}
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden">
         {templateId === 1 ? (
            <div className="flex flex-col">
               <Kertas className="page-break"><ContentPage1 /></Kertas>
               <Kertas><ContentPage2 /></Kertas>
            </div>
         ) : (
            <Kertas><ContentSimple /></Kertas>
         )}
      </div>
    </div>
  );
}
// FORCE-HMR-UPDATE