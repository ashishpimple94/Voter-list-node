# Excel Voter Data API Documentation

## Base URL
```
Local: http://localhost:8000
Production: https://your-app.onrender.com
```

## API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API Information |
| POST | `/api/voters/upload` | Upload Excel file |
| GET | `/api/voters` | Get all voters (paginated) |
| GET | `/api/voters/:id` | Get voter by ID |
| DELETE | `/api/voters` | Delete all voters |

---

## 1. API Information

**Endpoint:** `GET /`

**Description:** Get API information and available endpoints

**Request:**
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "message": "Excel Upload API",
  "endpoints": {
    "uploadExcel": "POST /api/voters/upload",
    "getAllVoters": "GET /api/voters",
    "getVoterById": "GET /api/voters/:id",
    "deleteAllVoters": "DELETE /api/voters"
  }
}
```

---

## 2. Upload Excel File

**Endpoint:** `POST /api/voters/upload`

**Description:** Upload an Excel file (.xlsx or .xls) to parse and store voter data

**Content-Type:** `multipart/form-data`

**Request Parameters:**
- `file` (required): Excel file (`.xlsx` or `.xls`)
- Max file size: 10MB

**Request Example (cURL):**
```bash
curl -X POST http://localhost:8000/api/voters/upload \
  -F "file=@sample-voter-data.xlsx"
```

**Request Example (Postman):**
1. Method: `POST`
2. URL: `http://localhost:8000/api/voters/upload`
3. Body → form-data
4. Key: `file` (type: File)
5. Value: Select your Excel file

**Request Example (JavaScript/Fetch):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/api/voters/upload', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Excel file uploaded and processed successfully",
  "totalRecords": 50000,
  "insertedRecords": 50000,
  "sampleRow": {
    "SR NO": "1 / 1",
    "घर क्र": "",
    "नाव": "कुदळे योगेश्री अभिजीत",
    "लिंग ": "पुरुष",
    "वय": 28,
    "मतदान कार्ड क्र ": "WZS8461956",
    "मोबाईल नं ": "",
    "name": "Kudle Yogeshri Abhijit",
    "gender": "Male",
    "age": 28
  },
  "note": "Use GET /api/voters?page=1&limit=100 to fetch data with pagination"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "No file uploaded. Send file field as 'file' using multipart/form-data."
}
```

**Error Response (400 - File Type):**
```json
{
  "success": false,
  "message": "Only Excel files are allowed (.xlsx, .xls)"
}
```

**Error Response (400 - File Size):**
```json
{
  "success": false,
  "message": "Multer error: File too large",
  "error": "LIMIT_FILE_SIZE"
}
```

---

## 3. Get All Voters (Paginated)

**Endpoint:** `GET /api/voters`

**Description:** Get all voter records with pagination support

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 100, max: 1000)

**Request Examples:**
```bash
# Get first page (default 100 records)
curl http://localhost:8000/api/voters

# Get specific page
curl http://localhost:8000/api/voters?page=2

# Custom limit per page
curl http://localhost:8000/api/voters?page=1&limit=50

# Maximum limit (1000 records)
curl http://localhost:8000/api/voters?page=1&limit=1000
```

**Success Response (200):**
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
      "घर क्र": "",
      "नाव": "कुदळे योगेश्री अभिजीत",
      "लिंग ": "पुरुष",
      "वय": 28,
      "मतदान कार्ड क्र ": "WZS8461956",
      "मोबाईल नं ": "",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "name": "Kudle Yogeshri Abhijit",
      "gender": "Male",
      "age": 28,
      "voterIdCard": "WZS8461956",
      "houseNumber": "",
      "mobileNumber": ""
    },
    {
      "_id": "6905a14830557f20151fe234",
      "SR NO": "1 / 4",
      "घर क्र": "",
      "नाव": "अडागळे प्रियांका सचिन",
      "लिंग ": "स्त्री",
      "वय": 33,
      "मतदान कार्ड क्र ": "WZS7621733",
      "मोबाईल नं ": "",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "name": "Addagle Priyanka Sachin",
      "gender": "Female",
      "age": 33,
      "voterIdCard": "WZS7621733",
      "houseNumber": "",
      "mobileNumber": ""
    }
    // ... more records
  ]
}
```

**Response Fields:**
- `_id`: MongoDB ObjectId (string)
- `SR NO`: Serial number from Excel
- `घर क्र`: House number (Hindi)
- `नाव`: Name in Hindi
- `लिंग `: Gender in Hindi (पुरुष/स्त्री)
- `वय`: Age
- `मतदान कार्ड क्र `: Voter ID card number
- `मोबाईल नं `: Mobile number
- `name`: Name transliterated to English
- `gender`: Gender in English (Male/Female)
- `age`: Age (number)
- `voterIdCard`: Voter ID card number
- `houseNumber`: House number (English)
- `mobileNumber`: Mobile number

---

## 4. Get Voter by ID

