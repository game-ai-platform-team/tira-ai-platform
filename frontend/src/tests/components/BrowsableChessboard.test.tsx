import { BrowsableChessboard } from "../../components/BrowsableChessboard.tsx";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Chess board changes when button clicked", async () => {
    const moves = ["c2c3", "c7c6", "a2a4", "d7d5", "d2d4"];

    const ui = <BrowsableChessboard moves={moves} />;
    const component = render(ui);
    const chessboard = component.container.querySelector(".kokopu-chessboard");
    const boardState1 = chessboard?.outerHTML;
    expect(boardState1).not.toBeUndefined();

    const user = userEvent.setup();

    const nextButton = component.container.querySelector(
        "#nextChessboardButton",
    );

    expect(nextButton).not.toBeNull();

    await user.click(nextButton as Element);

    const chessboard2 = component.container.querySelector(".kokopu-chessboard");
    const boardState2 = chessboard2?.outerHTML;
    expect(boardState2).not.toBeUndefined();

    expect(boardState1).not.toEqual(boardState2);
});
