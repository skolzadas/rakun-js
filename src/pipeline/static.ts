import { RakunPipeline } from "./interface";
import { RakunMono } from "../mono/interface";
import { UnpackArrayType } from "../types";
import { RakunPipelineContextImpl } from "./impl";
import { RakunExtractArrayPipelineType, RakunPipelineContext, RakunStaticPipelineContext } from "./interface";
import { RakunContext } from "../context/interface";

export class RakunStaticPipelineContextImpl implements RakunStaticPipelineContext {
    zip<T extends RakunMono<any>[]>(monos: T): RakunPipelineContext<RakunExtractArrayPipelineType<T>> {
        return new RakunPipelineContextImpl<RakunExtractArrayPipelineType<T>>(async (contextManager) => {

            return await Promise.all(
                monos.map(e => e.pipelineContext.executor(contextManager)
                    .then(rr0 => Array.from(rr0))
                )
            )
                .then(ee => [ee.flat()]) as any;
        })
    }

    then<R>(mono: RakunPipeline<R>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl((contextManager) =>
            mono.pipelineContext.executor(contextManager)
        )
    }
    setValueContext<R>(context: RakunContext<R>, value: R): RakunPipelineContext<void> {
        return new RakunPipelineContextImpl<void>(async (contextManager) => {
            await contextManager.setValue(context, value)
            return Promise.resolve([undefined])
        });
    }
    getValueContext<R>(context: RakunContext<R>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl<R>(async (contextManager) => {
            const value = await contextManager.getValue(context);
            return Promise.resolve([value])
        });
    }
    fromValueOrGetValue<T>(valueOrGetValue: T | (() => T)): RakunPipelineContext<T> {
        if (typeof valueOrGetValue != "function") {
            return new RakunPipelineContextImpl<T>(() => Promise.resolve([valueOrGetValue]));

        } else {
            return new RakunPipelineContextImpl<T>(() => Promise.resolve([(valueOrGetValue as (() => T))()]));
        }
    }
    fromIterableItem<T extends Iterable<any>>(args: T): RakunPipelineContext<UnpackArrayType<T>> {
        return new RakunPipelineContextImpl(() => Promise.resolve(args))
    }
    fromIterable<R>(value: Iterable<R>): RakunPipelineContext<R> {
        return new RakunPipelineContextImpl(() => Promise.resolve(value))
    }
}

const pipelineContext: RakunStaticPipelineContext = new RakunStaticPipelineContextImpl();
export default pipelineContext;


