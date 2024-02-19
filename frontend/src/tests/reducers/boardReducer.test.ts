import store from "../../store";
import { newBoard } from "../../reducers/boardReducer";
import resetStateReducer from "../../reducers/resetReducer";

describe("BoardReducer", () => {
    beforeEach(() => {
        store.dispatch(resetStateReducer());
    });

    test("changes board", () => {
        store.dispatch(
            newBoard({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        expect(store.getState().boards).toHaveLength(2);
        expect(store.getState().boards.at(1)).toEqual(
            "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
        );
    });

    test("changes board multiple times", () => {
        store.dispatch(
            newBoard({
                move: "d2d4",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );
        store.dispatch(
            newBoard({
                move: "b8c6",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );

        expect(store.getState().boards).toHaveLength(3);
        expect(store.getState().boards[2]).toEqual(
            "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
        );
    });
});
