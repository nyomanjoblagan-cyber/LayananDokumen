'use client';

/**
 * FILE: NonBantuanPage.tsx
 * STATUS: PRODUCTION READY (FULL LEGAL DRAFTING ENTERPRISE)
 * DESC: Generator Surat Perjanjian Deklarasi Mutlak Status Non-Bansos/Beasiswa dengan format Hukum Korporat/Notaris
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Building2, UserCircle2, 
  LayoutTemplate, ChevronDown, Check, Edit3, RotateCcw,
  Gavel, PenTool, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LegalData {
  // Pihak 1 (Declarant)
  pihak1Nama: string;
  pihak1Nik: string;
  pihak1TempatLahir: string;
  pihak1TanggalLahir: string;
  pihak1Pekerjaan: string;
  pihak1Alamat: string;

  // Pihak 2 (Institution / Pejabat)
  pihak2Nama: string;
  pihak2Nik: string;
  pihak2TempatLahir: string;
  pihak2TanggalLahir: string;
  pihak2Pekerjaan: string;
  pihak2Alamat: string;

  // Lainnya
  kategoriBantuan: string;
  instansiTujuan: string;
  periodeBerlaku: string;
  metodePemeriksaan: string;
  sanksiPelanggaran: string;
  kotaPembuatan: string;
  tanggalPembuatan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LegalData = {
  pihak1Nama: 'BIMA ARYA MAHENDRA',
  pihak1Nik: '3201012345678901',
  pihak1TempatLahir: 'Bogor',
  pihak1TanggalLahir: '2001-08-15',
  pihak1Pekerjaan: 'Mahasiswa',
  pihak1Alamat: 'Jl. Padjajaran No. 45, RT 02/03, Kelurahan Bantarjati, Kecamatan Bogor Utara, Kota Bogor, Jawa Barat',

  pihak2Nama: 'DR. H. AHMAD SYUKRI, M.PD.',
  pihak2Nik: '197501011999031002',
  pihak2TempatLahir: 'Jakarta',
  pihak2TanggalLahir: '1975-01-01',
  pihak2Pekerjaan: 'Kepala Bagian Kemahasiswaan',
  pihak2Alamat: 'Gedung Rektorat Lt. 2, Kampus Utama Jaya Makmur, Jakarta Selatan',

  kategoriBantuan: 'Beasiswa Pendidikan Pemerintah',
  instansiTujuan: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  periodeBerlaku: 'Tahun Akademik 2026/2027',
  metodePemeriksaan: 'Verifikasi Silang Sistem Nasional',
  sanksiPelanggaran: 'Pengembalian Dana Penuh 100% beserta Denda 50%',
  kotaPembuatan: 'JAKARTA',
  tanggalPembuatan: '', // Diisi di useEffect
};

export default function NonBantuanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Editor Surat...</div>}>
      <NonBantuanBuilder />
    </Suspense>
  );
}

function NonBantuanBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LegalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalPembuatan: today }));
  }, []);

  const handleDataChange = (field: keyof LegalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalPembuatan: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Legal Draft (Notaris)' : 'Format Standar';

  const DocumentContent = () => {
    const getHari = (dateString: string) => {
        if (!dateString) return "...";
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return "...";
        return days[d.getDay()];
    };

    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-black leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto font-serif text-[11pt]`}>
        
        {/* JUDUL */}
        <div className="text-center mb-10 leading-tight">
          <h2 className="text-[14pt] font-black underline uppercase tracking-wide">PERJANJIAN DEKLARASI MUTLAK</h2>
          <h3 className="text-[12pt] font-bold uppercase mt-1">TENTANG STATUS NON-PENERIMA BANTUAN ATAU BEASISWA</h3>
          <p className="text-[11pt] mt-2 font-bold">Nomor: .....................................................</p>
        </div>

        {/* PEMBUKA */}
        <div className="text-justify leading-relaxed space-y-4">
          <p className="indent-8">
            Pada hari ini, <strong>{getHari(data.tanggalPembuatan)}</strong>, tanggal <strong>{formatDateSafe(data.tanggalPembuatan)}</strong>, bertempat di <strong>{data.kotaPembuatan}</strong>, telah disepakati dan ditandatangani Perjanjian Deklarasi Mutlak (selanjutnya disebut &quot;Perjanjian&quot;) oleh dan antara:
          </p>

          {/* PIHAK PERTAMA */}
          <div className="pl-4 md:pl-8">
            <div className="flex gap-2">
              <div className="w-5 shrink-0 text-right">1.</div>
              <div className="flex-1 space-y-1">
                <div className="flex"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.pihak1Nama}</div></div>
                <div className="flex"><div className="w-48 shrink-0">NIK</div><div className="w-4 shrink-0">:</div><div>{data.pihak1Nik}</div></div>
                <div className="flex"><div className="w-48 shrink-0">Tempat, Tanggal Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pihak1TempatLahir}, {formatDateSafe(data.pihak1TanggalLahir)}</div></div>
                <div className="flex"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.pihak1Pekerjaan}</div></div>
                <div className="flex"><div className="w-48 shrink-0 align-top">Alamat (Sesuai KTP)</div><div className="w-4 shrink-0 align-top">:</div><div className="text-justify">{data.pihak1Alamat}</div></div>
              </div>
            </div>
            <p className="pt-2 pl-7">Selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong> (Pemberi Pernyataan).</p>
          </div>

          {/* PIHAK KEDUA */}
          <div className="pl-4 md:pl-8">
            <div className="flex gap-2">
              <div className="w-5 shrink-0 text-right">2.</div>
              <div className="flex-1 space-y-1">
                <div className="flex"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.pihak2Nama}</div></div>
                <div className="flex"><div className="w-48 shrink-0">NIP/NIK</div><div className="w-4 shrink-0">:</div><div>{data.pihak2Nik}</div></div>
                <div className="flex"><div className="w-48 shrink-0">Tempat, Tanggal Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pihak2TempatLahir}, {formatDateSafe(data.pihak2TanggalLahir)}</div></div>
                <div className="flex"><div className="w-48 shrink-0">Jabatan/Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.pihak2Pekerjaan}</div></div>
                <div className="flex"><div className="w-48 shrink-0 align-top">Alamat Kedudukan</div><div className="w-4 shrink-0 align-top">:</div><div className="text-justify">{data.pihak2Alamat}</div></div>
              </div>
            </div>
            <p className="pt-2 pl-7">Selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong> (Penerima Pernyataan / Instansi Terkait).</p>
          </div>

          <p className="indent-8 mt-6">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>.
          </p>
          <p className="indent-8">
            PARA PIHAK dengan ini menerangkan dan sepakat untuk mengikatkan diri dalam Perjanjian ini dengan syarat-syarat dan ketentuan-ketentuan sebagaimana diuraikan dalam Pasal-Pasal berikut:
          </p>

          {/* PASAL 1 */}
          <div className="text-center font-bold pt-4 pb-2">
            <p>PASAL 1</p>
            <p>DEFINISI DAN KETENTUAN UMUM</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Bantuan atau Beasiswa adalah segala bentuk penerimaan dana atau fasilitas finansial dalam kategori <strong>{data.kategoriBantuan}</strong> yang bersumber dari Pemerintah, Swasta, atau Lembaga Donor lainnya.</li>
            <li className="pl-2">Status Non-Penerima adalah kondisi di mana PIHAK PERTAMA secara sah dan meyakinkan tidak sedang menerima, tidak terdaftar sebagai penerima aktif, dan tidak dalam proses pencairan dari jenis Bantuan sebagaimana dimaksud dalam ayat 1.</li>
          </ol>

          {/* PASAL 2 */}
          <div className="text-center font-bold pt-4 pb-2">
            <p>PASAL 2</p>
            <p>OBJEK PERJANJIAN</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Objek dari Perjanjian ini adalah pernyataan jaminan mutlak dari PIHAK PERTAMA kepada PIHAK KEDUA bahwa PIHAK PERTAMA memenuhi kualifikasi Status Non-Penerima guna keperluan pendaftaran atau pengajuan pada instansi <strong>{data.instansiTujuan}</strong>.</li>
            <li className="pl-2">Pernyataan jaminan mutlak ini berlaku penuh selama periode <strong>{data.periodeBerlaku}</strong> terhitung sejak tanggal ditandatanganinya Perjanjian ini oleh PARA PIHAK.</li>
          </ol>

          {/* PASAL 3 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 3</p>
            <p>HAK DAN KEWAJIBAN PIHAK PERTAMA</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">PIHAK PERTAMA berhak untuk diproses pengajuannya oleh PIHAK KEDUA sesuai dengan prosedur standar operasi (SOP) yang berlaku di instansi PIHAK KEDUA.</li>
            <li className="pl-2">PIHAK PERTAMA wajib memberikan keterangan, data identitas diri, dan dokumen pendukung yang sebenar-benarnya tanpa ada upaya manipulasi, pemalsuan, atau itikad buruk lainnya.</li>
            <li className="pl-2">PIHAK PERTAMA wajib secara proaktif dan segera melaporkan kepada PIHAK KEDUA apabila di kemudian hari selama periode berlakunya perjanjian ini terdapat perubahan status menjadi penerima bantuan dari pihak manapun.</li>
          </ol>

          {/* PASAL 4 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 4</p>
            <p>HAK DAN KEWAJIBAN PIHAK KEDUA</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">PIHAK KEDUA berhak untuk menerima jaminan kebenaran data dari PIHAK PERTAMA secara mutlak tanpa syarat apapun.</li>
            <li className="pl-2">PIHAK KEDUA berhak sewaktu-waktu melakukan investigasi, penelusuran rekam jejak, maupun pencocokan silang (cross-check) terhadap status PIHAK PERTAMA pada pangkalan data instansi terkait tingkat nasional maupun daerah.</li>
            <li className="pl-2">PIHAK KEDUA wajib menjaga kerahasiaan data pribadi PIHAK PERTAMA yang diserahkan dalam pelaksanaan Perjanjian ini sesuai dengan ketentuan perundang-undangan mengenai perlindungan data pribadi.</li>
          </ol>

          {/* PASAL 5 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 5</p>
            <p>SISTEM PEMERIKSAAN DAN VERIFIKASI KEBENARAN</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Untuk menjamin keabsahan pernyataan pada Perjanjian ini, PIHAK KEDUA akan melaksanakan prosedur pengawasan dengan metode pemeriksaan berupa <strong>{data.metodePemeriksaan}</strong>.</li>
            <li className="pl-2">Melalui penandatanganan Perjanjian ini, PIHAK PERTAMA memberikan kuasa penuh yang tidak dapat ditarik kembali (irrevocable) kepada PIHAK KEDUA untuk meminta informasi dari instansi, lembaga, atau otoritas perbankan terkait demi membuktikan kebenaran status PIHAK PERTAMA.</li>
          </ol>

          {/* PASAL 6 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 6</p>
            <p>SANKSI DAN KONSEKUENSI PELANGGARAN</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Apabila di kemudian hari terbukti secara sah dan meyakinkan bahwa PIHAK PERTAMA memberikan keterangan palsu atau ternyata terdaftar sebagai penerima Bantuan ganda, maka PIHAK PERTAMA dinyatakan melakukan pelanggaran berat atas Perjanjian ini.</li>
            <li className="pl-2">Atas pelanggaran sebagaimana dimaksud pada ayat 1 di atas, PIHAK PERTAMA sepakat untuk dikenakan sanksi secara langsung berupa <strong>{data.sanksiPelanggaran}</strong>.</li>
            <li className="pl-2">Pengenaan sanksi perdata administratif sebagaimana dimaksud pada ayat 2 tidak menghapus hak PIHAK KEDUA untuk melaporkan PIHAK PERTAMA kepada pihak kepolisian Republik Indonesia atas dugaan tindak pidana pemalsuan dokumen dan/atau penipuan sesuai ketentuan Kitab Undang-Undang Hukum Pidana (KUHP).</li>
          </ol>

          {/* PASAL 7 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 7</p>
            <p>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Keadaan Memaksa meliputi bencana alam berskala nasional, kebijakan moneter/fiskal pemerintah secara drastis, huru-hara, atau gangguan pangkalan data nasional berskala besar yang mengakibatkan PARA PIHAK tidak dapat memenuhi sebagian atau seluruh kewajiban dalam Perjanjian ini.</li>
            <li className="pl-2">Dalam hal terjadi Keadaan Memaksa, pihak yang terdampak wajib memberitahukan secara tertulis kepada pihak lainnya paling lambat 7 (tujuh) hari kalender sejak terjadinya peristiwa tersebut.</li>
            <li className="pl-2">Kelalaian dalam memberitahukan Keadaan Memaksa secara tertulis dalam batas waktu tersebut menyebabkan hak untuk mengajukan alasan Keadaan Memaksa menjadi gugur secara hukum.</li>
          </ol>

          {/* PASAL 8 */}
          <div className="text-center font-bold pt-4 pb-2 break-before-auto">
            <p>PASAL 8</p>
            <p>PENYELESAIAN SENGKETA DAN DOMISILI HUKUM</p>
          </div>
          <ol className="list-decimal pl-8 md:pl-12 space-y-2">
            <li className="pl-2">Segala perselisihan yang timbul dari atau terkait dengan pelaksanaan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mencapai mufakat.</li>
            <li className="pl-2">Apabila musyawarah tidak mencapai mufakat dalam batas waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikannya secara hukum dengan memilih kediaman hukum (domisili) yang umum dan tetap di Kepaniteraan Pengadilan Negeri di <strong>{data.kotaPembuatan}</strong>.</li>
            <li className="pl-2">Selama proses penyelesaian sengketa berlangsung, seluruh hak dan kewajiban PARA PIHAK yang tidak menjadi objek sengketa tetap berlaku dan wajib dilaksanakan dengan iktikad baik.</li>
          </ol>

          {/* PENUTUP */}
          <div className="pt-8 space-y-2">
            <p className="indent-8">
              Demikian Perjanjian Deklarasi Mutlak ini dibuat dan ditandatangani di <strong>{data.kotaPembuatan}</strong> pada tanggal <strong>{formatDateSafe(data.tanggalPembuatan)}</strong>, dalam rangkap 2 (dua) asli, masing-masing dibubuhi meterai yang cukup sesuai ketentuan perundang-undangan yang berlaku, dan mempunyai kekuatan hukum pembuktian yang sama bagi PARA PIHAK.
            </p>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-16 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center font-serif text-[11pt]">
              <div className="flex flex-col h-40">
                  <p className="mb-2"><strong>PIHAK PERTAMA</strong></p>
                  <p className="text-[9pt] italic text-slate-500 mb-1">Meterai Rp 10.000,-</p>
                  <div className="mt-auto">
                     <p className="font-bold underline uppercase">{data.pihak1Nama}</p>
                  </div>
              </div>

              <div className="flex flex-col h-40">
                  <p className="mb-2"><strong>PIHAK KEDUA</strong></p>
                  <div className="mt-auto">
                     <p className="font-bold underline uppercase">{data.pihak2Nama}</p>
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

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Scale size={16} /> <span>Legal Drafter - Perjanjian Non-Bansos</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Legal Draft (Notaris) {templateId === 1 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset Data"><RotateCcw size={16}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:flex print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pihak Pertama (Pemberi Pernyataan)</h3>
                  <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Nama} onChange={e => handleDataChange('pihak1Nama', e.target.value)} placeholder="Nama Lengkap" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} placeholder="Nomor NIK" />
                  <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1TempatLahir} onChange={e => handleDataChange('pihak1TempatLahir', e.target.value)} placeholder="Tempat Lahir" />
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1TanggalLahir} onChange={e => handleDataChange('pihak1TanggalLahir', e.target.value)} />
                  </div>
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Pekerjaan} onChange={e => handleDataChange('pihak1Pekerjaan', e.target.value)} placeholder="Pekerjaan" />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihak1Alamat} onChange={e => handleDataChange('pihak1Alamat', e.target.value)} placeholder="Alamat Sesuai KTP" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pihak Kedua (Instansi/Pejabat)</h3>
                  <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Nama} onChange={e => handleDataChange('pihak2Nama', e.target.value)} placeholder="Nama Pejabat/Instansi" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} placeholder="NIP/NIK" />
                  <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2TempatLahir} onChange={e => handleDataChange('pihak2TempatLahir', e.target.value)} placeholder="Tempat Lahir" />
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2TanggalLahir} onChange={e => handleDataChange('pihak2TanggalLahir', e.target.value)} />
                  </div>
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Pekerjaan} onChange={e => handleDataChange('pihak2Pekerjaan', e.target.value)} placeholder="Jabatan/Pekerjaan" />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Alamat} onChange={e => handleDataChange('pihak2Alamat', e.target.value)} placeholder="Alamat Kedudukan Instansi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><Gavel size={12}/> Ketentuan Hukum & Deklarasi</h3>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kategori Bantuan</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none mt-1" value={data.kategoriBantuan} onChange={e => handleDataChange('kategoriBantuan', e.target.value)}>
                      <option value="Beasiswa Pendidikan Pemerintah">Beasiswa Pendidikan Pemerintah</option>
                      <option value="Beasiswa Pendidikan Swasta">Beasiswa Pendidikan Swasta</option>
                      <option value="Bantuan Sosial Tunai (BST)">Bantuan Sosial Tunai (BST)</option>
                      <option value="Program Keluarga Harapan (PKH)">Program Keluarga Harapan (PKH)</option>
                      <option value="Bantuan Keuangan Pihak Ketiga Lainnya">Bantuan Keuangan Pihak Ketiga Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pemeriksaan (Pasal 5)</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none mt-1" value={data.metodePemeriksaan} onChange={e => handleDataChange('metodePemeriksaan', e.target.value)}>
                      <option value="Verifikasi Silang Sistem Nasional">Verifikasi Silang Sistem Nasional</option>
                      <option value="Audit Internal Instansi">Audit Internal Instansi</option>
                      <option value="Survei Lapangan dan Konfirmasi Instansi Terkait">Survei Lapangan & Konfirmasi Instansi Terkait</option>
                      <option value="Penelusuran Rekam Jejak Pangkalan Data Terpadu">Penelusuran Rekam Jejak Database Terpadu</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sanksi Pelanggaran (Pasal 6)</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none mt-1" value={data.sanksiPelanggaran} onChange={e => handleDataChange('sanksiPelanggaran', e.target.value)}>
                      <option value="Pengembalian Dana Penuh 100% beserta Denda 50%">Pengembalian Dana 100% + Denda 50%</option>
                      <option value="Pengembalian Dana Secara Langsung Tunai 100%">Pengembalian Dana Tunai 100%</option>
                      <option value="Pembatalan Status Secara Sepihak dan Blacklist Nasional">Pembatalan Status & Blacklist Nasional</option>
                      <option value="Gugatan Hukum Pidana dan Perdata">Gugatan Hukum Pidana dan Perdata</option>
                    </select>
                  </div>

                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Instansi Tujuan</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none mt-1" value={data.instansiTujuan} onChange={e => handleDataChange('instansiTujuan', e.target.value)} placeholder="Contoh: Kementerian Pendidikan..." />
                  </div>

                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Periode Berlaku</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none mt-1" value={data.periodeBerlaku} onChange={e => handleDataChange('periodeBerlaku', e.target.value)} placeholder="Contoh: Tahun Akademik 2026/2027" />
                  </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Informasi Dokumen</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.kotaPembuatan} onChange={e => handleDataChange('kotaPembuatan', e.target.value)} placeholder="Kota" />
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalPembuatan} onChange={e => handleDataChange('tanggalPembuatan', e.target.value)} />
                  </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Non-Bansos" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
