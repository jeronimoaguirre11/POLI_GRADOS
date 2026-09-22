# db-init/

Scripts que Postgres corre automáticamente la primera vez que se crea el
volumen de datos del contenedor `trabajo-grado-db` (carpeta montada en
`/docker-entrypoint-initdb.d`).

Si ya tenías el proyecto corriendo antes de esto (tu volumen `postgres_data`
ya existe con datos), este script **no se va a ejecutar solo** — Postgres
solo corre estos scripts al crear el volumen desde cero. En ese caso, crea
las bases de datos nuevas una sola vez a mano:

```
docker exec trabajo-grado-db psql -U admin -d trabajo_grado -c "CREATE DATABASE auth_db;"
docker exec trabajo-grado-db psql -U admin -d trabajo_grado -c "CREATE DATABASE empresas_db;"
docker exec trabajo-grado-db psql -U admin -d trabajo_grado -c "CREATE DATABASE estudiantes_db;"
docker exec trabajo-grado-db psql -U admin -d trabajo_grado -c "CREATE DATABASE postulaciones_db;"
```

Un compañero que clone el repo desde cero (sin ese volumen todavía) las va a
tener creadas automáticamente al hacer `docker compose up -d` por primera
vez, gracias a `init-microservicios.sql`.
