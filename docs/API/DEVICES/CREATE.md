## CREATE
Creates a new device

`MUST be logged in to access this resource`

```plaintext
POST /api/v1/components
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `name`            | string | The name of the device |
| `description`            | string  | A description of the device |
| `owner`            | number | The user who owns the device |
| `mac_address`            | string | The hardware address of the devices netwrok interface |

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
curl --location 'http://localhost:3005/api/v1/devices' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDc5NTEsImV4cCI6MTczMzQwODI1MX0.KLrfab972ZoQFGrrb7nK9tbAXLaxGZr0ENFMBMpKjOE' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDc5NTEsImV4cCI6MTczMzQ5NDM1MX0.9-Z6AJbQq4VLJxiRnxeL0syC2Ei6o9DLbnQ1qFAXV0w' \
--data '{
   "name": "Master Bedroom Probe 1",
   "description": "Measures temperature & humidity of the master bedroom",
   "owner": 1,
   "mac_address": "3F:B3:BC:25:3B:1B"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Device successfully added",
    "data": []
}
```