'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Plus, Trash2, User, Users, Scale, FileText, FileSignature, Building2, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Pewaris {
    nama: string;
    nik: string;
    tempatLahir: string;
    tanggalLahir: string;
    pekerjaan: string;
    alamat: string;
    tanggalMeninggal: string;
    tempatMeninggal: string;
    buktiKematian: string;
}

interface AhliWaris {
    id: string;
    nama: string;
    nik: string;
    hubungan: string;
    tempatLahir: string;
    tanggalLahir: string;
    pekerjaan: string;
    alamat: string;
}

interface Saksi {
    id: string;
    nama: string;
    nik: string;
    pekerjaan: string;
    alamat: string;
}

interface Pejabat {
    nama: string;
    jabatan: string;
    nip: string;
    nomorReg: string;
    tanggalReg: string;
}

interface AhliWarisData {
    judulPernyataan: string;
    hukumWaris: string;
    tanggunganHutang: string;
    penyelesaianSengketa: string;
    kotaPembuatan: string;
    tanggalPembuatan: string;
    pewaris: Pewaris;
    ahliWaris: AhliWaris[];
    saksi: Saksi[];
    pejabat: Pejabat;
    camat: Pejabat;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: AhliWarisData = {
    judulPernyataan: "SURAT PERNYATAAN DAN KESEPAKATAN AHLI WARIS",
    hukumWaris: "Hukum Perdata (Burgerlijk Wetboek)",
    tanggunganHutang: "Tanggung Renteng",
    penyelesaianSengketa: "Pengadilan Negeri",
    kotaPembuatan: "Bandung",
    tanggalPembuatan: "01 November 2026",
    pewaris: {
        nama: "H. SUDARYONO BIN SOEKARNO",
        nik: "3273102901700003",
        tempatLahir: "Bandung",
        tanggalLahir: "29 Januari 1970",
        pekerjaan: "Pensiunan PNS",
        alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat",
        tanggalMeninggal: "10 Oktober 2026",
        tempatMeninggal: "RSUP Hasan Sadikin Bandung",
        buktiKematian: "Surat Keterangan Kematian No: 472.12/05/Kel/2026"
    },
    ahliWaris: [
        { id: '1', nama: "SITI AMINAH", nik: "3273102901750005", hubungan: "Istri", tempatLahir: "Bandung", tanggalLahir: "29 Januari 1975", pekerjaan: "Mengurus Rumah Tangga", alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung" },
        { id: '2', nama: "BUDI SANTOSO", nik: "3273102901950001", hubungan: "Anak Kandung", tempatLahir: "Bandung", tanggalLahir: "12 Maret 1995", pekerjaan: "Karyawan Swasta", alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung" }
    ],
    saksi: [
        { id: '1', nama: "AGUS SUPRIYADI", nik: "3273102901850002", pekerjaan: "Ketua RT 001", alamat: "Jl. Merdeka No. 47, Kel. Citarum" },
        { id: '2', nama: "RINA MARLINA", nik: "3273102901800003", pekerjaan: "Ketua RW 002", alamat: "Jl. Merdeka No. 50, Kel. Citarum" }
    ],
    pejabat: {
        nama: "Drs. H. BAMBANG HERMAWAN, M.Si",
        jabatan: "Lurah Citarum",
        nip: "19650212 199003 1 004",
        nomorReg: "472.11/123-Kel.Ctr/2026",
        tanggalReg: "05 November 2026"
    },
    camat: {
        nama: "Ir. Hj. RINI SETIAWATI, M.M.",
        jabatan: "Camat Bandung Wetan",
        nip: "19700515 199503 2 001",
        nomorReg: "472.11/567-Kec.BW/2026",
        tanggalReg: "06 November 2026"
    }
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function AhliWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Ahli Waris...</div>}>
      <AhliWarisBuilder />
    </Suspense>
  );
}

function AhliWarisBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<AhliWarisData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePewarisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, pewaris: { ...data.pewaris, [e.target.name]: e.target.value } });
  };

  const handlePejabatChange = (e: React.ChangeEvent<HTMLInputElement>, role: 'pejabat' | 'camat') => {
    setData({ ...data, [role]: { ...data[role], [e.target.name]: e.target.value } });
  };

  // Manajemen Ahli Waris
  const handleAhliWarisChange = (id: string, field: keyof AhliWaris, value: string) => {
    setData({ ...data, ahliWaris: data.ahliWaris.map(aw => aw.id === id ? { ...aw, [field]: value } : aw) });
  };
  const addAhliWaris = () => {
    setData({ ...data, ahliWaris: [...data.ahliWaris, { id: Date.now().toString(), nama: '', nik: '', hubungan: '', tempatLahir: '', tanggalLahir: '', pekerjaan: '', alamat: '' }] });
  };
  const removeAhliWaris = (id: string) => {
    setData({ ...data, ahliWaris: data.ahliWaris.filter(aw => aw.id !== id) });
  };

  // Manajemen Saksi
  const handleSaksiChange = (id: string, field: keyof Saksi, value: string) => {
    setData({ ...data, saksi: data.saksi.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };
  const addSaksi = () => {
    setData({ ...data, saksi: [...data.saksi, { id: Date.now().toString(), nama: '', nik: '', pekerjaan: '', alamat: '' }] });
  };
  const removeSaksi = (id: string) => {
    setData({ ...data, saksi: data.saksi.filter(s => s.id !== id) });
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="text-[12pt] font-bold uppercase underline underline-offset-4 tracking-wider mb-1">{data.judulPernyataan}</h1>
      </div>

      {/* PEMBUKAAN */}
      <div className="mb-4">
        <p className="text-justify indent-8">
          Yang bertanda tangan di bawah ini, kami para Ahli Waris dari Almarhum/Almarhumah <strong>{data.pewaris.nama}</strong>, dengan ini menerangkan dan menyatakan dengan sesungguhnya serta sanggup diangkat sumpah, bahwa:
        </p>
      </div>

      {/* DATA PEWARIS */}
      <div className="mb-4">
        <p className="text-justify">Telah meninggal dunia seorang laki-laki/perempuan bernama:</p>
        <table className="w-full mt-2 ml-4">
          <tbody>
            <tr><td className="w-48 align-top py-0.5">Nama</td><td className="w-4 align-top py-0.5">:</td><td className="align-top font-bold py-0.5">{data.pewaris.nama}</td></tr>
            <tr><td className="w-48 align-top py-0.5">NIK</td><td className="w-4 align-top py-0.5">:</td><td className="align-top py-0.5">{data.pewaris.nik}</td></tr>
            <tr><td className="w-48 align-top py-0.5">Tempat, Tanggal Lahir</td><td className="w-4 align-top py-0.5">:</td><td className="align-top py-0.5">{data.pewaris.tempatLahir}, {data.pewaris.tanggalLahir}</td></tr>
            <tr><td className="w-48 align-top py-0.5">Pekerjaan</td><td className="w-4 align-top py-0.5">:</td><td className="align-top py-0.5">{data.pewaris.pekerjaan}</td></tr>
            <tr><td className="w-48 align-top py-0.5">Alamat Terakhir</td><td className="w-4 align-top py-0.5">:</td><td className="align-top py-0.5">{data.pewaris.alamat}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p className="text-justify indent-8">
          Meninggal dunia pada tanggal <strong>{data.pewaris.tanggalMeninggal}</strong> di <strong>{data.pewaris.tempatMeninggal}</strong>, sebagaimana tercatat dalam {data.pewaris.buktiKematian}.
        </p>
      </div>

      {/* DATA AHLI WARIS */}
      <div className="mb-4">
        <p className="text-justify indent-8 mb-2">
          Bahwa dari perkawinan Almarhum/Almarhumah tersebut, telah meninggalkan {data.ahliWaris.length} ({data.ahliWaris.length}) orang Ahli Waris yang sah, yaitu:
        </p>
        
        {data.ahliWaris.map((aw, index) => (
          <div key={aw.id} className="mb-3 ml-4 break-inside-avoid">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-6 align-top py-0.5">{index + 1}.</td>
                  <td className="w-40 align-top py-0.5">Nama</td>
                  <td className="w-4 align-top py-0.5">:</td>
                  <td className="align-top font-bold py-0.5">{aw.nama}</td>
                </tr>
                <tr><td className="align-top py-0.5"></td><td className="align-top py-0.5">NIK</td><td className="align-top py-0.5">:</td><td className="align-top py-0.5">{aw.nik}</td></tr>
                <tr><td className="align-top py-0.5"></td><td className="align-top py-0.5">TTL</td><td className="align-top py-0.5">:</td><td className="align-top py-0.5">{aw.tempatLahir}, {aw.tanggalLahir}</td></tr>
                <tr><td className="align-top py-0.5"></td><td className="align-top py-0.5">Pekerjaan</td><td className="align-top py-0.5">:</td><td className="align-top py-0.5">{aw.pekerjaan}</td></tr>
                <tr><td className="align-top py-0.5"></td><td className="align-top py-0.5">Hubungan Keluarga</td><td className="align-top py-0.5">:</td><td className="align-top py-0.5">{aw.hubungan}</td></tr>
                <tr><td className="align-top py-0.5"></td><td className="align-top py-0.5">Alamat</td><td className="align-top py-0.5">:</td><td className="align-top py-0.5">{aw.alamat}</td></tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* KLAUSUL HUKUM */}
      <div className="mb-8">
        <p className="text-justify indent-8 mb-2">
          Selanjutnya kami para Ahli Waris bersepakat dan menyatakan hal-hal sebagai berikut:
        </p>
        <ol className="list-decimal ml-10 space-y-2 text-justify">
          <li>Bahwa nama-nama tersebut di atas adalah benar satu-satunya Ahli Waris yang sah secara {data.hukumWaris} dari Almarhum/Almarhumah <strong>{data.pewaris.nama}</strong>.</li>
          <li>Bahwa apabila di kemudian hari terdapat kewajiban/hutang dari Almarhum/Almarhumah, maka kami bersedia menanggungnya secara <strong>{data.tanggunganHutang}</strong>.</li>
          <li>Apabila di kemudian hari ternyata Surat Pernyataan ini tidak benar dan/atau terdapat pihak lain yang dirugikan, maka kami bersedia dituntut secara hukum pidana maupun perdata melalui <strong>{data.penyelesaianSengketa}</strong> tanpa melibatkan Pejabat yang mengesahkan/mengetahui surat ini.</li>
        </ol>
      </div>

      {/* TANDA TANGAN AHLI WARIS */}
      <div className="break-inside-avoid">
        <div className="flex justify-end mb-4">
          <p>{data.kotaPembuatan}, {data.tanggalPembuatan}</p>
        </div>
        <p className="text-center mb-16 font-bold">Para Ahli Waris,</p>
        <div className="grid grid-cols-2 gap-y-16 gap-x-4 ml-4">
          {data.ahliWaris.map((aw, index) => (
             <div key={aw.id} className="flex items-center gap-2">
               <span className="w-6">{index + 1}.</span>
               <div className="flex-1 border-b border-black text-center pb-1">{aw.nama}</div>
             </div>
          ))}
        </div>
      </div>

      {/* SAKSI */}
      {data.saksi.length > 0 && (
        <div className="mt-12 break-inside-avoid">
          <p className="mb-4">Saksi-saksi:</p>
          <div className="grid grid-cols-2 gap-y-16 gap-x-4 ml-4">
            {data.saksi.map((s, index) => (
               <div key={s.id} className="flex flex-col">
                 <div className="flex items-center gap-2">
                   <span className="w-6">{index + 1}.</span>
                   <div className="flex-1 border-b border-black text-center pb-1">{s.nama}</div>
                 </div>
                 <span className="text-sm ml-8 mt-1 italic">({s.pekerjaan})</span>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* PENGESAHAN PEJABAT */}
      <div className="mt-16 pt-8 border-t-2 border-double border-black break-inside-avoid">
        <h3 className="text-center font-bold uppercase tracking-wider mb-8">MENGESAHKAN / MENGETAHUI</h3>
        <div className="flex justify-between w-full text-center">
           <div className="w-[45%]">
             <p className="uppercase">NO. REG: {data.pejabat.nomorReg}</p>
             <p className="mb-20 uppercase">TANGGAL: {data.pejabat.tanggalReg}</p>
             <p className="font-bold underline uppercase">{data.pejabat.nama}</p>
             <p>NIP. {data.pejabat.nip}</p>
             <p className="font-bold mt-1 uppercase">{data.pejabat.jabatan}</p>
           </div>
           <div className="w-[45%]">
             <p className="uppercase">NO. REG: {data.camat.nomorReg}</p>
             <p className="mb-20 uppercase">TANGGAL: {data.camat.tanggalReg}</p>
             <p className="font-bold underline uppercase">{data.camat.nama}</p>
             <p>NIP. {data.camat.nip}</p>
             <p className="font-bold mt-1 uppercase">{data.camat.jabatan}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Ahli Waris</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Legal
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. DATA PEWARIS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data Pewaris (Almarhum)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pewaris</label>
                      <input type="text" name="nama" value={data.pewaris.nama} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                      <input type="text" name="nik" value={data.pewaris.nik} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                        <input type="text" name="tempatLahir" value={data.pewaris.tempatLahir} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                        <input type="text" name="tanggalLahir" value={data.pewaris.tanggalLahir} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan Terakhir</label>
                      <input type="text" name="pekerjaan" value={data.pewaris.pekerjaan} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap KTP</label>
                      <textarea name="alamat" value={data.pewaris.alamat} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Meninggal</label>
                        <input type="text" name="tanggalMeninggal" value={data.pewaris.tanggalMeninggal} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Meninggal</label>
                        <input type="text" name="tempatMeninggal" value={data.pewaris.tempatMeninggal} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bukti Kematian</label>
                      <input type="text" name="buktiKematian" value={data.pewaris.buktiKematian} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="Surat Kematian No..." />
                    </div>
                  </div>
                </div>

                {/* 2. DATA AHLI WARIS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Users size={14} className="text-emerald-600"/> Data Ahli Waris
                    </h3>
                    <button onClick={addAhliWaris} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah Ahli Waris
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.ahliWaris.map((aw, idx) => (
                      <div key={aw.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="text-xs font-bold text-slate-400">Ahli Waris #{idx + 1}</span>
                          <button onClick={() => removeAhliWaris(aw.id)} className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                        <div className="space-y-4 pr-10">
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                            <input type="text" value={aw.nama} onChange={(e) => handleAhliWarisChange(aw.id, 'nama', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK</label>
                               <input type="text" value={aw.nik} onChange={(e) => handleAhliWarisChange(aw.id, 'nik', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hub. Keluarga</label>
                               <input type="text" value={aw.hubungan} onChange={(e) => handleAhliWarisChange(aw.id, 'hubungan', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Istri / Anak" />
                             </div>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tempat Lahir</label>
                               <input type="text" value={aw.tempatLahir} onChange={(e) => handleAhliWarisChange(aw.id, 'tempatLahir', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Lahir</label>
                               <input type="text" value={aw.tanggalLahir} onChange={(e) => handleAhliWarisChange(aw.id, 'tanggalLahir', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                           </div>
                           <div>
                             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                             <input type="text" value={aw.pekerjaan} onChange={(e) => handleAhliWarisChange(aw.id, 'pekerjaan', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat</label>
                            <textarea value={aw.alamat} onChange={(e) => handleAhliWarisChange(aw.id, 'alamat', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. KLAUSUL HUKUM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Scale size={14} className="text-amber-600"/> Hukum & Yurisdiksi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul Pernyataan</label>
                      <input type="text" name="judulPernyataan" value={data.judulPernyataan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Dasar Hukum Waris</label>
                      <input type="text" name="hukumWaris" value={data.hukumWaris} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan Hutang</label>
                      <input type="text" name="tanggunganHutang" value={data.tanggunganHutang} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Yurisdiksi (Penyelesaian Sengketa)</label>
                      <input type="text" name="penyelesaianSengketa" value={data.penyelesaianSengketa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 4. SAKSI & LOKASI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} className="text-blue-600" /> Saksi & Pengesahan
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pembuatan</label>
                        <input type="text" name="kotaPembuatan" value={data.kotaPembuatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                        <input type="text" name="tanggalPembuatan" value={data.tanggalPembuatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Daftar Saksi</label>
                        <button onClick={addSaksi} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold hover:bg-blue-200 flex items-center gap-1 transition-colors">
                          <Plus size={10}/> Tambah Saksi
                        </button>
                      </div>
                      {data.saksi.map((s, idx) => (
                        <div key={s.id} className="relative bg-slate-50 border border-slate-200 rounded-lg p-3 mb-2 pr-8">
                           <button onClick={() => removeSaksi(s.id)} className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-md transition-colors">
                            <Trash2 size={12}/>
                           </button>
                           <input type="text" value={s.nama} onChange={(e) => handleSaksiChange(s.id, 'nama', e.target.value)} className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none mb-1.5" placeholder="Nama Saksi" />
                           <input type="text" value={s.pekerjaan} onChange={(e) => handleSaksiChange(s.id, 'pekerjaan', e.target.value)} className="w-full bg-white border border-slate-200 rounded-md p-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jabatan/Pekerjaan (mis: Ketua RT)" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. PEJABAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-indigo-600"/> Legalisasi Pejabat Daerah
                  </h3>
                  <div className="space-y-6">
                    {/* Lurah */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-sm text-slate-800 mb-3 border-b border-slate-200 pb-2">Kepala Desa / Lurah</h4>
                      <div className="space-y-3">
                        <input type="text" name="nama" value={data.pejabat.nama} onChange={(e) => handlePejabatChange(e, 'pejabat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" placeholder="Nama Lengkap" />
                        <input type="text" name="jabatan" value={data.pejabat.jabatan} onChange={(e) => handlePejabatChange(e, 'pejabat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Jabatan (ex: Lurah Citarum)" />
                        <input type="text" name="nip" value={data.pejabat.nip} onChange={(e) => handlePejabatChange(e, 'pejabat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="NIP" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" name="nomorReg" value={data.pejabat.nomorReg} onChange={(e) => handlePejabatChange(e, 'pejabat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Nomor Register" />
                          <input type="text" name="tanggalReg" value={data.pejabat.tanggalReg} onChange={(e) => handlePejabatChange(e, 'pejabat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Tanggal Reg" />
                        </div>
                      </div>
                    </div>
                    {/* Camat */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-sm text-slate-800 mb-3 border-b border-slate-200 pb-2">Camat</h4>
                      <div className="space-y-3">
                        <input type="text" name="nama" value={data.camat.nama} onChange={(e) => handlePejabatChange(e, 'camat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" placeholder="Nama Lengkap" />
                        <input type="text" name="jabatan" value={data.camat.jabatan} onChange={(e) => handlePejabatChange(e, 'camat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Jabatan (ex: Camat Bandung)" />
                        <input type="text" name="nip" value={data.camat.nip} onChange={(e) => handlePejabatChange(e, 'camat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="NIP" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" name="nomorReg" value={data.camat.nomorReg} onChange={(e) => handlePejabatChange(e, 'camat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Nomor Register" />
                          <input type="text" name="tanggalReg" value={data.camat.tanggalReg} onChange={(e) => handlePejabatChange(e, 'camat')} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Tanggal Reg" />
                        </div>
                      </div>
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
              <PrintWrapper documentName="Surat Keterangan Ahli Waris" price={15000} />
           </div>

        </div>
      </main>
    </div>
  );
}
