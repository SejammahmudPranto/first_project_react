import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import useQuestions from "../../Hooks/useQuestions";
import Answers from "../Answer";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answers":
      //console.log("answers dispatch");
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  //const location = useLocation();
  const { questions, loading, error } = useQuestions(id);

  const [qna, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line no-unused-vars
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  //const { state } = navigate;
  //console.log(navigate);
  //console.log(questions.length);
  const location = useLocation();
  const { videoTitle } = location.state;
  console.log(videoTitle);
  //console.log(location);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);
  //console.log(questions);

  function handleAnswerChange(e, index) {
    //console.log("handleanswerchange called");
    dispatch({
      type: "answers",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  //console.log("quiz component rendered!");
  //console.log(qna);

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
    // console.log("next Question triggerred");
    // console.log(`currentQuestion ${currentQuestion + 1}`);
    // console.log(`questions length  ${questions.length / 2}`);
  }
  function prevQuestion() {
    console.log("prev Question triggerred");
    if (currentQuestion > 0 && currentQuestion + 1 <= questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  }

  async function submit() {
    //console.log("submit triggerred");
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, { state: { qna } });
  }
  //console.log(`quiz questions is ${questions}`);
  const progress =
    questions.length / 2 > 0
      ? ((currentQuestion + 1) / questions.length) * 100
      : 0;
  //console.log(`progress ${progress}`);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleAnswerChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={progress}
            submit={submit}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
