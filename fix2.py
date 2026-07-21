import re

with open(r'src\services\i18n.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed = 0
out = []

for line in lines:
    original = line
    # Match: key: 'content' with optional trailing comma/comments
    # Uses NON-GREEDY (.+?) to stop at first closing quote
    m = re.search(r"^(\s*[\w_]+\s*:\s*)'(.+?)'(\s*,?.*)$", line)
    if m:
        prefix = m.group(1)   # e.g. "    shareNote: "
        inner = m.group(2)    # the string content
        suffix = m.group(3)   # e.g. ", // comment"
        
        # If there's a single quote INSIDE the content, fix it
        if "'" in inner:
            # Escape any double quotes inside before wrapping with double quotes
            inner = inner.replace('"', '\\"')
            line = prefix + '"' + inner + '"' + suffix
            # Make sure newline is preserved
            if not line.endswith('\n'):
                line += '\n'
            fixed += 1
    
    out.append(line)

with open(r'src\services\i18n.ts', 'w', encoding='utf-8') as f:
    f.writelines(out)

print(f"Fixed {fixed} lines with apostrophe issues")