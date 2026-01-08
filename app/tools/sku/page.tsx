'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Building2, 
  User, MapPin, FileBadge, Store, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SKUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Desa...</div>}>
      <SKUToolBuilder />
    </Suspense>
  );
}

function SKUToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    // KOP SURAT
    govLevel: 'PEMERINTAH KABUPATEN BOGOR',
    district: 'KECAMATAN CIBINONG',
    village: 'KELURAHAN PAKANSARI',
    address_office: 'Jl. Raya Cikaret No. 1, Cibinong - 16915',
    
    // META SURAT
    no: '503 / 125 / Ekbang / 2026',
    date: new Date().toISOString().split('T')[0],
    
    // PEMOHON (WARGA)
    name: 'Budi Santoso',
    nik: '3201021205900001',
    ttl: 'Bogor, 12 Mei 1990',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Wiraswasta',
    address: 'Kp. Curug RT 02 RW 05, Pakansari, Cibinong',
    
    // DATA USAHA
    businessName: 'WARUNG SEMBAKO "BERKAH"',
    businessType: 'Perdagangan Eceran / Kelontong',
    businessAddress: 'Jl. Raya Jakarta-Bogor KM 45 (Depan Pabrik Garmen)',
    since: '2020',
    
    // KEPERLUAN
    purpose: 'Persyaratan Administrasi Pengajuan Kredit Usaha Rakyat (KUR) Bank BRI',
    
    // PEJABAT
    signerName: 'Drs. H. Asep Saepudin, M.Si',
    signerNIP: 'NIP. 19750817 200003 1 005',
    signerTitle: 'LURAH PAKANSARI'
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
    { id: 1, name: "Format Kelurahan (Compact)", desc: "Standar birokrasi, muat 1 halaman" },
    { id: 2, name: "Format Umum/Koperasi", desc: "Lebih sederhana, tanpa kop pemerintah" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (STABIL) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[25mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[25mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SCALING AMAN */
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white; overflow: hidden !important; }
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          header, nav, .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Keterangan Usaha (SKU)</h1>
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
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Data Wilayah (Hanya Template 1) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Kop / Instansi</h3>
             </div>
             <div className="p-4 space-y-4">
                {templateId === 1 && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                    </div>
                    <div className="flex-1">
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Lambang</button>
                    </div>
                  </div>
                )}
                {templateId === 1 && (
                  <>
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
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kelurahan/Desa</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor</label>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                    </div>
                  </>
                )}
                {templateId === 2 && (
                   <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-200">
                      Template ini tidak menggunakan Kop Surat Pemerintah. Cocok untuk penggunaan umum/koperasi.
                   </div>
                )}
             </div>
          </div>

          {/* Data Pemohon */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas Pemohon</h3>
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
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan (KTP)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Data Usaha */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Store size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Usaha</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="p-3 bg-blue-50 rounded border border-blue-100 space-y-3">
                   <div>
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Nama / Jenis Usaha</label>
                      <input type="text" className="w-full p-2 border border-blue-200 rounded text-sm font-bold text-slate-700" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Bidang Usaha</label>
                      <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Alamat Lokasi Usaha</label>
                      <textarea className="w-full p-2 border border-blue-200 rounded text-xs h-14 resize-none" value={data.businessAddress} onChange={e => handleDataChange('businessAddress', e.target.value)} />
                   </div>
                   <div className="flex gap-2 items-center">
                      <label className="text-[10px] font-bold text-blue-700 uppercase w-24 shrink-0">Usaha Sejak</label>
                      <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs" value={data.since} onChange={e => handleDataChange('since', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Keperluan & Pengesahan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileBadge size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Keperluan & TTD</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Surat (Untuk apa?)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
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

                <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                   <label className="text-[10px] font-bold text-emerald-700 uppercase">Pejabat Penanda Tangan</label>
                   <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs font-bold mb-1" placeholder="Nama Pejabat" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} />
                   <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs mb-1" placeholder="Jabatan (LURAH/KADES)" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} />
                   <input type="text" className="w-full p-2 border border-emerald-200 rounded text-xs" placeholder="NIP (Jika Ada)" value={data.signerNIP} onChange={e => handleDataChange('signerNIP', e.target.value)} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: KELURAHAN/DESA (COMPACT VERSION) */}
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-normal">
                 {/* KOP RESMI - LEBIH RAPAT */}
                 <div className="text-center border-b-4 border-double border-black pb-3 mb-4">
                    <div className="flex items-center justify-center gap-4 mb-1">
                       {logo && <img src={logo} className="h-16 w-auto object-contain absolute left-[25mm] top-[25mm]" />}
                       <div>
                          <h3 className="text-lg uppercase tracking-wide font-bold leading-tight">{data.govLevel}</h3>
                          <h2 className="text-xl uppercase tracking-wider font-black leading-tight">{data.district}</h2>
                          <h1 className="text-2xl uppercase tracking-widest font-black leading-tight">{data.village}</h1>
                       </div>
                    </div>
                    <div className="text-sm italic">{data.address}</div>
                 </div>

                 {/* JUDUL */}
                 <div className="text-center mb-6">
                    <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN USAHA</h2>
                    <div className="text-sm font-bold">Nomor: {data.no}</div>
                 </div>

                 {/* ISI */}
                 <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini, Kepala {data.village.replace('KELURAHAN ', 'Kelurahan ').replace('DESA ', 'Desa ')} {data.district.replace('KECAMATAN ', 'Kecamatan ')} {data.govLevel.replace('PEMERINTAH ', '')}, menerangkan bahwa:</p>
                 
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
                    Adalah benar yang bersangkutan penduduk yang berdomisili di lingkungan kami dan berdasarkan pengamatan kami serta pengakuan yang bersangkutan, benar memiliki usaha sebagai berikut:
                 </p>

                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-40 py-0.5">Nama Usaha</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.businessName}</td></tr>
                          <tr><td className="py-0.5">Jenis Usaha</td><td className="py-0.5">:</td><td className="py-0.5">{data.businessType}</td></tr>
                          <tr><td className="py-0.5">Mulai Usaha</td><td className="py-0.5">:</td><td className="py-0.5">Tahun {data.since}</td></tr>
                          <tr><td className="py-0.5 align-top">Lokasi Usaha</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.businessAddress}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4 text-justify">
                    Surat Keterangan Usaha ini diberikan untuk keperluan: <br/>
                    <strong>"{data.purpose}"</strong>
                 </p>

                 <p className="mb-8 text-justify">
                    Demikian Surat Keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
                 </p>

                 {/* TTD - MARGIN AMAN */}
                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-72">
                       <p className="mb-1">Dikeluarkan di: {data.address.split(',')[0].split('Jl.')[0].trim() || 'Tempat'}</p>
                       <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="font-bold mb-20 uppercase">{data.signerTitle}</p>
                       <p className="font-bold underline uppercase">{data.signerName}</p>
                       <p className="text-sm">{data.signerNIP}</p>
                    </div>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: UMUM / KOPERASI (COMPACT) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-relaxed h-full flex flex-col">
                 {/* Header Simple */}
                 <div className="border-b-2 border-slate-200 pb-3 mb-6 flex justify-between items-center">
                    <div>
                       <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-1">SURAT KETERANGAN USAHA</h1>
                       <div className="text-sm text-slate-500 font-medium">Ref No: {data.no}</div>
                    </div>
                    {logo && <img src={logo} className="h-10 w-auto grayscale opacity-50" />}
                 </div>

                 <div className="mb-6">
                    <p className="mb-2">Pihak yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                       <div className="grid grid-cols-[100px_10px_1fr] gap-1 mb-1">
                          <span className="text-slate-500">Nama</span><span>:</span><span className="font-bold text-slate-900 uppercase">{data.name}</span>
                       </div>
                       <div className="grid grid-cols-[100px_10px_1fr] gap-1 mb-1">
                          <span className="text-slate-500">NIK</span><span>:</span><span className="font-mono text-slate-900">{data.nik}</span>
                       </div>
                       <div className="grid grid-cols-[100px_10px_1fr] gap-1">
                          <span className="text-slate-500">Alamat</span><span>:</span><span className="text-slate-900">{data.address}</span>
                       </div>
                    </div>
                 </div>

                 <div className="mb-6">
                    <p className="mb-2">Benar memiliki dan menjalankan usaha dengan rincian:</p>
                    <div className="border-l-4 border-blue-600 pl-6 py-2">
                       <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Nama Usaha</div>
                       <div className="text-lg font-bold text-slate-800 mb-3">{data.businessName}</div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Jenis</div>
                             <div className="font-medium text-slate-700">{data.businessType}</div>
                          </div>
                          <div>
                             <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Sejak Tahun</div>
                             <div className="font-medium text-slate-700">{data.since}</div>
                          </div>
                       </div>
                       <div className="mt-3">
                          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Alamat Usaha</div>
                          <div className="font-medium text-slate-700">{data.businessAddress}</div>
                       </div>
                    </div>
                 </div>

                 <div className="mb-8">
                    <p className="mb-2">Keterangan ini dibuat untuk keperluan:</p>
                    <p className="font-bold italic text-slate-700">"{data.purpose}"</p>
                 </div>

                 <div className="mt-auto flex justify-end">
                    <div className="text-center w-64">
                       <div className="text-xs text-slate-400 mb-1">{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</div>
                       <div className="text-xs font-bold text-slate-500 uppercase mb-16">Mengetahui,</div>
                       <div className="font-bold text-slate-900 border-b border-slate-300 pb-1">{data.signerName}</div>
                       <div className="text-xs text-slate-500 mt-1 uppercase">{data.signerTitle}</div>
                    </div>
                 </div>
              </div>
            )}

          </Kertas>

        </div>
      </div>
    </div>
  );
}