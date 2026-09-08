import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PracticaModel = runtime.Types.Result.DefaultSelection<Prisma.$PracticaPayload>;
export type AggregatePractica = {
    _count: PracticaCountAggregateOutputType | null;
    _avg: PracticaAvgAggregateOutputType | null;
    _sum: PracticaSumAggregateOutputType | null;
    _min: PracticaMinAggregateOutputType | null;
    _max: PracticaMaxAggregateOutputType | null;
};
export type PracticaAvgAggregateOutputType = {
    horasCompletadas: number | null;
};
export type PracticaSumAggregateOutputType = {
    horasCompletadas: number | null;
};
export type PracticaMinAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    tipo: $Enums.TipoPractica | null;
    horasCompletadas: number | null;
    ofertaId: string | null;
    estadoReporte: string | null;
};
export type PracticaMaxAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    tipo: $Enums.TipoPractica | null;
    horasCompletadas: number | null;
    ofertaId: string | null;
    estadoReporte: string | null;
};
export type PracticaCountAggregateOutputType = {
    id: number;
    procesoGradoId: number;
    tipo: number;
    horasCompletadas: number;
    ofertaId: number;
    estadoReporte: number;
    _all: number;
};
export type PracticaAvgAggregateInputType = {
    horasCompletadas?: true;
};
export type PracticaSumAggregateInputType = {
    horasCompletadas?: true;
};
export type PracticaMinAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    tipo?: true;
    horasCompletadas?: true;
    ofertaId?: true;
    estadoReporte?: true;
};
export type PracticaMaxAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    tipo?: true;
    horasCompletadas?: true;
    ofertaId?: true;
    estadoReporte?: true;
};
export type PracticaCountAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    tipo?: true;
    horasCompletadas?: true;
    ofertaId?: true;
    estadoReporte?: true;
    _all?: true;
};
export type PracticaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PracticaWhereInput;
    orderBy?: Prisma.PracticaOrderByWithRelationInput | Prisma.PracticaOrderByWithRelationInput[];
    cursor?: Prisma.PracticaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PracticaCountAggregateInputType;
    _avg?: PracticaAvgAggregateInputType;
    _sum?: PracticaSumAggregateInputType;
    _min?: PracticaMinAggregateInputType;
    _max?: PracticaMaxAggregateInputType;
};
export type GetPracticaAggregateType<T extends PracticaAggregateArgs> = {
    [P in keyof T & keyof AggregatePractica]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePractica[P]> : Prisma.GetScalarType<T[P], AggregatePractica[P]>;
};
export type PracticaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PracticaWhereInput;
    orderBy?: Prisma.PracticaOrderByWithAggregationInput | Prisma.PracticaOrderByWithAggregationInput[];
    by: Prisma.PracticaScalarFieldEnum[] | Prisma.PracticaScalarFieldEnum;
    having?: Prisma.PracticaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PracticaCountAggregateInputType | true;
    _avg?: PracticaAvgAggregateInputType;
    _sum?: PracticaSumAggregateInputType;
    _min?: PracticaMinAggregateInputType;
    _max?: PracticaMaxAggregateInputType;
};
export type PracticaGroupByOutputType = {
    id: string;
    procesoGradoId: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas: number;
    ofertaId: string | null;
    estadoReporte: string;
    _count: PracticaCountAggregateOutputType | null;
    _avg: PracticaAvgAggregateOutputType | null;
    _sum: PracticaSumAggregateOutputType | null;
    _min: PracticaMinAggregateOutputType | null;
    _max: PracticaMaxAggregateOutputType | null;
};
export type GetPracticaGroupByPayload<T extends PracticaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PracticaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PracticaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PracticaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PracticaGroupByOutputType[P]>;
}>>;
export type PracticaWhereInput = {
    AND?: Prisma.PracticaWhereInput | Prisma.PracticaWhereInput[];
    OR?: Prisma.PracticaWhereInput[];
    NOT?: Prisma.PracticaWhereInput | Prisma.PracticaWhereInput[];
    id?: Prisma.StringFilter<"Practica"> | string;
    procesoGradoId?: Prisma.StringFilter<"Practica"> | string;
    tipo?: Prisma.EnumTipoPracticaFilter<"Practica"> | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFilter<"Practica"> | number;
    ofertaId?: Prisma.StringNullableFilter<"Practica"> | string | null;
    estadoReporte?: Prisma.StringFilter<"Practica"> | string;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
    oferta?: Prisma.XOR<Prisma.OfertaNullableScalarRelationFilter, Prisma.OfertaWhereInput> | null;
};
export type PracticaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    horasCompletadas?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    estadoReporte?: Prisma.SortOrder;
    procesoGrado?: Prisma.ProcesoGradoOrderByWithRelationInput;
    oferta?: Prisma.OfertaOrderByWithRelationInput;
};
export type PracticaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    procesoGradoId?: string;
    AND?: Prisma.PracticaWhereInput | Prisma.PracticaWhereInput[];
    OR?: Prisma.PracticaWhereInput[];
    NOT?: Prisma.PracticaWhereInput | Prisma.PracticaWhereInput[];
    tipo?: Prisma.EnumTipoPracticaFilter<"Practica"> | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFilter<"Practica"> | number;
    ofertaId?: Prisma.StringNullableFilter<"Practica"> | string | null;
    estadoReporte?: Prisma.StringFilter<"Practica"> | string;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
    oferta?: Prisma.XOR<Prisma.OfertaNullableScalarRelationFilter, Prisma.OfertaWhereInput> | null;
}, "id" | "procesoGradoId">;
export type PracticaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    horasCompletadas?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrderInput | Prisma.SortOrder;
    estadoReporte?: Prisma.SortOrder;
    _count?: Prisma.PracticaCountOrderByAggregateInput;
    _avg?: Prisma.PracticaAvgOrderByAggregateInput;
    _max?: Prisma.PracticaMaxOrderByAggregateInput;
    _min?: Prisma.PracticaMinOrderByAggregateInput;
    _sum?: Prisma.PracticaSumOrderByAggregateInput;
};
export type PracticaScalarWhereWithAggregatesInput = {
    AND?: Prisma.PracticaScalarWhereWithAggregatesInput | Prisma.PracticaScalarWhereWithAggregatesInput[];
    OR?: Prisma.PracticaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PracticaScalarWhereWithAggregatesInput | Prisma.PracticaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Practica"> | string;
    procesoGradoId?: Prisma.StringWithAggregatesFilter<"Practica"> | string;
    tipo?: Prisma.EnumTipoPracticaWithAggregatesFilter<"Practica"> | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntWithAggregatesFilter<"Practica"> | number;
    ofertaId?: Prisma.StringNullableWithAggregatesFilter<"Practica"> | string | null;
    estadoReporte?: Prisma.StringWithAggregatesFilter<"Practica"> | string;
};
export type PracticaCreateInput = {
    id?: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    estadoReporte?: string;
    procesoGrado: Prisma.ProcesoGradoCreateNestedOneWithoutPracticaInput;
    oferta?: Prisma.OfertaCreateNestedOneWithoutPracticasInput;
};
export type PracticaUncheckedCreateInput = {
    id?: string;
    procesoGradoId: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    ofertaId?: string | null;
    estadoReporte?: string;
};
export type PracticaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneRequiredWithoutPracticaNestedInput;
    oferta?: Prisma.OfertaUpdateOneWithoutPracticasNestedInput;
};
export type PracticaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    ofertaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaCreateManyInput = {
    id?: string;
    procesoGradoId: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    ofertaId?: string | null;
    estadoReporte?: string;
};
export type PracticaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    ofertaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaNullableScalarRelationFilter = {
    is?: Prisma.PracticaWhereInput | null;
    isNot?: Prisma.PracticaWhereInput | null;
};
export type PracticaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    horasCompletadas?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estadoReporte?: Prisma.SortOrder;
};
export type PracticaAvgOrderByAggregateInput = {
    horasCompletadas?: Prisma.SortOrder;
};
export type PracticaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    horasCompletadas?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estadoReporte?: Prisma.SortOrder;
};
export type PracticaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    horasCompletadas?: Prisma.SortOrder;
    ofertaId?: Prisma.SortOrder;
    estadoReporte?: Prisma.SortOrder;
};
export type PracticaSumOrderByAggregateInput = {
    horasCompletadas?: Prisma.SortOrder;
};
export type PracticaListRelationFilter = {
    every?: Prisma.PracticaWhereInput;
    some?: Prisma.PracticaWhereInput;
    none?: Prisma.PracticaWhereInput;
};
export type PracticaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PracticaCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.PracticaWhereUniqueInput;
};
export type PracticaUncheckedCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.PracticaWhereUniqueInput;
};
export type PracticaUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.PracticaUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.PracticaWhereInput | boolean;
    delete?: Prisma.PracticaWhereInput | boolean;
    connect?: Prisma.PracticaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PracticaUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.PracticaUpdateWithoutProcesoGradoInput>, Prisma.PracticaUncheckedUpdateWithoutProcesoGradoInput>;
};
export type PracticaUncheckedUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.PracticaUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.PracticaWhereInput | boolean;
    delete?: Prisma.PracticaWhereInput | boolean;
    connect?: Prisma.PracticaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PracticaUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.PracticaUpdateWithoutProcesoGradoInput>, Prisma.PracticaUncheckedUpdateWithoutProcesoGradoInput>;
};
export type EnumTipoPracticaFieldUpdateOperationsInput = {
    set?: $Enums.TipoPractica;
};
export type PracticaCreateNestedManyWithoutOfertaInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput> | Prisma.PracticaCreateWithoutOfertaInput[] | Prisma.PracticaUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutOfertaInput | Prisma.PracticaCreateOrConnectWithoutOfertaInput[];
    createMany?: Prisma.PracticaCreateManyOfertaInputEnvelope;
    connect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
};
export type PracticaUncheckedCreateNestedManyWithoutOfertaInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput> | Prisma.PracticaCreateWithoutOfertaInput[] | Prisma.PracticaUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutOfertaInput | Prisma.PracticaCreateOrConnectWithoutOfertaInput[];
    createMany?: Prisma.PracticaCreateManyOfertaInputEnvelope;
    connect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
};
export type PracticaUpdateManyWithoutOfertaNestedInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput> | Prisma.PracticaCreateWithoutOfertaInput[] | Prisma.PracticaUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutOfertaInput | Prisma.PracticaCreateOrConnectWithoutOfertaInput[];
    upsert?: Prisma.PracticaUpsertWithWhereUniqueWithoutOfertaInput | Prisma.PracticaUpsertWithWhereUniqueWithoutOfertaInput[];
    createMany?: Prisma.PracticaCreateManyOfertaInputEnvelope;
    set?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    disconnect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    delete?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    connect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    update?: Prisma.PracticaUpdateWithWhereUniqueWithoutOfertaInput | Prisma.PracticaUpdateWithWhereUniqueWithoutOfertaInput[];
    updateMany?: Prisma.PracticaUpdateManyWithWhereWithoutOfertaInput | Prisma.PracticaUpdateManyWithWhereWithoutOfertaInput[];
    deleteMany?: Prisma.PracticaScalarWhereInput | Prisma.PracticaScalarWhereInput[];
};
export type PracticaUncheckedUpdateManyWithoutOfertaNestedInput = {
    create?: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput> | Prisma.PracticaCreateWithoutOfertaInput[] | Prisma.PracticaUncheckedCreateWithoutOfertaInput[];
    connectOrCreate?: Prisma.PracticaCreateOrConnectWithoutOfertaInput | Prisma.PracticaCreateOrConnectWithoutOfertaInput[];
    upsert?: Prisma.PracticaUpsertWithWhereUniqueWithoutOfertaInput | Prisma.PracticaUpsertWithWhereUniqueWithoutOfertaInput[];
    createMany?: Prisma.PracticaCreateManyOfertaInputEnvelope;
    set?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    disconnect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    delete?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    connect?: Prisma.PracticaWhereUniqueInput | Prisma.PracticaWhereUniqueInput[];
    update?: Prisma.PracticaUpdateWithWhereUniqueWithoutOfertaInput | Prisma.PracticaUpdateWithWhereUniqueWithoutOfertaInput[];
    updateMany?: Prisma.PracticaUpdateManyWithWhereWithoutOfertaInput | Prisma.PracticaUpdateManyWithWhereWithoutOfertaInput[];
    deleteMany?: Prisma.PracticaScalarWhereInput | Prisma.PracticaScalarWhereInput[];
};
export type PracticaCreateWithoutProcesoGradoInput = {
    id?: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    estadoReporte?: string;
    oferta?: Prisma.OfertaCreateNestedOneWithoutPracticasInput;
};
export type PracticaUncheckedCreateWithoutProcesoGradoInput = {
    id?: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    ofertaId?: string | null;
    estadoReporte?: string;
};
export type PracticaCreateOrConnectWithoutProcesoGradoInput = {
    where: Prisma.PracticaWhereUniqueInput;
    create: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
};
export type PracticaUpsertWithoutProcesoGradoInput = {
    update: Prisma.XOR<Prisma.PracticaUpdateWithoutProcesoGradoInput, Prisma.PracticaUncheckedUpdateWithoutProcesoGradoInput>;
    create: Prisma.XOR<Prisma.PracticaCreateWithoutProcesoGradoInput, Prisma.PracticaUncheckedCreateWithoutProcesoGradoInput>;
    where?: Prisma.PracticaWhereInput;
};
export type PracticaUpdateToOneWithWhereWithoutProcesoGradoInput = {
    where?: Prisma.PracticaWhereInput;
    data: Prisma.XOR<Prisma.PracticaUpdateWithoutProcesoGradoInput, Prisma.PracticaUncheckedUpdateWithoutProcesoGradoInput>;
};
export type PracticaUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
    oferta?: Prisma.OfertaUpdateOneWithoutPracticasNestedInput;
};
export type PracticaUncheckedUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    ofertaId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaCreateWithoutOfertaInput = {
    id?: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    estadoReporte?: string;
    procesoGrado: Prisma.ProcesoGradoCreateNestedOneWithoutPracticaInput;
};
export type PracticaUncheckedCreateWithoutOfertaInput = {
    id?: string;
    procesoGradoId: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    estadoReporte?: string;
};
export type PracticaCreateOrConnectWithoutOfertaInput = {
    where: Prisma.PracticaWhereUniqueInput;
    create: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput>;
};
export type PracticaCreateManyOfertaInputEnvelope = {
    data: Prisma.PracticaCreateManyOfertaInput | Prisma.PracticaCreateManyOfertaInput[];
    skipDuplicates?: boolean;
};
export type PracticaUpsertWithWhereUniqueWithoutOfertaInput = {
    where: Prisma.PracticaWhereUniqueInput;
    update: Prisma.XOR<Prisma.PracticaUpdateWithoutOfertaInput, Prisma.PracticaUncheckedUpdateWithoutOfertaInput>;
    create: Prisma.XOR<Prisma.PracticaCreateWithoutOfertaInput, Prisma.PracticaUncheckedCreateWithoutOfertaInput>;
};
export type PracticaUpdateWithWhereUniqueWithoutOfertaInput = {
    where: Prisma.PracticaWhereUniqueInput;
    data: Prisma.XOR<Prisma.PracticaUpdateWithoutOfertaInput, Prisma.PracticaUncheckedUpdateWithoutOfertaInput>;
};
export type PracticaUpdateManyWithWhereWithoutOfertaInput = {
    where: Prisma.PracticaScalarWhereInput;
    data: Prisma.XOR<Prisma.PracticaUpdateManyMutationInput, Prisma.PracticaUncheckedUpdateManyWithoutOfertaInput>;
};
export type PracticaScalarWhereInput = {
    AND?: Prisma.PracticaScalarWhereInput | Prisma.PracticaScalarWhereInput[];
    OR?: Prisma.PracticaScalarWhereInput[];
    NOT?: Prisma.PracticaScalarWhereInput | Prisma.PracticaScalarWhereInput[];
    id?: Prisma.StringFilter<"Practica"> | string;
    procesoGradoId?: Prisma.StringFilter<"Practica"> | string;
    tipo?: Prisma.EnumTipoPracticaFilter<"Practica"> | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFilter<"Practica"> | number;
    ofertaId?: Prisma.StringNullableFilter<"Practica"> | string | null;
    estadoReporte?: Prisma.StringFilter<"Practica"> | string;
};
export type PracticaCreateManyOfertaInput = {
    id?: string;
    procesoGradoId: string;
    tipo: $Enums.TipoPractica;
    horasCompletadas?: number;
    estadoReporte?: string;
};
export type PracticaUpdateWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneRequiredWithoutPracticaNestedInput;
};
export type PracticaUncheckedUpdateWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaUncheckedUpdateManyWithoutOfertaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoPracticaFieldUpdateOperationsInput | $Enums.TipoPractica;
    horasCompletadas?: Prisma.IntFieldUpdateOperationsInput | number;
    estadoReporte?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PracticaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    tipo?: boolean;
    horasCompletadas?: boolean;
    ofertaId?: boolean;
    estadoReporte?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
}, ExtArgs["result"]["practica"]>;
export type PracticaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    tipo?: boolean;
    horasCompletadas?: boolean;
    ofertaId?: boolean;
    estadoReporte?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
}, ExtArgs["result"]["practica"]>;
export type PracticaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    tipo?: boolean;
    horasCompletadas?: boolean;
    ofertaId?: boolean;
    estadoReporte?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
}, ExtArgs["result"]["practica"]>;
export type PracticaSelectScalar = {
    id?: boolean;
    procesoGradoId?: boolean;
    tipo?: boolean;
    horasCompletadas?: boolean;
    ofertaId?: boolean;
    estadoReporte?: boolean;
};
export type PracticaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "procesoGradoId" | "tipo" | "horasCompletadas" | "ofertaId" | "estadoReporte", ExtArgs["result"]["practica"]>;
export type PracticaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
};
export type PracticaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
};
export type PracticaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
    oferta?: boolean | Prisma.Practica$ofertaArgs<ExtArgs>;
};
export type $PracticaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Practica";
    objects: {
        procesoGrado: Prisma.$ProcesoGradoPayload<ExtArgs>;
        oferta: Prisma.$OfertaPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        procesoGradoId: string;
        tipo: $Enums.TipoPractica;
        horasCompletadas: number;
        ofertaId: string | null;
        estadoReporte: string;
    }, ExtArgs["result"]["practica"]>;
    composites: {};
};
export type PracticaGetPayload<S extends boolean | null | undefined | PracticaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PracticaPayload, S>;
export type PracticaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PracticaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PracticaCountAggregateInputType | true;
};
export interface PracticaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Practica'];
        meta: {
            name: 'Practica';
        };
    };
    findUnique<T extends PracticaFindUniqueArgs>(args: Prisma.SelectSubset<T, PracticaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PracticaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PracticaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PracticaFindFirstArgs>(args?: Prisma.SelectSubset<T, PracticaFindFirstArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PracticaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PracticaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PracticaFindManyArgs>(args?: Prisma.SelectSubset<T, PracticaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PracticaCreateArgs>(args: Prisma.SelectSubset<T, PracticaCreateArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PracticaCreateManyArgs>(args?: Prisma.SelectSubset<T, PracticaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PracticaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PracticaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PracticaDeleteArgs>(args: Prisma.SelectSubset<T, PracticaDeleteArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PracticaUpdateArgs>(args: Prisma.SelectSubset<T, PracticaUpdateArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PracticaDeleteManyArgs>(args?: Prisma.SelectSubset<T, PracticaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PracticaUpdateManyArgs>(args: Prisma.SelectSubset<T, PracticaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PracticaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PracticaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PracticaUpsertArgs>(args: Prisma.SelectSubset<T, PracticaUpsertArgs<ExtArgs>>): Prisma.Prisma__PracticaClient<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PracticaCountArgs>(args?: Prisma.Subset<T, PracticaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PracticaCountAggregateOutputType> : number>;
    aggregate<T extends PracticaAggregateArgs>(args: Prisma.Subset<T, PracticaAggregateArgs>): Prisma.PrismaPromise<GetPracticaAggregateType<T>>;
    groupBy<T extends PracticaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PracticaGroupByArgs['orderBy'];
    } : {
        orderBy?: PracticaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PracticaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPracticaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PracticaFieldRefs;
}
export interface Prisma__PracticaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesoGrado<T extends Prisma.ProcesoGradoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGradoDefaultArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    oferta<T extends Prisma.Practica$ofertaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Practica$ofertaArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PracticaFieldRefs {
    readonly id: Prisma.FieldRef<"Practica", 'String'>;
    readonly procesoGradoId: Prisma.FieldRef<"Practica", 'String'>;
    readonly tipo: Prisma.FieldRef<"Practica", 'TipoPractica'>;
    readonly horasCompletadas: Prisma.FieldRef<"Practica", 'Int'>;
    readonly ofertaId: Prisma.FieldRef<"Practica", 'String'>;
    readonly estadoReporte: Prisma.FieldRef<"Practica", 'String'>;
}
export type PracticaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where: Prisma.PracticaWhereUniqueInput;
};
export type PracticaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where: Prisma.PracticaWhereUniqueInput;
};
export type PracticaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where?: Prisma.PracticaWhereInput;
    orderBy?: Prisma.PracticaOrderByWithRelationInput | Prisma.PracticaOrderByWithRelationInput[];
    cursor?: Prisma.PracticaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PracticaScalarFieldEnum | Prisma.PracticaScalarFieldEnum[];
};
export type PracticaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where?: Prisma.PracticaWhereInput;
    orderBy?: Prisma.PracticaOrderByWithRelationInput | Prisma.PracticaOrderByWithRelationInput[];
    cursor?: Prisma.PracticaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PracticaScalarFieldEnum | Prisma.PracticaScalarFieldEnum[];
};
export type PracticaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where?: Prisma.PracticaWhereInput;
    orderBy?: Prisma.PracticaOrderByWithRelationInput | Prisma.PracticaOrderByWithRelationInput[];
    cursor?: Prisma.PracticaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PracticaScalarFieldEnum | Prisma.PracticaScalarFieldEnum[];
};
export type PracticaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PracticaCreateInput, Prisma.PracticaUncheckedCreateInput>;
};
export type PracticaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PracticaCreateManyInput | Prisma.PracticaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PracticaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    data: Prisma.PracticaCreateManyInput | Prisma.PracticaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PracticaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PracticaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PracticaUpdateInput, Prisma.PracticaUncheckedUpdateInput>;
    where: Prisma.PracticaWhereUniqueInput;
};
export type PracticaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PracticaUpdateManyMutationInput, Prisma.PracticaUncheckedUpdateManyInput>;
    where?: Prisma.PracticaWhereInput;
    limit?: number;
};
export type PracticaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PracticaUpdateManyMutationInput, Prisma.PracticaUncheckedUpdateManyInput>;
    where?: Prisma.PracticaWhereInput;
    limit?: number;
    include?: Prisma.PracticaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PracticaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where: Prisma.PracticaWhereUniqueInput;
    create: Prisma.XOR<Prisma.PracticaCreateInput, Prisma.PracticaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PracticaUpdateInput, Prisma.PracticaUncheckedUpdateInput>;
};
export type PracticaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
    where: Prisma.PracticaWhereUniqueInput;
};
export type PracticaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PracticaWhereInput;
    limit?: number;
};
export type Practica$ofertaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where?: Prisma.OfertaWhereInput;
};
export type PracticaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PracticaSelect<ExtArgs> | null;
    omit?: Prisma.PracticaOmit<ExtArgs> | null;
    include?: Prisma.PracticaInclude<ExtArgs> | null;
};
