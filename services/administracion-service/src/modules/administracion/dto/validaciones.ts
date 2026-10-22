// Mismas reglas que auth-service (password.validation.ts). Se duplican a
// proposito, siguiendo la convencion del proyecto de que cada microservicio
// valida su propia entrada antes de llamar a otro.
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;

export const PASSWORD_MENSAJE =
  'La contraseña debe tener al menos una letra mayúscula y un número';

export const PROGRAMAS = [
  'TECNOLOGIA_AGROPECUARIA',
  'ADMINISTRACION_EMPRESAS_AGROPECUARIAS',
  'INGENIERO_AGROPECUARIO',
] as const;
