import { CrearCoordinadorDto } from './crear-coordinador.dto.js';

// Mismos campos y reglas que un coordinador (nombre, correo y contraseña).
// El rol SUPERADMIN lo fija el servicio, nunca llega desde el body.
export class CrearSuperadminDto extends CrearCoordinadorDto {}
