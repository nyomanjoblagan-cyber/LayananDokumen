"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen } from "lucide-react";
import Link from "next/link";

// Komponen Kertas A4
const Kertas = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[25.4mm] text-black font-serif text-[12pt] leading-relaxed relative print:shadow-none print:w-full print:min-w-0 print:min-h-0 print:p-0 print:m-0 mx-auto ${className}`}>
      {children}
    </div>
  );
};

interface LamaranData {
    tempat: string;
    tanggal: string;
    namaTujuan: string;
    jabatanTujuan: string;
    namaPerusahaan: string;
    alamatPerusahaan: string;
    sumberInformasi: string;
    posisiDilamar: string;
    namaLengkap: string;
    tempatTanggalLahir: string;
    pendidikanTerakhir: string;
    alamat: string;
    noHp: string;
    email: string;
    lampiran: string[];
}

const INITIAL_DATA: LamaranData = {
    tempat: "Jakarta",
    tanggal: "12 Juli 2026",
    namaTujuan: "HRD Manager",
    jabatanTujuan: "Bapak/Ibu",
    namaPerusahaan: "PT Teknologi Nusantara",
    alamatPerusahaan: "Jl. Sudirman Kav. 21, Jakarta Selatan",
    sumberInformasi: "LinkedIn",
    posisiDilamar: "Frontend Developer",
    namaLengkap: "Budi Santoso",
    tempatTanggalLahir: "Bandung, 15 Agustus 1995",
    pendidikanTerakhir: "S1 Teknik Informatika, Universitas Indonesia",
    alamat: "Jl. Merdeka No. 45, Jakarta",
    noHp: "081234567890",
    email: "budi.santoso@email.com",
    lampiran: ["Curriculum Vitae", "Fotokopi KTP", "Fotokopi Ijazah", "Fotokopi Transkrip Nilai"],
};

const sumberOptions = [
    "LinkedIn",
    "JobStreet",
    "Referensi",
    "Website Perusahaan",
    "Koran / Media Cetak",
    "Media Sosial Lainnya",
    "Lainnya"
];

const lampiranOptions = [
    "Curriculum Vitae",
    "Fotokopi KTP",
    "Fotokopi Ijazah",
    "Fotokopi Transkrip Nilai",
    "Portofolio",
    "Pas Foto Terbaru",
    "Sertifikat Kompetensi",
    "Surat Pengalaman Kerja",
    "Surat Keterangan Sehat",
    "SKCK"
];

export default function SuratLamaranTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <LamaranBuilder />
    </Suspense>
  );
}

function LamaranBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<LamaranData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'surat' | 'lowongan' | 'pelamar' | 'lampiran'>('surat');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof LamaranData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const currentLampiran = prev.lampiran;
      if (currentLampiran.includes(option)) {
        return { ...prev, lampiran: currentLampiran.filter((item) => item !== option) };
      } else {
        return { ...prev, lampiran: [...currentLampiran, option] };
      }
    });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setFormData({ ...INITIAL_DATA });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateOpeningParagraph = () => {
    const { sumberInformasi, posisiDilamar, namaPerusahaan } = formData;
    if (sumberInformasi === "Website Perusahaan") {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari website resmi ${namaPerusahaan}, saya mengetahui bahwa perusahaan yang Bapak/Ibu pimpin sedang membuka lowongan pekerjaan untuk posisi ${posisiDilamar}.`;
    } else if (sumberInformasi === "Referensi") {
      return `Berdasarkan informasi yang saya terima dari referensi yang dapat dipercaya, saya mengetahui bahwa terdapat lowongan pekerjaan di ${namaPerusahaan} untuk posisi ${posisiDilamar}.`;
    } else if (sumberInformasi === "Lainnya") {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya mengetahui bahwa ${namaPerusahaan} sedang membuka lowongan pekerjaan untuk menempati posisi ${posisiDilamar}.`;
    } else {
      return `Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari ${sumberInformasi}, saya mengetahui bahwa ${namaPerusahaan} sedang membuka lowongan pekerjaan untuk posisi ${posisiDilamar}.`;
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Print Safe CSS Block */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}} />

      {/* TOP NAV BAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Lamaran Kerja</span>
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
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('lowongan')} className={`flex-1 py-3 border-r ${activeTab === 'lowongan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lowongan</button>
              <button onClick={() => setActiveTab('pelamar')} className={`flex-1 py-3 border-r ${activeTab === 'pelamar' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pelamar</button>
              <button onClick={() => setActiveTab('lampiran')} className={`flex-1 py-3 ${activeTab === 'lampiran' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lampiran</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat & Tujuan</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tempat} onChange={e => handleChange('tempat', e.target.value)} placeholder="Contoh: Jakarta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tanggal} onChange={e => handleChange('tanggal', e.target.value)} placeholder="Contoh: 12 Juli 2026" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama/Jabatan Penerima</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.namaTujuan} onChange={e => handleChange('namaTujuan', e.target.value)} placeholder="Contoh: HRD Manager" />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sapaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.jabatanTujuan} onChange={e => handleChange('jabatanTujuan', e.target.value)} placeholder="Contoh: Bapak/Ibu" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={formData.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} placeholder="Contoh: PT Teknologi Nusantara" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={formData.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} placeholder="Alamat Perusahaan Tujuan" />
                </div>
              </div>
              )}

              {activeTab === 'lowongan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Informasi Lowongan</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Posisi yang Dilamar</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-emerald-700 bg-emerald-50" value={formData.posisiDilamar} onChange={e => handleChange('posisiDilamar', e.target.value)} placeholder="Contoh: Frontend Developer" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sumber Informasi</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={formData.sumberInformasi} onChange={e => handleChange('sumberInformasi', e.target.value)}>
                    {sumberOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              )}

              {activeTab === 'pelamar' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Data Pribadi Pelamar</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={formData.namaLengkap} onChange={e => handleChange('namaLengkap', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.tempatTanggalLahir} onChange={e => handleChange('tempatTanggalLahir', e.target.value)} placeholder="Contoh: Bandung, 15 Agustus 1995" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pendidikan Terakhir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.pendidikanTerakhir} onChange={e => handleChange('pendidikanTerakhir', e.target.value)} placeholder="Contoh: S1 Teknik Informatika, UI" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={formData.alamat} onChange={e => handleChange('alamat', e.target.value)} placeholder="Domisili pelamar" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP / WhatsApp</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.noHp} onChange={e => handleChange('noHp', e.target.value)} placeholder="Contoh: 081234567890" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                    <input type="email" className="w-full p-2 border rounded-lg text-sm mt-1" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="Contoh: budi@email.com" />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'lampiran' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Daftar Lampiran</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {lampiranOptions.map((opt) => (
                    <label key={opt} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.lampiran.includes(opt)}
                        onChange={() => handleCheckboxChange(opt)}
                        className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              )}
           </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-8 flex justify-center print:w-full print:p-0 print:m-0 print:bg-white print:overflow-visible print:block">
          <Kertas>
            {/* Tanggal */}
            <div className="text-right mb-8">
              <p>{formData.tempat}, {formData.tanggal}</p>
            </div>

            {/* Lampiran & Hal */}
            <div className="mb-8">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-24 align-top">Hal</td>
                    <td className="w-4 align-top">:</td>
                    <td><strong>Lamaran Pekerjaan</strong></td>
                  </tr>
                  <tr>
                    <td className="w-24 align-top">Lampiran</td>
                    <td className="w-4 align-top">:</td>
                    <td>{formData.lampiran.length > 0 ? `${formData.lampiran.length} Lembar` : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Penerima */}
            <div className="mb-8">
              <p>Yth.</p>
              <p><strong>{formData.namaTujuan}</strong></p>
              <p>{formData.namaPerusahaan}</p>
              <p className="whitespace-pre-line">{formData.alamatPerusahaan}</p>
            </div>

            {/* Sapaan */}
            <div className="mb-4">
              <p>Dengan hormat,</p>
            </div>

            {/* Paragraf Pembuka */}
            <div className="mb-4 text-justify indent-8">
              <p>{generateOpeningParagraph()}</p>
            </div>

            <div className="mb-4 text-justify indent-8">
              <p>Sehubungan dengan hal tersebut, saya yang bertanda tangan di bawah ini:</p>
            </div>

            {/* Data Pribadi */}
            <div className="mb-6 pl-8">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-48 py-1 align-top">Nama</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1"><strong>{formData.namaLengkap}</strong></td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Tempat, Tanggal Lahir</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.tempatTanggalLahir}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Pendidikan Terakhir</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.pendidikanTerakhir}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Alamat</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.alamat}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">No. HP / WhatsApp</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.noHp}</td>
                  </tr>
                  <tr>
                    <td className="w-48 py-1 align-top">Email</td>
                    <td className="w-4 py-1 align-top">:</td>
                    <td className="py-1">{formData.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paragraf Tengah */}
            <div className="mb-4 text-justify indent-8">
              <p>Bermaksud mengajukan diri untuk mengisi posisi <strong>{formData.posisiDilamar}</strong> tersebut. Saya memiliki kondisi kesehatan yang baik, motivasi tinggi untuk belajar, serta mampu bekerja secara mandiri maupun dalam tim.</p>
            </div>

            {/* Lampiran List */}
            <div className="mb-4 text-justify indent-8">
              <p>Sebagai bahan pertimbangan Bapak/Ibu, bersama surat lamaran ini turut saya lampirkan dokumen berikut:</p>
              <ol className="list-decimal pl-12 mt-2 space-y-1 indent-0">
                {formData.lampiran.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
              {formData.lampiran.length === 0 && (
                <p className="pl-4 mt-2 text-gray-500 italic text-sm indent-0">Belum ada lampiran yang dipilih.</p>
              )}
            </div>

            {/* Penutup */}
            <div className="mb-12 text-justify indent-8">
              <p>Besar harapan saya agar {formData.jabatanTujuan} bersedia meluangkan waktu untuk memberikan kesempatan wawancara, sehingga saya dapat menjelaskan secara lebih detail mengenai kualifikasi dan potensi yang saya miliki.</p>
              <p className="mt-2 indent-8">Demikian surat lamaran ini saya sampaikan. Atas perhatian dan waktu yang diberikan, saya ucapkan terima kasih.</p>
            </div>

            {/* TTD */}
            <div className="flex flex-col items-end mr-8 mt-12">
              <p className="mb-24">Hormat saya,</p>
              <p className="font-bold border-b border-black inline-block px-2 min-w-[150px] text-center">{formData.namaLengkap}</p>
            </div>
          </Kertas>
        </div>
      </main>
    </div>
  );
}