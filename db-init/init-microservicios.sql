-- Se ejecuta automaticamente SOLO la primera vez que Postgres crea su
-- volumen de datos (por eso no corrio en la base de datos que ya tenias).
-- Una base de datos por microservicio (arquitectura de microservicios):
--   auth_db          -> auth-service (Usuario)
--   empresas_db       -> empresas-service (Empresa, Oferta)
--   estudiantes_db    -> estudiantes-service (Estudiante)
--   postulaciones_db  -> postulaciones-service (Postulacion)
--   diplomados_db     -> diplomado-service (Diplomado, Inscripcion)
--   investigacion_db  -> investigacion-service (Investigacion)
--   docentes_db       -> docentes-service (Docente, AsignacionDocente)
CREATE DATABASE auth_db;
CREATE DATABASE empresas_db;
CREATE DATABASE estudiantes_db;
CREATE DATABASE postulaciones_db;
CREATE DATABASE diplomados_db;
CREATE DATABASE investigacion_db;
CREATE DATABASE docentes_db;
