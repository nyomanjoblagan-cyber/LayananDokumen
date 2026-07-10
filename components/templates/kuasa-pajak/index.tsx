'use client';

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, FileText, UserCircle2, 
  ShieldCheck, LayoutTemplate, X, PenTool, Scale, Fingerprint, Edit3, Eye, Check, ChevronDown, RotateCcw, Building2
} from 'lucide-react';
import Link from 'next/link';

import PrintWrapper from '@/components/PrintWrapper';

interface ProxyData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMBERI KUASA (PIHAK PERTAMA)
  p1Capacity: 'Pribadi' | 'Wakil Badan';
  p1Name: string;
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Job: string;
  p1Address: string;
  p1Npwp: string;
  
  // Jika Wakil Badan
  p1Company: string;
  p1NpwpBadan: string;
  p1Jabatan: string;
  p1CompanyAddress: string;

  // PENERIMA KUASA (PIHAK KEDUA)
  p2Name: string;
  p2Nik: string;
  p2Npwp: string;
  p2Pob: string;
  p2Dob: string;
  p2Address: string;
  p2Job: string;
  p2License: string; // Nomor Izin Konsultan

  // DETAIL URUSAN PAJAK
  taxType: string;
  taxPeriod: string;
  kppName: string;
  
  // KLAUSUL TAMBAHAN
  substitutionRight: 'Ya' | 'Tidak';
  honorarium: string;
}

const INITIAL_DATA: ProxyData = {
  city: 'Jakarta',
  date: '', 
  docNo: 'SKP/2026/001-XYZ',
  
  p1Capacity: 'Wakil Badan',
  p1Name: 'BUDI SANTOSO',
  p1Nik: '3171234567890001',
  p1Pob: 'Surabaya',
  p1Dob: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Sudirman Kav 10, Jakarta Selatan',
  p1Npwp: '12.345.678.9-012.000',
  
  p1Company: 'PT MAJU BERSAMA PAJAK',
  p1NpwpBadan: '01.987.654.3-012.000',
  p1Jabatan: 'Direktur Utama',
  p1CompanyAddress: 'Gedung Menara Merdeka, Jl. MH Thamrin No.1, Jakarta Pusat',

  p2Name: 'DR. SITI AMINAH, S.E., M.Ak., BKP',
  p2Nik: '3179876543210002',
  p2Npwp: '98.765.432.1-012.000',
  p2Pob: 'Bandung',
  p2Dob: '1975-10-20',
  p2Address: 'Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan',
  p2Job: 'Konsultan Pajak',
  p2License: 'KEP-123/PJ/2020',

  taxType: 'Pajak Pertambahan Nilai (PPN) & Pajak Penghasilan Badan',
  taxPeriod: 'Tahun Pajak 2025',
  kppName: 'KPP Wajib Pajak Besar Satu',
  
  substitutionRight: 'Tidak',
  honorarium: 'Sesuai dengan Perjanjian Jasa Konsultasi Terpisah'
};

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <TaxProxyBuilder />
    </Suspense>
  );
}

function TaxProxyBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ProxyData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ProxyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const ProxyContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        const [year, month, day] = dateString.split('-');
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return `${day} ${monthNames[parseInt(month)-1]} ${year}`;
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] print:min-h-0 p-[25mm] shadow-2xl print:shadow-none print:m-0 print:p-[25mm] print:w-full mx-auto relative">
        
        {/* JUDUL DOKUMEN */}
        <div className="text-center mb-10 shrink-0">
          <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 mb-2">SURAT KUASA KHUSUS</h2>
          <p className="text-[11pt] font-bold uppercase tracking-widest">Nomor: {data.docNo}</p>
        </div>

        {/* PEMBUKAAN */}
        <div className="mb-6 text-justify">
          <p className="mb-4">Pada hari ini, tanggal {formatDateSafe(data.date)} di {data.city}, yang bertanda tangan di bawah ini:</p>
          
          {/* PIHAK PERTAMA */}
          <div className="ml-4 mb-4">
             <div className="flex mb-1"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p1Name}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">NIK</div><div className="w-4 shrink-0">:</div><div>{data.p1Nik}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">NPWP Pribadi</div><div className="w-4 shrink-0">:</div><div>{data.p1Npwp}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Tempat/Tgl. Lahir</div><div className="w-4 shrink-0">:</div><div>{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.p1Job}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Lengkap</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p1Address}</div></div>
          </div>

          {data.p1Capacity === 'Wakil Badan' && (
            <div className="mb-4 text-justify">
              <p className="mb-2">Dalam hal ini bertindak dalam jabatannya sebagai <strong>{data.p1Jabatan}</strong>, dari dan oleh karena itu sah bertindak untuk dan atas nama Badan Hukum:</p>
              <div className="ml-4">
                <div className="flex mb-1"><div className="w-48 shrink-0">Nama Badan</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p1Company}</div></div>
                <div className="flex mb-1"><div className="w-48 shrink-0">NPWP Badan</div><div className="w-4 shrink-0">:</div><div>{data.p1NpwpBadan}</div></div>
                <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Badan</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p1CompanyAddress}</div></div>
              </div>
            </div>
          )}
          
          <p className="mb-4">Selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>.</p>
          <p className="mb-4">Pemberi Kuasa dengan ini memberikan KUASA KHUSUS kepada:</p>

          {/* PIHAK KEDUA */}
          <div className="ml-4 mb-4">
             <div className="flex mb-1"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p2Name}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">NIK</div><div className="w-4 shrink-0">:</div><div>{data.p2Nik}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">NPWP Pribadi</div><div className="w-4 shrink-0">:</div><div>{data.p2Npwp}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Izin Konsultan</div><div className="w-4 shrink-0">:</div><div>{data.p2License || '-'}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Tempat/Tgl. Lahir</div><div className="w-4 shrink-0">:</div><div>{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.p2Job}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Lengkap</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p2Address}</div></div>
          </div>
          <p className="mb-6">Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.</p>
          
          <p className="text-center font-bold tracking-widest uppercase text-sm mb-6">--- K H U S U S ---</p>

          <p className="mb-4 text-justify">
            Untuk dan atas nama PEMBERI KUASA mewakili dan/atau mendampingi PEMBERI KUASA dalam melaksanakan hak dan memenuhi kewajiban perpajakan berdasarkan ketentuan peraturan perundang-undangan perpajakan yang berlaku. Penunjukan kuasa ini diatur lebih lanjut dengan pasal-pasal sebagai berikut:
          </p>
        </div>

        {/* PASAL-PASAL */}
        <div className="flex-grow text-justify text-[11pt] space-y-4">
          
          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 1<br/>DEFINISI DAN RUANG LINGKUP KUASA</h3>
            <div className="pl-0 ml-0 space-y-2">
              <div className="flex"><div className="w-6 shrink-0">1.1.</div><div><p>Pemberi Kuasa adalah Wajib Pajak sebagaimana disebutkan identitasnya di atas yang memberikan kuasa terkait urusan kepabeanan, cukai, atau perpajakannya kepada Penerima Kuasa.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">1.2.</div><div><p>Penerima Kuasa adalah orang yang memenuhi persyaratan sebagaimana diatur dalam peraturan perundang-undangan perpajakan (termasuk konsultan pajak terdaftar jika dipersyaratkan) yang ditunjuk oleh Pemberi Kuasa untuk melaksanakan hak dan/atau memenuhi kewajiban perpajakan.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">1.3.</div><div><p>Kuasa ini diberikan secara khusus untuk melaksanakan wewenang yang secara tegas disebutkan dalam Pasal 2 pada Surat Kuasa ini.</p></div></div>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 2<br/>OBJEK DAN MASA PAJAK</h3>
            <p className="mb-2">Kuasa yang diberikan meliputi pengurusan perpajakan untuk rincian sebagai berikut:</p>
            <div className="ml-6 space-y-2 mb-2">
              <div className="flex"><div className="w-6 shrink-0">a.</div><div className="flex-1">Jenis Pajak: <strong>{data.taxType}</strong></div></div>
              <div className="flex"><div className="w-6 shrink-0">b.</div><div className="flex-1">Tahun/Masa Pajak: <strong>{data.taxPeriod}</strong></div></div>
              <div className="flex"><div className="w-6 shrink-0">c.</div><div className="flex-1">Kantor Pelayanan Pajak (KPP): <strong>{data.kppName}</strong></div></div>
            </div>
            <p>Ruang lingkup kuasa ini terbatas pada permohonan, pelaporan, penyampaian data/dokumen, penerimaan dokumen dari instansi terkait, dan penandatanganan dokumen perpajakan yang diperlukan sehubungan dengan jenis dan masa pajak di atas.</p>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PEMBERI KUASA</h3>
            <div className="pl-0 ml-0 space-y-2">
              <div className="flex"><div className="w-6 shrink-0">3.1.</div><div><p>Pemberi Kuasa berhak menerima laporan berkala dan/atau dokumen asli yang berhubungan dengan hasil pelaksanaan pekerjaan dari Penerima Kuasa.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">3.2.</div><div><p>Pemberi Kuasa wajib memberikan seluruh data, informasi, bukti transaksi, pembukuan, dan dokumen perpajakan lainnya yang sebenar-benarnya dan lengkap kepada Penerima Kuasa secara tepat waktu.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">3.3.</div><div><p>Pemberi Kuasa wajib membayar biaya jasa/honorarium (jika ada) sesuai dengan kesepakatan terpisah yang mengikat (Yaitu: {data.honorarium}).</p></div></div>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN PENERIMA KUASA</h3>
            <div className="pl-0 ml-0 space-y-2">
              <div className="flex"><div className="w-6 shrink-0">4.1.</div><div><p>Penerima Kuasa berwenang menghadap pejabat pemerintah di Direktorat Jenderal Pajak, meminta keterangan, serta melakukan tindakan hukum perpajakan yang dibenarkan oleh peraturan perundang-undangan sehubungan dengan kuasa ini.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">4.2.</div><div><p>Penerima Kuasa wajib menjaga kerahasiaan data dan informasi (<em>confidentiality</em>) milik Pemberi Kuasa dan tidak menyalahgunakannya untuk kepentingan pihak lain.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">4.3.</div><div><p>Penerima Kuasa <strong>{data.substitutionRight === 'Ya' ? 'BERHAK' : 'TIDAK BERHAK'}</strong> melimpahkan kuasa ini (Hak Substitusi) kepada pihak lain.</p></div></div>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 5<br/>KLAUSUL PELEPASAN TANGGUNG JAWAB (DISCLAIMER MATERIIL)</h3>
            <div className="pl-0 ml-0 space-y-2">
              <div className="flex"><div className="w-6 shrink-0">5.1.</div><div><p>Sesuai dengan ketentuan perundang-undangan yang berlaku, Pemberi Kuasa menyatakan bahwa <strong>segala kebenaran material menjadi tanggung jawab Wajib Pajak (Pemberi Kuasa), bukan Penerima Kuasa</strong>.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">5.2.</div><div><p>Penerima Kuasa tidak bertanggung jawab atas kerugian, denda administrasi, atau sanksi pidana yang timbul akibat kesalahan, kealpaan, maupun kesengajaan Pemberi Kuasa dalam memberikan data dan informasi yang tidak benar, palsu, maupun dipalsukan.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">5.3.</div><div><p>Pemberi Kuasa dengan ini membebaskan Penerima Kuasa dari segala bentuk tuntutan hukum, baik perdata maupun pidana, dari pihak manapun atas isi/materi dari dokumen pajak yang disiapkan berdasarkan data dari Pemberi Kuasa.</p></div></div>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 6<br/>MASA BERLAKU DAN PENGAKHIRAN KUASA</h3>
            <div className="pl-0 ml-0 space-y-2">
              <div className="flex"><div className="w-6 shrink-0">6.1.</div><div><p>Surat Kuasa ini berlaku efektif sejak tanggal ditandatangani hingga seluruh objek pajak yang dikuasakan sebagaimana dimaksud dalam Pasal 2 diselesaikan.</p></div></div>
              <div className="flex"><div className="w-6 shrink-0">6.2.</div><div><p>Pemberian kuasa ini dapat dicabut atau diakhiri setiap saat oleh Pemberi Kuasa secara tertulis dengan pemberitahuan kepada Penerima Kuasa dan Instansi Perpajakan terkait.</p></div></div>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 7<br/>KAHAR (FORCE MAJEURE)</h3>
            <div className="pl-0 ml-0 space-y-2">
              <p>Masing-masing pihak dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban dalam Surat Kuasa ini, yang disebabkan oleh kejadian di luar kendali wajar (Force Majeure) termasuk namun tidak terbatas pada bencana alam, pandemi, huru-hara, atau perubahan regulasi mendadak yang menghalangi pelaksanaan kuasa secara hukum.</p>
            </div>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 8<br/>PENYELESAIAN SENGKETA</h3>
            <div className="pl-0 ml-0 space-y-2">
              <p>Segala sengketa yang timbul dari atau terkait dengan interpretasi dan/atau pelaksanaan Surat Kuasa ini akan diselesaikan secara musyawarah untuk mufakat. Apabila mufakat tidak tercapai, para pihak sepakat untuk menyelesaikannya melalui Pengadilan Negeri yang yurisdiksinya mencakup wilayah tempat ditandatanganinya Surat Kuasa ini.</p>
            </div>
          </div>

        </div>

        {/* PENUTUP DAN TANDA TANGAN */}
        <div className="mt-8 break-inside-avoid">
          <p className="mb-8 text-justify">Demikian Surat Kuasa Khusus ini dibuat dengan sebenar-benarnya tanpa adanya paksaan dari pihak manapun, untuk digunakan sebagaimana mestinya.</p>
          
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <p className="font-bold mb-20 uppercase">PENERIMA KUASA</p>
              <p className="font-bold underline uppercase">{data.p2Name}</p>
              <p className="text-sm">NIK. {data.p2Nik}</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold mb-4 uppercase">PEMBERI KUASA</p>
              <div className="inline-block border border-slate-300 px-4 py-6 text-[8pt] text-slate-400 italic mb-4 bg-slate-50">
                Meterai<br/>Rp 10.000,-
              </div>
              <p className="font-bold underline uppercase">{data.p1Name}</p>
              <p className="text-sm">NIK. {data.p1Nik}</p>
            </div>
          </div>
        </div>

      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileText size={16} className="text-blue-500" /> <span>Surat Kuasa Pajak</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print / Download</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Formulir Draft Kuasa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              
              {/* META INFO */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Informasi Dokumen</h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Dokumen</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                 </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pihak Pertama (Pemberi Kuasa)</h3>
                 
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kapasitas Bertindak</label>
                   <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" value={data.p1Capacity} onChange={e => handleDataChange('p1Capacity', e.target.value as any)}>
                     <option value="Pribadi">Wajib Pajak Orang Pribadi</option>
                     <option value="Wakil Badan">Wakil Wajib Pajak Badan</option>
                   </select>
                 </div>

                 <div className="space-y-3">
                   <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                   <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="NIK KTP" />
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Npwp} onChange={e => handleDataChange('p1Npwp', e.target.value)} placeholder="NPWP Pribadi" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} placeholder="Tempat Lahir" />
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                   </div>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                   <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Lengkap KTP" />
                 </div>

                 {data.p1Capacity === 'Wakil Badan' && (
                   <div className="p-3 bg-blue-50 rounded-lg space-y-3 border border-blue-100">
                     <label className="text-[10px] font-bold text-blue-700 uppercase block border-b border-blue-200 pb-1">Data Wajib Pajak Badan</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Badan / Perusahaan" />
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1NpwpBadan} onChange={e => handleDataChange('p1NpwpBadan', e.target.value)} placeholder="NPWP Badan" />
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Jabatan} onChange={e => handleDataChange('p1Jabatan', e.target.value)} placeholder="Jabatan (Misal: Direktur Utama)" />
                     <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.p1CompanyAddress} onChange={e => handleDataChange('p1CompanyAddress', e.target.value)} placeholder="Alamat Domisili Badan" />
                   </div>
                 )}
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pihak Kedua (Penerima Kuasa)</h3>
                 
                 <div className="space-y-3">
                   <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                   <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK KTP" />
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Npwp} onChange={e => handleDataChange('p2Npwp', e.target.value)} placeholder="NPWP" />
                   </div>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2License} onChange={e => handleDataChange('p2License', e.target.value)} placeholder="No. Izin Konsultan Pajak (Opsional)" />
                   <div className="grid grid-cols-2 gap-3">
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} placeholder="Tempat Lahir" />
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                   </div>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                   <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap" />
                 </div>
              </div>

              {/* LINGKUP KUASA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Objek Pajak & Klausul</h3>
                 
                 <div className="space-y-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Pajak</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Masa/Tahun Pajak</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxPeriod} onChange={e => handleDataChange('taxPeriod', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">KPP Terdaftar</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.kppName} onChange={e => handleDataChange('kppName', e.target.value)} />
                   </div>
                   
                   <div className="pt-2 border-t border-slate-100">
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Hak Substitusi</label>
                     <div className="flex gap-4">
                       <label className="flex items-center gap-2 text-xs"><input type="radio" checked={data.substitutionRight === 'Ya'} onChange={() => handleDataChange('substitutionRight', 'Ya')} name="subst" /> Ya, bisa dilimpahkan</label>
                       <label className="flex items-center gap-2 text-xs"><input type="radio" checked={data.substitutionRight === 'Tidak'} onChange={() => handleDataChange('substitutionRight', 'Tidak')} name="subst" /> Tidak</label>
                     </div>
                   </div>
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ProxyContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Surat Kuasa Khusus Pajak" price={15000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ProxyContent /></div></div>
    </div>
  );
}
