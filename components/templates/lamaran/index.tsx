"use client";

import React, { useState } from "react";

// Komponen Kertas A4
const Kertas = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[25.4mm] text-black font-serif text-[12pt] leading-relaxed relative print:shadow-none print:w-full print:min-w-0 print:min-h-0 print:p-0 print:m-0 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default function SuratLamaranTemplate() {
  const [formData, setFormData] = useState({
    tempat: "Jakarta",
    tanggal: "12 Juli 2026",
    namaTujuan: "HRD Manager",
    jabatanTujuan: "Bapak/Ibu",
    namaPerusahaan: "PT Teknologi Nusantara",
    alamatPerusahaan: "Jl. Sudirman Kav. 21, Jakarta Selatan",
    sumberInformasi: "LinkedIn",
    posisiDilamar: "Frontend Developer",
    namaLengkap: "Budi Santoso",
    tempatTanggalLahir: "Bandung, 15 Agustus 1995",
    pendidikanTerakhir: "S1 Teknik Informatika, Universitas Indonesia",
    alamat: "Jl. Merdeka No. 45, Jakarta",
    noHp: "081234567890",
    email: "budi.santoso@email.com",
    lampiran: ["Curriculum Vitae", "Fotokopi KTP", "Fotokopi Ijazah", "Fotokopi Transkrip Nilai"],
  });

  const sumberOptions = [
    "LinkedIn",
    "JobStreet",
    "Referensi",
    "Website Perusahaan",
    "Koran / Media Cetak",
    "Media Sosial Lainnya",
    "Lainnya"
  ];

  const lampiranOptions = [
    "Curriculum Vitae",
    "Fotokopi KTP",
    "Fotokopi Ijazah",
    "Fotokopi Transkrip Nilai",
    "Portofolio",
    "Pas Foto Terbaru",
    "Sertifikat Kompetensi",
    "Surat Pengalaman Kerja",
    "Surat Keterangan Sehat",
    "SKCK"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const currentLampiran = prev.lampiran;
      if (currentLampiran.includes(option)) {
        return { ...prev, lampiran: currentLampiran.filter((item) => item !== option) };
      } else {
        return { ...prev, lampiran: [...currentLampiran, option] };
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const generateOpeningParagraph = () => {
    const { sumberInformasi, posisiDilamar, namaPerusahaan } = formData;
    if (sumberInformasi === "Website Perusahaan") {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari website resmi ${namaPerusahaan}, saya mengetahui bahwa perusahaan yang Bapak/Ibu pimpin sedang membuka lowongan pekerjaan untuk posisi ${posisiDilamar}.`;
    } else if (sumberInformasi === "Referensi") {
      return `Berdasarkan informasi yang saya terima dari referensi yang dapat dipercaya, saya mengetahui bahwa terdapat lowongan pekerjaan di ${namaPerusahaan} untuk posisi ${posisiDilamar}.`;
    } else if (sumberInformasi === "Lainnya") {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya mengetahui bahwa ${namaPerusahaan} sedang membuka lowongan pekerjaan untuk menempati posisi ${posisiDilamar}.`;
    } else {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari ${sumberInformasi}, saya mengetahui bahwa ${namaPerusahaan} sedang membuka lowongan pekerjaan untuk posisi ${posisiDilamar}.`;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 print:bg-white print:h-auto">
      {/* Print Safe CSS Block */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white;
            -webkit-print-color-adjust: exact;
          }
          .print-hidden {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}} />

      {/* LEFT PANEL: FORM (Hidden on print) */}
      <div className="w-full md:w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-200 print-hidden shadow-lg z-10 flex-shrink-0">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Form Surat Lamaran</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Informasi Surat & Tujuan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat, Tanggal Surat</label>
                <div className="flex gap-2">
                  <input type="text" name="tempat" value={formData.tempat} onChange={handleChange} className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Tempat" />
                  <input type="text" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Tanggal" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama/Jabatan Penerima</label>
                <input type="text" name="namaTujuan" value={formData.namaTujuan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: HRD Manager" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sapaan (Bapak/Ibu)</label>
                <input type="text" name="jabatanTujuan" value={formData.jabatanTujuan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: Bapak/Ibu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                <input type="text" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: PT Teknologi Nusantara" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                <textarea name="alamatPerusahaan" value={formData.alamatPerusahaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2}></textarea>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Informasi Lowongan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi yang Dilamar</label>
                <input type="text" name="posisiDilamar" value={formData.posisiDilamar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sumber Informasi Lowongan</label>
                <select name="sumberInformasi" value={formData.sumberInformasi} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  {sumberOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Data Pribadi Pelamar</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat, Tanggal Lahir</label>
                <input type="text" name="tempatTanggalLahir" value={formData.tempatTanggalLahir} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir</label>
                <input type="text" name="pendidikanTerakhir" value={formData.pendidikanTerakhir} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea name="alamat" value={formData.alamat} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows={2}></textarea>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                  <input type="text" name="noHp" value={formData.noHp} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Lampiran</h2>
            <div className="grid grid-cols-1 gap-2">
              {lampiranOptions.map((opt) => (
                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.lampiran.includes(opt)}
                    onChange={() => handleCheckboxChange(opt)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </section>
          
          <button 
            onClick={handlePrint}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-200 mt-6 print-hidden"
          >
            Cetak Dokumen
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: PREVIEW */}
      <div className="w-full md:w-2/3 bg-gray-200 p-8 flex justify-center overflow-y-auto print:w-full print:p-0 print:m-0 print:bg-white print:overflow-visible">
        <Kertas>
          {/* Tanggal */}
          <div className="text-right mb-8">
            <p>{formData.tempat}, {formData.tanggal}</p>
          </div>

          {/* Lampiran & Hal */}
          <div className="mb-8">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-24 align-top">Hal</td>
                  <td className="w-4 align-top">:</td>
                  <td><strong>Lamaran Pekerjaan</strong></td>
                </tr>
                <tr>
                  <td className="w-24 align-top">Lampiran</td>
                  <td className="w-4 align-top">:</td>
                  <td>{formData.lampiran.length > 0 ? `${formData.lampiran.length} Lembar` : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Penerima */}
          <div className="mb-8">
            <p>Yth.</p>
            <p><strong>{formData.namaTujuan}</strong></p>
            <p>{formData.namaPerusahaan}</p>
            <p className="whitespace-pre-line">{formData.alamatPerusahaan}</p>
          </div>

          {/* Sapaan */}
          <div className="mb-4">
            <p>Dengan hormat,</p>
          </div>

          {/* Paragraf Pembuka */}
          <div className="mb-4 text-justify indent-8">
            <p>{generateOpeningParagraph()}</p>
          </div>

          <div className="mb-4 text-justify indent-8">
            <p>Sehubungan dengan hal tersebut, saya yang bertanda tangan di bawah ini:</p>
          </div>

          {/* Data Pribadi */}
          <div className="mb-6 pl-8">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-48 py-1 align-top">Nama</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1"><strong>{formData.namaLengkap}</strong></td>
                </tr>
                <tr>
                  <td className="w-48 py-1 align-top">Tempat, Tanggal Lahir</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{formData.tempatTanggalLahir}</td>
                </tr>
                <tr>
                  <td className="w-48 py-1 align-top">Pendidikan Terakhir</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{formData.pendidikanTerakhir}</td>
                </tr>
                <tr>
                  <td className="w-48 py-1 align-top">Alamat</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{formData.alamat}</td>
                </tr>
                <tr>
                  <td className="w-48 py-1 align-top">No. HP / WhatsApp</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{formData.noHp}</td>
                </tr>
                <tr>
                  <td className="w-48 py-1 align-top">Email</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{formData.email}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Paragraf Tengah */}
          <div className="mb-4 text-justify indent-8">
            <p>Bermaksud mengajukan diri untuk mengisi posisi <strong>{formData.posisiDilamar}</strong> tersebut. Saya memiliki kondisi kesehatan yang baik, motivasi tinggi untuk belajar, serta mampu bekerja secara mandiri maupun dalam tim.</p>
          </div>

          {/* Lampiran List */}
          <div className="mb-4 text-justify indent-8">
            <p>Sebagai bahan pertimbangan Bapak/Ibu, bersama surat lamaran ini turut saya lampirkan dokumen berikut:</p>
            <ol className="list-decimal pl-12 mt-2 space-y-1 indent-0">
              {formData.lampiran.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
            {formData.lampiran.length === 0 && (
              <p className="pl-4 mt-2 text-gray-500 italic text-sm indent-0">Belum ada lampiran yang dipilih.</p>
            )}
          </div>

          {/* Penutup */}
          <div className="mb-12 text-justify indent-8">
            <p>Besar harapan saya agar {formData.jabatanTujuan} bersedia meluangkan waktu untuk memberikan kesempatan wawancara, sehingga saya dapat menjelaskan secara lebih detail mengenai kualifikasi dan potensi yang saya miliki.</p>
            <p className="mt-2 indent-8">Demikian surat lamaran ini saya sampaikan. Atas perhatian dan waktu yang diberikan, saya ucapkan terima kasih.</p>
          </div>

          {/* TTD */}
          <div className="flex flex-col items-end mr-8 mt-12">
            <p className="mb-24">Hormat saya,</p>
            <p className="font-bold border-b border-black inline-block px-2 min-w-[150px] text-center">{formData.namaLengkap}</p>
          </div>
        </Kertas>
      </div>
    </div>
  );
}