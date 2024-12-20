## List All

Get's a list of all API keys assigned to devices.

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/apikeys
```

Supported attributes:

`none`

If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the list of api keys found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `204`                     | application/json | `{ "status": 204, "state": "ok", "message": "Unable to find any keys", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Problem whilst accessing resource", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/apikeys' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3OTQxMDgsImV4cCI6MTczMjc5NDQwOH0.SwEB9ZUmLWDCoCSID6aYJ_8xFFTd_JoH9P2cF1tNXIc' \
--data ''
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
            "owner": 1,
            "device_id": 1,
            "key": "eVxobcNEKjGrtUbofqAkIie7DCawNNV",
            "created_at": "2024-11-19T10:27:15.424Z"
        },
        {
            "id": 3,
            "owner": 1,
            "device_id": 3,
            "key": "y9aVa0I8oPENNTaqJOplaxDYNEv",
            "created_at": "2024-11-19T10:30:15.643Z"
        }
    ]
}
```