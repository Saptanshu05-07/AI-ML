# 🚀 Quick Deploy Checklist

## Pre-Deployment
- [ ] Push all changes to GitHub
- [ ] Have MongoDB Atlas connection string ready
- [ ] Have Google Gemini API key ready
- [ ] Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Backend Deployment (Vercel)
- [ ] Create Vercel project → Select `Server` folder
- [ ] Add environment variables:
  - `KEY` (Gemini API key)
  - `MONGODB_URI` (MongoDB Atlas)
  - `JWT_SECRET` (generated secret)
  - `CLIENT_URL` (set to frontend URL later)
- [ ] Deploy and copy backend URL

## Frontend Deployment (Vercel)
- [ ] Create Vercel project → Select `Client` folder
- [ ] Add environment variable:
  - `VITE_API_URL` (backend URL)
- [ ] Deploy

## Post-Deployment
- [ ] Copy frontend URL
- [ ] Update backend `CLIENT_URL` env var with frontend URL
- [ ] Redeploy backend
- [ ] Test signup/login
- [ ] Test chat functionality
- [ ] Verify no console errors

## Important URLs
- **Backend**: https://your-backend.vercel.app
- **Frontend**: https://your-frontend.vercel.app
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Dashboard**: https://vercel.com/dashboard

## File Structure Created
```
Server/
├── vercel.json        ✅ Created
├── api/
│   └── index.js       ✅ Created
├── package.json       ✅ Updated (start script)
└── index.js

Client/
├── vercel.json        ✅ Created
├── package.json
└── vite.config.js
```

## Environment Variables Reference

### Server (Backend)
```
KEY=sk-...                    # Gemini API key
MONGODB_URI=mongodb+srv://... # MongoDB connection
JWT_SECRET=generated-secret   # 32+ character secret
CLIENT_URL=https://...        # Frontend domain
TWIML_BASE_URL=https://...    # Backend domain
TWILIO_ACCOUNT_SID=...        # (Optional)
TWILIO_AUTH_TOKEN=...         # (Optional)
TWILIO_PHONE_NUMBER=...       # (Optional)
```

### Client (Frontend)
```
VITE_API_URL=https://your-backend.vercel.app
```
