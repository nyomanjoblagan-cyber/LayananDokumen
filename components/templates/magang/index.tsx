'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

interface MagangData {
  nama: string;
  nim: string;
  jurusan: string;
  institusi: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  tanggalSurat: string;
  periodeAwal: string;
  periodeAkhir: string;
}

const INITIAL_DATA: MagangData = {
  nama: 'AHMAD FAUZAN',
  nim: '1234567890',
  jurusan: 'Sistem Informasi',
  institusi: 'Universitas Gadjah Mada',
  namaPerusahaan: 'PT Teknologi Inovasi Nusantara',
  alamatPerusahaan: 'Jl. Jendral Sudirman No. 45, Jakarta Selatan',
  tanggalSurat: '2026-07-15',
  periodeAwal: '2026-08-01',
  periodeAkhir: '2026-10-31',
};

export default function MagangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <MagangBuilder />
    </Suspense>
  );
}

function MagangBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MagangData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'identitas' | 'perusahaan' | 'periode'>('identitas');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof MagangData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Proposal Magang HRD</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase sticky top-0 z-10">
              <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 border-r ${activeTab === 'identitas' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Identitas</button>
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              <button onClick={() => setActiveTab('periode')} className={`flex-1 py-3 ${activeTab === 'periode' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Periode</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'identitas' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Mahasiswa/Siswa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nama} onChange={e => handleDataChange('nama', e.target.value)} placeholder="Contoh: AHMAD FAUZAN" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk (NIM/NIS)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nim} onChange={e => handleDataChange('nim', e.target.value)} placeholder="Nomor Induk Mahasiswa/Siswa" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Asal Institusi (Kampus/Sekolah)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.institusi} onChange={e => handleDataChange('institusi', e.target.value)} placeholder="Contoh: Universitas Gadjah Mada" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jurusan / Program Studi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.jurusan} onChange={e => handleDataChange('jurusan', e.target.value)} placeholder="Contoh: Sistem Informasi" />
                </div>
              </div>
              )}

              {activeTab === 'perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Tujuan Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} placeholder="Contoh: PT Teknologi Inovasi Nusantara" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPerusahaan} onChange={e => handleDataChange('alamatPerusahaan', e.target.value)} placeholder="Alamat lengkap perusahaan" />
                </div>
              </div>
              )}

              {activeTab === 'periode' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Periode Pengajuan & Surat</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Periode Awal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.periodeAwal} onChange={e => handleDataChange('periodeAwal', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Periode Akhir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.periodeAkhir} onChange={e => handleDataChange('periodeAkhir', e.target.value)} />
                  </div>
                </div>
                <div className="pt-2 border-t mt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat Dibuat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                </div>
              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 overflow-y-auto bg-slate-300 p-4 md:p-8 flex justify-center pb-32 print:block print:overflow-visible print:bg-white">
          <Kertas className="print:w-full print:min-w-0">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <p className="mb-1">Hal: <strong>Permohonan Kerja Praktik / Magang</strong></p>
                  <p>Lampiran: 1 (satu) Berkas Proposal</p>
               </div>
               <div className="text-right">
                  <p>{formatDateSafe(data.tanggalSurat)}</p>
               </div>
            </div>

            <div className="mb-10">
               <p>Kepada Yth.</p>
               <p><strong>HRD / Pimpinan Perusahaan</strong></p>
               <p><strong>{data.namaPerusahaan}</strong></p>
               <p className="whitespace-pre-wrap w-2/3">{data.alamatPerusahaan}</p>
            </div>

            <div className="text-justify mb-6">
               <p className="mb-4">Dengan hormat,</p>
               <p className="mb-4">Sehubungan dengan kurikulum dan persyaratan akademik di {data.institusi}, kami diwajibkan untuk melaksanakan Kerja Praktik / Magang guna mengaplikasikan ilmu yang telah diperoleh di bangku perkuliahan/sekolah dan mendapatkan pengalaman praktis di dunia kerja.</p>
               <p className="mb-4">Oleh karena itu, saya yang bertanda tangan di bawah ini:</p>
            </div>

            <table className="w-full mb-6 ml-4 border-collapse">
               <tbody>
                  <tr>
                     <td className="w-48 py-1 align-top">Nama</td>
                     <td className="w-4 py-1 align-top">:</td>
                     <td className="py-1 align-top font-bold uppercase">{data.nama}</td>
                  </tr>
                  <tr>
                     <td className="py-1 align-top">NIM / NIS</td>
                     <td className="py-1 align-top">:</td>
                     <td className="py-1 align-top">{data.nim}</td>
                  </tr>
                  <tr>
                     <td className="py-1 align-top">Jurusan / Program Studi</td>
                     <td className="py-1 align-top">:</td>
                     <td className="py-1 align-top">{data.jurusan}</td>
                  </tr>
                  <tr>
                     <td className="py-1 align-top">Asal Institusi</td>
                     <td className="py-1 align-top">:</td>
                     <td className="py-1 align-top">{data.institusi}</td>
                  </tr>
               </tbody>
            </table>

            <div className="text-justify mb-6">
               <p className="mb-4">Bermaksud mengajukan permohonan untuk dapat melaksanakan Kerja Praktik / Magang di perusahaan yang Bapak/Ibu pimpin. Adapun waktu pelaksanaan Kerja Praktik / Magang yang kami ajukan adalah selama periode:</p>
               <p className="mb-4 font-bold text-center">
                  {formatDateSafe(data.periodeAwal)} s.d. {formatDateSafe(data.periodeAkhir)}
               </p>
               <p className="mb-4">Bersama surat ini, turut saya lampirkan kelengkapan dokumen sebagai bahan pertimbangan Bapak/Ibu, di antaranya:</p>
               <table className="w-full mb-4 ml-4 border-collapse">
                   <tbody>
                      <tr>
                          <td className="w-6 py-1 align-top">1.</td>
                          <td className="py-1 align-top">Curriculum Vitae (CV)</td>
                      </tr>
                      <tr>
                          <td className="py-1 align-top">2.</td>
                          <td className="py-1 align-top">Transkrip Nilai Terakhir</td>
                      </tr>
                      <tr>
                          <td className="py-1 align-top">3.</td>
                          <td className="py-1 align-top">Surat Pengantar dari Institusi / Kampus</td>
                      </tr>
                      <tr>
                          <td className="py-1 align-top">4.</td>
                          <td className="py-1 align-top">Proposal Kegiatan Magang</td>
                      </tr>
                   </tbody>
               </table>
               <p className="mb-4">Besar harapan saya agar permohonan ini dapat dipertimbangkan dan disetujui. Saya bersedia untuk mengikuti proses seleksi atau wawancara yang mungkin diperlukan oleh pihak perusahaan.</p>
               <p>Demikian surat permohonan ini saya sampaikan. Atas perhatian, waktu, serta kesempatan yang diberikan, saya mengucapkan terima kasih.</p>
            </div>

            <div className="mt-16 w-full flex justify-end">
               <div className="text-center">
                  <p className="mb-20">Hormat saya,</p>
                  <p className="font-bold underline uppercase">{data.nama}</p>
                  <p>{data.nim}</p>
               </div>
            </div>

          </Kertas>
        </div>
      </main>
    </div>
  );
}