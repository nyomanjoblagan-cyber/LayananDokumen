const fs = require('fs');
const path = require('path');

const appToolsDir = path.join(__dirname, '../app/tools');
const templatesDir = path.join(__dirname, '../components/templates');
const dataDir = path.join(__dirname, '../data');

// Create directories if not exist
if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const items = fs.readdirSync(appToolsDir);
const slugs = [];

items.forEach(item => {
  const itemPath = path.join(appToolsDir, item);
  if (fs.statSync(itemPath).isDirectory()) {
    const pagePath = path.join(itemPath, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      slugs.push(item);
      
      // Move folder to components/templates
      const targetPath = path.join(templatesDir, item);
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      
      // Move page.tsx to index.tsx
      fs.renameSync(pagePath, path.join(targetPath, 'index.tsx'));
      
      // Move any other files in that directory
      const otherFiles = fs.readdirSync(itemPath);
      otherFiles.forEach(f => {
        fs.renameSync(path.join(itemPath, f), path.join(targetPath, f));
      });
      
      // Remove old folder
      fs.rmdirSync(itemPath);
    }
  }
});

// Generate templates.ts
let templatesContent = `export const TEMPLATES: Record<string, any> = {\n`;
slugs.forEach(slug => {
  const formattedTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  templatesContent += `  "${slug}": {
    title: "Buat Surat ${formattedTitle} Otomatis (PDF)",
    description: "Generator Surat ${formattedTitle} online. Isi form langsung jadi, cetak tanpa watermark, cepat dan praktis.",
    seoGuide: "Panduan lengkap mengenai Surat ${formattedTitle}. Dokumen ini sangat penting untuk keperluan administrasi resmi. Melalui generator ini, Anda dapat menyusunnya secara instan tanpa perlu repot mengatur format di Microsoft Word. Cukup lengkapi data yang diperlukan pada formulir, dan sistem akan meracik teks beserta tata letaknya secara otomatis menjadi file PDF yang siap cetak."
  },\n`;
});
templatesContent += `};\n`;
fs.writeFileSync(path.join(dataDir, 'templates.ts'), templatesContent);

// Generate registry.ts
let registryContent = `import dynamic from 'next/dynamic';\n\n`;
registryContent += `export const TemplateRegistry: Record<string, React.ComponentType<any>> = {\n`;
slugs.forEach(slug => {
  registryContent += `  "${slug}": dynamic(() => import('@/components/templates/${slug}')),\n`;
});
registryContent += `};\n`;
fs.writeFileSync(path.join(dataDir, 'registry.ts'), registryContent);

console.log(`Successfully migrated ${slugs.length} templates!`);
