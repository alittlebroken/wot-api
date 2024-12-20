## Updates
Updates an existing component 

`MUST be logged in to access this resource`

```plaintext
PUT /api/v1/components/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the component being updated |
| `column`            | string | The column in the table being modified for the selected record |
| `value`            | any | The value to be used for the column being updated. |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to update component", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request PUT 'http://localhost:3005/api/v1/components/8' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzU5MzEsImV4cCI6MTczMzIzNjIzMX0.Jl98FO1NtUGGvJhL_9nNTkq6BybmmAKNhOGiBKERaCg' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzMyMzU5MzEsImV4cCI6MTczMzMyMjMzMX0.5BGJpRH3DexnJtkn6V8tiVE2GaNY_MFA8dRUFXpER3E' \
--data '{
   "column": "owner",
   "value": "2"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Component successfully updated",
    "data": [
        {
            "id": 8,
            "name": "Light Sensor",
            "description": "Detects the amount of light present in it's location",
            "owner": 2,
            "created_at": "2024-12-03T14:08:01.710Z",
            "edited_at": null,
            "device_id": 2
        }
    ]
}
```