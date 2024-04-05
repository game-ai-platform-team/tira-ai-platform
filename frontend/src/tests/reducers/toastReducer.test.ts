import store from "../../store";
import { setToast } from "../../reducers/toastReducer";

describe("toast redux", () => {
    test("notification updates", () => {
        store.dispatch(
            setToast("This is an error message"),
        );
        expect(store.getState().notification).toEqual("This is an error message");
    });
});
