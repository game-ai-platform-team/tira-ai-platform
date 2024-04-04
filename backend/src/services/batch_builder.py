from pathlib import Path

from config import TEMP_DIR

BATCH_CONFIG = {
    "cluster": "ukko",
    "memory": "4G",
    "partition": "short",
    "cpu": 1,
    "time": "00:10:00",
}


class BatchBuilder:
    @staticmethod
    def create_script(
        game: str, repository_url: str, difficulty: int, id_: str
    ) -> Path:
        environment_variables = {
            "GAME": game,
            "REPOSITORY_URL": repository_url,
            "DIFFICULTY": difficulty,
        }
        environment_variable_pairs = ",".join(
            f"{key}={value}" for key, value in environment_variables.items()
        )

        script = "\n".join(
            [
                "#!/bin/bash",
                f"#SBATCH -M {BATCH_CONFIG['cluster']}",
                f"#SBATCH -p {BATCH_CONFIG['partition']}",
                f"#SBATCH --mem {BATCH_CONFIG['memory']}",
                f"#SBATCH -t {BATCH_CONFIG['time']}",
                f"#SBATCH -t {BATCH_CONFIG['cpu']}",
                f"#SBATCH -o result-{id_}.txt",
                f"#SBATCH --export={environment_variable_pairs}",
                "echo 'Hello world!'",
            ]
        )

        script_path = TEMP_DIR / f"batch-{id_}.sh"

        with open(script_path, mode="w", encoding="utf-8") as file:
            file.write(script)

        return script_path
