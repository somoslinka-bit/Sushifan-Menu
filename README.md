# SushiFan Menu

Menú digital con panel de administración para SushiFan wine bar (Tandil, Argentina).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- Vercel (deploy)

## Setup

### 1. Clonar e instalar

```bash
git clone git@github.com:somoslinka-bit/Sushifan-Menu.git
cd Sushifan-Menu
npm install
```

### 2. Variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env.local
```

| Variable | Dónde encontrarla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon / public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (secreto) |

### 3. Base de datos

En el editor SQL de Supabase, ejecutá el contenido de `supabase/schema.sql`.

### 4. Storage

En Supabase → Storage, el bucket `menu-images` se crea automáticamente al ejecutar el schema.

### 5. Usuario admin

En Supabase → Authentication → Users, creá un usuario con email y contraseña para acceder al panel.

### 6. Desarrollo local

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/menu`.

El panel admin está en [http://localhost:3000/admin](http://localhost:3000/admin).

## Deploy en Vercel

1. Importá el repositorio en [vercel.com/new](https://vercel.com/new)
2. Agregá las variables de entorno en Settings → Environment Variables
3. Deploy automático en cada push a `main`

## Rutas

| Ruta | Descripción |
|---|---|
| `/menu` | Menú público (sin login, optimizado para QR) |
| `/admin` | Panel de gestión (requiere auth) |
| `/admin/login` | Login del administrador |
| `/admin/qr` | Generador de código QR |
