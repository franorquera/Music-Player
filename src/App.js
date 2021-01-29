// Hooks
import { useRef, useState } from 'react';
// SASS
import "./styles/App.scss"
// Data
import util from "./data"
// Components
import Song from "./components/Song"
import Player from "./components/Player"
import Library from "./components/Library"
import Nav from "./components/Nav"

function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(util());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [LibraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;
    
    // Calculate Percentage
    const roundedCurrent = Math.round(current); 
    const roundedDuration = Math.round(duration); 
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation});
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    let nextSongIndex = currentIndex + 1;
    if (nextSongIndex === songs.length) nextSongIndex = 0;
    await setCurrentSong(songs[nextSongIndex]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${LibraryStatus ? 'library-active' : ""}`}>
      <Nav LibraryStatus={LibraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} setSongs={setSongs} audioRef={audioRef} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo} />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} LibraryStatus={LibraryStatus} />
      <audio onTimeUpdate={timeUpdateHandler} onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
