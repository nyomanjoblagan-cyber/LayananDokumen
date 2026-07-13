import React from 'react';

export interface RedeliveryData {
  letterNo: string;
  date: string;
  senderCompany: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  recipientCompany: {
    name: string;
    attention: string;
    address: string;
  };
  shipmentDetails: {
    blNumber: string;
    containerNumbers: string[];
    vesselVoyage: string;
    portOfLoading: string;
    portOfDischarge: string;
    originalETA: string;
  };
  redeliveryDetails: {
    reason: string;
    newConsigneeName: string;
    newDeliveryAddress: string;
    contactPerson: string;
    contactNumber: string;
    requestedDeliveryDate: string;
  };
  signatory: {
    name: string;
    title: string;
  };
}

interface RedeliveryTemplateProps {
  data?: RedeliveryData;
}

const defaultData: RedeliveryData = {
  letterNo: "REDEL/EXP/2026/07-001",
  date: "13 Juli 2026",
  senderCompany: {
    name: "PT. GLOBAL LOGISTIK INDONESIA",
    address: "Kawasan Industri MM2100, Jl. Jawa Blok H No. 1, Cikarang Barat, Bekasi 17530",
    phone: "+62 21 8989 1234",
    email: "export.ops@globallogistik.co.id"
  },
  recipientCompany: {
    name: "PT. PELAYARAN SAMUDERA LUAS",
    attention: "Import Customer Service / Delivery Dept.",
    address: "Gedung Maritim Lt. 5, Jl. Yos Sudarso No. 12, Tanjung Priok, Jakarta Utara 14320"
  },
  shipmentDetails: {
    blNumber: "OOCL1234567890",
    containerNumbers: ["OOCU 123456-7 (40HC)", "OOCU 765432-1 (20DC)"],
    vesselVoyage: "CMA CGM COLUMBA / 0T345W",
    portOfLoading: "Shanghai, China",
    portOfDischarge: "Tanjung Priok, Jakarta",
    originalETA: "10 Juli 2026"
  },
  redeliveryDetails: {
    reason: "Pabrik penerima awal mengalami kendala teknis bongkar muat (crane utama dalam perbaikan), sehingga muatan harus dialihkan sementara ke gudang konsolidasi.",
    newConsigneeName: "PT. GLOBAL LOGISTIK INDONESIA (Gudang Cibitung)",
    newDeliveryAddress: "Kawasan Industri Gobel, Jl. Teuku Umar KM 44, Cibitung, Bekasi 17520",
    contactPerson: "Bpk. Budi Santoso",
    contactNumber: "+62 812 3456 7890",
    requestedDeliveryDate: "15 Juli 2026"
  },
  signatory: {
    name: "Ahmad Riyadi",
    title: "Logistics & Operations Manager"
  }
};

