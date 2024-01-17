import React, { ChangeEvent, useState, JSX } from "react";
import axios from "axios";

/**
 *  Component for submitting code files to server.
 *
 * @returns {JSX.Element}
 */
function SubmitForm(): JSX.Element {
    const [file, setFile] = useState<File>();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    if (file) {
        const p = async () => {
            const f = await file.text();
            console.log(f);
        };
        p();
    }

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseURL = "http://localhost:5000";
        if (file) {
            await axios.post(`${baseURL}/api/submit`, {
                content: await file.text(),
            });
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input id="file-input" type="file" onChange={handleFile} />
                <button id="submit-button" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}

export default SubmitForm;
