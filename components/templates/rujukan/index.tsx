import React, { forwardRef } from "react";

export interface RujukanData {
  kopSurat: {
    namaFaskes: string;
    alamat: string;
    kontak: string;
    email: string;
    logoUrl?: string;
  };
  nomorSurat: string;
  tanggalSurat: string;
  tujuanRujukan: {
    dokterSpesialis: string;
    namaRumahSakit: string;
  };
  identitasPasien: {
    nama: string;
    nik: string;
    nomorBpjs: string;
    tanggalLahir: string;
    umur: string;
    jenisKelamin: string;
    alamat: string;
    noHp: string;
  };
  pemeriksaan: {
    anamnesis: string;
    kesadaran: string;
    tekananDarah: string;
    nadi: string;
    suhu: string;
    pernapasan: string;
    pemeriksaanFisikLainnya: string;
  };
  diagnosisSementara: string;
  kodeIcd10?: string;
  terapiDiberikan: string;
  alasanRujukan: string;
  dokterPerujuk: {
    nama: string;
    sip: string;
  };
}

const defaultData: RujukanData = {
  kopSurat: {
    namaFaskes: "KLINIK PRATAMA SEHAT SELALU",
    alamat: "Jl. Kesehatan No. 123, Jakarta Selatan, 12345",
    kontak: "Telp: (021) 1234567 | WA: 081234567890",
    email: "info@kliniksehatselalu.com",
  },
  nomorSurat: "045/RUJ/KSS/VII/2026",
  tanggalSurat: "13 Juli 2026",
  tujuanRujukan: {
    dokterSpesialis: "Spesialis Penyakit Dalam",
    namaRumahSakit: "RSUD Harapan Maju",
  },
  identitasPasien: {
    nama: "Budi Santoso",
    nik: "3171234567890001",
    nomorBpjs: "0001234567890",
    tanggalLahir: "15 Agustus 1985",
    umur: "40 Tahun",
    jenisKelamin: "Laki-laki",
    alamat: "Jl. Melati No. 45, RT 02 RW 03, Kel. Mawar, Kec. Kebayoran",
    noHp: "085712345678",
  },
  pemeriksaan: {
    anamnesis: "Pasien datang mengeluhkan nyeri perut sebelah kanan bawah sejak 2 hari yang lalu, disertai mual dan muntah 3 kali sehari. Demam (+).",
    kesadaran: "Compos Mentis (E4V5M6)",
    tekananDarah: "130/80 mmHg",
    nadi: "98 x/menit",
    suhu: "38.5 °C",
    pernapasan: "22 x/menit",
    pemeriksaanFisikLainnya: "Nyeri tekan titik McBurney (+), Rovsing sign (+), Psoas sign (+). Bising usus menurun.",
  },
  diagnosisSementara: "Suspect Appendicitis Akut",
  kodeIcd10: "K35.8",
  terapiDiberikan: "1. IVFD RL 20 tpm\n2. Injeksi Ondansetron 4mg (IV)\n3. Paracetamol infus 1000mg",
  alasanRujukan: "Mohon penanganan lebih lanjut dan evaluasi untuk tindakan pembedahan cito.",
  dokterPerujuk: {
    nama: "dr. Andi Pratama",
    sip: "SIP. 445/1234/DINKES/2023",
  },
};

interface RujukanProps {
  data?: Partial<RujukanData>;
  isPrintMode?: boolean;
}

