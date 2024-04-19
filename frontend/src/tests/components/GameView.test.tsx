import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import GameView from "../../components/GameView";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store";
import { createMove, resetMoves } from "../../reducers/moveReducer";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { resetGame, updateState } from "../../reducers/gameReducer";
import { GameState } from "../../types";

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
                    <GameView game={"chess"} />
                </MemoryRouter>
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
                    <GameView game={"chess"} />
                </MemoryRouter>
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
                    <GameView game={"chess"} />
                </MemoryRouter>
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
                    <GameView game={"chess"} />
                </MemoryRouter>
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
                    <GameView game={"chess"} />
                </MemoryRouter>
            </Provider>
        );
        const component = render(ui);
        const playerStats = component.container.querySelector("#player-stats");

        expect(playerStats).not.toBeEmptyDOMElement();
    });

    describe("Notification", () => {
        beforeEach(() => {
            store.dispatch(resetGame());
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <GameView game={"chess"} />
                    </BrowserRouter>
                </Provider>,
            );
        });

        test("invalid notification", async () => {
            store.dispatch(updateState(GameState.INVALID));

            expect(
                await screen.findAllByText("An invalid move was made"),
            ).not.toBe(null);
        });

        test("illegal notification", async () => {
            store.dispatch(updateState(GameState.ILLEGAL));

            expect(
                await screen.findAllByText("An illegal move was made"),
            ).not.toBe(null);
        });

        test("win notification", async () => {
            store.dispatch(updateState(GameState.WIN));

            expect(
                await screen.findAllByText("Game ended successfully!"),
            ).not.toBe(null);

            expect(await screen.findAllByText("There was a WIN")).not.toBe(
                null,
            );
        });

        test("timeout notification", async () => {
            store.dispatch(updateState(GameState.TIMEOUT));

            expect(
                await screen.findAllByText("TIMEOUT!!! Your ai is too slow"),
            ).not.toBe(null);
        });

        test("draw notification", async () => {
            store.dispatch(updateState(GameState.DRAW));

            expect(
                await screen.findAllByText("Game ended successfully!"),
            ).not.toBe(null);

            expect(await screen.findAllByText("There was a DRAW")).not.toBe(
                null,
            );
        });
    });
});
