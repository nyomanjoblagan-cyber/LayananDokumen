'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, ShieldCheck, Scale, CalendarDays, FileText, User, Box, 
  Edit3, Eye, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function GadaiAsetPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Gadai Editor...</div>}>
      <GadaiBuilder />
    </Suspense>
  );
}

function GadaiBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); // Logic Mobile Tab
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    day: 'Senin',
    date: '', // Hydration fix
    city: 'Jakarta',

    // PIHAK 1 (PENERIMA GADAI)
    p1Name: 'BUDI SANTOSO', p1Nik: '3171010101780001', 
    p1Address: 'Jl. Merdeka No. 10, Jakarta Selatan',
    
    // PIHAK 2 (PEMBERI GADAI)
    p2Name: 'ANDI WIJAYA', p2Nik: '3171020202920005',
    p2Address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    
    // DETAIL ASET GADAI
    assetName: '1 (satu) unit Sepeda Motor Honda Vario 150',
    assetDetail: 'Tahun 2022, Warna Hitam, No. Polisi B 1234 ABC, No. Rangka: MH123..., No. Mesin: JFG123... dilengkapi dengan STNK dan BPKB asli.',
    
    // PINJAMAN & JANGKA WAKTU
    loanAmount: 10000000,
    loanAmountText: 'Sepuluh Juta Rupiah',
    dueDate: '', // Hydration fix
    interest: '0% (Tanpa Bunga)',
    
    // SAKSI
    witness1: 'Hendra Saputra', 
    witness2: 'Siti Aminah',

    additionalClause: 'Apabila sampai jatuh tempo Pihak Kedua tidak melunasi hutangnya, maka Pihak Pertama berhak menjual aset tersebut untuk pelunasan.' 
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        dueDate: nextYear.toISOString().split('T')[0] 
    }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (2 Halaman)", desc: "Pasal lengkap & detail" },
    { id: 2, name: "Ringkas (1 Halaman)", desc: "Layout tabel simpel" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className="w-full h-full text-slate-900">
      
      {templateId === 1 && (
        <>
          {/* HALAMAN 1 (PADDING DITAMBAHKAN MANUAL DI SINI) */}
          <div className="font-serif text-[11pt] leading-relaxed p-[25mm] print:p-[25mm]">
            <div className="text-center mb-8 pb-4 border-b-2 border-black">
              <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN GADAI ASET</h1>
            </div>

            <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>, kami yang bertanda tangan di bawah ini:</p>

            <div className="ml-4 mb-4 space-y-4">
              <div className="text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA (PENERIMA GADAI)</strong>.</div>
              </div>

              <div className="text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA (PEMBERI GADAI)</strong>.</div>
              </div>
            </div>

            <p className="mb-4 text-justify">Kedua belah pihak telah bersepakat untuk mengadakan perjanjian gadai dengan ketentuan sebagai berikut:</p>

            <div className="mb-6">
              <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>NILAI PINJAMAN</div>
              <p className="text-sm text-justify">PIHAK KEDUA telah meminjam uang kepada PIHAK PERTAMA sebesar <strong>{formatRupiah(data.loanAmount)}</strong> ({data.loanAmountText}) yang telah diterima secara tunai/transfer pada saat penandatanganan surat ini.</p>
            </div>

            <div className="mb-4">
              <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>OBJEK GADAI</div>
              <p className="text-sm">Sebagai jaminan atas pinjaman tersebut, PIHAK KEDUA menyerahkan aset kepada PIHAK PERTAMA berupa:</p>
              <div className="ml-4 mt-2 p-3 bg-slate-50 border rounded text-sm italic">
                <strong>{data.assetName}</strong><br/>
                {data.assetDetail}
              </div>
            </div>
            
            <div className="mt-20 text-center text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </div>

          {/* HALAMAN 2 (Menggunakan page-break-before) */}
          <div className="font-serif text-[11pt] leading-relaxed p-[25mm] pt-[15mm] print:p-[25mm] print:pt-[15mm]" style={{ pageBreakBefore: 'always' }}>
            <div className="space-y-6 text-justify">
              <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>JANGKA WAKTU & PENGEMBALIAN</div>
                  <p className="text-sm">PIHAK KEDUA berjanji akan melunasi pinjaman tersebut paling lambat pada tanggal <strong>{isClient && data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>. Apabila pinjaman telah lunas, PIHAK PERTAMA wajib mengembalikan aset gadai dalam kondisi baik.</p>
              </div>
              <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>KONSEKUENSI WANPRESTASI</div>
                  <p className="text-sm">Apabila sampai batas waktu yang ditentukan PIHAK KEDUA belum melunasi hutangnya, maka PIHAK PERTAMA berhak untuk mengambil tindakan hukum atau menjual aset jaminan tersebut untuk menutupi hutang PIHAK KEDUA.</p>
              </div>

              {data.additionalClause && (
                <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 5<br/>LAIN-LAIN</div>
                  <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                </div>
              )}
            </div>

            <p className="mt-8 mb-8 text-sm text-justify text-slate-600 italic">Demikian perjanjian ini dibuat rangkap 2 (dua) di atas kertas bermaterai cukup dan mempunyai kekuatan hukum yang sama.</p>

            <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
              <div className="break-inside-avoid">
                  <p className="mb-20 font-bold uppercase underline">Pihak Kedua</p>
                  <p className="font-bold uppercase leading-none">{data.p2Name}</p>
              </div>
              <div className="break-inside-avoid">
                  <p className="mb-4 font-bold uppercase underline">Pihak Pertama</p>
                  <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI 10.000</div>
                  <p className="font-bold uppercase leading-none">{data.p1Name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 text-center text-sm">
              <div className="break-inside-avoid"><p className="mb-16 font-bold text-xs">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
              <div className="break-inside-avoid"><p className="mb-16 font-bold text-xs">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
            </div>

            <div className="mt-auto text-center text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </div>
        </>
      )}
      
      {templateId === 2 && (
        /* TEMPLATE 2: RINGKAS */
        <div className="font-serif text-[11pt] p-[25mm] print:p-[25mm]">
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline tracking-tighter">SURAT BUKTI GADAI</h1>
            </div>
            <p className="mb-4 text-justify text-sm italic">Kami yang bertanda tangan di bawah ini sepakat melakukan serah terima aset gadai sebagai jaminan hutang:</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-[10px] font-sans">
              <div className="border p-2 rounded break-inside-avoid">
                <div className="font-bold uppercase mb-1 border-b">Penerima Gadai (Pihak I)</div>
                Nama: {data.p1Name}<br/>Alamat: {data.p1Address}
              </div>
              <div className="border p-2 rounded break-inside-avoid">
                <div className="font-bold uppercase mb-1 border-b">Pemberi Gadai (Pihak II)</div>
                Nama: {data.p2Name}<br/>Alamat: {data.p2Address}
              </div>
            </div>

            <div className="mb-4 border border-black p-4 text-sm bg-slate-50 break-inside-avoid">
              <div className="font-bold border-b mb-2">OBJEK JAMINAN:</div>
              {data.assetName}<br/>
              <span className="text-xs text-slate-600">{data.assetDetail}</span>
            </div>

            <div className="mb-6 text-sm space-y-2">
              <p>1. Pihak II meminjam sebesar <strong>{formatRupiah(data.loanAmount)}</strong>.</p>
              <p>2. Jatuh tempo pelunasan pada: <strong>{isClient && data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}</strong>.</p>
              <p>3. Jika tidak lunas, aset menjadi milik Pihak I atau dijual.</p>
            </div>

            <div className="flex justify-between text-center mt-20 mb-12 text-sm">
              <div className="w-40 break-inside-avoid">
                  <p className="mb-20 font-bold uppercase underline">Pihak II</p>
                  <p className="font-bold uppercase">{data.p2Name}</p>
              </div>
              <div className="w-40 break-inside-avoid">
                  <p className="mb-4 font-bold uppercase underline">Pihak I</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300">MATERAI</div>
                  <p className="font-bold uppercase">{data.p1Name}</p>
              </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      <style jsx global>{`
        @media print {
          /* HILANGKAN HEADER/FOOTER BROWSER DENGAN MARGIN 0 */
          @page { size: A4; margin: 0; } 
          
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* KONTROL HALAMAN */
          .break-inside-avoid { page-break-inside: avoid !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white;
          }
          
          /* Reset container untuk print */
          #print-only-root > div {
             width: 100% !important;
             min-height: auto !important; 
             margin: 0 !important;
             padding: 0 !important; /* Padding dihandle oleh class print:p-[25mm] */
             box-shadow: none !important;
             border: none !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} /> <span>GADAI ASET EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600"/>}
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

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><CalendarDays size={14}/><h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3></div>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari" />
                <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                <div className="col-span-2"><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14}/><h3 className="text-xs font-bold uppercase">Pihak Terlibat</h3></div>
              <div className="space-y-4">
                <div className="p-2 border-l-4 border-emerald-500 bg-emerald-50/50 space-y-2">
                  <label className="text-[9px] font-bold text-emerald-700">Pihak I (Penerima Gadai)</label>
                  <input className="w-full p-2 border rounded text-xs" placeholder="Nama Pihak I" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                </div>
                <div className="p-2 border-l-4 border-blue-500 bg-blue-50/50 space-y-2">
                  <label className="text-[9px] font-bold text-blue-700">Pihak II (Pemberi Gadai)</label>
                  <input className="w-full p-2 border rounded text-xs" placeholder="Nama Pihak II" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Box size={14}/><h3 className="text-xs font-bold uppercase">Aset Jaminan</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Barang (Misal: Motor Vario)" value={data.assetName} onChange={e => handleDataChange('assetName', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-20" placeholder="Detail (Warna, No Polisi, No Rangka, dll)" value={data.assetDetail} onChange={e => handleDataChange('assetDetail', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14}/><h3 className="text-xs font-bold uppercase">Pinjaman & Tempo</h3></div>
              <div className="space-y-3">
                <input type="number" className="w-full p-2 border rounded text-xs font-bold" value={data.loanAmount} onChange={e => handleDataChange('loanAmount', parseInt(e.target.value))} />
                <input className="w-full p-2 border rounded text-xs" placeholder="Terbilang Rupiah" value={data.loanAmountText} onChange={e => handleDataChange('loanAmountText', e.target.value)} />
                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                      <label className="text-[9px] font-bold uppercase text-slate-400">Jatuh Tempo</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[9px] font-bold uppercase text-slate-400">Bunga / Biaya</label>
                      <input className="w-full p-2 border rounded text-xs" value={data.interest} onChange={e => handleDataChange('interest', e.target.value)} />
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Pasal Tambahan</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-24" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Contoh: Jika tidak lunas aset dijual..." />
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <DocumentContent />
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}