import React from 'react';

type KertasA4Props = {
  children: React.ReactNode;
  className?: string;
};

export default function KertasA4({ children, className = '' }: KertasA4Props) {
  return (
    <div 
      className={`
        /* UKURAN KERTAS DIPAKSA SEDIKIT KURANG DARI A4 AGAR PAS */
        w-[210mm] 
        h-[296mm] 
        
        /* STYLE TAMPILAN */
        bg-white 
        p-[20mm] 
        mx-auto 
        text-slate-900 
        font-serif 
        leading-relaxed
        
        /* PENTING: POTONG SEMUA YANG KELUAR BATAS */
        overflow-hidden 
        
        /* JARAK ANTAR KERTAS (HILANG SAAT PRINT) */
        mb-10 
        print:mb-0 
        print:mt-0
        
        /* BAYANGAN (HILANG SAAT PRINT) */
        shadow-2xl 
        print:shadow-none
        
        ${className}
      `}
    >
      {children}
    </div>
  );
}