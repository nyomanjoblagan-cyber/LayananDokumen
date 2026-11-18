'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Heart, Baby, Users } from 'lucide-react';

const INITIAL_DATA = {
  tanggalSurat: '18 November 2026',
  kotaSurat: 'Bandung',

  // Dasar Perceraian (Opsional / Resmi)
  dasarPerceraian: 'Akta Cerai No. 1245/AC/2026/PA.Bdg dari Pengadilan Agama Bandung',

  // Pihak Pertama (Ayah)
  namaPihak1: 'ARIF BUDIMAN, S.T.',
  nikPihak1: '3273011406850004',
  tempatTglLahirPihak1: 'Bandung, 14 Juni 1985',
  agamaPihak1: 'Islam',
  pekerjaanPihak1: 'Karyawan Swasta (IT Specialist)',
  alamatPihak1: 'Jl. Dago Asri No. 18, RT 03/RW 08, Dago, Coblong, Kota Bandung',
  noHpPihak1: '081223344556',

  // Pihak Kedua (Ibu)
  namaPihak2: 'RATNA SARI DEWI, S.Pd.',
  nikPihak2: '3273055209880007',
  tempatTglLahirPihak2: 'Bandung, 22 September 1988',
  agamaPihak2: 'Islam',
  pekerjaanPihak2: 'Guru / Tenaga Pendidik',
  alamatPihak2: 'Jl. Buah Batu Raya No. 105, RT 01/RW 04, Lengkong, Kota Bandung',
  noHpPihak2: '081399887766',

  // Data Anak
  namaAnak1: 'KENZIE ALVARO BUDIMAN',
  ttlAnak1: 'Bandung, 12 Mei 2018',
  usiaAnak1: '8 Tahun',
  namaAnak2: 'ALISHA NAURA BUDIMAN',
  ttlAnak2: 'Bandung, 08 Agustus 2021',
  usiaAnak2: '5 Tahun',

  // Kesepakatan Hak Asuh & Tempat Tinggal
  pemegangHakAsuh: 'Pihak Kedua (Ibu Kandung)',
  domisiliTinggal: 'Kediaman Pihak Kedua di Bandung',
  aturanAkses: 'Pihak Pertama (Ayah) memiliki hak penuh dan tidak terbatas untuk berkomunikasi setiap saat, serta menjemput, mendampingi, dan menginapkan anak setiap akhir pekan (weekend) serta membagi masa libur sekolah secara bergiliran tanpa ada halangan dari Pihak Kedua.',

  // Kesepakatan Nafkah Anak
  nominalNafkahBulanan: 'Rp 5.000.000,- (Lima Juta Rupiah)',
  tanggalTransfer: 'Maksimal tanggal 5 setiap bulannya',
  rekeningTujuan: 'Bank BCA No. Rekening 1234567890 a.n Ratna Sari Dewi',
  biayaPendidikanKesehatan: 'Biaya pendaftaran sekolah, SPP bulanan, buku/seragam, serta biaya pengobatan/asuransi kesehatan anak di luar BPJS ditanggung sepenuhnya oleh Pihak Pertama (Ayah).',
  evaluasiTahunan: 'Nominal nafkah anak disesuaikan naik minimal 10% setiap tahunnya mengikuti inflasi dan jenjang pendidikan anak.',

  // Saksi
  namaSaksi1: 'H. DEDI KURNIAWAN',
  keteranganSaksi1: 'Wakil Keluarga Pihak Pertama',
  namaSaksi2: 'HJ. ERLINAWATI',
  keteranganSaksi2: 'Wakil Keluarga Pihak Kedua',
};

