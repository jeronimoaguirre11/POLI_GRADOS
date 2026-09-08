import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Coordinador: 'Coordinador',
    Usuario: 'Usuario',
    Estudiante: 'Estudiante',
    Empresa: 'Empresa',
    Docente: 'Docente',
    ProcesoGrado: 'ProcesoGrado',
    Investigacion: 'Investigacion',
    Diplomado: 'Diplomado',
    Practica: 'Practica',
    Oferta: 'Oferta',
    Postulacion: 'Postulacion'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CoordinadorScalarFieldEnum = {
    id: 'id',
    usuarioId: 'usuarioId',
    cargo: 'cargo'
};
export const UsuarioScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    nombre: 'nombre',
    rol: 'rol',
    createdAt: 'createdAt'
};
export const EstudianteScalarFieldEnum = {
    id: 'id',
    usuarioId: 'usuarioId',
    codigo: 'codigo',
    programa: 'programa',
    semestre: 'semestre'
};
export const EmpresaScalarFieldEnum = {
    id: 'id',
    usuarioId: 'usuarioId',
    nombreEmpresa: 'nombreEmpresa',
    nit: 'nit',
    sector: 'sector'
};
export const DocenteScalarFieldEnum = {
    id: 'id',
    usuarioId: 'usuarioId',
    tipo: 'tipo',
    especialidad: 'especialidad'
};
export const ProcesoGradoScalarFieldEnum = {
    id: 'id',
    estudianteId: 'estudianteId',
    modalidad: 'modalidad',
    estado: 'estado',
    asesorId: 'asesorId',
    coordinadorId: 'coordinadorId',
    fechaAsignacion: 'fechaAsignacion',
    fechaInicio: 'fechaInicio'
};
export const InvestigacionScalarFieldEnum = {
    id: 'id',
    procesoGradoId: 'procesoGradoId',
    grupoInvestigacion: 'grupoInvestigacion',
    ideaPropuesta: 'ideaPropuesta',
    materiaMatriculada: 'materiaMatriculada'
};
export const DiplomadoScalarFieldEnum = {
    id: 'id',
    procesoGradoId: 'procesoGradoId',
    nombreCurso: 'nombreCurso',
    institucion: 'institucion',
    estadoAprobacion: 'estadoAprobacion'
};
export const PracticaScalarFieldEnum = {
    id: 'id',
    procesoGradoId: 'procesoGradoId',
    tipo: 'tipo',
    horasCompletadas: 'horasCompletadas',
    ofertaId: 'ofertaId',
    estadoReporte: 'estadoReporte'
};
export const OfertaScalarFieldEnum = {
    id: 'id',
    empresaId: 'empresaId',
    titulo: 'titulo',
    descripcion: 'descripcion',
    perfilBuscado: 'perfilBuscado',
    modalidadContratacion: 'modalidadContratacion',
    ubicacion: 'ubicacion',
    funciones: 'funciones',
    fechaInicioConvocatoria: 'fechaInicioConvocatoria',
    fechaFinConvocatoria: 'fechaFinConvocatoria',
    fechaInicioPractica: 'fechaInicioPractica',
    duracionMeses: 'duracionMeses',
    imagenUrl: 'imagenUrl',
    estado: 'estado',
    fechaPublicacion: 'fechaPublicacion'
};
export const PostulacionScalarFieldEnum = {
    id: 'id',
    ofertaId: 'ofertaId',
    estudianteId: 'estudianteId',
    hojaVidaUrl: 'hojaVidaUrl',
    estado: 'estado',
    fecha: 'fecha'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map