# Cloudflare Storage Signer Worker

This Worker signs upload requests for the frontend and verifies Firebase auth tokens.

## Endpoints

- `POST /api/storage/sign`

Request body:

```json
{
  "fileName": "cover.png",
  "fileType": "image/png",
  "userId": "firebase-uid"
}
```

Required header:

- `Authorization: Bearer <firebase-id-token>`

Response shape:

```json
{
  "uploadType": "images",
  "uploadMethod": "POST",
  "uploadURL": "https://...",
  "uploadHeaders": {},
  "filePath": "covers/<uid>/<filename>",
  "publicURL": "https://...",
  "expiresAt": "2026-04-02T20:11:00.000Z"
}
```

For R2 mode, response uses:

- `uploadType: "r2"`
- `uploadMethod: "PUT"`
- `uploadHeaders` includes `Content-Type`

## Setup

1. Install worker dependencies:

```bash
cd cloudflare-worker
npm install
```

2. Set secrets:

```bash
wrangler secret put CLOUDFLARE_API_TOKEN
wrangler secret put FIREBASE_API_KEY
wrangler secret put FIREBASE_PROJECT_ID
wrangler secret put CF_ACCOUNT_ID
```

3. For Cloudflare Images backend add:

```bash
wrangler secret put CF_IMAGES_HASH
```

4. For R2 backend add:

```bash
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY
wrangler secret put R2_BUCKET
wrangler secret put R2_PUBLIC_BASE_URL
```

5. Configure `wrangler.toml`:

- `STORAGE_BACKEND = "images"` or `"r2"`
- `ALLOWED_ORIGIN` should match the frontend origin in dev/prod
- `ALLOWED_MIME_TYPES` is a comma-separated allowlist (supports wildcards like `image/*`)
- `UPLOAD_URL_EXPIRY_SECONDS` is enforced and clamped between 60 and 3600 seconds

6. Run locally or deploy:

```bash
npm run dev
npm run deploy
```
