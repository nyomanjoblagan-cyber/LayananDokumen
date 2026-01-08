'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  User, UserCheck, FileText, Scroll, Car, GraduationCap, Banknote, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SuratKuasaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Kuasa...</div>}>
      <KuasaToolBuilder />
    </Suspense>
  );
}

function KuasaToolBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // PEMBERI KUASA
    pemberiName: 'Budi Santoso',
    pemberiNik: '3171010101800001',
    pemberiJob: 'Wiraswasta',
    pemberiAddress: 'Jl. Merdeka No. 45, Jakarta Pusat',
    
    // PENERIMA KUASA
    penerimaName: 'Andi Saputra',
    penerimaNik: '3201010101950002',
    penerimaJob: 'Karyawan Swasta',
    penerimaAddress: 'Jl. Kemenangan No. 10, Bekasi',
    
    // ISI KUASA
    purposeTitle: 'PENGAMBILAN BPKB KENDARAAN BERMOTOR',
    purposeDetail: 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) dengan rincian:\n\nMerk/Type : Honda Vario 125\nNo. Polisi : B 1234 XXX\nNo. Rangka : MH1JM123456789\nNo. Mesin : JM11E-1234567\nAtas Nama : Budi Santoso',
  });

  // LOGIC PRESETS
  const applyPreset = (type: 'bpkb' | 'ijazah' | 'gaji' | 'umum') => {
    if (type === 'bpkb') {
      setData(prev => ({
        ...prev,
        purposeTitle: 'PENGAMBILAN BPKB KENDARAAN',
        purposeDetail: 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) di Leasing/Bank [...] dengan rincian kendaraan:\n\nMerk/Type : ...\nNo. Polisi : ...\nNo. Rangka : ...\nNo. Mesin : ...\nAtas Nama : ...'
      }));
    } else if (type === 'ijazah') {
      setData(prev => ({
        ...prev,
        purposeTitle: 'PENGAMBILAN IJAZAH / TRANSKRIP',
        purposeDetail: 'Untuk mengambil Ijazah Asli, Transkrip Nilai, dan Legalisir pada:\n\nNama Sekolah/Kampus : ...\nJurusan/Prodi : ...\nTahun Lulus : ...\nAtas Nama : ...'
      }));
    } else if (type === 'gaji') {
      setData(prev => ({
        ...prev,
        purposeTitle: 'PENGAMBILAN GAJI / UANG PENSIUN',
        purposeDetail: 'Untuk melakukan pencairan dan pengambilan uang gaji/pensiun bulan [...] pada:\n\nBank / Kantor Pos : ...\nNo. Rekening : ...\nJumlah : Rp ...\nAtas Nama : ...'
      }));
    } else if (type === 'umum') {
      setData(prev => ({
        ...prev,
        purposeTitle: 'PENGAMBILAN DOKUMEN / BARANG',
        purposeDetail: 'Untuk mengambil paket/dokumen berupa [...] yang berada di [...] dengan nomor resi/referensi [...].'
      }));
    }
  };

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar (Compact)", desc: "Format umum dengan kolom materai, muat 1 halaman" },
    { id: 2, name: "Format Bank/Instansi", desc: "Lebih formal, layout blok paragraf" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SCALING AMAN */
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT - TOTAL RESET */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* HILANGKAN SCROLL DI BODY */
          }

          /* HILANGKAN VISUAL SCROLLBAR */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* WARNA TEXT JELAS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Kuasa</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Quick Generator */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Scroll size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Jenis Kuasa)</h3>
             </div>
             <div className="p-4 grid grid-cols-2 gap-2">
                <button onClick={() => applyPreset('bpkb')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Car size={12}/> Ambil BPKB
                </button>
                <button onClick={() => applyPreset('ijazah')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <GraduationCap size={12}/> Ambil Ijazah
                </button>
                <button onClick={() => applyPreset('gaji')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Banknote size={12}/> Ambil Gaji
                </button>
                <button onClick={() => applyPreset('umum')} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <FileText size={12}/> Dokumen Lain
                </button>
             </div>
          </div>

          {/* Pemberi Kuasa */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Pemberi Kuasa (Anda)</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.pemberiName} onChange={e => handleDataChange('pemberiName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.pemberiNik} onChange={e => handleDataChange('pemberiNik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.pemberiJob} onChange={e => handleDataChange('pemberiJob', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.pemberiAddress} onChange={e => handleDataChange('pemberiAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Penerima Kuasa */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <UserCheck size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Penerima Kuasa (Wakil)</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.penerimaName} onChange={e => handleDataChange('penerimaName', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK (KTP)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.penerimaNik} onChange={e => handleDataChange('penerimaNik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.penerimaJob} onChange={e => handleDataChange('penerimaJob', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.penerimaAddress} onChange={e => handleDataChange('penerimaAddress', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Detail Kuasa */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileText size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Detail Wewenang</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Keperluan (KHUSUS)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold uppercase" value={data.purposeTitle} onChange={e => handleDataChange('purposeTitle', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Rincian / Detail Barang</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-32 resize-none" value={data.purposeDetail} onChange={e => handleDataChange('purposeDetail', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: STANDAR (COMPACT) */}
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-normal">
                 <div className="text-center mb-6 border-b-4 border-double border-black pb-3">
                    <h1 className="font-black text-2xl uppercase tracking-widest underline">SURAT KUASA</h1>
                 </div>

                 <p className="mb-2 text-justify">Yang bertanda tangan di bawah ini:</p>
                 
                 {/* PEMBERI KUASA - COMPACT */}
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.pemberiName}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.pemberiNik}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.pemberiJob}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.pemberiAddress}</td></tr>
                       </tbody>
                    </table>
                    <div className="mt-1 italic font-bold text-sm">Selanjutnya disebut sebagai PEMBERI KUASA.</div>
                 </div>

                 <p className="mb-2 text-justify">Dengan ini memberikan kuasa penuh kepada:</p>

                 {/* PENERIMA KUASA - COMPACT */}
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.penerimaName}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.penerimaNik}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.penerimaJob}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.penerimaAddress}</td></tr>
                       </tbody>
                    </table>
                    <div className="mt-1 italic font-bold text-sm">Selanjutnya disebut sebagai PENERIMA KUASA.</div>
                 </div>

                 <div className="text-center font-bold mb-4 underline text-sm">------------------------ KHUSUS ------------------------</div>

                 <p className="mb-2 text-justify">
                    Untuk dan atas nama Pemberi Kuasa melakukan <strong>{data.purposeTitle}</strong>, yaitu:
                 </p>

                 <div className="ml-4 mb-4 p-3 border-l-4 border-black bg-slate-50 italic">
                    <div className="whitespace-pre-line text-slate-900">{data.purposeDetail}</div>
                 </div>

                 <p className="mb-6 text-justify">
                    Surat kuasa ini diberikan dengan hak retensi serta hak substitusi, dan berlaku sejak tanggal ditandatangani. Segala akibat hukum yang timbul dari pemberian kuasa ini menjadi tanggung jawab Pemberi Kuasa sepenuhnya.
                 </p>

                 <div className="text-right mb-4">
                    {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                 </div>

                 {/* TTD + MATERAI COMPACT */}
                 <div className="flex justify-between text-center mt-auto">
                    <div className="w-48">
                       <p className="mb-16 font-bold">Penerima Kuasa</p>
                       <p className="font-bold underline uppercase">{data.penerimaName}</p>
                    </div>
                    <div className="w-48">
                       <p className="mb-2 font-bold">Pemberi Kuasa</p>
                       <div className="border-2 border-dashed border-slate-400 w-24 h-14 mx-auto mb-2 flex items-center justify-center text-[9px] text-slate-400 bg-slate-50/50">
                          MATERAI<br/>10.000
                       </div>
                       <p className="font-bold underline uppercase">{data.pemberiName}</p>
                    </div>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: BANK / INSTANSI (COMPACT) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-relaxed">
                 <div className="text-center mb-6">
                    <h1 className="font-black text-xl uppercase tracking-tighter mb-1">SURAT KUASA</h1>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">I. PEMBERI KUASA</p>
                    <div className="bg-slate-50 p-3 border border-slate-200 rounded">
                       <div className="grid grid-cols-[100px_10px_1fr] gap-0.5">
                          <div>Nama</div><div>:</div><div className="font-bold">{data.pemberiName}</div>
                          <div>NIK</div><div>:</div><div>{data.pemberiNik}</div>
                          <div>Alamat</div><div>:</div><div>{data.pemberiAddress}</div>
                       </div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">II. PENERIMA KUASA</p>
                    <div className="bg-slate-50 p-3 border border-slate-200 rounded">
                       <div className="grid grid-cols-[100px_10px_1fr] gap-0.5">
                          <div>Nama</div><div>:</div><div className="font-bold">{data.penerimaName}</div>
                          <div>NIK</div><div>:</div><div>{data.penerimaNik}</div>
                          <div>Alamat</div><div>:</div><div>{data.penerimaAddress}</div>
                       </div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">III. KEPERLUAN</p>
                    <p className="text-justify mb-2">
                       Memberikan kuasa sepenuhnya untuk melakukan tindakan pengurusan / pengambilan:
                    </p>
                    <div className="border-l-4 border-blue-600 pl-4 py-1 bg-blue-50">
                       <div className="font-bold mb-1 uppercase">{data.purposeTitle}</div>
                       <div className="whitespace-pre-line text-sm">{data.purposeDetail}</div>
                    </div>
                 </div>

                 <p className="mb-8 text-justify text-sm">
                    Demikian Surat Kuasa ini dibuat untuk dipergunakan sebagaimana mestinya. Saya menyatakan bertanggung jawab sepenuhnya atas segala risiko yang timbul akibat pelimpahan wewenang ini.
                 </p>

                 <div className="grid grid-cols-2 gap-8 text-center mt-auto">
                    <div>
                       <div className="text-xs text-slate-400 mb-16">Penerima Kuasa</div>
                       <div className="font-bold border-b border-black inline-block px-4">{data.penerimaName}</div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-400 mb-6">Pemberi Kuasa</div>
                       <div className="border border-slate-300 w-20 h-14 mx-auto mb-2 flex items-center justify-center text-[9px] text-slate-300">
                          Materai
                       </div>
                       <div className="font-bold border-b border-black inline-block px-4">{data.pemberiName}</div>
                    </div>
                 </div>
                 
                 <div className="text-center text-[10px] text-slate-400 mt-8">
                    {data.city}, {new Date(data.date).toLocaleDateString('en-US', {dateStyle:'full'})}
                 </div>
              </div>
            )}

          </Kertas>

        </div>
      </div>
    </div>
  );
}