import os
import glob

def audit():
    base_dir = r'D:\WEB DESIGN\LayananDokumen\components\templates'
    files = glob.glob(os.path.join(base_dir, '**', 'index.tsx'), recursive=True)
    
    total_files = len(files)
    files_with_avoid = 0
    high_count_files = []
    
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            count = content.count('break-inside-avoid')
            if count > 0:
                files_with_avoid += 1
                if count > 3:  # If more than 3, it's highly likely they overused it
                    high_count_files.append((f, count))
    
    print(f"Total Templates Checked: {total_files}")
    print(f"Templates with 'break-inside-avoid': {files_with_avoid}")
    print(f"Templates with >3 'break-inside-avoid' (Red Flags): {len(high_count_files)}")
    
    high_count_files.sort(key=lambda x: x[1], reverse=True)
    for f, count in high_count_files[:10]:
        print(f"  {count} occurrences -> {os.path.basename(os.path.dirname(f))}")

if __name__ == '__main__':
    audit()
