'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Edit3, Eye, Trash2, Plus, Users, User, ShieldAlert, 
    Scale, FileText, CheckCircle 
} from 'lucide-react';
import PrintWrapper from '@/components/PrintWrapper';

export default function AhliWarisTemplate() {
    const [activeTab, setActiveTab] = useState<'editor'|'preview'>('editor');
    const [data, setData] = useState({
        judulPernyataan: "SURAT PERNYATAAN DAN KESEPAKATAN AHLI WARIS",
        hukumWaris: "Hukum Perdata (Burgerlijk Wetboek)",
        tanggunganHutang: "Tanggung Renteng",
        penyelesaianSengketa: "Pengadilan Negeri",
        
        pewaris: {
            nama: "H. SUDARYONO BIN SOEKARNO",
            nik: "3273102901700003",
            tempatLahir: "Bandung",
            tanggalLahir: "1970-01-29",
            pekerjaan: "Pensiunan PNS",
            alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat",
            tanggalMeninggal: "2025-10-10",
            tempatMeninggal: "RSUP Hasan Sadikin Bandung",
            buktiKematian: "Surat Keterangan Kematian No: 472.12/05/Kel/2025"
        },

        ahliWaris: [
            { nama: "SITI AMINAH", nik: "3273102901750005", hubungan: "Istri", tempatLahir: "Bandung", tanggalLahir: "1975-01-29", pekerjaan: "Mengurus Rumah Tangga", alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung" },
            { nama: "BUDI SANTOSO", nik: "3273102901950001", hubungan: "Anak Kandung", tempatLahir: "Bandung", tanggalLahir: "1995-03-12", pekerjaan: "Karyawan Swasta", alamat: "Jl. Merdeka No. 45, RT 001/RW 002, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung" }
        ],

        kotaPembuatan: "Bandung",
        tanggalPembuatan: "2025-11-01",
        
        saksi: [
            { nama: "AGUS SUPRIYADI", nik: "3273102901850002", pekerjaan: "Ketua RT 001", alamat: "Jl. Merdeka No. 47, Kel. Citarum" },
            { nama: "RINA MARLINA", nik: "3273102901800003", pekerjaan: "Ketua RW 002", alamat: "Jl. Merdeka No. 50, Kel. Citarum" }
        ],
        
        pejabat: {
            nama: "Drs. H. BAMBANG HERMAWAN, M.Si",
            jabatan: "Lurah Citarum",
            nip: "19650212 199003 1 004",
            nomorReg: "472.11/123-Kel.Ctr/2025",
            tanggalReg: "2025-11-05"
        },
        camat: {
            nama: "Ir. Hj. RINI SETIAWATI, M.M.",
            jabatan: "Camat Bandung Wetan",
            nip: "19700515 199503 2 001",
            nomorReg: "472.11/567-Kec.BW/2025",
            tanggalReg: "2025-11-06"
        }
    });

    const handleDataChange = (field: string, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handlePewarisChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, pewaris: { ...prev.pewaris, [field]: value } }));
    };

    const handlePejabatChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, pejabat: { ...prev.pejabat, [field]: value } }));
    };

    const handleCamatChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, camat: { ...prev.camat, [field]: value } }));
    };

    const addAhliWaris = () => {
        setData(prev => ({
            ...prev,
            ahliWaris: [...prev.ahliWaris, { nama: "", nik: "", hubungan: "", tempatLahir: "", tanggalLahir: "", pekerjaan: "", alamat: "" }]
        }));
    };

    const updateAhliWaris = (index: number, field: string, value: string) => {
        const newAhliWaris = [...data.ahliWaris];
        newAhliWaris[index] = { ...newAhliWaris[index], [field]: value };
        setData(prev => ({ ...prev, ahliWaris: newAhliWaris }));
    };

    const removeAhliWaris = (index: number) => {
        const newAhliWaris = data.ahliWaris.filter((_, i) => i !== index);
        setData(prev => ({ ...prev, ahliWaris: newAhliWaris }));
    };

    const addSaksi = () => {
        setData(prev => ({
            ...prev,
            saksi: [...prev.saksi, { nama: "", nik: "", pekerjaan: "", alamat: "" }]
        }));
    };

    const updateSaksi = (index: number, field: string, value: string) => {
        const newSaksi = [...data.saksi];
        newSaksi[index] = { ...newSaksi[index], [field]: value };
        setData(prev => ({ ...prev, saksi: newSaksi }));
    };

    const removeSaksi = (index: number) => {
        const newSaksi = data.saksi.filter((_, i) => i !== index);
        setData(prev => ({ ...prev, saksi: newSaksi }));
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            const months = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        } catch {
            return dateStr;
        }
    };

    const ContentInside = () => (
        <div className="text-black font-serif leading-relaxed text-[11pt] md:text-[12pt] text-justify max-w-none">
            <h1 className="text-center font-bold text-[14pt] md:text-[16pt] uppercase underline mb-2 tracking-wide">
                {data.judulPernyataan}
            </h1>
            
            <p className="mb-4">
                Yang bertanda tangan di bawah ini, kami para Ahli Waris, menerangkan dan menyatakan dengan sesungguhnya di bawah sumpah, bahwa:
            </p>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 1</p>
                <p className="font-bold text-center mb-2">KETERANGAN PEWARIS DAN FAKTA KEMATIAN</p>
                <div className="mb-2">
                    Telah meninggal dunia seorang laki-laki / perempuan (Pewaris), dengan identitas semasa hidupnya sebagai berikut:
                </div>
                <div className="ml-4 md:ml-8 mb-2">
                    <div className="flex"><div className="w-32 md:w-40 shrink-0">Nama Lengkap</div><div>: <span className="font-bold uppercase">{data.pewaris.nama}</span></div></div>
                    <div className="flex"><div className="w-32 md:w-40 shrink-0">NIK</div><div>: {data.pewaris.nik}</div></div>
                    <div className="flex"><div className="w-32 md:w-40 shrink-0">Tempat, Tgl Lahir</div><div>: {data.pewaris.tempatLahir}, {formatDate(data.pewaris.tanggalLahir)}</div></div>
                    <div className="flex"><div className="w-32 md:w-40 shrink-0">Pekerjaan</div><div>: {data.pewaris.pekerjaan}</div></div>
                    <div className="flex"><div className="w-32 md:w-40 shrink-0">Alamat Terakhir</div><div>: {data.pewaris.alamat}</div></div>
                </div>
                <div className="mb-2">
                    Bahwa Pewaris tersebut di atas telah meninggal dunia pada tanggal <span className="font-bold">{formatDate(data.pewaris.tanggalMeninggal)}</span> di <span className="font-bold">{data.pewaris.tempatMeninggal}</span>, sebagaimana dibuktikan dengan Surat Keterangan Kematian / Akta Kematian Nomor: <span className="font-bold">{data.pewaris.buktiKematian}</span>.
                </div>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 2</p>
                <p className="font-bold text-center mb-2">KETERANGAN DAN KEDUDUKAN PARA AHLI WARIS</p>
                <div className="mb-2">
                    Bahwa Pewaris meninggalkan ahli waris yang sah secara hukum, yang secara bersama-sama sepakat dan menyatakan diri sebagai Ahli Waris yang berhak atas segala harta peninggalan Pewaris, yaitu:
                </div>
                <div className="ml-4 md:ml-8 mb-2 space-y-3">
                    {data.ahliWaris.map((aw, idx) => (
                        <div key={idx}>
                            <div className="font-bold mb-1">{idx + 1}. {aw.nama}</div>
                            <div className="ml-4 md:ml-6">
                                <div className="flex"><div className="w-28 md:w-36 shrink-0">NIK</div><div>: {aw.nik}</div></div>
                                <div className="flex"><div className="w-28 md:w-36 shrink-0">Hubungan</div><div>: <span className="font-bold">{aw.hubungan}</span></div></div>
                                <div className="flex"><div className="w-28 md:w-36 shrink-0">Tempat, Tgl Lahir</div><div>: {aw.tempatLahir}, {formatDate(aw.tanggalLahir)}</div></div>
                                <div className="flex"><div className="w-28 md:w-36 shrink-0">Pekerjaan</div><div>: {aw.pekerjaan}</div></div>
                                <div className="flex"><div className="w-28 md:w-36 shrink-0">Alamat</div><div>: {aw.alamat}</div></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-2">
                    Bahwa selain nama-nama yang disebutkan pada Pasal ini, <span className="font-bold">TIDAK ADA LAGI</span> ahli waris lain yang sah dan berhak atas harta peninggalan Pewaris.
                </div>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 3</p>
                <p className="font-bold text-center mb-2">PILIHAN HUKUM DAN OBJEK WARIS</p>
                <ol className="list-decimal ml-4 md:ml-8 mb-2 pl-4 space-y-1">
                    <li className="pl-2">
                        Para Ahli Waris sepakat bahwa pembagian dan penyelesaian segala urusan terkait harta peninggalan Pewaris tunduk pada ketentuan <span className="font-bold">{data.hukumWaris}</span>.
                    </li>
                    <li className="pl-2">
                        Segala bentuk harta peninggalan, baik berupa benda bergerak (kendaraan bermotor, logam mulia, deposito, tabungan bank, dan lain-lain) maupun benda tidak bergerak (tanah, bangunan, dan/atau hak-hak lain), yang terdaftar atas nama Pewaris jatuh menjadi hak mutlak dari Para Ahli Waris secara bersama-sama.
                    </li>
                </ol>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 4</p>
                <p className="font-bold text-center mb-2">HAK, KEWAJIBAN, DAN PENGURUSAN HARTA PENINGGALAN</p>
                <ol className="list-decimal ml-4 md:ml-8 mb-2 pl-4 space-y-1">
                    <li className="pl-2">
                        Para Ahli Waris berhak penuh untuk melakukan segala tindakan hukum atas harta peninggalan Pewaris, termasuk namun tidak terbatas pada: mencairkan dana di bank, melakukan proses balik nama (mutasi) sertifikat tanah/kendaraan, mengalihkan hak, menjual, menghibahkan, dan/atau membebankan hak tanggungan atas harta peninggalan tersebut.
                    </li>
                    <li className="pl-2">
                        Setiap tindakan hukum atas harta peninggalan wajib mendapat persetujuan dari seluruh Ahli Waris tanpa terkecuali, kecuali telah diberikan Surat Kuasa Khusus dari Ahli Waris yang tidak dapat hadir secara fisik.
                    </li>
                </ol>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 5</p>
                <p className="font-bold text-center mb-2">TANGGUNG JAWAB ATAS UTANG, PAJAK, DAN BEBAN PEWARIS</p>
                <ol className="list-decimal ml-4 md:ml-8 mb-2 pl-4 space-y-1">
                    <li className="pl-2">
                        Para Ahli Waris menyatakan bersedia dan bertanggung jawab penuh secara <span className="font-bold">{data.tanggunganHutang}</span> atas segala sisa utang piutang, kewajiban perpajakan, maupun beban finansial lainnya yang ditinggalkan oleh Pewaris (jika ada).
                    </li>
                    <li className="pl-2">
                        Penyelesaian utang, pajak, dan biaya pengurusan jenazah serta biaya lainnya wajib didahulukan dari harta peninggalan sebelum dilakukan pembagian waris kepada masing-masing Ahli Waris.
                    </li>
                </ol>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 6</p>
                <p className="font-bold text-center mb-2">PENYELESAIAN SENGKETA</p>
                <div className="mb-2">
                    Apabila di kemudian hari timbul perbedaan pendapat atau sengketa di antara Para Ahli Waris berkaitan dengan penetapan status waris maupun pembagian harta peninggalan, maka Para Ahli Waris sepakat untuk menyelesaikannya secara kekeluargaan melalui musyawarah mufakat. Apabila musyawarah tidak mencapai mufakat, maka penyelesaian sengketa akan diserahkan dan diputus melalui yurisdiksi <span className="font-bold">{data.penyelesaianSengketa}</span>.
                </div>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 7</p>
                <p className="font-bold text-center mb-2">PERNYATAAN KEBENARAN DATA DAN SANKSI HUKUM</p>
                <ol className="list-decimal ml-4 md:ml-8 mb-2 pl-4 space-y-1">
                    <li className="pl-2">
                        Para Ahli Waris menjamin dan menyatakan dengan sungguh-sungguh bahwa seluruh keterangan yang tercantum dalam Surat Pernyataan dan Kesepakatan ini adalah <span className="font-bold">BENAR</span>, sesuai dengan fakta yang sebenarnya, dan tidak ada yang disembunyikan.
                    </li>
                    <li className="pl-2">
                        Apabila di kemudian hari terbukti terdapat pihak/ahli waris lain yang sah yang sengaja dihilangkan haknya, atau terdapat pemalsuan data/identitas, maka Para Ahli Waris bersedia dituntut secara hukum baik secara Pidana berdasarkan <span className="font-bold">Pasal 263 dan Pasal 266 Kitab Undang-Undang Hukum Pidana (KUHP)</span> tentang Pemalsuan Surat dan Memberikan Keterangan Palsu, maupun secara Perdata berdasarkan <span className="font-bold">Pasal 1365 Kitab Undang-Undang Hukum Perdata (BW)</span> atas perbuatan melawan hukum yang merugikan pihak lain.
                    </li>
                    <li className="pl-2">
                        Pihak instansi pemerintah (Kelurahan, Kecamatan), perbankan, notaris/PPAT, maupun pihak ketiga lainnya yang menggunakan Surat Pernyataan ini dibebaskan dari segala tuntutan dan/atau gugatan hukum apapun akibat ketidakbenaran pernyataan ini.
                    </li>
                </ol>
            </div>

            <div className="mb-4">
                <p className="font-bold text-center mb-1">PASAL 8</p>
                <p className="font-bold text-center mb-2">PENUTUP DAN PENGESAHAN</p>
                <div className="mb-2">
                    Surat Pernyataan dan Kesepakatan Ahli Waris ini dibuat, ditandatangani, dan dicap jempol (sidik jari) oleh Para Ahli Waris di <span className="font-bold uppercase">{data.kotaPembuatan}</span> pada tanggal <span className="font-bold">{formatDate(data.tanggalPembuatan)}</span>, dalam keadaan sehat jasmani dan rohani, sadar sepenuhnya, serta tanpa ada paksaan maupun tekanan dari pihak manapun, disaksikan oleh dua orang saksi yang memenuhi syarat hukum.
                </div>
            </div>

            <div className="mt-8 mb-4 break-inside-avoid">
                <p className="text-center font-bold mb-6">PARA AHLI WARIS,</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-6">
                    {data.ahliWaris.map((aw, idx) => (
                        <div key={idx} className="flex flex-col items-center w-[200px]">
                            {idx === 0 && (
                                <div className="text-[9px] border border-slate-400 p-1 mb-4">
                                    Materai<br/>Rp 10.000
                                </div>
                            )}
                            {idx !== 0 && (
                                <div className="h-[46px] mb-4"></div>
                            )}
                            <p className="font-bold underline text-center w-full whitespace-nowrap">{aw.nama}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 mb-8 break-inside-avoid">
                <p className="mb-6 font-bold text-center">SAKSI-SAKSI,</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
                    {data.saksi.map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center w-[200px]">
                            <div className="h-[46px] mb-4"></div>
                            <p className="font-bold underline text-center w-full whitespace-nowrap">{s.nama}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 break-inside-avoid">
                <p className="text-center mb-6">Mengetahui / Mengesahkan,</p>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 text-center">
                        <p className="mb-1">Telah diregister dengan Nomor:</p>
                        <p className="mb-1 font-bold">{data.pejabat.nomorReg}</p>
                        <p className="mb-16">Tanggal: {formatDate(data.pejabat.tanggalReg)}</p>
                        <p className="font-bold underline">{data.pejabat.nama}</p>
                        <p className="font-bold">{data.pejabat.jabatan}</p>
                        <p>NIP. {data.pejabat.nip}</p>
                    </div>
                    <div className="flex-1 text-center">
                        <p className="mb-1">Telah diregister dengan Nomor:</p>
                        <p className="mb-1 font-bold">{data.camat.nomorReg}</p>
                        <p className="mb-16">Tanggal: {formatDate(data.camat.tanggalReg)}</p>
                        <p className="font-bold underline">{data.camat.nama}</p>
                        <p className="font-bold">{data.camat.jabatan}</p>
                        <p>NIP. {data.camat.nip}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: A4 portrait; margin: 15mm; }
                    body { background: white; margin: 0; padding: 0; width: 100%; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    #print-only-root { display: block !important; position: relative; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
                    .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
                }
            `}} />

            {/* HEADER NAVBAR */}
            <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans shrink-0">
                <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
                            <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
                        </Link>
                        <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
                        <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-widest">
                            <FileText size={16} className="text-blue-400" /> <span>Ahli Waris Builder</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
                            <Printer size={16} /> <span className="hidden sm:inline">Cetak Dokumen</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col md:flex-row overflow-hidden print:hidden print:h-auto print:overflow-visible h-[calc(100vh-64px)]">
                <div className={`w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 flex flex-col z-10 transition-transform duration-300 ${activeTab === 'editor' ? 'translate-x-0' : '-translate-x-full absolute md:relative md:translate-x-0'} print:hidden h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-y-auto`}>
                    <div className="p-4 md:p-6 bg-slate-900 text-white sticky top-0 z-20 shadow-md">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <FileText className="text-emerald-400" /> Ahli Waris & Kesepakatan
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">Lengkapi form secara detail dan akurat.</p>
                    </div>

                    <div className="p-4 md:p-6 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-200">
                                <Scale size={16} className="text-indigo-500" /> Pengaturan Hukum
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Tunduk pada Hukum Waris</label>
                                    <select 
                                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={data.hukumWaris}
                                        onChange={e => handleDataChange('hukumWaris', e.target.value)}
                                    >
                                        <option value="Hukum Perdata (Burgerlijk Wetboek)">Hukum Perdata (Burgerlijk Wetboek)</option>
                                        <option value="Hukum Islam (Kompilasi Hukum Islam)">Hukum Islam (KHI)</option>
                                        <option value="Hukum Adat setempat">Hukum Adat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Tanggung Jawab Utang Pewaris</label>
                                    <select 
                                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={data.tanggunganHutang}
                                        onChange={e => handleDataChange('tanggunganHutang', e.target.value)}
                                    >
                                        <option value="Tanggung Renteng">Tanggung Renteng</option>
                                        <option value="Proporsional sesuai porsi waris">Proporsional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Yurisdiksi Penyelesaian Sengketa</label>
                                    <select 
                                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={data.penyelesaianSengketa}
                                        onChange={e => handleDataChange('penyelesaianSengketa', e.target.value)}
                                    >
                                        <option value="Pengadilan Negeri">Pengadilan Negeri (Umum/Perdata)</option>
                                        <option value="Pengadilan Agama">Pengadilan Agama (Islam)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-200">
                                <User size={16} className="text-amber-500" /> Identitas Pewaris
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Nama Pewaris</label>
                                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-bold" value={data.pewaris.nama} onChange={e => handlePewarisChange('nama', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">NIK</label>
                                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.nik} onChange={e => handlePewarisChange('nik', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">Pekerjaan</label>
                                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.pekerjaan} onChange={e => handlePewarisChange('pekerjaan', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">Tempat Lahir</label>
                                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.tempatLahir} onChange={e => handlePewarisChange('tempatLahir', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">Tanggal Lahir</label>
                                        <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.tanggalLahir} onChange={e => handlePewarisChange('tanggalLahir', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Alamat (Sesuai KTP Terakhir)</label>
                                    <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[60px]" value={data.pewaris.alamat} onChange={e => handlePewarisChange('alamat', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">Tanggal Meninggal</label>
                                        <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-red-600 font-bold" value={data.pewaris.tanggalMeninggal} onChange={e => handlePewarisChange('tanggalMeninggal', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 mb-1 block">Tempat Meninggal</label>
                                        <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.tempatMeninggal} onChange={e => handlePewarisChange('tempatMeninggal', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Bukti Kematian (No. Surat)</label>
                                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pewaris.buktiKematian} onChange={e => handlePewarisChange('buktiKematian', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
                                    <Users size={16} className="text-emerald-500" /> Data Ahli Waris
                                </h3>
                                <button onClick={addAhliWaris} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 font-bold px-2 py-1 rounded hover:bg-emerald-100 transition-colors">
                                    <Plus size={14} /> Tambah
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.ahliWaris.map((aw, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 relative">
                                        <button onClick={() => removeAhliWaris(idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1 bg-white rounded-md shadow-sm border border-red-100"><Trash2 size={14}/></button>
                                        <h4 className="text-xs font-bold text-slate-700 bg-white inline-block px-2 py-1 rounded border border-slate-200">Ahli Waris #{idx + 1}</h4>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                            <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-bold" value={aw.nama} onChange={e => updateAhliWaris(idx, 'nama', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">NIK</label>
                                                <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={aw.nik} onChange={e => updateAhliWaris(idx, 'nik', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan Keluarga</label>
                                                <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-emerald-700" placeholder="Istri / Anak / dll" value={aw.hubungan} onChange={e => updateAhliWaris(idx, 'hubungan', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                                                <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={aw.tempatLahir} onChange={e => updateAhliWaris(idx, 'tempatLahir', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                                                <input type="date" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={aw.tanggalLahir} onChange={e => updateAhliWaris(idx, 'tanggalLahir', e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                                            <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={aw.pekerjaan} onChange={e => updateAhliWaris(idx, 'pekerjaan', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                                            <textarea className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none min-h-[50px]" value={aw.alamat} onChange={e => updateAhliWaris(idx, 'alamat', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-200">
                                <CheckCircle size={16} className="text-blue-500" /> Penutup & Legalisasi
                            </h3>
                            <div className="bg-red-50 p-3 rounded-lg border border-red-200 flex gap-3 items-start mb-4">
                                <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5"/>
                                <div>
                                    <p className="text-xs font-bold text-red-800">The Teeth Protocol Aktif</p>
                                    <p className="text-[10px] text-red-700 mt-0.5 leading-relaxed">Pasal 7 memuat ancaman Pidana (Pasal 263/266 KUHP) dan Perdata (1365 BW) atas pemalsuan data identitas dan ahli waris fiktif.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Kota Pembuatan</label>
                                    <input className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-bold" value={data.kotaPembuatan} onChange={e => handleDataChange('kotaPembuatan', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 mb-1 block">Tanggal</label>
                                    <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.tanggalPembuatan} onChange={e => handleDataChange('tanggalPembuatan', e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-slate-600 block">Saksi-Saksi (Min. 2)</label>
                                    <button onClick={addSaksi} className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded hover:bg-slate-200">+ Saksi</button>
                                </div>
                                {data.saksi.map((s, idx) => (
                                    <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 relative">
                                        <button onClick={() => removeSaksi(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama Lengkap" value={s.nama} onChange={e => updateSaksi(idx, 'nama', e.target.value)} />
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="NIK" value={s.nik} onChange={e => updateSaksi(idx, 'nik', e.target.value)} />
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Pekerjaan / Jabatan (Misal: Ketua RT)" value={s.pekerjaan} onChange={e => updateSaksi(idx, 'pekerjaan', e.target.value)} />
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Alamat" value={s.alamat} onChange={e => updateSaksi(idx, 'alamat', e.target.value)} />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-600 block bg-blue-50 p-2 rounded text-center border border-blue-100 text-blue-800">Pejabat Kelurahan / Desa</label>
                                <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-bold" placeholder="Nama Lurah/Kades" value={data.pejabat.nama} onChange={e => handlePejabatChange('nama', e.target.value)} />
                                <div className="grid grid-cols-2 gap-2">
                                    <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jabatan" value={data.pejabat.jabatan} onChange={e => handlePejabatChange('jabatan', e.target.value)} />
                                    <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="NIP" value={data.pejabat.nip} onChange={e => handlePejabatChange('nip', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-500 uppercase">No Register Kel</label>
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pejabat.nomorReg} onChange={e => handlePejabatChange('nomorReg', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-500 uppercase">Tgl Register Kel</label>
                                        <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.pejabat.tanggalReg} onChange={e => handlePejabatChange('tanggalReg', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-600 block bg-amber-50 p-2 rounded text-center border border-amber-100 text-amber-800">Pejabat Kecamatan</label>
                                <input className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-bold" placeholder="Nama Camat" value={data.camat.nama} onChange={e => handleCamatChange('nama', e.target.value)} />
                                <div className="grid grid-cols-2 gap-2">
                                    <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jabatan" value={data.camat.jabatan} onChange={e => handleCamatChange('jabatan', e.target.value)} />
                                    <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="NIP" value={data.camat.nip} onChange={e => handleCamatChange('nip', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-500 uppercase">No Register Kec</label>
                                        <input className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.camat.nomorReg} onChange={e => handleCamatChange('nomorReg', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-500 uppercase">Tgl Register Kec</label>
                                        <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.camat.tanggalReg} onChange={e => handleCamatChange('tanggalReg', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-20 md:hidden"></div>
                    </div>
                </div>

                <div className={`flex-1 bg-slate-200 relative overflow-hidden flex flex-col items-center print:hidden print:overflow-visible print:bg-white print:static ${activeTab === 'preview' ? 'block' : 'hidden md:flex'}`}>
                    <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:hidden print:overflow-visible print:bg-white print:p-0">
                        <div className="origin-top transition-transform duration-300 transform scale-[0.6] md:scale-100 mb-[-100mm] md:mb-10 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                            <div className="bg-white shadow-2xl mx-auto overflow-hidden relative print:shadow-none" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                                <ContentInside />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div id="print-options" className="no-print">
                <PrintWrapper documentName="Akta_Pernyataan_Ahli_Waris" price={45000} />
            </div>

            <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
                <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
                <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
            </div>

            <div id="print-only-root" className="hidden print:block print:h-auto print:static">
                <div className="bg-white print:p-0">
                    <ContentInside />
                </div>
            </div>
        </div>
    );
}
