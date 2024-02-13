import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AdvantageBar from "../../components/AdvantageBar";

describe("advantage bar", () => {
    const height = 100;

    test("draws indicator to middle when position is zero", () => {
        const { container } = render(
            <AdvantageBar linePosition={0} height={height} />,
        );

        const indicator = container.querySelector(
            "#indicator-line",
        ) as HTMLElement;

        expect(indicator.getAttribute("y1")).toBe((0.5 * height).toString());
    });

    test("draws indicator to top when position is 1", () => {
        const { container } = render(
            <AdvantageBar linePosition={1} height={height} />,
        );

        const indicator = container.querySelector(
            "#indicator-line",
        ) as HTMLElement;

        expect(indicator.getAttribute("y1")).toBe(height.toString());
    });

    test("draws indicator to bottom when position is -1", () => {
        const { container } = render(
            <AdvantageBar linePosition={-1} height={height} />,
        );

        const indicator = container.querySelector(
            "#indicator-line",
        ) as HTMLElement;

        expect(indicator.getAttribute("y1")).toBe("0");
    });
});
