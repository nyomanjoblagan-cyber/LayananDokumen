'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { ShoppingBag, Box, Image as ImageIcon } from 'lucide-react';

export default function KatalogDeskripsiTemplate() {
  const [data, setData] = useState({
    // Perusahaan
    namaPerusahaan: 'PT. TEKNOLOGI MASA DEPAN',
    website: 'www.tekno-masa.com',
    kontak: 'Sales: 0811-2233-4455 | Email: sales@tekno-masa.com',
    
    // Produk
    namaProduk: 'Mesin Kopi Espresso Otomatis Seri X-900',
    kategori: 'Peralatan Dapur Komersial',
    sku: 'TM-X900-ESP',
    hargaBiasa: 45000000,
    hargaDiskon: 42500000,
    
    // Deskripsi
    deskripsiUtama: 'Mesin kopi profesional dengan sistem dual-boiler dan pompa putar (rotary pump) yang mampu menghasilkan ekstraksi espresso sempurna secara konsisten. Sangat cocok untuk coffee shop dengan volume tinggi (hingga 300 cup per hari).',
    
    // Spesifikasi
    specList: 'Daya Listrik: 2.200 Watt\nTegangan: 220V / 50Hz\nKapasitas Boiler: 5 Liter\nDimensi (PxLxT): 55cm x 45cm x 50cm\nBerat: 35 Kg\nMaterial: Stainless Steel 304',
    
    // Fitur Unggulan
    fiturList: '1. Layar sentuh TFT 3.5 inci\n2. Profil suhu ekstraksi yang dapat diatur (PID)\n3. Pre-infusion otomatis\n4. Steam wand anti-panas (cool touch)',
    
    // Garansi / S&K
    syaratKetentuan: 'Garansi resmi 1 tahun untuk sparepart dan 2 tahun untuk service (heating element). Pengiriman gratis untuk wilayah Jabodetabek. Instalasi dan training dasar penggunaan termasuk dalam harga.'
  });

  const printRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-fuchsia-600" />
          Editor Katalog Produk
        </h2>
        
        <div className="space-y-5">
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Identitas Brand</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan/Toko</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                  <input type="text" name="website" value={data.website} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kontak/Telepon</label>
                  <input type="text" name="kontak" value={data.kontak} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4 rounded-lg border border-fuchsia-100 dark:border-fuchsia-800">
            <h3 className="font-semibold text-fuchsia-800 dark:text-fuchsia-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4" /> Informasi Produk Utama
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Nama Produk</label>
                <input type="text" name="namaProduk" value={data.namaProduk} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Kategori</label>
                  <input type="text" name="kategori" value={data.kategori} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Kode / SKU</label>
                  <input type="text" name="sku" value={data.sku} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Harga Normal (Rp)</label>
                  <input type="number" name="hargaBiasa" value={data.hargaBiasa} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Harga Diskon/Promo (Rp)</label>
                  <input type="number" name="hargaDiskon" value={data.hargaDiskon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-1">Deskripsi Singkat</label>
                <textarea name="deskripsiUtama" value={data.deskripsiUtama} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none leading-relaxed text-sm"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Detail Teknis & Fitur</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spesifikasi (Satu per baris)</label>
                <textarea name="specList" value={data.specList} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none text-sm font-mono"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fitur Unggulan (Satu per baris)</label>
                <textarea name="fiturList" value={data.fiturList} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none text-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Syarat, Ketentuan & Garansi</label>
                <textarea name="syaratKetentuan" value={data.syaratKetentuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none text-sm"></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <PrintWrapper printRef={printRef}>
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto flex flex-col" style={{ width: '210mm', minHeight: '297mm', padding: '0', fontFamily: '"Inter", "Segoe UI", Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
              @media print {
                @page { size: A4 portrait; margin: 0; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .gradient-bg { background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%); }
              .spec-table td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
              .spec-table td:first-child { font-weight: 600; color: #4b5563; width: 40%; background-color: #f9fafb; border-right: 1px solid #e5e7eb; }
            `}} />

            {/* HEADER BRANDING */}
            <div className="gradient-bg text-white p-8 pb-12 rounded-b-[2rem]">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black tracking-tight uppercase" style={{ fontSize: '24pt' }}>{data.namaPerusahaan}</h1>
                  <p className="text-purple-200 mt-1 uppercase tracking-widest text-sm">Product Catalog Specification</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-purple-100">{data.website}</p>
                  <p className="text-purple-200">{data.kontak}</p>
                </div>
              </div>
            </div>

            {/* CONTENT BODY */}
            <div className="flex-1 p-10 pt-4 -mt-6">
              
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex gap-8 mb-8">
                {/* Image Placeholder */}
                <div className="w-1/2 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[300px]">
                  <ImageIcon className="w-20 h-20 text-gray-300 mb-4" />
                  <span className="text-gray-400 font-medium text-sm">Product Image<br/>(High Resolution)</span>
                </div>
                
                {/* Main Product Info */}
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3 w-max">
                    {data.kategori}
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2" style={{ fontSize: '22pt' }}>
                    {data.namaProduk}
                  </h2>
                  
                  <p className="text-gray-500 font-mono text-sm mb-6">SKU: {data.sku}</p>
                  
                  <div className="mb-6">
                    {data.hargaDiskon > 0 ? (
                      <div>
                        <span className="text-gray-400 line-through text-lg">{formatCurrency(data.hargaBiasa)}</span>
                        <div className="text-4xl font-black text-purple-700" style={{ fontSize: '28pt' }}>{formatCurrency(data.hargaDiskon)}</div>
                      </div>
                    ) : (
                      <div className="text-4xl font-black text-gray-900" style={{ fontSize: '28pt' }}>{formatCurrency(data.hargaBiasa)}</div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {data.deskripsiUtama}
                  </p>
                </div>
              </div>

              {/* Two Column Section */}
              <div className="flex gap-8 mt-10">
                {/* Specifications */}
                <div className="w-1/2">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b-2 border-purple-500 pb-2 mb-4">Technical Specifications</h3>
                  <table className="w-full spec-table text-[10pt] border border-gray-200">
                    <tbody>
                      {data.specList.split('\n').filter(line => line.trim() !== '').map((line, idx) => {
                        const parts = line.split(':');
                        if (parts.length >= 2) {
                          const key = parts[0].trim();
                          const val = parts.slice(1).join(':').trim();
                          return (
                            <tr key={idx}>
                              <td>{key}</td>
                              <td>{val}</td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={idx}>
                              <td colSpan={2}>{line}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Features */}
                <div className="w-1/2">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b-2 border-purple-500 pb-2 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {data.fiturList.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[10.5pt] text-gray-700">
                        <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                        <span>{line.replace(/^\d+\.\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 uppercase text-xs mb-2">Warranty & Terms</h4>
                    <p className="text-gray-600 text-xs leading-relaxed text-justify">
                      {data.syaratKetentuan}
                    </p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* FOOTER */}
            <div className="bg-gray-900 text-gray-400 text-center py-4 text-[8pt] uppercase tracking-widest mt-auto">
              Confidential Product Information &copy; {new Date().getFullYear()} {data.namaPerusahaan}
            </div>

          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}