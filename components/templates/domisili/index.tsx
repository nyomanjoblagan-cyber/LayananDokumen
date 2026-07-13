'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, Edit3, ArrowLeftCircle, BookOpen 
} from 'lucide-react';
import Link from 'next/link';

interface DomisiliData {
  jenisDomisili: 'Warga' | 'Perusahaan';
  nomorSurat: string;
  tanggalSurat: string;
  
  // Pemerintah Desa
  kadesName: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  
  // Data Warga / Penanggung Jawab
  namaPemohon: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  agama: string;
  pekerjaan: string;
  alamatPemohon: string;
  
  // Data Perusahaan
  namaPerusahaan: string;
  aktaPendirian: string;
  npwpPerusahaan: string;
  bidangUsaha: string;
  alamatPerusahaan: string;

  // Lainnya
  keperluan: string;
}

const INITIAL_DATA: DomisiliData = {
  jenisDomisili: 'Warga',
  nomorSurat: '470/   /2026',
  tanggalSurat: '2026-07-11',
  kadesName: 'BUDI SANTOSO',
  desa: 'Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
  
  namaPemohon: 'ANDI PRATAMA',
  nik: '3404010101900001',
  tempatLahir: 'Sleman',
  tanggalLahir: '1990-05-15',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  pekerjaan: 'Wiraswasta',
  alamatPemohon: 'Jl. Kaliurang KM 10, RT 01 RW 02, Sardonoharjo, Ngaglik, Sleman',
  
  namaPerusahaan: 'PT MAJU JAYA ABADI',
  aktaPendirian: 'No. 12 Tanggal 5 Mei 2020 Notaris Anita, S.H.',
  npwpPerusahaan: '01.234.567.8-901.000',
  bidangUsaha: 'Perdagangan Umum',
  alamatPerusahaan: 'Jl. Palagan Tentara Pelajar KM 8, Sleman',
  
  keperluan: 'Persyaratan administrasi pembukaan rekening bank'
};

export default function DomisiliPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <DomisiliBuilder />
    </Suspense>
  );
}

function DomisiliBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DomisiliData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'surat' | 'pemohon' | 'perusahaan' | 'lainnya'>('surat');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof DomisiliData, val: any) => {
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
              <div className="text-center border-b-[4px] border-black pb-4 mb-8">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.kabupaten}</h1>
                  <h2 className="font-bold text-xl uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
                  <h3 className="font-bold text-2xl uppercase tracking-widest">DESA {data.desa}</h3>
                  <p className="text-sm mt-1">Alamat: Kantor Kepala Desa {data.desa}, Kec. {data.kecamatan}, Kab. {data.kabupaten}</p>
              </div>
              
              {/* JUDUL SURAT */}
              <div className="text-center mb-10">
                  <h1 className="font-bold text-xl uppercase underline">
                      SURAT KETERANGAN DOMISILI {data.jenisDomisili === 'Perusahaan' ? 'PERUSAHAAN' : 'WARGA'}
                  </h1>
                  <p>Nomor: {data.nomorSurat}</p>
              </div>
              
              {/* ISI SURAT */}
              <div className="mb-6 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini Kepala Desa {data.desa}, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}, menerangkan dengan sebenarnya bahwa:
                  </p>
              </div>

              {/* IDENTITAS */}
              <div className="ml-8 mb-6 break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.namaPemohon}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">NIK</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nik}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.tempatLahir}, {formatDateSafe(data.tanggalLahir)}</div>
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
                      <div className="w-48 shrink-0">Alamat</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.alamatPemohon}</div>
                  </div>
              </div>

              {data.jenisDomisili === 'Perusahaan' && (
                  <>
                      <div className="mb-6 text-justify">
                          <p>Adalah benar Penanggung Jawab / Direktur dari Perusahaan:</p>
                      </div>
                      <div className="ml-8 mb-6 break-inside-avoid">
                          <div className="flex flex-row mb-1">
                              <div className="w-48 shrink-0">Nama Perusahaan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div className="font-bold uppercase">{data.namaPerusahaan}</div>
                          </div>
                          <div className="flex flex-row mb-1">
                              <div className="w-48 shrink-0">Akta Pendirian</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.aktaPendirian}</div>
                          </div>
                          <div className="flex flex-row mb-1">
                              <div className="w-48 shrink-0">NPWP Perusahaan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.npwpPerusahaan}</div>
                          </div>
                          <div className="flex flex-row mb-1">
                              <div className="w-48 shrink-0">Bidang Usaha</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.bidangUsaha}</div>
                          </div>
                          <div className="flex flex-row mb-1">
                              <div className="w-48 shrink-0">Alamat Perusahaan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.alamatPerusahaan}</div>
                          </div>
                      </div>
                      <div className="mb-6 text-justify">
                          <p>Berdasarkan data dan sepengetahuan kami, perusahaan tersebut di atas benar-benar berdomisili / berkedudukan dan melakukan kegiatan usahanya di alamat tersebut.</p>
                      </div>
                  </>
              )}

              {data.jenisDomisili === 'Warga' && (
                  <div className="mb-6 text-justify">
                      <p>Orang tersebut di atas adalah benar-benar warga yang saat ini berdomisili dan bertempat tinggal di wilayah Desa {data.desa}, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}.</p>
                  </div>
              )}

              <div className="mb-6 text-justify">
                  <p>Surat Keterangan Domisili ini dibuat untuk keperluan: <strong>{data.keperluan}</strong>.</p>
              </div>
              
              <div className="mb-12 text-justify">
                  <p>Demikian Surat Keterangan ini dibuat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center mt-12 break-inside-avoid pb-12">
                  <div className="w-64">
                      <p className="mb-1">{data.desa}, {formatDateSafe(data.tanggalSurat)}</p>
                      <p className="mb-20 font-bold uppercase">KEPALA DESA {data.desa}</p>
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Domisili</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      {/* MOBILE TAB NAV UNTUK PREVIEW/EDITOR (opsional, ditaruh di bawah atau sembunyi) */}
      <div className="no-print md:hidden flex border-b bg-white">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-sm font-bold ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Editor</button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-sm font-bold ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>Preview</button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 border-r ${activeTab === 'pemohon' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
              {data.jenisDomisili === 'Perusahaan' && (
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              )}
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 ${activeTab === 'lainnya' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Keperluan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Domisili</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold text-blue-600" 
                    value={data.jenisDomisili} 
                    onChange={e => handleDataChange('jenisDomisili', e.target.value)}
                  >
                      <option value="Warga">Domisili Warga / Pribadi</option>
                      <option value="Perusahaan">Domisili Perusahaan / Usaha</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                </div>
                
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 mt-6">Pemerintah Desa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Kepala Desa</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kadesName} onChange={e => handleDataChange('kadesName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Desa</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.desa} onChange={e => handleDataChange('desa', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'pemohon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">
                  Identitas {data.jenisDomisili === 'Perusahaan' ? 'Direktur / Penanggung Jawab' : 'Pemohon'}
                </h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPemohon} onChange={e => handleDataChange('namaPemohon', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatLahir} onChange={e => handleDataChange('tempatLahir', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalLahir} onChange={e => handleDataChange('tanggalLahir', e.target.value)} />
                  </div>
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
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaan} onChange={e => handleDataChange('pekerjaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPemohon} onChange={e => handleDataChange('alamatPemohon', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'perusahaan' && data.jenisDomisili === 'Perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Data Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama PT / CV / Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Akta Pendirian</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aktaPendirian} onChange={e => handleDataChange('aktaPendirian', e.target.value)} placeholder="Contoh: No. 12 Tanggal 5 Mei 2020 Notaris..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NPWP Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.npwpPerusahaan} onChange={e => handleDataChange('npwpPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bidang Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.bidangUsaha} onChange={e => handleDataChange('bidangUsaha', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPerusahaan} onChange={e => handleDataChange('alamatPerusahaan', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Keperluan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Pembuatan Surat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.keperluan} onChange={e => handleDataChange('keperluan', e.target.value)} placeholder="Contoh: Persyaratan administrasi pembukaan rekening bank" />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 bg-slate-200 overflow-y-auto relative p-4 md:p-8 custom-scrollbar print:block print:overflow-visible print:bg-white print:static">
           <DocumentContent />
        </div>
      </main>
    </div>
  );
}
