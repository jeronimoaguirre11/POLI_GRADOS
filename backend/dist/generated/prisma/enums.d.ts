export declare const Rol: {
    readonly ESTUDIANTE: "ESTUDIANTE";
    readonly EMPRESA: "EMPRESA";
    readonly COORDINADOR: "COORDINADOR";
    readonly DOCENTE: "DOCENTE";
};
export type Rol = (typeof Rol)[keyof typeof Rol];
export declare const Modalidad: {
    readonly INVESTIGACION: "INVESTIGACION";
    readonly DIPLOMADO: "DIPLOMADO";
    readonly PRACTICA: "PRACTICA";
};
export type Modalidad = (typeof Modalidad)[keyof typeof Modalidad];
export declare const TipoDocente: {
    readonly DOCENTE: "DOCENTE";
    readonly EGRESADO: "EGRESADO";
};
export type TipoDocente = (typeof TipoDocente)[keyof typeof TipoDocente];
export declare const TipoPractica: {
    readonly UNIVERSIDAD: "UNIVERSIDAD";
    readonly INDEPENDIENTE: "INDEPENDIENTE";
};
export type TipoPractica = (typeof TipoPractica)[keyof typeof TipoPractica];
