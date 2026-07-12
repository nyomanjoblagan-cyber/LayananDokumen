'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, FileText, Edit3, Eye, RotateCcw, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface IzinData {
  city: string;
  date: string;
  
  tujuan: string; // Sekolah, Kampus, Perusahaan
  namaInstansi: string; 
  alamatInstansi: string; 
  
  nama: string;
  identitas: string; 
  kelasJabatan: string; 
  
  alasan: string; 
  tanggalMulai: string;
  tanggalSelesai: string;
  keteranganTambahan: string; 
  
  namaTtd: string; 
  hubungan: string; 
}

const INITIAL_DATA: IzinData = {
  city: 'Jakarta',
  date: '2026-07-12',
  
  tujuan: 'Sekolah',
  namaInstansi: 'SMA Negeri 1 Jakarta',
  alamatInstansi: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
  
  nama: 'Budi Santoso',
  identitas: '1029384756',
  kelasJabatan: 'XII IPA 1',
  
  alasan: 'Sakit',
  tanggalMulai: '2026-07-13',
  tanggalSelesai: '2026-07-14',
  keteranganTambahan: 'Demam tinggi dan butuh istirahat sesuai anjuran dokter (surat keterangan dokter terlampir).',
  
  namaTtd: 'Andi Santoso',
  hubungan: 'Orang Tua'
};

export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <IzinBuilder />
    </Suspense>
  );
}

function IzinBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pengirim' | 'penerima' | 'izin'>('pengirim');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof IzinData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };
    
    let durasi = 0;
    if(data.tanggalMulai && data.tanggalSelesai) {
        const start = new Date(data.tanggalMulai);
        const end = new Date(data.tanggalSelesai);
        const diffTime = end.getTime() - start.getTime();
        if (diffTime >= 0) {
            durasi = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        } else {
            durasi = 1;
        }
    }

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas className="print:w-full print:min-w-0">
              <div className="flex justify-end mb-8">
                  <div className="text-right">
                      <p>{data.city}, {formatDateSafe(data.date)}</p>
                  </div>
              </div>

              <div className="mb-8">
                  <p>Hal: <strong>Permohonan Izin {data.alasan}</strong></p>
                  <p>Lampiran: {data.alasan === 'Sakit' ? '1 (Satu) Lembar' : '-'}</p>
              </div>

              <div className="mb-8">
                  <p>Yth. Bapak/Ibu Pimpinan/Wali Kelas</p>
                  <p><strong>{data.namaInstansi}</strong></p>
                  <p>{data.alamatInstansi}</p>
              </div>

              <div className="mb-4">
                  <p>Dengan hormat,</p>
                  <p className="mt-2 text-justify">Yang bertanda tangan di bawah ini:</p>
              </div>

              <div className="mb-4 px-8">
                  <table className="w-full text-left border-collapse">
                      <tbody>
                          <tr>
                              <td className="w-48 py-1 align-top">Nama</td>
                              <td className="w-4 py-1 align-top">:</td>
                              <td className="py-1 font-bold">{data.nama}</td>
                          </tr>
                          <tr>
                              <td className="w-48 py-1 align-top">
                                  {data.tujuan === 'Sekolah' ? 'NIS/NISN' : data.tujuan === 'Kampus' ? 'NIM' : 'NIK/NIP'}
                              </td>
                              <td className="w-4 py-1 align-top">:</td>
                              <td className="py-1">{data.identitas}</td>
                          </tr>
                          <tr>
                              <td className="w-48 py-1 align-top">
                                  {data.tujuan === 'Sekolah' ? 'Kelas' : data.tujuan === 'Kampus' ? 'Program Studi' : 'Jabatan'}
                              </td>
                              <td className="w-4 py-1 align-top">:</td>
                              <td className="py-1">{data.kelasJabatan}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div className="mb-6 text-justify">
                  <p>
                      Bermaksud untuk menyampaikan permohonan izin <strong>tidak dapat {data.tujuan === 'Perusahaan' ? 'bekerja' : data.tujuan === 'Kampus' ? 'mengikuti perkuliahan' : 'mengikuti kegiatan belajar mengajar'}</strong> pada tanggal <strong>{formatDateSafe(data.tanggalMulai)}</strong> {data.tanggalMulai !== data.tanggalSelesai ? `sampai dengan tanggal ${formatDateSafe(data.tanggalSelesai)} (selama ${durasi} hari)` : ''}.
                  </p>
                  <p className="mt-2">
                      Hal ini dikarenakan {data.hubungan === 'Diri Sendiri' ? 'saya' : 'anak saya'} sedang <strong>{data.alasan}</strong>. {data.keteranganTambahan}
                  </p>
                  <p className="mt-2">
                      Demikian surat permohonan izin ini dibuat dengan sebenar-benarnya. Atas perhatian dan izin yang diberikan oleh Bapak/Ibu, {data.hubungan === 'Diri Sendiri' ? 'saya' : 'kami'} mengucapkan terima kasih.
                  </p>
              </div>

              <div className="mt-16 flex justify-end">
                  <div className="text-center w-64">
                      <p className="mb-24">Hormat {data.hubungan === 'Diri Sendiri' ? 'Saya' : 'Kami'},</p>
                      <p className="font-bold underline uppercase">{data.namaTtd}</p>
                      <p className="text-sm">({data.hubungan})</p>
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
               <FileText size={16} className="text-emerald-500" /> <span>Generator Surat Izin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pengirim')} className={`flex-1 py-3 border-r ${activeTab === 'pengirim' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
              <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 border-r ${activeTab === 'penerima' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Instansi</button>
              <button onClick={() => setActiveTab('izin')} className={`flex-1 py-3 ${activeTab === 'izin' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Detail Izin</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'pengirim' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Data Diri (Pemohon)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nama} onChange={e => handleDataChange('nama', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">
                      {data.tujuan === 'Sekolah' ? 'NIS/NISN' : data.tujuan === 'Kampus' ? 'NIM' : 'NIK/NIP'}
                  </label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.identitas} onChange={e => handleDataChange('identitas', e.target.value)} placeholder="Nomor identitas" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">
                      {data.tujuan === 'Sekolah' ? 'Kelas' : data.tujuan === 'Kampus' ? 'Program Studi' : 'Jabatan'}
                  </label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kelasJabatan} onChange={e => handleDataChange('kelasJabatan', e.target.value)} placeholder="Contoh: XII IPA 1" />
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-xs font-black uppercase text-blue-600 mb-4">Tanda Tangan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penanda Tangan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.namaTtd} onChange={e => handleDataChange('namaTtd', e.target.value)} placeholder="Nama yang bertanda tangan" />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan / Status</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.hubungan} onChange={e => handleDataChange('hubungan', e.target.value)}>
                        <option value="Diri Sendiri">Diri Sendiri (Pemohon)</option>
                        <option value="Orang Tua">Orang Tua</option>
                        <option value="Wali">Wali</option>
                        <option value="Keluarga">Keluarga</option>
                    </select>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'penerima' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Tujuan / Instansi</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Instansi (Tujuan)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold" value={data.tujuan} onChange={e => handleDataChange('tujuan', e.target.value)}>
                      <option value="Sekolah">Sekolah</option>
                      <option value="Kampus">Kampus</option>
                      <option value="Perusahaan">Perusahaan</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Instansi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.namaInstansi} onChange={e => handleDataChange('namaInstansi', e.target.value)} placeholder="Nama Sekolah / Kampus / Perusahaan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Instansi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatInstansi} onChange={e => handleDataChange('alamatInstansi', e.target.value)} placeholder="Alamat lengkap tujuan surat" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Jakarta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'izin' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Detail Perizinan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Izin</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold" value={data.alasan} onChange={e => handleDataChange('alasan', e.target.value)}>
                      <option value="Sakit">Sakit</option>
                      <option value="Acara Keluarga">Acara Keluarga</option>
                      <option value="Darurat">Darurat</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Mulai Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalMulai} onChange={e => handleDataChange('tanggalMulai', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sampai Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSelesai} onChange={e => handleDataChange('tanggalSelesai', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Keterangan Tambahan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={data.keteranganTambahan} onChange={e => handleDataChange('keteranganTambahan', e.target.value)} placeholder="Jelaskan secara singkat dan jelas alasan izin..." />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-200/50 overflow-y-auto relative transition-transform duration-300 ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:block' : 'translate-x-0 block w-full'}`}>
           <div className="no-print bg-white/80 backdrop-blur border-b sticky top-0 z-10 px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-600">
                <Eye size={18} className="text-emerald-600" />
                <span className="font-bold text-sm tracking-wide uppercase">Pratinjau Dokumen</span>
              </div>
           </div>

           <div className="p-4 md:p-8 flex justify-center w-full min-h-max" id="print-only-root">
               <DocumentContent />
           </div>
        </div>

      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden no-print fixed bottom-0 w-full bg-white border-t flex z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs uppercase ${mobileView === 'editor' ? 'text-emerald-600 border-t-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
            <Edit3 size={18} /> Editor Form
         </button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs uppercase ${mobileView === 'preview' ? 'text-emerald-600 border-t-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
            <Eye size={18} /> Lihat Hasil
         </button>
      </div>

    </div>
  );
}