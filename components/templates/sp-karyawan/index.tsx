"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  Info,
  ArrowLeftCircle,
  BookOpen,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

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

const INITIAL_DATA: SpData = {
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
};

export default function SpKaryawanTemplate() {
  const printRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<SpData>(INITIAL_DATA);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'dokumen' | 'karyawan' | 'pelanggaran' | 'sanksi' | 'ttd'>('dokumen');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDataChange = (field: keyof SpData, val: any) => {
    setData((prev) => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
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

  const getSpText = (type: SpType) => {
    switch (type) {
      case 'I': return 'PERTAMA';
      case 'II': return 'KEDUA';
      case 'III': return 'KETIGA';
      default: return 'PERTAMA';
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Peringatan Karyawan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
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
              <button onClick={() => setActiveTab('dokumen')} className={`flex-1 py-3 border-r ${activeTab === 'dokumen' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Dokumen</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('pelanggaran')} className={`flex-1 py-3 border-r ${activeTab === 'pelanggaran' ? 'bg-white text-rose-600 border-b-2 border-b-rose-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kasus</button>
              <button onClick={() => setActiveTab('sanksi')} className={`flex-1 py-3 border-r ${activeTab === 'sanksi' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Sanksi</button>
              <button onClick={() => setActiveTab('ttd')} className={`flex-1 py-3 ${activeTab === 'ttd' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'dokumen' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Dokumen</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tingkat SP</label>
                    <select
                      className="w-full p-2 border rounded-lg text-sm mt-1 bg-white"
                      value={data.tingkatSp}
                      onChange={e => handleDataChange('tingkatSp', e.target.value)}
                    >
                      <option value="I">SP 1 (Pertama)</option>
                      <option value="II">SP 2 (Kedua)</option>
                      <option value="III">SP 3 (Ketiga)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                </div>

                <div className="pt-4 mt-2 border-t">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Kop Surat Perusahaan</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                      <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Telepon</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.companyPhone} onChange={e => handleDataChange('companyPhone', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.companyEmail} onChange={e => handleDataChange('companyEmail', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Website</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.companyWebsite} onChange={e => handleDataChange('companyWebsite', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaKaryawan} onChange={e => handleDataChange('namaKaryawan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.jabatan} onChange={e => handleDataChange('jabatan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.departemen} onChange={e => handleDataChange('departemen', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'pelanggaran' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-rose-600 border-b pb-1 mb-4">Detail Pelanggaran</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Kejadian</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalPelanggaran} onChange={e => handleDataChange('tanggalPelanggaran', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pasal yang Dilanggar</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pasalPelanggaran} onChange={e => handleDataChange('pasalPelanggaran', e.target.value)} placeholder="Misal: Pasal 10 Ayat 2" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Pelanggaran</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.jenisPelanggaran} onChange={e => handleDataChange('jenisPelanggaran', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={data.deskripsiPelanggaran} onChange={e => handleDataChange('deskripsiPelanggaran', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'sanksi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Sanksi & Konsekuensi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Berlaku SP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.masaBerlaku} onChange={e => handleDataChange('masaBerlaku', e.target.value)} placeholder="Contoh: 6 (Enam) Bulan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Mulai Berlaku</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalMulaiBerlaku} onChange={e => handleDataChange('tanggalMulaiBerlaku', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Akhir Berlaku</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalAkhirBerlaku} onChange={e => handleDataChange('tanggalAkhirBerlaku', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sanksi Tambahan (Opsional)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.sanksiTambahan} onChange={e => handleDataChange('sanksiTambahan', e.target.value)} placeholder="Kosongkan jika tidak ada" />
                </div>
              </div>
              )}

              {activeTab === 'ttd' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Penanda Tangan</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-2">Pembuat (HR)</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Nama</label>
                        <input className="w-full p-2 border rounded-md text-sm mt-1" value={data.namaHr} onChange={e => handleDataChange('namaHr', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Jabatan</label>
                        <input className="w-full p-2 border rounded-md text-sm mt-1" value={data.jabatanHr} onChange={e => handleDataChange('jabatanHr', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-2">Atasan (Mengetahui)</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Nama</label>
                        <input className="w-full p-2 border rounded-md text-sm mt-1" value={data.namaAtasan} onChange={e => handleDataChange('namaAtasan', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Jabatan</label>
                        <input className="w-full p-2 border rounded-md text-sm mt-1" value={data.jabatanAtasan} onChange={e => handleDataChange('jabatanAtasan', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className={`w-full md:flex-1 h-full overflow-y-auto bg-slate-400 p-8 print:p-0 print:w-full print:bg-white print:overflow-visible flex justify-center relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
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
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

    </div>
  );
}
