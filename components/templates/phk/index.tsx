"use client";

import React, { useState, useRef } from "react";
import { Printer, FileText, Building2, User, FileWarning, DollarSign, ArrowLeftCircle, BookOpen, Edit3, RotateCcw } from "lucide-react";
import Link from 'next/link';

// Komponen Kertas untuk Preview dan Print
const Kertas = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-200 p-4 md:p-8 min-h-screen flex justify-center print:p-0 print:bg-white print:min-h-0">
      <div className="bg-white shadow-xl w-full max-w-[210mm] min-h-[297mm] p-[20mm] print:shadow-none print:w-full print:max-w-none print:m-0 print:p-0 text-black">
        <style type="text/css" media="print">
          {`
            @page { size: A4 portrait; margin: 20mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @media print {
              .print-hidden { display: none !important; }
              .print-visible { display: block !important; }
              .page-break { page-break-before: always; }
            }
          `}
        </style>
        {children}
      </div>
    </div>
  );
};

const INITIAL_DATA = {
  // Data Perusahaan
  namaPerusahaan: "PT Contoh Perusahaan Maju",
  alamatPerusahaan: "Jl. Sudirman No. 123, Jakarta",
  namaPimpinan: "Budi Santoso",
  jabatanPimpinan: "Direktur Utama",
  
  // Data Karyawan
  namaKaryawan: "Ahmad Fauzi",
  nikKaryawan: "123456789",
  jabatanKaryawan: "Staff Marketing",
  alamatKaryawan: "Jl. Merdeka No. 45, Jakarta",
  
  // Detail Surat
  nomorSurat: "001/HRD/PHK/2026",
  tanggalSurat: "11 Juli 2026",
  tempatSurat: "Jakarta",
  tanggalEfektif: "11 Agustus 2026",
  
  // Alasan PHK
  alasanPHK: "Efisiensi",
  detailAlasan: "Perusahaan mengalami kerugian secara terus menerus selama 2 tahun terakhir sehingga perlu dilakukan efisiensi operasional.",
  
  // Rincian Pesangon
  uangPesangon: 10000000,
  uangPenghargaanMasaKerja: 5000000,
  uangPenggantianHak: 1500000,
};

