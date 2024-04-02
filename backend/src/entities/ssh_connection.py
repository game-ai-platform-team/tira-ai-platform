from contextlib import AbstractContextManager
from types import TracebackType

from paramiko import AutoAddPolicy, PKey, SSHClient

from config import HPC_LOGIN_NODE, HPC_SSH_PRIVATE_KEY_PATH, HPC_USERNAME


class SSHConnection(AbstractContextManager):
    def __init__(self, client: SSHClient | None = None) -> None:
        self.__client = client or SSHClient()

        self.__client.set_missing_host_key_policy(AutoAddPolicy())

    def __enter__(self) -> "SSHConnection":
        private_key = PKey.from_path(HPC_SSH_PRIVATE_KEY_PATH)

        self.__client.connect(hostname=HPC_LOGIN_NODE, pkey=private_key, username=HPC_USERNAME)

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

        stdin, stdout, stderr = self.__client.exec_command(command)

        return stdout.readlines()
