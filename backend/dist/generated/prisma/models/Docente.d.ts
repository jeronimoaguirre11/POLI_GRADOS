import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DocenteModel = runtime.Types.Result.DefaultSelection<Prisma.$DocentePayload>;
export type AggregateDocente = {
    _count: DocenteCountAggregateOutputType | null;
    _min: DocenteMinAggregateOutputType | null;
    _max: DocenteMaxAggregateOutputType | null;
};
export type DocenteMinAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    tipo: $Enums.TipoDocente | null;
    especialidad: string | null;
};
export type DocenteMaxAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    tipo: $Enums.TipoDocente | null;
    especialidad: string | null;
};
export type DocenteCountAggregateOutputType = {
    id: number;
    usuarioId: number;
    tipo: number;
    especialidad: number;
    _all: number;
};
export type DocenteMinAggregateInputType = {
    id?: true;
    usuarioId?: true;
    tipo?: true;
    especialidad?: true;
};
export type DocenteMaxAggregateInputType = {
    id?: true;
    usuarioId?: true;
    tipo?: true;
    especialidad?: true;
};
export type DocenteCountAggregateInputType = {
    id?: true;
    usuarioId?: true;
    tipo?: true;
    especialidad?: true;
    _all?: true;
};
export type DocenteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocenteWhereInput;
    orderBy?: Prisma.DocenteOrderByWithRelationInput | Prisma.DocenteOrderByWithRelationInput[];
    cursor?: Prisma.DocenteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DocenteCountAggregateInputType;
    _min?: DocenteMinAggregateInputType;
    _max?: DocenteMaxAggregateInputType;
};
export type GetDocenteAggregateType<T extends DocenteAggregateArgs> = {
    [P in keyof T & keyof AggregateDocente]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDocente[P]> : Prisma.GetScalarType<T[P], AggregateDocente[P]>;
};
export type DocenteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocenteWhereInput;
    orderBy?: Prisma.DocenteOrderByWithAggregationInput | Prisma.DocenteOrderByWithAggregationInput[];
    by: Prisma.DocenteScalarFieldEnum[] | Prisma.DocenteScalarFieldEnum;
    having?: Prisma.DocenteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocenteCountAggregateInputType | true;
    _min?: DocenteMinAggregateInputType;
    _max?: DocenteMaxAggregateInputType;
};
export type DocenteGroupByOutputType = {
    id: string;
    usuarioId: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    _count: DocenteCountAggregateOutputType | null;
    _min: DocenteMinAggregateOutputType | null;
    _max: DocenteMaxAggregateOutputType | null;
};
export type GetDocenteGroupByPayload<T extends DocenteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DocenteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DocenteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DocenteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DocenteGroupByOutputType[P]>;
}>>;
export type DocenteWhereInput = {
    AND?: Prisma.DocenteWhereInput | Prisma.DocenteWhereInput[];
    OR?: Prisma.DocenteWhereInput[];
    NOT?: Prisma.DocenteWhereInput | Prisma.DocenteWhereInput[];
    id?: Prisma.StringFilter<"Docente"> | string;
    usuarioId?: Prisma.StringFilter<"Docente"> | string;
    tipo?: Prisma.EnumTipoDocenteFilter<"Docente"> | $Enums.TipoDocente;
    especialidad?: Prisma.StringFilter<"Docente"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesosAsesorados?: Prisma.ProcesoGradoListRelationFilter;
};
export type DocenteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    especialidad?: Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    procesosAsesorados?: Prisma.ProcesoGradoOrderByRelationAggregateInput;
};
export type DocenteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    usuarioId?: string;
    AND?: Prisma.DocenteWhereInput | Prisma.DocenteWhereInput[];
    OR?: Prisma.DocenteWhereInput[];
    NOT?: Prisma.DocenteWhereInput | Prisma.DocenteWhereInput[];
    tipo?: Prisma.EnumTipoDocenteFilter<"Docente"> | $Enums.TipoDocente;
    especialidad?: Prisma.StringFilter<"Docente"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesosAsesorados?: Prisma.ProcesoGradoListRelationFilter;
}, "id" | "usuarioId">;
export type DocenteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    especialidad?: Prisma.SortOrder;
    _count?: Prisma.DocenteCountOrderByAggregateInput;
    _max?: Prisma.DocenteMaxOrderByAggregateInput;
    _min?: Prisma.DocenteMinOrderByAggregateInput;
};
export type DocenteScalarWhereWithAggregatesInput = {
    AND?: Prisma.DocenteScalarWhereWithAggregatesInput | Prisma.DocenteScalarWhereWithAggregatesInput[];
    OR?: Prisma.DocenteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DocenteScalarWhereWithAggregatesInput | Prisma.DocenteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Docente"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Docente"> | string;
    tipo?: Prisma.EnumTipoDocenteWithAggregatesFilter<"Docente"> | $Enums.TipoDocente;
    especialidad?: Prisma.StringWithAggregatesFilter<"Docente"> | string;
};
export type DocenteCreateInput = {
    id?: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutDocenteInput;
    procesosAsesorados?: Prisma.ProcesoGradoCreateNestedManyWithoutAsesorInput;
};
export type DocenteUncheckedCreateInput = {
    id?: string;
    usuarioId: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    procesosAsesorados?: Prisma.ProcesoGradoUncheckedCreateNestedManyWithoutAsesorInput;
};
export type DocenteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutDocenteNestedInput;
    procesosAsesorados?: Prisma.ProcesoGradoUpdateManyWithoutAsesorNestedInput;
};
export type DocenteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
    procesosAsesorados?: Prisma.ProcesoGradoUncheckedUpdateManyWithoutAsesorNestedInput;
};
export type DocenteCreateManyInput = {
    id?: string;
    usuarioId: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
};
export type DocenteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DocenteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DocenteNullableScalarRelationFilter = {
    is?: Prisma.DocenteWhereInput | null;
    isNot?: Prisma.DocenteWhereInput | null;
};
export type DocenteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    especialidad?: Prisma.SortOrder;
};
export type DocenteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    especialidad?: Prisma.SortOrder;
};
export type DocenteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    especialidad?: Prisma.SortOrder;
};
export type DocenteCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.DocenteWhereUniqueInput;
};
export type DocenteUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.DocenteWhereUniqueInput;
};
export type DocenteUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.DocenteUpsertWithoutUsuarioInput;
    disconnect?: Prisma.DocenteWhereInput | boolean;
    delete?: Prisma.DocenteWhereInput | boolean;
    connect?: Prisma.DocenteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DocenteUpdateToOneWithWhereWithoutUsuarioInput, Prisma.DocenteUpdateWithoutUsuarioInput>, Prisma.DocenteUncheckedUpdateWithoutUsuarioInput>;
};
export type DocenteUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.DocenteUpsertWithoutUsuarioInput;
    disconnect?: Prisma.DocenteWhereInput | boolean;
    delete?: Prisma.DocenteWhereInput | boolean;
    connect?: Prisma.DocenteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DocenteUpdateToOneWithWhereWithoutUsuarioInput, Prisma.DocenteUpdateWithoutUsuarioInput>, Prisma.DocenteUncheckedUpdateWithoutUsuarioInput>;
};
export type EnumTipoDocenteFieldUpdateOperationsInput = {
    set?: $Enums.TipoDocente;
};
export type DocenteCreateNestedOneWithoutProcesosAsesoradosInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedCreateWithoutProcesosAsesoradosInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutProcesosAsesoradosInput;
    connect?: Prisma.DocenteWhereUniqueInput;
};
export type DocenteUpdateOneWithoutProcesosAsesoradosNestedInput = {
    create?: Prisma.XOR<Prisma.DocenteCreateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedCreateWithoutProcesosAsesoradosInput>;
    connectOrCreate?: Prisma.DocenteCreateOrConnectWithoutProcesosAsesoradosInput;
    upsert?: Prisma.DocenteUpsertWithoutProcesosAsesoradosInput;
    disconnect?: Prisma.DocenteWhereInput | boolean;
    delete?: Prisma.DocenteWhereInput | boolean;
    connect?: Prisma.DocenteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DocenteUpdateToOneWithWhereWithoutProcesosAsesoradosInput, Prisma.DocenteUpdateWithoutProcesosAsesoradosInput>, Prisma.DocenteUncheckedUpdateWithoutProcesosAsesoradosInput>;
};
export type DocenteCreateWithoutUsuarioInput = {
    id?: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    procesosAsesorados?: Prisma.ProcesoGradoCreateNestedManyWithoutAsesorInput;
};
export type DocenteUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    procesosAsesorados?: Prisma.ProcesoGradoUncheckedCreateNestedManyWithoutAsesorInput;
};
export type DocenteCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.DocenteWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
};
export type DocenteUpsertWithoutUsuarioInput = {
    update: Prisma.XOR<Prisma.DocenteUpdateWithoutUsuarioInput, Prisma.DocenteUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.DocenteCreateWithoutUsuarioInput, Prisma.DocenteUncheckedCreateWithoutUsuarioInput>;
    where?: Prisma.DocenteWhereInput;
};
export type DocenteUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: Prisma.DocenteWhereInput;
    data: Prisma.XOR<Prisma.DocenteUpdateWithoutUsuarioInput, Prisma.DocenteUncheckedUpdateWithoutUsuarioInput>;
};
export type DocenteUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
    procesosAsesorados?: Prisma.ProcesoGradoUpdateManyWithoutAsesorNestedInput;
};
export type DocenteUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
    procesosAsesorados?: Prisma.ProcesoGradoUncheckedUpdateManyWithoutAsesorNestedInput;
};
export type DocenteCreateWithoutProcesosAsesoradosInput = {
    id?: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutDocenteInput;
};
export type DocenteUncheckedCreateWithoutProcesosAsesoradosInput = {
    id?: string;
    usuarioId: string;
    tipo: $Enums.TipoDocente;
    especialidad: string;
};
export type DocenteCreateOrConnectWithoutProcesosAsesoradosInput = {
    where: Prisma.DocenteWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocenteCreateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedCreateWithoutProcesosAsesoradosInput>;
};
export type DocenteUpsertWithoutProcesosAsesoradosInput = {
    update: Prisma.XOR<Prisma.DocenteUpdateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedUpdateWithoutProcesosAsesoradosInput>;
    create: Prisma.XOR<Prisma.DocenteCreateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedCreateWithoutProcesosAsesoradosInput>;
    where?: Prisma.DocenteWhereInput;
};
export type DocenteUpdateToOneWithWhereWithoutProcesosAsesoradosInput = {
    where?: Prisma.DocenteWhereInput;
    data: Prisma.XOR<Prisma.DocenteUpdateWithoutProcesosAsesoradosInput, Prisma.DocenteUncheckedUpdateWithoutProcesosAsesoradosInput>;
};
export type DocenteUpdateWithoutProcesosAsesoradosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutDocenteNestedInput;
};
export type DocenteUncheckedUpdateWithoutProcesosAsesoradosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    tipo?: Prisma.EnumTipoDocenteFieldUpdateOperationsInput | $Enums.TipoDocente;
    especialidad?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DocenteCountOutputType = {
    procesosAsesorados: number;
};
export type DocenteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesosAsesorados?: boolean | DocenteCountOutputTypeCountProcesosAsesoradosArgs;
};
export type DocenteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteCountOutputTypeSelect<ExtArgs> | null;
};
export type DocenteCountOutputTypeCountProcesosAsesoradosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcesoGradoWhereInput;
};
export type DocenteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    tipo?: boolean;
    especialidad?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesosAsesorados?: boolean | Prisma.Docente$procesosAsesoradosArgs<ExtArgs>;
    _count?: boolean | Prisma.DocenteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["docente"]>;
