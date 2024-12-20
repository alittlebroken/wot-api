## List One
List an individual measurement

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/measurements/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The identifier of the required measurement. |


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
| `204`                     | application/json | `{ "status": 204, "state": "fail", "message": "No measurements found", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/measurements/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDg5ODQsImV4cCI6MTczMzQwOTI4NH0.UtGMmCpHmYiPtsbY1Tfdd7EAJt-lL53sAT9J18ZI_Q0' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDg5ODQsImV4cCI6MTczMzQ5NTM4NH0.5qORuiStJAPt4_Kyrva0hrZ9aZ-nDiKg_SlR8l2aM_o'
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
            "device_id": 3,
            "component_id": 2,
            "value": "68",
            "logged": "2024-11-13T11:42:15.000Z",
            "created_at": "2024-11-19T10:30:40.467Z",
            "edited_at": null
        }
    ]
}
```