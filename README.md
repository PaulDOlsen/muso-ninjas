# Quasar App (muso-ninjas)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Cloudflare Storage Setup (replaces Firebase Storage)

The frontend now uses a Cloudflare signing endpoint (Worker) and supports:

1. Cloudflare Images direct upload (`POST` form upload)
2. R2 presigned upload (`PUT` file upload)

Set frontend environment variables before running the app:

```bash
VITE_CF_STORAGE_SIGN_ENDPOINT=https://<your-worker-domain>/api/storage/sign
VITE_CF_UPLOAD_MAX_RETRIES=2
```

Notes:

1. `VITE_CF_STORAGE_SIGN_ENDPOINT` is required.
2. `VITE_CF_UPLOAD_MAX_RETRIES` is optional; default is `2`.
3. The create playlist page displays upload progress and includes a retry action.

Worker setup:

1. See [cloudflare-worker/README.md](cloudflare-worker/README.md)
2. Configure `STORAGE_BACKEND = "images"` or `"r2"` in `cloudflare-worker/wrangler.toml`.
3. Configure `ALLOWED_MIME_TYPES` and `UPLOAD_URL_EXPIRY_SECONDS` in `cloudflare-worker/wrangler.toml`.

Deploy commands:

1. Deploy only the Worker: `npm run deploy:worker`
2. Build web app and deploy Worker: `npm run deploy:all`

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### App style system

See [Style Playbook](src/css/STYLE_PLAYBOOK.md) for reusable app classes and migration guidance you can carry into future projects.
