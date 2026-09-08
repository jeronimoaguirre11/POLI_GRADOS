import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OfertaModel = runtime.Types.Result.DefaultSelection<Prisma.$OfertaPayload>;
export type AggregateOferta = {
    _count: OfertaCountAggregateOutputType | null;
    _min: OfertaMinAggregateOutputType | null;
    _max: OfertaMaxAggregateOutputType | null;
};
export type OfertaMinAggregateOutputType = {
    id: string | null;
    empresaId: string | null;
    titulo: string | null;
    descripcion: string | null;
    perfilBuscado: string | null;
    estado: string | null;
    fechaPublicacion: Date | null;
};
export type OfertaMaxAggregateOutputType = {
    id: string | null;
    empresaId: string | null;
    titulo: string | null;
    descripcion: string | null;
    perfilBuscado: string | null;
    estado: string | null;
    fechaPublicacion: Date | null;
};
export type OfertaCountAggregateOutputType = {
    id: number;
    empresaId: number;
    titulo: number;
    descripcion: number;
    perfilBuscado: number;
    estado: number;
    fechaPublicacion: number;
    _all: number;
};
export type OfertaMinAggregateInputType = {
    id?: true;
    empresaId?: true;
    titulo?: true;
    descripcion?: true;
    perfilBuscado?: true;
    estado?: true;
    fechaPublicacion?: true;
};
export type OfertaMaxAggregateInputType = {
    id?: true;
    empresaId?: true;
    titulo?: true;
    descripcion?: true;
    perfilBuscado?: true;
    estado?: true;
    fechaPublicacion?: true;
};
export type OfertaCountAggregateInputType = {
    id?: true;
    empresaId?: true;
    titulo?: true;
    descripcion?: true;
    perfilBuscado?: true;
    estado?: true;
    fechaPublicacion?: true;
    _all?: true;
};
export type OfertaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfertaWhereInput;
    orderBy?: Prisma.OfertaOrderByWithRelationInput | Prisma.OfertaOrderByWithRelationInput[];
    cursor?: Prisma.OfertaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OfertaCountAggregateInputType;
    _min?: OfertaMinAggregateInputType;
    _max?: OfertaMaxAggregateInputType;
};
export type GetOfertaAggregateType<T extends OfertaAggregateArgs> = {
    [P in keyof T & keyof AggregateOferta]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOferta[P]> : Prisma.GetScalarType<T[P], AggregateOferta[P]>;
};
export type OfertaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfertaWhereInput;
    orderBy?: Prisma.OfertaOrderByWithAggregationInput | Prisma.OfertaOrderByWithAggregationInput[];
    by: Prisma.OfertaScalarFieldEnum[] | Prisma.OfertaScalarFieldEnum;
    having?: Prisma.OfertaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OfertaCountAggregateInputType | true;
    _min?: OfertaMinAggregateInputType;
    _max?: OfertaMaxAggregateInputType;
};
export type OfertaGroupByOutputType = {
    id: string;
    empresaId: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado: string;
    fechaPublicacion: Date;
    _count: OfertaCountAggregateOutputType | null;
    _min: OfertaMinAggregateOutputType | null;
    _max: OfertaMaxAggregateOutputType | null;
};
export type GetOfertaGroupByPayload<T extends OfertaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OfertaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OfertaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OfertaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OfertaGroupByOutputType[P]>;
}>>;
export type OfertaWhereInput = {
    AND?: Prisma.OfertaWhereInput | Prisma.OfertaWhereInput[];
    OR?: Prisma.OfertaWhereInput[];
    NOT?: Prisma.OfertaWhereInput | Prisma.OfertaWhereInput[];
    id?: Prisma.StringFilter<"Oferta"> | string;
    empresaId?: Prisma.StringFilter<"Oferta"> | string;
    titulo?: Prisma.StringFilter<"Oferta"> | string;
    descripcion?: Prisma.StringFilter<"Oferta"> | string;
    perfilBuscado?: Prisma.StringFilter<"Oferta"> | string;
    estado?: Prisma.StringFilter<"Oferta"> | string;
    fechaPublicacion?: Prisma.DateTimeFilter<"Oferta"> | Date | string;
    empresa?: Prisma.XOR<Prisma.EmpresaScalarRelationFilter, Prisma.EmpresaWhereInput>;
    postulaciones?: Prisma.PostulacionListRelationFilter;
    practicas?: Prisma.PracticaListRelationFilter;
};
export type OfertaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    perfilBuscado?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fechaPublicacion?: Prisma.SortOrder;
    empresa?: Prisma.EmpresaOrderByWithRelationInput;
    postulaciones?: Prisma.PostulacionOrderByRelationAggregateInput;
    practicas?: Prisma.PracticaOrderByRelationAggregateInput;
};
export type OfertaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OfertaWhereInput | Prisma.OfertaWhereInput[];
    OR?: Prisma.OfertaWhereInput[];
    NOT?: Prisma.OfertaWhereInput | Prisma.OfertaWhereInput[];
    empresaId?: Prisma.StringFilter<"Oferta"> | string;
    titulo?: Prisma.StringFilter<"Oferta"> | string;
    descripcion?: Prisma.StringFilter<"Oferta"> | string;
    perfilBuscado?: Prisma.StringFilter<"Oferta"> | string;
    estado?: Prisma.StringFilter<"Oferta"> | string;
    fechaPublicacion?: Prisma.DateTimeFilter<"Oferta"> | Date | string;
    empresa?: Prisma.XOR<Prisma.EmpresaScalarRelationFilter, Prisma.EmpresaWhereInput>;
    postulaciones?: Prisma.PostulacionListRelationFilter;
    practicas?: Prisma.PracticaListRelationFilter;
}, "id">;
export type OfertaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    perfilBuscado?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fechaPublicacion?: Prisma.SortOrder;
    _count?: Prisma.OfertaCountOrderByAggregateInput;
    _max?: Prisma.OfertaMaxOrderByAggregateInput;
    _min?: Prisma.OfertaMinOrderByAggregateInput;
};
export type OfertaScalarWhereWithAggregatesInput = {
    AND?: Prisma.OfertaScalarWhereWithAggregatesInput | Prisma.OfertaScalarWhereWithAggregatesInput[];
    OR?: Prisma.OfertaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OfertaScalarWhereWithAggregatesInput | Prisma.OfertaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    empresaId?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    titulo?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    descripcion?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    perfilBuscado?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    estado?: Prisma.StringWithAggregatesFilter<"Oferta"> | string;
    fechaPublicacion?: Prisma.DateTimeWithAggregatesFilter<"Oferta"> | Date | string;
};
export type OfertaCreateInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    empresa: Prisma.EmpresaCreateNestedOneWithoutOfertasInput;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutOfertaInput;
    practicas?: Prisma.PracticaCreateNestedManyWithoutOfertaInput;
};
export type OfertaUncheckedCreateInput = {
    id?: string;
    empresaId: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutOfertaInput;
    practicas?: Prisma.PracticaUncheckedCreateNestedManyWithoutOfertaInput;
};
export type OfertaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUpdateOneRequiredWithoutOfertasNestedInput;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutOfertaNestedInput;
    practicas?: Prisma.PracticaUpdateManyWithoutOfertaNestedInput;
};
export type OfertaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutOfertaNestedInput;
    practicas?: Prisma.PracticaUncheckedUpdateManyWithoutOfertaNestedInput;
};
export type OfertaCreateManyInput = {
    id?: string;
    empresaId: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
};
export type OfertaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OfertaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OfertaListRelationFilter = {
    every?: Prisma.OfertaWhereInput;
    some?: Prisma.OfertaWhereInput;
    none?: Prisma.OfertaWhereInput;
};
export type OfertaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OfertaNullableScalarRelationFilter = {
    is?: Prisma.OfertaWhereInput | null;
    isNot?: Prisma.OfertaWhereInput | null;
};
export type OfertaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    perfilBuscado?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fechaPublicacion?: Prisma.SortOrder;
};
export type OfertaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    perfilBuscado?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fechaPublicacion?: Prisma.SortOrder;
};
export type OfertaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    titulo?: Prisma.SortOrder;
    descripcion?: Prisma.SortOrder;
    perfilBuscado?: Prisma.SortOrder;
    estado?: Prisma.SortOrder;
    fechaPublicacion?: Prisma.SortOrder;
};
export type OfertaScalarRelationFilter = {
    is?: Prisma.OfertaWhereInput;
    isNot?: Prisma.OfertaWhereInput;
};
export type OfertaCreateNestedManyWithoutEmpresaInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput> | Prisma.OfertaCreateWithoutEmpresaInput[] | Prisma.OfertaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutEmpresaInput | Prisma.OfertaCreateOrConnectWithoutEmpresaInput[];
    createMany?: Prisma.OfertaCreateManyEmpresaInputEnvelope;
    connect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
};
export type OfertaUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput> | Prisma.OfertaCreateWithoutEmpresaInput[] | Prisma.OfertaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutEmpresaInput | Prisma.OfertaCreateOrConnectWithoutEmpresaInput[];
    createMany?: Prisma.OfertaCreateManyEmpresaInputEnvelope;
    connect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
};
export type OfertaUpdateManyWithoutEmpresaNestedInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput> | Prisma.OfertaCreateWithoutEmpresaInput[] | Prisma.OfertaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutEmpresaInput | Prisma.OfertaCreateOrConnectWithoutEmpresaInput[];
    upsert?: Prisma.OfertaUpsertWithWhereUniqueWithoutEmpresaInput | Prisma.OfertaUpsertWithWhereUniqueWithoutEmpresaInput[];
    createMany?: Prisma.OfertaCreateManyEmpresaInputEnvelope;
    set?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    disconnect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    delete?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    connect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    update?: Prisma.OfertaUpdateWithWhereUniqueWithoutEmpresaInput | Prisma.OfertaUpdateWithWhereUniqueWithoutEmpresaInput[];
    updateMany?: Prisma.OfertaUpdateManyWithWhereWithoutEmpresaInput | Prisma.OfertaUpdateManyWithWhereWithoutEmpresaInput[];
    deleteMany?: Prisma.OfertaScalarWhereInput | Prisma.OfertaScalarWhereInput[];
};
export type OfertaUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput> | Prisma.OfertaCreateWithoutEmpresaInput[] | Prisma.OfertaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutEmpresaInput | Prisma.OfertaCreateOrConnectWithoutEmpresaInput[];
    upsert?: Prisma.OfertaUpsertWithWhereUniqueWithoutEmpresaInput | Prisma.OfertaUpsertWithWhereUniqueWithoutEmpresaInput[];
    createMany?: Prisma.OfertaCreateManyEmpresaInputEnvelope;
    set?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    disconnect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    delete?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    connect?: Prisma.OfertaWhereUniqueInput | Prisma.OfertaWhereUniqueInput[];
    update?: Prisma.OfertaUpdateWithWhereUniqueWithoutEmpresaInput | Prisma.OfertaUpdateWithWhereUniqueWithoutEmpresaInput[];
    updateMany?: Prisma.OfertaUpdateManyWithWhereWithoutEmpresaInput | Prisma.OfertaUpdateManyWithWhereWithoutEmpresaInput[];
    deleteMany?: Prisma.OfertaScalarWhereInput | Prisma.OfertaScalarWhereInput[];
};
export type OfertaCreateNestedOneWithoutPracticasInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutPracticasInput, Prisma.OfertaUncheckedCreateWithoutPracticasInput>;
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutPracticasInput;
    connect?: Prisma.OfertaWhereUniqueInput;
};
export type OfertaUpdateOneWithoutPracticasNestedInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutPracticasInput, Prisma.OfertaUncheckedCreateWithoutPracticasInput>;
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutPracticasInput;
    upsert?: Prisma.OfertaUpsertWithoutPracticasInput;
    disconnect?: Prisma.OfertaWhereInput | boolean;
    delete?: Prisma.OfertaWhereInput | boolean;
    connect?: Prisma.OfertaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OfertaUpdateToOneWithWhereWithoutPracticasInput, Prisma.OfertaUpdateWithoutPracticasInput>, Prisma.OfertaUncheckedUpdateWithoutPracticasInput>;
};
export type OfertaCreateNestedOneWithoutPostulacionesInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutPostulacionesInput, Prisma.OfertaUncheckedCreateWithoutPostulacionesInput>;
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutPostulacionesInput;
    connect?: Prisma.OfertaWhereUniqueInput;
};
export type OfertaUpdateOneRequiredWithoutPostulacionesNestedInput = {
    create?: Prisma.XOR<Prisma.OfertaCreateWithoutPostulacionesInput, Prisma.OfertaUncheckedCreateWithoutPostulacionesInput>;
    connectOrCreate?: Prisma.OfertaCreateOrConnectWithoutPostulacionesInput;
    upsert?: Prisma.OfertaUpsertWithoutPostulacionesInput;
    connect?: Prisma.OfertaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OfertaUpdateToOneWithWhereWithoutPostulacionesInput, Prisma.OfertaUpdateWithoutPostulacionesInput>, Prisma.OfertaUncheckedUpdateWithoutPostulacionesInput>;
};
export type OfertaCreateWithoutEmpresaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutOfertaInput;
    practicas?: Prisma.PracticaCreateNestedManyWithoutOfertaInput;
};
export type OfertaUncheckedCreateWithoutEmpresaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutOfertaInput;
    practicas?: Prisma.PracticaUncheckedCreateNestedManyWithoutOfertaInput;
};
export type OfertaCreateOrConnectWithoutEmpresaInput = {
    where: Prisma.OfertaWhereUniqueInput;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput>;
};
export type OfertaCreateManyEmpresaInputEnvelope = {
    data: Prisma.OfertaCreateManyEmpresaInput | Prisma.OfertaCreateManyEmpresaInput[];
    skipDuplicates?: boolean;
};
export type OfertaUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: Prisma.OfertaWhereUniqueInput;
    update: Prisma.XOR<Prisma.OfertaUpdateWithoutEmpresaInput, Prisma.OfertaUncheckedUpdateWithoutEmpresaInput>;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutEmpresaInput, Prisma.OfertaUncheckedCreateWithoutEmpresaInput>;
};
export type OfertaUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: Prisma.OfertaWhereUniqueInput;
    data: Prisma.XOR<Prisma.OfertaUpdateWithoutEmpresaInput, Prisma.OfertaUncheckedUpdateWithoutEmpresaInput>;
};
export type OfertaUpdateManyWithWhereWithoutEmpresaInput = {
    where: Prisma.OfertaScalarWhereInput;
    data: Prisma.XOR<Prisma.OfertaUpdateManyMutationInput, Prisma.OfertaUncheckedUpdateManyWithoutEmpresaInput>;
};
export type OfertaScalarWhereInput = {
    AND?: Prisma.OfertaScalarWhereInput | Prisma.OfertaScalarWhereInput[];
    OR?: Prisma.OfertaScalarWhereInput[];
    NOT?: Prisma.OfertaScalarWhereInput | Prisma.OfertaScalarWhereInput[];
    id?: Prisma.StringFilter<"Oferta"> | string;
    empresaId?: Prisma.StringFilter<"Oferta"> | string;
    titulo?: Prisma.StringFilter<"Oferta"> | string;
    descripcion?: Prisma.StringFilter<"Oferta"> | string;
    perfilBuscado?: Prisma.StringFilter<"Oferta"> | string;
    estado?: Prisma.StringFilter<"Oferta"> | string;
    fechaPublicacion?: Prisma.DateTimeFilter<"Oferta"> | Date | string;
};
export type OfertaCreateWithoutPracticasInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    empresa: Prisma.EmpresaCreateNestedOneWithoutOfertasInput;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutOfertaInput;
};
export type OfertaUncheckedCreateWithoutPracticasInput = {
    id?: string;
    empresaId: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutOfertaInput;
};
export type OfertaCreateOrConnectWithoutPracticasInput = {
    where: Prisma.OfertaWhereUniqueInput;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutPracticasInput, Prisma.OfertaUncheckedCreateWithoutPracticasInput>;
};
export type OfertaUpsertWithoutPracticasInput = {
    update: Prisma.XOR<Prisma.OfertaUpdateWithoutPracticasInput, Prisma.OfertaUncheckedUpdateWithoutPracticasInput>;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutPracticasInput, Prisma.OfertaUncheckedCreateWithoutPracticasInput>;
    where?: Prisma.OfertaWhereInput;
};
export type OfertaUpdateToOneWithWhereWithoutPracticasInput = {
    where?: Prisma.OfertaWhereInput;
    data: Prisma.XOR<Prisma.OfertaUpdateWithoutPracticasInput, Prisma.OfertaUncheckedUpdateWithoutPracticasInput>;
};
export type OfertaUpdateWithoutPracticasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUpdateOneRequiredWithoutOfertasNestedInput;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutOfertaNestedInput;
};
export type OfertaUncheckedUpdateWithoutPracticasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutOfertaNestedInput;
};
export type OfertaCreateWithoutPostulacionesInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    empresa: Prisma.EmpresaCreateNestedOneWithoutOfertasInput;
    practicas?: Prisma.PracticaCreateNestedManyWithoutOfertaInput;
};
export type OfertaUncheckedCreateWithoutPostulacionesInput = {
    id?: string;
    empresaId: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
    practicas?: Prisma.PracticaUncheckedCreateNestedManyWithoutOfertaInput;
};
export type OfertaCreateOrConnectWithoutPostulacionesInput = {
    where: Prisma.OfertaWhereUniqueInput;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutPostulacionesInput, Prisma.OfertaUncheckedCreateWithoutPostulacionesInput>;
};
export type OfertaUpsertWithoutPostulacionesInput = {
    update: Prisma.XOR<Prisma.OfertaUpdateWithoutPostulacionesInput, Prisma.OfertaUncheckedUpdateWithoutPostulacionesInput>;
    create: Prisma.XOR<Prisma.OfertaCreateWithoutPostulacionesInput, Prisma.OfertaUncheckedCreateWithoutPostulacionesInput>;
    where?: Prisma.OfertaWhereInput;
};
export type OfertaUpdateToOneWithWhereWithoutPostulacionesInput = {
    where?: Prisma.OfertaWhereInput;
    data: Prisma.XOR<Prisma.OfertaUpdateWithoutPostulacionesInput, Prisma.OfertaUncheckedUpdateWithoutPostulacionesInput>;
};
export type OfertaUpdateWithoutPostulacionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUpdateOneRequiredWithoutOfertasNestedInput;
    practicas?: Prisma.PracticaUpdateManyWithoutOfertaNestedInput;
};
export type OfertaUncheckedUpdateWithoutPostulacionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    practicas?: Prisma.PracticaUncheckedUpdateManyWithoutOfertaNestedInput;
};
export type OfertaCreateManyEmpresaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    perfilBuscado: string;
    estado?: string;
    fechaPublicacion?: Date | string;
};
export type OfertaUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutOfertaNestedInput;
    practicas?: Prisma.PracticaUpdateManyWithoutOfertaNestedInput;
};
export type OfertaUncheckedUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutOfertaNestedInput;
    practicas?: Prisma.PracticaUncheckedUpdateManyWithoutOfertaNestedInput;
};
export type OfertaUncheckedUpdateManyWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titulo?: Prisma.StringFieldUpdateOperationsInput | string;
    descripcion?: Prisma.StringFieldUpdateOperationsInput | string;
    perfilBuscado?: Prisma.StringFieldUpdateOperationsInput | string;
    estado?: Prisma.StringFieldUpdateOperationsInput | string;
    fechaPublicacion?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OfertaCountOutputType = {
    postulaciones: number;
    practicas: number;
};
export type OfertaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    postulaciones?: boolean | OfertaCountOutputTypeCountPostulacionesArgs;
    practicas?: boolean | OfertaCountOutputTypeCountPracticasArgs;
};
export type OfertaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaCountOutputTypeSelect<ExtArgs> | null;
};
export type OfertaCountOutputTypeCountPostulacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostulacionWhereInput;
};
export type OfertaCountOutputTypeCountPracticasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PracticaWhereInput;
};
export type OfertaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    empresaId?: boolean;
    titulo?: boolean;
    descripcion?: boolean;
    perfilBuscado?: boolean;
    estado?: boolean;
    fechaPublicacion?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
    postulaciones?: boolean | Prisma.Oferta$postulacionesArgs<ExtArgs>;
    practicas?: boolean | Prisma.Oferta$practicasArgs<ExtArgs>;
    _count?: boolean | Prisma.OfertaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oferta"]>;
