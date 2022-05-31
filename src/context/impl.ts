import { RakunMono } from "../mono/interface";
import { RakunMonoImpl } from "../mono/impl";
import { RakunContext } from "./interface";
import pipelineContext from "../pipeline/static";



export class RakunContextImpl<T> implements RakunContext<T>{

    constructor(public defualtValue: T) {

    }
    get(): RakunMono<T> {
        return new RakunMonoImpl(pipelineContext.getValueContext(this));
    }
    define(value: T): RakunMono<void> {
        return new RakunMonoImpl(pipelineContext.setValueContext(this, value));
    }

}