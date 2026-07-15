"use client";

import React, { useState } from "react";
import PrintWrapper from '@/components/PrintWrapper';
import { Printer, ArrowLeftCircle, ShieldAlert, Edit3, RotateCcw, FileText, Activity, MapPin } from "lucide-react";
import Link from "next/link";

const INITIAL_DATA = {
  instansi: "KEPOLISIAN NEGARA REPUBLIK INDONESIA",
  daerah: "DAERAH JAWA TIMUR",
  satker: "RUMAH SAKIT BHAYANGKARA H.S. SAMSOERI MERTOJOSO",
  alamatInstansi: "Jl. Ahmad Yani No.116, Gayungan, Kota Surabaya, Jawa Timur",
  noSurat: "SKHPN / 1234 / VII / 2026 / RS.Bhy",
  
  dokterNama: "dr. SARTIKA AYU, M.Kes",
  dokterNrp: "AKBP NRP. 78051234",
  dokterJabatan: "Dokter Pemeriksa",

  pasienNama: "",
  pasienTempatLahir: "",
  pasienTanggalLahir: "",
  pasienJenisKelamin: "Laki-laki",
  pasienAgama: "Islam",
  pasienPekerjaan: "",
  pasienAlamat: "",
  pasienNik: "",

  keperluan: "Persyaratan Melamar Pekerjaan",
  
  hasilAmp: "NEGATIF",
  hasilMet: "NEGATIF",
  hasilThc: "NEGATIF",
  hasilMop: "NEGATIF",
  hasilBzo: "NEGATIF",
  hasilCoc: "NEGATIF",

  tempatDikeluarkan: "Surabaya",
  tanggalDikeluarkan: "",
};

