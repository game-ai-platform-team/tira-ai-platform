import CFourboard from "../../components/CFourboard";
import store from "../../store";
import { resetMoves } from "../../reducers/moveReducer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setBoardIndex } from "../../reducers/boardIndexReducer";

describe("CFourboard", () => {
    const ui = (
        <Provider store={store}>
            <CFourboard />
        </Provider>
    );

    beforeEach(() => {
        store.dispatch(resetMoves());
        store.dispatch(setBoardIndex(0));
    });

    test("is rendered", () => {
        const component = render(ui);
        const board = component.container.querySelector("#cfour-board");
        expect(board).not.toBeNull();
    });
});
