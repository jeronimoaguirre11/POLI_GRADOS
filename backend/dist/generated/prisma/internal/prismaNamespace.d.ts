import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Coordinador: "Coordinador";
    readonly Usuario: "Usuario";
    readonly Estudiante: "Estudiante";
    readonly Empresa: "Empresa";
    readonly Docente: "Docente";
    readonly ProcesoGrado: "ProcesoGrado";
    readonly Investigacion: "Investigacion";
    readonly Diplomado: "Diplomado";
    readonly Practica: "Practica";
    readonly Oferta: "Oferta";
    readonly Postulacion: "Postulacion";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "coordinador" | "usuario" | "estudiante" | "empresa" | "docente" | "procesoGrado" | "investigacion" | "diplomado" | "practica" | "oferta" | "postulacion";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Coordinador: {
            payload: Prisma.$CoordinadorPayload<ExtArgs>;
            fields: Prisma.CoordinadorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CoordinadorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CoordinadorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                findFirst: {
                    args: Prisma.CoordinadorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CoordinadorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                findMany: {
                    args: Prisma.CoordinadorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>[];
                };
                create: {
                    args: Prisma.CoordinadorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                createMany: {
                    args: Prisma.CoordinadorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CoordinadorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>[];
                };
                delete: {
                    args: Prisma.CoordinadorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                update: {
                    args: Prisma.CoordinadorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                deleteMany: {
                    args: Prisma.CoordinadorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CoordinadorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CoordinadorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>[];
                };
                upsert: {
                    args: Prisma.CoordinadorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoordinadorPayload>;
                };
                aggregate: {
                    args: Prisma.CoordinadorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCoordinador>;
                };
                groupBy: {
                    args: Prisma.CoordinadorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoordinadorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CoordinadorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoordinadorCountAggregateOutputType> | number;
                };
            };
        };
        Usuario: {
            payload: Prisma.$UsuarioPayload<ExtArgs>;
            fields: Prisma.UsuarioFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UsuarioFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findFirst: {
                    args: Prisma.UsuarioFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findMany: {
                    args: Prisma.UsuarioFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                create: {
                    args: Prisma.UsuarioCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                createMany: {
                    args: Prisma.UsuarioCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                delete: {
                    args: Prisma.UsuarioDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                update: {
                    args: Prisma.UsuarioUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                deleteMany: {
                    args: Prisma.UsuarioDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UsuarioUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                upsert: {
                    args: Prisma.UsuarioUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                aggregate: {
                    args: Prisma.UsuarioAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuario>;
                };
                groupBy: {
                    args: Prisma.UsuarioGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UsuarioCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioCountAggregateOutputType> | number;
                };
            };
        };
        Estudiante: {
            payload: Prisma.$EstudiantePayload<ExtArgs>;
            fields: Prisma.EstudianteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EstudianteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EstudianteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                findFirst: {
                    args: Prisma.EstudianteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EstudianteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                findMany: {
                    args: Prisma.EstudianteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>[];
                };
                create: {
                    args: Prisma.EstudianteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                createMany: {
                    args: Prisma.EstudianteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EstudianteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>[];
                };
                delete: {
                    args: Prisma.EstudianteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                update: {
                    args: Prisma.EstudianteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                deleteMany: {
                    args: Prisma.EstudianteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EstudianteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EstudianteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>[];
                };
                upsert: {
                    args: Prisma.EstudianteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EstudiantePayload>;
                };
                aggregate: {
                    args: Prisma.EstudianteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEstudiante>;
                };
                groupBy: {
                    args: Prisma.EstudianteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EstudianteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EstudianteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EstudianteCountAggregateOutputType> | number;
                };
            };
        };
        Empresa: {
            payload: Prisma.$EmpresaPayload<ExtArgs>;
            fields: Prisma.EmpresaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmpresaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                findFirst: {
                    args: Prisma.EmpresaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                findMany: {
                    args: Prisma.EmpresaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>[];
                };
                create: {
                    args: Prisma.EmpresaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                createMany: {
                    args: Prisma.EmpresaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmpresaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>[];
                };
                delete: {
                    args: Prisma.EmpresaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                update: {
                    args: Prisma.EmpresaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                deleteMany: {
                    args: Prisma.EmpresaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmpresaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmpresaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>[];
                };
                upsert: {
                    args: Prisma.EmpresaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmpresaPayload>;
                };
                aggregate: {
                    args: Prisma.EmpresaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmpresa>;
                };
                groupBy: {
                    args: Prisma.EmpresaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmpresaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmpresaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmpresaCountAggregateOutputType> | number;
                };
            };
        };
        Docente: {
            payload: Prisma.$DocentePayload<ExtArgs>;
            fields: Prisma.DocenteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DocenteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DocenteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                findFirst: {
                    args: Prisma.DocenteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DocenteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                findMany: {
                    args: Prisma.DocenteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>[];
                };
                create: {
                    args: Prisma.DocenteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                createMany: {
                    args: Prisma.DocenteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DocenteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>[];
                };
                delete: {
                    args: Prisma.DocenteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                update: {
                    args: Prisma.DocenteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                deleteMany: {
                    args: Prisma.DocenteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DocenteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DocenteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>[];
                };
                upsert: {
                    args: Prisma.DocenteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocentePayload>;
                };
                aggregate: {
                    args: Prisma.DocenteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDocente>;
                };
                groupBy: {
                    args: Prisma.DocenteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocenteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DocenteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocenteCountAggregateOutputType> | number;
                };
            };
        };
        ProcesoGrado: {
            payload: Prisma.$ProcesoGradoPayload<ExtArgs>;
            fields: Prisma.ProcesoGradoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProcesoGradoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProcesoGradoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                findFirst: {
                    args: Prisma.ProcesoGradoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProcesoGradoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                findMany: {
                    args: Prisma.ProcesoGradoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>[];
                };
                create: {
                    args: Prisma.ProcesoGradoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                createMany: {
                    args: Prisma.ProcesoGradoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProcesoGradoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>[];
                };
                delete: {
                    args: Prisma.ProcesoGradoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                update: {
                    args: Prisma.ProcesoGradoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                deleteMany: {
                    args: Prisma.ProcesoGradoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProcesoGradoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProcesoGradoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>[];
                };
                upsert: {
                    args: Prisma.ProcesoGradoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProcesoGradoPayload>;
                };
                aggregate: {
                    args: Prisma.ProcesoGradoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProcesoGrado>;
                };
                groupBy: {
                    args: Prisma.ProcesoGradoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcesoGradoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProcesoGradoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcesoGradoCountAggregateOutputType> | number;
                };
            };
        };
        Investigacion: {
            payload: Prisma.$InvestigacionPayload<ExtArgs>;
            fields: Prisma.InvestigacionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InvestigacionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InvestigacionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                findFirst: {
                    args: Prisma.InvestigacionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InvestigacionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                findMany: {
                    args: Prisma.InvestigacionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>[];
                };
                create: {
                    args: Prisma.InvestigacionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                createMany: {
                    args: Prisma.InvestigacionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InvestigacionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>[];
                };
                delete: {
                    args: Prisma.InvestigacionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                update: {
                    args: Prisma.InvestigacionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                deleteMany: {
                    args: Prisma.InvestigacionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InvestigacionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InvestigacionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>[];
                };
                upsert: {
                    args: Prisma.InvestigacionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InvestigacionPayload>;
                };
                aggregate: {
                    args: Prisma.InvestigacionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInvestigacion>;
                };
                groupBy: {
                    args: Prisma.InvestigacionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InvestigacionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InvestigacionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InvestigacionCountAggregateOutputType> | number;
                };
            };
        };
        Diplomado: {
            payload: Prisma.$DiplomadoPayload<ExtArgs>;
            fields: Prisma.DiplomadoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiplomadoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiplomadoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                findFirst: {
                    args: Prisma.DiplomadoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiplomadoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                findMany: {
                    args: Prisma.DiplomadoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>[];
                };
                create: {
                    args: Prisma.DiplomadoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                createMany: {
                    args: Prisma.DiplomadoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiplomadoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>[];
                };
                delete: {
                    args: Prisma.DiplomadoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                update: {
                    args: Prisma.DiplomadoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                deleteMany: {
                    args: Prisma.DiplomadoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiplomadoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiplomadoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>[];
                };
                upsert: {
                    args: Prisma.DiplomadoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiplomadoPayload>;
                };
                aggregate: {
                    args: Prisma.DiplomadoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiplomado>;
                };
                groupBy: {
                    args: Prisma.DiplomadoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiplomadoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiplomadoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiplomadoCountAggregateOutputType> | number;
                };
            };
        };
        Practica: {
            payload: Prisma.$PracticaPayload<ExtArgs>;
            fields: Prisma.PracticaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PracticaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PracticaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                findFirst: {
                    args: Prisma.PracticaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PracticaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                findMany: {
                    args: Prisma.PracticaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>[];
                };
                create: {
                    args: Prisma.PracticaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                createMany: {
                    args: Prisma.PracticaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PracticaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>[];
                };
                delete: {
                    args: Prisma.PracticaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                update: {
                    args: Prisma.PracticaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                deleteMany: {
                    args: Prisma.PracticaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PracticaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PracticaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>[];
                };
                upsert: {
                    args: Prisma.PracticaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PracticaPayload>;
                };
                aggregate: {
                    args: Prisma.PracticaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePractica>;
                };
                groupBy: {
                    args: Prisma.PracticaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PracticaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PracticaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PracticaCountAggregateOutputType> | number;
                };
            };
        };
        Oferta: {
            payload: Prisma.$OfertaPayload<ExtArgs>;
            fields: Prisma.OfertaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OfertaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OfertaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                findFirst: {
                    args: Prisma.OfertaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OfertaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                findMany: {
                    args: Prisma.OfertaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>[];
                };
                create: {
                    args: Prisma.OfertaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                createMany: {
                    args: Prisma.OfertaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OfertaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>[];
                };
                delete: {
                    args: Prisma.OfertaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                update: {
                    args: Prisma.OfertaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                deleteMany: {
                    args: Prisma.OfertaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OfertaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OfertaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>[];
                };
                upsert: {
                    args: Prisma.OfertaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfertaPayload>;
                };
                aggregate: {
                    args: Prisma.OfertaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOferta>;
                };
                groupBy: {
                    args: Prisma.OfertaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OfertaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OfertaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OfertaCountAggregateOutputType> | number;
                };
            };
        };
        Postulacion: {
            payload: Prisma.$PostulacionPayload<ExtArgs>;
            fields: Prisma.PostulacionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostulacionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostulacionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                findFirst: {
                    args: Prisma.PostulacionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostulacionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                findMany: {
                    args: Prisma.PostulacionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>[];
                };
                create: {
                    args: Prisma.PostulacionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                createMany: {
                    args: Prisma.PostulacionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostulacionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>[];
                };
                delete: {
                    args: Prisma.PostulacionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                update: {
                    args: Prisma.PostulacionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                deleteMany: {
                    args: Prisma.PostulacionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostulacionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostulacionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>[];
                };
                upsert: {
                    args: Prisma.PostulacionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostulacionPayload>;
                };
                aggregate: {
                    args: Prisma.PostulacionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostulacion>;
                };
                groupBy: {
                    args: Prisma.PostulacionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostulacionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostulacionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostulacionCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CoordinadorScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly cargo: "cargo";
};
export type CoordinadorScalarFieldEnum = (typeof CoordinadorScalarFieldEnum)[keyof typeof CoordinadorScalarFieldEnum];
export declare const UsuarioScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly nombre: "nombre";
    readonly rol: "rol";
    readonly createdAt: "createdAt";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const EstudianteScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly codigo: "codigo";
    readonly programa: "programa";
    readonly semestre: "semestre";
};
export type EstudianteScalarFieldEnum = (typeof EstudianteScalarFieldEnum)[keyof typeof EstudianteScalarFieldEnum];
export declare const EmpresaScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly nombreEmpresa: "nombreEmpresa";
    readonly nit: "nit";
    readonly sector: "sector";
};
export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum];
export declare const DocenteScalarFieldEnum: {
    readonly id: "id";
    readonly usuarioId: "usuarioId";
    readonly tipo: "tipo";
    readonly especialidad: "especialidad";
};
export type DocenteScalarFieldEnum = (typeof DocenteScalarFieldEnum)[keyof typeof DocenteScalarFieldEnum];
export declare const ProcesoGradoScalarFieldEnum: {
    readonly id: "id";
    readonly estudianteId: "estudianteId";
    readonly modalidad: "modalidad";
    readonly estado: "estado";
    readonly asesorId: "asesorId";
    readonly coordinadorId: "coordinadorId";
    readonly fechaAsignacion: "fechaAsignacion";
    readonly fechaInicio: "fechaInicio";
};
export type ProcesoGradoScalarFieldEnum = (typeof ProcesoGradoScalarFieldEnum)[keyof typeof ProcesoGradoScalarFieldEnum];
export declare const InvestigacionScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly grupoInvestigacion: "grupoInvestigacion";
    readonly ideaPropuesta: "ideaPropuesta";
    readonly materiaMatriculada: "materiaMatriculada";
};
export type InvestigacionScalarFieldEnum = (typeof InvestigacionScalarFieldEnum)[keyof typeof InvestigacionScalarFieldEnum];
export declare const DiplomadoScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly nombreCurso: "nombreCurso";
    readonly institucion: "institucion";
    readonly estadoAprobacion: "estadoAprobacion";
};
export type DiplomadoScalarFieldEnum = (typeof DiplomadoScalarFieldEnum)[keyof typeof DiplomadoScalarFieldEnum];
export declare const PracticaScalarFieldEnum: {
    readonly id: "id";
    readonly procesoGradoId: "procesoGradoId";
    readonly tipo: "tipo";
    readonly horasCompletadas: "horasCompletadas";
    readonly ofertaId: "ofertaId";
    readonly estadoReporte: "estadoReporte";
};
export type PracticaScalarFieldEnum = (typeof PracticaScalarFieldEnum)[keyof typeof PracticaScalarFieldEnum];
export declare const OfertaScalarFieldEnum: {
    readonly id: "id";
    readonly empresaId: "empresaId";
    readonly titulo: "titulo";
    readonly descripcion: "descripcion";
    readonly perfilBuscado: "perfilBuscado";
    readonly modalidadContratacion: "modalidadContratacion";
    readonly ubicacion: "ubicacion";
    readonly funciones: "funciones";
    readonly fechaInicioConvocatoria: "fechaInicioConvocatoria";
    readonly fechaFinConvocatoria: "fechaFinConvocatoria";
    readonly fechaInicioPractica: "fechaInicioPractica";
    readonly duracionMeses: "duracionMeses";
    readonly imagenUrl: "imagenUrl";
    readonly estado: "estado";
    readonly fechaPublicacion: "fechaPublicacion";
};
export type OfertaScalarFieldEnum = (typeof OfertaScalarFieldEnum)[keyof typeof OfertaScalarFieldEnum];
export declare const PostulacionScalarFieldEnum: {
    readonly id: "id";
    readonly ofertaId: "ofertaId";
    readonly estudianteId: "estudianteId";
    readonly hojaVidaUrl: "hojaVidaUrl";
    readonly estado: "estado";
    readonly observacionesEmpresa: "observacionesEmpresa";
    readonly fecha: "fecha";
    readonly updatedAt: "updatedAt";
};
export type PostulacionScalarFieldEnum = (typeof PostulacionScalarFieldEnum)[keyof typeof PostulacionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>;
export type ListEnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumTipoDocenteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDocente'>;
export type ListEnumTipoDocenteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDocente[]'>;
export type EnumModalidadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidad'>;
export type ListEnumModalidadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidad[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumTipoPracticaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPractica'>;
export type ListEnumTipoPracticaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoPractica[]'>;
export type EnumPerfilBuscadoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PerfilBuscado'>;
export type ListEnumPerfilBuscadoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PerfilBuscado[]'>;
export type EnumModalidadContratacionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModalidadContratacion'>;
export type ListEnumModalidadContratacionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModalidadContratacion[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    coordinador?: Prisma.CoordinadorOmit;
    usuario?: Prisma.UsuarioOmit;
    estudiante?: Prisma.EstudianteOmit;
    empresa?: Prisma.EmpresaOmit;
    docente?: Prisma.DocenteOmit;
    procesoGrado?: Prisma.ProcesoGradoOmit;
    investigacion?: Prisma.InvestigacionOmit;
    diplomado?: Prisma.DiplomadoOmit;
    practica?: Prisma.PracticaOmit;
    oferta?: Prisma.OfertaOmit;
    postulacion?: Prisma.PostulacionOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
