"use client";

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Building2, 
  MapPin, 
  Printer, 
  FileText,
  User,
  Calendar,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

interface ResignData {
  companyName: string;
  companyCity: string;
  companyAddress: string;
  
  tanggalSurat: string;
  
  penerima: string;
  jabatanPenerima: string;
  
  namaKaryawan: string;
  nik: string;
  jabatan: string;
  departemen: string;
  
  tanggalEfektif: string;
  alasan: string;
  
  isHandoverAgreed: boolean;
  isReturnAssetsAgreed: boolean;
}

export default function ResignTemplate() {
  const printRef = useRef<HTMLDivElement>(null);
  
  const today = new Date();
  const nextMonth = addMonths(today, 1);

  const [data, setData] = useState<ResignData>({
    companyName: 'PT INDONESIA MAJU SEJAHTERA',
    companyCity: 'Jakarta',
    companyAddress: 'Jl. Jenderal Sudirman Kav. 45, Jakarta Selatan 12920',
    
    tanggalSurat: format(today, 'yyyy-MM-dd'),
    
    penerima: 'HR Manager',
    jabatanPenerima: 'HRD Department',
    
    namaKaryawan: 'Budi Santoso',
    nik: 'EMP-2021-045',
    jabatan: 'Senior Software Engineer',
    departemen: 'Information Technology',
    
    tanggalEfektif: format(nextMonth, 'yyyy-MM-dd'),
    alasan: 'mengambil kesempatan karir di tempat lain',
    
    isHandoverAgreed: true,
    isReturnAssetsAgreed: true,
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Surat_Pengunduran_Diri_${data.namaKaryawan.replace(/\s+/g, '_')}_${data.tanggalSurat}`,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: id });
    } catch (e) {
      return dateStr;
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
                <FileText className="w-6 h-6 text-rose-500" />
                Generator Pengunduran Diri (Resign)
              </h2>
              <p className="text-sm text-slate-500 mt-1">Isi form untuk membuat Surat Pengunduran Diri sesuai protokol perusahaan</p>
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
          {/* Section: Document & Company Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Building2 className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Informasi Perusahaan & Tanggal</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Perusahaan</label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Kota Penulisan Surat</label>
                <input
                  type="text"
                  name="companyCity"
                  value={data.companyCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Alamat Perusahaan</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={data.companyAddress}
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

          {/* Section: Penerima Surat */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <User className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Penerima Surat (Tujuan)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama/Jabatan Penerima</label>
                <input
                  type="text"
                  name="penerima"
                  value={data.penerima}
                  onChange={handleInputChange}
                  placeholder="Contoh: Bapak Hendro / HR Manager"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Departemen Penerima</label>
                <input
                  type="text"
                  name="jabatanPenerima"
                  value={data.jabatanPenerima}
                  onChange={handleInputChange}
                  placeholder="Contoh: HRD Department"
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

          {/* Section: Resign Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Calendar className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Detail Pengunduran Diri</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  Tanggal Efektif Resign
                  <span className="text-xs text-rose-500 font-normal bg-rose-50 px-2 py-0.5 rounded-full">
                    Aturan: One Month Notice (30 Hari)
                  </span>
                </label>
                <input
                  type="date"
                  name="tanggalEfektif"
                  value={data.tanggalEfektif}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Alasan Pengunduran Diri</label>
                <textarea
                  name="alasan"
                  value={data.alasan}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-sm resize-y"
                  placeholder="Contoh: mendapatkan kesempatan karir di tempat lain..."
                />
              </div>
            </div>
          </section>

          {/* Section: Protocols */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <CheckSquare className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-700">Protokol Kewajiban (Liability & Handover)</h3>
            </div>
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isHandoverAgreed"
                  checked={data.isHandoverAgreed}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                />
                <span className="text-sm text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Komitmen Serah Terima Tugas (Handover)</strong>
                  Karyawan sepakat untuk menyelesaikan serah terima seluruh tugas dan tanggung jawab kepada pengganti atau atasan langsung.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isReturnAssetsAgreed"
                  checked={data.isReturnAssetsAgreed}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                />
                <span className="text-sm text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Pengembalian Aset Perusahaan</strong>
                  Karyawan sepakat untuk mengembalikan seluruh aset perusahaan (Laptop, ID Card, dll) dalam keadaan baik sebelum hari terakhir bekerja.
                </span>
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="w-1/2 h-full overflow-y-auto bg-slate-400 p-8 print:p-0 print:w-full print:bg-white print:overflow-visible flex justify-center">
        <div id="print-only-root" className="w-full flex justify-center print:block">
          <div ref={printRef}>
            <Kertas>
              {/* Tempat & Tanggal */}
              <div className="text-right mb-8">
                <p>{data.companyCity}, {formatDateIndo(data.tanggalSurat)}</p>
              </div>

              {/* Tujuan Surat */}
              <div className="mb-10 space-y-1">
                <p>Kepada Yth.,</p>
                <p className="font-bold">{data.penerima}</p>
                <p>{data.jabatanPenerima}</p>
                <p className="font-bold">{data.companyName}</p>
                <p>{data.companyAddress}</p>
              </div>

              {/* Perihal */}
              <div className="mb-8">
                <p><strong>Perihal:</strong> Surat Pengunduran Diri Karyawan</p>
              </div>

              {/* Isi Surat */}
              <div className="space-y-4 text-justify">
                <p>Dengan hormat,</p>
                
                <p>Yang bertanda tangan di bawah ini:</p>

                <div className="ml-4 md:ml-8 mb-4">
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
                  Melalui surat ini, saya bermaksud menyampaikan permohonan pengunduran diri saya dari <span className="font-bold">{data.companyName}</span> sebagai <span className="font-bold">{data.jabatan}</span>. Sesuai dengan ketentuan dan peraturan perusahaan yang mensyaratkan <span className="font-bold italic">One Month Notice</span> (Pemberitahuan 30 Hari), maka pengunduran diri ini akan terhitung efektif pada tanggal <span className="font-bold">{formatDateIndo(data.tanggalEfektif)}</span>.
                </p>

                <p>
                  Adapun keputusan pengunduran diri ini saya ambil karena alasan {data.alasan}.
                </p>

                <p>
                  Saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan, kepercayaan, serta pengalaman berharga yang telah diberikan kepada saya selama bekerja di <span className="font-bold">{data.companyName}</span>. Saya sangat bersyukur dapat menjadi bagian dari perusahaan ini dan belajar banyak hal.
                </p>

                {(data.isHandoverAgreed || data.isReturnAssetsAgreed) && (
                  <>
                    <p>
                      Sebagai bentuk tanggung jawab saya sampai dengan hari terakhir bekerja, saya menyatakan komitmen sebagai berikut:
                    </p>
                    <ul className="list-disc pl-8 space-y-1 mb-4">
                      {data.isHandoverAgreed && (
                        <li>
                          Saya bersedia melakukan proses <strong>Serah Terima Tugas (Handover)</strong> seluruh pekerjaan dan tanggung jawab saya kepada rekan yang ditunjuk dengan sebaik-baiknya.
                        </li>
                      )}
                      {data.isReturnAssetsAgreed && (
                        <li>
                          Saya bersedia untuk <strong>mengembalikan seluruh aset dan fasilitas perusahaan</strong> (termasuk namun tidak terbatas pada laptop, ID Card, seragam, dll) yang berada di bawah tanggung jawab saya dalam keadaan baik.
                        </li>
                      )}
                    </ul>
                  </>
                )}

                <p>
                  Saya juga memohon maaf yang sebesar-besarnya apabila selama bekerja terdapat kesalahan, kekeliruan, maupun ucapan saya yang kurang berkenan di hati manajemen dan rekan-rekan kerja sekalian.
                </p>

                <p>
                  Saya berharap <span className="font-bold">{data.companyName}</span> dapat terus berkembang dan semakin sukses di masa yang akan datang.
                </p>

                <p className="mb-12">
                  Demikian surat pengunduran diri ini saya buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun. Atas perhatian dan pengertian Bapak/Ibu, saya ucapkan terima kasih.
                </p>

                {/* Signatures */}
                <div className="flex justify-between mt-12 pt-8 break-inside-avoid">
                  <div className="w-1/2 text-left">
                    <p className="mb-24">Hormat saya,</p>
                    <p className="font-bold underline">{data.namaKaryawan}</p>
                    <p>{data.nik}</p>
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