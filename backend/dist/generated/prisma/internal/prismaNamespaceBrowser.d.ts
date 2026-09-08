import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Coordinador: "Coordinador";
    readonly Usuario: "Usuario";
    readonly Estudiante: "Estudiante";
    readonly Empresa: "Empresa";
    readonly Docente: "Docente";
    readonly ProcesoGrado: "ProcesoGrado";
    readonly Investigacion: "Investigacion";
    readonly Diplomado: "Diplomado";
    readonly Practica: "Practica";
    readonly Oferta: "Oferta";
    readonly Postulacion: "Postulacion";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CoordinadorScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly cargo: "cargo";
};
export type CoordinadorScalarFieldEnum = (typeof CoordinadorScalarFieldEnum)[keyof typeof CoordinadorScalarFieldEnum];
export declare const UsuarioScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly nombre: "nombre";
    readonly rol: "rol";
    readonly createdAt: "createdAt";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const EstudianteScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly codigo: "codigo";
    readonly programa: "programa";
    readonly semestre: "semestre";
};
export type EstudianteScalarFieldEnum = (typeof EstudianteScalarFieldEnum)[keyof typeof EstudianteScalarFieldEnum];
export declare const EmpresaScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly nombreEmpresa: "nombreEmpresa";
    readonly nit: "nit";
    readonly sector: "sector";
};
export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum];
export declare const DocenteScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly tipo: "tipo";
    readonly especialidad: "especialidad";
};
export type DocenteScalarFieldEnum = (typeof DocenteScalarFieldEnum)[keyof typeof DocenteScalarFieldEnum];
export declare const ProcesoGradoScalarFieldEnum: {
    readonly id: "id";
    readonly estudianteId: "estudianteId";
    readonly modalidad: "modalidad";
    readonly estado: "estado";
    readonly asesorId: "asesorId";
    readonly coordinadorId: "coordinadorId";
    readonly fechaAsignacion: "fechaAsignacion";
    readonly fechaInicio: "fechaInicio";
};
export type ProcesoGradoScalarFieldEnum = (typeof ProcesoGradoScalarFieldEnum)[keyof typeof ProcesoGradoScalarFieldEnum];
export declare const InvestigacionScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly grupoInvestigacion: "grupoInvestigacion";
    readonly ideaPropuesta: "ideaPropuesta";
    readonly materiaMatriculada: "materiaMatriculada";
};
export type InvestigacionScalarFieldEnum = (typeof InvestigacionScalarFieldEnum)[keyof typeof InvestigacionScalarFieldEnum];
export declare const DiplomadoScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly nombreCurso: "nombreCurso";
    readonly institucion: "institucion";
    readonly estadoAprobacion: "estadoAprobacion";
};
export type DiplomadoScalarFieldEnum = (typeof DiplomadoScalarFieldEnum)[keyof typeof DiplomadoScalarFieldEnum];
export declare const PracticaScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly tipo: "tipo";
    readonly horasCompletadas: "horasCompletadas";
    readonly ofertaId: "ofertaId";
    readonly estadoReporte: "estadoReporte";
};
export type PracticaScalarFieldEnum = (typeof PracticaScalarFieldEnum)[keyof typeof PracticaScalarFieldEnum];
export declare const OfertaScalarFieldEnum: {
    readonly id: "id";
    readonly empresaId: "empresaId";
    readonly titulo: "titulo";
    readonly descripcion: "descripcion";
    readonly perfilBuscado: "perfilBuscado";
    readonly modalidadContratacion: "modalidadContratacion";
    readonly ubicacion: "ubicacion";
    readonly funciones: "funciones";
    readonly fechaInicioConvocatoria: "fechaInicioConvocatoria";
    readonly fechaFinConvocatoria: "fechaFinConvocatoria";
    readonly fechaInicioPractica: "fechaInicioPractica";
    readonly duracionMeses: "duracionMeses";
    readonly imagenUrl: "imagenUrl";
    readonly estado: "estado";
    readonly fechaPublicacion: "fechaPublicacion";
};
export type OfertaScalarFieldEnum = (typeof OfertaScalarFieldEnum)[keyof typeof OfertaScalarFieldEnum];
export declare const PostulacionScalarFieldEnum: {
    readonly id: "id";
    readonly ofertaId: "ofertaId";
    readonly estudianteId: "estudianteId";
    readonly estado: "estado";
    readonly fecha: "fecha";
};
export type PostulacionScalarFieldEnum = (typeof PostulacionScalarFieldEnum)[keyof typeof PostulacionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
