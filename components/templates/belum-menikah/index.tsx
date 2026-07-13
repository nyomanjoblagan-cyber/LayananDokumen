'use client';
import React, { useState } from 'react';
import { 
  FileText, Users, Building, MapPin, Calendar, 
  Printer, CheckCircle2, ChevronRight, 
  Eye, ArrowLeft, Stamp, FileSignature, 
  ShieldCheck, AlertCircle, Scale
} from 'lucide-react';

export default function BelumMenikahEnterprise() {
  const [activeTab, setActiveTab] = useState('pihak1');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const [data, setData] = useState({
    // Pihak Pertama
    pihak1Name: '',
    pihak1Nik: '',
    pihak1Pob: '',
    pihak1Dob: '',
    pihak1Gender: 'Laki-laki',
    pihak1Religion: 'Islam',
    pihak1Job: '',
    pihak1Address: '',

    // Pihak Kedua
    pihak2Name: '',
    pihak2Nik: '',
    pihak2Pob: '',
    pihak2Dob: '',
    pihak2Gender: 'Laki-laki',
    pihak2Religion: 'Islam',
    pihak2Job: '',
    pihak2Address: '',

    // Dokumen & Konfigurasi
    purpose: '',
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    sanksiPelanggaran: 'Tuntutan Pidana dan Perdata sesuai Hukum yang berlaku', // Dropdown dynamic 1
    penyelesaianSengketa: 'Pengadilan Negeri', // Dropdown dynamic 2
    wilayahPengadilan: 'Jakarta Selatan',

    // Saksi-saksi
    witness1Name: '',
    witness1Nik: '',
    witness2Name: '',
    witness2Nik: ''
  });

  const handleDataChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '...';
    try {
      const date = new Date(dateString);
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateString;
    }
  };

  const tabs = [
    { id: 'pihak1', label: 'Pihak Pertama', icon: <Users size={14} /> },
    { id: 'pihak2', label: 'Pihak Kedua', icon: <Building size={14} /> },
    { id: 'dokumen', label: 'Ketentuan & Opsi', icon: <Scale size={14} /> },
    { id: 'saksi', label: 'Saksi & Waktu', icon: <FileSignature size={14} /> }
  ];

  const InputField = ({ label, field, placeholder, type = 'text', maxLength }: any) => (
    <div className="mb-3">
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{label}</label>
      <input 
        type={type}
        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        value={data[field as keyof typeof data]} 
        onChange={e => handleDataChange(field, e.target.value)} 
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );

  const SelectField = ({ label, field, options }: any) => (
    <div className="mb-3">
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{label}</label>
      <select 
        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
        value={data[field as keyof typeof data]} 
        onChange={e => handleDataChange(field, e.target.value)}
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const TextAreaField = ({ label, field, placeholder }: any) => (
    <div className="mb-3">
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{label}</label>
      <textarea 
        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
        value={data[field as keyof typeof data]} 
        onChange={e => handleDataChange(field, e.target.value)} 
        placeholder={placeholder} 
      />
    </div>
  );

  // KOMPONEN DOKUMEN CETAK
  const DocumentContent = () => (
    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] sm:p-[25.4mm] text-black font-serif print:shadow-none print:p-0 mx-auto">
      
      {/* KOP DOKUMEN */}
      <div className="text-center mb-8 border-b-4 border-black pb-4">
        <h1 className="text-xl font-black uppercase tracking-wider">SURAT PERNYATAAN DAN PERJANJIAN JAMINAN</h1>
        <h2 className="text-lg font-bold uppercase tracking-wide">STATUS BELUM PERNAH MENIKAH</h2>
        <p className="text-sm mt-1">Nomor: _____/S-PBM/____/2026</p>
      </div>

      <div className="text-justify text-sm leading-relaxed space-y-4">
        <p>
          Pada hari ini, <span className="font-bold">_____</span>, tanggal <span className="font-bold">{formatDate(data.date)}</span>, 
          bertempat di <span className="font-bold">{data.city || '...................'}</span>, yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mt-4">
          <p className="font-bold mb-2 uppercase">I. PIHAK PERTAMA (Pemberi Pernyataan)</p>
          <div className="pl-6 space-y-1">
            <div className="flex">
              <span className="w-48 inline-block">Nama Lengkap</span>
              <span className="w-4">:</span>
              <span className="font-bold uppercase">{data.pihak1Name || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Nomor Induk Kependudukan</span>
              <span className="w-4">:</span>
              <span>{data.pihak1Nik || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Tempat, Tanggal Lahir</span>
              <span className="w-4">:</span>
              <span>{data.pihak1Pob || '..........'}, {formatDate(data.pihak1Dob)}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Jenis Kelamin</span>
              <span className="w-4">:</span>
              <span>{data.pihak1Gender}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Agama</span>
              <span className="w-4">:</span>
              <span>{data.pihak1Religion}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Pekerjaan</span>
              <span className="w-4">:</span>
              <span>{data.pihak1Job || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block align-top">Alamat Lengkap</span>
              <span className="w-4 align-top">:</span>
              <span className="flex-1">{data.pihak1Address || '.......................................................................................................'}</span>
            </div>
          </div>
          <p className="pl-6 mt-2">
            Selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK PERTAMA"</strong>.
          </p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mt-4">
          <p className="font-bold mb-2 uppercase">II. PIHAK KEDUA (Penerima Pernyataan)</p>
          <div className="pl-6 space-y-1">
            <div className="flex">
              <span className="w-48 inline-block">Nama Lengkap</span>
              <span className="w-4">:</span>
              <span className="font-bold uppercase">{data.pihak2Name || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Nomor Induk Kependudukan</span>
              <span className="w-4">:</span>
              <span>{data.pihak2Nik || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Tempat, Tanggal Lahir</span>
              <span className="w-4">:</span>
              <span>{data.pihak2Pob || '..........'}, {formatDate(data.pihak2Dob)}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Jenis Kelamin</span>
              <span className="w-4">:</span>
              <span>{data.pihak2Gender}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Agama</span>
              <span className="w-4">:</span>
              <span>{data.pihak2Religion}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block">Pekerjaan</span>
              <span className="w-4">:</span>
              <span>{data.pihak2Job || '...................................................'}</span>
            </div>
            <div className="flex">
              <span className="w-48 inline-block align-top">Alamat Lengkap</span>
              <span className="w-4 align-top">:</span>
              <span className="flex-1">{data.pihak2Address || '.......................................................................................................'}</span>
            </div>
          </div>
          <p className="pl-6 mt-2">
            Selanjutnya dalam Perjanjian ini disebut sebagai <strong>"PIHAK KEDUA"</strong>.
          </p>
        </div>

        <div className="mt-6">
          <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>"PARA PIHAK"</strong>. PARA PIHAK dengan ini terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
          <ol className="list-none pl-6 space-y-2 mt-2">
            <li className="flex gap-2">
              <span>a.</span>
              <span>Bahwa PIHAK PERTAMA adalah individu yang cakap hukum dan bermaksud memberikan jaminan mutlak mengenai status perkawinannya kepada PIHAK KEDUA.</span>
            </li>
            <li className="flex gap-2">
              <span>b.</span>
              <span>Bahwa PIHAK KEDUA memerlukan kepastian dan jaminan hukum terkait status perkawinan PIHAK PERTAMA untuk keperluan {data.purpose ? <span className="font-bold">"{data.purpose}"</span> : "..................................................."}.</span>
            </li>
          </ol>
        </div>

        <p className="mt-4">
          Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Surat Pernyataan dan Perjanjian Jaminan ini dengan syarat-syarat dan ketentuan-ketentuan yang diatur dalam pasal-pasal berikut:
        </p>

        {/* PASAL 1 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 1</p>
          <p>DEFINISI DAN INTERPRETASI</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2"><strong>"Perjanjian"</strong> berarti Surat Pernyataan dan Perjanjian Jaminan Status Belum Pernah Menikah ini, termasuk segala lampiran dan perubahannya di masa mendatang yang disepakati secara tertulis oleh PARA PIHAK.</li>
          <li className="pl-2"><strong>"Status Belum Pernah Menikah"</strong> berarti kondisi faktual dan hukum PIHAK PERTAMA yang pada saat Perjanjian ini ditandatangani belum pernah terikat dalam tali perkawinan yang sah, baik secara hukum agama, hukum adat, maupun hukum negara Republik Indonesia.</li>
          <li className="pl-2"><strong>"Sanksi Pelanggaran"</strong> berarti konsekuensi hukum yang wajib dipenuhi oleh PIHAK PERTAMA apabila terbukti melanggar jaminan yang diberikan.</li>
        </ol>

        {/* PASAL 2 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 2</p>
          <p>OBJEK PERJANJIAN DAN RUANG LINGKUP</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">Objek utama dari Perjanjian ini adalah jaminan dan pernyataan mutlak dari PIHAK PERTAMA mengenai Status Belum Pernah Menikah.</li>
          <li className="pl-2">PIHAK PERTAMA dengan sadar, tanpa paksaan dari pihak manapun, menyatakan dan menjamin kepada PIHAK KEDUA bahwa PIHAK PERTAMA benar-benar berstatus BELUM PERNAH MENIKAH.</li>
          <li className="pl-2">Ruang lingkup jaminan ini berlaku sejak tanggal penandatanganan Perjanjian dan akan terus berlaku sebagai dasar hukum bagi PIHAK KEDUA dalam mengambil keputusan atau tindakan yang berkaitan dengan PIHAK PERTAMA.</li>
        </ol>

        {/* PASAL 3 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 3</p>
          <p>HAK DAN KEWAJIBAN PIHAK PERTAMA</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">PIHAK PERTAMA berhak mendapatkan kepastian bahwa informasi dan data pribadi yang termuat dalam Perjanjian ini dikelola dengan baik oleh PIHAK KEDUA sesuai dengan peraturan perundang-undangan yang berlaku.</li>
          <li className="pl-2">PIHAK PERTAMA berkewajiban menanggung segala resiko, baik materil maupun immateril, apabila di kemudian hari terbukti bahwa pernyataan dan jaminan yang diberikan dalam Perjanjian ini adalah tidak benar, palsu, atau direkayasa.</li>
          <li className="pl-2">PIHAK PERTAMA berkewajiban memberikan bukti-bukti dokumen tambahan (seperti Surat Keterangan Belum Menikah dari Kelurahan/Desa) apabila diminta sewaktu-waktu oleh PIHAK KEDUA untuk proses verifikasi lanjutan.</li>
        </ol>

        {/* PASAL 4 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 4</p>
          <p>HAK DAN KEWAJIBAN PIHAK KEDUA</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">PIHAK KEDUA berhak untuk melakukan verifikasi, investigasi, dan penelusuran terhadap kebenaran Status Belum Pernah Menikah PIHAK PERTAMA ke instansi yang berwenang (Kantor Urusan Agama, Dinas Kependudukan dan Pencatatan Sipil, atau instansi terkait lainnya).</li>
          <li className="pl-2">PIHAK KEDUA berhak sepenuhnya menggunakan Surat Pernyataan ini sebagai dasar untuk menuntut PIHAK PERTAMA secara hukum jika ditemukan adanya unsur penipuan, kebohongan, atau pemalsuan identitas.</li>
          <li className="pl-2">PIHAK KEDUA berkewajiban menjaga kerahasiaan dokumen ini dan hanya menggunakannya untuk kepentingan yang telah disepakati bersama.</li>
        </ol>

        {/* PASAL 5 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 5</p>
          <p>KONSEKUENSI HUKUM DAN SANKSI</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">Apabila di kemudian hari terbukti bahwa PIHAK PERTAMA telah memberikan keterangan palsu mengenai Status Belum Pernah Menikah, maka PIHAK PERTAMA secara hukum dianggap telah melakukan perbuatan melawan hukum (wanprestasi dan/atau penipuan).</li>
          <li className="pl-2">Sebagai konsekuensi dari pelanggaran pada ayat (1) di atas, PARA PIHAK sepakat bahwa PIHAK PERTAMA akan dikenakan sanksi berupa <strong>{data.sanksiPelanggaran}</strong> yang akan dieksekusi secara langsung tanpa memerlukan putusan pengadilan yang berkekuatan hukum tetap (inkracht).</li>
          <li className="pl-2">Pemilihan sanksi sebagaimana dimaksud pada ayat (2) tidak menghilangkan hak PIHAK KEDUA untuk membatalkan seluruh proses, fasilitas, atau perjanjian lain yang mendasarkan pada jaminan Status Belum Pernah Menikah PIHAK PERTAMA.</li>
        </ol>

        {/* PASAL 6 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 6</p>
          <p>INDEMNIFIKASI (PEMBEBASAN TANGGUNG JAWAB)</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">PIHAK PERTAMA dengan ini secara tegas membebaskan PIHAK KEDUA dari segala macam bentuk tuntutan, gugatan, klaim, atau ganti rugi dari pihak ketiga manapun (termasuk namun tidak terbatas pada individu yang mengaku sebagai istri/suami sah dari PIHAK PERTAMA) yang mungkin timbul akibat ketidakbenaran pernyataan ini.</li>
          <li className="pl-2">Segala biaya yang timbul akibat penyelesaian masalah hukum yang berkaitan dengan ketidakbenaran status perkawinan PIHAK PERTAMA akan sepenuhnya menjadi beban dan tanggung jawab pribadi PIHAK PERTAMA.</li>
        </ol>

        {/* PASAL 7 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 7</p>
          <p>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">Tidak ada satu pihak pun yang dapat dimintai pertanggungjawaban atas kegagalan atau keterlambatan dalam melaksanakan kewajiban berdasarkan Perjanjian ini yang diakibatkan oleh Keadaan Memaksa (Force Majeure).</li>
          <li className="pl-2">Keadaan Memaksa meliputi bencana alam, huru-hara, peperangan, perubahan drastis dalam perundang-undangan, kebakaran, atau peristiwa lain di luar kendali wajar PARA PIHAK.</li>
          <li className="pl-2">Pihak yang mengalami Keadaan Memaksa wajib memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari kalender sejak terjadinya peristiwa tersebut.</li>
        </ol>

        {/* PASAL 8 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 8</p>
          <p>PENYELESAIAN SENGKETA</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">Segala perselisihan, sengketa, atau perbedaan pendapat yang timbul akibat pelaksanaan atau penafsiran Perjanjian ini akan diselesaikan secara musyawarah untuk mufakat oleh PARA PIHAK.</li>
          <li className="pl-2">Apabila penyelesaian secara musyawarah sebagaimana dimaksud pada ayat (1) tidak tercapai dalam jangka waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui <strong>{data.penyelesaianSengketa}</strong>.</li>
          {data.penyelesaianSengketa === 'Pengadilan Negeri' && (
            <li className="pl-2">PARA PIHAK sepakat untuk memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri <strong>{data.wilayahPengadilan || '....................'}</strong>.</li>
          )}
        </ol>

        {/* PASAL 9 */}
        <div className="mt-6 mb-2 text-center font-bold">
          <p>PASAL 9</p>
          <p>KETENTUAN PENUTUP</p>
        </div>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="pl-2">Perjanjian ini mulai berlaku efektif dan mengikat PARA PIHAK sejak tanggal ditandatangani.</li>
          <li className="pl-2">Hal-hal yang belum atau tidak cukup diatur dalam Perjanjian ini akan diatur kemudian oleh PARA PIHAK dalam suatu adendum yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.</li>
          <li className="pl-2">Perjanjian ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan memiliki kekuatan hukum pembuktian yang sama bagi masing-masing pihak.</li>
        </ol>

        <p className="mt-8 mb-16 text-center">
          Demikian Surat Pernyataan dan Perjanjian Jaminan ini dibuat dengan sebenarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun.
        </p>

        {/* KOLOM TANDA TANGAN */}
        <div className="flex justify-between mt-12 pb-12">
          <div className="text-center w-1/3">
            <p className="font-bold">PIHAK PERTAMA</p>
            <p className="text-xs mb-24">Yang Membuat Pernyataan & Jaminan</p>
            <div className="relative">
               <p className="font-bold uppercase underline">{data.pihak1Name || '.....................................'}</p>
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 border border-slate-300 px-2 py-6 text-[8px] text-slate-400 rotate-[-10deg] opacity-60">
                 Meterai<br/>Rp10.000
               </div>
            </div>
          </div>
          <div className="text-center w-1/3">
            <p className="font-bold">PIHAK KEDUA</p>
            <p className="text-xs mb-24">Penerima Pernyataan & Jaminan</p>
            <p className="font-bold uppercase underline">{data.pihak2Name || '.....................................'}</p>
          </div>
        </div>

        {/* SAKSI-SAKSI */}
        <div className="mt-16">
          <p className="text-center font-bold mb-12">SAKSI-SAKSI</p>
          <div className="flex justify-between">
            <div className="text-center w-1/3">
              <p className="font-bold">Saksi I</p>
              <div className="h-20"></div>
              <p className="font-bold uppercase underline">{data.witness1Name || '.....................................'}</p>
              <p className="text-xs mt-1">NIK. {data.witness1Nik || '....................'}</p>
            </div>
            <div className="text-center w-1/3">
              <p className="font-bold">Saksi II</p>
              <div className="h-20"></div>
              <p className="font-bold uppercase underline">{data.witness2Name || '.....................................'}</p>
              <p className="text-xs mt-1">NIK. {data.witness2Nik || '....................'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* PANEL KIRI: FORM BUILDER */}
      <div className={`w-full md:w-[450px] bg-white flex flex-col shadow-2xl z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full absolute md:relative' : 'translate-x-0'}`}>
        
        {/* HEADER PANEL KIRI */}
        <div className="bg-slate-900 text-white p-5 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Legal Drafter Pro</h1>
              <p className="text-slate-400 text-xs">Pernyataan Status Belum Menikah</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex overflow-x-auto bg-slate-800 text-slate-400 text-xs font-semibold flex-shrink-0 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-700 border-t-2 border-blue-600' 
                  : 'hover:bg-slate-700 hover:text-white border-t-2 border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* SCROLLABLE FORM CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50 custom-scrollbar print:block print:overflow-visible print:bg-white">
          
          {activeTab === 'pihak1' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <Users size={16} className="text-blue-600" />
                <h2 className="font-bold text-sm text-slate-800 uppercase">Identitas Pihak Pertama</h2>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <InputField label="Nama Lengkap Sesuai KTP" field="pihak1Name" placeholder="Contoh: AHMAD SUBARJO" />
                <InputField label="Nomor Induk Kependudukan (NIK)" field="pihak1Nik" placeholder="16 digit NIK" maxLength={16} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Tempat Lahir" field="pihak1Pob" placeholder="Kota lahir" />
                  <InputField label="Tanggal Lahir" field="pihak1Dob" type="date" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Jenis Kelamin" field="pihak1Gender" options={['Laki-laki', 'Perempuan']} />
                  <SelectField label="Agama" field="pihak1Religion" options={['Islam', 'Kristen Protestan', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']} />
                </div>
                <InputField label="Pekerjaan" field="pihak1Job" placeholder="Contoh: Karyawan Swasta" />
                <TextAreaField label="Alamat Lengkap (Sesuai KTP)" field="pihak1Address" placeholder="Jalan, RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten/Kota" />
              </div>
            </div>
          )}

          {activeTab === 'pihak2' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <Building size={16} className="text-blue-600" />
                <h2 className="font-bold text-sm text-slate-800 uppercase">Identitas Pihak Kedua</h2>
              </div>
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs mb-4 flex gap-2 items-start border border-blue-100">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p>Pihak Kedua adalah Instansi, Perusahaan, atau Individu yang menerima surat pernyataan dan jaminan ini.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <InputField label="Nama Lengkap Sesuai KTP / Nama Instansi" field="pihak2Name" placeholder="Contoh: PT. MAJU BERSAMA / SITI AMINAH" />
                <InputField label="NIK / Nomor Legalitas" field="pihak2Nik" placeholder="NIK atau No. Register" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Tempat Lahir / Berdiri" field="pihak2Pob" placeholder="Kota" />
                  <InputField label="Tanggal Lahir / Pendirian" field="pihak2Dob" type="date" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Jenis Kelamin" field="pihak2Gender" options={['Laki-laki', 'Perempuan', 'Bukan Individu (Badan Hukum)']} />
                  <SelectField label="Agama" field="pihak2Religion" options={['Islam', 'Kristen Protestan', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Tidak Relevan (Badan Hukum)']} />
                </div>
                <InputField label="Pekerjaan / Jabatan / Jenis Usaha" field="pihak2Job" placeholder="Contoh: HRD Manager / Swasta" />
                <TextAreaField label="Alamat Lengkap" field="pihak2Address" placeholder="Alamat lengkap instansi atau KTP" />
              </div>
            </div>
          )}

          {activeTab === 'dokumen' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <Scale size={16} className="text-blue-600" />
                <h2 className="font-bold text-sm text-slate-800 uppercase">Ketentuan & Opsi Perjanjian</h2>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                
                <TextAreaField 
                  label="Tujuan / Keperluan Surat Pernyataan" 
                  field="purpose" 
                  placeholder="Contoh: Persyaratan Pendaftaran CPNS Tahun 2026 atau Persyaratan Pernikahan" 
                />

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <AlertCircle size={14} className="text-orange-500"/>
                    Klausul Dinamis (Otomatis Merubah Pasal)
                  </h3>
                  
                  <SelectField 
                    label="Sanksi Pelanggaran (Pasal 5)" 
                    field="sanksiPelanggaran" 
                    options={[
                      'Tuntutan Pidana dan Perdata sesuai Hukum yang berlaku',
                      'Pembayaran Ganti Rugi Finansial secara Tunai sebesar Rp 500.000.000',
                      'Gugurnya Hak dan Pencabutan Fasilitas secara Sepihak oleh Pihak Kedua'
                    ]} 
                  />

                  <SelectField 
                    label="Metode Penyelesaian Sengketa (Pasal 8)" 
                    field="penyelesaianSengketa" 
                    options={[
                      'Pengadilan Negeri',
                      'Badan Arbitrase Nasional Indonesia (BANI)',
                      'Mediasi Independen'
                    ]} 
                  />

                  {data.penyelesaianSengketa === 'Pengadilan Negeri' && (
                    <InputField label="Wilayah Yurisdiksi Pengadilan Negeri" field="wilayahPengadilan" placeholder="Contoh: Jakarta Selatan" />
                  )}
                </div>

              </div>
            </div>
          )}

          {activeTab === 'saksi' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <FileSignature size={16} className="text-blue-600" />
                <h2 className="font-bold text-sm text-slate-800 uppercase">Saksi & Waktu Penandatanganan</h2>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
                <h3 className="text-xs font-bold text-slate-800 mb-3">Waktu & Tempat Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Kota Penandatanganan" field="city" placeholder="Contoh: Jakarta" />
                  <InputField label="Tanggal" field="date" type="date" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-3">Identitas Saksi-saksi</h3>
                
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg mb-3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Saksi Pertama</p>
                  <InputField label="Nama Lengkap" field="witness1Name" placeholder="Nama Saksi 1" />
                  <InputField label="NIK" field="witness1Nik" placeholder="16 Digit NIK" maxLength={16} />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Saksi Kedua</p>
                  <InputField label="Nama Lengkap" field="witness2Name" placeholder="Nama Saksi 2" />
                  <InputField label="NIK" field="witness2Nik" placeholder="16 Digit NIK" maxLength={16} />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
          <div className="flex gap-2">
            <button 
              onClick={() => setMobileView('preview')}
              className="md:hidden flex-1 bg-slate-900 text-white p-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
            >
              <Eye size={16} /> Preview Dokumen
            </button>
            <button 
              onClick={() => window.print()}
              className="hidden md:flex flex-1 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-lg text-sm font-bold items-center justify-center gap-2 transition-colors"
            >
              <Printer size={16} /> Cetak Dokumen (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* PANEL KANAN: PREVIEW DOKUMEN (A4) */}
      <div className={`flex-1 bg-slate-400 overflow-y-auto relative print:bg-white print:overflow-visible transition-transform duration-300 ${ mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:block' : 'translate-x-0 absolute inset-0 z-20 block' } print:block print:static`}>
        
        {/* MOBILE HEADER PREVIEW */}
        <div className="md:hidden sticky top-0 z-50 bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg print:hidden">
          <button 
            onClick={() => setMobileView('editor')} 
            className="flex items-center gap-2 text-sm font-semibold hover:text-blue-300"
          >
            <ArrowLeft size={16}/> Kembali ke Form
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm font-semibold bg-blue-600 px-3 py-1.5 rounded-md"
          >
            <Printer size={14}/> Cetak
          </button>
        </div>
        
        <div className="p-4 md:p-8 flex justify-center min-h-full print:p-0">
          <DocumentContent />
        </div>
      </div>

    </div>
  );
}
