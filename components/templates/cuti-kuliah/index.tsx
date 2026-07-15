"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  FileText,
  User,
  Building2,
  Calendar,
  Eye,
  Edit3,
  MapPin,
  GraduationCap
} from "lucide-react";
import PrintWrapper from "@/components/PrintWrapper";

export default function SuratCutiAkademik() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  const [data, setData] = useState({
    // Pihak Pertama (Mahasiswa)
    pihak1Nama: "Andi Saputra",
    pihak1NIK: "3171234567890001",
    pihak1TTL: "Jakarta, 15 Agustus 2002",
    pihak1Pekerjaan: "Mahasiswa",
    pihak1Alamat: "Jl. Merdeka Raya No. 45, RT 003/RW 005, Kelurahan Kebon Melati, Kecamatan Tanah Abang, Jakarta Pusat",
    pihak1NIM: "201011400234",
    pihak1Prodi: "S1 Teknik Informatika",
    pihak1Fakultas: "Fakultas Ilmu Komputer",

    // Pihak Kedua (Universitas/Fakultas)
    pihak2Nama: "Prof. Dr. Budi Santoso, M.Kom.",
    pihak2NIK: "197503121999031002",
    pihak2TTL: "Bandung, 12 Maret 1975",
    pihak2Jabatan: "Dekan Fakultas Ilmu Komputer",
    pihak2Instansi: "Universitas Teknologi Nusantara",
    pihak2Alamat: "Jl. Pendidikan No. 10, Kampus Terpadu, Jakarta Selatan",

    // Detail Cuti
    semesterTujuan: "Ganjil",
    tahunAkademik: "2024/2025",
    lamaCuti: "1 (satu) Semester",
    alasanCuti: "Kendala finansial dan keperluan penyembuhan medis secara intensif di luar kota",
    tanggalMulai: "1 September 2024",
    tanggalSelesai: "28 Februari 2025",

    // Pengesahan
    tempatDibuat: "Jakarta",
    tanggalDibuat: "10 Agustus 2024",
  });

  const handleDataChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
              Format Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
              Format Compact Rapi (Sans)
          </button>
      </div>
  );

  const ContentInside = () => (
    <div className={`text-black leading-snug ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
      <div className="text-center mb-6">
         <h1 className="text-[13pt] font-bold uppercase underline">PERJANJIAN PELAKSANAAN CUTI AKADEMIK</h1>
         <p className="text-[11pt]">Nomor: 045/UTN/CUTI/VIII/2024</p>
      </div>

      <div className="mb-4">
         <p className="text-justify mb-4">
            Pada hari ini, tanggal <strong>{data.tanggalDibuat}</strong>, bertempat di <strong>{data.tempatDibuat}</strong>, yang bertanda tangan di bawah ini:
         </p>

         {/* Pihak Pertama */}
         <div className="mb-4">
            <p className="mb-1"><strong>1. PIHAK PERTAMA (MAHASISWA)</strong></p>
            <div className="flex mb-1"><div className="w-[160px]">Nama Lengkap</div><div>: {data.pihak1Nama}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">NIK</div><div>: {data.pihak1NIK}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Tempat, Tanggal Lahir</div><div>: {data.pihak1TTL}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Pekerjaan</div><div>: {data.pihak1Pekerjaan}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">NIM</div><div>: {data.pihak1NIM}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Program Studi</div><div>: {data.pihak1Prodi}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Fakultas</div><div>: {data.pihak1Fakultas}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Alamat</div><div className="flex-1 text-justify">: {data.pihak1Alamat}</div></div>
            <p className="mt-2 text-justify">
               Dalam hal ini bertindak untuk dan atas nama diri sendiri yang mengajukan permohonan cuti akademik, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
            </p>
         </div>

         {/* Pihak Kedua */}
         <div className="mb-4">
            <p className="mb-1"><strong>2. PIHAK KEDUA (FAKULTAS / UNIVERSITAS)</strong></p>
            <div className="flex mb-1"><div className="w-[160px]">Nama Lengkap</div><div>: {data.pihak2Nama}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">NIP / NIK</div><div>: {data.pihak2NIK}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Tempat, Tanggal Lahir</div><div>: {data.pihak2TTL}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Jabatan</div><div>: {data.pihak2Jabatan}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Instansi</div><div>: {data.pihak2Instansi}</div></div>
            <div className="flex mb-1"><div className="w-[160px]">Alamat Instansi</div><div className="flex-1 text-justify">: {data.pihak2Alamat}</div></div>
            <p className="mt-2 text-justify">
               Dalam hal ini bertindak dalam jabatannya tersebut, mewakili <strong>{data.pihak2Instansi}</strong>, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
            </p>
         </div>
         
         <p className="text-justify mb-4">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK menerangkan terlebih dahulu bahwa telah bersepakat untuk mengikatkan diri dalam Perjanjian Pelaksanaan Cuti Akademik dengan syarat-syarat dan ketentuan-ketentuan sebagaimana tercantum dalam pasal-pasal berikut:
         </p>
      </div>

      {/* Pasal 1 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 1<br/>DEFINISI DAN KETENTUAN UMUM</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               <strong>Cuti Akademik</strong> adalah status mahasiswa yang secara sah diizinkan oleh pihak universitas untuk tidak mengikuti kegiatan akademik dan non-akademik dalam jangka waktu tertentu.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               <strong>Semester</strong> adalah satuan waktu kegiatan akademik yang diselenggarakan oleh <strong>{data.pihak2Instansi}</strong>.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">3.</span>
               <strong>Perjanjian</strong> adalah Perjanjian Pelaksanaan Cuti Akademik ini beserta seluruh lampiran dan perubahannya yang disepakati oleh PARA PIHAK.
            </p>
         </div>
      </div>

      {/* Pasal 2 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 2<br/>OBJEK PERJANJIAN</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               PIHAK PERTAMA mengajukan permohonan Cuti Akademik dan PIHAK KEDUA memberikan persetujuan atas permohonan tersebut untuk periode:
            </p>
            <div className="ml-6 mb-2">
               <div className="flex mb-1"><div className="w-[150px]">Semester</div><div>: {data.semesterTujuan}</div></div>
               <div className="flex mb-1"><div className="w-[150px]">Tahun Akademik</div><div>: {data.tahunAkademik}</div></div>
               <div className="flex mb-1"><div className="w-[150px]">Lama Cuti</div><div>: {data.lamaCuti}</div></div>
               <div className="flex mb-1"><div className="w-[150px]">Alasan Cuti</div><div className="flex-1">: {data.alasanCuti}</div></div>
               <div className="flex mb-1"><div className="w-[150px]">Tanggal Mulai</div><div>: {data.tanggalMulai}</div></div>
               <div className="flex mb-1"><div className="w-[150px]">Tanggal Selesai</div><div>: {data.tanggalSelesai}</div></div>
            </div>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Masa Cuti Akademik sebagaimana dimaksud pada Ayat 1 di atas tidak dihitung sebagai masa studi aktif PIHAK PERTAMA.
            </p>
         </div>
      </div>

      {/* Pasal 3 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               <strong>Hak PIHAK PERTAMA:</strong>
            </p>
            <div className="ml-6 mb-2">
               <p className="mb-1 text-justify"><span className="inline-block w-6">a.</span>Mendapatkan Surat Keputusan atau Surat Persetujuan Cuti Akademik yang sah dari PIHAK KEDUA.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">b.</span>Mempertahankan statusnya sebagai mahasiswa terdaftar pada masa cuti berlangsung tanpa diwajibkan mengikuti perkuliahan.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">c.</span>Mengajukan permohonan pengaktifan kembali (herregistrasi) setelah masa cuti akademik berakhir.</p>
            </div>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               <strong>Kewajiban PIHAK PERTAMA:</strong>
            </p>
            <div className="ml-6 mb-2">
               <p className="mb-1 text-justify"><span className="inline-block w-6">a.</span>Melunasi seluruh biaya administrasi cuti akademik sesuai dengan ketentuan yang berlaku di <strong>{data.pihak2Instansi}</strong>.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">b.</span>Membebaskan PIHAK KEDUA dari segala tuntutan akademis selama masa cuti berlangsung.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">c.</span>Melakukan daftar ulang (herregistrasi) pada waktu yang telah ditetapkan sebelum masa perkuliahan semester berikutnya dimulai.</p>
            </div>
         </div>
      </div>

      {/* Pasal 4 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 4<br/>HAK DAN KEWAJIBAN PIHAK KEDUA</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               <strong>Hak PIHAK KEDUA:</strong>
            </p>
            <div className="ml-6 mb-2">
               <p className="mb-1 text-justify"><span className="inline-block w-6">a.</span>Menerima pembayaran biaya administrasi cuti akademik dari PIHAK PERTAMA.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">b.</span>Menolak permohonan pengaktifan kembali apabila PIHAK PERTAMA melanggar ketentuan administrasi atau hukum yang berlaku.</p>
            </div>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               <strong>Kewajiban PIHAK KEDUA:</strong>
            </p>
            <div className="ml-6 mb-2">
               <p className="mb-1 text-justify"><span className="inline-block w-6">a.</span>Menerbitkan dokumen resmi tanda persetujuan Cuti Akademik untuk PIHAK PERTAMA.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">b.</span>Menjamin bahwa sistem informasi akademik memperbarui status PIHAK PERTAMA menjadi Cuti.</p>
               <p className="mb-1 text-justify"><span className="inline-block w-6">c.</span>Memulihkan status aktif PIHAK PERTAMA setelah masa cuti berakhir dan prosedur herregistrasi diselesaikan.</p>
            </div>
         </div>
      </div>

      {/* Pasal 5 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 5<br/>BIAYA DAN ADMINISTRASI</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               Biaya administrasi yang timbul akibat pelaksanaan Cuti Akademik ini dibebankan sepenuhnya kepada PIHAK PERTAMA berdasarkan tarif yang berlaku.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Selama menjalani Cuti Akademik, PIHAK PERTAMA dibebaskan dari kewajiban membayar Uang Kuliah Tunggal (UKT) atau Sumbangan Pembinaan Pendidikan (SPP) secara penuh, kecuali ditentukan lain oleh Peraturan Rektor atau kebijakan institusi yang berlaku.
            </p>
         </div>
      </div>

      {/* Pasal 6 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 6<br/>PROSEDUR PENGAKTIFAN KEMBALI</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               PIHAK PERTAMA wajib mengajukan permohonan pengaktifan kembali (herregistrasi) secara tertulis kepada PIHAK KEDUA selambat-lambatnya 14 (empat belas) hari kerja sebelum masa pengisian Kartu Rencana Studi (KRS) untuk semester aktif berikutnya.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Apabila PIHAK PERTAMA tidak melakukan herregistrasi sampai dengan batas waktu yang ditentukan, maka PIHAK PERTAMA dapat dikategorikan sebagai mahasiswa mangkir atau mengundurkan diri sesuai dengan statuta <strong>{data.pihak2Instansi}</strong>.
            </p>
         </div>
      </div>

      {/* Pasal 7 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 7<br/>SANKSI</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               Apabila PIHAK PERTAMA terbukti memberikan alasan yang tidak benar, memalsukan dokumen, atau melakukan tindakan melanggar hukum selama masa cuti, PIHAK KEDUA berhak membatalkan persetujuan cuti ini dan menjatuhkan sanksi akademik yang tegas, termasuk pemecatan (Drop Out).
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Sanksi sebagaimana dimaksud pada Ayat 1 diberikan setelah melalui proses pemeriksaan oleh komite disiplin atau pihak berwenang di lingkungan <strong>{data.pihak2Instansi}</strong>.
            </p>
         </div>
      </div>

      {/* Pasal 8 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 8<br/>KEADAAN MEMAKSA (FORCE MAJEURE)</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               Yang dimaksud dengan Keadaan Memaksa (Force Majeure) adalah peristiwa di luar kekuasaan PARA PIHAK yang mengakibatkan tidak terlaksananya kewajiban dalam Perjanjian ini, seperti bencana alam, pandemi, kebakaran, perang, huru-hara, dan kebijakan pemerintah.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Dalam hal terjadi Force Majeure, pihak yang mengalaminya harus memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari setelah kejadian, untuk diselesaikan secara musyawarah.
            </p>
         </div>
      </div>

      {/* Pasal 9 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 9<br/>PENYELESAIAN SENGKETA</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">1.</span>
               Setiap perselisihan yang timbul sebagai akibat dari penafsiran atau pelaksanaan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mufakat.
            </p>
            <p className="mb-2 text-justify">
               <span className="inline-block w-6">2.</span>
               Apabila musyawarah tidak mencapai mufakat, PARA PIHAK sepakat untuk menyelesaikannya sesuai dengan peraturan perundang-undangan yang berlaku di wilayah hukum Pengadilan Negeri setempat.
            </p>
         </div>
      </div>
      
      {/* Pasal 10 */}
      <div className="mb-4">
         <h3 className="text-center font-bold mb-2">PASAL 10<br/>PENUTUP</h3>
         <div className="ml-4">
            <p className="mb-2 text-justify">
               Demikian Perjanjian Pelaksanaan Cuti Akademik ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, tanpa ada unsur paksaan dari pihak manapun. Perjanjian ini dibuat dalam rangkap 2 (dua) yang masing-masing bermaterai cukup dan mempunyai kekuatan hukum yang mengikat.
            </p>
         </div>
      </div>

      {/* Tanda Tangan */}
      <div className="mt-10 pb-10">
         <div className="flex justify-between">
            <div className="w-1/2 text-center">
               <p><strong>PIHAK KEDUA</strong></p>
               <p className="mb-24">{data.pihak2Jabatan}</p>
               <p className="font-bold underline">{data.pihak2Nama}</p>
               <p>NIP/NIK. {data.pihak2NIK}</p>
            </div>
            <div className="w-1/2 text-center">
               <p>{data.tempatDibuat}, {data.tanggalDibuat}</p>
               <p><strong>PIHAK PERTAMA</strong></p>
               <p className="mb-24">{data.pihak1Pekerjaan}</p>
               <p className="font-bold underline">{data.pihak1Nama}</p>
               <p>NIM. {data.pihak1NIM}</p>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>Surat Permohonan Cuti Akademik - LayananDokumen</title>
      </Head>

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-40 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
               <FileText className="text-white" size={24} />
            </div>
            <div>
               <h1 className="text-xl font-black text-slate-800">Cuti Akademik</h1>
               <p className="text-xs text-slate-500 font-medium">Perjanjian Pelaksanaan Cuti Akademik</p>
            </div>
         </div>
         <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <span className="text-emerald-400">❖</span> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
         </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row relative print:hidden">
         {/* EDITOR PANEL */}
         <div className={`w-full md:w-[450px] bg-white border-r border-slate-200 overflow-y-auto custom-scrollbar md:block ${activeTab === 'editor' ? 'block' : 'hidden'} print:hidden relative z-10`}>
            <div className="p-6 space-y-8">
               
               {/* 1. PIHAK PERTAMA */}
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                     <User size={14}/> Pihak Pertama (Mahasiswa)
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Nama} onChange={e => handleDataChange('pihak1Nama', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1NIK} onChange={e => handleDataChange('pihak1NIK', e.target.value)} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">NIM</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1NIM} onChange={e => handleDataChange('pihak1NIM', e.target.value)} />
                         </div>
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1TTL} onChange={e => handleDataChange('pihak1TTL', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Program Studi</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Prodi} onChange={e => handleDataChange('pihak1Prodi', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Fakultas</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Fakultas} onChange={e => handleDataChange('pihak1Fakultas', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Pekerjaan} onChange={e => handleDataChange('pihak1Pekerjaan', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                         <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak1Alamat} onChange={e => handleDataChange('pihak1Alamat', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 2. PIHAK KEDUA */}
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                     <Building2 size={14}/> Pihak Kedua (Universitas)
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Pejabat</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Nama} onChange={e => handleDataChange('pihak2Nama', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">NIP / NIK</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2NIK} onChange={e => handleDataChange('pihak2NIK', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Lahir</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2TTL} onChange={e => handleDataChange('pihak2TTL', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Jabatan} onChange={e => handleDataChange('pihak2Jabatan', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Instansi (Nama Universitas)</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Instansi} onChange={e => handleDataChange('pihak2Instansi', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Instansi</label>
                         <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Alamat} onChange={e => handleDataChange('pihak2Alamat', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 3. DETAIL CUTI */}
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                     <GraduationCap size={14}/> Detail Cuti
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Semester</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.semesterTujuan} onChange={e => handleDataChange('semesterTujuan', e.target.value)}>
                               <option value="Ganjil">Ganjil</option>
                               <option value="Genap">Genap</option>
                            </select>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tahun Akademik</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tahunAkademik} onChange={e => handleDataChange('tahunAkademik', e.target.value)} />
                         </div>
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Lama Cuti</label>
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.lamaCuti} onChange={e => handleDataChange('lamaCuti', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggalMulai} onChange={e => handleDataChange('tanggalMulai', e.target.value)} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggalSelesai} onChange={e => handleDataChange('tanggalSelesai', e.target.value)} />
                         </div>
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Cuti</label>
                         <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alasanCuti} onChange={e => handleDataChange('alasanCuti', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. PENGESAHAN */}
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                     <MapPin size={14}/> Waktu & Tempat
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Dibuat</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tempatDibuat} onChange={e => handleDataChange('tempatDibuat', e.target.value)} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Dibuat</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggalDibuat} onChange={e => handleDataChange('tanggalDibuat', e.target.value)} />
                         </div>
                      </div>
                  </div>
               </div>

               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW PANEL */}
 <div className={`flex-1 bg-slate-200 relative overflow-hidden flex flex-col items-center md:block ${activeTab === 'preview' ? 'block' : 'hidden'} print:flex print:overflow-visible print:bg-white print:static`}>
 <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:flex print:overflow-visible print:bg-white print:p-0">
                <div className="origin-top transition-transform duration-300 transform scale-[0.6] md:scale-100 mb-[-120mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* PRINT BUTTON / MONETIZATION */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10 z-50">
         <PrintWrapper documentName="Perjanjian Cuti Akademik" price={15000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>
            <Edit3 size={16}/> Editor
         </button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>
            <Eye size={16}/> Preview
         </button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <table className="print-table w-full">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
