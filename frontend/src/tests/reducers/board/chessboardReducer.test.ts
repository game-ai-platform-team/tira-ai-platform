import store from "../../../store";
import { newChessBoard } from "../../../reducers/board/chessBoardReducer";
import resetStateReducer from "../../../reducers/resetReducer";

describe("BoardReducer", () => {
    beforeEach(() => {
        store.dispatch(resetStateReducer());
    });

    test("changes board", () => {
        store.dispatch(
            newChessBoard({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        expect(store.getState().boards.chessBoards).toHaveLength(2);
        expect(store.getState().boards.chessBoards[1]).toEqual(
            "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
        );
    });

    test("changes board multiple times", () => {
        store.dispatch(
            newChessBoard({
                move: "d2d4",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );
        store.dispatch(
            newChessBoard({
                move: "b8c6",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );

        expect(store.getState().boards.chessBoards).toHaveLength(3);
        expect(store.getState().boards.chessBoards[2]).toEqual(
            "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
        );
    });
});
