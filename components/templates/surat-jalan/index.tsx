import React from 'react';

// Types for the Surat Jalan B2B Logistics component
export interface SuratJalanProps {
  companyName?: string;
  companyAddress?: string;
  companyLogo?: string;
  companyContact?: string;
  documentNumber?: string;
  date?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  sealNumber?: string; // Nomor Segel (often used in B2B logistics)
  senderName?: string;
  senderAddress?: string;
  senderContact?: string;
  receiverName?: string;
  receiverAddress?: string;
  receiverContact?: string;
  items?: Array<{
    id: string | number;
    code: string;
    description: string;
    quantity: number;
    unit: string;
    weight: string;
    remarks: string;
  }>;
  notes?: string;
}

const defaultProps: SuratJalanProps = {
  companyName: "PT. LOGISTIK NUSANTARA B2B",
  companyAddress: "Jl. Raya Trans Jawa No. 123, Kawasan Industri Terpadu, Jakarta 13930",
  companyContact: "Telp: (021) 555-0198 | Email: operasional@logistiknusantara.co.id",
  documentNumber: "SJ-LN-202607-00142",
  date: "13 Juli 2026",
  vehicleNumber: "B 9876 TEU",
  driverName: "Ahmad Suradi",
  driverPhone: "0812-3456-7890",
  sealNumber: "SGL-889021A",
  senderName: "PT. MANUFAKTUR GEMILANG",
  senderAddress: "Kawasan Industri MM2100, Jl. Bali Blok J No. 5, Cikarang Barat, Bekasi",
  senderContact: "Bpk. Budi (0855-1234-5678)",
  receiverName: "PT. DISTRIBUSI MAKMUR SEJAHTERA",
  receiverAddress: "Pergudangan Margomulyo Permai Blok C-15, Surabaya, Jawa Timur",
  receiverContact: "Ibu Siska (0811-9876-5432)",
  items: [
    {
      id: 1,
      code: "PRD-2026-A1",
      description: "Sparepart Mesin Industri Tipe A-100 (Pallet kayu)",
      quantity: 12,
      unit: "Pallet",
      weight: "1.200 Kg",
      remarks: "Fragile, Handle with care"
    },
    {
      id: 2,
      code: "PRD-2026-B2",
      description: "Komponen Elektronik Sensor V2",
      quantity: 5,
      unit: "Box",
      weight: "250 Kg",
      remarks: "Keep Dry"
    },
    {
      id: 3,
      code: "PRD-2026-C3",
      description: "Buku Manual & Dokumentasi Teknis",
      quantity: 1,
      unit: "Dokumen",
      weight: "5 Kg",
      remarks: "Lengkap"
    }
  ],
  notes: "1. Barang telah diperiksa dan diterima dalam keadaan baik dan lengkap.\n2. Segala resiko selama perjalanan menjadi tanggung jawab pihak ekspedisi jika menggunakan armada ekspedisi.\n3. Surat jalan ini merupakan bukti sah serah terima barang."
};

