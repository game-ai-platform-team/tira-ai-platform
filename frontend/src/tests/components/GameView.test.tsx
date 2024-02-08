import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView.tsx";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.ts";

test("move list gets rendered", async () => {
    const ui = (
        <Provider store={store}>
            <GameView
                testResult={{
                    moves: ["c2c3", "c7c6", "a2a4", "d7d5", "d2d4"],
                    winner: "player1",
                }}
            />
        </Provider>
    );
    const component = render(ui);
    const moveList = component.container.querySelector(".move-list");

    expect(moveList).not.toBeEmptyDOMElement();
});
