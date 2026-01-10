'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, 
  ChevronDown, Check, LayoutTemplate, 
  User, Wallet, MapPin, FileText, BadgeDollarSign, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function IncomeStatementPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <IncomeToolBuilder />
    </Suspense>
  );
}

function IncomeToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    name: 'Ahmad Fauzi',
    nik: '3171010101800001',
    address: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
    businessType: 'Freelance Graphic Designer / Jasa Kreatif',
    monthlyIncome: 7500000,
    monthlyIncomeText: 'Tujuh Juta Lima Ratus Ribu Rupiah',
    purpose: 'Persyaratan Pengajuan KPR / Kredit Bank',
    signerName: 'Ahmad Fauzi',
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const TEMPLATES = [
    { id: 1, name: "Format Pernyataan Diri", desc: "Dibuat oleh ybs (untuk freelancer/pedagang)" },
    { id: 2, name: "Format Surat Keterangan", desc: "Lebih formal, gaya bahasa pihak ketiga" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {/* TEMPLATE 1: PERNYATAAN DIRI */}
        {templateId === 1 && (
            <>
                <div className="text-center mb-10 shrink-0">
                   <h1 className="font-black text-xl uppercase underline tracking-widest leading-relaxed">SURAT PERNYATAAN PENGHASILAN</h1>
                </div>

                <div className="flex-grow">
                    <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                    
                    <div className="ml-8 mb-8 space-y-2">
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.name}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.businessType}</span></div>
                    </div>

                    <p className="mb-4">Dengan ini menyatakan dengan sesungguhnya bahwa pada saat ini saya memiliki penghasilan rata-rata per bulan sebesar:</p>
                    
                    <div className="bg-slate-50 border-2 border-slate-200 p-4 text-center mb-6 print:bg-transparent print:border-black">
                       <div className="text-xl font-black text-slate-900">{formatRupiah(data.monthlyIncome)}</div>
                       <div className="text-sm italic font-medium">({data.monthlyIncomeText})</div>
                    </div>

                    <p className="mb-4 leading-relaxed text-justify">
                       Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagai <strong>{data.purpose}</strong>.
                    </p>
                    
                    <p className="leading-relaxed text-justify">
                       Apabila di kemudian hari pernyataan ini terbukti tidak benar, maka saya bersedia mempertanggungjawabkannya sesuai dengan ketentuan hukum yang berlaku.
                    </p>
                </div>

                <div className="flex justify-end text-center mt-12 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-64">
                      <p className="mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                      <p className="mb-4 font-bold">Hormat saya,</p>
                      <div className="h-24 flex items-center justify-center border border-dashed border-slate-200 text-[10px] text-slate-400 mb-2 print:border-black print:text-black">Materai 10.000</div>
                      <p className="font-bold underline uppercase leading-none">{data.name}</p>
                   </div>
                </div>
            </>
        )}

        {/* TEMPLATE 2: PIHAK KETIGA */}
        {templateId === 2 && (
            <div className="font-sans text-[10.5pt] leading-relaxed flex flex-col h-full">
                <div className="border-b-4 border-slate-800 pb-4 mb-8 shrink-0">
                   <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">SURAT KETERANGAN PENGHASILAN</h1>
                   <p className="text-slate-500 font-bold text-sm print:text-black">Self-Employed / Independent Professional</p>
                </div>

                <div className="flex-grow">
                    <p className="mb-6">Diterangkan bahwa orang yang tercantum di bawah ini:</p>

                    <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-transparent print:border-black">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Nama Lengkap</span>
                          <span className="text-lg font-black text-slate-900">{data.name}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Identitas NIK</span>
                             <span className="font-bold text-slate-700 font-mono print:text-black">{data.nik}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Profesi</span>
                             <span className="font-bold text-slate-700 print:text-black">{data.businessType}</span>
                          </div>
                       </div>
                    </div>

                    <p className="mb-4 text-justify">Menerangkan bahwa yang bersangkutan memiliki pendapatan finansial bulanan rata-rata sebesar <strong>{formatRupiah(data.monthlyIncome)}</strong>.</p>
                    
                    <div className="border-l-4 border-emerald-500 pl-4 py-2 mb-8 italic text-slate-600 bg-emerald-50/30 print:bg-transparent print:text-black print:border-black">
                       "{data.monthlyIncomeText}"
                    </div>

                    <p className="mb-8 leading-relaxed">Surat keterangan ini diterbitkan atas permintaan yang bersangkutan untuk keperluan <strong>{data.purpose}</strong>.</p>
                </div>

                <div className="mt-auto flex justify-between items-end border-t pt-10 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                   <div className="text-[9px] text-slate-400 italic max-w-[250px] leading-snug print:text-black">
                      Surat ini merupakan pernyataan tanggung jawab mutlak dari pihak pertama mengenai kondisi keuangan pribadinya.
                   </div>
                   <div className="text-right">
                      <p className="text-sm text-slate-500 mb-16 print:text-black">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                      <p className="font-black text-slate-900 uppercase text-lg leading-none mb-1">{data.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-black">Pemberi Pernyataan</p>
                   </div>
                </div>
            </div>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Wallet size={16} className="text-emerald-500" /> <span>INCOME STATEMENT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
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
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <User size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas Diri</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan / Bidang</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Wallet size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Detail Penghasilan</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Total Penghasilan Bulanan</label>
                       <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-bold">Rp</span>
                          <input type="number" className="w-full p-2 border border-slate-300 rounded text-sm font-bold text-emerald-700" value={data.monthlyIncome} onChange={e => handleDataChange('monthlyIncome', parseInt(e.target.value) || 0)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Terbilang (Teks)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none italic" value={data.monthlyIncomeText} onChange={e => handleDataChange('monthlyIncomeText', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Surat</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Contoh: Pengajuan KPR" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label><input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label><input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
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
                    <DocumentContent />
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
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}