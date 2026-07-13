"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw 
} from 'lucide-react';
import Link from 'next/link';

interface PaklaringData {
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
  evaluasiKinerja: "Sangat Baik" | "Baik" | "Cukup" | string;
  penandatangan: {
    nama: string;
    jabatan: string;
  };
}

const DEFAULT_DATA: PaklaringData = {
  kopSurat: {
    namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    kontak: "Telp: (021) 1234567 | Email: info@majumundur.com",
  },
  nomorSurat: "123/HRD-MMS/VIII/2026",
  tanggalSurat: new Date().toISOString().split("T")[0],
  karyawan: {
    nama: "Budi Santoso",
    nik: "1234567890",
    jabatanTerakhir: "Senior Software Engineer",
    tanggalMulai: "2020-01-01",
    tanggalSelesai: "2026-07-01",
  },
  evaluasiKinerja: "Sangat Baik",
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

export default function PaklaringTemplate() {
  const [data, setData] = useState<PaklaringData>(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'surat' | 'karyawan' | 'penandatangan'>('perusahaan');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...DEFAULT_DATA });
    }
  };

  const handleInputChange = (section: keyof PaklaringData, field: string, value: string) => {
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

  const DocumentContent = () => (
    <Kertas>
      <div className="text-center border-b-[3px] border-black pb-4 mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{data.kopSurat.namaPerusahaan}</h1>
        <p className="text-sm mt-1">{data.kopSurat.alamat}</p>
        <p className="text-sm">{data.kopSurat.kontak}</p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold uppercase underline pb-1">Surat Keterangan Pengalaman Kerja</h2>
        <p className="text-sm font-semibold mt-1">No: {data.nomorSurat}</p>
      </div>

      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          Yang bertanda tangan di bawah ini, mewakili Manajemen {data.kopSurat.namaPerusahaan}, menerangkan dengan sesungguhnya bahwa:
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
          </tbody>
        </table>

        <p className="mb-4 indent-8">
          Adalah benar pernah menjadi karyawan di {data.kopSurat.namaPerusahaan} terhitung sejak tanggal <strong>{formatDate(data.karyawan.tanggalMulai)}</strong> hingga tanggal <strong>{formatDate(data.karyawan.tanggalSelesai)}</strong>.
        </p>

        <p className="mb-4 indent-8">
          Selama menjadi karyawan, yang bersangkutan telah menunjukkan kinerja dan dedikasi yang <strong>{data.evaluasiKinerja}</strong> kepada perusahaan. Kami mengucapkan terima kasih atas segala kontribusi yang telah diberikan selama masa kerja.
        </p>

        <p className="mb-8 indent-8 font-medium border-l-4 border-slate-800 pl-4 bg-slate-50 py-2">
          Kami juga menyatakan bahwa yang bersangkutan telah menyelesaikan seluruh kewajiban finansial serta telah mengembalikan seluruh aset perusahaan yang berada di bawah tanggung jawabnya (Clearance).
        </p>

        <p className="mb-8">
          Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
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
  );

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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Paklaring</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kop Surat</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Data Surat</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('penandatangan')} className={`flex-1 py-3 ${activeTab === 'penandatangan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Tanda Tangan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Kop Surat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.kopSurat.namaPerusahaan} onChange={e => handleInputChange('kopSurat', 'namaPerusahaan', e.target.value)} placeholder="Contoh: PT MAJU MUNDUR SEJAHTERA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.kopSurat.alamat} onChange={e => handleInputChange('kopSurat', 'alamat', e.target.value)} placeholder="Alamat Perusahaan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kopSurat.kontak} onChange={e => handleInputChange('kopSurat', 'kontak', e.target.value)} placeholder="Telp / Email" />
                </div>
              </div>
              )}

              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Surat & Evaluasi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSurat} onChange={e => handleInputChange('nomorSurat', 'nomorSurat', e.target.value)} placeholder="Contoh: 123/HRD-MMS/VIII/2026" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleInputChange('tanggalSurat', 'tanggalSurat', e.target.value)} />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-emerald-700 uppercase mb-3">Evaluasi Kinerja</h4>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase">Penilaian</label>
                    <select value={data.evaluasiKinerja} onChange={e => handleInputChange('evaluasiKinerja', 'evaluasiKinerja', e.target.value)} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white">
                      <option value="Sangat Baik">Sangat Baik</option>
                      <option value="Baik">Baik</option>
                      <option value="Cukup">Cukup</option>
                    </select>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.karyawan.nama} onChange={e => handleInputChange('karyawan', 'nama', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.nik} onChange={e => handleInputChange('karyawan', 'nik', e.target.value)} placeholder="Nomor Induk Karyawan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Terakhir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.jabatanTerakhir} onChange={e => handleInputChange('karyawan', 'jabatanTerakhir', e.target.value)} placeholder="Contoh: Senior Software Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalMulai} onChange={e => handleInputChange('karyawan', 'tanggalMulai', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.karyawan.tanggalSelesai} onChange={e => handleInputChange('karyawan', 'tanggalSelesai', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'penandatangan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Penandatangan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.penandatangan.nama} onChange={e => handleInputChange('penandatangan', 'nama', e.target.value)} placeholder="Contoh: Joko Anwar" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.penandatangan.jabatan} onChange={e => handleInputChange('penandatangan', 'jabatan', e.target.value)} placeholder="Contoh: HR Director" />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
