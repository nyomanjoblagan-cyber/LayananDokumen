import os
import re

def main():
    templates_dir = r"d:\WEB DESIGN\LayananDokumen\components\templates"
    
    premium_documents = [
        "wasiat", "kontrak-kerja", "joint-venture", "mou", "franchise", 
        "jual-beli-tanah", "jual-beli-kendaraan", "sewa-rumah", "sewa-kendaraan", 
        "business-plan", "perjanjian-damai", "nda", "hibah", "hutang"
    ]

    for d in os.listdir(templates_dir):
        index_path = os.path.join(templates_dir, d, "index.tsx")
        if os.path.isfile(index_path):
            with open(index_path, "r", encoding="utf-8") as f:
                content = f.read()

            target_price = "10000" if d in premium_documents else "5000"
            
            # Replace price={X} with price={target_price}
            new_content = re.sub(r'price=\{\d+\}', f'price={{{target_price}}}', content)

            if new_content != content:
                with open(index_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {d} to Rp {target_price}")

if __name__ == "__main__":
    main()
