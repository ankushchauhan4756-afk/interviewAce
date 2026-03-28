# Deployment Guide for InterviewAce

## Overview
This guide covers deploying the InterviewAce MERN application to production using free/affordable platforms.

## Prerequisites
- GitHub account
- Vercel account (Frontend)
- Render account (Backend)
- MongoDB Atlas account (Database)

---

## 1. Database Setup: MongoDB Atlas

### Step 1: Create MongoDB Cluster

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/login
3. Create a new project
4. Click "Build a Database"
5. Choose "Free" tier
6. Select your region
7. Create cluster (takes 2-3 minutes)

### Step 2: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password
5. Update `.env` later with these credentials

### Step 3: Whitelist IP

1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production: Add specific IP addresses
4. Confirm

### Step 4: Get Connection String

1. Click "Connect" on cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/interviewace?retryWrites=true&w=majority`

---

## 2. Backend Deployment: Render.com

### Step 1: Push Code to GitHub

```bash
# Initialize git if not done
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/interviewace.git
git branch -M main
git push -u origin main
```

### Step 2: Connect Render

1. Visit [render.com](https://render.com)
2. Sign up using GitHub
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Select the repository

### Step 3: Configure Service

**Service Details:**
- Name: `interviewace-backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free` (upgradeable)

### Step 4: Add Environment Variables

In Render dashboard, go to "Environment" and add:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewace?retryWrites=true&w=majority
JWT_SECRET=your_very_long_random_secret_key_for_production
PORT=5000
```

### Step 5: Deploy

Click "Create Web Service" and wait for deployment to complete.

**Backend URL:** `https://interviewace-backend.onrender.com`

---

## 3. Frontend Deployment: Vercel

### Step 1: Update API URL

In `frontend/.env.production`:

```env
VITE_API_BASE_URL=https://interviewace-backend.onrender.com/api
```

### Step 2: Push to GitHub

```bash
cd frontend
git add .
git commit -m "Update production API URL"
git push
```

### Step 3: Deploy on Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign up using GitHub
3. Click "Add New..." → "Project"
4. Import the repository
5. Select the `frontend` directory as root

### Step 4: Build Settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### Step 5: Environment Variables

Add in Vercel dashboard:

```env
VITE_API_BASE_URL=https://interviewace-backend.onrender.com/api
```

### Step 6: Deploy

Click "Deploy" and wait for completion.

**Frontend URL:** `https://interviewace.vercel.app`

---

## 4. Post-Deployment Setup

### Update CORS in Backend

Update `backend/src/server.js`:

```javascript
app.use(cors({
  origin: 'https://interviewace.vercel.app',
  credentials: true
}));
```

### Seed Database

```bash
# Create seed.js in backend
node seed.js
```

Or add sample data through MongoDB Atlas interface.

---

## 5. Monitoring & Maintenance

### Vercel Monitoring

- Check deployments: vercel.com/dashboard
- View logs: Click deployment → Logs
- Set up notifications for failures

### Render Monitoring

- Check logs: Dashboard → Web Service → Logs
- Monitor resource usage
- Set up alerts

### MongoDB Monitoring

- Check connection activity
- Monitor storage usage
- Review security

---

## 6. Custom Domain Setup

### Domain Registration

1. Buy domain from:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Others

### Connect to Vercel

1. In Vercel project settings
2. Go to "Domains"
3. Add custom domain
4. Follow DNS setup instructions

### Connect to Render (Optional)

1. In Render service settings
2. Add custom domain
3. Update DNS records

---

## 7. SSL/HTTPS

Both Vercel and Render provide free SSL certificates automatically.

To verify:
- Visit your deployed URL
- Check for🔒 lock icon
- Certificates auto-renew

---

## 8. Budget Estimate

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | Free | Up to 512MB, then $0.10 per GB |
| Render | Free | 0.67 CPU + 512 MB RAM, limited hours |
| Vercel | Free | Great for static sites |
| Domain | $3-15/year | Optional |
| Total | ~$5/year+ | Can scale up as needed |

---

## 9. Scaling for Production

### When to upgrade:

1. **Render Backend**
   - Starter plan: $7/month
   - Provides faster CPU, more RAM
   - Custom domain support

2. **MongoDB Atlas**
   - M0 (free): 512 MB storage
   - M2 (shared): $9/month, 2.5 GB
   - Dedicated: Starting $57/month

3. **Vercel**
   - Pro plan: $20/month
   - Enterprise: Custom pricing

---

## 10. Troubleshooting

### 502 Bad Gateway on Backend

```
Solution:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Restart service
```

### Frontend Can't Reach API

```
Solution:
1. Check CORS settings in backend
2. Verify API URL in frontend .env
3. Check network tab in browser
4. Ensure backend is running
```

### Database Connection Timeout

```
Solution:
1. Verify MongoDB URI
2. Check IP whitelist
3. Ensure username/password correct
4. Check firewall rules
```

### Vercel Build Fails

```
Solution:
1. Check build logs
2. Verify all dependencies installed
3. Check for environment variables
4. Test locally first
```

---

## 11. Backup & Recovery

### Backup MongoDB

```bash
# Set up automatic backups in Atlas
# Configure backup frequency and retention
```

### Disaster Recovery Plan

1. Keep .env files backed up (encrypted)
2. Export database regularly
3. Document all configurations
4. Keep GitHub repository up to date

---

## 12. Performance Tips

### Frontend Optimization

- Enable Vercel analytics
- Optimize images
- Lazy load components
- Minify CSS/JS

### Backend Optimization

- Add caching headers
- Implement rate limiting
- Optimize database queries
- Add database indexes

### Database Optimization

- Create indexes on frequently queried fields
- Archive old data
- Optimize connection pooling

---

## Support Resources

- Render Docs: [render.com/docs](https://render.com/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Docs: [mongodb.com/docs](https://mongodb.com/docs)
- Express Docs: [expressjs.com](https://expressjs.com)

---

**Don't forget to:**
✅ Keep dependencies updated
✅ Monitor error logs
✅ Back up your database
✅ Test deployments in staging first
✅ Update API URL when domain changes
