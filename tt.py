import os

def generate_project_structure(directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(directory):
            # 排除名为node_modules的文件夹和.git文件夹
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            if '.git' in dirs:
                dirs.remove('.git')

            level = root.replace(directory, '').count(os.sep)
            indent = '    ' * level
            f.write(f"{indent}[{os.path.basename(root)}]\n")
            subindent = '    ' * (level + 1)
            for file in files:
                f.write(f"{subindent}{file}\n")

directory = r'C:\Users\vic\Desktop\vue_3_electron_boilerplate'
output_file = r'C:\Users\vic\Desktop\project_structure.txt'

generate_project_structure(directory, output_file)
