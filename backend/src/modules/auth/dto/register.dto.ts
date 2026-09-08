export class RegisterDto {
  email: string;
  password: string;
  nombre: string;
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';

  // Requeridos solo cuando rol === 'EMPRESA': se usan para crear el perfil
  // de Empresa asociado al Usuario (ver AuthService.register).
  nombreEmpresa?: string;
  nit?: string;
  sector?: string;
}
