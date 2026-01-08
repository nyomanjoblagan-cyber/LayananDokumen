'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, 
  LayoutTemplate, ShieldCheck, FileText, MapPin, User
} from 'lucide-react';
import Link from 'next/link';

export default function BelumMenikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <BelumMenikahBuilder />
    </Suspense>
  );
}

function BelumMenikahBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const [data, setData] = useState({
    provinsi: 'JAWA BARAT',
    kabupaten: 'BANDUNG',
    kecamatan: 'CIWIDEY',
    desa: 'LEBAKMUNCANG',
    kodePos: '40973',
    noSurat: '470/001/Desa/I/2026',
    
    // Data Warga
    nama: 'ANDI SETIAWAN',
    nik: '3204123456780001',
    tempatLahir: 'Bandung',
    tglLahir: '1998-05-20',
    kelamin: 'Laki-laki',
    pekerjaan: 'Wiraswasta',
    alamat: 'Kp. Baru RT 01 RW 05 Desa Lebakmuncang',
    agama: 'Islam',

    // Metadata
    tglSurat: new Date().toISOString().split('T')[0],
    kepalaDesa: 'H. MULYANA',
    jabatan: 'Kepala Desa',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] mx-auto box-border mb-10 relative print:shadow-none print:m-0 print:p-[15mm] print:static">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white sticky top-0 z-50 h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all">
              <ArrowLeft size={18} /> <span className="text-sm font-medium text-nowrap">Beranda</span>
            </Link>
            <div className="h-6 w-px bg-slate-700"></div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-orange-400">Ket. Belum Menikah</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase flex items-center gap-2 transition-all shadow-lg">
              <Printer size={16} /> <span className="hidden sm:inline">Cetak Surat</span><span className="sm:hidden">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[450px] overflow-y-auto space-y-6 pb-10">
          
          {/* Identitas Desa */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
             <h3 className="text-xs font-black text-slate-400 uppercase flex items-center gap-2"><MapPin size={14}/> Identitas Desa</h3>
             <div className="flex items-center gap-4 border-b pb-4">
                <div className="w-14 h-14 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-400" onClick={() => fileInputRef.current?.click()}>
                   {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <div><h4 className="text-xs font-bold uppercase">Logo Garuda/Desa</h4><p className="text-[10px] text-slate-400">Klik untuk upload logo desa</p></div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Provinsi</label><input className="w-full p-2 border rounded text-xs" value={data.provinsi} onChange={e => setData({...data, provinsi: e.target.value.toUpperCase()})} /></div>
                <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Kabupaten</label><input className="w-full p-2 border rounded text-xs" value={data.kabupaten} onChange={e => setData({...data, kabupaten: e.target.value.toUpperCase()})} /></div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Kecamatan</label><input className="w-full p-2 border rounded text-xs" value={data.kecamatan} onChange={e => setData({...data, kecamatan: e.target.value.toUpperCase()})} /></div>
                <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Desa/Lurah</label><input className="w-full p-2 border rounded text-xs" value={data.desa} onChange={e => setData({...data, desa: e.target.value.toUpperCase()})} /></div>
             </div>
             <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">No. Surat</label><input className="w-full p-2 border rounded text-xs" value={data.noSurat} onChange={e => setData({...data, noSurat: e.target.value})} /></div>
          </div>

          {/* Data Warga */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
             <h3 className="text-xs font-black text-slate-400 uppercase flex items-center gap-2"><User size={14}/> Data Warga</h3>
             <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.nama} onChange={e => setData({...data, nama: e.target.value.toUpperCase()})} />
             <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="NIK" value={data.nik} onChange={e => setData({...data, nik: e.target.value})} />
             <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Tempat Lahir" value={data.tempatLahir} onChange={e => setData({...data, tempatLahir: e.target.value})} />
                <input className="w-full p-2 border border-slate-200 rounded text-xs" type="date" value={data.tglLahir} onChange={e => setData({...data, tglLahir: e.target.value})} />
             </div>
             <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Agama" value={data.agama} onChange={e => setData({...data, agama: e.target.value})} />
             <input className="w-full p-2 border border-slate-200 rounded text-xs" placeholder="Pekerjaan" value={data.pekerjaan} onChange={e => setData({...data, pekerjaan: e.target.value})} />
             <textarea className="w-full p-2 border border-slate-200 rounded text-xs h-16" placeholder="Alamat Sesuai KTP" value={data.alamat} onChange={e => setData({...data, alamat: e.target.value})} />
          </div>

          {/* Penandatangan */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Kades</label><input className="w-full p-2 border rounded text-xs" value={data.kepalaDesa} onChange={e => setData({...data, kepalaDesa: e.target.value.toUpperCase()})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tanggal Surat</label><input className="w-full p-2 border rounded text-xs" value={data.tglSurat} type="date" onChange={e => setData({...data, tglSurat: e.target.value})} /></div>
             </div>
          </div>

          {/* IKLAN (FIXED: KUTIP SATU AGAR LINK TIDAK BROKEN) */}
          <div className="no-print bg-white/50 border border-dashed border-slate-300 rounded-xl p-4 flex justify-center">
            <iframe
              srcDoc={`<html><body style='margin:0;display:flex;justify-content:center;background:transparent;'><div id='container-680bbbb6a0645f106a122dd96bf54b25'></div><script async src='https://pl28427514.effectivegatecpm.com/680bbbb6a0645f106a122dd96bf54b25/invoke.js'></script></body></html>`}
              width="100%" height="250" frameBorder="0" scrolling="no" style={{ maxWidth: '300px' }}
            />
          </div>
        </div>

        {/* PREVIEW KERTAS */}
        <div className="flex-1 h-full bg-slate-300/50 rounded-xl flex justify-center p-4 md:p-8 overflow-y-auto print:p-0 print:bg-white">
          <Kertas>
            <div className="font-serif text-black leading-relaxed">
              {/* KOP DESA */}
              <div className="flex items-center gap-4 border-b-4 border-black pb-2 mb-8 text-center relative">
                {logo ? (
                   <img src={logo} className="h-24 w-auto object-contain absolute left-0" alt="logo" />
                ) : (
                   <div className="h-24 w-20 border-2 border-slate-200 flex items-center justify-center text-[8px] text-slate-400 absolute left-0 uppercase">Logo Desa</div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase leading-tight">Pemerintah Kabupaten {data.kabupaten}</h3>
                  <h3 className="text-lg font-bold uppercase leading-tight">Kecamatan {data.kecamatan}</h3>
                  <h2 className="text-2xl font-black uppercase leading-tight">Kantor Desa {data.desa}</h2>
                  <p className="text-xs font-sans mt-1">Alamat Kantor: Jl. Raya {data.desa} No. 01, Kec. {data.kecamatan}, Kode Pos {data.kodePos}</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-lg font-bold underline uppercase">SURAT KETERANGAN BELUM MENIKAH</h2>
                <p className="text-sm font-sans mt-1">Nomor: {data.noSurat}</p>
              </div>

              <div className="space-y-6 text-[12pt]">
                <p className="indent-8 text-justify">
                  Yang bertanda tangan di bawah ini Kepala Desa {data.desa}, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}, Provinsi {data.provinsi}, dengan ini menerangkan bahwa:
                </p>

                <div className="ml-8 space-y-2">
                  <table className="w-full">
                    <tbody>
                      <tr><td className="w-40">Nama Lengkap</td><td className="w-4">:</td><td className="font-bold">{data.nama}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.nik}</td></tr>
                      <tr><td>Tempat, Tgl Lahir</td><td>:</td><td>{data.tempatLahir}, {new Date(data.tglLahir).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</td></tr>
                      <tr><td>Jenis Kelamin</td><td>:</td><td>{data.kelamin}</td></tr>
                      <tr><td>Agama</td><td>:</td><td>{data.agama}</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.pekerjaan}</td></tr>
                      <tr><td className="align-top">Alamat Sesuai KTP</td><td className="align-top">:</td><td>{data.alamat}</td></tr>
                    </tbody>
                  </table>
                </div>

                <p className="indent-8 text-justify">
                  Berdasarkan data yang ada pada kami serta sepengetahuan kami, nama tersebut di atas benar-benar penduduk Desa {data.desa} yang berdomisili pada alamat tersebut dan sampai saat dikeluarkan surat keterangan ini yang bersangkutan <strong>BELUM PERNAH MENIKAH</strong>.
                </p>

                <p className="indent-8 text-justify">
                  Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya dan bagi yang berkepentingan agar maklum.
                </p>

                <div className="flex justify-end mt-12 text-center">
                   <div className="w-[60%]">
                      <p>{data.desa}, {new Date(data.tglSurat).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                      <p className="font-bold uppercase mb-20">{data.jabatan} {data.desa}</p>
                      <p className="font-bold underline uppercase">{data.kepalaDesa}</p>
                   </div>
                </div>
              </div>
            </div>
          </Kertas>
        </div>
      </div>
    </div>
  );
}