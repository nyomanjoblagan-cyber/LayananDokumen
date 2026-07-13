"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from 'next/link';
import { 
  Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen, Eye
} from 'lucide-react';

interface RekomendasiData {
  kopSurat: {
    namaPerusahaan: string;
    alamat: string;
    kontak: string;
    website: string;
  };
  nomorSurat: string;
  tanggalSurat: string;
  karyawan: {
    nama: string;
    nik: string;
    jabatanTerakhir: string;
    departemen: string;
    tanggalMulai: string;
    tanggalSelesai: string;
  };
  alasanRekomendasi: string;
  alasanKeluar: string;
  penandatangan: {
    nama: string;
    jabatan: string;
  };
}

const DEFAULT_DATA: RekomendasiData = {
  kopSurat: {
    namaPerusahaan: "PT BINA KARYA GEMILANG",
    alamat: "Gedung Cyber Tower Lt. 15, Jl. H.R. Rasuna Said Kav. X-2, Jakarta Selatan 12950",
    kontak: "Telp: (021) 555-0198 | Fax: (021) 555-0199 | Email: hr@binakarya.co.id",
    website: "www.binakarya.co.id",
  },
  nomorSurat: "087/HRD-BKG/REF/VIII/2026",
  tanggalSurat: new Date().toISOString().split("T")[0],
  karyawan: {
    nama: "Budi Santoso, S.Kom.",
    nik: "BKG-2020-045",
    jabatanTerakhir: "Senior Software Engineer",
    departemen: "Information Technology",
    tanggalMulai: "2020-02-15",
    tanggalSelesai: "2026-07-31",
  },
  alasanRekomendasi: "Selama masa baktinya di perusahaan kami, yang bersangkutan telah menunjukkan kinerja yang sangat memuaskan, dedikasi yang tinggi, serta integritas yang baik. Yang bersangkutan mampu bekerja secara individu maupun dalam tim, dan selalu memberikan kontribusi positif terhadap pencapaian target perusahaan.",
  alasanKeluar: "mengundurkan diri atas kemauan sendiri",
  penandatangan: {
    nama: "Siti Rahmawati, S.E., M.M.",
    jabatan: "Human Resources Director",
  },
};

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function RekomendasiTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Editor HRD...</div>}>
      <RekomendasiBuilder />
    </Suspense>
  );
}

