import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import "../scss/NavigationBar.scss";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
    const path = useLocation();
    const game = path.pathname.split("/").pop();

    console.log(game)
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
                    {getGameIcon(game!==undefined?game:"")} {game!==""?game:"🤔 Select Game "}
                </Dropdown.Toggle>

                <DropdownMenu aria-label="Available games">
                    <Dropdown.Item as={Link} to="/chess">
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gomoku">
                        🌀 Gomoku
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/othello">
                        ⚪ Othello
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/connect_four">
                        🔴 Connect 4
                    </Dropdown.Item>
                </DropdownMenu>
            </Dropdown>
            <Button
                onClick={() =>
                    window.open(
                        "https://github.com/game-ai-platform-team/tira-ai-platform/issues",
                        "_blank",
                    )
                }
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
