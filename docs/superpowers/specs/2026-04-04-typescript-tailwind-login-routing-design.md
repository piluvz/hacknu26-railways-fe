# TypeScript + Tailwind + Login + Routing Design

**Date:** 2026-04-04
**Project:** kaz-railways-fe

## Overview

Add TypeScript support, Tailwind CSS v4, a login page (ported from an existing Next.js project), and client-side routing via `react-router-dom`. No protected routes — simple flat routing for now.

## 1. TypeScript Setup

- Install `typescript` and `@types/node` as dev dependencies
- Add `tsconfig.json` (Vite-standard config: `"target": "ES2020"`, `"jsx": "react-jsx"`, strict mode on, `moduleResolution: "bundler"`)
- Add `tsconfig.node.json` for Vite config file
- Rename:
  - `src/App.jsx` → `src/App.tsx`
  - `src/main.jsx` → `src/main.tsx`
  - `vite.config.js` → `vite.config.ts`
- Update `index.html` script src from `main.jsx` → `main.tsx`
- Update `eslint.config.js` to cover `**/*.{ts,tsx}` and add `@typescript-eslint` parser/rules

## 2. Tailwind CSS v4

- Install `tailwindcss` and `@tailwindcss/vite` as dev dependencies
- Register `tailwindcss()` plugin in `vite.config.ts`
- Add `@import "tailwindcss";` to `src/index.css` (replaces manual config file — Tailwind v4 scans automatically)

## 3. Routing

- Install `react-router-dom` (and `@types/react-router-dom`)
- `src/main.tsx`: wrap `<App />` in `<BrowserRouter>`
- `src/App.tsx`: replace Vite starter content with:
  ```tsx
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
  ```

## 4. Login Page

**File:** `src/pages/login/index.tsx`

Ported from the user's Next.js project with the following adaptations:
- Remove `"use client"` directive (not applicable in Vite)
- Replace `next/image` with a plain `<img>` tag (or remove background image entirely)
- Replace `useRouter` from `next/navigation` with `useNavigate` from `react-router-dom`
- Replace `router.push('/dashboard')` with `navigate('/dashboard')`
- Replace `<a href="/register">` with `<Link to="/register" />`
- Background: `bg-black` instead of SVG background image
- API endpoint: placeholder — `// TODO: replace with kaz-railways login API endpoint`

**Form fields:** `username_or_email` (email input), `password`

**States:** `formData`, `error`, `successMessage`, `isLoading`

**Login flow:**
1. POST to placeholder API
2. On success: store `token` in `localStorage`, show success message, redirect to `/dashboard` after 2s
3. On failure: display error message from API response

## 5. File Structure After Changes

```
src/
  main.tsx          (renamed, BrowserRouter added)
  App.tsx           (renamed, Routes added)
  index.css         (Tailwind import added)
  pages/
    home/
      index.tsx     (unchanged)
    login/
      index.tsx     (new)
  components/
    home/
      Header.tsx    (unchanged)
      index.tsx     (unchanged)
vite.config.ts      (renamed, Tailwind plugin added)
tsconfig.json       (new)
tsconfig.node.json  (new)
eslint.config.js    (updated for TS)
```

## Out of Scope

- Protected/authenticated routes (deferred until backend is live)
- Registration page (link present but route not implemented)
- Dashboard page (redirect target is a placeholder)
- Any visual changes beyond black background on login
