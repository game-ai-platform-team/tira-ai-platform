import { Container, Form } from "react-bootstrap";
import { useAppSelector } from "../hook.ts";

/**
 * Draws logs printed by the AI
 *
 * @returns LogBox function
 */
export function LogBox() {
    const logs = useAppSelector((state) => state.logs);

    return (
        <Container fluid className="card">
            <h2 className="card-header">Logs</h2>
            <Form.Control
                id="log-box"
                value={logs}
                as="textarea"
                readOnly
                title="Logs"
                placeholder="Logs from AI"
                rows={10}
                style={{ fontFamily: "monospace" }}
            ></Form.Control>
        </Container>
    );
}
