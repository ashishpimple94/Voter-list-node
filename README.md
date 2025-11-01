# Excel Voter Data Upload API

A Node.js API for uploading Excel files and managing voter data with MongoDB.

## Features

- 📤 Excel file upload (supports .xlsx, .xls)
- 📊 Parse and store voter data
- 🔄 Hindi to English transliteration for names
- 🌐 Gender translation (पुरुष → Male, स्त्री → Female)
- 📄 Paginated API responses
- 🗄️ MongoDB data storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd xcel
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file from `.env.example`
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
PORT=8000
NODE_ENV=development
```

5. Start the server
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

- `GET /` - API information
- `POST /api/voters/upload` - Upload Excel file
- `GET /api/voters?page=1&limit=100` - Get all voters (paginated)
- `GET /api/voters/:id` - Get voter by ID
- `DELETE /api/voters` - Delete all voters

## Deployment on Render

### Step 1: Push to GitHub
1. Push your code to GitHub repository

### Step 2: Create MongoDB Atlas Database (if using cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

### Step 3: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: excel-voter-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`
     - `PORT`: (Render sets this automatically)

### Step 4: Environment Variables in Render
Go to your service → Environment tab and add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
NODE_ENV=production
```

Render automatically provides `PORT` environment variable.

## File Structure

```
xcel/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── voterController.js  # Business logic
├── middleware/
│   ├── asyncHandler.js    # Async error handler
│   └── upload.js          # File upload (Multer)
├── models/
│   └── Voter.js           # Mongoose schema
├── routes/
│   └── voterRoutes.js     # API routes
├── uploads/               # Uploaded files (gitignored)
├── .env.example           # Environment template
├── render.yaml            # Render deployment config
└── server.js              # Entry point
```

## Notes

- Uploaded files are stored in `uploads/` directory
- Maximum file size: 10MB
- Supported formats: .xlsx, .xls
- API responses are paginated (default: 100 records per page, max: 1000)

