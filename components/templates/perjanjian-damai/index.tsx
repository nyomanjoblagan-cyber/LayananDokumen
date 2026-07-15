'use client';

/**
 * FILE: PerjanjianDamaiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Perdamaian (Settlement Agreement) - Enterprise Grade
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  HeartHandshake, ShieldAlert, Users, Scale, CalendarDays, FileText, User, Edit3, Eye, RotateCcw, ArrowLeftCircle, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SettlementData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Pelaku/Penanggung)
  p1Name: string;
  p1Nik: string;
  p1BirthPlace: string;
  p1BirthDate: string;
  p1Job: string;
  p1Address: string;
  
  // Pihak 2 (Korban/Penerima)
  p2Name: string;
  p2Nik: string;
  p2BirthPlace: string;
  p2BirthDate: string;
  p2Job: string;
  p2Address: string;
  
  // Insiden
  incidentTitle: string;
  incidentDate: string;
  incidentDetail: string;
  
  // Kesepakatan
  compensationAmount: string;
  compensationText: string;
  compensationMethod: 'Tunai' | 'Transfer Bank' | 'Cicilan';
  settlementDetail: string;
  
  // Pelarangan & Penalti
  penaltyAmount: string;
  penaltyText: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SettlementData = {
  day: 'SENIN',
  date: '', 
  city: 'JAKARTA',
  
  p1Name: 'BUDI SANTOSO', 
  p1Nik: '3171010101780001',
  p1BirthPlace: 'Jakarta',
  p1BirthDate: '1978-01-01',
  p1Job: 'Wiraswasta', 
  p1Address: 'Jl. Merdeka No. 10, RT 01/02, Kelurahan Tebet Barat, Kecamatan Tebet, Jakarta Selatan',
  
  p2Name: 'ANDI WIJAYA', 
  p2Nik: '3171020202920005',
  p2BirthPlace: 'Bandung',
  p2BirthDate: '1992-02-02',
  p2Job: 'Karyawan Swasta', 
  p2Address: 'Jl. Sudirman No. 45, RT 05/03, Kelurahan Karet, Kecamatan Setiabudi, Jakarta Selatan',
  
  incidentTitle: 'Kecelakaan Lalu Lintas',
  incidentDate: '2026-01-05',
  incidentDetail: 'Kecelakaan lalu lintas ringan di area Parkir Mal Senayan yang mengakibatkan kerusakan pada bemper depan mobil Pihak Kedua serta lecet pada pintu samping mobil Pihak Pertama.',
  
  compensationAmount: 'Rp 2.500.000,-',
  compensationText: 'Dua Juta Lima Ratus Ribu Rupiah',
  compensationMethod: 'Tunai',
  settlementDetail: 'Pihak Pertama menanggung seluruh biaya perbaikan kendaraan Pihak Kedua di bengkel resmi sesuai kuitansi yang terlampir.',
  
  penaltyAmount: 'Rp 50.000.000,-',
  penaltyText: 'Lima Puluh Juta Rupiah',
  
  witness1: 'HENDRA SAPUTRA (Ketua RT)', 
  witness2: 'SITI AMINAH (Saksi Mata)'
};

// --- 3. KOMPONEN UTAMA ---
export default function PerjanjianDamaiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <DamaiBuilder />
    </Suspense>
  );
}

function DamaiBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SettlementData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SettlementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Draft Notaris)' : 'Compact Rapi (1 Hal)';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0 font-serif text-slate-900 leading-normal text-[11pt]">
        {/* TEMPLATE 1: FORMAL (ENTERPRISE / NOTARIS GRADE) */}
        {templateId === 1 && (
          <>
            {/* HALAMAN 1 */}
            <div className="bg-white flex flex-col box-border p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto mb-8 print:mb-0">
                <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                  <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN PERDAMAIAN (DADING)</h1>
                </div>

                <div className="flex-grow">
                  <p className="mb-4 text-justify">
                    Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
                  </p>

                  <div className="ml-4 mb-4 text-[11pt] shrink-0 break-inside-avoid">
                    <div className="flex mb-1">
                      <div className="w-8">1.</div>
                      <div className="flex-1">
                        <div className="flex"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                        <div className="flex"><div className="w-40">N I K</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                        <div className="flex"><div className="w-40">Tempat/Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1BirthPlace}, {formatDateSafe(data.p1BirthDate)}</div></div>
                        <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                        <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 italic text-justify">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                    </div>
                  </div>

                  <div className="ml-4 mb-6 text-[11pt] shrink-0 break-inside-avoid">
                    <div className="flex mb-1">
                      <div className="w-8">2.</div>
                      <div className="flex-1">
                        <div className="flex"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                        <div className="flex"><div className="w-40">N I K</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                        <div className="flex"><div className="w-40">Tempat/Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2BirthPlace}, {formatDateSafe(data.p2BirthDate)}</div></div>
                        <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                        <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 italic text-justify">
                      Dalam hal ini bertindak untuk dan atas nama diri sendiri, yang untuk selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                    </div>
                  </div>

                  <p className="mb-4 text-justify">
                    PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:
                  </p>

                  <ol className="list-[lower-alpha] pl-8 mb-6 text-justify space-y-2">
                    <li>Bahwa, pada tanggal <strong>{formatDateSafe(data.incidentDate)}</strong> telah terjadi suatu peristiwa <strong>{data.incidentTitle}</strong> antara PIHAK PERTAMA dan PIHAK KEDUA.</li>
                    <li>Bahwa, adapun rincian atas peristiwa tersebut adalah sebagai berikut: <br/> <em>"{data.incidentDetail}"</em></li>
                    <li>Bahwa, guna menyelesaikan perselisihan akibat peristiwa tersebut, PARA PIHAK sepakat untuk menyelesaikan permasalahan ini secara kekeluargaan melalui Perjanjian Perdamaian (Dading) sesuai dengan ketentuan Pasal 1338 jo. Pasal 1851 Kitab Undang-Undang Hukum Perdata.</li>
                  </ol>

                  <p className="mb-4 text-justify">
                    Berdasarkan uraian tersebut di atas, PARA PIHAK dengan kesadaran penuh dan tanpa adanya paksaan dari pihak manapun, sepakat untuk mengikatkan diri dalam Perjanjian Perdamaian dengan syarat-syarat dan ketentuan sebagai berikut:
                  </p>

                  <div className="break-inside-avoid">
                    <div className="text-center font-bold mt-4 mb-2 uppercase">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</div>
                    <p className="text-justify mb-2">Dalam Perjanjian Perdamaian ini, yang dimaksud dengan:</p>
                    <ol className="list-decimal pl-8 text-justify space-y-1">
                      <li><strong>Perjanjian Perdamaian (Dading)</strong> adalah suatu persetujuan yang dibuat oleh PARA PIHAK untuk mencegah atau mengakhiri suatu perkara yang sedang berlangsung maupun yang akan datang.</li>
                      <li><strong>Ganti Rugi</strong> adalah kompensasi sejumlah uang atau perbaikan materiil yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA sebagaimana disepakati dalam Perjanjian ini.</li>
                    </ol>
                  </div>

                  <div className="break-inside-avoid">
                    <div className="text-center font-bold mt-6 mb-2 uppercase">PASAL 2<br/>OBJEK PERDAMAIAN</div>
                    <ol className="list-decimal pl-8 text-justify space-y-1">
                      <li>Objek perdamaian dalam Perjanjian ini adalah penyelesaian masalah atas perselisihan/insiden <strong>{data.incidentTitle}</strong> yang terjadi pada tanggal {formatDateSafe(data.incidentDate)}.</li>
                      <li>PARA PIHAK secara bersama-sama mengikatkan diri bahwa penyelesaian atas objek perdamaian ini tunduk dan patuh pada ketentuan yang diatur pada pasal-pasal berikutnya.</li>
                    </ol>
                  </div>
                </div>

                <div className="text-right mt-auto text-[10px] text-slate-300 italic font-sans">Halaman 1 dari 3</div>
            </div>

            {/* HALAMAN 2 */}
            <div className="bg-white flex flex-col box-border p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto mb-8 print:mb-0">
                <div className="space-y-4 text-justify flex-grow">
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-4 mb-2 uppercase">PASAL 3<br/>KESEPAKATAN DAN MEKANISME GANTI RUGI</div>
                      <ol className="list-decimal pl-8 text-justify space-y-2">
                        <li>
                          PIHAK PERTAMA menyatakan kesediaannya dan mengikatkan diri untuk memberikan Ganti Rugi kepada PIHAK KEDUA berupa uang tunai sebesar <strong>{data.compensationAmount}</strong> <em>({data.compensationText})</em>.
                        </li>
                        <li>
                          Ganti Rugi sebagaimana dimaksud pada Ayat 1 akan dibayarkan melalui metode <strong>{data.compensationMethod}</strong> oleh PIHAK PERTAMA kepada PIHAK KEDUA.
                        </li>
                        <li>
                          Adapun rincian teknis kesepakatan ganti rugi adalah sebagai berikut:<br/>
                          <em>"{data.settlementDetail}"</em>
                        </li>
                        <li>
                          Tanda terima atas pembayaran dan/atau perbaikan materiil tersebut akan menjadi bukti sah penyelesaian kewajiban PIHAK PERTAMA dan merupakan bagian yang tidak terpisahkan dari Perjanjian ini.
                        </li>
                      </ol>
                  </div>

                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-6 mb-2 uppercase">PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK</div>
                      <ol className="list-decimal pl-8 text-justify space-y-2">
                        <li>
                          <strong>Hak dan Kewajiban PIHAK PERTAMA:</strong>
                          <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>Berkewajiban penuh untuk memenuhi seluruh kesepakatan ganti rugi dan kompensasi sebagaimana diatur dalam Pasal 3.</li>
                            <li>Berhak mendapatkan jaminan dari PIHAK KEDUA bahwa permasalahan telah diselesaikan secara damai dan tidak akan ada tuntutan hukum lanjutan.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Hak dan Kewajiban PIHAK KEDUA:</strong>
                          <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>Berhak menerima ganti rugi secara utuh sebagaimana disepakati dalam Pasal 3.</li>
                            <li>Berkewajiban untuk tidak memperpanjang permasalahan, baik secara perdata, pidana, maupun aduan administratif kepada pihak yang berwajib setelah kompensasi diterima secara penuh.</li>
                          </ul>
                        </li>
                      </ol>
                  </div>

                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-6 mb-2 uppercase">PASAL 5<br/>PELEPASAN HAK DAN PELARANGAN PENUNTUTAN</div>
                      <ol className="list-decimal pl-8 text-justify space-y-2">
                        <li>
                          Dengan disepakatinya dan ditandatanganinya Perjanjian Perdamaian ini, maka PIHAK KEDUA menyatakan permasalahan hukum dan perselisihan atas insiden <strong>{data.incidentTitle}</strong> telah <strong>SELESAI</strong> secara kekeluargaan.
                        </li>
                        <li>
                          PIHAK KEDUA mengikatkan diri untuk <strong>melepaskan segala haknya</strong> untuk menuntut, melaporkan, dan/atau menggugat PIHAK PERTAMA, baik di ranah hukum Pidana (Kepolisian RI) maupun Perdata (Pengadilan Negeri), baik sekarang maupun di masa yang akan datang.
                        </li>
                        <li>
                          Apabila di kemudian hari terbukti PIHAK KEDUA melanggar ketentuan pelarangan penuntutan sebagaimana diatur pada Ayat 2, maka PIHAK KEDUA bersedia mencabut laporannya/gugatannya tersebut, dan wajib membayarkan <strong>Ganti Rugi Materiil</strong> kepada PIHAK PERTAMA sebesar <strong>{data.penaltyAmount}</strong> <em>({data.penaltyText})</em> secara seketika dan sekaligus.
                        </li>
                      </ol>
                  </div>

                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-6 mb-2 uppercase">PASAL 6<br/>PERNYATAAN KEKELUARGAAN</div>
                      <p className="pl-8 text-justify">
                        PARA PIHAK sepakat untuk memulihkan hubungan baik, saling memaafkan, dan menjaga nama baik masing-masing pihak atas peristiwa yang telah terjadi, serta berkomitmen untuk tidak menyebarluaskan, mempublikasikan, maupun memviralkan kejadian tersebut di media cetak, elektronik, maupun media sosial apapun.
                      </p>
                  </div>
                </div>
                <div className="text-right mt-auto text-[10px] text-slate-300 italic font-sans">Halaman 2 dari 3</div>
            </div>

            {/* HALAMAN 3 */}
            <div className="bg-white flex flex-col box-border p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
                <div className="space-y-4 text-justify flex-grow">
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-4 mb-2 uppercase">PASAL 7<br/>PENYELESAIAN SENGKETA DAN FORCE MAJEURE</div>
                      <ol className="list-decimal pl-8 text-justify space-y-2">
                        <li>
                          Perjanjian ini tunduk dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia.
                        </li>
                        <li>
                          Apabila di kemudian hari timbul perbedaan pendapat atau sengketa dalam pelaksanaan Perjanjian Perdamaian ini, maka PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah untuk mufakat.
                        </li>
                        <li>
                          Dalam hal terjadi <em>Force Majeure</em> (Keadaan Kahar) yang meliputi bencana alam, peperangan, huru-hara, atau kebijakan pemerintah yang menghalangi pelaksanaan Perjanjian ini, maka pihak yang mengalaminya terbebas dari kewajiban pelaksanaan selama keadaan kahar tersebut berlangsung, dengan syarat wajib memberitahukan kepada pihak lainnya selambatnya 7 (tujuh) hari sejak terjadinya keadaan kahar tersebut.
                        </li>
                      </ol>
                  </div>

                  <div className="break-inside-avoid">
                      <div className="text-center font-bold mt-6 mb-2 uppercase">PASAL 8<br/>PENUTUP</div>
                      <ol className="list-decimal pl-8 text-justify space-y-2">
                        <li>
                          Perjanjian Perdamaian (Dading) ini berlaku dan mengikat secara hukum bagi PARA PIHAK sejak ditandatangani.
                        </li>
                        <li>
                          Perjanjian Perdamaian ini dibuat dalam 2 (dua) rangkap asli, masing-masing dibubuhi meterai yang cukup, dan mempunyai kekuatan pembuktian hukum yang sama bagi PIHAK PERTAMA dan PIHAK KEDUA.
                        </li>
                      </ol>
                  </div>

                </div>

                <div className="break-inside-avoid shrink-0" style={{ pageBreakInside: 'avoid' }}>
                  <p className="mt-8 text-justify indent-8">
                    Demikian Perjanjian Perdamaian ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sehat jasmani dan rohani, secara sadar, tanpa adanya paksaan, tekanan, maupun tipu muslihat dari pihak manapun.
                  </p>

                  <div className="mt-12">
                  <div className="grid grid-cols-2 gap-8 text-center mb-12">
                      <div>
                          <p className="mb-2 font-bold uppercase text-[10pt]">PIHAK PERTAMA</p>
                          <div className="h-28 flex flex-col justify-end">
                            <div className="border border-slate-400 w-28 h-16 mx-auto mb-[-2.5rem] flex items-center justify-center text-[10px] text-slate-500 italic uppercase">Meterai<br/>Rp 10.000,-</div>
                            <p className="font-bold underline uppercase relative z-10">{data.p1Name}</p>
                          </div>
                      </div>
                      <div>
                          <p className="mb-2 font-bold uppercase text-[10pt]">PIHAK KEDUA</p>
                          <div className="h-28 flex flex-col justify-end">
                             <div className="border border-slate-400 w-28 h-16 mx-auto mb-[-2.5rem] flex items-center justify-center text-[10px] text-slate-500 italic uppercase">Meterai<br/>Rp 10.000,-</div>
                             <p className="font-bold underline uppercase relative z-10">{data.p2Name}</p>
                          </div>
                      </div>
                  </div>

                  <div className="text-center text-[11pt] uppercase font-bold mb-8">SAKSI-SAKSI</div>
                  <div className="grid grid-cols-2 gap-8 text-center text-[11pt]">
                      <div>
                          <p className="mb-16 border-b border-black w-3/4 mx-auto"></p>
                          <p className="font-bold uppercase">( {data.witness1} )</p>
                      </div>
                      <div>
                          <p className="mb-16 border-b border-black w-3/4 mx-auto"></p>
                          <p className="font-bold uppercase">( {data.witness2} )</p>
                      </div>
                  </div>
                </div>
                <div className="text-right mt-auto text-[10px] text-slate-300 italic font-sans">Halaman 3 dari 3</div>
            </div>
          </>
        )}

        {/* TEMPLATE 2: COMPACT (1 HALAMAN) - Optional implementation retained but updated to standard formats */}
        {templateId === 2 && (
          <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[10pt] p-[15mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
              <div className="text-center mb-6 border-b-4 border-slate-900 pb-2 shrink-0">
                <h1 className="font-black text-xl uppercase tracking-tighter">SURAT PERNYATAAN PERDAMAIAN</h1>
              </div>
              <p className="mb-4 text-justify">Pada hari ini, {data.day}, {formatDateSafe(data.date)}, bertempat di {data.city}, PARA PIHAK yang bertanda tangan di bawah ini:</p>

              <div className="flex flex-col md:flex-row gap-6 mb-6 shrink-0 break-inside-avoid">
                <div className="flex-1 p-3 border-l-4 border-emerald-500">
                  <div className="font-black uppercase mb-1 text-emerald-700">PIHAK I (PERTAMA)</div>
                  <div className="font-bold">{data.p1Name}</div>
                  <div>NIK: {data.p1Nik}</div>
                  <div>Alamat: {data.p1Address}</div>
                </div>
                <div className="flex-1 p-3 border-l-4 border-blue-500">
                  <div className="font-black uppercase mb-1 text-blue-700">PIHAK II (KEDUA)</div>
                  <div className="font-bold">{data.p2Name}</div>
                  <div>NIK: {data.p2Nik}</div>
                  <div>Alamat: {data.p2Address}</div>
                </div>
              </div>

              <div className="mb-6 p-4 text-justify italic bg-slate-50 print:bg-transparent border border-dashed border-slate-400 shrink-0 break-inside-avoid">
                Menerangkan bahwa PARA PIHAK telah sepakat berdamai secara kekeluargaan atas insiden: <strong>{data.incidentTitle}</strong> yang terjadi pada {formatDateSafe(data.incidentDate)}. Rincian: "{data.incidentDetail}".
              </div>

              <div className="text-justify space-y-4 flex-grow">
                <p>
                  Atas kejadian tersebut, PIHAK I bersedia memberikan ganti rugi berupa uang sebesar <strong>{data.compensationAmount}</strong> ({data.compensationText}) dengan metode <strong>{data.compensationMethod}</strong>. Rincian penyelesaian: {data.settlementDetail}.
                </p>
                <p>
                  Dengan ditandatanganinya surat ini, PIHAK II menyatakan menerima seluruh kompensasi dan melepaskan seluruh haknya untuk menuntut PIHAK I secara pidana maupun perdata di kemudian hari.
                </p>
                <p>
                  Apabila PIHAK II melanggar ketentuan pelarangan penuntutan, maka PIHAK II bersedia membayar ganti rugi materiil sebesar <strong>{data.penaltyAmount}</strong> kepada PIHAK I.
                </p>
                <p>Demikian surat pernyataan perdamaian ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              <div className="mt-12 shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between text-center mb-16 text-[10pt]">
                    <div className="w-48">
                        <p className="mb-4 font-bold uppercase">PIHAK PERTAMA</p>
                        <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] italic">METERAI</div>
                        <p className="font-bold underline uppercase">{data.p1Name}</p>
                    </div>
                    <div className="w-48">
                        <p className="mb-4 font-bold uppercase">PIHAK KEDUA</p>
                        <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] italic">METERAI</div>
                        <p className="font-bold underline uppercase">{data.p2Name}</p>
                    </div>
                  </div>
                  <div className="text-center font-bold uppercase tracking-widest border-t pt-4">Saksi-saksi: {data.witness1} & {data.witness2}</div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: relative; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <HeartHandshake size={16} className="text-emerald-500" /> <span>Dading Editor</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Legal Formal (3 Hal) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Compact Rapi (1 Hal) {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Formulir Legal</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              {/* Form Data Surat */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-500 border-b pb-1 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Data Surat</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 mb-1 block">Hari</label>
                      <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" value={data.day} onChange={e => handleDataChange('day', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tanggal</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">Kota Tempat Perjanjian Ditandatangani</label>
                    <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 </div>
              </div>

              {/* Form Pihak Pertama */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-emerald-500">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Pertama (Penanggung / Pelaku)</h3>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nama Lengkap Sesuai KTP</label>
                   <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nomor Induk Kependudukan (NIK)</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="16 Digit NIK" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tempat Lahir</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1BirthPlace} onChange={e => handleDataChange('p1BirthPlace', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tanggal Lahir</label>
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1BirthDate} onChange={e => handleDataChange('p1BirthDate', e.target.value)} />
                   </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Pekerjaan</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Alamat Lengkap KTP</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan..." />
                 </div>
              </div>

              {/* Form Pihak Kedua */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-blue-500">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua (Korban / Penerima)</h3>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nama Lengkap Sesuai KTP</label>
                   <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nomor Induk Kependudukan (NIK)</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="16 Digit NIK" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tempat Lahir</label>
                     <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2BirthPlace} onChange={e => handleDataChange('p2BirthPlace', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tanggal Lahir</label>
                     <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2BirthDate} onChange={e => handleDataChange('p2BirthDate', e.target.value)} />
                   </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Pekerjaan</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Alamat Lengkap KTP</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan..." />
                 </div>
              </div>

              {/* Form Insiden & Kesepakatan */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-amber-500">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><ShieldAlert size={12}/> Objek Perdamaian & Insiden</h3>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Judul Insiden</label>
                   <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.incidentTitle} onChange={e => handleDataChange('incidentTitle', e.target.value)} placeholder="Contoh: Kecelakaan Lalu Lintas" />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tanggal Kejadian</label>
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
                 </div>
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Detail Kronologi (Singkat & Jelas)</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.incidentDetail} onChange={e => handleDataChange('incidentDetail', e.target.value)} placeholder="Tuliskan kronologi singkat..." />
                 </div>
              </div>

              {/* Form Kesepakatan Ganti Rugi */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-indigo-500">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Kesepakatan Ganti Rugi</h3>
                 
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nominal (Angka)</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-black text-indigo-700 focus:ring-2 focus:ring-indigo-500 outline-none" value={data.compensationAmount} onChange={e => handleDataChange('compensationAmount', e.target.value)} placeholder="Rp 5.000.000,-" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Metode Pembayaran</label>
                     <select className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={data.compensationMethod} onChange={e => handleDataChange('compensationMethod', e.target.value as any)}>
                       <option value="Tunai">Tunai / Cash</option>
                       <option value="Transfer Bank">Transfer Bank</option>
                       <option value="Cicilan">Cicilan Bertahap</option>
                     </select>
                   </div>
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Nominal Terbilang</label>
                   <input className="w-full p-2 border rounded-lg text-xs italic focus:ring-2 focus:ring-indigo-500 outline-none" value={data.compensationText} onChange={e => handleDataChange('compensationText', e.target.value)} placeholder="Lima Juta Rupiah" />
                 </div>

                 <div>
                   <label className="text-[10px] font-bold text-slate-500 mb-1 block">Rincian Teknis & Syarat</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-indigo-500 outline-none" value={data.settlementDetail} onChange={e => handleDataChange('settlementDetail', e.target.value)} placeholder="Jelaskan bila ada perbaikan bengkel, cicilan tanggal berapa, dll..." />
                 </div>
              </div>

              {/* Pelarangan Penuntutan & Penalti */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 border-l-4 border-l-red-500">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><AlertTriangle size={12}/> Klausul Pelarangan Penuntutan</h3>
                 <p className="text-[10px] text-slate-500 leading-snug">Menetapkan Ganti Rugi Materiil (Denda) apabila Pihak Kedua mengingkari janji perdamaian dan tetap menuntut secara hukum.</p>
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Penalti Denda (Angka)</label>
                     <input className="w-full p-2 border rounded-lg text-xs font-black text-red-700 focus:ring-2 focus:ring-red-500 outline-none" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} placeholder="Rp 50.000.000,-" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Terbilang (Denda)</label>
                     <input className="w-full p-2 border rounded-lg text-xs italic focus:ring-2 focus:ring-red-500 outline-none" value={data.penaltyText} onChange={e => handleDataChange('penaltyText', e.target.value)} placeholder="Lima Puluh Juta Rupiah" />
                   </div>
                 </div>
              </div>

              {/* Saksi */}
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-500 border-b pb-1 tracking-widest flex items-center gap-2"><Users size={12}/> Data Saksi</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Saksi 1</label>
                     <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-slate-500" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 mb-1 block">Saksi 2</label>
                     <input className="w-full p-2 border rounded-lg text-xs outline-none focus:ring-2 focus:ring-slate-500" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                   </div>
                 </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian_Perdamaian" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
