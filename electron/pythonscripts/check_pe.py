import sys

def is_valid_pe(file_path):
    """Check if the file is a valid PE file by reading the first two bytes (MZ header)."""
    try:
        with open(file_path, "rb") as f:
            return f.read(2) == b"MZ"
    except Exception:
        return False

print(is_valid_pe(sys.argv[1]))