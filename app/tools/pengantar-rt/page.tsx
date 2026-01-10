'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, MapPin, 
  User, FileText, Heart, Shield, Truck, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PengantarRTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem RT/RW...</div>}>
      <PengantarToolBuilder />
    </Suspense>
  );
}

function PengantarToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    rt: '005',
    rw: '012',
    village: 'KELURAHAN SUKAMAJU',
    district: 'KECAMATAN CILODONG',
    city: 'DEPOK',
    no: '025 / RT.005 / I / 2026',
    date: '',
    name: 'Budi Santoso',
    nik: '3276010101900001',
    ttl: 'Jakarta, 01 Januari 1990',
    gender: 'Laki-laki',
    religion: 'Islam',
    job: 'Karyawan Swasta',
    status: 'Kawin',
    citizenship: 'WNI',
    address: 'Jl. Melati III No. 45, RT 005 RW 012, Sukamaju',
    purpose: 'Pengurusan Perpanjangan KTP Elektronik dan Pembaruan Kartu Keluarga (KK)',
    remark: '-', 
    nameRT: 'Suparman',
    nameRW: 'H. Junaedi'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const applyPurpose = (type: 'ktp' | 'skck' | 'nikah' | 'pindah') => {
    let text = '';
    if (type === 'ktp') text = 'Permohonan Pembuatan / Perpanjangan KTP Elektronik dan Kartu Keluarga (KK).';
    else if (type === 'skck') text = 'Permohonan Surat Keterangan Catatan Kepolisian (SKCK) untuk melamar pekerjaan.';
    else if (type === 'nikah') text = 'Pengurusan Administrasi Pernikahan (N1, N2, N4) ke Kantor Urusan Agama (KUA).';
    else if (type === 'pindah') text = 'Permohonan Surat Keterangan Pindah Datang / Pindah Keluar Domisili.';
    setData({ ...data, purpose: text });
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Klasik", desc: "Standar umum RT/RW Indonesia" },
    { id: 2, name: "Format Modern", desc: "Layout tabel lebih terstruktur" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0">
        
        {/* HEADER / KOP */}
        <div className="text-center mb-6 shrink-0">
            <h2 className="text-lg font-bold uppercase tracking-wide">PENGURUS RUKUN TETANGGA {data.rt} RUKUN WARGA {data.rw}</h2>
            <h1 className="text-xl font-black uppercase tracking-wider">{data.village}</h1>
            <div className="text-sm uppercase font-sans font-bold">{data.district} - {data.city}</div>
            <div className="border-t-4 border-double border-black mt-4"></div>
        </div>

        {/* JUDUL & NOMOR */}
        <div className="text-center mb-8 shrink-0">
            <h2 className="font-bold text-lg uppercase underline decoration-2 underline-offset-4">SURAT PENGANTAR</h2>
            <div className="text-sm font-bold mt-1 font-sans">Nomor: {data.no}</div>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow overflow-hidden">
            <p className="mb-4">Yang bertanda tangan di bawah ini Ketua RT {data.rt} RW {data.rw} {data.village} {data.district} {data.city}, menerangkan bahwa:</p>
            
            {templateId === 1 ? (
                <div className="ml-6 mb-6">
                    <table className="w-full leading-relaxed">
                        <tbody>
                            <tr><td className="w-40 py-0.5">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase">{data.name}</td></tr>
                            <tr><td className="py-0.5">NIK / KTP</td><td>:</td><td>{data.nik}</td></tr>
                            <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td>:</td><td>{data.ttl}</td></tr>
                            <tr><td className="py-0.5">Jenis Kelamin</td><td>:</td><td>{data.gender}</td></tr>
                            <tr><td className="py-0.5">Agama</td><td>:</td><td>{data.religion}</td></tr>
                            <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                            <tr><td className="py-0.5">Status Perkawinan</td><td>:</td><td>{data.status}</td></tr>
                            <tr><td className="py-0.5">Kewarganegaraan</td><td>:</td><td>{data.citizenship}</td></tr>
                            <tr><td className="py-0.5 align-top">Alamat Domisili</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="border border-black mb-6 font-sans text-[10pt]">
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2">
                        <div className="font-bold border-r border-black">Nama Lengkap</div><div className="pl-3 uppercase font-black">{data.name}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2 bg-slate-50">
                        <div className="font-bold border-r border-black">NIK</div><div className="pl-3 font-mono">{data.nik}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2">
                        <div className="font-bold border-r border-black">Tempat/Tgl Lahir</div><div className="pl-3">{data.ttl}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2 bg-slate-50">
                        <div className="font-bold border-r border-black">Pekerjaan</div><div className="pl-3">{data.job}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] p-2">
                        <div className="font-bold border-r border-black">Alamat</div><div className="pl-3">{data.address}</div>
                    </div>
                </div>
            )}

            <p className="mb-4">Orang tersebut di atas adalah benar-benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk keperluan:</p>

            <div className="ml-6 mb-6 p-4 bg-slate-50 border-l-4 border-slate-300 italic font-bold text-slate-800 print:bg-transparent print:border-black">
                "{data.purpose}"
            </div>

            {data.remark !== '-' && (
                <p className="mb-4 italic text-sm">Keterangan: {data.remark}</p>
            )}

            <p className="mb-8">Demikian surat pengantar ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-between text-center">
                <div className="w-64">
                    <p className="mb-20 font-bold">Mengetahui,<br/>Ketua RW {data.rw}</p>
                    <p className="font-bold underline uppercase tracking-tighter">{data.nameRW}</p>
                </div>
                <div className="w-64">
                    <p className="mb-1 font-sans text-sm">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
                    <p className="mb-20 font-bold">Ketua RT {data.rt}</p>
                    <p className="font-bold underline uppercase tracking-tighter">{data.nameRT}</p>
                </div>
            </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <MapPin size={16} className="text-emerald-500" /> <span>RT/RW LETTER BUILDER</span>
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
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              {/* Quick Generator */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Keperluan</h3>
                 </div>
                 <div className="p-4 grid grid-cols-2 gap-2">
                    <button onClick={() => applyPurpose('ktp')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1"><User size={12}/> KTP / KK</button>
                    <button onClick={() => applyPurpose('skck')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1"><Shield size={12}/> SKCK Polisi</button>
                    <button onClick={() => applyPurpose('nikah')} className="bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1"><Heart size={12}/> Nikah (KUA)</button>
                    <button onClick={() => applyPurpose('pindah')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1"><Truck size={12}/> Pindah</button>
                 </div>
              </div>

              {/* Wilayah */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><MapPin size={12}/> Wilayah</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="RT" />
                    <input className="w-full p-2 border rounded text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="RW" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Kelurahan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan" />
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 </div>
              </div>

              {/* Warga */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Warga</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK / No KTP" />
                 <input className="w-full p-2 border rounded text-xs" value={data.ttl} onChange={e => handleDataChange('ttl', e.target.value)} placeholder="Tempat, Tgl Lahir" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              {/* Administrasi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Detail Surat</h3>
                 <input className="w-full p-2 border rounded text-xs font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan Surat" />
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.nameRT} onChange={e => handleDataChange('nameRT', e.target.value)} placeholder="Ketua RT" />
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.nameRW} onChange={e => handleDataChange('nameRW', e.target.value)} placeholder="Ketua RW" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <DocumentContent />
                 </div>
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