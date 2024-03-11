import CFourboard from "../../components/CFourboard";
import store from "../../store";
import { createMove, resetMoves } from "../../reducers/moveReducer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setBoardIndex } from "../../reducers/boardIndexReducer";

describe("CFourboard", () => {
    const ui = (
        <Provider store={store}>
            <CFourboard />
        </Provider>
    );

    const dispatchMovesFromArray = (movesArray: number[]) => {
        store.dispatch(resetMoves());
        movesArray.forEach((move) => {
            store.dispatch(
                createMove({
                    move: move.toString(),
                    logs: "",
                    time: 100,
                    evaluation: 0,
                })
            );
        });
        store.dispatch(setBoardIndex(movesArray.length));
    };

    beforeEach(() => {
        store.dispatch(resetMoves());
        store.dispatch(setBoardIndex(0));
    });

    test("is rendered", () => {
        const component = render(ui);
        const board = component.container.querySelector("#cfour-board");
        expect(board).not.toBeNull();
    });


    test("moves appear correctly", () => {
        dispatchMovesFromArray([0, 4])
        // bottom row left to right: 5, 11, 17, 23, 29, 35, 41
        const component = render(ui);
        const board = component.container.querySelector("#cfour-board");
        const circle_red = board?.children.item(0)?.children.item(5);
        const circle_yellow = board?.children.item(0)?.children.item(29);

        expect(circle_red?.getAttribute("fill")).toBe("red");
        expect(circle_yellow?.getAttribute("fill")).toBe("yellow");

        const whiteCircles = Array.from(board?.querySelectorAll("circle") || []).filter(circle => circle.getAttribute("fill") === "white");
        expect(whiteCircles.length).toBe(6 * 7 - 2);
    });

    test("moves appear correctly on top", () => {
        dispatchMovesFromArray([0, 0])
        const component = render(ui);
        const board = component.container.querySelector("#cfour-board");
        const circle_red = board?.children.item(0)?.children.item(5);
        const circle_yellow = board?.children.item(0)?.children.item(4);

        expect(circle_red?.getAttribute("fill")).toBe("red");
        expect(circle_yellow?.getAttribute("fill")).toBe("yellow");

        const whiteCircles = Array.from(board?.querySelectorAll("circle") || []).filter(circle => circle.getAttribute("fill") === "white");
        expect(whiteCircles.length).toBe(6 * 7 - 2);
    })
});
