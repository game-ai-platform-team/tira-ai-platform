import "./JustInTimeMoveList.css";

interface JustInTimeMoveListProps {
    moves: string[];
    onNewMove: (newMove: string, state: string) => void;
}

function JustInTimeMoveList(props: JustInTimeMoveListProps) {
    return (
        <div>
            <p>Received moves:</p>
            <ul id="move-list">
                {props.moves.map((move, index) => (
                    <li key={index}>{move}</li>
                ))}
            </ul>
        </div>
    );
}

export default JustInTimeMoveList;
