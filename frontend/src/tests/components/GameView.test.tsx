import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView.tsx";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.ts";
import { createMove } from "../../reducers/moveReducer.ts";

test("move list gets rendered", async () => {
    store.dispatch(createMove({ move: "c2c3", logs: "", time: 100, advantage: 0 }));
    const ui = (
        <Provider store={store}>
            <GameView
            />
        </Provider>
    );
    const component = render(ui);
    const moveList = component.container.querySelector(".move-list");

    expect(moveList).not.toBeEmptyDOMElement();
});
