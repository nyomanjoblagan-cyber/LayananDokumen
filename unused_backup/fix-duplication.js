const fs = require('fs');
const path = require('path');

const dir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const subdirs = fs.readdirSync(dir);
let count = 0;

for (const subdir of subdirs) {
  const filePath = path.join(dir, subdir, 'index.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Cek apakah file ini menggunakan arsitektur A (memiliki id="print-only-root")
    if (content.includes('id="print-only-root"')) {
      // Kita perlu memastikan bahwa <main> atau Preview Area TIDAK dicetak.
      // Cara termudah adalah mencari "print:block" pada tag <main> dan <div className="... flex-1 bg-slate-200 ..."> 
      // lalu mengubahnya menjadi "print:hidden"
      
      let modified = false;
      
      // Mengubah print:block menjadi print:hidden pada <main>
      if (content.includes('<main ') && content.includes('print:block')) {
        // Hanya replace print:block pertama atau semua print:block yang ada sebelum print-only-root?
        // Sebaiknya replace secara aman menggunakan regex pada baris yang mengandung <main dan className
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if ((lines[i].includes('<main') || lines[i].includes('flex-1') || lines[i].includes('bg-slate-200') || lines[i].includes('preview')) && lines[i].includes('print:block') && !lines[i].includes('print-only-root')) {
            lines[i] = lines[i].replace(/print:block/g, 'print:hidden');
            modified = true;
          }
        }
        content = lines.join('\n');
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed duplication in ' + subdir);
        count++;
      }
    }
  }
}

console.log('Total fixed: ' + count);
