'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface LossReportData {
  city: string;
  date: string;

  // Pelapor
  name: string;
  pob: string;
  dob: string;
  nik: string;
  job: string;
  address: string;
  phone: string;

  // Barang Hilang
  itemName: string;
  itemSerialNo: string;
  itemFeatures: string;

  // Waktu & Lokasi
  lossDate: string;
  lossTime: string;
  lossLocation: string;
  lossChronology: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LossReportData = {
  city: 'Sleman',
  date: '2026-07-11',
  name: 'BAMBANG SUDARSO',
  pob: 'Sleman',
  dob: '1980-05-12',
  nik: '3404010101800001',
  job: 'Karyawan Swasta',
  address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',
  phone: '081234567890',
  itemName: 'Buku Tabungan BCA',
  itemSerialNo: '846392019',
  itemFeatures: 'Buku tabungan berwarna biru, atas nama Bambang Sudarso',
  lossDate: '2026-07-10',
  lossTime: '14:30',
  lossLocation: 'Jalan Raya Tajem, Maguwoharjo, Sleman',
  lossChronology: 'Tas selempang yang berisi buku tabungan dan dokumen lainnya terjatuh saat mengendarai sepeda motor.',
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanKehilanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <LossReportBuilder />
    </Suspense>
  );
}

function LossReportBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LossReportData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pelapor' | 'barang' | 'kejadian'>('pelapor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof LossReportData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
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
          <Kertas className="print:w-full print:min-w-0">
              {/* HEADER */}
              <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-xl uppercase tracking-wider">SURAT PERNYATAAN KEHILANGAN</h1>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini:
                  </p>
              </div>

              {/* IDENTITAS PELAPOR */}
              <div className="flex flex-col mb-6 pl-4 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.name}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.pob}, {formatDateSafe(data.dob)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nik}</div>
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
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nomor Telepon/HP</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.phone}</div>
                  </div>
              </div>

              <div className="mb-4 text-justify">
                  <p>Dengan ini menyatakan dengan sesungguhnya bahwa saya telah kehilangan barang/dokumen berharga dengan rincian sebagai berikut:</p>
              </div>

              {/* DETAIL BARANG HILANG */}
              <div className="flex flex-col mb-6 pl-4 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nama Barang/Dokumen</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold">{data.itemName}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Nomor Seri/Rekening</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold">{data.itemSerialNo}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Ciri-ciri Fisik</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.itemFeatures}</div>
                  </div>
              </div>

              <div className="mb-4 text-justify">
                  <p>Barang/dokumen tersebut diperkirakan hilang pada:</p>
              </div>

              {/* WAKTU DAN LOKASI */}
              <div className="flex flex-col mb-6 pl-4 text-justify break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Hari, Tanggal</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{formatDateSafe(data.lossDate)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Perkiraan Waktu</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>Sekitar pukul {data.lossTime}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Lokasi Kehilangan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.lossLocation}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-56 shrink-0">Kronologi Singkat</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.lossChronology}</div>
                  </div>
              </div>

              {/* KLAUSUL SUMPAH & PENUTUP */}
              <div className="mb-6 text-justify">
                  <p className="font-bold italic">
                      "Saya bersumpah bahwa pernyataan ini dibuat dengan sebenar-benarnya. Saya tidak memberikan keterangan palsu. Apabila di kemudian hari terbukti bahwa pernyataan ini tidak benar atau direkayasa, saya bersedia dituntut sesuai dengan hukum dan peraturan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia."
                  </p>
              </div>

              <div className="mb-12 text-justify">
                  <p>Demikian Surat Pernyataan Kehilangan ini saya buat dengan sadar, tanpa ada paksaan dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya sebagai syarat pengurusan ke Kepolisian RI, Bank, maupun instansi terkait lainnya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center mt-12 break-inside-avoid pb-12">
                  <div className="w-64">
                      <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                      <p className="mb-4 font-bold">Yang Menyatakan,</p>
                      <div className="border-2 border-slate-300 border-dashed w-28 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic">METERAI<br/>Rp10.000,-</div>
                      <p className="font-bold underline uppercase">{data.name}</p>
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
          .print\\:w-full { width: 100% !important; }
          .print\\:min-w-0 { min-width: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:m-0 { margin: 0 !important; }
          .print\\:mb-0 { margin-bottom: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:gap-0 { gap: 0 !important; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
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
               <BookOpen size={16} className="text-blue-500" /> <span>Surat Pernyataan Kehilangan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Form Data Kehilangan</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pelapor')} className={`flex-1 py-3 border-r ${activeTab === 'pelapor' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Data Pelapor</button>
              <button onClick={() => setActiveTab('barang')} className={`flex-1 py-3 border-r ${activeTab === 'barang' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Detail Barang</button>
              <button onClick={() => setActiveTab('kejadian')} className={`flex-1 py-3 ${activeTab === 'kejadian' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Waktu & Lokasi</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pelapor' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pelapor</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
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
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.job} onChange={e => handleDataChange('job', e.target.value)} placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Telepon/HP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} placeholder="Contoh: 081234567890" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 border-t pt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal TTD</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'barang' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Barang Hilang</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Barang / Dokumen</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.itemName} onChange={e => handleDataChange('itemName', e.target.value)} placeholder="Contoh: Buku Tabungan BCA / KTP" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Seri / Rekening / NIK</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.itemSerialNo} onChange={e => handleDataChange('itemSerialNo', e.target.value)} placeholder="Nomor yang tertera pada dokumen" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Ciri-Ciri Fisik</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.itemFeatures} onChange={e => handleDataChange('itemFeatures', e.target.value)} placeholder="Sebutkan warna, bentuk, atau ciri khusus lainnya" />
                </div>
              </div>
              )}

              {activeTab === 'kejadian' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Waktu & Lokasi Kehilangan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Perkiraan</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.lossDate} onChange={e => handleDataChange('lossDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu (Jam)</label>
                    <input type="time" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.lossTime} onChange={e => handleDataChange('lossTime', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi Perkiraan Hilang</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.lossLocation} onChange={e => handleDataChange('lossLocation', e.target.value)} placeholder="Contoh: Jl. Sudirman atau Pasar Baru" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kronologi Kejadian Singkat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-32" value={data.lossChronology} onChange={e => handleDataChange('lossChronology', e.target.value)} placeholder="Ceritakan kronologi hilangnya barang..." />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN (KERTAS) */}
        <div className={`flex-1 bg-slate-400/20 overflow-y-auto relative p-4 md:p-8 print:p-0 print:bg-white transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0' : 'translate-x-0'} absolute md:relative w-full h-full print:block print:overflow-visible print:static`}>
           <DocumentContent />
        </div>

        {/* MOBILE TOGGLE (Floating Bottom) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 no-print flex gap-2 bg-slate-900 p-2 rounded-full shadow-2xl border border-slate-700">
           <button 
              onClick={() => setMobileView('editor')} 
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Form
           </button>
           <button 
              onClick={() => setMobileView('preview')} 
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Preview
           </button>
        </div>

      </main>
    </div>
  );
}
