'use client';

/**
 * FILE: JualBeliTanahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Jual Beli Tanah
 * FIX: Perombakan total menjadi dokumen legal drafting standar Notaris/Korporat (9 Pasal) dengan Klausul Wanprestasi "TARING HUKUM".
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  BadgeDollarSign, Users, GripHorizontal, CreditCard, CalendarDays, FileText, Edit3, Eye, RotateCcw, ArrowLeftCircle, BookOpen, Scaling
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LandSaleData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Penjual)
  p1Name: string; p1Pob: string; p1Dob: string; p1Job: string; p1Address: string; p1Nik: string; 
  p1Spouse: string; 
  
  // Pihak 2 (Pembeli)
  p2Name: string; p2Pob: string; p2Dob: string; p2Job: string; p2Address: string; p2Nik: string;
  
  // Detail Tanah
  landCertType: string; landCertNo: string; landArea: string; landAddress: string;
  bNorth: string; bSouth: string; bEast: string; bWest: string;
  
  // Transaksi
  price: number; 
  dp: number; 
  paymentMethod: string;
  bankName: string;
  accountNumber: string;
  accountName: string;

  // Wanprestasi
  penaltyLateHandover: number;
  sellerCancelPenalty: number;
  
  // Lainnya
  handoverDate: string;
  taxBorneBy: string;
  
  // Saksi & Tambahan
  witness1: string; 
  witness2: string;
  additionalClause: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LandSaleData = {
  day: 'Jumat',
  date: '2026-07-10', 
  city: 'Sleman',
  
  p1Name: 'BAMBANG SUDARSO', p1Pob: 'Sleman', p1Dob: '1974-05-12', p1Job: 'Pensiunan PNS', p1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta', p1Nik: '3404010101740001', 
  p1Spouse: 'Siti Aminah', 
  
  p2Name: 'ANDI PRATAMA', p2Pob: 'Bantul', p2Dob: '1996-08-20', p2Job: 'Wiraswasta', p2Address: 'Jl. Gejayan No. 15, Depok, Sleman', p2Nik: '3471010101960002',
  
  landCertType: 'Sertifikat Hak Milik (SHM)', landCertNo: '01234/Sardonoharjo', landArea: '500', landAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  bNorth: 'Tanah Bapak Joko', bSouth: 'Jalan Desa (Aspal)', bEast: 'Selokan Mataram', bWest: 'Rumah Ibu Ani',
  
  price: 1500000000, dp: 500000000, paymentMethod: 'Transfer Bank', bankName: 'Bank BCA', accountNumber: '846392019', accountName: 'BAMBANG SUDARSO',
  
  penaltyLateHandover: 1000000,
  sellerCancelPenalty: 2,

  handoverDate: '2026-08-10', taxBorneBy: 'Ditanggung Bersama oleh PARA PIHAK secara proporsional',
  
  witness1: 'Ketua RT 05 (Bpk Rahmat)', 
  witness2: 'Ahmad Faisal',
  additionalClause: '' 
};

// --- HELPER FUNCTION UNTUK TERBILANG ---
function terbilang(angka: number): string {
    const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let hasil = "";
    if (angka < 12) {
        hasil = huruf[angka];
    } else if (angka < 20) {
        hasil = terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        hasil = terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
    } else if (angka < 200) {
        hasil = "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        hasil = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        hasil = "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        hasil = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        hasil = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar " + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
    }
    return hasil.trim();
}

// --- 3. KOMPONEN UTAMA ---
export default function JualBeliTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <LandSaleBuilder />
    </Suspense>
  );
}

function LandSaleBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LandSaleData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'waktu' | 'pihak1' | 'pihak2' | 'objek' | 'transaksi' | 'sanksi' | 'lainnya'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof LandSaleData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] min-h-[296mm] h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* HEADER */}
              <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PERJANJIAN JUAL BELI TANAH</h1>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
                  </p>
              </div>

              {/* IDENTITAS PIHAK */}
              <div className="flex flex-row mb-4 text-justify break-inside-avoid">
                  <div className="w-8 shrink-0 font-bold">I.</div>
                  <div className="flex-1">
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.p1Name}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Nik}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Job}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Alamat Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Address}</div>
                      </div>
                      <div className="mt-2">
                          Dalam hal ini bertindak untuk dan atas nama diri sendiri {data.p1Spouse ? `serta telah mendapat persetujuan dari suami/istri sah yang bernama ${data.p1Spouse}` : ''}, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (PENJUAL)</strong>.
                      </div>
                  </div>
              </div>

              <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                  <div className="w-8 shrink-0 font-bold">II.</div>
                  <div className="flex-1">
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.p2Name}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Nik}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Job}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Alamat Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Address}</div>
                      </div>
                      <div className="mt-2">
                          Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA (PEMBELI)</strong>.
                      </div>
                  </div>
              </div>

              {/* RECITALS */}
              <div className="mb-4 text-justify">
                  <p>PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya secara bersama-sama disebut <strong>"PARA PIHAK"</strong>) terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
              </div>
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">a.</div>
                      <div className="flex-1">Bahwa, PIHAK PERTAMA adalah pemilik dan/atau pihak yang berhak atas sebidang tanah dengan bukti kepemilikan berupa {data.landCertType} Nomor <strong>{data.landCertNo}</strong>, dengan luas <strong>{data.landArea} m&sup2;</strong> (meter persegi), yang terletak di <strong>{data.landAddress}</strong>.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">b.</div>
                      <div className="flex-1">Bahwa, PIHAK PERTAMA bermaksud untuk menjual tanah tersebut kepada PIHAK KEDUA, dan PIHAK KEDUA sepakat serta bersedia untuk membeli tanah tersebut dari PIHAK PERTAMA.</div>
                  </div>
              </div>
              <div className="mb-8 text-justify">
                  <p>Selanjutnya, PARA PIHAK sepakat dan mengikatkan diri dalam Surat Perjanjian Jual Beli Tanah ini dengan syarat-syarat dan ketentuan-ketentuan yang diatur dalam pasal-pasal sebagai berikut:</p>
              </div>

              {/* PASAL 1 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-before-auto">
                  PASAL 1<br/>OBJEK PERJANJIAN
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Objek dalam Perjanjian ini adalah sebidang tanah milik PIHAK PERTAMA dengan rincian sebagai berikut:</div>
                  </div>
                  <div className="ml-6 pl-2 mb-2 flex flex-col">
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Jenis Hak</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.landCertType}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Nomor Sertifikat</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.landCertNo}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Luas Tanah</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.landArea} m&sup2; (meter persegi)</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Alamat / Lokasi</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.landAddress}</div>
                      </div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Tanah sebagaimana dimaksud pada ayat (1) Pasal ini memiliki batas-batas ukur sebagai berikut:</div>
                  </div>
                  <div className="ml-6 pl-2 mb-2 flex flex-col">
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Sebelah Utara</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.bNorth}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Sebelah Selatan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.bSouth}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Sebelah Timur</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.bEast}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-48 shrink-0">Sebelah Barat</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.bWest}</div>
                      </div>
                  </div>
              </div>

              {/* PASAL 2 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 2<br/>HARGA DAN CARA PEMBAYARAN
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Jual beli tanah ini dilakukan dan disetujui oleh PARA PIHAK dengan harga keseluruhan sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{terbilang(data.price)} Rupiah</em>).</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">PIHAK KEDUA akan membayarkan Uang Muka (<em>Down Payment</em>) sebesar <strong>{formatRupiah(data.dp)}</strong> (<em>{terbilang(data.dp)} Rupiah</em>) pada saat penandatanganan Perjanjian ini.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">3.</div>
                      <div className="flex-1">
                          Sisa pembayaran sebesar <strong>{formatRupiah(data.price - data.dp)}</strong> (<em>{terbilang(data.price - data.dp)} Rupiah</em>) akan dilunasi oleh PIHAK KEDUA melalui metode pembayaran <strong>{data.paymentMethod}</strong>
                          {data.paymentMethod === 'Transfer Bank' ? (
                             <span> ke rekening bank atas nama <strong>{data.accountName}</strong> pada <strong>{data.bankName}</strong> dengan nomor rekening: <strong>{data.accountNumber}</strong>.</span>
                          ) : (
                             <span> yang diserahkan secara langsung kepada PIHAK PERTAMA dengan disertai tanda terima tertulis berupa kuitansi.</span>
                          )}
                      </div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">4.</div>
                      <div className="flex-1">Perjanjian ini berlaku sekaligus sebagai tanda terima (kuitansi) yang sah atas penerimaan uang muka sebagaimana dimaksud pada ayat (2) Pasal ini.</div>
                  </div>
              </div>

              {/* PASAL 3 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 3<br/>JAMINAN DAN BEBAN
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">PIHAK PERTAMA menjamin sepenuhnya bahwa tanah yang dijual adalah benar-benar miliknya sendiri, tidak ada orang/pihak lain yang turut mempunyai hak atau mengklaim kepemilikan atas tanah tersebut.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">PIHAK PERTAMA menjamin bahwa tanah tersebut tidak dalam status sengketa, tidak dalam keadaan disita, tidak dijaminkan kepada pihak lain, dan bebas dari segala macam beban hak tanggungan maupun tuntutan hukum apa pun.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">3.</div>
                      <div className="flex-1">Apabila di kemudian hari terbukti bahwa jaminan PIHAK PERTAMA sebagaimana dimaksud pada ayat (1) dan (2) tidak benar, maka PIHAK PERTAMA wajib membebaskan PIHAK KEDUA dari segala tuntutan pihak ketiga, serta wajib mengembalikan seluruh pembayaran yang telah diterima secara utuh tanpa potongan apa pun.</div>
                  </div>
              </div>

              {/* PASAL 4 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 4<br/>PENYERAHAN OBJEK TANAH DAN DOKUMEN
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">PIHAK PERTAMA berjanji dan mengikatkan diri untuk menyerahkan penguasaan fisik tanah tersebut dalam keadaan kosong dan bebas dari segala hak pihak lain kepada PIHAK KEDUA, selambat-lambatnya pada tanggal <strong>{formatDateSafe(data.handoverDate)}</strong>.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">PIHAK PERTAMA wajib menyerahkan seluruh dokumen hukum yang berkaitan dengan tanah, termasuk namun tidak terbatas pada Sertifikat Hak Milik/Hak Guna Bangunan asli, bukti bayar Pajak Bumi dan Bangunan (PBB) tahun berjalan, dan dokumen pendukung lainnya kepada Pejabat Pembuat Akta Tanah (PPAT) yang ditunjuk pada saat proses pembuatan Akta Jual Beli (AJB).</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">3.</div>
                      <div className="flex-1">Terhitung sejak ditandatanganinya Perjanjian ini dan dilunasinya seluruh pembayaran, segala bentuk keuntungan maupun kerugian yang berkaitan dengan objek jual beli sepenuhnya menjadi hak dan tanggung jawab PIHAK KEDUA.</div>
                  </div>
              </div>

              {/* PASAL 5 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 5<br/>BIAYA-BIAYA DAN PAJAK
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Pajak Bumi dan Bangunan (PBB) dan kewajiban lainnya yang tertunggak sebelum ditandatanganinya Perjanjian ini sepenuhnya merupakan tanggung jawab PIHAK PERTAMA.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Segala biaya yang timbul dalam pelaksanaan jual beli ini, termasuk namun tidak terbatas pada biaya pembuatan Akta Jual Beli (AJB) di Notaris/PPAT, Pajak Penghasilan (PPh), Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB), dan biaya balik nama sertifikat disepakati untuk <strong>{data.taxBorneBy}</strong>.</div>
                  </div>
              </div>

              {/* PASAL 6: WANPRESTASI DAN PEMBATALAN */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 6<br/>WANPRESTASI DAN PEMBATALAN
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Apabila PIHAK KEDUA membatalkan secara sepihak Perjanjian ini atau gagal melunasi sisa pembayaran sesuai waktu yang disepakati, maka PIHAK KEDUA dinyatakan wanprestasi. Dalam hal ini, Uang Muka (<em>Down Payment</em>) yang telah dibayarkan oleh PIHAK KEDUA dinyatakan <strong>hangus dan sepenuhnya menjadi hak milik PIHAK PERTAMA</strong>.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Apabila PIHAK PERTAMA membatalkan secara sepihak Perjanjian ini, maka PIHAK PERTAMA wajib mengembalikan Uang Muka (<em>Down Payment</em>) yang telah diterima beserta denda pembatalan sebesar <strong>{data.sellerCancelPenalty} (sebut: {terbilang(data.sellerCancelPenalty)}) kali lipat</strong> dari jumlah Uang Muka tersebut kepada PIHAK KEDUA, selambat-lambatnya 7 (tujuh) hari sejak pernyataan pembatalan.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">3.</div>
                      <div className="flex-1">Apabila PIHAK PERTAMA terlambat menyerahkan objek tanah beserta dokumen-dokumen yang dipersyaratkan melebihi batas waktu penyerahan yang telah disepakati pada Pasal 4 ayat (1), maka PIHAK PERTAMA dikenakan denda keterlambatan sebesar <strong>{formatRupiah(data.penaltyLateHandover)}</strong> (<em>{terbilang(data.penaltyLateHandover)} Rupiah</em>) untuk setiap hari keterlambatan, yang wajib dibayarkan seketika dan sekaligus kepada PIHAK KEDUA.</div>
                  </div>
              </div>

              {/* PASAL 7 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 7<br/>KEADAAN MEMAKSA (FORCE MAJEURE)
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Tidak ada satu pihak pun yang dinyatakan wanprestasi apabila terjadi keterlambatan atau kegagalan dalam memenuhi kewajiban berdasarkan Perjanjian ini yang diakibatkan oleh Keadaan Memaksa (<em>Force Majeure</em>).</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Yang dimaksud dengan <em>Force Majeure</em> adalah peristiwa-peristiwa yang terjadi di luar kehendak dan kekuasaan PARA PIHAK, seperti bencana alam (gempa bumi, banjir, letusan gunung berapi), huru-hara, perang, pemberontakan, serta kebijakan pemerintah di bidang moneter dan properti yang berdampak langsung.</div>
                  </div>
              </div>

              {/* PASAL 8 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 8<br/>PENYELESAIAN SENGKETA
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Segala perbedaan pendapat dan/atau perselisihan yang mungkin timbul sebagai akibat dari penafsiran maupun pelaksanaan Perjanjian ini akan diselesaikan secara musyawarah untuk mufakat oleh PARA PIHAK.</div>
                  </div>
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Apabila penyelesaian melalui musyawarah untuk mufakat tidak tercapai dalam waktu selambat-lambatnya 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui jalur hukum dengan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri <strong>{data.city}</strong>.</div>
                  </div>
              </div>

              {/* PASAL 9 */}
              <div className="text-center mt-6 mb-4 font-bold uppercase break-inside-avoid">
                  PASAL 9<br/>KETENTUAN PENUTUP
              </div>
              <div className="mb-6 text-justify">
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Perjanjian ini tidak akan berakhir karena salah satu pihak meninggal dunia, melainkan hak dan kewajibannya akan beralih secara hukum kepada para ahli waris dari pihak yang bersangkutan.</div>
                  </div>
                  {data.additionalClause && (
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">{data.additionalClause}</div>
                  </div>
                  )}
                  <div className="flex flex-row mb-2">
                      <div className="w-6 shrink-0">{data.additionalClause ? '3.' : '2.'}</div>
                      <div className="flex-1">Perjanjian ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sehat jasmani dan rohani, tanpa adanya paksaan, kekhilafan, atau penipuan dari pihak manapun.</div>
                  </div>
              </div>

              <div className="mb-12 mt-8 text-justify">
                  <p>Demikian Surat Perjanjian Jual Beli Tanah ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan memiliki kekuatan hukum yang sama bagi PARA PIHAK.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                  <div>
                      <p className="mb-20 font-bold uppercase">PIHAK KEDUA (PEMBELI)</p>
                      <p className="font-bold underline uppercase">{data.p2Name}</p>
                  </div>
                  <div>
                      <p className="mb-4 font-bold uppercase">PIHAK PERTAMA (PENJUAL)</p>
                      <div className="border-2 border-slate-300 border-dashed w-28 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic">METERAI<br/>Rp10.000,-</div>
                      <p className="font-bold underline uppercase">{data.p1Name}</p>
                  </div>
              </div>

              <div className="text-center mt-12 break-inside-avoid font-bold uppercase mb-8">SAKSI-SAKSI</div>
              <div className="grid grid-cols-3 gap-8 text-center break-inside-avoid">
                  <div>
                      <p className="mb-20 font-bold">Saksi 1</p>
                      <p className="font-bold underline uppercase">{data.witness1}</p>
                  </div>
                  <div>
                      <p className="mb-20 font-bold">Persetujuan Pasangan<br/><span className="text-xs font-normal capitalize">(Suami/Istri Penjual)</span></p>
                      <p className="font-bold underline uppercase">{data.p1Spouse ? data.p1Spouse : '-'}</p>
                  </div>
                  <div>
                      <p className="mb-20 font-bold">Saksi 2</p>
                      <p className="font-bold underline uppercase">{data.witness2}</p>
                  </div>
              </div>

          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Jual Beli Tanah</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penjual</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pembeli</button>
              <button onClick={() => setActiveTab('objek')} className={`flex-1 py-3 border-r ${activeTab === 'objek' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Objek</button>
              <button onClick={() => setActiveTab('transaksi')} className={`flex-1 py-3 border-r ${activeTab === 'transaksi' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Transaksi</button>
              <button onClick={() => setActiveTab('sanksi')} className={`flex-1 py-3 border-r ${activeTab === 'sanksi' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Sanksi</button>
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 ${activeTab === 'lainnya' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lainnya</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Pertama (Penjual)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
                <div className="pt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Suami/Istri (Penyetuju)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Spouse} onChange={e => handleDataChange('p1Spouse', e.target.value)} placeholder="Kosongkan jika tidak ada/belum menikah" />
                  <p className="text-[9px] text-slate-400 mt-1">*Jika tanah berupa harta bersama, butuh persetujuan pasangan.</p>
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Kedua (Pembeli)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Contoh: Wiraswasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'objek' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Spesifikasi Objek Tanah</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Hak (Bukti)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.landCertType} onChange={e => handleDataChange('landCertType', e.target.value)}>
                        <option value="Sertifikat Hak Milik (SHM)">SHM - Hak Milik</option>
                        <option value="Sertifikat Hak Guna Bangunan (SHGB)">SHGB - Hak Guna Bangunan</option>
                        <option value="Akta Jual Beli (AJB)">AJB - Akta Jual Beli</option>
                        <option value="Girik / Petuk D">Girik / Petuk D</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Luas Tanah (m&sup2;)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Contoh: 500" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Bukti Hak / Sertifikat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.landCertNo} onChange={e => handleDataChange('landCertNo', e.target.value)} placeholder="Nomor Surat/Sertifikat" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lokasi Tanah</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.landAddress} onChange={e => handleDataChange('landAddress', e.target.value)} placeholder="Lokasi fisik tanah" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-emerald-700 uppercase mb-3">Batas-Batas Fisik Lahan</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Utara</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.bNorth} onChange={e => handleDataChange('bNorth', e.target.value)} placeholder="Batas Utara" />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Selatan</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.bSouth} onChange={e => handleDataChange('bSouth', e.target.value)} placeholder="Batas Selatan" />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Timur</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.bEast} onChange={e => handleDataChange('bEast', e.target.value)} placeholder="Batas Timur" />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Barat</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.bWest} onChange={e => handleDataChange('bWest', e.target.value)} placeholder="Batas Barat" />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'transaksi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Nilai & Cara Pembayaran</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Harga Total Tanah (Rp)</label>
                  <input type="number" className="w-full p-3 border rounded-lg text-lg font-black mt-1 text-amber-700 bg-amber-50" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value) || 0)} placeholder="Harga Total" />
                  <p className="text-[10px] mt-1 text-slate-500">{terbilang(data.price)} Rupiah</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Muka / DP (Rp)</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.dp} onChange={e => handleDataChange('dp', parseInt(e.target.value) || 0)} placeholder="Nominal Uang Muka" />
                  <p className="text-[10px] mt-1 text-slate-500">Sisa dibayar: Rp {new Intl.NumberFormat('id-ID').format(data.price - data.dp)}</p>
                </div>
                <div className="pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pembayaran Pelunasan</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)}>
                      <option value="Tunai">Tunai / Cash Keras</option>
                      <option value="Transfer Bank">Transfer Bank</option>
                  </select>
                </div>
                
                {data.paymentMethod === 'Transfer Bank' && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-700 uppercase">Detail Rekening Penjual</h4>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase">Nama Bank</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} placeholder="Contoh: Bank BCA" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase">Nomor Rekening</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.accountNumber} onChange={e => handleDataChange('accountNumber', e.target.value)} placeholder="Contoh: 1234567890" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase">Atas Nama (Pemilik Rekening)</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1 font-bold" value={data.accountName} onChange={e => handleDataChange('accountName', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
                    </div>
                  </div>
                )}
              </div>
              )}

              {activeTab === 'sanksi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Sanksi & Denda (Wanprestasi)</h3>
                
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-3">
                    <h4 className="text-[10px] font-bold text-red-700 uppercase">Pembatalan oleh Penjual</h4>
                    <div>
                      <label className="text-[10px] text-red-600 uppercase">Pengembalian DP (Kali Lipat)</label>
                      <input type="number" className="w-full p-2 border border-red-200 rounded-md text-sm mt-1 font-bold" value={data.sellerCancelPenalty} onChange={e => handleDataChange('sellerCancelPenalty', parseInt(e.target.value) || 0)} />
                      <p className="text-[9px] text-red-500 mt-1">*Jika penjual batal sepihak, wajib kembalikan DP sekian kali lipat.</p>
                    </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-700 uppercase">Pembatalan oleh Pembeli</h4>
                    <div className="flex items-start gap-2">
                        <Check size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-slate-600 leading-tight">Jika pembeli membatalkan sepihak, maka Uang Muka (DP) hangus dan sepenuhnya menjadi hak milik Penjual. (Klausul ini sudah terkunci/baku di dalam dokumen).</p>
                    </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
                    <h4 className="text-[10px] font-bold text-amber-700 uppercase">Keterlambatan Penyerahan Lahan</h4>
                    <div>
                      <label className="text-[10px] text-amber-600 uppercase">Denda Keterlambatan Per Hari (Rp)</label>
                      <input type="number" className="w-full p-2 border border-amber-200 rounded-md text-sm mt-1 font-bold" value={data.penaltyLateHandover} onChange={e => handleDataChange('penaltyLateHandover', parseInt(e.target.value) || 0)} />
                      <p className="text-[9px] text-amber-500 mt-1">*Denda harian jika penjual terlambat menyerahkan aset & dokumen.</p>
                    </div>
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Atribut Tambahan</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari Penandatanganan</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.day} onChange={e => handleDataChange('day', e.target.value)}>
                        <option value="Senin">Senin</option><option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option><option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option><option value="Sabtu">Sabtu</option><option value="Minggu">Minggu</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Dokumen</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Sleman" />
                </div>

                <div className="pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Batas Waktu Penyerahan Lahan</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.handoverDate} onChange={e => handleDataChange('handoverDate', e.target.value)} />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggungan Biaya & Pajak</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.taxBorneBy} onChange={e => handleDataChange('taxBorneBy', e.target.value)}>
                      <option value="Ditanggung Bersama oleh PARA PIHAK secara proporsional">Ditanggung Bersama</option>
                      <option value="Ditanggung sepenuhnya oleh PIHAK PERTAMA (Penjual)">Ditanggung Penjual</option>
                      <option value="Ditanggung sepenuhnya oleh PIHAK KEDUA (Pembeli)">Ditanggung Pembeli</option>
                  </select>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Saksi-Saksi (Wajib 2 Orang)</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase">Nama Saksi 1</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Lengkap Saksi 1" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase">Nama Saksi 2</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Lengkap Saksi 2" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pasal Tambahan (Klausul Opsional)</label>
                  <textarea className="w-full p-2 border rounded-lg text-xs mt-1 h-20" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Kosongkan jika tidak ada. Contoh: Segala tanaman yang ada di atas tanah tersebut menjadi hak milik Pembeli." />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Jual Beli Tanah" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
