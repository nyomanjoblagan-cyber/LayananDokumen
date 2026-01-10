'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Home, Store, Hotel, 
  BadgeDollarSign, Users, Key, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

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

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Surabaya',
    date: '',
    ownerName: 'H. Abdul Rofiq',
    ownerNik: '3578010101700001',
    ownerPhone: '0811-2222-3333',
    ownerAddress: 'Jl. Darmo Permai No. 10, Surabaya',
    tenantName: 'Budi Santoso',
    tenantNik: '3578010101850005',
    tenantPhone: '0812-3456-7890',
    tenantAddress: 'Jl. Ahmad Yani No. 5, Sidoarjo',
    type: 'Rumah Tinggal',
    addressProp: 'Perumahan Graha Famili Blok B-10, Surabaya',
    facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit, Pompa Air, Gordyn',
    purpose: 'Tempat Tinggal Keluarga',
    duration: '2 (Dua) Tahun',
    startDate: '2026-03-01',
    endDate: '2028-03-01',
    price: 75000000,
    priceText: 'Tujuh Puluh Lima Juta Rupiah',
    deposit: 5000000,
    witness: 'Ketua RT setempat'
  });

  // DEFINISI TEMPLATE (Perbaikan Error: Cannot find name TEMPLATES)
  const TEMPLATES = [
    { id: 1, name: "Legal Formal", desc: "Pasal lengkap (2 Halaman)" },
    { id: 2, name: "Ringkas / Kost", desc: "Simple & Padat (1 Halaman)" }
  ];

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // FUNGSI PRESET (Perbaikan Error: Cannot find name applyPreset)
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

  const SinglePage = ({ children, pageNum, totalPages }: { children: React.ReactNode, pageNum?: number, totalPages?: number }) => (
    <div className="bg-white block box-border text-slate-900 leading-normal p-[18mm] md:p-[22mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-[297mm] print:w-[210mm] print:p-[15mm] relative print:break-after-page mb-10 print:mb-0">
      {children}
      {pageNum && (
        <div className="absolute bottom-8 right-10 text-[8pt] text-slate-400 italic print:text-black">
          Halaman {pageNum} dari {totalPages}
        </div>
      )}
    </div>
  );

  const DocumentContent = () => (
    <div className={`flex flex-col items-center ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
      {templateId === 1 ? (
        <>
          <SinglePage pageNum={1} totalPages={2}>
            <div className="text-center mb-8 border-b-4 border-double border-black pb-2 shrink-0">
              <h1 className="text-xl font-black uppercase underline tracking-widest leading-tight">SURAT PERJANJIAN SEWA MENYEWA</h1>
            </div>
            <div className="space-y-4 text-justify text-[10pt]">
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

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <p className="text-center font-bold uppercase underline">PASAL 1: OBJEK SEWA</p>
                <p>PIHAK PERTAMA menyewakan properti <b>{data.type}</b> yang terletak di {data.addressProp} dengan fasilitas: {data.facilities}.</p>
                
                <p className="text-center font-bold uppercase underline">PASAL 2: JANGKA WAKTU</p>
                <p>Berlaku selama <b>{data.duration}</b>, mulai {data.startDate} hingga {data.endDate}.</p>
                
                <p className="text-center font-bold uppercase underline">PASAL 3: BIAYA & PEMBAYARAN</p>
                <p>Harga sewa sebesar <b>Rp {data.price.toLocaleString()}</b> ({data.priceText}) dibayar lunas di muka.</p>

                <p className="text-center font-bold uppercase underline">PASAL 4: DEPOSIT</p>
                <p>PIHAK KEDUA menyerahkan jaminan (deposit) sebesar Rp {data.deposit.toLocaleString()} yang akan dikembalikan di akhir masa sewa.</p>

                <p className="text-center font-bold uppercase underline">PASAL 5: PENGGUNAAN & LARANGAN</p>
                <p>Hanya untuk <b>{data.purpose}</b>. Dilarang menyewakan kembali atau melakukan kegiatan melanggar hukum.</p>

                <p className="text-center font-bold uppercase underline">PASAL 6: PEMELIHARAAN</p>
                <p>PIHAK KEDUA bertanggung jawab atas pemeliharaan rutin dan dilarang merubah struktur bangunan tanpa izin.</p>
              </div>
            </div>
          </SinglePage>

          <SinglePage pageNum={2} totalPages={2}>
            <div className="space-y-6 pt-4 text-justify flex-grow">
                <p className="text-center font-bold uppercase underline">PASAL 7: UTILITAS</p>
                <p>Biaya Listrik, Air, Keamanan, dan Kebersihan menjadi tanggung jawab sepenuhnya dari PIHAK KEDUA.</p>

                <p className="text-center font-bold uppercase underline">PASAL 8: PENGEMBALIAN</p>
                <p>Saat sewa berakhir, properti dikembalikan dalam kondisi kosong, bersih, dan terawat seperti semula.</p>

                <p className="text-center font-bold uppercase underline">PASAL 9: PENYELESAIAN PERSELISIHAN</p>
                <p>Segala perselisihan akan diselesaikan secara musyawarah mufakat atau melalui prosedur hukum yang berlaku.</p>

                <p className="pt-10">Demikian perjanjian ini dibuat rangkap dua dengan kekuatan hukum yang sama bagi kedua belah pihak.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-10 text-center">
                <div className="flex flex-col h-32">
                    <p className="font-bold mb-16 uppercase tracking-widest text-[9pt]">Pihak Kedua (Penyewa)</p>
                    <p className="font-bold underline uppercase">{data.tenantName}</p>
                </div>
                <div className="flex flex-col h-32">
                    <p className="font-bold mb-2 uppercase tracking-widest text-[9pt]">Pihak Pertama (Pemilik)</p>
                    <div className="border border-slate-200 w-20 h-10 mx-auto flex items-center justify-center text-[6pt] text-slate-300 italic mb-4 print:border-black print:text-black uppercase">Materai</div>
                    <p className="font-bold underline uppercase">{data.ownerName}</p>
                </div>
            </div>
            <div className="mt-10 text-center pb-12">
                <p className="font-bold text-[8pt] mb-12 uppercase text-slate-400 print:text-black">Saksi-Saksi</p>
                <p className="border-b border-black inline-block px-12">{data.witness}</p>
            </div>
          </SinglePage>
        </>
      ) : (
        <SinglePage>
            <div className="text-center mb-6 border-b-2 border-black pb-2 shrink-0">
              <h1 className="text-xl font-bold uppercase underline">PERJANJIAN SEWA MENYEWA</h1>
            </div>
            <div className="space-y-6 text-sm flex-grow">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl print:bg-transparent print:border">
                    <div><p className="text-[8pt] font-bold text-slate-400 uppercase">Pemilik</p><p className="font-bold uppercase">{data.ownerName}</p></div>
                    <div><p className="text-[8pt] font-bold text-slate-400 uppercase">Penyewa</p><p className="font-bold uppercase">{data.tenantName}</p></div>
                </div>
                <div className="space-y-2 border-l-4 border-emerald-500 pl-4 italic">
                    <p><b>Unit Properti:</b> {data.type}</p>
                    <p><b>Lokasi:</b> {data.addressProp}</p>
                    <p><b>Total Biaya:</b> Rp {data.price.toLocaleString()}</p>
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

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <style jsx global>{`
        @media screen { .print-area { display: none; } }
        @media print {
          @page { size: A4; margin: 0; } 
          body, html { background: white !important; margin: 0 !important; height: auto !important; overflow: visible !important; }
          .no-print { display: none !important; }
          .print-area { display: block !important; width: 210mm !important; margin: 0 !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white sticky top-0 z-50 h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="hidden md:block font-bold text-blue-400 uppercase tracking-tighter">Property Rental Builder</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden no-print text-left font-sans">
        <div className={`w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Jenis</h3>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => applyPreset('rumah')} className="bg-white p-2 rounded border text-[8px] font-bold hover:bg-emerald-50">RUMAH</button>
                 <button onClick={() => applyPreset('ruko')} className="bg-white p-2 rounded border text-[8px] font-bold hover:bg-blue-50">RUKO</button>
                 <button onClick={() => applyPreset('kost')} className="bg-white p-2 rounded border text-[8px] font-bold hover:bg-amber-50">KOST</button>
              </div>
           </div>
           
           <div className="space-y-4">
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.tenantName} onChange={e => handleDataChange('tenantName', e.target.value)} placeholder="Nama Penyewa" />
              <textarea className="w-full p-2 border rounded text-xs h-16" value={data.addressProp} onChange={e => handleDataChange('addressProp', e.target.value)} placeholder="Lokasi Objek" />
              <input type="number" className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value) || 0)} />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        <div className={`flex-1 bg-slate-200/50 relative h-full ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto p-4 md:p-12 flex flex-col items-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div className="print-area">
         <DocumentContent />
      </div>
    </div>
  );
}