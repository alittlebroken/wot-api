## List One
Retrieves the specified device

`MUST be logged in to access this resource`

```plaintext
GET /api/v1/components/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the device you wish to retrieve. |

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
| `204`                     | application/json | `{ "status": 204, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request GET 'http://localhost:3005/api/v1/devices/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyNDU4NTYsImV4cCI6MTczMzI0NjE1Nn0.zTNXTmsU5DcW0u3S3LY9skTneBWoiDuGZMoH8-1ToyE' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyNDU4NTYsImV4cCI6MTczMzMzMjI1Nn0.nlQfkZa0alV4ERU54qFj81G1ZC5DU1ZAzx_sbJ1euog' \
--data '{
   "column": "owner",
   "value": "2"
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
            "id": 3,
            "api_key": "dfklasdfhas;djfhasdkfhasdjkfhaskdjfhaklsd",
            "mac_address": "sdfk:SdfhSdjfhsd",
            "name": "Test Device",
            "description": null,
            "owner": 1,
            "created_at": "2024-11-11T11:40:45.772Z",
            "edited_at": null
        }
    ]
}
```