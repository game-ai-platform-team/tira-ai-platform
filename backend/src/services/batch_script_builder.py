from pathlib import Path


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
        script = [
            "#!/bin/bash",
            f"#SBATCH -M {BATCH_CONFIG['cluster']}",
            f"#SBATCH -p {BATCH_CONFIG['partition']}",
            f"#SBATCH --mem {BATCH_CONFIG['memory']}",
            f""
        ]
