import { RakunExtractArrayPipelineType, RakunPipeline } from "../pipeline/interface";

export interface RakunMono<T> extends RakunPipeline<T> {
    block(): Promise<T>;
    map<R>(fn: (value: T) => R): RakunMono<R>
    flatMap<R>(fn: (value: T) => RakunMono<R>): RakunMono<R>
    then<R>(mono: RakunMono<R>): RakunMono<R>
    then(): RakunMono<void>
    // flux(): Flux<T>
    // flatMapMany<R>(fn: (value: T) => Publisher<R>): Flux<R>

}


export type RakunStaticMono = {
    just<T>(a: T): RakunMono<T>
    then<R>(mono: RakunMono<R>): RakunMono<R>
    zip<T extends RakunMono<any>[]>(...args: T): RakunMono<RakunExtractArrayPipelineType<T>>
}