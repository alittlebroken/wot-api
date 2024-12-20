## Logout

Logs the user out of the system, removing any refresh tokens assigned.

Requires you to be logged in to use this route.

```plaintext
POST /api/v1/auth/logout
```

Supported attributes: 

`none`

If successful, returns ['200'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | An access token for the user which has a default expiration of 5 minutes. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Invalid refresh token supplied", "data": []}`|
| `404`                     | application/json | `{ "status": 404, "state": "fail", "message": "No valid refresh token found", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "Problem logging out user", "data": []}`|

Example request:

```shell
curl --location --request POST 'http://localhost:3005/api/v1/auth/logout' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcxNTUsImV4cCI6MTczMjc4NzQ1NX0.ostNn4ZR_GvDsCouyDYMbK_BrhiKVZPgGQT2icgn0GA' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcxNTUsImV4cCI6MTczMjg3MzU1NX0.uy1Le7WevfmDsIO8tf0rWGeW_ejCsO6rODsWyADTHnA' \
--data ''
```

Example response:

```json
{
    "status": 401,
    "state": "fail",
    "message": "Must be logged in to access this resource",
    "data": []
}
```