**Endpoint:** `GET /api/voters/:id`

**Description:** Get a single voter record by MongoDB ObjectId

**URL Parameters:**
- `id` (required): MongoDB ObjectId (24-character hex string)

**Request Example:**
```bash
curl http://localhost:8000/api/voters/6905a14830557f20151fe233
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6905a14830557f20151fe233",
    "SR NO": "1 / 1",
    "घर क्र": "",
    "नाव": "कुदळे योगेश्री अभिजीत",
    "लिंग ": "पुरुष",
    "वय": 28,
    "मतदान कार्ड क्र ": "WZS8461956",
    "मोबाईल नं ": "",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "name": "Kudle Yogeshri Abhijit",
    "gender": "Male",
    "age": 28,
    "voterIdCard": "WZS8461956",
    "houseNumber": "",
    "mobileNumber": ""
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Record not found"
}
```

**Error Response (400 - Invalid ID):**
```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

---

## 5. Delete All Voters

**Endpoint:** `DELETE /api/voters`

**Description:** Delete all voter records from database

**⚠️ Warning:** This permanently deletes all records. Use with caution!

**Request Example:**
```bash
curl -X DELETE http://localhost:8000/api/voters
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "All voters deleted successfully",
  "deletedCount": 50000
}
```

---

## Data Transformation Features

### 1. Name Transliteration
- Hindi names (`नाव`) are automatically transliterated to English in `name` field
- Example: `कुदळे योगेश्री अभिजीत` → `Kudle Yogeshri Abhijit`

### 2. Gender Translation
- Hindi gender values are translated to English:
  - `पुरुष` → `Male`
  - `स्त्री` → `Female`
- Stored in `gender` field

### 3. Field Mapping
- Both Hindi and English columns are preserved
- English equivalents are automatically generated:
  - `नाव` → `name`
  - `लिंग` → `gender`
  - `वय` → `age`
  - `घर क्र.` → `houseNumber`
  - `मतदान कार्ड क्र.` → `voterIdCard`
  - `मोबाईल नं.` → `mobileNumber`

### 4. Data Cleaning
- Nested objects are flattened
- Empty/null values are handled
- Unicode characters are preserved

---

## Excel File Format

### Supported Formats
- `.xlsx` (Excel 2007+)
- `.xls` (Excel 97-2003)

### Expected Columns
Your Excel file can have these columns (Hindi or English):

| Hindi Column | English Column | Mapped To |
|-------------|----------------|-----------|
| अनु क्र. / SR NO | SR NO | Preserved (not mapped to serialNumber) |
| घर क्र. | House Number | `houseNumber` |
| नाव | Name | `name` (transliterated) |
| लिंग | Gender | `gender` (translated) |
| वय | Age | `age` |
| मतदान कार्ड क्र. | Voter ID Card | `voterIdCard` |
| मोबाईल नं. | Mobile Number | `mobileNumber` |

**Note:** Column names can have trailing spaces - API handles variations automatically.

---

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200`: Success
- `400`: Bad Request (invalid file, missing parameters)
- `404`: Not Found (record not found)
- `500`: Internal Server Error

---

## Rate Limiting & Constraints

- **File Size Limit:** 10MB
- **Pagination:** Default 100 records/page, max 1000 records/page
- **File Types:** Only `.xlsx` and `.xls` allowed
- **Request Timeout:** Depends on server configuration

---

## Example Workflow

### Step 1: Upload Excel File
```bash
curl -X POST http://localhost:8000/api/voters/upload \
  -F "file=@voter-data.xlsx"
```

Response includes sample row and total records inserted.

### Step 2: Get All Voters (Paginated)
```bash
curl "http://localhost:8000/api/voters?page=1&limit=10"
```

### Step 3: Get Specific Voter
```bash
curl "http://localhost:8000/api/voters/6905a14830557f20151fe233"
```

---

## Postman Collection

### Import These Requests:

**1. Upload File**
```
POST {{baseUrl}}/api/voters/upload
Body → form-data:
  file: [Select File]
```

**2. Get All Voters**
```
GET {{baseUrl}}/api/voters?page=1&limit=100
```

**3. Get Voter by ID**
```
GET {{baseUrl}}/api/voters/:id
```

**4. Delete All**
```
DELETE {{baseUrl}}/api/voters
```

Set variable: `baseUrl = http://localhost:8000`

---

## Testing

### Quick Test Script
```bash
# 1. Check API is running
curl http://localhost:8000/

# 2. Upload file
curl -X POST http://localhost:8000/api/voters/upload \
  -F "file=@sample-voter-data.xlsx"

# 3. Get first page
curl http://localhost:8000/api/voters?page=1&limit=5

# 4. Get specific record (use ID from step 3)
curl http://localhost:8000/api/voters/YOUR_RECORD_ID
```

---

## Support

For issues or questions:
- Check server logs
- Verify file format matches expected columns
- Ensure MongoDB connection is active
- Check file size (must be < 10MB)

