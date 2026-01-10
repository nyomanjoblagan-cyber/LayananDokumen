'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, User, 
  Wallet, FileText, LayoutTemplate, ChevronDown, 
  CheckSquare, ArrowLeftCircle, Edit3, Eye, Building2
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BeasiswaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Beasiswa...</div>}>
      <ScholarshipBuilder />
    </Suspense>
  );
}

function ScholarshipBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // Tujuan Surat
    targetName: 'Rektor Universitas Indonesia',
    targetDept: 'u.p. Direktur Kemahasiswaan',
    targetAddress: 'Di Tempat',
    
    // Data Diri
    name: 'ANDI PRATAMA',
    nim: '2023102030',
    placeDateBirth: 'Bandung, 12 Mei 2003',
    major: 'S1 Teknik Informatika',
    semester: '5 (Lima)',
    ipk: '3.85',
    address: 'Jl. Margonda Raya No. 123, Depok',
    phone: '0812-3456-7890',
    
    // Data Bank (Penting untuk transfer)
    bankName: 'Bank Mandiri',
    bankAcc: '123-00-9876543-2',
    bankHolder: 'Andi Pratama',

    // Data Orang Tua
    fatherName: 'Budi Santoso',
    fatherJob: 'Wiraswasta',
    
    // Isi
    scholarshipName: 'Beasiswa Unggulan Berprestasi',
    reason: 'Saya berasal dari keluarga sederhana dan saat ini sedang membutuhkan bantuan biaya pendidikan untuk menunjang perkuliahan saya. Saya aktif dalam organisasi himpunan mahasiswa dan mempertahankan IPK di atas 3.50 setiap semester.',
    
    // Lampiran (Checklist)
    attachments: {
      ktm: true,
      ktp: true,
      transkrip: true,
      sktm: false,
      piagam: true,
      proposal: false
    }
  });

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  const toggleAttachment = (key: keyof typeof data.attachments) => {
    setData({
      ...data,
      attachments: { ...data.attachments, [key]: !data.attachments[key] }
    });
  };

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    const lampiranList = [
      data.attachments.ktm && 'Fotokopi Kartu Tanda Mahasiswa (KTM)',
      data.attachments.ktp && 'Fotokopi KTP',
      data.attachments.transkrip && 'Transkrip Nilai Terakhir (Legalisir)',
      data.attachments.sktm && 'Surat Keterangan Tidak Mampu (SKTM)',
      data.attachments.piagam && 'Fotokopi Sertifikat/Piagam Prestasi',
      data.attachments.proposal && 'Proposal Pengajuan Dana',
    ].filter(Boolean);

    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL INSTITUSIONAL ---
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           
           {/* HEADER SURAT */}
           <div className="flex justify-between items-start mb-8">
              <div>
                 <div className="mb-1">Hal: <strong>Permohonan {data.scholarshipName}</strong></div>
                 <div>Lampiran: 1 (Satu) Berkas</div>
              </div>
              <div className="text-right">
                 {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
              </div>
           </div>

           <div className="mb-6">
              <p>Yth. <strong>{data.targetName}</strong></p>
              {data.targetDept && <p>{data.targetDept}</p>}
              <p>{data.targetAddress}</p>
           </div>

           <div className="text-justify">
              <p className="mb-4">Dengan hormat,</p>
              <p className="mb-4">Saya yang bertanda tangan di bawah ini, mahasiswa:</p>
              
              <div className="ml-4 mb-4">
                 <table className="w-full text-[11pt]">
                    <tbody>
                        <tr><td className="w-[160px]">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{data.name}</td></tr>
                        <tr><td>NIM / NPM</td><td>:</td><td>{data.nim}</td></tr>
                        <tr><td>Fakultas / Jurusan</td><td>:</td><td>{data.major}</td></tr>
                        <tr><td>Semester</td><td>:</td><td>{data.semester}</td></tr>
                        <tr><td>IPK Terakhir</td><td>:</td><td className="font-bold">{data.ipk}</td></tr>
                        <tr><td>Tempat/Tgl Lahir</td><td>:</td><td>{data.placeDateBirth}</td></tr>
                        <tr><td>Alamat</td><td>:</td><td>{data.address}</td></tr>
                        <tr><td>No. HP / WA</td><td>:</td><td>{data.phone}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4">
                 Bersama surat ini, saya bermaksud mengajukan permohonan untuk mendapatkan <strong>{data.scholarshipName}</strong>. 
                 Adapun alasan saya mengajukan beasiswa ini adalah:
              </p>
              
              <div className="bg-slate-50 p-4 border-l-4 border-slate-400 mb-6 text-justify italic rounded">
                 "{data.reason}"
              </div>

              <p className="mb-2">Sebagai bahan pertimbangan Bapak/Ibu, bersama ini saya lampirkan kelengkapan administrasi sebagai berikut:</p>
              
              <ol className="list-decimal list-inside mb-6 ml-2 space-y-1">
                 {lampiranList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                 ))}
                 <li>Pas Foto Terbaru ukuran 4x6</li>
              </ol>

              <p className="mb-2">Apabila permohonan ini disetujui, dana beasiswa dapat disalurkan melalui:</p>
              <div className="ml-4 mb-6 font-bold">
                 {data.bankName} — No. Rek: {data.bankAcc} <br/>
                 a.n {data.bankHolder}
              </div>

              <p className="mb-8">
                 Demikian surat permohonan ini saya buat dengan sebenar-benarnya dan sungguh-sungguh. Besar harapan saya agar permohonan ini dapat dikabulkan. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih.
              </p>
           </div>

           {/* TTD */}
           <div className="flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-64">
                 <p className="mb-24">Hormat saya,</p>
                 <p className="font-bold border-b border-black inline-block uppercase">{data.name}</p>
                 <p>NIM. {data.nim}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: MODERN CLEAN ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-800 leading-relaxed">
           
           {/* HEADER MODERN */}
           <div className="mb-10 border-b-2 border-emerald-500 pb-4">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Permohonan Beasiswa</h1>
              <div className="flex justify-between mt-2">
                 <p className="text-emerald-600 font-bold">{data.scholarshipName}</p>
                 <p className="text-slate-500 text-sm">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
              </div>
           </div>

           <div className="mb-8">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-1">Kepada Yth.</p>
              <p className="font-bold text-lg">{data.targetName}</p>
              <p className="text-slate-600">{data.targetDept}</p>
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
                    <p><span className="text-slate-500 block text-[8pt]">Nomor Rekening</span><span className="font-mono text-lg tracking-wider">{data.bankAcc}</span></p>
                    <p><span className="text-slate-500 block text-[8pt]">Atas Nama</span>{data.bankHolder}</p>
                 </div>
              </div>
           </div>

           <div className="mb-8">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-2">Latar Belakang Permohonan</p>
              <p className="text-justify mb-4">Dengan ini saya mengajukan permohonan beasiswa dengan alasan sebagai berikut:</p>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-justify text-sm italic">
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

           <div className="flex justify-end pt-8 border-t border-slate-100" style={{ pageBreakInside: 'avoid' }}>
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
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          
          #print-only-root { 
            display: block !important; 
            width: 100%; 
            height: auto; 
            position: absolute; 
            top: 0; 
            left: 0; 
            z-index: 9999; 
            background: white; 
          }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } 
          .print-table tfoot { height: 20mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
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
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Formal (Resmi)' : 'Modern (Clean)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Formal (Resmi)</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Modern (Clean)</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* TARGET SURAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12} /> Tujuan & Jenis Beasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Beasiswa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.scholarshipName} onChange={e => handleDataChange('scholarshipName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tujuan (Rektor/Yayasan)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.targetName} onChange={e => handleDataChange('targetName', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Divisi/UP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.targetDept} onChange={e => handleDataChange('targetDept', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* DATA MAHASISWA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><GraduationCap size={12}/> Data Mahasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIM / NPM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" value={data.nim} onChange={e => handleDataChange('nim', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">IPK Terakhir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Fakultas/Jurusan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.major} onChange={e => handleDataChange('major', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Semester</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Tanggal Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.placeDateBirth} onChange={e => handleDataChange('placeDateBirth', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. HP / WA</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} /></div>
                  </div>
               </div>

               {/* DATA BANK & ORTU */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Wallet size={12}/> Bank & Orang Tua</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 block">Rekening Pencairan</label>
                        <div className="grid grid-cols-[1fr_1.5fr] gap-2">
                           <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs" placeholder="Nama Bank" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} />
                           <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" placeholder="No. Rekening" value={data.bankAcc} onChange={e => handleDataChange('bankAcc', e.target.value)} />
                        </div>
                        <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" placeholder="Atas Nama" value={data.bankHolder} onChange={e => handleDataChange('bankHolder', e.target.value)} />
                     </div>
                     <div className="pt-3 border-t border-dashed border-slate-200 space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 block">Data Orang Tua (Ayah/Wali)</label>
                        <div className="grid grid-cols-2 gap-2">
                           <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs" placeholder="Nama Ayah" value={data.fatherName} onChange={e => handleDataChange('fatherName', e.target.value)} />
                           <input className="px-3 py-2 border border-slate-200 rounded-lg text-xs" placeholder="Pekerjaan" value={data.fatherJob} onChange={e => handleDataChange('fatherJob', e.target.value)} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* ALASAN & LAMPIRAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Edit3 size={12}/> Alasan & Lampiran</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alasan Mengajukan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-24 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                     
                     <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-bold text-slate-500">Checklist Lampiran</label>
                        <div className="grid grid-cols-2 gap-2">
                           {Object.keys(data.attachments).map((key) => (
                              <button 
                                 key={key}
                                 onClick={() => toggleAttachment(key as any)}
                                 className={`px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center gap-2 border transition-all ${data.attachments[key as keyof typeof data.attachments] ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-transparent text-slate-400'}`}
                              >
                                 <CheckSquare size={14} className={data.attachments[key as keyof typeof data.attachments] ? 'opacity-100' : 'opacity-30'}/>
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
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}