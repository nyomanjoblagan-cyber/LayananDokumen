import os
import glob

def clean_break_inside():
    base_dir = r'D:\WEB DESIGN\LayananDokumen\components\templates'
    files = glob.glob(os.path.join(base_dir, '**', 'index.tsx'), recursive=True)
    
    files_modified = 0
    total_removals = 0
    
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
        new_lines = []
        modified = False
        removals_in_file = 0
        
        for line in lines:
            if 'break-inside-avoid' in line:
                # Cek apakah ini area tanda tangan
                is_signature_area = ('justify-' in line) or ('grid' in line) or ('TANDA TANGAN' in line.upper()) or ('TANDATANGAN' in line.upper())
                
                # Kita pertahankan jika ini area tanda tangan atau jika ada p1Name/penerimaName dalam block (terlalu spesifik)
                # Lebih aman: hapus jika ini adalah block teks besar (text-justify, mb-8, mb-6, dll)
                # atau hapus jika BUKAN area tanda tangan.
                if not is_signature_area:
                    original = line
                    line = line.replace(' break-inside-avoid', '')
                    line = line.replace('break-inside-avoid ', '')
                    line = line.replace('break-inside-avoid', '')
                    
                    if line != original:
                        modified = True
                        removals_in_file += 1
                        total_removals += 1
                        
            new_lines.append(line)
            
        if modified:
            with open(f, 'w', encoding='utf-8') as file:
                file.writelines(new_lines)
            files_modified += 1
            print(f"Fixed {os.path.basename(os.path.dirname(f))} (Removed {removals_in_file})")

    print(f"\nTotal Files Modified: {files_modified}")
    print(f"Total 'break-inside-avoid' Destroyed: {total_removals}")

if __name__ == '__main__':
    clean_break_inside()
