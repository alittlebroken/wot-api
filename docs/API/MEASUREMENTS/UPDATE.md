## Update
Updates an existing measurement

`MUST be logged in to access this resource`

```plaintext
PUT /api/v1/measurements/id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The ID of the measurement being updated. |
| `column`            | string | The column in the DB being updated. |
| `value`            | string | The new value for the specified column being updated. |


If successful, returns [`201`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP status code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the list of components found. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `204`                     | application/json | `{ "status": 204, "state": "fail", "message": "No measurement found", "data": []}`|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "<varies based on error raised>", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request PUT 'http://localhost:3005/api/v1/measurements/5' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTA3MTksImV4cCI6MTczMzQxMTAxOX0.mSIVD4CfuQdO3aVuwt9AMJUg_rSiz7O4ZbIqgTPflrA' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzM0MTA3MTksImV4cCI6MTczMzQ5NzExOX0.-pBmMyp2dIGcaXhKdPf__TZUBgDhJqs8hD1yu-0uyBA' \
--data '{
    "column": "device_id",
    "value": "2"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Measurement updated",
    "data": [
        {
            "id": 5,
            "device_id": 2,
            "component_id": 1,
            "value": "12.5",
            "logged": "2024-12-05T14:43:26.000Z",
            "created_at": "2024-12-05T14:49:22.693Z",
            "edited_at": null
        }
    ]
}
```