import classes from "../Styles/Question.module.css";
import Answers from "./Answer";

export default function Question({ answers = [] }) {
  console.log("question rendered");
  console.log(answers);
  return answers.map((answer, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers input={false} options={answer.options} />
    </div>
  ));
}
