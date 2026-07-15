'use client';

/**
 * FILE: IncomeStatementPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Penghasilan dan Kesepakatan Kerja Korporat
 * AUTHOR: LegalDrafterAgent
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  User, Briefcase, Wallet, Calculator, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- TYPE DEFINITIONS ---
interface IncomeData {
  p1Name: string;
  p1Jabatan: string;
  p1Perusahaan: string;
  p1Alamat: string;
  
  p2Name: string;
  p2Nik: string;
  p2TTL: string;
  p2Pekerjaan: string;
  p2Alamat: string;
  
  gajiPokok: number;
  tunjanganJabatan: number;
  tunjanganTransport: number;
  tunjanganMakan: number;
  
  bpjsKesehatan: number;
  bpjsTK: number;
  pph21: number;
  potonganLain: number;
  
  metodePembayaran: string;
  kota: string;
  tanggal: string;
}

const INITIAL_DATA: IncomeData = {
  p1Name: 'Budi Santoso',
  p1Jabatan: 'Direktur HRD',
  p1Perusahaan: 'PT Makmur Sejahtera Abadi',
  p1Alamat: 'Gedung Sudirman Tower Lt. 10, Jakarta Selatan',
  
  p2Name: 'Ahmad Fauzi',
  p2Nik: '3171010101800001',
  p2TTL: 'Jakarta, 15 Agustus 1990',
  p2Pekerjaan: 'Senior Software Engineer',
  p2Alamat: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
  
  gajiPokok: 15000000,
  tunjanganJabatan: 3000000,
  tunjanganTransport: 1000000,
  tunjanganMakan: 1000000,
  
  bpjsKesehatan: 150000,
  bpjsTK: 300000,
  pph21: 750000,
  potonganLain: 0,
  
  metodePembayaran: 'Transfer Bank BCA',
  kota: 'Jakarta',
  tanggal: ''
};

// --- HELPER FUNCTIONS ---
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

const terbilang = (angka: number): string => {
  const bilangan = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan','Sepuluh','Sebelas'];
  if (angka < 12) return bilangan[angka];
  if (angka < 20) return terbilang(angka - 10) + ' Belas';
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + ' Puluh ' + (angka % 10 !== 0 ? ' ' + terbilang(angka % 10) : '');
  if (angka < 200) return 'Seratus ' + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + ' Ratus ' + (angka % 100 !== 0 ? ' ' + terbilang(angka % 100) : '');
  if (angka < 2000) return 'Seribu ' + terbilang(angka - 1000);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + ' Ribu ' + (angka % 1000 !== 0 ? ' ' + terbilang(angka % 1000) : '');
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + ' Juta ' + (angka % 1000000 !== 0 ? ' ' + terbilang(angka % 1000000) : '');
  if (angka < 1000000000000) return terbilang(Math.floor(angka / 1000000000)) + ' Milyar ' + (angka % 1000000000 !== 0 ? ' ' + terbilang(angka % 1000000000) : '');
  return 'Nominal terlalu besar';
};

export default function IncomeStatementPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Dokumen...</div>}>
      <IncomeToolBuilder />
    </Suspense>
  );
}

function IncomeToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggal: today }));
  }, []);

  const handleDataChange = (field: keyof IncomeData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke data awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggal: today });
    }
  };

  const totalPendapatan = data.gajiPokok + data.tunjanganJabatan + data.tunjanganTransport + data.tunjanganMakan;
  const totalPotongan = data.bpjsKesehatan + data.bpjsTK + data.pph21 + data.potonganLain;
  const takeHomePay = totalPendapatan - totalPotongan;

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[25mm] print:p-[25mm] w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
          
        {/* HEADER DOKUMEN */}
        <div className="text-center mb-8 shrink-0">
            <h1 className="font-bold text-xl uppercase underline tracking-wide">SURAT KETERANGAN PENGHASILAN DAN KESEPAKATAN KERJA</h1>
            <p className="mt-1">Nomor: 045/HRD-SKP/{new Date(data.tanggal || Date.now()).getFullYear()}</p>
        </div>

        {/* PEMBUKA */}
        <div className="text-justify mb-4">
            <p className="mb-4">
                Pada hari ini, <strong>{formatDateSafe(data.tanggal)}</strong>, bertempat di <strong>{data.kota}</strong>, telah dibuat dan ditandatangani Surat Keterangan Penghasilan dan Kesepakatan Kerja (selanjutnya disebut "Perjanjian"), oleh dan antara:
            </p>

            {/* PIHAK PERTAMA */}
            <div className="ml-4 mb-4">
                <div className="flex mb-1">
                    <div className="w-6"><strong>I.</strong></div>
                    <div className="flex-1">
                        <div className="flex"><div className="w-40">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p1Name}</div></div>
                        <div className="flex"><div className="w-40">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.p1Jabatan}</div></div>
                        <div className="flex"><div className="w-40">Perusahaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Perusahaan}</div></div>
                        <div className="flex"><div className="w-40">Alamat Perusahaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Alamat}</div></div>
                    </div>
                </div>
                <div className="ml-6 mt-2">
                    Dalam hal ini bertindak dalam jabatannya tersebut, oleh karena itu sah mewakili Direksi dan bertindak untuk dan atas nama <strong>{data.p1Perusahaan}</strong>, yang selanjutnya disebut sebagai <strong>"PIHAK PERTAMA"</strong>.
                </div>
            </div>

            {/* PIHAK KEDUA */}
            <div className="ml-4 mb-6">
                <div className="flex mb-1">
                    <div className="w-6"><strong>II.</strong></div>
                    <div className="flex-1">
                        <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p2Name}</div></div>
                        <div className="flex"><div className="w-40">Nomor Induk KTP (NIK)</div><div className="w-4">:</div><div className="flex-1">{data.p2Nik}</div></div>
                        <div className="flex"><div className="w-40">Tempat/Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2TTL}</div></div>
                        <div className="flex"><div className="w-40">Jabatan/Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Pekerjaan}</div></div>
                        <div className="flex"><div className="w-40">Alamat Sesuai KTP</div><div className="w-4">:</div><div className="flex-1">{data.p2Alamat}</div></div>
                    </div>
                </div>
                <div className="ml-6 mt-2">
                    Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang selanjutnya disebut sebagai <strong>"PIHAK KEDUA"</strong>.
                </div>
            </div>

            <p className="mb-4">
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>"PARA PIHAK"</strong>. PARA PIHAK dengan ini sepakat untuk mengikatkan diri dalam Perjanjian ini dengan syarat dan ketentuan sebagaimana diuraikan dalam pasal-pasal berikut:
            </p>
        </div>

        {/* PASAL 1 */}
        <div className="mb-4">
            <h3 className="font-bold text-center mb-2">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-1 text-justify">
                    <li><strong>Perusahaan</strong> adalah badan usaha berbadan hukum yang diwakili oleh PIHAK PERTAMA sebagai pemberi kerja.</li>
                    <li><strong>Karyawan</strong> adalah orang perseorangan sebagaimana direpresentasikan oleh PIHAK KEDUA yang memberikan jasa dan tenaga kepada Perusahaan dengan menerima kompensasi berupa gaji atau penghasilan.</li>
                    <li><strong>Take Home Pay</strong> adalah jumlah penghasilan bersih yang diterima oleh PIHAK KEDUA setelah dikurangi dengan potongan-potongan resmi seperti pajak penghasilan, premi asuransi, dan kewajiban lainnya.</li>
                </ol>
            </div>
        </div>

        {/* PASAL 2 */}
        <div className="mb-4">
            <h3 className="font-bold text-center mb-2">PASAL 2<br/>STATUS, JABATAN, DAN LOKASI KERJA</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-1 text-justify">
                    <li>PIHAK KEDUA berstatus sebagai karyawan pada Perusahaan PIHAK PERTAMA dengan jabatan/posisi pekerjaan sebagai <strong>{data.p2Pekerjaan}</strong>.</li>
                    <li>PIHAK KEDUA wajib melaksanakan setiap tugas, tanggung jawab, dan kewajiban yang melekat pada jabatan tersebut dengan penuh dedikasi dan profesionalisme.</li>
                    <li>Surat Keterangan ini diterbitkan untuk merinci hak kompensasi serta sebagai bukti otentik kemampuan finansial PIHAK KEDUA berdasarkan catatan resmi Perusahaan.</li>
                </ol>
            </div>
        </div>

        {/* PASAL 3 */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 3<br/>RINCIAN KOMPONEN PENGHASILAN (BRUTO)</h3>
            <p className="text-justify mb-2">
                Berdasarkan evaluasi kinerja dan ketentuan Perusahaan, PIHAK KEDUA berhak mendapatkan kompensasi/penghasilan kotor bulanan dengan rincian sebagai berikut:
            </p>
            <div className="ml-8 mb-2 border border-black p-4 bg-gray-50 print:bg-transparent">
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1">
                    <span>1. Gaji Pokok</span>
                    <span>{formatRupiah(data.gajiPokok)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1">
                    <span>2. Tunjangan Jabatan</span>
                    <span>{formatRupiah(data.tunjanganJabatan)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1">
                    <span>3. Tunjangan Transportasi</span>
                    <span>{formatRupiah(data.tunjanganTransport)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1 mb-1 font-bold">
                    <span>4. Tunjangan Makan</span>
                    <span>{formatRupiah(data.tunjanganMakan)}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-lg mt-2">
                    <span>TOTAL PENGHASILAN (BRUTO)</span>
                    <span>{formatRupiah(totalPendapatan)}</span>
                </div>
            </div>
        </div>

        {/* PASAL 4 */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 4<br/>RINCIAN PEMOTONGAN</h3>
            <p className="text-justify mb-2">
                Sesuai dengan peraturan perundang-undangan perpajakan dan ketenagakerjaan Republik Indonesia yang berlaku, Total Penghasilan PIHAK KEDUA pada Pasal 3 dikenakan pemotongan sebagai berikut:
            </p>
            <div className="ml-8 mb-2 border border-black p-4 bg-gray-50 print:bg-transparent">
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1 text-red-700 print:text-black">
                    <span>1. Iuran BPJS Kesehatan (Pekerja)</span>
                    <span>{formatRupiah(data.bpjsKesehatan)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1 text-red-700 print:text-black">
                    <span>2. Iuran BPJS Ketenagakerjaan (JHT/JP Pekerja)</span>
                    <span>{formatRupiah(data.bpjsTK)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1 mb-1 text-red-700 print:text-black">
                    <span>3. Pajak Penghasilan (PPh 21)</span>
                    <span>{formatRupiah(data.pph21)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1 mb-1 text-red-700 print:text-black">
                    <span>4. Potongan Lainnya (Pinjaman/Denda/dll)</span>
                    <span>{formatRupiah(data.potonganLain)}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-lg mt-2">
                    <span>TOTAL POTONGAN</span>
                    <span>{formatRupiah(totalPotongan)}</span>
                </div>
            </div>
        </div>

        {/* PASAL 5 */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 5<br/>PENERIMAAN BERSIH (TAKE HOME PAY)</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-2 text-justify">
                    <li>Berdasarkan penjumlahan pada Pasal 3 dan pemotongan pada Pasal 4, maka penerimaan bersih (Take Home Pay) yang berhak diterima oleh PIHAK KEDUA setiap bulannya adalah sebesar <strong>{formatRupiah(takeHomePay)}</strong> <em>(Terbilang: {terbilang(takeHomePay).trim()} Rupiah)</em>.</li>
                    <li>Pembayaran Take Home Pay tersebut ditransfer atau dibayarkan langsung kepada PIHAK KEDUA melalui metode pembayaran <strong>{data.metodePembayaran}</strong> yang terdaftar atas nama PIHAK KEDUA.</li>
                    <li>PIHAK PERTAMA menjamin bahwa rincian pada Pasal 3, Pasal 4, dan Pasal 5 adalah benar, akurat, dan telah disesuaikan dengan laporan keuangan internal Perusahaan.</li>
                </ol>
            </div>
        </div>

        {/* PASAL 6 */}
        <div className="mb-4">
            <h3 className="font-bold text-center mb-2">PASAL 6<br/>HAK DAN KEWAJIBAN</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-1 text-justify">
                    <li><strong>Kewajiban PIHAK PERTAMA:</strong> Memenuhi seluruh hak kompensasi PIHAK KEDUA secara penuh dan tepat waktu sesuai dengan nominal Take Home Pay, serta menyetorkan potongan pajak dan BPJS kepada instansi terkait sesuai hukum yang berlaku.</li>
                    <li><strong>Kewajiban PIHAK KEDUA:</strong> Wajib menjaga kerahasiaan informasi internal Perusahaan, mencapai target kinerja, serta mematuhi seluruh Standar Operasional Prosedur (SOP) Perusahaan.</li>
                </ol>
            </div>
        </div>

        {/* PASAL 7 */}
        <div className="mb-4">
            <h3 className="font-bold text-center mb-2">PASAL 7<br/>FORCE MAJEURE (KEADAAN KAHAR)</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-1 text-justify">
                    <li>Dalam hal terjadi peristiwa di luar kendali wajar PARA PIHAK <em>(Force Majeure)</em> seperti bencana alam, kerusuhan, pandemi, atau kebijakan pemerintah yang menghalangi operasional bisnis secara masif, maka kewajiban pembayaran dalam dokumen ini dapat dinegosiasikan kembali.</li>
                    <li>Pihak yang mengalami Force Majeure harus memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari sejak terjadinya peristiwa tersebut.</li>
                </ol>
            </div>
        </div>

        {/* PASAL 8 */}
        <div className="mb-8 break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 8<br/>PENYELESAIAN PERSELISIHAN DAN PENUTUP</h3>
            <div className="ml-4">
                <ol className="list-decimal pl-4 space-y-1 text-justify">
                    <li>Apabila di kemudian hari timbul perbedaan penafsiran, perselisihan, atau sengketa terkait Keterangan Penghasilan ini, maka PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah untuk mufakat.</li>
                    <li>Apabila musyawarah tidak mencapai kesepakatan, maka diselesaikan melalui jalur hukum pada yurisdiksi Pengadilan Negeri yang menaungi wilayah tempat kedudukan PIHAK PERTAMA.</li>
                    <li>Surat Keterangan dan Kesepakatan ini dibuat dalam keadaan sadar, tanpa paksaan dari pihak manapun, serta dapat digunakan sebagaimana mestinya oleh PIHAK KEDUA (misal untuk pengajuan kredit, KPR, pengurusan visa, dsb).</li>
                </ol>
            </div>
        </div>

        {/* SIGNATURE AREA */}
        <div className="mt-8 pt-4 flex flex-col items-end w-full shrink-0 break-inside-avoid">
            <div className="w-full flex justify-between px-10">
                <div className="text-center w-64">
                    <p className="mb-8 font-bold">PIHAK KEDUA,</p>
                    <div className="h-24 flex items-center justify-center text-transparent">Tanda Tangan</div>
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
                    <p className="text-xs mt-1">{data.p2Pekerjaan}</p>
                </div>
                <div className="text-center w-64">
                    <p className="mb-1">{data.kota}, {formatDateSafe(data.tanggal)}</p>
                    <p className="mb-4 font-bold">PIHAK PERTAMA,</p>
                    <div className="h-24 flex items-center justify-center border border-dashed border-slate-200 text-[10px] text-slate-400 mb-2 print:border-black uppercase font-sans relative">
                        <span className="absolute">Materai 10.000 & Stempel Perusahaan</span>
                    </div>
                    <p className="font-bold underline uppercase">{data.p1Name}</p>
                    <p className="text-xs mt-1">{data.p1Jabatan} - {data.p1Perusahaan}</p>
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
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Calculator size={16} className="text-blue-500" /> <span>Corporate Salary Slip Generator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI - EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Data</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset ke Default"><RotateCcw size={16}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:overflow-visible print:bg-white">
              
              {/* PIHAK PERTAMA */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Pihak Pertama (Perusahaan)</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Pimpinan / HRD" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Jabatan} onChange={e => handleDataChange('p1Jabatan', e.target.value)} placeholder="Jabatan" />
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Perusahaan} onChange={e => handleDataChange('p1Perusahaan', e.target.value)} placeholder="Nama Perusahaan" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Alamat} onChange={e => handleDataChange('p1Alamat', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              {/* PIHAK KEDUA */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua (Karyawan)</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap Sesuai KTP" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK (16 Digit)" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2TTL} onChange={e => handleDataChange('p2TTL', e.target.value)} placeholder="Tempat, Tanggal Lahir" />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Pekerjaan} onChange={e => handleDataChange('p2Pekerjaan', e.target.value)} placeholder="Jabatan Pekerjaan Karyawan" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Alamat} onChange={e => handleDataChange('p2Alamat', e.target.value)} placeholder="Alamat Sesuai KTP" />
              </div>

              {/* PENGHASILAN */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Wallet size={12}/> Rincian Penghasilan</h3>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold">Gaji Pokok</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.gajiPokok} onChange={e => handleDataChange('gajiPokok', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold">Tunjangan Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.tunjanganJabatan} onChange={e => handleDataChange('tunjanganJabatan', parseInt(e.target.value) || 0)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Tunj. Transportasi</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.tunjanganTransport} onChange={e => handleDataChange('tunjanganTransport', parseInt(e.target.value) || 0)} />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Tunj. Makan</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.tunjanganMakan} onChange={e => handleDataChange('tunjanganMakan', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
              </div>

              {/* POTONGAN */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Calculator size={12}/> Rincian Potongan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">BPJS Kesehatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-red-700 focus:ring-2 focus:ring-red-500 outline-none" type="number" value={data.bpjsKesehatan} onChange={e => handleDataChange('bpjsKesehatan', parseInt(e.target.value) || 0)} />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">BPJS TK</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-red-700 focus:ring-2 focus:ring-red-500 outline-none" type="number" value={data.bpjsTK} onChange={e => handleDataChange('bpjsTK', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Pajak PPh 21</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-red-700 focus:ring-2 focus:ring-red-500 outline-none" type="number" value={data.pph21} onChange={e => handleDataChange('pph21', parseInt(e.target.value) || 0)} />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Potongan Lainnya</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-black text-red-700 focus:ring-2 focus:ring-red-500 outline-none" type="number" value={data.potonganLain} onChange={e => handleDataChange('potonganLain', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
              </div>

              {/* LAINNYA */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Pengesahan Dokumen</h3>
                <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.metodePembayaran} onChange={e => handleDataChange('metodePembayaran', e.target.value)}>
                    <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                    <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                    <option value="Transfer Bank BNI">Transfer Bank BNI</option>
                    <option value="Transfer Bank BRI">Transfer Bank BRI</option>
                    <option value="Tunai / Cash">Tunai / Cash</option>
                    <option value="Cek / Bilyet Giro">Cek / Bilyet Giro</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.kota} onChange={e => handleDataChange('kota', e.target.value)} placeholder="Kota Penerbitan" />
                  <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.tanggal} onChange={e => handleDataChange('tanggal', e.target.value)} />
                </div>
              </div>
           </div>
        </div>

        {/* PANEL KANAN - PREVIEW */}
 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Keterangan Penghasilan Korporat" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
