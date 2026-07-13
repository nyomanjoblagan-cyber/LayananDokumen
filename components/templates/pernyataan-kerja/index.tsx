'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, ArrowLeftCircle, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PernyataanData {
  // Pihak Pertama (Perusahaan)
  party1Name: string;
  party1Nik: string;
  party1Pob: string;
  party1Dob: string;
  party1Occupation: string;
  party1Address: string;
  companyName: string;

  // Pihak Kedua (Karyawan)
  party2Name: string;
  party2Nik: string;
  party2Pob: string;
  party2Dob: string;
  party2Occupation: string;
  party2Address: string;

  // Data Pekerjaan
  position: string;
  contractDuration: string;
  penaltyAmount: string;

  // Dinamis Form / Opsi Klausul
  placementArea: string;
  penaltyMethod: string;

  // Penandatanganan
  city: string;
  date: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PernyataanData = {
  party1Name: 'Budi Santoso',
  party1Nik: '3171234567890001',
  party1Pob: 'Jakarta',
  party1Dob: '1980-05-20',
  party1Occupation: 'Direktur HRD',
  party1Address: 'Jl. Sudirman Kav 21, RT 001 RW 002, Kel. Karet, Kec. Setiabudi, Jakarta Selatan',
  companyName: 'PT Teknologi Inovasi Nusantara',

  party2Name: 'Ahmad Faisal',
  party2Nik: '3201123456780001',
  party2Pob: 'Bandung',
  party2Dob: '1995-08-15',
  party2Occupation: 'Karyawan Swasta',
  party2Address: 'Jl. Merdeka No. 45, RT 01 RW 02, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat',

  position: 'Software Engineer',
  contractDuration: '1 (Satu) Tahun',
  penaltyAmount: 'Rp 10.000.000 (Sepuluh Juta Rupiah)',
  
  placementArea: 'Seluruh Wilayah Indonesia',
  penaltyMethod: 'Pembayaran Tunai Sekaligus',

  city: 'Jakarta',
  date: '',
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PernyataanBuilder />
    </Suspense>
  );
}

function PernyataanBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PernyataanData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'klausul'>('pihak1');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PernyataanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-black leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto relative">
        <div className="flex flex-col h-full">
            <div className="text-center mb-8 pb-4 shrink-0">
              <h1 className="font-black text-xl uppercase tracking-widest underline leading-none mb-1">SURAT PERJANJIAN</h1>
              <h2 className="font-bold text-sm uppercase">KESANGGUPAN DAN IKATAN DINAS KERJA</h2>
            </div>

            <div className="flex-grow">
              <p className="mb-4 text-justify">
                Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
              </p>

              {/* PIHAK PERTAMA */}
              <div className="mb-4 pl-4">
                <div className="flex mb-1"><div className="w-6">I.</div><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.party1Name}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1">{data.party1Nik}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.party1Pob}, {formatDateSafe(data.party1Dob)}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Pekerjaan / Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.party1Occupation}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Alamat Lengkap (KTP)</div><div className="w-4">:</div><div className="flex-1">{data.party1Address}</div></div>
              </div>
              <p className="mb-6 text-justify pl-10">
                Dalam hal ini bertindak untuk dan atas nama <strong>{data.companyName}</strong>, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
              </p>

              {/* PIHAK KEDUA */}
              <div className="mb-4 pl-4">
                <div className="flex mb-1"><div className="w-6">II.</div><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.party2Name}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1">{data.party2Nik}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.party2Pob}, {formatDateSafe(data.party2Dob)}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.party2Occupation}</div></div>
                <div className="flex mb-1"><div className="w-6"></div><div className="w-48">Alamat Lengkap (KTP)</div><div className="w-4">:</div><div className="flex-1">{data.party2Address}</div></div>
              </div>
              <p className="mb-6 text-justify pl-10">
                Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
              </p>

              <p className="mb-6 text-justify">
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini sepakat untuk mengikatkan diri dalam Perjanjian Kesanggupan dan Ikatan Dinas Kerja (selanjutnya disebut "Perjanjian"), dengan syarat dan ketentuan sebagai berikut:
              </p>

              {/* PASAL 1 */}
              <div className="text-center font-bold mb-2">
                PASAL 1<br />DEFINISI DAN KETENTUAN UMUM
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li><strong>Perusahaan</strong> adalah {data.companyName} yang diwakili secara sah oleh PIHAK PERTAMA berdasarkan kewenangan yang dimilikinya.</li>
                <li><strong>Karyawan</strong> adalah PIHAK KEDUA yang telah sepakat untuk bekerja dan tunduk pada peraturan yang ditetapkan oleh PIHAK PERTAMA.</li>
                <li><strong>Ikatan Dinas</strong> adalah kewajiban mutlak PIHAK KEDUA untuk senantiasa mengabdi dan bekerja pada Perusahaan selama masa waktu yang telah ditentukan, tanpa hak untuk mengajukan pengunduran diri secara sepihak.</li>
              </ol>

              {/* PASAL 2 */}
              <div className="text-center font-bold mb-2">
                PASAL 2<br />RUANG LINGKUP DAN MASA KERJA
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>PIHAK KEDUA dengan ini menyatakan kesanggupan dan komitmen penuhnya untuk bekerja pada Perusahaan dengan posisi/jabatan sebagai <strong>{data.position}</strong>.</li>
                <li>Masa ikatan dinas dan kontrak kerja yang disepakati oleh PARA PIHAK adalah selama <strong>{data.contractDuration}</strong> yang mulai berlaku terhitung sejak ditandatanganinya Perjanjian ini atau sesuai dengan Surat Keputusan pengangkatan.</li>
              </ol>

              {/* PASAL 3 */}
              <div className="text-center font-bold mb-2">
                PASAL 3<br />KESEDIAAN PENEMPATAN KERJA
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>PIHAK KEDUA menyatakan bersedia secara mutlak untuk ditempatkan, ditugaskan, atau dipindahtugaskan di area penempatan: <strong>{data.placementArea}</strong>.</li>
                <li>Penempatan dan pindahtugas (mutasi) sebagaimana dimaksud pada Ayat 1 merupakan kewenangan penuh dari PIHAK PERTAMA dengan mempertimbangkan kebutuhan operasional Perusahaan semata.</li>
                <li>PIHAK KEDUA tidak berhak menolak instruksi penempatan dan/atau mutasi kerja. Penolakan atas instruksi ini akan dikategorikan sebagai tindakan indisipliner berat dan pelanggaran Perjanjian.</li>
              </ol>

              {/* PASAL 4 */}
              <div className="text-center font-bold mb-2">
                PASAL 4<br />HAK DAN KEWAJIBAN PARA PIHAK
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>
                  <strong>Kewajiban PIHAK KEDUA:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Melaksanakan tugas dan tanggung jawab sesuai dengan posisi, deskripsi pekerjaan, dan arahan PIHAK PERTAMA dengan penuh dedikasi.</li>
                    <li>Menjaga nama baik, kehormatan, dan integritas Perusahaan setiap saat, baik di dalam maupun di luar lingkungan kerja.</li>
                    <li>Mematuhi seluruh Peraturan Perusahaan, Standar Operasional Prosedur (SOP), dan kebijakan manajemen yang berlaku dan dapat diperbarui dari waktu ke waktu.</li>
                  </ul>
                </li>
                <li>
                  <strong>Hak PIHAK KEDUA:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Menerima upah, tunjangan, dan hak-hak finansial lainnya sebagaimana telah disepakati dalam Kontrak Kerja secara terpisah.</li>
                    <li>Mendapatkan perlindungan kerja sesuai dengan ketentuan perundang-undangan ketenagakerjaan yang berlaku di Republik Indonesia.</li>
                  </ul>
                </li>
              </ol>

              {/* PASAL 5 */}
              <div className="text-center font-bold mb-2 break-before-auto">
                PASAL 5<br />IKATAN DINAS DAN SANKSI PENALTI
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>Selama masa ikatan dinas sebagaimana diatur dalam Pasal 2 Perjanjian ini, PIHAK KEDUA <strong>dilarang</strong> mengundurkan diri secara sepihak (resign) dengan alasan apapun.</li>
                <li>Apabila PIHAK KEDUA mengundurkan diri sebelum masa kontrak/ikatan dinas berakhir, atau diputus hubungan kerjanya (PHK) oleh Perusahaan akibat pelanggaran berat yang dilakukan, maka PIHAK KEDUA wajib secara hukum untuk membayar denda penalti kepada PIHAK PERTAMA sebesar <strong>{data.penaltyAmount}</strong>.</li>
                <li>Metode penyelesaian atas kewajiban denda penalti tersebut wajib dilakukan oleh PIHAK KEDUA melalui metode: <strong>{data.penaltyMethod}</strong>.</li>
                <li>Penyelesaian sanksi penalti wajib diselesaikan selambat-lambatnya 7 (tujuh) hari kalender sejak tanggal pengajuan pengunduran diri atau diterbitkannya surat PHK oleh PIHAK PERTAMA.</li>
              </ol>

              {/* PASAL 6 */}
              <div className="text-center font-bold mb-2">
                PASAL 6<br />KERAHASIAAN INFORMASI (NON-DISCLOSURE)
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>PIHAK KEDUA wajib menjaga dan tidak membocorkan setiap data, informasi internal, strategi bisnis, daftar klien, informasi keuangan, maupun rahasia dagang milik Perusahaan kepada pihak ketiga manapun yang tidak berkepentingan.</li>
                <li>Kewajiban menjaga kerahasiaan ini mengikat secara mutlak dan tetap berlaku tanpa batas waktu, meskipun Perjanjian ini telah berakhir dan/atau PIHAK KEDUA tidak lagi berstatus sebagai karyawan di Perusahaan.</li>
              </ol>

              {/* PASAL 7 */}
              <div className="text-center font-bold mb-2">
                PASAL 7<br />KEADAAN MEMAKSA (FORCE MAJEURE)
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>Tidak ada satupun pihak yang dapat dimintakan pertanggungjawaban atas keterlambatan atau kegagalan pelaksanaan kewajiban dalam Perjanjian ini yang diakibatkan langsung oleh Keadaan Memaksa (Force Majeure).</li>
                <li>Yang dimaksud Force Majeure meliputi namun tidak terbatas pada bencana alam, huru-hara, perang, pemberontakan, epidemi, pandemi berskala nasional, serta kebijakan/peraturan pemerintah yang secara langsung dan signifikan menghalangi pelaksanaan Perjanjian.</li>
              </ol>

              {/* PASAL 8 */}
              <div className="text-center font-bold mb-2">
                PASAL 8<br />PENYELESAIAN SENGKETA
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-6 text-justify">
                <li>Segala perselisihan atau perbedaan pendapat yang timbul sebagai akibat dari pelaksanaan atau penafsiran Perjanjian ini akan diselesaikan secara musyawarah untuk mufakat antara PARA PIHAK.</li>
                <li>Apabila musyawarah tidak mencapai kesepakatan dalam waktu 30 (tiga puluh) hari kalender, PARA PIHAK sepakat untuk menyelesaikan perselisihan tersebut melalui kepaniteraan Pengadilan Negeri sesuai dengan domisili hukum PIHAK PERTAMA.</li>
              </ol>

              {/* PASAL 9 */}
              <div className="text-center font-bold mb-2">
                PASAL 9<br />PENUTUP
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-10 text-justify">
                <li>Perjanjian ini dibuat, disetujui, dan ditandatangani di {data.city} pada tanggal {formatDateSafe(data.date)}, dibuat dalam rangkap 2 (dua) yang masing-masing bermeterai cukup (Meterai Rp10.000) dan memiliki kekuatan hukum yang sama dan mengikat bagi PARA PIHAK.</li>
                <li>Hal-hal yang belum atau belum cukup diatur dalam Perjanjian ini akan ditetapkan kemudian berdasarkan kesepakatan tertulis PARA PIHAK, yang merupakan satu kesatuan dan bagian tidak terpisahkan dari Perjanjian ini (Adendum).</li>
              </ol>
            </div>

            <div className="flex justify-between text-center mt-12 mb-8 break-inside-avoid">
              <div className="w-1/2 flex flex-col items-center">
                  <p className="mb-2">PIHAK PERTAMA,</p>
                  <p className="mb-2 font-bold">{data.companyName}</p>
                  <div className="h-24 flex flex-col justify-end items-center relative w-full">
                    <p className="font-bold underline uppercase relative z-10">{data.party1Name}</p>
                    <p className="text-sm">{data.party1Occupation}</p>
                  </div>
              </div>
              
              <div className="w-1/2 flex flex-col items-center">
                  <p className="mb-2">PIHAK KEDUA,</p>
                  <p className="mb-2 font-bold">Karyawan</p>
                  <div className="h-24 flex flex-col justify-end items-center relative w-full">
                    <div className="border border-slate-300 w-20 h-12 mb-[-1.5rem] flex items-center justify-center text-[8px] text-slate-400 italic uppercase z-0 bg-white ml-8">Meterai 10.000</div>
                    <p className="font-bold underline uppercase relative z-10">{data.party2Name}</p>
                    <p className="text-sm">Yang Menyatakan</p>
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Briefcase size={16} className="text-blue-500" /> <span>Pernyataan & Ikatan Dinas</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1 (Perusahaan)</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2 (Karyawan)</button>
              <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 ${activeTab === 'klausul' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul & Info</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Perwakilan Perusahaan</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="PT / CV..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Wakil Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.party1Name} onChange={e => handleDataChange('party1Name', e.target.value)} placeholder="Nama Direktur/HRD" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / No. Identitas</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.party1Nik} onChange={e => handleDataChange('party1Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party1Pob} onChange={e => handleDataChange('party1Pob', e.target.value)} placeholder="Kota" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party1Dob} onChange={e => handleDataChange('party1Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan / Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party1Occupation} onChange={e => handleDataChange('party1Occupation', e.target.value)} placeholder="Misal: Direktur Utama" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16 resize-none" value={data.party1Address} onChange={e => handleDataChange('party1Address', e.target.value)} placeholder="Jalan, RT/RW..." />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Identitas Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap (Sesuai KTP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.party2Name} onChange={e => handleDataChange('party2Name', e.target.value)} placeholder="Nama Lengkap" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.party2Nik} onChange={e => handleDataChange('party2Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party2Pob} onChange={e => handleDataChange('party2Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party2Dob} onChange={e => handleDataChange('party2Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.party2Occupation} onChange={e => handleDataChange('party2Occupation', e.target.value)} placeholder="Karyawan Swasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16 resize-none" value={data.party2Address} onChange={e => handleDataChange('party2Address', e.target.value)} placeholder="Jalan, RT/RW, Kel, Kec..." />
                </div>
              </div>
              )}

              {activeTab === 'klausul' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Pengaturan Klausul Perjanjian</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Posisi / Jabatan yang Diberikan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Misal: Software Engineer" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kontrak / Ikatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Misal: 1 (Satu) Tahun" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nilai Penalti Resign</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} placeholder="Misal: Rp 10.000.000" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Cakupan Wilayah Penempatan Kerja</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white"
                    value={data.placementArea}
                    onChange={e => handleDataChange('placementArea', e.target.value)}
                  >
                    <option value="Seluruh Wilayah Indonesia">Seluruh Wilayah Indonesia (Nasional)</option>
                    <option value="Pulau Jawa & Bali">Pulau Jawa & Bali</option>
                    <option value="Area Jabodetabek">Area Jabodetabek</option>
                    <option value="Sesuai Domisili KTP">Sesuai Domisili KTP</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pembayaran Sanksi Penalti</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white"
                    value={data.penaltyMethod}
                    onChange={e => handleDataChange('penaltyMethod', e.target.value)}
                  >
                    <option value="Pembayaran Tunai Sekaligus">Pembayaran Tunai Sekaligus</option>
                    <option value="Pemotongan Gaji / Hak-hak Finansial Akhir">Pemotongan Gaji / Hak-hak Finansial Akhir</option>
                    <option value="Cicilan Maksimal 3 Bulan Berturut-turut">Cicilan Maksimal 3 Bulan Berturut-turut</option>
                  </select>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-xs font-black uppercase text-slate-600 mb-2">Penandatanganan</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Misal: Jakarta" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                  </div>
                </div>

              </div>
              )}

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
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
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10 mt-10 md:mt-0">
         <PrintWrapper documentName="Surat_Perjanjian_Kesanggupan_Kerja" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
