import Chessboard from "../../components/Chessboard.tsx";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../../store.ts";
import { createMove } from "../../reducers/moveReducer.ts";
import { Provider } from "react-redux";

describe("Chessboard", () => {
    beforeEach(() => {
        store.dispatch(
            createMove({
                move: "c2c3",
                logs: "",
                time: 100,
                evaluation: 0,
            }),
        );
        store.dispatch(
            createMove({ move: "d7d6", logs: "", time: 100, evaluation: 0 }),
        );
    });

    test("is rendered", () => {});

    test("Chess board changes when button clicked", async () => {
        const ui = (
            <Provider store={store}>
                <Chessboard />
            </Provider>
        );

        let component = render(ui);

        const chessboard =
            component.container.querySelector(".kokopu-chessboard");
        const boardState1 = chessboard?.outerHTML;
        expect(boardState1).not.toBeUndefined();

        const user = userEvent.setup();

        const previousButton = component.container.querySelector(
            "#previousChessboardButton",
        );

        expect(previousButton).not.toBeNull();

        await user.click(previousButton as Element);

        component = render(ui);

        const chessboard2 = component.container.querySelector(
            ".kokopu-chessboard",
        ) as Element;
        const boardState2 = chessboard2?.outerHTML;

        console.log(boardState1);
        console.log(boardState2);
        expect(chessboard2).not.toBeUndefined();

        expect(boardState1).not.toEqual(boardState2);
    });
});
