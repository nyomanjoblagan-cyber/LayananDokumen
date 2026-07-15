'use client';

/**
 * FILE: JointVenturePage.tsx
 * STATUS: PRODUCTION READY (CORPORATE WARFARE EDITION)
 * DESC: Generator Perjanjian Kerja Sama (Joint Venture) Skala Enterprise
 * FEATURES: Loss Sharing, Exit Strategy, 8 Pasal Ekstensif, Form Dinamis, Print MS Word HTML-pure.
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Briefcase, Handshake, LayoutTemplate, 
  Scale, Coins, ShieldCheck, Edit3, Building2, RotateCcw, ArrowLeftCircle, User, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface JVData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak 1
  p1Name: string;
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Job: string;
  p1Address: string;
  p1Role: string;
  p1Company: string;

  // Pihak 2
  p2Name: string;
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Job: string;
  p2Address: string;
  p2Role: string;
  p2Company: string;

  // Proyek
  projectName: string;
  projectLocation: string;
  investmentAmount: string;
  capitalP1: string;
  capitalP2: string;
  durationMonths: string;
  
  // Profit & Loss Sharing
  profitP1: string;
  profitP2: string;
  lossP1: string;
  lossP2: string;
  
  // Exit Strategy
  exitNoticeDays: string;
  exitPenalty: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT (DUMMY CORPORATE) ---
const INITIAL_DATA: JVData = {
  city: 'JAKARTA',
  date: '', // Diisi oleh useEffect
  docNo: 'JV/CORP-OPS/VIII/2026/099',
  
  p1Name: 'HENDRA KUSUMAH',
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Sudirman Kav 21, RT 01 RW 02, Kel. Karet, Kec. Setiabudi, Jakarta Selatan',
  p1Role: 'Investor Utama',
  p1Company: 'PT. MAJU MUNDUR SEJAHTERA',

  p2Name: 'REZA ADRIAN',
  p2Nik: '3271234567890002',
  p2Pob: 'Bandung',
  p2Dob: '1985-08-20',
  p2Job: 'Direktur Operasional',
  p2Address: 'Jl. Merdeka No. 45, RT 03 RW 04, Kel. Babakan, Kec. Sumur Bandung, Bandung',
  p2Role: 'Pengelola Operasional',
  p2Company: 'CV. KREATIF MUDA KARYA',

  projectName: 'Pengembangan Perangkat Lunak Sistem ERP Enterprise',
  projectLocation: 'DKI Jakarta',
  investmentAmount: 'Rp 5.000.000.000,- (Lima Miliar Rupiah)',
  capitalP1: 'Rp 3.500.000.000,-',
  capitalP2: 'Rp 1.500.000.000,-',
  durationMonths: '60',
  
  profitP1: '70',
  profitP2: '30',
  lossP1: '70',
  lossP2: '30',
  
  exitNoticeDays: '90',
  exitPenalty: 'Rp 500.000.000,-',
  
  witness1: 'SITI AMINAH, S.H.',
  witness2: 'BUDI SANTOSO, S.E.'
};

// --- 3. KOMPONEN UTAMA ---
export default function JointVenturePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian JV Korporat...</div>}>
      <JointVentureBuilder />
    </Suspense>
  );
}

function JointVentureBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<JVData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof JVData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset seluruh formulir ke isian awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      const d = new Date(dateString);
      if(isNaN(d.getTime())) return '...';
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // --- KOMPONEN ISI SURAT (PRINT READY - MS WORD PROTOCOL PURE HTML) ---
  const DocumentContent = () => {
    return (
      <div className="font-serif text-slate-900 leading-normal text-[11pt] text-justify">
         
         {/* KOP DAN JUDUL */}
         <div className="text-center mb-8">
            <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-4">PERJANJIAN KERJA SAMA (JOINT VENTURE)</h2>
            <p className="font-sans mt-1 uppercase tracking-widest text-sm">Nomor: {data.docNo}</p>
         </div>

         {/* MUKADIMAH */}
         <div className="mb-6">
            <p className="mb-4">Pada hari ini, tanggal <b>{formatDateSafe(data.date)}</b>, bertempat di {data.city}, yang bertanda tangan di bawah ini:</p>
            
            <div className="flex gap-4 mb-4 break-inside-avoid">
              <div className="w-6 font-bold text-right">I.</div>
              <div className="flex-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div><b>{data.p1Name}</b></div></div>
                <div className="flex"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div>{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div>{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div>{data.p1Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
                <p className="mt-2 text-justify">
                  Dalam hal ini bertindak selaku {data.p1Role} {data.p1Company ? `mewakili ${data.p1Company}` : ''}, yang selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK PERTAMA</b>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-4 break-inside-avoid">
              <div className="w-6 font-bold text-right">II.</div>
              <div className="flex-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div><b>{data.p2Name}</b></div></div>
                <div className="flex"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div>{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div>{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div>{data.p2Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
                <p className="mt-2 text-justify">
                  Dalam hal ini bertindak selaku {data.p2Role} {data.p2Company ? `mewakili ${data.p2Company}` : ''}, yang selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK KEDUA</b>.
                </p>
              </div>
            </div>
            <p className="mt-4">PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama dalam Perjanjian ini selanjutnya disebut sebagai <b>PARA PIHAK</b>.</p>
            <p className="mt-2">PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut, dan sepakat untuk mengikatkan diri dalam Perjanjian Kerja Sama (Joint Venture) dengan syarat-syarat dan ketentuan-ketentuan yang tertuang dalam pasal-pasal di bawah ini:</p>
         </div>

         {/* PASAL-PASAL */}
         <div className="space-y-6">
            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 1<br/>DEFINISI DAN OBJEK PERJANJIAN</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Bahwa PARA PIHAK sepakat untuk mendirikan dan/atau menjalankan suatu usaha patungan (Joint Venture) untuk pelaksanaan proyek <b>{data.projectName}</b> yang berlokasi operasional di <b>{data.projectLocation}</b> (selanjutnya disebut "Proyek").</li>
                  <li>PIHAK PERTAMA dalam kapasitasnya bertindak sebagai {data.p1Role} dan PIHAK KEDUA bertindak sebagai {data.p2Role}.</li>
                  <li>Seluruh kegiatan operasional, teknis, dan strategis yang berhubungan dengan Proyek akan dikoordinasikan secara bersama-sama oleh PARA PIHAK sesuai dengan keahlian, persentase kepemilikan, dan peranan masing-masing yang telah disepakati.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 2<br/>MODAL DAN INVESTASI</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Total estimasi nilai investasi awal yang disepakati oleh PARA PIHAK untuk pelaksanaan Proyek ini adalah sebesar <b>{data.investmentAmount}</b>.</li>
                  <li>Proporsi penyertaan modal awal dari masing-masing pihak adalah sebagai berikut:
                     <ol className="list-[lower-alpha] pl-6 space-y-1 mt-1">
                        <li>PIHAK PERTAMA menyetorkan modal finansial dan/atau aset setara sebesar <b>{data.capitalP1}</b>.</li>
                        <li>PIHAK KEDUA menyetorkan modal finansial dan/atau aset setara sebesar <b>{data.capitalP2}</b>.</li>
                     </ol>
                  </li>
                  <li>Penyetoran modal sebagaimana dimaksud pada ayat (2) wajib diselesaikan selambat-lambatnya 14 (empat belas) hari kerja setelah penandatanganan Perjanjian ini dan ditransfer langsung ke rekening giro bersama yang dibentuk dan disepakati oleh PARA PIHAK.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PARA PIHAK</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Hak dan Kewajiban PIHAK PERTAMA:
                     <ol className="list-[lower-alpha] pl-6 space-y-1 mt-1">
                        <li>Berhak menerima pembagian keuntungan (Profit Sharing) dan berkewajiban menanggung kerugian (Loss Sharing) dari Proyek sesuai dengan persentase yang disepakati dalam Perjanjian ini.</li>
                        <li>Berhak secara independen maupun menunjuk pihak ketiga untuk melakukan audit menyeluruh atas laporan keuangan dan operasional Proyek kapanpun dengan pemberitahuan tertulis sebelumnya.</li>
                        <li>Berkewajiban penuh menyetorkan modal sesuai dengan ketentuan pada Pasal 2 secara tepat waktu dan proporsional.</li>
                     </ol>
                  </li>
                  <li>Hak dan Kewajiban PIHAK KEDUA:
                     <ol className="list-[lower-alpha] pl-6 space-y-1 mt-1">
                        <li>Berhak menerima pembagian keuntungan (Profit Sharing) dan berkewajiban menanggung kerugian (Loss Sharing) dari Proyek sesuai dengan persentase yang disepakati dalam Perjanjian ini.</li>
                        <li>Berkewajiban mengelola, mengeksekusi, dan mengoperasikan jalannya Proyek dengan standar kehati-hatian, itikad baik (good faith), profesional, dan penuh tanggung jawab.</li>
                        <li>Berkewajiban menyusun, mengesahkan, dan menyampaikan laporan keuangan (Neraca, Laba/Rugi, Arus Kas) serta laporan progres operasional secara berkala setiap bulan selambat-lambatnya tanggal 10 kepada PIHAK PERTAMA.</li>
                     </ol>
                  </li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 4<br/>PEMBAGIAN KEUNTUNGAN DAN KERUGIAN (PROFIT & LOSS SHARING)</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>PARA PIHAK sepakat secara bulat bahwa keuntungan bersih (Net Profit) dari Proyek, yang dihitung setelah dikurangi seluruh biaya operasional, pajak, cicilan hutang, depresiasi, dan kewajiban mengikat lainnya, akan dibagikan kepada PARA PIHAK dengan rasio:
                     <ol className="list-[lower-alpha] pl-6 space-y-1 mt-1">
                        <li>PIHAK PERTAMA berhak atas keuntungan sebesar <b>{data.profitP1}%</b> (persen).</li>
                        <li>PIHAK KEDUA berhak atas keuntungan sebesar <b>{data.profitP2}%</b> (persen).</li>
                     </ol>
                  </li>
                  <li>Sebagai konsekuensi asas keseimbangan risiko dalam skema Joint Venture, dalam hal pelaksanaan Proyek mengalami kerugian finansial (Financial Loss) pada tutup buku tahunan atau berdasarkan audit sewaktu-waktu, maka kerugian tersebut mutlak wajib ditanggung oleh PARA PIHAK dengan rasio:
                     <ol className="list-[lower-alpha] pl-6 space-y-1 mt-1">
                        <li>PIHAK PERTAMA menanggung kewajiban atas kerugian sebesar <b>{data.lossP1}%</b> (persen).</li>
                        <li>PIHAK KEDUA menanggung kewajiban atas kerugian sebesar <b>{data.lossP2}%</b> (persen).</li>
                     </ol>
                  </li>
                  <li>Skema penutupan kerugian sebagaimana dimaksud pada ayat (2) dapat dieksekusi melalui pemotongan langsung atas ekuitas/modal yang telah disetor (Capital Reduction), penahanan hak pembagian keuntungan pada periode berjalan atau berikutnya, dan/atau melalui kewajiban penyetoran modal injeksi tambahan secara tunai sesuai kesepakatan tertulis PARA PIHAK yang disahkan kemudian.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 5<br/>JANGKA WAKTU PERJANJIAN</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Perjanjian Kerja Sama ini mengikat PARA PIHAK dan berlaku sah secara hukum untuk jangka waktu <b>{data.durationMonths}</b> bulan, efektif dan terhitung sejak tanggal ditandatanganinya Perjanjian ini oleh PARA PIHAK.</li>
                  <li>Jangka waktu Perjanjian ini dapat diperpanjang atau diakhiri lebih awal berdasarkan kesepakatan tertulis secara mufakat dari PARA PIHAK, yang akan dituangkan secara terperinci ke dalam Addendum dan merupakan bagian yang tidak terpisahkan dari Perjanjian ini.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 6<br/>STRATEGI KELUAR (EXIT STRATEGY) DAN WANPRESTASI</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Apabila salah satu Pihak bermaksud mengundurkan diri, menarik investasi, atau melepaskan sahamnya secara sepihak sebelum berakhirnya Jangka Waktu Perjanjian sebagaimana diatur dalam Pasal 5, Pihak tersebut wajib memberikan pemberitahuan secara tertulis (Notice of Withdrawal) kepada Pihak lainnya selambat-lambatnya <b>{data.exitNoticeDays}</b> hari kalender sebelum tanggal efektif pengunduran diri yang dikehendaki.</li>
                  <li>Pihak yang mengundurkan diri secara sepihak sebelum berakhirnya jangka waktu tanpa persetujuan sah dari Pihak lainnya, dengan ini bersedia dan wajib dikenakan penalti berupa denda tunai sebesar <b>{data.exitPenalty}</b> yang harus dibayarkan seketika dan sekaligus kepada Pihak lainnya. Selanjutnya, seluruh sisa porsi kepemilikannya dalam Proyek dapat diambil alih secara penuh oleh Pihak lainnya dengan nilai diskonto yang disepakati kemudian atau berdasar taksiran auditor independen.</li>
                  <li>Dalam hal salah satu Pihak melakukan kelalaian berat, penyalahgunaan wewenang, penggelapan dana, atau tidak memenuhi kewajiban fundamental (Wanprestasi), Pihak yang dirugikan berhak menerbitkan teguran tertulis (Somasi) paling banyak 3 (tiga) kali. Apabila dalam waktu 14 (empat belas) hari setelah Somasi terakhir tidak ada itikad baik untuk pemulihan, maka Pihak yang dirugikan memiliki hak absolut untuk membatalkan Perjanjian ini secara sepihak dan memproses tuntutan ganti kerugian penuh secara perdata maupun pidana.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 7<br/>KEADAAN KAHAR (FORCE MAJEURE)</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Tidak ada satu pun dari PARA PIHAK yang dapat dimintakan pertanggungjawaban ganti rugi atau dianggap melakukan Wanprestasi atas kegagalan atau keterlambatan dalam melaksanakan kewajibannya berdasarkan Perjanjian ini, apabila secara langsung disebabkan oleh Keadaan Kahar (Force Majeure).</li>
                  <li>Keadaan Kahar mencakup namun tidak terbatas pada bencana alam (gempa bumi, banjir bandang, tsunami), kebakaran masal, perang, huru-hara, epidemi, pandemi berskala nasional/global, pemberontakan, atau perubahan regulasi moneter pemerintah secara drastis yang secara langsung dan signifikan menghalangi pelaksanaan Perjanjian ini.</li>
                  <li>Pihak yang terdampak Keadaan Kahar wajib memberitahukan kejadian tersebut secara tertulis kepada Pihak lainnya selambat-lambatnya 7 (tujuh) hari kalender sejak peristiwa bermula, disertai bukti-bukti yang sah dari institusi pemerintah yang berwenang.</li>
               </ol>
            </div>

            <div className="break-inside-avoid">
               <div className="text-center font-bold mb-2">PASAL 8<br/>PENYELESAIAN SENGKETA</div>
               <ol className="list-decimal pl-6 space-y-1">
                  <li>Segala perselisihan, sengketa klaim, atau perbedaan penafsiran yang timbul dari atau berkenaan dengan pelaksanaan Perjanjian ini akan senantiasa diutamakan penyelesaiannya melalui jalur musyawarah untuk mufakat oleh PARA PIHAK dalam semangat kekeluargaan.</li>
                  <li>Apabila upaya musyawarah untuk mufakat tidak tercapai dalam jangka waktu 30 (tiga puluh) hari kalender, PARA PIHAK sepakat secara final dan mengikat untuk menyelesaikannya secara hukum perdata dan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri <b>{data.city}</b>.</li>
               </ol>
            </div>
         </div>

         {/* PENUTUP */}
         <div className="mt-8 mb-16 text-justify break-inside-avoid">
            <p>Demikian Perjanjian Kerja Sama (Joint Venture) ini dirancang, dibaca, dipahami, disetujui, dan ditandatangani oleh PARA PIHAK di {data.city} pada tanggal yang telah disebutkan pada awal Perjanjian, dalam keadaan sadar, sehat jasmani serta rohani, dan murni tanpa ada unsur paksaan, penipuan, maupun tekanan dari pihak manapun.</p>
            <p className="mt-2">Perjanjian ini dicetak rangkap 2 (dua) yang masing-masing aslinya dibubuhi meterai cukup sesuai dengan ketentuan perundang-undangan perpajakan yang berlaku, sehingga keduanya memiliki kedudukan dan kekuatan pembuktian hukum yang sama bagi masing-masing pihak.</p>
         </div>

         {/* TANDA TANGAN */}
         <div className="flex justify-between items-start break-inside-avoid">
            <div className="w-1/2 flex flex-col items-center">
               <p className="font-bold mb-2">PIHAK PERTAMA</p>
               <div className="border border-slate-300 w-24 h-12 flex items-center justify-center text-[8px] text-slate-400 italic mb-12">Meterai 10000</div>
               <div className="border-t border-black w-48 text-center pt-1 mt-4">
                  <p className="font-bold uppercase text-sm">{data.p1Name}</p>
                  <p className="text-xs">{data.p1Role}</p>
               </div>
            </div>
            <div className="w-1/2 flex flex-col items-center">
               <p className="font-bold mb-2">PIHAK KEDUA</p>
               <div className="border border-slate-300 w-24 h-12 flex items-center justify-center text-[8px] text-slate-400 italic mb-12">Meterai 10000</div>
               <div className="border-t border-black w-48 text-center pt-1 mt-4">
                  <p className="font-bold uppercase text-sm">{data.p2Name}</p>
                  <p className="text-xs">{data.p2Role}</p>
               </div>
            </div>
         </div>
         <div className="mt-12 flex justify-between items-start break-inside-avoid">
            <div className="w-1/2 flex flex-col items-center">
               <p className="font-bold mb-24">SAKSI I</p>
               <div className="border-t border-black w-48 text-center pt-1">
                  <p className="font-bold uppercase text-sm">{data.witness1}</p>
               </div>
            </div>
            <div className="w-1/2 flex flex-col items-center">
               <p className="font-bold mb-24">SAKSI II</p>
               <div className="border-t border-black w-48 text-center pt-1">
                  <p className="font-bold uppercase text-sm">{data.witness2}</p>
               </div>
            </div>
         </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL STYLES FOR PRINTING PROTOCOL */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-emerald-400"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-widest hidden md:inline">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Handshake size={16} className="text-blue-500" /> <span className="uppercase tracking-tighter">JV BUILDER</span>
                  <span className="ml-2 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full tracking-widest uppercase shadow-sm border border-blue-400">Korporat Standar</span>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 transition-all"><Printer size={18}/> Cetak Dokumen</button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         
         {/* PANEL KIRI - FORM BUILDER */}
         <div className={`no-print w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-widest"><Edit3 size={16} className="text-emerald-600"/> Setup Klausul Korporat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

 <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 md:pb-10 custom-scrollbar font-sans bg-slate-50/50 print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><User size={14}/> Identitas Pihak Pertama</h3>
                 <input className="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="NIK KTP (16 Digit)" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} placeholder="Tempat Lahir" />
                    <input type="date" className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                 </div>
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan Sesuai KTP" />
                 <textarea className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" rows={2} />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 bg-slate-50 focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Mewakili Perusahaan (Opsional)" />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 outline-none" value={data.p1Role} onChange={e => handleDataChange('p1Role', e.target.value)} placeholder="Peran (cth: Investor Utama)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><User size={14}/> Identitas Pihak Kedua</h3>
                 <input className="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK KTP (16 Digit)" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} placeholder="Tempat Lahir" />
                    <input type="date" className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                 </div>
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan Sesuai KTP" />
                 <textarea className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" rows={2} />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 bg-slate-50 focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Company} onChange={e => handleDataChange('p2Company', e.target.value)} placeholder="Mewakili Perusahaan (Opsional)" />
                 <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 font-medium focus:ring-2 focus:ring-emerald-100 outline-none" value={data.p2Role} onChange={e => handleDataChange('p2Role', e.target.value)} placeholder="Peran (cth: Pengelola Operasional)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={14}/> Objek Proyek & Modal Investasi</h3>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold mb-1 block">Nama Proyek / Usaha</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs font-bold text-slate-700 focus:ring-2 focus:ring-amber-100 outline-none" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} placeholder="Deskripsi Singkat Proyek" />
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold mb-1 block">Lokasi Pelaksanaan Operasional</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-amber-100 outline-none" value={data.projectLocation} onChange={e => handleDataChange('projectLocation', e.target.value)} placeholder="Contoh: DKI Jakarta" />
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold mb-1 block">Total Investasi JV</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs font-medium text-slate-700 bg-amber-50 focus:ring-2 focus:ring-amber-100 outline-none" value={data.investmentAmount} onChange={e => handleDataChange('investmentAmount', e.target.value)} placeholder="Contoh: Rp 5.000.000.000,-" />
                 </div>
                 <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border">
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Modal Pihak Pertama</label>
                       <input className="w-full p-2 border rounded-md text-xs text-slate-700 outline-none" value={data.capitalP1} onChange={e => handleDataChange('capitalP1', e.target.value)} placeholder="Rp..." />
                    </div>
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Modal Pihak Kedua</label>
                       <input className="w-full p-2 border rounded-md text-xs text-slate-700 outline-none" value={data.capitalP2} onChange={e => handleDataChange('capitalP2', e.target.value)} placeholder="Rp..." />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-2 tracking-widest flex items-center gap-2"><Scale size={14}/> Profit & Loss Sharing Ratio</h3>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-700 block uppercase tracking-wide">Rasio Pembagian Keuntungan (Profit %)</label>
                    <div className="flex items-center gap-3">
 <div className="flex-1 flex items-center border rounded-lg overflow-hidden bg-white shadow-sm print:overflow-visible print:bg-white">
                          <span className="text-[10px] font-black bg-slate-100 p-2.5 text-slate-500 w-14 text-center border-r">P1 %</span>
                          <input className="w-full p-2.5 text-sm text-center font-black text-slate-800 outline-none" type="number" value={data.profitP1} onChange={e => handleDataChange('profitP1', e.target.value)} />
                       </div>
                       <span className="font-bold text-slate-300">:</span>
 <div className="flex-1 flex items-center border rounded-lg overflow-hidden bg-white shadow-sm print:overflow-visible print:bg-white">
                          <span className="text-[10px] font-black bg-slate-100 p-2.5 text-slate-500 w-14 text-center border-r">P2 %</span>
                          <input className="w-full p-2.5 text-sm text-center font-black text-slate-800 outline-none" type="number" value={data.profitP2} onChange={e => handleDataChange('profitP2', e.target.value)} />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-black text-slate-700 block uppercase tracking-wide">Rasio Tanggungan Kerugian (Loss %)</label>
                    <div className="flex items-center gap-3">
 <div className="flex-1 flex items-center border border-rose-200 rounded-lg overflow-hidden bg-white shadow-sm print:overflow-visible print:bg-white">
                          <span className="text-[10px] font-black bg-rose-50 p-2.5 text-rose-600 w-14 text-center border-r border-rose-200">P1 %</span>
                          <input className="w-full p-2.5 text-sm text-center font-black text-rose-700 outline-none" type="number" value={data.lossP1} onChange={e => handleDataChange('lossP1', e.target.value)} />
                       </div>
                       <span className="font-bold text-slate-300">:</span>
 <div className="flex-1 flex items-center border border-rose-200 rounded-lg overflow-hidden bg-white shadow-sm print:overflow-visible print:bg-white">
                          <span className="text-[10px] font-black bg-rose-50 p-2.5 text-rose-600 w-14 text-center border-r border-rose-200">P2 %</span>
                          <input className="w-full p-2.5 text-sm text-center font-black text-rose-700 outline-none" type="number" value={data.lossP2} onChange={e => handleDataChange('lossP2', e.target.value)} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-2 tracking-widest flex items-center gap-2"><AlertTriangle size={14}/> Exit Strategy & Wanprestasi</h3>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold mb-1 block">Notifikasi Pengunduran Diri (Hari Kalender)</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-rose-100" type="number" value={data.exitNoticeDays} onChange={e => handleDataChange('exitNoticeDays', e.target.value)} placeholder="Contoh: 90" />
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold mb-1 block">Penalti Mundur Sepihak (Tanpa Izin)</label>
                    <input className="w-full p-2.5 border border-rose-300 rounded-lg text-xs text-rose-700 bg-rose-50 font-bold outline-none focus:ring-2 focus:ring-rose-200" value={data.exitPenalty} onChange={e => handleDataChange('exitPenalty', e.target.value)} placeholder="Contoh: Rp 500.000.000,-" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
                 <h3 className="text-[10px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> Legalitas, Durasi & Saksi</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Nomor Surat (Doc No)</label>
                       <input className="w-full p-2.5 border rounded-lg text-xs font-mono text-slate-700 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Durasi Kontrak (Bulan)</label>
                       <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 outline-none" type="number" value={data.durationMonths} onChange={e => handleDataChange('durationMonths', e.target.value)} />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Kota Ttd</label>
                       <input className="w-full p-2.5 border rounded-lg text-xs font-bold uppercase text-slate-700 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Tanggal Ttd</label>
                       <input type="date" className="w-full p-2.5 border rounded-lg text-xs text-slate-700 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t mt-2">
                    <label className="text-[10px] text-slate-500 font-bold mb-2 block">Identitas Saksi (Opsional)</label>
                    <div className="space-y-2">
                      <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi I" />
                      <input className="w-full p-2.5 border rounded-lg text-xs text-slate-700 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi II" />
                    </div>
                 </div>
              </div>

              <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PANEL KANAN - DOKUMEN PREVIEW */}
 <div className={`no-print flex-1 bg-slate-200/60 relative overflow-hidden flex flex-col items-center ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static`}>
 <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-300mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative border border-slate-200" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <DocumentContent />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAVIGATION TABS */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl border border-white/10 font-sans">
          <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      {/* WRAPPER KOMPONEN MONETISASI / PRINTING */}
      <div id="print-options" className="no-print">
         <PrintWrapper documentName="Dokumen_JointVenture_Corporate" price={25000} />
      </div>

      {/* HIDDEN PRINT TARGET (PURE HTML/CSS FOR MS WORD PROTOCOL) */}
      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white p-[20mm] print:p-0"><DocumentContent /></div></div>
    </div>
  );
}
