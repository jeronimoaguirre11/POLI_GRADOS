import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CoordinadorModel = runtime.Types.Result.DefaultSelection<Prisma.$CoordinadorPayload>;
export type AggregateCoordinador = {
    _count: CoordinadorCountAggregateOutputType | null;
    _min: CoordinadorMinAggregateOutputType | null;
    _max: CoordinadorMaxAggregateOutputType | null;
};
export type CoordinadorMinAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    cargo: string | null;
};
export type CoordinadorMaxAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    cargo: string | null;
};
export type CoordinadorCountAggregateOutputType = {
    id: number;
    usuarioId: number;
    cargo: number;
    _all: number;
};
export type CoordinadorMinAggregateInputType = {
    id?: true;
    usuarioId?: true;
    cargo?: true;
};
export type CoordinadorMaxAggregateInputType = {
    id?: true;
    usuarioId?: true;
    cargo?: true;
};
export type CoordinadorCountAggregateInputType = {
    id?: true;
    usuarioId?: true;
    cargo?: true;
    _all?: true;
};
export type CoordinadorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CoordinadorWhereInput;
    orderBy?: Prisma.CoordinadorOrderByWithRelationInput | Prisma.CoordinadorOrderByWithRelationInput[];
    cursor?: Prisma.CoordinadorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CoordinadorCountAggregateInputType;
    _min?: CoordinadorMinAggregateInputType;
    _max?: CoordinadorMaxAggregateInputType;
};
export type GetCoordinadorAggregateType<T extends CoordinadorAggregateArgs> = {
    [P in keyof T & keyof AggregateCoordinador]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCoordinador[P]> : Prisma.GetScalarType<T[P], AggregateCoordinador[P]>;
};
export type CoordinadorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CoordinadorWhereInput;
    orderBy?: Prisma.CoordinadorOrderByWithAggregationInput | Prisma.CoordinadorOrderByWithAggregationInput[];
    by: Prisma.CoordinadorScalarFieldEnum[] | Prisma.CoordinadorScalarFieldEnum;
    having?: Prisma.CoordinadorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CoordinadorCountAggregateInputType | true;
    _min?: CoordinadorMinAggregateInputType;
    _max?: CoordinadorMaxAggregateInputType;
};
export type CoordinadorGroupByOutputType = {
    id: string;
    usuarioId: string;
    cargo: string | null;
    _count: CoordinadorCountAggregateOutputType | null;
    _min: CoordinadorMinAggregateOutputType | null;
    _max: CoordinadorMaxAggregateOutputType | null;
};
export type GetCoordinadorGroupByPayload<T extends CoordinadorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CoordinadorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CoordinadorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CoordinadorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CoordinadorGroupByOutputType[P]>;
}>>;
export type CoordinadorWhereInput = {
    AND?: Prisma.CoordinadorWhereInput | Prisma.CoordinadorWhereInput[];
    OR?: Prisma.CoordinadorWhereInput[];
    NOT?: Prisma.CoordinadorWhereInput | Prisma.CoordinadorWhereInput[];
    id?: Prisma.StringFilter<"Coordinador"> | string;
    usuarioId?: Prisma.StringFilter<"Coordinador"> | string;
    cargo?: Prisma.StringNullableFilter<"Coordinador"> | string | null;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesosAsignados?: Prisma.ProcesoGradoListRelationFilter;
};
export type CoordinadorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    cargo?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    procesosAsignados?: Prisma.ProcesoGradoOrderByRelationAggregateInput;
};
export type CoordinadorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    usuarioId?: string;
    AND?: Prisma.CoordinadorWhereInput | Prisma.CoordinadorWhereInput[];
    OR?: Prisma.CoordinadorWhereInput[];
    NOT?: Prisma.CoordinadorWhereInput | Prisma.CoordinadorWhereInput[];
    cargo?: Prisma.StringNullableFilter<"Coordinador"> | string | null;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesosAsignados?: Prisma.ProcesoGradoListRelationFilter;
}, "id" | "usuarioId">;
export type CoordinadorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    cargo?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CoordinadorCountOrderByAggregateInput;
    _max?: Prisma.CoordinadorMaxOrderByAggregateInput;
    _min?: Prisma.CoordinadorMinOrderByAggregateInput;
};
export type CoordinadorScalarWhereWithAggregatesInput = {
    AND?: Prisma.CoordinadorScalarWhereWithAggregatesInput | Prisma.CoordinadorScalarWhereWithAggregatesInput[];
    OR?: Prisma.CoordinadorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CoordinadorScalarWhereWithAggregatesInput | Prisma.CoordinadorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Coordinador"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Coordinador"> | string;
    cargo?: Prisma.StringNullableWithAggregatesFilter<"Coordinador"> | string | null;
};
export type CoordinadorCreateInput = {
    id?: string;
    cargo?: string | null;
    usuario: Prisma.UsuarioCreateNestedOneWithoutCoordinadorInput;
    procesosAsignados?: Prisma.ProcesoGradoCreateNestedManyWithoutCoordinadorInput;
};
export type CoordinadorUncheckedCreateInput = {
    id?: string;
    usuarioId: string;
    cargo?: string | null;
    procesosAsignados?: Prisma.ProcesoGradoUncheckedCreateNestedManyWithoutCoordinadorInput;
};
export type CoordinadorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutCoordinadorNestedInput;
    procesosAsignados?: Prisma.ProcesoGradoUpdateManyWithoutCoordinadorNestedInput;
};
export type CoordinadorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    procesosAsignados?: Prisma.ProcesoGradoUncheckedUpdateManyWithoutCoordinadorNestedInput;
};
export type CoordinadorCreateManyInput = {
    id?: string;
    usuarioId: string;
    cargo?: string | null;
};
export type CoordinadorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CoordinadorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CoordinadorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
};
export type CoordinadorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
};
export type CoordinadorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
};
export type CoordinadorNullableScalarRelationFilter = {
    is?: Prisma.CoordinadorWhereInput | null;
    isNot?: Prisma.CoordinadorWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type CoordinadorCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.CoordinadorUpsertWithoutUsuarioInput;
    disconnect?: Prisma.CoordinadorWhereInput | boolean;
    delete?: Prisma.CoordinadorWhereInput | boolean;
    connect?: Prisma.CoordinadorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CoordinadorUpdateToOneWithWhereWithoutUsuarioInput, Prisma.CoordinadorUpdateWithoutUsuarioInput>, Prisma.CoordinadorUncheckedUpdateWithoutUsuarioInput>;
};
export type CoordinadorUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.CoordinadorUpsertWithoutUsuarioInput;
    disconnect?: Prisma.CoordinadorWhereInput | boolean;
    delete?: Prisma.CoordinadorWhereInput | boolean;
    connect?: Prisma.CoordinadorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CoordinadorUpdateToOneWithWhereWithoutUsuarioInput, Prisma.CoordinadorUpdateWithoutUsuarioInput>, Prisma.CoordinadorUncheckedUpdateWithoutUsuarioInput>;
};
export type CoordinadorCreateNestedOneWithoutProcesosAsignadosInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedCreateWithoutProcesosAsignadosInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutProcesosAsignadosInput;
    connect?: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorUpdateOneWithoutProcesosAsignadosNestedInput = {
    create?: Prisma.XOR<Prisma.CoordinadorCreateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedCreateWithoutProcesosAsignadosInput>;
    connectOrCreate?: Prisma.CoordinadorCreateOrConnectWithoutProcesosAsignadosInput;
    upsert?: Prisma.CoordinadorUpsertWithoutProcesosAsignadosInput;
    disconnect?: Prisma.CoordinadorWhereInput | boolean;
    delete?: Prisma.CoordinadorWhereInput | boolean;
    connect?: Prisma.CoordinadorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CoordinadorUpdateToOneWithWhereWithoutProcesosAsignadosInput, Prisma.CoordinadorUpdateWithoutProcesosAsignadosInput>, Prisma.CoordinadorUncheckedUpdateWithoutProcesosAsignadosInput>;
};
export type CoordinadorCreateWithoutUsuarioInput = {
    id?: string;
    cargo?: string | null;
    procesosAsignados?: Prisma.ProcesoGradoCreateNestedManyWithoutCoordinadorInput;
};
export type CoordinadorUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    cargo?: string | null;
    procesosAsignados?: Prisma.ProcesoGradoUncheckedCreateNestedManyWithoutCoordinadorInput;
};
export type CoordinadorCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.CoordinadorWhereUniqueInput;
    create: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
};
export type CoordinadorUpsertWithoutUsuarioInput = {
    update: Prisma.XOR<Prisma.CoordinadorUpdateWithoutUsuarioInput, Prisma.CoordinadorUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.CoordinadorCreateWithoutUsuarioInput, Prisma.CoordinadorUncheckedCreateWithoutUsuarioInput>;
    where?: Prisma.CoordinadorWhereInput;
};
export type CoordinadorUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: Prisma.CoordinadorWhereInput;
    data: Prisma.XOR<Prisma.CoordinadorUpdateWithoutUsuarioInput, Prisma.CoordinadorUncheckedUpdateWithoutUsuarioInput>;
};
export type CoordinadorUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    procesosAsignados?: Prisma.ProcesoGradoUpdateManyWithoutCoordinadorNestedInput;
};
export type CoordinadorUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    procesosAsignados?: Prisma.ProcesoGradoUncheckedUpdateManyWithoutCoordinadorNestedInput;
};
export type CoordinadorCreateWithoutProcesosAsignadosInput = {
    id?: string;
    cargo?: string | null;
    usuario: Prisma.UsuarioCreateNestedOneWithoutCoordinadorInput;
};
export type CoordinadorUncheckedCreateWithoutProcesosAsignadosInput = {
    id?: string;
    usuarioId: string;
    cargo?: string | null;
};
export type CoordinadorCreateOrConnectWithoutProcesosAsignadosInput = {
    where: Prisma.CoordinadorWhereUniqueInput;
    create: Prisma.XOR<Prisma.CoordinadorCreateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedCreateWithoutProcesosAsignadosInput>;
};
export type CoordinadorUpsertWithoutProcesosAsignadosInput = {
    update: Prisma.XOR<Prisma.CoordinadorUpdateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedUpdateWithoutProcesosAsignadosInput>;
    create: Prisma.XOR<Prisma.CoordinadorCreateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedCreateWithoutProcesosAsignadosInput>;
    where?: Prisma.CoordinadorWhereInput;
};
export type CoordinadorUpdateToOneWithWhereWithoutProcesosAsignadosInput = {
    where?: Prisma.CoordinadorWhereInput;
    data: Prisma.XOR<Prisma.CoordinadorUpdateWithoutProcesosAsignadosInput, Prisma.CoordinadorUncheckedUpdateWithoutProcesosAsignadosInput>;
};
export type CoordinadorUpdateWithoutProcesosAsignadosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutCoordinadorNestedInput;
};
export type CoordinadorUncheckedUpdateWithoutProcesosAsignadosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CoordinadorCountOutputType = {
    procesosAsignados: number;
};
export type CoordinadorCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesosAsignados?: boolean | CoordinadorCountOutputTypeCountProcesosAsignadosArgs;
};
export type CoordinadorCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorCountOutputTypeSelect<ExtArgs> | null;
};
export type CoordinadorCountOutputTypeCountProcesosAsignadosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcesoGradoWhereInput;
};
export type CoordinadorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    cargo?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesosAsignados?: boolean | Prisma.Coordinador$procesosAsignadosArgs<ExtArgs>;
    _count?: boolean | Prisma.CoordinadorCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["coordinador"]>;
