'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, ArrowLeftCircle, FileText, UserCircle2, 
  ShieldCheck, RotateCcw, Building2, Edit3, Check, X,
  AlertCircle, Briefcase, Scale, AlertTriangle
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
  p1Npwp: string;
  p1Pob: string;
  p1Dob: string;
  p1Job: string;
  p1Address: string;
  
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
  p2License: string; 

  // DETAIL URUSAN PAJAK
  taxType: string;
  taxPeriod: string;
  kppName: string;
  
  // RUANG LINGKUP
  scopeLaporMasa: boolean;
  scopeLaporTahunan: boolean;
  scopeAmbilDokumen: boolean;
  scopeSengketa: boolean;
  
  // BATASAN
  laranganRestitusi: boolean;
  
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
  p1Npwp: '12.345.678.9-012.000',
  p1Pob: 'Surabaya',
  p1Dob: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Sudirman Kav 10, RT 001 RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan',
  
  p1Company: 'PT MAJU BERSAMA PAJAK',
  p1NpwpBadan: '01.987.654.3-012.000',
  p1Jabatan: 'Direktur Utama',
  p1CompanyAddress: 'Gedung Menara Merdeka Lantai 5, Jl. MH Thamrin No.1, Jakarta Pusat',

  p2Name: 'DR. SITI AMINAH, S.E., M.Ak., BKP',
  p2Nik: '3179876543210002',
  p2Npwp: '98.765.432.1-012.000',
  p2Pob: 'Bandung',
  p2Dob: '1975-10-20',
  p2Address: 'Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan',
  p2Job: 'Konsultan Pajak',
  p2License: 'KEP-123/PJ/2020',

  taxType: 'Pajak Pertambahan Nilai (PPN) & Pajak Penghasilan (PPh) Badan',
  taxPeriod: 'Tahun Pajak 2025',
  kppName: 'KPP Wajib Pajak Besar Satu',
  
  scopeLaporMasa: true,
  scopeLaporTahunan: true,
  scopeAmbilDokumen: true,
  scopeSengketa: false,
  
  laranganRestitusi: true,
  
  substitutionRight: 'Tidak',
  honorarium: 'Sesuai dengan Perjanjian Jasa Konsultasi Terpisah Nomor: PJK/2026/089'
};

