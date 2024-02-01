import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Move from "../../components/Move";

describe("move component", async () => {
    const container = render(<Move move={"e1e2"} time={100} />).container;

    test("move shown", () => {
        expect(screen.queryByText("e1e2")).not.toBeNull;
    });

