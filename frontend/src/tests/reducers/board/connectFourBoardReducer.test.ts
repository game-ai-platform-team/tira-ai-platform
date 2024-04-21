import store from "../../../store";
import { newConnectFourBoard } from "../../../reducers/boards/connectFourBoardReducer";
import resetStateReducer from "../../../reducers/resetReducer";

describe("ConnectFourBoardReducer", () => {
    beforeEach(() => {
        store.dispatch(resetStateReducer());
    });

    test("changes board", () => {
        store.dispatch(
            newConnectFourBoard({
                move: "3",
                logs: "",
                time: 100,
                evaluation: 0,
            }),
        );
        expect(store.getState().boards.connectFourBoards).toHaveLength(1);
        expect(store.getState().boards.connectFourBoards[0][0]).toEqual(3);
    });

    test("changes board multiple times", () => {
        store.dispatch(
            newConnectFourBoard({
                move: "1",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );
        store.dispatch(
            newConnectFourBoard({
                move: "6",
                logs: "something",
                time: 123,
                evaluation: -1,
            }),
        );

        expect(store.getState().boards.connectFourBoards).toHaveLength(2);
        expect(store.getState().boards.connectFourBoards[0][0]).toEqual(1);
        expect(store.getState().boards.connectFourBoards[1][1]).toEqual(6);
    });
});