const validateNik = (nik: string) => /^\d{16}$/.test(nik.replace(/\D/g, ''));
const validateNpwp = (npwp: string) => {
  const digits = npwp.replace(/\D/g, '');
  return digits.length === 15 || digits.length === 16;
};

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Kuasa Pajak...</div>}>
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
    if (!data.date) {
      setData(prev => ({ ...prev, date: today }));
    }
  }, [data.date]);

  const handleDataChange = (field: keyof ProxyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Apakah Anda yakin ingin mereset seluruh formulir? Data akan kembali ke nilai bawaan.')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // Helper Input Validation Components
  const ValidatedInput = ({ 
    label, value, onChange, placeholder, validator, errorMessage 
  }: { 
    label: string, value: string, onChange: (val: string) => void, 
    placeholder?: string, validator: (v: string) => boolean, errorMessage: string 
  }) => {
    const isValid = validator(value);
    const isEmpty = value.trim() === '';
    const showWarning = !isEmpty && !isValid;
    return (
      <div className="w-full">
        <label className="text-[10px] font-bold text-slate-500 uppercase">{label}</label>
        <div className="relative">
          <input 
            className={`w-full p-2 pr-8 border rounded-lg text-xs focus:ring-2 outline-none transition-colors ${
              showWarning ? 'border-red-400 focus:ring-red-500 bg-red-50' : 
              (isValid ? 'border-emerald-400 focus:ring-emerald-500 bg-emerald-50' : 'border-slate-300 focus:ring-blue-500')
            }`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <div className="absolute right-2 top-2">
            {showWarning && <X size={16} className="text-red-500" />}
            {isValid && <Check size={16} className="text-emerald-600" />}
          </div>
        </div>
        {showWarning && <p className="text-[9px] text-red-500 mt-1 font-medium flex items-center gap-1"><AlertCircle size={10}/> {errorMessage}</p>}
      </div>
    );
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
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] print:min-h-0 p-[25mm] shadow-2xl print:shadow-none print:m-0 print:p-0 print:w-full mx-auto relative">
        
        {/* JUDUL DOKUMEN */}
        <div className="text-center mb-10 shrink-0">
          <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 mb-2">SURAT KUASA KHUSUS</h2>
          <p className="text-[11pt] font-bold uppercase tracking-widest">Nomor: {data.docNo}</p>
        </div>

        {/* PEMBUKAAN */}
        <div className="mb-6 text-justify">
          <p className="mb-4">
            Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong> bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
          </p>
          
          {/* PIHAK PERTAMA */}
          <div className="ml-4 mb-4">
             <div className="flex mb-1"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p1Name}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Induk Kependudukan</div><div className="w-4 shrink-0">:</div><div>{data.p1Nik}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Pokok Wajib Pajak</div><div className="w-4 shrink-0">:</div><div>{data.p1Npwp}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Tempat, Tanggal Lahir</div><div className="w-4 shrink-0">:</div><div>{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Pekerjaan</div><div className="w-4 shrink-0">:</div><div>{data.p1Job}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Lengkap</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p1Address}</div></div>
          </div>

          {data.p1Capacity === 'Wakil Badan' && (
            <div className="mb-4 text-justify">
              <p className="mb-2">Dalam hal ini bertindak dalam kapasitas jabatannya sebagai <strong>{data.p1Jabatan}</strong>, dari dan oleh karena itu bertindak untuk dan atas nama Wajib Pajak Badan:</p>
              <div className="ml-4">
                <div className="flex mb-1"><div className="w-48 shrink-0">Nama Badan Hukum</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p1Company}</div></div>
                <div className="flex mb-1"><div className="w-48 shrink-0">NPWP Badan</div><div className="w-4 shrink-0">:</div><div>{data.p1NpwpBadan}</div></div>
                <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Kedudukan Badan</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p1CompanyAddress}</div></div>
              </div>
            </div>
          )}
          
          <p className="mb-4">Selanjutnya dalam Surat Kuasa Khusus ini disebut sebagai <strong>PEMBERI KUASA</strong>.</p>
          <p className="mb-4">Pemberi Kuasa dengan ini memberikan kuasa, hak, dan wewenang penuh kepada:</p>

          {/* PIHAK KEDUA */}
          <div className="ml-4 mb-4">
             <div className="flex mb-1"><div className="w-48 shrink-0">Nama Lengkap</div><div className="w-4 shrink-0">:</div><div className="font-bold uppercase">{data.p2Name}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Induk Kependudukan</div><div className="w-4 shrink-0">:</div><div>{data.p2Nik}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Pokok Wajib Pajak</div><div className="w-4 shrink-0">:</div><div>{data.p2Npwp}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Nomor Izin Praktik</div><div className="w-4 shrink-0">:</div><div>{data.p2License || '-'}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Tempat, Tanggal Lahir</div><div className="w-4 shrink-0">:</div><div>{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Pekerjaan / Profesi</div><div className="w-4 shrink-0">:</div><div>{data.p2Job}</div></div>
             <div className="flex mb-1"><div className="w-48 shrink-0">Alamat Lengkap</div><div className="w-4 shrink-0">:</div><div className="text-justify">{data.p2Address}</div></div>
          </div>
          <p className="mb-6">Selanjutnya dalam Surat Kuasa Khusus ini disebut sebagai <strong>PENERIMA KUASA</strong>.</p>
          
          <p className="text-center font-bold tracking-widest uppercase text-sm mb-6 underline">-------------------------------------- K H U S U S --------------------------------------</p>

          <p className="mb-4 text-justify">
            Untuk dan atas nama PEMBERI KUASA selaku Wajib Pajak, mewakili dan/atau mendampingi PEMBERI KUASA dalam melaksanakan hak dan memenuhi kewajiban perpajakan berdasarkan ketentuan peraturan perundang-undangan di bidang perpajakan yang berlaku. Penunjukan Surat Kuasa ini tunduk dan diatur lebih lanjut berdasarkan ketentuan pasal-pasal di bawah ini:
          </p>
        </div>

        {/* PASAL-PASAL TANPA GRID/TABEL (MS WORD STYLE) */}
        <div className="flex-grow text-justify text-[11pt] space-y-4">
          
          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Pemberi Kuasa adalah Wajib Pajak sebagaimana disebutkan identitasnya di atas yang memberikan kuasa terkait urusan perpajakannya kepada Penerima Kuasa secara sah secara hukum.</li>
              <li className="pl-2">Penerima Kuasa adalah pihak yang telah memenuhi persyaratan sebagaimana diatur dalam peraturan perundang-undangan perpajakan yang ditunjuk oleh Pemberi Kuasa untuk melaksanakan hak dan/atau memenuhi kewajiban perpajakan tertentu.</li>
              <li className="pl-2">Kuasa Khusus ini bersifat limitatif, artinya Penerima Kuasa hanya diperkenankan melaksanakan wewenang yang secara tegas tertulis dan diberikan oleh Pemberi Kuasa dalam dokumen ini.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 2<br/>OBJEK DAN RUANG LINGKUP KUASA</h3>
            <p className="mb-2">Surat Kuasa ini diberikan secara khusus dalam kaitannya dengan penyelesaian urusan perpajakan dengan rincian objek sebagai berikut:</p>
            <ul className="list-[lower-alpha] pl-6 mb-2 space-y-1 font-bold">
              <li className="pl-2">Jenis Pajak: {data.taxType}</li>
              <li className="pl-2">Tahun/Masa Pajak: {data.taxPeriod}</li>
              <li className="pl-2">Unit Instansi (KPP): {data.kppName}</li>
            </ul>
            <p className="mb-2">Adapun ruang lingkup kewenangan Penerima Kuasa dibatasi secara tegas untuk melakukan tindakan-tindakan berikut:</p>
            <ol className="list-decimal pl-6 space-y-1">
              {data.scopeLaporMasa && <li className="pl-2">Menyiapkan, menandatangani, dan menyampaikan Surat Pemberitahuan (SPT) Masa;</li>}
              {data.scopeLaporTahunan && <li className="pl-2">Menyiapkan, menandatangani, dan menyampaikan Surat Pemberitahuan (SPT) Tahunan;</li>}
              {data.scopeAmbilDokumen && <li className="pl-2">Meminta, menerima, dan menandatangani Berita Acara atau dokumen administrasi perpajakan yang diterbitkan oleh instansi terkait;</li>}
              {data.scopeSengketa && <li className="pl-2">Mewakili Pemberi Kuasa dalam proses pemeriksaan pajak, keberatan, banding, maupun peninjauan kembali di Pengadilan Pajak;</li>}
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 3<br/>PEMBATASAN WEWENANG MUTLAK</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">
                Penerima Kuasa tidak diberikan wewenang untuk melakukan tindakan di luar ruang lingkup yang disebutkan pada Pasal 2.
              </li>
              {data.laranganRestitusi && (
                <li className="pl-2 font-bold underline">
                  Penerima Kuasa dengan ini dilarang keras untuk mengajukan permohonan restitusi, mencairkan dana restitusi pajak, maupun menandatangani surat perintah pemindahbukuan (Pbk) ke rekening yang tidak atas nama Wajib Pajak (Pemberi Kuasa).
                </li>
              )}
              <li className="pl-2">Penerima Kuasa tidak memiliki kapasitas untuk memindahtangankan, menjual, ataupun menjaminkan aset milik Pemberi Kuasa untuk tujuan penyelesaian utang pajak tanpa persetujuan tertulis secara terpisah.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN PEMBERI KUASA</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Pemberi Kuasa berhak menuntut profesionalisme, integritas, dan penerimaan laporan berkala dari Penerima Kuasa atas setiap proses yang dijalankan.</li>
              <li className="pl-2">Pemberi Kuasa wajib menyediakan dan memberikan seluruh dokumen, bukti transaksi, mutasi rekening, catatan pembukuan, serta informasi material yang sebenar-benarnya tanpa ada yang ditutupi.</li>
              <li className="pl-2">Pemberi Kuasa berkewajiban melakukan pembayaran biaya jasa dan honorarium kepada Penerima Kuasa yang disepakati sebagaimana merujuk pada: <strong>{data.honorarium}</strong>.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 5<br/>HAK DAN KEWAJIBAN PENERIMA KUASA</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Penerima Kuasa berhak dan berwenang penuh untuk menghadap Pejabat Direktorat Jenderal Pajak (DJP), memberikan keterangan lisan maupun tertulis sejauh relevan dengan kewenangan di Pasal 2.</li>
              <li className="pl-2">Penerima Kuasa wajib memegang teguh prinsip kerahasiaan (<em>Non-Disclosure</em>) atas seluruh data finansial maupun dokumen Wajib Pajak dan dilarang membocorkannya kepada pihak ketiga.</li>
              <li className="pl-2">Penerima Kuasa <strong>{data.substitutionRight === 'Ya' ? 'DIBERIKAN HAK' : 'TIDAK DIBERIKAN HAK'}</strong> substitusi untuk melimpahkan seluruh atau sebagian kuasanya kepada pihak lain.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 6<br/>KLAUSUL PELEPASAN TANGGUNG JAWAB (DISCLAIMER MATERIIL)</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Berdasarkan prinsip hukum <em>Self Assessment</em>, Pemberi Kuasa menyatakan bahwa <strong>seluruh kebenaran materiil atas angka, pajak terutang, dan substansi transaksi mutlak menjadi tanggung jawab Wajib Pajak</strong>, dan bukan tanggung jawab Penerima Kuasa.</li>
              <li className="pl-2">Penerima Kuasa dibebaskan secara penuh dari sanksi administratif perpajakan (denda, bunga, kenaikan) maupun sanksi pidana yang diakibatkan oleh penyerahan data atau dokumen palsu yang secara sengaja atau tidak sengaja diberikan oleh Pemberi Kuasa.</li>
              <li className="pl-2">Penerima Kuasa dibebaskan dari segala bentuk tuntutan ganti rugi perdata maupun pidana dari Pemberi Kuasa atas keputusan Direktorat Jenderal Pajak yang mengikat secara hukum akibat ketidaklengkapan data Wajib Pajak.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 7<br/>MASA BERLAKU DAN PENGAKHIRAN KUASA</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Surat Kuasa ini mulai berlaku secara efektif sejak tanggal ditandatanganinya akta dokumen ini oleh para pihak.</li>
              <li className="pl-2">Kuasa ini berakhir secara otomatis jika urusan yang disebutkan pada Pasal 2 telah diselesaikan secara tuntas atau ada pencabutan tertulis secara sepihak dari Pemberi Kuasa yang diserahkan ke instansi pajak.</li>
            </ol>
          </div>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 8<br/>KAHAR (FORCE MAJEURE) DAN PENYELESAIAN SENGKETA</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="pl-2">Tidak ada satu pihak pun yang dapat dimintakan pertanggungjawaban atas keterlambatan penyelesaian kewajiban jika hal itu diakibatkan oleh kondisi Kahar (bencana alam, huru-hara, <em>system down</em> dari server DJP, atau perubahan drastis regulasi oleh Pemerintah).</li>
              <li className="pl-2">Semua perselisihan yang timbul akan diupayakan untuk diselesaikan secara musyawarah untuk mufakat. Apabila gagal, maka para pihak sepakat memilih kedudukan hukum yang tetap pada Kepaniteraan Pengadilan Negeri tempat domisili Pemberi Kuasa.</li>
            </ol>
          </div>

        </div>

        {/* PENUTUP DAN TANDA TANGAN */}
        <div className="mt-8 break-inside-avoid">
          <p className="mb-8 text-justify">Demikian Surat Kuasa Khusus ini dibuat dengan sebenar-benarnya, dalam keadaan sadar dan tanpa paksaan atau tekanan dari pihak manapun, untuk digunakan sebagai landasan hukum berlakunya kewenangan kepengurusan perpajakan tersebut.</p>
          
          <div className="flex justify-between mt-4">
            <div className="text-center w-[40%]">
              <p className="font-bold mb-24 uppercase">PENERIMA KUASA</p>
              <p className="font-bold underline uppercase">{data.p2Name}</p>
              <p className="text-sm">NIK. {data.p2Nik}</p>
            </div>
            
            <div className="text-center w-[40%]">
              <p className="font-bold mb-4 uppercase">PEMBERI KUASA</p>
              <div className="inline-block border border-slate-400 px-4 py-6 text-[8pt] text-slate-500 italic mb-4 bg-slate-50">
                Meterai Tempel<br/>Rp 10.000,-
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
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
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
               <ShieldCheck size={16} className="text-blue-500" /> <span>Legal Drafting: Surat Kuasa Pajak</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans shadow-sm">
             <h2 className="font-black text-[11px] uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-600" /> Parameter Dokumen</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Reset Formulir"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              {/* META INFO */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Administrasi Surat</h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat TTD</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Registrasi Dokumen</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                 </div>
              </div>

              {/* PIHAK PERTAMA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-blue-500">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Wajib Pajak (Pemberi Kuasa)</h3>
                 
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kapasitas Hukum</label>
                   <select className="w-full p-2 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50 text-blue-800" value={data.p1Capacity} onChange={e => handleDataChange('p1Capacity', e.target.value as any)}>
                     <option value="Pribadi">Wajib Pajak Orang Pribadi</option>
                     <option value="Wakil Badan">Wakil Wajib Pajak Badan</option>
                   </select>
                 </div>

                 <div className="space-y-3 pt-2">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap (Sesuai KTP)</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap" />
                   </div>
                   
                   <ValidatedInput 
                     label="Nomor Induk Kependudukan (NIK)"
                     value={data.p1Nik} 
                     onChange={(val) => handleDataChange('p1Nik', val)} 
                     placeholder="16 Digit NIK KTP"
                     validator={validateNik}
                     errorMessage="NIK harus berisi tepat 16 digit angka"
                   />
                   
                   <ValidatedInput 
                     label="NPWP Pribadi"
                     value={data.p1Npwp} 
                     onChange={(val) => handleDataChange('p1Npwp', val)} 
                     placeholder="15 atau 16 Digit NPWP"
                     validator={validateNpwp}
                     errorMessage="NPWP harus berisi 15 atau 16 digit angka"
                   />

                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} placeholder="Kota Lahir" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                     </div>
                   </div>
                   
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                   </div>
                   
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili KTP</label>
                     <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" />
                   </div>
                 </div>

                 {data.p1Capacity === 'Wakil Badan' && (
                   <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200 mt-4">
                     <label className="text-[10px] font-bold text-slate-800 uppercase block border-b border-slate-200 pb-1 flex items-center gap-2"><Briefcase size={12}/> Entitas Korporasi</label>
                     
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Badan Hukum</label>
                       <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="PT / CV / Yayasan" />
                     </div>
                     
                     <ValidatedInput 
                       label="NPWP Badan"
                       value={data.p1NpwpBadan} 
                       onChange={(val) => handleDataChange('p1NpwpBadan', val)} 
                       placeholder="15 atau 16 Digit NPWP Perusahaan"
                       validator={validateNpwp}
                       errorMessage="NPWP Badan harus berisi 15 atau 16 digit angka"
                     />
                     
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Wakil</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Jabatan} onChange={e => handleDataChange('p1Jabatan', e.target.value)} placeholder="Contoh: Direktur Utama" />
                     </div>
                     
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kedudukan Badan</label>
                       <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.p1CompanyAddress} onChange={e => handleDataChange('p1CompanyAddress', e.target.value)} placeholder="Alamat Resmi Perusahaan" />
                     </div>
                   </div>
                 )}
              </div>

              {/* PIHAK KEDUA */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-emerald-500">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Penerima Kuasa (Konsultan)</h3>
                 
                 <div className="space-y-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Penerima Kuasa" />
                   </div>
                   
                   <ValidatedInput 
                     label="Nomor Induk Kependudukan (NIK)"
                     value={data.p2Nik} 
                     onChange={(val) => handleDataChange('p2Nik', val)} 
                     placeholder="16 Digit NIK KTP"
                     validator={validateNik}
                     errorMessage="NIK harus berisi tepat 16 digit angka"
                   />
                   
                   <ValidatedInput 
                     label="NPWP Pribadi"
                     value={data.p2Npwp} 
                     onChange={(val) => handleDataChange('p2Npwp', val)} 
                     placeholder="15 atau 16 Digit NPWP"
                     validator={validateNpwp}
                     errorMessage="NPWP harus berisi 15 atau 16 digit angka"
                   />
                   
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Izin Praktik Konsultan (Opsional)</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2License} onChange={e => handleDataChange('p2License', e.target.value)} placeholder="KEP-.../PJ/..." />
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} placeholder="Kota Lahir" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                     </div>
                   </div>
                   
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Profesi / Pekerjaan" />
                   </div>
                   
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Korespondensi</label>
                     <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap" />
                   </div>
                 </div>
              </div>

              {/* LINGKUP KUASA & BATASAN */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-amber-500">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Objek & Batasan Wewenang</h3>
                 
                 <div className="space-y-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Pajak</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} placeholder="Misal: PPN & PPh Badan" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Masa / Tahun Pajak</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxPeriod} onChange={e => handleDataChange('taxPeriod', e.target.value)} placeholder="Misal: Tahun Pajak 2025" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Instansi Pajak (KPP)</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.kppName} onChange={e => handleDataChange('kppName', e.target.value)} placeholder="Nama KPP Terdaftar" />
                   </div>
                   
                   <div className="pt-3 border-t border-slate-100">
                     <label className="text-[10px] font-bold text-slate-700 uppercase mb-2 block">Hak & Kewenangan (Checklist)</label>
                     <div className="space-y-2">
                       <label className="flex items-center gap-2 text-xs cursor-pointer">
                         <input type="checkbox" className="accent-amber-600 w-4 h-4" checked={data.scopeLaporMasa} onChange={(e) => handleDataChange('scopeLaporMasa', e.target.checked)} /> Lapor SPT Masa
                       </label>
                       <label className="flex items-center gap-2 text-xs cursor-pointer">
                         <input type="checkbox" className="accent-amber-600 w-4 h-4" checked={data.scopeLaporTahunan} onChange={(e) => handleDataChange('scopeLaporTahunan', e.target.checked)} /> Lapor SPT Tahunan
                       </label>
                       <label className="flex items-center gap-2 text-xs cursor-pointer">
                         <input type="checkbox" className="accent-amber-600 w-4 h-4" checked={data.scopeAmbilDokumen} onChange={(e) => handleDataChange('scopeAmbilDokumen', e.target.checked)} /> Ambil/Tanda Tangan Dokumen
                       </label>
                       <label className="flex items-center gap-2 text-xs cursor-pointer">
                         <input type="checkbox" className="accent-amber-600 w-4 h-4" checked={data.scopeSengketa} onChange={(e) => handleDataChange('scopeSengketa', e.target.checked)} /> Kuasa Pendampingan Sengketa
                       </label>
                     </div>
                   </div>

                   <div className="pt-3 border-t border-slate-100 bg-red-50 p-3 rounded-lg border border-red-100">
                     <label className="text-[10px] font-bold text-red-700 uppercase mb-2 flex items-center gap-1"><AlertTriangle size={12}/> Klausul Limitasi / Larangan</label>
                     <label className="flex items-start gap-2 text-[11px] text-red-900 leading-tight cursor-pointer">
                       <input type="checkbox" className="accent-red-600 w-4 h-4 shrink-0 mt-0.5" checked={data.laranganRestitusi} onChange={(e) => handleDataChange('laranganRestitusi', e.target.checked)} /> 
                       Tolak kuasa mencairkan/meminta restitusi secara mutlak (Proteksi Keamanan Dana Wajib Pajak).
                     </label>
                   </div>
                   
                   <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Hak Substitusi (Limpah Kuasa)</label>
                       <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.substitutionRight} onChange={e => handleDataChange('substitutionRight', e.target.value)}>
                         <option value="Ya">Ya, Boleh</option>
                         <option value="Tidak">Tidak Boleh</option>
                       </select>
                     </div>
                   </div>

                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Klausul Honorarium</label>
                     <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={data.honorarium} onChange={e => handleDataChange('honorarium', e.target.value)} placeholder="Aturan Fee / Honorarium" />
                   </div>
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-300/50 rounded-tl-2xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.95] 2xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-50mm] lg:mb-[-20mm] xl:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <ProxyContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs transition-colors ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs transition-colors ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-options" className="no-print">
         <PrintWrapper documentName="Surat Kuasa Pengurusan Pajak" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><ProxyContent /></div></div>
    </div>
  );
}
