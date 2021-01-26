import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Component
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons" // Icon

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo}) => {

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
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    );
}

export default Player