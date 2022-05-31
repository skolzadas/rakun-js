import mono from "../../mono";

describe('mono flatMap', () => {
    test('test plus value', () => {
        const result = mono.just("1")
            .map(txt => txt + "-a")
            .flatMap(txt => mono.just(txt + "--1"))
            .block()
        const expectValue = "1-a--1a"
        expect(result).resolves.toStrictEqual(expectValue);
    });

});