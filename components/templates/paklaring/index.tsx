'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Building2, Stamp, Calendar, User, Briefcase } from 'lucide-react';

export default function PaklaringTemplate() {
  const [data, setData] = useState({
    namaPerusahaan: 'PT. MAJU BERSAMA SEJAHTERA',
    alamatPerusahaan: 'Jl. Jend. Sudirman Kav. 21, Gedung Perkantoran Lt. 15, Jakarta Selatan 12190',
    kontakPerusahaan: 'Telp: (021) 555-0198 | Email: hrd@majubersama.co.id',
    nomorSurat: '045/HRD-MBS/SKPK/VII/2026',
    
    // Pihak Perusahaan
    namaPimpinan: 'Budi Santoso, S.E., M.M.',
    jabatanPimpinan: 'Direktur HRD',
    
    // Pihak Karyawan
    namaKaryawan: 'Andi Pratama, S.Kom.',
    nikKaryawan: 'MBS-2021-089',
    jabatanTerakhir: 'Senior Software Engineer',
    departemen: 'Information Technology (IT)',
    masaKerjaMulai: '15 Januari 2021',
    masaKerjaAkhir: '30 Juni 2026',
    
    alasanBerhenti: 'mengundurkan diri atas kemauan sendiri dengan cara yang baik',
    penilaian: 'telah menunjukkan dedikasi, loyalitas, dan kinerja yang sangat baik serta tidak pernah terlibat dalam tindakan yang merugikan perusahaan maupun melanggar hukum',
    
    tempatTerbit: 'Jakarta',
    tanggalTerbit: '13 Juli 2026',
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
          <Building2 className="w-5 h-5 text-indigo-600" />
          Form Paklaring
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Perusahaan
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
                <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
                <textarea name="alamatPerusahaan" value={data.alamatPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Penandatangan (Pimpinan/HRD)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input type="text" name="namaPimpinan" value={data.namaPimpinan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                <input type="text" name="jabatanPimpinan" value={data.jabatanPimpinan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Data Karyawan (Eks)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Karyawan</label>
                <input type="text" name="namaKaryawan" value={data.namaKaryawan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIK</label>
                <input type="text" name="nikKaryawan" value={data.nikKaryawan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan Terakhir</label>
                <input type="text" name="jabatanTerakhir" value={data.jabatanTerakhir} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departemen</label>
                <input type="text" name="departemen" value={data.departemen} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mulai Kerja</label>
                  <input type="text" name="masaKerjaMulai" value={data.masaKerjaMulai} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akhir Kerja</label>
                  <input type="text" name="masaKerjaAkhir" value={data.masaKerjaAkhir} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Stamp className="w-4 h-4" /> Keterangan Khusus
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Penilaian Kinerja</label>
                <textarea name="penilaian" value={data.penilaian} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none leading-relaxed"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alasan Berhenti</label>
                <textarea name="alasanBerhenti" value={data.alasanBerhenti} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black p-[25mm] shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: '"Times New Roman", Times, serif', fontSize: '11pt', lineHeight: '1.5' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 25mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .keterangan-table td { padding: 4px 8px 4px 0; vertical-align: top; }
            `}} />

            {/* KOP SURAT */}
            <div className="flex items-center border-b-4 border-black pb-4 mb-8">
              <div className="w-24 h-24 bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-center text-gray-500 font-bold text-xs">
                LOGO<br/>PERUSAHAAN
              </div>
              <div className="flex-1 text-center px-4">
                <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.namaPerusahaan}</h1>
                <p className="text-sm mb-1">{data.alamatPerusahaan}</p>
                <p className="text-sm">{data.kontakPerusahaan}</p>
              </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-10">
              <h2 className="text-xl font-bold uppercase tracking-wide border-b border-black inline-block pb-1">Surat Keterangan Pengalaman Kerja</h2>
              <p className="mt-2 text-sm uppercase">Nomor: {data.nomorSurat}</p>
            </div>

            {/* ISI */}
            <div className="text-justify mb-8">
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              <table className="w-full mb-6 ml-6 keterangan-table">
                <tbody>
                  <tr>
                    <td style={{ width: '30%' }}>Nama</td>
                    <td style={{ width: '2%' }}>:</td>
                    <td className="font-bold">{data.namaPimpinan}</td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>:</td>
                    <td>{data.jabatanPimpinan}</td>
                  </tr>
                  <tr>
                    <td>Perusahaan</td>
                    <td>:</td>
                    <td>{data.namaPerusahaan}</td>
                  </tr>
                </tbody>
              </table>

              <p className="mb-4">Dengan ini menerangkan dengan sesungguhnya bahwa:</p>
              <table className="w-full mb-8 ml-6 keterangan-table">
                <tbody>
                  <tr>
                    <td style={{ width: '30%' }}>Nama Lengkap</td>
                    <td style={{ width: '2%' }}>:</td>
                    <td className="font-bold">{data.namaKaryawan}</td>
                  </tr>
                  <tr>
                    <td>Nomor Induk Karyawan</td>
                    <td>:</td>
                    <td>{data.nikKaryawan}</td>
                  </tr>
                  <tr>
                    <td>Jabatan Terakhir</td>
                    <td>:</td>
                    <td>{data.jabatanTerakhir}</td>
                  </tr>
                  <tr>
                    <td>Departemen</td>
                    <td>:</td>
                    <td>{data.departemen}</td>
                  </tr>
                  <tr>
                    <td>Masa Kerja</td>
                    <td>:</td>
                    <td>{data.masaKerjaMulai} s.d. {data.masaKerjaAkhir}</td>
                  </tr>
                </tbody>
              </table>

              <p className="mb-4 indent-8">
                Bahwa yang bersangkutan benar-benar telah bekerja dan mengabdi pada perusahaan kami, <strong>{data.namaPerusahaan}</strong>, dalam kurun waktu sebagaimana yang telah disebutkan di atas. Selama masa kerjanya, Saudara/i <strong>{data.namaKaryawan}</strong> {data.penilaian}.
              </p>
              
              <p className="mb-4 indent-8">
                Yang bersangkutan mengakhiri masa tugasnya di perusahaan kami dengan alasan {data.alasanBerhenti}. Kami mengucapkan terima kasih yang sebesar-besarnya atas segala kontribusi dan tenaga yang telah diberikan kepada perusahaan selama ini dan mendoakan kesuksesan di masa yang akan datang.
              </p>

              <p className="indent-8">
                Demikian Surat Keterangan Pengalaman Kerja (<em>Certificate of Employment</em>) ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh yang bersangkutan.
              </p>
            </div>

            {/* TTD */}
            <div className="flex justify-end mt-16 pr-8">
              <div className="text-center w-64">
                <p className="mb-1">{data.tempatTerbit}, {data.tanggalTerbit}</p>
                <p className="font-bold mb-24">{data.namaPerusahaan}</p>
                
                <div className="relative">
                  {/* Stamp */}
                  <div className="absolute -left-12 -top-16 w-32 h-32 border-4 border-blue-800 rounded-full flex items-center justify-center opacity-40 transform -rotate-12 pointer-events-none">
                    <div className="border-2 border-blue-800 rounded-full w-28 h-28 flex items-center justify-center p-2 text-center">
                      <span className="text-blue-800 font-bold text-xs uppercase">
                        {data.namaPerusahaan}
                        <br/><span className="text-[9px]">* HRD DEPARTMENT *</span>
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-bold underline text-lg">{data.namaPimpinan}</p>
                  <p>{data.jabatanPimpinan}</p>
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
