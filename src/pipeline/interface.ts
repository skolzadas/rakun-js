import { RakunContext, RakunContextManager } from "../context/interface"
import { RakunMono } from "../mono/interface"
import { UnpackArrayType } from "../types"

export interface RakunPipeline<T> {
    pipelineContext: RakunPipelineContext<T>
}

export type Executor<T> = (contextManager: RakunContextManager) => Promise<Iterable<T>>

export interface RakunStaticPipelineContext {
    zip<T extends RakunMono<any>[]>(monos: T): RakunPipelineContext<RakunExtractArrayPipelineType<T>>
    then<R>(mono: RakunMono<R>): RakunPipelineContext<R>
    setValueContext<R>(context: RakunContext<R>, value: R): RakunPipelineContext<void>
    getValueContext<R>(context: RakunContext<R>): RakunPipelineContext<R>
    fromIterableItem<T extends Iterable<any>>(args: T): RakunPipelineContext<UnpackArrayType<T>>
    fromValueOrGetValue<T>(valueOrGetValue: T | (() => T)): RakunPipelineContext<T>
    fromIterable<R>(value: Iterable<R>): RakunPipelineContext<R>
}
export interface RakunPipelineContext<T> {
    then<R>(mono: RakunPipeline<R>): RakunPipelineContext<R>
    collectList(): RakunPipelineContext<Iterable<T>>
    executor: Executor<T>
    flatMap<R>(fn: (value: T) => RakunPipeline<R> | Promise<RakunPipeline<R>>): RakunPipelineContext<R>
    map<R>(fn: (value: T) => R | Promise<R>): RakunPipelineContext<R>
    blockFist(): Promise<T>
}

export type RakunExtractPipelineType<T> = T extends RakunPipeline<infer P> ? P : never

export type RakunExtractArrayPipelineType<T> = { [K in keyof T]: RakunExtractPipelineType<T[K]> }