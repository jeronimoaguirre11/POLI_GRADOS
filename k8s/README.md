# POLI_GRADOS en Kubernetes

Esta carpeta despliega el mismo proyecto de `docker-compose.yml` en Kubernetes. Docker se sigue usando: las imágenes se construyen igual (`docker compose build`) y Kubernetes es quien las ejecuta, las reinicia si fallan y las conecta entre sí.

| Para qué | Qué se usa |
| --- | --- |
| Desarrollo diario | `docker compose up --build -d` (sin cambios) |
| Despliegue con Kubernetes | `.\k8s-iniciar.ps1` o `kubectl apply -k k8s/` |

> Usa **uno a la vez**: los dos publican los mismos puertos (3000 y 5173-5181). `k8s-iniciar.ps1` detiene docker compose antes de empezar y `k8s-detener.ps1` libera los puertos al terminar. Cada uno tiene su **propia base de datos**: los datos de compose no aparecen en Kubernetes ni al revés.

---

## Requisitos

1. **Docker Desktop** con Kubernetes activado: *Settings → Kubernetes → Enable Kubernetes* (tipo de clúster **kubeadm**) → *Apply & restart*. Espera a que el ícono de Kubernetes quede en verde.
2. `kubectl` apuntando a Docker Desktop. Docker Desktop lo instala; compruébalo con:

   ```
   kubectl config current-context    # debe decir docker-desktop
   ```

## Inicio rápido (Windows)

```powershell
.\k8s-iniciar.ps1
```

El script:

1. crea `k8s/secretos.env` desde el ejemplo si no existe;
2. detiene docker compose (sus datos se conservan);
3. construye las imágenes con `docker compose build`;
4. aplica los manifiestos con `kubectl apply -k k8s`;
5. espera a que todo esté listo.

Luego entra por **http://localhost:5173**, igual que con compose. El super administrador usa el correo y la contraseña de `k8s/secretos.env`.

Para detenerlo sin perder datos: `.\k8s-detener.ps1`.

## Paso a paso (cualquier sistema)

```bash
cp k8s/secretos.env.example k8s/secretos.env   # y cambia los valores
docker compose down                             # libera los puertos
docker compose build                            # imágenes poli-grados-*
kubectl apply -k k8s/
kubectl -n poli-grados get pods -w              # espera a que todo esté Running 1/1
```

---

## Qué hay en la carpeta

```
k8s/
├─ kustomization.yaml        # lista de recursos, Secret y ConfigMap
├─ namespace.yaml            # namespace "poli-grados"
├─ secretos.env.example      # plantilla de k8s/secretos.env (no se sube)
├─ postgres/
│  ├─ postgres.yaml          # StatefulSet + volumen + Service "postgres"
│  └─ init-microservicios.sql
├─ servicios/                # un archivo por microservicio (Deployment + Service)
├─ gateway.yaml              # Deployment + Service LoadBalancer :3000
└─ frontends/                # un archivo por frontend (Deployment + Service LoadBalancer)
```

## Cómo se traduce docker compose a Kubernetes

| docker compose | Kubernetes |
| --- | --- |
| Un servicio (`auth-service`, ...) | **Deployment** (el pod) + **Service** (el nombre DNS `auth-service:3001`) |
| `postgres` con volumen `pgdata` | **StatefulSet** con un volumen persistente (PVC `datos-postgres-0`) |
| `./db-init` montado | **ConfigMap** `postgres-init` con el SQL que crea las bases |
| `x-secrets` (JWT, clave interna) | **Secret** `poli-grados-secretos` generado desde `secretos.env` |
| `healthcheck` a `/health` | `readinessProbe` (no recibe tráfico hasta estar sano) y `livenessProbe` (se reinicia si deja de responder) |
| `depends_on: service_healthy` | `initContainer` que espera a que Postgres acepte conexiones |
| Volúmenes `empresas_uploads` y `postulaciones_uploads` | **PersistentVolumeClaim** de 1 Gi cada uno |
| `ports: "5173:80"` | **Service tipo LoadBalancer**: Docker Desktop lo publica en `localhost:5173` |

Los nombres de los servicios y los puertos son los mismos de compose, así que el código, las URLs internas y las variables `VITE_*` de los frontends no cambian.

## Comandos útiles

```bash
kubectl -n poli-grados get pods                         # estado de todo
kubectl -n poli-grados logs deploy/auth-service -f      # logs de un servicio
kubectl -n poli-grados rollout restart deploy/auth-service
kubectl -n poli-grados scale deploy/estudiantes-service --replicas=2   # dos copias
kubectl -n poli-grados describe pod <nombre-del-pod>    # por qué no arranca
```

Después de cambiar código: `docker compose build <servicio>` y `kubectl -n poli-grados rollout restart deploy/<servicio>`.

## Borrar todo

```bash
kubectl delete namespace poli-grados    # BORRA también la base de datos y los archivos subidos
```

No uses `kubectl delete -k k8s/` si quieres conservar los datos: también borra el namespace.

## Solución de problemas

| Síntoma | Qué hacer |
| --- | --- |
| `ErrImageNeverPull` | Falta construir la imagen: `docker compose build`. Si persiste, revisa en Docker Desktop que el clúster sea tipo **kubeadm**, que usa las mismas imágenes que `docker compose`. |
| `secretos.env: no such file` al aplicar | Copia `k8s/secretos.env.example` como `k8s/secretos.env`. |
| Un pod en `CrashLoopBackOff` | `kubectl -n poli-grados logs <pod> --previous` |
| Un servicio queda en `Init:0/1` | Espera a Postgres: `kubectl -n poli-grados logs statefulset/postgres` |
| `localhost:5173` no responde | Docker compose sigue corriendo (`docker compose down`) o el Service aún no tiene `EXTERNAL-IP` (`kubectl -n poli-grados get svc`). |
| Cambiaste `DB_USER`/`DB_PASSWORD` y ya no conecta | Postgres solo los usa al crear el volumen la primera vez. Para empezar de cero: `kubectl delete namespace poli-grados` y vuelve a aplicar. |
