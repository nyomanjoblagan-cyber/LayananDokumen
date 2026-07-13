'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';

export default function SuratKlaimAsuransi() {
  const [data, setData] = useState({
    nomorSurat: '001/KLAIM/2026',
    lampiran: '5 (Lima) Berkas',
    jenisAsuransi: 'Kendaraan Bermotor',
    namaPerusahaanAsuransi: 'PT Asuransi Maju Jaya',
    alamatAsuransi: 'Gedung Asuransi Tower, Jl. Sudirman No. 45\nJakarta Pusat, 10220',
    namaTertanggung: 'Budi Santoso',
    noPolis: 'POL-9988-7766-5544',
    noIdentitas: '3171234567890001',
    alamatTertanggung: 'Jl. Merdeka Raya No. 12, Kebayoran Baru, Jakarta Selatan',
    noTelepon: '0812-3456-7890',
    email: 'budi.santoso@email.com',
    tanggalKejadian: '12 Juli 2026',
    waktuKejadian: '14:30 WIB',
    lokasiKejadian: 'Jalan Tol Dalam Kota KM 14, Jakarta',
    penyebabKejadian: 'Kecelakaan Lalu Lintas (Tabrakan Beruntun)',
    estimasiKerugian: '45.000.000',
    terbilangKerugian: 'Empat Puluh Lima Juta Rupiah',
    kronologis: 'Saat sedang melaju di jalur kanan dengan kecepatan 60 km/jam, kendaraan di depan mengerem mendadak sehingga menyebabkan tabrakan beruntun. Kendaraan saya mengalami kerusakan parah di bagian bumper depan dan kap mesin.',
    namaBank: 'Bank Central Asia (BCA)',
    cabangBank: 'KCP Sudirman',
    noRekening: '1234567890',
    namaRekening: 'Budi Santoso',
    tanggalSurat: '13 Juli 2026',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Editor Sidebar */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Editor Klaim Asuransi
        </h2>
        
        <div className="space-y-5">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Informasi Surat</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
                <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lampiran</label>
                <input type="text" name="lampiran" value={data.lampiran} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Surat</label>
                <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Tujuan (Asuransi)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Asuransi</label>
                <input type="text" name="jenisAsuransi" value={data.jenisAsuransi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan Asuransi</label>
                <input type="text" name="namaPerusahaanAsuransi" value={data.namaPerusahaanAsuransi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Asuransi</label>
                <textarea name="alamatAsuransi" value={data.alamatAsuransi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Data Tertanggung</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input type="text" name="namaTertanggung" value={data.namaTertanggung} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Polis</label>
                <input type="text" name="noPolis" value={data.noPolis} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. KTP/Identitas</label>
                <input type="text" name="noIdentitas" value={data.noIdentitas} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor HP</label>
                <input type="text" name="noTelepon" value={data.noTelepon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="text" name="email" value={data.email} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap</label>
                <textarea name="alamatTertanggung" value={data.alamatTertanggung} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Rincian Kejadian</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggalKejadian" value={data.tanggalKejadian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waktu</label>
                  <input type="text" name="waktuKejadian" value={data.waktuKejadian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
                <input type="text" name="lokasiKejadian" value={data.lokasiKejadian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Penyebab</label>
                <input type="text" name="penyebabKejadian" value={data.penyebabKejadian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimasi Kerugian (Rp)</label>
                <input type="text" name="estimasiKerugian" value={data.estimasiKerugian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Terbilang (Rupiah)</label>
                <input type="text" name="terbilangKerugian" value={data.terbilangKerugian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kronologis</label>
                <textarea name="kronologis" value={data.kronologis} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none leading-relaxed"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Pembayaran</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Bank</label>
                <input type="text" name="namaBank" value={data.namaBank} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cabang</label>
                <input type="text" name="cabangBank" value={data.cabangBank} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. Rekening</label>
                <input type="text" name="noRekening" value={data.noRekening} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">A.N. Rekening</label>
                <input type="text" name="namaRekening" value={data.namaRekening} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview */}
      <div className="w-full md:w-2/3 flex justify-center pb-12">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area shadow-2xl bg-white w-full max-w-[210mm] min-h-[297mm] mx-auto p-[25mm] text-black font-serif text-[11pt] leading-[1.6]">
            
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4; margin: 25mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .legal-table td { padding: 4px 8px 4px 0; vertical-align: top; }
              .legal-table td:nth-child(1) { width: 35%; }
              .legal-table td:nth-child(2) { width: 2%; }
              .legal-table td:nth-child(3) { width: 63%; font-weight: 500; }
              .doc-title { text-transform: uppercase; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 2px; }
            `}} />

            {/* Letter Header */}
            <div className="flex justify-between items-start mb-8 text-[11pt]">
              <table className="w-1/2">
                <tbody>
                  <tr><td className="w-20">Nomor</td><td className="w-4">:</td><td>{data.nomorSurat}</td></tr>
                  <tr><td>Lampiran</td><td>:</td><td>{data.lampiran}</td></tr>
                  <tr><td>Perihal</td><td>:</td><td className="font-bold">Klaim Asuransi {data.jenisAsuransi}</td></tr>
                </tbody>
              </table>
              <div className="text-right">
                <span className="block">{data.tanggalSurat}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <p className="mb-1">Kepada Yth.,</p>
              <p className="font-bold text-lg mb-1">{data.namaPerusahaanAsuransi}</p>
              <p className="mb-0">Up. Departemen Klaim</p>
              <div className="whitespace-pre-line">{data.alamatAsuransi}</div>
            </div>

            {/* Opening */}
            <div className="mb-6">
              <p className="mb-3">Dengan hormat,</p>
              <p className="text-justify indent-8">
                Melalui surat ini, saya yang bertanda tangan di bawah ini selaku Pemegang Polis / Tertanggung dari <strong>{data.namaPerusahaanAsuransi}</strong>, menyampaikan permohonan klaim asuransi dengan rincian data sebagai berikut:
              </p>
            </div>

            {/* Section I */}
            <div className="mb-6 pl-4 border-l-2 border-gray-300">
              <h4 className="font-bold mb-3">I. DATA TERTANGGUNG</h4>
              <table className="w-full legal-table">
                <tbody>
                  <tr><td>Nama Lengkap</td><td>:</td><td>{data.namaTertanggung}</td></tr>
                  <tr><td>Nomor Polis Asuransi</td><td>:</td><td>{data.noPolis}</td></tr>
                  <tr><td>Nomor Identitas (KTP)</td><td>:</td><td>{data.noIdentitas}</td></tr>
                  <tr><td>Alamat Korespondensi</td><td>:</td><td className="whitespace-pre-line">{data.alamatTertanggung}</td></tr>
                  <tr><td>Nomor Telepon / HP</td><td>:</td><td>{data.noTelepon}</td></tr>
                  <tr><td>Alamat Email</td><td>:</td><td>{data.email}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Section II */}
            <div className="mb-6 pl-4 border-l-2 border-gray-300">
              <h4 className="font-bold mb-3">II. RINCIAN KEJADIAN</h4>
              <table className="w-full legal-table">
                <tbody>
                  <tr><td>Waktu Kejadian</td><td>:</td><td>{data.tanggalKejadian}, Pukul {data.waktuKejadian}</td></tr>
                  <tr><td>Lokasi Kejadian</td><td>:</td><td>{data.lokasiKejadian}</td></tr>
                  <tr><td>Penyebab</td><td>:</td><td>{data.penyebabKejadian}</td></tr>
                  <tr><td>Estimasi Kerugian</td><td>:</td><td>Rp {data.estimasiKerugian} 
                    <span className="block text-sm italic">({data.terbilangKerugian})</span>
                  </td></tr>
                  <tr><td>Kronologis Singkat</td><td>:</td><td className="text-justify font-normal">{data.kronologis}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Section III */}
            <div className="mb-6 pl-4 border-l-2 border-gray-300">
              <h4 className="font-bold mb-3">III. DOKUMEN PENDUKUNG</h4>
              <p className="mb-2">Sebagai kelengkapan administrasi, bersama ini saya lampirkan dokumen pendukung yang dipersyaratkan:</p>
              <ol className="list-decimal pl-6 space-y-1 text-[10.5pt]">
                <li>Fotokopi Polis Asuransi;</li>
                <li>Fotokopi Kartu Identitas (KTP) Tertanggung;</li>
                <li>Formulir Klaim Asuransi asli yang telah diisi lengkap;</li>
                <li>Laporan kronologis resmi / Surat Keterangan;</li>
                <li>Bukti biaya/kerugian asli (Kwitansi / Estimasi Perbaikan);</li>
                <li>Foto-foto dokumentasi kerusakan/kejadian.</li>
              </ol>
            </div>

            {/* Section IV */}
            <div className="mb-6 pl-4 border-l-2 border-gray-300">
              <h4 className="font-bold mb-3">IV. INFORMASI PEMBAYARAN</h4>
              <p className="mb-2">Apabila klaim ini disetujui, mohon agar pembayaran manfaat ditransfer ke rekening:</p>
              <table className="w-full legal-table">
                <tbody>
                  <tr><td>Nama Bank</td><td>:</td><td>{data.namaBank}</td></tr>
                  <tr><td>Kantor Cabang</td><td>:</td><td>{data.cabangBank}</td></tr>
                  <tr><td>Nomor Rekening</td><td>:</td><td>{data.noRekening}</td></tr>
                  <tr><td>Atas Nama</td><td>:</td><td>{data.namaRekening}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Closing */}
            <div className="mb-10">
              <p className="text-justify indent-8 mb-3">
                Demikian surat tuntutan klaim asuransi ini saya buat dengan sebenar-benarnya dan tanpa paksaan. Saya bersedia memberikan keterangan atau dokumen tambahan apabila diperlukan oleh pihak Asuransi.
              </p>
              <p className="text-justify indent-8">
                Atas perhatian dan kerja sama yang baik dari Bapak/Ibu, saya ucapkan terima kasih.
              </p>
            </div>

            {/* Signature Area */}
            <div className="flex justify-end mt-12">
              <div className="text-center w-64">
                <p className="mb-24">Hormat saya,<br/>Pemegang Polis / Tertanggung,</p>
                <p className="font-bold underline">{data.namaTertanggung}</p>
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
