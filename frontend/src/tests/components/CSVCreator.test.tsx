import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CSVCreator from "../../components/CSVCreator.tsx";
import { createMove } from "../../reducers/moveReducer";

describe("CSVCreator", () => {
    test("is rendered", () => {
        const moves = createMove({
            move: "c2c3",
            logs: "",
            time: 100,
            evaluation: 0,
        });

        const { container } = render(<CSVCreator moves={moves} />);
        const CSV = container.querySelector(".CSVCreator");

        expect(CSV).not.toBeUndefined();
    });
});