export default function HakAsuhAnakTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset isian perjanjian hak asuh anak ke setelan awal?')) {
      setData(INITIAL_DATA);
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6 border-b-2 border-black pb-3">
        <h1 className="text-base md:text-lg font-bold tracking-wider uppercase font-sans">
          SURAT KESEPAKATAN BERSAMA HAK ASUH ANAK & NAFKAH
        </h1>
        <p className="text-xs md:text-sm font-semibold tracking-wide font-sans text-slate-800">
          PASCA PERCERAIAN KELUARGA
        </p>
        <p className="text-[10px] text-slate-500 font-sans mt-0.5">
          Dasar Hukum: UU No. 1 Tahun 1974 jo. UU No. 16 Tahun 2019 tentang Perkawinan & Kompilasi Hukum Islam (KHI)
        </p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>
          Pada hari ini, <strong>{data.tanggalSurat}</strong>, bertempat di <strong>{data.kotaSurat}</strong>, kami yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK 1 */}
        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPihak1 || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPihak1 || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Tempat, Tgl Lahir</td><td className="w-3 align-top">:</td><td>{data.tempatTglLahirPihak1}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pekerjaanPihak1}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.alamatPihak1}</td></tr>
            <tr><td className="w-36 align-top">Nomor Telepon/HP</td><td className="w-3 align-top">:</td><td>{data.noHpPihak1}</td></tr>
          </tbody>
        </table>
        <p className="ml-4 text-xs font-semibold text-slate-800">
          Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Ayah Kandung)</strong>.
        </p>

        {/* PIHAK 2 */}
        <table className="w-full ml-4 mt-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPihak2 || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPihak2 || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Tempat, Tgl Lahir</td><td className="w-3 align-top">:</td><td>{data.tempatTglLahirPihak2}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pekerjaanPihak2}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.alamatPihak2}</td></tr>
            <tr><td className="w-36 align-top">Nomor Telepon/HP</td><td className="w-3 align-top">:</td><td>{data.noHpPihak2}</td></tr>
          </tbody>
        </table>
        <p className="ml-4 text-xs font-semibold text-slate-800">
          Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Ibu Kandung)</strong>.
        </p>

        <p>
          Bahwa Pihak Pertama dan Pihak Kedua sebelumnya terikat perkawinan sah yang telah diputus bercerai berdasarkan <strong>{data.dasarPerceraian}</strong>. Dalam rangka menjamin kepentingan terbaik bagi tumbuh kembang anak (<em>the best interest of the child</em>), kedua belah pihak sepakat mengikatkan diri dalam perjanjian pengasuhan dan pembiayaan anak dengan ketentuan sebagai berikut:
        </p>

        {/* DATA ANAK */}
        <div className="bg-slate-50 p-2.5 border border-slate-200 ml-4">
          <p className="font-bold text-xs uppercase mb-1">Identitas Anak Kandung:</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li><strong>{data.namaAnak1}</strong>, Tempat/Tgl Lahir: {data.ttlAnak1} (Usia ± {data.usiaAnak1}).</li>
            {data.namaAnak2 && (
              <li><strong>{data.namaAnak2}</strong>, Tempat/Tgl Lahir: {data.ttlAnak2} (Usia ± {data.usiaAnak2}).</li>
            )}
          </ol>
        </div>

        {/* PASAL-PASAL */}
        <div className="space-y-2 mt-2">
          <p><strong>PASAL 1: HAK ASUH & DOMISILI TINGGAL ANAK</strong></p>
          <p className="ml-4">
            1. Hak asuh, pemeliharaan, dan pengasuhan sehari-hari (<em>hadhanah</em>) atas anak-anak tersebut di atas diserahkan dan diamanahkan kepada <strong>{data.pemegangHakAsuh}</strong>, dengan domisili utama di <strong>{data.domisiliTinggal}</strong>.
          </p>
          <p className="ml-4">
            2. Pemegang hak asuh wajib merawat, mendidik budi pekerti, dan menjaga kesehatan anak sebaik-baiknya tanpa membatasi kasih sayang dari orang tua lainnya.
          </p>

          <p><strong>PASAL 2: HAK AKSES & KUNJUNGAN</strong></p>
          <p className="ml-4">
            {data.aturanAkses} Kedua belah pihak berjanji untuk saling mendukung dan dilarang keras melakukan doktrinasi negatif / menjelekkan (<em>parental alienation</em>) pihak lain di hadapan anak.
          </p>

          <p><strong>PASAL 3: NAFKAH BULANAN ANAK</strong></p>
          <p className="ml-4">
            1. Pihak Pertama (Ayah) berkewajiban memberikan biaya nafkah pokok harian anak sebesar <strong>{data.nominalNafkahBulanan}</strong> setiap bulannya.
          </p>
          <p className="ml-4">
            2. Pembayaran ditransfer langsung ke {data.rekeningTujuan}, {data.tanggalTransfer}.
          </p>
          <p className="ml-4">
            3. {data.evaluasiTahunan}
          </p>

          <p><strong>PASAL 4: BIAYA PENDIDIKAN & KESEHATAN</strong></p>
          <p className="ml-4">
            {data.biayaPendidikanKesehatan} Apabila timbul pengeluaran darurat medis, kedua belah pihak wajib saling mengabari seketika.
          </p>

          <p><strong>PASAL 5: KEPUTUSAN PENTING & PENYELESAIAN SENGKETA</strong></p>
          <p className="ml-4">
            Segala keputusan strategis mengenai masa depan anak (pindah domisili luar kota/negeri, pemilihan jenjang sekolah lanjutan) wajib dibicarakan dan disetujui bersama oleh kedua belah pihak. Apabila di kemudian hari timbul perselisihan, kedua belah pihak mengutamakan jalan musyawarah kekeluargaan demi stabilitas mental anak.
          </p>
        </div>

        <p>
          Surat Kesepakatan Bersama ini dibuat rangkap 2 (dua) asli bermeterai cukup dan memiliki kekuatan hukum yang sah dan mengikat bagi kedua belah pihak.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-8 text-xs md:text-sm">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p>{data.kotaSurat}, {data.tanggalSurat}</p>
            <p className="font-semibold text-slate-800">PIHAK KEDUA (IBU KANDUNG)</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[9px] text-slate-400 border border-dashed border-slate-300 px-3 py-1">
                Meterai Tempel Rp 10.000
              </span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPihak2 || '..................................'}</p>
            <p className="text-[11px] text-slate-600">Pemegang Hak Asuh</p>
          </div>

          <div>
            <p>{data.kotaSurat}, {data.tanggalSurat}</p>
            <p className="font-semibold text-slate-800">PIHAK PERTAMA (AYAH KANDUNG)</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[9px] text-slate-400 border border-dashed border-slate-300 px-3 py-1">
                Meterai Tempel Rp 10.000
              </span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPihak1 || '..................................'}</p>
            <p className="text-[11px] text-slate-600">Pemberi Nafkah</p>
          </div>
        </div>

        {/* SAKSI KELUARGA */}
        <div className="mt-8 pt-4 border-t border-slate-300">
          <p className="text-center font-bold text-xs uppercase mb-4">SAKSI-SAKSI PIHAK KELUARGA:</p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[11px] text-slate-600">{data.keteranganSaksi1}</p>
              <div className="h-10"></div>
              <p className="font-semibold underline">{data.namaSaksi1 || '...................................'}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-600">{data.keteranganSaksi2}</p>
              <div className="h-10"></div>
              <p className="font-semibold underline">{data.namaSaksi2 || '...................................'}</p>
            </div>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* TOP NAVBAR */}
        <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 px-4 py-3 shadow-md print:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs md:text-sm font-medium">
                <ArrowLeftCircle className="w-5 h-5 text-indigo-400" />
                <span>Dashboard</span>
              </Link>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <h1 className="text-xs md:text-sm font-bold tracking-tight text-white line-clamp-1">
                  Surat Kesepakatan Hak Asuh Anak & Nafkah
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetForm}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded flex items-center gap-1 transition"
                title="Reset Form"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-rose-900/30 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE VIEW TOGGLE */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2 flex justify-center gap-2 sticky top-[49px] z-40 print:hidden">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition ${
              mobileView === 'editor'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Form Input Data</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition ${
              mobileView === 'preview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pratinjau Dokumen</span>
          </button>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <main className="flex-1 flex max-w-[1600px] w-full mx-auto overflow-hidden print:hidden">
          {/* SIDEBAR FORM */}
          <aside
            className={`w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-53px)] overflow-y-auto p-4 md:p-6 space-y-5 ${
              mobileView === 'editor' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                Kesepakatan Hak Asuh & Nafkah Anak
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mengikat secara perdata untuk menjamin hak nafkah, hak temu anak, serta perlindungan hukum bagi kedua orang tua.
              </p>
            </div>

            {/* SEKSI DATA ORANG TUA */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-blue-600" />
                1. Identitas Kedua Orang Tua
              </h3>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Dasar Putusan / Akta Perceraian</label>
                <input
                  type="text"
                  value={data.dasarPerceraian}
                  onChange={(e) => handleChange('dasarPerceraian', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Akta Cerai No..."
                />
              </div>

              {/* Ayah */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap Ayah (Pihak Pertama)</label>
                  <input
                    type="text"
                    value={data.namaPihak1}
                    onChange={(e) => handleChange('namaPihak1', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="ARIF BUDIMAN"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">NIK Ayah</label>
                    <input
                      type="text"
                      value={data.nikPihak1}
                      onChange={(e) => handleChange('nikPihak1', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">No. HP Ayah</label>
                    <input
                      type="text"
                      value={data.noHpPihak1}
                      onChange={(e) => handleChange('noHpPihak1', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Domisili Ayah</label>
                  <input
                    type="text"
                    value={data.alamatPihak1}
                    onChange={(e) => handleChange('alamatPihak1', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              {/* Ibu */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap Ibu (Pihak Kedua)</label>
                  <input
                    type="text"
                    value={data.namaPihak2}
                    onChange={(e) => handleChange('namaPihak2', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="RATNA SARI DEWI"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">NIK Ibu</label>
                    <input
                      type="text"
                      value={data.nikPihak2}
                      onChange={(e) => handleChange('nikPihak2', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">No. HP Ibu</label>
                    <input
                      type="text"
                      value={data.noHpPihak2}
                      onChange={(e) => handleChange('noHpPihak2', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Domisili Ibu</label>
                  <input
                    type="text"
                    value={data.alamatPihak2}
                    onChange={(e) => handleChange('alamatPihak2', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* SEKSI DATA ANAK */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Baby className="w-3.5 h-3.5 text-pink-500" />
                2. Data Anak-Anak
              </h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Anak Pertama</label>
                  <input
                    type="text"
                    value={data.namaAnak1}
                    onChange={(e) => handleChange('namaAnak1', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Nama Anak 1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Tempat, Tgl Lahir Anak 1</label>
                    <input
                      type="text"
                      value={data.ttlAnak1}
                      onChange={(e) => handleChange('ttlAnak1', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Usia Anak 1</label>
                    <input
                      type="text"
                      value={data.usiaAnak1}
                      onChange={(e) => handleChange('usiaAnak1', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Anak Kedua (Opsional)</label>
                  <input
                    type="text"
                    value={data.namaAnak2}
                    onChange={(e) => handleChange('namaAnak2', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Nama Anak 2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Tempat, Tgl Lahir Anak 2</label>
                    <input
                      type="text"
                      value={data.ttlAnak2}
                      onChange={(e) => handleChange('ttlAnak2', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Usia Anak 2</label>
                    <input
                      type="text"
                      value={data.usiaAnak2}
                      onChange={(e) => handleChange('usiaAnak2', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEKSI HAK ASUH & NAFKAH */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                3. Ketentuan Pengasuhan & Nafkah
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Pemegang Hak Asuh (Hadhanah)</label>
                <input
                  type="text"
                  value={data.pemegangHakAsuh}
                  onChange={(e) => handleChange('pemegangHakAsuh', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 font-semibold"
                  placeholder="Pihak Kedua (Ibu Kandung)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Domisili Tempat Tinggal Anak</label>
                <input
                  type="text"
                  value={data.domisiliTinggal}
                  onChange={(e) => handleChange('domisiliTinggal', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Kediaman Ibu di Bandung"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Aturan Akses & Kunjungan Orang Tua</label>
                <textarea
                  rows={2}
                  value={data.aturanAkses}
                  onChange={(e) => handleChange('aturanAkses', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nominal Nafkah Bulanan</label>
                  <input
                    type="text"
                    value={data.nominalNafkahBulanan}
                    onChange={(e) => handleChange('nominalNafkahBulanan', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 font-bold"
                    placeholder="Rp 5.000.000,-"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Jatuh Tempo Transfer</label>
                  <input
                    type="text"
                    value={data.tanggalTransfer}
                    onChange={(e) => handleChange('tanggalTransfer', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Tgl 5 setiap bulan"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Rekening Tujuan Transfer</label>
                <input
                  type="text"
                  value={data.rekeningTujuan}
                  onChange={(e) => handleChange('rekeningTujuan', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Bank BCA 1234567890 a.n..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Biaya Pendidikan & Kesehatan</label>
                <textarea
                  rows={2}
                  value={data.biayaPendidikanKesehatan}
                  onChange={(e) => handleChange('biayaPendidikanKesehatan', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>
            </div>

            {/* SEKSI SAKSI */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                4. Saksi Perwakilan Keluarga
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Saksi 1</label>
                  <input
                    type="text"
                    value={data.namaSaksi1}
                    onChange={(e) => handleChange('namaSaksi1', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300 mb-1"
                    placeholder="Nama Saksi 1"
                  />
                  <input
                    type="text"
                    value={data.keteranganSaksi1}
                    onChange={(e) => handleChange('keteranganSaksi1', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300"
                    placeholder="Keluarga Ayah"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Saksi 2</label>
                  <input
                    type="text"
                    value={data.namaSaksi2}
                    onChange={(e) => handleChange('namaSaksi2', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300 mb-1"
                    placeholder="Nama Saksi 2"
                  />
                  <input
                    type="text"
                    value={data.keteranganSaksi2}
                    onChange={(e) => handleChange('keteranganSaksi2', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300"
                    placeholder="Keluarga Ibu"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* PREVIEW CONTAINER */}
          <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
            <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
            </div>

            <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`HakAsuh_${data.namaPihak1.replace(/\s+/g, '_')}`} price={15000} />
            </div>
          </div>
        </main>
      </div>
  );
}
