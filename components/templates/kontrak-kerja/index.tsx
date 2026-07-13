'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, LayoutTemplate, Briefcase, User, 
  RotateCcw, ArrowLeftCircle, Edit3, Settings, Building, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

export default function ContractPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <ContractToolBuilder />
    </Suspense>
  );
}

function ContractToolBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  
  // ==========================================
  // STATE: DOKUMEN & KONTRAK
  // ==========================================
  const [contractType, setContractType] = useState<'PKWT' | 'PKWTT'>('PKWT');
  const [docDate, setDocDate] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [docNumber, setDocNumber] = useState('');
  
  // ==========================================
  // STATE: PIHAK PERTAMA (PERUSAHAAN)
  // ==========================================
  const [compName, setCompName] = useState('PT MEGA MAJU ABADI');
  const [compAddress, setCompAddress] = useState('Gedung Cyber 2, Lt. 10, Jl. H.R. Rasuna Said Blok X-5, Kuningan, Jakarta Selatan 12950');
  const [compRep, setCompRep] = useState('Budi Santoso, S.E., M.B.A.');
  const [compRepKtp, setCompRepKtp] = useState('3174001234560001');
  const [compRepTitle, setCompRepTitle] = useState('Direktur Utama');
  
  // ==========================================
  // STATE: PIHAK KEDUA (KARYAWAN)
  // ==========================================
  const [empName, setEmpName] = useState('Ahmad Fauzi');
  const [empKtp, setEmpKtp] = useState('3271009876540002');
  const [empPob, setEmpPob] = useState('Bandung');
  const [empDob, setEmpDob] = useState('1995-08-17');
  const [empJob, setEmpJob] = useState('Karyawan Swasta');
  const [empAddress, setEmpAddress] = useState('Jl. Merpati Putih No. 12, RT 04/RW 02, Kebon Jeruk, Jakarta Barat');
  
  // ==========================================
  // STATE: DETAIL PEKERJAAN
  // ==========================================
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [department, setDepartment] = useState('Engineering & IT');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [probation, setProbation] = useState('3');
  const [salary, setSalary] = useState<number | ''>(15000000);
  const [workDays, setWorkDays] = useState('Senin s/d Jumat');
  const [workHours, setWorkHours] = useState('09:00 - 18:00 WIB');

  // ==========================================
  // INITIALIZATION & EFFECT LIFECYCLES
  // ==========================================
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setDocDate(today.toISOString().split('T')[0]);
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextYear.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (isClient) {
      const typeStr = contractType === 'PKWT' ? 'PKWT' : 'PKWTT';
      const randNo = Math.floor(100 + Math.random() * 900);
      setDocNumber(`${randNo}/HRD-${typeStr}/${new Date().getFullYear()}`);
    }
  }, [contractType, isClient]);

  // ==========================================
  // FORMATTERS
  // ==========================================
  const formatDateFull = (dateStr: string) => {
    if (!dateStr) return '...';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'full' });
    } catch { return dateStr; }
  };
  
  const formatDateMedium = (dateStr: string) => {
    if (!dateStr) return '...';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
    } catch { return dateStr; }
  };

  const formatRp = (amount: number | '') => {
    if (amount === '') return '0';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // ==========================================
  // COMPONENT: KERTAS / WRAPPER PRINT
  // ==========================================
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  // ==========================================
  // COMPONENT: KONTEN DOKUMEN KONTRAK
  // ==========================================
  const ContractDocument = () => (
    <div className="flex flex-col h-full text-justify">
       <div className="text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="font-bold text-xl uppercase tracking-wide">PERJANJIAN KERJA WAKTU {contractType === 'PKWT' ? 'TERTENTU' : 'TIDAK TERTENTU'}</h1>
          <div className="text-sm font-bold mt-1">Nomor: {docNumber}</div>
       </div>
 
       <div className="mb-6">
          Pada hari ini, <strong>{formatDateFull(docDate)}</strong>, bertempat di <strong>{city}</strong>, telah disepakati dan ditandatangani Perjanjian Kerja Waktu {contractType === 'PKWT' ? 'Tertentu (selanjutnya disebut "PKWT")' : 'Tidak Tertentu (selanjutnya disebut "PKWTT")'} antara:
       </div>
 
       <div className="mb-6 space-y-4">
          {/* PIHAK PERTAMA */}
          <div className="flex gap-4">
             <div className="font-bold w-6">I.</div>
             <div className="flex-1">
                <div className="mb-2 space-y-1">
                   <div className="flex"><div className="w-40 md:w-48">Nama Lengkap</div><div className="mr-2">:</div><div className="font-bold uppercase flex-1">{compRep}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">NIK</div><div className="mr-2">:</div><div className="flex-1">{compRepKtp}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">Jabatan</div><div className="mr-2">:</div><div className="flex-1">{compRepTitle}</div></div>
                   <div className="flex"><div className="w-40 md:w-48 align-top">Alamat Perusahaan</div><div className="mr-2 align-top">:</div><div className="flex-1">{compAddress}</div></div>
                </div>
                <div className="text-justify mt-2">
                   Bertindak untuk dan atas nama <strong>{compName}</strong>, selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                </div>
             </div>
          </div>
 
          {/* PIHAK KEDUA */}
          <div className="flex gap-4">
             <div className="font-bold w-6">II.</div>
             <div className="flex-1">
                <div className="mb-2 space-y-1">
                   <div className="flex"><div className="w-40 md:w-48">Nama Lengkap</div><div className="mr-2">:</div><div className="font-bold uppercase flex-1">{empName}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">NIK</div><div className="mr-2">:</div><div className="flex-1">{empKtp}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">Tempat, Tgl Lahir</div><div className="mr-2">:</div><div className="flex-1">{empPob}, {formatDateMedium(empDob)}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">Pekerjaan</div><div className="mr-2">:</div><div className="flex-1">{empJob}</div></div>
                   <div className="flex"><div className="w-40 md:w-48 align-top">Alamat (Sesuai KTP)</div><div className="mr-2 align-top">:</div><div className="flex-1">{empAddress}</div></div>
                </div>
                <div className="text-justify mt-2">
                   Bertindak untuk dan atas nama diri sendiri, selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                </div>
             </div>
          </div>
       </div>
 
       <div className="mb-8">
          PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>"Para Pihak"</strong>. Para Pihak dengan ini sepakat untuk mengikatkan diri dalam Perjanjian ini dengan tunduk pada ketentuan perundang-undangan di bidang ketenagakerjaan Republik Indonesia serta syarat dan ketentuan di bawah ini:
       </div>
 
       {/* PASAL 1: MASA KERJA & JABATAN */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 1<br/>MASA KERJA DAN PENEMPATAN
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Perjanjian ini berlaku terhitung sejak tanggal <strong>{formatDateMedium(startDate)}</strong>. 
                {contractType === 'PKWT' ? (
                   <> Dan disepakati berlangsung selama masa PKWT yang akan berakhir pada tanggal <strong>{formatDateMedium(endDate)}</strong>.</>
                ) : (
                   <> Perjanjian ini berlaku untuk jangka waktu tidak tertentu (pekerja tetap), dengan ketentuan PIHAK KEDUA wajib menjalani masa percobaan (probation) selama <strong>{probation} bulan</strong> pertama.</>
                )}
             </li>
             <li className="pl-2">
                PIHAK PERTAMA menempatkan dan mempekerjakan PIHAK KEDUA pada posisi/jabatan sebagai <strong>{jobTitle}</strong> di bawah naungan departemen <strong>{department}</strong>.
             </li>
             <li className="pl-2">
                PIHAK KEDUA bersedia dan sepakat untuk ditempatkan, dipindahtugaskan, atau dialihkan ke bagian, departemen, atau lokasi kerja lain yang ditentukan oleh PIHAK PERTAMA sewaktu-waktu sesuai dengan kebutuhan operasional dan strategi bisnis perusahaan.
             </li>
          </ol>
       </div>
 
       {/* PASAL 2: HAK & KEWAJIBAN PERUSAHAAN */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 2<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                PIHAK PERTAMA berhak penuh untuk menerima hasil pekerjaan, mengawasi, serta memberikan evaluasi berkala terhadap kinerja (Key Performance Indicator) PIHAK KEDUA sesuai standar perusahaan.
             </li>
             <li className="pl-2">
                PIHAK PERTAMA berhak memberikan perintah, instruksi, serta teguran baik lisan maupun tulisan apabila PIHAK KEDUA dinilai tidak melaksanakan tugasnya dengan baik atau melakukan pelanggaran.
             </li>
             <li className="pl-2">
                PIHAK PERTAMA berkewajiban membayarkan upah/gaji, tunjangan (jika ada), dan hak-hak kompensasi lainnya kepada PIHAK KEDUA tepat waktu sebagaimana diatur dalam Pasal 4.
             </li>
             <li className="pl-2">
                PIHAK PERTAMA berkewajiban menyediakan fasilitas pendukung kerja yang memadai serta memastikan lingkungan kerja yang aman, kondusif, dan sehat bagi PIHAK KEDUA.
             </li>
          </ol>
       </div>
 
       {/* PASAL 3: HAK & KEWAJIBAN KARYAWAN */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 3<br/>HAK DAN KEWAJIBAN PIHAK KEDUA
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                PIHAK KEDUA berhak menerima upah, fasilitas kerja, serta perlindungan ketenagakerjaan dari PIHAK PERTAMA sesuai ketentuan perundang-undangan dan kebijakan internal perusahaan.
             </li>
             <li className="pl-2">
                PIHAK KEDUA wajib melaksanakan seluruh tugas dan tanggung jawab jabatannya dengan tingkat profesionalisme tertinggi, penuh dedikasi, integritas, dan tanggung jawab moral.
             </li>
             <li className="pl-2">
                PIHAK KEDUA wajib menaati dan tunduk secara mutlak pada seluruh Peraturan Perusahaan, Standar Operasional Prosedur (SOP), Kode Etik, serta kebijakan internal lainnya yang berlaku di lingkungan PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                PIHAK KEDUA wajib memelihara dan merawat seluruh aset perusahaan, fasilitas kerja, dan dokumen yang berada di bawah penguasaannya, serta senantiasa menjaga nama baik (reputasi) PIHAK PERTAMA.
             </li>
          </ol>
       </div>
 
       {/* PASAL 4: WAKTU KERJA & PENGUPAHAN */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 4<br/>WAKTU KERJA DAN PENGUPAHAN
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Waktu kerja PIHAK KEDUA ditetapkan pada hari <strong>{workDays}</strong> dengan jam operasional dari pukul <strong>{workHours}</strong>, kecuali diatur lain berdasarkan kebijakan khusus perusahaan, urgensi bisnis, atau sistem shift.
             </li>
             <li className="pl-2">
                Sebagai imbalan atas pelaksanaan tugas dan tanggung jawabnya, PIHAK PERTAMA akan memberikan upah pokok bulanan (Gaji) kepada PIHAK KEDUA sebesar <strong>{formatRp(salary || 0)}</strong>.
             </li>
             <li className="pl-2">
                Upah tersebut di atas bersifat gross (kotor), di mana pembayarannya akan dikenakan pemotongan Pajak Penghasilan (PPh 21), iuran kewajiban BPJS Ketenagakerjaan, BPJS Kesehatan, maupun potongan sah lainnya sesuai peraturan yang berlaku.
             </li>
             <li className="pl-2">
                Pembayaran upah akan dilakukan setiap akhir bulan kalender berjalan atau pada tanggal yang telah ditetapkan dalam kebijakan penggajian (payroll) melalui mekanisme transfer bank ke rekening atas nama PIHAK KEDUA.
             </li>
          </ol>
       </div>
 
       {/* PASAL 5: HKI (INTELECTUAL PROPERTY) */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 5<br/>HAK KEKAYAAN INTELEKTUAL (HKI)
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Segala bentuk karya cipta, inovasi, sistem, basis data, kode perangkat lunak, desain, formula, materi pemasaran, metode bisnis, dan/atau temuan apa pun yang diciptakan, diinisiasi, atau dikembangkan oleh PIHAK KEDUA (baik secara mandiri maupun bersama tim) selama masa hubungan kerjanya dengan PIHAK PERTAMA merupakan <strong>Hak Kekayaan Intelektual mutlak milik PIHAK PERTAMA</strong>.
             </li>
             <li className="pl-2">
                PIHAK KEDUA dengan ini sepakat untuk melepaskan segala hak ekonomi dan hak klaim royalti atas karya tersebut. PIHAK KEDUA tidak diperkenankan untuk mendaftarkan, memperbanyak, melisensikan, atau mengkomersialkannya kepada pihak ketiga dengan cara apa pun tanpa izin tertulis dari PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                Pada saat berakhirnya masa kerja atau sewaktu-waktu apabila diminta, PIHAK KEDUA wajib menyerahkan seluruh data, kode sumber (source code), akses kredensial, master desain, dan dokumen kerja kepada manajemen PIHAK PERTAMA tanpa menahan salinan (copy) apa pun.
             </li>
          </ol>
       </div>
 
       {/* PASAL 6: NON-COMPETE & NDA */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 6<br/>KERAHASIAAN DAN LARANGAN BERSAING
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                <strong>Kerahasiaan (Non-Disclosure):</strong> PIHAK KEDUA terikat kewajiban mutlak untuk menjaga kerahasiaan seluruh Informasi Rahasia (Confidential Information) perusahaan. Informasi ini mencakup, namun tidak terbatas pada, data klien/pelanggan, rahasia dagang, strategi bisnis, rencana pemasaran, sistem teknologi, dan informasi keuangan. Kewajiban kerahasiaan ini tetap mengikat dan berlaku tanpa batas waktu meskipun hubungan kerja telah berakhir.
             </li>
             <li className="pl-2">
                <strong>Larangan Bersaing (Non-Compete):</strong> Selama perjanjian ini berlangsung, dan untuk jangka waktu selama <strong>1 (satu) tahun</strong> setelah berakhirnya hubungan kerja, PIHAK KEDUA dilarang, baik secara langsung maupun tidak langsung, untuk bekerja sebagai karyawan, konsultan, pengurus, maupun mendirikan atau memiliki kepentingan kepemilikan bisnis pada perusahaan kompetitor yang bergerak di bidang usaha yang sama dan sejenis dengan PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                <strong>Larangan Pembajakan (Non-Solicitation):</strong> Selama jangka waktu 2 (dua) tahun setelah berakhirnya hubungan kerja, PIHAK KEDUA dilarang secara sengaja untuk membujuk, merekrut, atau mempekerjakan karyawan PIHAK PERTAMA, serta dilarang membujuk klien atau mitra bisnis untuk menghentikan kerja samanya dengan PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                Setiap pelanggaran yang terbukti dilakukan oleh PIHAK KEDUA terhadap ketentuan Pasal ini memberikan hak hukum bagi PIHAK PERTAMA untuk menuntut ganti rugi materiil secara perdata dan/atau memproses perbuatan tersebut secara pidana.
             </li>
          </ol>
       </div>
 
       {/* PASAL 7: PHK */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 7<br/>PEMUTUSAN HUBUNGAN KERJA (PHK)
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Hubungan kerja antara Para Pihak berakhir dengan sendirinya apabila:
                <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                   {contractType === 'PKWT' ? (
                      <li>a. Berakhirnya jangka waktu PKWT sebagaimana disepakati secara tegas pada Pasal 1 ayat (1).</li>
                   ) : (
                      <li>a. PIHAK KEDUA memasuki usia pensiun sesuai dengan peraturan ketenagakerjaan dan/atau kebijakan perusahaan.</li>
                   )}
                   <li>b. PIHAK KEDUA meninggal dunia atau tidak mampu lagi melaksanakan pekerjaan secara medis akibat cacat tetap (permanent disability).</li>
                </ul>
             </li>
             <li className="pl-2">
                PIHAK PERTAMA memiliki hak penuh dan berhak melakukan Pemutusan Hubungan Kerja (PHK) seketika terhadap PIHAK KEDUA, tanpa kewajiban membayarkan kompensasi atau pesangon, jika PIHAK KEDUA terbukti secara meyakinkan melakukan <strong>pelanggaran berat (fraud)</strong>, yang meliputi namun tidak terbatas pada: penipuan, penggelapan aset, manipulasi data, pembocoran rahasia perusahaan, tindakan asusila, konsumsi minuman keras/narkoba di lingkungan kerja, atau perbuatan pidana lainnya.
             </li>
             <li className="pl-2">
                Apabila PIHAK KEDUA bermaksud mengundurkan diri dari perusahaan secara sukarela (resign), PIHAK KEDUA diwajibkan untuk mengajukan surat pemberitahuan tertulis <em>(One Month Notice)</em> kepada manajemen selambat-lambatnya <strong>30 (tiga puluh) hari kalender</strong> sebelum tanggal efektif pengunduran diri, guna memastikan serah terima pekerjaan (handover) berjalan dengan baik.
             </li>
          </ol>
       </div>
 
       {/* PASAL 8: PENUTUP */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 8<br/>PENYELESAIAN SENGKETA DAN PENUTUP
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Segala perselisihan yang mungkin timbul akibat dari penafsiran, pelaksanaan, atau pemutusan Perjanjian Kerja ini, sedapat mungkin akan diselesaikan melalui jalur musyawarah untuk mufakat antara Para Pihak (Bipartit).
             </li>
             <li className="pl-2">
                Apabila penyelesaian melalui musyawarah gagal mencapai titik temu dan kesepakatan, maka Para Pihak sepakat untuk menyelesaikannya melalui instansi pemerintah yang berwenang di bidang Ketenagakerjaan sesuai wilayah domisili hukum kedudukan PIHAK PERTAMA, hingga bermuara pada Pengadilan Hubungan Industrial.
             </li>
             <li className="pl-2">
                Hal-hal esensial yang belum, kurang, atau tidak cukup diatur di dalam Perjanjian ini secara mutlak akan merujuk dan tunduk pada Peraturan Perusahaan, SOP internal, serta norma-norma hukum ketenagakerjaan yang berlaku di wilayah Negara Kesatuan Republik Indonesia.
             </li>
             <li className="pl-2">
                Perjanjian Kerja ini dibuat, dipahami, dan ditandatangani oleh Para Pihak dalam keadaan sadar sepenuhnya, secara sukarela tanpa adanya unsur paksaan, tekanan, intimidasi, atau pengaruh menyesatkan dari pihak mana pun. Dibuat dalam rangkap 2 (dua) dokumen fisik asli, yang masing-masing dibubuhi meterai yang cukup dan memiliki kekuatan hukum pembuktian yang sama bagi masing-masing pihak.
             </li>
          </ol>
       </div>
 
       {/* TANDA TANGAN */}
       <div className="mt-12 break-inside-avoid flex justify-between text-center px-2 md:px-12">
          <div className="w-[45%] flex flex-col items-center">
             <div className="font-bold mb-24 uppercase">PIHAK PERTAMA</div>
             <div className="font-bold underline uppercase">{compRep}</div>
             <div className="text-sm">{compRepTitle}</div>
          </div>
          <div className="w-[45%] flex flex-col items-center">
             <div className="font-bold mb-24 uppercase">PIHAK KEDUA</div>
             <div className="font-bold underline uppercase">{empName}</div>
             <div className="text-sm">Karyawan / Pekerja</div>
          </div>
       </div>
    </div>
  );

  // Jika belum mount (hindari hydration mismatch)
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

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 flex items-center px-4 justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeftCircle size={20} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
             <Briefcase size={16} className="text-blue-500" /> 
             <span className="hidden md:inline">ENTERPRISE CONTRACT BUILDER</span>
             <span className="inline md:hidden">KONTRAK KERJA</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase shadow-lg flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
          <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans shadow-sm">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kontrak</h2>
             <button onClick={() => window.location.reload()} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Data"><RotateCcw size={16}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
             
             {/* SECTION 1: SETTING */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
                   <Settings size={16} className="text-blue-500" />
                   <h3 className="text-xs font-black uppercase text-slate-700 tracking-widest">Pengaturan Kontrak</h3>
                </div>
                <div className="p-4 space-y-4">
                   <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 mb-1.5 block">Jenis Kontrak</label>
                      <div className="flex gap-2">
                         <button onClick={() => setContractType('PKWT')} className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${contractType === 'PKWT' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                            PKWT <span className="text-[10px] font-normal">(Kontrak)</span> {contractType === 'PKWT' && <CheckCircle size={14} className="text-blue-500"/>}
                         </button>
                         <button onClick={() => setContractType('PKWTT')} className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${contractType === 'PKWTT' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                            PKWTT <span className="text-[10px] font-normal">(Tetap)</span> {contractType === 'PKWTT' && <CheckCircle size={14} className="text-blue-500"/>}
                         </button>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div>
                         <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Tanggal Dokumen</label>
                         <input type="date" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={docDate} onChange={e => setDocDate(e.target.value)} />
                      </div>
                      <div>
                         <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Kota Ttd</label>
                         <input type="text" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={city} onChange={e => setCity(e.target.value)} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Nomor Surat</label>
                      <input type="text" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={docNumber} onChange={e => setDocNumber(e.target.value)} />
                   </div>
                </div>
             </div>
       
             {/* SECTION 2: PERUSAHAAN */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
                   <Building size={16} className="text-emerald-500" />
                   <h3 className="text-xs font-black uppercase text-slate-700 tracking-widest">Pihak Pertama (Perusahaan)</h3>
                </div>
                <div className="p-4 space-y-3">
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Nama Perusahaan</label>
                   <input className="w-full p-2 border rounded text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={compName} onChange={e => setCompName(e.target.value)} placeholder="PT MAJU BERSAMA" /></div>
                   
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Alamat Perusahaan</label>
                   <textarea className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" rows={2} value={compAddress} onChange={e => setCompAddress(e.target.value)} placeholder="Alamat lengkap..." /></div>
                   
                   <div className="pt-3 border-t mt-3"><h4 className="text-[10px] font-bold uppercase text-emerald-600 mb-2">Wakil Perusahaan (Pimpinan)</h4></div>
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Nama Lengkap</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRep} onChange={e => setCompRep(e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Jabatan</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRepTitle} onChange={e => setCompRepTitle(e.target.value)} /></div>
                   </div>
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">NIK KTP Wakil</label>
                   <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRepKtp} onChange={e => setCompRepKtp(e.target.value)} /></div>
                </div>
             </div>
       
             {/* SECTION 3: KARYAWAN */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
                   <User size={16} className="text-purple-500" />
                   <h3 className="text-xs font-black uppercase text-slate-700 tracking-widest">Pihak Kedua (Karyawan)</h3>
                </div>
                <div className="p-4 space-y-3">
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Nama Lengkap (Sesuai KTP)</label>
                   <input className="w-full p-2 border rounded text-xs font-bold uppercase focus:ring-2 focus:ring-purple-500 outline-none" value={empName} onChange={e => setEmpName(e.target.value)} /></div>
                   
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Nomor NIK KTP</label>
                   <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={empKtp} onChange={e => setEmpKtp(e.target.value)} /></div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tempat Lahir</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={empPob} onChange={e => setEmpPob(e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tgl Lahir</label>
                      <input type="date" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={empDob} onChange={e => setEmpDob(e.target.value)} /></div>
                   </div>
       
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Pekerjaan</label>
                   <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={empJob} onChange={e => setEmpJob(e.target.value)} /></div>
       
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Alamat Sesuai KTP</label>
                   <textarea className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-purple-500 outline-none" rows={2} value={empAddress} onChange={e => setEmpAddress(e.target.value)} /></div>
                </div>
             </div>
       
             {/* SECTION 4: DETAIL PEKERJAAN */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
                   <Briefcase size={16} className="text-orange-500" />
                   <h3 className="text-xs font-black uppercase text-slate-700 tracking-widest">Detail Penugasan & Kompensasi</h3>
                </div>
                <div className="p-4 space-y-3">
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Posisi / Jabatan</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={jobTitle} onChange={e => setJobTitle(e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Departemen</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={department} onChange={e => setDepartment(e.target.value)} /></div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tgl Mulai Kerja</label>
                      <input type="date" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
                      {contractType === 'PKWT' ? (
                         <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tgl Berakhir</label>
                         <input type="date" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
                      ) : (
                         <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Masa Probation</label>
                         <div className="relative">
                           <input type="number" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none pr-12" value={probation} onChange={e => setProbation(e.target.value)} />
                           <span className="absolute right-3 top-2 text-xs text-slate-400">Bulan</span>
                         </div></div>
                      )}
                   </div>
       
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Gaji Pokok (Gross / Bulan)</label>
                      <div className="relative">
                         <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">Rp</span>
                         <input type="number" className="w-full p-2 pl-8 border rounded text-xs font-black text-orange-600 bg-orange-50 focus:ring-2 focus:ring-orange-500 outline-none" value={salary} onChange={e => setSalary(e.target.value ? parseInt(e.target.value) : '')} />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Hari Kerja</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={workDays} onChange={e => setWorkDays(e.target.value)} placeholder="Senin - Jumat"/></div>
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Jam Kerja</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={workHours} onChange={e => setWorkHours(e.target.value)} placeholder="09:00 - 18:00"/></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative custom-scrollbar ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
           <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
               <Kertas><ContractDocument /></Kertas>
           </div>
        </div>
      </main>
      
      {/* MOBILE FLOATING ACTIONS */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/95 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl font-sans border border-slate-700">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}>EDITOR KONTRAK</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>PREVIEW CETAK</button>
      </div>

      {/* AREA TOMBOL MONETISASI / PRINT WRAPPER MODAL TRIGGER */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Kontrak Kerja (PKWT/PKWTT)" price={25000} />
      </div>

      {/* HIDDEN PRINT ROOT UNTUK HTML-TO-PDF ATAU NATIVE BROWSER PRINT */}
      <div id="print-only-root" className="hidden print:block w-full bg-white relative print:h-auto print:static">
         <Kertas className="kertas-print"><ContractDocument /></Kertas>
      </div>
    </div>
  );
}
