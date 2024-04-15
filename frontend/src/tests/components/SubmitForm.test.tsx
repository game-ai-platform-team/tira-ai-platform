import { render, screen } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";
import { test, expect, describe } from "vitest";
import { Provider } from "react-redux";
import store from "../../store";
import { resetGame, updateState } from "../../reducers/gameReducer";
import { GameState } from "../../types";
import { BrowserRouter } from "react-router-dom";

describe("Submit form", () => {
    beforeEach(() => {
        store.dispatch(resetGame());

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SubmitForm/>
                </BrowserRouter>
            </Provider>,
        );
    });

    describe("URL field", () => {
        let urlField: HTMLInputElement | null = null;

        beforeEach(() => {
            urlField = screen.getByLabelText(
                "Repository URL",
            ) as HTMLInputElement;
        });

        test("exists", () => {
            expect(urlField).toBeDefined();
        });

        test("is URL field", () => {
            expect(urlField!.type).to.equal("url");
        });
    });

    test("Submit button exists", () => {
        expect(screen.getByLabelText("Submit")).toBeDefined();
    });

    test("Difficult slider exists", () => {
        expect(screen.getByLabelText("Difficulty")).not.toBeNull();
    });

    describe("Notification", () => {
        beforeEach(() => {
            store.dispatch(resetGame());
        });

        test("invalid notification", async () => {
            store.dispatch(updateState(GameState.INVALID));

            expect(
                await screen.findAllByText(
                    "Game ended, an invalid move was made",
                ),
            ).not.toBe(null);
        });

        test("illegal notification", async () => {
            store.dispatch(updateState(GameState.ILLEGAL));

            expect(
                await screen.findAllByText(
                    "Game ended, an illegal move was made",
                ),
            ).not.toBe(null);
        });

        test("win notification", async () => {
            store.dispatch(updateState(GameState.WIN));

            expect(
                await screen.findAllByText("Game ended successfully!"),
            ).not.toBe(null);
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
        });
        test("no notification", async () => {
            expect(screen.queryByText("Notification!!!")).toBe(null);
        });
    });
});
