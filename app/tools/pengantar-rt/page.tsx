'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, MapPin, 
  User, FileText, Heart, Shield, Truck, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function PengantarRTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem RT/RW...</div>}>
      <PengantarToolBuilder />
    </Suspense>
  );
}

function PengantarToolBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // WILAYAH
    rt: '005',
    rw: '012',
    village: 'KELURAHAN SUKAMAJU',
    district: 'KECAMATAN CILODONG',
    city: 'DEPOK',
    
    // SURAT
    no: '025 / RT.005 / I / 2026',
    date: new Date().toISOString().split('T')[0],
    
    // WARGA
    name: 'Budi Santoso',
    nik: '3276010101900001',
    ttl: 'Jakarta, 01 Januari 1990',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Karyawan Swasta',
    status: 'Kawin',
    citizenship: 'WNI',
    address: 'Jl. Melati III No. 45, RT 005 RW 012, Sukamaju',
    
    // KEPERLUAN
    purpose: 'Pengurusan Perpanjangan KTP Elektronik dan Pembaruan Kartu Keluarga (KK)',
    remark: '-', // Keterangan lain
    
    // PEJABAT
    nameRT: 'Suparman',
    nameRW: 'H. Junaedi'
  });

  // LOGIC AUTO TEXT
  const applyPurpose = (type: 'ktp' | 'skck' | 'nikah' | 'pindah') => {
    if (type === 'ktp') {
      setData(prev => ({ ...prev, purpose: 'Permohonan Pembuatan / Perpanjangan KTP Elektronik dan Kartu Keluarga (KK).' }));
    } else if (type === 'skck') {
      setData(prev => ({ ...prev, purpose: 'Permohonan Surat Keterangan Catatan Kepolisian (SKCK) untuk melamar pekerjaan.' }));
    } else if (type === 'nikah') {
      setData(prev => ({ ...prev, purpose: 'Pengurusan Administrasi Pernikahan (N1, N2, N4) ke Kantor Urusan Agama (KUA).' }));
    } else if (type === 'pindah') {
      setData(prev => ({ ...prev, purpose: 'Permohonan Surat Keterangan Pindah Datang / Pindah Keluar Domisili.' }));
    }
  };

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar (Umum)", desc: "Layout klasik yang dipakai 90% RT di Indonesia" },
    { id: 2, name: "Format Tabel (Rapi)", desc: "Menggunakan kotak tabel agar lebih terstruktur" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (FINAL ANTI SCROLLBAR) ---
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Pengantar RT/RW</h1>
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
          
          {/* Quick Generator */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <FileText size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Keperluan</h3>
             </div>
             <div className="p-4 grid grid-cols-2 gap-2">
                <button onClick={() => applyPurpose('ktp')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <User size={12}/> KTP / KK
                </button>
                <button onClick={() => applyPurpose('skck')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Shield size={12}/> SKCK Polisi
                </button>
                <button onClick={() => applyPurpose('nikah')} className="bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Heart size={12}/> Nikah (KUA)
                </button>
                <button onClick={() => applyPurpose('pindah')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Truck size={12}/> Pindah Rumah
                </button>
             </div>
          </div>

          {/* Wilayah */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Wilayah</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor RT</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor RW</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota/Kabupaten</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Data Warga */}
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
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Keperluan & Pengesahan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileText size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Keperluan & Tanda Tangan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Surat</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Keterangan Lain (Opsional)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.remark} onChange={e => handleDataChange('remark', e.target.value)} />
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
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: STANDAR UMUM */}
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-normal">
                 {/* Header */}
                 <div className="text-center mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wide">PENGURUS RT {data.rt} RW {data.rw}</h2>
                    <h1 className="text-xl font-black uppercase tracking-wider">{data.village}</h1>
                    <div className="text-sm uppercase">{data.district} - {data.city}</div>
                 </div>

                 <div className="text-center mb-8 border-t-4 border-double border-black pt-4">
                    <h2 className="font-bold text-lg uppercase underline">SURAT PENGANTAR</h2>
                    <div className="text-sm font-bold">Nomor: {data.no}</div>
                 </div>

                 <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini Ketua RT {data.rt} RW {data.rw} {data.village} {data.district} {data.city}, menerangkan bahwa:</p>
                 
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.name}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.nik}</td></tr>
                          <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td className="py-0.5">:</td><td className="py-0.5">{data.ttl}</td></tr>
                          <tr><td className="py-0.5">Jenis Kelamin</td><td className="py-0.5">:</td><td className="py-0.5">{data.gender}</td></tr>
                          <tr><td className="py-0.5">Agama</td><td className="py-0.5">:</td><td className="py-0.5">{data.religion}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.job}</td></tr>
                          <tr><td className="py-0.5">Status Perkawinan</td><td className="py-0.5">:</td><td className="py-0.5">{data.status}</td></tr>
                          <tr><td className="py-0.5">Kewarganegaraan</td><td className="py-0.5">:</td><td className="py-0.5">{data.citizenship}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4 text-justify">
                    Orang tersebut di atas adalah benar-benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk keperluan:
                 </p>

                 <div className="ml-4 mb-6 pr-4 border-l-4 border-slate-300 pl-4 py-2 italic font-bold text-slate-800">
                    "{data.purpose}"
                 </div>

                 {data.remark !== '-' && (
                    <p className="mb-4 text-justify">
                       Keterangan Lain: {data.remark}
                    </p>
                 )}

                 <p className="mb-8 text-justify">
                    Demikian surat pengantar ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
                 </p>

                 {/* TTD 2 KOLOM */}
                 <div className="flex justify-between text-center mt-12">
                    <div className="w-48">
                       <p className="mb-20 font-bold">Mengetahui,<br/>Ketua RW {data.rw}</p>
                       <p className="font-bold underline uppercase">{data.nameRW}</p>
                    </div>
                    <div className="w-48">
                       <p className="mb-1">{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="mb-20 font-bold">Ketua RT {data.rt}</p>
                       <p className="font-bold underline uppercase">{data.nameRT}</p>
                    </div>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: FORMAT TABEL (RAPI) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-normal">
                 {/* Header Simple */}
                 <div className="border-b-2 border-black pb-4 mb-6 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-wider">RUKUN TETANGGA {data.rt} RUKUN WARGA {data.rw}</h2>
                    <h3 className="text-lg font-bold uppercase">{data.village}</h3>
                    <div className="text-sm uppercase">{data.district} - {data.city}</div>
                 </div>

                 <div className="text-center mb-6">
                    <h1 className="text-xl font-black uppercase underline">SURAT PENGANTAR</h1>
                    <div className="text-sm font-bold">No: {data.no}</div>
                 </div>

                 <p className="mb-4">Pengurus RT {data.rt} RW {data.rw} dengan ini menerangkan bahwa:</p>

                 <div className="border border-black mb-6">
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2">
                       <div>Nama Lengkap</div><div>:</div><div className="font-bold uppercase">{data.name}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2 bg-slate-50">
                       <div>NIK</div><div>:</div><div>{data.nik}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2">
                       <div>Tempat/Tgl Lahir</div><div>:</div><div>{data.ttl}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2 bg-slate-50">
                       <div>Jenis Kelamin</div><div>:</div><div>{data.gender}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2">
                       <div>Pekerjaan</div><div>:</div><div>{data.job}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2 bg-slate-50">
                       <div>Agama</div><div>:</div><div>{data.religion}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] border-b border-black p-2">
                       <div>Status</div><div>:</div><div>{data.status}</div>
                    </div>
                    <div className="grid grid-cols-[140px_10px_1fr] p-2 bg-slate-50">
                       <div>Alamat</div><div>:</div><div>{data.address}</div>
                    </div>
                 </div>

                 <div className="mb-6">
                    <p className="mb-2 font-bold">Keperluan:</p>
                    <div className="border-2 border-black p-4 font-bold text-center uppercase">
                       {data.purpose}
                    </div>
                 </div>

                 <p className="mb-8 text-justify">
                    Demikian surat pengantar ini diberikan untuk dapat dipergunakan semestinya oleh yang bersangkutan.
                 </p>

                 <div className="flex justify-between text-center mt-12">
                    <div className="w-48">
                       <p className="mb-20 font-bold">Ketua RW {data.rw}</p>
                       <p className="font-bold border-b border-black inline-block px-4">{data.nameRW}</p>
                    </div>
                    <div className="w-48">
                       <p className="mb-1">{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="mb-20 font-bold">Ketua RT {data.rt}</p>
                       <p className="font-bold border-b border-black inline-block px-4">{data.nameRT}</p>
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