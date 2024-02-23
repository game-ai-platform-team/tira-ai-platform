import { render } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";
import { test, expect, describe } from "vitest";


describe("Submit form", () => {

    describe("URL field", () => {

        test("exists", () => {
            const component = render(<SubmitForm />);
            const input = component.container.querySelector("#url-field");

            expect(input).not.toBe(null);
        });

        test("is URL field", () => {
            const component = render(<SubmitForm />);
            const input = component.container.querySelector("#url-field") as HTMLInputElement;

            expect(input.type).to.equal("url");
        });
    });

    describe("Submit button", () => {

        test("exists", () => {
            const component = render(<SubmitForm />);
            const submitButton = component.container.querySelector("#submit-button");

            expect(submitButton).not.toBe(null);
        });
    });

    describe("elo slider", () => {

        test("exists", () => {
            const component = render(<SubmitForm />);
            const eloSlider = component.container.querySelector(
                "#elo-slider"
            ) as HTMLElement;

            expect(eloSlider).not.toBeNull();
        });
    });
});
