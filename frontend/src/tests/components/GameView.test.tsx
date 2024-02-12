import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView.tsx";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.ts";
import { createMove, resetMoves } from "../../reducers/moveReducer.ts";
import Chessboard from "../../components/Chessboard.tsx";

describe("GameView", () => {
    beforeEach(() => {
        store.dispatch(resetMoves())
    })

    test("move list gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView children={<p></p>} />
            </Provider>
        );
        const component = render(ui);
        const moveList = component.container.querySelector(".move-list");

        expect(moveList).not.toBeEmptyDOMElement();
    });

    test("submit form gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView children={<p></p>} />
            </Provider>
        );
        const component = render(ui);
        const submitform = component.container.querySelector(
            "#drag-and-drop-container",
        );

        expect(submitform).not.toBeEmptyDOMElement();
    });

    test("chessboard gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView children={<Chessboard />} />
            </Provider>
        );
        const component = render(ui);
        const chessboard = component.container.querySelector("#chessboard");

        expect(chessboard).not.toBeEmptyDOMElement();
    });

    test("AdvantageBar gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView children={<Chessboard />} />
            </Provider>
        );
        const component = render(ui);
        const advantagebar =
            component.container.querySelector(".advantage-bar");

        expect(advantagebar).not.toBeEmptyDOMElement();
    });

    test("statistics get rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView children={<Chessboard />} />
            </Provider>
        );
        const component = render(ui);
        const statistics = component.container.querySelector("#statistics");

        expect(statistics).not.toBeEmptyDOMElement();
    });
});
