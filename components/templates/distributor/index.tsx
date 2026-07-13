'use client';

/**
 * FILE: distributor-draft.tsx
 * STATUS: PRODUCTION READY (WITH MONETIZATION)
 * DESC: Generator Perjanjian Keagenan/Distributor (Corporate Grade)
 * FEATURES:
 * - Strict A4 Print Layout (MS Word standard via HTML semantics)
 * - Mobile Menu Fixed
 * - Integrated Ad Banner Space & Saweria Donation Modal
 * - Klausul Korporat: Target Penjualan Minimal & Hak Pencabutan Lisensi Sepihak
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  Building2, UserCircle2, CalendarRange, Scale, Target, 
  Banknote, PackageSearch, Briefcase, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DistributorData {
  // Kop Surat & Perjanjian
  docNumber: string;
  docDay: string;
  docDate: string;
  city: string;

  // Pihak Pertama (Principal)
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Occupation: string;
  pihak1Address: string;
  pihak1Company: string;
  pihak1Position: string;

  // Pihak Kedua (Distributor)
  pihak2Name: string;
  pihak2Nik: string;
  pihak2Pob: string;
  pihak2Dob: string;
  pihak2Occupation: string;
  pihak2Address: string;
  pihak2Company: string; 
  pihak2Position: string;

  // Pasal-Pasal
  produk: string;
  wilayah: string;
  masaBerlaku: string;
  startDate: string;
  endDate: string;
  
  targetKuantitas: string;
  targetPeriode: string;
  
  paymentMethod: string;
  penaltyFee: string;
  
  pengadilan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DistributorData = {
  docNumber: '088/DIST-PMJ/XII/2026',
  docDay: 'Rabu',
  docDate: '15 Desember 2026',
  city: 'Jakarta Selatan',

  pihak1Name: 'ANDI WIJAYA',
  pihak1Nik: '3174092801850001',
  pihak1Pob: 'Jakarta',
  pihak1Dob: '28 Januari 1985',
  pihak1Occupation: 'Wiraswasta',
  pihak1Address: 'Jl. Sudirman No. 45, RT.001/RW.002, Senayan, Kebayoran Baru, Jakarta Selatan',
  pihak1Company: 'PT PANGAN MAJU JAYA',
  pihak1Position: 'Direktur Utama',

  pihak2Name: 'SITI AMINAH',
  pihak2Nik: '3171051508820004',
  pihak2Pob: 'Bandung',
  pihak2Dob: '15 Agustus 1982',
  pihak2Occupation: 'Wiraswasta',
  pihak2Address: 'Jl. Raya Bogor KM 24, RT.005/RW.003, Ciracas, Jakarta Timur',
  pihak2Company: 'CV BERKAH UTAMA',
  pihak2Position: 'Direktur',

  produk: 'Mesin Kopi Espresso Otomatis Seri X',
  wilayah: 'Daerah Khusus Ibukota Jakarta dan sekitarnya',
  masaBerlaku: '2 (dua) Tahun',
  startDate: '1 Januari 2027',
  endDate: '31 Desember 2028',
  
  targetKuantitas: '100 (Seratus)',
  targetPeriode: 'Kuartal',
  
  paymentMethod: 'Cash Before Delivery (CBD)',
  penaltyFee: '0.5%',
  
  pengadilan: 'Pengadilan Negeri Jakarta Selatan'
};

// --- 3. KOMPONEN UTAMA ---
export default function PerjanjianDistributorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <DistributorBuilder />
    </Suspense>
  );
}

function DistributorBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [data, setData] = useState<DistributorData>(INITIAL_DATA);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof DistributorData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  // --- KONTEN SURAT (PRINT READY) ---
  const ContentInside = () => {
    return (
      <div className="font-serif text-[11pt] leading-relaxed text-black">
         {/* JUDUL */}
         <div className="text-center font-bold mb-8">
            <h1 className="text-[14pt] uppercase underline decoration-2 underline-offset-4 mb-1">PERJANJIAN KEAGENAN DAN DISTRIBUSI</h1>
            <p className="text-[11pt]">Nomor: {data.docNumber}</p>
         </div>

         {/* MUKADIMAH */}
         <div className="text-justify mb-6">
            <p className="mb-4">
              Pada hari ini, <b>{data.docDay}</b>, tanggal <b>{data.docDate}</b>, bertempat di <b>{data.city}</b>, yang bertanda tangan di bawah ini:
            </p>

            <ol className="list-decimal ml-5 space-y-6 mb-6">
               <li className="pl-2">
                  <div className="mb-2">
                     <div className="flex"><span className="w-40 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold">{data.pihak1Name}</span></div>
                     <div className="flex"><span className="w-40 inline-block">N.I.K</span><span className="mr-2">:</span><span>{data.pihak1Nik}</span></div>
                     <div className="flex"><span className="w-40 inline-block">Tempat/Tgl Lahir</span><span className="mr-2">:</span><span>{data.pihak1Pob}, {data.pihak1Dob}</span></div>
                     <div className="flex"><span className="w-40 inline-block">Pekerjaan</span><span className="mr-2">:</span><span>{data.pihak1Occupation}</span></div>
                     <div className="flex"><span className="w-40 inline-block align-top">Alamat (Sesuai KTP)</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1">{data.pihak1Address}</span></div>
                  </div>
                  <p className="text-justify mt-2">
                     Dalam hal ini bertindak dalam jabatannya selaku <b>{data.pihak1Position}</b>, dari dan oleh karena itu sah bertindak untuk dan atas nama <b>{data.pihak1Company}</b>. Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK PERTAMA (Principal)</b>.
                  </p>
               </li>

               <li className="pl-2">
                  <div className="mb-2">
                     <div className="flex"><span className="w-40 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold">{data.pihak2Name}</span></div>
                     <div className="flex"><span className="w-40 inline-block">N.I.K</span><span className="mr-2">:</span><span>{data.pihak2Nik}</span></div>
                     <div className="flex"><span className="w-40 inline-block">Tempat/Tgl Lahir</span><span className="mr-2">:</span><span>{data.pihak2Pob}, {data.pihak2Dob}</span></div>
                     <div className="flex"><span className="w-40 inline-block">Pekerjaan</span><span className="mr-2">:</span><span>{data.pihak2Occupation}</span></div>
                     <div className="flex"><span className="w-40 inline-block align-top">Alamat (Sesuai KTP)</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1">{data.pihak2Address}</span></div>
                  </div>
                  <p className="text-justify mt-2">
                     Dalam hal ini bertindak dalam jabatannya selaku <b>{data.pihak2Position}</b>, dari dan oleh karena itu sah bertindak untuk dan atas nama <b>{data.pihak2Company}</b>. Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK KEDUA (Distributor)</b>.
                  </p>
               </li>
            </ol>

            <p className="text-justify">
               PIHAK PERTAMA dan PIHAK KEDUA (secara bersama-sama disebut "Para Pihak" dan masing-masing disebut "Pihak") terlebih dahulu menerangkan hal-hal sebagai berikut:
            </p>
            <ul className="list-disc ml-10 space-y-2 mt-2 mb-6 text-justify">
               <li>Bahwa PIHAK PERTAMA adalah perusahaan yang bergerak di bidang penyediaan, produksi, dan/atau distribusi produk {data.produk}.</li>
               <li>Bahwa PIHAK KEDUA memiliki kemampuan, jaringan, dan fasilitas yang memadai untuk bertindak sebagai distributor/agen penjual produk-produk tersebut di wilayah yang disepakati.</li>
            </ul>
            <p className="text-justify">
               Berdasarkan hal-hal tersebut di atas, Para Pihak sepakat untuk mengikatkan diri dalam Perjanjian Keagenan dan Distribusi ("Perjanjian") dengan syarat-syarat dan ketentuan-ketentuan sebagaimana diuraikan dalam Pasal-pasal di bawah ini:
            </p>
         </div>

         {/* PASAL 1 */}
         <div className="text-center font-bold mb-4 mt-8 break-before-auto">
             <p>PASAL 1</p>
             <p>DEFINISI</p>
         </div>
         <p className="text-justify mb-2">Dalam Perjanjian ini, kecuali konteksnya menentukan lain, istilah-istilah di bawah ini memiliki pengertian sebagai berikut:</p>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2"><b>"Produk"</b> adalah barang-barang yang diproduksi dan/atau disediakan oleh PIHAK PERTAMA, yaitu secara khusus berupa <b>{data.produk}</b>.</li>
             <li className="pl-2"><b>"Wilayah Kerja"</b> adalah area geografis yang diberikan hak kepada PIHAK KEDUA untuk mendistribusikan Produk, yaitu meliputi wilayah <b>{data.wilayah}</b>.</li>
             <li className="pl-2"><b>"Target Penjualan"</b> adalah kuota minimum pembelian atau penjualan Produk yang wajib dicapai oleh PIHAK KEDUA dalam periode yang telah disepakati oleh Para Pihak.</li>
         </ol>

         {/* PASAL 2 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 2</p>
             <p>OBJEK PERJANJIAN DAN WILAYAH KERJA</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">PIHAK PERTAMA dengan ini menunjuk PIHAK KEDUA, dan PIHAK KEDUA menerima penunjukan tersebut, sebagai Distributor untuk memasarkan, menjual, dan mendistribusikan Produk di dalam Wilayah Kerja.</li>
             <li className="pl-2">Hak distribusi yang diberikan kepada PIHAK KEDUA bersifat non-eksklusif, sehingga PIHAK PERTAMA tetap memiliki kebebasan dan hak untuk menunjuk distributor lain di dalam maupun di luar Wilayah Kerja, kecuali disepakati lain secara tertulis.</li>
             <li className="pl-2">PIHAK KEDUA dilarang secara aktif mencari pembeli, mengekspor, atau mendirikan cabang untuk penjualan Produk di luar Wilayah Kerja tanpa persetujuan tertulis sebelumnya dari PIHAK PERTAMA.</li>
         </ol>

         {/* PASAL 3 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 3</p>
             <p>HAK DAN KEWAJIBAN PARA PIHAK</p>
         </div>
         <ol className="list-decimal ml-6 space-y-4 mb-6 text-justify">
             <li className="pl-2">
                 <b>Hak dan Kewajiban PIHAK PERTAMA:</b>
                 <ul className="list-[lower-alpha] ml-5 mt-2 space-y-2">
                     <li className="pl-2">Menerima pembayaran penuh atas Produk yang dipesan dan diserahkan kepada PIHAK KEDUA.</li>
                     <li className="pl-2">Menyediakan Produk secara tepat waktu dan dalam kondisi baik sesuai dengan pesanan (Purchase Order) yang disetujui.</li>
                     <li className="pl-2">Memberikan dukungan pemasaran, materi promosi, serta informasi teknis terkait Produk kepada PIHAK KEDUA secara wajar.</li>
                 </ul>
             </li>
             <li className="pl-2">
                 <b>Hak dan Kewajiban PIHAK KEDUA:</b>
                 <ul className="list-[lower-alpha] ml-5 mt-2 space-y-2">
                     <li className="pl-2">Menerima Produk yang dipesan dari PIHAK PERTAMA dalam keadaan baik dan sesuai spesifikasi.</li>
                     <li className="pl-2">Melakukan usaha komersial terbaik (best effort) untuk mempromosikan, memasarkan, dan menjual Produk secara maksimal di dalam Wilayah Kerja.</li>
                     <li className="pl-2">Menjaga standar kualitas layanan, reputasi bisnis, dan nama baik (goodwill) PIHAK PERTAMA di mata konsumen.</li>
                     <li className="pl-2">Mematuhi kebijakan harga jual ritel minimal (Minimum Retail Price) yang mungkin ditetapkan oleh PIHAK PERTAMA dari waktu ke waktu.</li>
                     <li className="pl-2">Menyediakan fasilitas penyimpanan, sistem logistik, dan gudang yang layak untuk menjaga mutu serta keutuhan Produk.</li>
                 </ul>
             </li>
         </ol>

         {/* PASAL 4 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 4</p>
             <p>TARGET PENJUALAN MINIMAL DAN EVALUASI (SALES QUOTA)</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Sebagai syarat keberlangsungan kedudukan sebagai Distributor, PIHAK KEDUA wajib memenuhi Target Penjualan Minimal (Minimum Sales/Purchase Quota) sebesar <b>{data.targetKuantitas} unit per {data.targetPeriode}</b>.</li>
             <li className="pl-2">Evaluasi terhadap pencapaian Target Penjualan sebagaimana dimaksud pada Ayat 1 akan dilakukan oleh PIHAK PERTAMA pada setiap akhir {data.targetPeriode}.</li>
             <li className="pl-2">Apabila PIHAK KEDUA gagal mencapai Target Penjualan Minimal selama <b>2 (dua) kuartal berturut-turut</b>, maka PIHAK PERTAMA secara mutlak memiliki <b>Hak Pencabutan Lisensi Sepihak</b>.</li>
             <li className="pl-2">Dalam hal terjadinya kegagalan pemenuhan target sebagaimana diatur pada Ayat 3, PIHAK PERTAMA dapat mengakhiri Perjanjian ini secara sepihak dan seketika dengan menyampaikan pemberitahuan tertulis kepada PIHAK KEDUA selambat-lambatnya 14 (empat belas) hari kalender sebelumnya, tanpa PIHAK PERTAMA dikenakan denda, ganti rugi, atau kompensasi apapun terhadap PIHAK KEDUA.</li>
         </ol>

         {/* PASAL 5 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 5</p>
             <p>HARGA, PEMBAYARAN, DAN PENYERAHAN BARANG</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Harga Produk yang berlaku untuk PIHAK KEDUA adalah harga yang tercantum dalam daftar harga resmi (Price List) terbaru yang diterbitkan oleh PIHAK PERTAMA. PIHAK PERTAMA berhak mengubah harga sewaktu-waktu dengan memberikan pemberitahuan tertulis sebelumnya kepada PIHAK KEDUA.</li>
             <li className="pl-2">Pembayaran atas setiap pembelian Produk wajib dilakukan oleh PIHAK KEDUA melalui metode <b>{data.paymentMethod}</b> dengan cara transfer ke rekening bank yang ditunjuk secara resmi oleh PIHAK PERTAMA.</li>
             <li className="pl-2">Dalam hal PIHAK KEDUA lalai atau terlambat melakukan pembayaran sesuai dengan jatuh tempo yang disepakati, maka PIHAK KEDUA akan dikenakan denda keterlambatan sebesar <b>{data.penaltyFee} per hari keterlambatan</b>, yang dihitung dari total tagihan terutang hingga pembayaran lunas.</li>
             <li className="pl-2">Penyerahan Produk akan dilakukan di titik penyerahan yang disepakati, dan segala risiko atas kerusakan atau kehilangan Produk beralih sepenuhnya kepada PIHAK KEDUA sejak penandatanganan Surat Jalan atau Berita Acara Serah Terima Barang.</li>
         </ol>

         {/* PASAL 6 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 6</p>
             <p>MASA BERLAKU DAN PENGAKHIRAN PERJANJIAN</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Perjanjian ini berlaku untuk jangka waktu <b>{data.masaBerlaku}</b>, terhitung efektif sejak tanggal <b>{data.startDate}</b> dan akan berakhir pada tanggal <b>{data.endDate}</b>.</li>
             <li className="pl-2">Perjanjian dapat diperpanjang berdasarkan kesepakatan tertulis Para Pihak yang dibuat selambat-lambatnya 30 (tiga puluh) hari sebelum masa berlaku Perjanjian berakhir.</li>
             <li className="pl-2">Selain ketentuan pengakhiran karena gagal target sebagaimana diatur pada Pasal 4, PIHAK PERTAMA berhak mengakhiri Perjanjian secara sepihak dan seketika apabila PIHAK KEDUA terbukti melakukan wanprestasi berat, penipuan, pemalsuan, penggelapan, atau dinyatakan pailit/likuidasi oleh Pengadilan.</li>
             <li className="pl-2">Berkenaan dengan pengakhiran Perjanjian ini, Para Pihak sepakat untuk mengesampingkan ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata Indonesia sejauh yang mensyaratkan adanya putusan pengadilan untuk membatalkan suatu perjanjian.</li>
         </ol>

         {/* PASAL 7 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 7</p>
             <p>KEKAYAAN INTELEKTUAL DAN KERAHASIAAN</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Semua merek dagang, logo, desain, hak cipta, paten, dan hak kekayaan intelektual lainnya yang melekat pada Produk merupakan milik sah secara hukum dari PIHAK PERTAMA. PIHAK KEDUA hanya diberikan hak penggunaan secara terbatas selama masa berlaku Perjanjian semata-mata untuk tujuan pemasaran dan penjualan.</li>
             <li className="pl-2">PIHAK KEDUA secara tegas dilarang memproduksi ulang, melakukan rekayasa balik (reverse engineering), menyalin, atau mengubah Produk beserta kemasannya, baik sebagian maupun seluruhnya.</li>
             <li className="pl-2">Para Pihak wajib menjaga kerahasiaan seluruh informasi bisnis, strategis, finansial, teknis, dan daftar pelanggan yang diperoleh selama pelaksanaan Perjanjian ini (Confidential Information), dan dilarang menyebarkannya kepada pihak ketiga tanpa persetujuan tertulis pihak lainnya, baik selama Perjanjian berlangsung maupun setelah berakhir.</li>
         </ol>

         {/* PASAL 8 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 8</p>
             <p>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Tidak ada pihak yang dianggap lalai atau melanggar Perjanjian ini apabila keterlambatan atau kegagalan pelaksanaan kewajibannya disebabkan oleh Keadaan Memaksa (Force Majeure).</li>
             <li className="pl-2">Force Majeure mencakup, namun tidak terbatas pada, bencana alam (gempa bumi, banjir, gunung meletus), perang, huru-hara, pemberontakan, pemogokan massal, pandemi global, dan/atau perubahan peraturan pemerintah yang secara langsung menghalangi pelaksanaan Perjanjian.</li>
             <li className="pl-2">Pihak yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari kalender setelah terjadinya peristiwa tersebut, lengkap dengan bukti pendukung dari instansi yang berwenang.</li>
         </ol>

         {/* PASAL 9 */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 9</p>
             <p>PENYELESAIAN SENGKETA</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-6 text-justify">
             <li className="pl-2">Segala perselisihan, perbedaan pendapat, atau sengketa yang timbul dari atau sehubungan dengan pelaksanaan Perjanjian ini akan diselesaikan oleh Para Pihak terlebih dahulu melalui musyawarah untuk mufakat.</li>
             <li className="pl-2">Apabila musyawarah tidak menghasilkan kesepakatan dalam jangka waktu 30 (tiga puluh) hari kalender sejak perselisihan tersebut diberitahukan secara tertulis, maka Para Pihak sepakat untuk menyelesaikan sengketa tersebut secara hukum dan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan <b>{data.pengadilan}</b>.</li>
         </ol>

         {/* PASAL 10 (PENUTUP) */}
         <div className="text-center font-bold mb-4 mt-8 break-inside-avoid">
             <p>PASAL 10</p>
             <p>PENUTUP</p>
         </div>
         <ol className="list-decimal ml-6 space-y-2 mb-8 text-justify">
             <li className="pl-2">Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian ini akan diputuskan kemudian oleh Para Pihak dan akan dituangkan dalam suatu Adendum atau Perjanjian Tambahan yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.</li>
             <li className="pl-2">Perjanjian ini dibuat dan ditandatangani oleh Para Pihak di <b>{data.city}</b> pada tanggal, bulan, dan tahun sebagaimana disebutkan pada bagian awal Perjanjian, dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan atau tekanan dari pihak manapun.</li>
         </ol>

         <p className="text-justify mb-12">
             Demikian Perjanjian ini dibuat dalam 2 (dua) rangkap bermeterai cukup, yang masing-masing memiliki kekuatan hukum pembuktian yang sama dan dipegang oleh masing-masing Pihak.
         </p>

         {/* TANDA TANGAN */}
         <div className="mt-8 pt-4 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center">
               <div className="flex flex-col items-center">
                  <p className="mb-2 font-bold uppercase text-[11pt]">PIHAK PERTAMA</p>
                  <p className="mb-24 text-[10pt]">{data.pihak1Company}</p>
                  <p className="font-bold underline uppercase w-full pb-1">{data.pihak1Name}</p>
                  <p className="text-[10pt]">{data.pihak1Position}</p>
               </div>
               <div className="flex flex-col items-center">
                  <p className="mb-2 font-bold uppercase text-[11pt]">PIHAK KEDUA</p>
                  <p className="mb-24 text-[10pt]">{data.pihak2Company}</p>
                  <p className="font-bold underline uppercase w-full pb-1">{data.pihak2Name}</p>
                  <p className="text-[10pt]">{data.pihak2Position}</p>
               </div>
            </div>
         </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED UNTUK MS WORD STYLE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 25mm 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Distributor <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[460px] lg:w-[500px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:block print:overflow-visible print:bg-white">
               
               {/* 0. INFORMASI DOKUMEN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Informasi Dokumen</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Perjanjian</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.docNumber} onChange={e => handleDataChange('docNumber', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Hari Penandatanganan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.docDay} onChange={e => handleDataChange('docDay', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.docDate} onChange={e => handleDataChange('docDate', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota Penandatanganan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                  </div>
               </div>

               {/* 1. PIHAK 1 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Pihak Pertama (Principal)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Perusahaan Principal</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Company} onChange={e => handleDataChange('pihak1Company', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Penanggung Jawab</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Position} onChange={e => handleDataChange('pihak1Position', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK (KTP)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Pob} onChange={e => handleDataChange('pihak1Pob', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Dob} onChange={e => handleDataChange('pihak1Dob', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Occupation} onChange={e => handleDataChange('pihak1Occupation', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat KTP Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. PIHAK 2 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Pihak Kedua (Distributor)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Perusahaan/Toko</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Company} onChange={e => handleDataChange('pihak2Company', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Penanggung Jawab</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Name} onChange={e => handleDataChange('pihak2Name', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Position} onChange={e => handleDataChange('pihak2Position', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK (KTP)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Pob} onChange={e => handleDataChange('pihak2Pob', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Dob} onChange={e => handleDataChange('pihak2Dob', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Occupation} onChange={e => handleDataChange('pihak2Occupation', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat KTP Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Address} onChange={e => handleDataChange('pihak2Address', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. RUANG LINGKUP & JANGKA WAKTU */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><PackageSearch size={12}/> Objek & Jangka Waktu</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Deskripsi Produk Utama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.produk} onChange={e => handleDataChange('produk', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Wilayah Kerja Distribusi</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-14 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wilayah} onChange={e => handleDataChange('wilayah', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Masa Berlaku Total</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.masaBerlaku} onChange={e => handleDataChange('masaBerlaku', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Mulai Berlaku</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Berakhir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                  </div>
               </div>

               {/* 4. TARGET, PEMBAYARAN & SENGKETA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Target size={12}/> Target, Pembayaran & Legal</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kuota Minimum</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetKuantitas} onChange={e => handleDataChange('targetKuantitas', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Per Periode</label>
                              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.targetPeriode} onChange={e => handleDataChange('targetPeriode', e.target.value)}>
                                  <option value="Bulan">Bulan</option>
                                  <option value="Kuartal">Kuartal</option>
                                  <option value="Semester">Semester</option>
                                  <option value="Tahun">Tahun</option>
                              </select>
                          </div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Metode Pembayaran</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Denda Keterlambatan Pembayaran</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penaltyFee} onChange={e => handleDataChange('penaltyFee', e.target.value)} /></div>
                      <div className="space-y-1 pt-2 border-t border-dashed border-slate-200"><label className="text-[10px] font-bold text-slate-500">Pengadilan Penyelesaian Sengketa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pengadilan} onChange={e => handleDataChange('pengadilan', e.target.value)} /></div>
                  </div>
               </div>

               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center print:block print:overflow-visible print:bg-white print:static">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:block print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '25mm 20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Distributor (Korporat)" price={35000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static bg-white">
         <ContentInside />
      </div>
    </div>
  );
}

// FORCE-HMR-UPDATE
