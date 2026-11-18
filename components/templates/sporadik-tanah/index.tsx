'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, MapPin, Users } from 'lucide-react';

const INITIAL_DATA = {
  tanggalSurat: '18 November 2026',
  desaSurat: 'Sukamaju',
  kecamatanSurat: 'Cibubur',
  kabupatenSurat: 'Bogor',
  nomorRegisterDesa: '593.2 / 142 / DS / XI / 2026',

  // 1. Data Pemohon / Pemilik Fisik
  namaPemohon: 'H. AHMAD FAUZI',
  nikPemohon: '3201011508750003',
  tempatTglLahir: 'Bogor, 15 Agustus 1975',
  agama: 'Islam',
  pekerjaan: 'Wiraswasta',
  alamatPemohon: 'Kp. Cicadas RT 003 / RW 005, Desa Sukamaju, Kec. Cibubur, Kab. Bogor',
  noHpPemohon: '081298765432',

  // 2. Data Fisik Tanah
  letakTanah: 'Jalan Raya Cicadas Kavling Melati No. 12',
  rtRwTanah: 'RT 003 / RW 005',
  desaTanah: 'Sukamaju',
  kecamatanTanah: 'Cibubur',
  kabupatenTanah: 'Bogor',
  luasTanah: '450',
  penggunaanTanah: 'Bangunan Rumah Tinggal & Pekarangan',
  nopPbb: '32.01.050.003.012-0450.0',

  // Batas-Batas Bidang Tanah
  batasUtara: 'Tanah / Rumah milik Bpk. Suparman',
  batasTimur: 'Jalan Lingkungan (Lebar 4 Meter)',
  batasSelatan: 'Tanah milik Ibu Hj. Siti Aminah',
  batasBarat: 'Saluran Pembuangan Air / Selokan Desa',

  // 3. Riwayat / Asal Usul Tanah
  tahunPerolehan: '2005',
  asalUsul: 'Jual beli dari Alm. Bpk. Sastro Martono secara tertulis',
  uraianRiwayat: 'Bidang tanah tersebut dikuasai dan diusahakan secara fisik secara terus-menerus dengan iktikad baik, tidak pernah ditinggalkan, dan tidak pernah dialihkan/dijual kepada pihak ketiga manapun hingga saat ini.',

  // 4. Saksi Batas / Lingkungan
  namaSaksi1: 'SUPARMAN',
  nikSaksi1: '3201011204680002',
  keteranganSaksi1: 'Tetangga Batas Utara',

  namaSaksi2: 'HJ. SITI AMINAH',
  nikSaksi2: '3201015609720004',
  keteranganSaksi2: 'Tetangga Batas Selatan',

  // Pejabat Desa
  namaKades: 'Drs. H. MURSID',
  nipKades: 'Kepala Desa Sukamaju',
};

