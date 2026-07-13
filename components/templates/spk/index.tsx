'use client';

/**
 * FILE: components/templates/spk/index.tsx
 * STATUS: PRODUCTION READY (FIXED SCOPE & FULL FEATURE)
 * DESC: Generator Surat Perintah Kerja (SPK) Commercial Ironclad - Enterprise Grade
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  CalendarDays, Wallet, Receipt, Edit3, RotateCcw, ArrowLeftCircle, 
  HardHat, FileSignature, MapPin, Calculator, BookOpenCheck
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI (Pastikan file ini tersedia di project Anda)
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. UTILITAS TERBILANG ---
function terbilang(angka: number): string {
  const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  let res = "";
  if (angka < 12) res = huruf[angka];
  else if (angka < 20) res = terbilang(angka - 10) + " Belas";
  else if (angka < 100) res = terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
  else if (angka < 200) res = "Seratus " + terbilang(angka - 100);
  else if (angka < 1000) res = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
  else if (angka < 2000) res = "Seribu " + terbilang(angka - 1000);
  else if (angka < 1000000) res = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
  else if (angka < 1000000000) res = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
  else if (angka < 1000000000000) res = terbilang(Math.floor(angka / 1000000000)) + " Milyar " + terbilang(angka % 1000000000);
  else if (angka < 1000000000000000) res = terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
  return res.trim().replace(/\s+/g, ' ');
}

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(num);
};

// --- 2. TYPE DEFINITIONS ---
interface SpkData {
  docNo: string;
  docDate: string;
  city: string;
  
  // Pihak Pertama (Pemberi Tugas)
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Birth: string;
  pihak1Job: string;
  pihak1Address: string;
  pihak1Role: string; 

  // Pihak Kedua (Pelaksana / Kontraktor)
  pihak2Name: string;
  pihak2Nik: string;
  pihak2Birth: string;
  pihak2Job: string;
  pihak2Address: string;
  pihak2Role: string;

  // Proyek Details
  projectName: string;
  projectLocation: string;
  startDate: string;
  endDate: string;

  // Nilai Pekerjaan & Pembayaran
  totalAmount: number;
  dpPercent: number;     
  retensiPercent: number;
  bankAccount: string;
  
  // Masa Pemeliharaan & Denda
  masaPemeliharaan: string; 
  dendaPerHari: string; 
}

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: SpkData = {
  docNo: 'SPK/001/ENG/2026',
  docDate: 'Kamis, 15 Agustus 2026',
  city: 'Jakarta Selatan',
  
  pihak1Name: 'Hendra Kusuma, ST.',
  pihak1Nik: '3174092801850001',
  pihak1Birth: 'Jakarta, 28 Januari 1985',
  pihak1Job: 'Direktur Utama',
  pihak1Address: 'Jl. Jend. Sudirman Kav 50, Plaza Abadi Lantai 12, Kel. Karet Semanggi, Kec. Setiabudi, Jakarta Selatan',
  pihak1Role: 'PT. DINAMIKA CIPTA MANDIRI',
  
  pihak2Name: 'Budi Santoso, MT.',
  pihak2Nik: '3201011506820002',
  pihak2Birth: 'Bandung, 15 Juni 1982',
  pihak2Job: 'Direktur Operasional',
  pihak2Address: 'Komp. Buah Batu Indah Blok C No. 12, Kel. Turangga, Kec. Lengkong, Kota Bandung',
  pihak2Role: 'PT. BANGUN KARYA PERSADA',

  projectName: 'Pekerjaan Renovasi Interior Kantor Area Lobby dan Ruang Meeting',
  projectLocation: 'Gedung Office 8, Lantai Dasar, Senopati, Jakarta Selatan',
  startDate: '20 Agustus 2026',
  endDate: '20 Oktober 2026',

  totalAmount: 450000000,
  dpPercent: 30,
  retensiPercent: 5,
  bankAccount: 'Bank Mandiri 123-456-7890 a.n PT Bangun Karya Persada',

  masaPemeliharaan: '90 (sembilan puluh)',
  dendaPerHari: '1/1000 (satu permil)'
};

export default function SpkGeneratorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs bg-slate-50 uppercase tracking-widest font-bold">Memuat Editor SPK...</div>}>
      <SpkBuilder />
    </Suspense>
  );
}

function SpkBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SpkData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof SpkData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data dokumen?')) {
        setData({ ...INITIAL_DATA });
    }
  };

  // Kalkulasi Termin
  const termin2Percent = 100 - data.dpPercent - data.retensiPercent;
  const dpAmount = (data.dpPercent / 100) * data.totalAmount;
  const retensiAmount = (data.retensiPercent / 100) * data.totalAmount;
  const termin2Amount = (termin2Percent / 100) * data.totalAmount;

  const totalAmountText = terbilang(data.totalAmount) + " Rupiah";
  const dpAmountText = terbilang(dpAmount) + " Rupiah";
  const termin2AmountText = terbilang(termin2Amount) + " Rupiah";
  const retensiAmountText = terbilang(retensiAmount) + " Rupiah";

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border text-black leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto font-serif text-[11pt]">
      
      {/* JUDUL DOKUMEN */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold uppercase underline underline-offset-4 tracking-wider">SURAT PERINTAH KERJA (SPK)</h2>
        <p className="mt-1 font-bold font-sans text-[10pt]">Nomor: {data.docNo}</p>
      </div>
      
      <p className="mb-4 text-justify">
        Pada hari ini, <b>{data.docDate}</b>, bertempat di <b>{data.city}</b>, kami yang bertanda tangan di bawah ini:
      </p>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 ml-4 break-inside-avoid">
        <div className="flex mb-1">
          <span className="w-6 font-bold">I.</span>
          <div className="flex-1">
            <div className="flex"><span className="w-48">Nama Lengkap</span><span className="w-4">:</span><span className="font-bold">{data.pihak1Name}</span></div>
            <div className="flex"><span className="w-48">NIK</span><span className="w-4">:</span><span>{data.pihak1Nik}</span></div>
            <div className="flex"><span className="w-48">Tempat, Tanggal Lahir</span><span className="w-4">:</span><span>{data.pihak1Birth}</span></div>
            <div className="flex"><span className="w-48">Pekerjaan</span><span className="w-4">:</span><span>{data.pihak1Job}</span></div>
            <div className="flex"><span className="w-48">Alamat KTP</span><span className="w-4">:</span><span className="flex-1 text-justify">{data.pihak1Address}</span></div>
            <p className="mt-2 text-justify">
              Dalam hal ini bertindak untuk dan atas nama <b>{data.pihak1Role}</b>, yang selanjutnya dalam perjanjian ini disebut sebagai <b>PIHAK PERTAMA (Pemberi Tugas)</b>.
            </p>
          </div>
        </div>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-6 ml-4 break-inside-avoid">
        <div className="flex mb-1">
          <span className="w-6 font-bold">II.</span>
          <div className="flex-1">
            <div className="flex"><span className="w-48">Nama Lengkap</span><span className="w-4">:</span><span className="font-bold">{data.pihak2Name}</span></div>
            <div className="flex"><span className="w-48">NIK</span><span className="w-4">:</span><span>{data.pihak2Nik}</span></div>
            <div className="flex"><span className="w-48">Tempat, Tanggal Lahir</span><span className="w-4">:</span><span>{data.pihak2Birth}</span></div>
            <div className="flex"><span className="w-48">Pekerjaan</span><span className="w-4">:</span><span>{data.pihak2Job}</span></div>
            <div className="flex"><span className="w-48">Alamat KTP</span><span className="w-4">:</span><span className="flex-1 text-justify">{data.pihak2Address}</span></div>
            <p className="mt-2 text-justify">
              Dalam hal ini bertindak untuk dan atas nama <b>{data.pihak2Role}</b>, yang selanjutnya dalam perjanjian ini disebut sebagai <b>PIHAK KEDUA (Pelaksana Tugas / Kontraktor)</b>.
            </p>
          </div>
        </div>
      </div>

      <p className="mb-4 text-justify">
        PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya secara bersama-sama disebut sebagai "PARA PIHAK") terlebih dahulu menerangkan hal-hal sebagai berikut:
      </p>
      
      <div className="mb-6 ml-4">
        <ol className="list-[lower-alpha] list-outside ml-4 space-y-2 text-justify">
          <li className="pl-2">Bahwa PIHAK PERTAMA adalah pihak yang memiliki kebutuhan dan anggaran untuk melaksanakan pekerjaan <b>{data.projectName}</b>.</li>
          <li className="pl-2">Bahwa PIHAK KEDUA adalah pihak yang memiliki keahlian, pengalaman, dan sumber daya untuk melaksanakan pekerjaan yang diminta oleh PIHAK PERTAMA.</li>
          <li className="pl-2">Bahwa PIHAK KEDUA telah menyatakan kesanggupan secara penuh dan mengikatkan diri untuk melaksanakan pekerjaan tersebut.</li>
        </ol>
      </div>

      <p className="mb-8 text-justify">
        Berdasarkan hal-hal tersebut di atas, PARA PIHAK telah sepakat dan setuju untuk mengikatkan diri dalam Surat Perintah Kerja ini dengan ketentuan dan syarat-syarat yang diatur dalam pasal-pasal berikut:
      </p>

      {/* PASAL 1 */}
      <div className="mb-4 text-center">
        <h3 className="font-bold uppercase">PASAL 1</h3>
        <h3 className="font-bold uppercase tracking-wide">MAKSUD DAN TUJUAN</h3>
      </div>
      <p className="mb-6 text-justify">
        PIHAK PERTAMA dengan ini menunjuk dan memberikan tugas kepada PIHAK KEDUA, dan PIHAK KEDUA menyatakan menerima dengan baik penunjukan tersebut untuk melaksanakan <b>{data.projectName}</b> sesuai dengan spesifikasi teknis dan instruksi dari PIHAK PERTAMA.
      </p>

      {/* PASAL 2 */}
      <div className="mb-4 text-center">
        <h3 className="font-bold uppercase">PASAL 2</h3>
        <h3 className="font-bold uppercase tracking-wide">LINGKUP PEKERJAAN DAN LOKASI</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-2 text-justify">
        <li className="pl-2">
          Ruang lingkup pekerjaan yang wajib dilaksanakan oleh PIHAK KEDUA mencakup seluruh proses persiapan, pengadaan material, pengerahan tenaga kerja, pengawasan pelaksanaan kerja, hingga penyelesaian akhir dengan standar kualitas (<i>best practice</i>) yang disetujui PIHAK PERTAMA.
        </li>
        <li className="pl-2">
          Lokasi pelaksanaan pekerjaan yang dimaksud dalam Surat Perintah Kerja ini terletak di <b>{data.projectLocation}</b>.
        </li>
      </ol>
      
      {/* PASAL 3 */}
      <div className="mb-4 text-center">
        <h3 className="font-bold uppercase">PASAL 3</h3>
        <h3 className="font-bold uppercase tracking-wide">JANGKA WAKTU PELAKSANAAN</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-2 text-justify">
        <li className="pl-2">
          PIHAK KEDUA wajib memulai pelaksanaan pekerjaan selambat-lambatnya pada tanggal <b>{data.startDate}</b>.
        </li>
        <li className="pl-2">
          Pekerjaan tersebut wajib diselesaikan seluruhnya (100%) dan diserahterimakan kepada PIHAK PERTAMA selambat-lambatnya pada tanggal <b>{data.endDate}</b>.
        </li>
        <li className="pl-2">
          Perpanjangan jangka waktu pelaksanaan hanya dapat dilakukan atas persetujuan tertulis dari PIHAK PERTAMA akibat adanya kondisi Force Majeure atau penambahan volume pekerjaan yang dituangkan dalam (<i>Contract Change Order / Addendum</i>).
        </li>
      </ol>

      {/* PASAL 4 */}
      <div className="mb-4 text-center break-before-page">
        <h3 className="font-bold uppercase">PASAL 4</h3>
        <h3 className="font-bold uppercase tracking-wide">NILAI PEKERJAAN DAN TATA CARA PEMBAYARAN</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-3 text-justify">
        <li className="pl-2">
          Total Nilai Pekerjaan (Kontrak) yang disepakati oleh PARA PIHAK adalah sebesar <b>{formatRupiah(data.totalAmount)} ({totalAmountText})</b>. Nilai ini merupakan nilai tetap (<i>Lump Sum</i>) dan sudah termasuk beban operasional, upah tenaga kerja, keuntungan, asuransi, dan pajak-pajak yang berlaku.
        </li>
        <li className="pl-2">
          Pembayaran nilai pekerjaan oleh PIHAK PERTAMA kepada PIHAK KEDUA akan dilakukan secara bertahap (Termin) dengan rincian sebagai berikut:
          <ul className="list-none space-y-3 mt-3 ml-2">
            <li className="flex">
              <span className="w-6">-</span>
              <div className="flex-1">
                <b>Termin I (Uang Muka/DP):</b> Sebesar {data.dpPercent}% atau senilai <b>{formatRupiah(dpAmount)}</b> ({dpAmountText}) dibayarkan setelah Surat Perintah Kerja ini ditandatangani oleh PARA PIHAK dan PIHAK KEDUA menyerahkan kuitansi tagihan.
              </div>
            </li>
            <li className="flex">
              <span className="w-6">-</span>
              <div className="flex-1">
                <b>Termin II (Progress Pekerjaan 100%):</b> Sebesar {termin2Percent}% atau senilai <b>{formatRupiah(termin2Amount)}</b> ({termin2AmountText}) dibayarkan setelah progres fisik pekerjaan mencapai 100% dan Berita Acara Serah Terima (BAST) Pekerjaan Pertama ditandatangani oleh PARA PIHAK.
              </div>
            </li>
            <li className="flex">
              <span className="w-6">-</span>
              <div className="flex-1">
                <b>Termin III (Retensi / Masa Pemeliharaan):</b> Sebesar {data.retensiPercent}% atau senilai <b>{formatRupiah(retensiAmount)}</b> ({retensiAmountText}) ditahan oleh PIHAK PERTAMA sebagai jaminan masa pemeliharaan, dan baru akan dibayarkan kepada PIHAK KEDUA setelah berlalunya Masa Pemeliharaan dan ditandatanganinya Berita Acara Serah Terima Akhir oleh PARA PIHAK.
              </div>
            </li>
          </ul>
        </li>
        <li className="pl-2">
          Pembayaran dari PIHAK PERTAMA dilakukan melalui transfer bank ke rekening atas nama PIHAK KEDUA, dengan rincian rekening sebagai berikut: <b>{data.bankAccount}</b>.
        </li>
      </ol>

      {/* PASAL 5 */}
      <div className="mb-4 text-center break-inside-avoid">
        <h3 className="font-bold uppercase">PASAL 5</h3>
        <h3 className="font-bold uppercase tracking-wide">HAK DAN KEWAJIBAN PARA PIHAK</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-4 text-justify">
        <li className="pl-2 break-inside-avoid">
          <b>Hak dan Kewajiban PIHAK PERTAMA:</b>
          <ol className="list-[lower-alpha] list-outside ml-4 mt-2 space-y-2">
            <li className="pl-2">Berhak memberikan teguran, instruksi, dan evaluasi berkala terhadap kualitas kerja, kecepatan, dan progres pekerjaan PIHAK KEDUA.</li>
            <li className="pl-2">Berhak secara sepihak menolak hasil pekerjaan apabila spesifikasi material atau teknik pengerjaannya tidak sesuai dengan kesepakatan atau gambar kerja.</li>
            <li className="pl-2">Berkewajiban melakukan pembayaran secara penuh dan tepat waktu sesuai rincian Termin yang diatur pada Pasal 4.</li>
            <li className="pl-2">Berkewajiban memberikan akses masuk ke lokasi proyek kepada para pekerja dari PIHAK KEDUA demi kelancaran operasional.</li>
          </ol>
        </li>
        <li className="pl-2 break-inside-avoid">
          <b>Hak dan Kewajiban PIHAK KEDUA:</b>
          <ol className="list-[lower-alpha] list-outside ml-4 mt-2 space-y-2">
            <li className="pl-2">Berhak menerima pelunasan pembayaran setiap Termin sesuai dengan kemajuan pekerjaan secara tepat waktu.</li>
            <li className="pl-2">Berkewajiban melaksanakan pekerjaan dengan standar kualitas terbaik, tepat waktu, dan menjaga kaidah keselamatan, keamanan, dan kebersihan di lingkungan kerja (K3).</li>
            <li className="pl-2">Berkewajiban mematuhi seluruh peraturan perundang-undangan, menanggung segala risiko kecelakaan kerja, serta membebaskan PIHAK PERTAMA dari segala tuntutan hukum ketenagakerjaan bagi seluruh personel PIHAK KEDUA di lapangan.</li>
          </ol>
        </li>
      </ol>

      {/* PASAL 6 */}
      <div className="mb-4 text-center break-inside-avoid">
        <h3 className="font-bold uppercase">PASAL 6</h3>
        <h3 className="font-bold uppercase tracking-wide">DENDA KETERLAMBATAN DAN MASA PEMELIHARAAN</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-3 text-justify">
        <li className="pl-2">
          Apabila PIHAK KEDUA gagal dan lalai menyelesaikan pekerjaan sesuai batas waktu yang ditetapkan pada Pasal 3, maka PIHAK KEDUA akan dikenakan Denda Keterlambatan sebesar <b>{data.dendaPerHari}</b> per hari keterlambatan dari Total Nilai Pekerjaan, dengan batas denda maksimal 5% (lima persen). Denda ini akan dipotong langsung secara otomatis dari tagihan berjalan atau dana retensi PIHAK KEDUA.
        </li>
        <li className="pl-2">
          <b>Masa Pemeliharaan</b> disepakati selama <b>{data.masaPemeliharaan} hari kalender</b> yang terhitung efektif sejak ditandatanganinya Berita Acara Serah Terima (BAST) Pertama.
        </li>
        <li className="pl-2">
          Selama Masa Pemeliharaan berlangsung, segala cacat, kerusakan, penyusutan struktur, atau kekurangan fungsi pada hasil pekerjaan yang bukan diakibatkan oleh kelalaian penggunaan dari PIHAK PERTAMA, wajib diperbaiki dan disempurnakan oleh PIHAK KEDUA selambat-lambatnya 3x24 jam sejak dilaporkan, atas biaya PIHAK KEDUA sendiri secara mutlak.
        </li>
      </ol>

      {/* PASAL 7 */}
      <div className="mb-4 text-center break-inside-avoid">
        <h3 className="font-bold uppercase">PASAL 7</h3>
        <h3 className="font-bold uppercase tracking-wide">KEADAAN KAHAR (FORCE MAJEURE)</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-3 text-justify">
        <li className="pl-2">
          Tidak ada pihak yang dianggap melanggar perjanjian ini dan dibebaskan dari segala ganti rugi jika keterlambatan atau kegagalan pemenuhan kewajiban disebabkan murni oleh Keadaan Kahar (<i>Force Majeure</i>).
        </li>
        <li className="pl-2">
          Keadaan Kahar mencakup namun tidak terbatas pada bencana alam dahsyat (gempa bumi, banjir bandang, tanah longsor, tsunami), peperangan, huru-hara, pemberontakan, pemogokan massal berskala nasional, serta kebijakan/peraturan pemerintah pusat yang berdampak langsung pada terhentinya proyek.
        </li>
        <li className="pl-2">
          Pihak yang mengalami Keadaan Kahar wajib memberitahukan secara tertulis kepada pihak lainnya paling lambat 7 (tujuh) hari sejak terjadinya peristiwa tersebut beserta surat keterangan resmi dari instansi pemerintah yang berwenang.
        </li>
      </ol>

      {/* PASAL 8 */}
      <div className="mb-4 text-center break-inside-avoid">
        <h3 className="font-bold uppercase">PASAL 8</h3>
        <h3 className="font-bold uppercase tracking-wide">PENYELESAIAN PERSELISIHAN DAN PENUTUP</h3>
      </div>
      <ol className="list-decimal list-outside ml-4 mb-6 space-y-3 text-justify">
        <li className="pl-2">
          Segala perselisihan atau perbedaan pendapat yang timbul akibat pelaksanaan Surat Perintah Kerja ini pada prinsipnya akan diselesaikan secara kekeluargaan melalui musyawarah untuk mufakat oleh PARA PIHAK.
        </li>
        <li className="pl-2">
          Apabila musyawarah tidak mencapai mufakat dalam batas waktu selambat-lambatnya 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan perselisihan tersebut melalui jalur hukum dengan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri di domisili PIHAK PERTAMA.
        </li>
        <li className="pl-2">
          Hal-hal yang belum diatur atau belum cukup diatur secara teknis dalam Perjanjian ini akan dituangkan kemudian dalam Surat Adendum atau Amandemen secara tertulis dan disetujui bersama, yang merupakan satu kesatuan yang utuh dan tidak terpisahkan dari Surat Perintah Kerja ini.
        </li>
      </ol>

      <p className="mt-8 mb-16 text-justify indent-8">
        Demikian Surat Perintah Kerja (SPK) ini dibuat dengan sebenarnya dalam kesadaran penuh dan itikad baik tanpa adanya paksaan dari pihak manapun, ditandatangani oleh PARA PIHAK di atas materai yang cukup sesuai ketentuan perundang-undangan yang berlaku, dibuat dalam rangkap 2 (dua) yang masing-masing bermaterai dan mempunyai kekuatan pembuktian hukum yang sama bagi PIHAK PERTAMA dan PIHAK KEDUA.
      </p>

      {/* SIGNATURES */}
      <div className="flex justify-between w-full mt-10 break-inside-avoid px-8">
        <div className="text-center w-1/2">
          <p className="font-bold mb-28 uppercase">PIHAK PERTAMA<br/><span className="font-normal text-[10pt] capitalize">(Pemberi Tugas)</span></p>
          <p className="font-bold underline uppercase tracking-wide">{data.pihak1Name}</p>
          <p className="text-[10pt]">{data.pihak1Role}</p>
        </div>
        <div className="text-center w-1/2">
          <p className="font-bold mb-28 uppercase">PIHAK KEDUA<br/><span className="font-normal text-[10pt] capitalize">(Pelaksana Tugas)</span></p>
          <p className="font-bold underline uppercase tracking-wide">{data.pihak2Name}</p>
          <p className="text-[10pt]">{data.pihak2Role}</p>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-xs">
            <ArrowLeftCircle size={20} className="text-blue-400" /> Dashboard
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase italic tracking-tighter">
            <FileSignature size={18} /> <span>SPK Commercial Ironclad</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
            <Printer size={16}/> Cetak Dokumen
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2">
                  <Edit3 size={16} className="text-blue-600" /> Editor Kontrak SPK
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Data">
                  <RotateCcw size={16}/>
                </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {/* SECTION 1: DOKUMEN & PROYEK */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2">
                  <BookOpenCheck size={12}/> Info Dokumen & Proyek
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. Dokumen</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl. Terbit</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" value={data.docDate} onChange={e => handleDataChange('docDate', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Proyek / Pekerjaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-16" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi Proyek</label>
                  <textarea className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-16" value={data.projectLocation} onChange={e => handleDataChange('projectLocation', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl. Mulai</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl. Selesai</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* SECTION 2: PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2">
                  <Building2 size={12}/> Pihak Pertama (Pemberi Tugas)
                </h3>
                <div className="space-y-3">
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 font-bold" placeholder="Nama Lengkap & Gelar" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" placeholder="NIK KTP" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} />
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" placeholder="Pekerjaan / Jabatan" value={data.pihak1Job} onChange={e => handleDataChange('pihak1Job', e.target.value)} />
                  </div>
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tempat, Tanggal Lahir" value={data.pihak1Birth} onChange={e => handleDataChange('pihak1Birth', e.target.value)} />
                  <textarea className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 resize-none h-16" placeholder="Alamat Sesuai KTP" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} />
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 font-semibold" placeholder="Bertindak atas nama (PT/Instansi/Pribadi)" value={data.pihak1Role} onChange={e => handleDataChange('pihak1Role', e.target.value)} />
                </div>
              </div>

              {/* SECTION 3: PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2">
                  <HardHat size={12}/> Pihak Kedua (Pelaksana Tugas)
                </h3>
                <div className="space-y-3">
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-bold" placeholder="Nama Lengkap & Gelar" value={data.pihak2Name} onChange={e => handleDataChange('pihak2Name', e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500" placeholder="NIK KTP" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} />
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Pekerjaan / Jabatan" value={data.pihak2Job} onChange={e => handleDataChange('pihak2Job', e.target.value)} />
                  </div>
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tempat, Tanggal Lahir" value={data.pihak2Birth} onChange={e => handleDataChange('pihak2Birth', e.target.value)} />
                  <textarea className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-16" placeholder="Alamat Sesuai KTP" value={data.pihak2Address} onChange={e => handleDataChange('pihak2Address', e.target.value)} />
                  <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-semibold" placeholder="Bertindak atas nama (PT/Instansi/Pribadi)" value={data.pihak2Role} onChange={e => handleDataChange('pihak2Role', e.target.value)} />
                </div>
              </div>

              {/* SECTION 4: KEUANGAN & KETENTUAN */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2">
                  <Wallet size={12}/> Nilai Proyek & Ketentuan
                </h3>
                
                <div className="space-y-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Total Nilai Kontrak (Rp)</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-sm font-black outline-none focus:ring-2 focus:ring-amber-500 text-amber-700" value={data.totalAmount} onChange={e => handleDataChange('totalAmount', parseInt(e.target.value) || 0)} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase">DP / Termin I (%)</label>
                      <input type="number" max="100" className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500" value={data.dpPercent} onChange={e => handleDataChange('dpPercent', parseInt(e.target.value) || 0)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Retensi (%)</label>
                      <input type="number" max="100" className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500" value={data.retensiPercent} onChange={e => handleDataChange('retensiPercent', parseInt(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 italic mt-1">
                    * Termin II (Progress 100%) akan terhitung otomatis sisa dari 100% - DP - Retensi. (Saat ini: {termin2Percent}%)
                  </div>
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Rekening Tujuan Pembayaran</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500 font-mono" value={data.bankAccount} onChange={e => handleDataChange('bankAccount', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Masa Pelihara</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500" placeholder="Contoh: 90 (sembilan puluh)" value={data.masaPemeliharaan} onChange={e => handleDataChange('masaPemeliharaan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Denda Harian</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500" placeholder="1/1000 (satu permil)" value={data.dendaPerHari} onChange={e => handleDataChange('dendaPerHari', e.target.value)} />
                  </div>
                </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/80 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl z-50 font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW DOKUMEN</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Surat Perintah Kerja (SPK)" price={35000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
