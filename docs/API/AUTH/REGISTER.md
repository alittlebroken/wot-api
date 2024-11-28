## Register

Creates a new user

```plaintext
POST /api/v1/auth/register
```

Supported attributes:

| Attribute                | Type     | Required | Description           |
|--------------------------|----------|----------|-----------------------|
| `email`               | string   | Yes      | Email of the new user user. |
| `password`               | string   | Yes      | Password for the new user user. |
| `display_name`               | string   | Yes      | The display name for the new user. |

If successful, returns ['201'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the user details just registered. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Registration failure", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": <varies based on error raised>, "data": []}`|


```shell
curl --location 'http://localhost:3005/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user1@test.com",
    "password": "us3r0n3!",
    "display_name": "User one"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "User registration successful",
    "data": [
        {
            "id": 3,
            "username": "user1@test.com",
            "display_name": "User One"
        }
    ]
}
```