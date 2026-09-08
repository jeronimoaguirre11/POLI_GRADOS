import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DiplomadoModel = runtime.Types.Result.DefaultSelection<Prisma.$DiplomadoPayload>;
export type AggregateDiplomado = {
    _count: DiplomadoCountAggregateOutputType | null;
    _min: DiplomadoMinAggregateOutputType | null;
    _max: DiplomadoMaxAggregateOutputType | null;
};
export type DiplomadoMinAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    nombreCurso: string | null;
    institucion: string | null;
    estadoAprobacion: string | null;
};
export type DiplomadoMaxAggregateOutputType = {
    id: string | null;
    procesoGradoId: string | null;
    nombreCurso: string | null;
    institucion: string | null;
    estadoAprobacion: string | null;
};
export type DiplomadoCountAggregateOutputType = {
    id: number;
    procesoGradoId: number;
    nombreCurso: number;
    institucion: number;
    estadoAprobacion: number;
    _all: number;
};
export type DiplomadoMinAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    nombreCurso?: true;
    institucion?: true;
    estadoAprobacion?: true;
};
export type DiplomadoMaxAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    nombreCurso?: true;
    institucion?: true;
    estadoAprobacion?: true;
};
export type DiplomadoCountAggregateInputType = {
    id?: true;
    procesoGradoId?: true;
    nombreCurso?: true;
    institucion?: true;
    estadoAprobacion?: true;
    _all?: true;
};
export type DiplomadoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiplomadoWhereInput;
    orderBy?: Prisma.DiplomadoOrderByWithRelationInput | Prisma.DiplomadoOrderByWithRelationInput[];
    cursor?: Prisma.DiplomadoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiplomadoCountAggregateInputType;
    _min?: DiplomadoMinAggregateInputType;
    _max?: DiplomadoMaxAggregateInputType;
};
export type GetDiplomadoAggregateType<T extends DiplomadoAggregateArgs> = {
    [P in keyof T & keyof AggregateDiplomado]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiplomado[P]> : Prisma.GetScalarType<T[P], AggregateDiplomado[P]>;
};
export type DiplomadoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiplomadoWhereInput;
    orderBy?: Prisma.DiplomadoOrderByWithAggregationInput | Prisma.DiplomadoOrderByWithAggregationInput[];
    by: Prisma.DiplomadoScalarFieldEnum[] | Prisma.DiplomadoScalarFieldEnum;
    having?: Prisma.DiplomadoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiplomadoCountAggregateInputType | true;
    _min?: DiplomadoMinAggregateInputType;
    _max?: DiplomadoMaxAggregateInputType;
};
export type DiplomadoGroupByOutputType = {
    id: string;
    procesoGradoId: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion: string;
    _count: DiplomadoCountAggregateOutputType | null;
    _min: DiplomadoMinAggregateOutputType | null;
    _max: DiplomadoMaxAggregateOutputType | null;
};
export type GetDiplomadoGroupByPayload<T extends DiplomadoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiplomadoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiplomadoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiplomadoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiplomadoGroupByOutputType[P]>;
}>>;
export type DiplomadoWhereInput = {
    AND?: Prisma.DiplomadoWhereInput | Prisma.DiplomadoWhereInput[];
    OR?: Prisma.DiplomadoWhereInput[];
    NOT?: Prisma.DiplomadoWhereInput | Prisma.DiplomadoWhereInput[];
    id?: Prisma.StringFilter<"Diplomado"> | string;
    procesoGradoId?: Prisma.StringFilter<"Diplomado"> | string;
    nombreCurso?: Prisma.StringFilter<"Diplomado"> | string;
    institucion?: Prisma.StringFilter<"Diplomado"> | string;
    estadoAprobacion?: Prisma.StringFilter<"Diplomado"> | string;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
};
export type DiplomadoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    nombreCurso?: Prisma.SortOrder;
    institucion?: Prisma.SortOrder;
    estadoAprobacion?: Prisma.SortOrder;
    procesoGrado?: Prisma.ProcesoGradoOrderByWithRelationInput;
};
export type DiplomadoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    procesoGradoId?: string;
    AND?: Prisma.DiplomadoWhereInput | Prisma.DiplomadoWhereInput[];
    OR?: Prisma.DiplomadoWhereInput[];
    NOT?: Prisma.DiplomadoWhereInput | Prisma.DiplomadoWhereInput[];
    nombreCurso?: Prisma.StringFilter<"Diplomado"> | string;
    institucion?: Prisma.StringFilter<"Diplomado"> | string;
    estadoAprobacion?: Prisma.StringFilter<"Diplomado"> | string;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoScalarRelationFilter, Prisma.ProcesoGradoWhereInput>;
}, "id" | "procesoGradoId">;
export type DiplomadoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    nombreCurso?: Prisma.SortOrder;
    institucion?: Prisma.SortOrder;
    estadoAprobacion?: Prisma.SortOrder;
    _count?: Prisma.DiplomadoCountOrderByAggregateInput;
    _max?: Prisma.DiplomadoMaxOrderByAggregateInput;
    _min?: Prisma.DiplomadoMinOrderByAggregateInput;
};
export type DiplomadoScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiplomadoScalarWhereWithAggregatesInput | Prisma.DiplomadoScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiplomadoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiplomadoScalarWhereWithAggregatesInput | Prisma.DiplomadoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Diplomado"> | string;
    procesoGradoId?: Prisma.StringWithAggregatesFilter<"Diplomado"> | string;
    nombreCurso?: Prisma.StringWithAggregatesFilter<"Diplomado"> | string;
    institucion?: Prisma.StringWithAggregatesFilter<"Diplomado"> | string;
    estadoAprobacion?: Prisma.StringWithAggregatesFilter<"Diplomado"> | string;
};
export type DiplomadoCreateInput = {
    id?: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion?: string;
    procesoGrado: Prisma.ProcesoGradoCreateNestedOneWithoutDiplomadoInput;
};
export type DiplomadoUncheckedCreateInput = {
    id?: string;
    procesoGradoId: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion?: string;
};
export type DiplomadoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneRequiredWithoutDiplomadoNestedInput;
};
export type DiplomadoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiplomadoCreateManyInput = {
    id?: string;
    procesoGradoId: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion?: string;
};
export type DiplomadoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiplomadoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    procesoGradoId?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiplomadoNullableScalarRelationFilter = {
    is?: Prisma.DiplomadoWhereInput | null;
    isNot?: Prisma.DiplomadoWhereInput | null;
};
export type DiplomadoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    nombreCurso?: Prisma.SortOrder;
    institucion?: Prisma.SortOrder;
    estadoAprobacion?: Prisma.SortOrder;
};
export type DiplomadoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    nombreCurso?: Prisma.SortOrder;
    institucion?: Prisma.SortOrder;
    estadoAprobacion?: Prisma.SortOrder;
};
export type DiplomadoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    procesoGradoId?: Prisma.SortOrder;
    nombreCurso?: Prisma.SortOrder;
    institucion?: Prisma.SortOrder;
    estadoAprobacion?: Prisma.SortOrder;
};
export type DiplomadoCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.DiplomadoCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoUncheckedCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.DiplomadoCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.DiplomadoCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.DiplomadoUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.DiplomadoWhereInput | boolean;
    delete?: Prisma.DiplomadoWhereInput | boolean;
    connect?: Prisma.DiplomadoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiplomadoUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.DiplomadoUpdateWithoutProcesoGradoInput>, Prisma.DiplomadoUncheckedUpdateWithoutProcesoGradoInput>;
};
export type DiplomadoUncheckedUpdateOneWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.DiplomadoCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.DiplomadoUpsertWithoutProcesoGradoInput;
    disconnect?: Prisma.DiplomadoWhereInput | boolean;
    delete?: Prisma.DiplomadoWhereInput | boolean;
    connect?: Prisma.DiplomadoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiplomadoUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.DiplomadoUpdateWithoutProcesoGradoInput>, Prisma.DiplomadoUncheckedUpdateWithoutProcesoGradoInput>;
};
export type DiplomadoCreateWithoutProcesoGradoInput = {
    id?: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion?: string;
};
export type DiplomadoUncheckedCreateWithoutProcesoGradoInput = {
    id?: string;
    nombreCurso: string;
    institucion: string;
    estadoAprobacion?: string;
};
export type DiplomadoCreateOrConnectWithoutProcesoGradoInput = {
    where: Prisma.DiplomadoWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
};
export type DiplomadoUpsertWithoutProcesoGradoInput = {
    update: Prisma.XOR<Prisma.DiplomadoUpdateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedUpdateWithoutProcesoGradoInput>;
    create: Prisma.XOR<Prisma.DiplomadoCreateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedCreateWithoutProcesoGradoInput>;
    where?: Prisma.DiplomadoWhereInput;
};
export type DiplomadoUpdateToOneWithWhereWithoutProcesoGradoInput = {
    where?: Prisma.DiplomadoWhereInput;
    data: Prisma.XOR<Prisma.DiplomadoUpdateWithoutProcesoGradoInput, Prisma.DiplomadoUncheckedUpdateWithoutProcesoGradoInput>;
};
export type DiplomadoUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiplomadoUncheckedUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    institucion?: Prisma.StringFieldUpdateOperationsInput | string;
    estadoAprobacion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DiplomadoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    nombreCurso?: boolean;
    institucion?: boolean;
    estadoAprobacion?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diplomado"]>;
