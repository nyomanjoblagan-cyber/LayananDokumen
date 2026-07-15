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

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Hapus baris @page dari style block
    let newContent = content.replace(/@page\s*\{[^}]*\}/g, '');
    
    // Hapus margin: 0 dari body print style, atau biarkan PrintWrapper yang atur
    // Karena PrintWrapper sudah ada: body { margin: 0; padding: 0; background: white !important; ... }
    
    // Juga perbaiki absolute positioning di #print-only-root yang mungkin mengganggu print browser tertentu
    newContent = newContent.replace(/position:\s*absolute;\s*top:\s*0;\s*left:\s*0;/g, 'position: relative;');
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedCount++;
    }
});

console.log(`Updated styles in ${changedCount} files to let PrintWrapper take control.`);
