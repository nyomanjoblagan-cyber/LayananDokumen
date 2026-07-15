'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  UserCircle, Briefcase, FileText
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LamaranData {
  tempatTanggal: string;
  lampiran: string;
  hal: string;
  namaPenerima: string;
  perusahaanTujuan: string;
  alamatTujuan: string;
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pendidikan: string;
  alamatPelamar: string;
  noTelp: string;
  email: string;
  posisiDilamar: string;
  sumberInfo: string;
  pengalamanKeahlian: string;
  daftarLampiran: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LamaranData = {
  tempatTanggal: 'Jakarta, 14 Juli 2026',
  lampiran: '5 (Lima) Lembar',
  hal: 'Lamaran Pekerjaan',
  namaPenerima: 'HRD Manager',
  perusahaanTujuan: 'PT. INOVASI DIGITAL TEKNOLOGI',
  alamatTujuan: 'Gedung Cyber Lt. 10\nJl. Kuningan Barat No. 8, Jakarta Selatan 12710',
  namaLengkap: 'Budi Hartanto, S.Kom.',
  tempatLahir: 'Bandung',
  tanggalLahir: '15 Agustus 2000',
  jenisKelamin: 'Laki-laki',
  pendidikan: 'S1 Teknik Informatika - Institut Teknologi Bandung (IPK: 3.85)',
  alamatPelamar: 'Jl. Dago Asri No. 45, Coblong, Kota Bandung, Jawa Barat 40135',
  noTelp: '0812-3456-7890',
  email: 'budi.hartanto@email.com',
  posisiDilamar: 'Senior Frontend Developer',
  sumberInfo: 'portal lowongan kerja TechJobs.id pada tanggal 10 Juli 2026',
  pengalamanKeahlian: 'Saya memiliki pengalaman selama 3 tahun bekerja sebagai Frontend Engineer dengan fokus pada ekosistem React, Next.js, dan Tailwind CSS. Selama bekerja, saya telah berhasil memimpin tim dalam migrasi sistem legacy ke arsitektur modern yang meningkatkan performa aplikasi hingga 40%. Saya juga terbiasa bekerja dengan metodologi Agile/Scrum dan berkolaborasi erat dengan tim UI/UX serta Backend.',
  daftarLampiran: '1. Curriculum Vitae (CV)\n2. Fotokopi Ijazah Terakhir\n3. Fotokopi Transkrip Nilai\n4. Portofolio Project\n5. Pas Foto 4x6'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-snug text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function LamaranPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Lamaran...</div>}>
      <LamaranBuilder />
    </Suspense>
  );
}

function LamaranBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LamaranData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      <style dangerouslySetInnerHTML={{__html: `
        .lamaran-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
        .lamaran-table td:nth-child(1) { width: 30%; }
        .lamaran-table td:nth-child(2) { width: 2%; }
        .lamaran-table td:nth-child(3) { width: 68%; }
        p { font-size: 11pt; margin-bottom: 8px; line-height: 1.5; text-align: justify; }
        .surat-header td { font-size: 11pt; padding: 2px 0; vertical-align: top; }
      `}} />

      {/* Header / Tanggal */}
      <div className="text-right text-[11pt] mb-8 break-inside-avoid">
        {data.tempatTanggal}
      </div>
      
      <div className="mb-8 break-inside-avoid">
        <table className="surat-header w-full">
          <tbody>
            <tr>
              <td className="w-20">Hal</td>
              <td className="w-4">:</td>
              <td className="font-bold">{data.hal}</td>
            </tr>
            <tr>
              <td>Lampiran</td>
              <td>:</td>
              <td>{data.lampiran}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tujuan */}
      <div className="mb-8 text-[11pt] break-inside-avoid">
        <p className="mb-0">Yth.</p>
        <p className="font-bold mb-0">{data.namaPenerima}</p>
        <p className="font-bold mb-0">{data.perusahaanTujuan}</p>
        <div className="whitespace-pre-line leading-relaxed">{data.alamatTujuan}</div>
      </div>

      {/* Pembuka */}
      <div className="mb-6 break-inside-avoid">
        <p>Dengan hormat,</p>
        <p className="indent-8">
          Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari {data.sumberInfo}, saya mengetahui bahwa {data.perusahaanTujuan} sedang membutuhkan karyawan baru untuk mengisi posisi sebagai <strong>{data.posisiDilamar}</strong>.
        </p>
        <p className="indent-8">
          Sehubungan dengan hal tersebut, saya yang bertanda tangan di bawah ini:
        </p>
      </div>

      {/* Identitas Pelamar */}
      <div className="mb-6 pl-8 break-inside-avoid">
        <table className="w-full lamaran-table">
          <tbody>
            <tr>
              <td>Nama Lengkap</td>
              <td>:</td>
              <td className="font-bold">{data.namaLengkap}</td>
            </tr>
            <tr>
              <td>Tempat, Tanggal Lahir</td>
              <td>:</td>
              <td>{data.tempatLahir}, {data.tanggalLahir}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>:</td>
              <td>{data.jenisKelamin}</td>
            </tr>
            <tr>
              <td>Pendidikan Terakhir</td>
              <td>:</td>
              <td>{data.pendidikan}</td>
            </tr>
            <tr>
              <td>Alamat Domisili</td>
              <td>:</td>
              <td className="whitespace-pre-line">{data.alamatPelamar}</td>
            </tr>
            <tr>
              <td>No. Telepon / WA</td>
              <td>:</td>
              <td>{data.noTelp}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{data.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pengalaman & Keahlian */}
      <div className="mb-6 break-inside-avoid">
        <p className="indent-8">
          {data.pengalamanKeahlian}
        </p>
        <p className="indent-8">
          Sebagai bahan pertimbangan Bapak/Ibu, bersama surat lamaran ini saya lampirkan dokumen sebagai berikut:
        </p>
      </div>

      {/* Lampiran */}
      <div className="mb-8 pl-8 text-[11pt] whitespace-pre-line leading-relaxed break-inside-avoid">
        {data.daftarLampiran}
      </div>

      {/* Penutup */}
      <div className="mb-12 break-inside-avoid">
        <p className="indent-8">
          Demikian surat lamaran pekerjaan ini saya buat dengan sebenarnya. Besar harapan saya agar Bapak/Ibu bersedia memberikan kesempatan wawancara, sehingga saya dapat menjelaskan secara lebih rinci mengenai potensi dan kualifikasi yang saya miliki.
        </p>
        <p className="indent-8">
          Atas perhatian dan waktu yang Bapak/Ibu berikan, saya ucapkan terima kasih.
        </p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end text-center break-inside-avoid shrink-0">
        <div className="w-64">
          <p className="mb-20">Hormat saya,</p>
          <p className="font-bold underline">{data.namaLengkap}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Lamaran Pekerjaan</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Career Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Briefcase size={18} className="text-blue-600" /> Editor Lamaran
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {/* SECTION 1 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-slate-600 text-sm">Info & Tujuan Surat</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tempat, Tanggal</label>
                      <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Perihal</label>
                        <input type="text" name="hal" value={data.hal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Lampiran</label>
                        <input type="text" name="lampiran" value={data.lampiran} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 mt-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kepada Yth. (Penerima)</label>
                      <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Perusahaan Tujuan</label>
                      <input type="text" name="perusahaanTujuan" value={data.perusahaanTujuan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Tujuan</label>
                      <textarea name="alamatTujuan" value={data.alamatTujuan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"></textarea>
                    </div>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-blue-50 p-2 rounded border-l-4 border-blue-600 text-sm flex items-center gap-2">
                    <UserCircle size={14}/> Data Diri Pelamar
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Nama Lengkap & Gelar</label>
                      <input type="text" name="namaLengkap" value={data.namaLengkap} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Tempat Lahir</label>
                        <input type="text" name="tempatLahir" value={data.tempatLahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Tanggal Lahir</label>
                        <input type="text" name="tanggalLahir" value={data.tanggalLahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Jenis Kelamin</label>
                      <input type="text" name="jenisKelamin" value={data.jenisKelamin} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Pendidikan Terakhir</label>
                      <input type="text" name="pendidikan" value={data.pendidikan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Alamat Domisili</label>
                      <textarea name="alamatPelamar" value={data.alamatPelamar} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">No. Telp / WA</label>
                        <input type="text" name="noTelp" value={data.noTelp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Email</label>
                        <input type="text" name="email" value={data.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-amber-50 p-2 rounded border-l-4 border-amber-500 text-sm flex items-center gap-2">
                    <FileText size={14}/> Isi Surat & Kualifikasi
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Posisi yang Dilamar</label>
                      <input type="text" name="posisiDilamar" value={data.posisiDilamar} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sumber Info Lowongan</label>
                      <input type="text" name="sumberInfo" value={data.sumberInfo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pengalaman & Keahlian</label>
                      <textarea name="pengalamanKeahlian" value={data.pengalamanKeahlian} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Daftar Lampiran</label>
                      <textarea name="daftarLampiran" value={data.daftarLampiran} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed whitespace-pre-line"></textarea>
                    </div>
                  </div>
                </div>

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat_Lamaran_Pekerjaan" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
