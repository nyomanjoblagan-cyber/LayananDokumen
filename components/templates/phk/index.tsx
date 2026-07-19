'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SuratPHKTemplate.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Perjanjian Bersama Pemutusan Hubungan Kerja
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, User, AlertTriangle, DollarSign, CreditCard
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PHKData {
  // Pihak Pertama
  namaPihakPertama: string;
  nikPihakPertama: string;
  ttlPihakPertama: string;
  pekerjaanPihakPertama: string;
  alamatPihakPertama: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;

  // Pihak Kedua
  namaPihakKedua: string;
  nikPihakKedua: string;
  ttlPihakKedua: string;
  pekerjaanPihakKedua: string;
  alamatPihakKedua: string;

  // Detail Surat
  hariTanggalPerjanjian: string;
  tempatPerjanjian: string;
  tanggalMulaiKerja: string;
  tanggalEfektifPHK: string;

  // Alasan
  alasanPHK: string;
  detailAlasan: string;

  // Kompensasi
  uangPesangon: number;
  uangPenghargaanMasaKerja: number;
  uangPenggantianHak: number;
  uangPisah: number;

  // Pembayaran
  metodePembayaran: string;
  tanggalPembayaran: string;
  rekeningBank: string;
  nomorRekening: string;
  atasNamaRekening: string;
  tanggunganPajak: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PHKData = {
  namaPihakPertama: "Budi Santoso",
  nikPihakPertama: "3171234567890001",
  ttlPihakPertama: "Jakarta, 15 Mei 1980",
  pekerjaanPihakPertama: "Direktur HRD",
  alamatPihakPertama: "Jl. Sudirman No. 123, Jakarta Selatan",
  namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
  alamatPerusahaan: "Gedung Menara Merdeka, Jl. Jend. Sudirman Kav 1, Jakarta",

  namaPihakKedua: "Ahmad Fauzi",
  nikPihakKedua: "3179876543210002",
  ttlPihakKedua: "Bandung, 20 Agustus 1990",
  pekerjaanPihakKedua: "Senior Staff Marketing",
  alamatPihakKedua: "Jl. Merdeka No. 45, RT 01/RW 02, Jakarta Barat",

  hariTanggalPerjanjian: "Senin, 11 Agustus 2026",
  tempatPerjanjian: "Jakarta",
  tanggalMulaiKerja: "1 Februari 2020",
  tanggalEfektifPHK: "31 Agustus 2026",

  alasanPHK: "Efisiensi",
  detailAlasan: "Perusahaan melakukan restrukturisasi organisasi dan efisiensi operasional secara menyeluruh guna menjaga keberlangsungan usaha.",

  uangPesangon: 10000000,
  uangPenghargaanMasaKerja: 5000000,
  uangPenggantianHak: 1500000,
  uangPisah: 500000,

  metodePembayaran: "Transfer Tunai Sekaligus",
  tanggalPembayaran: "31 Agustus 2026",
  rekeningBank: "Bank Central Asia (BCA)",
  nomorRekening: "1234567890",
  atasNamaRekening: "Ahmad Fauzi",
  tanggunganPajak: "Sesuai Ketentuan Pajak"
};

// --- HELPERS ---
function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratPHKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian PHK...</div>}>
      <PHKBuilder />
    </Suspense>
  );
}

function PHKBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'phk' | 'kompensasi' | 'pembayaran'>('pihak1');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PHKData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof PHKData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset perjanjian ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const totalKompensasi = data.uangPesangon + data.uangPenghargaanMasaKerja + data.uangPenggantianHak + data.uangPisah;

  const DocumentContent = () => (
    <Kertas>
      {/* Judul Surat */}
      <div className="text-center mb-8 pb-4 border-b-[3px] border-double border-black break-inside-avoid">
        <h1 className="font-bold text-[14pt] uppercase tracking-wide">
          PERJANJIAN BERSAMA PEMUTUSAN HUBUNGAN KERJA
        </h1>
      </div>

      {/* Mukadimah */}
      <div className="text-justify mb-6 break-inside-avoid">
        <p className="mb-4">
          Pada hari ini, <strong>{data.hariTanggalPerjanjian}</strong>, bertempat di <strong>{data.tempatPerjanjian}</strong>, yang bertanda tangan di bawah ini:
        </p>

        <div className="mb-4">
          <div className="flex mb-1">
            <div className="w-8 font-bold">I.</div>
            <div className="flex-1">
              <div className="flex"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaPihakPertama}</div></div>
              <div className="flex"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1">{data.nikPihakPertama}</div></div>
              <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.ttlPihakPertama}</div></div>
              <div className="flex"><div className="w-48">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pekerjaanPihakPertama}</div></div>
              <div className="flex"><div className="w-48">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatPihakPertama}</div></div>
            </div>
          </div>
          <div className="ml-8 mt-2">
            <p>Dalam hal ini bertindak untuk dan atas nama <strong>{data.namaPerusahaan}</strong> yang berkedudukan di {data.alamatPerusahaan}, untuk selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex mb-1">
            <div className="w-8 font-bold">II.</div>
            <div className="flex-1">
              <div className="flex"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaPihakKedua}</div></div>
              <div className="flex"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1">{data.nikPihakKedua}</div></div>
              <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.ttlPihakKedua}</div></div>
              <div className="flex"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pekerjaanPihakKedua}</div></div>
              <div className="flex"><div className="w-48">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatPihakKedua}</div></div>
            </div>
          </div>
          <div className="ml-8 mt-2">
            <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri, untuk selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
          </div>
        </div>

        <p className="mb-4">
          PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>.
        </p>

        <p className="mb-2">PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
        <ol className="list-decimal pl-5 mb-6 space-y-2 ml-4">
          <li>Bahwa PIHAK KEDUA adalah karyawan PIHAK PERTAMA yang telah bekerja sejak tanggal {data.tanggalMulaiKerja} dengan jabatan terakhir sebagai {data.pekerjaanPihakKedua}.</li>
          <li>Bahwa antara PIHAK PERTAMA dan PIHAK KEDUA telah sepakat untuk mengakhiri Hubungan Kerja dengan alasan <strong>{data.alasanPHK}</strong>.</li>
          <li>Bahwa sehubungan dengan pengakhiran hubungan kerja tersebut, PARA PIHAK sepakat untuk menuangkannya dalam suatu Perjanjian Bersama Pemutusan Hubungan Kerja dengan syarat-syarat dan ketentuan sebagai berikut:</li>
        </ol>
      </div>

      {/* Pasal 1 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">
          PASAL 1<br/>KESEPAKATAN PEMUTUSAN HUBUNGAN KERJA
        </div>
        <ol className="list-decimal pl-5 space-y-1 ml-4">
          <li>PARA PIHAK sepakat untuk mengakhiri hubungan kerja terhitung secara efektif sejak tanggal <strong>{data.tanggalEfektifPHK}</strong>.</li>
          <li>Sejak tanggal efektif sebagaimana dimaksud pada Ayat (1), segala hak dan kewajiban ketenagakerjaan antara PARA PIHAK dinyatakan telah berakhir, kecuali hal-hal yang diatur secara spesifik dalam Perjanjian Bersama ini.</li>
        </ol>
      </div>

      {/* Pasal 2 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">
          PASAL 2<br/>ALASAN PEMUTUSAN HUBUNGAN KERJA
        </div>
        <ol className="list-decimal pl-5 space-y-1 ml-4">
          <li>Pemutusan Hubungan Kerja ini dilakukan berdasarkan alasan <strong>{data.alasanPHK}</strong>.</li>
          <li>Bahwa rincian mengenai alasan pemutusan hubungan kerja sebagaimana dimaksud pada Ayat (1) adalah sebagai berikut: {data.detailAlasan}</li>
        </ol>
      </div>

      {/* Pasal 3 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">
          PASAL 3<br/>HAK DAN KOMPENSASI
        </div>
        <ol className="list-decimal pl-5 space-y-1 ml-4">
          <li>
            Atas pemutusan hubungan kerja ini, PIHAK PERTAMA sepakat untuk memberikan dan PIHAK KEDUA sepakat untuk menerima hak kompensasi pemutusan hubungan kerja sesuai dengan Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang beserta aturan pelaksanaannya.
          </li>
          <li>
            Rincian hak dan kompensasi sebagaimana dimaksud pada Ayat (1) yang akan dibayarkan oleh PIHAK PERTAMA kepada PIHAK KEDUA adalah sebagai berikut:
            <div className="mt-3 mb-3 pr-8">
              <table className="w-full border-collapse border border-black text-[10pt]">
                <thead>
                  <tr>
                    <th className="border border-black p-2 bg-slate-100 print:bg-transparent print:border-black w-10 text-center font-bold">No</th>
                    <th className="border border-black p-2 bg-slate-100 print:bg-transparent print:border-black text-left font-bold">Komponen Kompensasi</th>
                    <th className="border border-black p-2 bg-slate-100 print:bg-transparent print:border-black text-right w-48 font-bold">Jumlah (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 text-center">1</td>
                    <td className="border border-black p-2">Uang Pesangon (UP)</td>
                    <td className="border border-black p-2 text-right font-mono">{formatRupiah(data.uangPesangon)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-center">2</td>
                    <td className="border border-black p-2">Uang Penghargaan Masa Kerja (UPMK)</td>
                    <td className="border border-black p-2 text-right font-mono">{formatRupiah(data.uangPenghargaanMasaKerja)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-center">3</td>
                    <td className="border border-black p-2">Uang Penggantian Hak (UPH)</td>
                    <td className="border border-black p-2 text-right font-mono">{formatRupiah(data.uangPenggantianHak)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-center">4</td>
                    <td className="border border-black p-2">Uang Pisah / Lainnya</td>
                    <td className="border border-black p-2 text-right font-mono">{formatRupiah(data.uangPisah)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="border border-black p-2 text-right font-bold bg-slate-50 print:bg-transparent print:border-black">TOTAL KESELURUHAN</td>
                    <td className="border border-black p-2 text-right font-bold bg-slate-50 print:bg-transparent print:border-black font-mono">{formatRupiah(totalKompensasi)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </li>
        </ol>
      </div>

      {/* Pasal 4 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">
          PASAL 4<br/>MEKANISME PEMBAYARAN DAN PAJAK
        </div>
        <ol className="list-decimal pl-5 space-y-1 ml-4">
          <li>
            Pembayaran seluruh kompensasi sebagaimana dimaksud dalam Pasal 3 Ayat (2) akan dilakukan secara <strong>
            {data.metodePembayaran === 'Transfer Tunai Sekaligus' ? 'tunai sekaligus (lump sum)' : 'bertahap (cicilan)'}
            </strong>.
          </li>
          <li>
            Pembayaran tersebut akan ditransfer oleh PIHAK PERTAMA ke rekening bank milik PIHAK KEDUA selambat-lambatnya pada tanggal <strong>{data.tanggalPembayaran}</strong> dengan rincian rekening sebagai berikut:
            <div className="mt-2 mb-2 ml-4">
              <div className="flex"><div className="w-32">Nama Bank</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.rekeningBank}</div></div>
              <div className="flex"><div className="w-32">Nomor Rekening</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.nomorRekening}</div></div>
              <div className="flex"><div className="w-32">Atas Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.atasNamaRekening}</div></div>
            </div>
          </li>
          <li>
            Mengenai kewajiban Pajak Penghasilan (PPh Pasal 21 Final) yang timbul akibat pembayaran kompensasi ini akan 
            {data.tanggunganPajak === 'Ditanggung Perusahaan' ? ' ditanggung sepenuhnya oleh PIHAK PERTAMA (Gross Up).' 
            : data.tanggunganPajak === 'Ditanggung Karyawan' ? ' menjadi beban dan ditanggung oleh PIHAK KEDUA, yang akan dipotong langsung dari total kompensasi.' 
            : ' dihitung, dipotong, dan disetorkan oleh PIHAK PERTAMA sesuai dengan ketentuan peraturan perundang-undangan perpajakan yang berlaku.'}
          </li>
        </ol>
      </div>

      {/* Pasal 5 & 6 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">PASAL 5<br/>PENGEMBALIAN INVENTARIS DAN KERAHASIAAN</div>
        <ol className="list-decimal pl-5 space-y-1 ml-4 mb-4">
          <li>PIHAK KEDUA wajib mengembalikan seluruh fasilitas, barang inventaris, dokumen (fisik maupun digital), identitas (ID Card), dan akses sistem yang merupakan milik PIHAK PERTAMA selambat-lambatnya pada saat tanggal efektif pemutusan hubungan kerja.</li>
          <li>PIHAK KEDUA berkewajiban secara hukum untuk senantiasa menjaga kerahasiaan seluruh informasi, data, dan rahasia dagang milik PIHAK PERTAMA yang diperoleh selama masa kerja, dan dilarang untuk menyalahgunakannya.</li>
        </ol>
        
        <div className="text-center font-bold mb-2 uppercase">PASAL 6<br/>PELEPASAN TUNTUTAN HUKUM (RELEASE AND DISCHARGE)</div>
        <ol className="list-decimal pl-5 space-y-1 ml-4 mb-4">
          <li>Dengan ditandatanganinya Perjanjian Bersama ini dan diterimanya seluruh kompensasi sebagaimana diatur dalam Pasal 3, maka PIHAK KEDUA menyatakan telah menerima seluruh hak-haknya secara penuh dan tuntas.</li>
          <li>PIHAK KEDUA menyatakan melepaskan dan membebaskan PIHAK PERTAMA dari segala macam tuntutan, gugatan, tagihan, dan/atau laporan hukum apapun pada saat ini maupun di masa yang akan datang.</li>
        </ol>
      </div>

      {/* Pasal 7 & 8 */}
      <div className="mb-4 text-justify break-inside-avoid">
        <div className="text-center font-bold mb-2 uppercase">PASAL 7<br/>PENYELESAIAN PERSELISIHAN</div>
        <ol className="list-decimal pl-5 space-y-1 ml-4 mb-4">
          <li>Perjanjian Bersama ini tunduk dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</li>
          <li>Apabila dikemudian hari timbul perbedaan pendapat atau perselisihan atas pelaksanaan Perjanjian Bersama ini, PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah untuk mufakat atau melalui instansi yang bertanggung jawab di bidang ketenagakerjaan.</li>
        </ol>

        <div className="text-center font-bold mb-2 uppercase">PASAL 8<br/>PENUTUP</div>
        <p className="ml-4 pl-1">
          Perjanjian Bersama ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, tanpa adanya paksaan, tekanan, maupun kekhilafan dari pihak manapun, serta dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai yang cukup dan memiliki kekuatan hukum yang sama bagi PARA PIHAK.
        </p>
      </div>

      {/* Footer / Tanda Tangan */}
      <div className="mt-16 flex justify-between px-8 break-inside-avoid">
        <div className="text-center w-64">
          <p className="mb-2 font-bold uppercase">PIHAK PERTAMA<br/>{data.namaPerusahaan}</p>
          <div className="h-24"></div>
          <p className="font-bold underline decoration-1 underline-offset-4 uppercase">{data.namaPihakPertama}</p>
          <p className="uppercase text-xs">{data.pekerjaanPihakPertama}</p>
        </div>
        <div className="text-center w-64">
          <p className="mb-2 font-bold uppercase">PIHAK KEDUA<br/><br/></p>
          <div className="h-20 flex justify-center items-center">
             <div className="border border-dashed border-slate-300 text-slate-300 w-24 h-12 flex items-center justify-center text-[10px] print:hidden">Meterai 10000</div>
          </div>
          <p className="font-bold underline decoration-1 underline-offset-4 uppercase">{data.namaPihakKedua}</p>
          <p className="uppercase text-xs">Karyawan</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">PB Pemutusan Hubungan Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><AlertTriangle size={18} className="text-amber-600" /> Editor Bipartit</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2</button>
                <button onClick={() => setActiveTab('phk')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'phk' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Status</button>
                <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kompensasi' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Nominal</button>
                <button onClick={() => setActiveTab('pembayaran')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pembayaran' ? 'bg-white border-t-2 border-purple-500 text-purple-700' : 'text-slate-500 hover:bg-slate-200'}`}>Bayar</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-blue-600"/> Pihak Pertama (Perusahaan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                          <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                          <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Wakil Perusahaan</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaPihakPertama} onChange={e => handleChange('namaPihakPertama', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nikPihakPertama} onChange={e => handleChange('nikPihakPertama', e.target.value)} />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pekerjaanPihakPertama} onChange={e => handleChange('pekerjaanPihakPertama', e.target.value)} />
                                </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.ttlPihakPertama} onChange={e => handleChange('ttlPihakPertama', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                              <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatPihakPertama} onChange={e => handleChange('alamatPihakPertama', e.target.value)} />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-emerald-600"/> Pihak Kedua (Karyawan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                          <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaPihakKedua} onChange={e => handleChange('namaPihakKedua', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nikPihakKedua} onChange={e => handleChange('nikPihakKedua', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Terakhir</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pekerjaanPihakKedua} onChange={e => handleChange('pekerjaanPihakKedua', e.target.value)} />
                            </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ttlPihakKedua} onChange={e => handleChange('ttlPihakKedua', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                          <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatPihakKedua} onChange={e => handleChange('alamatPihakKedua', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'phk' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <AlertTriangle size={14} className="text-amber-600"/> Detail Status & Alasan
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Perjanjian</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tempatPerjanjian} onChange={e => handleChange('tempatPerjanjian', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari, Tanggal</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.hariTanggalPerjanjian} onChange={e => handleChange('hariTanggalPerjanjian', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai Kerja</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalMulaiKerja} onChange={e => handleChange('tanggalMulaiKerja', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1.5">Tanggal Efektif PHK</label>
                              <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalEfektifPHK} onChange={e => handleChange('tanggalEfektifPHK', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kategori Alasan PHK</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alasanPHK} onChange={e => handleChange('alasanPHK', e.target.value)}>
                                <option value="Efisiensi">Efisiensi</option>
                                <option value="Pelanggaran Berat">Pelanggaran Berat</option>
                                <option value="Perubahan Status Perusahaan">Perubahan Status Perusahaan</option>
                                <option value="Penutupan Perusahaan">Penutupan Perusahaan</option>
                                <option value="Sakit Berkepanjangan">Sakit Berkepanjangan</option>
                                <option value="Keadaan Memaksa (Force Majeure)">Keadaan Memaksa (Force Majeure)</option>
                                <option value="Kesepakatan Bersama">Kesepakatan Bersama</option>
                              </select>
                          </div>
                          <div className="mt-4">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Detail Penjelasan Alasan</label>
                              <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.detailAlasan} onChange={e => handleChange('detailAlasan', e.target.value)} />
                          </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kompensasi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <DollarSign size={14} className="text-red-600"/> Rincian Kompensasi
                    </h3>
                    <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl mb-4 text-[10px] text-rose-800 font-medium leading-relaxed">
                        Pastikan perhitungan disesuaikan dengan UU Cipta Kerja (UU No 6/2023) dan PP No 35/2021 tentang PKWT, Alih Daya, Waktu Kerja, Waktu Istirahat, dan PHK.
                    </div>
                    <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Pesangon (UP) - Rp</label>
                          <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.uangPesangon} onChange={e => handleChange('uangPesangon', parseInt(e.target.value) || 0)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Penghargaan Masa Kerja (UPMK) - Rp</label>
                          <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.uangPenghargaanMasaKerja} onChange={e => handleChange('uangPenghargaanMasaKerja', parseInt(e.target.value) || 0)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Penggantian Hak (UPH) - Rp</label>
                          <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.uangPenggantianHak} onChange={e => handleChange('uangPenggantianHak', parseInt(e.target.value) || 0)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Pisah / Lainnya - Rp</label>
                          <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.uangPisah} onChange={e => handleChange('uangPisah', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="pt-3 border-t-2 border-dashed border-slate-200 flex justify-between items-center bg-slate-50 p-3 rounded-xl mt-4">
                          <span className="font-black text-slate-900 uppercase text-xs">Total</span>
                          <span className="text-red-600 font-bold text-lg">{formatRupiah(totalKompensasi)}</span>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pembayaran' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-purple-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CreditCard size={14} className="text-purple-600"/> Pembayaran & Pajak
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.metodePembayaran} onChange={e => handleChange('metodePembayaran', e.target.value)}>
                                <option value="Transfer Tunai Sekaligus">Tunai Sekaligus</option>
                                <option value="Cicilan">Bertahap (Cicilan)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Maksimal Pembayaran</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggalPembayaran} onChange={e => handleChange('tanggalPembayaran', e.target.value)} />
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4 mt-4">
                          <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Rekening Karyawan</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.rekeningBank} onChange={e => handleChange('rekeningBank', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rekening</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.nomorRekening} onChange={e => handleChange('nomorRekening', e.target.value)} />
                            </div>
                          </div>
                          <div className="mt-3">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Atas Nama (A/N)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.atasNamaRekening} onChange={e => handleChange('atasNamaRekening', e.target.value)} />
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4 mt-4">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ketentuan Pajak (PPh 21 Final)</label>
                          <select className="w-full bg-purple-50 p-2.5 border border-purple-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggunganPajak} onChange={e => handleChange('tanggunganPajak', e.target.value)}>
                            <option value="Sesuai Ketentuan Pajak">Diproses Sesuai Ketentuan Pajak</option>
                            <option value="Ditanggung Perusahaan">Ditanggung Perusahaan (Gross Up)</option>
                            <option value="Ditanggung Karyawan">Ditanggung Karyawan (Dipotong)</option>
                          </select>
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Perjanjian_PHK_${data.namaPihakKedua.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
