# EcoVerse Backend

## Oracle Configuration

Set these environment variables before starting the backend:

- `ORACLE_USER`
- `ORACLE_PASSWORD`
- `ORACLE_CONNECT_STRING` (example: `localhost/FREEPDB1`)
- `ORACLE_CLIENT_LIB_DIR` (optional, needed for old Oracle server versions via Thick mode)
- `ORACLE_POOL_MIN` (optional, default `1`)
- `ORACLE_POOL_MAX` (optional, default `5`)
- `ORACLE_POOL_INCREMENT` (optional, default `1`)
- `JWT_SECRET` (optional for local dev)
- `BCRYPT_ROUNDS` (optional, default `10`)
- `PORT` (optional, default `4000`)

Example `.env`:

```env
ORACLE_USER=ecoverse
ORACLE_PASSWORD=your_password
ORACLE_CONNECT_STRING=localhost/FREEPDB1
ORACLE_CLIENT_LIB_DIR=C:\\oracle\\instantclient_23_5
ORACLE_POOL_MIN=1
ORACLE_POOL_MAX=5
ORACLE_POOL_INCREMENT=1
JWT_SECRET=ecoverse-dev-secret
BCRYPT_ROUNDS=10
PORT=4000
```

## Initialize Database with SQL*Plus

From the `backend` directory:

```bash
sqlplus your_user/your_password@your_connect_string @db/01_schema.sql
sqlplus your_user/your_password@your_connect_string @db/02_seed.sql
```

## Run Backend

```bash
npm install
npm run dev
```

If you see `NJS-138` (unsupported server version in Thin mode), install Oracle Instant Client 64-bit and set `ORACLE_CLIENT_LIB_DIR` to that folder.

## Smoke Test Checklist

- `POST /auth/register` returns token and user object.
- `POST /auth/login` returns token and user object.
- `GET /me` returns profile stats for the authenticated user.
- `POST /upload-image` creates a classification and adds 10 points.
- `GET /classifications` returns latest 10 classifications.
- `POST /pickup` creates a scheduled pickup.
- `PATCH /pickup/:id/status` updates pickup and rewards completion.
- `GET /rewards` returns points, catalog, and reward history.
- `POST /rewards/redeem` deducts points and appends reward event.
- `GET /get-route` still computes route data from static graph.
