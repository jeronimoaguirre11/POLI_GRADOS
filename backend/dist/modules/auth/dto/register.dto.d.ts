export declare class RegisterDto {
    email: string;
    password: string;
    nombre: string;
    rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';
    nombreEmpresa?: string;
    nit?: string;
    sector?: string;
    codigo?: string;
    programa?: string;
    semestre?: number;
}
