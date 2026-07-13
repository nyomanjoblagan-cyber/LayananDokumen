"use client";

import React, { useState, useRef } from "react";
import { Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw, Building2, User, AlertTriangle, DollarSign, CreditCard } from "lucide-react";
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
  // Pihak Pertama
  namaPihakPertama: "Budi Santoso",
  nikPihakPertama: "3171234567890001",
  ttlPihakPertama: "Jakarta, 15 Mei 1980",
  pekerjaanPihakPertama: "Direktur HRD",
  alamatPihakPertama: "Jl. Sudirman No. 123, Jakarta Selatan",
  namaPerusahaan: "PT Contoh Perusahaan Maju",
  alamatPerusahaan: "Gedung Menara Merdeka, Jl. Jend. Sudirman Kav 1, Jakarta",

  // Pihak Kedua
  namaPihakKedua: "Ahmad Fauzi",
  nikPihakKedua: "3179876543210002",
  ttlPihakKedua: "Bandung, 20 Agustus 1990",
  pekerjaanPihakKedua: "Senior Staff Marketing",
  alamatPihakKedua: "Jl. Merdeka No. 45, RT 01/RW 02, Jakarta Barat",

  // Detail Surat
  hariTanggalPerjanjian: "Senin, 11 Agustus 2026",
  tempatPerjanjian: "Jakarta",
  tanggalMulaiKerja: "1 Februari 2020",
  tanggalEfektifPHK: "31 Agustus 2026",

  // Alasan
  alasanPHK: "Efisiensi",
  detailAlasan: "Perusahaan melakukan restrukturisasi organisasi dan efisiensi operasional secara menyeluruh guna menjaga keberlangsungan usaha.",

  // Kompensasi
  uangPesangon: 10000000,
  uangPenghargaanMasaKerja: 5000000,
  uangPenggantianHak: 1500000,
  uangPisah: 500000,

  // Pembayaran
  metodePembayaran: "Transfer Tunai Sekaligus",
  tanggalPembayaran: "31 Agustus 2026",
  rekeningBank: "Bank Central Asia (BCA)",
  nomorRekening: "1234567890",
  atasNamaRekening: "Ahmad Fauzi",
  tanggunganPajak: "Sesuai Ketentuan Pajak"
};

