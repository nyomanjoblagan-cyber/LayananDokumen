'use client';

import DonationModal from './DonationModal';

interface DocumentServicesProps {
  showDonation: boolean;
  setShowDonation: (val: boolean) => void;
}

export default function DocumentServices({ showDonation, setShowDonation }: DocumentServicesProps) {
  return (
    <div className="no-print w-full flex flex-col items-center mt-8 space-y-6">
      
      {/* AREA IKLAN BANNER (ADMAVEN / ADSENSE) MASA DEPAN */}
      {/* Saat ini dibiarkan sebagai placeholder elegan agar layout tidak bolong */}
      <div className="w-full max-w-[728px] h-[90px] bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Space Advertisement
        </span>
      </div>

      {/* POPUP SAWERIA TERSEMBUNYI (Akan muncul saat tombol cetak diklik) */}
      <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />
      
    </div>
  );
}
