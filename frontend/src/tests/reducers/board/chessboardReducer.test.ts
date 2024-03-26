import store from "../../../store";
import { newChessboard } from "../../../reducers/board/chessboardReducer";
import resetStateReducer from "../../../reducers/resetReducer";

describe("BoardReducer", () => {
    beforeEach(() => {
        store.dispatch(resetStateReducer());
    });

    test("changes board", () => {
        store.dispatch(
            newChessboard({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        expect(store.getState().boards.chessboards).toHaveLength(2);
        expect(store.getState().boards.chessboards[1]).toEqual(
            "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
        );
    });

    test("changes board multiple times", () => {
        store.dispatch(
            newChessboard({
                move: "d2d4",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );
        store.dispatch(
            newChessboard({
                move: "b8c6",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );

        expect(store.getState().boards.chessboards).toHaveLength(3);
        expect(store.getState().boards.chessboards[2]).toEqual(
            "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
        );
    });
});
