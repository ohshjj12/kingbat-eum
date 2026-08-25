# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Apps in Toss AIT build

This project is configured for Apps in Toss (`@apps-in-toss/web-framework`, `ait build`).

Build an AIT artifact in Docker (remote build flow):

```bash
docker compose run --no-deps --build \
  --name kingbat-eum-ait-build \
  -e VITE_API_BASE_URL="http://kpearl.net:11002" \
  frontend-app sh -lc 'corepack pnpm build'
```

After the build, copy the generated `.ait` file from the container and upload it in the Apps in Toss console.

## HTTPS deployment

The Docker deployment uses an nginx gateway for HTTPS. Set the real DNS names and the email used by Let's Encrypt in `.env`:

```bash
cp .env.example .env
# CERTBOT_EMAIL을 실제 이메일로 수정
```

The `A` records for both names must point to this server, and ports 80 and 443 must be open. Issue the first certificate while the web gateway is stopped:

```bash
docker compose --profile certbot run --rm --service-ports certbot
docker compose up -d --build
```

The certificate covers both `DOMAIN` and `API_DOMAIN`. The frontend is served at `DOMAIN`, while `API_DOMAIN` is proxied to `API_UPSTREAM` (default: `http://host.docker.internal:11002`). Renew certificates periodically on the host:

```bash
docker compose --profile certbot run --rm certbot renew --webroot -w /var/www/certbot
docker compose restart web
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
