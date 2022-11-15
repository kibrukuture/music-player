import "./PlayerContainer.css";
import Player from "./Player";

const PlayerContainer = ({ currentPlaying }) => {
  const { cover, artist, name } = currentPlaying;
  return (
    <div className="player-container">
      <div className="cover">
        <img src={cover} alt={name} />
      </div>
      <p className="artist"> {artist} </p>
      <Player />
    </div>
  );
};

export default PlayerContainer;