export default function SuratKeteranganBebasNarkoba() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'instansi' | 'dokter' | 'pasien' | 'hasil'>('pasien');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';
  
  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
              Format Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
              Format Compact Rapi (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
    <div className={`bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-[15mm] text-black ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'} print:w-full print:max-w-none print:shadow-none print:m-0 print:p-0 relative group`}>
      {/* Kop Surat Section */}
      <div className="border-b-[4px] border-double border-black pb-3 mb-6 relative">
         <div className="absolute left-0 top-0 w-24 h-24 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center text-gray-400 text-xs no-print opacity-50 group-hover:opacity-100 transition-opacity">
           [ Logo Instansi ]
         </div>
         <div className="text-center px-24">
           <h2 className="text-lg font-bold tracking-wider uppercase m-0 leading-tight">{formData.instansi || "[NAMA INSTANSI]"}</h2>
           {formData.daerah && <h3 className="text-md font-bold uppercase m-0 leading-tight">{formData.daerah}</h3>}
           <h1 className="text-2xl font-black uppercase tracking-widest mt-1 mb-1 leading-tight">{formData.satker || "[NAMA RUMAH SAKIT / KLINIK]"}</h1>
           <p className="text-sm m-0 leading-snug">{formData.alamatInstansi || "[Alamat Lengkap Instansi]"}</p>
         </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-xl font-bold underline underline-offset-4 mb-1">SURAT KETERANGAN HASIL PEMERIKSAAN NARKOBA</h1>
        <p className="text-sm font-bold">Nomor: {formData.noSurat || "___________________________"}</p>
      </div>

      <div className="mb-6 space-y-2 text-justify leading-relaxed">
        <p>Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa:</p>
        <table className="w-full mt-2 ml-4">
          <tbody>
            <tr><td className="w-48 py-1 align-top">Nama Dokter Pemeriksa</td><td className="w-4 py-1 align-top">:</td><td className="py-1 font-bold uppercase">{formData.dokterNama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">NRP / NIP</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.dokterNrp || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Jabatan</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.dokterJabatan || "_______________________"}</td></tr>
          </tbody>
        </table>
        <p className="mt-4">Telah melakukan pemeriksaan fisik dan tes laboratorium atas permintaan dari / terhadap seseorang yang bernama:</p>
        <table className="w-full mt-2 ml-4">
          <tbody>
            <tr><td className="w-48 py-1 align-top">Nama Terperiksa</td><td className="w-4 py-1 align-top">:</td><td className="py-1 font-bold uppercase">{formData.pasienNama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Tempat, Tanggal Lahir</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienTempatLahir || "___________"}, {formData.pasienTanggalLahir ? new Date(formData.pasienTanggalLahir).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"}) : "___________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Jenis Kelamin</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienJenisKelamin || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Agama</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienAgama || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Pekerjaan</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienPekerjaan || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">No. Induk Kependudukan</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienNik || "_______________________"}</td></tr>
            <tr><td className="w-48 py-1 align-top">Alamat Domisili</td><td className="w-4 py-1 align-top">:</td><td className="py-1">{formData.pasienAlamat || "_______________________"}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 space-y-3 text-justify leading-relaxed">
        <p>Telah dilakukan anamnesa, pemeriksaan fisik, serta uji saring (Rapid Test) Narkotika, Psikotropika, dan Zat Adiktif (NAPZA) lainnya melalui spesimen Urine yang dilakukan pada tanggal {formData.tanggalDikeluarkan ? new Date(formData.tanggalDikeluarkan).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"}) : "____"} dengan hasil pemeriksaan sebagai berikut:</p>
        <div className="ml-8 my-4 border border-black p-4 inline-block w-[80%] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
           <table className="w-full">
              <tbody>
                <tr><td className="py-1 font-semibold">1. Amphetamine (AMP)</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilAmp}</td></tr>
                <tr><td className="py-1 font-semibold">2. Methamphetamine (MET)</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilMet}</td></tr>
                <tr><td className="py-1 font-semibold">3. Marijuana/THC</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilThc}</td></tr>
                <tr><td className="py-1 font-semibold">4. Morphine/Opiate (MOP)</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilMop}</td></tr>
                <tr><td className="py-1 font-semibold">5. Benzodiazepine (BZO)</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilBzo}</td></tr>
                <tr><td className="py-1 font-semibold">6. Cocaine (COC)</td><td className="py-1">:</td><td className="py-1 font-bold">{formData.hasilCoc}</td></tr>
              </tbody>
           </table>
        </div>
        <p>Berdasarkan hasil pemeriksaan tersebut di atas, maka yang bersangkutan pada saat ini dinyatakan <span className="font-bold underline">TIDAK DITEMUKAN TANDA-TANDA KETERGANTUNGAN ATAU PENYALAHGUNAAN NARKOBA</span>.</p>
        <p>Demikian Surat Keterangan Hasil Pemeriksaan Narkoba ini dibuat dengan sebenarnya untuk dipergunakan sebagai kelengkapan administrasi <strong>{formData.keperluan || "......................................................."}</strong>.</p>
      </div>

      <div className="flex justify-between mt-12 items-end">
        <div className="w-32 h-40 border-2 border-black flex items-center justify-center text-xs text-gray-500 font-sans tracking-wide ml-8 mb-4">
           <div className="text-center">PAS FOTO<br/>3 x 4</div>
        </div>
        <div className="text-center w-80 mr-8">
          <p className="mb-1">Dikeluarkan di : {formData.tempatDikeluarkan || ".................."}</p>
          <p className="mb-1">Pada tanggal &nbsp;&nbsp;: {formData.tanggalDikeluarkan ? new Date(formData.tanggalDikeluarkan).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"}) : ".................."}</p>
          <p className="mb-24 font-bold">{formData.dokterJabatan || "DOKTER PEMERIKSA"}</p>
          <div className="relative inline-block w-full">
             <div className="absolute left-[-40px] top-[-50px] w-28 h-28 border-4 border-blue-800 rounded-full flex items-center justify-center opacity-30 -rotate-12 z-0 no-print group-hover:opacity-10 transition-opacity">
                <div className="text-[8px] font-bold text-center text-blue-800">STEMPEL INSTANSI <br/> KEDOKTERAN</div>
             </div>
            <p className="font-bold underline z-10 relative bg-transparent uppercase tracking-wider">{formData.dokterNama || "........................................"}</p>
            <p className="text-sm font-semibold mt-1">{formData.dokterNrp || "NRP/NIP. ......................."}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset formulir ke awal? Semua data yang telah diisi akan hilang.')) {
      setFormData({ ...INITIAL_DATA });
    }
  };

  const handlePrint = () => {
    window.dispatchEvent(new Event('open-print-modal'));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:min-h-0 print:block">
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background: white;
            }
            @page {
              size: A4;
              margin: 15mm;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
          }
        `}
      </style>

      {/* TOP NAV SAKTI */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldAlert size={16} className="text-blue-500" /> <span>Legal Draft - SKHPN (Standar Medis/Polri)</span>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all">
                    <ShieldAlert size={16} className="text-blue-400"/> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className="no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full relative z-10 transition-transform">
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen SKHPN</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pasien')} className={`flex-1 py-3 border-r ${activeTab === 'pasien' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pasien</button>
              <button onClick={() => setActiveTab('hasil')} className={`flex-1 py-3 border-r ${activeTab === 'hasil' ? 'bg-white text-rose-600 border-b-2 border-b-rose-600' : 'text-slate-500 hover:bg-slate-200'}`}>Tes & Hasil</button>
              <button onClick={() => setActiveTab('dokter')} className={`flex-1 py-3 border-r ${activeTab === 'dokter' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemeriksa</button>
              <button onClick={() => setActiveTab('instansi')} className={`flex-1 py-3 ${activeTab === 'instansi' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Instansi</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pasien' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><FileText size={14}/> Identitas Terperiksa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="pasienNama" value={formData.pasienNama} onChange={handleChange} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienNik" value={formData.pasienNik} onChange={handleChange} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienTempatLahir" value={formData.pasienTempatLahir} onChange={handleChange} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienTanggalLahir" value={formData.pasienTanggalLahir} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienJenisKelamin" value={formData.pasienJenisKelamin} onChange={handleChange}>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienAgama" value={formData.pasienAgama} onChange={handleChange}>
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
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="pasienPekerjaan" value={formData.pasienPekerjaan} onChange={handleChange} placeholder="Contoh: Wiraswasta / Mahasiswa" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" name="pasienAlamat" value={formData.pasienAlamat} onChange={handleChange} placeholder="Alamat sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'hasil' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-rose-600 border-b pb-1 mb-4 flex items-center gap-2"><Activity size={14}/> Hasil Pemeriksaan Narkoba</h3>
                
                <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 mb-4">
                  <p className="text-[10px] text-rose-700 leading-relaxed font-medium">Ubah hasil tes ke "POSITIF" hanya jika diperlukan. Standar pengujian menggunakan metode Rapid Test (Urine).</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Amphetamine (AMP)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilAmp" value={formData.hasilAmp} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Methamphetamine (MET)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilMet" value={formData.hasilMet} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Marijuana/Ganja (THC)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilThc" value={formData.hasilThc} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Morphine/Opiate (MOP)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilMop" value={formData.hasilMop} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Benzodiazepine (BZO)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilBzo" value={formData.hasilBzo} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Cocaine (COC)</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" name="hasilCoc" value={formData.hasilCoc} onChange={handleChange}>
                      <option value="NEGATIF">NEGATIF</option>
                      <option value="POSITIF">POSITIF</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Keperluan Pemeriksaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="keperluan" value={formData.keperluan} onChange={handleChange} placeholder="Misal: Melamar Pekerjaan BUMN" />
                </div>
              </div>
              )}

              {activeTab === 'dokter' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Informasi Dokter Pemeriksa</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Dokter</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="dokterNama" value={formData.dokterNama} onChange={handleChange} placeholder="Nama beserta Gelar" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pangkat / NIP / NRP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="dokterNrp" value={formData.dokterNrp} onChange={handleChange} placeholder="Contoh: NRP. 12345678" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="dokterJabatan" value={formData.dokterJabatan} onChange={handleChange} placeholder="Contoh: Dokter Pemeriksa" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 border-t pt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Dikeluarkan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" name="tempatDikeluarkan" value={formData.tempatDikeluarkan} onChange={handleChange} placeholder="Kota/Kabupaten" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Dikeluarkan</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" name="tanggalDikeluarkan" value={formData.tanggalDikeluarkan} onChange={handleChange} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'instansi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><MapPin size={14}/> Kop Surat Instansi / RS</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tingkat Instansi / Kementerian</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="instansi" value={formData.instansi} onChange={handleChange} placeholder="Contoh: KEMENTERIAN KESEHATAN" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Daerah / Wilayah</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" name="daerah" value={formData.daerah} onChange={handleChange} placeholder="Contoh: PEMERINTAH PROVINSI JAWA BARAT" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Satuan Kerja / Nama RS / Klinik</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 text-blue-700" name="satker" value={formData.satker} onChange={handleChange} placeholder="Contoh: RSUD AL-IHSAN PROVINSI JAWA BARAT" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap Instansi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" name="alamatInstansi" value={formData.alamatInstansi} onChange={handleChange} placeholder="Alamat lengkap beserta kodepos dan telepon" />
                </div>
                <div className="mt-4 border-t pt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat SKHPN</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" name="noSurat" value={formData.noSurat} onChange={handleChange} placeholder="Contoh: SKHPN/ 123 /VII/2026/RS.Bhy" />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* Live Preview Panel (Right) */}
        <div className="flex-1 p-4 md:p-8 bg-gray-300 overflow-y-auto flex justify-center custom-scrollbar shadow-inner">
          <DocumentContent />
        </div>
      </main>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_bebas_narkoba" price={15000} />
      </div>

      {/* PRINT PORTAL OUTSIDE MAIN */}
      <div id="print-only-root" className="hidden print:block print:w-full print:h-auto print:static">
          <DocumentContent />
      </div>
    </div>
  );
}

