'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { GraduationCap, BookOpen, UserMinus } from 'lucide-react';

export default function StopStudiTemplate() {
  const [data, setData] = useState({
    // Meta
    tempatTanggal: 'Yogyakarta, 13 Juli 2026',
    hal: 'Permohonan Pengunduran Diri (Stop Studi)',
    
    // Kampus Tujuan
    tujuan: 'Dekan Fakultas Ilmu Komputer',
    namaKampus: 'Universitas Teknologi Nusantara',
    alamatKampus: 'Jl. Pendidikan No. 123, Yogyakarta',
    
    // Data Mahasiswa
    namaMahasiswa: 'Ahmad Fauzi',
    nim: '2022105001',
    programStudi: 'S1 Teknik Informatika',
    semester: '8 (Delapan)',
    ipk: '3.45',
    alamatMahasiswa: 'Jl. Kaliurang KM 5 No. 10, Sleman, Yogyakarta',
    noTelp: '0812-9876-5432',
    email: 'fauzi.ahmad@student.utn.ac.id',
    
    // Alasan
    alasan: 'Diterima bekerja sebagai Pegawai Negeri Sipil (PNS) di instansi pemerintahan yang mewajibkan ikatan dinas penuh waktu dan tidak mengizinkan status mahasiswa aktif.',
    
    // Ortu/Wali
    namaOrtu: 'Budi Santoso',
    pekerjaanOrtu: 'Wiraswasta',
    
    // Pejabat Kampus
    namaDPA: 'Dr. Ir. Hendra Wijaya, M.Kom.',
    namaKaprodi: 'Siti Aminah, S.T., M.Cs.'
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-red-600" />
          Editor Stop Studi
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Kampus & Tujuan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempat, Tanggal</label>
                <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kepada Yth. (Tujuan)</label>
                <input type="text" name="tujuan" value={data.tujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kampus</label>
                <input type="text" name="namaKampus" value={data.namaKampus} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Kampus</label>
                <textarea name="alamatKampus" value={data.alamatKampus} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <UserMinus className="w-4 h-4" /> Data Mahasiswa
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Lengkap</label>
                <input type="text" name="namaMahasiswa" value={data.namaMahasiswa} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">NIM / NPM</label>
                  <input type="text" name="nim" value={data.nim} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Program Studi</label>
                  <input type="text" name="programStudi" value={data.programStudi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Semester</label>
                  <input type="text" name="semester" value={data.semester} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">IPK Terakhir</label>
                  <input type="text" name="ipk" value={data.ipk} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Domisili</label>
                <textarea name="alamatMahasiswa" value={data.alamatMahasiswa} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. Telp / HP</label>
                  <input type="text" name="noTelp" value={data.noTelp} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Email</label>
                  <input type="text" name="email" value={data.email} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Alasan & Wali
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Alasan Pengunduran Diri</label>
                <textarea name="alasan" value={data.alasan} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none leading-relaxed text-sm"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Nama Orang Tua/Wali</label>
                  <input type="text" name="namaOrtu" value={data.namaOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Pekerjaan</label>
                  <input type="text" name="pekerjaanOrtu" value={data.pekerjaanOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Pejabat Pengesahan (Kampus)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dosen Pembimbing Akademik (DPA)</label>
                <input type="text" name="namaDPA" value={data.namaDPA} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ketua Program Studi (Kaprodi)</label>
                <input type="text" name="namaKaprodi" value={data.namaKaprodi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
              .mhs-table td { padding: 5px 8px 5px 0; vertical-align: top; font-size: 11.5pt; }
              .mhs-table td:nth-child(1) { width: 35%; }
              .mhs-table td:nth-child(2) { width: 3%; }
              .mhs-table td:nth-child(3) { width: 62%; font-weight: bold; }
              p { font-size: 11.5pt; margin-bottom: 8px; line-height: 1.5; text-align: justify; }
            `}} />

            {/* Tanggal & Perihal */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <table className="w-full text-[11.5pt]">
                  <tbody>
                    <tr>
                      <td className="w-20 py-1">Hal</td>
                      <td className="w-4 py-1">:</td>
                      <td className="font-bold underline uppercase py-1">{data.hal}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Lampiran</td>
                      <td className="py-1">:</td>
                      <td className="py-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-[11.5pt]">
                {data.tempatTanggal}
              </div>
            </div>

            {/* Tujuan */}
            <div className="mb-10 text-[11.5pt]">
              <p className="mb-1">Yth.</p>
              <p className="font-bold mb-1">{data.tujuan}</p>
              <p className="font-bold mb-1">{data.namaKampus}</p>
              <div className="whitespace-pre-line">{data.alamatKampus}</div>
            </div>

            {/* Pembuka */}
            <div className="mb-6">
              <p>Dengan hormat,</p>
              <p className="indent-8">
                Saya yang bertanda tangan di bawah ini selaku mahasiswa {data.namaKampus}:
              </p>
            </div>

            {/* Data Mahasiswa */}
            <div className="mb-6 pl-8">
              <table className="w-full mhs-table">
                <tbody>
                  <tr>
                    <td>Nama Mahasiswa</td>
                    <td>:</td>
                    <td>{data.namaMahasiswa}</td>
                  </tr>
                  <tr>
                    <td>NIM / NPM</td>
                    <td>:</td>
                    <td className="font-mono text-[11.5pt]">{data.nim}</td>
                  </tr>
                  <tr>
                    <td>Program Studi</td>
                    <td>:</td>
                    <td>{data.programStudi}</td>
                  </tr>
                  <tr>
                    <td>Semester / IPK</td>
                    <td>:</td>
                    <td>{data.semester} / {data.ipk}</td>
                  </tr>
                  <tr>
                    <td>Alamat Domisili</td>
                    <td>:</td>
                    <td className="whitespace-pre-line font-normal">{data.alamatMahasiswa}</td>
                  </tr>
                  <tr>
                    <td>No. HP / Telepon</td>
                    <td>:</td>
                    <td className="font-normal">{data.noTelp}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Isi */}
            <div className="mb-8">
              <p className="indent-8">
                Dengan ini bermaksud mengajukan permohonan pengunduran diri (stop studi) dari program pendidikan di institusi yang Bapak/Ibu pimpin. Adapun alasan pengunduran diri ini adalah:
              </p>
              <div className="pl-8 mb-4 mt-2">
                <p className="italic font-bold">"{data.alasan}"</p>
              </div>
              <p className="indent-8">
                Bersama dengan surat permohonan ini, saya menyatakan bahwa seluruh kewajiban administrasi, akademik, maupun finansial kepada pihak kampus telah saya selesaikan dengan baik. Saya mengucapkan terima kasih yang sebesar-besarnya atas segala ilmu, bimbingan, serta fasilitas yang telah diberikan selama saya menempuh pendidikan di {data.namaKampus}.
              </p>
            </div>

            {/* Penutup */}
            <div className="mb-12">
              <p className="indent-8">
                Demikian surat permohonan pengunduran diri ini saya buat dalam keadaan sadar dan tanpa paksaan dari pihak manapun. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya sampaikan terima kasih.
              </p>
            </div>

            {/* TTD Mahasiswa & Ortu */}
            <div className="grid grid-cols-2 gap-8 mb-16 text-[11.5pt] text-center">
              <div>
                <p className="mb-24">Mengetahui/Menyetujui,<br/>Orang Tua / Wali Mahasiswa,</p>
                <p className="font-bold underline">{data.namaOrtu}</p>
              </div>
              <div>
                <p className="mb-24">Hormat saya,<br/>Pemohon,</p>
                <div className="relative inline-block text-center w-full">
                  <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-16 h-20 border border-gray-400 flex flex-col items-center justify-center bg-gray-50 -z-10">
                    <span className="text-[7px] text-gray-400 text-center uppercase leading-none">Meterai<br/>10.000</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaMahasiswa}</p>
                  <p>NIM. {data.nim}</p>
                </div>
              </div>
            </div>

            {/* TTD Pejabat Kampus */}
            <div className="text-[11.5pt] mb-4">
              <p className="font-bold text-center border-b border-black pb-2 mb-6">MENGESAHKAN</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-[11.5pt] text-center">
              <div>
                <p className="mb-20">Dosen Pembimbing Akademik,</p>
                <p className="font-bold underline">{data.namaDPA}</p>
              </div>
              <div>
                <p className="mb-20">Ketua Program Studi,</p>
                <p className="font-bold underline">{data.namaKaprodi}</p>
              </div>
            </div>

          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}