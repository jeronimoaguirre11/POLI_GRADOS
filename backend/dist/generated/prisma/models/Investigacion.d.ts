import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InvestigacionModel = runtime.Types.Result.DefaultSelection<Prisma.$InvestigacionPayload>;
export type AggregateInvestigacion = {
    _count: InvestigacionCountAggregateOutputType | null;
    _min: InvestigacionMinAggregateOutputType | null;
    _max: InvestigacionMaxAggregateOutputType | null;
};
export type InvestigacionMinAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    grupoInvestigacion: string | null;
    ideaPropuesta: string | null;
    materiaMatriculada: boolean | null;
};
export type InvestigacionMaxAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    grupoInvestigacion: string | null;
    ideaPropuesta: string | null;
    materiaMatriculada: boolean | null;
};
export type InvestigacionCountAggregateOutputType = {
    id: number;
    procesoGradoId: number;
    grupoInvestigacion: number;
    ideaPropuesta: number;
    materiaMatriculada: number;
    _all: number;
};
export type InvestigacionMinAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    grupoInvestigacion?: true;
    ideaPropuesta?: true;
    materiaMatriculada?: true;
};
export type InvestigacionMaxAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    grupoInvestigacion?: true;
    ideaPropuesta?: true;
    materiaMatriculada?: true;
};
export type InvestigacionCountAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    grupoInvestigacion?: true;
    ideaPropuesta?: true;
    materiaMatriculada?: true;
    _all?: true;
};
export type InvestigacionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvestigacionWhereInput;
    orderBy?: Prisma.InvestigacionOrderByWithRelationInput | Prisma.InvestigacionOrderByWithRelationInput[];
    cursor?: Prisma.InvestigacionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvestigacionCountAggregateInputType;
    _min?: InvestigacionMinAggregateInputType;
    _max?: InvestigacionMaxAggregateInputType;
};
export type GetInvestigacionAggregateType<T extends InvestigacionAggregateArgs> = {
    [P in keyof T & keyof AggregateInvestigacion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvestigacion[P]> : Prisma.GetScalarType<T[P], AggregateInvestigacion[P]>;
};
export type InvestigacionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvestigacionWhereInput;
    orderBy?: Prisma.InvestigacionOrderByWithAggregationInput | Prisma.InvestigacionOrderByWithAggregationInput[];
    by: Prisma.InvestigacionScalarFieldEnum[] | Prisma.InvestigacionScalarFieldEnum;
    having?: Prisma.InvestigacionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvestigacionCountAggregateInputType | true;
    _min?: InvestigacionMinAggregateInputType;
    _max?: InvestigacionMaxAggregateInputType;
};
export type InvestigacionGroupByOutputType = {
    id: string;
    procesoGradoId: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada: boolean;
    _count: InvestigacionCountAggregateOutputType | null;
    _min: InvestigacionMinAggregateOutputType | null;
    _max: InvestigacionMaxAggregateOutputType | null;
};
export type GetInvestigacionGroupByPayload<T extends InvestigacionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvestigacionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvestigacionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvestigacionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvestigacionGroupByOutputType[P]>;
}>>;
export type InvestigacionWhereInput = {
    AND?: Prisma.InvestigacionWhereInput | Prisma.InvestigacionWhereInput[];
    OR?: Prisma.InvestigacionWhereInput[];
    NOT?: Prisma.InvestigacionWhereInput | Prisma.InvestigacionWhereInput[];
    id?: Prisma.StringFilter<"Investigacion"> | string;
    procesoGradoId?: Prisma.StringFilter<"Investigacion"> | string;
    grupoInvestigacion?: Prisma.StringFilter<"Investigacion"> | string;
    ideaPropuesta?: Prisma.StringFilter<"Investigacion"> | string;
    materiaMatriculada?: Prisma.BoolFilter<"Investigacion"> | boolean;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
};
export type InvestigacionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    grupoInvestigacion?: Prisma.SortOrder;
    ideaPropuesta?: Prisma.SortOrder;
    materiaMatriculada?: Prisma.SortOrder;
    procesoGrado?: Prisma.ProcesoGradoOrderByWithRelationInput;
};
export type InvestigacionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    procesoGradoId?: string;
    AND?: Prisma.InvestigacionWhereInput | Prisma.InvestigacionWhereInput[];
    OR?: Prisma.InvestigacionWhereInput[];
    NOT?: Prisma.InvestigacionWhereInput | Prisma.InvestigacionWhereInput[];
    grupoInvestigacion?: Prisma.StringFilter<"Investigacion"> | string;
    ideaPropuesta?: Prisma.StringFilter<"Investigacion"> | string;
    materiaMatriculada?: Prisma.BoolFilter<"Investigacion"> | boolean;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
}, "id" | "procesoGradoId">;
export type InvestigacionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    grupoInvestigacion?: Prisma.SortOrder;
    ideaPropuesta?: Prisma.SortOrder;
    materiaMatriculada?: Prisma.SortOrder;
    _count?: Prisma.InvestigacionCountOrderByAggregateInput;
    _max?: Prisma.InvestigacionMaxOrderByAggregateInput;
    _min?: Prisma.InvestigacionMinOrderByAggregateInput;
};
export type InvestigacionScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvestigacionScalarWhereWithAggregatesInput | Prisma.InvestigacionScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvestigacionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvestigacionScalarWhereWithAggregatesInput | Prisma.InvestigacionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Investigacion"> | string;
    procesoGradoId?: Prisma.StringWithAggregatesFilter<"Investigacion"> | string;
    grupoInvestigacion?: Prisma.StringWithAggregatesFilter<"Investigacion"> | string;
    ideaPropuesta?: Prisma.StringWithAggregatesFilter<"Investigacion"> | string;
    materiaMatriculada?: Prisma.BoolWithAggregatesFilter<"Investigacion"> | boolean;
};
export type InvestigacionCreateInput = {
    id?: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada?: boolean;
    procesoGrado: Prisma.ProcesoGradoCreateNestedOneWithoutInvestigacionInput;
};
export type InvestigacionUncheckedCreateInput = {
    id?: string;
    procesoGradoId: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada?: boolean;
};
export type InvestigacionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneRequiredWithoutInvestigacionNestedInput;
};
export type InvestigacionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InvestigacionCreateManyInput = {
    id?: string;
    procesoGradoId: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada?: boolean;
};
export type InvestigacionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InvestigacionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InvestigacionNullableScalarRelationFilter = {
    is?: Prisma.InvestigacionWhereInput | null;
    isNot?: Prisma.InvestigacionWhereInput | null;
};
export type InvestigacionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    grupoInvestigacion?: Prisma.SortOrder;
    ideaPropuesta?: Prisma.SortOrder;
    materiaMatriculada?: Prisma.SortOrder;
};
export type InvestigacionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    grupoInvestigacion?: Prisma.SortOrder;
    ideaPropuesta?: Prisma.SortOrder;
    materiaMatriculada?: Prisma.SortOrder;
};
export type InvestigacionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    grupoInvestigacion?: Prisma.SortOrder;
    ideaPropuesta?: Prisma.SortOrder;
    materiaMatriculada?: Prisma.SortOrder;
};
export type InvestigacionCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.InvestigacionCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionUncheckedCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.InvestigacionCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.InvestigacionCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.InvestigacionUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.InvestigacionWhereInput | boolean;
    delete?: Prisma.InvestigacionWhereInput | boolean;
    connect?: Prisma.InvestigacionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvestigacionUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.InvestigacionUpdateWithoutProcesoGradoInput>, Prisma.InvestigacionUncheckedUpdateWithoutProcesoGradoInput>;
};
export type InvestigacionUncheckedUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.InvestigacionCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.InvestigacionUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.InvestigacionWhereInput | boolean;
    delete?: Prisma.InvestigacionWhereInput | boolean;
    connect?: Prisma.InvestigacionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvestigacionUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.InvestigacionUpdateWithoutProcesoGradoInput>, Prisma.InvestigacionUncheckedUpdateWithoutProcesoGradoInput>;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type InvestigacionCreateWithoutProcesoGradoInput = {
    id?: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada?: boolean;
};
export type InvestigacionUncheckedCreateWithoutProcesoGradoInput = {
    id?: string;
    grupoInvestigacion: string;
    ideaPropuesta: string;
    materiaMatriculada?: boolean;
};
export type InvestigacionCreateOrConnectWithoutProcesoGradoInput = {
    where: Prisma.InvestigacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
};
export type InvestigacionUpsertWithoutProcesoGradoInput = {
    update: Prisma.XOR<Prisma.InvestigacionUpdateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedUpdateWithoutProcesoGradoInput>;
    create: Prisma.XOR<Prisma.InvestigacionCreateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedCreateWithoutProcesoGradoInput>;
    where?: Prisma.InvestigacionWhereInput;
};
export type InvestigacionUpdateToOneWithWhereWithoutProcesoGradoInput = {
    where?: Prisma.InvestigacionWhereInput;
    data: Prisma.XOR<Prisma.InvestigacionUpdateWithoutProcesoGradoInput, Prisma.InvestigacionUncheckedUpdateWithoutProcesoGradoInput>;
};
export type InvestigacionUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InvestigacionUncheckedUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grupoInvestigacion?: Prisma.StringFieldUpdateOperationsInput | string;
    ideaPropuesta?: Prisma.StringFieldUpdateOperationsInput | string;
    materiaMatriculada?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type InvestigacionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    grupoInvestigacion?: boolean;
    ideaPropuesta?: boolean;
    materiaMatriculada?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion"]>;
