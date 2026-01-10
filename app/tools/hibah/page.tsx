'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Gift, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, PlusCircle, Trash2, Edit3, Eye, Briefcase, Check
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function SuratHibahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Hibah...</div>}>
      <GrantLetterBuilder />
    </Suspense>
  );
}

function GrantLetterBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); // Logic Mobile Tab
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: '', // Hydration fix
    docNo: 'HB-001/SK/2026',
    
    // PEMBERI HIBAH (PIHAK PERTAMA)
    grantorName: 'SUPARMAN HADI',
    grantorNik: '3201010101010001',
    grantorAge: '62',
    grantorAddress: 'Jl. Melati No. 12, Kel. Menteng, Jakarta Pusat',

    // PENERIMA HIBAH (PIHAK KEDUA)
    granteeName: 'ANDRE KURNIAWAN',
    granteeNik: '3201010101010005',
    granteeAge: '30',
    granteeAddress: 'Jl. Kebon Sirih No. 5, Jakarta Pusat',

    // OBJEK HIBAH
    objectType: 'Sebidang Tanah dan Bangunan',
    objectDetail: 'Sertifikat Hak Milik (SHM) No. 1234 dengan luas tanah 250 m2, terletak di Blok B No. 15, Kelurahan Rawamangun, Jakarta Timur.',
    
    // SAKSI-SAKSI
    witness1: 'H. RAMLI',
    witness2: 'SURYADI, S.H.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today
    }));
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
    { id: 1, name: "Formal (Akta)", desc: "Format standar akta hibah" },
    { id: 2, name: "Sederhana", desc: "Format surat pernyataan simpel" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const HibahContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border w-full h-full text-slate-900 p-[25mm] print:p-[25mm]" 
         style={{ minHeight: '296mm' }}>
      
      {templateId === 1 && (
        <>
          {/* JUDUL */}
          <div className="text-center mb-10 shrink-0">
            <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT KETERANGAN HIBAH</h2>
            <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
          </div>

          {/* ISI SURAT */}
          <div className="space-y-6 flex-grow text-[11pt] font-serif leading-relaxed text-justify overflow-hidden">
            <p>Pada hari ini, tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>
            
            <div className="space-y-3">
                <div className="flex gap-4 break-inside-avoid">
                    <span className="w-4 font-bold">1.</span>
                    <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.grantorName}</span></div>
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.grantorNik}</span></div>
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.grantorAddress}</span></div>
                        <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK PERTAMA (PEMBERI HIBAH)</b>.</p>
                    </div>
                </div>

                <div className="flex gap-4 break-inside-avoid">
                    <span className="w-4 font-bold">2.</span>
                    <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.granteeName}</span></div>
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.granteeNik}</span></div>
                        <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.granteeAddress}</span></div>
                        <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK KEDUA (PENERIMA HIBAH)</b>.</p>
                    </div>
                </div>
            </div>

            <p>Dengan ini PIHAK PERTAMA menyatakan menghibahkan secara sukarela kepada PIHAK KEDUA, berupa objek hibah sebagai berikut:</p>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] break-inside-avoid">
                <p className="font-bold underline mb-1">{data.objectType}</p>
                <p className="leading-relaxed">{data.objectDetail}</p>
            </div>

            <p>Semenjak surat ini ditandatangani, maka objek hibah tersebut sepenuhnya menjadi hak milik PIHAK KEDUA. PIHAK PERTAMA menjamin bahwa objek hibah tersebut bebas dari sengketa atau tuntutan pihak lain.</p>
            
            <p>Demikian surat hibah ini dibuat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</p>
          </div>

          {/* TANDA TANGAN SEJAJAR SEMPURNA */}
          <div className="shrink-0 mt-auto pt-10 border-t-2 border-slate-100 break-inside-avoid">
             <div className="grid grid-cols-2 gap-10">
                {/* PIHAK KEDUA */}
                <div className="flex flex-col h-44 text-center">
                   <div className="h-6 mb-2"></div> 
                   <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Penerima Hibah (Pihak II),</p>
                   <div className="mt-auto">
                      <p className="font-bold underline uppercase tracking-tight leading-none">{data.granteeName}</p>
                      <p className="text-[9pt] italic mt-2 leading-tight">Penerima</p>
                   </div>
                </div>

                {/* PIHAK PERTAMA */}
                <div className="flex flex-col h-44 text-center">
                   <p className="text-[10pt] font-bold h-6 mb-2">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
                   <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Pemberi Hibah (Pihak I),</p>
                   <div className="mt-auto">
                      <div className="border border-slate-300 w-20 h-10 mx-auto mb-2 flex items-center justify-center text-[7pt] text-slate-400 italic">MATERAI 10.000</div>
                      <p className="font-bold underline uppercase tracking-tight leading-none">{data.grantorName}</p>
                      <p className="text-[9pt] italic mt-2 leading-tight">Pemberi</p>
                   </div>
                </div>
             </div>

             {/* SAKSI SEJAJAR DI BAWAH */}
             <div className="mt-12 text-center">
                <p className="text-[8pt] font-sans font-bold uppercase text-slate-400 mb-8 tracking-widest">Saksi-Saksi:</p>
                <div className="grid grid-cols-2 gap-10">
                   <p className="font-bold underline">({data.witness1})</p>
                   <p className="font-bold underline">({data.witness2})</p>
                </div>
             </div>
          </div>
        </>
      )}

      {templateId === 2 && (
        <div className="font-sans text-[10pt] text-slate-800 leading-relaxed">
           <div className="border-b-4 border-slate-900 pb-4 mb-8">
              <h1 className="text-3xl font-black uppercase text-slate-900">Surat Hibah</h1>
              <p className="text-slate-500">Nomor: {data.docNo}</p>
           </div>

           <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="mb-2 font-bold uppercase text-xs text-slate-400">Pihak Pemberi</p>
              <p className="font-bold text-lg">{data.grantorName}</p>
              <p className="text-sm text-slate-600">{data.grantorAddress}</p>
           </div>

           <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="mb-2 font-bold uppercase text-xs text-slate-400">Pihak Penerima</p>
              <p className="font-bold text-lg">{data.granteeName}</p>
              <p className="text-sm text-slate-600">{data.granteeAddress}</p>
           </div>

           <div className="mb-8">
              <p className="mb-2 font-bold uppercase text-xs text-slate-400">Objek Hibah</p>
              <p className="text-justify">{data.objectDetail}</p>
           </div>

           <div className="mt-12 flex justify-between items-end">
              <div className="text-center w-40">
                 <p className="mb-16 font-bold text-xs uppercase">Penerima</p>
                 <p className="font-bold border-b border-slate-900 pb-1">{data.granteeName}</p>
              </div>
              <div className="text-center w-40">
                 <p className="mb-4 font-bold text-xs uppercase">Pemberi</p>
                 <div className="border border-slate-300 w-16 h-10 mx-auto mb-2 text-[8px] flex items-center justify-center text-slate-400">MATERAI</div>
                 <p className="font-bold border-b border-slate-900 pb-1">{data.grantorName}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      <style jsx global>{`
        @media print {
          /* HILANGKAN HEADER/FOOTER BROWSER DENGAN MARGIN 0 */
          @page { size: A4; margin: 0; } 
          
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* KONTROL HALAMAN */
          .break-inside-avoid { page-break-inside: avoid !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white;
          }
          
          /* Reset container untuk print */
          #print-only-root > div {
             width: 100% !important;
             min-height: auto !important; 
             margin: 0 !important;
             padding: 0 !important; /* Padding dihandle oleh class print:p-[25mm] */
             box-shadow: none !important;
             border: none !important;
          }
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
               <Briefcase size={16} /> <span>GRANT LETTER EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600"/>}
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

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Gift size={14}/><h3 className="text-xs font-bold uppercase">Pemberi Hibah</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.grantorName} onChange={e => handleDataChange('grantorName', e.target.value)} placeholder="Nama Pemberi" />
              <input className="w-full p-2 border rounded text-xs" value={data.grantorNik} onChange={e => handleDataChange('grantorNik', e.target.value)} placeholder="NIK Pemberi" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.grantorAddress} onChange={e => handleDataChange('grantorAddress', e.target.value)} placeholder="Alamat Pemberi" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14}/><h3 className="text-xs font-bold uppercase">Penerima Hibah</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.granteeName} onChange={e => handleDataChange('granteeName', e.target.value)} placeholder="Nama Penerima" />
              <input className="w-full p-2 border rounded text-xs" value={data.granteeNik} onChange={e => handleDataChange('granteeNik', e.target.value)} placeholder="NIK Penerima" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.granteeAddress} onChange={e => handleDataChange('granteeAddress', e.target.value)} placeholder="Alamat Penerima" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><MapPin size={14}/><h3 className="text-xs font-bold uppercase">Objek Hibah</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.objectType} onChange={e => handleDataChange('objectType', e.target.value)} placeholder="Jenis (cth: Tanah)" />
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" value={data.objectDetail} onChange={e => handleDataChange('objectDetail', e.target.value)} placeholder="Detail Sertifikat, Lokasi, dsb..." />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><ShieldCheck size={14}/><h3 className="text-xs font-bold uppercase">Saksi & Kota</h3></div>
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                 <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
              </div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <HibahContent />
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

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <HibahContent />
         </div>
      </div>

    </div>
  );
}