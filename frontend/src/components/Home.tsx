import ReactMarkdown from "react-markdown";
import manual from "../../../docs/user_manual/manual.md"

const Home = () => {
    return (
        <div className="card">
            <ReactMarkdown children={manual}
            />
        </div>
    );
  };
  
  export default Home;
