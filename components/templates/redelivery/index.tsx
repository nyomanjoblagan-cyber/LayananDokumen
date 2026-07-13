'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Ship, Anchor, MapPin, User, FileText } from 'lucide-react';

export default function RedeliveryTemplate() {
  const [data, setData] = useState({
    nomorSurat: 'RDL/2026/08-001',
    tanggal: '13 Juli 2026',
    
    // Shipping Line
    shippingLine: 'PT. SAMUDERA GLOBAL LOGISTICS',
    alamatShipping: 'Graha Samudera Lt. 5, Jl. Yos Sudarso No. 12, Tanjung Priok, Jakarta Utara',
    
    // Shipment Details
    vessel: 'MSC ORION / VOY. 045E',
    blNumber: 'SGL-JKT-9988776',
    portOfLoading: 'Singapore (SGSIN)',
    portOfDischarge: 'Jakarta (IDJKT)',
    eta: '10 Juli 2026',
    containerType: '2x40HC, 1x20DC',
    
    // Container List
    containers: 'MSCU1234567, MSCU7654321, MSCU1122334',
    cargoDescription: 'Electronic Spare Parts & Accessories',
    
    // Old & New Details
    oldConsignee: 'PT. LAMA SEJAHTERA',
    oldDestination: 'Gudang Cikarang Dry Port Blok A1',
    newConsignee: 'PT. BARU SUKSES MAKMUR',
    newDestination: 'Kawasan Industri MM2100 Blok H-5, Cibitung',
    
    // Reason
    alasan: 'Perubahan lokasi gudang penerima akhir atas instruksi dari Shipper (Pihak Pengirim) sesuai dengan email terlampir.',
    
    // Signatures
    namaPemohon: 'Ahmad Yani',
    jabatanPemohon: 'Logistics Manager',
    perusahaanPemohon: 'PT. IMPORTIR MAJU INDONESIA',
    
    // Indemnity
    indemnityClause: true
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Ship className="w-5 h-5 text-blue-600" />
          Redelivery Request
        </h2>
        
        <div className="space-y-5">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Info Surat
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
                <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                <input type="text" name="tanggal" value={data.tanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Anchor className="w-4 h-4" /> Kepada (Shipping Line)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Line</label>
                <input type="text" name="shippingLine" value={data.shippingLine} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
                <textarea name="alamatShipping" value={data.alamatShipping} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Ship className="w-4 h-4" /> Shipment Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Vessel / Voy</label>
                <input type="text" name="vessel" value={data.vessel} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">B/L Number</label>
                <input type="text" name="blNumber" value={data.blNumber} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">POL</label>
                  <input type="text" name="portOfLoading" value={data.portOfLoading} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">POD</label>
                  <input type="text" name="portOfDischarge" value={data.portOfDischarge} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Container & Type</label>
                <input type="text" name="containerType" value={data.containerType} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Container Numbers</label>
                <textarea name="containers" value={data.containers} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono h-20 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Cargo Description</label>
                <input type="text" name="cargoDescription" value={data.cargoDescription} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Perubahan Tujuan
            </h3>
            <div className="space-y-4">
              <div className="pl-3 border-l-2 border-red-400">
                <p className="text-xs font-bold text-red-600 mb-1 uppercase">Lama (Old)</p>
                <input type="text" placeholder="Consignee Lama" name="oldConsignee" value={data.oldConsignee} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2" />
                <input type="text" placeholder="Destinasi Lama" name="oldDestination" value={data.oldDestination} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="pl-3 border-l-2 border-green-500">
                <p className="text-xs font-bold text-green-700 mb-1 uppercase">Baru (New)</p>
                <input type="text" placeholder="Consignee Baru" name="newConsignee" value={data.newConsignee} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2 font-bold" />
                <input type="text" placeholder="Destinasi Baru" name="newDestination" value={data.newDestination} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Alasan Perubahan</label>
                <textarea name="alasan" value={data.alasan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Pemohon (Applicant)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan Pemohon</label>
                <input type="text" name="perusahaanPemohon" value={data.perusahaanPemohon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                <input type="text" name="namaPemohon" value={data.namaPemohon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                <input type="text" name="jabatanPemohon" value={data.jabatanPemohon} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="indemnityClause" checked={data.indemnityClause} onChange={handleCheckbox} className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sertakan Letter of Indemnity (LOI) Clause</span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <PrintWrapper printRef={printRef}>
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 20mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .info-table td { padding: 4px 8px; vertical-align: top; font-size: 10pt; }
              .info-table td:nth-child(1) { width: 35%; font-weight: bold; background-color: #f3f4f6; border-right: 1px solid #d1d5db; }
              .info-table td:nth-child(2) { width: 65%; }
              .info-table tr { border-bottom: 1px solid #d1d5db; border-top: 1px solid #d1d5db; }
            `}} />

            {/* Letterhead */}
            <div className="border-b-4 border-double border-gray-800 pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider text-blue-900" style={{ fontSize: '18pt' }}>
                  {data.perusahaanPemohon}
                </h1>
                <p className="text-xs text-gray-600 mt-1">Export / Import & Logistics Solutions</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Ref: {data.nomorSurat}</p>
                <p className="text-sm">Date: {data.tanggal}</p>
              </div>
            </div>

            {/* To Section */}
            <div className="mb-8 text-[11pt]">
              <p><strong>To:</strong></p>
              <p className="font-bold uppercase text-lg">{data.shippingLine}</p>
              <div className="whitespace-pre-line mt-1">{data.alamatShipping}</div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold uppercase underline" style={{ fontSize: '14pt' }}>Request for Redelivery / Change of Destination</h2>
            </div>

            {/* Body Text */}
            <div className="text-[11pt] text-justify mb-6">
              <p className="mb-4">
                Dear Sir/Madam,
              </p>
              <p className="mb-4">
                We, <strong>{data.perusahaanPemohon}</strong>, hereby request to amend the delivery destination / consignee for the following shipment:
              </p>
            </div>

            {/* Shipment Details Table */}
            <div className="mb-8">
              <table className="w-full border-collapse info-table border border-gray-300">
                <tbody>
                  <tr>
                    <td>Vessel / Voyage</td>
                    <td className="font-bold">{data.vessel}</td>
                  </tr>
                  <tr>
                    <td>Bill of Lading (B/L) No.</td>
                    <td className="font-mono font-bold text-[11pt]">{data.blNumber}</td>
                  </tr>
                  <tr>
                    <td>Port of Loading (POL)</td>
                    <td>{data.portOfLoading}</td>
                  </tr>
                  <tr>
                    <td>Port of Discharge (POD)</td>
                    <td>{data.portOfDischarge}</td>
                  </tr>
                  <tr>
                    <td>Container / Type</td>
                    <td>{data.containerType}</td>
                  </tr>
                  <tr>
                    <td>Container Number(s)</td>
                    <td className="font-mono">{data.containers}</td>
                  </tr>
                  <tr>
                    <td>Cargo Description</td>
                    <td>{data.cargoDescription}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Old vs New Table */}
            <div className="mb-8">
              <p className="font-bold mb-2 text-[11pt]">Please amend the delivery instructions as follows:</p>
              <table className="w-full border-collapse border border-gray-300 text-[10pt]">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-red-50 p-2 w-1/2 text-red-800 uppercase">From (Old Details)</th>
                    <th className="border border-gray-300 bg-green-50 p-2 w-1/2 text-green-800 uppercase">To (New Details)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 align-top">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Consignee:</p>
                      <p className="mb-3">{data.oldConsignee}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Destination / Delivery Place:</p>
                      <p>{data.oldDestination}</p>
                    </td>
                    <td className="border border-gray-300 p-3 align-top bg-green-50/30">
                      <p className="text-xs font-bold text-green-700 uppercase mb-1">Consignee:</p>
                      <p className="mb-3 font-bold">{data.newConsignee}</p>
                      <p className="text-xs font-bold text-green-700 uppercase mb-1">Destination / Delivery Place:</p>
                      <p className="font-bold">{data.newDestination}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 text-[10pt]">
                <strong>Reason for change:</strong> {data.alasan}
              </div>
            </div>

            {/* Letter of Indemnity Clause */}
            {data.indemnityClause && (
              <div className="mb-8 text-[9pt] border border-gray-400 p-4 bg-gray-50 text-justify">
                <p className="font-bold mb-2 uppercase underline">Letter of Indemnity (LOI)</p>
                <p className="mb-2">
                  In consideration of your complying with our above request, we hereby agree as follows:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>To indemnify you, your servants and agents and to hold all of you harmless in respect of any liability, loss, damage or expense of whatsoever nature which you may sustain by reason of delivering the cargo in accordance with our request.</li>
                  <li>In the event of any proceedings being commenced against you or any of your servants or agents in connection with the delivery of the cargo as aforesaid, to provide you or them on demand with sufficient funds to defend the same.</li>
                  <li>If the vessel or any other vessel or property belonging to you should be arrested or detained or if the arrest or detention thereof should be threatened, to provide on demand such bail or other security as may be required to prevent such arrest or detention or to secure the release of such vessel or property and to indemnify you in respect of any loss, damage or expenses caused by such arrest or detention whether or not the same may be justified.</li>
                  <li>To bear any additional freight, port charges, terminal handling charges, trucking fees, and other expenses arising from this change of destination.</li>
                </ol>
              </div>
            )}

            {/* Closing */}
            <div className="text-[11pt] mb-12">
              <p>Thank you for your prompt assistance and cooperation in this matter.</p>
            </div>

            {/* Signature Area */}
            <div className="flex justify-end text-[11pt]">
              <div className="w-72 text-center">
                <p className="mb-1">Yours faithfully,</p>
                <p className="font-bold mb-20">{data.perusahaanPemohon}</p>
                
                {/* Stamp Placeholder area */}
                <div className="relative">
                  <div className="absolute -left-4 -top-16 w-24 h-24 border-[3px] border-blue-700 rounded-full flex items-center justify-center opacity-30 transform -rotate-12">
                    <span className="text-blue-700 font-bold text-[8px] text-center">{data.perusahaanPemohon}<br/>APPROVED</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaPemohon}</p>
                  <p>{data.jabatanPemohon}</p>
                </div>
              </div>
            </div>

          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}
