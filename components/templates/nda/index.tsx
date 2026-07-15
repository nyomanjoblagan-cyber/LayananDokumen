'use client';

/**
 * FILE: NDAPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE)
 * DESC: Generator Non-Disclosure Agreement (Corporate Warfare Standard)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ShieldCheck, 
  User, AlertOctagon, Edit3, RotateCcw,
  Building2
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

interface NdaData {
  city: string;
  date: string;
  
  // Pihak Pertama (Penguasa)
  name1: string;
  nik1: string;
  pob1: string;
  dob1: string;
  occupation1: string;
  address1: string;
  institution1: string;
  position1: string;
  
  // Pihak Kedua (Penerima)
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

  purpose: 'Audit Strategis dan Analisis Kerentanan Infrastruktur Siber (Cyber Vulnerability Analysis)',
  penaltyAmount: '50.000.000.000',
  penaltyAmountText: 'Lima Puluh Miliar Rupiah'
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
          Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, dibuat dan ditandatangani Perjanjian Kerahasiaan (selanjutnya disebut "Perjanjian") yang mengikat secara hukum secara absolut dan tanpa syarat, oleh dan antara:
        </p>
        
        <div className="ml-4 mb-6 space-y-1">
          <div className="flex align-top"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.name1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">N I K</div><div className="w-4 shrink-0">:</div><div>{data.nik1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pob1}, {data.dob1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.occupation1} / {data.position1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Instansi Korporasi</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.institution1}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Alamat (Sesuai KTP)</div><div className="w-4 shrink-0">:</div><div>{data.address1}</div></div>
          <p className="mt-3 text-justify">
            Dalam hal ini bertindak untuk dan atas nama diri sendiri serta entitas korporasi yang diwakilinya, selaku pihak pemegang mutlak atas seluruh informasi rahasia, selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK PERTAMA (DISCLOSING PARTY)"</strong>.
          </p>
        </div>
        
        <div className="ml-4 mb-6 space-y-1">
          <div className="flex align-top"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.name2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">N I K</div><div className="w-4 shrink-0">:</div><div>{data.nik2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.pob2}, {data.dob2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.occupation2}</div></div>
          <div className="flex align-top"><div className="w-48 shrink-0">Alamat (Sesuai KTP)</div><div className="w-4 shrink-0">:</div><div>{data.address2}</div></div>
          <p className="mt-3 text-justify">
            Dalam hal ini bertindak untuk dan atas nama diri sendiri secara pribadi dan profesional, selaku pihak penerima akses terbatas dan bersyarat, selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK KEDUA (RECEIVING PARTY)"</strong>.
          </p>
        </div>
        
        <p className="mb-6">
          <strong>PIHAK PERTAMA</strong> dan <strong>PIHAK KEDUA</strong> secara bersama-sama selanjutnya disebut sebagai <strong>"PARA PIHAK"</strong>.
        </p>
        
        <p className="mb-4 text-center font-bold uppercase tracking-widest">--- M E N E R A N G K A N ---</p>
        <ul className="list-disc ml-8 mb-6 text-justify space-y-2">
          <li>Bahwa PIHAK PERTAMA adalah pemilik tunggal, penguasa absolut, dan satu-satunya pemegang sah atas seluruh kekayaan intelektual, data operasi, arsitektur sistem, rahasia dagang, strategi bisnis, dan seluruh aset tak berwujud lainnya yang bernilai sangat tinggi dan bersifat sangat rahasia.</li>
          <li>Bahwa PIHAK KEDUA secara sadar, sehat, tanpa paksaan maupun tekanan dari pihak manapun, bermaksud menerima paparan informasi tersebut semata-mata untuk kepentingan: <strong>{data.purpose}</strong>.</li>
          <li>Bahwa penyerahan akses informasi ini sama sekali tidak mengalihkan hak kepemilikan material maupun immaterial dalam bentuk apapun, melainkan murni hanya memberikan izin penggunaan sementara yang diawasi secara invasif, dibatasi secara ketat, dan dapat dicabut secara sepihak oleh PIHAK PERTAMA setiap saat tanpa perlu memberikan alasan hukum apapun.</li>
        </ul>
        
        <p className="mb-6 text-justify">
          Berdasarkan hal-hal tersebut di atas, PARA PIHAK telah setuju dan sepakat untuk mengikatkan diri dalam Perjanjian Kerahasiaan ini dengan syarat-syarat dan ketentuan-ketentuan korporat yang bersifat <strong>mutlak, final, dan memaksa</strong> sebagai berikut:
        </p>

        <div className="mb-6">
          <p className="text-center font-bold mb-2 uppercase">PASAL 1<br/>DEFINISI DAN RUANG LINGKUP INFORMASI RAHASIA</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">"Informasi Rahasia" meliputi, namun tidak terbatas pada, setiap dan seluruh data, dokumen, catatan, algoritma, kode sumber (<i>source code</i>), sistem basis data, strategi finansial, struktur harga, daftar klien, rancangan arsitektur, rahasia dagang, cetak biru (<i>blueprint</i>), komunikasi lisan maupun tulisan, serta temuan-temuan terkait operasional yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA.</li>
            <li className="pl-2">Seluruh informasi, data, atau dokumen yang diperoleh, diakses, didengar, maupun dilihat oleh PIHAK KEDUA selama masa interaksi dengan PIHAK PERTAMA mutlak dianggap sebagai Informasi Rahasia secara eksklusif, terlepas dari apakah informasi tersebut secara spesifik ditandai atau dicap dengan label "RAHASIA".</li>
          </ol>
        </div>

        <div className="mb-6">
          <p className="text-center font-bold mb-2 uppercase">PASAL 2<br/>KEPEMILIKAN DAN PENGUASAAN MUTLAK</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK KEDUA secara tegas mengakui dan membenarkan bahwa seluruh Informasi Rahasia adalah dan akan selalu menjadi properti milik eksklusif dan mutlak dari PIHAK PERTAMA.</li>
            <li className="pl-2">Segala bentuk modifikasi, turunan, inovasi, pengembangan, cetak biru, kode baru, algoritma turunan, atau penemuan yang tercipta, dipikirkan, atau dikembangkan oleh PIHAK KEDUA yang secara langsung maupun tidak langsung terinspirasi dari Informasi Rahasia, secara otomatis dan sepihak menjadi hak milik penuh dan sah seratus persen (100%) PIHAK PERTAMA sejak detik penciptaannya.</li>
            <li className="pl-2">PIHAK KEDUA secara hukum melepaskan dan menghapus seluruh hak dan klaim masa depan untuk menuntut royalti, komisi, pembagian saham kosong (<i>sweat equity</i>), pengakuan kekayaan intelektual, maupun kompensasi finansial lainnya dalam bentuk apapun atas karya-karya turunan tersebut.</li>
          </ol>
        </div>

        <div className="mb-6">
          <p className="text-center font-bold mb-2 uppercase">PASAL 3<br/>KETENTUAN PENGGUNAAN DAN LARANGAN EKSPLOITASI</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK KEDUA hanya diperkenankan untuk menggunakan Informasi Rahasia secara sangat terbatas semata-mata untuk mewujudkan tujuan yang telah ditetapkan dalam Perjanjian ini dan tidak untuk tujuan komersial independen.</li>
            <li className="pl-2">PIHAK KEDUA dilarang keras dan diharamkan secara hukum untuk mengeksploitasi Informasi Rahasia demi mendirikan bisnis pesaing (<i>competitor</i>), melakukan praktik pembajakan klien (<i>poaching</i>), atau mengambil keuntungan pribadi atas akses informasi yang telah diberikan.</li>
            <li className="pl-2">Segala bentuk kegiatan duplikasi, pengutipan, pencetakan ulang, pemotretan, perekaman audiovisual, pencatatan diam-diam, rekayasa balik (<i>reverse engineering</i>), pendistribusian, atau penyebarluasan Informasi Rahasia kepada pihak ketiga (termasuk keluarga kandung, kolega, entitas bisnis lain, dan publik luas) dilarang secara mutlak.</li>
          </ol>
        </div>

        <div className="mb-6">
          <p className="text-center font-bold mb-2 uppercase">PASAL 4<br/>KEWAJIBAN PENGAMANAN DAN TANGGUNG JAWAB MUTLAK (STRICT LIABILITY)</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">PIHAK KEDUA memiliki kewajiban tingkat tertinggi untuk mengamankan dan menjaga kerahasiaan Informasi Rahasia dengan standar perlindungan siber dan korporat paling maksimal (<i>maximum physical and digital security protocol</i>).</li>
            <li className="pl-2">Apabila terjadi kebocoran informasi yang diakibatkan oleh kelalaian sekecil apapun (baik disengaja maupun tidak disengaja), kelemahan sistem, kelengahan operasional, intrusi siber peretas terhadap perangkat PIHAK KEDUA, maupun rekayasa sosial, PIHAK KEDUA bertanggung jawab penuh secara hukum tanpa berhak mengajukan alasan pemaaf atau pembelaan dalam bentuk apapun (<i>strict liability</i>).</li>
          </ol>
        </div>

        <div className="mb-6 break-inside-avoid">
          <p className="text-center font-bold mb-2 uppercase">PASAL 5<br/>PENALTI FINANSIAL MASIF DAN SANKSI PIDANA</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Dalam hal PIHAK KEDUA terbukti (berdasarkan temuan sepihak PIHAK PERTAMA maupun lembaga audit independen) melakukan pelanggaran nyata atas sebagian maupun seluruh ketentuan kerahasiaan, maka PIHAK KEDUA dikenakan denda tunai seketika (<i>liquidated damages</i>) dan wajib dibayarkan kepada PIHAK PERTAMA sejumlah <strong>Rp {data.penaltyAmount} ({data.penaltyAmountText})</strong>.</li>
            <li className="pl-2">Denda finansial tersebut merupakan sanksi keperdataan yang tidak bisa dinegosiasikan ulang, dan wajib dibayarkan secara penuh, lunas, dan tunai selambat-lambatnya 7 (tujuh) hari kalender sejak dikeluarkannya Surat Somasi Pertama (Peringatan Terakhir) oleh representasi hukum atau firma hukum PIHAK PERTAMA.</li>
            <li className="pl-2">Pembayaran denda ini bersifat terpisah dan sama sekali tidak menghapuskan, mengurangi, atau membatasi hak PIHAK PERTAMA untuk menuntut ganti rugi perdata tambahan yang lebih besar apabila nilai kerusakan bisnis melebihi nominal denda tersebut, memohon penyitaan konservatoir terhadap seluruh aset pribadi PIHAK KEDUA (termasuk harta tak bergerak, rekening bank, kendaraan), serta melaporkan dan memidanakan PIHAK KEDUA ke aparat penegak hukum atas dugaan delik pidana pembocoran rahasia korporasi, pencurian data siber, dan pelanggaran kekayaan intelektual tingkat berat sesuai dengan regulasi yang berlaku.</li>
          </ol>
        </div>

        <div className="mb-6 break-inside-avoid">
          <p className="text-center font-bold mb-2 uppercase">PASAL 6<br/>AUDIT PAKSA DAN PENYITAAN ASET TEKNOLOGI</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Guna memastikan kepatuhan atas Perjanjian ini, PIHAK PERTAMA (termasuk agen atau investigator independen yang ditunjuknya) memiliki hak absolut, diskresioner, dan tidak dapat dihalangi untuk sewaktu-waktu (kapanpun dan di manapun), tanpa kewajiban memberikan pemberitahuan terlebih dahulu, untuk melakukan inspeksi mendadak, audit paksa, dan penggeledahan digital.</li>
            <li className="pl-2">Objek inspeksi meliputi setiap dan seluruh perangkat keras (laptop, komputer pribadi, tablet, telepon seluler), server fisik/virtual, akun surat elektronik (email), ruang penyimpanan komputasi awan (<i>cloud storage</i>), rekam jejak repositori kode, dan riwayat perpesanan milik PIHAK KEDUA yang relevan.</li>
            <li className="pl-2">Apabila terindikasi secara kuat (berdasarkan kecurigaan beralasan) terdapat pelanggaran protokol kerahasiaan, PIHAK PERTAMA berhak penuh menyita, menahan, atau mengambil alih secara paksa perangkat-perangkat maupun akun-akun tersebut demi mengamankan barang bukti untuk keperluan penyidikan forensik internal lebih lanjut. PIHAK KEDUA melepaskan hak privasinya sehubungan dengan pelaksanaan audit paksa ini.</li>
          </ol>
        </div>

        <div className="mb-6">
          <p className="text-center font-bold mb-2 uppercase">PASAL 7<br/>MASA BERLAKU SEUMUR HIDUP</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Kewajiban kerahasiaan, pelarangan pengungkapan, dan seluruh tanggung jawab yang diatur di dalam Perjanjian ini mengikat PIHAK KEDUA tanpa batas waktu (berlaku abadi dan seumur hidup), terlepas dari apakah kolaborasi, proyek, hubungan kerja, maupun kontrak utama antara PARA PIHAK telah berakhir, diputus sepihak, dinyatakan usai, atau batal demi hukum.</li>
            <li className="pl-2">Kewajiban menjaga kerahasiaan ini hanya akan gugur terhadap poin spesifik dari Informasi Rahasia, manakala informasi tersebut telah secara sah, bebas, dan sengaja dipublikasikan ke ranah publik luas melalui siaran pers resmi (<i>official press release</i>) yang ditandatangani oleh Direksi Utama PIHAK PERTAMA. Informasi yang bocor oleh pihak ketiga atau beredar melalui desas-desus publik tetap wajib dijaga kerahasiaannya oleh PIHAK KEDUA.</li>
          </ol>
        </div>

        <div className="mb-8">
          <p className="text-center font-bold mb-2 uppercase">PASAL 8<br/>PENYELESAIAN SENGKETA DAN PELEPASAN HAK PEMBELAAN</p>
          <ol className="list-decimal ml-4 pl-4 text-justify space-y-2">
            <li className="pl-2">Perjanjian ini dibuat, disepakati, sepenuhnya tunduk pada, ditafsirkan, serta dieksekusi berdasarkan hukum dan yurisdiksi Negara Kesatuan Republik Indonesia.</li>
            <li className="pl-2">Demi memberikan jaminan perlindungan dan eksekusi denda secara instan bagi PIHAK PERTAMA, PIHAK KEDUA dengan sadar, penuh kesengajaan, dan secara sukarela <strong>melepaskan seluruh hak hukumnya untuk menuntut, menyanggah, membatalkan, maupun membela diri</strong> atas pengenaan penalti dan audit penyitaan yang diatur dalam Pasal 5 dan Pasal 6. Pelepasan hak ini melingkupi bantahan peradilan, gugatan rekonvensi, arbitrase, maupun manuver pembelaan diri pada institusi penyelesaian sengketa apapun.</li>
            <li className="pl-2">Segala bentuk sengketa keperdataan terkait keabsahan eksekusi akan diselesaikan secara eksklusif, sepihak, dan final di kepaniteraan Pengadilan Negeri tempat domisili hukum PIHAK PERTAMA, tanpa hak penolakan, hak banding, ataupun hak kasasi dari PIHAK KEDUA. Keputusan pengadilan tersebut wajib dieksekusi serta merta meskipun ada upaya perlawanan (<i>uitvoerbaar bij voorraad</i>).</li>
          </ol>
        </div>
        
        <div className="break-inside-avoid">
          <p className="mb-12 text-justify">
            Demikian Perjanjian Kerahasiaan (NDA) ini dirancang, dicetak, dibaca, dan dimengerti secara utuh setiap bait konsekuensi pidana dan perdatanya. Perjanjian ini ditandatangani oleh PARA PIHAK dalam keadaan sadar sesadar-sadarnya, sehat secara fisik maupun kejiwaan, tanpa ada sekelumit pun paksaan, penipuan, maupun intervensi dari pihak manapun, serta mempunyai kekuatan pembuktian hukum dan kekuatan eksekutorial yang mengikat dan memaksa sejak tanggal dibubuhkannya tanda tangan.
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
                <p className="mb-8 font-bold uppercase text-xs">PIHAK KEDUA (RECEIVING PARTY)<br/>PENERIMA AKSES TERBATAS</p>
                <div className="h-24 w-32 flex items-center justify-center border border-slate-300 text-[9px] text-slate-500 mb-2 bg-slate-50 print:border-black uppercase relative">
                   <span className="absolute z-0 text-center px-2 font-bold text-slate-400 print:text-black">Materai<br/>10.000<br/>Wajib TTD<br/>Kena Materai</span>
                </div>
                <p className="font-bold underline uppercase text-sm font-serif w-4/5 text-center">{data.name2}</p>
                <p className="text-xs uppercase w-4/5 text-center">NIK: {data.nik2}</p>
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-red-500" /> <span>Corporate Warfare NDA Generator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-red-600" /> Pengaturan Hukum Ekstrem NDA</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:overflow-visible print:bg-white">
              
              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-800 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pihak Pertama (Penguasa Mutlak)</h3>
                 
                 <div className="space-y-3">
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.name1} onChange={e => handleDataChange('name1', e.target.value)} placeholder="Nama Lengkap KTP" />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik1} onChange={e => handleDataChange('nik1', e.target.value)} placeholder="NIK KTP" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.position1} onChange={e => handleDataChange('position1', e.target.value)} placeholder="Jabatan Posisi" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pob1} onChange={e => handleDataChange('pob1', e.target.value)} placeholder="Tempat Lahir" />
                      <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.dob1} onChange={e => handleDataChange('dob1', e.target.value)} placeholder="Tanggal Lahir" />
                    </div>
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.occupation1} onChange={e => handleDataChange('occupation1', e.target.value)} placeholder="Pekerjaan / Jabatan" />
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800" value={data.institution1} onChange={e => handleDataChange('institution1', e.target.value)} placeholder="Nama Entitas/Perusahaan (Opsional)" />
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.address1} onChange={e => handleDataChange('address1', e.target.value)} placeholder="Alamat Lengkap (Sesuai KTP)" />
                 </div>
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-300 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b border-slate-300 pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua (Penerima Akses)</h3>
                 
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
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none resize-none h-16" value={data.address2} onChange={e => handleDataChange('address2', e.target.value)} placeholder="Alamat Lengkap (Sesuai KTP)" />
                 </div>
              </div>

              {/* KONTEN KLAUSUL */}
              <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-800 border-b border-red-200 pb-1 tracking-widest flex items-center gap-2"><AlertOctagon size={12}/> Objek & Penalti Masif (Krusial)</h3>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-red-700 mb-1 uppercase tracking-wider">Tujuan Spesifik Pemberian Akses</label>
                      <textarea className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none resize-none h-16" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Contoh: Audit Teknologi dan Review Manajemen Risiko..." />
                    </div>
                    
                    <div className="p-3 bg-red-100 rounded-lg border border-red-300">
                      <label className="block text-[10px] font-black text-red-900 mb-2 uppercase tracking-wider">Nominal Denda Eksekutorial (Rp)</label>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-red-800">Rp</span>
                        <input className="flex-1 p-2 border border-red-400 rounded-md text-xs font-bold text-red-900 focus:ring-2 focus:ring-red-500 outline-none" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} placeholder="50.000.000.000" />
                      </div>
                      <input className="w-full p-2 border border-red-300 rounded-md text-xs italic text-red-800 focus:ring-2 focus:ring-red-500 outline-none bg-red-50" value={data.penaltyAmountText} onChange={e => handleDataChange('penaltyAmountText', e.target.value)} placeholder="Terbilang (Lima Puluh Miliar Rupiah)" />
                      <p className="mt-2 text-[9px] text-red-600 font-bold leading-tight">Denda ini bersifat seketika (liquidated damages) dan tidak bisa dinegosiasikan jika terjadi kebocoran (Pasal 5).</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-red-700 mb-1 uppercase tracking-wider">Kota Tanda Tangan</label>
                        <input className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Nama Kota" />
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

 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-250mm] sm:mb-[-150mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
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
         <PrintWrapper documentName="Corporate Warfare NDA" price={75000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
