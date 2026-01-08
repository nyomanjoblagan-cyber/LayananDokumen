'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileBadge, Award, CalendarDays
} from 'lucide-react';
import Link from 'next/link';

export default function IjazahSementaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor SKL...</div>}>
      <SKLBuilder />
    </Suspense>
  );
}

function SKLBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '800/421.3/SMK-TI/VI/2026',
    
    // INSTANSI PENDIDIKAN
    schoolHeader: 'PEMERINTAH PROVINSI BALI\nDINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA\nSMK TEKNOLOGI INFORMATIKA BALI',
    schoolAddress: 'Jl. Teuku Umar No. 10, Denpasar. Telp: (0361) 223344',
    
    // DATA SISWA
    studentName: 'BAGUS RAMADHAN',
    nisn: '0055123456',
    placeBirth: 'Denpasar',
    dateBirth: '2008-12-25',
    department: 'Rekayasa Perangkat Lunak (RPL)',
    
    // KETERANGAN KELULUSAN
    examYear: '2025/2026',
    averageScore: '88.50',
    status: 'LULUS',

    // PENANDATANGAN
    principalName: 'DRS. I MADE WIRA, M.PD.',
    principalNip: '19700101 199501 1 002'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const SKLContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP SEKOLAH */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
           ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 no-print">
                 <Building2 size={32} />
              </div>
           )}
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter">
                 {data.schoolHeader}
              </div>
              <p className="text-[8pt] font-sans mt-1 normal-case font-normal italic">{data.schoolAddress}</p>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT KETERANGAN LULUS (SKL)</h2>
        <p className="text-[10pt] font-sans mt-2 italic">Tahun Pelajaran {data.examYear}</p>
        <p className="text-[9pt] font-sans">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Kepala SMK Teknologi Informatika Bali dengan ini menerangkan bahwa:</p>
        
        <div className="ml-12 mb-8 space-y-2 font-sans text-[10.5pt]">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NISN</span><span>:</span><span>{data.nisn}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Kompetensi Keahlian</span><span>:</span><span className="font-bold">{data.department}</span></div>
        </div>

        <p className="mb-4 leading-relaxed">
          Berdasarkan hasil Rapat Pleno Dewan Guru tentang Kelulusan Siswa Tahun Pelajaran {data.examYear}, serta merujuk pada kriteria kelulusan yang berlaku, maka nama tersebut di atas dinyatakan:
        </p>

        <div className="text-center my-8">
            <div className="inline-block border-4 border-slate-900 px-10 py-3 rounded-lg">
                <span className="text-2xl font-black tracking-[0.3em] uppercase">{data.status}</span>
            </div>
            <p className="mt-4 font-sans text-sm">Dengan Nilai Rata-Rata Ujian: <b className="text-lg underline">{data.averageScore}</b></p>
        </div>

        <p className="mb-6">
          Surat keterangan ini berlaku sementara sampai dengan diterbitkannya Ijazah asli. Harap dipergunakan sebagaimana mestinya.
        </p>
      </div>

      {/* TANDA TANGAN (TABLE BASED) */}
      <div className="shrink-0 mt-6">
        <table className="w-full table-fixed text-[11pt]">
          <tbody>
            <tr>
              {/* KOLOM FOTO */}
              <td className="w-1/3 align-bottom">
                 <div className="w-32 h-40 border-2 border-dashed border-slate-300 flex items-center justify-center text-center p-4">
                    <p className="text-[7pt] text-slate-400 font-sans uppercase">Pas Foto<br/>3 x 4<br/>(Cap Tiga Jari)</p>
                 </div>
              </td>
              {/* KOLOM TTD KEPSEK */}
              <td className="text-center">
                <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p className="uppercase text-[9pt] font-bold mb-24">Kepala Sekolah,</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.principalName}</p>
                   <p className="text-[9pt] font-sans">NIP. {data.principalNip}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic">SKL <span className="text-white not-italic opacity-40 font-normal italic">Education Builder</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Ijazah Sementara
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Identitas Sekolah</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed font-bold uppercase" value={data.schoolHeader} onChange={e => handleDataChange('schoolHeader', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.schoolAddress} onChange={e => handleDataChange('schoolAddress', e.target.value)} placeholder="Alamat Sekolah" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Siswa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.nisn} onChange={e => handleDataChange('nisn', e.target.value)} placeholder="NISN" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Jurusan" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Award size={12}/> Nilai & Kelulusan</h3>
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs font-bold text-blue-700" value={data.averageScore} onChange={e => handleDataChange('averageScore', e.target.value)} placeholder="Rata-rata Nilai" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.examYear} onChange={e => handleDataChange('examYear', e.target.value)} placeholder="Tahun Pelajaran" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.principalName} onChange={e => handleDataChange('principalName', e.target.value)} placeholder="Nama Kepala Sekolah" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.principalNip} onChange={e => handleDataChange('principalNip', e.target.value)} placeholder="NIP Kepsek" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <SKLContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <SKLContent />
      </div>
    </div>
  );
}