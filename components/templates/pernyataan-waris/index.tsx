'use client';

/**
 * FILE: PernyataanWarisPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Kesepakatan Pembagian Waris Dinamis
 * STANDAR KORPORAT / NOTARIS: Dilengkapi dengan minimal 8 Pasal dan format cetak optimal.
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Trash2, Edit3, PenTool, RotateCcw, ArrowLeftCircle, Plus
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Heirloom {
  type: string;
  description: string;
}

interface PartyData {
  name: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  job: string;
  address: string;
  relation: string;
}

interface WarisData {
  city: string;
  date: string;
  deceasedName: string;
  deceasedNik: string;
  deceasedDeathDate: string;
  deceasedDeathPlace: string;
  party1: PartyData;
  party2: PartyData;
  objects: Heirloom[];
  divisionMethod: 'jual_bagi_hasil' | 'bagi_fisik';
  taxBearers: 'proporsional' | 'pihak_1' | 'pihak_2';
  disputeResolution: 'musyawarah' | 'pengadilan';
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WarisData = {
  city: 'JAKARTA',
  date: '', 
  deceasedName: 'H. AHMAD JAYADI',
  deceasedNik: '3171000000000001',
  deceasedDeathDate: '2025-11-20',
  deceasedDeathPlace: 'RS Cipto Mangunkusumo, Jakarta',
  party1: {
    name: 'SITI AMINAH',
    nik: '3171000000000011',
    birthPlace: 'Jakarta',
    birthDate: '1970-05-14',
    job: 'Ibu Rumah Tangga',
    address: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
    relation: 'Istri Pewaris'
  },
  party2: {
    name: 'BUDI SETIAWAN',
    nik: '3171000000000012',
    birthPlace: 'Jakarta',
    birthDate: '1995-08-20',
    job: 'Pegawai Swasta',
    address: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
    relation: 'Anak Kandung Pewaris'
  },
  objects: [
    { type: 'Sebidang Tanah dan Bangunan', description: 'Sertifikat Hak Milik (SHM) No. 12345 seluas 500 m2 yang terletak di Kelurahan Menteng, Kecamatan Menteng, Kota Jakarta Pusat, Provinsi DKI Jakarta' },
    { type: 'Kendaraan Roda Empat', description: '1 Unit Mobil Toyota Kijang Innova Tahun 2020, Nopol B 1234 ABC, BPKB No. 987654321 atas nama H. Ahmad Jayadi' }
  ],
  divisionMethod: 'bagi_fisik',
  taxBearers: 'proporsional',
  disputeResolution: 'musyawarah',
  witness1: 'Ketua RT 001',
  witness2: 'Ketua RW 002'
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Waris...</div>}>
      <HeirStatementBuilder />
    </Suspense>
  );
}

function HeirStatementBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<WarisData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pewaris'|'pihak1'|'pihak2'|'objek'|'opsi'>('pewaris');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof WarisData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handlePartyChange = (party: 'party1' | 'party2', field: keyof PartyData, val: string) => {
    setData(prev => ({
      ...prev,
      [party]: { ...prev[party], [field]: val }
    }));
  };

  const addObject = () => {
    setData(prev => ({
      ...prev,
      objects: [...prev.objects, { type: '', description: '' }]
    }));
  };

  const removeObject = (index: number) => {
    const newObjects = [...data.objects];
    newObjects.splice(index, 1);
    setData(prev => ({ ...prev, objects: newObjects }));
  };

  const updateObject = (index: number, field: keyof Heirloom, val: string) => {
    const newObjects = [...data.objects];
    newObjects[index][field] = val;
    setData(prev => ({ ...prev, objects: newObjects }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua formulir ke data awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const formatDateSafe = (dateString: string) => {
    if(!dateString) return '...';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch { return dateString; }
  };

  const getDayName = (dateString: string) => {
    if(!dateString) return '...';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '...';
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[date.getDay()];
    } catch { return '...'; }
  };

  const DocumentContent = () => {
    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <h1 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-wider leading-none mb-2">SURAT KESEPAKATAN PEMBAGIAN HARTA WARISAN</h1>
        </div>

        {/* MUKADIMAH */}
        <div className="flex-grow space-y-4 overflow-hidden text-justify">
          <p>
            Pada hari ini, <strong>{getDayName(data.date)}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, di <strong>{data.city}</strong>. Kami yang bertanda tangan di bawah ini:
          </p>
          
          {/* PIHAK PERTAMA */}
          <div className="pl-4 font-normal mt-4">
            <div className="font-bold mb-1">1. PIHAK PERTAMA (Ahli Waris I)</div>
            <div className="ml-4 space-y-1 mt-2">
              <div className="flex"><span className="w-40 shrink-0">Nama Lengkap</span><span className="w-4 shrink-0">:</span><span className="font-bold">{data.party1.name}</span></div>
              <div className="flex"><span className="w-40 shrink-0">NIK</span><span className="w-4 shrink-0">:</span><span>{data.party1.nik}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Tempat, Tgl Lahir</span><span className="w-4 shrink-0">:</span><span>{data.party1.birthPlace}, {formatDateSafe(data.party1.birthDate)}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Pekerjaan</span><span className="w-4 shrink-0">:</span><span>{data.party1.job}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Alamat</span><span className="w-4 shrink-0">:</span><span className="flex-1">{data.party1.address}</span></div>
            </div>
            <p className="mt-2 text-justify">
              Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
            </p>
          </div>

          {/* PIHAK KEDUA */}
          <div className="pl-4 font-normal mt-4">
            <div className="font-bold mb-1">2. PIHAK KEDUA (Ahli Waris II)</div>
            <div className="ml-4 space-y-1 mt-2">
              <div className="flex"><span className="w-40 shrink-0">Nama Lengkap</span><span className="w-4 shrink-0">:</span><span className="font-bold">{data.party2.name}</span></div>
              <div className="flex"><span className="w-40 shrink-0">NIK</span><span className="w-4 shrink-0">:</span><span>{data.party2.nik}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Tempat, Tgl Lahir</span><span className="w-4 shrink-0">:</span><span>{data.party2.birthPlace}, {formatDateSafe(data.party2.birthDate)}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Pekerjaan</span><span className="w-4 shrink-0">:</span><span>{data.party2.job}</span></div>
              <div className="flex"><span className="w-40 shrink-0">Alamat</span><span className="w-4 shrink-0">:</span><span className="flex-1">{data.party2.address}</span></div>
            </div>
            <p className="mt-2 text-justify">
              Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
            </p>
          </div>

          <p className="mt-4 text-justify">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>.
          </p>

          <p className="mt-4 text-justify">
            PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:
          </p>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">
              Bahwa telah meninggal dunia seorang laki-laki/perempuan bernama <strong>{data.deceasedName}</strong> (NIK: {data.deceasedNik}) pada tanggal <strong>{formatDateSafe(data.deceasedDeathDate)}</strong> di {data.deceasedDeathPlace} (selanjutnya disebut sebagai <strong>Pewaris</strong>).
            </li>
            <li className="pl-2">
              Bahwa semasa hidupnya, Pewaris meninggalkan harta kekayaan yang hingga saat ini belum dilakukan pembagian di antara para ahli waris.
            </li>
            <li className="pl-2">
              Bahwa PARA PIHAK adalah ahli waris yang sah dan berhak sepenuhnya atas harta peninggalan Pewaris.
            </li>
          </ul>

          <p className="text-justify mb-4">
            Berdasarkan hal-hal tersebut di atas, PARA PIHAK dengan ini sepakat dan mengikatkan diri untuk melakukan pembagian harta warisan peninggalan Pewaris dengan syarat-syarat dan ketentuan-ketentuan yang diatur dalam pasal-pasal berikut ini:
          </p>

          {/* PASAL 1 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 1<br/>KEDUDUKAN PARA PIHAK</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">Bahwa kedudukan PIHAK PERTAMA adalah selaku {data.party1.relation} dari Pewaris, yang memiliki hak penuh sebagai ahli waris menurut ketentuan hukum dan perundang-undangan yang berlaku.</li>
            <li className="pl-2">Bahwa kedudukan PIHAK KEDUA adalah selaku {data.party2.relation} dari Pewaris, yang juga memiliki hak penuh sebagai ahli waris menurut ketentuan hukum dan perundang-undangan yang berlaku.</li>
            <li className="pl-2">Bahwa PARA PIHAK dengan iktikad baik sepakat untuk mengakhiri keadaan harta warisan yang belum terbagi dengan mengadakan kesepakatan pembagian berdasarkan proporsi dan ketentuan yang disepakati bersama.</li>
          </ol>

          {/* PASAL 2 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 2<br/>OBJEK HARTA WARISAN</div>
          <div className="text-justify mb-2">Bahwa harta peninggalan Pewaris yang menjadi objek pembagian dalam kesepakatan ini (selanjutnya disebut "Objek Warisan") terdiri dari:</div>
          <ul className="list-[lower-alpha] pl-6 space-y-3 text-justify mb-6">
            {data.objects.map((obj, i) => (
              <li key={i} className="pl-2">
                Harta berupa <strong>{obj.type || '...'}</strong> yang diuraikan lebih lanjut sebagai berikut:<br/>
                <span className="block mt-1">{obj.description || '...'}</span>
              </li>
            ))}
          </ul>

          {/* PASAL 3 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 3<br/>METODE PEMBAGIAN</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">
              {data.divisionMethod === 'jual_bagi_hasil' 
                ? "Bahwa PARA PIHAK sepakat untuk menyelesaikan pembagian Objek Warisan dengan cara dijual kepada pihak ketiga atau pihak lain yang disepakati. Hasil penjualan tersebut, setelah dikurangi seluruh biaya-biaya administrasi dan pajak yang sah, akan dibagi kepada PARA PIHAK."
                : "Bahwa PARA PIHAK sepakat untuk melaksanakan pembagian Objek Warisan secara in natura (pembagian fisik dan penguasaan langsung) berdasarkan musyawarah kekeluargaan yang saling menguntungkan."}
            </li>
            <li className="pl-2">Porsi pembagian untuk masing-masing pihak ditetapkan sama rata antara PIHAK PERTAMA dan PIHAK KEDUA, kecuali telah disepakati rincian porsi yang berbeda dalam suatu lampiran tertulis yang merupakan satu kesatuan tak terpisahkan dari perjanjian ini.</li>
            <li className="pl-2">Apabila dipandang perlu, PARA PIHAK dapat menunjuk Kantor Jasa Penilai Publik (KJPP) yang independen untuk menilai harga wajar Objek Warisan secara objektif.</li>
          </ol>

          {/* PASAL 4 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">Setiap pihak berhak secara mutlak atas bagian warisannya sesuai dengan metode pembagian yang tertuang dalam Pasal 3 Perjanjian ini.</li>
            <li className="pl-2">PARA PIHAK berkewajiban untuk saling bekerja sama secara penuh dalam proses pengurusan kelengkapan administrasi, pendaftaran, balik nama, maupun pencairan dana, atau penjualan Objek Warisan.</li>
            <li className="pl-2">Masing-masing pihak wajib menyerahkan dokumen-dokumen pribadi (seperti KTP, KK, Akta Kelahiran, Surat Nikah, dsb.) yang dipersyaratkan oleh instansi berwenang guna memperlancar proses peralihan hak atas Objek Warisan.</li>
          </ol>

          {/* PASAL 5 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 5<br/>BEBAN BIAYA DAN PAJAK</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">Segala macam biaya yang timbul dalam rangka pelaksanaan kesepakatan ini, termasuk namun tidak terbatas pada biaya jasa Notaris/PPAT, pajak waris, pajak penghasilan (PPh), Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB), dan biaya pengurusan sertifikat di Badan Pertanahan Nasional (BPN), akan ditanggung oleh:</li>
            <div className="ml-6 mt-2 mb-2 font-bold uppercase">
              {data.taxBearers === 'proporsional' ? "- PARA PIHAK SECARA PROPORSIONAL" : 
               data.taxBearers === 'pihak_1' ? "- SEPENUHNYA OLEH PIHAK PERTAMA" : 
               "- SEPENUHNYA OLEH PIHAK KEDUA"}
            </div>
            <li className="pl-2">Pembayaran atas biaya dan pajak sebagaimana dimaksud pada ayat (1) wajib diselesaikan terlebih dahulu sebelum proses akhir peralihan hak hukum atas nama masing-masing pihak (atau pihak ketiga pembeli) dilaksanakan.</li>
          </ol>

          {/* PASAL 6 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 6<br/>PERNYATAAN DAN JAMINAN</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">PARA PIHAK secara bersama-sama menyatakan dan menjamin bahwa Objek Warisan sebagaimana disebutkan dalam Pasal 2 bebas dari segala bentuk sitaan hukum, sengketa, hak tanggungan, maupun klaim hutang dari pihak ketiga manapun.</li>
            <li className="pl-2">PARA PIHAK menjamin bahwa tidak ada ahli waris lain yang sah selain PIHAK PERTAMA dan PIHAK KEDUA sebagaimana tercantum dalam Surat Perjanjian ini.</li>
            <li className="pl-2">Apabila di kemudian hari ternyata timbul klaim dari pihak lain yang menyatakan dirinya sebagai ahli waris yang sah, maka hal tersebut menjadi tanggung jawab hukum PARA PIHAK sepenuhnya secara tanggung renteng, dan dengan ini membebaskan pihak instansi terkait (termasuk Notaris/PPAT dan Kelurahan) dari segala bentuk tuntutan.</li>
          </ol>

          {/* PASAL 7 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 7<br/>PENYELESAIAN PERSELISIHAN</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-6">
            <li className="pl-2">Segala bentuk perbedaan pendapat atau perselisihan yang mungkin timbul di kemudian hari akibat penafsiran atau pelaksanaan Perjanjian ini, PARA PIHAK sepakat untuk menyelesaikannya melalui:</li>
            <div className="ml-6 mt-2 mb-2 font-bold uppercase">
              {data.disputeResolution === 'musyawarah' ? "- MUSYAWARAH UNTUK MUFAKAT SECARA KEKELUARGAAN." : 
               "- KEPANITERAAN PENGADILAN NEGERI SETEMPAT DIMANA OBJEK WARISAN BERADA."}
            </div>
            <li className="pl-2">Keputusan yang dihasilkan dari mekanisme penyelesaian perselisihan tersebut bersifat final dan mengikat secara hukum bagi PARA PIHAK.</li>
          </ol>

          {/* PASAL 8 */}
          <div className="text-center font-bold mt-8 mb-2">PASAL 8<br/>KETENTUAN PENUTUP</div>
          <ol className="list-decimal pl-6 space-y-2 text-justify mt-2 mb-10">
            <li className="pl-2">Perjanjian ini dibuat, dipahami, dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani maupun rohani, serta tanpa adanya paksaan, tekanan, atau pengaruh dari pihak manapun juga.</li>
            <li className="pl-2">Hal-hal yang belum cukup diatur dalam Perjanjian ini akan diatur kemudian oleh PARA PIHAK berdasarkan musyawarah mufakat yang akan dituangkan ke dalam bentuk Perjanjian Tambahan (Addendum) dan merupakan satu kesatuan yang tidak terpisahkan dari Perjanjian ini.</li>
            <li className="pl-2">Surat Perjanjian Kesepakatan Pembagian Warisan ini dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai yang cukup, sehingga keduanya memiliki kekuatan pembuktian hukum yang sama bagi masing-masing pihak.</li>
          </ol>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="text-right text-[11pt] mb-12 font-serif">
              Dibuat di {data.city}, pada tanggal {formatDateSafe(data.date)}
            </div>
            
            <div className="flex justify-between items-start text-center text-[11pt] px-4 font-serif">
              <div className="space-y-20 w-1/2">
                 <p className="font-bold">PIHAK PERTAMA</p>
                 <div className="flex flex-col items-center">
                   <div className="border border-slate-300 w-24 h-12 mb-2 flex items-center justify-center text-[8pt] text-slate-400 italic">Meterai 10000</div>
                   <p className="font-bold underline uppercase">{data.party1.name}</p>
                 </div>
              </div>
              <div className="space-y-20 w-1/2">
                 <p className="font-bold">PIHAK KEDUA</p>
                 <div className="flex flex-col items-center">
                   <div className="border border-transparent w-24 h-12 mb-2"></div>
                   <p className="font-bold underline uppercase">{data.party2.name}</p>
                 </div>
              </div>
            </div>

            <div className="mt-16 text-center font-serif">
              <p className="font-bold mb-12">Saksi-Saksi,</p>
              <div className="flex justify-center gap-32">
                <div className="flex flex-col items-center">
                  <p className="font-bold underline uppercase">{data.witness1}</p>
                  <p className="text-[10pt] mt-1">Saksi I</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-bold underline uppercase">{data.witness2}</p>
                  <p className="text-[10pt] mt-1">Saksi II</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };

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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <PenTool size={16} className="text-blue-400" /> <span>Legal Drafter: Kesepakatan Waris</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm z-10">
             <h2 className="font-black text-xs uppercase text-slate-800 flex items-center gap-2">
               <Edit3 size={16} className="text-amber-500" /> Editor Formulir
             </h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form">
               <RotateCcw size={16}/>
             </button>
           </div>
           
           {/* TABS MENU */}
           <div className="flex overflow-x-auto bg-white border-b shrink-0 no-scrollbar text-[10px] font-bold uppercase">
             {[
               { id: 'pewaris', label: 'Pewaris' },
               { id: 'pihak1', label: 'Pihak 1' },
               { id: 'pihak2', label: 'Pihak 2' },
               { id: 'objek', label: 'Objek Waris' },
               { id: 'opsi', label: 'Opsi Hukum' }
             ].map((t) => (
               <button 
                 key={t.id}
                 onClick={() => setActiveTab(t.id as any)}
                 className={`flex-1 py-3 px-3 min-w-[80px] text-center border-b-2 transition-colors ${activeTab === t.id ? 'border-amber-500 text-amber-600 bg-amber-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
               >
                 {t.label}
               </button>
             ))}
           </div>

 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 print:flex print:overflow-visible print:bg-white">
              
              {/* TAB PEWARIS */}
              {activeTab === 'pewaris' && (
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest">Identitas Pewaris (Almarhum)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pewaris</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Pewaris</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 outline-none" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Meninggal</label>
                        <input type="date" className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Wafat</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.deceasedDeathPlace} onChange={e => handleDataChange('deceasedDeathPlace', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB PIHAK 1 */}
              {activeTab === 'pihak1' && (
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest">Identitas Pihak Pertama</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.name} onChange={e => handlePartyChange('party1', 'name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Pihak 1</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.nik} onChange={e => handlePartyChange('party1', 'nik', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan dgn Pewaris</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.relation} onChange={e => handlePartyChange('party1', 'relation', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.birthPlace} onChange={e => handlePartyChange('party1', 'birthPlace', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Lahir</label>
                        <input type="date" className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.birthDate} onChange={e => handlePartyChange('party1', 'birthDate', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1.job} onChange={e => handlePartyChange('party1', 'job', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap KTP</label>
                      <textarea className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none" value={data.party1.address} onChange={e => handlePartyChange('party1', 'address', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB PIHAK 2 */}
              {activeTab === 'pihak2' && (
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest">Identitas Pihak Kedua</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.name} onChange={e => handlePartyChange('party2', 'name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Pihak 2</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.nik} onChange={e => handlePartyChange('party2', 'nik', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan dgn Pewaris</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.relation} onChange={e => handlePartyChange('party2', 'relation', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.birthPlace} onChange={e => handlePartyChange('party2', 'birthPlace', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Lahir</label>
                        <input type="date" className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.birthDate} onChange={e => handlePartyChange('party2', 'birthDate', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2.job} onChange={e => handlePartyChange('party2', 'job', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap KTP</label>
                      <textarea className="w-full p-2 mt-1 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none h-20 resize-none" value={data.party2.address} onChange={e => handlePartyChange('party2', 'address', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB OBJEK WARISAN */}
              {activeTab === 'objek' && (
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Rincian Objek Warisan</h3>
                    <button onClick={addObject} className="flex items-center gap-1 text-[9px] bg-slate-800 text-white px-2 py-1 rounded font-bold uppercase tracking-widest hover:bg-slate-700">
                      <Plus size={12}/> Tambah
                    </button>
                  </div>
                  <div className="space-y-4">
                    {data.objects.map((obj, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative">
                        <button onClick={() => removeObject(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors">
                          <Trash2 size={12}/>
                        </button>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Jenis / Nama Objek</label>
                            <input className="w-full p-1.5 mt-1 bg-white border rounded text-xs focus:ring-2 focus:ring-slate-400 outline-none" placeholder="Cth: Sebidang Tanah, Mobil..." value={obj.type} onChange={e => updateObject(idx, 'type', e.target.value)} />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Deskripsi / Detail Legalitas</label>
                            <textarea className="w-full p-1.5 mt-1 bg-white border rounded text-xs focus:ring-2 focus:ring-slate-400 outline-none h-16 resize-none" placeholder="Cth: SHM No.123 seluas 500m2..." value={obj.description} onChange={e => updateObject(idx, 'description', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB OPSI HUKUM */}
              {activeTab === 'opsi' && (
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest">Pengaturan Hukum & Penutup</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Metode Pembagian (Pasal 3)</label>
                      <select className="w-full p-2 border rounded-lg text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" value={data.divisionMethod} onChange={e => handleDataChange('divisionMethod', e.target.value)}>
                        <option value="bagi_fisik">Pembagian Natura / Fisik Langsung</option>
                        <option value="jual_bagi_hasil">Dijual Dahulu & Bagi Hasil Penjualan</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Beban Biaya & Pajak (Pasal 5)</label>
                      <select className="w-full p-2 border rounded-lg text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" value={data.taxBearers} onChange={e => handleDataChange('taxBearers', e.target.value)}>
                        <option value="proporsional">Ditanggung Bersama (Proporsional)</option>
                        <option value="pihak_1">Ditanggung Penuh oleh Pihak Pertama</option>
                        <option value="pihak_2">Ditanggung Penuh oleh Pihak Kedua</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Penyelesaian Sengketa (Pasal 7)</label>
                      <select className="w-full p-2 border rounded-lg text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" value={data.disputeResolution} onChange={e => handleDataChange('disputeResolution', e.target.value)}>
                        <option value="musyawarah">Musyawarah untuk Mufakat</option>
                        <option value="pengadilan">Pengadilan Negeri Setempat</option>
                      </select>
                    </div>
                  </div>

                  <hr className="my-4"/>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase">Informasi Penandatanganan</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Dokumen</label>
                        <input type="date" className="w-full p-2 mt-1 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Saksi 1</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Saksi 2</label>
                        <input className="w-full p-2 mt-1 border rounded-lg text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                      </div>
                    </div>
                  </div>

                </div>
              )}

           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-300/50 rounded-tl-2xl shadow-inner flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.85] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Kesepakatan_Waris" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
