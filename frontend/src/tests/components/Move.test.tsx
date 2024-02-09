import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Move from "../../components/Move";

describe("move component", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = render(
            <Move
                statistics={{ move: "e1e2", logs: "", advantage: 0, time: 100 }}
            />,
        ).container;
    });

    test("move shown", () => {
        expect(screen.queryByText("e1e2")).not.toBeNull;
    });

    test("details is hidden by default", () => {
        const details = container.querySelector(".move-details");

        expect(details).toHaveStyle("display: none");
    });

    test("details is shown after click", async () => {
        const user = userEvent.setup();
        const moveContent = container.querySelector(
            ".move-content",
        ) as HTMLElement;

        await user.click(moveContent);

        const details = container.querySelector(".move-details");

        expect(details).not.toHaveStyle("display: none");
    });

    test("details can be hidden after click", async () => {
        const user = userEvent.setup();
        const moveContent = container.querySelector(
            ".move-content",
        ) as HTMLElement;

        await user.click(moveContent);
        await user.click(moveContent);

        const details = container.querySelector(".move-details");

        expect(details).toHaveStyle("display: none");
    });
});
