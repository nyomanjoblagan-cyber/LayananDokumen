const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'components', 'templates');
const templateFolders = fs.readdirSync(templatesDir);
let modifiedCount = 0;

for (const folder of templateFolders) {
  const indexPath = path.join(templatesDir, folder, 'index.tsx');
  if (!fs.existsSync(indexPath)) continue;

  let content = fs.readFileSync(indexPath, 'utf-8');
  let originalContent = content;

  const addPrintClasses = (classes, toAdd) => {
    let cls = classes;
    toAdd.forEach(c => {
      // Avoid duplicating the class
      if (!new RegExp(`\\b${c.replace(':', '\\:')}\\b`).test(cls)) {
          cls += ' ' + c;
      }
    });
    return cls.replace(/\s+/g, ' ').trim();
  };

  // 1. <main>
  content = content.replace(/<main\s+className=(?:"([^"]+)"|{`([^`]+)`})/g, (match, p1, p2) => {
    const isQuotes = !!p1;
    let cls = p1 || p2;
    if (cls.includes('flex') || cls.includes('overflow-hidden') || cls.includes('h-screen') || cls.includes('100vh')) {
       cls = addPrintClasses(cls, ['print:block', 'print:h-auto', 'print:overflow-visible']);
    }
    return isQuotes ? `<main className="${cls}"` : `<main className={\`${cls}\`}`;
  });

  // 2. <div> wrappers
  content = content.replace(/<div\s+className=(?:"([^"]+)"|{`([^`]+)`})/g, (match, p1, p2) => {
    const isQuotes = !!p1;
    let cls = p1 || p2;
    let modified = false;

    // Is it a wrapper with flex-1 and overflow restriction?
    if (cls.includes('flex-1') && (cls.includes('overflow-y-auto') || cls.includes('overflow-hidden'))) {
        cls = addPrintClasses(cls, ['print:block', 'print:overflow-visible', 'print:bg-white']);
        if (cls.includes('relative')) {
            cls = addPrintClasses(cls, ['print:static']);
        }
        modified = true;
    }
    
    // Is it the scale wrapper?
    if (cls.includes('transform') && cls.includes('scale-[')) {
        cls = addPrintClasses(cls, ['print:scale-100', 'print:transform-none', 'print:w-full', 'print:m-0', 'print:block']);
        modified = true;
    }

    if (modified) {
        return isQuotes ? `<div className="${cls}"` : `<div className={\`${cls}\`}`;
    }
    return match;
  });

  // 3. Ensure id="print-only-root" is not constrained
  content = content.replace(/id="print-only-root"\s+className=(?:"([^"]+)"|{`([^`]+)`})/g, (match, p1, p2) => {
    const isQuotes = !!p1;
    let cls = p1 || p2;
    cls = addPrintClasses(cls, ['print:h-auto', 'print:static']);
    return isQuotes ? `id="print-only-root" className="${cls}"` : `id="print-only-root" className={\`${cls}\`}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(indexPath, content, 'utf-8');
    modifiedCount++;
  }
}

console.log(`Successfully modified ${modifiedCount} files.`);
