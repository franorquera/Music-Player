import LibrarySong from "./LibrarySong"

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, LibraryStatus}) => {
    return (
        <div className={`library ${LibraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong 
                                    songs={songs} 
                                    song={song} 
                                    key={song.id} 
                                    setCurrentSong={setCurrentSong} 
                                    audioRef={audioRef} 
                                    isPlaying={isPlaying} 
                                    setSongs={setSongs}
                                    />)}
            </div>
        </div>
    );
}   

export default Library