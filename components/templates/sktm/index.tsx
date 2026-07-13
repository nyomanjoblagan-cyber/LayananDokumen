'use client';

/**
 * FILE: sktm.tsx
 * DESC: Generator Surat Keterangan Tidak Mampu (SKTM) - Standar Legal Enterprise / Kelurahan Definitif
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SktmData {
  // Pihak Kedua (Instansi / Lurah)
  regencyName: string;
  subdistrictName: string;
  villageName: string;
  villageAddress: string;
  headName: string;
  headNip: string;
  headTitle: string;
  
  // Tanggal & Nomor
  date: string;
  docNumber: string;

  // Pihak Pertama (Pemohon)
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Job: string;
  pihak1Address: string;

  // Anak / Tanggungan (Objek)
  childName: string;
  childNik: string;
  childPob: string;
  childDob: string;
  childJob: string;
  childAddress: string;

  // Kondisi & Bantuan
  keperluan: string; 
  penghasilan: string; 
  metodePenyaluran: string;
  tanggunganPajak: string;
  penyelesaianSengketa: string;
}

const INITIAL_DATA: SktmData = {
  regencyName: 'Bantul',
  subdistrictName: 'Kasihan',
  villageName: 'Tirtonirmolo',
  villageAddress: 'Jl. Padokan No. 1, Kasihan, Bantul, DI Yogyakarta',
  headName: 'H. MUHAMMAD ILHAM, S.E.',
  headNip: '19700101 199903 1 002',
  headTitle: 'Kepala Desa',
  
  date: '2026-07-11',
  docNumber: '400 / 085 / VII / 2026',

  pihak1Name: 'SUPARDI',
  pihak1Nik: '3402050101700001',
  pihak1Pob: 'Bantul',
  pihak1Dob: '1970-05-12',
  pihak1Job: 'Buruh Harian Lepas',
  pihak1Address: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',

  childName: 'BUDI SANTOSO',
  childNik: '3402050101990003',
  childPob: 'Bantul',
  childDob: '1999-08-20',
  childJob: 'Pelajar/Mahasiswa',
  childAddress: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',

  keperluan: 'Beasiswa Pendidikan Jalur Prasejahtera',
  penghasilan: 'Rp 1.000.000 - Rp 1.500.000',
  metodePenyaluran: 'Tunai Sekaligus',
  tanggunganPajak: 'Ditanggung Pemerintah',
  penyelesaianSengketa: 'Musyawarah Mufakat'
};

export default function SktmPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <SktmBuilder />
    </Suspense>
  );
}

function SktmBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SktmData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'instansi' | 'anak' | 'ketentuan'>('pihak1');

  useEffect(() => {
    setIsClient(true);
    const handlePrint = () => window.print();
    window.addEventListener('open-print-modal', handlePrint);
    return () => window.removeEventListener('open-print-modal', handlePrint);
  }, []);

  const handleDataChange = (field: keyof SktmData, val: any) => {
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
      <div className="flex flex-col gap-8 print:gap-0 text-justify">
          <Kertas>
              {/* KOP SURAT */}
              <div className="text-center mb-1 border-b-4 border-black pb-4">
                  <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.regencyName}</h1>
                  <h2 className="font-bold text-2xl uppercase tracking-wider">KECAMATAN {data.subdistrictName}</h2>
                  <h3 className="font-bold text-3xl uppercase tracking-widest">KANTOR KEPALA DESA {data.villageName}</h3>
                  <p className="text-sm mt-1">{data.villageAddress}</p>
              </div>
              <div className="border-b-[1px] border-black mb-6 -mt-1"></div>
              
              {/* JUDUL SURAT */}
              <div className="text-center mb-8">
                  <h1 className="font-bold text-xl uppercase underline">SURAT PERNYATAAN DAN KETERANGAN TIDAK MAMPU (SKTM)</h1>
                  <p className="font-medium">Nomor: {data.docNumber}</p>
              </div>
              
              {/* PEMBUKA */}
              <div className="mb-4">
                  <p>Pada hari ini, tanggal {formatDateSafe(data.date)}, bertempat di {data.villageName}, kami yang bertanda tangan di bawah ini:</p>
              </div>

              {/* IDENTITAS PIHAK 1 */}
              <div className="mb-4">
                  <p className="mb-2 font-bold">I. PIHAK PERTAMA (Pemohon)</p>
                  <div className="ml-8">
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Nama Lengkap</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top font-bold uppercase w-[calc(100%-14rem)]">{data.pihak1Name}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">NIK</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.pihak1Nik}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Tempat, Tgl Lahir</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.pihak1Pob}, {formatDateSafe(data.pihak1Dob)}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Pekerjaan</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.pihak1Job}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Alamat Lengkap</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.pihak1Address}</div>
                      </div>
                  </div>
                  <p className="mt-2 ml-8">Dalam hal ini bertindak untuk dan atas nama diri sendiri dan/atau keluarga yang ditanggungnya, yang selanjutnya dalam Surat Keterangan ini disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
              </div>

              {/* IDENTITAS PIHAK 2 */}
              <div className="mb-4">
                  <p className="mb-2 font-bold">II. PIHAK KEDUA (Instansi Penerbit)</p>
                  <div className="ml-8">
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Nama Lengkap</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top font-bold uppercase w-[calc(100%-14rem)]">{data.headName}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">NIP / NIK</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.headNip}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Jabatan</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.headTitle} {data.villageName}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Alamat Instansi</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.villageAddress}</div>
                      </div>
                  </div>
                  <p className="mt-2 ml-8">Dalam hal ini bertindak dalam jabatannya tersebut, untuk dan atas nama Pemerintah {data.villageName}, yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
              </div>

              <div className="mb-4">
                  <p>Para Pihak terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
                  <ol className="list-decimal ml-8 mt-2 space-y-2">
                      <li className="pl-2">Bahwa PIHAK PERTAMA adalah warga negara Indonesia yang berdomisili sah di wilayah administratif PIHAK KEDUA berdasarkan dokumen kependudukan yang valid.</li>
                      <li className="pl-2">Bahwa PIHAK PERTAMA menyatakan dengan sesungguhnya sedang dalam kondisi sosial ekonomi yang kurang beruntung, prasejahtera, atau tidak mampu untuk memenuhi kebutuhan dasar tertentu.</li>
                      <li className="pl-2">Bahwa PIHAK KEDUA selaku otoritas pemerintah tingkat desa/kelurahan memiliki kewenangan penuh untuk melakukan verifikasi, pendataan, dan menerbitkan keterangan resmi terkait status kesejahteraan warganya sesuai perundang-undangan.</li>
                  </ol>
                  <p className="mt-4">Berdasarkan hal-hal tersebut di atas, Para Pihak dengan ini sepakat dan menyatakan untuk mengikatkan diri dalam dokumen Surat Keterangan Tidak Mampu (SKTM) ini dengan syarat-syarat dan ketentuan yang diatur dalam Pasal-Pasal sebagai berikut:</p>
              </div>
          </Kertas>

          <Kertas>
              {/* PASAL 1 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 1</p>
                  <p>DEFINISI DAN KETENTUAN UMUM</p>
              </div>
              <div className="mb-6">
                  <p>Dalam dokumen ini, yang dimaksud dengan:</p>
                  <ol className="list-decimal ml-8 mt-2 space-y-2">
                      <li className="pl-2"><strong>Surat Keterangan Tidak Mampu (SKTM)</strong> adalah dokumen legal administratif yang diterbitkan oleh instansi pemerintah yang berwenang, sebagai bukti otentik bahwa individu atau keluarga yang bersangkutan berada dalam kondisi prasejahtera.</li>
                      <li className="pl-2"><strong>Bantuan Sosial / Fasilitas</strong> adalah segala bentuk dukungan material, finansial, subsidi, atau layanan keringanan yang diberikan oleh negara, lembaga swasta, atau pihak ketiga yang bertujuan meringankan beban hidup.</li>
                      <li className="pl-2"><strong>Objek Tanggungan</strong> adalah anggota keluarga atau individu yang berada secara langsung di bawah tanggung jawab moral dan finansial PIHAK PERTAMA.</li>
                  </ol>
              </div>

              {/* PASAL 2 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 2</p>
                  <p>OBJEK KETERANGAN DAN TANGGUNGAN</p>
              </div>
              <div className="mb-6">
                  <p className="mb-3">PIHAK PERTAMA dengan ini menerangkan secara tegas bahwa Surat Keterangan ini diajukan secara spesifik untuk kepentingan anggota keluarga yang berada di bawah tanggungannya, dengan rincian identitas sebagai berikut:</p>
                  
                  <div className="ml-8 mb-3">
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Nama Lengkap</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top font-bold uppercase w-[calc(100%-14rem)]">{data.childName}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">NIK</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.childNik}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Tempat, Tgl Lahir</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.childPob}, {formatDateSafe(data.childDob)}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Pekerjaan/Pendidikan</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.childJob}</div>
                      </div>
                      <div className="mb-1">
                          <div className="inline-block w-48 align-top">Alamat Lengkap</div>
                          <div className="inline-block w-4 align-top">:</div>
                          <div className="inline-block align-top w-[calc(100%-14rem)]">{data.childAddress}</div>
                      </div>
                  </div>
                  
                  <p>Individu sebagaimana disebutkan di atas selanjutnya berstatus sebagai Penerima Manfaat langsung atas segala bentuk fasilitas yang didapatkan melalui penggunaan dokumen SKTM ini.</p>
              </div>

              {/* PASAL 3 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 3</p>
                  <p>PERNYATAAN KONDISI SOSIAL EKONOMI</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">PIHAK PERTAMA menyatakan di bawah sumpah bahwa saat ini memiliki estimasi total pendapatan/penghasilan rata-rata per bulan sebesar <strong>{data.penghasilan}</strong>, yang mana jumlah tersebut diklasifikasikan masuk dalam kategori prasejahtera atau di bawah standar pemenuhan kebutuhan hidup layak tingkat daerah.</li>
                      <li className="pl-2">PIHAK PERTAMA menyatakan tidak memiliki aset produktif berlebih berupa kepemilikan tanah dalam skala besar, bangunan komersial, atau kendaraan bermotor roda empat yang bernilai material tinggi yang lazimnya dikategorikan sebagai barang mewah.</li>
                      <li className="pl-2">PIHAK KEDUA menyatakan telah melakukan validasi, verifikasi data administrasi kependudukan, dan/atau peninjauan laporan di lapangan yang membuktikan kebenaran pernyataan PIHAK PERTAMA sebagaimana dimaksud pada Ayat 1 dan Ayat 2 Pasal ini.</li>
                  </ol>
              </div>

              {/* PASAL 4 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 4</p>
                  <p>TUJUAN DAN PENGGUNAAN DOKUMEN</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">PIHAK KEDUA menerbitkan Surat Keterangan ini secara khusus dan terbatas untuk memfasilitasi PIHAK PERTAMA dalam pengurusan dan kelengkapan administrasi pada: <strong>{data.keperluan}</strong>.</li>
                      <li className="pl-2">Dokumen Surat Keterangan ini tidak dapat disalahgunakan, dialihkan kepada pihak yang tidak berkepentingan, digandakan untuk tujuan penipuan, atau dipergunakan untuk tujuan lain di luar dari apa yang telah disepakati dan secara eksplisit dicantumkan pada Ayat 1.</li>
                  </ol>
              </div>
          </Kertas>

          <Kertas>
              {/* PASAL 5 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 5</p>
                  <p>METODE PENYALURAN DAN MEKANISME BANTUAN</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">Bahwa segala bentuk fasilitas, dana, atau bantuan yang nantinya disetujui untuk diterima oleh PIHAK PERTAMA dari pihak instansi penyalur akan dilaksanakan dengan skema penyaluran: <strong>{data.metodePenyaluran}</strong>, sesuai dengan ketersediaan dan prosedur instansi terkait.</li>
                      <li className="pl-2">PIHAK PERTAMA terikat kewajiban mutlak untuk mempergunakan bantuan yang diterima sesuai dengan asas kepatutan, pemenuhan kebutuhan esensial Penerima Manfaat, serta dilarang keras mengalihkan bantuan tersebut untuk kegiatan yang melanggar hukum perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia.</li>
                      <li className="pl-2">Disepakati bahwa segala bentuk beban perpajakan, biaya administrasi perbankan, maupun potongan lain yang mungkin timbul sebagai akibat langsung dari penerimaan fasilitas berdasarkan SKTM ini akan berstatus: <strong>{data.tanggunganPajak}</strong>.</li>
                  </ol>
              </div>

              {/* PASAL 6 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 6</p>
                  <p>HAK DAN KEWAJIBAN PARA PIHAK</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2"><strong>Hak dan Kewajiban PIHAK PERTAMA:</strong>
                          <ul className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                              <li className="pl-2">Berhak menggunakan dokumen SKTM yang sah ini untuk mendapatkan haknya sebagai warga negara pada instansi atau lembaga yang dituju.</li>
                              <li className="pl-2">Wajib memberikan keterangan identitas, latar belakang ekonomi, dan dokumen pendukung yang jujur, valid, serta dapat dipertanggungjawabkan keasliannya di muka hukum.</li>
                          </ul>
                      </li>
                      <li className="pl-2 mt-2"><strong>Hak dan Kewajiban PIHAK KEDUA:</strong>
                          <ul className="list-[lower-alpha] ml-6 mt-1 space-y-1">
                              <li className="pl-2">Berhak membekukan, menangguhkan, atau mencabut SKTM ini sewaktu-waktu tanpa pemberitahuan sebelumnya apabila ditemukan adanya unsur pemalsuan data.</li>
                              <li className="pl-2">Wajib memproses penerbitan SKTM ini tanpa melakukan pungutan liar, menjaga kerahasiaan data pribadi, dan memberikan pelayanan administratif secara terstandar dan transparan.</li>
                          </ul>
                      </li>
                  </ol>
              </div>

              {/* PASAL 7 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 7</p>
                  <p>SANKSI HUKUM DAN PEMBATALAN</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">Apabila di kemudian hari terbukti secara sah dan meyakinkan bahwa PIHAK PERTAMA memberikan keterangan palsu, memalsukan dokumen pendukung (KTP, KK, Bukti Tagihan), atau menyembunyikan fakta materiil yang relevan, maka Surat Keterangan ini dinyatakan batal demi hukum sejak awal diterbitkan (<em>void ab initio</em>).</li>
                      <li className="pl-2">PIHAK KEDUA mencadangkan hak penuh untuk melaporkan tindak pidana pemalsuan surat, pemberian keterangan palsu, atau penipuan tersebut kepada pihak Kepolisian Republik Indonesia atau instansi berwajib lainnya sesuai dengan ketentuan Kitab Undang-Undang Hukum Pidana (KUHP).</li>
                  </ol>
              </div>

              {/* PASAL 8 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 8</p>
                  <p>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">Tidak ada satupun pihak yang dapat dimintai pertanggungjawaban atas keterlambatan, penundaan, atau kegagalan dalam memenuhi hak dan kewajiban yang ditetapkan dalam SKTM ini apabila hal tersebut secara langsung diakibatkan oleh Keadaan Memaksa (<em>Force Majeure</em>).</li>
                      <li className="pl-2">Keadaan Memaksa sebagaimana dimaksud meliputi namun tidak terbatas pada bencana alam tingkat nasional/daerah, pandemi yang ditetapkan pemerintah, kerusuhan massal, huru-hara, atau perubahan drastis pada kebijakan perundang-undangan yang menghalangi pelaksanaan dokumen ini.</li>
                  </ol>
              </div>
          </Kertas>

          <Kertas>
              {/* PASAL 9 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 9</p>
                  <p>PENYELESAIAN SENGKETA</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">Segala bentuk perselisihan, perbedaan penafsiran, atau sengketa kerugian yang timbul sehubungan dengan pelaksanaan hak dan kewajiban dalam Surat Keterangan ini pada tingkat pertama akan diselesaikan secara <strong>{data.penyelesaianSengketa}</strong> oleh Para Pihak.</li>
                      <li className="pl-2">Apabila mekanisme penyelesaian pada Ayat 1 tidak mencapai mufakat dalam kurun waktu 30 (tiga puluh) hari kalender, maka Para Pihak sepakat untuk memilih domisili hukum yang tetap dan tidak berubah pada Kantor Kepaniteraan Pengadilan Negeri terdekat dari wilayah administrasi PIHAK KEDUA.</li>
                  </ol>
              </div>

              {/* PASAL 10 */}
              <div className="text-center font-bold mt-2 mb-4">
                  <p>PASAL 10</p>
                  <p>PENUTUP</p>
              </div>
              <div className="mb-6">
                  <ol className="list-decimal ml-8 space-y-2">
                      <li className="pl-2">Surat Keterangan dan Pernyataan ini dibuat dengan itikad baik dan penuh kesadaran tanpa adanya paksaan maupun tekanan psikologis dari pihak manapun.</li>
                      <li className="pl-2">Dokumen ini diterbitkan, dicetak, dan ditandatangani di {data.villageName} pada hari dan tanggal sebagaimana telah disebutkan secara tegas pada bagian pembuka, untuk dipergunakan sebagaimana mestinya.</li>
                  </ol>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12 mb-8 overflow-hidden break-inside-avoid">
                  <div className="float-left w-[45%] text-center">
                      <p className="mb-24">PIHAK PERTAMA,<br/>Yang Membuat Pernyataan</p>
                      <p className="font-bold underline uppercase">{data.pihak1Name}</p>
                  </div>
                  <div className="float-right w-[45%] text-center">
                      <p className="mb-24">{data.villageName}, {formatDateSafe(data.date)}<br/>PIHAK KEDUA,<br/>{data.headTitle}</p>
                      <p className="font-bold underline uppercase">{data.headName}</p>
                      <p>NIP. {data.headNip}</p>
                  </div>
                  <div className="clear-both"></div>
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - SKTM</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="md:hidden flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setMobileView('editor')} 
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mobileView === 'editor' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                Form
              </button>
              <button 
                onClick={() => setMobileView('preview')} 
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mobileView === 'preview' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                Preview
              </button>
            </div>
            
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
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
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak I (Pemohon)</button>
              <button onClick={() => setActiveTab('instansi')} className={`flex-1 py-3 border-r ${activeTab === 'instansi' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak II (Instansi)</button>
              <button onClick={() => setActiveTab('anak')} className={`flex-1 py-3 border-r ${activeTab === 'anak' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Anak / Objek</button>
              <button onClick={() => setActiveTab('ketentuan')} className={`flex-1 py-3 ${activeTab === 'ketentuan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Ketentuan SKTM</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pemohon (Pihak Pertama)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pihak1Name} onChange={e => handleDataChange('pihak1Name', e.target.value)} placeholder="Contoh: SUPARDI" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Nik} onChange={e => handleDataChange('pihak1Nik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Pob} onChange={e => handleDataChange('pihak1Pob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Dob} onChange={e => handleDataChange('pihak1Dob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pihak1Job} onChange={e => handleDataChange('pihak1Job', e.target.value)} placeholder="Contoh: Buruh Harian Lepas" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pihak1Address} onChange={e => handleDataChange('pihak1Address', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'instansi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Instansi & Kop (Pihak Kedua)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kabupaten/Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.regencyName} onChange={e => handleDataChange('regencyName', e.target.value)} placeholder="Contoh: Bantul" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kecamatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.subdistrictName} onChange={e => handleDataChange('subdistrictName', e.target.value)} placeholder="Contoh: Kasihan" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Desa/Kelurahan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} placeholder="Contoh: Tirtonirmolo" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Instansi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.villageAddress} onChange={e => handleDataChange('villageAddress', e.target.value)} placeholder="Alamat lengkap instansi" />
                </div>
                <div className="pt-4 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-purple-700 uppercase mb-3">Detail Dokumen & Pejabat</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.docNumber} onChange={e => handleDataChange('docNumber', e.target.value)} placeholder="Nomor registrasi surat" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Diterbitkan</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pejabat (Kepala Desa/Lurah)</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.headName} onChange={e => handleDataChange('headName', e.target.value)} placeholder="Nama pejabat" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIP / NIK Pejabat</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.headNip} onChange={e => handleDataChange('headNip', e.target.value)} placeholder="NIP Pejabat" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.headTitle} onChange={e => handleDataChange('headTitle', e.target.value)} placeholder="Contoh: Kepala Desa" />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'anak' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Tanggungan (Anak / Ybs)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Sesuai KTP/KK</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Contoh: BUDI SANTOSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childNik} onChange={e => handleDataChange('childNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childPob} onChange={e => handleDataChange('childPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childDob} onChange={e => handleDataChange('childDob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan/Pendidikan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.childJob} onChange={e => handleDataChange('childJob', e.target.value)} placeholder="Contoh: Pelajar/Mahasiswa" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.childAddress} onChange={e => handleDataChange('childAddress', e.target.value)} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'ketentuan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Ketentuan & Pasal SKTM</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan / Keperluan Surat</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.keperluan} onChange={e => handleDataChange('keperluan', e.target.value)} placeholder="Contoh: Beasiswa Pendidikan" />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Rata-rata Penghasilan (Pasal 3)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.penghasilan} onChange={e => handleDataChange('penghasilan', e.target.value)}>
                      <option value="Di bawah Rp 500.000">Di bawah Rp 500.000</option>
                      <option value="Rp 500.000 - Rp 1.000.000">Rp 500.000 - Rp 1.000.000</option>
                      <option value="Rp 1.000.000 - Rp 1.500.000">Rp 1.000.000 - Rp 1.500.000</option>
                      <option value="Rp 1.500.000 - UMR Daerah">Rp 1.500.000 - UMR Daerah</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Penyaluran Bantuan (Pasal 5)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.metodePenyaluran} onChange={e => handleDataChange('metodePenyaluran', e.target.value)}>
                      <option value="Tunai Sekaligus">Tunai Sekaligus</option>
                      <option value="Cicilan Bulanan">Cicilan Bulanan</option>
                      <option value="Natura / Barang Pokok">Natura / Barang Pokok</option>
                      <option value="Layanan Kesehatan / Pendidikan Langsung">Layanan Kesehatan / Pendidikan Langsung</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggungan Pajak (Pasal 5)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.tanggunganPajak} onChange={e => handleDataChange('tanggunganPajak', e.target.value)}>
                      <option value="Bebas Pajak">Bebas Pajak</option>
                      <option value="Ditanggung Pemerintah">Ditanggung Pemerintah</option>
                      <option value="Ditanggung Lembaga Donatur">Ditanggung Lembaga Donatur</option>
                      <option value="Dipotong dari Nominal Bantuan">Dipotong dari Nominal Bantuan</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Penyelesaian Sengketa (Pasal 9)</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.penyelesaianSengketa} onChange={e => handleDataChange('penyelesaianSengketa', e.target.value)}>
                      <option value="Musyawarah Mufakat">Musyawarah Mufakat</option>
                      <option value="Mediasi Tingkat Desa">Mediasi Tingkat Desa</option>
                      <option value="Jalur Litigasi Pengadilan">Jalur Litigasi Pengadilan</option>
                  </select>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW & PDF RENDERER */}
        <div className={`flex-1 bg-slate-500 overflow-y-auto w-full absolute md:relative z-0 ${mobileView === 'editor' ? 'hidden md:block' : 'block'} print:block print:overflow-visible print:bg-white print:static`} style={{ height: '100%' }}>
            
            {/* INVISIBLE PRINT CONTAINER (Hanya muncul saat CTRL+P) */}
            <div id="print-only-root" className="hidden print:block bg-white w-full print:h-auto print:static">
               <DocumentContent />
            </div>

            {/* LIVE PREVIEW CONTAINER (Untuk UI web) */}
            <div className="p-8 print:hidden flex justify-center min-w-min">
                <div className="scale-100 origin-top shadow-2xl transition-transform duration-300 hover:shadow-3xl">
                   <DocumentContent />
                </div>
            </div>

            {/* Spacer for mobile scroll */}
            <div className="h-32 md:hidden"></div>
        </div>
      </main>
    </div>
  );
}
