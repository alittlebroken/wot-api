## List All
Lists all users

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/users
```

Supported attributes:

`none`


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
curl --location 'http://localhost:3005/api/v1/users' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTUwMzcsImV4cCI6MTczMzQxNTMzN30.V9pBaKQVTAnsUPeqPYuqgn1Pmp2967NFJ6swADl0uZw' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTUwMzcsImV4cCI6MTczMzUwMTQzN30.HiPOM8NlXHm76Wrf-gbY5gUmeaGp3B0VhkDMqjlV_rI'
```

Example response:

```json
{
    "status": 200,
    "state": "ok",
    "message": "",
    "data": [
        {
            "id": 2,
            "display_name": "Tom",
            "username": "usertom@googlemail.com",
            "last_logon": null,
            "verified": 0,
            "locked": 0
        },
        {
            "id": 3,
            "display_name": "Jerry",
            "username": "userjerry@googlemail.com",
            "last_logon": null,
            "verified": 0,
            "locked": 0
        }
    ]
}
```