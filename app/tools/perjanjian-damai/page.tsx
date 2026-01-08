'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  HeartHandshake, ShieldAlert, Users, Scale, CalendarDays, FileText, User
} from 'lucide-react';
import Link from 'next/link';

export default function PerjanjianDamaiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Legal Editor...</div>}>
      <DamaiBuilder />
    </Suspense>
  );
}

function DamaiBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta',

    // PIHAK 1
    p1Name: 'BUDI SANTOSO', p1Age: '45', p1Job: 'Wiraswasta', p1Nik: '3171010101780001', 
    p1Address: 'Jl. Merdeka No. 10, RT 01/02, Tebet, Jakarta Selatan',
    
    // PIHAK 2
    p2Name: 'ANDI WIJAYA', p2Age: '32', p2Job: 'Karyawan Swasta', p2Nik: '3171020202920005',
    p2Address: 'Jl. Sudirman No. 45, Kuningan, Jakarta Selatan',
    
    // KRONOLOGI
    incidentTitle: 'Kecelakaan Lalu Lintas',
    incidentDate: '2026-01-05',
    incidentDetail: 'Kecelakaan lalu lintas ringan di area Parkir Mal Senayan yang mengakibatkan kerusakan pada bemper depan mobil Pihak Kedua serta lecet pada pintu samping mobil Pihak Pertama.',
    
    // KESEPAKATAN
    compensation: 'Rp 2.500.000,-',
    compensationText: 'Dua Juta Lima Ratus Ribu Rupiah',
    settlementDetail: 'Pihak Pertama memberikan biaya ganti rugi secara tunai dan menanggung seluruh biaya perbaikan kendaraan Pihak Kedua di bengkel resmi.',
    
    // SAKSI
    witness1: 'Hendra Saputra (Ketua RT)', 
    witness2: 'Siti Aminah (Saksi Mata)',

    additionalClause: 'Kedua belah pihak saling memaafkan dan tidak akan melakukan tuntutan hukum di kemudian hari.' 
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Legal Formal (2 Halaman)", desc: "Pasal lengkap, layout lega" },
    { id: 2, name: "Compact Rapi (1 Halaman)", desc: "Layout tabel presisi" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] h-[296mm] 
      bg-white shadow-2xl print:shadow-none 
      p-[25mm] mx-auto 
      text-slate-900 font-serif leading-relaxed text-[11pt]
      overflow-hidden relative
      mb-8 print:mb-0 
      ${className}
    `}>
      {children}
    </div>
  );

  // --- ISI DOKUMEN ---
  const DocumentContent = (
    <div id="print-area">
      {/* TEMPLATE 1: FORMAL (2 HALAMAN) */}
      {templateId === 1 && (
        <>
          <Kertas>
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN PERDAMAIAN</h1>
              </div>

              <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

              <div className="ml-4 mb-4 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p1Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</div>
              </div>

              <div className="ml-4 mb-6 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA</strong>.</div>
              </div>

              <p className="mb-4">Kedua Belah Pihak secara sadar mengakui telah terjadi peristiwa <strong>{data.incidentTitle}</strong> pada tanggal {new Date(data.incidentDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})} dengan rincian:</p>
              <div className="bg-slate-50 p-4 border rounded italic text-sm mb-6">
                "{data.incidentDetail}"
              </div>

              <p className="mb-4">Bahwa atas peristiwa tersebut, Kedua Belah Pihak telah sepakat untuk berdamai dengan ketentuan sebagai berikut:</p>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>KESEPAKATAN GANTI RUGI</div>
                <p className="text-sm text-justify">PIHAK PERTAMA bersedia memberikan ganti rugi/kompensasi kepada PIHAK KEDUA sebesar <strong>{data.compensation}</strong> ({data.compensationText}) sebagai bentuk pertanggungjawaban atas kerugian yang dialami. {data.settlementDetail}</p>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </Kertas>

          <Kertas>
              <div className="space-y-6 text-justify pt-4">
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>PENGHENTIAN TUNTUTAN</div>
                    <p className="text-sm">Dengan ditandatanganinya surat ini, maka PIHAK KEDUA menyatakan bahwa permasalahan ini telah <strong>SELESAI</strong>. PIHAK KEDUA tidak akan melakukan tuntutan hukum apapun di kemudian hari, baik secara Perdata maupun Pidana.</p>
                </div>
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>KEKELUARGAAN</div>
                    <p className="text-sm">Kedua Belah Pihak sepakat untuk saling memaafkan dan menjalin hubungan baik di masa depan, serta tidak akan saling mengungkit kembali permasalahan ini.</p>
                </div>

                {data.additionalClause && (
                  <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>LAIN-LAIN</div>
                    <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                  </div>
                )}
              </div>

              <p className="mt-8 mb-8 text-sm">Demikian surat perjanjian perdamaian ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, tanpa ada paksaan dari pihak manapun.</p>

              <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                <div>
                    <p className="mb-20 font-bold uppercase">Pihak Kedua</p>
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
                </div>
                <div>
                    <p className="mb-4 font-bold uppercase">Pihak Pertama</p>
                    <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI 10.000</div>
                    <p className="font-bold underline uppercase">{data.p1Name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 text-center text-sm">
                <div><p className="mb-16 font-bold text-xs">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
                <div><p className="mb-16 font-bold text-xs">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </Kertas>
        </>
      )}

      {/* TEMPLATE 2: COMPACT (1 HALAMAN) */}
      {templateId === 2 && (
        <Kertas>
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline">SURAT PERNYATAAN DAMAI</h1>
            </div>
            <p className="mb-4 text-justify text-sm">Pada hari ini {data.day}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}, bertempat di {data.city}, kami yang bertanda tangan di bawah ini sepakat berdamai atas peristiwa <strong>{data.incidentTitle}</strong>:</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-[10px]">
              <div className="border p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b">Pihak I</div>
                Nama: {data.p1Name}<br/>NIK: {data.p1Nik}<br/>Alamat: {data.p1Address}
              </div>
              <div className="border p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b">Pihak II</div>
                Nama: {data.p2Name}<br/>NIK: {data.p2Nik}<br/>Alamat: {data.p2Address}
              </div>
            </div>

            <div className="mb-4 border border-black p-4 text-xs italic bg-slate-50">
              " {data.incidentDetail} "
            </div>

            <div className="mb-6 text-sm text-justify space-y-2">
              <p>Pihak I memberikan ganti rugi sebesar <strong>{data.compensation}</strong>. Dengan ini permasalahan dinyatakan selesai secara kekeluargaan.</p>
              <p>Kedua Pihak tidak akan melakukan tuntutan hukum di kemudian hari. {data.additionalClause}</p>
            </div>

            <div className="flex justify-between text-center mt-auto mb-12 text-sm">
              <div className="w-40">
                  <p className="mb-20 font-bold uppercase">Pihak II</p>
                  <p className="font-bold underline uppercase">{data.p2Name}</p>
              </div>
              <div className="w-40">
                  <p className="mb-4 font-bold uppercase">Pihak I</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300">MATERAI</div>
                  <p className="font-bold underline uppercase">{data.p1Name}</p>
              </div>
            </div>

            <div className="text-center text-xs">
              <p className="mb-10 font-bold underline uppercase">Saksi-Saksi</p>
              <div className="flex justify-center gap-12">
                  <div>( {data.witness1} )</div>
                  <div>( {data.witness2} )</div>
              </div>
            </div>
        </Kertas>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg print:hidden sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Perjanjian Perdamaian</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : ''}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg">
              <Printer size={16} /> Print PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
           
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
              <div className="flex items-center gap-2 border-b pb-2"><CalendarDays size={14}/><h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3></div>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari" />
                <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                <div className="col-span-2"><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14}/><h3 className="text-xs font-bold uppercase">Para Pihak</h3></div>
              <div className="space-y-4">
                <div className="p-2 border-l-4 border-emerald-500 bg-emerald-50/50 space-y-2">
                  <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pihak I" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                  <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                </div>
                <div className="p-2 border-l-4 border-blue-500 bg-blue-50/50 space-y-2">
                  <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pihak II" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                  <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><ShieldAlert size={14}/><h3 className="text-xs font-bold uppercase">Kejadian & Ganti Rugi</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Judul Masalah" value={data.incidentTitle} onChange={e => handleDataChange('incidentTitle', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-24" placeholder="Detail Kronologi" value={data.incidentDetail} onChange={e => handleDataChange('incidentDetail', e.target.value)} />
              <div className="pt-2 border-t space-y-2">
                <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nominal Ganti Rugi" value={data.compensation} onChange={e => handleDataChange('compensation', e.target.value)} />
                <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Terbilang" value={data.compensationText} onChange={e => handleDataChange('compensationText', e.target.value)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Users size={14}/><h3 className="text-xs font-bold uppercase">Saksi-Saksi</h3></div>
              <input className="w-full p-2 border rounded text-xs" placeholder="Saksi I" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="Saksi II" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Pasal Tambahan</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-24" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Contoh: Kedua pihak saling memaafkan..." />
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20 overflow-y-auto h-full bg-slate-300/30 rounded-xl p-8">
             <div className="origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform">
                {DocumentContent}
             </div>
        </div>

      </div>

      {/* PRINT AREA */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
          {DocumentContent}
      </div>

    </div>
  );
}