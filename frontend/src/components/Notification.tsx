import Toast from "react-bootstrap/Toast";
import { useAppDispatch, useAppSelector } from "../hook";
import { setToast } from "../reducers/toastReducer";

const Notification = () => {
    const notification = useAppSelector((state) => state.notification);
    const dispatch = useAppDispatch();

    return (
        <Toast
            onClose={() => dispatch(setToast(""))}
            show={notification !== ""}
            delay={5000}
            autohide
        >
            <Toast.Header>Notification!!!!!</Toast.Header>
            <Toast.Body>{notification}</Toast.Body>
        </Toast>
    );
};

export default Notification;
