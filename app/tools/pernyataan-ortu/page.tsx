'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  User, Users, GraduationCap, Tent, Briefcase, FileWarning, 
  ChevronDown, Check, Edit3, Eye, FileText 
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PernyataanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <ParentStatementBuilder />
    </Suspense>
  );
}

function ParentStatementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Surabaya',
    date: '',
    parentName: 'Bambang Sugiono',
    parentNik: '3578010101750001',
    parentJob: 'Wiraswasta',
    parentAddress: 'Jl. Ahmad Yani No. 88, Surabaya',
    parentPhone: '0811-2345-6789',
    childName: 'Aditya Pratama',
    childId: '12345678',
    childSchool: 'SMK Negeri 1 Surabaya',
    childClass: 'XI - Teknik Mesin',
    title: 'SURAT IZIN ORANG TUA',
    context: 'Mengikuti Kegiatan Kunjungan Industri (Study Tour) ke Bali',
    statement: 'Memberikan izin sepenuhnya kepada anak saya tersebut di atas untuk mengikuti kegiatan yang diselenggarakan oleh sekolah pada tanggal 20-23 Juni 2026.',
    disclaimer: 'Saya menyadari segala resiko yang mungkin terjadi dan tidak akan menuntut pihak sekolah apabila terjadi hal-hal di luar kewenangan panitia, selama panitia telah menjalankan tugas sesuai prosedur.'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const applyPreset = (type: 'tour' | 'magang' | 'tatib') => {
    if (type === 'tour') {
      setData(prev => ({
        ...prev,
        title: 'SURAT IZIN ORANG TUA',
        context: 'Mengikuti Kegiatan Study Tour / Camping',
        statement: 'Memberikan izin kepada anak saya untuk mengikuti kegiatan tersebut yang akan dilaksanakan pada tanggal [Isi Tanggal]. Saya bersedia menanggung biaya yang diperlukan.',
        disclaimer: 'Saya tidak akan menuntut pihak sekolah atas kejadian di luar kendali manusia (Force Majeure) selama kegiatan berlangsung.',
      }));
      setTemplateId(1);
    } else if (type === 'magang') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN IZIN KERJA / MAGANG',
        context: 'Melaksanakan Program Magang / Praktik Kerja Lapangan (PKL)',
        statement: 'Menyetujui dan mengizinkan anak saya untuk melaksanakan praktik kerja di perusahaan yang Bapak/Ibu pimpin selama [Durasi] bulan.',
        disclaimer: 'Saya menjamin anak saya akan mematuhi segala peraturan perusahaan dan menjaga nama baik sekolah serta keluarga.',
      }));
      setTemplateId(1);
    } else if (type === 'tatib') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN KESANGGUPAN',
        context: 'Pematuhan Tata Tertib Sekolah & Disiplin Siswa',
        statement: 'Menyatakan bahwa saya selaku orang tua akan membimbing dan mengawasi anak saya agar mematuhi segala tata tertib yang berlaku di sekolah.',
        disclaimer: 'Apabila dikemudian hari anak saya melakukan pelanggaran berat, saya bersedia menerima sanksi akademik sesuai ketentuan sekolah (termasuk dikembalikan kepada orang tua).',
      }));
      setTemplateId(2); 
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar", desc: "Izin kegiatan umum" },
    { id: 2, name: "Format Materai", desc: "Pernyataan resmi/hukum" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT (STRICT 1 PAGE) ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm]">
      
      <div className="text-center mb-8 border-b-4 border-double border-black pb-2 shrink-0">
        <h1 className="font-black text-xl uppercase tracking-widest underline">{data.title}</h1>
      </div>

      <div className="flex-grow space-y-6">
        <p>Saya yang bertanda tangan di bawah ini:</p>

        <div className="ml-8 mb-6">
            <table className="w-full leading-relaxed">
                <tbody>
                    <tr><td className="w-36 py-0.5">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase">{data.parentName}</td></tr>
                    <tr><td className="py-0.5">NIK (KTP)</td><td>:</td><td>{data.parentNik}</td></tr>
                    <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{data.parentJob}</td></tr>
                    <tr><td className="py-0.5">No. HP / WA</td><td>:</td><td>{data.parentPhone}</td></tr>
                    <tr><td className="py-0.5 align-top">Alamat Domisili</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.parentAddress}</td></tr>
                </tbody>
            </table>
            <div className="mt-2 font-bold text-xs italic text-blue-700 print:text-black">Selaku Orang Tua / Wali dari:</div>
        </div>

        <div className="ml-8 mb-6">
            <table className="w-full leading-relaxed">
                <tbody>
                    <tr><td className="w-36 py-0.5">Nama Siswa/i</td><td className="w-3">:</td><td className="font-bold uppercase">{data.childName}</td></tr>
                    <tr><td className="py-0.5">NIS / NIM</td><td>:</td><td>{data.childId}</td></tr>
                    <tr><td className="py-0.5">Kelas / Jurusan</td><td>:</td><td>{data.childClass}</td></tr>
                    <tr><td className="py-0.5">Sekolah / Kampus</td><td>:</td><td>{data.childSchool}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="space-y-4">
            <p className="text-justify leading-relaxed">
                Sehubungan dengan kegiatan <strong>{data.context}</strong>, dengan ini saya menyatakan:
            </p>

            <div className="ml-8 p-4 bg-slate-50 border-l-4 border-slate-300 italic font-medium text-slate-800 print:bg-transparent print:border-black">
                "{data.statement}"
            </div>

            <p className="text-justify leading-relaxed">
                Dan selanjutnya saya menyatakan bahwa {data.disclaimer}
            </p>

            <p className="pt-2">Demikian surat pernyataan ini saya buat dengan sadar dan tanpa ada paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.</p>
        </div>
      </div>

      <div className="mt-auto pt-10 shrink-0 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
        <div className="w-64">
          <p className="mb-2 font-sans text-sm">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
          <p className="mb-20">Pembuat Pernyataan,</p>
          
          {templateId === 2 && (
            <div className="absolute -mt-16 ml-4 border border-slate-300 px-3 py-1 text-[8px] text-slate-400 font-sans print:border-black print:text-black">
                MATERAI<br/>10.000
            </div>
          )}
          
          <p className="font-bold underline uppercase text-lg">{data.parentName}</p>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> 
               <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Users size={16} /> <span>Parent Statement Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase flex items-center gap-2 active:scale-95 shadow-lg">
              <Printer size={16} /> <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Keperluan</h3>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => applyPreset('tour')} className="bg-white p-2 rounded border border-emerald-200 flex flex-col items-center gap-1"><Tent size={14} className="text-emerald-600"/><span className="text-[8px] font-bold">TOUR</span></button>
                 <button onClick={() => applyPreset('magang')} className="bg-white p-2 rounded border border-blue-200 flex flex-col items-center gap-1"><Briefcase size={14} className="text-blue-600"/><span className="text-[8px] font-bold">MAGANG</span></button>
                 <button onClick={() => applyPreset('tatib')} className="bg-white p-2 rounded border border-red-200 flex flex-col items-center gap-1"><FileWarning size={14} className="text-red-600"/><span className="text-[8px] font-bold">DISIPLIN</span></button>
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Orang Tua</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
              <textarea className="w-full p-2 border rounded text-xs h-14" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat" />
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><GraduationCap size={12}/> Data Anak / Siswa</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Sekolah" />
           </div>

           <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Isi Surat</h3>
              <input className="w-full p-2 border rounded text-xs font-black uppercase" value={data.title} onChange={e => handleDataChange('title', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-20" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 flex justify-center p-4 md:p-8 overflow-y-auto ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="origin-top scale-[0.55] md:scale-[0.85] lg:scale-100 shadow-2xl mb-20">
              <DocumentContent />
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <DocumentContent />
      </div>
    </div>
  );
}