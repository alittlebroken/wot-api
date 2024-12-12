## Remove
Removes the specified user

`MUST be logged in to access this resource`

```plaintext
DELETE /api/v1/users/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the user we wish to see. |

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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to remove user", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request DELETE 'http://localhost:3005/api/v1/users/2' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwgTG9ja3llciIsImxhc3RfbG9nb24iOm51bGwsImlhdCI6MTczNDAxMjU3OCwiZXhwIjoxNzM0MDEyODc4fQ.U2oLbeRbj_oO7X5fanw4RegPDhJWZNbc0BRlDiDibf4' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwgTG9ja3llciIsImxhc3RfbG9nb24iOm51bGwsImlhdCI6MTczNDAxMjU3OCwiZXhwIjoxNzM0MDk4OTc4fQ.MdjRxj2wHV_4LPene-OVfXnE0g9FsbnIt7FU5Zs1U5Q' \
--data '{
    "column": "display_name",
    "value": "Brutus"
}'
```

Example response:

```json
{
    "status": 200,
    "state": "ok",
    "message": "User successfully removed",
    "data": [
        {
            "id": 2,
            "username": "julius@user.com",
            "display_name": "Brutus",
            "last_logon": null
        }
    ]
}
```