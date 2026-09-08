import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UsuarioModel = runtime.Types.Result.DefaultSelection<Prisma.$UsuarioPayload>;
export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
};
export type UsuarioMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    nombre: string | null;
    rol: $Enums.Rol | null;
    createdAt: Date | null;
};
export type UsuarioMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    nombre: string | null;
    rol: $Enums.Rol | null;
    createdAt: Date | null;
};
export type UsuarioCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    nombre: number;
    rol: number;
    createdAt: number;
    _all: number;
};
export type UsuarioMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    rol?: true;
    createdAt?: true;
};
export type UsuarioMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    rol?: true;
    createdAt?: true;
};
export type UsuarioCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    rol?: true;
    createdAt?: true;
    _all?: true;
};
export type UsuarioAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput | Prisma.UsuarioOrderByWithRelationInput[];
    cursor?: Prisma.UsuarioWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UsuarioCountAggregateInputType;
    _min?: UsuarioMinAggregateInputType;
    _max?: UsuarioMaxAggregateInputType;
};
export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsuario[P]> : Prisma.GetScalarType<T[P], AggregateUsuario[P]>;
};
export type UsuarioGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithAggregationInput | Prisma.UsuarioOrderByWithAggregationInput[];
    by: Prisma.UsuarioScalarFieldEnum[] | Prisma.UsuarioScalarFieldEnum;
    having?: Prisma.UsuarioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuarioCountAggregateInputType | true;
    _min?: UsuarioMinAggregateInputType;
    _max?: UsuarioMaxAggregateInputType;
};
export type UsuarioGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt: Date;
    _count: UsuarioCountAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
};
export type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsuarioGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsuarioGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsuarioGroupByOutputType[P]>;
}>>;
export type UsuarioWhereInput = {
    AND?: Prisma.UsuarioWhereInput | Prisma.UsuarioWhereInput[];
    OR?: Prisma.UsuarioWhereInput[];
    NOT?: Prisma.UsuarioWhereInput | Prisma.UsuarioWhereInput[];
    id?: Prisma.StringFilter<"Usuario"> | string;
    email?: Prisma.StringFilter<"Usuario"> | string;
    password?: Prisma.StringFilter<"Usuario"> | string;
    nombre?: Prisma.StringFilter<"Usuario"> | string;
    rol?: Prisma.EnumRolFilter<"Usuario"> | $Enums.Rol;
    createdAt?: Prisma.DateTimeFilter<"Usuario"> | Date | string;
    estudiante?: Prisma.XOR<Prisma.EstudianteNullableScalarRelationFilter, Prisma.EstudianteWhereInput> | null;
    empresa?: Prisma.XOR<Prisma.EmpresaNullableScalarRelationFilter, Prisma.EmpresaWhereInput> | null;
    docente?: Prisma.XOR<Prisma.DocenteNullableScalarRelationFilter, Prisma.DocenteWhereInput> | null;
    coordinador?: Prisma.XOR<Prisma.CoordinadorNullableScalarRelationFilter, Prisma.CoordinadorWhereInput> | null;
};
export type UsuarioOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    rol?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    estudiante?: Prisma.EstudianteOrderByWithRelationInput;
    empresa?: Prisma.EmpresaOrderByWithRelationInput;
    docente?: Prisma.DocenteOrderByWithRelationInput;
    coordinador?: Prisma.CoordinadorOrderByWithRelationInput;
};
export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UsuarioWhereInput | Prisma.UsuarioWhereInput[];
    OR?: Prisma.UsuarioWhereInput[];
    NOT?: Prisma.UsuarioWhereInput | Prisma.UsuarioWhereInput[];
    password?: Prisma.StringFilter<"Usuario"> | string;
    nombre?: Prisma.StringFilter<"Usuario"> | string;
    rol?: Prisma.EnumRolFilter<"Usuario"> | $Enums.Rol;
    createdAt?: Prisma.DateTimeFilter<"Usuario"> | Date | string;
    estudiante?: Prisma.XOR<Prisma.EstudianteNullableScalarRelationFilter, Prisma.EstudianteWhereInput> | null;
    empresa?: Prisma.XOR<Prisma.EmpresaNullableScalarRelationFilter, Prisma.EmpresaWhereInput> | null;
    docente?: Prisma.XOR<Prisma.DocenteNullableScalarRelationFilter, Prisma.DocenteWhereInput> | null;
    coordinador?: Prisma.XOR<Prisma.CoordinadorNullableScalarRelationFilter, Prisma.CoordinadorWhereInput> | null;
}, "id" | "email">;
export type UsuarioOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    rol?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UsuarioCountOrderByAggregateInput;
    _max?: Prisma.UsuarioMaxOrderByAggregateInput;
    _min?: Prisma.UsuarioMinOrderByAggregateInput;
};
export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: Prisma.UsuarioScalarWhereWithAggregatesInput | Prisma.UsuarioScalarWhereWithAggregatesInput[];
    OR?: Prisma.UsuarioScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UsuarioScalarWhereWithAggregatesInput | Prisma.UsuarioScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Usuario"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Usuario"> | string;
    password?: Prisma.StringWithAggregatesFilter<"Usuario"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"Usuario"> | string;
    rol?: Prisma.EnumRolWithAggregatesFilter<"Usuario"> | $Enums.Rol;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Usuario"> | Date | string;
};
export type UsuarioCreateInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteUncheckedCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaUncheckedCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteUncheckedCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorUncheckedCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUncheckedUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUncheckedUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUncheckedUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUncheckedUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
};
export type UsuarioUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsuarioUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UsuarioScalarRelationFilter = {
    is?: Prisma.UsuarioWhereInput;
    isNot?: Prisma.UsuarioWhereInput;
};
export type UsuarioCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    rol?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UsuarioMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    rol?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UsuarioMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    rol?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UsuarioCreateNestedOneWithoutCoordinadorInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutCoordinadorInput, Prisma.UsuarioUncheckedCreateWithoutCoordinadorInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutCoordinadorInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioUpdateOneRequiredWithoutCoordinadorNestedInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutCoordinadorInput, Prisma.UsuarioUncheckedCreateWithoutCoordinadorInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutCoordinadorInput;
    upsert?: Prisma.UsuarioUpsertWithoutCoordinadorInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UsuarioUpdateToOneWithWhereWithoutCoordinadorInput, Prisma.UsuarioUpdateWithoutCoordinadorInput>, Prisma.UsuarioUncheckedUpdateWithoutCoordinadorInput>;
};
export type EnumRolFieldUpdateOperationsInput = {
    set?: $Enums.Rol;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UsuarioCreateNestedOneWithoutEstudianteInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutEstudianteInput, Prisma.UsuarioUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutEstudianteInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioUpdateOneRequiredWithoutEstudianteNestedInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutEstudianteInput, Prisma.UsuarioUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutEstudianteInput;
    upsert?: Prisma.UsuarioUpsertWithoutEstudianteInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UsuarioUpdateToOneWithWhereWithoutEstudianteInput, Prisma.UsuarioUpdateWithoutEstudianteInput>, Prisma.UsuarioUncheckedUpdateWithoutEstudianteInput>;
};
export type UsuarioCreateNestedOneWithoutEmpresaInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutEmpresaInput, Prisma.UsuarioUncheckedCreateWithoutEmpresaInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutEmpresaInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioUpdateOneRequiredWithoutEmpresaNestedInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutEmpresaInput, Prisma.UsuarioUncheckedCreateWithoutEmpresaInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutEmpresaInput;
    upsert?: Prisma.UsuarioUpsertWithoutEmpresaInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UsuarioUpdateToOneWithWhereWithoutEmpresaInput, Prisma.UsuarioUpdateWithoutEmpresaInput>, Prisma.UsuarioUncheckedUpdateWithoutEmpresaInput>;
};
export type UsuarioCreateNestedOneWithoutDocenteInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutDocenteInput, Prisma.UsuarioUncheckedCreateWithoutDocenteInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutDocenteInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioUpdateOneRequiredWithoutDocenteNestedInput = {
    create?: Prisma.XOR<Prisma.UsuarioCreateWithoutDocenteInput, Prisma.UsuarioUncheckedCreateWithoutDocenteInput>;
    connectOrCreate?: Prisma.UsuarioCreateOrConnectWithoutDocenteInput;
    upsert?: Prisma.UsuarioUpsertWithoutDocenteInput;
    connect?: Prisma.UsuarioWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UsuarioUpdateToOneWithWhereWithoutDocenteInput, Prisma.UsuarioUpdateWithoutDocenteInput>, Prisma.UsuarioUncheckedUpdateWithoutDocenteInput>;
};
export type UsuarioCreateWithoutCoordinadorInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUncheckedCreateWithoutCoordinadorInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteUncheckedCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaUncheckedCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteUncheckedCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioCreateOrConnectWithoutCoordinadorInput = {
    where: Prisma.UsuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutCoordinadorInput, Prisma.UsuarioUncheckedCreateWithoutCoordinadorInput>;
};
export type UsuarioUpsertWithoutCoordinadorInput = {
    update: Prisma.XOR<Prisma.UsuarioUpdateWithoutCoordinadorInput, Prisma.UsuarioUncheckedUpdateWithoutCoordinadorInput>;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutCoordinadorInput, Prisma.UsuarioUncheckedCreateWithoutCoordinadorInput>;
    where?: Prisma.UsuarioWhereInput;
};
export type UsuarioUpdateToOneWithWhereWithoutCoordinadorInput = {
    where?: Prisma.UsuarioWhereInput;
    data: Prisma.XOR<Prisma.UsuarioUpdateWithoutCoordinadorInput, Prisma.UsuarioUncheckedUpdateWithoutCoordinadorInput>;
};
export type UsuarioUpdateWithoutCoordinadorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioUncheckedUpdateWithoutCoordinadorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUncheckedUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUncheckedUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUncheckedUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioCreateWithoutEstudianteInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    empresa?: Prisma.EmpresaCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUncheckedCreateWithoutEstudianteInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    empresa?: Prisma.EmpresaUncheckedCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteUncheckedCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorUncheckedCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioCreateOrConnectWithoutEstudianteInput = {
    where: Prisma.UsuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutEstudianteInput, Prisma.UsuarioUncheckedCreateWithoutEstudianteInput>;
};
export type UsuarioUpsertWithoutEstudianteInput = {
    update: Prisma.XOR<Prisma.UsuarioUpdateWithoutEstudianteInput, Prisma.UsuarioUncheckedUpdateWithoutEstudianteInput>;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutEstudianteInput, Prisma.UsuarioUncheckedCreateWithoutEstudianteInput>;
    where?: Prisma.UsuarioWhereInput;
};
export type UsuarioUpdateToOneWithWhereWithoutEstudianteInput = {
    where?: Prisma.UsuarioWhereInput;
    data: Prisma.XOR<Prisma.UsuarioUpdateWithoutEstudianteInput, Prisma.UsuarioUncheckedUpdateWithoutEstudianteInput>;
};
export type UsuarioUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioUncheckedUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUncheckedUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUncheckedUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUncheckedUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioCreateWithoutEmpresaInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUncheckedCreateWithoutEmpresaInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteUncheckedCreateNestedOneWithoutUsuarioInput;
    docente?: Prisma.DocenteUncheckedCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorUncheckedCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioCreateOrConnectWithoutEmpresaInput = {
    where: Prisma.UsuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutEmpresaInput, Prisma.UsuarioUncheckedCreateWithoutEmpresaInput>;
};
export type UsuarioUpsertWithoutEmpresaInput = {
    update: Prisma.XOR<Prisma.UsuarioUpdateWithoutEmpresaInput, Prisma.UsuarioUncheckedUpdateWithoutEmpresaInput>;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutEmpresaInput, Prisma.UsuarioUncheckedCreateWithoutEmpresaInput>;
    where?: Prisma.UsuarioWhereInput;
};
export type UsuarioUpdateToOneWithWhereWithoutEmpresaInput = {
    where?: Prisma.UsuarioWhereInput;
    data: Prisma.XOR<Prisma.UsuarioUpdateWithoutEmpresaInput, Prisma.UsuarioUncheckedUpdateWithoutEmpresaInput>;
};
export type UsuarioUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioUncheckedUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUncheckedUpdateOneWithoutUsuarioNestedInput;
    docente?: Prisma.DocenteUncheckedUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUncheckedUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioCreateWithoutDocenteInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioUncheckedCreateWithoutDocenteInput = {
    id?: string;
    email: string;
    password: string;
    nombre: string;
    rol: $Enums.Rol;
    createdAt?: Date | string;
    estudiante?: Prisma.EstudianteUncheckedCreateNestedOneWithoutUsuarioInput;
    empresa?: Prisma.EmpresaUncheckedCreateNestedOneWithoutUsuarioInput;
    coordinador?: Prisma.CoordinadorUncheckedCreateNestedOneWithoutUsuarioInput;
};
export type UsuarioCreateOrConnectWithoutDocenteInput = {
    where: Prisma.UsuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutDocenteInput, Prisma.UsuarioUncheckedCreateWithoutDocenteInput>;
};
export type UsuarioUpsertWithoutDocenteInput = {
    update: Prisma.XOR<Prisma.UsuarioUpdateWithoutDocenteInput, Prisma.UsuarioUncheckedUpdateWithoutDocenteInput>;
    create: Prisma.XOR<Prisma.UsuarioCreateWithoutDocenteInput, Prisma.UsuarioUncheckedCreateWithoutDocenteInput>;
    where?: Prisma.UsuarioWhereInput;
};
export type UsuarioUpdateToOneWithWhereWithoutDocenteInput = {
    where?: Prisma.UsuarioWhereInput;
    data: Prisma.XOR<Prisma.UsuarioUpdateWithoutDocenteInput, Prisma.UsuarioUncheckedUpdateWithoutDocenteInput>;
};
export type UsuarioUpdateWithoutDocenteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioUncheckedUpdateWithoutDocenteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    rol?: Prisma.EnumRolFieldUpdateOperationsInput | $Enums.Rol;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUncheckedUpdateOneWithoutUsuarioNestedInput;
    empresa?: Prisma.EmpresaUncheckedUpdateOneWithoutUsuarioNestedInput;
    coordinador?: Prisma.CoordinadorUncheckedUpdateOneWithoutUsuarioNestedInput;
};
export type UsuarioSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    rol?: boolean;
    createdAt?: boolean;
    estudiante?: boolean | Prisma.Usuario$estudianteArgs<ExtArgs>;
    empresa?: boolean | Prisma.Usuario$empresaArgs<ExtArgs>;
    docente?: boolean | Prisma.Usuario$docenteArgs<ExtArgs>;
    coordinador?: boolean | Prisma.Usuario$coordinadorArgs<ExtArgs>;
}, ExtArgs["result"]["usuario"]>;
export type UsuarioSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    rol?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["usuario"]>;
export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    rol?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["usuario"]>;
export type UsuarioSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    rol?: boolean;
    createdAt?: boolean;
};
export type UsuarioOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "nombre" | "rol" | "createdAt", ExtArgs["result"]["usuario"]>;
export type UsuarioInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    estudiante?: boolean | Prisma.Usuario$estudianteArgs<ExtArgs>;
    empresa?: boolean | Prisma.Usuario$empresaArgs<ExtArgs>;
    docente?: boolean | Prisma.Usuario$docenteArgs<ExtArgs>;
    coordinador?: boolean | Prisma.Usuario$coordinadorArgs<ExtArgs>;
};
export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UsuarioPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Usuario";
    objects: {
        estudiante: Prisma.$EstudiantePayload<ExtArgs> | null;
        empresa: Prisma.$EmpresaPayload<ExtArgs> | null;
        docente: Prisma.$DocentePayload<ExtArgs> | null;
        coordinador: Prisma.$CoordinadorPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        nombre: string;
        rol: $Enums.Rol;
        createdAt: Date;
    }, ExtArgs["result"]["usuario"]>;
    composites: {};
};
export type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UsuarioPayload, S>;
export type UsuarioCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsuarioCountAggregateInputType | true;
};
export interface UsuarioDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Usuario'];
        meta: {
            name: 'Usuario';
        };
    };
    findUnique<T extends UsuarioFindUniqueArgs>(args: Prisma.SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UsuarioFindFirstArgs>(args?: Prisma.SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UsuarioFindManyArgs>(args?: Prisma.SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UsuarioCreateArgs>(args: Prisma.SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UsuarioCreateManyArgs>(args?: Prisma.SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UsuarioDeleteArgs>(args: Prisma.SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UsuarioUpdateArgs>(args: Prisma.SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: Prisma.SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UsuarioUpdateManyArgs>(args: Prisma.SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UsuarioUpsertArgs>(args: Prisma.SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UsuarioCountArgs>(args?: Prisma.Subset<T, UsuarioCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsuarioCountAggregateOutputType> : number>;
    aggregate<T extends UsuarioAggregateArgs>(args: Prisma.Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>;
    groupBy<T extends UsuarioGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UsuarioGroupByArgs['orderBy'];
    } : {
        orderBy?: UsuarioGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UsuarioFieldRefs;
}
export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    estudiante<T extends Prisma.Usuario$estudianteArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Usuario$estudianteArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    empresa<T extends Prisma.Usuario$empresaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Usuario$empresaArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    docente<T extends Prisma.Usuario$docenteArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Usuario$docenteArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    coordinador<T extends Prisma.Usuario$coordinadorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Usuario$coordinadorArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UsuarioFieldRefs {
    readonly id: Prisma.FieldRef<"Usuario", 'String'>;
    readonly email: Prisma.FieldRef<"Usuario", 'String'>;
    readonly password: Prisma.FieldRef<"Usuario", 'String'>;
    readonly nombre: Prisma.FieldRef<"Usuario", 'String'>;
    readonly rol: Prisma.FieldRef<"Usuario", 'Rol'>;
    readonly createdAt: Prisma.FieldRef<"Usuario", 'DateTime'>;
}
export type UsuarioFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput | Prisma.UsuarioOrderByWithRelationInput[];
    cursor?: Prisma.UsuarioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
export type UsuarioFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput | Prisma.UsuarioOrderByWithRelationInput[];
    cursor?: Prisma.UsuarioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
export type UsuarioFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput | Prisma.UsuarioOrderByWithRelationInput[];
    cursor?: Prisma.UsuarioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
export type UsuarioCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UsuarioCreateInput, Prisma.UsuarioUncheckedCreateInput>;
};
export type UsuarioCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UsuarioCreateManyInput | Prisma.UsuarioCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UsuarioCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    data: Prisma.UsuarioCreateManyInput | Prisma.UsuarioCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UsuarioUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UsuarioUpdateInput, Prisma.UsuarioUncheckedUpdateInput>;
    where: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UsuarioUpdateManyMutationInput, Prisma.UsuarioUncheckedUpdateManyInput>;
    where?: Prisma.UsuarioWhereInput;
    limit?: number;
};
export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UsuarioUpdateManyMutationInput, Prisma.UsuarioUncheckedUpdateManyInput>;
    where?: Prisma.UsuarioWhereInput;
    limit?: number;
};
export type UsuarioUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where: Prisma.UsuarioWhereUniqueInput;
    create: Prisma.XOR<Prisma.UsuarioCreateInput, Prisma.UsuarioUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UsuarioUpdateInput, Prisma.UsuarioUncheckedUpdateInput>;
};
export type UsuarioDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where: Prisma.UsuarioWhereUniqueInput;
};
export type UsuarioDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UsuarioWhereInput;
    limit?: number;
};
export type Usuario$estudianteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where?: Prisma.EstudianteWhereInput;
};
export type Usuario$empresaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
};
export type Usuario$docenteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where?: Prisma.DocenteWhereInput;
};
export type Usuario$coordinadorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where?: Prisma.CoordinadorWhereInput;
};
export type UsuarioDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
};
