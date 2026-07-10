const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'components', 'templates');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walkDir(templatesDir);
let changedCount = 0;

const newStyle = `<style dangerouslySetInnerHTML={{ __html: \`
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      \` }} />`;

const newKertas = `const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={\`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto \${className}\`}>
      {children}
    </div>
  );`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Ganti blok style
    const styleRegex = /<style\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*`[\s\S]*?`\s*\}\}\s*\/>/g;
    if (styleRegex.test(content)) {
        content = content.replace(styleRegex, newStyle);
        modified = true;
    }

    // 2. Ganti blok Kertas
    // Match dari const Kertas = ... sampai );
    const kertasRegex = /const\s+Kertas\s*=\s*\([^)]*\)\s*=>\s*\([\s\S]*?<\/div>\s*\);/g;
    if (kertasRegex.test(content)) {
        content = content.replace(kertasRegex, newKertas);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});

console.log(`Updated print layout in \${changedCount} files.`);
