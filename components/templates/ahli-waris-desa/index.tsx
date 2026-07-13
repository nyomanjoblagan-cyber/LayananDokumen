'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, Users, Trash2, ShieldCheck, 
  Landmark, LayoutTemplate, ChevronDown, Edit3, 
  Eye, ArrowLeftCircle, RotateCcw, FileText, Settings, UserPlus
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Identity {
  nama: string;
  nik: string;
  ttl: string;
  pekerjaan: string;
  alamat: string;
  hubungan: string;
}

interface Pewaris {
  nama: string;
  nik: string;
  tglMeninggal: string;
  tempatMeninggal: string;
  alamatTerakhir: string;
}

interface DocumentState {
  // Kop Desa
  kabupaten: string;
  kecamatan: string;
  desa: string;
  alamatDesa: string;
  noSuratDesa: string;
  noRegKecamatan: string;
  tanggalSurat: string;

  // Pewaris
  pewaris: Pewaris;

  // Ahli Waris
  pihakPertama: Identity;
  pihakKedua: Identity;
  ahliWarisLain: Identity[];

  // Opsi Dinamis
  metodePembagian: string;
  penyelesaianPajak: string;
  tanggunganHutang: string;

  // Pejabat & Saksi
  lurah: string;
  nipLurah: string;
  camat: string;
  nipCamat: string;
  saksi1: string;
  saksi2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DocumentState = {
  kabupaten: 'KABUPATEN BOGOR',
  kecamatan: 'CIBINONG',
  desa: 'KELURAHAN CIRIMEKAR',
  alamatDesa: 'Jl. Pemda No. 10, Cibinong, Bogor 16915',
  noSuratDesa: '470 / 123 / KEL-CRM / 2026',
  noRegKecamatan: '590 / 045 / KEC-CBN / 2026',
  tanggalSurat: '',

  pewaris: {
    nama: 'H. AHMAD SYAFIUDDIN',
    nik: '3201010101500001',
    tglMeninggal: '2025-11-20',
    tempatMeninggal: 'RSUD Cibinong',
    alamatTerakhir: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong'
  },

  pihakPertama: {
    nama: 'BUDI SANTOSO',
    nik: '3201010101800002',
    ttl: 'Bogor, 15 Agustus 1980',
    pekerjaan: 'Wiraswasta',
    alamat: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong',
    hubungan: 'Anak Kandung Laki-laki'
  },
  pihakKedua: {
    nama: 'SITI AMINAH',
    nik: '3201010101850003',
    ttl: 'Bogor, 20 Oktober 1985',
    pekerjaan: 'Pegawai Negeri Sipil',
    alamat: 'Jl. Mayor Oking No. 12, RT 01/02, Cirimekar, Cibinong',
    hubungan: 'Anak Kandung Perempuan'
  },
  ahliWarisLain: [],

  metodePembagian: 'dibagi_rata',
  penyelesaianPajak: 'tanggung_renteng',
  tanggunganHutang: 'bayar_dari_warisan',

  lurah: 'Drs. H. MULYONO, M.Si',
  nipLurah: '19700101 199003 1 005',
  camat: 'I WAYAN SUDIRTA, S.Sos',
  nipCamat: '19680505 198803 1 002',
  saksi1: 'BAPAK RT 01',
  saksi2: 'BAPAK RW 02'
};

// --- 3. HELPER COMPONENTS UNTUK FORM UI ---
const Input = ({ label, value, onChange, type = 'text', placeholder = '' }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-500 uppercase">{label}</label>
    <input type={type} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder = '' }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-500 uppercase">{label}</label>
    <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const IdentityForm = ({ title, identity, onChange, onRemove }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden group hover:border-emerald-300 transition-colors">
     {onRemove && (
        <button onClick={onRemove} className="absolute top-3 right-3 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
          <Trash2 size={14}/>
        </button>
     )}
     <div className="text-xs font-black uppercase text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-md mb-2">{title}</div>
     <Input label="Nama Lengkap" value={identity.nama} onChange={(v: string) => onChange('nama', v)} />
     <div className="grid grid-cols-2 gap-3">
        <Input label="NIK" value={identity.nik} onChange={(v: string) => onChange('nik', v)} />
        <Input label="Tempat, Tgl Lahir" value={identity.ttl} onChange={(v: string) => onChange('ttl', v)} />
     </div>
     <div className="grid grid-cols-2 gap-3">
        <Input label="Pekerjaan" value={identity.pekerjaan} onChange={(v: string) => onChange('pekerjaan', v)} />
        <Input label="Hubungan dgn Pewaris" value={identity.hubungan} onChange={(v: string) => onChange('hubungan', v)} />
     </div>
     <TextArea label="Alamat Lengkap Sesuai KTP" value={identity.alamat} onChange={(v: string) => onChange('alamat', v)} />
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function AhliWarisDesaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Akta Ahli Waris...</div>}>
      <VillageHeirBuilder />
    </Suspense>
  );
}

