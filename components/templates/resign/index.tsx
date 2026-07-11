"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Printer, 
  ArrowLeftCircle,
  BookOpen,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

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
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'resign' | 'protokol'>('perusahaan');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getInitialData = (): ResignData => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    return {
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
    };
  };

  const [data, setData] = useState<ResignData>(getInitialData());

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData(getInitialData());
    }
  };

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

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
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

      {/* TOP NAVIGATION BAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Generator Surat Pengunduran Diri (Resign)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); handlePrint(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('resign')} className={`flex-1 py-3 border-r ${activeTab === 'resign' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Resign</button>
              <button onClick={() => setActiveTab('protokol')} className={`flex-1 py-3 ${activeTab === 'protokol' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Protokol</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Perusahaan & Tanggal</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input type="text" name="companyName" value={data.companyName} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penulisan Surat</label>
                    <input type="text" name="companyCity" value={data.companyCity} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" name="tanggalSurat" value={data.tanggalSurat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea name="companyAddress" value={data.companyAddress} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20" />
                </div>

                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 mt-8">Penerima Surat (Tujuan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama/Jabatan Penerima</label>
                  <input type="text" name="penerima" value={data.penerima} onChange={handleInputChange} placeholder="Contoh: Bapak Hendro / HR Manager" className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen Penerima</label>
                  <input type="text" name="jabatanPenerima" value={data.jabatanPenerima} onChange={handleInputChange} placeholder="Contoh: HRD Department" className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input type="text" name="namaKaryawan" value={data.namaKaryawan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                  <input type="text" name="nik" value={data.nik} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input type="text" name="jabatan" value={data.jabatan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                  <input type="text" name="departemen" value={data.departemen} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
              </div>
              )}

              {activeTab === 'resign' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Detail Pengunduran Diri</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                    Tanggal Efektif Resign
                    <span className="text-[8px] text-rose-500 font-normal bg-rose-50 px-2 py-0.5 rounded-full">
                      One Month Notice (30 Hari)
                    </span>
                  </label>
                  <input type="date" name="tanggalEfektif" value={data.tanggalEfektif} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Pengunduran Diri</label>
                  <textarea name="alasan" value={data.alasan} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded-lg text-sm mt-1 resize-y" placeholder="Contoh: mendapatkan kesempatan karir di tempat lain..." />
                </div>
              </div>
              )}

              {activeTab === 'protokol' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Protokol Kewajiban (Liability & Handover)</h3>
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="isHandoverAgreed" checked={data.isHandoverAgreed} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Komitmen Serah Terima Tugas (Handover)</strong>
                      Karyawan sepakat untuk menyelesaikan serah terima seluruh tugas dan tanggung jawab kepada pengganti atau atasan langsung.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="isReturnAssetsAgreed" checked={data.isReturnAssetsAgreed} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Pengembalian Aset Perusahaan</strong>
                      Karyawan sepakat untuk mengembalikan seluruh aset perusahaan (Laptop, ID Card, dll) dalam keadaan baik sebelum hari terakhir bekerja.
                    </span>
                  </label>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 h-full overflow-y-auto bg-slate-400 p-4 md:p-8 print:p-0 print:w-full print:bg-white print:overflow-visible flex justify-center">
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

      </main>
    </div>
  );
}