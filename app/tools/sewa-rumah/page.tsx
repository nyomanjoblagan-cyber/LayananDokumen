'use client';

/**
 * FILE: SewaPropertiPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Perjanjian Sewa Properti (Rumah/Ruko/Kost)
 * FEATURES:
 * - Dual Template (Legal Formal 2 Pages vs Compact 1 Page)
 * - Quick Presets (Rumah, Ruko, Kost)
 * - Auto Date & Currency Formatter
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout with Pagination
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Home, Store, Hotel, 
  BadgeDollarSign, Users, Key, ChevronDown, Check, Edit3, Eye, RotateCcw, MapPin
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  
  // PIHAK PERTAMA (PEMILIK)
  ownerName: string;
  ownerNik: string;
  ownerPhone: string;
  ownerAddress: string;
  
  // PIHAK KEDUA (PENYEWA)
  tenantName: string;
  tenantNik: string;
  tenantPhone: string;
  tenantAddress: string;
  
  // PROPERTI
  type: string;
  addressProp: string;
  facilities: string;
  purpose: string;
  
  // KETENTUAN
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
  priceText: string;
  deposit: number;
  
  // SAKSI
  witness: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'SURABAYA',
  date: '', // Diisi useEffect
  
  ownerName: 'H. ABDUL ROFIQ',
  ownerNik: '3578010101700001',
  ownerPhone: '0811-2222-3333',
  ownerAddress: 'Jl. Darmo Permai No. 10, Surabaya',
  
  tenantName: 'BUDI SANTOSO',
  tenantNik: '3578010101850005',
  tenantPhone: '0812-3456-7890',
  tenantAddress: 'Jl. Ahmad Yani No. 5, Sidoarjo',
  
  type: 'RUMAH TINGGAL',
  addressProp: 'Perumahan Graha Famili Blok B-10, Surabaya',
  facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit, Pompa Air, Gordyn',
  purpose: 'Tempat Tinggal Keluarga',
  
  duration: '2 (Dua) Tahun',
  startDate: '2026-03-01',
  endDate: '2028-03-01',
  
  price: 75000000,
  priceText: 'Tujuh Puluh Lima Juta Rupiah',
  deposit: 5000000,
  
  witness: 'Ketua RT Setempat'
};

// --- 3. KOMPONEN UTAMA ---
export default function SewaPropertiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem Properti...</div>}>
      <RentalAgreementBuilder />
    </Suspense>
  );
}

function RentalAgreementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- PRESETS LOGIC ---
  const applyPreset = (type: 'rumah' | 'ruko' | 'kost') => {
    if (type === 'rumah') {
      setData(prev => ({ 
        ...prev, 
        type: 'Rumah Tinggal', 
        purpose: 'Tempat Tinggal Keluarga', 
        duration: '1 (Satu) Tahun',
        price: 35000000,
        priceText: 'Tiga Puluh Lima Juta Rupiah'
      }));
      setTemplateId(1);
    } else if (type === 'ruko') {
      setData(prev => ({ 
        ...prev, 
        type: 'Ruko 2 Lantai', 
        purpose: 'Kantor / Tempat Usaha', 
        duration: '2 (Dua) Tahun',
        price: 80000000,
        priceText: 'Delapan Puluh Juta Rupiah'
      }));
      setTemplateId(1);
    } else if (type === 'kost') {
      setData(prev => ({ 
        ...prev, 
        type: 'Kamar Kost No. 05', 
        purpose: 'Hunian Mahasiswa', 
        duration: '6 (Enam) Bulan',
        price: 9000000,
        priceText: 'Sembilan Juta Rupiah'
      }));
      setTemplateId(2);
    }
  };

  // --- TEMPLATE MENU ---
  const TEMPLATES = [
    { id: 1, name: "Legal Formal", desc: "Pasal lengkap (2 Halaman)" },
    { id: 2, name: "Ringkas / Kost", desc: "Simple & Padat (1 Halaman)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN HALAMAN ---
  // Membungkus setiap halaman agar sesuai A4 saat diprint
  const SinglePage = ({ children, pageNum, totalPages }: { children: React.ReactNode, pageNum?: number, totalPages?: number }) => (
    <div className="bg-white block box-border text-slate-900 leading-normal p-[18mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-[296mm] print:w-[210mm] print:p-[20mm] relative print:break-after-page mb-8 print:mb-0 last:mb-0">
      {children}
      {pageNum && (
        <div className="absolute bottom-8 right-10 text-[8pt] text-slate-400 italic print:text-black">
          Halaman {pageNum} dari {totalPages}
        </div>
      )}
    </div>
  );

  // --- ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className={`flex flex-col items-center ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
      
      {templateId === 1 ? (
        <>
          {/* HALAMAN 1 */}
          <SinglePage pageNum={1} totalPages={2}>
            <div className="text-center mb-8 border-b-4 border-double border-black pb-2 shrink-0">
              <h1 className="text-xl font-black uppercase underline tracking-widest leading-tight">SURAT PERJANJIAN SEWA MENYEWA</h1>
            </div>
            
            <div className="space-y-4 text-justify text-[10.5pt]">
              <p>Pada hari ini, tanggal {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'}) : ''}, kami yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-4">
                <div className="flex gap-4">
                  <span className="font-bold">1.</span>
                  <div>
                    <p className="font-bold uppercase underline leading-tight">{data.ownerName}</p>
                    <p>NIK: {data.ownerNik} | Alamat: {data.ownerAddress}</p>
                    <p className="italic text-[10pt] mt-1">Selanjutnya disebut sebagai <b>PIHAK PERTAMA</b> (Pemilik).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold">2.</span>
                  <div>
                    <p className="font-bold uppercase underline leading-tight">{data.tenantName}</p>
                    <p>NIK: {data.tenantNik} | Alamat: {data.tenantAddress}</p>
                    <p className="italic text-[10pt] mt-1">Selanjutnya disebut sebagai <b>PIHAK KEDUA</b> (Penyewa).</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200 print:border-black">
                <p className="text-center font-bold uppercase underline">PASAL 1: OBJEK SEWA</p>
                <p>PIHAK PERTAMA menyewakan properti <b>{data.type}</b> yang terletak di {data.addressProp} dengan fasilitas: {data.facilities}.</p>
                
                <p className="text-center font-bold uppercase underline">PASAL 2: JANGKA WAKTU</p>
                <p>Berlaku selama <b>{data.duration}</b>, mulai {data.startDate} hingga {data.endDate}.</p>
                
                <p className="text-center font-bold uppercase underline">PASAL 3: BIAYA & PEMBAYARAN</p>
                <p>Harga sewa sebesar <b>Rp {data.price.toLocaleString('id-ID')}</b> ({data.priceText}) dibayar lunas di muka.</p>

                <p className="text-center font-bold uppercase underline">PASAL 4: DEPOSIT</p>
                <p>PIHAK KEDUA menyerahkan jaminan (deposit) sebesar Rp {data.deposit.toLocaleString('id-ID')} yang akan dikembalikan di akhir masa sewa.</p>

                <p className="text-center font-bold uppercase underline">PASAL 5: PENGGUNAAN & LARANGAN</p>
                <p>Hanya untuk <b>{data.purpose}</b>. Dilarang menyewakan kembali atau melakukan kegiatan melanggar hukum.</p>
              </div>
            </div>
          </SinglePage>

          {/* HALAMAN 2 */}
          <SinglePage pageNum={2} totalPages={2}>
            <div className="space-y-6 pt-4 text-justify text-[10.5pt] flex-grow">
                <p className="text-center font-bold uppercase underline">PASAL 6: PEMELIHARAAN</p>
                <p>PIHAK KEDUA bertanggung jawab atas pemeliharaan rutin dan dilarang merubah struktur bangunan tanpa izin.</p>

                <p className="text-center font-bold uppercase underline">PASAL 7: UTILITAS</p>
                <p>Biaya Listrik, Air, Keamanan, dan Kebersihan menjadi tanggung jawab sepenuhnya dari PIHAK KEDUA.</p>

                <p className="text-center font-bold uppercase underline">PASAL 8: PENGEMBALIAN</p>
                <p>Saat sewa berakhir, properti dikembalikan dalam kondisi kosong, bersih, dan terawat seperti semula.</p>

                <p className="text-center font-bold uppercase underline">PASAL 9: PENYELESAIAN PERSELISIHAN</p>
                <p>Segala perselisihan akan diselesaikan secara musyawarah mufakat atau melalui prosedur hukum yang berlaku.</p>

                <p className="pt-8">Demikian perjanjian ini dibuat rangkap dua dengan kekuatan hukum yang sama bagi kedua belah pihak.</p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-10 text-center">
                <div className="flex flex-col h-32">
                    <p className="font-bold mb-16 uppercase tracking-widest text-[9pt]">Pihak Kedua (Penyewa)</p>
                    <p className="font-bold underline uppercase">{data.tenantName}</p>
                </div>
                <div className="flex flex-col h-32">
                    <p className="font-bold mb-2 uppercase tracking-widest text-[9pt]">Pihak Pertama (Pemilik)</p>
                    <div className="border border-slate-200 w-24 h-12 mx-auto flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 print:border-black print:text-black uppercase">Materai</div>
                    <p className="font-bold underline uppercase">{data.ownerName}</p>
                </div>
            </div>
            
            <div className="mt-8 text-center pb-12">
                <p className="font-bold text-[8pt] mb-12 uppercase text-slate-400 print:text-black">Saksi-Saksi</p>
                <p className="border-b border-black inline-block px-12">{data.witness}</p>
            </div>
          </SinglePage>
        </>
      ) : (
        /* TEMPLATE 2: RINGKAS (1 HALAMAN) */
        <SinglePage>
            <div className="text-center mb-6 border-b-2 border-black pb-2 shrink-0">
              <h1 className="text-xl font-bold uppercase underline">PERJANJIAN SEWA MENYEWA</h1>
            </div>
            
            <div className="space-y-6 text-sm flex-grow">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl print:bg-transparent print:border print:border-black">
                    <div><p className="text-[8pt] font-bold text-slate-400 uppercase print:text-black">Pemilik</p><p className="font-bold uppercase">{data.ownerName}</p></div>
                    <div><p className="text-[8pt] font-bold text-slate-400 uppercase print:text-black">Penyewa</p><p className="font-bold uppercase">{data.tenantName}</p></div>
                </div>
                
                <div className="space-y-2 border-l-4 border-emerald-500 pl-4 italic print:border-black">
                    <p><b>Unit Properti:</b> {data.type}</p>
                    <p><b>Lokasi:</b> {data.addressProp}</p>
                    <p><b>Durasi:</b> {data.duration} ({data.startDate} s/d {data.endDate})</p>
                    <p><b>Total Biaya:</b> Rp {data.price.toLocaleString('id-ID')}</p>
                </div>

                <div className="text-justify leading-relaxed">
                   <p className="mb-2">Dengan ini disepakati:</p>
                   <ul className="list-decimal ml-5 space-y-1">
                      <li>Penyewa membayar lunas sewa di muka.</li>
                      <li>Penyewa menjaga kebersihan dan tidak merusak fasilitas.</li>
                      <li>Biaya listrik/air ditanggung penyewa selama masa sewa.</li>
                      <li>Uang deposit Rp {data.deposit.toLocaleString('id-ID')} dikembalikan saat checkout.</li>
                   </ul>
                </div>

                <div className="mt-20 flex justify-between px-10 text-center">
                    <div><p className="mb-20 font-bold">PENYEWA</p><p className="font-bold underline uppercase">{data.tenantName}</p></div>
                    <div><p className="mb-20 font-bold">PEMILIK</p><p className="font-bold underline uppercase">{data.ownerName}</p></div>
                </div>
            </div>
        </SinglePage>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body, html { background: white !important; margin: 0 !important; height: auto !important; overflow: visible !important; }
          .no-print { display: none !important; }
          
          /* Force page breaks */
          .print-break-after-page { break-after: page; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Home size={16} /> <span>Property Agreement Builder</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900 font-sans">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Sewa</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Jenis Properti</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyPreset('rumah')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1"><Home size={14} className="text-emerald-600"/><span className="text-[8px] font-bold">RUMAH</span></button>
                    <button onClick={() => applyPreset('ruko')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1"><Store size={14} className="text-blue-600"/><span className="text-[8px] font-bold">RUKO</span></button>
                    <button onClick={() => applyPreset('kost')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1"><Hotel size={14} className="text-amber-600"/><span className="text-[8px] font-bold">KOST</span></button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Key size={12}/> Para Pihak</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.tenantName} onChange={e => handleDataChange('tenantName', e.target.value)} placeholder="Nama Penyewa" />
                 <input className="w-full p-2 border rounded text-xs" value={data.witness} onChange={e => handleDataChange('witness', e.target.value)} placeholder="Saksi (Cth: Ketua RT)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Home size={12}/> Detail Properti</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Jenis Properti" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.addressProp} onChange={e => handleDataChange('addressProp', e.target.value)} placeholder="Alamat Properti" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.facilities} onChange={e => handleDataChange('facilities', e.target.value)} placeholder="Fasilitas" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><BadgeDollarSign size={12}/> Harga & Durasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} placeholder="Harga" type="number" />
                    <input className="w-full p-2 border rounded text-xs" value={data.deposit} onChange={e => handleDataChange('deposit', parseInt(e.target.value))} placeholder="Deposit" type="number" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">MULAI</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">BERAKHIR</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
