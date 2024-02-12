import store from "../../store.ts";
import { newBoard } from "../../reducers/boardReducer.ts";

describe("Board redux", () => {
    test("changes board", () => {
        store.dispatch(
            newBoard({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        expect(store.getState().boards).toHaveLength(2);
        expect(store.getState().boards.at(1)).toEqual(
            "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
        );
    });
});
