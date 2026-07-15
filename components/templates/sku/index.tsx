'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, RotateCcw, ArrowLeftCircle, BookOpen, Edit3
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SkuData {
  letterNumber: string;
  issueDate: string;
  villageName: string;
  subDistrictName: string;
  districtName: string;
  
  // Pihak Pertama
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Gender: string;
  pihak1Religion: string;
  pihak1Job: string;
  pihak1Address: string;

  // Pihak Kedua
  pihak2Name: string;
  pihak2Nik: string;
  pihak2Pob: string;
  pihak2Dob: string;
  pihak2Gender: string;
  pihak2Religion: string;
  pihak2Job: string;
  pihak2Address: string;
  pihak2Position: string;

  // Usaha
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessYear: string;
  monthlyIncome: number;

  // Options
  tujuanPembuatan: string;
  statusTempat: string;
  skalaUsaha: string;
  kewajibanRetribusi: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SkuData = {
  letterNumber: '400/012/SKU/2026',
  issueDate: '2026-07-13',
  villageName: 'Sardonoharjo',
  subDistrictName: 'Ngaglik',
  districtName: 'Sleman',
  
  pihak1Name: 'BAMBANG SUDARSO',
  pihak1Nik: '3404010101740001',
  pihak1Pob: 'Sleman',
  pihak1Dob: '1974-05-12',
  pihak1Gender: 'Laki-laki',
  pihak1Religion: 'Islam',
  pihak1Job: 'Wiraswasta',
  pihak1Address: 'Jl. Kaliurang KM 10, RT 05 RW 02, Sardonoharjo, Ngaglik, Sleman',

  pihak2Name: 'H. AHMAD FAISAL, S.E.',
  pihak2Nik: '19700101 199803 1 005',
  pihak2Pob: 'Bantul',
  pihak2Dob: '1970-01-01',
  pihak2Gender: 'Laki-laki',
  pihak2Religion: 'Islam',
  pihak2Job: 'Pegawai Negeri Sipil',
  pihak2Address: 'Jl. Balai Desa No. 1, Sardonoharjo, Ngaglik, Sleman',
  pihak2Position: 'Kepala Desa',

  businessName: 'Toko Kelontong Berkah',
  businessType: 'Perdagangan / Sembako',
  businessAddress: 'Pasar Gentan Blok A No. 12, Sardonoharjo, Ngaglik, Sleman',
  businessYear: '2015',
  monthlyIncome: 15000000,

  tujuanPembuatan: 'Pengajuan Kredit Perbankan',
  statusTempat: 'Sewa / Kontrak',
  skalaUsaha: 'Mikro (UMKM)',
  kewajibanRetribusi: 'Ditanggung Sepenuhnya Oleh Pihak Pertama',
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
export default function SkuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Formulir SKU...</div>}>
      <SkuBuilder />
    </Suspense>
  );
}

function SkuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SkuData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'desa' | 'pihak1' | 'pihak2' | 'usaha' | 'opsi'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof SkuData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto break-after-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    const getHari = (dateStr: string) => {
        if(!dateStr) return '...';
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[new Date(dateStr).getDay()];
    };

    const getSpelledDate = (dateStr: string) => {
        if(!dateStr) return { day: '...', month: '...', year: '...' };
        const d = new Date(dateStr);
        return {
            day: terbilang(d.getDate()),
            month: d.toLocaleDateString('id-ID', { month: 'long' }),
            year: terbilang(d.getFullYear())
        };
    };

    const spelledDate = getSpelledDate(data.issueDate);

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              
              {/* JUDUL SURAT */}
              <div className="text-center font-bold mb-8">
                  <h1 className="text-xl uppercase underline tracking-wider">AKTA KETERANGAN DAN PERNYATAAN LEGALITAS USAHA</h1>
                  <p className="font-normal text-sm mt-1">Nomor: {data.letterNumber}</p>
              </div>

              {/* PEMBUKA */}
              <div className="mb-6 text-justify">
                  <p>
                      Pada hari ini, <strong>{getHari(data.issueDate)}</strong>, tanggal <strong>{spelledDate.day}</strong>, bulan <strong>{spelledDate.month}</strong>, tahun <strong>{spelledDate.year}</strong> ({formatDateSafe(data.issueDate)}), bertempat di Kantor Desa {data.villageName}, Kecamatan {data.subDistrictName}, Kabupaten {data.districtName}, kami yang bertanda tangan di bawah ini:
                  </p>
              </div>

              {/* IDENTITAS PIHAK PERTAMA */}
              <div className="mb-4 break-inside-avoid">
                  <p className="text-justify mb-2"><strong>1. PIHAK PERTAMA (PEMILIK USAHA)</strong></p>
                  <div className="ml-4 flex flex-col gap-1">
                      <div className="flex">
                          <div className="w-48 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.pihak1Name}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak1Nik}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak1Pob}, {formatDateSafe(data.pihak1Dob)}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Jenis Kelamin</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak1Gender}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Agama</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak1Religion}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak1Job}</div>
                      </div>
                      <div className="flex align-top">
                          <div className="w-48 shrink-0">Alamat Lengkap Sesuai KTP</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="text-justify">{data.pihak1Address}</div>
                      </div>
                  </div>
              </div>

              {/* IDENTITAS PIHAK KEDUA */}
              <div className="mb-6 break-inside-avoid">
                  <p className="text-justify mb-2"><strong>2. PIHAK KEDUA (PEJABAT DESA/KELURAHAN)</strong></p>
                  <div className="ml-4 flex flex-col gap-1">
                      <div className="flex">
                          <div className="w-48 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.pihak2Name}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">NIP</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Nik || "-"}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Pob}, {formatDateSafe(data.pihak2Dob)}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Jenis Kelamin</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Gender}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Agama</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Religion}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Job}</div>
                      </div>
                      <div className="flex align-top">
                          <div className="w-48 shrink-0">Alamat Lengkap Sesuai KTP</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="text-justify">{data.pihak2Address}</div>
                      </div>
                      <div className="flex">
                          <div className="w-48 shrink-0">Jabatan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pihak2Position} {data.villageName}</div>
                      </div>
                  </div>
              </div>

              <div className="mb-6 text-justify">
                  <p>
                      PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini menyatakan sepakat untuk membuat dan menandatangani Akta Keterangan dan Pernyataan Legalitas Usaha ini dengan ketentuan dan syarat-syarat yang diatur dalam pasal-pasal berikut:
                  </p>
              </div>

              {/* PASAL 1 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 1</p>
                  <p>KETENTUAN UMUM</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2"><strong>Desa/Kelurahan</strong> adalah kesatuan masyarakat hukum yang memiliki batas wilayah yang berwenang untuk mengatur dan mengurus kepentingan masyarakat setempat berdasarkan prakarsa masyarakat, hak asal usul, dan/atau hak tradisional yang diakui dan dihormati dalam sistem pemerintahan Negara Kesatuan Republik Indonesia.</li>
                  <li className="pl-2"><strong>Pemilik Usaha</strong> adalah PIHAK PERTAMA yang merupakan warga masyarakat yang mendaftarkan atau meminta keterangan legalitas atas entitas komersial atau usaha yang dimilikinya.</li>
                  <li className="pl-2"><strong>Akta Keterangan Usaha</strong> adalah dokumen resmi yang diterbitkan dan disahkan oleh PIHAK KEDUA (Pemerintah Desa) sebagai bentuk pengakuan yuridis-formal atas keberadaan suatu usaha di wilayah yurisdiksinya, yang bersifat keterangan, bukan surat izin usaha (SIUP).</li>
              </ol>

              {/* PASAL 2 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 2</p>
                  <p>OBJEK KETERANGAN USAHA</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">Bahwa PIHAK PERTAMA dengan sebenar-benarnya menyatakan memiliki, mengelola, dan bertanggung jawab penuh secara langsung atas sebuah entitas bisnis yang diberi nama <strong>"{data.businessName}"</strong>.</li>
                  <li className="pl-2">Usaha sebagaimana dimaksud pada Ayat (1) bergerak di bidang <strong>{data.businessType}</strong>, yang berlokasi dan berkedudukan hukum di <strong>{data.businessAddress}</strong>.</li>
                  <li className="pl-2">Bahwa operasional dan kegiatan niaga pada usaha tersebut telah berjalan terhitung sejak tahun <strong>{data.businessYear}</strong> tanpa terputus secara hukum.</li>
                  <li className="pl-2">Kapasitas dan estimasi perputaran pendapatan kotor (omzet) per bulan dari usaha tersebut saat akta ini ditandatangani adalah sebesar <strong>{formatRupiah(data.monthlyIncome)} ({terbilang(data.monthlyIncome)} Rupiah)</strong>.</li>
              </ol>

              {/* PASAL 3 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 3</p>
                  <p>STATUS TEMPAT DAN SKALA USAHA</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">Lokasi fisik atau properti tempat usaha yang digunakan oleh PIHAK PERTAMA saat ini berstatus <strong>{data.statusTempat}</strong>. PIHAK PERTAMA menjamin secara hukum bahwa tidak terdapat sengketa kepemilikan, hak guna, ataupun persoalan hukum lainnya atas lokasi tersebut dengan pihak manapun.</li>
                  <li className="pl-2">Berdasarkan klasifikasi permodalan, aset, dan rata-rata omzet bulanan, unit usaha milik PIHAK PERTAMA ditetapkan dan dikategorikan sebagai entitas <strong>Usaha Skala {data.skalaUsaha}</strong>.</li>
              </ol>

              {/* PASAL 4 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 4</p>
                  <p>HAK DAN KEWAJIBAN</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2"><strong>Hak PIHAK PERTAMA:</strong>
                      <ol className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                          <li className="pl-2">Mendapatkan surat keterangan dan legalitas formal tingkat dasar ini dari PIHAK KEDUA demi menunjang kelancaran usahanya.</li>
                          <li className="pl-2">Menggunakan akta keterangan ini sebagai dokumen administratif penunjang sesuai peruntukan yang disepakati.</li>
                      </ol>
                  </li>
                  <li className="pl-2 mt-2"><strong>Kewajiban PIHAK PERTAMA:</strong>
                      <ol className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                          <li className="pl-2">Menjaga ketertiban umum, memelihara kerukunan antar warga, dan memastikan tidak mencemari lingkungan di sekitar lokasi usaha beroperasi.</li>
                          <li className="pl-2">Melaporkan setiap perubahan signifikan terkait status hukum, jenis barang/jasa, pindah alamat, maupun penutupan usaha kepada PIHAK KEDUA secara tertulis.</li>
                      </ol>
                  </li>
                  <li className="pl-2 mt-2"><strong>Hak PIHAK KEDUA:</strong>
                      <ol className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                          <li className="pl-2">Melakukan tinjauan, inspeksi mendadak, dan evaluasi langsung ke lokasi usaha PIHAK PERTAMA sewaktu-waktu untuk memastikan kesesuaian operasional.</li>
                          <li className="pl-2">Membekukan atau mencabut akta keterangan ini jika PIHAK PERTAMA terbukti melanggar norma, aturan desa, dan/atau hukum negara.</li>
                      </ol>
                  </li>
                  <li className="pl-2 mt-2"><strong>Kewajiban PIHAK KEDUA:</strong>
                      <ol className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                          <li className="pl-2">Memberikan pelayanan prima, cepat, dan transparan dalam ranah administratif kependudukan serta kewilayahan kepada masyarakatnya.</li>
                          <li className="pl-2">Turut memfasilitasi pembinaan dan sosialisasi UMKM bilamana terdapat program atau insentif dari Pemerintah Pusat maupun Daerah.</li>
                      </ol>
                  </li>
              </ol>

              {/* PASAL 5 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 5</p>
                  <p>TUJUAN PENGGUNAAN DAN KETENTUAN RETRIBUSI</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">PARA PIHAK menegaskan dan sepakat bahwa Akta Keterangan ini diterbitkan dengan tujuan spesifik untuk <strong>{data.tujuanPembuatan}</strong>.</li>
                  <li className="pl-2">Segala bentuk penyalahgunaan dokumen ini untuk tindakan di luar tujuan yang dimaksud pada Ayat (1), yang berpotensi merugikan pihak ketiga, merupakan tanggung jawab mutlak PIHAK PERTAMA tanpa melibatkan instansi Desa.</li>
                  <li className="pl-2">Terkait kewajiban pajak pusat/daerah, iuran lingkungan, retribusi kebersihan, serta pungutan sah lainnya yang timbul atas aktivitas niaga ini, maka disepakati bahwa pemenuhannya <strong>{data.kewajibanRetribusi}</strong>. PIHAK KEDUA secara mutlak dibebaskan dari segala tuntutan hukum, denda, atau ganti rugi apabila PIHAK PERTAMA melakukan tunggakan.</li>
              </ol>

              {/* PASAL 6 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 6</p>
                  <p>SANKSI, PEMBEKUAN, DAN PEMBATALAN</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">PIHAK KEDUA memiliki kewenangan prerogatif untuk membekukan sementara atau membatalkan secara permanen Akta Keterangan Usaha ini secara sepihak dan seketika apabila terjadi hal-hal berikut:
                      <ol className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                          <li className="pl-2">Identitas, berkas pendukung, dan informasi yang diberikan oleh PIHAK PERTAMA terbukti fiktif, direkayasa, atau dipalsukan.</li>
                          <li className="pl-2">Kegiatan usaha PIHAK PERTAMA terbukti secara sah melanggar norma sosial, kesusilaan, menjadi sarang penyakit masyarakat, atau sebagai kedok peredaran barang terlarang (narkotika, miras ilegal, dll).</li>
                          <li className="pl-2">Terdapat penolakan yang beralasan kuat dan gugatan dari masyarakat di lingkungan sekitar yang dapat dipertanggungjawabkan kebenarannya secara hukum.</li>
                      </ol>
                  </li>
              </ol>

              {/* PASAL 7 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 7</p>
                  <p>FORCE MAJEURE (KEADAAN KAHAR)</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">Yang dimaksud Force Majeure adalah kejadian-kejadian di luar kekuasaan dan kemampuan rasional PARA PIHAK yang mengakibatkan terhentinya atau musnahnya operasional usaha, termasuk namun tidak terbatas pada gempa bumi, banjir bandang, kebakaran hebat, wabah/pandemi nasional, huru-hara massal, dan peperangan.</li>
                  <li className="pl-2">Apabila terjadi Force Majeure yang menyebabkan usaha PIHAK PERTAMA tidak dapat beroperasi secara permanen, maka PIHAK PERTAMA wajib memberitahukan secara tertulis kepada PIHAK KEDUA selambat-lambatnya dalam waktu 14 (empat belas) hari kerja setelah peristiwa terjadi untuk dilakukan penyesuaian arsip.</li>
              </ol>

              {/* PASAL 8 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 8</p>
                  <p>PENYELESAIAN SENGKETA</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2">
                  <li className="pl-2">Apabila di kemudian hari timbul perbedaan penafsiran, sengketa, atau perselisihan yang diakibatkan oleh pelaksanaan kesepakatan dalam akta ini, PARA PIHAK sepakat untuk memprioritaskan penyelesaian secara musyawarah untuk mufakat yang bertempat di Balai Desa {data.villageName}.</li>
                  <li className="pl-2">Apabila jalan musyawarah mufakat tidak membuahkan hasil dalam jangka waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut dengan memilih kedudukan hukum yang tetap pada Kepaniteraan Pengadilan Negeri di wilayah Kabupaten {data.districtName}.</li>
              </ol>

              {/* PASAL 9 */}
              <div className="text-center font-bold mb-4 mt-8 break-before-auto">
                  <p>PASAL 9</p>
                  <p>PENUTUP</p>
              </div>
              <ol className="list-decimal ml-6 text-justify space-y-2 mb-12">
                  <li className="pl-2">Akta Keterangan dan Pernyataan Legalitas Usaha ini dibuat, disepakati, dan ditandatangani oleh PARA PIHAK dalam keadaan sehat secara jasmani dan rohani, sadar sepenuhnya akan akibat hukum yang ditimbulkan, serta tanpa adanya unsur paksaan, tekanan, atau penipuan dari pihak manapun.</li>
                  <li className="pl-2">Demikian akta ini dibuat dalam rangkap 2 (dua) salinan asli, masing-masing dibubuhi meterai secukupnya sebagaimana disyaratkan oleh Undang-Undang Bea Meterai yang berlaku, dan keduanya memiliki kekuatan pembuktian hukum yang sama bagi masing-masing pihak.</li>
              </ol>

              {/* SIGNATURE SECTION */}
              <div className="flex justify-between items-start text-center break-inside-avoid w-full mt-12 pb-12">
                  <div className="w-1/2 flex flex-col items-center px-4">
                      <p className="mb-1">Telah membaca dan menyetujui,</p>
                      <p className="mb-24 font-bold">PIHAK PERTAMA<br/>(Pemilik Usaha)</p>
                      <p className="font-bold underline uppercase">{data.pihak1Name}</p>
                      <p>METERAI 10.000</p>
                  </div>
                  <div className="w-1/2 flex flex-col items-center px-4">
                      <p className="mb-1">{data.villageName}, {formatDateSafe(data.issueDate)}</p>
                      <p className="mb-24 font-bold">PIHAK KEDUA<br/>({data.pihak2Position} {data.villageName})</p>
                      <p className="font-bold underline uppercase">{data.pihak2Name}</p>
                      {data.pihak2Nik && data.pihak2Nik !== "-" && <p>NIP. {data.pihak2Nik}</p>}
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
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          .break-after-auto { break-after: auto !important; page-break-after: auto !important; }
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Drafting Keterangan Usaha</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Formulir Identitas & Klausul</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('desa')} className={`flex-1 py-3 border-r ${activeTab === 'desa' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Wilayah</button>
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2</button>
              <button onClick={() => setActiveTab('usaha')} className={`flex-1 py-3 border-r ${activeTab === 'usaha' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Usaha</button>
              <button onClick={() => setActiveTab('opsi')} className={`flex-1 py-3 ${activeTab === 'opsi' ? 'bg-white text-orange-600 border-b-2 border-b-orange-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'desa' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4">Administrasi Surat & Wilayah</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Akta / Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.letterNumber} onChange={e => handleDataChange('letterNumber', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Penerbitan</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.issueDate} onChange={e => handleDataChange('issueDate', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.districtName} onChange={e => handleDataChange('districtName', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.subDistrictName} onChange={e => handleDataChange('subDistrictName', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Pertama (Pemilik)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Pob} onChange={e => handleDataChange('pihak1Pob', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Dob} onChange={e => handleDataChange('pihak1Dob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihak1Gender} onChange={e => handleDataChange('pihak1Gender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihak1Religion} onChange={e => handleDataChange('pihak1Religion', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Job} onChange={e => handleDataChange('pihak1Job', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Identitas Pihak Kedua (Pejabat)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihak2Name} onChange={e => handleDataChange('pihak2Name', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIP (Nomor Induk Pegawai)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Nik} onChange={e => handleDataChange('pihak2Nik', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Struktural</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Position} onChange={e => handleDataChange('pihak2Position', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Pob} onChange={e => handleDataChange('pihak2Pob', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Dob} onChange={e => handleDataChange('pihak2Dob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihak2Gender} onChange={e => handleDataChange('pihak2Gender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihak2Religion} onChange={e => handleDataChange('pihak2Religion', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak2Job} onChange={e => handleDataChange('pihak2Job', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihak2Address} onChange={e => handleDataChange('pihak2Address', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'usaha' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Usaha</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Usaha / Merek</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bidang / Jenis Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tahun Berdiri / Operasional</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.businessYear} onChange={e => handleDataChange('businessYear', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap Usaha</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.businessAddress} onChange={e => handleDataChange('businessAddress', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Estimasi Omzet Bulanan (Rp)</label>
                  <input type="number" className="w-full p-3 border rounded-lg text-lg font-black mt-1 text-emerald-700 bg-emerald-50" value={data.monthlyIncome} onChange={e => handleDataChange('monthlyIncome', parseInt(e.target.value) || 0)} />
                  <p className="text-[10px] mt-1 text-slate-500">{terbilang(data.monthlyIncome)} Rupiah</p>
                </div>
              </div>
              )}

              {activeTab === 'opsi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-orange-600 border-b pb-1 mb-4">Klausul Khusus Dokumen</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Status Tempat Usaha</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.statusTempat} onChange={e => handleDataChange('statusTempat', e.target.value)}>
                      <option value="Milik Sendiri / Hak Milik Pribadi">Milik Sendiri / Hak Milik Pribadi</option>
                      <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                      <option value="Hak Guna Bangunan">Hak Guna Bangunan</option>
                      <option value="Menumpang / Pinjam Pakai">Menumpang / Pinjam Pakai</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Klasifikasi Skala Usaha</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.skalaUsaha} onChange={e => handleDataChange('skalaUsaha', e.target.value)}>
                      <option value="Ultra Mikro">Ultra Mikro</option>
                      <option value="Mikro (UMKM)">Mikro (UMKM)</option>
                      <option value="Kecil">Kecil</option>
                      <option value="Menengah">Menengah</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan Pembuatan Dokumen</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.tujuanPembuatan} onChange={e => handleDataChange('tujuanPembuatan', e.target.value)}>
                      <option value="Pengajuan Kredit Perbankan">Pengajuan Kredit Perbankan</option>
                      <option value="Syarat Pelelangan / Tender">Syarat Pelelangan / Tender</option>
                      <option value="Syarat Pengurusan Izin Usaha">Syarat Pengurusan Izin Usaha</option>
                      <option value="Legalitas Administratif Standar">Legalitas Administratif Standar</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kewajiban Retribusi / Pajak</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.kewajibanRetribusi} onChange={e => handleDataChange('kewajibanRetribusi', e.target.value)}>
                      <option value="Ditanggung Sepenuhnya Oleh Pihak Pertama">Ditanggung Pemohon</option>
                      <option value="Bebas Retribusi Selama Tahun Pertama">Bebas Retribusi Sementara</option>
                      <option value="Berdasarkan Kesepakatan Khusus Instansi Terkait">Kesepakatan Khusus</option>
                  </select>
                </div>
              </div>
              )}
           </div>

           {/* Mobile View Toggle */}
           <div className="p-4 border-t bg-white md:hidden flex gap-2 z-20">
              <button onClick={() => setMobileView('preview')} className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold text-xs uppercase shadow-md active:scale-95 transition-transform">
                Lihat Dokumen
              </button>
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-500 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:block' : 'block'} print:hidden print:overflow-visible print:bg-white print:static`}>
           <div className="md:hidden sticky top-0 bg-slate-800 text-white p-3 flex justify-between items-center z-50 shadow-md">
             <button onClick={() => setMobileView('editor')} className="flex items-center gap-2 text-xs font-bold uppercase">
               <ArrowLeft size={16} /> Kembali ke Editor
             </button>
             <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-500 px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold uppercase active:scale-95 transition-transform">
               <Printer size={14} /> Cetak
             </button>
           </div>

           <div className="p-4 md:p-8 min-h-max flex justify-center w-full">
               <DocumentContent />
           </div>
        </div>

      </main>

      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
          <div className="bg-white print:p-0">
             <DocumentContent />
          </div>
      </div>
    </div>
  );
}
