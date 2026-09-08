export class RegisterDto {
  email: string;
  password: string;
  nombre: string;
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';
}
