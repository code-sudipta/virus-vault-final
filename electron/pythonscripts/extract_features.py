import pefile
import os
import math
import sys

def calculate_entropy(data):
    """
    Calculate the Shannon entropy of a given byte string.

    This function takes a byte string as input and returns its Shannon entropy.

    The Shannon entropy is a measure of the amount of uncertainty or randomness in a probability distribution.
    It is typically denoted by the symbol H and is measured in units of bits.

    In this implementation, the input data is treated as a probability distribution over 256 possible values.
    The entropy is then calculated as the negative sum of each probability multiplied by its logarithm base 2.

    If the input data is empty, the function returns 0.

    Parameters
    ----------
    data : bytes
        The input byte string

    Returns
    -------
    float
        The Shannon entropy of the input data
    """

    if not data:
        return 0
    occurences = [0] * 256
    for byte in data:
        occurences[byte] += 1
    entropy = -sum((count / len(data)) * math.log2(count / len(data)) for count in occurences if count)
    return entropy

def extract_pe_features(file_path):
    """
    Extract features from a PE file.

    This function takes a file path as input and returns a dictionary of features extracted from the PE file.

    The features include the size of the code, the size of the initialized data, the address of the entry point, the image base, the subsystem, the DLL characteristics, the size of the stack reserve, the size of the heap reserve, and the number of RVA and sizes.

    It also includes the mean, minimum, and maximum entropy of the sections, as well as the number of imported DLLs, the number of imported APIs, the number of exported APIs, the number of resources, and the mean, minimum, and maximum entropy of the resources.

    If the input file is not a valid PE file, the function returns a string indicating the error.

    Parameters
    ----------
    file_path : str
        The path to the PE file

    Returns
    -------
    dict or str
        A dictionary of features extracted from the PE file, or a string indicating the error
    """
    if not os.path.exists(file_path):
        return "File not found."
    
    try:
        pe = pefile.PE(file_path)
        
        features = {
            "SizeOfCode": pe.OPTIONAL_HEADER.SizeOfCode,
            "SizeOfInitializedData": pe.OPTIONAL_HEADER.SizeOfInitializedData,
            "AddressOfEntryPoint": pe.OPTIONAL_HEADER.AddressOfEntryPoint,
            "ImageBase": pe.OPTIONAL_HEADER.ImageBase,
            "Subsystem": pe.OPTIONAL_HEADER.Subsystem,
            "DllCharacteristics": pe.OPTIONAL_HEADER.DllCharacteristics,
            "SizeOfStackReserve": pe.OPTIONAL_HEADER.SizeOfStackReserve,
            "SizeOfHeapReserve": pe.OPTIONAL_HEADER.SizeOfHeapReserve,
            "NumberOfRvaAndSizes": pe.OPTIONAL_HEADER.NumberOfRvaAndSizes,
        }

        # Sections entropy
        sections_entropy = [calculate_entropy(section.get_data()) for section in pe.sections]
        features.update({
            "SectionsMeanEntropy": sum(sections_entropy) / len(sections_entropy) if sections_entropy else 0,
            "SectionsMinEntropy": min(sections_entropy, default=0),
            "SectionsMaxEntropy": max(sections_entropy, default=0),
        })

        # Import details
        imports_nb_dll = len(pe.DIRECTORY_ENTRY_IMPORT) if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT') else 0
        imports_nb = sum(len(entry.imports) for entry in pe.DIRECTORY_ENTRY_IMPORT) if imports_nb_dll else 0
        features.update({
            "ImportsNbDLL": imports_nb_dll,
            "ImportsNb": imports_nb,
        })

        # Export details
        exports_nb = len(pe.DIRECTORY_ENTRY_EXPORT.symbols) if hasattr(pe, 'DIRECTORY_ENTRY_EXPORT') else 0
        features.update({"ExportsNb": exports_nb})

        # Resource details
        resources_entropy = []
        resources_nb = 0

        if hasattr(pe, 'DIRECTORY_ENTRY_RESOURCE'):
            for resource_type in pe.DIRECTORY_ENTRY_RESOURCE.entries:
                if hasattr(resource_type, "directory"):
                    for resource_id in resource_type.directory.entries:
                        if hasattr(resource_id, "directory"):
                            for resource_lang in resource_id.directory.entries:
                                if hasattr(resource_lang, "data"):
                                    data_rva = resource_lang.data.struct.OffsetToData
                                    size = resource_lang.data.struct.Size
                                    resource_data = pe.get_data(data_rva, size)
                                    resources_entropy.append(calculate_entropy(resource_data))
                                    resources_nb += 1
        
        features.update({
            "ResourcesNb": resources_nb,
            "ResourcesMeanEntropy": sum(resources_entropy) / len(resources_entropy) if resources_entropy else 0,
            "ResourcesMinEntropy": min(resources_entropy, default=0),
            "ResourcesMaxEntropy": max(resources_entropy, default=0),
        })

        # Version Information Size
        version_info_size = len(pe.FileInfo) if hasattr(pe, 'FileInfo') else 0
        features.update({"VersionInformationSize": version_info_size})

        return features

    except Exception as e:
        return f"Error processing file: {e}"

# Example usage:

print(extract_pe_features(sys.argv[1]))
# print(extract_pe_features("E:\Sohan JAVA\calculator.class"))
