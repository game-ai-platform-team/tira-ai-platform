import { useAppSelector } from "../hook.ts";
/**
 * Draws logs printed by the AI
 *
 * @returns LogBox function
 */
export function LogBox() {
    const logs = useAppSelector((state) => state.allLog);

    return (
        <>
            <h2 className="card-header">All logs</h2>
            <code style={{ whiteSpace: "pre" }}>{logs}</code>
        </>
    );
}
