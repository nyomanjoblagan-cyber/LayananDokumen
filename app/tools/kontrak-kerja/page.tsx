'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Briefcase, User, 
  Scale, Plus, Trash2, DollarSign, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function ContractPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Legal Editor...</div>}>
      <ContractToolBuilder />
    </Suspense>
  );
}

function ContractToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `PKWT/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: '',
    city: 'Jakarta',
    compName: 'PT. MAJU BERSAMA',
    compAddress: 'Jl. Sudirman Kav. 50, Jakarta Selatan',
    compRep: 'Budi Santoso',
    compRepJob: 'Direktur Utama',
    empName: 'Ahmad Fauzi',
    empKtp: '3171234567890001',
    empAddress: 'Jl. Kebon Jeruk No. 12, Jakarta Barat',
    jobTitle: 'Staff Administrasi',
    startDate: '',
    endDate: '',
    salary: 4500000,
    allowances: [
      { id: 1, name: 'Tunjangan Transport', amount: 'Rp 500.000 / bulan' },
      { id: 2, name: 'Uang Makan', amount: 'Rp 25.000 / hari kehadiran' },
    ],
    duties: '1. Mengelola administrasi harian kantor.\n2. Membuat laporan keuangan sederhana.\n3. Melayani kebutuhan administrasi klien.',
    workHours: 'Senin - Jumat, 08.00 - 17.00 WIB',
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextYear.toISOString().split('T')[0]
    }));
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const addAllowance = () => setData({ ...data, allowances: [...data.allowances, { id: Date.now(), name: '', amount: '' }] });
  
  const removeAllowance = (idx: number) => {
    const newItems = [...data.allowances];
    newItems.splice(idx, 1);
    setData({ ...data, allowances: newItems });
  };
  
  const handleAllowanceChange = (idx: number, field: 'name' | 'amount', val: string) => {
    const newItems = [...data.allowances];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, allowances: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Pasal (2 Halaman)", desc: "Legal formal, indentasi rapi & justify" },
    { id: 2, name: "Format Ringkas (1 Halaman)", desc: "Poin-poin padat untuk UMKM" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;
  const salaryFormatted = data.salary.toLocaleString('id-ID');

  // --- KOMPONEN KERTAS ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* BASIC STYLE */
      bg-white shadow-2xl p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* DIMENSI TAMPILAN */
      w-[210mm] min-h-[297mm]
      
      /* DIMENSI PRINT (RESET) */
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:text-black print:block
      
      ${className}
    `}>
      {children}
    </div>
  );

  // --- SUB-KOMPONEN KONTEN (AGAR KONSISTEN ANTARA PREVIEW & PRINT) ---
  
  const ContentPage1 = () => (
    <div className="flex flex-col justify-between h-full">
        <div>
            {/* KOP */}
            <div className="text-center mb-8">
                {logo && <img src={logo} className="h-16 w-auto mx-auto mb-2" />}
                <h1 className="font-bold text-xl uppercase underline tracking-wide">PERJANJIAN KERJA WAKTU TERTENTU</h1>
                <div className="text-sm font-bold mt-1">Nomor: {data.no}</div>
            </div>

            <p className="mb-6 text-justify">Pada hari ini, tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}</strong>, bertempat di <strong>{data.city}</strong>, telah dibuat dan disepakati perjanjian kerja oleh dan antara:</p>

            {/* PIHAK 1 */}
            <div className="ml-4 mb-6">
                <div className="flex gap-4 mb-1">
                    <div className="w-4 text-center">1.</div>
                    <div className="flex-1">
                        <table className="w-full leading-relaxed">
                            <tbody>
                                <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold align-top">{data.compRep}</td></tr>
                                <tr><td className="align-top">Jabatan</td><td className="align-top">:</td><td className="align-top">{data.compRepJob}</td></tr>
                                <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.compAddress}</td></tr>
                            </tbody>
                        </table>
                        <div className="mt-2 italic text-sm text-justify">Bertindak untuk dan atas nama <strong>{data.compName}</strong>, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</div>
                    </div>
                </div>
            </div>

            {/* PIHAK 2 */}
            <div className="ml-4 mb-8">
                <div className="flex gap-4 mb-1">
                    <div className="w-4 text-center">2.</div>
                    <div className="flex-1">
                        <table className="w-full leading-relaxed">
                            <tbody>
                                <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold align-top">{data.empName}</td></tr>
                                <tr><td className="align-top">No. KTP</td><td className="align-top">:</td><td className="align-top">{data.empKtp}</td></tr>
                                <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.empAddress}</td></tr>
                            </tbody>
                        </table>
                        <div className="mt-2 italic text-sm text-justify">Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</div>
                    </div>
                </div>
            </div>

            <p className="mb-6 text-justify">Para Pihak sepakat untuk mengikatkan diri dalam Perjanjian Kerja Waktu Tertentu (PKWT) dengan ketentuan dan syarat-syarat sebagai berikut:</p>

            <div className="space-y-6">
                {/* Pasal 1 */}
                <div>
                    <div className="text-center font-bold mb-3 uppercase tracking-wide">PASAL 1<br/>POSISI DAN MASA KERJA</div>
                    <div className="px-4 space-y-3 text-justify">
                        <div className="flex gap-3">
                            <span className="shrink-0">1.</span>
                            <span>PIHAK PERTAMA menerima PIHAK KEDUA bekerja dengan jabatan sebagai <strong>{data.jobTitle}</strong>.</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="shrink-0">2.</span>
                            <span>Masa kerja berlaku terhitung mulai tanggal <strong>{isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong> sampai dengan tanggal <strong>{isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong>.</span>
                        </div>
                    </div>
                </div>
                
                {/* Pasal 2 */}
                <div>
                    <div className="text-center font-bold mb-3 uppercase tracking-wide">PASAL 2<br/>TUGAS DAN TANGGUNG JAWAB</div>
                    <div className="px-4 text-justify">
                        PIHAK KEDUA wajib melaksanakan tugas dan tanggung jawab sebagai berikut:
                        <div className="whitespace-pre-line pl-6 mt-2 text-slate-700">{data.duties}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-right text-[10px] text-slate-400 italic mt-8">Halaman 1 dari 2</div>
    </div>
  );

  const ContentPage2 = () => (
    <div className="flex flex-col justify-between h-full pt-4">
        <div className="space-y-8">
            {/* Pasal 3 */}
            <div>
                <div className="text-center font-bold mb-3 uppercase tracking-wide">PASAL 3<br/>UPAH DAN JAM KERJA</div>
                <div className="px-4 space-y-3 text-justify">
                    <div className="flex gap-3">
                        <span className="shrink-0">1.</span>
                        <span>PIHAK KEDUA berhak menerima gaji pokok sebesar <strong>Rp {salaryFormatted}</strong> per bulan.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="shrink-0">2.</span>
                        <div className="flex-1">
                            Selain gaji pokok, PIHAK KEDUA berhak mendapatkan tunjangan sebagai berikut:
                            <ul className="list-[lower-alpha] ml-5 mt-1 space-y-1">
                                {data.allowances.map((a, idx) => (
                                    <li key={idx} className="pl-1"><strong>{a.name}</strong> sebesar {a.amount}.</li>
                                ))}
                                {data.allowances.length === 0 && <li>Tidak ada tunjangan tambahan.</li>}
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className="shrink-0">3.</span>
                        <span>Jam kerja ditetapkan sebagai berikut: {data.workHours}.</span>
                    </div>
                </div>
            </div>

            {/* Pasal 4 */}
            <div>
                <div className="text-center font-bold mb-3 uppercase tracking-wide">PASAL 4<br/>LAIN-LAIN</div>
                <div className="px-4 space-y-3 text-justify">
                    <div className="flex gap-3">
                        <span className="shrink-0">1.</span>
                        <span>Hal-hal yang belum diatur dalam perjanjian ini akan diputuskan kemudian oleh Para Pihak secara musyawarah untuk mufakat.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="shrink-0">2.</span>
                        <span>Perjanjian ini dapat dibatalkan sewaktu-waktu jika salah satu pihak melanggar ketentuan yang telah disepakati.</span>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <p className="mt-12 mb-12 text-justify">Demikian Surat Perjanjian Kerja ini dibuat dalam rangkap 2 (dua) bermaterai cukup dan masing-masing memiliki kekuatan hukum yang sama.</p>

            {/* TTD */}
            <div className="flex justify-between text-center mt-8 mb-20">
                <div className="w-1/2 px-4">
                    <p className="mb-24 font-bold">PIHAK PERTAMA</p>
                    <p className="font-bold underline uppercase tracking-wide">{data.compRep}</p>
                    <p className="text-sm">{data.compRepJob}</p>
                </div>
                <div className="w-1/2 px-4">
                    <p className="mb-24 font-bold">PIHAK KEDUA</p>
                    <p className="font-bold underline uppercase tracking-wide">{data.empName}</p>
                    <p className="text-sm">Karyawan</p>
                </div>
            </div>
            
            <div className="text-right text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
        </div>
    </div>
  );

  const ContentSimple = () => (
    <div className="font-sans text-sm text-justify h-full flex flex-col">
        <div className="text-center border-b-2 border-slate-800 pb-4 mb-8">
            <h1 className="font-black text-2xl uppercase tracking-wide">SURAT KONTRAK KERJA</h1>
            <div className="text-slate-500 font-bold">{data.compName}</div>
        </div>

        <div className="mb-6 leading-loose">
            <p>Yang bertanda tangan di bawah ini:</p>
            <div className="grid grid-cols-[100px_10px_1fr] gap-1 mt-2 pl-4">
                <div className="font-bold">Nama</div><div>:</div><div>{data.compRep} ({data.compRepJob})</div>
                <div className="font-bold">Alamat</div><div>:</div><div>{data.compAddress}</div>
            </div>
            <p className="mt-1 text-xs italic text-slate-500">Selanjutnya disebut <strong>PEMBERI KERJA</strong>.</p>
        </div>

        <div className="mb-6 leading-loose">
            <p>Dengan ini memberikan pekerjaan kepada:</p>
            <div className="grid grid-cols-[100px_10px_1fr] gap-1 mt-2 pl-4">
                <div className="font-bold">Nama</div><div>:</div><div className="font-bold uppercase">{data.empName}</div>
                <div className="font-bold">No. KTP</div><div>:</div><div>{data.empKtp}</div>
                <div className="font-bold">Alamat</div><div>:</div><div>{data.empAddress}</div>
            </div>
            <p className="mt-1 text-xs italic text-slate-500">Selanjutnya disebut <strong>PEKERJA</strong>.</p>
        </div>

        <div className="bg-slate-50 p-6 border border-slate-200 rounded mb-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 uppercase text-xs tracking-wider">Rincian Kesepakatan</h3>
            <div className="grid grid-cols-[120px_10px_1fr] gap-3 leading-relaxed">
                <div>Jabatan</div><div>:</div><div className="font-bold">{data.jobTitle}</div>
                <div>Masa Kontrak</div><div>:</div><div>{isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle:'medium'}) : '...'} s/d {isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle:'medium'}) : '...'}</div>
                <div>Gaji Pokok</div><div>:</div><div className="font-bold text-emerald-700">Rp {salaryFormatted} / bulan</div>
                
                <div className="font-bold text-slate-600">Tunjangan</div><div>:</div>
                <div>
                    {data.allowances.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1">
                        {data.allowances.map((a, idx) => (
                            <li key={idx}>{a.name} ({a.amount})</li>
                        ))}
                        </ul>
                    ) : <span>-</span>}
                </div>

                <div>Jam Kerja</div><div>:</div><div>{data.workHours}</div>
            </div>
        </div>

        <div className="mb-8">
            <h3 className="font-bold mb-2">Tugas & Tanggung Jawab:</h3>
            <div className="whitespace-pre-line pl-4 border-l-2 border-slate-300 text-slate-600 leading-relaxed">
                {data.duties}
            </div>
        </div>

        <div className="text-center text-xs text-slate-500 mb-8 mt-auto">
            Surat ini dibuat dan ditandatangani di {data.city} pada tanggal {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'full'}) : '...'} secara sadar dan tanpa paksaan.
        </div>

        <div className="flex justify-between text-center mb-8">
            <div className="w-1/2">
                <div className="mb-20 font-bold">PEMBERI KERJA</div>
                <div className="border-t border-slate-300 w-2/3 mx-auto pt-1 font-bold">{data.compRep}</div>
            </div>
            <div className="w-1/2">
                <div className="mb-20 font-bold">PEKERJA</div>
                <div className="border-t border-slate-300 w-2/3 mx-auto pt-1 font-bold">{data.empName}</div>
            </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white; }
          ::-webkit-scrollbar { display: none !important; }
          header, nav, .no-print { display: none !important; }
          
          /* KUNCI: Class ini memaksa pemotongan halaman */
          .page-break { page-break-after: always; }
          
          #print-only-root { 
             display: block !important; 
             width: 100%; height: auto; 
             position: absolute; top: 0; left: 0; z-index: 9999; background: white; 
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} className="text-blue-500" /> <span>CONTRACT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
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
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              {/* Pihak 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Briefcase size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Pihak 1 (Pengusaha)</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                          {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                       </div>
                       <div className="flex-1">
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                          <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo Kop</button>
                          {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.compAddress} onChange={e => setData({...data, compAddress: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perwakilan</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.compRep} onChange={e => setData({...data, compRep: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.compRepJob} onChange={e => setData({...data, compRepJob: e.target.value})} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Pihak 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <User size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Pihak 2 (Karyawan)</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.empName} onChange={e => setData({...data, empName: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">No. KTP / NIK</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.empKtp} onChange={e => setData({...data, empKtp: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat KTP</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.empAddress} onChange={e => setData({...data, empAddress: e.target.value})} />
                    </div>
                 </div>
              </div>

              {/* Detail & Kompensasi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Scale size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Detail & Kompensasi</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.jobTitle} onChange={e => setData({...data, jobTitle: e.target.value})} />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Mulai</label>
                          <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Selesai</label>
                          <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} />
                       </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                       <label className="text-[10px] font-bold text-emerald-700 uppercase flex items-center gap-1"><DollarSign size={10}/> Gaji Pokok (Rp)</label>
                       <input type="number" className="w-full p-2 border border-slate-300 rounded text-sm font-bold text-emerald-600" value={data.salary} onChange={e => setData({...data, salary: Number(e.target.value)})} />
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tunjangan & Fasilitas</label>
                          <button onClick={addAllowance} className="text-[9px] bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 flex items-center gap-1 font-bold"><Plus size={10}/> Tambah</button>
                       </div>
                       {data.allowances.map((item, idx) => (
                          <div key={item.id} className="flex gap-2 items-start group">
                             <div className="flex-1">
                                <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Nama (ex: Uang Makan)" value={item.name} onChange={e => handleAllowanceChange(idx, 'name', e.target.value)} />
                             </div>
                             <div className="flex-1">
                                <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs" placeholder="Nominal" value={item.amount} onChange={e => handleAllowanceChange(idx, 'amount', e.target.value)} />
                             </div>
                             <button onClick={() => removeAllowance(idx)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                          </div>
                       ))}
                    </div>

                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Jam Kerja</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.workHours} onChange={e => setData({...data, workHours: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi Tugas</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.duties} onChange={e => setData({...data, duties: e.target.value})} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal TTD</label>
                          <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar preview-container">
               
               {/* LOGIKA SKALA */}
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 
                 {/* PREVIEW TEMPLATE 1: FORMAL (2 HALAMAN) */}
                 {templateId === 1 && (
                   <>
                     <Kertas>
                        <ContentPage1 />
                     </Kertas>
                     <div className="h-10"></div>
                     <Kertas>
                        <ContentPage2 />
                     </Kertas>
                   </>
                 )}

                 {/* PREVIEW TEMPLATE 2: RINGKAS (1 HALAMAN) */}
                 {templateId === 2 && (
                   <Kertas>
                      <ContentSimple />
                   </Kertas>
                 )}
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA (VISIBLE ONLY WHEN PRINTING) */}
      <div id="print-only-root" className="hidden">
         {templateId === 1 && (
            <div>
               <Kertas className="page-break"><ContentPage1 /></Kertas>
               <Kertas><ContentPage2 /></Kertas>
            </div>
         )}
         {templateId === 2 && (
            <Kertas><ContentSimple /></Kertas>
         )}
      </div>

    </div>
  );
}