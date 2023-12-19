import os

def generate_project_structure(dir_path, prefix=''):
    """
    Generate the project structure for the given directory path, excluding 'node_modules', 'build', and 'dist' directories.

    :param dir_path: Directory path to generate the project structure for.
    :param prefix: Prefix used for indenting the structure to represent hierarchy.
    """
    structure = []

    for item in sorted(os.listdir(dir_path)):
        path = os.path.join(dir_path, item)
        if os.path.isdir(path):
            if item in ['node_modules', 'build', 'dist']:
                continue  # Skip specified directories
            structure.append(prefix + item + '/')
            structure.extend(generate_project_structure(path, prefix + '--'))
        else:
            structure.append(prefix + item)

    return structure

def read_and_combine_files(directory):
    combined_content = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'build', 'dist']]
        for filename in files:
            if filename in ["package-lock.json", ".gitignore", "builder-debug.yml", 
                            "builder-effective-config.yaml", "latest.yml"]:
                continue
            if "licenses" in filename.lower():
                continue
            file_path = os.path.join(root, filename)
            combined_content.append(f"----{filename}----")
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                    combined_content.append(content)
            except UnicodeDecodeError:
                combined_content.append(f"{filename} is a non-text file")
            except Exception as e:
                combined_content.append(f"Error reading file: {e}")

    return combined_content

def save_to_file(project_structure, combined_content, file_name):
    """
    Save the generated structure and combined file content to a file.

    :param project_structure: List of strings representing the project structure.
    :param combined_content: List of strings representing the combined file content.
    :param file_name: Name of the file to save the content.
    """
    with open(file_name, 'w', encoding='utf-8') as file:
        file.write('\n'.join(project_structure) + '\n\n')
        file.write('\n'.join(combined_content))

# The directory of the script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Generate the project structure
project_structure = generate_project_structure(script_directory)

# Read and combine file contents
combined_content = read_and_combine_files(script_directory)

# Save both the structure and combined content to a file
save_to_file(project_structure, combined_content, os.path.join(script_directory, 'project_structure.txt'))

print("Project structure and file contents saved to 'project_structure.txt'")
