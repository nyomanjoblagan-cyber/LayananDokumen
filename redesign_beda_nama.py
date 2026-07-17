import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\beda-nama\index.tsx"
    
    new_content = """'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    User, FileWarning, Scale, MapPin, Users
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BedaNamaData {
  // Metadata Surat
  city: string;
  date: string;
  
  // Identitas KTP (Yang Benar)
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  job: string;
  address: string;
  
  // Dokumen Pembanding (Yang Salah/Beda)
  documentType: string;
  docNumber: string;
  wrongName: string;
  wrongPlaceBirth: string;
  wrongDateBirth: string;
  
  // Pilihan & Alasan Dinamis
  reason: string;
  purpose: string;
  disputeResolution: string;
  
  // Saksi-Saksi
  witness1Name: string;
  witness1Nik: string;
  witness2Name: string;
  witness2Nik: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BedaNamaData = {
  city: 'SLEMAN',
  date: '2026-08-20', 
  
  name: 'MUHAMMAD RIZKY RAMADHAN',
  nik: '3404010101950003',
  placeBirth: 'YOGYAKARTA',
  dateBirth: '1995-02-15',
  job: 'Karyawan Swasta',
  address: 'Jl. Magelang KM 5, Mlati, Sleman, Daerah Istimewa Yogyakarta',
  
  documentType: 'Ijazah Strata-1 (S1)',
  docNumber: '1103.44.890/UGM/2018',
  wrongName: 'M. RIZKY RAMADHAN',
  wrongPlaceBirth: 'JOGJAKARTA',
  wrongDateBirth: '1995-02-15',
  
  reason: 'Kesalahan administrasi ketik oleh instansi penerbit',
  purpose: 'Persyaratan administratif pencairan dana asuransi kesehatan',
  disputeResolution: 'Musyawarah untuk mufakat',
  
  witness1Name: 'Sudarsono',
  witness1Nik: '3404010505700001',
  witness2Name: 'Dwi Astuti',
  witness2Nik: '3404014606720002'
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
  <div className="mb-6 break-inside-avoid">
     <div className="text-center font-bold mb-4 underline uppercase">{title}</div>
     <div className="space-y-2">
        {children}
     </div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BedaNamaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Beda Nama...</div>}>
      <BedaNamaBuilder />
    </Suspense>
  );
}

function BedaNamaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<BedaNamaData>(INITIAL_DATA);

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
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL SURAT */}
      <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double break-inside-avoid">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">SURAT PERNYATAAN BEDA NAMA / IDENTITAS</h1>
      </div>
      
      {/* PEMBUKAAN */}
      <div className="mb-6 text-justify">
          <p>
              Yang bertanda tangan di bawah ini:
          </p>
      </div>

      {/* IDENTITAS KTP (BENAR) */}
      <div className="pl-4 space-y-4 mb-6">
          <IdentityRow label="Nama Lengkap (Sesuai KTP)" value={data.name} />
          <IdentityRow label="Nomor Induk Kependudukan (NIK)" value={data.nik} />
          <IdentityRow label="Tempat, Tgl Lahir" value={`${data.placeBirth}, ${formatDateSafe(data.dateBirth)}`} />
          <IdentityRow label="Pekerjaan" value={data.job} />
          <IdentityRow label="Alamat Domisili" value={data.address} />
      </div>

      <div className="mb-8 text-justify">
          <p className="indent-8">
              Dalam hal ini bertindak untuk dan atas nama diri sendiri. Dengan ini saya memberikan keterangan dan menyatakan dengan sesungguhnya serta di bawah sumpah bahwa:
          </p>
      </div>

      <Article title="PASAL 1 : OBJEK PERNYATAAN">
          <ClauseItem num="1" text={<span>Bahwa benar saya memiliki dokumen resmi berupa <strong>{data.documentType}</strong> dengan Nomor Seri/Registrasi <strong>{data.docNumber}</strong>.</span>} />
          <ClauseItem num="2" text={<span>Bahwa pada dokumen tersebut di atas, terdapat ketidaksesuaian/perbedaan penulisan identitas diri saya, di mana tertulis Nama: <strong>{data.wrongName}</strong> dan Tempat/Tgl Lahir: <strong>{data.wrongPlaceBirth}, {formatDateSafe(data.wrongDateBirth)}</strong>.</span>} />
          <ClauseItem num="3" text={`Bahwa data identitas yang tertera pada Kartu Tanda Penduduk (KTP) dan Kartu Keluarga (KK) sebagaimana diuraikan pada bagian identitas di atas adalah data diri saya yang sebenar-benarnya dan sah secara hukum.`} />
      </Article>

      <Article title="PASAL 2 : PENEGASAN STATUS SUBJEK HUKUM">
          <ClauseItem num="1" text={<span>Bahwa perbedaan penulisan identitas sebagaimana dimaksud pada Pasal 1 murni terjadi karena <strong>{data.reason}</strong>.</span>} />
          <ClauseItem num="2" text={<span>Bahwa nama <strong>{data.wrongName}</strong> (sebagaimana tertulis pada dokumen {data.documentType}) dan nama <strong>{data.name}</strong> (sebagaimana tertulis pada e-KTP) adalah <strong>SATU ORANG YANG SAMA</strong>, yaitu saya sendiri.</span>} />
          <ClauseItem num="3" text={`Bahwa tidak ada maksud lain dari saya untuk memalsukan, mengubah, atau menyembunyikan identitas diri untuk tujuan yang melanggar hukum.`} />
      </Article>

      <Article title="PASAL 3 : TUJUAN PENGGUNAAN SURAT">
          <ClauseItem num="1" text={<span>Bahwa Surat Pernyataan ini saya buat dan saya tandatangani dengan tujuan khusus untuk <strong>{data.purpose}</strong>.</span>} />
          <ClauseItem num="2" text={`Bahwa dokumen ini merupakan bagian yang tidak terpisahkan dari persyaratan administratif yang diminta oleh instansi atau pihak yang berkepentingan.`} />
      </Article>

      <Article title="PASAL 4 : TANGGUNG JAWAB HUKUM DAN INDEMNIFIKASI">
          <ClauseItem num="1" text={`Bahwa apabila di kemudian hari terbukti pernyataan saya ini tidak benar, palsu, atau direkayasa yang mengakibatkan kerugian pada pihak lain, maka saya bersedia dituntut secara Hukum Pidana berdasarkan Pasal 263 Kitab Undang-Undang Hukum Pidana (KUHP) tentang Pemalsuan Surat.`} />
          <ClauseItem num="2" text={`Bahwa saya sepenuhnya membebaskan seluruh Pejabat Pemerintahan (termasuk namun tidak terbatas pada RT, RW, Lurah/Kepala Desa, Camat) maupun Pihak Ketiga yang menerima surat ini, dari segala bentuk tuntutan ganti rugi, gugatan perdata, maupun pidana akibat dari penggunaan Surat Pernyataan ini.`} />
          <ClauseItem num="3" text={<span>Segala sengketa yang timbul di kemudian hari terkait keabsahan dokumen ini akan diselesaikan melalui <strong>{data.disputeResolution}</strong>.</span>} />
      </Article>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="mt-8 break-inside-avoid">
          <p className="text-justify mb-12">
              Demikian Surat Pernyataan Beda Nama/Identitas ini saya buat dengan penuh kesadaran, tanpa paksaan dari pihak manapun, serta ditandatangani di atas meterai yang cukup agar dapat dipergunakan sebagaimana mestinya.
          </p>
          
          <div className="flex justify-between items-end px-8">
              <div className="w-[45%]">
                  <p className="font-bold mb-4 uppercase text-center">SAKSI - SAKSI</p>
                  <div className="space-y-12">
                     <div>
                        <p className="font-bold uppercase text-sm mb-1">1. {data.witness1Name}</p>
                        <p className="text-[10pt]">NIK: {data.witness1Nik}</p>
                        <p className="mt-6 border-b border-black w-48">( ................................... )</p>
                     </div>
                     <div>
                        <p className="font-bold uppercase text-sm mb-1">2. {data.witness2Name}</p>
                        <p className="text-[10pt]">NIK: {data.witness2Nik}</p>
                        <p className="mt-6 border-b border-black w-48">( ................................... )</p>
                     </div>
                  </div>
              </div>
              <div className="w-[45%] text-center">
                  <p className="mb-2">Dibuat di : <strong>{data.city}</strong></p>
                  <p className="mb-10">Pada tanggal : <strong>{formatDateSafe(data.date)}</strong></p>
                  <p className="font-bold mb-4 uppercase">YANG MEMBUAT PERNYATAAN,</p>
                  <div className="w-24 h-16 border-2 border-gray-300 border-dashed mx-auto flex items-center justify-center mb-4 text-[9pt] text-gray-400 no-print opacity-50">
                    METERAI<br/>10.000
                  </div>
                  <p className="font-bold underline uppercase">{data.name}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Beda Nama</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Beda Nama
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Tanggal Pembuatan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota / Kabupaten</label>
                      <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                      <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS KTP (YANG BENAR) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Identitas Valid (Sesuai KTP)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="name" value={data.name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                      <input type="text" name="nik" value={data.nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                        <input type="text" name="placeBirth" value={data.placeBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                        <input type="date" name="dateBirth" value={data.dateBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                      <input type="text" name="job" value={data.job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                      <textarea name="address" value={data.address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. DOKUMEN SALAH (YANG BEDA) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileWarning size={14} className="text-rose-600"/> Data Pada Dokumen Yang Berbeda
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Dokumen</label>
                        <input type="text" name="documentType" value={data.documentType} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" placeholder="Cth: Ijazah / Sertifikat" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Dokumen</label>
                        <input type="text" name="docNumber" value={data.docNumber} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Tertera (Yang Salah)</label>
                      <input type="text" name="wrongName" value={data.wrongName} onChange={handleStringChange} className="w-full bg-slate-50 border border-rose-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 bg-rose-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir (Yang Salah)</label>
                        <input type="text" name="wrongPlaceBirth" value={data.wrongPlaceBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir (Yang Salah)</label>
                        <input type="date" name="wrongDateBirth" value={data.wrongDateBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. ALASAN & KLAUSUL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Scale size={14} className="text-purple-600"/> Penjelasan & Klausul
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Perbedaan Terjadi</label>
                      <input type="text" name="reason" value={data.reason} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Surat Dibuat</label>
                      <textarea name="purpose" value={data.purpose} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Sengketa (Pasal 4)</label>
                      <input type="text" name="disputeResolution" value={data.disputeResolution} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 5. SAKSI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Users size={14} className="text-amber-600"/> Data Saksi (Opsional)
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 border border-slate-200 rounded-xl">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 1</label>
                        <input type="text" name="witness1Name" value={data.witness1Name} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK Saksi 1</label>
                        <input type="text" name="witness1Nik" value={data.witness1Nik} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 border border-slate-200 rounded-xl">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 2</label>
                        <input type="text" name="witness2Name" value={data.witness2Name} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK Saksi 2</label>
                        <input type="text" name="witness2Nik" value={data.witness2Nik} onChange={handleStringChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 outline-none" />
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
              <PrintWrapper documentName="Surat Pernyataan Beda Nama/Identitas" price={10000} />
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
