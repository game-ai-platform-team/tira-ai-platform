import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";

test("file path field exists", () => {
    const component = render(<SubmitForm />);
    const filePathField = component.container.querySelector("#file-path-field");

    expect(filePathField).not.toBe(null);
});

test("submit button exists", () => {
    const component = render(<SubmitForm />);
    const submitButton = component.container.querySelector("#submit-button");

    expect(submitButton).not.toBe(null);
});
