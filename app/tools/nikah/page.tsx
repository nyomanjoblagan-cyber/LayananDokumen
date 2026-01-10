'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, CalendarDays, Edit3, Eye, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PengantarNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Pengantar Nikah...</div>}>
      <MarriageNoticeBuilder />
    </Suspense>
  );
}

function MarriageNoticeBuilder() {
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
    docNo: '474.2/08/I/2026',
    
    // PEMERINTAH DESA
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
    villageHead: 'I NYOMAN GEDE, S.E.',
    villageJob: 'Perbekel Pemecutan Kaja',

    // DATA CALON PENGANTIN
    name: 'BAGUS RAMADHAN',
    nik: '5171010101990001',
    gender: 'Laki-laki',
    placeBirth: 'Denpasar',
    dateBirth: '1999-12-25',
    religion: 'Islam',
    job: 'Karyawan Swasta',
    status: 'Jejaka (Belum Kawin)',
    address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // KETERANGAN
    destination: 'Kepala KUA Kecamatan Denpasar Utara'
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
    { id: 1, name: "Format Standar N1", desc: "Sesuai aturan KUA/Disdukcapil" },
    { id: 2, name: "Format Desa Adat", desc: "Khusus wilayah hukum adat" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const MarriageContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
      
      {/* KOP SURAT DESA */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           {logo ? (
              <img src={logo} alt="Logo" className="w-18 h-18 object-contain shrink-0" />
           ) : (
              <div className="w-18 h-18 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                 <Building2 size={24} />
              </div>
           )}
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT PENGANTAR NIKAH</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {isClient && data.dateBirth ? new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.gender}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Agama</span><span>:</span><span>{data.religion}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Perkawinan</span><span>:</span><span className="font-bold">{data.status}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
        </div>

        <p className="mb-6">
          Orang tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk melengkapi persyaratan pernikahan yang akan didaftarkan pada <b>{data.destination}</b>.
        </p>

        <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS */}
      <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-8">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr>
              <td className="text-center align-top">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Tanda Tangan Pemegang,</p>
                <p className="font-bold underline uppercase text-[10pt] tracking-tight">({data.name})</p>
              </td>
              <td className="text-center align-top">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">{data.villageJob},</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[10pt] tracking-tight">{data.villageHead}</p>
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
               <Heart size={16} className="text-rose-500" /> <span>MARRIAGE NOTICE BUILDER</span>
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
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Desa</h3>
                 
                 <div className="flex items-center gap-4">
                    {logo ? (
                       <div className="relative w-16 h-16 border rounded overflow-hidden group">
                          <img src={logo} className="w-full h-full object-contain" />
                          <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                       </div>
                    ) : (
                       <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all"><X size={20} /></button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 </div>

                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed font-bold uppercase" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><Heart size={12}/> Data Calon Pengantin</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)} placeholder="Agama" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Kota Lahir" />
                    <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold text-blue-600" value={data.status} onChange={e => handleDataChange('status', e.target.value)} placeholder="Status (Jejaka/Perawan)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades" />
                 <input className="w-full p-2 border rounded text-xs" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.destination} onChange={e => handleDataChange('destination', e.target.value)} placeholder="Tujuan KUA" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               
               {/* LOGIKA SKALA:
                  - Mobile: scale-[0.55] dan margin bawah negatif agar pas.
               */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <MarriageContent />
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
            <MarriageContent />
         </div>
      </div>

    </div>
  );
}