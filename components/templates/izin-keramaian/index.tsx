'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

interface IzinKeramaianData {
  letterCity: string;
  letterDate: string;
  recipientTitle: string;
  recipientLocation: string;
  
  applicantName: string;
  applicantNik: string;
  applicantBirthPlace: string;
  applicantBirthDate: string;
  applicantJob: string;
  applicantAddress: string;
  applicantPhone: string;
  
  eventName: string;
  eventDay: string;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventLocation: string;
  entertainmentType: string;
  crowdEstimate: string;
  
  alcoholProhibition: string;
  politicalActivity: string;
  willingToDisperse: string;
  
  villageName: string;
  villageHead: string;
  koramilHead: string;
}

const INITIAL_DATA: IzinKeramaianData = {
  letterCity: 'Sleman',
  letterDate: '2026-07-15',
  recipientTitle: 'Kepala Kepolisian Sektor (Kapolsek) Ngaglik',
  recipientLocation: 'Sleman',
  
  applicantName: 'BUDI SANTOSO',
  applicantNik: '3404051234567890',
  applicantBirthPlace: 'Sleman',
  applicantBirthDate: '1985-04-12',
  applicantJob: 'Wiraswasta / Ketua Panitia',
  applicantAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  applicantPhone: '081234567890',
  
  eventName: 'Pentas Seni Budaya dan Dangdut',
  eventDay: 'Sabtu',
  eventDate: '2026-07-25',
  eventTimeStart: '19:00',
  eventTimeEnd: '23:30',
  eventLocation: 'Lapangan Desa Sardonoharjo',
  entertainmentType: 'Panggung Prajurit & Orkes Dangdut',
  crowdEstimate: '500 Orang',
  
  alcoholProhibition: 'ya',
  politicalActivity: 'bebas',
  willingToDisperse: 'ya',
  
  villageName: 'Sardonoharjo',
  villageHead: 'H. Sudirman, S.E.',
  koramilHead: 'Kapt. Inf. Agus Yulianto'
};

export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <IzinKeramaianBuilder />
    </Suspense>
  );
}

function IzinKeramaianBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinKeramaianData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pemohon' | 'acara' | 'komitmen' | 'pengaturan'>('pemohon');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof IzinKeramaianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
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
              
              {/* JUDUL DOKUMEN */}
              <div className="text-center font-bold uppercase mb-8">
                <p className="text-lg underline">SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK DAN PERMOHONAN IZIN KERAMAIAN</p>
                <p className="text-sm mt-1">NOMOR: .......................................................</p>
              </div>

              {/* MUKADIMAH */}
              <div className="mb-4 text-justify">
                <p>Yang bertanda tangan di bawah ini, selanjutnya disebut sebagai <strong>PEMOHON</strong> atau <strong>PIHAK PERTAMA</strong>:</p>
              </div>

              {/* IDENTITAS PIHAK PERTAMA */}
              <div className="ml-4 mb-6 text-justify break-inside-avoid">
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Nama Lengkap</div>
                  <div className="w-4 shrink-0">:</div>
                  <div className="font-bold uppercase">{data.applicantName}</div>
                </div>
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                  <div className="w-4 shrink-0">:</div>
                  <div>{data.applicantNik}</div>
                </div>
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Tempat, Tanggal Lahir</div>
                  <div className="w-4 shrink-0">:</div>
                  <div>{data.applicantBirthPlace}, {formatDateSafe(data.applicantBirthDate)}</div>
                </div>
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Pekerjaan / Jabatan</div>
                  <div className="w-4 shrink-0">:</div>
                  <div>{data.applicantJob}</div>
                </div>
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Alamat Lengkap Sesuai KTP</div>
                  <div className="w-4 shrink-0">:</div>
                  <div>{data.applicantAddress}</div>
                </div>
                <div className="flex flex-row mb-1">
                  <div className="w-56 shrink-0">Nomor Telepon / HP</div>
                  <div className="w-4 shrink-0">:</div>
                  <div>{data.applicantPhone}</div>
                </div>
              </div>

              <div className="mb-4 text-justify">
                <p>Dengan ini mengajukan permohonan Izin Keramaian kepada <strong>Kepolisian Republik Indonesia</strong>, dalam hal ini <strong>{data.recipientTitle}</strong> yang berkedudukan di <strong>{data.recipientLocation}</strong>, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
              </div>

              <div className="mb-4 text-justify">
                <p>Bahwa guna memenuhi persyaratan dan kelengkapan administrasi penerbitan Izin Keramaian, PIHAK PERTAMA menyatakan dengan sebenar-benarnya dan mengikatkan diri secara hukum pada ketentuan-ketentuan yang diatur dalam pasal-pasal berikut ini:</p>
              </div>

              {/* PASAL 1 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 1<br/>KETENTUAN UMUM DAN DEFINISI</div>
              <div className="mb-4 text-justify ml-4">
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>PIHAK PERTAMA</strong> adalah individu dan/atau pimpinan kepanitiaan yang bertindak sebagai penanggung jawab utama baik secara formil maupun materiil atas seluruh rangkaian kegiatan keramaian yang diselenggarakan.</li>
                  <li><strong>PIHAK KEDUA</strong> adalah instansi Kepolisian Republik Indonesia yang memiliki kewenangan menerbitkan izin keramaian, memelihara keamanan, dan menjaga ketertiban masyarakat (Kamtibmas) berdasarkan Undang-Undang Nomor 2 Tahun 2002 tentang Kepolisian Negara Republik Indonesia.</li>
                  <li><strong>Izin Keramaian</strong> adalah persetujuan tertulis yang diberikan oleh PIHAK KEDUA berdasarkan permohonan PIHAK PERTAMA setelah dilakukan evaluasi mendalam terhadap potensi gangguan keamanan, ketertiban masyarakat, dan kelancaran lalu lintas di wilayah hukum yang bersangkutan.</li>
                </ol>
              </div>

              {/* PASAL 2 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 2<br/>OBJEK PERMOHONAN KEGIATAN</div>
              <div className="mb-4 text-justify ml-4">
                <p className="mb-4">PIHAK PERTAMA bermaksud menyelenggarakan kegiatan keramaian dengan rincian objek permohonan sebagai berikut:</p>
                <div className="ml-6 mb-2 break-inside-avoid">
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Nama/Judul Kegiatan</div>
                    <div className="w-4 shrink-0">:</div>
                    <div className="font-bold">{data.eventName}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Hari / Tanggal</div>
                    <div className="w-4 shrink-0">:</div>
                    <div>{data.eventDay}, {formatDateSafe(data.eventDate)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Waktu Pelaksanaan</div>
                    <div className="w-4 shrink-0">:</div>
                    <div>Pukul {data.eventTimeStart} s/d {data.eventTimeEnd} WIB</div>
                  </div>
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Tempat / Lokasi</div>
                    <div className="w-4 shrink-0">:</div>
                    <div>{data.eventLocation}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Jenis Hiburan/Pertunjukan</div>
                    <div className="w-4 shrink-0">:</div>
                    <div>{data.entertainmentType}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                    <div className="w-56 shrink-0">Estimasi Jumlah Massa</div>
                    <div className="w-4 shrink-0">:</div>
                    <div>{data.crowdEstimate}</div>
                  </div>
                </div>
              </div>

              {/* PASAL 3 */}
              <div className="text-center font-bold mt-8 mb-4 break-before-auto">PASAL 3<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA</div>
              <div className="mb-4 text-justify ml-4">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>PIHAK PERTAMA berhak melaksanakan kegiatan sesuai dengan rincian pada Pasal 2 secara sah hanya setelah mendapatkan surat persetujuan/Izin Keramaian resmi dan tertulis dari PIHAK KEDUA.</li>
                  <li>PIHAK PERTAMA berkewajiban mutlak menjaga stabilitas keamanan, ketertiban masyarakat, dan kebersihan lingkungan di lokasi kegiatan beserta radius sekitarnya, mulai dari tahap persiapan, selama acara berlangsung, hingga penutupan acara.</li>
                  <li>PIHAK PERTAMA wajib menyediakan jumlah petugas keamanan internal (Panitia Keamanan / Satuan Tugas Mandiri) yang cukup dan memadai untuk mengatur kelancaran sirkulasi acara, mengendalikan pergerakan massa, serta mengatur arus lalu lintas kendaraan di sekitar lokasi demi mencegah kemacetan.</li>
                  <li>PIHAK PERTAMA wajib mentaati dan mematuhi batas waktu pelaksanaan kegiatan yang telah disetujui, yaitu berakhir secara tertib dan kondusif selambat-lambatnya tepat pada pukul {data.eventTimeEnd} WIB tanpa adanya dispensasi waktu tambahan.</li>
                </ol>
              </div>

              {/* PASAL 4 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 4<br/>LARANGAN MUTLAK</div>
              <div className="mb-4 text-justify ml-4">
                <p className="mb-4">Selama berlangsungnya seluruh rangkaian kegiatan, PIHAK PERTAMA berjanji, menjamin secara mutlak, dan bersedia memastikan bahwa:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>{data.alcoholProhibition === 'ya' ? 'Dilarang keras dan tidak akan ada peredaran, penjualan, maupun konsumsi minuman keras (miras) jenis apapun, obat-obatan terlarang, serta narkotika di dalam lokasi kegiatan maupun di lingkungan sekitarnya. PIHAK PERTAMA menjamin area kegiatan bebas dari hal tersebut.' : 'Meskipun menyadari adanya kesulitan dalam memantau setiap individu secara penuh, PIHAK PERTAMA berupaya semaksimal mungkin mencegah peredaran minuman keras dan narkotika, serta berkomitmen akan segera melaporkan kepada pihak berwajib bilamana ditemukan adanya penyalahgunaan di lokasi acara.'}</li>
                  <li>Dilarang keras membawa, menyimpan, atau menggunakan senjata tajam (sajam), senjata api, bahan peledak, kembang api skala besar tanpa izin khusus, atau benda-benda berbahaya lainnya yang berpotensi mengancam keselamatan umum.</li>
                  <li>{data.politicalActivity === 'bebas' ? 'Kegiatan ini murni bersifat hiburan rakyat, sosial, kebudayaan, atau komersial biasa, dan sama sekali tidak memuat unsur kampanye politik praktis, tidak melibatkan atribut partai, tidak berisi orasi provokatif, serta bersih dari unsur ujaran kebencian yang mengandung Suku, Agama, Ras, dan Antargolongan (SARA).' : 'Mengingat kegiatan ini mengandung unsur pengumpulan massa yang berkaitan erat dengan aktivitas politik/ormas, maka pelaksanaannya akan diawasi secara ketat oleh panitia khusus dengan tetap mematuhi regulasi perundang-undangan, tanpa provokasi maupun ujaran kebencian SARA.'}</li>
                  <li>Dilarang keras mengadakan kegiatan perjudian dalam bentuk apapun, pertunjukan yang melanggar norma kesusilaan, maupun praktik-praktik ilegal lainnya dengan dalih hiburan rakyat di dalam lokasi maupun di sekitar area kegiatan.</li>
                </ol>
              </div>

              {/* PASAL 5 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 5<br/>SANKSI DAN PEMBUBARAN PAKSA</div>
              <div className="mb-4 text-justify ml-4">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Apabila di kemudian hari terbukti bahwa PIHAK PERTAMA melanggar, lalai, atau gagal memenuhi salah satu atau lebih ketentuan yang telah diatur secara tegas dalam Pasal 3 dan Pasal 4 perjanjian ini, maka PIHAK PERTAMA menyatakan dengan sadar <strong>{data.willingToDisperse === 'ya' ? 'BERSEDIA DAN SANGGUP' : 'MENOLAK DAN KEBERATAN'}</strong> apabila kegiatan tersebut dihentikan dan/atau dibubarkan secara paksa oleh PIHAK KEDUA (Aparat Kepolisian).</li>
                  <li>Dalam hal terjadi keributan, perkelahian massal, kerusakan fasilitas umum, atau kerusuhan berskala luas yang diakibatkan langsung oleh pelaksanaan kegiatan ini, maka PIHAK PERTAMA selaku penanggung jawab kegiatan mengambil alih tanggung jawab penuh atas segala kerugian materiil maupun imateriil yang ditimbulkan, dan bersedia diproses secara hukum pidana maupun perdata.</li>
                  <li>PIHAK PERTAMA membebaskan dan melepaskan PIHAK KEDUA dari segala tuntutan hukum, ganti rugi, maupun komplain dari pihak manapun apabila PIHAK KEDUA terpaksa melakukan tindakan kepolisian yang tegas dan terukur demi mengembalikan stabilitas keamanan dan ketertiban masyarakat di lokasi kejadian.</li>
                </ol>
              </div>

              {/* PASAL 6 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 6<br/>PENYELESAIAN SENGKETA DAN FORCE MAJEURE</div>
              <div className="mb-4 text-justify ml-4">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Segala bentuk perselisihan, sengketa, atau pelanggaran tindak pidana yang timbul sebagai akibat dari penyelenggaraan kegiatan ini tidak akan diselesaikan secara main hakim sendiri, melainkan akan diserahkan sepenuhnya kepada penegak hukum dan diproses sesuai dengan peraturan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia.</li>
                  <li>Apabila terjadi keadaan kahar (Force Majeure) yang tidak dapat dihindari, seperti bencana alam berskala besar, kerusuhan massal nasional, atau dikeluarkannya kebijakan darurat pemerintah terkait keamanan negara atau wabah, maka izin yang telah diberikan dapat dibatalkan, dicabut, atau ditangguhkan seketika oleh PIHAK KEDUA tanpa adanya hak bagi PIHAK PERTAMA untuk menuntut ganti rugi dalam bentuk apapun.</li>
                </ol>
              </div>

              {/* PASAL 7 */}
              <div className="text-center font-bold mt-8 mb-4">PASAL 7<br/>PENUTUP</div>
              <div className="mb-12 text-justify ml-4">
                <p>Demikian Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) dan Permohonan Izin Keramaian ini dibuat dengan sebenar-benarnya, dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan, tekanan, maupun pengaruh dari pihak manapun. Surat ini ditandatangani di atas meterai yang cukup sehingga memiliki kekuatan hukum yang tetap dan mengikat, serta berlaku sebagai dasar hukum yang sah apabila di kemudian hari terjadi hal-hal yang menyimpang dari kesepakatan ini.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex flex-row justify-end mb-6">
                <div className="text-center">
                  <p>{data.letterCity}, {formatDateSafe(data.letterDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-center break-inside-avoid mt-8">
                  <div>
                      <p className="mb-24">Mengetahui,<br/>Kepala Desa / Lurah {data.villageName}</p>
                      <p className="font-bold underline uppercase">{data.villageHead}</p>
                  </div>
                  <div>
                      <p className="mb-24">Pemohon / Penanggung Jawab,<br/>PIHAK PERTAMA</p>
                      <p className="font-bold underline uppercase">{data.applicantName}</p>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 text-center break-inside-avoid mt-16 pb-12">
                  <div>
                      <p className="mb-24">Mengetahui / Tembusan,<br/>Komandan Koramil (Danramil)</p>
                      <p className="font-bold underline uppercase">{data.koramilHead}</p>
                  </div>
                  <div>
                      <p className="mb-24">Menerima Permohonan,<br/>{data.recipientTitle}</p>
                      <p className="font-bold underline uppercase">______________________</p>
                      <p className="text-sm mt-1">NRP. .....................................</p>
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
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Izin Keramaian (Polsek/Polres)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 border-r ${activeTab === 'pemohon' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
              <button onClick={() => setActiveTab('acara')} className={`flex-1 py-3 border-r ${activeTab === 'acara' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Acara</button>
              <button onClick={() => setActiveTab('komitmen')} className={`flex-1 py-3 border-r ${activeTab === 'komitmen' ? 'bg-white text-orange-600 border-b-2 border-b-orange-600' : 'text-slate-500 hover:bg-slate-200'}`}>Komitmen</button>
              <button onClick={() => setActiveTab('pengaturan')} className={`flex-1 py-3 ${activeTab === 'pengaturan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pengaturan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'pemohon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pemohon (Pihak Pertama)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Contoh: BUDI SANTOSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.applicantNik} onChange={e => handleDataChange('applicantNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantBirthPlace} onChange={e => handleDataChange('applicantBirthPlace', e.target.value)} placeholder="Kota Kelahiran" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantBirthDate} onChange={e => handleDataChange('applicantBirthDate', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan / Jabatan Panitia</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantJob} onChange={e => handleDataChange('applicantJob', e.target.value)} placeholder="Contoh: Wiraswasta / Ketua Panitia" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.applicantAddress} onChange={e => handleDataChange('applicantAddress', e.target.value)} placeholder="Alamat RT/RW, Desa, Kecamatan, Kab/Kota" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No. Telepon / HP (WhatsApp Aktif)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.applicantPhone} onChange={e => handleDataChange('applicantPhone', e.target.value)} placeholder="Contoh: 081234567890" />
                </div>
              </div>
              )}

              {activeTab === 'acara' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Objek Kegiatan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama / Judul Acara</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Contoh: Pentas Seni Budaya dan Dangdut" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari Pelaksanaan</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.eventDay} onChange={e => handleDataChange('eventDay', e.target.value)}>
                        <option value="Senin">Senin</option><option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option><option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option><option value="Sabtu">Sabtu</option><option value="Minggu">Minggu</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Mulai</label>
                    <input type="time" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventTimeStart} onChange={e => handleDataChange('eventTimeStart', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Selesai</label>
                    <input type="time" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventTimeEnd} onChange={e => handleDataChange('eventTimeEnd', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat / Lokasi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi fisik acara" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Hiburan / Pertunjukan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.entertainmentType} onChange={e => handleDataChange('entertainmentType', e.target.value)} placeholder="Contoh: Orkes Dangdut, Kuda Lumping, dll." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Estimasi Jumlah Massa</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.crowdEstimate} onChange={e => handleDataChange('crowdEstimate', e.target.value)} placeholder="Contoh: 500 Orang" />
                </div>
              </div>
              )}

              {activeTab === 'komitmen' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-orange-600 border-b pb-1 mb-4">Pernyataan & Komitmen Hukum</h3>
                
                <div className="space-y-5">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <label className="text-[11px] font-bold text-red-700 uppercase mb-2 block">1. Larangan Minuman Keras & Narkoba (Pasal 4 Ayat 1)</label>
                    <select className="w-full p-2 border rounded-lg text-sm bg-white" value={data.alcoholProhibition} onChange={e => handleDataChange('alcoholProhibition', e.target.value)}>
                        <option value="ya">Ya, Menjamin 100% Bebas Miras & Narkoba</option>
                        <option value="tidak">Tidak Menjamin (Berupaya Mencegah & Melaporkan)</option>
                    </select>
                    <p className="text-[10px] text-red-500 mt-2 italic">* Kepolisian mewajibkan sterilisasi area dari miras/narkoba.</p>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                    <label className="text-[11px] font-bold text-orange-700 uppercase mb-2 block">2. Kebebasan dari Unsur Politik/SARA (Pasal 4 Ayat 3)</label>
                    <select className="w-full p-2 border rounded-lg text-sm bg-white" value={data.politicalActivity} onChange={e => handleDataChange('politicalActivity', e.target.value)}>
                        <option value="bebas">Ya, 100% Bebas Unsur Politik & SARA</option>
                        <option value="mengandung">Mengandung Unsur Politik (Kampanye/Ormas)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <label className="text-[11px] font-bold text-blue-700 uppercase mb-2 block">3. Kesediaan Pembubaran Paksa (Pasal 5 Ayat 1)</label>
                    <select className="w-full p-2 border rounded-lg text-sm bg-white" value={data.willingToDisperse} onChange={e => handleDataChange('willingToDisperse', e.target.value)}>
                        <option value="ya">Ya, Bersedia dan Sanggup Dibubarkan Paksa</option>
                        <option value="tidak">Menolak/Keberatan Dibubarkan Paksa</option>
                    </select>
                    <p className="text-[10px] text-blue-500 mt-2 italic">* Pilihan "Ya" merupakan syarat mutlak bagi penerbitan izin keramaian standar Polri.</p>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'pengaturan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Surat & Tanda Tangan</h3>
                
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase">Penerima Surat (Pihak Kedua)</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Ditujukan Kepada</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.recipientTitle} onChange={e => handleDataChange('recipientTitle', e.target.value)} placeholder="Contoh: Kepala Kepolisian Sektor (Kapolsek) Ngaglik" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Di (Lokasi Kedudukan Penerima)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.recipientLocation} onChange={e => handleDataChange('recipientLocation', e.target.value)} placeholder="Contoh: Sleman" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Terbit Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.letterCity} onChange={e => handleDataChange('letterCity', e.target.value)} placeholder="Contoh: Sleman" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Terbit Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.letterDate} onChange={e => handleDataChange('letterDate', e.target.value)} />
                  </div>
                </div>
                
                <div className="pt-4 border-t mt-4 space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase">Pengesahan Pihak Terkait</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Desa/Kelurahan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} placeholder="Contoh: Sardonoharjo" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Kepala Desa / Lurah</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kepala Desa / Lurah" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Danramil (Komandan Koramil)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.koramilHead} onChange={e => handleDataChange('koramilHead', e.target.value)} placeholder="Contoh: Kapt. Inf. Agus Yulianto" />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