export type DocenteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    tipo?: boolean;
    especialidad?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["docente"]>;
export type DocenteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    tipo?: boolean;
    especialidad?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["docente"]>;
export type DocenteSelectScalar = {
    id?: boolean;
    usuarioId?: boolean;
    tipo?: boolean;
    especialidad?: boolean;
};
export type DocenteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "usuarioId" | "tipo" | "especialidad", ExtArgs["result"]["docente"]>;
export type DocenteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesosAsesorados?: boolean | Prisma.Docente$procesosAsesoradosArgs<ExtArgs>;
    _count?: boolean | Prisma.DocenteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DocenteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type DocenteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $DocentePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Docente";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        procesosAsesorados: Prisma.$ProcesoGradoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        usuarioId: string;
        tipo: $Enums.TipoDocente;
        especialidad: string;
    }, ExtArgs["result"]["docente"]>;
    composites: {};
};
export type DocenteGetPayload<S extends boolean | null | undefined | DocenteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DocentePayload, S>;
export type DocenteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DocenteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocenteCountAggregateInputType | true;
};
export interface DocenteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Docente'];
        meta: {
            name: 'Docente';
        };
    };
    findUnique<T extends DocenteFindUniqueArgs>(args: Prisma.SelectSubset<T, DocenteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DocenteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DocenteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DocenteFindFirstArgs>(args?: Prisma.SelectSubset<T, DocenteFindFirstArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DocenteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DocenteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DocenteFindManyArgs>(args?: Prisma.SelectSubset<T, DocenteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DocenteCreateArgs>(args: Prisma.SelectSubset<T, DocenteCreateArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DocenteCreateManyArgs>(args?: Prisma.SelectSubset<T, DocenteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DocenteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DocenteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DocenteDeleteArgs>(args: Prisma.SelectSubset<T, DocenteDeleteArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DocenteUpdateArgs>(args: Prisma.SelectSubset<T, DocenteUpdateArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DocenteDeleteManyArgs>(args?: Prisma.SelectSubset<T, DocenteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DocenteUpdateManyArgs>(args: Prisma.SelectSubset<T, DocenteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DocenteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DocenteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DocenteUpsertArgs>(args: Prisma.SelectSubset<T, DocenteUpsertArgs<ExtArgs>>): Prisma.Prisma__DocenteClient<runtime.Types.Result.GetResult<Prisma.$DocentePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DocenteCountArgs>(args?: Prisma.Subset<T, DocenteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DocenteCountAggregateOutputType> : number>;
    aggregate<T extends DocenteAggregateArgs>(args: Prisma.Subset<T, DocenteAggregateArgs>): Prisma.PrismaPromise<GetDocenteAggregateType<T>>;
    groupBy<T extends DocenteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DocenteGroupByArgs['orderBy'];
    } : {
        orderBy?: DocenteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DocenteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocenteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DocenteFieldRefs;
}
export interface Prisma__DocenteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    procesosAsesorados<T extends Prisma.Docente$procesosAsesoradosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Docente$procesosAsesoradosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DocenteFieldRefs {
    readonly id: Prisma.FieldRef<"Docente", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Docente", 'String'>;
    readonly tipo: Prisma.FieldRef<"Docente", 'TipoDocente'>;
    readonly especialidad: Prisma.FieldRef<"Docente", 'String'>;
}
export type DocenteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where: Prisma.DocenteWhereUniqueInput;
};
export type DocenteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where: Prisma.DocenteWhereUniqueInput;
};
export type DocenteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where?: Prisma.DocenteWhereInput;
    orderBy?: Prisma.DocenteOrderByWithRelationInput | Prisma.DocenteOrderByWithRelationInput[];
    cursor?: Prisma.DocenteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocenteScalarFieldEnum | Prisma.DocenteScalarFieldEnum[];
};
export type DocenteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where?: Prisma.DocenteWhereInput;
    orderBy?: Prisma.DocenteOrderByWithRelationInput | Prisma.DocenteOrderByWithRelationInput[];
    cursor?: Prisma.DocenteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocenteScalarFieldEnum | Prisma.DocenteScalarFieldEnum[];
};
export type DocenteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where?: Prisma.DocenteWhereInput;
    orderBy?: Prisma.DocenteOrderByWithRelationInput | Prisma.DocenteOrderByWithRelationInput[];
    cursor?: Prisma.DocenteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocenteScalarFieldEnum | Prisma.DocenteScalarFieldEnum[];
};
export type DocenteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocenteCreateInput, Prisma.DocenteUncheckedCreateInput>;
};
export type DocenteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DocenteCreateManyInput | Prisma.DocenteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DocenteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    data: Prisma.DocenteCreateManyInput | Prisma.DocenteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DocenteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DocenteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocenteUpdateInput, Prisma.DocenteUncheckedUpdateInput>;
    where: Prisma.DocenteWhereUniqueInput;
};
export type DocenteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DocenteUpdateManyMutationInput, Prisma.DocenteUncheckedUpdateManyInput>;
    where?: Prisma.DocenteWhereInput;
    limit?: number;
};
export type DocenteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocenteUpdateManyMutationInput, Prisma.DocenteUncheckedUpdateManyInput>;
    where?: Prisma.DocenteWhereInput;
    limit?: number;
    include?: Prisma.DocenteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DocenteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where: Prisma.DocenteWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocenteCreateInput, Prisma.DocenteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DocenteUpdateInput, Prisma.DocenteUncheckedUpdateInput>;
};
export type DocenteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
    where: Prisma.DocenteWhereUniqueInput;
};
export type DocenteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocenteWhereInput;
    limit?: number;
};
export type Docente$procesosAsesoradosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DocenteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocenteSelect<ExtArgs> | null;
    omit?: Prisma.DocenteOmit<ExtArgs> | null;
    include?: Prisma.DocenteInclude<ExtArgs> | null;
};
