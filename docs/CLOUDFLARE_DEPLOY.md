# Cloudflare Pages Deploy Guide

Guía para deployar sitios estáticos de Quafi en Cloudflare Pages.

---

## Estructura Actual

```
quafi.io                    → coming-soon/ (HTML + CSS estático)
quafi.io (futuro)           → landing page
app.quafi.io (futuro)       → plataforma React
```

---

## Configuración Existente

### Cloudflare

- **Dominio**: quafi.io (activo en cuenta de Agustinshehadi@gmail.com)
- **Proyecto Pages**: `quafi`
- **Account ID**: `a6f6d7e2fd28126eedd842bc6c7212d3`

### GitHub Secrets (ya configurados)

| Secret | Descripción |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Token con permisos de Cloudflare Pages |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Agustín |

---

## Deploy Manual (CLI)

### Requisitos

```bash
npm install -g wrangler
wrangler login
```

### Deployar Coming Soon

```bash
cd /path/to/hadi-project-design-system
wrangler pages deploy coming-soon --project-name=quafi
```

### Deployar otra carpeta

```bash
wrangler pages deploy <carpeta> --project-name=<nombre-proyecto>
```

---

## Auto-Deploy (GitHub Actions)

El workflow `.github/workflows/deploy-coming-soon.yml` deploya automáticamente cuando hay cambios en `coming-soon/`.

### Cómo funciona

```yaml
on:
  push:
    branches:
      - main
      - feature/quafi-modules
    paths:
      - 'coming-soon/**'  # Solo se dispara con cambios aquí
```

### Crear nuevo workflow para otra sección

Copiar el workflow y modificar:

```yaml
name: Deploy Landing

on:
  push:
    branches:
      - main
    paths:
      - 'landing/**'  # Carpeta a monitorear

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy landing --project-name=quafi
```

---

## Deployar la Plataforma React (Futuro)

Para la app React completa:

### 1. Build de producción

```bash
npm run build  # Genera dist/
```

### 2. Deploy

```bash
wrangler pages deploy dist --project-name=quafi-app
```

### 3. Subdominio

En Cloudflare Pages → Custom domains → agregar `app.quafi.io`

### 4. Workflow para React

```yaml
name: Deploy Platform

on:
  push:
    branches:
      - main
    paths:
      - 'src/**'
      - 'package.json'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=quafi-app
```

---

## Crear Nuevo Proyecto en Cloudflare Pages

### Opción A: Upload directo (rápido)

1. Cloudflare Dashboard → Workers & Pages
2. Create → Upload assets
3. Arrastrar archivos
4. Agregar custom domain

### Opción B: Wrangler CLI

```bash
# Crear proyecto
wrangler pages project create <nombre>

# Deployar
wrangler pages deploy <carpeta> --project-name=<nombre>
```

### Opción C: Conectar GitHub (auto-deploy nativo)

1. Cloudflare Dashboard → Workers & Pages → Create
2. Connect GitHub → Seleccionar repo
3. Configurar:
   - Branch: `main`
   - Root directory: `<carpeta>`
   - Build command: (vacío para estático, `npm run build` para React)
   - Output directory: (`.` para estático, `dist` para React)

---

## Comandos Útiles

```bash
# Ver proyectos
wrangler pages project list

# Ver deployments de un proyecto
wrangler pages deployment list --project-name=quafi

# Tail de logs
wrangler pages deployment tail --project-name=quafi

# Ver estado de auth
wrangler whoami
```

---

## Troubleshooting

### "Authentication error"

```bash
wrangler logout
wrangler login
```

### GitHub Actions falla con "Account not found"

Verificar que `CLOUDFLARE_ACCOUNT_ID` sea el correcto (cuenta de Agustín).

### Cambios no se ven en el sitio

1. Esperar ~1 min (propagación de caché)
2. Hard refresh (Cmd+Shift+R)
3. Verificar que el workflow corrió en GitHub → Actions

---

## Referencias

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Action](https://github.com/cloudflare/wrangler-action)

---

## Historial de Deploys

| Fecha | Proyecto | URL | Notas |
|-------|----------|-----|-------|
| 2026-03-02 | Coming Soon | quafi.io | HTML + CSS estático, animaciones radar |
