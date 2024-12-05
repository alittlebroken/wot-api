## Create
Creates a new measurment

This is the resopurce that should be called by any device wanting to add a measurement or some data

`MUST be logged in to access this resource`

```plaintext
POST /api/v1/measurements
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `device_id`            | number | The ID of the device that sent the measurement. |
| `component_id`            | number | The component that generated the measurement. |
| `value`            | string | The value being recorded. |
| `logged`            | datetime | The date and time the value was logged. |


If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP status code for the request. |
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
curl --location 'http://localhost:3005/api/v1/measurements' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTAxNTEsImV4cCI6MTczMzQxMDQ1MX0.SkuG3qUCLr-jKtoYSa5WW9zfOz9JeHo6LcWXyxPh23s' \
--header 'x-api-key: pJMbdLI0ws3NcoBBcpuBT29-.qG5LY' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTAxNTEsImV4cCI6MTczMzQ5NjU1MX0.0TuXJF2JgklbwM3NCjXzbVizs-P4b0iwUDfEYg4oN_Q' \
--data '{
   "device_id": 2,
   "component_id": 1,
   "value": "12.5",
   "logged": "20241205 14:43:26",
   "mac_address": "DE:7D:3A:BC:32:27"
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
            "id": 5
        }
    ]
}
```