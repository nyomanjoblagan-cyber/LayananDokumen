'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, Check, LayoutTemplate, MapPin, 
  User, Building2, ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function DomisiliPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Administrasi...</div>}>
      <DomisiliToolBuilder />
    </Suspense>
  );
}

function DomisiliToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    // SURAT
    no: '470 / 015 / 02.005 / 2026',
    date: new Date().toISOString().split('T')[0],
    
    // WILAYAH
    rt: '005',
    rw: '002',
    village: 'KELURAHAN JATIMULYA',
    district: 'KECAMATAN CILODONG',
    city: 'KOTA DEPOK',
    address_office: 'Jl. H. Dimun Raya BBM No. 10', // Alamat kantor desa/kelurahan
    
    // PEMOHON
    name: 'SURYADI',
    nik: '3276010203950004',
    ttl: 'Depok, 02 Maret 1995',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Karyawan Swasta',
    status: 'Kawin',
    citizenship: 'WNI',
    address: 'Kp. Sawah RT 005 RW 002, Jatimulya, Cilodong, Depok',
    
    // PEJABAT RT/RW (Template 1)
    nameRT: 'Bambang S.',
    nameRW: 'H. Maman',
    
    // PEJABAT LURAH (Template 2)
    lurahName: 'Drs. AWAN SETIAWAN, MM',
    lurahNIP: 'NIP. 19700505 199803 1 008'
  });

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Pengantar RT / RW", desc: "Format sederhana, tanda tangan Ketua RT & RW" },
    { id: 2, name: "Surat Keterangan Kelurahan", desc: "Format resmi dengan Kop Pemerintah" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: PENGANTAR RT/RW (SIMPLE) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-slate-900 h-full flex flex-col">
           {/* Header Simple */}
           <div className="text-center mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wide">PENGURUS RT {data.rt} RW {data.rw}</h2>
              <h1 className="text-xl font-black uppercase tracking-wider">{data.village}</h1>
              <div className="text-sm uppercase">{data.district} - {data.city}</div>
           </div>

           <div className="text-center mb-8 border-t-4 border-double border-black pt-4">
              <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN DOMISILI</h2>
              <div className="text-sm font-bold">Nomor: {data.no}</div>
           </div>

           <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini, Ketua RT {data.rt} / RW {data.rw} {data.village} {data.district} {data.city}, menerangkan bahwa:</p>
           
           <div className="ml-4 mb-4">
              <table className="w-full leading-snug">
                 <tbody>
                    <tr><td className="w-40 py-1">Nama Lengkap</td><td className="w-3 py-1">:</td><td className="font-bold py-1 uppercase">{data.name}</td></tr>
                    <tr><td className="py-1">NIK</td><td className="py-1">:</td><td className="py-1">{data.nik}</td></tr>
                    <tr><td className="py-1">Jenis Kelamin</td><td className="py-1">:</td><td className="py-1">{data.gender}</td></tr>
                    <tr><td className="py-1">Tempat/Tgl. Lahir</td><td className="py-1">:</td><td className="py-1">{data.ttl}</td></tr>
                    <tr><td className="py-1">Agama</td><td className="py-1">:</td><td className="py-1">{data.religion}</td></tr>
                    <tr><td className="py-1">Status Perkawinan</td><td className="py-1">:</td><td className="py-1">{data.status}</td></tr>
                    <tr><td className="py-1">Pekerjaan</td><td className="py-1">:</td><td className="py-1">{data.job}</td></tr>
                    <tr><td className="py-1 align-top">Alamat</td><td className="py-1 align-top">:</td><td className="py-1 align-top">{data.address}</td></tr>
                 </tbody>
              </table>
           </div>

           <p className="mb-4 text-justify">
              Adalah benar warga kami yang berdomisili di alamat tersebut di atas. Surat keterangan ini dibuat untuk keperluan administrasi dan sebagai tanda bukti diri.
           </p>

           <p className="mb-8 text-justify">
              Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           {/* TTD 2 KOLOM */}
           <div className="flex justify-between text-center mt-auto" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-48">
                 <p className="mb-20 font-bold">Ketua RT {data.rt}</p>
                 <p className="font-bold underline uppercase">{data.nameRT}</p>
              </div>
              <div className="w-48">
                 <p className="mb-1">{data.city.replace('KOTA ','').replace('KABUPATEN ','')}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                 <p className="mb-20 font-bold">Ketua RW {data.rw}</p>
                 <p className="font-bold underline uppercase">{data.nameRW}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: FORMAT KELURAHAN (RESMI) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-slate-900 h-full flex flex-col">
           {/* KOP RESMI */}
           <div className="text-center border-b-4 border-double border-black pb-3 mb-6 relative">
              {logo && (
                 <img src={logo} className="h-20 w-auto object-contain absolute left-0 top-0 print:left-4" />
              )}
              <div className="px-10">
                 <h3 className="text-lg uppercase tracking-wide font-bold leading-tight">{data.city}</h3>
                 <h2 className="text-xl uppercase tracking-wider font-black leading-tight">{data.district}</h2>
                 <h1 className="text-2xl uppercase tracking-widest font-black leading-tight">{data.village}</h1>
                 <div className="text-sm italic mt-1">{data.address_office}</div>
              </div>
           </div>

           {/* JUDUL */}
           <div className="text-center mb-6">
              <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN DOMISILI</h2>
              <div className="text-sm font-bold">Nomor: {data.no}</div>
           </div>

           {/* ISI */}
           <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini, Kepala {data.village.replace('KELURAHAN ', 'Kelurahan ').replace('DESA ', 'Desa ')} {data.district.replace('KECAMATAN ', 'Kecamatan ')} {data.city}, menerangkan dengan sebenarnya bahwa:</p>
           
           <div className="ml-4 mb-6">
              <table className="w-full leading-snug">
                 <tbody>
                    <tr><td className="w-40 py-1">Nama Lengkap</td><td className="w-3 py-1">:</td><td className="font-bold py-1 uppercase">{data.name}</td></tr>
                    <tr><td className="py-1">NIK</td><td className="py-1">:</td><td className="py-1">{data.nik}</td></tr>
                    <tr><td className="py-1">Tempat/Tgl. Lahir</td><td className="py-1">:</td><td className="py-1">{data.ttl}</td></tr>
                    <tr><td className="py-1">Jenis Kelamin</td><td className="py-1">:</td><td className="py-1">{data.gender}</td></tr>
                    <tr><td className="py-1">Kewarganegaraan</td><td className="py-1">:</td><td className="py-1">{data.citizenship}</td></tr>
                    <tr><td className="py-1">Agama</td><td className="py-1">:</td><td className="py-1">{data.religion}</td></tr>
                    <tr><td className="py-1">Status Perkawinan</td><td className="py-1">:</td><td className="py-1">{data.status}</td></tr>
                    <tr><td className="py-1">Pekerjaan</td><td className="py-1">:</td><td className="py-1">{data.job}</td></tr>
                    <tr><td className="py-1 align-top">Alamat</td><td className="py-1 align-top">:</td><td className="py-1 align-top">{data.address}</td></tr>
                 </tbody>
              </table>
           </div>

           <p className="mb-4 text-justify">
              Orang tersebut di atas adalah benar-benar warga penduduk {data.village} {data.district} {data.city} dan berdomisili pada alamat tersebut di atas.
           </p>

           <p className="mb-8 text-justify">
              Demikian Surat Keterangan Domisili ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           {/* TTD LURAH */}
           <div className="flex justify-end text-center mt-auto" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-72">
                 <p className="mb-1">Dikeluarkan di: {data.city.replace('KOTA ','').replace('KABUPATEN ','')}</p>
                 <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                 <p className="font-bold mb-20 uppercase">LURAH {data.village.replace('KELURAHAN ','')}</p>
                 <p className="font-bold underline uppercase">{data.lurahName}</p>
                 <p className="text-sm">{data.lurahNIP}</p>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } 
          .print-table tfoot { height: 20mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Keterangan Domisili <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Pengantar RT/RW' : 'Format Kelurahan'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Pengantar RT/RW</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Kelurahan</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* WILAYAH */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><MapPin size={12}/> Data Wilayah</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="flex gap-4 items-center">
                        <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0">
                           {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                        </div>
                        <div className="flex-1 space-y-2">
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan..." />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Desa/Kelurahan..." />
                        </div>
                     </div>
                     <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota/Kabupaten..." />
                     <div className="grid grid-cols-2 gap-3">
                        <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="RT" />
                        <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="RW" />
                     </div>
                     {templateId === 2 && <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address_office} onChange={e => handleDataChange('address_office', e.target.value)} placeholder="Alamat Kantor Desa..." />}
                  </div>
               </div>

               {/* DATA PEMOHON */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Data Warga</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">TTL</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.ttl} onChange={e => handleDataChange('ttl', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Status</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.status} onChange={e => handleDataChange('status', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Pejabat Penandatangan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     {templateId === 1 ? (
                        <div className="grid grid-cols-2 gap-3">
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ketua RT</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nameRT} onChange={e => handleDataChange('nameRT', e.target.value)} /></div>
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ketua RW</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nameRW} onChange={e => handleDataChange('nameRW', e.target.value)} /></div>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lurah/Kades</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.lurahName} onChange={e => handleDataChange('lurahName', e.target.value)} /></div>
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.lurahNIP} onChange={e => handleDataChange('lurahNIP', e.target.value)} /></div>
                        </div>
                     )}
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}