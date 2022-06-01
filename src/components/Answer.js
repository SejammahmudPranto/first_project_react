import { Fragment } from "react";
import classes from "../Styles/Quiz.module.css";
import Label from "./Label";

export default function Answers({ options = [], handleAnswerChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Label
              key={index}
              className={classes.answer}
              value={index}
              onChange={(e) => handleAnswerChange(e, index)}
              checked={option.checked}
            >
              {option.title}
            </Label>
          ) : (
            <Label
              key={index}
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              defaultChecked={option.checked}
              disabled
            >
              {option.title}
            </Label>
          )}
        </Fragment>
      ))}
    </div>
  );
}
