'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Activity, Stethoscope, User, MapPin } from 'lucide-react';

export default function RujukanTemplate() {
  const [data, setData] = useState({
    // Header/KOP
    namaFaskes: 'PUSKESMAS KECAMATAN SEHAT SENTOSA',
    alamatFaskes: 'Jl. Kesehatan No. 99, Jakarta Barat 11220',
    kontakFaskes: 'Telp: (021) 123-4567 | Email: puskesmas.ss@dinkes.go.id',
    
    // Surat
    noRujukan: '112233/RJK/VII/2026',
    tanggalSurat: '13 Juli 2026',
    
    // Tujuan
    rsTujuan: 'RSUD TARAKAN',
    poliTujuan: 'Poli Spesialis Penyakit Dalam',
    
    // Pasien
    namaPasien: 'Budi Santoso',
    noBPJS: '0001234567890',
    nik: '3173012345678901',
    umur: '45 Tahun',
    jenisKelamin: 'Laki-laki',
    alamatPasien: 'Jl. Anggrek Raya No. 15, Kebon Jeruk, Jakarta Barat',
    noTelp: '0812-9876-5432',
    
    // Medis
    anamnesa: 'Pasien datang mengeluh nyeri dada sebelah kiri sejak 2 hari yang lalu, menjalar ke lengan. Keringat dingin (+), mual (-). Riwayat hipertensi sejak 5 tahun lalu.',
    pemeriksaanFisik: 'TD: 160/100 mmHg, Nadi: 90x/mnt, RR: 20x/mnt, Suhu: 36.5 C',
    diagnosaAwal: 'Susp. Coronary Artery Disease (CAD)',
    kodeICD10: 'I20.9 - Angina Pectoris, Unspecified',
    terapiDiberikan: '1. Amlodipine 10mg (1x1)\n2. Aspirin 80mg (1x1)\n3. Oksigen nasal kanul 2 lpm',
    alasanRujuk: 'Memerlukan pemeriksaan penunjang lebih lanjut (EKG, Echocardiography) dan penanganan spesialistik.',
    
    // Dokter
    namaDokter: 'dr. Andi Gunawan',
    sipDokter: 'SIP.123/456/DINKES/2023'
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Editor Sidebar */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-600" />
          Form Rujukan Medis
        </h2>
        
        <div className="space-y-5">
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Tujuan Rujukan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RS Tujuan</label>
                <input type="text" name="rsTujuan" value={data.rsTujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Poliklinik Tujuan</label>
                <input type="text" name="poliTujuan" value={data.poliTujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. Rujukan</label>
                  <input type="text" name="noRujukan" value={data.noRujukan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Data Pasien
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Pasien</label>
                <input type="text" name="namaPasien" value={data.namaPasien} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. BPJS/JKN</label>
                  <input type="text" name="noBPJS" value={data.noBPJS} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">NIK</label>
                  <input type="text" name="nik" value={data.nik} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Jenis Kelamin</label>
                  <select name="jenisKelamin" value={data.jenisKelamin} onChange={handleChange as any} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Umur</label>
                  <input type="text" name="umur" value={data.umur} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Pasien</label>
                <textarea name="alamatPasien" value={data.alamatPasien} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">No. Telp / HP</label>
                <input type="text" name="noTelp" value={data.noTelp} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> Informasi Medis
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Anamnesa</label>
                <textarea name="anamnesa" value={data.anamnesa} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Pemeriksaan Fisik</label>
                <textarea name="pemeriksaanFisik" value={data.pemeriksaanFisik} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-12 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Diagnosa Awal</label>
                <input type="text" name="diagnosaAwal" value={data.diagnosaAwal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold text-red-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Kode ICD-10</label>
                <input type="text" name="kodeICD10" value={data.kodeICD10} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Terapi / Tindakan Sementara</label>
                <textarea name="terapiDiberikan" value={data.terapiDiberikan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Alasan Rujukan</label>
                <textarea name="alasanRujuk" value={data.alasanRujuk} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Dokter Perujuk</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Dokter</label>
                <input type="text" name="namaDokter" value={data.namaDokter} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SIP</label>
                <input type="text" name="sipDokter" value={data.sipDokter} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .rujukan-table td { padding: 4px 8px; vertical-align: top; font-size: 10.5pt; border: 1px solid #000; }
              .rujukan-table th { padding: 4px 8px; font-weight: bold; font-size: 10.5pt; text-align: left; border: 1px solid #000; background-color: #f3f4f6; }
            `}} />

            {/* KOP FASKES */}
            <div className="flex items-center border-b-2 border-black pb-4 mb-4">
              <div className="w-20 h-24 flex items-center justify-center">
                {/* Placeholder Logo Bakti Husada / Puskesmas */}
                <div className="w-16 h-16 border-2 border-green-600 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-green-600 flex items-center justify-center rotate-45">
                    <div className="w-4 h-4 bg-green-600 -rotate-45 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center pr-20">
                <h1 className="text-xl font-bold uppercase tracking-wide">{data.namaFaskes}</h1>
                <p className="text-sm">{data.alamatFaskes}</p>
                <p className="text-xs">{data.kontakFaskes}</p>
              </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase underline" style={{ fontSize: '14pt' }}>Surat Rujukan Medis</h2>
              <p className="text-sm mt-1">No. {data.noRujukan}</p>
            </div>

            {/* Kepada */}
            <div className="text-[11pt] mb-6">
              <p>Kepada Yth. Teman Sejawat,</p>
              <p className="font-bold">{data.rsTujuan}</p>
              <p>{data.poliTujuan}</p>
              <p>Di tempat.</p>
            </div>

            {/* Pembuka */}
            <div className="text-[11pt] text-justify mb-4">
              <p>Mohon pemeriksaan dan penanganan lebih lanjut terhadap pasien di bawah ini:</p>
            </div>

            {/* Data Pasien & Medis Table */}
            <div className="mb-6">
              <table className="w-full border-collapse rujukan-table">
                <tbody>
                  <tr>
                    <th colSpan={3} className="text-center">IDENTITAS PASIEN</th>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }} className="font-semibold">Nama Pasien</td>
                    <td style={{ width: '2%', borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ width: '73%', borderLeft: 'none' }} className="font-bold">{data.namaPasien}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">No. BPJS / NIK</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>
                      <span className="font-mono font-bold mr-4">{data.noBPJS}</span> / 
                      <span className="font-mono ml-4">{data.nik}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Umur / Jenis Kelamin</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>{data.umur} / {data.jenisKelamin}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Alamat Lengkap</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>{data.alamatPasien}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">No. Telepon</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>{data.noTelp}</td>
                  </tr>

                  <tr>
                    <th colSpan={3} className="text-center">INFORMASI MEDIS</th>
                  </tr>
                  <tr>
                    <td className="font-semibold">Anamnesa</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }} className="text-justify">{data.anamnesa}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Pemeriksaan Fisik</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>{data.pemeriksaanFisik}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Diagnosa Sementara</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }} className="font-bold">{data.diagnosaAwal}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Kode ICD-10</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }} className="font-mono">{data.kodeICD10}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Terapi / Tindakan yang Telah Diberikan</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }} className="whitespace-pre-line">{data.terapiDiberikan}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Alasan Rujuk</td>
                    <td style={{ borderRight: 'none', borderLeft: 'none' }}>:</td>
                    <td style={{ borderLeft: 'none' }}>{data.alasanRujuk}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Penutup */}
            <div className="text-[11pt] text-justify mb-8">
              <p>Atas bantuan sejawat, kami ucapkan terima kasih.</p>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-end text-[11pt]">
              <div className="w-64 text-center">
                <p className="mb-2">{data.tanggalSurat}</p>
                <p className="mb-20">Dokter Perujuk,</p>
                
                <div className="relative">
                  <p className="font-bold underline">{data.namaDokter}</p>
                  <p className="text-[9pt]">SIP. {data.sipDokter}</p>
                  
                  {/* Cap/Stempel */}
                  <div className="absolute -left-16 -top-16 w-24 h-24 border-2 border-purple-700 rounded-full flex items-center justify-center opacity-30 pointer-events-none transform -rotate-12">
                    <span className="text-purple-700 font-bold text-[8px] text-center uppercase px-2">{data.namaFaskes}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Note */}
            <div className="mt-8 pt-2 border-t border-gray-400 text-[8pt] text-gray-500 flex justify-between">
              <span>* Surat rujukan ini berlaku selama 3 (tiga) bulan sejak tanggal diterbitkan.</span>
              <span>Dokumen Rujukan Medis v2.0</span>
            </div>

          </div>
                  <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>
      </div>
    </div>
  );
}