'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Building2, 
  User, MapPin, FileBadge, Store, ChevronDown, Check, Edit3, Eye, ImagePlus, X
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function SKUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor SKU...</div>}>
      <SKUToolBuilder />
    </Suspense>
  );
}

function SKUToolBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    govLevel: 'PEMERINTAH KABUPATEN BOGOR',
    district: 'KECAMATAN CIBINONG',
    village: 'KELURAHAN PAKANSARI',
    address_office: 'Jl. Raya Cikaret No. 1, Cibinong - 16915',
    city: 'Cibinong',
    no: '503 / 125 / Ekbang / 2026',
    date: '',
    name: 'Budi Santoso',
    nik: '3201021205900001',
    ttl: 'Bogor, 12 Mei 1990',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Wiraswasta',
    address: 'Kp. Curug RT 02 RW 05, Pakansari, Cibinong',
    businessName: 'WARUNG SEMBAKO "BERKAH"',
    businessType: 'Perdagangan Eceran / Kelontong',
    businessAddress: 'Jl. Raya Jakarta-Bogor KM 45 (Depan Pabrik Garmen)',
    since: '2020',
    purpose: 'Persyaratan Administrasi Pengajuan Kredit Usaha Rakyat (KUR) Bank BRI',
    signerName: 'Drs. H. Asep Saepudin, M.Si',
    signerNIP: 'NIP. 19750817 200003 1 005',
    signerTitle: 'LURAH PAKANSARI'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: string) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Formal", desc: "Layout resmi pemerintahan" },
    { id: 2, name: "Format Ringkas", desc: "Desain simpel untuk koperasi/umum" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP SURAT RESMI (Template 1) */}
      {templateId === 1 && (
        <div className="flex items-center border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center relative">
          {logo && <img src={logo} alt="Logo" className="w-20 h-20 object-contain absolute left-0 top-0" />}
          <div className="flex-grow px-20">
             <h3 className="text-[11pt] font-bold uppercase leading-tight">{data.govLevel}</h3>
             <h2 className="text-[13pt] font-black uppercase leading-tight">{data.district}</h2>
             <h1 className="text-[16pt] font-black uppercase leading-tight tracking-widest">{data.village}</h1>
             <p className="text-[8pt] font-sans mt-1 italic text-slate-600 print:text-black leading-tight">{data.address_office}</p>
          </div>
        </div>
      )}

      {/* HEADER RINGKAS (Template 2) */}
      {templateId === 2 && (
        <div className="flex justify-between items-start mb-8 border-b-2 border-slate-100 pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">SKU</h1>
            <p className="text-[8pt] text-slate-400 font-mono mt-1 tracking-widest uppercase">Business Certificate</p>
          </div>
          <div className="text-right">
             <p className="text-[9pt] font-bold uppercase">{data.village}</p>
             <p className="text-[8pt] text-slate-500">{data.no}</p>
          </div>
        </div>
      )}

      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN USAHA</h2>
        {templateId === 1 && <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.no}</p>}
      </div>

      {/* BODY SURAT */}
      <div className="space-y-4 flex-grow overflow-hidden text-left text-[10.5pt]">
        <p className="text-justify leading-relaxed">Yang bertanda tangan di bawah ini, Kepala {data.village} {data.district} {data.govLevel.replace('PEMERINTAH ','')}, menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-slate-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.name}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span>{data.nik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.ttl}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.address}</span></div>
        </div>

        <p className="text-justify leading-relaxed">Adalah benar yang bersangkutan penduduk yang berdomisili di wilayah kami dan berdasarkan pengamatan kami, benar memiliki usaha sebagai berikut:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 print:bg-transparent print:border-black space-y-1">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Usaha</span><span>:</span><span className="font-black uppercase tracking-tight text-blue-800 print:text-black">{data.businessName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis / Bidang</span><span>:</span><span>{data.businessType}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tahun Berdiri</span><span>:</span><span>Sejak Tahun {data.since}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Usaha</span><span>:</span><span className="italic">{data.businessAddress}</span></div>
        </div>

        <p className="leading-relaxed">Surat Keterangan Usaha ini dibuat untuk memenuhi keperluan:<br/><b className="italic">"{data.purpose}"</b></p>

        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="flex justify-end text-center">
            <div className="w-80 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">{data.signerTitle},</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
                  <p className="text-[9pt] font-sans mt-1">{data.signerNIP}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Store size={16} /> <span>SKU Official Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative font-sans">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Wilayah Penerbit</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden group shrink-0">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Penerbit" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Pemilik</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat KTP" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-400 border-b pb-1 flex items-center gap-2"><Store size={12}/> Detail Usaha</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} placeholder="Bidang Usaha" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.businessAddress} onChange={e => handleDataChange('businessAddress', e.target.value)} placeholder="Lokasi Usaha" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileBadge size={12}/> Legalitas</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Pejabat" />
              <input className="w-full p-2 border rounded text-xs" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} placeholder="Jabatan Pejabat" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print preview-container ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}