export type InvestigacionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    grupoInvestigacion?: boolean;
    ideaPropuesta?: boolean;
    materiaMatriculada?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion"]>;
export type InvestigacionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    grupoInvestigacion?: boolean;
    ideaPropuesta?: boolean;
    materiaMatriculada?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["investigacion"]>;
export type InvestigacionSelectScalar = {
    id?: boolean;
    procesoGradoId?: boolean;
    grupoInvestigacion?: boolean;
    ideaPropuesta?: boolean;
    materiaMatriculada?: boolean;
};
export type InvestigacionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "procesoGradoId" | "grupoInvestigacion" | "ideaPropuesta" | "materiaMatriculada", ExtArgs["result"]["investigacion"]>;
export type InvestigacionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type InvestigacionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type InvestigacionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type $InvestigacionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Investigacion";
    objects: {
        procesoGrado: Prisma.$ProcesoGradoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        procesoGradoId: string;
        grupoInvestigacion: string;
        ideaPropuesta: string;
        materiaMatriculada: boolean;
    }, ExtArgs["result"]["investigacion"]>;
    composites: {};
};
export type InvestigacionGetPayload<S extends boolean | null | undefined | InvestigacionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload, S>;
export type InvestigacionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvestigacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvestigacionCountAggregateInputType | true;
};
export interface InvestigacionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Investigacion'];
        meta: {
            name: 'Investigacion';
        };
    };
    findUnique<T extends InvestigacionFindUniqueArgs>(args: Prisma.SelectSubset<T, InvestigacionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvestigacionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvestigacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvestigacionFindFirstArgs>(args?: Prisma.SelectSubset<T, InvestigacionFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvestigacionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvestigacionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvestigacionFindManyArgs>(args?: Prisma.SelectSubset<T, InvestigacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvestigacionCreateArgs>(args: Prisma.SelectSubset<T, InvestigacionCreateArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvestigacionCreateManyArgs>(args?: Prisma.SelectSubset<T, InvestigacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvestigacionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvestigacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvestigacionDeleteArgs>(args: Prisma.SelectSubset<T, InvestigacionDeleteArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvestigacionUpdateArgs>(args: Prisma.SelectSubset<T, InvestigacionUpdateArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvestigacionDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvestigacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvestigacionUpdateManyArgs>(args: Prisma.SelectSubset<T, InvestigacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvestigacionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvestigacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvestigacionUpsertArgs>(args: Prisma.SelectSubset<T, InvestigacionUpsertArgs<ExtArgs>>): Prisma.Prisma__InvestigacionClient<runtime.Types.Result.GetResult<Prisma.$InvestigacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvestigacionCountArgs>(args?: Prisma.Subset<T, InvestigacionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvestigacionCountAggregateOutputType> : number>;
    aggregate<T extends InvestigacionAggregateArgs>(args: Prisma.Subset<T, InvestigacionAggregateArgs>): Prisma.PrismaPromise<GetInvestigacionAggregateType<T>>;
    groupBy<T extends InvestigacionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvestigacionGroupByArgs['orderBy'];
    } : {
        orderBy?: InvestigacionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvestigacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestigacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvestigacionFieldRefs;
}
export interface Prisma__InvestigacionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesoGrado<T extends Prisma.ProcesoGradoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGradoDefaultArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvestigacionFieldRefs {
    readonly id: Prisma.FieldRef<"Investigacion", 'String'>;
    readonly procesoGradoId: Prisma.FieldRef<"Investigacion", 'String'>;
    readonly grupoInvestigacion: Prisma.FieldRef<"Investigacion", 'String'>;
    readonly ideaPropuesta: Prisma.FieldRef<"Investigacion", 'String'>;
    readonly materiaMatriculada: Prisma.FieldRef<"Investigacion", 'Boolean'>;
}
export type InvestigacionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where?: Prisma.InvestigacionWhereInput;
    orderBy?: Prisma.InvestigacionOrderByWithRelationInput | Prisma.InvestigacionOrderByWithRelationInput[];
    cursor?: Prisma.InvestigacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvestigacionScalarFieldEnum | Prisma.InvestigacionScalarFieldEnum[];
};
export type InvestigacionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where?: Prisma.InvestigacionWhereInput;
    orderBy?: Prisma.InvestigacionOrderByWithRelationInput | Prisma.InvestigacionOrderByWithRelationInput[];
    cursor?: Prisma.InvestigacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvestigacionScalarFieldEnum | Prisma.InvestigacionScalarFieldEnum[];
};
export type InvestigacionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where?: Prisma.InvestigacionWhereInput;
    orderBy?: Prisma.InvestigacionOrderByWithRelationInput | Prisma.InvestigacionOrderByWithRelationInput[];
    cursor?: Prisma.InvestigacionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvestigacionScalarFieldEnum | Prisma.InvestigacionScalarFieldEnum[];
};
export type InvestigacionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvestigacionCreateInput, Prisma.InvestigacionUncheckedCreateInput>;
};
export type InvestigacionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvestigacionCreateManyInput | Prisma.InvestigacionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvestigacionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    data: Prisma.InvestigacionCreateManyInput | Prisma.InvestigacionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvestigacionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvestigacionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvestigacionUpdateInput, Prisma.InvestigacionUncheckedUpdateInput>;
    where: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvestigacionUpdateManyMutationInput, Prisma.InvestigacionUncheckedUpdateManyInput>;
    where?: Prisma.InvestigacionWhereInput;
    limit?: number;
};
export type InvestigacionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvestigacionUpdateManyMutationInput, Prisma.InvestigacionUncheckedUpdateManyInput>;
    where?: Prisma.InvestigacionWhereInput;
    limit?: number;
    include?: Prisma.InvestigacionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvestigacionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where: Prisma.InvestigacionWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvestigacionCreateInput, Prisma.InvestigacionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvestigacionUpdateInput, Prisma.InvestigacionUncheckedUpdateInput>;
};
export type InvestigacionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
    where: Prisma.InvestigacionWhereUniqueInput;
};
export type InvestigacionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvestigacionWhereInput;
    limit?: number;
};
export type InvestigacionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvestigacionSelect<ExtArgs> | null;
    omit?: Prisma.InvestigacionOmit<ExtArgs> | null;
    include?: Prisma.InvestigacionInclude<ExtArgs> | null;
};
