## Deletes

Removes a specifed apikey from the system.

`MUST be logged in to access this resource`

```plaintext
DELETE /api/v1/apikeys/:id
```

Supported attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `id`            | number | The id of the key being removed. |


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
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Unable to remove key", "data": []}`|
| `404`                     | application/json | `{ "status": 404, "state": "fail", "message": "No key found to remove", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "<varies based on error raised>", "data": []}`|

Example request:

```shell
curl --location --request DELETE 'http://localhost:3005/api/v1/apikeys/3' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTE2MDgsImV4cCI6MTczMjgxMTkwOH0.1qJ4I9hPhHaHiW4UNsz8FHHwlZu6kNJnX_JmErrRURs' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI4MTE2MDgsImV4cCI6MTczMjg5ODAwOH0.8vClaOrAudiBe2ZrcS40Hf7vHfYbdmEGfg_ilm_nOX8' \
--data '{
    "column": "owner",
    "value": 2
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "Key removed successfully",
    "data": [
        {
            "id": 3,
            "owner": 2,
            "device_id": 3,
            "key": "y9aVa0I8oPENNTaqJOplaxDYNEv"
        }
    ]
}
```