export type DiplomadoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    nombreCurso?: boolean;
    institucion?: boolean;
    estadoAprobacion?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diplomado"]>;
export type DiplomadoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    procesoGradoId?: boolean;
    nombreCurso?: boolean;
    institucion?: boolean;
    estadoAprobacion?: boolean;
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diplomado"]>;
export type DiplomadoSelectScalar = {
    id?: boolean;
    procesoGradoId?: boolean;
    nombreCurso?: boolean;
    institucion?: boolean;
    estadoAprobacion?: boolean;
};
export type DiplomadoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "procesoGradoId" | "nombreCurso" | "institucion" | "estadoAprobacion", ExtArgs["result"]["diplomado"]>;
export type DiplomadoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type DiplomadoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type DiplomadoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesoGrado?: boolean | Prisma.ProcesoGradoDefaultArgs<ExtArgs>;
};
export type $DiplomadoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Diplomado";
    objects: {
        procesoGrado: Prisma.$ProcesoGradoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        procesoGradoId: string;
        nombreCurso: string;
        institucion: string;
        estadoAprobacion: string;
    }, ExtArgs["result"]["diplomado"]>;
    composites: {};
};
export type DiplomadoGetPayload<S extends boolean | null | undefined | DiplomadoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload, S>;
export type DiplomadoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiplomadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiplomadoCountAggregateInputType | true;
};
export interface DiplomadoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Diplomado'];
        meta: {
            name: 'Diplomado';
        };
    };
    findUnique<T extends DiplomadoFindUniqueArgs>(args: Prisma.SelectSubset<T, DiplomadoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiplomadoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiplomadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiplomadoFindFirstArgs>(args?: Prisma.SelectSubset<T, DiplomadoFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiplomadoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiplomadoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiplomadoFindManyArgs>(args?: Prisma.SelectSubset<T, DiplomadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiplomadoCreateArgs>(args: Prisma.SelectSubset<T, DiplomadoCreateArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiplomadoCreateManyArgs>(args?: Prisma.SelectSubset<T, DiplomadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiplomadoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiplomadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiplomadoDeleteArgs>(args: Prisma.SelectSubset<T, DiplomadoDeleteArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiplomadoUpdateArgs>(args: Prisma.SelectSubset<T, DiplomadoUpdateArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiplomadoDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiplomadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiplomadoUpdateManyArgs>(args: Prisma.SelectSubset<T, DiplomadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiplomadoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiplomadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiplomadoUpsertArgs>(args: Prisma.SelectSubset<T, DiplomadoUpsertArgs<ExtArgs>>): Prisma.Prisma__DiplomadoClient<runtime.Types.Result.GetResult<Prisma.$DiplomadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiplomadoCountArgs>(args?: Prisma.Subset<T, DiplomadoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiplomadoCountAggregateOutputType> : number>;
    aggregate<T extends DiplomadoAggregateArgs>(args: Prisma.Subset<T, DiplomadoAggregateArgs>): Prisma.PrismaPromise<GetDiplomadoAggregateType<T>>;
    groupBy<T extends DiplomadoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiplomadoGroupByArgs['orderBy'];
    } : {
        orderBy?: DiplomadoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiplomadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiplomadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiplomadoFieldRefs;
}
export interface Prisma__DiplomadoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesoGrado<T extends Prisma.ProcesoGradoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProcesoGradoDefaultArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiplomadoFieldRefs {
    readonly id: Prisma.FieldRef<"Diplomado", 'String'>;
    readonly procesoGradoId: Prisma.FieldRef<"Diplomado", 'String'>;
    readonly nombreCurso: Prisma.FieldRef<"Diplomado", 'String'>;
    readonly institucion: Prisma.FieldRef<"Diplomado", 'String'>;
    readonly estadoAprobacion: Prisma.FieldRef<"Diplomado", 'String'>;
}
export type DiplomadoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where?: Prisma.DiplomadoWhereInput;
    orderBy?: Prisma.DiplomadoOrderByWithRelationInput | Prisma.DiplomadoOrderByWithRelationInput[];
    cursor?: Prisma.DiplomadoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiplomadoScalarFieldEnum | Prisma.DiplomadoScalarFieldEnum[];
};
export type DiplomadoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where?: Prisma.DiplomadoWhereInput;
    orderBy?: Prisma.DiplomadoOrderByWithRelationInput | Prisma.DiplomadoOrderByWithRelationInput[];
    cursor?: Prisma.DiplomadoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiplomadoScalarFieldEnum | Prisma.DiplomadoScalarFieldEnum[];
};
export type DiplomadoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where?: Prisma.DiplomadoWhereInput;
    orderBy?: Prisma.DiplomadoOrderByWithRelationInput | Prisma.DiplomadoOrderByWithRelationInput[];
    cursor?: Prisma.DiplomadoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiplomadoScalarFieldEnum | Prisma.DiplomadoScalarFieldEnum[];
};
export type DiplomadoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiplomadoCreateInput, Prisma.DiplomadoUncheckedCreateInput>;
};
export type DiplomadoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiplomadoCreateManyInput | Prisma.DiplomadoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiplomadoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    data: Prisma.DiplomadoCreateManyInput | Prisma.DiplomadoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DiplomadoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DiplomadoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiplomadoUpdateInput, Prisma.DiplomadoUncheckedUpdateInput>;
    where: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiplomadoUpdateManyMutationInput, Prisma.DiplomadoUncheckedUpdateManyInput>;
    where?: Prisma.DiplomadoWhereInput;
    limit?: number;
};
export type DiplomadoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiplomadoUpdateManyMutationInput, Prisma.DiplomadoUncheckedUpdateManyInput>;
    where?: Prisma.DiplomadoWhereInput;
    limit?: number;
    include?: Prisma.DiplomadoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DiplomadoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where: Prisma.DiplomadoWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiplomadoCreateInput, Prisma.DiplomadoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiplomadoUpdateInput, Prisma.DiplomadoUncheckedUpdateInput>;
};
export type DiplomadoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
    where: Prisma.DiplomadoWhereUniqueInput;
};
export type DiplomadoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiplomadoWhereInput;
    limit?: number;
};
export type DiplomadoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiplomadoSelect<ExtArgs> | null;
    omit?: Prisma.DiplomadoOmit<ExtArgs> | null;
    include?: Prisma.DiplomadoInclude<ExtArgs> | null;
};
