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
    // Regex to find @page { size: A4; margin: 0; } or similar
    const newContent = content.replace(/@page\s*\{\s*size:\s*A4;\s*margin:\s*0;?\s*\}/g, '@page { size: A4; margin: 2.54cm; }');
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedCount++;
    }
});

console.log(`Updated @page margin in ${changedCount} files.`);
