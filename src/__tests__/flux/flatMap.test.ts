import flux from "../../flux";

describe('flux flatMap', () => {
    test('test plus value', () => {
        const result = flux.just("1", 2, "3")
            .collectList()
            .block();
        const expectValue = ["1", 2, "3"]
        expect(result).resolves.toStrictEqual(expectValue);

    });

});