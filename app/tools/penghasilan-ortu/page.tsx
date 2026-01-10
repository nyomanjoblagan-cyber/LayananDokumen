'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Wallet, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Coins, FileText, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PenghasilanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Penghasilan...</div>}>
      <IncomeStatementBuilder />
    </Suspense>
  );
}

function IncomeStatementBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Surabaya',
    date: '',
    docNo: '400/12/RT.03/2026',
    
    // DATA ORANG TUA
    parentName: 'SLAMET MULYONO',
    parentNik: '3578000000000001',
    parentJob: 'Wiraswasta / Pedagang',
    parentAddress: 'Jl. Gubeng Kertajaya No. 15, RT 003/RW 005, Surabaya',

    // DATA ANAK
    childName: 'RIZKY ADITYA',
    childSchool: 'Universitas Airlangga (UNAIR)',
    purpose: 'Persyaratan Pendaftaran Beasiswa KIP-Kuliah',

    // RINCIAN PENGHASILAN
    baseIncome: 'Rp 2.500.000,-',
    otherIncome: 'Rp 500.000,-',
    totalIncome: 'Rp 3.000.000,-',

    // PENGESAH
    issuerJob: 'Ketua RT 003',
    issuerName: 'BAMBANG HERMANTO'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const IncomeContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[20mm]">
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KETERANGAN PENGHASILAN</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-6">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.parentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.parentNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.parentJob}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.parentAddress}</span></div>
        </div>

        <p>Menyatakan dengan sebenarnya bahwa saat ini saya memiliki penghasilan rata-rata per bulan sebesar:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] print:bg-transparent print:border-black">
            <div className="grid grid-cols-[180px_10px_1fr] mb-1"><span>Penghasilan Pokok</span><span>:</span><span className="font-bold">{data.baseIncome}</span></div>
            <div className="grid grid-cols-[180px_10px_1fr] mb-2 border-b border-slate-200 pb-2 print:border-black"><span>Penghasilan Tambahan</span><span>:</span><span>{data.otherIncome}</span></div>
            <div className="grid grid-cols-[180px_10px_1fr] text-blue-700 print:text-black"><span>Total Penghasilan</span><span>:</span><span className="font-black text-[12pt]">{data.totalIncome}</span></div>
        </div>

        <p>Pernyataan ini dibuat sebagai kelengkapan administrasi bagi anak saya:</p>
        <div className="ml-8 space-y-1.5 font-sans text-[10pt]">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Anak</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.childName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Instansi/Sekolah</span><span>:</span><span>{data.childSchool}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Keperluan</span><span>:</span><span className="italic font-medium">{data.purpose}</span></div>
        </div>

        <p className="text-justify">Demikian surat pernyataan ini saya buat dengan sebenarnya tanpa ada paksaan dari pihak manapun, dan saya bersedia dituntut sesuai hukum jika data di atas tidak benar.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="mt-auto pt-10 shrink-0" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-8">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center print:text-black">
              <td className="pb-4">Mengetahui,</td>
              <td className="pb-4">Hormat Saya,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.issuerName})</p>
                   <p className="text-[9pt] leading-tight mt-1">{data.issuerJob}</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4 print:border-black print:text-black">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight leading-none">{data.parentName}</p>
                   <p className="text-[9pt] mt-1 text-slate-500 italic uppercase tracking-tighter print:text-black">Orang Tua / Wali</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Wallet size={16} /> <span>Income Statement Builder</span>
            </div>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Orang Tua</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                 <input className="w-full p-2 border rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
                 <input className="w-full p-2 border rounded text-xs" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} placeholder="Pekerjaan" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Detail Penghasilan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.baseIncome} onChange={e => handleDataChange('baseIncome', e.target.value)} placeholder="Gaji Pokok" />
                    <input className="w-full p-2 border rounded text-xs" value={data.otherIncome} onChange={e => handleDataChange('otherIncome', e.target.value)} placeholder="Lainnya" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold text-blue-600" value={data.totalIncome} onChange={e => handleDataChange('totalIncome', e.target.value)} placeholder="Total Sebulan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Keperluan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Sekolah / Kampus" />
                 <input className="w-full p-2 border rounded text-xs" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Ketua RT / RW" />
                 <input className="w-full p-2 border rounded text-xs" value={data.issuerJob} onChange={e => handleDataChange('issuerJob', e.target.value)} placeholder="Jabatan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <IncomeContent />
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

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <IncomeContent />
         </div>
      </div>
    </div>
  );
}