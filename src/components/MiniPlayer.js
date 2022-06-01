import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../Styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const minitipRef = useRef();
  const [minitip, setMinitip] = useState(false);
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  function toggleMiniPlayer() {
    if (!minitip) {
      setMinitip(true);
      minitipRef.current.classList.remove(classes.floatingBtn);
    } else {
      setMinitip(false);
      minitipRef.current.classList.add(classes.floatingBtn);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={minitipRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoURL}
        playing={minitip}
        controls
        width="300px"
        height="168px"
      />
      <p>{title}</p>
    </div>
  );
}
