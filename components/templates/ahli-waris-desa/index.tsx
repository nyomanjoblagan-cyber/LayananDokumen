'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Plus, Trash2, User, Users, Scale, FileText, Building2, MapPin, Building
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Pewaris {
    nama: string;
    nik: string;
    tglMeninggal: string;
    tempatMeninggal: string;
    alamatTerakhir: string;
}

interface Identity {
    id: string;
    nama: string;
    nik: string;
    ttl: string;
    pekerjaan: string;
    alamat: string;
    hubungan: string;
}

interface DocumentState {
    // Kop Desa
    kabupaten: string;
    kecamatan: string;
    desa: string;
    alamatDesa: string;
    noSuratDesa: string;
    noRegKecamatan: string;
    tanggalSurat: string;
    
    // Pewaris
    pewaris: Pewaris;
    
    // Ahli Waris
    ahliWaris: Identity[];
    
    // Opsi Dinamis
    metodePembagian: string;
    penyelesaianPajak: string;
    tanggunganHutang: string;
    
    // Pejabat & Saksi
    lurah: string;
    nipLurah: string;
    camat: string;
    nipCamat: string;
    saksi1: string;
    saksi2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DocumentState = {
    kabupaten: 'KABUPATEN BOGOR',
    kecamatan: 'CIBINONG',
    desa: 'KELURAHAN CIRIMEKAR',
    alamatDesa: 'Jl. Pemda No. 10, Cibinong, Bogor 16915',
    noSuratDesa: '470 / 123 / KEL-CRM / 2026',
    noRegKecamatan: '590 / 045 / KEC-CBN / 2026',
    tanggalSurat: '01 November 2026',
    
    pewaris: {
        nama: 'H. AHMAD SYAFIUDDIN',
        nik: '3201010101500001',
        tglMeninggal: '20 November 2025',
        tempatMeninggal: 'RSUD Cibinong',
        alamatTerakhir: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong'
    },
    
    ahliWaris: [
        {
            id: '1',
            nama: 'BUDI SANTOSO',
            nik: '3201010101800002',
            ttl: 'Bogor, 15 Agustus 1980',
            pekerjaan: 'Wiraswasta',
            alamat: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong',
            hubungan: 'Anak Kandung Laki-laki'
        },
        {
            id: '2',
            nama: 'SITI AMINAH',
            nik: '3201010101850003',
            ttl: 'Bogor, 20 Oktober 1985',
            pekerjaan: 'Pegawai Negeri Sipil',
            alamat: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong',
            hubungan: 'Anak Kandung Perempuan'
        }
    ],
    
    metodePembagian: 'dibagi_rata',
    penyelesaianPajak: 'potong_langsung',
    tanggunganHutang: 'bayar_dari_warisan',
    
    lurah: 'H. SUPRIATNA, S.IP',
    nipLurah: '19700101 199503 1 002',
    camat: 'Drs. H. BAMBANG WAHYUDI, M.Si',
    nipCamat: '19650212 199003 1 004',
    saksi1: 'AGUS SALIM (Ketua RW 02)',
    saksi2: 'RUDI HERMANSYAH (Ketua RT 01)'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto">
    {children}
  </div>
);

// Bantuan Numerik
const getPartyName = (index: number) => {
  const names = ['PERTAMA', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN', 'KESEMBILAN', 'KESEPULUH'];
  return names[index] || `KE-${index + 1}`;
};

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-48 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold">{value}</div>
  </div>
);

const Article = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
  <div className="mb-6 break-inside-avoid">
     <div className="text-center font-bold mb-2">
        <p className="underline">{title}</p>
        <p>{subtitle}</p>
     </div>
     <div className="space-y-2 text-justify">
        {children}
     </div>
  </div>
);

const ClauseItem = ({ num, text }: { num: string, text: React.ReactNode }) => (
  <div className="flex">
     <div className="w-6 shrink-0">{num}.</div>
     <div className="flex-1">{text}</div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function AhliWarisDesaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Ahli Waris Desa...</div>}>
      <AhliWarisDesaBuilder />
    </Suspense>
  );
}

function AhliWarisDesaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<DocumentState>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePewarisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, pewaris: { ...data.pewaris, [e.target.name]: e.target.value } });
  };

  const handleAhliWarisChange = (id: string, field: keyof Identity, value: string) => {
    setData({ ...data, ahliWaris: data.ahliWaris.map(aw => aw.id === id ? { ...aw, [field]: value } : aw) });
  };
  const addAhliWaris = () => {
    setData({ ...data, ahliWaris: [...data.ahliWaris, { id: Date.now().toString(), nama: '', nik: '', ttl: '', pekerjaan: '', alamat: '', hubungan: '' }] });
  };
  const removeAhliWaris = (id: string) => {
    setData({ ...data, ahliWaris: data.ahliWaris.filter(aw => aw.id !== id) });
  };

  const DocumentContent = () => {
    let metodeText = '';
    if(data.metodePembagian === 'dibagi_rata') metodeText = "dibagi rata secara proporsional kepada seluruh PARA PIHAK tanpa membedakan persentase khusus.";
    else if(data.metodePembagian === 'hukum_agama') metodeText = "dibagi berdasarkan ketentuan Faraid / Hukum Waris Islam sebagaimana mestinya.";
    else metodeText = "dibagi berdasarkan musyawarah mufakat kekeluargaan yang tertuang dalam akta kesepakatan terpisah.";

    let pajakText = '';
    if(data.penyelesaianPajak === 'tanggung_renteng') pajakText = "ditanggung secara bersama-sama (tanggung renteng) oleh PARA PIHAK dengan persentase yang sama besar.";
    else pajakText = "dipotong secara langsung dari nilai harta peninggalan (baik dari saldo tabungan maupun hasil penjualan aset) sebelum sisa bersihnya dibagikan kepada PARA PIHAK.";

    let hutangText = '';
    if(data.tanggunganHutang === 'bayar_dari_warisan') hutangText = "diselesaikan serta dibayarkan terlebih dahulu menggunakan harta peninggalan Pewaris sebelum adanya pembagian hak kepada PARA PIHAK.";
    else hutangText = "menjadi tanggung jawab mutlak PARA PIHAK secara pribadi dan ditanggung secara proporsional, tanpa mengurangi nilai pokok harta peninggalan secara langsung.";

    return (
      <Kertas>
        {/* KOP SURAT */}
        <div className="flex items-center border-b-[3px] border-double border-black pb-4 mb-6 text-center relative break-inside-avoid">
           <div className="flex-grow px-12">
              <h3 className="text-[12pt] font-bold uppercase tracking-wide">PEMERINTAH {data.kabupaten}</h3>
              <h2 className="text-[14pt] font-black uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
              <h1 className="text-[16pt] font-black uppercase underline tracking-widest">{data.desa}</h1>
              <p className="text-[10pt] font-sans mt-1 italic">{data.alamatDesa}</p>
           </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 break-inside-avoid">
           <h2 className="text-[14pt] font-bold underline uppercase tracking-wide">AKTA PERNYATAAN DAN KESEPAKATAN AHLI WARIS</h2>
           <p className="text-[11pt]">Nomor Desa: {data.noSuratDesa}</p>
           <p className="text-[11pt]">Nomor Register Kecamatan: {data.noRegKecamatan}</p>
        </div>

        {/* PEMBUKAAN */}
        <div className="text-justify mb-4">
           <p className="mb-4">
             Pada hari ini, dengan penuh kesadaran dan tanpa paksaan dari pihak manapun, kami yang bertanda tangan di bawah ini:
           </p>
        </div>

        {/* PARA PIHAK */}
        <div className="pl-4 space-y-4 mb-6">
           {data.ahliWaris.map((ahli, idx) => {
              const numeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][idx] || (idx+1).toString();
              return (
               <div key={ahli.id} className="flex break-inside-avoid mt-4">
                  <div className="w-8 shrink-0 font-bold">{numeral}.</div>
                  <div className="flex-1">
                     <IdentityRow label="Nama Lengkap" value={ahli.nama} />
                     <IdentityRow label="NIK" value={ahli.nik} />
                     <IdentityRow label="Tempat, Tgl Lahir" value={ahli.ttl} />
                     <IdentityRow label="Pekerjaan" value={ahli.pekerjaan} />
                     <IdentityRow label="Hubungan dgn Pewaris" value={ahli.hubungan} />
                     <IdentityRow label="Alamat Lengkap" value={ahli.alamat} />
                     <div className="mt-2 text-justify">
                       Untuk selanjutnya disebut sebagai <strong>PIHAK {getPartyName(idx)}</strong>.
                     </div>
                  </div>
               </div>
              )
           })}
        </div>

        <div className="text-justify mb-6 break-inside-avoid">
           <p className="mb-4">
             PIHAK PERTAMA{data.ahliWaris.length > 1 ? ', PIHAK KEDUA beserta pihak-pihak lainnya' : ''} secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong> (Segenap Ahli Waris).
           </p>
           <p className="mb-4">
             PARA PIHAK dengan ini menerangkan dan menyatakan dengan sumpah/janji yang sungguh-sungguh bahwa:
           </p>
        </div>

        {/* PEWARIS */}
        <div className="pl-4 space-y-2 mb-6 break-inside-avoid border border-black p-4">
           <IdentityRow label="Nama Almarhum" value={data.pewaris.nama} />
           <IdentityRow label="NIK" value={data.pewaris.nik} />
           <IdentityRow label="Tanggal Meninggal" value={data.pewaris.tglMeninggal} />
           <IdentityRow label="Tempat Meninggal" value={data.pewaris.tempatMeninggal} />
           <IdentityRow label="Alamat Terakhir" value={data.pewaris.alamatTerakhir} />
        </div>

        <div className="text-justify mb-8 break-inside-avoid">
           <p className="indent-8 mb-4">
             Bahwa almarhum tersebut di atas (selanjutnya disebut <strong>Pewaris</strong>) telah meninggal dunia secara sah, dan PARA PIHAK sepakat untuk menuangkan kesepakatan kewarisan dengan syarat-syarat dan ketentuan sebagaimana tertuang dalam pasal-pasal berikut:
           </p>
        </div>

        {/* PASAL-PASAL */}
        <Article title="PASAL 1" subtitle="DEFINISI DAN KEDUDUKAN PARA PIHAK">
           <ClauseItem num="1" text="Pewaris adalah individu sebagaimana identitasnya diuraikan di atas yang telah wafat dan meninggalkan ahli waris yang sah secara hukum serta harta peninggalan." />
           <ClauseItem num="2" text="PARA PIHAK secara mutlak dan sah diakui sebagai ahli waris sedarah dan/atau karena perkawinan yang berhak penuh atas segala harta peninggalan serta wajib bertanggung jawab atas segala kewajiban yang melekat pada Pewaris semasa hidupnya." />
           <ClauseItem num="3" text="Keterangan kewarisan ini dikuatkan, disaksikan, dan diketahui oleh Pejabat Pemerintahan setempat berdasarkan bukti-bukti kependudukan dan keterangan saksi-saksi yang sah." />
        </Article>

        <Article title="PASAL 2" subtitle="OBJEK WARISAN DAN KETERANGAN KEMATIAN">
           <ClauseItem num="1" text={<span>Bahwa Pewaris telah meninggal dunia pada tanggal <strong>{data.pewaris.tglMeninggal}</strong> bertempat di <strong>{data.pewaris.tempatMeninggal}</strong>.</span>} />
           <ClauseItem num="2" text="Bahwa adapun Objek Warisan yang ditinggalkan meliputi seluruh harta bergerak maupun tidak bergerak, tabungan, serta hak-hak lain yang bernilai ekonomis yang terdaftar atas nama Pewaris." />
           <ClauseItem num="3" text="Bahwa Surat Keterangan ini dibuat sebagai dasar hukum formal untuk proses peralihan hak, pencairan dana perbankan, dan/atau pengurusan balik nama sertifikat hak milik atas nama Pewaris kepada Para Ahli Waris." />
        </Article>

        <Article title="PASAL 3" subtitle="HAK DAN KEWAJIBAN AHLI WARIS">
           <ClauseItem num="1" text="PARA PIHAK selaku Ahli Waris berhak menerima secara utuh bagian dari harta peninggalan Pewaris tanpa terkecuali sesuai porsinya." />
           <ClauseItem num="2" text="PARA PIHAK berkewajiban untuk menyelesaikan segala administrasi hukum dan menjaga keutuhan harta warisan sebelum dilakukan pembagian secara definitif." />
           <ClauseItem num="3" text="Hak-hak pewarisan tersebut baru dapat dieksekusi secara final setelah seluruh kewajiban Pewaris telah dipenuhi sepenuhnya." />
        </Article>

        <Article title="PASAL 4" subtitle="METODE PEMBAGIAN WARISAN DAN PENYELESAIAN PAJAK">
           <ClauseItem num="1" text={<span>Bahwa PARA PIHAK sepakat secara bulat untuk menerapkan metode penyelesaian dan pembagian warisan dengan cara: <strong>{metodeText}</strong></span>} />
           <ClauseItem num="2" text={<span>Segala bentuk kewajiban beban Pajak Bumi dan Bangunan (PBB), Pajak Penghasilan (PPh), maupun Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB) Waris yang timbul, disepakati untuk diselesaikan dengan cara: <strong>{pajakText}</strong></span>} />
           <ClauseItem num="3" text={<span>Apabila di kemudian hari terbukti adanya tagihan utang piutang Pewaris kepada pihak ketiga, maka penyelesaiannya disepakati akan: <strong>{hutangText}</strong></span>} />
        </Article>

        <Article title="PASAL 5" subtitle="PEMBEBASAN TUNTUTAN HUKUM (INDEMNIFIKASI)">
           <ClauseItem num="1" text="PARA PIHAK menyatakan bahwa seluruh keterangan yang diberikan mengenai silsilah keluarga dan susunan ahli waris adalah benar dan dapat dipertanggungjawabkan di muka hukum." />
           <ClauseItem num="2" text="Apabila di kemudian hari terdapat pihak lain yang mengaku sebagai ahli waris dan dapat membuktikan haknya secara sah di Pengadilan, maka PARA PIHAK sepenuhnya membebaskan Pejabat Desa/Kelurahan dan Kecamatan dari segala bentuk tuntutan hukum, baik perdata maupun pidana." />
           <ClauseItem num="3" text="Segala kerugian materil maupun immateril yang timbul akibat ketidakbenaran keterangan ini sepenuhnya menjadi tanggung jawab mutlak PARA PIHAK secara tanggung renteng." />
        </Article>

        <Article title="PASAL 6" subtitle="PENYELESAIAN SENGKETA">
           <ClauseItem num="1" text="Segala perbedaan pendapat dan/atau sengketa yang timbul dalam pelaksanaan Akta Kesepakatan ini akan diselesaikan secara musyawarah untuk mufakat secara kekeluargaan." />
           <ClauseItem num="2" text="Apabila musyawarah mufakat tidak tercapai dalam tenggang waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikannya melalui jalur hukum yang berlaku dan memilih domisili hukum yang tetap di Kepaniteraan Pengadilan Negeri setempat." />
        </Article>

        <Article title="PASAL 7" subtitle="KETENTUAN LAIN-LAIN">
           <ClauseItem num="1" text="Surat Pernyataan dan Kesepakatan Ahli Waris ini berlaku sah dan mengikat sejak ditandatangani oleh PARA PIHAK dan diketahui serta disahkan oleh Pejabat berwenang setempat." />
           <ClauseItem num="2" text="Hal-hal yang belum atau tidak cukup diatur dalam kesepakatan ini akan dibicarakan lebih lanjut oleh PARA PIHAK secara musyawarah dalam adendum yang tidak terpisahkan dari dokumen ini." />
        </Article>

        <Article title="PASAL 8" subtitle="PENUTUP DAN PENGESAHAN">
           <ClauseItem num="1" text="Demikian Surat Pernyataan dan Kesepakatan Ahli Waris ini dibuat, disetujui, dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya unsur paksaan, penipuan, atau tekanan dari pihak manapun." />
           <ClauseItem num="2" text="Dokumen ini dicetak dan ditandatangani di atas meterai yang cukup, sehingga memiliki kekuatan hukum pembuktian yang sempurna, serta diregister secara resmi di tingkat Pemerintahan Desa/Kelurahan dan Kecamatan setempat." />
        </Article>

        {/* TANDA TANGAN */}
        <div className="mt-12 break-inside-avoid">
           <div className="text-center mb-8">
             <p>Dibuat dan ditandatangani di: <strong>{data.kabupaten.replace('KABUPATEN ', '').replace('KOTA ', '')}</strong></p>
             <p>Pada tanggal: <strong>{data.tanggalSurat}</strong></p>
           </div>
           
           <p className="font-bold text-center mb-8 underline uppercase">PARA PIHAK / AHLI WARIS</p>
           
           <div className="flex flex-wrap justify-center gap-y-12">
             {data.ahliWaris.map((ahli, idx) => (
               <div key={ahli.id} className="w-1/2 text-center px-4 mt-8">
                 <p className="font-bold mb-20">PIHAK {getPartyName(idx)}</p>
                 <p className="font-bold underline uppercase">{ahli.nama}</p>
               </div>
             ))}
           </div>
        </div>

        <div className="mt-16 break-inside-avoid">
           <p className="font-bold text-center mb-8 underline uppercase">SAKSI - SAKSI</p>
           <div className="flex flex-wrap justify-center gap-y-12">
              <div className="w-1/2 text-center px-4">
                 <p className="mb-20">Saksi I</p>
                 <p className="font-bold underline uppercase">{data.saksi1}</p>
              </div>
              <div className="w-1/2 text-center px-4">
                 <p className="mb-20">Saksi II</p>
                 <p className="font-bold underline uppercase">{data.saksi2}</p>
              </div>
           </div>
        </div>

        <div className="mt-16 break-inside-avoid border-t-2 border-black pt-8">
           <p className="text-center text-[12pt] font-bold uppercase mb-12">MENGETAHUI DAN MENGESAHKAN</p>
           <div className="flex flex-wrap justify-between">
             <div className="w-[45%] text-center">
                <p className="mb-2 font-mono text-[9pt]">Reg Kec: {data.noRegKecamatan}</p>
                <p className="font-bold uppercase mb-24">CAMAT {data.kecamatan}</p>
                <p className="font-bold underline uppercase">{data.camat}</p>
                <p>NIP. {data.nipCamat}</p>
             </div>
             <div className="w-[45%] text-center">
                <p className="mb-2 font-mono text-[9pt]">Reg Desa: {data.noSuratDesa}</p>
                <p className="font-bold uppercase mb-24">LURAH/KEPALA DESA {data.desa.replace('KELURAHAN ', '').replace('DESA ', '')}</p>
                <p className="font-bold underline uppercase">{data.lurah}</p>
                <p>NIP. {data.nipLurah}</p>
             </div>
           </div>
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Ahli Waris (Versi Desa)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Legal (Desa)
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. KOP SURAT DESA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building size={14} className="text-sky-600"/> Kop Surat Instansi
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kabupaten / Kota</label>
                        <input type="text" name="kabupaten" value={data.kabupaten} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kecamatan</label>
                        <input type="text" name="kecamatan" value={data.kecamatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Desa / Kelurahan</label>
                      <input type="text" name="desa" value={data.desa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kantor Desa</label>
                      <textarea name="alamatDesa" value={data.alamatDesa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 2. NOMOR REGISTRASI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Scale size={14} className="text-amber-600"/> Registrasi Akta
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Register Desa</label>
                      <input type="text" name="noSuratDesa" value={data.noSuratDesa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Register Kecamatan</label>
                      <input type="text" name="noRegKecamatan" value={data.noRegKecamatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dibuat</label>
                      <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 3. DATA PEWARIS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data Pewaris (Almarhum)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pewaris</label>
                      <input type="text" name="nama" value={data.pewaris.nama} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                      <input type="text" name="nik" value={data.pewaris.nik} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Meninggal</label>
                      <input type="text" name="tglMeninggal" value={data.pewaris.tglMeninggal} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Meninggal</label>
                      <input type="text" name="tempatMeninggal" value={data.pewaris.tempatMeninggal} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Terakhir</label>
                      <textarea name="alamatTerakhir" value={data.pewaris.alamatTerakhir} onChange={handlePewarisChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. DATA AHLI WARIS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Users size={14} className="text-emerald-600"/> Data Ahli Waris
                    </h3>
                    <button onClick={addAhliWaris} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah Ahli Waris
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.ahliWaris.map((aw, idx) => (
                      <div key={aw.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="text-xs font-bold text-slate-400">Pihak Ke-{idx + 1}</span>
                          <button onClick={() => removeAhliWaris(aw.id)} className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                        <div className="space-y-4 pr-10">
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                            <input type="text" value={aw.nama} onChange={(e) => handleAhliWarisChange(aw.id, 'nama', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK</label>
                               <input type="text" value={aw.nik} onChange={(e) => handleAhliWarisChange(aw.id, 'nik', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hub. Keluarga</label>
                               <input type="text" value={aw.hubungan} onChange={(e) => handleAhliWarisChange(aw.id, 'hubungan', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Istri / Anak" />
                             </div>
                           </div>
                           <div>
                             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tempat, Tgl Lahir</label>
                             <input type="text" value={aw.ttl} onChange={(e) => handleAhliWarisChange(aw.id, 'ttl', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div>
                             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                             <input type="text" value={aw.pekerjaan} onChange={(e) => handleAhliWarisChange(aw.id, 'pekerjaan', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                           </div>
                           <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat</label>
                            <textarea value={aw.alamat} onChange={(e) => handleAhliWarisChange(aw.id, 'alamat', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. KESEPAKATAN PEMBAGIAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-teal-600"/> Detail Kesepakatan (Pasal 4)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembagian</label>
                      <select name="metodePembagian" value={data.metodePembagian} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="dibagi_rata">Dibagi Rata Sama Besar</option>
                        <option value="hukum_agama">Hukum Agama (Faraid)</option>
                        <option value="kesepakatan_lain">Kesepakatan Lain (Adendum)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Pajak Waris</label>
                      <select name="penyelesaianPajak" value={data.penyelesaianPajak} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="potong_langsung">Dipotong Langsung dari Harta</option>
                        <option value="tanggung_renteng">Tanggung Renteng Para Ahli Waris</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan Hutang Pewaris</label>
                      <select name="tanggunganHutang" value={data.tanggunganHutang} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="bayar_dari_warisan">Dibayar dari Harta Warisan</option>
                        <option value="tanggung_pribadi">Ditanggung Pribadi Ahli Waris</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 6. PEJABAT & SAKSI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-indigo-600"/> Pengesahan & Saksi
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-sm text-slate-800 mb-3 border-b border-slate-200 pb-2">Lurah / Kepala Desa</h4>
                      <div className="space-y-3">
                        <input type="text" name="lurah" value={data.lurah} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" placeholder="Nama Lengkap" />
                        <input type="text" name="nipLurah" value={data.nipLurah} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="NIP" />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-sm text-slate-800 mb-3 border-b border-slate-200 pb-2">Camat</h4>
                      <div className="space-y-3">
                        <input type="text" name="camat" value={data.camat} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" placeholder="Nama Lengkap" />
                        <input type="text" name="nipCamat" value={data.nipCamat} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="NIP" />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-sm text-slate-800 mb-3 border-b border-slate-200 pb-2">Saksi</h4>
                      <div className="space-y-3">
                        <input type="text" name="saksi1" value={data.saksi1} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Nama Saksi 1" />
                        <input type="text" name="saksi2" value={data.saksi2} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" placeholder="Nama Saksi 2" />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Akta Pernyataan dan Kesepakatan Ahli Waris" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
