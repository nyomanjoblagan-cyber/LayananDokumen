"use client";

import React, { useState } from "react";

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

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div 
    id="print-area" 
    className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[20mm] text-black font-serif text-[12pt] leading-relaxed relative print:w-full print:min-w-0 print:min-h-0 mx-auto"
  >
    {children}
  </div>
);

export default function SuratPromosiTemplate() {
  const [formData, setFormData] = useState<FormState>({
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
  });

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
      <style>{`
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
        }
      `}</style>
      
      {/* Left Panel: Form */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-lg overflow-y-auto max-h-screen print:hidden border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Pengangkatan / Promosi Jabatan</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Informasi Perusahaan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Perusahaan</label>
                <input type="text" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Alamat Perusahaan</label>
                <textarea name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Telepon</label>
                <input type="text" name="teleponPerusahaan" value={formData.teleponPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="text" name="emailPerusahaan" value={formData.emailPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Data Surat</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nomor Surat</label>
                <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Surat</label>
                <input type="text" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Data Karyawan & Promosi</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Karyawan</label>
                <input type="text" name="namaKaryawan" value={formData.namaKaryawan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">NIK</label>
                <input type="text" name="nik" value={formData.nik} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Jabatan Lama</label>
                  <input type="text" name="jabatanLama" value={formData.jabatanLama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Departemen Lama</label>
                  <input type="text" name="departemenLama" value={formData.departemenLama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Jabatan Baru</label>
                  <input type="text" name="jabatanBaru" value={formData.jabatanBaru} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Departemen Baru</label>
                  <input type="text" name="departemenBaru" value={formData.departemenBaru} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Efektif</label>
                <input type="text" name="tanggalEfektif" value={formData.tanggalEfektif} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Masa Percobaan (Bulan)</label>
                <input type="text" name="masaPercobaan" value={formData.masaPercobaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Kompensasi & Benefit</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gaji Pokok Lama</label>
                  <input type="text" name="gajiLama" value={formData.gajiLama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tunjangan Lama</label>
                  <input type="text" name="tunjanganLama" value={formData.tunjanganLama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gaji Pokok Baru</label>
                  <input type="text" name="gajiBaru" value={formData.gajiBaru} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tunjangan Baru</label>
                  <input type="text" name="tunjanganBaru" value={formData.tunjanganBaru} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Penandatangan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                <input type="text" name="namaPenandatangan" value={formData.namaPenandatangan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Jabatan</label>
                <input type="text" name="jabatanPenandatangan" value={formData.jabatanPenandatangan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handlePrint}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            <span>Cetak Surat Promosi</span>
          </button>
        </div>
      </div>

      {/* Right Panel: Preview A4 */}
      <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto bg-gray-200 print:p-0 print:bg-white flex justify-center">
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
    </div>
  );
}