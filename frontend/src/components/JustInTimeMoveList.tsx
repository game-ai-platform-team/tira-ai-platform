import "./JustInTimeMoveList.css";

interface JustInTimeMoveListProps {
    moves: string[];
    state: string;
    time: number;
    advantage: number;
}

function JustInTimeMoveList(props: JustInTimeMoveListProps) {
    return (
        <div>
            <p>Received moves:</p>
            <ul id="move-list">
                {props.moves.map((move, index) => (
                    <li key={index}>{move} </li>
                ))}
            </ul>
            <p>
                Time: {props.time} State: {props.state} Advantage:{" "}
                {props.advantage}
            </p>
        </div>
    );
}

export default JustInTimeMoveList;
