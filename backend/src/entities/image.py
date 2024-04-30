import os
from pathlib import Path

from config import IMAGE_DIR, TEMP_DIR
from entities.ssh_connection import SSHConnection


class Image:
    """
    Class representing a runnable game image without network.
    """

    def __init__(self) -> None:
        os.system(f"docker build {IMAGE_DIR} -t game-image")
        os.system(
            f"singularity build --force {TEMP_DIR / 'game-image.sif'} docker-daemon://game-image"
        )

    @property
    def path(self) -> Path:
        return TEMP_DIR / "game-image.sif"

    def remove(self):
        os.system(f"docker rmi $(docker images | grep game-image)")
        self.path.unlink(missing_ok=True)
        with SSHConnection() as connection:
            connection.remove(Path("game-image.sif"))
