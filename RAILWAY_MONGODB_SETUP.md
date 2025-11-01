# Railway MongoDB Setup - Quick Guide

## 📋 Your MongoDB Details

```
Cluster: cluster0.ezzkjmw.mongodb.net
Password: voterlist
Username: <Get from MongoDB Atlas>
```

---

## 🔍 Step 1: Get Database Username

1. **MongoDB Atlas Dashboard** me jao: https://cloud.mongodb.com
2. **Database Access** (left sidebar) click karo
3. Users list me apna **username** dekhoge
   - Common names: `admin`, `myAtlasAdminUser`, `voterapi_user`, etc.
4. **Username copy karo**

---

## 🔗 Step 2: Build Connection String

### Format:
```
mongodb+srv://USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

### Replace:
- `USERNAME` → Apna MongoDB username
- `DATABASE_NAME` → Database name (e.g., `voter-db`, `voterlist`, `excel-voter-data`)

### Example:
Agar username `admin` hai aur database `voter-db` hai:
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## 🚂 Step 3: Railway me Set Karo

1. **Railway Dashboard** → Apna project
2. **Variables** tab click karo
3. **MONGODB_URI** variable me connection string paste karo:

**Key**: `MONGODB_URI`
**Value**: `mongodb+srv://YOUR_USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority`

**Example** (agar username `admin` aur database `voter-db` hai):
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

4. **Save** karo
5. Railway automatically redeploy karega

---

## 📝 Step 4: Database Name Kaise Pata Karein?

### Option 1: MongoDB Atlas se
1. **Database** (left sidebar) click karo
2. Apna cluster click karo
3. **"Browse Collections"** me database name dikhega
4. Ya **"Create Database"** karke naya database bana sakte ho:
   - Database Name: `voter-db` (or any name)
   - Collection Name: `voters` (or any name)

### Option 2: Connection String me Default
Agar database name specify nahi kiya, to default `test` database use hoga:
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/test?retryWrites=true&w=majority
```

---

## ✅ Complete Example Connection String

**Scenario**: 
- Username: `admin`
- Password: `voterlist`
- Database: `voter-db`

**Connection String**:
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## 🔍 Verify in MongoDB Atlas

1. **Database Access** → Check username
2. **Network Access** → `0.0.0.0/0` allow karo (if not already)
3. **Database** → Database name check karo (ya create karo)

---

## 🧪 Test After Setting

Railway logs check karo:
```
✅ MongoDB Connected: cluster0.ezzkjmw.mongodb.net
```

Agar ye dikhe, to successful! ✅

---

## ❌ Common Issues

### Issue: "authentication failed"
- Username galat hai → Database Access me verify karo
- Password galat hai → Confirm `voterlist` sahi hai
- Database user permissions check karo

### Issue: "database not found"
- Database name verify karo
- Ya MongoDB Atlas me database create karo

---

## 📋 Quick Checklist

- [ ] MongoDB Atlas → Database Access → Username copy kiya
- [ ] Connection string me username/password sahi
- [ ] Database name specified (ya default `test`)
- [ ] Network Access: `0.0.0.0/0` allow kiya
- [ ] Railway Variables me `MONGODB_URI` set kiya
- [ ] Railway redeployed
- [ ] Logs me "MongoDB Connected" dikha

---

**Username MongoDB Atlas se get karo aur connection string Railway me set karo!** 🚀

