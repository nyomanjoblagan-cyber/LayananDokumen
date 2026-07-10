'use client';

/**
 * FILE: AhliWarisPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE LEGAL DRAFTING - WITH MONETIZATION)
 * DESC: Generator Akta Pernyataan dan Kesepakatan Ahli Waris
 * FEATURES:
 * - Enterprise Legal Drafting Standard (8 Pasal Komprehensif)
 * - Strict Pihak Pertama & Kedua Identity (KTP Standard)
 * - Dynamic Form Logic (Tanggungan, Pengelolaan Aset)
 * - The Teeth Protocol (Konsekuensi Pidana & Perdata)
 * - Strict A4 Print Layout (No CSS Grid/Tables in Pasal for MS Word parity)
 * - Mobile Menu Fixed & Ad Banner Ready
 */

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, Plus, Trash2, Users, Gavel, 
  ScrollText, ChevronDown, LayoutTemplate, 
  Edit3, Eye, ArrowLeftCircle, UserCheck, RotateCcw,
  AlertTriangle, Scale, ShieldAlert, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Identitas {
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  pekerjaan: string;
  alamat: string;
  hubungan: string;
}

interface Pewaris {
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  tanggalMeninggal: string;
  tempatMeninggal: string;
  alamatTerakhir: string;
  agama: string;
}

interface AhliWarisData {
  kotaPembuatan: string;
  tanggalPembuatan: string;
  
  pihakPertama: Identitas;
  pihakKedua: Identitas;
  pihakLainnya: Identitas[];
  
  pewaris: Pewaris;
  aset: string[];
  
  pengelolaanAset: string; 
  tanggunganHutangPajak: string; 
  
  saksi: { nama: string; jabatan: string }[];
  pejabat: { nama: string; jabatan: string; nip: string };
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: AhliWarisData = {
  kotaPembuatan: 'JAKARTA SELATAN',
  tanggalPembuatan: '', 
  
  pihakPertama: {
    nama: 'SITI AMINAH',
    nik: '3174001122334455',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1970-01-01',
    pekerjaan: 'Ibu Rumah Tangga',
    alamat: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
    hubungan: 'Istri Pewaris'
  },
  pihakKedua: {
    nama: 'BUDI SANTOSO',
    nik: '3174001122334456',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1995-05-15',
    pekerjaan: 'Karyawan Swasta',
    alamat: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
    hubungan: 'Anak Kandung Pewaris'
  },
  pihakLainnya: [
    {
        nama: 'LESTARI PUTRI',
        nik: '3174001122334457',
        tempatLahir: 'Jakarta',
        tanggalLahir: '1998-08-20',
        pekerjaan: 'Mahasiswi',
        alamat: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
        hubungan: 'Anak Kandung Pewaris'
    }
  ],
  
  pewaris: {
    nama: 'H. SUDIRMAN BIN KARTOPRAWIRO',
    nik: '3174001122330000',
    tempatLahir: 'Surabaya',
    tanggalLahir: '1965-03-10',
    tanggalMeninggal: '2025-05-10',
    tempatMeninggal: 'RS. Cipto Mangunkusumo, Jakarta',
    alamatTerakhir: 'Jl. Mawar No. 45, RT 005/RW 02, Tebet, Jakarta Selatan',
    agama: 'Islam'
  },
  
  aset: [
    'Sebidang tanah dan bangunan dengan Sertifikat Hak Milik (SHM) No. 1234/Tebet seluas 250 m2 yang terletak di Jl. Mawar No. 45, Jakarta Selatan.',
    'Saldo Tabungan pada Bank Mandiri Rekening No: 123-000-xxx atas nama Sudirman.'
  ],
  
  pengelolaanAset: 'Bersama', // Options: 'Bersama', 'Dikuasakan Pihak Pertama'
  tanggunganHutangPajak: 'Proporsional', // Options: 'Proporsional', 'Tanggung Renteng'
  
  saksi: [
      { nama: 'BAMBANG S.', jabatan: 'Ketua RT 005' },
      { nama: 'SUHARTO', jabatan: 'Ketua RW 02' }
  ],
  
  pejabat: {
    nama: 'DRS. HARYANTO',
    jabatan: 'LURAH TEBET',
    nip: '19700101 199002 1 001'
  }
};

const PIHAK_NAMES = ["PERTAMA", "KEDUA", "KETIGA", "KEEMPAT", "KELIMA", "KEENAM", "KETUJUH", "KEDELAPAN", "KESEMBILAN", "KESEPULUH"];

// --- 3. KOMPONEN UTAMA ---
export default function AhliWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Ahli Waris...</div>}>
      <AhliWarisToolBuilder />
    </Suspense>
  );
}

function AhliWarisToolBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  // Menggunakan Initial Data yang aman
  const [data, setData] = useState<AhliWarisData>(INITIAL_DATA);
  
  // SELF-HEALING EFFECT
  useEffect(() => {
    setData(prev => ({
      ...INITIAL_DATA,
      ...prev,
      pihakLainnya: prev?.pihakLainnya || INITIAL_DATA.pihakLainnya,
      aset: prev?.aset || INITIAL_DATA.aset,
      saksi: prev?.saksi || INITIAL_DATA.saksi,
      tanggalPembuatan: new Date().toISOString().split('T')[0]
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof AhliWarisData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handlePewarisChange = (field: keyof Pewaris, val: string) => {
    setData(prev => ({ ...prev, pewaris: { ...prev.pewaris, [field]: val } }));
  };

  const handlePihakPertamaChange = (field: keyof Identitas, val: string) => {
    setData(prev => ({ ...prev, pihakPertama: { ...prev.pihakPertama, [field]: val } }));
  };

  const handlePihakKeduaChange = (field: keyof Identitas, val: string) => {
    setData(prev => ({ ...prev, pihakKedua: { ...prev.pihakKedua, [field]: val } }));
  };

  const updatePihakLainnya = (idx: number, field: keyof Identitas, val: string) => {
    const arr = [...(data.pihakLainnya || [])];
    arr[idx] = { ...arr[idx], [field]: val };
    setData(prev => ({ ...prev, pihakLainnya: arr }));
  };
  const addPihakLainnya = () => setData(prev => ({ 
      ...prev, 
      pihakLainnya: [...(prev.pihakLainnya || []), { nama: '', nik: '', tempatLahir: '', tanggalLahir: '', pekerjaan: '', alamat: '', hubungan: '' }] 
  }));
  const removePihakLainnya = (idx: number) => {
    const arr = [...(data.pihakLainnya || [])]; 
    arr.splice(idx, 1); 
    setData(prev => ({ ...prev, pihakLainnya: arr }));
  };

  const updateAsset = (idx: number, val: string) => {
    const arr = [...(data.aset || [])];
    arr[idx] = val;
    setData(prev => ({ ...prev, aset: arr }));
  };
  const addAsset = () => setData(prev => ({ ...prev, aset: [...(prev.aset || []), ''] }));
  const removeAsset = (idx: number) => {
    const arr = [...(data.aset || [])]; 
    arr.splice(idx, 1); 
    setData(prev => ({ ...prev, aset: arr }));
  };

  const updateWitness = (idx: number, field: keyof typeof data.saksi[0], val: string) => {
    const arr = [...(data.saksi || [])];
    arr[idx] = { ...arr[idx], [field]: val };
    setData(prev => ({ ...prev, saksi: arr }));
  };
  const addWitness = () => setData(prev => ({ ...prev, saksi: [...(prev.saksi || []), { nama: '', jabatan: '' }] }));
  const removeWitness = (idx: number) => {
    const arr = [...(data.saksi || [])]; 
    arr.splice(idx, 1); 
    setData(prev => ({ ...prev, saksi: arr }));
  };

  const handlePejabatChange = (field: keyof typeof data.pejabat, val: string) => {
    setData(prev => ({ ...prev, pejabat: { ...prev.pejabat, [field]: val } }));
  };

  const handleReset = () => {
    if(window.confirm('Reset semua data ke default?')) {
        setData({ ...INITIAL_DATA, tanggalPembuatan: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU (FIX MOBILE) ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Enterprise Legal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Clean (Draft)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            const safeDate = new Date(dateString + 'T00:00:00');
            return safeDate.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    const allAhliWaris = [data.pihakPertama, data.pihakKedua, ...(data.pihakLainnya || [])];
    
    // Formatting helper for identity block
    const IdentityBlock = ({ title, p }: { title: string, p: Identitas }) => (
      <div className="mb-4 break-inside-avoid">
        <p className="font-bold mb-1">{title}</p>
        <div className="ml-4 space-y-0.5">
           <p><span className="inline-block w-40">Nama Lengkap</span><span>: <strong>{p.nama}</strong></span></p>
           <p><span className="inline-block w-40">N I K</span><span>: {p.nik}</span></p>
           <p><span className="inline-block w-40">Tempat, Tgl Lahir</span><span>: {p.tempatLahir}, {formatDate(p.tanggalLahir)}</span></p>
           <p><span className="inline-block w-40">Pekerjaan</span><span>: {p.pekerjaan}</span></p>
           <p><span className="inline-block w-40 align-top">Alamat (Sesuai KTP)</span><span className="inline-block w-[calc(100%-11rem)] align-top">: {p.alamat}</span></p>
           <p><span className="inline-block w-40">Hubungan Kekeluargaan</span><span>: {p.hubungan}</span></p>
        </div>
      </div>
    );

    if (templateId === 1) {
      // === TEMPLATE 1: ENTERPRISE LEGAL DRAFTING ===
      return (
        <div className="font-serif text-[11pt] text-black leading-[1.6]">
           
           <div className="text-center mb-10">
              <h1 className="text-[14pt] font-bold uppercase underline decoration-2 underline-offset-4 tracking-wider mb-2">AKTA PERNYATAAN DAN KESEPAKATAN AHLI WARIS</h1>
           </div>

           <div className="text-justify px-2 space-y-6">
              <p>Pada hari ini, tanggal <strong>{formatDate(data.tanggalPembuatan)}</strong>, bertempat di <strong>{data.kotaPembuatan}</strong>, kami yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4">
                 <IdentityBlock title="1. PIHAK PERTAMA" p={data.pihakPertama} />
                 <IdentityBlock title="2. PIHAK KEDUA" p={data.pihakKedua} />
                 {data.pihakLainnya.map((p, i) => (
                    <IdentityBlock key={i} title={`${i+3}. PIHAK ${PIHAK_NAMES[i+2] || 'SELANJUTNYA'}`} p={p} />
                 ))}
              </div>

              <p>PIHAK PERTAMA, PIHAK KEDUA{data.pihakLainnya.length > 0 ? `, dan PIHAK ${PIHAK_NAMES[data.pihakLainnya.length + 1]}` : ''} selanjutnya secara bersama-sama dalam Akta ini disebut sebagai <strong>"PARA PIHAK"</strong> atau <strong>"PARA AHLI WARIS"</strong>.</p>
              
              <p>PARA PIHAK dengan ini menyatakan dengan sebenar-benarnya, dalam keadaan sadar, sehat jasmani dan rohani, tanpa ada paksaan maupun tekanan dari pihak manapun, serta berani diangkat sumpah, sepakat untuk mengikatkan diri dalam Akta Pernyataan dan Kesepakatan Ahli Waris dengan ketentuan dan syarat-syarat (Pasal-Pasal) sebagai berikut:</p>

              {/* PASAL 1 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 1<br/>KETERANGAN PEWARIS & PERISTIWA HUKUM</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">
                    Bahwa pada tanggal <strong>{formatDate(data.pewaris.tanggalMeninggal)}</strong> bertempat di <strong>{data.pewaris.tempatMeninggal}</strong>, telah meninggal dunia seorang {data.pewaris.agama.toLowerCase() === 'islam' ? 'Muslim' : 'Warga Negara'}, yang selanjutnya dalam Akta ini disebut sebagai <strong>PEWARIS</strong>.
                  </li>
                  <li className="pl-2">
                    Bahwa PEWARIS semasa hidupnya memiliki identitas yang sah sesuai dengan dokumen kependudukan sebagai berikut:
                    <div className="ml-4 mt-2 space-y-0.5">
                       <p><span className="inline-block w-44">Nama Lengkap</span><span>: <strong>{data.pewaris.nama}</strong></span></p>
                       <p><span className="inline-block w-44">N I K</span><span>: {data.pewaris.nik}</span></p>
                       <p><span className="inline-block w-44">Tempat, Tgl Lahir</span><span>: {data.pewaris.tempatLahir}, {formatDate(data.pewaris.tanggalLahir)}</span></p>
                       <p><span className="inline-block w-44 align-top">Alamat Terakhir</span><span className="inline-block w-[calc(100%-12rem)] align-top">: {data.pewaris.alamatTerakhir}</span></p>
                       <p><span className="inline-block w-44">Agama</span><span>: {data.pewaris.agama}</span></p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* PASAL 2 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 2<br/>KEDUDUKAN HUKUM PARA AHLI WARIS</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Bahwa PARA PIHAK menjamin sepenuhnya bahwa selain PARA PIHAK yang disebutkan pada bagian awal Akta ini, <strong>TIDAK ADA LAGI</strong> ahli waris lain yang sah, baik yang diakui secara hukum negara, agama, maupun adat, yang berhak atas harta peninggalan dari PEWARIS.</li>
                  <li className="pl-2">Bahwa hubungan kekeluargaan yang disebutkan pada identitas PARA PIHAK adalah sah secara hukum dan dapat dibuktikan dengan dokumen resmi kenegaraan yang diterbitkan oleh instansi yang berwenang.</li>
                </ol>
              </div>

              {/* PASAL 3 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 3<br/>OBJEK HARTA PENINGGALAN (TIRKAH)</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Bahwa semasa hidupnya, PEWARIS meninggalkan sejumlah harta benda yang belum dibagi waris (Tirkah), dengan rincian sebagai berikut:
                    <div className="ml-4 mt-3">
                       {data.aset.length === 0 ? (
                          <p className="italic text-slate-500">Belum ada rincian aset.</p>
                       ) : (
                          <ul className="list-disc pl-5 space-y-2">
                             {data.aset.map((item, i) => (
                                <li key={i} className="pl-2">{item}</li>
                             ))}
                          </ul>
                       )}
                    </div>
                  </li>
                  <li className="pl-2 mt-4">Bahwa seluruh rincian harta tersebut merupakan kesatuan yang utuh dan tidak terpisahkan dari hak mewaris PARA PIHAK.</li>
                </ol>
              </div>

              {/* PASAL 4 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 4<br/>KESEPAKATAN PENGELOLAAN ASET</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">
                     {data.pengelolaanAset === 'Bersama' ? (
                       'Bahwa PARA PIHAK sepakat untuk mengelola, menjaga, dan memanfaatkan secara bersama-sama seluruh harta peninggalan PEWARIS sampai dengan dilakukannya pembagian waris secara final sesuai dengan porsi hukum yang berlaku.'
                     ) : (
                       'Bahwa PARA PIHAK dengan ini sepakat untuk memberikan kuasa penuh kepada PIHAK PERTAMA guna mewakili PARA AHLI WARIS dalam hal mengelola, mengurus administrasi, mencairkan dana (jika berupa rekening bank), dan tindakan-tindakan pengurusan lainnya atas harta peninggalan PEWARIS.'
                     )}
                  </li>
                  <li className="pl-2">Segala bentuk pengalihan hak, penjualan, maupun penjaminan harta warisan kepada pihak ketiga hanya dapat dilakukan apabila disetujui secara tertulis oleh seluruh PARA PIHAK.</li>
                </ol>
              </div>

              {/* PASAL 5 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 5<br/>TANGGUNG JAWAB UTANG DAN PAJAK PEWARIS</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Bahwa apabila dikemudian hari diketahui PEWARIS meninggalkan kewajiban berupa utang, tunggakan pajak, ataupun kewajiban finansial lainnya kepada pihak ketiga, maka:</li>
                  <li className="pl-2">
                     {data.tanggunganHutangPajak === 'Proporsional' ? (
                        'Kewajiban tersebut akan ditanggung dan diselesaikan oleh PARA PIHAK secara proporsional sesuai dengan bagian/porsi warisan masing-masing, yang diambil dari harta peninggalan sebelum dilakukan pembagian.'
                     ) : (
                        'Kewajiban tersebut akan ditanggung secara renteng oleh PARA PIHAK dan/atau dikuasakan penyelesaiannya kepada PIHAK PERTAMA dengan menggunakan harta peninggalan PEWARIS.'
                     )}
                  </li>
                </ol>
              </div>

              {/* PASAL 6 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 6<br/>PEMBEBASAN TUNTUTAN HUKUM (VRIJWARING)</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Bahwa PARA PIHAK dengan ini membebaskan pihak instansi pemerintah, lembaga perbankan, kepolisian, Badan Pertanahan Nasional (BPN), serta instansi swasta lainnya yang terkait, dari segala bentuk tuntutan maupun gugatan hukum di kemudian hari akibat dilaksanakannya pencairan, balik nama, maupun administrasi pengalihan hak menggunakan Akta ini.</li>
                </ol>
              </div>

              {/* PASAL 7 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 7<br/>KONSEKUENSI HUKUM DAN SANKSI</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Bahwa PARA PIHAK menyadari sepenuhnya akibat hukum dari pembuatan pernyataan palsu. Apabila di kemudian hari ternyata terdapat keterangan palsu, ahli waris yang sengaja dihilangkan, maupun pemalsuan dokumen yang menjadi dasar Akta ini, maka PARA PIHAK bersedia dituntut baik secara <strong>Pidana</strong> (merujuk pada Pasal 263 KUHP dan Pasal 266 KUHP tentang Pemalsuan Surat dan Keterangan Palsu) maupun secara <strong>Perdata</strong> (merujuk pada Pasal 1365 KUHPerdata tentang Perbuatan Melawan Hukum).</li>
                  <li className="pl-2">Segala kerugian materiil maupun immateriil yang timbul akibat kelalaian atau kesengajaan PARA PIHAK menjadi tanggung jawab PARA PIHAK sepenuhnya tanpa melibatkan Pejabat Pembuat, Saksi-Saksi, maupun instansi manapun.</li>
                </ol>
              </div>

              {/* PASAL 8 */}
              <div className="break-inside-avoid mb-6">
                <p className="font-bold text-center mb-3">Pasal 8<br/>PENUTUP</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="pl-2">Demikian Akta Pernyataan dan Kesepakatan Ahli Waris ini dibuat dan ditandatangani oleh PARA PIHAK dan Saksi-Saksi di <strong>{data.kotaPembuatan}</strong> pada tanggal <strong>{formatDate(data.tanggalPembuatan)}</strong> dalam keadaan sadar dan tanpa paksaan.</li>
                  <li className="pl-2">Akta ini dibuat rangkap secukupnya, bermeterai cukup yang memiliki kekuatan hukum yang sama bagi PARA PIHAK yang berkepentingan.</li>
                </ol>
              </div>
           </div>

           {/* AREA TTD */}
           <div className="mt-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
              <div className="mb-10">
                 <p className="font-bold mb-8 text-center uppercase tracking-wide">PARA PIHAK / PARA AHLI WARIS:</p>
                 <div className="flex flex-wrap justify-center gap-x-12 gap-y-16">
                    {allAhliWaris.map((p, idx) => (
                       <div key={idx} className="flex flex-col items-center w-40 break-inside-avoid">
                          <div className="h-24 flex items-center justify-center w-full relative mb-2">
                             {idx === 0 && (
                                <div className="border border-slate-400 text-[8pt] text-slate-400 w-16 h-10 flex items-center justify-center absolute bottom-0">
                                   MATERAI
                                </div>
                             )}
                          </div>
                          <p className="font-bold underline uppercase text-center">{p.nama}</p>
                          <p className="text-[10pt] text-center mt-1">Pihak {PIHAK_NAMES[idx]}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="pt-10 break-inside-avoid">
                 <div className="flex justify-between items-start">
                     <div className="w-1/2">
                        <p className="font-bold mb-8 uppercase tracking-wide">SAKSI-SAKSI:</p>
                        <div className="space-y-12 pl-4">
                           {data.saksi.map((w, i) => (
                              <div key={i} className="break-inside-avoid relative">
                                 <p className="font-bold mb-14">{i+1}. {w.nama}</p>
                                 <div className="border-b border-black w-48 mb-1"></div>
                                 <p className="text-[10pt] italic">Jabatan: {w.jabatan}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                     
                     {(data.pejabat?.nama) && (
                        <div className="w-1/2 text-center">
                           <p className="mb-2 uppercase tracking-wide">Mengetahui / Mencatatkan,</p>
                           <p className="font-bold uppercase mb-20">{data.pejabat.jabatan}</p>
                           
                           <p className="font-bold underline uppercase">{data.pejabat.nama}</p>
                           {data.pejabat.nip && <p className="text-[10pt] mt-1">NIP. {data.pejabat.nip}</p>}
                        </div>
                     )}
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // === TEMPLATE 2: MODERN CLEAN (DRAFT MODE) ===
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-relaxed">
           <div className="border-b-2 border-emerald-500 pb-4 mb-6">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Perjanjian & Kesepakatan Waris</h1>
              <p className="text-emerald-600 font-bold">Keluarga Besar Alm. {data.pewaris.nama}</p>
           </div>
           <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6">
              <p className="font-bold flex items-center gap-2 mb-1"><AlertTriangle size={16}/> Draft Mode</p>
              <p className="text-sm">Template Modern Clean digunakan untuk pratinjau data. Untuk cetak dokumen berstandar hukum formal yang dapat disahkan Pejabat (Notaris/Lurah), gunakan template <strong>Enterprise Legal</strong>.</p>
           </div>
           
           {/* Ringkasan Identitas */}
           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 break-inside-avoid">
                <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-3">Data Pewaris</p>
                <div className="space-y-2 text-sm">
                   <p><span className="text-slate-500 block text-xs">Nama:</span> <span className="font-bold">{data.pewaris.nama}</span></p>
                   <p><span className="text-slate-500 block text-xs">Wafat:</span> <span>{formatDate(data.pewaris.tanggalMeninggal)} di {data.pewaris.tempatMeninggal}</span></p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 break-inside-avoid">
                <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-3">Klausul Kesepakatan</p>
                <div className="space-y-2 text-sm">
                   <p><span className="text-slate-500 block text-xs">Pengelolaan Aset:</span> <span className="font-bold text-emerald-600">{data.pengelolaanAset}</span></p>
                   <p><span className="text-slate-500 block text-xs">Tanggungan Utang:</span> <span className="font-bold text-amber-600">{data.tanggunganHutangPajak}</span></p>
                </div>
              </div>
           </div>

           <div className="mb-6 break-inside-avoid">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Para Ahli Waris (Pihak Terikat)</p>
              <div className="space-y-3">
                 {allAhliWaris.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg">
                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">{idx+1}</div>
                       <div>
                          <p className="font-bold uppercase">{p.nama} <span className="text-xs text-slate-400 font-normal ml-2">({p.hubungan})</span></p>
                          <p className="text-sm text-slate-500">NIK: {p.nik} | {p.pekerjaan}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mb-6 break-inside-avoid">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Objek Harta (Tirkah)</p>
              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      {data.aset.map((item, i) => <li key={i}>{item}</li>)}
                  </ol>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT PARITY MS WORD - NO GRID/FLEX FOR PASAL CONTENT */}
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

      {/* HEADER */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Ahli Waris <span className="text-emerald-400">Enterprise</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Enterprise Legal' : 'Modern Clean'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={18} className="text-emerald-600" /> Form Data Hukum</h2>
                <button onClick={handleReset} title="Reset" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               
               {/* 1. DATA PEWARIS */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><Gavel size={14} className="text-amber-500"/> Keterangan Pewaris</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap (Alm/Almh)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pewaris.nama} onChange={e => handlePewarisChange('nama', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nomor Induk Kependudukan (NIK)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pewaris.nik} onChange={e => handlePewarisChange('nik', e.target.value)} /></div>
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.pewaris.tempatLahir} onChange={e => handlePewarisChange('tempatLahir', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tanggal Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.pewaris.tanggalLahir} onChange={e => handlePewarisChange('tanggalLahir', e.target.value)} /></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tanggal Wafat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.pewaris.tanggalMeninggal} onChange={e => handlePewarisChange('tanggalMeninggal', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Agama</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.pewaris.agama} onChange={e => handlePewarisChange('agama', e.target.value)} /></div>
                      </div>

                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Lokasi Wafat (RS/Rumah)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.pewaris.tempatMeninggal} onChange={e => handlePewarisChange('tempatMeninggal', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Alamat Terakhir Sesuai KTP</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.pewaris.alamatTerakhir} onChange={e => handlePewarisChange('alamatTerakhir', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. DATA AHLI WARIS */}
               <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                     <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2"><Users size={14} className="text-emerald-600"/> Kedudukan Ahli Waris</h3>
                  </div>

                  {/* PIHAK PERTAMA */}
                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 mb-2"><div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PIHAK 1</div><span className="text-xs font-bold text-emerald-800">Identitas Pihak Pertama</span></div>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Lengkap KTP" value={data.pihakPertama.nama} onChange={e => handlePihakPertamaChange('nama', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="NIK" value={data.pihakPertama.nik} onChange={e => handlePihakPertamaChange('nik', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Hubungan (Istri/Anak)" value={data.pihakPertama.hubungan} onChange={e => handlePihakPertamaChange('hubungan', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Tempat Lahir" value={data.pihakPertama.tempatLahir} onChange={e => handlePihakPertamaChange('tempatLahir', e.target.value)} /></div>
                         <div className="space-y-1"><input type="date" className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihakPertama.tanggalLahir} onChange={e => handlePihakPertamaChange('tanggalLahir', e.target.value)} /></div>
                         <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Pekerjaan" value={data.pihakPertama.pekerjaan} onChange={e => handlePihakPertamaChange('pekerjaan', e.target.value)} /></div>
                         <div className="col-span-2 space-y-1"><textarea className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-xs h-12 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Alamat Lengkap KTP" value={data.pihakPertama.alamat} onChange={e => handlePihakPertamaChange('alamat', e.target.value)} /></div>
                      </div>
                  </div>

                  {/* PIHAK KEDUA */}
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 mb-2"><div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PIHAK 2</div><span className="text-xs font-bold text-blue-800">Identitas Pihak Kedua</span></div>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Lengkap KTP" value={data.pihakKedua.nama} onChange={e => handlePihakKeduaChange('nama', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="NIK" value={data.pihakKedua.nik} onChange={e => handlePihakKeduaChange('nik', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Hubungan" value={data.pihakKedua.hubungan} onChange={e => handlePihakKeduaChange('hubungan', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tempat Lahir" value={data.pihakKedua.tempatLahir} onChange={e => handlePihakKeduaChange('tempatLahir', e.target.value)} /></div>
                         <div className="space-y-1"><input type="date" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.pihakKedua.tanggalLahir} onChange={e => handlePihakKeduaChange('tanggalLahir', e.target.value)} /></div>
                         <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Pekerjaan" value={data.pihakKedua.pekerjaan} onChange={e => handlePihakKeduaChange('pekerjaan', e.target.value)} /></div>
                         <div className="col-span-2 space-y-1"><textarea className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs h-12 resize-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Alamat Lengkap KTP" value={data.pihakKedua.alamat} onChange={e => handlePihakKeduaChange('alamat', e.target.value)} /></div>
                      </div>
                  </div>

                  {/* PIHAK LAINNYA */}
                  {data.pihakLainnya.map((p, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative group">
                        <div className="flex items-center gap-2 mb-2"><div className="bg-slate-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PIHAK {idx+3}</div><span className="text-xs font-bold text-slate-700">Pihak {PIHAK_NAMES[idx+2]}</span></div>
                        <button onClick={() => removePihakLainnya(idx)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 p-1"><Trash2 size={16}/></button>
                        <div className="grid grid-cols-2 gap-2">
                           <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Nama Lengkap KTP" value={p.nama} onChange={e => updatePihakLainnya(idx, 'nama', e.target.value)} /></div>
                           <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="NIK" value={p.nik} onChange={e => updatePihakLainnya(idx, 'nik', e.target.value)} /></div>
                           <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Hubungan" value={p.hubungan} onChange={e => updatePihakLainnya(idx, 'hubungan', e.target.value)} /></div>
                           <div className="col-span-2 space-y-1"><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-10 resize-none focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Alamat Lengkap KTP" value={p.alamat} onChange={e => updatePihakLainnya(idx, 'alamat', e.target.value)} /></div>
                           <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Tempat Lahir" value={p.tempatLahir} onChange={e => updatePihakLainnya(idx, 'tempatLahir', e.target.value)} /></div>
                           <div className="space-y-1"><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={p.tanggalLahir} onChange={e => updatePihakLainnya(idx, 'tanggalLahir', e.target.value)} /></div>
                           <div className="col-span-2 space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Pekerjaan" value={p.pekerjaan} onChange={e => updatePihakLainnya(idx, 'pekerjaan', e.target.value)} /></div>
                        </div>
                    </div>
                  ))}
                  <button onClick={addPihakLainnya} className="w-full py-3 border-2 border-dashed border-emerald-200 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                     <Plus size={16}/> Tambah Ahli Waris Lainnya
                  </button>
               </div>

               {/* 3. ASET & KLAUSUL (DYNAMIC OPTIONS) */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><ScrollText size={14} className="text-blue-500"/> Harta & Klausul Hukum</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                      
                      {/* Assets Array */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Daftar Objek Harta (Tirkah)</label></div>
                        {data.aset.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start group">
                                <span className="text-xs font-bold text-slate-400 py-2 w-4 shrink-0">{idx+1}.</span>
                                <textarea className="flex-1 p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-20" placeholder={`Sebutkan Sertifikat / Rekening Bank secara detail`} value={item} onChange={e => updateAsset(idx, e.target.value)} />
                                <button onClick={() => removeAsset(idx)} className="text-slate-300 hover:text-red-500 pt-2"><Trash2 size={16}/></button>
                            </div>
                        ))}
                        <button onClick={addAsset} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-all w-full">+ Tambah Objek Harta</button>
                      </div>

                      {/* Dropdowns Klausul */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                         <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><BookOpen size={12}/> Pasal 4: Metode Pengelolaan Aset</label>
                             <select className="w-full p-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 font-medium" value={data.pengelolaanAset} onChange={e => handleDataChange('pengelolaanAset', e.target.value)}>
                                 <option value="Bersama">Dikelola Bersama-sama</option>
                                 <option value="Dikuasakan Pihak Pertama">Dikuasakan Penuh kepada Pihak Pertama</option>
                             </select>
                         </div>
                         <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><Scale size={12}/> Pasal 5: Tanggungan Utang / Pajak</label>
                             <select className="w-full p-2.5 border border-slate-200 rounded-lg text-xs bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 font-medium" value={data.tanggunganHutangPajak} onChange={e => handleDataChange('tanggunganHutangPajak', e.target.value)}>
                                 <option value="Proporsional">Ditanggung Proporsional sesuai porsi</option>
                                 <option value="Tanggung Renteng">Tanggung Renteng / Potong Harta Langsung</option>
                             </select>
                         </div>
                         <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex gap-3 items-start">
                             <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5"/>
                             <div>
                                 <p className="text-xs font-bold text-amber-800">The Teeth Protocol Aktif</p>
                                 <p className="text-[10px] text-amber-700 mt-0.5 leading-relaxed">Pasal 7 berisi klausul pidana (Pasal 263/266 KUHP) dan perdata (Pasal 1365 BW) atas pemalsuan keterangan pewaris.</p>
                             </div>
                         </div>
                      </div>

                  </div>
               </div>

               {/* 4. PENUTUP & LEGALITAS */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><UserCheck size={14} className="text-indigo-500"/> Legalitas & Saksi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kota Penandatanganan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.kotaPembuatan} onChange={e => handleDataChange('kotaPembuatan', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tanggal Akta</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggalPembuatan} onChange={e => handleDataChange('tanggalPembuatan', e.target.value)} /></div>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-100">
                         <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Daftar Saksi</label><button onClick={addWitness} className="text-[9px] text-indigo-600 font-bold hover:underline">+ Tambah Saksi</button></div>
                         {data.saksi.map((w, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                               <input className="flex-1 p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama Lengkap Saksi" value={w.nama} onChange={e => updateWitness(idx, 'nama', e.target.value)} />
                               <input className="flex-1 p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jabatan/Status" value={w.jabatan} onChange={e => updateWitness(idx, 'jabatan', e.target.value)} />
                               <button onClick={() => removeWitness(idx)} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                         ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Pengesahan Pejabat (Lurah/Notaris)</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama Lengkap & Gelar Pejabat" value={data.pejabat.nama} onChange={e => handlePejabatChange('nama', e.target.value)} />
                         <div className="grid grid-cols-2 gap-2">
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jabatan Pejabat" value={data.pejabat.jabatan} onChange={e => handlePejabatChange('jabatan', e.target.value)} />
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="NIP / No. SK" value={data.pejabat.nip} onChange={e => handlePejabatChange('nip', e.target.value)} />
                         </div>
                      </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW TAMPILAN */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Akta_Ahli_Waris" price={25000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT ONLY PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '15mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
