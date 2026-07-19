import os
import re

page_path = r'd:\WEB DESIGN\LayananDokumen\app\page.tsx'
templates_dir = r'd:\WEB DESIGN\LayananDokumen\components\templates'

with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Extract all href values
hrefs = re.findall(r'href:\s*"/tools/([^"\?]+)', page_content)
hrefs = set(hrefs)

all_templates = set(os.listdir(templates_dir))

missing_in_page = all_templates - hrefs
print('Templates NOT in homepage:', sorted(list(missing_in_page)))

missing_in_templates = hrefs - all_templates
print('In homepage but NOT in templates:', sorted(list(missing_in_templates)))
