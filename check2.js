const fs = require('fs');
const content = fs.readFileSync('d:/WEB DESIGN/LayananDokumen/components/templates/surat-dinas/index.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('<main') || line.includes('print:hidden')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});
