import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EstudianteModel = runtime.Types.Result.DefaultSelection<Prisma.$EstudiantePayload>;
export type AggregateEstudiante = {
    _count: EstudianteCountAggregateOutputType | null;
    _avg: EstudianteAvgAggregateOutputType | null;
    _sum: EstudianteSumAggregateOutputType | null;
    _min: EstudianteMinAggregateOutputType | null;
    _max: EstudianteMaxAggregateOutputType | null;
};
export type EstudianteAvgAggregateOutputType = {
    semestre: number | null;
};
export type EstudianteSumAggregateOutputType = {
    semestre: number | null;
};
export type EstudianteMinAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    codigo: string | null;
    programa: string | null;
    semestre: number | null;
};
export type EstudianteMaxAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    codigo: string | null;
    programa: string | null;
    semestre: number | null;
};
export type EstudianteCountAggregateOutputType = {
    id: number;
    usuarioId: number;
    codigo: number;
    programa: number;
    semestre: number;
    _all: number;
};
export type EstudianteAvgAggregateInputType = {
    semestre?: true;
};
export type EstudianteSumAggregateInputType = {
    semestre?: true;
};
export type EstudianteMinAggregateInputType = {
    id?: true;
    usuarioId?: true;
    codigo?: true;
    programa?: true;
    semestre?: true;
};
export type EstudianteMaxAggregateInputType = {
    id?: true;
    usuarioId?: true;
    codigo?: true;
    programa?: true;
    semestre?: true;
};
export type EstudianteCountAggregateInputType = {
    id?: true;
    usuarioId?: true;
    codigo?: true;
    programa?: true;
    semestre?: true;
    _all?: true;
};
export type EstudianteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithRelationInput | Prisma.EstudianteOrderByWithRelationInput[];
    cursor?: Prisma.EstudianteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EstudianteCountAggregateInputType;
    _avg?: EstudianteAvgAggregateInputType;
    _sum?: EstudianteSumAggregateInputType;
    _min?: EstudianteMinAggregateInputType;
    _max?: EstudianteMaxAggregateInputType;
};
export type GetEstudianteAggregateType<T extends EstudianteAggregateArgs> = {
    [P in keyof T & keyof AggregateEstudiante]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEstudiante[P]> : Prisma.GetScalarType<T[P], AggregateEstudiante[P]>;
};
export type EstudianteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithAggregationInput | Prisma.EstudianteOrderByWithAggregationInput[];
    by: Prisma.EstudianteScalarFieldEnum[] | Prisma.EstudianteScalarFieldEnum;
    having?: Prisma.EstudianteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EstudianteCountAggregateInputType | true;
    _avg?: EstudianteAvgAggregateInputType;
    _sum?: EstudianteSumAggregateInputType;
    _min?: EstudianteMinAggregateInputType;
    _max?: EstudianteMaxAggregateInputType;
};
export type EstudianteGroupByOutputType = {
    id: string;
    usuarioId: string;
    codigo: string;
    programa: string;
    semestre: number | null;
    _count: EstudianteCountAggregateOutputType | null;
    _avg: EstudianteAvgAggregateOutputType | null;
    _sum: EstudianteSumAggregateOutputType | null;
    _min: EstudianteMinAggregateOutputType | null;
    _max: EstudianteMaxAggregateOutputType | null;
};
export type GetEstudianteGroupByPayload<T extends EstudianteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EstudianteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EstudianteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EstudianteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EstudianteGroupByOutputType[P]>;
}>>;
export type EstudianteWhereInput = {
    AND?: Prisma.EstudianteWhereInput | Prisma.EstudianteWhereInput[];
    OR?: Prisma.EstudianteWhereInput[];
    NOT?: Prisma.EstudianteWhereInput | Prisma.EstudianteWhereInput[];
    id?: Prisma.StringFilter<"Estudiante"> | string;
    usuarioId?: Prisma.StringFilter<"Estudiante"> | string;
    codigo?: Prisma.StringFilter<"Estudiante"> | string;
    programa?: Prisma.StringFilter<"Estudiante"> | string;
    semestre?: Prisma.IntNullableFilter<"Estudiante"> | number | null;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoNullableScalarRelationFilter, Prisma.ProcesoGradoWhereInput> | null;
    postulaciones?: Prisma.PostulacionListRelationFilter;
};
export type EstudianteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    programa?: Prisma.SortOrder;
    semestre?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario?: Prisma.UsuarioOrderByWithRelationInput;
    procesoGrado?: Prisma.ProcesoGradoOrderByWithRelationInput;
    postulaciones?: Prisma.PostulacionOrderByRelationAggregateInput;
};
export type EstudianteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    usuarioId?: string;
    codigo?: string;
    AND?: Prisma.EstudianteWhereInput | Prisma.EstudianteWhereInput[];
    OR?: Prisma.EstudianteWhereInput[];
    NOT?: Prisma.EstudianteWhereInput | Prisma.EstudianteWhereInput[];
    programa?: Prisma.StringFilter<"Estudiante"> | string;
    semestre?: Prisma.IntNullableFilter<"Estudiante"> | number | null;
    usuario?: Prisma.XOR<Prisma.UsuarioScalarRelationFilter, Prisma.UsuarioWhereInput>;
    procesoGrado?: Prisma.XOR<Prisma.ProcesoGradoNullableScalarRelationFilter, Prisma.ProcesoGradoWhereInput> | null;
    postulaciones?: Prisma.PostulacionListRelationFilter;
}, "id" | "usuarioId" | "codigo">;
export type EstudianteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    programa?: Prisma.SortOrder;
    semestre?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.EstudianteCountOrderByAggregateInput;
    _avg?: Prisma.EstudianteAvgOrderByAggregateInput;
    _max?: Prisma.EstudianteMaxOrderByAggregateInput;
    _min?: Prisma.EstudianteMinOrderByAggregateInput;
    _sum?: Prisma.EstudianteSumOrderByAggregateInput;
};
export type EstudianteScalarWhereWithAggregatesInput = {
    AND?: Prisma.EstudianteScalarWhereWithAggregatesInput | Prisma.EstudianteScalarWhereWithAggregatesInput[];
    OR?: Prisma.EstudianteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EstudianteScalarWhereWithAggregatesInput | Prisma.EstudianteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Estudiante"> | string;
    usuarioId?: Prisma.StringWithAggregatesFilter<"Estudiante"> | string;
    codigo?: Prisma.StringWithAggregatesFilter<"Estudiante"> | string;
    programa?: Prisma.StringWithAggregatesFilter<"Estudiante"> | string;
    semestre?: Prisma.IntNullableWithAggregatesFilter<"Estudiante"> | number | null;
};
export type EstudianteCreateInput = {
    id?: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    usuario: Prisma.UsuarioCreateNestedOneWithoutEstudianteInput;
    procesoGrado?: Prisma.ProcesoGradoCreateNestedOneWithoutEstudianteInput;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteUncheckedCreateInput = {
    id?: string;
    usuarioId: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedCreateNestedOneWithoutEstudianteInput;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutEstudianteNestedInput;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneWithoutEstudianteNestedInput;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedUpdateOneWithoutEstudianteNestedInput;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteCreateManyInput = {
    id?: string;
    usuarioId: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
};
export type EstudianteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type EstudianteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type EstudianteNullableScalarRelationFilter = {
    is?: Prisma.EstudianteWhereInput | null;
    isNot?: Prisma.EstudianteWhereInput | null;
};
export type EstudianteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    programa?: Prisma.SortOrder;
    semestre?: Prisma.SortOrder;
};
export type EstudianteAvgOrderByAggregateInput = {
    semestre?: Prisma.SortOrder;
};
export type EstudianteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    programa?: Prisma.SortOrder;
    semestre?: Prisma.SortOrder;
};
export type EstudianteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuarioId?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    programa?: Prisma.SortOrder;
    semestre?: Prisma.SortOrder;
};
export type EstudianteSumOrderByAggregateInput = {
    semestre?: Prisma.SortOrder;
};
export type EstudianteScalarRelationFilter = {
    is?: Prisma.EstudianteWhereInput;
    isNot?: Prisma.EstudianteWhereInput;
};
export type EstudianteCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutUsuarioInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.EstudianteUpsertWithoutUsuarioInput;
    disconnect?: Prisma.EstudianteWhereInput | boolean;
    delete?: Prisma.EstudianteWhereInput | boolean;
    connect?: Prisma.EstudianteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EstudianteUpdateToOneWithWhereWithoutUsuarioInput, Prisma.EstudianteUpdateWithoutUsuarioInput>, Prisma.EstudianteUncheckedUpdateWithoutUsuarioInput>;
};
export type EstudianteUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutUsuarioInput;
    upsert?: Prisma.EstudianteUpsertWithoutUsuarioInput;
    disconnect?: Prisma.EstudianteWhereInput | boolean;
    delete?: Prisma.EstudianteWhereInput | boolean;
    connect?: Prisma.EstudianteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EstudianteUpdateToOneWithWhereWithoutUsuarioInput, Prisma.EstudianteUpdateWithoutUsuarioInput>, Prisma.EstudianteUncheckedUpdateWithoutUsuarioInput>;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EstudianteCreateNestedOneWithoutProcesoGradoInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutProcesoGradoInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteUpdateOneRequiredWithoutProcesoGradoNestedInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedCreateWithoutProcesoGradoInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutProcesoGradoInput;
    upsert?: Prisma.EstudianteUpsertWithoutProcesoGradoInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EstudianteUpdateToOneWithWhereWithoutProcesoGradoInput, Prisma.EstudianteUpdateWithoutProcesoGradoInput>, Prisma.EstudianteUncheckedUpdateWithoutProcesoGradoInput>;
};
export type EstudianteCreateNestedOneWithoutPostulacionesInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutPostulacionesInput, Prisma.EstudianteUncheckedCreateWithoutPostulacionesInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutPostulacionesInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteUpdateOneRequiredWithoutPostulacionesNestedInput = {
    create?: Prisma.XOR<Prisma.EstudianteCreateWithoutPostulacionesInput, Prisma.EstudianteUncheckedCreateWithoutPostulacionesInput>;
    connectOrCreate?: Prisma.EstudianteCreateOrConnectWithoutPostulacionesInput;
    upsert?: Prisma.EstudianteUpsertWithoutPostulacionesInput;
    connect?: Prisma.EstudianteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EstudianteUpdateToOneWithWhereWithoutPostulacionesInput, Prisma.EstudianteUpdateWithoutPostulacionesInput>, Prisma.EstudianteUncheckedUpdateWithoutPostulacionesInput>;
};
export type EstudianteCreateWithoutUsuarioInput = {
    id?: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    procesoGrado?: Prisma.ProcesoGradoCreateNestedOneWithoutEstudianteInput;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedCreateNestedOneWithoutEstudianteInput;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteCreateOrConnectWithoutUsuarioInput = {
    where: Prisma.EstudianteWhereUniqueInput;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
};
export type EstudianteUpsertWithoutUsuarioInput = {
    update: Prisma.XOR<Prisma.EstudianteUpdateWithoutUsuarioInput, Prisma.EstudianteUncheckedUpdateWithoutUsuarioInput>;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutUsuarioInput, Prisma.EstudianteUncheckedCreateWithoutUsuarioInput>;
    where?: Prisma.EstudianteWhereInput;
};
export type EstudianteUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: Prisma.EstudianteWhereInput;
    data: Prisma.XOR<Prisma.EstudianteUpdateWithoutUsuarioInput, Prisma.EstudianteUncheckedUpdateWithoutUsuarioInput>;
};
export type EstudianteUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneWithoutEstudianteNestedInput;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteUncheckedUpdateWithoutUsuarioInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedUpdateOneWithoutEstudianteNestedInput;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteCreateWithoutProcesoGradoInput = {
    id?: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    usuario: Prisma.UsuarioCreateNestedOneWithoutEstudianteInput;
    postulaciones?: Prisma.PostulacionCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteUncheckedCreateWithoutProcesoGradoInput = {
    id?: string;
    usuarioId: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    postulaciones?: Prisma.PostulacionUncheckedCreateNestedManyWithoutEstudianteInput;
};
export type EstudianteCreateOrConnectWithoutProcesoGradoInput = {
    where: Prisma.EstudianteWhereUniqueInput;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedCreateWithoutProcesoGradoInput>;
};
export type EstudianteUpsertWithoutProcesoGradoInput = {
    update: Prisma.XOR<Prisma.EstudianteUpdateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedUpdateWithoutProcesoGradoInput>;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedCreateWithoutProcesoGradoInput>;
    where?: Prisma.EstudianteWhereInput;
};
export type EstudianteUpdateToOneWithWhereWithoutProcesoGradoInput = {
    where?: Prisma.EstudianteWhereInput;
    data: Prisma.XOR<Prisma.EstudianteUpdateWithoutProcesoGradoInput, Prisma.EstudianteUncheckedUpdateWithoutProcesoGradoInput>;
};
export type EstudianteUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutEstudianteNestedInput;
    postulaciones?: Prisma.PostulacionUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteUncheckedUpdateWithoutProcesoGradoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    postulaciones?: Prisma.PostulacionUncheckedUpdateManyWithoutEstudianteNestedInput;
};
export type EstudianteCreateWithoutPostulacionesInput = {
    id?: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    usuario: Prisma.UsuarioCreateNestedOneWithoutEstudianteInput;
    procesoGrado?: Prisma.ProcesoGradoCreateNestedOneWithoutEstudianteInput;
};
export type EstudianteUncheckedCreateWithoutPostulacionesInput = {
    id?: string;
    usuarioId: string;
    codigo: string;
    programa: string;
    semestre?: number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedCreateNestedOneWithoutEstudianteInput;
};
export type EstudianteCreateOrConnectWithoutPostulacionesInput = {
    where: Prisma.EstudianteWhereUniqueInput;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutPostulacionesInput, Prisma.EstudianteUncheckedCreateWithoutPostulacionesInput>;
};
export type EstudianteUpsertWithoutPostulacionesInput = {
    update: Prisma.XOR<Prisma.EstudianteUpdateWithoutPostulacionesInput, Prisma.EstudianteUncheckedUpdateWithoutPostulacionesInput>;
    create: Prisma.XOR<Prisma.EstudianteCreateWithoutPostulacionesInput, Prisma.EstudianteUncheckedCreateWithoutPostulacionesInput>;
    where?: Prisma.EstudianteWhereInput;
};
export type EstudianteUpdateToOneWithWhereWithoutPostulacionesInput = {
    where?: Prisma.EstudianteWhereInput;
    data: Prisma.XOR<Prisma.EstudianteUpdateWithoutPostulacionesInput, Prisma.EstudianteUncheckedUpdateWithoutPostulacionesInput>;
};
export type EstudianteUpdateWithoutPostulacionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario?: Prisma.UsuarioUpdateOneRequiredWithoutEstudianteNestedInput;
    procesoGrado?: Prisma.ProcesoGradoUpdateOneWithoutEstudianteNestedInput;
};
export type EstudianteUncheckedUpdateWithoutPostulacionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usuarioId?: Prisma.StringFieldUpdateOperationsInput | string;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    programa?: Prisma.StringFieldUpdateOperationsInput | string;
    semestre?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    procesoGrado?: Prisma.ProcesoGradoUncheckedUpdateOneWithoutEstudianteNestedInput;
};
export type EstudianteCountOutputType = {
    postulaciones: number;
};
export type EstudianteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    postulaciones?: boolean | EstudianteCountOutputTypeCountPostulacionesArgs;
};
export type EstudianteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteCountOutputTypeSelect<ExtArgs> | null;
};
export type EstudianteCountOutputTypeCountPostulacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostulacionWhereInput;
};
export type EstudianteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    codigo?: boolean;
    programa?: boolean;
    semestre?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesoGrado?: boolean | Prisma.Estudiante$procesoGradoArgs<ExtArgs>;
    postulaciones?: boolean | Prisma.Estudiante$postulacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.EstudianteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["estudiante"]>;
