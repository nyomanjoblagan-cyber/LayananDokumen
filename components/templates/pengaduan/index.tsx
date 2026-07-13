import React from 'react';

export interface PengaduanTemplateProps {
  tempat?: string;
  tanggal?: string;
  perihal?: string;
  lampiran?: string;
  tujuanInstansi?: string;
  tujuanAlamat?: string;
  
  pengaduNama?: string;
  pengaduNik?: string;
  pengaduPekerjaan?: string;
  pengaduAlamat?: string;
  pengaduTelp?: string;
  pengaduEmail?: string;

  teraduNama?: string;
  teraduAlamat?: string;

  kronologi?: string;
  tuntutan?: string;
}

const PengaduanTemplate: React.FC<PengaduanTemplateProps> = ({
  tempat = 'Jakarta',
  tanggal = '15 Agustus 2024',
  perihal = 'Pengaduan Pelanggaran Hak Konsumen',
  lampiran = '1 (satu) Berkas',
  tujuanInstansi = 'Ketua Badan Penyelesaian Sengketa Konsumen (BPSK)',
  tujuanAlamat = 'Jl. Kebon Sirih No. 12, Jakarta Pusat',
  
  pengaduNama = 'Ahmad Fulan',
  pengaduNik = '3171234567890123',
  pengaduPekerjaan = 'Karyawan Swasta',
  pengaduAlamat = 'Jl. Merdeka Raya No. 45, Jakarta Selatan',
  pengaduTelp = '0812-3456-7890',
  pengaduEmail = 'ahmad.fulan@email.com',

  teraduNama = 'PT Belanja Cerdas Indonesia',
  teraduAlamat = 'Gedung Niaga Lt. 4, Jl. Sudirman Kav. 21, Jakarta',

  kronologi = '1. Pada tanggal 1 Agustus 2024, saya melakukan pembelian barang berupa 1 unit Laptop melalui platform yang dikelola oleh Pihak Teradu.\n2. Pembayaran telah saya lakukan lunas sebesar Rp15.000.000,- (Lima Belas Juta Rupiah) pada hari yang sama.\n3. Namun hingga surat ini dibuat, barang yang dijanjikan belum juga saya terima.\n4. Saya telah berupaya menghubungi layanan pelanggan (customer service) dari Pihak Teradu berulang kali, tetapi tidak mendapatkan tanggapan maupun solusi yang memadai.',
  tuntutan = '1. Meminta pihak teradu segera mengembalikan seluruh dana (refund) sebesar Rp15.000.000,- (Lima Belas Juta Rupiah).\n2. Meminta permohonan maaf secara tertulis dari pihak teradu atas kelalaian pelayanan.',
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-md text-black font-serif text-sm leading-relaxed" id="document-preview">
      {/* Date and Location */}
      <div className="flex justify-end mb-6">
        <p className="text-gray-800">{tempat}, {tanggal}</p>
      </div>

      {/* Header Info */}
      <div className="mb-6">
        <table className="w-full text-left text-gray-800 border-collapse">
          <tbody>
            <tr>
              <td className="w-24 align-top py-1">Nomor</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">-</td>
            </tr>
            <tr>
              <td className="w-24 align-top py-1">Lampiran</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{lampiran}</td>
            </tr>
            <tr>
              <td className="w-24 align-top py-1">Perihal</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1 font-bold underline">{perihal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Addressee */}
      <div className="mb-8 text-gray-800">
        <p className="mb-1">Kepada Yth.,</p>
        <p className="font-bold">{tujuanInstansi}</p>
        <p>di -</p>
        <p className="pl-4">{tujuanAlamat}</p>
      </div>

      {/* Opening */}
      <div className="mb-4 text-gray-800">
        <p>Dengan hormat,</p>
        <p className="mt-2 text-justify">
          Yang bertanda tangan di bawah ini, saya selaku pihak pengadu:
        </p>
      </div>

      {/* Complainant Identity */}
      <div className="mb-6 pl-4 md:pl-8">
        <table className="w-full text-left text-gray-800 border-collapse">
          <tbody>
            <tr>
              <td className="w-48 align-top py-1">Nama Lengkap</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1 font-semibold">{pengaduNama}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">Nomor Induk Kependudukan</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{pengaduNik}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">Pekerjaan</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{pengaduPekerjaan}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">Alamat Lengkap</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{pengaduAlamat}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">No. Telepon / HP</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{pengaduTelp}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">Email</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{pengaduEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4 text-justify text-gray-800">
        <p>
          Melalui surat ini bermaksud menyampaikan pengaduan / keluhan resmi atas dugaan pelanggaran hukum dan/atau tindakan yang merugikan, yang dilakukan oleh:
        </p>
      </div>

      {/* Reported Party Identity */}
      <div className="mb-6 pl-4 md:pl-8">
        <table className="w-full text-left text-gray-800 border-collapse">
          <tbody>
            <tr>
              <td className="w-48 align-top py-1">Nama Perusahaan / Pihak</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1 font-bold">{teraduNama}</td>
            </tr>
            <tr>
              <td className="w-48 align-top py-1">Alamat Pihak Teradu</td>
              <td className="w-4 align-top py-1">:</td>
              <td className="py-1">{teraduAlamat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chronology */}
      <div className="mb-6 text-justify text-gray-800">
        <p className="font-bold mb-2 text-base">A. KRONOLOGI KEJADIAN</p>
        <div className="whitespace-pre-wrap pl-4">
          {kronologi}
        </div>
      </div>

      {/* Demands */}
      <div className="mb-8 text-justify text-gray-800">
        <p className="font-bold mb-2 text-base">B. TUNTUTAN / HARAPAN PENYELESAIAN</p>
        <p className="mb-2">Berdasarkan uraian kronologi kejadian tersebut di atas, maka saya meminta kepada pihak teradu dan/atau instansi yang berwenang untuk memproses dan menindaklanjuti hal-hal sebagai berikut:</p>
        <div className="whitespace-pre-wrap pl-4">
          {tuntutan}
        </div>
      </div>

      {/* Closing */}
      <div className="mb-12 text-justify text-gray-800">
        <p>
          Demikian surat pengaduan ini saya perbuat dengan sebenarnya, dalam keadaan sadar, serta tanpa ada paksaan maupun tekanan dari pihak mana pun. Saya bersedia mempertanggungjawabkan kebenaran seluruh informasi yang termuat di dalam surat pengaduan ini sesuai dengan peraturan perundang-undangan yang berlaku.
        </p>
        <p className="mt-2">
          Atas perhatian, bantuan, dan tindak lanjut dari Bapak/Ibu, saya sampaikan terima kasih.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end text-gray-800">
        <div className="text-center w-64">
          <p className="mb-20">Hormat saya, Pengadu,</p>
          <div className="relative inline-block w-full">
            <p className="font-bold underline uppercase">{pengaduNama}</p>
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 border border-gray-400 p-1 bg-gray-50 opacity-80 w-20 h-10 flex items-center justify-center text-[10px] text-gray-500 rounded">
              Materai<br/>10.000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengaduanTemplate;