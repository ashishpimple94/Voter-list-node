# Railway Deployment Guide

## 🚂 Railway pe Deploy Karne ke Steps

### Step 1: Railway Account Setup

1. Railway par sign up karo: https://railway.app
2. GitHub se connect karo (recommended)

---

## 📦 Step 2: New Project Create Karo

1. Railway Dashboard me **"New Project"** click karo
2. **"Deploy from GitHub repo"** select karo
3. Apna repository select karo: `Voter-list-node`
4. Railway automatically detect karega:
   - Node.js project
   - Build command: `npm install`
   - Start command: `npm start`

---

## 🔐 Step 3: MongoDB Setup

### Option A: Railway MongoDB Plugin (Easiest)

1. Railway project me **"New"** button click karo
2. **"Database"** → **"Add MongoDB"** select karo
3. Railway automatically:
   - MongoDB instance create karega
   - Connection string generate karega
   - Environment variable set karega

### Option B: MongoDB Atlas (External)

1. MongoDB Atlas account banao: https://www.mongodb.com/cloud/atlas
2. Free cluster create karo
3. Database user create karo
4. Network Access: `0.0.0.0/0` add karo
5. Connection string copy karo:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   ```

---

## ⚙️ Step 4: Environment Variables Set Karo

### Railway Dashboard me:

1. Project me jao
2. **"Variables"** tab click karo
3. **"New Variable"** click karo

### Required Variables:

**Variable 1: MONGODB_URI**
```
Key: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```
(If Railway MongoDB plugin use kiya, ye automatically set hoga)

**Variable 2: NODE_ENV**
```
Key: NODE_ENV
Value: production
```

**Variable 3: PORT** (Optional - Railway automatically sets this)
```
Key: PORT
Value: 8000
```

### Railway MongoDB Plugin Use Kiya To:

Agar Railway MongoDB plugin add kiya, to:
- Railway automatically `MONGO_URL` ya `MONGODB_URI` set karta hai
- Check karo Variables tab me kya name hai:
  - `MONGO_URL` → use this directly
  - Ya change kar do: Key rename karo `MONGODB_URI` me

---

## 🔧 Step 5: Code me Fix (If Needed)

Agar Railway `MONGO_URL` use karta hai, to `config/db.js` me update karo:

```javascript
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URL;
```

Current code already `MONGODB_URI` check karta hai, to bas Railway me variable name sahi set karo.

---

## 🚀 Step 6: Deploy

1. Railway automatically deploy karega
2. **"Deployments"** tab me status check karo
3. **"View Logs"** me check karo:
   - Build successful?
   - Server started?
   - MongoDB connected?

---

## ✅ Step 7: Verify

### Success Logs:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 8000
```

### Error Check:
- ❌ `MONGODB_URI is not defined` → Environment variable add karo
- ❌ `MongoDB Connection Error` → Connection string check karo
- ❌ `Authentication failed` → Username/password check karo

---

## 🔍 Railway Environment Variables Setup (Visual Guide)

### Railway Dashboard Navigation:
```
Railway Dashboard
└── Your Project
    ├── Deployments
    ├── Variables  ← Yahan click karo
    ├── Settings
    └── ...
```

### Variables Page:
```
Variables
[New Variable]  ← Click karo

Existing Variables:
(Empty initially, yahan add karoge)
```

### Add Variable Form:
```
Variable Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster...
[Add]  ← Click karo
```

---

## 📋 Railway MongoDB Plugin ka Connection String Kaise Milaaye:

### Method 1: Variables Tab me Check Karo
1. Project → Variables tab
2. Railway automatically adds:
   - `MONGO_URL` (usually this name)
   - Ya `MONGODB_URI`

### Method 2: MongoDB Service ka Overview
1. MongoDB service click karo
2. **"Connect"** tab me connection string dikhega
3. Copy karo aur `MONGODB_URI` variable me paste karo

### Method 3: Template Variable
Railway me template variable use kar sakte ho:
```
MONGODB_URI={{MONGO_URL}}
```
(Agar Railway `MONGO_URL` name use karta hai)

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"
**Solution:**
1. Railway Dashboard → Project → Variables
2. `MONGODB_URI` variable add karo
3. Value me MongoDB connection string dalo
4. Redeploy karo

### Error: "MongoDB Connection Error"
**Solution:**
1. Connection string verify karo:
   - Username/password sahi hai?
   - Database name sahi hai?
   - Special characters properly encoded?
2. Network Access check karo (Atlas me `0.0.0.0/0` allow karo)

### Error: "Authentication failed"
**Solution:**
1. MongoDB Atlas me:
   - Database user verify karo
   - Password sahi hai?
2. Connection string me special characters URL encode karo:
   - `@` → `%40`
   - `#` → `%23`
   - ` ` (space) → `%20`

### Railway MongoDB Plugin ka Issue:
**If Railway MongoDB plugin use kiya:**
1. Plugin service click karo
2. **"Connect"** tab me connection string check karo
3. Railway automatically `MONGO_URL` set karta hai
4. Either:
   - `MONGO_URL` use karo directly in code, OR
   - Railway Variables me `MONGODB_URI={{MONGO_URL}}` set karo

---

## 📝 Quick Checklist:

- [ ] Railway account created
- [ ] Project created from GitHub repo
- [ ] MongoDB setup (Railway plugin ya Atlas)
- [ ] `MONGODB_URI` environment variable added
- [ ] `NODE_ENV=production` set
- [ ] Deploy successful
- [ ] Logs me "MongoDB Connected" dikhe
- [ ] API endpoint accessible

---

## 🔗 Railway Resources:

- Dashboard: https://railway.app/dashboard
- Documentation: https://docs.railway.app
- MongoDB Plugin: Railway → New → Database → MongoDB

---

**After setting MONGODB_URI, Railway automatically redeploys. Check logs to verify connection!** ✅

