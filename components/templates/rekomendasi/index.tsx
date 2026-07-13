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
  };
  nomorSurat: string;
  tanggalSurat: string;
  karyawan: {
    nama: string;
    nik: string;
    jabatanTerakhir: string;
    tanggalMulai: string;
    tanggalSelesai: string;
  };
  penerimaRekomendasi: string;
  alasanRekomendasi: string;
  penandatangan: {
    nama: string;
    jabatan: string;
  };
}

const DEFAULT_DATA: RekomendasiData = {
  kopSurat: {
    namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    kontak: "Telp: (021) 1234567 | Email: info@majumundur.com",
  },
  nomorSurat: "124/HRD-MMS/VIII/2026",
  tanggalSurat: new Date().toISOString().split("T")[0],
  karyawan: {
    nama: "Budi Santoso",
    nik: "1234567890",
    jabatanTerakhir: "Senior Software Engineer",
    tanggalMulai: "2020-01-01",
    tanggalSelesai: "2026-07-01",
  },
  penerimaRekomendasi: "Pimpinan Perusahaan / HRD",
  alasanRekomendasi: "Yang bersangkutan memiliki etos kerja yang sangat baik, mampu bekerja sama dalam tim, dan selalu mencapai target yang diberikan oleh perusahaan.",
  penandatangan: {
    nama: "Joko Anwar",
    jabatan: "HR Director",
  },
};

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function RekomendasiTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <RekomendasiBuilder />
    </Suspense>
  );
}

