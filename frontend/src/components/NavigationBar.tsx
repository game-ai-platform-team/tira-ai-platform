import React, { useState } from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
    const [selectedGame, setSelectedGame] = useState("Chess");

    const handleGameChange = (game) => {
        setSelectedGame(game);
        //Placeholder - add what happens when game is changed
    };

    return (
        <div id="navigation-bar">
            <div className="dropdown">
                <button className="nav-button">
                    <span role="img" aria-label="Submit">
                        &#x1F4E6;
                    </span>{" "}
                    {selectedGame}
                </button>
                <div className="dropdown-content">
                    <button onClick={() => handleGameChange("Chess")}>
                        Chess
                    </button>
                    <button onClick={() => handleGameChange("Gomoku")}>
                        Gomoku
                    </button>
                    <button onClick={() => handleGameChange("Othello")}>
                        Othello
                    </button>
                    <button onClick={() => handleGameChange("Connect4")}>
                        Connect4
                    </button>
                </div>
            </div>
            <button className="nav-button">
                <span role="img" aria-label="Feedback">
                    &#x1F4AC;
                </span>{" "}
                Feedback
            </button>
        </div>
    );
};

export default NavigationBar;
