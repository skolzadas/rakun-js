import { RakunMono } from "../mono/interface";

export interface RakunStaticContext {
    create<T>(value: T): RakunContext<T>;
}
export interface RakunContext<T> {
    get(): RakunMono<T>
    define(value: T): RakunMono<void>

}
export interface RakunContextManager {
    getValue<R>(context: RakunContext<R>): Promise<R>;
    setValue<R>(context: RakunContext<R>, value: R): Promise<void>;
}
