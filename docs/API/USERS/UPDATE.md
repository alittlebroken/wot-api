## Update
Updates the specified user

`MUST be logged in to access this resource`

```plaintext
PUT /api/v1/users/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the user we wish to see. |
| `column`            | string | The column being updated. |
| `value`            | any | The new value to be placed in the selected column. |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to update user", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request PUT 'http://localhost:3005/api/v1/users/4' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzQwMTIxMzMsImV4cCI6MTczNDAxMjQzM30.Tpfdqu_Oy1QO8D6t6b4tuD1jIZKBToUrzVAwQ-E5-XM' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzQwMTIxMzMsImV4cCI6MTczNDA5ODUzM30.szpFE6zOTnDl4EgGYssBdEx84CHLsTB7xWWktRU7BoE' \
--data '{
    "column": "display_name",
    "value": "Brutus"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "User successfully updated",
    "data": [
        {
            "id": 2,
            "username": "julius@yuser.com",
            "display_name": "Brutus"
        }
    ]
}
```