# Admin manual

## Running the project

To run the project, the easiest way is to have docker installed and running the following in the main directory

```shell
sudo bash buildrun.sh
```

## OpenID configuration

The OpenID Connect Client is implemented with Authlib which requires

- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET`

These can be defined as environment variables or in `.env.secret` file:

```ini
OIDC_CLIENT_ID=<ENTITY_ID_FROM_SP_REGISTER>
OIDC_CLIENT_SECRET=<CLIENT_SECRET_FROM_SP_REGISTER>
```
