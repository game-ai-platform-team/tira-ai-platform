import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import NavigationBar from "../../components/NavigationBar";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

describe("Navigation bar", () => {
    let gameSelectionButton: null | HTMLElement = null;

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NavigationBar />
                </BrowserRouter>
            </Provider>,
        );
        gameSelectionButton = screen.getByLabelText("Select game");
    });

    test("feedback is on the navigation bar", () => {
        const feedbackButton = screen.getByText("Feedback", { exact: false });

        expect(feedbackButton).not.toBeNull();
    });

    describe("game selection", () => {
        test("button exists", () => {
            expect(gameSelectionButton).not.toBeNull();
        });

        test("dropdown menu is hidden at start", () => {
            expect(() =>
                screen.getByLabelText("Available games"),
            ).toThrowError();
        });

        describe("dropdown menu", () => {
            let gameDropdown: null | HTMLElement = null;

            beforeEach(async () => {
                const user = userEvent.setup();
                await user.click(gameSelectionButton as HTMLElement);

                gameDropdown = screen.getByLabelText(
                    "Available games",
                ) as HTMLElement;
            });

            test("has chess", async () => {
                const game = within(gameDropdown!).getByText("Chess", {
                    exact: false,
                });

                expect(game).toBeDefined();
            });

            test("has gomoku", async () => {
                const game = within(gameDropdown!).getByText("Gomoku", {
                    exact: false,
                });

                expect(game).toBeDefined();
            });

            test("has othello", async () => {
                const game = within(gameDropdown!).getByText("Othello", {
                    exact: false,
                });

                expect(game).toBeDefined();
            });

            test("has connect 4", async () => {
                const game = within(gameDropdown!).getByText("Connect 4", {
                    exact: false,
                });

                expect(game).toBeDefined();
            });

            test("redirects to connect four url", () => {
                const game = within(gameDropdown!).getByText("Connect 4", {
                    exact: false,
                });
                fireEvent.click(game);
                const url = window.location.href;
                expect(url).include("/connect_four")
            })

            test("redirects to chess url", () => {
                const url2 = window.location.href;
                expect(url2).include("/connect_four")
                const game = within(gameDropdown!).getByText("Chess", {
                    exact: false,
                });
                fireEvent.click(game);
                const url = window.location.href;
                expect(url).include("/chess")
            })

            test("url remains the same when clicking feedback", () => {
                const button = screen.getByLabelText("Feedback") as HTMLElement;
                fireEvent.click(button);
                const url = window.location.href;
                expect(url).include("/chess")
            })
        });
    });
});
