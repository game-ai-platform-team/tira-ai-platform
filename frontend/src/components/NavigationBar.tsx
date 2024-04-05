import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { useAppDispatch, useAppSelector } from "../hook";
import { updateGame } from "../reducers/gameReducer";
import "../scss/NavigationBar.scss";

const NavigationBar = () => {
    const game = useAppSelector((state) => state.game.config.game);
    const dispatch = useAppDispatch();

    const handleChangeGame = (game: string) => () => {
        dispatch(updateGame(game));
    };

    return (
        <div id="navigation-bar">
            <Dropdown>
                <Dropdown.Toggle
                    aria-label="Select game"
                    as={Button}
                    variant="flat"
                    size="lg"
                    className="nav-button"
                >
                    {getGameIcon(game)} {game}
                </Dropdown.Toggle>

                <DropdownMenu aria-label="Available games">
                    <Dropdown.Item onClick={handleChangeGame("chess")}>
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleChangeGame("gomoku")}>
                        🌀 Gomoku
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleChangeGame("othello")}>
                        ⚪ Othello
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleChangeGame("connect_four")}>
                        🔴 Connect 4
                    </Dropdown.Item>
                </DropdownMenu>
            </Dropdown>

            <Button onClick={() => (window.open("https://github.com/game-ai-platform-team/tira-ai-platform/issues", "_blank"))}
                className="nav-button"
                variant="flat"
                size="lg"
                aria-label="Feedback"
            >
                💬 Feedback
            </Button>
            <button onClick={() => (location.href = "/login")}> login</button>
        </div>
    );
};

// Function to get the appropriate icon for each game
const getGameIcon = (game: string): string => {
    switch (game) {
        case "chess":
            return "♟️";
        case "gomoku":
            return "🌀";
        case "othello":
            return "⚪";
        case "connect_four":
            return "🔴";
        default:
            return "";
    }
};

export default NavigationBar;
