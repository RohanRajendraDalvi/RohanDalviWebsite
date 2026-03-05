# Vercel Deployment Guide

This guide provides step-by-step instructions to deploy the portfolio website to Vercel.

## Prerequisites

- GitHub account with your repository pushed
- Vercel account (free tier works perfectly)
- EmailJS account with credentials ready

## Step 1: Prepare Your Repository

### 1.1 Ensure All Changes Are Committed

```bash
git status
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 1.2 Verify `.gitignore` Has Environment Files

Confirm your `.gitignore` includes:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

✅ Already configured in this project

## Step 2: Deploy to Vercel

### Option A: Connect GitHub (Recommended - Auto-Deploys)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Create New Project:**
   - Click "Add New..." → "Project"
   - Search for and select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Vercel auto-detects "Create React App"
   - **Root Directory:** Leave as default (.)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `build` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add three variables:
     ```
     REACT_APP_EMAILJS_PUBLIC_KEY = pk_xxxxx...
     REACT_APP_EMAILJS_SERVICE_ID = service_xxxxx...
     REACT_APP_EMAILJS_TEMPLATE_ID = template_xxxxx...
     ```
   - Make sure to add them to: **Production, Preview, and Development**
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~3-5 minutes)
   - When green checkmark appears, deployment is complete!

6. **Get Your URL:**
   - Your site is now live at `https://[project-name].vercel.app`
   - Vercel automatically provides a unique domain

### Option B: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Interactive Setup:**
   ```
   ? Set up and deploy "~/path/to/project"? [Y/n] y
   ? Which scope do you want to deploy to? [select your account]
   ? Link to existing project? [y/N] n
   ? What's your project's name? rohan-dalvi-portfolio
   ? In which directory is your code located? .
   ? Want to modify these settings? [y/N] n
   ```

4. **Add Environment Variables:**
   - After deployment, go to project Settings on Vercel
   - Add the three EmailJS environment variables
   - Redeploy for changes to take effect

## Step 3: Configure Custom Domain (Optional)

1. **Register Domain:**
   - Buy domain from GoDaddy, Namecheap, Route53, etc.

2. **Add to Vercel:**
   - Go to project → **Settings → Domains**
   - Click "Add"
   - Enter your domain name
   - Select environment (Production recommended)

3. **Update DNS:**
   - Vercel shows DNS records to update
   - Go to your domain registrar
   - Update A record or CNAME to point to Vercel
   - Wait 24-48 hours for DNS to propagate

## Step 4: Add Domain to EmailJS Allowlist

⚠️ **Important for Production Security**

1. **Get Your Vercel URL:**
   - Your site is at: `https://your-project.vercel.app`
   - Or your custom domain: `https://yourdomain.com`

2. **Add to EmailJS:**
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - **Security** → **Allowed Origins**
   - Add: `https://your-project.vercel.app`
   - Also add your custom domain if using one
   - Click "Add"

3. **Test:**
   - Visit your deployed site
   - Fill out contact form
   - Click "Send Message"
   - Check email for message delivery

## Step 5: Verify Deployment

### Check Build Logs
1. Go to Vercel project → **Deployments**
2. Click on the latest deployment
3. View build logs to ensure no errors

### Test Environment Variables
1. Deploy includes a log showing all env vars are set (masked for security)
2. If missing, form won't send (you'll see error message)

### Test Contact Form
1. Visit your deployed site
2. Scroll to Contact section
3. Fill form with test data
4. Click "Send Message"
5. Check your email: rohanrajendradalvi@gmail.com
6. Should arrive within seconds

## Step 6: Enable Auto-Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push origin main

# Vercel automatically starts building and deploying!
# Check Vercel dashboard for build status
```

## Automatic Deployments

Every time you push to `main` branch:
1. Vercel automatically triggers build
2. Runs `npm install && npm run build`
3. Deploys to production if successful
4. Updates your live site

## Troubleshooting

### Build Fails on Vercel
**Error:** Red X on deployment

**Solutions:**
1. Check build logs: click deployment → "View Logs"
2. Ensure all env variables are set in Vercel settings
3. Verify `package.json` scripts are correct
4. Run `npm run build` locally to debug
5. Check for TypeScript/ESLint errors

### Contact Form Not Sending
**Error:** "Message blocked" or error message

**Solutions:**
1. Verify all three env vars are in Vercel settings:
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
2. Check EmailJS template has expected fields: `{{name}}`, `{{email}}`, `{{message}}`, `{{title}}`, `{{time}}`
3. Add your domain to EmailJS allowlist
4. Test locally first: `npm start` + fill form
5. Check browser console for JavaScript errors

### Portfolio Looks Different
**Error:** CSS/Images not loading

**Solutions:**
1. Clear browser cache: Ctrl+Shift+Delete
2. Check Vercel build logs for missing assets
3. Verify all files in `public/` folder copied correctly:
   - `favicon.png`
   - `logo.png`
   - `profile.jpg`
   - `resume.pdf`

### Domain Not Working
**Error:** ERR_NAME_NOT_RESOLVED or 404

**Solutions:**
1. Wait 24-48 hours for DNS propagation
2. Check DNS records point to Vercel
3. Use [DNS Checker](https://dnschecker.org) to verify
4. Contact domain registrar support if still not working

## Performance Tips

### Optimize Images
- Vercel auto-optimizes during build
- No additional action needed

### Monitor Build Time
- Vercel dashboard shows build time
- Current average: 2-3 minutes
- ⚠️ If >5 min, check for issues

### Analytics
- Vercel provides free analytics
- View in project → **Analytics**
- Shows page visits, real user metrics

## Security Checklist

- [ ] All `.env` files in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Environment variables set in Vercel
- [ ] Domain added to EmailJS allowlist
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Contact form rate limiting enabled
- [ ] Email validation working

## Rollback to Previous Deployment

If something breaks:

1. Go to Vercel project → **Deployments**
2. Find working deployment
3. Click → **Promote to Production**
4. Site reverts to that version

## Cancel or Delete Project

1. Go to project → **Settings**
2. Scroll to **Danger Zone**
3. Click **Delete Project**
4. Confirm deletion

---

## Commands Reference

```bash
# Local development
npm install          # Install dependencies
npm start            # Start local dev server
npm run build        # Create production build
npm test             # Run tests (if configured)

# Vercel
vercel               # Deploy with CLI
vercel --prod        # Deploy to production
vercel logs          # View deployment logs
```

## Helpful Resources

- [Vercel Docs](https://vercel.com/docs)
- [Create React App Deployment](https://create-react-app.dev/deployment/vercel/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [GitHub Pages vs Vercel](https://vercel.com/features/previews)

---

**Questions?** Check troubleshooting section above or contact: rohanrajendradalvi@gmail.com
