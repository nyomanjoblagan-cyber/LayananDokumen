'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, RotateCcw, ArrowLeftCircle, BookOpen, Edit3 
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SkuData {
  letterNumber: string;
  villageName: string;
  subDistrictName: string;
  districtName: string;
  
  ownerName: string;
  ownerNik: string;
  ownerPob: string;
  ownerDob: string;
  ownerGender: string;
  ownerReligion: string;
  ownerJob: string;
  ownerAddress: string;

  businessName: string;
  businessType: string;
  businessAddress: string;
  businessYear: string;
  monthlyIncome: number;

  issueDate: string;
  officialName: string;
  officialPosition: string;
  officialNip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SkuData = {
  letterNumber: '400/012/SKU/2026',
  villageName: 'Sardonoharjo',
  subDistrictName: 'Ngaglik',
  districtName: 'Sleman',
  
  ownerName: 'BAMBANG SUDARSO',
  ownerNik: '3404010101740001',
  ownerPob: 'Sleman',
  ownerDob: '1974-05-12',
  ownerGender: 'Laki-laki',
  ownerReligion: 'Islam',
  ownerJob: 'Wiraswasta',
  ownerAddress: 'Jl. Kaliurang KM 10, RT 05 RW 02, Sardonoharjo, Ngaglik, Sleman',

  businessName: 'Toko Kelontong Berkah',
  businessType: 'Perdagangan / Sembako',
  businessAddress: 'Pasar Gentan Blok A No. 12, Sardonoharjo, Ngaglik, Sleman',
  businessYear: '2015',
  monthlyIncome: 15000000,

  issueDate: '2026-07-11',
  officialName: 'H. AHMAD FAISAL, S.E.',
  officialPosition: 'Kepala Desa',
  officialNip: '19700101 199803 1 005',
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
export default function SkuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Formulir SKU...</div>}>
      <SkuBuilder />
    </Suspense>
  );
}

function SkuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SkuData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pemilik' | 'usaha' | 'surat'>('pemilik');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof SkuData, val: any) => {
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

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* KOP SURAT */}
              <div className="text-center mb-8 pb-4 border-b-[4px] border-black border-double flex flex-col items-center">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.districtName.toUpperCase()}</h1>
                  <h2 className="font-bold text-lg uppercase tracking-wider">KECAMATAN {data.subDistrictName.toUpperCase()}</h2>
                  <h3 className="font-black text-2xl uppercase tracking-widest">DESA {data.villageName.toUpperCase()}</h3>
              </div>
              
              {/* JUDUL SURAT */}
              <div className="text-center mb-10">
                  <h1 className="font-bold text-xl uppercase tracking-wider underline">SURAT KETERANGAN USAHA</h1>
                  <p className="text-sm">Nomor: {data.letterNumber}</p>
              </div>

              {/* PEMBUKA */}
              <div className="mb-6 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini Kepala Desa {data.villageName}, Kecamatan {data.subDistrictName}, Kabupaten {data.districtName}, dengan ini menerangkan bahwa:
                  </p>
              </div>

              {/* IDENTITAS PEMILIK */}
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.ownerName}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">NIK</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerNik}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerPob}, {formatDateSafe(data.ownerDob)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Jenis Kelamin</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerGender}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Agama</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerReligion}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Pekerjaan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerJob}</div>
                  </div>
                  <div className="flex flex-row mb-1 align-top">
                      <div className="w-56 shrink-0">Alamat</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.ownerAddress}</div>
                  </div>
              </div>

              {/* KETERANGAN USAHA */}
              <div className="mb-6 text-justify">
                  <p>Adalah benar penduduk yang berdomisili di Desa {data.villageName}, dan nama tersebut di atas benar-benar memiliki usaha:</p>
              </div>

              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Usaha</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.businessName}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Bidang / Jenis Usaha</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.businessType}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Tahun Berdiri</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.businessYear}</div>
                  </div>
                  <div className="flex flex-row mb-1 align-top">
                      <div className="w-56 shrink-0">Alamat Usaha</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.businessAddress}</div>
                  </div>
                  <div className="flex flex-row mb-1 align-top">
                      <div className="w-56 shrink-0">Kapasitas Pendapatan Bulanan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>
                          {formatRupiah(data.monthlyIncome)} <br />
                          <em>({terbilang(data.monthlyIncome)} Rupiah)</em>
                      </div>
                  </div>
              </div>

              {/* PENUTUP DAN KLAUSUL */}
              <div className="mb-6 text-justify">
                  <p>
                      <strong>Klausul Penegas:</strong> Surat Keterangan Usaha ini diterbitkan dan dibuat khusus untuk digunakan sebagai <strong>Persyaratan Administrasi / Pengajuan Pinjaman</strong>.
                  </p>
              </div>
              <div className="mb-12 text-justify">
                  <p>
                      Demikian Surat Keterangan Usaha ini dibuat dengan sebenar-benarnya berdasarkan peninjauan langsung di lapangan, untuk dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
                  </p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center mt-12 break-inside-avoid pb-12">
                  <div className="w-72">
                      <p className="mb-1">{data.villageName}, {formatDateSafe(data.issueDate)}</p>
                      <p className="mb-24 font-bold">{data.officialPosition} {data.villageName}</p>
                      <p className="font-bold underline uppercase">{data.officialName}</p>
                      {data.officialNip && <p>NIP. {data.officialNip}</p>}
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Keterangan Usaha (SKU)</span>
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
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pemilik')} className={`flex-1 py-3 border-r ${activeTab === 'pemilik' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemilik</button>
              <button onClick={() => setActiveTab('usaha')} className={`flex-1 py-3 border-r ${activeTab === 'usaha' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Usaha</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 ${activeTab === 'surat' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pemilik' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pemilik Usaha</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ownerPob} onChange={e => handleDataChange('ownerPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ownerDob} onChange={e => handleDataChange('ownerDob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.ownerGender} onChange={e => handleDataChange('ownerGender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.ownerReligion} onChange={e => handleDataChange('ownerReligion', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ownerJob} onChange={e => handleDataChange('ownerJob', e.target.value)} placeholder="Contoh: Wiraswasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'usaha' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Usaha</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} placeholder="Contoh: Toko Kelontong Berkah" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bidang / Jenis Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} placeholder="Contoh: Perdagangan / Sembako" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tahun Berdiri</label>
                  <input type="number" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.businessYear} onChange={e => handleDataChange('businessYear', e.target.value)} placeholder="Contoh: 2015" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Usaha</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.businessAddress} onChange={e => handleDataChange('businessAddress', e.target.value)} placeholder="Alamat lokasi usaha beroperasi" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kapasitas Pendapatan Bulanan (Rp)</label>
                  <input type="number" className="w-full p-3 border rounded-lg text-lg font-black mt-1 text-emerald-700 bg-emerald-50" value={data.monthlyIncome} onChange={e => handleDataChange('monthlyIncome', parseInt(e.target.value) || 0)} placeholder="Pendapatan Bulanan" />
                  <p className="text-[10px] mt-1 text-slate-500">{terbilang(data.monthlyIncome)} Rupiah</p>
                </div>
              </div>
              )}

              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Administrasi Surat & Pejabat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.letterNumber} onChange={e => handleDataChange('letterNumber', e.target.value)} placeholder="Contoh: 400/012/SKU/2026" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.districtName} onChange={e => handleDataChange('districtName', e.target.value)} placeholder="Sleman" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.subDistrictName} onChange={e => handleDataChange('subDistrictName', e.target.value)} placeholder="Ngaglik" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Desa</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} placeholder="Sardonoharjo" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Dikeluarkan</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.issueDate} onChange={e => handleDataChange('issueDate', e.target.value)} />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Penandatangan (Kepala Desa)</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                      <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.officialName} onChange={e => handleDataChange('officialName', e.target.value)} placeholder="H. AHMAD FAISAL, S.E." />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.officialPosition} onChange={e => handleDataChange('officialPosition', e.target.value)} placeholder="Kepala Desa" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIP (Opsional)</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.officialNip} onChange={e => handleDataChange('officialNip', e.target.value)} placeholder="Kosongkan jika bukan PNS" />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>

           {/* Mobile View Toggle */}
           <div className="p-4 border-t bg-white md:hidden flex gap-2 z-20">
              <button onClick={() => setMobileView('preview')} className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold text-xs uppercase shadow-md active:scale-95 transition-transform">
                Lihat Dokumen
              </button>
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-500 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:block' : 'block'} print:block print:overflow-visible print:bg-white print:static`}>
           <div className="md:hidden sticky top-0 bg-slate-800 text-white p-3 flex justify-between items-center z-50 shadow-md">
             <button onClick={() => setMobileView('editor')} className="flex items-center gap-2 text-xs font-bold uppercase">
               <ArrowLeft size={16} /> Kembali ke Editor
             </button>
             <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-500 px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold uppercase active:scale-95 transition-transform">
               <Printer size={14} /> Cetak
             </button>
           </div>

           <div className="p-4 md:p-8 min-h-max flex justify-center w-full" id="print-only-root">
               <DocumentContent />
           </div>
        </div>

      </main>
    </div>
  );
}