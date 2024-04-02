from unittest import TestCase
from unittest.mock import Mock

from entities.ssh_connection import SSHConnection


class TestSSHConnection(TestCase):
    def setUp(self) -> None:
        self.client_mock = Mock()
        self.key_mock = Mock()
        self.connection = SSHConnection(
            client=self.client_mock,
            private_key=self.key_mock,
            hostname="testhost",
            username="testuser",
        )

    def test_enter_starts_connection(self):
        with self.connection:
            pass

        self.client_mock.connect.assert_called_once_with(
            pkey=self.key_mock,
            hostname="testhost",
            username="testuser",
        )

    def test_exit_closes_connection(self):
        with self.connection:
            pass

        self.client_mock.close.assert_called_once()

    def test_execute_returns_stdin(self):
        output_mock = [Mock()] * 3

        output_mock[1].readlines.side_effect = [["Hello"]]

        self.client_mock.exec_command.side_effect = [output_mock]

        with self.connection as connection:
            output = connection.execute("echo hello")

        self.assertEqual(output, ["Hello"])
