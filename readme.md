# User Registration Endpoint Documentation

## Endpoint

```
POST /api/v1/user/create
```

## Description

This endpoint is used to register a new user in the system. It expects user details in the request body and returns the created user data upon success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 4 characters.

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "data": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com",
      "password":"encrypted_password",


      // ...other user fields
    },
    "status": true,
    "message": "successfully created the user",
    "err": {}
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "firstName is required",
        "param": "fullName.firstName",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "data": {},
    "status": false,
    "message": "not able to fetch the token",
    "err": {}
  }
  ```

## Example Request

```bash
curl -X POST http://localhost:3000/api/v1/user/create \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "johndoe@example.com",
    "password":