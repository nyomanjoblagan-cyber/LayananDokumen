'use client';

/**
 * FILE: RekomendasiDosenPage.tsx
 * STATUS: PRODUCTION READY (FIXED SCOPE & DEPLOY)
 * DESC: Generator Surat Pernyataan dan Rekomendasi Akademik Standar Legal/Enterprise
 * FIX: Rombak total struktur menjadi Legal Drafting Enterprise (8 Pasal)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, GraduationCap, Building2, UserCircle2, 
  PenTool, Award, LayoutTemplate, ChevronDown, 
  Edit3, RotateCcw, ArrowLeftCircle, Gavel, FileText, Scale
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RecommendationData {
  city: string;
  date: string;
  docNo: string;
  university: string;
  
  // Pihak Pertama (Pemberi Rekomendasi)
  party1Name: string;
  party1Nik: string;
  party1Birth: string;
  party1Occupation: string;
  party1Address: string;

  // Pihak Kedua (Yang Direkomendasikan)
  party2Name: string;
  party2Nik: string;
  party2Birth: string;
  party2Occupation: string;
  party2Address: string;
  studentId: string;
  studentGpa: string;

  // Isi Substansi Dokumen
  recommendationPurpose: string;
  academicRelation: string;
  recommendationLevel: string;
  validityPeriod: string;
  evaluationPoint1: string;
  evaluationPoint2: string;
  disputeResolution: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RecommendationData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'REF/088/UNUD/FT/I/2026',
  university: 'UNIVERSITAS UDAYANA (UNUD)',
  
  party1Name: 'DR. I MADE WIRA, S.T., M.T.',
  party1Nik: '3501010101800001',
  party1Birth: 'Denpasar, 10 Agustus 1980',
  party1Occupation: 'Dosen / Lektor Kepala',
  party1Address: 'Jl. Kampus Bukit Jimbaran, Badung, Bali',

  party2Name: 'BAGUS RAMADHAN',
  party2Nik: '3501010101000002',
  party2Birth: 'Denpasar, 15 Maret 2002',
  party2Occupation: 'Mahasiswa',
  party2Address: 'Jl. Tukad Pakerisan No. 45, Denpasar Selatan',
  studentId: '2208561001',
  studentGpa: '3.85 / 4.00',

  recommendationPurpose: 'Pendaftaran Beasiswa LPDP Tahap I 2026',
  academicRelation: 'Dosen Pembimbing Utama',
  recommendationLevel: 'SANGAT DIREKOMENDASIKAN',
  validityPeriod: '6 (Enam) Bulan',
  evaluationPoint1: 'Memiliki kemampuan analisis logis yang sangat tajam, pemahaman teori yang mendalam pada disiplin ilmu teknologi informasi, serta mampu mengimplementasikan riset secara praktis dan terukur.',
  evaluationPoint2: 'Memiliki integritas tinggi, kepemimpinan yang adaptif, kemampuan bekerja sama dalam tim lintas disiplin, dan menunjukkan etos kerja serta kedisiplinan yang konsisten.',
  disputeResolution: 'Musyawarah Kekeluargaan dan Peraturan Akademik'
};

export default function RekomendasiDosenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <RecommendationBuilder />
    </Suspense>
  );
}

function RecommendationBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RecommendationData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RecommendationData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Legal Akademik (Formal)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Korporat Institusi
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Legal Akademik' : 'Korporat Institusi';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* HEADER / KOP */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center shrink-0 font-sans">
          <h2 className="text-[10pt] font-black uppercase tracking-tighter leading-tight opacity-70">INSTITUSI PENDIDIKAN TINGGI</h2>
          <h1 className="text-[14pt] font-black uppercase leading-tight mt-1 tracking-tight">{data.university}</h1>
          <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500 print:text-black">Dokumen Rekomendasi Resmi dan Keterangan Akademik</p>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERNYATAAN DAN REKOMENDASI AKADEMIK</h2>
          <p className="text-[9pt] font-sans mt-2 font-bold text-slate-600 print:text-black">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="space-y-4 flex-grow overflow-hidden text-left leading-relaxed text-justify">
          <p className="mb-4">
            Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
          </p>

          {/* PIHAK PERTAMA */}
          <div className="mb-4">
            <div className="ml-4 flex gap-4 font-bold mb-2 uppercase">I. PIHAK PERTAMA</div>
            <div className="ml-8 space-y-1">
              <div className="flex">
                <div className="w-48 shrink-0">Nama Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div className="font-bold uppercase">{data.party1Name}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party1Nik}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party1Birth}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Pekerjaan/Jabatan</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party1Occupation}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Alamat Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party1Address}</div>
              </div>
            </div>
            <div className="ml-4 mt-2 text-justify">
              Dalam hal ini bertindak atas nama pribadi dan/atau dalam kapasitas jabatannya sebagai Pemberi Rekomendasi, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
            </div>
          </div>

          {/* PIHAK KEDUA */}
          <div className="mb-6">
            <div className="ml-4 flex gap-4 font-bold mb-2 uppercase">II. PIHAK KEDUA</div>
            <div className="ml-8 space-y-1">
              <div className="flex">
                <div className="w-48 shrink-0">Nama Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div className="font-bold uppercase">{data.party2Name}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party2Nik}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party2Birth}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Nomor Induk Mahasiswa</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.studentId}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Pekerjaan/Status</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party2Occupation}</div>
              </div>
              <div className="flex">
                <div className="w-48 shrink-0">Alamat Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.party2Address}</div>
              </div>
            </div>
            <div className="ml-4 mt-2 text-justify">
              Dalam hal ini bertindak atas nama diri sendiri selaku pihak yang dievaluasi dan direkomendasikan, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
            </div>
          </div>

          <p className="mb-6 text-justify">
            <strong>PIHAK PERTAMA</strong> dan <strong>PIHAK KEDUA</strong> secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>, dengan ini menerangkan dan menyatakan secara hukum hal-hal sebagai berikut:
          </p>

          {/* PASAL 1 */}
          <div className="mb-4">
            <div className="text-center font-bold mb-2">
              PASAL 1<br/>DEFINISI DAN TUJUAN
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>Surat Pernyataan dan Rekomendasi Akademik ini adalah dokumen formal yang dikeluarkan secara sah oleh PIHAK PERTAMA untuk mengevaluasi, memvalidasi, dan memberikan rekomendasi dukungan kepada PIHAK KEDUA.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Dokumen ini disusun dan diterbitkan berdasarkan prinsip objektivitas, kejujuran akademik, dan penilaian komprehensif terhadap rekam jejak PIHAK KEDUA.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(3)</span>
                <p>Tujuan utama diterbitkannya dokumen ini adalah semata-mata untuk keperluan <strong>{data.recommendationPurpose}</strong> yang diajukan oleh PIHAK KEDUA secara sah.</p>
              </div>
            </div>
          </div>

          {/* PASAL 2 */}
          <div className="mb-4">
            <div className="text-center font-bold mb-2">
              PASAL 2<br/>LATAR BELAKANG DAN KAPASITAS
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>PIHAK PERTAMA menerangkan dan menyatakan secara sadar bahwa telah mengenal PIHAK KEDUA dalam kapasitas akademik dan/atau profesional sebagai <strong>{data.academicRelation}</strong>.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Interaksi dan hubungan akademik antara PARA PIHAK di {data.university} telah berlangsung dalam jangka waktu yang cukup untuk memberikan ruang penilaian yang mendalam dan terukur secara akademis.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(3)</span>
                <p>Selama masa interaksi tersebut, PIHAK PERTAMA secara langsung mengamati, membimbing, serta mengawasi setiap perkembangan, kinerja, dan pencapaian akademik dari PIHAK KEDUA.</p>
              </div>
            </div>
          </div>

          {/* PASAL 3 */}
          <div className="mb-4">
            <div className="text-center font-bold mb-2">
              PASAL 3<br/>EVALUASI AKADEMIK DAN KARAKTER
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>PIHAK PERTAMA menyatakan bahwa PIHAK KEDUA memiliki rekam jejak akademik yang baik, stabil, dan terverifikasi dengan capaian Indeks Prestasi (IPK) akhir/berjalan sebesar <strong>{data.studentGpa}</strong>.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Evaluasi terhadap kapasitas intelektual, penguasaan teori, dan kompetensi keilmuan PIHAK KEDUA adalah: {data.evaluationPoint1}</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(3)</span>
                <p>Evaluasi terhadap kepemimpinan, etika pergaulan akademik, dan integritas karakter PIHAK KEDUA adalah: {data.evaluationPoint2}</p>
              </div>
            </div>
          </div>

          {/* PASAL 4 */}
          <div className="mb-4">
            <div className="text-center font-bold mb-2">
              PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>PIHAK PERTAMA berkewajiban untuk senantiasa memberikan keterangan evaluasi yang bersifat objektif, faktual, tidak berpihak, dan dapat dipertanggungjawabkan kebenarannya secara hukum maupun kaidah moral akademik.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>PIHAK KEDUA memiliki hak penuh untuk mendapatkan penilaian yang adil dan berhak menggunakan surat rekomendasi ini secara sah untuk mencapai tujuan sebagaimana tertuang dalam Pasal 1 Ayat (3).</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(3)</span>
                <p>PIHAK KEDUA berkewajiban mutlak untuk menjunjung tinggi nama baik dan kehormatan institusi {data.university}, serta memelihara marwah dan reputasi PIHAK PERTAMA atas penggunaan rekomendasi ini.</p>
              </div>
            </div>
          </div>

          {/* PASAL 5 */}
          <div className="mb-4">
            <div className="text-center font-bold mb-2">
              PASAL 5<br/>PERNYATAAN REKOMENDASI UTAMA
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>Berdasarkan keseluruhan hasil evaluasi komprehensif sebagaimana telah diuraikan pada Pasal 3, PIHAK PERTAMA dengan ini menyatakan bahwa PIHAK KEDUA secara sah <strong>{data.recommendationLevel}</strong> untuk dipertimbangkan, diproses, dan diterima pada program/tujuan yang dituju.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>PIHAK PERTAMA memegang keyakinan penuh bahwa PIHAK KEDUA akan terus mempertahankan rekam jejak positif, memberikan kontribusi nyata, menyelesaikan setiap beban tanggung jawab, serta mampu meraih prestasi memuaskan di masa yang akan datang.</p>
              </div>
            </div>
          </div>

          {/* PASAL 6 */}
          <div className="mb-4 break-inside-avoid">
            <div className="text-center font-bold mb-2">
              PASAL 6<br/>MASA BERLAKU DAN KERAHASIAAN DOKUMEN
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>Surat Pernyataan dan Rekomendasi Akademik ini dinyatakan berlaku secara sah untuk dipergunakan dalam jangka waktu <strong>{data.validityPeriod}</strong> terhitung sejak tanggal dokumen ini ditandatangani.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Apabila melewati tenggat waktu sebagaimana dimaksud pada Ayat (1), maka kekuatan dari dokumen ini dinyatakan kedaluwarsa dan PIHAK KEDUA diwajibkan mengajukan permohonan pembaruan evaluasi apabila masih dipersyaratkan.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(3)</span>
                <p>Substansi dan seluruh informasi yang tertera di dalam dokumen ini wajib diperlakukan secara konfidensial dan hanya ditujukan kepada panitia seleksi atau institusi berwenang yang relevan.</p>
              </div>
            </div>
          </div>

          {/* PASAL 7 */}
          <div className="mb-4 break-inside-avoid">
            <div className="text-center font-bold mb-2">
              PASAL 7<br/>PENYELESAIAN SENGKETA DAN KETIDAKSESUAIAN
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>Apabila di kemudian hari terindikasi dan ditemukan adanya manipulasi data, pemalsuan identitas, maupun bentuk pelanggaran etika lainnya yang dilakukan secara sadar oleh PIHAK KEDUA atas pengadaan dokumen ini, maka seluruh risiko dan kerugian menjadi tanggung jawab mutlak PIHAK KEDUA dan PIHAK PERTAMA memiliki hak untuk membatalkan rekomendasi secara sepihak dan seketika.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Segala bentuk perbedaan interpretasi, konflik, maupun perselisihan yang timbul di antara PARA PIHAK terkait pelaksanaan dokumen ini akan diselesaikan dengan cara mengutamakan upaya <strong>{data.disputeResolution}</strong>.</p>
              </div>
            </div>
          </div>

          {/* PASAL 8 */}
          <div className="mb-8 break-inside-avoid">
            <div className="text-center font-bold mb-2">
              PASAL 8<br/>KETENTUAN PENUTUP
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(1)</span>
                <p>Demikian Surat Pernyataan dan Rekomendasi Akademik ini dibuat serta disusun dengan itikad baik, dalam keadaan sadar, sehat jasmani dan rohani, serta sepenuhnya bebas dari paksaan, intervensi, maupun tekanan dari pihak manapun.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-6 shrink-0">(2)</span>
                <p>Dokumen ini memiliki kekuatan referensi yang mengikat dan dapat diuji kebenarannya secara langsung melalui kontak resmi PIHAK PERTAMA oleh pihak-pihak atau institusi yang berkepentingan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-8 break-inside-avoid font-sans">
            <div className="flex justify-between items-start text-center">
                {/* Tanda Tangan Pihak 2 */}
                <div className="w-[30%] flex flex-col items-center">
                    <p className="text-[10pt] mb-1 opacity-0">Date placeholder</p>
                    <p className="text-[9pt] uppercase font-bold tracking-widest mb-16">
                        Pihak Kedua,<br/>Yang Direkomendasikan
                    </p>
                    <p className="font-bold underline uppercase tracking-tight text-[10pt] text-slate-900 w-full whitespace-nowrap">
                        {data.party2Name}
                    </p>
                </div>
                {/* Tanda Tangan Pihak 1 */}
                <div className="w-[45%] flex flex-col items-center">
                    <p className="text-[10pt] mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="text-[9pt] uppercase font-bold tracking-widest mb-16">
                        Pihak Pertama,<br/>Pemberi Rekomendasi
                    </p>
                    <p className="font-bold underline uppercase tracking-tight text-[11pt] text-slate-900">
                        {data.party1Name}
                    </p>
                    <p className="text-[9pt] uppercase mt-1">
                        NIP / NIK. {data.party1Nik}
                    </p>
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
          @page { size: F4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Scale size={16} /> <span>Legal Akademik Drafting</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Legal</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              
              {/* Pihak Pertama */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Identitas Pihak Pertama (Pemberi)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.party1Name} onChange={e => handleDataChange('party1Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1Nik} onChange={e => handleDataChange('party1Nik', e.target.value)} placeholder="NIK / NIP" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1Birth} onChange={e => handleDataChange('party1Birth', e.target.value)} placeholder="Tempat, Tanggal Lahir" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.party1Occupation} onChange={e => handleDataChange('party1Occupation', e.target.value)} placeholder="Pekerjaan / Jabatan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none h-16 resize-none" value={data.party1Address} onChange={e => handleDataChange('party1Address', e.target.value)} placeholder="Alamat Lengkap KTP" />
              </div>

              {/* Pihak Kedua */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas Pihak Kedua (Penerima)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.party2Name} onChange={e => handleDataChange('party2Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2Nik} onChange={e => handleDataChange('party2Nik', e.target.value)} placeholder="NIK / NIP" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2Birth} onChange={e => handleDataChange('party2Birth', e.target.value)} placeholder="Tempat, Tanggal Lahir" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.party2Occupation} onChange={e => handleDataChange('party2Occupation', e.target.value)} placeholder="Pekerjaan / Status" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none h-16 resize-none" value={data.party2Address} onChange={e => handleDataChange('party2Address', e.target.value)} placeholder="Alamat Lengkap KTP" />
              </div>

              {/* Institusi & Akademik */}
              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Data Akademik</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={data.university} onChange={e => handleDataChange('university', e.target.value)} placeholder="Nama Institusi Pendidikan" />
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] text-slate-500 mb-1 block">NIM / Nomor Induk</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 mb-1 block">IPK Akhir/Berjalan</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.studentGpa} onChange={e => handleDataChange('studentGpa', e.target.value)} placeholder="Cth: 3.85 / 4.00" />
                    </div>
                 </div>
              </div>

              {/* Substansi Klausal */}
              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Klausul Substansi Rekomendasi</h3>
                 
                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Tujuan Rekomendasi</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.recommendationPurpose} onChange={e => handleDataChange('recommendationPurpose', e.target.value)} placeholder="Cth: Pendaftaran Beasiswa LPDP Tahap I 2026" />
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Hubungan Akademik</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={data.academicRelation} onChange={e => handleDataChange('academicRelation', e.target.value)}>
                        <option value="Dosen Pembimbing Utama">Dosen Pembimbing Utama</option>
                        <option value="Dosen Pengampu Mata Kuliah">Dosen Pengampu Mata Kuliah</option>
                        <option value="Dekan Fakultas">Dekan Fakultas</option>
                        <option value="Rektor Universitas">Rektor Universitas</option>
                        <option value="Atasan Langsung / Supervisor">Atasan Langsung / Supervisor</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Tingkat Rekomendasi</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-bold" value={data.recommendationLevel} onChange={e => handleDataChange('recommendationLevel', e.target.value)}>
                        <option value="SANGAT DIREKOMENDASIKAN">Sangat Direkomendasikan</option>
                        <option value="DIREKOMENDASIKAN">Direkomendasikan</option>
                        <option value="DIREKOMENDASIKAN DENGAN CATATAN">Direkomendasikan dengan Catatan</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Evaluasi Intelektual & Teoritis</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed" value={data.evaluationPoint1} onChange={e => handleDataChange('evaluationPoint1', e.target.value)} placeholder="Tuliskan evaluasi kapasitas teoritis..." />
                 </div>
                 
                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Evaluasi Karakter & Kepemimpinan</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed" value={data.evaluationPoint2} onChange={e => handleDataChange('evaluationPoint2', e.target.value)} placeholder="Tuliskan evaluasi etika karakter..." />
                 </div>
              </div>

              {/* Klausul Hukum */}
              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Gavel size={12}/> Legal & Validitas</h3>
                 
                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Masa Berlaku Dokumen</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.validityPeriod} onChange={e => handleDataChange('validityPeriod', e.target.value)}>
                        <option value="3 (Tiga) Bulan">3 Bulan</option>
                        <option value="6 (Enam) Bulan">6 Bulan</option>
                        <option value="1 (Satu) Tahun">1 Tahun</option>
                        <option value="Selama Program Berjalan">Selama Program Berjalan</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Penyelesaian Sengketa</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.disputeResolution} onChange={e => handleDataChange('disputeResolution', e.target.value)}>
                        <option value="Musyawarah Kekeluargaan dan Peraturan Akademik">Musyawarah & Peraturan Akademik</option>
                        <option value="Mediasi dan Arbitrase Independen">Mediasi & Arbitrase</option>
                        <option value="Pengadilan Negeri Setempat">Pengadilan Negeri Setempat</option>
                        <option value="Pengadilan Tata Usaha Negara (PTUN)">Pengadilan Tata Usaha Negara (PTUN)</option>
                    </select>
                 </div>
              </div>

              {/* Administrasi */}
              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Administrasi Penutup</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat Resmi" />
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen Rekomendasi Hukum" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
