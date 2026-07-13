"use client";

import React, { useState, useRef, useEffect } from "react";
import { Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw, Building2, UserCircle, Calendar, CheckSquare } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Pihak Pertama (HRD / Perusahaan)
  namaPihakPertama: string;
  nikPihakPertama: string;
  tempatLahirPihakPertama: string;
  tanggalLahirPihakPertama: string;
  pekerjaanPihakPertama: string;
  alamatPihakPertama: string;

  // Pihak Kedua (Karyawan)
  namaPihakKedua: string;
  nikPihakKedua: string;
  tempatLahirPihakKedua: string;
  tanggalLahirPihakKedua: string;
  pekerjaanPihakKedua: string;
  departemen: string;
  alamatPihakKedua: string;

  // Detail Cuti
  jenisCuti: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lamaCuti: string;
  alasanCuti: string;
  cutiBerbayar: string;
  sertakanBukti: string;

  // Delegasi & Pengesahan
  delegasiTugas: string;
  namaAtasan: string;
  tempatDibuat: string;
  tanggalPengajuan: string;
}

const INITIAL_DATA: FormData = {
  namaPihakPertama: "",
  nikPihakPertama: "",
  tempatLahirPihakPertama: "",
  tanggalLahirPihakPertama: "",
  pekerjaanPihakPertama: "HR Manager",
  alamatPihakPertama: "",

  namaPihakKedua: "",
  nikPihakKedua: "",
  tempatLahirPihakKedua: "",
  tanggalLahirPihakKedua: "",
  pekerjaanPihakKedua: "",
  departemen: "",
  alamatPihakKedua: "",

  jenisCuti: "Tahunan",
  tanggalMulai: "",
  tanggalSelesai: "",
  lamaCuti: "",
  alasanCuti: "",
  cutiBerbayar: "Ya",
  sertakanBukti: "Tidak",

  delegasiTugas: "",
  namaAtasan: "",
  tempatDibuat: "Jakarta",
  tanggalPengajuan: new Date().toISOString().split("T")[0],
};

const Kertas = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div
    ref={ref}
    className="bg-white shadow-lg w-[210mm] min-h-[297mm] px-[20mm] py-[20mm] text-black print:w-full print:min-w-0 print:min-h-0 print:shadow-none print:m-0 mx-auto"
  >
    {children}
  </div>
));
Kertas.displayName = "Kertas";

