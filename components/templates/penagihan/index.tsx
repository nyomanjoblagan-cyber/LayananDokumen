"use client";

import React, { useState } from 'react';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function PenagihanB2B() {
  const [formData, setFormData] = useState({
    // Header Surat
    nomorSurat: '045/LGL-COLL/VII/2026',
    tanggalSurat: '13 Juli 2026',
    lampiran: '1 (satu) Berkas - Rincian Transaksi',
    sifatSurat: 'PENTING DAN SEGERA',
    perihal: 'SOMASI I (PERTAMA) - PERINGATAN JATUH TEMPO PEMBAYARAN',
    
    // Data Perusahaan Pengirim
    namaPengirim: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
    alamatPengirim: 'Gedung Sudirman Tower Lt. 21, Jl. Jend. Sudirman Kav. 86, Jakarta Selatan 12920',
    teleponPengirim: '(021) 2988-1234',
    emailPengirim: 'legal.collection@kctn.co.id',
    websitePengirim: 'www.kctn.co.id',

    // Data Klien / Penerima
    namaKlien: 'PT. MAJU BERSAMA TECHNOLOGY',
    upKlien: 'Bpk. Budi Santoso - Direktur Utama',
    alamatKlien: 'Kawasan Industri Pulogadung, Jl. Rawa Bali II No. 5, Jakarta Timur 13920',
    
    // Rincian Tagihan & Kontrak
    nomorKontrak: 'PKS-012/KCTN-MBT/I/2026',
    tanggalKontrak: '10 Januari 2026',
    nomorInvoice: 'INV-2026-05-089',
    tanggalInvoice: '15 Mei 2026',
    jatuhTempo: '14 Juni 2026',
    nilaiPokok: 250000000,
    persentaseDenda: 0.2, // 0.2% per hari
    hariKeterlambatan: 29, 
    biayaAdmin: 1500000,
    
    // Rekening Pembayaran
    namaBank: 'Bank Mandiri (Persero) Tbk.',
    cabangBank: 'KCP Jakarta Sudirman',
    namaRekening: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
    nomorRekening: '122-00-9876543-2',
    
    // Pejabat Berwenang
    namaPejabat: 'Dr. Hendra Wijaya, S.H., M.H.',
    jabatanPejabat: 'Head of Legal & Collections',

    // Tembusan
    tembusan1: 'Direktur Keuangan PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
    tembusan2: 'Arsip'
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
      <style dangerouslySetInnerHTML={{ __html: `\n@media print {\n  @page { size: A4; margin: 15mm; } \n  body { background: white; margin: 0; padding: 0; width: 100%; }\n  .no-print { display: none !important; }\n  #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }\n  .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }\n  .break-before-auto { break-before: auto !important; page-break-before: auto !important; }\n  * { box-sizing: border-box !important; }\n}\n` }} />

      <div className="max-w-[210mm] mx-auto mb-8 no-print bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-900">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b-2 border-slate-200 pb-2">Form Editor Dokumen Legal & Somasi B2B</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800">1. Header Dokumen</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Nomor Surat</label>
                <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Tanggal Surat</label>
                <input type="text" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Sifat Dokumen</label>
                <select name="sifatSurat" value={formData.sifatSurat} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm">
                  <option value="BIASA">Biasa</option>
                  <option value="PENTING">Penting</option>
                  <option value="PENTING DAN SEGERA">Penting & Segera</option>
                  <option value="SANGAT RAHASIA">Sangat Rahasia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Perihal / Subjek</label>
                <select name="perihal" value={formData.perihal} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm">
                  <option value="SOMASI I (PERTAMA) - PERINGATAN JATUH TEMPO PEMBAYARAN">Somasi I</option>
                  <option value="SOMASI II (KEDUA) - PERINGATAN KERAS">Somasi II</option>
                  <option value="SOMASI III (TERAKHIR) - PEMBERITAHUAN LANGKAH HUKUM">Somasi III (Final)</option>
                  <option value="SURAT PENAGIHAN PEMBAYARAN (INVOICE OVERDUE)">Penagihan Biasa</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800">2. Data Termohon / Klien</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Nama Entitas Hukum</label>
              <input type="text" name="namaKlien" value={formData.namaKlien} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">U.P (Pihak Berkepentingan)</label>
              <input type="text" name="upKlien" value={formData.upKlien} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Domisili Hukum / Alamat</label>
              <textarea name="alamatKlien" value={formData.alamatKlien} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 p-2 border text-sm" rows={2}></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800">3. Dasar Hukum & Tagihan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">No. Kontrak/PKS</label>
                <input type="text" name="nomorKontrak" value={formData.nomorKontrak} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Tgl. Kontrak</label>
                <input type="text" name="tanggalKontrak" value={formData.tanggalKontrak} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">No. Invoice</label>
                <input type="text" name="nomorInvoice" value={formData.nomorInvoice} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Tgl. Jatuh Tempo</label>
                <input type="text" name="jatuhTempo" value={formData.jatuhTempo} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Nilai Pokok Kewajiban (Rp)</label>
              <input type="number" name="nilaiPokok" value={formData.nilaiPokok} onChange={handleNumberChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm font-mono font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Wanprestasi (Hari)</label>
                <input type="number" name="hariKeterlambatan" value={formData.hariKeterlambatan} onChange={handleNumberChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Denda Harian (%)</label>
                <input type="number" step="0.01" name="persentaseDenda" value={formData.persentaseDenda} onChange={handleNumberChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800">4. Instruksi Pembayaran</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Bank Tersandi</label>
              <input type="text" name="namaBank" value={formData.namaBank} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Atas Nama (Beneficiary)</label>
              <input type="text" name="namaRekening" value={formData.namaRekening} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Nomor Rekening</label>
              <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 p-2 border text-sm font-mono font-bold tracking-widest text-blue-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase">Biaya Legal / Administrasi (Rp)</label>
              <input type="number" name="biayaAdmin" value={formData.biayaAdmin} onChange={handleNumberChange} className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm p-2 border text-sm" />
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.print()} 
          className="w-full bg-slate-900 text-white py-3 rounded-sm font-bold tracking-widest hover:bg-slate-800 transition duration-200 mt-2 shadow-lg flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          CETAK DOKUMEN LEGAL
        </button>
      </div>

      <div id="print-only-root">
        <Kertas>
          {/* KOP SURAT FORMAL */}
          <div className="border-b-[3px] border-slate-900 pb-3 mb-1 flex items-center justify-between break-inside-avoid">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-wider mb-1 uppercase font-serif">{formData.namaPengirim}</h1>
              <p className="text-sm text-slate-800 font-medium">Head Office: {formData.alamatPengirim}</p>
              <p className="text-sm text-slate-800">Phone: {formData.teleponPengirim} | Email: {formData.emailPengirim} | Web: {formData.websitePengirim}</p>
            </div>
          </div>
          <div className="border-b-[1px] border-slate-900 mb-8 w-full h-px"></div>

          {/* HEADER SURAT - LEGAL FORMAT */}
          <div className="flex justify-between mb-8 break-inside-avoid text-sm">
            <div className="w-[65%]">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-28 pb-1 align-top">Nomor</td>
                    <td className="w-4 pb-1 align-top">:</td>
                    <td className="pb-1 font-semibold">{formData.nomorSurat}</td>
                  </tr>
                  <tr>
                    <td className="w-28 pb-1 align-top">Sifat</td>
                    <td className="w-4 pb-1 align-top">:</td>
                    <td className="pb-1 font-semibold">{formData.sifatSurat}</td>
                  </tr>
                  <tr>
                    <td className="w-28 pb-1 align-top">Lampiran</td>
                    <td className="w-4 pb-1 align-top">:</td>
                    <td className="pb-1">{formData.lampiran}</td>
                  </tr>
                  <tr>
                    <td className="w-28 pb-2 align-top">Perihal</td>
                    <td className="w-4 pb-2 align-top">:</td>
                    <td className="pb-2 font-bold underline tracking-wide uppercase">{formData.perihal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-[35%] text-right">
              <p>Jakarta, {formData.tanggalSurat}</p>
            </div>
          </div>

          {/* ALAMAT TUJUAN (TERMOHON) */}
          <div className="mb-8 break-inside-avoid text-sm">
            <p className="mb-1">Kepada Yth.,</p>
            <p className="font-bold text-base uppercase">{formData.namaKlien}</p>
            <p className="font-semibold mb-1">U.P: {formData.upKlien}</p>
            <p className="max-w-md leading-relaxed">{formData.alamatKlien}</p>
          </div>

          {/* ISI SURAT - LEGAL WORDING */}
          <div className="text-justify text-sm leading-relaxed mb-6">
            <p className="mb-4">Dengan hormat,</p>
            <p className="mb-3 indent-8">
              Merujuk pada Perjanjian Kerja Sama / Kontrak Nomor: <strong>{formData.nomorKontrak}</strong> tertanggal <strong>{formData.tanggalKontrak}</strong> (selanjutnya disebut sebagai <strong>"Perjanjian"</strong>) antara <strong>{formData.namaPengirim}</strong> dengan <strong>{formData.namaKlien}</strong>, dengan ini kami bertindak untuk dan atas nama <strong>{formData.namaPengirim}</strong> menyampaikan hal-hal sebagai berikut:
            </p>

            <ol className="list-decimal pl-5 mb-4 space-y-3">
              <li className="pl-2">
                Bahwa berdasarkan catatan administratif dan finansial kami, pihak <strong>{formData.namaKlien}</strong> masih memiliki kewajiban pembayaran yang belum diselesaikan atas tagihan Invoice Nomor: <strong>{formData.nomorInvoice}</strong> yang diterbitkan pada tanggal {formData.tanggalInvoice}.
              </li>
              <li className="pl-2">
                Bahwa batas akhir pembayaran (jatuh tempo) atas Invoice tersebut adalah tanggal <strong>{formData.jatuhTempo}</strong>. Dengan demikian, hingga surat ini diterbitkan, pihak Bapak/Ibu telah mengalami keterlambatan (wanprestasi) selama <strong>{formData.hariKeterlambatan} ({formData.hariKeterlambatan}) hari kalender</strong>.
              </li>
              <li className="pl-2">
                Bahwa sesuai dengan ketentuan denda keterlambatan yang diatur dalam Pasal penalti Perjanjian, setiap keterlambatan pembayaran akan dikenakan denda sebesar <strong>{formData.persentaseDenda}% per hari</strong> dari total nilai pokok tagihan.
              </li>
            </ol>

            <p className="mb-3">
              Oleh karena itu, rincian kewajiban finansial yang <strong>wajib segera dilunasi</strong> adalah sebagai berikut:
            </p>

            {/* TABEL PERHITUNGAN TOTAL - LEGAL */}
            <div className="px-6 mb-6 break-inside-avoid">
              <table className="w-full border-collapse border border-slate-900 text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-900 p-2 text-center w-12 font-bold">No.</th>
                    <th className="border border-slate-900 p-2 text-center font-bold">Uraian / Deskripsi Kewajiban</th>
                    <th className="border border-slate-900 p-2 text-center w-48 font-bold">Nominal (IDR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center">1</td>
                    <td className="border border-slate-900 p-2">Pokok Tagihan (Ref. {formData.nomorInvoice})</td>
                    <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(formData.nilaiPokok)}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center">2</td>
                    <td className="border border-slate-900 p-2">
                      Denda Wanprestasi ({formData.persentaseDenda}% x {formData.hariKeterlambatan} Hari)
                    </td>
                    <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(nilaiDenda)}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center">3</td>
                    <td className="border border-slate-900 p-2">Biaya Administrasi & Legal</td>
                    <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(formData.biayaAdmin)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100">
                    <td colSpan={2} className="border border-slate-900 p-2 text-right font-bold uppercase">
                      Total Kewajiban Terutang
                    </td>
                    <td className="border border-slate-900 p-2 text-right font-bold text-base underline decoration-double">
                      {formatRupiah(totalTagihan)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="mb-4 indent-8 font-semibold text-slate-900">
              Melalui Somasi ini, kami memberikan tenggat waktu selambat-lambatnya 3 (tiga) hari kalender sejak tanggal surat ini agar Bapak/Ibu segera melaksanakan kewajiban pembayaran secara penuh dan tunai (tanpa cicilan) ke rekening bank kami berikut:
            </p>

            <div className="ml-8 mb-4 border border-slate-900 p-3 bg-slate-50 break-inside-avoid max-w-lg">
              <table className="w-full text-sm font-semibold">
                <tbody>
                  <tr><td className="w-32 py-1">Nama Bank</td><td className="w-4">:</td><td>{formData.namaBank}</td></tr>
                  <tr><td className="py-1">Kantor Cabang</td><td>:</td><td>{formData.cabangBank}</td></tr>
                  <tr><td className="py-1">Atas Nama</td><td>:</td><td>{formData.namaRekening}</td></tr>
                  <tr><td className="py-1">Nomor Rekening</td><td>:</td><td className="text-lg tracking-widest">{formData.nomorRekening}</td></tr>
                </tbody>
              </table>
            </div>

            <p className="mb-3 indent-8 text-justify">
              Apabila sampai dengan batas waktu yang telah kami tetapkan di atas pihak {formData.namaKlien} gagal atau lalai dalam melaksanakan kewajiban pembayaran, maka <strong>kami berhak secara sepihak menghentikan seluruh layanan/fasilitas</strong>, dan kami mencadangkan hak kami untuk menempuh langkah-langkah hukum yang tegas, baik secara Perdata maupun Pidana, serta melaporkan rekam jejak perusahaan Bapak/Ibu kepada lembaga pemeringkat kredit dan otoritas terkait.
            </p>
            
            <p className="mb-6 indent-8 text-justify">
              Segala biaya tambahan yang timbul akibat upaya hukum penagihan ini (termasuk biaya pengacara/advokat, biaya pengadilan, dan biaya eksekusi) akan sepenuhnya dibebankan kepada pihak {formData.namaKlien}. Mohon kesadaran dan itikad baiknya untuk menyelesaikan persoalan ini secara profesional.
            </p>
            
            <p className="mb-8 text-justify">
              Demikian Somasi ini disampaikan untuk menjadi perhatian serius dan dilaksanakan sebagaimana mestinya. Atas perhatiannya, kami ucapkan terima kasih.
            </p>
          </div>

          {/* TANDA TANGAN & LEGAL CAP */}
          <div className="flex justify-between items-start break-inside-avoid mt-8">
            <div className="text-xs text-slate-600 mt-12 w-64">
              <p className="font-bold underline mb-1">Tembusan:</p>
              <ol className="list-decimal pl-4">
                <li>{formData.tembusan1}</li>
                <li>{formData.tembusan2}</li>
              </ol>
            </div>
            <div className="text-center w-72">
              <p className="text-sm mb-1">Hormat Kami,</p>
              <p className="text-sm font-bold uppercase mb-24">{formData.namaPengirim}</p>
              
              <div className="border-b border-slate-900 pb-1 mb-1 relative">
                {/* Stamp Placeholder Context */}
                <div className="absolute -top-12 -left-6 border-4 border-red-700/20 text-red-700/20 rounded-full w-24 h-24 flex items-center justify-center transform -rotate-12 pointer-events-none">
                  <span className="font-bold text-xs text-center leading-tight">LEGAL<br/>DEPT</span>
                </div>
                <p className="font-bold text-sm uppercase">{formData.namaPejabat}</p>
              </div>
              <p className="text-sm italic">{formData.jabatanPejabat}</p>
            </div>
          </div>
          
        </Kertas>
      </div>
    </div>
  );
}
