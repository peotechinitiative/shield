import re

with open(r'src\services\i18n.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed = 0
out = []

for line in lines:
    m = re.search(r"^(\s*[\w_]+\s*:\s*)'(.+)'(\s*,?\s*)$", line)
    if m and "'" in m.group(2):
        line = m.group(1) + '"' + m.group(2) + '"' + m.group(3) + '\n'
        fixed += 1
    out.append(line)

with open(r'src\services\i18n.ts', 'w', encoding='utf-8') as f:
    f.writelines(out)

print(f"Fixed {fixed} lines")