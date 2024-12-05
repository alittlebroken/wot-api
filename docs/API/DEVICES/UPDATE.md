## CREATE
Updates a new device

`MUST be logged in to access this resource`

```plaintext
PUT /api/v1/components/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The device indentifier |
| `column`            | string  | The column we wish to update |
| `value`            | number | The value for the column being updated |

If successful, returns [`201`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the list of components found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request PUT 'http://localhost:3005/api/v1/devices/1' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDgyNjQsImV4cCI6MTczMzQwODU2NH0.cVyhT525HhazzCQ1xsLScoQmMp0fwrxekPQMtcdExW8' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDgyNjQsImV4cCI6MTczMzQ5NDY2NH0.urshGtS03TldjYknFIpBNJO-8XCZc6NAH6m3HIhrkMg' \
--data '{
    "column": "owner",
    "value": 2
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Device successfully updated"
}
```