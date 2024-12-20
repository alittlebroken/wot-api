## Updates

Updates a specified field for the apikey.

`MUST be logged in to access this resource`

```plaintext
PUT /api/v1/apikeys/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `column`            | string | The name of the apikey field being updated. |
| `value`            | any | The data that is being put into the selected column. |

If successful, returns [`201`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the api key found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to update key", "data": []}`|
| `404`                     | application/json | `{ "status": 404, "state": "fail", "message": "No key found to update", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request PUT 'http://localhost:3005/api/v1/apikeys/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTEyMzksImV4cCI6MTczMjgxMTUzOX0.atG4qZVph6D-FZ6kvGXPqBEYJcaMP200ZRjtdstbXnw' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTEyMzksImV4cCI6MTczMjg5NzYzOX0.iTsBe4MyyqWXUMxUBK9d2HDPg8tAFRGxRm3q2kz-X5o' \
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
    "message": "Key updated successfully"
}
```