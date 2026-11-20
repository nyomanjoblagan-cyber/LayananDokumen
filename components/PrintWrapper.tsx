'use client';

import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { Printer, CheckCircle, Loader2, ShieldCheck, Lightbulb, AlertTriangle, RefreshCcw, X } from 'lucide-react';
import ViralWatermark from './ViralWatermark';

interface PrintWrapperProps {
  documentName: string;
  price: number;
}

interface NoticeModalState {
  isOpen: boolean;
  type: 'retry' | 'error' | 'pending' | 'success';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
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
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
  const [isOpen, setIsOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);
  const [noticeModal, setNoticeModal] = useState<NoticeModalState | null>(null);

  // Dapatkan identifier dokumen yang stabil (berbasis slug URL jika ada, fallback ke documentName)
  const getDocKey = useCallback(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/tools\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return documentName.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '_');
  }, [documentName]);

  const getViralUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/tools\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://layanandokumen.com/tools/${match[1]}`;
      }
    }
    return 'https://layanandokumen.com';
  }, []);

  useEffect(() => {
    // 1. Keamanan Dasar: Paksa mode 'print-free' aktif jika belum premium (Cegah bypass Ctrl+P)
    if (!isPremium) {
      document.body.classList.add('print-free');
      document.body.classList.remove('print-premium');
    }

    // 2. Keamanan Tambahan: Blokir klik kanan
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
        const docKey = getDocKey();
        const primaryAuthKey = 'layanandokumen_auth_' + docKey;
        const legacyKey = 'layanandokumen_paid_' + docKey;
        
        const rawAuth = localStorage.getItem(primaryAuthKey);
        if (rawAuth) {
          const authData = JSON.parse(rawAuth);
          if (authData.expiresAt && Number(authData.expiresAt) > Date.now() && authData.token && authData.order_id) {
            setIsPremium(true);
          }
        } else {
          // Backward compatibility check
          const legacyExpiredAt = localStorage.getItem(legacyKey);
          if (legacyExpiredAt && parseInt(legacyExpiredAt, 10) > Date.now()) {
            setIsPremium(true);
          }
        }
        
        const primaryPendingKey = 'layanandokumen_pending_order_' + docKey;
        const legacyPendingKey = 'layanandokumen_pending_order_' + documentName.replace(/\s+/g, '_');
        const savedPendingId = localStorage.getItem(primaryPendingKey) || localStorage.getItem(legacyPendingKey);
        if (savedPendingId) {
          setPendingOrderId(savedPendingId);
        }
      } catch {
        // Abaikan parsing error
      }
      setIsOpen(true);
    };
    window.addEventListener('open-print-modal', handleOpen);
    
    return () => {
      window.removeEventListener('open-print-modal', handleOpen);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPremium, documentName, getDocKey]);

  const executePrint = (isPremiumPrint: boolean) => {
    // 1. Set mode (Premium/Free) ke body untuk trigger CSS watermark
    if (isPremiumPrint) {
      document.body.classList.remove('print-free');
      document.body.classList.add('print-premium');
    } else {
      document.body.classList.remove('print-premium');
      document.body.classList.add('print-free');
    }

    // 2. Eksekusi print secara sinkron (langsung)
    window.print();
    
    // 3. Tutup popup modal setelah print dialog muncul/ditutup
    setIsOpen(false);
  };

  const handleCetakGratis = () => {
    setIsPremium(false);
    executePrint(false);
  };

  const handleCetakBerbayar = async () => {
    if (!clientKey) {
      setNoticeModal({
        isOpen: true,
        type: 'error',
        title: 'Gerbang Pembayaran Sedang Disiapkan',
        message: 'Sistem pembayaran otomatis sedang dalam pemeliharaan berkala. Anda tetap dapat menggunakan opsi Cetak Gratis ber-watermark sekarang juga.',
        actionLabel: '🖨️ Cetak Gratis Ber-Watermark',
        onAction: () => {
          setNoticeModal(null);
          handleCetakGratis();
        },
        secondaryLabel: 'Tutup',
        onSecondary: () => setNoticeModal(null)
      });
      return;
    }
    
    // Jika ternyata user sudah premium, langsung cetak
    if (isPremium) {
       executePrint(true);
       return;
    }

    setIsLoading(true);
    try {
      const docKey = getDocKey();
      const res = await fetch('/api/get-snap-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName,
          docKey,
          price
        })
      });
      
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || resData.error || 'Gerbang pembayaran sedang sibuk.');

      // Simpan pending order id sebelum popup Snap terbuka
      try {
        localStorage.setItem('layanandokumen_pending_order_' + docKey, resData.order_id);
        setPendingOrderId(resData.order_id);
      } catch {}

      window.snap.pay(resData.token, {
        onSuccess: async function (result: any) {
          console.log('Payment success:', result);
          const orderIdToVerify = result?.order_id || resData.order_id;
          
          try {
            // Verifikasi resmi status transaksi dari Midtrans API
            const checkRes = await fetch(`/api/check-payment?order_id=${orderIdToVerify}`);
            const checkData = await checkRes.json();
            
            if (checkData.status === 'success' && checkData.token) {
              const sessionData = {
                order_id: checkData.order_id,
                token: checkData.token,
                expiresAt: checkData.expiresAt
              };
              localStorage.setItem('layanandokumen_auth_' + docKey, JSON.stringify(sessionData));
              localStorage.removeItem('layanandokumen_pending_order_' + docKey);
              setPendingOrderId(null);
              setIsPremium(true);
              setNoticeModal({
                isOpen: true,
                type: 'success',
                title: 'Pembayaran Berhasil! 🎉',
                message: 'Akses Cetak Bebas Watermark Anda telah aktif selama 24 jam ke depan. Anda dapat merevisi dan mencetak ulang dokumen ini sepuasnya secara gratis.',
                actionLabel: '🖨️ Cetak Dokumen Sekarang',
                onAction: () => {
                  setNoticeModal(null);
                  executePrint(true);
                }
              });
              return;
            }
          } catch (e) {
            console.error('Verify token failed:', e);
          }

          // Fallback lokal
          const expireTime = Date.now() + (24 * 60 * 60 * 1000);
          localStorage.setItem('layanandokumen_paid_' + docKey, expireTime.toString());
          setIsPremium(true);
          executePrint(true);
        },
        onPending: function (result: any) {
          console.log('Payment pending:', result);
          setNoticeModal({
            isOpen: true,
            type: 'pending',
            title: 'Menunggu Penyelesaian Pembayaran',
            message: 'Jika Anda telah menyelesaikan transfer bank atau scan QRIS, silakan tekan tombol di bawah untuk memverifikasi dan membuka cetak bebas watermark.',
            actionLabel: '🔍 Verifikasi Status Pembayaran',
            onAction: () => {
              setNoticeModal(null);
              handleRestorePayment();
            },
            secondaryLabel: 'Tutup',
            onSecondary: () => setNoticeModal(null)
          });
        },
        onError: function (result: any) {
          console.log('Payment error:', result);
          setNoticeModal({
            isOpen: true,
            type: 'error',
            title: 'Pembayaran Belum Berhasil',
            message: 'Transaksi belum terselesaikan atau dibatalkan. Anda dapat mencoba kembali dengan metode pembayaran lain seperti QRIS, GoPay, ShopeePay, atau Virtual Account.',
            actionLabel: '🔄 Coba Bayar Lagi',
            onAction: () => {
              setNoticeModal(null);
              handleCetakBerbayar();
            },
            secondaryLabel: 'Tutup',
            onSecondary: () => setNoticeModal(null)
          });
        },
        onClose: function () {
          console.log('Payment popup closed');
        }
      });
    } catch (err: any) {
      console.error(err);
      setNoticeModal({
        isOpen: true,
        type: 'retry',
        title: 'Gerbang Pembayaran Sedang Antre',
        message: 'Koneksi ke sistem transaksi sedang mengalami antrean sesaat. Anda dapat mencoba menekan tombol di bawah sekali lagi, atau mencetak versi gratis ber-watermark terlebih dahulu.',
        actionLabel: '🔄 Coba Bayar Lagi',
        onAction: () => {
          setNoticeModal(null);
          handleCetakBerbayar();
        },
        secondaryLabel: '🖨️ Cetak Versi Gratis Dulu',
        onSecondary: () => {
          setNoticeModal(null);
          handleCetakGratis();
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePayment = async () => {
    if (!pendingOrderId) return;
    setIsRecovering(true);
    try {
      const res = await fetch(`/api/check-payment?order_id=${pendingOrderId}`);
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        const docKey = getDocKey();
        const sessionData = {
          order_id: data.order_id,
          token: data.token,
          expiresAt: data.expiresAt
        };
        localStorage.setItem('layanandokumen_auth_' + docKey, JSON.stringify(sessionData));
        localStorage.removeItem('layanandokumen_pending_order_' + docKey);
        setPendingOrderId(null);
        setIsPremium(true);
        setNoticeModal({
          isOpen: true,
          type: 'success',
          title: 'Pemulihan Berhasil! 🎉',
          message: 'Akses Cetak Bebas Watermark Anda telah aktif kembali. Silakan langsung cetak dokumen Anda.',
          actionLabel: '🖨️ Cetak Sekarang',
          onAction: () => {
            setNoticeModal(null);
            executePrint(true);
          }
        });
      } else if (data.status === 'pending') {
        setNoticeModal({
          isOpen: true,
          type: 'pending',
          title: 'Pembayaran Masih Tertunda',
          message: 'Status transaksi Anda masih berstatus pending di sistem Midtrans. Jika Anda baru saja transfer, mohon tunggu 1-2 menit lalu klik periksa kembali.',
          actionLabel: '🔍 Periksa Ulang',
          onAction: () => {
            handleRestorePayment();
          },
          secondaryLabel: 'Tutup',
          onSecondary: () => setNoticeModal(null)
        });
      } else {
        setNoticeModal({
          isOpen: true,
          type: 'error',
          title: 'Status Belum Terverifikasi',
          message: 'Sistem Midtrans melaporkan transaksi belum berhasil atau kedaluwarsa. Anda dapat mencoba melakukan pembayaran baru.',
          actionLabel: '🔄 Buat Pembayaran Baru',
          onAction: () => {
            setNoticeModal(null);
            handleCetakBerbayar();
          },
          secondaryLabel: 'Tutup',
          onSecondary: () => setNoticeModal(null)
        });
      }
    } catch {
      setNoticeModal({
        isOpen: true,
        type: 'error',
        title: 'Gangguan Pemulihan',
        message: 'Terjadi kendala saat memeriksa status pembayaran ke server. Silakan coba kembali dalam beberapa saat.',
        actionLabel: 'Coba Lagi',
        onAction: () => {
          handleRestorePayment();
        },
        secondaryLabel: 'Tutup',
        onSecondary: () => setNoticeModal(null)
      });
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <>
      {!isPremium && <ViralWatermark url={getViralUrl()} />}

      {/* Script Snap Midtrans */}
      <Script 
        src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || (clientKey && !clientKey.startsWith('SB-'))
          ? 'https://app.midtrans.com/snap/snap.js'
          : 'https://app.sandbox.midtrans.com/snap/snap.js'}
        data-client-key={clientKey} 
        strategy="lazyOnload" 
      />

      {/* MODAL PILIHAN CETAK UTAMA */}
      {isOpen && (
        <div id="print-modal-overlay" className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
               ✕
            </button>

            <div className="text-center mb-6 mt-2">
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight mb-2">Opsi Cetak Dokumen</h3>
              <p className="text-slate-500 text-sm">Pilih opsi cetak yang sesuai dengan kebutuhan Anda.</p>
            </div>

            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-3">
              <div className="mt-0.5 text-amber-500 shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1">Tips Cetak Resmi</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Agar dokumen terlihat bersih dan sah, pastikan Anda <strong>menghilangkan centang (uncheck) "Headers and footers"</strong> pada pengaturan printer Anda sebelum mencetak.
                </p>
              </div>
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

            {pendingOrderId && !isPremium && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-center flex flex-col items-center gap-2 animate-in slide-in-from-top-2 duration-200">
                <span className="text-xs text-blue-700">Sudah bayar tapi gagal cetak karena tab tertutup?</span>
                <button 
                  onClick={handleRestorePayment}
                  disabled={isRecovering}
                  className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isRecovering ? <Loader2 size={14} className="animate-spin" /> : null}
                  Pulihkan Pembayaran
                </button>
              </div>
            )}

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
          </div>
        </div>
      )}

      {/* MODAL PEMBERITAHUAN MODERN (GANTIKAN ALERT JADUL) */}
      {noticeModal && noticeModal.isOpen && (
        <div id="notice-modal-overlay" className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setNoticeModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            {/* Icon Header */}
            <div className="mx-auto mb-4 flex items-center justify-center">
              {noticeModal.type === 'retry' && (
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shadow-lg shadow-amber-500/10 relative">
                  <RefreshCcw size={28} className="text-amber-500" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white animate-ping"></span>
                </div>
              )}
              {noticeModal.type === 'error' && (
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center shadow-lg shadow-rose-500/10">
                  <AlertTriangle size={28} />
                </div>
              )}
              {noticeModal.type === 'pending' && (
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-lg shadow-blue-500/10">
                  <Loader2 size={28} className="animate-spin text-blue-500" />
                </div>
              )}
              {noticeModal.type === 'success' && (
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2">
              {noticeModal.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
              {noticeModal.message}
            </p>

            <div className="space-y-2">
              {noticeModal.actionLabel && (
                <button
                  onClick={noticeModal.onAction}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {noticeModal.actionLabel}
                </button>
              )}
              {noticeModal.secondaryLabel && (
                <button
                  onClick={noticeModal.onSecondary}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition active:scale-[0.98]"
                >
                  {noticeModal.secondaryLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL PRINT STYLES UNTUK NATIVE WINDOW PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
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

          /* Sembunyikan modal pembayaran saat dialog print muncul (jika eksekusi sinkron) */
          #print-modal-overlay, #notice-modal-overlay {
            display: none !important;
          }
          
          /* Sembunyikan elemen UI */
          .no-print { display: none !important; }
          .page-break { page-break-after: always !important; break-after: page !important; }
          
          /* Watermark CSS murni (Hanya untuk versi Gratis) */
          body.print-free::after {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'%3E%3Ctext x='50%25' y='50%25' transform='rotate(-45 200 200)' fill='rgba(0,0,0,0.03)' font-family='sans-serif' font-size='24' font-weight='bold' letter-spacing='4' text-anchor='middle'%3ELAYANANDOKUMEN.COM%3C/text%3E%3C/svg%3E");
            background-repeat: repeat;
            z-index: 2147483647;
            pointer-events: none;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      ` }} />
    </>
  );
}
