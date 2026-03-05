# Security & Vulnerability Documentation

## Overview

This document outlines all security measures implemented in the portfolio website and how to maintain security during development and deployment.

## 1. Environment Variable Protection

### What's Protected
- EmailJS Public Key
- EmailJS Service ID
- EmailJS Template ID

### Protection Method
- All env vars stored in `.env` file
- `.env` is included in `.gitignore`
- Never committed to git history
- Safe to push to GitHub

### For Vercel Deployment
1. Add env vars in Vercel project Settings
2. Mark as: Production, Preview, Development
3. Values are encrypted in Vercel
4. Never leaked in build logs

### Best Practices
```bash
# ✅ DO: Use environment variables
console.log(process.env.REACT_APP_EMAILJS_PUBLIC_KEY) // Safe in React env

# ❌ DON'T: Hardcode secrets
const API_KEY = "pk_1234567890..." // Never do this
```

## 2. Contact Form Validation

### 7-Layer Security Implementation

#### Layer 1: Honeypot Field
- Hidden form field named `website`
- Bots auto-fill hidden fields
- If `website` is populated, form rejects submission
- Users never see this field (HTML: `display:none`, `position:absolute`)

```jsx
<input 
  type="text" 
  name="website" 
  tabIndex={-1}
  aria-hidden="true"
  style={{position:"absolute",left:"-9999px"}}
/>
```

#### Layer 2: Input Sanitization
- Removes dangerous characters: `<`, `>`
- Trims whitespace
- Lowercases email for normalization

```javascript
const sanitize = (value="") => value.replace(/[<>]/g, "").trim();
```

#### Layer 3: Required Field Validation
- Name must be present
- Email must be present
- Message must be present

#### Layer 4: Field Length Validation
- **Name:** 2-80 characters
- **Email:** Max 120 characters (RFC 5321)
- **Message:** 10-2000 characters

#### Layer 5: Email Format Validation
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- Checks for: `user@domain.ext`
- Rejects invalid formats

#### Layer 6: Name Character Validation
- Only allows: A-Z, a-z, spaces, hyphens, apostrophes
- Rejects numbers and special characters
- Example: ✅ "John O'Brien-Smith" ❌ "John123"

#### Layer 7: Message Content Filtering
```javascript
// Blocks XSS attempts
const suspiciousPattern = /<script|javascript:|onerror=|onload=|data:text\/html/i;

// Limits spam links (max 4 per message)
const urlCount = (message.match(/https?:\/\//gi) || []).length 
               + (message.match(/www\./gi) || []).length;

if (suspiciousPattern.test(message) || urlCount > 4) {
  // Reject submission
}
```

#### Layer 8: Rate Limiting
- Max 1 submission per 60 seconds per browser
- Uses localStorage to track: `contact_last_submit_at`
- User sees countdown: "Please wait 45s before sending another message"

## 3. Production Security (Vercel)

### HTTPS/SSL
- ✅ Automatic with Vercel
- All traffic encrypted
- No additional setup needed

### EmailJS Domain Allowlist
- **Why:** Prevents token abuse from other sites
- **Setup:**
  1. Go to EmailJS Dashboard → Security
  2. Add your domain: `https://your-project.vercel.app`
  3. Also add custom domain if using one
  4. Vercel domain: Only requests from that domain accepted

### CSP (Content Security Policy)
- Vercel automatically sets headers
- Prevents inline scripts, external script injection
- Verify in browser DevTools → Network → Response Headers

### No External Dependencies
- ❌ No jQuery
- ❌ No external auth services
- ❌ No analytics (privacy-friendly)
- ✅ All code self-contained in React

## 4. npm Audit Results & Assessment

### Current Status
```
26 vulnerabilities (9 low, 3 moderate, 14 high)
```

### Breakdown
- **9 Low:** Non-critical, usually informational
- **3 Moderate:** May affect development only
- **14 High:** In dev dependencies (react-scripts, jest, webpack)

### Affected Packages (DEV ONLY)
```
@tootallnate/once          - Used by jest
jsonpath                    - Used by testing tools
nth-check                   - Used by style processors
postcss                     - CSS processing (build-time)
serialize-javascript        - Webpack bundling
underscore                  - Dependency of build tools
webpack-dev-server          - Local dev only
```

### Production Dependencies (CLEAN ✅)
```
@emailjs/browser ^4.4.1     - NO vulnerabilities
lucide-react ^0.263.1       - NO vulnerabilities
react ^18.2.0               - NO vulnerabilities  
react-dom ^18.2.0           - NO vulnerabilities
```

### Why This Is Safe for Production
1. All vulnerabilities are in **development dependencies**
2. `npm run build` creates static files (no Node runtime needed)
3. Vercel only runs `npm run build`, not dev tools
4. Final build has NO vulnerable code

### Risk Assessment
- **Development Risk:** ⚠️ Low (local machine only)
- **Production Risk:** ✅ None (clean dependencies)
- **Deployment Risk:** ✅ Safe to deploy

