'use client';

/**
 * FILE: MOUPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Kerjasama (MOU) / Nota Kesepahaman Kelas Enterprise
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, Handshake, LayoutTemplate, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MOUData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1
  p1Name: string; 
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Occupation: string;
  p1Address: string;
  
  // Pihak 2
  p2Name: string; 
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Occupation: string;
  p2Address: string;
  
  // Isi Kerjasama
  cooperationTitle: string;
  scope: string;
  rightsP1: string;
  obsP1: string;
  rightsP2: string;
  obsP2: string;
  financingAmount: string;
  paymentMethod: 'tunai' | 'bertahap';
  taxBorneBy: 'Pihak Pertama' | 'Pihak Kedua' | 'Ditanggung Bersama';
  period: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MOUData = {
  day: 'Senin',
  date: '', 
  city: 'Jakarta',
  
  p1Name: 'Budi Santoso', 
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Occupation: 'Wiraswasta',
  p1Address: 'Jl. Sudirman No. 123, RT 001 RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan',
  
  p2Name: 'Siti Aminah', 
  p2Nik: '3179876543210002',
  p2Pob: 'Bandung',
  p2Dob: '1985-10-20',
  p2Occupation: 'Pegawai Swasta',
  p2Address: 'Jl. Gatot Subroto No. 45, RT 003 RW 004, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
  
  cooperationTitle: 'Pengembangan Pemasaran Digital & Branding',
  scope: 'Pihak Pertama menunjuk Pihak Kedua sebagai mitra pelaksana untuk mengelola media sosial, pembuatan konten digital, dan strategi periklanan online dalam rangka meningkatkan brand awareness.',
  rightsP1: 'menerima hasil pengelolaan media sosial dan konten digital sesuai dengan target capaian yang telah disepakati bersama.',
  obsP1: 'menyediakan materi dasar produk, informasi penunjang, dan anggaran promosi yang dibutuhkan secara tepat waktu.',
  rightsP2: 'menerima pembayaran atau kompensasi biaya sesuai dengan kesepakatan nilai pembiayaan dan metode pembayaran.',
  obsP2: 'melaksanakan pengelolaan media sosial secara profesional, membuat timeline konten, dan memberikan laporan performa bulanan.',
  financingAmount: 'Rp 50.000.000 (Lima Puluh Juta Rupiah)',
  paymentMethod: 'bertahap',
  taxBorneBy: 'Ditanggung Bersama',
  period: '1 (Satu) Tahun',
};

// --- 3. KOMPONEN UTAMA ---
export default function MOUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <MOUBuilder />
    </Suspense>
  );
}

function MOUBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MOUData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof MOUData, val: any) => {
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
      <div className="bg-white flex flex-col box-border font-serif text-black leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        <div className="flex flex-col h-full">
            <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
              <h1 className="font-black text-xl uppercase tracking-widest underline leading-none mb-1">NOTA KESEPAHAMAN</h1>
              <h2 className="font-bold text-sm uppercase">(MEMORANDUM OF UNDERSTANDING)</h2>
              <div className="mt-3 text-xs font-bold uppercase tracking-wide">TENTANG {data.cooperationTitle}</div>
            </div>

            <div className="flex-grow">
              <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

              <div className="mb-4 break-inside-avoid">
                <div className="flex mb-1">
                  <div className="w-8">I.</div>
                  <div className="flex-1">
                    <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                    <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1">{data.p1Nik}</div></div>
                    <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
                    <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Occupation}</div></div>
                    <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
                    <div className="mt-2 text-justify">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 break-inside-avoid">
                <div className="flex mb-1">
                  <div className="w-8">II.</div>
                  <div className="flex-1">
                    <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                    <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1">{data.p2Nik}</div></div>
                    <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
                    <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Occupation}</div></div>
                    <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
                    <div className="mt-2 text-justify">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-justify">
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut <strong>PARA PIHAK</strong>. PARA PIHAK sepakat untuk mengadakan Nota Kesepahaman dengan syarat dan ketentuan sebagaimana diatur dalam pasal-pasal berikut:
              </p>

              <div className="space-y-6">
                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>DEFINISI DAN OBJEK KESEPAHAMAN</div>
                  <div className="pl-6">
                    <div className="flex mb-1"><div className="w-6">(1)</div><div className="flex-1 text-justify">Nota Kesepahaman ini bertujuan untuk mensinergikan potensi PARA PIHAK dalam rangka <strong>{data.cooperationTitle}</strong>.</div></div>
                    <div className="flex mb-1"><div className="w-6">(2)</div><div className="flex-1 text-justify">Objek dari kesepahaman ini adalah pelaksanaan kerjasama berkelanjutan di bidang yang telah disepakati dan diatur oleh PARA PIHAK.</div></div>
                  </div>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>RUANG LINGKUP KERJASAMA</div>
                  <p className="text-justify indent-8">{data.scope}</p>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PARA PIHAK</div>
                  <div className="pl-6">
                    <div className="flex mb-1"><div className="w-6">(1)</div><div className="flex-1 text-justify font-bold">Hak dan Kewajiban PIHAK PERTAMA:</div></div>
                    <div className="pl-6 mb-2">
                      <div className="flex mb-1"><div className="w-6">a.</div><div className="flex-1 text-justify">PIHAK PERTAMA berhak untuk {data.rightsP1}</div></div>
                      <div className="flex mb-1"><div className="w-6">b.</div><div className="flex-1 text-justify">PIHAK PERTAMA berkewajiban untuk {data.obsP1}</div></div>
                    </div>
                    <div className="flex mb-1"><div className="w-6">(2)</div><div className="flex-1 text-justify font-bold">Hak dan Kewajiban PIHAK KEDUA:</div></div>
                    <div className="pl-6">
                      <div className="flex mb-1"><div className="w-6">a.</div><div className="flex-1 text-justify">PIHAK KEDUA berhak untuk {data.rightsP2}</div></div>
                      <div className="flex mb-1"><div className="w-6">b.</div><div className="flex-1 text-justify">PIHAK KEDUA berkewajiban untuk {data.obsP2}</div></div>
                    </div>
                  </div>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>PEMBIAYAAN DAN METODE PEMBAYARAN</div>
                  <div className="pl-6">
                    <div className="flex mb-1"><div className="w-6">(1)</div><div className="flex-1 text-justify">Nilai pembiayaan atau kompensasi dalam pelaksanaan kerjasama ini adalah sebesar <strong>{data.financingAmount}</strong>.</div></div>
                    <div className="flex mb-1"><div className="w-6">(2)</div><div className="flex-1 text-justify">
                      {data.paymentMethod === 'tunai' 
                        ? 'Metode pembayaran akan dilakukan secara tunai (lunas) dalam satu kali pembayaran setelah penandatanganan Nota Kesepahaman ini atau sesuai dengan jadwal spesifik yang disepakati oleh PARA PIHAK.' 
                        : 'Metode pembayaran akan dilakukan secara bertahap (termin) menyesuaikan dengan tahapan penyelesaian pekerjaan atau laporan kemajuan bulanan yang diatur lebih lanjut dalam perjanjian teknis turunannya.'}
                    </div></div>
                  </div>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 5<br/>PAJAK DAN BIAYA LAINNYA</div>
                  <p className="text-justify indent-8">
                    Segala bentuk kewajiban perpajakan, retribusi, dan biaya-biaya operasional tambahan yang mungkin timbul akibat pelaksanaan Nota Kesepahaman ini akan <strong>{data.taxBorneBy === 'Ditanggung Bersama' ? 'ditanggung secara proporsional oleh PARA PIHAK' : `ditanggung sepenuhnya oleh ${data.taxBorneBy.toUpperCase()}`}</strong> sesuai dengan ketentuan peraturan perundang-undangan perpajakan yang berlaku di Negara Republik Indonesia.
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 6<br/>JANGKA WAKTU</div>
                  <p className="text-justify indent-8">
                    Nota Kesepahaman ini dinyatakan sah dan berlaku untuk jangka waktu selama <strong>{data.period}</strong> terhitung sejak tanggal ditandatangani oleh PARA PIHAK. Jangka waktu ini dapat dievaluasi, diperpanjang, diubah, atau diakhiri lebih awal berdasarkan kesepakatan tertulis dari PARA PIHAK selambat-lambatnya 30 (tiga puluh) hari sebelum masa berlakunya habis.
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 7<br/>FORCE MAJEURE</div>
                  <div className="pl-6">
                    <div className="flex mb-1"><div className="w-6">(1)</div><div className="flex-1 text-justify">Tidak ada satupun pihak yang dapat dimintakan pertanggungjawaban ganti rugi atas keterlambatan atau kegagalan dalam memenuhi kewajiban yang disebabkan oleh kejadian di luar kendali yang wajar (Keadaan Kahar / Force Majeure).</div></div>
                    <div className="flex mb-1"><div className="w-6">(2)</div><div className="flex-1 text-justify">Keadaan Force Majeure meliputi namun tidak terbatas pada bencana alam massal, peperangan, huru-hara, epidemi, pandemi berskala nasional, serta perubahan mendasar kebijakan pemerintah yang berdampak langsung terhadap pelaksanaan Nota Kesepahaman ini.</div></div>
                  </div>
                </div>

                <div className="break-inside-avoid">
                  <div className="text-center font-bold uppercase mb-2">PASAL 8<br/>PENYELESAIAN SENGKETA</div>
                  <div className="pl-6">
                    <div className="flex mb-1"><div className="w-6">(1)</div><div className="flex-1 text-justify">Segala sengketa, perselisihan, atau perbedaan pendapat yang timbul dari atau berkenaan dengan interpretasi atau pelaksanaan Nota Kesepahaman ini akan diselesaikan dengan iktikad baik secara musyawarah untuk mufakat.</div></div>
                    <div className="flex mb-1"><div className="w-6">(2)</div><div className="flex-1 text-justify">Apabila musyawarah sebagaimana dimaksud pada ayat (1) tidak mencapai kesepakatan dalam kurun waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui jalur hukum di Pengadilan Negeri tempat kedudukan PIHAK PERTAMA.</div></div>
                  </div>
                </div>

                <div className="break-inside-avoid mt-8">
                  <p className="text-justify">
                    Demikian Nota Kesepahaman (Memorandum of Understanding) ini dibuat dengan sebenarnya dalam 2 (dua) rangkap yang identik, dibubuhi meterai secukupnya, ditandatangani secara sadar tanpa paksaan dari pihak manapun, dan masing-masing rangkap mempunyai kekuatan hukum pembuktian yang sama bagi PARA PIHAK.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-center mt-16 mb-8 break-inside-avoid">
              <div className="w-1/2">
                  <p className="mb-2 font-bold uppercase">PIHAK PERTAMA</p>
                  <div className="h-24 flex flex-col justify-end items-center relative">
                    <div className="border border-slate-300 w-20 h-12 mb-[-1.5rem] flex items-center justify-center text-[8px] text-slate-400 italic uppercase z-0">Meterai</div>
                    <p className="font-bold underline uppercase relative z-10">{data.p1Name}</p>
                  </div>
              </div>
              <div className="w-1/2">
                  <p className="mb-2 font-bold uppercase">PIHAK KEDUA</p>
                  <div className="h-24 flex flex-col justify-end items-center">
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Handshake size={16} className="text-blue-500" /> <span>MOU Builder Enterprise</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
              <LayoutTemplate size={14} className="text-blue-400" /> Template Notaris
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans shadow-sm">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Legal</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Formulir"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans bg-slate-50/50 print:hidden print:overflow-visible print:bg-white">
              
              {/* DATA SURAT */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 border-b pb-2"><Handshake size={14}/> Info Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Hari</label>
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Misal: Senin" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tanggal</label>
                    <input type="date" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Kota / Tempat Penandatanganan</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Misal: Jakarta" />
                </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b border-blue-100 pb-2">Identitas Pihak Pertama</h3>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Nama Lengkap</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tempat Lahir</label>
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tgl Lahir</label>
                    <input type="date" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Pekerjaan</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Occupation} onChange={e => handleDataChange('p1Occupation', e.target.value)} placeholder="Pekerjaan sesuai KTP" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Jalan, RT/RW, Kel, Kec..." />
                </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b border-emerald-100 pb-2">Identitas Pihak Kedua</h3>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Nama Lengkap</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tempat Lahir</label>
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tgl Lahir</label>
                    <input type="date" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Pekerjaan</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Occupation} onChange={e => handleDataChange('p2Occupation', e.target.value)} placeholder="Pekerjaan sesuai KTP" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Jalan, RT/RW, Kel, Kec..." />
                </div>
              </div>

              {/* DETAIL KERJASAMA */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-purple-600 border-b border-purple-100 pb-2">Detail & Ruang Lingkup</h3>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Judul / Bidang Kerjasama</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-purple-500 outline-none" value={data.cooperationTitle} onChange={e => handleDataChange('cooperationTitle', e.target.value)} placeholder="Misal: Pengembangan Sistem Informasi" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Ruang Lingkup Kesepahaman (Pasal 2)</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Jelaskan secara detail ruang lingkup kerjasama yang akan dilakukan..." />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Jangka Waktu Berlaku (Pasal 6)</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.period} onChange={e => handleDataChange('period', e.target.value)} placeholder="Misal: 1 (Satu) Tahun" />
                </div>
              </div>

              {/* HAK DAN KEWAJIBAN */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-orange-600 border-b border-orange-100 pb-2">Hak & Kewajiban Para Pihak</h3>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Hak Pihak Pertama</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-orange-500 outline-none" value={data.rightsP1} onChange={e => handleDataChange('rightsP1', e.target.value)} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Kewajiban Pihak Pertama</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-orange-500 outline-none" value={data.obsP1} onChange={e => handleDataChange('obsP1', e.target.value)} />
                </div>
                <div className="border-t border-slate-100 my-2 pt-2"></div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Hak Pihak Kedua</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-orange-500 outline-none" value={data.rightsP2} onChange={e => handleDataChange('rightsP2', e.target.value)} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Kewajiban Pihak Kedua</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-orange-500 outline-none" value={data.obsP2} onChange={e => handleDataChange('obsP2', e.target.value)} />
                </div>
              </div>

              {/* PEMBIAYAAN DAN PAJAK */}
              <div className="space-y-4 bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase text-rose-600 border-b border-rose-100 pb-2">Pembiayaan & Pajak</h3>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Nilai Pembiayaan / Kompensasi</label>
                  <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-rose-500 outline-none" value={data.financingAmount} onChange={e => handleDataChange('financingAmount', e.target.value)} placeholder="Misal: Rp 50.000.000 (Lima Puluh Juta Rupiah)" />
                </div>
                
                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Metode Pembayaran</label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                    value={data.paymentMethod}
                    onChange={e => handleDataChange('paymentMethod', e.target.value as any)}
                  >
                    <option value="tunai">Tunai / Sekaligus</option>
                    <option value="bertahap">Bertahap / Cicilan / Termin</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 mb-1 block">Tanggungan Pajak (Pasal 5)</label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                    value={data.taxBorneBy}
                    onChange={e => handleDataChange('taxBorneBy', e.target.value as any)}
                  >
                    <option value="Ditanggung Bersama">Ditanggung Bersama (Proporsional)</option>
                    <option value="Pihak Pertama">Ditanggung Pihak Pertama Penuh</option>
                    <option value="Pihak Kedua">Ditanggung Pihak Kedua Penuh</option>
                  </select>
                </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
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
         <PrintWrapper documentName="Nota_Kesepahaman" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
