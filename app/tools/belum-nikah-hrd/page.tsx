'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, Check, LayoutTemplate, 
  User, Shield, MapPin, Heart, FileText, ArrowLeftCircle, Edit3, Eye, Landmark
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BelumMenikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Desa...</div>}>
      <StatusToolBuilder />
    </Suspense>
  );
}

function StatusToolBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(2); // Default Kelurahan (Resmi)
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    // KOP SURAT
    govLevel: 'PEMERINTAH KOTA BANDUNG',
    district: 'KECAMATAN COBLONG',
    village: 'KELURAHAN DAGO',
    address_office: 'Jl. Ir. H. Juanda No. 100, Bandung',
    
    // META SURAT
    no: '474 / 088 / Kel-Dago / 2026',
    date: new Date().toISOString().split('T')[0],
    
    // DATA WARGA
    name: 'RIZKY RAMADHAN',
    nik: '3273010101980005',
    ttl: 'Bandung, 15 Agustus 1998',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Mahasiswa',
    address: 'Jl. Dago Asri I No. 5, RT 02 RW 04, Dago, Coblong',
    
    // STATUS SPESIFIK
    status: 'Belum Kawin', // Sesuai KTP
    statusDesc: 'Jejaka (Belum Pernah Menikah)', // Penjelas
    
    // KEPERLUAN
    purpose: 'Persyaratan Administrasi Pendaftaran Calon Pegawai Negeri Sipil (CPNS)',
    
    // PEJABAT
    nameRT: 'Asep Sunandar',
    nameRW: 'H. Cecep',
    signerName: 'Dra. Hj. NINING NINGSIH',
    signerNIP: 'NIP. 19750101 200003 2 001',
    signerTitle: 'LURAH DAGO'
  });

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  // AUTO PURPOSE
  const applyPurpose = (type: 'cpns' | 'tni' | 'kua') => {
    if (type === 'cpns') setData({...data, purpose: 'Persyaratan Administrasi Pemberkasan CPNS / BUMN'});
    if (type === 'tni') setData({...data, purpose: 'Persyaratan Administrasi Pendaftaran TNI / POLRI'});
    if (type === 'kua') setData({...data, purpose: 'Persyaratan Administrasi Pernikahan (N1) ke KUA'});
  };

  const TEMPLATES = [
    { id: 1, name: "Pengantar RT/RW", desc: "Surat pengantar untuk dibawa ke Kelurahan/KUA" },
    { id: 2, name: "Resmi Kelurahan", desc: "Format resmi Pemda" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: PENGANTAR RT/RW ---
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           <div className="text-center mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wide">PENGURUS RT ... RW ...</h2>
              <h1 className="text-xl font-black uppercase tracking-wider">{data.village}</h1>
              <div className="text-sm uppercase">{data.district} - {data.govLevel.replace('PEMERINTAH ','')}</div>
           </div>

           <div className="text-center mb-8 border-t-4 border-double border-black pt-4">
              <h2 className="font-bold text-lg uppercase underline">SURAT PENGANTAR / KETERANGAN</h2>
              <div className="text-sm font-bold">Nomor: ... / ... / RT / 20...</div>
           </div>

           <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini Ketua RT dan Ketua RW, menerangkan dengan sebenarnya bahwa:</p>
           
           <div className="ml-4 mb-4">
              <table className="w-full text-[11pt]">
                 <tbody>
                    <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.name}</td></tr>
                    <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.nik}</td></tr>
                    <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.ttl}</td></tr>
                    <tr><td className="py-0.5">Jenis Kelamin</td><td className="py-0.5">:</td><td className="py-0.5">{data.gender}</td></tr>
                    <tr><td className="py-0.5">Agama</td><td className="py-0.5">:</td><td className="py-0.5">{data.religion}</td></tr>
                    <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.job}</td></tr>
                    <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                 </tbody>
              </table>
           </div>

           <p className="mb-4 text-justify">
              Adalah benar warga kami yang berdomisili di alamat tersebut di atas. Berdasarkan pengamatan kami, yang bersangkutan berstatus:
           </p>

           <div className="text-center font-bold text-lg uppercase border-2 border-black py-2 mb-6 mx-8">
              {data.statusDesc.toUpperCase()}
           </div>

           <p className="mb-4 text-justify">
              Surat pengantar ini diberikan untuk keperluan: <br/>
              <strong>"{data.purpose}"</strong>
           </p>

           <p className="mb-8 text-justify">
              Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           <div className="flex justify-between text-center mt-12" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-48">
                 <p className="mb-20 font-bold">Ketua RT</p>
                 <p className="font-bold underline uppercase">{data.nameRT}</p>
              </div>
              <div className="w-48">
                 <p className="mb-1">{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                 <p className="mb-20 font-bold">Ketua RW</p>
                 <p className="font-bold underline uppercase">{data.nameRW}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: RESMI KELURAHAN ---
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           {/* KOP RESMI */}
           <div className="text-center border-b-4 border-double border-black pb-3 mb-6 relative">
              {logo ? (
                 <img src={logo} className="h-24 w-auto object-contain absolute left-4 top-0" alt="logo" />
              ) : null}
              <div className="px-10">
                 <h3 className="text-lg uppercase tracking-wide font-bold leading-tight">{data.govLevel}</h3>
                 <h2 className="text-xl uppercase tracking-wider font-black leading-tight">{data.district}</h2>
                 <h1 className="text-2xl uppercase tracking-widest font-black leading-tight">{data.village}</h1>
                 <div className="text-sm italic mt-1">{data.address_office}</div>
              </div>
           </div>

           {/* JUDUL */}
           <div className="text-center mb-6">
              <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN BELUM MENIKAH</h2>
              <div className="text-sm font-bold">Nomor: {data.no}</div>
           </div>

           <p className="mb-3 text-justify">
              Yang bertanda tangan di bawah ini, Kepala {data.village.replace('KELURAHAN ', 'Kelurahan ').replace('DESA ', 'Desa ')} {data.district.replace('KECAMATAN ', 'Kecamatan ')} {data.govLevel.replace('PEMERINTAH ', '')}, menerangkan bahwa:
           </p>
           
           <div className="ml-4 mb-4">
              <table className="w-full text-[11pt]">
                 <tbody>
                    <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.name}</td></tr>
                    <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.nik}</td></tr>
                    <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.ttl}</td></tr>
                    <tr><td className="py-0.5">Jenis Kelamin</td><td className="py-0.5">:</td><td className="py-0.5">{data.gender}</td></tr>
                    <tr><td className="py-0.5">Agama</td><td className="py-0.5">:</td><td className="py-0.5">{data.religion}</td></tr>
                    <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.job}</td></tr>
                    <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                 </tbody>
              </table>
           </div>

           <p className="mb-3 text-justify">
              Adalah benar-benar warga penduduk kami dan berdasarkan data yang ada serta pengakuan yang bersangkutan hingga saat surat ini dikeluarkan berstatus:
           </p>

           <div className="text-center font-bold text-lg border-y-2 border-black py-2 mb-4 mx-8 uppercase bg-slate-50 print:bg-transparent">
              "{data.statusDesc}"
           </div>

           <p className="mb-3 text-justify">
              Surat keterangan ini diberikan untuk keperluan: <br/>
              <strong>"{data.purpose}"</strong>
           </p>

           <p className="mb-6 text-justify">
              Demikian Surat Keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
           </p>

           {/* TTD */}
           <div className="flex justify-end text-center mt-8" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-72">
                 <p className="mb-1">Dikeluarkan di: {data.district.replace('KECAMATAN ','')}</p>
                 <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                 <p className="font-bold mb-20 uppercase">{data.signerTitle}</p>
                 <p className="font-bold underline uppercase">{data.signerName}</p>
                 <p className="text-sm">{data.signerNIP}</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Status Menikah <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Pengantar RT/RW' : 'Resmi Kelurahan'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Pengantar RT/RW</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Resmi Kelurahan</button>
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

               {/* KOP DESA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><MapPin size={12}/> Identitas Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="flex gap-4 items-center">
                        <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0">
                           {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                        </div>
                        <div className="flex-1 space-y-2">
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.govLevel} onChange={e => handleDataChange('govLevel', e.target.value)} placeholder="Pemkot/Pemkab..." />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan..." />
                        </div>
                     </div>
                     <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Desa/Kelurahan..." />
                     <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address_office} onChange={e => handleDataChange('address_office', e.target.value)} placeholder="Alamat Kantor..." />
                  </div>
               </div>

               {/* DATA WARGA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Data Pemohon</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Status KTP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold bg-slate-50" value={data.status} onChange={e => handleDataChange('status', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">TTL</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.ttl} onChange={e => handleDataChange('ttl', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* STATUS & KEPERLUAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Heart size={12}/> Status & Keperluan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-emerald-600">Keterangan Status (Isi Surat)</label>
                        <input className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800" value={data.statusDesc} onChange={e => handleDataChange('statusDesc', e.target.value)} />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-500 flex justify-between">Keperluan <span className="text-[9px] font-normal">Pilih Cepat:</span></label>
                        <div className="flex gap-1 mb-1">
                           <button onClick={() => applyPurpose('cpns')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">CPNS</button>
                           <button onClick={() => applyPurpose('tni')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">TNI/POLRI</button>
                           <button onClick={() => applyPurpose('kua')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">Nikah</button>
                        </div>
                        <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                     </div>
                  </div>
               </div>

               {/* PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Landmark size={12}/> Pejabat Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     {templateId === 1 ? (
                        <div className="grid grid-cols-2 gap-3">
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ketua RT</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nameRT} onChange={e => handleDataChange('nameRT', e.target.value)} /></div>
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ketua RW</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nameRW} onChange={e => handleDataChange('nameRW', e.target.value)} /></div>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} /></div>
                              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                           </div>
                           <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Pejabat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} /></div>
                           <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} /></div>
                              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.signerNIP} onChange={e => handleDataChange('signerNIP', e.target.value)} /></div>
                           </div>
                        </div>
                     )}
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

      {/* --- PRINT PORTAL --- */}
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