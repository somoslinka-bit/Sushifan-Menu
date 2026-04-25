# SushiFan — Menú Digital + Panel Admin

## Proyecto
Menú digital interactivo con panel de administración para SushiFan wine bar (Tandil, Argentina).
Desarrollado por LINKA agencia de marketing digital.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (DB + Auth + Storage)
- Deploy: Vercel
- Repositorio: git@github.com:somoslinka-bit/Sushifan-Menu.git

## Branding
- Fondo: #1A1A1A
- Texto: #FFFFFF
- Acento: #C9A84C (dorado sutil, estilo premium)
- Tipografía headers: Bebas Neue (Google Fonts)
- Tipografía body: Inter
- Fotos de ítems: siempre circulares con sombra suave

## Convenciones de código
- Componentes en /components, páginas en /app
- Variables de entorno en .env.local (nunca hardcodear keys)
- Supabase client en /lib/supabaseClient.js
- Preferir Server Components, usar "use client" solo cuando sea estrictamente necesario
- Commits descriptivos al cerrar cada fase

## Convenciones de datos
- Precios en formato argentino: $9.500 (punto como separador de miles, sin decimales)
- Precios se guardan como integer en DB (en centavos) y se formatean en el frontend

## Estructura de rutas
- / → redirige a /menu
- /menu → menú público (sin login, optimizado para mobile/QR)
- /admin → panel de gestión (requiere auth)
- /admin/login → login del dueño
- /admin/qr → generador de QR

## Base de datos (Supabase)
### Tabla: categorias
- id, nombre, orden (integer), activa (boolean)

### Tabla: items
- id, categoria_id, nombre, descripcion, precio (integer, centavos),
  imagen_url, disponible (boolean), orden (integer)

## Variables de entorno requeridas
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

---

## Prompt de inicio

Antes de escribir una sola línea de código, revisá TODAS las skills
disponibles en /mnt/skills/ (públicas, privadas y de ejemplos) y leé
los SKILL.md relevantes para este proyecto. Como mínimo revisá:
- frontend-design → para que el diseño sea de nivel producción
- Cualquier skill relacionada con Next.js, Supabase, o patrones de UI

Aplicá todo lo que encuentres para garantizar calidad óptima en diseño,
estructura y código antes de proceder.

---

Creá una aplicación web completa llamada "sushifan-menu" siguiendo
estrictamente este CLAUDE.md.

## Fase 1 — Setup y estructura
1. Inicializá el proyecto con Next.js 14 (App Router) y Tailwind CSS
2. Configurá el cliente de Supabase con variables de entorno
3. Creá el esquema SQL completo para las tablas `categorias` e `items`
4. Creá vercel.json en la raíz con configuración básica para Next.js
5. Creá .env.example con los nombres de todas las variables (sin valores reales)
6. Asegurate que .gitignore incluya .env.local
7. NO inicialices git ni hagas commits — el repo remoto ya existe
8. Creá README.md con instrucciones de setup, variables de entorno y
   pasos para conectar con Vercel

## Fase 2 — Menú público (/menu)
1. Diseño dark premium, mobile-first, optimizado para ser escaneado via QR
2. Header con logo "SushiFan" en Bebas Neue y subtítulo "wine bar" en Inter thin
3. Navegación sticky por categorías (tabs horizontales con scroll suave)
4. Cards de ítems con: foto circular con sombra, nombre, descripción, precio
   formateado en pesos argentinos ($9.500)
5. Badge "Agotado" visible en ítems con disponible=false
6. Mostrar solo categorías activas e ítems ordenados por campo `orden`
7. Animaciones de entrada suaves (fade/slide) al cargar los ítems
8. El menú público NO requiere autenticación bajo ningún concepto

## Fase 3 — Panel admin (/admin)
1. Login con email/password via Supabase Auth en /admin/login
2. Middleware que protege todas las rutas /admin excepto /admin/login
3. Redirigir automáticamente a /admin si ya hay sesión activa
4. Dashboard principal con ítems agrupados por categoría
5. Por cada ítem, acciones: editar nombre/descripción/precio, subir nueva
   imagen (upload directo a Supabase Storage bucket "menu-imagenes"),
   toggle disponible/agotado, eliminar con confirmación
6. Modal para agregar nuevo ítem con todos los campos y preview de imagen
7. Gestión de categorías: agregar, renombrar, cambiar orden, activar/desactivar
8. UI clara e intuitiva — el usuario final no es técnico
9. Feedback visual en todas las acciones (loading states, mensajes de éxito/error)

## Fase 4 — QR
1. Página /admin/qr que genera un QR apuntando a /menu
2. El QR debe verse sobre fondo oscuro con el logo de SushiFan arriba
3. Botón para descargar el QR como PNG listo para imprimir
4. Usar librería qrcode.react

## Restricciones importantes
- Diseño de nivel producción desde el primer render — nada de placeholders genéricos
- Mobile-first en todo el menú público (es el caso de uso principal)
- Precios siempre en formato $9.500 (nunca $9500 ni $9,500)
- Imágenes de ítems siempre circulares con sombra suave
- El panel admin debe ser funcional y claro, no necesita ser tan estético como el menú
- Commits descriptivos al cerrar cada fase
