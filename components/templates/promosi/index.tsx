"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen } from "lucide-react";
import Link from "next/link";

// Types
interface FormState {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  teleponPerusahaan: string;
  emailPerusahaan: string;
  nomorSurat: string;
  tanggalSurat: string;
  tempatPenetapan: string;
  namaKaryawan: string;
  nik: string;
  jabatanLama: string;
  departemenLama: string;
  jabatanBaru: string;
  departemenBaru: string;
  tanggalEfektif: string;
  gajiLama: string;
  tunjanganLama: string;
  gajiBaru: string;
  tunjanganBaru: string;
  masaPercobaan: string;
  namaPenandatangan: string;
  jabatanPenandatangan: string;
  menimbang: string;
  mengingat: string;
  tembusan: string;
}

const INITIAL_DATA: FormState = {
  namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
  alamatPerusahaan: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
  teleponPerusahaan: "(021) 555-0198",
  emailPerusahaan: "hrd@majumundur.co.id",
  nomorSurat: "045/SK-DIR/VI/2026",
  tanggalSurat: "15 Juni 2026",
  tempatPenetapan: "Jakarta",
  namaKaryawan: "Budi Santoso",
  nik: "EMP-2021-089",
  jabatanLama: "Senior Staff",
  departemenLama: "Marketing",
  jabatanBaru: "Manager Marketing",
  departemenBaru: "Marketing",
  tanggalEfektif: "1 Juli 2026",
  gajiLama: "Rp 8.000.000",
  tunjanganLama: "Rp 1.500.000",
  gajiBaru: "Rp 15.000.000",
  tunjanganBaru: "Rp 3.000.000",
  masaPercobaan: "3 (tiga)",
  namaPenandatangan: "Andi Wijaya",
  jabatanPenandatangan: "Direktur Utama",
  menimbang: "a. Bahwa untuk kelancaran kegiatan operasional perusahaan dan mendukung pencapaian target bisnis, perlu dilakukan pengisian jabatan pada Departemen Marketing.\nb. Bahwa berdasarkan hasil penilaian kinerja, Saudara/i Budi Santoso dinilai memenuhi syarat, memiliki kapabilitas, dan dedikasi yang baik untuk menduduki jabatan Manager Marketing.\nc. Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan b, perlu ditetapkan dengan Surat Keputusan Direksi.",
  mengingat: "1. Anggaran Dasar Perusahaan beserta seluruh perubahannya.\n2. Peraturan Perusahaan (PP) / Perjanjian Kerja Bersama (PKB) yang berlaku di lingkungan PT Maju Mundur Sejahtera.\n3. Hasil Keputusan Rapat Direksi PT Maju Mundur Sejahtera tanggal 10 Juni 2026.",
  tembusan: "1. Board of Directors\n2. HRD & GA Department\n3. Finance & Accounting Department\n4. Atasan Langsung\n5. Arsip",
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div 
    id="print-area" 
    className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[20mm] text-black font-serif text-[11pt] leading-relaxed relative print:w-full print:min-w-0 print:min-h-0 mx-auto"
  >
    {children}
  </div>
);

export default function SuratPromosiTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PromosiBuilder />
    </Suspense>
  );
}