export type OfertaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    empresaId?: boolean;
    titulo?: boolean;
    descripcion?: boolean;
    perfilBuscado?: boolean;
    estado?: boolean;
    fechaPublicacion?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oferta"]>;
export type OfertaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    empresaId?: boolean;
    titulo?: boolean;
    descripcion?: boolean;
    perfilBuscado?: boolean;
    estado?: boolean;
    fechaPublicacion?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oferta"]>;
export type OfertaSelectScalar = {
    id?: boolean;
    empresaId?: boolean;
    titulo?: boolean;
    descripcion?: boolean;
    perfilBuscado?: boolean;
    estado?: boolean;
    fechaPublicacion?: boolean;
};
export type OfertaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "empresaId" | "titulo" | "descripcion" | "perfilBuscado" | "estado" | "fechaPublicacion", ExtArgs["result"]["oferta"]>;
export type OfertaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
    postulaciones?: boolean | Prisma.Oferta$postulacionesArgs<ExtArgs>;
    practicas?: boolean | Prisma.Oferta$practicasArgs<ExtArgs>;
    _count?: boolean | Prisma.OfertaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OfertaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
};
export type OfertaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
};
export type $OfertaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Oferta";
    objects: {
        empresa: Prisma.$EmpresaPayload<ExtArgs>;
        postulaciones: Prisma.$PostulacionPayload<ExtArgs>[];
        practicas: Prisma.$PracticaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        empresaId: string;
        titulo: string;
        descripcion: string;
        perfilBuscado: string;
        estado: string;
        fechaPublicacion: Date;
    }, ExtArgs["result"]["oferta"]>;
    composites: {};
};
export type OfertaGetPayload<S extends boolean | null | undefined | OfertaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OfertaPayload, S>;
export type OfertaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OfertaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OfertaCountAggregateInputType | true;
};
export interface OfertaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Oferta'];
        meta: {
            name: 'Oferta';
        };
    };
    findUnique<T extends OfertaFindUniqueArgs>(args: Prisma.SelectSubset<T, OfertaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OfertaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OfertaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OfertaFindFirstArgs>(args?: Prisma.SelectSubset<T, OfertaFindFirstArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OfertaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OfertaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OfertaFindManyArgs>(args?: Prisma.SelectSubset<T, OfertaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OfertaCreateArgs>(args: Prisma.SelectSubset<T, OfertaCreateArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OfertaCreateManyArgs>(args?: Prisma.SelectSubset<T, OfertaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OfertaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OfertaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OfertaDeleteArgs>(args: Prisma.SelectSubset<T, OfertaDeleteArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OfertaUpdateArgs>(args: Prisma.SelectSubset<T, OfertaUpdateArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OfertaDeleteManyArgs>(args?: Prisma.SelectSubset<T, OfertaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OfertaUpdateManyArgs>(args: Prisma.SelectSubset<T, OfertaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OfertaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OfertaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OfertaUpsertArgs>(args: Prisma.SelectSubset<T, OfertaUpsertArgs<ExtArgs>>): Prisma.Prisma__OfertaClient<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OfertaCountArgs>(args?: Prisma.Subset<T, OfertaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OfertaCountAggregateOutputType> : number>;
    aggregate<T extends OfertaAggregateArgs>(args: Prisma.Subset<T, OfertaAggregateArgs>): Prisma.PrismaPromise<GetOfertaAggregateType<T>>;
    groupBy<T extends OfertaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OfertaGroupByArgs['orderBy'];
    } : {
        orderBy?: OfertaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OfertaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfertaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OfertaFieldRefs;
}
export interface Prisma__OfertaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    empresa<T extends Prisma.EmpresaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmpresaDefaultArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    postulaciones<T extends Prisma.Oferta$postulacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Oferta$postulacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    practicas<T extends Prisma.Oferta$practicasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Oferta$practicasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PracticaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OfertaFieldRefs {
    readonly id: Prisma.FieldRef<"Oferta", 'String'>;
    readonly empresaId: Prisma.FieldRef<"Oferta", 'String'>;
    readonly titulo: Prisma.FieldRef<"Oferta", 'String'>;
    readonly descripcion: Prisma.FieldRef<"Oferta", 'String'>;
    readonly perfilBuscado: Prisma.FieldRef<"Oferta", 'String'>;
    readonly estado: Prisma.FieldRef<"Oferta", 'String'>;
    readonly fechaPublicacion: Prisma.FieldRef<"Oferta", 'DateTime'>;
}
export type OfertaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where: Prisma.OfertaWhereUniqueInput;
};
export type OfertaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where: Prisma.OfertaWhereUniqueInput;
};
export type OfertaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where?: Prisma.OfertaWhereInput;
    orderBy?: Prisma.OfertaOrderByWithRelationInput | Prisma.OfertaOrderByWithRelationInput[];
    cursor?: Prisma.OfertaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OfertaScalarFieldEnum | Prisma.OfertaScalarFieldEnum[];
};
export type OfertaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where?: Prisma.OfertaWhereInput;
    orderBy?: Prisma.OfertaOrderByWithRelationInput | Prisma.OfertaOrderByWithRelationInput[];
    cursor?: Prisma.OfertaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OfertaScalarFieldEnum | Prisma.OfertaScalarFieldEnum[];
};
export type OfertaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where?: Prisma.OfertaWhereInput;
    orderBy?: Prisma.OfertaOrderByWithRelationInput | Prisma.OfertaOrderByWithRelationInput[];
    cursor?: Prisma.OfertaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OfertaScalarFieldEnum | Prisma.OfertaScalarFieldEnum[];
};
export type OfertaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OfertaCreateInput, Prisma.OfertaUncheckedCreateInput>;
};
export type OfertaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OfertaCreateManyInput | Prisma.OfertaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OfertaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    data: Prisma.OfertaCreateManyInput | Prisma.OfertaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OfertaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OfertaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OfertaUpdateInput, Prisma.OfertaUncheckedUpdateInput>;
    where: Prisma.OfertaWhereUniqueInput;
};
export type OfertaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OfertaUpdateManyMutationInput, Prisma.OfertaUncheckedUpdateManyInput>;
    where?: Prisma.OfertaWhereInput;
    limit?: number;
};
export type OfertaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OfertaUpdateManyMutationInput, Prisma.OfertaUncheckedUpdateManyInput>;
    where?: Prisma.OfertaWhereInput;
    limit?: number;
    include?: Prisma.OfertaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OfertaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where: Prisma.OfertaWhereUniqueInput;
    create: Prisma.XOR<Prisma.OfertaCreateInput, Prisma.OfertaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OfertaUpdateInput, Prisma.OfertaUncheckedUpdateInput>;
};
export type OfertaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
    where: Prisma.OfertaWhereUniqueInput;
};
export type OfertaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfertaWhereInput;
    limit?: number;
};
export type Oferta$postulacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Oferta$practicasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OfertaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfertaSelect<ExtArgs> | null;
    omit?: Prisma.OfertaOmit<ExtArgs> | null;
    include?: Prisma.OfertaInclude<ExtArgs> | null;
};
