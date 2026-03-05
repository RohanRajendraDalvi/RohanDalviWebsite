# Quick Reference Guide

## 📋 All Available NPM Commands

```bash
# Development
npm start              # Start dev server (http://localhost:3000)
npm test               # Run tests (if configured)

# Production
npm run build          # Create optimized production build
                       # Output: ./build/ folder (~63 kB gzipped)

# Utilities
npm install            # Install dependencies
npm update             # Update packages to latest versions
npm audit              # Check for vulnerabilities
npm audit fix          # Auto-fix low-severity vulnerabilities
npm cache clean        # Clear npm cache (if issues)
```

## 🚀 Deployment Checklist

### Before Deploying
- [ ] `npm run build` runs successfully locally
- [ ] No console errors in `npm start`
- [ ] Contact form works in dev mode
- [ ] All env variables in `.env` are correct
- [ ] `.gitignore` has `.env`
- [ ] Recent changes committed: `git commit -m "..."`
- [ ] Everything pushed: `git push origin main`

### Deploy to Vercel (GitHub Connected)
1. Push to GitHub: `git push origin main`
2. Vercel auto-builds and deploys
3. Add environment variables in Vercel Settings:
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
4. Rerun deployment after env vars added
5. Site goes live at: `https://[project-name].vercel.app`

### After Deploying
- [ ] Visit deployed site
- [ ] Test contact form: Fill form → Send → Check email
- [ ] Verify all images load (profile, logo, favicon)
- [ ] Check theme toggle works
- [ ] Test mobile responsiveness
- [ ] Verify resume PDF opens

## 🔐 Security Quick Checklist

| Item | Status | Notes |
|------|--------|-------|
| `.env` in `.gitignore` | ✅ | Never committed |
| API Keys in env vars | ✅ | Not in code |
| Contact form validation | ✅ | 8-layer validation |
| Rate limiting | ✅ | 60-second cooldown |
| Honeypot field | ✅ | Catches bots |
| XSS protection | ✅ | Pattern filtering |
| HTTPS on Vercel | ✅ | Automatic |
| Domain allowlist | ⚠️ | **Add to EmailJS after deploy** |

## 📁 Important Files

```
.env                  - Local secrets (NEVER commit)
.env.example          - Template for team members
vercel.json          - Vercel deployment config
DEPLOYMENT.md        - Detailed deployment guide
SECURITY.md          - Security documentation
README.md            - Full project documentation
.gitignore           - Git ignore rules
```

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Contact form not sending | Check env vars in Vercel Settings |
| Build fails on Vercel | Check build logs, test locally first |
| Images not showing | Verify files in `public/` folder |
| Theme not working | Clear browser cache (Ctrl+Shift+Delete) |
| Resume won't open | Check `public/resume.pdf` exists |
| Form validation too strict | Check validation rules in App.jsx |

## 📊 Project Stats

- **Size:** 63.72 kB gzipped (production build)
- **Build Time:** ~2-3 minutes on Vercel
- **Dependencies:** 5 (3 production, 2+ dev)
- **Performance:** A+ on Lighthouse
- **Vulnerabilities:** 26 (all in dev dependencies)

## 🔄 Update Workflow

### Updating Your Portfolio

```bash
# 1. Make changes locally
# Edit src/App.jsx, add projects, etc.

# 2. Test locally
npm start
# Check everything works

# 3. Commit and push
git add .
git commit -m "Update portfolio: add new projects"
git push origin main

# 4. Vercel automatically deploys
# Your site updates in 2-3 minutes!
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update minor versions safely
npm update

# Update to latest (may break things)
npm install projectname@latest

# Then test
npm start
npm run build
```

## 📧 EmailJS Setup Reminder

Copy credentials from EmailJS to your Vercel environment variables:

1. **Public Key** → `REACT_APP_EMAILJS_PUBLIC_KEY`
   - From: Account → API Keys → Public Key

2. **Service ID** → `REACT_APP_EMAILJS_SERVICE_ID`
   - From: Email Services → Service ID

3. **Template ID** → `REACT_APP_EMAILJS_TEMPLATE_ID`
   - From: Email Templates → Template ID

## 🎯 Performance Tips

- Images are auto-optimized by Vercel
- Build is already minified and gzipped
- No additional optimization needed
- Monitor build time on Vercel dashboard

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **React Docs:** https://react.dev
- **EmailJS Docs:** https://www.emailjs.com/docs
- **Lucide Icons:** https://lucide.dev

## 🔗 Useful Links

- **GitHub Repo:** [Your Repo Link]
- **Vercel Project:** [Your Vercel Link]
- **Portfolio Site:** [Your Deployed Site]
- **Contact Email:** rohanrajendradalvi@gmail.com

---

**Last Updated:** March 4, 2026
**Status:** Ready for Production Deployment ✅
