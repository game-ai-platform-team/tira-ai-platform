import { useAppSelector } from "../hook.ts";

export function LogBox() {
    const logs = useAppSelector(state => state.allLog);


    return <>
        <h3>All logs</h3>
        <code style={{ whiteSpace: "pre" }}>
            {logs}
        </code>
    </>;
}