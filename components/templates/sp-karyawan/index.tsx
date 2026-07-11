"use client";

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Printer, 
  Save, 
  Download,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  Clock,
  Info
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

type SpType = 'I' | 'II' | 'III';

interface SpData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyLogoUrl: string;
  
  nomorSurat: string;
  tanggalSurat: string;
  tingkatSp: SpType;
  
  namaKaryawan: string;
  nik: string;
  jabatan: string;
  departemen: string;
  
  tanggalPelanggaran: string;
  jenisPelanggaran: string;
  deskripsiPelanggaran: string;
  pasalPelanggaran: string;
  
  masaBerlaku: string;
  tanggalMulaiBerlaku: string;
  tanggalAkhirBerlaku: string;
  sanksiTambahan: string;
  
  namaHr: string;
  jabatanHr: string;
  namaAtasan: string;
  jabatanAtasan: string;
}

export default function SpKaryawanTemplate() {
  const printRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<SpData>({
    companyName: 'PT INDONESIA MAJU SEJAHTERA',
    companyAddress: 'Jl. Jenderal Sudirman Kav. 45, Jakarta Selatan 12920',
    companyPhone: '(021) 555-0123',
    companyEmail: 'hrd@indonesiamajusejahtera.co.id',
    companyWebsite: 'www.indonesiamajusejahtera.co.id',
    companyLogoUrl: '',
    
    nomorSurat: '045/HRD-SP/XI/2023',
    tanggalSurat: format(new Date(), 'yyyy-MM-dd'),
    tingkatSp: 'I',
    
    namaKaryawan: 'Budi Santoso',
    nik: 'EMP-2021-045',
    jabatan: 'Senior Sales Executive',
    departemen: 'Sales & Marketing',
    
    tanggalPelanggaran: format(new Date(), 'yyyy-MM-dd'),
    jenisPelanggaran: 'Ketidakhadiran Tanpa Keterangan (Mangkir)',
    deskripsiPelanggaran: 'Tidak hadir bekerja tanpa pemberitahuan dan keterangan yang sah selama 3 (tiga) hari kerja berturut-turut. Tindakan ini sangat mengganggu operasional tim dan tidak mencerminkan sikap profesional seorang karyawan.',
    pasalPelanggaran: 'Pasal 24 Ayat 1 dan Pasal 25 Ayat 3',
    
    masaBerlaku: '6 (Enam) Bulan',
    tanggalMulaiBerlaku: format(new Date(), 'yyyy-MM-dd'),
    tanggalAkhirBerlaku: format(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'yyyy-MM-dd'),
    sanksiTambahan: 'Pemotongan Tunjangan Kehadiran dan penundaan kenaikan gaji selama masa berlakunya Surat Peringatan ini.',
    
    namaHr: 'Anita Wulandari, S.Psi',
    jabatanHr: 'HR Director',
    namaAtasan: 'Hendro Setiawan',
    jabatanAtasan: 'Head of Sales',
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `SP_${data.tingkatSp}_${data.namaKaryawan.replace(/\s+/g, '_')}_${data.tanggalSurat}`,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: id });
    } catch (e) {
      return dateStr;
    }
  };

  const getSpText = (type: SpType) => {
    switch (type) {
      case 'I': return 'PERTAMA';
      case 'II': return 'KEDUA';
      case 'III': return 'KETIGA';
      default: return 'PERTAMA';
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
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

      {/* Left Panel - Dynamic Form */}
      <div className="w-1/2 h-full overflow-y-auto border-r border-slate-200 bg-white flex flex-col no-print shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
                Generator Surat Peringatan
              </h2>
              <p className="text-sm text-slate-500 mt-1">Isi form di bawah untuk menghasilkan dokumen SP secara real-time</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm font-medium text-sm"
              >
                <Printer className="w-4 h-4" />
                Cetak PDF
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Section: Document Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <FileText className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Informasi Dokumen</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Tingkat SP</label>
                <select
                  name="tingkatSp"
                  value={data.tingkatSp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm bg-white"
                >
                  <option value="I">SP 1 (Pertama)</option>
                  <option value="II">SP 2 (Kedua)</option>
                  <option value="III">SP 3 (Ketiga)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nomor Surat</label>
                <input
                  type="text"
                  name="nomorSurat"
                  value={data.nomorSurat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Tanggal Surat</label>
                <input
                  type="date"
                  name="tanggalSurat"
                  value={data.tanggalSurat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </section>

          {/* Section: Employee Data */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <User className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Data Karyawan</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaKaryawan"
                  value={data.namaKaryawan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">NIK / ID Karyawan</label>
                <input
                  type="text"
                  name="nik"
                  value={data.nik}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Jabatan</label>
                <input
                  type="text"
                  name="jabatan"
                  value={data.jabatan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Departemen</label>
                <input
                  type="text"
                  name="departemen"
                  value={data.departemen}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </section>

          {/* Section: Violation Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <AlertTriangle className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Detail Pelanggaran</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Tanggal Kejadian</label>
                  <input
                    type="date"
                    name="tanggalPelanggaran"
                    value={data.tanggalPelanggaran}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Pasal PP yang Dilanggar</label>
                  <input
                    type="text"
                    name="pasalPelanggaran"
                    value={data.pasalPelanggaran}
                    onChange={handleInputChange}
                    placeholder="Contoh: Pasal 10 Ayat 2"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Jenis Pelanggaran</label>
                <input
                  type="text"
                  name="jenisPelanggaran"
                  value={data.jenisPelanggaran}
                  onChange={handleInputChange}
                  placeholder="Contoh: Ketidakhadiran Tanpa Keterangan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Deskripsi Lengkap Pelanggaran</label>
                <textarea
                  name="deskripsiPelanggaran"
                  value={data.deskripsiPelanggaran}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm resize-y"
                  placeholder="Jelaskan secara kronologis dan detail mengenai pelanggaran yang dilakukan..."
                />
              </div>
            </div>
          </section>

          {/* Section: Sanction */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Info className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Sanksi & Konsekuensi</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Masa Berlaku SP</label>
                  <input
                    type="text"
                    name="masaBerlaku"
                    value={data.masaBerlaku}
                    onChange={handleInputChange}
                    placeholder="Contoh: 6 (Enam) Bulan"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5"></div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Tanggal Mulai Berlaku</label>
                  <input
                    type="date"
                    name="tanggalMulaiBerlaku"
                    value={data.tanggalMulaiBerlaku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Tanggal Akhir Berlaku</label>
                  <input
                    type="date"
                    name="tanggalAkhirBerlaku"
                    value={data.tanggalAkhirBerlaku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Sanksi Tambahan / Catatan Khusus (Opsional)</label>
                <textarea
                  name="sanksiTambahan"
                  value={data.sanksiTambahan}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm resize-y"
                  placeholder="Kosongkan jika tidak ada sanksi tambahan..."
                />
              </div>
            </div>
          </section>

          {/* Section: Signatures */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <User className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Penanda Tangan</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Pembuat (HR)</label>
                <input
                  type="text"
                  name="namaHr"
                  value={data.namaHr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Jabatan Pembuat</label>
                <input
                  type="text"
                  name="jabatanHr"
                  value={data.jabatanHr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Atasan (Mengetahui)</label>
                <input
                  type="text"
                  name="namaAtasan"
                  value={data.namaAtasan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Jabatan Atasan</label>
                <input
                  type="text"
                  name="jabatanAtasan"
                  value={data.jabatanAtasan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </section>

          {/* Section: Company Config */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Building2 className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Kop Surat Perusahaan</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Perusahaan</label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Alamat Lengkap</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={data.companyAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Telepon</label>
                  <input
                    type="text"
                    name="companyPhone"
                    value={data.companyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="text"
                    name="companyEmail"
                    value={data.companyEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Website</label>
                  <input
                    type="text"
                    name="companyWebsite"
                    value={data.companyWebsite}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="w-1/2 h-full overflow-y-auto bg-slate-400 p-8 print:p-0 print:w-full print:bg-white print:overflow-visible flex justify-center">
        <div id="print-only-root" className="w-full flex justify-center print:block">
          <div ref={printRef}>
            <Kertas>
              {/* Header / Kop Surat */}
              <div className="border-b-[3px] border-slate-900 pb-4 mb-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900 mb-1">
                    {data.companyName}
                  </h1>
                  <p className="text-sm text-slate-700 mb-1">{data.companyAddress}</p>
                  <p className="text-xs text-slate-600 flex items-center justify-center gap-4">
                    {data.companyPhone && <span>Telp: {data.companyPhone}</span>}
                    {data.companyEmail && <span>Email: {data.companyEmail}</span>}
                    {data.companyWebsite && <span>Web: {data.companyWebsite}</span>}
                  </p>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold uppercase underline underline-offset-4 mb-1">
                  SURAT PERINGATAN {getSpText(data.tingkatSp)}
                </h2>
                <p className="text-sm font-medium">Nomor: {data.nomorSurat}</p>
              </div>

              {/* Content */}
              <div className="space-y-4 text-justify">
                <p>
                  Surat Peringatan {getSpText(data.tingkatSp)} (SP-{data.tingkatSp}) ini dibuat dan ditujukan kepada:
                </p>

                <div className="ml-8 mb-4">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-32 py-1 align-top">Nama</td>
                        <td className="w-4 py-1 align-top">:</td>
                        <td className="py-1 align-top font-bold">{data.namaKaryawan}</td>
                      </tr>
                      <tr>
                        <td className="py-1 align-top">NIK</td>
                        <td className="py-1 align-top">:</td>
                        <td className="py-1 align-top">{data.nik}</td>
                      </tr>
                      <tr>
                        <td className="py-1 align-top">Jabatan</td>
                        <td className="py-1 align-top">:</td>
                        <td className="py-1 align-top">{data.jabatan}</td>
                      </tr>
                      <tr>
                        <td className="py-1 align-top">Departemen</td>
                        <td className="py-1 align-top">:</td>
                        <td className="py-1 align-top">{data.departemen}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Melalui surat ini, Perusahaan memberikan <span className="font-bold">Surat Peringatan {getSpText(data.tingkatSp)}</span> kepada Saudara/i karena telah melakukan pelanggaran terhadap tata tertib dan Peraturan Perusahaan, dengan rincian sebagai berikut:
                </p>

                <div className="ml-8 mb-4">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="w-48 py-1.5 align-top font-medium">Tanggal Kejadian</td>
                        <td className="w-4 py-1.5 align-top">:</td>
                        <td className="py-1.5 align-top">{formatDateIndo(data.tanggalPelanggaran)}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top font-medium">Jenis Pelanggaran</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5 align-top font-semibold">{data.jenisPelanggaran}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top font-medium">Ketentuan yang Dilanggar</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5 align-top">{data.pasalPelanggaran}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 align-top font-medium">Uraian Kejadian</td>
                        <td className="py-1.5 align-top">:</td>
                        <td className="py-1.5 align-top">{data.deskripsiPelanggaran}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Tindakan indisipliner yang Saudara/i lakukan sangat merugikan Perusahaan dan mencerminkan sikap yang tidak profesional. Sebagai seorang karyawan, Saudara/i dituntut untuk mematuhi seluruh tata tertib dan Peraturan Perusahaan yang berlaku tanpa terkecuali.
                </p>

                <p>
                  Sebagai konsekuensi atas pelanggaran tersebut, Perusahaan menetapkan sanksi berupa:
                </p>

                <ol className="list-decimal pl-8 mb-4 space-y-1">
                  <li>
                    Pemberian Surat Peringatan {getSpText(data.tingkatSp)} yang berlaku selama <span className="font-bold">{data.masaBerlaku}</span>, terhitung mulai tanggal <span className="font-bold">{formatDateIndo(data.tanggalMulaiBerlaku)}</span> sampai dengan <span className="font-bold">{formatDateIndo(data.tanggalAkhirBerlaku)}</span>.
                  </li>
                  {data.sanksiTambahan && (
                    <li>{data.sanksiTambahan}</li>
                  )}
                  <li>
                    Apabila dalam masa berlakunya Surat Peringatan ini Saudara/i kembali melakukan pelanggaran disiplin dan/atau tidak menunjukkan perbaikan kinerja maupun sikap, maka Perusahaan akan memberikan sanksi yang lebih berat hingga pada Pemutusan Hubungan Kerja (PHK).
                  </li>
                </ol>

                <p>
                  Surat Peringatan ini dibuat agar Saudara/i dapat memperbaiki diri, tidak mengulangi kesalahan yang sama, dan bekerja dengan penuh tanggung jawab sesuai dengan standar operasional Perusahaan.
                </p>

                <p className="mb-12">
                  Demikian surat peringatan ini dibuat untuk menjadi perhatian dan dilaksanakan sebagaimana mestinya.
                </p>

                {/* Signatures */}
                <div className="flex justify-between mt-12 pt-8 break-inside-avoid">
                  <div className="w-1/3 text-center">
                    <p className="mb-24">Diterima dan dipahami oleh,<br/>Karyawan Ybs,</p>
                    <p className="font-bold underline">{data.namaKaryawan}</p>
                    <p>{data.nik}</p>
                  </div>
                  <div className="w-1/3 text-center">
                    <p className="mb-24">Mengetahui,<br/>Atasan Langsung,</p>
                    <p className="font-bold underline">{data.namaAtasan}</p>
                    <p>{data.jabatanAtasan}</p>
                  </div>
                  <div className="w-1/3 text-center">
                    <p className="mb-24">Dikeluarkan oleh,<br/>HR & Management,</p>
                    <p className="font-bold underline">{data.namaHr}</p>
                    <p>{data.jabatanHr}</p>
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