export default function SuratCutiKaryawan() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'cuti' | 'lainnya'>('pihak1');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const printRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setFormData({ ...INITIAL_DATA });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getHariFromDate = (dateString: string) => {
    if (!dateString) return "[Hari]";
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[new Date(dateString).getDay()];
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-width: 0 !important;
            min-height: 0 !important;
            overflow: visible !important;
            background: white !important;
          }
        }
      `}</style>

      {/* TOP NAV BAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Formulir Legal Drafting: Cuti Karyawan</span>
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
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}><Building2 size={14}/> HR / Persh</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}><UserCircle size={14}/> Karyawan</button>
              <button onClick={() => setActiveTab('cuti')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'cuti' ? 'bg-white text-orange-600 border-b-2 border-b-orange-600' : 'text-slate-500 hover:bg-slate-200'}`}><Calendar size={14}/> Detail Cuti</button>
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 flex flex-col items-center gap-1 ${activeTab === 'lainnya' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}><CheckSquare size={14}/> Delegasi & Sah</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Pihak Pertama (HRD / Perusahaan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap HR Manager / Perwakilan</label>
                  <input type="text" name="namaPihakPertama" value={formData.namaPihakPertama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / No. Karyawan</label>
                  <input type="text" name="nikPihakPertama" value={formData.nikPihakPertama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Contoh: 1234567890" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input type="text" name="tempatLahirPihakPertama" value={formData.tempatLahirPihakPertama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Kota" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" name="tanggalLahirPihakPertama" value={formData.tanggalLahirPihakPertama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input type="text" name="pekerjaanPihakPertama" value={formData.pekerjaanPihakPertama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Contoh: HR Manager" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea name="alamatPihakPertama" value={formData.alamatPihakPertama} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Pihak Kedua (Karyawan Pemohon)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Karyawan</label>
                  <input type="text" name="namaPihakKedua" value={formData.namaPihakKedua} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / No. Karyawan</label>
                  <input type="text" name="nikPihakKedua" value={formData.nikPihakKedua} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Nomor Induk Karyawan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input type="text" name="tempatLahirPihakKedua" value={formData.tempatLahirPihakKedua} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Kota" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" name="tanggalLahirPihakKedua" value={formData.tanggalLahirPihakKedua} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan / Posisi</label>
                    <input type="text" name="pekerjaanPihakKedua" value={formData.pekerjaanPihakKedua} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Contoh: Staff IT" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                    <input type="text" name="departemen" value={formData.departemen} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Contoh: Information Technology" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea name="alamatPihakKedua" value={formData.alamatPihakKedua} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Alamat domisili saat ini" />
                </div>
              </div>
              )}

              {activeTab === 'cuti' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-orange-600 border-b pb-1 mb-4">Detail Pengajuan Cuti</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Cuti</label>
                  <select name="jenisCuti" value={formData.jenisCuti} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white">
                    <option value="Tahunan">Cuti Tahunan</option>
                    <option value="Besar">Cuti Besar / Panjang</option>
                    <option value="Sakit">Cuti Sakit</option>
                    <option value="Melahirkan">Cuti Melahirkan</option>
                    <option value="Keperluan Penting">Cuti Keperluan Penting</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                    <input type="date" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                    <input type="date" name="tanggalSelesai" value={formData.tanggalSelesai} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Total Lama Cuti (Hari Kerja)</label>
                  <input type="text" name="lamaCuti" value={formData.lamaCuti} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Misal: 3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Cuti</label>
                  <textarea name="alasanCuti" value={formData.alasanCuti} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Jelaskan alasan pengajuan cuti secara singkat" />
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg space-y-3 mt-4">
                  <h4 className="text-[10px] font-bold text-orange-800 uppercase">Ketentuan Tambahan</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600">Opsi Cuti Berbayar (Paid Leave)?</label>
                    <select name="cutiBerbayar" value={formData.cutiBerbayar} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white">
                      <option value="Ya">Ya (Gaji Dibayar Penuh)</option>
                      <option value="Tidak">Tidak (Unpaid Leave / Potong Gaji)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600">Sertakan Bukti Pendukung (cth: Surat Dokter)?</label>
                    <select name="sertakanBukti" value={formData.sertakanBukti} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white">
                      <option value="Ya">Ya (Melampirkan Surat/Dokumen)</option>
                      <option value="Tidak">Tidak Perlu</option>
                    </select>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Delegasi & Pengesahan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Delegasi Tugas (PIC Pengganti)</label>
                  <p className="text-[9px] text-slate-400 mt-1 mb-2">Nama rekan kerja yang menggantikan peran selama cuti.</p>
                  <input type="text" name="delegasiTugas" value={formData.delegasiTugas} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Nama karyawan pengganti" />
                </div>
                
                <div className="pt-2 border-t mt-4 space-y-3">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase">Pengesahan Dokumen</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Atasan Langsung</label>
                    <input type="text" name="namaAtasan" value={formData.namaAtasan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" placeholder="Nama manager/supervisor pemohon" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Dibuat</label>
                      <input type="text" name="tempatDibuat" value={formData.tempatDibuat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Pengajuan</label>
                      <input type="date" name="tanggalPengajuan" value={formData.tanggalPengajuan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 flex flex-col bg-gray-200 overflow-y-auto p-8 print-container items-center print:block print:overflow-visible print:bg-white">
          <Kertas ref={printRef}>
            {/* Document Header */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-xl font-bold uppercase tracking-wider underline underline-offset-4">Perjanjian Pelaksanaan Cuti Karyawan</h1>
              <p className="text-sm mt-2">Nomor: _____/HRD-CUTI/____/20__</p>
            </div>

            {/* Document Body */}
            <div className="space-y-6 text-sm leading-relaxed text-justify">
              <div className="space-y-4">
                <p>
                  Pada hari ini, <strong>{getHariFromDate(formData.tanggalPengajuan)}</strong>, tanggal <strong>{formData.tanggalPengajuan ? formatDate(formData.tanggalPengajuan) : "[Tanggal]"}</strong>, bertempat di <strong>{formData.tempatDibuat || "[Tempat]"}</strong>, telah dibuat dan disepakati Perjanjian Pelaksanaan Cuti Karyawan (selanjutnya disebut &quot;Kesepakatan&quot;) oleh dan antara:
                </p>

                <div className="space-y-4 ml-4">
                  <div className="flex gap-4">
                    <div className="font-bold w-6">I.</div>
                    <div className="flex-1">
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Nama Lengkap</div><div>:</div>
                        <div className="font-bold">{formData.namaPihakPertama || "[Nama Pihak Pertama]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>NIK / No. Karyawan</div><div>:</div>
                        <div>{formData.nikPihakPertama || "[NIK]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Tempat, Tanggal Lahir</div><div>:</div>
                        <div>{formData.tempatLahirPihakPertama || "[Tempat]"}, {formData.tanggalLahirPihakPertama ? formatDate(formData.tanggalLahirPihakPertama) : "[Tanggal Lahir]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Jabatan</div><div>:</div>
                        <div>{formData.pekerjaanPihakPertama || "[Jabatan]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1 items-start">
                        <div>Alamat Lengkap</div><div>:</div>
                        <div>{formData.alamatPihakPertama || "[Alamat]"}</div>
                      </div>
                      <p className="mt-2 text-justify">
                        Dalam hal ini bertindak untuk dan atas nama Perusahaan dalam kapasitasnya sebagai pemberi persetujuan dan pengesahan cuti, yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="font-bold w-6">II.</div>
                    <div className="flex-1">
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Nama Lengkap</div><div>:</div>
                        <div className="font-bold">{formData.namaPihakKedua || "[Nama Pihak Kedua]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>NIK / No. Karyawan</div><div>:</div>
                        <div>{formData.nikPihakKedua || "[NIK]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Tempat, Tanggal Lahir</div><div>:</div>
                        <div>{formData.tempatLahirPihakKedua || "[Tempat]"}, {formData.tanggalLahirPihakKedua ? formatDate(formData.tanggalLahirPihakKedua) : "[Tanggal Lahir]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1">
                        <div>Posisi / Departemen</div><div>:</div>
                        <div>{formData.pekerjaanPihakKedua || "[Posisi]"} / {formData.departemen || "[Departemen]"}</div>
                      </div>
                      <div className="grid grid-cols-[180px_10px_1fr] mb-1 items-start">
                        <div>Alamat Lengkap</div><div>:</div>
                        <div>{formData.alamatPihakKedua || "[Alamat]"}</div>
                      </div>
                      <p className="mt-2 text-justify">
                        Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku pemohon izin cuti, yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-justify mt-4">
                  PIHAK PERTAMA dan PIHAK KEDUA yang selanjutnya secara bersama-sama disebut sebagai <strong>PARA PIHAK</strong>, menyatakan dengan itikad baik saling sepakat untuk mengikatkan diri dalam Kesepakatan Pelaksanaan Cuti Karyawan ini dengan ketentuan dan pasal-pasal sebagai berikut:
                </p>
              </div>

              {/* PASAL-PASAL TANPA GRID/TABEL (Standar Notaris/Corporate) */}
              <div className="mt-6 space-y-4">
                <div className="text-center font-bold">Pasal 1<br/>DEFINISI DAN KETENTUAN UMUM</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>Cuti adalah keadaan tidak masuk kerja yang diizinkan dalam jangka waktu tertentu sesuai peraturan ketenagakerjaan Perusahaan dan perundang-undangan yang berlaku.</li>
                  <li>Cuti yang diajukan oleh PIHAK KEDUA adalah jenis Cuti <strong>{formData.jenisCuti}</strong> dengan alasan pokok berupa: <em>{formData.alasanCuti || "[Uraian Alasan Cuti]"}</em>.</li>
                </ol>

                <div className="text-center font-bold mt-6">Pasal 2<br/>OBJEK KESEPAKATAN</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>PIHAK PERTAMA memberikan persetujuan izin pelaksanaan cuti kepada PIHAK KEDUA selama <strong>{formData.lamaCuti || "[X]"}</strong> hari kerja, terhitung secara efektif mulai tanggal <strong>{formData.tanggalMulai ? formatDate(formData.tanggalMulai) : "[Tanggal Mulai]"}</strong> sampai dengan tanggal <strong>{formData.tanggalSelesai ? formatDate(formData.tanggalSelesai) : "[Tanggal Selesai]"}</strong>.</li>
                  <li>PIHAK KEDUA menyatakan menerima persetujuan izin cuti tersebut dan berjanji akan melaksanakan hak cutinya sesuai dengan ketentuan disiplin Perusahaan.</li>
                  {formData.sertakanBukti === 'Ya' && (
                    <li>Pelaksanaan cuti ini didasarkan pada dokumen lampiran pendukung berupa Surat Keterangan / Bukti yang sah, yang merupakan satu kesatuan tidak terpisahkan dari Kesepakatan ini.</li>
                  )}
                </ol>

                <div className="text-center font-bold mt-6">Pasal 3<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>PIHAK PERTAMA berhak meminta laporan pertanggungjawaban atas pendelegasian tugas PIHAK KEDUA sebelum pelaksanaan cuti dimulai.</li>
                  {formData.cutiBerbayar === 'Ya' ? (
                    <li>PIHAK PERTAMA berkewajiban membayarkan upah dan hak-hak PIHAK KEDUA lainnya secara penuh yang timbul selama masa cuti, sesuai dengan ketentuan standar (<em>Paid Leave</em>) yang diatur oleh Perusahaan.</li>
                  ) : (
                    <li>PIHAK PERTAMA tidak berkewajiban membayarkan upah dasar dan tunjangan (<em>Unpaid Leave</em>) selama masa cuti yang dijalankan oleh PIHAK KEDUA, yang mana pemotongan upah akan dihitung secara proporsional berdasarkan jumlah absensi.</li>
                  )}
                </ol>

                <div className="text-center font-bold mt-6">Pasal 4<br/>HAK DAN KEWAJIBAN PIHAK KEDUA</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>PIHAK KEDUA berhak mendapatkan waktu istirahat (cuti) tanpa diganggu oleh urusan pekerjaan operasional, kecuali dalam keadaan darurat operasional yang sangat mendesak.</li>
                  <li>PIHAK KEDUA berkewajiban menyerahkan seluruh tugas dan tanggung jawab pekerjaannya untuk sementara waktu kepada Sdr/i. <strong>{formData.delegasiTugas || "[Nama PIC Pengganti]"}</strong> sebagai pelaksana tugas harian (PIC) guna menjaga kelangsungan kelancaran operasional Perusahaan.</li>
                  <li>PIHAK KEDUA wajib untuk kembali masuk kerja secara normal pada hari kerja pertama setelah tanggal berakhirnya cuti yang disepakati sebagaimana tercantum pada Pasal 2 Kesepakatan ini.</li>
                </ol>

                <div className="text-center font-bold mt-6">Pasal 5<br/>SANKSI KETERLAMBATAN DAN MANGKIR</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>Apabila PIHAK KEDUA terlambat masuk kerja tanpa pemberitahuan resmi dan alasan yang sah melebihi masa cuti yang disepakati, maka PIHAK PERTAMA berhak memberikan sanksi administratif dan/atau Surat Peringatan sesuai dengan Peraturan Perusahaan.</li>
                  <li>Keterlambatan sebagaimana dimaksud pada ayat (1) akan diperhitungkan dan dipotong secara langsung dari hak sisa cuti tahunan berjalan milik PIHAK KEDUA, atau dilakukan pemotongan upah jika kuota cuti tahunan telah habis.</li>
                  <li>Apabila keterlambatan melebihi 5 (lima) hari kerja berturut-turut tanpa kabar dan keterangan tertulis, maka PIHAK KEDUA dapat dikategorikan mangkir dan dianggap mengundurkan diri secara sepihak (<em>Resign</em>).</li>
                </ol>

                <div className="text-center font-bold mt-6">Pasal 6<br/>KEADAAN MEMAKSA (FORCE MAJEURE)</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>Dalam hal PIHAK KEDUA mengalami keadaan memaksa yang mengakibatkan tidak dapat kembali bekerja tepat waktu (seperti bencana alam, kecelakaan, atau pembatasan perjalanan darurat oleh pemerintah), PIHAK KEDUA wajib segera memberitahukan hal tersebut kepada PIHAK PERTAMA selambat-lambatnya 1x24 (satu kali dua puluh empat) jam sejak kejadian tersebut.</li>
                  <li>Perpanjangan hari cuti sebagai akibat dari Keadaan Memaksa sebagaimana dimaksud pada ayat (1) akan diatur dan diputuskan kemudian secara terpisah berdasarkan kebijaksanaan Manajemen Perusahaan.</li>
                </ol>

                <div className="text-center font-bold mt-6">Pasal 7<br/>PENYELESAIAN PERSELISIHAN</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>Segala perselisihan yang timbul sebagai akibat dari penafsiran dan/atau pelaksanaan Kesepakatan ini akan diselesaikan secara musyawarah untuk mufakat (Bipartit).</li>
                  <li>Apabila penyelesaian secara musyawarah tidak mencapai mufakat, maka penyelesaian perselisihan dilanjutkan ke instansi yang berwenang di bidang ketenagakerjaan (Tripartit) sesuai dengan domisili hukum Perusahaan.</li>
                </ol>

                <div className="text-center font-bold mt-6">Pasal 8<br/>KETENTUAN PENUTUP</div>
                <ol className="list-decimal text-justify space-y-2 ml-4 pl-4">
                  <li>Kesepakatan Pelaksanaan Cuti Karyawan ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa paksaan maupun tekanan dari pihak mana pun.</li>
                  <li>Dokumen ini merupakan bagian sah dari tata tertib administrasi HRD dan mengikat secara hukum bagi PARA PIHAK terhitung sejak ditandatangani.</li>
                </ol>
              </div>

              {/* CLOSING & SIGNATURES */}
              <div className="mt-8 text-justify">
                <p>Demikian Kesepakatan ini dibuat dan ditandatangani di <strong>{formData.tempatDibuat || "[Tempat]"}</strong> pada tanggal <strong>{formData.tanggalPengajuan ? formatDate(formData.tanggalPengajuan) : "[Tanggal]"}</strong>, dicetak dan ditandatangani sebagai bukti persetujuan resmi pelaksanaan cuti karyawan yang sah.</p>
              </div>

              {/* TABLE APPROVAL FORM (Tabel Persetujuan HR & Atasan Langsung) */}
              <div className="mt-12 text-sm w-full border border-black p-4 bg-transparent break-inside-avoid">
                <table className="w-full text-center table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/3 pb-20 font-bold uppercase border-r border-black align-top">
                        PIHAK KEDUA<br/><span className="text-xs font-normal capitalize">(Pemohon Cuti)</span>
                      </th>
                      <th className="w-1/3 pb-20 font-bold uppercase border-r border-black align-top">
                        MENYETUJUI<br/><span className="text-xs font-normal capitalize">(Atasan Langsung)</span>
                      </th>
                      <th className="w-1/3 pb-20 font-bold uppercase align-top">
                        PIHAK PERTAMA<br/><span className="text-xs font-normal capitalize">(HR Manager / Perusahaan)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-r border-black font-bold underline underline-offset-4 pt-2">
                        {formData.namaPihakKedua || "(Nama Lengkap Pemohon)"}
                      </td>
                      <td className="border-r border-black font-bold underline underline-offset-4 pt-2">
                        {formData.namaAtasan || "(Nama Atasan Langsung)"}
                      </td>
                      <td className="font-bold underline underline-offset-4 pt-2">
                        {formData.namaPihakPertama || "(Nama HR Manager)"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r border-black text-xs pt-1">
                        NIK. {formData.nikPihakKedua || "_________________"}
                      </td>
                      <td className="border-r border-black text-xs pt-1">
                        Tgl. _________________
                      </td>
                      <td className="text-xs pt-1">
                        NIK. {formData.nikPihakPertama || "_________________"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </Kertas>
        </div>
      </main>
    </div>
  );
}
