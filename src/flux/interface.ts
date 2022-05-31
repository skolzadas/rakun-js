
import { RakunMono } from "../mono/interface";
import { RakunPipeline } from "../pipeline/interface";
import { UnpackArrayType } from "../types";


export type RakunStaticFlux = {
    fromIterable<R>(value: Iterable<R>): RakunFlux<R>
    // fromPromise<T>(a: Promise<T>): Flux<T>
    just<T extends any[]>(...args: T): RakunFlux<UnpackArrayType<T>>
}

export interface RakunFlux<T> extends RakunPipeline<T> {
    map<R>(fn: (value: T) => R | Promise<R>): RakunFlux<R>
    flatMap<R>(fn: (value: T) => RakunPipeline<R> | Promise<RakunPipeline<R>>): RakunFlux<R>
    collectList(): RakunMono<Iterable<T>>
    // thenMany<R>(mono: Flux<R>): Flux<R>
    // thenMany(): Flux<Void>
}