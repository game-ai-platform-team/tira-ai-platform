import { MouseEventHandler } from "react";

interface BoardProps {
    increaseMove?: MouseEventHandler<HTMLButtonElement>;
    decreaseMove?: MouseEventHandler<HTMLButtonElement>;
}

export default BoardProps;
