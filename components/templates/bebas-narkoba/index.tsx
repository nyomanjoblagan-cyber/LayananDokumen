"use client";

import React, { useState } from "react";
import { Printer } from "lucide-react";

export default function SuratPernyataanBebasNarkoba() {
  const [formData, setFormData] = useState({
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    nik: "",
    alamat: "",
    posisi: "",
    namaPerusahaan: "",
    tempatPembuatan: "",
    tanggalPembuatan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 print:bg-white print:h-auto">
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
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

      {/* Form Panel (Left) */}
      <div className="w-full md:w-1/3 p-6 bg-white shadow-lg overflow-y-auto no-print">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Form Surat Pernyataan
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
              <input
                type="text"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIK (No. KTP)</label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alamat</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Posisi Dilamar</label>
            <input
              type="text"
              name="posisi"
              value={formData.posisi}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
            <input
              type="text"
              name="namaPerusahaan"
              value={formData.namaPerusahaan}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
              <input
                type="text"
                name="tempatPembuatan"
                value={formData.tempatPembuatan}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tanggal Surat</label>
              <input
                type="date"
                name="tanggalPembuatan"
                value={formData.tanggalPembuatan}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              onClick={handlePrint}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Printer size={20} />
              Cetak PDF / Print
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Panel (Right) */}
      <div className="w-full md:w-2/3 p-4 md:p-8 bg-gray-100 overflow-y-auto flex justify-center print:p-0 print:w-full print:min-w-0 print:min-h-0 print:block">
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
    </div>
  );
}