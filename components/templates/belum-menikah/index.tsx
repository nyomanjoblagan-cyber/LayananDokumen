'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, RotateCcw, ArrowLeftCircle, BookOpen, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

interface BelumMenikahData {
  date: string;
  city: string;
  
  name: string;
  nik: string;
  pob: string;
  dob: string;
  gender: string;
  religion: string;
  job: string;
  address: string;
  
  purpose: string;
  
  witness1Name: string;
  witness1Nik: string;
  witness2Name: string;
  witness2Nik: string;
}

const INITIAL_DATA: BelumMenikahData = {
  date: '2026-07-10', 
  city: 'Sleman',
  name: 'ANDI PRATAMA',
  nik: '3471010101960002',
  pob: 'Bantul',
  dob: '1996-08-20',
  gender: 'Laki-laki',
  religion: 'Islam',
  job: 'Karyawan Swasta',
  address: 'Jl. Gejayan No. 15, Depok, Sleman, Daerah Istimewa Yogyakarta',
  purpose: 'Persyaratan Pendaftaran CPNS Tahun 2026',
  witness1Name: 'Budi Santoso',
  witness1Nik: '3471010101900001',
  witness2Name: 'Citra Lestari',
  witness2Nik: '3471010101920005',
};

export default function BelumMenikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <BelumMenikahBuilder />
    </Suspense>
  );
}

function BelumMenikahBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<BelumMenikahData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'waktu' | 'pembuat' | 'saksi'>('pembuat');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof BelumMenikahData, val: any) => {
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
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '...' : date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* HEADER */}
              <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-xl uppercase tracking-wider">SURAT PERNYATAAN BELUM MENIKAH</h1>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>Yang bertanda tangan di bawah ini:</p>
              </div>

              {/* IDENTITAS */}
              <div className="ml-8 mb-8 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.name}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nik}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.pob}, {formatDateSafe(data.dob)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Jenis Kelamin</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.gender}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Agama</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.religion}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Pekerjaan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.job}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Alamat Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.address}</div>
                  </div>
              </div>

              {/* PERNYATAAN */}
              <div className="mb-4 text-justify">
                  <p>Dengan ini menyatakan dengan sesungguhnya dan sebenar-benarnya bahwa:</p>
              </div>
              <div className="ml-8 mb-6 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-3">
                      <div className="w-6 shrink-0">1.</div>
                      <div className="flex-1">Saya sampai dengan saat ini <strong>belum pernah melangsungkan pernikahan</strong> dengan siapapun, baik secara hukum agama, hukum negara, maupun hukum adat yang berlaku.</div>
                  </div>
                  <div className="flex flex-row mb-3">
                      <div className="w-6 shrink-0">2.</div>
                      <div className="flex-1">Status saya saat ini adalah <strong>Jejaka/Perawan (Belum Kawin)</strong> dan tidak sedang terikat dalam pertunangan atau pernikahan siri dengan pihak manapun.</div>
                  </div>
                  <div className="flex flex-row mb-3">
                      <div className="w-6 shrink-0">3.</div>
                      <div className="flex-1">Surat pernyataan ini saya buat dan gunakan untuk keperluan: <strong>{data.purpose}</strong>.</div>
                  </div>
              </div>

              {/* SANKSI PIDANA */}
              <div className="mb-10 text-justify break-inside-avoid bg-slate-50 print:bg-transparent p-4 print:p-0 border border-slate-300 print:border-none rounded">
                  <p>
                      <strong>KLAUSUL SANKSI HUKUM:</strong><br/>
                      Apabila di kemudian hari terbukti bahwa pernyataan yang saya berikan ini <strong>tidak benar</strong> atau saya terbukti <strong>telah menikah</strong>, maka saya bersedia dituntut secara hukum sesuai dengan peraturan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia, termasuk namun tidak terbatas pada sanksi pidana atas pemalsuan dokumen dan/atau memberikan keterangan palsu sebagaimana diatur dalam <strong>Pasal 263 dan/atau Pasal 266 Kitab Undang-Undang Hukum Pidana (KUHP)</strong>, serta bersedia menerima segala konsekuensi hukum dan membebaskan instansi terkait dari segala tuntutan hukum.
                  </p>
              </div>

              {/* PENUTUP */}
              <div className="mb-12 text-justify">
                  <p>Demikian Surat Pernyataan ini saya buat dengan sadar, tanpa ada paksaan maupun tekanan dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 mt-12 break-inside-avoid pb-12">
                  <div></div>
                  <div className="text-center">
                      <p className="mb-4">{data.city}, {formatDateSafe(data.date)}</p>
                      <p className="mb-4 font-bold uppercase">YANG MENYATAKAN,</p>
                      <div className="border-2 border-slate-300 border-dashed w-28 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic">METERAI<br/>Rp10.000,-</div>
                      <p className="font-bold underline uppercase">{data.name}</p>
                  </div>
              </div>

              <div className="text-center mt-8 break-inside-avoid font-bold uppercase mb-8">SAKSI-SAKSI</div>
              <div className="grid grid-cols-2 gap-8 text-center break-inside-avoid">
                  <div>
                      <p className="mb-20 font-bold">Saksi 1</p>
                      <p className="font-bold underline uppercase">{data.witness1Name}</p>
                      <p className="text-sm">NIK: {data.witness1Nik}</p>
                  </div>
                  <div>
                      <p className="mb-20 font-bold">Saksi 2</p>
                      <p className="font-bold underline uppercase">{data.witness2Name}</p>
                      <p className="text-sm">NIK: {data.witness2Nik}</p>
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Belum Menikah</span>
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
              <button onClick={() => setActiveTab('pembuat')} className={`flex-1 py-3 border-r ${activeTab === 'pembuat' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pembuat</button>
              <button onClick={() => setActiveTab('waktu')} className={`flex-1 py-3 border-r ${activeTab === 'waktu' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Waktu & Tujuan</button>
              <button onClick={() => setActiveTab('saksi')} className={`flex-1 py-3 ${activeTab === 'saksi' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Saksi</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pembuat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pembuat Pernyataan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pob} onChange={e => handleDataChange('pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.dob} onChange={e => handleDataChange('dob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.gender} onChange={e => handleDataChange('gender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)}>
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
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.job} onChange={e => handleDataChange('job', e.target.value)} placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'waktu' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Waktu & Tujuan Pembuatan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan Pembuatan Surat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Contoh: Persyaratan Pendaftaran CPNS Tahun 2026" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Sleman" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Penandatanganan</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'saksi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Saksi-Saksi</h3>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 mb-4">
                  <h4 className="text-[10px] font-bold text-emerald-700 uppercase mb-3 border-b border-emerald-200 pb-1">Saksi Pertama</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.witness1Name} onChange={e => handleDataChange('witness1Name', e.target.value)} placeholder="Nama Saksi 1" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.witness1Nik} onChange={e => handleDataChange('witness1Nik', e.target.value)} placeholder="16 Digit NIK Saksi 1" maxLength={16} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <h4 className="text-[10px] font-bold text-emerald-700 uppercase mb-3 border-b border-emerald-200 pb-1">Saksi Kedua</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.witness2Name} onChange={e => handleDataChange('witness2Name', e.target.value)} placeholder="Nama Saksi 2" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.witness2Nik} onChange={e => handleDataChange('witness2Nik', e.target.value)} placeholder="16 Digit NIK Saksi 2" maxLength={16} />
                    </div>
                  </div>
                </div>
              </div>
              )}
           </div>

           {/* MOBILE TOGGLE (PREVIEW) */}
           <div className="p-4 border-t bg-white md:hidden">
              <button onClick={() => setMobileView('preview')} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider">
                 <Eye size={16} /> Lihat Dokumen
              </button>
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-400 overflow-y-auto relative transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:block' : 'translate-x-0 w-full absolute z-20 h-full'} print:block print:overflow-visible print:bg-white print:static`}>
           <div className="md:hidden sticky top-0 z-50 bg-slate-800 text-white p-3 flex items-center gap-3 shadow-lg">
              <button onClick={() => setMobileView('editor')} className="p-2 bg-slate-700 rounded-lg"><ArrowLeft size={16}/></button>
              <div className="font-bold text-xs uppercase tracking-wider">Kembali ke Editor</div>
           </div>
           
           <div className="p-4 md:p-8 flex justify-center min-h-full">
              <DocumentContent />
           </div>
        </div>

      </main>
    </div>
  );
}