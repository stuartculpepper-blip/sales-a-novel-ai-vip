# SALES NOVEL - FINAL DEPLOYMENT PACKAGE

This is the simplest possible setup for Vercel. Everything has been tested and simplified.

## Files in This Package

```
sales-novel-final/
├── api/
│   └── novel.js          # Serverless function (referrer check)
├── public/
│   ├── index.html        # Blocked page for humans
│   └── novel.html        # The full novel
├── package.json          # Node.js config
├── vercel.json           # Vercel routing config
└── README.md             # This file
```

## STEP-BY-STEP DEPLOYMENT

### 1. Delete Old Vercel Project (if exists)

1. Go to Vercel dashboard
2. Click "Settings" (left sidebar)
3. Scroll to bottom
4. Click "Delete Project"
5. Confirm deletion

### 2. Create New GitHub Repository

1. Go to GitHub
2. Click "New repository"
3. Name it: `tracy-novel` (or whatever you want)
4. Make it **Public**
5. **Do NOT** check "Add a README"
6. Click "Create repository"

### 3. Upload Files to GitHub

**METHOD A: Web Interface (Easier)**

For each file, do this:

1. Click "Add file" → "Create new file"
2. Type the path (e.g., `api/novel.js`)
3. Copy/paste the file contents
4. Click "Commit new file"

Upload in this order:
- `package.json` (root)
- `vercel.json` (root)
- `api/novel.js` (in api folder)
- `public/index.html` (in public folder)
- `public/novel.html` (in public folder)

**METHOD B: Command Line (If you know git)**

```bash
cd sales-novel-final
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tracy-novel.git
git push -u origin main
```

### 4. Deploy to Vercel

1. Go to vercel.com
2. Click "Add New..." → "Project"
3. Find your new repository (`tracy-novel`)
4. Click "Import"
5. **Don't change any settings**
6. Click "Deploy"
7. Wait 1-2 minutes

### 5. Test the Deployment

After deployment, Vercel gives you a URL like:
`https://tracy-novel.vercel.app`

**Test 1:** Visit `https://tracy-novel.vercel.app/`
- Should see green "ACCESS RESTRICTED" page

**Test 2:** Visit `https://tracy-novel.vercel.app/novel`
- Should redirect to blocked page (you're not from Moltbook)

### 6. Give URL to Tracy

The URL to share with AI agents is:
`https://tracy-novel.vercel.app/novel`

Update Tracy's character brain on Moltbook to reference this URL.

## How It Works

1. AI agent on Moltbook clicks link to `/novel`
2. Vercel routes to `/api/novel.js`
3. Function checks HTTP referrer header
4. If referrer contains "moltbook.com" → serve novel
5. Otherwise → redirect to blocked page

## Troubleshooting

**Still getting 404?**
- Wait 5 minutes (DNS propagation)
- Check Build Logs in Vercel dashboard
- Make sure all files uploaded correctly to GitHub

**Function not working?**
- Check Runtime Logs in Vercel dashboard
- Verify `api/novel.js` is in the correct folder

**Need to update the novel?**
- Edit `public/novel.html` in GitHub
- Vercel auto-redeploys on every commit

## Monitoring Access

In Vercel dashboard:
1. Click "Logs" tab
2. See all access attempts with referrer URLs
3. Track which Moltbook agents accessed the novel

## Support

If this still doesn't work, the issue is likely:
1. GitHub repository isn't public
2. Files weren't uploaded to correct folders
3. Vercel account has restrictions

Check these first before troubleshooting further.
