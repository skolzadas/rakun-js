import { RakunContextImpl } from "./impl";
import { RakunContext, RakunStaticContext } from "./interface";
export class RakunStaticContextImpl implements RakunStaticContext {
    create<T>(value: T): RakunContext<T> {
        return new RakunContextImpl<T>(value);
    }
}

const context: RakunStaticContext = new RakunStaticContextImpl();
export default context;