export default function SuratPHKTemplate() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'phk' | 'kompensasi' | 'pembayaran'>('pihak1');
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

  const totalKompensasi = formData.uangPesangon + formData.uangPenghargaanMasaKerja + formData.uangPenggantianHak + formData.uangPisah;

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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Perjanjian Bersama PHK</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="md:hidden flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setMobileView('editor')} 
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${mobileView === 'editor' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>
                Editor
              </button>
              <button 
                onClick={() => setMobileView('preview')} 
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${mobileView === 'preview' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>
                Preview
              </button>
            </div>
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`print-hidden w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase overflow-x-auto custom-scrollbar">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 min-w-[90px] py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 min-w-[90px] py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2</button>
              <button onClick={() => setActiveTab('phk')} className={`flex-1 min-w-[90px] py-3 border-r ${activeTab === 'phk' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Status</button>
              <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 min-w-[90px] py-3 border-r ${activeTab === 'kompensasi' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Nominal</button>
              <button onClick={() => setActiveTab('pembayaran')} className={`flex-1 min-w-[90px] py-3 ${activeTab === 'pembayaran' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Bayar</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><Building2 size={14} /> Pihak Pertama (Perusahaan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleInputChange} />
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Wakil Perusahaan</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" name="namaPihakPertama" value={formData.namaPihakPertama} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" name="nikPihakPertama" value={formData.nikPihakPertama} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" name="ttlPihakPertama" value={formData.ttlPihakPertama} onChange={handleInputChange} placeholder="Contoh: Jakarta, 15 Mei 1980"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" name="pekerjaanPihakPertama" value={formData.pekerjaanPihakPertama} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                      <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" name="alamatPihakPertama" value={formData.alamatPihakPertama} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><User size={14}/> Pihak Kedua (Karyawan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="namaPihakKedua" value={formData.namaPihakKedua} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="nikPihakKedua" value={formData.nikPihakKedua} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="ttlPihakKedua" value={formData.ttlPihakKedua} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="pekerjaanPihakKedua" value={formData.pekerjaanPihakKedua} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" name="alamatPihakKedua" value={formData.alamatPihakKedua} onChange={handleInputChange} />
                </div>
              </div>
              )}

              {activeTab === 'phk' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><AlertTriangle size={14}/> Detail PHK</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Perjanjian</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tempatPerjanjian" value={formData.tempatPerjanjian} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari, Tanggal</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="hariTanggalPerjanjian" value={formData.hariTanggalPerjanjian} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai Kerja</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalMulaiKerja" value={formData.tanggalMulaiKerja} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif PHK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold text-amber-700 bg-amber-50" name="tanggalEfektifPHK" value={formData.tanggalEfektifPHK} onChange={handleInputChange} />
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kategori Alasan PHK</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-semibold" name="alasanPHK" value={formData.alasanPHK} onChange={handleInputChange}>
                      <option value="Efisiensi">Efisiensi</option>
                      <option value="Pelanggaran Berat">Pelanggaran Berat</option>
                      <option value="Perubahan Status Perusahaan">Perubahan Status Perusahaan</option>
                      <option value="Penutupan Perusahaan">Penutupan Perusahaan</option>
                      <option value="Sakit Berkepanjangan">Sakit Berkepanjangan</option>
                      <option value="Keadaan Memaksa (Force Majeure)">Keadaan Memaksa (Force Majeure)</option>
                      <option value="Kesepakatan Bersama">Kesepakatan Bersama</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Detail Penjelasan Alasan</label>
                    <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-28" name="detailAlasan" value={formData.detailAlasan} onChange={handleInputChange} placeholder="Jelaskan alasan secara spesifik agar berkekuatan hukum..." />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'kompensasi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4 flex items-center gap-2"><DollarSign size={14}/> Rincian Kompensasi</h3>
                <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded-r-lg">
                  <p className="text-[10px] text-red-800 font-medium leading-relaxed">
                    Pastikan perhitungan disesuaikan dengan UU Cipta Kerja (UU No 6/2023) dan PP No 35/2021 tentang PKWT, Alih Daya, Waktu Kerja, Waktu Istirahat, dan PHK.
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Pesangon (UP)</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="uangPesangon" value={formData.uangPesangon.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Penghargaan Masa Kerja (UPMK)</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="uangPenghargaanMasaKerja" value={formData.uangPenghargaanMasaKerja.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Penggantian Hak (UPH)</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="uangPenggantianHak" value={formData.uangPenggantianHak.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Pisah / Lainnya</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="uangPisah" value={formData.uangPisah.toLocaleString('id-ID')} onChange={handleNumberChange} />
                </div>
                <div className="pt-3 mt-3 border-t-2 border-dashed border-gray-300">
                  <div className="flex justify-between items-center font-black text-gray-900 uppercase text-xs">
                    <span>Total Kompensasi</span>
                    <span className="text-red-600 text-lg">{formatRupiah(totalKompensasi)}</span>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'pembayaran' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4 flex items-center gap-2"><CreditCard size={14}/> Pembayaran & Pajak</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pembayaran</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" name="metodePembayaran" value={formData.metodePembayaran} onChange={handleInputChange}>
                    <option value="Transfer Tunai Sekaligus">Transfer Tunai Sekaligus</option>
                    <option value="Cicilan">Cicilan / Bertahap</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Maksimal Pembayaran</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalPembayaran" value={formData.tanggalPembayaran} onChange={handleInputChange} />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Informasi Rekening Karyawan</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Bank</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" name="rekeningBank" value={formData.rekeningBank} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Rekening</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Atas Nama Rekening</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="atasNamaRekening" value={formData.atasNamaRekening} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Ketentuan Pajak (PPh 21)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" name="tanggunganPajak" value={formData.tanggunganPajak} onChange={handleInputChange}>
                    <option value="Sesuai Ketentuan Pajak">Diproses Sesuai Ketentuan Pajak Berlaku</option>
                    <option value="Ditanggung Perusahaan">Ditanggung Penuh oleh Perusahaan (Gross Up)</option>
                    <option value="Ditanggung Karyawan">Ditanggung Karyawan (Dipotong dari Kompensasi)</option>
                  </select>
                </div>

              </div>
              )}

           </div>
        </div>

        {/* RIGHT PANEL - PREVIEW KERTAS */}
        <div className={`flex-1 overflow-y-auto print:overflow-visible bg-slate-100 print:block print:bg-white transition-all duration-300 ${mobileView === 'editor' ? 'hidden md:block' : 'block'}`}>
          <Kertas>
            <div ref={printRef} className="text-black font-serif text-[11pt] leading-relaxed mx-auto max-w-4xl space-y-4 print:text-black">
              
              {/* Judul Surat */}
              <div className="text-center mb-8 pb-4 border-b-4 border-double border-black">
                <h1 className="font-bold text-[14pt] uppercase tracking-wide">
                  PERJANJIAN BERSAMA PEMUTUSAN HUBUNGAN KERJA
                </h1>
              </div>

              {/* Mukadimah */}
              <div className="text-justify mb-6">
                <p className="mb-4">
                  Pada hari ini, <strong>{formData.hariTanggalPerjanjian}</strong>, bertempat di <strong>{formData.tempatPerjanjian}</strong>, yang bertanda tangan di bawah ini:
                </p>

                <div className="mb-4">
                  <div className="flex mb-1">
                    <div className="w-8 font-bold">I.</div>
                    <div className="flex-1">
                      <div className="flex">
                        <div className="w-48">Nama Lengkap</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 font-bold">{formData.namaPihakPertama}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Nomor Induk Kependudukan</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.nikPihakPertama}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Tempat, Tanggal Lahir</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.ttlPihakPertama}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Jabatan</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.pekerjaanPihakPertama}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Alamat</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.alamatPihakPertama}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-8 mt-2">
                    <p>Dalam hal ini bertindak untuk dan atas nama <strong>{formData.namaPerusahaan}</strong> yang berkedudukan di {formData.alamatPerusahaan}, untuk selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex mb-1">
                    <div className="w-8 font-bold">II.</div>
                    <div className="flex-1">
                      <div className="flex">
                        <div className="w-48">Nama Lengkap</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 font-bold">{formData.namaPihakKedua}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Nomor Induk Kependudukan</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.nikPihakKedua}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Tempat, Tanggal Lahir</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.ttlPihakKedua}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Pekerjaan</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.pekerjaanPihakKedua}</div>
                      </div>
                      <div className="flex">
                        <div className="w-48">Alamat</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{formData.alamatPihakKedua}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-8 mt-2">
                    <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri, untuk selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
                  </div>
                </div>

                <p className="mb-4">
                  PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>.
                </p>

                <p className="mb-2">PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
                <ol className="list-decimal pl-5 mb-6 space-y-2 ml-4">
                  <li>Bahwa PIHAK KEDUA adalah karyawan PIHAK PERTAMA yang telah bekerja sejak tanggal {formData.tanggalMulaiKerja} dengan jabatan terakhir sebagai {formData.pekerjaanPihakKedua}.</li>
                  <li>Bahwa antara PIHAK PERTAMA dan PIHAK KEDUA telah sepakat untuk mengakhiri Hubungan Kerja dengan alasan <strong>{formData.alasanPHK}</strong>.</li>
                  <li>Bahwa sehubungan dengan pengakhiran hubungan kerja tersebut, PARA PIHAK sepakat untuk menuangkannya dalam suatu Perjanjian Bersama Pemutusan Hubungan Kerja dengan syarat-syarat dan ketentuan sebagai berikut:</li>
                </ol>
              </div>

              {/* Pasal 1 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 1<br/>
                  KESEPAKATAN PEMUTUSAN HUBUNGAN KERJA
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>PARA PIHAK sepakat untuk mengakhiri hubungan kerja terhitung secara efektif sejak tanggal <strong>{formData.tanggalEfektifPHK}</strong>.</li>
                  <li>Sejak tanggal efektif sebagaimana dimaksud pada Ayat (1), segala hak dan kewajiban ketenagakerjaan antara PARA PIHAK dinyatakan telah berakhir, kecuali hal-hal yang diatur secara spesifik dalam Perjanjian Bersama ini.</li>
                </ol>
              </div>

              {/* Pasal 2 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 2<br/>
                  ALASAN PEMUTUSAN HUBUNGAN KERJA
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>Pemutusan Hubungan Kerja ini dilakukan berdasarkan alasan <strong>{formData.alasanPHK}</strong>.</li>
                  <li>Bahwa rincian mengenai alasan pemutusan hubungan kerja sebagaimana dimaksud pada Ayat (1) adalah sebagai berikut: {formData.detailAlasan}</li>
                </ol>
              </div>

              {/* Pasal 3 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 3<br/>
                  HAK DAN KOMPENSASI
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>
                    Atas pemutusan hubungan kerja ini, PIHAK PERTAMA sepakat untuk memberikan dan PIHAK KEDUA sepakat untuk menerima hak kompensasi pemutusan hubungan kerja sesuai dengan Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang beserta aturan pelaksanaannya.
                  </li>
                  <li>
                    Rincian hak dan kompensasi sebagaimana dimaksud pada Ayat (1) yang akan dibayarkan oleh PIHAK PERTAMA kepada PIHAK KEDUA adalah sebagai berikut:
                    <div className="mt-3 mb-3 pr-8">
                      <table className="w-full border-collapse border border-black text-[10pt]">
                        <thead>
                          <tr>
                            <th className="border border-black p-2 bg-gray-100 w-10 text-center">No</th>
                            <th className="border border-black p-2 bg-gray-100 text-left">Komponen Kompensasi</th>
                            <th className="border border-black p-2 bg-gray-100 text-right w-48">Jumlah (Rp)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black p-2 text-center">1</td>
                            <td className="border border-black p-2">Uang Pesangon (UP)</td>
                            <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPesangon)}</td>
                          </tr>
                          <tr>
                            <td className="border border-black p-2 text-center">2</td>
                            <td className="border border-black p-2">Uang Penghargaan Masa Kerja (UPMK)</td>
                            <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPenghargaanMasaKerja)}</td>
                          </tr>
                          <tr>
                            <td className="border border-black p-2 text-center">3</td>
                            <td className="border border-black p-2">Uang Penggantian Hak (UPH)</td>
                            <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPenggantianHak)}</td>
                          </tr>
                          <tr>
                            <td className="border border-black p-2 text-center">4</td>
                            <td className="border border-black p-2">Uang Pisah / Lainnya</td>
                            <td className="border border-black p-2 text-right">{formatRupiah(formData.uangPisah)}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2} className="border border-black p-2 text-right font-bold bg-gray-50">TOTAL KESELURUHAN</td>
                            <td className="border border-black p-2 text-right font-bold bg-gray-50">{formatRupiah(totalKompensasi)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Pasal 4 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 4<br/>
                  MEKANISME PEMBAYARAN DAN PAJAK
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>
                    Pembayaran seluruh kompensasi sebagaimana dimaksud dalam Pasal 3 Ayat (2) akan dilakukan secara <strong>
                    {formData.metodePembayaran === 'Transfer Tunai Sekaligus' ? 'tunai sekaligus (lump sum)' : 'bertahap (cicilan)'}
                    </strong>.
                  </li>
                  <li>
                    Pembayaran tersebut akan ditransfer oleh PIHAK PERTAMA ke rekening bank milik PIHAK KEDUA selambat-lambatnya pada tanggal <strong>{formData.tanggalPembayaran}</strong> dengan rincian rekening sebagai berikut:
                    <div className="mt-2 mb-2 ml-4">
                      <div className="flex">
                        <div className="w-32">Nama Bank</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 font-bold">{formData.rekeningBank}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32">Nomor Rekening</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 font-bold">{formData.nomorRekening}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32">Atas Nama</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 font-bold">{formData.atasNamaRekening}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    Mengenai kewajiban Pajak Penghasilan (PPh Pasal 21 Final) yang timbul akibat pembayaran kompensasi ini akan 
                    {formData.tanggunganPajak === 'Ditanggung Perusahaan' ? ' ditanggung sepenuhnya oleh PIHAK PERTAMA (Gross Up).' 
                    : formData.tanggunganPajak === 'Ditanggung Karyawan' ? ' menjadi beban dan ditanggung oleh PIHAK KEDUA, yang akan dipotong langsung dari total kompensasi.' 
                    : ' dihitung, dipotong, dan disetorkan oleh PIHAK PERTAMA sesuai dengan ketentuan peraturan perundang-undangan perpajakan yang berlaku.'}
                  </li>
                </ol>
              </div>

              {/* Pasal 5 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 5<br/>
                  PENGEMBALIAN INVENTARIS DAN KERAHASIAAN
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>
                    PIHAK KEDUA wajib mengembalikan seluruh fasilitas, barang inventaris, dokumen (fisik maupun digital), identitas (ID Card), dan akses sistem yang merupakan milik PIHAK PERTAMA selambat-lambatnya pada saat tanggal efektif pemutusan hubungan kerja.
                  </li>
                  <li>
                    PIHAK KEDUA berkewajiban secara hukum untuk senantiasa menjaga kerahasiaan seluruh informasi, data, dan rahasia dagang milik PIHAK PERTAMA yang diperoleh selama masa kerja, dan dilarang untuk menyalahgunakannya, mempublikasikannya, atau memberikannya kepada pihak ketiga manapun setelah pemutusan hubungan kerja ini.
                  </li>
                </ol>
              </div>

              {/* Pasal 6 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 6<br/>
                  PELEPASAN TUNTUTAN HUKUM (RELEASE AND DISCHARGE)
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>
                    Dengan ditandatanganinya Perjanjian Bersama ini dan diterimanya seluruh kompensasi sebagaimana diatur dalam Pasal 3, maka PIHAK KEDUA menyatakan telah menerima seluruh hak-haknya secara penuh dan tuntas.
                  </li>
                  <li>
                    PIHAK KEDUA menyatakan melepaskan dan membebaskan PIHAK PERTAMA (termasuk seluruh jajaran Direksi, Dewan Komisaris, dan afiliasinya) dari segala macam tuntutan, gugatan, tagihan, dan/atau laporan hukum apapun, baik secara perdata, pidana, maupun perselisihan di Pengadilan Hubungan Industrial pada saat ini maupun di masa yang akan datang terkait dengan hubungan kerja maupun pemutusan hubungan kerja ini.
                  </li>
                </ol>
              </div>

              {/* Pasal 7 */}
              <div className="mb-4 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 7<br/>
                  PENYELESAIAN PERSELISIHAN
                </div>
                <ol className="list-decimal pl-5 space-y-1 ml-4">
                  <li>Perjanjian Bersama ini tunduk dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</li>
                  <li>Apabila dikemudian hari timbul perbedaan pendapat atau perselisihan atas pelaksanaan Perjanjian Bersama ini, PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah untuk mufakat.</li>
                  <li>Apabila musyawarah tidak mencapai kesepakatan, maka PARA PIHAK sepakat untuk menyelesaikannya melalui instansi yang bertanggung jawab di bidang ketenagakerjaan atau mendaftarkannya pada Pengadilan Hubungan Industrial sesuai dengan wilayah hukum domisili PIHAK PERTAMA.</li>
                </ol>
              </div>

              {/* Pasal 8 */}
              <div className="mb-6 text-justify">
                <div className="text-center font-bold mb-2 uppercase">
                  PASAL 8<br/>
                  PENUTUP
                </div>
                <p className="ml-4 pl-1">
                  Perjanjian Bersama ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, tanpa adanya paksaan, tekanan, maupun kekhilafan dari pihak manapun, serta dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai yang cukup dan memiliki kekuatan hukum yang sama bagi PARA PIHAK.
                </p>
              </div>

              {/* Footer / Tanda Tangan */}
              <div className="mt-16 flex justify-between px-8">
                <div className="text-center w-64">
                  <p className="mb-24 font-bold">PIHAK PERTAMA<br/>{formData.namaPerusahaan}</p>
                  <p className="font-bold underline decoration-1 underline-offset-4">{formData.namaPihakPertama}</p>
                  <p>{formData.pekerjaanPihakPertama}</p>
                </div>
                <div className="text-center w-64">
                  <p className="mb-24 font-bold">PIHAK KEDUA<br/><br/></p>
                  <p className="font-bold underline decoration-1 underline-offset-4">{formData.namaPihakKedua}</p>
                  <p>Karyawan</p>
                </div>
              </div>

            </div>
          </Kertas>
        </div>
      </main>
    </div>
  );
}
