import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import "../scss/NavigationBar.scss";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
/**
 * Navigation bar containing all functions relevant to navigating the application
 * Home-button returns user to the home page
 * Select game opens a dropdown menu for naviating between games
 * Instructions opens a dropdown menu of links that open manuals to new tabs
 * Feedback opens a new tab to project's issues in github
 * Login feature is not yet implemented
 *
 * @returns {JSX.Element} React object containing a very cool navigation bar
 */
const NavigationBar = (): JSX.Element => {
    const path = useLocation();
    const [selectedGame, setSelectedGame] = useState<string>(() => {
        const game = path.pathname.split("/").pop();
        return game !== undefined ? game : "";
    });

    const handleGameSelect = (game: string) => {
        setSelectedGame(game);
    };

    return (
        <div id="navigation-bar">
            <Link id="nav-button" to="/">
                🏠 Home
            </Link>
            <Dropdown>
                <Dropdown.Toggle
                    aria-label="Select game"
                    as={Button}
                    id="nav-button"
                    size="lg"
                    className="nav-dropdown"
                    style={{ color: "white" }}
                >
                    {getGameIcon(selectedGame)}{" "}
                    {selectedGame !== "" ? selectedGame : "🤔 Select Game "}
                </Dropdown.Toggle>

                <DropdownMenu aria-label="Available games">
                    <Dropdown.Item
                        as={Link}
                        to="/chess"
                        onClick={() => handleGameSelect("chess")}
                        className="dropdown-link"
                    >
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/connect_four"
                        className="dropdown-link"
                        onClick={() => handleGameSelect("connect_four")}
                    >
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
                    <Dropdown.Item
                        as={Link}
                        to="/generalmanual"
                        className="dropdown-link"
                    >
                        📖 General
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/chessmanual"
                        className="dropdown-link"
                    >
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/cfourmanual"
                        className="dropdown-link"
                    >
                        🔴 Connect Four
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
        case "connect_four":
            return "🔴";
        default:
            return "";
    }
};

export default NavigationBar;
