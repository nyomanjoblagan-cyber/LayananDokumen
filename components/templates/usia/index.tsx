'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Baby, Users, Building, ShieldAlert } from 'lucide-react';

export default function UsiaTemplate() {
  const [data, setData] = useState({
    // Instansi
    namaInstansi: 'PEMERINTAH DESA SUKAMAJU',
    alamatInstansi: 'Jl. Balai Desa No. 1, Kec. Karanganyar, Kab. Demak 59582',
    kontakInstansi: 'Telp: (0291) 123456 | Email: pemdes.sukamaju@demak.go.id',
    
    // Surat
    nomorSurat: '474.2/015/VII/2026',
    tanggalSurat: '13 Juli 2026',
    
    // Pejabat Pembuat
    namaPejabat: 'Budi Hartono, S.E.',
    jabatanPejabat: 'Kepala Desa Sukamaju',
    
    // Data Anak (Yang diterangkan)
    namaAnak: 'Bagas Aditya',
    tempatLahirAnak: 'Demak',
    tanggalLahirAnak: '15 Agustus 2012',
    jenisKelaminAnak: 'Laki-laki',
    agamaAnak: 'Islam',
    alamatAnak: 'Dusun Krajan RT 01 / RW 02, Desa Sukamaju, Kec. Karanganyar, Kab. Demak',
    
    // Data Orang Tua
    namaOrtu: 'Sutrisno',
    umurOrtu: '45 Tahun',
    pekerjaanOrtu: 'Wiraswasta',
    alamatOrtu: 'Dusun Krajan RT 01 / RW 02, Desa Sukamaju, Kec. Karanganyar, Kab. Demak',
    
    // Keperluan
    keperluan: 'Persyaratan Pendaftaran Sekolah Menengah Atas (SMA)',
    keteranganTambahan: 'Berdasarkan data kependudukan yang ada, nama tersebut di atas benar merupakan warga kami dan pada saat surat ini dikeluarkan masih berusia di bawah 17 Tahun (Belum Cukup Umur / Belum Memiliki KTP).',
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
          <Baby className="w-5 h-5 text-cyan-600" />
          Editor Keterangan Usia
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4" /> Instansi & Pejabat
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Instansi / Desa</label>
                <input type="text" name="namaInstansi" value={data.namaInstansi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Instansi</label>
                <textarea name="alamatInstansi" value={data.alamatInstansi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. Surat</label>
                  <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pejabat Pembuat</label>
                  <input type="text" name="namaPejabat" value={data.namaPejabat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                  <input type="text" name="jabatanPejabat" value={data.jabatanPejabat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-100 dark:border-cyan-800">
            <h3 className="font-semibold text-cyan-800 dark:text-cyan-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Baby className="w-4 h-4" /> Data Anak (Yang Diterangkan)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Nama Lengkap Anak</label>
                <input type="text" name="namaAnak" value={data.namaAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Tempat Lahir</label>
                  <input type="text" name="tempatLahirAnak" value={data.tempatLahirAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Tanggal Lahir</label>
                  <input type="text" name="tanggalLahirAnak" value={data.tanggalLahirAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Jenis Kelamin</label>
                  <select name="jenisKelaminAnak" value={data.jenisKelaminAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Agama</label>
                  <input type="text" name="agamaAnak" value={data.agamaAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">Alamat Anak</label>
                <textarea name="alamatAnak" value={data.alamatAnak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none text-sm"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" /> Data Orang Tua/Wali
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Orang Tua</label>
                <input type="text" name="namaOrtu" value={data.namaOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Umur</label>
                  <input type="text" name="umurOrtu" value={data.umurOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Pekerjaan</label>
                  <input type="text" name="pekerjaanOrtu" value={data.pekerjaanOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Orang Tua</label>
                <textarea name="alamatOrtu" value={data.alamatOrtu} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none text-sm"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Keperluan & Keterangan
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keperluan Pembuatan Surat</label>
                <input type="text" name="keperluan" value={data.keperluan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan Tambahan (Paragraf Penutup)</label>
                <textarea name="keteranganTambahan" value={data.keteranganTambahan} onChange={handleChange} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none leading-relaxed text-sm"></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: '"Times New Roman", Times, serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .sk-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11.5pt; }
              .sk-table td:nth-child(1) { width: 35%; }
              .sk-table td:nth-child(2) { width: 3%; }
              .sk-table td:nth-child(3) { width: 62%; font-weight: bold; }
              p { font-size: 11.5pt; margin-bottom: 8px; line-height: 1.5; text-align: justify; }
            `}} />

            {/* KOP SURAT DESA */}
            <div className="flex border-b-4 border-double border-black pb-4 mb-8">
              <div className="w-24 h-24 flex items-center justify-center">
                {/* Garuda/Pancasila Placeholder */}
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border border-black rotate-45"></div>
                </div>
              </div>
              <div className="flex-1 text-center pr-24">
                <h1 className="text-2xl font-bold uppercase tracking-wider">{data.namaInstansi}</h1>
                <p className="text-[11pt]">{data.alamatInstansi}</p>
                <p className="text-[10pt]">{data.kontakInstansi}</p>
              </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-10">
              <h2 className="text-lg font-bold uppercase underline tracking-widest" style={{ fontSize: '14pt' }}>Surat Keterangan Usia</h2>
              <p className="text-[11.5pt] mt-1">Nomor: {data.nomorSurat}</p>
            </div>

            {/* Pembuka */}
            <div className="mb-6">
              <p className="indent-8">
                Yang bertanda tangan di bawah ini, {data.jabatanPejabat}, dengan ini menerangkan bahwa:
              </p>
            </div>

            {/* Identitas Anak */}
            <div className="mb-6 pl-8">
              <table className="w-full sk-table">
                <tbody>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td>{data.namaAnak}</td>
                  </tr>
                  <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>{data.tempatLahirAnak}, {data.tanggalLahirAnak}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{data.jenisKelaminAnak}</td>
                  </tr>
                  <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>{data.agamaAnak}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td className="font-normal whitespace-pre-line">{data.alamatAnak}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Penghubung */}
            <div className="mb-6">
              <p className="indent-8">
                Adalah benar anak kandung dari orang tua/wali:
              </p>
            </div>

            {/* Identitas Ortu */}
            <div className="mb-6 pl-8">
              <table className="w-full sk-table">
                <tbody>
                  <tr>
                    <td>Nama Orang Tua/Wali</td>
                    <td>:</td>
                    <td>{data.namaOrtu}</td>
                  </tr>
                  <tr>
                    <td>Umur</td>
                    <td>:</td>
                    <td className="font-normal">{data.umurOrtu}</td>
                  </tr>
                  <tr>
                    <td>Pekerjaan</td>
                    <td>:</td>
                    <td className="font-normal">{data.pekerjaanOrtu}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td className="font-normal whitespace-pre-line">{data.alamatOrtu}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Keterangan & Penutup */}
            <div className="mb-12">
              <p className="indent-8">
                {data.keteranganTambahan}
              </p>
              <p className="indent-8">
                Adapun Surat Keterangan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagai kelengkapan syarat: <strong>{data.keperluan}</strong>.
              </p>
              <p className="indent-8">
                Demikian Surat Keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-end pr-8">
              <div className="w-64 text-center">
                <p className="mb-1">{data.tanggalSurat}</p>
                <p className="font-bold mb-24">{data.jabatanPejabat}</p>
                <div className="relative">
                  {/* Stamp Placeholder */}
                  <div className="absolute left-0 -top-16 w-24 h-24 border-2 border-purple-800 rounded-full flex flex-col items-center justify-center  transform -rotate-12 ">
                    <span className="text-[6px] font-bold uppercase tracking-widest">{data.namaInstansi}</span>
                    <span className="text-[6px] font-black my-1">PEMDES</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaPejabat}</p>
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
