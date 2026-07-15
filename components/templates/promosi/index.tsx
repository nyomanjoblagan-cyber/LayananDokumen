'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, User, Building, FileText, BadgeDollarSign
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PromosiData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  teleponPerusahaan: string;
  emailPerusahaan: string;
  
  nomorSurat: string;
  tanggalSurat: string;
  tempatPenetapan: string;
  
  namaKaryawan: string;
  nik: string;
  
  jabatanLama: string;
  departemenLama: string;
  
  jabatanBaru: string;
  departemenBaru: string;
  
  tanggalEfektif: string;
  gajiLama: string;
  tunjanganLama: string;
  gajiBaru: string;
  tunjanganBaru: string;
  masaPercobaan: string;
  
  namaPenandatangan: string;
  jabatanPenandatangan: string;
  
  menimbang: string;
  mengingat: string;
  tembusan: string;
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: PromosiData = {
  namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
  alamatPerusahaan: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
  teleponPerusahaan: "(021) 555-0198",
  emailPerusahaan: "hrd@majumundur.co.id",
  
  nomorSurat: "045/SK-DIR/VI/2026",
  tanggalSurat: "15 Juni 2026",
  tempatPenetapan: "Jakarta",
  
  namaKaryawan: "Budi Santoso",
  nik: "EMP-2021-089",
  
  jabatanLama: "Senior Staff",
  departemenLama: "Marketing",
  jabatanBaru: "Manager Marketing",
  departemenBaru: "Marketing",
  
  tanggalEfektif: "1 Juli 2026",
  gajiLama: "Rp 8.000.000",
  tunjanganLama: "Rp 1.500.000",
  gajiBaru: "Rp 15.000.000",
  tunjanganBaru: "Rp 3.000.000",
  masaPercobaan: "3 (tiga)",
  
  namaPenandatangan: "Andi Wijaya",
  jabatanPenandatangan: "Direktur Utama",
  
  menimbang: "a. Bahwa untuk kelancaran kegiatan operasional perusahaan dan mendukung pencapaian target bisnis, perlu dilakukan pengisian jabatan pada Departemen Marketing.\nb. Bahwa berdasarkan hasil penilaian kinerja, Saudara/i Budi Santoso dinilai memenuhi syarat, memiliki kapabilitas, dan dedikasi yang baik untuk menduduki jabatan Manager Marketing.\nc. Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan b, perlu ditetapkan dengan Surat Keputusan Direksi.",
  mengingat: "1. Anggaran Dasar Perusahaan beserta seluruh perubahannya.\n2. Peraturan Perusahaan (PP) / Perjanjian Kerja Bersama (PKB) yang berlaku di lingkungan PT Maju Mundur Sejahtera.\n3. Hasil Keputusan Rapat Direksi PT Maju Mundur Sejahtera tanggal 10 Juni 2026.",
  tembusan: "1. Board of Directors\n2. HRD & GA Department\n3. Finance & Accounting Department\n4. Atasan Langsung\n5. Arsip",
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto overflow-hidden print:overflow-visible ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratPromosiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keputusan...</div>}>
      <PromosiBuilder />
    </Suspense>
  );
}

function PromosiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'karyawan' | 'kompensasi' | 'sk' | 'perusahaan'>('karyawan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PromosiData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(DEFAULT_DATA);
    }
  };

  const handleInputChange = (field: keyof PromosiData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Kop Surat */}
      <div className="border-b-4 border-black pb-4 mb-6 text-center break-inside-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.namaPerusahaan}</h1>
        <p className="text-sm mb-1">{data.alamatPerusahaan}</p>
        <p className="text-sm">Telp: {data.teleponPerusahaan} | Email: {data.emailPerusahaan}</p>
      </div>

      {/* Judul Surat */}
      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black inline-block pb-1">
          SURAT KEPUTUSAN DIREKSI
        </h2>
        <p className="mt-2 text-[11pt] uppercase font-bold">Nomor: {data.nomorSurat}</p>
        <p className="mt-2 text-[11pt] uppercase">Tentang</p>
        <p className="text-[11pt] uppercase font-bold">Pengangkatan dan Promosi Jabatan</p>
      </div>

      {/* Menimbang & Mengingat */}
      <div className="mb-6 break-inside-avoid">
        <div className="flex mb-2">
          <div className="w-32 font-bold flex-shrink-0">MENIMBANG</div>
          <div className="w-4 font-bold flex-shrink-0">:</div>
          <div className="flex-1 whitespace-pre-line text-justify">
            {data.menimbang}
          </div>
        </div>
        <div className="flex">
          <div className="w-32 font-bold flex-shrink-0">MENGINGAT</div>
          <div className="w-4 font-bold flex-shrink-0">:</div>
          <div className="flex-1 whitespace-pre-line text-justify">
            {data.mengingat}
          </div>
        </div>
      </div>

      {/* Memutuskan */}
      <div className="flex mt-6 mb-2 break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">MEMUTUSKAN</div>
      </div>

      <div className="flex break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">MENETAPKAN</div>
        <div className="w-4 font-bold flex-shrink-0">:</div>
        <div className="flex-1 uppercase font-bold text-justify">
          SURAT KEPUTUSAN DIREKSI TENTANG PENGANGKATAN DAN PROMOSI JABATAN ATAS NAMA SAUDARA/I {data.namaKaryawan}.
        </div>
      </div>

      {/* Pasal-Pasal SK */}
      <div className="flex mt-4 break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">PERTAMA</div>
        <div className="w-4 font-bold flex-shrink-0">:</div>
        <div className="flex-1 text-justify">
          Memberhentikan dengan hormat Saudara/i <strong>{data.namaKaryawan}</strong> (NIK: {data.nik}) dari jabatannya yang lama sebagai <strong>{data.jabatanLama}</strong> pada Departemen <strong>{data.departemenLama}</strong> dengan ucapan terima kasih atas dedikasi dan pengabdiannya selama menjabat.
        </div>
      </div>

      <div className="flex mt-3 break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">KEDUA</div>
        <div className="w-4 font-bold flex-shrink-0">:</div>
        <div className="flex-1 text-justify">
          Mengangkat Saudara/i <strong>{data.namaKaryawan}</strong> pada jabatan yang baru sebagai <strong>{data.jabatanBaru}</strong> pada Departemen <strong>{data.departemenBaru}</strong>.
        </div>
      </div>

      <div className="flex mt-3 break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">KETIGA</div>
        <div className="w-4 font-bold flex-shrink-0">:</div>
        <div className="flex-1 text-justify">
          Kepadanya diberikan kompensasi berupa Gaji Pokok sebesar <strong>{data.gajiBaru}</strong> dan Tunjangan sebesar <strong>{data.tunjanganBaru}</strong> per bulan, serta fasilitas dan benefit lain sesuai dengan Peraturan Perusahaan yang berlaku.
          {data.masaPercobaan && (
            <span> Masa evaluasi atas posisi baru ini ditetapkan selama <strong>{data.masaPercobaan} bulan</strong>.</span>
          )}
        </div>
      </div>

      <div className="flex mt-3 break-inside-avoid">
        <div className="w-32 font-bold flex-shrink-0">KEEMPAT</div>
        <div className="w-4 font-bold flex-shrink-0">:</div>
        <div className="flex-1 text-justify">
          Surat Keputusan ini berlaku efektif terhitung mulai tanggal <strong>{data.tanggalEfektif}</strong>. Apabila di kemudian hari ternyata terdapat kekeliruan dalam keputusan ini, maka akan diadakan perbaikan sebagaimana mestinya.
        </div>
      </div>

      {/* Tanda Tangan */}
      <div className="mt-12 flex justify-end break-inside-avoid shrink-0">
        <div className="w-72">
          <table className="w-full mb-20">
            <tbody>
              <tr>
                <td className="w-24 py-1">Ditetapkan di</td>
                <td className="w-4 py-1">:</td>
                <td className="py-1">{data.tempatPenetapan}</td>
              </tr>
              <tr>
                <td className="py-1">Pada tanggal</td>
                <td className="py-1">:</td>
                <td className="py-1">{data.tanggalSurat}</td>
              </tr>
            </tbody>
          </table>
          <div className="w-full border-b border-black font-bold uppercase mb-1">
            {data.namaPenandatangan}
          </div>
          <div className="w-full text-sm">
            {data.jabatanPenandatangan}
          </div>
        </div>
      </div>

      {/* Tembusan */}
      {data.tembusan && (
        <div className="mt-8 text-sm break-inside-avoid">
          <p className="font-bold underline mb-1">Tembusan:</p>
          <div className="whitespace-pre-line pl-4">
            {data.tembusan}
          </div>
        </div>
      )}
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keputusan Promosi Jabatan</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">HR Documents</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans shrink-0">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" /> Editor Promosi Jabatan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 py-3 border-r ${activeTab === 'kompensasi' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kompensasi</button>
              <button onClick={() => setActiveTab('sk')} className={`flex-1 py-3 border-r ${activeTab === 'sk' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>SK & TTD</button>
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 ${activeTab === 'perusahaan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kop</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-32">
                
                {activeTab === 'karyawan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><User size={14}/> Identitas Karyawan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Karyawan</label>
                    <input type="text" value={data.namaKaryawan} onChange={(e) => handleInputChange('namaKaryawan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                    <input type="text" value={data.nik} onChange={(e) => handleInputChange('nik', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                  </div>
                  
                  <div className="p-3 bg-slate-50 border rounded-lg mt-4 space-y-3">
                     <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-2">POSISI LAMA</p>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Lama</label>
                       <input type="text" value={data.jabatanLama} onChange={(e) => handleInputChange('jabatanLama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen Lama</label>
                       <input type="text" value={data.departemenLama} onChange={(e) => handleInputChange('departemenLama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                     </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg mt-4 space-y-3">
                     <p className="text-[10px] font-black text-blue-800 uppercase tracking-wider mb-2">POSISI BARU (PROMOSI)</p>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Baru</label>
                       <input type="text" value={data.jabatanBaru} onChange={(e) => handleInputChange('jabatanBaru', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-blue-900" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen Baru</label>
                       <input type="text" value={data.departemenBaru} onChange={(e) => handleInputChange('departemenBaru', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                     </div>
                  </div>
                </div>
                )}

                {activeTab === 'kompensasi' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 flex items-center gap-2"><BadgeDollarSign size={14}/> Perubahan Kompensasi</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Lama</label>
                       <input type="text" value={data.gajiLama} onChange={(e) => handleInputChange('gajiLama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Lama</label>
                       <input type="text" value={data.tunjanganLama} onChange={(e) => handleInputChange('tunjanganLama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg mb-4">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Baru</label>
                       <input type="text" value={data.gajiBaru} onChange={(e) => handleInputChange('gajiBaru', e.target.value)} className="w-full p-2 border border-indigo-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-indigo-900" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Baru</label>
                       <input type="text" value={data.tunjanganBaru} onChange={(e) => handleInputChange('tunjanganBaru', e.target.value)} className="w-full p-2 border border-indigo-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-indigo-900" />
                     </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif Berlakunya SK</label>
                    <input type="text" value={data.tanggalEfektif} onChange={(e) => handleInputChange('tanggalEfektif', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cth: 1 Juli 2026" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Percobaan / Evaluasi (Bulan)</label>
                    <input type="text" value={data.masaPercobaan} onChange={(e) => handleInputChange('masaPercobaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Kosongkan jika tidak ada" />
                  </div>
                </div>
                )}

                {activeTab === 'sk' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><FileText size={14}/> Ketentuan Surat & Pengesahan</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor SK</label>
                       <input type="text" value={data.nomorSurat} onChange={(e) => handleInputChange('nomorSurat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-mono" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                       <input type="text" value={data.tanggalSurat} onChange={(e) => handleInputChange('tanggalSurat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                     </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Konsideran: MENIMBANG</label>
                     <textarea value={data.menimbang} onChange={(e) => handleInputChange('menimbang', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-32 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"></textarea>
                  </div>
                  
                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Konsideran: MENGINGAT</label>
                     <textarea value={data.mengingat} onChange={(e) => handleInputChange('mengingat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-24 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"></textarea>
                  </div>

                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 mt-6">Penandatangan SK</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Ditetapkan</label>
                       <input type="text" value={data.tempatPenetapan} onChange={(e) => handleInputChange('tempatPenetapan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penandatangan</label>
                       <input type="text" value={data.namaPenandatangan} onChange={(e) => handleInputChange('namaPenandatangan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none font-bold uppercase" />
                     </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                    <input type="text" value={data.jabatanPenandatangan} onChange={(e) => handleInputChange('jabatanPenandatangan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  
                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Tembusan (Opsional)</label>
                     <textarea value={data.tembusan} onChange={(e) => handleInputChange('tembusan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                  </div>
                </div>
                )}

                {activeTab === 'perusahaan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><Building size={14}/> Kop Perusahaan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                    <input type="text" value={data.namaPerusahaan} onChange={(e) => handleInputChange('namaPerusahaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-amber-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor</label>
                    <textarea value={data.alamatPerusahaan} onChange={(e) => handleInputChange('alamatPerusahaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Telepon</label>
                       <input type="text" value={data.teleponPerusahaan} onChange={(e) => handleInputChange('teleponPerusahaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Email Perusahaan</label>
                       <input type="text" value={data.emailPerusahaan} onChange={(e) => handleInputChange('emailPerusahaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                     </div>
                  </div>
                </div>
                )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="SK_Promosi_Jabatan" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
