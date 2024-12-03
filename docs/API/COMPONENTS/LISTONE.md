## List One

Get's a component specified by the supplied id.

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/components
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the component you are interested in. |

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
| `204`                     | application/json | `{ "status": 204, "state": "ok", "message": "Component not found", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to retrieve components", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request GET 'http://localhost:3005/api/v1/components/1' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMTExMDIsImV4cCI6MTczMzIxMTQwMn0.KHAkWSBB8XXXIfG6zS4QmeNM3aSSMAYK_7NUmqPqcII' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMTExMDIsImV4cCI6MTczMzI5NzUwMn0.NlML0IwyDyCpkQGOW0XsmPyya-7if8ZgYWanuqkAZTs' \
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
            "description": "23",
            "owner": 1,
            "device_id": 1,
            "created_at": "2024-11-12T14:57:35.916Z",
            "edited_at": null
        }
    ]
}
```