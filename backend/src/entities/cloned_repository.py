import shutil
from pathlib import Path


class ClonedRepository:
    def __init__(self, path: Path, gitrepo: str):
        self.path = path
        self.gitrepo = gitrepo

    def remove(self):
        shutil.rmtree(self.path)
