import { render } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";

test("file path field exists", () => {
    const component = render(
        <SubmitForm />
    );
    const fileInput = component.container.querySelector("#file-input");

    expect(fileInput).not.toBe(null);
});

test("submit button exists", () => {
    const component = render(
        <SubmitForm />
    );
    const submitButton = component.container.querySelector("#submit-button");

    expect(submitButton).not.toBe(null);
});

test("elo slider exists", () => {
    const component = render(
        <SubmitForm />
    );
    const fileInput = component.container.querySelector("#elo-config");

    expect(fileInput).not.toBe(null);
});
