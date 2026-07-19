'use client';
import { useFormSync } from '@/lib/useFormSync';

import PrintWrapper from '@/components/PrintWrapper';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw, 
  User, Users, DollarSign, MapPin, FileText, CheckCircle2, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface PenghasilanData {
  namaOrtu: string;
  nikOrtu: string;
  umurOrtu: string;
  pekerjaanOrtu: string;
  alamatOrtu: string;
  
  namaAnak: string;
  nikAnak: string;
  tempatLahirAnak: string;
  tanggalLahirAnak: string;
  asalSekolah: string;
  
  gajiKotor: number;
  potongan: number;
  jumlahTanggungan: number;
  
  kopPemda: string;
  kecamatan: string;
  desa: string;
  alamatDesa: string;
  kadesName: string;
  nomorSurat: string;
  tanggalSurat: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PenghasilanData = {
  namaOrtu: 'Budi Santoso',
  nikOrtu: '3404010101740001',
  umurOrtu: '50',
  pekerjaanOrtu: 'Wiraswasta / Pedagang',
  alamatOrtu: 'Dusun Mawar RT 01 RW 02, Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',

  namaAnak: 'Ahmad Faisal',
  nikAnak: '3404010101060002',
  tempatLahirAnak: 'Sleman',
  tanggalLahirAnak: '2006-05-12',
  asalSekolah: 'Universitas Gadjah Mada',

  gajiKotor: 3500000,
  potongan: 500000,
  jumlahTanggungan: 3,

  kopPemda: 'PEMERINTAH KABUPATEN SLEMAN',
  kecamatan: 'KECAMATAN NGAGLIK',
  desa: 'PEMERINTAH KALURAHAN SARDONOHARJO',
  alamatDesa: 'Jl. Kaliurang Km. 10, Sardonoharjo, Ngaglik, Sleman, DI Yogyakarta 55581',
  kadesName: 'H. Sudirman, S.E.',
  nomorSurat: '400 / 015 / SKP / 2026',
  tanggalSurat: new Date().toISOString().split('T')[0]
};

// --- HELPER FUNCTION UNTUK TERBILANG ---
function terbilang(angka: number): string {
    const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let hasil = "";
    if (angka < 12) {
        hasil = huruf[angka];
    } else if (angka < 20) {
        hasil = terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        hasil = terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
    } else if (angka < 200) {
        hasil = "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        hasil = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        hasil = "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        hasil = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        hasil = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar " + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
        hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
    }
    return hasil.trim();
}

// --- 3. KOMPONEN UTAMA ---
export default function PenghasilanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-neutral-950">Memuat Legal Editor...</div>}>
      <PenghasilanOrtuBuilder />
    </Suspense>
  );
}

function PenghasilanOrtuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PenghasilanData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'ortu' | 'anak' | 'gaji' | 'desa'>('ortu');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof PenghasilanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-[20mm] text-black font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    const gajiBersih = data.gajiKotor - data.potongan;

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas className="print:w-full print:min-w-0">
              {/* KOP SURAT RESMI */}
              <div className="flex items-center justify-between border-b-[3px] border-double border-black pb-4 mb-6">
                  {/* LOGO GARUDA / PEMDA */}
                  <div className="w-[80px] h-[90px] flex-shrink-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                      <span className="text-xs text-center text-gray-400 font-sans">Logo<br/>Pemda</span>
                  </div>
                  
                  {/* TEXT KOP */}
                  <div className="flex-1 text-center px-4">
                      <h1 className="font-bold text-xl uppercase tracking-wide m-0 leading-tight">{data.kopPemda}</h1>
                      <h1 className="font-bold text-xl uppercase tracking-wide m-0 leading-tight">{data.kecamatan}</h1>
                      <h1 className="font-bold text-2xl uppercase tracking-widest m-0 leading-tight mt-1">{data.desa}</h1>
                      <p className="text-sm mt-2 font-normal m-0">{data.alamatDesa}</p>
                  </div>
                  
                  {/* EMPTY SPACE FOR BALANCE */}
                  <div className="w-[80px] h-[90px] flex-shrink-0"></div>
              </div>
              
              {/* JUDUL SURAT */}
              <div className="text-center mb-8">
                  <h2 className="font-bold text-lg uppercase underline tracking-wide">SURAT KETERANGAN PENGHASILAN</h2>
                  <p className="mt-1 font-normal text-md">Nomor : {data.nomorSurat}</p>
              </div>
              
              {/* PEMBUKAAN */}
              <div className="mb-6 text-justify">
                  <p className="indent-8">
                      Yang bertanda tangan di bawah ini Kepala Desa / Lurah {data.desa.replace('PEMERINTAH KALURAHAN ', '').replace('PEMERINTAH DESA ', '')}, {data.kecamatan}, {data.kopPemda.replace('PEMERINTAH ', '')}, menerangkan dengan sesungguhnya bahwa:
                  </p>
              </div>

              {/* IDENTITAS ORANG TUA */}
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Lengkap</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="font-bold uppercase flex-1">{data.namaOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">NIK</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.nikOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Umur</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.umurOrtu} Tahun</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Pekerjaan</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.pekerjaanOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0 align-top">Alamat Domisili</div>
                      <div className="w-6 shrink-0 text-center align-top">:</div>
                      <div className="flex-1">{data.alamatOrtu}</div>
                  </div>
              </div>

              {/* PERNYATAAN HUBUNGAN KELUARGA */}
              <div className="mb-4 text-justify">
                  <p className="indent-8">Adalah benar warga masyarakat kami yang berdomisili di alamat tersebut di atas. Orang tersebut adalah orang tua kandung / wali dari anak:</p>
              </div>

              {/* IDENTITAS ANAK */}
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Lengkap Anak</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="font-bold uppercase flex-1">{data.namaAnak}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">NIK Anak</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.nikAnak}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.tempatLahirAnak}, {formatDateSafe(data.tanggalLahirAnak)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Asal Sekolah / Instansi</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.asalSekolah}</div>
                  </div>
              </div>

              {/* RINCIAN PENGHASILAN */}
              <div className="mb-4 text-justify">
                  <p className="indent-8">Dengan ini kami menerangkan bahwa rincian rata-rata penghasilan orang tua / wali tersebut di atas setiap bulannya adalah sebagai berikut:</p>
              </div>

              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Penghasilan / Gaji Kotor</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{formatRupiah(data.gajiKotor)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Potongan</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{formatRupiah(data.potongan)}</div>
                  </div>
                  <div className="flex flex-row mb-1 mt-2">
                      <div className="w-56 shrink-0 font-bold">Penghasilan Bersih</div>
                      <div className="w-6 shrink-0 font-bold text-center">:</div>
                      <div className="font-bold border-b-2 border-black inline-block px-1 flex-1">{formatRupiah(gajiBersih)}</div>
                  </div>
                  <div className="flex flex-row mb-1 mt-2">
                      <div className="w-56 shrink-0 italic text-sm">Terbilang</div>
                      <div className="w-6 shrink-0 italic text-sm text-center">:</div>
                      <div className="italic text-sm capitalize flex-1">( {terbilang(gajiBersih)} Rupiah )</div>
                  </div>
                  <div className="flex flex-row mb-1 mt-4">
                      <div className="w-56 shrink-0">Jumlah Tanggungan Anak</div>
                      <div className="w-6 shrink-0 text-center">:</div>
                      <div className="flex-1">{data.jumlahTanggungan} Orang</div>
                  </div>
              </div>

              {/* PENUTUP */}
              <div className="mb-12 mt-8 text-justify">
                  <p className="indent-8">Surat keterangan ini diterbitkan sebagai dokumen pelengkap persyaratan administratif untuk mengajukan permohonan <strong>Beasiswa / KIP (Kartu Indonesia Pintar)</strong> atau keperluan pendidikan lainnya.</p>
                  <p className="indent-8 mt-2">Demikian surat keterangan ini dibuat dengan sebenar-benarnya berdasarkan data yang ada pada kami, untuk dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center mt-12 break-inside-avoid pb-12">
                  <div className="w-72">
                      <p className="mb-1">{data.desa.replace('PEMERINTAH KALURAHAN ', '').replace('PEMERINTAH DESA ', '')}, {formatDateSafe(data.tanggalSurat)}</p>
                      <p className="mb-24 font-bold uppercase">Kepala Desa / Lurah</p>
                      <p className="font-bold underline uppercase text-lg">{data.kadesName}</p>
                  </div>
              </div>

          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col font-sans text-neutral-100 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-neutral-950/80 backdrop-blur-xl text-white sticky top-0 z-50 border-b border-neutral-800 h-16 flex items-center px-4 lg:px-8 justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white flex items-center gap-2 transition-all duration-300 group">
              <ArrowLeftCircle size={24} className="text-emerald-500 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-neutral-800 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-3 text-sm font-bold text-neutral-200 uppercase tracking-wide">
               <FileText size={18} className="text-emerald-500" /> 
               <span>Surat Keterangan Penghasilan</span>
               <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">Official Form</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all duration-300">
              <Printer size={16} /> <span className="hidden md:inline">Cetak / Export PDF</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-neutral-900 border-r border-neutral-800 flex flex-col h-full absolute md:relative z-10 transition-transform duration-500 ease-in-out ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/50">
              <div className="flex flex-col">
                <h2 className="font-bold text-sm uppercase text-neutral-200 flex items-center gap-2">
                  <Edit3 size={16} className="text-emerald-500" /> Pengisian Data
                </h2>
                <p className="text-[10px] text-neutral-500 mt-1">Lengkapi form untuk meng-generate surat resmi</p>
              </div>
              <button onClick={handleReset} className="text-neutral-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-all" title="Reset Form">
                <RotateCcw size={18}/>
              </button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b border-neutral-800 bg-neutral-950 text-[10px] font-bold uppercase tracking-wider p-2 gap-1">
              <button onClick={() => setActiveTab('ortu')} className={`flex-1 py-2.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'ortu' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'}`}>
                <User size={14}/> Ortu
              </button>
              <button onClick={() => setActiveTab('anak')} className={`flex-1 py-2.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'anak' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'}`}>
                <Users size={14}/> Anak
              </button>
              <button onClick={() => setActiveTab('gaji')} className={`flex-1 py-2.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'gaji' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'}`}>
                <DollarSign size={14}/> Gaji
              </button>
              <button onClick={() => setActiveTab('desa')} className={`flex-1 py-2.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'desa' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'}`}>
                <MapPin size={14}/> Desa
              </button>
           </div>

 <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-32 print:flex print:overflow-visible print:bg-white relative print:static">
              
              {activeTab === 'ortu' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                  <h3 className="text-xs font-black uppercase text-blue-400 tracking-wider">Identitas Orang Tua / Wali</h3>
                  <CheckCircle2 size={16} className="text-blue-500/50" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Nama Lengkap</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.namaOrtu} onChange={e => handleDataChange('namaOrtu', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700 font-mono" value={data.nikOrtu} onChange={e => handleDataChange('nikOrtu', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Umur (Tahun)</label>
                    <input type="number" className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.umurOrtu} onChange={e => handleDataChange('umurOrtu', e.target.value)} placeholder="50" />
                  </div>
                  <div className="space-y-1 flex-[2]">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Pekerjaan</label>
                    <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.pekerjaanOrtu} onChange={e => handleDataChange('pekerjaanOrtu', e.target.value)} placeholder="Contoh: Wiraswasta" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Alamat Lengkap Domisili</label>
                  <textarea className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700 h-28 resize-none" value={data.alamatOrtu} onChange={e => handleDataChange('alamatOrtu', e.target.value)} placeholder="Dusun, RT/RW, Desa, Kecamatan, Kabupaten" />
                </div>
                
                <button onClick={() => setActiveTab('anak')} className="w-full mt-6 bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  Lanjut ke Data Anak <ChevronRight size={16} />
                </button>
              </div>
              )}

              {activeTab === 'anak' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                  <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider">Identitas Anak / Siswa</h3>
                  <CheckCircle2 size={16} className="text-emerald-500/50" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Nama Lengkap Anak</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.namaAnak} onChange={e => handleDataChange('namaAnak', e.target.value)} placeholder="Nama Siswa/Mahasiswa" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">NIK Anak</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700 font-mono" value={data.nikAnak} onChange={e => handleDataChange('nikAnak', e.target.value)} placeholder="16 Digit NIK Anak" maxLength={16} />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Tempat Lahir</label>
                    <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.tempatLahirAnak} onChange={e => handleDataChange('tempatLahirAnak', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Tanggal Lahir</label>
                    <input type="date" className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-medium transition-all text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={data.tanggalLahirAnak} onChange={e => handleDataChange('tanggalLahirAnak', e.target.value)} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Asal Sekolah / Universitas</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-medium transition-all text-white placeholder-neutral-700" value={data.asalSekolah} onChange={e => handleDataChange('asalSekolah', e.target.value)} placeholder="Contoh: Universitas Gadjah Mada" />
                </div>

                <button onClick={() => setActiveTab('gaji')} className="w-full mt-6 bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  Lanjut ke Data Gaji <ChevronRight size={16} />
                </button>
              </div>
              )}

              {activeTab === 'gaji' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                  <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Rincian Penghasilan</h3>
                  <CheckCircle2 size={16} className="text-amber-500/50" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Penghasilan / Gaji Kotor (Rp)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                      <span className="text-neutral-500 font-bold">Rp</span>
                    </div>
                    <input type="number" className="w-full pl-10 p-4 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-xl font-black transition-all text-amber-400 placeholder-neutral-700 font-mono" value={data.gajiKotor} onChange={e => handleDataChange('gajiKotor', parseInt(e.target.value) || 0)} />
                  </div>
                  <p className="text-[10px] mt-1.5 text-neutral-500 capitalize tracking-wide">{terbilang(data.gajiKotor)} Rupiah</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Potongan / Cicilan (Rp)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                      <span className="text-neutral-500 font-bold">Rp</span>
                    </div>
                    <input type="number" className="w-full pl-10 p-3 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-sm font-bold transition-all text-white placeholder-neutral-700 font-mono" value={data.potongan} onChange={e => handleDataChange('potongan', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
                
                <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl space-y-1 mt-4">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Kalkulasi Penghasilan Bersih</p>
                  <p className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{formatRupiah(data.gajiKotor - data.potongan)}</p>
                  <p className="text-[10px] text-emerald-500/70 capitalize pt-1 border-t border-emerald-900/50 mt-2">{terbilang(data.gajiKotor - data.potongan)} Rupiah</p>
                </div>
                
                <div className="space-y-1 pt-4">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Jumlah Tanggungan Anak</label>
                  <div className="flex items-center gap-3">
                    <input type="number" className="w-24 p-3 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-sm font-bold transition-all text-white text-center" value={data.jumlahTanggungan} onChange={e => handleDataChange('jumlahTanggungan', parseInt(e.target.value) || 0)} />
                    <span className="text-sm font-bold text-neutral-500 uppercase">Orang / Anak</span>
                  </div>
                </div>

                <button onClick={() => setActiveTab('desa')} className="w-full mt-6 bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  Lanjut ke Data Desa <ChevronRight size={16} />
                </button>
              </div>
              )}

              {activeTab === 'desa' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                  <h3 className="text-xs font-black uppercase text-purple-400 tracking-wider">Kop & Tanda Tangan Desa</h3>
                  <CheckCircle2 size={16} className="text-purple-500/50" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Pemerintah Kabupaten/Kota</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-bold transition-all text-white" value={data.kopPemda} onChange={e => handleDataChange('kopPemda', e.target.value.toUpperCase())} placeholder="PEMERINTAH KABUPATEN SLEMAN" />
                </div>
                
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Kecamatan</label>
                    <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-medium transition-all text-white uppercase" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value.toUpperCase())} placeholder="KECAMATAN NGAGLIK" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Pemerintah Desa/Kelurahan</label>
                  <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-bold transition-all text-white uppercase" value={data.desa} onChange={e => handleDataChange('desa', e.target.value.toUpperCase())} placeholder="PEMERINTAH KALURAHAN SARDONOHARJO" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Alamat Instansi</label>
                  <textarea className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs font-medium transition-all text-white h-16 resize-none" value={data.alamatDesa} onChange={e => handleDataChange('alamatDesa', e.target.value)} placeholder="Alamat lengkap instansi" />
                </div>

                <div className="border-t border-neutral-800 pt-4 mt-2 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Nomor Surat Keterangan</label>
                    <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-medium transition-all text-white" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} placeholder="400/015/SKP/2026" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Nama Kepala Desa / Lurah</label>
                    <input className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-bold transition-all text-white" value={data.kadesName} onChange={e => handleDataChange('kadesName', e.target.value)} placeholder="Nama berserta gelar" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Tanggal Penandatanganan</label>
                    <input type="date" className="w-full p-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-sm font-medium transition-all text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>

                <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/50">
                  <Printer size={18} /> Selesai & Cetak Surat
                </button>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
 <div className={`flex-1 h-full bg-[#111111] flex flex-col items-center p-4 md:p-8 overflow-y-auto relative custom-scrollbar ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static print:p-0`}>
            
            {/* Desktop Preview Header */}
            <div className="no-print w-full max-w-[210mm] mb-4 flex justify-between items-center px-4 py-2 bg-neutral-800/50 rounded-xl border border-neutral-700/50 backdrop-blur-sm">
               <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 Live A4 Preview
               </span>
               <span className="text-[10px] text-neutral-500 font-mono">210mm x 297mm</span>
            </div>

            <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.60] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 mb-[-140mm] sm:mb-[-80mm] md:mb-[-40mm] xl:mb-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block print:shadow-none bg-white ring-1 ring-neutral-800">
                <DocumentContent />
            </div>
            
            {/* Spacer for bottom padding in scroll */}
            <div className="h-20 w-full shrink-0 no-print"></div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-neutral-900/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl border border-neutral-800 font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'editor' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_penghasilan_ortu" price={5000} />
      </div>
    </div>
  );
}

