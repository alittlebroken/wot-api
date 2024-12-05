## List All
Retrieves a list of all devices

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
| `204`                     | application/json | `{ "status": 204, "state": "fail", "message": "No devices found", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request GET 'http://localhost:3005/api/v1/devices' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyNDUzOTksImV4cCI6MTczMzI0NTY5OX0.ougZQxtHpjekZQ4gf0_lKKnah1unBKD0oX6Tc1qwwpw' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyNDUzOTksImV4cCI6MTczMzMzMTc5OX0.GH9g6mZNH3Dona2j0CtTEIYXo6mJamnTnQxUw-Qwyqc' \
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