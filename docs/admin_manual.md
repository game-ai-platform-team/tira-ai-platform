# Admin manual

## Install

Configure environment according to [installation](/docs/installation.md) documentation.

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

Currently only AD users can be added to HPC.
To setup SSH connection to HPC for the project:

1. Generate [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key).
2. Copy the public key to HPC with [ssh-copy-id](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key).
3. Copy the private key to `HPC_SSH_PRIVATE_KEY_PATH`.
   If permission are too open, change the permissions to `rw-------` with `chmod`.

[^oidc_sp_registry]: The OpenID Connect (OIDC) secrets need to be configured in [Service Provider Registry](https://sp-registry.it.helsinki.fi/).
[^hpc_private_key]: Default algorithm is Ed25519
[^feat_login]: See [#24](https://github.com/game-ai-platform-team/tira-ai-platform/issues/24)
