'use client';

/**
 * FILE: AgeCalculatorPage.tsx
 * STATUS: FIXED IMPORT & CONSISTENT
 * DESC: Kalkulator Usia Lengkap dengan Statistik Hidup & Metafisika
 */

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Cake, Star, User, 
  Hourglass, Fingerprint, Sparkles, Heart, Wind, Orbit, Timer, RotateCcw,
  Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-20">
      <AgeCalculator />
    </div>
  );
}

function AgeCalculator() {
  // --- STATE SYSTEM ---
  const [birthDate, setBirthDate] = useState<string>('');
  const [today, setToday] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isClient, setIsClient] = useState(false);
  
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [nextBday, setNextBday] = useState({ days: 0, months: 0, totalDays: 0 });
  const [stats, setStats] = useState({
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
    heartBeats: 0,
    breaths: 0,
    sunOrbits: 0
  });

  const [zodiac, setZodiac] = useState('-');
  const [weton, setWeton] = useState({ name: '-', neptu: 0, character: '-' });
  const [shio, setShio] = useState('-');
  const [generation, setGeneration] = useState('-');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!birthDate) return;

    const start = new Date(birthDate);
    const end = new Date(today);
    const diffTime = end.getTime() - start.getTime();

    // 1. Precise Age Calculation
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });

    // 2. Life Journey Stats
    const totalDays = Math.floor(diffTime / (1000 * 3600 * 24));
    setStats({
      totalDays,
      totalHours: totalDays * 24,
      totalMinutes: totalDays * 24 * 60,
      totalSeconds: totalDays * 24 * 3600,
      heartBeats: totalDays * 24 * 60 * 72, // Avg 72 bpm
      breaths: totalDays * 24 * 60 * 16,    // Avg 16 breaths pm
      sunOrbits: Number((totalDays / 365.25).toFixed(2))
    });

    // 3. Next Birthday Countdown
    let nextB = new Date(start);
    nextB.setFullYear(end.getFullYear());
    if (nextB < end) nextB.setFullYear(end.getFullYear() + 1);
    const diffNext = Math.ceil((nextB.getTime() - end.getTime()) / (1000 * 3600 * 24));
    setNextBday({ totalDays: diffNext, months: Math.floor(diffNext / 30), days: diffNext % 30 });

    // 4. Western Zodiac
    const d = start.getDate(), m = start.getMonth() + 1;
    const zodiacs = [
      { name: "Capricorn", start: [12, 22], end: [1, 19] }, { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] }, { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] }, { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] }, { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] }, { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] }, { name: "Sagittarius", start: [11, 22], end: [12, 21] }
    ];
    const myZodiac = zodiacs.find(z => (m === z.start[0] && d >= z.start[1]) || (m === z.end[0] && d <= z.end[1]));
    setZodiac(myZodiac?.name || "Capricorn");

    // 5. Weton Logic
    const pasaranNames = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    const hariNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const neptuHari = [5, 4, 3, 7, 8, 6, 9], neptuPas = [5, 9, 7, 4, 8];
    const baseDate = new Date(1900, 0, 1);
    const dDays = Math.floor((start.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));
    let pasIdx = (dDays + 1) % 5; if (pasIdx < 0) pasIdx += 5;
    const hIdx = start.getDay();
    setWeton({
      name: `${hariNames[hIdx]} ${pasaranNames[pasIdx]}`,
      neptu: neptuHari[hIdx] + neptuPas[pasIdx],
      character: getWetonChar(pasaranNames[pasIdx])
    });

    // 6. Shio & Generation
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    setShio(shios[start.getFullYear() % 12]);
    const y = start.getFullYear();
    setGeneration(y >= 2013 ? "Gen Alpha" : y >= 1997 ? "Gen Z" : y >= 1981 ? "Millennial" : y >= 1965 ? "Gen X" : "Baby Boomer");

  }, [birthDate, today]);

  const getWetonChar = (p: string) => {
    if (p === "Legi") return "Optimis & Murah Hati";
    if (p === "Pahing") return "Ambisius & Cerdas";
    if (p === "Pon") return "Sabar & Berwibawa";
    if (p === "Wage") return "Teguh & Mandiri";
    return "Setia & Berhati-hati";
  };

  const handleReset = () => {
    setBirthDate('');
    setToday(new Date().toISOString().split('T')[0]);
  };

  if (!isClient) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 text-left">
        <div className="flex items-center gap-4">
          <Link href="/" className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-indigo-500 text-slate-600 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Kalkulator Usia Pro</h1>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Life Journey & Metaphysics Tracker</p>
          </div>
        </div>
        <button onClick={handleReset} className="flex items-center gap-2 bg-white hover:bg-red-50 hover:text-red-600 text-slate-400 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase border border-slate-200 shadow-sm">
           <RotateCcw size={16}/> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-left">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-700">Data Kelahiran</h3>
            </div>
            <div className="space-y-4">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Pilih Tanggal Lahir</label>
                  <input type="date" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-indigo-600 text-xl focus:outline-none focus:border-indigo-500 transition-all" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Dihitung Per Tanggal</label>
                  <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-indigo-400" value={today} onChange={(e) => setToday(e.target.value)}/>
               </div>
            </div>
          </div>

          {birthDate && (
            <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group text-left">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-4">Usia Anda</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black tracking-tighter">{age.years}</span>
                    <span className="text-xl font-bold text-indigo-300">Tahun</span>
                  </div>
                  <p className="text-sm font-medium text-indigo-200 mt-2">{age.months} Bulan, {age.days} Hari</p>
                  <div className="mt-8 flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                     <Timer size={14} className="text-indigo-300"/>
                     <span className="text-[10px] font-bold uppercase tracking-widest">{generation}</span>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-8 space-y-6">
          {!birthDate ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
               <Hourglass size={48} className="mb-4 animate-pulse"/>
               <p className="font-bold uppercase tracking-widest text-xs font-sans">Masukkan Tanggal Lahir Anda</p>
            </div>
          ) : (
            <>
              {/* METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <MetricCard icon={<Hourglass size={18} className="text-blue-500"/>} label="Total Hari" value={new Intl.NumberFormat('id-ID').format(stats.totalDays)} />
                <MetricCard icon={<Timer size={18} className="text-emerald-500"/>} label="Total Jam" value={new Intl.NumberFormat('id-ID').format(stats.totalHours)} />
                <MetricCard icon={<Heart size={18} className="text-red-500"/>} label="Detak Jantung*" value={new Intl.NumberFormat('id-ID').format(stats.heartBeats)} />
                <MetricCard icon={<Orbit size={18} className="text-amber-500"/>} label="Orbit Matahari" value={stats.sunOrbits} />
              </div>

              {/* METAPHYSICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard 
                  title="Weton Jawa" 
                  icon={<Fingerprint size={20} className="text-amber-600"/>}
                  value={weton.name}
                  sub={`Neptu: ${weton.neptu} (${weton.character})`}
                  color="bg-amber-50"
                />
                <InfoCard 
                  title="Zodiak" 
                  icon={<Star size={20} className="text-purple-600"/>}
                  value={zodiac}
                  sub="Western Horoscope"
                  color="bg-purple-50"
                />
                <InfoCard 
                  title="Shio" 
                  icon={<Sparkles size={20} className="text-red-600"/>}
                  value={shio}
                  sub="Chinese Zodiac"
                  color="bg-red-50"
                />
              </div>

              {/* NEXT BIRTHDAY */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-left">
                <div className="relative z-10 bg-indigo-50 p-6 rounded-2xl">
                   <Cake size={48} className="text-indigo-600"/>
                </div>
                <div className="relative z-10 flex-1">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Countdown Ulang Tahun</h4>
                  <p className="text-2xl font-black text-slate-800">
                    {nextBday.totalDays === 0 ? "SELAMAT ULANG TAHUN! 🥳" : `${nextBday.totalDays} Hari Lagi`}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Ulang tahun ke-{age.years + 1}.</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <div className="text-center">
                        <div className="text-2xl font-black text-indigo-600">{nextBday.months}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase font-sans">Bulan</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-indigo-600">{nextBday.days}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase font-sans">Hari</div>
                    </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl text-[10px] text-slate-400 italic text-center font-sans">
                *Statistik detak jantung dan napas adalah estimasi angka rata-rata.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
      <div className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider font-sans">{label}</p>
        <p className="text-lg font-black text-slate-800 tracking-tighter leading-tight font-sans">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, value, sub, color }: { title: string, icon: React.ReactNode, value: string, sub: string, color: string }) {
  return (
    <div className={`p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md`}>
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>{icon}</div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 font-sans">{title}</p>
      <p className="text-xl font-black text-slate-800 uppercase tracking-tighter font-sans">{value}</p>
      <p className="text-[10px] font-bold text-slate-500 mt-2 leading-relaxed font-sans">{sub}</p>
    </div>
  );
}
