const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let fixedCount = 0;

dirs.forEach(dir => {
  const file = path.join(dir, 'index.tsx');
  const fullPath = path.join(templatesDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // If it's a wrapper (contains flex-1) and has print:hidden, remove print:hidden
    if (line.includes('flex-1') && line.includes('print:hidden')) {
      return line.replace(/print:hidden/g, '').replace(/\s{2,}/g, ' ');
    }
    return line;
  });
  
  content = newLines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    fixedCount++;
  }
});

console.log(`Removed print:hidden from wrappers in ${fixedCount} files.`);
