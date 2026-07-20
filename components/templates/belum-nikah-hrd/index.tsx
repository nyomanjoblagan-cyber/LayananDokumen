'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    User, MapPin, Target, Landmark, Heart
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface StatusData {
  govLevel: string;
  district: string;
  logoInstansi: string;
  village: string;
  address_office: string;
  no: string;
  date: string;
  name: string;
  nik: string;
  ttl: string;
  gender: string;
  religion: string;
  job: string;
  address: string;
  status: string;
  statusDesc: string;
  purpose: string;
  signerName: string;
  signerNIP: string;
  signerTitle: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: StatusData = {
  govLevel: 'PEMERINTAH KOTA BANDUNG',
  district: 'KECAMATAN COBLONG',
  logoInstansi: '',
  village: 'KELURAHAN DAGO',
  address_office: 'Jl. Ir. H. Juanda No. 100, Bandung',
  no: '474 / 088 / Kel-Dago / 2026',
  date: '2026-08-20', 
  name: 'RIZKY RAMADHAN',
  nik: '3273010101980005',
  ttl: 'Bandung, 15 Agustus 1998',
  gender: 'Laki-laki',
  religion: 'Islam',
  job: 'Mahasiswa',
  address: 'Jl. Dago Asri I No. 5, RT 02 RW 04, Dago, Coblong',
  status: 'Belum Kawin',
  statusDesc: 'Jejaka (Belum Pernah Menikah)',
  purpose: 'Persyaratan Administrasi Pendaftaran Calon Pegawai Negeri Sipil (CPNS)',
  signerName: 'Dra. Hj. NINING NINGSIH',
  signerNIP: '19750101 200003 2 001',
  signerTitle: 'LURAH DAGO'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1.5">
     <div className="w-48 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold uppercase">{value}</div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BelumMenikahHRDPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat HRD...</div>}>
      <BelumMenikahHRDBuilder />
    </Suspense>
  );
}

function BelumMenikahHRDBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<StatusData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        setData(prev => ({ ...prev, logoInstansi: canvas.toDataURL('image/png') }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="border-b-[4px] border-double border-black pb-3 mb-6 relative">
         <div className="absolute left-0 top-0 w-24 h-24 flex items-center justify-center overflow-hidden">
           {data.logoInstansi ? (
             <img src={data.logoInstansi} alt="Logo" className="w-full h-full object-contain" />
           ) : (
             <div className="w-full h-full border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-400 text-xs no-print opacity-50 group-hover:opacity-100 transition-opacity text-center">
               [ Logo Garuda / Pemda ]
             </div>
           )}
         </div>
         <div className="text-center px-24">
           <h2 className="text-[14pt] font-bold tracking-wider uppercase m-0 leading-tight">{data.govLevel || "[NAMA KABUPATEN/KOTA]"}</h2>
           <h2 className="text-[14pt] font-bold tracking-wider uppercase m-0 leading-tight">{data.district || "[NAMA KECAMATAN]"}</h2>
           <h1 className="text-[18pt] font-black uppercase tracking-widest mt-1 mb-1 leading-tight">{data.village || "[NAMA DESA/KELURAHAN]"}</h1>
           <p className="text-[10pt] m-0 leading-snug">{data.address_office || "[Alamat Lengkap Kantor Desa/Kelurahan]"}</p>
         </div>
      </div>
      
      {/* JUDUL SURAT */}
      <div className="text-center mb-8">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">SURAT KETERANGAN BELUM MENIKAH</h1>
          <p className="text-[11pt] mt-1">Nomor: {data.no}</p>
      </div>
      
      {/* PEMBUKAAN */}
      <div className="mb-6 text-justify">
          <p className="indent-8">
              Yang bertanda tangan di bawah ini Kepala {data.village}, {data.district}, {data.govLevel}, menerangkan dengan sebenarnya bahwa:
          </p>
      </div>

      {/* IDENTITAS */}
      <div className="pl-8 space-y-4 mb-6">
          <IdentityRow label="Nama Lengkap" value={data.name} />
          <IdentityRow label="Nomor Induk Kependudukan" value={data.nik} />
          <IdentityRow label="Tempat, Tgl Lahir" value={data.ttl} />
          <IdentityRow label="Jenis Kelamin" value={data.gender} />
          <IdentityRow label="Agama" value={data.religion} />
          <IdentityRow label="Pekerjaan" value={data.job} />
          <IdentityRow label="Alamat Domisili" value={data.address} />
      </div>

      <div className="mb-8 text-justify">
          <p className="indent-8 leading-loose">
              Berdasarkan catatan pada register administrasi kependudukan di wilayah kami, serta berdasarkan pengakuan yang bersangkutan, orang tersebut di atas adalah benar warga kami yang menetap pada alamat tersebut, dan sampai dengan saat Surat Keterangan ini dikeluarkan yang bersangkutan bersatus:
          </p>
          <div className="text-center my-6">
             <span className="font-black text-[14pt] uppercase border-2 border-black px-6 py-2 tracking-widest">{data.status}</span>
             <p className="mt-2 font-semibold">({data.statusDesc})</p>
          </div>
          <p className="indent-8 leading-loose">
              Surat Keterangan Belum Menikah ini dibuat atas permintaan yang bersangkutan untuk dipergunakan sebagai <strong>{data.purpose}</strong>. Demikian surat keterangan ini kami buat untuk dapat dipergunakan sebagaimana mestinya.
          </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="mt-16">
          <div className="flex justify-between items-end px-8">
              <div className="w-[45%] text-center">
                  <p className="mb-2">&nbsp;</p>
                  <p className="mb-10">&nbsp;</p>
                  <p className="font-bold mb-4 uppercase">&nbsp;</p>
                  <div className="w-24 h-16 mx-auto flex items-center justify-center mb-4">
                  </div>
                  <p className="font-bold underline uppercase">&nbsp;</p>
              </div>
              <div className="w-[45%] text-center">
                  <p className="mb-1">{data.village.replace('KELURAHAN ', '').replace('DESA ', '')}, {formatDateSafe(data.date)}</p>
                  <p className="font-bold mb-24 uppercase">{data.signerTitle},</p>
                  <div className="relative inline-block w-full">
                     <div className="absolute left-[-40px] top-[-90px] w-32 h-32 border-4 border-blue-800 rounded-full flex items-center justify-center opacity-30 -rotate-12 z-0 no-print group-hover:opacity-10 transition-opacity">
                        <div className="text-[9px] font-bold text-center text-blue-800">STEMPEL<br/>KELURAHAN</div>
                     </div>
                     <p className="font-bold underline uppercase z-10 relative">{data.signerName}</p>
                     {data.signerNIP && <p className="text-[11pt] z-10 relative mt-1">NIP. {data.signerNIP}</p>}
                  </div>
              </div>
          </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Belum Menikah (HRD/Desa)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Surat Keterangan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. KOP SURAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Landmark size={14} className="text-sky-600"/> Data Wilayah (Kop Surat)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Logo Garuda / Pemda</label>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pemerintah Kabupaten / Kota</label>
                      <input type="text" name="govLevel" value={data.govLevel} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kecamatan</label>
                        <input type="text" name="district" value={data.district} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kelurahan / Desa</label>
                        <input type="text" name="village" value={data.village} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kantor Kelurahan/Desa</label>
                      <textarea name="address_office" value={data.address_office} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                      <input type="text" name="no" value={data.no} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS PEMOHON */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Identitas Pemohon
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="name" value={data.name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                      <input type="text" name="nik" value={data.nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir (Format Lengkap)</label>
                      <input type="text" name="ttl" value={data.ttl} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                        <select name="gender" value={data.gender} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                        <input type="text" name="religion" value={data.religion} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                      <input type="text" name="job" value={data.job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                      <textarea name="address" value={data.address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. STATUS & TUJUAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Heart size={14} className="text-purple-600"/> Status & Tujuan
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Perkawinan</label>
                      <select name="status" value={data.status} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                        <option value="Belum Kawin">Belum Kawin</option>
                        <option value="Janda/Duda">Janda / Duda</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Status</label>
                      <input type="text" name="statusDesc" value={data.statusDesc} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan / Keperluan Surat</label>
                    <textarea name="purpose" value={data.purpose} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                  </div>
                </div>

                {/* 4. PENANDATANGAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-amber-600"/> Pengesahan & Tanda Tangan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                      <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penandatangan</label>
                      <input type="text" name="signerTitle" value={data.signerTitle} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" placeholder="Cth: LURAH DAGO / KEPALA DESA X" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penandatangan (Lurah/Kades)</label>
                      <input type="text" name="signerName" value={data.signerName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP (Jika Ada)</label>
                      <input type="text" name="signerNIP" value={data.signerNIP} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Keterangan Belum Menikah (Kelurahan/Desa)" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
