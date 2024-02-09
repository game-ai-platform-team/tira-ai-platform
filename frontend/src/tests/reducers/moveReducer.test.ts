import store from "../../store.ts";
import { createMove } from "../../reducers/moveReducer.ts";


describe("Move redux", () => {

    test("goes through", () => {
        store.dispatch(createMove({ move: "c2c3", logs: "", time: 100, advantage: 0 }));
        expect(store.getState().moves).toHaveLength(1);
        expect(store.getState().moves[0].move).toEqual("c2c3");
    });

});