export const Rujukan = forwardRef<HTMLDivElement, RujukanProps>(
  ({ data: providedData, isPrintMode = false }, ref) => {
    const data = { ...defaultData, ...providedData };

    return (
      <div
        ref={ref}
        className={`bg-white text-black font-sans ${
          isPrintMode ? "p-0" : "p-8 max-w-4xl mx-auto shadow-lg my-8 border border-gray-200"
        }`}
        style={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        {/* KOP SURAT */}
        <div className="flex items-center border-b-4 border-black pb-4 mb-6">
          <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center border-2 border-gray-800 rounded-full bg-gray-100 overflow-hidden">
            {data.kopSurat.logoUrl ? (
              <img src={data.kopSurat.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-gray-500 font-serif">+</span>
            )}
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl font-bold uppercase tracking-wider text-green-800">
              {data.kopSurat.namaFaskes}
            </h1>
            <p className="text-sm mt-1 text-gray-800">{data.kopSurat.alamat}</p>
            <p className="text-sm text-gray-800">
              {data.kopSurat.kontak} | Email: {data.kopSurat.email}
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0">
            {/* Empty space for balance */}
          </div>
        </div>

        {/* JUDUL SURAT */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold underline uppercase tracking-widest">
            Surat Rujukan Medis
          </h2>
          <p className="text-sm font-medium mt-1">Nomor: {data.nomorSurat}</p>
        </div>

        {/* TUJUAN RUJUKAN */}
        <div className="mb-6 flex justify-between">
          <div className="w-2/3">
            <p className="mb-1">Kepada Yth.,</p>
            <p className="font-bold">TS. {data.tujuanRujukan.dokterSpesialis}</p>
            <p className="font-semibold">Di {data.tujuanRujukan.namaRumahSakit}</p>
          </div>
          <div className="w-1/3 text-right">
            <p>Jakarta, {data.tanggalSurat}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-justify mb-2">Dengan hormat,</p>
          <p className="text-justify mb-4">
            Mohon bantuan pemeriksaan dan penanganan lebih lanjut pada pasien di bawah ini:
          </p>
        </div>

        {/* IDENTITAS PASIEN */}
        <div className="mb-6">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1 w-1/4 font-semibold">Nama Pasien</td>
                <td className="py-1 w-4">:</td>
                <td className="py-1 font-bold">{data.identitasPasien.nama}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">No. NIK / KTP</td>
                <td className="py-1">:</td>
                <td className="py-1">{data.identitasPasien.nik}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">No. Kartu BPJS</td>
                <td className="py-1">:</td>
                <td className="py-1">{data.identitasPasien.nomorBpjs}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Tgl Lahir / Umur</td>
                <td className="py-1">:</td>
                <td className="py-1">
                  {data.identitasPasien.tanggalLahir} / {data.identitasPasien.umur}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Jenis Kelamin</td>
                <td className="py-1">:</td>
                <td className="py-1">{data.identitasPasien.jenisKelamin}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold align-top">Alamat</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{data.identitasPasien.alamat}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">No. Telepon / HP</td>
                <td className="py-1">:</td>
                <td className="py-1">{data.identitasPasien.noHp}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HASIL PEMERIKSAAN */}
        <div className="mb-6">
          <p className="font-bold border-b border-gray-400 mb-2 uppercase text-sm">
            I. Riwayat & Pemeriksaan
          </p>
          <table className="w-full text-sm mb-2">
            <tbody>
              <tr>
                <td className="py-1 w-1/4 font-semibold align-top">Anamnesis</td>
                <td className="py-1 w-4 align-top">:</td>
                <td className="py-1 align-top text-justify">{data.pemeriksaan.anamnesis}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold align-top">Kesadaran</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{data.pemeriksaan.kesadaran}</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-3 grid grid-cols-4 gap-2 text-center text-sm">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">TD</p>
              <p className="font-bold">{data.pemeriksaan.tekananDarah}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Nadi</p>
              <p className="font-bold">{data.pemeriksaan.nadi}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Suhu</p>
              <p className="font-bold">{data.pemeriksaan.suhu}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">RR</p>
              <p className="font-bold">{data.pemeriksaan.pernapasan}</p>
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1 w-1/4 font-semibold align-top">Pemeriksaan Fisik</td>
                <td className="py-1 w-4 align-top">:</td>
                <td className="py-1 align-top text-justify">
                  {data.pemeriksaan.pemeriksaanFisikLainnya}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DIAGNOSIS & TERAPI */}
        <div className="mb-6">
          <p className="font-bold border-b border-gray-400 mb-2 uppercase text-sm">
            II. Diagnosis & Terapi
          </p>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1 w-1/4 font-semibold align-top">Diagnosis Sementara</td>
                <td className="py-1 w-4 align-top">:</td>
                <td className="py-1 align-top font-bold text-red-700">
                  {data.diagnosisSementara}
                  {data.kodeIcd10 && (
                    <span className="ml-2 font-normal text-gray-600">
                      (ICD-10: {data.kodeIcd10})
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold align-top">Terapi/Tindakan</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top whitespace-pre-line text-justify">
                  {data.terapiDiberikan}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold align-top">Alasan Rujukan</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top font-medium italic text-justify">
                  {data.alasanRujukan}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <p className="text-justify text-sm">
            Demikian surat rujukan ini kami buat. Atas perhatian dan kerjasamanya, kami ucapkan
            terima kasih.
          </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end mt-8">
          <div className="text-center w-64">
            <p className="text-sm mb-16">Hormat Kami,</p>
            <p className="font-bold underline text-sm">{data.dokterPerujuk.nama}</p>
            <p className="text-xs mt-1 text-gray-700">{data.dokterPerujuk.sip}</p>
          </div>
        </div>

        {/* FOOTER CATATAN */}
        <div className="mt-12 pt-4 border-t-2 border-dashed border-gray-300">
          <p className="text-xs text-gray-500 italic">
            * Harap membawa berkas rujukan ini saat datang ke rumah sakit tujuan.
            <br />* Berlaku untuk 1 (satu) kali kunjungan.
          </p>
        </div>
      </div>
    );
  }
);

Rujukan.displayName = "Rujukan";

export default Rujukan;