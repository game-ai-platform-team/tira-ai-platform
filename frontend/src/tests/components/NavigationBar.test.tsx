import { render } from "@testing-library/react";
import NavigationBar from "../../components/NavigationBar";
import { vi } from "vitest";

test("feedback is on the navigation bar", () => {
    const { queryByText } = render(
        <NavigationBar selectedGame="" handleGameChange={vi.fn()} />,
    );
    const feedbackButton = queryByText("Feedback");

    expect(feedbackButton).not.toBeNull();
});

test("dropdown menu has chess", () => {
    const { queryAllByText } = render(
        <NavigationBar selectedGame="" handleGameChange={vi.fn()} />,
    );
    const chessButtons = queryAllByText("Chess");

    expect(chessButtons.length).not.toBeNull();
});

test("dropdown menu has othello", () => {
    const { queryByText } = render(
        <NavigationBar selectedGame="" handleGameChange={vi.fn()} />,
    );
    const othelloButton = queryByText("Othello");

    expect(othelloButton).not.toBeNull();
});

test("dropdown menu has Connect4", () => {
    const { queryByText } = render(
        <NavigationBar selectedGame="" handleGameChange={vi.fn()} />,
    );
    const cfourButton = queryByText("Connect 4");

    expect(cfourButton).not.toBeNull();
});

test("dropdown menu has gomoku", () => {
    const { queryByText } = render(
        <NavigationBar selectedGame="" handleGameChange={vi.fn()} />,
    );
    const gomokuButton = queryByText("Gomoku");

    expect(gomokuButton).not.toBeNull();
});
