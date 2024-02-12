import Chessboard from "../../components/Chessboard.tsx";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../../store.ts";
import { createMove } from "../../reducers/moveReducer.ts";
import { newBoard } from "../../reducers/boardReducer.ts";

test("Chess board changes when button clicked", async () => {
    store.dispatch(
        createMove({ move: "c2c3", logs: "", time: 100, advantage: 0 }),
    );
    store.dispatch(
        newBoard({ move: "c2c3", logs: "", time: 100, advantage: 0 }),
    );
    const ui = <Chessboard />;
    const component = render(ui);
    const chessboard = component.container.querySelector(".kokopu-chessboard");
    const boardState1 = chessboard?.outerHTML;
    expect(boardState1).not.toBeUndefined();

    const user = userEvent.setup();

    const previousButton = component.container.querySelector(
        "#previousChessboardButton",
    );

    expect(previousButton).not.toBeNull();

    await user.click(previousButton as Element);

    const chessboard2 = component.container.querySelector(".kokopu-chessboard");
    const boardState2 = chessboard2?.outerHTML;
    expect(boardState2).not.toBeUndefined();

    expect(boardState1).not.toEqual(boardState2);
});
