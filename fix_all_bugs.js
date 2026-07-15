const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let fixedPreviewWrappers = 0;
let fixedBrokenPrintWrappers = 0;

dirs.forEach(dir => {
  const file = path.join(dir, 'index.tsx');
  const fullPath = path.join(templatesDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  // 1. Fix preview wrappers missing print:flex or print:block
  // We look for divs that have print:overflow-visible or id="print-only-root" parent
  // Actually, any div that has print:bg-white or print:overflow-visible is a preview wrapper.
  // We'll replace them to ensure they have print:!flex (we use !flex to be absolutely sure it overrides hidden)
  // Wait, Tailwind print:flex might be enough, but print:!flex is safer. (Tailwind supports !flex -> \!flex)
  // Actually, print:flex is standard. Let's just add print:flex print:block - wait, just print:flex is fine since flex-1 is usually there.
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if (line.includes('flex-1') && line.includes('print:overflow-visible') && !line.includes('print:flex') && !line.includes('print:block')) {
      // It's a preview wrapper. Add print:flex
      return line.replace('print:overflow-visible', 'print:flex print:overflow-visible');
    }
    
    // 2. Fix broken PrintWrappers with opacity-0 or pointer-events-none
    if (line.includes('<PrintWrapper')) {
        // This won't work if the broken class is on the parent div line.
        // We will handle broken PrintWrappers globally via regex.
    }
    
    return line;
  });
  content = newLines.join('\n');
  
  // Fix broken PrintWrappers (opacity-0 or pointer-events-none)
  // Find <div id="print-options" ... opacity-0 pointer-events-none>
  // Just remove opacity-0, opacity-30, opacity-[0.03], pointer-events-none from ANY line that has them IF they are wrappers of PrintWrapper?
  // Easier: just regex replace them globally in the file if the file is in our broken list.
  
  const brokenList = [
    'cuti-karyawan',    'cv',
    'faktur-pajak',     'garansi',
    'kas',              'laba-rugi',
    'label-pengiriman', 'lamaran',
    'paklaring',        'penagihan',
    'pengaduan',        'pernyataan-kerja',
    'promosi',          'rekomendasi',
    'resign',           'sp-karyawan',
    'spb',              'surat-tugas',
    'ket-dokter', 'sponsor-visa', 'terbilang', 'usia', 'rujukan', 'diskon', 'izin-barang', 'penghasilan-ortu', 'resign-akademik'
  ];
  
  if (brokenList.includes(dir)) {
     // Remove pointer-events-none and opacity related classes from the wrappers.
     // To be safe, just remove pointer-events-none globally from the file since it's only used for these broken wrappers.
     content = content.replace(/pointer-events-none/g, '');
     content = content.replace(/opacity-0/g, '');
     content = content.replace(/opacity-30/g, '');
     content = content.replace(/opacity-\[0\.03\]/g, '');
     content = content.replace(/opacity-40/g, '');
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    if (content.includes('print:flex')) fixedPreviewWrappers++;
    if (brokenList.includes(dir)) fixedBrokenPrintWrappers++;
  }
});

console.log(`Fixed preview wrappers: ${fixedPreviewWrappers}`);
console.log(`Fixed broken PrintWrappers: ${fixedBrokenPrintWrappers}`);
