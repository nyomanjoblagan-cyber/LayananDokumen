import React from 'react';

export default function KlaimAsuransi() {
  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', maxWidth: '800px', margin: '0 auto', padding: '40px', backgroundColor: '#fff', color: '#000', lineHeight: '1.6' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <p>[Kota], [Tanggal] [Bulan] [Tahun]</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '100px', verticalAlign: 'top' }}>Nomor</td>
              <td style={{ width: '10px', verticalAlign: 'top' }}>:</td>
              <td>[Nomor Surat]</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Lampiran</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td>[Jumlah Lampiran, misal: 5 (lima) berkas]</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Perihal</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td><strong>Tuntutan Klaim Asuransi [Jenis Asuransi, misal: Kendaraan Bermotor / Kesehatan / Jiwa]</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <p>Kepada Yth.,</p>
        <p><strong>[Nama Perusahaan Asuransi]</strong></p>
        <p>Up. Departemen Klaim</p>
        <p>[Alamat Perusahaan Asuransi]</p>
        <p>[Kota, Kode Pos]</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Dengan hormat,</p>
        <p style={{ textIndent: '30px', textAlign: 'justify' }}>
          Melalui surat ini, saya yang bertanda tangan di bawah ini selaku Pemegang Polis / Tertanggung dari [Nama Perusahaan Asuransi], menyampaikan permohonan klaim asuransi dengan rincian data sebagai berikut:
        </p>
      </div>

      <div style={{ marginBottom: '20px', paddingLeft: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', textDecoration: 'underline' }}>I. DATA TERTANGGUNG</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '200px', padding: '4px 0' }}>Nama Lengkap</td>
              <td style={{ width: '10px' }}>:</td>
              <td>[Nama Lengkap Sesuai KTP/Polis]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Nomor Polis Asuransi</td>
              <td>:</td>
              <td>[Nomor Polis]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Nomor Identitas (KTP/Paspor)</td>
              <td>:</td>
              <td>[Nomor KTP/Paspor]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Alamat Korespondensi</td>
              <td>:</td>
              <td>[Alamat Lengkap]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Nomor Telepon / HP</td>
              <td>:</td>
              <td>[Nomor Telepon]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Alamat Email</td>
              <td>:</td>
              <td>[Alamat Email]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '20px', paddingLeft: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', textDecoration: 'underline' }}>II. RINCIAN KEJADIAN KLAIM</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '200px', padding: '4px 0', verticalAlign: 'top' }}>Tanggal & Waktu Kejadian</td>
              <td style={{ width: '10px', verticalAlign: 'top' }}>:</td>
              <td>[Tanggal, Bulan, Tahun], Pukul [Waktu]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Lokasi Kejadian</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td>[Lokasi Detail Kejadian]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Penyebab Kerugian/Kejadian</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td>[Contoh: Kecelakaan Lalu Lintas / Sakit Rawat Inap / Kebakaran]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Estimasi Nilai Kerugian</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td>Rp [Nominal Kerugian] ([Terbilang])</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Kronologis Kejadian</td>
              <td style={{ verticalAlign: 'top' }}>:</td>
              <td style={{ textAlign: 'justify' }}>
                [Deskripsikan kronologis kejadian secara singkat, jelas, dan sesuai dengan fakta yang sebenarnya. Jelaskan bagaimana awal mula kejadian, tindakan yang diambil saat kejadian, dan akibat dari kejadian tersebut.]
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '20px', paddingLeft: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', textDecoration: 'underline' }}>III. DOKUMEN PENDUKUNG</h4>
        <p style={{ margin: '0 0 5px 0' }}>Sebagai kelengkapan administrasi dan bahan pertimbangan klaim, bersama ini saya lampirkan dokumen-dokumen pendukung yang dipersyaratkan:</p>
        <ol style={{ marginTop: '0', paddingLeft: '20px' }}>
          <li style={{ padding: '2px 0' }}>Fotokopi Polis Asuransi yang masih berlaku;</li>
          <li style={{ padding: '2px 0' }}>Fotokopi Kartu Identitas (KTP) Tertanggung;</li>
          <li style={{ padding: '2px 0' }}>Formulir Klaim Asuransi yang telah diisi lengkap dan ditandatangani;</li>
          <li style={{ padding: '2px 0' }}>[Dokumen Pendukung 1, misal: Surat Keterangan Dokter / Kepolisian];</li>
          <li style={{ padding: '2px 0' }}>[Dokumen Pendukung 2, misal: Kwitansi Asli Perawatan / Bukti Perbaikan];</li>
          <li style={{ padding: '2px 0' }}>[Dokumen Pendukung 3, misal: Foto-foto bukti kejadian/kerusakan].</li>
        </ol>
      </div>

      <div style={{ marginBottom: '20px', paddingLeft: '30px' }}>
        <h4 style={{ margin: '0 0 10px 0', textDecoration: 'underline' }}>IV. INFORMASI PEMBAYARAN KLAIM</h4>
        <p style={{ margin: '0 0 5px 0' }}>Apabila klaim ini disetujui, mohon agar pembayaran manfaat klaim dapat ditransfer ke rekening berikut:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '200px', padding: '4px 0' }}>Nama Bank</td>
              <td style={{ width: '10px' }}>:</td>
              <td>[Nama Bank]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Cabang / KCP</td>
              <td>:</td>
              <td>[Cabang Bank]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Nomor Rekening</td>
              <td>:</td>
              <td>[Nomor Rekening]</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Nama Pemilik Rekening</td>
              <td>:</td>
              <td>[Nama Sesuai Buku Tabungan]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <p style={{ textIndent: '30px', textAlign: 'justify' }}>
          Demikian surat tuntutan klaim asuransi ini saya buat dengan sebenar-benarnya dan tanpa adanya unsur paksaan maupun manipulasi data. Saya bersedia memberikan keterangan lebih lanjut atau dokumen tambahan apabila diperlukan oleh pihak [Nama Perusahaan Asuransi].
        </p>
        <p style={{ textIndent: '30px', textAlign: 'justify' }}>
          Atas perhatian dan kerja sama yang baik dari Bapak/Ibu, saya ucapkan terima kasih.
        </p>
      </div>

      <div style={{ width: '300px', textAlign: 'center', float: 'right', marginTop: '20px' }}>
        <p style={{ marginBottom: '70px' }}>Hormat saya,<br/>Pemegang Polis / Tertanggung,</p>
        <p style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '0' }}>[Nama Lengkap Tertanggung]</p>
      </div>
      
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}
