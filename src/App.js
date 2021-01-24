// SASS
import "./styles/App.scss"
// Util
import util from "./util"
// Components
import Song from "./components/Song"
import Player from "./components/Player"
import { useState } from "react"

function App() {
  // State
  const [songs, setSong] = useState(util());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
}

export default App;
