'use client';
import React from 'react';
import PrintWrapper from '@/components/PrintWrapper';

interface Props {
  data?: any; // Allow passing data to populate the form if needed in the future
}

export default function SuratPermohonanKPR({ data }: Props) {
  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
      backgroundColor: '#fff',
      padding: '40px',
      maxWidth: '850px',
      margin: '0 auto',
      border: '1px solid #ccc',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      lineHeight: '1.5',
      fontSize: '12px',
      boxSizing: 'border-box'
    }}>
        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px double #000', paddingBottom: '10px', marginBottom: '20px' }}>
            <div>
                <h1 style={{ margin: 0, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>BANK NUSANTARA</h1>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', fontWeight: 'bold' }}>DIVISI KREDIT KONSUMER - LAYANAN KPR</p>
                <p style={{ margin: 0, fontSize: '10px' }}>Gedung Sentral Nusantara, Jl. Jend. Sudirman Kav. 1, Jakarta 12190</p>
            </div>
            <div style={{ textAlign: 'left', fontSize: '11px', border: '1px solid #000', padding: '8px', minWidth: '200px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr><td style={{ width: '80px' }}>No. Referensi</td><td>: ____________________</td></tr>
                        <tr><td>Tanggal</td><td>: ____________________</td></tr>
                        <tr><td>Cabang/Capem</td><td>: ____________________</td></tr>
                        <tr><td>Kode AO/Sales</td><td>: ____________________</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Document Title */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', textDecoration: 'underline', fontWeight: 'bold', letterSpacing: '1px' }}>FORMULIR APLIKASI KREDIT PEMILIKAN RUMAH (KPR)</h2>
            <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', fontSize: '11px', fontWeight: 'bold' }}>*Mohon diisi dengan HURUF CETAK dan memberikan tanda (✓) pada kotak yang sesuai.</p>
        </div>

        {/* Section 1: Fasilitas Kredit */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>I. FASILITAS KREDIT YANG DIMOHON</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '25%', padding: '4px 0', verticalAlign: 'top' }}>Jenis Fasilitas KPR</td>
                        <td style={{ width: '3%', padding: '4px 0', verticalAlign: 'top' }}>:</td>
                        <td style={{ width: '72%', padding: '4px 0', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                <label><input type="checkbox" /> Pembelian Rumah Baru (Primary)</label>
                                <label><input type="checkbox" /> Pembelian Rumah Bekas (Secondary)</label>
                                <label><input type="checkbox" /> Renovasi / Pembangunan</label>
                                <label><input type="checkbox" /> Take Over (Pengambilalihan)</label>
                                <label><input type="checkbox" /> Multiguna (Refinancing)</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Jumlah Kredit Dimohon</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>Rp. _____________________________________________ <em>(dalam angka)</em></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Terbilang</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>__________________________________________________________________________</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Jangka Waktu (Tenor)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>_________ Bulan ( _________ Tahun )</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Tujuan Penggunaan</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px dotted #000', height: '20px' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 2: Data Pemohon */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>II. DATA PRIBADI PEMOHON</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '25%', padding: '4px 0' }}>Nama Lengkap (Sesuai KTP)</td>
                        <td style={{ width: '3%', padding: '4px 0' }}>:</td>
                        <td style={{ width: '72%', padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nomor KTP/NIK</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ borderBottom: '1px solid #000', flex: 1, marginRight: '20px' }}></span>
                                <span>Masa Berlaku: <span style={{ borderBottom: '1px solid #000', width: '100px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nomor NPWP</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Tempat, Tanggal Lahir</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ borderBottom: '1px solid #000', width: '150px', marginRight: '10px' }}></span>
                                <span>, Tanggal: <span style={{ borderBottom: '1px solid #000', width: '150px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nama Gadis Ibu Kandung</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Pendidikan Terakhir</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label><input type="checkbox" /> SMA/Sederajat</label>
                                <label><input type="checkbox" /> D3 / Akademi</label>
                                <label><input type="checkbox" /> S1</label>
                                <label><input type="checkbox" /> S2 / S3</label>
                                <label><input type="checkbox" /> Lainnya: ______</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Status Perkawinan</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ display: 'flex', gap: '20px' }}>
                                <label><input type="checkbox" /> Belum Kawin</label>
                                <label><input type="checkbox" /> Kawin</label>
                                <label><input type="checkbox" /> Cerai Hidup / Mati</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Alamat Sesuai KTP</td>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                            <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>RT/RW: <span style={{ borderBottom: '1px solid #000', width: '60px', display: 'inline-block' }}></span></span>
                                <span>Kelurahan: <span style={{ borderBottom: '1px solid #000', width: '100px', display: 'inline-block' }}></span></span>
                                <span>Kecamatan: <span style={{ borderBottom: '1px solid #000', width: '100px', display: 'inline-block' }}></span></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                <span>Kota/Kab: <span style={{ borderBottom: '1px solid #000', width: '120px', display: 'inline-block' }}></span></span>
                                <span>Provinsi: <span style={{ borderBottom: '1px solid #000', width: '120px', display: 'inline-block' }}></span></span>
                                <span>Kode Pos: <span style={{ borderBottom: '1px solid #000', width: '60px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Alamat Domisili Saat Ini</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                            <label><input type="checkbox" /> Sesuai dengan alamat KTP</label>
                            <div style={{ borderBottom: '1px solid #000', height: '20px', marginTop: '5px' }}></div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Status Tempat Tinggal</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ display: 'flex', gap: '15px' }}>
                                <label><input type="checkbox" /> Milik Sendiri</label>
                                <label><input type="checkbox" /> Milik Keluarga</label>
                                <label><input type="checkbox" /> Sewa/Kontrak</label>
                                <label><input type="checkbox" /> Rumah Dinas</label>
                                <label><input type="checkbox" /> Lainnya: _______</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Lama Menetap di Domisili</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>_________ Tahun  _________ Bulan</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nomor Telepon Rumah</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nomor Handphone (Aktif)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Alamat Email (Aktif)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 3: Data Pekerjaan */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>III. DATA PEKERJAAN / USAHA PEMOHON</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '25%', padding: '4px 0' }}>Jenis Profesi</td>
                        <td style={{ width: '3%', padding: '4px 0' }}>:</td>
                        <td style={{ width: '72%', padding: '4px 0' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <label><input type="checkbox" /> Karyawan Swasta</label>
                                <label><input type="checkbox" /> PNS/TNI/POLRI</label>
                                <label><input type="checkbox" /> Pegawai BUMN/BUMD</label>
                                <label><input type="checkbox" /> Wiraswasta/Pengusaha</label>
                                <label><input type="checkbox" /> Profesional</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nama Perusahaan/Instansi</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Bidang Usaha</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Jabatan / Pangkat</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Lama Bekerja / Berusaha</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>_________ Tahun  _________ Bulan</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Alamat Kantor/Tempat Usaha</td>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Kota: <span style={{ borderBottom: '1px solid #000', width: '120px', display: 'inline-block' }}></span></span>
                                <span>Kode Pos: <span style={{ borderBottom: '1px solid #000', width: '80px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>No. Telepon Kantor (Wajib)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nama Atasan Langsung / HRD</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 4: Data Pasangan */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>IV. DATA PRIBADI PASANGAN (SUAMI/ISTRI)</h3>
            <p style={{ margin: '0 0 5px 0', fontStyle: 'italic', fontSize: '11px' }}>*Diisi jika status perkawinan adalah KAWIN</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '25%', padding: '4px 0' }}>Nama Lengkap (Sesuai KTP)</td>
                        <td style={{ width: '3%', padding: '4px 0' }}>:</td>
                        <td style={{ width: '72%', padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nomor KTP/NIK</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Tempat, Tanggal Lahir</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ borderBottom: '1px solid #000', width: '150px', marginRight: '10px' }}></span>
                                <span>, Tanggal: <span style={{ borderBottom: '1px solid #000', width: '150px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Pekerjaan / Instansi</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>No. Handphone</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 5: Data Agunan */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>V. DATA AGUNAN / PROPERTI YANG DIBIAYAI</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '25%', padding: '4px 0' }}>Jenis Properti</td>
                        <td style={{ width: '3%', padding: '4px 0' }}>:</td>
                        <td style={{ width: '72%', padding: '4px 0' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label><input type="checkbox" /> Rumah Tinggal</label>
                                <label><input type="checkbox" /> Ruko / Rukan</label>
                                <label><input type="checkbox" /> Apartemen / Rusun</label>
                                <label><input type="checkbox" /> Tanah Kosong</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>Alamat Properti / Agunan</td>
                        <td style={{ padding: '4px 0', verticalAlign: 'top' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                            <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Kota/Kab: <span style={{ borderBottom: '1px solid #000', width: '120px', display: 'inline-block' }}></span></span>
                                <span>Kode Pos: <span style={{ borderBottom: '1px solid #000', width: '80px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Luas Tanah / Luas Bangunan</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>Tanah: _______ m² &nbsp;&nbsp;|&nbsp;&nbsp; Bangunan: _______ m²</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Bukti Kepemilikan (Sertifikat)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>
                             <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '15px', marginRight: '20px' }}>
                                    <label><input type="checkbox" /> SHM</label>
                                    <label><input type="checkbox" /> SHGB</label>
                                    <label><input type="checkbox" /> SHMSRS (Strata Title)</label>
                                </div>
                                <span>No. Dok: <span style={{ borderBottom: '1px solid #000', width: '100px', display: 'inline-block' }}></span></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Atas Nama pada Sertifikat</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Nama Penjual / Developer</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0', borderBottom: '1px solid #000' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Harga Transaksi/Pembelian</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>Rp. _____________________________________________</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 0' }}>Uang Muka (Down Payment)</td>
                        <td style={{ padding: '4px 0' }}>:</td>
                        <td style={{ padding: '4px 0' }}>Rp. _____________________________________________ (Telah dibayar: <label><input type="checkbox"/> Ya</label> <label><input type="checkbox"/> Belum</label>)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 6: Data Keuangan */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>VI. DATA KEUANGAN / PENGHASILAN PER BULAN (IDR)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #000' }}>
                <thead>
                    <tr>
                        <th style={{ width: '45%', padding: '6px', border: '1px solid #000', backgroundColor: '#f0f0f0' }}>KOMPONEN PENGHASILAN</th>
                        <th style={{ width: '10%', padding: '6px', border: 'none', backgroundColor: '#fff' }}></th>
                        <th style={{ width: '45%', padding: '6px', border: '1px solid #000', backgroundColor: '#f0f0f0' }}>KOMPONEN PENGELUARAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>1. Gaji / Penghasilan Bersih Pemohon</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                        <td style={{ border: 'none' }}></td>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>1. Biaya Hidup (Rumah Tangga/Pendidikan dll)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>2. Gaji / Penghasilan Bersih Pasangan</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                        <td style={{ border: 'none' }}></td>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>2. Angsuran Pinjaman KPR/KPA (eksisting)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>3. Penghasilan Lain-lain (Bila ada & rutin)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                        <td style={{ border: 'none' }}></td>
                        <td style={{ padding: '6px', border: '1px solid #000' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>3. Angsuran Pinjaman Lain (KKB/KTA/Kartu Kredit)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>TOTAL PENGHASILAN (A)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                        <td style={{ border: 'none' }}></td>
                        <td style={{ padding: '6px', border: '1px solid #000', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>TOTAL PENGELUARAN (B)</span>
                                <span>Rp. ____________________</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} style={{ padding: '15px 10px', border: '1px solid #000', backgroundColor: '#f0f0f0', textAlign: 'right' }}>
                             <div style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '13px' }}>
                                <span style={{ marginRight: '30px' }}>SISA PENGHASILAN BERSIH (A - B) :</span>
                                <span>Rp. _____________________________</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 7: Fasilitas Bank Lain */}
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>VII. DATA FASILITAS PINJAMAN DI BANK / LEMBAGA KEUANGAN LAIN</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f0f0f0' }}>Nama Bank / Lembaga</th>
                        <th style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f0f0f0' }}>Jenis Pinjaman</th>
                        <th style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f0f0f0' }}>Plafon (Rp)</th>
                        <th style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f0f0f0' }}>Sisa Pinjaman (Rp)</th>
                        <th style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f0f0f0' }}>Angsuran/Bln (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Section 8: Pernyataan & Kuasa */}
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', backgroundColor: '#000', color: '#fff', padding: '4px 8px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>VIII. PERNYATAAN DAN KUASA PEMOHON</h3>
            <div style={{ fontSize: '11px', textAlign: 'justify', lineHeight: '1.5', border: '1px solid #000', padding: '15px', backgroundColor: '#fafafa' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Dengan menandatangani formulir ini, Saya/Kami menyatakan dan memberi kuasa yang tidak dapat dicabut kembali kepada Bank sebagai berikut:</p>
                <ol style={{ margin: '0 0 10px 0', paddingLeft: '25px' }}>
                    <li style={{ marginBottom: '8px' }}>Semua data, informasi, dan dokumen yang Saya/Kami sampaikan dalam aplikasi ini dan lampirannya adalah sah, benar, akurat, dan lengkap. Apabila di kemudian hari terbukti ada informasi/dokumen yang palsu, fiktif, atau tidak benar, maka Bank berhak membatalkan permohonan atau persetujuan kredit secara sepihak dan Saya/Kami bersedia dituntut sesuai dengan hukum pidana maupun perdata yang berlaku.</li>
                    <li style={{ marginBottom: '8px' }}>Memberikan kuasa penuh kepada Bank untuk melakukan pemeriksaan, verifikasi, dan penilaian terhadap kebenaran data Saya/Kami, meminta referensi dari pihak manapun (termasuk atasan, HRD, keluarga, atau relasi bisnis), serta melakukan pengecekan kolektibilitas melalui Sistem Layanan Informasi Keuangan (SLIK) Otoritas Jasa Keuangan (OJK) atau instansi lain yang berwenang.</li>
                    <li style={{ marginBottom: '8px' }}>Segala dokumen (fotokopi KTP, slip gaji, sertifikat, dll) yang telah diserahkan kepada Bank tidak dapat ditarik atau diminta kembali, dan menjadi hak arsip Bank sepenuhnya, terlepas dari apakah permohonan kredit ini disetujui atau ditolak oleh Bank.</li>
                    <li style={{ marginBottom: '8px' }}>Saya/Kami mengerti bahwa Bank memiliki kewenangan mutlak untuk menyetujui, menolak, atau menyesuaikan jumlah plafon, jangka waktu, dan suku bunga yang diajukan tanpa berkewajiban untuk memberikan alasan penolakan kepada Saya/Kami.</li>
                    <li style={{ marginBottom: '8px' }}>Apabila permohonan kredit ini disetujui, Saya/Kami bersedia tunduk dan mematuhi semua syarat, ketentuan, serta prosedur perkreditan yang berlaku di Bank. Saya/Kami menyetujui pembebanan biaya-biaya yang timbul meliputi biaya provisi, administrasi, asuransi jiwa & kebakaran, jasa notaris/PPAT, appraisal, pajak, dan biaya lainnya yang langsung dipotong dari rekening Saya/Kami pada saat pencairan kredit.</li>
                    <li style={{ marginBottom: '0' }}>Menjamin bahwa agunan yang diserahkan adalah benar milik sah pemberi agunan, tidak dalam sengketa, tidak tersangkut perkara pidana/perdata, dan tidak sedang dijaminkan kepada pihak lain.</li>
                </ol>
            </div>
        </div>

        {/* Signatures */}
        <div style={{ marginTop: '40px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                <tbody>
                    <tr>
                        <td colSpan={3} style={{ textAlign: 'right', paddingBottom: '30px', paddingRight: '20px' }}>
                            Dibuat di : _____________________, Tanggal : _____________________
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '33%', verticalAlign: 'top' }}>
                            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Pemohon,</p>
                            <div style={{ height: '80px', margin: '0 auto', width: '120px', border: '1px dotted #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px' }}>
                                Materai Rp 10.000,- <br/>& Tanda Tangan
                            </div>
                            <p style={{ margin: '10px 0 0 0', textDecoration: 'underline', fontWeight: 'bold' }}>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '10px' }}>Nama Jelas Lengkap</p>
                        </td>
                        <td style={{ width: '33%', verticalAlign: 'top' }}>
                            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Menyetujui, Pasangan (Suami/Istri),</p>
                            <div style={{ height: '80px' }}></div>
                            <p style={{ margin: '10px 0 0 0', textDecoration: 'underline', fontWeight: 'bold' }}>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '10px' }}>Nama Jelas Lengkap</p>
                        </td>
                        <td style={{ width: '33%', verticalAlign: 'top', borderLeft: '2px dashed #000', paddingLeft: '15px' }}>
                            <div style={{ border: '1px solid #000', padding: '10px', height: '100%' }}>
                                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', backgroundColor: '#000', color: '#fff', padding: '5px' }}>KOLOM KHUSUS BANK</p>
                                <p style={{ margin: '0 0 20px 0', fontSize: '11px', textAlign: 'left' }}>Diterima oleh (Nama / Tanda Tangan) :</p>
                                <div style={{ height: '40px' }}></div>
                                <p style={{ margin: '10px 0 0 0', borderBottom: '1px solid #000' }}></p>
                                <p style={{ margin: '2px 0 0 0', fontSize: '10px', textAlign: 'left' }}>Nama AO/Sales :</p>
                                <p style={{ margin: '2px 0 0 0', fontSize: '10px', textAlign: 'left' }}>Tanggal Terima :</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_kpr" price={15000} />
      </div>
    </div>
  );
}
