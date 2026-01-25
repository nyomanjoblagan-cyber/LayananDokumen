'use client';

/**
 * FILE: BeasiswaPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Permohonan Beasiswa
 * FIX: Menambahkan menu pilihan template untuk tampilan Mobile
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, GraduationCap, User, Wallet, 
  FileText, LayoutTemplate, ChevronDown, 
  CheckSquare, ArrowLeftCircle, Edit3, Eye, Building2, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface Attachments {
  ktm: boolean;
  ktp: boolean;
  transkrip: boolean;
  sktm: boolean;
  piagam: boolean;
  proposal: boolean;
  lainnya: boolean;
}

interface ScholarshipData {
  city: string;
  date: string;
  
  // Tujuan Surat
  targetName: string;
  targetDept: string;
  targetAddress: string;
  
  // Data Diri
  name: string;
  nim: string;
  placeDateBirth: string;
  major: string;
  semester: string;
  ipk: string;
  address: string;
  phone: string;
  
  // Data Bank
  bankName: string;
  bankAcc: string;
  bankHolder: string;

  // Data Ortu
  fatherName: string;
  fatherJob: string;
  
  // Isi
  scholarshipName: string;
  reason: string;
  
  // Lampiran
  attachments: Attachments;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ScholarshipData = {
  city: 'JAKARTA',
  date: '', 
  
  targetName: 'Rektor Universitas Indonesia',
  targetDept: 'u.p. Direktur Kemahasiswaan',
  targetAddress: 'Kampus UI Depok, Jawa Barat',
  
  name: 'ANDI PRATAMA',
  nim: '2023102030',
  placeDateBirth: 'Bandung, 12 Mei 2003',
  major: 'S1 Teknik Informatika',
  semester: '5 (Lima)',
  ipk: '3.85',
  address: 'Jl. Margonda Raya No. 123, Depok',
  phone: '0812-3456-7890',
  
  bankName: 'Bank Mandiri',
  bankAcc: '123-00-9876543-2',
  bankHolder: 'ANDI PRATAMA',

  fatherName: 'Budi Santoso',
  fatherJob: 'Wiraswasta',
  
  scholarshipName: 'Beasiswa Unggulan Berprestasi Tahun 2026',
  reason: 'Saya berasal dari keluarga sederhana dan saat ini sedang membutuhkan bantuan biaya pendidikan untuk menunjang perkuliahan saya. Saya aktif dalam organisasi himpunan mahasiswa dan konsisten mempertahankan IPK di atas 3.50 setiap semester.',
  
  attachments: {
    ktm: true,
    ktp: true,
    transkrip: true,
    sktm: false,
    piagam: true,
    proposal: false,
    lainnya: false
  }
};

// --- 3. KOMPONEN UTAMA ---
export default function BeasiswaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Beasiswa...</div>}>
      <ScholarshipBuilder />
    </Suspense>
  );
}

function ScholarshipBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<ScholarshipData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof ScholarshipData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const toggleAttachment = (key: keyof Attachments) => {
    setData(prev => ({
      ...prev,
      attachments: { ...prev.attachments, [key]: !prev.attachments[key] }
    }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT (Agar Rapi) ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (Resmi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern (Clean)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    // Format Tanggal
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    // List Lampiran
    const lampiranList = [
      data.attachments.ktm && 'Fotokopi Kartu Tanda Mahasiswa (KTM)',
      data.attachments.ktp && 'Fotokopi KTP',
      data.attachments.transkrip && 'Transkrip Nilai Terakhir (Legalisir)',
      data.attachments.sktm && 'Surat Keterangan Tidak Mampu (SKTM)',
      data.attachments.piagam && 'Fotokopi Sertifikat/Piagam Prestasi',
      data.attachments.proposal && 'Proposal Pengajuan Dana',
      data.attachments.lainnya && 'Dokumen Pendukung Lainnya',
      'Pas Foto Terbaru ukuran 4x6'
    ].filter(Boolean);

    if (templateId === 1) {
      // === TEMPLATE 1: FORMAL (LAYOUT FIXED) ===
      return (
        <div className="font-serif text-[11pt] text-black leading-[1.6]">
           
           {/* 1. TANGGAL DI POJOK KANAN ATAS (Supaya tidak tabrakan) */}
           <div className="flex justify-end mb-4">
              <div>{data.city}, {formatDate(data.date)}</div>
           </div>

           {/* 2. BLOK LAMPIRAN & PERIHAL (Di Kiri) */}
           <div className="mb-8 w-full">
              <table className="w-full">
                 <tbody>
                    <tr><td className="w-[80px]">Lampiran</td><td className="w-4">:</td><td>1 (Satu) Berkas</td></tr>
                    <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td className="font-bold align-top">Permohonan {data.scholarshipName}</td></tr>
                 </tbody>
              </table>
           </div>

           {/* 3. TUJUAN SURAT */}
           <div className="mb-8">
              <p>Yth. <strong>{data.targetName}</strong></p>
              {data.targetDept && <p>{data.targetDept}</p>}
              <p>{data.targetAddress}</p>
           </div>

           {/* 4. ISI SURAT */}
           <div className="text-justify px-1">
              <p className="mb-4">Dengan hormat,</p>
              <p className="mb-4">Saya yang bertanda tangan di bawah ini, mahasiswa:</p>
              
              <div className="ml-6 mb-6">
                 <table className="w-full text-[11pt]">
                    <tbody>
                       <tr><td className="w-[160px] align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                       <tr><td className="align-top">NIM / NPM</td><td className="align-top">:</td><td className="align-top">{data.nim}</td></tr>
                       <tr><td className="align-top">Fakultas / Jurusan</td><td className="align-top">:</td><td className="align-top">{data.major}</td></tr>
                       <tr><td className="align-top">Semester</td><td className="align-top">:</td><td className="align-top">{data.semester}</td></tr>
                       <tr><td className="align-top">IPK Terakhir</td><td className="align-top">:</td><td className="font-bold align-top">{data.ipk}</td></tr>
                       <tr><td className="align-top">Tempat, Tgl Lahir</td><td className="align-top">:</td><td className="align-top">{data.placeDateBirth}</td></tr>
                       <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                       <tr><td className="align-top">No. HP / WA</td><td className="align-top">:</td><td className="align-top">{data.phone}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4">
                 Bersama surat ini, saya bermaksud mengajukan permohonan untuk mendapatkan <strong>{data.scholarshipName}</strong>. 
                 Adapun alasan saya mengajukan beasiswa ini adalah:
              </p>
              
              <div className="bg-slate-50/50 p-4 border-l-4 border-slate-400 mb-6 text-justify italic ml-4">
                 "{data.reason}"
              </div>

              <p className="mb-2">Sebagai bahan pertimbangan Bapak/Ibu, bersama ini saya lampirkan kelengkapan administrasi sebagai berikut:</p>
              
              <ol className="list-decimal list-outside mb-6 ml-10 space-y-1">
                 {lampiranList.map((item, idx) => (
                    <li key={idx} className="pl-2">{item}</li>
                 ))}
              </ol>

              <p className="mb-2">Apabila permohonan ini disetujui, dana beasiswa dapat disalurkan melalui rekening berikut:</p>
              <div className="ml-6 mb-6 font-bold bg-slate-100/50 p-2 inline-block border border-slate-200">
                 {data.bankName} — {data.bankAcc} <br/>
                 a.n {data.bankHolder}
              </div>

              <p className="mb-8 indent-12">
                 Demikian surat permohonan ini saya buat dengan sebenar-benarnya dan sungguh-sungguh. Besar harapan saya agar permohonan ini dapat dikabulkan. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih.
              </p>
           </div>

           {/* 5. TANDA TANGAN */}
           <div className="flex justify-end mt-10" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-64">
                 <p className="mb-24">Hormat saya,</p>
                 <p className="font-bold border-b border-black inline-block uppercase text-[11pt]">{data.name}</p>
                 <p className="text-[10pt]">NIM. {data.nim}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // === TEMPLATE 2: MODERN CLEAN ===
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-relaxed">
           
           <div className="mb-10 border-b-2 border-emerald-500 pb-4">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Permohonan Beasiswa</h1>
              <div className="flex justify-between mt-2">
                 <p className="text-emerald-600 font-bold">{data.scholarshipName}</p>
                 <p className="text-slate-500 text-sm">{data.city}, {formatDate(data.date)}</p>
              </div>
           </div>

           <div className="mb-8 bg-white p-4 border-l-4 border-slate-300">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-1">Kepada Yth.</p>
              <p className="font-bold text-lg">{data.targetName}</p>
              <p className="text-slate-600 text-sm">{data.targetDept}</p>
           </div>

           <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-3 border-b pb-1">Data Mahasiswa</p>
                 <div className="space-y-1 text-sm">
                    <p><span className="text-slate-500 block text-[8pt]">Nama Lengkap</span><span className="font-bold uppercase">{data.name}</span></p>
                    <p><span className="text-slate-500 block text-[8pt]">NIM</span><span className="font-mono">{data.nim}</span></p>
                    <p><span className="text-slate-500 block text-[8pt]">Jurusan</span>{data.major}</p>
                    <p><span className="text-slate-500 block text-[8pt]">IPK Saat Ini</span><span className="font-bold text-emerald-600">{data.ipk}</span></p>
                 </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-3 border-b pb-1">Rekening Pencairan</p>
                 <div className="space-y-1 text-sm">
                    <p><span className="text-slate-500 block text-[8pt]">Nama Bank</span>{data.bankName}</p>
                    <p><span className="text-slate-500 block text-[8pt]">Nomor Rekening</span><span className="font-mono text-lg tracking-wider font-bold">{data.bankAcc}</span></p>
                    <p><span className="text-slate-500 block text-[8pt]">Atas Nama</span>{data.bankHolder}</p>
                 </div>
              </div>
           </div>

           <div className="mb-8">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Latar Belakang Permohonan</p>
              <p className="text-justify mb-4">Dengan ini saya mengajukan permohonan beasiswa dengan alasan sebagai berikut:</p>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-justify text-sm italic text-slate-700">
                 "{data.reason}"
              </div>
           </div>

           <div className="mb-10">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Lampiran Dokumen</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                 {lampiranList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[8px] font-bold">✓</div>
                       {item}
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex justify-end pt-8 border-t border-slate-200" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-64">
                 <p className="mb-20 font-bold text-slate-500 text-xs uppercase tracking-widest">Pemohon</p>
                 <p className="font-black text-slate-900 border-b-2 border-slate-900 inline-block uppercase">{data.name}</p>
                 <p className="text-xs mt-1 text-slate-400">{data.nim}</p>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Beasiswa <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Formal (Resmi)' : 'Modern (Clean)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {/* MOBILE DROPDOWN */}
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Formulir</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. TARGET SURAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12} /> Tujuan & Jenis</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Beasiswa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.scholarshipName} onChange={e => handleDataChange('scholarshipName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tujuan (Rektor/Yayasan)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetName} onChange={e => handleDataChange('targetName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Divisi/UP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetDept} onChange={e => handleDataChange('targetDept', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota & Tanggal</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

               {/* 2. DATA MAHASISWA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><GraduationCap size={12}/> Data Mahasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIM / NPM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nim} onChange={e => handleDataChange('nim', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">IPK Terakhir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Fakultas/Jurusan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.major} onChange={e => handleDataChange('major', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Tanggal Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.placeDateBirth} onChange={e => handleDataChange('placeDateBirth', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. HP / WA</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. DATA BANK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Wallet size={12}/> Info Pencairan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 block">Rekening Bank (Wajib Valid)</label>
                         <div className="grid grid-cols-[1fr_1.5fr] gap-2">
                            <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Bank" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} />
                            <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="No. Rekening" value={data.bankAcc} onChange={e => handleDataChange('bankAcc', e.target.value)} />
                         </div>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Atas Nama" value={data.bankHolder} onChange={e => handleDataChange('bankHolder', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. ALASAN & LAMPIRAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Edit3 size={12}/> Alasan & Lampiran</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alasan Mengajukan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-32 resize-none leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                      
                      <div className="space-y-2 pt-2">
                         <label className="text-[10px] font-bold text-slate-500">Checklist Lampiran</label>
                         <div className="grid grid-cols-1 gap-2">
                            {Object.keys(data.attachments).map((key) => (
                               <button 
                                  key={key}
                                  onClick={() => toggleAttachment(key as keyof Attachments)}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center gap-2 border transition-all ${data.attachments[key as keyof Attachments] ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-transparent text-slate-400'}`}
                               >
                                  <CheckSquare size={14} className={data.attachments[key as keyof Attachments] ? 'opacity-100' : 'opacity-30'}/>
                                  <span className="uppercase">{key}</span>
                               </button>
                            ))}
                         </div>
                      </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
