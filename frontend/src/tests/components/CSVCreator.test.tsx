import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CSVCreater from "../../components/CSVCreater.tsx"
import { createMove } from "../../reducers/moveReducer";

describe("CSVCreator", () => {
    test("is rendered", () => {
        const moves = createMove({
                move: "c2c3",
                logs: "",
                time: 100,
                evaluation: 0,
            });

        const { container } = render(
            <CSVCreater moves={ moves }/>);
        const CSV = container.querySelector(".CSVCreater");

        expect(CSV).not.toBeUndefined();
    });
});
