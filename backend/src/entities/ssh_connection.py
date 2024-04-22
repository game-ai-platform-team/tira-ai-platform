from contextlib import AbstractContextManager
from pathlib import Path
from types import TracebackType

from paramiko import AutoAddPolicy, PKey, SSHClient

from config import HPC_LOGIN_NODE, HPC_SSH_PRIVATE_KEY_PATH, HPC_USERNAME


class SSHConnection(AbstractContextManager):
    def __init__(
        self,
        client: SSHClient | None = None,
        private_key: PKey | None = None,
        hostname: str = HPC_LOGIN_NODE,
        username: str = HPC_USERNAME,
    ) -> None:
        self.__client: SSHClient = client or SSHClient()
        self.__private_key: PKey = private_key or PKey.from_path(
            HPC_SSH_PRIVATE_KEY_PATH
        )
        self.__hostname: str = hostname
        self.__username: str = username

        self.__client.set_missing_host_key_policy(AutoAddPolicy())

    def __enter__(self) -> "SSHConnection":
        self.__client.connect(
            hostname=self.__hostname, pkey=self.__private_key, username=self.__username
        )

        return self

    def __exit__(
        self,
        __exc_type: type[BaseException] | None,
        __exc_value: BaseException | None,
        __traceback: TracebackType | None,
    ) -> bool | None:
        self.__client.close()

    def execute(self, command: str) -> list[str]:
        """
        Executes a command and returns stdout as list of strings.

        Args:
            command (str): Command to be executed.

        Returns:
            list[str]: stdout as list of strings.
        """

        _, stdout, _ = self.__client.exec_command(f"bash -l -c '{command}'")

        return stdout.readlines()

    def read_file(self, path: Path) -> list[str]:
        """
        Read remote file.

        Args:
            path (Path): Path to remote file.

        Returns:
            list[str]: Lines of the file.
        """

        data = []

        with self.__client.open_sftp().file(str(path)) as content:
            data = content.readlines()

        return data

    def send_file(self, file: Path) -> Path:
        """
        Sends file to remote.

        Args:
            file (Path): Path to local file.

        Returns:
            Path: Remote path of sent file.
        """

        remote_path = Path(file.name)

        with self.__client.open_sftp() as client:
            client.put(file, str(remote_path))

        return remote_path
