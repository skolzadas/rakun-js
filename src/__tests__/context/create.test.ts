import context from "../../context";
import mono from "../../mono";

describe('context create', () => {
    test('test create', () => {
        const MyNameContext = context.create<string | null>(null);

        const getPerson = () => {
            return MyNameContext
                .get()
                .map(name => ({ name, email: "test@gmai.com" }))

        }

        const result = mono
            .then(MyNameContext.define("TESTE"))
            .then(getPerson())
            .block();

        const expectValue = { "email": "test@gmai.com", "name": "TESTE" }
        expect(result).resolves.toStrictEqual(expectValue);


    });
});