export type CoordinadorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    cargo?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["coordinador"]>;
export type CoordinadorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    cargo?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["coordinador"]>;
export type CoordinadorSelectScalar = {
    id?: boolean;
    usuarioId?: boolean;
    cargo?: boolean;
};
export type CoordinadorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "usuarioId" | "cargo", ExtArgs["result"]["coordinador"]>;
export type CoordinadorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesosAsignados?: boolean | Prisma.Coordinador$procesosAsignadosArgs<ExtArgs>;
    _count?: boolean | Prisma.CoordinadorCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CoordinadorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type CoordinadorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $CoordinadorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Coordinador";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        procesosAsignados: Prisma.$ProcesoGradoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        usuarioId: string;
        cargo: string | null;
    }, ExtArgs["result"]["coordinador"]>;
    composites: {};
};
export type CoordinadorGetPayload<S extends boolean | null | undefined | CoordinadorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload, S>;
export type CoordinadorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CoordinadorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CoordinadorCountAggregateInputType | true;
};
export interface CoordinadorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Coordinador'];
        meta: {
            name: 'Coordinador';
        };
    };
    findUnique<T extends CoordinadorFindUniqueArgs>(args: Prisma.SelectSubset<T, CoordinadorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CoordinadorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CoordinadorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CoordinadorFindFirstArgs>(args?: Prisma.SelectSubset<T, CoordinadorFindFirstArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CoordinadorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CoordinadorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CoordinadorFindManyArgs>(args?: Prisma.SelectSubset<T, CoordinadorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CoordinadorCreateArgs>(args: Prisma.SelectSubset<T, CoordinadorCreateArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CoordinadorCreateManyArgs>(args?: Prisma.SelectSubset<T, CoordinadorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CoordinadorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CoordinadorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CoordinadorDeleteArgs>(args: Prisma.SelectSubset<T, CoordinadorDeleteArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CoordinadorUpdateArgs>(args: Prisma.SelectSubset<T, CoordinadorUpdateArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CoordinadorDeleteManyArgs>(args?: Prisma.SelectSubset<T, CoordinadorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CoordinadorUpdateManyArgs>(args: Prisma.SelectSubset<T, CoordinadorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CoordinadorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CoordinadorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CoordinadorUpsertArgs>(args: Prisma.SelectSubset<T, CoordinadorUpsertArgs<ExtArgs>>): Prisma.Prisma__CoordinadorClient<runtime.Types.Result.GetResult<Prisma.$CoordinadorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CoordinadorCountArgs>(args?: Prisma.Subset<T, CoordinadorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CoordinadorCountAggregateOutputType> : number>;
    aggregate<T extends CoordinadorAggregateArgs>(args: Prisma.Subset<T, CoordinadorAggregateArgs>): Prisma.PrismaPromise<GetCoordinadorAggregateType<T>>;
    groupBy<T extends CoordinadorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CoordinadorGroupByArgs['orderBy'];
    } : {
        orderBy?: CoordinadorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CoordinadorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoordinadorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CoordinadorFieldRefs;
}
export interface Prisma__CoordinadorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    procesosAsignados<T extends Prisma.Coordinador$procesosAsignadosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Coordinador$procesosAsignadosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CoordinadorFieldRefs {
    readonly id: Prisma.FieldRef<"Coordinador", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Coordinador", 'String'>;
    readonly cargo: Prisma.FieldRef<"Coordinador", 'String'>;
}
export type CoordinadorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where?: Prisma.CoordinadorWhereInput;
    orderBy?: Prisma.CoordinadorOrderByWithRelationInput | Prisma.CoordinadorOrderByWithRelationInput[];
    cursor?: Prisma.CoordinadorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CoordinadorScalarFieldEnum | Prisma.CoordinadorScalarFieldEnum[];
};
export type CoordinadorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where?: Prisma.CoordinadorWhereInput;
    orderBy?: Prisma.CoordinadorOrderByWithRelationInput | Prisma.CoordinadorOrderByWithRelationInput[];
    cursor?: Prisma.CoordinadorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CoordinadorScalarFieldEnum | Prisma.CoordinadorScalarFieldEnum[];
};
export type CoordinadorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where?: Prisma.CoordinadorWhereInput;
    orderBy?: Prisma.CoordinadorOrderByWithRelationInput | Prisma.CoordinadorOrderByWithRelationInput[];
    cursor?: Prisma.CoordinadorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CoordinadorScalarFieldEnum | Prisma.CoordinadorScalarFieldEnum[];
};
export type CoordinadorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CoordinadorCreateInput, Prisma.CoordinadorUncheckedCreateInput>;
};
export type CoordinadorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CoordinadorCreateManyInput | Prisma.CoordinadorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CoordinadorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    data: Prisma.CoordinadorCreateManyInput | Prisma.CoordinadorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CoordinadorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CoordinadorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CoordinadorUpdateInput, Prisma.CoordinadorUncheckedUpdateInput>;
    where: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CoordinadorUpdateManyMutationInput, Prisma.CoordinadorUncheckedUpdateManyInput>;
    where?: Prisma.CoordinadorWhereInput;
    limit?: number;
};
export type CoordinadorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CoordinadorUpdateManyMutationInput, Prisma.CoordinadorUncheckedUpdateManyInput>;
    where?: Prisma.CoordinadorWhereInput;
    limit?: number;
    include?: Prisma.CoordinadorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CoordinadorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where: Prisma.CoordinadorWhereUniqueInput;
    create: Prisma.XOR<Prisma.CoordinadorCreateInput, Prisma.CoordinadorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CoordinadorUpdateInput, Prisma.CoordinadorUncheckedUpdateInput>;
};
export type CoordinadorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
    where: Prisma.CoordinadorWhereUniqueInput;
};
export type CoordinadorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CoordinadorWhereInput;
    limit?: number;
};
export type Coordinador$procesosAsignadosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CoordinadorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CoordinadorSelect<ExtArgs> | null;
    omit?: Prisma.CoordinadorOmit<ExtArgs> | null;
    include?: Prisma.CoordinadorInclude<ExtArgs> | null;
};
