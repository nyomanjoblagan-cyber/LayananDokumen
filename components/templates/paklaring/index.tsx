"use client";

import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PaklaringData {
  kopSurat: {
    namaPerusahaan: string;
    alamat: string;
    kontak: string;
  };
  nomorSurat: string;
  tanggalSurat: string;
  karyawan: {
    nama: string;
    nik: string;
    jabatanTerakhir: string;
    tanggalMulai: string;
    tanggalSelesai: string;
  };
  evaluasiKinerja: "Sangat Baik" | "Baik" | "Cukup";
  penandatangan: {
    nama: string;
    jabatan: string;
  };
}

const DEFAULT_DATA: PaklaringData = {
  kopSurat: {
    namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    kontak: "Telp: (021) 1234567 | Email: info@majumundur.com",
  },
  nomorSurat: "123/HRD-MMS/VIII/2026",
  tanggalSurat: new Date().toISOString().split("T")[0],
  karyawan: {
    nama: "Budi Santoso",
    nik: "1234567890",
    jabatanTerakhir: "Senior Software Engineer",
    tanggalMulai: "2020-01-01",
    tanggalSelesai: "2026-07-01",
  },
  evaluasiKinerja: "Sangat Baik",
  penandatangan: {
    nama: "Joko Anwar",
    jabatan: "HR Director",
  },
};

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function PaklaringTemplate() {
  const [data, setData] = useState<PaklaringData>(DEFAULT_DATA);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (section: keyof PaklaringData, field: string, value: string) => {
    setData((prev) => {
      const targetSection = prev[section];
      if (typeof targetSection === "object" && targetSection !== null) {
        return { ...prev, [section]: { ...targetSection, [field]: value } };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* Left Panel: Dynamic Form (no-print) */}
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto no-print h-screen sticky top-0 custom-scrollbar">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Paklaring</h2>
          <div className="mb-6 flex gap-2">
            <button onClick={handlePrint} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
              Cetak / Simpan PDF
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Kop Surat</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nama Perusahaan</label>
                  <input type="text" value={data.kopSurat.namaPerusahaan} onChange={(e) => handleInputChange("kopSurat", "namaPerusahaan", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
                  <textarea value={data.kopSurat.alamat} onChange={(e) => handleInputChange("kopSurat", "alamat", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Kontak</label>
                  <input type="text" value={data.kopSurat.kontak} onChange={(e) => handleInputChange("kopSurat", "kontak", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Data Surat</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nomor Surat</label>
                  <input type="text" value={data.nomorSurat} onChange={(e) => handleInputChange("nomorSurat", "nomorSurat", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Surat</label>
                  <input type="date" value={data.tanggalSurat} onChange={(e) => handleInputChange("tanggalSurat", "tanggalSurat", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Data Karyawan</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
                  <input type="text" value={data.karyawan.nama} onChange={(e) => handleInputChange("karyawan", "nama", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">NIK</label>
                  <input type="text" value={data.karyawan.nik} onChange={(e) => handleInputChange("karyawan", "nik", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Jabatan Terakhir</label>
                  <input type="text" value={data.karyawan.jabatanTerakhir} onChange={(e) => handleInputChange("karyawan", "jabatanTerakhir", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Mulai</label>
                    <input type="date" value={data.karyawan.tanggalMulai} onChange={(e) => handleInputChange("karyawan", "tanggalMulai", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Selesai</label>
                    <input type="date" value={data.karyawan.tanggalSelesai} onChange={(e) => handleInputChange("karyawan", "tanggalSelesai", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Evaluasi Kinerja</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Penilaian</label>
                <select value={data.evaluasiKinerja} onChange={(e) => handleInputChange("evaluasiKinerja", "evaluasiKinerja", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Baik">Baik</option>
                  <option value="Cukup">Cukup</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Penandatangan</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                  <input type="text" value={data.penandatangan.nama} onChange={(e) => handleInputChange("penandatangan", "nama", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Jabatan</label>
                  <input type="text" value={data.penandatangan.jabatan} onChange={(e) => handleInputChange("penandatangan", "jabatan", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Live Preview (A4 Paper) */}
      <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto print:p-0 print:w-full print:overflow-visible flex justify-center bg-gray-200 print:bg-white">
        <div id="print-only-root" className="w-full flex justify-center print:block" ref={printRef}>
          <Kertas>
            <div className="text-center border-b-[3px] border-black pb-4 mb-8">
              <h1 className="text-2xl font-bold uppercase tracking-wider">{data.kopSurat.namaPerusahaan}</h1>
              <p className="text-sm mt-1">{data.kopSurat.alamat}</p>
              <p className="text-sm">{data.kopSurat.kontak}</p>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-bold uppercase underline pb-1">Surat Keterangan Pengalaman Kerja</h2>
              <p className="text-sm font-semibold mt-1">No: {data.nomorSurat}</p>
            </div>

            <div className="text-justify leading-relaxed">
              <p className="mb-4">
                Yang bertanda tangan di bawah ini, mewakili Manajemen {data.kopSurat.namaPerusahaan}, menerangkan dengan sesungguhnya bahwa:
              </p>

              <table className="w-full mb-4 ml-4">
                <tbody>
                  <tr>
                    <td className="w-48 py-1">Nama</td>
                    <td className="w-4 py-1">:</td>
                    <td className="font-semibold">{data.karyawan.nama}</td>
                  </tr>
                  <tr>
                    <td className="py-1">NIK</td>
                    <td className="py-1">:</td>
                    <td>{data.karyawan.nik}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Jabatan Terakhir</td>
                    <td className="py-1">:</td>
                    <td className="font-semibold">{data.karyawan.jabatanTerakhir}</td>
                  </tr>
                </tbody>
              </table>

              <p className="mb-4 indent-8">
                Adalah benar pernah menjadi karyawan di {data.kopSurat.namaPerusahaan} terhitung sejak tanggal <strong>{formatDate(data.karyawan.tanggalMulai)}</strong> hingga tanggal <strong>{formatDate(data.karyawan.tanggalSelesai)}</strong>.
              </p>

              <p className="mb-4 indent-8">
                Selama menjadi karyawan, yang bersangkutan telah menunjukkan kinerja dan dedikasi yang <strong>{data.evaluasiKinerja}</strong> kepada perusahaan. Kami mengucapkan terima kasih atas segala kontribusi yang telah diberikan selama masa kerja.
              </p>

              <p className="mb-8 indent-8 font-medium border-l-4 border-slate-800 pl-4 bg-slate-50 py-2">
                Kami juga menyatakan bahwa yang bersangkutan telah menyelesaikan seluruh kewajiban finansial serta telah mengembalikan seluruh aset perusahaan yang berada di bawah tanggung jawabnya (Clearance).
              </p>

              <p className="mb-8">
                Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
              </p>
            </div>

            <div className="flex justify-end mt-12 break-inside-avoid">
              <div className="text-center w-64">
                <p className="mb-1">Jakarta, {formatDate(data.tanggalSurat)}</p>
                <p className="font-bold mb-24">{data.kopSurat.namaPerusahaan}</p>
                <p className="font-bold underline">{data.penandatangan.nama}</p>
                <p>{data.penandatangan.jabatan}</p>
              </div>
            </div>
          </Kertas>
        </div>
      </div>
    </div>
  );
}
