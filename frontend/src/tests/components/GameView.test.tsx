import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import GameView from "../../components/GameView.tsx";
import "@testing-library/jest-dom";

test("move list gets rendered", async () => {
    const ui = (
        <GameView
            testResult={{
                moves: ["c2c3", "c7c6", "a2a4", "d7d5", "d2d4"],
                winner: "player1",
            }}
        />
    );
    const component = render(ui);
    const moveList = component.container.querySelector("#chessboard-container");

    expect(moveList).not.toBeEmptyDOMElement();
});
