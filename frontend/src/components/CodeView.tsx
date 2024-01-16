import SubmitForm from "./SubmitForm.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function CodeView() {
    const [code, setCode] = useState("");

    const baseURL = "http://localhost:5000";

    useEffect(() => {
        const f = async () => {
            const response = await axios.get(baseURL + "/api/code");
            setCode(response.data);
        };
        f();
    }, []);

    return (
        <>
            <SubmitForm></SubmitForm>
            <br />
            <br />
            <div style={{ borderStyle: "solid" }}>
                <code style={{ whiteSpace: "pre" }}>{code}</code>
            </div>
        </>
    );
}

export default CodeView;
