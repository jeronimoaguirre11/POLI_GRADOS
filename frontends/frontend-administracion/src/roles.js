export const ROLES = [
  "SUPERADMIN",
  "COORDINADOR",
  "DOCENTE",
  "ESTUDIANTE",
  "EMPRESA",
];

export const ETIQUETAS_ROL = {
  SUPERADMIN: "Super administrador",
  COORDINADOR: "Coordinador",
  DOCENTE: "Docente",
  ESTUDIANTE: "Estudiante",
  EMPRESA: "Empresa",
};

export const PLURALES_ROL = {
  SUPERADMIN: "Administradores",
  COORDINADOR: "Coordinadores",
  DOCENTE: "Docentes",
  ESTUDIANTE: "Estudiantes",
  EMPRESA: "Empresas",
};

// Tipo de cuenta que se puede crear -> ruta de administracion-service.
export const TIPOS_CUENTA = [
  { rol: "COORDINADOR", ruta: "coordinadores", descripcion: "Gestiona el seguimiento de estudiantes y asigna docentes." },
  { rol: "DOCENTE", ruta: "docentes", descripcion: "Acompaña a los estudiantes asignados." },
  { rol: "ESTUDIANTE", ruta: "estudiantes", descripcion: "Accede a prácticas, diplomado e investigación." },
  { rol: "EMPRESA", ruta: "empresas", descripcion: "Publica convocatorias de práctica." },
  { rol: "SUPERADMIN", ruta: "administradores", descripcion: "Acceso total a este panel." },
];

export const PROGRAMAS = [
  { value: "TECNOLOGIA_AGROPECUARIA", label: "Tecnología Agropecuaria" },
  {
    value: "ADMINISTRACION_EMPRESAS_AGROPECUARIAS",
    label: "Administración de Empresas Agropecuarias",
  },
  { value: "INGENIERO_AGROPECUARIO", label: "Ingeniero Agropecuario" },
];

// Misma politica que el backend: 8-15 caracteres, una mayuscula y un numero.
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;

export function validarPassword(password) {
  if (!password) return "";
  if (password.length < 8) return "Debe tener al menos 8 caracteres";
  if (password.length > 15) return "No puede tener más de 15 caracteres";
  if (!PASSWORD_REGEX.test(password)) {
    return "Debe incluir al menos una mayúscula y un número";
  }
  return "";
}
