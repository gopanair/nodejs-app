# Node.js (Express) app for Posit Connect

A small Express 5 app you can deploy to Posit Connect straight from GitHub (git-backed deployment).

Requires Posit Connect 2026.06.0 or later, an Advanced tier license, and Node.js set up on the server (see `../Dockerfile`).

## Files

| File | Purpose |
|------|---------|
| `app.js` | Entrypoint. It listens on the `HOST`/`PORT` that Connect assigns. |
| `package.json` | Lists dependencies. `engines.node` picks the Node 24 LTS line. |
| `package-lock.json` | Required. Connect runs `npm ci --omit=dev` from this file. |
| `manifest.json` | Required for git-backed deployment. Tells Connect this is `nodejs` content. |

## Run locally

```bash
npm ci
npm start            # http://127.0.0.1:3000
```

## Deploy from GitHub

1. Push this directory to a GitHub repo. It can be the repo root or a subdirectory.
2. In Connect, choose **Publish → Import from Git**.
3. Enter the repo URL and branch, then select the directory that contains `manifest.json`.
4. Connect checks for new commits on the branch and redeploys automatically.

## After changing code or dependencies

Run these from this directory, then commit all four files:

```bash
npm install                     # updates package-lock.json
uvx --from rsconnect-python rsconnect write-manifest nodejs \
    --entrypoint app.js --exclude .gitignore --exclude README.md --overwrite .
```

Connect checks the file checksums in `manifest.json`, so regenerate it whenever `app.js` or `package*.json` changes.
