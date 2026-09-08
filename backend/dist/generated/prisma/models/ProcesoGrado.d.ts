import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProcesoGradoModel = runtime.Types.Result.DefaultSelection<Prisma.$ProcesoGradoPayload>;
export type AggregateProcesoGrado = {
    _count: ProcesoGradoCountAggregateOutputType | null;
    _min: ProcesoGradoMinAggregateOutputType | null;
    _max: ProcesoGradoMaxAggregateOutputType | null;
};
export type ProcesoGradoMinAggregateOutputType = {
    id: string | null;
    estudianteId: string | null;
    modalidad: $Enums.Modalidad | null;
    estado: string | null;
    asesorId: string | null;
    coordinadorId: string | null;
    fechaAsignacion: Date | null;
    fechaInicio: Date | null;
};
export type ProcesoGradoMaxAggregateOutputType = {
    id: string | null;
    estudianteId: string | null;
    modalidad: $Enums.Modalidad | null;
    estado: string | null;
    asesorId: string | null;
    coordinadorId: string | null;
    fechaAsignacion: Date | null;
    fechaInicio: Date | null;
};
export type ProcesoGradoCountAggregateOutputType = {
    id: number;
    estudianteId: number;
    modalidad: number;
    estado: number;
    asesorId: number;
    coordinadorId: number;
    fechaAsignacion: number;
    fechaInicio: number;
    _all: number;
};
export type ProcesoGradoMinAggregateInputType = {
    id?: true;
    estudianteId?: true;
    modalidad?: true;
    estado?: true;
    asesorId?: true;
    coordinadorId?: true;
    fechaAsignacion?: true;
    fechaInicio?: true;
};
export type ProcesoGradoMaxAggregateInputType = {
    id?: true;
    estudianteId?: true;
    modalidad?: true;
    estado?: true;
    asesorId?: true;
    coordinadorId?: true;
    fechaAsignacion?: true;
    fechaInicio?: true;
};
export type ProcesoGradoCountAggregateInputType = {
    id?: true;
    estudianteId?: true;
    modalidad?: true;
    estado?: true;
    asesorId?: true;
    coordinadorId?: true;
    fechaAsignacion?: true;
    fechaInicio?: true;
    _all?: true;
};
export type ProcesoGradoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcesoGradoWhereInput;
    orderBy?: Prisma.ProcesoGradoOrderByWithRelationInput | Prisma.ProcesoGradoOrderByWithRelationInput[];
    cursor?: Prisma.ProcesoGradoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProcesoGradoCountAggregateInputType;
    _min?: ProcesoGradoMinAggregateInputType;
    _max?: ProcesoGradoMaxAggregateInputType;
};
export type GetProcesoGradoAggregateType<T extends ProcesoGradoAggregateArgs> = {
    [P in keyof T & keyof AggregateProcesoGrado]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProcesoGrado[P]> : Prisma.GetScalarType<T[P], AggregateProcesoGrado[P]>;
};
export type ProcesoGradoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcesoGradoWhereInput;
    orderBy?: Prisma.ProcesoGradoOrderByWithAggregationInput | Prisma.ProcesoGradoOrderByWithAggregationInput[];
    by: Prisma.ProcesoGradoScalarFieldEnum[] | Prisma.ProcesoGradoScalarFieldEnum;
    having?: Prisma.ProcesoGradoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProcesoGradoCountAggregateInputType | true;
    _min?: ProcesoGradoMinAggregateInputType;
    _max?: ProcesoGradoMaxAggregateInputType;
};
export type ProcesoGradoGroupByOutputType = {
    id: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado: string;
    asesorId: string | null;
    coordinadorId: string | null;
    fechaAsignacion: Date | null;
    fechaInicio: Date;
    _count: ProcesoGradoCountAggregateOutputType | null;
    _min: ProcesoGradoMinAggregateOutputType | null;
    _max: ProcesoGradoMaxAggregateOutputType | null;
};
export type GetProcesoGradoGroupByPayload<T extends ProcesoGradoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProcesoGradoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProcesoGradoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProcesoGradoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProcesoGradoGroupByOutputType[P]>;
}>>;
export type ProcesoGradoWhereInput = {
    AND?: Prisma.ProcesoGradoWhereInput | Prisma.ProcesoGradoWhereInput[];
    OR?: Prisma.ProcesoGradoWhereInput[];
    NOT?: Prisma.ProcesoGradoWhereInput | Prisma.ProcesoGradoWhereInput[];
    id?: Prisma.StringFilter<"ProcesoGrado"> | string;
    estudianteId?: Prisma.StringFilter<"ProcesoGrado"> | string;
    modalidad?: Prisma.EnumModalidadFilter<"ProcesoGrado"> | $Enums.Modalidad;
    estado?: Prisma.StringFilter<"ProcesoGrado"> | string;
    asesorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    coordinadorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    fechaAsignacion?: Prisma.DateTimeNullableFilter<"ProcesoGrado"> | Date | string | null;
    fechaInicio?: Prisma.DateTimeFilter<"ProcesoGrado"> | Date | string;
    estudiante?: Prisma.XOR<Prisma.EstudianteScalarRelationFilter, Prisma.EstudianteWhereInput>;
    asesor?: Prisma.XOR<Prisma.DocenteNullableScalarRelationFilter, Prisma.DocenteWhereInput> | null;
    coordinador?: Prisma.XOR<Prisma.CoordinadorNullableScalarRelationFilter, Prisma.CoordinadorWhereInput> | null;
    investigacion?: Prisma.XOR<Prisma.InvestigacionNullableScalarRelationFilter, Prisma.InvestigacionWhereInput> | null;
    diplomado?: Prisma.XOR<Prisma.DiplomadoNullableScalarRelationFilter, Prisma.DiplomadoWhereInput> | null;
    practica?: Prisma.XOR<Prisma.PracticaNullableScalarRelationFilter, Prisma.PracticaWhereInput> | null;
};
export type ProcesoGradoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    modalidad?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    asesorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    coordinadorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fechaAsignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fechaInicio?: Prisma.SortOrder;
    estudiante?: Prisma.EstudianteOrderByWithRelationInput;
    asesor?: Prisma.DocenteOrderByWithRelationInput;
    coordinador?: Prisma.CoordinadorOrderByWithRelationInput;
    investigacion?: Prisma.InvestigacionOrderByWithRelationInput;
    diplomado?: Prisma.DiplomadoOrderByWithRelationInput;
    practica?: Prisma.PracticaOrderByWithRelationInput;
};
export type ProcesoGradoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    estudianteId?: string;
    AND?: Prisma.ProcesoGradoWhereInput | Prisma.ProcesoGradoWhereInput[];
    OR?: Prisma.ProcesoGradoWhereInput[];
    NOT?: Prisma.ProcesoGradoWhereInput | Prisma.ProcesoGradoWhereInput[];
    modalidad?: Prisma.EnumModalidadFilter<"ProcesoGrado"> | $Enums.Modalidad;
    estado?: Prisma.StringFilter<"ProcesoGrado"> | string;
    asesorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    coordinadorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    fechaAsignacion?: Prisma.DateTimeNullableFilter<"ProcesoGrado"> | Date | string | null;
    fechaInicio?: Prisma.DateTimeFilter<"ProcesoGrado"> | Date | string;
    estudiante?: Prisma.XOR<Prisma.EstudianteScalarRelationFilter, Prisma.EstudianteWhereInput>;
    asesor?: Prisma.XOR<Prisma.DocenteNullableScalarRelationFilter, Prisma.DocenteWhereInput> | null;
    coordinador?: Prisma.XOR<Prisma.CoordinadorNullableScalarRelationFilter, Prisma.CoordinadorWhereInput> | null;
    investigacion?: Prisma.XOR<Prisma.InvestigacionNullableScalarRelationFilter, Prisma.InvestigacionWhereInput> | null;
    diplomado?: Prisma.XOR<Prisma.DiplomadoNullableScalarRelationFilter, Prisma.DiplomadoWhereInput> | null;
    practica?: Prisma.XOR<Prisma.PracticaNullableScalarRelationFilter, Prisma.PracticaWhereInput> | null;
}, "id" | "estudianteId">;
export type ProcesoGradoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    modalidad?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    asesorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    coordinadorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fechaAsignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fechaInicio?: Prisma.SortOrder;
    _count?: Prisma.ProcesoGradoCountOrderByAggregateInput;
    _max?: Prisma.ProcesoGradoMaxOrderByAggregateInput;
    _min?: Prisma.ProcesoGradoMinOrderByAggregateInput;
};
export type ProcesoGradoScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProcesoGradoScalarWhereWithAggregatesInput | Prisma.ProcesoGradoScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProcesoGradoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProcesoGradoScalarWhereWithAggregatesInput | Prisma.ProcesoGradoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProcesoGrado"> | string;
    estudianteId?: Prisma.StringWithAggregatesFilter<"ProcesoGrado"> | string;
    modalidad?: Prisma.EnumModalidadWithAggregatesFilter<"ProcesoGrado"> | $Enums.Modalidad;
    estado?: Prisma.StringWithAggregatesFilter<"ProcesoGrado"> | string;
    asesorId?: Prisma.StringNullableWithAggregatesFilter<"ProcesoGrado"> | string | null;
    coordinadorId?: Prisma.StringNullableWithAggregatesFilter<"ProcesoGrado"> | string | null;
    fechaAsignacion?: Prisma.DateTimeNullableWithAggregatesFilter<"ProcesoGrado"> | Date | string | null;
    fechaInicio?: Prisma.DateTimeWithAggregatesFilter<"ProcesoGrado"> | Date | string;
};
export type ProcesoGradoCreateInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoCreateManyInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
};
export type ProcesoGradoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcesoGradoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcesoGradoListRelationFilter = {
    every?: Prisma.ProcesoGradoWhereInput;
    some?: Prisma.ProcesoGradoWhereInput;
    none?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProcesoGradoNullableScalarRelationFilter = {
    is?: Prisma.ProcesoGradoWhereInput | null;
    isNot?: Prisma.ProcesoGradoWhereInput | null;
};
export type ProcesoGradoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    modalidad?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    asesorId?: Prisma.SortOrder;
    coordinadorId?: Prisma.SortOrder;
    fechaAsignacion?: Prisma.SortOrder;
    fechaInicio?: Prisma.SortOrder;
};
export type ProcesoGradoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    modalidad?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    asesorId?: Prisma.SortOrder;
    coordinadorId?: Prisma.SortOrder;
    fechaAsignacion?: Prisma.SortOrder;
    fechaInicio?: Prisma.SortOrder;
};
export type ProcesoGradoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    modalidad?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    asesorId?: Prisma.SortOrder;
    coordinadorId?: Prisma.SortOrder;
    fechaAsignacion?: Prisma.SortOrder;
    fechaInicio?: Prisma.SortOrder;
};
export type ProcesoGradoScalarRelationFilter = {
    is?: Prisma.ProcesoGradoWhereInput;
    isNot?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoCreateNestedManyWithoutCoordinadorInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput> | Prisma.ProcesoGradoCreateWithoutCoordinadorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput | Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyCoordinadorInputEnvelope;
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
};
export type ProcesoGradoUncheckedCreateNestedManyWithoutCoordinadorInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput> | Prisma.ProcesoGradoCreateWithoutCoordinadorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput | Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyCoordinadorInputEnvelope;
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
};
export type ProcesoGradoUpdateManyWithoutCoordinadorNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput> | Prisma.ProcesoGradoCreateWithoutCoordinadorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput | Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput[];
    upsert?: Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutCoordinadorInput | Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutCoordinadorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyCoordinadorInputEnvelope;
    set?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    disconnect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    delete?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    update?: Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutCoordinadorInput | Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutCoordinadorInput[];
    updateMany?: Prisma.ProcesoGradoUpdateManyWithWhereWithoutCoordinadorInput | Prisma.ProcesoGradoUpdateManyWithWhereWithoutCoordinadorInput[];
    deleteMany?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
};
export type ProcesoGradoUncheckedUpdateManyWithoutCoordinadorNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput> | Prisma.ProcesoGradoCreateWithoutCoordinadorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput | Prisma.ProcesoGradoCreateOrConnectWithoutCoordinadorInput[];
    upsert?: Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutCoordinadorInput | Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutCoordinadorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyCoordinadorInputEnvelope;
    set?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    disconnect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    delete?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    update?: Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutCoordinadorInput | Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutCoordinadorInput[];
    updateMany?: Prisma.ProcesoGradoUpdateManyWithWhereWithoutCoordinadorInput | Prisma.ProcesoGradoUpdateManyWithWhereWithoutCoordinadorInput[];
    deleteMany?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
};
export type ProcesoGradoCreateNestedOneWithoutEstudianteInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutEstudianteInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUncheckedCreateNestedOneWithoutEstudianteInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutEstudianteInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUpdateOneWithoutEstudianteNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutEstudianteInput;
    upsert?: Prisma.ProcesoGradoUpsertWithoutEstudianteInput;
    disconnect?: Prisma.ProcesoGradoWhereInput | boolean;
    delete?: Prisma.ProcesoGradoWhereInput | boolean;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProcesoGradoUpdateToOneWithWhereWithoutEstudianteInput, Prisma.ProcesoGradoUpdateWithoutEstudianteInput>, Prisma.ProcesoGradoUncheckedUpdateWithoutEstudianteInput>;
};
export type ProcesoGradoUncheckedUpdateOneWithoutEstudianteNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutEstudianteInput;
    upsert?: Prisma.ProcesoGradoUpsertWithoutEstudianteInput;
    disconnect?: Prisma.ProcesoGradoWhereInput | boolean;
    delete?: Prisma.ProcesoGradoWhereInput | boolean;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProcesoGradoUpdateToOneWithWhereWithoutEstudianteInput, Prisma.ProcesoGradoUpdateWithoutEstudianteInput>, Prisma.ProcesoGradoUncheckedUpdateWithoutEstudianteInput>;
};
export type ProcesoGradoCreateNestedManyWithoutAsesorInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput> | Prisma.ProcesoGradoCreateWithoutAsesorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput | Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyAsesorInputEnvelope;
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
};
export type ProcesoGradoUncheckedCreateNestedManyWithoutAsesorInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput> | Prisma.ProcesoGradoCreateWithoutAsesorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput | Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyAsesorInputEnvelope;
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
};
export type ProcesoGradoUpdateManyWithoutAsesorNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput> | Prisma.ProcesoGradoCreateWithoutAsesorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput | Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput[];
    upsert?: Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutAsesorInput | Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutAsesorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyAsesorInputEnvelope;
    set?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    disconnect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    delete?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    update?: Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutAsesorInput | Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutAsesorInput[];
    updateMany?: Prisma.ProcesoGradoUpdateManyWithWhereWithoutAsesorInput | Prisma.ProcesoGradoUpdateManyWithWhereWithoutAsesorInput[];
    deleteMany?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
};
export type ProcesoGradoUncheckedUpdateManyWithoutAsesorNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput> | Prisma.ProcesoGradoCreateWithoutAsesorInput[] | Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput[];
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput | Prisma.ProcesoGradoCreateOrConnectWithoutAsesorInput[];
    upsert?: Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutAsesorInput | Prisma.ProcesoGradoUpsertWithWhereUniqueWithoutAsesorInput[];
    createMany?: Prisma.ProcesoGradoCreateManyAsesorInputEnvelope;
    set?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    disconnect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    delete?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    connect?: Prisma.ProcesoGradoWhereUniqueInput | Prisma.ProcesoGradoWhereUniqueInput[];
    update?: Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutAsesorInput | Prisma.ProcesoGradoUpdateWithWhereUniqueWithoutAsesorInput[];
    updateMany?: Prisma.ProcesoGradoUpdateManyWithWhereWithoutAsesorInput | Prisma.ProcesoGradoUpdateManyWithWhereWithoutAsesorInput[];
    deleteMany?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
};
export type EnumModalidadFieldUpdateOperationsInput = {
    set?: $Enums.Modalidad;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ProcesoGradoCreateNestedOneWithoutInvestigacionInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedCreateWithoutInvestigacionInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutInvestigacionInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUpdateOneRequiredWithoutInvestigacionNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedCreateWithoutInvestigacionInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutInvestigacionInput;
    upsert?: Prisma.ProcesoGradoUpsertWithoutInvestigacionInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProcesoGradoUpdateToOneWithWhereWithoutInvestigacionInput, Prisma.ProcesoGradoUpdateWithoutInvestigacionInput>, Prisma.ProcesoGradoUncheckedUpdateWithoutInvestigacionInput>;
};
export type ProcesoGradoCreateNestedOneWithoutDiplomadoInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedCreateWithoutDiplomadoInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutDiplomadoInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUpdateOneRequiredWithoutDiplomadoNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedCreateWithoutDiplomadoInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutDiplomadoInput;
    upsert?: Prisma.ProcesoGradoUpsertWithoutDiplomadoInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProcesoGradoUpdateToOneWithWhereWithoutDiplomadoInput, Prisma.ProcesoGradoUpdateWithoutDiplomadoInput>, Prisma.ProcesoGradoUncheckedUpdateWithoutDiplomadoInput>;
};
export type ProcesoGradoCreateNestedOneWithoutPracticaInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedCreateWithoutPracticaInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutPracticaInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUpdateOneRequiredWithoutPracticaNestedInput = {
    create?: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedCreateWithoutPracticaInput>;
    connectOrCreate?: Prisma.ProcesoGradoCreateOrConnectWithoutPracticaInput;
    upsert?: Prisma.ProcesoGradoUpsertWithoutPracticaInput;
    connect?: Prisma.ProcesoGradoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProcesoGradoUpdateToOneWithWhereWithoutPracticaInput, Prisma.ProcesoGradoUpdateWithoutPracticaInput>, Prisma.ProcesoGradoUncheckedUpdateWithoutPracticaInput>;
};
export type ProcesoGradoCreateWithoutCoordinadorInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutCoordinadorInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutCoordinadorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput>;
};
export type ProcesoGradoCreateManyCoordinadorInputEnvelope = {
    data: Prisma.ProcesoGradoCreateManyCoordinadorInput | Prisma.ProcesoGradoCreateManyCoordinadorInput[];
    skipDuplicates?: boolean;
};
export type ProcesoGradoUpsertWithWhereUniqueWithoutCoordinadorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedUpdateWithoutCoordinadorInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedCreateWithoutCoordinadorInput>;
};
export type ProcesoGradoUpdateWithWhereUniqueWithoutCoordinadorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutCoordinadorInput, Prisma.ProcesoGradoUncheckedUpdateWithoutCoordinadorInput>;
};
export type ProcesoGradoUpdateManyWithWhereWithoutCoordinadorInput = {
    where: Prisma.ProcesoGradoScalarWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateManyMutationInput, Prisma.ProcesoGradoUncheckedUpdateManyWithoutCoordinadorInput>;
};
export type ProcesoGradoScalarWhereInput = {
    AND?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
    OR?: Prisma.ProcesoGradoScalarWhereInput[];
    NOT?: Prisma.ProcesoGradoScalarWhereInput | Prisma.ProcesoGradoScalarWhereInput[];
    id?: Prisma.StringFilter<"ProcesoGrado"> | string;
    estudianteId?: Prisma.StringFilter<"ProcesoGrado"> | string;
    modalidad?: Prisma.EnumModalidadFilter<"ProcesoGrado"> | $Enums.Modalidad;
    estado?: Prisma.StringFilter<"ProcesoGrado"> | string;
    asesorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    coordinadorId?: Prisma.StringNullableFilter<"ProcesoGrado"> | string | null;
    fechaAsignacion?: Prisma.DateTimeNullableFilter<"ProcesoGrado"> | Date | string | null;
    fechaInicio?: Prisma.DateTimeFilter<"ProcesoGrado"> | Date | string;
};
export type ProcesoGradoCreateWithoutEstudianteInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutEstudianteInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutEstudianteInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
};
export type ProcesoGradoUpsertWithoutEstudianteInput = {
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedUpdateWithoutEstudianteInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedCreateWithoutEstudianteInput>;
    where?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoUpdateToOneWithWhereWithoutEstudianteInput = {
    where?: Prisma.ProcesoGradoWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutEstudianteInput, Prisma.ProcesoGradoUncheckedUpdateWithoutEstudianteInput>;
};
export type ProcesoGradoUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoCreateWithoutAsesorInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutAsesorInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutAsesorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput>;
};
export type ProcesoGradoCreateManyAsesorInputEnvelope = {
    data: Prisma.ProcesoGradoCreateManyAsesorInput | Prisma.ProcesoGradoCreateManyAsesorInput[];
    skipDuplicates?: boolean;
};
export type ProcesoGradoUpsertWithWhereUniqueWithoutAsesorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedUpdateWithoutAsesorInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedCreateWithoutAsesorInput>;
};
export type ProcesoGradoUpdateWithWhereUniqueWithoutAsesorInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutAsesorInput, Prisma.ProcesoGradoUncheckedUpdateWithoutAsesorInput>;
};
export type ProcesoGradoUpdateManyWithWhereWithoutAsesorInput = {
    where: Prisma.ProcesoGradoScalarWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateManyMutationInput, Prisma.ProcesoGradoUncheckedUpdateManyWithoutAsesorInput>;
};
export type ProcesoGradoCreateWithoutInvestigacionInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutInvestigacionInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutInvestigacionInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedCreateWithoutInvestigacionInput>;
};
export type ProcesoGradoUpsertWithoutInvestigacionInput = {
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedUpdateWithoutInvestigacionInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedCreateWithoutInvestigacionInput>;
    where?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoUpdateToOneWithWhereWithoutInvestigacionInput = {
    where?: Prisma.ProcesoGradoWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutInvestigacionInput, Prisma.ProcesoGradoUncheckedUpdateWithoutInvestigacionInput>;
};
export type ProcesoGradoUpdateWithoutInvestigacionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutInvestigacionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoCreateWithoutDiplomadoInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutDiplomadoInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    practica?: Prisma.PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutDiplomadoInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedCreateWithoutDiplomadoInput>;
};
export type ProcesoGradoUpsertWithoutDiplomadoInput = {
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedUpdateWithoutDiplomadoInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedCreateWithoutDiplomadoInput>;
    where?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoUpdateToOneWithWhereWithoutDiplomadoInput = {
    where?: Prisma.ProcesoGradoWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutDiplomadoInput, Prisma.ProcesoGradoUncheckedUpdateWithoutDiplomadoInput>;
};
export type ProcesoGradoUpdateWithoutDiplomadoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutDiplomadoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoCreateWithoutPracticaInput = {
    id?: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutProcesoGradoInput;
    asesor?: Prisma.DocenteCreateNestedOneWithoutProcesosAsesoradosInput;
    coordinador?: Prisma.CoordinadorCreateNestedOneWithoutProcesosAsignadosInput;
    investigacion?: Prisma.InvestigacionCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoUncheckedCreateWithoutPracticaInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
    investigacion?: Prisma.InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput;
    diplomado?: Prisma.DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput;
};
export type ProcesoGradoCreateOrConnectWithoutPracticaInput = {
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedCreateWithoutPracticaInput>;
};
export type ProcesoGradoUpsertWithoutPracticaInput = {
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedUpdateWithoutPracticaInput>;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedCreateWithoutPracticaInput>;
    where?: Prisma.ProcesoGradoWhereInput;
};
export type ProcesoGradoUpdateToOneWithWhereWithoutPracticaInput = {
    where?: Prisma.ProcesoGradoWhereInput;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateWithoutPracticaInput, Prisma.ProcesoGradoUncheckedUpdateWithoutPracticaInput>;
};
export type ProcesoGradoUpdateWithoutPracticaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutPracticaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoCreateManyCoordinadorInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    asesorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
};
export type ProcesoGradoUpdateWithoutCoordinadorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    asesor?: Prisma.DocenteUpdateOneWithoutProcesosAsesoradosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutCoordinadorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateManyWithoutCoordinadorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    asesorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcesoGradoCreateManyAsesorInput = {
    id?: string;
    estudianteId: string;
    modalidad: $Enums.Modalidad;
    estado?: string;
    coordinadorId?: string | null;
    fechaAsignacion?: Date | string | null;
    fechaInicio?: Date | string;
};
export type ProcesoGradoUpdateWithoutAsesorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput;
    coordinador?: Prisma.CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput;
    investigacion?: Prisma.InvestigacionUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateWithoutAsesorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    investigacion?: Prisma.InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    diplomado?: Prisma.DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput;
    practica?: Prisma.PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput;
};
export type ProcesoGradoUncheckedUpdateManyWithoutAsesorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    modalidad?: Prisma.EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    coordinadorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fechaAsignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fechaInicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcesoGradoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    estudianteId?: boolean;
    modalidad?: boolean;
    estado?: boolean;
    asesorId?: boolean;
    coordinadorId?: boolean;
    fechaAsignacion?: boolean;
    fechaInicio?: boolean;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
    investigacion?: boolean | Prisma.ProcesoGrado$investigacionArgs<ExtArgs>;
    diplomado?: boolean | Prisma.ProcesoGrado$diplomadoArgs<ExtArgs>;
    practica?: boolean | Prisma.ProcesoGrado$practicaArgs<ExtArgs>;
}, ExtArgs["result"]["procesoGrado"]>;
export type ProcesoGradoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    estudianteId?: boolean;
    modalidad?: boolean;
    estado?: boolean;
    asesorId?: boolean;
    coordinadorId?: boolean;
    fechaAsignacion?: boolean;
    fechaInicio?: boolean;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
}, ExtArgs["result"]["procesoGrado"]>;
export type ProcesoGradoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    estudianteId?: boolean;
    modalidad?: boolean;
    estado?: boolean;
    asesorId?: boolean;
    coordinadorId?: boolean;
    fechaAsignacion?: boolean;
    fechaInicio?: boolean;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
}, ExtArgs["result"]["procesoGrado"]>;
export type ProcesoGradoSelectScalar = {
    id?: boolean;
    estudianteId?: boolean;
    modalidad?: boolean;
    estado?: boolean;
    asesorId?: boolean;
    coordinadorId?: boolean;
    fechaAsignacion?: boolean;
    fechaInicio?: boolean;
};
export type ProcesoGradoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "estudianteId" | "modalidad" | "estado" | "asesorId" | "coordinadorId" | "fechaAsignacion" | "fechaInicio", ExtArgs["result"]["procesoGrado"]>;
export type ProcesoGradoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
    investigacion?: boolean | Prisma.ProcesoGrado$investigacionArgs<ExtArgs>;
    diplomado?: boolean | Prisma.ProcesoGrado$diplomadoArgs<ExtArgs>;
    practica?: boolean | Prisma.ProcesoGrado$practicaArgs<ExtArgs>;
};
export type ProcesoGradoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
};
export type ProcesoGradoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
    asesor?: boolean | Prisma.ProcesoGrado$asesorArgs<ExtArgs>;
    coordinador?: boolean | Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>;
};
export type $ProcesoGradoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProcesoGrado";
    objects: {
        estudiante: Prisma.$EstudiantePayload<ExtArgs>;
        asesor: Prisma.$DocentePayload<ExtArgs> | null;
        coordinador: Prisma.$CoordinadorPayload<ExtArgs> | null;
        investigacion: Prisma.$InvestigacionPayload<ExtArgs> | null;
        diplomado: Prisma.$DiplomadoPayload<ExtArgs> | null;
        practica: Prisma.$PracticaPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        estudianteId: string;
        modalidad: $Enums.Modalidad;
        estado: string;
        asesorId: string | null;
        coordinadorId: string | null;
        fechaAsignacion: Date | null;
        fechaInicio: Date;
    }, ExtArgs["result"]["procesoGrado"]>;
    composites: {};
};
export type ProcesoGradoGetPayload<S extends boolean | null | undefined | ProcesoGradoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload, S>;
export type ProcesoGradoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProcesoGradoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProcesoGradoCountAggregateInputType | true;
};
export interface ProcesoGradoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProcesoGrado'];
        meta: {
            name: 'ProcesoGrado';
        };
    };
    findUnique<T extends ProcesoGradoFindUniqueArgs>(args: Prisma.SelectSubset<T, ProcesoGradoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProcesoGradoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProcesoGradoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProcesoGradoFindFirstArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProcesoGradoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProcesoGradoFindManyArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProcesoGradoCreateArgs>(args: Prisma.SelectSubset<T, ProcesoGradoCreateArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProcesoGradoCreateManyArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProcesoGradoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProcesoGradoDeleteArgs>(args: Prisma.SelectSubset<T, ProcesoGradoDeleteArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProcesoGradoUpdateArgs>(args: Prisma.SelectSubset<T, ProcesoGradoUpdateArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProcesoGradoDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProcesoGradoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProcesoGradoUpdateManyArgs>(args: Prisma.SelectSubset<T, ProcesoGradoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProcesoGradoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProcesoGradoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProcesoGradoUpsertArgs>(args: Prisma.SelectSubset<T, ProcesoGradoUpsertArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProcesoGradoCountArgs>(args?: Prisma.Subset<T, ProcesoGradoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProcesoGradoCountAggregateOutputType> : number>;
    aggregate<T extends ProcesoGradoAggregateArgs>(args: Prisma.Subset<T, ProcesoGradoAggregateArgs>): Prisma.PrismaPromise<GetProcesoGradoAggregateType<T>>;
    groupBy<T extends ProcesoGradoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProcesoGradoGroupByArgs['orderBy'];
    } : {
        orderBy?: ProcesoGradoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProcesoGradoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcesoGradoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProcesoGradoFieldRefs;
}
export interface Prisma__ProcesoGradoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    estudiante<T extends Prisma.EstudianteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EstudianteDefaultArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    asesor<T extends Prisma.ProcesoGrado$asesorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGrado$asesorArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    coordinador<T extends Prisma.ProcesoGrado$coordinadorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGrado$coordinadorArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    investigacion<T extends Prisma.ProcesoGrado$investigacionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGrado$investigacionArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    diplomado<T extends Prisma.ProcesoGrado$diplomadoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGrado$diplomadoArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    practica<T extends Prisma.ProcesoGrado$practicaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGrado$practicaArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProcesoGradoFieldRefs {
    readonly id: Prisma.FieldRef<"ProcesoGrado", 'String'>;
    readonly estudianteId: Prisma.FieldRef<"ProcesoGrado", 'String'>;
    readonly modalidad: Prisma.FieldRef<"ProcesoGrado", 'Modalidad'>;
    readonly estado: Prisma.FieldRef<"ProcesoGrado", 'String'>;
    readonly asesorId: Prisma.FieldRef<"ProcesoGrado", 'String'>;
    readonly coordinadorId: Prisma.FieldRef<"ProcesoGrado", 'String'>;
    readonly fechaAsignacion: Prisma.FieldRef<"ProcesoGrado", 'DateTime'>;
    readonly fechaInicio: Prisma.FieldRef<"ProcesoGrado", 'DateTime'>;
}
export type ProcesoGradoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where?: Prisma.ProcesoGradoWhereInput;
    orderBy?: Prisma.ProcesoGradoOrderByWithRelationInput | Prisma.ProcesoGradoOrderByWithRelationInput[];
    cursor?: Prisma.ProcesoGradoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesoGradoScalarFieldEnum | Prisma.ProcesoGradoScalarFieldEnum[];
};
export type ProcesoGradoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where?: Prisma.ProcesoGradoWhereInput;
    orderBy?: Prisma.ProcesoGradoOrderByWithRelationInput | Prisma.ProcesoGradoOrderByWithRelationInput[];
    cursor?: Prisma.ProcesoGradoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesoGradoScalarFieldEnum | Prisma.ProcesoGradoScalarFieldEnum[];
};
export type ProcesoGradoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where?: Prisma.ProcesoGradoWhereInput;
    orderBy?: Prisma.ProcesoGradoOrderByWithRelationInput | Prisma.ProcesoGradoOrderByWithRelationInput[];
    cursor?: Prisma.ProcesoGradoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesoGradoScalarFieldEnum | Prisma.ProcesoGradoScalarFieldEnum[];
};
export type ProcesoGradoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcesoGradoCreateInput, Prisma.ProcesoGradoUncheckedCreateInput>;
};
export type ProcesoGradoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProcesoGradoCreateManyInput | Prisma.ProcesoGradoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProcesoGradoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    data: Prisma.ProcesoGradoCreateManyInput | Prisma.ProcesoGradoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProcesoGradoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProcesoGradoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateInput, Prisma.ProcesoGradoUncheckedUpdateInput>;
    where: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateManyMutationInput, Prisma.ProcesoGradoUncheckedUpdateManyInput>;
    where?: Prisma.ProcesoGradoWhereInput;
    limit?: number;
};
export type ProcesoGradoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcesoGradoUpdateManyMutationInput, Prisma.ProcesoGradoUncheckedUpdateManyInput>;
    where?: Prisma.ProcesoGradoWhereInput;
    limit?: number;
    include?: Prisma.ProcesoGradoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProcesoGradoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where: Prisma.ProcesoGradoWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcesoGradoCreateInput, Prisma.ProcesoGradoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProcesoGradoUpdateInput, Prisma.ProcesoGradoUncheckedUpdateInput>;
};
export type ProcesoGradoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where: Prisma.ProcesoGradoWhereUniqueInput;
};
export type ProcesoGradoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcesoGradoWhereInput;
    limit?: number;
};
export type ProcesoGrado$asesorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where?: Prisma.DocenteWhereInput;
};
export type ProcesoGrado$coordinadorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where?: Prisma.CoordinadorWhereInput;
};
export type ProcesoGrado$investigacionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where?: Prisma.InvestigacionWhereInput;
};
export type ProcesoGrado$diplomadoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where?: Prisma.DiplomadoWhereInput;
};
export type ProcesoGrado$practicaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where?: Prisma.PracticaWhereInput;
};
export type ProcesoGradoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
};
