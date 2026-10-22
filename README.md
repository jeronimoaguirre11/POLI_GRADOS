# POLI-GRADOS · TrabajoGrado

Plataforma web para gestionar **prácticas profesionales y trabajos de grado**: convocatorias de empresas, postulaciones de estudiantes, modalidades de grado (investigación y diplomado) y seguimiento por parte de docentes y coordinación.

Proyecto académico, 2026. Backend en microservicios (NestJS + Prisma + PostgreSQL), un frontend por módulo (React + Vite) y todo orquestado con Docker Compose.

**Roles:** estudiante, empresa, docente y coordinador. Estudiantes y empresas se registran desde la plataforma; docentes y coordinadores los crea un administrador (ver [Crear docentes y coordinadores](#crear-docentes-y-coordinadores)).

---

## Inicio rápido

**Requisitos:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Compose v2) y Git. No hace falta tener Node instalado.

```bash
git clone <url-del-repositorio>
cd <carpeta-del-repositorio>

# 1. Variables de entorno
cp .env.example .env
#    Edita .env y cambia JWT_SECRET e INTERNAL_API_KEY por claves propias:
#    openssl rand -hex 32

# 2. Construir y levantar todo
docker compose up --build -d

# 3. Esperar a que los servicios estén sanos (1 a 3 minutos la primera vez)
docker compose ps
```

Cuando los servicios estén `healthy`, abre **http://localhost:5173**.

> Entra siempre por `localhost`, no por `127.0.0.1`: la sesión vive en una cookie y el navegador las trata como sitios distintos.

La primera vez la base de datos está **vacía**: regístrate como estudiante o empresa desde la pantalla de registro.

---

## Arquitectura

```
Navegador
   │
   ├── Frontends (nginx, puertos 5173-5180)
   │
   └── API Gateway :3000  ──►  Microservicios (red interna de Docker)
                                    │
                                    └── PostgreSQL (una base de datos por servicio)
```

El navegador solo habla con el **gateway**, que reenvía cada ruta al microservicio dueño (`/auth`, `/empresas`, `/postulaciones`...). Los microservicios no publican puertos hacia afuera y se comunican entre sí por nombre de servicio.

### Microservicios

| Servicio                | Puerto | Base de datos      | Responsabilidad                                       |
| ----------------------- | ------ | ------------------ | ----------------------------------------------------- |
| `auth-service`          | 3001   | `auth_db`          | Usuarios, registro, login, sesión y perfil            |
| `empresas-service`      | 3002   | `empresas_db`      | Empresas y convocatorias (incluye imágenes de oferta) |
| `estudiantes-service`   | 3003   | `estudiantes_db`   | Perfil del estudiante                                 |
| `postulaciones-service` | 3004   | `postulaciones_db` | Postulaciones y hojas de vida                         |
| `coordinadores-service` | 3005   | —                  | Panel y reportes PDF de coordinación                  |
| `diplomado-service`     | 3006   | `diplomados_db`    | Modalidad diplomado                                   |
| `investigacion-service` | 3007   | `investigacion_db` | Modalidad investigación                               |
| `docentes-service`      | 3008   | `docentes_db`      | Perfil docente y estudiantes asignados                |
| `gateway`               | 3000   | —                  | Punto de entrada único, CORS y proxy                  |

### Frontends

| Frontend                 | Puerto | Para quién                            |
| ------------------------ | ------ | ------------------------------------- |
| `frontend-auth`          | 5173   | Inicio de sesión y registro           |
| `frontend-empresas`      | 5174   | Empresas: convocatorias y postulantes |
| `frontend-estudiantes`   | 5175   | Portal del estudiante (modalidades)   |
| `frontend-postulaciones` | 5176   | Prácticas profesionales               |
| `frontend-coordinadores` | 5177   | Coordinación                          |
| `frontend-diplomado`     | 5178   | Modalidad diplomado                   |
| `frontend-investigacion` | 5179   | Modalidad investigación               |
| `frontend-docentes`      | 5180   | Docentes                              |

---

## Seguridad

- **Sesión en cookie `httpOnly`** (`SameSite=Lax`): el token no es accesible desde JavaScript y no se guarda en `localStorage`. No lleva fecha de expiración, así que se borra al cerrar el navegador. El JWT, además, caduca a las 2 horas.
- **El login no devuelve token ni datos del usuario**: responde solo un mensaje de éxito. Los frontends consultan `GET /auth/me`, que entrega lo mínimo (nombre, correo y rol), y lo mantienen solo en memoria.
- **Cierre de sesión real**: `POST /auth/logout` borra la cookie desde el servidor.
- **CORS solo en el gateway**, con orígenes exactos (necesario para cookies). Los microservicios no tienen CORS porque el navegador nunca los llama directamente.
- **Microservicios y base de datos sin puertos publicados**: solo el gateway y los frontends son accesibles desde fuera.
- **Rutas `/internal/*`** (llamadas entre servicios) protegidas con `x-internal-key` y nunca expuestas por el gateway.
- **Secretos fuera del repositorio**: viven en `.env`, que está en `.gitignore`.
- La cookie se marca `Secure` con `COOKIE_SECURE=true` en `auth-service`; en local va en `false` porque no hay HTTPS.

---

## Docker

- **Un contenedor por servicio**, más PostgreSQL, el gateway y los 8 frontends (17 contenedores en total).
- **PostgreSQL** es una sola instancia con una base de datos por microservicio. `db-init/init-microservicios.sql` las crea la primera vez que se genera el volumen.
- **Migraciones**: cada servicio con Prisma ejecuta `prisma migrate deploy` al arrancar.
- **Orden de arranque**: cada servicio expone `GET /health`; el gateway espera a que todos estén sanos y los frontends esperan al gateway.
- **Frontends**: se compilan con Vite y los sirve nginx. Las variables `VITE_*` se fijan en el momento de construir la imagen; si cambias una URL, reconstruye con `--build`.
- **Imágenes compartidas**: `services/Dockerfile.prisma` (los 7 servicios con Prisma) y `frontends/Dockerfile` (los 8 frontends).
- **Volúmenes**: `pgdata` (base de datos), `empresas_uploads` (imágenes de ofertas) y `postulaciones_uploads` (hojas de vida). Sobreviven a reinicios y a `docker compose down`.

### Variables de entorno (`.env` en la raíz)

| Variable                 | Descripción                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `DB_USER`, `DB_PASSWORD` | Credenciales de PostgreSQL                                                          |
| `JWT_SECRET`             | Clave con la que se firman y validan las sesiones (la misma en todos los servicios) |
| `INTERNAL_API_KEY`       | Clave para las llamadas entre servicios                                             |

### Comandos útiles

```bash
docker compose ps                        # estado de los servicios
docker compose logs -f auth-service      # logs de un servicio
docker compose restart empresas-service  # reiniciar uno
docker compose up --build -d             # reconstruir y levantar
docker compose down                      # detener (conserva los datos)
docker compose down -v                   # detener y BORRAR datos y archivos subidos
```

---

## Crear docentes y coordinadores

No se registran desde la pantalla pública. Mientras se implementa el panel de super administrador, se crean con una llamada interna ejecutada dentro de la red de Docker (Git Bash, Linux o macOS):

```bash
docker compose exec auth-service node -e "fetch('http://localhost:3001/internal/usuarios/coordinador',{method:'POST',headers:{'Content-Type':'application/json','x-internal-key':process.env.INTERNAL_API_KEY},body:JSON.stringify({nombre:'Coordinador Demo',email:'coord@elpoli.edu.co',password:'Coord1234'})}).then(r=>r.text()).then(console.log)"
```

Para un docente se usa la ruta `/internal/usuarios/docente` con los campos de `services/auth-service/src/modules/auth/dto/crear-docente.dto.ts`.

---

## Estructura del repositorio

```
├─ docker-compose.yml
├─ .env.example
├─ db-init/                  # crea las bases de datos la primera vez
├─ gateway/                  # API Gateway
├─ services/
│  ├─ Dockerfile.prisma      # imagen compartida de los servicios con Prisma
│  ├─ auth-service/
│  ├─ empresas-service/
│  ├─ estudiantes-service/
│  ├─ postulaciones-service/
│  ├─ coordinadores-service/
│  ├─ diplomado-service/
│  ├─ investigacion-service/
│  └─ docentes-service/
└─ frontends/
   ├─ Dockerfile             # imagen compartida de los frontends
   └─ frontend-*/
```

---

## Solución de problemas

| Síntoma                                                | Qué hacer                                                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Un servicio queda `unhealthy`                          | `docker compose logs <servicio> --tail 40`                                                    |
| `container name "/trabajo-grado-db" is already in use` | Queda un contenedor de una versión anterior: `docker rm -f trabajo-grado-db`                  |
| Puerto ocupado (3000, 5173...)                         | Cierra lo que corra en ese puerto (por ejemplo, un `npm run dev` anterior)                    |
| El login no "pega" o no se mantiene la sesión          | Entra por `http://localhost:5173`, no por `127.0.0.1`, y revisa que el gateway esté `healthy` |
| El build se corta o da `exit 137`                      | Falta memoria: `COMPOSE_PARALLEL_LIMIT=3 docker compose build` y luego `docker compose up -d` |
| Cambiaste una URL `VITE_*` y no surte efecto           | Reconstruye los frontends: `docker compose up --build -d`                                     |
| Quieres empezar con la base de datos limpia            | `docker compose down -v` y luego `docker compose up --build -d`                               |

---

## Pendiente

- Panel de super administrador para crear docentes y coordinadores desde la interfaz.

## Equipo

jeronimo aguirre castrillon
mateo carvajal maya
jhonatan
luquez
