
import { RakunMono } from "./interface";
import { RakunPipeline } from "../pipeline/interface";
import { RakunPipelineContext } from "../pipeline/interface";
export class RakunMonoImpl<T> implements RakunMono<T>  {
    constructor(public pipelineContext: RakunPipelineContext<T>) {
    }

    then<R>(mono: RakunMono<R>): RakunMono<R>;
    then(): RakunMono<void>;
    then<R>(mono?: any): RakunMono<R> | RakunMono<void> {
        return new RakunMonoImpl<R>(this.pipelineContext.then(mono ?? mono.just(undefined)))
    }

    async block(): Promise<T> {
        return this.pipelineContext.blockFist()
    }
    map<R>(fn: (value: T) => R | Promise<R>): RakunMono<R> {
        return new RakunMonoImpl<R>(this.pipelineContext.map(fn))
    }
    flatMap<R>(fn: (value: T) => RakunPipeline<R> | Promise<RakunPipeline<R>>): RakunMono<R> {
        return new RakunMonoImpl<R>(this.pipelineContext.flatMap(fn))
    }
}
