"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen } from "lucide-react";
import Link from "next/link";

// Types
interface FormState {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  teleponPerusahaan: string;
  emailPerusahaan: string;
  nomorSurat: string;
  tanggalSurat: string;
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
}

const INITIAL_DATA: FormState = {
  namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
  alamatPerusahaan: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
  teleponPerusahaan: "(021) 555-0198",
  emailPerusahaan: "hrd@majumundur.co.id",
  nomorSurat: "045/HRD-PROMO/VI/2026",
  tanggalSurat: "15 Juni 2026",
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
  jabatanPenandatangan: "Direktur HRD",
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div 
    id="print-area" 
    className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[20mm] text-black font-serif text-[12pt] leading-relaxed relative print:w-full print:min-w-0 print:min-h-0 mx-auto"
  >
    {children}
  </div>
);

export default function SuratPromosiTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PromosiBuilder />
    </Suspense>
  );
}

function PromosiBuilder() {
  const [formData, setFormData] = useState<FormState>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'karyawan' | 'kompensasi' | 'perusahaan' | 'surat'>('karyawan');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setFormData({ ...INITIAL_DATA });
    }
  };

  const handleChange = (field: keyof FormState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .no-print { display: none !important; }
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Promosi Jabatan</span>
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
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 py-3 border-r ${activeTab === 'kompensasi' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kompensasi</button>
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 ${activeTab === 'surat' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Data Karyawan & Promosi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.nik} onChange={e => handleChange('nik', e.target.value)} placeholder="EMP-2021-089" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.jabatanLama} onChange={e => handleChange('jabatanLama', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dept. Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.departemenLama} onChange={e => handleChange('departemenLama', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.jabatanBaru} onChange={e => handleChange('jabatanBaru', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dept. Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.departemenBaru} onChange={e => handleChange('departemenBaru', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tanggalEfektif} onChange={e => handleChange('tanggalEfektif', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Percobaan (Bulan)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.masaPercobaan} onChange={e => handleChange('masaPercobaan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'kompensasi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Kompensasi & Benefit</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.gajiLama} onChange={e => handleChange('gajiLama', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tunjanganLama} onChange={e => handleChange('tunjanganLama', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.gajiBaru} onChange={e => handleChange('gajiBaru', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.tunjanganBaru} onChange={e => handleChange('tunjanganBaru', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Informasi Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={formData.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Telepon</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.teleponPerusahaan} onChange={e => handleChange('teleponPerusahaan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.emailPerusahaan} onChange={e => handleChange('emailPerusahaan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Data Surat & Penandatangan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Penandatangan</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaPenandatangan} onChange={e => handleChange('namaPenandatangan', e.target.value)} />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.jabatanPenandatangan} onChange={e => handleChange('jabatanPenandatangan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Right Panel: Preview A4 */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-200 print:p-0 print:bg-white flex justify-center print:block custom-scrollbar print:overflow-visible">
          <Kertas>
            {/* Header/Kop Surat */}
            <div className="border-b-4 border-black pb-4 mb-8 text-center">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-1 text-black">{formData.namaPerusahaan}</h1>
              <p className="text-sm">{formData.alamatPerusahaan}</p>
              <p className="text-sm">Telp: {formData.teleponPerusahaan} | Email: {formData.emailPerusahaan}</p>
            </div>

            {/* Judul Surat */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold uppercase underline decoration-2 underline-offset-4">Surat Pengangkatan & Promosi Jabatan</h2>
              <p className="mt-1 font-semibold">Nomor: {formData.nomorSurat}</p>
            </div>

            {/* Isi Surat */}
            <div className="text-justify space-y-4">
              <p>
                Melalui surat ini, Manajemen <strong>{formData.namaPerusahaan}</strong> menyampaikan penghargaan yang setinggi-tingginya atas dedikasi, loyalitas, dan prestasi kerja yang telah Saudara/i tunjukkan selama ini.
              </p>
              
              <p>
                Berdasarkan hasil penilaian kinerja dan evaluasi Manajemen yang komprehensif, dengan ini kami memutuskan untuk memberikan <strong>PROMOSI JABATAN</strong> kepada:
              </p>

              <table className="w-full my-4 ml-4">
                <tbody>
                  <tr>
                    <td className="w-48 align-top py-1">Nama Lengkap</td>
                    <td className="w-4 align-top py-1">:</td>
                    <td className="font-bold py-1">{formData.namaKaryawan}</td>
                  </tr>
                  <tr>
                    <td className="align-top py-1">Nomor Induk Karyawan</td>
                    <td className="align-top py-1">:</td>
                    <td className="py-1">{formData.nik}</td>
                  </tr>
                  <tr>
                    <td className="align-top py-1">Jabatan & Dept. Lama</td>
                    <td className="align-top py-1">:</td>
                    <td className="py-1">{formData.jabatanLama} - {formData.departemenLama}</td>
                  </tr>
                  <tr>
                    <td className="align-top py-1 font-semibold">Jabatan & Dept. Baru</td>
                    <td className="align-top py-1 font-semibold">:</td>
                    <td className="font-bold py-1">{formData.jabatanBaru} - {formData.departemenBaru}</td>
                  </tr>
                  <tr>
                    <td className="align-top py-1 text-red-600 font-semibold">Tanggal Efektif</td>
                    <td className="align-top py-1 text-red-600 font-semibold">:</td>
                    <td className="py-1 text-red-600 font-bold">{formData.tanggalEfektif}</td>
                  </tr>
                </tbody>
              </table>

              <p>
                Sehubungan dengan promosi jabatan tersebut, dengan ini ditetapkan pula penyesuaian atas <strong>Kompensasi dan Benefit</strong> Saudara/i dengan perincian sebagai berikut:
              </p>

              {/* Comparison Table */}
              <div className="my-6">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 p-2 text-center w-1/3">Komponen</th>
                      <th className="border border-gray-400 p-2 text-center w-1/3">Sebelumnya</th>
                      <th className="border border-gray-400 p-2 text-center w-1/3">Terbaru</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">Gaji Pokok</td>
                      <td className="border border-gray-400 p-2 text-right">{formData.gajiLama}</td>
                      <td className="border border-gray-400 p-2 text-right font-bold text-green-700">{formData.gajiBaru}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">Tunjangan Jabatan/Lainnya</td>
                      <td className="border border-gray-400 p-2 text-right">{formData.tunjanganLama}</td>
                      <td className="border border-gray-400 p-2 text-right font-bold text-green-700">{formData.tunjanganBaru}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 mt-4 rounded-r-md">
                <p className="text-sm">
                  <strong>Klausul Masa Percobaan / Evaluasi:</strong><br />
                  Saudara/i akan menjalani masa evaluasi kinerja untuk posisi baru ini selama <strong>{formData.masaPercobaan} bulan</strong> terhitung sejak tanggal efektif promosi. Apabila dalam masa evaluasi tersebut kinerja Saudara/i dinilai belum memenuhi ekspektasi perusahaan, maka Manajemen berhak melakukan peninjauan kembali atas keputusan promosi ini.
                </p>
              </div>

              <p className="mt-4">
                Kami berharap dengan tanggung jawab baru ini, Saudara/i dapat terus memberikan kontribusi terbaik, senantiasa berinovasi, dan menjadi teladan yang baik bagi seluruh karyawan di lingkungan perusahaan.
              </p>
              
              <p>
                Demikian Surat Pengangkatan dan Promosi Jabatan ini dibuat agar dapat dipergunakan sebagaimana mestinya. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="mt-12 w-full flex justify-between">
              <div className="w-1/2 flex flex-col items-center">
                <p className="mb-24">Menyetujui & Menerima,</p>
                <div className="text-center w-full">
                  <p className="font-bold underline uppercase">{formData.namaKaryawan}</p>
                  <p>{formData.jabatanBaru}</p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-center">
                <p className="mb-24">Dikeluarkan di Jakarta, {formData.tanggalSurat}</p>
                <div className="text-center w-full">
                  <p className="font-bold underline uppercase">{formData.namaPenandatangan}</p>
                  <p>{formData.jabatanPenandatangan}</p>
                </div>
              </div>
            </div>

          </Kertas>
        </div>
      </main>
    </div>
  );
}