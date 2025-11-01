# Render me MongoDB Setup - Complete Guide

## 📋 Apna MongoDB Connection Details

```
Cluster: cluster0.ezzkjmw.mongodb.net
Password: voterlist
Username: [MongoDB Atlas se get karo]
Database: voter-db (or any name you want)
```

---

## 🔗 Connection String Format

```
mongodb+srv://USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

---

## 🔍 Step 1: MongoDB Username Get Karo

1. **MongoDB Atlas** par jao: https://cloud.mongodb.com
2. **Database Access** (left sidebar) click karo
3. Users list me apna **username** dikhega:
   - Common: `admin`, `myAtlasAdminUser`
   - Ya aapka custom username
4. **Username copy karo**

---

## 📝 Step 2: Connection String Banaye

### Template:
```
mongodb+srv://[YOUR_USERNAME]:voterlist@cluster0.ezzkjmw.mongodb.net/[DATABASE_NAME]?retryWrites=true&w=majority
```

### Example (agar username `admin` hai aur database `voter-db` hai):
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## 🚀 Step 3: Render me Set Karo

### Method 1: Environment Tab (Recommended)

1. **Render Dashboard** → Apna service/application select karo
2. **"Environment"** tab click karo
3. **"Add Environment Variable"** click karo
4. Fill karo:
   - **Key**: `MONGODB_URI`
   - **Value**: Complete connection string paste karo
   
   Example:
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
   ```

5. **"Save Changes"** click karo
6. Render automatically redeploy karega

---

### Method 2: Using render.yaml (if configured)

Agar `render.yaml` file use kar rahe ho, to:

```yaml
envVars:
  - key: MONGODB_URI
    sync: false
```

Phir manually Render Dashboard se value set karo.

---

## ✅ Step 4: Verify

### Render Logs me Check Karo:

**Success logs:**
```
🔍 Environment Check:
  MONGODB_URI exists: true
🔗 Attempting MongoDB connection...
✅ MongoDB Connected Successfully!
   Host: cluster0.ezzkjmw.mongodb.net
   Database: voter-db
```

**Error logs (if variable not set):**
```
🔍 Environment Check:
  MONGODB_URI exists: false
❌ ERROR: MongoDB URI is not defined!
```

---

## 🔐 Step 5: MongoDB Atlas Network Access

1. MongoDB Atlas → **Network Access** (left sidebar)
2. **"Add IP Address"** click karo
3. **"Allow Access from Anywhere"** select karo:
   - IP Address: `0.0.0.0/0`
   - Comment: `Allow from Render`
4. **Confirm** click karo

---

## 📋 Complete Example

### Your Details:
- Username: `admin` (example - apna username use karo)
- Password: `voterlist`
- Cluster: `cluster0.ezzkjmw.mongodb.net`
- Database: `voter-db`

### Connection String:
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

### Render Environment Variable:
```
MONGODB_URI=mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## 🎯 Quick Steps Summary

1. ✅ MongoDB Atlas → Database Access → Username copy karo
2. ✅ Connection string banayo: `mongodb+srv://USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/DATABASE`
3. ✅ Render → Environment → Add Variable:
   - Key: `MONGODB_URI`
   - Value: Connection string
4. ✅ Save → Auto redeploy
5. ✅ Logs check karo → "MongoDB Connected Successfully!" dikhna chahiye

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"
- **Solution**: Render Environment tab me variable add karo

### Error: "authentication failed"
- **Solution**: Username/password verify karo
- Password: `voterlist` (exact)

### Error: "network error"
- **Solution**: MongoDB Atlas Network Access me `0.0.0.0/0` allow karo

---

**Connection string ready hai - bas username MongoDB Atlas se get karke Render me set karo!** 🚀

