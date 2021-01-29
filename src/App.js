// Hooks
import { useRef, useState, useEffect } from 'react';
// SASS
import "./styles/App.scss"
// Util
import util from "./util"
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
  });
  const [LibraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration});
  };

  return (
    <div className="App">
      <Nav LibraryStatus={LibraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} setSongs={setSongs} audioRef={audioRef} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo} />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} LibraryStatus={LibraryStatus} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
