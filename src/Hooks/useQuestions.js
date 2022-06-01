import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const questionsRef = ref(db, "quiz/" + videoID + "/questions");
      const questionQuery = query(questionsRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(questionQuery);
        setLoading(false);
        if (snapshot.exists()) {
          //setHasMore(true);
          setQuestions(() => {
            return [...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoID]);
  //const arrObj = Object.values(questions);
  //console.log(`useQues ques is ${questions}`);
  return {
    loading,
    questions,
    error,
    //hasMore,
  };
}
