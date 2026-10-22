# POLI-GRADOS · TrabajoGrado

Plataforma web para gestionar **prácticas profesionales y trabajos de grado**: convocatorias de empresas, postulaciones de estudiantes, modalidades de grado (investigación y diplomado) y seguimiento por parte de docentes y coordinación.

Proyecto académico, 2026. Backend en microservicios (NestJS + Prisma + PostgreSQL), un frontend por módulo (React + Vite) y todo orquestado con Docker Compose.

**Roles:** super administrador, coordinador, docente, estudiante y empresa. Estudiantes y empresas pueden registrarse desde la plataforma; el **super administrador** crea cualquier tipo de cuenta y puede desactivarlas (ver [Super administrador](#super-administrador)).

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

La primera vez la base de datos solo tiene el **super administrador inicial**: entra con `admin@elpoli.edu.co` / `Admin12345` (o los valores de `SUPERADMIN_*` en tu `.env`) y crea desde su panel los coordinadores, docentes y demás cuentas. Estudiantes y empresas también pueden registrarse solos.

---

## Arquitectura

```
Navegador
   │
   ├── Frontends (nginx, puertos 5173-5181)
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
| `administracion-service`| 3009   | —                  | Super administrador: crear y activar/desactivar cuentas |
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
| `frontend-administracion`| 5181   | Super administrador                   |

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

- **Un contenedor por servicio**, más PostgreSQL, el gateway y los 9 frontends (20 contenedores en total).
- **PostgreSQL** es una sola instancia con una base de datos por microservicio. `db-init/init-microservicios.sql` las crea la primera vez que se genera el volumen.
- **Migraciones**: cada servicio con Prisma ejecuta `prisma migrate deploy` al arrancar.
- **Orden de arranque**: cada servicio expone `GET /health`; el gateway espera a que todos estén sanos y los frontends esperan al gateway.
- **Frontends**: se compilan con Vite y los sirve nginx. Las variables `VITE_*` se fijan en el momento de construir la imagen; si cambias una URL, reconstruye con `--build`.
- **Imágenes compartidas**: `services/Dockerfile.prisma` (los 7 servicios con Prisma) y `frontends/Dockerfile` (los 9 frontends).
- **Volúmenes**: `pgdata` (base de datos), `empresas_uploads` (imágenes de ofertas) y `postulaciones_uploads` (hojas de vida). Sobreviven a reinicios y a `docker compose down`.

### Variables de entorno (`.env` en la raíz)

| Variable                 | Descripción                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `DB_USER`, `DB_PASSWORD` | Credenciales de PostgreSQL                                                          |
| `JWT_SECRET`             | Clave con la que se firman y validan las sesiones (la misma en todos los servicios) |
| `INTERNAL_API_KEY`       | Clave para las llamadas entre servicios                                             |
| `SUPERADMIN_NOMBRE`, `SUPERADMIN_EMAIL`, `SUPERADMIN_PASSWORD` | Datos del super administrador (único) (opcionales; por defecto `admin@elpoli.edu.co` / `Admin12345`) |

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

## Super administrador

Es el rol que administra las cuentas de la plataforma. Su panel está en **http://localhost:5181** (el login lo redirige automáticamente).

- **Hay un solo super administrador**: `auth-service` lo crea al arrancar con `SUPERADMIN_NOMBRE`, `SUPERADMIN_EMAIL` y `SUPERADMIN_PASSWORD`, solo si todavía no existe. No hay ninguna ruta ni pantalla para crear otro, y reiniciar no lo duplica ni cambia su contraseña. Cámbiala desde el panel (botón *Cambiar contraseña*) después del primer ingreso.
- **Crear cuentas** de coordinador, docente, estudiante y empresa. Para estudiantes, empresas y docentes también se crea su perfil en el microservicio correspondiente.
- **Activar / desactivar cuentas**: una cuenta desactivada no puede iniciar sesión y queda fuera en cuanto recarga cualquier panel (`/auth/me` responde 401 y borra la cookie). No se borra ningún dato.
- **Protecciones**: solo el rol `SUPERADMIN` puede usar `/administracion/*`, y en cada petición se verifica que su cuenta siga activa; la cuenta del super administrador no se puede desactivar.

`administracion-service` no tiene base de datos: valida y orquesta a `auth-service` por sus rutas `/internal/usuarios/*`.

| Método  | Ruta (por el gateway)                                 | Qué hace                                  |
| ------- | ----------------------------------------------------- | ----------------------------------------- |
| `GET`   | `/administracion/usuarios`                            | Lista de cuentas y resumen por rol/estado |
| `POST`  | `/administracion/usuarios/coordinadores`              | Crea un coordinador                       |
| `POST`  | `/administracion/usuarios/docentes`                   | Crea un docente con su perfil             |
| `POST`  | `/administracion/usuarios/estudiantes`                | Crea un estudiante con su perfil          |
| `POST`  | `/administracion/usuarios/empresas`                   | Crea una empresa con su perfil            |
| `PATCH` | `/administracion/usuarios/:id/estado` `{ "activo" }` | Activa o desactiva una cuenta             |

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
│  ├─ docentes-service/
│  └─ administracion-service/
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

## Equipo

jeronimo aguirre castrillon
mateo carvajal maya
jhonatan
luquez
