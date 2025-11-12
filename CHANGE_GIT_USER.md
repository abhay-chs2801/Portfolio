# Change Git User Configuration

## Step 1: Set Your Git User (Local Repository)

Run these commands with YOUR information:

```powershell
# Set your name
git config user.name "Your Name"

# Set your email (use your GitHub email)
git config user.email "your.email@example.com"
```

## Step 2: Amend the Last Commit

Since the commit was already made with the old user, we need to amend it:

```powershell
# Amend the last commit with your new user info
git commit --amend --reset-author --no-edit
```

This will change the author of the last commit to your new Git user without changing the commit message.

## Step 3: Force Push to GitHub

⚠️ **Warning**: This rewrites history. Since you just pushed, this is safe, but be careful with force push.

```powershell
# Force push to update GitHub with your user info
git push origin master --force
```

## Alternative: Check Current Config First

Before changing, you can check what's currently set:

```powershell
git config user.name
git config user.email
```

## Global vs Local Config

- **Local (this repository only)**: Commands above (already scoped to this repo)
- **Global (all repositories)**: Add `--global` flag:
  ```powershell
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