function RekomendasiBuilder() {
  const [data, setData] = useState<RekomendasiData>(DEFAULT_DATA);
  const printRef = useRef<HTMLDivElement>(null);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'kop' | 'surat' | 'karyawan' | 'penilaian' | 'ttd'>('kop');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
      setData({ ...DEFAULT_DATA });
    }
  };

  const handleInputChange = (section: keyof RekomendasiData, field: string, value: string) => {
    setData((prev) => {
      const targetSection = prev[section];
      if (typeof targetSection === "object" && targetSection !== null) {
        return { ...prev, [section]: { ...targetSection, [field]: value } };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">HR Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-blue-500" /> <span>Surat Referensi Kerja</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileView(prev => prev === 'editor' ? 'preview' : 'editor')} className="md:hidden bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              {mobileView === 'editor' ? <><Eye size={16} /> Preview</> : <><Edit3 size={16} /> Editor</>}
            </button>
            <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen Formal</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-600" /> Form HRD</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('kop')} className={`flex-1 py-3 border-r ${activeTab === 'kop' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kop</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('penilaian')} className={`flex-1 py-3 border-r ${activeTab === 'penilaian' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penilaian</button>
              <button onClick={() => setActiveTab('ttd')} className={`flex-1 py-3 ${activeTab === 'ttd' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'kop' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Kop Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.kopSurat.namaPerusahaan} onChange={(e) => handleInputChange("kopSurat", "namaPerusahaan", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.kopSurat.alamat} onChange={(e) => handleInputChange("kopSurat", "alamat", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak (Telp/Fax/Email)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kopSurat.kontak} onChange={(e) => handleInputChange("kopSurat", "kontak", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Website Resmi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kopSurat.website} onChange={(e) => handleInputChange("kopSurat", "website", e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Administrasi Surat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Referensi (No. Surat)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.nomorSurat} onChange={(e) => handleInputChange("nomorSurat", "nomorSurat", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Diterbitkan</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={(e) => handleInputChange("tanggalSurat", "tanggalSurat", e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Profil Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.karyawan.nama} onChange={(e) => handleInputChange("karyawan", "nama", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Karyawan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.nik} onChange={(e) => handleInputChange("karyawan", "nik", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Terakhir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.jabatanTerakhir} onChange={(e) => handleInputChange("karyawan", "jabatanTerakhir", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen / Divisi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.departemen} onChange={(e) => handleInputChange("karyawan", "departemen", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Mulai Bergabung</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalMulai} onChange={(e) => handleInputChange("karyawan", "tanggalMulai", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Keluar</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalSelesai} onChange={(e) => handleInputChange("karyawan", "tanggalSelesai", e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'penilaian' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Evaluasi & Pengakhiran</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Evaluasi Kinerja & Karakter (Rekomendasi)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32 leading-relaxed" value={data.alasanRekomendasi} onChange={(e) => handleInputChange("alasanRekomendasi", "alasanRekomendasi", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Pengakhiran Hubungan Kerja</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.alasanKeluar} onChange={(e) => handleInputChange("alasanKeluar", "alasanKeluar", e.target.value)} placeholder="Contoh: Mengundurkan diri atas kemauan sendiri" />
                  <p className="text-[9px] text-slate-400 mt-1">Ditulis dalam huruf kecil/kalimat lanjutan.</p>
                </div>
              </div>
              )}

              {activeTab === 'ttd' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Otorisasi HRD</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pimpinan / HRD</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.penandatangan.nama} onChange={(e) => handleInputChange("penandatangan", "nama", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Pimpinan / HRD</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.penandatangan.jabatan} onChange={(e) => handleInputChange("penandatangan", "jabatan", e.target.value)} />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Right Panel: Live Preview (A4 Paper) */}
        <div className="flex-1 overflow-y-auto bg-slate-200 print:bg-white p-4 md:p-8 print:p-0 flex justify-center custom-scrollbar print:hidden print:overflow-visible">
          <div id="print-only-root" className="w-full flex justify-center print:block print:h-auto print:static" ref={printRef}>
            <Kertas>
              {/* KOP SURAT CORPORATE */}
              <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-1">
                <div className="flex-1 text-center">
                  <h1 className="text-3xl font-black text-slate-900 tracking-wider mb-2 uppercase">{data.kopSurat.namaPerusahaan}</h1>
                  <p className="text-[10pt] text-slate-700 leading-snug">{data.kopSurat.alamat}</p>
                  <p className="text-[10pt] text-slate-700 leading-snug">{data.kopSurat.kontak} | Website: {data.kopSurat.website}</p>
                </div>
              </div>
              <div className="border-b-[1px] border-black w-full mb-8"></div>

              {/* JUDUL SURAT */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold uppercase underline tracking-wide">Surat Referensi Kerja</h2>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600 mt-1">Certificate Of Employment</h3>
                <p className="text-[11pt] mt-2">Nomor: {data.nomorSurat}</p>
              </div>

              {/* ISI SURAT */}
              <div className="text-justify leading-relaxed mt-8">
                <p className="mb-4">
                  Yang bertanda tangan di bawah ini, mewakili manajemen <strong>{data.kopSurat.namaPerusahaan}</strong>, menerangkan dengan sesungguhnya bahwa:
                </p>

                <div className="ml-8 mb-6">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-48 py-1.5 align-top">Nama</td>
                        <td className="w-4 py-1.5 align-top">:</td>
                        <td className="font-bold py-1.5 uppercase">{data.karyawan.nama}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top">NIK / ID Karyawan</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5">{data.karyawan.nik}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top">Jabatan Terakhir</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5">{data.karyawan.jabatanTerakhir}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top">Departemen</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5">{data.karyawan.departemen}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top">Masa Kerja</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5">
                          {formatDate(data.karyawan.tanggalMulai)} s/d {formatDate(data.karyawan.tanggalSelesai)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4 text-justify">
                  Adalah benar pernah menjadi karyawan di perusahaan kami sesuai dengan masa kerja tersebut di atas. Hubungan kerja dengan yang bersangkutan telah berakhir dikarenakan <strong>{data.alasanKeluar}</strong>.
                </p>

                <p className="mb-4 text-justify">
                  {data.alasanRekomendasi}
                </p>

                <p className="mb-12 text-justify">
                  Kami mengucapkan terima kasih atas segala dedikasi dan kontribusi yang telah diberikan selama bergabung bersama <strong>{data.kopSurat.namaPerusahaan}</strong>, dan kami berharap Saudara/i {data.karyawan.nama.split(',')[0]} meraih kesuksesan di masa mendatang.
                </p>

                <p className="mb-8">
                  Demikian Surat Referensi Kerja ini dibuat agar dapat dipergunakan sebagaimana mestinya oleh pihak-pihak yang berkepentingan.
                </p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-between mt-12 break-inside-avoid">
                <div className="w-1/2">
                   {/* Optional QR / Stempel Area left empty for alignment */}
                </div>
                <div className="w-1/2 flex flex-col items-end text-right">
                  <div className="text-left w-64 inline-block">
                    <p className="mb-2">Jakarta, {formatDate(data.tanggalSurat)}</p>
                    <p className="font-bold mb-24 uppercase">{data.kopSurat.namaPerusahaan}</p>
                    
                    <p className="font-bold underline">{data.penandatangan.nama}</p>
                    <p className="text-slate-700">{data.penandatangan.jabatan}</p>
                  </div>
                </div>
              </div>

              {/* CORPORATE FOOTER DISCLAIMER */}
              <div className="absolute bottom-[20mm] left-[20mm] right-[20mm] print:bottom-0 print:left-0 print:right-0 mt-20">
                <div className="border-t-[1px] border-slate-300 pt-2 text-[8pt] text-slate-500 text-justify italic">
                  *Dokumen ini diterbitkan secara sah oleh Departemen HRD {data.kopSurat.namaPerusahaan}. Surat ini bersifat rahasia dan diperuntukkan murni sebagai referensi profesional. Perusahaan tidak bertanggung jawab atas segala tindakan atau kewajiban di luar masa kerja yang tercantum.
                </div>
              </div>
              
            </Kertas>
          </div>
        </div>
      </main>
    </div>
  );
}
