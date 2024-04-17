/**
 * Main page
 *
 * @returns BEAUTIFUL great.png and the same picture that slides into the screen using "marquee"
 * if it doesnt work then woahhh :)
 */
const Home = () => {
    return (
        <div style={{ fontSize: "2em", color: "#3F3B6C" }}>
            Do you need help developing your game AI? You&apos;ve come to the
            right place!😎{" "}
            <img src="great.png" style={{ width: "75%" }} alt="woahhh" />
            <marquee>
                <img src="great.png" style={{ width: "75%" }} alt="woahhh" />
            </marquee>
        </div>
    );
};

export default Home;
