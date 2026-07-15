const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let translateFixCount = 0;
let mainHiddenFixCount = 0;

dirs.forEach(dir => {
  const file = path.join(dir, 'index.tsx');
  const fullPath = path.join(templatesDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  // 1. Fix translate-x-full on the right panel
  // We look for translate-x-full that doesn't have print:translate-x-0 nearby
  // Actually, we can just safely replace 'translate-x-full' with 'translate-x-full print:translate-x-0' 
  // BUT only on the preview panel. The left panel uses '-translate-x-full'.
  // Let's replace 'translate-x-full md:translate-x-0' with 'translate-x-full print:translate-x-0 md:translate-x-0'
  if (content.includes('translate-x-full') && !content.includes('print:translate-x-0')) {
     content = content.replace(/translate-x-full\s+md:translate-x-0/g, 'translate-x-full print:translate-x-0 md:translate-x-0');
     content = content.replace(/translate-x-full\s+sm:translate-x-0/g, 'translate-x-full print:translate-x-0 sm:translate-x-0');
     // Some might just be 'translate-x-full' without md:translate-x-0?
     // We can just regex replace `translate-x-full(?!\s+print:translate-x-0)` with `translate-x-full print:translate-x-0`
     // Let's do it carefully.
     content = content.replace(/(?<!-)translate-x-full(?!\s*print:translate-x-0)/g, 'translate-x-full print:translate-x-0');
  }
  
  // 2. Fix print:hidden on main
  if (/<main[^>]*className=[^>]*print:hidden/.test(content)) {
     // replace print:hidden with print:block on main tag only
     content = content.replace(/(<main[^>]*className="[^"]*)print:hidden([^"]*")/, '$1print:block$2');
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    if (originalContent.includes('translate-x-full') && !originalContent.includes('print:translate-x-0')) translateFixCount++;
    if (/<main[^>]*className=[^>]*print:hidden/.test(originalContent)) mainHiddenFixCount++;
  }
});

console.log(`Fixed translate-x-full in ${translateFixCount} files.`);
console.log(`Fixed print:hidden on <main> in ${mainHiddenFixCount} files.`);
