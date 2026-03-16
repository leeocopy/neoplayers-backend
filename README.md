# NeoPlayers Backend

Vercel-compatible serverless proxy with `player_api.php` upstream compatibility structures.

## Environment Variables
Ensure these are configured in Vercel settings:
- `UPSTREAM_BASE_URL`: e.g., `http://example.com:8080`
- `UPSTREAM_USERNAME`: Your login
- `UPSTREAM_PASSWORD`: Your password
- `APP_API_TOKEN`: Your private API Key (All endpoints require header: `x-api-key: <token>` accurately securely)

## Deployment Steps
1. Navigate to: `C:\Users\PC\Desktop\200\web\neoplayers-backend`
2. `git init`
3. `git add .`
4. `git commit -m "Initial commit"`
5. Setup GitHub repo mapping securely correctly.
6. Push.
7. Connect with Vercel and append environment buffers accurately.

## Endpoint references
- `GET /api/health` - public
- `GET /api/home` - requires key
- `GET /api/live?category_id=X` - requires key
- `GET /api/movies?category_id=X` - requires key
- `GET /api/series?category_id=X` - requires key
