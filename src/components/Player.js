import { useRef, useState, useContext } from 'react';
import './Player.css';
import Play from './icons/Play';
import Pause from './icons/Pause';
import { MusicContext } from '../App';
import LeftArrow from './icons/LeftArrow';
import RightArrow from './icons/RightArrow';
import { formatTime } from '../util/helper';

const Player = () => {
  const [, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const { currentPlaying, handleIsPlaying, isPlaying, handleMusic } =
    useContext(MusicContext);

  //   ref
  const audioRef = useRef();

  //   handlers
  const handleOnLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handlePlaying = () => {
    setPlaying((prev) => {
      //    play  & pause
      if (!prev === true) audioRef.current.play();
      else audioRef.current.pause();
      setPlaying(!prev);

      handleIsPlaying(!prev);
    });
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    setProgress((currentTime / duration) * 100);
  };

  const handlePrev = () => handleMusic(currentPlaying.id, 'prev');

  const handleNext = () => handleMusic(currentPlaying.id, 'next');

  // music continues to play
  const handleOnEnded = () => handleMusic(currentPlaying.id, 'next');

  const handleProgress = (e) => {
    const { value } = e.target;
    audioRef.current.currentTime = (value * duration) / 100;
    setProgress(value);
  };

  return (
    <div className='player'>
      <h2>Player</h2>
      <div className='range'>
        <span className='start'>
          {audioRef.current &&
            formatTime(currentTime).min + ':' + formatTime(currentTime).sec}
        </span>
        <input
          type='range'
          max={100}
          min={0}
          value={progress}
          onChange={handleProgress}
        />
        <span className='end'>
          {audioRef.current &&
            formatTime(duration).min + ':' + formatTime(duration).sec}
        </span>
      </div>
      <div className='controls'>
        <button className='prev' onClick={handlePrev}>
          <LeftArrow />
        </button>
        <button className='play-pause' onClick={handlePlaying}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className='next' onClick={handleNext}>
          <RightArrow />
        </button>
      </div>
      <audio
        src={currentPlaying.audio}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        autoPlay={isPlaying}
        onLoadedData={handleOnLoadedData}
        onEnded={handleOnEnded}
      />
    </div>
  );
};

export default Player;
