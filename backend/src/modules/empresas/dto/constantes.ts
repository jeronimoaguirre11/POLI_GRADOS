import type {
  PerfilBuscado,
  ModalidadContratacion,
} from '../../../generated/prisma/enums.js';

export const PERFILES_BUSCADOS: PerfilBuscado[] = [
  'TECNOLOGIA_AGROPECUARIA',
  'ADMINISTRACION_EMPRESAS_AGROPECUARIAS',
  'INGENIERO_AGROPECUARIO',
];

export const MODALIDADES_CONTRATACION: ModalidadContratacion[] = [
  'CONTRATO_SENA',
  'CONVENIO',
  'VOLUNTARIA',
];
