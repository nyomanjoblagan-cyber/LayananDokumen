'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Scale, Handshake } from 'lucide-react';

const INITIAL_DATA = {
  tanggalSurat: '18 November 2026',
  kotaSurat: 'Surabaya',
  
  // Tujuan Kepolisian
  tujuanSurat: 'Kepala Kepolisian Resor Kota Besar Surabaya (Kapolrestabes Surabaya)',
  unitPenyidik: 'Cq. Kasat Reskrim / Unit Tipidum Satreskrim Polrestabes Surabaya',
  alamatPolisi: 'Jl. Sikatan No. 1, Krembangan Selatan, Krembangan, Kota Surabaya, Jawa Timur',

  // Rujukan Laporan Polisi (LP)
  nomorLp: 'LP/B/542/VIII/2026/SPKT/POLRESTABES SURABAYA',
  tanggalLp: '15 Agustus 2026',
  perkaraLp: 'Dugaan Tindak Pidana Penipuan dan/atau Penggelapan (Pasal 378 dan/atau 372 KUHP)',

  // Identitas Pelapor (Pemohon Pencabutan)
  namaPelapor: 'HENDRA WIJAYA, S.E.',
  nikPelapor: '3578011205840005',
  umurPelapor: '42 Tahun',
  pekerjaanPelapor: 'Wiraswasta',
  alamatPelapor: 'Jl. Manyar Kertoarjo No. 28, RT 02/RW 07, Mulyorejo, Surabaya',
  noHpPelapor: '081122334455',

  // Identitas Terlapor
  namaTerlapor: 'DENNY KURNIAWAN',
  nikTerlapor: '3578041908860002',
  umurTerlapor: '40 Tahun',
  pekerjaanTerlapor: 'Karyawan Swasta',
  alamatTerlapor: 'Jl. Rungkut Asri Timur No. 15, Rungkut, Surabaya',

  // Alasan / Dasar Perdamaian (Restorative Justice)
  tanggalPerdamaian: '10 November 2026',
  alasanCabut: 'Bahwa antara Pihak Pelapor dan Pihak Terlapor telah bersepakat menyelesaikan permasalahan tersebut secara kekeluargaan (musyawarah untuk mufakat). Pihak Terlapor telah menunjukkan itikad baik dengan mengembalikan kerugian sepenuhnya dan memohon maaf secara tulus. Pihak Pelapor telah memaafkan sepenuhnya dan berjanji tidak akan menuntut kembali di kemudian hari baik secara pidana maupun perdata.',
  dasarHukum: 'Peraturan Kepolisian Negara Republik Indonesia Nomor 8 Tahun 2021 tentang Penanganan Tindak Pidana Berdasarkan Keadilan Restoratif (Restorative Justice).',

  // Saksi Perdamaian
  namaSaksi1: 'BAGUS SETIAWAN, S.H.',
  keteranganSaksi1: 'Kuasa Hukum / Saksi Pelapor',
  namaSaksi2: 'AGUS SANTOSO',
  keteranganSaksi2: 'Saksi Keluarga Terlapor',
};

