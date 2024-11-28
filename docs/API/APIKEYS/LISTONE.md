## List One

Retrieves one API key that macthes the passed in id.

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/apikeys/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the key you wish to view. |

If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the api key found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `204`                     | application/json | `{ "status": 204, "state": "ok", "message": "Unable to find any keys", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Problem whilst accessing resource", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/apikeys/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MDUyMjQsImV4cCI6MTczMjgwNTUyNH0.uuT92OthhuqQ2DHCmKvNC0fSTSGmSmjAI6IrXDVTCLQ' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MDUyMjQsImV4cCI6MTczMjg5MTYyNH0._trzUxZ1BQumVlwhaCFlbKl9MamG2VpuXHLKuH6oSi0'
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
            "owner": 1,
            "device_id": 3,
            "key": "y9aVa0I8oPENNTaqJOplaxDYNEv",
            "created_at": "2024-11-19T10:30:15.643Z"
        }
    ]
}
```