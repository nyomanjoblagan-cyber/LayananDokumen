'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface KematianData {
  city: string;
  dateStr: string;
  
  // Pihak Pertama
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Job: string;
  pihak1Address: string;

  // Pihak Kedua
  pihak2Name: string;
  pihak2Nik: string;
  pihak2Pob: string;
  pihak2Dob: string;
  pihak2Job: string;
  pihak2Address: string;

  // Almarhum
  aName: string; 
  aNik: string; 
  aPob: string; 
  aDob: string; 
  aGender: string;
  aReligion: string; 
  aJob: string; 
  aAddress: string;
  aDateOfDeath: string;
  aPlaceOfDeath: string;
  aCauseOfDeath: string;

  // Opsi Dinamis
  warisanMetode: 'Tunai' | 'Aset Tetap' | 'Penangguhan';
  hutangTanggungan: 'Dibayar Bersama' | 'Diambil Alih Pihak Pertama' | 'Tidak Ada Hutang';
  sengketaDomisili: string;
}

const INITIAL_DATA: KematianData = {
  city: 'Sleman',
  dateStr: '2026-07-13',

  pihak1Name: 'SITI AMINAH',
  pihak1Nik: '3404010101800002',
  pihak1Pob: 'Bantul',
  pihak1Dob: '1980-08-20',
  pihak1Job: 'Wiraswasta',
  pihak1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',

  pihak2Name: 'AHMAD FAUZI',
  pihak2Nik: '3404010101900003',
  pihak2Pob: 'Sleman',
  pihak2Dob: '1990-12-05',
  pihak2Job: 'Pegawai Negeri Sipil',
  pihak2Address: 'Jl. Gejayan No. 45, Sleman, Yogyakarta',

  aName: 'BUDI SANTOSO', 
  aNik: '3404010101740001', 
  aPob: 'Sleman', 
  aDob: '1974-05-12', 
  aGender: 'Laki-laki', 
  aReligion: 'Islam', 
  aJob: 'Pensiunan', 
  aAddress: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',
  aDateOfDeath: '2026-07-11',
  aPlaceOfDeath: 'RSUP Dr. Sardjito',
  aCauseOfDeath: 'Sakit',

  warisanMetode: 'Aset Tetap',
  hutangTanggungan: 'Dibayar Bersama',
  sengketaDomisili: 'Pengadilan Negeri Sleman'
};

export default function KematianDraftPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <KematianBuilder />
    </Suspense>
  );
}

function KematianBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KematianData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'almarhum' | 'opsi'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof KematianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0" id="print-only-root">
          <Kertas className="print:w-full print:min-w-0">
             {/* JUDUL DOKUMEN */}
             <div className="text-center mb-10 pb-2">
                 <h1 className="font-bold text-xl uppercase tracking-wider underline">AKTA PERNYATAAN KEMATIAN DAN KESEPAKATAN PENGURUSAN HARTA PENINGGALAN</h1>
                 <p className="text-sm mt-1">Nomor: 474.3 / {new Date().getFullYear()} / LGL-KMTN</p>
             </div>

             <div className="mb-6 text-justify">
                 <p className="mb-4">
                     Pada hari ini, tanggal {formatDateSafe(data.dateStr)}, bertempat di {data.city}, yang bertanda tangan di bawah ini:
                 </p>
             </div>

             {/* PIHAK PERTAMA */}
             <div className="mb-6 text-justify">
                 <div className="flex">
                     <div className="w-8">1.</div>
                     <div className="flex-1">
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Nama Lengkap</div>
                             <div className="w-4 shrink-0">:</div>
                             <div className="font-bold uppercase">{data.pihak1Name}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak1Nik}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak1Pob}, {formatDateSafe(data.pihak1Dob)}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Pekerjaan</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak1Job}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Alamat Lengkap</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak1Address}</div>
                         </div>
                     </div>
                 </div>
                 <p className="mt-2 ml-8">
                     Untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                 </p>
             </div>

             {/* PIHAK KEDUA */}
             <div className="mb-6 text-justify">
                 <div className="flex">
                     <div className="w-8">2.</div>
                     <div className="flex-1">
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Nama Lengkap</div>
                             <div className="w-4 shrink-0">:</div>
                             <div className="font-bold uppercase">{data.pihak2Name}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak2Nik}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak2Pob}, {formatDateSafe(data.pihak2Dob)}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Pekerjaan</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak2Job}</div>
                         </div>
                         <div className="flex flex-row mb-1">
                             <div className="w-48 shrink-0">Alamat Lengkap</div>
                             <div className="w-4 shrink-0">:</div>
                             <div>{data.pihak2Address}</div>
                         </div>
                     </div>
                 </div>
                 <p className="mt-2 ml-8">
                     Untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                 </p>
             </div>

             <div className="mb-6 text-justify">
                 <p>
                     PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:
                 </p>
             </div>

             <div className="mb-6 text-justify">
                 <ol className="list-[lower-alpha] pl-6 space-y-2">
                     <li>
                         Bahwa PARA PIHAK adalah pihak-pihak yang berkepentingan dan memiliki hubungan kekeluargaan yang sah dengan Almarhum/Almarhumah <strong>{data.aName}</strong> (selanjutnya disebut "<strong>ALMARHUM</strong>").
                     </li>
                     <li>
                         Bahwa ALMARHUM telah meninggal dunia pada tanggal {formatDateSafe(data.aDateOfDeath)} di {data.aPlaceOfDeath} karena {data.aCauseOfDeath}.
                     </li>
                     <li>
                         Bahwa sehubungan dengan wafatnya ALMARHUM, PARA PIHAK bermaksud untuk membuat pernyataan hukum yang mengikat terkait status kematian dan mengatur kesepakatan tata cara pengurusan kewajiban serta harta peninggalan ALMARHUM.
                     </li>
                 </ol>
             </div>

             <div className="mb-6 text-justify">
                 <p>
                     Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk saling mengikatkan diri dalam Akta Pernyataan Kematian dan Kesepakatan Pengurusan Harta Peninggalan (selanjutnya disebut "<strong>Akta Perjanjian</strong>") dengan syarat dan ketentuan yang diatur dalam pasal-pasal berikut ini:
                 </p>
             </div>

             {/* PASAL 1 */}
             <div className="mb-6 text-justify">
                 <h2 className="font-bold text-center mb-2">PASAL 1<br/>DEFINISI</h2>
                 <p>Dalam Akta Perjanjian ini, kecuali konteksnya menentukan lain, istilah-istilah di bawah ini memiliki makna sebagai berikut:</p>
                 <ol className="list-decimal pl-6 space-y-2 mt-2">
                     <li><strong>Almarhum</strong> adalah {data.aName}, NIK {data.aNik}, yang lahir di {data.aPob} pada tanggal {formatDateSafe(data.aDob)}, dan telah meninggal dunia sebagaimana dinyatakan dalam Akta ini.</li>
                     <li><strong>Harta Peninggalan</strong> adalah seluruh aset, baik benda bergerak maupun tidak bergerak, berwujud maupun tidak berwujud, serta hak-hak lain yang bernilai ekonomis yang ditinggalkan oleh Almarhum.</li>
                     <li><strong>Hutang dan Pajak</strong> adalah segala bentuk kewajiban finansial yang belum diselesaikan oleh Almarhum hingga saat meninggal dunia, termasuk namun tidak terbatas pada hutang kepada pihak ketiga dan tunggakan pajak kepada negara.</li>
                 </ol>
             </div>

             {/* PASAL 2 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 2<br/>PERNYATAAN KEMATIAN</h2>
                 <p>
                     PARA PIHAK dengan ini secara bersama-sama menyatakan, mengkonfirmasi, dan membenarkan bahwa Almarhum dengan identitas sebagai berikut:
                 </p>
                 <div className="flex flex-row mb-1 mt-2 ml-4">
                     <div className="w-48 shrink-0">Nama Lengkap</div>
                     <div className="w-4 shrink-0">:</div>
                     <div className="font-bold">{data.aName}</div>
                 </div>
                 <div className="flex flex-row mb-1 ml-4">
                     <div className="w-48 shrink-0">NIK</div>
                     <div className="w-4 shrink-0">:</div>
                     <div>{data.aNik}</div>
                 </div>
                 <div className="flex flex-row mb-1 ml-4">
                     <div className="w-48 shrink-0">Agama</div>
                     <div className="w-4 shrink-0">:</div>
                     <div>{data.aReligion}</div>
                 </div>
                 <div className="flex flex-row mb-1 ml-4">
                     <div className="w-48 shrink-0">Alamat Terakhir</div>
                     <div className="w-4 shrink-0">:</div>
                     <div>{data.aAddress}</div>
                 </div>
                 <p className="mt-2">
                     Telah benar-benar meninggal dunia pada tanggal {formatDateSafe(data.aDateOfDeath)} di {data.aPlaceOfDeath}. Pernyataan ini dibuat dengan sebenar-benarnya untuk digunakan sebagai landasan hukum dalam pengurusan administrasi kependudukan dan hak-hak keperdataan lainnya.
                 </p>
             </div>

             {/* PASAL 3 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 3<br/>OBJEK KESEPAKATAN</h2>
                 <p>
                     Akta Perjanjian ini mengatur mengenai komitmen PARA PIHAK dalam hal:
                 </p>
                 <ol className="list-decimal pl-6 space-y-2 mt-2">
                     <li>Pengurusan surat-surat keterangan kematian di instansi pemerintah yang berwenang.</li>
                     <li>Penyelesaian kewajiban, hutang, dan pajak yang ditinggalkan oleh Almarhum.</li>
                     <li>Pengurusan dan pengelolaan Harta Peninggalan sementara sebelum dilakukan pembagian waris secara final sesuai hukum yang berlaku.</li>
                 </ol>
             </div>

             {/* PASAL 4 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK</h2>
                 <ol className="list-decimal pl-6 space-y-2">
                     <li>
                         <strong>Hak PARA PIHAK:</strong> Memperoleh informasi secara transparan mengenai seluruh aset, rekening bank, dokumen berharga, dan rincian kewajiban yang ditinggalkan oleh Almarhum.
                     </li>
                     <li>
                         <strong>Kewajiban PIHAK PERTAMA:</strong> Bertindak sebagai kuasa utama untuk mengurus penerbitan Akta Kematian dari Dinas Kependudukan dan Pencatatan Sipil serta menyampaikan laporan progres kepada PIHAK KEDUA.
                     </li>
                     <li>
                         <strong>Kewajiban PIHAK KEDUA:</strong> Membantu kelancaran administrasi yang dibutuhkan PIHAK PERTAMA dan menahan diri dari tindakan yang berpotensi menghilangkan atau memindahtangankan Harta Peninggalan secara sepihak.
                     </li>
                 </ol>
             </div>

             {/* PASAL 5 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 5<br/>PENGURUSAN HARTA PENINGGALAN</h2>
                 <p>
                     Terkait dengan pengurusan awal terhadap Harta Peninggalan, PARA PIHAK telah bersepakat bahwa pengelolaan dan inventarisasi aset Almarhum akan menggunakan metode <strong>{data.warisanMetode}</strong>, dengan penjabaran sebagai berikut:
                 </p>
                 <div className="mt-2 ml-4">
                     {data.warisanMetode === 'Tunai' && (
                         <p>
                             Seluruh Harta Peninggalan yang bersifat likuid (dana tunai, saldo rekening, deposito) akan dikumpulkan ke dalam satu rekening penampungan bersama yang disetujui PARA PIHAK untuk mencegah penyalahgunaan sebelum dilakukan pembagian final.
                         </p>
                     )}
                     {data.warisanMetode === 'Aset Tetap' && (
                         <p>
                             Seluruh Harta Peninggalan berupa aset tetap (tanah, bangunan, kendaraan bermotor) akan dibekukan status kepemilikannya dan dikelola secara pasif, serta dilarang untuk dialihkan, dijaminkan, atau dijual tanpa persetujuan tertulis dari seluruh ahli waris yang sah.
                         </p>
                     )}
                     {data.warisanMetode === 'Penangguhan' && (
                         <p>
                             Segala bentuk inventarisasi, pencairan, dan pembagian Harta Peninggalan ditangguhkan pengurusannya hingga ditunjuknya seorang Kuasa atau Executor (Pelaksana Wasiat) yang sah sesuai dengan putusan atau penetapan pengadilan yang berwenang.
                         </p>
                     )}
                 </div>
             </div>

             {/* PASAL 6 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 6<br/>PENYELESAIAN HUTANG DAN PAJAK ALMARHUM</h2>
                 <p>
                     Berdasarkan inventarisasi kewajiban yang ada, PARA PIHAK sepakat bahwa terkait hutang kepada pihak ketiga dan tunggakan pajak yang ditinggalkan oleh Almarhum, akan diberlakukan ketentuan: <strong>{data.hutangTanggungan}</strong>.
                 </p>
                 <div className="mt-2 ml-4">
                     {data.hutangTanggungan === 'Dibayar Bersama' && (
                         <p>
                             Semua kewajiban finansial Almarhum akan dibayar secara proporsional atau ditanggung secara bersama-sama oleh PARA PIHAK dan/atau ahli waris lainnya yang sah, dengan mengambil dana dari Harta Peninggalan terlebih dahulu.
                         </p>
                     )}
                     {data.hutangTanggungan === 'Diambil Alih Pihak Pertama' && (
                         <p>
                             Seluruh beban hutang dan kewajiban pajak Almarhum diambil alih sepenuhnya dan akan dilunasi oleh PIHAK PERTAMA atas dasar inisiatif pribadi, yang mana hal ini akan diperhitungkan di kemudian hari dalam pembagian warisan.
                         </p>
                     )}
                     {data.hutangTanggungan === 'Tidak Ada Hutang' && (
                         <p>
                             PARA PIHAK menyatakan sejauh pengetahuan mereka, Almarhum tidak meninggalkan hutang atau kewajiban finansial kepada pihak manapun. Apabila di kemudian hari terdapat tagihan, maka akan diselesaikan secara musyawarah oleh PARA PIHAK.
                         </p>
                     )}
                 </div>
             </div>

             {/* PASAL 7 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 7<br/>FORCE MAJEURE</h2>
                 <p>
                     Apabila terjadi hal-hal di luar kekuasaan PARA PIHAK (Force Majeure) yang mengakibatkan keterlambatan atau kegagalan dalam pelaksanaan Akta Perjanjian ini, seperti bencana alam, kebakaran, huru-hara, atau perubahan regulasi pemerintah, maka pihak yang mengalaminya tidak dapat dituntut ganti rugi, dengan syarat harus memberitahukan kepada pihak lainnya secara tertulis paling lambat 7 (tujuh) hari kalender sejak terjadinya keadaan tersebut.
                 </p>
             </div>

             {/* PASAL 8 */}
             <div className="mb-6 text-justify break-inside-avoid">
                 <h2 className="font-bold text-center mb-2">PASAL 8<br/>PENYELESAIAN SENGKETA</h2>
                 <ol className="list-decimal pl-6 space-y-2">
                     <li>Segala perselisihan yang timbul sebagai akibat dari penafsiran atau pelaksanaan Akta Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mufakat.</li>
                     <li>
                         Apabila penyelesaian secara musyawarah sebagaimana dimaksud pada ayat (1) tidak tercapai, maka PARA PIHAK sepakat untuk memilih domisili hukum yang tetap dan seumumnya di Kepaniteraan <strong>{data.sengketaDomisili}</strong>.
                     </li>
                 </ol>
             </div>

             {/* PENUTUP */}
             <div className="mb-8 text-justify break-inside-avoid">
                 <p>
                     Demikian Akta Perjanjian ini dibuat dan ditandatangani oleh PARA PIHAK pada hari dan tanggal sebagaimana disebutkan pada awal Akta Perjanjian, dibuat dalam rangkap 2 (dua) yang masing-masing bermeterai cukup dan mempunyai kekuatan hukum yang sama.
                 </p>
             </div>

             {/* TANDA TANGAN */}
             <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                 <div>
                     <p className="mb-24"><strong>PIHAK PERTAMA</strong></p>
                     <p className="font-bold underline uppercase">{data.pihak1Name}</p>
                 </div>
                 <div>
                     <p className="mb-24"><strong>PIHAK KEDUA</strong></p>
                     <p className="font-bold underline uppercase">{data.pihak2Name}</p>
                 </div>
             </div>
          </Kertas>
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Akta Kematian & Ahli Waris</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak I</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak II</button>
              <button onClick={() => setActiveTab('almarhum')} className={`flex-1 py-3 border-r ${activeTab === 'almarhum' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Almarhum</button>
              <button onClick={() => setActiveTab('opsi')} className={`flex-1 py-3 ${activeTab === 'opsi' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Opsi</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Pertama</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} placeholder="Contoh: SITI AMINAH" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Pob} onChange={e => handleDataChange('pihak1Pob', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Dob} onChange={e => handleDataChange('pihak1Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Job} onChange={e => handleDataChange('pihak1Job', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} placeholder="Alamat Sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Pihak Kedua</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihak2Name} onChange={e => handleDataChange('pihak2Name', e.target.value)} placeholder="Contoh: AHMAD FAUZI" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Pob} onChange={e => handleDataChange('pihak2Pob', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Dob} onChange={e => handleDataChange('pihak2Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Job} onChange={e => handleDataChange('pihak2Job', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihak2Address} onChange={e => handleDataChange('pihak2Address', e.target.value)} placeholder="Alamat Sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'almarhum' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Identitas Almarhum/Almarhumah</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.aName} onChange={e => handleDataChange('aName', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aNik} onChange={e => handleDataChange('aNik', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aPob} onChange={e => handleDataChange('aPob', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aDob} onChange={e => handleDataChange('aDob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aReligion} onChange={e => handleDataChange('aReligion', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Meninggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aDateOfDeath} onChange={e => handleDataChange('aDateOfDeath', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Meninggal</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aPlaceOfDeath} onChange={e => handleDataChange('aPlaceOfDeath', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sebab Meninggal</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aCauseOfDeath} onChange={e => handleDataChange('aCauseOfDeath', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Terakhir</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.aAddress} onChange={e => handleDataChange('aAddress', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'opsi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Pengaturan Klausul Perjanjian</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pengurusan Warisan</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.warisanMetode} onChange={e => handleDataChange('warisanMetode', e.target.value)}>
                      <option value="Tunai">Pencairan Tunai ke Rekening Bersama</option>
                      <option value="Aset Tetap">Pembekuan Aset Tetap</option>
                      <option value="Penangguhan">Penangguhan hingga Penetapan Pengadilan</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggungan Hutang & Pajak Almarhum</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.hutangTanggungan} onChange={e => handleDataChange('hutangTanggungan', e.target.value)}>
                      <option value="Dibayar Bersama">Dibayar Bersama / Proporsional</option>
                      <option value="Diambil Alih Pihak Pertama">Diambil Alih Pihak Pertama</option>
                      <option value="Tidak Ada Hutang">Tidak Ada Hutang (Nihil)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Domisili Hukum Sengketa</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.sengketaDomisili} onChange={e => handleDataChange('sengketaDomisili', e.target.value)} placeholder="Contoh: Pengadilan Negeri Jakarta Selatan" />
                </div>

                <div className="pt-4 border-t mt-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-600 mb-2">PENGATURAN SURAT</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Perjanjian</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.dateStr} onChange={e => handleDataChange('dateStr', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 bg-slate-200 overflow-y-auto relative p-4 md:p-8 custom-scrollbar no-print-area print:p-0 print:bg-white print:overflow-visible print:hidden print:static">
          <DocumentContent />
        </div>

      </main>
      
      {/* MOBILE TOGGLE (TOMBOL MENGAMBANG) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50 no-print">
         <button 
            onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')}
            className="bg-slate-900 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all"
         >
            {mobileView === 'editor' ? <Printer size={24} /> : <Edit3 size={24} />}
         </button>
      </div>
    </div>
  );
}
