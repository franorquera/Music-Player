import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Component
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons" // Icon
import { useEffect } from 'react';

const Player = ({songs, setSongs, audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, songInfo, setSongInfo}) => {
    // Use Effect
    useEffect(() => {
        const newSongs = songs.map(s => {
            if (s.id === currentSong.id) return {...s, active: true};
            else return {...s, active: false};
            })
            setSongs(newSongs);
    }, [currentSong]);

     // Event Handler
    const playSongHandler = () => {
        if (!isPlaying) audioRef.current.play();
        else audioRef.current.pause();
        setIsPlaying(!isPlaying);
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value
        setSongInfo({...songInfo, currentTime: event.target.value}) // Leave everything as it is, but change the currentTime
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);

        if (direction === "skip-forward") {
            let nextSongIndex = currentIndex + 1;
            if (nextSongIndex === songs.length) nextSongIndex = 0;
            setCurrentSong(songs[nextSongIndex]);
            // setCurrentSong(songs[currentIndex + 1 % songs.length]);
        }

        if (direction === "skip-back") {
            /*
            let nextSongIndex;
            console.log(currentIndex)
            if (currentIndex != 0) nextSongIndex = currentIndex - 1;
            else nextSongIndex = currentIndex;
            if (nextSongIndex === 0) nextSongIndex = songs.length - 1;
            console.log(nextSongIndex)
            setCurrentSong(songs[nextSongIndex]);
            */
           if ((currentIndex - 1) % songs.length === - 1) setCurrentSong(songs[songs.length - 1]);
           else setCurrentSong(songs[currentIndex - 1 % songs.length]);
        }
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0.00} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{getTime(songInfo.duration || 0.00)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    );
}

export default Player