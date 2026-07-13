import React from 'react';

export default function PaklaringTemplate() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-12 shadow-lg text-black font-serif my-8 border border-gray-200">
      {/* KOP SURAT */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-8">
        <div className="flex-shrink-0">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center border-2 border-gray-400">
            <span className="text-gray-500 font-bold text-sm text-center">LOGO<br/>PERUSAHAAN</span>
          </div>
        </div>
        <div className="text-center flex-grow px-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">PT. MAJU BERSAMA SEJAHTERA</h1>
          <p className="text-sm mb-1">Jl. Jend. Sudirman Kav. 21, Gedung Perkantoran Lt. 15, Jakarta Selatan 12190</p>
          <p className="text-sm">Telp: (021) 555-0198 | Email: hrd@majubersama.co.id | Web: www.majubersama.co.id</p>
        </div>
      </div>

      {/* JUDUL SURAT */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold underline uppercase tracking-wide">Surat Keterangan Pengalaman Kerja</h2>
        <p className="text-sm mt-1">Nomor: 045/HRD-MBS/SKPK/VII/2026</p>
      </div>

      {/* ISI SURAT */}
      <div className="text-justify leading-relaxed mb-8">
        <p className="mb-4">
          Yang bertanda tangan di bawah ini:
        </p>
        <table className="w-full mb-6 ml-4">
          <tbody>
            <tr>
              <td className="w-48 py-1 align-top">Nama</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="font-semibold py-1">Budi Santoso, S.E., M.M.</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Jabatan</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">Direktur HRD</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Perusahaan</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">PT. Maju Bersama Sejahtera</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4">
          Dengan ini menerangkan dengan sesungguhnya bahwa:
        </p>

        <table className="w-full mb-8 ml-4">
          <tbody>
            <tr>
              <td className="w-48 py-1 align-top">Nama Lengkap</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="font-semibold py-1">Andi Pratama, S.Kom.</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Nomor Induk Karyawan</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">MBS-2021-089</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Jabatan Terakhir</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">Senior Software Engineer</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Departemen</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">Information Technology (IT)</td>
            </tr>
            <tr>
              <td className="w-48 py-1 align-top">Masa Kerja</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1">15 Januari 2021 s.d. 30 Juni 2026</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4 indent-8 text-justify">
          Bahwa yang bersangkutan benar-benar telah bekerja dan mengabdi pada perusahaan kami, PT. Maju Bersama Sejahtera, dalam kurun waktu sebagaimana yang telah disebutkan di atas. Selama masa kerjanya, Saudara Andi Pratama telah menunjukkan dedikasi, loyalitas, dan kinerja yang sangat baik serta tidak pernah terlibat dalam tindakan yang merugikan perusahaan maupun melanggar hukum atau peraturan tata tertib perusahaan.
        </p>
        
        <p className="mb-4 indent-8 text-justify">
          Yang bersangkutan mengakhiri masa tugasnya di perusahaan kami atas kemauan sendiri dengan cara yang baik (<em>resign</em> secara terhormat). Kami mengucapkan terima kasih yang sebesar-besarnya atas segala kontribusi dan tenaga yang telah diberikan kepada perusahaan selama ini.
        </p>

        <p className="mb-4 indent-8 text-justify">
          Demikian surat keterangan pengalaman kerja (Paklaring) ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh yang bersangkutan, baik untuk keperluan melamar pekerjaan baru, administrasi BPJS Ketenagakerjaan, maupun keperluan lainnya.
        </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="flex justify-end mt-16 pr-8">
        <div className="text-center">
          <p className="mb-1">Jakarta, 13 Juli 2026</p>
          <p className="font-semibold mb-24">PT. Maju Bersama Sejahtera</p>
          
          <div className="relative flex flex-col items-center">
            {/* Stamp Placeholder */}
            <div className="absolute -left-16 -top-10 w-28 h-28 border-[3px] border-blue-800 rounded-full flex items-center justify-center opacity-40 transform -rotate-12 pointer-events-none">
              <div className="border-[2px] border-blue-800 rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-blue-800 font-bold text-[11px] text-center leading-tight tracking-tighter">
                  PT. MAJU BERSAMA<br/>SEJAHTERA<br/>
                  <span className="text-[8px]">* HRD DEPT *</span>
                </span>
              </div>
            </div>
            
            <p className="font-bold underline text-lg">Budi Santoso, S.E., M.M.</p>
            <p className="text-sm">Direktur HRD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
