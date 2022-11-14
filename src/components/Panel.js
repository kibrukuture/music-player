import "./Panel.css";
import Music from "./Music";

const Panel = ({ musicData }) => {
  return (
    <div className="panel">
      <h1>Library</h1>
      <div className="music-container">
        {musicData.map((music) => (
          <Music {...music} key={music.id} />
        ))}
      </div>
    </div>
  );
};

export default Panel;
