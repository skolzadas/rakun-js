import mono from "../../mono";

describe('mono zip', () => {
    test('test zip', () => {
        const result = mono.zip(mono.just("1"), mono.just("2"), mono.just("3"))
            .map(([m1, m2, m3]) => `${m1},${m2},${m3}`)
            .block()
        const expectValue = "1,2,3"
        expect(result).resolves.toStrictEqual(expectValue);
    });

});