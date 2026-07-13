'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { AlertCircle, Scale, User, CheckCircle2 } from 'lucide-react';

export default function PengaduanTemplate() {
  const [data, setData] = useState({
    // Meta Surat
    tempatTanggal: 'Jakarta, 13 Juli 2026',
    perihal: 'Pengaduan Dugaan Pelanggaran Ketenagakerjaan',
    lampiran: '3 (Tiga) Berkas',
    kategoriPengaduan: 'Ketenagakerjaan',
    
    // Tujuan
    tujuan: 'Dinas Tenaga Kerja, Transmigrasi dan Energi Provinsi DKI Jakarta',
    alamatTujuan: 'Jl. Prapatan No. 52, Kwitang, Senen\nJakarta Pusat 10410',
    
    // Data Pelapor
    namaPelapor: 'Andi Saputra',
    nikPelapor: '3171234567890001',
    alamatPelapor: 'Jl. Merdeka Selatan No. 12, RT 01/RW 02, Jakarta Selatan',
    pekerjaanPelapor: 'Karyawan Swasta',
    noTelpPelapor: '0812-9876-5432',
    emailPelapor: 'andi.saputra@email.com',
    
    // Data Terlapor
    namaTerlapor: 'PT. MAJU BERSAMA',
    alamatTerlapor: 'Gedung Office Tower Lt. 5, Jl. Jend. Sudirman Kav. 10, Jakarta Selatan',
    kontakTerlapor: '(021) 555-1234',
    
    // Uraian Pengaduan
    kronologis: 'Bahwa saya telah bekerja di PT. MAJU BERSAMA sejak 1 Januari 2020 hingga 30 Juni 2026. Pada tanggal 1 Juli 2026, saya diberhentikan secara sepihak tanpa diberikan Surat Peringatan (SP) sebelumnya dan tanpa diberikan kompensasi pesangon sesuai dengan ketentuan UU Cipta Kerja.\n\nBahwa selama bekerja, saya juga sering diminta melakukan lembur tanpa ada pembayaran upah lembur (overtime) dari pihak perusahaan.',
    
    tuntutan: '1. Memohon kebijaksanaan dari Bapak/Ibu Kepala Dinas Tenaga Kerja untuk memanggil pihak PT. MAJU BERSAMA.\n2. Menuntut pihak perusahaan agar membayarkan hak pesangon dan upah lembur sesuai ketentuan undang-undang yang berlaku.',
    
    // Penutup
    namaSaksi: '1. Budi Santoso (Rekan Kerja)\n2. Siti Aminah (HR Staff)'
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
          <Scale className="w-5 h-5 text-red-600" />
          Editor Surat Pengaduan
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Surat & Tujuan</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori Pengaduan</label>
                  <select name="kategoriPengaduan" value={data.kategoriPengaduan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="Ketenagakerjaan">Ketenagakerjaan</option>
                    <option value="Konsumen">Perlindungan Konsumen</option>
                    <option value="Tindak Pidana">Tindak Pidana Umum</option>
                    <option value="Perdata">Sengketa Perdata</option>
                    <option value="Lingkungan">Pencemaran Lingkungan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempat, Tanggal</label>
                  <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lampiran</label>
                  <input type="text" name="lampiran" value={data.lampiran} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perihal</label>
                <input type="text" name="perihal" value={data.perihal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kepada Yth. (Instansi/Pihak Dituju)</label>
                <input type="text" name="tujuan" value={data.tujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Tujuan</label>
                <textarea name="alamatTujuan" value={data.alamatTujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Identitas Pelapor (Pihak I)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Lengkap</label>
                <input type="text" name="namaPelapor" value={data.namaPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. KTP/NIK</label>
                  <input type="text" name="nikPelapor" value={data.nikPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Pekerjaan</label>
                  <input type="text" name="pekerjaanPelapor" value={data.pekerjaanPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Domisili</label>
                <textarea name="alamatPelapor" value={data.alamatPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. Telepon</label>
                  <input type="text" name="noTelpPelapor" value={data.noTelpPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Email</label>
                  <input type="text" name="emailPelapor" value={data.emailPelapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Identitas Terlapor (Pihak II)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Nama / Perusahaan Terlapor</label>
                <input type="text" name="namaTerlapor" value={data.namaTerlapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Alamat Terlapor</label>
                <textarea name="alamatTerlapor" value={data.alamatTerlapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Kontak Terlapor (Jika Ada)</label>
                <input type="text" name="kontakTerlapor" value={data.kontakTerlapor} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Uraian & Tuntutan
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kronologis Kejadian (Jelaskan secara detail)</label>
                <textarea name="kronologis" value={data.kronologis} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-40 resize-none leading-relaxed"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tuntutan / Harapan Pelapor</label>
                <textarea name="tuntutan" value={data.tuntutan} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none leading-relaxed"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Saksi-saksi (Jika Ada)</label>
                <textarea name="namaSaksi" value={data.namaSaksi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: '"Times New Roman", Times, serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .pengaduan-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
              .pengaduan-table td:nth-child(1) { width: 30%; }
              .pengaduan-table td:nth-child(2) { width: 2%; }
              .pengaduan-table td:nth-child(3) { width: 68%; }
              p { font-size: 11pt; margin-bottom: 8px; line-height: 1.5; }
              .surat-header td { font-size: 11pt; padding: 2px 0; vertical-align: top; }
            `}} />

            {/* Header / Tanggal */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-1/2">
                <table className="surat-header w-full">
                  <tbody>
                    <tr>
                      <td className="w-20">Perihal</td>
                      <td className="w-4">:</td>
                      <td className="font-bold uppercase underline">{data.perihal}</td>
                    </tr>
                    <tr>
                      <td>Lampiran</td>
                      <td>:</td>
                      <td>{data.lampiran}</td>
                    </tr>
                    <tr>
                      <td>Kategori</td>
                      <td>:</td>
                      <td>{data.kategoriPengaduan}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-right text-[11pt]">
                {data.tempatTanggal}
              </div>
            </div>

            {/* Tujuan */}
            <div className="mb-8">
              <p>Kepada Yth.,</p>
              <p className="font-bold text-lg mb-1 leading-tight">{data.tujuan}</p>
              <div className="whitespace-pre-line text-[11pt]">{data.alamatTujuan}</div>
            </div>

            {/* Pembuka */}
            <div className="mb-6">
              <p>Dengan hormat,</p>
              <p className="indent-8 text-justify">
                Saya yang bertanda tangan di bawah ini selaku pelapor:
              </p>
            </div>

            {/* Identitas Pelapor */}
            <div className="mb-6 pl-4 border-l-[3px] border-gray-300">
              <table className="w-full pengaduan-table">
                <tbody>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td className="font-bold">{data.namaPelapor}</td>
                  </tr>
                  <tr>
                    <td>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>{data.nikPelapor}</td>
                  </tr>
                  <tr>
                    <td>Pekerjaan</td>
                    <td>:</td>
                    <td>{data.pekerjaanPelapor}</td>
                  </tr>
                  <tr>
                    <td>Alamat Lengkap</td>
                    <td>:</td>
                    <td className="whitespace-pre-line">{data.alamatPelapor}</td>
                  </tr>
                  <tr>
                    <td>No. Telepon / HP</td>
                    <td>:</td>
                    <td>{data.noTelpPelapor}</td>
                  </tr>
                  <tr>
                    <td>Alamat Email</td>
                    <td>:</td>
                    <td>{data.emailPelapor}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Penghubung */}
            <div className="mb-6">
              <p className="indent-8 text-justify">
                Melalui surat ini bermaksud mengajukan laporan / pengaduan resmi atas dugaan pelanggaran / tindakan yang merugikan yang dilakukan oleh pihak terlapor, yaitu:
              </p>
            </div>

            {/* Identitas Terlapor */}
            <div className="mb-6 pl-4 border-l-[3px] border-gray-800">
              <table className="w-full pengaduan-table">
                <tbody>
                  <tr>
                    <td>Nama / Instansi Terlapor</td>
                    <td>:</td>
                    <td className="font-bold uppercase text-red-800">{data.namaTerlapor}</td>
                  </tr>
                  <tr>
                    <td>Alamat Terlapor</td>
                    <td>:</td>
                    <td className="whitespace-pre-line">{data.alamatTerlapor}</td>
                  </tr>
                  <tr>
                    <td>Kontak Terlapor</td>
                    <td>:</td>
                    <td>{data.kontakTerlapor || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Kronologis & Tuntutan */}
            <div className="mb-8">
              <p className="font-bold uppercase border-b border-black mb-2 inline-block">A. Kronologis Kejadian</p>
              <div className="whitespace-pre-line text-justify mb-6">{data.kronologis}</div>

              <p className="font-bold uppercase border-b border-black mb-2 inline-block">B. Tuntutan / Harapan Pelapor</p>
              <div className="whitespace-pre-line text-justify mb-6">{data.tuntutan}</div>

              {data.namaSaksi && (
                <>
                  <p className="font-bold uppercase border-b border-black mb-2 inline-block">C. Saksi - Saksi</p>
                  <div className="whitespace-pre-line text-justify mb-6">{data.namaSaksi}</div>
                </>
              )}
            </div>

            {/* Penutup */}
            <div className="mb-12">
              <p className="indent-8 text-justify mb-2">
                Demikian surat pengaduan ini saya buat dengan sebenar-benarnya dalam keadaan sadar dan tanpa ada paksaan dari pihak manapun. Saya bersedia memberikan keterangan lebih lanjut beserta bukti-bukti pendukung apabila diperlukan.
              </p>
              <p className="indent-8 text-justify">
                Atas perhatian, perlindungan, dan tindak lanjut dari Bapak/Ibu, saya sampaikan terima kasih.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-end pr-8">
              <div className="w-64 text-center">
                <p className="mb-2">Hormat saya,</p>
                <p className="mb-24">Pelapor,</p>
                <div className="relative inline-block text-center w-full">
                  <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-16 h-20 border border-gray-400 flex flex-col items-center justify-center bg-gray-50 -z-10">
                    <span className="text-[7px] text-gray-400 text-center uppercase leading-none">Meterai<br/>10.000</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaPelapor}</p>
                </div>
              </div>
            </div>

          </div>
                  <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>
      </div>
    </div>
  );
}