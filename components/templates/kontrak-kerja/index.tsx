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
  const [compName, setCompName] = useState('PT NAGA LAUT KORPORATAMA');
  const [compAddress, setCompAddress] = useState('Gedung Cyber 2, Lt. 10, Jl. H.R. Rasuna Said Blok X-5, Kuningan, Jakarta Selatan 12950');
  const [compRep, setCompRep] = useState('Budi Santoso, S.E., M.B.A.');
  const [compRepKtp, setCompRepKtp] = useState('3174001234560001');
  const [compRepPob, setCompRepPob] = useState('Surabaya');
  const [compRepDob, setCompRepDob] = useState('1975-04-12');
  const [compRepTitle, setCompRepTitle] = useState('Direktur Utama');
  const [compRepJob, setCompRepJob] = useState('Wiraswasta');
  
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
          Pada hari ini, <strong>{formatDateFull(docDate)}</strong>, bertempat di <strong>{city}</strong>, yang bertanda tangan di bawah ini:
       </div>
 
       <div className="mb-6 space-y-4">
          {/* PIHAK PERTAMA */}
          <div className="flex gap-4">
             <div className="font-bold w-6">I.</div>
             <div className="flex-1">
                <div className="mb-2 space-y-1">
                   <div className="flex"><div className="w-40 md:w-48">Nama Lengkap</div><div className="mr-2">:</div><div className="font-bold uppercase flex-1">{compRep}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">NIK</div><div className="mr-2">:</div><div className="flex-1">{compRepKtp}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">Tempat, Tgl Lahir</div><div className="mr-2">:</div><div className="flex-1">{compRepPob}, {formatDateMedium(compRepDob)}</div></div>
                   <div className="flex"><div className="w-40 md:w-48">Pekerjaan</div><div className="mr-2">:</div><div className="flex-1">{compRepJob}</div></div>
                   <div className="flex"><div className="w-40 md:w-48 align-top">Alamat (Sesuai KTP)</div><div className="mr-2 align-top">:</div><div className="flex-1">{compAddress}</div></div>
                </div>
                <div className="text-justify mt-2">
                   Dalam hal ini bertindak dalam jabatannya selaku <strong>{compRepTitle}</strong>, dari dan karenanya sah mewakili direksi untuk dan atas nama <strong>{compName}</strong>, suatu perseroan terbatas yang didirikan berdasarkan hukum Negara Republik Indonesia, berkedudukan di {city}. Selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
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
                   Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                </div>
             </div>
          </div>
       </div>
 
       <div className="mb-8">
          PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>"Para Pihak"</strong> dan masing-masing disebut sebagai <strong>"Pihak"</strong>. Para Pihak terlebih dahulu menerangkan hal-hal sebagai berikut:
          <ul className="list-disc pl-5 md:pl-8 mt-2 space-y-1">
            <li>Bahwa, PIHAK PERTAMA adalah sebuah badan hukum yang membutuhkan tenaga kerja dengan kualifikasi tertentu untuk mendukung kegiatan operasional dan pencapaian target bisnis perusahaan.</li>
            <li>Bahwa, PIHAK KEDUA menyatakan memiliki keahlian, pengalaman, dan kualifikasi yang dipersyaratkan oleh PIHAK PERTAMA serta bersedia mematuhi seluruh standar dan regulasi yang berlaku di lingkungan PIHAK PERTAMA.</li>
          </ul>
          Maka, berdasarkan hal-hal tersebut di atas, Para Pihak dengan ini sepakat untuk mengikatkan diri dalam Perjanjian Kerja Waktu {contractType === 'PKWT' ? 'Tertentu' : 'Tidak Tertentu'} dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut:
       </div>
 
       {/* PASAL 1 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 1<br/>DEFINISI DAN RUANG LINGKUP PEKERJAAN
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                PIHAK PERTAMA dengan ini sepakat untuk menerima dan mempekerjakan PIHAK KEDUA, dan PIHAK KEDUA sepakat untuk bekerja pada PIHAK PERTAMA dengan jabatan/posisi sebagai <strong>{jobTitle}</strong> yang ditempatkan pada departemen <strong>{department}</strong>.
             </li>
             <li className="pl-2">
                Uraian tugas pokok (Job Description) PIHAK KEDUA adalah sebagaimana yang ditetapkan dalam Standar Operasional Prosedur (SOP) dan instruksi penugasan yang diberikan oleh atasan langsung maupun manajemen PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                PIHAK KEDUA bersedia dan sepakat untuk ditempatkan, dipindahtugaskan, atau dialihkan ke bagian, departemen, atau lokasi kerja (cabang/site) lain yang ditentukan oleh PIHAK PERTAMA sewaktu-waktu tanpa memerlukan persetujuan tambahan dari PIHAK KEDUA, sesuai dengan kebutuhan operasional dan strategi bisnis perusahaan.
             </li>
          </ol>
       </div>

       {/* PASAL 2 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 2<br/>MASA BERLAKU PERJANJIAN
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Perjanjian ini berlaku efektif terhitung sejak tanggal <strong>{formatDateMedium(startDate)}</strong>. 
                {contractType === 'PKWT' ? (
                   <> Dan disepakati berlangsung selama masa Perjanjian Kerja Waktu Tertentu (PKWT) yang akan berakhir secara otomatis demi hukum pada tanggal <strong>{formatDateMedium(endDate)}</strong>, tanpa perlu adanya penetapan dari instansi yang berwenang.</>
                ) : (
                   <> Perjanjian ini berlaku untuk jangka waktu tidak tertentu, dengan ketentuan PIHAK KEDUA wajib menjalani masa percobaan (probation) selama <strong>{probation} ({probation}) bulan</strong> pertama.</>
                )}
             </li>
             {contractType === 'PKWT' && (
             <li className="pl-2">
                PIHAK PERTAMA atas kebijaksanaannya sendiri dapat memperpanjang jangka waktu Perjanjian ini, dengan memberikan pemberitahuan secara tertulis kepada PIHAK KEDUA selambat-lambatnya 7 (tujuh) hari sebelum berakhirnya Perjanjian.
             </li>
             )}
             {contractType === 'PKWTT' && (
             <li className="pl-2">
                Selama masa percobaan (probation), masing-masing Pihak berhak untuk mengakhiri Perjanjian Kerja ini sewaktu-waktu tanpa syarat, tanpa tuntutan ganti rugi, pesangon, uang penghargaan masa kerja, dan/atau kompensasi apapun selain dari upah yang telah menjadi hak PIHAK KEDUA atas hari kerja yang telah dijalani.
             </li>
             )}
          </ol>
       </div>
 
       {/* PASAL 3 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 3<br/>HAK DAN KEWAJIBAN PARA PIHAK
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                <strong>Hak dan Kewajiban PIHAK PERTAMA:</strong>
                <ol className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                   <li>Berhak untuk menerima hasil kerja yang maksimal dan sesuai standar kualitas (Key Performance Indicator) dari PIHAK KEDUA.</li>
                   <li>Berhak menetapkan, mengubah, dan menegakkan Peraturan Perusahaan serta tata tertib yang wajib dipatuhi oleh PIHAK KEDUA.</li>
                   <li>Berkewajiban membayarkan upah dan kompensasi lain kepada PIHAK KEDUA sesuai ketentuan yang disepakati.</li>
                   <li>Berkewajiban menyediakan sarana prasarana yang memadai dan lingkungan kerja yang aman dan sehat.</li>
                </ol>
             </li>
             <li className="pl-2 mt-2">
                <strong>Hak dan Kewajiban PIHAK KEDUA:</strong>
                <ol className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                   <li>Berhak menerima upah dan hak-hak ketenagakerjaan lainnya sesuai dengan ketentuan Peraturan Perundang-undangan dan Perjanjian ini.</li>
                   <li>Wajib mendedikasikan waktu, pikiran, dan tenaga secara penuh untuk melaksanakan pekerjaan demi kepentingan PIHAK PERTAMA secara profesional dan berintegritas.</li>
                   <li>Wajib menjaga dengan sebaik-baiknya setiap aset, inventaris, dan fasilitas yang dipercayakan kepadanya.</li>
                   <li>Dilarang keras melakukan tindakan yang dapat merugikan perusahaan baik secara materiil maupun imateriil, termasuk namun tidak terbatas pada korupsi, kolusi, nepotisme, dan pencemaran nama baik.</li>
                </ol>
             </li>
          </ol>
       </div>
 
       {/* PASAL 4 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 4<br/>PENGUPAHAN DAN WAKTU KERJA
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Atas pelaksanaan pekerjaan yang dilakukan oleh PIHAK KEDUA, PIHAK PERTAMA akan memberikan upah bulanan bruto (kotor) sebesar <strong>{formatRp(salary || 0)}</strong>.
             </li>
             <li className="pl-2">
                Pembayaran upah sebagaimana dimaksud pada ayat (1) dilaksanakan setiap akhir bulan berjalan melalui transfer ke rekening bank milik PIHAK KEDUA.
             </li>
             <li className="pl-2">
                PIHAK PERTAMA berhak melakukan pemotongan upah PIHAK KEDUA untuk pembayaran Pajak Penghasilan (PPh Pasal 21), iuran jaminan sosial tenaga kerja (BPJS Ketenagakerjaan) dan jaminan pemeliharaan kesehatan (BPJS Kesehatan) bagian karyawan, serta potongan-potongan lain yang sah sesuai peraturan yang berlaku.
             </li>
             <li className="pl-2">
                Hari dan jam kerja PIHAK KEDUA ditetapkan pada <strong>{workDays}</strong>, jam <strong>{workHours}</strong>, dengan tidak menutup kemungkinan pemberlakuan shift atau kerja lembur jika dipandang perlu oleh PIHAK PERTAMA guna menjamin kelancaran operasional.
             </li>
          </ol>
       </div>
 
       {/* PASAL 5 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 5<br/>HAK KEKAYAAN INTELEKTUAL (HKI)
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Seluruh hasil karya, temuan, desain, sistem, basis data, penemuan teknologi, tulisan, dan/atau kekayaan intelektual lainnya ("Hasil Karya") yang diciptakan, dikembangkan, maupun direalisasikan oleh PIHAK KEDUA selama masa kerjanya, baik secara sendiri maupun bersama-sama dengan pihak lain, dalam kapasitas pelaksanaan tugasnya bagi PIHAK PERTAMA adalah merupakan hak milik absolut dan eksklusif PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                PIHAK KEDUA dengan ini secara tanpa syarat, melepaskan segala hak ekonomi atas Hasil Karya tersebut, dan PIHAK PERTAMA berhak penuh untuk mendaftarkan, mengkomersialkan, menduplikasi, dan melisensikannya kepada pihak ketiga mana pun tanpa kompensasi tambahan apapun kepada PIHAK KEDUA di masa kini maupun masa depan.
             </li>
             <li className="pl-2">
                Apabila PIHAK KEDUA bermaksud mempublikasikan atau menggunakan bagian dari Hasil Karya untuk keperluan eksternal, wajib mendapatkan persetujuan tertulis terlebih dahulu dari Direksi PIHAK PERTAMA.
             </li>
          </ol>
       </div>
 
       {/* PASAL 6 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 6<br/>KERAHASIAAN (NON-DISCLOSURE) DAN LARANGAN BERSAING (NON-COMPETE)
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                <strong>Non-Disclosure (Kerahasiaan):</strong> PIHAK KEDUA terikat kewajiban mutlak untuk menjaga kerahasiaan seluruh <em>Confidential Information</em> (Informasi Rahasia) PIHAK PERTAMA. Informasi ini mencakup, namun tidak terbatas pada data klien, rahasia dagang, strategi bisnis, proyeksi keuangan, dan teknologi. Kewajiban kerahasiaan ini tetap berlaku tanpa batas waktu meskipun Perjanjian ini telah berakhir.
             </li>
             <li className="pl-2">
                <strong>Non-Compete (Larangan Bersaing):</strong> Selama berlakunya Perjanjian ini dan untuk jangka waktu selama <strong>1 (satu) tahun</strong> sejak berakhirnya Perjanjian ini, PIHAK KEDUA dilarang (baik secara langsung maupun tidak langsung) bekerja sebagai karyawan, konsultan, pemegang saham, pengurus, atau berafiliasi dengan perusahaan kompetitor yang menjalankan kegiatan usaha sejenis dengan PIHAK PERTAMA di wilayah Republik Indonesia.
             </li>
             <li className="pl-2">
                <strong>Non-Solicitation (Larangan Pembajakan):</strong> Selama masa berlaku Perjanjian ini dan untuk jangka waktu <strong>2 (dua) tahun</strong> setelah berakhirnya Perjanjian ini, PIHAK KEDUA dilarang membujuk, merekrut, atau mempekerjakan karyawan atau eks-karyawan PIHAK PERTAMA, serta dilarang mengajak klien/pelanggan PIHAK PERTAMA untuk mengalihkan transaksinya kepada pihak lain.
             </li>
             <li className="pl-2">
                Setiap pelanggaran terhadap ketentuan Pasal ini memberikan hak kepada PIHAK PERTAMA untuk secara seketika melakukan Pemutusan Hubungan Kerja (PHK) secara tidak hormat, serta mengambil langkah hukum baik perdata (tuntutan ganti rugi) maupun pidana (penggelapan rahasia dagang).
             </li>
          </ol>
       </div>
 
       {/* PASAL 7 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 7<br/>PEMUTUSAN HUBUNGAN KERJA (PHK)
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Hubungan kerja berakhir dengan sendirinya tanpa melalui putusan lembaga penyelesaian perselisihan hubungan industrial apabila:
                <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                   {contractType === 'PKWT' && (
                      <li>a. Berakhirnya jangka waktu PKWT sebagaimana disepakati pada Pasal 2 ayat (1).</li>
                   )}
                   {contractType === 'PKWTT' && (
                      <li>a. PIHAK KEDUA telah mencapai usia pensiun sesuai dengan peraturan ketenagakerjaan yang berlaku.</li>
                   )}
                   <li>b. PIHAK KEDUA meninggal dunia.</li>
                   <li>c. PIHAK KEDUA tidak lulus evaluasi pada Masa Percobaan (Probation).</li>
                </ul>
             </li>
             <li className="pl-2">
                PIHAK PERTAMA berhak secara sepihak melakukan PHK terhadap PIHAK KEDUA tanpa peringatan sebelumnya dan tanpa kompensasi pesangon, apabila PIHAK KEDUA terbukti melakukan "Pelanggaran Berat" (<em>Gross Misconduct</em>), yang mencakup namun tidak terbatas pada:
                <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                   <li>Melakukan penipuan, pencurian, atau penggelapan barang dan/atau uang milik perusahaan atau klien.</li>
                   <li>Membocorkan rahasia perusahaan sebagaimana diatur dalam Pasal 6.</li>
                   <li>Mengkonsumsi minuman keras, mabuk, memakai atau mengedarkan narkotika dan obat-obatan terlarang di lingkungan kerja.</li>
                   <li>Melakukan tindakan asusila, pelecehan, perjudian, atau perbuatan tindak pidana lainnya yang diancam pidana penjara.</li>
                </ul>
             </li>
             <li className="pl-2">
                Dalam hal PIHAK KEDUA berkehendak mengakhiri Perjanjian ini secara sukarela (Resign), PIHAK KEDUA wajib mengajukan permohonan tertulis (<em>One Month Notice</em>) paling lambat <strong>30 (tiga puluh) hari kalender</strong> sebelum tanggal efektif pengunduran diri. Selama masa notice tersebut, PIHAK KEDUA diwajibkan melakukan serah terima pekerjaan (<em>Handover</em>) dengan baik, serta mengembalikan seluruh fasilitas dan aset perusahaan.
             </li>
          </ol>
       </div>
 
       {/* PASAL 8 */}
       <div className="mb-6">
          <div className="text-center font-bold mb-3 uppercase">
             PASAL 8<br/>PENYELESAIAN SENGKETA DAN PENUTUP
          </div>
          <ol className="list-decimal pl-5 md:pl-8 space-y-2">
             <li className="pl-2">
                Setiap perselisihan, kontroversi, atau perbedaan pendapat yang timbul berkenaan dengan pelaksanaan, penafsiran, maupun pengakhiran Perjanjian ini akan diselesaikan secara damai melalui jalan musyawarah untuk mufakat (Bipartit).
             </li>
             <li className="pl-2">
                Apabila dalam waktu selambat-lambatnya 30 (tiga puluh) hari kalender musyawarah gagal mencapai mufakat, maka Para Pihak sepakat untuk menyelesaikan perselisihan tersebut melalui prosedur hukum ketenagakerjaan yang berlaku, dengan memilih domisili hukum yang sah dan tidak berubah di Kepaniteraan Pengadilan Hubungan Industrial pada Pengadilan Negeri di wilayah kedudukan hukum PIHAK PERTAMA.
             </li>
             <li className="pl-2">
                Hal-hal yang belum atau tidak cukup diatur dalam Perjanjian ini, akan dirujuk dan tunduk pada Peraturan Perusahaan, Standar Operasional Prosedur, dan ketentuan perundang-undangan Republik Indonesia.
             </li>
             <li className="pl-2">
                Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup sesuai ketentuan perundang-undangan yang berlaku, ditandatangani secara sadar tanpa paksaan, serta masing-masing rangkap memiliki kekuatan hukum pembuktian yang sama, satu rangkap untuk PIHAK PERTAMA dan satu rangkap untuk PIHAK KEDUA.
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
             <div className="text-sm">Karyawan</div>
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
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
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
                   <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tempat Lahir</label>
                      <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRepPob} onChange={e => setCompRepPob(e.target.value)} /></div>
                      <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Tgl Lahir</label>
                      <input type="date" className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRepDob} onChange={e => setCompRepDob(e.target.value)} /></div>
                   </div>
                   <div><label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Pekerjaan Wakil</label>
                   <input className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={compRepJob} onChange={e => setCompRepJob(e.target.value)} /></div>
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
