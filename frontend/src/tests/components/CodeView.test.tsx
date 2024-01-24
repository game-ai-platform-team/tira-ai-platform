import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import CodeView from "../../components/CodeView.tsx";
import '@testing-library/jest-dom';

test("move list gets rendered", async () => {
    const ui = (
        <CodeView testResult={{ moves: ["1", "2", "3"], winner: "player1" }} />
    );
    const component = render(ui);
    const moveList = component.container.querySelector("#move-list");

    expect(moveList).not.toBeEmptyDOMElement();
});
