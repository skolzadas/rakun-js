
import pipelineContext from "../pipeline/static";
import { RakunExtractArrayPipelineType } from "../pipeline/interface";
import { RakunMonoImpl } from "./impl";
import { RakunMono, RakunStaticMono } from "./interface";


export class StaticMonoImpl implements RakunStaticMono {
    zip<T extends RakunMono<any>[]>(...args: T): RakunMono<RakunExtractArrayPipelineType<T>> {
        return new RakunMonoImpl<RakunExtractArrayPipelineType<T>>(pipelineContext.zip(args));
    }
    then<R>(mono: RakunMono<R>): RakunMono<R> {
        return new RakunMonoImpl<R>(pipelineContext.then(mono));
    }
    just<T>(valueOrGetValue: T | (() => T)): RakunMono<T> {
        return new RakunMonoImpl<T>(pipelineContext.fromValueOrGetValue(valueOrGetValue));

    }
}

const mono = new StaticMonoImpl();
export default mono;