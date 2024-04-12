import Toast from "react-bootstrap/Toast";
import { useAppDispatch, useAppSelector } from "../hook";
import { setToast } from "../reducers/toastReducer";

const Notification = () => {
    const notification = useAppSelector((state) => state.notification);
    const dispatch = useAppDispatch();

    return (
        <Toast
            onClose={() => dispatch(setToast({text:"", color:"Success"}))}
            show={notification.text !== ""}
            delay={5000}
            autohide
            bg={notification.color.toLowerCase()}
        >
            <Toast.Header>Notification!!!!!</Toast.Header>
            <Toast.Body>{notification.text}</Toast.Body>
        </Toast>
    );
};

export default Notification;
