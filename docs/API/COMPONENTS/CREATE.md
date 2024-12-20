## CREATE

Create a new component to be used by a device.

`MUST be logged in to access this resource`

```plaintext
POST /api/v1/components
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `name`            | string | The component name. |
| `description`            | string | A description of the component and what it does. |
| `owner`            | number | Which user does the component belong to. |
| `device_id`            | number | Which device is using the component. |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to create component", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location 'http://localhost:3005/api/v1/components' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzQ4NjcsImV4cCI6MTczMzIzNTE2N30.-XjgZZmQhVAX1GK8HS3KgragyXpvIikABoEB2X9bEGY' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzQ4NjcsImV4cCI6MTczMzMyMTI2N30.fatPnJ-4oqd4rKrDpOhGoFQ-1netw4yXRzQHwZfgNmM' \
--data '{
   "name": "Light Sensor",
   "description": "Detects the amount of light present in it'\''s location",
   "owner": 1,
   "device_id": 2
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Component successfully created",
    "data": [
        {
            "id": 8,
            "name": "Light Sensor",
            "description": "Detects the amount of light present in it's location",
            "owner": 1,
            "device_id": 2
        }
    ]
}
```