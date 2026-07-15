'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { Printer, ArrowLeftCircle, Edit3, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PenagihanData {
  // Header Surat
  nomorSurat: string;
  tanggalSurat: string;
  lampiran: string;
  sifatSurat: string;
  perihal: string;
  
  // Data Perusahaan Pengirim
  namaPengirim: string;
  alamatPengirim: string;
  teleponPengirim: string;
  emailPengirim: string;
  websitePengirim: string;

  // Data Klien / Penerima
  namaKlien: string;
  upKlien: string;
  alamatKlien: string;
  
  // Rincian Tagihan & Kontrak
  nomorKontrak: string;
  tanggalKontrak: string;
  nomorInvoice: string;
  tanggalInvoice: string;
  jatuhTempo: string;
  nilaiPokok: number;
  persentaseDenda: number;
  hariKeterlambatan: number;
  biayaAdmin: number;
  
  // Rekening Pembayaran
  namaBank: string;
  cabangBank: string;
  namaRekening: string;
  nomorRekening: string;
  
  // Pejabat Berwenang
  namaPejabat: string;
  jabatanPejabat: string;

  // Tembusan
  tembusan1: string;
  tembusan2: string;
}

const INITIAL_DATA: PenagihanData = {
  nomorSurat: '045/LGL-COLL/VII/2026',
  tanggalSurat: '13 Juli 2026',
  lampiran: '1 (satu) Berkas - Rincian Transaksi',
  sifatSurat: 'PENTING DAN SEGERA',
  perihal: 'SOMASI I (PERTAMA) - PERINGATAN JATUH TEMPO PEMBAYARAN',
  
  namaPengirim: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  alamatPengirim: 'Gedung Sudirman Tower Lt. 21, Jl. Jend. Sudirman Kav. 86, Jakarta Selatan 12920',
  teleponPengirim: '(021) 2988-1234',
  emailPengirim: 'legal.collection@kctn.co.id',
  websitePengirim: 'www.kctn.co.id',

  namaKlien: 'PT. MAJU BERSAMA TECHNOLOGY',
  upKlien: 'Bpk. Budi Santoso - Direktur Utama',
  alamatKlien: 'Kawasan Industri Pulogadung, Jl. Rawa Bali II No. 5, Jakarta Timur 13920',
  
  nomorKontrak: 'PKS-012/KCTN-MBT/I/2026',
  tanggalKontrak: '10 Januari 2026',
  nomorInvoice: 'INV-2026-05-089',
  tanggalInvoice: '15 Mei 2026',
  jatuhTempo: '14 Juni 2026',
  nilaiPokok: 250000000,
  persentaseDenda: 0.2, // 0.2% per hari
  hariKeterlambatan: 29, 
  biayaAdmin: 1500000,
  
  namaBank: 'Bank Mandiri (Persero) Tbk.',
  cabangBank: 'KCP Jakarta Sudirman',
  namaRekening: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  nomorRekening: '122-00-9876543-2',
  
  namaPejabat: 'Dr. Hendra Wijaya, S.H., M.H.',
  jabatanPejabat: 'Head of Legal & Collections',

  tembusan1: 'Direktur Keuangan PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  tembusan2: 'Arsip'
};

// --- 2. ATURAN KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 3. HELPER FUNCTIONS ---
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
};

export default function PenagihanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Dokumen...</div>}>
      <PenagihanToolBuilder />
    </Suspense>
  );
}

function PenagihanToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<PenagihanData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke data awal?')) {
        setFormData(INITIAL_DATA);
    }
  };

  const nilaiDenda = Math.floor(formData.nilaiPokok * (formData.persentaseDenda / 100) * formData.hariKeterlambatan);
  const totalTagihan = formData.nilaiPokok + nilaiDenda + formData.biayaAdmin;

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT FORMAL */}
      <div className="border-b-[3px] border-slate-900 pb-3 mb-1 flex items-center justify-between break-inside-avoid">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-wider mb-1 uppercase font-serif">{formData.namaPengirim}</h1>
          <p className="text-sm text-slate-800 font-medium">Head Office: {formData.alamatPengirim}</p>
          <p className="text-sm text-slate-800">Phone: {formData.teleponPengirim} | Email: {formData.emailPengirim} | Web: {formData.websitePengirim}</p>
        </div>
      </div>
      <div className="border-b-[1px] border-slate-900 mb-8 w-full h-px"></div>

      {/* HEADER SURAT - LEGAL FORMAT */}
      <div className="flex justify-between mb-8 break-inside-avoid text-sm">
        <div className="w-[65%]">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-28 pb-1 align-top">Nomor</td>
                <td className="w-4 pb-1 align-top">:</td>
                <td className="pb-1 font-semibold">{formData.nomorSurat}</td>
              </tr>
              <tr>
                <td className="w-28 pb-1 align-top">Sifat</td>
                <td className="w-4 pb-1 align-top">:</td>
                <td className="pb-1 font-semibold">{formData.sifatSurat}</td>
              </tr>
              <tr>
                <td className="w-28 pb-1 align-top">Lampiran</td>
                <td className="w-4 pb-1 align-top">:</td>
                <td className="pb-1">{formData.lampiran}</td>
              </tr>
              <tr>
                <td className="w-28 pb-2 align-top">Perihal</td>
                <td className="w-4 pb-2 align-top">:</td>
                <td className="pb-2 font-bold underline tracking-wide uppercase">{formData.perihal}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[35%] text-right">
          <p>Jakarta, {formData.tanggalSurat}</p>
        </div>
      </div>

      {/* ALAMAT TUJUAN (TERMOHON) */}
      <div className="mb-8 break-inside-avoid text-sm">
        <p className="mb-1">Kepada Yth.,</p>
        <p className="font-bold text-base uppercase">{formData.namaKlien}</p>
        <p className="font-semibold mb-1">U.P: {formData.upKlien}</p>
        <p className="max-w-md leading-relaxed">{formData.alamatKlien}</p>
      </div>

      {/* ISI SURAT - LEGAL WORDING */}
      <div className="text-justify text-sm leading-relaxed mb-6">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-3 indent-8">
          Merujuk pada Perjanjian Kerja Sama / Kontrak Nomor: <strong>{formData.nomorKontrak}</strong> tertanggal <strong>{formData.tanggalKontrak}</strong> (selanjutnya disebut sebagai <strong>"Perjanjian"</strong>) antara <strong>{formData.namaPengirim}</strong> dengan <strong>{formData.namaKlien}</strong>, dengan ini kami bertindak untuk dan atas nama <strong>{formData.namaPengirim}</strong> menyampaikan hal-hal sebagai berikut:
        </p>

        <ol className="list-decimal pl-5 mb-4 space-y-3">
          <li className="pl-2">
            Bahwa berdasarkan catatan administratif dan finansial kami, pihak <strong>{formData.namaKlien}</strong> masih memiliki kewajiban pembayaran yang belum diselesaikan atas tagihan Invoice Nomor: <strong>{formData.nomorInvoice}</strong> yang diterbitkan pada tanggal {formData.tanggalInvoice}.
          </li>
          <li className="pl-2">
            Bahwa batas akhir pembayaran (jatuh tempo) atas Invoice tersebut adalah tanggal <strong>{formData.jatuhTempo}</strong>. Dengan demikian, hingga surat ini diterbitkan, pihak Bapak/Ibu telah mengalami keterlambatan (wanprestasi) selama <strong>{formData.hariKeterlambatan} ({terbilang(formData.hariKeterlambatan)}) hari kalender</strong>.
          </li>
          <li className="pl-2">
            Bahwa sesuai dengan ketentuan denda keterlambatan yang diatur dalam Pasal penalti Perjanjian, setiap keterlambatan pembayaran akan dikenakan denda sebesar <strong>{formData.persentaseDenda}% per hari</strong> dari total nilai pokok tagihan.
          </li>
        </ol>

        <p className="mb-3">
          Oleh karena itu, rincian kewajiban finansial yang <strong>wajib segera dilunasi</strong> adalah sebagai berikut:
        </p>

        {/* TABEL PERHITUNGAN TOTAL - LEGAL */}
        <div className="px-6 mb-6 break-inside-avoid">
          <table className="w-full border-collapse border border-slate-900 text-sm">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-900 p-2 text-center w-12 font-bold">No.</th>
                <th className="border border-slate-900 p-2 text-center font-bold">Uraian / Deskripsi Kewajiban</th>
                <th className="border border-slate-900 p-2 text-center w-48 font-bold">Nominal (IDR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-900 p-2 text-center">1</td>
                <td className="border border-slate-900 p-2">Pokok Tagihan (Ref. {formData.nomorInvoice})</td>
                <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(formData.nilaiPokok)}</td>
              </tr>
              <tr>
                <td className="border border-slate-900 p-2 text-center">2</td>
                <td className="border border-slate-900 p-2">
                  Denda Wanprestasi ({formData.persentaseDenda}% x {formData.hariKeterlambatan} Hari)
                </td>
                <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(nilaiDenda)}</td>
              </tr>
              <tr>
                <td className="border border-slate-900 p-2 text-center">3</td>
                <td className="border border-slate-900 p-2">Biaya Administrasi & Legal</td>
                <td className="border border-slate-900 p-2 text-right font-semibold">{formatRupiah(formData.biayaAdmin)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-100">
                <td colSpan={2} className="border border-slate-900 p-2 text-right font-bold uppercase">
                  Total Kewajiban Terutang
                </td>
                <td className="border border-slate-900 p-2 text-right font-bold text-base underline decoration-double">
                  {formatRupiah(totalTagihan)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mb-4 indent-8 font-semibold text-slate-900">
          Melalui Somasi ini, kami memberikan tenggat waktu selambat-lambatnya 3 (tiga) hari kalender sejak tanggal surat ini agar Bapak/Ibu segera melaksanakan kewajiban pembayaran secara penuh dan tunai (tanpa cicilan) ke rekening bank kami berikut:
        </p>

        <div className="ml-8 mb-4 border border-slate-900 p-3 bg-slate-50 break-inside-avoid max-w-lg">
          <table className="w-full text-sm font-semibold">
            <tbody>
              <tr><td className="w-32 py-1">Nama Bank</td><td className="w-4">:</td><td>{formData.namaBank}</td></tr>
              <tr><td className="py-1">Kantor Cabang</td><td>:</td><td>{formData.cabangBank}</td></tr>
              <tr><td className="py-1">Atas Nama</td><td>:</td><td>{formData.namaRekening}</td></tr>
              <tr><td className="py-1">Nomor Rekening</td><td>:</td><td className="text-lg tracking-widest">{formData.nomorRekening}</td></tr>
            </tbody>
          </table>
        </div>

        <p className="mb-3 indent-8 text-justify">
          Apabila sampai dengan batas waktu yang telah kami tetapkan di atas pihak {formData.namaKlien} gagal atau lalai dalam melaksanakan kewajiban pembayaran, maka <strong>kami berhak secara sepihak menghentikan seluruh layanan/fasilitas</strong>, dan kami mencadangkan hak kami untuk menempuh langkah-langkah hukum yang tegas, baik secara Perdata maupun Pidana, serta melaporkan rekam jejak perusahaan Bapak/Ibu kepada lembaga pemeringkat kredit dan otoritas terkait.
        </p>
        
        <p className="mb-6 indent-8 text-justify">
          Segala biaya tambahan yang timbul akibat upaya hukum penagihan ini (termasuk biaya pengacara/advokat, biaya pengadilan, dan biaya eksekusi) akan sepenuhnya dibebankan kepada pihak {formData.namaKlien}. Mohon kesadaran dan itikad baiknya untuk menyelesaikan persoalan ini secara profesional.
        </p>
        
        <p className="mb-8 text-justify">
          Demikian Somasi ini disampaikan untuk menjadi perhatian serius dan dilaksanakan sebagaimana mestinya. Atas perhatiannya, kami ucapkan terima kasih.
        </p>
      </div>

      {/* TANDA TANGAN & LEGAL CAP */}
      <div className="flex justify-between items-start break-inside-avoid mt-8">
        <div className="text-xs text-slate-600 mt-12 w-64">
          <p className="font-bold underline mb-1">Tembusan:</p>
          <ol className="list-decimal pl-4">
            <li>{formData.tembusan1}</li>
            <li>{formData.tembusan2}</li>
          </ol>
        </div>
        <div className="text-center w-72">
          <p className="text-sm mb-1">Hormat Kami,</p>
          <p className="text-sm font-bold uppercase mb-24">{formData.namaPengirim}</p>
          
          <div className="border-b border-slate-900 pb-1 mb-1 relative">
            {/* Stamp Placeholder Context */}
            <div className="absolute -top-12 -left-6 border-4 border-red-700/20 text-red-700/20 rounded-full w-24 h-24 flex items-center justify-center transform -rotate-12 ">
              <span className="font-bold text-xs text-center leading-tight">LEGAL<br/>DEPT</span>
            </div>
            <p className="font-bold text-sm uppercase">{formData.namaPejabat}</p>
          </div>
          <p className="text-sm italic">{formData.jabatanPejabat}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Penagihan</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[400px] lg:w-[450px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm">Editor Data</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Isi formulir dengan lengkap</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {/* 1. Header Dokumen */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">1. Header Dokumen</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Surat</label>
                  <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Surat</label>
                  <input type="text" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sifat Dokumen</label>
                  <select name="sifatSurat" value={formData.sifatSurat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="BIASA">Biasa</option>
                    <option value="PENTING">Penting</option>
                    <option value="PENTING DAN SEGERA">Penting & Segera</option>
                    <option value="SANGAT RAHASIA">Sangat Rahasia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Perihal / Subjek</label>
                  <select name="perihal" value={formData.perihal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="SOMASI I (PERTAMA) - PERINGATAN JATUH TEMPO PEMBAYARAN">Somasi I</option>
                    <option value="SOMASI II (KEDUA) - PERINGATAN KERAS">Somasi II</option>
                    <option value="SOMASI III (TERAKHIR) - PEMBERITAHUAN LANGKAH HUKUM">Somasi III (Final)</option>
                    <option value="SURAT PENAGIHAN PEMBAYARAN (INVOICE OVERDUE)">Penagihan Biasa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Data Termohon / Klien */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">2. Data Termohon / Klien</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Entitas Hukum</label>
                <input type="text" name="namaKlien" value={formData.namaKlien} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">U.P (Pihak Berkepentingan)</label>
                <input type="text" name="upKlien" value={formData.upKlien} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Domisili Hukum / Alamat</label>
                <textarea name="alamatKlien" value={formData.alamatKlien} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" rows={2}></textarea>
              </div>
            </div>

            {/* 3. Dasar Hukum & Tagihan */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">3. Dasar Hukum & Tagihan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Kontrak/PKS</label>
                  <input type="text" name="nomorKontrak" value={formData.nomorKontrak} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tgl. Kontrak</label>
                  <input type="text" name="tanggalKontrak" value={formData.tanggalKontrak} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Invoice</label>
                  <input type="text" name="nomorInvoice" value={formData.nomorInvoice} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tgl. Jatuh Tempo</label>
                  <input type="text" name="jatuhTempo" value={formData.jatuhTempo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nilai Pokok Kewajiban (Rp)</label>
                <input type="number" name="nilaiPokok" value={formData.nilaiPokok} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Wanprestasi (Hari)</label>
                  <input type="number" name="hariKeterlambatan" value={formData.hariKeterlambatan} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Denda Harian (%)</label>
                  <input type="number" step="0.01" name="persentaseDenda" value={formData.persentaseDenda} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* 4. Instruksi Pembayaran */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">4. Instruksi Pembayaran</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bank Tersandi</label>
                <input type="text" name="namaBank" value={formData.namaBank} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Atas Nama (Beneficiary)</label>
                <input type="text" name="namaRekening" value={formData.namaRekening} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Rekening</label>
                <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold font-mono tracking-widest text-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Biaya Legal / Administrasi (Rp)</label>
                <input type="number" name="biayaAdmin" value={formData.biayaAdmin} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            
            <div className="pb-10"></div>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat Penagihan" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}

function terbilang(angka: number): string {
  const bilangan = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan','Sepuluh','Sebelas'];
  if (angka < 12) return bilangan[angka];
  if (angka < 20) return terbilang(angka - 10) + ' Belas';
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + ' Puluh ' + (angka % 10 !== 0 ? ' ' + terbilang(angka % 10) : '');
  if (angka < 200) return 'Seratus ' + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + ' Ratus ' + (angka % 100 !== 0 ? ' ' + terbilang(angka % 100) : '');
  if (angka < 2000) return 'Seribu ' + terbilang(angka - 1000);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + ' Ribu ' + (angka % 1000 !== 0 ? ' ' + terbilang(angka % 1000) : '');
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + ' Juta ' + (angka % 1000000 !== 0 ? ' ' + terbilang(angka % 1000000) : '');
  return 'Nominal terlalu besar';
}
