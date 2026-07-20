import os
import re

def main():
    files = ['pernyataan-kerja', 'promosi', 'rekomendasi', 'resign']
    base_dir = r'D:\WEB DESIGN\LayananDokumen\components\templates'

    for f in files:
        path = os.path.join(base_dir, f, 'index.tsx')
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 1. Replace useState with useFormSync
        pattern = r'const \[data, setData\] = useState<([a-zA-Z0-9_]+)>\((.*?)\);'
        replacement = r'const [data, setData] = useFormSync<\1>(\2);'
        new_content = re.sub(pattern, replacement, content)
        
        # 2. Inject import
        if new_content != content and 'useFormSync' not in content:
            import_statement = "\nimport { useFormSync } from '@/lib/useFormSync';\n"
            if "'use client';" in new_content:
                new_content = new_content.replace("'use client';", "'use client';" + import_statement, 1)
            elif '"use client";' in new_content:
                new_content = new_content.replace('"use client";', '"use client";' + import_statement, 1)
            else:
                new_content = import_statement + new_content
                
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Fixed {f}')

if __name__ == '__main__':
    main()
