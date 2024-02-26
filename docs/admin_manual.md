# Admin manual

## Running the project

To run the project, the easiest way is to have docker installed and running the following in the main directory

```shell
sudo bash buildrun.sh
```

## OpenID configuration

The OIDC part is implemented with flask-OIDC which requires `client_secrets.json` file:

```json
// Staging
{
    "web": {
        "client_id": "<ENTITY_ID_FROM_SP_REGISTER>",
        "client_secret": "<CLIENT_SECRET_FROM_SP_REGISTER>",
        "issuer": "https://login-test.it.helsinki.fi"
    }
}
```
