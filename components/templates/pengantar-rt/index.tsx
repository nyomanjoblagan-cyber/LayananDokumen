'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { 
  Printer, RotateCcw, ArrowLeftCircle, BookOpen, Edit3, FileText, User, Building, Settings
} from 'lucide-react';
import Link from 'next/link';

interface PengantarRtData {
  nomorSuratRt: string;
  nomorSuratRw: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  
  // PIHAK PERTAMA
  pihakPertamaNama: string;
  pihakPertamaNik: string;
  pihakPertamaTtl: string;
  pihakPertamaPekerjaan: string;
  pihakPertamaAlamat: string;
  pihakPertamaJabatan: string;

  // PIHAK KEDUA
  pihakKeduaNama: string;
  pihakKeduaNik: string;
  pihakKeduaNoKk: string;
  pihakKeduaTtl: string;
  pihakKeduaJenisKelamin: string;
  pihakKeduaAgama: string;
  pihakKeduaPekerjaan: string;
  pihakKeduaStatusPerkawinan: string;
  pihakKeduaKewarganegaraan: string;
  pihakKeduaAlamat: string;

  // KLAUSUL DINAMIS
  keperluan: string;
  keperluanLainnya: string;
  statusHunian: string;
  lamaTinggal: string;
  jaminanKelakuanBaik: string;
  statusWarga: string;
  
  tanggalSurat: string;
  namaKetuaRw: string;
}

const INITIAL_DATA: PengantarRtData = {
  nomorSuratRt: '05/RT.01/VII/2026',
  nomorSuratRw: '12/RW.03/VII/2026',
  rt: '01',
  rw: '03',
  desa: 'Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
  
  pihakPertamaNama: 'AHMAD FAUZI',
  pihakPertamaNik: '3404011111110001',
  pihakPertamaTtl: 'Sleman, 10 Maret 1975',
  pihakPertamaPekerjaan: 'Pegawai Negeri Sipil',
  pihakPertamaAlamat: 'Jl. Kaliurang KM 10, RT 01 RW 03, Sardonoharjo, Ngaglik, Sleman',
  pihakPertamaJabatan: 'Ketua RT 01',

  pihakKeduaNama: 'BUDI SANTOSO',
  pihakKeduaNik: '3404011508850001',
  pihakKeduaNoKk: '3404010101100002',
  pihakKeduaTtl: 'Sleman, 15 Agustus 1985',
  pihakKeduaJenisKelamin: 'Laki-laki',
  pihakKeduaAgama: 'Islam',
  pihakKeduaPekerjaan: 'Wiraswasta',
  pihakKeduaStatusPerkawinan: 'Kawin',
  pihakKeduaKewarganegaraan: 'WNI',
  pihakKeduaAlamat: 'Jl. Kaliurang KM 10, RT 01 RW 03, Sardonoharjo, Ngaglik, Sleman',

  keperluan: 'Pembuatan KTP / Administrasi Kependudukan',
  keperluanLainnya: '',
  statusHunian: 'Milik Sendiri',
  lamaTinggal: '10',
  jaminanKelakuanBaik: 'Ya',
  statusWarga: 'Warga Tetap',
  
  tanggalSurat: '2026-07-13',
  namaKetuaRw: 'SUTRISNO'
};

export default function PengantarRtPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PengantarRtBuilder />
    </Suspense>
  );
}

function PengantarRtBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PengantarRtData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'pihak1' | 'pihak2' | 'klausul'>('info');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof PengantarRtData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    const finalKeperluan = data.keperluan === 'Lainnya' && data.keperluanLainnya 
        ? data.keperluanLainnya 
        : data.keperluan;

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* KOP SURAT */}
              <div className="text-center mb-6 pb-2 border-b-[3px] border-black flex flex-col items-center">
                  <h1 className="font-bold text-xl uppercase tracking-wider">RUKUN TETANGGA (RT) {data.rt} / RUKUN WARGA (RW) {data.rw}</h1>
                  <h2 className="font-bold text-lg uppercase">DESA/KELURAHAN {data.desa}, KECAMATAN {data.kecamatan}</h2>
                  <p className="text-sm uppercase">KABUPATEN/KOTA {data.kabupaten}</p>
              </div>
              
              {/* TITLE */}
              <div className="text-center mb-8">
                  <h1 className="font-bold text-xl uppercase underline">SURAT PENGANTAR DAN PERNYATAAN DOMISILI</h1>
                  <p className="text-sm mt-1">Nomor RT: {data.nomorSuratRt}</p>
                  <p className="text-sm">Nomor RW: {data.nomorSuratRw}</p>
              </div>

              {/* PEMBUKA */}
              <div className="mb-4 text-justify">
                  <p className="mb-2">Pada hari ini, tanggal <strong>{formatDateSafe(data.tanggalSurat)}</strong>, bertempat di <strong>{data.kabupaten}</strong>, yang bertanda tangan di bawah ini:</p>
                  
                  <div className="ml-4 mb-4">
                      <div className="flex flex-row">
                          <div className="w-8">I.</div>
                          <div className="flex-1">
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Nama Lengkap</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div className="font-bold uppercase">{data.pihakPertamaNama}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">NIK</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakPertamaNik}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakPertamaTtl}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Pekerjaan</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakPertamaPekerjaan}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0 align-top">Alamat Lengkap</div>
                                  <div className="w-4 shrink-0 align-top">:</div>
                                  <div className="align-top text-justify">{data.pihakPertamaAlamat}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Jabatan</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div className="font-bold">{data.pihakPertamaJabatan}</div>
                              </div>
                          </div>
                      </div>
                      <p className="mt-2 text-justify">Dalam hal ini bertindak dalam jabatannya tersebut dan karenanya sah mewakili segenap warga dan pengurus lingkungan Rukun Tetangga (RT) {data.rt} / Rukun Warga (RW) {data.rw}, yang selanjutnya dalam dokumen ini disebut sebagai <strong>"PIHAK PERTAMA"</strong>.</p>
                  </div>

                  <div className="ml-4 mb-4">
                      <div className="flex flex-row">
                          <div className="w-8">II.</div>
                          <div className="flex-1">
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Nama Lengkap</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div className="font-bold uppercase">{data.pihakKeduaNama}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">NIK</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaNik}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">No. KK</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaNoKk}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaTtl}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Jenis Kelamin</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaJenisKelamin}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Agama</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaAgama}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Pekerjaan</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaPekerjaan}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Status Perkawinan</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaStatusPerkawinan}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0">Kewarganegaraan</div>
                                  <div className="w-4 shrink-0">:</div>
                                  <div>{data.pihakKeduaKewarganegaraan}</div>
                              </div>
                              <div className="flex flex-row mb-1">
                                  <div className="w-48 shrink-0 align-top">Alamat Lengkap</div>
                                  <div className="w-4 shrink-0 align-top">:</div>
                                  <div className="align-top text-justify">{data.pihakKeduaAlamat}</div>
                              </div>
                          </div>
                      </div>
                      <p className="mt-2 text-justify">Dalam hal ini bertindak untuk dan atas nama diri sendiri yang beralamat secara faktual di wilayah yurisdiksi PIHAK PERTAMA, yang selanjutnya dalam dokumen ini disebut sebagai <strong>"PIHAK KEDUA"</strong>.</p>
                  </div>
              </div>

              {/* RECITALS */}
              <div className="mb-6 text-justify">
                  <p className="mb-2">PIHAK PERTAMA dan PIHAK KEDUA (secara bersama-sama disebut sebagai <strong>"Para Pihak"</strong> dan masing-masing disebut sebagai <strong>"Pihak"</strong>) terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
                  <ol className="list-[lower-alpha] ml-8 space-y-1 mb-4">
                      <li className="pl-2">Bahwa, PIHAK PERTAMA adalah perangkat kemasyarakatan yang ditunjuk secara sah dan memiliki wewenang penuh untuk memberikan surat pengantar, keterangan domisili, dan layanan administratif lainnya kepada warga yang bertempat tinggal di wilayahnya.</li>
                      <li className="pl-2">Bahwa, PIHAK KEDUA adalah warga yang datang kepada PIHAK PERTAMA dengan maksud dan tujuan untuk mengajukan permohonan penerbitan surat pengantar guna mengurus keperluan administrasi di instansi terkait.</li>
                  </ol>
                  <p className="mb-2">Maka berdasarkan hal-hal tersebut di atas, Para Pihak dengan itikad baik saling setuju dan mufakat untuk menandatangani Surat Pengantar dan Pernyataan Domisili ini dengan tunduk pada syarat-syarat dan ketentuan-ketentuan sebagaimana tertuang dalam Pasal-pasal di bawah ini:</p>
              </div>

              {/* PASAL-PASAL */}
              <div className="space-y-6">
                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</p>
                      <p className="mb-1">Di dalam dokumen legal ini, kecuali secara tegas ditentukan lain oleh konteks kalimat, istilah-istilah di bawah ini memiliki makna sebagai berikut:</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2"><strong>Surat Pengantar</strong> adalah instrumen tertulis yang dibuat, disetujui, dan ditandatangani oleh Para Pihak yang berisikan pernyataan dan keterangan faktual untuk keperluan administrasi pemerintahan, pelayanan publik, sipil, atau perbankan.</li>
                          <li className="pl-2"><strong>Instansi Terkait</strong> adalah instansi pemerintah (kelurahan, kecamatan, kependudukan dan pencatatan sipil), kepolisian, instansi swasta, maupun pihak ketiga lainnya yang menjadi tujuan diserahkannya Surat Pengantar ini.</li>
                          <li className="pl-2"><strong>Rukun Tetangga (RT)</strong> dan <strong>Rukun Warga (RW)</strong> adalah kesatuan wilayah tempat berkumpulnya kelompok masyarakat, yang diakui secara administratif berkedudukan di {data.desa}, Kecamatan {data.kecamatan}, Kabupaten/Kota {data.kabupaten}.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 2<br/>OBJEK SURAT PENGANTAR (KETERANGAN DOMISILI)</p>
                      <p className="mb-1">Melalui penandatanganan dokumen ini, PIHAK PERTAMA dalam kapasitas jabatannya menerangkan dengan sebenar-benarnya dan menyatakan bahwa:</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">PIHAK KEDUA adalah benar secara faktual berdomisili dan menetap di wilayah kerja PIHAK PERTAMA sesuai dengan alamat yang tercantum pada identitasnya di atas.</li>
                          <li className="pl-2">PIHAK KEDUA berstatus sebagai <strong>{data.statusWarga}</strong> di lingkungan tersebut dengan menempati hunian berstatus <strong>{data.statusHunian}</strong>.</li>
                          <li className="pl-2">Bahwa PIHAK KEDUA telah berdomisili di lingkungan tersebut secara sah dan damai selama kurang lebih <strong>{data.lamaTinggal} (Tahun/Bulan)</strong> tanpa adanya permasalahan dengan warga sekitar.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 3<br/>MAKSUD DAN TUJUAN</p>
                      <p className="mb-1">Dokumen Surat Pengantar ini diterbitkan secara eksklusif untuk memenuhi permohonan administratif PIHAK KEDUA yang dipergunakan semata-mata dengan tujuan:</p>
                      <div className="text-center font-bold text-lg my-4 uppercase border border-black py-2 mx-8 bg-slate-50 print:bg-white print:border-2">
                          {finalKeperluan}
                      </div>
                      <p className="mb-1">Segala bentuk penggunaan dokumen ini yang menyimpang atau berada di luar dari maksud dan tujuan yang telah disebutkan di atas, merupakan bentuk pelanggaran dan menjadi tanggung jawab PIHAK KEDUA secara mutlak.</p>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 4<br/>PERNYATAAN DAN JAMINAN</p>
                      <p className="mb-1">Sehubungan dengan penerbitan Surat Pengantar ini, PIHAK KEDUA dengan ini memberikan pernyataan dan jaminan kepada PIHAK PERTAMA bahwa:</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">Seluruh identitas diri, dokumen pelengkap, keterangan asal-usul, maupun penjelasan tujuan permohonan yang diserahkan kepada PIHAK PERTAMA adalah sah, benar, valid, dan tidak sedang dalam sengketa.</li>
                          <li className="pl-2">PIHAK KEDUA tidak sedang dalam status pelarian, buronan hukum, tidak sedang menghadapi tuntutan perkara pidana, maupun terkait dengan aktivitas organisasi yang dilarang oleh Negara Kesatuan Republik Indonesia.</li>
                          <li className="pl-2">
                              {data.jaminanKelakuanBaik === 'Ya' 
                                  ? 'Berdasarkan catatan sosial di lingkungan RT setempat, PIHAK PERTAMA mengkonfirmasi dan memberikan jaminan moral bahwa PIHAK KEDUA senantiasa berkelakuan baik, mematuhi norma dan nilai sosial, serta tidak pernah menimbulkan keresahan bagi masyarakat.' 
                                  : 'PIHAK PERTAMA tidak memberikan jaminan khusus terkait rekam jejak, kelakuan baik, perdata, maupun pidana dari PIHAK KEDUA. Surat ini semata-mata bersifat administratif untuk menerangkan keberadaan fisik domisili.'}
                          </li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 5<br/>HAK DAN KEWAJIBAN PARA PIHAK</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">
                              <strong>Hak dan Kewajiban Pihak Pertama:</strong><br/>
                              a. Berhak untuk menolak permohonan, mencabut, atau membatalkan Surat Pengantar apabila terdapat indikasi pemalsuan data.<br/>
                              b. Berkewajiban memberikan pelayanan administratif dan menerbitkan Surat Pengantar berdasarkan kelengkapan berkas yang memenuhi syarat.
                          </li>
                          <li className="pl-2">
                              <strong>Hak dan Kewajiban Pihak Kedua:</strong><br/>
                              a. Berhak untuk menerima dokumen asli dari Surat Pengantar setelah seluruh persyaratan dipenuhi.<br/>
                              b. Berkewajiban untuk senantiasa menjaga nama baik, keamanan, kebersihan, dan ketertiban lingkungan RT {data.rt} / RW {data.rw}.<br/>
                              c. Berkewajiban melaporkan hasil akhir pengurusan administrasi atau apabila terdapat perubahan domisili di masa yang akan datang.
                          </li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 6<br/>MASA BERLAKU</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">Kekuatan mengikat dan legalitas dari Surat Pengantar ini mulai berlaku secara efektif terhitung sejak tanggal dokumen ini ditandatangani oleh Para Pihak dan secara resmi diketahui serta dibubuhi stempel oleh Ketua RW {data.rw}.</li>
                          <li className="pl-2">Masa berlaku dokumen ini adalah selama <strong>30 (Tiga Puluh) hari kalender</strong> sejak tanggal efektif penerbitannya, kecuali diatur lain oleh peraturan Instansi Terkait penerima surat.</li>
                          <li className="pl-2">Dokumen ini sama sekali tidak memiliki status kebendaan dan tidak dapat digunakan sebagai instrumen bukti kepemilikan atas hak tanah, bangunan, maupun barang bergerak yang ditempati PIHAK KEDUA.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 7<br/>SANKSI DAN PEMBEBASAN TANGGUNG JAWAB (INDEMNIFIKASI)</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">Dalam hal terbukti bahwa pernyataan, jaminan, maupun dokumen yang diberikan PIHAK KEDUA mengandung unsur kepalsuan, manipulasi, atau itikad buruk, maka PIHAK PERTAMA berhak penuh untuk segera membatalkan Surat Pengantar ini.</li>
                          <li className="pl-2">PIHAK KEDUA dengan ini secara mutlak membebaskan PIHAK PERTAMA, Ketua RW, maupun segenap aparat dan pengurus lingkungan dari seluruh bentuk tuntutan, gugatan hukum, pidana, maupun klaim ganti kerugian perdata di masa depan yang timbul dari pihak manapun akibat diterbitkannya dan disalahgunakannya dokumen ini.</li>
                          <li className="pl-2">Segala konsekuensi hukum maupun sanksi dari pihak berwajib yang lahir akibat perbuatan menyimpang PIHAK KEDUA menjadi beban dan tanggung jawab PIHAK KEDUA sepenuhnya secara pribadi.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 8<br/>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">Para Pihak dibebaskan dari setiap tanggung jawab atas keterlambatan atau kegagalan pemenuhan kewajiban dalam dokumen ini yang semata-mata diakibatkan oleh terjadinya Keadaan Memaksa (Force Majeure).</li>
                          <li className="pl-2">Keadaan Memaksa tersebut meliputi, namun tidak terbatas pada gempa bumi, banjir, kebakaran berskala besar, wabah atau pandemi yang memaksa karantina kewilayahan (lockdown), huru-hara, pemberontakan, serta perubahan regulasi mendadak dari Pemerintah Republik Indonesia terkait pelayanan administrasi kependudukan.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 9<br/>PENYELESAIAN PERSELISIHAN</p>
                      <ol className="list-decimal ml-8 space-y-1">
                          <li className="pl-2">Apabila di kemudian hari timbul perselisihan atau perbedaan pandangan terkait pelaksanaan, penafsiran, maupun akibat dari dokumen ini, Para Pihak sepakat untuk senantiasa mengutamakan jalur musyawarah untuk mencapai mufakat dalam ruang lingkup forum musyawarah Rukun Warga (RW) setempat.</li>
                          <li className="pl-2">Dalam hal forum musyawarah secara kekeluargaan tidak membuahkan hasil kesepakatan mufakat dalam kurun waktu 30 (tiga puluh) hari, maka Para Pihak sepakat untuk menyelesaikan permasalahan hukum tersebut melalui kepaniteraan Pengadilan Negeri wilayah hukum {data.kabupaten}.</li>
                      </ol>
                  </div>

                  <div className="text-justify">
                      <p className="font-bold mb-2 text-center">PASAL 10<br/>PENUTUP</p>
                      <p className="mb-2">Demikian SURAT PENGANTAR DAN PERNYATAAN DOMISILI ini dibuat, dibaca, dipahami, dan ditandatangani oleh Para Pihak dalam keadaan sadar, sehat secara jasmani maupun rohani, bebas dari intervensi, tekanan, maupun paksaan dalam bentuk apapun dari pihak ketiga manapun.</p>
                      <p>Surat Pengantar ini diterbitkan dalam kondisi asli dan ditandatangani secara basah (dan/atau dibubuhi materai yang cukup) untuk dapat dipergunakan sebagaimana semestinya oleh Instansi Terkait.</p>
                  </div>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12">
                  <div className="flex justify-between text-center pb-12 px-2 md:px-8">
                      <div className="w-2/5">
                          <p className="mb-1">{data.kabupaten}, {formatDateSafe(data.tanggalSurat)}</p>
                          <p className="mb-12">PIHAK KEDUA<br/>(Warga Pemohon)</p>
                          <p className="text-[9px] text-slate-500 italic mb-3 border border-slate-300 w-24 mx-auto py-1 print:border-black">Materai Rp 10.000,-</p>
                          <p className="font-bold underline uppercase">{data.pihakKeduaNama}</p>
                      </div>
                      <div className="w-2/5">
                          <p className="mb-1 opacity-0">Tanggal Surat</p>
                          <p className="mb-20">PIHAK PERTAMA<br/>(Ketua RT {data.rt})</p>
                          <p className="font-bold underline uppercase">{data.pihakPertamaNama}</p>
                      </div>
                  </div>
                  
                  <div className="flex justify-center text-center mt-4 break-inside-avoid">
                      <div className="w-2/5">
                          <p className="mb-2">Turut Mengetahui dan Mengesahkan,<br/><strong>Ketua RW {data.rw}</strong></p>
                          <div className="h-20 border-b border-transparent w-full"></div>
                          <p className="font-bold underline uppercase">{data.namaKetuaRw}</p>
                      </div>
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
          #print-only-root { display: block !important; position: relative; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
          .{ page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* TOP NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Drafter: Surat Pengantar RT</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')} className="md:hidden bg-slate-800 px-3 py-2 rounded text-xs font-bold uppercase">
              {mobileView === 'editor' ? 'Lihat Dokumen' : 'Edit Dokumen'}
            </button>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Parameter Dokumen Legal</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[9px] font-bold uppercase tracking-wider">
              <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'info' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>
                  <FileText size={14} /> <span>Info Surat</span>
              </button>
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'pihak1' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>
                  <Building size={14} /> <span>Pihak 1 (RT)</span>
              </button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r flex flex-col items-center gap-1 ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>
                  <User size={14} /> <span>Pihak 2 (Warga)</span>
              </button>
              <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 flex flex-col items-center gap-1 ${activeTab === 'klausul' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>
                  <Settings size={14} /> <span>Klausul</span>
              </button>
           </div>

 <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:flex print:overflow-visible print:bg-white">
              
              {/* TAB 1: INFORMASI SURAT & WILAYAH */}
              {activeTab === 'info' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Dokumen & Wilayah</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat RT</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSuratRt} onChange={e => handleDataChange('nomorSuratRt', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat RW</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSuratRw} onChange={e => handleDataChange('nomorSuratRw', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">RT</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">RW</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Desa / Kelurahan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.desa} onChange={e => handleDataChange('desa', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten / Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Ketua RW (Saksi)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.namaKetuaRw} onChange={e => handleDataChange('namaKetuaRw', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {/* TAB 2: PIHAK PERTAMA (RT) */}
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4">Pihak Pertama (Pengurus RT)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.pihakPertamaNama} onChange={e => handleDataChange('pihakPertamaNama', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakPertamaNik} onChange={e => handleDataChange('pihakPertamaNik', e.target.value)} maxLength={16} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakPertamaTtl} onChange={e => handleDataChange('pihakPertamaTtl', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakPertamaPekerjaan} onChange={e => handleDataChange('pihakPertamaPekerjaan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.pihakPertamaJabatan} onChange={e => handleDataChange('pihakPertamaJabatan', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihakPertamaAlamat} onChange={e => handleDataChange('pihakPertamaAlamat', e.target.value)} />
                </div>
              </div>
              )}

              {/* TAB 3: PIHAK KEDUA (WARGA) */}
              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Pihak Kedua (Warga Pemohon)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihakKeduaNama} onChange={e => handleDataChange('pihakKeduaNama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakKeduaNik} onChange={e => handleDataChange('pihakKeduaNik', e.target.value)} maxLength={16} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. KK</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakKeduaNoKk} onChange={e => handleDataChange('pihakKeduaNoKk', e.target.value)} maxLength={16} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakKeduaTtl} onChange={e => handleDataChange('pihakKeduaTtl', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihakKeduaJenisKelamin} onChange={e => handleDataChange('pihakKeduaJenisKelamin', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihakKeduaAgama} onChange={e => handleDataChange('pihakKeduaAgama', e.target.value)}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Kristen Katolik">Kristen Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakKeduaPekerjaan} onChange={e => handleDataChange('pihakKeduaPekerjaan', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status Perkawinan</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.pihakKeduaStatusPerkawinan} onChange={e => handleDataChange('pihakKeduaStatusPerkawinan', e.target.value)}>
                        <option value="Belum Kawin">Belum Kawin</option>
                        <option value="Kawin">Kawin</option>
                        <option value="Cerai Hidup">Cerai Hidup</option>
                        <option value="Cerai Mati">Cerai Mati</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kewarganegaraan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihakKeduaKewarganegaraan} onChange={e => handleDataChange('pihakKeduaKewarganegaraan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili Sesuai KTP</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihakKeduaAlamat} onChange={e => handleDataChange('pihakKeduaAlamat', e.target.value)} />
                </div>
              </div>
              )}

              {/* TAB 4: KLAUSUL DINAMIS */}
              {activeTab === 'klausul' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Klausul & Redaksional</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan / Keperluan Pengantar</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.keperluan} onChange={e => handleDataChange('keperluan', e.target.value)}>
                      <option value="Pembuatan KTP / Administrasi Kependudukan">Pembuatan KTP / Administrasi Kependudukan</option>
                      <option value="Pengantar Penerbitan SKCK (Surat Keterangan Catatan Kepolisian)">Penerbitan SKCK</option>
                      <option value="Pengantar Pernikahan / Catatan Sipil">Pengantar Nikah</option>
                      <option value="Pengajuan Bantuan Sosial Nasional / Daerah">Bantuan Sosial</option>
                      <option value="Keterangan Domisili Tempat Usaha">Keterangan Domisili Usaha</option>
                      <option value="Keterangan Ahli Waris">Keterangan Ahli Waris</option>
                      <option value="Lainnya">Lainnya... (Tulis Kustom)</option>
                  </select>
                </div>
                {data.keperluan === 'Lainnya' && (
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <label className="text-[10px] font-bold text-purple-700 uppercase">Tuliskan Keperluan Spesifik</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.keperluanLainnya} onChange={e => handleDataChange('keperluanLainnya', e.target.value)} placeholder="Misal: Pendaftaran Beasiswa Pendidikan" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status Warga</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.statusWarga} onChange={e => handleDataChange('statusWarga', e.target.value)}>
                        <option value="Warga Tetap">Warga Tetap (Asli)</option>
                        <option value="Warga Pendatang">Warga Pendatang</option>
                        <option value="Penghuni Non-Permanen">Penghuni Non-Permanen</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status Hunian</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.statusHunian} onChange={e => handleDataChange('statusHunian', e.target.value)}>
                        <option value="Milik Sendiri">Milik Sendiri</option>
                        <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                        <option value="Menumpang Keluarga">Menumpang</option>
                        <option value="Rumah Dinas">Rumah Dinas</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lama Tinggal (Durasi Berdomisili)</label>
                  <div className="flex items-center gap-2 mt-1">
                      <input type="number" min="0" className="w-24 p-2 border rounded-lg text-sm" value={data.lamaTinggal} onChange={e => handleDataChange('lamaTinggal', e.target.value)} />
                      <span className="text-sm font-medium text-slate-600">Tahun/Bulan</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jaminan Kelakuan Baik (Pasal 4)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.jaminanKelakuanBaik} onChange={e => handleDataChange('jaminanKelakuanBaik', e.target.value)}>
                      <option value="Ya">Ya, RT memberikan jaminan warga berkelakuan baik</option>
                      <option value="Tidak">Tidak ada jaminan khusus dari pengurus RT</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1 italic">*Mempengaruhi redaksional tanggung jawab moral RT di dokumen.</p>
                </div>

              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW SURAT */}
 <div className={`flex-1 bg-slate-400/20 overflow-y-auto w-full absolute md:relative inset-0 transition-transform duration-300 md:translate-x-0 ${mobileView === 'preview' ? 'translate-x-0 z-20' : 'translate-x-full print:translate-x-0 z-0'} print:flex print:overflow-visible print:bg-white print:static`}>
           <div className="min-h-full p-4 md:p-8 flex items-start justify-center">
               <DocumentContent />
           </div>
        </div>

      </main>

      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
          <div className="bg-white print:p-0">
             <DocumentContent />
          </div>
      </div>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_pengantar_rt" price={5000} />
      </div>
    </div>
  );
}