const SuratJalanLogistik = (props: SuratJalanProps) => {
  const data = { ...defaultProps, ...props };

  return (
    <div className="surat-jalan-container" style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .sj-wrapper {
            font-family: 'Inter', sans-serif;
            color: #1a1a1a;
            background-color: #ffffff;
            width: 100%;
            max-width: 210mm; /* A4 width */
            margin: 0 auto;
            padding: 20mm;
            box-sizing: border-box;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.5;
          }

          @media print {
            .sj-wrapper {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
              border-radius: 0;
            }
            .surat-jalan-container {
              padding: 0 !important;
              background-color: #ffffff !important;
            }
            body {
              background: #fff;
            }
          }

          .sj-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }

          .sj-company-info h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #2c3e50;
            letter-spacing: -0.5px;
          }

          .sj-company-info p {
            margin: 4px 0 0 0;
            color: #5a6c7d;
            font-size: 11px;
            max-width: 350px;
          }

          .sj-doc-title {
            text-align: right;
          }

          .sj-doc-title h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: #34495e;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .sj-doc-title .sj-no {
            font-size: 14px;
            font-weight: 600;
            color: #e74c3c;
            margin-top: 5px;
            display: block;
          }

          .sj-meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
          }

          .sj-card {
            border: 1px solid #e0e6ed;
            border-radius: 6px;
            overflow: hidden;
          }

          .sj-card-header {
            background-color: #f8fafc;
            padding: 8px 12px;
            font-weight: 600;
            border-bottom: 1px solid #e0e6ed;
            color: #34495e;
            font-size: 12px;
            text-transform: uppercase;
          }

          .sj-card-body {
            padding: 12px;
          }

          .sj-info-row {
            display: flex;
            margin-bottom: 6px;
          }
          
          .sj-info-row:last-child {
            margin-bottom: 0;
          }

          .sj-info-label {
            width: 100px;
            color: #7f8c8d;
            font-weight: 500;
          }

          .sj-info-value {
            flex: 1;
            font-weight: 600;
            color: #2c3e50;
          }

          .sj-participants {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
          }

          .sj-address-box strong {
            display: block;
            font-size: 14px;
            margin-bottom: 4px;
            color: #2c3e50;
          }

          .sj-address-box p {
            margin: 0 0 6px 0;
            color: #55606e;
          }

          .sj-address-box .contact {
            display: inline-block;
            background: #f1f5f9;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
          }

          .sj-table-container {
            margin-bottom: 25px;
          }

          .sj-table {
            width: 100%;
            border-collapse: collapse;
          }

          .sj-table th {
            background-color: #2c3e50;
            color: #ffffff;
            font-weight: 600;
            text-align: left;
            padding: 10px;
            font-size: 11px;
            text-transform: uppercase;
          }

          .sj-table td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
            color: #334155;
            vertical-align: top;
          }

          .sj-table tr:last-child td {
            border-bottom: 2px solid #2c3e50;
          }

          .sj-table th:nth-child(1), .sj-table td:nth-child(1) { width: 5%; text-align: center; }
          .sj-table th:nth-child(4), .sj-table td:nth-child(4) { width: 8%; text-align: center; font-weight: 600; }
          .sj-table th:nth-child(5), .sj-table td:nth-child(5) { width: 10%; text-align: center; }

          .sj-notes {
            margin-bottom: 40px;
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 12px 16px;
            border-radius: 0 4px 4px 0;
          }

          .sj-notes h4 {
            margin: 0 0 8px 0;
            font-size: 12px;
            color: #b45309;
            text-transform: uppercase;
          }

          .sj-notes p {
            margin: 0;
            white-space: pre-line;
            color: #78350f;
            font-size: 11px;
          }

          .sj-signatures {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            text-align: center;
          }

          .sj-sig-box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .sj-sig-title {
            font-weight: 600;
            color: #475569;
            margin-bottom: 70px;
            font-size: 12px;
          }

          .sj-sig-line {
            width: 80%;
            border-bottom: 1px solid #1e293b;
            margin-bottom: 5px;
          }

          .sj-sig-name {
            font-weight: 700;
            color: #1e293b;
            font-size: 12px;
          }
            
          .sj-sig-date {
            font-size: 10px;
            color: #64748b;
          }
        `}
      </style>

      <div className="sj-wrapper">
        {/* Header Section */}
        <div className="sj-header">
          <div className="sj-company-info">
            <h1>{data.companyName}</h1>
            <p>{data.companyAddress}</p>
            <p>{data.companyContact}</p>
          </div>
          <div className="sj-doc-title">
            <h2>Surat Jalan</h2>
            <span className="sj-no">NO: {data.documentNumber}</span>
          </div>
        </div>

        {/* Meta Info Section */}
        <div className="sj-meta-grid">
          <div className="sj-card">
            <div className="sj-card-header">Informasi Pengiriman</div>
            <div className="sj-card-body">
              <div className="sj-info-row">
                <span className="sj-info-label">Tanggal</span>
                <span className="sj-info-value">: {data.date}</span>
              </div>
              <div className="sj-info-row">
                <span className="sj-info-label">No. Kendaraan</span>
                <span className="sj-info-value">: {data.vehicleNumber}</span>
              </div>
              <div className="sj-info-row">
                <span className="sj-info-label">Pengemudi</span>
                <span className="sj-info-value">: {data.driverName} ({data.driverPhone})</span>
              </div>
              <div className="sj-info-row">
                <span className="sj-info-label">No. Segel</span>
                <span className="sj-info-value">: {data.sealNumber || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sender & Receiver Section */}
        <div className="sj-participants">
          <div className="sj-card">
            <div className="sj-card-header">Lokasi Muat (Pengirim)</div>
            <div className="sj-card-body sj-address-box">
              <strong>{data.senderName}</strong>
              <p>{data.senderAddress}</p>
              <span className="contact">UP: {data.senderContact}</span>
            </div>
          </div>
          <div className="sj-card">
            <div className="sj-card-header">Lokasi Bongkar (Penerima)</div>
            <div className="sj-card-body sj-address-box">
              <strong>{data.receiverName}</strong>
              <p>{data.receiverAddress}</p>
              <span className="contact">UP: {data.receiverContact}</span>
            </div>
          </div>
        </div>

        {/* Items Table Section */}
        <div className="sj-table-container">
          <table className="sj-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode / Part No</th>
                <th>Deskripsi Barang</th>
                <th>Qty</th>
                <th>Satuan</th>
                <th>Berat / Dimensi</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data.items && data.items.length > 0 ? (
                data.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td><strong>{item.code}</strong></td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.weight}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    Tidak ada data barang
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Notes Section */}
        {data.notes && (
          <div className="sj-notes">
            <h4>Catatan & Ketentuan</h4>
            <p>{data.notes}</p>
          </div>
        )}

        {/* Signatures Section */}
        <div className="sj-signatures">
          <div className="sj-sig-box">
            <div className="sj-sig-title">Diserahkan Oleh,<br/>(Pihak Pengirim)</div>
            <div className="sj-sig-line"></div>
            <div className="sj-sig-name">{data.senderName}</div>
            <div className="sj-sig-date">Tgl: _________________</div>
          </div>
          <div className="sj-sig-box">
            <div className="sj-sig-title">Dibawa Oleh,<br/>(Pengemudi / Ekspedisi)</div>
            <div className="sj-sig-line"></div>
            <div className="sj-sig-name">{data.driverName}</div>
            <div className="sj-sig-date">Tgl: _________________</div>
          </div>
          <div className="sj-sig-box">
            <div className="sj-sig-title">Diterima Oleh,<br/>(Pihak Penerima)</div>
            <div className="sj-sig-line"></div>
            <div className="sj-sig-name">{data.receiverName}</div>
            <div className="sj-sig-date">Tgl: _________________</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f1f5f9',
    padding: '40px 20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center'
  }
};

export default SuratJalanLogistik;
