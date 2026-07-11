"use client";

import React, { useState } from 'react';

// Aturan Kertas Mutlak
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function PenagihanB2B() {
  const [formData, setFormData] = useState({
    nomorSurat: '001/FIN-COLL/VII/2026',
    tanggalSurat: '10 Juli 2026',
    lampiran: '1 (satu) Berkas',
    perihal: 'Peringatan Jatuh Tempo & Penagihan Pembayaran (Somasi 1)',
    
    // Data Perusahaan Pengirim
    namaPengirim: 'PT. NUSANTARA ENTERPRISE SOLUTION',
    alamatPengirim: 'Gedung Cyber 2, Lt. 17, Jl. H. R. Rasuna Said Blok X-5 Kav. 13, Jakarta Selatan 12950',
    teleponPengirim: '(021) 555-1234',
    emailPengirim: 'finance@nusantara-enterprise.co.id',

    // Data Klien / Penerima
    namaKlien: 'PT. MAJU BERSAMA TECHNOLOGY',
    upKlien: 'Bpk. Budi Santoso - Direktur Keuangan',
    alamatKlien: 'Kawasan Industri Pulogadung, Jl. Rawa Bali II No. 5, Jakarta Timur 13920',
    
    // Rincian Tagihan
    nomorInvoice: 'INV-2026-05-089',
    tanggalInvoice: '15 Mei 2026',
    jatuhTempo: '14 Juni 2026',
    nilaiPokok: 250000000,
    persentaseDenda: 0.1, // 0.1% per hari
    hariKeterlambatan: 26, 
    biayaAdmin: 500000,
    
    // Rekening Pembayaran
    namaBank: 'Bank Central Asia (BCA)',
    cabangBank: 'KCU Sudirman',
    namaRekening: 'PT. NUSANTARA ENTERPRISE SOLUTION',
    nomorRekening: '098-765-4321',
    
    // Pejabat Berwenang
    namaPejabat: 'Andi Wijaya, S.E., M.Ak.',
    jabatanPejabat: 'Chief Financial Officer'
  });

  const nilaiDenda = Math.floor(formData.nilaiPokok * (formData.persentaseDenda / 100) * formData.hariKeterlambatan);
  const totalTagihan = formData.nilaiPokok + nilaiDenda + formData.biayaAdmin;

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* ATURAN PRINT MUTLAK */}
      <style dangerouslySetInnerHTML={{ __html: `\n@media print {\n  @page { size: A4; margin: 15mm; } \n  body { background: white; margin: 0; padding: 0; width: 100%; }\n  .no-print { display: none !important; }\n  #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }\n  .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }\n  .break-before-auto { break-before: auto !important; page-break-before: auto !important; }\n  * { box-sizing: border-box !important; }\n}\n` }} />

      <div className="max-w-[210mm] mx-auto mb-8 no-print bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b pb-2">Form Editor Surat Penagihan (B2B)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700 bg-slate-100 p-2 rounded">Header Surat</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Surat</label>
              <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Surat</label>
              <input type="text" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Perihal (Tingkat Somasi)</label>
              <select name="perihal" value={formData.perihal} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                <option value="Peringatan Jatuh Tempo & Penagihan Pembayaran (Somasi 1)">Somasi 1 - Peringatan Pertama</option>
                <option value="Peringatan Keras & Penagihan Pembayaran (Somasi 2)">Somasi 2 - Peringatan Keras</option>
                <option value="Peringatan Terakhir & Rencana Langkah Hukum (Somasi 3)">Somasi 3 - Peringatan Terakhir & Hukum</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700 bg-slate-100 p-2 rounded">Penerima (Klien)</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Perusahaan Klien</label>
              <input type="text" name="namaKlien" value={formData.namaKlien} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">U.P (Penerima)</label>
              <input type="text" name="upKlien" value={formData.upKlien} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat Klien</label>
              <textarea name="alamatKlien" value={formData.alamatKlien} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" rows={3}></textarea>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700 bg-slate-100 p-2 rounded">Rincian Tunggakan</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Invoice</label>
              <input type="text" name="nomorInvoice" value={formData.nomorInvoice} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tgl Invoice</label>
                <input type="text" name="tanggalInvoice" value={formData.tanggalInvoice} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jatuh Tempo</label>
                <input type="text" name="jatuhTempo" value={formData.jatuhTempo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nilai Pokok (Rp)</label>
              <input type="number" name="nilaiPokok" value={formData.nilaiPokok} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Keterlambatan (Hari)</label>
                <input type="number" name="hariKeterlambatan" value={formData.hariKeterlambatan} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Denda (%/hari)</label>
                <input type="number" step="0.01" name="persentaseDenda" value={formData.persentaseDenda} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.print()} 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 mt-4"
        >
          CETAK SURAT PENAGIHAN
        </button>
      </div>

      <div id="print-only-root">
        <Kertas>
          {/* KOP SURAT */}
          <div className="border-b-4 border-slate-900 pb-4 mb-6 flex flex-col break-inside-avoid">
            <h1 className="text-2xl font-bold text-center text-slate-900 tracking-wider mb-2">{formData.namaPengirim}</h1>
            <p className="text-center text-sm text-slate-700">{formData.alamatPengirim}</p>
            <p className="text-center text-sm text-slate-700">Telp: {formData.teleponPengirim} | Email: {formData.emailPengirim}</p>
          </div>

          {/* HEADER SURAT */}
          <div className="flex justify-between mb-8 break-inside-avoid">
            <div>
              <table className="text-sm">
                <tbody>
                  <tr><td className="w-24 pb-1">Nomor</td><td className="w-4 pb-1">:</td><td className="pb-1 font-semibold">{formData.nomorSurat}</td></tr>
                  <tr><td className="w-24 pb-1">Lampiran</td><td className="w-4 pb-1">:</td><td className="pb-1">{formData.lampiran}</td></tr>
                  <tr><td className="w-24 pb-1">Perihal</td><td className="w-4 pb-1">:</td><td className="pb-1 font-bold underline">{formData.perihal}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="text-right text-sm">
              <p>Jakarta, {formData.tanggalSurat}</p>
            </div>
          </div>

          {/* ALAMAT TUJUAN */}
          <div className="mb-8 break-inside-avoid">
            <p className="mb-2 text-sm">Kepada Yth.,</p>
            <p className="font-bold text-md">{formData.namaKlien}</p>
            <p className="text-sm mb-2">U.P: {formData.upKlien}</p>
            <p className="text-sm max-w-sm leading-relaxed">{formData.alamatKlien}</p>
          </div>

          {/* ISI SURAT */}
          <div className="text-justify text-sm leading-loose mb-8">
            <p className="mb-4">Dengan hormat,</p>
            <p className="mb-4">
              Semoga kesuksesan senantiasa menyertai setiap aktivitas bisnis Bapak/Ibu. Kami mengucapkan terima kasih atas kerja sama yang terjalin baik selama ini antara <strong>{formData.namaPengirim}</strong> dengan <strong>{formData.namaKlien}</strong>.
            </p>
            <p className="mb-4">
              Berdasarkan catatan keuangan dan administrasi kami, terdapat tagihan atas layanan/produk yang telah kami berikan namun <strong>belum diselesaikan pembayarannya</strong> oleh pihak {formData.namaKlien} yang telah melewati batas waktu jatuh tempo (overdue).
            </p>
            
            <p className="mb-2 font-bold text-slate-800">Berikut adalah rincian tagihan yang tertunggak:</p>
            <div className="ml-4 mb-4 bg-slate-50 p-4 border border-slate-300 rounded break-inside-avoid">
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="w-48 py-1">Nomor Invoice</td><td className="w-4 py-1">:</td><td className="py-1 font-semibold">{formData.nomorInvoice}</td></tr>
                  <tr><td className="py-1">Tanggal Invoice</td><td className="py-1">:</td><td className="py-1">{formData.tanggalInvoice}</td></tr>
                  <tr><td className="py-1 text-red-600 font-semibold">Tanggal Jatuh Tempo</td><td className="py-1 text-red-600 font-semibold">:</td><td className="py-1 text-red-600 font-semibold">{formData.jatuhTempo}</td></tr>
                  <tr><td className="py-1">Nilai Pokok Tagihan</td><td className="py-1">:</td><td className="py-1">{formatRupiah(formData.nilaiPokok)}</td></tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4">
              Sesuai dengan Syarat dan Ketentuan (Terms & Conditions) Perjanjian Kerjasama, keterlambatan pembayaran akan dikenakan denda sebesar <strong>{formData.persentaseDenda}% per hari</strong>. Mengingat tagihan ini telah menunggak selama <strong>{formData.hariKeterlambatan} hari</strong>, maka perhitungan kewajiban saat ini adalah sebagai berikut:
            </p>

            {/* TABEL PERHITUNGAN TOTAL */}
            <table className="w-full mb-6 border-collapse border border-slate-800 text-sm break-inside-avoid">
              <thead className="bg-slate-200 font-bold">
                <tr>
                  <th className="border border-slate-800 p-2 text-left">Deskripsi Tagihan</th>
                  <th className="border border-slate-800 p-2 text-right w-48">Jumlah (IDR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-800 p-2">Pokok Tagihan (Invoice {formData.nomorInvoice})</td>
                  <td className="border border-slate-800 p-2 text-right">{formatRupiah(formData.nilaiPokok)}</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 p-2">
                    Denda Keterlambatan ({formData.persentaseDenda}% x {formData.hariKeterlambatan} Hari x Pokok Tagihan)
                  </td>
                  <td className="border border-slate-800 p-2 text-right text-red-600">{formatRupiah(nilaiDenda)}</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 p-2">Biaya Administrasi Penagihan</td>
                  <td className="border border-slate-800 p-2 text-right">{formatRupiah(formData.biayaAdmin)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-bold bg-slate-100">
                  <td className="border border-slate-800 p-2 text-right">TOTAL KESELURUHAN YANG HARUS DIBAYARKAN</td>
                  <td className="border border-slate-800 p-2 text-right">{formatRupiah(totalTagihan)}</td>
                </tr>
              </tfoot>
            </table>

            <p className="mb-4 font-semibold text-red-700">
              Mengingat pentingnya kelancaran arus kas bisnis kami, kami meminta Bapak/Ibu untuk segera melunasi total tagihan di atas selambat-lambatnya 3 (tiga) hari kerja sejak surat ini diterima.
            </p>

            <p className="mb-2">Pembayaran dapat ditransfer ke rekening operasional perusahaan kami:</p>
            <div className="ml-4 mb-4 border-l-4 border-slate-800 pl-4 py-1 break-inside-avoid">
              <p className="font-bold">{formData.namaBank} - {formData.cabangBank}</p>
              <p>Atas Nama : <span className="font-bold">{formData.namaRekening}</span></p>
              <p>No. Rekening : <span className="font-bold text-lg tracking-widest">{formData.nomorRekening}</span></p>
            </div>

            <p className="mb-4">
              Apabila hingga batas waktu tersebut kami belum menerima pembayaran, dengan berat hati kami akan <strong>menangguhkan layanan/kerjasama bisnis</strong> secara sepihak dan mempertimbangkan langkah-langkah penyelesaian lebih lanjut, termasuk namun tidak terbatas pada penunjukan konsultan hukum atau agensi penagihan pihak ketiga (Third Party Collection Agency).
            </p>
            
            <p className="mb-8">
              Mohon abaikan surat ini jika Bapak/Ibu telah melakukan pembayaran. Bukti transfer dapat dikirimkan ke email <strong>{formData.emailPengirim}</strong>. Demikian surat peringatan ini kami sampaikan agar menjadi perhatian serius. Atas kerja sama dan itikad baiknya, kami ucapkan terima kasih.
            </p>
          </div>

          {/* TTD */}
          <div className="flex justify-end break-inside-avoid">
            <div className="text-center w-64">
              <p className="text-sm mb-24">Hormat Kami,<br/><strong>{formData.namaPengirim}</strong></p>
              <p className="font-bold underline text-sm">{formData.namaPejabat}</p>
              <p className="text-sm italic">{formData.jabatanPejabat}</p>
            </div>
          </div>
          
        </Kertas>
      </div>
    </div>
  );
}
