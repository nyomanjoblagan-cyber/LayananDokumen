'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Printer, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';

interface PrintWrapperProps {
  documentName: string;
  price: number;
}

// Extend Window interface for Midtrans snap
declare global {
  interface Window {
    snap: any;
  }
}

export default function PrintWrapper({ 
  documentName, 
  price 
}: PrintWrapperProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientKey, setClientKey] = useState(process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '');
  const [isOpen, setIsOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    // 1. Keamanan Dasar: Paksa mode 'print-free' aktif sejak awal (Mencegah bypass Ctrl+P)
    if (!isPremium) {
      document.body.classList.add('print-free');
      document.body.classList.remove('print-premium');
    }

    // 2. Keamanan Tambahan: Blokir klik kanan (Mempersulit Inspect Element)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 3. Keamanan Tambahan: Blokir F12, Ctrl+Shift+I, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') e.preventDefault();
      if (
        (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'u'].includes(e.key))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    const handleOpen = () => {
      // Cek apakah ada sesi premium aktif untuk dokumen ini (24 jam)
      try {
        const storageKey = 'layanandokumen_paid_' + documentName.replace(/\s+/g, '_');
        const expiredAt = localStorage.getItem(storageKey);
        if (expiredAt && parseInt(expiredAt) > Date.now()) {
          setIsPremium(true);
        }
      } catch (e) {}
      setIsOpen(true);
    };
    window.addEventListener('open-print-modal', handleOpen);
    
    return () => {
      window.removeEventListener('open-print-modal', handleOpen);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPremium, documentName]);

  const executePrint = (isPremiumPrint: boolean) => {
    // 1. Set mode (Premium/Free) ke body untuk trigger CSS watermark
    if (isPremiumPrint) {
      document.body.classList.remove('print-free');
      document.body.classList.add('print-premium');
    } else {
      document.body.classList.remove('print-premium');
      document.body.classList.add('print-free');
    }

    // 2. Tutup popup modal
    setIsOpen(false);
    
    // 3. Eksekusi print langsung di main window (Native Print)
    // Beri jeda 500ms agar React selesai render penutupan modal
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleCetakGratis = () => {
    setIsPremium(false);
    executePrint(false);
  };

  const handleCetakBerbayar = async () => {
    if (!clientKey) {
      alert('Error: Payment gateway belum siap.');
      return;
    }
    
    // Jika ternyata user sudah premium (dari cache/localStorage), langsung cetak
    if (isPremium) {
       executePrint(true);
       return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/get-snap-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName,
          price
        })
      });
      
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Gagal mengambil token');

      window.snap.pay(resData.token, {
        onSuccess: function (result: any) {
          console.log('Payment success:', result);
          
          // Simpan sesi premium ke localStorage selama 24 jam (Typo Protection)
          try {
            const storageKey = 'layanandokumen_paid_' + documentName.replace(/\s+/g, '_');
            const expireTime = Date.now() + (24 * 60 * 60 * 1000); // 24 jam dari sekarang
            localStorage.setItem(storageKey, expireTime.toString());
          } catch (e) {}
          
          alert('Pembayaran Berhasil!\n\nAnda dapat merevisi dan mencetak ulang dokumen ini sepuasnya secara gratis selama 24 jam ke depan.');

          setIsPremium(true);
          executePrint(true);
        },
        onPending: function (result: any) {
          console.log('Payment pending:', result);
          alert('Pembayaran tertunda. Silakan selesaikan pembayaran Anda.');
        },
        onError: function (result: any) {
          console.log('Payment error:', result);
          alert('Pembayaran gagal. Silakan coba lagi.');
        },
        onClose: function () {
          console.log('Payment popup closed');
        }
      });
    } catch (err: any) {
      console.error(err);
      alert('Terjadi kesalahan: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
           ✕
        </button>

        <div className="text-center mb-6 mt-2">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight mb-2">Opsi Cetak Dokumen</h3>
          <p className="text-slate-500 text-sm">Pilih opsi cetak yang sesuai dengan kebutuhan Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opsi 1: Gratis (Watermark) */}
          <button
            onClick={handleCetakGratis}
            className="group relative flex flex-col items-center p-6 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
          >
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Printer size={24} />
            </div>
            <h4 className="font-bold text-slate-800 mb-1 text-center">Cetak Gratis</h4>
            <p className="text-xs text-slate-500 text-center mb-4">Mencetak dokumen dengan tulisan watermark layanandokumen.com</p>
            <span className="mt-auto font-black text-slate-400">Rp 0</span>
          </button>

          {/* Opsi 2: Berbayar (Premium / Bebas Iklan & Watermark) */}
          <button
            onClick={handleCetakBerbayar}
            disabled={isLoading || isPremium}
            className="group relative flex flex-col items-center p-6 border-2 border-emerald-500 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all text-left overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 bg-white text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              {isPremium ? <CheckCircle size={24} /> : <Printer size={24} />}
            </div>
            <h4 className="font-bold text-white mb-1 text-center">Cetak Premium</h4>
            <p className="text-xs text-emerald-100 text-center mb-4">
              Bebas watermark, hasil cetak profesional.
              <br/><br/>
              <span className="bg-emerald-700/50 px-2 py-1 rounded text-[10px] font-bold border border-emerald-400/30 inline-block">
                GARANSI REVISI 24 JAM
              </span>
              <br/>
              <span className="text-[10px] opacity-80 mt-1 inline-block">Edit dan cetak ulang dokumen ini sepuasnya tanpa bayar lagi.</span>
              <br/>
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); setShowTerms(!showTerms); }} 
                className="text-[10px] text-emerald-300 underline hover:text-white mt-1.5 inline-block opacity-90 transition-colors"
              >
                {showTerms ? 'Tutup S&K Garansi' : 'Pelajari S&K Garansi'}
              </button>
            </p>
            <span className="mt-auto font-black text-white bg-emerald-600 px-4 py-1 rounded-full text-sm flex items-center gap-2">
               {isLoading ? <><Loader2 size={16} className="animate-spin" /> Memproses...</> : isPremium ? 'Sudah Dibayar' : `Rp ${price.toLocaleString('id-ID')}`}
            </span>
            
            {isPremium && (
              <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                AKTIF
              </div>
            )}
          </button>
        </div>

        {showTerms && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-sm animate-in slide-in-from-top-2 duration-200">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500"/> Syarat & Ketentuan Bebas Revisi 24 Jam
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Akses berlaku <strong>24 jam penuh</strong> terhitung sejak pembayaran sukses.</li>
              <li>Wajib menggunakan <strong>perangkat dan browser yang sama</strong>.</li>
              <li>Akses akan <strong>hangus</strong> jika Anda melakukan Clear Cache / Hapus Riwayat.</li>
              <li>Selama sesi aktif, Anda bebas menekan "Cetak Premium" berkali-kali secara gratis.</li>
            </ul>
          </div>
        )}

        {/* Script Snap Midtrans */}
        <Script 
          src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || (clientKey && !clientKey.startsWith('SB-'))
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js'}
          data-client-key={clientKey} 
          strategy="lazyOnload" 
        />
      </div>

      {/* GLOBAL PRINT STYLES UNTUK NATIVE WINDOW PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { 
            size: A4; 
            margin: 2.54cm !important; 
          }
          
          /* Override Tailwind constraints */
          html, body, main, #print-only-root {
            height: auto !important;
            min-height: 100% !important;
            overflow: visible !important;
            max-height: none !important;
          }
          #print-only-root {
            display: block !important;
          }
          
          /* Typography paksa MS Word */
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            font-family: 'Times New Roman', Times, serif !important;
            font-size: 12pt !important;
            line-height: 1.5 !important;
            color: black !important;
          }
          
          /* Sembunyikan elemen UI */
          .no-print { display: none !important; }
          .page-break { page-break-after: always !important; break-after: page !important; }
          
          /* Watermark CSS murni (Hanya untuk versi Gratis) */
          body.print-free::after {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'%3E%3Ctext x='50%25' y='50%25' transform='rotate(-45 200 200)' fill='rgba(0,0,0,0.08)' font-family='sans-serif' font-size='24' font-weight='bold' letter-spacing='4' text-anchor='middle'%3ELAYANANDOKUMEN.COM%3C/text%3E%3C/svg%3E");
            background-repeat: repeat;
            z-index: 2147483647;
            pointer-events: none;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      ` }} />
    </div>
  );
}
