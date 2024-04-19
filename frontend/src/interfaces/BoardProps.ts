import { MouseEventHandler } from "react";
/**
 * Interface representing props for a board component.
 *
 * This interface defines the props that can be passed to a board component.
 * It includes optional event handlers for increasing and decreasing moves,
 * which are triggered by clicking on buttons.
 */
interface BoardProps {
    increaseMove?: MouseEventHandler<HTMLButtonElement>;
    decreaseMove?: MouseEventHandler<HTMLButtonElement>;
}

export default BoardProps;
