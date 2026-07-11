'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, ArrowLeftCircle, BookOpen, Edit3 
} from 'lucide-react';
import Link from 'next/link';

interface PengantarRtData {
  nomorSuratRt: string;
  nomorSuratRw: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  
  nama: string;
  ttl: string;
  jenisKelamin: string;
  agama: string;
  pekerjaan: string;
  statusPerkawinan: string;
  nik: string;
  noKk: string;
  kewarganegaraan: string;
  alamat: string;

  keperluan: string;
  keterangan: string;
  
  tanggalSurat: string;
  namaKetuaRt: string;
  namaKetuaRw: string;
}

const INITIAL_DATA: PengantarRtData = {
  nomorSuratRt: '05/RT.01/VII/2026',
  nomorSuratRw: '12/RW.03/VII/2026',
  rt: '01',
  rw: '03',
  desa: 'Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
  
  nama: 'BUDI SANTOSO',
  ttl: 'Sleman, 15 Agustus 1985',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  pekerjaan: 'Wiraswasta',
  statusPerkawinan: 'Kawin',
  nik: '3404011508850001',
  noKk: '3404010101100002',
  kewarganegaraan: 'WNI',
  alamat: 'Jl. Kaliurang KM 10, RT 01 RW 03, Sardonoharjo, Ngaglik, Sleman',
  
  keperluan: 'Pembuatan KTP',
  keterangan: 'Demikian surat pengantar ini dibuat untuk dipergunakan sebagaimana mestinya.',
  
  tanggalSurat: '2026-07-11',
  namaKetuaRt: 'AHMAD FAUZI',
  namaKetuaRw: 'SUTRISNO'
};

export default function PengantarRtPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PengantarRtBuilder />
    </Suspense>
  );
}

function PengantarRtBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PengantarRtData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'surat' | 'pemohon' | 'pejabat'>('surat');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof PengantarRtData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-sans leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
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
              <div className="text-center mb-6 pb-2 border-b-[3px] border-black flex flex-col items-center">
                  <h1 className="font-bold text-xl uppercase tracking-wider">RUKUN TETANGGA (RT) {data.rt} / RUKUN WARGA (RW) {data.rw}</h1>
                  <h2 className="font-bold text-lg uppercase">DESA/KELURAHAN {data.desa}, KECAMATAN {data.kecamatan}</h2>
                  <p className="text-sm uppercase">KABUPATEN/KOTA {data.kabupaten}</p>
              </div>
              
              {/* TITLE */}
              <div className="text-center mb-8">
                  <h1 className="font-bold text-xl uppercase underline">SURAT PENGANTAR RT/RW</h1>
                  <p className="text-sm mt-1">Nomor RT: {data.nomorSuratRt}</p>
                  <p className="text-sm">Nomor RW: {data.nomorSuratRw}</p>
              </div>

              {/* PEMBUKA */}
              <div className="mb-4 text-justify">
                  <p>Yang bertanda tangan di bawah ini Ketua RT {data.rt} / RW {data.rw}, Desa/Kelurahan {data.desa}, Kecamatan {data.kecamatan}, Kabupaten/Kota {data.kabupaten}, menerangkan dengan sebenarnya bahwa:</p>
              </div>

              {/* IDENTITAS */}
              <div className="flex flex-row mb-6 text-justify break-inside-avoid px-2 md:px-8">
                  <div className="flex-1">
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.nama}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.ttl}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Jenis Kelamin</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.jenisKelamin}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Agama</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.agama}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.pekerjaan}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Status Perkawinan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.statusPerkawinan}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">NIK</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.nik}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">No. KK</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.noKk}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0">Kewarganegaraan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.kewarganegaraan}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-48 shrink-0 align-top">Alamat</div>
                          <div className="w-4 shrink-0 align-top">:</div>
                          <div className="align-top">{data.alamat}</div>
                      </div>
                  </div>
              </div>

              {/* KEPERLUAN */}
              <div className="mb-4 text-justify">
                  <p>Orang tersebut di atas adalah benar-benar warga kami dan bertempat tinggal di alamat tersebut. Surat pengantar ini diberikan kepadanya untuk keperluan:</p>
              </div>
              <div className="text-center font-bold text-lg mb-4 uppercase border border-black py-3 mx-2 md:mx-8">
                  {data.keperluan}
              </div>

              {/* PENUTUP */}
              <div className="mb-12 text-justify">
                  <p>{data.keterangan}</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-between text-center mt-12 break-inside-avoid pb-12 px-2 md:px-8">
                  <div>
                      <p className="mb-24">Mengetahui,<br/>Ketua RW {data.rw}</p>
                      <p className="font-bold underline uppercase">{data.namaKetuaRw}</p>
                  </div>
                  <div>
                      <p className="mb-1">{data.desa}, {formatDateSafe(data.tanggalSurat)}</p>
                      <p className="mb-24">Ketua RT {data.rt}</p>
                      <p className="font-bold underline uppercase">{data.namaKetuaRt}</p>
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
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* TOP NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Pengantar RT/RW</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile View Toggle */}
            <button onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')} className="md:hidden bg-slate-800 px-3 py-2 rounded text-xs font-bold uppercase">
              {mobileView === 'editor' ? 'Lihat Surat' : 'Edit Surat'}
            </button>
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 border-r ${activeTab === 'pemohon' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Warga</button>
              <button onClick={() => setActiveTab('pejabat')} className={`flex-1 py-3 ${activeTab === 'pejabat' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>RT/RW</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat RT</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSuratRt} onChange={e => handleDataChange('nomorSuratRt', e.target.value)} placeholder="01/RT..." />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat RW</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSuratRw} onChange={e => handleDataChange('nomorSuratRw', e.target.value)} placeholder="01/RW..." />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.keperluan} onChange={e => handleDataChange('keperluan', e.target.value)}>
                      <option value="Pembuatan KTP">Pembuatan KTP</option>
                      <option value="Pembuatan Kartu Keluarga (KK)">Pembuatan Kartu Keluarga (KK)</option>
                      <option value="Pembuatan SKCK">Pembuatan SKCK</option>
                      <option value="Surat Pengantar Nikah">Surat Pengantar Nikah</option>
                      <option value="Pengajuan Bantuan Sosial">Pengajuan Bantuan Sosial</option>
                      <option value="Keterangan Domisili Usaha">Keterangan Domisili Usaha</option>
                      <option value="Keterangan Tidak Mampu">Keterangan Tidak Mampu</option>
                      <option value="Lainnya">Lainnya...</option>
                  </select>
                </div>
                {data.keperluan === 'Lainnya' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tuliskan Keperluan Lainnya</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" onChange={e => handleDataChange('keperluan', e.target.value)} placeholder="Tuliskan keperluan..." />
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Keterangan Tambahan / Penutup</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.keterangan} onChange={e => handleDataChange('keterangan', e.target.value)} placeholder="Keterangan tambahan jika ada" />
                </div>
              </div>
              )}

              {activeTab === 'pemohon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Data Warga (Pemohon)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nama} onChange={e => handleDataChange('nama', e.target.value)} placeholder="Nama Lengkap" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. KK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.noKk} onChange={e => handleDataChange('noKk', e.target.value)} placeholder="16 Digit No KK" maxLength={16} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ttl} onChange={e => handleDataChange('ttl', e.target.value)} placeholder="Contoh: Jakarta, 01 Januari 1990" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.jenisKelamin} onChange={e => handleDataChange('jenisKelamin', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.agama} onChange={e => handleDataChange('agama', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaan} onChange={e => handleDataChange('pekerjaan', e.target.value)} placeholder="Pekerjaan" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status Perkawinan</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.statusPerkawinan} onChange={e => handleDataChange('statusPerkawinan', e.target.value)}>
                        <option value="Belum Kawin">Belum Kawin</option>
                        <option value="Kawin">Kawin</option>
                        <option value="Cerai Hidup">Cerai Hidup</option>
                        <option value="Cerai Mati">Cerai Mati</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kewarganegaraan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kewarganegaraan} onChange={e => handleDataChange('kewarganegaraan', e.target.value)} placeholder="WNI/WNA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamat} onChange={e => handleDataChange('alamat', e.target.value)} placeholder="Alamat lengkap" />
                </div>
              </div>
              )}

              {activeTab === 'pejabat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Wilayah & Pejabat</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">RT</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="Contoh: 01" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">RW</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="Contoh: 03" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Desa/Kelurahan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.desa} onChange={e => handleDataChange('desa', e.target.value)} placeholder="Nama Desa/Kelurahan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} placeholder="Nama Kecamatan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} placeholder="Nama Kabupaten/Kota" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Tanda Tangan</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Nama Ketua RT</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.namaKetuaRt} onChange={e => handleDataChange('namaKetuaRt', e.target.value)} placeholder="Nama Ketua RT" />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase">Nama Ketua RW</label>
                      <input className="w-full p-2 border rounded-md text-xs mt-1" value={data.namaKetuaRw} onChange={e => handleDataChange('namaKetuaRw', e.target.value)} placeholder="Nama Ketua RW" />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW SURAT */}
        <div className={`flex-1 bg-slate-400/20 overflow-y-auto w-full absolute md:relative inset-0 transition-transform duration-300 md:translate-x-0 ${mobileView === 'preview' ? 'translate-x-0 z-20' : 'translate-x-full z-0'}`}>
           <div className="min-h-full p-4 md:p-8 flex items-start justify-center" id="print-only-root">
               <DocumentContent />
           </div>
        </div>

      </main>
    </div>
  );
}