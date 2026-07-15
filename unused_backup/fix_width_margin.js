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
    let modified = false;

    // Fix w-[210mm] to w-[210mm] print:w-full print:min-w-0
    if (content.includes('w-[210mm]') && !content.includes('print:w-full')) {
        content = content.replace(/w-\[210mm\]/g, 'w-[210mm] print:w-full print:min-w-0');
        modified = true;
    }

    // Fix min-h-[296mm] to min-h-[296mm] print:min-h-0
    if (content.includes('min-h-[296mm]') && !content.includes('print:min-h-0')) {
        content = content.replace(/min-h-\[296mm\]/g, 'min-h-[296mm] print:min-h-0');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});

console.log(`Updated width/height print rules in \${changedCount} files.`);
