## Remove
Removes the specified component

`MUST be logged in to access this resource`

```plaintext
DELETE /api/v1/components/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the component being removed |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to remove component", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request DELETE 'http://localhost:3005/api/v1/components/8' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzkyODQsImV4cCI6MTczMzIzOTU4NH0.veBblfcM8Gh1Df7F2ENpsoJ85HqJAZxOd-JnypQutA8' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzkyODQsImV4cCI6MTczMzMyNTY4NH0.QoCVg38Lz2Z99vDPG8Rp_Ykx-CpdIWxZU6CbU48VvZM' \
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
    "message": "Component successfully removed",
    "data": []
}
```