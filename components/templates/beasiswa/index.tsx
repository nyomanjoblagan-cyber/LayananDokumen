'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Building2, User, GraduationCap, Banknote, MapPin, Scale, FileText
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface AgreementData {
  city: string;
  date: string;

  // Pihak Pertama (Pemberi)
  instansiName: string;
  wakilName: string;
  wakilJabatan: string;
  instansiAddress: string;

  // Pihak Kedua (Penerima)
  penerimaName: string;
  penerimaNik: string;
  penerimaTtl: string;
  penerimaPekerjaan: string;
  penerimaAddress: string;

  // Detail Pendidikan
  univName: string;
  fakultas: string;
  nim: string;

  // Detail Beasiswa
  namaBeasiswa: string;
  nominalBeasiswa: string;
  durasiSemester: string;
  targetIpk: string;
  metodePembayaran: 'Langsung' | 'Melalui Universitas';
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: AgreementData = {
  city: 'Jakarta',
  date: '2026-08-15',

  instansiName: 'PT TEKNOLOGI MASA DEPAN TERANG',
  wakilName: 'Budi Raharjo, S.E., M.B.A.',
  wakilJabatan: 'Direktur Sumber Daya Manusia',
  instansiAddress: 'Gedung Cyber Tower Lt. 10, Jl. Sudirman Kav. 21, Jakarta Selatan',

  penerimaName: 'ANDI PRATAMA',
  penerimaNik: '3174012345678901',
  penerimaTtl: 'Bandung, 12 Mei 2003',
  penerimaPekerjaan: 'Mahasiswa',
  penerimaAddress: 'Jl. Margonda Raya No. 123, Kel. Pondok Cina, Kec. Beji, Kota Depok, Jawa Barat',

  univName: 'Universitas Indonesia',
  fakultas: 'Fakultas Ilmu Komputer',
  nim: '2023102030',

  namaBeasiswa: 'Beasiswa Tech Leader 2026',
  nominalBeasiswa: '15.000.000',
  durasiSemester: '8',
  targetIpk: '3.50',
  metodePembayaran: 'Langsung'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-56 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold uppercase">{value}</div>
  </div>
);

const ClauseItem = ({ num, text }: { num: string, text: React.ReactNode }) => (
  <div className="flex text-justify mb-2">
     <div className="w-8 shrink-0 font-bold">{num}.</div>
     <div className="flex-1">{text}</div>
  </div>
);

const Article = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
     <div className="text-center font-bold mb-4 underline uppercase">{title}</div>
     <div className="space-y-2">
        {children}
     </div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BeasiswaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Beasiswa...</div>}>
      <BeasiswaBuilder />
    </Suspense>
  );
}

function BeasiswaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<AgreementData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">PERJANJIAN PEMBERIAN BEASISWA</h1>
          <h2 className="font-bold text-[12pt] uppercase tracking-wider mt-1">{data.namaBeasiswa}</h2>
      </div>
      
      {/* PREAMBLE */}
      <div className="mb-6 text-justify">
          <p>
              Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
          </p>
      </div>

      {/* IDENTITAS PARA PIHAK */}
      <div className="pl-4 space-y-4 mb-6">
          <div className="flex">
              <div className="w-8 shrink-0 font-bold">I.</div>
              <div className="flex-1">
                  <IdentityRow label="Nama Instansi/Perusahaan" value={data.instansiName} />
                  <IdentityRow label="Diwakili Oleh" value={data.wakilName} />
                  <IdentityRow label="Jabatan" value={data.wakilJabatan} />
                  <IdentityRow label="Alamat Instansi" value={data.instansiAddress} />
                  <div className="mt-2 text-justify">
                    Dalam hal ini bertindak untuk dan atas nama <strong>{data.instansiName}</strong>, selaku pemberi beasiswa, untuk selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
                  </div>
              </div>
          </div>
          <div className="flex mt-6">
              <div className="w-8 shrink-0 font-bold">II.</div>
              <div className="flex-1">
                  <IdentityRow label="Nama Lengkap" value={data.penerimaName} />
                  <IdentityRow label="NIK" value={data.penerimaNik} />
                  <IdentityRow label="Tempat, Tgl Lahir" value={data.penerimaTtl} />
                  <IdentityRow label="Pekerjaan / Status" value={data.penerimaPekerjaan} />
                  <IdentityRow label="Alamat Lengkap" value={data.penerimaAddress} />
                  <div className="mt-2 text-justify">
                    Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku penerima beasiswa, untuk selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
                  </div>
              </div>
          </div>
      </div>

      <div className="mb-8 text-justify">
          <p>
              PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini menerangkan dan menyatakan telah sepakat untuk mengikatkan diri dalam Perjanjian Pemberian Beasiswa dengan syarat dan ketentuan sebagaimana tercantum dalam pasal-pasal berikut:
          </p>
      </div>

      <Article title="PASAL 1 : MAKSUD DAN TUJUAN">
          <ClauseItem num="1" text={`PIHAK PERTAMA sepakat untuk memberikan bantuan dana pendidikan (Beasiswa) berupa ${data.namaBeasiswa} kepada PIHAK KEDUA.`} />
          <ClauseItem num="2" text={`PIHAK KEDUA dengan ini menerima pemberian Beasiswa tersebut dan menyatakan kesediaannya untuk mematuhi seluruh syarat dan ketentuan yang ditetapkan oleh PIHAK PERTAMA.`} />
      </Article>

      <Article title="PASAL 2 : RINCIAN BEASISWA">
          <ClauseItem num="1" text={<span>Beasiswa yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA adalah sebesar <strong>Rp. {data.nominalBeasiswa}</strong> per semester/periode.</span>} />
          <ClauseItem num="2" text={<span>Pemberian Beasiswa tersebut berlaku selama <strong>{data.durasiSemester} semester</strong> kalender akademik.</span>} />
          <ClauseItem num="3" text={<span>Pembayaran dana beasiswa akan disalurkan dengan cara <strong>{data.metodePembayaran}</strong> sesuai dengan jadwal pencairan yang telah ditentukan oleh PIHAK PERTAMA.</span>} />
      </Article>

      <Article title="PASAL 3 : HAK DAN KEWAJIBAN PIHAK KEDUA">
          <ClauseItem num="1" text={<span>PIHAK KEDUA wajib terdaftar sebagai mahasiswa aktif pada <strong>{data.univName}</strong>, fakultas/jurusan <strong>{data.fakultas}</strong> dengan Nomor Induk Mahasiswa (NIM) <strong>{data.nim}</strong>.</span>} />
          <ClauseItem num="2" text={<span>PIHAK KEDUA wajib mempertahankan Indeks Prestasi Kumulatif (IPK) sekurang-kurangnya <strong>{data.targetIpk}</strong> di setiap semesternya.</span>} />
          <ClauseItem num="3" text={`PIHAK KEDUA wajib melaporkan hasil studi (Transkrip Nilai) kepada PIHAK PERTAMA paling lambat 14 (empat belas) hari kalender setelah nilai semester diterbitkan oleh universitas.`} />
          <ClauseItem num="4" text={`PIHAK KEDUA berhak menerima pencairan dana beasiswa secara tepat waktu sesuai jadwal yang telah disepakati bersama, selama seluruh kewajiban telah terpenuhi.`} />
      </Article>

      <Article title="PASAL 4 : SANKSI DAN PEMBATALAN">
          <ClauseItem num="1" text={`PIHAK PERTAMA berhak membatalkan atau menghentikan pemberian beasiswa secara sepihak apabila PIHAK KEDUA terbukti melakukan pelanggaran hukum, pelanggaran kode etik universitas, atau terbukti menyalahgunakan dana peruntukan beasiswa.`} />
          <ClauseItem num="2" text={<span>Apabila PIHAK KEDUA gagal memenuhi syarat nilai akademik minimal (IPK {data.targetIpk}) selama 2 (dua) semester berturut-turut, maka status penerimaan beasiswa ini akan otomatis gugur tanpa perlu adanya teguran tertulis.</span>} />
      </Article>

      <Article title="PASAL 5 : PENUTUP DAN PENGESAHAN">
          <ClauseItem num="1" text={`Perjanjian Pemberian Beasiswa ini dibuat dan ditandatangani secara sadar, tanpa ada unsur paksaan dari pihak manapun, serta mempunyai kekuatan hukum yang mengikat sejak tanggal ditandatangani.`} />
          <ClauseItem num="2" text={`Hal-hal yang belum atau tidak cukup diatur dalam Surat Perjanjian ini akan diselesaikan secara musyawarah mufakat, dan apabila perlu akan dituangkan dalam suatu Adendum yang menjadi kesatuan tidak terpisahkan dari dokumen ini.`} />
      </Article>

      {/* TANDA TANGAN */}
      <div className="mt-16">
          <div className="flex justify-between text-center px-8">
              <div className="w-[45%]">
                  <p className="font-bold mb-24 uppercase">PIHAK PERTAMA<br/>Pemberi Beasiswa,</p>
                  <p className="font-bold underline uppercase">{data.wakilName}</p>
                  <p className="text-[10pt] uppercase">{data.wakilJabatan}</p>
              </div>
              <div className="w-[45%]">
                  <p className="font-bold mb-24 uppercase">PIHAK KEDUA<br/>Penerima Beasiswa,</p>
                  <p className="font-bold underline uppercase">{data.penerimaName}</p>
                  <p className="text-[10pt] uppercase">NIM: {data.nim}</p>
              </div>
          </div>
      </div>
    </Kertas>
  );

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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Beasiswa</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Beasiswa
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & WAKTU */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Tanggal
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Ditandatangani</label>
                      <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Perjanjian</label>
                      <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. PIHAK 1 (PEMBERI) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-purple-600"/> Pihak Pertama (Pemberi)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Perusahaan</label>
                      <input type="text" name="instansiName" value={data.instansiName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perwakilan</label>
                        <input type="text" name="wakilName" value={data.wakilName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                        <input type="text" name="wakilJabatan" value={data.wakilJabatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                      <textarea name="instansiAddress" value={data.instansiAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. PIHAK 2 (PENERIMA) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Pihak Kedua (Penerima)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="penerimaName" value={data.penerimaName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                      <input type="text" name="penerimaNik" value={data.penerimaNik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tgl Lahir</label>
                        <input type="text" name="penerimaTtl" value={data.penerimaTtl} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status/Pekerjaan</label>
                        <input type="text" name="penerimaPekerjaan" value={data.penerimaPekerjaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea name="penerimaAddress" value={data.penerimaAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. DETAIL PENDIDIKAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <GraduationCap size={14} className="text-amber-600"/> Data Pendidikan (Penerima)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Universitas / Institusi</label>
                      <input type="text" name="univName" value={data.univName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fakultas / Jurusan</label>
                        <input type="text" name="fakultas" value={data.fakultas} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPM / NIM / NISN</label>
                        <input type="text" name="nim" value={data.nim} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. DETAIL BEASISWA & KLAUSUL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Banknote size={14} className="text-teal-600"/> Klausul & Nilai Beasiswa
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Program Beasiswa</label>
                      <input type="text" name="namaBeasiswa" value={data.namaBeasiswa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nominal per Semester (Rp)</label>
                        <input type="text" name="nominalBeasiswa" value={data.nominalBeasiswa} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Durasi (Semester)</label>
                        <input type="number" name="durasiSemester" value={data.durasiSemester} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target IPK Minimal</label>
                        <input type="text" name="targetIpk" value={data.targetIpk} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Penyaluran</label>
                        <select name="metodePembayaran" value={data.metodePembayaran} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                          <option value="Langsung">Transfer Langsung ke Mahasiswa</option>
                          <option value="Melalui Universitas">Transfer Melalui Universitas</option>
                        </select>
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
              <PrintWrapper documentName="Perjanjian Pemberian Beasiswa" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
