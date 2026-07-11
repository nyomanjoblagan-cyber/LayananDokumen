"use client";

import React, { useState, useRef } from "react";
import { Printer, FileText, Building2, User, FileWarning, DollarSign } from "lucide-react";

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

export default function SuratPHKTemplate() {
  const [formData, setFormData] = useState({
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
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Left Panel - Form Inputs (Hidden on Print) */}
      <div className="w-full lg:w-1/3 xl:w-2/5 h-full overflow-y-auto border-r border-gray-200 bg-white shadow-lg z-10 print-hidden flex flex-col">
        <div className="p-6 bg-blue-600 text-white sticky top-0 z-20 shadow-md">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileWarning className="w-6 h-6" />
            Generator Surat PHK
          </h1>
          <p className="text-blue-100 mt-1 text-sm">Isi formulir di bawah untuk memperbarui dokumen secara langsung.</p>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Section 1: Data Perusahaan */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Data Perusahaan
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                <input type="text" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                <textarea name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pimpinan</label>
                  <input type="text" name="namaPimpinan" value={formData.namaPimpinan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan Pimpinan</label>
                  <input type="text" name="jabatanPimpinan" value={formData.jabatanPimpinan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Data Karyawan */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Data Karyawan
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Karyawan</label>
                  <input type="text" name="namaKaryawan" value={formData.namaKaryawan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                  <input type="text" name="nikKaryawan" value={formData.nikKaryawan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan Karyawan</label>
                <input type="text" name="jabatanKaryawan" value={formData.jabatanKaryawan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Karyawan</label>
                <textarea name="alamatKaryawan" value={formData.alamatKaryawan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2} />
              </div>
            </div>
          </section>

          {/* Section 3: Detail PHK */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Detail PHK
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
                  <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Efektif PHK</label>
                  <input type="text" name="tanggalEfektif" value={formData.tanggalEfektif} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan PHK</label>
                <select name="alasanPHK" value={formData.alasanPHK} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="Efisiensi">Efisiensi</option>
                  <option value="Pelanggaran Berat">Pelanggaran Berat</option>
                  <option value="Perubahan Status Perusahaan">Perubahan Status Perusahaan</option>
                  <option value="Penutupan Perusahaan">Penutupan Perusahaan</option>
                  <option value="Sakit Berkepanjangan">Sakit Berkepanjangan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detail Penjelasan Alasan</label>
                <textarea name="detailAlasan" value={formData.detailAlasan} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Jelaskan alasan secara spesifik..." />
              </div>
            </div>
          </section>

          {/* Section 4: Rincian Pesangon */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Rincian Pesangon & Hak
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-800">Sesuai ketentuan UU Ketenagakerjaan / Cipta Kerja, mohon pastikan besaran hak telah dihitung dengan benar.</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uang Pesangon (UP)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rp</span>
                  <input type="text" name="uangPesangon" value={formData.uangPesangon.toLocaleString('id-ID')} onChange={handleNumberChange} className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uang Penghargaan Masa Kerja (UPMK)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rp</span>
                  <input type="text" name="uangPenghargaanMasaKerja" value={formData.uangPenghargaanMasaKerja.toLocaleString('id-ID')} onChange={handleNumberChange} className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uang Penggantian Hak (UPH)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rp</span>
                  <input type="text" name="uangPenggantianHak" value={formData.uangPenggantianHak.toLocaleString('id-ID')} onChange={handleNumberChange} className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold text-gray-900">
                  <span>Total Diterima</span>
                  <span className="text-blue-700">{formatRupiah(totalPesangon)}</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section 5: Tanda Tangan */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Penandatanganan</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat</label>
                <input type="text" name="tempatSurat" value={formData.tempatSurat} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
                <input type="text" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 sticky bottom-0 z-20">
          <button onClick={handlePrint} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2">
            <Printer className="w-5 h-5" />
            Cetak Surat PHK
          </button>
        </div>
      </div>

      {/* Right Panel - Live Preview (Printable Area) */}
      <div className="w-full lg:w-2/3 xl:w-3/5 h-full overflow-y-auto print:w-full print:overflow-visible">
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
    </div>
  );
}