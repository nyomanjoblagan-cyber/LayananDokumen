import os

task_md_path = r'C:\Users\RECEIVING\.gemini\antigravity\brain\195a7489-f6bc-423a-bde4-a4cd2bb12c2c\task.md'
templates_dir = r'd:\WEB DESIGN\LayananDokumen\components\templates'

with open(task_md_path, 'r', encoding='utf-8') as f:
    task_content = f.read()

task_items = set()
for line in task_content.split('\n'):
    if '`' in line:
        try:
            name = line.split('`')[1]
            task_items.add(name)
        except:
            pass

all_templates = set(os.listdir(templates_dir))
missing = all_templates - task_items
print('Templates not in task.md:', sorted(list(missing)))
