'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  PartyPopper, Music, Trophy, Calendar, User, Shield, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Perizinan...</div>}>
      <CrowdPermitBuilder />
    </Suspense>
  );
}

function CrowdPermitBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    policeStation: 'KAPOLSEK CILODONG',
    policeAddress: 'Di Tempat',
    city: 'Depok',
    date: new Date().toISOString().split('T')[0],
    no: '01 / PAN-HUT / VIII / 2026',
    lampiran: '1 (Satu) Berkas',
    perihal: 'Permohonan Izin Keramaian',
    name: 'Budi Santoso',
    umur: '45 Tahun',
    job: 'Wiraswasta',
    address: 'Jl. Raya Bogor KM 35, RT 01 RW 02, Cilodong',
    phone: '0812-3456-7890',
    eventName: 'Panggung Gembira HUT Kemerdekaan RI ke-81',
    eventDate: '2026-08-17',
    eventTime: '08.00 s.d 23.00 WIB',
    eventPlace: 'Lapangan Bola Voli RT 01 RW 02',
    eventEnt: 'Panggung Musik (Organ Tunggal) & Lomba Anak',
    audience: '+/- 200 Orang (Warga Sekitar)',
    closing: 'Besar harapan kami kiranya Bapak dapat memberikan izin pelaksanaan kegiatan tersebut. Kami sanggup menjaga keamanan dan ketertiban selama acara berlangsung.'
  });

  const applyPreset = (type: 'wedding' | 'concert' | 'sport') => {
    if (type === 'wedding') {
      setData(prev => ({
        ...prev,
        policeStation: 'KAPOLSEK ...',
        no: '-', 
        perihal: 'Permohonan Izin Resepsi Pernikahan',
        eventName: 'Resepsi Pernikahan Putri Kami (Siti & Joko)',
        eventEnt: 'Hiburan Musik Islami / Akustik',
        audience: '+/- 500 Tamu Undangan',
        closing: 'Kami selaku tuan rumah menjamin kegiatan akan berjalan tertib dan mematuhi batas waktu yang ditentukan.'
      }));
    } else if (type === 'concert') {
      setData(prev => ({
        ...prev,
        policeStation: 'KAPOLRES ...',
        no: '05/EO-ABC/V/2026',
        perihal: 'Permohonan Izin Konser Musik',
        eventName: 'Festival Musik Indie "Senja Berirama"',
        eventEnt: 'Band Lokal & Guest Star',
        audience: '+/- 1000 Penonton (Tiket)',
        closing: 'Kami telah berkoordinasi dengan tim keamanan internal dan siap mematuhi protokol keamanan kepolisian.'
      }));
    } else if (type === 'sport') {
      setData(prev => ({
        ...prev,
        policeStation: 'KAPOLSEK ...',
        no: '01/KARTAR/VI/2026',
        perihal: 'Permohonan Izin Turnamen',
        eventName: 'Turnamen Futsal Antar RW Cup 2026',
        eventEnt: 'Pertandingan Olahraga',
        audience: 'Peserta & Suporter Warga Lokal',
        closing: 'Kami panitia menjamin sportivitas dan keamanan selama pertandingan berlangsung.'
      }));
    }
  };

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Permohonan (Ke Polisi)", desc: "Surat resmi pengajuan izin keramaian ke Polsek/Polres" },
    { id: 2, name: "Izin Lingkungan (Tetangga)", desc: "Formulir persetujuan warga/tetangga (Lampiran)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS A4 (LAYOUT FIX) ---
  const KertasA4 = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white shadow-xl w-[210mm] min-h-[297mm] p-[25mm] text-[#1e293b] font-serif text-[11pt] leading-relaxed text-justify relative box-border mx-auto mb-10 print:mb-0 print:shadow-none print:w-full print:min-h-0 print:h-auto print:p-[20mm]">
      {children}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#f3f4f6] font-sans text-slate-800 overflow-hidden">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { background: white; margin: 0; padding: 0; }
          /* Sembunyikan semua elemen UI kecuali area print */
          header, nav, aside, .sidebar-ui, .header-ui { display: none !important; }
          /* Pastikan area preview terlihat dan menempati full page */
          .preview-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            background: white;
            overflow: visible;
            display: block !important;
          }
          /* Tabel hitam */
          table, th, td { border-color: #000 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="header-ui bg-slate-900 text-white shadow-md z-50 h-16 shrink-0 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Izin Keramaian</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between"
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span>{activeTemplateName}</span>
              </div>
              <ChevronDown size={12} />
            </button>
            {showTemplateMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                {TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}>
                    <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                    {templateId === t.id && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
            <Printer size={16} /> Cetak
          </button>
        </div>
      </div>

      {/* MAIN CONTENT (FLEX ROW) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR INPUT (SCROLLABLE) */}
        <div className="sidebar-ui w-[400px] bg-white border-r border-slate-200 h-full overflow-y-auto p-6 space-y-6 shrink-0 shadow-lg z-10">
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <PartyPopper size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Jenis Acara</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('wedding')} className="bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1">
                   <PartyPopper size={14}/> Hajatan
                </button>
                <button onClick={() => applyPreset('concert')} className="bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1">
                   <Music size={14}/> Pentas Seni
                </button>
                <button onClick={() => applyPreset('sport')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1">
                   <Trophy size={14}/> Turnamen
                </button>
             </div>
          </div>

          {/* Form Groups */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Data Penanggung Jawab</h3>
             <input type="text" className="w-full p-2 border rounded text-sm" placeholder="Nama Lengkap" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
             <div className="grid grid-cols-2 gap-2">
                <input type="text" className="w-full p-2 border rounded text-xs" placeholder="Umur" value={data.umur} onChange={e => handleDataChange('umur', e.target.value)} />
                <input type="text" className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
             </div>
             <input type="text" className="w-full p-2 border rounded text-xs" placeholder="No HP" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
             <textarea className="w-full p-2 border rounded text-xs h-16" placeholder="Alamat" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
          </div>

          <div className="space-y-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Detail Acara</h3>
             <input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
             <div className="grid grid-cols-2 gap-2">
                <input type="date" className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                <input type="text" className="w-full p-2 border rounded text-xs" value={data.eventTime} onChange={e => handleDataChange('eventTime', e.target.value)} />
             </div>
             <input type="text" className="w-full p-2 border rounded text-xs" value={data.eventPlace} onChange={e => handleDataChange('eventPlace', e.target.value)} />
             <input type="text" className="w-full p-2 border rounded text-xs font-bold text-blue-600" value={data.eventEnt} onChange={e => handleDataChange('eventEnt', e.target.value)} />
             <input type="text" className="w-full p-2 border rounded text-xs" value={data.audience} onChange={e => handleDataChange('audience', e.target.value)} />
          </div>

          {templateId === 1 && (
             <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Tujuan Surat</h3>
                <input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.policeStation} onChange={e => handleDataChange('policeStation', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} />
                   <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
                <textarea className="w-full p-2 border rounded text-xs h-24" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
             </div>
          )}
        </div>

        {/* PREVIEW AREA (SCROLLABLE & CENTERED) */}
        <div className="preview-area flex-1 bg-slate-100 overflow-y-auto p-8 flex justify-center">
          
          <div className="w-[210mm]"> {/* Container Fix Width */}
            
            {/* TEMPLATE 1: SURAT PERMOHONAN */}
            {templateId === 1 && (
              <KertasA4>
                 {/* Header Kanan Atas */}
                 <div className="text-right mb-8">
                    {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                 </div>

                 {/* Header Tujuan (Flex untuk Rapi) */}
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-[55%]">
                       <table className="text-sm w-full leading-snug">
                          <tbody>
                             <tr><td className="w-20 align-top">Nomor</td><td className="w-4 align-top">:</td><td className="align-top">{data.no}</td></tr>
                             <tr><td className="align-top">Lampiran</td><td className="align-top">:</td><td className="align-top">{data.lampiran}</td></tr>
                             <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td className="font-bold underline align-top">{data.perihal}</td></tr>
                          </tbody>
                       </table>
                    </div>
                    <div className="w-[40%] pl-4 text-left">
                       <div>Kepada Yth,</div>
                       <div className="font-bold">{data.policeStation}</div>
                       <div>{data.policeAddress}</div>
                    </div>
                 </div>

                 <p className="mb-4">Dengan hormat,</p>
                 <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
                 
                 <div className="ml-6 mb-6">
                    <table className="w-full leading-snug text-sm">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Nama Lengkap</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.name}</td></tr>
                          <tr><td className="py-0.5">Umur</td><td className="py-0.5">:</td><td className="py-0.5">{data.umur}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.job}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                          <tr><td className="py-0.5">No. HP</td><td className="py-0.5">:</td><td className="py-0.5">{data.phone}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4">
                    Selaku Penanggung Jawab Kegiatan, dengan ini mengajukan permohonan <strong>IZIN KERAMAIAN</strong> untuk menyelenggarakan kegiatan:
                 </p>

                 <div className="ml-6 mb-6">
                    <table className="w-full leading-snug text-sm">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Nama Acara</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.eventName}</td></tr>
                          <tr><td className="py-0.5">Hari / Tanggal</td><td className="py-0.5">:</td><td className="py-0.5">{new Date(data.eventDate).toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'})}</td></tr>
                          <tr><td className="py-0.5">Waktu</td><td className="py-0.5">:</td><td className="py-0.5">{data.eventTime}</td></tr>
                          <tr><td className="py-0.5 align-top">Tempat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.eventPlace}</td></tr>
                          <tr><td className="py-0.5">Hiburan</td><td className="py-0.5">:</td><td className="py-0.5 font-bold">{data.eventEnt}</td></tr>
                          <tr><td className="py-0.5">Undangan</td><td className="py-0.5">:</td><td className="py-0.5">{data.audience}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-6">{data.closing}</p>
                 <p className="mb-10">Demikian surat permohonan ini kami sampaikan. Atas izin dan kerjasamanya kami ucapkan terima kasih.</p>

                 <div className="flex justify-end text-center">
                    <div className="w-64">
                       <p className="mb-24 font-bold">Pemohon / Penanggung Jawab,</p>
                       <p className="font-bold underline uppercase">{data.name}</p>
                    </div>
                 </div>
              </KertasA4>
            )}

            {/* TEMPLATE 2: IZIN LINGKUNGAN */}
            {templateId === 2 && (
              <KertasA4>
                 <div className="text-center mb-8 border-b-2 border-black pb-4">
                    <h2 className="text-xl font-bold uppercase underline">SURAT PERNYATAAN IZIN LINGKUNGAN</h2>
                 </div>

                 <p className="mb-4">Kami yang bertanda tangan di bawah ini, warga RT ..... RW ..... Kelurahan .................... Kecamatan ...................., menyatakan dengan sesungguhnya bahwa kami <strong>TIDAK KEBERATAN</strong> dengan diadakannya kegiatan:</p>
                 
                 <div className="bg-slate-50 print:bg-white border border-slate-200 p-4 mb-6 text-sm">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-32 py-1 font-bold">Acara</td><td className="w-3 py-1">:</td><td className="font-bold py-1 uppercase">{data.eventName}</td></tr>
                          <tr><td className="py-1 font-bold">Hari/Tanggal</td><td className="py-1">:</td><td className="py-1">{new Date(data.eventDate).toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'})}</td></tr>
                          <tr><td className="py-1 font-bold">Hiburan</td><td className="py-1">:</td><td className="py-1">{data.eventEnt}</td></tr>
                          <tr><td className="py-1 font-bold">Tuan Rumah</td><td className="py-1">:</td><td className="py-1">{data.name}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-6">
                    Demikian surat pernyataan ini kami buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun, untuk digunakan sebagai persyaratan pengurusan Izin Keramaian di Kepolisian.
                 </p>

                 <div className="mb-8">
                    <table className="w-full border-collapse border border-black text-sm">
                       <thead>
                          <tr className="bg-slate-100 print:bg-white">
                             <th className="border border-black py-2 w-10">No</th>
                             <th className="border border-black py-2">Nama Tetangga</th>
                             <th className="border border-black py-2 w-32">Tanda Tangan</th>
                          </tr>
                       </thead>
                       <tbody>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                             <tr key={num} className="h-10">
                                <td className="border border-black text-center">{num}.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-xs text-slate-300 align-bottom">{num}...</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 <div className="flex justify-between text-center mt-auto text-sm">
                    <div className="w-40">
                       <p className="mb-20">Mengetahui,<br/>Ketua RT .....</p>
                       <p className="border-b border-black inline-block w-full"></p>
                    </div>
                    <div className="w-40">
                       <p className="mb-20">Mengetahui,<br/>Ketua RW .....</p>
                       <p className="border-b border-black inline-block w-full"></p>
                    </div>
                 </div>
              </KertasA4>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}