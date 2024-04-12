import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import "../scss/NavigationBar.scss";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
    const path = useLocation();
    const game = path.pathname.split("/").pop();

    return (
        <div id="navigation-bar">
            <Dropdown>
                <Dropdown.Toggle
                    aria-label="Select game"
                    as={Button}
                    id="nav-button"
                    size="lg"
                    className="nav-dropdown"
                    style={{ color: "white" }}
                >
                    {getGameIcon(game !== undefined ? game : "")}{" "}
                    {game !== "" ? game : "🤔 Select Game "}
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

            <Dropdown>
                <Dropdown.Toggle
                    aria-label="instructions"
                    as={Button}
                    id="nav-button"
                    size="lg"
                    className="nav-dropdown"
                    style={{ color: "white" }}
                >
                    {"📚 Instructions "}
                </Dropdown.Toggle>

                <DropdownMenu aria-label="Available instructions">
                    <Dropdown.Item href="/" target="_blank">
                        📖 General
                    </Dropdown.Item>
                    <Dropdown.Item href="/chessmanual" target="_blank">
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item href="/cfourmanual" target="_blank">
                        🔴 Connect four
                    </Dropdown.Item>
                </DropdownMenu>
            </Dropdown>

            <div>
                <Button
                    onClick={() =>
                        window.open(
                            "https://github.com/game-ai-platform-team/tira-ai-platform/issues",
                            "_blank",
                        )
                    }
                    id="nav-button"
                    aria-label="Feedback"
                    style={{ color: "white" }}
                >
                    {" "}
                    💬 Feedback
                </Button>
            </div>
            <div>
                <Button
                    id="nav-button"
                    onClick={() => (location.href = "/login")}
                >
                    🔐 Login
                </Button>
            </div>
            <div className="tira-text"> TIRA-AI-PLATFORM</div>
        </div>
    );
};

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
