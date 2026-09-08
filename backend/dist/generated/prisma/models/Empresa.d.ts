import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmpresaModel = runtime.Types.Result.DefaultSelection<Prisma.$EmpresaPayload>;
export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null;
    _min: EmpresaMinAggregateOutputType | null;
    _max: EmpresaMaxAggregateOutputType | null;
};
export type EmpresaMinAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    nombreEmpresa: string | null;
    nit: string | null;
    sector: string | null;
};
export type EmpresaMaxAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    nombreEmpresa: string | null;
    nit: string | null;
    sector: string | null;
};
export type EmpresaCountAggregateOutputType = {
    id: number;
    usuarioId: number;
    nombreEmpresa: number;
    nit: number;
    sector: number;
    _all: number;
};
export type EmpresaMinAggregateInputType = {
    id?: true;
    usuarioId?: true;
    nombreEmpresa?: true;
    nit?: true;
    sector?: true;
};
export type EmpresaMaxAggregateInputType = {
    id?: true;
    usuarioId?: true;
    nombreEmpresa?: true;
    nit?: true;
    sector?: true;
};
export type EmpresaCountAggregateInputType = {
    id?: true;
    usuarioId?: true;
    nombreEmpresa?: true;
    nit?: true;
    sector?: true;
    _all?: true;
};
export type EmpresaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmpresaCountAggregateInputType;
    _min?: EmpresaMinAggregateInputType;
    _max?: EmpresaMaxAggregateInputType;
};
export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
    [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmpresa[P]> : Prisma.GetScalarType<T[P], AggregateEmpresa[P]>;
};
export type EmpresaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithAggregationInput | Prisma.EmpresaOrderByWithAggregationInput[];
    by: Prisma.EmpresaScalarFieldEnum[] | Prisma.EmpresaScalarFieldEnum;
    having?: Prisma.EmpresaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmpresaCountAggregateInputType | true;
    _min?: EmpresaMinAggregateInputType;
    _max?: EmpresaMaxAggregateInputType;
};
export type EmpresaGroupByOutputType = {
    id: string;
    usuarioId: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    _count: EmpresaCountAggregateOutputType | null;
    _min: EmpresaMinAggregateOutputType | null;
    _max: EmpresaMaxAggregateOutputType | null;
};
export type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmpresaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmpresaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmpresaGroupByOutputType[P]>;
}>>;
export type EmpresaWhereInput = {
    AND?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    OR?: Prisma.EmpresaWhereInput[];
    NOT?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    id?: Prisma.StringFilter<"Empresa"> | string;
    usuarioId?: Prisma.StringFilter<"Empresa"> | string;
    nombreEmpresa?: Prisma.StringFilter<"Empresa"> | string;
    nit?: Prisma.StringFilter<"Empresa"> | string;
    sector?: Prisma.StringFilter<"Empresa"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    ofertas?: Prisma.OfertaListRelationFilter;
};
export type EmpresaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    nombreEmpresa?: Prisma.SortOrder;
    nit?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    ofertas?: Prisma.OfertaOrderByRelationAggregateInput;
};
export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    usuarioId?: string;
    nit?: string;
    AND?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    OR?: Prisma.EmpresaWhereInput[];
    NOT?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    nombreEmpresa?: Prisma.StringFilter<"Empresa"> | string;
    sector?: Prisma.StringFilter<"Empresa"> | string;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    ofertas?: Prisma.OfertaListRelationFilter;
}, "id" | "usuarioId" | "nit">;
export type EmpresaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    nombreEmpresa?: Prisma.SortOrder;
    nit?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
    _count?: Prisma.EmpresaCountOrderByAggregateInput;
    _max?: Prisma.EmpresaMaxOrderByAggregateInput;
    _min?: Prisma.EmpresaMinOrderByAggregateInput;
};
export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmpresaScalarWhereWithAggregatesInput | Prisma.EmpresaScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmpresaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmpresaScalarWhereWithAggregatesInput | Prisma.EmpresaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    nombreEmpresa?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    nit?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    sector?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
};
export type EmpresaCreateInput = {
    id?: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutEmpresaInput;
    ofertas?: Prisma.OfertaCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateInput = {
    id?: string;
    usuarioId: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    ofertas?: Prisma.OfertaUncheckedCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutEmpresaNestedInput;
    ofertas?: Prisma.OfertaUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertas?: Prisma.OfertaUncheckedUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaCreateManyInput = {
    id?: string;
    usuarioId: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
};
export type EmpresaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EmpresaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EmpresaNullableScalarRelationFilter = {
    is?: Prisma.EmpresaWhereInput | null;
    isNot?: Prisma.EmpresaWhereInput | null;
};
export type EmpresaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    nombreEmpresa?: Prisma.SortOrder;
    nit?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
};
export type EmpresaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    nombreEmpresa?: Prisma.SortOrder;
    nit?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
};
export type EmpresaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    nombreEmpresa?: Prisma.SortOrder;
    nit?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
};
export type EmpresaScalarRelationFilter = {
    is?: Prisma.EmpresaWhereInput;
    isNot?: Prisma.EmpresaWhereInput;
};
export type EmpresaCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.EmpresaUpsertWithoutUsuarioInput;
    disconnect?: Prisma.EmpresaWhereInput | boolean;
    delete?: Prisma.EmpresaWhereInput | boolean;
    connect?: Prisma.EmpresaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmpresaUpdateToOneWithWhereWithoutUsuarioInput, Prisma.EmpresaUpdateWithoutUsuarioInput>, Prisma.EmpresaUncheckedUpdateWithoutUsuarioInput>;
};
export type EmpresaUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.EmpresaUpsertWithoutUsuarioInput;
    disconnect?: Prisma.EmpresaWhereInput | boolean;
    delete?: Prisma.EmpresaWhereInput | boolean;
    connect?: Prisma.EmpresaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmpresaUpdateToOneWithWhereWithoutUsuarioInput, Prisma.EmpresaUpdateWithoutUsuarioInput>, Prisma.EmpresaUncheckedUpdateWithoutUsuarioInput>;
};
export type EmpresaCreateNestedOneWithoutOfertasInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutOfertasInput, Prisma.EmpresaUncheckedCreateWithoutOfertasInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutOfertasInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateOneRequiredWithoutOfertasNestedInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutOfertasInput, Prisma.EmpresaUncheckedCreateWithoutOfertasInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutOfertasInput;
    upsert?: Prisma.EmpresaUpsertWithoutOfertasInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmpresaUpdateToOneWithWhereWithoutOfertasInput, Prisma.EmpresaUpdateWithoutOfertasInput>, Prisma.EmpresaUncheckedUpdateWithoutOfertasInput>;
};
export type EmpresaCreateWithoutUsuarioInput = {
    id?: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    ofertas?: Prisma.OfertaCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    ofertas?: Prisma.OfertaUncheckedCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
};
export type EmpresaUpsertWithoutUsuarioInput = {
    update: Prisma.XOR<Prisma.EmpresaUpdateWithoutUsuarioInput, Prisma.EmpresaUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuarioInput, Prisma.EmpresaUncheckedCreateWithoutUsuarioInput>;
    where?: Prisma.EmpresaWhereInput;
};
export type EmpresaUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: Prisma.EmpresaWhereInput;
    data: Prisma.XOR<Prisma.EmpresaUpdateWithoutUsuarioInput, Prisma.EmpresaUncheckedUpdateWithoutUsuarioInput>;
};
export type EmpresaUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertas?: Prisma.OfertaUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
    ofertas?: Prisma.OfertaUncheckedUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaCreateWithoutOfertasInput = {
    id?: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
    usuario: Prisma.UsuarioCreateNestedOneWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateWithoutOfertasInput = {
    id?: string;
    usuarioId: string;
    nombreEmpresa: string;
    nit: string;
    sector: string;
};
export type EmpresaCreateOrConnectWithoutOfertasInput = {
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutOfertasInput, Prisma.EmpresaUncheckedCreateWithoutOfertasInput>;
};
export type EmpresaUpsertWithoutOfertasInput = {
    update: Prisma.XOR<Prisma.EmpresaUpdateWithoutOfertasInput, Prisma.EmpresaUncheckedUpdateWithoutOfertasInput>;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutOfertasInput, Prisma.EmpresaUncheckedCreateWithoutOfertasInput>;
    where?: Prisma.EmpresaWhereInput;
};
export type EmpresaUpdateToOneWithWhereWithoutOfertasInput = {
    where?: Prisma.EmpresaWhereInput;
    data: Prisma.XOR<Prisma.EmpresaUpdateWithoutOfertasInput, Prisma.EmpresaUncheckedUpdateWithoutOfertasInput>;
};
export type EmpresaUpdateWithoutOfertasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateWithoutOfertasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    nombreEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    nit?: Prisma.StringFieldUpdateOperationsInput | string;
    sector?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EmpresaCountOutputType = {
    ofertas: number;
};
export type EmpresaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ofertas?: boolean | EmpresaCountOutputTypeCountOfertasArgs;
};
export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaCountOutputTypeSelect<ExtArgs> | null;
};
export type EmpresaCountOutputTypeCountOfertasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfertaWhereInput;
};
export type EmpresaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    nombreEmpresa?: boolean;
    nit?: boolean;
    sector?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    ofertas?: boolean | Prisma.Empresa$ofertasArgs<ExtArgs>;
    _count?: boolean | Prisma.EmpresaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    nombreEmpresa?: boolean;
    nit?: boolean;
    sector?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    nombreEmpresa?: boolean;
    nit?: boolean;
    sector?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectScalar = {
    id?: boolean;
    usuarioId?: boolean;
    nombreEmpresa?: boolean;
    nit?: boolean;
    sector?: boolean;
};
export type EmpresaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "usuarioId" | "nombreEmpresa" | "nit" | "sector", ExtArgs["result"]["empresa"]>;
export type EmpresaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    ofertas?: boolean | Prisma.Empresa$ofertasArgs<ExtArgs>;
    _count?: boolean | Prisma.EmpresaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EmpresaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type EmpresaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $EmpresaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Empresa";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        ofertas: Prisma.$OfertaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        usuarioId: string;
        nombreEmpresa: string;
        nit: string;
        sector: string;
    }, ExtArgs["result"]["empresa"]>;
    composites: {};
};
export type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmpresaPayload, S>;
export type EmpresaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmpresaCountAggregateInputType | true;
};
export interface EmpresaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Empresa'];
        meta: {
            name: 'Empresa';
        };
    };
    findUnique<T extends EmpresaFindUniqueArgs>(args: Prisma.SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmpresaFindFirstArgs>(args?: Prisma.SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmpresaFindManyArgs>(args?: Prisma.SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmpresaCreateArgs>(args: Prisma.SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmpresaCreateManyArgs>(args?: Prisma.SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmpresaDeleteArgs>(args: Prisma.SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmpresaUpdateArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmpresaUpdateManyArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmpresaUpsertArgs>(args: Prisma.SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmpresaCountArgs>(args?: Prisma.Subset<T, EmpresaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmpresaCountAggregateOutputType> : number>;
    aggregate<T extends EmpresaAggregateArgs>(args: Prisma.Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>;
    groupBy<T extends EmpresaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmpresaGroupByArgs['orderBy'];
    } : {
        orderBy?: EmpresaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmpresaFieldRefs;
}
export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    ofertas<T extends Prisma.Empresa$ofertasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Empresa$ofertasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmpresaFieldRefs {
    readonly id: Prisma.FieldRef<"Empresa", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Empresa", 'String'>;
    readonly nombreEmpresa: Prisma.FieldRef<"Empresa", 'String'>;
    readonly nit: Prisma.FieldRef<"Empresa", 'String'>;
    readonly sector: Prisma.FieldRef<"Empresa", 'String'>;
}
export type EmpresaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaCreateInput, Prisma.EmpresaUncheckedCreateInput>;
};
export type EmpresaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmpresaCreateManyInput | Prisma.EmpresaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmpresaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    data: Prisma.EmpresaCreateManyInput | Prisma.EmpresaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EmpresaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EmpresaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaUpdateInput, Prisma.EmpresaUncheckedUpdateInput>;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmpresaUpdateManyMutationInput, Prisma.EmpresaUncheckedUpdateManyInput>;
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
};
export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaUpdateManyMutationInput, Prisma.EmpresaUncheckedUpdateManyInput>;
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
    include?: Prisma.EmpresaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EmpresaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateInput, Prisma.EmpresaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmpresaUpdateInput, Prisma.EmpresaUncheckedUpdateInput>;
};
export type EmpresaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
};
export type Empresa$ofertasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EmpresaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
};
