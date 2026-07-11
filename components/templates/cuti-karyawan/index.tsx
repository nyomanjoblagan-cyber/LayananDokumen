"use client";

import React, { useState, useRef } from "react";
import { Printer } from "lucide-react";

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
  const [formData, setFormData] = useState<FormData>({
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
  });

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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
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
          }
          /* Hide non-print elements */
          .print-hidden {
            display: none !important;
          }
          /* Ensure the preview container resets its styles for printing */
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

      {/* Left Panel: Form Inputs */}
      <div className="w-1/2 flex flex-col h-full bg-white border-r shadow-sm z-10 print-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Form Surat Permohonan Cuti</h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <Printer size={16} />
            Cetak Dokumen
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Data Karyawan */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Data Karyawan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaKaryawan"
                  value={formData.namaKaryawan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">NIK</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nomor Induk Karyawan"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Jabatan</label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Staff IT"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Departemen</label>
                <input
                  type="text"
                  name="departemen"
                  value={formData.departemen}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Information Technology"
                />
              </div>
            </div>
          </div>

          {/* Detail Cuti */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Detail Cuti</h3>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Jenis Cuti</label>
              <select
                name="jenisCuti"
                value={formData.jenisCuti}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Tahunan">Cuti Tahunan</option>
                <option value="Sakit">Cuti Sakit</option>
                <option value="Melahirkan">Cuti Melahirkan</option>
                <option value="Keperluan Penting">Cuti Keperluan Penting</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Tanggal Mulai</label>
                <input
                  type="date"
                  name="tanggalMulai"
                  value={formData.tanggalMulai}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Tanggal Selesai</label>
                <input
                  type="date"
                  name="tanggalSelesai"
                  value={formData.tanggalSelesai}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Lama Cuti (Hari)</label>
              <input
                type="text"
                name="lamaCuti"
                value={formData.lamaCuti}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misal: 3"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Alasan Cuti</label>
              <textarea
                name="alasanCuti"
                value={formData.alasanCuti}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jelaskan alasan pengajuan cuti secara singkat"
              />
            </div>
          </div>

          {/* Internal Compliance */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Kepatuhan Internal (Delegasi)</h3>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Delegasi Tugas Sementara</label>
              <p className="text-xs text-gray-500 mb-2">Nama karyawan pengganti selama cuti untuk memastikan operasional tidak terganggu.</p>
              <input
                type="text"
                name="delegasiTugas"
                value={formData.delegasiTugas}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama karyawan pengganti"
              />
            </div>
          </div>

          {/* Pengesahan */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Data Pengesahan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Tanggal Pengajuan</label>
                <input
                  type="date"
                  name="tanggalPengajuan"
                  value={formData.tanggalPengajuan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">Atasan Langsung</label>
                <input
                  type="text"
                  name="atasanLangsung"
                  value={formData.atasanLangsung}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama atasan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 flex flex-col bg-gray-200 overflow-y-auto p-8 print-container items-center">
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
    </div>
  );
}