declare type QueryData<T1, T2> = NonNullable<NonNullable<T1['data']>[T2]>;
declare type ArrayType<T> = T extends Array<infer V> ? V : never;
declare type Edges<T> = ArrayType<NonNullable<NonNullable<T>['edges']>>;
declare type Nodes<T> = ArrayType<NonNullable<NonNullable<T>['nodes']>>;
declare type EdgesNode<T> = NonNullable<Edges<T>>['node'];
declare type PageInfo<T> = NonNullable<NonNullable<T>['pageInfo']>;
