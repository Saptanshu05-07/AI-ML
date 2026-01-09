# 🚀 Vercel Deployment Guide for Soul Sync

This guide will walk you through deploying Soul Sync to Vercel with both frontend and backend.

---

## **Prerequisites**

- GitHub account with your repo pushed
- Vercel account (free at [vercel.com](https://vercel.com))
- MongoDB Atlas account (free at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas))
- Google Gemini API key
- Twilio credentials (optional, for emergency escalation)

---

## **Step 1: Set Up MongoDB Atlas** ⚙️

### 1.1 Create a Free Cluster
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Create Free Cluster"
3. Choose your region (closest to your users)
4. Name it `cosmo-hack`

### 1.2 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username: `cosmo_user`
4. Generate strong password (save it!)
5. Click "Create Database User"

### 1.3 Get Connection String
1. Go to "Database"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string
5. Replace `<password>` with your password
6. Replace `myFirstDatabase` with `cosmo-hack`

**Example**: `mongodb+srv://cosmo_user:your_password@cluster.mongodb.net/cosmo-hack?retryWrites=true&w=majority`

---

## **Step 2: Push Your Code to GitHub** 📤

```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

Make sure your repo is public or accessible to Vercel.

---

## **Step 3: Deploy Backend to Vercel** 🔧

### 3.1 Create Vercel Account & Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel with your GitHub account

### 3.2 Create New Project
1. Click "New Project"
2. Select your `AI-ML` repository
3. **Root Directory**: Select `Server`
4. Click "Continue"

### 3.3 Add Environment Variables
In the "Environment Variables" section, add these:

| Key | Value |
|-----|-------|
| `KEY` | Your Google Gemini API key |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `TWILIO_ACCOUNT_SID` | Your Twilio SID (or skip if not using) |
| `TWILIO_AUTH_TOKEN` | Your Twilio token (or skip if not using) |
| `TWILIO_PHONE_NUMBER` | Your Twilio number (or skip if not using) |
| `CLIENT_URL` | `https://your-frontend-domain.vercel.app` (add after frontend is deployed) |
| `TWIML_BASE_URL` | `https://your-backend-url.vercel.app` (auto-generated) |

### 3.4 Deploy
1. Click "Deploy"
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://soul-sync-backend.vercel.app`)

---

## **Step 4: Deploy Frontend to Vercel** 🎨

### 4.1 Create New Frontend Project
1. In Vercel dashboard, click "New Project"
2. Select your `AI-ML` repository again
3. **Root Directory**: Select `Client`
4. Click "Continue"

### 4.2 Add Environment Variables
Add this environment variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app` |

### 4.3 Deploy
1. Click "Deploy"
2. Wait 3-5 minutes
3. Copy your frontend URL (e.g., `https://soul-sync.vercel.app`)

---

## **Step 5: Update Backend Environment Variables** 🔄

Go back to your backend project in Vercel:

1. Settings → Environment Variables
2. Update `CLIENT_URL` → `https://your-frontend-domain.vercel.app`
3. Click "Save"
4. Go to "Deployments"
5. Find the latest deployment → Click "..." → "Redeploy"

---

## **Step 6: Test Your Deployment** ✅

### 6.1 Test Frontend
1. Visit `https://your-frontend-domain.vercel.app`
2. Verify the UI loads
3. Check browser console (F12) for errors

### 6.2 Test Authentication
1. Sign up with email and password
2. Verify you can log in
3. Check that tokens are stored in localStorage

### 6.3 Test Chat
1. Start a chat session
2. Send a message
3. Verify AI response appears
4. Check server logs in Vercel

### 6.4 Monitor Logs
In Vercel dashboard:
- **Frontend**: Deployments → Logs (shows build logs)
- **Backend**: Functions → Logs (shows runtime errors)

---

## **Troubleshooting** 🔧

### **Frontend shows "Failed to fetch from API"**
- Check `VITE_API_URL` matches your backend URL exactly
- Redeploy frontend after updating env var
- Check browser console for CORS errors

### **Backend returns 500 errors**
- Check MongoDB connection string is correct
- Verify all required env vars are set
- Check Functions logs in Vercel
- Ensure `MONGODB_URI` is accessible from Vercel

### **JWT errors**
- Verify `JWT_SECRET` is set and strong
- Check token expiration time
- Clear browser localStorage and try again

### **CORS errors**
- Verify `CLIENT_URL` in backend env vars matches frontend domain
- Redeploy backend after updating
- Check Vercel logs for CORS configuration

### **Build fails**
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Try deleting `node_modules` and reinstalling locally

---

## **Database Backups** 💾

MongoDB Atlas provides:
- **Free tier**: Automatic backups for 7 days
- **Paid tier**: Configurable retention

To restore:
1. Go to MongoDB Atlas → Backup
2. Click "Restore" next to a backup
3. Choose target cluster

---

## **Custom Domain Setup** 🌐

### For Frontend
1. In Vercel: Project Settings → Domains
2. Enter your domain (e.g., `soulsync.com`)
3. Update DNS records as instructed
4. Usually propagates within 24 hours

### For Backend
1. Same process in backend project settings
2. Update `TWIML_BASE_URL` and `CLIENT_URL` accordingly

---

## **Monitoring & Alerts** 📊

Set up Vercel notifications:
1. Account Settings → Notifications
2. Enable alerts for failed deployments
3. Get email on builds and errors

Monitor MongoDB:
1. MongoDB Atlas → Alerts
2. Set threshold for slow queries
3. Monitor connection count

---

## **Production Checklist** ✅

- [ ] MongoDB Atlas cluster created and running
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] API keys are in environment variables (not code)
- [ ] .env files are in .gitignore
- [ ] Frontend can communicate with backend
- [ ] Authentication flows tested
- [ ] Error handling verified
- [ ] Database backups configured
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS verified (automatic on Vercel)
- [ ] Rate limiting is active
- [ ] CORS is properly configured

---

## **Scaling & Performance** ⚡

### Vercel Limits (Free Tier)
- 100 serverless function invocations per day
- 12 deployments per day
- 6 preview environments per project

### MongoDB Atlas Limits (Free Tier)
- 512 MB storage
- 100 concurrent connections
- Pauses after 30 days of inactivity

### When to Upgrade
- **Vercel**: Upgrade when hitting function limits
- **MongoDB**: Upgrade when storage exceeds 500 MB

---

## **Support & Resources** 📚

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/manual/)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-deployment.html)
- [React Production Build](https://react.dev/learn/start-a-new-react-project)

---

## **Next Steps** 🎉

Your Soul Sync application is now live! 🚀

- Monitor performance in Vercel dashboard
- Watch database metrics in MongoDB Atlas
- Set up error tracking (optional: Sentry, LogRocket)
- Plan for upgrading as you scale

**Questions?** Check the main [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) or [SECURITY_FIXES.md](SECURITY_FIXES.md).
