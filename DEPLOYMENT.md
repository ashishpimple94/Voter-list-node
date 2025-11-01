# Render Deployment Guide

## Quick Steps for Deploying to Render

### 1. Prepare Your Code
✅ Code is ready with all files committed to GitHub

### 2. Set Up MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account
3. Create a new cluster (free tier)
4. Go to **Database Access** → Create database user (username/password)
5. Go to **Network Access** → Add IP: `0.0.0.0/0` (allow from anywhere)
6. Go to **Database** → Connect → Choose "Connect your application"
7. Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
   ```

### 3. Deploy on Render

#### Option A: Using Render Dashboard (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in details:
   - **Name**: `excel-voter-api` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main` or `master`
   - **Root Directory**: (leave empty if root)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Advanced"** → Add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   NODE_ENV = production
   ```
   (PORT is automatically set by Render)
6. Click **"Create Web Service"**
7. Wait for deployment to complete (~5-10 minutes)

#### Option B: Using render.yaml (Infrastructure as Code)
If you push `render.yaml` file, Render will auto-detect it:
1. Push code to GitHub (with `render.yaml`)
2. Go to Render Dashboard → **New +** → **Blueprint**
3. Connect GitHub repository
4. Render will auto-detect `render.yaml`
5. **IMPORTANT**: You still need to manually set `MONGODB_URI` in Environment Variables

### 4. Environment Variables in Render
After creating the service, go to:
**Your Service → Environment → Add Environment Variable**

Required variables:
```
Key: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

Key: NODE_ENV  
Value: production
```

### 5. Test Your Deployment
Once deployed, Render provides a URL like:
```
https://excel-voter-api.onrender.com
```

Test endpoints:
- `GET https://your-app.onrender.com/` - Should return API info
- `GET https://your-app.onrender.com/api/voters?page=1&limit=10` - Get voters

### 6. Upload Files via API
Use Postman or curl:
```bash
curl -X POST https://your-app.onrender.com/api/voters/upload \
  -F "file=@sample-voter-data-50000.xlsx"
```

## Important Notes

⚠️ **Free Tier Limitations**:
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30-50 seconds (cold start)
- To avoid spin-down, use a paid tier or keep service active

⚠️ **File Uploads**:
- Files are stored in `/uploads` directory
- On free tier, this is ephemeral storage (resets on redeploy)
- For production, use cloud storage (AWS S3, Cloudinary, etc.)

⚠️ **MongoDB Atlas Free Tier**:
- 512MB storage limit
- Shared CPU/RAM
- Perfect for development/testing

## Troubleshooting

**Issue**: Connection timeout to MongoDB
- **Solution**: Check MongoDB Atlas Network Access allows `0.0.0.0/0`

**Issue**: Build fails
- **Solution**: Check `package.json` has correct `start` script

**Issue**: Service crashes
- **Solution**: Check Render logs → Service → Logs tab

**Issue**: Environment variables not working
- **Solution**: Ensure variables are set in Render Dashboard (not just .env file)

## Next Steps (Production)

For production deployment:
1. Upgrade Render plan (paid tier)
2. Use MongoDB Atlas paid tier or self-hosted MongoDB
3. Set up cloud storage for file uploads (S3, Cloudinary)
4. Add authentication/authorization
5. Set up CI/CD pipeline
6. Add monitoring and logging
7. Use environment-specific configs