function PromosiBuilder() {
  const [formData, setFormData] = useState<FormState>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'karyawan' | 'kompensasi' | 'sk' | 'perusahaan'>('karyawan');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setFormData({ ...INITIAL_DATA });
    }
  };

  const handleChange = (field: keyof FormState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .no-print { display: none !important; }
        }
      ` }} />
      
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - SK Promosi Jabatan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan SK</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 py-3 border-r ${activeTab === 'kompensasi' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kompensasi</button>
              <button onClick={() => setActiveTab('sk')} className={`flex-1 py-3 border-r ${activeTab === 'sk' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Isi SK</button>
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 ${activeTab === 'perusahaan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Data Karyawan & Promosi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.nik} onChange={e => handleChange('nik', e.target.value)} placeholder="EMP-2021-089" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.jabatanLama} onChange={e => handleChange('jabatanLama', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dept. Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.departemenLama} onChange={e => handleChange('departemenLama', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.jabatanBaru} onChange={e => handleChange('jabatanBaru', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dept. Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.departemenBaru} onChange={e => handleChange('departemenBaru', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tanggalEfektif} onChange={e => handleChange('tanggalEfektif', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Percobaan (Bulan)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.masaPercobaan} onChange={e => handleChange('masaPercobaan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'kompensasi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Kompensasi & Benefit</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.gajiLama} onChange={e => handleChange('gajiLama', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Lama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tunjanganLama} onChange={e => handleChange('tunjanganLama', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji Pokok Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.gajiBaru} onChange={e => handleChange('gajiBaru', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan Baru</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.tunjanganBaru} onChange={e => handleChange('tunjanganBaru', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'sk' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Legal Draft (Menimbang & Mengingat)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor SK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal SK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Penetapan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tempatPenetapan} onChange={e => handleChange('tempatPenetapan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Klausul Menimbang</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={formData.menimbang} onChange={e => handleChange('menimbang', e.target.value)} />
                  <p className="text-[9px] text-slate-400 mt-1">Gunakan Enter untuk baris baru.</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Klausul Mengingat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={formData.mengingat} onChange={e => handleChange('mengingat', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tembusan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={formData.tembusan} onChange={e => handleChange('tembusan', e.target.value)} />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Penandatangan SK</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaPenandatangan} onChange={e => handleChange('namaPenandatangan', e.target.value)} />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.jabatanPenandatangan} onChange={e => handleChange('jabatanPenandatangan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Informasi Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={formData.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Telepon</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.teleponPerusahaan} onChange={e => handleChange('teleponPerusahaan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.emailPerusahaan} onChange={e => handleChange('emailPerusahaan', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Right Panel: Preview A4 */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-200 print:p-0 print:bg-white flex justify-center print:block custom-scrollbar print:overflow-visible">
          <Kertas>
            {/* Header/Kop Surat */}
            <div className="border-b-4 border-double border-black pb-4 mb-6 text-center">
              <h1 className="text-2xl font-black uppercase tracking-widest mb-1 text-black">{formData.namaPerusahaan}</h1>
              <p className="text-xs">{formData.alamatPerusahaan}</p>
              <p className="text-xs">Telp: {formData.teleponPerusahaan} | Email: {formData.emailPerusahaan}</p>
            </div>

            {/* Judul Surat */}
            <div className="text-center mb-8 space-y-1">
              <h2 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4">Surat Keputusan Direksi</h2>
              <p className="font-semibold text-sm">Nomor: {formData.nomorSurat}</p>
              <p className="mt-4 uppercase font-bold text-sm">TENTANG</p>
              <p className="uppercase font-bold text-sm tracking-wide">PENGANGKATAN DAN PROMOSI JABATAN</p>
            </div>

            {/* Isi SK */}
            <div className="text-justify space-y-4">
              <p className="uppercase font-bold text-center mb-6">DIREKSI {formData.namaPerusahaan}</p>

              {/* Menimbang */}
              <div className="flex">
                <div className="w-32 font-bold flex-shrink-0">MENIMBANG</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1">
                  <div className="whitespace-pre-line text-justify">
                    {formData.menimbang}
                  </div>
                </div>
              </div>

              {/* Mengingat */}
              <div className="flex mt-3">
                <div className="w-32 font-bold flex-shrink-0">MENGINGAT</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1">
                  <div className="whitespace-pre-line text-justify">
                    {formData.mengingat}
                  </div>
                </div>
              </div>

              {/* Memutuskan */}
              <div className="flex mt-6 mb-2">
                <div className="w-32 font-bold flex-shrink-0">MEMUTUSKAN</div>
              </div>

              <div className="flex">
                <div className="w-32 font-bold flex-shrink-0">MENETAPKAN</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1 uppercase font-bold text-justify">
                  SURAT KEPUTUSAN DIREKSI TENTANG PENGANGKATAN DAN PROMOSI JABATAN ATAS NAMA SAUDARA/I {formData.namaKaryawan}.
                </div>
              </div>

              <div className="flex mt-3">
                <div className="w-32 font-bold flex-shrink-0">PERTAMA</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1 text-justify">
                  Memberhentikan dengan hormat Saudara/i <strong>{formData.namaKaryawan}</strong> (NIK: {formData.nik}) dari jabatannya yang lama sebagai <strong>{formData.jabatanLama}</strong> pada Departemen <strong>{formData.departemenLama}</strong> dengan ucapan terima kasih atas dedikasi dan pengabdiannya selama menjabat.
                </div>
              </div>

              <div className="flex mt-3">
                <div className="w-32 font-bold flex-shrink-0">KEDUA</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1 text-justify">
                  Mengangkat Saudara/i <strong>{formData.namaKaryawan}</strong> pada jabatan yang baru sebagai <strong>{formData.jabatanBaru}</strong> pada Departemen <strong>{formData.departemenBaru}</strong>.
                </div>
              </div>

              <div className="flex mt-3">
                <div className="w-32 font-bold flex-shrink-0">KETIGA</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1 text-justify">
                  Kepadanya diberikan kompensasi berupa Gaji Pokok sebesar <strong>{formData.gajiBaru}</strong> dan Tunjangan sebesar <strong>{formData.tunjanganBaru}</strong> per bulan, serta fasilitas dan benefit lain sesuai dengan Peraturan Perusahaan yang berlaku.
                  {formData.masaPercobaan && (
                    <span> Masa evaluasi atas posisi baru ini ditetapkan selama <strong>{formData.masaPercobaan} bulan</strong>.</span>
                  )}
                </div>
              </div>

              <div className="flex mt-3">
                <div className="w-32 font-bold flex-shrink-0">KEEMPAT</div>
                <div className="w-4 font-bold flex-shrink-0">:</div>
                <div className="flex-1 text-justify">
                  Surat Keputusan ini berlaku efektif terhitung mulai tanggal <strong>{formData.tanggalEfektif}</strong>. Apabila di kemudian hari ternyata terdapat kekeliruan dalam keputusan ini, maka akan diadakan perbaikan sebagaimana mestinya.
                </div>
              </div>

            </div>

            {/* Tanda Tangan */}
            <div className="mt-12 flex justify-end">
              <div className="w-64">
                <table className="w-full mb-24">
                  <tbody>
                    <tr>
                      <td className="w-24">Ditetapkan di</td>
                      <td className="w-4">:</td>
                      <td>{formData.tempatPenetapan}</td>
                    </tr>
                    <tr>
                      <td>Pada tanggal</td>
                      <td>:</td>
                      <td>{formData.tanggalSurat}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full border-b border-black font-bold uppercase mb-1">
                  {formData.namaPenandatangan}
                </div>
                <div className="w-full text-sm">
                  {formData.jabatanPenandatangan}
                </div>
              </div>
            </div>

            {/* Tembusan */}
            {formData.tembusan && (
              <div className="mt-8 text-xs">
                <p className="font-bold underline mb-1">Tembusan:</p>
                <div className="whitespace-pre-line pl-4">
                  {formData.tembusan}
                </div>
              </div>
            )}

          </Kertas>
        </div>
      </main>
    </div>
  );
}
