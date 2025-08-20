# API Testing Guide với Postman

## Base URL
```
http://localhost:8081
```

## 1. Đăng ký Admin User
**Method:** POST  
**URL:** `/api/auth/register`  
**Headers:** 
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "phoneNumber": "0123456789",
  "username": "admin01", 
  "password": "123456",
  "fullName": "Admin Test User"
}
```

**Response Success (200):**
```json
{
  "message": "Admin user registered successfully!"
}
```

**Response Error (400):**
```json
{
  "message": "Error: Phone number is already taken!"
}
```

---

## 2. Đăng nhập
**Method:** POST  
**URL:** `/api/auth/login`  
**Headers:** 
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "identifier": "0123456789",
  "password": "123456"
}
```

**Response Success (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "phoneNumber": "0123456789",
  "username": "admin01",
  "fullName": "Admin Test User",
  "role": "ROLE_ADMIN"
}
```

---

## 3. Lấy thông tin user hiện tại
**Method:** GET  
**URL:** `/api/auth/me`  
**Headers:** 
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

**Response Success (200):**
```json
{
  "token": null,
  "type": "Bearer", 
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "phoneNumber": "0123456789",
  "username": "admin01",
  "fullName": "Admin Test User",
  "role": "ROLE_ADMIN"
}
```

---

## 4. Đăng xuất
**Method:** POST  
**URL:** `/api/auth/logout`  
**Headers:** 
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

**Response Success (200):**
```json
{
  "message": "User logged out successfully!"
}
```

---

## 5. Lấy danh sách Admin Users (Cần Authentication)
**Method:** GET  
**URL:** `/api/admin-users/all`  
**Headers:** 
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

---

## Test Flow:
1. **Register** một admin user mới
2. **Login** với user vừa tạo để lấy JWT token
3. **Copy JWT token** từ response
4. **Test các protected endpoints** bằng cách thêm token vào Authorization header
5. **Test logout** để clear session

## Lưu ý:
- JWT token có thời hạn 24 giờ (86400000ms)
- Tất cả protected endpoints cần header: `Authorization: Bearer YOUR_TOKEN`
- Phone number phải unique trong hệ thống
- Username cũng phải unique (nếu có)
