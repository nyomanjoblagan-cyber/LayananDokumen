'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  PartyPopper, Music, Trophy, User, CalendarDays,
  Edit3, Eye, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perizinan...</div>}>
      <CrowdPermitBuilder />
    </Suspense>
  );
}

function CrowdPermitBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Depok',
    date: '', 
    
    // TUJUAN SURAT
    policeStation: 'KAPOLSEK CILODONG',
    policeAddress: 'Jl. Raya Jakarta-Bogor No. KM 39',
    
    // DATA PEMOHON
    name: 'BUDI SANTOSO',
    umur: '45',
    job: 'Wiraswasta',
    address: 'Jl. H. Dimun Raya RT 01/04, Cilodong',
    phone: '0812-3456-7890',
    nik: '3276010101800001',

    // DATA ACARA
    eventName: 'RESEPSI PERNIKAHAN (PUTRI KAMI)',
    eventDate: '',
    eventTime: '08.00 s/d 17.00 WIB',
    eventPlace: 'Halaman Rumah (Alamat sda)',
    eventEnt: 'Musik Organ Tunggal & Sound System',
    audience: '+/- 200 Tamu Undangan',
    
    // KATA PENUTUP
    closing: 'Besar harapan kami agar Bapak dapat memberikan izin keramaian demi kelancaran acara tersebut. Kami siap menjaga ketertiban dan keamanan selama acara berlangsung.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    
    setData(prev => ({ 
        ...prev, 
        date: today,
        eventDate: nextMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const applyPreset = (type: 'wedding' | 'concert' | 'sport') => {
    if (type === 'wedding') {
        setData(prev => ({
            ...prev,
            eventName: 'RESEPSI PERNIKAHAN',
            eventEnt: 'Organ Tunggal / Akustik',
            audience: '+/- 300 Tamu Undangan',
            closing: 'Kami selaku tuan rumah menjamin kegiatan akan berjalan tertib dan mematuhi batas waktu yang ditentukan.'
        }));
    } else if (type === 'concert') {
        setData(prev => ({
            ...prev,
            policeStation: 'KAPOLRES METRO DEPOK',
            eventName: 'PENTAS SENI PEMUDA',
            eventEnt: 'Band Lokal & Guest Star',
            audience: '+/- 1000 Penonton',
            closing: 'Panitia telah berkoordinasi dengan keamanan lingkungan dan siap mematuhi protokol kepolisian.'
        }));
    } else if (type === 'sport') {
        setData(prev => ({
            ...prev,
            eventName: 'TURNAMEN FUTSAL ANTAR RW',
            eventEnt: 'Pertandingan Olahraga',
            audience: 'Peserta & Suporter Warga',
            eventPlace: 'Lapangan Futsal RW 04',
            closing: 'Kami menjamin sportivitas dan keamanan selama pertandingan berlangsung.'
        }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Permohonan (Polisi)", desc: "Format standar ke Polsek/Polres" },
    { id: 2, name: "Izin Lingkungan (Warga)", desc: "Formulir tanda tangan tetangga" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none px-[20mm] py-[15mm] font-serif text-slate-900 leading-snug text-[11pt]" 
         style={{ width: '210mm', minHeight: '296mm' }}>
        
        {templateId === 1 ? (
            // TEMPLATE 1: SURAT KE POLISI (DIPADATKAN)
            <>
                <div className="text-right mb-4">
                    {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}
                </div>

                <div className="mb-4">
                    <div className="flex">
                        <div className="w-[80px]">Perihal</div>
                        <div className="font-bold underline">: Permohonan Izin Keramaian</div>
                    </div>
                    <div className="flex">
                        <div className="w-[80px]">Lampiran</div>
                        <div>: 1 (Satu) Berkas</div>
                    </div>
                </div>

                <div className="mb-6">
                    <p>Kepada Yth,</p>
                    <p className="font-bold uppercase">{data.policeStation}</p>
                    <p>Di -</p>
                    <p className="pl-4 underline">Tempat</p>
                </div>

                <div className="flex-grow">
                    <p className="mb-2">Dengan hormat,</p>
                    <p className="mb-2 text-justify">Yang bertanda tangan di bawah ini:</p>
                    
                    <div className="ml-6 mb-4 text-[11pt]">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                                <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.nik}</td></tr>
                                <tr><td className="align-top">Umur</td><td className="align-top">:</td><td className="align-top">{data.umur} Tahun</td></tr>
                                <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.job}</td></tr>
                                <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                                <tr><td className="align-top">No. HP</td><td className="align-top">:</td><td className="align-top">{data.phone}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mb-2 text-justify">
                        Dengan ini mengajukan permohonan <strong>IZIN KERAMAIAN</strong> untuk menyelenggarakan kegiatan dengan rincian sebagai berikut:
                    </p>

                    <div className="ml-6 mb-4 text-[11pt]">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 align-top">Nama Acara</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.eventName}</td></tr>
                                <tr><td className="align-top">Hari / Tanggal</td><td className="align-top">:</td><td className="align-top">{isClient && data.eventDate ? new Date(data.eventDate).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '...'}</td></tr>
                                <tr><td className="align-top">Waktu</td><td className="align-top">:</td><td className="align-top">{data.eventTime}</td></tr>
                                <tr><td className="align-top">Tempat</td><td className="align-top">:</td><td className="align-top">{data.eventPlace}</td></tr>
                                <tr><td className="align-top">Hiburan</td><td className="align-top">:</td><td className="align-top">{data.eventEnt}</td></tr>
                                <tr><td className="align-top">Jml. Undangan</td><td className="align-top">:</td><td className="align-top">{data.audience}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mb-4 text-justify indent-8">{data.closing}</p>
                    <p className="mb-4 text-justify indent-8">Demikian surat permohonan ini kami sampaikan. Atas perhatian dan izin yang diberikan, kami ucapkan terima kasih.</p>
                </div>

                <div className="flex justify-end text-center mt-auto mb-10" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-64">
                        <p className="mb-20 font-bold">Pemohon / Penanggung Jawab,</p>
                        <p className="font-bold underline uppercase">{data.name}</p>
                    </div>
                </div>
            </>
        ) : (
            // TEMPLATE 2: IZIN LINGKUNGAN (DIPADATKAN)
            <>
                <div className="text-center mb-6 border-b-2 border-black pb-2">
                    <h2 className="text-xl font-bold uppercase underline tracking-widest">SURAT IZIN LINGKUNGAN</h2>
                </div>

                <p className="mb-4 text-justify">
                    Kami yang bertanda tangan di bawah ini, warga tetangga (lingkungan) di sekitar lokasi kegiatan, menyatakan dengan sesungguhnya bahwa kami <strong>TIDAK KEBERATAN</strong> dengan diadakannya kegiatan:
                </p>

                <div className="bg-slate-50 border border-slate-300 p-3 mb-4 text-sm rounded">
                    <table className="w-full leading-snug">
                        <tbody>
                            <tr><td className="w-32 py-0.5 font-bold">Acara</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.eventName}</td></tr>
                            <tr><td className="py-0.5 font-bold">Hari/Tanggal</td><td className="py-0.5">:</td><td className="py-0.5">{isClient && data.eventDate ? new Date(data.eventDate).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '...'}</td></tr>
                            <tr><td className="py-0.5 font-bold">Hiburan</td><td className="py-0.5">:</td><td className="py-0.5">{data.eventEnt}</td></tr>
                            <tr><td className="py-0.5 font-bold">Tuan Rumah</td><td className="py-0.5">:</td><td className="py-0.5 uppercase">{data.name}</td></tr>
                        </tbody>
                    </table>
                </div>

                <p className="mb-4 text-justify text-sm">
                    Demikian surat pernyataan ini kami tanda tangani dengan sukarela tanpa paksaan, untuk digunakan sebagai persyaratan pengurusan Izin Keramaian.
                </p>

                <div className="mb-6 flex-grow">
                    <table className="w-full border-collapse border border-black text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-black py-1 w-10">No</th>
                                <th className="border border-black py-1">Nama Tetangga</th>
                                <th className="border border-black py-1 w-32">Tanda Tangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <tr key={num} className="h-8">
                                    <td className="border border-black text-center">{num}.</td>
                                    <td className="border border-black px-2"></td>
                                    <td className="border border-black px-2 text-[9px] text-slate-300 align-bottom">{num}...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between text-center mt-auto text-sm" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-48">
                        <p className="mb-16">Mengetahui,<br/>Ketua RT .....</p>
                        <p className="border-b border-black inline-block w-full"></p>
                    </div>
                    <div className="w-48">
                        <p className="mb-16">Mengetahui,<br/>Ketua RW .....</p>
                        <p className="border-b border-black inline-block w-full"></p>
                    </div>
                </div>
            </>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} /> <span>CROWD PERMIT BUILDER</span>
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
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* Quick Preset */}
               <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <PartyPopper size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Preset)</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyPreset('wedding')} className="bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                       <PartyPopper size={14}/> Hajatan
                    </button>
                    <button onClick={() => applyPreset('concert')} className="bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                       <Music size={14}/> Konser
                    </button>
                    <button onClick={() => applyPreset('sport')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                       <Trophy size={14}/> Lomba
                    </button>
                 </div>
               </div>

               {/* Form Data Pemohon */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><User size={14}/> Data Pemohon</h3>
                  <div className="space-y-2">
                     <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                     <div className="grid grid-cols-2 gap-2">
                        <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                        <input className="w-full p-2 border rounded text-xs" placeholder="Umur" value={data.umur} onChange={e => handleDataChange('umur', e.target.value)} />
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                        <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                        <input className="w-full p-2 border rounded text-xs" placeholder="No HP" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                     </div>
                     <textarea className="w-full p-2 border rounded text-xs h-16" placeholder="Alamat" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                  </div>
               </div>

               {/* Form Detail Acara */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><CalendarDays size={14}/> Detail Acara</h3>
                  <div className="space-y-2">
                     <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Acara" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
                     <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                        <input className="w-full p-2 border rounded text-xs" placeholder="Waktu (Jam)" value={data.eventTime} onChange={e => handleDataChange('eventTime', e.target.value)} />
                     </div>
                     <input className="w-full p-2 border rounded text-xs" placeholder="Lokasi Acara" value={data.eventPlace} onChange={e => handleDataChange('eventPlace', e.target.value)} />
                     <input className="w-full p-2 border rounded text-xs" placeholder="Hiburan (Jika ada)" value={data.eventEnt} onChange={e => handleDataChange('eventEnt', e.target.value)} />
                     <input className="w-full p-2 border rounded text-xs" placeholder="Jumlah Undangan" value={data.audience} onChange={e => handleDataChange('audience', e.target.value)} />
                  </div>
               </div>

               {/* Form Tujuan & Penutup (Hanya di Template 1) */}
               {templateId === 1 && (
                   <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                      <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-purple-600 tracking-widest"><ShieldAlert size={14}/> Tujuan Surat</h3>
                      <div className="space-y-2">
                         <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Tujuan (Kapolsek/Kapolres)" value={data.policeStation} onChange={e => handleDataChange('policeStation', e.target.value)} />
                         <input className="w-full p-2 border rounded text-xs" placeholder="Alamat Kantor Polisi" value={data.policeAddress} onChange={e => handleDataChange('policeAddress', e.target.value)} />
                         <div className="grid grid-cols-2 gap-2 pt-2">
                            <input className="w-full p-2 border rounded text-xs" placeholder="Kota Surat" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                            <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                         </div>
                         <textarea className="w-full p-2 border rounded text-xs h-24" placeholder="Kalimat Penutup" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
                      </div>
                   </div>
               )}
               <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
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
         <div style={{ width: '210mm', minHeight: 'auto' }} className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}