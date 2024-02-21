import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store";
import { createMove, resetMoves } from "../../reducers/moveReducer";
import Chessboard from "../../components/Chessboard";

describe("GameView", () => {
    beforeEach(() => {
        store.dispatch(resetMoves());
    });

    test("move list gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView>
                    <p></p>
                </GameView>
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
                <GameView>
                    <p></p>
                </GameView>
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
                <GameView>
                    <Chessboard />
                </GameView>
            </Provider>
        );
        const component = render(ui);
        const chessboard = component.container.querySelector("#gameboard");

        expect(chessboard).not.toBeEmptyDOMElement();
    });

    test("AdvantageBar gets rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <GameView>
                    <Chessboard />
                </GameView>
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
                <GameView>
                    <Chessboard />
                </GameView>
            </Provider>
        );
        const component = render(ui);
        const statistics = component.container.querySelector("#statistics");

        expect(statistics).not.toBeEmptyDOMElement();
    });
});
