import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import NavigationBar from "../../components/NavigationBar";

describe("Navigation bar", () => {
    let gameSelectionButton: null | HTMLElement = null;

    beforeEach(() => {
        render(<NavigationBar selectedGame="" handleGameChange={vi.fn()} />);
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
        });
    });
});
