import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\hutang\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: HutangPiutangPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Hutang Piutang (Legal Drafting Enterprise)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ChevronDown, Check, LayoutTemplate, 
  Wallet, Landmark, Users, CalendarClock, Edit3, Eye, Briefcase, RotateCcw, Settings
} from 'lucide-react';
import Link from 'next/link';

import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DebtData {
  city: string;
  date: string;

  // Pihak 1 (Kreditur)
  p1Name: string;
  p1Nik: string;
  p1Birth: string;
  p1Job: string;
  p1Address: string;

  // Pihak 2 (Debitur)
  p2Name: string;
  p2Nik: string;
  p2Birth: string;
  p2Job: string;
  p2Address: string;

  // Rincian Hutang
  amount: number;
  amountText: string;
  purpose: string;
  loanDate: string;
  
  // Cara Bayar
  paymentType: string;
  dueDate: string;
  installmentAmount: string;
  paymentMethod: string;
  interestRate: string;

  // Jaminan & Sanksi
  collateral: string;
  penalty: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DebtData = {
  city: 'Jakarta',
  date: '', 

  p1Name: 'BUDI SANTOSO',
  p1Nik: '3171010101800001',
  p1Birth: 'Jakarta, 15 Agustus 1980',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Menteng Atas No. 5, RT 001 RW 002, Kelurahan Menteng Atas, Kecamatan Setiabudi, Jakarta Selatan',

  p2Name: 'ASEP SAEPULOH',
  p2Nik: '3201010101900002',
  p2Birth: 'Bandung, 10 November 1990',
  p2Job: 'Karyawan Swasta',
  p2Address: 'Jl. Raya Bogor KM 30, RT 003 RW 004, Kelurahan Tugu, Kecamatan Cimanggis, Kota Depok',

  amount: 50000000,
  amountText: 'Lima Puluh Juta Rupiah',
  purpose: 'Tambahan modal usaha perdagangan sembako',
  loanDate: '', 
  
  paymentType: 'Cicilan Bertahap',
  dueDate: '', 
  installmentAmount: 'Rp 2.500.000 (Dua Juta Lima Ratus Ribu Rupiah) per bulan',
  paymentMethod: 'Transfer ke Rekening BCA 1234567890 atas nama Budi Santoso',
  interestRate: '0% (Nol Persen)',

  collateral: 'BPKB Kendaraan Bermotor Roda Dua Merk Honda PCX Tahun 2022 dengan Nomor Polisi B 1234 XYZ',
  penalty: '1% (Satu Persen) per hari keterlambatan dari nilai angsuran yang tertunggak',
  
  witness1: 'Iwan (Adik Kandung Pihak Kedua)',
  witness2: 'Ketua RT 05'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function HutangPiutangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Keuangan...</div>}>
      <DebtAgreementBuilder />
    </Suspense>
  );
}

function DebtAgreementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DebtData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        loanDate: today.toISOString().split('T')[0],
        dueDate: nextYear.toISOString().split('T')[0]
    }));
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const formatDateSafe = (dateString: string) => {
    if(!dateString) return '...';
    try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    } catch { return dateString; }
  };

  const handleDataChange = (field: keyof DebtData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'personal' | 'business') => {
    if (type === 'personal') {
      setData(prev => ({
        ...prev,
        amount: 5000000,
        amountText: 'Lima Juta Rupiah',
        purpose: 'Biaya pendidikan anak',
        paymentType: 'Lunas Sekaligus',
        installmentAmount: '-',
        collateral: 'Tanpa Jaminan',
        interestRate: '0% (Nol Persen)',
        penalty: 'Diselesaikan secara kekeluargaan (tanpa denda finansial)',
      }));
      setTemplateId(2); 
    } else if (type === 'business') {
      setData(prev => ({
        ...prev,
        amount: 150000000,
        amountText: 'Seratus Lima Puluh Juta Rupiah',
        purpose: 'Tambahan modal kerja / ekspansi bisnis ritel',
        paymentType: 'Cicilan Bertahap',
        installmentAmount: 'Rp 12.500.000 (Dua Belas Juta Lima Ratus Ribu Rupiah) per bulan',
        collateral: 'Sertifikat Hak Milik (SHM) No. 998877 atas sebidang tanah dan bangunan di Jakarta',
        interestRate: '2% (Dua Persen) per bulan flat',
        penalty: 'Denda 1.5% (Satu Koma Lima Persen) per hari dari nominal cicilan tertunggak',
      }));
      setTemplateId(1); 
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            loanDate: today.toISOString().split('T')[0],
            dueDate: nextYear.toISOString().split('T')[0] 
        });
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Perjanjian Hutang", desc: "Legal Formal Lengkap (8 Pasal)" },
    { id: 2, name: "Pernyataan Hutang", desc: "Pernyataan Sepihak (5 Pasal)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- ISI DOKUMEN ---
  const DocumentContent = () => (
    <Kertas templateId={templateId}>
      {templateId === 1 && (
        <div className="flex flex-col">
          <div className="text-center mb-6 pb-2 border-b-2 border-black">
            <h1 className="font-bold text-xl uppercase tracking-widest underline">SURAT PERJANJIAN HUTANG PIUTANG</h1>
          </div>

          <p className="mb-4 text-justify">
            Pada hari ini, <strong>{isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {weekday:'long'}) : '...'}</strong>, 
            tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
          </p>

          <div className="mb-4 space-y-4">
            <div className="break-inside-avoid">
                <div className="flex mb-1">
                    <div className="w-6">1.</div>
                    <div className="w-40 font-semibold">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.p1Name}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">NIK</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p1Nik}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Tempat, Tgl Lahir</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p1Birth}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p1Job}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold align-top">Alamat (Sesuai KTP)</div>
                    <div className="w-4 align-top">:</div>
                    <div className="flex-1 text-justify">{data.p1Address}</div>
                </div>
                <p className="ml-6 mt-2 text-justify">
                  Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (KREDITUR)</strong>.
                </p>
            </div>

            <div className="break-inside-avoid mt-4">
                <div className="flex mb-1">
                    <div className="w-6">2.</div>
                    <div className="w-40 font-semibold">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.p2Name}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">NIK</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Nik}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Tempat, Tgl Lahir</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Birth}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Job}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold align-top">Alamat (Sesuai KTP)</div>
                    <div className="w-4 align-top">:</div>
                    <div className="flex-1 text-justify">{data.p2Address}</div>
                </div>
                <p className="ml-6 mt-2 text-justify">
                  Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA (DEBITUR)</strong>.
                </p>
            </div>
          </div>

          <p className="mb-4 text-justify">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:
          </p>
          <ul className="list-disc ml-8 mb-6 text-justify space-y-1">
            <li>Bahwa PIHAK PERTAMA adalah pemilik dana sah yang setuju untuk meminjamkan sejumlah uang kepada PIHAK KEDUA.</li>
            <li>Bahwa PIHAK KEDUA membutuhkan dana tambahan untuk keperluan <strong>{data.purpose}</strong> dan telah mengajukan permohonan pinjaman kepada PIHAK PERTAMA.</li>
            <li>Bahwa PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Hutang Piutang ini dengan syarat dan ketentuan yang diatur dalam pasal-pasal di bawah ini.</li>
          </ul>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 1</p>
                <p>OBJEK PERJANJIAN</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>PIHAK PERTAMA dengan ini sepakat untuk memberikan pinjaman uang kepada PIHAK KEDUA, dan PIHAK KEDUA dengan ini sepakat untuk menerima pinjaman uang dari PIHAK PERTAMA sebesar <strong>{formatRupiah(data.amount)} ({data.amountText})</strong>.</li>
                <li>Penyerahan uang pinjaman tersebut telah dilakukan oleh PIHAK PERTAMA kepada PIHAK KEDUA secara penuh pada tanggal <strong>{formatDateSafe(data.loanDate)}</strong>.</li>
                <li>PIHAK KEDUA mengakui bahwa dengan ditandatanganinya Perjanjian ini, maka Perjanjian ini berlaku sebagai tanda terima yang sah (kuitansi) atas penerimaan uang pinjaman tersebut dari PIHAK PERTAMA.</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 2</p>
                <p>JANGKA WAKTU DAN JATUH TEMPO</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Perjanjian hutang piutang ini berlaku sejak tanggal ditandatanganinya Perjanjian ini sampai dengan seluruh kewajiban PIHAK KEDUA kepada PIHAK PERTAMA dinyatakan lunas.</li>
                <li>PIHAK KEDUA wajib mengembalikan dan melunasi seluruh pinjaman tersebut kepada PIHAK PERTAMA selambat-lambatnya pada tanggal <strong>{formatDateSafe(data.dueDate)}</strong> (selanjutnya disebut sebagai &quot;Tanggal Jatuh Tempo&quot;).</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 3</p>
                <p>MEKANISME PENGEMBALIAN DAN BUNGA</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Pengembalian pinjaman oleh PIHAK KEDUA kepada PIHAK PERTAMA akan dilakukan dengan sistem <strong>{data.paymentType.toUpperCase()}</strong>.</li>
                {data.paymentType === 'Cicilan Bertahap' && (
                <li>Pembayaran angsuran dilakukan secara bertahap dengan besaran pokok angsuran sejumlah <strong>{data.installmentAmount}</strong>.</li>
                )}
                <li>Pinjaman ini {data.interestRate === '0% (Nol Persen)' || data.interestRate.toLowerCase().includes('tanpa') || data.interestRate.trim() === '' ? 'tidak dikenakan bunga' : `dikenakan bunga sebesar ${data.interestRate}`} yang wajib dibayarkan bersamaan dengan pembayaran pokok pinjaman.</li>
                <li>Setiap pembayaran wajib dilakukan melalui metode: <strong>{data.paymentMethod}</strong>.</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 4</p>
                <p>JAMINAN (AGUNAN)</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                {data.collateral.toLowerCase().includes('tanpa') || data.collateral.trim() === '' ? (
                <li>Untuk menjamin pelunasan pinjaman ini, PIHAK KEDUA tidak menyerahkan jaminan khusus material, namun tetap bertanggung jawab penuh atas seluruh harta kekayaannya, baik yang bergerak maupun tidak bergerak yang ada sekarang maupun di kemudian hari untuk menjadi jaminan pelunasan hutang sesuai ketentuan Pasal 1131 Kitab Undang-Undang Hukum Perdata.</li>
                ) : (
                <>
                <li>Guna menjamin kepastian pelunasan seluruh kewajiban PIHAK KEDUA kepada PIHAK PERTAMA berdasarkan Perjanjian ini, PIHAK KEDUA dengan ini menyerahkan barang jaminan berupa: <strong>{data.collateral}</strong>.</li>
                <li>Barang jaminan sebagaimana dimaksud pada ayat (1) akan disimpan dan dikuasai secara fidusia/gadai oleh PIHAK PERTAMA selama hutang PIHAK KEDUA belum dinyatakan lunas.</li>
                <li>PIHAK PERTAMA wajib mengembalikan barang jaminan tersebut kepada PIHAK KEDUA dalam keadaan baik dan utuh seketika setelah PIHAK KEDUA melunasi seluruh kewajibannya.</li>
                </>
                )}
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 5</p>
                <p>SANKSI DAN WANPRESTASI</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Apabila PIHAK KEDUA lalai atau terlambat melakukan pembayaran dari jadwal yang telah disepakati, maka PIHAK KEDUA akan dikenakan denda keterlambatan sebesar <strong>{data.penalty}</strong>.</li>
                <li>PIHAK KEDUA dinyatakan melakukan wanprestasi (ingkar janji) apabila tidak dapat melunasi hutang setelah lewat Tanggal Jatuh Tempo.</li>
                <li>Dalam hal PIHAK KEDUA dinyatakan wanprestasi, maka PIHAK PERTAMA berhak penuh atas barang jaminan (jika ada) untuk menjual, memindahtangankan, atau mencairkan barang jaminan tersebut. Hasil penjualannya akan digunakan untuk melunasi seluruh sisa hutang dan denda PIHAK KEDUA.</li>
                <li>Apabila hasil penjualan barang jaminan belum mencukupi untuk melunasi sisa hutang, maka PIHAK KEDUA tetap wajib melunasi kekurangannya dari harta kekayaannya yang lain.</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 6</p>
                <p>FORCE MAJEURE (KEADAAN MEMAKSA)</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Yang dimaksud dengan Keadaan Memaksa (Force Majeure) adalah kejadian di luar kemampuan PARA PIHAK seperti bencana alam, kebakaran, perang, huru-hara, dan kebijakan pemerintah yang secara langsung berdampak pada keadaan ekonomi dan keuangan secara drastis sehingga pelunasan hutang terhambat.</li>
                <li>Dalam hal terjadi Force Majeure, pihak yang mengalaminya wajib memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari kalender.</li>
                <li>Keadaan Force Majeure tidak secara otomatis menghapus kewajiban pembayaran hutang PIHAK KEDUA, melainkan pelaksanaannya akan dirundingkan kembali oleh PARA PIHAK.</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 7</p>
                <p>PENYELESAIAN SENGKETA</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Apabila terjadi perselisihan atau perbedaan pendapat akibat pelaksanaan Perjanjian ini, maka PARA PIHAK sepakat untuk menyelesaikannya secara kekeluargaan melalui musyawarah untuk mufakat.</li>
                <li>Apabila penyelesaian secara musyawarah tidak mencapai mufakat, maka PARA PIHAK sepakat untuk menyelesaikannya melalui jalur hukum dan memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri wilayah domisili PIHAK PERTAMA.</li>
              </ol>
          </div>

          <div className="break-inside-avoid">
              <div className="text-center font-bold mb-4 mt-6">
                <p>PASAL 8</p>
                <p>PENUTUP</p>
              </div>
              <ol className="list-decimal ml-6 space-y-2 text-justify mb-6">
                <li>Hal-hal yang belum atau belum cukup diatur dalam Perjanjian ini akan diputuskan oleh PARA PIHAK secara musyawarah dan dituangkan dalam Addendum yang menjadi satu kesatuan dengan Perjanjian ini.</li>
                <li>Perjanjian ini dibuat dalam rangkap 2 (dua) yang masing-masing bermaterai cukup dan memiliki kekuatan hukum yang sama, satu rangkap untuk PIHAK PERTAMA dan satu rangkap untuk PIHAK KEDUA.</li>
              </ol>
          </div>

          <p className="mt-8 mb-12 text-justify break-inside-avoid">
            Demikian Surat Perjanjian ini dibuat dan ditandatangani oleh PARA PIHAK di <strong>{data.city}</strong> pada hari dan tanggal sebagaimana tersebut pada awal Perjanjian, dalam keadaan sadar dan tanpa adanya paksaan dari pihak manapun.
          </p>

          {/* SIGNATURES */}
          <div className="break-inside-avoid">
              <div className="flex justify-between px-8 text-center text-sm mb-12">
                  <div className="w-64">
                     <p className="font-bold uppercase mb-1">PIHAK KEDUA (DEBITUR)</p>
                     <p className="mb-2 text-[10px] text-gray-500 italic">Yang Menerima Pinjaman</p>
                     <div className="border border-dashed border-gray-400 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[9px] text-gray-400">MATERAI Rp10.000</div>
                     <p className="font-bold underline uppercase leading-tight">{data.p2Name}</p>
                  </div>
                  <div className="w-64">
                     <p className="font-bold uppercase mb-1">PIHAK PERTAMA (KREDITUR)</p>
                     <p className="mb-2 text-[10px] text-gray-500 italic">Yang Memberi Pinjaman</p>
                     <div className="w-24 h-16 mx-auto mb-2"></div>
                     <p className="font-bold underline uppercase leading-tight">{data.p1Name}</p>
                  </div>
              </div>

              <div className="text-center text-sm font-bold uppercase mb-6 mt-4">SAKSI-SAKSI</div>
              <div className="flex justify-around text-center text-sm">
                  <div className="w-56">
                     <p className="mb-24">1. Saksi Pertama</p>
                     <p className="font-bold underline uppercase">{data.witness1}</p>
                  </div>
                  <div className="w-56">
                     <p className="mb-24">2. Saksi Kedua</p>
                     <p className="font-bold underline uppercase">{data.witness2}</p>
                  </div>
              </div>
          </div>
        </div>
      )}

      {templateId === 2 && (
        <div className="flex flex-col leading-relaxed">
          <div className="text-center mb-6 pb-2 border-b-2 border-black">
            <h1 className="font-bold text-xl uppercase tracking-widest underline">SURAT PERNYATAAN PENGAKUAN HUTANG</h1>
          </div>

          <p className="mb-4 text-justify">
            Pada hari ini, <strong>{isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {weekday:'long'}) : '...'}</strong>, 
            tanggal <strong>{formatDateSafe(data.date)}</strong>, di <strong>{data.city}</strong>, Saya yang bertanda tangan di bawah ini:
          </p>

          <div className="mb-4 space-y-4">
            <div className="break-inside-avoid">
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.p2Name}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">NIK</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Nik}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Tempat, Tgl Lahir</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Birth}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p2Job}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold align-top">Alamat (Sesuai KTP)</div>
                    <div className="w-4 align-top">:</div>
                    <div className="flex-1 text-justify">{data.p2Address}</div>
                </div>
                <p className="ml-6 mt-2 text-justify">
                  Selanjutnya disebut sebagai <strong>PIHAK YANG BERHUTANG (DEBITUR)</strong>.
                </p>
            </div>
          </div>

          <p className="mb-4 text-justify">
            Dengan ini secara sadar dan tanpa paksaan dari pihak manapun menyatakan dengan sebenar-benarnya bahwa Saya memiliki hutang pinjaman uang kepada:
          </p>

          <div className="mb-6 space-y-4">
            <div className="break-inside-avoid">
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.p1Name}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold">NIK</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.p1Nik}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-6"></div>
                    <div className="w-40 font-semibold align-top">Alamat Lengkap</div>
                    <div className="w-4 align-top">:</div>
                    <div className="flex-1 text-justify">{data.p1Address}</div>
                </div>
                <p className="ml-6 mt-2 text-justify">
                  Selanjutnya disebut sebagai <strong>PIHAK YANG MEMBERI HUTANG (KREDITUR)</strong>.
                </p>
            </div>
          </div>

          <p className="mb-4 text-justify">
            Sehubungan dengan pengakuan hutang tersebut, Saya dengan ini menyetujui dan mengikatkan diri pada ketentuan-ketentuan sebagai berikut:
          </p>

          <div className="break-inside-avoid">
              <ol className="list-decimal ml-8 space-y-2 text-justify mb-8">
                <li>Bahwa Saya benar-benar memiliki hutang sejumlah <strong>{formatRupiah(data.amount)} ({data.amountText})</strong> yang telah Saya terima secara penuh pada tanggal <strong>{formatDateSafe(data.loanDate)}</strong>.</li>
                <li>Bahwa Saya berjanji dan sanggup akan melunasi hutang tersebut paling lambat pada tanggal <strong>{formatDateSafe(data.dueDate)}</strong>.</li>
                <li>Bahwa pengembalian hutang akan Saya lakukan secara <strong>{data.paymentType}</strong> {data.paymentType === 'Cicilan Bertahap' && `sebesar ${data.installmentAmount}`} dengan metode <strong>{data.paymentMethod}</strong>.</li>
                <li>Bahwa apabila lewat dari tanggal jatuh tempo Saya belum melunasi hutang tersebut, maka Saya bersedia dikenakan denda sebesar <strong>{data.penalty}</strong>.</li>
                <li>Bahwa untuk menjamin pelunasan hutang ini, Saya menyerahkan jaminan berupa: <strong>{data.collateral}</strong> yang dapat dicairkan oleh KREDITUR apabila Saya ingkar janji.</li>
              </ol>
          </div>

          <p className="mt-8 mb-12 text-justify break-inside-avoid">
            Demikian Surat Pernyataan Pengakuan Hutang ini Saya buat dengan sebenar-benarnya dalam keadaan sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun untuk dapat dipergunakan sebagaimana mestinya.
          </p>

          {/* SIGNATURES */}
          <div className="break-inside-avoid">
              <div className="flex justify-end text-center text-sm mb-12 mt-8">
                  <div className="w-64">
                     <p className="font-bold uppercase mb-2">YANG MEMBUAT PERNYATAAN,</p>
                     <div className="border border-dashed border-gray-400 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[9px] text-gray-400">MATERAI Rp10.000</div>
                     <p className="font-bold underline uppercase leading-tight">{data.p2Name}</p>
                     <p className="text-[10px] text-gray-500 mt-1">Debitur</p>
                  </div>
              </div>
          </div>
        </div>
      )}
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 print:bg-white print:min-h-0">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Hutang Piutang</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                    <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template Surat</div>
                    {TEMPLATES.map((t) => (
                      <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                        <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div></div>
                        {templateId === t.id && <Check size={14} className="text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-sky-600" /> Editor Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar">
              
              <div className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100 overflow-hidden break-inside-avoid">
                <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                   <Wallet size={14} className="text-emerald-600" />
                   <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Preset)</h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                   <button onClick={() => applyPreset('personal')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2.5 rounded-xl text-xs font-bold transition-colors">
                      Pribadi / Keluarga
                   </button>
                   <button onClick={() => applyPreset('business')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2.5 rounded-xl text-xs font-bold transition-colors">
                      Bisnis / Komersial
                   </button>
                </div>
              </div>

              {/* KREDITUR */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs font-black text-blue-800 uppercase tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                  <Briefcase size={14} className="text-blue-500"/> KREDITUR (PIHAK 1)
                </h3>
                <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Birth} onChange={e => handleDataChange('p1Birth', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                    </div>
                </div>
              </div>

              {/* DEBITUR */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs font-black text-rose-800 uppercase tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                  <Users size={14} className="text-rose-500"/> DEBITUR (PIHAK 2)
                </h3>
                <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Birth} onChange={e => handleDataChange('p2Birth', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                    </div>
                </div>
              </div>

              {/* NILAI DAN WAKTU */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs font-black text-amber-800 uppercase tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                  <Wallet size={14} className="text-amber-500"/> Nilai & Waktu
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nominal Pinjaman</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
                            <input type="number" className="w-full pl-9 pr-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-base font-black text-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Teks)</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 italic resize-none" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Pinjaman</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Pinjam</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.loanDate} onChange={e => handleDataChange('loanDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1.5">Jatuh Tempo</label>
                            <input type="date" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                        </div>
                    </div>
                </div>
              </div>

              {/* PEMBAYARAN DAN SANKSI */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs font-black text-purple-800 uppercase tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                  <CalendarClock size={14} className="text-purple-500"/> Pembayaran & Sanksi
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sistem Pembayaran</label>
                        <select className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-purple-500" value={data.paymentType} onChange={e => handleDataChange('paymentType', e.target.value)}>
                            <option value="Lunas Sekaligus">Lunas Sekaligus</option>
                            <option value="Cicilan Bertahap">Cicilan Bertahap</option>
                        </select>
                    </div>
                    {data.paymentType === 'Cicilan Bertahap' && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Besaran Cicilan</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.installmentAmount} onChange={e => handleDataChange('installmentAmount', e.target.value)} />
                    </div>
                    )}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Bayar (Rekening)</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bunga (Ketik manual)</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.interestRate} onChange={e => handleDataChange('interestRate', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Keterlambatan</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.penalty} onChange={e => handleDataChange('penalty', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jaminan / Agunan</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.collateral} onChange={e => handleDataChange('collateral', e.target.value)} />
                    </div>
                </div>
              </div>

              {/* METADATA & SAKSI */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                  <Settings size={14} className="text-slate-500"/> Lain-lain
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Tanda Tangan</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    
                    {templateId === 1 && (
                    <div className="pt-2 border-t border-slate-100">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi-Saksi</label>
                      <div className="grid grid-cols-2 gap-3 mt-1">
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
                      </div>
                    </div>
                    )}
                </div>
              </div>

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Perjanjian Hutang Piutang" price={15000} />
           </div>

        </div>

      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