export default function SuratPHKTemplate() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'phk' | 'pesangon' | 'lainnya'>('perusahaan');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setFormData({ ...INITIAL_DATA });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const totalPesangon = formData.uangPesangon + formData.uangPenghargaanMasaKerja + formData.uangPenggantianHak;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* TOP NAVIGATION BAR */}
      <div className="print-hidden bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Surat PHK</span>
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
        <div className={`print-hidden w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('phk')} className={`flex-1 py-3 border-r ${activeTab === 'phk' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>PHK</button>
              <button onClick={() => setActiveTab('pesangon')} className={`flex-1 py-3 border-r ${activeTab === 'pesangon' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pesangon</button>
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 ${activeTab === 'lainnya' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lainnya</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Data Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleInputChange} placeholder="Contoh: PT Contoh Perusahaan Maju" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleInputChange} placeholder="Alamat lengkap perusahaan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pimpinan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="namaPimpinan" value={formData.namaPimpinan} onChange={handleInputChange} placeholder="Contoh: Budi Santoso" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Pimpinan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="jabatanPimpinan" value={formData.jabatanPimpinan} onChange={handleInputChange} placeholder="Contoh: Direktur Utama" />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="namaKaryawan" value={formData.namaKaryawan} onChange={handleInputChange} placeholder="Contoh: Ahmad Fauzi" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="nikKaryawan" value={formData.nikKaryawan} onChange={handleInputChange} placeholder="Nomor Induk Karyawan" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Karyawan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="jabatanKaryawan" value={formData.jabatanKaryawan} onChange={handleInputChange} placeholder="Contoh: Staff Marketing" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Karyawan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" name="alamatKaryawan" value={formData.alamatKaryawan} onChange={handleInputChange} placeholder="Alamat domisili/KTP" />
                </div>
              </div>
              )}

              {activeTab === 'phk' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Detail PHK</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="nomorSurat" value={formData.nomorSurat} onChange={handleInputChange} placeholder="Contoh: 001/HRD/PHK/2026" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif PHK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalEfektif" value={formData.tanggalEfektif} onChange={handleInputChange} placeholder="Contoh: 11 Agustus 2026" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan PHK</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" name="alasanPHK" value={formData.alasanPHK} onChange={handleInputChange}>
                    <option value="Efisiensi">Efisiensi</option>
                    <option value="Pelanggaran Berat">Pelanggaran Berat</option>
                    <option value="Perubahan Status Perusahaan">Perubahan Status Perusahaan</option>
                    <option value="Penutupan Perusahaan">Penutupan Perusahaan</option>
                    <option value="Sakit Berkepanjangan">Sakit Berkepanjangan</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Detail Penjelasan Alasan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" name="detailAlasan" value={formData.detailAlasan} onChange={handleInputChange} placeholder="Jelaskan alasan secara spesifik..." />
                </div>
              </div>
              )}

              {activeTab === 'pesangon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Rincian Pesangon & Hak</h3>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4 rounded-r-lg">
                  <p className="text-[10px] text-amber-800 font-medium">Sesuai ketentuan UU Ketenagakerjaan / Cipta Kerja, mohon pastikan besaran hak telah dihitung dengan benar.</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Pesangon (UP) - Rp</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-red-700 bg-red-50" name="uangPesangon" value={formData.uangPesangon.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Penghargaan Masa Kerja (UPMK) - Rp</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-blue-700 bg-blue-50" name="uangPenghargaanMasaKerja" value={formData.uangPenghargaanMasaKerja.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Penggantian Hak (UPH) - Rp</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" name="uangPenggantianHak" value={formData.uangPenggantianHak.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center font-black text-gray-900 uppercase text-xs">
                    <span>Total Diterima</span>
                    <span className="text-blue-700 text-base">{formatRupiah(totalPesangon)}</span>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Ditetapkan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tempatSurat" value={formData.tempatSurat} onChange={handleInputChange} placeholder="Contoh: Jakarta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleInputChange} placeholder="Contoh: 11 Juli 2026" />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* RIGHT PANEL - PREVIEW KERTAS */}
        <div className="flex-1 overflow-y-auto print:overflow-visible bg-slate-100 print:block print:bg-white">
          <Kertas>
            <div ref={printRef} className="text-black font-serif text-[12pt] leading-normal mx-auto max-w-4xl">
              {/* Header/Kop Surat (Opsional, biasa dicetak di kertas ber-kop) */}
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="font-bold text-[16pt] uppercase tracking-wide">{formData.namaPerusahaan}</h1>
                <p className="text-[11pt]">{formData.alamatPerusahaan}</p>
              </div>

              {/* Judul Surat */}
              <div className="text-center mb-8">
                <h2 className="font-bold text-[14pt] uppercase underline decoration-2 underline-offset-4">
                  SURAT KEPUTUSAN
                </h2>
                <p className="mt-1">Nomor: {formData.nomorSurat}</p>
                <p className="mt-1 font-bold">Tentang</p>
                <p className="font-bold uppercase">Pemutusan Hubungan Kerja (PHK)</p>
              </div>

              {/* Mukadimah */}
              <div className="mb-6 space-y-4 text-justify">
                <p>Direksi {formData.namaPerusahaan}, setelah:</p>
                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">Menimbang</div>
                  <div>
                    <ol className="list-[lower-alpha] pl-5 m-0 space-y-1">
                      <li>Bahwa dengan alasan <strong>{formData.alasanPHK}</strong>, perusahaan mengambil keputusan sulit ini.</li>
                      <li>Bahwa {formData.detailAlasan}</li>
                      <li>Bahwa oleh karena itu, perlu diterbitkan Surat Keputusan tentang Pemutusan Hubungan Kerja (PHK).</li>
                    </ol>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">Mengingat</div>
                  <div>
                    <ol className="list-decimal pl-5 m-0 space-y-1">
                      <li>Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan.</li>
                      <li>Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang.</li>
                      <li>Peraturan Pemerintah Nomor 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja.</li>
                      <li>Peraturan Perusahaan / Perjanjian Kerja Bersama {formData.namaPerusahaan}.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="text-center font-bold mb-4 uppercase">
                Memutuskan
              </div>

              <div className="mb-6 space-y-4 text-justify">
                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">Menetapkan</div>
                  <div></div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">KESATU</div>
                  <div>
                    <p>Memutuskan Hubungan Kerja (PHK) dengan pekerja:</p>
                    <table className="w-full mt-2 mb-2">
                      <tbody>
                        <tr>
                          <td className="w-40 align-top">Nama</td>
                          <td className="w-4 align-top">:</td>
                          <td><strong>{formData.namaKaryawan}</strong></td>
                        </tr>
                        <tr>
                          <td className="align-top">NIK</td>
                          <td className="align-top">:</td>
                          <td>{formData.nikKaryawan}</td>
                        </tr>
                        <tr>
                          <td className="align-top">Jabatan</td>
                          <td className="align-top">:</td>
                          <td>{formData.jabatanKaryawan}</td>
                        </tr>
                        <tr>
                          <td className="align-top">Alamat</td>
                          <td className="align-top">:</td>
                          <td>{formData.alamatKaryawan}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">KEDUA</div>
                  <div>
                    <p>Pemutusan Hubungan Kerja tersebut terhitung mulai tanggal <strong>{formData.tanggalEfektif}</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">KETIGA</div>
                  <div className="w-full">
                    <p className="mb-2">Memberikan hak-hak pekerja akibat Pemutusan Hubungan Kerja (PHK) sesuai dengan ketentuan perundang-undangan yang berlaku, dengan rincian sebagai berikut:</p>
                    
                    <table className="w-full border-collapse border border-black mb-2 mt-2">
                      <thead>
                        <tr>
                          <th className="border border-black p-2 bg-gray-100 w-12 text-center">No</th>
                          <th className="border border-black p-2 bg-gray-100 text-left">Komponen</th>
                          <th className="border border-black p-2 bg-gray-100 text-right w-48">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black p-2 text-center">1</td>
                          <td className="border border-black p-2">Uang Pesangon</td>
                          <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPesangon)}</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-2 text-center">2</td>
                          <td className="border border-black p-2">Uang Penghargaan Masa Kerja</td>
                          <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPenghargaanMasaKerja)}</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-2 text-center">3</td>
                          <td className="border border-black p-2">Uang Penggantian Hak</td>
                          <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPenggantianHak)}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} className="border border-black p-2 text-right font-bold bg-gray-50">TOTAL</td>
                          <td className="border border-black p-2 text-right font-bold bg-gray-50">{formatRupiah(totalPesangon)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">KEEMPAT</div>
                  <div>
                    <p>Mewajibkan pekerja untuk mengembalikan seluruh fasilitas dan inventaris milik perusahaan yang berada dalam penguasaan pekerja, serta melakukan serah terima pekerjaan selambat-lambatnya pada tanggal efektif PHK.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="font-bold min-w-[100px]">KELIMA</div>
                  <div>
                    <p>Surat Keputusan ini berlaku sejak tanggal ditetapkan. Apabila dikemudian hari terdapat kekeliruan dalam keputusan ini, akan diadakan perbaikan sebagaimana mestinya.</p>
                  </div>
                </div>
              </div>

              {/* Footer / Tanda Tangan */}
              <div className="mt-12 flex justify-between">
                <div className="text-center w-64 mt-6">
                  <p className="mb-24">Telah diterima dan dibaca pada<br/>Tanggal: ___________________<br/><br/>Pekerja,</p>
                  <p className="font-bold underline decoration-1 underline-offset-4">{formData.namaKaryawan}</p>
                </div>
                <div className="text-center w-64">
                  <p className="mb-1">Ditetapkan di {formData.tempatSurat}</p>
                  <p className="mb-24">Pada tanggal {formData.tanggalSurat}</p>
                  <p className="font-bold underline decoration-1 underline-offset-4">{formData.namaPimpinan}</p>
                  <p>{formData.jabatanPimpinan}</p>
                </div>
              </div>

            </div>
          </Kertas>
        </div>
      </main>
    </div>
  );
}