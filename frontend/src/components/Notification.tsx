import Toast from "react-bootstrap/Toast";
import { useAppDispatch, useAppSelector } from "../hook";
import { setToast } from "../reducers/toastReducer";
import { ToastContainer } from "react-bootstrap";

/**
 * React component for displaying notifications using Bootstrap Toast.
 *
 * This component utilizes the Toast component from react-bootstrap/Toast
 * and interacts with the toastReducer for managing notification state.
 *
 * @returns {TSX.Element} The Notification component TSX.
 */
const Notification = () => {
    const notification = useAppSelector((state) => state.notification);
    const dispatch = useAppDispatch();

    return (
        <ToastContainer position="top-center">
            <Toast
                onClose={() => dispatch(setToast({ title: "", text: "", color: "Success" }))}
                show={notification.text !== ""}
                delay={5000}
                autohide
                bg={notification.color.toLowerCase()}
            >
                <Toast.Header>{notification.title}</Toast.Header>
                <Toast.Body>{notification.text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;
