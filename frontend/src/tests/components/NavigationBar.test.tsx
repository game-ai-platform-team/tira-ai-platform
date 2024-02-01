import { render } from "@testing-library/react";
import NavigationBar from "../../components/NavigationBar";

test("feedback is on the navigation bar", () => {
    const { queryByText } = render(<NavigationBar />);
    const feedbackButton = queryByText("Feedback");

    expect(feedbackButton).not.toBeNull();
});

test("dropdown menu has chess", () => {
    const { queryAllByText } = render(<NavigationBar />);
    const chessButtons = queryAllByText("Chess");

    expect(chessButtons.length).toBe(2);
});

test("dropdown menu has othello", () => {
    const { queryByText } = render(<NavigationBar />);
    const othelloButton = queryByText("Othello");

    expect(othelloButton).not.toBeNull();
});

test("dropdown menu has Connect4", () => {
    const { queryByText } = render(<NavigationBar />);
    const cfourButton = queryByText("Connect4");

    expect(cfourButton).not.toBeNull();
});

test("dropdown menu has gomoku", () => {
    const { queryByText } = render(<NavigationBar />);
    const gomokuButton = queryByText("Gomoku");

    expect(gomokuButton).not.toBeNull();
});
