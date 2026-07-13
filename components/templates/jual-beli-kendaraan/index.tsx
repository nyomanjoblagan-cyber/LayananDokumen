'use client';

import PrintWrapper from '@/components/PrintWrapper';
import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Car, 
  Bike, Users, FileCheck, Edit3, Eye, RotateCcw, ArrowLeftCircle,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SaleData {
  day: string; date: string; city: string;
  p1Name: string; p1Nik: string; p1BirthPlace: string; p1BirthDate: string; p1Job: string; p1Address: string;
  p2Name: string; p2Nik: string; p2BirthPlace: string; p2BirthDate: string; p2Job: string; p2Address: string;
  brand: string; type: string; year: string; color: string; nopol: string;
  frameNo: string; engineNo: string; bpkbNo: string;
  price: number; priceText: string; 
  paymentMethod: string; 
  paymentDetails: string;
  downPayment: number; downPaymentText: string;
  latePenaltyPerDay: number; latePenaltyText: string;
  taxObligation: string;
  witness1: string; witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SaleData = {
  day: 'Senin', date: '', city: 'JAKARTA SELATAN',
  p1Name: 'AGUS SETIAWAN', p1Nik: '3174010101850001', p1BirthPlace: 'Jakarta', p1BirthDate: '1985-01-01', p1Job: 'Karyawan Swasta', p1Address: 'Jl. Fatmawati No. 10, RT 001 RW 002, Kel. Cilandak Barat, Kec. Cilandak, Jakarta Selatan',
  p2Name: 'DONI PRATAMA', p2Nik: '3674010101900002', p2BirthPlace: 'Tangerang', p2BirthDate: '1990-02-02', p2Job: 'Wiraswasta', p2Address: 'Jl. Bintaro Utama Sektor 5, RT 003 RW 004, Kel. Jurang Mangu Timur, Kec. Pondok Aren, Tangerang Selatan',
  brand: 'Toyota', type: 'Avanza Veloz 1.5 AT', year: '2019', color: 'Putih Metalik', nopol: 'B 1234 ABC',
  frameNo: 'MHF1234567890', engineNo: '1NR-FE-123456', bpkbNo: 'N-12345678',
  price: 185000000, priceText: 'Seratus Delapan Puluh Lima Juta Rupiah', 
  paymentMethod: 'Transfer Bank', paymentDetails: 'Transfer ke Rekening BCA No. 1234567890 a.n AGUS SETIAWAN',
  downPayment: 10000000, downPaymentText: 'Sepuluh Juta Rupiah',
  latePenaltyPerDay: 500000, latePenaltyText: 'Lima Ratus Ribu Rupiah',
  taxObligation: 'Pihak Kedua (Pembeli)',
  witness1: 'Iwan', witness2: 'Santi'
};

export default function JualBeliKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Transaksi...</div>}>
      <VehicleSaleBuilder />
    </Suspense>
  );
}

function VehicleSaleBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SaleData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[today.getDay()];
    const dateString = today.toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: dateString, day: dayName }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: keyof SaleData, val: any) => setData(prev => ({ ...prev, [field]: val }));
  
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        setData({ ...INITIAL_DATA, date: today.toISOString().split('T')[0], day: days[today.getDay()] });
    }
  };

  const applyPreset = (type: 'motor' | 'mobil') => {
    if (type === 'motor') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Vario 150 CBS ISS', year: '2021', color: 'Hitam Doff', nopol: 'B 4567 TZY', price: 18500000, priceText: 'Delapan Belas Juta Lima Ratus Ribu Rupiah', downPayment: 2000000, downPaymentText: 'Dua Juta Rupiah', latePenaltyPerDay: 100000, latePenaltyText: 'Seratus Ribu Rupiah' }));
    } else if (type === 'mobil') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Brio Satya E CVT', year: '2020', color: 'Kuning (Carnival Yellow)', nopol: 'D 1888 AA', price: 145000000, priceText: 'Seratus Empat Puluh Lima Juta Rupiah', downPayment: 15000000, downPaymentText: 'Lima Belas Juta Rupiah', latePenaltyPerDay: 500000, latePenaltyText: 'Lima Ratus Ribu Rupiah' }));
    }
  }

  const activeTemplateName = templateId === 1 ? 'Legal Formal Enterprise' : 'Kwitansi Besar';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="font-serif text-black leading-relaxed text-[11pt] text-justify w-full h-full bg-white">
          {templateId === 1 && (
              <div className="flex flex-col h-full w-full">
                  <div className="text-center mb-6 shrink-0">
                     <h1 className="font-bold text-lg uppercase underline tracking-wide text-black">PERJANJIAN JUAL BELI KENDARAAN BERMOTOR</h1>
                     <p className="text-sm mt-1">Nomor: {data.nopol.replace(/\s+/g, '')}/{data.date.replace(/-/g, '')}</p>
                  </div>

                  <div className="flex-grow">
                      <p className="mb-4">Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:</p>

                      <ol className="list-decimal pl-6 mb-4 text-justify space-y-4">
                        <li className="pl-2">
                            <div className="font-bold uppercase">{data.p1Name}</div>
                            <ul className="list-none pl-0 space-y-1 mt-1 font-normal">
                            <li><span className="inline-block w-52">Nomor Induk Kependudukan</span>: {data.p1Nik}</li>
                            <li><span className="inline-block w-52">Tempat, Tanggal Lahir</span>: {data.p1BirthPlace}, {formatDateSafe(data.p1BirthDate)}</li>
                            <li><span className="inline-block w-52">Pekerjaan</span>: {data.p1Job}</li>
                            <li><span className="inline-block w-52 align-top">Alamat Sesuai KTP</span><span className="inline-block w-4 align-top">:</span><span className="inline-block w-[calc(100%-230px)] align-top">{data.p1Address}</span></li>
                            </ul>
                            <p className="mt-2">
                            Selaku pemilik sah kendaraan, yang untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (PENJUAL)</strong>.
                            </p>
                        </li>
                        <li className="pl-2">
                            <div className="font-bold uppercase">{data.p2Name}</div>
                            <ul className="list-none pl-0 space-y-1 mt-1 font-normal">
                            <li><span className="inline-block w-52">Nomor Induk Kependudukan</span>: {data.p2Nik}</li>
                            <li><span className="inline-block w-52">Tempat, Tanggal Lahir</span>: {data.p2BirthPlace}, {formatDateSafe(data.p2BirthDate)}</li>
                            <li><span className="inline-block w-52">Pekerjaan</span>: {data.p2Job}</li>
                            <li><span className="inline-block w-52 align-top">Alamat Sesuai KTP</span><span className="inline-block w-4 align-top">:</span><span className="inline-block w-[calc(100%-230px)] align-top">{data.p2Address}</span></li>
                            </ul>
                            <p className="mt-2">
                            Selaku pembeli kendaraan, yang untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA (PEMBELI)</strong>.
                            </p>
                        </li>
                      </ol>

                      <p className="mb-4">
                         PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut <strong>PARA PIHAK</strong>. PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:
                      </p>
                      
                      <ul className="list-disc pl-8 mb-4 space-y-2 text-justify">
                          <li>Bahwa PIHAK PERTAMA adalah pemilik sah yang memiliki hak penuh untuk mengalihkan hak milik atas 1 (satu) unit kendaraan bermotor beserta seluruh kelengkapannya.</li>
                          <li>Bahwa PIHAK KEDUA bermaksud untuk membeli kendaraan bermotor tersebut dari PIHAK PERTAMA secara sah menurut hukum yang berlaku di Indonesia.</li>
                      </ul>

                      <p className="mb-4">
                         Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Jual Beli Kendaraan Bermotor (selanjutnya disebut "Perjanjian") dengan syarat dan ketentuan yang diatur dalam pasal-pasal berikut:
                      </p>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 1<br/>OBJEK PERJANJIAN</div>
                         <p className="mb-2 indent-8">PIHAK PERTAMA dengan ini mengikatkan diri untuk menjual dan menyerahkan, dan PIHAK KEDUA dengan ini mengikatkan diri untuk membeli dan menerima penyerahan dari PIHAK PERTAMA, 1 (satu) unit kendaraan bermotor dengan spesifikasi sebagai berikut:</p>
                         <ul className="list-none pl-12 mb-2 space-y-1">
                             <li><span className="inline-block w-48">Merek</span>: {data.brand}</li>
                             <li><span className="inline-block w-48">Tipe / Model</span>: {data.type}</li>
                             <li><span className="inline-block w-48">Tahun Pembuatan</span>: {data.year}</li>
                             <li><span className="inline-block w-48">Warna Kendaraan</span>: {data.color}</li>
                             <li><span className="inline-block w-48">Nomor Polisi</span>: {data.nopol}</li>
                             <li><span className="inline-block w-48">Nomor Rangka</span>: {data.frameNo}</li>
                             <li><span className="inline-block w-48">Nomor Mesin</span>: {data.engineNo}</li>
                             <li><span className="inline-block w-48">Nomor BPKB</span>: {data.bpkbNo}</li>
                         </ul>
                         <p className="indent-8">Kendaraan tersebut di atas selanjutnya disebut sebagai <strong>"Kendaraan"</strong>.</p>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 2<br/>HARGA DAN TATA CARA PEMBAYARAN</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">Harga jual beli Kendaraan disepakati oleh PARA PIHAK sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{data.priceText}</em>).</li>
                            <li className="pl-2">Sebagai tanda jadi (<em>Down Payment</em>/Uang Muka), PIHAK KEDUA telah membayarkan sebesar <strong>{formatRupiah(data.downPayment)}</strong> (<em>{data.downPaymentText}</em>) kepada PIHAK PERTAMA.</li>
                            <li className="pl-2">Sisa pembayaran sebesar <strong>{formatRupiah(data.price - data.downPayment)}</strong> akan dibayarkan oleh PIHAK KEDUA kepada PIHAK PERTAMA secara <strong>{data.paymentMethod}</strong> {data.paymentMethod === 'Transfer Bank' ? `dengan rincian: ${data.paymentDetails}` : ''} pada saat penyerahan Kendaraan.</li>
                            <li className="pl-2">Penandatanganan Perjanjian ini oleh PIHAK PERTAMA sekaligus berlaku sebagai kuitansi/tanda terima pembayaran yang sah apabila pelunasan dilakukan pada hari yang sama.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 3<br/>PENYERAHAN KENDARAAN DAN DOKUMEN</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">PIHAK PERTAMA wajib menyerahkan Kendaraan beserta seluruh kunci dan dokumen kelengkapannya (BPKB asli, STNK asli, dan dokumen terkait lainnya) kepada PIHAK KEDUA selambat-lambatnya pada saat pembayaran dilunasi.</li>
                            <li className="pl-2">Terhitung sejak ditandatanganinya Berita Acara Serah Terima atau diserahkannya Kendaraan beserta dokumennya, maka segala risiko kehilangan, kerusakan, beban hukum, tanggung jawab pidana maupun perdata atas Kendaraan beralih sepenuhnya menjadi tanggung jawab PIHAK KEDUA.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2"><strong>Hak dan Kewajiban PIHAK PERTAMA:</strong>
                               <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                                  <li className="pl-2">Berhak menerima pembayaran lunas sesuai dengan nominal yang disepakati.</li>
                                  <li className="pl-2">Berkewajiban menyerahkan Kendaraan beserta seluruh dokumen aslinya yang sah kepada PIHAK KEDUA.</li>
                                  <li className="pl-2">Berkewajiban membantu proses administrasi pencabutan berkas (mutasi/balik nama) apabila diperlukan oleh PIHAK KEDUA.</li>
                               </ul>
                            </li>
                            <li className="pl-2 mt-2"><strong>Hak dan Kewajiban PIHAK KEDUA:</strong>
                               <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
                                  <li className="pl-2">Berhak menerima Kendaraan dalam kondisi sesuai dengan yang telah disepakati dan diperiksa sebelumnya (<em>as is where is basis</em>) beserta dokumen asli.</li>
                                  <li className="pl-2">Berkewajiban melakukan pembayaran secara penuh sesuai kesepakatan dalam Perjanjian ini.</li>
                               </ul>
                            </li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 5<br/>JAMINAN DAN PEMBEBASAN TUNTUTAN</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">PIHAK PERTAMA menjamin sepenuhnya bahwa Kendaraan adalah milik sah PIHAK PERTAMA, tidak sedang dalam sitaan, tidak dijaminkan kepada pihak lain, tidak dalam sengketa, dan tidak terkait tindak pidana apapun.</li>
                            <li className="pl-2">PIHAK PERTAMA menjamin bahwa nomor rangka dan nomor mesin Kendaraan adalah sesuai dengan yang tertera pada BPKB dan STNK.</li>
                            <li className="pl-2">Apabila di kemudian hari terbukti bahwa jaminan PIHAK PERTAMA tidak benar, maka PIHAK PERTAMA wajib membebaskan PIHAK KEDUA dari segala tuntutan hukum (pidana maupun perdata) dari pihak manapun dan mengembalikan seluruh uang yang telah dibayarkan PIHAK KEDUA secara penuh tanpa potongan apapun.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 6<br/>WANPRESTASI DAN PEMBATALAN SEPIHAK</div>
                         <p className="mb-2 indent-8">Dalam hal terjadi pembatalan sepihak atau kegagalan pemenuhan kewajiban (wanprestasi), maka berlaku ketentuan sebagai berikut:</p>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2"><strong>Pembatalan oleh Pembeli (PIHAK KEDUA):</strong> Apabila PIHAK KEDUA membatalkan Perjanjian ini secara sepihak atau gagal melunasi sisa pembayaran dalam waktu yang telah disepakati, maka Uang Muka (<em>Down Payment</em>) yang telah dibayarkan oleh PIHAK KEDUA dinyatakan <strong>HANGUS</strong> dan menjadi hak milik mutlak PIHAK PERTAMA sebagai ganti rugi.</li>
                            <li className="pl-2"><strong>Pembatalan oleh Penjual (PIHAK PERTAMA):</strong> Apabila PIHAK PERTAMA membatalkan Perjanjian ini secara sepihak sebelum pelunasan, maka PIHAK PERTAMA wajib mengembalikan Uang Muka (<em>Down Payment</em>) sebesar <strong>2 (dua) kali lipat</strong> kepada PIHAK KEDUA secara seketika dan sekaligus, paling lambat 1x24 jam setelah pernyataan pembatalan.</li>
                            <li className="pl-2"><strong>Keterlambatan Penyerahan:</strong> Apabila setelah pelunasan PIHAK PERTAMA terlambat menyerahkan Kendaraan dan/atau dokumen kelengkapannya, maka PIHAK PERTAMA dikenakan denda keterlambatan sebesar <strong>{formatRupiah(data.latePenaltyPerDay)}</strong> (<em>{data.latePenaltyText}</em>) <strong>untuk setiap hari keterlambatan</strong>, yang wajib dibayarkan kepada PIHAK KEDUA secara tunai.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 7<br/>BIAYA-BIAYA DAN PAJAK</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">Segala biaya yang timbul sehubungan dengan pembuatan Perjanjian ini, biaya balik nama, mutasi, bea balik nama kendaraan bermotor (BBNKB), dan biaya administrasi lainnya sepenuhnya menjadi tanggung jawab dan ditanggung oleh <strong>{data.taxObligation}</strong>.</li>
                            <li className="pl-2">Tunggakan pajak kendaraan bermotor atau denda tilang (jika ada) yang terutang <strong>sebelum</strong> tanggal diserahkannya Kendaraan menjadi tanggung jawab PIHAK PERTAMA. Sedangkan pajak dan denda yang timbul <strong>setelah</strong> penyerahan Kendaraan menjadi tanggung jawab PIHAK KEDUA.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 8<br/>KEADAAN KAHAR (FORCE MAJEURE)</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">Yang dimaksud dengan Force Majeure adalah kejadian-kejadian di luar kemampuan PARA PIHAK yang dapat mempengaruhi pelaksanaan Perjanjian ini, antara lain bencana alam (gempa bumi, banjir, tanah longsor, dll), huru-hara, perang, kebakaran, dan kebijakan pemerintah di bidang moneter/hukum.</li>
                            <li className="pl-2">Dalam hal terjadi Force Majeure, pihak yang mengalaminya wajib memberitahukan secara tertulis kepada pihak lainnya paling lambat 3x24 jam sejak terjadinya keadaan tersebut guna mencari penyelesaian terbaik berdasarkan iktikad baik.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 9<br/>PENYELESAIAN SENGKETA</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">Setiap perselisihan, sengketa, atau perbedaan pendapat yang timbul dari atau berkenaan dengan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mencapai mufakat.</li>
                            <li className="pl-2">Apabila musyawarah tidak menghasilkan mufakat dalam waktu 14 (empat belas) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui jalur hukum dengan memilih domisili hukum yang umum dan tetap di Kepaniteraan Pengadilan Negeri wilayah setempat.</li>
                         </ol>
                      </div>

                      <div className="mb-4 text-justify break-inside-avoid">
                         <div className="text-center font-bold mb-2">PASAL 10<br/>KETENTUAN PENUTUP</div>
                         <ol className="list-decimal pl-6 space-y-2">
                            <li className="pl-2">Perjanjian ini tidak dapat diubah atau ditambah kecuali dengan persetujuan tertulis dari PARA PIHAK yang dituangkan dalam suatu Adendum yang menjadi bagian tidak terpisahkan dari Perjanjian ini.</li>
                            <li className="pl-2">Demikian Perjanjian ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, tanpa adanya paksaan dari pihak manapun, serta mengikat PARA PIHAK beserta ahli waris atau pihak yang menerima hak dari padanya.</li>
                         </ol>
                         <p className="indent-8 mt-4">
                            Perjanjian ini dibuat dan ditandatangani pada tempat, hari, dan tanggal sebagaimana disebutkan pada awal Perjanjian, dalam rangkap 2 (dua), masing-masing bermeterai cukup (Rp10.000) dan mempunyai kekuatan hukum yang sama.
                         </p>
                      </div>
                  </div>

                  <div className="shrink-0 mt-8 break-inside-avoid">
                      <div className="flex justify-between text-center mb-6 px-10">
                         <div className="w-1/2">
                            <p className="mb-1 font-bold text-sm uppercase tracking-widest">PIHAK KEDUA</p>
                            <p className="mb-16 text-xs uppercase">(PEMBELI)</p>
                            <p className="font-bold underline uppercase">{data.p2Name}</p>
                         </div>
                         <div className="w-1/2">
                            <p className="mb-1 font-bold text-sm uppercase tracking-widest">PIHAK PERTAMA</p>
                            <p className="mb-2 text-xs uppercase">(PENJUAL)</p>
                            <div className="border border-black w-24 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-gray-500">MATERAI<br/>Rp10.000</div>
                            <p className="font-bold underline uppercase">{data.p1Name}</p>
                         </div>
                      </div>
                      <div className="text-center mt-6 mb-2 font-bold text-sm uppercase tracking-widest">SAKSI-SAKSI</div>
                      <div className="flex justify-between text-center px-10">
                         <div className="w-1/2">
                           <p className="mb-14 text-xs uppercase">Saksi 1</p>
                           <p className="border-b border-black inline-block min-w-[150px]">{data.witness1}</p>
                         </div>
                         <div className="w-1/2">
                           <p className="mb-14 text-xs uppercase">Saksi 2</p>
                           <p className="border-b border-black inline-block min-w-[150px]">{data.witness2}</p>
                         </div>
                      </div>
                  </div>
              </div>
          )}

          {templateId === 2 && (
              <div className="border-4 double border-black p-6 h-full flex flex-col w-full">
                  <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                      <div>
                          <h1 className="text-3xl font-black uppercase tracking-wider text-black">KWITANSI</h1>
                          <div className="text-sm font-bold text-black uppercase">Jual Beli Kendaraan</div>
                      </div>
                      <div className="text-right">
                          <div className="text-xs text-gray-600 uppercase font-bold">Tanggal</div>
                          <div className="font-bold text-black">{formatDateSafe(data.date)}</div>
                      </div>
                  </div>

                  <div className="mb-8 text-sm">
                      <div className="flex mb-4">
                         <div className="w-48 font-bold">SUDAH TERIMA DARI</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase border-b border-black pb-1">{data.p2Name}</div>
                      </div>
                      <div className="flex mb-4">
                         <div className="w-48 font-bold">BANYAKNYA UANG</div><div className="w-4">:</div><div className="flex-1 italic bg-gray-50 p-2 border border-gray-200">{data.priceText}</div>
                      </div>
                      <div className="flex mb-4">
                         <div className="w-48 font-bold align-top">UNTUK PEMBAYARAN</div><div className="w-4 align-top">:</div><div className="flex-1 uppercase border-b border-black pb-1">1 UNIT {data.brand} {data.type} ({data.nopol}) <br/>No. Rangka: {data.frameNo} <br/>No. Mesin: {data.engineNo}</div>
                      </div>
                  </div>

                  <div className="bg-gray-50 p-4 border border-black mb-8 rounded-lg w-max">
                      <div className="text-3xl font-black">{formatRupiah(data.price)}</div>
                  </div>

                  <div className="flex justify-between items-end mt-auto break-inside-avoid px-10">
                      <div className="text-center w-40">
                         <p className="mb-20 text-xs font-bold uppercase">Yang Menyerahkan</p>
                         <p className="font-bold underline uppercase">{data.p2Name}</p>
                      </div>
                      <div className="text-center w-40">
                         <p className="mb-2 text-xs font-bold uppercase">Yang Menerima</p>
                         <div className="border border-black text-[8px] h-12 flex items-center justify-center mb-2 mx-auto w-24 text-gray-500">MATERAI<br/>Rp10.000</div>
                         <p className="font-bold underline uppercase">{data.p1Name}</p>
                      </div>
                  </div>
              </div>
          )}
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
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Car size={16} className="text-blue-400" /> <span className="uppercase tracking-tighter">Legal Drafter - Jual Beli Kendaraan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Legal Formal Enterprise {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Kwitansi Besar {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
               <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2>
               <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset Formulir"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-2 gap-2">
                <button onClick={() => applyPreset('mobil')} className="bg-white p-2 rounded text-[10px] font-bold shadow-sm flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors"><Car size={14}/> PRESET MOBIL</button>
                <button onClick={() => applyPreset('motor')} className="bg-white p-2 rounded text-[10px] font-bold shadow-sm flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors"><Bike size={14}/> PRESET MOTOR</button>
              </div>

              {/* Data Penjual */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b border-red-100 pb-1 flex items-center gap-2"><Users size={12}/> Pihak Pertama (Penjual)</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="Nomor Induk Kependudukan (NIK)" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded-lg text-xs" value={data.p1BirthPlace} onChange={e => handleDataChange('p1BirthPlace', e.target.value)} placeholder="Tempat Lahir" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.p1BirthDate} onChange={e => handleDataChange('p1BirthDate', e.target.value)} />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" />
              </div>

              {/* Data Pembeli */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b border-blue-100 pb-1 flex items-center gap-2"><Users size={12}/> Pihak Kedua (Pembeli)</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="Nomor Induk Kependudukan (NIK)" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded-lg text-xs" value={data.p2BirthPlace} onChange={e => handleDataChange('p2BirthPlace', e.target.value)} placeholder="Tempat Lahir" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.p2BirthDate} onChange={e => handleDataChange('p2BirthDate', e.target.value)} />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap Sesuai KTP" />
              </div>

              {/* Detail Kendaraan */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-600 border-b border-slate-200 pb-1 flex items-center gap-2"><Car size={12}/> Detail Kendaraan</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.brand} onChange={e => handleDataChange('brand', e.target.value)} placeholder="Merek (Cth: Toyota)" />
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Tipe (Cth: Avanza Veloz)" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.year} onChange={e => handleDataChange('year', e.target.value)} placeholder="Tahun Pembuatan" />
                  <input className="w-full p-2 border rounded-lg text-xs" value={data.color} onChange={e => handleDataChange('color', e.target.value)} placeholder="Warna Kendaraan" />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs font-mono font-bold uppercase" value={data.nopol} onChange={e => handleDataChange('nopol', e.target.value)} placeholder="Nomor Polisi" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.frameNo} onChange={e => handleDataChange('frameNo', e.target.value)} placeholder="Nomor Rangka" />
                  <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.engineNo} onChange={e => handleDataChange('engineNo', e.target.value)} placeholder="Nomor Mesin" />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.bpkbNo} onChange={e => handleDataChange('bpkbNo', e.target.value)} placeholder="Nomor BPKB" />
              </div>

              {/* Ketentuan Transaksi & Taring Hukum */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-orange-600 border-b border-orange-200 pb-1 flex items-center gap-2"><AlertTriangle size={12}/> Ketentuan Transaksi & Sanksi</h3>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold mb-1 block">Harga Total Kendaraan (Rp)</label>
                   <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold text-emerald-600" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value) || 0)} placeholder="Nominal Harga" />
                   <input className="w-full p-2 border border-t-0 rounded-b-lg text-xs italic bg-slate-50" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} placeholder="Terbilang harga..." />
                </div>
                
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg space-y-3 mt-2">
                   <div>
                       <label className="text-[10px] text-orange-700 font-bold mb-1 block">Uang Muka / Down Payment (Rp)</label>
                       <input type="number" className="w-full p-2 border border-orange-300 rounded-lg text-xs font-bold text-orange-700" value={data.downPayment} onChange={e => handleDataChange('downPayment', parseInt(e.target.value) || 0)} placeholder="Nominal DP" />
                       <input className="w-full p-2 border border-orange-300 border-t-0 rounded-b-lg text-[10px] italic bg-white" value={data.downPaymentText} onChange={e => handleDataChange('downPaymentText', e.target.value)} placeholder="Terbilang DP..." />
                       <p className="text-[9px] text-orange-600 mt-1">*Jika pembeli batal, DP ini HANGUS. Jika penjual batal, wajib kembalikan 2x Lipat.</p>
                   </div>
                   
                   <div>
                       <label className="text-[10px] text-orange-700 font-bold mb-1 block">Denda Keterlambatan Penyerahan / Hari (Rp)</label>
                       <input type="number" className="w-full p-2 border border-orange-300 rounded-lg text-xs font-bold text-red-600" value={data.latePenaltyPerDay} onChange={e => handleDataChange('latePenaltyPerDay', parseInt(e.target.value) || 0)} placeholder="Nominal Denda/Hari" />
                       <input className="w-full p-2 border border-orange-300 border-t-0 rounded-b-lg text-[10px] italic bg-white" value={data.latePenaltyText} onChange={e => handleDataChange('latePenaltyText', e.target.value)} placeholder="Terbilang Denda..." />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold mb-1 block">Metode Pembayaran</label>
                      <select className="w-full p-2 border rounded-lg text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)}>
                         <option value="Tunai">Tunai / Cash</option>
                         <option value="Transfer Bank">Transfer Bank</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold mb-1 block">Tanggungan Biaya & Pajak</label>
                      <select className="w-full p-2 border rounded-lg text-xs" value={data.taxObligation} onChange={e => handleDataChange('taxObligation', e.target.value)}>
                         <option value="Pihak Pertama (Penjual)">Pihak Pertama (Penjual)</option>
                         <option value="Pihak Kedua (Pembeli)">Pihak Kedua (Pembeli)</option>
                         <option value="PARA PIHAK secara tanggung renteng">Ditanggung Bersama (50:50)</option>
                      </select>
                   </div>
                </div>
                {data.paymentMethod === 'Transfer Bank' && (
                    <div>
                       <label className="text-[10px] text-slate-500 font-bold mb-1 block">Detail Rekening Tujuan</label>
                       <input className="w-full p-2 border rounded-lg text-xs" value={data.paymentDetails} onChange={e => handleDataChange('paymentDetails', e.target.value)} placeholder="Contoh: Rekening BCA 12345 a.n Penjual" />
                    </div>
                )}
              </div>

              {/* Waktu & Lokasi */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-600 border-b border-slate-200 pb-1">Waktu & Lokasi & Saksi</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Kota Penandatanganan</label>
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal Perjanjian</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 1</label>
                      <input className="w-full p-2 border rounded-lg text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 2</label>
                      <input className="w-full p-2 border rounded-lg text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
                   </div>
                </div>
              </div>

           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col p-[20mm]">
                  <DocumentContent />
                </div>
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Jual Beli Kendaraan" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="print-content-wrapper">
             <DocumentContent />
         </div>
      </div>
    </div>
  );
}
// FORCE-HMR-UPDATE
