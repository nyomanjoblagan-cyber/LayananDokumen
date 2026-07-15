'use client';

/**
 * FILE: PengantarNikahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Pranikah / Lampiran Pengantar Nikah (Model Legal Corporate/Notaris)
 * FIX: Ganti format N1 standar menjadi format Perjanjian Hukum dengan 9 Pasal lengkap sesuai kaidah Legal Drafting.
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, CalendarDays, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle,
  BookOpen, Scale, FileText, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PrenupData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak Pertama
  p1Name: string;
  p1Nik: string;
  p1PlaceBirth: string;
  p1DateBirth: string;
  p1Job: string;
  p1Address: string;

  // Pihak Kedua
  p2Name: string;
  p2Nik: string;
  p2PlaceBirth: string;
  p2DateBirth: string;
  p2Job: string;
  p2Address: string;

  // Klausul Dinamis
  hartaKekayaan: string; // 'pisah' | 'campur'
  tanggunganPajak: string; // 'masing-masing' | 'bersama'
  hakAsuhAnak: string; // 'kesepakatan' | 'hukum'
  penyelesaianSengketa: string; // 'musyawarah' | 'pengadilan'
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PrenupData = {
  city: 'Jakarta Selatan',
  date: '', 
  docNo: '045/PRANIKAH/LGL/2026',
  
  p1Name: 'BIMA ARYA WICAKSANA',
  p1Nik: '3174010101900001',
  p1PlaceBirth: 'Jakarta',
  p1DateBirth: '1990-05-15',
  p1Job: 'Direktur Utama PT Teknologi Nusantara',
  p1Address: 'Jl. Sudirman Kav 20, Kebayoran Baru, Jakarta Selatan',
  
  p2Name: 'AYU KIRANA',
  p2Nik: '3174020202950002',
  p2PlaceBirth: 'Bandung',
  p2DateBirth: '1995-08-20',
  p2Job: 'Dokter Spesialis',
  p2Address: 'Jl. Kemang Raya No. 15, Bangka, Jakarta Selatan',

  hartaKekayaan: 'pisah',
  tanggunganPajak: 'masing-masing',
  hakAsuhAnak: 'kesepakatan',
  penyelesaianSengketa: 'pengadilan',
};

// --- 3. KOMPONEN UTAMA ---
export default function PengantarNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian Pranikah...</div>}>
      <PrenuptialAgreementBuilder />
    </Suspense>
  );
}

function PrenuptialAgreementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PrenupData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PrenupData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Perjanjian Pranikah Standar' : 'Perjanjian Pranikah Eksekutif';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <h1 className="text-[14pt] font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-tight">PERJANJIAN PRANIKAH</h1>
          <p className="text-[10pt] font-sans mt-2 font-bold uppercase tracking-widest text-slate-800">Nomor: {data.docNo}</p>
        </div>

        {/* MUKADIMAH */}
        <div className="flex-grow leading-relaxed text-justify overflow-hidden">
          <p className="mb-6">
            Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
          </p>
          
          <div className="ml-4 mb-6">
              <p className="font-bold mb-2">1. PIHAK PERTAMA (Calon Suami)</p>
              <div className="ml-6 space-y-1">
                  <div className="flex"><div className="w-[160px] shrink-0">Nama Lengkap</div><div>: <span className="font-bold uppercase">{data.p1Name}</span></div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">NIK</div><div>: {data.p1Nik}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">Tempat, Tgl Lahir</div><div>: {data.p1PlaceBirth}, {formatDateSafe(data.p1DateBirth)}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">Pekerjaan</div><div>: {data.p1Job}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0 align-top">Alamat</div><div>: {data.p1Address}</div></div>
              </div>
          </div>

          <div className="ml-4 mb-6">
              <p className="font-bold mb-2">2. PIHAK KEDUA (Calon Istri)</p>
              <div className="ml-6 space-y-1">
                  <div className="flex"><div className="w-[160px] shrink-0">Nama Lengkap</div><div>: <span className="font-bold uppercase">{data.p2Name}</span></div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">NIK</div><div>: {data.p2Nik}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">Tempat, Tgl Lahir</div><div>: {data.p2PlaceBirth}, {formatDateSafe(data.p2DateBirth)}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0">Pekerjaan</div><div>: {data.p2Job}</div></div>
                  <div className="flex"><div className="w-[160px] shrink-0 align-top">Alamat</div><div>: {data.p2Address}</div></div>
              </div>
          </div>

          <p className="mb-6 break-inside-avoid">
            Pihak Pertama dan Pihak Kedua secara bersama-sama disebut sebagai <strong>"Para Pihak"</strong> dan masing-masing disebut sebagai <strong>"Pihak"</strong>. Para Pihak dengan ini sepakat untuk mengikatkan diri dalam Perjanjian Pranikah ini dengan syarat dan ketentuan sebagai berikut:
          </p>

          {/* PASAL 1 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</div>
          <p className="mb-2">Dalam perjanjian ini, yang dimaksud dengan:</p>
          <ol className="list-decimal ml-10 space-y-2 mb-6">
             <li className="pl-2"><strong>Perjanjian</strong> adalah Perjanjian Pranikah ini berikut seluruh lampirannya yang merupakan satu kesatuan dan bagian yang tidak terpisahkan.</li>
             <li className="pl-2"><strong>Perkawinan</strong> adalah ikatan lahir batin antara Pihak Pertama dan Pihak Kedua sebagai suami istri yang sah berdasarkan hukum yang berlaku di Republik Indonesia.</li>
             <li className="pl-2"><strong>Harta Bawaan</strong> adalah harta kekayaan yang dibawa oleh masing-masing pihak sebelum perkawinan dilangsungkan.</li>
             <li className="pl-2"><strong>Harta Bersama</strong> adalah harta kekayaan yang diperoleh Para Pihak selama berlangsungnya perkawinan.</li>
          </ol>

          {/* PASAL 2 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 2<br/>MAKSUD DAN TUJUAN</div>
          <p className="mb-2">Perjanjian ini dibuat dengan maksud dan tujuan sebagai berikut:</p>
          <ol className="list-decimal ml-10 space-y-2 mb-6">
             <li className="pl-2">Memberikan kepastian hukum terkait hak dan kewajiban Para Pihak setelah dilangsungkannya Perkawinan.</li>
             <li className="pl-2">Menetapkan status kepemilikan dan pengelolaan Harta Bawaan serta Harta Bersama selama Perkawinan berlangsung maupun jika terjadi perceraian.</li>
             <li className="pl-2">Sebagai pedoman bagi Para Pihak dalam menjalankan kehidupan rumah tangga yang harmonis, saling menghormati, dan saling melindungi.</li>
          </ol>

          {/* PASAL 3 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 3<br/>STATUS HARTA KEKAYAAN</div>
          <p className="mb-2">Terkait pengelolaan harta kekayaan selama masa Perkawinan, Para Pihak sepakat untuk menerapkan ketentuan sebagai berikut:</p>
          {data.hartaKekayaan === 'pisah' ? (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Para Pihak sepakat untuk melakukan <strong>Pemisahan Harta Kekayaan Secara Mutlak</strong>.</li>
              <li className="pl-2">Segala harta kekayaan yang diperoleh masing-masing pihak selama masa perkawinan, baik berupa barang bergerak maupun tidak bergerak, akan menjadi milik sah dari pihak yang memperoleh atau menghasilkan harta tersebut.</li>
              <li className="pl-2">Tidak ada pencampuran harta dalam bentuk apapun, dan masing-masing pihak berhak penuh untuk mengelola, menggunakan, atau mengalihkan harta miliknya tanpa memerlukan persetujuan dari pihak lainnya.</li>
            </ol>
          ) : (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Para Pihak sepakat untuk menerapkan sistem <strong>Pencampuran Harta Kekayaan (Harta Bersama)</strong>.</li>
              <li className="pl-2">Segala harta kekayaan yang diperoleh selama masa perkawinan akan menjadi milik bersama Para Pihak, kecuali harta bawaan yang diperoleh sebelum perkawinan, hadiah, atau warisan.</li>
              <li className="pl-2">Pengelolaan, pengalihan, atau penjaminan atas Harta Bersama wajib mendapatkan persetujuan tertulis dari kedua belah pihak tanpa terkecuali.</li>
            </ol>
          )}

          {/* PASAL 4 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK</div>
          <p className="mb-2">Selama Perkawinan berlangsung, Para Pihak memiliki hak dan kewajiban sebagai berikut:</p>
          <ol className="list-decimal ml-10 space-y-2 mb-6">
             <li className="pl-2">Saling menghormati, mencintai, dan menjaga kehormatan masing-masing pihak serta keluarga besar.</li>
             <li className="pl-2">Memenuhi kebutuhan hidup rumah tangga sesuai dengan kemampuan dan kesepakatan bersama secara adil dan berimbang.</li>
             <li className="pl-2">Memberikan dukungan moril dan materiil dalam hal salah satu pihak menghadapi masalah atau kesulitan.</li>
             <li className="pl-2">Menjaga kerahasiaan rumah tangga dari pihak ketiga, kecuali diwajibkan oleh hukum atau atas persetujuan bersama Para Pihak.</li>
          </ol>

          {/* PASAL 5 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 5<br/>TANGGUNGAN PAJAK DAN UTANG PIUTANG</div>
          <p className="mb-2">Para Pihak sepakat bahwa mengenai tanggungan pajak, utang, dan kewajiban finansial lainnya diatur sebagai berikut:</p>
          {data.tanggunganPajak === 'masing-masing' ? (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Segala bentuk utang piutang, kewajiban pajak, atau tanggungan finansial lainnya yang ditimbulkan oleh salah satu pihak adalah tanggung jawab <strong>masing-masing pihak</strong> yang bersangkutan secara pribadi.</li>
              <li className="pl-2">Pihak lainnya dibebaskan dari segala tuntutan hukum maupun finansial atas utang atau kewajiban pajak yang tidak dibuat atas kesepakatan bersama secara tertulis.</li>
            </ol>
          ) : (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Segala bentuk utang piutang, kewajiban pajak, atau tanggungan finansial lainnya yang ditimbulkan selama perkawinan untuk kepentingan keluarga adalah <strong>tanggung jawab bersama</strong>.</li>
              <li className="pl-2">Para Pihak wajib menyelesaikan kewajiban tersebut secara proporsional sesuai dengan kemampuan finansial masing-masing pihak dan berdasarkan kesepakatan.</li>
            </ol>
          )}

          {/* PASAL 6 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 6<br/>HAK ASUH ANAK</div>
          <p className="mb-2">Dalam hal Perkawinan ini membuahkan keturunan, dan di kemudian hari terjadi perceraian antara Para Pihak, maka status hak asuh anak diatur sebagai berikut:</p>
          {data.hakAsuhAnak === 'kesepakatan' ? (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Hak asuh anak akan ditentukan berdasarkan <strong>kesepakatan bersama</strong> yang mengutamakan kepentingan terbaik bagi masa depan, pendidikan, dan kesehatan anak.</li>
              <li className="pl-2">Para Pihak sepakat untuk tetap memberikan kasih sayang, perhatian, dan tanggung jawab finansial secara penuh kepada anak, terlepas dari siapa yang memegang hak asuh utama.</li>
            </ol>
          ) : (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Hak asuh anak akan diselesaikan sesuai dengan <strong>ketentuan hukum dan perundang-undangan yang berlaku</strong> di Republik Indonesia.</li>
              <li className="pl-2">Meskipun demikian, Para Pihak berjanji untuk tidak akan melakukan tindakan yang menghalangi pihak lainnya untuk bertemu, berkomunikasi, atau memberikan kasih sayang kepada anak.</li>
            </ol>
          )}

          {/* PASAL 7 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 7<br/>FORCE MAJEURE</div>
          <p className="mb-2">Hal-hal yang berkaitan dengan Keadaan Memaksa (Force Majeure) diatur sebagai berikut:</p>
          <ol className="list-decimal ml-10 space-y-2 mb-6">
             <li className="pl-2">Yang dimaksud dengan Force Majeure adalah kejadian-kejadian di luar kekuasaan dan kemampuan Para Pihak, seperti bencana alam, wabah penyakit, kebijakan pemerintah, huru-hara, atau kondisi medis kritis yang menyebabkan salah satu pihak cacat permanen atau tidak mampu menjalankan kewajiban hukumnya.</li>
             <li className="pl-2">Apabila terjadi Force Majeure, Para Pihak sepakat untuk menyelesaikan permasalahan yang timbul secara kekeluargaan dengan berlandaskan niat baik dan belas kasih.</li>
          </ol>

          {/* PASAL 8 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 8<br/>PENYELESAIAN SENGKETA</div>
          <p className="mb-2">Setiap perselisihan, sengketa, atau perbedaan pendapat yang timbul dari atau sehubungan dengan pelaksaaan Perjanjian ini akan diselesaikan dengan cara:</p>
          {data.penyelesaianSengketa === 'musyawarah' ? (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Mengutamakan <strong>musyawarah untuk mufakat</strong> secara tertutup yang dapat melibatkan penengah dari keluarga besar kedua belah pihak.</li>
              <li className="pl-2">Apabila musyawarah tidak mencapai mufakat dalam waktu 60 (enam puluh) hari kalender, Para Pihak sepakat untuk menunjuk mediator independen bersertifikat yang disetujui bersama sebelum menempuh jalur hukum formal.</li>
            </ol>
          ) : (
            <ol className="list-decimal ml-10 space-y-2 mb-6 text-justify">
              <li className="pl-2">Mengutamakan upaya musyawarah dan kekeluargaan terlebih dahulu.</li>
              <li className="pl-2">Apabila musyawarah dipandang gagal atau tidak mencapai mufakat, Para Pihak sepakat untuk menyelesaikan sengketa ini melalui jalur hukum formal dan memilih domisili hukum yang tetap di <strong>Pengadilan Negeri atau Pengadilan Agama setempat</strong> sesuai yurisdiksi yang berwenang atas Perkawinan tersebut.</li>
            </ol>
          )}

          {/* PASAL 9 */}
          <div className="text-center font-bold mt-8 mb-4 break-inside-avoid">PASAL 9<br/>PENUTUP</div>
          <ol className="list-decimal ml-10 space-y-2 mb-6">
             <li className="pl-2">Perjanjian ini mulai berlaku dan mengikat secara sah bagi Para Pihak sejak tanggal penandatanganan, dan berlaku penuh setelah dilangsungkannya perkawinan yang sah secara agama dan negara.</li>
             <li className="pl-2">Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian ini akan diputuskan kemudian oleh Para Pihak secara musyawarah dan akan dituangkan dalam addendum yang merupakan satu kesatuan dengan Perjanjian ini.</li>
             <li className="pl-2">Demikian Perjanjian Pranikah ini dibuat secara sadar, tanpa paksaan dari pihak manapun, dalam rangkap 2 (dua), masing-masing dibubuhi meterai yang cukup dan memiliki kekuatan hukum yang sama bagi Para Pihak.</li>
          </ol>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 break-inside-avoid">
           <div className="text-right mb-8">
              <p className="mr-12">{data.city}, {formatDateSafe(data.date)}</p>
           </div>
           
           <div className="flex justify-between px-10 text-center">
              <div className="w-[200px]">
                 <p className="font-bold mb-1">PIHAK PERTAMA</p>
                 <p className="text-sm mb-24">Calon Suami</p>
                 <p className="font-bold underline uppercase">{data.p1Name}</p>
                 <p className="text-sm">Meterai Rp 10.000,-</p>
              </div>
              
              <div className="w-[200px]">
                 <p className="font-bold mb-1">PIHAK KEDUA</p>
                 <p className="text-sm mb-24">Calon Istri</p>
                 <p className="font-bold underline uppercase">{data.p2Name}</p>
                 <p className="text-sm">Meterai Rp 10.000,-</p>
              </div>
           </div>
           
           <div className="mt-16 text-center">
              <p className="font-bold mb-1">MENGETAHUI / MENGESAHKAN</p>
              <p className="text-sm mb-24">Notaris / Pejabat Pembuat Akta</p>
              <p className="font-bold underline uppercase">___________________________</p>
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Scale size={16} className="text-rose-500" /> <span>Legal Drafter: Perjanjian Pranikah</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Perjanjian Pranikah Standar {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Perjanjian Pranikah Eksekutif {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print / PDF</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-white shadow-sm font-sans z-10">
              <h2 className="font-black text-xs uppercase text-slate-800 flex items-center gap-2"><Edit3 size={16} className="text-blue-600" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 print:overflow-visible print:bg-white">
              
              {/* METADATA DOKUMEN */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-500 border-b pb-2 tracking-widest flex items-center gap-2">
                    <FileText size={12}/> Informasi Dokumen
                 </h3>
                 <div className="grid grid-cols-1 gap-3">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Dokumen</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                          <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                          <input type="date" className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 border-l-4 border-l-blue-500">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2">
                    <UserCircle2 size={12}/> Pihak Pertama (Calon Suami)
                 </h3>
                 <div className="space-y-3">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / No. KTP</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                          <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1PlaceBirth} onChange={e => handleDataChange('p1PlaceBirth', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                          <input type="date" className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1DateBirth} onChange={e => handleDataChange('p1DateBirth', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                       <textarea className="w-full mt-1 p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 border-l-4 border-l-rose-500">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-2 tracking-widest flex items-center gap-2">
                    <UserCircle2 size={12}/> Pihak Kedua (Calon Istri)
                 </h3>
                 <div className="space-y-3">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / No. KTP</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                          <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2PlaceBirth} onChange={e => handleDataChange('p2PlaceBirth', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                          <input type="date" className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2DateBirth} onChange={e => handleDataChange('p2DateBirth', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                       <input className="w-full mt-1 p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                       <textarea className="w-full mt-1 p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* KLAUSUL DINAMIS */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 border-l-4 border-l-amber-500">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2">
                    <Briefcase size={12}/> Klausul Perjanjian
                 </h3>
                 
                 <div className="space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Status Harta Kekayaan (Pasal 3)</label>
                       <select 
                          className="w-full p-2 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50" 
                          value={data.hartaKekayaan} 
                          onChange={e => handleDataChange('hartaKekayaan', e.target.value)}
                       >
                          <option value="pisah">Pemisahan Harta Mutlak (Pisah Harta)</option>
                          <option value="campur">Pencampuran Harta (Harta Bersama)</option>
                       </select>
                    </div>

                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tanggungan Pajak & Utang (Pasal 5)</label>
                       <select 
                          className="w-full p-2 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50" 
                          value={data.tanggunganPajak} 
                          onChange={e => handleDataChange('tanggunganPajak', e.target.value)}
                       >
                          <option value="masing-masing">Tanggung Jawab Pribadi (Masing-masing)</option>
                          <option value="bersama">Tanggung Jawab Bersama</option>
                       </select>
                    </div>

                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Hak Asuh Anak (Pasal 6)</label>
                       <select 
                          className="w-full p-2 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50" 
                          value={data.hakAsuhAnak} 
                          onChange={e => handleDataChange('hakAsuhAnak', e.target.value)}
                       >
                          <option value="kesepakatan">Berdasarkan Kesepakatan Bersama</option>
                          <option value="hukum">Sesuai Hukum & Perundang-undangan Berlaku</option>
                       </select>
                    </div>

                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Penyelesaian Sengketa (Pasal 8)</label>
                       <select 
                          className="w-full p-2 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50" 
                          value={data.penyelesaianSengketa} 
                          onChange={e => handleDataChange('penyelesaianSengketa', e.target.value)}
                       >
                          <option value="pengadilan">Jalur Hukum (Pengadilan Negeri / Agama)</option>
                          <option value="musyawarah">Musyawarah & Mediasi Independen</option>
                       </select>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        {/* PREVIEW DOCUMENT */}
 <div className={`flex-1 h-full bg-slate-300 rounded-tl-2xl border-t border-l border-slate-300 shadow-inner flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static print:border-none print:shadow-none print:rounded-none`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block print:shadow-none">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Pranikah" price={35000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
