'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import { PrintWrapper } from '@/components/shared/PrintWrapper';

const INITIAL_DATA = {
  hari: 'Selasa',
  tanggal: '10',
  bulan: 'September',
  tahun: '2026',
  
  // Pihak Pertama (Pembeli/Hotel/Perusahaan)
  pihak1Nama: '',
  pihak1Jabatan: 'General Manager',
  pihak1Perusahaan: '',
  pihak1Alamat: '',
  
  // Pihak Kedua (Vendor/Supplier)
  pihak2Nama: '',
  pihak2Jabatan: 'Direktur',
  pihak2Perusahaan: '',
  pihak2Alamat: '',
  
  // Objek Kerjasama
  jenisBarang: 'Bahan Baku Makanan (F&B) dan Daging Segar',
  standarKualitas: 'Barang harus dalam keadaan segar, higienis, kemasan utuh, dan sesuai spesifikasi Purchase Order (PO).',
  
  // Termin & Denda
  terminPembayaran: 'Net-30 (30 hari kerja sejak Invoice & BAST diterima lengkap)',
  dendaKeterlambatan: '1% (Satu Persen) per hari dari total nilai PO yang terlambat',
  
  // Waktu Kontrak
  durasiKontrak: '1 (satu)',
  mulaiKontrak: '15 September 2026',
  akhirKontrak: '14 September 2027',
};

