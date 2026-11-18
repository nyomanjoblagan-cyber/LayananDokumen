import os
import re

def main():
    templates_dir = r"d:\WEB DESIGN\LayananDokumen\components\templates"
    
    for d in os.listdir(templates_dir):
        index_path = os.path.join(templates_dir, d, "index.tsx")
        if os.path.isfile(index_path):
            with open(index_path, "r", encoding="utf-8") as f:
                content = f.read()

            # 1. Replace useState with useFormSync
            # We look for: const [data, setData] = useState<Type>(INITIAL_DATA);
            pattern = r'const \[data, setData\] = useState<([a-zA-Z0-9_]+)>\(INITIAL_DATA\);'
            replacement = r'const [data, setData] = useFormSync<\1>(INITIAL_DATA);'
            
            new_content = re.sub(pattern, replacement, content)

            # 2. Inject import if replacement happened and import doesn't exist
            if new_content != content and "useFormSync" not in content:
                # Find the 'use client'; line and insert after it
                # or just insert at the top
                import_statement = "\nimport { useFormSync } from '@/lib/useFormSync';\n"
                
                if "'use client';" in new_content:
                    new_content = new_content.replace("'use client';", "'use client';" + import_statement, 1)
                elif '"use client";' in new_content:
                    new_content = new_content.replace('"use client";', '"use client";' + import_statement, 1)
                else:
                    new_content = import_statement + new_content

            if new_content != content:
                with open(index_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Injected useFormSync into {d}")

if __name__ == "__main__":
    main()
