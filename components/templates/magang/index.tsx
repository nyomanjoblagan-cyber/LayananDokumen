'use client';
import PrintWrapper from '@/components/PrintWrapper';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

interface MagangData {
  // Pihak Pertama (Perwakilan Perusahaan)
  namaPihakPertama: string;
  nikPihakPertama: string;
  tempatLahirPihakPertama: string;
  tanggalLahirPihakPertama: string;
  pekerjaanPihakPertama: string;
  alamatPihakPertama: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;

  // Pihak Kedua (Peserta Magang)
  namaPihakKedua: string;
  nikPihakKedua: string;
  tempatLahirPihakKedua: string;
  tanggalLahirPihakKedua: string;
  pekerjaanPihakKedua: string;
  alamatPihakKedua: string;
  institusiPihakKedua: string;

  // Detail Magang
  hariPerjanjian: string;
  tanggalPerjanjian: string;
  tempatPerjanjian: string;
  divisiMagang: string;
  periodeAwal: string;
  periodeAkhir: string;
  
  // Opsi Dinamis
  jenisUangSaku: 'ADA' | 'TIDAK_ADA';
  nominalUangSaku: string;
}

const INITIAL_DATA: MagangData = {
  namaPihakPertama: 'Budi Santoso',
  nikPihakPertama: '3171234567890001',
  tempatLahirPihakPertama: 'Jakarta',
  tanggalLahirPihakPertama: '1980-05-15',
  pekerjaanPihakPertama: 'HR Director',
  alamatPihakPertama: 'Jl. Melati No. 10, Jakarta Selatan',
  namaPerusahaan: 'PT Teknologi Inovasi Nusantara',
  alamatPerusahaan: 'Gedung Cyber Lt. 5, Jl. Sudirman, Jakarta',

  namaPihakKedua: 'Ahmad Fauzan',
  nikPihakKedua: '3271234567890002',
  tempatLahirPihakKedua: 'Bandung',
  tanggalLahirPihakKedua: '2004-08-20',
  pekerjaanPihakKedua: 'Mahasiswa',
  alamatPihakKedua: 'Jl. Setiabudi No. 55, Bandung',
  institusiPihakKedua: 'Universitas Gadjah Mada',

  hariPerjanjian: 'Senin',
  tanggalPerjanjian: '2026-07-20',
  tempatPerjanjian: 'Jakarta',
  divisiMagang: 'Software Engineering',
  periodeAwal: '2026-08-01',
  periodeAkhir: '2026-10-31',
  jenisUangSaku: 'ADA',
  nominalUangSaku: '2.500.000',
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
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'ketentuan'>('pihak1');
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
      try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch (e) {
        return dateString;
      }
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
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Drafter - Perjanjian Magang</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="md:hidden flex gap-2 mr-2">
               <button onClick={() => setMobileView('editor')} className={`px-3 py-1 text-xs font-bold rounded ${mobileView==='editor'?'bg-blue-600 text-white':'bg-slate-700 text-slate-300'}`}>FORM</button>
               <button onClick={() => setMobileView('preview')} className={`px-3 py-1 text-xs font-bold rounded ${mobileView==='preview'?'bg-blue-600 text-white':'bg-slate-700 text-slate-300'}`}>DOC</button>
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Perjanjian</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase sticky top-0 z-10">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak I (Perusahaan)</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak II (Peserta)</button>
              <button onClick={() => setActiveTab('ketentuan')} className={`flex-1 py-3 ${activeTab === 'ketentuan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Ketentuan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Wakil Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPihakPertama} onChange={e => handleDataChange('namaPihakPertama', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nikPihakPertama} onChange={e => handleDataChange('nikPihakPertama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatLahirPihakPertama} onChange={e => handleDataChange('tempatLahirPihakPertama', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalLahirPihakPertama} onChange={e => handleDataChange('tanggalLahirPihakPertama', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan / Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaanPihakPertama} onChange={e => handleDataChange('pekerjaanPihakPertama', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPihakPertama} onChange={e => handleDataChange('alamatPihakPertama', e.target.value)} />
                </div>

                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mt-6 mb-4">Identitas Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPerusahaan} onChange={e => handleDataChange('alamatPerusahaan', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Peserta Magang</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPihakKedua} onChange={e => handleDataChange('namaPihakKedua', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nikPihakKedua} onChange={e => handleDataChange('nikPihakKedua', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatLahirPihakKedua} onChange={e => handleDataChange('tempatLahirPihakKedua', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalLahirPihakKedua} onChange={e => handleDataChange('tanggalLahirPihakKedua', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan (Misal: Mahasiswa)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaanPihakKedua} onChange={e => handleDataChange('pekerjaanPihakKedua', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPihakKedua} onChange={e => handleDataChange('alamatPihakKedua', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Asal Institusi / Pendidikan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.institusiPihakKedua} onChange={e => handleDataChange('institusiPihakKedua', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'ketentuan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Pengaturan Dokumen</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari Penandatanganan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.hariPerjanjian} onChange={e => handleDataChange('hariPerjanjian', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Penandatanganan</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalPerjanjian} onChange={e => handleDataChange('tanggalPerjanjian', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Penandatanganan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatPerjanjian} onChange={e => handleDataChange('tempatPerjanjian', e.target.value)} />
                </div>

                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mt-6 mb-4">Detail Magang</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Divisi Penempatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.divisiMagang} onChange={e => handleDataChange('divisiMagang', e.target.value)} placeholder="Contoh: Divisi IT / Marketing" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai Magang</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.periodeAwal} onChange={e => handleDataChange('periodeAwal', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Berakhir Magang</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.periodeAkhir} onChange={e => handleDataChange('periodeAkhir', e.target.value)} />
                  </div>
                </div>

                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mt-6 mb-4">Kompensasi / Uang Saku</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Status Uang Saku</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.jenisUangSaku} onChange={e => handleDataChange('jenisUangSaku', e.target.value as 'ADA' | 'TIDAK_ADA')}>
                    <option value="ADA">Berbayar (Diberikan Uang Saku)</option>
                    <option value="TIDAK_ADA">Tidak Berbayar (Unpaid Internship)</option>
                  </select>
                </div>
                
                {data.jenisUangSaku === 'ADA' && (
                  <div className="animate-in fade-in zoom-in duration-300">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nominal Uang Saku per Bulan (Rp)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold text-emerald-700 bg-emerald-50" value={data.nominalUangSaku} onChange={e => handleDataChange('nominalUangSaku', e.target.value)} placeholder="Contoh: 2.500.000" />
                  </div>
                )}
              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 overflow-y-auto bg-slate-300 p-4 md:p-8 flex justify-center pb-32 print:block print:overflow-visible print:bg-white print:p-0">
          <Kertas className="print:w-full print:min-w-0">
            
            {/* KOP DOKUMEN */}
            <div className="text-center mb-8 border-b-2 border-slate-900 pb-4">
              <h1 className="text-xl font-bold uppercase tracking-wide">PERJANJIAN MAGANG</h1>
              <h2 className="text-sm font-bold uppercase tracking-widest">(INTERNSHIP AGREEMENT)</h2>
            </div>

            <div className="text-justify mb-6">
              <p className="mb-4">
                Pada hari ini, <strong>{data.hariPerjanjian}</strong> tanggal <strong>{formatDateSafe(data.tanggalPerjanjian)}</strong>, bertempat di <strong>{data.tempatPerjanjian}</strong>, telah dibuat dan ditandatangani Perjanjian Magang (selanjutnya disebut sebagai <strong>"Perjanjian"</strong>) oleh dan antara:
              </p>
            </div>

            {/* PIHAK PERTAMA */}
            <div className="mb-6">
               <div className="flex mb-1">
                  <div className="w-8 font-bold">I.</div>
                  <div className="flex-1">
                     <div className="flex mb-1">
                        <div className="w-48">Nama Lengkap</div>
                        <div className="w-4">:</div>
                        <div className="font-bold uppercase">{data.namaPihakPertama}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Nomor Induk Kependudukan</div>
                        <div className="w-4">:</div>
                        <div>{data.nikPihakPertama}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Tempat, Tanggal Lahir</div>
                        <div className="w-4">:</div>
                        <div>{data.tempatLahirPihakPertama}, {formatDateSafe(data.tanggalLahirPihakPertama)}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Pekerjaan / Jabatan</div>
                        <div className="w-4">:</div>
                        <div>{data.pekerjaanPihakPertama}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Alamat Lengkap (KTP)</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 text-justify">{data.alamatPihakPertama}</div>
                     </div>
                     <div className="mt-2 text-justify">
                        Dalam hal ini bertindak dalam jabatannya tersebut, karenanya sah dan berwenang bertindak untuk dan atas nama <strong>{data.namaPerusahaan}</strong>, yang berkedudukan di {data.alamatPerusahaan} (selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK PERTAMA"</strong>).
                     </div>
                  </div>
               </div>
            </div>

            {/* PIHAK KEDUA */}
            <div className="mb-8">
               <div className="flex mb-1">
                  <div className="w-8 font-bold">II.</div>
                  <div className="flex-1">
                     <div className="flex mb-1">
                        <div className="w-48">Nama Lengkap</div>
                        <div className="w-4">:</div>
                        <div className="font-bold uppercase">{data.namaPihakKedua}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Nomor Induk Kependudukan</div>
                        <div className="w-4">:</div>
                        <div>{data.nikPihakKedua}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Tempat, Tanggal Lahir</div>
                        <div className="w-4">:</div>
                        <div>{data.tempatLahirPihakKedua}, {formatDateSafe(data.tanggalLahirPihakKedua)}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Pekerjaan</div>
                        <div className="w-4">:</div>
                        <div>{data.pekerjaanPihakKedua}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Alamat Lengkap (KTP)</div>
                        <div className="w-4">:</div>
                        <div className="flex-1 text-justify">{data.alamatPihakKedua}</div>
                     </div>
                     <div className="flex mb-1">
                        <div className="w-48">Asal Institusi</div>
                        <div className="w-4">:</div>
                        <div className="flex-1">{data.institusiPihakKedua}</div>
                     </div>
                     <div className="mt-2 text-justify">
                        Dalam hal ini bertindak untuk dan atas nama diri sendiri (selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK KEDUA"</strong>).
                     </div>
                  </div>
               </div>
            </div>

            <div className="text-justify mb-8">
               <p className="mb-4">
                 PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama dalam Perjanjian ini disebut sebagai <strong>"Para Pihak"</strong> dan secara sendiri-sendiri disebut sebagai <strong>"Pihak"</strong>.
               </p>
               <p className="mb-2">Para Pihak terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
               <ol className="list-disc ml-6 mb-4 space-y-1">
                 <li>Bahwa PIHAK PERTAMA adalah perusahaan yang menyelenggarakan program magang/kerja praktik guna mendukung pengembangan keterampilan sumber daya manusia.</li>
                 <li>Bahwa PIHAK KEDUA bermaksud untuk melaksanakan program magang di lingkungan PIHAK PERTAMA untuk memperoleh pengalaman kerja secara praktis serta mengaplikasikan ilmu yang didapat dari bangku pendidikan.</li>
               </ol>
               <p>
                 Berdasarkan hal-hal tersebut di atas, Para Pihak sepakat untuk mengikatkan diri dalam Perjanjian Magang ini dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut:
               </p>
            </div>

            {/* PASAL 1 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 1</p>
               <p>DEFINISI</p>
            </div>
            <div className="text-justify mb-6">
               <p className="mb-2">Kecuali konteks kalimatnya menentukan lain, istilah-istilah di bawah ini memiliki arti sebagai berikut:</p>
               <ol className="list-decimal ml-6 space-y-2">
                 <li><strong>Perusahaan</strong> adalah <strong>{data.namaPerusahaan}</strong> berserta seluruh kantor cabang, anak perusahaan, dan afiliasinya.</li>
                 <li><strong>Peserta Magang</strong> adalah PIHAK KEDUA yang melaksanakan program magang di bawah bimbingan dan pengawasan PIHAK PERTAMA.</li>
                 <li><strong>Informasi Rahasia</strong> adalah seluruh informasi teknis, finansial, maupun komersial, baik tertulis maupun lisan, yang dimiliki oleh PIHAK PERTAMA dan/atau kliennya, yang tidak bersifat publik.</li>
               </ol>
            </div>

            {/* PASAL 2 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 2</p>
               <p>RUANG LINGKUP MAGANG</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>PIHAK PERTAMA setuju untuk menerima PIHAK KEDUA, dan PIHAK KEDUA setuju untuk melaksanakan magang di lingkungan Perusahaan.</li>
                 <li>PIHAK KEDUA akan ditempatkan pada <strong>Divisi {data.divisiMagang}</strong>.</li>
                 <li>Uraian tugas, jadwal harian, dan tata tertib selama pelaksanaan magang akan diatur lebih lanjut oleh pembimbing atau supervisor yang ditunjuk oleh PIHAK PERTAMA.</li>
                 <li>PIHAK KEDUA wajib mematuhi seluruh peraturan perusahaan dan instruksi dari supervisor dengan itikad baik.</li>
               </ol>
            </div>

            {/* PASAL 3 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 3</p>
               <p>JANGKA WAKTU</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Perjanjian ini berlaku dan mengikat Para Pihak sejak tanggal <strong>{formatDateSafe(data.periodeAwal)}</strong> dan akan berakhir dengan sendirinya pada tanggal <strong>{formatDateSafe(data.periodeAkhir)}</strong>.</li>
                 <li>Perjanjian ini tidak dapat diperpanjang, kecuali disepakati secara tertulis oleh Para Pihak melalui sebuah addendum atau perjanjian baru.</li>
               </ol>
            </div>

            {/* PASAL 4 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 4</p>
               <p>HAK DAN KEWAJIBAN</p>
            </div>
            <div className="text-justify mb-6">
               <div className="mb-2 font-bold ml-6">1. Hak dan Kewajiban PIHAK PERTAMA:</div>
               <ol className="list-[lower-alpha] ml-12 mb-4 space-y-1">
                 <li>Memberikan tugas, bimbingan, arahan, dan evaluasi kepada PIHAK KEDUA selama masa magang.</li>
                 <li>Menyediakan sarana dan prasarana dasar yang diperlukan oleh PIHAK KEDUA untuk melaksanakan tugas magang.</li>
                 <li>Memberikan sertifikat atau surat keterangan magang setelah PIHAK KEDUA menyelesaikan program magang dengan baik.</li>
                 <li>Berhak untuk memberikan sanksi atau mengakhiri Perjanjian secara sepihak apabila PIHAK KEDUA melanggar tata tertib perusahaan.</li>
               </ol>
               <div className="mb-2 font-bold ml-6">2. Hak dan Kewajiban PIHAK KEDUA:</div>
               <ol className="list-[lower-alpha] ml-12 space-y-1">
                 <li>Menerima bimbingan dan pengalaman kerja praktis sesuai dengan ruang lingkup magang.</li>
                 <li>Wajib hadir sesuai dengan jadwal dan mematuhi seluruh tata tertib, standar operasional (SOP), serta budaya kerja Perusahaan.</li>
                 <li>Wajib menjaga nama baik PIHAK PERTAMA di dalam maupun di luar lingkungan Perusahaan.</li>
                 <li>Wajib menyerahkan kembali seluruh fasilitas, dokumen, dan aset milik Perusahaan selambat-lambatnya pada hari terakhir masa magang.</li>
               </ol>
            </div>

            {/* PASAL 5 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 5</p>
               <p>KOMPENSASI</p>
            </div>
            <div className="text-justify mb-6">
               {data.jenisUangSaku === 'ADA' ? (
                 <ol className="list-decimal ml-6 space-y-2">
                   <li>Sebagai bentuk apresiasi atas dedikasi dan kontribusi selama pelaksanaan magang, PIHAK PERTAMA akan memberikan kompensasi berupa uang saku kepada PIHAK KEDUA sebesar <strong>Rp {data.nominalUangSaku}</strong> (<em>Rupiah</em>) setiap bulannya.</li>
                   <li>Pembayaran uang saku akan dibayarkan secara proporsional sesuai dengan persentase kehadiran PIHAK KEDUA, dan tunduk pada kebijakan pembayaran serta pemotongan pajak yang berlaku di Perusahaan.</li>
                   <li>Selain uang saku tersebut, PIHAK KEDUA tidak berhak atas tunjangan, bonus, fasilitas asuransi kesehatan (BPJS Ketenagakerjaan/Kesehatan), atau bentuk kompensasi lainnya.</li>
                 </ol>
               ) : (
                 <ol className="list-decimal ml-6 space-y-2">
                   <li>Para Pihak sepakat bahwa pelaksanaan program magang ini bersifat sukarela (<em>unpaid internship</em>) dan bertujuan murni untuk pelatihan serta pemenuhan kurikulum pendidikan PIHAK KEDUA.</li>
                   <li>PIHAK KEDUA dengan ini memahami dan menyetujui bahwa PIHAK PERTAMA <strong>tidak memiliki kewajiban</strong> untuk memberikan kompensasi dalam bentuk apapun, termasuk namun tidak terbatas pada uang saku, upah, gaji, tunjangan, asuransi, maupun biaya transportasi.</li>
                 </ol>
               )}
            </div>

            {/* PASAL 6 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 6</p>
               <p>STATUS HUBUNGAN HUKUM DAN KETIDADAAN JAMINAN PEKERJAAN</p>
            </div>
            <div className="text-justify mb-6 border-l-4 border-double border-slate-900 pl-4 py-2">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Para Pihak secara tegas menyatakan dan menyepakati bahwa hubungan hukum yang timbul dari Perjanjian ini semata-mata adalah hubungan <strong>pelatihan praktis / magang</strong>.</li>
                 <li>Perjanjian ini <strong>bukan</strong> merupakan Perjanjian Kerja Waktu Tertentu (PKWT) maupun Perjanjian Kerja Waktu Tidak Tertentu (PKWTT), dan oleh karenanya tidak menciptakan hubungan kerja antara majikan dan pekerja berdasarkan Undang-Undang Ketenagakerjaan yang berlaku di Republik Indonesia.</li>
                 <li><strong>(No Expectation of Employment)</strong> PIHAK KEDUA memahami dan menyetujui bahwa setelah berakhirnya Perjanjian ini, PIHAK PERTAMA tidak memiliki komitmen, janji, kewajiban, maupun jaminan dalam bentuk apapun untuk mengangkat atau mempekerjakan PIHAK KEDUA sebagai karyawan tetap atau karyawan kontrak di Perusahaan.</li>
                 <li>PIHAK KEDUA dengan ini melepaskan seluruh haknya untuk menuntut kompensasi dalam bentuk pesangon, uang penghargaan masa kerja, uang penggantian hak, maupun ganti kerugian lainnya yang seolah-olah timbul akibat pemutusan hubungan kerja.</li>
               </ol>
            </div>

            {/* PASAL 7 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 7</p>
               <p>KERAHASIAAN INFORMASI (NON-DISCLOSURE AGREEMENT)</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Selama dan setelah masa magang berakhir, PIHAK KEDUA dilarang secara mutlak untuk membocorkan, mendistribusikan, menyalin, mempublikasikan, atau menyalahgunakan <strong>Informasi Rahasia</strong> milik PIHAK PERTAMA kepada pihak ketiga manapun, tanpa persetujuan tertulis sebelumnya dari PIHAK PERTAMA.</li>
                 <li>Informasi Rahasia mencakup, namun tidak terbatas pada: data pelanggan, kode sumber perangkat lunak (<em>source code</em>), algoritma, rencana bisnis, strategi pemasaran, informasi finansial, struktur harga, dan segala hal yang diklasifikasikan sebagai rahasia dagang Perusahaan.</li>
                 <li>PIHAK KEDUA wajib mengembalikan atau memusnahkan seluruh salinan Informasi Rahasia yang ada dalam penguasaannya pada saat berakhirnya program magang, atau kapan pun diminta oleh PIHAK PERTAMA.</li>
                 <li><strong>Keberlangsungan (Survival):</strong> Kewajiban menjaga kerahasiaan ini akan terus berlaku tanpa batas waktu meskipun Perjanjian ini telah berakhir atau dibatalkan.</li>
                 <li>Setiap pelanggaran terhadap Pasal ini merupakan pelanggaran berat. PIHAK PERTAMA berhak untuk seketika menghentikan Perjanjian ini, menuntut ganti kerugian materiil maupun immateriil, dan memproses PIHAK KEDUA melalui jalur hukum perdata serta melaporkan tindak pidana kejahatan rahasia dagang berdasarkan peraturan perundang-undangan yang berlaku.</li>
               </ol>
            </div>

            {/* PASAL 8 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 8</p>
               <p>PENGAKHIRAN PERJANJIAN</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Perjanjian ini akan berakhir dengan sendirinya pada saat berakhirnya jangka waktu magang sebagaimana dimaksud dalam Pasal 3 Perjanjian ini.</li>
                 <li>PIHAK PERTAMA berhak sepenuhnya untuk mengakhiri Perjanjian ini secara sepihak dan seketika sebelum berakhirnya jangka waktu, apabila PIHAK KEDUA:
                    <ul className="list-disc ml-6 mt-1 mb-1 space-y-1">
                      <li>Melanggar tata tertib dan/atau peraturan Perusahaan;</li>
                      <li>Melakukan tindak pidana, asusila, pencemaran nama baik, atau perbuatan yang merugikan Perusahaan;</li>
                      <li>Melanggar ketentuan kerahasiaan dalam Pasal 7.</li>
                    </ul>
                 </li>
                 <li>Para Pihak dengan ini sepakat untuk mengesampingkan ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata sejauh mana putusan pengadilan diperlukan untuk mengakhiri Perjanjian ini.</li>
               </ol>
            </div>

            {/* PASAL 9 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 9</p>
               <p>PENYELESAIAN SENGKETA</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Perjanjian ini tunduk dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</li>
                 <li>Segala perselisihan atau sengketa yang timbul sebagai akibat dari pelaksanaan Perjanjian ini akan diselesaikan secara musyawarah untuk mufakat.</li>
                 <li>Apabila musyawarah untuk mufakat tidak tercapai dalam waktu 30 (tiga puluh) hari kalender, maka Para Pihak sepakat untuk menyelesaikan sengketa tersebut melalui Pengadilan Negeri yang wilayah hukumnya meliputi kedudukan PIHAK PERTAMA.</li>
               </ol>
            </div>

            {/* PASAL 10 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 10</p>
               <p>FORCE MAJEURE</p>
            </div>
            <div className="text-justify mb-6">
               <p className="mb-2">
                 Tidak ada Pihak yang dianggap melakukan wanprestasi atas keterlambatan atau kegagalan pelaksanaan kewajiban dalam Perjanjian ini apabila hal tersebut disebabkan oleh peristiwa di luar kemampuan yang wajar (<em>Force Majeure</em>), seperti bencana alam, kebakaran, pemogokan massal, perang, huru-hara, atau kebijakan pemerintah yang menghalangi pelaksanaan Perjanjian.
               </p>
            </div>

            {/* PASAL 11 */}
            <div className="text-center font-bold mb-4 mt-8 break-before-auto">
               <p>PASAL 11</p>
               <p>KETENTUAN PENUTUP</p>
            </div>
            <div className="text-justify mb-6">
               <ol className="list-decimal ml-6 space-y-2">
                 <li>Hal-hal yang belum diatur atau belum cukup diatur dalam Perjanjian ini akan ditetapkan lebih lanjut oleh Para Pihak dalam suatu addendum yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.</li>
                 <li>Apabila terdapat satu atau lebih ketentuan dalam Perjanjian ini yang dinyatakan tidak sah, batal, atau tidak dapat dilaksanakan berdasarkan peraturan perundang-undangan, hal tersebut tidak akan mempengaruhi keabsahan ketentuan-ketentuan lainnya.</li>
               </ol>
            </div>

            <div className="text-justify mb-12">
               <p>
                 Demikian Perjanjian ini dibuat dan ditandatangani oleh Para Pihak pada hari, tanggal, dan tempat sebagaimana disebutkan pada bagian awal Perjanjian, dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai secukupnya dan memiliki kekuatan hukum yang sama bagi Para Pihak.
               </p>
            </div>

            {/* SIGNATURES */}
            <div className="flex justify-between mt-12 break-inside-avoid">
               <div className="w-1/2 text-center">
                  <p className="mb-24 font-bold uppercase">PIHAK PERTAMA</p>
                  <p className="font-bold underline uppercase">{data.namaPihakPertama}</p>
                  <p>{data.pekerjaanPihakPertama}</p>
                  <p>{data.namaPerusahaan}</p>
               </div>
               <div className="w-1/2 text-center">
                  <p className="mb-24 font-bold uppercase">PIHAK KEDUA</p>
                  <p className="font-bold underline uppercase">{data.namaPihakKedua}</p>
                  <p>Peserta Magang</p>
               </div>
            </div>

          </Kertas>
        </div>
      </main>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_magang" price={15000} />
      </div>
    </div>
  );
}

