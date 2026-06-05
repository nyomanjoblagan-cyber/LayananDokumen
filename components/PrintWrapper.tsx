'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Printer, CheckCircle, Loader2 } from 'lucide-react';

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

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-print-modal', handleOpen);
    
    return () => {
      window.removeEventListener('open-print-modal', handleOpen);
    };
  }, []);

  const executePrint = (isPremiumPrint: boolean) => {
    const printRoot = document.getElementById('print-only-root');
    if (!printRoot) {
      alert('Error: Area cetak tidak ditemukan.');
      return;
    }
    
    const htmlContent = printRoot.innerHTML;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '-9999px';
    iframe.style.bottom = '-9999px';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('');

    const watermarkCss = isPremiumPrint ? '' : `
      .print-watermark::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'%3E%3Ctext x='50%25' y='50%25' transform='rotate(-45 200 200)' fill='rgba(0,0,0,0.08)' font-family='sans-serif' font-size='24' font-weight='bold' letter-spacing='4' text-anchor='middle'%3ELAYANANDOKUMEN.COM%3C/text%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: 2147483647;
          pointer-events: none;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
      }
    `;

    iframe.contentWindow?.document.open();
    iframe.contentWindow?.document.write(`
      <html>
        <head>
          <title>${documentName}</title>
          ${styles}
          <style>
            @media print {
              @page { size: A4; margin: 0; }
              body { margin: 0; padding: 0; background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              .page-break { page-break-after: always !important; }
              ${watermarkCss}
            }
          </style>
        </head>
        <body class="bg-white">
          <div class="${isPremiumPrint ? '' : 'print-watermark'} relative">
            ${htmlContent}
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    iframe.contentWindow?.document.close();

    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 10000);
    
    setIsOpen(false);
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
            <p className="text-xs text-emerald-100 text-center mb-4">Bebas watermark, hasil cetak profesional dan bersih</p>
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

        {/* Script Snap Midtrans */}
        <Script 
          src="https://app.midtrans.com/snap/snap.js" 
          data-client-key={clientKey} 
          strategy="lazyOnload" 
        />
      </div>
    </div>
  );
}
