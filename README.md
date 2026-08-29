# Abdulkadir Mehfuz Sirajwala — Developer Portfolio

A dark, recruiter-focused React/Vite portfolio inspired by the supplied reference recording, but redesigned around Java backend/software engineering work.

## Stack
- React
- Vite
- Plain CSS
- No animation/UI library dependency

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Configuration
Edit `src/config.js` for profile links and the form endpoint.

The current contact form uses FormSubmit's AJAX endpoint with the public portfolio email. No password, SMTP credential, or private API secret is stored in the frontend.

If you prefer Formspree or another provider, replace `formServiceEndpoint` with that provider's endpoint.

## GitHub Pages / deployment
This Vite project can be deployed through GitHub Pages, Netlify, Vercel, or Cloudflare Pages. For GitHub Pages, configure the repository's Pages source using GitHub Actions and build the project with `npm run build`.
