import os

def generate_project_structure(dir_path, prefix=''):
    """
    Generate the project structure for the given directory path, excluding 'node_modules' directories.

    :param dir_path: Directory path to generate the project structure for.
    :param prefix: Prefix used for indenting the structure to represent hierarchy.
    """
    structure = []

    for item in sorted(os.listdir(dir_path)):
        path = os.path.join(dir_path, item)
        if os.path.isdir(path):
            if item == 'node_modules':
                continue  # Skip 'node_modules' directories
            structure.append(prefix + item + '/')
            structure.extend(generate_project_structure(path, prefix + '--'))
        else:
            structure.append(prefix + item)

    return structure

def save_structure_to_file(structure, file_name):
    """
    Save the generated structure to a file.

    :param structure: List of strings representing the project structure.
    :param file_name: Name of the file to save the structure.
    """
    with open(file_name, 'w') as file:
        file.write('\n'.join(structure))

# The directory of the script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Generate the project structure
project_structure = generate_project_structure(script_directory)

# Save the structure to a file in the same directory as the script
save_structure_to_file(project_structure, os.path.join(script_directory, 'project_structure.txt'))

print("Project structure saved to 'project_structure.txt'")
