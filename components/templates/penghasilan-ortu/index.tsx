'use client';

/**
 * FILE: PenghasilanOrtuPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Keterangan Penghasilan Orang Tua untuk KIP/Beasiswa
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  BadgeDollarSign, Users, GripHorizontal, CreditCard, CalendarDays, FileText, Edit3, Eye, RotateCcw, ArrowLeftCircle, BookOpen, Scaling
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
  
  kadesName: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  tanggalSurat: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PenghasilanData = {
  namaOrtu: 'Budi Santoso',
  nikOrtu: '3404010101740001',
  umurOrtu: '50',
  pekerjaanOrtu: 'Buruh Harian Lepas',
  alamatOrtu: 'Dusun Mawar RT 01 RW 02, Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',

  namaAnak: 'Ahmad Faisal',
  nikAnak: '3404010101060002',
  tempatLahirAnak: 'Sleman',
  tanggalLahirAnak: '2006-05-12',
  asalSekolah: 'SMA Negeri 1 Ngaglik',

  gajiKotor: 2500000,
  potongan: 500000,
  jumlahTanggungan: 3,

  kadesName: 'H. Sudirman, S.E.',
  desa: 'Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PenghasilanOrtuBuilder />
    </Suspense>
  );
}

function PenghasilanOrtuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PenghasilanData>(INITIAL_DATA);
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
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
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
              {/* HEADER / KOP SURAT */}
              <div className="text-center mb-6 pb-4 border-b-4 border-black">
                  <h1 className="font-bold text-lg uppercase">PEMERINTAH KABUPATEN {data.kabupaten}</h1>
                  <h1 className="font-bold text-lg uppercase">KECAMATAN {data.kecamatan}</h1>
                  <h1 className="font-bold text-xl uppercase tracking-wider">KANTOR KEPALA DESA {data.desa}</h1>
              </div>
              
              <div className="text-center mb-8">
                  <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN PENGHASILAN ORANG TUA</h2>
                  <p className="mt-1">Nomor : ..............................................</p>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini Kepala Desa {data.desa}, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}, menerangkan dengan sesungguhnya bahwa:
                  </p>
              </div>

              {/* IDENTITAS ORANG TUA */}
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.namaOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">NIK</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nikOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Umur</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.umurOrtu} Tahun</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Pekerjaan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.pekerjaanOrtu}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Alamat</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.alamatOrtu}</div>
                  </div>
              </div>

              {/* PERNYATAAN */}
              <div className="mb-4 text-justify">
                  <p>Adalah benar penduduk Desa {data.desa} yang berdomisili di alamat tersebut di atas. Orang tersebut benar-benar orang tua kandung / wali dari anak:</p>
              </div>

              {/* IDENTITAS ANAK */}
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.namaAnak}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">NIK</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nikAnak}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.tempatLahirAnak}, {formatDateSafe(data.tanggalLahirAnak)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Asal Sekolah / Instansi</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.asalSekolah}</div>
                  </div>
              </div>

              {/* RINCIAN PENGHASILAN */}
              <div className="mb-4 text-justify">
                  <p>Dengan ini menerangkan rincian penghasilan orang tua / wali tersebut setiap bulannya adalah sebagai berikut:</p>
              </div>

              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Penghasilan / Gaji Kotor</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{formatRupiah(data.gajiKotor)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Potongan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{formatRupiah(data.potongan)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0 font-bold">Penghasilan Bersih</div>
                      <div className="w-4 shrink-0 font-bold">:</div>
                      <div className="font-bold border-b border-black inline-block">{formatRupiah(gajiBersih)}</div>
                  </div>
                  <div className="flex flex-row mb-1 mt-2">
                      <div className="w-48 shrink-0 italic text-sm">Terbilang (Penghasilan Bersih)</div>
                      <div className="w-4 shrink-0 italic text-sm">:</div>
                      <div className="italic text-sm">{terbilang(gajiBersih)} Rupiah</div>
                  </div>
                  <div className="flex flex-row mb-1 mt-4">
                      <div className="w-48 shrink-0">Jumlah Tanggungan Anak</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.jumlahTanggungan} Orang</div>
                  </div>
              </div>

              {/* PENUTUP */}
              <div className="mb-12 mt-8 text-justify">
                  <p>Surat keterangan ini dibuat sebagai dokumen pelengkap persyaratan untuk mengajukan permohonan <strong>Beasiswa / KIP (Kartu Indonesia Pintar)</strong> atau keperluan pendidikan lainnya.</p>
                  <p className="mt-2">Demikian surat keterangan ini dibuat dengan sesungguhnya, agar dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center mt-12 break-inside-avoid pb-12">
                  <div className="w-64">
                      <p className="mb-1">{data.desa}, {formatDateSafe(data.tanggalSurat)}</p>
                      <p className="mb-24 font-bold uppercase">Kepala Desa {data.desa}</p>
                      <p className="font-bold underline uppercase">{data.kadesName}</p>
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Keterangan Penghasilan Ortu</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
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
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('ortu')} className={`flex-1 py-3 border-r ${activeTab === 'ortu' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Orang Tua</button>
              <button onClick={() => setActiveTab('anak')} className={`flex-1 py-3 border-r ${activeTab === 'anak' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Anak / Siswa</button>
              <button onClick={() => setActiveTab('gaji')} className={`flex-1 py-3 border-r ${activeTab === 'gaji' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penghasilan</button>
              <button onClick={() => setActiveTab('desa')} className={`flex-1 py-3 ${activeTab === 'desa' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Keterangan Desa</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'ortu' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Orang Tua / Wali</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaOrtu} onChange={e => handleDataChange('namaOrtu', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nikOrtu} onChange={e => handleDataChange('nikOrtu', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Umur (Tahun)</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.umurOrtu} onChange={e => handleDataChange('umurOrtu', e.target.value)} placeholder="Contoh: 50" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaanOrtu} onChange={e => handleDataChange('pekerjaanOrtu', e.target.value)} placeholder="Contoh: Buruh Harian Lepas" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatOrtu} onChange={e => handleDataChange('alamatOrtu', e.target.value)} placeholder="Sesuai Domisili KTP" />
                </div>
              </div>
              )}

              {activeTab === 'anak' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Anak / Siswa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Anak</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaAnak} onChange={e => handleDataChange('namaAnak', e.target.value)} placeholder="Nama Lengkap" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Anak</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nikAnak} onChange={e => handleDataChange('nikAnak', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatLahirAnak} onChange={e => handleDataChange('tempatLahirAnak', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalLahirAnak} onChange={e => handleDataChange('tanggalLahirAnak', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Asal Sekolah / Instansi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.asalSekolah} onChange={e => handleDataChange('asalSekolah', e.target.value)} placeholder="Contoh: SMA Negeri 1 Ngaglik" />
                </div>
              </div>
              )}

              {activeTab === 'gaji' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Rincian Penghasilan & Tanggungan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Gaji / Penghasilan Kotor (Rp)</label>
                  <input type="number" className="w-full p-3 border rounded-lg text-lg font-black mt-1 text-amber-700 bg-amber-50" value={data.gajiKotor} onChange={e => handleDataChange('gajiKotor', parseInt(e.target.value) || 0)} />
                  <p className="text-[10px] mt-1 text-slate-500">{terbilang(data.gajiKotor)} Rupiah</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Potongan (Rp)</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.potongan} onChange={e => handleDataChange('potongan', parseInt(e.target.value) || 0)} />
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                  <p className="text-[10px] font-bold text-emerald-700 uppercase">Penghasilan Bersih (Otomatis)</p>
                  <p className="text-lg font-black text-emerald-600">{formatRupiah(data.gajiKotor - data.potongan)}</p>
                </div>
                <div className="pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jumlah Tanggungan Anak</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.jumlahTanggungan} onChange={e => handleDataChange('jumlahTanggungan', parseInt(e.target.value) || 0)} placeholder="Contoh: 3" />
                  <p className="text-[10px] text-slate-500 mt-1">Jumlah anak yang masih menjadi tanggungan</p>
                </div>
              </div>
              )}

              {activeTab === 'desa' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Keterangan Instansi Desa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten / Kota</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} placeholder="Contoh: Sleman" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} placeholder="Contoh: Ngaglik" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Desa / Kelurahan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.desa} onChange={e => handleDataChange('desa', e.target.value)} placeholder="Contoh: Sardonoharjo" />
                </div>
                <div className="pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Kepala Desa / Lurah</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.kadesName} onChange={e => handleDataChange('kadesName', e.target.value)} placeholder="Nama beserta gelar" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}