export default function VendorSupplierTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset semua isian data?')) {
      setData(INITIAL_DATA);
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => (
    <Kertas>
      {/* KOP atau JUDUL */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-lg uppercase underline">PERJANJIAN KERJASAMA PENGADAAN BARANG (VENDOR/SUPPLIER)</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Jabatan</td><td className="w-4 align-top">:</td><td>{data.pihak1Jabatan || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Perusahaan</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Perusahaan || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Alamat Instansi</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak untuk dan atas nama Perusahaan/Instansi tersebut, selanjutnya disebut <strong>PIHAK PERTAMA (Pembeli)</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Jabatan</td><td className="w-4 align-top">:</td><td>{data.pihak2Jabatan || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Perusahaan</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Perusahaan || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Alamat Bisnis</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak untuk dan atas nama Perusahaan/Badan Usaha tersebut, selanjutnya disebut <strong>PIHAK KEDUA (Vendor/Supplier)</strong>.</p>

        <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama sepakat untuk mengadakan Perjanjian Kerjasama Pengadaan Barang dengan syarat dan ketentuan sebagai berikut:</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>RUANG LINGKUP DAN SPESIFIKASI BARANG</div>
        <p>PIHAK PERTAMA menunjuk PIHAK KEDUA, dan PIHAK KEDUA menerima penunjukan tersebut untuk memasok dan mengirimkan <strong>{data.jenisBarang || '................'}</strong> kepada PIHAK PERTAMA.</p>
        <p>PIHAK KEDUA wajib menjamin bahwa barang yang dikirim memenuhi Service Level Agreement (SLA) dan standar kualitas mutlak, yaitu: <em>"{data.standarKualitas || '................'}"</em>.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>SISTEM PEMESANAN DAN PENGIRIMAN</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Pemesanan barang akan dilakukan oleh PIHAK PERTAMA melalui <em>Purchase Order (PO)</em> resmi yang dikirimkan kepada PIHAK KEDUA.</li>
          <li>PIHAK KEDUA wajib mengirimkan barang sesuai dengan waktu, jumlah, dan spesifikasi yang tertera di dalam PO.</li>
          <li>Setiap pengiriman barang harus disertai dengan Surat Jalan (Delivery Order) yang sah.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>RETUR (PENOLAKAN BARANG) & SANKSI KETERLAMBATAN</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>PIHAK PERTAMA berhak penuh <strong>MENOLAK (RETUR)</strong> barang yang dikirim apabila tidak sesuai spesifikasi, cacat, rusak, basi, atau kadaluwarsa. PIHAK KEDUA wajib mengganti barang retur tersebut selambat-lambatnya 1x24 jam.</li>
          <li>Apabila PIHAK KEDUA terlambat mengirimkan barang dari batas waktu di PO tanpa persetujuan PIHAK PERTAMA, maka PIHAK KEDUA akan dikenakan Denda Keterlambatan sebesar <strong>{data.dendaKeterlambatan || '...'}</strong>.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>TATA CARA PENAGIHAN DAN TERMIN PEMBAYARAN</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Penagihan dilakukan dengan melampirkan kelengkapan dokumen asli berupa: Invoice, Surat Jalan bersetempel penerima, dan copy PO.</li>
          <li>Termin pembayaran yang disepakati oleh kedua belah pihak adalah <strong>{data.terminPembayaran || '...'}</strong>.</li>
          <li>Pembayaran dilakukan melalui transfer bank ke rekening resmi atas nama Perusahaan PIHAK KEDUA.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 5<br/>JANGKA WAKTU KONTRAK & PEMUTUSAN SEPIHAK</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Kontrak kerjasama ini berlaku selama <strong>{data.durasiKontrak || '...'} Tahun</strong>, terhitung mulai tanggal <strong>{data.mulaiKontrak || '.....'}</strong> s.d. <strong>{data.akhirKontrak || '.....'}</strong>.</li>
          <li>PIHAK PERTAMA berhak memutus kontrak ini <strong>SECARA SEPIHAK</strong> dan seketika, apabila PIHAK KEDUA melakukan wanprestasi berat, penipuan timbangan/spesifikasi, atau gagal memenuhi standar kualitas berturut-turut sebanyak 3 (tiga) kali pemesanan.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 6<br/>PENUTUP</div>
        <p>Perjanjian ini dibuat rangkap 2 (dua), bermeterai cukup dan memiliki kekuatan hukum yang sama. Segala perselisihan akan diselesaikan secara musyawarah, dan jika gagal akan diselesaikan melalui jalur hukum.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <p className="text-sm">(Pembeli / Perusahaan)</p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <p className="text-sm">(Vendor / Supplier)</p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Nama || '..............................'}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-screen print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI - FORM */}
        <div className={`no-print ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[450px] lg:w-[500px] flex-col bg-white border-r border-slate-200 shadow-xl z-10 h-full`}>
          <div className="p-5 border-b border-slate-200 bg-white sticky top-0 z-20">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Kontrak Vendor & Supplier</h2>
                <p className="text-xs text-slate-500">Perjanjian Pengadaan Barang B2B</p>
              </div>
              <button onClick={resetForm} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
                Reset
              </button>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
               <p className="text-[10px] font-bold text-blue-700 leading-tight">SLA & RETUR SECURED:</p>
               <p className="text-[10px] text-blue-700 leading-tight mt-1">Gunakan kontrak ini untuk mengunci kualitas barang vendor, menekan kebocoran anggaran (SLA), dan mengamankan cashflow melalui pengaturan termin <i>Invoice</i> yang kaku.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 md:pb-5">
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Tanggal Perjanjian</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Pertama (Anda / Pembeli)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Perusahaan/Hotel</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Perusahaan} onChange={(e) => handleChange('pihak1Perusahaan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Perwakilan (GM/Direktur)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Jabatan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Jabatan} onChange={(e) => handleChange('pihak1Jabatan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Perusahaan</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Kedua (Vendor / Supplier)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Perusahaan Vendor (PT/CV)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Perusahaan} onChange={(e) => handleChange('pihak2Perusahaan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Perwakilan Vendor</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Jabatan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Jabatan} onChange={(e) => handleChange('pihak2Jabatan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Vendor</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Objek Kerjasama & Kualitas</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Jenis Barang (Bahan Baku/Mesin/Jasa)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisBarang} onChange={(e) => handleChange('jenisBarang', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Standar Kualitas & Syarat Retur (SLA)</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={3} value={data.standarKualitas} onChange={(e) => handleChange('standarKualitas', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Termin, Denda, & Waktu Kontrak</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Termin Pembayaran (Misal: Net-30)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.terminPembayaran} onChange={(e) => handleChange('terminPembayaran', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Sanksi Denda Keterlambatan Pengiriman</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.dendaKeterlambatan} onChange={(e) => handleChange('dendaKeterlambatan', e.target.value)} /></div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Durasi (Tahun)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.durasiKontrak} onChange={(e) => handleChange('durasiKontrak', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Mulai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.mulaiKontrak} onChange={(e) => handleChange('mulaiKontrak', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Akhir</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.akhirKontrak} onChange={(e) => handleChange('akhirKontrak', e.target.value)} /></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL KANAN - PREVIEW */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Vendor_Supplier_${data.pihak2Perusahaan.replace(/\s+/g, '_')}`} price={20000} />
           </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-neutral-900/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl border border-neutral-800 font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'editor' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Kembali ke</span>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Lihat Hasil</span>PREVIEW</button>
      </div>

      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
    </div>
  );
}
