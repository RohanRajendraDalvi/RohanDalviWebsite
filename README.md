# Rohan Dalvi's Portfolio Website

A modern, responsive portfolio website built with React featuring an interactive skills matcher, project showcase, mini games, and a functional contact form with EmailJS integration.

**Live Demo:** https://rohandalvi.netlify.app/

**Features:**
- ✅ Fully responsive design (mobile-first)
- ✅ Dark/Light theme toggle
- ✅ Skills & Job Role matcher (semantic search engine)
- ✅ Functional email contact form with comprehensive validation
- ✅ Interactive mini games (Snake, Reaction Time, Memory, Typing Speed, Aim Trainer, Color Match)
- ✅ Smooth scroll navigation
- ✅ Resume PDF viewer modal
- ✅ Social media links

---

## Table of Contents

1. [Quick Start (Local Development)](#quick-start)
2. [Available Scripts](#available-scripts)
3. [Environment Variables (EmailJS)](#environment-variables)
4. [Deployment to Vercel](#deployment-to-vercel)
5. [Security & Vulnerabilities](#security--vulnerabilities)
6. [Project Structure](#project-structure)
7. [Technology Stack](#technology-stack)

---

## Quick Start

### Prerequisites
- Node.js 14+ and npm installed
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RohanRajendraDalvi/RohanDalviWebsite.git
cd RohanDalviWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then fill in your EmailJS credentials (see [Environment Variables](#environment-variables) section).

4. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000` (or `http://localhost:3001` if 3000 is occupied).

---

## Available Scripts

### `npm start`
Runs the app in development mode.
- Opens browser automatically to `http://localhost:3000`
- Hot-reloads when you save changes
- Shows ESLint warnings in the console

### `npm run build`
Builds the app for production.
- Creates optimized bundle in `build/` folder
- Minified and optimized for performance
- **Output:** 63.72 kB gzipped
- Ready for deployment to Vercel, Netlify, or any static hosting

### `npm test`
Launches the test runner (if tests are added).

### `npm run eject`
⚠️ **ONE-WAY OPERATION** - Ejects from Create React App (not recommended for this project).

---

## Environment Variables

The contact form requires EmailJS credentials. Follow these steps:

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for free and verify your email
3. No credit card required

### Step 2: Set Up Email Service
1. In EmailJS Dashboard → **Email Services**
2. Click **Add New Service**
3. Choose your provider (Gmail, Outlook, SMTP, etc.)
4. Follow setup instructions and **copy the Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up template with these variables:
   - `{{name}}` - Contact person's name
   - `{{email}}` - Contact person's email
   - `{{message}}` - Message body
   - `{{title}}` - Email subject/title
   - `{{time}}` - Submission timestamp (optional)

Example template:
```
Name: {{name}}
Email: {{email}}
Sent: {{time}}

Message:
{{message}}
```

4. **Copy the Template ID**

### Step 4: Get API Public Key
1. Go to **Account → API Keys**
2. **Copy your Public Key**

### Step 5: Configure `.env`
Edit `.env` in your project root:
```env
REACT_APP_EMAILJS_PUBLIC_KEY=pk_your_public_key_here
REACT_APP_EMAILJS_SERVICE_ID=service_your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=template_your_template_id_here
```

### Step 6: Restart Dev Server
```bash
npm start
```

---

## Deployment to Vercel

### Method 1: Auto-Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: portfolio website"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects Create React App

3. **Set Environment Variables:**
   - In Vercel project settings → **Environment Variables**
   - Add these three variables:
     - `REACT_APP_EMAILJS_PUBLIC_KEY`
     - `REACT_APP_EMAILJS_SERVICE_ID`
     - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - Paste your values from `.env`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site is live at `https://your-project.vercel.app`

5. **Set Up Custom Domain (Optional):**
   - In Vercel → **Settings → Domains**
   - Add your custom domain
   - Update DNS records per Vercel instructions

### Method 2: Manual Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow interactive prompts and add environment variables when prompted.

### Build & Deploy Manually

1. Create production build:
   ```bash
   npm run build
   ```

2. Test build locally:
   ```bash
   npx serve -s build
   ```

3. Deploy `build/` folder manually to any static hosting.

---

## Security & Vulnerabilities

### .gitignore Protection

Our `.gitignore` ensures sensitive files are never committed:

```
# Secrets protected
.env              ← Local secrets (never committed)
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build artifacts
/build
/dist
node_modules/

# IDE & OS files
.vscode/
.idea/
*.code-workspace
.DS_Store
Thumbs.db
```

**Status:** ✅ Secure - All sensitive env variables are .gitignore'd

### Contact Form Security

The app implements **7-layer validation** on form submission:

1. **Honeypot field** - Hidden field catches bots
2. **Input sanitization** - Removes `<>` characters
3. **Name validation** - 2-80 chars, letters/spaces/hyphens only
4. **Email validation** - Strict regex checking
5. **Message validation** - 10-2000 chars, max 30 line breaks
6. **Pattern filtering** - Blocks `<script>`, `javascript:`, `onerror=`, etc.
7. **Link limiting** - Max 4 URLs per message
8. **Rate limiting** - Max 1 submit per 60 seconds per browser (localStorage-based)

### EmailJS Security

After deploying to Vercel:

1. **Add Domain to AllowList** (recommended):
   - EmailJS Dashboard → **Security**
   - Add your Vercel domain: `https://your-project.vercel.app`
   - This restricts API calls to your domain only

2. **Keep Keys Secure:**
   - Public Key is safe to expose (React apps)
   - Store all keys in Vercel environment variables
   - Never commit `.env` file

3. **API Rate Limiting:**
   - EmailJS free tier: 200 emails/month
   - Your app enforces 60s cooldown between submissions
   - Ensure domain allowlist is set for Vercel URL

### npm Audit Status

```
26 vulnerabilities (9 low, 3 moderate, 14 high)
Status: ⚠️ Most vulnerabilities are in dev dependencies (react-scripts, webpack, jest)

Production dependencies are SECURE:
✅ @emailjs/browser - No vulnerabilities
✅ lucide-react - No vulnerabilities
✅ react - No vulnerabilities  
✅ react-dom - No vulnerabilities

Dev dependencies:
⚠️ These only affect local development, not production builds
   - react-scripts (build tool)
   - jest (testing)
   - webpack-dev-server (dev server)

Recommendation: Deploy as-is. Vercel builds with `npm run build` which is safe.
```

---

## Project Structure

```
RohanDalviWebsite/
├── public/
│   ├── index.html
│   ├── favicon.png
│   ├── logo.png
│   ├── profile.jpg
│   └── resume.pdf
├── src/
│   ├── App.jsx          (Main component, 942 lines)
│   └── index.js
├── assets/
│   ├── favicon/
│   ├── logo/
│   ├── profile/
│   └── resume/
├── .env.example         (Template for env vars)
├── .env                 (Local secrets - NOT committed)
├── .gitignore           (Git ignore rules)
├── package.json         (Dependencies & scripts)
└── README.md            (This file)
```

---

## Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **Lucide React 0.263.1** - Icon library (50+ icons)
- **@emailjs/browser 4.4.1** - Email delivery
- **react-scripts 5.0.1** - Build tooling (CRA)

### Hosting
- **Vercel** - Production deployment
- **Node.js** - Runtime

### Features
- Context API for theme management
- Custom React hooks (useState, useEffect, useRef, useMemo, useContext)
- Responsive CSS Grid & Flexbox
- LocalStorage for rate limiting
- Intersection Observer API for scroll detection
- Canvas API for Snake & Aim Trainer games

---

## Troubleshooting

### Contact form not sending emails?
1. Check `.env` has all three EmailJS credentials
2. Verify EmailJS account is active (check inbox for verification email)
3. Ensure email template variables match code (name, email, message, title, time)
4. Check browser console for JavaScript errors
5. Confirm domain is added to EmailJS allowlist (for production)

### App not starting locally?
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version: `node --version` (needs 14+)
4. Clear npm cache: `npm cache clean --force`

### Build fails on Vercel?
1. Ensure all env variables are set in Vercel project settings
2. Check Vercel build logs for specific error
3. Run `npm run build` locally to debug

### Resume PDF not loading?
1. Ensure `resume.pdf` exists in `public/` folder
2. Check file path in ResumeModal component
3. Verify PDF is valid and not corrupted

---

## Contributing

Pull requests welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Contact

- **Email:** rohanrajendradalvi@gmail.com
- **LinkedIn:** [Rohan Dalvi](https://www.linkedin.com/in/rohan-dalvi-0983693a9/)
- **GitHub:** [RohanRajendraDalvi](https://github.com/RohanRajendraDalvi)

---

**Last Updated:** March 4, 2026
**Build Status:** Production Ready ✅
