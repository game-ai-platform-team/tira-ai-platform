# Admin manual

## Install

### Back-end

Install dependencies in `./backend`:

```sh
poetry install
```

### Front-end

Install dependencies in `./frontend`:

```sh
pnpm install
```

## Configuration

All configurations can be defined as environment variables or in `backend/.env` and `backend/.env.secret`.

### `.env`

| Name                                          | Default                                 | Required |
|-----------------------------------------------|-----------------------------------------|----------|
| `OIDC_REDIRECT_PATH`[^feat_login]                          | `https://localhost:5000`                | ✅        |
| `HPC_SSH_PRIVATE_KEY_PATH` [^hpc_private_key] | `backend/hpc_private_key`               | ❌        |
| `TEMP_DIR`                                    | `~/temp`                                | ❌        |
| `DEFAULT_GAME_TIMEOUT`                       | `60`                                     | ❌        |

### `.env.secret`

| Name                                     | Required |
|------------------------------------------|----------|
| `OIDC_CLIENT_ID` [^oidc_sp_registry][^feat_login]     | ✅        |
| `OIDC_CLIENT_SECRET` [^oidc_sp_registry][^feat_login] | ✅        |
| `HPC_LOGIN_NODE`                         | ✅        |
| `HPC_USERNAME`                           | ✅        |

## Algolabra

Algolabra (algolabra.cs.helsinki.fi) is the machine the server runs on. Use an SSH connection to connect there with credentials from an admistrator. After that, check out `/var/www/tira-ai-platform` for the project.

### Running the project

The relevant version of the project resides in `/var/www/tira-ai-platform`. There's a script there name `buildrun.sh`, the running of which will initialise a detached process that sets up the project for the URL https://algolabra.cs.helsinki.fi

### Updating the project

The standard workflow for updating the project is done through `buildrun.sh`. Push your changes into the tira-ai-platform repository and run the script. If you want to implement changes locally, simply implement them and run the script.

## HPC

The project utilises a high-performance computing (HPC) environment from the University of Helsinki.

[^oidc_sp_registry]: The OpenID Connect (OIDC) secrets need to be configured in [Service Provider Registry](https://sp-registry.it.helsinki.fi/).
[^hpc_private_key]: Default algorithm is Ed25519
[^feat_login]: See [#24](https://github.com/game-ai-platform-team/tira-ai-platform/issues/24)
