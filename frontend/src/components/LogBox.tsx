import { useAppSelector } from "../hook.ts";
import "../scss/LogBox.scss";
/**
 * Draws logs printed by the AI
 *
 * @returns LogBox function
 */
export function LogBox() {
    const logs = useAppSelector((state) => state.allLog);

    return (
        <div id="log-box">
            <h2 className="card-header">All logs</h2>
            <div>
                <textarea value={logs} readOnly />
            </div>
        </div>
    );
}
