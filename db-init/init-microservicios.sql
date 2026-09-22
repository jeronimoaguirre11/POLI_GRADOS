-- Se ejecuta automaticamente SOLO la primera vez que Postgres crea su
-- volumen de datos (por eso no corrio en la base de datos que ya tenias).
-- Una base de datos por microservicio (arquitectura de microservicios):
--   auth_db          -> auth-service (Usuario)
--   empresas_db       -> empresas-service (Empresa, Oferta)
--   estudiantes_db    -> estudiantes-service (Estudiante)
--   postulaciones_db  -> postulaciones-service (Postulacion)
CREATE DATABASE auth_db;
CREATE DATABASE empresas_db;
CREATE DATABASE estudiantes_db;
CREATE DATABASE postulaciones_db;
