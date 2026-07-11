"use client";

import React, { useState } from "react";
import { Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw } from "lucide-react";
import Link from "next/link";

const INITIAL_DATA = {
  nama: "",
  tempatLahir: "",
  tanggalLahir: "",
  nik: "",
  alamat: "",
  posisi: "",
  namaPerusahaan: "",
  tempatPembuatan: "",
  tanggalPembuatan: "",
};

export default function SuratPernyataanBebasNarkoba() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'identitas' | 'pekerjaan' | 'dokumen'>('identitas');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
      setFormData({ ...INITIAL_DATA });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:min-h-0 print:block">
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background: white;
            }
            @page {
              size: A4;
              margin: 20mm;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
          }
        `}
      </style>

      {/* TOP NAV SAKTI */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Bebas Narkoba</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:overflow-visible print:h-auto print:block">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className="no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full relative z-10 transition-transform">
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 border-r ${activeTab === 'identitas' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Data Diri</button>
              <button onClick={() => setActiveTab('pekerjaan')} className={`flex-1 py-3 border-r ${activeTab === 'pekerjaan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan</button>
              <button onClick={() => setActiveTab('dokumen')} className={`flex-1 py-3 ${activeTab === 'dokumen' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Dokumen</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'identitas' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Diri</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="nik" value={formData.nik} onChange={handleChange} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'pekerjaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Tujuan Melamar</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Posisi Dilamar</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="posisi" value={formData.posisi} onChange={handleChange} placeholder="Contoh: Staff Administrasi" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleChange} placeholder="Contoh: PT. Maju Mundur" />
                </div>
              </div>
              )}

              {activeTab === 'dokumen' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Informasi Dokumen</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota/Kabupaten</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tempatPembuatan" value={formData.tempatPembuatan} onChange={handleChange} placeholder="Contoh: Jakarta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalPembuatan" value={formData.tanggalPembuatan} onChange={handleChange} />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Live Preview Panel (Right) */}
        <div className="flex-1 p-4 md:p-8 bg-gray-100 overflow-y-auto flex justify-center print:p-0 print:w-full print:min-w-0 print:min-h-0 print:block print:overflow-visible">
          {/* Kertas A4 */}
          <div className="bg-white shadow-xl w-full max-w-[210mm] min-h-[297mm] p-[20mm] text-black font-serif print:w-full print:max-w-none print:shadow-none print:m-0 print:p-0">
            
            <div className="text-center mb-8">
              <h1 className="text-xl font-bold underline mb-1">
                SURAT PERNYATAAN BEBAS NARKOBA & TINDAK PIDANA
              </h1>
            </div>

            <div className="mb-4">
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              <table className="w-full ml-4 mb-4">
                <tbody>
                  <tr>
                    <td className="w-48 py-1 align-top">Nama</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1 font-semibold">{formData.nama || "[Nama Anda]"}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Tempat, Tanggal Lahir</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">
                      {formData.tempatLahir || "[Tempat]"},{" "}
                      {formData.tanggalLahir
                        ? new Date(formData.tanggalLahir).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "[Tanggal Lahir]"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Nomor Induk Kependudukan</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.nik || "[NIK]"}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Alamat Domisili</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.alamat || "[Alamat Lengkap]"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6 space-y-3 text-justify leading-relaxed">
              <p>
                Dengan ini menyatakan dengan sesungguhnya dan sebenar-benarnya dalam rangka melamar pekerjaan untuk posisi <strong>{formData.posisi || "[Posisi yang Dilamar]"}</strong> di <strong>{formData.namaPerusahaan || "[Nama Perusahaan]"}</strong>, bahwa saya:
              </p>
              <ol className="list-decimal pl-8 space-y-2">
                <li>Tidak pernah terlibat dalam penyalahgunaan, pengedaran, maupun perdagangan Narkotika, Psikotropika, dan Zat Adiktif lainnya (NAPZA).</li>
                <li>Tidak pernah dihukum penjara atau kurungan berdasarkan putusan pengadilan yang telah mempunyai kekuatan hukum yang tetap karena melakukan suatu tindak pidana kejahatan.</li>
                <li>Tidak sedang berstatus sebagai tersangka atau terdakwa dalam kasus tindak pidana apapun.</li>
                <li>Bersedia untuk dilakukan tes bebas narkoba (urine, darah, atau rambut) kapan saja secara mendadak oleh pihak perusahaan jika diperlukan.</li>
              </ol>
              <p className="mt-4 font-bold uppercase text-justify">
                Demikian surat pernyataan ini saya buat dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun. Apabila di kemudian hari terbukti bahwa pernyataan saya ini tidak benar atau saya terbukti berbohong atas salah satu poin di atas, maka saya bersedia menerima sanksi hukum sesuai ketentuan peraturan perundang-undangan yang berlaku. Selain itu, {formData.namaPerusahaan || "[Nama Perusahaan]"} BERHAK UNTUK MELAKUKAN PEMUTUSAN HUBUNGAN KERJA (PHK) SEPIHAK KEPADA SAYA PADA HARI ITU JUGA TANPA MEMBERIKAN PESANGON SEPESER PUN.
              </p>
            </div>

            <div className="flex justify-end mt-16">
              <div className="text-center w-64">
                <p className="mb-1">
                  {formData.tempatPembuatan || "[Kota]"},{" "}
                  {formData.tanggalPembuatan
                    ? new Date(formData.tanggalPembuatan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "[Tanggal]"}
                </p>
                <p className="mb-24">Yang Membuat Pernyataan,</p>
                
                <div className="relative inline-block w-full">
                  <div className="absolute left-4 top-[-60px] w-16 h-10 border border-gray-400 flex items-center justify-center text-[10px] text-gray-500 bg-gray-50 z-0">
                    Materai
                    <br />
                    10.000
                  </div>
                  <p className="font-bold underline z-10 relative bg-transparent">{formData.nama || "( _______________________ )"}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}