function VillageHeirBuilder() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<DocumentState>(INITIAL_DATA);
  
  // Effect: Set tanggal hari ini & Cleanup Logo Blob
  useEffect(() => {
    setData(prev => ({
      ...prev,
      tanggalSurat: new Date().toISOString().split('T')[0]
    }));
    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // --- HANDLERS ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleDataChange = (field: keyof DocumentState, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const updatePewaris = (field: keyof Pewaris, val: string) => {
    setData(prev => ({ ...prev, pewaris: { ...prev.pewaris, [field]: val } }));
  };

  const updateIdentity = (target: 'pihakPertama' | 'pihakKedua', field: keyof Identity, val: string) => {
    setData(prev => ({ ...prev, [target]: { ...prev[target], [field]: val } }));
  };

  const updateAhliWarisLain = (index: number, field: keyof Identity, val: string) => {
    setData(prev => {
      const arr = [...prev.ahliWarisLain];
      arr[index] = { ...arr[index], [field]: val };
      return { ...prev, ahliWarisLain: arr };
    });
  };

  const addAhliWarisLain = () => {
    setData(prev => ({
      ...prev,
      ahliWarisLain: [...prev.ahliWarisLain, { nama: '', nik: '', ttl: '', pekerjaan: '', alamat: '', hubungan: '' }]
    }));
  };

  const removeAhliWarisLain = (index: number) => {
    setData(prev => {
      const arr = [...prev.ahliWarisLain];
      arr.splice(index, 1);
      return { ...prev, ahliWarisLain: arr };
    });
  };

  const handleReset = () => {
    if(window.confirm('Apakah Anda yakin ingin mereset semua data ke awal? Data yang sudah diketik akan hilang.')) {
        setData({
            ...INITIAL_DATA, 
            tanggalSurat: new Date().toISOString().split('T')[0]
        });
        if (logo) {
            URL.revokeObjectURL(logo);
            setLogo(null);
        }
    }
  };

  const getPartyName = (index: number) => {
    const names = ['PERTAMA', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN', 'KESEMBILAN', 'KESEPULUH'];
    return names[index] || `KE-${index + 1}`;
  };

  // --- KONTEN SURAT (PRINT LAYOUT) ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            const safeDate = new Date(dateString + 'T00:00:00');
            return safeDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch (e) { return dateString; }
    };

    // Helper komponen untuk Print agar bebas Grid/Table
    const IdentityRow = ({ label, value }: { label: string, value: string }) => (
      <div className="flex mb-1.5 leading-snug break-inside-avoid">
        <div className="w-[180px] shrink-0 font-medium">{label}</div>
        <div className="w-4 shrink-0">:</div>
        <div className="flex-1 font-bold uppercase">{value}</div>
      </div>
    );

    const ClauseItem = ({ num, text }: { num: string, text: React.ReactNode }) => (
      <div className="flex mb-3 leading-relaxed break-inside-avoid">
        <div className="w-8 shrink-0 font-bold">{num}.</div>
        <div className="flex-1 text-justify">{text}</div>
      </div>
    );

    const Article = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
      <div className="mb-6 break-inside-avoid">
        <div className="text-center font-bold mb-4">
          <p className="text-[12pt]">{title}</p>
          <p className="uppercase text-[11pt]">{subtitle}</p>
        </div>
        <div className="px-2">
          {children}
        </div>
      </div>
    );

    // Dynamic Texts Resolution
    let metodeText = '';
    if(data.metodePembagian === 'dibagi_rata') metodeText = "dibagi rata kepada seluruh ahli waris secara proporsional sesuai dengan ketentuan hukum kewarisan yang berlaku.";
    else if(data.metodePembagian === 'kuasa_jual') metodeText = "dijual dan dicairkan terlebih dahulu, untuk kemudian hasil bersih (nett) dari pencairan atau penjualan tersebut dibagikan kepada seluruh ahli waris secara merata.";
    else metodeText = "dikuasakan dan diserahkan pengelolaannya secara penuh kepada PIHAK PERTAMA sebagai perwakilan tunggal untuk mengurus dan membagikannya sesuai kebijaksanaan internal keluarga.";

    let pajakText = '';
    if(data.penyelesaianPajak === 'tanggung_renteng') pajakText = "ditanggung renteng (bersama-sama) oleh PARA PIHAK secara proporsional menggunakan dana pribadi sebelum proses peralihan hak kewarisan didaftarkan.";
    else pajakText = "dipotong secara langsung dari nilai harta peninggalan (baik dari saldo tabungan maupun hasil penjualan aset) sebelum sisa bersihnya dibagikan kepada PARA PIHAK.";

    let hutangText = '';
    if(data.tanggunganHutang === 'bayar_dari_warisan') hutangText = "diselesaikan serta dibayarkan terlebih dahulu menggunakan harta peninggalan Pewaris sebelum adanya pembagian hak kepada PARA PIHAK.";
    else hutangText = "menjadi tanggung jawab mutlak PARA PIHAK secara pribadi dan ditanggung secara proporsional, tanpa mengurangi nilai pokok harta peninggalan secara langsung.";

    return (
       <div className="font-serif text-[11pt] text-black leading-snug">
          {/* KOP SURAT */}
          <div className="flex items-center border-b-[3px] border-double border-black pb-4 mb-6 text-center relative break-inside-avoid">
             {logo && <img src={logo} className="w-24 h-24 object-contain absolute left-0 top-0 grayscale" alt="Logo Instansi" />}
             <div className="flex-grow px-12">
                <h3 className="text-[12pt] font-bold uppercase tracking-wide">PEMERINTAH {data.kabupaten}</h3>
                <h2 className="text-[14pt] font-black uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
                <h1 className="text-[16pt] font-black uppercase underline tracking-widest">{data.desa}</h1>
                <p className="text-[10pt] font-sans mt-1 italic">{data.alamatDesa}</p>
             </div>
          </div>

          {/* JUDUL */}
          <div className="text-center mb-8 break-inside-avoid">
             <h2 className="text-[14pt] font-bold underline uppercase tracking-wide">AKTA PERNYATAAN DAN KESEPAKATAN AHLI WARIS</h2>
             <p className="text-[11pt]">Nomor Desa: {data.noSuratDesa}</p>
             <p className="text-[11pt]">Nomor Register Kecamatan: {data.noRegKecamatan}</p>
          </div>

          {/* PEMBUKAAN */}
          <div className="text-justify mb-4">
             <p className="mb-4">
               Pada hari ini, dengan penuh kesadaran dan tanpa paksaan dari pihak manapun, kami yang bertanda tangan di bawah ini:
             </p>
          </div>

          {/* PARA PIHAK */}
          <div className="pl-4 space-y-4 mb-6">
             <div className="flex break-inside-avoid">
                <div className="w-8 shrink-0 font-bold">I.</div>
                <div className="flex-1">
                   <IdentityRow label="Nama Lengkap" value={data.pihakPertama.nama} />
                   <IdentityRow label="NIK" value={data.pihakPertama.nik} />
                   <IdentityRow label="Tempat, Tgl Lahir" value={data.pihakPertama.ttl} />
                   <IdentityRow label="Pekerjaan" value={data.pihakPertama.pekerjaan} />
                   <IdentityRow label="Hubungan dgn Pewaris" value={data.pihakPertama.hubungan} />
                   <IdentityRow label="Alamat Lengkap" value={data.pihakPertama.alamat} />
                   <div className="mt-2 text-justify">
                     Untuk selanjutnya dalam dokumen ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
                   </div>
                </div>
             </div>
             <div className="flex break-inside-avoid">
                <div className="w-8 shrink-0 font-bold">II.</div>
                <div className="flex-1">
                   <IdentityRow label="Nama Lengkap" value={data.pihakKedua.nama} />
                   <IdentityRow label="NIK" value={data.pihakKedua.nik} />
                   <IdentityRow label="Tempat, Tgl Lahir" value={data.pihakKedua.ttl} />
                   <IdentityRow label="Pekerjaan" value={data.pihakKedua.pekerjaan} />
                   <IdentityRow label="Hubungan dgn Pewaris" value={data.pihakKedua.hubungan} />
                   <IdentityRow label="Alamat Lengkap" value={data.pihakKedua.alamat} />
                   <div className="mt-2 text-justify">
                     Untuk selanjutnya dalam dokumen ini disebut sebagai <strong>PIHAK KEDUA</strong>.
                   </div>
                </div>
             </div>
             {data.ahliWarisLain.map((ahli, idx) => {
                const numeral = ['III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][idx] || (idx+3).toString();
                return (
                 <div key={idx} className="flex break-inside-avoid mt-4">
                    <div className="w-8 shrink-0 font-bold">{numeral}.</div>
                    <div className="flex-1">
                       <IdentityRow label="Nama Lengkap" value={ahli.nama} />
                       <IdentityRow label="NIK" value={ahli.nik} />
                       <IdentityRow label="Tempat, Tgl Lahir" value={ahli.ttl} />
                       <IdentityRow label="Pekerjaan" value={ahli.pekerjaan} />
                       <IdentityRow label="Hubungan dgn Pewaris" value={ahli.hubungan} />
                       <IdentityRow label="Alamat Lengkap" value={ahli.alamat} />
                       <div className="mt-2 text-justify">
                         Untuk selanjutnya disebut sebagai <strong>PIHAK {getPartyName(idx + 2)}</strong>.
                       </div>
                    </div>
                 </div>
                )
             })}
          </div>

          <div className="text-justify mb-6 break-inside-avoid">
             <p className="mb-4">
               PIHAK PERTAMA, PIHAK KEDUA{data.ahliWarisLain.length > 0 ? ' beserta pihak-pihak lainnya' : ''} secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong> (Segenap Ahli Waris).
             </p>
             <p className="mb-4">
               PARA PIHAK dengan ini menerangkan dan menyatakan dengan sumpah/janji yang sungguh-sungguh bahwa:
             </p>
          </div>

          {/* PEWARIS */}
          <div className="pl-4 space-y-2 mb-6 break-inside-avoid border border-black p-4">
             <IdentityRow label="Nama Almarhum" value={data.pewaris.nama} />
             <IdentityRow label="NIK" value={data.pewaris.nik} />
             <IdentityRow label="Tanggal Meninggal" value={formatDate(data.pewaris.tglMeninggal)} />
             <IdentityRow label="Tempat Meninggal" value={data.pewaris.tempatMeninggal} />
             <IdentityRow label="Alamat Terakhir" value={data.pewaris.alamatTerakhir} />
          </div>

          <div className="text-justify mb-8 break-inside-avoid">
             <p className="indent-8 mb-4">
               Bahwa almarhum tersebut di atas (selanjutnya disebut <strong>Pewaris</strong>) telah meninggal dunia secara sah, dan PARA PIHAK sepakat untuk menuangkan kesepakatan kewarisan dengan syarat-syarat dan ketentuan sebagaimana tertuang dalam pasal-pasal berikut:
             </p>
          </div>

          {/* PASAL-PASAL */}
          <Article title="PASAL 1" subtitle="DEFINISI DAN KEDUDUKAN PARA PIHAK">
             <ClauseItem num="1" text="Pewaris adalah individu sebagaimana identitasnya diuraikan di atas yang telah wafat dan meninggalkan ahli waris yang sah secara hukum serta harta peninggalan." />
             <ClauseItem num="2" text="PARA PIHAK secara mutlak dan sah diakui sebagai ahli waris sedarah dan/atau karena perkawinan yang berhak penuh atas segala harta peninggalan serta wajib bertanggung jawab atas segala kewajiban yang melekat pada Pewaris semasa hidupnya." />
             <ClauseItem num="3" text="Keterangan kewarisan ini dikuatkan, disaksikan, dan diketahui oleh Pejabat Pemerintahan setempat berdasarkan bukti-bukti kependudukan dan keterangan saksi-saksi yang sah." />
          </Article>

          <Article title="PASAL 2" subtitle="OBJEK WARISAN DAN KETERANGAN KEMATIAN">
             <ClauseItem num="1" text={<span>Bahwa Pewaris telah meninggal dunia pada tanggal <strong>{formatDate(data.pewaris.tglMeninggal)}</strong> bertempat di <strong>{data.pewaris.tempatMeninggal}</strong>.</span>} />
             <ClauseItem num="2" text="Bahwa adapun Objek Warisan yang ditinggalkan meliputi seluruh harta bergerak maupun tidak bergerak, tabungan, serta hak-hak lain yang bernilai ekonomis yang terdaftar atas nama Pewaris." />
             <ClauseItem num="3" text="Bahwa Surat Keterangan ini dibuat sebagai dasar hukum formal untuk proses peralihan hak, pencairan dana perbankan, dan/atau pengurusan balik nama sertifikat hak milik atas nama Pewaris kepada Para Ahli Waris." />
          </Article>

          <Article title="PASAL 3" subtitle="HAK DAN KEWAJIBAN AHLI WARIS">
             <ClauseItem num="1" text="PARA PIHAK selaku Ahli Waris berhak menerima secara utuh bagian dari harta peninggalan Pewaris tanpa terkecuali sesuai porsinya." />
             <ClauseItem num="2" text="PARA PIHAK berkewajiban untuk menyelesaikan segala administrasi hukum dan menjaga keutuhan harta warisan sebelum dilakukan pembagian secara definitif." />
             <ClauseItem num="3" text="Hak-hak pewarisan tersebut baru dapat dieksekusi secara final setelah seluruh kewajiban Pewaris telah dipenuhi sepenuhnya." />
          </Article>

          <Article title="PASAL 4" subtitle="METODE PEMBAGIAN WARISAN DAN PENYELESAIAN PAJAK">
             <ClauseItem num="1" text={<span>Bahwa PARA PIHAK sepakat secara bulat untuk menerapkan metode penyelesaian dan pembagian warisan dengan cara: <strong>{metodeText}</strong></span>} />
             <ClauseItem num="2" text={<span>Segala bentuk kewajiban beban Pajak Bumi dan Bangunan (PBB), Pajak Penghasilan (PPh), maupun Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB) Waris yang timbul, disepakati untuk diselesaikan dengan cara: <strong>{pajakText}</strong></span>} />
             <ClauseItem num="3" text={<span>Apabila di kemudian hari terbukti adanya tagihan utang piutang Pewaris kepada pihak ketiga, maka penyelesaiannya disepakati akan: <strong>{hutangText}</strong></span>} />
          </Article>

          <Article title="PASAL 5" subtitle="PEMBEBASAN TUNTUTAN HUKUM (INDEMNIFIKASI)">
             <ClauseItem num="1" text="PARA PIHAK menyatakan bahwa seluruh keterangan yang diberikan mengenai silsilah keluarga dan susunan ahli waris adalah benar dan dapat dipertanggungjawabkan di muka hukum." />
             <ClauseItem num="2" text="Apabila di kemudian hari terdapat pihak lain yang mengaku sebagai ahli waris dan dapat membuktikan haknya secara sah di Pengadilan, maka PARA PIHAK sepenuhnya membebaskan Pejabat Desa/Kelurahan dan Kecamatan dari segala bentuk tuntutan hukum, baik perdata maupun pidana." />
             <ClauseItem num="3" text="Segala kerugian materil maupun immateril yang timbul akibat ketidakbenaran keterangan ini sepenuhnya menjadi tanggung jawab mutlak PARA PIHAK secara tanggung renteng." />
          </Article>

          <Article title="PASAL 6" subtitle="PENYELESAIAN SENGKETA">
             <ClauseItem num="1" text="Segala perbedaan pendapat dan/atau sengketa yang timbul dalam pelaksanaan Akta Kesepakatan ini akan diselesaikan secara musyawarah untuk mufakat secara kekeluargaan." />
             <ClauseItem num="2" text="Apabila musyawarah mufakat tidak tercapai dalam tenggang waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikannya melalui jalur hukum yang berlaku dan memilih domisili hukum yang tetap di Kepaniteraan Pengadilan Negeri setempat." />
          </Article>

          <Article title="PASAL 7" subtitle="KETENTUAN LAIN-LAIN">
             <ClauseItem num="1" text="Surat Pernyataan dan Kesepakatan Ahli Waris ini berlaku sah dan mengikat sejak ditandatangani oleh PARA PIHAK dan diketahui serta disahkan oleh Pejabat berwenang setempat." />
             <ClauseItem num="2" text="Hal-hal yang belum atau tidak cukup diatur dalam kesepakatan ini akan dibicarakan lebih lanjut oleh PARA PIHAK secara musyawarah dalam adendum yang tidak terpisahkan dari dokumen ini." />
          </Article>

          <Article title="PASAL 8" subtitle="PENUTUP DAN PENGESAHAN">
             <ClauseItem num="1" text="Demikian Surat Pernyataan dan Kesepakatan Ahli Waris ini dibuat, disetujui, dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya unsur paksaan, penipuan, atau tekanan dari pihak manapun." />
             <ClauseItem num="2" text="Dokumen ini dicetak dan ditandatangani di atas meterai yang cukup, sehingga memiliki kekuatan hukum pembuktian yang sempurna, serta diregister secara resmi di tingkat Pemerintahan Desa/Kelurahan dan Kecamatan setempat." />
          </Article>

          {/* TANDA TANGAN */}
          <div className="mt-12 break-inside-avoid">
             <div className="text-center mb-8">
               <p>Dibuat dan ditandatangani di: <strong>{data.kabupaten.replace('KABUPATEN ', '').replace('KOTA ', '')}</strong></p>
               <p>Pada tanggal: <strong>{formatDate(data.tanggalSurat)}</strong></p>
             </div>
             
             <p className="font-bold text-center mb-8 underline uppercase">PARA PIHAK / AHLI WARIS</p>
             
             <div className="flex flex-wrap justify-center gap-y-12">
               <div className="w-1/2 text-center px-4">
                 <p className="font-bold mb-20">PIHAK {getPartyName(0)}</p>
                 <p className="font-bold underline uppercase">{data.pihakPertama.nama}</p>
               </div>
               <div className="w-1/2 text-center px-4">
                 <p className="font-bold mb-20">PIHAK {getPartyName(1)}</p>
                 <p className="font-bold underline uppercase">{data.pihakKedua.nama}</p>
               </div>
               {data.ahliWarisLain.map((ahli, idx) => (
                 <div key={idx} className="w-1/2 text-center px-4 mt-8">
                   <p className="font-bold mb-20">PIHAK {getPartyName(idx + 2)}</p>
                   <p className="font-bold underline uppercase">{ahli.nama}</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="mt-16 break-inside-avoid">
             <p className="font-bold text-center mb-8 underline uppercase">SAKSI - SAKSI</p>
             <div className="flex flex-wrap justify-center gap-y-12">
                <div className="w-1/2 text-center px-4">
                   <p className="mb-20">Saksi I</p>
                   <p className="font-bold underline uppercase">{data.saksi1}</p>
                </div>
                <div className="w-1/2 text-center px-4">
                   <p className="mb-20">Saksi II</p>
                   <p className="font-bold underline uppercase">{data.saksi2}</p>
                </div>
             </div>
          </div>

          <div className="mt-16 break-inside-avoid border-t-2 border-black pt-8">
             <p className="text-center text-[12pt] font-bold uppercase mb-12">MENGETAHUI DAN MENGESAHKAN</p>
             <div className="flex flex-wrap justify-between">
               <div className="w-[45%] text-center">
                  <p className="mb-2 font-mono text-[9pt]">Reg Kec: {data.noRegKecamatan}</p>
                  <p className="font-bold uppercase mb-24">CAMAT {data.kecamatan}</p>
                  <p className="font-bold underline uppercase">{data.camat}</p>
                  <p className="text-[10pt]">NIP. {data.nipCamat}</p>
               </div>
               <div className="w-[45%] text-center">
                  <p className="mb-2 font-mono text-[9pt]">Reg Desa: {data.noSuratDesa}</p>
                  <p className="font-bold uppercase mb-24">LURAH/KEPALA DESA {data.desa.replace('KELURAHAN ', '').replace('DESA ', '')}</p>
                  <p className="font-bold underline uppercase">{data.lurah}</p>
                  <p className="text-[10pt]">NIP. {data.nipLurah}</p>
               </div>
             </div>
          </div>

       </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* === CSS PRINT FIXED === */}
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

      {/* HEADER */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Akta Waris <span className="text-emerald-400">Desa</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         {/* SIDEBAR EDITOR */}
         <div className={`no-print w-full md:w-[460px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Akta Waris</h2>
                <button onClick={handleReset} title="Reset Data" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:block print:overflow-visible print:bg-white">
               
               {/* 1. KOP SURAT */}
               <div className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Landmark size={14}/> 1. Instansi & Registrasi</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex gap-4 items-center">
                       <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0 relative overflow-hidden group">
                          {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>KOP</div>}
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[8px] font-bold">UBAH</div>
                          <input type="file" id="logo-upload" aria-label="Upload Logo" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                       </div>
                       <div className="flex-1 space-y-2">
                          <Input label="Kabupaten/Kota" value={data.kabupaten} onChange={(v: string) => handleDataChange('kabupaten', v)} />
                          <Input label="Kecamatan" value={data.kecamatan} onChange={(v: string) => handleDataChange('kecamatan', v)} />
                       </div>
                    </div>
                    <Input label="Desa/Kelurahan" value={data.desa} onChange={(v: string) => handleDataChange('desa', v)} />
                    <TextArea label="Alamat Kantor Desa" value={data.alamatDesa} onChange={(v: string) => handleDataChange('alamatDesa', v)} />
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                       <Input label="No. Surat Desa" value={data.noSuratDesa} onChange={(v: string) => handleDataChange('noSuratDesa', v)} />
                       <Input label="No. Reg Kecamatan" value={data.noRegKecamatan} onChange={(v: string) => handleDataChange('noRegKecamatan', v)} />
                    </div>
                    <Input type="date" label="Tanggal Surat" value={data.tanggalSurat} onChange={(v: string) => handleDataChange('tanggalSurat', v)} />
                 </div>
               </div>

               {/* 2. DATA PEWARIS */}
               <div className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={14}/> 2. Data Pewaris</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <Input label="Nama Almarhum" value={data.pewaris.nama} onChange={(v: string) => updatePewaris('nama', v)} />
                     <div className="grid grid-cols-2 gap-3">
                        <Input label="NIK" value={data.pewaris.nik} onChange={(v: string) => updatePewaris('nik', v)} />
                        <Input type="date" label="Tgl Wafat" value={data.pewaris.tglMeninggal} onChange={(v: string) => updatePewaris('tglMeninggal', v)} />
                     </div>
                     <Input label="Tempat Meninggal" value={data.pewaris.tempatMeninggal} onChange={(v: string) => updatePewaris('tempatMeninggal', v)} />
                     <TextArea label="Alamat Terakhir Sesuai KTP" value={data.pewaris.alamatTerakhir} onChange={(v: string) => updatePewaris('alamatTerakhir', v)} />
                 </div>
               </div>

               {/* 3. AHLI WARIS */}
               <div className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Users size={14}/> 3. Para Pihak (Ahli Waris)</h3>
                 
                 <IdentityForm title="PIHAK PERTAMA" identity={data.pihakPertama} onChange={(field: keyof Identity, val: string) => updateIdentity('pihakPertama', field, val)} />
                 <IdentityForm title="PIHAK KEDUA" identity={data.pihakKedua} onChange={(field: keyof Identity, val: string) => updateIdentity('pihakKedua', field, val)} />
                 
                 {data.ahliWarisLain.map((ahli, idx) => (
                     <IdentityForm key={idx} title={`PIHAK ${getPartyName(idx + 2)}`} identity={ahli} onChange={(field: keyof Identity, val: string) => updateAhliWarisLain(idx, field, val)} onRemove={() => removeAhliWarisLain(idx)} />
                 ))}

                 <button onClick={addAhliWarisLain} className="w-full flex justify-center items-center gap-2 py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-xl hover:bg-emerald-50 font-bold text-sm transition-colors">
                    <UserPlus size={16}/> Tambah Ahli Waris Lain
                 </button>
               </div>

               {/* 4. KLAUSUL DINAMIS */}
               <div className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Settings size={14}/> 4. Pengaturan Klausul</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Metode Pembagian Warisan</label>
                       <select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none focus:border-emerald-500" value={data.metodePembagian} onChange={e => handleDataChange('metodePembagian', e.target.value)}>
                          <option value="dibagi_rata">Dibagi Rata Secara Hukum</option>
                          <option value="kuasa_jual">Dijual dan Hasil Dibagi Rata</option>
                          <option value="hibah_satu_pihak">Dikuasakan Penuh Ke Pihak Pertama</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Penyelesaian Pajak Waris</label>
                       <select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none focus:border-emerald-500" value={data.penyelesaianPajak} onChange={e => handleDataChange('penyelesaianPajak', e.target.value)}>
                          <option value="tanggung_renteng">Ditanggung Renteng oleh Ahli Waris</option>
                          <option value="potong_warisan">Dipotong Langsung dari Harta</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tanggungan Hutang Pewaris</label>
                       <select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none focus:border-emerald-500" value={data.tanggunganHutang} onChange={e => handleDataChange('tanggunganHutang', e.target.value)}>
                          <option value="bayar_dari_warisan">Dibayarkan dari Harta Peninggalan</option>
                          <option value="tanggung_pribadi">Menjadi Tanggung Jawab Pribadi Ahli Waris</option>
                       </select>
                    </div>
                 </div>
               </div>

               {/* 5. PEJABAT & SAKSI */}
               <div className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={14}/> 5. Pejabat & Saksi</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                     <div className="grid grid-cols-2 gap-3">
                        <Input label="Nama Saksi 1" value={data.saksi1} onChange={(v: string) => handleDataChange('saksi1', v)} />
                        <Input label="Nama Saksi 2" value={data.saksi2} onChange={(v: string) => handleDataChange('saksi2', v)} />
                     </div>
                     <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                        <Input label="Nama Lurah/Kades" value={data.lurah} onChange={(v: string) => handleDataChange('lurah', v)} />
                        <Input label="NIP Lurah" value={data.nipLurah} onChange={(v: string) => handleDataChange('nipLurah', v)} />
                     </div>
                     <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                        <Input label="Nama Camat" value={data.camat} onChange={(v: string) => handleDataChange('camat', v)} />
                        <Input label="NIP Camat" value={data.nipCamat} onChange={(v: string) => handleDataChange('nipCamat', v)} />
                     </div>
                 </div>
               </div>
               
               {/* Spacer Bawah */}
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center print:block print:overflow-visible print:bg-white print:static">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:block print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Akta_Ahli_Waris" price={15000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <table className="print-table w-full">
            <thead><tr><td><div style={{ height: '15mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper max-w-full">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '15mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
