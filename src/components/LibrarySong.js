const LibrarySong = ({songs, song, setCurrentSong, audioRef, isPlaying, setSongs}) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        // Active State
        const newSongs = songs.map(s => {
            if (song.id === s.id) return {...s, active: true};
            else return {...s, active: false};
            })
        setSongs(newSongs);
        // Check if the song is playing
        if (isPlaying) {
            const playPromsie = audioRef.current.play();
            if (playPromsie !== undefined) playPromsie.then(audio => audioRef.current.play());
        }
    };

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : "" }`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong