import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../hook.ts";
import "../scss/LogBox.scss";

/**
 * Draws logs printed by the AI
 *
 * @returns LogBox function
 */
export function LogBox() {
    const logs = useAppSelector((state) => state.logs);
    const [textareaHeight, setTextareaHeight] = useState(0);

    const textareaRefCallback = useCallback(
        (node: HTMLTextAreaElement | null) => {
            if (node !== null) {
                setTextareaHeight(node.scrollHeight);
                node.scrollTop = node.scrollHeight;
            }
        },
        [],
    );

    useEffect(() => {
        if (textareaHeight > 0) {
            setTextareaHeight(textareaHeight);
        }
    }, [logs, textareaHeight]);

    return (
        <div id="log-box">
            <h2 className="card-header">All logs</h2>
            <div>
                <textarea
                    ref={textareaRefCallback}
                    value={logs}
                    readOnly
                    style={{ height: `${textareaHeight}px` }}
                />
            </div>
        </div>
    );
}
