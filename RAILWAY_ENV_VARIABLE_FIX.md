# Railway Environment Variable Fix - MONGODB_URI Undefined

## ❌ Error: "uri parameter must be a string, got undefined"

Ye error tab aata hai jab Railway me `MONGODB_URI` environment variable set nahi hai.

---

## 🔧 Fix Steps

### Step 1: Railway Dashboard me Jao

1. Railway.app me sign in karo
2. Apna project select karo (Voter-list-node)

---

### Step 2: Variables Tab me Jao

1. Project page me **"Variables"** tab click karo
2. Ya **"Settings"** → **"Variables"**

---

### Step 3: New Variable Add Karo

1. **"New Variable"** ya **"Raw Editor"** button click karo
2. **Raw Editor** use karo (easier):
   - **"Raw Editor"** toggle on karo
   - Format:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db-name
     ```

3. Ya **Manual Add**:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://username:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority`

---

### Step 4: Complete Connection String

**Your details:**
- Cluster: `cluster0.ezzkjmw.mongodb.net`
- Password: `voterlist`
- Username: (MongoDB Atlas se get karo)
- Database: (e.g., `voter-db` ya `test`)

**Complete string:**
```
mongodb+srv://YOUR_USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority
```

**Example** (agar username `admin` hai):
```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

### Step 5: Save & Verify

1. **Save** karo
2. Railway automatically redeploy start karega
3. **Deployments** tab me check karo
4. **Logs** me dekho:
   - ✅ "MongoDB Connected Successfully!" dikhe
   - ❌ Agar error aaye to connection string check karo

---

## 🔍 Verify Environment Variable

### Method 1: Railway Logs me Check

Logs me ye dikhega:
```
🔍 Environment Check:
  MONGODB_URI exists: true
```

Agar `false` dikhe, to variable properly set nahi hua.

### Method 2: Railway Variables Tab

1. Variables tab me check karo
2. `MONGODB_URI` variable dikhni chahiye
3. Value me connection string honi chahiye

---

## 🚨 Common Issues

### Issue 1: Variable Name Wrong

**Wrong:**
```
MONGODB_URL=...  ❌
MONGO_URI=...    ❌
```

**Correct:**
```
MONGODB_URI=...  ✅
```

---

### Issue 2: Raw Editor Format Wrong

**Wrong:**
```
MONGODB_URI: mongodb+srv://...
```

**Correct (Raw Editor):**
```
MONGODB_URI=mongodb+srv://...
```

**Or Manual:**
- Name: `MONGODB_URI`
- Value: `mongodb+srv://...`

---

### Issue 3: Spaces in Value

**Wrong:**
```
MONGODB_URI= mongodb+srv://...  (space after =)
```

**Correct:**
```
MONGODB_URI=mongodb+srv://...  (no space)
```

---

### Issue 4: Variable Not Saved

- **Save** button click karo
- Redeploy check karo (automatic hona chahiye)

---

## 📋 Railway Variables Setup (Visual)

### Variables Tab:
```
Variables
[Raw Editor] [New Variable]

Existing Variables:
┌─────────────────────────────────────────────┐
│ Name          │ Value                       │
├─────────────────────────────────────────────┤
│ MONGODB_URI   │ mongodb+srv://...           │ ← Should be here
│ NODE_ENV      │ production                  │
└─────────────────────────────────────────────┘
```

### Raw Editor Format:
```
MONGODB_URI=mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
NODE_ENV=production
```

### Manual Add:
```
Name:  MONGODB_URI
Value: mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## ✅ Complete Checklist

- [ ] Railway Dashboard me project open kiya
- [ ] Variables tab me gaya
- [ ] `MONGODB_URI` variable added
- [ ] Connection string me username sahi
- [ ] Connection string me password: `voterlist`
- [ ] Connection string me database name specified
- [ ] Variable saved
- [ ] Railway redeployed
- [ ] Logs me "Environment Check" dikha
- [ ] Logs me "MONGODB_URI exists: true" dikha
- [ ] Logs me "MongoDB Connected Successfully!" dikha

---

## 🧪 Test Connection String Format

Local me test karne ke liye (optional):

```bash
# .env file me
MONGODB_URI=mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority

# Server run karo
npm start
```

Agar local me connect ho, to Railway me bhi kaam karega.

---

## 📝 Quick Template

**Railway Variables me ye add karo:**

```
Key: MONGODB_URI
Value: mongodb+srv://YOUR_USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_USERNAME` → MongoDB Atlas username
- `YOUR_DATABASE` → Database name (e.g., `voter-db`)

---

**Most Important**: Railway Variables tab me `MONGODB_URI` properly set karo with correct connection string!

