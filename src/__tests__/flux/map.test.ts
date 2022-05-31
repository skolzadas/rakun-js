import flux from "../../flux";

jest.useFakeTimers()

describe('flux map', () => {
    test('test async', () => {
        const result = flux.just(30, 10, 20)
            .map(async n => {
                return n + "-a"
            })
            .collectList()
            .block()

        const expectValue = [
            "30-a",
            "10-a",
            "20-a"
        ]

        expect(result).resolves.toStrictEqual(expectValue);

    });

    test('test plus value', () => {
        const result = flux.just("1", 2, "3")
            .map(txt => txt + "-a")
            .collectList()
            .block()

        const expectValue = ["1-a", "2-a", "3-a"]

        expect(result).resolves.toStrictEqual(expectValue);

    });


});