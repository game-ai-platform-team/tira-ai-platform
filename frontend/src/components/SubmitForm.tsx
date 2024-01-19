import React, { ChangeEvent, useState, JSX } from "react";
import axios from "axios";

interface SubmitFormProps {
    setResult: (result: { moves: string[]; winner: string }) => void;
}

/**
 *  Component for submitting code files to server.
 *
 * @returns {JSX.Element}
 */
function SubmitForm(props: SubmitFormProps): JSX.Element {
    const [file, setFile] = useState<File>();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseURL = "http://localhost:5000";
        if (file) {
            const result = await axios.post(`${baseURL}/api/chess/submit`, {
                content: await file.text(),
            });
            console.log(result.data);
            props.setResult(
                result.data as unknown as { moves: string[]; winner: string },
            );
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
