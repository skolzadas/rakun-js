
import { RakunMono } from "../mono/interface";
import { RakunMonoImpl } from "../mono/impl";
import { RakunPipeline } from "../pipeline/interface";
import { RakunPipelineContext } from "../pipeline/interface";
import { RakunFlux } from "./interface";

export class RakunFluxImpl<T> implements RakunFlux<T>{
    constructor(public pipelineContext: RakunPipelineContext<T>) {
    }

    map<R>(fn: (value: T) => R | Promise<R>): RakunFlux<R> {
        return new RakunFluxImpl<R>(this.pipelineContext.map(fn))
    }
    flatMap<R>(fn: (value: T) => RakunPipeline<R> | Promise<RakunPipeline<R>>): RakunFlux<R> {
        return new RakunFluxImpl<R>(this.pipelineContext.flatMap(fn))
    }
    collectList(): RakunMono<Iterable<T>> {
        return new RakunMonoImpl<Iterable<T>>(this.pipelineContext.collectList());
    }
}

