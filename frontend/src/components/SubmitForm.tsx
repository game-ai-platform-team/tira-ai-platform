import React, {ChangeEvent, useState} from "react";
import axios from "axios";

function SubmitForm() {

    const [file, setFile] = useState<File>()

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }


    if (file) {
        const p = async () => {
            const f = await file.text()
            console.log(f)
        }
        p()
    }

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const baseURL = "http://localhost:5173/"
        if (file) {
            await axios.post(`${baseURL}api/submit`, {content: await file.text()});
        }
    }


    return <>
        <form onSubmit={onSubmit}>
            <input type="file" onChange={handleFile}/>
            <button type="submit">Submit</button>
        </form>
        aaaaaa
    </>
}

export default SubmitForm;