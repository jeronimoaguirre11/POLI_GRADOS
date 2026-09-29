// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import type { JwtPayload } from '../guards/jwt-auth.guard.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: JwtPayload['rol'][]) =>
  SetMetadata(ROLES_KEY, roles);
