'use client';

import React, { useState, Suspense, useEffect } from "react";
import PrintWrapper from '@/components/PrintWrapper';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    Building2, Stethoscope, User, Activity, MapPin 
} from "lucide-react";
import Link from "next/link";

const INITIAL_DATA = {
  instansi: "KEPOLISIAN NEGARA REPUBLIK INDONESIA",
  daerah: "DAERAH JAWA TIMUR",
  satker: "RUMAH SAKIT BHAYANGKARA H.S. SAMSOERI MERTOJOSO",
  alamatInstansi: "Jl. Ahmad Yani No.116, Gayungan, Kota Surabaya, Jawa Timur",
  noSurat: "SKHPN / 1234 / VII / 2026 / RS.Bhy",
  
  dokterNama: "dr. SARTIKA AYU, M.Kes",
  dokterNrp: "AKBP NRP. 78051234",
  dokterJabatan: "Dokter Pemeriksa",

  pasienNama: "BUDI SANTOSO",
  pasienTempatLahir: "Surabaya",
  pasienTanggalLahir: "1995-08-15",
  pasienJenisKelamin: "Laki-laki",
  pasienAgama: "Islam",
  pasienPekerjaan: "Swasta",
  pasienAlamat: "Jl. Darmo Permai II No. 45, RT 01/02, Surabaya",
  pasienNik: "3578012345678901",

  keperluan: "Persyaratan Melamar Pekerjaan BUMN",
  
  hasilAmp: "NEGATIF",
  hasilMet: "NEGATIF",
  hasilThc: "NEGATIF",
  hasilMop: "NEGATIF",
  hasilBzo: "NEGATIF",
  hasilCoc: "NEGATIF",

  tempatDikeluarkan: "Surabaya",
  tanggalDikeluarkan: "2026-07-20",
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

export default function SuratKeteranganBebasNarkoba() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Narkoba...</div>}>
      <BebasNarkobaBuilder />
    </Suspense>
  );
}

function BebasNarkobaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua data yang telah diisi akan hilang.')) {
      setFormData({ ...INITIAL_DATA });
    }
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Kop Surat Section */}
      <div className="border-b-[4px] border-double border-black pb-3 mb-6 relative break-inside-avoid">
         <div className="absolute left-0 top-0 w-24 h-24 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center text-gray-400 text-xs no-print opacity-50 group-hover:opacity-100 transition-opacity">
           [ Logo Instansi ]
         </div>
         <div className="text-center px-24">
           <h2 className="text-lg font-bold tracking-wider uppercase m-0 leading-tight">{formData.instansi || "[NAMA INSTANSI]"}</h2>
           {formData.daerah && <h3 className="text-md font-bold uppercase m-0 leading-tight">{formData.daerah}</h3>}
           <h1 className="text-[16pt] font-black uppercase tracking-widest mt-1 mb-1 leading-tight">{formData.satker || "[NAMA RUMAH SAKIT / KLINIK]"}</h1>
           <p className="text-sm m-0 leading-snug">{formData.alamatInstansi || "[Alamat Lengkap Instansi]"}</p>
         </div>
      </div>

      <div className="text-center mb-8 break-inside-avoid">
        <h1 className="text-[14pt] font-bold underline underline-offset-4 mb-1 uppercase tracking-wide">SURAT KETERANGAN HASIL PEMERIKSAAN NARKOBA</h1>
        <p className="text-[11pt] font-bold">Nomor: {formData.noSurat || "___________________________"}</p>
      </div>

      <div className="mb-6 space-y-2 text-justify leading-relaxed break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa:</p>
        <table className="w-full mt-2 ml-4">
          <tbody>
            <tr><td className="w-48 py-1 align-top">Nama Dokter Pemeriksa</td><td className="w-4 py-1 align-top">:</td><td className="py-1 font-bold uppercase">{formData.dokterNama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">NRP / NIP</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.dokterNrp || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Jabatan</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.dokterJabatan || "_______________________"}</td></tr>
          </tbody>
        </table>
        <p className="mt-4">Telah melakukan pemeriksaan fisik dan tes laboratorium atas permintaan dari / terhadap seseorang yang bernama:</p>
        <table className="w-full mt-2 ml-4 break-inside-avoid">
          <tbody>
            <tr><td className="w-48 py-1 align-top">Nama Terperiksa</td><td className="w-4 py-1 align-top">:</td><td className="py-1 font-bold uppercase">{formData.pasienNama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Tempat, Tanggal Lahir</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienTempatLahir || "___________"}, {formatDateSafe(formData.pasienTanggalLahir)}</td></tr>
            <tr><td className="w-48 py-1 align-top">Jenis Kelamin</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienJenisKelamin || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Agama</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienAgama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Pekerjaan</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienPekerjaan || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">No. Induk Kependudukan</td><td className="w-4 py-1 align-top">:</td><td className="py-1 font-mono tracking-wider">{formData.pasienNik || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Alamat Domisili</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienAlamat || "_______________________"}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 space-y-3 text-justify leading-relaxed break-inside-avoid">
        <p>Telah dilakukan anamnesa, pemeriksaan fisik, serta uji saring (Rapid Test) Narkotika, Psikotropika, dan Zat Adiktif (NAPZA) lainnya melalui spesimen Urine yang dilakukan pada tanggal {formatDateSafe(formData.tanggalDikeluarkan)} dengan hasil pemeriksaan sebagai berikut:</p>
        <div className="ml-8 my-4 border border-black p-4 inline-block w-[80%] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] print:shadow-none print:border-2">
           <table className="w-full">
              <tbody>
                <tr><td className="py-1.5 font-semibold">1. Amphetamine (AMP)</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilAmp === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilAmp}</td></tr>
                <tr><td className="py-1.5 font-semibold">2. Methamphetamine (MET)</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilMet === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilMet}</td></tr>
                <tr><td className="py-1.5 font-semibold">3. Marijuana/THC</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilThc === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilThc}</td></tr>
                <tr><td className="py-1.5 font-semibold">4. Morphine/Opiate (MOP)</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilMop === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilMop}</td></tr>
                <tr><td className="py-1.5 font-semibold">5. Benzodiazepine (BZO)</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilBzo === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilBzo}</td></tr>
                <tr><td className="py-1.5 font-semibold">6. Cocaine (COC)</td><td className="py-1.5 w-4">:</td><td className={`py-1.5 font-bold ${formData.hasilCoc === 'POSITIF' ? 'text-red-600 print:text-black' : ''}`}>{formData.hasilCoc}</td></tr>
              </tbody>
           </table>
        </div>
        <p>Berdasarkan hasil pemeriksaan tersebut di atas, maka yang bersangkutan pada saat ini dinyatakan <span className="font-bold underline tracking-wide">TIDAK DITEMUKAN TANDA-TANDA KETERGANTUNGAN ATAU PENYALAHGUNAAN NARKOBA</span>.</p>
        <p>Demikian Surat Keterangan Hasil Pemeriksaan Narkoba ini dibuat dengan sebenarnya untuk dipergunakan sebagai kelengkapan administrasi <strong>{formData.keperluan || "......................................................."}</strong>.</p>
      </div>

      <div className="flex justify-between mt-12 items-end break-inside-avoid">
        <div className="w-32 h-40 border-2 border-black flex items-center justify-center text-xs text-gray-500 font-sans tracking-wide ml-8 mb-4">
           <div className="text-center">PAS FOTO<br/>3 x 4</div>
        </div>
        <div className="text-center w-80 mr-8">
          <p className="mb-1">Dikeluarkan di : {formData.tempatDikeluarkan || ".................."}</p>
          <p className="mb-1">Pada tanggal &nbsp;&nbsp;: {formatDateSafe(formData.tanggalDikeluarkan)}</p>
          <p className="mb-24 font-bold">{formData.dokterJabatan || "DOKTER PEMERIKSA"}</p>
          <div className="relative inline-block w-full">
             <div className="absolute left-[-40px] top-[-50px] w-28 h-28 border-4 border-blue-800 rounded-full flex items-center justify-center opacity-30 -rotate-12 z-0 no-print group-hover:opacity-10 transition-opacity">
                <div className="text-[8px] font-bold text-center text-blue-800">STEMPEL INSTANSI <br/> KEDOKTERAN</div>
             </div>
            <p className="font-bold underline z-10 relative bg-transparent uppercase tracking-wider">{formData.dokterNama || "........................................"}</p>
            <p className="text-[10pt] mt-1">{formData.dokterNrp || "NRP/NIP. ......................."}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Bebas Narkoba (SKHPN)</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor SKHPN
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INSTANSI & KOP */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-sky-600"/> Kop Surat & Instansi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Instansi Induk (Cth: KEPOLISIAN RI / KEMENKES)</label>
                      <input type="text" name="instansi" value={formData.instansi} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Daerah / Wilayah</label>
                      <input type="text" name="daerah" value={formData.daerah} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Satuan Kerja / Rumah Sakit / Klinik</label>
                      <input type="text" name="satker" value={formData.satker} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Faskes</label>
                      <textarea name="alamatInstansi" value={formData.alamatInstansi} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat SKHPN</label>
                      <input type="text" name="noSurat" value={formData.noSurat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. DOKTER PEMERIKSA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Stethoscope size={14} className="text-purple-600"/> Data Dokter Pemeriksa
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dokter Lengkap dengan Gelar</label>
                      <input type="text" name="dokterNama" value={formData.dokterNama} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NRP / NIP / SIP</label>
                        <input type="text" name="dokterNrp" value={formData.dokterNrp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Fungsional</label>
                        <input type="text" name="dokterJabatan" value={formData.dokterJabatan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. IDENTITAS TERPERIKSA (PASIEN) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Identitas Terperiksa (Pasien)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="pasienNama" value={formData.pasienNama} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor KTP (NIK)</label>
                      <input type="text" name="pasienNik" value={formData.pasienNik} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono tracking-wider text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                        <input type="text" name="pasienTempatLahir" value={formData.pasienTempatLahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                        <input type="date" name="pasienTanggalLahir" value={formData.pasienTanggalLahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                        <select name="pasienJenisKelamin" value={formData.pasienJenisKelamin} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                        <input type="text" name="pasienAgama" value={formData.pasienAgama} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                      <input type="text" name="pasienPekerjaan" value={formData.pasienPekerjaan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili</label>
                      <textarea name="pasienAlamat" value={formData.pasienAlamat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. HASIL LABORATORIUM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Activity size={14} className="text-rose-600"/> Hasil Lab 6 Parameter
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Amphetamine (AMP)</label>
                      <select name="hasilAmp" value={formData.hasilAmp} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilAmp === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Methamphetamine (MET)</label>
                      <select name="hasilMet" value={formData.hasilMet} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilMet === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Marijuana (THC)</label>
                      <select name="hasilThc" value={formData.hasilThc} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilThc === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Morphine (MOP)</label>
                      <select name="hasilMop" value={formData.hasilMop} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilMop === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Benzodiazepine (BZO)</label>
                      <select name="hasilBzo" value={formData.hasilBzo} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilBzo === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cocaine (COC)</label>
                      <select name="hasilCoc" value={formData.hasilCoc} onChange={handleChange} className={`w-full border rounded-lg p-2 text-sm font-bold focus:outline-none ${formData.hasilCoc === 'NEGATIF' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        <option value="NEGATIF">NEGATIF</option>
                        <option value="POSITIF">POSITIF</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. PENUTUP & PENGESAHAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-amber-600"/> Penutup & Pengesahan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keperluan Surat (Tujuan)</label>
                      <input type="text" name="keperluan" value={formData.keperluan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Dikeluarkan</label>
                        <input type="text" name="tempatDikeluarkan" value={formData.tempatDikeluarkan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dikeluarkan</label>
                        <input type="date" name="tanggalDikeluarkan" value={formData.tanggalDikeluarkan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
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
              <PrintWrapper documentName="Surat Keterangan Bebas Narkoba (SKHPN)" price={20000} />
           </div>

        </div>
      </main>
    </div>
  );
}
