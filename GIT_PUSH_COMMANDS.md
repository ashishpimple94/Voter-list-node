# Git Push Commands for GitHub

## Repository: https://github.com/ashishpimple94/Voter-list-node.git

## Step-by-Step Commands

### If repository is empty and you haven't pushed yet:

```bash
cd /Users/ashishpimple/Desktop/xcel

# Initialize git (already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Excel Voter Data Upload API"

# Set branch to main
git branch -M main

# Add remote
git remote add origin https://github.com/ashishpimple94/Voter-list-node.git

# Push to GitHub
git push -u origin main
```

### If you get authentication error:

**Option 1: Use Personal Access Token**
```bash
# GitHub se Personal Access Token generate karo:
# Settings → Developer settings → Personal access tokens → Generate new token
# Permissions: repo (all)

git push -u origin main
# Username: ashishpimple94
# Password: [Your Personal Access Token]
```

**Option 2: Use SSH (Recommended)**
```bash
# SSH key setup karo (if not done)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH key add karo GitHub account me:
# Settings → SSH and GPG keys → New SSH key

# Remote URL change karo to SSH
git remote set-url origin git@github.com:ashishpimple94/Voter-list-node.git

# Push
git push -u origin main
```

### If you get "repository not found" error:

1. GitHub par repository create karo (if not already):
   - https://github.com/new
   - Repository name: `Voter-list-node`
   - Public/Private choose karo
   - Initialize with README: **NO** (since we already have code)

2. Phir push command run karo:
```bash
git push -u origin main
```

### If Excel file is too large (already handled):

Excel files are now in `.gitignore`. Agar bhi issue ho:

```bash
# Remove from git history (if needed)
git rm --cached sample-voter-data-50000.xlsx
git commit -m "Remove large files"
git push -u origin main
```

### Current Status:

✅ Git initialized
✅ Files committed
✅ Remote added
✅ Large files removed from git

### Next Step:

Run push command manually with authentication:
```bash
git push -u origin main
```

Agar authentication prompt aaye, to:
- **Username**: `ashishpimple94`
- **Password**: GitHub Personal Access Token (not your account password)

