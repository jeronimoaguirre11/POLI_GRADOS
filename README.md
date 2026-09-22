# TrabajoGrado

Plataforma para conectar empresas que publican convocatorias de práctica con
estudiantes que desean postularse.

El proyecto está construido como una **arquitectura de microservicios**: un
API Gateway y cuatro backends independientes (uno por dominio), cada uno con
su propia base de datos, más cuatro frontends independientes (uno por
backend). Todo corre localmente sin contenedores salvo la base de datos
compartida.

## Arquitectura

```
POLI_GRADOS/
  docker-compose.yml            → Postgres compartido (una base por servicio)
  db-init/                      → script de creación de las 4 bases al clonar de cero
  gateway/                      → API Gateway (NestJS), puerto 3000
  services/
    auth-service/                puerto 3001 · DB auth_db          → Usuario
    empresas-service/            puerto 3002 · DB empresas_db      → Empresa, Oferta
    estudiantes-service/         puerto 3003 · DB estudiantes_db   → Estudiante
    postulaciones-service/       puerto 3004 · DB postulaciones_db → Postulacion
  frontends/
    frontend-auth/                puerto 5173 — Home, Login, Registro
    frontend-empresas/             puerto 5174 — Dashboard de empresa (perfil, ofertas, postulantes)
    frontend-estudiantes/          puerto 5175 — Dashboard de estudiante (perfil, modalidades)
    frontend-postulaciones/        puerto 5176 — Convocatorias disponibles / mis postulaciones
```

El **gateway** es el único punto de entrada para los 4 frontends: reenvía
`/auth`, `/empresas`, `/ofertas`, `/estudiantes` y `/postulaciones` al backend
correspondiente. Ningún frontend le habla directo a un microservicio.

Cada backend valida el JWT con el mismo `JWT_SECRET` (no hay llamada a
auth-service para validar tokens), y las llamadas entre servicios (por
ejemplo, empresas-service pidiéndole a postulaciones-service el conteo de
postulantes de una oferta) usan rutas internas protegidas con un header
`X-Internal-Key`, separadas de las rutas públicas que expone el gateway.

Como cada backend tiene su propia base de datos, las consultas que antes
cruzaban tablas con `include` de Prisma ahora se arman con llamadas HTTP entre
servicios y se combinan en memoria (por ejemplo, ver los postulantes de una
oferta es un fan-out: postulaciones-service → estudiantes-service →
auth-service).

## Cómo levantar el proyecto

Se necesitan **9 procesos** corriendo en paralelo, cada uno en su propia
terminal.

### 1. Base de datos

```powershell
docker compose up -d
```

Esto levanta Postgres en el puerto `5433` con el contenedor
`trabajo-grado-db`. Si es la primera vez que se crea el volumen, `db-init/`
crea las 4 bases automáticamente. Si el volumen ya existía de una versión
anterior del proyecto (monolítica), las bases nuevas se crean una sola vez a
mano — ver `db-init/README.md`.

### 2. Backends (gateway + 4 microservicios)

Para cada carpeta en `gateway/` y `services/*`:

```powershell
cd gateway   # o services/auth-service, services/empresas-service, etc.
npm install
# Crear el .env de ese servicio (ver la sección de variables de entorno)
npx prisma generate       # solo en los 4 servicios, no en el gateway
npx prisma migrate dev --name init   # solo la primera vez, solo en los 4 servicios
npm run start:dev
```

Variables de entorno compartidas entre los 4 backends (deben ser **idénticas**
en todos):

```
JWT_SECRET="649296ec9af9a801fa3d1dadaf0cca11afd99b267655c84158217ca421526cec"
INTERNAL_API_KEY="b4f2a9d1e6c8b3a5f7d9e1c3a5b7d9f1e3c5a7b9d1f3e5c7a9b1d3f5e7c9a1b3"
```

Además cada servicio tiene su propio `PORT` y `DATABASE_URL` apuntando a su
base (`auth_db`, `empresas_db`, `estudiantes_db`, `postulaciones_db`), y el
gateway tiene las 4 `*_SERVICE_URL` apuntando a `http://localhost:<puerto>`
de cada backend.

### 3. Frontends

Para cada carpeta en `frontends/*`:

```powershell
cd frontends/frontend-auth   # o frontend-empresas, frontend-estudiantes, frontend-postulaciones
Copy-Item .env.example .env
npm install
npm run dev
```

Cada frontend tiene su puerto fijo (`vite.config.js` usa `strictPort: true`),
así que si alguno no arranca revisa que no haya otro proceso usando ese
puerto.

### Traspaso de sesión entre frontends

Como cada frontend vive en un origen distinto, `localStorage` no se comparte
entre ellos. `frontend-auth` redirige tras el login pasando el token por query
string (`?token=...&usuario=...`); la app destino lo guarda en su propio
`localStorage` y limpia la URL. El mismo mecanismo se usa al saltar de
`frontend-estudiantes` a `frontend-postulaciones` ("Prácticas Profesionales").
Cerrar sesión en cualquier frontend limpia su propio `localStorage` y
redirige a `frontend-auth`.

## Gestión de postulantes

El panel empresarial permite consultar los candidatos de cada convocatoria,
buscar y filtrar postulantes, revisar sus datos académicos, contactarlos por
correo y descargar su hoja de vida. La empresa puede clasificar cada
postulación como pendiente, en revisión, preseleccionada, rechazada o
seleccionada, y guardar observaciones internas.

Las hojas de vida no se sirven como archivos públicos: solo la empresa dueña
de la convocatoria puede descargarlas desde una ruta autenticada. Los
estudiantes pueden ver el estado actualizado de sus postulaciones, pero no las
observaciones internas de la empresa.

Endpoints empresariales del módulo (vía gateway):

- `GET /empresas/ofertas/:id/postulaciones`
- `PATCH /empresas/postulaciones/:id`
- `GET /empresas/postulaciones/:id/hoja-vida`

Internamente, estos tres endpoints viven en empresas-service pero delegan a
postulaciones-service (que es quien de verdad tiene la tabla `Postulacion`) —
la hoja de vida viaja entre servicios como base64 dentro del JSON de
respuesta.

## Historial de desarrollo

El proyecto arrancó como un monolito NestJS + React siguiendo un roadmap de
sprints para el semestre (autenticación, catálogo de servicios, módulos de
investigación/diplomado/prácticas, empresas, coordinador). Los módulos de
**Auth**, **Estudiantes**, **Empresas** y **Postulaciones** llegaron a
implementarse por completo en el monolito y luego se migraron a la
arquitectura de microservicios descrita arriba, para cumplir con el
requisito del curso de dividir el sistema en varios backends y frontends
independientes. Los módulos de Investigación, Diplomado y Coordinador (con
sus modelos `Investigacion`, `Diplomado`, `Practica`, `Coordinador`,
`Docente`, `ProcesoGrado`) quedaron fuera de esta migración por no tener
todavía un módulo backend implementado; si se retoman más adelante, se
construirían como un microservicio adicional siguiendo el mismo patrón.
