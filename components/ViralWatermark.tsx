'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { createPortal } from 'react-dom';

interface ViralWatermarkProps {
  url?: string;
}

export default function ViralWatermark({ url = 'https://layanandokumen.com' }: ViralWatermarkProps) {
  // Hanya render di client side untuk menghindari hydration mismatch dan karena kita butuh document.body
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Render via portal agar bebas dari hambatan CSS parent (misalnya .no-print)
  return createPortal(
    <div className="viral-watermark hidden print:flex flex-col items-center justify-center gap-1">
      <div className="bg-white p-1 rounded-sm shadow-sm opacity-50">
        <QRCode value={url} size={64} style={{ width: '25mm', height: '25mm' }} />
      </div>
      <span className="text-[7px] font-bold text-slate-800 opacity-60">
        layanandokumen.com
      </span>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .viral-watermark {
            position: fixed !important;
            bottom: 8mm !important;
            right: 8mm !important;
            opacity: 0.5 !important;
            z-index: -1 !important;
            /* Tambahan agar tidak menabrak teks/tanda tangan jika terlalu penuh */
            pointer-events: none;
            display: flex !important;
          }
        }
      `}} />
    </div>,
    document.body
  );
}
