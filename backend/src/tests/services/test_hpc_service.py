from pathlib import Path
from unittest import TestCase
from unittest.mock import MagicMock, Mock, mock_open, patch

from config import TEMP_DIR
from services.hpc_service import HPCService


class TestHPCService(TestCase):
    def setUp(self) -> None:
        self.connection = MagicMock()
        self.id_ = "id1234"
        self.hpc_service = HPCService(self.connection, self.id_)
        self.batch_path = TEMP_DIR / f"batch-{self.id_}.sh"

        self.batch_path.unlink(missing_ok=True)

    def tearDown(self) -> None:
        self.batch_path.unlink(missing_ok=True)

    def test_output_path(self):
        self.assertEqual(self.hpc_service.output_path, Path(f"result-{self.id_}.txt"))

    def test_batch_path(self):
        self.assertEqual(self.hpc_service.batch_path, self.batch_path)

    def test_enter_starts_connection(self):
        with self.hpc_service:
            self.connection.__enter__.assert_called_once()

    def test_enter_creates_output_file(self):
        with self.hpc_service as hpc:
            self.connection.execute.assert_called_once_with(f"touch {hpc.output_path}")

    def test_exit_closes_connection(self):
        with self.hpc_service:
            pass

        self.connection.__exit__.assert_called_once()

    @patch.object(Path, "unlink")
    def test_exit_deletes_batch_file(self, mock_unlink: Mock):
        with self.hpc_service:
            pass

        mock_unlink.assert_called_once()

    def test_submit_sends_image(self):
        image = Mock()

        with self.hpc_service as hpc:
            hpc.submit(image)

        self.connection.send_file.assert_any_call(image)

    @patch.object(
        HPCService, "_HPCService__create_script", lambda x, y: Path("batch_path")
    )
    def test_submit_sends_batch_file(self):
        with self.hpc_service as hpc:
            hpc.submit(Mock())

        self.connection.send_file.assert_any_call(Path("batch_path"))

    def test_submit_writes_batch_file(self):
        with patch("builtins.open", mock_open(read_data="data")) as mock_file:
            self.hpc_service.submit(Mock())

        mock_file.assert_called_with(self.batch_path, mode="w", encoding="utf-8")

    def read_output_returns_all_lines_first_time(self):
        connection = Mock()
        hpc_service = HPCService(connection)
        lines = ["line"] * 6

        connection.read_file.return_value = [lines]

        self.assertEqual(hpc_service.read_output(), lines)

    def test_read_output_remembers_position(self):
        connection = Mock()
        hpc_service = HPCService(connection)
        lines = [f"line {i}" for i in range(7)]

        connection.read_file.side_effect = [lines[:2], lines[:3], lines[:6]]

        self.assertEqual(hpc_service.read_output(), ["line 0", "line 1"])
        self.assertEqual(hpc_service.read_output(), ["line 2"])
        self.assertEqual(hpc_service.read_output(), ["line 3", "line 4", "line 5"])
