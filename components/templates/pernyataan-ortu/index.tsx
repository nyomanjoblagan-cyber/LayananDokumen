'use client';

/**
 * FILE: PernyataanOrtuPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE LEGAL DRAFTING)
 * DESC: Generator Surat Pernyataan / Izin Orang Tua & Pelepasan Tuntutan (Indemnifikasi)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Users, GraduationCap, Tent, Briefcase, FileWarning, 
  ChevronDown, Check, Edit3, Eye, FileText, RotateCcw, ArrowLeftCircle,
  ShieldAlert, Activity, MapPin, Calendar, HeartPulse
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ParentData {
  city: string;
  date: string;
  
  // Pihak Pertama (Orang Tua / Wali)
  parentName: string;
  parentNik: string;
  parentBirthPlace: string;
  parentBirthDate: string;
  parentJob: string;
  parentAddress: string;
  parentRelation: string; 

  // Pihak Kedua (Anak)
  childName: string;
  childNik: string; 
  childBirthPlace: string;
  childBirthDate: string;
  childInstitution: string;
  childAddress: string;
  
  // Detail Kegiatan
  activityName: string;
  activityLocation: string;
  activityStartDate: string;
  activityEndDate: string;
  activityOrganizer: string;
  
  // Opsi Tanggungan
  medicalCoverage: string; 
  riskAcknowledgment: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ParentData = {
  city: 'JAKARTA',
  date: '', 
  
  parentName: 'BAMBANG SUGIONO',
  parentNik: '3171234567890001',
  parentBirthPlace: 'Surabaya',
  parentBirthDate: '1975-08-17',
  parentJob: 'Wiraswasta',
  parentAddress: 'Jl. Merdeka Raya No. 45, RT 001 RW 002, Kel. Kebayoran, Kec. Kebayoran Baru, Jakarta Selatan',
  parentRelation: 'Ayah Kandung',
  
  childName: 'ADITYA PRATAMA',
  childNik: '3171234567890002',
  childBirthPlace: 'Jakarta',
  childBirthDate: '2008-05-12',
  childInstitution: 'SMA NEGERI 1 JAKARTA',
  childAddress: 'Jl. Merdeka Raya No. 45, RT 001 RW 002, Kel. Kebayoran, Kec. Kebayoran Baru, Jakarta Selatan',
  
  activityName: 'Ekspedisi Pendakian Gunung Gede Pangrango',
  activityLocation: 'Taman Nasional Gunung Gede Pangrango, Jawa Barat',
  activityStartDate: '2026-08-15',
  activityEndDate: '2026-08-17',
  activityOrganizer: 'Klub Pecinta Alam SMA NEGERI 1 JAKARTA',
  
  medicalCoverage: 'Biaya Pribadi secara Mandiri',
  riskAcknowledgment: 'Sepenuhnya'
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <ParentStatementBuilder />
    </Suspense>
  );
}

function ParentStatementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ParentData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ParentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'tour' | 'magang' | 'ekstrem') => {
    if (type === 'tour') {
      setData(prev => ({
        ...prev,
        activityName: 'Kunjungan Industri / Study Tour',
        activityLocation: 'Bali dan Sekitarnya',
        activityOrganizer: 'Panitia Study Tour SMA NEGERI 1 JAKARTA',
        medicalCoverage: 'Fasilitas Asuransi Perjalanan / Sekolah',
      }));
    } else if (type === 'magang') {
      setData(prev => ({
        ...prev,
        activityName: 'Praktik Kerja Lapangan (PKL) / Magang Industri',
        activityLocation: 'PT. Teknologi Masa Depan, Jakarta',
        activityOrganizer: 'Kurikulum SMK Negeri 1 Jakarta',
        medicalCoverage: 'Fasilitas Kesehatan Perusahaan & Pribadi',
      }));
    } else if (type === 'ekstrem') {
      setData(prev => ({
        ...prev,
        activityName: 'Ekspedisi Pendakian Gunung Gede Pangrango',
        activityLocation: 'Taman Nasional Gunung Gede Pangrango, Jawa Barat',
        activityOrganizer: 'Klub Pecinta Alam SMA NEGERI 1 JAKARTA',
        medicalCoverage: 'Biaya Pribadi secara Mandiri',
      }));
    }
  };

  const activeTemplateName = templateId === 1 ? 'Indemnifikasi Penuh' : 'Persetujuan Standar';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-black leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        <div className="text-center mb-8 shrink-0">
          <h1 className="font-bold text-lg uppercase tracking-wider underline underline-offset-4 mb-1">
            SURAT PERNYATAAN IZIN DAN PELEPASAN TUNTUTAN HUKUM
          </h1>
          <p className="font-bold text-[10pt] uppercase">(INDEMNIFICATION AND RELEASE OF LIABILITY AGREEMENT)</p>
        </div>

        <div className="flex-grow text-justify space-y-6">
          <p className="indent-8">
            Yang bertanda tangan di bawah ini, selanjutnya dalam kesepakatan ini disebut sebagai <strong>PIHAK PERTAMA</strong>:
          </p>

          <div className="pl-8 space-y-1">
            <div className="flex">
              <div className="w-56 flex-shrink-0">Nama Lengkap</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div className="font-bold uppercase">{data.parentName}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Nomor Induk Kependudukan (NIK)</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.parentNik}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Tempat, Tanggal Lahir</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.parentBirthPlace}, {formatDateSafe(data.parentBirthDate)}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Pekerjaan</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.parentJob}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Hubungan Kekeluargaan</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.parentRelation}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Alamat Lengkap KTP</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div className="leading-tight">{data.parentAddress}</div>
            </div>
          </div>

          <p className="indent-8">
            Bertindak untuk dan atas nama diri sendiri serta selaku perwakilan hukum yang sah dari pihak di bawah ini, yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>:
          </p>

          <div className="pl-8 space-y-1">
            <div className="flex">
              <div className="w-56 flex-shrink-0">Nama Lengkap</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div className="font-bold uppercase">{data.childName}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Nomor Induk Kependudukan / NIS</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.childNik}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Tempat, Tanggal Lahir</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div>{data.childBirthPlace}, {formatDateSafe(data.childBirthDate)}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Institusi / Sekolah</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div className="font-bold">{data.childInstitution}</div>
            </div>
            <div className="flex">
              <div className="w-56 flex-shrink-0">Alamat Lengkap KTP</div>
              <div className="w-4 flex-shrink-0">:</div>
              <div className="leading-tight">{data.childAddress}</div>
            </div>
          </div>

          <p className="indent-8">
            Dengan ini, PIHAK PERTAMA menyatakan dengan sesungguhnya, tanpa adanya paksaan maupun tekanan dari pihak manapun, mengikatkan diri pada ketentuan-ketentuan yang dijabarkan dalam Pasal-Pasal berikut ini:
          </p>

          {/* PASAL 1 */}
          <div className="space-y-2 mt-6">
            <div className="text-center font-bold">
              PASAL 1<br/>
              PEMBERIAN IZIN DAN OBJEK KEGIATAN
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                PIHAK PERTAMA memberikan izin sepenuhnya kepada PIHAK KEDUA untuk mengikuti seluruh rangkaian kegiatan <strong>"{data.activityName}"</strong> yang berlokasi di <strong>{data.activityLocation}</strong>.
              </li>
              <li className="pl-2">
                Kegiatan sebagaimana dimaksud pada Ayat 1 di atas, diselenggarakan dan dipandu oleh <strong>{data.activityOrganizer}</strong> (selanjutnya disebut "Penyelenggara Kegiatan"), yang direncanakan berlangsung mulai tanggal {formatDateSafe(data.activityStartDate)} hingga {formatDateSafe(data.activityEndDate)}.
              </li>
              <li className="pl-2">
                PIHAK PERTAMA menyatakan telah memahami sepenuhnya esensi, bentuk, sifat, dan jadwal kegiatan operasional yang akan dilaksanakan.
              </li>
            </ol>
          </div>

          {/* PASAL 2 */}
          <div className="space-y-2 mt-4 break-inside-avoid">
            <div className="text-center font-bold">
              PASAL 2<br/>
              PENGAKUAN RISIKO (ASSUMPTION OF RISK)
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                PIHAK PERTAMA menyadari dan mengakui sepenuhnya bahwa Kegiatan tersebut merupakan aktivitas yang memiliki risiko bawaan (<em>inherent risk</em>) tinggi, termasuk namun tidak terbatas pada bahaya alam, kelalaian pihak ketiga, serta kondisi lingkungan ekstrem.
              </li>
              <li className="pl-2">
                PIHAK PERTAMA menerima dengan penuh kesadaran bahwa partisipasi PIHAK KEDUA dapat menimbulkan berbagai kemungkinan risiko fisik, cedera ringan maupun berat, kehilangan barang berharga, kelumpuhan, trauma psikologis, hingga hilangnya nyawa.
              </li>
              <li className="pl-2">
                PIHAK PERTAMA menjamin bahwa PIHAK KEDUA dalam kondisi sehat jasmani, rohani, dan tidak sedang menderita penyakit medis yang dapat membahayakan dirinya maupun pihak lain, serta telah menyampaikan seluruh riwayat medis secara transparan kepada Penyelenggara Kegiatan.
              </li>
            </ol>
          </div>

          {/* PASAL 3 */}
          <div className="space-y-2 mt-4 break-inside-avoid">
            <div className="text-center font-bold">
              PASAL 3<br/>
              PELEPASAN TUNTUTAN HUKUM (RELEASE OF LIABILITY)
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                Sebagai konsekuensi dari pemberian izin dan pengakuan risiko pada Pasal 1 dan Pasal 2, PIHAK PERTAMA secara sukarela, mengikat, dan permanen <strong>MELEPASKAN, MEMBEBASKAN, SERTA TIDAK AKAN MENUNTUT</strong> Penyelenggara Kegiatan, institusi sekolah, kepanitiaan, relawan, afiliasi, dan pemilik lokasi (selanjutnya disebut "Pihak yang Dilepaskan").
              </li>
              <li className="pl-2">
                Pelepasan tuntutan hukum ini mencakup setiap gugatan perdata, pelaporan pidana, klaim asuransi, serta permintaan ganti rugi materiel maupun imateriel yang timbul akibat kecelakaan, kerugian harta benda, cacat tetap, atau kematian yang menimpa PIHAK KEDUA selama partisipasinya dalam Kegiatan tersebut.
              </li>
              <li className="pl-2">
                Pelepasan tuntutan ini berlaku mutlak, kecuali terbukti secara sah berdasarkan Putusan Pengadilan yang berkekuatan hukum tetap (<em>inkracht van gewijsde</em>) bahwa insiden tersebut murni diakibatkan oleh unsur kesengajaan penuh (<em>willful misconduct</em>) dari Penyelenggara Kegiatan.
              </li>
            </ol>
          </div>

          {/* PASAL 4 */}
          <div className="space-y-2 mt-4 break-inside-avoid">
            <div className="text-center font-bold">
              PASAL 4<br/>
              TANGGUNG JAWAB MEDIS DAN KEADAAN DARURAT
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                Dalam hal terjadinya kondisi darurat, insiden medis, atau kecelakaan sewaktu-waktu selama pelaksanaan Kegiatan, PIHAK PERTAMA memberikan kuasa mutlak (<em>informed consent</em>) kepada Penyelenggara Kegiatan untuk mengambil tindakan penyelamatan dan merujuk PIHAK KEDUA ke fasilitas kesehatan (Puskesmas, Klinik, atau Rumah Sakit) terdekat.
              </li>
              <li className="pl-2">
                Segala bentuk pembiayaan yang timbul dari tindakan evakuasi, perawatan medis, rawat inap, tindakan operasi bedah, hingga pemulihan akibat insiden tersebut sepenuhnya merupakan tanggung jawab finansial PIHAK PERTAMA yang akan diselesaikan melalui mekanisme <strong>{data.medicalCoverage}</strong>.
              </li>
            </ol>
          </div>

          {/* PASAL 5 */}
          <div className="space-y-2 mt-4 break-inside-avoid">
            <div className="text-center font-bold">
              PASAL 5<br/>
              KEADAAN MEMAKSA (FORCE MAJEURE)
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                Pihak yang Dilepaskan tidak akan dimintai pertanggungjawaban hukum maupun kerugian finansial apa pun apabila terjadi kegagalan pelaksanaan kegiatan, penundaan, atau kecelakaan yang diakibatkan oleh Keadaan Memaksa (<em>Force Majeure</em>).
              </li>
              <li className="pl-2">
                Keadaan Memaksa meliputi namun tidak terbatas pada: bencana alam (gempa bumi, banjir, tanah longsor, letusan gunung berapi), perubahan cuaca ekstrem mendadak, epidemik, huru-hara, perang, terorisme, sabotase, dan/atau perubahan kebijakan atau peraturan dari instansi pemerintah yang berwenang (seperti penutupan jalur pendakian).
              </li>
            </ol>
          </div>

          {/* PASAL 6 */}
          <div className="space-y-2 mt-4 break-inside-avoid">
            <div className="text-center font-bold">
              PASAL 6<br/>
              KETENTUAN PENUTUP DAN PILIHAN HUKUM
            </div>
            <ol className="list-decimal pl-6 space-y-1 text-justify">
              <li className="pl-2">
                Apabila di kemudian hari terdapat satu atau lebih ketentuan dalam Surat Pernyataan ini yang dinyatakan tidak sah, batal demi hukum, atau tidak dapat dilaksanakan berdasarkan peraturan perundang-undangan, maka ketentuan lainnya akan tetap berlaku mengikat secara penuh.
              </li>
              <li className="pl-2">
                Setiap perselisihan, sengketa, atau perbedaan pendapat yang timbul dari penafsiran maupun pelaksanaan Surat Pernyataan ini akan diselesaikan secara damai melalui musyawarah untuk mufakat dalam asas kekeluargaan.
              </li>
              <li className="pl-2">
                Surat Pernyataan ini tunduk pada ketentuan hukum perdata Negara Kesatuan Republik Indonesia, termasuk namun tidak terbatas pada asas kebebasan berkontrak sebagaimana diatur dalam Pasal 1338 Kitab Undang-Undang Hukum Perdata.
              </li>
            </ol>
          </div>

          <p className="indent-8 mt-6">
            Demikian Surat Pernyataan, Izin, dan Pelepasan Tuntutan Hukum ini dibuat dan ditandatangani oleh PIHAK PERTAMA di bawah meterai yang cukup, dalam keadaan sehat, sadar pikiran, dan tanpa unsur paksaan dari pihak mana pun, untuk dipergunakan sebagaimana mestinya.
          </p>

        </div>

        {/* TANDA TANGAN */}
        <div className="mt-12 shrink-0 break-inside-avoid w-full" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-between items-end">
            <div className="text-center w-64">
              <p className="mb-2">Mengetahui dan Menyetujui,</p>
              <p className="font-bold">PIHAK KEDUA</p>
              <div className="h-24"></div>
              <p className="font-bold underline">{data.childName}</p>
            </div>
            
            <div className="text-center w-64">
              <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
              <p className="font-bold mb-4">PIHAK PERTAMA</p>
              
              <div className="border border-slate-400 w-24 h-12 mx-auto mb-[-2rem] flex flex-col items-center justify-center text-[7px] text-slate-500 italic uppercase bg-slate-50 print:bg-white z-0 relative">
                <span>Meterai</span>
                <span className="font-bold">Rp10.000,-</span>
              </div>
              
              <p className="font-bold underline uppercase relative z-10">{data.parentName}</p>
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
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldAlert size={16} className="text-red-500" /> <span>Legal Drafting: Indemnification Agreement</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen Legal</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Form Legal Data</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('tour')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors"><Tent size={12}/> STUDY TOUR</button>
                <button onClick={() => applyPreset('magang')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors"><Briefcase size={12}/> PKL / MAGANG</button>
                <button onClick={() => applyPreset('ekstrem')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors"><ShieldAlert size={12} className="text-red-500" /> RESIKO TINGGI</button>
              </div>

              {/* DATA PIHAK PERTAMA */}
              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Pertama (Orang Tua / Wali)</h3>
                 
                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                       <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentBirthPlace} onChange={e => handleDataChange('parentBirthPlace', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentBirthDate} onChange={e => handleDataChange('parentBirthDate', e.target.value)} />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Hubungan Kekeluargaan (Cth: Ayah Kandung)</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentRelation} onChange={e => handleDataChange('parentRelation', e.target.value)} />
                    </div>
                 </div>

                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} />
                 </div>
              </div>

              {/* DATA PIHAK KEDUA */}
              <div className="border-t pt-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Pihak Kedua (Anak)</h3>
                 
                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Anak</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} />
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">NIK / NISN / NIM</label>
                       <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childNik} onChange={e => handleDataChange('childNik', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Institusi / Sekolah</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childInstitution} onChange={e => handleDataChange('childInstitution', e.target.value)} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childBirthPlace} onChange={e => handleDataChange('childBirthPlace', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childBirthDate} onChange={e => handleDataChange('childBirthDate', e.target.value)} />
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Alamat Domisili Anak</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-12 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childAddress} onChange={e => handleDataChange('childAddress', e.target.value)} />
                 </div>
              </div>

              {/* DETAIL KEGIATAN */}
              <div className="border-t pt-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Activity size={12}/> Detail Kegiatan & Risiko</h3>
                 
                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Nama Kegiatan / Agenda</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityName} onChange={e => handleDataChange('activityName', e.target.value)} />
                 </div>

                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Lokasi / Destinasi Utama</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityLocation} onChange={e => handleDataChange('activityLocation', e.target.value)} />
                 </div>

                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Penyelenggara / Panitia</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityOrganizer} onChange={e => handleDataChange('activityOrganizer', e.target.value)} />
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityStartDate} onChange={e => handleDataChange('activityStartDate', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.activityEndDate} onChange={e => handleDataChange('activityEndDate', e.target.value)} />
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggungan Biaya Darurat / Medis (Pasal 4)</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none bg-white" value={data.medicalCoverage} onChange={e => handleDataChange('medicalCoverage', e.target.value)}>
                        <option value="Biaya Pribadi secara Mandiri">Biaya Pribadi secara Mandiri</option>
                        <option value="Fasilitas Asuransi Kesehatan Pribadi">Fasilitas Asuransi Kesehatan Pribadi (BPJS/Swasta)</option>
                        <option value="Fasilitas Asuransi Perjalanan / Sekolah">Fasilitas Asuransi dari Pihak Penyelenggara</option>
                    </select>
                 </div>
              </div>

              {/* TTD SETUP */}
              <div className="border-t pt-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Pengesahan Dokumen</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                       <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-500 uppercase">Tanggal TTD</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
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
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>FORM DATA</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW DOKUMEN</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Indemnification Agreement" price={30000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
