# Render pe MONGODB_URI Error Fix

## ❌ Error: "uri parameter must be a string, got undefined"

Ye error tab aata hai jab Render me `MONGODB_URI` environment variable set nahi hai.

---

## 🔧 Step-by-Step Fix

### Step 1: Render Dashboard me Jao

1. https://dashboard.render.com par sign in karo
2. Apna **service/application** select karo

---

### Step 2: Environment Variables Tab

1. Service page me **"Environment"** tab click karo
   (Left sidebar me ya top tabs me dikhega)

---

### Step 3: Add MONGODB_URI Variable

**Option A: Individual Variable Add**

1. **"Add Environment Variable"** ya **"Add Secret"** button click karo
2. Form fill karo:
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
   ```
3. **USERNAME** replace karo apne MongoDB Atlas username se
4. **"Save Changes"** click karo

**Option B: Bulk Add (if available)**

1. Environment tab me scroll karo
2. **"Add"** ya **"Edit"** button click karo
3. Variables add karo:
   ```
   MONGODB_URI=mongodb+srv://USERNAME:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
   NODE_ENV=production
   ```

---

### Step 4: Verify Variable Added

Environment tab me ye dikhna chahiye:

```
┌─────────────────┬──────────────────────────────────────────────┐
│ Key             │ Value                                        │
├─────────────────┼──────────────────────────────────────────────┤
│ MONGODB_URI     │ mongodb+srv://...                           │
│ NODE_ENV        │ production                                   │
└─────────────────┴──────────────────────────────────────────────┘
```

---

### Step 5: Manual Redeploy (if needed)

1. **"Manual Deploy"** tab click karo (ya "Deploy" button)
2. **"Deploy latest commit"** click karo
3. Ya automatic redeploy ho sakta hai

---

## 📋 Complete Connection String Example

**Agar MongoDB username `admin` hai:**

```
mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

**Render Environment Variable:**
```
Key: MONGODB_URI
Value: mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority
```

---

## ✅ Success Verification

### Render Logs me Ye Dikhna Chahiye:

```
🔍 Environment Check:
  MONGODB_URI exists: true
🔗 Attempting MongoDB connection...
✅ MongoDB Connected Successfully!
   Host: cluster0.ezzkjmw.mongodb.net
   Database: voter-db
```

**Agar ye dikhe to successful hai!** ✅

---

## 🚨 Common Mistakes

### Mistake 1: Variable Name Wrong
❌ Wrong: `MONGODB_URL`, `MONGO_URI`, `MONGODB_CONNECTION`
✅ Correct: `MONGODB_URI` (exact)

### Mistake 2: Value me Spaces
❌ Wrong: `MONGODB_URI = mongodb+srv://...` (space after =)
✅ Correct: `MONGODB_URI=mongodb+srv://...` (no space)

### Mistake 3: Not Saved
- Variable add karne ke baad **"Save Changes"** click karna zaroori hai
- Check karo ki variable list me dikh rahi hai

### Mistake 4: Redeploy Not Done
- Variable add karne ke baad manual redeploy karo
- Ya automatic redeploy ka wait karo

---

## 🔍 How to Check if Variable is Set

### Method 1: Render Environment Tab
- Variables list me `MONGODB_URI` dikhni chahiye

### Method 2: Render Logs
Logs me ye dikhega:
```
🔍 Environment Check:
  MONGODB_URI exists: true  ✅ (if set)
  MONGODB_URI exists: false ❌ (if not set)
```

---

## 📝 Quick Checklist

- [ ] Render Dashboard me service open kiya
- [ ] Environment tab me gaya
- [ ] `MONGODB_URI` variable added
- [ ] Username MongoDB Atlas se copy kiya
- [ ] Connection string complete hai
- [ ] "Save Changes" click kiya
- [ ] Redeploy start hua (automatic ya manual)
- [ ] Logs check kiye
- [ ] "MONGODB_URI exists: true" dikha
- [ ] "MongoDB Connected Successfully!" dikha

---

## 🎯 Exact Steps for Render

1. **Render Dashboard** → Apna service
2. **Environment** tab (left sidebar)
3. **"Add Environment Variable"** click
4. **Key**: `MONGODB_URI`
5. **Value**: `mongodb+srv://[YOUR_USERNAME]:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority`
6. **[YOUR_USERNAME]** replace karo
7. **Save Changes**
8. Deploy automatically start hoga

---

**Most Important**: Render Environment tab me `MONGODB_URI` variable properly add karo with complete connection string!

