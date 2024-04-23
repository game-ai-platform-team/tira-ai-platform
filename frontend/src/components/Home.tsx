/**
 * Main page
 *
 * @returns {JSX.Element} BEAUTIFUL great.png and the same picture that slides into the screen using "marquee"
 * if it doesnt work then woahhh :)
 */
const Home = (): JSX.Element => {
    return (
        <div id="manual-view">
            <div
                className="card container"
                style={{ fontSize: "1.5em", color: "#3F3B6C" }}
            >
                <h1 style={{ marginBottom: "20px" }}>Tira-AI-Platform</h1>
                <p>
                    Welcome to Tira-AI-Platform, your go-to-solution for
                    students working on their AI and algorithms project who are
                    developing an AI for a game. Our platform offers you a tool
                    to visualize and test your progress, with support currently
                    available for chess and Connect Four.
                </p>
                <p>
                    How does it work? It's simple: submit your project via a
                    GitHub link and test your AI against our platform's built-in
                    AI. This process lets you refine your algorithm and see your
                    AI strategies in action.
                </p>
                <p>
                    But that's not all! Tira-AI-Platform goes beyond just
                    testing. You can visualize your gameplay directly on the
                    platform, gaining valuable insights through stats, logs, and
                    a record of all moves made during the game.
                </p>{" "}
                <p>
                    {" "}
                    For instructions, check out the user manuals located at the
                    top of the page under instructions.
                </p>
            </div>
            <p></p>
            <p></p>
            <div className="card container">
                <h2>Good luck with your AI!</h2>
                <img
                    src="great.png"
                    style={{ alignSelf: "center", width: "75%" }}
                    alt="woahhh"
                />
            </div>
        </div>
    );
};

export default Home;
