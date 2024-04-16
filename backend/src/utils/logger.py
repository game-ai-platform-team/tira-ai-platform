def logger(text: str):
    """
    Print text to console with os.system to avoid locking stdout.

    Args:
        text (str): Text to print.
    """
    print(text, flush=True)