function RekomendasiBuilder() {
  const [data, setData] = useState<RekomendasiData>(DEFAULT_DATA);
  const printRef = useRef<HTMLDivElement>(null);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'kop' | 'surat' | 'karyawan' | 'detail' | 'ttd'>('kop');

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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Rekomendasi Kerja</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileView(prev => prev === 'editor' ? 'preview' : 'editor')} className="md:hidden bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              {mobileView === 'editor' ? <><Eye size={16} /> Preview</> : <><Edit3 size={16} /> Editor</>}
            </button>
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('kop')} className={`flex-1 py-3 border-r ${activeTab === 'kop' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kop Surat</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('detail')} className={`flex-1 py-3 border-r ${activeTab === 'detail' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Alasan</button>
              <button onClick={() => setActiveTab('ttd')} className={`flex-1 py-3 ${activeTab === 'ttd' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'kop' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Kop Surat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.kopSurat.namaPerusahaan} onChange={(e) => handleInputChange("kopSurat", "namaPerusahaan", e.target.value)} placeholder="Contoh: PT MAJU MUNDUR SEJAHTERA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.kopSurat.alamat} onChange={(e) => handleInputChange("kopSurat", "alamat", e.target.value)} placeholder="Alamat lengkap perusahaan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kopSurat.kontak} onChange={(e) => handleInputChange("kopSurat", "kontak", e.target.value)} placeholder="Telp / Email / Website" />
                </div>
              </div>
              )}

              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Surat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSurat} onChange={(e) => handleInputChange("nomorSurat", "nomorSurat", e.target.value)} placeholder="Nomor Surat" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={(e) => handleInputChange("tanggalSurat", "tanggalSurat", e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Penerima Rekomendasi</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.penerimaRekomendasi} onChange={(e) => handleInputChange("penerimaRekomendasi", "penerimaRekomendasi", e.target.value)} placeholder="Pihak yang dituju" />
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.karyawan.nama} onChange={(e) => handleInputChange("karyawan", "nama", e.target.value)} placeholder="Nama Karyawan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Karyawan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.nik} onChange={(e) => handleInputChange("karyawan", "nik", e.target.value)} placeholder="NIK Karyawan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Terakhir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.jabatanTerakhir} onChange={(e) => handleInputChange("karyawan", "jabatanTerakhir", e.target.value)} placeholder="Jabatan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalMulai} onChange={(e) => handleInputChange("karyawan", "tanggalMulai", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalSelesai} onChange={(e) => handleInputChange("karyawan", "tanggalSelesai", e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'detail' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Detail Rekomendasi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Rekomendasi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32 leading-relaxed" value={data.alasanRekomendasi} onChange={(e) => handleInputChange("alasanRekomendasi", "alasanRekomendasi", e.target.value)} placeholder="Uraian alasan rekomendasi..." />
                </div>
              </div>
              )}

              {activeTab === 'ttd' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Penandatangan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penandatangan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.penandatangan.nama} onChange={(e) => handleInputChange("penandatangan", "nama", e.target.value)} placeholder="Nama Lengkap" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.penandatangan.jabatan} onChange={(e) => handleInputChange("penandatangan", "jabatan", e.target.value)} placeholder="Contoh: HR Director" />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Right Panel: Live Preview (A4 Paper) */}
        <div className="flex-1 overflow-y-auto bg-slate-200 print:bg-white p-4 md:p-8 print:p-0 flex justify-center custom-scrollbar print:block print:overflow-visible">
          <div id="print-only-root" className="w-full flex justify-center print:block print:h-auto print:static" ref={printRef}>
            <Kertas>
              <div className="text-center border-b-[3px] border-black pb-4 mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-wider">{data.kopSurat.namaPerusahaan}</h1>
                <p className="text-sm mt-1">{data.kopSurat.alamat}</p>
                <p className="text-sm">{data.kopSurat.kontak}</p>
              </div>

              <div className="mb-8">
                <p className="mb-1">No: {data.nomorSurat}</p>
                <p className="mb-1">Hal: Surat Rekomendasi Kerja</p>
                <br />
                <p className="mb-1">Kepada Yth,</p>
                <p className="font-bold mb-1">{data.penerimaRekomendasi}</p>
                <p className="mb-1">Di Tempat</p>
              </div>

              <div className="text-justify leading-relaxed">
                <p className="mb-4">
                  Dengan hormat,
                </p>
                <p className="mb-4">
                  Melalui surat ini, kami mewakili Manajemen {data.kopSurat.namaPerusahaan}, memberikan rekomendasi kepada mantan karyawan kami:
                </p>

                <table className="w-full mb-4 ml-4">
                  <tbody>
                    <tr>
                      <td className="w-48 py-1">Nama</td>
                      <td className="w-4 py-1">:</td>
                      <td className="font-semibold">{data.karyawan.nama}</td>
                    </tr>
                    <tr>
                      <td className="py-1">NIK</td>
                      <td className="py-1">:</td>
                      <td>{data.karyawan.nik}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Jabatan Terakhir</td>
                      <td className="py-1">:</td>
                      <td className="font-semibold">{data.karyawan.jabatanTerakhir}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Masa Kerja</td>
                      <td className="py-1">:</td>
                      <td>{formatDate(data.karyawan.tanggalMulai)} s/d {formatDate(data.karyawan.tanggalSelesai)}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="mb-4 indent-8">
                  Selama bekerja di {data.kopSurat.namaPerusahaan}, Saudara/i {data.karyawan.nama} telah menunjukkan prestasi kerja dan perilaku yang baik. {data.alasanRekomendasi}
                </p>

                <p className="mb-4 indent-8">
                  Kami meyakini bahwa Saudara/i {data.karyawan.nama} dapat memberikan kontribusi yang positif di tempat kerja yang baru, sebagaimana dedikasi yang telah diberikan kepada perusahaan kami.
                </p>

                <p className="mb-8 indent-8 font-medium border-l-4 border-red-700 pl-4 bg-red-50 py-3 text-red-900 text-sm">
                  <strong>Pelepasan Tanggung Jawab (Disclaimer):</strong> Surat rekomendasi ini diterbitkan semata-mata sebagai bentuk referensi kinerja masa lalu. {data.kopSurat.namaPerusahaan} beserta seluruh manajemennya dibebaskan secara penuh dari segala tuntutan, kewajiban hukum, dan bentuk tanggung jawab apa pun terkait tindakan, kelalaian, kesepakatan, maupun performa kerja yang bersangkutan di perusahaan atau instansi yang baru. Segala risiko yang timbul di masa depan sepenuhnya menjadi tanggung jawab individu yang bersangkutan dan/atau pihak penerima kerja yang baru.
                </p>

                <p className="mb-8">
                  Demikian surat rekomendasi ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
                </p>
              </div>

              <div className="flex justify-end mt-12 break-inside-avoid">
                <div className="text-center w-64">
                  <p className="mb-1">Jakarta, {formatDate(data.tanggalSurat)}</p>
                  <p className="font-bold mb-24">{data.kopSurat.namaPerusahaan}</p>
                  <p className="font-bold underline">{data.penandatangan.nama}</p>
                  <p>{data.penandatangan.jabatan}</p>
                </div>
              </div>
            </Kertas>
          </div>
        </div>
      </main>
    </div>
  );
}