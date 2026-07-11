'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, BookOpen, Edit3, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

interface IzinKeramaianData {
  letterCity: string;
  letterDate: string;
  recipientTitle: string;
  recipientLocation: string;
  
  applicantName: string;
  applicantAge: string;
  applicantJob: string;
  applicantAddress: string;
  applicantPhone: string;
  
  eventName: string;
  eventDay: string;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventLocation: string;
  entertainmentType: string;
  crowdEstimate: string;
  
  villageHead: string;
}

const INITIAL_DATA: IzinKeramaianData = {
  letterCity: 'Sleman',
  letterDate: '2026-07-15',
  recipientTitle: 'Kepala Kepolisian Sektor (Kapolsek) Ngaglik',
  recipientLocation: 'Sleman',
  
  applicantName: 'BUDI SANTOSO',
  applicantAge: '35 Tahun',
  applicantJob: 'Wiraswasta',
  applicantAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  applicantPhone: '081234567890',
  
  eventName: 'Pentas Seni Budaya dan Dangdut',
  eventDay: 'Sabtu',
  eventDate: '2026-07-25',
  eventTimeStart: '19:00',
  eventTimeEnd: '23:30',
  eventLocation: 'Lapangan Desa Sardonoharjo',
  entertainmentType: 'Panggung Prajurit & Orkes Dangdut',
  crowdEstimate: '500 Orang',
  
  villageHead: 'H. Sudirman, S.E.'
};

export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <IzinKeramaianBuilder />
    </Suspense>
  );
}

function IzinKeramaianBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinKeramaianData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pemohon' | 'acara' | 'pengaturan'>('pemohon');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof IzinKeramaianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas className="print:w-full print:min-w-0">
              {/* KOP / TANGGAL */}
              <div className="flex justify-between items-start mb-8">
                  <div>
                    <p>Nomor<span className="inline-block w-8 text-center">:</span>-</p>
                    <p>Lampiran<span className="inline-block w-4 text-center">:</span>-</p>
                    <p>Perihal<span className="inline-block w-6 text-center">:</span><strong>Permohonan Izin Keramaian</strong></p>
                  </div>
                  <div className="text-right">
                      {data.letterCity}, {formatDateSafe(data.letterDate)}
                  </div>
              </div>
              
              {/* TUJUAN SURAT */}
              <div className="mb-8 text-justify">
                  <p>Kepada Yth,</p>
                  <p className="font-bold">{data.recipientTitle}</p>
                  <p>Di -</p>
                  <p className="indent-8">{data.recipientLocation}</p>
              </div>

              {/* SALAM PEMBUKA & IDENTITAS */}
              <div className="mb-4 text-justify">
                  <p className="mb-4">Dengan hormat,</p>
                  <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              </div>

              <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                  <div className="ml-8 flex-1">
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.applicantName}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Umur</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.applicantAge}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.applicantJob}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Alamat</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.applicantAddress}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">No. Telepon / HP</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.applicantPhone}</div>
                      </div>
                  </div>
              </div>

              {/* ISI SURAT / ACARA */}
              <div className="mb-4 text-justify">
                  <p className="mb-4">Dengan ini mengajukan permohonan izin keramaian untuk menyelenggarakan acara <strong>{data.eventName}</strong>, yang akan dilaksanakan pada:</p>
              </div>

              <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                  <div className="ml-8 flex-1">
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Hari / Tanggal</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold">{data.eventDay}, {formatDateSafe(data.eventDate)}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Waktu Pelaksanaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>Pukul {data.eventTimeStart} s/d {data.eventTimeEnd} WIB</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Tempat / Lokasi</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.eventLocation}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Jenis Hiburan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.entertainmentType}</div>
                      </div>
                      <div className="flex flex-row mb-1">
                          <div className="w-56 shrink-0">Estimasi Jumlah Massa</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.crowdEstimate}</div>
                      </div>
                  </div>
              </div>

              <div className="mb-8 text-justify">
                  <p className="mb-2">Sebagai penanggung jawab acara, kami bersedia mematuhi segala peraturan dan ketentuan hukum yang berlaku, serta senantiasa berkoordinasi dengan pihak berwajib guna menjaga ketertiban, kebersihan, dan keamanan selama acara berlangsung.</p>
                  <p>Demikian surat permohonan izin keramaian ini kami sampaikan. Atas perhatian dan kebijakan Bapak/Ibu, kami ucapkan terima kasih.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                  <div>
                      <p className="mb-20">Mengetahui,<br/>Kepala Desa / Lurah</p>
                      <p className="font-bold underline uppercase">{data.villageHead}</p>
                  </div>
                  <div>
                      <p className="mb-20">Hormat Kami,<br/>Pemohon / Penanggung Jawab</p>
                      <p className="font-bold underline uppercase">{data.applicantName}</p>
                  </div>
              </div>

          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Izin Keramaian</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 border-r ${activeTab === 'pemohon' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
              <button onClick={() => setActiveTab('acara')} className={`flex-1 py-3 border-r ${activeTab === 'acara' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Acara</button>
              <button onClick={() => setActiveTab('pengaturan')} className={`flex-1 py-3 ${activeTab === 'pengaturan' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pengaturan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'pemohon' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Pemohon</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Contoh: BUDI SANTOSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Umur</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantAge} onChange={e => handleDataChange('applicantAge', e.target.value)} placeholder="Contoh: 35 Tahun" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantJob} onChange={e => handleDataChange('applicantJob', e.target.value)} placeholder="Contoh: Wiraswasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.applicantAddress} onChange={e => handleDataChange('applicantAddress', e.target.value)} placeholder="Alamat lengkap pemohon" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No. Telepon / HP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.applicantPhone} onChange={e => handleDataChange('applicantPhone', e.target.value)} placeholder="Contoh: 081234567890" />
                </div>
              </div>
              )}

              {activeTab === 'acara' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Detail Acara</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Acara</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Contoh: Pentas Seni Budaya dan Dangdut" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari Pelaksanaan</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.eventDay} onChange={e => handleDataChange('eventDay', e.target.value)}>
                        <option value="Senin">Senin</option><option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option><option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option><option value="Sabtu">Sabtu</option><option value="Minggu">Minggu</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Mulai</label>
                    <input type="time" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventTimeStart} onChange={e => handleDataChange('eventTimeStart', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Selesai</label>
                    <input type="time" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.eventTimeEnd} onChange={e => handleDataChange('eventTimeEnd', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat / Lokasi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi fisik acara" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Hiburan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.entertainmentType} onChange={e => handleDataChange('entertainmentType', e.target.value)} placeholder="Contoh: Orkes Dangdut, Kuda Lumping, dll." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Estimasi Jumlah Massa</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.crowdEstimate} onChange={e => handleDataChange('crowdEstimate', e.target.value)} placeholder="Contoh: 500 Orang" />
                </div>
              </div>
              )}

              {activeTab === 'pengaturan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4">Pengaturan Surat</h3>
                
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase">Penerima Surat (Tujuan)</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Ditujukan Kepada</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.recipientTitle} onChange={e => handleDataChange('recipientTitle', e.target.value)} placeholder="Contoh: Kepala Kepolisian Sektor (Kapolsek) Ngaglik" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Di (Lokasi Penerima)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.recipientLocation} onChange={e => handleDataChange('recipientLocation', e.target.value)} placeholder="Contoh: Sleman" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.letterCity} onChange={e => handleDataChange('letterCity', e.target.value)} placeholder="Contoh: Sleman" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.letterDate} onChange={e => handleDataChange('letterDate', e.target.value)} />
                  </div>
                </div>
                
                <div className="pt-2 border-t mt-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Mengetahui Kepala Desa/Lurah</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kepala Desa / Lurah" />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN */}
        <div className={`flex-1 h-full bg-slate-200/50 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}