//import image from "../images/success.png";
import classes from "../Styles/Analysis.module.css";
import Question from "./Question";

export default function Analysis({ answers = [] }) {
  console.log("Analysis rendered");
  console.log(answers);
  return (
    <>
      <div className={classes.analysis}>
        <h1>Question Analysis</h1>
        <Question answers={answers} />
      </div>
    </>
  );
}
