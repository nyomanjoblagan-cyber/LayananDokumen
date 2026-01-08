'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Cake, Star, User, 
  Hourglass, Fingerprint, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <AgeCalculator />
    </div>
  );
}

function AgeCalculator() {
  // --- STATE ---
  const [birthDate, setBirthDate] = useState<string>('');
  const [today, setToday] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [nextBday, setNextBday] = useState({ days: 0, months: 0 });
  
  // STATS
  const [zodiac, setZodiac] = useState('-');
  const [weton, setWeton] = useState('-');
  const [neptu, setNeptu] = useState(0);
  const [shio, setShio] = useState('-');
  const [generation, setGeneration] = useState('-');
  const [totalDays, setTotalDays] = useState(0);

  // LOGIC
  useEffect(() => {
    if (!birthDate) return;

    const start = new Date(birthDate);
    const end = new Date(today);

    // 1. Hitung Umur Presisi
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

    // 2. Next Birthday (Countdown)
    const currentYear = end.getFullYear();
    let nextBirthday = new Date(start);
    nextBirthday.setFullYear(currentYear);
    if (nextBirthday < end) nextBirthday.setFullYear(currentYear + 1);

    const diffTime = Math.abs(nextBirthday.getTime() - end.getTime());
    const diffDaysTotal = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setNextBday({ months: Math.floor(diffDaysTotal / 30), days: diffDaysTotal % 30 });

    // 3. Zodiak Barat
    const d = start.getDate();
    const m = start.getMonth() + 1;
    let z = '';
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) z = "Aquarius";
    else if ((m == 2 && d >= 19) || (m == 3 && d <= 20)) z = "Pisces";
    else if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) z = "Aries";
    else if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) z = "Taurus";
    else if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) z = "Gemini";
    else if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) z = "Cancer";
    else if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) z = "Leo";
    else if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) z = "Virgo";
    else if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) z = "Libra";
    else if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) z = "Scorpio";
    else if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) z = "Sagittarius";
    else if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) z = "Capricorn";
    setZodiac(z);

    // 4. Weton (Jawa)
    // Anchor: 1 Jan 1900 = Senin Pahing
    const knownDate = new Date(1900, 0, 1); // Bulan 0 = Jan
    const timeDiff = start.getTime() - knownDate.getTime();
    const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    const pasaranNames = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    const hariNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    
    // Nilai Neptu
    const neptuHari = [5, 4, 3, 7, 8, 6, 9]; // Minggu=5, Senin=4, dst
    const neptuPasaran = [5, 9, 7, 4, 8]; // Legi=5, Pahing=9, dst

    // Hitung index
    // Hati-hati dgn modulo bilangan negatif jika lahir sebelum 1900 (tapi asumsi user > 1900)
    let idxPasaran = (daysPassed + 1) % 5; // +1 karena 1 Jan 1900 adalah Pahing (index 1)
    if (idxPasaran < 0) idxPasaran += 5;
    
    const hariLahir = start.getDay(); // 0=Minggu, 1=Senin
    const namaHari = hariNames[hariLahir];
    const namaPasaran = pasaranNames[idxPasaran];
    
    setWeton(`${namaHari} ${namaPasaran}`);
    setNeptu(neptuHari[hariLahir] + neptuPasaran[idxPasaran]);

    // 5. Shio (China)
    const shioList = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    setShio(shioList[start.getFullYear() % 12]);

    // 6. Generasi & Total Hari
    const y = start.getFullYear();
    if (y >= 2013) setGeneration("Gen Alpha");
    else if (y >= 1997) setGeneration("Gen Z");
    else if (y >= 1981) setGeneration("Millennial");
    else if (y >= 1965) setGeneration("Gen X");
    else setGeneration("Baby Boomer");

    const totalDiff = Math.abs(end.getTime() - start.getTime());
    setTotalDays(Math.ceil(totalDiff / (1000 * 3600 * 24)));

  }, [birthDate, today]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-slate-600 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="text-indigo-600" /> Usia & Weton
          </h1>
          <p className="text-sm text-slate-500">Kalkulator umur lengkap dengan pasaran Jawa.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Input Data</h3>
            
            <div className="mb-4">
               <label className="text-xs font-bold text-slate-700 mb-1.5 block">Tanggal Lahir</label>
               <input 
                 type="date" 
                 className="w-full px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl font-bold text-indigo-900 text-lg focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                 value={birthDate}
                 onChange={(e) => setBirthDate(e.target.value)}
               />
            </div>
            
            <div>
               <label className="text-xs font-bold text-slate-400 mb-1.5 block">Hitung Per Tanggal</label>
               <input 
                 type="date" 
                 className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-slate-400 transition-all"
                 value={today}
                 onChange={(e) => setToday(e.target.value)}
               />
            </div>
          </div>

          {/* Quick Stats */}
          {birthDate && (
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2 opacity-60">
                      <Hourglass size={16}/>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Durasi Hidup</span>
                   </div>
                   <div className="text-3xl font-black mb-1">{new Intl.NumberFormat('id-ID').format(totalDays)}</div>
                   <div className="text-xs opacity-60">Hari telah Anda lalui di dunia ini.</div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20"></div>
             </div>
          )}
        </div>

        {/* RESULT SECTION */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Age Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
             <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Cake size={18} />
                   <span className="font-bold text-sm uppercase">Usia Detail</span>
                </div>
                {generation !== '-' && (
                   <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {generation}
                   </span>
                )}
             </div>

             <div className="p-8">
                <div className="flex flex-wrap justify-center items-end gap-2 md:gap-6 text-center">
                   <div>
                      <div className="text-5xl md:text-7xl font-black text-slate-800 mb-1 leading-none">{age.years}</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Tahun</div>
                   </div>
                   <div className="text-3xl md:text-5xl text-slate-200 font-light mb-2">/</div>
                   <div>
                      <div className="text-3xl md:text-5xl font-bold text-slate-600 mb-1 leading-none">{age.months}</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Bulan</div>
                   </div>
                   <div className="text-3xl md:text-5xl text-slate-200 font-light mb-2">/</div>
                   <div>
                      <div className="text-3xl md:text-5xl font-bold text-slate-600 mb-1 leading-none">{age.days}</div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Hari</div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                   <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2">
                      <Sparkles size={14} />
                      Ulang tahun berikutnya dalam <strong>{nextBday.months} bulan, {nextBday.days} hari</strong>
                   </div>
                </div>
             </div>
          </div>

          {/* CULTURAL STATS (Weton & Shio) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             
             {/* Weton Card */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                   <Fingerprint size={18} />
                   <span className="text-xs font-bold uppercase tracking-wide">Weton Jawa</span>
                </div>
                <div>
                   <div className="text-xl font-black text-slate-800 uppercase">{weton}</div>
                   <div className="text-xs text-slate-500 mt-1">Neptu: <strong className="text-slate-800">{neptu}</strong></div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Fingerprint size={80} />
                </div>
             </div>

             {/* Zodiac Card */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-purple-600">
                   <Star size={18} />
                   <span className="text-xs font-bold uppercase tracking-wide">Bintang</span>
                </div>
                <div>
                   <div className="text-xl font-black text-slate-800 uppercase">{zodiac}</div>
                   <div className="text-xs text-slate-500 mt-1">Zodiak Barat</div>
                </div>
             </div>

             {/* Shio Card */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                   <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center text-[8px] font-bold">CN</div>
                   <span className="text-xs font-bold uppercase tracking-wide">Shio</span>
                </div>
                <div>
                   <div className="text-xl font-black text-slate-800 uppercase">{shio}</div>
                   <div className="text-xs text-slate-500 mt-1">Kalender China</div>
                </div>
             </div>

          </div>

        </div>

      </div>
    </div>
  );
}