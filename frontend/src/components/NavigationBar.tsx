import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <div id="navigation-bar">
            <button className="nav-button">
                <span role="img" aria-label="Submit">
                    &#x1F4E6;
                </span>{" "}
                Submit
            </button>
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
