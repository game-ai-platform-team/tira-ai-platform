from pathlib import Path

from config import TEMP_DIR


BATCH_CONFIG = {
    "cluster": "ukko",
    "memory": "4G",
    "partition": "short",
    "cpu": 1,
    "time": "00:10:00",
}


class BatchScriptBuilder:
    @staticmethod
    def create_script(repository_url: str, game: str, id: str) -> Path:
        script = "\n".join(
            [
                "#!/bin/bash",
                f"#SBATCH -M {BATCH_CONFIG['cluster']}",
                f"#SBATCH -p {BATCH_CONFIG['partition']}",
                f"#SBATCH --mem {BATCH_CONFIG['memory']}",
                f"#SBATCH -t {BATCH_CONFIG['time']}",
                f"#SBATCH -t {BATCH_CONFIG['cpu']}",
                f"#SBATCH -o result-{id}.txt",
                f"#SBATCH --export=REPOSITORY_URL={repository_url},GAME={game}",
                "echo 'Hello world!'",
            ]
        )

        script_path = TEMP_DIR / f"batch-{id}.sh"

        with open(script_path, mode="w", encoding="utf-8") as file:
            file.write(script)

        return script_path
