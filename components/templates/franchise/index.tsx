'use client';

/**
 * FILE: FranchisePage.tsx
 * STATUS: PRODUCTION READY (WITH MONETIZATION)
 * DESC: Generator Perjanjian Waralaba / Franchise Agreement (Enterprise Legal Draft)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, 
  Store, 
  FileText, 
  BadgeCheck, 
  Coins, 
  LayoutTemplate, 
  ChevronDown, 
  Edit3, 
  Eye, 
  RotateCcw, 
  ArrowLeftCircle,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
// Pastikan file ini ada di: src/components/DocumentServices.tsx atau sesuai struktur project
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface FranchiseData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak 1 (Franchisor)
  p1Name: string;
  p1KTP: string;
  p1POB: string;
  p1DOB: string;
  p1Job: string;
  p1Address: string;
  p1Company: string;
  p1Title: string;
  p1Brand: string;

  // Pihak 2 (Franchisee)
  p2Name: string;
  p2KTP: string;
  p2POB: string;
  p2DOB: string;
  p2Job: string;
  p2Address: string;
  p2Location: string;

  // Komersial
  franchiseFee: string;
  royaltyFee: string;
  marketingFee: string;
  penaltyFee: string;
  contractDuration: string;
  exclusiveRadius: string;

  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: FranchiseData = {
  city: 'JAKARTA',
  date: '', 
  docNo: 'FRA/LGL/2026/012',
  
  p1Name: 'DODI PRASETYO',
  p1KTP: '3171234567890001',
  p1POB: 'Jakarta',
  p1DOB: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Menara Bisnis Lt. 12, Jl. HR Rasuna Said, RT 001/RW 002, Kuningan, Jakarta Selatan',
  p1Company: 'PT. KULINER NUSANTARA JAYA',
  p1Title: 'Direktur Utama',
  p1Brand: 'Kopi Kenangan Rakyat',
  
  p2Name: 'IWAN SETIAWAN',
  p2KTP: '3273012345670001',
  p2POB: 'Bandung',
  p2DOB: '1985-08-20',
  p2Job: 'Karyawan Swasta',
  p2Address: 'Jl. Merdeka No. 88, RT 003/RW 005, Sumur Bandung, Kota Bandung, Jawa Barat',
  p2Location: 'Cihampelas Walk, Bandung (Unit G-05)',
  
  franchiseFee: 'Rp 150.000.000,- (Seratus Lima Puluh Juta Rupiah)',
  royaltyFee: '5% (Lima Persen)',
  marketingFee: '1% (Satu Persen)',
  penaltyFee: 'Rp 500.000.000,- (Lima Ratus Juta Rupiah)',
  contractDuration: '5 (Lima)',
  exclusiveRadius: '5 (Lima) Kilometer',
  
  witness1: 'SITI RAHMAWATI, S.H.',
  witness2: 'ANDI WIJAYA'
};

// --- 3. KOMPONEN UTAMA ---
export default function FranchisePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium font-sans bg-slate-50">Memuat Editor Franchise...</div>}>
      <FranchiseBuilder />
    </Suspense>
  );
}

function FranchiseBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<FranchiseData>(INITIAL_DATA);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  const handleDataChange = (field: keyof FranchiseData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Klasik Formal (Notaris)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Corporate
        </button>
    </div>
  );

  const ContentInside = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    const formatDateWithDay = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-justify text-black">
          <div className="text-center mb-8">
            <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-4">PERJANJIAN WARALABA (FRANCHISE)</h1>
            <p className="text-[10pt] font-sans mt-2 italic text-slate-500">Nomor: {data.docNo}</p>
          </div>

          <p className="mb-4">
            Pada hari ini, <b>{formatDateWithDay(data.date)}</b>, bertempat di <b>{data.city}</b>, yang bertanda tangan di bawah ini:
          </p>
          
          <div className="mb-6 pl-4 space-y-4">
              <div className="flex break-inside-avoid">
                  <span className="w-8 font-bold">I.</span>
                  <div className="flex-1 space-y-1">
                     <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div><b>{data.p1Name}</b></div></div>
                     <div className="flex"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div>{data.p1KTP}</div></div>
                     <div className="flex"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div>{data.p1POB}, {formatDateSafe(data.p1DOB)}</div></div>
                     <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div>{data.p1Job}</div></div>
                     <div className="flex"><div className="w-40 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1">{data.p1Address}</div></div>
                     <p className="mt-2 pt-2 border-t border-slate-200">
                        Dalam hal ini bertindak dalam jabatannya selaku <b>{data.p1Title}</b>, dari dan oleh karena itu bertindak untuk dan atas nama <b>{data.p1Company}</b>, selaku pemilik sah Merek Dagang <b>"{data.p1Brand}"</b>, yang selanjutnya dalam perjanjian ini disebut sebagai <b>PIHAK PERTAMA (FRANCHISOR)</b>.
                     </p>
                  </div>
              </div>
              <div className="flex break-inside-avoid mt-6">
                  <span className="w-8 font-bold">II.</span>
                  <div className="flex-1 space-y-1">
                     <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div><b>{data.p2Name}</b></div></div>
                     <div className="flex"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div>{data.p2KTP}</div></div>
                     <div className="flex"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div>{data.p2POB}, {formatDateSafe(data.p2DOB)}</div></div>
                     <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div>{data.p2Job}</div></div>
                     <div className="flex"><div className="w-40 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1">{data.p2Address}</div></div>
                     <p className="mt-2 pt-2 border-t border-slate-200">
                        Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku penerima hak lisensi waralaba, yang selanjutnya dalam perjanjian ini disebut sebagai <b>PIHAK KEDUA (FRANCHISEE)</b>.
                     </p>
                  </div>
              </div>
          </div>

          <p className="mb-4">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <b>"PARA PIHAK"</b>. PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:
          </p>
          <ul className="list-disc list-outside ml-8 mb-6 space-y-1 text-justify">
            <li className="pl-2">Bahwa, PIHAK PERTAMA adalah pemilik sah yang mengembangkan dan mengoperasikan sistem bisnis restoran/retail dengan Merek Dagang <b>"{data.p1Brand}"</b>.</li>
            <li className="pl-2">Bahwa, PIHAK KEDUA bermaksud untuk membuka dan mengoperasikan gerai dengan menggunakan merek, sistem operasional, dan standar layanan milik PIHAK PERTAMA.</li>
          </ul>

          <p className="mb-6">
            Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Waralaba ini dengan syarat dan ketentuan sebagaimana diatur dalam pasal-pasal berikut:
          </p>

          <div className="space-y-4 mb-8">
               <div className="break-inside-avoid">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 1<br/>DEFINISI DAN OBJEK PERJANJIAN</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2"><b>Waralaba (Franchise)</b> adalah perikatan dimana salah satu pihak diberikan hak memanfaatkan dan/atau menggunakan hak atas kekayaan intelektual (HAKI) atau penemuan atau ciri khas usaha yang dimiliki pihak lain dengan suatu imbalan berdasarkan persyaratan yang ditetapkan.</li>
                    <li className="pl-2">Objek dari perjanjian ini adalah pemberian hak lisensi waralaba secara non-eksklusif secara umum, namun eksklusif pada wilayah tertentu oleh PIHAK PERTAMA kepada PIHAK KEDUA untuk menjalankan operasional gerai di lokasi: <b>{data.p2Location}</b>.</li>
                    <li className="pl-2">Jangka waktu perjanjian ini disepakati selama <b>{data.contractDuration} Tahun</b>, terhitung secara efektif sejak tanggal penandatanganan Perjanjian ini oleh PARA PIHAK.</li>
                  </ol>
               </div>
               
               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 2<br/>PEMBATASAN WILAYAH EKSKLUSIF</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">PIHAK PERTAMA memberikan jaminan perlindungan wilayah eksklusif (<i>Exclusive Territory</i>) kepada PIHAK KEDUA dalam radius sejauh <b>{data.exclusiveRadius}</b> dari titik lokasi usaha PIHAK KEDUA yang telah disetujui.</li>
                    <li className="pl-2">Di dalam radius eksklusif sebagaimana dimaksud pada ayat (1) pasal ini, PIHAK PERTAMA dengan tegas dilarang untuk membuka gerai milik sendiri maupun menyetujui, menerbitkan, dan/atau memberikan lisensi waralaba baru kepada pihak lain dengan merek dagang yang sama.</li>
                  </ol>
               </div>

               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 3<br/>BIAYA WARALABA DAN ROYALTI</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">PIHAK KEDUA wajib membayar <i>Franchise Fee</i> (Biaya Hak Waralaba) senilai <b>{data.franchiseFee}</b> kepada PIHAK PERTAMA, yang dibayarkan lunas selambat-lambatnya 7 (tujuh) hari kalender setelah penandatanganan Perjanjian ini.</li>
                    <li className="pl-2">Selama masa operasional berlangsung, PIHAK KEDUA diwajibkan menyetorkan <i>Royalty Fee</i> sebesar <b>{data.royaltyFee}</b> dari total Omzet Kotor (<i>Gross Sales</i>) setiap bulannya, dibayarkan paling lambat tanggal 5 (lima) pada bulan berjalan berikutnya.</li>
                    <li className="pl-2">PIHAK KEDUA juga wajib menyetorkan <i>Marketing Fee</i> terpusat sebesar <b>{data.marketingFee}</b> dari total Omzet Kotor setiap bulannya untuk mendanai kampanye promosi dan pemasaran skala nasional yang dikelola oleh PIHAK PERTAMA.</li>
                  </ol>
               </div>

               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 4<br/>STANDAR OPERASIONAL PROSEDUR (SOP) DAN QUALITY CONTROL</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">PIHAK KEDUA wajib tunduk dan menjalankan usaha sepenuhnya sesuai dengan Standar Operasional Prosedur (SOP) mutlak yang ditetapkan oleh PIHAK PERTAMA, termasuk desain tata ruang outlet, seragam karyawan, standar baku pelayanan, dan resep penyajian produk.</li>
                    <li className="pl-2">Demi menjaga konsistensi kualitas merek, PIHAK KEDUA wajib melakukan pembelian seluruh bahan baku utama dan kemasan berlogo khusus <b>HANYA</b> dari PIHAK PERTAMA atau melalui daftar pemasok (<i>supplier</i>) resmi yang telah disetujui secara tertulis oleh PIHAK PERTAMA.</li>
                    <li className="pl-2">PIHAK PERTAMA berhak penuh melakukan audit laporan penjualan, inspeksi operasional, dan <i>Quality Control</i> secara berkala maupun insidental di lokasi gerai PIHAK KEDUA, dengan atau tanpa pemberitahuan sebelumnya.</li>
                  </ol>
               </div>

               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 5<br/>HAK DAN KEWAJIBAN PARA PIHAK</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2"><b>Hak dan Kewajiban PIHAK PERTAMA:</b>
                      <ul className="list-disc list-outside ml-6 mt-1 space-y-1">
                        <li className="pl-2">Berhak menerima pembayaran <i>Franchise Fee</i>, <i>Royalty Fee</i>, dan <i>Marketing Fee</i> secara tepat waktu dan sesuai perhitungan aktual.</li>
                        <li className="pl-2">Berkewajiban memberikan pelatihan awal (<i>Initial Training</i>) teknis dan manajerial kepada staf inti PIHAK KEDUA sebelum <i>Grand Opening</i>.</li>
                        <li className="pl-2">Berkewajiban menyediakan buku panduan SOP terkini, pembaharuan resep, serta dukungan konsultasi operasional yang berkesinambungan.</li>
                      </ul>
                    </li>
                    <li className="pl-2 mt-2"><b>Hak dan Kewajiban PIHAK KEDUA:</b>
                      <ul className="list-disc list-outside ml-6 mt-1 space-y-1">
                        <li className="pl-2">Berhak menggunakan Merek Dagang dan Sistem Operasional di lokasi yang telah ditetapkan.</li>
                        <li className="pl-2">Berkewajiban penuh untuk menjaga reputasi, nama baik merek, dan citra perusahaan PIHAK PERTAMA di mata konsumen dan publik.</li>
                        <li className="pl-2">Berkewajiban menyampaikan laporan keuangan, ringkasan transaksi kasir (<i>Point of Sales</i>), dan laporan persediaan (<i>Inventory</i>) bulanan secara transparan tanpa manipulasi kepada PIHAK PERTAMA.</li>
                      </ul>
                    </li>
                  </ol>
               </div>

               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 6<br/>SANKSI DAN PEMUTUSAN KONTRAK SEPIHAK (PENALTI)</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">Apabila PIHAK KEDUA terbukti melakukan pelanggaran berat yang meliputi: mencampur, memalsukan, menurunkan kualitas produk, menggunakan bahan baku ilegal/tidak resmi, dan/atau memanipulasi laporan omzet bulanan secara sengaja, maka PIHAK PERTAMA memiliki hak mutlak untuk <b>memutuskan perjanjian ini secara sepihak</b> saat itu juga.</li>
                    <li className="pl-2">Dalam hal terjadinya pemutusan kontrak sepihak akibat pelanggaran berat yang dilakukan oleh PIHAK KEDUA sebagaimana dimaksud pada ayat (1), maka PIHAK KEDUA wajib membayar denda penalti (ganti rugi reputasi) kepada PIHAK PERTAMA sebesar <b>{data.penaltyFee}</b> secara tunai selambat-lambatnya 14 (empat belas) hari setelah surat pemutusan diterbitkan.</li>
                    <li className="pl-2">Seluruh biaya (<i>Fee</i>) yang telah disetorkan oleh PIHAK KEDUA kepada PIHAK PERTAMA sebelum terjadinya pemutusan kontrak tidak dapat ditarik atau diminta kembali dengan alasan apapun.</li>
                  </ol>
               </div>
               
               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 7<br/>FORCE MAJEURE (KEADAAN KAHAR)</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">Yang dimaksud dengan <i>Force Majeure</i> adalah keadaan-keadaan di luar kekuasaan dan kendali PARA PIHAK yang mengakibatkan tidak dapat dilaksanakannya perjanjian ini, seperti bencana alam (gempa bumi, banjir bandang), pandemi global, huru-hara, perang, atau kebijakan/peraturan pemerintah yang secara langsung menghalangi kelangsungan usaha operasional gerai.</li>
                    <li className="pl-2">Pihak yang mengalami <i>Force Majeure</i> wajib memberitahukan kepada pihak lainnya secara tertulis selambat-lambatnya 7 (tujuh) hari kalender sejak terjadinya peristiwa tersebut guna merundingkan kelanjutan perjanjian.</li>
                  </ol>
               </div>

               <div className="break-inside-avoid pt-4">
                  <h3 className="font-bold text-center mb-2 text-[11pt]">PASAL 8<br/>PENYELESAIAN SENGKETA DAN DOMISILI HUKUM</h3>
                  <ol className="list-decimal list-outside ml-6 space-y-2 text-justify">
                    <li className="pl-2">Segala perselisihan, perbedaan penafsiran, atau sengketa yang timbul sebagai akibat dari pelaksanaan perjanjian ini akan diselesaikan terlebih dahulu melalui musyawarah mufakat (mediasi kekeluargaan).</li>
                    <li className="pl-2">Apabila musyawarah tidak mencapai mufakat dalam waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan perselisihan tersebut melalui jalur hukum, dan oleh karenanya memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri wilayah {data.city}.</li>
                  </ol>
               </div>
          </div>

          <div className="break-inside-avoid mt-8 pt-4">
            <p className="mb-8 text-sm italic text-justify">
              Demikian Perjanjian Waralaba ini dibuat dan ditandatangani oleh PARA PIHAK di {data.city} pada hari dan tanggal sebagaimana disebutkan pada awal perjanjian, dibuat dalam 2 (dua) rangkap asli, masing-masing dibubuhi materai yang cukup dan memiliki kekuatan hukum pembuktian yang sama.
            </p>
            <div className="flex justify-between items-start text-center mt-12">
               <div className="w-[45%]">
                  <p className="font-bold text-sm uppercase mb-24">PIHAK PERTAMA<br/>(FRANCHISOR)</p>
                  <p className="font-bold underline text-sm uppercase">{data.p1Name}</p>
                  <p className="text-xs">{data.p1Title} {data.p1Company}</p>
               </div>
               <div className="w-[45%]">
                  <p className="font-bold text-sm uppercase mb-24">PIHAK KEDUA<br/>(FRANCHISEE)</p>
                  <p className="font-bold underline text-sm uppercase">{data.p2Name}</p>
                  <p className="text-xs">Mitra Usaha</p>
               </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-300">
               <p className="font-bold text-sm uppercase tracking-widest text-center mb-16 text-slate-500">Saksi - Saksi</p>
               <div className="flex justify-around items-start text-center">
                  <div className="w-[40%]">
                     <p className="font-bold underline text-sm uppercase">{data.witness1}</p>
                     <p className="text-xs text-slate-500">Saksi I</p>
                  </div>
                  <div className="w-[40%]">
                     <p className="font-bold underline text-sm uppercase">{data.witness2}</p>
                     <p className="text-xs text-slate-500">Saksi II</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
    } else {
      // TEMPLATE 2: Modern Corporate
      return (
        <div className="font-sans text-[10pt] leading-snug text-slate-800">
          <div className="flex justify-between items-start border-b-4 border-blue-900 pb-4 mb-6 shrink-0">
              <div>
                 <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter leading-none">Franchise Agreement</h1>
                 <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">{data.p1Brand} Partnership Contract</p>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-bold text-slate-400 uppercase">Document Reference Number</div>
                 <div className="font-mono font-bold text-slate-900 text-sm">{data.docNo}</div>
              </div>
          </div>

          <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 mb-6 text-xs flex justify-between break-inside-avoid shadow-sm">
              <p>Effective Date: <b>{formatDateSafe(data.date)}</b></p>
              <p>Jurisdiction: <b>{data.city}, INDONESIA</b></p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest border-b border-blue-200 pb-2 flex items-center gap-2"><ShieldAlert size={14}/> Franchisor (Party 1)</h3>
                 <div className="space-y-2 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Company</span> <span className="font-bold text-sm">{data.p1Company}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Represented By</span> <b>{data.p1Name}</b> ({data.p1Title})</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">National ID (NIK)</span> {data.p1KTP}</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Registered Address</span> {data.p1Address}</p>
                 </div>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 mb-3 tracking-widest border-b border-emerald-200 pb-2 flex items-center gap-2"><Store size={14}/> Franchisee (Party 2)</h3>
                 <div className="space-y-2 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Partner Name</span> <span className="font-bold text-sm">{data.p2Name}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">National ID (NIK)</span> {data.p2KTP}</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Registered Address</span> {data.p2Address}</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Approved Location</span> <span className="text-emerald-700 font-bold">{data.p2Location}</span></p>
                 </div>
              </div>
          </div>

          <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Article 1 &mdash; Definitions and Grant of License</h4>
                 <p className="text-justify text-slate-600 text-xs mb-1">1.1 Franchisor grants Franchisee a conditional, non-exclusive general license, but an exclusive territorial license to operate a <b>"{data.p1Brand}"</b> outlet strictly at the Approved Location.</p>
                 <p className="text-justify text-slate-600 text-xs">1.2 This agreement is valid for a contract duration of <b>{data.contractDuration} Years</b> from the Effective Date.</p>
              </div>

              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Article 2 &mdash; Exclusive Territory</h4>
                 <p className="text-justify text-slate-600 text-xs">2.1 Franchisor guarantees an exclusive territory radius of <b>{data.exclusiveRadius}</b> from the Approved Location wherein no other identical franchise shall be established by the Franchisor or granted to third parties.</p>
              </div>

              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-2">Article 3 &mdash; Financial Obligations</h4>
                 <div className="grid grid-cols-3 gap-2 mt-1 mb-2">
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Franchise Fee (One-Time)</span>
                       <span className="font-bold text-[10px] text-blue-700">{data.franchiseFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Royalty Fee (Monthly)</span>
                       <span className="font-bold text-[10px] text-blue-700">{data.royaltyFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Marketing Fee (Monthly)</span>
                       <span className="font-bold text-[10px] text-blue-700">{data.marketingFee}</span>
                    </div>
                 </div>
              </div>

              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Article 4 &mdash; Operations & Quality Control (SOP)</h4>
                 <p className="text-justify text-slate-600 text-xs mb-1">4.1 Franchisee must strictly adhere to the Standard Operating Procedures (SOP) manual provided by the Franchisor.</p>
                 <p className="text-justify text-slate-600 text-xs">4.2 All primary raw materials and branded packaging must be procured exclusively from the Franchisor or certified authorized suppliers.</p>
              </div>

              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Article 5 &mdash; Sanctions & Unilateral Termination</h4>
                 <p className="text-justify text-slate-600 text-xs mb-1">5.1 Franchisor reserves the right to unilaterally terminate this Agreement immediately if the Franchisee commits severe breaches such as product adulteration, using unapproved raw materials, or intentional falsification of sales reports.</p>
                 <p className="text-justify text-slate-600 text-xs">5.2 Upon unilateral termination due to Franchisee's fault, Franchisee is liable to pay a reputation damage penalty amounting to <b>{data.penaltyFee}</b>.</p>
              </div>

              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Article 6 &mdash; Dispute Resolution</h4>
                 <p className="text-justify text-slate-600 text-xs">6.1 Any dispute arising out of this Agreement shall be resolved amicably. If unresolved within 30 days, it shall be submitted to the exclusive jurisdiction of the District Court of {data.city}.</p>
              </div>
          </div>

          <div className="flex items-end justify-between pt-8 border-t-2 border-slate-900 mt-auto break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">For and on behalf of<br/>Franchisor</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs uppercase">{data.p1Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">{data.p1Title} - {data.p1Company}</p>
              </div>
              <div className="text-center w-1/4">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Witnesses</p>
                 <div className="space-y-8 text-[9px]">
                    <p className="border-b border-slate-300 pb-1 uppercase font-bold">{data.witness1}</p>
                    <p className="border-b border-slate-300 pb-1 uppercase font-bold">{data.witness2}</p>
                 </div>
              </div>
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">For and on behalf of<br/>Franchisee</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs uppercase">{data.p2Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">Authorized Licensee</p>
              </div>
          </div>
        </div>
      );
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
            @page { size: A4 portrait; margin: 15mm; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: relative; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 25mm; display: table-header-group; } 
            .print-table tfoot { height: 25mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            .break-inside-avoid, tr, td { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block text-emerald-400">Waralaba <span className="text-white">Creator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Klasik Formal' : 'Modern Corporate'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>
               <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-widest"><Edit3 size={16} /> Isi Kontrak Waralaba</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

 <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 md:pb-10 custom-scrollbar print:flex print:overflow-visible print:bg-white">
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Identitas Dokumen</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold font-mono focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Perjanjian" />
                      <div className="grid grid-cols-2 gap-3">
                         <input type="text" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Penandatanganan" />
                         <input type="date" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><BadgeCheck size={12}/> Franchisor (Pihak 1)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1KTP} onChange={e => handleDataChange('p1KTP', e.target.value)} placeholder="NIK KTP" />
                      <div className="grid grid-cols-2 gap-3">
                         <input type="text" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1POB} onChange={e => handleDataChange('p1POB', e.target.value)} placeholder="Tempat Lahir" />
                         <input type="date" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1DOB} onChange={e => handleDataChange('p1DOB', e.target.value)} />
                      </div>
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                      <textarea className="w-full p-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" />
                      
                      <div className="border-t border-slate-100 pt-3 mt-3 space-y-3">
                         <div className="text-[10px] font-bold text-slate-400 uppercase">Data Perusahaan</div>
                         <input className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan (PT/CV)" />
                         <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} placeholder="Jabatan (cth: Direktur Utama)" />
                         <input className="w-full p-2 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Brand} onChange={e => handleDataChange('p1Brand', e.target.value)} placeholder="Merek Dagang Waralaba" />
                      </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Store size={12}/> Franchisee (Pihak 2)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2KTP} onChange={e => handleDataChange('p2KTP', e.target.value)} placeholder="NIK KTP" />
                      <div className="grid grid-cols-2 gap-3">
                         <input type="text" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2POB} onChange={e => handleDataChange('p2POB', e.target.value)} placeholder="Tempat Lahir" />
                         <input type="date" className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2DOB} onChange={e => handleDataChange('p2DOB', e.target.value)} />
                      </div>
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                      <textarea className="w-full p-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" />
                      
                      <div className="border-t border-slate-100 pt-3 mt-3">
                         <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><MapPin size={10}/> Lokasi Usaha (Outlet)</label>
                         <input className="w-full p-2 border border-blue-200 rounded-lg text-xs font-bold text-blue-800 bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Location} onChange={e => handleDataChange('p2Location', e.target.value)} placeholder="Alamat / Nama Mall Lokasi Outlet" />
                      </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Coins size={12}/> Finansial & Operasional</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold mb-1 block">Franchise Fee (Biaya Gabung)</label>
                        <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.franchiseFee} onChange={e => handleDataChange('franchiseFee', e.target.value)} placeholder="Rp..." />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold mb-1 block">Royalty Fee (Bulan)</label>
                            <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.royaltyFee} onChange={e => handleDataChange('royaltyFee', e.target.value)} placeholder="Misal: 5%" />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold mb-1 block">Marketing Fee</label>
                            <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.marketingFee} onChange={e => handleDataChange('marketingFee', e.target.value)} placeholder="Misal: 1%" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold mb-1 block">Radius Eksklusif (KM)</label>
                            <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.exclusiveRadius} onChange={e => handleDataChange('exclusiveRadius', e.target.value)} placeholder="Misal: 5 (Lima) KM" />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold mb-1 block">Durasi Kontrak (Tahun)</label>
                            <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Misal: 5" />
                        </div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <label className="text-[10px] text-red-600 font-bold mb-1 block flex items-center gap-1"><ShieldAlert size={12}/> Denda Pelanggaran (Penalti)</label>
                        <input className="w-full p-2 border border-red-200 rounded-lg text-xs text-red-700 font-bold focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.penaltyFee} onChange={e => handleDataChange('penaltyFee', e.target.value)} placeholder="Rp..." />
                      </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Edit3 size={12}/> Saksi-Saksi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                      <input className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
                  </div>
               </div>

            </div>
         </div>

 <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center print:flex print:overflow-visible print:bg-white print:static">
 <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:flex print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Waralaba (Franchise)" price={29000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white print:p-0"><ContentInside /></div>
      </div>
    </div>
  );
}
