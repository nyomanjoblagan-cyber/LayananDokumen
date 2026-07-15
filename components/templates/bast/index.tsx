'use client';
import PrintWrapper from '@/components/PrintWrapper';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, ArrowLeftCircle, BookOpen, Edit3, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface HandoverItem {
  id: string;
  name: string;
  quantity: string;
  remarks: string;
}

interface BastData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Yang Menyerahkan)
  p1Name: string; p1Nik: string; p1Ttl: string; p1Job: string; p1Address: string; 
  
  // Pihak 2 (Yang Menerima)
  p2Name: string; p2Nik: string; p2Ttl: string; p2Job: string; p2Address: string;
  
  // Detail Serah Terima
  handoverType: string;
  items: HandoverItem[];

  // Klausul Tambahan
  warrantyPeriode: string;
  disputeResolution: 'pengadilan' | 'arbitrase' | 'musyawarah';
  courtCity: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BastData = {
  day: 'Jumat',
  date: '2026-07-10', 
  city: 'Jakarta Selatan',
  
  p1Name: 'BAMBANG SUDARSO', p1Nik: '3404010101740001', p1Ttl: 'Bandung, 12 Agustus 1974', p1Job: 'Manager Operasional', p1Address: 'Jl. Sudirman No. 10, RT 001/RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan', 
  
  p2Name: 'ANDI PRATAMA', p2Nik: '3471010101960002', p2Ttl: 'Jakarta, 05 November 1996', p2Job: 'Direktur Utama', p2Address: 'Jl. Thamrin No. 20, RT 005/RW 003, Kel. Gondangdia, Kec. Menteng, Jakarta Pusat',
  
  handoverType: 'Barang',
  items: [
    { id: '1', name: 'Laptop Lenovo Thinkpad T14 Gen 3', quantity: '1 Unit', remarks: 'Kondisi Baru (Segel pabrik)' },
    { id: '2', name: 'Mouse Wireless Logitech M330', quantity: '1 Unit', remarks: 'Warna Hitam, Kondisi Baru' }
  ],
  warrantyPeriode: '14',
  disputeResolution: 'pengadilan',
  courtCity: 'Jakarta Selatan'
};

// --- 3. KOMPONEN UTAMA ---
export default function BastPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <BastBuilder />
    </Suspense>
  );
}

function BastBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<BastData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'objek' | 'klausul'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDataChange = (field: keyof BastData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof HandoverItem, val: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: val };
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), name: '', quantity: '', remarks: '' }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas className="print:w-full print:min-w-0">
              {/* HEADER */}
              <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-xl uppercase tracking-wider">BERITA ACARA SERAH TERIMA</h1>
                  <h2 className="font-bold text-lg uppercase tracking-wider">{data.handoverType.toUpperCase()}</h2>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
                  </p>
              </div>

              {/* IDENTITAS PIHAK 1 */}
              <div className="mb-4 text-justify break-inside-avoid">
                  <div className="flex">
                      <div className="w-8 shrink-0 font-bold">I.</div>
                      <div className="flex-1">
                          <div className="flex">
                              <div className="w-56 shrink-0">Nama Lengkap</div>
                              <div className="w-4 shrink-0">:</div>
                              <div className="font-bold uppercase">{data.p1Name}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Nomor Induk Kependudukan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p1Nik}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p1Ttl}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Pekerjaan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p1Job}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Alamat Lengkap (Sesuai KTP)</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p1Address}</div>
                          </div>
                          <div className="mt-2">
                              Dalam hal ini bertindak untuk dan atas namanya sendiri, yang selanjutnya dalam Berita Acara ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                          </div>
                      </div>
                  </div>
              </div>

              {/* IDENTITAS PIHAK 2 */}
              <div className="mb-8 text-justify break-inside-avoid">
                  <div className="flex">
                      <div className="w-8 shrink-0 font-bold">II.</div>
                      <div className="flex-1">
                          <div className="flex">
                              <div className="w-56 shrink-0">Nama Lengkap</div>
                              <div className="w-4 shrink-0">:</div>
                              <div className="font-bold uppercase">{data.p2Name}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Nomor Induk Kependudukan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p2Nik}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p2Ttl}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Pekerjaan</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p2Job}</div>
                          </div>
                          <div className="flex">
                              <div className="w-56 shrink-0">Alamat Lengkap (Sesuai KTP)</div>
                              <div className="w-4 shrink-0">:</div>
                              <div>{data.p2Address}</div>
                          </div>
                          <div className="mt-2">
                              Dalam hal ini bertindak untuk dan atas namanya sendiri, yang selanjutnya dalam Berita Acara ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                          </div>
                      </div>
                  </div>
              </div>

              {/* RECITALS */}
              <div className="mb-8 text-justify">
                  <p>PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya secara bersama-sama disebut sebagai <strong>"PARA PIHAK"</strong> dan masing-masing disebut sebagai <strong>"PIHAK"</strong>) terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Bahwa, PIHAK PERTAMA bermaksud untuk menyerahkan hak penguasaan dan kepemilikan atas Objek Serah Terima (sebagaimana didefinisikan di bawah) kepada PIHAK KEDUA.</li>
                      <li>Bahwa, PIHAK KEDUA telah menyatakan kesediaannya untuk menerima penyerahan tersebut dari PIHAK PERTAMA sesuai dengan syarat dan ketentuan yang diatur dalam Berita Acara ini.</li>
                  </ul>
                  <p className="mt-2">Maka berdasarkan uraian tersebut di atas, PARA PIHAK sepakat untuk membuat dan menandatangani Berita Acara Serah Terima ini dengan syarat-syarat dan ketentuan sebagai berikut:</p>
              </div>

              {/* PASAL 1: DEFINISI */}
              <div className="text-center font-bold mb-4">
                <p>PASAL 1</p>
                <p>DEFINISI</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Berita Acara</strong> adalah Berita Acara Serah Terima ini beserta seluruh lampiran-lampirannya (apabila ada) yang merupakan satu kesatuan yang tidak terpisahkan.</li>
                  <li><strong>Objek Serah Terima</strong> adalah segala sesuatu berupa {data.handoverType.toLowerCase()} yang diserahkan oleh PIHAK PERTAMA dan diterima oleh PIHAK KEDUA sebagaimana dirinci pada Pasal 2 dokumen ini.</li>
                  <li><strong>Serah Terima</strong> adalah tindakan pengalihan hak, penguasaan, dan tanggung jawab atas Objek Serah Terima dari PIHAK PERTAMA kepada PIHAK KEDUA.</li>
                </ol>
              </div>

              {/* PASAL 2: OBJEK SERAH TERIMA */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 2</p>
                <p>OBJEK SERAH TERIMA</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Bahwa Objek Serah Terima yang diserahkan oleh PIHAK PERTAMA kepada PIHAK KEDUA berupa {data.handoverType.toLowerCase()} dengan spesifikasi dan rincian sebagai berikut:</li>
                </ol>
                
                <div className="pl-6 mt-4 mb-4 break-inside-avoid">
                  <table className="w-full border-collapse border border-black text-[10pt] text-left">
                      <thead>
                          <tr>
                              <th className="border border-black p-2 w-10 text-center bg-slate-100">No.</th>
                              <th className="border border-black p-2 bg-slate-100">Keterangan / Nama {data.handoverType}</th>
                              <th className="border border-black p-2 w-28 text-center bg-slate-100">Jumlah</th>
                              <th className="border border-black p-2 w-40 text-center bg-slate-100">Catatan</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.length > 0 ? data.items.map((item, index) => (
                              <tr key={item.id}>
                                  <td className="border border-black p-2 text-center">{index + 1}.</td>
                                  <td className="border border-black p-2">{item.name}</td>
                                  <td className="border border-black p-2 text-center">{item.quantity}</td>
                                  <td className="border border-black p-2 text-center">{item.remarks}</td>
                              </tr>
                          )) : (
                              <tr>
                                  <td colSpan={4} className="border border-black p-4 text-center italic text-slate-500">Tidak ada rincian data.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
                </div>
                
                <ol className="list-decimal pl-6 space-y-2" start={2}>
                  <li>Kondisi fisik, fungsionalitas, serta kelengkapan dokumen pendukung (jika ada) atas Objek Serah Terima sebagaimana dimaksud pada Ayat 1 Pasal ini telah diperiksa secara saksama dan diuji coba oleh PARA PIHAK secara bersama-sama sebelum penandatanganan Berita Acara ini.</li>
                </ol>
              </div>

              {/* PASAL 3: PERNYATAAN DAN JAMINAN */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 3</p>
                <p>PERNYATAAN DAN JAMINAN</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>PIHAK PERTAMA menyatakan dan menjamin bahwa PIHAK PERTAMA adalah pemilik yang sah atau pihak yang memiliki kewenangan penuh untuk melakukan penyerahan Objek Serah Terima tersebut.</li>
                  <li>PIHAK PERTAMA menjamin bahwa Objek Serah Terima bebas dari segala bentuk sitaan, sengketa, hak tanggungan, maupun tuntutan/gugatan dari pihak ketiga manapun.</li>
                  <li>PIHAK KEDUA menyatakan dan menjamin bahwa PIHAK KEDUA telah meneliti, memeriksa, dan menerima Objek Serah Terima dalam kondisi yang baik, lengkap, dan sesuai dengan kesepakatan, serta dapat berfungsi sebagaimana mestinya.</li>
                  {data.warrantyPeriode && parseInt(data.warrantyPeriode) > 0 && (
                    <li>PIHAK PERTAMA memberikan jaminan (garansi) atas cacat produksi atau kerusakan yang bukan disebabkan oleh kelalaian penggunaan selama {data.warrantyPeriode} ({data.warrantyPeriode}) hari kalender sejak penandatanganan Berita Acara ini.</li>
                  )}
                </ol>
              </div>

              {/* PASAL 4: PERPINDAHAN RISIKO */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 4</p>
                <p>PERPINDAHAN RISIKO (RISK OF LOSS)</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Terhitung sejak ditandatanganinya Berita Acara Serah Terima ini oleh PARA PIHAK, maka segala bentuk risiko, termasuk namun tidak terbatas pada risiko kerusakan, kehilangan, penurunan nilai, cacat tersembunyi, serta segala kewajiban hukum yang menyertai penguasaan Objek Serah Terima <strong>sepenuhnya berpindah dan menjadi tanggung jawab mutlak PIHAK KEDUA</strong>.</li>
                  <li><strong>PIHAK PERTAMA</strong> dengan ini dibebaskan secara mutlak dari segala bentuk tuntutan, gugatan, dan/atau klaim ganti rugi dalam bentuk apapun baik dari PIHAK KEDUA maupun pihak ketiga lainnya yang diakibatkan oleh penggunaan, penguasaan, penyimpanan, dan/atau pemeliharaan Objek Serah Terima pasca penandatanganan Berita Acara ini.</li>
                  <li>PIHAK KEDUA dengan ini secara tegas menyatakan melepaskan haknya secara hukum untuk menuntut pembatalan serah terima, penggantian barang, atau pengembalian Objek Serah Terima kepada PIHAK PERTAMA dengan alasan apapun yang timbul setelah peralihan risiko sebagaimana dimaksud pada Ayat 1 Pasal ini.</li>
                </ol>
              </div>

              {/* PASAL 5: FORCE MAJEURE */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 5</p>
                <p>KEADAAN KAHAR (FORCE MAJEURE)</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Tidak ada satu PIHAK pun yang akan dimintakan pertanggungjawaban atas keterlambatan atau kegagalan dalam memenuhi kewajiban yang diatur dalam Berita Acara ini yang disebabkan semata-mata oleh kejadian Force Majeure.</li>
                  <li>Force Majeure meliputi namun tidak terbatas pada bencana alam (gempa bumi, banjir, tsunami, dll), perang, huru-hara, pemberontakan, pemogokan massal, serta kebijakan atau peraturan pemerintah yang menghalangi pelaksanaan Berita Acara ini secara langsung.</li>
                  <li>PIHAK yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada PIHAK lainnya selambat-lambatnya 7 (tujuh) hari kalender sejak terjadinya peristiwa tersebut disertai dengan bukti-bukti yang sah dari instansi yang berwenang.</li>
                </ol>
              </div>

              {/* PASAL 6: PENYELESAIAN SENGKETA */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 6</p>
                <p>PENYELESAIAN SENGKETA</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Segala perselisihan atau sengketa yang timbul dalam penafsiran dan pelaksanaan Berita Acara ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mufakat.</li>
                  {data.disputeResolution === 'pengadilan' && (
                  <li>Apabila penyelesaian secara musyawarah sebagaimana dimaksud pada Ayat 1 tidak mencapai kesepakatan dalam waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan perselisihan tersebut melalui kepaniteraan Pengadilan Negeri <strong>{data.courtCity}</strong>.</li>
                  )}
                  {data.disputeResolution === 'arbitrase' && (
                  <li>Apabila penyelesaian secara musyawarah sebagaimana dimaksud pada Ayat 1 tidak mencapai kesepakatan, maka PARA PIHAK sepakat untuk menyerahkan penyelesaian sengketa tersebut melalui forum Arbitrase di Badan Arbitrase Nasional Indonesia (BANI) sesuai dengan peraturan dan prosedur BANI yang berlaku.</li>
                  )}
                  {data.disputeResolution === 'musyawarah' && (
                  <li>Apabila penyelesaian secara musyawarah sebagaimana dimaksud pada Ayat 1 tidak mencapai mufakat, maka PARA PIHAK sepakat untuk melibatkan mediator netral yang disetujui bersama guna mencari solusi terbaik bagi PARA PIHAK tanpa melalui proses litigasi.</li>
                  )}
                </ol>
              </div>

              {/* PASAL 7: KETENTUAN LAIN-LAIN */}
              <div className="text-center font-bold mb-4 break-before-auto">
                <p>PASAL 7</p>
                <p>KETENTUAN LAIN-LAIN</p>
              </div>
              <div className="text-justify mb-8">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Segala sesuatu yang belum atau tidak cukup diatur dalam Berita Acara ini, akan diatur dan ditentukan kemudian dalam suatu perjanjian atau addendum yang disepakati secara tertulis oleh PARA PIHAK dan merupakan bagian yang tidak terpisahkan dari Berita Acara ini.</li>
                  <li>Berita Acara ini dibuat, tunduk, dan ditafsirkan berdasarkan ketentuan hukum Negara Kesatuan Republik Indonesia.</li>
                </ol>
              </div>

              {/* PENUTUP */}
              <div className="mb-12 mt-8 text-justify">
                  <p>Demikian Berita Acara Serah Terima ini dibuat pada waktu dan tempat sebagaimana disebutkan pada awal dokumen, dalam rangkap 2 (dua) yang masing-masing bermeterai cukup dan memiliki kekuatan pembuktian hukum yang sama bagi PARA PIHAK.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                  <div>
                      <p className="mb-2 font-bold uppercase">PIHAK KEDUA</p>
                      <p className="mb-24 uppercase">(Yang Menerima)</p>
                      <p className="font-bold underline uppercase">{data.p2Name}</p>
                      <p className="text-sm">NIK. {data.p2Nik}</p>
                  </div>
                  <div>
                      <p className="mb-2 font-bold uppercase">PIHAK PERTAMA</p>
                      <p className="mb-6 uppercase">(Yang Menyerahkan)</p>
                      <div className="border border-slate-300 w-28 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic bg-slate-50 print:border-dotted">Meterai<br/>Rp10.000,-</div>
                      <p className="font-bold underline uppercase">{data.p1Name}</p>
                      <p className="text-sm">NIK. {data.p1Nik}</p>
                  </div>
              </div>

          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm 15mm; } 
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
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Berita Acara Serah Terima (BAST)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 1 (Penyerah)</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak 2 (Penerima)</button>
              <button onClick={() => setActiveTab('objek')} className={`flex-1 py-3 border-r ${activeTab === 'objek' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Rincian Objek</button>
              <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 border-r ${activeTab === 'klausul' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul</button>
           </div>

 <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Pertama</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="Contoh: 3404010101740001" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Ttl} onChange={e => handleDataChange('p1Ttl', e.target.value)} placeholder="Contoh: Bandung, 12 Agustus 1974" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Contoh: Manager Operasional" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Contoh: Jl. Sudirman No. 10..." />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pihak Kedua</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="Contoh: 3471010101960002" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Ttl} onChange={e => handleDataChange('p2Ttl', e.target.value)} placeholder="Contoh: Jakarta, 05 November 1996" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Contoh: Direktur Utama" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Contoh: Jl. Thamrin No. 20..." />
                </div>
              </div>
              )}

              {activeTab === 'objek' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Waktu & Objek Serah Terima</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Contoh: Senin" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat / Kota Penandatanganan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Jakarta Selatan" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Serah Terima</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold" value={data.handoverType} onChange={e => handleDataChange('handoverType', e.target.value)}>
                      <option value="Barang">Barang</option>
                      <option value="Dokumen">Dokumen</option>
                      <option value="Hasil Pekerjaan">Hasil Pekerjaan</option>
                      <option value="Kunci Bangunan/Aset">Kunci Bangunan/Aset</option>
                  </select>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] font-bold text-emerald-700 uppercase">Rincian {data.handoverType}</h4>
                    <button onClick={addItem} className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-200 transition-colors">
                      <Plus size={12} /> Tambah
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {data.items.map((item, index) => (
                      <div key={item.id} className="p-3 border rounded-lg bg-slate-50 relative">
                        <button onClick={() => removeItem(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500" title="Hapus Item"><Trash2 size={14}/></button>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[9px] text-slate-500 uppercase font-bold">Keterangan / Nama {data.handoverType}</label>
                            <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} placeholder={`Contoh: Nama ${data.handoverType}`} />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase font-bold">Jumlah</label>
                              <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} placeholder="Contoh: 1 Unit" />
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase font-bold">Catatan</label>
                              <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.remarks} onChange={e => handleItemChange(index, 'remarks', e.target.value)} placeholder="Contoh: Baik / Segel" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {data.items.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-lg text-slate-400 text-xs">
                        Belum ada daftar {data.handoverType.toLowerCase()}. Silakan tambah item.
                      </div>
                    )}
                  </div>
                </div>

              </div>
              )}

              {activeTab === 'klausul' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Klausul & Legalitas</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                    <span>Masa Garansi (Opsional)</span>
                  </label>
                  <p className="text-[9px] text-slate-400 mb-1 leading-tight">Biarkan "0" jika tidak ada jaminan/garansi purna serah terima dari Pihak Pertama.</p>
                  <div className="flex items-center gap-2">
                    <input type="number" min="0" className="w-24 p-2 border rounded-lg text-sm" value={data.warrantyPeriode} onChange={e => handleDataChange('warrantyPeriode', e.target.value)} placeholder="0" />
                    <span className="text-sm text-slate-600">Hari Kalender</span>
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Penyelesaian Sengketa</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold" value={data.disputeResolution} onChange={e => handleDataChange('disputeResolution', e.target.value)}>
                      <option value="pengadilan">Pengadilan Negeri</option>
                      <option value="arbitrase">Arbitrase (BANI)</option>
                      <option value="musyawarah">Musyawarah Kekeluargaan & Mediasi</option>
                  </select>
                </div>

                {data.disputeResolution === 'pengadilan' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Domisili Hukum / Kota Pengadilan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.courtCity} onChange={e => handleDataChange('courtCity', e.target.value)} placeholder="Contoh: Jakarta Selatan" />
                  </div>
                )}
                
                <div className="mt-6 p-3 bg-purple-50 rounded border border-purple-100">
                  <h4 className="text-[10px] font-bold text-purple-800 uppercase mb-1">Informasi Klausul Mutlak</h4>
                  <p className="text-[10px] text-purple-600 leading-relaxed text-justify">Dokumen ini telah dilengkapi dengan Klausul Perpindahan Risiko (Risk of Loss) yang menegaskan bahwa pasca penandatanganan, seluruh tanggung jawab kehilangan, kerusakan, dan gugatan sepenuhnya beralih ke <strong>Pihak Kedua</strong>.</p>
                </div>
              </div>
              )}

           </div>

           {/* Mobile Navigation Toggles */}
           <div className="md:hidden border-t p-4 bg-white flex gap-2 no-print">
              <button onClick={() => setMobileView('preview')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-xs">Lihat Dokumen</button>
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
 <div className={`flex-1 bg-slate-200 overflow-y-auto relative transition-transform ${mobileView === 'editor' ? 'translate-x-full print:translate-x-0 md:translate-x-0 hidden md:block' : 'translate-x-0 block'} md:block print:overflow-visible print:bg-white print:static`}>
          
          <div className="md:hidden sticky top-0 bg-slate-800 text-white p-3 z-10 flex justify-between items-center shadow-md no-print">
            <span className="text-xs font-bold uppercase">Preview Dokumen</span>
            <button onClick={() => setMobileView('editor')} className="bg-slate-700 px-3 py-1 rounded text-xs font-bold hover:bg-slate-600">Kembali ke Editor</button>
          </div>

          <div className="p-4 md:p-8 min-h-full flex flex-col items-center justify-start print:p-0">
             <div id="print-only-root" className="w-full flex justify-center print:h-auto print:static">
                <DocumentContent />
             </div>
          </div>
        </div>
      </main>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_bast" price={15000} />
      </div>
    </div>
  );
}

