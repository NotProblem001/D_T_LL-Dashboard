# D_T_LL-Dashboard

Portal B2B para las empresas cliente de Donde Te Llevo: cada empresa ve únicamente sus propios
viajes, reportes de facturación y nómina de pasajeros (aislamiento por `empresaId` resuelto desde
el JWT).

## Stack

- React 19 + Vite 7 + Tailwind 3 (mismo patrón que `D_T_LL-Admin`)
- Autenticación JWT contra `POST /auth/token` (rol `EMPRESA`)

## Desarrollo local

```bash
npm install
cp .env.example .env   # ajustar VITE_API_URL si el backend no corre en localhost:8080
npm run dev
```

## Despliegue

Desplegado en Vercel como proyecto independiente (`vercel.json` incluido con rewrites para SPA).
Configurar `VITE_API_URL` como variable de entorno de producción apuntando al backend en Render.
