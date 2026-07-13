'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { UserCircle, Briefcase, FileText } from 'lucide-react';

export default function LamaranTemplate() {
  const [data, setData] = useState({
    // Meta Surat
    tempatTanggal: 'Bandung, 13 Juli 2026',
    lampiran: '5 (Lima) Lembar',
    hal: 'Lamaran Pekerjaan',
    
    // Tujuan
    namaPenerima: 'HRD Manager',
    perusahaanTujuan: 'PT. INOVASI DIGITAL TEKNOLOGI',
    alamatTujuan: 'Gedung Cyber Lt. 10\nJl. Kuningan Barat No. 8, Jakarta Selatan 12710',
    
    // Data Pelamar
    namaLengkap: 'Budi Hartanto, S.Kom.',
    tempatLahir: 'Bandung',
    tanggalLahir: '15 Agustus 2000',
    jenisKelamin: 'Laki-laki',
    pendidikan: 'S1 Teknik Informatika - Institut Teknologi Bandung (IPK: 3.85)',
    alamatPelamar: 'Jl. Dago Asri No. 45, Coblong, Kota Bandung, Jawa Barat 40135',
    noTelp: '0812-3456-7890',
    email: 'budi.hartanto@email.com',
    
    // Posisi & Sumber
    posisiDilamar: 'Senior Frontend Developer',
    sumberInfo: 'portal lowongan kerja TechJobs.id pada tanggal 10 Juli 2026',
    
    // Isi Surat
    pengalamanKeahlian: 'Saya memiliki pengalaman selama 3 tahun bekerja sebagai Frontend Engineer dengan fokus pada ekosistem React, Next.js, dan Tailwind CSS. Selama bekerja, saya telah berhasil memimpin tim dalam migrasi sistem legacy ke arsitektur modern yang meningkatkan performa aplikasi hingga 40%. Saya juga terbiasa bekerja dengan metodologi Agile/Scrum dan berkolaborasi erat dengan tim UI/UX serta Backend.',
    
    // Lampiran
    daftarLampiran: '1. Curriculum Vitae (CV)\n2. Fotokopi Ijazah Terakhir\n3. Fotokopi Transkrip Nilai\n4. Portofolio Project\n5. Pas Foto 4x6'
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          Editor Surat Lamaran
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info & Tujuan Surat</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempat, Tanggal</label>
                <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perihal</label>
                  <input type="text" name="hal" value={data.hal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lampiran</label>
                  <input type="text" name="lampiran" value={data.lampiran} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kepada Yth. (Penerima)</label>
                <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan Tujuan</label>
                <input type="text" name="perusahaanTujuan" value={data.perusahaanTujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Tujuan</label>
                <textarea name="alamatTujuan" value={data.alamatTujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <UserCircle className="w-4 h-4" /> Data Diri Pelamar
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Lengkap & Gelar</label>
                <input type="text" name="namaLengkap" value={data.namaLengkap} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Tempat Lahir</label>
                  <input type="text" name="tempatLahir" value={data.tempatLahir} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Tanggal Lahir</label>
                  <input type="text" name="tanggalLahir" value={data.tanggalLahir} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Pendidikan Terakhir</label>
                  <input type="text" name="pendidikan" value={data.pendidikan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Domisili</label>
                <textarea name="alamatPelamar" value={data.alamatPelamar} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. Telp / WA</label>
                  <input type="text" name="noTelp" value={data.noTelp} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Email</label>
                  <input type="text" name="email" value={data.email} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Isi Surat & Kualifikasi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posisi yang Dilamar</label>
                <input type="text" name="posisiDilamar" value={data.posisiDilamar} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold text-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sumber Info Lowongan</label>
                <input type="text" name="sumberInfo" value={data.sumberInfo} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengalaman & Keahlian (Promosikan Diri Anda)</label>
                <textarea name="pengalamanKeahlian" value={data.pengalamanKeahlian} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-40 resize-none leading-relaxed text-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daftar Lampiran (Satu per baris)</label>
                <textarea name="daftarLampiran" value={data.daftarLampiran} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none leading-relaxed text-sm"></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <PrintWrapper printRef={printRef}>
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: '"Times New Roman", Times, serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .lamaran-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
              .lamaran-table td:nth-child(1) { width: 30%; }
              .lamaran-table td:nth-child(2) { width: 2%; }
              .lamaran-table td:nth-child(3) { width: 68%; }
              p { font-size: 11pt; margin-bottom: 8px; line-height: 1.5; text-align: justify; }
              .surat-header td { font-size: 11pt; padding: 2px 0; vertical-align: top; }
            `}} />

            {/* Header / Tanggal */}
            <div className="text-right text-[11pt] mb-8">
              {data.tempatTanggal}
            </div>
            
            <div className="mb-8">
              <table className="surat-header w-full">
                <tbody>
                  <tr>
                    <td className="w-20">Hal</td>
                    <td className="w-4">:</td>
                    <td className="font-bold">{data.hal}</td>
                  </tr>
                  <tr>
                    <td>Lampiran</td>
                    <td>:</td>
                    <td>{data.lampiran}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tujuan */}
            <div className="mb-8 text-[11pt]">
              <p className="mb-0">Yth.</p>
              <p className="font-bold mb-0">{data.namaPenerima}</p>
              <p className="font-bold mb-0">{data.perusahaanTujuan}</p>
              <div className="whitespace-pre-line">{data.alamatTujuan}</div>
            </div>

            {/* Pembuka */}
            <div className="mb-6">
              <p>Dengan hormat,</p>
              <p className="indent-8">
                Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari {data.sumberInfo}, saya mengetahui bahwa {data.perusahaanTujuan} sedang membutuhkan karyawan baru untuk mengisi posisi sebagai <strong>{data.posisiDilamar}</strong>.
              </p>
              <p className="indent-8">
                Sehubungan dengan hal tersebut, saya yang bertanda tangan di bawah ini:
              </p>
            </div>

            {/* Identitas Pelamar */}
            <div className="mb-6 pl-8">
              <table className="w-full lamaran-table">
                <tbody>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td className="font-bold">{data.namaLengkap}</td>
                  </tr>
                  <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>{data.tempatLahir}, {data.tanggalLahir}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{data.jenisKelamin}</td>
                  </tr>
                  <tr>
                    <td>Pendidikan Terakhir</td>
                    <td>:</td>
                    <td>{data.pendidikan}</td>
                  </tr>
                  <tr>
                    <td>Alamat Domisili</td>
                    <td>:</td>
                    <td className="whitespace-pre-line">{data.alamatPelamar}</td>
                  </tr>
                  <tr>
                    <td>No. Telepon / WA</td>
                    <td>:</td>
                    <td>{data.noTelp}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{data.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Isi & Promosi Diri */}
            <div className="mb-6">
              <p className="indent-8">
                Dengan ini bermaksud mengajukan lamaran pekerjaan untuk mengisi posisi tersebut. Sebagai bahan pertimbangan Bapak/Ibu, {data.pengalamanKeahlian}
              </p>
              <p className="indent-8">
                Saya memiliki kondisi kesehatan yang sangat baik, mampu berbahasa Inggris dengan baik (lisan maupun tulisan), serta dapat bekerja secara mandiri maupun dalam tim.
              </p>
            </div>

            {/* Lampiran */}
            <div className="mb-8">
              <p>Sebagai kelengkapan administrasi lamaran, bersama surat ini turut saya lampirkan dokumen pendukung:</p>
              <div className="pl-4 mt-2">
                {data.daftarLampiran.split('\n').filter(line => line.trim() !== '').map((item, idx) => (
                  <div key={idx} className="text-[11pt] mb-1">{item}</div>
                ))}
              </div>
            </div>

            {/* Penutup */}
            <div className="mb-12">
              <p className="indent-8">
                Besar harapan saya agar Bapak/Ibu bersedia meluangkan waktu untuk memberikan kesempatan wawancara, sehingga saya dapat menjelaskan secara lebih detail mengenai potensi dan kompetensi yang saya miliki.
              </p>
              <p className="indent-8">
                Demikian surat lamaran pekerjaan ini saya buat. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-end pr-8">
              <div className="w-64 text-center">
                <p className="mb-24">Hormat saya,</p>
                <p className="font-bold underline">{data.namaLengkap}</p>
              </div>
            </div>

          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}