export type Void = {
    x_Void_Mono: true
}

export type UnpackArrayType<T> = T extends (infer R)[] ? R : T;