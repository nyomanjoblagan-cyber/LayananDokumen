'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, Edit3, ArrowLeftCircle, BookOpen, MapPin
} from 'lucide-react';
import Link from 'next/link';

interface DomisiliData {
  // Surat
  nomorSurat: string;
  tanggalSurat: string;
  
  // Pihak Pertama (Pejabat)
  namaPihakPertama: string;
  jabatanPihakPertama: string;
  nipPihakPertama: string;
  instansiPihakPertama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;

  // Pihak Kedua (Pemohon)
  namaPihakKedua: string;
  nikPihakKedua: string;
  tempatLahirPihakKedua: string;
  tanggalLahirPihakKedua: string;
  jenisKelaminPihakKedua: string;
  agamaPihakKedua: string;
  pekerjaanPihakKedua: string;
  alamatPihakKedua: string;

  // Opsi Domisili
  jenisDomisili: 'Warga' | 'Perusahaan';
  statusBangunan: string;
  masaBerlaku: string;
  peruntukan: string;

  // Data Perusahaan
  namaPerusahaan: string;
  aktaPendirian: string;
  npwpPerusahaan: string;
  bidangUsaha: string;
  alamatDomisili: string; 
}

const INITIAL_DATA: DomisiliData = {
  nomorSurat: '470/123/VII/2026',
  tanggalSurat: '2026-07-13',

  namaPihakPertama: 'BUDI SANTOSO, S.E., M.Si.',
  jabatanPihakPertama: 'Kepala Desa',
  nipPihakPertama: '19700101 199503 1 001',
  instansiPihakPertama: 'Desa Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
  provinsi: 'Daerah Istimewa Yogyakarta',

  namaPihakKedua: 'ANDI PRATAMA',
  nikPihakKedua: '3404010101900001',
  tempatLahirPihakKedua: 'Sleman',
  tanggalLahirPihakKedua: '1990-05-15',
  jenisKelaminPihakKedua: 'Laki-laki',
  agamaPihakKedua: 'Islam',
  pekerjaanPihakKedua: 'Wiraswasta',
  alamatPihakKedua: 'Jl. Kaliurang KM 10, RT 01 RW 02, Sardonoharjo, Ngaglik, Sleman',

  jenisDomisili: 'Warga',
  statusBangunan: 'Milik Sendiri',
  masaBerlaku: '6 Bulan',
  peruntukan: 'Persyaratan Administrasi Perbankan',

  namaPerusahaan: 'PT MAJU JAYA ABADI',
  aktaPendirian: 'Nomor 12 Tanggal 5 Mei 2020 oleh Notaris Anita, S.H.',
  npwpPerusahaan: '01.234.567.8-901.000',
  bidangUsaha: 'Perdagangan Umum',
  alamatDomisili: 'Jl. Palagan Tentara Pelajar KM 8, Sleman, DIY',
};

export default function DomisiliPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <DomisiliBuilder />
    </Suspense>
  );
}

function DomisiliBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DomisiliData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'surat' | 'pemohon' | 'domisili' | 'perusahaan'>('surat');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof DomisiliData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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
          <Kertas>
              {/* KOP SURAT */}
              <div className="text-center border-b-[4px] border-black pb-4 mb-8">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.kabupaten}</h1>
                  <h2 className="font-bold text-xl uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
                  <h3 className="font-bold text-2xl uppercase tracking-widest">{data.instansiPihakPertama}</h3>
                  <p className="text-sm mt-1">
                      Alamat Kantor: {data.instansiPihakPertama}, Kec. {data.kecamatan}, Kab. {data.kabupaten}, {data.provinsi}
                  </p>
              </div>

              {/* JUDUL SURAT */}
              <div className="text-center mb-10">
                  <h1 className="font-bold text-xl uppercase underline tracking-wide">
                      SURAT KETERANGAN DOMISILI DAN PENETAPAN KEDUDUKAN HUKUM
                  </h1>
                  <p className="text-md mt-1">Nomor: {data.nomorSurat}</p>
              </div>

              {/* PEMBUKA */}
              <div className="mb-6 text-justify">
                  <p>Yang bertanda tangan di bawah ini, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong> (Pejabat Berwenang):</p>
              </div>

              {/* IDENTITAS PIHAK PERTAMA (Tanpa CSS Grid) */}
              <div className="ml-8 mb-6 break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nama Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold">{data.namaPihakPertama}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">NIP</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nipPihakPertama}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Jabatan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.jabatanPihakPertama} {data.instansiPihakPertama}</div>
                  </div>
              </div>

              <div className="mb-6 text-justify">
                  <p>Berdasarkan permohonan tertulis yang diajukan oleh, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong> (Pemohon):</p>
              </div>

              {/* IDENTITAS PIHAK KEDUA (Tanpa CSS Grid) */}
              <div className="ml-8 mb-6 break-inside-avoid">
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nama Lengkap (Sesuai KTP)</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="font-bold uppercase">{data.namaPihakKedua}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Nomor Induk Kependudukan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.nikPihakKedua}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.tempatLahirPihakKedua}, {formatDateSafe(data.tanggalLahirPihakKedua)}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Jenis Kelamin</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.jenisKelaminPihakKedua}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Agama</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.agamaPihakKedua}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Pekerjaan</div>
                      <div className="w-4 shrink-0">:</div>
                      <div>{data.pekerjaanPihakKedua}</div>
                  </div>
                  <div className="flex flex-row mb-1">
                      <div className="w-48 shrink-0">Alamat Lengkap</div>
                      <div className="w-4 shrink-0">:</div>
                      <div className="text-justify">{data.alamatPihakKedua}</div>
                  </div>
              </div>

              <div className="mb-6 text-justify">
                  <p>Dengan ini <strong>PIHAK PERTAMA</strong> menerangkan dan menetapkan kedudukan domisili hukum bagi <strong>PIHAK KEDUA</strong> dengan ketentuan dan syarat yang diatur dalam pasal-pasal sebagai berikut:</p>
              </div>

              {/* PASAL 1 */}
              <div className="mb-6">
                  <h4 className="font-bold text-center mb-2">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>Surat Keterangan ini merupakan dokumen resmi yang diterbitkan oleh Pemerintah {data.instansiPihakPertama} yang menyatakan kedudukan domisili sah dari PIHAK KEDUA.</li>
                      <li>Kedudukan Domisili adalah tempat tinggal atau tempat kedudukan resmi secara hukum yang diakui oleh instansi pemerintah setempat sesuai tata ruang dan administrasi kependudukan.</li>
                      <li>Objek Domisili adalah lokasi yang secara fisik dan sah beralamat di {data.jenisDomisili === 'Perusahaan' ? data.alamatDomisili : data.alamatPihakKedua}.</li>
                  </ol>
              </div>

              {/* PASAL 2 */}
              <div className="mb-6">
                  <h4 className="font-bold text-center mb-2">PASAL 2<br/>OBJEK DOMISILI</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>Bahwa PIHAK KEDUA menyatakan dengan sebenar-benarnya memiliki kedudukan domisili di <strong>{data.jenisDomisili === 'Perusahaan' ? data.alamatDomisili : data.alamatPihakKedua}</strong>.</li>
                      <li>
                          {data.jenisDomisili === 'Perusahaan' 
                              ? `Bahwa kedudukan domisili tersebut dipergunakan untuk kegiatan operasional dan administratif dari badan usaha / perusahaan bernama ${data.namaPerusahaan}.` 
                              : `Bahwa kedudukan domisili tersebut dipergunakan sebagai tempat tinggal dan/atau aktivitas warga sehari-hari dari PIHAK KEDUA.`}
                      </li>
                      <li>Status penguasaan bangunan dan/atau lahan tempat kedudukan domisili tersebut saat ini adalah <strong>{data.statusBangunan}</strong>.</li>
                  </ol>
              </div>

              {/* PASAL 3 */}
              <div className="mb-6">
                  <h4 className="font-bold text-center mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PIHAK KEDUA</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>PIHAK KEDUA berhak menggunakan Surat Keterangan Domisili ini sebagai bukti sah kedudukan hukum di wilayah {data.instansiPihakPertama} untuk segala keperluan administrasi yang tidak bertentangan dengan hukum.</li>
                      <li>PIHAK KEDUA wajib mematuhi seluruh peraturan perundang-undangan, ketertiban umum, kebersihan lingkungan, serta norma sosial yang berlaku di lingkungan {data.instansiPihakPertama}.</li>
                      <li>PIHAK KEDUA berkewajiban untuk melaporkan setiap perubahan status kedudukan, domisili, atau kepindahan tempat kepada instansi terkait selambat-lambatnya 14 (empat belas) hari kerja sejak perubahan tersebut terjadi.</li>
                      <li>Segala akibat hukum yang timbul dari penyalahgunaan dokumen domisili ini sepenuhnya menjadi tanggung jawab PIHAK KEDUA secara mutlak.</li>
                  </ol>
              </div>

              {/* PASAL 4 */}
              <div className="mb-6 break-inside-avoid">
                  <h4 className="font-bold text-center mb-2">PASAL 4<br/>PERUNTUKAN SURAT KETERANGAN</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>Surat Keterangan Domisili ini diterbitkan secara khusus untuk keperluan: <strong>{data.peruntukan}</strong>.</li>
                      <li>Penggunaan Surat Keterangan Domisili di luar dari peruntukan sebagaimana dimaksud pada ayat (1) pasal ini adalah tidak sah dan tidak mengikat PIHAK PERTAMA dalam kapasitas apapun.</li>
                      <li>PIHAK PERTAMA dibebaskan dari segala tuntutan hukum (vrijwaring) baik pidana maupun perdata atas penyalahgunaan dokumen ini oleh PIHAK KEDUA atau pihak ketiga lain yang terafiliasi dengannya.</li>
                  </ol>
              </div>

              {/* PASAL 5 */}
              <div className="mb-6 break-inside-avoid">
                  <h4 className="font-bold text-center mb-2">PASAL 5<br/>MASA BERLAKU</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>Surat Keterangan Domisili ini berlaku sah dan mengikat terhitung sejak ditandatangani yaitu pada tanggal {formatDateSafe(data.tanggalSurat)}.</li>
                      <li>Masa berlaku Surat Keterangan Domisili ini adalah selama <strong>{data.masaBerlaku}</strong> sejak tanggal penerbitan, kecuali terdapat perubahan keadaan hukum, perpindahan letak fisik, atau pencabutan dokumen.</li>
                      <li>Apabila jangka waktu sebagaimana dimaksud pada ayat (2) telah berakhir dan masih diperlukan, PIHAK KEDUA wajib mengajukan permohonan perpanjangan dengan melampirkan persyaratan yang ditentukan oleh peraturan {data.instansiPihakPertama}.</li>
                  </ol>
              </div>

              {/* PASAL 6 */}
              <div className="mb-6 break-inside-avoid">
                  <h4 className="font-bold text-center mb-2">PASAL 6<br/>KETENTUAN KHUSUS STATUS HUKUM</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      {data.jenisDomisili === 'Perusahaan' ? (
                          <>
                          <li>PIHAK KEDUA dalam kapasitasnya sebagai direktur / penanggung jawab badan usaha menjamin sepenuhnya bahwa kegiatan operasional <strong>{data.namaPerusahaan}</strong> tidak melanggar hukum, tidak mengganggu ketertiban umum, dan telah sesuai dengan peruntukan tata ruang wilayah daerah setempat.</li>
                          <li>Detail legalitas badan usaha yang dideklarasikan dan dipertanggungjawabkan kebenarannya oleh PIHAK KEDUA pada saat penetapan ini adalah sebagai berikut: Akta Pendirian/Perubahan: <strong>{data.aktaPendirian}</strong>, Nomor Pokok Wajib Pajak (NPWP): <strong>{data.npwpPerusahaan}</strong>, dan Bidang Usaha utama: <strong>{data.bidangUsaha}</strong>.</li>
                          </>
                      ) : (
                          <>
                          <li>PIHAK KEDUA dalam kapasitasnya sebagai warga/penduduk menjamin bahwa segala aktivitas keseharian di alamat domisili tersebut merupakan aktivitas sipil yang sah dan tidak melanggar ketentuan hukum pidana maupun perdata Negara Kesatuan Republik Indonesia.</li>
                          <li>Apabila di kemudian hari terbukti bahwa PIHAK KEDUA memberikan keterangan palsu mengenai kedudukan domisilinya, maka PIHAK KEDUA bersedia dituntut sesuai ketentuan perundang-undangan yang berlaku, termasuk namun tidak terbatas pada tindak pidana pemalsuan dokumen.</li>
                          </>
                      )}
                  </ol>
              </div>

              {/* PASAL 7 */}
              <div className="mb-6 break-inside-avoid">
                  <h4 className="font-bold text-center mb-2">PASAL 7<br/>SANKSI DAN PEMBATALAN</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>PIHAK PERTAMA berhak penuh untuk membatalkan dan mencabut Surat Keterangan Domisili ini secara sepihak apabila di kemudian hari ditemukan temuan atau laporan dari masyarakat bahwa PIHAK KEDUA memberikan dokumen pendukung, data, atau keterangan yang palsu, cacat hukum, atau menyesatkan pada saat permohonan.</li>
                      <li>Pencabutan dokumen ini sebagaimana diatur pada ayat (1) secara otomatis menggugurkan seluruh legalitas dan klaim kedudukan domisili yang disahkan dalam penetapan ini, tanpa kewajiban bagi PIHAK PERTAMA untuk memberikan notifikasi tertulis sebelumnya atau memberikan ganti kerugian dalam bentuk apapun kepada PIHAK KEDUA.</li>
                      <li>Setiap tindakan pemalsuan, penipuan, manipulasi data kependudukan, atau pelanggaran berat terhadap ketentuan yang tertuang dalam dokumen ini akan dilaporkan dan diteruskan kepada Pihak Kepolisian Republik Indonesia untuk diproses lebih lanjut menurut hukum yang berlaku.</li>
                  </ol>
              </div>

              {/* PASAL 8 */}
              <div className="mb-12 break-inside-avoid">
                  <h4 className="font-bold text-center mb-2">PASAL 8<br/>PENUTUP</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-justify">
                      <li>Demikian Surat Keterangan Domisili dan Penetapan Kedudukan Hukum ini dibuat dan diterbitkan dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa ada unsur paksaan, tekanan, atau pengaruh dari pihak manapun, semata-mata untuk memberikan kepastian hukum kedudukan domisili.</li>
                      <li>Dokumen ini dicetak, ditandatangani oleh Para Pihak, dibubuhi cap stempel resmi instansi PIHAK PERTAMA, dirangkap sesuai kebutuhan administratif yang wajar, dan memiliki kekuatan hukum pembuktian yang sempurna sejak tanggal penandatanganannya.</li>
                  </ol>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-between mt-12 break-inside-avoid pb-12">
                  <div className="w-1/2 text-center px-4">
                      <p className="mb-1">&nbsp;</p>
                      <p className="mb-20 font-bold uppercase">PIHAK KEDUA</p>
                      <p className="font-bold underline uppercase">{data.namaPihakKedua}</p>
                      <p className="text-sm">Pemohon / Penanggung Jawab</p>
                  </div>
                  <div className="w-1/2 text-center px-4">
                      <p className="mb-1">{data.instansiPihakPertama}, {formatDateSafe(data.tanggalSurat)}</p>
                      <p className="mb-20 font-bold uppercase">PIHAK PERTAMA</p>
                      <p className="font-bold underline uppercase">{data.namaPihakPertama}</p>
                      <p className="text-sm">{data.jabatanPihakPertama} {data.instansiPihakPertama}</p>
                      <p className="text-sm">NIP. {data.nipPihakPertama}</p>
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
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Domisili (Definitif)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <div className="no-print md:hidden flex border-b bg-white">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-sm font-bold ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Editor</button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-sm font-bold ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>Preview</button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 border-r ${activeTab === 'pemohon' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
              <button onClick={() => setActiveTab('domisili')} className={`flex-1 py-3 border-r ${activeTab === 'domisili' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Domisili</button>
              {data.jenisDomisili === 'Perusahaan' && (
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 ${activeTab === 'perusahaan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              )}
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'surat' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                </div>
                
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 mt-6">Pihak Pertama (Pejabat Berwenang)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.namaPihakPertama} onChange={e => handleDataChange('namaPihakPertama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.jabatanPihakPertama} onChange={e => handleDataChange('jabatanPihakPertama', e.target.value)} />
                    </div>
                    <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIP</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nipPihakPertama} onChange={e => handleDataChange('nipPihakPertama', e.target.value)} />
                    </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Instansi (Desa/Kelurahan)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.instansiPihakPertama} onChange={e => handleDataChange('instansiPihakPertama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Provinsi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.provinsi} onChange={e => handleDataChange('provinsi', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'pemohon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">
                  Pihak Kedua (Identitas Sesuai KTP)
                </h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPihakKedua} onChange={e => handleDataChange('namaPihakKedua', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nikPihakKedua} onChange={e => handleDataChange('nikPihakKedua', e.target.value)} maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatLahirPihakKedua} onChange={e => handleDataChange('tempatLahirPihakKedua', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalLahirPihakKedua} onChange={e => handleDataChange('tanggalLahirPihakKedua', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.jenisKelaminPihakKedua} onChange={e => handleDataChange('jenisKelaminPihakKedua', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.agamaPihakKedua} onChange={e => handleDataChange('agamaPihakKedua', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pekerjaanPihakKedua} onChange={e => handleDataChange('pekerjaanPihakKedua', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPihakKedua} onChange={e => handleDataChange('alamatPihakKedua', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'domisili' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Pengaturan Domisili</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Domisili</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold text-blue-600" 
                    value={data.jenisDomisili} 
                    onChange={e => handleDataChange('jenisDomisili', e.target.value)}
                  >
                      <option value="Warga">Domisili Warga / Pribadi</option>
                      <option value="Perusahaan">Domisili Perusahaan / Usaha</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Status Penguasaan Bangunan</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" 
                    value={data.statusBangunan} 
                    onChange={e => handleDataChange('statusBangunan', e.target.value)}
                  >
                      <option value="Milik Sendiri">Milik Sendiri</option>
                      <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                      <option value="Menumpang">Menumpang</option>
                      <option value="Fasilitas Kantor">Fasilitas Kantor</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Berlaku</label>
                  <select 
                    className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" 
                    value={data.masaBerlaku} 
                    onChange={e => handleDataChange('masaBerlaku', e.target.value)}
                  >
                      <option value="1 Bulan">1 Bulan</option>
                      <option value="3 Bulan">3 Bulan</option>
                      <option value="6 Bulan">6 Bulan</option>
                      <option value="1 Tahun">1 Tahun</option>
                      <option value="Selama Menetap / Berdomisili">Selama Menetap / Berdomisili</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Peruntukan Surat</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.peruntukan} onChange={e => handleDataChange('peruntukan', e.target.value)} placeholder="Contoh: Persyaratan administrasi pembukaan rekening bank" />
                </div>
              </div>
              )}

              {activeTab === 'perusahaan' && data.jenisDomisili === 'Perusahaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Data Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama PT / CV / Badan Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Akta Pendirian / Perubahan Terakhir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aktaPendirian} onChange={e => handleDataChange('aktaPendirian', e.target.value)} placeholder="Contoh: Nomor 12 Tanggal 5 Mei 2020 Notaris..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NPWP Perusahaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.npwpPerusahaan} onChange={e => handleDataChange('npwpPerusahaan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bidang Usaha</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.bidangUsaha} onChange={e => handleDataChange('bidangUsaha', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kedudukan Perusahaan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatDomisili} onChange={e => handleDataChange('alamatDomisili', e.target.value)} />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 bg-slate-200 overflow-y-auto relative p-4 md:p-8 custom-scrollbar print:block print:overflow-visible print:bg-white print:static">
           <DocumentContent />
        </div>
      </main>
    </div>
  );
}
