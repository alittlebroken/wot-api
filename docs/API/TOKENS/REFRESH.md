## Refresh
Refreshes the users access token

`MUST be logged in to access this resource`

```plaintext
POST /api/v1/tokens/refresh
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The ID of the measurement being removed. |


If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | The newly generated access token for the logged in user. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "No refresh token set", "data": []}`|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "Invalid refresh token sent", "data": []}`|
| `500`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to generate new access token", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request POST 'http://localhost:3005/api/v1/tokens/refresh' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTQwNzAsImV4cCI6MTczMzQxNDM3MH0.P_qerScIKavVEZtvAQExI39W24-aVeg0Kdd9Ck3gpVo' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTQwNzAsImV4cCI6MTczMzUwMDQ3MH0.-avIM8aN9lXhR_2BXwQzAw_Pnn9usJb1D2A-rPFvHqQ'
```

Example response:

```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJpYXQiOjE3MzM0MTQyNjYsImV4cCI6MTczMzQxNDU2Nn0.eGkZGUG4j5awUzv47pSGtJ0jjU9GLEAZugHqmXKRn60
```