import { useEffect, useRef } from "react";
import { useAppSelector } from "../hook.ts";
import "../scss/LogBox.scss";
/**
 * Draws logs printed by the AI
 *
 * @returns LogBox function
 */
export function LogBox() {
    const logs = useAppSelector((state) => state.logs);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {    
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }

    }, [logs]);
    
    


    return (
        <div id="log-box">
            <h2 className="card-header">All logs</h2>
            <div>
                <textarea ref={textareaRef} value={logs} readOnly />
            </div>
        </div>
    );
}
