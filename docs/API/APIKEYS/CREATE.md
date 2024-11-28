## Creates

Creates a new API key for a device.

`MUST be logged in to access this resource`

```plaintext
POST /api/v1/apikeys
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `owner`            | number | The user the device and key belongs to. |
| `device_id`            | number | The id of the device the API key is paired with. |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to create new key", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/apikeys' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTA4ODcsImV4cCI6MTczMjgxMTE4N30.n315is5qv-V1qJBfP5trjznJ4ZNVd1vezORnXWBk6o4' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTA4ODcsImV4cCI6MTczMjg5NzI4N30.NsylNSVsd6fEBqDNPXZZT87sOd9IqnvoPaPij493D0Q' \
--data '{
    "owner": 1,
    "device_id": 3
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Key created successfully",
    "data": [
        {
            "id": 4,
            "owner": 1,
            "device_id": 3,
            "key": "cVbBPNn4+IQ-VsTbgaNRQeDT3C4pe."
        }
    ]
}
```