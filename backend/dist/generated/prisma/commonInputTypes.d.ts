import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | Prisma.EnumRolFieldRefInput<$PrismaModel>;
    in?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRolFilter<$PrismaModel> | $Enums.Rol;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type EnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | Prisma.EnumRolFieldRefInput<$PrismaModel>;
    in?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRolFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRolFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumTipoDocenteFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocente | Prisma.EnumTipoDocenteFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel> | $Enums.TipoDocente;
};
export type EnumTipoDocenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocente | Prisma.EnumTipoDocenteFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoDocenteWithAggregatesFilter<$PrismaModel> | $Enums.TipoDocente;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel>;
};
export type EnumModalidadFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | Prisma.EnumModalidadFieldRefInput<$PrismaModel>;
    in?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadFilter<$PrismaModel> | $Enums.Modalidad;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumModalidadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | Prisma.EnumModalidadFieldRefInput<$PrismaModel>;
    in?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadWithAggregatesFilter<$PrismaModel> | $Enums.Modalidad;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModalidadFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModalidadFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumTipoPracticaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPractica | Prisma.EnumTipoPracticaFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel> | $Enums.TipoPractica;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type EnumTipoPracticaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPractica | Prisma.EnumTipoPracticaFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoPracticaWithAggregatesFilter<$PrismaModel> | $Enums.TipoPractica;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumPerfilBuscadoFilter<$PrismaModel = never> = {
    equals?: $Enums.PerfilBuscado | Prisma.EnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    in?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel> | $Enums.PerfilBuscado;
};
export type EnumModalidadContratacionFilter<$PrismaModel = never> = {
    equals?: $Enums.ModalidadContratacion | Prisma.EnumModalidadContratacionFieldRefInput<$PrismaModel>;
    in?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel> | $Enums.ModalidadContratacion;
};
export type EnumPerfilBuscadoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PerfilBuscado | Prisma.EnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    in?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerfilBuscadoWithAggregatesFilter<$PrismaModel> | $Enums.PerfilBuscado;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel>;
};
export type EnumModalidadContratacionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModalidadContratacion | Prisma.EnumModalidadContratacionFieldRefInput<$PrismaModel>;
    in?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadContratacionWithAggregatesFilter<$PrismaModel> | $Enums.ModalidadContratacion;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | Prisma.EnumRolFieldRefInput<$PrismaModel>;
    in?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRolFilter<$PrismaModel> | $Enums.Rol;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedEnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | Prisma.EnumRolFieldRefInput<$PrismaModel>;
    in?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Rol[] | Prisma.ListEnumRolFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRolFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRolFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumTipoDocenteFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocente | Prisma.EnumTipoDocenteFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel> | $Enums.TipoDocente;
};
export type NestedEnumTipoDocenteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocente | Prisma.EnumTipoDocenteFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoDocente[] | Prisma.ListEnumTipoDocenteFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoDocenteWithAggregatesFilter<$PrismaModel> | $Enums.TipoDocente;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTipoDocenteFilter<$PrismaModel>;
};
export type NestedEnumModalidadFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | Prisma.EnumModalidadFieldRefInput<$PrismaModel>;
    in?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadFilter<$PrismaModel> | $Enums.Modalidad;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumModalidadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | Prisma.EnumModalidadFieldRefInput<$PrismaModel>;
    in?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Modalidad[] | Prisma.ListEnumModalidadFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadWithAggregatesFilter<$PrismaModel> | $Enums.Modalidad;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModalidadFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModalidadFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumTipoPracticaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPractica | Prisma.EnumTipoPracticaFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel> | $Enums.TipoPractica;
};
export type NestedEnumTipoPracticaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoPractica | Prisma.EnumTipoPracticaFieldRefInput<$PrismaModel>;
    in?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TipoPractica[] | Prisma.ListEnumTipoPracticaFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTipoPracticaWithAggregatesFilter<$PrismaModel> | $Enums.TipoPractica;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTipoPracticaFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumPerfilBuscadoFilter<$PrismaModel = never> = {
    equals?: $Enums.PerfilBuscado | Prisma.EnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    in?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel> | $Enums.PerfilBuscado;
};
export type NestedEnumModalidadContratacionFilter<$PrismaModel = never> = {
    equals?: $Enums.ModalidadContratacion | Prisma.EnumModalidadContratacionFieldRefInput<$PrismaModel>;
    in?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel> | $Enums.ModalidadContratacion;
};
export type NestedEnumPerfilBuscadoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PerfilBuscado | Prisma.EnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    in?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PerfilBuscado[] | Prisma.ListEnumPerfilBuscadoFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPerfilBuscadoWithAggregatesFilter<$PrismaModel> | $Enums.PerfilBuscado;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPerfilBuscadoFilter<$PrismaModel>;
};
export type NestedEnumModalidadContratacionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModalidadContratacion | Prisma.EnumModalidadContratacionFieldRefInput<$PrismaModel>;
    in?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModalidadContratacion[] | Prisma.ListEnumModalidadContratacionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModalidadContratacionWithAggregatesFilter<$PrismaModel> | $Enums.ModalidadContratacion;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModalidadContratacionFilter<$PrismaModel>;
};
