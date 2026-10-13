# Wisdom School Manager

React + TypeScript + Vite school management application, with an installable web shell and automated Android debug APK build.

## Run locally
Requirements: Node.js 20+.

```bash
npm install
npm run build
npm run dev
```

## Publish on GitHub Pages
1. Push this project to a GitHub repository's `main` branch (or `master`).
2. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions** and confirm **Deploy web app and build Android APK** succeeds.
4. Find the live website URL under **Settings → Pages**.

## Download the Android APK
1. Open the repository's **Actions** tab.
2. Open the latest successful workflow run.
3. Under **Artifacts**, download `wisdom-school-manager-debug-apk`.
4. Extract the ZIP and install `app-debug.apk` on your Android phone. Android may ask you to allow installs from that source.

This is a **debug APK**, suitable for testing, not a signed Play Store release. A production release should use a private signing key stored as GitHub Actions secrets.

## Important: current data/authentication limitation
The original app stores records in browser `localStorage` and ships demo users/passwords in `src/data/db.ts`. Data is local to each browser/device, is not shared across staff accounts, and the demo authentication is **not production-secure**. Do not enter real student records, grades, payment information, or passwords until a server-side backend with real authentication, authorization, backups, and a shared database is implemented. A frontend build or APK alone cannot fix this architecture.

## Gemini configuration
Do not put a production Gemini API key in client-side code. Use a server-side endpoint and store the key as a server secret. `.env.example` is only a template; never commit real secrets.
