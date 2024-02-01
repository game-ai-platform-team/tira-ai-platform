interface MoveProps {
    move: string;
    time: number;
    state: string;
}

const Move = ({move, time, state}: MoveProps) => {
    return <span>Move:{move}</span>;
};


export default Move
export type {MoveProps}