'use client';

/**
 * FILE: sewa-rumah/index.tsx
 * STATUS: PRODUCTION READY (FIXED TS ERRORS)
 * DESC: Generator Surat Perjanjian Sewa Rumah / Properti dengan Standar Notaris/Legal Formal
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Home, Store, Hotel, 
  BadgeDollarSign, Users, Key, ChevronDown, Check, Edit3, Eye, RotateCcw, MapPin, ArrowLeftCircle, UserCheck, CalendarDays, FileText, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  
  // Pihak Pertama (Pemilik)
  ownerName: string;
  ownerNik: string;
  ownerPob: string;
  ownerDob: string;
  ownerOccupation: string;
  ownerAddress: string;

  // Pihak Kedua (Penyewa)
  tenantName: string;
  tenantNik: string;
  tenantPob: string;
  tenantDob: string;
  tenantOccupation: string;
  tenantAddress: string;

  // Properti
  type: string;
  addressProp: string;
  facilities: string;
  purpose: string;
  
  // Ketentuan Sewa
  startDate: string;
  endDate: string;
  duration: string;
  
  // Harga dan Pembayaran
  price: number;
  priceText: string;
  paymentMethod: string;
  paymentTerms: string;
  deposit: number;

  // Sanksi & Pengosongan
  latePenalty: number;
  evictionDaysLimit: number;
  
  // Saksi
  witness1: string;
  witness2: string;
}

interface TemplateOption {
  id: number;
  name: string;
  desc: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'SURABAYA',
  date: '', 
  
  ownerName: 'H. ABDUL ROFIQ',
  ownerNik: '3578010101700001',
  ownerPob: 'Surabaya',
  ownerDob: '1970-01-01',
  ownerOccupation: 'Wiraswasta',
  ownerAddress: 'Jl. Darmo Permai No. 10, RT 001/RW 002, Kelurahan Darmo, Kecamatan Dukuh Pakis, Kota Surabaya',
  
  tenantName: 'BUDI SANTOSO',
  tenantNik: '3578010101850005',
  tenantPob: 'Sidoarjo',
  tenantDob: '1985-05-15',
  tenantOccupation: 'Karyawan Swasta',
  tenantAddress: 'Jl. Ahmad Yani No. 5, RT 003/RW 004, Kelurahan Gedangan, Kecamatan Gedangan, Kabupaten Sidoarjo',
  
  type: 'RUMAH TINGGAL',
  addressProp: 'Perumahan Graha Famili Blok B-10, Surabaya',
  facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit, Pompa Air, Gordyn',
  purpose: 'Tempat Tinggal Keluarga',
  
  startDate: '2026-03-01',
  endDate: '2028-03-01',
  duration: '2 (Dua)',
  
  price: 75000000,
  priceText: 'Tujuh Puluh Lima Juta Rupiah',
  paymentMethod: 'LUNAS SEKALIGUS',
  paymentTerms: 'Ditransfer ke Rekening BCA 1234567890 a.n H. ABDUL ROFIQ pada saat penandatanganan perjanjian ini',
  deposit: 5000000,

  latePenalty: 100000,
  evictionDaysLimit: 14,
  
  witness1: 'Ketua RT Setempat',
  witness2: 'Ketua RW Setempat'
};

export default function SewaPropertiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Loading...</div>}>
      <RentalAgreementBuilder />
    </Suspense>
  );
}

function RentalAgreementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'properti' | 'harga'>('pihak1');

  const TEMPLATES: TemplateOption[] = [
    { id: 1, name: "Legal Formal (Enterprise)", desc: "Pasal lengkap standar Notaris (Auto-page)" },
    { id: 2, name: "Ringkas / Kost", desc: "Simple & Padat (1 Halaman)" }
  ];
  
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name || "Pilih Template";

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyPreset = (type: 'rumah' | 'ruko' | 'kost') => {
    if (type === 'rumah') {
      setData(prev => ({ ...prev, type: 'RUMAH TINGGAL', purpose: 'Tempat Tinggal Keluarga', duration: '1 (Satu)', price: 35000000, priceText: 'Tiga Puluh Lima Juta Rupiah' }));
      setTemplateId(1);
    } else if (type === 'ruko') {
      setData(prev => ({ ...prev, type: 'RUKO 2 LANTAI', purpose: 'Kantor / Tempat Usaha', duration: '2 (Dua)', price: 80000000, priceText: 'Delapan Puluh Juta Rupiah' }));
      setTemplateId(1);
    } else if (type === 'kost') {
      setData(prev => ({ ...prev, type: 'KAMAR KOST', purpose: 'Hunian Mahasiswa', duration: '6 (Enam) Bulan', price: 1500000, priceText: 'Satu Juta Lima Ratus Ribu Rupiah' }));
      setTemplateId(2);
    }
  };

  // --- KOMPONEN HALAMAN ---
  const A4Document = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white block box-border text-black leading-normal p-[20mm] w-[210mm] min-h-[297mm] h-auto shadow-2xl print:shadow-none print:m-0 print:h-auto print:w-[210mm] print:p-[20mm] relative mb-10 print:mb-0">
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { 
            const date = new Date(dateString);
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        } catch { 
            return dateString; 
        }
    };
    
    const getDayName = (dateString: string) => {
        if(!dateString) return '...';
        try {
            const date = new Date(dateString);
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            return days[date.getDay()];
        } catch {
            return '...';
        }
    }

    return (
      <div className={`flex flex-col items-center font-serif text-[10.5pt]`}>
        {templateId === 1 ? (
          <A4Document>
            <div className="text-center mb-10">
              <h1 className="text-xl font-black uppercase underline tracking-[0.1em] mb-1">SURAT PERJANJIAN SEWA MENYEWA</h1>
              <p className="text-sm font-bold">NOMOR: ..... / {new Date(data.date).getFullYear() || '.....'}</p>
            </div>

            <div className="space-y-4 text-justify">
              <p>
                Pada hari ini, <strong>{getDayName(data.date)}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:
              </p>

              <ol className="list-[upper-roman] ml-8 space-y-6 mb-6">
                <li className="pl-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold uppercase">{data.ownerName}</span>
                    <div className="ml-4 space-y-1">
                      <div className="flex"><div className="w-40 shrink-0">NIK</div><div className="w-4 shrink-0">:</div><div>{data.ownerNik}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.ownerPob}, {formatDateSafe(data.ownerDob)}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.ownerOccupation}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Alamat</div><div className="w-4 shrink-0">:</div><div>{data.ownerAddress}</div></div>
                    </div>
                    <p className="mt-2">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (YANG MENYEWAKAN)</strong>.
                    </p>
                  </div>
                </li>
                
                <li className="pl-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold uppercase">{data.tenantName}</span>
                    <div className="ml-4 space-y-1">
                      <div className="flex"><div className="w-40 shrink-0">NIK</div><div className="w-4 shrink-0">:</div><div>{data.tenantNik}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Tempat, Tgl Lahir</div><div className="w-4 shrink-0">:</div><div>{data.tenantPob}, {formatDateSafe(data.tenantDob)}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.tenantOccupation}</div></div>
                      <div className="flex"><div className="w-40 shrink-0">Alamat</div><div className="w-4 shrink-0">:</div><div>{data.tenantAddress}</div></div>
                    </div>
                    <p className="mt-2">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA (PENYEWA)</strong>.
                    </p>
                  </div>
                </li>
              </ol>

              <p>
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>PARA PIHAK</strong>. PARA PIHAK menerangkan terlebih dahulu hal-hal sebagai berikut:
              </p>

              <ul className="list-disc ml-8 space-y-2">
                <li>Bahwa PIHAK PERTAMA adalah pemilik sah atas properti berupa {data.type} yang terletak di {data.addressProp}.</li>
                <li>Bahwa PIHAK KEDUA bermaksud untuk menyewa properti tersebut dari PIHAK PERTAMA untuk keperluan {data.purpose}.</li>
              </ul>

              <p>
                Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Sewa Menyewa (selanjutnya disebut &quot;Perjanjian&quot;) dengan syarat dan ketentuan yang diatur dalam pasal-pasal berikut:
              </p>

              {/* PASAL 1 */}
              <div className="pt-4">
                <h2 className="text-center font-bold mb-3">PASAL 1<br/>OBJEK PERJANJIAN</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">PIHAK PERTAMA dengan ini menyewakan kepada PIHAK KEDUA dan PIHAK KEDUA dengan ini menerima sewa dari PIHAK PERTAMA berupa {data.type} yang beralamat di {data.addressProp} (selanjutnya disebut &quot;Objek Sewa&quot;).</li>
                  <li className="pl-2">Fasilitas yang terdapat pada Objek Sewa dan diserahkan penggunaannya kepada PIHAK KEDUA meliputi: {data.facilities}.</li>
                  <li className="pl-2">PIHAK KEDUA akan menggunakan Objek Sewa semata-mata untuk keperluan {data.purpose} dan tidak dibenarkan digunakan untuk tujuan lain yang bertentangan dengan hukum dan kesusilaan, maupun hal-hal yang melanggar ketertiban umum.</li>
                </ol>
              </div>

              {/* PASAL 2 */}
              <div className="pt-4">
                <h2 className="text-center font-bold mb-3">PASAL 2<br/>JANGKA WAKTU</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">Perjanjian sewa menyewa ini dilangsungkan dan diterima untuk jangka waktu <strong>{data.duration} Tahun</strong>, terhitung sejak tanggal <strong>{formatDateSafe(data.startDate)}</strong> dan akan berakhir pada tanggal <strong>{formatDateSafe(data.endDate)}</strong>.</li>
                  <li className="pl-2">Apabila PIHAK KEDUA bermaksud untuk memperpanjang jangka waktu sewa, maka PIHAK KEDUA wajib memberitahukan maksudnya tersebut kepada PIHAK PERTAMA selambat-lambatnya 1 (satu) bulan sebelum berakhirnya masa sewa.</li>
                  <li className="pl-2">Syarat dan ketentuan perpanjangan sewa termasuk besaran harga sewa akan ditentukan kemudian secara musyawarah dan mufakat oleh PARA PIHAK dan dituangkan dalam adendum tersendiri.</li>
                </ol>
              </div>

              {/* PASAL 3 */}
              <div className="pt-4 break-inside-avoid">
                <h2 className="text-center font-bold mb-3">PASAL 3<br/>HARGA DAN TATA CARA PEMBAYARAN</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">Harga sewa atas Objek Sewa disepakati oleh PARA PIHAK sebesar <strong>Rp {data.price.toLocaleString('id-ID')} ({data.priceText})</strong> untuk masa sewa sebagaimana dimaksud dalam Pasal 2 ayat (1).</li>
                  <li className="pl-2">Pembayaran harga sewa tersebut dilakukan oleh PIHAK KEDUA kepada PIHAK PERTAMA secara <strong>{data.paymentMethod}</strong> dengan ketentuan dan tata cara: {data.paymentTerms}.</li>
                  <li className="pl-2">Sebagai jaminan pemeliharaan Objek Sewa, PIHAK KEDUA wajib menyerahkan uang jaminan (deposit) sebesar <strong>Rp {data.deposit.toLocaleString('id-ID')}</strong> kepada PIHAK PERTAMA selambat-lambatnya pada saat penandatanganan Perjanjian ini.</li>
                  <li className="pl-2">Uang jaminan tersebut akan dikembalikan sepenuhnya oleh PIHAK PERTAMA kepada PIHAK KEDUA selambat-lambatnya 7 (tujuh) hari setelah berakhirnya Perjanjian, dengan ketentuan tidak ada tunggakan tagihan maupun kerusakan pada Objek Sewa yang menjadi tanggung jawab PIHAK KEDUA. Jika terdapat tunggakan atau kerusakan, uang jaminan tersebut akan dipotong terlebih dahulu untuk melunasinya.</li>
                  <li className="pl-2">Apabila PIHAK KEDUA terlambat melakukan pembayaran sewa dari waktu jatuh tempo yang telah disepakati, maka PIHAK KEDUA dikenakan denda keterlambatan sebesar <strong>Rp {data.latePenalty.toLocaleString('id-ID')}</strong> untuk setiap hari keterlambatan, yang wajib dibayar secara tunai.</li>
                  <li className="pl-2">Apabila keterlambatan pembayaran sewa (tunggakan) oleh PIHAK KEDUA berlangsung melewati batas waktu <strong>{data.evictionDaysLimit} hari</strong> berturut-turut, maka PIHAK PERTAMA berhak penuh secara sepihak untuk membatalkan Perjanjian ini, memutus fasilitas (aliran listrik dan air), serta melakukan tindakan <strong>pengosongan paksa</strong> atas Objek Sewa dari barang-barang milik PIHAK KEDUA tanpa memerlukan teguran tertulis lebih lanjut maupun putusan/penetapan dari Pengadilan. Segala resiko dan biaya yang timbul akibat pengosongan paksa tersebut menjadi tanggung jawab PIHAK KEDUA sepenuhnya.</li>
                </ol>
              </div>

              {/* PASAL 4 */}
              <div className="pt-4 break-inside-avoid">
                <h2 className="text-center font-bold mb-3">PASAL 4<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">PIHAK PERTAMA berhak menerima pembayaran harga sewa dan uang jaminan sesuai dengan nominal dan tata cara yang disepakati dalam Pasal 3.</li>
                  <li className="pl-2">PIHAK PERTAMA wajib menyerahkan Objek Sewa beserta kunci dan fasilitasnya kepada PIHAK KEDUA dalam keadaan baik dan siap pakai selambat-lambatnya pada tanggal dimulainya masa sewa.</li>
                  <li className="pl-2">PIHAK PERTAMA menjamin bahwa Objek Sewa adalah hak miliknya yang sah, tidak dalam sengketa, tidak sedang disita, dan bebas dari tuntutan pihak ketiga manapun.</li>
                  <li className="pl-2">PIHAK PERTAMA menjamin bahwa selama masa sewa, PIHAK KEDUA dapat menempati dan menggunakan Objek Sewa secara aman dan damai tanpa gangguan dari PIHAK PERTAMA maupun pihak lain yang mengatasnamakan PIHAK PERTAMA.</li>
                </ol>
              </div>

              {/* PASAL 5 */}
              <div className="pt-4">
                <h2 className="text-center font-bold mb-3">PASAL 5<br/>HAK DAN KEWAJIBAN PIHAK KEDUA</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">PIHAK KEDUA berhak untuk menempati, menggunakan, dan menikmati Objek Sewa beserta fasilitasnya selama masa sewa sesuai dengan peruntukannya.</li>
                  <li className="pl-2">PIHAK KEDUA wajib melakukan pembayaran harga sewa secara tepat waktu sesuai dengan ketentuan Pasal 3.</li>
                  <li className="pl-2">PIHAK KEDUA wajib memelihara dan merawat Objek Sewa beserta fasilitasnya dengan sebaik-baiknya atas biaya sendiri. Kerusakan ringan yang terjadi akibat pemakaian wajar menjadi tanggung jawab PIHAK KEDUA. Sedang kerusakan berat pada struktur bangunan di luar kesalahan PIHAK KEDUA menjadi tanggung jawab PIHAK PERTAMA.</li>
                  <li className="pl-2">PIHAK KEDUA wajib menanggung dan membayar segala tagihan pemakaian listrik, air, telepon, internet, iuran keamanan, kebersihan lingkungan, dan biaya operasional lainnya yang timbul sehubungan dengan penggunaan Objek Sewa selama masa sewa.</li>
                  <li className="pl-2">PIHAK KEDUA dilarang menyewakan kembali (sublet), mengoperalihkan hak sewa, atau menjaminkan Objek Sewa kepada pihak ketiga manapun baik sebagian maupun seluruhnya tanpa persetujuan tertulis dari PIHAK PERTAMA.</li>
                  <li className="pl-2">PIHAK KEDUA tidak diperkenankan melakukan perubahan struktur atau bentuk bangunan Objek Sewa (membongkar tembok, mengubah tata letak) tanpa persetujuan tertulis dari PIHAK PERTAMA. Segala perubahan yang diizinkan dan telah melekat pada bangunan tidak dapat dituntut ganti ruginya saat sewa berakhir, kecuali disepakati lain.</li>
                </ol>
              </div>

              {/* PASAL 6 */}
              <div className="pt-4 break-inside-avoid">
                <h2 className="text-center font-bold mb-3">PASAL 6<br/>BERAKHIRNYA PERJANJIAN DAN PENYERAHAN KEMBALI</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">Perjanjian ini berakhir dengan sendirinya apabila jangka waktu sewa sebagaimana diatur dalam Pasal 2 ayat (1) telah habis dan tidak diperpanjang lagi.</li>
                  <li className="pl-2">PIHAK PERTAMA berhak membatalkan Perjanjian ini secara sepihak dan menuntut pengosongan Objek Sewa apabila PIHAK KEDUA melanggar ketentuan Pasal 5 Perjanjian ini, setelah diberikan teguran tertulis sebanyak 3 (tiga) kali berturut-turut. Aturan pengosongan sepihak akibat tunggakan pembayaran sewa tunduk pada ketentuan Pasal 3 ayat (6).</li>
                  <li className="pl-2">Pada saat berakhirnya masa sewa, PIHAK KEDUA wajib mengosongkan dan menyerahkan kembali Objek Sewa beserta fasilitas dan kuncinya kepada PIHAK PERTAMA dalam keadaan baik dan terpelihara seperti keadaan semula, selambat-lambatnya 7 (tujuh) hari kalender sejak tanggal berakhirnya masa sewa.</li>
                  <li className="pl-2">Apabila PIHAK KEDUA terlambat menyerahkan kembali Objek Sewa setelah batas waktu yang ditentukan, maka PIHAK KEDUA akan dikenakan denda keterlambatan penyerahan kembali sebesar <strong>Rp 1.000.000,- (Satu Juta Rupiah)</strong> untuk setiap hari keterlambatan, yang wajib dibayarkan secara tunai dan seketika kepada PIHAK PERTAMA.</li>
                </ol>
              </div>

              {/* PASAL 7 */}
              <div className="pt-4 break-inside-avoid">
                <h2 className="text-center font-bold mb-3">PASAL 7<br/>KEADAAN KAHAR (FORCE MAJEURE)</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">Yang dimaksud dengan Keadaan Kahar (Force Majeure) adalah kejadian-kejadian di luar kemampuan dan kekuasaan PARA PIHAK yang mengakibatkan tidak dapat dilaksanakannya hak dan kewajiban berdasarkan Perjanjian ini, termasuk namun tidak terbatas pada bencana alam (gempa bumi, banjir bandang), kebakaran, perang, huru-hara, pemberontakan, pemogokan massal, dan perubahan peraturan pemerintah.</li>
                  <li className="pl-2">Dalam hal terjadinya Keadaan Kahar, pihak yang mengalami hambatan wajib memberitahukan kepada pihak lainnya secara tertulis selambat-lambatnya 7 (tujuh) hari kalender sejak terjadinya keadaan tersebut beserta bukti pendukung dari instansi berwenang.</li>
                  <li className="pl-2">Kerugian yang timbul pada Objek Sewa maupun pada pelaksaanaan perjanjian ini akibat Keadaan Kahar akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mufakat.</li>
                </ol>
              </div>

              {/* PASAL 8 */}
              <div className="pt-4 break-inside-avoid">
                <h2 className="text-center font-bold mb-3">PASAL 8<br/>PENYELESAIAN SENGKETA DAN KETENTUAN PENUTUP</h2>
                <ol className="list-decimal ml-8 space-y-2">
                  <li className="pl-2">Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian ini akan diatur kemudian oleh PARA PIHAK secara musyawarah dan dituangkan dalam suatu Adendum yang merupakan kesatuan dan bagian yang tak terpisahkan dari Perjanjian ini.</li>
                  <li className="pl-2">Segala perselisihan yang timbul akibat pelaksanaan atau penafsiran Perjanjian ini akan diselesaikan terlebih dahulu secara musyawarah untuk mufakat oleh PARA PIHAK.</li>
                  <li className="pl-2">Apabila penyelesaian secara musyawarah tidak berhasil mencapai mufakat dalam waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan perselisihan tersebut melalui jalur hukum dan memilih domisili hukum yang umum dan tetap di Kepaniteraan Pengadilan Negeri {data.city}.</li>
                  <li className="pl-2">Perjanjian ini dibuat, disetujui, dan ditandatangani di {data.city} pada hari dan tanggal sebagaimana disebutkan pada awal Perjanjian, dibuat dalam rangkap 2 (dua) yang masing-masing bermeterai cukup dan memiliki kekuatan hukum yang sama bagi PARA PIHAK.</li>
                </ol>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-16 break-inside-avoid">
                <div className="flex justify-between px-8">
                  <div className="w-1/2 text-center flex flex-col items-center">
                    <p className="font-bold">PIHAK KEDUA</p>
                    <p className="font-bold mb-24">(PENYEWA)</p>
                    <p className="font-bold underline uppercase">{data.tenantName}</p>
                  </div>
                  <div className="w-1/2 text-center flex flex-col items-center">
                    <p className="font-bold">PIHAK PERTAMA</p>
                    <p className="font-bold mb-4">(YANG MENYEWAKAN)</p>
                    <div className="border-2 border-dashed border-slate-300 w-20 h-24 mb-6 flex items-center justify-center text-[10px] text-slate-400 italic">
                      Meterai<br/>10.000
                    </div>
                    <p className="font-bold underline uppercase">{data.ownerName}</p>
                  </div>
                </div>

                {/* SAKSI */}
                {(data.witness1 || data.witness2) && (
                  <div className="mt-16 text-center break-inside-avoid">
                    <p className="font-bold mb-20 uppercase tracking-widest text-sm">Saksi - Saksi</p>
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 text-center flex flex-col items-center">
                        <p className="font-bold underline uppercase">{data.witness1 || '...................................'}</p>
                        <p className="text-xs">Saksi I</p>
                      </div>
                      <div className="w-1/2 text-center flex flex-col items-center">
                        <p className="font-bold underline uppercase">{data.witness2 || '...................................'}</p>
                        <p className="text-xs">Saksi II</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </A4Document>
        ) : (
          <A4Document>
              <div className="text-center mb-8 border-b-2 border-black pb-2">
                <h1 className="text-xl font-black uppercase underline tracking-[0.1em]">PERJANJIAN SEWA RINGKAS</h1>
              </div>
              <div className="space-y-6 text-[11pt] text-justify">
                  <p>Pada hari ini tanggal <strong>{formatDateSafe(data.date)}</strong> di {data.city}, telah dibuat kesepakatan sewa menyewa antara:</p>
                  
                  <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <div>
                        <p className="text-[9pt] font-black text-slate-500 uppercase mb-2">Pihak Pertama (Pemilik)</p>
                        <p className="font-bold uppercase">{data.ownerName}</p>
                        <p className="text-[10pt]">NIK: {data.ownerNik}</p>
                      </div>
                      <div>
                        <p className="text-[9pt] font-black text-slate-500 uppercase mb-2">Pihak Kedua (Penyewa)</p>
                        <p className="font-bold uppercase">{data.tenantName}</p>
                        <p className="text-[10pt]">NIK: {data.tenantNik}</p>
                      </div>
                  </div>

                  <p>PIHAK PERTAMA dengan ini menyewakan kepada PIHAK KEDUA properti berupa <strong>{data.type}</strong> yang beralamat di <strong>{data.addressProp}</strong> dengan ketentuan sebagai berikut:</p>
                  
                  <ol className="list-decimal ml-8 space-y-3">
                      <li className="pl-2">Masa sewa berlaku selama <strong>{data.duration}</strong> mulai tanggal <strong>{formatDateSafe(data.startDate)}</strong> s/d <strong>{formatDateSafe(data.endDate)}</strong>.</li>
                      <li className="pl-2">Harga sewa disepakati sebesar <strong>Rp {data.price.toLocaleString('id-ID')}</strong> yang dibayarkan secara {data.paymentMethod}.</li>
                      <li className="pl-2">Apabila terjadi keterlambatan pembayaran sewa, PIHAK KEDUA dikenakan denda <strong>Rp {data.latePenalty.toLocaleString('id-ID')}</strong> per hari. Jika tunggakan melewati <strong>{data.evictionDaysLimit} hari</strong>, PIHAK PERTAMA berhak melakukan pemutusan aliran listrik/air dan tindakan pengosongan paksa secara sepihak.</li>
                      <li className="pl-2">PIHAK KEDUA menyerahkan Deposit Jaminan sebesar <strong>Rp {data.deposit.toLocaleString('id-ID')}</strong> yang akan dikembalikan di akhir masa sewa jika tidak ada kerusakan atau tunggakan.</li>
                      <li className="pl-2">Seluruh biaya pemakaian listrik, air, dan iuran lingkungan selama masa sewa menjadi tanggungan sepenuhnya dari PIHAK KEDUA.</li>
                      <li className="pl-2">PIHAK KEDUA dilarang menyewakan kembali properti kepada pihak lain atau melakukan perubahan bentuk bangunan tanpa izin tertulis dari PIHAK PERTAMA.</li>
                  </ol>

                  <p className="pt-4">Demikian perjanjian ini dibuat dengan sebenar-benarnya tanpa paksaan dari pihak manapun untuk dipatuhi dan dilaksanakan oleh kedua belah pihak.</p>

                  <div className="mt-20 grid grid-cols-2 gap-20 text-center break-inside-avoid">
                      <div className="flex flex-col items-center">
                        <p className="mb-24 font-bold uppercase text-[9pt] text-slate-500 tracking-widest">Penyewa</p>
                        <p className="font-bold underline uppercase">{data.tenantName}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="mb-2 font-bold uppercase text-[9pt] text-slate-500 tracking-widest">Pemilik</p>
                        <div className="border border-slate-300 w-20 h-16 mx-auto flex items-center justify-center text-[8pt] text-slate-400 italic mb-6">Materai</div>
                        <p className="font-bold underline uppercase">{data.ownerName}</p>
                      </div>
                  </div>
              </div>
          </A4Document>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter">
               <Home size={16} /> <span>Sewa Rumah & Properti (Enterprise)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest hover:bg-slate-700">
                <LayoutTemplate size={14} className="text-amber-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-900 font-sans">
                  {TEMPLATES.map((t: TemplateOption) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-amber-50 transition-colors ${templateId === t.id ? 'bg-amber-50 text-amber-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-amber-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI - EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Draft Editor</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset Data"><RotateCcw size={16}/></button>
           </div>

           {/* Tab Navigasi Editor */}
           <div className="flex px-2 pt-2 bg-slate-50 border-b overflow-x-auto hide-scrollbar">
              <button onClick={() => setActiveTab('pihak1')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === 'pihak1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>Pihak Pertama</button>
              <button onClick={() => setActiveTab('pihak2')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === 'pihak2' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>Pihak Kedua</button>
              <button onClick={() => setActiveTab('properti')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === 'properti' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400 hover:text-slate-600'}`}>Properti</button>
              <button onClick={() => setActiveTab('harga')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === 'harga' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-600'}`}>Harga & Ketentuan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32 font-sans bg-white print:block print:overflow-visible print:bg-white">
              
              {/* HEADER UMUM */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Kota Perjanjian</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Tanggal Perjanjian</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>

              {/* TAB 1: PIHAK PERTAMA */}
              {activeTab === 'pihak1' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    <UserCheck size={16} className="text-blue-500" />
                    <h3 className="text-xs font-black uppercase text-blue-700 tracking-widest">Identitas Pemilik</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Nama Lengkap (Sesuai KTP)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Misal: H. ABDUL ROFIQ" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="16 Digit NIK" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase">Tempat Lahir</label>
                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerPob} onChange={e => handleDataChange('ownerPob', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase">Tanggal Lahir</label>
                        <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerDob} onChange={e => handleDataChange('ownerDob', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Pekerjaan</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerOccupation} onChange={e => handleDataChange('ownerOccupation', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                      <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PIHAK KEDUA */}
              {activeTab === 'pihak2' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    <Users size={16} className="text-emerald-500" />
                    <h3 className="text-xs font-black uppercase text-emerald-700 tracking-widest">Identitas Penyewa</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Nama Lengkap (Sesuai KTP)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantName} onChange={e => handleDataChange('tenantName', e.target.value)} placeholder="Misal: BUDI SANTOSO" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantNik} onChange={e => handleDataChange('tenantNik', e.target.value)} placeholder="16 Digit NIK" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase">Tempat Lahir</label>
                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantPob} onChange={e => handleDataChange('tenantPob', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase">Tanggal Lahir</label>
                        <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantDob} onChange={e => handleDataChange('tenantDob', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Pekerjaan</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantOccupation} onChange={e => handleDataChange('tenantOccupation', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                      <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tenantAddress} onChange={e => handleDataChange('tenantAddress', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROPERTI */}
              {activeTab === 'properti' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 mb-4">
                     <button onClick={() => applyPreset('rumah')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-emerald-600 hover:text-white transition-all"><Home size={14}/> RUMAH</button>
                     <button onClick={() => applyPreset('ruko')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-blue-600 hover:text-white transition-all"><Store size={14}/> RUKO</button>
                     <button onClick={() => applyPreset('kost')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex flex-col items-center gap-1 hover:bg-amber-600 hover:text-white transition-all"><Hotel size={14}/> KOST</button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    <MapPin size={16} className="text-amber-500" />
                    <h3 className="text-xs font-black uppercase text-amber-700 tracking-widest">Detail Objek Sewa</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Jenis Properti</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Cth: Rumah Tinggal, Ruko 2 Lantai" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Alamat Properti yang Disewakan</label>
                      <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={data.addressProp} onChange={e => handleDataChange('addressProp', e.target.value)} placeholder="Alamat lengkap properti..." />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Fasilitas Termasuk</label>
                      <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={data.facilities} onChange={e => handleDataChange('facilities', e.target.value)} placeholder="Listrik 2200W, Air PDAM, AC, dll..." />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Tujuan Penggunaan (Peruntukan)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Cth: Tempat Tinggal Keluarga, Usaha Cafe" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: HARGA & KETENTUAN */}
              {activeTab === 'harga' && (
                <div className="space-y-5 animate-fadeIn pb-10">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    <CalendarDays size={16} className="text-purple-500" />
                    <h3 className="text-xs font-black uppercase text-purple-700 tracking-widest">Durasi Sewa</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-500 uppercase">TGL MULAI</label><input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-500 uppercase">TGL BERAKHIR</label><input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase">Durasi Disebutkan (Teks)</label>
                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Cth: 2 (Dua)" />
                  </div>

                  <div className="flex items-center gap-2 mb-2 pt-4 pb-2 border-b border-slate-200">
                    <BadgeDollarSign size={16} className="text-purple-500" />
                    <h3 className="text-xs font-black uppercase text-purple-700 tracking-widest">Harga & Pembayaran</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Harga Sewa Total (Rp)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-black text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value) || 0)} type="number" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Terbilang (Harga Sewa)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs italic focus:ring-2 focus:ring-purple-500 outline-none" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} placeholder="Tujuh Puluh Lima Juta Rupiah" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Metode Pembayaran</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)}>
                        <option value="LUNAS SEKALIGUS">LUNAS SEKALIGUS</option>
                        <option value="BERTAHAP / CICILAN">BERTAHAP / CICILAN</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Detail Syarat & Rekening Pembayaran</label>
                      <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} placeholder="Ditransfer ke Rekening BCA..." />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Uang Jaminan (Deposit) - Rp</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none" value={data.deposit} onChange={e => handleDataChange('deposit', parseInt(e.target.value) || 0)} type="number" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 pt-4 pb-2 border-b border-slate-200">
                    <AlertTriangle size={16} className="text-red-500" />
                    <h3 className="text-xs font-black uppercase text-red-700 tracking-widest">Sanksi & Pengosongan</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Denda Keterlambatan / Hari (Rp)</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-black text-slate-900 focus:ring-2 focus:ring-red-500 outline-none" value={data.latePenalty} onChange={e => handleDataChange('latePenalty', parseInt(e.target.value) || 0)} type="number" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase">Batas Menunggak (Hari) Sblm Pengosongan</label>
                      <input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-black text-slate-900 focus:ring-2 focus:ring-red-500 outline-none" value={data.evictionDaysLimit} onChange={e => handleDataChange('evictionDaysLimit', parseInt(e.target.value) || 0)} type="number" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 pt-4 pb-2 border-b border-slate-200">
                    <FileText size={16} className="text-slate-500" />
                    <h3 className="text-xs font-black uppercase text-slate-700 tracking-widest">Saksi - Saksi (Opsional)</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-500 uppercase">Saksi 1</label><input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-black text-slate-500 uppercase">Saksi 2</label><input className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} /></div>
                  </div>
                </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN - PREVIEW SURAT */}
        <div className={`flex-1 h-full bg-slate-300/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.7] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-0 shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold text-xs uppercase">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName={`Perjanjian_Sewa_${data.tenantName.replace(/\s+/g, '_')}`} price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
