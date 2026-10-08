# TrabajoGrado

Plataforma para conectar empresas que publican convocatorias de práctica con
estudiantes que desean postularse.

El proyecto está construido como una **arquitectura de microservicios**: un
API Gateway, cuatro servicios dueños de datos y un servicio coordinador que
integra información de los demás dominios, junto con cinco frontends
independientes. Todo corre localmente sin contenedores salvo la instancia
compartida de PostgreSQL.

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
    coordinadores-service/       puerto 3005 · sin DB propia       → seguimiento institucional
  frontends/
    frontend-auth/                puerto 5173 — Home, Login, Registro
    frontend-empresas/             puerto 5174 — Dashboard de empresa (perfil, ofertas, postulantes)
    frontend-estudiantes/          puerto 5175 — Dashboard de estudiante (perfil, modalidades)
    frontend-postulaciones/        puerto 5176 — Convocatorias disponibles / mis postulaciones
    frontend-coordinadores/        puerto 5177 — Panel general de seguimiento
```

El **gateway** es el único punto de entrada para los 5 frontends: reenvía
`/auth`, `/empresas`, `/ofertas`, `/estudiantes`, `/postulaciones` y
`/coordinadores` al backend correspondiente. Ningún frontend le habla directo
a un microservicio.

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

Se necesitan **11 procesos** corriendo en paralelo, cada uno en su propia
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

### 2. Backends (gateway + 5 microservicios)

Para cada carpeta en `gateway/` y `services/*`:

```powershell
cd gateway   # o cualquiera de las carpetas services/*
npm install
# Crear el .env de ese servicio (ver la sección de variables de entorno)
npx prisma generate       # solo en los 4 servicios que tienen prisma/
npx prisma migrate deploy # solo en esos 4 servicios
npm run start:dev
```

Variables de entorno compartidas entre los 5 microservicios (deben ser
**idénticas** en todos):

```
JWT_SECRET="<CLAVE_JWT_LARGA_Y_ALEATORIA>"
INTERNAL_API_KEY="<CLAVE_INTERNA_LARGA_Y_ALEATORIA>"
```

No reutilices literalmente los marcadores anteriores. Genera dos valores
distintos para tu entorno local y no los subas al repositorio.

Además cada servicio de datos tiene su propio `PORT` y `DATABASE_URL`
apuntando a su base (`auth_db`, `empresas_db`, `estudiantes_db`,
`postulaciones_db`). `coordinadores-service` no usa Prisma: consulta a los
otros servicios mediante sus rutas internas. El gateway tiene las cinco
`*_SERVICE_URL` apuntando a `http://localhost:<puerto>`.

### 3. Frontends

Para cada carpeta en `frontends/*`:

```powershell
cd frontends/frontend-auth   # o cualquiera de las carpetas frontends/*
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
`localStorage` y limpia la URL. Esto también redirige al panel de coordinador
cuando el JWT pertenece al rol `COORDINADOR`. El mismo mecanismo se usa al
saltar de
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

Las respuestas públicas del estudiante seleccionan únicamente los datos que
necesita para hacer seguimiento. `observacionesEmpresa` permanece disponible
en la comunicación interna con el módulo empresarial, pero nunca se incluye
en `GET /postulaciones/mias` ni en el panel del coordinador.

## Módulo de coordinador

El rol `COORDINADOR` dispone de un panel de seguimiento institucional en
`http://localhost:5177`. El frontend consulta, siempre a través del gateway:

- `GET /coordinadores/panel`

El servicio valida el JWT y rechaza cualquier rol diferente de
`COORDINADOR`. Luego obtiene estudiantes, usuarios, postulaciones y ofertas
mediante rutas internas protegidas y construye una vista unificada sin acceder
directamente a las bases de datos ajenas.

El panel permite:

- consultar el total de estudiantes, con y sin postulaciones;
- revisar cantidades por estado de postulación;
- buscar por nombre, correo o código;
- filtrar por programa y estado;
- desplegar las postulaciones de cada estudiante con oferta, empresa, fecha y
  estado.

El coordinador es de solo lectura: no cambia las decisiones de las empresas y
no recibe observaciones privadas ni archivos de hojas de vida.

### Crear una cuenta de coordinador

El registro público solo permite cuentas de estudiante y empresa. Una cuenta
de coordinador se crea directamente en `auth-service` mediante una ruta
interna protegida, usando el mismo `INTERNAL_API_KEY` configurado en los
servicios:

```bash
curl -X POST http://localhost:3001/internal/usuarios/coordinador \
  -H "Content-Type: application/json" \
  -H "X-Internal-Key: <INTERNAL_API_KEY>" \
  -d '{"nombre":"Coordinación académica","email":"coordinacion@institucion.edu","password":"<CONTRASENA_SEGURA>"}'
```

Después puede iniciar sesión normalmente en `http://localhost:5173`; el
frontend de autenticación lo enviará al panel del puerto `5177`.

## Historial de desarrollo

El proyecto arrancó como un monolito NestJS + React siguiendo un roadmap de
sprints para el semestre (autenticación, catálogo de servicios, módulos de
investigación/diplomado/prácticas, empresas, coordinador). Los módulos de
**Auth**, **Estudiantes**, **Empresas** y **Postulaciones** se implementaron
primero en el monolito y luego se migraron a la arquitectura de
microservicios descrita arriba. El panel de seguimiento de **Coordinación** se
agregó después como un servicio de integración sobre esos dominios, para
cumplir con el requisito del curso de dividir el sistema en varios backends y
frontends independientes. Investigación, Diplomado y la asignación de
docentes aún no tienen un flujo backend completo. Cuando se implementen sus modelos
`Investigacion`, `Diplomado`, `Practica`, `Docente` y `ProcesoGrado`, el panel
de coordinación podrá incorporar ese seguimiento sin mezclar las bases de
datos de los dominios.
