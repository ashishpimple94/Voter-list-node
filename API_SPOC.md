# Excel Voter API - Quick Reference (SPOC)

## Base URL
```
Local: http://localhost:8000
Production: https://your-app.onrender.com
```

---

## 📤 1. Upload Excel File

**POST** `/api/voters/upload`

**Request:**
```bash
curl -X POST http://localhost:8000/api/voters/upload \
  -F "file=@your-file.xlsx"
```

**Postman:**
- Method: `POST`
- URL: `http://localhost:8000/api/voters/upload`
- Body → form-data → Key: `file` (File type)

**Response:**
```json
{
  "success": true,
  "message": "Excel file uploaded and processed successfully",
  "totalRecords": 50000,
  "insertedRecords": 50000
}
```

---

## 📋 2. Get All Voters (Paginated)

**GET** `/api/voters?page=1&limit=100`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 100, max: 1000)

**Request:**
```bash
curl "http://localhost:8000/api/voters?page=1&limit=10"
```

**Response:**
```json
{
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 500,
    "totalRecords": 50000,
    "recordsPerPage": 100,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "count": 100,
  "data": [
    {
      "_id": "6905a14830557f20151fe233",
      "SR NO": "1 / 1",
      "नाव": "कुदळे योगेश्री अभिजीत",
      "लिंग ": "पुरुष",
      "वय": 28,
      "मतदान कार्ड क्र ": "WZS8461956",
      "name": "Kudle Yogeshri Abhijit",
      "gender": "Male",
      "age": 28,
      "voterIdCard": "WZS8461956",
      "houseNumber": "",
      "mobileNumber": ""
    }
  ]
}
```

---

## 🔍 3. Get Voter by ID

**GET** `/api/voters/:id`

**Request:**
```bash
curl "http://localhost:8000/api/voters/6905a14830557f20151fe233"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6905a14830557f20151fe233",
    "name": "Kudle Yogeshri Abhijit",
    "gender": "Male",
    "age": 28,
    "voterIdCard": "WZS8461956",
    ...
  }
}
```

---

## 🗑️ 4. Delete All Voters

**DELETE** `/api/voters`

**Request:**
```bash
curl -X DELETE http://localhost:8000/api/voters
```

**Response:**
```json
{
  "success": true,
  "message": "All voters deleted successfully",
  "deletedCount": 50000
}
```

---

## 📊 Response Fields

| Field | Description | Example |
|-------|-------------|---------|
| `_id` | MongoDB ObjectId | `"6905a14830557f20151fe233"` |
| `name` | Name (English transliterated) | `"Kudle Yogeshri Abhijit"` |
| `gender` | Gender (Male/Female) | `"Male"` |
| `age` | Age | `28` |
| `voterIdCard` | Voter ID Card Number | `"WZS8461956"` |
| `houseNumber` | House Number | `""` |
| `mobileNumber` | Mobile Number | `""` |
| `नाव` | Name (Hindi) | `"कुदळे योगेश्री अभिजीत"` |
| `लिंग ` | Gender (Hindi) | `"पुरुष"` |
| `वय` | Age | `28` |
| `मतदान कार्ड क्र ` | Voter ID (Hindi) | `"WZS8461956"` |

---

## ⚙️ Features

✅ **Automatic Transliteration**: Hindi names → English (`नाव` → `name`)  
✅ **Gender Translation**: `पुरुष` → `Male`, `स्त्री` → `Female`  
✅ **Pagination**: Default 100/page, max 1000/page  
✅ **File Upload**: Supports `.xlsx` and `.xls` (max 10MB)  

---

## 📝 Excel File Format

**Required Columns (Hindi or English):**
- `अनु क्र.` / `SR NO`
- `घर क्र.` / `House Number`
- `नाव` / `Name`
- `लिंग` / `Gender`
- `वय` / `Age`
- `मतदान कार्ड क्र.` / `Voter ID Card`
- `मोबाईल नं.` / `Mobile Number`

---

## 🔗 Quick Links

**Postman Collection:**
```
POST {{baseUrl}}/api/voters/upload
GET {{baseUrl}}/api/voters?page=1&limit=100
GET {{baseUrl}}/api/voters/:id
DELETE {{baseUrl}}/api/voters
```

**Base URL Variable:**
```
baseUrl = http://localhost:8000
```

---

## ❌ Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "No file uploaded"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Record not found"
}
```

---

## 🧪 Quick Test

```bash
# 1. Check API
curl http://localhost:8000/

# 2. Upload
curl -X POST http://localhost:8000/api/voters/upload -F "file=@data.xlsx"

# 3. Get data
curl http://localhost:8000/api/voters?page=1&limit=5
```

---

**Contact:** For issues, check server logs or MongoDB connection.

