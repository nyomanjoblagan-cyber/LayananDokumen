const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let brokenPrintWrappers = [];
dirs.forEach(dir => {
  const file = path.join(dir, 'index.tsx');
  const fullPath = path.join(templatesDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  if (/<div[^>]*className=\"[^\"]*(opacity-0|pointer-events-none|(?<!md:)hidden(?!\s+md:flex))[^\"]*\"[^>]*>[\s\S]{0,150}<PrintWrapper/.test(content)) {
    brokenPrintWrappers.push(dir);
  }
});
console.log('Broken PrintWrappers:', brokenPrintWrappers);
