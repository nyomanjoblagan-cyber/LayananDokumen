'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Tag, Building, Percent, FileSignature } from 'lucide-react';

export default function DiskonTemplate() {
  const [data, setData] = useState({
    // Header
    namaPerusahaan: 'PT. DISTRIBUTOR UTAMA NASIONAL',
    alamatPerusahaan: 'Kawasan Industri Terpadu Kav. 15-20, Cikarang',
    kontakPerusahaan: 'Telp: (021) 899-7766 | Email: sales@dun.co.id',
    
    // Surat Info
    nomorSurat: '045/SALES-DUN/VII/2026',
    tanggalSurat: '13 Juli 2026',
    perihal: 'Persetujuan Pengajuan Diskon Khusus (Special Discount)',
    
    // Tujuan
    namaKlien: 'PT. RITEL MAKMUR SENTOSA',
    upKlien: 'Bpk. Hendra Gunawan (Purchasing Manager)',
    alamatKlien: 'Jl. Boulevard Raya Blok M No. 55\nKelapa Gading, Jakarta Utara',
    
    // Konten
    referensiPO: 'PO-RMS-26-07-010',
    namaProyek: 'Pengadaan Elektronik Cabang Baru (Q3)',
    
    // Angka Diskon
    totalNilaiPO: 500000000,
    persentaseDiskon: 15,
    
    // Penutup
    catatan: 'Diskon ini bersifat rahasia (confidential) dan hanya berlaku untuk transaksi pada PO tersebut di atas. Pembayaran wajib diselesaikan selambat-lambatnya 14 (empat belas) hari kerja setelah invoice diterima.',
    
    // Penandatangan
    namaSales: 'Ridwan Kamil',
    jabatanSales: 'National Sales Director',
    namaDirektur: 'Susanto Wijaya',
    jabatanDirektur: 'Managing Director'
  });

  const printRef = useRef<HTMLDivElement>(null);

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

  const DocumentContent = () => (
    <div ref={printRef} className={`print-safe-area bg-white text-black shadow-2xl mx-auto print:shadow-none ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`} style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .kalkulasi-table td { padding: 8px 12px; font-size: 11pt; border-bottom: 1px solid #e5e7eb; }
            `}} />

            {/* KOP Surat */}
            <div className="border-b-4 border-double border-gray-800 pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider text-orange-900" style={{ fontSize: '18pt' }}>
                  {data.namaPerusahaan}
                </h1>
                <p className="text-sm mt-1">{data.alamatPerusahaan}</p>
                <p className="text-sm">{data.kontakPerusahaan}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">No: <strong>{data.nomorSurat}</strong></p>
                <p className="text-sm">Date: {data.tanggalSurat}</p>
              </div>
            </div>

            {/* Tujuan */}
            <div className="mb-10 text-[11pt]">
              <table className="w-full mb-6">
                <tbody>
                  <tr>
                    <td className="w-20 align-top">Kepada</td>
                    <td className="w-4 align-top">:</td>
                    <td className="font-bold uppercase">{data.namaKlien}</td>
                  </tr>
                  <tr>
                    <td className="align-top">U.P</td>
                    <td className="align-top">:</td>
                    <td className="font-bold">{data.upKlien}</td>
                  </tr>
                  <tr>
                    <td className="align-top">Alamat</td>
                    <td className="align-top">:</td>
                    <td className="whitespace-pre-line">{data.alamatKlien}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2"></td>
                  </tr>
                  <tr>
                    <td className="align-top font-bold">Perihal</td>
                    <td className="align-top font-bold">:</td>
                    <td className="font-bold underline uppercase text-orange-900">{data.perihal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pembuka */}
            <div className="text-[11pt] text-justify mb-6 leading-relaxed">
              <p className="mb-4">
                Dengan hormat,
              </p>
              <p className="mb-4 indent-8">
                Menindaklanjuti permohonan Bapak/Ibu dan mengacu pada <strong>Purchase Order (PO) Nomor: {data.referensiPO}</strong> untuk keperluan <strong>{data.namaProyek}</strong>, dengan ini Manajemen {data.namaPerusahaan} menyampaikan persetujuan pemberian Diskon Khusus.
              </p>
              <p className="mb-4 indent-8">
                Adapun rincian perhitungan transaksi dan diskon yang disetujui adalah sebagai berikut:
              </p>
            </div>

            {/* Tabel Kalkulasi */}
            <div className="mb-8 pl-8 pr-16">
              <table className="w-full kalkulasi-table border-2 border-gray-800">
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="font-bold">Total Nilai PO (Gross)</td>
                    <td className="text-right font-mono font-bold">{formatCurrency(data.totalNilaiPO)}</td>
                  </tr>
                  <tr className="bg-orange-50 text-orange-800 border-b-2 border-orange-800">
                    <td className="font-bold italic">
                      Special Discount ({data.persentaseDiskon}%)
                    </td>
                    <td className="text-right font-mono font-bold">
                      ({formatCurrency(nilaiDiskon)})
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="font-bold uppercase text-[12pt] py-4">Total Nilai Netto (Setelah Diskon)</td>
                    <td className="text-right font-mono font-black text-[13pt] py-4">{formatCurrency(nilaiSetelahDiskon)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[9pt] mt-2 italic text-gray-500">* Total Nilai Netto di atas belum termasuk Pajak Pertambahan Nilai (PPN) 11% jika berlaku.</p>
            </div>

            {/* Catatan S&K */}
            <div className="mb-10 text-[11pt]">
              <p className="font-bold mb-2">Syarat dan Ketentuan Berlakunya Diskon:</p>
              <div className="p-4 border border-orange-300 bg-orange-50/30 text-justify text-[10pt] leading-relaxed">
                {data.catatan}
              </div>
            </div>

            {/* Penutup */}
            <div className="text-[11pt] mb-12 text-justify">
              <p className="indent-8">
                Demikian surat persetujuan diskon ini kami sampaikan. Kami berharap kerjasama yang baik ini dapat terus berlanjut dan saling menguntungkan di masa mendatang. Atas perhatian dan kepercayaan Bapak/Ibu terhadap produk/layanan kami, kami ucapkan terima kasih.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-between px-8 text-[11pt]">
              <div className="w-64 text-center">
                <p className="mb-1">Diajukan Oleh,</p>
                <p className="font-bold mb-24">{data.namaPerusahaan}</p>
                <div className="relative">
                  <p className="font-bold underline uppercase">{data.namaSales}</p>
                  <p>{data.jabatanSales}</p>
                </div>
              </div>
              
              <div className="w-64 text-center">
                <p className="mb-1">Disetujui Oleh,</p>
                <p className="font-bold mb-24">{data.namaPerusahaan}</p>
                <div className="relative">
                  {/* Stamp */}
                  <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-28 h-28 border-[3px] border-orange-800 rounded-full flex flex-col items-center justify-center  transform -rotate-12 ">
                    <span className="text-[8px] font-bold uppercase tracking-widest">{data.namaPerusahaan}</span>
                    <span className="text-[16px] font-black text-orange-800 my-1">APPROVED</span>
                    <span className="text-[7px]">DIRECTOR</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaDirektur}</p>
                  <p>{data.jabatanDirektur}</p>
                </div>
              </div>
            </div>

          </div>

  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) || 0 : e.target.value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculations
  const nilaiDiskon = (data.totalNilaiPO * data.persentaseDiskon) / 100;
  const nilaiSetelahDiskon = data.totalNilaiPO - nilaiDiskon;

  return (
  <>
    <div className="flex flex-col md:flex-row gap-6 print:hidden">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-orange-600" />
            Surat Persetujuan Diskon
          </h2>
          <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                  <span className="text-emerald-400">❖</span> 
                  <span className="hidden md:inline">{activeTemplateName}</span>
              </button>
              {showTemplateMenu && <TemplateMenu />}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Perusahaan Penerbit</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. Surat</label>
                  <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4" /> Klien / Tujuan
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Nama Perusahaan Klien</label>
                <input type="text" name="namaKlien" value={data.namaKlien} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">U.P (Penerima)</label>
                <input type="text" name="upKlien" value={data.upKlien} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Alamat Klien</label>
                <textarea name="alamatKlien" value={data.alamatKlien} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
            <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4" /> Detail Diskon & Transaksi
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">Ref. PO Klien</label>
                  <input type="text" name="referensiPO" value={data.referensiPO} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">Nama Proyek</label>
                  <input type="text" name="namaProyek" value={data.namaProyek} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded border border-orange-200 dark:border-orange-700 shadow-sm">
                <div className="mb-3">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Total Nilai PO (Gross)</label>
                  <input type="number" name="totalNilaiPO" value={data.totalNilaiPO} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg font-bold font-mono" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Persentase Diskon (%)</label>
                  <input type="number" name="persentaseDiskon" value={data.persentaseDiskon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg font-bold font-mono text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">Catatan / S&K Diskon</label>
                <textarea name="catatan" value={data.catatan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none text-sm leading-relaxed"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileSignature className="w-4 h-4" /> Pengesahan
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Sales/Pihak 1</label>
                  <input type="text" name="namaSales" value={data.namaSales} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                  <input type="text" name="jabatanSales" value={data.jabatanSales} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs text-gray-500" placeholder="Jabatan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Direktur/Pihak 2</label>
                  <input type="text" name="namaDirektur" value={data.namaDirektur} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                  <input type="text" name="jabatanDirektur" value={data.jabatanDirektur} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs text-gray-500" placeholder="Jabatan" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
                    <DocumentContent />
                  <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>
      </div>
    </div>

    {/* --- PRINT PORTAL --- */}
    <div id="print-only-root" className="hidden print:block print:w-full print:h-auto print:static bg-white">
       <DocumentContent />
    </div>
  </>
  );
}
