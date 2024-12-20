## CREATE
Removes a device

`MUST be logged in to access this resource`

```plaintext
DELETE /api/v1/components/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The device indentifier |


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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to remove device", "data": []}`|
| `404`                     | application/json | `{ "status": 404, "state": "fail", "message": "No device found to delete", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request DELETE 'http://localhost:3005/api/v1/devices/1' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDg0NjUsImV4cCI6MTczMzQwODc2NX0.vTZdwSLvxADbpr-TYhSjmH_1UmC_uT80991ijVz0qKQ' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MDg0NjUsImV4cCI6MTczMzQ5NDg2NX0.yPIQ3J216ssmnGSRGkrx8fyDU4s1K3JrpHUIUrs6kpI'
```

Example response:

```json
{
    "status": 200,
    "state": "ok",
    "message": "Device successfully removed",
    "data": [
        {
            "id": 1,
            "name": "Master Bedroom Probe 1"
        }
    ]
}
```