### Refresh

Requests a new access token for the logged in user

Requires you to be logged in to use this route.

```plaintext
POST /api/v1/auth/refresh
```

Supported attributes: 

`none`

If successful, returns ['200'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | A new access tokenfor the user which has a default expiration of 5 minutes. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "Unauthorised access. Please login", "data": []}`|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "Problem verifying refresh token. Please login.", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": <varies based on error raised>, "data": []}`|

Example request:

```shell
curl --location --request POST 'http://localhost:3005/api/v1/auth/refresh' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI1NDU4MTUsImV4cCI6MTczMjU0NjExNX0.XyTmtQZ2UEGK_989jRpBMF2gnDphrUu3SEd3hs-F4ps' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcyNDgsImV4cCI6MTczMjg3MzY0OH0.RKahLVNy2nV5ak0bUtdH5N0QM-dJvUF9hiWKf-hgt9s'
```

Example response:

```html
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheV9uYW1lIjoiUGF1bCIsInVzZXJuYW1lIjoicGxvY2t5ZXJAZ29vZ2xlbWFpbC5jb20iLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODgzMTMsImV4cCI6MTczMjc4ODYxM30._2CgcsxDQraz88Xgh2E7cDSSHH1bh8ZqliwrEn8oVdQ"
```