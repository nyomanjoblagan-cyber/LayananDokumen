'use client';

/**
 * FILE: NDAPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE)
 * DESC: Generator Non-Disclosure Agreement (Corporate Warfare Standard)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ShieldCheck, 
  User, AlertOctagon, Scale, Edit3, RotateCcw,
  Building2, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

interface NdaData {
  city: string;
  date: string;
  name1: string;
  nik1: string;
  pob1: string;
  dob1: string;
  occupation1: string;
  address1: string;
  institution1: string;
  position1: string;
  name2: string;
  nik2: string;
  pob2: string;
  dob2: string;
  occupation2: string;
  address2: string;
  purpose: string;
  penaltyAmount: string;
  penaltyAmountText: string;
}

const INITIAL_DATA: NdaData = {
  city: 'JAKARTA',
  date: '',
  name1: 'VICTORIA BLACKWOOD, S.H., M.B.A.',
  nik1: '3171012304850001',
  pob1: 'Jakarta',
  dob1: '23 April 1985',
  occupation1: 'Direktur Eksekutif',
  address1: 'Menara Korporat Lantai 50, Jl. Jend. Sudirman Kav 1, Jakarta Selatan',
  institution1: 'PT MEGA KORPORA Tbk',
  position1: 'CEO',

  name2: 'ALEXANDRIA WONG',
  nik2: '3171056708920004',
  pob2: 'Surabaya',
  dob2: '15 Agustus 1992',
  occupation2: 'Konsultan Independen',
  address2: 'Jl. Merak No. 9, RT 01/RW 03, Kel. Rawa Barat, Kec. Kebayoran Baru, Jakarta Selatan',

  purpose: 'Audit Strategis dan Pengembangan Arsitektur Sistem Inti (Core System Architecture)',
  penaltyAmount: '10.000.000.000',
  penaltyAmountText: 'Sepuluh Miliar Rupiah'
};

export default function NDAPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor NDA...</div>}>
      <NdaToolBuilder />
    </Suspense>
  );
}

function NdaToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<NdaData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof NdaData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke pengaturan korporat awal?')) {
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
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto text-justify">
        <div className="text-center mb-8 shrink-0">
          <h1 className="font-black text-xl uppercase underline tracking-widest decoration-2 underline-offset-4">
            PERJANJIAN KERAHASIAAN
          </h1>
          <h2 className="font-bold text-lg tracking-widest mt-1">NON-DISCLOSURE AGREEMENT (NDA)</h2>
          <p className="mt-2 text-sm font-bold tracking-widest">NOMOR: {data.nik1.slice(0,4)}/NDA-CORP/{(new Date().getFullYear())}</p>
        </div>
        
        <p className="mb-6">
          Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, dibuat dan ditandatangani Perjanjian Kerahasiaan (selanjutnya disebut "Perjanjian") yang mengikat secara hukum secara absolut dan tanpa syarat oleh dan antara:
        </p>
        
        <div className="ml-4 mb-6 space-y-1">
          <div className="flex align-top"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.name1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">N I K</div><div className="w-4 shrink-0">:</div><div>{data.nik1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pob1}, {data.dob1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Jabatan</div><div className="w-4 shrink-0">:</div><div>{data.occupation1} / {data.position1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Instansi Korporasi</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.institution1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Alamat Sesuai KTP</div><div className="w-4 shrink-0">:</div><div>{data.address1}</div></div>
          <p className="mt-3 text-justify">
            Dalam hal ini bertindak untuk dan atas nama diri sendiri serta korporasi yang diwakilinya, selaku pihak pemegang mutlak atas seluruh informasi, selanjutnya dalam perjanjian ini disebut sebagai <strong>"PIHAK PERTAMA (DISCLOSING PARTY)"</strong>.
          </p>
        </div>
        
        <div className="ml-4 mb-6 space-y-1">
          <div className="flex align-top"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.name2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">N I K</div><div className="w-4 shrink-0">:</div><div>{data.nik2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pob2}, {data.dob2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Pekerjaan / Jabatan</div><div className="w-4 shrink-0">:</div><div>{data.occupation2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Alamat Sesuai KTP</div><div className="w-4 shrink-0">:</div><div>{data.address2}</div></div>
          <p className="mt-3 text-justify">
            Dalam hal ini bertindak untuk dan atas nama diri sendiri secara pribadi, selaku pihak penerima akses terbatas, selanjutnya dalam perjanjian ini disebut sebagai <strong>"PIHAK KEDUA (RECEIVING PARTY)"</strong>.
          </p>
        </div>
        
        <p className="mb-6">
          <strong>PIHAK PERTAMA</strong> dan <strong>PIHAK KEDUA</strong> secara bersama-sama selanjutnya disebut sebagai <strong>"PARA PIHAK"</strong>.
        </p>
        
        <p className="mb-4 text-center font-bold uppercase tracking-widest">--- MENERANGKAN ---</p>
        <ul className="list-disc ml-8 mb-6 text-justify space-y-2">
          <li>Bahwa PIHAK PERTAMA adalah pemilik tunggal dan sah atas seluruh kekayaan intelektual, rahasia dagang, strategi bisnis, teknologi, dan/atau data korporat yang bernilai sangat tinggi dan bersifat sangat rahasia.</li>
          <li>Bahwa PIHAK KEDUA secara sadar, sehat, dan tanpa paksaan bermaksud menerima paparan informasi tersebut semata-mata untuk kepentingan operasional: <strong>{data.purpose}</strong>.</li>
          <li>Bahwa penyerahan informasi ini tidak dalam bentuk apapun mengalihkan hak kepemilikan material maupun immaterial, melainkan hanya memberikan izin penggunaan terbatas yang dikontrol ketat, diawasi secara invasif, dan dapat dicabut sepihak kapan saja oleh PIHAK PERTAMA.</li>
        </ul>
        
        <p className="mb-6 text-justify">
          Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Kerahasiaan ini dengan syarat-syarat dan ketentuan-ketentuan yang bersifat <strong>mutlak, final, dan memaksa</strong> sebagai berikut:
        </p>

        <div className="mb-6">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 1<br/>DEFINISI INFORMASI RAHASIA</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">"Informasi Rahasia" meliputi, namun tidak terbatas pada, setiap dan seluruh data, informasi, dokumen, catatan, algoritma, kode sumber (<i>source code</i>), strategi finansial, daftar klien, rancangan arsitektur, rahasia dagang, formula, model bisnis, dan komunikasi lisan maupun tulisan yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA.</li>
            <li className="pl-2">Seluruh informasi yang diberikan dan dikomunikasikan dalam konteks hubungan kerjasama, terlepas dari apakah informasi tersebut ditandai dengan cap fisik "RAHASIA", mutlak dianggap sebagai Informasi Rahasia secara eksklusif.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 2<br/>KETENTUAN PENGGUNAAN DAN SIFAT KERAHASIAAN</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK KEDUA dilarang keras menggunakan Informasi Rahasia untuk tujuan komersial independen, kepentingan pribadi, mendirikan usaha rintisan pesaing, atau tujuan apapun selain dari tujuan kolaborasi spesifik yang telah disetujui tertulis oleh Direksi PIHAK PERTAMA.</li>
            <li className="pl-2">Segala bentuk kegiatan duplikasi, pengutipan, pencetakan ulang, pemotretan, perekaman audiovisual, pendistribusian, atau penyebarluasan Informasi Rahasia kepada pihak ketiga (termasuk keluarga atau kolega) dilarang secara mutlak.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 3<br/>KEWAJIBAN PENGAMANAN (STRICT LIABILITY)</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK KEDUA wajib mengamankan dan menjaga kerahasiaan Informasi Rahasia dengan standar perlindungan korporat paling maksimal (<i>maximum security protocol</i>).</li>
            <li className="pl-2">Apabila terjadi kebocoran informasi yang diakibatkan oleh kelalaian sekecil apapun (sengaja maupun tidak sengaja), intrusi siber ke perangkat PIHAK KEDUA, maupun rekayasa sosial, PIHAK KEDUA bertanggung jawab penuh secara hukum tanpa adanya pembelaan dalam bentuk apapun (<i>strict liability</i>).</li>
          </ol>
        </div>

        <div className="mb-6 break-inside-avoid">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 4<br/>SANKSI DAN PENALTI FINANSIAL MASIF</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Dalam hal PIHAK KEDUA terbukti secara nyata melakukan pelanggaran atas sebagian maupun seluruh ketentuan dalam Pasal 1, Pasal 2, dan Pasal 3 Perjanjian ini, PIHAK KEDUA diwajibkan untuk membayar denda tunai seketika (<i>liquidated damages</i>) kepada PIHAK PERTAMA sebesar <strong>Rp {data.penaltyAmount} ({data.penaltyAmountText})</strong>.</li>
            <li className="pl-2">Denda finansial tersebut wajib dibayarkan secara penuh, lunas, dan tunai selambat-lambatnya 7 (tujuh) hari kalender sejak dikeluarkannya Surat Somasi pertama oleh firma hukum PIHAK PERTAMA.</li>
            <li className="pl-2">Pembayaran denda ini tidak menghapuskan hak PIHAK PERTAMA untuk menuntut tambahan ganti rugi perdata yang lebih besar, menuntut penyitaan seluruh aset pribadi PIHAK KEDUA, serta memidanakan PIHAK KEDUA dengan delik pidana penggelapan korporasi dan pencurian kekayaan intelektual tingkat berat.</li>
          </ol>
        </div>

        <div className="mb-6 break-inside-avoid">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 5<br/>HAK AUDIT PAKSA DAN PENYITAAN ASET TEKNOLOGI</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK PERTAMA memiliki hak absolut dan tidak dapat dihalangi untuk sewaktu-waktu, tanpa pemberitahuan sebelumnya, melakukan inspeksi, audit paksa, dan penggeledahan terhadap perangkat fisik (laptop, tablet, ponsel), server, email, dan ruang penyimpanan awan (<i>cloud</i>) milik PIHAK KEDUA.</li>
            <li className="pl-2">Apabila terindikasi kuat terdapat pelanggaran protokol kerahasiaan, PIHAK PERTAMA berhak penuh menyita (mengambil alih secara paksa) perangkat-perangkat tersebut untuk keperluan penyidikan dan audit forensik internal.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 6<br/>KEPEMILIKAN HAK KEKAYAAN INTELEKTUAL (HAKI)</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Segala bentuk karya turunan, modifikasi, pengembangan, cetak biru, kode baru, atau penemuan yang tercipta dan dikembangkan oleh PIHAK KEDUA yang secara langsung maupun tidak langsung terinspirasi dari Informasi Rahasia, secara otomatis, sepihak, dan sah menjadi hak milik penuh dan mutlak (100%) PIHAK PERTAMA.</li>
            <li className="pl-2">PIHAK KEDUA melepaskan semua hak untuk menuntut royalti, komisi, kepemilikan saham kosong (<i>sweat equity</i>), maupun kompensasi finansial lainnya di masa depan.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 7<br/>JANGKA WAKTU BERLAKU SEUMUR HIDUP</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Kewajiban kerahasiaan dan pelarangan pengungkapan berdasarkan Perjanjian ini mengikat PIHAK KEDUA tanpa batas waktu (berlaku seumur hidup), terlepas dari apakah hubungan kerja, kontrak, dan kolaborasi antara PARA PIHAK telah berakhir, diputus sepihak, maupun batal demi hukum.</li>
            <li className="pl-2">Kewajiban ini hanya akan gugur sebagian apabila Informasi Rahasia tersebut secara sah dan sengaja dipublikasikan ke ranah publik melalui siaran pers resmi dari Direksi PIHAK PERTAMA.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-center font-bold mb-2 uppercase">PASAL 8<br/>YURISDIKSI HUKUM DAN PELEPASAN HAK PEMBELAAN</h2>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Perjanjian ini sepenuhnya tunduk, ditafsirkan, dan diatur berdasarkan hukum dan konstitusi Negara Kesatuan Republik Indonesia.</li>
            <li className="pl-2">Demi memberikan jaminan eksekusi yang cepat bagi PIHAK PERTAMA, PIHAK KEDUA dengan sadar dan secara sukarela <strong>melepaskan seluruh hak hukumnya untuk membela diri</strong> atas pengenaan penalti dan denda sebagaimana dimaksud dalam Pasal 4, baik melalui mekanisme bantahan peradilan, arbitrase, atau institusi penyelesaian sengketa lainnya.</li>
            <li className="pl-2">Segala bentuk sengketa, beda pendapat, maupun tindakan eksekusi denda akan dieksekusi secara sepihak dan mutlak di kepaniteraan Pengadilan Negeri tempat kedudukan hukum PIHAK PERTAMA, tanpa hak banding dari PIHAK KEDUA.</li>
          </ol>
        </div>
        
        <div className="break-inside-avoid">
          <p className="mb-12 text-justify">
            Demikian Perjanjian Kerahasiaan (NDA) ini dibuat, dibaca, dimengerti secara utuh konsekuensi pidana dan perdatanya, serta ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, tanpa adanya paksaan maupun intervensi dari pihak manapun, serta mempunyai kekuatan pembuktian hukum yang mengikat sejak tanggal ditandatangani.
          </p>
          
          <div className="flex justify-between text-center font-sans">
             <div className="w-1/2 flex flex-col items-center">
                <p className="mb-8 font-bold uppercase text-xs">PIHAK PERTAMA (DISCLOSING PARTY)<br/>PENGUASA INFORMASI</p>
                <div className="h-24 w-full flex items-center justify-center mb-2">
                </div>
                <p className="font-bold underline uppercase text-sm font-serif w-4/5 text-center">{data.name1}</p>
                <p className="text-xs uppercase w-4/5 text-center">{data.position1} - {data.institution1}</p>
             </div>
             
             <div className="w-1/2 flex flex-col items-center">
                <p className="mb-8 font-bold uppercase text-xs">PIHAK KEDUA (RECEIVING PARTY)<br/>PENERIMA AKSES</p>
                <div className="h-24 w-32 flex items-center justify-center border border-slate-300 text-[9px] text-slate-500 mb-2 bg-slate-50 print:border-black uppercase relative">
                   <span className="absolute z-0 text-center px-2">Materai<br/>10.000<br/>Wajib TTD<br/>Kenai Materai</span>
                </div>
                <p className="font-bold underline uppercase text-sm font-serif w-4/5 text-center">{data.name2}</p>
                <p className="text-xs w-4/5 text-center">NIK: {data.nik2}</p>
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-red-500" /> <span>Corporate NDA Generator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-red-600" /> Pengaturan Hukum NDA</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              
              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-800 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pihak Pertama (Penguasa)</h3>
                 
                 <div className="space-y-3">
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.name1} onChange={e => handleDataChange('name1', e.target.value)} placeholder="Nama Lengkap KTP" />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik1} onChange={e => handleDataChange('nik1', e.target.value)} placeholder="NIK KTP" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.position1} onChange={e => handleDataChange('position1', e.target.value)} placeholder="Posisi di Perusahaan" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pob1} onChange={e => handleDataChange('pob1', e.target.value)} placeholder="Tempat Lahir" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.dob1} onChange={e => handleDataChange('dob1', e.target.value)} placeholder="Tanggal Lahir (mis. 1 Jan 1980)" />
                    </div>
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.occupation1} onChange={e => handleDataChange('occupation1', e.target.value)} placeholder="Pekerjaan" />
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800" value={data.institution1} onChange={e => handleDataChange('institution1', e.target.value)} placeholder="Nama Entitas/Perusahaan" />
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.address1} onChange={e => handleDataChange('address1', e.target.value)} placeholder="Alamat Sesuai KTP" />
                 </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-300 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b border-slate-300 pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua (Target/Penerima)</h3>
                 
                 <div className="space-y-3">
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.name2} onChange={e => handleDataChange('name2', e.target.value)} placeholder="Nama Lengkap KTP" />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.nik2} onChange={e => handleDataChange('nik2', e.target.value)} placeholder="NIK KTP" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.occupation2} onChange={e => handleDataChange('occupation2', e.target.value)} placeholder="Pekerjaan" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.pob2} onChange={e => handleDataChange('pob2', e.target.value)} placeholder="Tempat Lahir" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.dob2} onChange={e => handleDataChange('dob2', e.target.value)} placeholder="Tanggal Lahir" />
                    </div>
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none resize-none h-16" value={data.address2} onChange={e => handleDataChange('address2', e.target.value)} placeholder="Alamat Sesuai KTP" />
                 </div>
              </div>

              {/* KONTEN KLAUSUL */}
              <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-800 border-b border-red-200 pb-1 tracking-widest flex items-center gap-2"><AlertOctagon size={12}/> Objek & Penalti (Krusial)</h3>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-red-700 mb-1 uppercase tracking-wider">Tujuan Spesifik Kolaborasi / Proyek</label>
                      <textarea className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none resize-none h-16" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan pemberian akses informasi..." />
                    </div>
                    
                    <div className="p-3 bg-red-100 rounded-lg border border-red-300">
                      <label className="block text-[10px] font-black text-red-900 mb-2 uppercase tracking-wider">Nominal Denda (Rp) - Pasal 4</label>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-red-800">Rp</span>
                        <input className="flex-1 p-2 border border-red-400 rounded-md text-xs font-bold text-red-900 focus:ring-2 focus:ring-red-500 outline-none" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} placeholder="10.000.000.000" />
                      </div>
                      <input className="w-full p-2 border border-red-300 rounded-md text-xs italic text-red-800 focus:ring-2 focus:ring-red-500 outline-none bg-red-50" value={data.penaltyAmountText} onChange={e => handleDataChange('penaltyAmountText', e.target.value)} placeholder="Terbilang (Sepuluh Miliar Rupiah)" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-red-700 mb-1 uppercase tracking-wider">Kota TTD</label>
                        <input className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-red-700 mb-1 uppercase tracking-wider">Tgl Kesepakatan</label>
                        <input type="date" className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-250mm] sm:mb-[-150mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Non-Disclosure Agreement Korporasi" price={45000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
