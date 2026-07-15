const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const file = path.join(templatesDir, 'surat-dinas', 'index.tsx');
const content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('print:hidden')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});
