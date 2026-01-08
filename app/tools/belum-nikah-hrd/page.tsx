'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, Check, LayoutTemplate, 
  User, Shield, MapPin, Heart, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function BelumMenikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Desa...</div>}>
      <StatusToolBuilder />
    </Suspense>
  );
}

function StatusToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(2); // Default Kelurahan (Resmi)
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
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
    { id: 2, name: "Resmi Kelurahan (Compact)", desc: "Format resmi Pemda, muat 1 halaman" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS INTERNAL (Supaya Layout Print Aman) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] h-[296mm] 
      bg-white shadow-2xl print:shadow-none 
      p-[25mm] mx-auto 
      text-slate-900 font-serif leading-relaxed text-[11pt]
      overflow-hidden relative
      mb-8 print:mb-0 print:mt-0 
      ${className}
    `}>
      {children}
    </div>
  );

  // --- ISI DOKUMEN (Disimpan di variabel agar Preview & Print SAMA) ---
  const DocumentContent = (
    <Kertas>
        {/* TEMPLATE 1: PENGANTAR RT/RW */}
        {templateId === 1 && (
          <div className="h-full flex flex-col font-serif">
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
                <table className="w-full leading-snug">
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

             <div className="flex justify-between text-center mt-12">
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
        )}

        {/* TEMPLATE 2: RESMI KELURAHAN */}
        {templateId === 2 && (
          <div className="h-full flex flex-col font-serif">
             {/* KOP RESMI */}
             <div className="text-center border-b-4 border-double border-black pb-3 mb-6 relative">
                {logo && (
                    // Logo diposisikan absolut agar tidak menggeser teks header
                    <img src={logo} className="h-20 w-auto object-contain absolute left-0 top-0 print:left-4" />
                )}
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
                <table className="w-full leading-snug">
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
             <div className="flex justify-end text-center mt-auto">
                <div className="w-72">
                   <p className="mb-1">Dikeluarkan di: {data.district.replace('KECAMATAN ','')}</p>
                   <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                   <p className="font-bold mb-20 uppercase">{data.signerTitle}</p>
                   <p className="font-bold underline uppercase">{data.signerName}</p>
                   <p className="text-sm">{data.signerNIP}</p>
                </div>
             </div>
          </div>
        )}
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT (WAJIB ADA) */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg print:hidden sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Keterangan Belum Menikah</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
          
          {/* Data Wilayah */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Wilayah & Kop</h3>
             </div>
             <div className="p-4 space-y-4">
                {templateId === 2 && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                    </div>
                    <div className="flex-1">
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Lambang Daerah</button>
                      <div className="text-[9px] text-slate-400 mt-1">Format PNG/JPG (Transparan lebih baik)</div>
                    </div>
                  </div>
                )}
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pemerintah Kab/Kota</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold uppercase" value={data.govLevel} onChange={e => handleDataChange('govLevel', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                   </div>
                </div>
                {templateId === 2 && (
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor</label>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.address_office} onChange={e => handleDataChange('address_office', e.target.value)} />
                   </div>
                )}
             </div>
          </div>

          {/* Data Pemohon */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Yang Bersangkutan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.gender} onChange={e => handleDataChange('gender', e.target.value)} />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat/Tgl Lahir</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.ttl} onChange={e => handleDataChange('ttl', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Status & Keperluan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Heart size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Status & Keperluan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Status KTP</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold bg-slate-50" value={data.status} onChange={e => handleDataChange('status', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-emerald-600 uppercase">Keterangan Status</label>
                      <input type="text" className="w-full p-2 border border-emerald-300 rounded text-xs font-bold text-emerald-800" value={data.statusDesc} onChange={e => handleDataChange('statusDesc', e.target.value)} />
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                      Keperluan
                      <span className="text-[9px] font-normal normal-case">Pilih Cepat:</span>
                   </label>
                   <div className="flex gap-1 mb-1">
                      <button onClick={() => applyPurpose('cpns')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">CPNS</button>
                      <button onClick={() => applyPurpose('tni')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">TNI/POLRI</button>
                      <button onClick={() => applyPurpose('kua')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[9px] border">Nikah</button>
                   </div>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                </div>

                {templateId === 1 ? (
                   <div className="grid grid-cols-2 gap-3 bg-blue-50 p-3 rounded border border-blue-100">
                      <div>
                         <label className="text-[10px] font-bold text-blue-700 uppercase">Nama Ketua RT</label>
                         <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs font-bold" value={data.nameRT} onChange={e => handleDataChange('nameRT', e.target.value)} />
                      </div>
                      <div>
                         <label className="text-[10px] font-bold text-blue-700 uppercase">Nama Ketua RW</label>
                         <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs font-bold" value={data.nameRW} onChange={e => handleDataChange('nameRW', e.target.value)} />
                      </div>
                   </div>
                ) : (
                   <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                      <label className="text-[10px] font-bold text-emerald-700 uppercase">Pejabat Penanda Tangan</label>
                      <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs font-bold mb-1" placeholder="Nama Pejabat" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} />
                      <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs mb-1" placeholder="Jabatan (LURAH/KADES)" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} />
                      <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs" placeholder="NIP" value={data.signerNIP} onChange={e => handleDataChange('signerNIP', e.target.value)} />
                   </div>
                )}
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW (ALL-IN-ONE) --- */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20">
             <div className="w-[210mm] origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform">
                {DocumentContent}
             </div>
        </div>

      </div>

      {/* PRINT AREA (Hidden in view, visible in print) */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
          {DocumentContent}
      </div>

    </div>
  );
}