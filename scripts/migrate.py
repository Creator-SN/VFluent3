# %%
import os

SOURCE_DIR = 'C:/Users/Alever Lai/source/repos/VFluent'
TARGET_DIR = 'C:/Users/Alever Lai/source/repos/VFluent3'
COMPONENT = 'AnimatedIcon'

def convert_name(name):
    # 将大写开头的驼峰转成小写开头的驼峰并加上'-': RevealContainer => reveal-container, Button => button
    result = []
    for i, c in enumerate(name):
        if c.isupper() and i > 0:
            result.append(f'-{c.lower()}')
        else:
            result.append(c.lower())
    return ''.join(result)

#############################################################################################################

with open(os.path.join(SOURCE_DIR, 'packages/common-theme', f'{COMPONENT}.scss'), encoding='utf-8') as f:
    common_theme_content_list = f.readlines()

result = []
for line in common_theme_content_list:
    if line.strip().startswith('@mixin'):
        continue
    result.append(line)

result = [f'.fv-{COMPONENT} {{'] + result

with open(os.path.join(TARGET_DIR, 'src/styles/theme/base', convert_name(COMPONENT), 'index.scss'), 'w+', encoding='utf-8') as f:
    f.write(''.join(result))


#############################################################################################################

with open(os.path.join(SOURCE_DIR, 'packages/dark-theme', f'{COMPONENT}.scss'), encoding='utf-8') as f:
    dark_theme_content_list = f.readlines()

result = []
for line in dark_theme_content_list:
    if line.strip().startswith('@import'):
        continue
    if line.strip().startswith('.fv-dark-'):
        continue
    if line.strip().startswith(f'@include fv-{COMPONENT}'):
        continue
    result.append(line)

result = [f'.fv-{COMPONENT} {{'] + ['&.dark {'] + result + ['}']

with open(os.path.join(TARGET_DIR, 'src/styles/theme/dark', convert_name(COMPONENT), 'index.scss'), 'w+', encoding='utf-8') as f:
    f.write(''.join(result))

# %%
#############################################################################################################

with open(os.path.join(SOURCE_DIR, 'examples/docs/zh', f'{COMPONENT}/README.md'), encoding='utf-8') as f:
    dark_theme_content_list = f.readlines()

result = []
keep = False
for line in dark_theme_content_list:
    if line.strip().startswith(f'### {COMPONENT}-DEMO'):
        keep = True
    if keep:
        result.append(line)

result = ['''---
page: true
title: ''' + COMPONENT + '''
--- ''' + '\n'] + result

with open(os.path.join(TARGET_DIR, 'docs/guide/components', convert_name(COMPONENT), 'index.md'), 'w+', encoding='utf-8') as f:
    f.write(''.join(result))

# %%
