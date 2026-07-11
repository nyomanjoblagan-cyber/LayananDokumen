"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer, FileText, Plus, Trash2 } from "lucide-react";

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

interface BebanBiaya {
  id: string;
  jenis: string;
  ditanggungOleh: string;
  keterangan: string;
}

interface SuratTugasData {
  nomorSurat: string;
  tanggalSurat: string;
  pemberiTugas: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  penerimaTugas: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  tujuanTugas: string;
  lokasi: string;
  waktuMulai: string;
  waktuSelesai: string;
  bebanBiaya: BebanBiaya[];
}

export default function SuratTugas() {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<SuratTugasData>({
    nomorSurat: "001/ST/2026",
    tanggalSurat: new Date().toISOString().split('T')[0],
    pemberiTugas: {
      nama: "Dr. Budi Santoso",
      jabatan: "Direktur Utama",
      nip: "198001012005011001"
    },
    penerimaTugas: {
      nama: "Andi Wijaya, S.Kom.",
      jabatan: "Staff IT",
      nip: "199002022015021002"
    },
    tujuanTugas: "Melakukan maintenance server dan instalasi jaringan baru",
    lokasi: "Kantor Cabang Bandung",
    waktuMulai: new Date().toISOString().split('T')[0],
    waktuSelesai: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    bebanBiaya: [
      { id: "1", jenis: "Akomodasi", ditanggungOleh: "Perusahaan", keterangan: "Hotel Bintang 3" },
      { id: "2", jenis: "Transportasi", ditanggungOleh: "Perusahaan", keterangan: "Pesawat PP" },
      { id: "3", jenis: "Uang Harian", ditanggungOleh: "Perusahaan", keterangan: "Rp 500.000/hari" }
    ]
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Surat_Tugas_${data.penerimaTugas.nama.replace(/\s+/g, '_')}`,
  });

  const addBiaya = () => {
    setData({
      ...data,
      bebanBiaya: [...data.bebanBiaya, { id: Date.now().toString(), jenis: "", ditanggungOleh: "", keterangan: "" }]
    });
  };

  const removeBiaya = (id: string) => {
    setData({
      ...data,
      bebanBiaya: data.bebanBiaya.filter(b => b.id !== id)
    });
  };

  const updateBiaya = (id: string, field: keyof BebanBiaya, value: string) => {
    setData({
      ...data,
      bebanBiaya: data.bebanBiaya.map(b => b.id === id ? { ...b, [field]: value } : b)
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
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

      {/* Left Panel: Form */}
      <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-white p-6 shadow-sm no-print relative z-10">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white/95 backdrop-blur z-20 pb-4 border-b border-gray-100 pt-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" /> Form Surat Tugas
          </h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Printer size={18} /> Cetak/PDF
          </button>
        </div>

        <div className="space-y-6 pb-20">
          {/* Metadata Surat */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Informasi Surat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  value={data.nomorSurat}
                  onChange={(e) => setData({ ...data, nomorSurat: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Surat</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  value={data.tanggalSurat}
                  onChange={(e) => setData({ ...data, tanggalSurat: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Pemberi Tugas */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Pemberi Tugas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={data.pemberiTugas.nama}
                  onChange={(e) => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, nama: e.target.value } })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.pemberiTugas.jabatan}
                    onChange={(e) => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, jabatan: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIP / NIK (Opsional)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.pemberiTugas.nip}
                    onChange={(e) => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, nip: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Penerima Tugas */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Penerima Tugas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={data.penerimaTugas.nama}
                  onChange={(e) => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, nama: e.target.value } })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.penerimaTugas.jabatan}
                    onChange={(e) => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, jabatan: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIP / NIK (Opsional)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.penerimaTugas.nip}
                    onChange={(e) => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, nip: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detail Tugas */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Detail Tugas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksud dan Tujuan Tugas</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[100px] resize-y"
                  value={data.tujuanTugas}
                  onChange={(e) => setData({ ...data, tujuanTugas: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi / Tempat Pelaksanaan</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                  value={data.lokasi}
                  onChange={(e) => setData({ ...data, lokasi: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.waktuMulai}
                    onChange={(e) => setData({ ...data, waktuMulai: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Selesai</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={data.waktuSelesai}
                    onChange={(e) => setData({ ...data, waktuSelesai: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Beban Biaya */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-semibold text-gray-800">Rincian Beban Biaya</h3>
              <button 
                onClick={addBiaya} 
                className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus size={16} /> Tambah
              </button>
            </div>
            
            <div className="space-y-4">
              {data.bebanBiaya.map((biaya, index) => (
                <div key={biaya.id} className="relative bg-gray-50 p-4 border border-gray-200 rounded-xl">
                  <div className="absolute top-3 right-3">
                    <button 
                      onClick={() => removeBiaya(biaya.id)} 
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1 pr-8">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Biaya</label>
                      <input
                        type="text"
                        placeholder="Cth: Akomodasi"
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        value={biaya.jenis}
                        onChange={(e) => updateBiaya(biaya.id, 'jenis', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Ditanggung Oleh</label>
                      <input
                        type="text"
                        placeholder="Cth: Perusahaan"
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        value={biaya.ditanggungOleh}
                        onChange={(e) => updateBiaya(biaya.id, 'ditanggungOleh', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Keterangan Tambahan</label>
                      <input
                        type="text"
                        placeholder="Cth: Hotel Bintang 3"
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        value={biaya.keterangan}
                        onChange={(e) => updateBiaya(biaya.id, 'keterangan', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-1/2 overflow-y-auto bg-slate-300 p-8 flex justify-center print:bg-white print:p-0 print:w-full">
        <div id="print-only-root" className="w-full flex justify-center print:block">
          <div ref={componentRef}>
            <Kertas>
              <div className="text-gray-900 font-serif leading-relaxed">
                
                {/* Header */}
                <div className="text-center mb-10 border-b-2 border-black pb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">SURAT PERINTAH TUGAS</h1>
                  <p className="text-lg">Nomor: {data.nomorSurat}</p>
                </div>

                {/* Pembukaan */}
                <div className="mb-6">
                  <p className="mb-3">Yang bertanda tangan di bawah ini:</p>
                  <table className="w-full ml-4 mb-4">
                    <tbody>
                      <tr>
                        <td className="w-1/4 align-top py-1.5">Nama</td>
                        <td className="w-[1%] align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5 font-bold">{data.pemberiTugas.nama}</td>
                      </tr>
                      <tr>
                        <td className="align-top py-1.5">Jabatan</td>
                        <td className="align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5">{data.pemberiTugas.jabatan}</td>
                      </tr>
                      {data.pemberiTugas.nip && (
                        <tr>
                          <td className="align-top py-1.5">NIP/NIK</td>
                          <td className="align-top py-1.5 px-2">:</td>
                          <td className="align-top py-1.5">{data.pemberiTugas.nip}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mb-6">
                  <p className="mb-3">Dengan ini memberikan tugas dan wewenang kepada:</p>
                  <table className="w-full ml-4 mb-4">
                    <tbody>
                      <tr>
                        <td className="w-1/4 align-top py-1.5">Nama</td>
                        <td className="w-[1%] align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5 font-bold">{data.penerimaTugas.nama}</td>
                      </tr>
                      <tr>
                        <td className="align-top py-1.5">Jabatan</td>
                        <td className="align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5">{data.penerimaTugas.jabatan}</td>
                      </tr>
                      {data.penerimaTugas.nip && (
                        <tr>
                          <td className="align-top py-1.5">NIP/NIK</td>
                          <td className="align-top py-1.5 px-2">:</td>
                          <td className="align-top py-1.5">{data.penerimaTugas.nip}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Detail Tugas */}
                <div className="mb-6">
                  <p className="mb-3">Untuk melaksanakan tugas kedinasan dengan rincian sebagai berikut:</p>
                  <table className="w-full ml-4 mb-4">
                    <tbody>
                      <tr>
                        <td className="w-1/4 align-top py-1.5">Maksud dan Tujuan</td>
                        <td className="w-[1%] align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5 text-justify">{data.tujuanTugas || "-"}</td>
                      </tr>
                      <tr>
                        <td className="align-top py-1.5">Tempat / Lokasi</td>
                        <td className="align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5">{data.lokasi || "-"}</td>
                      </tr>
                      <tr>
                        <td className="align-top py-1.5">Waktu Pelaksanaan</td>
                        <td className="align-top py-1.5 px-2">:</td>
                        <td className="align-top py-1.5">
                          {formatDate(data.waktuMulai)} 
                          {data.waktuMulai !== data.waktuSelesai && ` s/d ${formatDate(data.waktuSelesai)}`}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Beban Biaya */}
                <div className="mb-8">
                  <p className="mb-3">Adapun rincian beban biaya yang timbul atas pelaksanaan tugas ini diatur sebagai berikut:</p>
                  <table className="w-full border-collapse border border-slate-900 mb-4">
                    <thead>
                      <tr>
                        <th className="border border-slate-900 px-4 py-2 font-bold w-12 text-center bg-slate-100 print:bg-transparent">No</th>
                        <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Jenis Biaya</th>
                        <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Ditanggung Oleh</th>
                        <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.bebanBiaya.length > 0 ? (
                        data.bebanBiaya.map((biaya, idx) => (
                          <tr key={biaya.id}>
                            <td className="border border-slate-900 px-4 py-2 text-center">{idx + 1}</td>
                            <td className="border border-slate-900 px-4 py-2">{biaya.jenis || "-"}</td>
                            <td className="border border-slate-900 px-4 py-2">{biaya.ditanggungOleh || "-"}</td>
                            <td className="border border-slate-900 px-4 py-2">{biaya.keterangan || "-"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="border border-slate-900 px-4 py-6 text-center italic">Tidak ada rincian beban biaya.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Clause Laporan */}
                <div className="mb-12 text-justify bg-slate-50 p-4 border-l-4 border-slate-800 break-inside-avoid">
                  <p className="font-semibold text-slate-900">
                    Klausul Wajib Laporan:
                  </p>
                  <p>
                    Karyawan yang bersangkutan diwajibkan untuk menyampaikan laporan tertulis pelaksanaan tugas selambat-lambatnya <strong>3 (tiga) hari kerja</strong> setelah tugas selesai dilaksanakan.
                  </p>
                </div>

                <p className="mb-8">Demikian Surat Perintah Tugas ini dibuat untuk dapat dilaksanakan dengan penuh tanggung jawab.</p>

                {/* Tanda Tangan */}
                <div className="flex justify-between items-end mt-16 px-4 break-inside-avoid">
                  <div className="text-center w-1/3">
                    <p className="mb-24">Penerima Tugas,</p>
                    <p className="font-bold underline">{data.penerimaTugas.nama}</p>
                    {data.penerimaTugas.nip && <p>NIP. {data.penerimaTugas.nip}</p>}
                  </div>
                  <div className="text-center w-1/3">
                    <p className="mb-1">Jakarta, {formatDate(data.tanggalSurat)}</p>
                    <p className="mb-24">Pemberi Tugas,</p>
                    <p className="font-bold underline">{data.pemberiTugas.nama}</p>
                    {data.pemberiTugas.nip && <p>NIP. {data.pemberiTugas.nip}</p>}
                  </div>
                </div>

              </div>
            </Kertas>
          </div>
        </div>
      </div>
    </div>
  );
}