export default function SporadikTanahTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset isian formulir Sporadik ke setelan awal?')) {
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
      {/* JUDUL SURAT */}
      <div className="text-center mb-6 border-b-2 border-black pb-3">
        <h1 className="text-base md:text-lg font-bold tracking-wider uppercase font-sans">
          SURAT PERNYATAAN PENGUASAAN FISIK BIDANG TANAH
        </h1>
        <p className="text-xs md:text-sm font-semibold tracking-wide font-sans text-slate-800">
          (SPORADIK)
        </p>
        <p className="text-[10px] text-slate-500 font-sans mt-0.5">
          Sesuai Ketentuan Peraturan Pemerintah No. 24 Tahun 1997 tentang Pendaftaran Tanah
        </p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Saya yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-44 align-top">1. Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPemohon || '..............................'}</strong></td></tr>
            <tr><td className="w-44 align-top">2. NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPemohon || '..............................'}</td></tr>
            <tr><td className="w-44 align-top">3. Tempat, Tgl Lahir</td><td className="w-3 align-top">:</td><td>{data.tempatTglLahir || '..............................'}</td></tr>
            <tr><td className="w-44 align-top">4. Agama / Kewarganegaraan</td><td className="w-3 align-top">:</td><td>{data.agama} / WNI</td></tr>
            <tr><td className="w-44 align-top">5. Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pekerjaan || '..............................'}</td></tr>
            <tr><td className="w-44 align-top">6. Alamat Domisili KTP</td><td className="w-3 align-top">:</td><td>{data.alamatPemohon || '..............................'}</td></tr>
            <tr><td className="w-44 align-top">7. No. Telepon / HP</td><td className="w-3 align-top">:</td><td>{data.noHpPemohon || '..............................'}</td></tr>
          </tbody>
        </table>

        <p>
          Dengan ini menyatakan dengan sebenarnya dan beriktikad baik bahwa saya hingga saat ini menguasai secara fisik sebidang tanah yang terletak di:
        </p>

        <table className="w-full ml-4 bg-slate-50 p-2 border border-slate-200">
          <tbody>
            <tr><td className="w-44 align-top">Jalan / Dusun / Blok</td><td className="w-3 align-top">:</td><td><strong>{data.letakTanah}</strong> ({data.rtRwTanah})</td></tr>
            <tr><td className="w-44 align-top">Desa / Kelurahan</td><td className="w-3 align-top">:</td><td>{data.desaTanah}</td></tr>
            <tr><td className="w-44 align-top">Kecamatan</td><td className="w-3 align-top">:</td><td>{data.kecamatanTanah}</td></tr>
            <tr><td className="w-44 align-top">Kabupaten / Kota</td><td className="w-3 align-top">:</td><td>{data.kabupatenTanah}</td></tr>
            <tr><td className="w-44 align-top">Luas Bidang Tanah</td><td className="w-3 align-top">:</td><td><strong>± {data.luasTanah} m²</strong></td></tr>
            <tr><td className="w-44 align-top">Dipergunakan Untuk</td><td className="w-3 align-top">:</td><td>{data.penggunaanTanah}</td></tr>
            <tr><td className="w-44 align-top">Nomor Objek Pajak (NOP PBB)</td><td className="w-3 align-top">:</td><td>{data.nopPbb || '-'}</td></tr>
          </tbody>
        </table>

        <p>Dengan batas-batas bidang tanah yang jelas sebagai berikut:</p>
        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">• Sebelah Utara</td><td className="w-3 align-top">:</td><td>{data.batasUtara}</td></tr>
            <tr><td className="w-32 align-top">• Sebelah Timur</td><td className="w-3 align-top">:</td><td>{data.batasTimur}</td></tr>
            <tr><td className="w-32 align-top">• Sebelah Selatan</td><td className="w-3 align-top">:</td><td>{data.batasSelatan}</td></tr>
            <tr><td className="w-32 align-top">• Sebelah Barat</td><td className="w-3 align-top">:</td><td>{data.batasBarat}</td></tr>
          </tbody>
        </table>

        <p><strong>Riwayat Perolehan Tanah:</strong></p>
        <p>
          Bidang tanah tersebut diperoleh sejak tahun <strong>{data.tahunPerolehan}</strong> dari <strong>{data.asalUsul}</strong>. {data.uraianRiwayat}
        </p>

        <p>Selanjutnya saya menyatakan dengan sungguh-sungguh bahwa:</p>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Tanah tersebut di atas tidak menjadi objek sengketa, baik kepemilikan maupun batas-batasnya dengan pihak tetangga manapun.</li>
          <li>Tanah tersebut tidak sedang dijadikan jaminan utang piutang kepada pihak perbankan maupun perseorangan, dan tidak dalam status sita jaminan oleh Pengadilan.</li>
          <li>Pernyataan ini dibuat sebagai kelengkapan permohonan pendaftaran hak atas tanah pertama kali / penerbitan Sertipikat Hak Milik (SHM) pada Kantor Pertanahan (BPN).</li>
          <li>
            Surat pernyataan ini saya buat dengan sebenarnya dengan penuh tanggung jawab. Apabila di kemudian hari pernyataan ini terbukti tidak benar atau mengandung keterangan palsu, saya bersedia dituntut di muka pengadilan sesuai ketentuan hukum pidana (Pasal 263 dan 266 KUHP) serta perdata, dan segala hak yang terbit atas dasar surat ini gugur demi hukum.
          </li>
        </ol>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-8 text-xs md:text-sm">
        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-2">
            <p className="font-bold mb-2">Saksi-Saksi Batas / Lingkungan:</p>
            <div className="space-y-6">
              <div>
                <p>1. {data.namaSaksi1 || '..........................'} ({data.keteranganSaksi1})</p>
                <p className="text-[10px] text-slate-500">NIK: {data.nikSaksi1 || '..........................'}</p>
                <div className="h-10"></div>
                <p>( ..................................................... )</p>
              </div>
              <div>
                <p>2. {data.namaSaksi2 || '..........................'} ({data.keteranganSaksi2})</p>
                <p className="text-[10px] text-slate-500">NIK: {data.nikSaksi2 || '..........................'}</p>
                <div className="h-10"></div>
                <p>( ..................................................... )</p>
              </div>
            </div>
          </div>

          <div className="w-1/2 pl-6 text-center">
            <p>{data.desaSurat}, {data.tanggalSurat}</p>
            <p className="font-semibold">Yang Membuat Pernyataan,</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[9px] text-slate-400 border border-dashed border-slate-300 px-3 py-1">
                Meterai Tempel Rp 10.000
              </span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPemohon || '..................................'}</p>
            <p className="text-[11px] text-slate-600">Pemohon / Penguasai Fisik</p>
          </div>
        </div>

        {/* PENGESAHAN KEPALA DESA / LURAH */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-center">
          <p className="font-bold uppercase">MENGETAHUI / MENGESAHKAN:</p>
          <p className="text-[11px] text-slate-600">Nomor Registrasi Desa/Kelurahan: {data.nomorRegisterDesa || '........................................'}</p>
          <div className="mt-2">
            <p className="font-semibold">{data.nipKades}</p>
            <div className="h-14"></div>
            <p className="font-bold underline">{data.namaKades || '............................................'}</p>
            <p className="text-[11px] text-slate-600">Tanda Tangan & Cap Stempel Resmi</p>
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
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h1 className="text-xs md:text-sm font-bold tracking-tight text-white line-clamp-1">
                  Surat Penguasaan Fisik Tanah (Sporadik BPN)
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
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition"
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
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Format Sporadik Penguasaan Tanah BPN
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Dokumen mutlak untuk pendaftaran tanah pertama kali, konversi girik/letter C ke Sertipikat Hak Milik (SHM).
              </p>
            </div>

            {/* SEKSI IDENTITAS PEMOHON */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-blue-600" />
                1. Data Pemohon / Penguasai Tanah
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap (Sesuai KTP)</label>
                <input
                  type="text"
                  value={data.namaPemohon}
                  onChange={(e) => handleChange('namaPemohon', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="H. AHMAD FAUZI"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">NIK / No. KTP</label>
                  <input
                    type="text"
                    value={data.nikPemohon}
                    onChange={(e) => handleChange('nikPemohon', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="3201011508750003"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input
                    type="text"
                    value={data.pekerjaan}
                    onChange={(e) => handleChange('pekerjaan', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Wiraswasta"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Tempat, Tgl Lahir</label>
                  <input
                    type="text"
                    value={data.tempatTglLahir}
                    onChange={(e) => handleChange('tempatTglLahir', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Bogor, 15 Agustus 1975"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nomor HP / WhatsApp</label>
                  <input
                    type="text"
                    value={data.noHpPemohon}
                    onChange={(e) => handleChange('noHpPemohon', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="081298765432"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Domisili KTP</label>
                <textarea
                  rows={2}
                  value={data.alamatPemohon}
                  onChange={(e) => handleChange('alamatPemohon', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Kp. Cicadas RT 003 / RW 005, Desa Sukamaju, Kec. Cibubur, Kab. Bogor"
                />
              </div>
            </div>

            {/* SEKSI SPESIFIKASI FISIK TANAH */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                2. Letak & Ukuran Bidang Tanah
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Jalan / Dusun / Kavling</label>
                <input
                  type="text"
                  value={data.letakTanah}
                  onChange={(e) => handleChange('letakTanah', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Jalan Raya Cicadas Kavling Melati No. 12"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">RT / RW</label>
                  <input
                    type="text"
                    value={data.rtRwTanah}
                    onChange={(e) => handleChange('rtRwTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="RT 003 / RW 005"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Luas Tanah (m²)</label>
                  <input
                    type="text"
                    value={data.luasTanah}
                    onChange={(e) => handleChange('luasTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 font-bold"
                    placeholder="450"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                  <input
                    type="text"
                    value={data.desaTanah}
                    onChange={(e) => handleChange('desaTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Kecamatan</label>
                  <input
                    type="text"
                    value={data.kecamatanTanah}
                    onChange={(e) => handleChange('kecamatanTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                  <input
                    type="text"
                    value={data.kabupatenTanah}
                    onChange={(e) => handleChange('kabupatenTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Dipergunakan Untuk</label>
                  <input
                    type="text"
                    value={data.penggunaanTanah}
                    onChange={(e) => handleChange('penggunaanTanah', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Bangunan Rumah / Kebun"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">NOP PBB</label>
                  <input
                    type="text"
                    value={data.nopPbb}
                    onChange={(e) => handleChange('nopPbb', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="32.01.050..."
                  />
                </div>
              </div>
            </div>

            {/* SEKSI BATAS-BATAS */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                3. Batas-Batas Bidang Tanah
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Batas Sebelah Utara</label>
                <input
                  type="text"
                  value={data.batasUtara}
                  onChange={(e) => handleChange('batasUtara', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Tanah milik..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Batas Sebelah Timur</label>
                <input
                  type="text"
                  value={data.batasTimur}
                  onChange={(e) => handleChange('batasTimur', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Jalan lingkungan..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Batas Sebelah Selatan</label>
                <input
                  type="text"
                  value={data.batasSelatan}
                  onChange={(e) => handleChange('batasSelatan', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Tanah milik..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Batas Sebelah Barat</label>
                <input
                  type="text"
                  value={data.batasBarat}
                  onChange={(e) => handleChange('batasBarat', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Saluran air / Jalan..."
                />
              </div>
            </div>

            {/* SEKSI RIWAYAT & SAKSI */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                4. Riwayat & Saksi Perbatasan
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Tahun Perolehan</label>
                  <input
                    type="text"
                    value={data.tahunPerolehan}
                    onChange={(e) => handleChange('tahunPerolehan', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="2005"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Asal Usul Perolehan</label>
                  <input
                    type="text"
                    value={data.asalUsul}
                    onChange={(e) => handleChange('asalUsul', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Jual Beli / Hibah / Warisan"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Uraian Riwayat Fisik</label>
                <textarea
                  rows={2}
                  value={data.uraianRiwayat}
                  onChange={(e) => handleChange('uraianRiwayat', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Saksi 1 (Nama & NIK)</label>
                  <input
                    type="text"
                    value={data.namaSaksi1}
                    onChange={(e) => handleChange('namaSaksi1', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300 mb-1"
                    placeholder="Nama Saksi 1"
                  />
                  <input
                    type="text"
                    value={data.nikSaksi1}
                    onChange={(e) => handleChange('nikSaksi1', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300"
                    placeholder="NIK Saksi 1"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Saksi 2 (Nama & NIK)</label>
                  <input
                    type="text"
                    value={data.namaSaksi2}
                    onChange={(e) => handleChange('namaSaksi2', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300 mb-1"
                    placeholder="Nama Saksi 2"
                  />
                  <input
                    type="text"
                    value={data.nikSaksi2}
                    onChange={(e) => handleChange('nikSaksi2', e.target.value)}
                    className="w-full text-xs p-1.5 rounded border border-slate-300"
                    placeholder="NIK Saksi 2"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Kepala Desa / Lurah Pengesah</label>
                <input
                  type="text"
                  value={data.namaKades}
                  onChange={(e) => handleChange('namaKades', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300 mb-1"
                  placeholder="Nama Kepala Desa / Lurah"
                />
                <input
                  type="text"
                  value={data.nomorRegisterDesa}
                  onChange={(e) => handleChange('nomorRegisterDesa', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Nomor Register Desa / Kelurahan"
                />
              </div>
            </div>
          </aside>

          {/* PREVIEW CONTAINER */}
          <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
            <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
            </div>

            <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Sporadik_${data.namaPemohon.replace(/\s+/g, '_')}`} price={15000} />
            </div>
          </div>
        </main>
      </div>
  );
}
