import { render, screen } from "@testing-library/react";
import SubmitForm from "../../components/SubmitForm";
import { test, expect, describe } from "vitest";
import { Provider } from "react-redux";
import store from "../../store";
import { resetGame } from "../../reducers/gameReducer";
import { BrowserRouter } from "react-router-dom";

describe("Submit form", () => {
    beforeEach(() => {
        store.dispatch(resetGame());

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SubmitForm />
                </BrowserRouter>
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
