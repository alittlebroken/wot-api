## List One
List a particular user

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/users/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the user we wish to see. |

If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the list of components found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `204`                     | application/json | `{ "status": 204, "state": "fail", "message": "No users found", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "No users found", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/users/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzQwMDYzODYsImV4cCI6MTczNDAwNjY4Nn0.m2My19H00HFNxU62ueUru7WlKKs00Wt9ykc3zGP_IBw' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzQwMDYzODYsImV4cCI6MTczNDA5Mjc4Nn0.db_Z-SqzGwsUEolbhPtTIhbRMy6yGZXIZgMKsczUSO0'
```

Example response:

```json
{
    "status": 200,
    "state": "ok",
    "message": "",
    "data": [
        {
            "id": 3,
            "display_name": "User Three",
            "username": "usert@user.com",
            "password": "$2b$10$pk82zeSaPgaKRQ8X7QMaR.gUVQXwGLycWdrhlQqamPW5ezvQVLIjY",
            "last_logon": null,
            "verified": 0,
            "locked": 0
        }
    ]
}
```