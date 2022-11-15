import { useState, createContext } from 'react';
import './App.css';
import chillHop from './data';
import Panel from './components/Panel';
import PlayerContainer from './components/PlayerContainer';
import { findIndex } from './util/helper';

// context
export const MusicContext = createContext();
const data = chillHop();

function App() {
  const [currentPlaying, setCurrentPlaying] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicData, setMusicData] = useState(data);

  // music

  const handleMusic = (id, flag) => {
    let index = findIndex(musicData, id);
    if (flag === 'prev') {
      index -= 1;
      if (index > -1) {
        setCurrentPlaying(musicData[index]);
        setMusicData(callback(musicData[index].id));
      }
    } else if (flag === 'next') {
      index += 1;
      if (index < musicData.length) {
        setCurrentPlaying(musicData[index]);
        setMusicData(callback(musicData[index].id));
      }
    } else {
      setCurrentPlaying(musicData[index]);
      setMusicData(callback(id));
    }
  };

  //
  const handleIsPlaying = (val) => {
    setIsPlaying(val);
  };

  return (
    <MusicContext.Provider
      value={{
        currentPlaying,
        isPlaying,
        handleIsPlaying,
        handleMusic,
      }}
    >
      <div className='App'>
        <Panel musicData={musicData} />
        <PlayerContainer currentPlaying={currentPlaying} />
      </div>
    </MusicContext.Provider>
  );
}

export default App;

function callback(id) {
  return (prev) => {
    return [...prev].map((music) => {
      if (music.id === id) {
        music.active = true;
        return music;
      } else {
        music.active = false;
        return music;
      }
    });
  };
}
