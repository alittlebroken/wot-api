## List All

Get's a list of all components.

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/components
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
| `204`                     | application/json | `{ "status": 204, "state": "ok", "message": "No data to retrieve", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to retrieve list of components", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request GET 'http://localhost:3005/api/v1/components' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTI3NTUsImV4cCI6MTczMjgxMzA1NX0.HJJ84rHQXeZAu4d4dzdQsLgcL77YlcErG5-sDyRQ6F4' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTI3NTUsImV4cCI6MTczMjg5OTE1NX0.jxCBZZxhQHSJT62oLOmzR0UIspe3ODDAjgy32vH3Pkg' \
--data '{
    "column": "owner",
    "value": 2
}'
```

Example response:

```json
{
    "status": 200,
    "state": "ok",
    "message": "",
    "data": [
        {
            "id": 1,
            "name": "Temperature Sensor",
            "owner": 1,
            "description": "23"
        },
        {
            "id": 2,
            "name": "Humidity Sensor",
            "owner": 1,
            "description": "23"
        }
    ]
}
```