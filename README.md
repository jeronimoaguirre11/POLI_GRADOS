# TrabajoGrado

Plataforma para conectar empresas que publican convocatorias de práctica con
estudiantes que desean postularse.

## Gestión de postulantes

El panel empresarial permite consultar los candidatos de cada convocatoria,
buscar y filtrar postulantes, revisar sus datos académicos, contactarlos por
correo y descargar su hoja de vida. La empresa puede clasificar cada
postulación como pendiente, en revisión, preseleccionada, rechazada o
seleccionada, y guardar observaciones internas.

Las hojas de vida no se sirven como archivos públicos: solo la empresa dueña de
la convocatoria puede descargarlas desde una ruta autenticada. Los estudiantes
pueden ver el estado actualizado de sus postulaciones, pero no las observaciones
internas de la empresa.

Endpoints empresariales del módulo:

- `GET /empresas/ofertas/:id/postulaciones`
- `PATCH /empresas/postulaciones/:id`
- `GET /empresas/postulaciones/:id/hoja-vida`

## Backlog / Roadmap del semestre (Scrum)

Asumiendo un semestre de ~16 semanas y sprints de 2 semanas → **8 sprints**. Ajusta según el calendario real de tu universidad.

### Sprint 0 (1-2 semanas) — Fundación

- Definir alcance final con el profesor/coordinador (validar este documento)
- Diseño de base de datos (diagrama entidad-relación completo)
- Wireframes de las 3 interfaces (estudiante, empresa, coordinador)
- Setup del repositorio, Docker Compose, estructura de carpetas NestJS + React
- Definir convenciones de código y flujo de Git

### Sprint 1 — Autenticación y esqueleto del sistema

- HU: Como estudiante/empresa/coordinador quiero iniciar sesión con mi rol correspondiente
- HU: Como administrador quiero que el sistema distinga permisos por rol (RBAC)
- HU: Como usuario quiero ver una interfaz principal según mi rol al iniciar sesión
- Entregable: login funcional + navegación base por rol

### Sprint 2 — Módulo Estudiante: catálogo de servicios

- HU: Como estudiante quiero ver los 3 servicios disponibles (investigación, diplomado, prácticas)
- HU: Como estudiante quiero entrar a cada servicio y ver las instrucciones del proceso
- HU: Como coordinador quiero poder editar el contenido/instrucciones de cada servicio
- Entregable: panel de estudiante navegable con contenido informativo

### Sprint 3 — Módulo Trabajo de Investigación

- HU: Como estudiante quiero registrar que pertenezco a un grupo de investigación
- HU: Como estudiante quiero confirmar mi matrícula en la materia trabajo de grado
- HU: Como estudiante quiero registrar la idea de investigación a desarrollar
- HU: Como coordinador quiero ver el estado de cada estudiante en este proceso
- Entregable: flujo completo de inscripción a modalidad "investigación"

### Sprint 4 — Módulo Diplomado + Módulo Prácticas (reporte)

- HU: Como estudiante quiero reportar el diplomado/curso que voy a tomar
- HU: Como coordinador quiero recibir y aprobar/rechazar ese reporte
- HU: Como estudiante quiero ver ofertas de prácticas publicadas por la universidad
- HU: Como estudiante quiero reportar una práctica conseguida de forma independiente
- Entregable: ambas modalidades operativas de punta a punta

### Sprint 5 — Módulo Empresas

- HU: Como empresa quiero registrarme y crear mi perfil
- HU: Como empresa quiero publicar una o varias ofertas laborales con el perfil de estudiante que busco
- HU: Como estudiante quiero ver y postularme a las ofertas publicadas
- HU: Como empresa quiero ver solo los postulantes de mi vacante y decidir a quién contactar/contratar
- Entregable: ciclo completo oferta → postulación → decisión de empresa

### Sprint 6 — Módulo Coordinador (panel de control)

- HU: Como coordinador quiero ver el estado de todos los estudiantes en proceso de grado, sin importar la modalidad
- HU: Como coordinador quiero asignar un docente o egresado como asesor a un estudiante
- HU: Como docente/asesor asignado quiero ver qué estudiantes tengo a cargo
- Entregable: panel de seguimiento centralizado — este es el módulo que conecta todo

### Sprint 7 — Integración, pulido y pruebas

- Pruebas end-to-end de los 3 flujos completos (investigación, diplomado, prácticas)
- Corrección de bugs cruzados entre módulos
- Mejoras de UI/UX y responsive
- Pruebas de carga básicas / revisión de seguridad (validación de roles, JWT)

### Sprint 8 — Documentación y entrega final

- Documentación técnica (arquitectura, cómo levantar el proyecto, diagrama de módulos)
- Manual de usuario por rol
- Preparar la propuesta de división en microservicios para la fase 2 (justificación, qué módulo se separa primero y por qué — usualmente el más independiente, como Empresas)
- Presentación final / sustentación

---
# Web-DayStrategy
