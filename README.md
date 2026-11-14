# Quatro frontend

Board order management for a surf company: customers, order forms, order sheets (PDF), and an orders grid with statuses.

Tech stack: React 19, React Router, Mantine 8 (with `@mantine/dates` and `mantine-datatable`), Vite.
The API lives in `quatro-backend`.

## Repos

The code lives in forks under the `goksu-okar` GitHub account:

- Frontend: https://github.com/goksu-okar/quatro-demo
- Backend: https://github.com/goksu-okar/quatro-backend

They were forked from `GoksuOkar/...`, an account we no longer have access to. Always push to and open pull requests against the `goksu-okar` forks. GitHub tools (including `gh pr create`) default to the original repo for a fork, so pass `--repo goksu-okar/quatro-demo`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

By default the app talks to the live API (`https://frwdmauiapi.com`). To use a local backend instead, create `.env.local` (not committed):

```
VITE_API_URL=http://localhost:3000
```

Restart `npm run dev` after creating or changing it. There's nothing to switch back before a release, because Vercel never sees `.env.local`.

Log in with the shop login for whichever database the backend uses. See the backend README to set it up.

## Deploying (Vercel)

- **Vercel team:** the project is in the **quatro** team. Vercel login is via Google.
- **Git connection:** the project is connected to `goksu-okar/quatro-demo`, with production branch `main`. A merge to `main` deploys to production.
- **Pull requests:** each one gets a preview deployment.
- **Environment variables:** none are needed.

**If the Git connection breaks:**

1. Make sure you're in the **quatro** team (team switcher, top left). The install flow sometimes drops you into the personal scope.
2. Go to **Settings → Git**, then **Disconnect**, then **Connect Git Repository**.
3. If the repo isn't listed, use **Add GitHub Account** while logged in to GitHub as `goksu-okar`.

**Order of a release:** deploy the backend first, then merge to `main` here straight after. See the backend README for the server steps.
