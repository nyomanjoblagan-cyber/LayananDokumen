'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Wallet, 
  User, Users, Baby, LayoutDashboard, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SKTMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Desa...</div>}>
      <SKTMToolBuilder />
    </Suspense>
  );
}

function SKTMToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(2);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    // KOP SURAT
    govLevel: 'PEMERINTAH KABUPATEN CIANJUR',
    district: 'KECAMATAN CIPANAS',
    village: 'DESA SINDANGLAYA',
    address_office: 'Jl. Raya Cipanas No. 25, Cianjur',
    
    // META SURAT
    no: '401 / 230 / Kessos / 2026',
    date: new Date().toISOString().split('T')[0],
    
    // KEPALA KELUARGA / WALI
    parentName: 'Ujang Saefudin',
    parentNik: '3203010101800001',
    parentTtl: 'Cianjur, 01 Januari 1980',
    parentJob: 'Buruh Harian Lepas',
    parentAddress: 'Kp. Pasir Cina RT 02 RW 06, Sindanglaya',
    parentIncome: 'Rp 800.000 (Tidak Menentu)',
    
    // YANG BERSANGKUTAN (ANAK/ISTRI)
    childName: 'Asep Saefudin',
    childNik: '3203010101100005',
    childTtl: 'Cianjur, 15 Mei 2010',
    childStatus: 'Anak Kandung / Pelajar',
    
    // KEPERLUAN
    purpose: 'Persyaratan Pengajuan Bantuan Kartu Indonesia Pintar (KIP) / Beasiswa Sekolah',
    
    // PEJABAT
    nameRT: 'Mamat S.',
    nameRW: 'H. Dedi',
    signerName: 'Drs. H. Mulyana',
    signerNIP: 'NIP. 19720505 199903 1 004',
    signerTitle: 'KEPALA DESA SINDANGLAYA'
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
    { id: 1, name: "Pengantar RT/RW", desc: "Surat pengantar untuk dibawa ke Kelurahan" },
    { id: 2, name: "Resmi Kelurahan (Compact)", desc: "Format resmi Pemda, muat 1 halaman" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
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
      
      {/* CSS PRINT - TOTAL RESET */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* HILANGKAN SCROLL DI BODY */
          }

          /* HILANGKAN VISUAL SCROLLBAR */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* WARNA TEXT JELAS */
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">SKTM Generator</h1>
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
          
          {/* Data Wilayah */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-600" />
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

          {/* Kepala Keluarga */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Kepala Keluarga / Wali</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat/Tgl Lahir</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentTtl} onChange={e => handleDataChange('parentTtl', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penghasilan Rata-rata</label>
                   <div className="flex items-center gap-2">
                      <Wallet size={16} className="text-emerald-600" />
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold text-emerald-700" value={data.parentIncome} onChange={e => handleDataChange('parentIncome', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Rumah</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Yang Bersangkutan (Anak) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Baby size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Anak / Yang Diajukan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="p-3 bg-blue-50 rounded border border-blue-100 text-[10px] text-blue-700 mb-2">
                   *Kosongkan bagian ini jika SKTM untuk diri sendiri (Kepala Keluarga).
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Anak/Anggota Keluarga</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childNik} onChange={e => handleDataChange('childNik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat/Tgl Lahir</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childTtl} onChange={e => handleDataChange('childTtl', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan Keluarga / Status</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.childStatus} onChange={e => handleDataChange('childStatus', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Keperluan & Pejabat */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Users size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Keperluan & Pengesahan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan SKTM (Keperluan)</label>
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

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: PENGANTAR RT/RW */}
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-normal">
                 {/* Header */}
                 <div className="text-center mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wide">PENGURUS RT ... RW ...</h2>
                    <h1 className="text-xl font-black uppercase tracking-wider">{data.village}</h1>
                    <div className="text-sm uppercase">{data.district} - {data.govLevel.replace('PEMERINTAH ','')}</div>
                 </div>

                 <div className="text-center mb-8 border-t-4 border-double border-black pt-4">
                    <h2 className="font-bold text-lg uppercase underline">SURAT PENGANTAR SKTM</h2>
                    <div className="text-sm font-bold">Nomor: ... / ... / RT / 20...</div>
                 </div>

                 <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini Ketua RT dan Ketua RW, menerangkan dengan sebenarnya bahwa:</p>
                 
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.parentName}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentNik}</td></tr>
                          <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentTtl}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentJob}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.parentAddress}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4 text-justify">
                    Adalah benar warga kami yang berdomisili di alamat tersebut di atas dan termasuk dalam kategori <strong>Keluarga Kurang Mampu (Pra Sejahtera)</strong> dengan penghasilan rata-rata {data.parentIncome}.
                 </p>

                 {data.childName && (
                    <>
                       <p className="mb-2 text-justify">Surat pengantar ini diberikan untuk keperluan <strong>{data.childName}</strong> (Anak/Tanggungan) dengan data sebagai berikut:</p>
                       <div className="ml-4 mb-4">
                          <table className="w-full leading-snug">
                             <tbody>
                                <tr><td className="w-40 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.childName}</td></tr>
                                <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.childNik}</td></tr>
                                <tr><td className="py-0.5">Status</td><td className="py-0.5">:</td><td className="py-0.5">{data.childStatus}</td></tr>
                             </tbody>
                          </table>
                       </div>
                    </>
                 )}

                 <p className="mb-4 text-justify">
                    Tujuan pembuatan surat: <br/>
                    <strong>"{data.purpose}"</strong>
                 </p>

                 <p className="mb-8 text-justify">
                    Demikian surat pengantar ini dibuat untuk dapat diproses lebih lanjut di Kantor Kelurahan/Desa.
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

            {/* TEMPLATE 2: RESMI KELURAHAN (COMPACT) */}
            {templateId === 2 && (
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
                    <div className="text-sm italic">{data.address_office}</div>
                 </div>

                 {/* JUDUL */}
                 <div className="text-center mb-6">
                    <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN TIDAK MAMPU</h2>
                    <div className="text-sm font-bold">Nomor: {data.no}</div>
                 </div>

                 {/* ISI */}
                 <p className="mb-3 text-justify">Yang bertanda tangan di bawah ini, Kepala {data.village.replace('KELURAHAN ', 'Kelurahan ').replace('DESA ', 'Desa ')} {data.district.replace('KECAMATAN ', 'Kecamatan ')} {data.govLevel.replace('PEMERINTAH ', '')}, menerangkan dengan sebenarnya bahwa:</p>
                 
                 {/* TABEL ORTU - RAPATKAN (py-0.5) */}
                 <div className="ml-4 mb-3">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.parentName}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentNik}</td></tr>
                          <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentTtl}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentJob}</td></tr>
                          <tr><td className="py-0.5">Penghasilan</td><td className="py-0.5">:</td><td className="py-0.5">{data.parentIncome}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.parentAddress}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-3 text-justify">
                    Berdasarkan data yang ada serta pengamatan kami, nama tersebut di atas adalah benar warga kami yang termasuk dalam kategori <strong>KELUARGA TIDAK MAMPU / PRA-SEJAHTERA</strong>.
                 </p>

                 {/* TABEL ANAK - KONDISIONAL & RAPAT */}
                 {data.childName && (
                    <>
                       <p className="mb-2 text-justify">Surat keterangan ini diberikan untuk keperluan anggota keluarga / anak yang bersangkutan:</p>
                       <div className="ml-4 mb-3">
                          <table className="w-full leading-snug">
                             <tbody>
                                <tr><td className="w-40 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.childName}</td></tr>
                                <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.childNik}</td></tr>
                                <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.childTtl}</td></tr>
                                <tr><td className="py-0.5">Status</td><td className="py-0.5">:</td><td className="py-0.5">{data.childStatus}</td></tr>
                             </tbody>
                          </table>
                       </div>
                    </>
                 )}

                 <p className="mb-3 text-justify">
                    Keterangan ini dibuat untuk keperluan: <br/>
                    <strong>"{data.purpose}"</strong>
                 </p>

                 <p className="mb-6 text-justify">
                    Demikian Surat Keterangan Tidak Mampu (SKTM) ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
                 </p>

                 {/* TTD - MARGIN AMAN */}
                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-72">
                       <p className="mb-1">Dikeluarkan di: {data.district.replace('KECAMATAN ','')}</p>
                       <p className="mb-4">Pada Tanggal: {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="font-bold mb-16 uppercase">{data.signerTitle}</p>
                       <p className="font-bold underline uppercase">{data.signerName}</p>
                       <p className="text-sm">{data.signerNIP}</p>
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