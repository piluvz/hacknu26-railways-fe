# TypeScript + Tailwind + Login + Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the kaz-railways-fe project to TypeScript, add Tailwind CSS v4, install react-router-dom, and add a login page ported from an existing Next.js project.

**Architecture:** Flat client-side routing with BrowserRouter at the root; two routes (`/` and `/login`). TypeScript strict mode throughout. Tailwind v4 via the official Vite plugin — no config file needed.

**Tech Stack:** React 19, TypeScript 5, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom v7

---

### Task 1: Install all new dependencies

**Files:**

- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install runtime dependencies**

```bash
cd "/Users/piluvz/Desktop/HACKNU project/kaz-railways-fe"
npm install react-router-dom
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D typescript @types/node @types/react-router-dom tailwindcss @tailwindcss/vite
```

Expected output: `added N packages` with no errors.

- [ ] **Step 3: Verify package.json has the new deps**

Check `package.json` — `react-router-dom` should be in `dependencies`, and `typescript`, `@types/node`, `@types/react-router-dom`, `tailwindcss`, `@tailwindcss/vite` should be in `devDependencies`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add typescript, tailwind, and react-router-dom dependencies"
```

---

### Task 2: Add TypeScript configuration

**Files:**

- Create: `tsconfig.json`
- Create: `tsconfig.node.json`

- [ ] **Step 1: Create tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

- [ ] **Step 2: Create tsconfig.app.json**

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json tsconfig.app.json tsconfig.node.json
git commit -m "chore: add TypeScript configuration"
```

---

### Task 3: Migrate Vite config to TypeScript and add Tailwind plugin

**Files:**

- Create: `vite.config.ts`
- Delete: `vite.config.js`

- [ ] **Step 1: Create vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 2: Delete old vite.config.js**

```bash
rm "/Users/piluvz/Desktop/HACKNU project/kaz-railways-fe/vite.config.js"
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts vite.config.js
git commit -m "chore: migrate vite config to TypeScript, add Tailwind v4 plugin"
```

---

### Task 4: Update ESLint config for TypeScript

**Files:**

- Modify: `eslint.config.js`

- [ ] **Step 1: Install TypeScript ESLint**

```bash
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- [ ] **Step 2: Rewrite eslint.config.js**

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],
    },
  },
]);
```

- [ ] **Step 3: Commit**

```bash
git add eslint.config.js package.json package-lock.json
git commit -m "chore: configure ESLint for TypeScript"
```

---

### Task 5: Add Tailwind import to index.css

**Files:**

- Modify: `src/index.css`

- [ ] **Step 1: Prepend Tailwind import to src/index.css**

Add `@import "tailwindcss";` as the very first line of `src/index.css`, before any existing styles.

The top of the file should look like:

```css
@import "tailwindcss";

/* existing styles below... */
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "chore: add Tailwind CSS v4 import"
```

---

### Task 6: Migrate main.jsx → main.tsx with BrowserRouter

**Files:**

- Create: `src/main.tsx`
- Delete: `src/main.jsx`
- Modify: `index.html`

- [ ] **Step 1: Create src/main.tsx**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 2: Delete src/main.jsx**

```bash
rm "/Users/piluvz/Desktop/HACKNU project/kaz-railways-fe/src/main.jsx"
```

- [ ] **Step 3: Update index.html script src**

In `index.html`, change:

```html
<script type="module" src="/src/main.jsx"></script>
```

to:

```html
<script type="module" src="/src/main.tsx"></script>
```

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/main.jsx index.html
git commit -m "feat: migrate main entry to TypeScript, add BrowserRouter"
```

---

### Task 7: Migrate App.jsx → App.tsx with Routes

**Files:**

- Create: `src/App.tsx`
- Delete: `src/App.jsx`

- [ ] **Step 1: Create src/App.tsx**

```tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
```

- [ ] **Step 2: Delete src/App.jsx**

```bash
rm "/Users/piluvz/Desktop/HACKNU project/kaz-railways-fe/src/App.jsx"
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/App.jsx
git commit -m "feat: migrate App to TypeScript, add Routes for / and /login"
```

---

### Task 8: Fix existing TypeScript pages

**Files:**

- Modify: `src/pages/home/index.tsx`
- Modify: `src/components/home/index.tsx`

- [ ] **Step 1: Add export default to src/pages/home/index.tsx**

The current file is missing `export default`. Replace its contents with:

```tsx
function HomePage() {
  return <div style={{ backgroundColor: "#111112" }}></div>;
}

export default HomePage;
```

- [ ] **Step 2: Add export default to src/components/home/index.tsx**

Replace its contents with:

```tsx
function Home() {
  return <div style={{ backgroundColor: "#111112" }}></div>;
}

export default Home;
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/index.tsx src/components/home/index.tsx
git commit -m "fix: add missing export defaults to home page and component"
```

---

### Task 9: Create the login page

**Files:**

- Create: `src/pages/login/index.tsx`

- [ ] **Step 1: Create src/pages/login/index.tsx**

```tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface FormData {
  username_or_email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username_or_email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // TODO: replace with kaz-railways login API endpoint
      const response = await fetch("https://placeholder.api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        setError(errorData.message ?? "Invalid input data. Please try again.");
        return;
      }

      const data = (await response.json()) as { token: string };
      localStorage.setItem("token", data.token);

      setSuccessMessage("Login successful! Redirecting to the dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-9 rounded-2xl shadow-lg w-full max-w-md mx-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login to Your Account
        </h1>

        {successMessage && (
          <div className="mb-4 text-sm text-green-600">{successMessage}</div>
        )}

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        {isLoading && (
          <div className="flex items-center justify-center mb-4">
            <svg
              className="animate-spin h-6 w-6 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600">Logging in...</span>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="username_or_email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address:
          </label>
          <input
            id="username_or_email"
            type="email"
            placeholder="admin@gmail.com"
            value={formData.username_or_email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="flex items-center justify-between">
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <a
              href="#"
              className="text-sm text-pink-500 hover:underline ml-2 whitespace-nowrap"
            >
              Forget Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/login/index.tsx
git commit -m "feat: add login page (ported from Next.js, black background, placeholder API)"
```

---

### Task 10: Verify everything works

- [ ] **Step 1: Run the dev server**

```bash
cd "/Users/piluvz/Desktop/HACKNU project/kaz-railways-fe"
npm run dev
```

Expected: server starts on `http://localhost:5173` with no errors.

- [ ] **Step 2: Check the home route**

Open `http://localhost:5173/` — should render the dark background home page (no errors in console).

- [ ] **Step 3: Check the login route**

Open `http://localhost:5173/login` — should render the white login card on a black background with email + password fields and Sign In button.

- [ ] **Step 4: Run the linter**

```bash
npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 5: Run the build**

```bash
npm run build
```

Expected: build completes with no TypeScript or Vite errors.
