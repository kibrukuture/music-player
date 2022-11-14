import './Music.css';
import { useContext } from 'react';
import { MusicContext } from '../App';

const Music = ({ name, cover, artist, color, id, active }) => {
  // contenxt
  const { isPlaying, handleMusic } = useContext(MusicContext);

  // handle
  const handleMusicId = () => handleMusic(id); // currentMusic(id); // current playing

  // style
  let musicStyle = null;
  if (active) {
    if (isPlaying) musicStyle = { background: color[0] };
    else musicStyle = { background: color[1] };
  }

  return (
    <div
      className='music'
      style={musicStyle}
      onClick={handleMusicId}
      data-id={id}
    >
      <div className='music-cover'>
        <img src={cover} alt={name} />
      </div>

      <div className='music-name-artist'>
        <h2>{name}</h2>
        <p>{artist}</p>
      </div>
    </div>
  );
};

export default Music;