## 5. API Key Security

### Public Key Exposure
- EmailJS Public Key IS meant to be public
- It's used by frontend (React) code
- ❌ Can be viewed in browser DevTools
- ✅ This is normal and safe

### Domain Allowlist Protects Against
- Another website calling YOUR EmailJS service
- Token usage from unauthorized domains
- Example: `malicious-site.com` can't use your service

### Best Practices
```javascript
// ✅ Correct: Public key in env var
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// ❌ Wrong: Even "secret" keys in frontend code are exposed
// All frontend code is visible in browser

// ⚠️ NEVER DO: Put secret keys in REACT_APP_* vars
// They WILL be exposed in the browser
```

## 6. .gitignore Comprehensive Check

### Current Configuration
```
✅ .env                     - Local secrets
✅ .env.local              - Override file
✅ .env.*.local            - Environment-specific
✅ node_modules/           - Installed packages
✅ /build /dist            - Build artifacts
✅ .vscode/ .idea/         - IDE files
✅ *.code-workspace        - VS Code workspace
✅ .DS_Store Thumbs.db     - OS files
```

### Validated: Safe & Secure
- No credentials can be accidentally committed
- No node_modules bloat in repo
- No IDE-specific settings shared

## 7. Secure Development Workflow

### Before Every Commit
```bash
# 1. Check what you're committing
git diff
git status

# 2. Never commit:
# - .env files
# - API keys or secrets
# - node_modules/
# - Build artifacts

# 3. Verify .gitignore catches these
git check-ignore -v .env
# Should output: .env	.gitignore
```

### Before Every Deployment
```bash
# 1. Review changes
git log --oneline -5

# 2. Check for secrets
git show HEAD | grep -i password # Should be empty
git show HEAD | grep -i key      # Should be empty

# 3. Build locally
npm run build

# 4. Test locally
npm start
# Then test contact form, links, etc.

# 5. Push to GitHub
git push origin main
# Vercel auto-deploys
```

## 8. Monitoring & Alerts

### Set Up Security Monitoring
1. **GitHub:**
   - Enable "Security Advisories"
   - GitHub notifies of vulnerable dependencies
   - Automatically creates PRs with fixes

2. **Vercel:**
   - Enable "System Monitoring"
   - Get alerts for deployment failures
   - Check logs for errors

3. **EmailJS:**
   - Monitor usage in dashboard
   - Get alerts if quota exceeded
   - Watch for unusual patterns

## 9. Incident Response

### If Key Is Compromised
1. **Immediately:**
   - Change key in EmailJS dashboard
   - Update Vercel environment variables
   - All new emails use new key
   - Old key automatically revoked after 1 hour

2. **Investigation:**
   - Check EmailJS logs for unauthorized usage
   - Review contact form submissions
   - Monitor email inbox for spam

3. **Prevention:**
   - Rotate keys quarterly
   - Use strong domain allowlists
   - Review Vercel access logs

### If Repository Is Exposed
1. **Check GitHub Secrets:**
   - Go to repo → Settings → Security → Secret scanning
   - GitHub auto-detects exposed secrets
   - Revoke any detected keys immediately

2. **Audit History:**
   - Check git log: `git log --all --grep="env"`
   - If secret ever in code, purge history: `git reflog expire ...`

## 10. Compliance & Best Practices

### GDPR Compliance
- ✅ No user tracking
- ✅ No analytics stored
- ✅ Emails only stored in EmailJS (user configurable)
- ✅ Contact form messages not archived (unless configured)

### Security Headers (Automatic on Vercel)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Third-Party Security
- ✅ EmailJS (SOC 2 Certified)
- ✅ Vercel (SOC 2 Certified)
- ✅ GitHub (Industry standard)

## Checklist: Pre-Launch Security

- [ ] All `.env` files are gitignored
- [ ] No hardcoded API keys in code
- [ ] Environment variables set in Vercel
- [ ] EmailJS domain allowlist configured
- [ ] Contact form tested with valid/invalid inputs
- [ ] Rate limiting works (test 2 submissions in 60s)
- [ ] Email arrives correctly
- [ ] HTTPS working on deployed site
- [ ] No console errors in browser DevTools
- [ ] npm audit reviewed and understood

## Checklist: Ongoing Security

- [ ] Monthly: Check npm audit for new vulnerabilities
- [ ] Quarterly: Rotate EmailJS keys
- [ ] Quarterly: Review Vercel access logs
- [ ] On each deployment: Review git diff for secrets
- [ ] Yearly: Security audit and penetration testing

---

## Questions?

For security issues:
- 🔒 Don't post in public issues
- 📧 Email: rohanrajendradalvi@gmail.com
- 🔐 Never share your EmailJS keys

For vulnerabilities in dependencies:
- Check [npm security advisories](https://www.npmjs.com/advisories)
- Run: `npm audit`
- Update: `npm update`
