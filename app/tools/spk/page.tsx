'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, 
  LayoutTemplate, ShieldCheck, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function SPKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor SPK...</div>}>
      <SPKBuilder />
    </Suspense>
  );
}

function SPKBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const [data, setData] = useState({
    compName: 'PT. TEKNOLOGI CIPTA MANDIRI',
    compAddress: 'Jl. Merdeka No. 123, Jakarta Selatan\nTelp: (021) 888-9999 | Email: office@tcm.co.id',
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    no: '001/SPK/I/2026',
    clientName: 'Bapak Ahmad Subarjo',
    clientAddress: 'Perumahan Indah Permai Bekasi',
    projectName: 'Pembuatan Website E-Commerce',
    contractValue: '15.000.000',
    duration: '30 Hari Kalender',
    scope: '1. Desain UI/UX\n2. Pengembangan System\n3. Hosting & Domain',
    paymentTerms: 'DP 30%, Pelunasan 70% setelah selesai.',
    signerName: 'Bambang Hartanto',
    signerJob: 'Direktur Utama',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const TEMPLATES = [
    { id: 1, name: "Format Klasik", desc: "Kop tengah, garis tebal, font serif." },
    { id: 2, name: "Modern Minimalis", desc: "Rata kiri, bersih, tanpa garis kop." }
  ];

  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] mx-auto box-border mb-10 relative print:shadow-none print:m-0 print:p-[15mm] print:static">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white sticky top-0 z-50 h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all">
              <ArrowLeft size={18} /> <span className="text-sm font-medium text-nowrap">Beranda</span>
            </Link>
            <div className="h-6 w-px bg-slate-700"></div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-emerald-400 text-nowrap">Editor SPK</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="hidden md:flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                <LayoutTemplate size={14} /> <span>{TEMPLATES.find(t => t.id === templateId)?.name}</span>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b last:border-0">
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase flex items-center gap-2 transition-all shadow-lg">
              <Printer size={16} /> <span className="hidden sm:inline">Cetak SPK</span><span className="sm:hidden text-nowrap">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[450px] overflow-y-auto space-y-6 pb-10">
          {/* Kop Surat */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
             <div className="flex items-center gap-4 border-b pb-4">
                <div className="w-14 h-14 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-400" onClick={() => fileInputRef.current?.click()}>
                   {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <div><h4 className="text-xs font-bold">Identitas Perusahaan</h4><p className="text-[10px] text-slate-400 tracking-tight">Format PNG/JPG (Kop Surat)</p></div>
             </div>
             <input className="w-full p-2 border border-slate-200 rounded text-xs font-bold focus:border-emerald-500 outline-none" placeholder="Nama Perusahaan" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
             <textarea className="w-full p-2 border border-slate-200 rounded text-xs h-16 focus:border-emerald-500 outline-none" placeholder="Alamat & Kontak" value={data.compAddress} onChange={e => setData({...data, compAddress: e.target.value})} />
          </div>

          {/* Rincian SPK */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nomor SPK</label><input className="w-full p-2 border border-slate-200 rounded text-xs" value={data.no} onChange={e => setData({...data, no: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tanggal</label><input className="w-full p-2 border border-slate-200 rounded text-xs" value={data.date} type="date" onChange={e => setData({...data, date: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Penerima Tugas</label><input className="w-full p-2 border border-slate-200 rounded text-xs font-bold" value={data.clientName} onChange={e => setData({...data, clientName: e.target.value})} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Proyek</label><input className="w-full p-2 border border-slate-200 rounded text-xs" value={data.projectName} onChange={e => setData({...data, projectName: e.target.value})} /></div>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nilai Kontrak</label><input className="w-full p-2 border border-slate-200 rounded text-xs" value={data.contractValue} onChange={e => setData({...data, contractValue: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Waktu</label><input className="w-full p-2 border border-slate-200 rounded text-xs" value={data.duration} onChange={e => setData({...data, duration: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Lingkup Kerja</label><textarea className="w-full p-2 border border-slate-200 rounded text-xs h-24" value={data.scope} onChange={e => setData({...data, scope: e.target.value})} /></div>
          </div>

          {/* IKLAN ADSTERRA (Ditambah no-print) */}
          <div className="no-print bg-white/50 border border-dashed border-slate-300 rounded-xl p-4 flex justify-center">
            <iframe
              srcDoc={`<html><body style="margin:0;display:flex;justify-content:center;background:transparent;">
                <div id="container-680bbbb6a0645f106a122dd96bf54b25"></div>
                <script async src="https://pl28427514.effectivegatecpm.com/680bbbb6a0645f106a122dd96bf54b25/invoke.js"></script>
              </body></html>`}
              width="100%" height="250" frameBorder="0" scrolling="no" style={{ maxWidth: '300px' }}
            />
          </div>
        </div>

        {/* PREVIEW KERTAS */}
        <div className="flex-1 h-full bg-slate-300/50 rounded-xl flex justify-center p-4 md:p-8 overflow-y-auto print:p-0 print:bg-white">
          <Kertas>
            <div className={templateId === 1 ? "font-serif text-black" : "font-sans text-slate-800"}>
              {/* KOP KLASIK */}
              {templateId === 1 && (
                <div className="flex items-center gap-6 border-b-[3px] border-double border-black pb-4 mb-8 text-center">
                  {logo && <img src={logo} className="h-20 w-auto object-contain" alt="logo" />}
                  <div className="flex-1">
                    <h1 className="text-xl font-bold uppercase tracking-wide">{data.compName}</h1>
                    <div className="text-[10pt] leading-tight whitespace-pre-line font-sans mt-1">{data.compAddress}</div>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h2 className="text-lg font-bold underline uppercase">SURAT PERINTAH KERJA</h2>
                <p className="text-sm font-sans mt-1 uppercase">Nomor: {data.no}</p>
              </div>

              <div className="space-y-6 text-[11pt] leading-relaxed">
                <p>Pada hari ini, yang bertanda tangan di bawah ini memberikan tugas kepada:</p>
                <div className="ml-8">
                  <p><strong>Nama/Instansi :</strong> {data.clientName}</p>
                  <p><strong>Alamat :</strong> {data.clientAddress}</p>
                </div>

                <p>Untuk segera melaksanakan pekerjaan sebagai berikut:</p>
                <table className="w-full border-collapse border border-black font-sans text-[10pt]">
                  <tbody>
                    <tr><td className="border border-black p-2 font-bold w-[30%]">Pekerjaan</td><td className="border border-black p-2">{data.projectName}</td></tr>
                    <tr><td className="border border-black p-2 font-bold">Nilai Kontrak</td><td className="border border-black p-2">Rp {data.contractValue}</td></tr>
                    <tr><td className="border border-black p-2 font-bold">Waktu</td><td className="border border-black p-2">{data.duration}</td></tr>
                  </tbody>
                </table>

                <div className="space-y-2">
                  <p className="font-bold underline">Lingkup Pekerjaan:</p>
                  <div className="whitespace-pre-line border border-slate-100 p-4 bg-slate-50 italic">{data.scope}</div>
                </div>

                <div className="flex justify-between mt-20 text-center">
                   <div className="w-[40%]">
                      <p className="mb-20">Penerima Tugas,</p>
                      <p className="font-bold underline uppercase">{data.clientName}</p>
                   </div>
                   <div className="w-[40%]">
                      <p className="mb-20">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}<br/>Pemberi Tugas,</p>
                      <p className="font-bold underline uppercase">{data.signerName}</p>
                      <p className="text-[9pt] font-medium">{data.signerJob}</p>
                   </div>
                </div>
              </div>
            </div>
          </Kertas>
        </div>
      </div>
    </div>
  );
}