const RedeliveryTemplate: React.FC<RedeliveryTemplateProps> = ({ data = defaultData }) => {
  return (
    <div className="bg-white text-black p-12 max-w-4xl mx-auto shadow-xl text-sm border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', minHeight: '1056px' }}>
      {/* Header / Kop Surat */}
      <div className="border-b-4 border-black pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-blue-900">{data.senderCompany.name}</h1>
          <p className="text-gray-800 mt-1 max-w-md font-medium">{data.senderCompany.address}</p>
          <p className="text-gray-600 mt-1">Tel: {data.senderCompany.phone} | Email: {data.senderCompany.email}</p>
        </div>
        {/* Placeholder for Logo */}
        <div className="w-24 h-24 bg-gray-50 flex items-center justify-center border-2 border-blue-900 rounded-lg shadow-sm">
          <span className="text-blue-900 font-bold text-xs text-center leading-tight">LOGISTICS<br/>LOGO</span>
        </div>
      </div>

      {/* Date & Ref */}
      <div className="flex justify-between mb-8 items-start">
        <div>
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-4 py-1 text-gray-600">Nomor</td>
                <td>: <strong className="text-black">{data.letterNo}</strong></td>
              </tr>
              <tr>
                <td className="pr-4 py-1 text-gray-600">Lampiran</td>
                <td>: <span className="text-black">1 (satu) Berkas</span></td>
              </tr>
              <tr>
                <td className="pr-4 py-1 text-gray-600">Perihal</td>
                <td>: <strong className="uppercase underline text-black">Permohonan Pengiriman Ulang (Redelivery Request)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <p className="font-medium text-black">Jakarta, {data.date}</p>
        </div>
      </div>

      {/* Recipient */}
      <div className="mb-8 p-4 bg-gray-50 rounded border border-gray-200 w-2/3">
        <p className="text-gray-600 mb-1">Kepada Yth.,</p>
        <p className="font-bold text-lg text-black">{data.recipientCompany.name}</p>
        <p className="text-black font-medium mt-1">U.p: {data.recipientCompany.attention}</p>
        <p className="max-w-md text-black mt-1 leading-relaxed">{data.recipientCompany.address}</p>
      </div>

      {/* Body */}
      <div className="mb-6 leading-relaxed text-black">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4 text-justify">
          Merujuk pada pengiriman kargo kami yang telah tiba di Pelabuhan <strong>{data.shipmentDetails.portOfDischarge}</strong>, bersama surat ini kami bermaksud untuk mengajukan permohonan pengiriman ulang (<strong>Redelivery</strong>) dengan rincian pengiriman awal sebagai berikut:
        </p>

        {/* Shipment Details Table */}
        <table className="w-full mb-6 border-collapse border border-gray-800 shadow-sm">
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="w-2/5 p-3 bg-gray-100 font-semibold border-r border-gray-800">Nomor B/L (Bill of Lading)</td>
              <td className="w-3/5 p-3 font-mono font-bold">{data.shipmentDetails.blNumber}</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="w-2/5 p-3 bg-gray-100 font-semibold border-r border-gray-800 align-top">Nomor Kontainer / Ukuran</td>
              <td className="w-3/5 p-3">
                <ul className="list-disc list-inside font-mono">
                  {data.shipmentDetails.containerNumbers.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="w-2/5 p-3 bg-gray-100 font-semibold border-r border-gray-800">Kapal / Pelayaran (Vessel/Voy)</td>
              <td className="w-3/5 p-3 uppercase">{data.shipmentDetails.vesselVoyage}</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="w-2/5 p-3 bg-gray-100 font-semibold border-r border-gray-800">Pelabuhan Muat (POL)</td>
              <td className="w-3/5 p-3">{data.shipmentDetails.portOfLoading}</td>
            </tr>
            <tr>
              <td className="w-2/5 p-3 bg-gray-100 font-semibold border-r border-gray-800">Estimasi Kedatangan (ETA)</td>
              <td className="w-3/5 p-3">{data.shipmentDetails.originalETA}</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4 text-justify">
          Dikarenakan adanya perubahan instruksi pengiriman karena alasan: <em>"{data.redeliveryDetails.reason}"</em>, kami memohon agar rute pengiriman kargo/kontainer tersebut diubah dan dikirimkan kembali ke alamat tujuan yang baru di bawah ini:
        </p>

        {/* New Delivery Details Box */}
        <div className="p-5 border-2 border-blue-800 bg-blue-50 mb-6 rounded-md shadow-sm">
          <h3 className="font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2 uppercase tracking-wide">Detail Pengiriman Baru (New Delivery Details)</h3>
          <table className="text-sm w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3 py-2 text-gray-700">Penerima Baru (Consignee)</td>
                <td className="py-2">: <span className="font-bold text-black text-base">{data.redeliveryDetails.newConsigneeName}</span></td>
              </tr>
              <tr>
                <td className="font-semibold py-2 align-top text-gray-700">Alamat Pengiriman Baru</td>
                <td className="py-2 leading-relaxed">: <span className="text-black font-medium">{data.redeliveryDetails.newDeliveryAddress}</span></td>
              </tr>
              <tr>
                <td className="font-semibold py-2 text-gray-700">Tgl. Pengiriman Diminta</td>
                <td className="py-2">: <span className="font-bold text-red-600">{data.redeliveryDetails.requestedDeliveryDate}</span></td>
              </tr>
              <tr>
                <td className="font-semibold py-2 text-gray-700">Contact Person (PIC Lokasi)</td>
                <td className="py-2">: <span className="text-black font-medium">{data.redeliveryDetails.contactPerson} (Telp: {data.redeliveryDetails.contactNumber})</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4 text-justify bg-yellow-50 p-4 border-l-4 border-yellow-500 rounded text-gray-800">
          <strong className="text-yellow-800 block mb-1">Surat Pernyataan Pertanggungjawaban (Letter of Indemnity):</strong>
          Dengan diterbitkannya permohonan ini, kami selaku pihak pemohon menyatakan akan bertanggung jawab penuh atas segala biaya tambahan yang timbul akibat perubahan ini, termasuk namun tidak terbatas pada biaya <em>demurrage</em>, <em>detention</em>, biaya penumpukan (<em>storage</em>), biaya pengiriman ulang (<em>redelivery fee</em>), serta biaya administrasi lainnya yang dibebankan oleh pihak pelayaran maupun pihak ketiga terkait. Kami juga membebaskan pihak <strong>{data.recipientCompany.name}</strong> dari segala tuntutan hukum atau klaim yang mungkin timbul dari pihak manapun akibat perubahan instruksi pengiriman ini.
        </p>
        
        <p className="mb-6 text-justify">
          Sebagai kelengkapan administrasi, kami lampirkan dokumen pendukung berupa fotokopi B/L, Delivery Order (DO), dan Surat Kuasa. Demikian surat permohonan pengiriman ulang ini kami sampaikan. Atas perhatian, bantuan, dan kerjasamanya yang baik, kami ucapkan terima kasih.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end mt-12 pt-8 border-t border-gray-200">
        <div className="text-center w-72">
          <p className="mb-2 text-black">Hormat Kami,</p>
          <p className="font-bold text-black">{data.senderCompany.name}</p>
          
          {/* Stamp/Signature Space */}
          <div className="h-32 w-full relative my-4">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
               {/* Dummy Stamp */}
               <div className="w-24 h-24 rounded-full border-[3px] border-blue-900 flex flex-col items-center justify-center -rotate-[15deg]">
                 <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest">{data.senderCompany.name.substring(0, 15)}...</span>
                 <span className="text-xs font-black text-blue-900 mt-1">APPROVED</span>
               </div>
            </div>
            {/* Dummy Signature Line */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-800">
               {/* Decorative signature stroke */}
               <svg width="150" height="60" viewBox="0 0 150 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 40 C 30 10, 60 50, 80 30 S 110 60, 140 20" stroke="currentColor" strokeWidth="2.5" fill="transparent" strokeLinecap="round" />
                  <path d="M30 45 L 120 45" stroke="currentColor" strokeWidth="1" fill="transparent" strokeDasharray="4 4" opacity="0.5"/>
               </svg>
            </div>
          </div>
          
          <p className="font-bold underline uppercase text-black">{data.signatory.name}</p>
          <p className="text-sm font-medium text-gray-600 mt-1">{data.signatory.title}</p>
        </div>
      </div>
    </div>
  );
};

export default RedeliveryTemplate;
