import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../Hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;
  //const { qna } = state;
  // const { state } = location;
  // const { qna } = state;
  //console.log(location);

  const { answers, loading, error } = useAnswers(id);
  //console.log(`qna is `);
  //console.log(answers);
  //console.log(qna);

  function calculate() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) {
          correctIndexes.push(index2);
        }
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 10;
      }
    });
    //console.log(score);
    return score;
  }

  const userScore = calculate();
  //console.log(score);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
