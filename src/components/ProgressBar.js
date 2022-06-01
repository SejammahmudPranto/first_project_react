// import classes from "../Styles/Quiz.module.css";
// import Label from "./Label";
import { useRef, useState } from "react";
import classes from "../Styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, progress, submit }) {
  const [tooltip, setTooltip] = useState(false);
  const toolTip = useRef();

  function toggleTooltip() {
    console.log("toggleTooltip fired");
    if (tooltip) {
      setTooltip(false);
      toolTip.current.style.display = "none";
    } else {
      setTooltip(true);
      toolTip.current.style.left = `calc(${progress}% - 65px)`;
      toolTip.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div
        className={classes.rangeArea}
        onMouseOver={toggleTooltip}
        onMouseOut={toggleTooltip}
      >
        <div className={classes.tooltip} ref={toolTip}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Now" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
