'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, Check, LayoutTemplate, MapPin, 
  User, Building2
} from 'lucide-react';
import Link from 'next/link';

export default function DomisiliPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Administrasi...</div>}>
      <DomisiliToolBuilder />
    </Suspense>
  );
}

function DomisiliToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
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

  // --- KOMPONEN KERTAS INTERNAL ---
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

  // --- ISI DOKUMEN (PREVIEW & PRINT SAMA) ---
  const DocumentContent = (
    <Kertas>
        {/* TEMPLATE 1: PENGANTAR RT/RW (SIMPLE) */}
        {templateId === 1 && (
          <div className="h-full flex flex-col font-serif">
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
             <div className="flex justify-between text-center mt-12">
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
        )}

        {/* TEMPLATE 2: FORMAT KELURAHAN (RESMI) */}
        {templateId === 2 && (
          <div className="h-full flex flex-col font-serif">
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
             <div className="flex justify-end text-center mt-auto">
                <div className="w-72">
                   <p className="mb-1">Dikeluarkan di: {data.city.replace('KOTA ','').replace('KABUPATEN ','')}</p>
                   <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                   <p className="font-bold mb-20 uppercase">LURAH {data.village.replace('KELURAHAN ','')}</p>
                   <p className="font-bold underline uppercase">{data.lurahName}</p>
                   <p className="text-sm">{data.lurahNIP}</p>
                </div>
             </div>
          </div>
        )}
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT */}
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Keterangan Domisili</h1>
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
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
          
          {/* Wilayah */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Wilayah</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                   </div>
                   <div className="flex-1">
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo (Untuk Kelurahan)</button>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">RT</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">RW</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kota/Kabupaten</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                </div>
                {templateId === 2 && (
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor Kelurahan</label>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.address_office} onChange={e => handleDataChange('address_office', e.target.value)} />
                   </div>
                )}
             </div>
          </div>

          {/* Data Pemohon */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Warga</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / KTP</label>
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
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Status Perkawinan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.status} onChange={e => handleDataChange('status', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kewarganegaraan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.citizenship} onChange={e => handleDataChange('citizenship', e.target.value)} />
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

          {/* Pengesahan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Pengesahan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
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
                      <label className="text-[10px] font-bold text-emerald-700 uppercase">Nama Lurah / Kades</label>
                      <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs font-bold mb-2" value={data.lurahName} onChange={e => handleDataChange('lurahName', e.target.value)} />
                      <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs" placeholder="NIP" value={data.lurahNIP} onChange={e => handleDataChange('lurahNIP', e.target.value)} />
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