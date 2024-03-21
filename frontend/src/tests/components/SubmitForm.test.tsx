import { render, screen } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";
import { test, expect, describe } from "vitest";
import { Provider } from "react-redux";
import store from "../../store";

describe("Submit form", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <SubmitForm />;
            </Provider>,
        );
    });

    describe("URL field", () => {
        let urlField: HTMLInputElement | null = null;

        beforeEach(() => {
            urlField = screen.getByLabelText(
                "Repository URL",
            ) as HTMLInputElement;
        });

        test("exists", () => {
            expect(urlField).toBeDefined();
        });

        test("is URL field", () => {
            expect(urlField!.type).to.equal("url");
        });
    });

    test("Submit button exists", () => {
        expect(screen.getByLabelText("Submit")).toBeDefined();
    });

    test("Difficult slider exists", () => {
        expect(screen.getByLabelText("Difficulty")).not.toBeNull();
    });
});
