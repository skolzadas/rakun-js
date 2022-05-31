import mono from "../../mono";

describe('flux map', () => {

    test('test plus value', () => {
        const result = mono.just("1")
            .map(txt => txt + "-a")
            .block()

        const expectValue = "1-a"
        expect(result).resolves.toStrictEqual(expectValue);

    });


});