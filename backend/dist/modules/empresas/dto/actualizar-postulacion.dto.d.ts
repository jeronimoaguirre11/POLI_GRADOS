export declare const ESTADOS_POSTULACION: readonly ["PENDIENTE", "EN_REVISION", "PRESELECCIONADO", "RECHAZADO", "SELECCIONADO"];
export type EstadoPostulacion = (typeof ESTADOS_POSTULACION)[number];
export declare class ActualizarPostulacionDto {
    estado?: EstadoPostulacion;
    observacionesEmpresa?: string;
}
