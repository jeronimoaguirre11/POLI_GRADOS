import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostulacionModel = runtime.Types.Result.DefaultSelection<Prisma.$PostulacionPayload>;
export type AggregatePostulacion = {
    _count: PostulacionCountAggregateOutputType | null;
    _min: PostulacionMinAggregateOutputType | null;
    _max: PostulacionMaxAggregateOutputType | null;
};
export type PostulacionMinAggregateOutputType = {
    id: string | null;
    ofertaId: string | null;
    estudianteId: string | null;
    hojaVidaUrl: string | null;
    estado: string | null;
    observacionesEmpresa: string | null;
    fecha: Date | null;
    updatedAt: Date | null;
};
export type PostulacionMaxAggregateOutputType = {
    id: string | null;
    ofertaId: string | null;
    estudianteId: string | null;
    hojaVidaUrl: string | null;
    estado: string | null;
    observacionesEmpresa: string | null;
    fecha: Date | null;
    updatedAt: Date | null;
};
export type PostulacionCountAggregateOutputType = {
    id: number;
    ofertaId: number;
    estudianteId: number;
    hojaVidaUrl: number;
    estado: number;
    observacionesEmpresa: number;
    fecha: number;
    updatedAt: number;
    _all: number;
};
export type PostulacionMinAggregateInputType = {
    id?: true;
    ofertaId?: true;
    estudianteId?: true;
    hojaVidaUrl?: true;
    estado?: true;
    observacionesEmpresa?: true;
    fecha?: true;
    updatedAt?: true;
};
export type PostulacionMaxAggregateInputType = {
    id?: true;
    ofertaId?: true;
    estudianteId?: true;
    hojaVidaUrl?: true;
    estado?: true;
    observacionesEmpresa?: true;
    fecha?: true;
    updatedAt?: true;
};
export type PostulacionCountAggregateInputType = {
    id?: true;
    ofertaId?: true;
    estudianteId?: true;
    hojaVidaUrl?: true;
    estado?: true;
    observacionesEmpresa?: true;
    fecha?: true;
    updatedAt?: true;
    _all?: true;
};
export type PostulacionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostulacionWhereInput;
    orderBy?: Prisma.PostulacionOrderByWithRelationInput | Prisma.PostulacionOrderByWithRelationInput[];
    cursor?: Prisma.PostulacionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostulacionCountAggregateInputType;
    _min?: PostulacionMinAggregateInputType;
    _max?: PostulacionMaxAggregateInputType;
};
export type GetPostulacionAggregateType<T extends PostulacionAggregateArgs> = {
    [P in keyof T & keyof AggregatePostulacion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostulacion[P]> : Prisma.GetScalarType<T[P], AggregatePostulacion[P]>;
};
export type PostulacionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostulacionWhereInput;
    orderBy?: Prisma.PostulacionOrderByWithAggregationInput | Prisma.PostulacionOrderByWithAggregationInput[];
    by: Prisma.PostulacionScalarFieldEnum[] | Prisma.PostulacionScalarFieldEnum;
    having?: Prisma.PostulacionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostulacionCountAggregateInputType | true;
    _min?: PostulacionMinAggregateInputType;
    _max?: PostulacionMaxAggregateInputType;
};
export type PostulacionGroupByOutputType = {
    id: string;
    ofertaId: string;
    estudianteId: string;
    hojaVidaUrl: string;
    estado: string;
    observacionesEmpresa: string | null;
    fecha: Date;
    updatedAt: Date;
    _count: PostulacionCountAggregateOutputType | null;
    _min: PostulacionMinAggregateOutputType | null;
    _max: PostulacionMaxAggregateOutputType | null;
};
export type GetPostulacionGroupByPayload<T extends PostulacionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostulacionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostulacionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostulacionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostulacionGroupByOutputType[P]>;
}>>;
export type PostulacionWhereInput = {
    AND?: Prisma.PostulacionWhereInput | Prisma.PostulacionWhereInput[];
    OR?: Prisma.PostulacionWhereInput[];
    NOT?: Prisma.PostulacionWhereInput | Prisma.PostulacionWhereInput[];
    id?: Prisma.StringFilter<"Postulacion"> | string;
    ofertaId?: Prisma.StringFilter<"Postulacion"> | string;
    estudianteId?: Prisma.StringFilter<"Postulacion"> | string;
    hojaVidaUrl?: Prisma.StringFilter<"Postulacion"> | string;
    estado?: Prisma.StringFilter<"Postulacion"> | string;
    observacionesEmpresa?: Prisma.StringNullableFilter<"Postulacion"> | string | null;
    fecha?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
    oferta?: Prisma.XOR<Prisma.OfertaScalarRelationFilter, Prisma.OfertaWhereInput>;
    estudiante?: Prisma.XOR<Prisma.EstudianteScalarRelationFilter, Prisma.EstudianteWhereInput>;
};
export type PostulacionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    hojaVidaUrl?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    observacionesEmpresa?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    oferta?: Prisma.OfertaOrderByWithRelationInput;
    estudiante?: Prisma.EstudianteOrderByWithRelationInput;
};
export type PostulacionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    ofertaId_estudianteId?: Prisma.PostulacionOfertaIdEstudianteIdCompoundUniqueInput;
    AND?: Prisma.PostulacionWhereInput | Prisma.PostulacionWhereInput[];
    OR?: Prisma.PostulacionWhereInput[];
    NOT?: Prisma.PostulacionWhereInput | Prisma.PostulacionWhereInput[];
    ofertaId?: Prisma.StringFilter<"Postulacion"> | string;
    estudianteId?: Prisma.StringFilter<"Postulacion"> | string;
    hojaVidaUrl?: Prisma.StringFilter<"Postulacion"> | string;
    estado?: Prisma.StringFilter<"Postulacion"> | string;
    observacionesEmpresa?: Prisma.StringNullableFilter<"Postulacion"> | string | null;
    fecha?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
    oferta?: Prisma.XOR<Prisma.OfertaScalarRelationFilter, Prisma.OfertaWhereInput>;
    estudiante?: Prisma.XOR<Prisma.EstudianteScalarRelationFilter, Prisma.EstudianteWhereInput>;
}, "id" | "ofertaId_estudianteId">;
export type PostulacionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    hojaVidaUrl?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    observacionesEmpresa?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PostulacionCountOrderByAggregateInput;
    _max?: Prisma.PostulacionMaxOrderByAggregateInput;
    _min?: Prisma.PostulacionMinOrderByAggregateInput;
};
export type PostulacionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostulacionScalarWhereWithAggregatesInput | Prisma.PostulacionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostulacionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostulacionScalarWhereWithAggregatesInput | Prisma.PostulacionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Postulacion"> | string;
    ofertaId?: Prisma.StringWithAggregatesFilter<"Postulacion"> | string;
    estudianteId?: Prisma.StringWithAggregatesFilter<"Postulacion"> | string;
    hojaVidaUrl?: Prisma.StringWithAggregatesFilter<"Postulacion"> | string;
    estado?: Prisma.StringWithAggregatesFilter<"Postulacion"> | string;
    observacionesEmpresa?: Prisma.StringNullableWithAggregatesFilter<"Postulacion"> | string | null;
    fecha?: Prisma.DateTimeWithAggregatesFilter<"Postulacion"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Postulacion"> | Date | string;
};
export type PostulacionCreateInput = {
    id?: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
    oferta: Prisma.OfertaCreateNestedOneWithoutPostulacionesInput;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutPostulacionesInput;
};
export type PostulacionUncheckedCreateInput = {
    id?: string;
    ofertaId: string;
    estudianteId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oferta?: Prisma.OfertaUpdateOneRequiredWithoutPostulacionesNestedInput;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutPostulacionesNestedInput;
};
export type PostulacionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertaId?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionCreateManyInput = {
    id?: string;
    ofertaId: string;
    estudianteId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertaId?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionListRelationFilter = {
    every?: Prisma.PostulacionWhereInput;
    some?: Prisma.PostulacionWhereInput;
    none?: Prisma.PostulacionWhereInput;
};
export type PostulacionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostulacionOfertaIdEstudianteIdCompoundUniqueInput = {
    ofertaId: string;
    estudianteId: string;
};
export type PostulacionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    hojaVidaUrl?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    observacionesEmpresa?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PostulacionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    hojaVidaUrl?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    observacionesEmpresa?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PostulacionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estudianteId?: Prisma.SortOrder;
    hojaVidaUrl?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    observacionesEmpresa?: Prisma.SortOrder;
    fecha?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PostulacionCreateNestedManyWithoutEstudianteInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput> | Prisma.PostulacionCreateWithoutEstudianteInput[] | Prisma.PostulacionUncheckedCreateWithoutEstudianteInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutEstudianteInput | Prisma.PostulacionCreateOrConnectWithoutEstudianteInput[];
    createMany?: Prisma.PostulacionCreateManyEstudianteInputEnvelope;
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
};
export type PostulacionUncheckedCreateNestedManyWithoutEstudianteInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput> | Prisma.PostulacionCreateWithoutEstudianteInput[] | Prisma.PostulacionUncheckedCreateWithoutEstudianteInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutEstudianteInput | Prisma.PostulacionCreateOrConnectWithoutEstudianteInput[];
    createMany?: Prisma.PostulacionCreateManyEstudianteInputEnvelope;
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
};
export type PostulacionUpdateManyWithoutEstudianteNestedInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput> | Prisma.PostulacionCreateWithoutEstudianteInput[] | Prisma.PostulacionUncheckedCreateWithoutEstudianteInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutEstudianteInput | Prisma.PostulacionCreateOrConnectWithoutEstudianteInput[];
    upsert?: Prisma.PostulacionUpsertWithWhereUniqueWithoutEstudianteInput | Prisma.PostulacionUpsertWithWhereUniqueWithoutEstudianteInput[];
    createMany?: Prisma.PostulacionCreateManyEstudianteInputEnvelope;
    set?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    disconnect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    delete?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    update?: Prisma.PostulacionUpdateWithWhereUniqueWithoutEstudianteInput | Prisma.PostulacionUpdateWithWhereUniqueWithoutEstudianteInput[];
    updateMany?: Prisma.PostulacionUpdateManyWithWhereWithoutEstudianteInput | Prisma.PostulacionUpdateManyWithWhereWithoutEstudianteInput[];
    deleteMany?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
};
export type PostulacionUncheckedUpdateManyWithoutEstudianteNestedInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput> | Prisma.PostulacionCreateWithoutEstudianteInput[] | Prisma.PostulacionUncheckedCreateWithoutEstudianteInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutEstudianteInput | Prisma.PostulacionCreateOrConnectWithoutEstudianteInput[];
    upsert?: Prisma.PostulacionUpsertWithWhereUniqueWithoutEstudianteInput | Prisma.PostulacionUpsertWithWhereUniqueWithoutEstudianteInput[];
    createMany?: Prisma.PostulacionCreateManyEstudianteInputEnvelope;
    set?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    disconnect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    delete?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    update?: Prisma.PostulacionUpdateWithWhereUniqueWithoutEstudianteInput | Prisma.PostulacionUpdateWithWhereUniqueWithoutEstudianteInput[];
    updateMany?: Prisma.PostulacionUpdateManyWithWhereWithoutEstudianteInput | Prisma.PostulacionUpdateManyWithWhereWithoutEstudianteInput[];
    deleteMany?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
};
export type PostulacionCreateNestedManyWithoutOfertaInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput> | Prisma.PostulacionCreateWithoutOfertaInput[] | Prisma.PostulacionUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutOfertaInput | Prisma.PostulacionCreateOrConnectWithoutOfertaInput[];
    createMany?: Prisma.PostulacionCreateManyOfertaInputEnvelope;
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
};
export type PostulacionUncheckedCreateNestedManyWithoutOfertaInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput> | Prisma.PostulacionCreateWithoutOfertaInput[] | Prisma.PostulacionUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutOfertaInput | Prisma.PostulacionCreateOrConnectWithoutOfertaInput[];
    createMany?: Prisma.PostulacionCreateManyOfertaInputEnvelope;
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
};
export type PostulacionUpdateManyWithoutOfertaNestedInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput> | Prisma.PostulacionCreateWithoutOfertaInput[] | Prisma.PostulacionUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutOfertaInput | Prisma.PostulacionCreateOrConnectWithoutOfertaInput[];
    upsert?: Prisma.PostulacionUpsertWithWhereUniqueWithoutOfertaInput | Prisma.PostulacionUpsertWithWhereUniqueWithoutOfertaInput[];
    createMany?: Prisma.PostulacionCreateManyOfertaInputEnvelope;
    set?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    disconnect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    delete?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    update?: Prisma.PostulacionUpdateWithWhereUniqueWithoutOfertaInput | Prisma.PostulacionUpdateWithWhereUniqueWithoutOfertaInput[];
    updateMany?: Prisma.PostulacionUpdateManyWithWhereWithoutOfertaInput | Prisma.PostulacionUpdateManyWithWhereWithoutOfertaInput[];
    deleteMany?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
};
export type PostulacionUncheckedUpdateManyWithoutOfertaNestedInput = {
    create?: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput> | Prisma.PostulacionCreateWithoutOfertaInput[] | Prisma.PostulacionUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PostulacionCreateOrConnectWithoutOfertaInput | Prisma.PostulacionCreateOrConnectWithoutOfertaInput[];
    upsert?: Prisma.PostulacionUpsertWithWhereUniqueWithoutOfertaInput | Prisma.PostulacionUpsertWithWhereUniqueWithoutOfertaInput[];
    createMany?: Prisma.PostulacionCreateManyOfertaInputEnvelope;
    set?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    disconnect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    delete?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    connect?: Prisma.PostulacionWhereUniqueInput | Prisma.PostulacionWhereUniqueInput[];
    update?: Prisma.PostulacionUpdateWithWhereUniqueWithoutOfertaInput | Prisma.PostulacionUpdateWithWhereUniqueWithoutOfertaInput[];
    updateMany?: Prisma.PostulacionUpdateManyWithWhereWithoutOfertaInput | Prisma.PostulacionUpdateManyWithWhereWithoutOfertaInput[];
    deleteMany?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
};
export type PostulacionCreateWithoutEstudianteInput = {
    id?: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
    oferta: Prisma.OfertaCreateNestedOneWithoutPostulacionesInput;
};
export type PostulacionUncheckedCreateWithoutEstudianteInput = {
    id?: string;
    ofertaId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionCreateOrConnectWithoutEstudianteInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput>;
};
export type PostulacionCreateManyEstudianteInputEnvelope = {
    data: Prisma.PostulacionCreateManyEstudianteInput | Prisma.PostulacionCreateManyEstudianteInput[];
    skipDuplicates?: boolean;
};
export type PostulacionUpsertWithWhereUniqueWithoutEstudianteInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostulacionUpdateWithoutEstudianteInput, Prisma.PostulacionUncheckedUpdateWithoutEstudianteInput>;
    create: Prisma.XOR<Prisma.PostulacionCreateWithoutEstudianteInput, Prisma.PostulacionUncheckedCreateWithoutEstudianteInput>;
};
export type PostulacionUpdateWithWhereUniqueWithoutEstudianteInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostulacionUpdateWithoutEstudianteInput, Prisma.PostulacionUncheckedUpdateWithoutEstudianteInput>;
};
export type PostulacionUpdateManyWithWhereWithoutEstudianteInput = {
    where: Prisma.PostulacionScalarWhereInput;
    data: Prisma.XOR<Prisma.PostulacionUpdateManyMutationInput, Prisma.PostulacionUncheckedUpdateManyWithoutEstudianteInput>;
};
export type PostulacionScalarWhereInput = {
    AND?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
    OR?: Prisma.PostulacionScalarWhereInput[];
    NOT?: Prisma.PostulacionScalarWhereInput | Prisma.PostulacionScalarWhereInput[];
    id?: Prisma.StringFilter<"Postulacion"> | string;
    ofertaId?: Prisma.StringFilter<"Postulacion"> | string;
    estudianteId?: Prisma.StringFilter<"Postulacion"> | string;
    hojaVidaUrl?: Prisma.StringFilter<"Postulacion"> | string;
    estado?: Prisma.StringFilter<"Postulacion"> | string;
    observacionesEmpresa?: Prisma.StringNullableFilter<"Postulacion"> | string | null;
    fecha?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Postulacion"> | Date | string;
};
export type PostulacionCreateWithoutOfertaInput = {
    id?: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
    estudiante: Prisma.EstudianteCreateNestedOneWithoutPostulacionesInput;
};
export type PostulacionUncheckedCreateWithoutOfertaInput = {
    id?: string;
    estudianteId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionCreateOrConnectWithoutOfertaInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput>;
};
export type PostulacionCreateManyOfertaInputEnvelope = {
    data: Prisma.PostulacionCreateManyOfertaInput | Prisma.PostulacionCreateManyOfertaInput[];
    skipDuplicates?: boolean;
};
export type PostulacionUpsertWithWhereUniqueWithoutOfertaInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostulacionUpdateWithoutOfertaInput, Prisma.PostulacionUncheckedUpdateWithoutOfertaInput>;
    create: Prisma.XOR<Prisma.PostulacionCreateWithoutOfertaInput, Prisma.PostulacionUncheckedCreateWithoutOfertaInput>;
};
export type PostulacionUpdateWithWhereUniqueWithoutOfertaInput = {
    where: Prisma.PostulacionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostulacionUpdateWithoutOfertaInput, Prisma.PostulacionUncheckedUpdateWithoutOfertaInput>;
};
export type PostulacionUpdateManyWithWhereWithoutOfertaInput = {
    where: Prisma.PostulacionScalarWhereInput;
    data: Prisma.XOR<Prisma.PostulacionUpdateManyMutationInput, Prisma.PostulacionUncheckedUpdateManyWithoutOfertaInput>;
};
export type PostulacionCreateManyEstudianteInput = {
    id?: string;
    ofertaId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oferta?: Prisma.OfertaUpdateOneRequiredWithoutPostulacionesNestedInput;
};
export type PostulacionUncheckedUpdateWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertaId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionUncheckedUpdateManyWithoutEstudianteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertaId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionCreateManyOfertaInput = {
    id?: string;
    estudianteId: string;
    hojaVidaUrl: string;
    estado?: string;
    observacionesEmpresa?: string | null;
    fecha?: Date | string;
    updatedAt?: Date | string;
};
export type PostulacionUpdateWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    estudiante?: Prisma.EstudianteUpdateOneRequiredWithoutPostulacionesNestedInput;
};
export type PostulacionUncheckedUpdateWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionUncheckedUpdateManyWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    estudianteId?: Prisma.StringFieldUpdateOperationsInput | string;
    hojaVidaUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    observacionesEmpresa?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostulacionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ofertaId?: boolean;
    estudianteId?: boolean;
    hojaVidaUrl?: boolean;
    estado?: boolean;
    observacionesEmpresa?: boolean;
    fecha?: boolean;
    updatedAt?: boolean;
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postulacion"]>;
export type PostulacionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ofertaId?: boolean;
    estudianteId?: boolean;
    hojaVidaUrl?: boolean;
    estado?: boolean;
    observacionesEmpresa?: boolean;
    fecha?: boolean;
    updatedAt?: boolean;
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postulacion"]>;
export type PostulacionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ofertaId?: boolean;
    estudianteId?: boolean;
    hojaVidaUrl?: boolean;
    estado?: boolean;
    observacionesEmpresa?: boolean;
    fecha?: boolean;
    updatedAt?: boolean;
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postulacion"]>;
export type PostulacionSelectScalar = {
    id?: boolean;
    ofertaId?: boolean;
    estudianteId?: boolean;
    hojaVidaUrl?: boolean;
    estado?: boolean;
    observacionesEmpresa?: boolean;
    fecha?: boolean;
    updatedAt?: boolean;
};
export type PostulacionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ofertaId" | "estudianteId" | "hojaVidaUrl" | "estado" | "observacionesEmpresa" | "fecha" | "updatedAt", ExtArgs["result"]["postulacion"]>;
export type PostulacionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
};
export type PostulacionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
};
export type PostulacionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oferta?: boolean | Prisma.OfertaDefaultArgs<ExtArgs>;
    estudiante?: boolean | Prisma.EstudianteDefaultArgs<ExtArgs>;
};
export type $PostulacionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Postulacion";
    objects: {
        oferta: Prisma.$OfertaPayload<ExtArgs>;
        estudiante: Prisma.$EstudiantePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        ofertaId: string;
        estudianteId: string;
        hojaVidaUrl: string;
        estado: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["postulacion"]>;
    composites: {};
};
export type PostulacionGetPayload<S extends boolean | null | undefined | PostulacionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostulacionPayload, S>;
export type PostulacionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostulacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostulacionCountAggregateInputType | true;
};
export interface PostulacionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Postulacion'];
        meta: {
            name: 'Postulacion';
        };
    };
    findUnique<T extends PostulacionFindUniqueArgs>(args: Prisma.SelectSubset<T, PostulacionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostulacionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostulacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostulacionFindFirstArgs>(args?: Prisma.SelectSubset<T, PostulacionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostulacionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostulacionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostulacionFindManyArgs>(args?: Prisma.SelectSubset<T, PostulacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostulacionCreateArgs>(args: Prisma.SelectSubset<T, PostulacionCreateArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostulacionCreateManyArgs>(args?: Prisma.SelectSubset<T, PostulacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostulacionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostulacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostulacionDeleteArgs>(args: Prisma.SelectSubset<T, PostulacionDeleteArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostulacionUpdateArgs>(args: Prisma.SelectSubset<T, PostulacionUpdateArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostulacionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostulacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostulacionUpdateManyArgs>(args: Prisma.SelectSubset<T, PostulacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostulacionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostulacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostulacionUpsertArgs>(args: Prisma.SelectSubset<T, PostulacionUpsertArgs<ExtArgs>>): Prisma.Prisma__PostulacionClient<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostulacionCountArgs>(args?: Prisma.Subset<T, PostulacionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostulacionCountAggregateOutputType> : number>;
    aggregate<T extends PostulacionAggregateArgs>(args: Prisma.Subset<T, PostulacionAggregateArgs>): Prisma.PrismaPromise<GetPostulacionAggregateType<T>>;
    groupBy<T extends PostulacionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostulacionGroupByArgs['orderBy'];
    } : {
        orderBy?: PostulacionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostulacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostulacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostulacionFieldRefs;
}
export interface Prisma__PostulacionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    oferta<T extends Prisma.OfertaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfertaDefaultArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    estudiante<T extends Prisma.EstudianteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EstudianteDefaultArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostulacionFieldRefs {
    readonly id: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly ofertaId: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly estudianteId: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly hojaVidaUrl: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly estado: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly observacionesEmpresa: Prisma.FieldRef<"Postulacion", 'String'>;
    readonly fecha: Prisma.FieldRef<"Postulacion", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Postulacion", 'DateTime'>;
}
export type PostulacionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where: Prisma.PostulacionWhereUniqueInput;
};
export type PostulacionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where: Prisma.PostulacionWhereUniqueInput;
};
export type PostulacionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where?: Prisma.PostulacionWhereInput;
    orderBy?: Prisma.PostulacionOrderByWithRelationInput | Prisma.PostulacionOrderByWithRelationInput[];
    cursor?: Prisma.PostulacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostulacionScalarFieldEnum | Prisma.PostulacionScalarFieldEnum[];
};
export type PostulacionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where?: Prisma.PostulacionWhereInput;
    orderBy?: Prisma.PostulacionOrderByWithRelationInput | Prisma.PostulacionOrderByWithRelationInput[];
    cursor?: Prisma.PostulacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostulacionScalarFieldEnum | Prisma.PostulacionScalarFieldEnum[];
};
export type PostulacionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where?: Prisma.PostulacionWhereInput;
    orderBy?: Prisma.PostulacionOrderByWithRelationInput | Prisma.PostulacionOrderByWithRelationInput[];
    cursor?: Prisma.PostulacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostulacionScalarFieldEnum | Prisma.PostulacionScalarFieldEnum[];
};
export type PostulacionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostulacionCreateInput, Prisma.PostulacionUncheckedCreateInput>;
};
export type PostulacionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostulacionCreateManyInput | Prisma.PostulacionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostulacionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    data: Prisma.PostulacionCreateManyInput | Prisma.PostulacionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostulacionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostulacionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostulacionUpdateInput, Prisma.PostulacionUncheckedUpdateInput>;
    where: Prisma.PostulacionWhereUniqueInput;
};
export type PostulacionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostulacionUpdateManyMutationInput, Prisma.PostulacionUncheckedUpdateManyInput>;
    where?: Prisma.PostulacionWhereInput;
    limit?: number;
};
export type PostulacionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostulacionUpdateManyMutationInput, Prisma.PostulacionUncheckedUpdateManyInput>;
    where?: Prisma.PostulacionWhereInput;
    limit?: number;
    include?: Prisma.PostulacionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostulacionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where: Prisma.PostulacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostulacionCreateInput, Prisma.PostulacionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostulacionUpdateInput, Prisma.PostulacionUncheckedUpdateInput>;
};
export type PostulacionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
    where: Prisma.PostulacionWhereUniqueInput;
};
export type PostulacionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostulacionWhereInput;
    limit?: number;
};
export type PostulacionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostulacionSelect<ExtArgs> | null;
    omit?: Prisma.PostulacionOmit<ExtArgs> | null;
    include?: Prisma.PostulacionInclude<ExtArgs> | null;
};
