from contextlib import AbstractContextManager
from types import TracebackType

from paramiko import AutoAddPolicy, PKey, SSHClient

from config import HPC_LOGIN_NODE, HPC_SSH_PRIVATE_KEY_PATH


class SSHConnection(AbstractContextManager):
    def __init__(self) -> None:
        self.__client = SSHClient()

        self.__client.set_missing_host_key_policy(AutoAddPolicy())

    def __enter__(self) -> "SSHConnection":
        private_key = PKey.from_path(HPC_SSH_PRIVATE_KEY_PATH)

        self.__client.connect(hostname=HPC_LOGIN_NODE, pkey=private_key)

        return self

    def __exit__(
        self,
        __exc_type: type[BaseException] | None,
        __exc_value: BaseException | None,
        __traceback: TracebackType | None,
    ) -> bool | None:
        self.__client.close()

