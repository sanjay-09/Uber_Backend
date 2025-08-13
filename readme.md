# User API Endpoints Documentation

## 1. User Registration

### Endpoint

```
POST /api/v1/user/create
```

### Description

This endpoint is used to register a new user in the system. It expects user details in the request body and returns the created user data upon success.

### Request Body

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

#### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 4 characters.

### Responses

#### Success

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
      "email": "johndoe@example.com"
      // ...other user fields
    },
    "status": true,
    "message": "successfully created the user",
    "err": {}
  }
  ```

#### Validation Error

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

#### Server Error

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

### Example Request

```bash
curl -X POST http://localhost:3000/api/v1/user/create \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }'
```

---

## 2. User Login

### Endpoint

```
POST /api/v1/user/login
```

### Description

Authenticate a user and receive a JWT token (set as a cookie).

### Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Responses

- **200 OK**
  ```json
  {
    "data": "<jwt_token>",
    "status": true,
    "message": "successfully fetched the token",
    "err": {}
  }
  ```
  - The token is also set as a cookie named `token`.

- **400 Bad Request**
  ```json
  {
    "errors": [
      {
        "msg": "email is required",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "data": {},
    "status": false,
    "message": "not able to fetch the token",
    "err": {}
  }
  ```

---

## 3. Get User Profile

### Endpoint

```
GET /api/v1/user/profile
```

### Description

Fetch the authenticated user's profile data.

### Headers

- `Cookie: token=<jwt_token>` or `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**
  ```json
  {
    "data": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
      // ...other user fields
    },
    "status": true,
    "message": "successfully fetch the user",
    "err": {}
  }
  ```

- **401 Unauthorized**: If token is missing or invalid.

- **500 Internal Server Error**
  ```json
  {
    "data": {},
    "status": false,
    "message": "not able to fetch the user",
    "err": {}
  }
  ```

---

## 4. User Logout

### Endpoint

```
POST /api/v1/user/logout
```

### Description

Logs out the authenticated user by blacklisting the token and clearing the cookie.

### Headers

- `Cookie: token=<jwt_token>` or `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**
  ```json
  {
    "msg": "logged out successfully"
  }
  ```
  or
  ```json
  {
    "msg": "logged out successfully,token was not present"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "data": {},
    "status": false,
    "message": "not able to logout",
    "err": {}
  }
  ```

---