declare type QueryData<T1, T2> = NonNullable<NonNullable<T1['data']>[T2]>;
declare type ArrayType<T> = T extends Array<infer V> ? V : never;
