# Installation

The project is tested with Cubbli (Ubuntu) 22.04.

## Dependencies

Currently, the following dependencies need to be installed manually.

|Name|Version|Installation|
|-|-|-|
|python|3.10.x|pyenv or apt|
|Poetry|1.8.1|[documentation](https://python-poetry.org/docs/#installation)|
|Node.js|20 (LTS)|[Node.js installation](#nodejs)|
|pNpm|8.15.x|[Node.js installation](#nodejs)|
|docker.io|24.0.5|[Docker installation](#docker)|
|docker-buildx|0.11.2|[Docker installation](#docker)|
|singularity-ce|4.1.2|[Singularity installation](#singularity)|

### Installation

#### Node.js

The easiest method to install pnpm is with Corepack which is installed with Node.js.
See documentation of [pnpm](https://pnpm.io/installation) for other methods.

1. Install Node.js with apt

   ```sh
   sudo apt install nodejs
   ```

2. Install pnpm with Corepack

   ```sh
   sudo corepack enable
   ```

#### Docker

1. Install Docker and BuildKit

   ```sh
   sudo apt install docker.io docker-buildx
   ```

#### Singularity

1. Download `.deb` package from GitHub repository of [Singularity](https://github.com/sylabs/singularity/releases/latest)
2. Install Singularity

   ```sh
   sudo apt install <path_to_singlarity_deb>
   ```