export default function CabutLaporanTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset isian formulir pencabutan laporan polisi?')) {
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
      {/* TANGGAL & TUJUAN */}
      <div className="flex justify-between items-start mb-6 text-xs md:text-sm">
        <div>
          <p>Hal : <strong>Permohonan Pencabutan Laporan Polisi & Penghentian Penyelidikan/Penyidikan</strong></p>
          <p>Sifat : Penting / Restorative Justice</p>
          <p>Lamp : 1 (satu) Berkas Surat Kesepakatan Perdamaian</p>
        </div>
        <div className="text-right">
          <p>{data.kotaSurat}, {data.tanggalSurat}</p>
        </div>
      </div>

      <div className="mb-6 text-xs md:text-sm">
        <p>Kepada Yth,</p>
        <p><strong>{data.tujuanSurat}</strong></p>
        <p>{data.unitPenyidik}</p>
        <p>{data.alamatPolisi}</p>
        <p>Di Tempat</p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPelapor || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPelapor || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Umur / Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.umurPelapor} / {data.pekerjaanPelapor}</td></tr>
            <tr><td className="w-40 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.alamatPelapor || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Nomor Telepon/HP</td><td className="w-3 align-top">:</td><td>{data.noHpPelapor || '..............................'}</td></tr>
          </tbody>
        </table>

        <p>
          Dalam hal ini bertindak selaku <strong>PELAPOR</strong> atas Laporan Polisi sebagai berikut:
        </p>

        <table className="w-full ml-4 bg-slate-50 p-2 border border-slate-200">
          <tbody>
            <tr><td className="w-40 align-top">Nomor Laporan Polisi</td><td className="w-3 align-top">:</td><td><strong className="font-mono">{data.nomorLp || '..........'}</strong></td></tr>
            <tr><td className="w-40 align-top">Tertanggal</td><td className="w-3 align-top">:</td><td>{data.tanggalLp || '..........'}</td></tr>
            <tr><td className="w-40 align-top">Perkara / Dugaan TP</td><td className="w-3 align-top">:</td><td>{data.perkaraLp || '..........'}</td></tr>
            <tr><td className="w-40 align-top">Nama Terlapor</td><td className="w-3 align-top">:</td><td><strong>{data.namaTerlapor}</strong> (NIK: {data.nikTerlapor})</td></tr>
            <tr><td className="w-40 align-top">Alamat Terlapor</td><td className="w-3 align-top">:</td><td>{data.alamatTerlapor}</td></tr>
          </tbody>
        </table>

        <p>
          Melalui surat ini, dengan penuh kesadaran dan tanpa paksaan maupun tekanan dari pihak manapun, saya mengajukan <strong>PERMOHONAN PENCABUTAN LAPORAN POLISI</strong> tersebut di atas dengan alasan dan pertimbangan sebagai berikut:
        </p>

        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>Penyelesaian Perdamaian Kekeluargaan:</strong> Bahwa pada tanggal <strong>{data.tanggalPerdamaian}</strong>, antara saya selaku Pelapor dan Sdr. <strong>{data.namaTerlapor}</strong> selaku Terlapor telah mencapai kesepakatan damai secara musyawarah kekeluargaan sebagaimana tertuang dalam Surat Perjanjian Perdamaian terlampir.
          </li>
          <li>
            <strong>Pemulihan Kerugian:</strong> Pihak Terlapor telah beriktikad baik meminta permohonan maaf dan telah menyelesaikan kewajiban/kerugian yang timbul sehubungan dengan peristiwa tersebut secara tuntas.
          </li>
          <li>
            <strong>Pencabutan Hak Menuntut:</strong> Saya selaku Pelapor menyatakan telah memaafkan Terlapor dan mencabut seluruh keterangan, laporan, serta tuntutan hukum saya. Saya berjanji tidak akan menuntut kembali di kemudian hari baik di tingkat penyidikan, penuntutan, maupun peradilan.
          </li>
          <li>
            <strong>Penerapan Keadilan Restoratif:</strong> Memohon kiranya Bapak Kapolres / Penyidik berkenan menyelesaikan dan menghentikan perkara ini berdasarkan prinsip <em>Restorative Justice</em> sesuai {data.dasarHukum}.
          </li>
        </ol>

        <p>
          Demikian Surat Permohonan Pencabutan Laporan Polisi ini saya buat dan tandatangani di atas meterai yang cukup, dengan sebenar-benarnya tanpa ada paksaan, bujuk rayu, atau intimidasi dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-8 text-xs md:text-sm">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p>Mengetahui & Menyetujui,</p>
            <p className="font-semibold text-slate-800">PIHAK TERLAPOR</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[9px] text-slate-300">Tanda Tangan</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaTerlapor || '..................................'}</p>
            <p className="text-[11px] text-slate-600">Terlapor</p>
          </div>

          <div>
            <p>{data.kotaSurat}, {data.tanggalSurat}</p>
            <p className="font-semibold text-slate-800">YANG MEMOHON / PELAPOR</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[9px] text-slate-400 border border-dashed border-slate-300 px-3 py-1">
                Meterai Tempel Rp 10.000
              </span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPelapor || '..................................'}</p>
            <p className="text-[11px] text-slate-600">Pelapor / Korban</p>
          </div>
        </div>

        {/* SAKSI PERDAMAIAN */}
        <div className="mt-8 pt-4 border-t border-slate-300">
          <p className="text-center font-bold text-xs uppercase mb-4">SAKSI-SAKSI PERDAMAIAN:</p>
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
                <Scale className="w-4 h-4 text-amber-400" />
                <h1 className="text-xs md:text-sm font-bold tracking-tight text-white line-clamp-1">
                  Surat Pencabutan Laporan Polisi (Restorative Justice)
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
                className="bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-amber-900/30 transition"
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
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Pencabutan LP / Restorative Justice
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Format resmi sesuai Perpol No. 8/2021 untuk penghentian perkara pidana (SP3) setelah perdamaian kedua pihak.
              </p>
            </div>

            {/* SEKSI POLRES/POLSEK */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                1. Kantor Polisi Tujuan & Rujukan LP
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Kota Surat</label>
                  <input
                    type="text"
                    value={data.kotaSurat}
                    onChange={(e) => handleChange('kotaSurat', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="Surabaya"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input
                    type="text"
                    value={data.tanggalSurat}
                    onChange={(e) => handleChange('tanggalSurat', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Instansi Kepolisian Tujuan</label>
                <input
                  type="text"
                  value={data.tujuanSurat}
                  onChange={(e) => handleChange('tujuanSurat', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Kapolrestabes Surabaya / Kapolsek ..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Unit Penyidik / Cq.</label>
                <input
                  type="text"
                  value={data.unitPenyidik}
                  onChange={(e) => handleChange('unitPenyidik', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Cq. Kasat Reskrim..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Kantor Polisi</label>
                <input
                  type="text"
                  value={data.alamatPolisi}
                  onChange={(e) => handleChange('alamatPolisi', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Jl. Sikatan No. 1..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nomor Laporan Polisi (LP)</label>
                  <input
                    type="text"
                    value={data.nomorLp}
                    onChange={(e) => handleChange('nomorLp', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 font-mono font-bold"
                    placeholder="LP/B/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal LP</label>
                  <input
                    type="text"
                    value={data.tanggalLp}
                    onChange={(e) => handleChange('tanggalLp', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="15 Agustus 2026"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Perkara / Kasus yang Dilaporkan</label>
                <input
                  type="text"
                  value={data.perkaraLp}
                  onChange={(e) => handleChange('perkaraLp', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="Penipuan / Penggelapan / dsb"
                />
              </div>
            </div>

            {/* SEKSI DATA PELAPOR & TERLAPOR */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-blue-600" />
                2. Data Pelapor & Terlapor
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap Pelapor (Korban)</label>
                <input
                  type="text"
                  value={data.namaPelapor}
                  onChange={(e) => handleChange('namaPelapor', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="HENDRA WIJAYA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">NIK Pelapor</label>
                  <input
                    type="text"
                    value={data.nikPelapor}
                    onChange={(e) => handleChange('nikPelapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">No. HP Pelapor</label>
                  <input
                    type="text"
                    value={data.noHpPelapor}
                    onChange={(e) => handleChange('noHpPelapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Umur Pelapor</label>
                  <input
                    type="text"
                    value={data.umurPelapor}
                    onChange={(e) => handleChange('umurPelapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Pekerjaan Pelapor</label>
                  <input
                    type="text"
                    value={data.pekerjaanPelapor}
                    onChange={(e) => handleChange('pekerjaanPelapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Pelapor</label>
                <input
                  type="text"
                  value={data.alamatPelapor}
                  onChange={(e) => handleChange('alamatPelapor', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>

              {/* Data Terlapor */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap Terlapor</label>
                  <input
                    type="text"
                    value={data.namaTerlapor}
                    onChange={(e) => handleChange('namaTerlapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                    placeholder="DENNY KURNIAWAN"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">NIK Terlapor</label>
                    <input
                      type="text"
                      value={data.nikTerlapor}
                      onChange={(e) => handleChange('nikTerlapor', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Umur Terlapor</label>
                    <input
                      type="text"
                      value={data.umurTerlapor}
                      onChange={(e) => handleChange('umurTerlapor', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Terlapor</label>
                  <input
                    type="text"
                    value={data.alamatTerlapor}
                    onChange={(e) => handleChange('alamatTerlapor', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* SEKSI PERDAMAIAN & SAKSI */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Handshake className="w-3.5 h-3.5 text-emerald-600" />
                3. Kesepakatan Damai & Saksi
              </h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Tercapai Kesepakatan Damai</label>
                <input
                  type="text"
                  value={data.tanggalPerdamaian}
                  onChange={(e) => handleChange('tanggalPerdamaian', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                  placeholder="10 November 2026"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Uraian Alasan Perdamaian</label>
                <textarea
                  rows={3}
                  value={data.alasanCabut}
                  onChange={(e) => handleChange('alasanCabut', e.target.value)}
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
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
                    placeholder="Status / Hubungan"
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
                    placeholder="Status / Hubungan"
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
              <PrintWrapper documentName={`PencabutanLP_${data.namaPelapor.replace(/\s+/g, '_')}`} price={15000} />
            </div>
          </div>
        </main>
      </div>
  );
}
