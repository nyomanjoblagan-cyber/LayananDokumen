'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, FileText, Building2, UserCircle2, 
  ShieldCheck, LayoutTemplate, X, PenTool, Scale, Fingerprint, Edit3, Eye, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kuasa Pajak...</div>}>
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

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    docNo: 'SK.PAJAK/001/I/2026',
    
    // PEMBERI KUASA (WAJIB PAJAK / DIREKTUR)
    p1Name: 'AGUS SETIAWAN',
    p1Nik: '5171010101880001',
    p1Npwp: '01.234.567.8-901.000',
    p1Job: 'Direktur Utama',
    p1Company: 'PT. BALI MAJU SEJAHTERA',
    p1Address: 'Jl. Teuku Umar No. 10, Denpasar, Bali',

    // PENERIMA KUASA (STAF/KONSULTAN)
    p2Name: 'MADE ARYAWAN',
    p2Nik: '5171010202900005',
    p2Address: 'Jl. Gatot Subroto No. 45, Denpasar',
    p2Job: 'Tax Consultant / Staf Keuangan',

    // DETAIL URUSAN PAJAK
    taxType: 'Pajak Penghasilan (PPh) Pasal 21 & PPN',
    taxYear: 'Masa Januari s/d Desember 2025',
    kppName: 'KPP Pratama Denpasar Barat'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar", desc: "Sesuai ketentuan umum perpajakan" },
    { id: 2, name: "Format Perusahaan", desc: "Khusus badan usaha" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ProxyContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KUASA KHUSUS</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
        
        {/* PEMBERI KUASA */}
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p1Name}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NPWP</span><span>:</span><span>{data.p1Npwp}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.p1Job} {data.p1Company}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p1Address}</span></div>
        </div>

        <p className="mb-4">Selanjutnya disebut sebagai <b>PEMBERI KUASA</b>. Dengan ini memberi kuasa khusus kepada:</p>

        {/* PENERIMA KUASA */}
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p2Name}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.p2Nik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.p2Job}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p2Address}</span></div>
        </div>

        <p className="mb-6 text-center font-bold tracking-widest uppercase text-sm">--- K H U S U S ---</p>

        <p className="mb-6">
          Untuk mewakili Pemberi Kuasa dalam melaksanakan hak dan/atau memenuhi kewajiban perpajakan berupa <b>{data.taxType}</b> untuk <b>{data.taxYear}</b> pada <b>{data.kppName}</b>.
        </p>

        <p>
          Penerima Kuasa diberi wewenang untuk menandatangani surat-surat, memberikan keterangan, serta melakukan tindakan lain yang diperlukan sehubungan dengan maksud pemberian kuasa ini sesuai peraturan perundang-undangan perpajakan yang berlaku.
        </p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
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
               <FileText size={16} className="text-blue-500" /> <span>TAX PROXY BUILDER</span>
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

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Fingerprint size={12}/> Pemberi Kuasa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Direktur/WP" />
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
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <ProxyContent />
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
            <ProxyContent />
         </div>
      </div>

    </div>
  );
}