export type EstudianteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    codigo?: boolean;
    programa?: boolean;
    semestre?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["estudiante"]>;
export type EstudianteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuarioId?: boolean;
    codigo?: boolean;
    programa?: boolean;
    semestre?: boolean;
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["estudiante"]>;
export type EstudianteSelectScalar = {
    id?: boolean;
    usuarioId?: boolean;
    codigo?: boolean;
    programa?: boolean;
    semestre?: boolean;
};
export type EstudianteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "usuarioId" | "codigo" | "programa" | "semestre", ExtArgs["result"]["estudiante"]>;
export type EstudianteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
    procesoGrado?: boolean | Prisma.Estudiante$procesoGradoArgs<ExtArgs>;
    postulaciones?: boolean | Prisma.Estudiante$postulacionesArgs<ExtArgs>;
    _count?: boolean | Prisma.EstudianteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EstudianteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type EstudianteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usuario?: boolean | Prisma.UsuarioDefaultArgs<ExtArgs>;
};
export type $EstudiantePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Estudiante";
    objects: {
        usuario: Prisma.$UsuarioPayload<ExtArgs>;
        procesoGrado: Prisma.$ProcesoGradoPayload<ExtArgs> | null;
        postulaciones: Prisma.$PostulacionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        usuarioId: string;
        codigo: string;
        programa: string;
        semestre: number | null;
    }, ExtArgs["result"]["estudiante"]>;
    composites: {};
};
export type EstudianteGetPayload<S extends boolean | null | undefined | EstudianteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EstudiantePayload, S>;
export type EstudianteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EstudianteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EstudianteCountAggregateInputType | true;
};
export interface EstudianteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Estudiante'];
        meta: {
            name: 'Estudiante';
        };
    };
    findUnique<T extends EstudianteFindUniqueArgs>(args: Prisma.SelectSubset<T, EstudianteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EstudianteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EstudianteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EstudianteFindFirstArgs>(args?: Prisma.SelectSubset<T, EstudianteFindFirstArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EstudianteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EstudianteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EstudianteFindManyArgs>(args?: Prisma.SelectSubset<T, EstudianteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EstudianteCreateArgs>(args: Prisma.SelectSubset<T, EstudianteCreateArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EstudianteCreateManyArgs>(args?: Prisma.SelectSubset<T, EstudianteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EstudianteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EstudianteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EstudianteDeleteArgs>(args: Prisma.SelectSubset<T, EstudianteDeleteArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EstudianteUpdateArgs>(args: Prisma.SelectSubset<T, EstudianteUpdateArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EstudianteDeleteManyArgs>(args?: Prisma.SelectSubset<T, EstudianteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EstudianteUpdateManyArgs>(args: Prisma.SelectSubset<T, EstudianteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EstudianteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EstudianteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EstudianteUpsertArgs>(args: Prisma.SelectSubset<T, EstudianteUpsertArgs<ExtArgs>>): Prisma.Prisma__EstudianteClient<runtime.Types.Result.GetResult<Prisma.$EstudiantePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EstudianteCountArgs>(args?: Prisma.Subset<T, EstudianteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EstudianteCountAggregateOutputType> : number>;
    aggregate<T extends EstudianteAggregateArgs>(args: Prisma.Subset<T, EstudianteAggregateArgs>): Prisma.PrismaPromise<GetEstudianteAggregateType<T>>;
    groupBy<T extends EstudianteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EstudianteGroupByArgs['orderBy'];
    } : {
        orderBy?: EstudianteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EstudianteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstudianteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EstudianteFieldRefs;
}
export interface Prisma__EstudianteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends Prisma.UsuarioDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsuarioDefaultArgs<ExtArgs>>): Prisma.Prisma__UsuarioClient<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    procesoGrado<T extends Prisma.Estudiante$procesoGradoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Estudiante$procesoGradoArgs<ExtArgs>>): Prisma.Prisma__ProcesoGradoClient<runtime.Types.Result.GetResult<Prisma.$ProcesoGradoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    postulaciones<T extends Prisma.Estudiante$postulacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Estudiante$postulacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostulacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EstudianteFieldRefs {
    readonly id: Prisma.FieldRef<"Estudiante", 'String'>;
    readonly usuarioId: Prisma.FieldRef<"Estudiante", 'String'>;
    readonly codigo: Prisma.FieldRef<"Estudiante", 'String'>;
    readonly programa: Prisma.FieldRef<"Estudiante", 'String'>;
    readonly semestre: Prisma.FieldRef<"Estudiante", 'Int'>;
}
export type EstudianteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithRelationInput | Prisma.EstudianteOrderByWithRelationInput[];
    cursor?: Prisma.EstudianteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EstudianteScalarFieldEnum | Prisma.EstudianteScalarFieldEnum[];
};
export type EstudianteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithRelationInput | Prisma.EstudianteOrderByWithRelationInput[];
    cursor?: Prisma.EstudianteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EstudianteScalarFieldEnum | Prisma.EstudianteScalarFieldEnum[];
};
export type EstudianteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithRelationInput | Prisma.EstudianteOrderByWithRelationInput[];
    cursor?: Prisma.EstudianteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EstudianteScalarFieldEnum | Prisma.EstudianteScalarFieldEnum[];
};
export type EstudianteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EstudianteCreateInput, Prisma.EstudianteUncheckedCreateInput>;
};
export type EstudianteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EstudianteCreateManyInput | Prisma.EstudianteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EstudianteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    data: Prisma.EstudianteCreateManyInput | Prisma.EstudianteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EstudianteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EstudianteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EstudianteUpdateInput, Prisma.EstudianteUncheckedUpdateInput>;
    where: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EstudianteUpdateManyMutationInput, Prisma.EstudianteUncheckedUpdateManyInput>;
    where?: Prisma.EstudianteWhereInput;
    limit?: number;
};
export type EstudianteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EstudianteUpdateManyMutationInput, Prisma.EstudianteUncheckedUpdateManyInput>;
    where?: Prisma.EstudianteWhereInput;
    limit?: number;
    include?: Prisma.EstudianteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EstudianteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where: Prisma.EstudianteWhereUniqueInput;
    create: Prisma.XOR<Prisma.EstudianteCreateInput, Prisma.EstudianteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EstudianteUpdateInput, Prisma.EstudianteUncheckedUpdateInput>;
};
export type EstudianteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
    where: Prisma.EstudianteWhereUniqueInput;
};
export type EstudianteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EstudianteWhereInput;
    limit?: number;
};
export type Estudiante$procesoGradoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesoGradoSelect<ExtArgs> | null;
    omit?: Prisma.ProcesoGradoOmit<ExtArgs> | null;
    include?: Prisma.ProcesoGradoInclude<ExtArgs> | null;
    where?: Prisma.ProcesoGradoWhereInput;
};
export type Estudiante$postulacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EstudianteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EstudianteSelect<ExtArgs> | null;
    omit?: Prisma.EstudianteOmit<ExtArgs> | null;
    include?: Prisma.EstudianteInclude<ExtArgs> | null;
};
