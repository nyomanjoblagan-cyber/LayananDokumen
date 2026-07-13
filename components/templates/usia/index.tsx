'use client';

import React, { useState, useEffect } from 'react';
import { Printer, ArrowLeft, FileText, Settings, User, Building, MapPin, Map, Calendar, Briefcase, FileSignature, CheckCircle, Search } from 'lucide-react';
import Link from 'next/link';

export default function SuratKeteranganUsia() {
  const [data, setData] = useState({
    // Kop Surat
    kopPemerintah: 'PEMERINTAH KABUPATEN BANYUMAS',
    kopKecamatan: 'KECAMATAN PURWOKERTO SELATAN',
    kopDesa: 'KELURAHAN BERKOH',
    kopAlamat: 'Jl. Jenderal Sudirman No. 100, Purwokerto 53146',
    
    // Surat Details
    nomorSurat: '474.1 / 123 / 2026',
    
    // Pemohon
    nama: 'Budi Santoso',
    nik: '3302000000000001',
    tempatLahir: 'Banyumas',
    tanggalLahir: '1990-01-01',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Wiraswasta',
    alamat: 'Jl. Mawar No. 15, RT 01 RW 02, Kel. Berkoh, Purwokerto Selatan',
    
    // Keperluan
    tujuan: 'Persyaratan Administrasi Pernikahan',
    
    // Tanda Tangan
    tempatTtd: 'Berkoh',
    tanggalTtd: new Date().toISOString().split('T')[0],
    jabatanTtd: 'Kepala Desa Berkoh',
    namaTtd: 'Ahmad Supriyadi, S.E.',
    nipTtd: '19700101 200001 1 001'
  });

  const [usiaTahun, setUsiaTahun] = useState(0);
  const [usiaBulan, setUsiaBulan] = useState(0);

  useEffect(() => {
    if (data.tanggalLahir) {
      const birth = new Date(data.tanggalLahir);
      const now = new Date();
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      
      if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
        years--;
        months += 12;
      }
      
      if (now.getDate() < birth.getDate()) {
        months--;
        if (months < 0) {
          months = 11;
        }
      }
      
      setUsiaTahun(years);
      setUsiaBulan(months);
    }
  }, [data.tanggalLahir]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Helper Input Components
  const InputField = ({ label, name, type = "text" }: { label: string, name: string, type?: string }) => (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={(data as any)[name]} 
        onChange={handleChange}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
      />
    </div>
  );

  const TextAreaField = ({ label, name }: { label: string, name: string }) => (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <textarea 
        name={name} 
        value={(data as any)[name]} 
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-20 print:pb-0 print:bg-white">
      {/* HEADER NAVBAR - HIDDEN ON PRINT */}
      <div className="print:hidden bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-slate-500" />
            </Link>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">Surat Keterangan Usia</h1>
              <p className="text-xs text-slate-500 font-medium">Layanan Dokumen Desa/Kelurahan</p>
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg font-bold text-sm"
          >
            <Printer size={16} />
            <span>Cetak Surat (A4)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
          
          {/* LEFT PANEL: FORM BUILDER - HIDDEN ON PRINT */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            
            {/* PANEL KOP SURAT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Building size={18} />
                </div>
                <h2 className="font-bold text-slate-800">Kop Instansi</h2>
              </div>
              <div className="space-y-4">
                <InputField label="Pemerintah Tingkat (Kab/Kota)" name="kopPemerintah" />
                <InputField label="Kecamatan" name="kopKecamatan" />
                <InputField label="Desa / Kelurahan" name="kopDesa" />
                <TextAreaField label="Alamat Kantor" name="kopAlamat" />
              </div>
            </div>

            {/* PANEL DATA PENDUDUK */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <User size={18} />
                </div>
                <h2 className="font-bold text-slate-800">Data Penduduk (Pemohon)</h2>
              </div>
              <div className="space-y-4">
                <InputField label="Nomor Surat" name="nomorSurat" />
                <InputField label="NIK" name="nik" />
                <InputField label="Nama Lengkap" name="nama" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Tempat Lahir" name="tempatLahir" />
                  <InputField label="Tanggal Lahir" name="tanggalLahir" type="date" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jenis Kelamin</label>
                  <select 
                    name="jenisKelamin" 
                    value={data.jenisKelamin} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Agama</label>
                  <select 
                    name="agama" 
                    value={data.agama} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>

                <InputField label="Pekerjaan" name="pekerjaan" />
                <TextAreaField label="Alamat Lengkap" name="alamat" />
                <InputField label="Tujuan / Keperluan Surat" name="tujuan" />
              </div>
            </div>

            {/* PANEL PENGESAHAN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                  <FileSignature size={18} />
                </div>
                <h2 className="font-bold text-slate-800">Tanda Tangan Pengesahan</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Tempat" name="tempatTtd" />
                  <InputField label="Tanggal" name="tanggalTtd" type="date" />
                </div>
                <InputField label="Jabatan (Mis: Kepala Desa)" name="jabatanTtd" />
                <InputField label="Nama Pejabat" name="namaTtd" />
                <InputField label="NIP (Opsional)" name="nipTtd" />
              </div>
            </div>
            
          </div>

          {/* RIGHT PANEL: A4 DOCUMENT PREVIEW */}
          <div className="lg:col-span-8 flex justify-center print:block print:w-full print:m-0">
            {/* A4 Paper Dimensions: 210mm x 297mm */}
            <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:w-full print:h-auto p-[2.5cm] relative mx-auto font-serif text-black overflow-hidden">
              
              {/* KOP SURAT */}
              <div className="border-b-[3px] border-black pb-3 mb-1 text-center">
                <h2 className="text-xl font-bold uppercase tracking-wide leading-tight">{data.kopPemerintah}</h2>
                <h2 className="text-2xl font-bold uppercase tracking-wide leading-tight">{data.kopKecamatan}</h2>
                <h2 className="text-3xl font-black uppercase tracking-widest leading-tight">{data.kopDesa}</h2>
                <p className="text-sm mt-1">{data.kopAlamat}</p>
              </div>
              <div className="border-b border-black mb-8"></div>

              {/* JUDUL SURAT */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold underline uppercase tracking-widest">Surat Keterangan Usia</h3>
                <p className="text-md mt-1">Nomor: {data.nomorSurat}</p>
              </div>

              {/* ISI SURAT */}
              <div className="text-justify text-base leading-relaxed space-y-4">
                <p className="indent-8">
                  Yang bertanda tangan di bawah ini {data.jabatanTtd} {data.kopDesa.replace('KANTOR ', '').replace('PEMERINTAH ', '')}, Kecamatan {data.kopKecamatan.replace('KECAMATAN ', '')}, {data.kopPemerintah}, menerangkan dengan sebenarnya bahwa:
                </p>

                <div className="pl-8 space-y-1.5 my-6">
                  <div className="flex">
                    <div className="w-48">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.nama}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">NIK</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.nik}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">Tempat, Tgl. Lahir</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.tempatLahir}, {formatDate(data.tanggalLahir)}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">Jenis Kelamin</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.jenisKelamin}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">Agama</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.agama}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.pekerjaan}</div>
                  </div>
                  <div className="flex">
                    <div className="w-48">Alamat</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.alamat}</div>
                  </div>
                </div>

                <p className="indent-8">
                  Berdasarkan catatan register dan data kependudukan yang ada pada kami, yang bersangkutan adalah benar warga atau penduduk yang berdomisili di {data.kopDesa}, dan pada saat surat keterangan ini diterbitkan yang bersangkutan benar telah berusia:
                </p>
                
                <div className="text-center my-6 bg-slate-50 p-4 border border-dashed border-slate-300 print:bg-transparent print:border-none print:p-0">
                  <span className="text-2xl font-bold uppercase tracking-widest print:underline">{usiaTahun} Tahun, {usiaBulan} Bulan</span>
                </div>

                <p className="indent-8">
                  Surat Keterangan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagai kelengkapan administrasi <strong>{data.tujuan}</strong>.
                </p>
                
                <p className="indent-8">
                  Demikian Surat Keterangan Usia ini dibuat dengan sesungguhnya, agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
                </p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end mt-16 text-base">
                <div className="text-center">
                  <p>{data.tempatTtd}, {formatDate(data.tanggalTtd)}</p>
                  <p className="font-bold mb-24">{data.jabatanTtd}</p>
                  <p className="font-bold underline uppercase">{data.namaTtd}</p>
                  {data.nipTtd && <p>NIP. {data.nipTtd}</p>}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
