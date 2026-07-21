with open(r'src\services\i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_lines = []
fixed_count = 0

for line in content.split('\n'):
    original = line
    new_line = []
    i = 0
    in_string = False
    string_content = []
    
    while i < len(line):
        char = line[i]
        
        if char == "'" and (i == 0 or line[i-1] != '\\'):
            if not in_string:
                in_string = True
                string_content = []
            else:
                # End of single-quoted string
                content = ''.join(string_content)
                # Escape any double quotes inside before wrapping with double quotes
                content = content.replace('"', '\\"')
                new_line.append('"' + content + '"')
                in_string = False
        elif in_string:
            string_content.append(char)
        else:
            new_line.append(char)
        
        i += 1
    
    # If unclosed string at end of line, append whatever we collected
    if in_string:
        new_line.append("'" + ''.join(string_content))
    
    new_line_str = ''.join(new_line)
    if new_line_str != original:
        fixed_count += 1
    new_lines.append(new_line_str)

with open(r'src\services\i18n.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print(f"Fixed {fixed_count} lines")