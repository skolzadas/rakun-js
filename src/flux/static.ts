import pipelineContext from "../pipeline/static";
import { UnpackArrayType } from "../types";
import { RakunFluxImpl } from "./impl";
import { RakunFlux, RakunStaticFlux } from "./interface";

export class RakunStaticFluxImpl implements RakunStaticFlux {
    fromIterable<R>(value: Iterable<R>): RakunFlux<R> {
        return new RakunFluxImpl<R>(pipelineContext.fromIterable(value));
    }
    just<T extends any[]>(...args: T): RakunFlux<UnpackArrayType<T>> {
        return new RakunFluxImpl<UnpackArrayType<T>>(pipelineContext.fromIterableItem(args));
    }
}

const flux: RakunStaticFlux = new RakunStaticFluxImpl();
export default flux;