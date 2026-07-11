'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, FileText, ArrowLeftCircle, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PernyataanData {
  // Data Pribadi Pegawai
  empName: string;
  empNik: string;
  empPob: string;
  empDob: string;
  empGender: 'Laki-laki' | 'Perempuan';
  empReligion: string;
  empAddress: string;
  
  // Data Pekerjaan
  companyName: string;
  position: string;
  contractDuration: string;
  penaltyAmount: string;
  
  // Penandatanganan
  city: string;
  date: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PernyataanData = {
  empName: 'Ahmad Faisal',
  empNik: '3201123456780001',
  empPob: 'Bandung',
  empDob: '1995-08-15',
  empGender: 'Laki-laki',
  empReligion: 'Islam',
  empAddress: 'Jl. Merdeka No. 45, RT 01 RW 02, Kelurahan Citarum, Kecamatan Bandung Wetan, Kota Bandung, Jawa Barat',
  
  companyName: 'PT Teknologi Inovasi Nusantara',
  position: 'Software Engineer',
  contractDuration: '1 (Satu) Tahun',
  penaltyAmount: 'Rp 10.000.000 (Sepuluh Juta Rupiah)',
  
  city: 'Jakarta',
  date: '',
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <PernyataanBuilder />
    </Suspense>
  );
}

function PernyataanBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PernyataanData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'karyawan' | 'pekerjaan' | 'lainnya'>('karyawan');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PernyataanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-black leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto relative">
        <div className="flex flex-col h-full">
            <div className="text-center mb-8 pb-4 shrink-0">
              <h1 className="font-black text-xl uppercase tracking-widest underline leading-none mb-1">SURAT PERNYATAAN</h1>
              <h2 className="font-bold text-sm uppercase">KESANGGUPAN DAN PENEMPATAN KERJA</h2>
            </div>

            <div className="flex-grow">
              <p className="mb-4 text-justify">Saya yang bertanda tangan di bawah ini:</p>

              <div className="mb-6 break-inside-avoid pl-4">
                <div className="flex mb-1"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.empName}</div></div>
                <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1">{data.empNik}</div></div>
                <div className="flex mb-1"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.empPob}, {formatDateSafe(data.empDob)}</div></div>
                <div className="flex mb-1"><div className="w-48">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.empGender}</div></div>
                <div className="flex mb-1"><div className="w-48">Agama</div><div className="w-4">:</div><div className="flex-1">{data.empReligion}</div></div>
                <div className="flex mb-1"><div className="w-48">Alamat Lengkap (KTP)</div><div className="w-4">:</div><div className="flex-1">{data.empAddress}</div></div>
              </div>

              <p className="mb-4 text-justify">
                Berkenaan dengan proses penerimaan saya sebagai karyawan untuk posisi <strong>{data.position}</strong> di perusahaan <strong>{data.companyName}</strong>, dengan masa kontrak selama <strong>{data.contractDuration}</strong>, maka dengan ini saya menyatakan dengan sesungguhnya bahwa saya:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="w-8 text-right pr-3 font-bold">1.</div>
                  <div className="flex-1 text-justify">
                    <strong>Bersedia ditempatkan di mana saja</strong>, baik di kantor pusat, kantor cabang, proyek, maupun lokasi operasional lainnya dari <strong>{data.companyName}</strong> yang tersebar di seluruh wilayah Negara Kesatuan Republik Indonesia, sesuai dengan kebutuhan dan instruksi manajemen perusahaan.
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-right pr-3 font-bold">2.</div>
                  <div className="flex-1 text-justify">
                    <strong>Bebas dari Narkoba</strong>, tidak pernah dan tidak akan pernah terlibat dalam penggunaan, kepemilikan, peredaran, maupun penyalahgunaan Narkotika, Psikotropika, dan Zat Adiktif lainnya (NAPZA) dalam bentuk apa pun. Saya bersedia untuk dilakukan tes urine atau pemeriksaan medis sewaktu-waktu oleh perusahaan.
                  </div>
                </div>

                <div className="flex">
                  <div className="w-8 text-right pr-3 font-bold">3.</div>
                  <div className="flex-1 text-justify">
                    <strong>Bersedia membayar penalti atau ganti rugi</strong> sebesar <strong>{data.penaltyAmount}</strong> kepada perusahaan secara tunai dan seketika, apabila saya mengundurkan diri (resign) atau melakukan pelanggaran berat yang mengakibatkan pemutusan hubungan kerja sebelum masa kontrak saya berakhir.
                  </div>
                </div>

                <div className="flex">
                  <div className="w-8 text-right pr-3 font-bold">4.</div>
                  <div className="flex-1 text-justify">
                    <strong>Mematuhi kerahasiaan perusahaan (Non-Disclosure Agreement)</strong>, dengan tidak membocorkan informasi, data operasional, dokumen keuangan, strategi bisnis, daftar klien, maupun rahasia dagang milik perusahaan kepada pihak ketiga mana pun, baik selama saya masih berstatus karyawan maupun setelah hubungan kerja berakhir.
                  </div>
                </div>

                <div className="flex">
                  <div className="w-8 text-right pr-3 font-bold">5.</div>
                  <div className="flex-1 text-justify">
                    Bersedia tunduk dan patuh pada seluruh Peraturan Perusahaan, Standar Operasional Prosedur (SOP), serta arahan dari atasan demi menjaga nama baik dan kelancaran operasional perusahaan.
                  </div>
                </div>
              </div>

              <p className="mb-4 text-justify">
                Demikian Surat Pernyataan Kesanggupan dan Penempatan Kerja ini saya buat dengan keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya unsur paksaan, tekanan, atau pengaruh dari pihak mana pun.
              </p>
              
              <p className="text-justify mb-8">
                Apabila di kemudian hari terbukti bahwa pernyataan ini tidak benar atau saya melanggar komitmen di atas, saya bersedia menerima sanksi berupa Pemutusan Hubungan Kerja (PHK) secara tidak hormat, serta diproses secara hukum sesuai dengan peraturan perundang-undangan yang berlaku.
              </p>
            </div>

            <div className="flex justify-end text-center mt-12 mb-8 break-inside-avoid">
              <div className="w-1/2 md:w-1/3">
                  <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="mb-2 font-bold">Yang Membuat Pernyataan,</p>
                  <div className="h-24 flex flex-col justify-end items-center relative">
                    <div className="border border-slate-300 w-20 h-12 mb-[-1.5rem] flex items-center justify-center text-[8px] text-slate-400 italic uppercase z-0 bg-white">Meterai 10.000</div>
                    <p className="font-bold underline uppercase relative z-10">{data.empName}</p>
                  </div>
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
               <Briefcase size={16} className="text-blue-500" /> <span>Pernyataan Kerja Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('pekerjaan')} className={`flex-1 py-3 border-r ${activeTab === 'pekerjaan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pekerjaan</button>
              <button onClick={() => setActiveTab('lainnya')} className={`flex-1 py-3 ${activeTab === 'lainnya' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Lainnya</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Karyawan (Pembuat Pernyataan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-mono" value={data.empNik} onChange={e => handleDataChange('empNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.empPob} onChange={e => handleDataChange('empPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.empDob} onChange={e => handleDataChange('empDob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select 
                      className="w-full p-2 border rounded-lg text-sm mt-1 bg-white"
                      value={data.empGender}
                      onChange={e => handleDataChange('empGender', e.target.value as any)}
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.empReligion} onChange={e => handleDataChange('empReligion', e.target.value)} placeholder="Agama" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16 resize-none" value={data.empAddress} onChange={e => handleDataChange('empAddress', e.target.value)} placeholder="Jalan, RT/RW, Kel, Kec..." />
                </div>
              </div>
              )}

              {activeTab === 'pekerjaan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Informasi Pekerjaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan / Institusi</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Misal: PT Teknologi Inovasi Nusantara" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Posisi / Jabatan Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Misal: Software Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kontrak</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Misal: 1 (Satu) Tahun" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nilai Penalti (Jika Resign)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} placeholder="Misal: Rp 10.000.000" />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'lainnya' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Info Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Tempat TTD</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Misal: Jakarta" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
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
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10 mt-10 md:mt-0">
         <PrintWrapper documentName="Surat_Pernyataan_Kerja" price={15000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}