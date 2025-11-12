# Git Branch Workflow Guide

## Pull a Branch and Push to a New Branch

### Option 1: Create New Branch from Master (Current Branch)

```powershell
# Make sure you're on master and it's up to date
git checkout master
git pull origin master

# Create and switch to a new branch
git checkout -b new-branch-name

# Make any changes if needed, then:
git add .
git commit -m "Your commit message"

# Push the new branch to GitHub
git push -u origin new-branch-name
```

### Option 2: Create New Branch from Another Branch

```powershell
# Pull the branch you want to base from
git checkout branch-name
git pull origin branch-name

# Create new branch from current branch
git checkout -b new-branch-name

# Push to GitHub
git push -u origin new-branch-name
```

### Option 3: Create New Branch from Remote Branch

```powershell
# Fetch all remote branches
git fetch origin

# Create new branch from remote branch
git checkout -b new-branch-name origin/remote-branch-name

# Push to GitHub
git push -u origin new-branch-name
```

## Common Commands

```powershell
# List all branches (local and remote)
git branch -a

# List only remote branches
git branch -r

# Switch to a branch
git checkout branch-name

# Create new branch without switching
git branch new-branch-name

# Delete a branch (local)
git branch -d branch-name

# Delete a branch (remote)
git push origin --delete branch-name
```

