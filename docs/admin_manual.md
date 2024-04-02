# Admin manual

## Configuration

All configurations can be defined as environment variables or in `backend/.env` and `backend/.env.secret`.

### `.env`

|Name|Default|Required|
|-|-|-|
|`OIDC_REDIRECT_PATH`|`https://localhost:5000`|✅|
|`HPC_SSH_PRIVATE_KEY_PATH` [^hpc_private_key]|`backend/hpc_private_key`|❌|
|`TEMP_DIR`|`~/temp`|❌|
|`DEFAULT_CHESS_AI_FILENAME`|`chess_ai.py`|❌|
|`DEFAULT_CHESS_AI_PATH`|`backend/src/DEFAULT_CHESS_AI_FILENAME`|❌|
|`DEFAULT_CHESS_TIMEOUT`|`5`|❌|

### `.env.secret`

|Name|Required|
|-|-|
|`OIDC_CLIENT_ID` [^oidc_sp_registry]|✅|
|`OIDC_CLIENT_SECRET` [^oidc_sp_registry]|✅|
|`HPC_LOGIN_NODE`|✅|
|`HPC_USERNAME`|✅|

[^oidc_sp_registry]: The OpenID Connect (OIDC) secrets need to be configured in [Service Provider Registry](https://sp-registry.it.helsinki.fi/).
[^hpc_private_key]: Default algorithm is Ed25519
