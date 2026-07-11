'use client';

/**
 * FILE: SktmPage.tsx
 * DESC: Generator Surat Keterangan Tidak Mampu (SKTM)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SktmData {
  // Lokasi & Pengesahan
  regencyName: string;
  subdistrictName: string;
  villageName: string;
  villageAddress: string;
  date: string;
  headTitle: string;
  headName: string;
  
  // Data Orang Tua / Wali (Pemohon)
  parentName: string; 
  parentNik: string; 
  parentPob: string; 
  parentDob: string; 
  parentJob: string; 
  parentAddress: string; 
  
  // Data Anak / Ybs
  childName: string; 
  childNik: string; 
  childPob: string; 
  childDob: string; 
  childJob: string; 
  childAddress: string;
  
  // Tujuan
  purpose: string;
  customPurpose: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SktmData = {
  regencyName: 'Bantul',
  subdistrictName: 'Kasihan',
  villageName: 'Tirtonirmolo',
  villageAddress: 'Jl. Padokan No. 1, Kasihan, Bantul, DI Yogyakarta',
  date: '2026-07-11',
  headTitle: 'Kepala Desa Tirtonirmolo',
  headName: 'H. MUHAMMAD ILHAM, S.E.',
  
  parentName: 'SUPARDI',
  parentNik: '3402050101700001',
  parentPob: 'Bantul',
  parentDob: '1970-05-12',
  parentJob: 'Buruh Harian Lepas',
  parentAddress: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',
  
  childName: 'BUDI SANTOSO',
  childNik: '3402050101990003',
  childPob: 'Bantul',
  childDob: '1999-08-20',
  childJob: 'Pelajar/Mahasiswa',
  childAddress: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',

  purpose: 'Beasiswa',
  customPurpose: ''
};

// --- 3. KOMPONEN UTAMA ---
export default function SktmPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <SktmBuilder />
    </Suspense>
  );
}

function SktmBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SktmData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'lokasi' | 'ortu' | 'anak' | 'keperluan'>('ortu');

  useEffect(() => {
    setIsClient(true);
    
    // Add print event listener
    const handlePrint = () => {
      window.print();
    };
    window.addEventListener('open-print-modal', handlePrint);
    
    return () => {
      window.removeEventListener('open-print-modal', handlePrint);
    };
  }, []);

  const handleDataChange = (field: keyof SktmData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    const displayPurpose = data.purpose === 'Lainnya' ? data.customPurpose : data.purpose;

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* KOP SURAT */}
              <div className="text-center mb-1 border-b-4 border-black pb-4">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.regencyName}</h1>
                  <h2 className="font-bold text-2xl uppercase tracking-wider">KECAMATAN {data.subdistrictName}</h2>
                  <h3 className="font-bold text-3xl uppercase tracking-widest">KANTOR KEPALA DESA {data.villageName}</h3>
                  <p className="text-sm mt-1">{data.villageAddress}</p>
              </div>
              <div className="border-b-[1px] border-black mb-6 -mt-1"></div>
              
              {/* JUDUL SURAT */}
              <div className="text-center mb-8">
                  <h1 className="font-bold text-xl uppercase underline">SURAT KETERANGAN TIDAK MAMPU</h1>
                  <p className="font-medium">Nomor: 400 / ........ / {new Date().getFullYear()}</p>
              </div>
              
              {/* ISI SURAT */}
              <div className="mb-4 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini, {data.headTitle}, Kecamatan {data.subdistrictName}, Kabupaten {data.regencyName}, dengan ini menerangkan dengan sesungguhnya bahwa:
                  </p>
              </div>

              {/* IDENTITAS ORANG TUA */}
              <div className="pl-8 pr-4 mb-4 text-justify break-inside-avoid">
                  <table className="w-full">
                      <tbody>
                          <tr>
                              <td className="w-48 align-top">Nama Lengkap</td>
                              <td className="w-4 align-top">:</td>
                              <td className="font-bold uppercase">{data.parentName}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">NIK</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.parentNik}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Tempat, Tanggal Lahir</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.parentPob}, {formatDateSafe(data.parentDob)}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Pekerjaan</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.parentJob}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Alamat Lengkap</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.parentAddress}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div className="mb-4 text-justify">
                  <p>
                      Adalah benar-benar warga / penduduk Desa {data.villageName} yang berdomisili di alamat tersebut di atas. Berdasarkan catatan administrasi desa dan pengamatan langsung di lapangan, keluarga yang bersangkutan memiliki keadaan ekonomi yang kurang memadai dan tergolong dalam <strong>Keluarga Prasejahtera / Tidak Mampu</strong>.
                  </p>
              </div>

              <div className="mb-4 text-justify">
                  <p>
                      Surat Keterangan Tidak Mampu (SKTM) ini dibuat untuk keperluan / sebagai kelengkapan persyaratan pengajuan:
                  </p>
                  <p className="font-bold text-center text-lg my-2 uppercase">&quot; {displayPurpose} &quot;</p>
              </div>

              <div className="mb-4 text-justify">
                  <p>
                      Guna kepentingan / diperuntukkan bagi anak / anggota keluarga yang bersangkutan:
                  </p>
              </div>

              {/* IDENTITAS ANAK */}
              <div className="pl-8 pr-4 mb-6 text-justify break-inside-avoid">
                  <table className="w-full">
                      <tbody>
                          <tr>
                              <td className="w-48 align-top">Nama Lengkap</td>
                              <td className="w-4 align-top">:</td>
                              <td className="font-bold uppercase">{data.childName}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">NIK</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.childNik}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Tempat, Tanggal Lahir</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.childPob}, {formatDateSafe(data.childDob)}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Pekerjaan/Pendidikan</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.childJob}</td>
                          </tr>
                          <tr>
                              <td className="w-48 align-top">Alamat Lengkap</td>
                              <td className="w-4 align-top">:</td>
                              <td>{data.childAddress}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* PENUTUP */}
              <div className="mb-12 text-justify">
                  <p>
                      Demikian Surat Keterangan Tidak Mampu ini dibuat dengan sesungguhnya dan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya. Apabila di kemudian hari ternyata keterangan ini tidak benar, maka kami bersedia dituntut sesuai dengan hukum dan peraturan perundang-undangan yang berlaku.
                  </p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end mt-12 break-inside-avoid pb-12">
                  <div className="text-center w-72">
                      <p className="mb-1">{data.villageName}, {formatDateSafe(data.date)}</p>
                      <p className="mb-24 font-bold">{data.headTitle}</p>
                      <p className="font-bold underline uppercase">{data.headName}</p>
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - SKTM</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile View Toggle */}
            <div className="md:hidden flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setMobileView('editor')} 
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mobileView === 'editor' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                Form
              </button>
              <button 
                onClick={() => setMobileView('preview')} 
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mobileView === 'preview' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                Preview
              </button>
            </div>
            
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('ortu')} className={`flex-1 py-3 border-r ${activeTab === 'ortu' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Ortu/Wali</button>
              <button onClick={() => setActiveTab('anak')} className={`flex-1 py-3 border-r ${activeTab === 'anak' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Anak/Ybs</button>
              <button onClick={() => setActiveTab('keperluan')} className={`flex-1 py-3 border-r ${activeTab === 'keperluan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Keperluan</button>
              <button onClick={() => setActiveTab('lokasi')} className={`flex-1 py-3 ${activeTab === 'lokasi' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lokasi</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'ortu' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Orang Tua / Wali</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Contoh: SUPARDI" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.parentPob} onChange={e => handleDataChange('parentPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.parentDob} onChange={e => handleDataChange('parentDob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} placeholder="Contoh: Buruh Harian Lepas" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'anak' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Anak / Ybs</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP/KK</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Contoh: BUDI SANTOSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childNik} onChange={e => handleDataChange('childNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childPob} onChange={e => handleDataChange('childPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childDob} onChange={e => handleDataChange('childDob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan/Pendidikan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childJob} onChange={e => handleDataChange('childJob', e.target.value)} placeholder="Contoh: Pelajar/Mahasiswa" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.childAddress} onChange={e => handleDataChange('childAddress', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'keperluan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Tujuan & Keperluan Surat</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan Pembuatan Surat</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-medium" 
                    value={data.purpose} 
                    onChange={e => handleDataChange('purpose', e.target.value)}
                  >
                      <option value="Beasiswa">Beasiswa Pendidikan</option>
                      <option value="Keringanan Biaya Rumah Sakit">Keringanan Biaya Rumah Sakit</option>
                      <option value="Bantuan Sosial (Bansos)">Bantuan Sosial (Bansos)</option>
                      <option value="Keringanan Biaya Sekolah / SPP">Keringanan Biaya Sekolah / SPP</option>
                      <option value="Persyaratan Melamar Pekerjaan">Persyaratan Melamar Pekerjaan</option>
                      <option value="Lainnya">Lainnya...</option>
                  </select>
                </div>
                
                {data.purpose === 'Lainnya' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tuliskan Tujuan Spesifik</label>
                    <input 
                      className="w-full p-2 border rounded-lg text-sm mt-1" 
                      value={data.customPurpose} 
                      onChange={e => handleDataChange('customPurpose', e.target.value)} 
                      placeholder="Contoh: Pendaftaran KIP Kuliah" 
                    />
                  </div>
                )}
              </div>
              )}

              {activeTab === 'lokasi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Kop & Pengesahan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.regencyName} onChange={e => handleDataChange('regencyName', e.target.value)} placeholder="Contoh: Bantul" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.subdistrictName} onChange={e => handleDataChange('subdistrictName', e.target.value)} placeholder="Contoh: Kasihan" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Desa/Kelurahan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} placeholder="Contoh: Tirtonirmolo" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kantor Desa</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.villageAddress} onChange={e => handleDataChange('villageAddress', e.target.value)} placeholder="Alamat lengkap kantor desa" />
                </div>
                
                <div className="pt-4 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Penandatangan & Pengesahan</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1 mb-3" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.headTitle} onChange={e => handleDataChange('headTitle', e.target.value)} placeholder="Contoh: Kepala Desa Tirtonirmolo" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Kepala Desa / Lurah</label>
                      <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.headName} onChange={e => handleDataChange('headName', e.target.value)} placeholder="Contoh: H. MUHAMMAD ILHAM, S.E." />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW & PDF RENDERER */}
        <div className={`flex-1 bg-slate-500 overflow-y-auto w-full absolute md:relative z-0 ${mobileView === 'editor' ? 'hidden md:block' : 'block'}`} style={{ height: '100%' }}>
            
            {/* INVISIBLE PRINT CONTAINER (Hanya muncul saat CTRL+P) */}
            <div id="print-only-root" className="hidden print:block bg-white w-full">
               <DocumentContent />
            </div>

            {/* LIVE PREVIEW CONTAINER (Untuk UI web) */}
            <div className="p-8 print:hidden flex justify-center min-w-min">
                <div className="scale-100 origin-top shadow-2xl transition-transform duration-300 hover:shadow-3xl">
                   <DocumentContent />
                </div>
            </div>

            {/* Spacer for mobile scroll */}
            <div className="h-32 md:hidden"></div>
        </div>
      </main>
    </div>
  );
}