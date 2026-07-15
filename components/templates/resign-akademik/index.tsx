'use client';

/**
 * FILE: UndurDiriPendidikanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengunduran Diri Sekolah/Kampus (Standar Legal/Notaris)
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileWarning, Undo2, MapPin,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle, HelpCircle, FileText, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface WithdrawalData {
  // Info Surat
  nomorSurat: string;
  kota: string;
  tanggalSurat: string;

  // Pihak 1 (Siswa/Mahasiswa/Pemohon)
  namaPihak1: string;
  nikPihak1: string;
  ttlPihak1: string;
  pekerjaanPihak1: string;
  alamatPihak1: string;
  nimNisn: string;
  programStudi: string;

  // Pihak 2 (Instansi)
  namaInstansi: string;
  namaPihak2: string;
  nikPihak2: string;
  ttlPihak2: string;
  jabatanPihak2: string;
  alamatPihak2: string;

  // Kondisi
  alasanMundur: string;
  metodePenyelesaian: 'Lunas/Tunai' | 'Cicilan';
  tanggunganPajak: 'Ditanggung Pihak Pertama' | 'Bebas Biaya';
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WithdrawalData = {
  nomorSurat: '045/RES/AKD/2026',
  kota: 'DENPASAR',
  tanggalSurat: '', 
  
  namaPihak1: 'BAGUS RAMADHAN',
  nikPihak1: '5171020202020001',
  ttlPihak1: 'Denpasar, 15 Agustus 2002',
  pekerjaanPihak1: 'Mahasiswa',
  alamatPihak1: 'Jl. Tukad Pakerisan No. 99, Kelurahan Panjer, Kecamatan Denpasar Selatan, Kota Denpasar, Bali',
  nimNisn: '2208561001',
  programStudi: 'Fakultas Teknik / Teknologi Informasi (Semester IV)',
  
  namaInstansi: 'UNIVERSITAS UDAYANA (UNUD)',
  namaPihak2: 'PROF. DR. IR. MADE SUASTIKA, M.T.',
  nikPihak2: '19650202 199003 1 001',
  ttlPihak2: 'Gianyar, 10 Februari 1965',
  jabatanPihak2: 'Dekan Fakultas Teknik',
  alamatPihak2: 'Kampus Bukit Jimbaran, Kabupaten Badung, Bali',
  
  alasanMundur: 'Pindah domisili mengikuti orang tua ke luar kota (Jakarta) sehingga tidak memungkinkan untuk melanjutkan studi secara tatap muka secara optimal.',
  metodePenyelesaian: 'Lunas/Tunai',
  tanggunganPajak: 'Ditanggung Pihak Pertama'
};

const HARI_ARRAY = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN_ARRAY = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function terbilang(angka: number): string {
  const huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  if (angka < 12) return huruf[angka];
  if (angka < 20) return terbilang(angka - 10) + " belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " puluh " + terbilang(angka % 10);
  if (angka < 200) return "seratus " + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " ratus " + terbilang(angka % 100);
  if (angka < 2000) return "seribu " + terbilang(angka - 1000);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " ribu " + terbilang(angka % 1000);
  return angka.toString();
}

export default function UndurDiriPendidikanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <WithdrawalBuilder />
    </Suspense>
  );
}

function WithdrawalBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<WithdrawalData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalSurat: today }));
  }, []);

  const handleDataChange = (field: keyof WithdrawalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalSurat: today });
    }
  };

  const getFormatTanggalString = (dateStr: string) => {
    if (!dateStr) return { hari: '...', tanggalStr: '...', terbilangTanggal: '...', terbilangTahun: '...' };
    try {
      const d = new Date(dateStr);
      const hari = HARI_ARRAY[d.getDay()];
      const tgl = d.getDate();
      const bln = BULAN_ARRAY[d.getMonth()];
      const thn = d.getFullYear();
      
      return {
        hari,
        tanggalStr: `${tgl} ${bln} ${thn}`,
        terbilangTanggal: terbilang(tgl),
        terbilangTahun: terbilang(thn)
      };
    } catch {
      return { hari: '...', tanggalStr: dateStr, terbilangTanggal: '...', terbilangTahun: '...' };
    }
  };

  const dateData = getFormatTanggalString(data.tanggalSurat);

  const DocumentContent = () => {
    return (
      <div className="bg-white flex flex-col box-border text-black leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto font-serif text-[11pt]">
        
        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <p className="font-bold underline decoration-2 underline-offset-4 tracking-wide text-[14pt] uppercase">SURAT PERJANJIAN PENGUNDURAN DIRI DAN PELEPASAN HAK AKADEMIK</p>
          <p className="mt-1 font-bold tracking-widest text-[11pt]">Nomor: {data.nomorSurat}</p>
        </div>

        {/* KOMPARISI */}
        <div className="text-justify mb-6">
          <p className="mb-4">
            Pada hari ini, <strong>{dateData.hari}</strong>, tanggal <strong>{dateData.terbilangTanggal}</strong>, bulan <strong>{BULAN_ARRAY[new Date(data.tanggalSurat).getMonth()] || '...'}</strong>, tahun <strong>{dateData.terbilangTahun}</strong> ({dateData.tanggalStr}), bertempat di {data.kota}, kami yang bertanda tangan di bawah ini:
          </p>

          <div className="pl-0 mb-4">
            <div className="flex mb-1">
              <span className="w-6 font-bold">1.</span>
              <div className="flex-1">
                <div className="flex"><span className="w-48">Nama Lengkap</span><span className="w-4">:</span><span className="flex-1 font-bold uppercase">{data.namaPihak1}</span></div>
                <div className="flex"><span className="w-48">NIK</span><span className="w-4">:</span><span className="flex-1">{data.nikPihak1}</span></div>
                <div className="flex"><span className="w-48">Tempat, Tanggal Lahir</span><span className="w-4">:</span><span className="flex-1">{data.ttlPihak1}</span></div>
                <div className="flex"><span className="w-48">Pekerjaan</span><span className="w-4">:</span><span className="flex-1">{data.pekerjaanPihak1}</span></div>
                <div className="flex"><span className="w-48">Alamat Sesuai KTP</span><span className="w-4">:</span><span className="flex-1 text-justify">{data.alamatPihak1}</span></div>
                <div className="mt-2 text-justify">
                  Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku Mahasiswa/Siswa dengan NIM/NISN <strong>{data.nimNisn}</strong> pada Program Studi/Kelas <strong>{data.programStudi}</strong>, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                </div>
              </div>
            </div>
          </div>

          <div className="pl-0 mb-6">
            <div className="flex mb-1">
              <span className="w-6 font-bold">2.</span>
              <div className="flex-1">
                <div className="flex"><span className="w-48">Nama Lengkap</span><span className="w-4">:</span><span className="flex-1 font-bold uppercase">{data.namaPihak2}</span></div>
                <div className="flex"><span className="w-48">NIK / NIP</span><span className="w-4">:</span><span className="flex-1">{data.nikPihak2}</span></div>
                <div className="flex"><span className="w-48">Tempat, Tanggal Lahir</span><span className="w-4">:</span><span className="flex-1">{data.ttlPihak2}</span></div>
                <div className="flex"><span className="w-48">Jabatan</span><span className="w-4">:</span><span className="flex-1">{data.jabatanPihak2}</span></div>
                <div className="flex"><span className="w-48">Alamat Instansi</span><span className="w-4">:</span><span className="flex-1 text-justify">{data.alamatPihak2}</span></div>
                <div className="mt-2 text-justify">
                  Dalam hal ini bertindak dalam jabatannya tersebut, dari dan oleh karena itu bertindak untuk dan atas nama <strong>{data.namaInstansi}</strong>, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                </div>
              </div>
            </div>
          </div>

          <p className="mb-4">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai "<strong>PARA PIHAK</strong>" dan secara sendiri-sendiri disebut sebagai "<strong>PIHAK</strong>".
          </p>

          <p className="mb-2">PARA PIHAK terlebih dahulu menerangkan dan menyatakan hal-hal sebagai berikut (Premis):</p>
          <div className="pl-6 mb-4">
            <div className="flex"><span className="w-6">a.</span><span className="flex-1 text-justify">Bahwa PIHAK PERTAMA adalah peserta didik aktif/non-aktif yang terdaftar secara sah pada {data.namaInstansi}.</span></div>
            <div className="flex"><span className="w-6">b.</span><span className="flex-1 text-justify">Bahwa PIHAK PERTAMA atas kemauan dan inisiatif sendiri, bermaksud untuk mengundurkan diri dari {data.namaInstansi} dengan alasan: <em>"{data.alasanMundur}"</em>.</span></div>
            <div className="flex"><span className="w-6">c.</span><span className="flex-1 text-justify">Bahwa PIHAK KEDUA selaku perwakilan yang berwenang dari {data.namaInstansi} pada prinsipnya menyetujui permohonan pengunduran diri tersebut dengan syarat dan ketentuan yang diatur secara tegas dalam Perjanjian ini.</span></div>
          </div>

          <p className="mb-6">
            Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk membuat dan menandatangani Surat Perjanjian Pengunduran Diri dan Pelepasan Hak Akademik ini dengan ketentuan dan syarat-syarat yang diatur dalam pasal-pasal sebagai berikut:
          </p>
        </div>

        {/* PASAL-PASAL */}
        <div className="space-y-6 text-justify">
          
          <div>
            <p className="text-center font-bold mb-2">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">"Pengunduran Diri" adalah tindakan sadar dan sukarela dari PIHAK PERTAMA untuk berhenti secara permanen dari statusnya sebagai mahasiswa/siswa di instansi PIHAK KEDUA.</span></div>
              <div className="flex"><span className="w-6">2.</span><span className="flex-1">"Hak Akademik" adalah seluruh fasilitas, layanan pendidikan, status legal, dan keistimewaan yang melekat pada PIHAK PERTAMA sebagai peserta didik di instansi PIHAK KEDUA sebelum ditandatanganinya Perjanjian ini.</span></div>
            </div>
          </div>

          <div>
            <p className="text-center font-bold mb-2">PASAL 2<br/>OBJEK PERJANJIAN</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">PIHAK PERTAMA dengan ini menyatakan mengundurkan diri secara resmi dan melepaskan seluruh status, hak akademik, dan kewajibannya di <strong>{data.namaInstansi}</strong> terhitung sejak tanggal ditandatanganinya Perjanjian ini.</span></div>
              <div className="flex"><span className="w-6">2.</span><span className="flex-1">PIHAK KEDUA dengan ini menerima pengunduran diri PIHAK PERTAMA dan bersedia menerbitkan dokumen atau surat keterangan pengunduran diri yang sah sesuai dengan ketentuan administrasi yang berlaku di instansi PIHAK KEDUA.</span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PARA PIHAK</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Kewajiban PIHAK PERTAMA meliputi:
                <div className="pl-4 mt-1">
                  <div className="flex"><span className="w-6">a.</span><span className="flex-1">Mengembalikan seluruh barang, dokumen, buku perpustakaan, perangkat fasilitas asrama (jika ada), atau fasilitas pinjaman lainnya yang merupakan milik PIHAK KEDUA;</span></div>
                  <div className="flex"><span className="w-6">b.</span><span className="flex-1">Menyelesaikan seluruh kewajiban administrasi dan keuangan yang belum terselesaikan, sebagaimana diatur lebih lanjut pada Pasal 4 Perjanjian ini.</span></div>
                </div>
              </span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">Kewajiban PIHAK KEDUA meliputi:
                <div className="pl-4 mt-1">
                  <div className="flex"><span className="w-6">a.</span><span className="flex-1">Memberikan dokumen transkrip nilai akademik sementara, rapor terakhir, atau surat keterangan pindah (jika diperlukan) sesuai dengan capaian akademik PIHAK PERTAMA selama masa studi;</span></div>
                  <div className="flex"><span className="w-6">b.</span><span className="flex-1">Memproses dan menghapus data status aktif PIHAK PERTAMA pada pangkalan data instansi internal dan sistem pelaporan pendidikan nasional Kementerian terkait.</span></div>
                </div>
              </span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 4<br/>PENYELESAIAN ADMINISTRASI DAN KEUANGAN</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Mengenai penyelesaian seluruh kewajiban biaya pendidikan, SPP, dan/atau tunggakan keuangan lainnya, PARA PIHAK sepakat untuk menyelesaikannya dengan metode: <strong>{data.metodePenyelesaian}</strong>. 
                {data.metodePenyelesaian === 'Lunas/Tunai' ? 
                  ' (Seluruh pembayaran diselesaikan secara lunas bersamaan dengan penandatanganan Perjanjian ini, yang dibuktikan dengan kuitansi terpisah yang tidak terpisahkan dari Perjanjian ini).' : 
                  ' (Pembayaran akan dilakukan secara bertahap sesuai dengan jadwal cicilan/restrukturisasi yang disepakati oleh PARA PIHAK dalam lampiran terpisah yang merupakan satu kesatuan dengan Perjanjian ini).'}
              </span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">Terkait dengan biaya administrasi tambahan, denda (jika ada), dan/atau beban pajak yang mungkin timbul akibat proses pengunduran diri ini, PARA PIHAK sepakat bahwa pembebanan tersebut ditetapkan sebagai berikut: <strong>{data.tanggunganPajak}</strong>.
                {data.tanggunganPajak === 'Ditanggung Pihak Pertama' ? 
                  ' (Segala bentuk biaya administrasi pengunduran diri sepenuhnya menjadi beban dan tanggung jawab PIHAK PERTAMA).' : 
                  ' (PIHAK KEDUA membebaskan PIHAK PERTAMA dari segala bentuk biaya administrasi pengunduran diri tambahan, sehingga tidak ada lagi biaya yang harus ditanggung oleh PIHAK PERTAMA dalam proses ini).'}
              </span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 5<br/>PELEPASAN TUNTUTAN HUKUM</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Dengan ditandatanganinya Perjanjian ini dan diselesaikannya kewajiban sebagaimana dimaksud dalam Pasal 3 dan Pasal 4, PIHAK PERTAMA secara mutlak membebaskan dan melepaskan PIHAK KEDUA dari segala macam tuntutan hukum, gugatan, perlawanan, maupun klaim ganti rugi dalam bentuk apapun yang berkaitan dengan status pendidikan PIHAK PERTAMA, baik di masa lalu, masa kini, maupun di masa yang akan datang.</span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">PIHAK PERTAMA dengan ini mengikatkan diri untuk tidak menuntut pengembalian atau kompensasi atas biaya pendidikan, sumbangan, atau uang pembangunan yang telah dibayarkan kepada PIHAK KEDUA selama masa studi.</span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 6<br/>KEADAAN KAHAR (FORCE MAJEURE)</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Masing-masing PIHAK dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban berdasarkan Perjanjian ini apabila hal tersebut diakibatkan secara langsung oleh Keadaan Kahar.</span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">Yang dimaksud dengan Keadaan Kahar dalam Perjanjian ini adalah peristiwa di luar kekuasaan yang wajar dari PARA PIHAK, termasuk namun tidak terbatas pada bencana alam (gempa bumi, banjir bandang, tanah longsor), pandemi berskala nasional/global, huru-hara, pemberontakan, perang, atau kebijakan instansi pemerintah/regulator yang secara langsung menghalangi pelaksanaan Perjanjian ini.</span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 7<br/>PENYELESAIAN SENGKETA</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Segala perselisihan atau perbedaan pendapat yang timbul sebagai akibat dari penafsiran, pelaksanaan, maupun berakhirnya Perjanjian ini akan diupayakan penyelesaiannya oleh PARA PIHAK secara musyawarah untuk mencapai mufakat secara kekeluargaan.</span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">Apabila penyelesaian secara musyawarah mufakat sebagaimana dimaksud pada ayat (1) di atas tidak tercapai dalam waktu 30 (tiga puluh) hari kalender sejak perselisihan tersebut diberitahukan oleh salah satu PIHAK kepada PIHAK lainnya, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut dengan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri <strong>{data.kota}</strong>.</span></div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <p className="text-center font-bold mb-2">PASAL 8<br/>KETENTUAN PENUTUP</p>
            <div className="pl-6">
              <div className="flex"><span className="w-6">1.</span><span className="flex-1">Perjanjian ini merupakan keseluruhan kesepakatan tertulis antara PARA PIHAK dan dengan sendirinya menggantikan serta membatalkan segala bentuk kesepakatan, komunikasi, dan representasi sebelumnya yang berkaitan dengan objek Perjanjian ini, baik secara lisan maupun tertulis.</span></div>
              <div className="flex mt-2"><span className="w-6">2.</span><span className="flex-1">Perjanjian ini dibuat dalam rangkap 2 (dua), masing-masing dibubuhi materai yang cukup, ditandatangani secara basah atau elektronik yang sah oleh PARA PIHAK, dan masing-masing rangkap mempunyai kekuatan hukum pembuktian yang sama bagi PIHAK PERTAMA dan PIHAK KEDUA.</span></div>
            </div>
          </div>

          <p className="mt-8 mb-12 text-justify break-inside-avoid">
            Demikian Surat Perjanjian ini dibuat dengan sebenar-benarnya, dalam keadaan sadar jasmani dan rohani, serta tanpa adanya unsur paksaan, tekanan, maupun kekhilafan dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya.
          </p>

        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 break-inside-avoid">
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col items-center">
                  <p className="uppercase text-[10pt] font-bold text-slate-800 mb-2">PIHAK PERTAMA</p>
                  <p className="text-[9pt] text-slate-600 mb-8">Pemohon / Mahasiswa</p>
                  <div className="border border-slate-300 w-28 h-16 flex items-center justify-center text-[7pt] text-slate-400 italic mb-2 relative">
                    <span className="absolute transform -rotate-12">Materai 10.000</span>
                  </div>
                  <p className="font-bold underline uppercase text-[11pt] tracking-tight text-slate-900 mt-6">{data.namaPihak1}</p>
                  <p className="text-[9pt] mt-1">NIK. {data.nikPihak1}</p>
              </div>

              <div className="flex flex-col items-center">
                  <p className="uppercase text-[10pt] font-bold text-slate-800 mb-2">PIHAK KEDUA</p>
                  <p className="text-[9pt] text-slate-600 mb-24">Wakil Instansi / {data.namaInstansi}</p>
                  <p className="font-bold underline uppercase text-[11pt] tracking-tight text-slate-900">{data.namaPihak2}</p>
                  <p className="text-[9pt] mt-1">NIP/NIK. {data.nikPihak2}</p>
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
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Scale size={16} /> <span>Legal Resignation Deed Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen Hukum</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white font-sans shadow-sm z-10">
             <h2 className="font-black text-xs uppercase text-slate-800 flex items-center gap-2"><Edit3 size={16} className="text-blue-600" /> Form Data Legal</h2>
             <button onClick={handleReset} className="text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 text-[10px] font-bold bg-slate-100 px-2 py-1 rounded"><RotateCcw size={12}/> RESET</button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar pb-32 font-sans print:overflow-visible print:bg-white">
              
              {/* SEGMEN 1: INFO SURAT */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                   <FileText size={14} className="text-slate-600"/>
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-700">Info Dokumen</h3>
                 </div>
                 <div className="p-4 space-y-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nomor Surat / Akta</label>
                     <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} placeholder="045/RES/AKD/2026" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Kota Penandatanganan</label>
                       <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.kota} onChange={e => handleDataChange('kota', e.target.value)} placeholder="Kota" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tanggal</label>
                       <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                     </div>
                   </div>
                 </div>
              </div>

              {/* SEGMEN 2: PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2">
                   <UserCircle2 size={14} className="text-emerald-600"/>
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-800">Pihak Pertama (Pemohon)</h3>
                 </div>
                 <div className="p-4 space-y-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Lengkap (Sesuai KTP)</label>
                     <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" value={data.namaPihak1} onChange={e => handleDataChange('namaPihak1', e.target.value)} placeholder="Nama Lengkap" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">NIK</label>
                       <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none font-mono" value={data.nikPihak1} onChange={e => handleDataChange('nikPihak1', e.target.value)} placeholder="16 digit NIK" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Pekerjaan</label>
                       <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" value={data.pekerjaanPihak1} onChange={e => handleDataChange('pekerjaanPihak1', e.target.value)} placeholder="Mahasiswa/Pelajar" />
                     </div>
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tempat, Tanggal Lahir</label>
                     <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" value={data.ttlPihak1} onChange={e => handleDataChange('ttlPihak1', e.target.value)} placeholder="Denpasar, 15 Agustus 2002" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Alamat Lengkap (Sesuai KTP)</label>
                     <textarea className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none resize-none h-20" value={data.alamatPihak1} onChange={e => handleDataChange('alamatPihak1', e.target.value)} placeholder="Alamat lengkap..." />
                   </div>
                   <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                     <div>
                       <label className="text-[10px] font-bold text-emerald-600 uppercase mb-1 block">NIM / NISN</label>
                       <input className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none font-mono" value={data.nimNisn} onChange={e => handleDataChange('nimNisn', e.target.value)} placeholder="NIM / NISN" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-emerald-600 uppercase mb-1 block">Prodi / Kelas / Semester</label>
                       <input className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none" value={data.programStudi} onChange={e => handleDataChange('programStudi', e.target.value)} placeholder="Fakultas / Kelas" />
                     </div>
                   </div>
                 </div>
              </div>

              {/* SEGMEN 3: PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                 <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2">
                   <Building2 size={14} className="text-blue-600"/>
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-800">Pihak Kedua (Instansi)</h3>
                 </div>
                 <div className="p-4 space-y-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Instansi Pendidikan</label>
                     <input className="w-full p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.namaInstansi} onChange={e => handleDataChange('namaInstansi', e.target.value)} placeholder="Nama Sekolah / Kampus" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nama Wakil Instansi</label>
                     <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.namaPihak2} onChange={e => handleDataChange('namaPihak2', e.target.value)} placeholder="Nama Pimpinan/Rektor/Kepsek" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">NIP / NIK</label>
                       <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-mono" value={data.nikPihak2} onChange={e => handleDataChange('nikPihak2', e.target.value)} placeholder="Nomor Induk Pegawai" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Jabatan</label>
                       <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.jabatanPihak2} onChange={e => handleDataChange('jabatanPihak2', e.target.value)} placeholder="Rektor / Kepala Sekolah" />
                     </div>
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tempat, Tanggal Lahir</label>
                     <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.ttlPihak2} onChange={e => handleDataChange('ttlPihak2', e.target.value)} placeholder="Tempat, Tanggal Lahir" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Alamat Instansi</label>
                     <textarea className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none h-16" value={data.alamatPihak2} onChange={e => handleDataChange('alamatPihak2', e.target.value)} placeholder="Alamat Kampus/Sekolah..." />
                   </div>
                 </div>
              </div>

              {/* SEGMEN 4: KONDISI & KETENTUAN */}
              <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
                 <div className="bg-purple-50 border-b border-purple-100 px-4 py-2 flex items-center gap-2">
                   <ShieldCheck size={14} className="text-purple-600"/>
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-purple-800">Kondisi & Ketentuan Legal</h3>
                 </div>
                 <div className="p-4 space-y-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block flex items-center gap-1">
                       Alasan Pengunduran Diri <HelpCircle size={10} className="text-slate-400"/>
                     </label>
                     <textarea className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all outline-none leading-relaxed" value={data.alasanMundur} onChange={e => handleDataChange('alasanMundur', e.target.value)} placeholder="Jelaskan alasan secara formal..." />
                   </div>
                   
                   <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100 space-y-3">
                     <div>
                       <label className="text-[10px] font-bold text-purple-700 uppercase mb-1 block">Pasal 4.1 - Metode Penyelesaian Tanggungan</label>
                       <div className="relative">
                         <select 
                           className="w-full p-2.5 bg-white border border-purple-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer"
                           value={data.metodePenyelesaian}
                           onChange={e => handleDataChange('metodePenyelesaian', e.target.value as any)}
                         >
                           <option value="Lunas/Tunai">Lunas/Tunai saat penandatanganan</option>
                           <option value="Cicilan">Cicilan/Restrukturisasi Terjadwal</option>
                         </select>
                         <ChevronDown size={14} className="absolute right-3 top-3 pointer-events-none text-purple-400" />
                       </div>
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-purple-700 uppercase mb-1 block">Pasal 4.2 - Beban Biaya Administrasi</label>
                       <div className="relative">
                         <select 
                           className="w-full p-2.5 bg-white border border-purple-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer"
                           value={data.tanggunganPajak}
                           onChange={e => handleDataChange('tanggunganPajak', e.target.value as any)}
                         >
                           <option value="Ditanggung Pihak Pertama">Ditanggung Pihak Pertama (Pemohon)</option>
                           <option value="Bebas Biaya">Bebaskan Biaya / Ditanggung Bersama</option>
                         </select>
                         <ChevronDown size={14} className="absolute right-3 top-3 pointer-events-none text-purple-400" />
                       </div>
                     </div>
                   </div>
                 </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-300 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static print:p-0`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold border border-slate-700">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={14}/> EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={14}/> PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10 mt-4">
         <PrintWrapper documentName="Akta Pengunduran Diri Akademik" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
