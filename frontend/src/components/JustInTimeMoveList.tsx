import "./JustInTimeMoveList.css";

interface JustInTimeMoveListProps {
    moves: string[];
    state: string;
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
            <p>{props.state}</p>
        </div>
    );
}

export default JustInTimeMoveList;
