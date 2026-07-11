"use client";

import React, { useState, useRef, useEffect } from "react";
import { Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw } from "lucide-react";
import Link from "next/link";

interface FormData {
  namaKaryawan: string;
  nik: string;
  jabatan: string;
  departemen: string;
  jenisCuti: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lamaCuti: string;
  alasanCuti: string;
  delegasiTugas: string;
  atasanLangsung: string;
  tanggalPengajuan: string;
}

const INITIAL_DATA: FormData = {
  namaKaryawan: "",
  nik: "",
  jabatan: "",
  departemen: "",
  jenisCuti: "Tahunan",
  tanggalMulai: "",
  tanggalSelesai: "",
  lamaCuti: "",
  alasanCuti: "",
  delegasiTugas: "",
  atasanLangsung: "",
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
  const [activeTab, setActiveTab] = useState<'karyawan' | 'cuti' | 'lainnya'>('karyawan');
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

      {/* TOP NAV BAR (Aesthetic from jual-beli-tanah) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Formulir Cuti Karyawan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('cuti')} className={`flex-1 py-3 border-r ${activeTab === 'cuti' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Detail Cuti</button>
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 ${activeTab === 'lainnya' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lainnya</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input type="text" name="namaKaryawan" value={formData.namaKaryawan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                  <input type="text" name="nik" value={formData.nik} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Nomor Induk Karyawan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                    <input type="text" name="jabatan" value={formData.jabatan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Contoh: Staff IT" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                    <input type="text" name="departemen" value={formData.departemen} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Contoh: Information Technology" />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'cuti' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Cuti</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Cuti</label>
                  <select name="jenisCuti" value={formData.jenisCuti} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 bg-white">
                    <option value="Tahunan">Cuti Tahunan</option>
                    <option value="Sakit">Cuti Sakit</option>
                    <option value="Melahirkan">Cuti Melahirkan</option>
                    <option value="Keperluan Penting">Cuti Keperluan Penting</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                    <input type="date" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                    <input type="date" name="tanggalSelesai" value={formData.tanggalSelesai} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lama Cuti (Hari)</label>
                  <input type="text" name="lamaCuti" value={formData.lamaCuti} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Misal: 3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Cuti</label>
                  <textarea name="alasanCuti" value={formData.alasanCuti} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Jelaskan alasan pengajuan cuti secara singkat" />
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Kepatuhan Internal & Pengesahan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Delegasi Tugas Sementara</label>
                  <p className="text-[9px] text-slate-400 mt-1 mb-2">Nama karyawan pengganti selama cuti untuk memastikan operasional tidak terganggu.</p>
                  <input type="text" name="delegasiTugas" value={formData.delegasiTugas} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Nama karyawan pengganti" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Data Pengesahan</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Pengajuan</label>
                      <input type="date" name="tanggalPengajuan" value={formData.tanggalPengajuan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Atasan Langsung</label>
                      <input type="text" name="atasanLangsung" value={formData.atasanLangsung} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" placeholder="Nama atasan" />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 flex flex-col bg-gray-200 overflow-y-auto p-8 print-container items-center">
          {/* A4 Paper Container */}
          <Kertas ref={printRef}>
            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-2xl font-bold uppercase tracking-wider">Surat Permohonan Cuti</h1>
              <p className="text-sm mt-1">Formulir Kepatuhan Internal - Departemen SDM</p>
            </div>

            {/* Body */}
            <div className="space-y-6 text-sm leading-relaxed">
              <div className="flex justify-between">
                <div>
                  <p>Kepada Yth,</p>
                  <p className="font-semibold">Departemen HRD / SDM</p>
                  <p>Di Tempat</p>
                </div>
                <div className="text-right">
                  <p>Tanggal: {formData.tanggalPengajuan ? formatDate(formData.tanggalPengajuan) : "[Tanggal]"}</p>
                </div>
              </div>

              <div>
                <p>Dengan hormat,</p>
                <p className="mt-2">Yang bertanda tangan di bawah ini:</p>
              </div>

              <div className="pl-4 space-y-2">
                <div className="grid grid-cols-[150px_10px_1fr]">
                  <div className="font-medium">Nama</div>
                  <div>:</div>
                  <div>{formData.namaKaryawan || "[Nama Karyawan]"}</div>
                </div>
                <div className="grid grid-cols-[150px_10px_1fr]">
                  <div className="font-medium">NIK</div>
                  <div>:</div>
                  <div>{formData.nik || "[NIK]"}</div>
                </div>
                <div className="grid grid-cols-[150px_10px_1fr]">
                  <div className="font-medium">Jabatan</div>
                  <div>:</div>
                  <div>{formData.jabatan || "[Jabatan]"}</div>
                </div>
                <div className="grid grid-cols-[150px_10px_1fr]">
                  <div className="font-medium">Departemen</div>
                  <div>:</div>
                  <div>{formData.departemen || "[Departemen]"}</div>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  Bermaksud mengajukan permohonan <strong>Cuti {formData.jenisCuti}</strong> selama <strong>{formData.lamaCuti || "[X]"}</strong> hari kerja, 
                  terhitung mulai tanggal <strong>{formData.tanggalMulai ? formatDate(formData.tanggalMulai) : "[Tanggal Mulai]"}</strong> sampai dengan tanggal <strong>{formData.tanggalSelesai ? formatDate(formData.tanggalSelesai) : "[Tanggal Selesai]"}</strong>.
                </p>
                
                <div className="mt-3">
                  <p className="font-medium">Alasan Cuti:</p>
                  <p className="mt-1 pl-4 border-l-2 border-gray-300 min-h-[40px] whitespace-pre-wrap">
                    {formData.alasanCuti || "[Alasan Cuti]"}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 border border-gray-300 rounded-sm bg-gray-50 print:bg-transparent print:border-black">
                <h4 className="font-bold mb-2">Kepatuhan Internal (Delegasi Tugas)</h4>
                <p>
                  Selama masa cuti tersebut, untuk memastikan operasional perusahaan tetap berjalan dengan baik tanpa gangguan, seluruh tugas dan tanggung jawab pekerjaan saya akan didelegasikan sementara kepada:
                </p>
                <div className="mt-2 pl-4">
                  <div className="grid grid-cols-[150px_10px_1fr]">
                    <div className="font-medium">Nama Pengganti</div>
                    <div>:</div>
                    <div className="font-bold underline">{formData.delegasiTugas || "[Nama Karyawan Pengganti]"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  Demikian surat permohonan cuti ini saya buat dengan sebenar-benarnya. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-12 pt-8 grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <p className="mb-20">Pemohon,</p>
                <div className="w-40 border-b border-black"></div>
                <p className="mt-1 font-semibold">{formData.namaKaryawan || "(Nama Jelas)"}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-20">Menyetujui (Atasan),</p>
                <div className="w-40 border-b border-black"></div>
                <p className="mt-1 font-semibold">{formData.atasanLangsung || "(Nama Jelas)"}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-20">Mengetahui (HRD),</p>
                <div className="w-40 border-b border-black"></div>
                <p className="mt-1 font-semibold">(...................................)</p>
              </div>
            </div>
          </Kertas>
        </div>
      </main>
    </div>
  );
}