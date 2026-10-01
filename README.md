# Ujjawal Singhal — Portfolio

A portfolio built with React, Vite, Cloudflare Workers, GSAP, Lenis, and Three.js. The project preserves the original visual identity while allowing user-specific content to be swapped out cleanly.

## Overview

This is a single-page portfolio application for Ujjawal Singhal, a B.Tech Computer Science & Engineering student at ABES Engineering College, currently in the 3rd year (2024–2028), with a focus on AI/ML and software development.

## Stack

- React 19
- Vite 8
- Cloudflare Workers
- GSAP
- Lenis
- Three.js

## Project Structure

```text
portfolio/
├── functions/
│   └── api/
│       └── send-email.js
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── screenshots/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── worker.js
├── .env.example
├── index.html
├── package.json
├── vite.config.js
├── wrangler.jsonc
└── README.md
```

## Local Development

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Optional environment variables

Create a local `.dev.vars` or configure Cloudflare environment variables:

```env
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_EMAIL=your-inquiry-email@example.com
```

## Contact Form

The contact form uses the Resend API through the Cloudflare Worker route. The recipient email is configured via the `CONTACT_EMAIL` environment variable and is not hardcoded into the frontend.

## GitHub Telemetry

The GitHub telemetry endpoint reads the public GitHub profile for `ujjawalsinghal` and preserves the existing fetch/caching behavior while replacing the original owner identity.

## Notes

- The original owner's portfolio identity has been removed from metadata, contact routes, and README content.
- Resume download links and personal profile images are intentionally disabled or replaced with neutral placeholders until real Ujjawal-specific assets are provided.
- Project content should be updated with verified repositories and final materials before publishing.

## Ownership

Name: Ujjawal Singhal
Degree: B.Tech Computer Science & Engineering
College: ABES Engineering College
Period: 2024–2028
Current year: 3rd Year
Focus: AI/ML + Software Development
GitHub: https://github.com/ujjawalsinghal
CGPA: 8.92
