import { RakunContextManagerImpl } from "../context/manager";
import { Executor, RakunPipeline, RakunPipelineContext } from "./interface";


export class RakunPipelineContextImpl<T> implements RakunPipelineContext<T>{
    constructor(public executor: Executor<T>) {

    }
    then<R>(mono: RakunPipeline<R>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl((contextManager) =>
            this.executor(contextManager).then(() => mono.pipelineContext.executor(contextManager))
        )
    }
    async blockFist(): Promise<T> {
        return (await this.executor(new RakunContextManagerImpl()))[Symbol.iterator]().next().value
    }
    collectList(): RakunPipelineContext<Iterable<T>> {
        return new RakunPipelineContextImpl((contextManager) =>
            this.executor(contextManager).then(iterable => [iterable])
        )

    }
    flatMap<R>(fn: (value: T) => RakunPipeline<R> | Promise<RakunPipeline<R>>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl((contextManager) =>
            this.executor(contextManager)
                .then(e => Promise.all(Array.from(e).map(fn)))
                .then(e => Promise.all(e.map(publisher => publisher.pipelineContext.executor(contextManager))))
                .then(ee => ee.flatMap(ee => Array.from(ee)))
        )
    }
    map<R>(fn: (value: T) => R | Promise<R>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl((contextManager) =>
            this.executor(contextManager)
                .then(e => Promise.all(Array.from(e).map(item => Promise.resolve(item).then(fn))))
        )
    }

}
