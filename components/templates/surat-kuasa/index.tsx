'use client';

/**
 * FILE: SuratKuasaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Kuasa (Power of Attorney) Multi-Purpose Enterprise Grade
 * FIX: Enterprise legal drafting standard with 6 Articles, no CSS grid in text
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, RotateCcw,
  User, UserCheck, FileText, Scroll, Car, GraduationCap, Banknote, 
  ChevronDown, Check, Edit3, Eye, ArrowLeftCircle, Briefcase, Calendar, Scale, Settings
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KuasaData {
  city: string;
  date: string;
  
  pemberiName: string;
  pemberiNik: string;
  pemberiTempatLahir: string;
  pemberiTglLahir: string;
  pemberiJob: string;
  pemberiAddress: string;

  penerimaName: string;
  penerimaNik: string;
  penerimaTempatLahir: string;
  penerimaTglLahir: string;
  penerimaJob: string;
  penerimaAddress: string;

  jenisKuasa: 'UMUM' | 'KHUSUS';
  purposeTitle: string;
  purposeDetail: string;
  
  hakSubstitusi: 'Dengan Hak Substitusi' | 'Tanpa Hak Substitusi';
  masaBerlaku: string;
  penyelesaianSengketa: string;
}

// --- 2. GLOBAL CONSTANTS ---
const TEMPLATES = [
  { id: 1, name: "Format Klasik Notariil", desc: "Layout standar dokumen hukum" },
  { id: 2, name: "Format Modern Korporat", desc: "Layout dengan font sans-serif" }
];

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: KuasaData = {
  city: 'Jakarta',
  date: '',
  
  pemberiName: 'BUDI SANTOSO',
  pemberiNik: '3171010101800001',
  pemberiTempatLahir: 'Jakarta',
  pemberiTglLahir: '1980-01-01',
  pemberiJob: 'Wiraswasta',
  pemberiAddress: 'Jl. Merdeka No. 45, Kel. Gambir, Kec. Gambir, Jakarta Pusat',
  
  penerimaName: 'ANDI SAPUTRA',
  penerimaNik: '3201010101950002',
  penerimaTempatLahir: 'Bekasi',
  penerimaTglLahir: '1995-02-15',
  penerimaJob: 'Karyawan Swasta',
  penerimaAddress: 'Jl. Kemenangan No. 10, Kel. Margahayu, Kec. Bekasi Timur, Bekasi',
  
  jenisKuasa: 'KHUSUS',
  purposeTitle: 'PENGAMBILAN BPKB KENDARAAN BERMOTOR',
  purposeDetail: 'Mengambil Buku Pemilik Kendaraan Bermotor (BPKB) pada instansi terkait dengan rincian:\n- Merk/Type: Honda Vario 125\n- No. Polisi: B 1234 XXX\n- No. Rangka: MH1JM123456789\n- Atas Nama: Budi Santoso',
  
  hakSubstitusi: 'Tanpa Hak Substitusi',
  masaBerlaku: 'Hingga tugas/wewenang tersebut selesai dilaksanakan',
  penyelesaianSengketa: 'Musyawarah untuk mufakat dan Pengadilan Negeri setempat',
};

export default function SuratKuasaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Kuasa...</div>}>
      <KuasaToolBuilder />
    </Suspense>
  );
}

function KuasaToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KuasaData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof KuasaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'bpkb' | 'ijazah' | 'gaji' | 'umum') => {
    let title = '';
    let detail = '';
    if (type === 'bpkb') {
      title = 'PENGAMBILAN BPKB KENDARAAN';
      detail = 'Mengambil Buku Pemilik Kendaraan Bermotor (BPKB) di SAMSAT/Leasing [...] dengan rincian:\nMerk : ...\nNo. Polisi : ...\nNo. Rangka : ...\nAtas Nama : ...';
    } else if (type === 'ijazah') {
      title = 'PENGAMBILAN IJAZAH';
      detail = 'Mengambil Ijazah Asli dan Transkrip Nilai pada:\nInstansi : ...\nJurusan : ...\nLulus Tahun : ...\nNomor Ijazah : ...';
    } else if (type === 'gaji') {
      title = 'PENGAMBILAN DANA / GAJI';
      detail = 'Mengambil uang gaji/pensiun bulan [...] pada:\nBank/Kantor : ...\nJumlah : Rp ...\nNomor Rekening : ...';
    } else {
      title = 'PENGAMBILAN DOKUMEN';
      detail = 'Mengambil dokumen berupa [...] yang berada di [...] dengan nomor referensi [...].';
    }
    setData(prev => ({ ...prev, purposeTitle: title, purposeDetail: detail }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        <div className={`text-center mb-8 shrink-0 ${templateId === 1 ? 'border-b-4 border-double border-slate-900 pb-4' : 'border-b-2 border-slate-100 pb-4 print:border-black'}`}>
          <h1 className="text-2xl font-black underline uppercase tracking-[0.2em] leading-none text-slate-900">
            SURAT KUASA {data.jenisKuasa}
          </h1>
        </div>

        <div className="space-y-4 flex-grow text-justify leading-relaxed">
          <p>Yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-6 space-y-1 mt-2">
             <div className="flex">
                <div className="w-[180px] shrink-0">Nama Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div className="uppercase font-bold">{data.pemberiName}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">NIK / No. KTP</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.pemberiNik}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">Tempat, Tgl Lahir</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.pemberiTempatLahir}, {formatDateSafe(data.pemberiTglLahir)}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">Pekerjaan</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.pemberiJob}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0 align-top">Alamat Domisili</div>
                <div className="w-4 shrink-0 align-top">:</div>
                <div className="align-top">{data.pemberiAddress}</div>
             </div>
          </div>
          
          <p className="mt-2">Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang untuk selanjutnya disebut sebagai <strong>PIHAK PERTAMA (PEMBERI KUASA)</strong>.</p>
          
          <p className="mt-4">Dengan ini menerangkan memberikan kuasa penuh kepada:</p>

          <div className="ml-6 space-y-1 mt-2">
             <div className="flex">
                <div className="w-[180px] shrink-0">Nama Lengkap</div>
                <div className="w-4 shrink-0">:</div>
                <div className="uppercase font-bold">{data.penerimaName}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">NIK / No. KTP</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.penerimaNik}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">Tempat, Tgl Lahir</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.penerimaTempatLahir}, {formatDateSafe(data.penerimaTglLahir)}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0">Pekerjaan</div>
                <div className="w-4 shrink-0">:</div>
                <div>{data.penerimaJob}</div>
             </div>
             <div className="flex">
                <div className="w-[180px] shrink-0 align-top">Alamat Domisili</div>
                <div className="w-4 shrink-0 align-top">:</div>
                <div className="align-top">{data.penerimaAddress}</div>
             </div>
          </div>
          
          <p className="mt-2">Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang untuk selanjutnya disebut sebagai <strong>PIHAK KEDUA (PENERIMA KUASA)</strong>.</p>
          
          <p className="text-center font-bold uppercase mt-6 mb-2 tracking-widest text-[10pt]">-------------------------------------------- M E N E R A N G K A N --------------------------------------------</p>
          <p>Bahwa PIHAK PERTAMA dengan ini memberikan kuasa penuh kepada PIHAK KEDUA dengan syarat-syarat dan ketentuan-ketentuan yang diatur dalam pasal-pasal sebagai berikut:</p>

          <div className="mt-6 space-y-4">
             {/* PASAL 1 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center">PASAL 1<br/>PEMBERIAN KUASA DAN RUANG LINGKUP</p>
                <div className="mt-2 text-justify">
                   <p className="mb-1">(1) PIHAK PERTAMA dengan ini memberikan wewenang kepada PIHAK KEDUA untuk bertindak untuk dan atas nama PIHAK PERTAMA dalam hal pelaksanaan <strong>{data.purposeTitle}</strong>.</p>
                   <p className="mb-1">(2) Adapun ruang lingkup pelaksanaan kuasa yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA meliputi tindakan-tindakan sebagai berikut:</p>
                   <div className="ml-6 mt-1 whitespace-pre-wrap mb-1">
                      {data.purposeDetail.split('\n').map((line, idx) => (
                         <p key={idx}>{line}</p>
                      ))}
                   </div>
                </div>
             </div>

             {/* PASAL 2 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center mt-4">PASAL 2<br/>WEWENANG PIHAK KEDUA</p>
                <div className="mt-2 text-justify">
                   <p className="mb-1">Dalam menjalankan kuasa sebagaimana dimaksud pada Pasal 1, PIHAK KEDUA diberi wewenang penuh untuk:</p>
                   <ol className="list-[lower-alpha] ml-10 mt-1 space-y-1">
                      <li className="pl-2">Menghadap para pejabat, instansi pemerintah, instansi swasta, maupun pihak terkait lainnya yang berhubungan dengan objek Surat Kuasa ini;</li>
                      <li className="pl-2">Membuat, menandatangani, serta menyerahkan segala bentuk dokumen, permohonan, pernyataan, kuitansi, maupun tanda terima yang diperlukan;</li>
                      <li className="pl-2">Melakukan segala tindakan hukum lainnya yang dianggap perlu dan bermanfaat demi tercapainya maksud dan tujuan pemberian Surat Kuasa ini, tanpa ada yang dikecualikan selama tidak bertentangan dengan hukum yang berlaku.</li>
                   </ol>
                </div>
             </div>

             {/* PASAL 3 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center mt-4">PASAL 3<br/>HAK SUBSTITUSI</p>
                <div className="mt-2 text-justify">
                   <p>Surat Kuasa ini diberikan secara tegas <strong>{data.hakSubstitusi}</strong> kepada pihak ketiga mana pun tanpa pengecualian.</p>
                </div>
             </div>

             {/* PASAL 4 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center mt-4">PASAL 4<br/>MASA BERLAKU</p>
                <div className="mt-2 text-justify">
                   <p>Surat Kuasa ini berlaku terhitung sejak tanggal ditandatanganinya dokumen ini oleh kedua belah pihak dan akan terus berlaku <strong>{data.masaBerlaku}</strong>, atau sampai dicabut kembali secara tertulis oleh PIHAK PERTAMA.</p>
                </div>
             </div>

             {/* PASAL 5 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center mt-4">PASAL 5<br/>PERTANGGUNGJAWABAN DAN PEMBEBASAN</p>
                <div className="mt-2 text-justify">
                   <p className="mb-1">(1) PIHAK KEDUA wajib senantiasa memberikan laporan atas segala tindakan dan/atau perbuatan yang telah dilakukannya berdasarkan Surat Kuasa ini kepada PIHAK PERTAMA apabila diminta.</p>
                   <p className="mb-1">(2) PIHAK PERTAMA dengan ini melepaskan dan membebaskan PIHAK KEDUA dari segala tuntutan, gugatan, kerugian, maupun klaim dari pihak mana pun, asalkan PIHAK KEDUA menjalankan wewenangnya dengan itikad baik dan sesuai dengan ruang lingkup yang diatur di dalam Surat Kuasa ini.</p>
                </div>
             </div>

             {/* PASAL 6 */}
             <div className="break-inside-avoid">
                <p className="font-bold text-center mt-4">PASAL 6<br/>PENYELESAIAN SENGKETA</p>
                <div className="mt-2 text-justify">
                   <p>Apabila di kemudian hari timbul perbedaan pendapat atau perselisihan sehubungan dengan pelaksanaan Surat Kuasa ini, maka PIHAK PERTAMA dan PIHAK KEDUA sepakat untuk menyelesaikannya secara {data.penyelesaianSengketa}.</p>
                </div>
             </div>
          </div>
          <p className="pt-4 text-justify">Demikian Surat Kuasa ini dibuat dan ditandatangani oleh para pihak dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak mana pun juga untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-end w-full mb-6 text-[10.5pt]">
               <p className="font-bold text-slate-700 print:text-black">{data.city}, {formatDateSafe(data.date)}</p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col h-44">
                  <p className="uppercase text-[9.5pt] font-black text-slate-800 print:text-black tracking-widest mb-1">PIHAK KEDUA</p>
                  <p className="text-[8.5pt] text-slate-500 print:text-slate-800 italic">(Penerima Kuasa)</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900 print:text-black">{data.penerimaName}</p>
                  </div>
              </div>

              <div className="flex flex-col h-44">
                  <p className="uppercase text-[9.5pt] font-black text-slate-800 print:text-black tracking-widest mb-1">PIHAK PERTAMA</p>
                  <p className="text-[8.5pt] text-slate-500 print:text-slate-800 italic">(Pemberi Kuasa)</p>
                  <div className="mt-auto flex flex-col items-center">
                     <div className="border border-slate-300 print:border-black w-24 h-16 flex items-center justify-center text-[7pt] text-slate-400 print:text-black italic mb-4 uppercase">Materai 10.000</div>
                     <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900 print:text-black">{data.pemberiName}</p>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Scale size={16} /> <span>Surat Kuasa Builder Enterprise</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Form Data Kuasa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Preset / Template Cepat</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => applyPreset('bpkb')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all"><Car size={14}/> AMBIL BPKB</button>
                    <button onClick={() => applyPreset('ijazah')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all"><GraduationCap size={14}/> AMBIL IJAZAH</button>
                    <button onClick={() => applyPreset('gaji')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-amber-600 hover:text-white transition-all"><Banknote size={14}/> AMBIL GAJI</button>
                    <button onClick={() => applyPreset('umum')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-slate-600 hover:text-white transition-all"><FileText size={14}/> LAINNYA</button>
                 </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak I (Pemberi Kuasa)</h3>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Nama Lengkap</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiName} onChange={e => handleDataChange('pemberiName', e.target.value)} placeholder="Nama Sesuai KTP" />
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">NIK / No. KTP</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.pemberiNik} onChange={e => handleDataChange('pemberiNik', e.target.value)} placeholder="3171010101800001" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                     <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tempat Lahir</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiTempatLahir} onChange={e => handleDataChange('pemberiTempatLahir', e.target.value)} placeholder="Jakarta" />
                     </div>
                     <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tgl Lahir</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiTglLahir} onChange={e => handleDataChange('pemberiTglLahir', e.target.value)} />
                     </div>
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Pekerjaan</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiJob} onChange={e => handleDataChange('pemberiJob', e.target.value)} placeholder="Karyawan Swasta" />
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Alamat Domisili</label>
                     <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiAddress} onChange={e => handleDataChange('pemberiAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
                 </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCheck size={12}/> Pihak II (Penerima Kuasa)</h3>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Nama Lengkap</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaName} onChange={e => handleDataChange('penerimaName', e.target.value)} placeholder="Nama Yang Diberi Kuasa" />
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">NIK / No. KTP</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.penerimaNik} onChange={e => handleDataChange('penerimaNik', e.target.value)} placeholder="3201010101950002" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                     <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tempat Lahir</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTempatLahir} onChange={e => handleDataChange('penerimaTempatLahir', e.target.value)} placeholder="Bekasi" />
                     </div>
                     <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tgl Lahir</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTglLahir} onChange={e => handleDataChange('penerimaTglLahir', e.target.value)} />
                     </div>
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Pekerjaan</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaJob} onChange={e => handleDataChange('penerimaJob', e.target.value)} placeholder="Wiraswasta" />
                 </div>
                 <div>
                     <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Alamat Domisili</label>
                     <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaAddress} onChange={e => handleDataChange('penerimaAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
                 </div>
              </div>

              {/* OBJEK KUASA & DETAIL */}
              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Objek Kuasa & Detail</h3>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Sifat / Jenis Kuasa</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.jenisKuasa} onChange={e => handleDataChange('jenisKuasa', e.target.value)}>
                       <option value="KHUSUS">KUASA KHUSUS</option>
                       <option value="UMUM">KUASA UMUM</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tujuan Utama (Judul)</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.purposeTitle} onChange={e => handleDataChange('purposeTitle', e.target.value)} placeholder="PENGAMBILAN BPKB KENDARAAN" />
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Rincian Ruang Lingkup</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.purposeDetail} onChange={e => handleDataChange('purposeDetail', e.target.value)} placeholder="Detail instruksi kuasa secara spesifik..." />
                 </div>
              </div>

              {/* KETENTUAN LEGAL */}
              <div className="space-y-4 border-t pt-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><Settings size={12}/> Ketentuan Legalitas</h3>
                 
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Hak Substitusi (Pasal 3)</label>
                    <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.hakSubstitusi} onChange={e => handleDataChange('hakSubstitusi', e.target.value)}>
                       <option value="Tanpa Hak Substitusi">Tanpa Hak Substitusi</option>
                       <option value="Dengan Hak Substitusi">Dengan Hak Substitusi</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Masa Berlaku (Pasal 4)</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.masaBerlaku} onChange={e => handleDataChange('masaBerlaku', e.target.value)} placeholder="Hingga tugas tersebut selesai dilaksanakan" />
                 </div>

                 <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Penyelesaian Sengketa (Pasal 6)</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.penyelesaianSengketa} onChange={e => handleDataChange('penyelesaianSengketa', e.target.value)} placeholder="Musyawarah untuk mufakat" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Kota TTD</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota TTD" />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Tanggal TTD</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                 </div>
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
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Surat Kuasa" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
