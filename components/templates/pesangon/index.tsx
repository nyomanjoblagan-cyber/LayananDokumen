'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  User, Building, FileText, Briefcase, CreditCard,
  CalendarDays, MapPin, Scale
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- TYPE DEFINITIONS ---
interface PesangonData {
  city: string;
  date: string;
  
  // Pihak 1 (Perusahaan/Perwakilan)
  p1Name: string;
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Occupation: string;
  p1Address: string;
  companyName: string;
  companyTitle: string;
  
  // Pihak 2 (Karyawan)
  p2Name: string;
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Occupation: string;
  p2Address: string;
  empStartDate: string;
  empTitle: string;

  // Detail PHK & Pesangon
  phkDate: string;
  severanceAmount: number;
  paymentMethod: 'Tunai' | 'Transfer';
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  taxPayer: 'Ditanggung Perusahaan' | 'Ditanggung Pihak Kedua';
}

const INITIAL_DATA: PesangonData = {
  city: 'Jakarta',
  date: '',
  
  p1Name: 'Budi Santoso',
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Occupation: 'Direktur HR',
  p1Address: 'Jl. Sudirman Kav 21, RT 001/RW 002, Senayan, Kebayoran Baru, Jakarta Selatan',
  companyName: 'PT Maju Bersama Sejahtera',
  companyTitle: 'Direktur HRD',
  
  p2Name: 'Andi Setiawan',
  p2Nik: '3171234567890002',
  p2Pob: 'Bandung',
  p2Dob: '1990-08-20',
  p2Occupation: 'Karyawan Swasta',
  p2Address: 'Jl. Kebon Jeruk No. 10, RT 005/RW 003, Kebon Jeruk, Jakarta Barat',
  empStartDate: '2020-01-10',
  empTitle: 'Senior Marketing Staff',

  phkDate: '2026-07-13',
  severanceAmount: 55000000,
  paymentMethod: 'Transfer',
  bankName: 'BCA',
  bankAccount: '1234567890',
  bankAccountName: 'Andi Setiawan',
  taxPayer: 'Ditanggung Perusahaan',
};

// --- HELPERS ---
function terbilang(angka: number): string {
    const bilangan = [
        "", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
    ];

    if (angka < 12) {
        return bilangan[angka];
    } else if (angka < 20) {
        return terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        return terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
    } else if (angka < 200) {
        return "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        return terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        return "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        return terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        return terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        return terbilang(Math.floor(angka / 1000000000)) + " Milyar " + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
        return terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
    }
    return "";
}

const getDayName = (dateStr: string) => {
    if (!dateStr) return '...';
    try {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[new Date(dateStr).getDay()];
    } catch { return '...'; }
};

const formatDateSafe = (dateStr: string) => {
    if (!dateStr) return '...';
    try {
        return new Date(dateStr).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    } catch { return dateStr; }
};

const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

export default function PesangonDraftPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading Editor...</div>}>
      <PesangonBuilder />
    </Suspense>
  );
}

function PesangonBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PesangonData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: prev.date || today, phkDate: prev.phkDate || today }));
  }, []);

  const handleDataChange = (field: keyof PesangonData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, phkDate: today });
    }
  };

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-black leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* JUDUL DOKUMEN */}
      <div className="text-center font-bold mb-8">
        <p className="uppercase underline tracking-wide text-sm font-black mb-1">PERJANJIAN BERSAMA PEMUTUSAN HUBUNGAN KERJA DAN PELEPASAN HAK</p>
        <p className="text-xs uppercase tracking-wider">(Release and Discharge)</p>
      </div>

      {/* PEMBUKAAN */}
      <p className="text-justify mb-4">
        Pada hari ini, <strong>{getDayName(data.date)}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong> bertempat di <strong>{data.city}</strong>, telah dibuat dan ditandatangani Perjanjian Bersama Pemutusan Hubungan Kerja ("Perjanjian") oleh dan antara:
      </p>

      {/* IDENTITAS PIHAK PERTAMA */}
      <div className="mb-4">
        <div className="flex flex-col ml-4">
          <div className="flex">
            <span className="w-8 shrink-0 font-bold">I.</span>
            <span className="w-40 shrink-0">Nama Lengkap</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1 font-bold">{data.p1Name}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">NIK</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p1Nik}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Tempat, Tgl Lahir</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Pekerjaan</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p1Occupation}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Alamat Sesuai KTP</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p1Address}</span>
          </div>
        </div>
      </div>
      <p className="text-justify mb-4">
        Dalam hal ini bertindak untuk dan atas nama <strong>{data.companyName}</strong>, berkedudukan sebagai <strong>{data.companyTitle}</strong>, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
      </p>

      {/* IDENTITAS PIHAK KEDUA */}
      <div className="mb-4">
        <div className="flex flex-col ml-4">
          <div className="flex">
            <span className="w-8 shrink-0 font-bold">II.</span>
            <span className="w-40 shrink-0">Nama Lengkap</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1 font-bold">{data.p2Name}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">NIK</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p2Nik}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Tempat, Tgl Lahir</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Pekerjaan</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p2Occupation}</span>
          </div>
          <div className="flex">
            <span className="w-8 shrink-0"></span>
            <span className="w-40 shrink-0">Alamat Sesuai KTP</span>
            <span className="w-4 shrink-0">:</span>
            <span className="flex-1">{data.p2Address}</span>
          </div>
        </div>
      </div>
      <p className="text-justify mb-6">
        Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
      </p>

      <p className="text-justify mb-4">
        Pihak Pertama dan Pihak Kedua secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>, dan masing-masing disebut sebagai <strong>PIHAK</strong>.
      </p>

      {/* PREMIS */}
      <p className="text-justify mb-2 font-bold">Menerangkan terlebih dahulu (Premis):</p>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Bahwa Pihak Pertama adalah sebuah Badan Usaha berbadan hukum yang mempekerjakan Pihak Kedua.</li>
        <li>Bahwa Pihak Kedua telah dipekerjakan oleh Pihak Pertama sejak tanggal <strong>{formatDateSafe(data.empStartDate)}</strong> dan menempati posisi terakhir sebagai <strong>{data.empTitle}</strong>.</li>
        <li>Bahwa Para Pihak setelah melalui perundingan dan mufakat, telah sepakat untuk mengakhiri hubungan kerja secara damai dan baik-baik.</li>
      </ol>

      <p className="text-justify mb-6">
        Berdasarkan hal-hal tersebut di atas, Para Pihak dengan ini sepakat dan mengikatkan diri ke dalam Perjanjian ini dengan syarat-syarat dan ketentuan sebagai berikut:
      </p>

      {/* PASAL 1 */}
      <div className="text-center font-bold mb-4">
        <p>PASAL 1</p>
        <p>KESEPAKATAN PEMUTUSAN HUBUNGAN KERJA</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Para Pihak dengan ini sepakat untuk mengakhiri hubungan kerja secara baik-baik antara Pihak Pertama dan Pihak Kedua, efektif terhitung sejak tanggal <strong>{formatDateSafe(data.phkDate)}</strong>.</li>
        <li>Dengan berakhirnya hubungan kerja tersebut, maka terhitung sejak tanggal Pemutusan Hubungan Kerja, Pihak Kedua tidak lagi berstatus sebagai karyawan Pihak Pertama dan tidak lagi memiliki hak serta kewenangan untuk mewakili dan/atau bertindak untuk dan atas nama Pihak Pertama dalam hal apapun.</li>
      </ol>

      {/* PASAL 2 */}
      <div className="text-center font-bold mb-4 break-before-auto">
        <p>PASAL 2</p>
        <p>HAK DAN KOMPENSASI</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Sebagai akibat dari Pemutusan Hubungan Kerja sebagaimana dimaksud pada Pasal 1, Pihak Pertama sepakat untuk memberikan pembayaran kompensasi pemutusan hubungan kerja kepada Pihak Kedua secara keseluruhan ("Kompensasi") sebesar <strong>{formatRupiah(data.severanceAmount)} ({terbilang(data.severanceAmount).trim()} Rupiah)</strong>.</li>
        <li>Kompensasi sebagaimana dimaksud pada Ayat 1 merupakan gabungan dari Uang Pesangon, Uang Penghargaan Masa Kerja, dan Uang Penggantian Hak (jika ada), sesuai dengan ketentuan peraturan perundang-undangan ketenagakerjaan yang berlaku, khususnya Peraturan Pemerintah (PP) No. 35 Tahun 2021.</li>
        <li>Pihak Kedua dengan ini menyatakan dan mengakui bahwa jumlah Kompensasi tersebut adalah jumlah yang final, penuh, lengkap, dan mengikat, serta mencakup seluruh hak-hak Pihak Kedua sehubungan dengan pemutusan hubungan kerja ini.</li>
      </ol>

      {/* PASAL 3 */}
      <div className="text-center font-bold mb-4">
        <p>PASAL 3</p>
        <p>METODE PEMBAYARAN DAN PAJAK</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>
          {data.paymentMethod === 'Tunai' 
            ? "Pembayaran Kompensasi sebagaimana dimaksud pada Pasal 2 akan dilakukan secara tunai secara bersamaan dengan penandatanganan Perjanjian ini oleh Para Pihak, yang mana Perjanjian ini sekaligus berlaku sebagai Tanda Terima (Kuitansi) yang sah atas pembayaran tersebut."
            : `Pembayaran Kompensasi sebagaimana dimaksud pada Pasal 2 akan dilakukan melalui transfer bank ke rekening Pihak Kedua selambat-lambatnya 7 (tujuh) hari kerja setelah penandatanganan Perjanjian ini, dengan detail rekening sebagai berikut:`}
          
          {data.paymentMethod === 'Transfer' && (
            <div className="mt-2 ml-4">
              <div className="flex"><span className="w-32">Nama Bank</span><span>: {data.bankName}</span></div>
              <div className="flex"><span className="w-32">No. Rekening</span><span>: {data.bankAccount}</span></div>
              <div className="flex"><span className="w-32">Atas Nama</span><span>: {data.bankAccountName}</span></div>
            </div>
          )}
        </li>
        <li>
          {data.taxPayer === 'Ditanggung Perusahaan'
            ? "Pajak Penghasilan (PPh Pasal 21) yang timbul atas pembayaran Kompensasi ini ditanggung sepenuhnya oleh Pihak Pertama, sehingga nominal Kompensasi yang diterima Pihak Kedua adalah jumlah bersih (neto)."
            : "Pajak Penghasilan (PPh Pasal 21) yang timbul atas pembayaran Kompensasi ini menjadi beban dan tanggung jawab Pihak Kedua. Pihak Pertama akan melakukan pemotongan atas total Kompensasi untuk kemudian disetorkan kepada Kas Negara sesuai peraturan perundang-undangan perpajakan yang berlaku."}
        </li>
      </ol>

      {/* PASAL 4 */}
      <div className="text-center font-bold mb-4">
        <p>PASAL 4</p>
        <p>PENGEMBALIAN ASET PERUSAHAAN DAN KERAHASIAAN</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Pihak Kedua berkewajiban untuk mengembalikan seluruh barang, dokumen, perangkat elektronik, fasilitas kerja, dan aset-aset lainnya milik Pihak Pertama yang berada dalam penguasaan Pihak Kedua, dalam keadaan baik, selambat-lambatnya pada tanggal efektif Pemutusan Hubungan Kerja.</li>
        <li>Pihak Kedua berjanji dan mengikatkan diri untuk senantiasa menjaga kerahasiaan seluruh informasi penting, rahasia dagang, sistem internal, dan data perusahaan milik Pihak Pertama. Pihak Kedua dilarang membocorkan dan/atau menyalahgunakan informasi rahasia tersebut kepada pihak ketiga manapun meskipun hubungan kerja telah berakhir.</li>
      </ol>

      {/* PASAL 5 (ABSOLUTE RELEASE KLAUSUL) */}
      <div className="text-center font-bold mb-4 break-before-auto">
        <p>PASAL 5</p>
        <p>PELEPASAN HAK (RELEASE AND DISCHARGE)</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Pihak Kedua menyatakan bahwa dengan ditandatanganinya Perjanjian ini dan telah diterimanya pembayaran Kompensasi secara penuh sebagaimana dimaksud dalam Pasal 2 dan Pasal 3, maka Pihak Kedua memberikan pembebasan dan pelepasan tanggung jawab sepenuhnya (<em>acquit et decharge</em>) kepada Pihak Pertama, beserta seluruh jajaran direksi, komisaris, pemegang saham, dan afiliasinya.</li>
        <li>Pihak Kedua menyatakan bahwa seluruh hak-haknya (termasuk namun tidak terbatas pada upah, tunjangan, uang lembur, sisa cuti, dan hak lainnya) telah diselesaikan dengan lunas, tuntas, dan tidak ada lagi yang tertunggak.</li>
        <li><strong>Pihak Kedua secara sadar, tanpa paksaan, dan secara mutlak melepaskan haknya untuk mengajukan segala bentuk tuntutan, gugatan, keberatan, pelaporan, atau proses hukum apapun, baik secara perdata, pidana, maupun ketenagakerjaan terhadap Pihak Pertama. Secara khusus, Pihak Kedua melepaskan haknya secara mutlak untuk menggugat Pihak Pertama di Pengadilan Hubungan Industrial (PHI) maupun di instansi pemerintah lainnya yang berwenang, sehubungan dengan pelaksanaan pemutusan hubungan kerja ini dan segala hak yang timbul daripadanya.</strong></li>
      </ol>

      {/* PASAL 6 */}
      <div className="text-center font-bold mb-4">
        <p>PASAL 6</p>
        <p>PENYELESAIAN SENGKETA</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-6">
        <li>Tanpa mengesampingkan ketentuan pelepasan hak yang diatur pada Pasal 5, segala perselisihan yang mungkin timbul akibat penafsiran dan pelaksanaan atas Perjanjian ini, akan diselesaikan secara musyawarah untuk mufakat oleh Para Pihak.</li>
        <li>Perjanjian ini diatur dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</li>
      </ol>

      {/* PASAL 7 */}
      <div className="text-center font-bold mb-4">
        <p>PASAL 7</p>
        <p>PENUTUP</p>
      </div>
      <ol className="list-decimal pl-6 text-justify space-y-2 mb-8">
        <li>Perjanjian ini berlaku dan mengikat Para Pihak sejak tanggal penandatanganan.</li>
        <li>Perjanjian ini dibuat dan ditandatangani oleh Para Pihak dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya tekanan, paksaan, atau kekhilafan dari pihak manapun.</li>
        <li>Perjanjian ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup Rp10.000,- (sepuluh ribu rupiah) yang keduanya memiliki kekuatan hukum yang sama, di mana 1 (satu) rangkap asli dipegang oleh Pihak Pertama dan 1 (satu) rangkap asli dipegang oleh Pihak Kedua.</li>
      </ol>

      {/* SIGNATURE SECTION */}
      <div className="flex justify-between w-full mt-10 px-8 pb-10" style={{ pageBreakInside: 'avoid' }}>
        <div className="text-center flex flex-col items-center">
          <p className="font-bold mb-2">PIHAK PERTAMA,</p>
          <p className="font-bold mb-20 uppercase">{data.companyName}</p>
          <div className="w-48 border-b border-black mb-1"></div>
          <p className="font-bold underline uppercase">{data.p1Name}</p>
          <p className="text-sm">{data.companyTitle}</p>
        </div>
        
        <div className="text-center flex flex-col items-center">
          <p className="font-bold mb-24">PIHAK KEDUA,</p>
          <div className="w-48 border-b border-black mb-1 relative flex justify-center items-end pb-1">
             <div className="absolute border-2 border-slate-300 text-[8px] text-slate-300 w-16 h-10 flex items-center justify-center bottom-2 opacity-50 select-none">METERAI Rp10.000</div>
          </div>
          <p className="font-bold underline uppercase">{data.p2Name}</p>
          <p className="text-sm">Karyawan</p>
        </div>
      </div>
    </div>
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
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileText size={16} className="text-blue-500" /> <span>Legal Drafter - Perjanjian PHK (Release & Discharge)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[500px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Form Data Perjanjian</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              {/* DATA PERJANJIAN */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Info Perjanjian</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">KOTA PENANDATANGANAN</label>
                       <input className="w-full p-2 border rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TANGGAL PERJANJIAN</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building size={12}/> Pihak Pertama (Perusahaan)</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">NAMA LENGKAP (PERWAKILAN)</label>
                        <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">NIK (KTP)</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400">TEMPAT LAHIR</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400">TANGGAL LAHIR</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">PEKERJAAN</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Occupation} onChange={e => handleDataChange('p1Occupation', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">ALAMAT LENGKAP (KTP)</label>
                        <textarea rows={2} className="w-full p-2 border rounded-lg text-xs resize-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2 border-t pt-3 mt-1">
                        <label className="text-[9px] font-black text-slate-400">BERTINDAK ATAS NAMA (NAMA PERUSAHAAN)</label>
                        <input className="w-full p-2 border rounded-lg text-xs font-bold bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">JABATAN / KEDUDUKAN DI PERUSAHAAN</label>
                        <input className="w-full p-2 border rounded-lg text-xs bg-slate-50" value={data.companyTitle} onChange={e => handleDataChange('companyTitle', e.target.value)} />
                     </div>
                 </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua (Karyawan)</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">NAMA LENGKAP KARYAWAN</label>
                        <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">NIK (KTP)</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400">TEMPAT LAHIR</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400">TANGGAL LAHIR</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">PEKERJAAN</label>
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Occupation} onChange={e => handleDataChange('p2Occupation', e.target.value)} />
                     </div>
                     <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black text-slate-400">ALAMAT LENGKAP (KTP)</label>
                        <textarea rows={2} className="w-full p-2 border rounded-lg text-xs resize-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                     </div>
                     <div className="space-y-1 border-t pt-3 mt-1">
                        <label className="text-[9px] font-black text-slate-400">TANGGAL MASUK KERJA</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs bg-slate-50" value={data.empStartDate} onChange={e => handleDataChange('empStartDate', e.target.value)} />
                     </div>
                     <div className="space-y-1 border-t pt-3 mt-1">
                        <label className="text-[9px] font-black text-slate-400">JABATAN TERAKHIR</label>
                        <input className="w-full p-2 border rounded-lg text-xs bg-slate-50" value={data.empTitle} onChange={e => handleDataChange('empTitle', e.target.value)} />
                     </div>
                 </div>
              </div>

              {/* DETAIL PESANGON */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><CreditCard size={12}/> Detail Kompensasi & PHK</h3>
                 
                 <div className="space-y-3">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TANGGAL EFEKTIF PHK</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs font-bold" value={data.phkDate} onChange={e => handleDataChange('phkDate', e.target.value)} />
                    </div>

                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TOTAL NOMINAL PESANGON (IDR)</label>
                       <input type="number" className="w-full p-2 border rounded-lg text-sm font-black text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.severanceAmount} onChange={e => handleDataChange('severanceAmount', parseInt(e.target.value) || 0)} />
                       <div className="text-[10px] text-slate-500 italic px-1 pt-1">{terbilang(data.severanceAmount).trim() || "Nol"} Rupiah</div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">METODE PEMBAYARAN</label>
                       <select className="w-full p-2 border rounded-lg text-xs font-bold bg-slate-50" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)}>
                          <option value="Tunai">Tunai / Cash</option>
                          <option value="Transfer">Transfer Bank</option>
                       </select>
                    </div>

                    {data.paymentMethod === 'Transfer' && (
                       <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="space-y-1 col-span-2 md:col-span-1">
                             <label className="text-[9px] font-black text-slate-400">NAMA BANK</label>
                             <input className="w-full p-2 border rounded-lg text-xs" placeholder="Contoh: BCA" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} />
                          </div>
                          <div className="space-y-1 col-span-2 md:col-span-1">
                             <label className="text-[9px] font-black text-slate-400">NO. REKENING</label>
                             <input className="w-full p-2 border rounded-lg text-xs" value={data.bankAccount} onChange={e => handleDataChange('bankAccount', e.target.value)} />
                          </div>
                          <div className="space-y-1 col-span-2">
                             <label className="text-[9px] font-black text-slate-400">ATAS NAMA</label>
                             <input className="w-full p-2 border rounded-lg text-xs" value={data.bankAccountName} onChange={e => handleDataChange('bankAccountName', e.target.value)} />
                          </div>
                       </div>
                    )}

                    <div className="space-y-1">
                       <label className="text-[9px] font-black text-slate-400">TANGGUNGAN PPH 21</label>
                       <select className="w-full p-2 border rounded-lg text-xs font-bold bg-slate-50" value={data.taxPayer} onChange={e => handleDataChange('taxPayer', e.target.value)}>
                          <option value="Ditanggung Perusahaan">Ditanggung Perusahaan (Karyawan terima utuh / nett)</option>
                          <option value="Ditanggung Pihak Kedua">Ditanggung Karyawan (Dipotong dari total kompensasi)</option>
                       </select>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian_Bersama_PHK" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
