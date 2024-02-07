import { render } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";
import { vitest } from "vitest";

test("file path field exists", () => {
    const component = render(
        <SubmitForm hasGameStarted={false} setHasGameStarted={vitest.fn()} />,
    );
    const fileInput = component.container.querySelector("#file-input");

    expect(fileInput).not.toBe(null);
});

test("submit button exists", () => {
    const component = render(
        <SubmitForm hasGameStarted={false} setHasGameStarted={vitest.fn()} />,
    );
    const submitButton = component.container.querySelector("#submit-button");

    expect(submitButton).not.toBe(null);
});

test("difficulty slider exists", () => {
    const component = render(
        <SubmitForm hasGameStarted={false} setHasGameStarted={vitest.fn()} />,
    );
    const fileInput = component.container.querySelector("#difficulty-config");

    expect(fileInput).not.toBe(null);
});
