import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CSVCreator from "../../components/CSVCreator.tsx";

describe("CSVCreator", () => {
    test("is rendered", () => {
        const moves = [
            {
                move: "c2c3",
                logs: "",
                time: 100,
                evaluation: 0,
            },
        ];

        const { container } = render(<CSVCreator moves={moves} />);
        const CSV = container.querySelector(".CSVCreator");

        expect(CSV).not.toBeUndefined();
    });
});
