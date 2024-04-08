import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store";
import { createMove, resetMoves } from "../../reducers/moveReducer";
import { MemoryRouter } from "react-router-dom";

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
                <MemoryRouter initialEntries={["/chess"]}>
                    <GameView />
                </ MemoryRouter>
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
                <MemoryRouter initialEntries={["/chess"]}>
                    <GameView />
                </ MemoryRouter>
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
                <MemoryRouter initialEntries={["/chess"]}>
                    <GameView />
                </ MemoryRouter>
            </Provider>
        );
        const component = render(ui);
        const chessboard = component.container.querySelector("#gameboard");

        expect(chessboard).not.toBeEmptyDOMElement();
    });

    test("statistics get rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        const ui = (
            <Provider store={store}>
                <MemoryRouter initialEntries={["/chess"]}>
                    <GameView />
                </ MemoryRouter>
            </Provider>
        );
        const component = render(ui);
        const statistics = component.container.querySelector("#statistics");

        expect(statistics).not.toBeEmptyDOMElement();
    });

    test("player stats get rendered", async () => {
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );
        store.dispatch(
            createMove({ move: "c2c3", logs: "", time: 100, evaluation: 0 }),
        );

        const ui = (
            <Provider store={store}>
                <MemoryRouter initialEntries={["/chess"]}>
                    <GameView />
                </ MemoryRouter>
            </Provider>
        );
        const component = render(ui);
        const playerStats = component.container.querySelector("#player-stats");

        expect(playerStats).not.toBeEmptyDOMElement();
    });
});
