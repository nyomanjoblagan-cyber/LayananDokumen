'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Award, FileText, Mail, Phone
} from 'lucide-react';
import Link from 'next/link';

export default function RekomendasiDosenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Rekomendasi...</div>}>
      <RecommendationBuilder />
    </Suspense>
  );
}

function RecommendationBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'REF/088/UNUD/FT/I/2026',
    
    // DATA DOSEN (PEMBERI REKOMENDASI)
    lecturerName: 'DR. I MADE WIRA, S.T., M.T.',
    lecturerNip: '19800101 200501 1 003',
    lecturerPosition: 'Ketua Program Studi Teknologi Informasi',
    lecturerEmail: 'madewira@unud.ac.id',
    university: 'UNIVERSITAS UDAYANA (UNUD)',

    // DATA MAHASISWA (YANG DIREKOMENDASIKAN)
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    studentGpa: '3.85 / 4.00',
    
    // DETAIL REKOMENDASI
    purpose: 'Pendaftaran Beasiswa LPDP Tahap I 2026',
    relationship: 'Dosen Pembimbing Akademik dan Dosen Pengampu Mata Kuliah Pemrograman Web.',
    strengths: 'Memiliki kemampuan analisis yang tajam, sangat mahir dalam pengembangan perangkat lunak, serta memiliki etos kerja dan kedisiplinan yang luar biasa tinggi.',
    closingStatement: 'Saya memberikan rekomendasi tertinggi bagi yang bersangkutan tanpa ragu sedikitpun.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const RecommendationContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP UNIVERSITAS */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="text-center">
            <h2 className="text-[12pt] font-black uppercase leading-tight tracking-tighter italic">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
            <h1 className="text-[14pt] font-black uppercase leading-tight mt-1">{data.university}</h1>
            <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest opacity-60">Fakultas Teknik - Program Studi Teknologi Informasi</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT REKOMENDASI AKADEMIK</h2>
        <p className="text-[9pt] font-sans mt-2 italic">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.lecturerName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIP/NIDN</span><span>:</span><span>{data.lecturerNip}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.lecturerPosition}</span></div>
        </div>

        <p className="mb-4 text-justify">Memberikan rekomendasi kepada mahasiswa di bawah ini:</p>

        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Indeks Prestasi</span><span>:</span><span className="font-bold">{data.studentGpa}</span></div>
        </div>

        <p className="mb-4">
            Saya telah mengenal yang bersangkutan selama masa studinya sebagai <b>{data.relationship}</b>. Selama interaksi kami, saya mengamati bahwa Saudara/i {data.studentName.split(' ')[0]} {data.strengths}
        </p>

        <p className="mb-4">
            Berdasarkan performa akademik dan karakter yang ditunjukkan, saya sangat yakin bahwa yang bersangkutan akan sukses dan memberikan kontribusi positif dalam <b>{data.purpose}</b>.
        </p>

        <p className="mb-6">{data.closingStatement}</p>
        
        <p>Demikian surat rekomendasi ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN (RIGHT ALIGNED) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-10">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-24 uppercase">Pemberi Rekomendasi,</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.lecturerName}</p>
                   <p className="text-[9pt] font-sans mt-1">NIP. {data.lecturerNip}</p>
                   <p className="text-[8pt] font-sans text-slate-500 lowercase mt-1 italic">{data.lecturerEmail}</p>
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
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic flex items-center gap-2">
               <GraduationCap size={18} /> Academic <span className="text-white not-italic opacity-40 font-normal italic">Referee Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Rekomendasi
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Dosen</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.lecturerName} onChange={e => handleDataChange('lecturerName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.lecturerEmail} onChange={e => handleDataChange('lecturerEmail', e.target.value)} placeholder="Email Dosen" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.studentGpa} onChange={e => handleDataChange('studentGpa', e.target.value)} placeholder="IPK" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Award size={12}/> Konten Rekomendasi</h3>
                <input className="w-full p-3 border rounded-xl text-xs italic font-bold" value={data.relationship} onChange={e => handleDataChange('relationship', e.target.value)} placeholder="Hubungan dengan mhs" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kelebihan mahasiswa..." />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <RecommendationContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <RecommendationContent />
      </div>
    </div>
  );
}